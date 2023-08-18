const express = require('express');
const router = express.Router();

const admincontroller = require('../controller/adminCtrl');

router.get('/getallusers',admincontroller.getallusers);
router.delete('/deluserbymail/:emailId',admincontroller.deluserbymail);
router.get('/getuserbymail/:emailId',admincontroller.getuserbymail);


module.exports=router;