import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const {login} = useAuth();

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
      
      login(data);

      toast.success("Login Successfull");

      setData({
        email: '',
        password: ''
      })
      navigate('/')
    }
    catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-87.5 flex flex-col gap-5">

        {/* Header */}
        <div className=" flex items-center gap-4 text-left mb-2">
          <h2 className="text-3xl text-gray-800 tracking-tight">Login</h2>
          <div className="w-10 h-0.5 bg-black mt-2"></div>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <input
            type="email" name='email' value={data.email} placeholder="Email" className="w-full px-4 py-3 border border-gray-200 outline-none focus:border-black transition-all" required onChange={handleChange}
          />
          <input
            type="password" name='password' value={data.password} placeholder="Password" className="w-full px-4 py-3 border border-gray-200 outline-none focus:border-black transition-all" required onChange={handleChange}
          />
        </div>

        {/* Helper Link */}
        <div className="flex justify-between text-sm text-gray-400">
          <p className="cursor-pointer hover:text-black transition-colors" onClick={() => navigate('/forgot-password')}>Forgot your password</p>
          <p onClick={() => navigate('/register')} className="cursor-pointer hover:text-black transition-colors">Register</p>
        </div>

        {/* Button */}
        <button className="w-full bg-black text-white py-3 text-sm font-medium tracking-widest hover:bg-zinc-800 transition-all active:scale-[0.98]" type='submit'>
          SIGN IN
        </button>

      </form>
    </div>
  );
};

export default Login;