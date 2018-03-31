require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotfy = require('spotify');
var Request = require('request');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
