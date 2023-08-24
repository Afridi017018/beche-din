import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

    const handleLoginSubmit = (e)=>{
        e.preventDefault()
   
        const {email, password} = e.target;
        
        const user = {
            email: email.value,
            password: password.value
        }

        toast.dismiss();

        fetch(`http://localhost:3100/api/user/login`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)

        })
        .then(res=> res.json())
        .then((data)=> {

            if(data.success)
            {
                toast.success(data.message); 
            }

            else{
                toast.error(data.message);
            }

        })


    }

    return (
        <div className="flex justify-center items-center h-screen bg-sky-100">
            <form className="w-full max-w-sm bg-white drop-shadow-2xl rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLoginSubmit}>
                
            <h1 className="font-bold text-2xl mb-2 text-gray-600">Login</h1>
                <hr className="mb-3"/>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 outline-none "
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 outline-none "
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="mb-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" type="submit">
                        Login
                    </button>
                </div>
                <div className="text-center">
                    <small className="text-gray-500">Don't have an account?{" "}<Link to='/register' className="text-blue-600">Register</Link> </small>
                </div>
            </form>
        </div>
    );
};

export default Login;