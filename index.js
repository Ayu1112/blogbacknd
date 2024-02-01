const express=require('express');
const app=express();
const {connection }=require('./db');
const { userRouter } = require('./routes/user.route');
const cors=require('cors')



require('dotenv').config()
app.use(express.json());
app.use(cors())
app.use('/users',userRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log(`listening on port ${process.env.port}`);
        console.log('connected to db');
    } catch (error) {
        console.log(error);
        
        console.log('something is not right');
    }
})