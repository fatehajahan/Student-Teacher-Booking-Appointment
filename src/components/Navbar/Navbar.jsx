import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    const ADMIN_EMAIL = "admin@1234.com";
    const ADMIN_PASSWORD = "admin1234";

    const handleAdminClick = () => {
        const email = prompt("Enter Admin Email:");
        const password = prompt("Enter Admin Password:");

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            navigate('/adminHome').then(() => {
                toast.success("Welcome Admin!!")
            })
        } else {
            toast.error("Invalid admin credentials. Access denied!!");
        }
    };

    return (
        <div className='bg-gray-500 w-full'>
            <div className="container">
                <div className='flex justify-between py-[20px]'>
                    <h1 className='text-white font-bold'>EdConnect</h1>
                    <div>
                        <ul className='flex gap-5 text-white'>
                            <li>
                                <div onClick={handleAdminClick} className='cursor-pointer'>
                                    For Admins
                                </div>
                            </li>
                            <li>
                                <div>
                                    <a href="/teacherLogin">For Teachers</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
