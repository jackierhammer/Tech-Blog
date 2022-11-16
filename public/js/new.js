// this is where new post making functionality will go

// function handles new post post request
async function newFormHandler(event) {
    event.preventDefault();
    //   stores the post's title and content in variables
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('input[name="content"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    //   redirects user to dashboard after posting
    document.location.replace('/dashboard');
};

// waits for user to submit before processing the request
document
    .querySelector('#new-post-form')
    .addEventListener('submit', newFormHandler);