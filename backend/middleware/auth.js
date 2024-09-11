const jwt=require('jsonwebtoken')

const authMiddleware=async(req,res,next)=>{
    const {token}=req.headers

    if(!token){
        return res.send({
            message:"Not Authorized please Login"
        })
    }

    try{

        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId=tokenDecode.id

        console.log(tokenDecode.id)
       next()

    }
    catch(err){
        return res.send({
            message:err
        })
    }
}

module.exports={authMiddleware}