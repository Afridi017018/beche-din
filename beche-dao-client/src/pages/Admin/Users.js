import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllUsers, updateUserStatus } from '../../apiCalls.js/users';

const Users = () => {

    const [allUsers, setAllUsers] = useState([])



    const getUsers = async () => {
        const data = await getAllUsers();
        setAllUsers(data.data)
    }

    useEffect(() => {

        getUsers();

    }, [])



    const handleUpdateStatus = async (id, status) => {
        await updateUserStatus(id, status);
        getUsers();
    }


    return (
        <div className='mt-3'>
            {allUsers.length > 0 ?

                <div className="overflow-x-auto lg:mx-5">
                    <table className="table w-full border">

                        <thead>
                            <tr className='text-lg bg-gray-100 text-black'>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {allUsers && allUsers.map((e, i) => {
                                return (
                                    <tr key={i + 1} className="text-xl">
                                        <th>{i + 1}</th>

                                        <td>{e.name}</td>
                                        <td>{e.email}</td>
                                        <td className='capitalize'>{e.role}</td>
                                        <td className={`capitalize text-lg ${e.status === 'active' && 'text-green-600'}  ${e.status === 'blocked' && 'font-semibold'}`}>{e.status}</td>
                                        <td>
                                            <div className='text-base font-semibold cursor-pointer'>
                                                {e.status === "active" &&
                                                    <h5 onClick={() => handleUpdateStatus(e._id, "blocked")} className="underline">Block</h5>
                                                }
                                                {e.status === "blocked" &&
                                                    <h5 onClick={() => handleUpdateStatus(e._id, "active")} className='text-blue-600 underline'>Unblock</h5>
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
    );
};

export default Users;