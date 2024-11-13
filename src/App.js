import { Container, VStack } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import { useState, useEffect,useCallback,useMemo } from 'react';
import PollTable from './components/PollTable';
import PollList from './components/PollList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import { io } from 'socket.io-client';
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import PollDetailPage from "./components/PollDetailPage";
import Register from './components/Auth/Register';
import axios from 'axios';

function App() {
  const [polls, setPolls] = useState([]);
  const socket = useMemo(() =>io('http://localhost:4000', {withCredentials:true}), []);
  const getPolls = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/polls');
      setPolls(response.data.pollsWithOptions);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  }, []);
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
    socket.on('voteUpdateb', () => {
      console.log('voteUpdateb from server');
    });
    socket.on('voteUpdate', (data) => {
      console.log("test voteUpdate"+data);
      getPolls(); // Re-fetch the updated polls on vote update
    });
    getPolls();
    return () => {
      socket.disconnect();
    };
  }, [getPolls, socket]);
  
  return (    
      <Router>
        <NavBar />
        <Container maxW="container.md" p={4}>
          <VStack spacing={6}>
            <Routes>
              <Route path="/" element={<PollList polls={polls} />} />
              <Route path="/polls" element={<PollList polls={polls} />} />
              <Route path="/create-poll" element={<ProtectedRoute><PollTable polls={polls} getPolls={getPolls} /></ProtectedRoute>} />              
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/polls/:pollId" element={<PollDetailPage />} />
            </Routes>
          </VStack>
        </Container>
      </Router>
  );
}

export default App;