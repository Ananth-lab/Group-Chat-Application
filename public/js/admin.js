const showMembers = document.querySelector(".container-main-admin--remove");

const pendingMembers = document.querySelector(".container-main-admin--approve");

const token = localStorage.getItem("token");

const currentUserId = localStorage.getItem("userId");

const currentGroupId = localStorage.getItem("currentGroup");

const addUserBtn = document.querySelector(".sub-button");

const deleteBtn = document.querySelector(".delete-group");


deleteBtn.addEventListener("click" , (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3000/admin/delete-group?groupid=${currentGroupId}`, {}, {headers : {"authorization" : token}})
    .then(res => {
        alert(res.data.message);
        window.location = "./groupchat.html"
    })
    .catch(err => {
        console.log(err)
    })
})

window.addEventListener("DOMContentLoaded", (e) => {
    axios.get(`http://localhost:3000/admin/get-members?userId=${currentUserId}&groupId=${currentGroupId}`, { headers: { "authorization": token } })
        .then(res => {
            const memberContainer = document.querySelector(".member-container");
            res.data.users.forEach(user => {
                if (user.id == currentUserId) {
                    const li = document.createElement("li");
                    li.className = "member-container-list";
                    li.appendChild(document.createTextNode(user.name));
                    memberContainer.append(li)
                }
                else {
                    const li = document.createElement("li");
                    li.className = "member-container-list";
                    li.appendChild(document.createTextNode(user.name));
                    const btn = document.createElement("button");
                    btn.className = "member-container-btn"
                    btn.appendChild(document.createTextNode("X"));
                    li.append(btn)
                    memberContainer.append(li);
                    btn.addEventListener("click", (e) => {
                        axios.delete(`http://localhost:3000/admin/remove-user?userId=${user.id}&groupId=${currentGroupId}`, { headers: { "authorization": token } })
                            .then(res => {
                                alert("User removed");
                                location.reload();
                            })
                    })
                }
            });
        })
        .catch(err => {
            console.log(err)
        })
})


addUserBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const details = {
        uname : document.querySelector(".name").value,
        uemail : document.querySelector(".email").value,
        group : document.querySelector(".groupname").value
    }
    axios.post(`http://localhost:3000/admin/join-group`,details, { headers: { "authorization": token } })
        .then(res => {
            alert(res.data.message);
            location.reload();
        })
        .catch(err => {
            alert(err.response.data.message);
        })
});