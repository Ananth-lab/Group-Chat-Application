const form = document.querySelector("#send-message-container");

const chatContainer = document.querySelector(".chat-container");

const sendBtn = document.querySelector(".send-message-btn");

const token = localStorage.getItem("token");

const currentUserId = localStorage.getItem("userId");

let localChat = [];

let lastMsgId;

function getMessages() {
  let messages = JSON.parse(localStorage.getItem("messages"));
  if(messages == undefined || messages.length == 0){
    lastMsgId = 0;
  }
  else {
    lastMsgId = messages[messages.length - 1].id;
  }
    axios.get(`http://localhost:3000/user/get-chat?lastmsgid=${lastMsgId}`, { headers: { "authorization": token } })
      .then(res => {
        const resArray = res.data.chatList;

        if(messages){
          localChat = messages.concat(resArray)
        }
        else {
          localChat = localChat.concat(resArray)
        }

        localChat = localChat.slice(localChat.legth - 10);

        const localStorageMessages = JSON.stringify(localChat);
        localStorage.setItem('messages', localStorageMessages);

        chatContainer.innerHTML = '';
        localChat.forEach(element => {
          const date = new Date(element.createdAt);
          const timeString = date.toLocaleTimeString(); 
          if (currentUserId == element.userId) {
            const msgRight = document.createElement("div");
            msgRight.className = "message-right";
            const nameSpan = document.createElement("p");
            nameSpan.className = "name-span";
            nameSpan.append(document.createTextNode(element.user.name))
            msgRight.append(nameSpan)
            const timeSpan = document.createElement("p");
            timeSpan.className = "time-span";
            timeSpan.append(document.createTextNode(timeString));
            msgRight.appendChild(document.createTextNode(element.chat));
            msgRight.append(timeSpan)
            chatContainer.append(msgRight)
          } else {
            const msgLeft = document.createElement("div");
            msgLeft.className = "message-left";
            const nameSpan = document.createElement("p");
            nameSpan.className = "name-span";
            nameSpan.append(document.createTextNode(element.user.name))
            msgLeft.append(nameSpan)
            const timeSpan = document.createElement("p");
            timeSpan.className = "time-span";
            timeSpan.append(document.createTextNode(timeString));
            msgLeft.appendChild(document.createTextNode(element.chat));
            msgLeft.append(timeSpan)
            chatContainer.append(msgLeft)
          }
        });
      })
      .catch(err => console.log(err))
  }


window.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    //setInterval(getMessages, 1000);
    getMessages();

});
  

sendBtn.addEventListener("click" , (e) => {
    e.preventDefault();
    const msgInp = document.querySelector("#messageInp").value;
    const message = {
        msgInp
    }
    axios.post("http://localhost:3000/user/chat", message, {headers : {"authorization" : token}})
    .then(res => {
      getMessages();
      document.querySelector("#messageInp").value = "";
    })
    .catch(err => {
        console.log(err)
    })
})