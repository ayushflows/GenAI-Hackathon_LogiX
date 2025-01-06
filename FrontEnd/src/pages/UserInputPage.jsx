import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { analyzeData, fetchDistinctUsers } from '../api/api';

function UserInputPage() {
  const navigate = useNavigate();

  const [platform, setPlatform] = useState('');
  const [accountName, setAccountName] = useState('');
  const [postType, setPostType] = useState('');
  const [accountOptions, setAccountOptions] = useState([]); // Store fetched users
  const [dropdownOpen, setDropdownOpen] = useState({
    platform: false,
    accountName: false,
    postType: false,
  });

  const platformDropdownRef = useRef(null);
  const accountNameDropdownRef = useRef(null);
  const postTypeDropdownRef = useRef(null);

  const toggleDropdown = (dropdown) => {
    setDropdownOpen((prev) => ({ ...prev, [dropdown]: !prev[dropdown] }));
  };

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

  useEffect(() => {
    document.addEventListener('click', closeDropdowns);
    return () => {
      document.removeEventListener('click', closeDropdowns);
    };
  }, []);

  const handlePlatformSelect = (selectedPlatform) => {
    setPlatform(selectedPlatform);
    setAccountName('');
    setAccountOptions([]);
    setDropdownOpen((prev) => ({ ...prev, platform: false }));
    console.log("fetching accounts");
    fetchDistinctUsers(selectedPlatform)
      .then((users) => {
        console.log('Distinct Users:');
        setAccountOptions(users);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const analyzingData = {socialAccount: platform, user:accountName, postType: postType};
    console.log("analyzing...")
    analyzeData(analyzingData)
      .then((analyzedData) => {
        console.log('Analyzed Data:');
        navigate('/dashboard', { state: { analyzedData } });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


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
            {/* Platform Dropdown */}
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
                  <div className='absolute w-[300px] bg-gray-900 rounded mt-1 z-10'>
                    <ul className='text-white text-lg'>
                      {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((item) => (
                        <li
                          key={item}
                          className='px-4 py-2 hover:bg-[#004e74] cursor-pointer'
                          onClick={() => handlePlatformSelect(item)}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Account Name Dropdown */}
            <div className='mb-6'>
  <label htmlFor='accountName' className='block mb-2 text-lg text-gray-200'>Select Account Name:</label>
  <div className='relative' ref={accountNameDropdownRef}>
    <button
      type='button'
      onClick={() => toggleDropdown('accountName')}
      className='w-[300px] p-2 pl-4 rounded bg-gray-800 text-white text-[18px] flex justify-between items-center'
      disabled={accountOptions.length === 0}
    >
      {accountName || '-- Select Account --'}
      <span className='ml-2 text-gray-400'>▼</span>
    </button>
    {dropdownOpen.accountName && accountOptions.length > 0 && (
      <div
        className='absolute w-[300px] bg-gray-900 rounded mt-1 z-10 overflow-y-auto max-h-[250px]' 
      >
        <ul className='text-white text-lg'>
          {accountOptions.map((item) => (
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


            {/* Post Type Dropdown */}
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
                  <div className='absolute w-[300px] bg-gray-900 rounded mt-1 z-10'>
                    <ul className='text-white text-lg'>
                      {['Image', 'Reel', 'Story'].map((item) => (
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
            className='bg-[#F6A01D] mx-auto text-[#2D2D2D] hover:scale-105 transition-all duration-100 px-4 h-[45px] mt-10 rounded inter-regular text-[20px] flex justify-center items-center gap-3'
          >
            Generate Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserInputPage;
