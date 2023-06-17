//tal sabag - 042836023;
//rotem zagori-316389378
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Developer schema:
const DeveloperSchema = new Schema({
    id:{
       type:Number,
    },
   
    firstname:{
        type:String,
    },

    lastname:{
        type:String,
    },

    email:{
        type:String,
        unique:true,
    }
   

},{timestamps: true});


module.exports = mongoose.model('Developer',DeveloperSchema);