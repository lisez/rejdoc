
var page = document.body.innerText;

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
	if (msg.text === 'get_inner_text') {
    	sendResponse(page);
    	return true;
	}
});
