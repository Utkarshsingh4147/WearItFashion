import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import api from '../../api';


const Register = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            console.log(data);
            const response = await api.post('/auth/register', data);

            toast.success(response.data.message || "Registered successfully!");

            setData({
                name: '',
                email: '',
                password: '',
                phone: ''
            })

            navigate('/login');
        }
        catch (error) {
            const msg =
                error.response?.data?.message ||
                "Something went wrong";

            toast.error(msg);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-87.5 flex flex-col gap-5 mt-5 md:mt-10">

                {/* Header */}
                <div className=" flex items-center gap-4 text-left mb-2">
                    <h2 className="text-3xl text-gray-800 tracking-tight">Register</h2>
                    <div className="w-10 h-0.5 bg-black mt-2"></div>
                </div>

                {/* Inputs */}
                <div className="flex flex-col gap-4">
                    <input
                        type="text" name='name' value={data.name} placeholder="Name" className="w-full px-4 py-3 border border-gray-200 outline-none focus:border-black transition-all" required onChange={handleChange}
                    />
                    <input
                        type="email" name='email' value={data.email} placeholder="Email" className="w-full px-4 py-3 border border-gray-200 outline-none focus:border-black transition-all" required onChange={handleChange}
                    />
                    <input
                        type="password" name='password' value={data.password} placeholder="Password" className="w-full px-4 py-3 border border-gray-200 outline-none focus:border-black transition-all" required onChange={handleChange}
                    />
                    <input
                        type="tel" name='phone' value={data.phone} placeholder="Phone no." className="w-full px-4 py-3 border border-gray-200 outline-none focus:border-black transition-all" required onChange={handleChange}
                    />
                </div>

                {/* Helper Link */}
                <div className="flex justify-center text-sm text-gray-400">
                    <p onClick={() => navigate('/login')} className="cursor-pointer hover:text-black transition-colors">Already have an account? Login </p>
                </div>

                {/* Button */}
                <button className="w-full bg-black text-white py-3 text-sm font-medium tracking-widest hover:bg-zinc-800 transition-all active:scale-[0.98]" type='submit'>
                    SIGN IN
                </button>

            </form>
        </div>
    );
};

export default Register;