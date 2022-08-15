import { Avatar, Box, Button, Container, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Text, useToast } from '@chakra-ui/react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { storage } from '../../services/Firebase'
import { v4 as uuid } from 'uuid'

const EditProfileCard = ({ isOpen, onClose, currUserDetails, updateType }) => {

    const [nameInput,setNameInput] = useState(currUserDetails?.name)
    const [bioInput,setBioInput] = useState(currUserDetails?.bio ?? '')
    const [loading,setLoading] = useState(false)
    const [uploadedImage, setUploadedImage] = useState('')
    const [progress,setProgress] = useState(null)
    const { updateUser, updateUserProfile } = useUser()
    const toast = useToast()

    const handleImageInput = (e) => {
        setUploadedImage(e.target.files[0])
    }


    const handleProfileUpdate = () => {
        let data;

        if(nameInput !== currUserDetails?.name){
            data = {
                name: nameInput
            }
            updateUser(currUserDetails.id, data, setLoading)
            updateUserProfile({displayName: nameInput})
            if(bioInput !== currUserDetails?.bio){
                data = {
                    name: nameInput,
                    bio: bioInput
                }
                updateUser(currUserDetails.id, data, setLoading)
                updateUserProfile({displayName: nameInput})
            }
        }else if(bioInput !== currUserDetails?.bio){
            data = {
                bio: bioInput
            }
            updateUser(currUserDetails.id, data, setLoading)
        }
        onClose()
    }


    const handlePhotoUpdate = () => {
        setLoading(true)
        const storageRef = ref(storage, `posts/${uploadedImage.name + uuid()}`)
        const uploadTask = uploadBytesResumable(storageRef, uploadedImage)
        uploadTask.on('state_changed',
            (snapshot) => {
                const progressAmount = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progressAmount)
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
                    updateUser(currUserDetails.id, {profileImage: downloadUrl}, setLoading)
                    setUploadedImage('')
                    setLoading(false)
                    onClose()
                    setProgress(null)
                }) 
            }
        )
    }

    const handleClose = () => {
        setUploadedImage('')
        onClose()
    }

  return (
    <>
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} blockScrollOnMount={true}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    <Heading as='h3'>Edit Profile</Heading>
                </ModalHeader>
                <ModalBody>
                    <>
                        {updateType === 'details' &&
                            <>
                                <Box mb='4'>
                                    <Text>Name</Text>
                                    <Input type='text' placeholder='Add New Name...' value={nameInput} onChange={(e) => setNameInput(e.target.value)}/>
                                </Box>
                                <Box>
                                    <Text>Bio</Text>
                                    <Input type='text' placeholder='Add Your Bio...' value={bioInput} onChange={(e) => setBioInput(e.target.value)}/>
                                </Box>
                            </>
                        }
                        {updateType === 'photo' &&
                            <>
                                <FormControl>
                                    <FormLabel>
                                        <Container centerContent w='full'>
                                            <Avatar 
                                                size='3xl'
                                                src={uploadedImage ? URL.createObjectURL(uploadedImage) : currUserDetails.profileImage}
                                                cursor='pointer'
                                            />
                                        </Container>
                                    </FormLabel>
                                    <Input type='file' accept='image/*' display='none' onChange={handleImageInput}/>
                                </FormControl>
                                {progress>0 && <Progress hasStripe value={progress}/>}
                            </>
                        }
                    </>
                </ModalBody>
                <ModalFooter>
                    {updateType === 'details' && <Button colorScheme='blue' disabled={(nameInput===currUserDetails?.name && bioInput===currUserDetails?.bio) || !nameInput || loading} onClick={handleProfileUpdate}>Save Profile</Button>}
                    {updateType === 'photo' && <Button colorScheme='blue' disabled={!uploadedImage || loading} isLoading={loading} loadingText='Uploading Photo...' onClick={handlePhotoUpdate}>Save Profile</Button>}   
                    <Button onClick={handleClose} ml='4'>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  )
}

export default EditProfileCard
