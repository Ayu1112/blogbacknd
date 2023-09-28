const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    email:String,
    password:String,
    confirmPassword:String
    
},
{
    versionKey:false
})
const userModel=mongoose.model('user',userSchema);

module.exports={
    userModel
}