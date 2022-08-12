import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../services/Firebase'

export const useUser = () => {
    
    // Update Post function
    const updateUser = async (userId, data, setLoading) => {
        setLoading(true)
        try{
            await updateDoc(doc(db, 'users', `${userId}`), data)
        }catch(error){
            console.log(error)
        }finally{
          setLoading(false)
        }
    }
    

    return {
        updateUser
    }
}