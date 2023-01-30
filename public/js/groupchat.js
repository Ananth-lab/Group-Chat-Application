const form = document.querySelector("#send-message-container");

const chatContainer = document.querySelector(".chat-container");

const sendBtn = document.querySelector(".send-message-btn");

const token = localStorage.getItem("token");

const currentUserId = localStorage.getItem("userId");

const addGroup = document.querySelector(".add-group");

const showGroup = document.querySelector(".show-groups")

let localChat = [];

let lastMsgId;

function getMessages(groupId) {
  // let messages = JSON.parse(localStorage.getItem("messages"));
  // if (messages == undefined || messages.length == 0) {
  //   lastMsgId = 0;
  // }
  // else {
  //   lastMsgId = messages[messages.length - 1].id;
  // }
  axios.get(`http://localhost:3000/user/get-chat?userId=${currentUserId}&groupId=${groupId}`, { headers: { "authorization": token } })
    .then(res => {
      // const resArray = res.data.chatList;
      // if (messages) {
      //   localChat = messages.concat(resArray)
      // }
      // else {
      //   localChat = localChat.concat(resArray)
      // }

      // localChat = localChat.slice(localChat.length - 10);

      // const localStorageMessages = JSON.stringify(localChat);
      // localStorage.setItem('messages', localStorageMessages);
      chatContainer.innerHTML = '';
      res.data.chatList.forEach(element => {
        console.log(element)
        const date = new Date(element.createdAt);
        const timeString = date.toLocaleTimeString();
        if (currentUserId == element.users[0].id) {
          const msgRight = document.createElement("div");
          msgRight.className = "message-right";
          const nameSpan = document.createElement("p");
          nameSpan.className = "name-span";
          nameSpan.append(document.createTextNode(element.users[0].name))
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
          nameSpan.append(document.createTextNode(element.users[0].name))
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

function getGroups() {
  axios.get(`http://localhost:3000/user/get-group?userId=${currentUserId}`, { headers: { "authorization": token } })
    .then(res => {
      res.data.groups.forEach(group => {
        const groupContainer = document.querySelector(".group-container");
        const button = document.createElement("button");
        button.className = "group-list";
        button.append(document.createTextNode(group.groupname));
        groupContainer.append(button);
        button.addEventListener("click", function () {
          localStorage.setItem("currentGroup", group.groupid)
          getMessages(group.groupid)
        });
      });
    })
    .catch(err => {
      console.log(err)
    })
}

window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  //setInterval(getMessages, 1000);
  getGroups();

});

addGroup.addEventListener("click", (e) => {
  e.preventDefault();
  let groupname = window.prompt("Enter group name: ");
  let groupdesc = window.prompt("Enter group description: ");
  if (groupname != null && groupdesc != null) {
    const groupDetails = {
      groupname,
      groupdesc
    }
    axios.post(`http://localhost:3000/user/add-group?userId=${currentUserId}`, groupDetails, { headers: { "authorization": token } })
      .then(res => {
        alert(res.data.message);
        location.reload();
      })
      .catch(err => {
        alert("something went wrong")
      })
  }
})

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const msgInp = document.querySelector("#messageInp").value;
  const message = {
    msgInp
  }
  axios.post(`http://localhost:3000/user/chat?groupid=${localStorage.getItem("currentGroup")}`, message, { headers: { "authorization": token } })
    .then(res => {
      document.querySelector("#messageInp").value = "";
      getMessages(localStorage.getItem("currentGroup"))
    })
    .catch(err => {
      console.log(err)
    })
});

let isGroupShowing = false;

showGroup.addEventListener("click", (e) => {
  e.preventDefault();
  if (isGroupShowing) {
    document.querySelector("ul").style.display = "none";
    showGroup.textContent = "Show Groups";
    isGroupShowing = false;
  } else {
    axios.get(`http://localhost:3000/user/get-all-groups`, { headers: { "authorization": token } })
      .then(res => {
        const ul = document.querySelector("ul");
        ul.style.display = "block";
        ul.innerHTML = "";  
        res.data.groups.forEach(group => {
          const li = document.createElement("li");
          li.className = "show-group-element";
          li.appendChild(document.createTextNode(group.groupname));
          li.addEventListener("click", () => {
            // join group logic
            axios.post(`http://localhost:3000/user/join-group?groupid=${group.groupid}&userid=${currentUserId}`, {}, { headers: { "authorization": token } })
              .then(res => {
                alert(res.data.message);
                location.reload();
              })
              .catch(err => {
                
              })
          });
          ul.append(li)
        })
        showGroup.textContent = "Hide Groups";
        isGroupShowing = true;
      })
      .catch(err => {
  
      })
  }
});
