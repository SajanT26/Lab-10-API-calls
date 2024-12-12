const fetchBtn = document.getElementById('fetch-btn');
const xhrBtn = document.getElementById('xhr-btn');
const dataContainer = document.getElementById('data-container');
const postForm = document.getElementById('post-form');
const postBtn = document.getElementById('post-btn');
const putForm = document.getElementById('put-form');
const putBtn = document.getElementById('put-btn');
const errorContainer = document.getElementById('error-container');
const successContainer = document.getElementById('success-container');

fetchBtn.addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            dataContainer.innerText = `Title: ${data.title}\nBody: ${data.body}`;
        })
        .catch(error => {
            errorContainer.innerText = `Error: ${error.message}`;
        });
});

xhrBtn.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            dataContainer.innerText = `Title: ${data.title}\nBody: ${data.body}`;
        } else {
            errorContainer.innerText = `Error: ${xhr.statusText}`;
        }
    };
    xhr.onerror = function() {
        errorContainer.innerText = 'Error: Unable to load';
    };
    xhr.send();
});

postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const postTitle = document.getElementById('post-title').value;
    const postBody = document.getElementById('post-body').value;
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: postTitle, body: postBody })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            successContainer.innerText = `Post created successfully ID: ${data.id}`;
        })
        .catch(error => {
            errorContainer.innerText = `Error: ${error.message}`;
        });
});

putForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const putId = document.getElementById('put-id').value;
    const putTitle = document.getElementById('put-title').value;
    const putBody = document.getElementById('put-body').value;
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${putId}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            successContainer.innerText = `Post updated successfully ID: ${data.id}`;
        } else {
            errorContainer.innerText = `Error: ${xhr.statusText}`;
        }
    };
    xhr.onerror = function() {
        errorContainer.innerText = 'Error: Unable to update';
    };
    xhr.send(JSON.stringify({ title: putTitle, body: putBody }));
});

fetchBtn.addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            dataContainer.innerText = `Title: ${data.title}\nBody: ${data.body}`;
        })
        .catch(error => {
            if (error.message.includes('NetworkError')) {
                errorContainer.innerText = 'Error: Unable to connect';
            } else if (error.message.includes('HTTP error')) {
                errorContainer.innerText = `Error: ${error.message}`;
            } else {
                errorContainer.innerText = 'Error: Unknown';
            }
        });
});

xhrBtn.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            dataContainer.innerText = `Title: ${data.title}\nBody: ${data.body}`;
        } else {
            if (xhr.status === 404) {
                errorContainer.innerText = 'Error: not found';
            } else {
                errorContainer.innerText = `Error: ${xhr.statusText}`;
            }
        }
    };
    xhr.onerror = function() {
        errorContainer.innerText = 'Error: Unable to load';
    };
    xhr.send();
});

const fetchAllBtn = document.getElementById('fetch-all-btn');
fetchAllBtn.addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const posts = data.map(post => `Title: ${post.title}\nBody: ${post.body}\n\n`);
            dataContainer.innerText = posts.join('');
        })
        .catch(error => {
            errorContainer.innerText = `Error ${error.message}`;
        });
});