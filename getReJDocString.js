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
		var term = d[i].replace(/\s|　/g, '').trim();

		// site navigation and informations: delete
		if(/(?:共\d+\s?筆|現在第\d+\s?筆|[第上下一最末]{2}[筆頁]|友善列印|匯出PDF|對於本系統功能有任何建議|有加底線者為可點選之項目|排版圖示)/g.test(term)){o+="\n";continue;}
		if(/(?:無格式複製|請給予我們建議|^請點這裡並輸入你的[名字Eemail]+|OlarkLiveChat|留下你的建議|^搜尋$|^登入$|^送出$)/g.test(term)){o+="\n";continue;}
		
		// if a sentense's content is a single mark: combine
		// if(/(?:^[\u3000-\u303F\uFF00-\uFF65].+[\u3000-\u303F\uFF00-\uFF65]$)/.test(term)){o+=term;continue;}
		if(/(?:^[。：？！]$)/.test(term)){o+=term+"\n";continue;}

		// special columns: break
		if( /(?:^中華民國.+年.+月.+日$)/.test(term)	||
			/(?:^【)/.test(term)						||
			/(?:^裁判[字號日期案由全內文]+|^會議次別|^決議日期|^資料來源|^相關法條|^決議：|^討論事項：|提案：$|^歷審裁判)/.test(term)									 ||
			/(?:第[\d、-]+條\([\d\.]+\)$)/.test(term)	
			){o+="\n"+term+"\n";continue;}

		// special columns: break
		if(!(/(?:[，。、])/gi.test(term))){
			// case name
			if(/(?:^[司法最高臺灣北中高雄福建智慧公務員]{2,}.+[壹貳叁參肆伍陸柒捌玖拾一二三四五六七八九十○\d]+年度.+字第[壹貳叁參肆伍陸柒捌玖拾一二三四五六七八九十○\d]+號[裁判定決]{0,2}$)/.test(term)){o+=term+"\n";continue;}
			
			// parites
			if(/(?:^[先後]?訴?[原被]告|^[法定訴訟]{0,}[代理表]+人|^移送機關|^被付懲戒人|^訴願人|^聲請覆審人|^聲請人|^相對人|^再?抗告人|^被?上訴人|^債[務權]人)/.test(term)){o+="\n"+term+"\n";continue;}
			if(/(?:^[選任]{0,2}辯護人|^公訴人|律師$)/.test(term)){o+="\n"+term+"\n";continue;}
			
			// classical columns
			if(/(?:^[主文理由犯罪事實及附表件註錄條文要旨：]{2,}$)/.test(term)){o+= "\n" + term+"\n";continue;}
			
			// judges and court officials
			if(/(?:^.+庭.+[法官審判長]+|^法官|^書記官)/.test(term)){o+="\n"+term+"\n";continue;}
		}
		
		// paragraph mark: break
		if(/(?:^[甲乙丙丁戊己庚辛壬癸子丑寅卯辰巳午未申酉戌亥]+、|說：)/.test(term)){o+= "\n" + term;continue;}
		if(/(?:^[壹貳叁參肆伍陸柒捌玖拾一二三四五六七八九十○\uFF10-\uFF19]+、|說：)/.test(term)){o+= "\n" + term;continue;}
		if(/(?:^[(（][一二三四五六七八九十○\uFF10-\uFF19]+[）)])/.test(term)){o+= "\n" + term;continue;}
		if(/(?:^[\d\uFF10-\uFF19]+\.\D)/.test(term)){o+= "\n" + term;continue;}
		if(/(?:^[(（][\d\uFF10-\uFF19]+[)）]\D)/.test(term)){o+= "\n" + term;continue;}

		// if a sentense has common punctuation marks but not in the foot: combine
		if(/(?:[，。、！？]+)/gi.test(term) && !(/(?:[。：！？]$)/gi.test(term))){o+=term;continue;}
		
		// if a sentense's foot has general punctuation: break
		if(/(?:[。：！？]$)/gi.test(term)){o+=term+"\n";continue;}
		
		// all others: combine
		o+=term;
	}
	// remove line break wihch more than 2 or alone
	o = o.replace(/^[\n\r]+/gim, '');
	o = o.replace(/[\n\r]{2,}/gim, "\n");

	return o;
}