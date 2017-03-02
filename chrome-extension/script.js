/* *********************************************
 * @license
 * Copyright (c) 2017-Present lisez <mm4324@gmail.com>
 * All rights reserved. This code is governed by a BSD-style license
 * that can be found in the LICENSE file.
 * @version 1.0rc1
 ***********************************************/

function createBlobFile(bContent, bType='text/plain'){
	var f= new Blob([bContent], {type: bType});
	var l= URL.createObjectURL(f);
	return l;
}

// create a virtual element and select all for copy
function executeClick(link, name){
	// create a virtual element
	var tmpA = document.createElement('a');
	tmpA.href = link;
	tmpA.download = name;
	document.body.appendChild(tmpA);

	// focus it and select text 
	tmpA.focus();
	tmpA.click();

	// remove the virtual element
	tmpA.remove();
}

// get frame/ iframe content by AJAX
function getFrameContent(url){
	var xml = new XMLHttpRequest();
	var res = '';
	var text = xml.onreadystatechange = function(){
		if(xml.readyState == 4){
			res = xml.responseText;
			if(res !='') {
				var pure = getClearText(res);
				var regex = /(裁判字號：[\s\n]*([^\n]+))/gim;
				var file = (regex.test(pure))?pure.match(regex)[0].replace(/\s+|裁判字號：/gi,''):'file';
				initFun(file, pure);
			};
		}
	};

	xml.open('GET', url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), true);
	xml.send();

}

// strip out all html tags
function getClearText(res){
	res = res.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gim,'');
	res = res.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gim,'');
	res = res.replace(/<!--[\s\S]*?-->/gim,'');
	res = res.replace(/(<([^>]+)>)/gim, '');
	res = res.replace(/^\s+$/gim, '');
	res = res.replace(/(&nbsp;)/gim, '');
	return res;
}

// initial function
function initFun(title,page){
	var file = getReJDocString(page);
	var link = createBlobFile(file);
	executeClick(link, title);
}

// create a context menu
chrome.runtime.onInstalled.addListener(function(){
	chrome.contextMenus.create({
		title: '司法文書重排版',
		id: 'relayout-judicial-doc',
		contexts: ['frame', 'page']
	});
});

// trigger function
chrome.contextMenus.onClicked.addListener(function(info, tab){
	if(info.menuItemId === 'relayout-judicial-doc'){
		console.log(info);
		if(info.pageUrl.toLowerCase()=='http://jirs.judicial.gov.tw/index.htm'){
			chrome.tabs.executeScript({
				code: '[window.frames[1].document.title, window.frames[1].document.body.innerText]'
			}, function(el) {
				initFun(el[0][0], el[0][1]);
			});
			return true;
		}

		if(!info.frameUrl){
			chrome.tabs.executeScript({
				code: '[document.title, document.body.innerText]'
			}, function(el) {
				initFun(el[0][0], el[0][1]);
			});
			return true;
		}else{
			getFrameContent(info.frameUrl);
		}
	}
});