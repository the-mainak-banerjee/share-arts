import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import PostUploadForm from '../features/posts/PostUploadForm'

const CreatePost = () => {
  return (
    <Box>
      <Flex alignItems='center' justifyContent='center' mt='30'>  
          <PostUploadForm/>
      </Flex>
    </Box>
  )
}

export default CreatePost
