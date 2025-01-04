import React from 'react';
import logoImg from "../assets/logix_logo.png";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className='w-full inter-regular py-4 px-4 md:px-12 flex justify-between items-center glassy-navbar'>
      <div className='text-[#F97315] font-semibold flex justify-center items-center cursor-pointer' onClick={()=>navigate("/")}>
        <img src={logoImg} alt='LogiX Logo' className='inline-block h-[30px] md:h-10 mr-2 filter invert contrast-100' />
        <span className='sketch-text text-[18px] md:text-[1.7rem]'>LogiX</span>
      </div>
      <div className='flex space-x-5 md:space-x-8 justify-center items-center'>
        <a href='/' className='text-gray-300 hover:text-[#F97315] text-[16px] md:text-lg '>Home</a>
        <a href='/about' className='text-gray-300 hover:text-[#F97315] text-lg hidden md:block'>About</a>
        <a href='/contact' className='text-gray-300 hover:text-[#F97315] text-lg hidden md:block'>Contact</a>
        <a href='/userinput' className='text-gray-300 hover:text-[#F97315] text-[16px] md:text-lg'>Get Started</a>
      </div>
    </nav>
  );
}

export default Navbar;
