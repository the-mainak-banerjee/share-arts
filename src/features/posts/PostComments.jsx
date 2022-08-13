import React, { useState } from 'react'
import { Link as ReachLink } from 'react-router-dom'
import { Avatar, Button, Flex, Link, Text, useToast } from '@chakra-ui/react'
import { usePost } from '../../hooks/usePost'
import { useSelector } from 'react-redux'
import { selectUserDetails } from '../users/usersSlice'



const PostComments = ({ comment,post, currUserId }) => {
  const [showFullComment, setShowFullComment] = useState(false)
  const [loading,setLoading] = useState(false)
  const toast = useToast()
  const {updatePost} = usePost(post.id)
  const commentOwner = useSelector(state => selectUserDetails(state,comment.createdBy))

    const handleCommentDelete = (commentId) => {
        const data = {
          comments: post.comments.filter(comment => comment.id!==commentId)
        }
        updatePost(data,setLoading,toast,'Comment Deleted Successfully')
    }

  return (
   <>
    <Flex mt='2' gap='2' key={comment.id}>
        <Avatar
            size='xs'
        />
        <Flex flexDirection='column'>
          <Text>
            <Link as={ReachLink} to={`/profile/${commentOwner?.id}`} fontWeight='bold'>{commentOwner?.name}</Link>{' '}
            {comment.content.length < 150 ? (
                comment.content
            ) : (
                <>
                    {showFullComment
                    ? comment.content
                    : comment.content.substring(0,160-commentOwner?.name?.length)
                    }
                    {'... '}
                    <Button size='xs' variant='unstyled' onClick={() => setShowFullComment(prevState => !prevState)}>{showFullComment ? 'see less' : 'see more'}</Button>
                </>
            )}
          </Text>
          {commentOwner.id === currUserId && <Button size='xs' variant='outline' colorScheme='red' w='50px' mt='2' isLoading={loading} disabled={loading} onClick={() => handleCommentDelete(comment.id)}>Delete</Button>}
        </Flex>
    </Flex>
   </>
  )
}

export default PostComments
