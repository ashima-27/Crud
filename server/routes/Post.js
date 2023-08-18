const express = require('express');
const router= express.Router();

const crudcontroller =require('../controller/crudCtrl');

router.get('/getmoviedata/:emailId',crudcontroller.getmoviedata);
router.post('/postmoviedata/:emailId',crudcontroller.postmoviedata);
router.delete('/deleteReview/:movie_name',crudcontroller.deleteReview)
router.put('/updateReview/:movie_name',crudcontroller.updateReview)

module.exports=router;