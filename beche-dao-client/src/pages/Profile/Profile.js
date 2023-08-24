import React, { useState } from 'react';
import Bids from '../Products/Bids';
import General from '../Products/General';
import Products from '../Products/Products';


const Profile = () => {

    const [activeTab, setActiveTab] = useState(0); 

    const tabComponents = [
       <Products />,
       <Bids />,
       <General />
    ];

    const tabNames = [
        "Products",
        "Bids",
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