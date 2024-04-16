var count = 1;

var dashboardAvaStatusTemp = "{#foreach $T.ul as ul}{#if $T.ul.ut!='nurse'}<div style='width: 100%; height: 28px; display: none;'>	<div	style='display: none; width: 10%; height: 27px; padding-left: 0%; padding-top: 1px; text-align: left;'>		{#if $T.ul.ua=='Y'}<img src='images/ok.png' width='18' height='18'			onclick='' />{#/if}{#if $T.ul.ua=='N'}<img src='images/cancle.png'			width='18' height='18' />{#/if}	</div>	{#if $T.ul.ua=='Y'}	<div		style='display: none; width: 89%; height: 27px; padding-left: 1%; padding-top: 0px; text-align: left; text-decoration: blink;'>{#/if}{#if		$T.ul.ut=='nurse'}Invest. Lab{#/if}{$T.ul.doc_name}</div></div><input type='hidden' style='display: none;' 'value='{$T.ul.ut}' id='{$T.ul.ui}' />{#/if}{#/for}";

function recpChangeAva(picObject, uID) {
	// alert($("#" + uID).val());
	swapIMGForRecp(picObject, uID, $(picObject, "#" + uID).val());

}
function setSplitId() {

	setTimeout(function() {
		var byName = $("#byName").val();
		var arr = byName.split("_");
		$("#byName").val(arr[0]);
		// $("#uID").val(arr[1]);
		// getSalarySlipForEmp(arr[1]);
	}, 500);
}
function setAvaStatus() {
	// alert("on dashboard");

	var inputs = 'action=AvaStatus';

	jQuery.ajax({
		async : true,
		type : "POST",
		data : inputs + "&reqType=AJAX",
		//url : "DashboardServlet",
		url : "./ehat/admindata/fetchAvaStatus",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;

			UsersBean = eval('(' + ajaxResponse + ')');

			$("#AvaContent").setTemplate(dashboardAvaStatusTemp);
			$("#AvaContent").processTemplate(UsersBean);

		}
	});
};

function swap111(picObject, userID, userType) {

	var picObjectValue = picObject.src;
	var bSplit = picObjectValue.split("32");
	var aSplit = bSplit.slice(1);
	// alert(userID);
	if (aSplit == "N.jpg") {

		picObject.src = "images/a32Y.jpg";
		changeToY(userID, userType);

	} else {

		picObject.src = "images/a32N.jpg";
		changeToN(userID, userType);
	}

};
function swapIMGForRecp(picObject, userID, userType) {

	picObject.src = "images/cancle.png";
	changeToN(userID, userType);

};

function changeToY(userID, userType) {

	var inputs = [];
	inputs.push('action=changeToY');
	inputs.push('userID=' + userID);
	inputs.push('userType=' + userType);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DashboardServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;

			// alert(ajaxResponse);
			// setAvaStatus();
		}
	});

};

function changeToN(userID, userType) {
	var inputs = [];
	inputs.push('action=changeToN');
	inputs.push('userID=' + userID);
	inputs.push('userType=' + userType);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DashboardServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;

			// alert(ajaxResponse);
			// setAvaStatus();
			location.reload();
		}
	});

};

function fetchUserAva(userID) {

	var inputs = [];
	inputs.push('action=fetchUserAva');
	inputs.push('userID=' + userID);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DashboardServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;

			// alert(ajaxResponse);
			if (eval('(' + ajaxResponse + ')') == 'Y') {
				var a = 'images/a32Y.jpg';
				$("#image").attr('src', a);
			} else if (eval('(' + ajaxResponse + ')') == 'N') {
				var b = 'images/a32N.jpg';

				$("#image").attr('src', b);
			} else {
				var a = 'images/a32Y.jpg';
				$("#image").attr('src', a);

			}
		}
	});

}

// Common document ready function
$(document).ready(function() {
	try {
		$("body").css("cursor", 'default');
		$(document).css("cursor", 'default');
	} catch (e) {
	}

	try {
		$.unblockUI();
	} catch (e) {
	}
	if (window.initLogOut)
		initLogOut();
});

function initTemplate() {

}

function getBedAvaDashboard(hallID) {

	var inputs = [];
	inputs.push('action=GetBedAva');
	inputs.push('hallID=' + hallID);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				//type : "POST",
				type : "GET",
				data : str + "&reqType=AJAX",
				//url : "BedsServlet",
				url : "./ehat/ipd/getAvailableBed",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
				},
				success : function(r) {
					var ajaxResponse =  r ;
				//	$("#allBedObj").val(ajaxResponse);
					//alert(JSON.stringify(r));
					//var pobj1 = eval('(' + ajaxResponse + ')');
					//var pobj1 = r;
					var bedNames = '';
					var bedTotal = '';
					var bedOccupied = '';
					var bedVacBtUnavl = '';
					var bedTotUnAvl = '';
					var bedAvlWait = '';
					var bedTotAvl = '';
					var totalPatient = 0;
					
					for ( var i = 0; i < ajaxResponse.lstChargesSlave.length; i++) {
						
						var bclean = ajaxResponse.lstChargesSlave[i].cleaningCount;
						var bedsAvail = ajaxResponse.lstChargesSlave[i].deallocateCount;
						var bedsUnAvail = ajaxResponse.lstChargesSlave[i].allocateCount;
						var total = ajaxResponse.lstChargesSlave[i].noOfBeds;
						var bedsPer = 0;
                      
						
						total=ajaxResponse.lstChargesSlave[i].noOfBeds;
						bedsUnAvail=ajaxResponse.lstChargesSlave[i].allocateCount;
						bedsPer = (parseInt(bedsUnAvail) / parseInt(total)) * 100;
						//bedsPer = ( r.lstChargesSlave[int].allocateCount) / parseInt(r.lstChargesSlave[int].noOfBeds)) * 100;

					
						if (isNaN(bedsPer)) {
							bedsPer = 0;
						}

						
						var vacUnavl = bclean;

						bedNames = bedNames
								+ '<td class="col-md-2-1 text-center"><div id="dash_pie_'
								+ i
								+ '" class="piechart" data-percent="'
								+ bedsPer
								+ '"> <span class="percent"></span></div>	<span id="bedName">'
								+ ajaxResponse.lstChargesSlave[i].categoryName + '</span></td>';

						bedTotal = bedTotal
								+ '<td class="col-md-2-1 text-center">' + ajaxResponse.lstChargesSlave[i].noOfBeds
								+ '</td>';

					/*	bedOccupied = bedOccupied
								+ '<td class="col-md-2-1 text-center">'
								+ bedsUnAvail + '</td>';*/
						
							bedOccupied = bedOccupied
						+ '<td class="col-md-2-1 text-center">'
						+  ajaxResponse.lstChargesSlave[i].allocateCount + '</td>';

					/*	bedVacBtUnavl = bedVacBtUnavl
								+ '<td class="col-md-2-1 text-center">'
								+ vacUnavl + '</td>';*/
							
							bedVacBtUnavl = bedVacBtUnavl
							+ '<td class="col-md-2-1 text-center">'
							+ajaxResponse.lstChargesSlave[i].cleaningCount + '</td>';

						/*bedTotUnAvl = bedTotUnAvl
								+ '<td class="col-md-2-1 text-center">'
								+ (bedsUnAvail + vacUnavl) + '</td>';*/
							
							bedTotUnAvl = bedTotUnAvl
							+ '<td class="col-md-2-1 text-center">'
							+ ajaxResponse.lstChargesSlave[i].allocateCount + '</td>';

					/*	bedAvlWait = bedAvlWait
								+ '<td class="col-md-2-1 text-center">'
								+ bclean + '</td>';*/
						
						bedAvlWait = bedAvlWait
						+ '<td class="col-md-2-1 text-center">'
						+ ajaxResponse.lstChargesSlave[i].cleaningCount + '</td>';

						/*bedTotAvl = bedTotAvl
								+ '<td class="col-md-2-1 text-center">'
								+ bedsAvail + '</td>';*/
						
						bedTotAvl = bedTotAvl
						+ '<td class="col-md-2-1 text-center">'
						+ ajaxResponse.lstChargesSlave[i].deallocateCount  + '</td>';

					
						totalPatient += bedsUnAvail;

					}
					
					$("#bedAccupiedPer").html(bedNames);
					$("#bedTotals").html(bedTotal);
					$("#bedOccuppieds").html(bedOccupied);
					$("#bedVacBtUnavl").html(bedVacBtUnavl);
					$("#bedTotUnAvl").html(bedTotUnAvl);
					$("#bedAvlWait").html(bedAvlWait);
					$("#bedTotAvl").html(bedTotAvl);

					var colors = Array("#fb2900", "#ff7800", "#fff43b",
							"#8dfa30", "#01c86a", "#00d7b2", "#0092e3",
							"#002f7e", "#390e73", "#5D8AA8", "#ED9121",
							"#E52B50", "#A4C639", "#FBCEB1", "#4B5320",
							"#3B444B", "#89CFF0", "#A1CAF1", "#F5F5DC",
							"#BF94E4", "#08E8DE", "#004225", "#800020");

					for ( var i = 0; i < ajaxResponse.lstChargesSlave.length; i++) {
						$('#dash_pie_' + i).easyPieChart(
								{
									easing : 'easeOutBounce',
									onStep : function(from, to, percent) {
										$(this.el).find('.percent').text(
												Math.round(percent) + "%");
									},
									lineWidth : 6,
									barColor : colors[i]
								});

						window.chart = $('#dash_pie_1').data('easyPieChart');
					}

					

				} 
			});
}

function getIPDNoBedPatientCount() { // "Class = DisplayDefPatientUtil"
	var inputs = [];
	inputs.push('action=fetchIPDPatientsForBedward');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			patientBean = eval('(' + ajaxResponse + ')');

			$("#IPDQueueCountNoBedPatient").html((patientBean.pl.length));

		}
	});
}

function getOPDPatientCount() { 
	var inputs = [];
	inputs.push('action=fetchOPDPatientCount');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			patientBean = eval('(' + ajaxResponse + ')');
			
			var opdcount = patientBean.trid;
			var patcount = patientBean.pi;
			$("#OPDQueueCountWithConsultant").html(opdcount);
			$("#OPDQueueCount").html(patcount);
		}
	});
}

function getCurrentUserDetails() { 
	var inputs = [];
	inputs.push('action=fetchCurrentUserDetails');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var result = r;
			patientBean = eval('(' + result + ')');
			$("#lastLogInOut").html(patientBean.last_loged_in_date_time+" / "+patientBean.last_loged_out_date_time);
			$("#currentLogInOut").html(patientBean.current_loged_in_date_time);
		}
	});
}

function viewPatientCount(callFrom) { 
	var inputs = [];
	inputs.push('action=fetchPatientCountForDashboard');
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var result = r;
			patientBean = eval('(' + result + ')');
			if (callFrom == 'er') {
				$("#ERQueueCount").html(patientBean.pi);
			}else if (callFrom == 'diagnosis') {
				$("#DIAGQueueCount").html(patientBean.pi);
			}
		}
	});
}

var opdConsultantTemplate = "{#foreach $T.dl as dl}<tr><td class='col-md-1-1 center'>{count++}</td><td class='col-md-4-1'>{$T.dl.dn}</td><td class='col-md-3-1'>{$T.dl.sp}</td></tr>{#/for}";
function getOPDConsultantDetails() { 

	var d = new Date();
	var weekday = new Array(7);
	weekday[0]=  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

	var today = weekday[d.getDay()]; 
	
	var inputs = [];
	inputs.push('action=fetchOPDConsultantDetails');
	inputs.push('today='+ today);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var result = r;
			var count = 1;
			UsersBean = eval('(' + result + ')');
			$("#opdConsultant").setTemplate(opdConsultantTemplate);
			$("#opdConsultant").processTemplate(UsersBean);

		}
	});
}

/***
 * @Author: Tushar
 * Code For: DashBoard For HealthBay
 * Date: 02 Nov 2016
 ***/

/*var opdConsultantTemplate1 = "{#foreach $T.dl as dl}<tr><td>{count++}</td><td class='col-md-1-1'>{$T.dl.sp}</td>" +
		"<td class='col-md-1-1'>{$T.dl.dn}</td><td class='col-md-1-1'>{$T.dl.qualification}</td><td class='col-md-1-1'>{$T.dl.mb}</td>" +
		"<td class='col-md-1-1 center'>{$T.dl.sunMorningStart}-{$T.dl.sunMorningEnd}<br>{$T.dl.sunAfternoonStart}-{$T.dl.sunAfternoonEnd}<br>{$T.dl.sunEverningStart}-{$T.dl.sunEverningEnd}</td>" +
		"<td class='col-md-1-1 center'>{$T.dl.monMorningStart}-{$T.dl.monMorningEnd}<br>{$T.dl.monAfternoonStart}-{$T.dl.monAfternoonEnd}<br>{$T.dl.monEverningStart}-{$T.dl.monEverningEnd}</td>" +
		"<td class='col-md-1-1 center'>{$T.dl.tueMorningStart}-{$T.dl.tueMorningEnd}<br>{$T.dl.tueAfternoonStart}-{$T.dl.tueAfternoonEnd}<br>{$T.dl.tueEverningStart}-{$T.dl.tueEverningEnd}</td>" +
		"<td class='col-md-1-1 center'>{$T.dl.wedMorningStart}-{$T.dl.wedMorningEnd}<br>{$T.dl.wedAfternoonStart}-{$T.dl.wedAfternoonEnd}<br>{$T.dl.wedEverningStart}-{$T.dl.wedEverningEnd}</td>" +
		"<td class='col-md-1-1 center'>{$T.dl.thiMorningStart}-{$T.dl.thiMorningEnd}<br>{$T.dl.thiAfternoonStart}-{$T.dl.thiAfternoonEnd}<br>{$T.dl.thiEverningStart}-{$T.dl.thiEverningEnd}</td>" +
		"<td class='col-md-1-1 center'>{$T.dl.friMorningStart}-{$T.dl.friMorningEnd}<br>{$T.dl.friAfternoonStart}-{$T.dl.friAfternoonEnd}<br>{$T.dl.friEverningStart}-{$T.dl.friEverningEnd}</td>" +
		"<td class='col-md-1-1 center'>{$T.dl.satMorningStart}-{$T.dl.satMorningEnd}<br>{$T.dl.satAfternoonStart}-{$T.dl.satAfternoonEnd}<br>{$T.dl.satEverningStart}-{$T.dl.satEverningEnd}</td></tr>{#/for}";*/

function getOPDConsultantDetails1() { 
	var dataspl;
	/*__________________Fetching specialization______________*/
	var inputs = [];
	inputs.push('action=fetchDoctorSpecilizations');

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		success : function(r) {
			dataspl = eval('(' + r + ')');
		}
	});
	/*__________________Fetching specialization______________*/
	var d = new Date();
	var weekday = new Array(7);
	weekday[0]=  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

	var today = weekday[d.getDay()]; 
	var inputs = [];
	inputs.push('action=fetchOPDConsultantDetails1');
	inputs.push('today='+ today);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			var result = r;
			var data = eval('(' + result + ')');
			var html = '';
			/*$("#opdConsultant1").setTemplate(opdConsultantTemplate1);
			$("#opdConsultant1").processTemplate(UsersBean);*/
			
			for ( var int = 0; int < dataspl.liSplz.length; int++) {
				var splzNm = dataspl.liSplz[int].splzNm;
				var splzId = dataspl.liSplz[int].splzId;
				
				html = html + '<tr style="background: #D3D3D3;">';
				html = html + '<td><B>'+(int+1)+'<B></td>';
				html = html + '<td colspan="11"><B>'+splzNm+'</B></td>';
				html = html + '</tr>';
				var count = 1;
				for ( var i = 0; i < data.dl.length; i++) {
					
					var Specialisation = data.dl[i].sp;	
					var Doc_name = data.dl[i].dn;
					var Qualification = data.dl[i].qualification;
					var MobileNo = data.dl[i].mb;
					
					var SunMorningStart = data.dl[i].sunMorningStart;
					var MonMorningStart =data.dl[i].monMorningStart;
					var TueMorningStart = data.dl[i].tueMorningStart;
					var WedMorningStart = data.dl[i].wedMorningStart;
					var ThiMorningStart = data.dl[i].thiMorningStart;
					var FriMorningStart = data.dl[i].friMorningStart;
					var SatMorningStart = data.dl[i].satMorningStart;
					
					var SunMorningEnd = data.dl[i].sunMorningEnd;
					var MonMorningEnd =data.dl[i].monMorningEnd;
					var TueMorningEnd = data.dl[i].tueMorningEnd;
					var WedMorningEnd = data.dl[i].wedMorningEnd;
					var ThiMorningEnd = data.dl[i].thiMorningEnd;
					var FriMorningEnd = data.dl[i].friMorningEnd;
					var SatMorningEnd = data.dl[i].satMorningEnd;
					
					var SunAfternoonStart = data.dl[i].sunAfternoonStart;
					var MonAfternoonStart =data.dl[i].monAfternoonStart;
					var TueAfternoonStart = data.dl[i].tueAfternoonStart;
					var WedAfternoonStart = data.dl[i].wedAfternoonStart;
					var ThiAfternoonStart = data.dl[i].thiAfternoonStart;
					var FriAfternoonStart = data.dl[i].friAfternoonStart;
					var SatAfternoonStart = data.dl[i].satAfternoonStart;
					
					var SunAfternoonEnd = data.dl[i].sunAfternoonEnd;
					var MonAfternoonEnd =data.dl[i].monAfternoonEnd;
					var TueAfternoonEnd = data.dl[i].tueAfternoonEnd;
					var WedAfternoonEnd = data.dl[i].wedAfternoonEnd;
					var ThiAfternoonEnd = data.dl[i].thiAfternoonEnd;
					var FriAfternoonEnd = data.dl[i].friAfternoonEnd;
					var SatAfternoonEnd = data.dl[i].satAfternoonEnd;
					
					var SunEverningStart = data.dl[i].sunEverningStart;
					var MonEverningStart =data.dl[i].monEverningStart;
					var TueEverningStart = data.dl[i].tueEverningStart;
					var WedEverningStart = data.dl[i].wedEverningStart;
					var ThiEverningStart = data.dl[i].thiEverningStart;
					var FriEverningStart = data.dl[i].friEverningStart;
					var SatEverningStart = data.dl[i].satEverningStart;
					
					var SunEverningEnd = data.dl[i].sunEverningEnd;
					var MonEverningEnd =data.dl[i].monEverningEnd;
					var TueEverningEnd = data.dl[i].tueEverningEnd;
					var WedEverningEnd = data.dl[i].wedEverningEnd;
					var ThiEverningEnd = data.dl[i].thiEverningEnd;
					var FriEverningEnd = data.dl[i].friEverningEnd;
					var SatEverningEnd = data.dl[i].satEverningEnd;
					
					if (parseInt(Specialisation) == splzId) {
						
						html = html + '<tr>';
						html = html + '<td> </td>';
						html = html + '<td class="col-md-1-1" >'+(count)+'</td>';
						html = html + '<td class="col-md-1-1 " >'+(Doc_name)+'</td>';
						html = html + '<td class="col-md-1-1" >'+(Qualification)+'</td>';
						html = html + '<td class="col-md-1-1" >'+(MobileNo)+'</td>';
						html = html + '<td class="col-md-1-1 center" >'+(SunMorningStart)+'-'+(SunMorningEnd)+'<br>'+(SunAfternoonStart)+'-'+(SunAfternoonEnd)+'<br>'+(SunEverningStart)+'-'+(SunEverningEnd)+'</td>';
						html = html + '<td class="col-md-1-1 center" >'+(MonMorningStart)+'-'+(MonMorningEnd)+'<br>'+(MonAfternoonStart)+'-'+(MonAfternoonEnd)+'<br>'+(MonEverningStart)+'-'+(MonEverningEnd)+'</td>';
						html = html + '<td class="col-md-1-1 center" >'+(TueMorningStart)+'-'+(TueMorningEnd)+'<br>'+(TueAfternoonStart)+'-'+(TueAfternoonEnd)+'<br>'+(TueEverningStart)+'-'+(TueEverningEnd)+'</td>';
						html = html + '<td class="col-md-1-1 center" >'+(WedMorningStart)+'-'+(WedMorningEnd)+'<br>'+(WedAfternoonStart)+'-'+(WedAfternoonEnd)+'<br>'+(WedEverningStart)+'-'+(WedEverningEnd)+'</td>';
						html = html + '<td class="col-md-1-1 center" >'+(ThiMorningStart)+'-'+(ThiMorningEnd)+'<br>'+(ThiAfternoonStart)+'-'+(ThiAfternoonEnd)+'<br>'+(ThiEverningStart)+'-'+(ThiEverningEnd)+'</td>';
						html = html + '<td class="col-md-1-1 center" >'+(FriMorningStart)+'-'+(FriMorningEnd)+'<br>'+(FriAfternoonStart)+'-'+(FriAfternoonEnd)+'<br>'+(FriEverningStart)+'-'+(FriEverningEnd)+'</td>';
						html = html + '<td class="col-md-1-1 center" >'+(SatMorningStart)+'-'+(SatMorningEnd)+'<br>'+(SatAfternoonStart)+'-'+(SatAfternoonEnd)+'<br>'+(SatEverningStart)+'-'+(SatEverningEnd)+'</td>';
						html = html + '</tr>';
						count++;
					}
				}
			}
			$("#opdConsultant1").html(html);
		}
	});
}




/*
 * !function(t,e,i){!function(t){"function"==typeof
 * define&&define.amd?define(["jquery"],t):jQuery&&!jQuery.fn.sparkline&&t(jQuery)}(function(s){"use
 * strict";var
 * n,a,o,r,h,l,u,c,d,p,f,g,m,v,b,_,y,w,x,C,k,M,D,S,T,I,P,H,R,A,z,W,F={},E=0;n=function(){return{common:{type:"line",lineColor:"#00f",fillColor:"#cdf",defaultPixelsPerValue:3,width:"auto",height:"auto",composite:!1,tagValuesAttribute:"values",tagOptionsPrefix:"spark",enableTagOptions:!1,enableHighlight:!0,highlightLighten:1.4,tooltipSkipNull:!0,tooltipPrefix:"",tooltipSuffix:"",disableHiddenCheck:!1,numberFormatter:!1,numberDigitGroupCount:3,numberDigitGroupSep:",",numberDecimalMark:".",disableTooltips:!1,disableInteraction:!1},line:{spotColor:"#f80",highlightSpotColor:"#5f5",highlightLineColor:"#f22",spotRadius:1.5,minSpotColor:"#f80",maxSpotColor:"#f80",lineWidth:1,normalRangeMin:i,normalRangeMax:i,normalRangeColor:"#ccc",drawNormalOnTop:!1,chartRangeMin:i,chartRangeMax:i,chartRangeMinX:i,chartRangeMaxX:i,tooltipFormat:new
 * o('<span style="color: {{color}}">&#9679;</span>
 * {{prefix}}{{y}}{{suffix}}')},bar:{barColor:"#3366cc",negBarColor:"#f44",stackedBarColor:["#3366cc","#dc3912","#ff9900","#109618","#66aa00","#dd4477","#0099c6","#990099"],zeroColor:i,nullColor:i,zeroAxis:!0,barWidth:4,barSpacing:1,chartRangeMax:i,chartRangeMin:i,chartRangeClip:!1,colorMap:i,tooltipFormat:new
 * o('<span style="color: {{color}}">&#9679;</span>
 * {{prefix}}{{value}}{{suffix}}')},tristate:{barWidth:4,barSpacing:1,posBarColor:"#6f6",negBarColor:"#f44",zeroBarColor:"#999",colorMap:{},tooltipFormat:new
 * o('<span style="color: {{color}}">&#9679;</span>
 * {{value:map}}'),tooltipValueLookups:{map:{"-1":"Loss",0:"Draw",1:"Win"}}},discrete:{lineHeight:"auto",thresholdColor:i,thresholdValue:0,chartRangeMax:i,chartRangeMin:i,chartRangeClip:!1,tooltipFormat:new
 * o("{{prefix}}{{value}}{{suffix}}")},bullet:{targetColor:"#f33",targetWidth:3,performanceColor:"#33f",rangeColors:["#d3dafe","#a8b6ff","#7f94ff"],base:i,tooltipFormat:new
 * o("{{fieldkey:fields}} -
 * {{value}}"),tooltipValueLookups:{fields:{r:"Range",p:"Performance",t:"Target"}}},pie:{offset:0,sliceColors:["#3366cc","#dc3912","#ff9900","#109618","#66aa00","#dd4477","#0099c6","#990099"],borderWidth:0,borderColor:"#000",tooltipFormat:new
 * o('<span style="color: {{color}}">&#9679;</span> {{value}}
 * ({{percent.1}}%)')},box:{raw:!1,boxLineColor:"#000",boxFillColor:"#cdf",whiskerColor:"#000",outlierLineColor:"#333",outlierFillColor:"#fff",medianColor:"#f00",showOutliers:!0,outlierIQR:1.5,spotRadius:1.5,target:i,targetColor:"#4a2",chartRangeMax:i,chartRangeMin:i,tooltipFormat:new
 * o("{{field:fields}}:
 * {{value}}"),tooltipFormatFieldlistKey:"field",tooltipValueLookups:{fields:{lq:"Lower
 * Quartile",med:"Median",uq:"Upper Quartile",lo:"Left Outlier",ro:"Right
 * Outlier",lw:"Left Whisker",rw:"Right Whisker"}}}}},I='.jqstooltip { position:
 * absolute;left: 0px;top: 0px;display: none;background: rgb(0, 0, 0)
 * transparent;background-color:
 * rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000,
 * endColorstr=#99000000);-ms-filter:
 * "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000,
 * endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align:
 * left;white-space: nowrap;padding: 5px 5px 15px 5px;border: 1px solid
 * white;min-width: 30pxmin-height: 30pxz-index: 10000;}.jqsfield { color:
 * white;font: 10px arial, san serif;text-align: left;}',a=function(){var
 * t,e;return
 * t=function(){this.init.apply(this,arguments)},arguments.length>1?(arguments[0]?(t.prototype=s.extend(new
 * arguments[0],arguments[arguments.length-1]),t._super=arguments[0].prototype):t.prototype=arguments[arguments.length-1],arguments.length>2&&(e=Array.prototype.slice.call(arguments,1,-1),e.unshift(t.prototype),s.extend.apply(s,e))):t.prototype=arguments[0],t.prototype.cls=t,t},s.SPFormatClass=o=a({fre:/\{\{([\w.]+?)(:(.+?))?\}\}/g,precre:/(\w+)\.(\d+)/,init:function(t,e){this.format=t,this.fclass=e},render:function(t,e,s){var
 * n,a,o,r,h,l=this,u=t;return this.format.replace(this.fre,function(){var
 * t;return
 * a=arguments[1],o=arguments[3],n=l.precre.exec(a),n?(h=n[2],a=n[1]):h=!1,r=u[a],r===i?"":o&&e&&e[o]?(t=e[o],t.get?e[o].get(r)||r:e[o][r]||r):(d(r)&&(r=s.get("numberFormatter")?s.get("numberFormatter")(r):v(r,h,s.get("numberDigitGroupCount"),s.get("numberDigitGroupSep"),s.get("numberDecimalMark"))),r)})}}),s.spformat=function(t,e){return
 * new o(t,e)},r=function(t,e,i){return e>t?e:t>i?i:t},h=function(t,i){var
 * s;return
 * 2===i?(s=e.floor(t.length/2),t.length%2?t[s]:(t[s-1]+t[s])/2):t.length%2?(s=(t.length*i+i)/4,s%1?(t[e.floor(s)]+t[e.floor(s)-1])/2:t[s-1]):(s=(t.length*i+2)/4,s%1?(t[e.floor(s)]+t[e.floor(s)-1])/2:t[s-1])},l=function(t){var
 * e;switch(t){case"undefined":t=i;break;case"null":t=null;break;case"true":t=!0;break;case"false":t=!1;break;default:e=parseFloat(t),t==e&&(t=e)}return
 * t},u=function(t){var e,i=[];for(e=t.length;e--;)i[e]=l(t[e]);return
 * i},c=function(t,e){var
 * i,s,n=[];for(i=0,s=t.length;s>i;i++)t[i]!==e&&n.push(t[i]);return
 * n},d=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},v=function(t,e,i,n,a){var
 * o,r;for(t=(e===!1?parseFloat(t).toString():t.toFixed(e)).split(""),o=(o=s.inArray(".",t))<0?t.length:o,o<t.length&&(t[o]=a),r=o-i;r>0;r-=i)t.splice(r,0,n);return
 * t.join("")},p=function(t,e,i){var
 * s;for(s=e.length;s--;)if((!i||null!==e[s])&&e[s]!==t)return!1;return!0},f=function(t){var
 * e,i=0;for(e=t.length;e--;)i+="number"==typeof t[e]?t[e]:0;return
 * i},m=function(t){return s.isArray(t)?t:[t]},g=function(e){var
 * i;t.createStyleSheet?t.createStyleSheet().cssText=e:(i=t.createElement("style"),i.type="text/css",t.getElementsByTagName("head")[0].appendChild(i),i["string"==typeof
 * t.body.style.WebkitAppearance?"innerText":"innerHTML"]=e)},s.fn.simpledraw=function(e,n,a,o){var
 * r,h;if(a&&(r=this.data("_jqs_vcanvas")))return
 * r;if(s.fn.sparkline.canvas===!1)return!1;if(s.fn.sparkline.canvas===i){var
 * l=t.createElement("canvas");if(l.getContext&&l.getContext("2d"))s.fn.sparkline.canvas=function(t,e,i,s){return
 * new A(t,e,i,s)};else{if(!t.namespaces||t.namespaces.v)return
 * s.fn.sparkline.canvas=!1,!1;t.namespaces.add("v","urn:schemas-microsoft-com:vml","#default#VML"),s.fn.sparkline.canvas=function(t,e,i){return
 * new z(t,e,i)}}}return
 * e===i&&(e=s(this).innerWidth()),n===i&&(n=s(this).innerHeight()),r=s.fn.sparkline.canvas(e,n,this,o),h=s(this).data("_jqs_mhandler"),h&&h.registerCanvas(r),r},s.fn.cleardraw=function(){var
 * t=this.data("_jqs_vcanvas");t&&t.reset()},s.RangeMapClass=b=a({init:function(t){var
 * e,i,s=[];for(e in t)t.hasOwnProperty(e)&&"string"==typeof
 * e&&e.indexOf(":")>-1&&(i=e.split(":"),i[0]=0===i[0].length?-1/0:parseFloat(i[0]),i[1]=0===i[1].length?1/0:parseFloat(i[1]),i[2]=t[e],s.push(i));this.map=t,this.rangelist=s||!1},get:function(t){var
 * e,s,n,a=this.rangelist;if((n=this.map[t])!==i)return
 * n;if(a)for(e=a.length;e--;)if(s=a[e],s[0]<=t&&s[1]>=t)return s[2];return
 * i}}),s.range_map=function(t){return new b(t)},_=a({init:function(t,e){var
 * i=s(t);this.$el=i,this.options=e,this.currentPageX=0,this.currentPageY=0,this.el=t,this.splist=[],this.tooltip=null,this.over=!1,this.displayTooltips=!e.get("disableTooltips"),this.highlightEnabled=!e.get("disableHighlight")},registerSparkline:function(t){this.splist.push(t),this.over&&this.updateDisplay()},registerCanvas:function(t){var
 * e=s(t.canvas);this.canvas=t,this.$canvas=e,e.mouseenter(s.proxy(this.mouseenter,this)),e.mouseleave(s.proxy(this.mouseleave,this)),e.click(s.proxy(this.mouseclick,this))},reset:function(t){this.splist=[],this.tooltip&&t&&(this.tooltip.remove(),this.tooltip=i)},mouseclick:function(t){var
 * e=s.Event("sparklineClick");e.originalEvent=t,e.sparklines=this.splist,this.$el.trigger(e)},mouseenter:function(e){s(t.body).unbind("mousemove.jqs"),s(t.body).bind("mousemove.jqs",s.proxy(this.mousemove,this)),this.over=!0,this.currentPageX=e.pageX,this.currentPageY=e.pageY,this.currentEl=e.target,!this.tooltip&&this.displayTooltips&&(this.tooltip=new
 * y(this.options),this.tooltip.updatePosition(e.pageX,e.pageY)),this.updateDisplay()},mouseleave:function(){s(t.body).unbind("mousemove.jqs");var
 * e,i,n=this.splist,a=n.length,o=!1;for(this.over=!1,this.currentEl=null,this.tooltip&&(this.tooltip.remove(),this.tooltip=null),i=0;a>i;i++)e=n[i],e.clearRegionHighlight()&&(o=!0);o&&this.canvas.render()},mousemove:function(t){this.currentPageX=t.pageX,this.currentPageY=t.pageY,this.currentEl=t.target,this.tooltip&&this.tooltip.updatePosition(t.pageX,t.pageY),this.updateDisplay()},updateDisplay:function(){var
 * t,e,i,n,a,o=this.splist,r=o.length,h=!1,l=this.$canvas.offset(),u=this.currentPageX-l.left,c=this.currentPageY-l.top;if(this.over){for(i=0;r>i;i++)e=o[i],n=e.setRegionHighlight(this.currentEl,u,c),n&&(h=!0);if(h){if(a=s.Event("sparklineRegionChange"),a.sparklines=this.splist,this.$el.trigger(a),this.tooltip){for(t="",i=0;r>i;i++)e=o[i],t+=e.getCurrentRegionTooltip();this.tooltip.setContent(t)}this.disableHighlight||this.canvas.render()}null===n&&this.mouseleave()}}}),y=a({sizeStyle:"position:
 * static !important;display: block !important;visibility: hidden
 * !important;float: left !important;",init:function(e){var
 * i,n=e.get("tooltipClassname","jqstooltip"),a=this.sizeStyle;this.container=e.get("tooltipContainer")||t.body,this.tooltipOffsetX=e.get("tooltipOffsetX",10),this.tooltipOffsetY=e.get("tooltipOffsetY",12),s("#jqssizetip").remove(),s("#jqstooltip").remove(),this.sizetip=s("<div/>",{id:"jqssizetip",style:a,"class":n}),this.tooltip=s("<div/>",{id:"jqstooltip","class":n}).appendTo(this.container),i=this.tooltip.offset(),this.offsetLeft=i.left,this.offsetTop=i.top,this.hidden=!0,s(window).unbind("resize.jqs
 * scroll.jqs"),s(window).bind("resize.jqs
 * scroll.jqs",s.proxy(this.updateWindowDims,this)),this.updateWindowDims()},updateWindowDims:function(){this.scrollTop=s(window).scrollTop(),this.scrollLeft=s(window).scrollLeft(),this.scrollRight=this.scrollLeft+s(window).width(),this.updatePosition()},getSize:function(t){this.sizetip.html(t).appendTo(this.container),this.width=this.sizetip.width()+12,this.height=this.sizetip.height(),this.sizetip.remove()},setContent:function(t){return
 * t?(this.getSize(t),this.tooltip.html(t).css({width:this.width,height:this.height,visibility:"visible"}),this.hidden&&(this.hidden=!1,this.updatePosition()),void
 * 0):(this.tooltip.css("visibility","hidden"),this.hidden=!0,void
 * 0)},updatePosition:function(t,e){if(t===i){if(this.mousex===i)return;t=this.mousex-this.offsetLeft,e=this.mousey-this.offsetTop}else
 * this.mousex=t-=this.offsetLeft,this.mousey=e-=this.offsetTop;this.height&&this.width&&!this.hidden&&(e-=this.height+this.tooltipOffsetY,t+=this.tooltipOffsetX,e<this.scrollTop&&(e=this.scrollTop),t<this.scrollLeft?t=this.scrollLeft:t+this.width>this.scrollRight&&(t=this.scrollRight-this.width),this.tooltip.css({left:t,top:e}))},remove:function(){this.tooltip.remove(),this.sizetip.remove(),this.sizetip=this.tooltip=i,s(window).unbind("resize.jqs
 * scroll.jqs")}}),P=function(){g(I)},s(P),W=[],s.fn.sparkline=function(e,n){return
 * this.each(function(){var a,o,r=new
 * s.fn.sparkline.options(this,n),h=s(this);if(a=function(){var
 * n,a,o,l,u,c,d;return"html"===e||e===i?(d=this.getAttribute(r.get("tagValuesAttribute")),(d===i||null===d)&&(d=h.html()),n=d.replace(/(^\s*<!--)|(-->\s*$)|\s+/g,"").split(",")):n=e,a="auto"===r.get("width")?n.length*r.get("defaultPixelsPerValue"):r.get("width"),"auto"===r.get("height")?r.get("composite")&&s.data(this,"_jqs_vcanvas")||(l=t.createElement("span"),l.innerHTML="a",h.html(l),o=s(l).innerHeight()||s(l).height(),s(l).remove(),l=null):o=r.get("height"),r.get("disableInteraction")?u=!1:(u=s.data(this,"_jqs_mhandler"),u?r.get("composite")||u.reset():(u=new
 * _(this,r),s.data(this,"_jqs_mhandler",u))),r.get("composite")&&!s.data(this,"_jqs_vcanvas")?(s.data(this,"_jqs_errnotify")||(alert("Attempted
 * to attach a composite sparkline to an element with no existing
 * sparkline"),s.data(this,"_jqs_errnotify",!0)),void
 * 0):(c=new(s.fn.sparkline[r.get("type")])(this,n,r,a,o),c.render(),u&&u.registerSparkline(c),void
 * 0)},s(this).html()&&!r.get("disableHiddenCheck")&&s(this).is(":hidden")||!s(this).parents("body").length){if(!r.get("composite")&&s.data(this,"_jqs_pending"))for(o=W.length;o;o--)W[o-1][0]==this&&W.splice(o-1,1);W.push([this,a]),s.data(this,"_jqs_pending",!0)}else
 * a.call(this)})},s.fn.sparkline.defaults=n(),s.sparkline_display_visible=function(){var
 * t,e,i,n=[];for(e=0,i=W.length;i>e;e++)t=W[e][0],s(t).is(":visible")&&!s(t).parents().is(":hidden")?(W[e][1].call(t),s.data(W[e][0],"_jqs_pending",!1),n.push(e)):s(t).closest("html").length||s.data(t,"_jqs_pending")||(s.data(W[e][0],"_jqs_pending",!1),n.push(e));for(e=n.length;e;e--)W.splice(n[e-1],1)},s.fn.sparkline.options=a({init:function(t,e){var
 * i,n,a,o;this.userOptions=e=e||{},this.tag=t,this.tagValCache={},n=s.fn.sparkline.defaults,a=n.common,this.tagOptionsPrefix=e.enableTagOptions&&(e.tagOptionsPrefix||a.tagOptionsPrefix),o=this.getTagSetting("type"),i=o===F?n[e.type||a.type]:n[o],this.mergedOptions=s.extend({},a,i,e)},getTagSetting:function(t){var
 * e,s,n,a,o=this.tagOptionsPrefix;if(o===!1||o===i)return
 * F;if(this.tagValCache.hasOwnProperty(t))e=this.tagValCache.key;else{if(e=this.tag.getAttribute(o+t),e===i||null===e)e=F;else
 * if("["===e.substr(0,1))for(e=e.substr(1,e.length-2).split(","),s=e.length;s--;)e[s]=l(e[s].replace(/(^\s*)|(\s*$)/g,""));else
 * if("{"===e.substr(0,1))for(n=e.substr(1,e.length-2).split(","),e={},s=n.length;s--;)a=n[s].split(":",2),e[a[0].replace(/(^\s*)|(\s*$)/g,"")]=l(a[1].replace(/(^\s*)|(\s*$)/g,""));else
 * e=l(e);this.tagValCache.key=e}return e},get:function(t,e){var
 * s,n=this.getTagSetting(t);return
 * n!==F?n:(s=this.mergedOptions[t])===i?e:s}}),s.fn.sparkline._base=a({disabled:!1,init:function(t,e,n,a,o){this.el=t,this.$el=s(t),this.values=e,this.options=n,this.width=a,this.height=o,this.currentRegion=i},initTarget:function(){var
 * t=!this.options.get("disableInteraction");(this.target=this.$el.simpledraw(this.width,this.height,this.options.get("composite"),t))?(this.canvasWidth=this.target.pixelWidth,this.canvasHeight=this.target.pixelHeight):this.disabled=!0},render:function(){return
 * this.disabled?(this.el.innerHTML="",!1):!0},getRegion:function(){},setRegionHighlight:function(t,e,s){var
 * n,a=this.currentRegion,o=!this.options.get("disableHighlight");return
 * e>this.canvasWidth||s>this.canvasHeight||0>e||0>s?null:(n=this.getRegion(t,e,s),a!==n?(a!==i&&o&&this.removeHighlight(),this.currentRegion=n,n!==i&&o&&this.renderHighlight(),!0):!1)},clearRegionHighlight:function(){return
 * this.currentRegion!==i?(this.removeHighlight(),this.currentRegion=i,!0):!1},renderHighlight:function(){this.changeHighlight(!0)},removeHighlight:function(){this.changeHighlight(!1)},changeHighlight:function(){},getCurrentRegionTooltip:function(){var
 * t,e,n,a,r,h,l,u,c,d,p,f,g,m,v=this.options,b="",_=[];if(this.currentRegion===i)return"";if(t=this.getCurrentRegionFields(),p=v.get("tooltipFormatter"))return
 * p(this,v,t);if(v.get("tooltipChartTitle")&&(b+='<div class="jqs
 * jqstitle">'+v.get("tooltipChartTitle")+"</div>\n"),e=this.options.get("tooltipFormat"),!e)return"";if(s.isArray(e)||(e=[e]),s.isArray(t)||(t=[t]),l=this.options.get("tooltipFormatFieldlist"),u=this.options.get("tooltipFormatFieldlistKey"),l&&u){for(c=[],h=t.length;h--;)d=t[h][u],-1!=(m=s.inArray(d,l))&&(c[m]=t[h]);t=c}for(n=e.length,g=t.length,h=0;n>h;h++)for(f=e[h],"string"==typeof
 * f&&(f=new
 * o(f)),a=f.fclass||"jqsfield",m=0;g>m;m++)t[m].isNull&&v.get("tooltipSkipNull")||(s.extend(t[m],{prefix:v.get("tooltipPrefix"),suffix:v.get("tooltipSuffix")}),r=f.render(t[m],v.get("tooltipValueLookups"),v),_.push('<div
 * class="'+a+'">'+r+"</div>"));return
 * _.length?b+_.join("\n"):""},getCurrentRegionFields:function(){},calcHighlightColor:function(t,i){var
 * s,n,a,o,h=i.get("highlightColor"),l=i.get("highlightLighten");if(h)return
 * h;if(l&&(s=/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(t)||/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(t))){for(a=[],n=4===t.length?16:1,o=0;3>o;o++)a[o]=r(e.round(parseInt(s[o+1],16)*n*l),0,255);return"rgb("+a.join(",")+")"}return
 * t}}),w={changeHighlight:function(t){var
 * e,i=this.currentRegion,n=this.target,a=this.regionShapes[i];a&&(e=this.renderRegion(i,t),s.isArray(e)||s.isArray(a)?(n.replaceWithShapes(a,e),this.regionShapes[i]=s.map(e,function(t){return
 * t.id})):(n.replaceWithShape(a,e),this.regionShapes[i]=e.id))},render:function(){var
 * t,e,i,n,a=this.values,o=this.target,r=this.regionShapes;if(this.cls._super.render.call(this)){for(i=a.length;i--;)if(t=this.renderRegion(i))if(s.isArray(t)){for(e=[],n=t.length;n--;)t[n].append(),e.push(t[n].id);r[i]=e}else
 * t.append(),r[i]=t.id;else
 * r[i]=null;o.render()}}},s.fn.sparkline.line=x=a(s.fn.sparkline._base,{type:"line",init:function(t,e,i,s,n){x._super.init.call(this,t,e,i,s,n),this.vertices=[],this.regionMap=[],this.xvalues=[],this.yvalues=[],this.yminmax=[],this.hightlightSpotId=null,this.lastShapeId=null,this.initTarget()},getRegion:function(t,e){var
 * s,n=this.regionMap;for(s=n.length;s--;)if(null!==n[s]&&e>=n[s][0]&&e<=n[s][1])return
 * n[s][2];return i},getCurrentRegionFields:function(){var
 * t=this.currentRegion;return{isNull:null===this.yvalues[t],x:this.xvalues[t],y:this.yvalues[t],color:this.options.get("lineColor"),fillColor:this.options.get("fillColor"),offset:t}},renderHighlight:function(){var
 * t,e,s=this.currentRegion,n=this.target,a=this.vertices[s],o=this.options,r=o.get("spotRadius"),h=o.get("highlightSpotColor"),l=o.get("highlightLineColor");a&&(r&&h&&(t=n.drawCircle(a[0],a[1],r,i,h),this.highlightSpotId=t.id,n.insertAfterShape(this.lastShapeId,t)),l&&(e=n.drawLine(a[0],this.canvasTop,a[0],this.canvasTop+this.canvasHeight,l),this.highlightLineId=e.id,n.insertAfterShape(this.lastShapeId,e)))},removeHighlight:function(){var
 * t=this.target;this.highlightSpotId&&(t.removeShapeId(this.highlightSpotId),this.highlightSpotId=null),this.highlightLineId&&(t.removeShapeId(this.highlightLineId),this.highlightLineId=null)},scanValues:function(){var
 * t,i,s,n,a,o=this.values,r=o.length,h=this.xvalues,l=this.yvalues,u=this.yminmax;for(t=0;r>t;t++)i=o[t],s="string"==typeof
 * o[t],n="object"==typeof o[t]&&o[t]instanceof
 * Array,a=s&&o[t].split(":"),s&&2===a.length?(h.push(Number(a[0])),l.push(Number(a[1])),u.push(Number(a[1]))):n?(h.push(i[0]),l.push(i[1]),u.push(i[1])):(h.push(t),null===o[t]||"null"===o[t]?l.push(null):(l.push(Number(i)),u.push(Number(i))));this.options.get("xvalues")&&(h=this.options.get("xvalues")),this.maxy=this.maxyorg=e.max.apply(e,u),this.miny=this.minyorg=e.min.apply(e,u),this.maxx=e.max.apply(e,h),this.minx=e.min.apply(e,h),this.xvalues=h,this.yvalues=l,this.yminmax=u},processRangeOptions:function(){var
 * t=this.options,e=t.get("normalRangeMin"),s=t.get("normalRangeMax");e!==i&&(e<this.miny&&(this.miny=e),s>this.maxy&&(this.maxy=s)),t.get("chartRangeMin")!==i&&(t.get("chartRangeClip")||t.get("chartRangeMin")<this.miny)&&(this.miny=t.get("chartRangeMin")),t.get("chartRangeMax")!==i&&(t.get("chartRangeClip")||t.get("chartRangeMax")>this.maxy)&&(this.maxy=t.get("chartRangeMax")),t.get("chartRangeMinX")!==i&&(t.get("chartRangeClipX")||t.get("chartRangeMinX")<this.minx)&&(this.minx=t.get("chartRangeMinX")),t.get("chartRangeMaxX")!==i&&(t.get("chartRangeClipX")||t.get("chartRangeMaxX")>this.maxx)&&(this.maxx=t.get("chartRangeMaxX"))},drawNormalRange:function(t,s,n,a,o){var
 * r=this.options.get("normalRangeMin"),h=this.options.get("normalRangeMax"),l=s+e.round(n-n*((h-this.miny)/o)),u=e.round(n*(h-r)/o);this.target.drawRect(t,l,a,u,i,this.options.get("normalRangeColor")).append()},render:function(){var
 * t,n,a,o,r,h,l,u,c,d,p,f,g,m,v,_,y,w,C,k,M,D,S,T,I,P=this.options,H=this.target,R=this.canvasWidth,A=this.canvasHeight,z=this.vertices,W=P.get("spotRadius"),F=this.regionMap;if(x._super.render.call(this)&&(this.scanValues(),this.processRangeOptions(),S=this.xvalues,T=this.yvalues,this.yminmax.length&&!(this.yvalues.length<2))){for(o=r=0,t=0===this.maxx-this.minx?1:this.maxx-this.minx,n=0===this.maxy-this.miny?1:this.maxy-this.miny,a=this.yvalues.length-1,W&&(4*W>R||4*W>A)&&(W=0),W&&(M=P.get("highlightSpotColor")&&!P.get("disableInteraction"),(M||P.get("minSpotColor")||P.get("spotColor")&&T[a]===this.miny)&&(A-=e.ceil(W)),(M||P.get("maxSpotColor")||P.get("spotColor")&&T[a]===this.maxy)&&(A-=e.ceil(W),o+=e.ceil(W)),(M||(P.get("minSpotColor")||P.get("maxSpotColor"))&&(T[0]===this.miny||T[0]===this.maxy))&&(r+=e.ceil(W),R-=e.ceil(W)),(M||P.get("spotColor")||P.get("minSpotColor")||P.get("maxSpotColor")&&(T[a]===this.miny||T[a]===this.maxy))&&(R-=e.ceil(W))),A--,P.get("normalRangeMin")===i||P.get("drawNormalOnTop")||this.drawNormalRange(r,o,A,R,n),l=[],u=[l],m=v=null,_=T.length,I=0;_>I;I++)c=S[I],p=S[I+1],d=T[I],f=r+e.round((c-this.minx)*(R/t)),g=_-1>I?r+e.round((p-this.minx)*(R/t)):R,v=f+(g-f)/2,F[I]=[m||0,v,I],m=v,null===d?I&&(null!==T[I-1]&&(l=[],u.push(l)),z.push(null)):(d<this.miny&&(d=this.miny),d>this.maxy&&(d=this.maxy),l.length||l.push([f,o+A]),h=[f,o+e.round(A-A*((d-this.miny)/n))],l.push(h),z.push(h));for(y=[],w=[],C=u.length,I=0;C>I;I++)l=u[I],l.length&&(P.get("fillColor")&&(l.push([l[l.length-1][0],o+A]),w.push(l.slice(0)),l.pop()),l.length>2&&(l[0]=[l[0][0],l[1][1]]),y.push(l));for(C=w.length,I=0;C>I;I++)H.drawShape(w[I],P.get("fillColor"),P.get("fillColor")).append();for(P.get("normalRangeMin")!==i&&P.get("drawNormalOnTop")&&this.drawNormalRange(r,o,A,R,n),C=y.length,I=0;C>I;I++)H.drawShape(y[I],P.get("lineColor"),i,P.get("lineWidth")).append();if(W&&P.get("valueSpots"))for(k=P.get("valueSpots"),k.get===i&&(k=new
 * b(k)),I=0;_>I;I++)D=k.get(T[I]),D&&H.drawCircle(r+e.round((S[I]-this.minx)*(R/t)),o+e.round(A-A*((T[I]-this.miny)/n)),W,i,D).append();W&&P.get("spotColor")&&null!==T[a]&&H.drawCircle(r+e.round((S[S.length-1]-this.minx)*(R/t)),o+e.round(A-A*((T[a]-this.miny)/n)),W,i,P.get("spotColor")).append(),this.maxy!==this.minyorg&&(W&&P.get("minSpotColor")&&(c=S[s.inArray(this.minyorg,T)],H.drawCircle(r+e.round((c-this.minx)*(R/t)),o+e.round(A-A*((this.minyorg-this.miny)/n)),W,i,P.get("minSpotColor")).append()),W&&P.get("maxSpotColor")&&(c=S[s.inArray(this.maxyorg,T)],H.drawCircle(r+e.round((c-this.minx)*(R/t)),o+e.round(A-A*((this.maxyorg-this.miny)/n)),W,i,P.get("maxSpotColor")).append())),this.lastShapeId=H.getLastShapeId(),this.canvasTop=o,H.render()}}}),s.fn.sparkline.bar=C=a(s.fn.sparkline._base,w,{type:"bar",init:function(t,n,a,o,h){var
 * d,p,f,g,m,v,_,y,w,x,k,M,D,S,T,I,P,H,R,A,z,W,F=parseInt(a.get("barWidth"),10),E=parseInt(a.get("barSpacing"),10),N=a.get("chartRangeMin"),O=a.get("chartRangeMax"),j=a.get("chartRangeClip"),L=1/0,q=-1/0;for(C._super.init.call(this,t,n,a,o,h),v=0,_=n.length;_>v;v++)A=n[v],d="string"==typeof
 * A&&A.indexOf(":")>-1,(d||s.isArray(A))&&(T=!0,d&&(A=n[v]=u(A.split(":"))),A=c(A,null),p=e.min.apply(e,A),f=e.max.apply(e,A),L>p&&(L=p),f>q&&(q=f));this.stacked=T,this.regionShapes={},this.barWidth=F,this.barSpacing=E,this.totalBarWidth=F+E,this.width=o=n.length*F+(n.length-1)*E,this.initTarget(),j&&(D=N===i?-1/0:N,S=O===i?1/0:O),m=[],g=T?[]:m;var
 * B=[],Y=[];for(v=0,_=n.length;_>v;v++)if(T)for(I=n[v],n[v]=R=[],B[v]=0,g[v]=Y[v]=0,P=0,H=I.length;H>P;P++)A=R[P]=j?r(I[P],D,S):I[P],null!==A&&(A>0&&(B[v]+=A),0>L&&q>0?0>A?Y[v]+=e.abs(A):g[v]+=A:g[v]+=e.abs(A-(0>A?q:L)),m.push(A));else
 * A=j?r(n[v],D,S):n[v],A=n[v]=l(A),null!==A&&m.push(A);this.max=M=e.max.apply(e,m),this.min=k=e.min.apply(e,m),this.stackMax=q=T?e.max.apply(e,B):M,this.stackMin=L=T?e.min.apply(e,m):k,a.get("chartRangeMin")!==i&&(a.get("chartRangeClip")||a.get("chartRangeMin")<k)&&(k=a.get("chartRangeMin")),a.get("chartRangeMax")!==i&&(a.get("chartRangeClip")||a.get("chartRangeMax")>M)&&(M=a.get("chartRangeMax")),this.zeroAxis=w=a.get("zeroAxis",!0),x=0>=k&&M>=0&&w?0:0==w?k:k>0?k:M,this.xaxisOffset=x,y=T?e.max.apply(e,g)+e.max.apply(e,Y):M-k,this.canvasHeightEf=w&&0>k?this.canvasHeight-2:this.canvasHeight-1,x>k?(W=T&&M>=0?q:M,z=(W-x)/y*this.canvasHeight,z!==e.ceil(z)&&(this.canvasHeightEf-=2,z=e.ceil(z))):z=this.canvasHeight,this.yoffset=z,s.isArray(a.get("colorMap"))?(this.colorMapByIndex=a.get("colorMap"),this.colorMapByValue=null):(this.colorMapByIndex=null,this.colorMapByValue=a.get("colorMap"),this.colorMapByValue&&this.colorMapByValue.get===i&&(this.colorMapByValue=new
 * b(this.colorMapByValue))),this.range=y},getRegion:function(t,s){var
 * n=e.floor(s/this.totalBarWidth);return
 * 0>n||n>=this.values.length?i:n},getCurrentRegionFields:function(){var
 * t,e,i=this.currentRegion,s=m(this.values[i]),n=[];for(e=s.length;e--;)t=s[e],n.push({isNull:null===t,value:t,color:this.calcColor(e,t,i),offset:i});return
 * n},calcColor:function(t,e,n){var
 * a,o,r=this.colorMapByIndex,h=this.colorMapByValue,l=this.options;return
 * a=this.stacked?l.get("stackedBarColor"):0>e?l.get("negBarColor"):l.get("barColor"),0===e&&l.get("zeroColor")!==i&&(a=l.get("zeroColor")),h&&(o=h.get(e))?a=o:r&&r.length>n&&(a=r[n]),s.isArray(a)?a[t%a.length]:a},renderRegion:function(t,n){var
 * a,o,r,h,l,u,c,d,f,g,m=this.values[t],v=this.options,b=this.xaxisOffset,_=[],y=this.range,w=this.stacked,x=this.target,C=t*this.totalBarWidth,k=this.canvasHeightEf,M=this.yoffset;if(m=s.isArray(m)?m:[m],c=m.length,d=m[0],h=p(null,m),g=p(b,m,!0),h)return
 * v.get("nullColor")?(r=n?v.get("nullColor"):this.calcHighlightColor(v.get("nullColor"),v),a=M>0?M-1:M,x.drawRect(C,a,this.barWidth-1,0,r,r)):i;for(l=M,u=0;c>u;u++){if(d=m[u],w&&d===b){if(!g||f)continue;f=!0}o=y>0?e.floor(k*(e.abs(d-b)/y))+1:1,b>d||d===b&&0===M?(a=l,l+=o):(a=M-o,M-=o),r=this.calcColor(u,d,t),n&&(r=this.calcHighlightColor(r,v)),_.push(x.drawRect(C,a,this.barWidth-1,o-1,r,r))}return
 * 1===_.length?_[0]:_}}),s.fn.sparkline.tristate=k=a(s.fn.sparkline._base,w,{type:"tristate",init:function(t,e,n,a,o){var
 * r=parseInt(n.get("barWidth"),10),h=parseInt(n.get("barSpacing"),10);k._super.init.call(this,t,e,n,a,o),this.regionShapes={},this.barWidth=r,this.barSpacing=h,this.totalBarWidth=r+h,this.values=s.map(e,Number),this.width=a=e.length*r+(e.length-1)*h,s.isArray(n.get("colorMap"))?(this.colorMapByIndex=n.get("colorMap"),this.colorMapByValue=null):(this.colorMapByIndex=null,this.colorMapByValue=n.get("colorMap"),this.colorMapByValue&&this.colorMapByValue.get===i&&(this.colorMapByValue=new
 * b(this.colorMapByValue))),this.initTarget()},getRegion:function(t,i){return
 * e.floor(i/this.totalBarWidth)},getCurrentRegionFields:function(){var
 * t=this.currentRegion;return{isNull:this.values[t]===i,value:this.values[t],color:this.calcColor(this.values[t],t),offset:t}},calcColor:function(t,e){var
 * i,s,n=this.values,a=this.options,o=this.colorMapByIndex,r=this.colorMapByValue;return
 * i=r&&(s=r.get(t))?s:o&&o.length>e?o[e]:n[e]<0?a.get("negBarColor"):n[e]>0?a.get("posBarColor"):a.get("zeroBarColor")},renderRegion:function(t,i){var
 * s,n,a,o,r,h,l=this.values,u=this.options,c=this.target;return
 * s=c.pixelHeight,a=e.round(s/2),o=t*this.totalBarWidth,l[t]<0?(r=a,n=a-1):l[t]>0?(r=0,n=a-1):(r=a-1,n=2),h=this.calcColor(l[t],t),null!==h?(i&&(h=this.calcHighlightColor(h,u)),c.drawRect(o,r,this.barWidth-1,n-1,h,h)):void
 * 0}}),s.fn.sparkline.discrete=M=a(s.fn.sparkline._base,w,{type:"discrete",init:function(t,n,a,o,r){M._super.init.call(this,t,n,a,o,r),this.regionShapes={},this.values=n=s.map(n,Number),this.min=e.min.apply(e,n),this.max=e.max.apply(e,n),this.range=this.max-this.min,this.width=o="auto"===a.get("width")?2*n.length:this.width,this.interval=e.floor(o/n.length),this.itemWidth=o/n.length,a.get("chartRangeMin")!==i&&(a.get("chartRangeClip")||a.get("chartRangeMin")<this.min)&&(this.min=a.get("chartRangeMin")),a.get("chartRangeMax")!==i&&(a.get("chartRangeClip")||a.get("chartRangeMax")>this.max)&&(this.max=a.get("chartRangeMax")),this.initTarget(),this.target&&(this.lineHeight="auto"===a.get("lineHeight")?e.round(.3*this.canvasHeight):a.get("lineHeight"))},getRegion:function(t,i){return
 * e.floor(i/this.itemWidth)},getCurrentRegionFields:function(){var
 * t=this.currentRegion;return{isNull:this.values[t]===i,value:this.values[t],offset:t}},renderRegion:function(t,i){var
 * s,n,a,o,h=this.values,l=this.options,u=this.min,c=this.max,d=this.range,p=this.interval,f=this.target,g=this.canvasHeight,m=this.lineHeight,v=g-m;return
 * n=r(h[t],u,c),o=t*p,s=e.round(v-v*((n-u)/d)),a=l.get("thresholdColor")&&n<l.get("thresholdValue")?l.get("thresholdColor"):l.get("lineColor"),i&&(a=this.calcHighlightColor(a,l)),f.drawLine(o,s,o,s+m,a)}}),s.fn.sparkline.bullet=D=a(s.fn.sparkline._base,{type:"bullet",init:function(t,s,n,a,o){var
 * r,h,l;D._super.init.call(this,t,s,n,a,o),this.values=s=u(s),l=s.slice(),l[0]=null===l[0]?l[2]:l[0],l[1]=null===s[1]?l[2]:l[1],r=e.min.apply(e,s),h=e.max.apply(e,s),r=n.get("base")===i?0>r?r:0:n.get("base"),this.min=r,this.max=h,this.range=h-r,this.shapes={},this.valueShapes={},this.regiondata={},this.width=a="auto"===n.get("width")?"4.0em":a,this.target=this.$el.simpledraw(a,o,n.get("composite")),s.length||(this.disabled=!0),this.initTarget()},getRegion:function(t,e,s){var
 * n=this.target.getShapeAt(t,e,s);return
 * n!==i&&this.shapes[n]!==i?this.shapes[n]:i},getCurrentRegionFields:function(){var
 * t=this.currentRegion;return{fieldkey:t.substr(0,1),value:this.values[t.substr(1)],region:t}},changeHighlight:function(t){var
 * e,i=this.currentRegion,s=this.valueShapes[i];switch(delete
 * this.shapes[s],i.substr(0,1)){case"r":e=this.renderRange(i.substr(1),t);break;case"p":e=this.renderPerformance(t);break;case"t":e=this.renderTarget(t)}this.valueShapes[i]=e.id,this.shapes[e.id]=i,this.target.replaceWithShape(s,e)},renderRange:function(t,i){var
 * s=this.values[t],n=e.round(this.canvasWidth*((s-this.min)/this.range)),a=this.options.get("rangeColors")[t-2];return
 * i&&(a=this.calcHighlightColor(a,this.options)),this.target.drawRect(0,0,n-1,this.canvasHeight-1,a,a)},renderPerformance:function(t){var
 * i=this.values[1],s=e.round(this.canvasWidth*((i-this.min)/this.range)),n=this.options.get("performanceColor");return
 * t&&(n=this.calcHighlightColor(n,this.options)),this.target.drawRect(0,e.round(.3*this.canvasHeight),s-1,e.round(.4*this.canvasHeight)-1,n,n)},renderTarget:function(t){var
 * i=this.values[0],s=e.round(this.canvasWidth*((i-this.min)/this.range)-this.options.get("targetWidth")/2),n=e.round(.1*this.canvasHeight),a=this.canvasHeight-2*n,o=this.options.get("targetColor");return
 * t&&(o=this.calcHighlightColor(o,this.options)),this.target.drawRect(s,n,this.options.get("targetWidth")-1,a-1,o,o)},render:function(){var
 * t,e,i=this.values.length,s=this.target;if(D._super.render.call(this)){for(t=2;i>t;t++)e=this.renderRange(t).append(),this.shapes[e.id]="r"+t,this.valueShapes["r"+t]=e.id;null!==this.values[1]&&(e=this.renderPerformance().append(),this.shapes[e.id]="p1",this.valueShapes.p1=e.id),null!==this.values[0]&&(e=this.renderTarget().append(),this.shapes[e.id]="t0",this.valueShapes.t0=e.id),s.render()}}}),s.fn.sparkline.pie=S=a(s.fn.sparkline._base,{type:"pie",init:function(t,i,n,a,o){var
 * r,h=0;if(S._super.init.call(this,t,i,n,a,o),this.shapes={},this.valueShapes={},this.values=i=s.map(i,Number),"auto"===n.get("width")&&(this.width=this.height),i.length>0)for(r=i.length;r--;)h+=i[r];this.total=h,this.initTarget(),this.radius=e.floor(e.min(this.canvasWidth,this.canvasHeight)/2)},getRegion:function(t,e,s){var
 * n=this.target.getShapeAt(t,e,s);return
 * n!==i&&this.shapes[n]!==i?this.shapes[n]:i},getCurrentRegionFields:function(){var
 * t=this.currentRegion;return{isNull:this.values[t]===i,value:this.values[t],percent:100*(this.values[t]/this.total),color:this.options.get("sliceColors")[t%this.options.get("sliceColors").length],offset:t}},changeHighlight:function(t){var
 * e=this.currentRegion,i=this.renderSlice(e,t),s=this.valueShapes[e];delete
 * this.shapes[s],this.target.replaceWithShape(s,i),this.valueShapes[e]=i.id,this.shapes[i.id]=e},renderSlice:function(t,s){var
 * n,a,o,r,h,l=this.target,u=this.options,c=this.radius,d=u.get("borderWidth"),p=u.get("offset"),f=2*e.PI,g=this.values,m=this.total,v=p?2*e.PI*(p/360):0;for(r=g.length,o=0;r>o;o++){if(n=v,a=v,m>0&&(a=v+f*(g[o]/m)),t===o)return
 * h=u.get("sliceColors")[o%u.get("sliceColors").length],s&&(h=this.calcHighlightColor(h,u)),l.drawPieSlice(c,c,c-d,n,a,i,h);v=a}},render:function(){var
 * t,s,n=this.target,a=this.values,o=this.options,r=this.radius,h=o.get("borderWidth");
 * if(S._super.render.call(this)){for(h&&n.drawCircle(r,r,e.floor(r-h/2),o.get("borderColor"),i,h).append(),s=a.length;s--;)a[s]&&(t=this.renderSlice(s).append(),this.valueShapes[s]=t.id,this.shapes[t.id]=s);n.render()}}}),s.fn.sparkline.box=T=a(s.fn.sparkline._base,{type:"box",init:function(t,e,i,n,a){T._super.init.call(this,t,e,i,n,a),this.values=s.map(e,Number),this.width="auto"===i.get("width")?"4.0em":n,this.initTarget(),this.values.length||(this.disabled=1)},getRegion:function(){return
 * 1},getCurrentRegionFields:function(){var
 * t=[{field:"lq",value:this.quartiles[0]},{field:"med",value:this.quartiles[1]},{field:"uq",value:this.quartiles[2]}];return
 * this.loutlier!==i&&t.push({field:"lo",value:this.loutlier}),this.routlier!==i&&t.push({field:"ro",value:this.routlier}),this.lwhisker!==i&&t.push({field:"lw",value:this.lwhisker}),this.rwhisker!==i&&t.push({field:"rw",value:this.rwhisker}),t},render:function(){var
 * t,s,n,a,o,r,l,u,c,d,p,f=this.target,g=this.values,m=g.length,v=this.options,b=this.canvasWidth,_=this.canvasHeight,y=v.get("chartRangeMin")===i?e.min.apply(e,g):v.get("chartRangeMin"),w=v.get("chartRangeMax")===i?e.max.apply(e,g):v.get("chartRangeMax"),x=0;if(T._super.render.call(this)){if(v.get("raw"))v.get("showOutliers")&&g.length>5?(s=g[0],t=g[1],a=g[2],o=g[3],r=g[4],l=g[5],u=g[6]):(t=g[0],a=g[1],o=g[2],r=g[3],l=g[4]);else
 * if(g.sort(function(t,e){return
 * t-e}),a=h(g,1),o=h(g,2),r=h(g,3),n=r-a,v.get("showOutliers")){for(t=l=i,c=0;m>c;c++)t===i&&g[c]>a-n*v.get("outlierIQR")&&(t=g[c]),g[c]<r+n*v.get("outlierIQR")&&(l=g[c]);s=g[0],u=g[m-1]}else
 * t=g[0],l=g[m-1];this.quartiles=[a,o,r],this.lwhisker=t,this.rwhisker=l,this.loutlier=s,this.routlier=u,p=b/(w-y+1),v.get("showOutliers")&&(x=e.ceil(v.get("spotRadius")),b-=2*e.ceil(v.get("spotRadius")),p=b/(w-y+1),t>s&&f.drawCircle((s-y)*p+x,_/2,v.get("spotRadius"),v.get("outlierLineColor"),v.get("outlierFillColor")).append(),u>l&&f.drawCircle((u-y)*p+x,_/2,v.get("spotRadius"),v.get("outlierLineColor"),v.get("outlierFillColor")).append()),f.drawRect(e.round((a-y)*p+x),e.round(.1*_),e.round((r-a)*p),e.round(.8*_),v.get("boxLineColor"),v.get("boxFillColor")).append(),f.drawLine(e.round((t-y)*p+x),e.round(_/2),e.round((a-y)*p+x),e.round(_/2),v.get("lineColor")).append(),f.drawLine(e.round((t-y)*p+x),e.round(_/4),e.round((t-y)*p+x),e.round(_-_/4),v.get("whiskerColor")).append(),f.drawLine(e.round((l-y)*p+x),e.round(_/2),e.round((r-y)*p+x),e.round(_/2),v.get("lineColor")).append(),f.drawLine(e.round((l-y)*p+x),e.round(_/4),e.round((l-y)*p+x),e.round(_-_/4),v.get("whiskerColor")).append(),f.drawLine(e.round((o-y)*p+x),e.round(.1*_),e.round((o-y)*p+x),e.round(.9*_),v.get("medianColor")).append(),v.get("target")&&(d=e.ceil(v.get("spotRadius")),f.drawLine(e.round((v.get("target")-y)*p+x),e.round(_/2-d),e.round((v.get("target")-y)*p+x),e.round(_/2+d),v.get("targetColor")).append(),f.drawLine(e.round((v.get("target")-y)*p+x-d),e.round(_/2),e.round((v.get("target")-y)*p+x+d),e.round(_/2),v.get("targetColor")).append()),f.render()}}}),H=a({init:function(t,e,i,s){this.target=t,this.id=e,this.type=i,this.args=s},append:function(){return
 * this.target.appendShape(this),this}}),R=a({_pxregex:/(\d+)(px)?\s*$/i,init:function(t,e,i){t&&(this.width=t,this.height=e,this.target=i,this.lastShapeId=null,i[0]&&(i=i[0]),s.data(i,"_jqs_vcanvas",this))},drawLine:function(t,e,i,s,n,a){return
 * this.drawShape([[t,e],[i,s]],n,a)},drawShape:function(t,e,i,s){return
 * this._genShape("Shape",[t,e,i,s])},drawCircle:function(t,e,i,s,n,a){return
 * this._genShape("Circle",[t,e,i,s,n,a])},drawPieSlice:function(t,e,i,s,n,a,o){return
 * this._genShape("PieSlice",[t,e,i,s,n,a,o])},drawRect:function(t,e,i,s,n,a){return
 * this._genShape("Rect",[t,e,i,s,n,a])},getElement:function(){return
 * this.canvas},getLastShapeId:function(){return
 * this.lastShapeId},reset:function(){alert("reset not
 * implemented")},_insert:function(t,e){s(e).html(t)},_calculatePixelDims:function(t,e,i){var
 * n;n=this._pxregex.exec(e),this.pixelHeight=n?n[1]:s(i).height(),n=this._pxregex.exec(t),this.pixelWidth=n?n[1]:s(i).width()},_genShape:function(t,e){var
 * i=E++;return e.unshift(i),new
 * H(this,i,t,e)},appendShape:function(){alert("appendShape not
 * implemented")},replaceWithShape:function(){alert("replaceWithShape not
 * implemented")},insertAfterShape:function(){alert("insertAfterShape not
 * implemented")},removeShapeId:function(){alert("removeShapeId not
 * implemented")},getShapeAt:function(){alert("getShapeAt not
 * implemented")},render:function(){alert("render not
 * implemented")}}),A=a(R,{init:function(e,n,a,o){A._super.init.call(this,e,n,a),this.canvas=t.createElement("canvas"),a[0]&&(a=a[0]),s.data(a,"_jqs_vcanvas",this),s(this.canvas).css({display:"inline-block",width:e,height:n,verticalAlign:"top"}),this._insert(this.canvas,a),this._calculatePixelDims(e,n,this.canvas),this.canvas.width=this.pixelWidth,this.canvas.height=this.pixelHeight,this.interact=o,this.shapes={},this.shapeseq=[],this.currentTargetShapeId=i,s(this.canvas).css({width:this.pixelWidth,height:this.pixelHeight})},_getContext:function(t,e,s){var
 * n=this.canvas.getContext("2d");return
 * t!==i&&(n.strokeStyle=t),n.lineWidth=s===i?1:s,e!==i&&(n.fillStyle=e),n},reset:function(){var
 * t=this._getContext();t.clearRect(0,0,this.pixelWidth,this.pixelHeight),this.shapes={},this.shapeseq=[],this.currentTargetShapeId=i},_drawShape:function(t,e,s,n,a){var
 * o,r,h=this._getContext(s,n,a);for(h.beginPath(),h.moveTo(e[0][0]+.5,e[0][1]+.5),o=1,r=e.length;r>o;o++)h.lineTo(e[o][0]+.5,e[o][1]+.5);s!==i&&h.stroke(),n!==i&&h.fill(),this.targetX!==i&&this.targetY!==i&&h.isPointInPath(this.targetX,this.targetY)&&(this.currentTargetShapeId=t)},_drawCircle:function(t,s,n,a,o,r,h){var
 * l=this._getContext(o,r,h);l.beginPath(),l.arc(s,n,a,0,2*e.PI,!1),this.targetX!==i&&this.targetY!==i&&l.isPointInPath(this.targetX,this.targetY)&&(this.currentTargetShapeId=t),o!==i&&l.stroke(),r!==i&&l.fill()},_drawPieSlice:function(t,e,s,n,a,o,r,h){var
 * l=this._getContext(r,h);l.beginPath(),l.moveTo(e,s),l.arc(e,s,n,a,o,!1),l.lineTo(e,s),l.closePath(),r!==i&&l.stroke(),h&&l.fill(),this.targetX!==i&&this.targetY!==i&&l.isPointInPath(this.targetX,this.targetY)&&(this.currentTargetShapeId=t)},_drawRect:function(t,e,i,s,n,a,o){return
 * this._drawShape(t,[[e,i],[e+s,i],[e+s,i+n],[e,i+n],[e,i]],a,o)},appendShape:function(t){return
 * this.shapes[t.id]=t,this.shapeseq.push(t.id),this.lastShapeId=t.id,t.id},replaceWithShape:function(t,e){var
 * i,s=this.shapeseq;for(this.shapes[e.id]=e,i=s.length;i--;)s[i]==t&&(s[i]=e.id);delete
 * this.shapes[t]},replaceWithShapes:function(t,e){var
 * i,s,n,a=this.shapeseq,o={};for(s=t.length;s--;)o[t[s]]=!0;for(s=a.length;s--;)i=a[s],o[i]&&(a.splice(s,1),delete
 * this.shapes[i],n=s);for(s=e.length;s--;)a.splice(n,0,e[s].id),this.shapes[e[s].id]=e[s]},insertAfterShape:function(t,e){var
 * i,s=this.shapeseq;for(i=s.length;i--;)if(s[i]===t)return
 * s.splice(i+1,0,e.id),this.shapes[e.id]=e,void
 * 0},removeShapeId:function(t){var
 * e,i=this.shapeseq;for(e=i.length;e--;)if(i[e]===t){i.splice(e,1);break}delete
 * this.shapes[t]},getShapeAt:function(t,e,i){return
 * this.targetX=e,this.targetY=i,this.render(),this.currentTargetShapeId},render:function(){var
 * t,e,i,s=this.shapeseq,n=this.shapes,a=s.length,o=this._getContext();for(o.clearRect(0,0,this.pixelWidth,this.pixelHeight),i=0;a>i;i++)t=s[i],e=n[t],this["_draw"+e.type].apply(this,e.args);this.interact||(this.shapes={},this.shapeseq=[])}}),z=a(R,{init:function(e,i,n){var
 * a;z._super.init.call(this,e,i,n),n[0]&&(n=n[0]),s.data(n,"_jqs_vcanvas",this),this.canvas=t.createElement("span"),s(this.canvas).css({display:"inline-block",position:"relative",overflow:"hidden",width:e,height:i,margin:"0px",padding:"0px",verticalAlign:"top"}),this._insert(this.canvas,n),this._calculatePixelDims(e,i,this.canvas),this.canvas.width=this.pixelWidth,this.canvas.height=this.pixelHeight,a='<v:group
 * coordorigin="0 0" coordsize="'+this.pixelWidth+" "+this.pixelHeight+'"'+'
 * style="position:absolute;top:0;left:0;width:'+this.pixelWidth+"px;height="+this.pixelHeight+'px;"></v:group>',this.canvas.insertAdjacentHTML("beforeEnd",a),this.group=s(this.canvas).children()[0],this.rendered=!1,this.prerender=""},_drawShape:function(t,e,s,n,a){var
 * o,r,h,l,u,c,d,p=[];for(d=0,c=e.length;c>d;d++)p[d]=""+e[d][0]+","+e[d][1];return
 * o=p.splice(0,1),a=a===i?1:a,r=s===i?' stroked="false" ':'
 * strokeWeight="'+a+'px" strokeColor="'+s+'" ',h=n===i?' filled="false"':'
 * fillColor="'+n+'" filled="true" ',l=p[0]===p[p.length-1]?"x ":"",u='<v:shape
 * coordorigin="0 0" coordsize="'+this.pixelWidth+" "+this.pixelHeight+'" '+'
 * id="jqsshape'+t+'" '+r+h+'
 * style="position:absolute;left:0px;top:0px;height:'+this.pixelHeight+"px;width:"+this.pixelWidth+'px;padding:0px;margin:0px;"
 * '+' path="m '+o+" l "+p.join(", ")+" "+l+'e">'+"
 * </v:shape>"},_drawCircle:function(t,e,s,n,a,o,r){var h,l,u;return
 * e-=n,s-=n,h=a===i?' stroked="false" ':' strokeWeight="'+r+'px"
 * strokeColor="'+a+'" ',l=o===i?' filled="false"':' fillColor="'+o+'"
 * filled="true" ',u='<v:oval id="jqsshape'+t+'" '+h+l+'
 * style="position:absolute;top:'+s+"px; left:"+e+"px; width:"+2*n+"px;
 * height:"+2*n+'px"></v:oval>'},_drawPieSlice:function(t,s,n,a,o,r,h,l){var
 * u,c,d,p,f,g,m,v;if(o===r)return"";if(r-o===2*e.PI&&(o=0,r=2*e.PI),c=s+e.round(e.cos(o)*a),d=n+e.round(e.sin(o)*a),p=s+e.round(e.cos(r)*a),f=n+e.round(e.sin(r)*a),c===p&&d===f){if(r-o<e.PI)return"";c=p=s+a,d=f=n}return
 * c===p&&d===f&&r-o<e.PI?"":(u=[s-a,n-a,s+a,n+a,c,d,p,f],g=h===i?'
 * stroked="false" ':' strokeWeight="1px" strokeColor="'+h+'" ',m=l===i?'
 * filled="false"':' fillColor="'+l+'" filled="true" ',v='<v:shape
 * coordorigin="0 0" coordsize="'+this.pixelWidth+" "+this.pixelHeight+'" '+'
 * id="jqsshape'+t+'" '+g+m+'
 * style="position:absolute;left:0px;top:0px;height:'+this.pixelHeight+"px;width:"+this.pixelWidth+'px;padding:0px;margin:0px;"
 * '+' path="m '+s+","+n+" wa "+u.join(", ")+' x e">'+"
 * </v:shape>")},_drawRect:function(t,e,i,s,n,a,o){return
 * this._drawShape(t,[[e,i],[e,i+n],[e+s,i+n],[e+s,i],[e,i]],a,o)},reset:function(){this.group.innerHTML=""},appendShape:function(t){var
 * e=this["_draw"+t.type].apply(this,t.args);return
 * this.rendered?this.group.insertAdjacentHTML("beforeEnd",e):this.prerender+=e,this.lastShapeId=t.id,t.id},replaceWithShape:function(t,e){var
 * i=s("#jqsshape"+t),n=this["_draw"+e.type].apply(this,e.args);i[0].outerHTML=n},rep{#/for}laceWithShapes:function(t,e){var
 * i,n=s("#jqsshape"+t[0]),a="",o=e.length;for(i=0;o>i;i++)a+=this["_draw"+e[i].type].apply(this,e[i].args);for(n[0].outerHTML=a,i=1;i<t.length;i++)s("#jqsshape"+t[i]).remove()},insertAfterShape:function(t,e){var
 * i=s("#jqsshape"+t),n=this["_draw"+e.type].apply(this,e.args);i[0].insertAdjacentHTML("afterEnd",n)},removeShapeId:function(t){var
 * e=s("#jqsshape"+t);this.group.removeChild(e[0])},getShapeAt:function(t){var
 * e=t.id.substr(8);return
 * e},render:function(){this.rendered||(this.group.innerHTML=this.prerender,this.rendered=!0)}})})}(document,Math);
 */

//irfan khan 11-oct-2018 fetch patient counts
function patientQueueListOnDashb(){
	//alert("hurrreee");
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/registration/patientQueueListOnDashb",
		success : function(r) {	
			//alert(r.length());
			$("#OPDQueueCountWithConsultant").html(r[0]);
			$("#OPDQueueCount").html(r[1]);
			$("#IPDQueueCount").html(r[2]);
			$("#IPDQueueCountNoBedPatient").html(r[3]);
			$("#DIAGQueueCount").html(r[4]);
		}});
}


//Added By Annapurna fetchchildwise data on dashboard
function getBedAvaiableDashboard() {
	var inputs = [];
	inputs.push('action=GetBedAva');
	//inputs.push('hallID=' + hallID);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "./ehat/ipd/getAvailableBedOnDashboard",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					var ajaxResponse =  r ;
					//	$("#allBedObj").val(ajaxResponse);
						//alert(JSON.stringify(r));
						//var pobj1 = eval('(' + ajaxResponse + ')');
						//var pobj1 = r;
					var bedNames = '';
					var bedTotal = '';
					var bedOccupied = '';
					var bedVacBtUnavl = '';
					var bedTotUnAvl = '';
					var bedAvlWait = '';
					var bedTotAvl = '';
					var totalPatient = 0;
						
						for ( var i= 0; i < ajaxResponse.lstChargesSlave.length; i++) {
							var bclean = 0;
							var bedsAvail = 0;
							var bedsUnAvail = 0;
							var bedsPer = 0;
							var total = 0;
					/*	for ( var i = 0; i < ajaxResponse.lstChargesSlave.length; i++) {
							
							var bclean = ajaxResponse.lstChargesSlave[i].cleaningCount;
							var bedsAvail = ajaxResponse.lstChargesSlave[i].deallocateCount;
							var bedsUnAvail = ajaxResponse.lstChargesSlave[i].allocateCount;
							var total = ajaxResponse.lstChargesSlave[i].noOfBeds;
							var bedsPer = 0;
	                      
							
							total=ajaxResponse.lstChargesSlave[i].noOfBeds;
							bedsUnAvail=ajaxResponse.lstChargesSlave[i].allocateCount;
							bedsPer = (parseInt(bedsUnAvail) / parseInt(total)) * 100;
							//bedsPer = ( r.lstChargesSlave[int].allocateCount) / parseInt(r.lstChargesSlave[int].noOfBeds)) * 100;

						
							if (isNaN(bedsPer)) {
								bedsPer = 0;
							}*/
						
						if (undefined === (ajaxResponse.lstChargesSlave[i].listBeds)) {
							continue;
						}

						if (ajaxResponse.lstChargesSlave[i].listBeds.length > 0) {

							for ( var int1 = 0; int1 < ajaxResponse.lstChargesSlave[i].listBeds.length; int1++) {
								if (ajaxResponse.lstChargesSlave[i].listBeds[int1].bs == '2') {
									bclean++;
								} else if (ajaxResponse.lstChargesSlave[i].listBeds[int1].bs == '4') {
									bedsAvail++;
								} else if (ajaxResponse.lstChargesSlave[i].listBeds[int1].bs == '3') {
									bedsUnAvail++;
								}
							}

							total = (ajaxResponse.lstChargesSlave[i].listBeds.length);
							bedsPer = (parseInt(bedsUnAvail) / parseInt(total)) * 100;
						}

							
							var vacUnavl = bclean;

							bedNames = bedNames
									+ '<td class="col-md-2-1 text-center"><div id="dash_pie_'
									+ i
									+ '" class="piechart" data-percent="'
									+ bedsPer
									+ '"> <span class="percent"></span></div>	<span id="bedName">'
									+ ajaxResponse.lstChargesSlave[i].categoryName + '</span></td>';

						

					bedTotal = bedTotal
							+ '<td class="col-md-2-1 text-center">' + total
							+ '</td>';

					bedOccupied = bedOccupied
							+ '<td class="col-md-2-1 text-center">'
							+ bedsUnAvail + '</td>';

					bedVacBtUnavl = bedVacBtUnavl
							+ '<td class="col-md-2-1 text-center">'
							+ vacUnavl + '</td>';

					bedTotUnAvl = bedTotUnAvl
							+ '<td class="col-md-2-1 text-center">'
							+ (bedsUnAvail + vacUnavl) + '</td>';

					bedAvlWait = bedAvlWait
							+ '<td class="col-md-2-1 text-center">'
							+ bclean + '</td>';

					bedTotAvl = bedTotAvl
							+ '<td class="col-md-2-1 text-center">'
							+ bedsAvail + '</td>';

					// calculate total patient
					totalPatient += bedsUnAvail;
						}
						
						$("#bedAccupiedPer").html(bedNames);
						$("#bedTotals").html(bedTotal);
						$("#bedOccuppieds").html(bedOccupied);
						$("#bedVacBtUnavl").html(bedVacBtUnavl);
						$("#bedTotUnAvl").html(bedTotUnAvl);
						$("#bedAvlWait").html(bedAvlWait);
						$("#bedTotAvl").html(bedTotAvl);

						var colors = Array("#fb2900", "#ff7800", "#fff43b",
								"#8dfa30", "#01c86a", "#00d7b2", "#0092e3",
								"#002f7e", "#390e73", "#5D8AA8", "#ED9121",
								"#E52B50", "#A4C639", "#FBCEB1", "#4B5320",
								"#3B444B", "#89CFF0", "#A1CAF1", "#F5F5DC",
								"#BF94E4", "#08E8DE", "#004225", "#800020");

						for ( var i = 0; i < ajaxResponse.lstChargesSlave.length; i++) {
							$('#dash_pie_' + i).easyPieChart(
									{
										easing : 'easeOutBounce',
										onStep : function(from, to, percent) {
											$(this.el).find('.percent').text(
													Math.round(percent) + "%");
										},
										lineWidth : 6,
										barColor : colors[i]
									});

							window.chart = $('#dash_pie_1').data('easyPieChart');
						}

						

					} 
			});
}