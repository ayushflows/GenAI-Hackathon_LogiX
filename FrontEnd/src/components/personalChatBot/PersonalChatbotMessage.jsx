import React, { useState, useEffect, useRef } from "react";

export default function PersonalChatbotMessage({ fetchMessage,updateScroll }) {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const hasFetched = useRef(false);

  useEffect(() => {
    async function loadMessage() {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const msg = await fetchMessage();
        setMessage(msg);
      } catch (error) {
        setMessage("sorry, there is an error in fetching the message, please try again")
      } finally {
        setLoading(false);
        updateScroll();
      }
    }

    loadMessage();
  }, [fetchMessage]);

  return (
    <div className="w-full">
      <div className="float-left max-w-[70%] text-start px-[12px] text-[13px] sm:text-[14px] py-[8px] m-1 ml-3 rounded-[20px_20px_20px_1px] shadow-md bg-[#22252D] text-white min-w-[40px] dosis-prsnlchatbot"
              style={{
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
        }}>
        {isLoading ? (
          <div className="dot-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        ) : (
          message
        )}
      </div>
    </div>
  );
}
