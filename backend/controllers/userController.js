
const userSchema=require('../models/userModel')
const bcrypt=require('bcryptjs')

const jwt=require('jsonwebtoken')
const validator=require('validator')




const createToken=(id)=>{

    return jwt.sign({id},process.env.JWT_SECRET)

}

const singUp=async(req,res)=>{


    const {username,email,password}=req.body

    try{

        const userExist=await userSchema.findOne({email}) ;
        if(userExist){
            return res.send({
                status:400,
                message:'User email already exists'
            })
        }

        if(!validator.isEmail(email)){
            return res.send({
                status:400,
                message:'Please enter a valid email'
            })
        }

        if(password.length<8){
            return res.send({
                status:400,
                sucess:false,
                message:'Please enter 8 charecters'
            })
        }

        const salt=await bcrypt.genSalt(10)

        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new userSchema({
            username,
            email,
            password:hashedPassword
        })

        const user=await newUser.save()

        const token=createToken(user._id)

       return res.send({
            status:200,
            token:token,
            id:user._id
        })
    }
    catch(err){

        console.log(err)
        res.send({
            status:400,
            err:"Singup Error"
            

        })

    }
}


const loginUser=async(req,res)=>{

    const {email,password}=req.body
    try{
        const user=await userSchema.findOne({email})

        if(!user){
            return res.send({
                status:400,
                message:"User doesn't exist"
            })
        }


        const passMatch=bcrypt.compare(password,user.password)

        if(!passMatch){
            return res.send({
                message:'Invalid Credentials'
            })
        }

        const token=createToken(user._id)

        return res.send({
            message:'user login sucess',
            token,
            id:user._id
        })

    }catch(err){
        return res.send({
            statsu:400,
            message:'Login Error'
        })
    }
}

module.exports={singUp,loginUser}