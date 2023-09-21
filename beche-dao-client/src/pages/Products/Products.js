import React, { useEffect, useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { deleteProduct, getAllProducts } from '../../apiCalls.js/products';
import BidDashBoardModal from './BidDashBoardModal';
import ProductsForm from './ProductsForm';


const Products = ({ currentUser }) => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [isEditProduct, setIsEditProduct] = useState(null);
    const [bidModalIsOpen, setIsBidModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState("");



    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        age: "",
        bill: false,
        warranty: false,
        accessories: false,
        box: false,

    });

    function openModal() {
        setIsOpen(true);
    }


    const fetchData = async () => {

        const data = await getAllProducts({ seller: currentUser });
        setAllProducts(data.products)
    };

    useEffect(() => {

        try {

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

    const handleEditProduct = (e) => {
        setIsEditProduct(e);

        setFormData({
            name: e.name,
            description: e.description,
            price: e.price,
            category: e.category,
            age: e.age,
            bill: e.bill,
            warranty: e.warranty,
            accessories: e.accessories,
            box: e.box,

        })

        openModal(true)

    }


    const handleDeleteProduct = async (e) => {

        await deleteProduct(e._id);

        fetchData();

    }


    const handleGetBids = (productId)=>{
        setSelectedProduct(productId)
        setIsBidModalOpen(true);
    }


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

                            {allProducts && allProducts.map((e, i) => {
                                return (
                                    <tr key={i + 1} className="text-xl">
                                        <th>{i + 1}</th>
                                        <td>{truncate(e.name, 15)}</td>
                                        <td className='hidden lg:block'>{truncate(e.description, 20)}</td>
                                        <td>{e.price}</td>
                                        <td className='hidden lg:block'>{e.age}</td>
                                        <td className='capitalize'>{e.category}</td>
                                        <td className={`capitalize text-lg ${e.status === 'approved' && 'text-green-600'} ${e.status === 'rejected' && 'text-red-600'} ${e.status === 'blocked' && 'font-semibold'}`}>{e.status}</td>
                                        <td>
                                            <div className='flex gap-3'>
                                                <img className={`h-5 w-6 cursor-pointer ${e.status ==='approved' || " opacity-30 cursor-not-allowed" }`} onClick={e.status === 'approved' ? ()=>handleGetBids(e._id) : null} src="/bid.png" alt="" disabled = {e.status !=='approved'} />
                                                <AiOutlineEdit className='cursor-pointer' onClick={() => handleEditProduct(e)} />
                                                <AiOutlineDelete className='cursor-pointer' onClick={() => handleDeleteProduct(e)} />

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


            <div>
                <ProductsForm
                    modalIsOpen={modalIsOpen}
                    setIsOpen={setIsOpen}
                    formData={formData}
                    setFormData={setFormData}
                    isEditProduct={isEditProduct}
                    setIsEditProduct={setIsEditProduct}
                // deleteProduct = {deleteProduct}
                // setDeleteProduct = {setDeleteProduct} 
                />
            </div>

                 <div>
                  <BidDashBoardModal bidModalIsOpen={bidModalIsOpen} setIsBidModalOpen={setIsBidModalOpen} selectedProduct={selectedProduct} />
                 </div>

        </div>
    );
};

export default Products;