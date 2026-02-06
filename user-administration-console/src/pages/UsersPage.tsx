import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/users.api";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import ConfirmDialog from "../components/ConfirmDialog";
import type { User } from "../types/user";
import {
  Stack,
  CircularProgress,
  Alert,
  TextField,
  Pagination,
} from "@mui/material";
import { useDebounce } from "../hooks/useDebounce";

const PAGE_SIZE = 5;

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const [page, setPage] = useState(1);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getUsers();
      setUsers(res.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // 🔍 Filter users
  const filteredUsers = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email}`
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
  );

  // 📄 Pagination
  const start = (page - 1) * PAGE_SIZE;
  const paginatedUsers = filteredUsers.slice(start, start + PAGE_SIZE);

  return (
    <Stack spacing={3}>
      {/* ➕ Create / ✏️ Update */}
      <UserForm
        initialData={editingUser ?? undefined}
        onSubmit={async (data) => {
          try {
            setLoading(true);

            const payload = data as Omit<User, "id">;

            if (editingUser) {
              await updateUser(editingUser.id!, payload);
            } else {
              await createUser(payload);
            }

            setEditingUser(null);
            await loadUsers();
          } catch (err: unknown) {
            if (err instanceof Error) {
              setError(err.message);
            } else {
              setError("Something went wrong");
            }
          } finally {
            setLoading(false);
          }
        }}
      />

      {/* 🔍 Search */}
      <TextField
        label="Search users"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        fullWidth
      />

      {/* 🔄 Loading */}
      {loading && <CircularProgress />}

      {/* ❌ Error */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* 📄 User Table */}
      {!loading && (
        <UserTable
          users={paginatedUsers}
          onEdit={(user) => setEditingUser(user)}
          onRequestDelete={(id) => {
            setUserToDelete(id);
            setConfirmOpen(true);
          }}
        />
      )}

      {/* 📚 Pagination */}
      <Pagination
        count={Math.ceil(filteredUsers.length / PAGE_SIZE)}
        page={page}
        onChange={(_, value) => setPage(value)}
      />

      {/* 🛑 Confirm Delete */}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        onCancel={() => {
          setConfirmOpen(false);
          setUserToDelete(null);
        }}
        onConfirm={async () => {
          if (!userToDelete) return;

          try {
            setLoading(true);
            await deleteUser(userToDelete);
            await loadUsers();
          } catch (err: unknown) {
            if (err instanceof Error) {
              setError(err.message);
            } else {
              setError("Something went wrong");
            }
          } finally {
            setLoading(false);
            setConfirmOpen(false);
            setUserToDelete(null);
          }
        }}
      />
    </Stack>
  );
}
