
//Requires for installed packages and environment variables
require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

//Initializes Spotify and Twitter objects for use in their respective commands
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Gets passed arguments and removes first two extraneous array entries 
var args = process.argv.slice(2);

//Logic for determining which command was requested by the user based on the first argument pass
if (args[0] == "my-tweets") {
    getTweets();
} else if (args[0] == "spotify-this-song") {
    var song = "";
    for (i = 1; i < args.length; i++) {
        song = song + args[i] + " ";
    }
    spotifySong(song);
} else if (args[0] == "movie-this") {
    var movie = "";
    for (i = 1; i < args.length; i++) {
        movie = movie + args[i] + " ";
    }
    getMovie(movie);
} else if (args[0] == "do-what-it-says") {
    randomCommand();
} else {
    console.log("Unrecognized Command.");
}

//Function for getting 20 tweets from attached twitter account
function getTweets() {
    console.log("Fetching tweets...");
    client.get('statuses/user_timeline', function (error, tweets, response) {
        if (!error) {
            tweets.forEach(function (tweet) {
                console.log(tweet.text + " " + tweet.created_at);
            });
        } else {
            console.log(error);
        }
    });
}

//Function for searching Spotify API for passed song
function spotifySong(song) {
    console.log("Fetching song...");
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].external_urls.spotify);
    });
}

//Function for searching OMDB API via request package
function getMovie(movie) {
    console.log("Fetching movie...");
    request('https://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
        if (!error) {
            var output = JSON.parse(body);
            console.log(output.Title);
            console.log(output.Year);
            if (output.Ratings[0].Value) {
                console.log("IMDB Rating: " + output.Ratings[0].Value);
            }
            if (output.Ratings[1]) {
                console.log("Rotten Tomatoes Rating: " + output.Ratings[1].Value);
            }
            console.log(output.Country);
            console.log(output.Language);
            console.log(output.Plot);
            console.log(output.Actors);
        } else {
            console.log(error);
        }
    });
}

//Chooses and executes a random command
function randomCommand() {
    console.log("executing random command");
}