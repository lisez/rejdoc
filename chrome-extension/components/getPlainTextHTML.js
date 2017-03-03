/* *********************************************
 * @license
 * Copyright (c) 2017-Present lisez <mm4324@gmail.com>
 ***********************************************/

 // strip out all html tags
function getPlainTextHTML(res){
	res = res.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gim,'');
	res = res.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gim,'');
	res = res.replace(/<!--[\s\S]*?-->/gim,'');
	res = res.replace(/(<([^>]+)>)/gim, '');
	res = res.replace(/^\s+$/gim, '');
	res = res.replace(/(&nbsp;)/gim, '');
	return res;
}