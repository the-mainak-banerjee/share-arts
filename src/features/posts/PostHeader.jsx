import React from 'react'
import { Avatar, Box, Flex, Link, Spacer, Text } from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link as ReachLink } from 'react-router-dom'

const PostHeader = ({post, showAction, setShowAction, postOwnerDetails, isOwner, onOpen, handleModalContent}) => {



  // Delete post handler
  const handlePostDelete = () => {
    handleModalContent()
    onOpen()
    setShowAction(false)
  }

  // Edit post handler
  const handlePostEdit = () => {
    onOpen()
    setShowAction(false)
  }


  return (
    <>
        <Flex gap='2' alignItems='center' px='2'>
            <Avatar
              size='sm'
              src={postOwnerDetails?.profileImage}
            />
            <Link as={ReachLink} to={`/profile/${postOwnerDetails?.id}/posts`}>
              <Text fontWeight='medium' fontSize='xl'>{postOwnerDetails?.name}</Text>
            </Link>
            <Spacer/>
            {isOwner && <BsThreeDotsVertical cursor='pointer' onClick={() => setShowAction(prevState => !prevState)}/>}
        </Flex>
        
        {showAction && <Box backgroundColor='#f4f4f4' boxShadow='md' position='absolute' top='10' right='2' zIndex='10'>
            <Text mb='2' px='4' py='2'  cursor='pointer' _hover={{backgroundColor:'white'}} onClick={handlePostEdit}>Edit Post</Text>
            <Text px='4' py='2' cursor='pointer' _hover={{backgroundColor:'white'}} onClick={handlePostDelete}>Delete Post</Text>
        </Box>}
    </>
  )
}

export default PostHeader
