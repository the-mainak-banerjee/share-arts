import { useState } from 'react'
import { useUser } from './useUser'


export const useFollowAction = (currUserId) => {
    
    const [loading,setLoading] = useState(false)
    const { updateUser } = useUser()

    const handleFollow = (userId,userDetails,currUserDetails) => {
        const isFollowed = userDetails?.followers?.some(id => id === currUserId)
        const userData = {
          followers: isFollowed ? userDetails?.followers.filter(id => id!== currUserId) : [...userDetails?.followers, currUserId]
        }
        updateUser(userId,userData,setLoading)
    
        const currUserData = {
          following: isFollowed ? currUserDetails?.following.filter(id => id!== userId) : [...currUserDetails?.following, userId]
        }
    
        updateUser(currUserId, currUserData, setLoading)
      }

    return {
        handleFollow,
        loading
    }
}