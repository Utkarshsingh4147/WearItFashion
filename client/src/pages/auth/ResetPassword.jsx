import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [data, setData] = useState({
    email: '',
    otp: '',
    password: ''
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await api.post('/auth/resetPassword', data);
      
      toast.success(response.data.message || "Password updated successfully");
      
      navigate('/login');
    } catch (error) {
      const msg = error.response.data.message || "Invalid OTP or request failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-87.5 flex flex-col gap-5">
        
        {/* Header - Matches Login style */}
        <div className="flex items-center gap-4 text-left mb-2">
          <h2 className="text-3xl text-gray-800 tracking-tight">Reset</h2>
          <div className="w-10 h-0.5 bg-black mt-2"></div>
        </div>

        <p className="text-sm text-gray-500 -mt-2">
          Enter your details and the OTP sent to your email.
        </p>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-200 outline-none focus:border-black transition-all"
            required
          />
          <input
            type="text"
            name="otp"
            value={data.otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            className="w-full px-4 py-3 border border-gray-200 outline-none focus:border-black transition-all"
            required
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="New Password"
            className="w-full px-4 py-3 border border-gray-200 outline-none focus:border-black transition-all"
            required
          />
        </div>

        {/* Navigation Link */}
        <div className="flex justify-end text-sm text-gray-400">
          <p 
            onClick={() => navigate('/login')} 
            className="cursor-pointer hover:text-black transition-colors"
          >
            Back to Login
          </p>
        </div>

        {/* Submit Button */}
        <button 
          disabled={loading}
          className="w-full bg-black text-white py-3 text-sm font-medium tracking-widest hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:bg-gray-400" 
          type="submit"
        >
          {loading ? 'UPDATING...' : 'UPDATE PASSWORD'}
        </button>

      </form>
    </div>
  );
};

export default ResetPassword;