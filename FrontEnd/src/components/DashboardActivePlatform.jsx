import React, { useState, useEffect } from 'react';

const socialmedias = [
  { id: 1, name: 'Facebook', icon: <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91V141.09c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.26 0 225.36 0c-73.22 0-121.36 44.38-121.36 124.72V195.3H22.89V288h81.11v224h100.2V288z"/></svg> },
  { id: 2, name: 'Instagram', icon: <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9-51.3-114.9-114.9-114.9zm0 186.6c-39.6 0-71.7-32.1-71.7-71.7s32.1-71.7 71.7-71.7 71.7 32.1 71.7 71.7-32.1 71.7-71.7 71.7zm146.4-194.3c0 14.9-12.1 27-27 27s-27-12.1-27-27 12.1-27 27-27 27 12.1 27 27zm76.1 27.2c-1.7-35.7-9.9-67.3-36.2-93.6S365.7 9.7 330 8c-35.7-1.7-142.8-1.7-178.5 0-35.7 1.7-67.3 9.9-93.6 36.2S9.7 146.3 8 182c-1.7 35.7-1.7 142.8 0 178.5 1.7 35.7 9.9 67.3 36.2 93.6s57.9 34.5 93.6 36.2c35.7 1.7 142.8 1.7 178.5 0 35.7-1.7 67.3-9.9 93.6-36.2s34.5-57.9 36.2-93.6c1.7-35.7 1.7-142.8 0-178.5zm-48.1 224c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.2 9-132.9 9s-103.5 2.6-132.9-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.2-9-132.9s-2.6-103.5 9-132.9c7.8-19.6 22.9-34.7 42.5-42.5 29.4-11.7 99.2-9 132.9-9s103.5-2.6 132.9 9c19.6 7.8 34.7 22.9 42.5 42.5 11.7 29.4 9 99.2 9 132.9s2.6 103.5-9 132.9z"/></svg> },
  { id: 3, name: 'Twitter', icon: <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.7-298.7 298.7-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.8 1.3 25.6 1.3 49.1 0 94.2-16.8 130.3-45-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13.1 1.6 20.1 1.6 9.6 0 19.1-1.3 28-3.6-48.1-9.7-84.1-52.1-84.1-103.1v-1.3c14.3 7.9 30.7 12.9 48.1 13.6-28.3-18.9-46.8-51-46.8-87.4 0-19.1 5.2-37 14.3-52.4 51.9 63.7 129.3 105.6 216.5 110.1-1.6-7.9-2.6-15.8-2.6-24 0-57.8 46.8-104.6 104.6-104.6 30.1 0 57.5 12.6 76.7 32.9 23.7-4.5 46.1-13.3 66.5-25.6-7.9 24.5-24.5 45-46.1 57.8 21.1-2.3 41.4-8.1 60.3-16.2-14.3 20.8-32.1 39.2-52.6 53.8z"/></svg> },
  { id: 4, name: 'LinkedIn', icon: <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zm-46.44-340.9C24.1 107.1 0 82.6 0 53.6 0 24.1 24.1 0 53.84 0c29.74 0 53.84 24.1 53.84 53.6 0 29.1-24.1 53.5-53.84 53.5zM447.9 448h-92.88V302.4c0-34.7-12.5-58.4-43.75-58.4-23.87 0-38.1 16.1-44.4 31.7-2.3 5.5-2.8 13.1-2.8 20.8V448h-92.88s1.2-239.8 0-264.1h92.88v37.4c-1.8 2.8-4.3 5.5-6.2 8.3h.1c8.3-12.8 23.2-31.1 56.5-31.1 41.3 0 72.3 27 72.3 85.1V448z"/></svg> }
];

function DashboardActivePlatform() {
  const [selectedPlatform, setSelectedPlatform] = useState(2);
  const [posttype, setPostType] = useState('Reel');

  return (
    <div className='flex justify-start items-center ml-12'>
      <div className='px-8 flex justify-start gap-[40px] bg-[#22252D] text-[#e2e2e2] rounded-[10px]'>
        {socialmedias.map((socialmedia) => (
          <button
            key={socialmedia.id}
            onClick={() => setSelectedPlatform(socialmedia.id)}
            className={`relative flex items-center justify-center px-2 py-[10px] gap-2 ${selectedPlatform === socialmedia.id ? 'text-white' : 'text-gray-400 opacity-50'}`}
            disabled={selectedPlatform !== null && selectedPlatform !== socialmedia.id}
          >
            {React.cloneElement(socialmedia.icon, {
              fill: selectedPlatform === socialmedia.id ? 'white' : 'gray',
            })}
            {socialmedia.name}
            {selectedPlatform === socialmedia.id && (
              <div className="absolute bottom-[1px] left-0 right-0 h-[3px] bg-orange-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
      <div className={`ml-10 flex items-center gap-2 justify-center bg-[#22252D] py-2 px-4 rounded-lg shadow-lg`}>
        <p className='text-md text-gray-300'>Post Type: </p>
        <p className='text-md text-white'> {posttype}</p>
      </div>
    </div>
  );
}

export default DashboardActivePlatform;