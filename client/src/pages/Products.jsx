import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

const Products = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // Toggle Category selection
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  // Toggle SubCategory selection
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* --- Filter Options (Left Side) --- */}
      <div className='min-w-60'>
        <p 
          onClick={() => setShowFilter(!showFilter)} 
          className='my-2 text-xl flex items-center cursor-pointer gap-2 uppercase tracking-widest'
        >
          Filters
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'><input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory}/> Men</p>
            <p className='flex gap-2'><input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory}/> Women</p>
            <p className='flex gap-2'><input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory}/> Kids</p>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'><input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/> Topwear</p>
            <p className='flex gap-2'><input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear</p>
            <p className='flex gap-2'><input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear</p>
          </div>
        </div>
      </div>

      {/* --- Right Side (Products Display) --- */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <div className='inline-flex gap-2 items-center mb-3'>
            <p className='text-gray-500'>ALL <span className='text-gray-700 font-medium'>COLLECTIONS</span></p>
            <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
          </div>

          {/* Product Sort */}
          <select 
            onChange={(e) => setSortType(e.target.value)} 
            className='border-2 border-gray-300 text-sm px-2 outline-none bg-white h-10'
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {/* Replace with real map from your products array */}
          {[...Array(12)].map((_, index) => (
            <div key={index} className='text-gray-700 cursor-pointer group'>
              <div className='overflow-hidden border border-gray-100'>
                <img 
                  className='hover:scale-110 transition ease-in-out object-cover aspect-[3/4]' 
                  src={assets.product_img} 
                  alt="product" 
                />
              </div>
              <p className='pt-3 pb-1 text-sm'>Premium Cotton Tee</p>
              <p className='text-sm font-medium'>$45.00</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;