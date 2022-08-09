import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId: null,
    userTocken: null
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
        }
    }
})

export const { setUser, setUserTocken, logOut } = usersSlice.actions
export default usersSlice.reducer