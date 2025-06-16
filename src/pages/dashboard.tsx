import { Container, Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} textAlign="center">
        <Typography variant="h4">Welcome to Dashboard</Typography>
        <Button onClick={logout} variant="outlined" sx={{ mt: 2 }}>
          Logout
        </Button>
      </Box>
    </Container>
  );
}
