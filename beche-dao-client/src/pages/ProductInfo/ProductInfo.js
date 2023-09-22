import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllBids } from '../../apiCalls.js/bids';
import { getProductById } from '../../apiCalls.js/products';
import { getCurrentUser } from '../../apiCalls.js/users';
import BidModal from './BidModal';

const ProductInfo = () => {

    const [product, setProduct] = useState(null);
    const [imgIndex, setImgIndex] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [allBids, setAllBids] = useState([])

    const [currentUser, setCurrentUser] = useState(null);

    const { id } = useParams();

    useEffect(()=>{
        const getUser  = async()=>{
           const data = await getCurrentUser();
        //    console.log(data.data._id)
        setCurrentUser(data.data._id);
        // setIsLoading(false);

        }
        getUser();
    },[currentUser])

    function openModal() {
        setIsOpen(true);
      }
    
  
    //   function closeModal() {
    //     setIsOpen(false);
    //   }

    
    useEffect(() => {
        const getProductData = async () => {
            const data = await getProductById(id);
            //  console.log(data.product)
            setProduct(data.product);
            // console.log(product.images[0].secure_url)
        }

        getProductData();
    }, [id])




    useEffect(()=>{
        const fetchAllBids = async ()=>{
             const data = await getAllBids({product: id})
            setAllBids(data.data);
            // console.log(data.data);

        }

       id && fetchAllBids();
    //    id && getProductData();
        
    },[id, modalIsOpen])



    return (
        <div>

            {product &&

                <div className='grid grid-cols-1 lg:grid-cols-2 mx-5 my-5 gap-10'>
                    {/* image section */}
                    <section>
                        <div>
                        <img className='w-full h-96 rounded-md' src={product.images[imgIndex].secure_url} alt="" />
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
                                <p className='text-gray-500 font-semibold'>Age</p>
                                <p className='text-gray-500 font-semibold'>{product.age} {`${product.age < 2 ? 'month' : 'months'}`}</p>
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
                            <button onClick={openModal} className={`rounded-sm w-24 h-10 bg-white border border-dotted border-black px-2 py-1 font-medium ${product.seller._id === currentUser ? 'disabled:cursor-not-allowed text-gray-500 bg-gray-200' : ''}`} disabled={product.seller._id === currentUser}>Place Bid</button>
                            </div>


                            {
                                allBids.length > 0 && 
                                allBids.map((e,i)=>(

                                    <div key={i+1} className='border border-gray-300 my-2 px-2 py-1'>
                               <div className='flex justify-between font-semibold'>
                                   <h5>{e.buyer.name}</h5>
                                   <h5>${e.bidAmount}</h5>
                               </div>
                               <div className='flex justify-between text-xs font-medium text-gray-500'>
                                <p>Placed On</p>
                                <p>{moment(e.createdAt).format("MMM D, YYYY hh:mm A")}</p>
                               </div>
                            </div>

                                ))
                            }

                            
                        </div>
                    </section>

                </div>

            }
      
      {product && <BidModal  modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} product={product} />}


        </div>
    );
};

export default ProductInfo;