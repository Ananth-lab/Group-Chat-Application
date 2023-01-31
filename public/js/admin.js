const showMembers = document.querySelector(".container-main-admin--remove");

const pendingMembers = document.querySelector(".container-main-admin--approve");

const token = localStorage.getItem("token");

const currentUserId = localStorage.getItem("userId");

const currentGroupId = localStorage.getItem("currentGroup")

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
                        axios.delete(`http://localhost:3000/admin/remove-user?userId=${user.id}&groupId=${currentGroupId}`, {headers : {"authorization" : token}})
                        .then(res => {
                            alert("User removed");
                            location.reload();
                        })
                    })
                }
            });
        })
        .catch(err => {

        })
})