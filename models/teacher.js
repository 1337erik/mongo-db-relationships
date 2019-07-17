const mongoose = require( 'mongoose' );


const teacherSchema = new mongoose.Schema({

    name : {

        type     : String,
        required : true,
        unique   : true
    },
    meta : {

        subject : String,
    },
    students : [{

        type : mongoose.Schema.Types.ObjectId,
        ref  : 'Student'
    }]
});

teacherSchema.methods.listStudents = function() {

    return this.students.length;
}


const Teacher = mongoose.model( 'Teacher', teacherSchema );

module.exports = Teacher;