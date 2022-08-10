import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import PostUploadForm from '../features/posts/PostUploadForm'
import { selectSignedInUser, seletAllUsers } from '../features/users/usersSlice'

const CreatePost = () => {
  const allUsers = useSelector(seletAllUsers)
  const currentUser = useSelector(selectSignedInUser)
  const currentUserDetails = allUsers.find(user => user.id === currentUser.userId)

  return (
    <Box>
      <Flex alignItems='center' justifyContent='center' pt='30' backgroundColor='#f4f4f4' h='100vh'>  
          <PostUploadForm
            currentUser={currentUser.userId}
            currentUserDetails = {currentUserDetails}
          />
      </Flex>
    </Box>
  )
}

export default CreatePost
