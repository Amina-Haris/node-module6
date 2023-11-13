const express = require('express');
const app = express();
const port = 2000;
const mongoose = require('mongoose');

app.use(express.urlencoded({extended:true}));

//TO CONNECT WITH LOCAL DATABASE 

// mongoose.connect("mongodb://127.0.0.1:27017/dbfsd",{useNewUrlParser:true},{useUnifiedToplogy:true})
// .then((data)=> console.log(`database is connected with ${data.connection.host}`))
// .catch((err) => console.log(err.message));

// TO CONNECT WITH ATLAS

mongoose.connect('mongodb+srv://ameenaharis7:cnntmdl6@cluster0.n1djxlp.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true},{useUnifiedToplogy:true})
.then((data)=> console.log(`database is connected with ${data.connection.host}`))
.catch((err) => console.log(err.message));


const schema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String

})

const createModel = mongoose.model('posts',schema);        //posts => default collection name

app.get('/',(req,res)=>{

    res.sendFile(__dirname + '/signup.html');

});

app.post('/',(req,res)=>{
    console.log(req.body);
    const newPost = new createModel({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password
    })
    newPost.save();
    res.redirect('/login');
});

app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/login.html')
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});