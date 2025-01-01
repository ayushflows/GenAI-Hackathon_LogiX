import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function UserInputPage() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };
  return (
    <div className='text-2xl h-screen w-[100vw] text-white lading-page-bg relative overflow-hidden'>
      <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:60px_60px]'></div>
      <Navbar />
      <div className='abel-regular w-full text-center pt-32 relative flex flex-col items-center'>
        <h1 className='text-[5.2vw] font-bold'>Analytics Report</h1>
        <p className='max-w-[40vw] text-center mx-auto mt-10 text-[#9299b8] text-[19px]'>
          Provide Your Details to Get the Analytics Report and Insights of your social account.
        </p>
        <form className='mt-12 w-full' onSubmit={handleSubmit}>
          <div className='flex items-center justify-evenly'>
            <div className='mb-6'>
              <label htmlFor='platform' className='block mb-2 text-lg text-gray-200'>Select Social Media Platform:</label>
              <select id='platform' className='w-[300px] p-2 rounded bg-gray-800 text-white'>
                <option value='' disabled selected>
                  -- Select Platform --
                </option>
                <option value='facebook'>Facebook</option>
                <option value='instagram'>Instagram</option>
                <option value='twitter'>Twitter</option>
                <option value='linkedin'>LinkedIn</option>
              </select>
            </div>
            <div className='mb-6'>
              <label htmlFor='accountName' className='block mb-2 text-lg text-gray-200'>Select Account Name:</label>
              <select id='accountName' className='w-[300px] p-2 rounded bg-gray-800 text-white'>
                <option value='' disabled selected>
                  -- Select Account --
                </option>
                <option value='ayush'>Ayush Tripathi's Account</option>
                <option value='john'>John Doe's Account</option>
                <option value='jane'>Jane Smith's Account</option>
              </select>
            </div>
            <div className='mb-6'>
              <label htmlFor='postType' className='block mb-2 text-lg text-gray-200'>Post Type:</label>
              <select id='postType' className='w-[300px] p-2 rounded bg-gray-800 text-white'>
                <option value='' disabled selected>
                  -- Select Post Type --
                </option>
                <option value='photo'>Photo</option>
                <option value='reel'>Reel</option>
                <option value='story'>Story</option>
              </select>
            </div>
          </div>
          <button type='submit' className='bg-[#b5e0f3] text-black w-[150px] h-[50px] mt-10 rounded'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserInputPage;
