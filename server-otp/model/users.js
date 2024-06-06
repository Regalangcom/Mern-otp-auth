const mongoose = require('mongoose')
const Schema = mongoose.Schema


const usersDatas =  new Schema({
    email : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    },
    otp : {
        type : String
    }
}, {
    timestamps : true,

})  


const dataUserUses = mongoose.model('datas' , usersDatas)

module.exports = dataUserUses