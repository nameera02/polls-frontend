import { useState } from 'react';
import { VStack, RadioGroup, Radio, Button } from '@chakra-ui/react';
import axios from 'axios';

function Poll({ poll }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleVote = async () => {
    try {
      await axios.post(`/api/polls/${poll.id}/vote`, { option: selectedOption });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack>
      <RadioGroup onChange={setSelectedOption} value={selectedOption}>
        {poll.options.map(option => (
          <Radio key={option} value={option}>{option}</Radio>
        ))}
      </RadioGroup>
      <Button colorScheme="teal" onClick={handleVote}>
        Submit Vote
      </Button>
    </VStack>
  );
}

export default Poll;