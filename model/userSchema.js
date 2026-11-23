import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    age: Number,
    gender: String
})

const userModel = mongoose.model("User", userSchema)

export default userModel