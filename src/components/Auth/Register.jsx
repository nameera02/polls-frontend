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
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRegister = async() => {
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (name && email && password) {
        try {
          // Make API call to login endpoint
          const response = await axios.post('http://localhost:4000/api/v1/register', { name,email, password });
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
          }
          dispatch(login());
          navigate('/login');
          // Handle successful login response
          toast({
            title: 'Registration successfull.',
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
            title: error.response?.data?.message || 'Registration failed. Please try again.',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        }
      // Registration logic here (e.g., send data to backend)
    } else {
      toast({
        title: 'Please fill in all fields.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="lg" width={"80%"} mx="auto" p={4} mt={10} boxShadow="md" borderRadius="lg">
      <Stack spacing={4}>
        <Text fontSize="2xl" textAlign="center">Register</Text>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </FormControl>
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
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleRegister}>Register</Button>
        <Text textAlign="center">
          Already have an account? <Link to="/login" color="teal.500">Login</Link>
        </Text>
      </Stack>
    </Box>
  );
}

export default Register;