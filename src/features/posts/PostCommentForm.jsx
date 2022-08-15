import { Button, Flex, Input, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { usePost } from '../../hooks/usePost'
import { v4 as uuid } from 'uuid'

const PostCommentForm = ({ post, currUserId }) => {

    const [commentInput,setCommentInput] = useState('')
    const [loading,setLoading] = useState(false)
    const toast = useToast()
    const { updatePost } = usePost(post.id)

    const handleCommentCreation = () => {
        const data = {
          comments: [...post.comments, { content: commentInput, id:uuid(), createdBy:currUserId }]
        }
        updatePost(data,setLoading,toast,'Comment Published Successfully')
        setCommentInput('')
    }

  return (
    <>
      <Flex my='2' gap='2' px='2'>
          <Input type='text' placeholder='add a comment' value={commentInput} onChange={(e) => setCommentInput(e.target.value)}/>
          <Button colorScheme='blue' onClick={handleCommentCreation} isLoading={loading} loadingText='Posting...' disabled={!commentInput || loading}>Post</Button>
      </Flex>
    </>
  )
}

export default PostCommentForm
