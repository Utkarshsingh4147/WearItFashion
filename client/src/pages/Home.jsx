import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Home = () => {
  const navigate = useNavigate();

  // --- STATE MANAGEMENT ---
  const [bestsellers, setBestsellers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    assets.hero_img1,
    assets.hero_img2,
    assets.hero_img3,
    assets.hero_img4,
    assets.hero_img5
  ];

  const fetchBestsellers = async (pageNum) => {
    try {
      setLoading(true);
      const response = await api.get(`/app/bestsellers?page=${pageNum}&limit=10`);

      if (response.data.success) {
        setBestsellers(prev => pageNum === 1 ? response.data.products : [...prev, ...response.data.products]);
        setTotalPages(response.data.totalPage);
      }
    } catch (error) {
      console.error("Error fetching bestsellers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBestsellers(1);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    if (nextPage <= totalPages) {
      setPage(nextPage);
      fetchBestsellers(nextPage);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="flex flex-col gap-20 overflow-hidden">

      {/* 1. HERO IMAGE SLIDER */}
      <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden border border-gray-200">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img src={img} className="w-full h-full object-cover" alt={`Slide ${index}`} />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-serif mb-2">Fashion that Fits Your Life.</h1>
                <h1 className="text-xl md:text-2xl font-serif mb-6">New Season Arrivals</h1>
                <button
                  onClick={() => navigate('/collection')}
                  className="bg-white text-black px-8 py-3 font-medium hover:bg-black hover:text-white transition-all cursor-pointer"
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 2. BESTSELLERS GRID */}
      <section className="px-4 sm:px-10">
        <div className="text-center py-8 text-3xl">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">BEST <span className="text-gray-700 font-medium">SELLERS</span></p>
            <p className="w-8 sm:w-12 h-0.5 bg-gray-700"></p>
          </div>
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Our most loved pieces, handpicked for you.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {bestsellers.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/product/${item._id}`)}
              className="text-gray-700 cursor-pointer group"
            >
              <div className="overflow-hidden bg-gray-100 aspect-[3/4]">
                <img 
                  src={item.images && item.images.length > 0 ? item.images[0] : assets.placeholder_img} 
                  className="hover:scale-110 transition duration-500 object-cover w-full h-full" 
                  alt={item.name} 
                />
              </div>
              <p className="pt-3 pb-1 text-sm font-medium">{item.name}</p>
              <p className="text-sm font-bold text-gray-900">${item.price}</p>
            </div>
          ))}
        </div>

        {/* PAGINATION BUTTON */}
        {(page < totalPages && 
          <div className="mt-12 text-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="border border-black px-10 py-3 text-sm hover:bg-black hover:text-white transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200"
            >
              {loading ? 'LOADING...' : 'LOAD MORE'}
            </button>
          </div>
        )}
      </section>

      {/* 3. POLICIES & VALUES */}
      <section className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 bg-gray-50">
        <div className="flex flex-col items-center">
          <img src={assets.exchange_icon} className="w-12 mb-5" alt="Exchange" />
          <p className="font-semibold uppercase tracking-tighter text-gray-800">Easy Exchange</p>
          <p className="text-gray-400 text-sm">Free exchanges on all orders.</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={assets.quality_icon} className="w-12 mb-5" alt="Quality" />
          <p className="font-semibold uppercase tracking-tighter text-gray-800">Premium Quality</p>
          <p className="text-gray-400 text-sm">Crafted with the finest materials.</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={assets.support_img} className="w-12 mb-5" alt="Support" />
          <p className="font-semibold uppercase tracking-tighter text-gray-800">24/7 Support</p>
          <p className="text-gray-400 text-sm">We're here to help anytime.</p>
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <section className="px-4 py-10 bg-white">
        <h2 className="text-center text-2xl font-medium mb-10">What Our Customers Say</h2>
        <div className="max-w-4xl mx-auto border p-8 shadow-sm text-center rounded-sm">
          <p className="text-gray-500 italic">"The quality of the fabric is exceptional. I've never had a better shopping experience online. Highly recommended!"</p>
          <div className="mt-4">
            <p className="font-bold">- Sarah J.</p>
            <div className="flex justify-center gap-1 text-yellow-500 mt-1">
              {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEWSLETTER */}
      <section className="text-center px-4 mb-20">
        <p className="text-2xl font-medium text-gray-800">Subscribe to stay updated</p>
        <p className="text-gray-400 mt-3">Stay updated with our latest drops and exclusive discounts.</p>
        <form onSubmit={(e) => e.preventDefault()} className="w-full sm:w-1/2 flex items-center gap-0 mx-auto my-6 border border-gray-300 rounded-sm overflow-hidden">
          <input className="w-full outline-none py-4 px-4" type="email" placeholder="Enter your email" required />
          <button type="submit" className="bg-black text-white px-10 py-4 hover:bg-gray-800 transition-colors whitespace-nowrap">
            SUBSCRIBE
          </button>
        </form>
      </section>

    </div>
  );
};

export default Home;