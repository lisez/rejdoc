/* *********************************************
 * @license
 * Copyright (c) 2017-Present lisez <mm4324@gmail.com>
 * All rights reserved. This code is governed by a BSD-style license
 * that can be found in the LICENSE file.
 * @version 1.11
 ***********************************************/

// get frame/ iframe content by AJAX
function getFrameContent(url){
	var xml = new XMLHttpRequest();
	var res = '';
	var text = xml.onreadystatechange = function(){
		if(xml.readyState == 4){
			res = xml.responseText;
			if(res !='') {
				var pure = getPlainTextHTML(res);
				var regex = /(裁判字號：[\s\n]*([^\n]+))/gim;
				var file = (regex.test(pure))?pure.match(regex)[0].replace(/\s+|裁判字號：/gi,''):'file';
				executeDL(file, getReJDocString(pure));
			};
		}
	};

	xml.open('GET', url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), true);
	xml.send();

}

// create a context menu
chrome.runtime.onInstalled.addListener(function(){
	chrome.contextMenus.create({
		title: '司法文書重排版',
		id: 'relayout-judicial-doc',
		contexts: ['frame', 'page']
	});
	chrome.contextMenus.create({
		title: '無空白複製',
		id: 'no-blank-copy',
		contexts: ['selection']
	});
});

// trigger function
chrome.contextMenus.onClicked.addListener(function(info, tab){
	if(info.menuItemId === 'no-blank-copy'){
		// because the limit of chrome selection text, it returns string with out wrap and line breaks. 
		// Only thing we can do is to replace all the blanks.
		var _term = info.selectionText.replace(/\s+/gim,'');
		executeCopy(_term);
		return true;
	}

	if(info.menuItemId === 'relayout-judicial-doc'){

		if(info.pageUrl.toLowerCase()=='http://jirs.judicial.gov.tw/index.htm'){
			chrome.tabs.executeScript({
				code: '[window.frames[1].document.title, window.frames[1].document.body.innerText]'
			}, function(el) {
				executeDL(el[0][0], getReJDocString(el[0][1]));
			});
			return true;
		}

		if(!info.frameUrl){
			chrome.tabs.executeScript({
				code: '[document.title, document.body.innerText]'
			}, function(el) {
				executeDL(el[0][0], getReJDocString(el[0][1]));
			});
			return true;
		}else{
			getFrameContent(info.frameUrl);
		}
	}
});