// this is where logout functionality will go

// this function handles logging user out request
function logout() {
    // post request
    fetch("/api/user/logout", {
        method: "post",
        headers: { "Content-Type": "application/json" }
    })
        .then(() => {
            // redirects to homepage
            document.location.replace("/");
        })
        .catch(err => console.log(err));
}

// waits for user to click on logout before logging out
document
    .querySelector("#logout-link")
    .addEventListener("click", logout);