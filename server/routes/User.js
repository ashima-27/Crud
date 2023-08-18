const express = require('express');
const router= express.Router();

const usercontroller =require('../controller/userCtrl');

router.post('/signup',usercontroller.signup);
router.post('/login/:emailId',usercontroller.login);
router.post('/forgetpass/:emailId',usercontroller.forgetpass);
router.post('/chngpassword/:token',usercontroller.chngpassword);
module.exports=router;