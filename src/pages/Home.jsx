import React, { useEffect } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import PostContainer from '../features/posts/PostContainer'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPosts, setAllPosts } from '../features/posts/postsSlice'
import { seletAllUsers, selectSignedInUser } from '../features/users/usersSlice'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../services/Firebase'
import formatDate from '../utils/FormatDate'
import usePageTitle from '../hooks/usePageTitle'
import PostSkeleton from '../components/skeletons/PostSkeleton'


const Home = () => {
  usePageTitle('ShareArts')
  const posts = useSelector(selectAllPosts)
  const allUsers = useSelector(seletAllUsers)
  const currUser = useSelector(selectSignedInUser)
  const dispatch = useDispatch()


  // Get all posts data from database
  useEffect(() => {
    const unsub = onSnapshot(query(collection(db,'posts'),orderBy('createdAt', 'desc')) , (querySnapshot) => {
      const allPosts = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          createdAt: formatDate(doc.data().createdAt)
      }))
      dispatch(setAllPosts(allPosts))
  })

  return () => unsub()
  }, [dispatch])

  
  
  return (
   <Box as='section' backgroundColor='#f8f8f8'>
    <Flex alignItems='center' justifyContent='center' flexDirection='column' gap='6' pt='32'>
      {posts?.length > 0
        ? (
            <>
              {posts.map(post => {
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
              {Array.of(1,2,3,4,5).map(item => {
                return (
                  <PostSkeleton
                    key={item}
                  />
                )
              })}
            </>
        )
      }
      
    </Flex>
   </Box>
  )
}

export default Home
