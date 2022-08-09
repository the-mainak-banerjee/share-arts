import { Box, Button, Container, Divider, Flex, Image, Input} from '@chakra-ui/react'

import React, { useState } from 'react'
import PostHeader from './PostHeader'
import PostActions from './PostActions'
import PostCaption from './PostCaption'
import PostComments from './PostComments'

const PostContainer = ({post}) => {
    const [showAction, setShowAction] = useState(false)
    const [showFullCaption, setShowFullCaption] = useState(false)
    const [showAllComments,setShowAllComments] = useState(false)


  return (
    <Container p='2' maxW='xl' backgroundColor='white' border='1px' borderColor='gray.300' position='relative'>
        <PostHeader
            showAction={showAction}
            setShowAction={setShowAction}
        />

        <Box position='relative' my='2' width='full' height='96'>
            <Image
                src={post.imageUrl}
                boxSize='full'
            /> 
        </Box>

        <PostActions post={post}/>

        <PostCaption
            post={post}
            showFullCaption={showFullCaption}
            setShowFullCaption= {setShowFullCaption}    
        />

        <PostComments 
            post={post}
            showAllComments={showAllComments}
            setShowAllComments={setShowAllComments}
        />
        
        <Divider my='2'/>
        <Flex my='2' gap='2'>
            <Input type='text' placeholder='add a comment'/>
            <Button>Post</Button>
        </Flex>
    </Container>
  )
}

export default PostContainer
