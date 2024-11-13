import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Textarea,
  useDisclosure,
  FormControl,
  FormLabel,
  Image,
  useToast
} from '@chakra-ui/react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

function CreatePollModal({ isOpen, onClose,getPolls }) {
  const [question, setQuestion] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [options, setOptions] = useState(['', '']); // Minimum 2 options
  const [imageFile, setImageFile] = useState(null);
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const toast = useToast();
  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Set the image URL to the state
      };
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };
  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleCreate = async() => {
    if (question && imageFile && options.length >= 2) {
      const formData = new FormData();
      formData.append('question', question);
      formData.append('image', imageFile);
      formData.append('user_id', user.id);
      options.forEach((option, index) => {
        formData.append(`options[${index}]`, option);
      });

      try {
        const response = await axios.post('http://localhost:4000/api/v1/polls', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.data.success) {
          setQuestion('');
          setImageUrl('');
          setOptions(['', '']);
          setImageFile(null);
          getPolls();
          onClose();
          toast({
            title: 'Poll Added Successfully',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: 'Error creating poll',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Poll</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Question</FormLabel>
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter poll question"
            />
          </FormControl>
          <FormControl mb={4}>
  <FormLabel>Poll Image</FormLabel>
  <Input
    type="file"
    accept="image/*"
    onChange={(e) => handleImageUpload(e)}
  />
  {imageUrl && (
    <Image src={imageUrl} alt="Selected Poll Image" boxSize="100px" mt={2} />
  )}
</FormControl>
          <FormControl mb={4}>
            <FormLabel>Options</FormLabel>
            {options.map((option, index) => (
              <div key={index}>
                <Input
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...options];
                    updatedOptions[index] = e.target.value;
                    setOptions(updatedOptions);
                  }}
                  placeholder={`Option ${index + 1}`}
                  mb={2}
                />
                {options.length > 2 && (
                  <Button size="sm" colorScheme="red" onClick={() => handleRemoveOption(index)}>
                    Remove Option
                  </Button>
                )}
              </div>
            ))}
            {options.length < 5 && (
              <Button size="sm" colorScheme="teal" onClick={handleAddOption}>
                Add Option
              </Button>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleCreate}>
            Create Poll
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default CreatePollModal;