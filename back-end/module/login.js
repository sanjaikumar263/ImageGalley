const mongoose=require('mongoose');


const register=new mongoose.Schema({
    id:{type:String},
    name:{type:String,require:true},
    email:{type:String,require:true},   
    password:{type:String,require:true}
     
})

const userRegister=mongoose.model('UserRegister',register);

module.exports=userRegister;

// register Model