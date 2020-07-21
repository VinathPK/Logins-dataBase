const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/loginsDB",{useNewUrlParser: true,useUnifiedTopology: true})

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


let loginData =[];
const loginSchema = new mongoose.Schema({
  account:String,
  userName:String,
  password:String
});

const Login = mongoose.model("Login",loginSchema);


app.get("/",(req,res)=>{
  res.render("home");
})
app.get("/home",(req,res)=>{
  res.render("home");
})
app.post("/home",(req,res)=>{
  const userData= new Login({
            account:req.body.account,
            userName:req.body.userName,
            password:req.body.password
          });
      loginData.push(userData);
  res.redirect("/");
  userData.save((err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("succesfully updated");
    }
  });
})
// app.get("/userInfo",(req,res)=>{
//   loginData.forEach(function(login){
//     res.render("userInfo",{userId:login.userName,password:login.password});
//
//   })
// })

app.listen(3000,()=>{
  console.log("server listening at port 3000");
});
