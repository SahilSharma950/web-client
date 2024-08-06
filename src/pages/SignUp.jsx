import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const[form,setForm]=useState({
        name:"",
        email:"",
        password:"",
    })

    const handleChange = (e) =>{
        const{id,value}=e.target;
        setForm({
            ...form,
            [id]:value
        })
    }

    const Navigate = useNavigate();



    const handleSubmit =async (e) =>{
        e.preventDefault()
    
        try {
            const response = await fetch('http://localhost:3000/auth/signup',{
                method : 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(form)
            })
            const result = await response.json()
            console.log('success : ', result.data)
            Navigate("/")
        } catch (error) {
            console.log('Error:', error);
        }
        setForm({
          name:"",
          email:"",
          password:"", 
      })

    } 





  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
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
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
          <div className="text-center">
            <p className="text-gray-700">
              Already have an account?{' '}
              <a href="/" className="text-blue-500 hover:text-blue-800 font-bold">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
