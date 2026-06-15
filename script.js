const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');

const botResponses = [
    "Hello! How can I help you today? 😊",
    "That sounds interesting! Tell me more.",
    "I'm just a frontend bot, but I'm doing my best! 🚀",
    "Haha, nice! What else is on your mind?",
    "Can you clarify that for me? 🤔",
    "Awesome! Let's keep building cool projects."
];

let messageHistory = JSON.parse(localStorage.getItem('chat_history')) || [];

window.addEventListener('DOMContentLoaded', () => {
    if (messageHistory.length === 0) {
        appendMessage('received', "Hi there! I'm your local chatbot. Type a message to start chatting!", new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    } else {
        messageHistory.forEach(msg => {
            appendMessage(msg.type, msg.text, msg.time);
        });
    }
    scrollToBottom();
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const messageText = messageInput.value.trim();
    if (!messageText) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    appendMessage('sent', messageText, timeString);
    saveMessage('sent', messageText, timeString);

    messageInput.value = '';
    scrollToBottom();

    setTimeout(() => {
        triggerBotResponse();
    }, 1000);
});

function appendMessage(type, text, time) {
    const messageBubble = document.createElement('div');
    messageBubble.classList.add('message', type);

    const textNode = document.createTextNode(text);
    const textContainer = document.createElement('span');
    textContainer.appendChild(textNode);
    
    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.innerText = time;

    messageBubble.appendChild(textContainer);
    messageBubble.appendChild(timestamp);

    chatMessages.appendChild(messageBubble);
}

function saveMessage(type, text, time) {
    messageHistory.push({ type, text, time });
    localStorage.setItem('chat_history', JSON.stringify(messageHistory));
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simulated Chatbot Logic
function triggerBotResponse() {
    const randomReply = botResponses[Math.floor(Math.random() * botResponses.length)];
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    appendMessage('received', randomReply, timeString);
    saveMessage('received', randomReply, timeString);
    scrollToBottom();
}