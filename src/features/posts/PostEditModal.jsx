import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { usePost } from '../../hooks/usePost'

const PostEditModal = ({ isOpen, onClose, post }) => {

    const [editablePostCaption, setEditablePostCaption] = useState(post.caption ?? '')
    const [loading,setLoading] = useState(false)
    const { updatePost } = usePost(post.id)
    const toast = useToast()

    const handleEditForm = () => {
        const data = {
            caption: editablePostCaption
        }
        updatePost(data,setLoading,toast,'Post Edited Successfully')
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
                    Edit Post
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Textarea autoFocus={true} placeholder='Add caption here' value={editablePostCaption} onChange={(e) => setEditablePostCaption(e.target.value)}/>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        colorScheme='blue' 
                        mr='3' 
                        onClick={handleEditForm}
                        disabled={!editablePostCaption}
                        isLoading={loading}
                        loadingText='Editing Post...'
                    >Save Post</Button>
                    <Button variant='ghost' onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  )
}

export default PostEditModal
