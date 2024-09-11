
const express=require('express')
const { addTask, allTask, updateTask } = require('../controllers/taskController')
const { authMiddleware } = require('../middleware/auth')

const taskRouter=express.Router()


taskRouter.post('/add-task',authMiddleware,addTask)

taskRouter.get('/get-task',authMiddleware,allTask)

taskRouter.put('/update-task/:id',authMiddleware,updateTask)

module.exports=taskRouter