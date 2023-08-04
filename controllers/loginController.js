const express=require('express')
const employees = require('../models/registerSchema')


exports.login = async (req,res)=>{

    const{fname,password}=req.body
  

 try {  const preEmployee = await employees.findOne({fname,password})
    console.log('preEmployee', preEmployee);
        if(preEmployee){
            res.status(200).json('login Successful')
        }
        else{
            res.status(401).json('Please register')
        }

}
 catch (error){
     res.status(401).json(error)
 }


}