const loginBtn = document.querySelector("#login-btn");
const errorPara = document.querySelector("#error");

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email  = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const userCreds = {
        email,
        password
    };
    axios.post("http://localhost:3000/user/login", userCreds)
    .then((res) => {
        alert(res.data.message);
        window.location = "./groupchat.html"
    })
    .catch((err) => {
        errorPara.textContent = err.response.data.message
    })
})