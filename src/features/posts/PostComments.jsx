import React from 'react'
import { Avatar, Box, Flex, Image, Link, Spacer, Text } from '@chakra-ui/react'
import { BsTrash } from 'react-icons/bs'


const PostComments = ({ post, showAllComments ,setShowAllComments}) => {
  return (
   <>
    {post.comments.length>0 && <Box my='2' px='2'>
            {showAllComments 
            ?(
                <>
                    {post.comments?.map(comment => {
                        return(
                            <Flex mt='2' gap='2' alignItems='center' key={comment.id}>
                                <Avatar
                                    size='xs'
                                />
                                <Link to='/' fontWeight='bold'>UserName</Link>
                                <Text>{comment.text}</Text>
                                <Spacer/>
                                <BsTrash cursor='pointer'/>
                            </Flex>
                        )
                    })}
                </>
            ) :(
                <>
                    <Text mt='2' cursor='pointer' onClick={() => setShowAllComments(true)}>{`Show All ${post.comments.length} Comments`}</Text>
                </>
            )
            }
        </Box>}
   </>
  )
}

export default PostComments
