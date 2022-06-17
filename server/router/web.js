const express=require("express");

const router=express.Router();
const patientController=require('../controller/patientController');
const userController=require('../controller/userController');

router.get('/',patientController.getAlldata);
// in thunder : http://localhost:9001/covid_paitient  ==> get

router.post('/',patientController.createPatient);
// in thunder : http://localhost:9001/covid_paitient  ==> post

router.get('/edit/:id',patientController.editPatient);
// in thunder :http://localhost:9001/covid_paitient/edit/62a8c630acc0129558ba075f ==> get

router.put('/edit/:id',patientController.updatePatient);
// in thunder : http://localhost:9001/covid_paitient/edit/62a8d5b34cefd4a5bb187d81 ==> put

router.delete('/delete/:id',patientController.deletePatient);
// in thunder : http://localhost:9001/covid_paitient/delete/62a8d5b34cefd4a5bb187d81 ==> delete

 router.get('/search/:key',patientController.searchPatient);

// in thunder : http://localhost:9001/covid_patient/search/u  ==> get

// =========>  rotes for user

router.get('/user',userController.getUserData)
//in thunder : http://localhost:9001/covid_patient/user  ==> get

router.post('/userReg',userController.userRegistration)
//in thunder : http://localhost:9001/covid_patient/userReg  ==> post

router.post('/login',userController.userLogin);
//in thunder : http://localhost:9001/covid_patient/login  ==> post

router.get('/userEdit/:id',userController.editUser);
//in thunder : http://localhost:9001/covid_patient//userEdit/:id  ==> get

router.put('/userEdit/:id',userController.updateUser);
//in thunder : http://localhost:9001/covid_patient//userEdit/:id  ==> put

router.delete('/userDelete/:id',userController.deleteUser);
//in thunder : http://localhost:9001/covid_patient/userDelete/:id  ==> delete

router.get('/userSearch/:key',userController.searchUser);

// in thunder : http://localhost:9001/covid_patient/userSearch/u  ==> get

module.exports=router;