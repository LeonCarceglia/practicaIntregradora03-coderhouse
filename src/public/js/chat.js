const socket = io()
const chatBox = document.getElementById("messageInput")
const usernameInput = document.getElementById("usernameInput")
const messageLogs = document.getElementById("messageLogs")

document.getElementById("sendButton").addEventListener("click", () => {
  sendMessage()
})

chatBox.addEventListener("keyup", evt => {
  if (evt.key === "Enter") {
    sendMessage()
    evt.preventDefault()
  }
})

function sendMessage() {
  const user = usernameInput.value.trim()
  const message = chatBox.value.trim()

  if (user.length > 0 && message.length > 0) {
    socket.emit("message", { user, message })
    chatBox.value = ""
  }
}

socket.on("messageLogs", data => {
  let messages = ""
  data.forEach(message => {
    messages += `${message.user} dice: ${message.message}<br>`
  })
  messageLogs.innerHTML = messages
})
