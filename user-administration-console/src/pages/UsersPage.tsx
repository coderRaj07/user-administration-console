import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/users.api";
import UserForm from "../components/UserForm";
import type { User } from "../types/user";
import {
  Stack,
  Button,
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

  // 📄 Paginate users
  const start = (page - 1) * PAGE_SIZE;
  const paginatedUsers = filteredUsers.slice(start, start + PAGE_SIZE);

  return (
    <Stack spacing={3}>
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

      {/* 📄 User List */}
      {!loading &&
        paginatedUsers.map((u) => (
          <Stack
            key={u.id}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <span>
              {u.firstName} {u.lastName} ({u.email})
            </span>
            <Button onClick={() => setEditingUser(u)}>Edit</Button>
            <Button
              color="error"
              onClick={async () => {
                await deleteUser(u.id!);
                loadUsers();
              }}
            >
              Delete
            </Button>
          </Stack>
        ))}

      {/* 📚 Pagination */}
      <Pagination
        count={Math.ceil(filteredUsers.length / PAGE_SIZE)}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
    </Stack>
  );
}
