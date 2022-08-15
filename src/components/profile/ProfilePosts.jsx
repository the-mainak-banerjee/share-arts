import { Button, Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import PostContainer from '../../features/posts/PostContainer'
import {  seletAllUsers } from '../../features/users/usersSlice'
import { selectUserPosts, selectSavedPosts } from '../../features/posts/postsSlice'
import { useNavigate } from 'react-router-dom'


const ProfilePost = ({params, postType, currUser, handlePostType}) => {
  const allUsers = useSelector(seletAllUsers)
  const savedPosts = useSelector(selectSavedPosts)
  const userPosts = useSelector(selectUserPosts)
  const navigate = useNavigate()

  

  return (
    <>
        <Flex gap='10' px='2' py='4' borderX={{base:'0px', md:'1px'}} borderY='1px' borderColor='blue.300' borderRadius={{base:'none', md:'lg'}} mb='10' maxW='xl' mx='auto' justifyContent='center'>
            <Button 
              size='lg' 
              colorScheme='blue' 
              variant={postType==='ownPost' ? 'solid' : 'outline'}
              onClick={() => handlePostType('ownPost')}
            >
                Posts
            </Button>
            <Button 
              size='lg' 
              colorScheme='blue' 
              variant={postType==='savedPost' ? 'solid' : 'outline'}
              onClick={() => handlePostType('savedPost')}
            >
                Saved Posts
            </Button>
        </Flex>
      {postType==='ownPost' && <>
        {userPosts?.length>0 
          ? (
              <Flex alignItems='center' justifyContent='center' flexDirection='column' gap='6'>
                {userPosts.map(post => {
                  return (
                    <PostContainer 
                      key={post.id}
                      post={post}
                      allUsers={allUsers}
                      currUser = {currUser}
                    />
                  )
                })}
              </Flex>
          ) : (
              <Container centerContent height='80vh'>
                <Text fontSize='xl' fontWeight='medium'>No Post To Display!!</Text>
                {params.userId === currUser.userId && <Button mt='4' colorScheme='blue' onClick={() => navigate('/createPost')}>Upload New Post</Button>}
              </Container>
          )
        }
      </>}
      {postType==='savedPost' && <>
        {savedPosts?.length>0 
          ? (
              <Flex alignItems='center' justifyContent='center' flexDirection='column' gap='6'>
                {savedPosts.map(post => {
                  return (
                    <PostContainer 
                      key={post.id}
                      post={post}
                      allUsers={allUsers}
                      currUser = {currUser}
                    />
                  )
                })}
              </Flex>
          ) : (
              <Container centerContent height='80vh'>
                <Text fontSize='xl' fontWeight='medium'>No Post To Display!!</Text>
                {params.userId === currUser.userId && <Button mt='4' colorScheme='blue' onClick={() => navigate('/')}>Explore Posts</Button>}
              </Container>
          )
        }
      </>}
    </>
  )
}

export default ProfilePost
