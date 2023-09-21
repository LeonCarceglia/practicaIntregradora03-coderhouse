import userModel from "../../models/user.js"
import { createHash, isValidPassword } from "../../../utils.js"

export default class UsersManager {
    constructor() {
    }

    getUsers = () => {
        return userModel.find().lean()
    }

    getUser = (id) => {
        return userModel.findById(id).lean()
    }

    createUser = (user) => {
        return userModel.create(user)
    }

    updateUser = (id, user) => {
        return userModel.findByIdAndUpdate(id, user)
    }

    deleteUser = (id) => {
        return userModel.findByIdAndDelete(id)
    }

    existUser = (email) => {
        return userModel.findOne({ email })
    }

    updatePass = async (email, newPass) => {
        const user = await userModel.findOne({ email })
        if (isValidPassword(user, newPass)) {
            return "Error, password are same"
        } else {
            const newPassword = createHash(newPass)
            user.password = newPassword
            await user.save()
            return "User updated"
        }
    }
}