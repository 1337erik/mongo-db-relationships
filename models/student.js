const mongoose = require( 'mongoose' );

const studentSchema = new mongoose.Schema({

    name : {

        type     : String,
        required : true,
        unique   : true
    },
    meta : {

        major    : String,
    }
});

studentSchema.methods.sayName = function() {

    return "My Gender Nuetral name is " + this.name;
}


const Student = mongoose.model( 'Student', studentSchema );

module.exports = Student;