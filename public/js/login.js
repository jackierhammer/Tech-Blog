// this is where login functionality will go

// function handles post request 
const loginFormHandler = async function (event) {
    event.preventDefault();
    // stores user input for the request
    const usernameEl = document.querySelector("#username-input-login");
    const passwordEl = document.querySelector("#password-input-login");
    // api post request
    fetch("/api/user/login", {
        method: "post",
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value
        }),
        headers: { "Content-Type": "application/json" }
    })
        .then(() => {
            // navigates to the site dashboard
            document.location.replace("/dashboard");
        })
        .catch(err => console.log(err));
};

// waits for user to submit to process request
document
    .querySelector("#login-form")
    .addEventListener("submit", loginFormHandler);