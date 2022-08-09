import { Flex, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { BsBookmark } from 'react-icons/bs'

const PostActions = ({ post }) => {
  return (
    <>
        <Flex alignItems='center' gap='4'>
            <AiOutlineHeart cursor='pointer' size='25px'/>
            {/* <AiFillHeart cursor='pointer' size='25px'/> */}
            <FaRegComment cursor='pointer' size='25px'/>
            <Spacer/>
            <BsBookmark cursor='pointer' size='25px'/>
            {/* <BsBookmarkFill cursor='pointer' size='25px'/> */} 
        </Flex>
        <Text fontSize='sm' fontWeight='bold' mt='1'>{post.likesCount} {post.likesCount > 1 ? 'likes' : 'like'}</Text> 
    </>
  )
}

export default PostActions
