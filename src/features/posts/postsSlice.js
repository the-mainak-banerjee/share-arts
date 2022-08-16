import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    allPosts:[],
    friendsPost: null,
    savedPosts:null,
    userPosts: null
}


export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setAllPosts(state,action){
            state.allPosts = action.payload
        },
        setFriendsPosts(state,action){
            state.friendsPost = action.payload
        },
        setSavedPosts(state,action){
            state.savedPosts = action.payload
        },
        setUserPosts(state,action){
            state.userPosts = action.payload
        }
    }
})

export const {setAllPosts,setFriendsPosts,setSavedPosts,setUserPosts} = postSlice.actions

export default postSlice.reducer

export const selectAllPosts = state => state.posts.allPosts
export const selectFriendsPosts = state => state.posts.friendsPost
export const selectSavedPosts = state => state.posts.savedPosts
export const selectUserPosts = state => state.posts.userPosts
