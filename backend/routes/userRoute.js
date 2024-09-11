
const express=require('express')
const { singUp, loginUser } = require('../controllers/userController')

const userRouter=express.Router()

userRouter.post('/sign-up',singUp)

userRouter.post('/login',loginUser)

module.exports=userRouter