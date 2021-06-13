const express = require("express");
const app = express();//
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use('/css',express.static(__dirname +'/css'));
app.use('/assets',express.static(__dirname +'/assets'));
app.use('/favicons',express.static(__dirname +'favicons'));
app.use('/images',express.static(__dirname +'images'));
app.use('/js',express.static(__dirname +'/js'));
app.use('/fonts',express.static(__dirname +'/fonts'));
//--------------------------------------------

mongoose.connect("mongodb+srv://Mridul:Bagri@cluster0.gacsq.mongodb.net/TechnoColabs"), {useNewUrlParser: true}, {useUnifiedTopology: true};

//create schema
const querySchema = {
    email: String,
    name: String,
    message: String
}

const query = mongoose.model("Query", querySchema, 'queries');

app.get("/", function(req, res){
    res.sendFile(__dirname + '/page-contact.html');
})

app.post("/", function(req, res){
    let newQuery = new query({
        email: req.body.email,
        name: req.body.name,
        message: req.body.message
    });
    newQuery.save();
    res.redirect('/');
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: ' mridulbagri25@gmail.com',
        pass: 'Mridul@20'
      }
    });
    var mess = function(req, res){
      return  "email: "+req.body.email + "\nname: " + req.body.name + "\nmessage: " +req.body.message;
    };
    var m = mess(req, res);
    var mailOptions = {
      from: ' mridulbagri25@gmail.com',
      to: ' mridulbagri25@gmail.com',
      subject: 'Message form user',
      text: m
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
})

//--------------------------------------------

app.listen(3000, function(){
    console.log("server is running on 3000");
})

//--------------------------------------------

