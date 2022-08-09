import { Route, Routes } from "react-router-dom";
import NavBar from "./app/NavBar";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <NavBar/> 
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile/:userId' element={<Profile/>}/>
        <Route path='/posts/:postId' element={<PostDetails/>}/>
        <Route path='/createPost' element={<CreatePost/>}/>
      </Routes>
    </>
  );
}

export default App;
