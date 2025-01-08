import React from "react";
import logoImg from "../../assets/logix_logo.png"

export default function ChatbotHeader({setChatbotOpen}) {
  return <div className="pb-3 pt-2 pl-4 text-center text-[#fff] max-h-[50px] text-[17px] shadow-sm bg-zinc-600 poppins-semibold flex items-center">
          <div className="flex items-center w-[80%]">
          <img className="w-[30px] sm:w-[35px] invert contrast-200" src={logoImg} alt="logo"/>
          <h1 className="ml-3 text-[16px] sm:text-lg">&nbsp;Insight Engine</h1>
          </div>
          <div className="w-[20%] h-full flex justify-end cursor-pointer pr-3" onClick={()=>setChatbotOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="15" viewBox="0 0 384 512">
          <path fill="#ffffff" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          </div>
  </div>;
}
