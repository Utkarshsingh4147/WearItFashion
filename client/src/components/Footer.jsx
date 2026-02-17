import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className='bg-white text-gray-700 border-t border-gray-200 mt-20'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 px-2 sm:px-10 text-sm'>

        {/* Brand Section */}
        <div>
          <div onClick={() => navigate('/')} className='cursor-pointer'>
            <img
              src={assets.logo}
              alt="logo"
              className='w-50 sm:w-62 object-contain' />
          </div>

          <p className='w-full md:w-2/3 leading-6 text-gray-600'>
            Elevating your everyday style with curated collections for men, women, and kids.
            Quality craftsmanship meets contemporary design to bring you the best in modern fashion.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className='text-xl font-medium mb-5 text-black'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='cursor-pointer hover:text-black transition'>Home</li>
            <li className='cursor-pointer hover:text-black transition'>About us</li>
            <li className='cursor-pointer hover:text-black transition'>Delivery</li>
            <li className='cursor-pointer hover:text-black transition'>Privacy policy</li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <p className='text-xl font-medium mb-5 text-black'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+1-212-456-7890</li>
            <li>contact@wearitfashion.com</li>
            <li className='cursor-pointer hover:text-black transition'>Instagram</li>
          </ul>
        </div>

      </div>

      {/* Bottom Section: Copyright & License */}
      <div className='border-t border-gray-200 py-5'>
        <div className='flex flex-col md:flex-row justify-between items-center px-2 sm:px-10 gap-4'>
          <p className='text-sm text-center'>
            Copyright 2026 © WEARITFASHION - All Right Reserved.
          </p>
          <p className='text-[11px] text-gray-400 italic max-w-md text-center md:text-right'>
            Licensed under the MIT License. You are free to use, study, and modify this
            software as long as the original copyright notice is included.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer