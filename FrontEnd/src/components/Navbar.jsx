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
        <a href='/' className='text-gray-300 hover:text-[#F97315] text-[16px] md:text-lg hidden md:block'>Home</a>
        <a href='mailto:ayushflows@gmail.com' className='text-gray-300 hover:text-[#F97315] text-lg hidden md:block'>Contact</a>
        <a href='/userinput' className='text-gray-300 hover:text-[#F97315] text-[16px] md:text-lg'>Get Started</a>
        <button onClick={() => { window.open("https://github.com/ayushflows/GenAI-Hackathon_LogiX", "_blank");}} 
          className="px-4 py-[1px] rounded-full relative bg-slate-700 text-white text-[16px] md:text-lg hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
          <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
          <span className="relative z-20">Github</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
