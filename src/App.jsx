import { BrowserRouter,Routes,Route } from "react-router-dom";
import './App.css'
import Home from "./components/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import CreateBlog from "./pages/Create.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import UpdateBlog from "./pages/UpdateBlog.jsx";
import { Toaster } from 'react-hot-toast';
import BlogsList from "./pages/BlogsList.jsx";
// import { useContext, useState } from "react";
import ForgotPassword from "./pages/ForgetPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Upload from "./components/Upload.jsx";
import { useState } from "react";
import InputContext from "./contex/inputcontext.js";
import userContext from "./contex/user.js";
import BlogPage from "./pages/BlogPage.jsx";
// import Search from "./pages/Search.jsx";s
function App() {

  const[inputText, setInputText] = useState('')
  const[userInfo,setUserInfo] = useState({
    id:"",
    email:"",
    name:"",
    isAdmin:false,
    isLoggedIn:false,
  })

  return (
  
    <BrowserRouter>
    <InputContext.Provider value={{inputText, setInputText}}>
    <userContext.Provider value={{userInfo,setUserInfo}} >
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/createblog" element={<CreateBlog/>} />
      <Route path="/blog/:id" element={<BlogPost/>}/>
      <Route path="/update/:id" element={<UpdateBlog/>} />
      <Route path="/bloglist" element={<BlogsList/>}/>
      <Route path="/forget-password" element={<ForgotPassword/>}/>
      <Route path="/reset-password/:token" element={<ResetPassword/>}/>
      <Route path="/upload" element={<Upload/>}/>
      <Route path="/blogpage/:id" element={<BlogPage/>}/>
   
    </Routes>
    </userContext.Provider>
    </InputContext.Provider>
    <Toaster />
    </BrowserRouter>

    
  )
}

export default App
