import { Box, Container, Divider, Image, Skeleton, Text, useDisclosure} from '@chakra-ui/react'
import React, { useState } from 'react'
import PostHeader from './PostHeader'
import PostActions from './PostActions'
import PostCaption from './PostCaption'
import PostComments from './PostComments'
import PostUpdateModal from './PostUpdateModal'
import PostCommentForm from './PostCommentForm'


const PostContainer = ({post, allUsers, currUser}) => {
    const [showAction, setShowAction] = useState(false)
    const [showFullCaption, setShowFullCaption] = useState(false)
    const [showAllComments,setShowAllComments] = useState(false)
    const [modalContent,setModalContent] = useState('edit')
    const {isOpen, onOpen, onClose} = useDisclosure()
    const postOwnerDetails = allUsers?.find(user => user.id === post.createdBy)
    const isOwner = currUser?.userId === post.createdBy

    const handleModalContent = () => {
        setModalContent('delete')
    }
    
  return (
    <> 
        <Container px='0' py='4' mb='4' maxW='xl' backgroundColor='white' borderY='1px' borderX={{base:'0px', md:'1px'}} borderColor='blue.300' borderRadius={{base:'none', md:'lg'}} boxShadow={{base:'none', md: 'lg'}} position='relative'>
            <PostHeader
                showAction={showAction}
                setShowAction={setShowAction}
                isOwner={isOwner}
                postOwnerDetails={postOwnerDetails}
                post={post}
                onOpen={onOpen}
                handleModalContent={handleModalContent}
            />

            {post?.imageUrl && <Box position='relative' mt='4' mb='2' width='full' height='lg' border='1px' borderColor='#f4f4f4'>
                <Image
                    src={post.imageUrl}
                    boxSize='full'
                    fallback={<Skeleton height='lg'/>}
                /> 
            </Box>}

            <PostActions 
                post={post}
                currUserId ={currUser.userId}
                setShowAllComments={setShowAllComments}
            />

            <PostCaption
                post={post}
                showFullCaption={showFullCaption}
                setShowFullCaption= {setShowFullCaption}
                postOwnerDetails = {postOwnerDetails}    
            />

            {post?.comments?.length>0 && <Box my='2' px='2'>
                {showAllComments
                    ?(
                        post?.comments?.map(comment => {
                            return(
                                <PostComments
                                    comment={comment}
                                    key={comment.id}
                                    post={post}
                                    currUserId ={currUser.userId}
                                />
                            )
                        })
                    ) : (
                        <>
                            <Text mt='2' cursor='pointer' onClick={() => setShowAllComments(true)}>{post?.comments?.length > 1 ? `Show All ${post?.comments?.length} Comments` : `Show Comment`}</Text>
                        </>
                    )

                }
            </Box>
            }
        
            {currUser?.userId && <Divider my='2'/>}
            {currUser?.userId && <PostCommentForm
                post={post}
                currUserId ={currUser.userId}
            />}
            <PostUpdateModal
                isOpen={isOpen}
                onClose={onClose}
                post={post}
                modalContent={modalContent}
            />
        </Container>
    </>
  )
}

export default PostContainer
