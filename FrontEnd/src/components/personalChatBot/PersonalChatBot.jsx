import React, { useState } from 'react'
import chatbotImg from "../../assets/chatbot.gif"
import ChatbotBox from './ChatbotBox';
import chatbotStaticImg from "../../assets/chatbotstatic.png";
function PersonalChatBot() {  
    const [chatBotOpen, setChatbotOpen] = useState(false);

  return (
    <div className='fixed bottom-5 right-5 text-black flex flex-col-reverse sm:flex-row-reverse justify-end items-end z-[200]'>
    <div className='object-fit w-[60px] sm:w-[90px] cursor-pointer z-[300] rounded-full overflow-hidden' onClick={()=>{setChatbotOpen(!chatBotOpen)}}>
    <img className='hover:scale-110 duration-200 ease-in-out' src={chatBotOpen ? chatbotStaticImg : chatbotImg} />
    </div>

    {chatBotOpen && 
    <ChatbotBox setChatbotOpen={setChatbotOpen} />
    }

    </div>
  )
}

export default PersonalChatBot