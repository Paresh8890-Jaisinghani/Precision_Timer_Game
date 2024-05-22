const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
    PrecisionScore1 : {type:String , required : true},
    PrecisionScore2 : {type:String , required : true},
    PrecisionScore3 : {type:String , required : true},
    otpcode : {type : String}
})



const Contact = mongoose.model('Contact',contactSchema);

module.exports = Contact;