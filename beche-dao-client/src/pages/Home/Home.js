import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../apiCalls.js/products';
import Filters from '../../components/Filters/Filters';
import { BsFilterSquare } from "react-icons/bs";



const Home = () => {

    const [homeProducts, setHomeProducts] = useState([]);
    const [displayFilters, setDisplayFilters] = React.useState(true);
    const [filters, setFilters] = React.useState({
        status: "approved",
        category: [],
        age: [],
    });
    // const [filter, setFilter] = useState({status: "approved"});

    const navigate = useNavigate();

    useEffect(() => {

        try {
            const fetchData = async () => {

                const data = await getAllProducts(filters);
                // console.log(data)
                setHomeProducts(data.products)
            };


            fetchData();

        } catch (error) {
            console.error("Not fetching: ", error)
        }


    }, [filters]);

    const truncate = (context, maxLength) => {
        if (context.length <= maxLength) {
            return context;
        } else {
            return context.slice(0, maxLength) + '...';
        }
    };

    return (
        <div>


            <div className='flex'>

                <div>
                {displayFilters &&
                    <div className='py-5 w-40 md:w-52 lg:w-64 h-screen'>
                        <Filters displayFilters={displayFilters} setDisplayFilters={setDisplayFilters} filters={filters} setFilters={setFilters} />
                    </div>
                }
                
                </div>

                <div>
                    {
                        displayFilters ||
                        <div className='my-5 ml-2'>
                            <BsFilterSquare className='text-3xl cursor-pointer' onClick={() => setDisplayFilters(!displayFilters)} />
                        </div>
                    }
                </div>

                <div className='flex-auto'>

                    <div className='my-5'>

                        <div className='text-center'>
                            <input className='border border-black w-[60%] h-10 rounded-md px-2' placeholder='Search' type="text" />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-5 justify-items-center gap-y-5 flex-auto'>

                        {homeProducts.length > 0 &&
                            homeProducts.map((e, i) => (

                                <div key={i + 1} onClick={() => navigate(`/product/${e._id}`)} className={`card card-compact ${displayFilters ? "w-52 md:w-60 lg:w-44 xl:w-60" : "w-72 md:w-80 lg:w-60 xl:w-72"} rounded-lg shadow-2xl cursor-pointer`}>
                                    <figure><img src={e.images[0].secure_url} className="w-full h-44" alt="" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{e.name}</h2>
                                        <p className=' text-gray-500'>{truncate(e.description, 41)}</p>
                                        <hr />
                                        <h4 className=' text-lg font-semibold'>${e.price}</h4>

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Home;