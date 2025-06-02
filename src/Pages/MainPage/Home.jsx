import React from 'react'
import { Link } from 'react-router-dom'
import banner from '../../assets/banner.png'
import Navbar from '../../components/Navbar/Navbar'

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="container">
                <div className='flex justify-between items-center'>
                    <div className='py-[50px] w-1/2'>
                        <i className='text-black font-bold'>Welcome to EdConnect</i>
                        <p className='text-black uppercase text-[50px] w-[550px]'>Increase Your Skills with best Teachers</p>
                        <div className='w-[450px]'>
                            <i>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad maxime vitae quibusdam aperiam sapiente corrupti consequatur qui sequi error consequuntur.</i>
                        </div>
                    </div>

                    <div className="w-1/2">
                        <img src={banner} alt="" className='w-[550px]'/>
                    </div>
                </div>

                <div className="btns flex justify-center gap-3">
                    <Link to="/studentLogin" className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer">Login</Link>
                    <Link to="/studentRegister" className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Home