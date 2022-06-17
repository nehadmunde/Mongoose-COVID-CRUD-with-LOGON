const mongoose=require('mongoose');


//defining schema
const patientSchema=new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    age:{type:Number,required:true,min:18,max:150},
    adharCard:{type:String,required:true,trim:true},
    dose:{type:String,required:true,trim:true}
})

//defining model
const patientModel=mongoose.model("covid_paitient",patientSchema);


module.exports=patientModel;