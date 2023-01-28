const form = document.querySelector("#send-message-container");

const chatContainer = document.querySelector(".chat-container");

const sendBtn = document.querySelector(".send-message-btn");

const token = localStorage.getItem("token");

const currentUserId = localStorage.getItem("userId");

function getMessages() {
    axios.get("http://localhost:3000/user/get-chat", { headers: { "authorization": token } })
      .then(res => {
        chatContainer.innerHTML = '';
        res.data.chatList.forEach(element => {
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
    setInterval(getMessages, 1000);
});
  

sendBtn.addEventListener("click" , (e) => {
    e.preventDefault();
    const msgInp = document.querySelector("#messageInp").value;
    const message = {
        msgInp
    }
    axios.post("http://localhost:3000/user/chat", message, {headers : {"authorization" : token}})
    .then(res => {
      localStorage.setItem("userId", res.data.id);
      getMessages()
      document.querySelector("#messageInp").value = "";
    })
    .catch(err => {
        console.log(err)
    })
})