import messageModel from "../../models/message.js"

export default class MessageManager {
    constructor() {
    }

    createMessage = (user, message) => {
        return messageModel.create({user, message})
    }

    getMessage = () => {
        return messageModel.find()
    }
}