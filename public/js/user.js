const subBtn = document.querySelector("#signUp-btn");

subBtn.addEventListener("click", async (e) =>{
    e.preventDefault();
    const username = document.querySelector("#uname").value;
    const phonenumber  = document.querySelector("#cnumber").value;
    const email  = document.querySelector("#email").value;
    const password  = document.querySelector("#password").value;
    const userDetails = {
        username,
        phonenumber,
        email,
        password
    };
    axios.post("http://localhost:3000/user/signin", userDetails)
    .then(res => {
        alert("Signin suucessful")
    })
    .catch(() => {
        alert("user already exists")
    })
})