import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import type { User } from "../types/user";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onRequestDelete: (id: number) => void;
}

export default function UserTable({
  users,
  onEdit,
  onRequestDelete,
}: Props) {
  if (users.length === 0) {
    return <p>No users found</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>

              <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => onRequestDelete(user.id!)}
                  >
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
