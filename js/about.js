function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	

	const options = {
  		day: "numeric",
		year: "numeric",
		month: "long"
	};

	// Map each date in tweet_array to its numerical value, then sort in ascending/descending order and remap these values into Date objects
	const first_date = tweet_array.map(tweet => tweet.time.valueOf()).sort((a, b) => {return a-b;}).map(time => new Date(time))[0].toLocaleDateString("en-US", options);
	const last_date = tweet_array.map(tweet => tweet.time.valueOf()).sort((a, b) => {return b-a;}).map(time => new Date(time))[0].toLocaleDateString("en-US", options);
	document.getElementById('firstDate').innerText = first_date;
	document.getElementById('lastDate').innerText = last_date;
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});