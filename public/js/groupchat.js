const form = document.querySelector("#send-message-container");

const chatContainer = document.querySelector(".chat-container");

const sendBtn = document.querySelector(".send-message-btn");

const token = localStorage.getItem("token")

sendBtn.addEventListener("click" , (e) => {
    e.preventDefault();
    const msgInp = document.querySelector("#messageInp").value;
    const message = {
        msgInp
    }
    axios.post("http://localhost:3000/user/chat", message, {headers : {"authorization" : token}})
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
})