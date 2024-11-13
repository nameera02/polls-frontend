import { Box, Flex, HStack, Link, Heading,useToast, Button, Menu, MenuButton, Avatar, MenuList, MenuItem } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import classes from '../assets/css/Navbar.module.css';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function NavBar() {
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState([]);
    const toast = useToast();
  function UserMenu() {    
    const token = localStorage.getItem('token');
  
    // Decode the token to get user info
    if (token) {
      try {
        const user = jwtDecode(token);
        setuserInfo(user);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }  
  const handleLogout = () => {
    // Clear token from local storage and redirect to login
    localStorage.removeItem('token');
    toast({
      title: 'Logged out successfully.',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
    navigate('/login');
  };
  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading as="h1" size="lg" color="white">
          Polling App
        </Heading>
        <HStack spacing={8} alignItems="center">
          {/* <Link as={RouterLink} to="/" color="white" fontWeight="bold"> */}
          <Button as={RouterLink} className={classes['nav_btn']} to="/polls" colorScheme="teal" variant="ghost">
            Home
          </Button>
          {isLoggedIn &&
          <Button as={RouterLink} className={classes['nav_btn']} to="/create-poll" colorScheme="teal" variant="ghost">
            Create Poll
          </Button>
}
          <Button as={RouterLink} className={classes['nav_btn']} to="/polls" colorScheme="teal" variant="ghost">
            Polls
          </Button>
          {userInfo && (
        <Menu>
          <MenuButton as={Button} variant="ghost">
            <Avatar name={userInfo.name} size="sm" />
          </MenuButton>
          <MenuList>
            <MenuItem isDisabled>{userInfo.name}</MenuItem>
            <MenuItem isDisabled>{userInfo.email}</MenuItem>
            <MenuItem onClick={handleLogout} color="red.500">
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      )}
        </HStack>
      </Flex>
    </Box>
  );
}

export default NavBar;