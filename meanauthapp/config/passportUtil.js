//passportUtilize 

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');


//检查jwt
module.exports= function(passport){
	let opts={};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
	opts.secretOrKey = config.secret;

	passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
		//jwt_payload里放的是刚创建进去的user
		//用userid取出user
		User.getUserbyId(jwt_payload._doc._id,(err,user)=>{
			if(err) return done(err,false);
			if(user) return done(null,user);
			else return done(null,false);
		});
	}


	));
}