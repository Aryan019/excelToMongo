const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inSchema = new Schema({
    collegeCode :  {
        type : String
    },
    name : {
        type : String,
    },
    cgpa : {
        type : Number,
    },
});


module.exports = mongoose.model('RegisterInfo',inSchema)