import { Flex, Spacer, Text, useToast, CircularProgress } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { useState } from 'react'
import { usePost } from '../../hooks/usePost'

const PostActions = ({ post, currUserId }) => {
  const [likeLoading, setLikeLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const toast = useToast()
  const { updatePost } = usePost(post.id)


  const handlelikeAction = () => {
    if(currUserId){
      const isLiked = post.likes?.some(item => item === currUserId)
      const data = {
        likes: isLiked ? post.likes.filter(item => item !== currUserId) : [...post.likes,currUserId]
      }
      const msg = isLiked ? 'Post Disliked Successfully' : 'Post Liked Successfully'
      updatePost(data,setLikeLoading,toast,msg)
    }else{
      toast({
        title: 'Please Login to like a post',
        status: 'info',
        position: 'bottom-left'
      })
    }
  }
  
  const handleSaveAction = () => {
    if(currUserId){
      const isSaved = post.saves?.some(item => item === currUserId)
      const data = {
        saves: isSaved ? post.saves.filter(item => item !== currUserId) : [...post.saves,currUserId]
      }
      const msg = isSaved ? 'Removed From Save Posts' : 'Added To Saved Posts'
      updatePost(data,setSaveLoading,toast,msg)
    }else{
      toast({
        title: 'Please Login to like a post',
        status: 'info',
        position: 'bottom-left'
      })
    }
  }

  return (
    <>
        <Flex alignItems='center' gap='4' px='2'>
          {post.likes?.some(item => item === currUserId) 
            ? (
              <AiFillHeart cursor='pointer' size='25px' onClick={handlelikeAction} color='red'/>
            )  : (
              <>
                {likeLoading ? <CircularProgress isIndeterminate color='blue.500' size='25px'/> : <AiOutlineHeart cursor='pointer' size='25px' onClick={handlelikeAction}/>}
              </>
            )
          }
            <FaRegComment cursor='pointer' size='25px'/>

            <Spacer/>

            {post.saves?.some(item => item === currUserId) 
            ? (
              <BsBookmarkFill cursor='pointer' size='25px' onClick={handleSaveAction} color='blue'/>
            )  : (
              <>
                {saveLoading ? <CircularProgress isIndeterminate color='blue.500' size='25px'/> : <BsBookmark cursor='pointer' size='25px' onClick={handleSaveAction}/>}
              </>
            )
          }
        </Flex>
        <Text px='2' fontSize='sm' fontWeight='bold' mt='1'>{post.likes?.length} {post.likes?.length > 1 ? 'likes' : 'like'}</Text> 
    </>
  )
}

export default PostActions
