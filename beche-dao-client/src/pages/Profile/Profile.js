import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../apiCalls.js/users';
import MyBids from '../../components/MyBids/MyBids';
import Bids from '../Products/Bids';
import General from '../Products/General';
import Products from '../Products/Products';







const Profile = () => {

    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [activeTab, setActiveTab] = useState(0); 

    useEffect(()=>{
        const getUser  = async()=>{
           const data = await getCurrentUser();
        //    console.log(data.data._id)
        setCurrentUser(data.data._id);
        setIsLoading(false);

        }
        getUser();
    },[currentUser])

    const tabComponents = [
        isLoading || <Products currentUser ={currentUser}/>,
       <MyBids />,
       <General />
    ];

    const tabNames = [
        "Products",
        "My Bids",
        "General"
    ];

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className=''>
            <div className="tabs block border">
                {tabNames.map((tab, index) => (
                    <div
                        key={index}
                        className={`tab tab-bordered ${activeTab === index ? 'tab-active' : ''}`}
                        onClick={() => handleTabClick(index)}
                        style={{ cursor: 'pointer' }}
                    >
                       {tabNames[index]}
                    </div>
                ))}
            </div>

            <div>{tabComponents[activeTab]}</div>
            
        </div>
    );
};

export default Profile;