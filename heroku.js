const express = require( 'express' );
const path = require( 'path' );
const app = express();

app.set( 'port', ( process.env.PORT || 3000 ) );

app.use( express.static( __dirname + '/target/release' ) );

app.listen( app.get( 'port' ), function() {
    console.log( 'Node app is running on port', app.get( 'port' ) );
} );