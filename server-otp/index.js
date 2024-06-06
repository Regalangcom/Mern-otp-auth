const dotenv = require('dotenv');
dotenv.config();



const mongoose = require("mongoose")
const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))



const LoginUser = require("./routes/user")

app.use("/v1/auth/user" , LoginUser)





mongoose.connect(process.env.MONGODB_SERVER).then(() => {
    
    console.log('mongoose connected');
    app.listen(process.env.PORT , () => {
        console.log(`running on port ${process.env.PORT}`);
    })    
})
.catch(err => console.log(err))
