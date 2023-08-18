var db = require('../models')
const { Sequelize } = require('sequelize');
var Crud = require("../models").Crud;
var Signup =require("../models").Signup;
async function getmoviedata(req,res){
   
     try{

        
        const user = await Signup.findOne({ where: { emailId:req.params.emailId } });
        
        const getdata = await Crud.findAll({
            where:{
                // emailId:req.params.emailId,
                userId:user.userId
            }
        });
        res.status(200).json({ data: getdata });

        // const sqlselect= "SELECT * FROM crud.cruds";
        // db.sequelize.query(sqlselect,(err,result)=>{
        //    return res.status(200).send(result)
        //    })

     }catch(err){
        console.log("error is : ",err);
        // let Message = "Server Error";
        // return res.status(400).json(Message); 
     }

}

async function postmoviedata(req,res){
    // try{
    //        postdt=req.body;
    //        console.log(postdt);
    //        var postdata =await Crud.create(postdt);
    //        res.status(200).json({ data: postdata });
    // }catch(err){
    //     console.log("error is : ",err);
    //     let Message = "Server Error";
    //     return res.status(400).json(Message); 
    // }

  try{
      
          const user = await Signup.findOne({ where: { emailId:req.params.emailId } });
      
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          postdt=req.body;
                 console.log(postdt);
                 var postdata =await Crud.create({...postdt,userId:user.userId});
                 res.status(200).json({ data: postdata });
        
      
          res.status(200).json({ data: postdata });
        } catch (err) {
          console.log("error is : ", err);
        //   let Message = "Server Error";
        //   return res.status(400).json(Message);
        }
      
      

    // const movie_name=req.body.movie_name;
    // const review=req.body.review;

    // const sqlinsert ="INSERT INTO Crud(movie_name,movie_review) VALUES(?,?)";
    // db.query(sqlinsert,[movie_name,review],(err,result)=>{
    //  console.log(result);
    // })
}

async function deleteReview(req,res){
    try{
        // const name=req.params.movie_name;
        // const sqldel="DELETE FROM cruds WHERE movie_name=?";
        // db.query(sqldel,name,(err,result)=>{
        //     if(err) console.log(err);
        //     else{
        //         console.log(result);
        //     }
        // });
        console.log("rev",req.params)
        const data = await Crud.destroy({
            where: {
                movie_name: req.params.movie_name
            }
        })
        res.status(200).json({ data: data });
    }catch(err){
        console.log("error is : ",err);
        let Message = "Server Error";
        return res.status(400).json(Message); 
    }
}

async function updateReview(req,res){
    try{
        // const name= req.body.movie_name;
        // const review = req.body.review;
        // const sqlUpdate="UPDATE SET cruds review = ? WHERE review=?";
        // db.query(sqlUpdate,[review,name],(err,result)=>{
        //     if(err) console.log(err);
        //     else{
        //         console.log(result);
        //     }
        // })
        var updatedData = req.body;
        const data = await Crud.update(updatedData, {
            where: {
                movie_name: req.params.movie_name
            }
        })
        res.status(200).json({ data: data });

    }catch(err){
        console.log("error is : ",err);
        let Message = "Server Error";
        return res.status(400).json(Message); 
    }
}
module.exports ={
  getmoviedata,
  postmoviedata,
  deleteReview,
  updateReview
}