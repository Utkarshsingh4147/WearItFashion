import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { assets } from '../assets/assets';

const Product = () => {
    const { id } = useParams();
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchProductData = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/app/product/${id}`);
            if (response.data.success) {
                setProductData(response.data.product);
                // Set the first image as default
                setImage(response.data.product.images[0]);
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductData();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="text-center py-20 uppercase tracking-widest animate-pulse">Loading Product...</div>;
    if (!productData) return <div className="text-center py-20 text-gray-500 font-serif">Product Not Found</div>;

    return (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-4 sm:px-10">
            
            {/* --- Main Product Section --- */}
            <div className="flex gap-12 flex-col sm:flex-row">
                
                {/* --- Left Side: Images --- */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full no-scrollbar">
                        {productData.images.map((item, index) => (
                            <img 
                                onClick={() => setImage(item)} 
                                src={item} 
                                key={index} 
                                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border-2 transition-all ${image === item ? 'border-black' : 'border-transparent'}`} 
                                alt={`Thumbnail ${index}`} 
                            />
                        ))}
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img className="w-full h-auto object-cover" src={image} alt={productData.name} />
                    </div>
                </div>

                {/* --- Right Side: Details --- */}
                <div className="flex-1">
                    <h1 className="font-serif text-3xl mt-2 text-gray-800">{productData.name}</h1>
                    
                    {/* Ratings */}
                    <div className="flex items-center gap-1 mt-2">
                        {[...Array(4)].map((_, i) => <img key={i} src={assets.star_icon} alt="" className="w-3.5" />)}
                        <img src={assets.star_dull_icon} alt="" className="w-3.5" />
                        <p className="pl-2 text-sm text-gray-500">(4.5 | 122 reviews)</p>
                    </div>

                    <p className="mt-5 text-3xl font-medium text-gray-900">${productData.price}</p>
                    <p className="mt-5 text-gray-600 md:w-4/5 leading-relaxed">{productData.description}</p>
                    
                    {/* Size Selection Logic */}
                    <div className="flex flex-col gap-4 my-8">
                        <p className="font-semibold uppercase text-sm tracking-widest">Select Size</p>
                        <div className="flex gap-3">
                            {productData.sizes.map((item, index) => (
                                <button 
                                    onClick={() => setSize(item.size)} 
                                    key={index} 
                                    disabled={item.stock === 0}
                                    className={`border-2 py-2 px-5 transition-all text-sm font-medium
                                        ${item.size === size ? 'border-black bg-black text-white' : 'bg-gray-50 hover:border-gray-400'}
                                        ${item.stock === 0 ? 'opacity-30 cursor-not-allowed border-dashed' : 'cursor-pointer'}
                                    `}
                                >
                                    {item.size}
                                    {item.stock === 0 && <span className="block text-[10px] text-red-500">Out</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                        onClick={() => console.log("Added to cart:", productData._id, size)}
                        className={`bg-black text-white px-10 py-4 text-sm font-bold uppercase tracking-widest active:bg-gray-700 transition-all
                            ${!size ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}
                        `}
                        disabled={!size}
                    >
                        {size ? 'Add to Bag' : 'Select a Size'}
                    </button>

                    <hr className="mt-10 sm:w-4/5 border-gray-100" />
                    
                    {/* Trust Badges */}
                    <div className="text-sm text-gray-500 mt-6 flex flex-col gap-2 italic">
                        <p>✓ 100% Authentic Quality.</p>
                        <p>✓ Free Standard Shipping on orders over $150.</p>
                        <p>✓ Easy 30-day returns & exchanges.</p>
                    </div>
                </div>
            </div>

            {/* --- Bottom: Description & Reviews Tab --- */}
            <div className="mt-20">
                <div className="flex">
                    <b className="border px-5 py-3 text-sm cursor-pointer border-b-0">Description</b>
                    <p className="border px-5 py-3 text-sm cursor-pointer hover:bg-gray-50">Reviews (122)</p>
                </div>
                <div className="flex flex-col gap-4 border p-6 text-sm text-gray-500 leading-7">
                    <p>Designed for the modern lifestyle, this piece blends premium materials with timeless aesthetics. Whether you're dressing up for an evening or keeping it casual, its versatile design ensures you always look your best.</p>
                    <p>Each item is ethically sourced and rigorously tested for durability. Featuring a soft-touch finish and reinforced stitching, it's a staple addition to any conscious wardrobe.</p>
                </div>
            </div>

        </div>
    );
};

export default Product;