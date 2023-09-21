class MessageRepository {
    constructor(dao) {
        this.dao = dao
    }

    async createMessage(user, message) {
        try {
            return this.dao.createMessage(user, message)
        }
        catch (error) {
            throw (error)
        }
    }

    async getMessage() {
        try {
            return this.dao.getMessage()
        }
        catch (error) {
            throw (error)
        }
    }
}

export default MessageRepository