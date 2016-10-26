// =============
// Requirements for NODE application to operate
// =============
require('dotenv').load();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var yelp = require('yelp');
var graph = require('fbgraph');
var twitter = require('twitter');
var http = require('http').Server(app);


app.listen(3000);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

var client1 = new yelp({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_ACCESS_TOKEN_KEY,
  token_secret: process.env.YELP_ACCESS_TOKEN_SECRET,
});

var client2 = new twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// =============
// MIDDLEWARE
// =============

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));


// ===========
// CALLS YELP
// ===========
app.get('/test', function(req,res){
	client1.search({ term: 'little zelda', location: 'New York', limit: 2 })
		.then(function (data) {
		  console.log(data);
		  res.send(data);
		})
		.catch(function (err) {
		  console.error(err);
		});
	 
});

// ===========
// CALLS TWITTER
// ===========

app.get('/search_test', function(req, res){
	var params = {screen_name: 'nodejs', count: 1};
	client2.get('/statuses/user_timeline', params, function(error, tweets, response){
    console.log(tweets);
    res.send(tweets);

	});
})


// client2.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });











