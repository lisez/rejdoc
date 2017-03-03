/* *********************************************
 * @license
 * Copyright (c) 2017-Present lisez <mm4324@gmail.com>
 ***********************************************/

// create a virtual element and select all for copy
function executeCopy(el){
	// create a virtual element
	var tmpArea = document.createElement('textarea');
	document.body.appendChild(tmpArea);
	tmpArea.value = el;

	// focus it and select text 
	tmpArea.focus();
	tmpArea.select();

	// copy that
	document.execCommand('copy');

	// remove the virtual element
	tmpArea.remove();
}