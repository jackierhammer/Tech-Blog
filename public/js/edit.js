// this is where comment editing functionality will go

// function handles editing existing posts
const editFormHandler = async function (event) {
    event.preventDefault();
    // stores the post information in variables to use in request
    const titleEl = document.getElementById('post-title');
    const contentEl = document.getElementById('post-content');
    const postId = document.getElementById('post-id')
    // put request
    fetch("/api/post/" + postId.value, {
        method: "put",
        body: JSON.stringify({
            title: titleEl.value,
            content: contentEl.value
        }),
        headers: { "Content-Type": "application/json" }
    })
        .then(function () {
            // redirects user to the dashboard
            document.location.replace("/dashboard");
        })
        .catch(err => console.log(err))
}

// waits for user to submit to update the information
document
    .querySelector("#edit-post-form")
    .addEventListener("submit", editFormHandler);