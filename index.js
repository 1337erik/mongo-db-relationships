const express  = require( 'express' );
const mongoose = require( 'mongoose' );

const Student  = require( './models/student' );
const Teacher  = require( './models/teacher' );

const app      = express();


app.use(

    express.urlencoded(

        {

            extended: false
        }
    )
);

// Connect to Mongo!
mongoose.connect( 'mongodb://localhost/family_tree' );


        // create 2 models
        // create a 1:M relationship between them
// create full crud routes on parent
            // Create
            // read all
            // read one
            // delete one
            // update one
// create partial crud on child
            // create
            // read one
    // delete
    // add student to teacher


/**
 * 
 * This route gets all teachers,
 * it only responds to the '/' route.. so localhost:3000/
 * 
 * its basically the home page
 */
app.get( '/', ( req, res ) => {
    // find all

    /**
     * 
     * This is an example of finding everything in one model only
     */
    // Teacher.find( {}, function( err, teachers ) {

    //     if ( err ) res.json( err );
    //     res.json( teachers );
    // })

    /**
     * 
     * This is an exampel of finding things from two models,
     * then 'concatenating' the results to display on the screen..
     * ( or combining the two arrays, student and teacher )
     */
    Teacher.find( {} ).exec()
    .then( function( teachers ){

        Student.find( {}, function( err, students ){

            res.json( teachers.concat( students ) );
        })
    });

});

/**
 * 
 * This route grabs a specific teacher by name, or returns null if none are found.
 * 
 * If it finds one, it will display it on the screen by itself
 */
app.get( '/getTeacher/:name', ( req, res ) => {
    // find one

    Teacher.findOne({

        name : req.params.name // this is the identifier key-value pair
    }, function( err, user ) {

        if( err ) res.json( err );
        res.json( user ); // res.json basically means print the json response to the screen
    })
});

/**
 * 
 * This route will create a teacher named by whatever you pass by the first parameter
 * 
 *  localhost:3000/adasdasdasd => creates a teacher named 'adasdasdasd'
 * 
 * There's an optional route of ':blah'.. optional because it has a '?' at the end.
 * What this means is that if you do not pass anything, it wont care..
 * 
 * But if you do pass anything, it will add it to the new teacher's subject.. like:
 * 
 *  localhost:3000/Donald/astrology => will create a teacher named 'Donald' with a subject of 'astrology'
 * 
 * The Route will then redirect back to '/', which as you can read above, grabs all teachers and displays them
 */
app.get( '/createTeacher/:dillywiddle/:blah?', ( req, res ) => {

    Teacher.create({

        name : req.params.dillywiddle, // set the name equal to the parameter
        meta : {

            subject : req.params.blah // if this is blank, it wont be set ( see 'optional parameter' in notes above )
        }
    }, function( err, teacher ) {

        if( err ) res.json( err );

        console.log( teacher ); // im logging the new teacher to the console in the terminal running 'nodemon' just before redirecting..

        res.redirect( '/' ); // redirect back to the '/' route above this function
    })
});

/**
 * 
 * This route will find a Teacher and remove them from the database,
 * identified by the name
 * 
 * so localhost:3000/removeTeacher/Karen => will find the teacher named 'Karen' from the DB and remove her
 *  ..if no teacher named Karen exists, it will simply redirect to '/' with nothing changed.
 * 
 * It will not 'throw an error' to the screen or command line..
 */
app.get( '/removeTeacher/:sasquatch', ( req, res ) => {

    Teacher.deleteOne({

        name : req.params.sasquatch // find based on this parameter
    }, function( err ) {

        if ( err ) res.json( err );
        res.redirect( '/' ); // redirect when done, deleted or not
    })
});

/**
 * 
 * This route will update a teachers name,
 *  like the other functions it will find a teacher based on name,
 *  update it, then redirect back home
 */
app.get( '/updateTeacherName/:sillyboi/:newname', ( req, res ) => {

    Teacher.update({

        name : req.params.sillyboi // find parameters
    },
    {
        $set: {

            name : req.params.newname // update name
        }
    }, function( err, users ) {

        if ( err ) res.json( err );
        res.redirect( '/' );
    })
});

/**
 * 
 * This route will update a teacher's subject,
 * it works exactly as the one above..
 */
app.get( '/updateTeacherSubject/:sillyboi/:newsubject', ( req, res ) => {

    Teacher.update({

        name : req.params.sillyboi
    },
    {
        $set: {

            meta : {

                subject : req.params.newsubject
            }
        }
    }, function( err, nothing ) {

        if ( err ) res.json( err );
        res.redirect( '/' );
    })
});




/** API Section for Students ( the Child Model ) */


app.get( '/createStudent/:stuname/:majj?', ( req, res ) => {

    Student.create({

        name : req.params.stuname, // set the name equal to the parameter
        meta : {

            major : req.params.majj // if this is blank, it wont be set
        }
    }, function( err, sadsasd ) { // the second parameter isnt even needed.. mainly since im just redirecting

        if( err ) res.json( err );
        res.redirect( '/' ); // redirect back to the '/' route above this function
    })
});


app.get( '/getStudent/:name', ( req, res ) => {
    // find one

    Student.findOne({

        name : req.params.name // this is the identifier key-value pair
    }, function( err, studentssasd ) {

        if( err ) res.json( err );
        res.json( studentssasd ); // res.json basically means print the json response to the screen
    })
});


app.get( '/removeStudent/:sasquatch', ( req, res ) => {

    Student.deleteOne({

        name : req.params.sasquatch // find based on this parameter
    }, function( err ) {

        if ( err ) res.json( err );
        res.redirect( '/' ); // redirect when done, deleted or not
    })
});


/**
 * 
 * This is our example for adding a student to a teacher's class.. or whatever..
 * 
 */
app.get( '/addStudent/:jesus/:mohammad', ( req, res ) => {

    // Teacher.update({

    //     name : req.params.jesus
    // },
    // {
    //     $set: {

    //         students : req.params.mohammad
    //     }
    // }, function( err, nothing ) {

    //     if ( err ) res.json( err );
    //     res.redirect( '/' );
    // })

    // Teacher.findOne({

    //     name : req.params.jesus
    // }, function( err, teacher ) {

    //     Student.findById({

    //         name : req.body.mohammad
    //     }, function( err, stu ) {

    //         teacher.students.push( stu );
    //         teacher.save( function( err ) {

    //             // product.orders.push( order );
    //             // product.save( function( err ) {

    //             //     if ( err ) res.json( err )
    //             //     res.json( order )
    //             // })

    //             res.json( teacher );
    //         })
    //     })
    // })

    // Student.find({

    //     name: req.params.jesus
    // }).exec()
    // .then( function( stu ){

    //     Teaher.find({

    //         name: req.params.mohammad
    //     }, function( err, teach ){

    //         teach.students.push( stu );

    //         teach.save( function( err ) {

    //             if( err ) res.json( err );
    //             res.redirect( '/' );
    //         })
    //     })
    // });

    // Student.findOne({

    //     name : req.params.jesus
    // }, function( err, stu ) {

    //     console.log( '1:: ' + err );
    //     Teacher.findOne({

    //         name : req.body.mohammad
    //     }, function( err, teach ) {

    //         console.log( '2:: ' + err );
    //         teach.students.push( stu );

    //         teach.save( function( err ) {

    //             if( err ) res.json( err );
    //             res.redirect( '/' );
    //         })
    //     })
    // })
})



app.get( '/destroyall', ( req, res ) => {

    Teacher.deleteMany( {}, function( err ) {

        if ( err ) res.json( err );
    });

    Student.deleteMany( {}, function( err ) {

        if ( err ) res.json( err );
    });

    res.redirect( '/' );
});



app.listen( 3000, () => {

    console.log( "Hunting cobras on 3000" );
});