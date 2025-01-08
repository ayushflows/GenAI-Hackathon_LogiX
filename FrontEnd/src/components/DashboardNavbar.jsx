import React from "react";
import { useNavigate } from "react-router-dom";

function DashboardNavbar({ setActiveButton, activeButton, onButtonClick }) {
  const navigate = useNavigate();
  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
          <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3L280 88c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 204.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
        </svg>
      ),
    },
    {
      key: "audience",
      label: "Audience",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="30" viewBox="0 0 640 512">
          <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z" />
        </svg>
      ),
    },
    {
      key: "insights",
      label: "Insights",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zm-312 8l0 64c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64c0-13.3-10.7-24-24-24s-24 10.7-24 24zm80-96l0 160c0 13.3 10.7 24 24 24s24-10.7 24-24l0-160c0-13.3-10.7-24-24-24s-24 10.7-24 24zm80 64l0 96c0 13.3 10.7 24 24 24s24-10.7 24-24l0-96c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
        </svg>
      ),
    },
    {
      key: "analyze_again",
      label: "Analyze Again",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
          <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
        </svg>
      ),
    },
    {
      key: "home",
      label: "Home",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 576 512">
          <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full h-[45%] hidden lg:flex flex-col justify-center items-center gap-1 inter-regular">
      {menuItems.map((item) => (
        <button
          key={item.key}
          className={`w-[85%] flex justify-start items-center gap-[6px] py-4 pl-4 text-[15px] font-thin text-gray-300 inter-regular relative ${activeButton === item.key
                     ? 'bg-gradient-to-r from-[rgba(8,9,29,0.2)] via-[rgba(8,9,29,0.10)] to-[rgba(12,8,36,0.05)] backdrop-blur-md border border-[rgba(119,119,119,0.36)] rounded-lg': '' }`}
          onClick={() => {
            if (item.key === "home") {
              navigate("/");
            }else if(item.key === "analyze_again"){
              navigate("/userinput");
            }
            setActiveButton(item.key);
            onButtonClick(item.key);

          }}
          aria-pressed={activeButton === item.key}
        >
          {activeButton === item.key && (
            <div className="absolute right-[1px] top-1/2 transform -translate-y-1/2 h-[80%] w-[6px] bg-orange-500 rounded-full"></div>
          )}
          <div className="w-8">
            {React.cloneElement(item.icon, {
              fill: '#d1d5db',
            })}
          </div>
          <p className="font-semibold">{item.label}</p>
        </button>
      ))}
    </div>
  );
}

export default DashboardNavbar;
