const express = require('express');
const route = express.Router()

const { loginWithOTP , verifyOTP } = require("../controllers/register")


route.post('/Login' , loginWithOTP)
route.post('/verify-otp' , verifyOTP)


module.exports = route



