const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  age:{
    type:Number,
    default:18
  }
})
module.exports=mongoose.model('user',userSchema)
