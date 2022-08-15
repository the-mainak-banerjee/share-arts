import { Box, Button, Link, Text } from '@chakra-ui/react'
import React from 'react'
import  { Link as ReachLink } from 'react-router-dom'

const PostCaption = ({ post , showFullCaption, setShowFullCaption, postOwnerDetails}) => {
  return (
    <>
        <Box px='2'>
           <Text>
               <Link as={ReachLink} to={`/profile/${postOwnerDetails?.id}/posts`} fontWeight='bold'>{postOwnerDetails?.name}</Link>{' '}
               {post?.caption?.length < 150 ? (
                   post?.caption
               ) : (
                   <>
                       {showFullCaption 
                       ? post?.caption
                       : post?.caption?.substring(0,160-postOwnerDetails?.name?.length)
                       }
                       {'... '}
                       <Button size='xs' variant='unstyled' onClick={() => setShowFullCaption(prevState => !prevState)}>{showFullCaption ? 'see less' : 'see more'}</Button>
                   </>
               )}
           </Text>
        </Box>
        <Box>
            <Text px='2' fontSize='xs'>{post?.createdAt?.formatedDate}-{post?.createdAt?.formatedHour}:{post?.createdAt?.formatedMins}</Text>
        </Box>
    </>
  )
}

export default PostCaption
