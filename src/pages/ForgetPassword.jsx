import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success === false) {
        alert(data.message);
        return;
      }
      if (!res.ok) {
        toast.error('Failed to send reset email');
        throw new Error('Failed to send reset email');
      }
      if (res.ok) {
        setMessage('Password reset link has been sent to your email');
        toast.success('Password reset link has been sent to your email');
        navigate('/');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send Reset Link
            </button>
          </div>
          {message && <p className="text-green-500 text-center">{message}</p>}
          <div className="text-center">
            <Link to="/" className="text-blue-500 hover:text-blue-800 font-bold">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
