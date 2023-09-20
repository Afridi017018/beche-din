import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../apiCalls.js/products';

const Home = () => {

    const [homeProducts, setHomeProducts] = useState([]);
    // const [filter, setFilter] = useState({status: "approved"});

    const navigate = useNavigate();

    useEffect(() => {

        try {
            const fetchData = async () => {

                const data = await getAllProducts({ status: "approved" });
                setHomeProducts(data.products)
            };


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

    return (
        <div className='grid grid-cols-4 my-5 justify-items-center gap-5'>
            {homeProducts.length > 0 &&
                homeProducts.map((e,i) => (
                 
                    <div key={i+1} onClick={()=>navigate(`/product/${e._id}`)} className="card card-compact w-72 rounded-lg shadow-2xl cursor-pointer">
                        <figure><img src={e.images[0].secure_url} className="w-full h-32" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{e.name}</h2>
                            <p className=' text-gray-500'>{truncate(e.description, 42)}</p>
                            <hr />
                            <h4 className=' text-lg font-semibold'>${e.price}</h4>
                            
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Home;