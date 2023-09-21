import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { AiOutlineCloseSquare } from "react-icons/ai";

import './BidModal.css'
import { placeBid } from '../../apiCalls.js/bids';



Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};




const BidModal = ({ modalIsOpen, setIsOpen, product }) => {


const [bidData, setBidData] = useState({
    bidAmount: product ? product.price : "",
    message: ""
})

    // function openModal() {
    //   setIsOpen(true);
    // }


    function closeModal() {
        setIsOpen(false);
        setBidData({
            bidAmount: product ? product.price : "",
            message: ""
        })
    }


    const handleAddBid = async (event)=>{
        toast.dismiss();
        event.preventDefault();
        const data = await placeBid({...bidData, product: product._id, seller: product.seller._id});
        toast.success(data.message)
        closeModal();
    }

    return (
        <div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                overlayClassName="overlay"
            >

                <div className='text-end'>
                    <button ><AiOutlineCloseSquare onClick={closeModal} /></button>
                </div>

                <div>
                    <form onSubmit={handleAddBid}>
                        <div className='mb-5'>
                            <label htmlFor="bidAmount">Bid Amount</label>
                            <input className='border border-gray-600 w-full focus:outline-none focus:border-black h-7 lg:h-10 mt-1 px-2' type="number"
                                  value={bidData.bidAmount}
                                  onChange={(e) =>
                                    setBidData({ ...bidData, bidAmount: e.target.value })
                                  }
                                required
                            />
                        </div>

                        <div className='mb-5'>
                            <label htmlFor="Message">Message</label>
                            <textarea className='px-2 border border-gray-600 w-full focus:outline-none focus:border-black h-14 mt-1' type="text"
                                //   value={bidData.message}
                                  onChange={(e) =>
                                    setBidData({ ...bidData, message: e.target.value })
                                  }
                            />
                        </div>
                        <div className='flex gap-5 justify-end'>
                            <button type='submit' className="btn rounded-md border border-solid border-gray-500 w-32 bg-white hover:border-black">Bid</button>
                        </div>
                    </form>
                </div>

            </Modal>
        </div>
    );
};

export default BidModal;