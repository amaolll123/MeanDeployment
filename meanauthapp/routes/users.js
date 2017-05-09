const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')



const User = require('../models/user')

//已经在app.js 中定义了'/users'
//localhost:3000/users/register
router.post('/register',(req,res,next)=>{
 
    let newUser = new User({
  	
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
     });

    User.addUser(newUser,(err,user)=>{
        if(err){
            res.json({success:false,msg:"fail to add a user"});
        }else{
            res.json({success:true,msg:"User Registered!"});
        }
    })
    
});


router.post('/authenticate',(req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;

    //根据username拿到user,比较password，确定authentication不
    User.getUserbyUsername(username,(err,user)=>{
        if(err) throw err;
        if(!user)  return res.json({success:false,msg:"User not find!"});
        //此处拿到user
        //里面有password的hash
        User.comparePassword(password,  user.password,  (err,isMatch)=>{
            
            if(isMatch){
                //生成token,返回User
                //jwt.sign(payload, secretOrPrivateKey, [options, callback])
                const token = jwt.sign(user,config.secret,{expiresIn: 604800});
                res.json({
                    success:true,
                    token:'JWT '+token,
                    user:{
                        name:user.name,
                        email:user.email,
                        username:user.username,
                        password:user.password
                    }
                })
            }
            else {
                 return res.json({
                    success:false,
                    msg:'Wrong Password'
                })
            }
        })
    })
});



router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.json({user:req.user});
});


module.exports = router;



