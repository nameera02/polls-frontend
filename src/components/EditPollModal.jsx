import { useState } from 'react';
import axios from 'axios';
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
  FormControl,
  FormLabel,
  Image,
} from '@chakra-ui/react';

function EditPollModal({ isOpen, onClose, poll,getPolls }) {
  const [question, setQuestion] = useState(poll.question);
  const [imageUrl, setImageUrl] = useState(poll.imageUrl);
  const [options, setOptions] = useState(poll.options);
  const [imageFile, setImageFile] = useState(null);
  const [optionValues, setOptionValues] = useState(
    options.map((option) => ({ id: option.optionId, option: option.option })) // initialize with id and empty value
  );
  
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
  
  const handleOptionChange = (index, value, id) => {
    const updatedOptionValues = [...optionValues];
    updatedOptionValues[index] = { id, option:value }; // Update both id and value
    console.log(updatedOptionValues);
    setOptionValues(updatedOptionValues);
  };

  const handleEdit = async () => {
    console.log(imageFile);
    
    if (!question || options.length < 2) {
      alert('Please fill all the required fields.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('pollId', poll._id); // Poll ID to identify the poll
      formData.append('question', question); // Updated question
      formData.append('options', JSON.stringify(optionValues)); // Updated options
  
      // If the image file is changed, append the image as well
      if (imageFile) {
        formData.append('image', imageFile); // Updated image file
      }
      // Send the update request to the backend API
      const response = await axios.put('http://localhost:4000/api/v1/update-poll', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

  
      if (response.data.success) {
        alert('Poll updated successfully!');
        getPolls();
        onClose(); // Close the modal or redirect as needed
      } else {
        alert('Failed to update poll');
      }
    } catch (error) {
      console.error('Error updating poll:', error);
      alert('An error occurred while updating the poll');
    }
    onClose();
  };

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Poll</ModalHeader>
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
                {console.log(optionValues[index])}                
                <Input
            value={optionValues[index].option} // Use optionValues for input value
            onChange={(e) => handleOptionChange(index, e.target.value,optionValues[index].id)}
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
          <Button colorScheme="teal" onClick={handleEdit}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default EditPollModal;