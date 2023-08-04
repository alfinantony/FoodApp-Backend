const mongoose=require('mongoose')



const registerSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        
    },
    password: {
        type : String,
        required: true
    },
    email:{
        type:String,
        required:true,  
    },
    mobile:{
        type:String,
        required:true,  
    },
   
})
const employees = new mongoose.model('employees',registerSchema)

//export the model

module.exports=employees