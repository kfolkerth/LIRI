
//Requires for installed packages and environment variables
require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
// var Spotfy = require('spotify');
var Request = require('request');

//Initializes Spotify and Twitter objects for use in their respective commands
// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Gets passed arguments and removes first two extraneous array entries 
var args = process.argv.slice(2);

//Logic for determining which command was requested by the user based on the first argument pass
if (args[0] == "my-tweets") {
    getTweets();
} else if (args[0] == "spotify-this-song") {
    spotifySong();
} else if (args[0] == "movie-this") {
    getMovie();
} else if (args[0] == "do-what-it-says") {
    randomCommand();
} else {
    console.log("Unrecognized Command.");
}

//Function for getting 20 tweets from attached twitter account
function getTweets() {
    client.get('statuses/user_timeline', function (error, tweets, response) {
        if (!error) {
            tweets.forEach(function(tweet) {
                console.log(tweet.text + " " + tweet.created_at); 
            });            
        } else {
            console.log(error);
        }
    });
}

//Function for searching Spotify API for passed song
function spotifySong() {
    console.log("fetching song");
}

//Function for searching OMDB API via request package
function getMovie() {
    console.log("getting movie");
}

//Chooses and executes a random command
function randomCommand() {
    console.log("executing random command");
}