const mongoose=require('mongoose')

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('MONGODB CONNECTED')
}).catch((err)=>{
       console.log(err)
})