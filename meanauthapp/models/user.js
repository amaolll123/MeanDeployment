const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// const User = module.exports = mongoose.model('User', UserSchema);
const User = module.exports = mongoose.model('User', UserSchema);


//callback用法
// function functionOne(x) { alert(x); 
// function functionTwo(var1, callback) {
//     callback(var1);		
// }
// functionTwo(2, functionOne);

module.exports.getUserbyId = function(id,callback){
    User.findById(id,callback);
}

module.exports.getUserbyUsername = function(username,callback){
    const query = {username:username}
    User.findOne(query,callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatepsw,hash,callback){
  bcrypt.compare(candidatepsw,hash,(err,isMatch)=>{
    if(err) throw err;
    callback(null,isMatch);
  })

}

