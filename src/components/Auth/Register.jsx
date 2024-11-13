import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Toast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Toast({
        title: 'Passwords do not match.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (name && email && password) {
      Toast({
        title: 'Registration successful.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      // Registration logic here (e.g., send data to backend)
    } else {
        Toast({
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