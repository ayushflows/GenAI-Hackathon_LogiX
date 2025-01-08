import React, { useEffect, useRef } from "react";

export default function PersonalMessages({ messages, botScroll }) {
  const el = useRef(null);
  useEffect(() => {
    el.current.scrollIntoView({ block: "end", behavior: "smooth" });
  },[messages, botScroll]);
  
  return (
    <div className="w-full h-[380px] md:h-[400px] overflow-auto flex flex-col pb-2 pt-4 scrollbar-hide">
      {messages}
      <div id={"el"} ref={el} />
    </div>
  );
}
