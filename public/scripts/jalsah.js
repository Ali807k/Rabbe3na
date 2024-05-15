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
    window.top.document.title = jalsah.user + "'s Jalsah";
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
    setUpChatRoom(jalsah._id);
    determineButton();
}

function determineButton() {
    const button = document.querySelector(".leave-btn"); 
    if (!sessionStorage.getItem("username")) {
        button.textContent = "You need to log in";
        button.style.filter = "saturate(0.5)";
        return;
    }  
    button.style.cursor = "pointer";
    const players = jalsah.players;
    const currUser = sessionStorage.getItem("username");
    if (players.find((player) => (player === currUser))) {
        button.textContent = "Leave";
        button.addEventListener('click', async (e) => {
            // Show a confirmation dialog with SweetAlert
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: `You will leave ${jalsah.user}'s jalsah!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, leave!'
            });
            // If the user cancelled 
            if (!result.isConfirmed) {
                return;
            }
            // check if user is leader or just a player
            if (currUser === jalsah.user) {
                fetch(`/api/jalsaat/deleteJalsah/${jalsah._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => {
                    if (response.ok) {
                        Swal.fire('Deleted!', 'Jalsah has been deleted.', 'success')
                        setTimeout(() => {
                            window.location.href = "/sessions";
                        }, 2000)
                    } else {
                        console.error(response.message);
                        Swal.fire('Failed!', 'Failed to delete the jalsah: ' + response.message, 'error');
                    }
                })
            } else {
                fetch(`/api/jalsaat/leaveJalsah/${jalsah._id}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ currUser }),
                })
                .then(response => response.json())
                .then(() => {
                    window.location.href = "/sessions";
                })
            }
        });
        return;
    } 
    button.textContent = "Join";
    button.style.backgroundColor = "#8bf176";
    button.addEventListener('click', async (e) => {
        if (jalsah.players.length >= 4) {
            Swal.fire('Failed!', "This jalsah reached its maximum capacity", 'error');
            return;
        }
        const result = await Swal.fire({
            title: 'Do you want to join this jalsah?',
            text: 'Confirm your action',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, join it!'
        });
        // If the user cancelled 
        if (!result.isConfirmed) {
            return;
        }

        fetch(`/api/jalsaat/joinJalsah/${jalsah._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currUser })
        })
        .then(response => {
            if (response.ok) {
                console.log(response.message);
                Swal.fire('Joined!', 'You have successfully joined the jalsah.', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 2000)
            } else {
                console.error(response.message);
                Swal.fire('Failed!', 'Failed to join the jalsah: ' + response.message, 'error');
            }
        })
    });
} 

function setUpChatRoom(id) {
    // Establish a connection to the Socket.IO server
    const socket = io();

    // Fetch chat history
    fetch(`/api/chats/history/${id}`)
        .then(response => response.json())
        .then(messages => {
            messages.forEach(message => {
                const timeOfChat = new Date(message.time);
                const formattedTime = `${timeOfChat.getHours()}: ${timeOfChat.getMinutes()}`
                const chatElement = document.createElement("div");
                chatElement.classList.add("message");
                chatElement.innerHTML = `
                    <div class="message-sender">${(message.user === sessionStorage.getItem("username"))? "You": message.user}:</div>
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
    socket.on('chat message', (message) => {
        const timeOfChat = new Date(message.time);
        const formattedTime = `${timeOfChat.getHours()}: ${timeOfChat.getMinutes()}`
        const chatElement = document.createElement("div");
        chatElement.classList.add("message");
        chatElement.innerHTML = `
            <div class="message-sender">${(message.user === sessionStorage.getItem("username"))? "You": message.user}:</div>
            <div class="message-text">${message.message}</div>
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