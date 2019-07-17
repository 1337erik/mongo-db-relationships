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


app.get( '/', ( req, res ) => {
    // find all

    Teacher.find( {}, function( err, teachers ) {

        if ( err ) res.json( err );
        res.json( teachers );
    })
});


app.get( '/destroyall', ( req, res ) => {

    Teacher.deleteMany( {}, function( err ) {

        if ( err ) res.json( err );
    });

    res.redirect( '/' );
});


app.get( '/:name', ( req, res ) => {
    // find one

    Teacher.findOne({

        name : req.params.name
    }, function( err, user ) {

        if( err ) res.json( err );
        res.json( user );
    })
});


app.get( '/create/:dillywiddle/:blah?', ( req, res ) => {

    Teacher.create({

        name : req.params.dillywiddle,
        meta : {

            subject : req.params.blah
        }
    }, function( err, teacher ) {

        if( err ) res.json( err );
        res.redirect( '/' );
    })
});


app.get( '/kill/:sasquatch', ( req, res ) => {

    Teacher.deleteOne({

        name : req.params.sasquatch
    }, function( err ) {

        if ( err ) res.json( err );
        res.redirect( '/' );
    })
});


app.get( '/update/:name/:key/:value', ( req, res ) => {


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



app.listen( 3000, () => {

    console.log( "Hunting cobras on 3000" );
});