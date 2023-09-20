import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { AiOutlineCloseSquare } from "react-icons/ai";

import './BidModal.css'


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




const BidModal = ({ modalIsOpen, setIsOpen }) => {




    // function openModal() {
    //   setIsOpen(true);
    // }


    function closeModal() {
        setIsOpen(false);
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
                    <form>
                        <div className='mb-5'>
                            <label htmlFor="bidAmount">Bid Amount</label>
                            <input className='border border-gray-600 w-full focus:outline-none focus:border-black h-7 lg:h-10 mt-1' type="number"
                                //   value={formData.name}
                                //   onChange={(e) =>
                                //     setFormData({ ...formData, name: e.target.value })
                                //   }
                                required
                            />
                        </div>

                        <div className='mb-5'>
                            <label htmlFor="Message">Message</label>
                            <textarea className='border border-gray-600 w-full focus:outline-none focus:border-black h-14 mt-1' type="text"
                                //   value={formData.description}
                                //   onChange={(e) =>
                                //     setFormData({ ...formData, description: e.target.value })
                                //   }
                                // required
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