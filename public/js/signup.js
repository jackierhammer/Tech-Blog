// this is where signup functionality will go

// this function handles user signup requests
const signupFormHandler = async function (event) {
    event.preventDefault();
    //   stores user input from signup form
    // only username and password are required
    const usernameEl = document.querySelector("#username-input-signup");
    const emailEl = document.querySelector("#email-input-signup");
    const passwordEl = document.querySelector("#password-input-signup");
    // post request
    fetch("/api/user", {
        method: "post",
        body: JSON.stringify({
            username: usernameEl.value,
            email: emailEl.value,
            password: passwordEl.value
        }),
        headers: { "Content-Type": "application/json" }
    })
        .then(() => {
            // redirects user to dashboard
            document.location.replace("/dashboard");
        })
        .catch(err => console.log(err));
};

// waits for user to submit to put in the post request
document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler);