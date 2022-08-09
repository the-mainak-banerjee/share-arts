import { Button, Container, Flex, FormControl, FormLabel, IconButton, Image, Input, Text, Textarea } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { BsFileImage } from 'react-icons/bs'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const PostUploadForm = () => {

  const [captionInput,setCaptionInput] = useState('')
  const [uploadedImage, setUploadedImage] = useState('')

  const handleImageInput = (e) => {
    setUploadedImage(e.target.files[0])
  }

  const clearImageInput = (e) => {
    e.preventDefault()
    setUploadedImage('')
  }

  return (
    <Container p='2' maxW='xl' backgroundColor='white' position='relative' boxShadow='md'>
        <Flex gap='2' alignItems='center' mb='2'>
            <Image
                src='../../../assets/images.jpg'
                boxSize='30px'
                borderRadius='50%'
            />
            <Text fontWeight='medium'>UserName</Text>
        </Flex>
          <Textarea placeholder='Add Caption Here...' outline='0' border='0' value={captionInput} onChange={(e) => setCaptionInput(e.target.value)}/>
        <FormControl>
          <FormLabel>
            {uploadedImage
            ? (
              <Flex mt='2' maxW='xl' h='lg' border='2px' borderColor='gray.300' cursor='pointer' position='relative'>
                  <Image
                    src={URL.createObjectURL(uploadedImage)}
                    boxSize='full'
                  />
                  <IconButton icon={<AiOutlineCloseCircle/>} position='absolute' top='1' right='1' onClick={clearImageInput}/>
              </Flex>
            ) : (
              <Flex mt='2' maxW='xl' h='sm' border='2px' borderColor='gray.300' alignItems='center' justifyContent='center' flexDirection='column' cursor='pointer'>
                <BsFileImage size='4rem'/>
                <Text>Upload Image</Text>
              </Flex>
            )
            }
          </FormLabel>
          <Input type='file' accept='image/*' display='none' onChange={handleImageInput}/>
        </FormControl>
        <Button mt='1' colorScheme='blue' width='full' disabled={!captionInput || !uploadedImage}>Upload Post</Button>
    </Container>
  )
}

export default PostUploadForm
