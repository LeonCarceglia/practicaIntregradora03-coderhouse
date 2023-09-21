import ticketsModel from "../../models/ticket.js"

export default class TicketManager{
    constructor(){
    }

    createTicket = (amount, purchaser) =>{
        if (amount > 0){
            return ticketsModel.create({amount, purchaser})
        }
        else{
            return "Error, ticket without value"
        }
    }

}