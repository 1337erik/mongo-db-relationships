const mongoose = require( 'mongoose' );


const teacherSchema = new mongoose.Schema({

    name : {

        type     : String,
        required : true,
        unique   : true
    },
    meta : {

        age     : Number,
        subject : String,
        height  : Number
    },
    students : [{

        type : mongoose.Schema.Types.ObjectId,
        ref  : 'Student'
    }]
});

teacherSchema.methods.listStudents = function() {

    return "Lmao nah";
}


const Teacher = mongoose.model( 'Teacher', teacherSchema );

module.exports = Teacher;