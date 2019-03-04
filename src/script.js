var results = ["","",""];
var payload = [0,0,0];

function filter(text) {
	var ends = String("[](){}|").split("");
	for (var i = 0; i < ends.length; i++) {
		if (text.indexOf(ends[i]) >= 0) {
			text = text.substr(0, text.indexOf(ends[i]));
		}
	}
	return text.replace("-","").replace(".","").replace("ft", "");
}

async function searchMusic() {
	var filtered = filter(document.getElementsByTagName("yt-formatted-string")[2].innerHTML);
	
	// iTunes
	var xmlHttp = new XMLHttpRequest();
	let promise = new Promise((resolve, reject) => {
		xmlHttp.open("GET", ("https://itunes.apple.com/search?country=US&term=" + encodeURI(filtered)));
		xmlHttp.onload = resolve;
		xmlHttp.send();
	});
	
	let result = await promise;
	results[0] = JSON.parse(xmlHttp.responseText).results[0].trackViewUrl;
	
	
	/*// Spotify
	var xmlHttp2 = new XMLHttpRequest();
	//xmlHttp2.open("GET", "https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize?client_id=b943eb0ec8fc413783ec15b3b9f6f929&response_type=code&redirect_uri=http%3A%2F%2Fhoserswithzeuses.ca", false);
	xmlHttp2.open("GET")
	xmlHttp2.send(null);
	console.log(xmlHttp2.responseText);
	var code = JSON.parse(xmlHttp2.responseText).code;
	
	var xmlHttp3 = new XMLHttpRequest();
	xmlHttp3.open("POST", "https://accounts.spotify.com/api/token", false);
	xmlHttp3.send({"grant_type": "authorization_code", "code": code, "redirect_uri": "http://hoserswithzeuses.ca"});
	var auth = JSON.parse(xmlHttp3.responseText).access_token;
	console.log(auth);
	*/
}

function createPayload() {
	for (var i = 0; i < 3; i++) {
		if (results[i] !== "") {
			payload[i] = 1;
		}
	}
}

chrome.runtime.onMessage.addListener(async function(message,sender,sendResponse){
    if (message.text === "trigger") {
		await searchMusic();
		createPayload();
		console.log(payload[0]);
        chrome.runtime.sendMessage({text: payload});
    }
	if (message.text.includes("apple")) {
		document.getElementsByTagName("video")[0].pause();
		its.detect.openItunes(results[0]);
	}
		/*if (message.text.includes("spotify")) {
		console.log(results[0]);
		its.detect.openItunes(results[0]);
	}*/
});