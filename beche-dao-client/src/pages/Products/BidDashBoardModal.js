import React, { useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineCloseSquare } from "react-icons/ai";
import moment from 'moment'

import "./BidDashBoardModal.css"
import { useEffect } from 'react';
import { getAllBids } from '../../apiCalls.js/bids';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '90%',
        maxHeight: '90%',
        minWidth: '50%',
        minHeight: '50%'
    },
};


const BidDashBoardModal = ({ bidModalIsOpen, setIsBidModalOpen, selectedProduct }) => {
     const [allBids, setAllBids] = useState([])

    useEffect(()=>{
        const fetchAllBids = async ()=>{
             const data = await getAllBids({product: selectedProduct})
            setAllBids(data.data);
            // console.log(data.data);

        }

       selectedProduct && fetchAllBids();
        
    },[selectedProduct])

    // function openModal() {
    //     setIsBidModalOpen(true);
    //   }



    function closeModal() {
        setIsBidModalOpen(false);
        setAllBids([]);
    }

    return (
        <div>
            {/* <button onClick={openModal}>Open Modal</button> */}
            <Modal
                isOpen={bidModalIsOpen}

                onRequestClose={closeModal}
                style={customStyles}
                overlayClassName="overlay"
            >

                <div className='text-end'>
                    <button ><AiOutlineCloseSquare onClick={closeModal} /></button>
                </div>
                <div>
                    {allBids.length > 0 && <h2 className='text-xl font-bold text-center m-3'>{allBids[0].product.name}</h2>}
                </div>
                <div className='m-2'>
                    <h3 className='text-base font-bold'>Bids</h3>
                </div>
                <hr />
                <div className="overflow-auto">
                    <table className="table">
    
                        <thead>
                            {allBids.length > 0 ? 
                            <tr>
                                <th>Name</th>
                                <th>Bid Amount</th>
                                <th>Bid Date</th>
                                <th>Message</th>
                                <th>Contact</th>
                            </tr>
                            :
                            <h4 className='my-20 text-lg font bold text-center'>No bid has placed yet !</h4>
                            }
                        </thead>
                        <tbody>
    
                            {allBids.length > 0 && allBids.map((e,i)=>(
                                <tr key={i+1}>
                                <td>{e.buyer.name}</td>
                                <td>${e.bidAmount}</td>
                                <td>{moment(e.createdAt).format("DD/MM/YY, hh:mm A")}</td>
                                <td>{e.message}</td>
                                <td>{e.buyer.email}</td>
                            </tr>
                            ))}
                            

                        </tbody>
                    </table>
                </div>

            </Modal>
        </div>
    );
};

export default BidDashBoardModal;