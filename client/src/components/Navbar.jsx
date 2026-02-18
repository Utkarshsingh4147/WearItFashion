import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import api from '../api';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [visible, isVisible] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);

  return (
    <div className='flex  flex-wrap justify-between items-center py-5 px-2 md:px-4 font-medium border-b border-gray-200'>
      {/* Logo */}
      <div onClick={() => navigate('/')} className='cursor-pointer'>
        <img
          src={assets.logo}
          alt="logo"
          className='w-50 md:w-62 object-contain' />
      </div>

      {/* Desktop Menu */}
      <ul className='hidden md:flex gap-5 sm:gap-8 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-3/4 rounded-lg border-none h-0.5 bg-gray-700 hidden' />
        </NavLink>

        <div className='relative flex flex-col items-center gap-1 group'>
          <div className='flex items-center gap-2 cursor-pointer'>
            <p>COLLECTION</p>
            <img src={assets.dropdown_icon} className='w-2 rotate-90' alt="V" />
          </div>
          <div className='absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-10'>
            <div className='flex flex-col gap-2 w-36 py-4 px-4 bg-white border border-gray-100 text-gray-500 rounded shadow-lg'>
              <Link to='/collection/' className='cursor-pointer hover:text-black'>ALL</Link>
              <Link to='/collection/men' className='cursor-pointer hover:text-black'>MEN</Link>
              <Link to='/collection/women' className='cursor-pointer hover:text-black'>WOMEN</Link>
              <Link to='/collection/kids' className='cursor-pointer hover:text-black'>KIDS</Link>
            </div>
          </div>
        </div>

        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-3/4 rounded-lg border-none h-0.5 bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-3/4 rounded-lg border-none h-0.5 bg-gray-700 hidden' />
        </NavLink>
      </ul>

      {/* Icons Section */}
      <div className='flex items-center gap-6'>
        <div>
          <img src={assets.search_icon} className='w-5 cursor-pointer' alt="search" />
        </div>

        <div onClick={() => navigate('/cart')} className='relative cursor-pointer'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart" />
          <p className='absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>5</p>
        </div>

        {user ? (
          <div className='group relative hidden md:block'>
            <img
              src={assets.profile_icon}
              className='w-5 cursor-pointer'
              alt="profile"
            />
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-2 z-20'>
              <div className='flex flex-col gap-2 w-40 py-3 px-5 bg-white shadow-lg text-gray-500 rounded'>
                <p className='text-black text-sm font-medium'>
                  {user.name}
                </p>
                <p
                  onClick={() => navigate('/profile')}
                  className='cursor-pointer hover:text-black'
                >
                  MY PROFILE
                </p>
                <p
                  onClick={() => navigate('/orders')}
                  className='cursor-pointer hover:text-black'
                >
                  ORDERS
                </p>
                <button
                  onClick={async () => {
                    await logout();
                    navigate('/');
                  }}
                  className='bg-red-500 hover:bg-red-700 text-white rounded-xl py-1 cursor-pointer'
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => navigate('/login')}
            className='hidden md:block cursor-pointer text-sm p-2 rounded-lg text-white bg-black hover:bg-black/85'
          >
            LOGIN
          </div>
        )}

        <img
          src={assets.menu_icon}
          className='w-5 cursor-pointer md:hidden'
          alt="menu"
          onClick={() => isVisible(true)}
        />
      </div>

      {/* Aside Menu */}
      <aside className={`fixed top-0 bottom-0 right-0 p-4 w-[70%] bg-black z-50 border-l-2 border-gray-800 text-gray-500 transition-all duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'} flex flex-col justify-between`}>

        <div>
          <div onClick={() => isVisible(false)} className='flex items-center justify-end gap-4 p-3'>
            <img src={assets.cross_icon} className='w-4 cursor-pointer invert' alt="cross" />
          </div>

          <div className='flex flex-col gap-6 mt-2'>
            <div>
              <p onClick={() => { navigate('/'); isVisible(false); }} className='hover:text-gray-300 cursor-pointer'>HOME</p>
              <hr className='mt-2 border-gray-800' />
            </div>

            {/* Collection with Dropdown */}
            <div>
              <div
                className='flex justify-between items-center hover:text-gray-300 cursor-pointer'
                onClick={() => setCollectionOpen(!collectionOpen)}
              >
                <p>COLLECTION</p>
                <img src={assets.dropdown_icon} alt="drop" className={`w-2 transition-transform ${collectionOpen ? '-rotate-90' : 'rotate-90'}`}
                />
              </div>

              <div className={`flex flex-col gap-3 pl-4 overflow-hidden transition-all ${collectionOpen ? 'max-h-40 mt-4' : 'max-h-0'}`}>
                <p onClick={() => { navigate('/catrgory/men'); isVisible(false); }} className='hover:text-white cursor-pointer text-sm'>MEN</p>
                <p onClick={() => { navigate('/category/women'); isVisible(false); }} className='hover:text-white cursor-pointer text-sm'>WOMEN</p>
                <p onClick={() => { navigate('/category/kids'); isVisible(false); }} className='hover:text-white cursor-pointer text-sm'>KIDS</p>
              </div>
              <hr className='mt-2 border-gray-800' />
            </div>

            <div>
              <p onClick={() => { navigate('/myorders'); isVisible(false); }} className='hover:text-gray-300 cursor-pointer'>MY ORDERS</p>
              <hr className='mt-2 border-gray-800' />
            </div>
            <div>
              <p onClick={() => { navigate('/about'); isVisible(false); }} className='hover:text-gray-300 cursor-pointer'>ABOUT</p>
              <hr className='mt-2 border-gray-800' />
            </div>
            <div>
              <p onClick={() => { navigate('/contact'); isVisible(false); }} className='hover:text-gray-300 cursor-pointer'>CONTACT</p>
              <hr className='mt-2 border-gray-800' />
            </div>
          </div>
        </div>

        <div className='flex justify-between'>
          <div className='flex justify-center items-center gap-2'>
            <div className='bg-white py-2 w-12 rounded-[50%] flex justify-center items-center cursor-pointer' onClick={() => {
              isVisible(false);
              navigate('/profile');
            }}>
              <img src={assets.profile_icon} alt="profile" className='w-6' />
            </div>
            <div>
              {user ? user.email : "Not Logged In"}
            </div>
          </div>
          {user && (
            <button
              onClick={async () => {
                await logout();
                isVisible(false);
                navigate('/');
              }}
              className='bg-red-500 text-white p-2 rounded-2xl hover:bg-red-700 cursor-pointer'
            >
              Logout
            </button>
          )}

          {!user && (
            <button
              onClick={() => {
                isVisible(false);
                navigate('/login');
              }}
              className='bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-2xl cursor-pointer'
            >
              Login
            </button>
          )}

        </div>
      </aside>
    </div>
  )
}

export default Navbar