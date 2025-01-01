import React, { useState } from 'react';
import logoImg from "../assets/logix_logo.png";

function DashboardPage() {
  const [activeButton, setActiveButton] = useState('dashboard');

  return (
    <div className='w-[100vw] h-screen overflow-hidden dashboard-bg flex justify-center items-center'>
      <div className='w-[98vw] h-[98vh] bg-white rounded-[40px] flex overflow-hidden'>
        <div className='w-[16%] h-full bg-[#eeecec] flex flex-col'>
          <div className='w-full h-[20%] text-black pl-6'>
            <div className='flex mt-6 justify-start items-center'>
              <img src={logoImg} alt='LogiX Logo' className='inline-block h-10 mr-2 contrast-200' />
              <span className='dashboard-sketch-text'>LogiX</span>
            </div>
          </div>
          <div className='w-full h-[40%] pl-6 pt-12 flex flex-col gap-6 figtree-regular'>
            <button
              className={`flex justify-start items-center gap-3 text-lg ${activeButton === 'dashboard' ? 'text-[#6045FE]' : 'text-[#949494]'}`}
              onClick={() => setActiveButton('dashboard')}
            >
              <div className='w-8'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
                  <path fill={activeButton === 'dashboard' ? '#6045FE' : '#949494'} d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3L280 88c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 204.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
                </svg>
              </div>
              <p className='font-semibold'>Dashboard</p>
            </button>
            <button
              className={`flex justify-start items-center gap-3 text-lg ${activeButton === 'account' ? 'text-[#6045FE]' : 'text-[#949494]'}`}
              onClick={() => setActiveButton('account')}
            >
              <div className='w-8'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
                  <path fill={activeButton === 'account' ? '#6045FE' : '#949494'} d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"/>
                </svg>
              </div>
              <p className='font-semibold'>Account Activity</p>
            </button>
            <button
              className={`flex justify-start items-center gap-3 text-lg ${activeButton === 'audience' ? 'text-[#6045FE]' : 'text-[#949494]'}`}
              onClick={() => setActiveButton('audience')}
            >
              <div className='w-8'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="30" viewBox="0 0 640 512">
                  <path fill={activeButton === 'audience' ? '#6045FE' : '#949494'} d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"/>
                </svg>
              </div>
              <p className='font-semibold'>Audience</p>
            </button>
            <button
              className={`flex justify-start items-center gap-3 text-lg ${activeButton === 'insights' ? 'text-[#6045FE]' : 'text-[#949494]'}`}
              onClick={() => setActiveButton('insights')}
            >
              <div className='w-8'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
                  <path fill={activeButton === 'insights' ? '#6045FE' : '#949494'} d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zm-312 8l0 64c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64c0-13.3-10.7-24-24-24s-24 10.7-24 24zm80-96l0 160c0 13.3 10.7 24 24 24s24-10.7 24-24l0-160c0-13.3-10.7-24-24-24s-24 10.7-24 24zm80 64l0 96c0 13.3 10.7 24 24 24s24-10.7 24-24l0-96c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                </svg>
              </div>
              <p className='font-semibold'>Insights</p>
            </button>
          </div>
        </div>
        <div className='w-[84%] h-full bg-[#fffefe]'>
          <div className='text-3xl font-semibold figtree-regular w-full py-4 text-center text-[#1c1c1c]'> Analytics Overview </div>
          <div id='dashboard' className='px-16 mt-4'>
            <h2 className='text-xl font-semibold'>Dashboard</h2>
            <div className='w-full flex justify-between items-center mt-4'>
                <div className='w-[23%] h-[100px] bg-[#e3fdfd] rounded-xl flex flex-col'>
                    <div className='w-full h-[60%] flex justify-center items-center text-[#1c1c1c] text-4xl font-bold'>
                        2.1k
                    </div>
                    <div className='w-full h-[40%] flex justify-center items-start gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
                            <path fill="#121212" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
                        </svg>
                        <p className='text-[#121212] text-lg font-semibold text-center'>Average Likes</p>
                    </div>
                </div>
                <div className='w-[23%] h-[100px] bg-[#fdebeb] rounded-xl flex flex-col'>
                    <div className='w-full h-[60%] flex justify-center items-center text-[#1c1c1c] text-4xl font-bold'>
                        347
                    </div>
                    <div className='w-full h-[40%] flex justify-center items-start gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
                            <path fill="#121212" d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/>
                        </svg>
                        <p className='text-[#121212] text-lg font-semibold text-center'>Average Comments</p>
                    </div>
                </div>                
                <div className='w-[23%] h-[100px] bg-[#eee5fe] rounded-xl flex flex-col'>
                    <div className='w-full h-[60%] flex justify-center items-center text-[#1c1c1c] text-4xl font-bold'>
                        1.74k
                    </div>
                    <div className='w-full h-[40%] flex justify-center items-start gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
                            <path fill="#121212" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
                        </svg>
                        <p className='text-[#121212] text-lg font-semibold text-center'>Average Shares</p>
                    </div>
                </div>
                <div className='w-[23%] h-[100px] bg-[#ecfff2] rounded-xl flex flex-col'>
                    <div className='w-full h-[60%] flex justify-center items-center text-[#1c1c1c] text-4xl font-bold'>
                        8.5k
                    </div>
                    <div className='w-full h-[40%] flex justify-center items-start gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="27" viewBox="0 0 576 512">
                            <path fill="#121212" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                        </svg>
                        <p className='text-[#121212] text-lg font-semibold text-center'>Average Views</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
