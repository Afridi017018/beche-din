import React, { useEffect, useState } from 'react';
import { getAllProducts, updateProductStatus } from '../../apiCalls.js/products';



const AllProducts = () => {


    const [allProducts, setAllProducts] = useState([]);


    const fetchData = async () => {

        const data = await getAllProducts({ seller: false });
        setAllProducts(data.products)
    };

    useEffect(() => {

        try {

            fetchData();

        } catch (error) {
            console.error("Not fetching: ", error)
        }


    }, []);


    const truncate = (context, maxLength) => {
        if (context.length <= maxLength) {
            return context;
        } else {
            return context.slice(0, maxLength) + '...';
        }
    };



    const handleUpdateStatus = async (id, status) => {
        // console.log(id, status);

        await updateProductStatus(id, status);
        fetchData();
    }



    return (
        <div>

            <div className="mt-3">

                {allProducts.length > 0 ?

                    <div className="overflow-x-auto lg:mx-5">
                        <table className="table w-full border">

                            <thead>
                                <tr className='text-lg bg-gray-100 text-black'>
                                    <th></th>
                                    <th>User</th>
                                    <th>Product</th>
                                    <th className='hidden lg:block'>Description</th>
                                    <th>Price</th>
                                    <th className='hidden lg:block'>Age</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {allProducts && allProducts.map((e, i) => {
                                    return (
                                        <tr key={i + 1} className="text-xl">
                                            <th>{i + 1}</th>
                                            <td>{e.seller.name}</td>
                                            <td>{truncate(e.name, 15)}</td>
                                            <td className='hidden lg:block'>{truncate(e.description, 20)}</td>
                                            <td>{e.price}</td>
                                            <td className='hidden lg:block'>{e.age}</td>
                                            <td className='capitalize'>{e.category}</td>
                                            <td className={`capitalize text-lg ${e.status === 'approved' && 'text-green-600'} ${e.status === 'rejected' && 'text-red-600'} ${e.status === 'blocked' && 'font-semibold'}`}>{e.status}</td>
                                            <td>
                                                <div className='flex gap-3 text-base font-semibold cursor-pointer'>
                                                    {e.status === "pending" &&
                                                        <h5 onClick={() => { handleUpdateStatus(e._id, "approved") }} className='text-green-600 underline'>Approve</h5>
                                                    }
                                                    {e.status === "pending" &&
                                                        <h5 onClick={() => { handleUpdateStatus(e._id, "rejected") }} className='text-red-600 underline'>Reject</h5>
                                                    }

                                                    {e.status === "approved" &&
                                                        <h5 onClick={() => { handleUpdateStatus(e._id, "rejected") }} className='text-red-600 underline'>Reject</h5>
                                                    }
                                                    {e.status === "approved" &&
                                                        <h5 onClick={() => { handleUpdateStatus(e._id, "blocked") }} className='underline'>Block</h5>
                                                    }

                                                    {e.status === "rejected" &&
                                                        <h5 onClick={() => { handleUpdateStatus(e._id, "approved") }} className='text-green-600 underline'>Approve</h5>
                                                    }
                                                    {e.status === "rejected" &&
                                                        <h5 onClick={() => { handleUpdateStatus(e._id, "blocked") }} className='underline'>Block</h5>
                                                    }

                                                    {e.status === "blocked" &&
                                                        <h5 onClick={() => { handleUpdateStatus(e._id, "pending") }} className='text-blue-600 underline'>Unblock</h5>
                                                    }


                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>

                    :

                    <div className='text-4xl font-bold flex justify-center items-center text-gray-300 my-44'>
                        <img className='w-24 pointer-events-none' src="https://cdnl.iconscout.com/lottie/premium/thumb/empty-box-5708298-4748209.gif" alt="" />
                        <h1>Empty List !</h1>
                    </div>
                }
            </div>

        </div>
    );
};

export default AllProducts;