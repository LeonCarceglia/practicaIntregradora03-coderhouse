import mongoose from "mongoose"

const ticketsCollection = "tickets"
const ticketsSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
        default: () =>  Math.floor(100000 + Math.random() * 900000)
    },
    purchase_datetime: {
        type : Date,
        default: Date.now(),
    },
    amount: Number,
    purchaser: String
})

const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema)
export default ticketsModel