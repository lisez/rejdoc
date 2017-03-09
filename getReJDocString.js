/* *********************************************
 * @license
 * Copyright (c) 2017-Present lisez <mm4324@gmail.com>
 * All rights reserved. This code is governed by a BSD-style license
 * that can be found in the LICENSE file.
 * version: 1.31
 ***********************************************/

/***************************************
 * Re-layout ROC Judicial doc to easy reuse style.
 * @params {String} input - the content of judicial doc
 ***************************************/
function getReJDocString(input) {
	
	'use strict';
	
	if (typeof input === 'undefined'){return null;}

	var d = input.split('\n'),
		o = '',
		term,
		// breaks rule
		duelBreaks	= function(t){o+="\n"+t+"\n";},
		topBreak	= function(t){o+="\n"+t;},
		btmBreak	= function(t){o+=t+"\n";},
		// regexp
		// Content Columns
		regexASCIITable	= /[\u2500-\u257F]/g,
		regexNav		= /共\d+\s?筆|現在第\d+\s?筆|[第上下一最末]{2}[筆頁]|友善列印|匯出PDF|對於本系統功能有任何建議|有加底線者為可點選之項目|無格式複製|請給予我們建議|^請點這裡並輸入你的[名字\w]+|Olark|留下你的建議|^搜尋$|^登入$|^送出$|分享至[\w\s]+|排版圖示/,
		regexFormalDate	= /^中華民國.+年.+月.+日$/,
		regexTopColumns	= /^【|^裁判[字號日期案由全內文]+|^會議次別|^決議日期|^資料來源|^相關法條|^決議：|^討論事項：|提案：$|^歷審裁判|^解釋[字號日期爭點文理由]+/,
		regexBodyColumns= /^[主文理由犯罪事實及附表件註錄條文要旨：]{2,}$/,
		regexLawArticle = /第[\d、\-]+條\([\d\.]+\)$/,
		regexCaseName	= /^[司法最高臺灣北中高雄福建智慧公務員]{2,}.+[壹貳叁參肆伍陸柒捌玖拾一二三四五六七八九十\u25CB\d]+年度.+字第[壹貳叁參肆伍陸柒捌玖拾一二三四五六七八九十\u25CB\d]+號[裁判定決]*$/,
		regexParities	= /^[先後]?訴?[原被]告|^[法定訴訟]*[代理表]+人|^移送機關|^被付懲戒人|^訴願人|^聲請覆審人|^聲請人|^相對人|^再?抗告人|^被?上訴人|^債[務權]人|^[原審選任]*辯護人|^公訴人|律師$/,
		regexOfficials  = /^.+庭.+[法官審判長]+|^大?法官|^書記官/,
		// Paragraph Tier
		regexTier1		= /^[甲乙丙丁戊己庚辛壬癸子丑寅卯辰巳午未申酉戌亥]+[、說：]+/,
		regexTier2		= /^[壹貳叁參肆伍陸柒捌玖拾一二三四五六七八九十\u25CB\uFF10-\uFF19]+[、說：]+/,
		regexTier3		= /^[(（][一二三四五六七八九十\u25CB\uFF10-\uFF19]+[）)]/,
		regexTier4		= /^[\d\uFF10-\uFF19]+\.\D/,
		regexTier5		= /^[(（][\d\uFF10-\uFF19]+[)）]\D/,
		// Marks
		regexBlankMarks = /\s+|　/g,
		regexAllMarks   = /[，。、！？]+/,
		regexSingleMark = /^[。：？！]$/,
		regexParagraphMarks = /[，。、]+/,
		regexFootMarks  = /[。：！？]$/,
		regexClosureMarks = /[\n\r]+([〉》」』】〕〗〙〛，,)\]])/gim,
		regexBreakMarks = /^[\n\r]+/gim;

	for (var i=0; i<d.length; i++){
		// plain text table: break
		if(regexASCIITable.test(d[i])){duelBreaks(d[i]);continue;}

		// strip out all blanks
		term = d[i].replace(regexBlankMarks, '').trim();

		// site navigation and informations: delete
		if(regexNav.test(term)){continue;}

		// if a sentense's content is a single mark: combine
		// if(/(?:^[\u3000-\u303F\uFF00-\uFF65].+[\u3000-\u303F\uFF00-\uFF65]$)/.test(term)){o+=term;continue;}
		if(regexSingleMark.test(term)){btmBreak(term);continue;}

		// special columns: break
		if( regexFormalDate.test(term)	||
			regexTopColumns.test(term)	||
			regexLawArticle.test(term)	
			){duelBreaks(term);continue;}

		// special columns: break
		if(!regexParagraphMarks.test(term)){
			if(regexCaseName.test(term)){btmBreak(term);continue;}
			if(regexParities.test(term)){duelBreaks(term);continue;}
			if(regexBodyColumns.test(term)){duelBreaks(term);continue;}
			if(regexOfficials.test(term)){duelBreaks(term);continue;}
		}
		
		// paragraph mark: break
		if(regexTier1.test(term) ||
		   regexTier2.test(term) ||
		   regexTier3.test(term) ||
		   regexTier4.test(term) ||
		   regexTier5.test(term)){topBreak(term);continue;}

		// if a sentense has common punctuation marks but not in the foot: combine
		if(regexAllMarks.test(term) && !regexFootMarks.test(term)){o+=term;continue;}
		// if a sentense's foot has general punctuation: break
		if(regexFootMarks.test(term)){btmBreak(term);continue;}
		
		// all others: combine
		o+=term;
	}
	// if first char is close mark or comma: combie
	o = o.replace(regexClosureMarks, "$1");
	// surplus line breaks: delete
	o = o.replace(regexBreakMarks, '');

	return o;
}