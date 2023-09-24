import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBids } from '../../apiCalls.js/bids';

const MyBids = () => {

    const [myBids, setMyBids] = useState([])
    const navigate = useNavigate();
    useEffect(() => {

        const getMyBids = async () => {
            const data = await getAllBids({ buyer: true });
            console.log(data.data);
            setMyBids(data.data);
        }

        getMyBids();

    }, [])


    return (
        <div>
                            
{ myBids.length > 0 ?
            <div className="overflow-x-auto my-5 mx-5">
                <table className="table">

                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Bid</th>
                            <th>Placed On</th>
                            <th>Message</th>
                            <th>Seller</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            myBids.map((e) => (
                                <tr key={e._id} onClick={() => navigate(`/product/${e.product._id}`)} className="cursor-pointer hover:bg-slate-100" >
                                    <td><img className='w-9 h-9 rounded-sm' src={e.product.images[0].secure_url} alt="" /></td>
                                    <td>{e.product.name}</td>
                                    <td>${e.bidAmount}</td>
                                    <td>{moment(e.createdAt).format("MMM D, YYYY hh:mm A")}</td>
                                    <td>{e.message}</td>
                                    <td>{e.seller.name}</td>
                                </tr>

                            ))
                        }

                    </tbody>
                </table>
            </div>
            :
            <div>
                <h2 className='text-2xl font-bold text-gray-300 text-center mt-52'>You have not placed any bid yet!</h2>
            </div>

                    }

        </div>
    );
};

export default MyBids;


