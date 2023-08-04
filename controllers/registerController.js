const express=require('express')
const employees = require("../models/registerSchema");



//logic to register new employees
exports.employeeRegister =async (req,res)=>{
    
    const{fname,email,mobile,password}=req.body


 try {  const preEmployee=await employees.findOne({fname})
        if(preEmployee){
            res.status(403).json('employee already exist')
        }
        else{
            const newEmployee=new employees({
                fname,email,mobile,password
            })
            await newEmployee.save()
            res.status(200).json(newEmployee)
        }

}
 catch (error){
     res.status(401).json(error)
 }

}