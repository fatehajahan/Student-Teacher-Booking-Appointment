import React from 'react'
import { Link } from 'react-router-dom'

const AdminHome = () => {
    return (
        <div>
            <div className='flex flex-col gap-7 bg-gray-500 p-6 min-h-screen'>
                {/* admin */}
                <h1 className='text-[30px] text-center font-bold text-white'>For Admin: </h1>
                <div>
                    <Link to="/teacherForm">
                        <p className='bg-amber-700 w-[300px] py-[8px] text-white font-bold cursor-pointer hover:bg-amber-600 transition duration-500 mx-auto text-center'>Teacher Form</p>
                    </Link>
                </div>
                <div>
                    <Link to="/teacherList">
                        <p className='bg-amber-700 w-[300px] py-[8px] text-white font-bold cursor-pointer hover:bg-amber-600 transition duration-500 mx-auto text-center'>Teacher List</p>
                    </Link>
                </div>
                <div>
                    <Link to="/waitingStudent">
                        <p className='bg-amber-700 w-[300px] py-[8px] text-white font-bold cursor-pointer hover:bg-amber-600 transition duration-500 mx-auto text-center'>Student Waiting List</p>
                    </Link>
                </div>
                <div>
                    <Link to="/approvedStudents">
                        <p className='bg-amber-700 w-[300px] py-[8px] text-white font-bold cursor-pointer hover:bg-amber-600 transition duration-500 mx-auto text-center'>Approved Student List</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminHome