import UserDTO from "../DTOs/User.dto.js"

class UserRepository {
    constructor(dao) {
        this.dao = dao
    }

    async getAll() {
        try {
            return await this.dao.getUsers()
        }
        catch (error) {
            throw error
        }
    }

    getUser(id) {
        try {
            return new UserDTO(this.dao.getUser(id))
        }
        catch (error) {
            throw (error)
        }
    }

    async createUser(user) {
        try {
            return await this.dao.createUser(user)
        }
        catch (error) {
            throw (error)
        }
    }

    async updateUser(id, user) {
        try {
            return await this.dao.updateUser(id, user)
        }
        catch (error) {
            throw (error)
        }
    }

    async deleteUser(id) {
        try {
            return await this.dao.deleteUser(id)
        }
        catch (error) {
            throw (error)
        }
    }

    getCurrentUser(user) {
        try {
            const newUser = new UserDTO(user)
            return newUser
        }
        catch (error) {
            throw (error)
        }
    }

    async existUser(email) {
        try {
            return this.dao.existUser(email)
        }
        catch (error) {
            throw (error)
        }
    }

    async updatePass(email, newPass) {
        try {
            return this.dao.updatePass(email, newPass)
        }
        catch (error) {
            throw (error)
        }
    }
}

export default UserRepository