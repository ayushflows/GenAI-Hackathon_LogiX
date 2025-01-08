import React, { useState, useEffect } from "react";
import PersonalChatbotAPI from "./PersonalChatbotAPI";
import "./chatbot.css";
import PersonalChatbotMessage from "./PersonalChatbotMessage";
import PersonalUserMessage from "./PersonalUserMessage";
import ChatbotHeader from "./ChatbotHeader";
import PersonalInput from "./PersonalInput";
import PersonalMessages from "./PersonalMessages";

function ChatbotBox({setChatbotOpen}) {
  const [messages, setMessages] = useState([]);
  const [botScroll, setBotScroll] = useState(false);

  useEffect(() => {
    async function loadWelcomeMessage() {
      setMessages([
        <PersonalChatbotMessage
          key="0"
          fetchMessage={async () => await PersonalChatbotAPI.GetChatbotResponse("hi")}
        />
      ]);
    }
    loadWelcomeMessage();
  }, []);

  const send = async text => {
    setBotScroll(false);
    const updateScroll = ()=>{
      setBotScroll(true)
    }
    const newMessages = messages.concat(
      <PersonalUserMessage key={messages.length + 1} text={text} />,
      <PersonalChatbotMessage
        key={messages.length + 2}
        fetchMessage={async () => await PersonalChatbotAPI.GetTextFromQuestion(text)} updateScroll={updateScroll}
      />
    );
    setMessages(newMessages);
  };

  return (
    <div className="rounded-lg bg-[#f5f8fb] text-center flex flex-col w-[90vw] sm:w-[480px] overflow-hidden -translate-y-3 md:-translate-y-10 md:translate-x-4 custom-shadow">
      <ChatbotHeader setChatbotOpen={setChatbotOpen} />
      <PersonalMessages messages={messages} botScroll={botScroll}  />
      <PersonalInput onSend={send} />
    </div>
  );
}


export default ChatbotBox