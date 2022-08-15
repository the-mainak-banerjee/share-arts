import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Link as ReachLink } from 'react-router-dom'
import { selectSignedInUser, seletAllUsers, selectUserDetails } from '../features/users/usersSlice'
import { setFriendsPosts, selectFriendsPosts } from '../features/posts/postsSlice'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../services/Firebase'
import formatDate from '../utils/FormatDate'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import PostContainer from '../features/posts/PostContainer'

const FriendsPost = () => {

    const currUser = useSelector(selectSignedInUser)
    const allUsers = useSelector(seletAllUsers)
    const currUserDetails = useSelector(state => selectUserDetails(state,currUser?.userId))
    const friendsPosts = useSelector(selectFriendsPosts)
    const dispatch = useDispatch()


    useEffect(() => {
        let unsub;
            if(currUserDetails?.following?.length > 0){
                unsub = onSnapshot(query(collection(db,'posts'),where('createdBy', 'in', currUserDetails?.following)) , (querySnapshot) => {
                  const allPosts = querySnapshot.docs.map((doc) => ({
                      ...doc.data(),
                      id: doc.id,
                      createdAt: formatDate(doc.data().createdAt)
                  }))
                  dispatch(setFriendsPosts(allPosts))
                })
            }
        
        if(currUserDetails?.following?.length === 0) {
            dispatch(setFriendsPosts([]))
        }

      return () => unsub && unsub()
      }, [dispatch, currUserDetails?.following])


  return (
    <Box as='section' pt='32' minHeight='100vh'>
        <Flex alignItems='center' justifyContent='center' flexDirection='column' gap='6'>
        {friendsPosts?.length > 0
            ? (
                <>
                {friendsPosts.map(post => {
                    return (
                    <PostContainer 
                        key={post.id}
                        post={post}
                        allUsers={allUsers}
                        currUser = {currUser}
                    />
                    )
                })}
                </>
            ) : (
                <>
                    {currUserDetails?.following?.length === 0
                        ? (
                            <Text fontSize='xl' textAlign='center' width='70%'>Start Following People To See Their Posts</Text>
                        ) : (
                            <Text fontSize='xl' textAlign='center' width='70%'>The Members In Your Nerwork Havent posted anything. Start Following More People To See Their Posts.</Text>
                        )
                    }
                    <Link as={ReachLink} to='/'>
                        <Button colorScheme='blue'>Explore</Button>
                    </Link>
                </>
            )
        }
        
        </Flex>
   </Box>
  )
}

export default FriendsPost
