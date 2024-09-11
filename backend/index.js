const express=require('express')
const cors=require('cors')


const dotenv=require('dotenv')
dotenv.config()

const db=require('./config/db')
const taskRouter=require('./routes/taskRoute')
const userRouter=require('./routes/userRoute')
const app=express()


const PORT=5000;

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000' 
  }));


app.use('/api',taskRouter)

app.use('/api',userRouter)

app.listen(PORT,()=>{
    console.log(`PORT WAS RUNNING AT ${PORT}`)
})