var e = document.getElementById("country");
var old = "";

function createLinks(results) {
	if (window.location.href.indexOf("youtube.com/watch")) {
		// iTunes
		if (results[0] !== 0) {
			document.getElementById("apple").disabled = false;
			document.getElementById("apple").addEventListener("click", function(){openLink(0)});
		}
		
		/*// Spotify
		if (results[1] !== 0) {
			document.getElementById("spotify").disabled = false;
			document.getElementById("spotify").addEventListener("click", function(){openLink(1)});
		}*/
	}
}

function openLink(num) {
	switch (num) {
		case 0:
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  				chrome.tabs.sendMessage(tabs[0].id, {text: "apple"}, function(response) {
  				});
			});
			break;
		case 1:
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  				chrome.tabs.sendMessage(tabs[0].id, {text: "spotify"}, function(response) {
  				});
			});
			break;
		case 2:
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  				chrome.tabs.sendMessage(tabs[0].id, {text: "google"}, function(response) {
  				});
			});
	}
}

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	createLinks(message.text);
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {text: "trigger"}, function(response) {
  });
});