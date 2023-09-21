import mongoose from "mongoose"

const userCollection = "Users"

const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{
        type: String,
        unique: true
    },
    password: String,
    age: Number,
    cart:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "carts"
        },
    role:{
        type: String,
        enum: ["user", "admin", "premium"],
        default: "user"
    }
})

const userModel = mongoose.model(userCollection,userSchema)

export default userModel