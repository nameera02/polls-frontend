import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleLogin = async() => {
    if (!email || !password) {
      toast({
        title: 'Please enter email and password.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      // Make API call to login endpoint
      const response = await axios.post('http://localhost:4000/api/v1/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      // Handle successful login response
      toast({
        title: 'Logged in successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      // Handle further actions like storing token or redirecting
      // localStorage.setItem('token', response.data.token); // If a token is returned
      // navigate to another page or update the state for logged-in user

    } catch (error) {
      // Handle errors (e.g., incorrect email or password)
      toast({
        title: error.response?.data?.message || 'Login failed. Please try again.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" width={"80%"} mx="auto" p={4} mt={10} boxShadow="md" borderRadius="lg">
      <Stack spacing={4}>
        <Text fontSize="2xl" textAlign="center">Login</Text>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleLogin}>Login</Button>
        <Text textAlign="center">
          Don't have an account? <Link to="/register" color="teal.500">Register</Link>
        </Text>
      </Stack>
    </Box>
  );
}

export default Login;