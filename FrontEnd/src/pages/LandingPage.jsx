import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

function LandingPage() {
  const [animateText, setAnimateText] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateText(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate('/userinput');
  };

  return (
    <div className='text-2xl h-screen w-[100vw] text-white lading-page-bg relative overflow-hidden'>
      <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:60px_60px]'></div>
      <Navbar />
      <div className='abel-regular w-full text-center pt-32 relative'>
        <motion.h1
          className='text-[5.2vw] font-bold'
          initial={{ scale: 1.5, y: '100px', opacity: 0 }}
          animate={{
            scale: animateText ? 1 : 1.5,
            y: animateText ? 0 : '100px',
            opacity: animateText ? 1 : 0,
          }}
          transition={{
            duration: 1.4,
            ease: 'easeInOut',
          }}
        >
          Presenting The Next-Gen
        </motion.h1>
        <motion.h2
          className='text-[#92deff] mt-12 text-[5.2vw] font-bold'
          initial={{ scale: 1.5, y: '100px', opacity: 0 }}
          animate={{
            scale: animateText ? 1 : 1.5,
            y: animateText ? 0 : '100px',
            opacity: animateText ? 1 : 0,
          }}
          transition={{
            duration: 1.4,
            ease: 'easeInOut',
            delay: 0.2,
          }}
        >
          User Analytics
        </motion.h2>
        <motion.p
          className='max-w-[40vw] text-center mx-auto mt-12 text-[#9299b8] text-[19px]'
          initial={{ y: '100px', opacity: 0 }}
          animate={{
            y: animateText ? 0 : '100px',
            opacity: animateText ? 1 : 0,
          }}
          transition={{
            duration: 1.4,
            ease: 'easeInOut',
            delay: 0.2,
          }}
        >
          We Provide Good User Analytics, Engagement, and Insights for social media accounts to help them grow.
        </motion.p>
      </div>
      <div className='w-full flex justify-center items-center mt-12 relative'>
        <motion.button
          className='bg-[#b5e0f3] text-black w-[160px] h-[50px] flex justify-center items-center text-xl transition duration-200 ease-in-out transform'
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: animateText ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: 'easeInOut',
            delay: 1.2,
          }}
          whileHover={{ scale: 1.1 }}
          onClick={handleGetStarted}
        >
          Get Started <span className='ml-2'>&rarr;</span>
        </motion.button>
        <motion.button
          className='bg-[#0d1229ab] bg-opacity-30 backdrop-blur-xl ml-10 text-white w-[160px] h-[50px] flex justify-center items-center text-xl transition duration-200 ease-in-out transform'
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: animateText ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: 'easeInOut',
            delay: 1.2,
          }}
          whileHover={{ scale: 1.1 }}
        >
          Learn More
        </motion.button>
      </div>
    </div>
  );
}

export default LandingPage;
