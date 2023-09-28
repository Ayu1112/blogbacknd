const mongoose=require('mongoose');
require('dotenv').config();

const connection=mongoose.connect(process.env.url)
.then(()=>{
    console.log('connected to dbb');
}).catch((error)=>{
    console.log('Error connecting to mongoDB',error);
});

module.exports={connection}