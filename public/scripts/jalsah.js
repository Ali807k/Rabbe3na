let jalsah = {};

async function getJalsah() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    fetch(`http://localhost:3000/api/jalsaat/${id}`)
    .then(response => response.json())
    .then((data) => {
        jalsah = data;
        loadJalsahDetails();
    })
    .catch(error => console.error(error));
}


function loadJalsahDetails() {
    document.querySelector('#jalsaSerial').textContent = jalsah._id;
    document.querySelector('#description').textContent = jalsah.description;
    document.querySelector('#gameAccess').textContent = jalsah.gameAccess;
    document.querySelector('.jalsah-time').textContent += jalsah.time;
    document.getElementById('google-maps').setAttribute("src", `https://www.google.com/maps/embed/v1/place?key=AIzaSyA1ZdB--UrF6JRqP7PadNiQ4B0BBAvWRMA&q=${jalsah.location}`);
    for (let i = 0; i < 4; i++) {
        if (jalsah.players[i] == null) {
            document.querySelector(`.player${i}`).textContent = "Waiting for a player...";
        } else {
            document.querySelector(`.player${i}`).textContent = jalsah.players[i]
        };
    }
    
    // Establish a connection to the Socket.IO server
    const socket = io();

    // Fetch chat history
    fetch(`/api/chats/history/${jalsah._id}`)
        .then(response => response.json())
        .then(messages => {
            messages.forEach(message => {
                const timeOfChat = new Date(message.time);
                const formattedTime = `${timeOfChat.getHours()}: ${timeOfChat.getMinutes()}`
                const chatElement = document.createElement("div");
                chatElement.classList.add("message");
                chatElement.innerHTML = `
                    <div class="message-sender">You:</div>
                    <div class="message-text">${message.message}</div>
                    <div class="message-timestamp">${formattedTime}</div>
                `;
                const messagesContainer = document.querySelector(".chat-messages");
                messagesContainer.appendChild(chatElement);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            });
        })
        .catch(error => console.error(error));

    // Listen for new chat messages from the server
    socket.on('chat message', (msg) => {
        const timeOfChat = new Date(msg.time);
        const formattedTime = `${timeOfChat.getHours()}: ${timeOfChat.getMinutes()}`
        const chatElement = document.createElement("div");
        chatElement.classList.add("message");
        chatElement.innerHTML = `
            <div class="message-sender">You:</div>
            <div class="message-text">${msg.message}</div>
            <div class="message-timestamp">${formattedTime}</div>
        `;
        const messagesContainer = document.querySelector(".chat-messages");
        messagesContainer.appendChild(chatElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });

    document.querySelector(".send-button").addEventListener('click', (e) => {
        e.preventDefault();
        const chatInput = document.querySelector(".chat-input");
        // Prepare the chat message
        const chat = chatInput.value;
        if (chat === "") {
            return;
        }
        const message = {
            user: sessionStorage.getItem("username"),
            message: chat,
            jalsahId: jalsah._id,
        }
        socket.emit('chat message', message)
        chatInput.value = "";
    });
}  

// EVENTS LISTENERS
document.addEventListener('DOMContentLoaded', getJalsah);