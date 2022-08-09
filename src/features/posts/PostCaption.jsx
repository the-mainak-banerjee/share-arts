import { Box, Button, Link, Text } from '@chakra-ui/react'
import React from 'react'

const PostCaption = ({ post , showFullCaption, setShowFullCaption}) => {
  return (
    <>
        <Box>
           <Text>
               <Link to='/' fontWeight='bold'>UserName</Link>{' '}
               {post.caption.length < 150 ? (
                   post.caption
               ) : (
                   <>
                       {showFullCaption 
                       ? post.caption
                       : post.caption.substring(0,160-'userName'.length)
                       }
                       {'... '}
                       <Button size='xs' variant='unstyled' onClick={() => setShowFullCaption(prevState => !prevState)}>{showFullCaption ? 'see less' : 'see more'}</Button>
                   </>
               )}
           </Text>
        </Box>
        <Box>
            <Text fontSize='xs'>{post.createdAt}</Text>
        </Box>
    </>
  )
}

export default PostCaption
