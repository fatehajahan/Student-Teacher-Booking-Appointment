import React from 'react'
import { Link } from 'react-router-dom'

const MainPage = () => {
    return (
        <div className='bg-gray-200 min-h-screen p-6'>
            <h1 className='font-extrabold text-[30px] py-[20px]'>Student-Teacher Booking Appointment</h1>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-7'>
                    {/* admin */}
                    <h1 className='text-[30px]'>For Admin: </h1>
                    <div>
                        <Link to="/teacherForm">
                            <p className='bg-amber-700 w-[300px] py-[8px] text-white font-bold cursor-pointer hover:bg-amber-600 transition duration-500 mx-auto'>Teacher Form</p>
                        </Link>
                    </div>
                    <div>
                        <Link to="/teacherList">
                            <p className='bg-amber-700 w-[300px] py-[8px] text-white font-bold cursor-pointer hover:bg-amber-600 transition duration-500 mx-auto'>Teacher List</p>
                        </Link>
                    </div>
                    <div>
                        <Link to="/waitingStudent">
                            <p className='bg-amber-700 w-[300px] py-[8px] text-white font-bold cursor-pointer hover:bg-amber-600 transition duration-500 mx-auto'>Student Waiting List</p>
                        </Link>
                    </div>
                    <div>
                        <Link to="/approvedStudents">
                            <p className='bg-amber-700 w-[300px] py-[8px] text-white font-bold cursor-pointer hover:bg-amber-600 transition duration-500 mx-auto'>Approved Student List</p>
                        </Link>
                    </div>
                </div>

                {/* teachers */}
                <div>
                    <h1 className='text-[30px]'>For Teachers: </h1>
                    <div className='flex flex-col gap-7'>
                        <Link to="/teacherLogin">
                            <p className='bg-amber-700 w-[300px] py-[8px] text-white font-bold cursor-pointer hover:bg-amber-600 transition duration-500 mx-auto'>Teacher Login</p>
                        </Link>
                    </div>
                </div>

                {/* students */}
                <div>
                    <h1 className='text-[30px]'>For Students: </h1>
                    <div className='flex flex-col gap-7'>
                        <Link to="/studentRegister">
                            <p className='bg-amber-700 w-[300px] py-[8px] text-white font-bold cursor-pointer hover:bg-amber-600 transition duration-500 mx-auto'>Student Registration</p>
                        </Link>

                        <Link to="/studentLogin">
                            <p className='bg-amber-700 w-[300px] py-[8px] text-white font-bold cursor-pointer hover:bg-amber-600 transition duration-500 mx-auto'>Student Login</p>
                        </Link>

                        <Link to="/searchTeacher">
                            <p className='bg-amber-700 w-[300px] py-[8px] text-white font-bold cursor-pointer hover:bg-amber-600 transition duration-500 mx-auto'>Search Teacher</p>
                        </Link>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default MainPage