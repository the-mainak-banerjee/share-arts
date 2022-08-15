import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { usePost } from '../../hooks/usePost'


const PostUpdateModal = ({ isOpen, onClose, post, modalContent }) => {

    const [editablePostCaption, setEditablePostCaption] = useState(post.caption ?? '')
    const [loading,setLoading] = useState(false)
    const { updatePost, deletePost } = usePost(post.id)
    const toast = useToast()

    const handleEditForm = () => {
        const data = {
            caption: editablePostCaption
        }
        updatePost(data,setLoading,toast,'Post Edited Successfully')
        onClose()
    }

    const handleDeletePost = () => {
        deletePost(setLoading, toast)
        onClose()
    }

  return (
    <>
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    {modalContent === 'edit' && 'Edit Post'}
                    {modalContent === 'delete' && 'Delete Post'}
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    {modalContent === 'edit' && <Textarea autoFocus={true} placeholder='Add caption here' value={editablePostCaption} onChange={(e) => setEditablePostCaption(e.target.value)}/>}
                    {modalContent === 'delete' && <Text as='h4' fontSize='lg' textAlign='center'>Are You Sure You Want To Delete The Post?</Text>}
                </ModalBody>
                <ModalFooter>
                    {modalContent === 'edit' && <Button 
                        colorScheme='blue' 
                        mr='3' 
                        onClick={handleEditForm}
                        disabled={!editablePostCaption}
                        isLoading={loading}
                        loadingText='Editing Post...'
                    >Save Post</Button>}
                    {modalContent === 'delete' && <Button 
                        colorScheme='red' 
                        mr='3' 
                        onClick={handleDeletePost}
                        disabled={!editablePostCaption}
                        isLoading={loading}
                        loadingText='Deleting Post...'
                    >Delete Post</Button>}
                    
                    <Button variant='ghost' onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  )
}

export default PostUpdateModal
