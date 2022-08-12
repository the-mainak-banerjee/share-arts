import { Avatar, Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostContainer from '../features/posts/PostContainer'
import { selectSignedInUser, selectUserDetails, seletAllUsers } from '../features/users/usersSlice'
import { selectUserPosts, selectSavedPosts, setSavedPosts, setUserPosts } from '../features/posts/postsSlice'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../services/Firebase'
import formatDate from '../utils/FormatDate'
import { useUser } from '../hooks/useUser'

const Profile = () => {
  const params = useParams()
  const currUser = useSelector(selectSignedInUser)
  const userDetails = useSelector(state => selectUserDetails(state,params.userId))
  const currUserDetails = useSelector(state => selectUserDetails(state,currUser?.userId))
  const allUsers = useSelector(seletAllUsers)
  const savedPosts = useSelector(selectSavedPosts)
  const userPosts = useSelector(selectUserPosts)
  const dispatch = useDispatch()
  const { updateUser } = useUser()
  const [postType, setPostType] = useState('ownPost')
  const [loading,setLoading] = useState(false)



  //  reset the post type when page changes
  useEffect(() => {
    setPostType('ownPost')
  },[params])

  // get the saved post and users post data from database 
  useEffect(() => {
    let unSub;
    if(postType === 'savedPost'){
      unSub = onSnapshot(query(collection(db,'posts'),where('saves', 'array-contains', `${params.userId}`)), (querySnapshot) => {
        const allPosts = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            createdAt: formatDate(doc.data().createdAt)
        }))
        dispatch(setSavedPosts(allPosts))
    })
    }else if(postType === 'ownPost'){
      unSub = onSnapshot(query(collection(db,'posts'),where('createdBy', '==', `${params.userId}`)) , (querySnapshot) => {
        const allPosts = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            createdAt: formatDate(doc.data().createdAt)
        }))
        dispatch(setUserPosts(allPosts))
    })
    }

  return () => unSub && unSub()
  }, [dispatch, params, postType])


  const handleFollow = () => {
    const isFollowed = userDetails?.followers?.some(id => id === currUser.userId)
    const userData = {
      followers: isFollowed ? userDetails?.followers.filter(id => id!== currUser.userId) : [...userDetails?.followers, currUser.userId]
    }
    updateUser(params.userId,userData,setLoading)

    const currUserData = {
      following: isFollowed ? currUserDetails?.following.filter(id => id!== params.userId) : [...currUserDetails?.following, params.userId]
    }

    updateUser(currUser.userId, currUserData, setLoading)
    
  }

  

  return (
    <Box as='section' pt='32' backgroundColor='#f8f8f8'>
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
                    onClick={handleFollow}  
                  >
                      {userDetails?.followers?.some(id => id === currUser.userId) ? 'Unfollow' : 'Follow'}
                  </Button>
                )
              }
            </Flex>
            <Flex alignItems='center' gap='2' my='2'>
              <Text fontWeight='medium'>{userDetails?.following?.length} Following</Text>
              <Text fontWeight='medium'>{userDetails?.followers?.length} {userDetails?.followers?.length > 1 ? 'Followers' : 'Follower'}</Text>
              <Text fontWeight='medium'>{userPosts?.length} {userPosts?.length > 1 ? 'Posts' : 'Post'}</Text>
            </Flex>
            {userDetails?.bio && <Text>{userDetails?.bio}</Text>}
          </Box>
        </Flex>
      </Box>
        <Flex gap='10' px='2' py='4' border='1px' borderColor='blue.300' borderRadius='lg' mb='10' maxW='xl' mx='auto' justifyContent='center'>
            <Button 
              size='lg' 
              colorScheme='blue' 
              variant={postType==='ownPost' ? 'solid' : 'outline'}
              onClick={() => setPostType('ownPost')}
            >
                Posts
            </Button>
            <Button 
              size='lg' 
              colorScheme='blue' 
              variant={postType==='savedPost' ? 'solid' : 'outline'}
              onClick={() => setPostType('savedPost')}
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
              <Container centerContent height='80vh' width='container.xl'>
                <Text fontSize='xl' fontWeight='medium'>No Post To Display!!</Text>
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
              <Container centerContent height='80vh' width='container.xl'>
                <Text fontSize='xl' fontWeight='medium'>No Post To Display!!</Text>
              </Container>
          )
        }
      </>}
    </Box>
  )
}

export default Profile
