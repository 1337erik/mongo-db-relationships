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



// Teacher.create({

//     name : "Anthony",
//     meta : {

//         age     : 18,
//         subject : 'cooking',
//         height  : 72
//     },
//     students : []
// }, function( err, teacher ) {

//     if ( err ) console.log( err );
//     console.log( "Teacher created!", teacher );
// });


/**
 * 
 * This route gets all teachers,
 * it only responds to the '/' route.. so localhost:3000/
 * 
 * its basically the home page
 */
app.get( '/', ( req, res ) => {
    // find all

    Teacher.find( {}, function( err, teachers ) {

        if ( err ) res.json( err );
        res.json( teachers );
    })
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


/*
app.get('/:id', (req, res) => {
    User.findById(req.params.id, function(err, user){
        if (err) {
            res.json(err)
        }
        res.json(user)
    })
})
*/

app.get("/updateall", (req, res) => {
    User.update({name: "Mike"}, 
        {$set: 
            { meta: 
                { age: 24, website: "www.web.site" }
            }
        }, function(err, users) {
        if (err) res.json(err)
        res.json(users)
    })
})

app.get("/updateall", (req, res) => {
    User.findOneAndUpdate({name: "Mike"}, 
        {$set: 
            { meta: 
                { age: 44, website: "test" }
            }
        }, {new: true}, function(err, users) {
        if (err) res.json(err)
        res.json(users)
    })
})

app.get("/delete", (req, res) => {
    User.remove({name: "Emily"}, function(err) {
        if (err) res.json(err);
        res.json({message: "DELETED"})
    })
})

app.get("/destroymike", (req, res) => {
    User.findOneAndRemove({name: "Mike"}, function(err) {
        if (err) res.json(err)
        res .json({message: "DELETED"})
    })
});





app.get( '/destroyall', ( req, res ) => {

    Teacher.deleteMany( {}, function( err ) {

        if ( err ) res.json( err );
    });

    // Student.deleteMany( {}, function( err ) {

    //     if ( err ) res.json( err );
    // });

    res.redirect( '/' );
});




app.listen( 3000, () => {

    console.log( "Hunting cobras on 3000" );
});