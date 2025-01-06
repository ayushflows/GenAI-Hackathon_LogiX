import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { analyzeData, demoFetch, fetchDistinctUsers } from '../api/api';
import { MultiStepLoader as Loader } from "../components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
const loadingStates = [
  {
    text: "Filtering the Accounts Data",
  },
  {
    text: "Parsing the Information",
  },
  {
    text: "Analyzing the Data",
  },
  {
    text: "Generating the Report",
  },
  {
    text: "Sending the Report",
  },
];

function UserInputPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [platform, setPlatform] = useState('');
  const [accountName, setAccountName] = useState('');
  const [postType, setPostType] = useState('');
  const [accountOptions, setAccountOptions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState({
    platform: false,
    accountName: false,
    postType: false,
  });
  const [accountLoading, setAccountLoading] = useState(false);
  const [error, setError] = useState('');
  const [accountError, setAccountError] = useState('');

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

  useEffect(() => {
    if (error || accountError) {
      const timer = setTimeout(() => {
        setError('');
        setAccountError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, accountError]);

  const handlePlatformSelect = (selectedPlatform) => {
    setPlatform(selectedPlatform);
    setAccountName('');
    setAccountOptions([]);
    setDropdownOpen((prev) => ({ ...prev, platform: false }));
    setAccountLoading(true);
    setAccountError('');
    fetchDistinctUsers(selectedPlatform)
      .then((users) => {
        setAccountOptions(users);
      })
      .catch((error) => {
        setAccountError('Failed to fetch account details. Please try again.');
      })
      .finally(() => {
        setAccountLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!platform || !accountName || !postType) {
      setError('All fields are required. Please select a platform, account name, and post type.');
      return;
    }
    setLoading(true);
    setError('');
    const analyzingData = {socialAccount: platform, user:accountName, postType: postType};
    analyzeData(analyzingData)
      .then((analyzedData) => {
        navigate('/dashboard', { state: { analyzedData } });
      })
      .catch((error) => {
        setError('Failed to generate report. Please try again.');
      }).finally(() => {
        setLoading(false);
      });
  };

  useEffect(()=>{
    demoFetch().then((response)=>{}).catch((error)=>{});
  },[])

  return (
    <div className='text-2xl h-screen w-[100vw] text-white landing-page-bg relative overflow-hidden'>
      <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:120px_120px]'></div>
    <Loader loadingStates={loadingStates} loading={loading} duration={1300} />
      {accountLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='loader'></div>
        </div>
      )}
      {/* Loader CSS */}
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #F6A01E;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .error-box {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #ff4d4d;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          animation: fadeIn 0.5s ease-in-out;
          z-index: 1000;
        }
        .error-box .close-btn {
          margin-left: 10px;
          cursor: pointer;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <Navbar />
      <div className='abel-regular w-full text-center pt-16 lg:pt-32 relative flex flex-col items-center'>
        <h1 className=' text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold'>Analytics Report</h1>
        <p className='max-w-[90%] md:max-w-[75%] lg:max-w-[40vw] text-center mx-auto mt-6 md:mt-10 text-[#9299b8] text-[17px] inter-regular'>
          Provide Your Details to Get the Analytics Report and Insights of your social account.
        </p>
        {error && (
          <div className='error-box text-[19px]'>
            {error}
            <span className='close-btn' onClick={() => setError('')}>✖</span>
          </div>
        )}
        {accountError && (
          <div className='error-box text-[18px]'>
            {accountError}
            <span className='close-btn' onClick={() => setAccountError('')}>✖</span>
          </div>
        )}
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
                      {['Image', 'Threads', 'Video'].map((item) => (
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
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
            <path fill="#2D2D2D" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zm-312 8l0 64c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64c0-13.3-10.7-24-24-24s-24 10.7-24 24zm80-96l0 160c0 13.3 10.7 24 24 24s24-10.7 24-24l0-160c0-13.3-10.7-24-24-24s-24 10.7-24 24zm80 64l0 96c0 13.3 10.7 24 24 24s24-10.7 24-24l0-96c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserInputPage;
