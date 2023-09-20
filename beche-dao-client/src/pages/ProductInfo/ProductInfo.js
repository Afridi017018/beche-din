import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../apiCalls.js/products';
import BidModal from './BidModal';

const ProductInfo = () => {

    const [product, setProduct] = useState(null);
    const [imgIndex, setImgIndex] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
      }
    
  
    //   function closeModal() {
    //     setIsOpen(false);
    //   }

    const { id } = useParams();

    useEffect(() => {
        const getProductData = async () => {
            const data = await getProductById(id);
            //  console.log(data.product)
            setProduct(data.product);
            // console.log(product.images[0].secure_url)
        }

        getProductData();
    }, [id])

    return (
        <div>

            {product &&

                <div className='grid grid-cols-1 lg:grid-cols-2 mx-5 my-5 gap-10'>
                    {/* image section */}
                    <section>
                        <div>
                        <img className='w-full h-80 rounded-md' src={product.images[imgIndex].secure_url} alt="" />
                        </div>

                          <div className='flex gap-2 my-4'>
                            
                            {
                                product.images.map((img,index)=>(
                                    <img 
                                    key={index+1} 
                                    className={`h-12 w-12 rounded-md cursor-pointer ${imgIndex === index && "border border-solid border-black p-1"}`}
                                    src={img.secure_url}
                                    onClick={(()=>setImgIndex(index))}
                                    alt="" 
                                    />
                                ))
                            }
                          
                          </div>

                          <hr />

                          <div>
                            <h2 className='text-lg font-semibold'>Added On :</h2>
                            <span className=' text-sm font-medium'>{moment(product.createdAt).format("MMM D, YYYY hh:mm A")}</span>
                          </div>

                    </section>

                    {/* details section */}
                    <section>
                        <div>
                            <h2 className='text-xl text-red-900 font-bold'>{product.name}</h2>
                            <p className='text-gray-500'>{product.description}</p>
                            <hr className='my-3' />
                        </div>
                        
                        <div>
                            <h2 className='text-xl text-red-900 font-bold'>Product Details</h2>
                            <div className='flex justify-between'>
                                <p className='text-gray-500 font-semibold'>Price</p>
                                <p className='text-gray-500 font-semibold'>${product.price}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-500 font-semibold'>Category</p>
                                <p className='text-gray-500 font-semibold capitalize'>{product.category}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-500 font-semibold'>Bill Available</p>
                                <p className='text-gray-500 font-semibold'>{product.bill ? "Yes" : "No"}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-500 font-semibold'>Box Available</p>
                                <p className='text-gray-500 font-semibold'>{product.box ? "Yes" : "No"}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-500 font-semibold'>Accessories Available</p>
                                <p className='text-gray-500 font-semibold'>{product.accessories ? "Yes" : "No"}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-500 font-semibold'>Warranty Available</p>
                                <p className='text-gray-500 font-semibold'>{product.warranty ? "Yes" : "No"}</p>
                            </div>
                            <hr className='my-3' />
                        </div>

                        <div>
                            <h2 className='text-xl text-red-900 font-bold'>Seller Details</h2>
                            <div className='flex justify-between'>
                                <p className='text-gray-500 font-semibold'>Name</p>
                                <p className='text-gray-500 font-semibold'>{product.seller.name}</p>
                            </div>

                            <div className='flex justify-between'>
                                <p className='text-gray-500 font-semibold'>Email</p>
                                <p className='text-gray-500 font-semibold'>{product.seller.email}</p>
                            </div>
                            
                            <hr className='my-3' />
                        </div>

                        <div>
                            <div className='flex justify-between'>
                            <h2 className='text-xl text-red-900 font-bold'>Bids</h2>
                            <button onClick={openModal} className='border border-dotted border-black px-2 py-1 font-medium'>Place Bid</button>
                            </div>
                            {/* <div className='flex justify-between'>
                                <p className='text-gray-500 font-semibold'>Name</p>
                                <p className='text-gray-500 font-semibold'>${product.seller.name}</p>
                            </div>

                            <div className='flex justify-between'>
                                <p className='text-gray-500 font-semibold'>Email</p>
                                <p className='text-gray-500 font-semibold'>${product.seller.email}</p>
                            </div> */}
                            
                            <hr className='my-3' />
                        </div>
                    </section>

                </div>

            }
      
      <BidModal  modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}/>


        </div>
    );
};

export default ProductInfo;