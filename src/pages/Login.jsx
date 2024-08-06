/* eslint-disable react/no-unescaped-entities */
import  { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { jwtDecode } from "jwt-decode"
import userContext from '../contex/user';


const Login = () => {

    const{setUserInfo }=useContext(userContext)
    const[formData,setFormData]=useState({
      email:"",
      password:"",
    })
    const Navigate = useNavigate();

    const handleSubmit=async (e)=>{
      e.preventDefault()
      if(!formData.email ||!formData.password){
        alert("Please fill out all fields")
        return;
      }
      try {
        const res = await fetch("http://localhost:3000/auth/signin",{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
        })
        const data = await res.json()
        if(data.success === false){
          alert(data.message)
          return;
        }
        console.log("Response Data:", data);
        console.log("Response Data:", data.access_token);
        const decodedToken = jwtDecode(data.access_token)
        console.log("Decoded Token:", decodedToken);
        setUserInfo({
          id:decodedToken.id,
          name:decodedToken.name,
          email:decodedToken.email,
          isAdmin:decodedToken.isAdmin,
          isLoggedIn:true,
        });

        if (!res.ok) {
          toast.error("Invalid email or password")
          throw new Error("Failed to authenticate")
        }

        
        if (res.ok) {
          if (!data.access_token) {
            throw new Error("Token is undefined");
          }
          localStorage.setItem("id", decodedToken.id);
          localStorage.setItem("name", decodedToken.name);
          localStorage.setItem("email", decodedToken.email);         
          Navigate("/home");
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e)=>setFormData({...formData,[e.target.id]:e.target.value.trim()})}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e)=>setFormData({...formData,[e.target.id]:e.target.value.trim()})}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <Link to={"/forget-password"} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Forgot Password?
            </Link>
          </div>
          <div className="text-center">
            <p className="text-gray-700">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-500 hover:text-blue-800 font-bold">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
