import React from 'react'
import { Link } from 'react-router-dom'

const MainPage = () => {
    return (
        <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-7'>
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
                    <Link to="/studentApprovalList">
                        <p className='bg-amber-700 w-[300px] py-[8px] text-white font-bold cursor-pointer hover:bg-amber-600 transition duration-500 mx-auto'>Studen Approval List</p>
                    </Link>
                </div>
            </div>


            <div>
                <h1 className='text-[30px]'>For Students: </h1>
                <div>
                    <Link to="/studentRegister">
                        <p className='bg-amber-700 w-[300px] py-[8px] text-white font-bold cursor-pointer hover:bg-amber-600 transition duration-500 mx-auto'>Student Registration</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MainPage