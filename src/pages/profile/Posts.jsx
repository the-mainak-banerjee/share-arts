import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectSignedInUser } from '../../features/users/usersSlice'
import { setSavedPosts, setUserPosts } from '../../features/posts/postsSlice'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../services/Firebase'
import formatDate from '../../utils/FormatDate'
import ProfilePost from '../../components/profile/ProfilePosts'

const Posts = () => {
  const params = useParams()
  const currUser = useSelector(selectSignedInUser)
  const dispatch = useDispatch()
  const [postType, setPostType] = useState('ownPost')

 //  reset the post type when page changes
 useEffect(() => {
    setPostType('ownPost')
 },[params])

 const handlePostType = (type) => {
    setPostType(type)
 }


  // get the saved post and users post data from database 
  useEffect(() => {
    let unSub;
    if(postType === 'savedPost'){
      unSub = onSnapshot(query(collection(db,'posts'),where('saves', 'array-contains', `${params.userId}`)), (querySnapshot) => {
        const allPosts = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            createdAt: formatDate(doc.data().createdAt)
        }))
        dispatch(setSavedPosts(allPosts))
    })
    }else if(postType === 'ownPost'){
      unSub = onSnapshot(query(collection(db,'posts'),where('createdBy', '==', `${params.userId}`)) , (querySnapshot) => {
        const allPosts = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            createdAt: formatDate(doc.data().createdAt)
        }))
        dispatch(setUserPosts(allPosts))
    })
    }

  return () => unSub && unSub()
  }, [dispatch, params, postType])


  return (
    <>
        <ProfilePost
            params={params}
            currUser={currUser}
            handlePostType={handlePostType}
            postType={postType}
        />
    </>
  )
}

export default Posts
