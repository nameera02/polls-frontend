import { useState, useEffect } from 'react';
import { VStack, Box, Text, Button, Table, Thead, Tr, Th, Tbody, Td, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,useDisclosure } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function PollList({polls}) {
  // const [polls, setPolls] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPoll, setSelectedPoll] = useState(null);
  const navigate = useNavigate();
  const url="http://localhost:4000/uploads/polls_images/";
  const handleVotePage = (pollId) => {
    navigate(`/polls/${pollId}`);  // Assuming the route is '/polls/:pollId'
  };
  
  

  return (
    <VStack spacing={4}>
       <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Question</Th>
            <Th>Image</Th>
            <Th>Votes</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {polls.map((poll) => (
            <Tr key={poll.id}>
              <Td>{poll.question}</Td>
              <Td>
                {console.log(url+poll.image)}
                <Image src={url+poll.image} alt={poll.question} boxSize="50px" />
              </Td>
              <Td>
              {poll.votes}
              </Td>
              <Td>
              <Button colorScheme="blue" size="sm" onClick={() => handleVotePage(poll._id)}>
              Vote
            </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
}

export default PollList;