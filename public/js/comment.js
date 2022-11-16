// this is where comment functionality will go

const commentFormHandler = async function (event) {
    event.preventDefault();
    //   stores post and comment info for the request
    const postId = document.querySelector('input[name="post-id"]').value;
    const content = document.querySelector('textarea[name="comment-content"]').value;
    //   post request
    await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
            // might not be right order - will check
            postId,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    //   reloads the page so that the comment shows up after it's posted
    document.location.reload();
};

//   waits for user to submit before adding their comment
document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);