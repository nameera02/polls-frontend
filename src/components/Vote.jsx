import { Table, Thead, Tbody, Tr, Th, Td, Box, Button } from '@chakra-ui/react';

function PollTable({ polls }) {
  return (
    <Box overflowX="auto" mt={4}>
      <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Question</Th>
            <Th>Votes</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {polls.map((poll) => (
            <Tr key={poll.id}>
              <Td>{poll.question}</Td>
              <Td>{poll.votes}</Td>
              <Td>
                <Button colorScheme="teal" size="sm">
                  Vote
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default PollTable;