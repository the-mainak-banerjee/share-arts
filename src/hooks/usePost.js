import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../services/Firebase'

export const usePost = (postId) => {
    
    // Update Post function
    const updatePost = async (data, setLoading, toast, msg) => {
        setLoading(true)
        try{
            await updateDoc(doc(db, 'posts', `${postId}`), data)
            toast({
                title: msg,
                status: 'success',
                position: 'bottom-left'
            })
        }catch(error){
            toast({
                title: "Something went wrong. Please try again later",
                status: 'error',
                position: 'bottom-left'
            })
            console.log(error)
        }finally{
          setLoading(false)
        }
    }
    
    // delete post function
    const deletePost = async (setLoading, toast) => {
        setLoading(true)
        try{
            await deleteDoc(doc(db, 'posts', `${postId}`))
            toast({
                title: "Post Deleted Successfully",
                status: 'success',
                position: 'bottom-left'
            })
        }catch(error){
            toast({
                title: "Can't delete post now. Please try again later",
                status: 'error',
                position: 'bottom-left'
            })
        }finally{
          setLoading(false)
        }
    }

    return {
        deletePost,
        updatePost
    }
}