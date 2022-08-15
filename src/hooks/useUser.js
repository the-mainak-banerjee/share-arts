import { updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../services/Firebase'

export const useUser = () => {
    
    // Update User function
    const updateUser = async (userId, data, setLoading) => {
        setLoading(true)
        try{
            await updateDoc(doc(db, 'users', `${userId}`), data)
        }catch(error){
            alert(error)
        }finally{
          setLoading(false)
        }
    }


    // Update User Profile

    const updateUserProfile = async (data) => {
        try{
            await updateProfile(auth.currentUser, data)
        }catch(error){
            alert(error)
        }
    }
    

    return {
        updateUser,
        updateUserProfile
    }
}