import React, { useState } from 'react';
import AllProducts from './AllProducts';

const Admin = () => {
    const [activeTab, setActiveTab] = useState(0); 

    
    const tabComponents = [
        <AllProducts/>,
    //    <Users />,

    // "Products",
    "Users"
 
    ];

    const tabNames = [
        "Products",
        "Users"
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

export default Admin;