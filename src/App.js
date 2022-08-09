import { Route, Routes } from "react-router-dom";
import NavBar from "./app/NavBar";
import CreatePost from "./pages/CreatePost";
import Explore from "./pages/ExplorePage";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import { useLocation } from 'react-router-dom'

function App() {

  const location = useLocation()

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
