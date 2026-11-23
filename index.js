import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import User from "./model/userSchema.js"

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 6500
const ConnectDB = async ()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI);
        console.log("database is connected");
        
    } catch (error) {
        console.log(error)
    }
}
// const userData = {
//             name : "Kamran",
//             username: "propertilum",
//             email: "mkamran3787@gmail.com",
//             password: "helloworld",
//             age: 18,
//             gender: "Male"
//         }

app.get("/", (req, res)=>{
    res.status(200).json({
        status: true,
        message: "Hello from the Server"
    })
    
})

app.get("/health", (req, res)=>{
    res.status(200).json({
        status: true,
        message: "Server Health is Good"
    })
    
})

app.post("/users", async (req, res)=>{
    try {
        const userData = req.body;

        const user = new User(userData)

        if(user){
          await user.save()
        }
        
        res.status(200).json({
            status: true,
            message: "user added successfully"
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        })
    }
})

app.get("/users", async (req, res)=>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

app.listen(PORT, ()=>{
    console.log(`server is listening at PORT ${PORT}`);
    ConnectDB()
    
})

