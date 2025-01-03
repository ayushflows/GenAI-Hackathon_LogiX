import React from 'react';
import logoImg from "../assets/logix_logo.png";

function Navbar() {
  return (
    <nav className='w-full inter-regular py-4 px-12 flex justify-between items-center glassy-navbar'>
      <div className='text-white text-2xl font-semibold flex justify-center items-center'>
        <img src={logoImg} alt='LogiX Logo' className='inline-block h-8 mr-2 filter invert contrast-100' />
        <span className='sketch-text'>LogiX</span>
      </div>
      <div className='flex space-x-8 justify-center items-center'>
        <a href='/' className='text-gray-200 text-lg'>Home</a>
        <a href='/about' className='text-gray-200 text-lg'>About</a>
        <a href='/contact' className='text-gray-200 text-lg'>Contact</a>
        <a href='/userinput' className='text-gray-200 text-lg'>Get Started</a>
      </div>
    </nav>
  );
}

export default Navbar;
