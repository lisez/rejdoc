/* *********************************************
 * @license
 * Copyright (c) 2017-Present lisez <mm4324@gmail.com>
 * All rights reserved. This code is governed by a BSD-style license
 * that can be found in the LICENSE file.
 * version: 1.1
 ***********************************************/

/***************************************
 * Re-layout ROC Judicial doc to easy reuse style.
 * @params {String} input - the content of judicial doc
 ***************************************/
function getReJDocString(input /*@params String*/){
	if(typeof input =='undefined')input='';

	var d = input.split('\n');
	var o = '';

	for(var i=0; i<d.length; i++){

		// plain text table: break
		if(/(?:[\u2500-\u257F])/g.test(d[i])){o+="\n"+d[i]+"\n";continue;}

		// strip out all blanks
		var term = d[i].replace(/\s|\u3000/g, '').trim();

		// site navigation and informations: delete
		if(/(?:\u5171\d+\s?\u7b46|\u73fe\u5728\u7b2c\d+\s?\u7b46|[\u7b2c\u4e0a\u4e0b\u4e00\u6700\u672b]{2}[\u7b46\u9801]|\u53cb\u5584\u5217\u5370|\u532f\u51faPDF|\u5c0d\u65bc\u672c\u7cfb\u7d71\u529f\u80fd\u6709\u4efb\u4f55\u5efa\u8b70|\u6709\u52a0\u5e95\u7dda\u8005\u70ba\u53ef\u9ede\u9078\u4e4b\u9805\u76ee|\u6392\u7248\u5716\u793a)/g.test(term)){o+="\n";continue;}
		if(/(?:\u7121\u683c\u5f0f\u8907\u88fd|\u8acb\u7d66\u4e88\u6211\u5011\u5efa\u8b70|^\u8acb\u9ede\u9019\u88e1\u4e26\u8f38\u5165\u4f60\u7684[\u540d\u5b57Eemail]+|OlarkLiveChat|\u7559\u4e0b\u4f60\u7684\u5efa\u8b70|^\u641c\u5c0b$|^\u767b\u5165$|^\u9001\u51fa$)/g.test(term)){o+="\n";continue;}
		
		// if a sentense's content is a single mark: combine
		// if(/(?:^[\u3000-\u303F\uFF00-\uFF65].+[\u3000-\u303F\uFF00-\uFF65]$)/.test(term)){o+=term;continue;}
		if(/(?:^[\u3002\uff1a\uff1f\uff01]$)/.test(term)){o+=term+"\n";continue;}

		// special columns: break
		if( /(?:^\u4e2d\u83ef\u6c11\u570b.+\u5e74.+\u6708.+\u65e5$)/.test(term)	||
			/(?:^\u3010)/.test(term)						||
			/(?:^\u88c1\u5224[\u5b57\u865f\u65e5\u671f\u6848\u7531\u5168\u5167\u6587]+|^\u6703\u8b70\u6b21\u5225|^\u6c7a\u8b70\u65e5\u671f|^\u8cc7\u6599\u4f86\u6e90|^\u76f8\u95dc\u6cd5\u689d|^\u6c7a\u8b70\uff1a|^\u8a0e\u8ad6\u4e8b\u9805\uff1a|\u63d0\u6848\uff1a$|^\u6b77\u5be9\u88c1\u5224)/.test(term)									 ||
			/(?:\u7b2c[\d\u3001-]+\u689d\([\d\.]+\)$)/.test(term)	
			){o+="\n"+term+"\n";continue;}

		// special columns: break
		if(!(/(?:[\uff0c\u3002\u3001])/gi.test(term))){
			// case name
			if(/(?:^[\u53f8\u6cd5\u6700\u9ad8\u81fa\u7063\u5317\u4e2d\u9ad8\u96c4\u798f\u5efa\u667a\u6167\u516c\u52d9\u54e1]{2,}.+[\u58f9\u8cb3\u53c1\u53c3\u8086\u4f0d\u9678\u67d2\u634c\u7396\u62fe\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u25cb\d]+\u5e74\u5ea6.+\u5b57\u7b2c[\u58f9\u8cb3\u53c1\u53c3\u8086\u4f0d\u9678\u67d2\u634c\u7396\u62fe\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u25cb\d]+\u865f[\u88c1\u5224\u5b9a\u6c7a]{0,2}$)/.test(term)){o+=term+"\n";continue;}
			
			// parites
			if(/(?:^[\u5148\u5f8c]?\u8a34?[\u539f\u88ab]\u544a|^[\u6cd5\u5b9a\u8a34\u8a1f]{0,}[\u4ee3\u7406\u8868]+\u4eba|^\u79fb\u9001\u6a5f\u95dc|^\u88ab\u4ed8\u61f2\u6212\u4eba|^\u8a34\u9858\u4eba|^\u8072\u8acb\u8986\u5be9\u4eba|^\u8072\u8acb\u4eba|^\u76f8\u5c0d\u4eba|^\u518d?\u6297\u544a\u4eba|^\u88ab?\u4e0a\u8a34\u4eba|^\u50b5[\u52d9\u6b0a]\u4eba)/.test(term)){o+="\n"+term+"\n";continue;}
			if(/(?:^[\u9078\u4efb]{0,2}\u8faf\u8b77\u4eba|^\u516c\u8a34\u4eba|\u5f8b\u5e2b$)/.test(term)){o+="\n"+term+"\n";continue;}
			
			// classical columns
			if(/(?:^[\u4e3b\u6587\u7406\u7531\u72af\u7f6a\u4e8b\u5be6\u53ca\u9644\u8868\u4ef6\u8a3b\u9304\u689d\u6587\u8981\u65e8\uff1a]{2,}$)/.test(term)){o+= "\n" + term+"\n";continue;}
			
			// judges and court officials
			if(/(?:^.+\u5ead.+[\u6cd5\u5b98\u5be9\u5224\u9577]+|^\u6cd5\u5b98|^\u66f8\u8a18\u5b98)/.test(term)){o+="\n"+term+"\n";continue;}
		}
		
		// paragraph mark: break
		if(/(?:^[\u7532\u4e59\u4e19\u4e01\u620a\u5df1\u5e9a\u8f9b\u58ec\u7678\u5b50\u4e11\u5bc5\u536f\u8fb0\u5df3\u5348\u672a\u7533\u9149\u620c\u4ea5]+\u3001|\u8aaa\uff1a)/.test(term)){o+= "\n" + term;continue;}
		if(/(?:^[\u58f9\u8cb3\u53c1\u53c3\u8086\u4f0d\u9678\u67d2\u634c\u7396\u62fe\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u25cb\uFF10-\uFF19]+\u3001|\u8aaa\uff1a)/.test(term)){o+= "\n" + term;continue;}
		if(/(?:^[(\uff08][\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u25cb\uFF10-\uFF19]+[\uff09)])/.test(term)){o+= "\n" + term;continue;}
		if(/(?:^[\d\uFF10-\uFF19]+\.\D)/.test(term)){o+= "\n" + term;continue;}
		if(/(?:^[(\uff08][\d\uFF10-\uFF19]+[)\uff09]\D)/.test(term)){o+= "\n" + term;continue;}

		// if a sentense has common punctuation marks but not in the foot: combine
		if(/(?:[\uff0c\u3002\u3001\uff01\uff1f]+)/gi.test(term) && !(/(?:[\u3002\uff1a\uff01\uff1f]$)/gi.test(term))){o+=term;continue;}
		
		// if a sentense's foot has general punctuation: break
		if(/(?:[\u3002\uff1a\uff01\uff1f]$)/gi.test(term)){o+=term+"\n";continue;}
		
		// all others: combine
		o+=term;
	}
	// remove line break wihch more than 2 or alone
	o = o.replace(/^[\n\r]+/gim, '');
	o = o.replace(/[\n\r]{2,}/gim, "\n");

	return o;
}