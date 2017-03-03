/* *********************************************
 * @license
 * Copyright (c) 2017-Present lisez <mm4324@gmail.com>
 * @version 1.0
 ***********************************************/

/* *********************************************
 * Creat file by Blob function and append a virtual for simulating click
 * @params {string} fName    - The name of the file
 * @params {string} fContent - The content of the file
 * @params {string} fType    - The create type of the file, defalut as 'text/plain'
 ***********************************************/
 function executeDL(fName, fContent, fType = 'text/plain'){
 	// create Blob
	var _file= new Blob([fContent], {type: fType});
	var _link= URL.createObjectURL(_file);

	// create a virtual element and select all for copy
	var tmpA = document.createElement('a');
	tmpA.href = _link;
	tmpA.download = fName;
	document.body.appendChild(tmpA);

	// focus it and select text 
	tmpA.focus();
	tmpA.click();

	// remove the virtual element
	tmpA.remove();

	// retrun boolean
	return true;
 }

