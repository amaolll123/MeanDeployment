const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
var ppUtil = require('./config/passportUtil')



mongoose.connect(config.database);

mongoose.connection.on("connected",()=>{
    console.log("Connected to Database: "+ config.database);
});



const users = require('./routes/users');
const app = express();
const port = 3000;

//中间件的使用，好Jb烦,顺序很重要

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
ppUtil(passport);


//给路径加上function
app.use('/users', users);

app.get('/',(req,res)=>{
    res.send('Invalid End Point!');
});

app.get('*',(req,res)=>{
    res.sendfile(path.join(__dirname,'public/index.html'));
})
app.listen(port,()=>{
    console.log('Server started in port  '+port);
});


