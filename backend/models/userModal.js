const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    otp:{type:String},
    isVerified:{type:Boolean,default:false},
    isBlocked:{type:Boolean,default:false}
},{timestamps:true})

module.exports=mongoose.model('User',userSchema)