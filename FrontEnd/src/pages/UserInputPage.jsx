import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function UserInputPage() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('data is: ', { platform, accountName, postType });
    navigate('/dashboard');
  };

  const [platform, setPlatform] = useState('');
  const [accountName, setAccountName] = useState('');
  const [postType, setPostType] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState({
    platform: false,
    accountName: false,
    postType: false
  });

  // Refs to store the dropdown elements
  const platformDropdownRef = useRef(null);
  const accountNameDropdownRef = useRef(null);
  const postTypeDropdownRef = useRef(null);

  const toggleDropdown = (dropdown) => {
    setDropdownOpen((prev) => ({ ...prev, [dropdown]: !prev[dropdown] }));
  };

  // Function to close dropdowns when clicking outside
  const closeDropdowns = (e) => {
    if (
      platformDropdownRef.current &&
      !platformDropdownRef.current.contains(e.target)
    ) {
      setDropdownOpen((prev) => ({ ...prev, platform: false }));
    }
    if (
      accountNameDropdownRef.current &&
      !accountNameDropdownRef.current.contains(e.target)
    ) {
      setDropdownOpen((prev) => ({ ...prev, accountName: false }));
    }
    if (
      postTypeDropdownRef.current &&
      !postTypeDropdownRef.current.contains(e.target)
    ) {
      setDropdownOpen((prev) => ({ ...prev, postType: false }));
    }
  };

  // Add event listener for clicks outside the dropdowns
  useEffect(() => {
    document.addEventListener('click', closeDropdowns);
    return () => {
      document.removeEventListener('click', closeDropdowns);
    };
  }, []);

  return (
    <div className='text-2xl h-screen w-[100vw] text-white landing-page-bg relative overflow-hidden'>
      <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:120px_120px]'></div>
      <Navbar />
      <div className='abel-regular w-full text-center pt-16 lg:pt-32 relative flex flex-col items-center'>
        <h1 className=' text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold'>Analytics Report</h1>
        <p className='max-w-[90%] md:max-w-[75%] lg:max-w-[40vw] text-center mx-auto mt-6 md:mt-10 text-[#9299b8] text-[17px] inter-regular'>
          Provide Your Details to Get the Analytics Report and Insights of your social account.
        </p>
        <form className='mt-12 w-full inter-regular' onSubmit={handleSubmit}>
          <div className='flex flex-col lg:flex-row items-center justify-evenly'>
            {/* Custom Dropdown for Platform */}
            <div className='mb-6'>
              <label htmlFor='platform' className='block mb-2 text-lg text-gray-200'>Select Social Media Platform:</label>
              <div className='relative' ref={platformDropdownRef}>
                <button
                  type='button'
                  onClick={() => toggleDropdown('platform')}
                  className='w-[300px] p-2 pl-4 rounded bg-gray-800 text-white text-[18px] flex justify-between items-center'
                >
                  {platform || '-- Select Platform --'}
                  <span className='ml-2 text-gray-400'>▼</span>
                </button>
                {dropdownOpen.platform && (
                  <div className='absolute w-[300px] bg-gray-800 rounded mt-1'>
                    <ul className='text-white text-lg'>
                      {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((item) => (
                        <li
                          key={item}
                          className='px-4 py-2 hover:bg-[#004e74] cursor-pointer'
                          onClick={() => {
                            setPlatform(item);
                            setDropdownOpen((prev) => ({ ...prev, platform: false }));
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Custom Dropdown for Account Name */}
            <div className='mb-6'>
              <label htmlFor='accountName' className='block mb-2 text-lg text-gray-200'>Select Account Name:</label>
              <div className='relative' ref={accountNameDropdownRef}>
                <button
                  type='button'
                  onClick={() => toggleDropdown('accountName')}
                  className='w-[300px] p-2 pl-4 rounded bg-gray-800 text-white text-[18px] flex justify-between items-center'
                >
                  {accountName || '-- Select Account --'}
                  <span className='ml-2 text-gray-400'>▼</span>
                </button>
                {dropdownOpen.accountName && (
                  <div className='absolute w-[300px] bg-gray-800 rounded mt-1'>
                    <ul className='text-white text-lg'>
                      {['Ayush Tripathi\'s Account', 'John Doe\'s Account', 'Jane Smith\'s Account'].map((item) => (
                        <li
                          key={item}
                          className='px-4 py-2 hover:bg-[#004e74] cursor-pointer'
                          onClick={() => {
                            setAccountName(item);
                            setDropdownOpen((prev) => ({ ...prev, accountName: false }));
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Custom Dropdown for Post Type */}
            <div className='mb-6'>
              <label htmlFor='postType' className='block mb-2 text-lg text-gray-200'>Post Type:</label>
              <div className='relative' ref={postTypeDropdownRef}>
                <button
                  type='button'
                  onClick={() => toggleDropdown('postType')}
                  className='w-[300px] p-2 pl-4 rounded bg-gray-800 text-white text-[18px] flex justify-between items-center'
                >
                  {postType || '-- Select Post Type --'}
                  <span className='ml-2 text-gray-400'>▼</span>
                </button>
                {dropdownOpen.postType && (
                  <div className='absolute w-[300px] bg-gray-800 rounded mt-1'>
                    <ul className='text-white text-lg'>
                      {['Photo', 'Reel', 'Story'].map((item) => (
                        <li
                          key={item}
                          className='px-4 py-2 hover:bg-[#004e74] cursor-pointer'
                          onClick={() => {
                            setPostType(item);
                            setDropdownOpen((prev) => ({ ...prev, postType: false }));
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            type='submit'
            className='bg-[#1D3C50] text-[#F5F5F5] hover:scale-105 transition-all duration-100 w-[130px] h-[42px] mt-10 rounded inter-regular text-[20px]'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserInputPage;
