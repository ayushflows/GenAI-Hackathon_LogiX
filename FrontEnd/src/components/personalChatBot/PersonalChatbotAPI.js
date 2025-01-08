const serverHit= import.meta.env.VITE_APP_SERVER_LINK;

const PersonalChatbotAPI = {
    GetChatbotResponse: async message => {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          if (message === "hi") resolve("Hi! Welcome to the Social Analytics, How can I assist you today?");
          else resolve("echo : " + message);
        }, 2000);
      });
    },

    GetTextFromQuestion: async (message) =>{
      try {
        const response = await fetch(serverHit+ '/data/chat/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({chat: message}),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        // console.log("recieved chat", data);
        
        return data.message;
  
      } catch (error) {
        // setTimeout(() => {
        //   window.location.reload();
        // }, 4000);
        console.log("error", error);
        return "Sorry, we can't answer this question at the moment, please try again later!";
      }

    //   try {
    //     const mockApiCall = (msg) =>
    //       new Promise((resolve) => {
    //         setTimeout(() => {
    //           resolve({ answer: msg });
    //         }, 1000);
    //       });
    
    //     const response = await mockApiCall(message);
    //     return response.answer;
    //   } catch (error) {
    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 4000);
    
    //     return "Sorry, we can't answer this question at the moment, please try again later!";
    //   }
    }
  };
  
  export default PersonalChatbotAPI;
  