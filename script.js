const socket = io("http://localhost:5000")
const messageform = document.getElementById("send-container")
const messagecontainer = document.getElementById("message-container")
const messageinput = document.getElementById("message-input")

const name = prompt("What is your name?")
showMessage("You joined")
socket.emit("new-user", name)

socket.on("chat-message", data => {
    showMessage(`${data.name}: ${data.message}`)
})

socket.on("user-connected", name => {
    showMessage(`${name} connected`)
})

socket.on("user-disconnected", name => {
    showMessage(`${name} disconnected`)
})

messageform.addEventListener("submit", e => {
    e.preventDefault()
    const message = messageinput.value
    showMessage(`You: ${message}`)
    socket.emit("send-chat-message", message)
    messageinput.value = ""
})

function showMessage(message) {
    const messageElement = document.createElement("div")
    messageElement.innerText = message
    messagecontainer.append(messageElement)
}