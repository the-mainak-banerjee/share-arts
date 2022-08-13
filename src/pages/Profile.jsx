import { Avatar, Box, Button, Flex, Heading, Text, Link } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useParams, Link as ReachLink } from 'react-router-dom'
import { selectSignedInUser, selectUserDetails } from '../features/users/usersSlice'
import { selectUserPosts } from '../features/posts/postsSlice'
import { useFollowAction } from '../hooks/useFollowActions'
import usePageTitle from '../hooks/usePageTitle'

const Profile = () => {
  const params = useParams()
  const currUser = useSelector(selectSignedInUser)
  const userDetails = useSelector(state => selectUserDetails(state,params.userId))
  const currUserDetails = useSelector(state => selectUserDetails(state,currUser?.userId))
  const userPosts = useSelector(selectUserPosts)
  const { handleFollow, loading } = useFollowAction(currUser.userId)
  usePageTitle(`ShareArts-Profile`)

  

  return (
    <>
    <Box as='section' py='32' backgroundColor='#f8f8f8'>
      <Box px='2' py='6' mb='10' maxW='xl' mx='auto' border='1px' borderColor='blue.300' borderRadius='lg' boxShadow='lg' backgroundColor='white'>
        <Flex alignItems='center' gap='6'>
          <Avatar size='xl'/>
          <Box>
            <Flex alignItems='center' gap='6'>
              <Heading size='lg'>{userDetails?.name}</Heading>
              {currUser.userId === params.userId 
                ? (
                  <Button colorScheme='blue'>Edit Profile</Button>
                ) : (
                  <Button 
                    colorScheme={userDetails?.followers?.some(id => id === currUser.userId) ? 'gray' : 'blue'} 
                    isLoading={loading} 
                    disabled={loading}
                    onClick={() => handleFollow(params.userId,userDetails,currUserDetails)}  
                  >
                      {userDetails?.followers?.some(id => id === currUser.userId) ? 'Unfollow' : 'Follow'}
                  </Button>
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
      </Box>
      <Outlet/>
    </Box>
    </>
  )
}

export default Profile
