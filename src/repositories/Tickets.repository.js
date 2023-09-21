export default class TicketRepository{
    constructor(dao){
        this.dao = dao
    }

    async createTicket(amount, purchaser){
        try{
            return await this.dao.createTicket(amount, purchaser)
        }
        catch(error){
            throw(error)
        }
    }
}