import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Image, Radio, RadioGroup, Stack,useToast } from "@chakra-ui/react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const PollDetailPage = () => {
  const { pollId } = useParams();  // Get the pollId from the URL params
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const toast = useToast();
  const url="http://localhost:4000/uploads/polls_images/";
  // Fetch poll details by ID
  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/poll/${pollId}`);
        setPoll(response.data.poll);
      } catch (error) {
        console.error("Error fetching poll:", error);
      }
    };

    fetchPoll();
  }, [pollId]);

  // Handle voting
  const handleVote = async () => {
    if (!selectedOption) {
      alert("Please select an option before voting!");
      return;
    }

    try {
      // Submit the vote to the server
      if(user!=null){
      await axios.put(`http://localhost:4000/api/v1/vote`, { optionId: selectedOption,pollId,userId:user.id });
      }else{
      await axios.put(`http://localhost:4000/api/v1/vote`, { optionId: selectedOption,pollId});
      }
      toast({
        title: 'Your vote has been recorded!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      // Redirect to the results page or back to the polls list
      navigate("/polls");  // You can change this to navigate to another page
    } catch (error) {
      toast({
        title: 'You have already voted on this poll.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      {poll ? (
        <div>
          <h1>{poll.question}</h1>          
          <Image src={url+poll.image} alt={poll.question} boxSize="200px" mb={3} />
          <RadioGroup onChange={setSelectedOption} value={selectedOption}>
            <Stack direction="column">
              {poll.options.map((option, index) => (
                <Radio key={index} value={option.optionId} mb={3}>
                  {option.option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Button colorScheme="teal" onClick={handleVote}>
            Submit Vote
          </Button>
        </div>
      ) : (
        <p>Loading poll...</p>
      )}
    </div>
  );
};

export default PollDetailPage;