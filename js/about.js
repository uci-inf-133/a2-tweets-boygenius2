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

	// ---- Completed Events ----
	// Filter out tweets by ensuring that the source is a completed event, then map them all into a 1 to reduce that array into a number
	const numCompletedEvents = tweet_array.filter(tweet => tweet.source === "completed_event").map(tweet => tweet = 1).reduce( (total, true_event) => total + true_event, 0);
	const pctCompletedEvents = Math.round((numCompletedEvents / tweet_array.length) * 10000) / 100;
	let completed_events = document.getElementsByClassName('completedEvents');
	for (let i = 0; i < completed_events.length; i++){
		completed_events[i].innerText = numCompletedEvents;
	}

	completed_events = document.getElementsByClassName('completedEventsPct');
	for (let i = 0; i < completed_events.length; i++){
		completed_events[i].innerText = pctCompletedEvents + "%";
	}

	// ---- Live Events ----
	// Filter out tweets by ensuring that the source is a live event, then map them all into a 1 to reduce that array into a number
	const numLiveEvents = tweet_array.filter(tweet => tweet.source === "live_event").map(tweet => tweet = 1).reduce( (total, true_event) => total + true_event, 0);
	const pctLiveEvents = Math.round((numLiveEvents / tweet_array.length) * 10000) / 100;
	let live_events = document.getElementsByClassName('liveEvents');
	for (let i = 0; i < live_events.length; i++){
		live_events[i].innerText = numLiveEvents;
	}

	live_events = document.getElementsByClassName('liveEventsPct');
	for (let i = 0; i < live_events.length; i++){
		live_events[i].innerText = pctLiveEvents + "%";
	}

	// ---- Achievements ----
	// Filter out tweets by ensuring that the source is an achievement, then map them all into a 1 to reduce that array into a number
	const numAchievements = tweet_array.filter(tweet => tweet.source === "achievement").map(tweet => tweet = 1).reduce( (total, true_event) => total + true_event, 0);
	const pctAchievements = Math.round((numAchievements / tweet_array.length) * 10000) / 100;
	let achievements = document.getElementsByClassName('achievements');
	for (let i = 0; i < achievements.length; i++){
		achievements[i].innerText = numAchievements;
	}

	achievements = document.getElementsByClassName('achievementsPct');
	for (let i = 0; i < achievements.length; i++){
		achievements[i].innerText = pctAchievements + "%";
	}

	// ---- Miscellaneous ----
	// Filter out tweets by ensuring that the source isn't any of the three listed above, then map them all into a 1 to reduce that array into a number
	const numMisc = tweet_array.filter(tweet => tweet.source === "miscellaneous").map(tweet => tweet = 1).reduce( (total, true_event) => total + true_event, 0);
	const pctMisc = Math.round((numMisc / tweet_array.length) * 10000) / 100;
	let misc = document.getElementsByClassName('miscellaneous');
	for (let i = 0; i < misc.length; i++){
		misc[i].innerText = numMisc;
	}

	misc = document.getElementsByClassName('miscellaneousPct');
	for (let i = 0; i < misc.length; i++){
		misc[i].innerText = pctMisc + "%";
	}

	// Written text
	const numWrittenTweets = tweet_array.filter(tweet => tweet.written == true).map(tweet => tweet = 1).reduce( (total, true_event) => total + true_event, 0);
	const pctWrittenTweets = Math.round((numWrittenTweets / numCompletedEvents) * 10000) / 100;
	let written_tweets = document.getElementsByClassName('written');
	for (let i = 0; i < written_tweets.length; i++)
	{
		written_tweets[i].innerText = numWrittenTweets;
	}

	written_tweets = document.getElementsByClassName('writtenPct');
	for (let i = 0; i < written_tweets.length; i++)
	{
		written_tweets[i].innerText = pctWrittenTweets + "%";
	}
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});