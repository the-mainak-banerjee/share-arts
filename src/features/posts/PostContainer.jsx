import { Box, Button, Container, Divider, Flex, Image, Input, useDisclosure} from '@chakra-ui/react'
import React, { useState } from 'react'
import PostHeader from './PostHeader'
import PostActions from './PostActions'
import PostCaption from './PostCaption'
import PostComments from './PostComments'
import PostEditModal from './PostEditModal'


const PostContainer = ({post, allUsers, currUser}) => {
    const [showAction, setShowAction] = useState(false)
    const [showFullCaption, setShowFullCaption] = useState(false)
    const [showAllComments,setShowAllComments] = useState(false)
    const postOwnerDetails = allUsers?.find(user => user.id === post.createdBy)
    const isOwner = currUser?.userId === post.createdBy
    const {isOpen, onOpen, onClose} = useDisclosure()




  return (
    <Container px='0' py='4' maxW='xl' backgroundColor='white' border='1px' borderColor='blue.300' borderRadius='lg' boxShadow='lg' position='relative'>
        <PostHeader
            showAction={showAction}
            setShowAction={setShowAction}
            isOwner={isOwner}
            postOwnerDetails={postOwnerDetails}
            post={post}
            onOpen={onOpen}
        />

        {post?.imageUrl && <Box position='relative' mt='4' mb='2' width='full' height='lg' border='1px' borderColor='#f4f4f4'>
            <Image
                src={post.imageUrl}
                boxSize='full'
            /> 
        </Box>}

        <PostActions 
            post={post}
            currUserId ={currUser.userId}
        />

        <PostCaption
            post={post}
            showFullCaption={showFullCaption}
            setShowFullCaption= {setShowFullCaption}
            postOwnerDetails = {postOwnerDetails}    
        />

        <PostComments 
            post={post}
            showAllComments={showAllComments}
            setShowAllComments={setShowAllComments}
        />
        
        <Divider my='2'/>
        <Flex my='2' gap='2' px='2'>
            <Input type='text' placeholder='add a comment'/>
            <Button>Post</Button>
        </Flex>
        <PostEditModal
         isOpen={isOpen}
         onClose={onClose}
         post={post}
        />
    </Container>
  )
}

export default PostContainer
