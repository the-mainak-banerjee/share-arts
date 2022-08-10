import { createSlice } from "@reduxjs/toolkit";

// const initialState = [
//     {
//         id: 1,
//         caption: 'Hi I Am Maiank',
//         imageUrl:'https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg?cs=srgb&dl=pexels-carolina-castilla-arias-1716861.jpg&fm=jpg',
//         createdBy: '4578945685',
//         likesCount: 0,
//         comments: [],
//         createdAt: '09-08-2022'
//     },
//     {
//         id: 2,
//         caption: 'Hi I Am Maiank,Hi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am MaiankHi I Am Maiank',
//         imageUrl:'https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg?cs=srgb&dl=pexels-carolina-castilla-arias-1716861.jpg&fm=jpg',
//         createdBy: '4578945685',
//         likesCount: 0,
//         comments: [{createdBy: '47859658', text: 'Nice post', id:'9'}, {createdBy: '47859658', text: 'Nice post', id:'10'}, {createdBy: '47859658', text: 'Nice post', id:'8'}],
//         createdAt: '09-08-2022'
//     },
//     {
//         id: 3,
//         caption: 'Hi I Am Maiank',
//         imageUrl:'https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg?cs=srgb&dl=pexels-carolina-castilla-arias-1716861.jpg&fm=jpg',
//         createdBy: '4578945685',
//         likesCount: 0,
//         comments: [],
//         createdAt: '09-08-2022'
//     },
//     {
//         id: 4,
//         caption: 'Hi I Am Maiank',
//         imageUrl:'https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg?cs=srgb&dl=pexels-carolina-castilla-arias-1716861.jpg&fm=jpg',
//         createdBy: '4578945685',
//         likesCount: 0,
//         comments: [],
//         createdAt: '09-08-2022'
//     },
//     {
//         id: 5,
//         caption: 'Hi I Am Maiank',
//         imageUrl:'https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg?cs=srgb&dl=pexels-carolina-castilla-arias-1716861.jpg&fm=jpg',
//         createdBy: '4578945685',
//         likesCount: 0,
//         comments: [],
//         createdAt: '09-08-2022'
//     },
// ]

const initialState = {
    allPosts:[]
}


export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setAllPosts(state,action){
            state.allPosts = action.payload
        }
    }
})

export const {setAllPosts} = postSlice.actions

export default postSlice.reducer

export const selectAllPosts = state => state.posts.allPosts


// a7kLVDoGOBTAXAw7DXzJB94plSG3