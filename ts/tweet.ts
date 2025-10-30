class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        if (this.text.includes("complete") || this.text.includes("posted")){
            return "completed_event";
        } else if (this.text.toLowerCase().includes("live")){
            return "live_event";
        } else if (this.text.toLowerCase().includes("achieve")){
            return "achievement";
        } else {
            return "miscellaneous";
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        // Removes the hastag and the link
        if (this.source === "completed_event" && this.text.substring(0, this.text.indexOf("#Runkeeper")).substring(0, this.text.indexOf("https://t.co")).trimEnd().includes("Check it out!")){
            return false;
        } else{
            return true;
        }
        
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return "";
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        // Walk
        if (this.text.includes("walk")){
            if (this.text.includes("nordic")){
                return "nordic walk";
            }   
            return "walk";
        } else if (this.text.includes("run")){
            return "run";
        } else if (this.text.includes("hike")){
            return "hike";
        }
        // Workout
        else if (this.text.includes("workout")){
            let index = this.text.indexOf("workout")-2;
            switch (this.text.substring(this.workoutStartIndex(this.text, index), index) ){
                case "elliptical":
                    return "elliptical";
                case "spinning":
                    return "spinning";
                case "circuit":
                    return "circuit";
                case "strength":
                    return "strength";
                case "group":
                    return "group";
                case "CrossFit\u00ae":
                    return "CrossFit\u00ae";
                case "bootcamp":
                    return "bootcamp";
                case "core":
                    return "core";
                case "barre":
                    return "barre";
            }
            return "other workout";
        } else if ((this.text.includes("stairmaster") || this.text.includes("stepwell")) && this.text.includes("workout")){
            return "stairmaster/stepwell";
        } else if (this.text.includes("bike")){
            return "bike";
        } else if (this.text.includes("mtn bike")){
            return "mtn bike";
        } else if (this.text.includes("swim")){
            return "swim";
        } else if (this.text.includes("row")){
            return "row";
        } else if (this.text.includes("MySports Freestyle")){
            return "MySports Freestyle";
        } else if (this.text.includes("ski run") || this.text.includes("ski")){
            return "ski";
        } else if (this.text.includes("yoga")){
            return "yoga";
        } else if (this.text.includes("pilates")){
            return "pilates";
        } else if (this.text.includes("skate")){
            return "skate";
        } else if (this.text.includes("chair ride")){
            return "chair ride";
        } else if (this.text.includes("boxing") || this.text.toUpperCase().includes("MMA")){
            return "boxing";
        } else if (this.text.includes("sports")){
            return "sports";
        } 
        return "other";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        let distance = "";
        for (let i = 0; i < this.text.length; i++){
            if (this.text.charCodeAt(i) >= 48 && this.text.charCodeAt(i) <= 57){
                distance = this.text.slice(i, this.endIndex(this.text, i));
                break;
            }
        }
        
        if (this.text.includes("km")){
            return Math.round((parseFloat(distance) / 1.609) * 100) / 100;
        }
        return parseFloat(distance);
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        // const link_string = this.text.slice(this.text.indexOf("https://t.co"), this.endIndex(this.text, this.text.indexOf("https://t.co")));
        // let fixed_text:string = this.text.slice(0, this.text.indexOf("https://t.co")-1) + "<a href=\"" + link_string + "\">" + link_string + "</a>" + this.text.slice(this.text.indexOf(" #Runkeeper"));
        // return "<tr><td>" + rowNumber + "</td><td>" + this.activityType + "</td><td>" + fixed_text + "</td></tr>\n";

        return "<tr><td>" + rowNumber + "</td><td>" + this.activityType + "</td><td>" + this.text + "</td></tr>\n";
    }

    // Custom function for getting the full distance number of a tweet and for getting the full link included in the tweet
    private endIndex(text:string, index:number):number {
        while (text.charCodeAt(index) != 32){
            index++;
        }
        return index;
    }

    // Custom function for getting the workout type
    private workoutStartIndex(text:string, index:number):number {
        while (text.charCodeAt(index) != 32){
            index--;
        }
        return index;
    }
}