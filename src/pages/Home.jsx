import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import PostContainer from '../features/posts/PostContainer'
import { useSelector } from 'react-redux'

const Home = () => {
  const posts = useSelector(state => state.posts)
  const users = useSelector(state=> state.users)

  console.log(users)
  
  
  return (
   <Box as='section'>
    <Flex alignItems='center' justifyContent='center' flexDirection='column' gap='6' mt='30'>
      {posts.map(post => {
        return (
          <PostContainer 
            key={post.id}
            post={post}
          />
        )
      })}
    </Flex>
   </Box>
  )
}

export default Home
