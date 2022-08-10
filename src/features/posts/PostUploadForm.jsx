import { Avatar, Box, Button, Container, Flex, FormControl, FormLabel, IconButton, Image, Input, Text, Textarea, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { BsFileImage } from 'react-icons/bs'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../../services/Firebase'
import { v4 as uuid } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

const PostUploadForm = ({currentUser, currentUserDetails}) => {

  const [captionInput,setCaptionInput] = useState('')
  const [uploadedImage, setUploadedImage] = useState('')
  const [loading,setLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const handleImageInput = (e) => {
    setUploadedImage(e.target.files[0])
  }

  const clearImageInput = (e) => {
    e.preventDefault()
    setUploadedImage('')
  }

  // save post in firestore
  const savePostInFirestore = async (caption,image) => {
    try{
      await addDoc(collection(db,'posts'),{
        caption: caption,
        imageUrl: image? image : '',
        createdBy: currentUser,
        likes: [],
        comments: [],
        saves: [],
        createdAt: serverTimestamp()
      })
    }catch(error){
      toast({
        title: error.message,
        status: 'error'
      })
    }
  }

  const handlePostSubmit = () => {
    // e.preventDefault()
    setLoading(true)
    const storageRef = ref(storage, `posts/${uploadedImage.name + uuid()}`)
    const uploadTask = uploadBytesResumable(storageRef, uploadedImage)
    uploadTask.on('state_changed',
        (snapshot) => {
            const progressAmount = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // setProgress(progressAmount)
        },
        (error) => {
            toast({
              title: error.message,
              status: 'error'
          })
          console.log(error)
          setLoading(false)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                savePostInFirestore(captionInput,downloadUrl)
                setUploadedImage('')
                setCaptionInput('')
                setLoading(false)
                navigate('/', {replace:true})
            }) 
        }
    )
        
    // }else{                
    //         savePostInFirestore(captionInput)
    //         setCaptionInput('')
    //         setLoading(false)
    //         navigate('/', {replace:true})
    // }           
}

  return (
    <Container px='2' py='4' maxW='xl' backgroundColor='white' border='1px' borderColor='blue.300' borderRadius='lg' boxShadow='lg' position='relative'>
        <Flex gap='2' alignItems='center' mb='2'>
            <Avatar
              size='sm'
            />
            <Text fontWeight='medium' fontSize='xl'>{currentUserDetails.name}</Text>
        </Flex>
        <Textarea placeholder='Add Caption Here...' outline='0' border='0' value={captionInput} onChange={(e) => setCaptionInput(e.target.value)}/>
        <Box mt='2' border='2px' borderColor='gray.300'>
          <FormControl>
            <FormLabel>
              {uploadedImage
              ? (
                <Flex h='lg' cursor='pointer' position='relative'>
                    <Image
                      src={URL.createObjectURL(uploadedImage)}
                      boxSize='full'
                    />
                    <IconButton icon={<AiOutlineCloseCircle/>} position='absolute' top='1' right='1' onClick={clearImageInput}/>
                </Flex>
              ) : (
                <Flex maxW='xl' h='sm' alignItems='center' justifyContent='center' flexDirection='column' cursor='pointer'>
                  <BsFileImage size='4rem'/>
                  <Text>Upload Image</Text>
                </Flex>
              )
              }
            </FormLabel>
            <Input type='file' accept='image/*' display='none' onChange={handleImageInput}/>
          </FormControl>
        </Box>
        <Button 
            mt='4' 
            colorScheme='blue' 
            width='full' 
            disabled={!captionInput || !uploadedImage || loading} 
            isLoading={loading} loadingText='Uploading Post...' 
            onClick={handlePostSubmit}>
            Upload Post
        </Button>
    </Container>
  )
}

export default PostUploadForm
