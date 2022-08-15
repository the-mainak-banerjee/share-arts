import { Avatar, Box, Button, Flex, Heading, Text, Link, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useParams, Link as ReachLink } from 'react-router-dom'
import { selectSignedInUser, selectUserDetails } from '../../features/users/usersSlice'
import { selectUserPosts } from '../../features/posts/postsSlice'
import { useFollowAction } from '../../hooks/useFollowActions'
import usePageTitle from '../../hooks/usePageTitle'
import EditProfileCard from '../../components/profile/EditProfileCard'



const Profile = () => {
  const params = useParams()
  const currUser = useSelector(selectSignedInUser)
  const userDetails = useSelector(state => selectUserDetails(state,params.userId))
  const currUserDetails = useSelector(state => selectUserDetails(state,currUser?.userId))
  const userPosts = useSelector(selectUserPosts)
  const [updateType,setUpdateType] = useState('')
  const { handleFollow, loading } = useFollowAction(currUser.userId)
  const {isOpen, onOpen, onClose} = useDisclosure()
  usePageTitle(`ShareArts-Profile`)

  const handleDetailsUpdate = () => {
    setUpdateType('details')
    onOpen()
  }

  const handlePhotoUpdate = () => {
    setUpdateType('photo')
    onOpen()
  }


  return (
    <>
      <Box as='section' pt='32' minHeight='100vh'>
        <Box px='2' py='6' mb='10' maxW='xl' mx='auto' borderY='1px' borderX={{base:'0px', md:'1px'}} borderColor='blue.300' borderRadius={{base:'none', md:'lg'}} boxShadow='lg' backgroundColor='white'>
          <Flex alignItems='center' gap='6'>
              <Avatar size='xl' cursor='pointer' onClick={handlePhotoUpdate} src={userDetails?.profileImage}/>
            <Box>
              <Flex alignItems='center' gap='6'>
                <Heading size={{base:'md', md:'lg'}}>{userDetails?.name}</Heading>
                {currUser.userId === params.userId 
                  ? (
                    <Button colorScheme='blue' onClick={handleDetailsUpdate}>Edit Profile</Button>
                  ) : (
                    <>
                      {currUser?.userId && <Button 
                        colorScheme={userDetails?.followers?.some(id => id === currUser.userId) ? 'gray' : 'blue'} 
                        isLoading={loading} 
                        disabled={loading}
                        onClick={() => handleFollow(params.userId,userDetails,currUserDetails)}  
                      >
                          {userDetails?.followers?.some(id => id === currUser.userId) ? 'Unfollow' : 'Follow'}
                      </Button>}
                    </>
                  )
                }
              </Flex>
              <Flex alignItems='center' gap='2' my='2'>
                <Text fontWeight='medium' cursor='pointer' _hover={{textDecoration:'underline'}}><Link as={ReachLink} to='following'>{userDetails?.following?.length} Following</Link></Text>
                <Text fontWeight='medium' cursor='pointer' _hover={{textDecoration:'underline'}}><Link as={ReachLink} to='followers'>{userDetails?.followers?.length} {userDetails?.followers?.length > 1 ? 'Followers' : 'Follower'}</Link></Text>
                <Text fontWeight='medium' cursor='pointer' _hover={{textDecoration:'underline'}}><Link as={ReachLink} to='posts'>{userPosts?.length} {userPosts?.length > 1 ? 'Posts' : 'Post'}</Link></Text>
              </Flex>
              {userDetails?.bio && <Text>{userDetails?.bio}</Text>}
            </Box>
          </Flex>
          <EditProfileCard
            isOpen={isOpen}
            onClose={onClose}
            currUser={currUser}
            currUserDetails={currUserDetails}
            updateType={updateType}
          />
        </Box>
        <Outlet/>
      </Box>
    </>
  )
}

export default Profile
