import { useState, useEffect } from 'react';
import { Box, Text, Progress } from '@chakra-ui/react';
import { io } from 'socket.io-client';

function VoteResult({ pollId }) {
  const [results, setResults] = useState({});
  const socket = io('http://localhost:4000'); // Update with backend URL

  useEffect(() => {
    socket.on(`poll-${pollId}-results`, data => {
      setResults(data);
    });

    return () => {
      socket.off(`poll-${pollId}-results`);
    };
  }, [pollId, socket]);

  return (
    <Box>
      {Object.entries(results).map(([option, count]) => (
        <Box key={option}>
          <Text>{option}</Text>
          <Progress value={count} max={100} />
        </Box>
      ))}
    </Box>
  );
}

export default VoteResult;