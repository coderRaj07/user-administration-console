import { Container, Typography, Box } from "@mui/material";
import UsersPage from "./pages/UsersPage";

export default function App() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 600 }}>
          <Typography variant="h4" gutterBottom align="center">
            User Administration Console
          </Typography>

          <UsersPage />
        </Box>
      </Box>
    </Container>
  );
}
