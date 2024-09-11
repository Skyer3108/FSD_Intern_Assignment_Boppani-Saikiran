
const taskSchema=require('../models/taskModel')

const userSchema=require('../models/userModel')

const addTask=async(req,res)=>{

    const {title,desc,priority}=req.body
    const {id}=req.headers

    try{

        const newTask=new taskSchema({
            title,
            desc,
            priority

        })

        const db=await newTask.save()

        const taskId=db._id;
        console.log(taskId)

        await userSchema.findByIdAndUpdate(id,{$push:{tasks:taskId._id}})


       return res.send({
            status:200,
            data:db,
            message:"Task is created"
        })



    }
catch(err){

    return res.send({
        status:400,
        error:err
    })

}}


//for all task not based on the users 

// const allTask=async(req,res)=>{

//     try{

//         const tasks=await taskSchema.find({})

//         res.send({
//             status:200,
//             tasks
//         })



//     }
//     catch(err){

//         res.send({
//             status:400,
//             error:err
//         })

//     }
// }


//get the tasks for particular users

const allTask=async(req,res)=>{

    try{

        const {id}=req.headers

       const userData= await userSchema.findById(id).populate({path:"tasks",options:{sort:{createdAt:-1}}})

       res.send({
        status:200,
        data:userData.tasks
       })

    }catch(err){

        return res.send({
            status:400,
            err:err

        })

    }


}


//this was for all the tasks updateing

const updateTask=async(req,res)=>{

        const task=await taskSchema.findById(req.params.id)

       try{

        if(task){
            task.status=req.body.status
            await task.save()
            res.send({
                status:200,
                task
            })
        }
        else{
            res.send({
                status:404,
                message:'Task not found'
            })
        }

       }catch(err){

        res.send({
            status:400,
            err
        })

       }
}


module.exports={addTask,allTask,updateTask}