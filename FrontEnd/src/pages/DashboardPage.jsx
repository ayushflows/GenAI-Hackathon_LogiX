import React, { useState } from 'react';
import logoImg from "../assets/logix_logo.png";
import DashboardCount from '../components/DashboardCount';
import DashboardNavbar from '../components/DashboardNavbar';
import AudienceAnalytics from '../components/AudienceAnalytics';
import DashboardActivePlatform from '../components/DashboardActivePlatform';

function DashboardPage() {
  const [activeButton, setActiveButton] = useState('dashboard');

  return (
    <div className='w-[100vw] h-screen overflow-hidden dashboard-bg flex justify-center items-center inter-regular'>
      <div className='w-[calc(100vw-15px)] h-[calc(100vh-15px)] bg-[#2E3139] rounded-[40px] flex overflow-hidden inter-regular'>
        <div className='w-[230px] h-full bg-[#22252D] flex flex-col'>
          <div className='w-full h-[10%] text-black pl-6'>
            <div className='flex mt-6 justify-start items-center'>
              <img src={logoImg} alt='LogiX Logo' className='inline-block h-10 mr-2 filter invert contrast-200' />
              <span className='dashboard-sketch-text'>LogiX</span>
            </div>
          </div>
          <DashboardNavbar setActiveButton={setActiveButton} activeButton={activeButton}/>
        </div>
        <div id='analytics-overview' className='w-[calc(100%-230px)] h-full bg-[#2E3139] overflow-y-auto custom-scrollbar'>
          <h1 className='text-2xl font-normal figtree-regular w-full py-3 text-center text-[#e6e6e6] mb-2'> Analytics Overview </h1>
          <DashboardActivePlatform />
          <DashboardCount />
          <AudienceAnalytics />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
