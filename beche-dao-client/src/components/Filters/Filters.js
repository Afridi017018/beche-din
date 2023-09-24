import React from 'react';

import { AiOutlineCloseSquare } from "react-icons/ai";

const Filters = ({ filters, setFilters, displayFilters, setDisplayFilters }) => {

    const categories = [
        {
            name: "Electronics",
            value: "electronics",
        },
        {
            name: "Home",
            value: "home",
        },
        {
            name: "Fashion",
            value: "fashion",
        },
        {
            name: "Sports",
            value: "sports",
        },
        {
            name: "Books",
            value: "books",
        },
    ];

    const ages = [
        {
            name: "0-6 months",
            value: "0-6",
        },
        {
            name: "7-12 months",
            value: "7-12",
        },
        {
            name: "13-18 months",
            value: "13-18",
        },
        {
            name: "19-24 months",
            value: "19-24",
        },
        {
            name: "24+ months",
            value: "24-100",
        },
    ];


    return (
        <div className='mx-2'>
            <div className='flex justify-between text-2xl font-bold'>
                <h3>Filters</h3>
                <AiOutlineCloseSquare onClick={() => setDisplayFilters(!displayFilters)} className='text-3xl cursor-pointer' />
            </div>

            <div className='my-3'>
                <h4 className='text-lg font-medium'>Categories</h4>

                <div className='ml-5'>
                    {
                        categories.map((category, i) => (
                            <div key={i + 1}>
                                <label className='flex justify-start text-lg gap-2 mb-3' htmlFor={category.name}>
                                    <input
                                        className='my-auto h-5 w-5 cursor-pointer'
                                        type="checkbox"
                                        checked={filters.category.includes(category.value)}
                                        onChange={(e) => {

                                            if (e.target.checked) {
                                                setFilters({
                                                    ...filters,
                                                    category: [...filters.category, category.value],
                                                })
                                            }
                                            else {
                                                setFilters({
                                                    ...filters,
                                                    category: filters.category.filter(
                                                        (item) => item !== category.value
                                                    ),
                                                });
                                            }
                                        }}

                                    />
                                    {category.name}
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className='my-3'>
                <h4 className='text-lg font-medium'>Ages</h4>

                <div className='ml-5'>
                    {
                        ages.map((age, i) => (
                            <div key={i + 1}>
                                <label className='flex justify-start text-lg gap-2 mb-3' htmlFor={age.name}>
                                    <input
                                        className='my-auto h-5 w-5 cursor-pointer'
                                        type="checkbox"
                                        checked={filters.age.includes(age.value)}
                                        onChange={(e) => {

                                            if (e.target.checked) {
                                                setFilters({
                                                    ...filters,
                                                    age: [age.value],
                                                })
                                            }
                                            else {
                                                setFilters({
                                                    ...filters,
                                                    age: filters.age.filter(
                                                        (item) => item !== age.value
                                                    ),
                                                });
                                            }
                                        }}

                                    />
                                    {age.name}
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>



        </div>
    );
};

export default Filters;