import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId: null,
    userTocken: null,
    allUsers: null
}

export const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers: {
        setUser(state,action) {
            state.userId = action.payload
        },
        setUserTocken(state,action){
            state.userTocken = action.payload
        },
        logOut(state){
            localStorage.removeItem('share-art-tocken')
            state.userTocken = null
            state.userId = null
        },
        setAllUsers(state,action){
            state.allUsers = action.payload;
        }
    }
})

export const { setUser, setUserTocken, logOut, setAllUsers } = usersSlice.actions
export default usersSlice.reducer

export const selectSignedInUser = state => ({userId: state.users.userId, userTocken:state.users.userTocken})
export const seletAllUsers = state => state.users.allUsers