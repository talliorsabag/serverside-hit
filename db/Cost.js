//tal sabag - 042836023;
//rotem zagori-316389378
const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

//Cost schema:
const CostSchema = new Schema({
    id: { // will be genreated by AutoIncrement
        type: Number, 
        unique: true
    },

    user_id:{
        type:Number,
    },

    year:{
        type:Number,
    },

    month:{
        type:Number,
    },

    day:{
        type:Number,
    },

    description:{
        type:String,
    },

    category:{
        type:String,
        enum : ['food','health','housing','sport','education','transportation','other'],
    },

    sum:{
        type:Number,
    }

    
},{timestamps: true});


CostSchema.plugin(AutoIncrement, {id:'cost_id_seq',inc_field: 'id'});
module.exports = mongoose.model('Cost',CostSchema);