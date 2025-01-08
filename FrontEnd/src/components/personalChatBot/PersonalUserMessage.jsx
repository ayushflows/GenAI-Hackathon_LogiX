import React from "react";

export default function PersonalUserMessage({ text }) {
  return (
    <div className="w-full">
      <div className="float-right text-start max-w-[70%] px-[14px] py-[8px] m-1 mr-3 my-2 shadow-md rounded-[20px_20px_1px_20px] bg-[#ffb66e] text-black dosis-prsnlchatbot text-[13px] sm:text-[14px]">{text}</div>
    </div>
  );
}
