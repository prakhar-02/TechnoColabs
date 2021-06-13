const express = require("express");
const app = express();//
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

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
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    let newQuery = new query({
        email: req.body.email,
        name: req.body.name,
        message: req.body.message
    });
    newQuery.save();
    res.redirect('/');
})

//--------------------------------------------

app.listen(3000, function(){
    console.log("server is running on 3000");
})
