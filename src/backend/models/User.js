var mongoose = require('mongoose'),
    userSchema = new mongoose.Schema({
       
       name: {type: String, required: true},
       joinDate: {type: Date, default: Date.now}
    }),
    
    user = mongoose.model('user', userSchema);
    
module.exports = user;

