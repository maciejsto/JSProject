var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define a new schema
var AstronautSchema = new Schema({
    //slug : { type: String, lowercase: true, unique: false },
    name : String,
    birthdate : Date,
    _id: String,
    missions : [String],
    photo : String,
    source : {
        name : String,
        url : String
    },
    skills : [String],
    walkedOnMoon : Boolean,
    lastupdated : { type: Date, default: Date.now }
},{_id: true});

// export 'Astronaut' model
module.exports = mongoose.model('Astronaut',AstronautSchema);

/*
var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    text : String,
    done : Boolean
}
*/