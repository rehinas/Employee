const mongoose=require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.db)
.then(()=>{
    console.log('Connected to MongoDb')
})
.catch((error)=>{
    console.log("ERROR!!! Connection lost",error)
})