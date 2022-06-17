const res=require('express/lib/response');
const patientModel=require('../model/patientModel');


class patientController{

    //get controller 
    static getAlldata=async(req,res)=>{
        try{
            let savedData=await patientModel.find();
            //  console.log("saved Data",savedData);
             res.send(savedData);

        }catch(err){
            console.log(err);
        }
    }

    //post controller
    static createPatient=async(req,res)=>{
        console.log(req.body);
        try{
            let newData= new patientModel(req.body)
            let result=await newData.save();
            console.log("data in result",result);
             res.send("data saved sucessfully");
        }catch(err){
            res.send(err);
        }
    }

    // edit data
    static editPatient=async(req,res)=>{
        console.log(req.params.id);
        try{
            let newData= req.body;
            let result=await patientModel.findOne({_id:req.params.id});
            console.log(result);
            res.send(result);

        }catch(err){
            console.log(err);
        }
    }

    //update data
    static updatePatient=async(req,res)=>{
        // console.log(req.params.id);
        try{
            let newData= req.body;
            let result=await patientModel.updateOne(
                {_id:req.params.id},
                {$set:{
                    name:req.body.name,
                    age:req.body.age,
                     adharCard:req.body.adharCard,
                     dose:req.body.dose}} )
                     console.log(result);
                    //  res.send(result);
                     res.send("data updated");

        }catch(err){
            console.log(err);
        }
    }

    //delete data
    static deletePatient=async(req,res)=>{
        console.log(req.params.id);
        try{
            let newData= await patientModel.deleteOne({_id:req.params.id});
            console.log(newData);
            // res.send(newData)
            res.send("Data deleted")
            

        }catch(err){
            console.log(err);
        }
    }

    //search data
   static searchPatient=async(req,res)=>{
    //  console.log(req.params.key);
    try{
        let newData= await patientModel.find({
            "$or":[
                 {name:{$regex:req.params.key}},
                //  {age:Number({$regex:req.params.key})},
                 {adharCard:{$regex:req.params.key}},
                 {dose:{$regex:req.params.key}},
            ]
        });
         res.send(newData)
    }catch(err){
        console.log(err);
    }
   }

}

module.exports=patientController;