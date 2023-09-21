import { fileURLToPath } from "url"
import { dirname } from "path"
import bcrypt from "bcrypt"
import { messageService } from "./services/index.js"
import { logger } from "./config/logger.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password)

const initializeSocket = (io) => {
  io.on("connection", socket => {
    logger.info("New client coneccted")
    socket.on("message", async (data) => {
      const newMessage = await messageService.createMessage(data.user, data.message)
      newMessage.save()
        .then(() => messageService.getMessage())
        .then(messages => {
          io.emit("messageLogs", messages)
        })
    })
  })
}


export {
  __dirname,
  initializeSocket
}