
var db = require('../models');
const { Sequelize } = require('sequelize');
// var Admin = require('../models').Admin;
var signup = require('../models').Signup;
// var crud =require('../models').crud;

// async function getallusers(req, res) {
//     console.log("user data :", req.body);
//     try {


//         const getdata = await signup.findAll({
//             attributes:{
//                 exclude:[
//                     "createdAt",
//                     "updatedAt",
//                     "password",
//                     "confirmPassword"
//                 ]
//             },
           
//         });
//         res.status(200).json({ data: getdata });
//     } catch (err) {
//         console.log("error is : ", err);
//         let Message = "Server Error";
//         return res.status(400).json(Message);
//     }
// }


async function getallusers(req, res) {
    try {
      const sqlQuery = `
      select * from (
        (select * from crud.signups)t1
        inner join 
        (select count(*) as tasks, userId from crud.cruds group by userId) t2
        on t1.userId = t2.userId
        )
      `;
      const result = await db.sequelize.query(sqlQuery, {
        type: db.Sequelize.QueryTypes.SELECT,
      });
  
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error occurred while fetching all users:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

async function deluserbymail(req, res) {
    try {
        console.log("mailid", req.params)
        const data = await signup.destroy({
            where: {
                emailId: req.params.emailId,
            }
        })
        console.log("User deleted:", data);
        
        res.status(200).json({ data: data });
    } catch (err) {
        console.log("error is : ", err);
        let Message = "Server Error";
        return res.status(400).json(Message);
    }
}

async function getuserbymail(req,res) {
  
    try {
        // console.log(" data :", req.body);
        // const getuser = await signup.findOne({
        //     where: {
        //         emailId: req.params.emailId,
        //     },
        //     attributes: {
        //         exclude: [
        //             "createdAt",
        //             "updatedAt",
        //         ]
        //     }
        // }
        // );
        // if (!getuser) {
            
        //     return res.status(404).json({ error: 'User not found' });
        //   }else{

        // res.status(200).json({ data: getuser });
        //   }

        const sqlquery=`SELECT *
        FROM
          (SELECT *
           FROM crud.signups) AS t1
        INNER JOIN
          (SELECT COUNT(*) AS tasks, userId
           FROM crud.cruds
           GROUP BY userId) AS t2 ON t1.userId = t2.userId
        WHERE t1.emailId = '${req.params.emailId}';`
       
        const result = await db.sequelize.query(sqlquery, {
            type: db.Sequelize.QueryTypes.SELECT,
          });

          if (result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          return res.status(200).json(result);


    } catch (err) {
        console.log("error is : ", err);
        let Message = "Server Error";
        return res.status(400).json(Message);
    }
}




module.exports = {
    getallusers,
    deluserbymail,
    getuserbymail,
   
}