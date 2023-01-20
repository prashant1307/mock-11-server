const express = require("express")
const mongoose = require("mongoose")
const UserModel = require("./models/User.model")
const jwt=require("jsonwebtoken")
// const PORT = process.env.PORT || 8080;
const cors=require("cors");


const app = express()
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//Routes
app.post("/signup", async(req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    //save user to db
    const user=new UserModel({email,password})
    await user.save()
    res.send("User created successfully")
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email,password})
    if(!user){
        return res.send("invalid credential")
    }
    //we generate token
    const token=jwt.sign({id:user.id,email:user.email},
        "SECRET1234",
        {
            expiresIn:"5 days"
        }
        )
        
    res.send({message:"login success",token})
})



mongoose.connect("mongodb+srv://prashant:qwerty123@cluster0.60vk8lg.mongodb.net/?retryWrites=true&w=majority").then(() => {
    app.listen(8080, () => { console.log('server started on port 8080') })
})
