import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import api from '../api';
import { assets } from '../assets/assets';

const Collection = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();

  // --- STATE ---
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(''); // Simple string filter
  const [sort, setSort] = useState('relevant');

  // --- DATA FETCHING ---
  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Constructing simple URL with query params
      const response = await api.get(`/app/products?page=${page}&limit=12&category=${category}&sort=${sort}`);
      
      if (response.data.success) {
        setProducts(response.data.products);
        setTotalPages(response.data.totalPage);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to the top oft he page
  }, [page, category, sort]);

  // Handle category change (Reset to page 1)
  const handleCategoryChange = (cat) => {
    setCategory(prev => (prev === cat ? '' : cat));
    setPage(1); 
  };

  useEffect(() => {
    if (categoryName) {
      setCategory(categoryName.toLowerCase());
    } else {
      setCategory('');
    }
    setPage(1);
  }, [categoryName]);

  return (
    <div className="px-4 sm:px-10 py-10">
      <div className="flex flex-col sm:flex-row gap-10">
        
        {/* Sidebar Filters */}
        <div className="min-w-60">
          <p className="text-xl font-medium mb-5 uppercase tracking-wider">Filters</p>
          <div className="border border-gray-300 p-5">
            <p className="mb-3 text-sm font-bold">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {['men', 'women', 'kids'].map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={category === item} 
                    onChange={() => handleCategoryChange(item)} 
                  /> {item}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Product Display */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium uppercase">All Collections</h2>
            <select 
              onChange={(e) => { setSort(e.target.value); setPage(1); }} 
              className="border p-2 text-sm outline-none"
            >
              <option value="relevant">Newest</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-20">Loading...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
              {products.map((item) => (
                <div key={item._id} onClick={() => navigate(`/product/${item._id}`)} className="cursor-pointer group">
                  <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                    <img src={item.images?.[0] || assets.placeholder_img} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="" />
                  </div>
                  <p className="mt-3 text-sm font-medium">{item.name}</p>
                  <p className="text-sm font-bold">${item.price}</p>
                </div>
              ))}
            </div>
          )}

          {/* --- PAGINATION BAR --- */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16">
              
              {/* Previous Button */}
              <button 
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 border hover:bg-black hover:text-white disabled:opacity-30 transition-all"
              >
                Prev
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setPage(index + 1)}
                    className={`w-10 h-10 border transition-all ${
                      page === index + 1 ? 'bg-black text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button 
                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 border hover:bg-black hover:text-white disabled:opacity-30 transition-all"
              >
                Next
              </button>

            </div>
          )}
          
          <p className="text-center text-xs text-gray-400 mt-4">
            Page {page} of {totalPages}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Collection;