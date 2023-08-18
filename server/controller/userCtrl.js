var db=require('../models')
const {Sequelize} =require('sequelize')
const bcrypt = require('bcryptjs');
var Signup =require('../models').Signup;
const jwt=require("jsonwebtoken")
const config = require('../config/config');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lifestyle2267@gmail.com",
    pass: 'ejzbpvkvndqvfeow',
  },
});
async function signup(req,res){
    try{
      console.log("Im here")
      const { emailId, password ,confirmPassword} = req.body;
     
           const existingUser = await Signup.findOne({ where: { emailId } });
           if (existingUser) {
             return res.status(400).json({ message: 'Email already exists' });
           }

           const hashedPassword = await bcrypt.hash(password, 10);

       
           const newUser = await Signup.create({
            emailId,
            password: hashedPassword,
            confirmPassword:hashedPassword
          });
      
          const token = jwt.sign({ userId: newUser.id }, config.secretKey, {
            expiresIn: config.expiresIn,
          });
      
          res.status(200).json({ token });
    }catch(err){
        console.log("error is : ",err);
        let Message = "Server Error";
        return res.status(400).json(Message); 
    }
}


  
    async function login(req, res) {
        
      
        console.log("login data: ",req.body)
        try {
          const { emailId, password } = req.body;
          const user = await Signup.findOne({
            where: {
             
              emailId
            },
            attributes: ["password", "emailId"]
          });
      
          if (!user) {
           
            
            return res.status(401).json({ error: 'User not found' });
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            console.log("matched???", passwordMatch)
            return res.status(401).json({ message: 'Invalid credentials' });
          }
          const token = jwt.sign({ emailId: user.emailId }, config.secretKey, {
            expiresIn: config.expiresIn,
          });
          console.log("res???")
        
          res.status(200).json({ token });
          // return res.status(200).json({ success: 'Login successful' });
        } catch (error) {
          console.error('Login error:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
      }
      
async function forgetpass(req,res){
   const{userId}=req.body;
  console.log("forgetpass:",req.params.emailId);
  console.log(userId)
  try{
    
    const existingUser = await Signup.findOne({ where: { emailId:req.params.emailId } });
    if (existingUser) {
      
      
   
      const token = req.params.emailId;
      // const token = req.body.userId;
      console.log("userId",token);
  
  const mailOptions = {
    from: "lifestyle2267@gmail.com",
    to: req.params.emailId, 
    subject: "Password Reset",
    text: "You are receiving this email because you requested a password reset.\n\n" +
      "Please click the following link to reset your password:\n\n" +
      `${req.protocol}://localhost:3000/newpass?token=${token}`,
      
  };
  
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send password reset email" });
    }
    
    console.log("Password reset email sent:", info.response);
    return res.status(200).json({ message: "Password reset email sent successfully" });
  });
    }else{
       res.status(500).json({ message: "Please enter correct credentials" });
    }
   


  }catch(error){
    console.error('Login error:', error);
          return res.status(500).json({ error: 'Internal server error' });
  }
}

// async function chngpassword(req, res)  {
//   const { token } = req.params;
//   const { newPassword } = req.body;
//   console.log("for:",token);
 
//   try {
//     console.log('chngpassword', token, req.body);

//     // Retrieve the user from the database using the token or any other identifier
//     // const user = await getUserByToken(token);
//     const user = await Signup.findOne({ where:{
//       emailId:token},
//       attributes: ["password", "emailId","confirmPassword"]});
  

//     if (!user) {
//       return res.status(400).json({ error: "Invalid or expired token" });
//     }

//     user.password = newPassword;
//     user.confirmPassword=newPassword;
   
//     await user.save();

//     return res.status(200).json({ message: "Password reset successful" });
//   } catch (error) {
//     console.error("Password reset error:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

async function chngpassword(req, res) {
  const { token } = req.params;
  const { newPassword } = req.body;
  console.log("for:", token);

  try {
    console.log('chngpassword', token, req.body);

    const user = await Signup.findOne({ 
      where: { emailId: token },
      attributes: ["userId", "password", "emailId", "confirmPassword"]
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    user.password = newPassword;
    user.confirmPassword = newPassword;
   
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Password reset error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports={
    signup,
    login,
    forgetpass,
    chngpassword
}