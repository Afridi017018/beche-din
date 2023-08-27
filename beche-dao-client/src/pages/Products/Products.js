import React, { useEffect, useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { getAllProducts } from '../../apiCalls.js/products';
import ProductsForm from './ProductsForm';


const Products = () => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [allProducts, setAllProducts] = useState([]);

    function openModal() {
        setIsOpen(true);
    }

    useEffect(() => {

        try {
            const fetchData = async () => {
                const data = await getAllProducts();
                setAllProducts(data.products)
            };

            fetchData();
        } catch (error) {
            console.error("Not fetching: ", error)
        }


    }, [modalIsOpen]);


    const truncate = (context, maxLength) => {
        if (context.length <= maxLength) {
            return context;
        } else {
            return context.slice(0, maxLength) + '...';
        }
    };

    return (
        <div>

            <div className='flex justify-center m-3'>
                <button onClick={() => openModal()} className="btn btn-info btn-outline">Add Product</button>
            </div>


            
            {allProducts.length > 0 ?
            
            <div className="overflow-x-auto lg:mx-5">
                <table className="table w-full border">
     
                    <thead>
                        <tr className='text-lg bg-gray-100 text-black'>
                            <th></th>
                            <th>Name</th>
                            <th className='hidden lg:block'>Description</th>
                            <th>Price</th>
                            <th className='hidden lg:block'>Age</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        { allProducts &&  allProducts.map((e, i) => {
                            return (
                                <tr key={i+1} className="text-xl">
                                    <th>{i+1}</th>
                                    <td>{truncate(e.name,15)}</td>
                                    <td className='hidden lg:block'>{truncate(e.description,20)}</td>
                                    <td>{e.price}</td>
                                    <td className='hidden lg:block'>{e.age}</td>
                                    <td>{e.category}</td>
                                    <td>{e.status}</td>
                                    <td>
                                        <div className='flex gap-3'>
                                        <AiOutlineEdit /> 
                                        <AiOutlineDelete /> 
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
                <img className='w-24' src="https://cdnl.iconscout.com/lottie/premium/thumb/empty-box-5708298-4748209.gif" alt="" />
                <h1>Empty List !</h1>
                </div>
        }


            <div>
                <ProductsForm modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
            </div>

        </div>
    );
};

export default Products;