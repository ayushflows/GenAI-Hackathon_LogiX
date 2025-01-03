import React, { useState } from 'react';

const metrics = [
  {
    id: 1,
    value: '2.1k',
    label: 'Likes',
    gradient: 'from-[#ff34341f] via-[#22252d] to-[#22252d]',
    border: 'border-[#ff34341f]',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 512 512">
        <path fill="#ebebeb" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
      </svg>
    ),
  },
  {
    id: 2,
    value: '347',
    label: 'Comments',
    gradient: 'from-[#45ff341f] via-[#22252d] to-[#22252d]',
    border: 'border-[#45ff341f]',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 512 512">
        <path fill="#ebebeb" d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/>
      </svg>
    ),
  },
  {
    id: 3,
    value: '1.74k',
    label: 'Shares',
    gradient: 'from-[#3452ff1f] via-[#22252d] to-[#22252d]',
    border: 'border-[#3452ff1f]',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 512 512">
        <path fill="#ebebeb" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
      </svg>
    ),
  },
  {
    id: 4,
    value: '8.5k',
    label: 'Views',
    gradient: 'from-[#f534ff1f] via-[#22252d] to-[#22252d]',
    border: 'border-[#f534ff1f]',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 576 512">
        <path fill="#ebebeb" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
      </svg>
    ),
  },
];

function DashboardCount() {
  const [postType, setPostType] = useState('Reel');
    return (
      <div id="dashboard" className="mx-12 mt-8 inter-regular">
        <div className="flex items-center gap-2">
          <h2 className="text-lg text-[#ebebeb] relative pb-1">
            Dashboard
            <span className="absolute bottom-[-4px] left-0 w-full h-[4px] bg-orange-500 rounded-full glow-bar"></span>
          </h2>
        </div>
        <p className='text-[#c5c5c5] mt-3'>On an average your each {postType} has: </p>
        <div className="w-full flex justify-between items-center mt-4">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className={`w-[23%] h-[120px] bg-gradient-to-bl ${metric.gradient} ${metric.border} rounded-xl flex items-center justify-between p-4 border-2 shadow-lg`}
            >
              <div className="text-left">
                <p className="text-4xl font-bold text-white">{metric.value}</p>
                <p className="text-[#cccccc] mt-2">{metric.label}</p>
              </div>
              <div className="text-right text-white">{metric.icon}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

export default DashboardCount;