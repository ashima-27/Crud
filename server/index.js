const express=require('express');
const dotenv= require('dotenv')
const bodyParser=require('body-parser')
const app=express();
const cors = require('cors')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
const Jwt=require('jsonwebtoken');
const jwtKey='e-comm';
dotenv.config({ path: './.env' })
require("./auth/passport.js");


const jwt = require('jsonwebtoken');
const { secretKey } = require('./config/config');

// const PORT = process.env.DB_PORT;

require('./models')

const postRouter = require("./routes/Post");
app.use("/post",postRouter);

const userRouter = require("./routes/User");
app.use("/user",userRouter);

const adminRouter = require("./routes/Admin");
app.use("/admin",adminRouter);


app.get('/', (req, res) =>{
  res.send("Hellooooo!");
});



app.listen(3001, () => {
    console.log(`Server running on port 3001`)
})