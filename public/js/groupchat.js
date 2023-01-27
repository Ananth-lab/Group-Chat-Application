const form = document.querySelector("#send-message-container");

const chatContainer = document.querySelector(".chat-container");

const sendBtn = document.querySelector(".send-message-btn");

const token = localStorage.getItem("token");

window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:3000/user/get-chat", {headers : {"authorization" : token}})
    .then(res => {
        res.data.chatList.forEach(element => {
            if(localStorage.getItem("userId") == element.userId){
                const msgLeft = document.createElement("div");
                msgLeft.className = "message-left";
                msgLeft.appendChild(document.createTextNode(element.chat));
                chatContainer.append(msgLeft)
            }
            else{
                const msgRight = document.createElement("div");
                msgRight.className = "message-right";
                msgRight.appendChild(document.createTextNode(element.chat));
                chatContainer.append(msgRight)
            }
        });
    })
    .catch(err => console.log(err))
})

sendBtn.addEventListener("click" , (e) => {
    e.preventDefault();
    const msgInp = document.querySelector("#messageInp").value;
    const message = {
        msgInp
    }
    axios.post("http://localhost:3000/user/chat", message, {headers : {"authorization" : token}})
    .then(res => {
        localStorage.setItem("userId", res.data.id)
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
})