import { Route, Routes } from "react-router-dom";
import NavBar from "./app/NavBar";
import CreatePost from "./pages/CreatePost";
import Explore from "./pages/ExplorePage";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import { auth, db } from "./services/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser, setUserTocken, setAllUsers } from './features/users/usersSlice'
import formatDate from "./utils/FormatDate";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";


function App() {

  const location = useLocation()
  const dispatch = useDispatch()


  // Get all users data
  useEffect(() => {
    const unsub = onSnapshot(query(collection(db,'users'),orderBy('dateCreated', 'desc')) , (querySnapshot) => {
      const allUsers = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          dateCreated: formatDate(doc.data().dateCreated)
      }))
      dispatch(setAllUsers(allUsers))
  })

  return () => unsub()
  })


  // Get currently signed in user data
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser){
       dispatch(setUser(currentUser.uid))
       dispatch(setUserTocken(currentUser.accessToken))
      }
    })

    return () => unSub()
    //  eslint-disable-next-line
  }, [])



  return (
    <>
      {location.pathname !== '/auth' && <NavBar/> }
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/profile/:userId' element={<Profile/>}/>
        <Route path='/posts/:postId' element={<PostDetails/>}/>
        <Route path='/createPost' element={<CreatePost/>}/>
      </Routes>
    </>
  );
}

export default App;
