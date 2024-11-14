import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Image, useDisclosure,useToast } from '@chakra-ui/react';
import CreatePollModal from './CreatePollModal';
import EditPollModal from './EditPollModal';
import { useState, } from 'react';
import { useNavigate } from "react-router-dom";
import { deletePoll } from '../api/api';


function PollTable({ polls, getPolls }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPoll, setSelectedPoll] = useState(null);
  const url="http://localhost:4000/uploads/polls_images/";
  const navigate = useNavigate();
  const toast = useToast();
  const handleVotePage = (pollId) => {
    navigate(`/polls/${pollId}`);  // Assuming the route is '/polls/:pollId'
  };
  const handleDelete = async (pollId) => {
    try {
      // Make DELETE request to your API to delete the poll and its options
      await deletePoll(pollId);
      getPolls();
      // Show success message
      toast({
        title: 'Poll deleted successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
  
    } catch (error) {
      // Handle any errors
      toast({
        title: error.response?.data?.message || 'Failed to delete poll.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Box overflowX="auto" mt={4}>
      <Button colorScheme="teal" onClick={onOpen} mb={4}>
        Create Poll
      </Button>
      <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Question</Th>
            <Th>Image</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {polls.map((poll) => (
            <Tr key={poll.id}>
              <Td>{poll.question}</Td>
              <Td>
                <Image src={url+poll.image} alt={poll.question} boxSize="50px" />
              </Td>
              <Td>
                <Button colorScheme="teal" size="sm" mr={2} onClick={() => setSelectedPoll(poll)}>
                  Edit
                </Button>
                <Button colorScheme="red" size="sm" mr={2} onClick={() => handleDelete(poll._id)}>
                  Delete
                </Button>
                <Button colorScheme="blue" size="sm" onClick={() => handleVotePage(poll._id)}>
                  Vote
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Create Poll Modal */}
      <CreatePollModal isOpen={isOpen} onClose={onClose} getPolls={getPolls}/>

      {/* Edit Poll Modal */}
      {selectedPoll && (
        <EditPollModal
          isOpen={Boolean(selectedPoll)}
          onClose={() => setSelectedPoll(null)}
          poll={selectedPoll}
          getPolls={getPolls}
        />
      )}
    </Box>
  );
}
export default PollTable;