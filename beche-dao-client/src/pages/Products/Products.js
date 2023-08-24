import React, { useState } from 'react';
import ProductsForm from './ProductsForm';

const Products = () => {

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    return (
        <div>

            <div className='flex justify-center m-3'>
                <button onClick={() => openModal()} className="btn btn-info btn-outline">Add Product</button>
            </div>

            <div>
                <ProductsForm modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
            </div>

        </div>
    );
};

export default Products;