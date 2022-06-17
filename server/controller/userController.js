const userModel=require('../model/UserModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
// const JWT_SECURITY_KEY=process.env.JWT_SECURITY_KEY || "jhkhggcghh"

class userControll{

static getUserData=async(req,res)=>{
   try{
    const userList=await userModel.find();
    res.send(userList)
   }catch(err){
    console.log(err)
   }
    
}

//adding new user
static userRegistration=async(req,res)=>{
    const {name,email,password,password_confirmation,tc}=req.body
    if(password === password_confirmation){
        const hashPass=await bcrypt.hash(password,10)
        const doc=new userModel({
            name:name,
            email:email,
            password:hashPass,// no need to add password confirmation
            tc:tc
          })
          await doc.save()
          const savedUser=await userModel.findOne({email:email})
          //genrate jwt token
          const registerToken=jwt.sign({userID:savedUser._id},"jhkhggcghh",{expiresIn:"5d"})
          //{expiresIn:"5d"} ==> expires in 5 days (m=> min)
          console.log("token",registerToken);
          res.send({"status":"Sucess","message":"Registration Sucessfull.","token":registerToken})
    }else{
        res.send({"status":"failed","message":"Password and confirm password dose not match."})
    }
}

//user login
static userLogin=async (req,res)=>{
        console.log(req.body)
        const {email,password}=req.body

        try{
            if(email && password){
                const user=await userModel.findOne({email:email})
                console.log(user)
                if(user!=null){
                    // console.log(password,user.password)
                    const isMatch=await bcrypt.compare(password,user.password)
                    //console.log("isMatch",isMatch)
                    if(user.email === email && isMatch){
                        const loginToken=jwt.sign({userID:user._id},"jhkhggcghh",{expiresIn:"5d"})
                        res.send({"status":"sucess","message":"Login sucessfull.","token":loginToken})
                    }else{
                        res.send({"status":"failed","message":"E-mail or Password is not valid."})
                    }}
                    else{
                        res.send({"status":"failed","message":"You are not a registered user."})
                    }
                }
            else{
                    res.send({"status":"failed","message":"All filds are required."})
                }
        }catch(err){
            console.log(err)
            res.send({"status":"failed","message":"Unable to login."})
        }
       
    
    }
 
static editUser=async(req,res)=>{
    console.log(req.params.id)
    try{
        let newData=req.body
        let result=await userModel.findOne({_id:req.params.id})
        res.send(result)
       }catch(err){
        res.send({"status":"failed","message":"Unable to edit.",err});
       }
}

static updateUser=async(req,res)=>{
    try{
    let newData=req.body
    let result=await userModel.updateOne(
        {_id:req.params.id},
        {$set:{
            name:req.body.name,
            email:req.body.email,
        }} )
        res.send("data Updated")
    }catch(err){
     res.send({"status":"failed","message":"Unable to Update.",err});
    }
}

static deleteUser=async(req,res)=>{
    try{
        let result=await userModel.deleteOne({_id:req.params.id});
        res.send("data deleted");
    }catch(err){
     res.send({"status":"failed","message":"Unable to Delete.",err});
    }
}

static searchUser=async(req,res)=>{
    //  console.log(req.params.key);
    try{
        let newData= await userModel.find({
            "$or":[
                 {name:{$regex:req.params.key}},
                 {email:{$regex:req.params.key}},
            ]
        });
         res.send(newData)
    }catch(err){
        console.log(err);
    }
   }
}

module.exports=userControll;