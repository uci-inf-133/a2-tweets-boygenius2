function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	written_tweets = tweet_array.filter(tweet => tweet.written === true).filter(tweet => tweet.source == "completed_event");
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	let input_text = document.getElementById("textFilter");
	input_text.addEventListener("keyup", function(event){
		// Clear the table everytime something is typed
		document.getElementById("tweetTable").innerHTML = "";

		document.getElementById("searchText").innerText = input_text.value;
		if(input_text.value == ""){
			document.getElementById("searchCount").innerText = "0";
			return;
		}
		
		matching_tweets = written_tweets.filter(tweet => tweet.text.search(input_text.value) != -1);
		num_matches = matching_tweets.map(tweet => tweet = 1).reduce( (total, match) => total + match, 0)
		document.getElementById("searchCount").innerText = num_matches;

		// Modify the table
		for (let i = 0; i < num_matches; i++){
			document.getElementById("tweetTable").innerHTML += matching_tweets[i].getHTMLTableRow(i+1);
		}
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});