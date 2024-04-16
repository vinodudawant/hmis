var ajaxResponse;
var count = 1;
var feedbackPatTemplate = "{#foreach $T.pl as pl}<tr><td class='col-md-1-1'>{count}.</td>"
	+ "<td class='numeric col-md-4-1'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
	+ "<td class='col-md-1-1 center'>{$T.pl.pi}</td>"
	+ "<td class='numeric col-md-1-1 center'>{$T.pl.ag}</td>"
	+ "<td class='numeric col-md-1-1 center'>{$T.pl.bg}</td>"
	+ "<td class='numeric col-md-2-1 center'>{$T.pl.mrNo}</td>"
	+ "<td class='numeric col-md-1-1 center'>"
	+ "<button class='btn btn-xs btn-success' id='btnSteaker{count}' "
	+ "style='font-size: 12px;' onClick=printFeedbackFormEnglish({count})>English</button></td>"
	+ "<td class='numeric col-md-1-1 center'>"
	+ "<button class='btn btn-xs btn-success' id='btnSteaker{count}' "
	+ "onClick=printFeedbackFormMarathi({count++}) style='font-size: 12px;'>Marathi</button></td>"
	+ "</tr>{#/for}";


function clickris(type, PID, TID, IDradiology) {
	/*var PID;
	var TID;*/
	if (PID == " " && TID == " ") {

		PID = $("#PID").html();
		TID = $("#TID").html();

	}
	var inputs = [];
	inputs.push('action=fetchPatInfo');
	inputs.push('pid=' + PID);
	inputs.push('tid=' + TID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			var result = $("#risdata").html();
			var myArray = JSON.parse(result);

			if (type == "createTemp") {
				window.location = "RisTemplate.jsp?";

			} else if (type == "viewRis") {

				for ( var i = 0; i < myArray.testDashboard.length; i++) {
					if (myArray.testDashboard[i].objTreat.pi == PID) {

						myObj = myArray.testDashboard[i];
						break;
					}
				}

				myObj = JSON.stringify(myObj);

				window.location = "ViewRis.jsp?" + "risObjhtm="
						+ encodeURIComponent(ajaxResponse) + "&typeDetail="
						+ encodeURIComponent(myObj) + "&Idradiology="
						+ IDradiology + "&Tid=" + TID + "&Pid=" + PID;

			} else if (type == "createReport") {

				window.location = "RisCreateReportTemp.jsp?" + "risObj="
						+ encodeURIComponent(ajaxResponse) + "&Tid=" + TID;
			}
		}
	});
}

function getRisPatInfo() {

	var PID = $("#PID").html();
	var TID = $("#TID").html();

	var inputs = [];
	inputs.push('action=fetchPatInfo');
	inputs.push('pid=' + PID);
	inputs.push('tid=' + TID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#RisPBar").setTemplate(TempViewRisBar);
			$("#RisPBar").processTemplate(pobj1);
			if(r.pl[0].objTreat.tf=="N"){
				$("#btnCreRepo").hide();
				$("#btnEditRepo").hide();
			}
		}
	});
}

var TestTemp = "<option	value='0'>-- Select --</option>{#foreach $T.rList as pattemplist}<option onclick='setdeatils({$T.pattemplist.invstId},{$T.pattemplist.id_invtest})'	value={$T.pattemplist.invstId}>{$T.pattemplist.invstTestName}</option>{#/for}";

function fetchRadiologyTest() {

	var TID = $("#TID").html();
    //alert(TID);
	var inputs = [];
	inputs.push('action=fetchradiotest');
	inputs.push('tid=' + TID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			var obj = eval('(' + ajaxResponse + ')');
			
			/*$("#idrid").val(obj.rList.id_invtest);*/
			$("#viewtest").setTemplate(TestTemp);
			$("#viewtest").processTemplate(obj);
		}
	});
}

var RisImageTemp = "<div class='col-sm-12-1 scroller' style='margin-top:-21px; overflow-y: scroll;  height: 250px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'  style='margin-left: -20px; width: 103.2%;''>"
		+ "<tbody>"
		+ "{#foreach $T.rImgList as img}"
		+ "<tr>"
		+ "<td class='col-md-1 center' style='height: 21.5px;'>{count++}</td>"
		+ "<td class='col-md-7' style='height: 21.5px;'><a href='RisImageReadServlet?name={$T.img.imageName}' style='color:black;'>{$T.img.imageName}</a></td>"
		+ "<td class='col-md-4 center' style='height: 21.5px;'>{$T.img.date}</td>"
		+ "</tr>{#/for}</tbody></table></div>";

function fetchImage(testid,invid) {

	var TID = $("#TID").html();
	count = 1;
	var inputs = [];
	inputs.push('action=fetchImageTest');
	inputs.push('tid=' + TID);
	inputs.push('testID=' + testid);
	inputs.push('invid=' + invid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			var obj = eval('(' + ajaxResponse + ')');

			$("#listImg").setTemplate(RisImageTemp);
			$("#listImg").processTemplate(obj);
		}
	});
}

/*function setdeatils(TestID) {
	$("#btnCreRepo").attr('disabled', true);
	$("#TestID").html(TestID);
	$("#testid").val(TestID);
	var inputs = [];
	inputs.push('action=fetchtestrisdetails');
	inputs.push('TestID=' + TestID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			var ajaxResp = r;

			myArray = JSON.parse(ajaxResp);
			for ( var i = 0; i < myArray.testDashboard.length; i++) {

				if (myArray.testDashboard[i].IdRadioTestName == 0) {
					$("#btnCreRepo").attr('disabled', false);
					break;
				}
			}

			pobj1 = eval('(' + ajaxResp + ')');
			setTypeData(pobj1);

			fetchImage(TestID);
		}
	});
}*/


function setdeatils(TestID,invid) {
	$("#btnCreRepo").attr('disabled', true);
	$("#TestID").html(TestID);
	$("#testid").val(TestID);
	$("#idInv").val(invid);
	$("#testidinv").val(invid);
	var inputs = [];
	inputs.push('action=fetchtestrisdetails');
	inputs.push('TestID=' + TestID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			var ajaxResp = r;

			myArray = JSON.parse(ajaxResp);
			for ( var i = 0; i < myArray.testDashboard.length; i++) {

				if (myArray.testDashboard[i].IdRadioTestName == 0) {
					$("#btnCreRepo").attr('disabled', false);
					$("#saveImage").attr('disabled', false);
					break;
				}
			}

			pobj1 = eval('(' + ajaxResp + ')');
			fetchServicescat(TestID);
			fetchImage(TestID,invid);
		}
	});
	getTestDeatils(TestID,invid);
}
function getTestDeatils(TestID,invid) {
	
	//var PID = $("#patid").text();
	var PID = $("#PID").html();
	var tretId=$("#TID").text();
	var idInv=invid;
	var inputs = [];
	inputs.push('action=fetchRisViewReportTemp');
	inputs.push('TestID=' + TestID);
	inputs.push('tretId=' + tretId);
	inputs.push('pid=' + PID);
	inputs.push('idInv=' + idInv);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('error');
		},
		success : function(r) {
			var len=JSON.parse(r).RTList.length;
	
			if(len>0){
				$("#btnCreRepo").attr('disabled', false);
				$("#btnViewReport").attr('disabled', false);
				
				pobj1 = eval('(' + r + ')');

				CKEDITOR.instances['viewckeditor1']
						.setData(pobj1.RTList[0].TempData);
				
				$("#btnCreRepo").hide();
				$("#btnEditRepo").show();
				
			}
			else{
				$("#btnViewReport").attr('disabled', true);
				if(sessionStorage.getItem("flag")==0){
					$("#btnCreRepo").hide();
					$("#btnEditRepo").hide();
				}
				else{
					$("#btnCreRepo").show();
					$("#btnEditRepo").hide();
				}
				CKEDITOR.instances['viewckeditor1']
				.setData("");
			}
			
			
			
			var ajaxRes=$("#viewtypedata").html();
			ajaxRes=JSON.parse(ajaxRes);
			if(ajaxRes.objTreat.tf=="INACTIVE"){
				$("#btnCreRepo").hide();
				$("#btnEditRepo").hide();
			}
		}
	});
	
}
function fetchServicescat(TestID) {
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"serviceId" : parseInt(TestID)
		},
		url : "ehat/subservice/fetchSuperCatogoires",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			setDyanamicList('radioservices',response);
		}
	});
}
function setDyanamicList(setDiv,response) {
	var htm ="";
	for ( var i = 0; i < response.lstSubService.length; i++) {
		var count =i;
		var name = response.lstSubService[i].categoryName;
		var id = response.lstSubService[i].subId;
		 htm = htm+ '<li class="select2-search-choice" id="liItme'
			+ i
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
		 	+'</li>';
	}
	$('#' + setDiv).html(htm);
}
function setTypeData(obj) {

	$("#testCodeViewRis").val(obj.testDashboard[0].testCode);
	$("#testTypeViewRis").val(obj.testDashboard[0].grpName);
	$("#bodyPartViewRis").val(obj.testDashboard[0].InvestbodyPart.bodyPartName);
	$("#instViewRis").val(obj.testDashboard[0].Instruct);
	$("#clnoteViewRis").val(obj.testDashboard[0].clnote);
}

function changeButton() {

	$("#btnViewReport").attr('disabled', true);
	$("#btnCreRepo").attr('disabled', true);
	$("#btnEditRepo").hide();
	
	if(sessionStorage.getItem("flag")==0)
		$("#saveImage").hide();
}

function savePatientTemp() {

	var TestID = $("#TestID").html();
	var tempID = $("#risTempList").val();

	var inputs = [];
	inputs.push('action=saveRisPatTemp');
	inputs.push('tid=' + TID);
	inputs.push('tempID=' + tempID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			alert("Save Successfully...");
		}

	});

}

function savePhoto() {

	/*
	 * var patid = $("#PID").html(); var TestID = $("#TID").html(); var trid =
	 * $("#viewtest").val();
	 */

	var inputs = [];
//	inputs.push('action=savePhoto');
	inputs.push('testid=' + TestID);
	inputs.push('patid=' + patid);
	inputs.push('trid=' + trid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		async : false,
		cache : false,

		error : function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;

			alert("Image Upload Successfully....");
			// setTemplateRis("view");

			window.location.replace("ViewRis.jsp");

		}

	});

}

/*function saveCrtReportTemp() {
	var TempID = $("#TempID").html();
	var TestID = $("#TestID").html();

	var inputs = [];
	inputs.push('action=saveCrtReportTemp');
	inputs.push('TempID=' + TempID);
	inputs.push('TestID=' + TestID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			alert("Save Successfully...");
		}

	});

}*/

function saveCrtReportTemp() {
	var TempID = $("#risTempList").val();
//	var patid = $("#patid").text();
	var patid = $("#patientId").text();
	var TestID = $("#TestID").text();
	var TempTypeID = $("#selRisCrTempList").val();
	var note = CKEDITOR.instances["Riseditor1"].getData();
	
	var ajaxResp = $("#patdet").html();
	var r=JSON.parse(ajaxResp);
	var tretId=r.pl[0].objTreat.ti;
    var Invidrd = $("#Invidrd").val();
	var inputs = [];
	inputs.push('action=saveCrtReportTemp');
	inputs.push('TempID=' + TempID);
	inputs.push('TestID=' + TestID);
	inputs.push('tretId=' + tretId);
	inputs.push('TempTypeID=' + TempTypeID);
	inputs.push('patid=' + patid);
	inputs.push('Invidrd=' + Invidrd);
	inputs.push('note=' + encodeURIComponent(note));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			alert("Save Successfully...");
			//$("#hiddenIdForTestID").val(TestID);
			//window.history.back();
			
			//clickris('viewRis', patid, tretId, 0);
			
			var patdet=$("#patdet").html();
			//window.history.back();
			window.location = "ViewRis.jsp?" + "risObjhtm="
			+ encodeURIComponent(patdet) + "&Tid=" + tretId + "&Pid=" + patid;
		}

	});

}

/*function FetchRisReportTemp() {
	$("#cke_15").hide();
	$("#cke_16").hide();
	$("#cke_17").hide();
	$("#cke_18").hide();
	$("#cke_20").hide();
	$("#cke_21").hide();
	$("#cke_29").hide();
	$("#cke_34").hide();
	$("#cke_44").hide();
	$("#cke_52").hide();
	$("#cke_66").hide();
	$("#cke_70").hide();
	$("#cke_10").hide();
	$("#cke_11").hide();
	$("#cke_12").hide();
	$("#cke_13").hide();
	$("#cke_80").hide();
	$("#cke_83").hide();
	$("#cke_86").hide();

	$("#cke_1_bottom").hide();
	var TestID = $("#TestID").html();

	var inputs = [];
	inputs.push('action=fetchRisViewReportTemp');
	inputs.push('TestID=' + TestID);
	// inputs.push('pid=' + PID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;

			pobj1 = eval('(' + ajaxResponse + ')');

			CKEDITOR.instances['viewckeditor1']
					.setData(pobj1.RTList[0].TempData);
		}
	});
}*/
function FetchRisReportTemp() {
	$("#cke_15").hide();
	$("#cke_16").hide();
	$("#cke_17").hide();
	$("#cke_18").hide();
	$("#cke_20").hide();
	$("#cke_21").hide();
	$("#cke_29").hide();
	$("#cke_34").hide();
	$("#cke_44").hide();
	$("#cke_52").hide();
	$("#cke_66").hide();
	$("#cke_70").hide();
	$("#cke_10").hide();
	$("#cke_11").hide();
	$("#cke_12").hide();
	$("#cke_13").hide();
	$("#cke_80").hide();
	$("#cke_83").hide();
	$("#cke_86").hide();

	$("#cke_1_bottom").hide();
	
//	var TestID = $("#hiddenIdForTestID").val();
	var TestID = $("#TestID").html();
	var PID = $("#PID").html();
//	var PID = $("#patid").text();
	var tretId=$("#TID").text();
	var idInv=$("#idInv").val();
	var inputs = [];
	inputs.push('action=fetchRisViewReportTemp');
	inputs.push('TestID=' + TestID);
	inputs.push('tretId=' + tretId);
	inputs.push('pid=' + PID);
	inputs.push('idInv=' + idInv);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('error');
		},
		success : function(r) {
			ajaxResponse = r;

			pobj1 = eval('(' + ajaxResponse + ')');

			CKEDITOR.instances['viewckeditor1']
					.setData(pobj1.RTList[0].TempData);
			
			/*var note = CKEDITOR.instances["viewckeditor1"].getData();
			CKEDITOR.instances['viewckeditor1']
			.setData(note+"Note : "+$("#risNote").val());*/
		}
	});
}
function hidePopUpRIS() {
	// $("#popup1").hide();
}

function riscreaterep(check) {

	var TestID = $("#TestID").html();
	var idInv = $("#idInv").val();
	var TID = $("#TID").text();
	var ajaxResponse = $("#patdet").html();

	window.location = "RisCreateReportTemp.jsp?" + "risObj="
			+ encodeURIComponent(ajaxResponse) + "&TestID=" + TestID + "&check=" + check +"&idInv=" + idInv + "&TID=" + TID;

}

var containerTemplate = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 5.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 41%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div id='divPi{count}' style='width: 16%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.pi}</div><div style='width: 9.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' class='edit' value='VIEW' id='btnView{count}' onClick='passToView(this)'/></div><div style='width: 12.1%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='EDIT'  class='edit' id='btnEdit{count}' class='edit' onclick='passToEdit({$T.pl.pi})' /></div><div style='width: 10%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' class='edit' value='DELETE'  class='edit' id='btnDelete{count}' onClick='deletePatient({$T.pl.pi},{$T.pl.objTreat.ti})'/></div></div>{#/for}";

var steakerTemplate = "{#foreach $T.pl as pl}<tr>	<td class='col-md-1-1'>{count++}.</td>	<td class='numeric col-md-4-1'>{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td><td class='col-md-1-1'>{$T.pl.pi}</td>	<td class='numeric col-md-2-1'>{$T.pl.ag}</td>	<td class='numeric col-md-2-1'>{$T.pl.bg}</td>	<td class='numeric col-md-2-1'><input style='font-size: 10px;' type='button' value='STICKER' id='btnSteaker{count}' onClick=printSteaker(this) class='edit' /></td></tr>{#/for}";

var setSteakerTemp = "<table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0	align=left	style='border-collapse: collapse; border: none; mso-border-alt: solid windowtext .5pt; mso-border-right-alt: dashed windowtext .5pt; mso-table-lspace: 9.0pt; margin-left: 6.75pt; mso-table-rspace: 9.0pt; margin-right: 6.75pt; mso-table-anchor-vertical: margin; mso-table-anchor-horizontal: margin; mso-table-left: -12.8pt; mso-table-top: -1.0in; mso-padding-top-alt: 0in; mso-padding-bottom-alt: 0in; mso-border-insideh: .5pt dashed windowtext; mso-border-insidev: .5pt dashed windowtext'><tr		style='mso-yfti-irow: 0; mso-yfti-firstrow: yes; page-break-inside: avoid; height: 1.5in; mso-row-margin-left: .75pt'>		<td			style='mso-cell-special: placeholder; border: none; padding: 0in 0in 0in 0in'			width=1>		<p class='MsoNormal'>&nbsp;		</td>		<td width=384			style='width: 4.0in; border: solid windowtext 1.0pt; mso-border-alt: solid windowtext .5pt; padding: 0in .75pt 0in .75pt; height: 1.5in'>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'>Patient Name: {$T.fn} {$T.mn} {$T.ln}<o:p></o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><o:p>&nbsp;</o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'>UHID: {$T.pi} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Age:{$T.ag}   <o:p></o:p></b></p>		<p class=MsoNormal align=right			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; text-align: right; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><o:p>&nbsp;</o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'>Mob.No: {$T.mb}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Blood G.: {$T.bg} <o:p></o:p></b></p>		</td>		<td width=384			style='width: 4.0in; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0in .75pt 0in .75pt; height: 1.5in'>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'>Patient Name: {$T.fn} {$T.mn} {$T.ln}<o:p></o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><o:p>&nbsp;</o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'>UHID: {$T.pi} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Age:{$T.ag}   <o:p></o:p></b></p>		<p class=MsoNormal align=right			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; text-align: right; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><o:p>&nbsp;</o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'>Mob.No: {$T.mb}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Blood G.: {$T.bg} <o:p></o:p></b></p>		</td>	</tr><tr		style='mso-yfti-irow: 0; mso-yfti-firstrow: yes; page-break-inside: avoid; height: 1.5in; mso-row-margin-left: .75pt'>		<td			style='mso-cell-special: placeholder; border: none; padding: 0in 0in 0in 0in'			width=1>		<p class='MsoNormal'>&nbsp;		</td>		<td width=384			style='width: 4.0in; border: solid windowtext 1.0pt; mso-border-alt: solid windowtext .5pt; padding: 0in .75pt 0in .75pt; height: 1.5in'>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'>Patient Name: {$T.fn} {$T.mn} {$T.ln}<o:p></o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><o:p>&nbsp;</o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><span			style='mso-spacerun: yes'></span>UHID: {$T.pi} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Age:{$T.ag}   <o:p></o:p></b></p>		<p class=MsoNormal align=right			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; text-align: right; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><o:p>&nbsp;</o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><span			style='mso-spacerun: yes'></span>Mob.No: {$T.mb}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Blood G.: {$T.bg} <o:p></o:p></b></p>		</td>		<td width=384			style='width: 4.0in; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0in .75pt 0in .75pt; height: 1.5in'>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><span			style='mso-spacerun: yes'></span>Patient Name: {$T.fn} {$T.mn} {$T.ln}<o:p></o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><o:p>&nbsp;</o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><span			style='mso-spacerun: yes'></span>UHID: {$T.pi} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Age:{$T.ag}   <o:p></o:p></b></p>		<p class=MsoNormal align=right			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; text-align: right; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><o:p>&nbsp;</o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><span			style='mso-spacerun: yes'></span>Mob.No: {$T.mb}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Blood G.: {$T.bg} <o:p></o:p></b></p>		</td>	</tr><tr		style='mso-yfti-irow: 0; mso-yfti-firstrow: yes; page-break-inside: avoid; height: 1.5in; mso-row-margin-left: .75pt'>		<td			style='mso-cell-special: placeholder; border: none; padding: 0in 0in 0in 0in'			width=1>		<p class='MsoNormal'>&nbsp;		</td>		<td width=384			style='width: 4.0in; border: solid windowtext 1.0pt; mso-border-alt: solid windowtext .5pt; padding: 0in .75pt 0in .75pt; height: 1.5in'>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><span			style='mso-spacerun: yes'>&nbsp </span>Patient Name: {$T.fn} {$T.mn} {$T.ln}<o:p></o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><o:p>&nbsp;</o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><span			style='mso-spacerun: yes'>&nbsp </span>UHID: {$T.pi} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Age:{$T.ag}   <o:p></o:p></b></p>		<p class=MsoNormal align=right			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; text-align: right; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><o:p>&nbsp;</o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><span			style='mso-spacerun: yes'>&nbsp </span>Mob.No: {$T.mb}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Blood G.: {$T.bg} <o:p></o:p></b></p>		</td>		<td width=384			style='width: 4.0in; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0in .75pt 0in .75pt; height: 1.5in'>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><span			style='mso-spacerun: yes'>&nbsp </span>Patient Name: {$T.fn} {$T.mn} {$T.ln}<o:p></o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><o:p>&nbsp;</o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><span			style='mso-spacerun: yes'>&nbsp </span>UHID: {$T.pi} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Age:{$T.ag}   <o:p></o:p></b></p>		<p class=MsoNormal align=right			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; text-align: right; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><o:p>&nbsp;</o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><span			style='mso-spacerun: yes'>&nbsp </span>Mob.No: {$T.mb}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Blood G.: {$T.bg} <o:p></o:p></b></p>		</td>	</tr><tr		style='mso-yfti-irow: 0; mso-yfti-firstrow: yes; page-break-inside: avoid; height: 1.5in; mso-row-margin-left: .75pt'>		<td			style='mso-cell-special: placeholder; border: none; padding: 0in 0in 0in 0in'			width=1>		<p class='MsoNormal'>&nbsp;		</td>		<td width=384			style='width: 4.0in; border: solid windowtext 1.0pt; mso-border-alt: solid windowtext .5pt; padding: 0in .75pt 0in .75pt; height: 1.5in'>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><span			style='mso-spacerun: yes'>&nbsp </span>Patient Name: {$T.fn} {$T.mn} {$T.ln}<o:p></o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><o:p>&nbsp;</o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><span			style='mso-spacerun: yes'>&nbsp </span>UHID: {$T.pi} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Age:{$T.ag}   <o:p></o:p></b></p>		<p class=MsoNormal align=right			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; text-align: right; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><o:p>&nbsp;</o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><span			style='mso-spacerun: yes'>&nbsp </span>Mob.No: {$T.mb}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Blood G.: {$T.bg} <o:p></o:p></b></p>		</td>		<td width=384			style='width: 4.0in; border: solid windowtext 1.0pt; border-left: none; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0in .75pt 0in .75pt; height: 1.5in'>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><span			style='mso-spacerun: yes'>&nbsp </span>Patient Name: {$T.fn} {$T.mn} {$T.ln}<o:p></o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><o:p>&nbsp;</o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><span			style='mso-spacerun: yes'>&nbsp </span>UHID: {$T.pi} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Age:{$T.ag}   <o:p></o:p></b></p>		<p class=MsoNormal align=right			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; text-align: right; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'><o:p>&nbsp;</o:p></b></p>		<p class=MsoNormal			style='margin-top: 0in; margin-right: 7.65pt; margin-bottom: 0in; margin-left: 7.65pt; margin-bottom: .0001pt; mso-element: frame; mso-element-frame-hspace: 9.0pt; mso-element-wrap: around; mso-element-anchor-horizontal: margin; mso-element-left: -12.75pt; mso-element-top: -1.0in; mso-height-rule: exactly'><b			style='mso-bidi-font-weight: normal'>Mob.No: {$T.mb}   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Blood G.: {$T.bg} <o:p></o:p></b></p>		</td>	</tr></table>";

var patientEditTemplate = "<div style='width: 98%; background-color: #bfdbff; border: 1px solid #39C; padding: 1%;'><div style='width: 20%;'><form action='PatientServlet?page=update&patID={$T.pi}' name='frmUpload' id='frmUpload' method='post'	enctype='multipart/form-data'>{#if $T.im!= ''}<img src='{$T.im}' width='110' height='110' name='patImg' id='patImg' />{#/if}{#if $T.im== ''} <img src='images/patientPhoto.jpg' width='60%' height='60%' name='patImg' id='patImg' /> {#/if}<input type='file'	name='file1' id='file1' onchange='readURL(this)' /></form></div><div style='width: 80%;'><div style='width: 100%;'><div style='width: 50%;'><div style='width: 100%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%;'>UHID</div><div style='width: 42%; padding-right: 7%;'><input style='width: 100%; background-color: gray;' id='patID' name='patID' type='text' value='{$T.pi}' readonly='readonly' /></div></div><div style='width: 100%; padding-top: 2%;'>	<div style='width: 43%; padding-left: 7%; padding-top: 0%;'>First Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id='title'><option value='Mr.'>Mr.</option><option value='Mrs.'>Mrs.</option><option value='Miss.'>Miss.</option><option value='Mast.'>Mast.</option><option value='B/O.'>B/O.</option></select></div><div style='width: 42%; padding-right: 3%;'><input style='width: 100%;' id='fName' name='fName'	type='text' value='{$T.fn}' 	onkeypress='return validatealphabetic(event)' /></div><div style='width: 1%; color: red'><b>*</b></div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%;'>Middle Name</div><div style='width: 42%; padding-right: 7%;'><input style='width: 100%;' id='mName' name='mName' type='text' value='{$T.mn}' onkeypress='return validatealphabetic(event)' /></div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%;'>Last Name</div><div style='width: 42%; padding-right: 3%;'><input style='width: 100%;' id='lName' name='lNAME'	type='text' value='{$T.ln}' onkeypress='return validatealphabetic(event)' /></div><div style='width: 1%; color: red'><b>*</b></div></div></div><div style='width: 50%;'><div style='width: 100%;'><div style='width: 33%; padding-left: 7%; padding-top: 1%;'>D.O.B</div><div style='width: 52%; padding-right: 3%;'><input style='width: 100%;' id='popup_container2'	name='dob' type='text' value='{$T.db}'		onmousemove='autoAge()' /></div><div style='width: 1%; color: red'><b></b></div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 33%; padding-left: 7%; padding-top: 1%;'>Gender</div><div style='width: 53%; padding-right: 7%;'><select style='width: 100%;' id='sex' name='sex'><option value=''>Select Gender</option><option value='Male'>Male</option><option value='Female'>Female</option></select></div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 33%; padding-left: 7%; padding-top: 1%;'>Age</div><div style='width: 52%; padding-right: 3%;'>"
		+ "<input style='width: 60%;' id='age' name='age' type='text' value='{$T.ag}' onkeypress='return validateNumbers(event)' /><select id='ageType'><option value='Yrs'>Yrs.</option><option value='Months'>Months.</option><option value='Days'>Days.</option></select></div><div style='width: 1%; color: red'><b>*</b></div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 33%; padding-left: 7%; padding-top: 1%;'>Weight</div><div style='width: 52%; padding-right: 7%;'><input style='width: 60%;' id='weight' name='weight' type='text' value='{$T.wt}' onkeypress='return validateNumbers(event)' /><select id='wtType'><option value='Kg''>kg.</option></select></div></div></div></div></div></div><div style='width: 100%;'>	<div style='width: 30%;'><div style='width: 100%; padding-top: 6%;'><div style='width: 35%;'>Refered By</div><div style='width: 61%; color: #000; text-align: left; float: left;'><select id='refBy' style='width: 100%;' name='referedBy' onkeypress='return validatealphabetic(event)'></select></div></div><div style='width: 100%; padding-top: 3%;'><div style='width: 35%;'>Refered By Mob.</div><div style='width: 60%;'><input type='text' id='refByMob' name='refByMob' value='{$T.refByMo}' style='width: 100%;'	onkeypress='return validateNumbers(event)' maxlength='10' /></div></div><div style='width: 100%; padding-top: 3%;'><div style='width: 35%;'>Refered To</div><div style='width: 60%;'><input type='text' id='refTo' name='referedTo'	value='{$T.rt}' value='DR.SMR' style='width: 100%;'	onkeypress='return validatealphabetic(event)' /></div></div><div style='width: 100%; padding-top: 3%;'><div style='width: 35%;'>Register Date</div><div style='width: 60%;'><input type='text' id='popup_container3' value='{$T.rgDt}' name='popup_container3' style='width: 100%;' /></div><div style='width: 0%; color: red; margin-left: 12px'><b>*</b></div></div><div style='width: 100%; padding-top: 3%;'><div style='width: 35%;'>Relative Name</div><div style='width: 60%;'><input style='width: 100%;' id='relNm' name='relNm' value='{$T.rn}' type='text' onkeypress='return validatealphabetic(event)' /></div></div></div><div style='width: 30%; margin-left: 30px;'><div style='width: 100%; padding-top: 6%;'><div style='width: 35%;'>Blood Group</div><div style='width: 61%;'><select style='width: 100%;' id='blood' name='blood'><option value=''>SELECT</option>	<option value='A +ve'>A +</option><option value='A -ve'>A -</option><option value='B +ve'>B +</option><option value='B -ve'>B -</option><option value='AB +ve'>AB +</option><option value='AB -ve'>AB -</option><option value='O +ve'>O +</option><option value='O -ve'>O -</option></select></div></div><div style='width: 100%; padding-top: 3%;'><div style='width: 35%;'>Maritial Status</div><div style='width: 61%;'><select style='width: 100%;' id='radioGroup1' name='radioGroup1'><option value='UnMarried'>UnMarried</option><option value='Married'>Married</option></select></div></div><div style='width: 100%; padding-top: 3%;'><div style='width: 35%;'>Mobile No.</div><div style='width: 60%;'><input style='width: 100%;' id='mobNo' name='mobNo' value='{$T.mb}' type='text' onkeypress='return validateNumbers(event)' maxlength='10' />"
		+ "</div><div style='width: 0%; color: red; margin-left: 12px;'><b>*</b></div></div><div style='width: 100%; padding-top: 3%;'><div style='width: 35%;'>Office No.</div><div style='width: 60%;'><input style='width: 100%;' id='ofNo' name='ofNo' value='{$T.on}' type='text' onkeypress='return validateNumbers(event)' /></div></div><div style='width: 100%; padding-top: 3%;'><div style='width: 35%;'>Emer. Contact No.</div>	<div style='width: 60%;'><input style='width: 100%;' id='emrNo' name='emrNo' value='{$T.ec}' type='text' onkeypress='return validateNumbers(event)' /></div></div></div><div style='width: 30%; margin-left: 30px;'><div style='width: 100%; padding-top: 6%;'>	<div style='width: 35%;'>Address</div><div style='width: 60%;'><textarea id='conAdd1' name='conAdd1' rows='2'	style='width: 100%;'>{$T.a1}</textarea><input type='hidden' value='' style='width: 100%;' id='conAdd2' name='conAdd2' /> <input type='hidden' value='' style='width: 100%;' id='conAdd3' name='conAdd3' /></div><div style='width: 0%; color: red; margin-left: 12px;'>	<b>*</b></div></div><div style='width: 100%; padding-top: 3%;'><div style='width: 35%;'>Note</div><div style='width: 60%;'><textarea style='width: 100%;' name='note' id='note' cols=''	rows='2'>{$T.sym}</textarea></div></div><div style='width: 100%; padding-top: 3%;'>	<div style='width: 35%;'>Special Discount</div><div style='width: 61%;'><select id='SpecialDiscount' style='width: 100%;'></select></div></div></div><div style='width: 100%; padding-top: 10px;'><div	style='width: 96%; background-color: #eee; padding: 1%; margin-top: 10px'><div style='width: 100%;'>Receive Messages Using</div><div style='width: 100%; padding-top: 15px;'><div style='width: 33%;'><div style='width: 100%; padding-bottom: 5px;'>Transactional</div><div style='width: 100%;'><div style='width: 50%'><input type='checkbox' id='chktranEmail'	name='chktranEmail' />Email	</div><div style='width: 50%'><input name='chkTranSms' id='chkTranSms' type='checkbox'	value='' />SMS</div></div></div><div style='width: 33%;'><div style='width: 100%; padding-bottom: 5px;'>Informational</div>	<div style='width: 100%;'><div style='width: 50%'><input type='checkbox' id='chkInforEmail'	name='chkInforEmail' />Email</div><div style='width: 50%'><input name='chkInforSms' id='chkInforSms' type='checkbox' value='' />SMS</div></div></div><div style='width: 33%;'><div style='width: 100%; padding-bottom: 5px;'>Promotional</div><div style='width: 100%;'><div style='width: 50%'><input type='checkbox' id='chkPrmEmail'	name='chkPrmEmail' />Email</div><div style='width: 50%'><input name='chkPrmSms' type='checkbox' value='' id='chkPrmSms' />SMS</div></div></div></div></div></div><div	style='width: 100%; float: right; height: 50px; padding-top: 20px; padding-bottom: 50px;'><div style='width:10%;'>Upload file</div><form action='' id='fileUploadfrm' name='fileUploadfrm'	enctype='multipart/form-data' method='post'><div><input type='file' name='fileUp' id='fileUp' size='31' />&nbsp;&nbsp;&nbsp; <input type='button' value='Upload' onclick='uploadFile({$T.pi})' /><br></div></form><div style='width: 49%; padding-top: 5px;margin-left:5px;' id='divPatFilesDisp'></div><div id='removeBtn'></div></div></div>";

var patientViewTemplate = "<div style='width: 98%; background-color: #bfdbff; border: 1px solid #39C; padding: 1%;'><div style='width: 20%;'><form action='PatientServlet?page=update&patID={$T.pi}' name='frmUpload' id='frmUpload' method='post'	enctype='multipart/form-data'>{#if $T.im!= ''}<img src='{$T.im}' width='110' height='110' name='patImg' id='patImg' />{#/if}{#if $T.im== ''} <img src='images/patientPhoto.jpg' width='60%' height='60%' name='patImg' id='patImg' /> {#/if}</form></div><div style='width: 80%;'><div style='width: 100%;'><div style='width: 50%;'><div style='width: 100%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%;'>UHID</div><div style='width: 42%; padding-right: 7%;'><input style='width: 100%; background-color: gray;' id='patID' name='patID' type='text' value='{$T.pi}' readonly='readonly' /></div></div><div style='width: 100%; padding-top: 2%;'>	<div style='width: 43%; padding-left: 7%; padding-top: 0%;'>First Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id='title'><option value='Mr.'>Mr.</option><option value='Mrs.'>Mrs.</option><option value='Miss.'>Miss.</option><option value='Mast.'>Mast.</option><option value='B/O.'>B/O.</option></select></div><div style='width: 42%; padding-right: 3%;'><input style='width: 100%;' id='fName' name='fName'	type='text' value='{$T.fn}' 	onkeypress='return validatealphabetic(event)' /></div><div style='width: 1%; color: red'><b>*</b></div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%;'>Middle Name</div><div style='width: 42%; padding-right: 7%;'><input style='width: 100%;' id='mName' name='mName' type='text' value='{$T.mn}' onkeypress='return validatealphabetic(event)' /></div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%;'>Last Name</div><div style='width: 42%; padding-right: 3%;'><input style='width: 100%;' id='lName' name='lNAME'	type='text' value='{$T.ln}' onkeypress='return validatealphabetic(event)' /></div><div style='width: 1%; color: red'><b>*</b></div></div></div><div style='width: 50%;'><div style='width: 100%;'><div style='width: 33%; padding-left: 7%; padding-top: 1%;'>D.O.B</div><div style='width: 52%; padding-right: 3%;'><input style='width: 100%;' id='popup_container2'	name='dob' type='text' value='{$T.db}'		onmousemove='autoAge()' /></div><div style='width: 1%; color: red'><b></b></div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 33%; padding-left: 7%; padding-top: 1%;'>Gender</div><div style='width: 53%; padding-right: 7%;'><select style='width: 100%;' id='sex' name='sex'><option value=''>Select Gender</option><option value='Male'>Male</option><option value='Female'>Female</option></select></div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 33%; padding-left: 7%; padding-top: 1%;'>Age</div><div style='width: 52%; padding-right: 3%;'>"
		+ "<input style='width: 60%;' id='age' name='age' type='text' value='{$T.ag}' onkeypress='return validateNumbers(event)' /><select id='ageType'><option value='Yrs'>Yrs.</option><option value='Months'>Months.</option><option value='Days'>Days.</option></select></div><div style='width: 1%; color: red'><b>*</b></div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 33%; padding-left: 7%; padding-top: 1%;'>Weight</div><div style='width: 52%; padding-right: 7%;'><input style='width: 60%;' id='weight' name='weight' type='text' value='{$T.wt}' onkeypress='return validateNumbers(event)' /><select id='wtType'><option value='Kg''>kg.</option></select></div></div></div></div></div></div><div style='width: 100%;'>	<div style='width: 30%;'><div style='width: 100%; padding-top: 6%;'><div style='width: 35%;'>Refered By</div><div style='width: 61%; color: #000; text-align: left; float: left;'><select id='refBy' style='width: 100%;' name='referedBy' onkeypress='return validatealphabetic(event)'></select></div></div><div style='width: 100%; padding-top: 3%;'><div style='width: 35%;'>Refered By Mob.</div><div style='width: 60%;'><input type='text' id='refByMob' name='refByMob' value='{$T.refByMo}' style='width: 100%;'	onkeypress='return validateNumbers(event)' maxlength='10' /></div></div><div style='width: 100%; padding-top: 3%;'><div style='width: 35%;'>Refered To</div><div style='width: 60%;'><input type='text' id='refTo' name='referedTo'	value='{$T.rt}' value='DR.SMR' style='width: 100%;'	onkeypress='return validatealphabetic(event)' /></div></div><div style='width: 100%; padding-top: 3%;'><div style='width: 35%;'>Register Date</div><div style='width: 60%;'><input type='text' id='popup_container3' value='{$T.rgDt}' name='popup_container3' style='width: 100%;' /></div><div style='width: 0%; color: red; margin-left: 12px'><b>*</b></div></div><div style='width: 100%; padding-top: 3%;'><div style='width: 35%;'>Relative Name</div><div style='width: 60%;'><input style='width: 100%;' id='relNm' name='relNm' value='{$T.rn}' type='text' onkeypress='return validatealphabetic(event)' /></div></div></div><div style='width: 30%; margin-left: 30px;'><div style='width: 100%; padding-top: 6%;'><div style='width: 35%;'>Blood Group</div><div style='width: 61%;'><select style='width: 100%;' id='blood' name='blood'>	<option value=''>SELECT</option><option value='A +ve'>A +</option><option value='A -ve'>A -</option><option value='B +ve'>B +</option><option value='B -ve'>B -</option><option value='AB +ve'>AB +</option><option value='AB -ve'>AB -</option><option value='O +ve'>O +</option><option value='O -ve'>O -</option></select></div></div><div style='width: 100%; padding-top: 3%;'><div style='width: 35%;'>Maritial Status</div><div style='width: 61%;'><select style='width: 100%;' id='radioGroup1' name='radioGroup1'><option value='UnMarried'>UnMarried</option><option value='Married'>Married</option></select></div></div><div style='width: 100%; padding-top: 3%;'><div style='width: 35%;'>Mobile No.</div><div style='width: 60%;'><input style='width: 100%;' id='mobNo' name='mobNo' value='{$T.mb}' type='text' onkeypress='return validateNumbers(event)' maxlength='10' />"
		+ "</div><div style='width: 0%; color: red; margin-left: 12px;'><b>*</b></div></div><div style='width: 100%; padding-top: 3%;'><div style='width: 35%;'>Office No.</div><div style='width: 60%;'><input style='width: 100%;' id='ofNo' name='ofNo' value='{$T.on}' type='text' onkeypress='return validateNumbers(event)' /></div></div><div style='width: 100%; padding-top: 3%;'><div style='width: 35%;'>Emer. Contact No.</div>	<div style='width: 60%;'><input style='width: 100%;' id='emrNo' name='emrNo' value='{$T.ec}' type='text' onkeypress='return validateNumbers(event)' /></div></div></div><div style='width: 30%; margin-left: 30px;'><div style='width: 100%; padding-top: 6%;'>	<div style='width: 35%;'>Address</div><div style='width: 60%;'><textarea id='conAdd1' name='conAdd1' rows='2'	style='width: 100%;'>{$T.a1}</textarea><input type='hidden' value='' style='width: 100%;' id='conAdd2' name='conAdd2' /> <input type='hidden' value='' style='width: 100%;' id='conAdd3' name='conAdd3' /></div><div style='width: 0%; color: red; margin-left: 12px;'>	<b>*</b></div></div><div style='width: 100%; padding-top: 3%;'><div style='width: 35%;'>Note</div><div style='width: 60%;'><textarea style='width: 100%;' name='note' id='note' cols=''	rows='2'>{$T.sym}</textarea></div></div><div style='width: 100%; padding-top: 3%;'>	<div style='width: 35%;'>Special Discount</div><div style='width: 61%;'><select id='SpecialDiscount' style='width: 100%;'></select></div></div></div><div style='width: 100%; padding-top: 10px;'><div	style='width: 96%; background-color: #eee; padding: 1%; margin-top: 10px'><div style='width: 100%;'>Receive Messages Using</div><div style='width: 100%; padding-top: 15px;'><div style='width: 33%;'><div style='width: 100%; padding-bottom: 5px;'>Transactional</div><div style='width: 100%;'><div style='width: 50%'><input type='checkbox' id='chktranEmail'	name='chktranEmail' />Email	</div><div style='width: 50%'><input name='chkTranSms' id='chkTranSms' type='checkbox'	value='' />SMS</div></div></div><div style='width: 33%;'><div style='width: 100%; padding-bottom: 5px;'>Informational</div>	<div style='width: 100%;'><div style='width: 50%'><input type='checkbox' id='chkInforEmail'	name='chkInforEmail' />Email</div><div style='width: 50%'><input name='chkInforSms' id='chkInforSms' type='checkbox' value='' />SMS</div></div></div><div style='width: 33%;'><div style='width: 100%; padding-bottom: 5px;'>Promotional</div><div style='width: 100%;'><div style='width: 50%'><input type='checkbox' id='chkPrmEmail'	name='chkPrmEmail' />Email</div><div style='width: 50%'><input name='chkPrmSms' type='checkbox' value='' id='chkPrmSms' />SMS</div></div></div></div></div></div><div	style='width: 100%; float: right; height: 50px; padding-top: 20px; padding-bottom: 50px;'>Patient Documents<div style='width: 100%; padding-top: 5px;margin-left:5px;' id='divPatFilesDisp'></div></div></div>";

var patientInvestTemp = "{#foreach $T.pl as pl} <div style='width: 99.80%;  overflow: auto; '><div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 31.50%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.pi}</div><div style='width: 12.50%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'></div><div style='width: 14%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'></div><div style='width: 13%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input onclick='viewInvest({$T.pl.pi})' style='font-size: 10px;'	type='button' value='VIEW INVESTIGATIONS' class='edit' /></div></div></div>{#/for}";

var ipdOldDBtemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 7%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 26%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 13.3%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.trid}</div><div style='width: 16%; height: 25px; border-right: 1px solid #069; padding-top: 3px; text-align: center;'>{$T.pl.otrBed.chr}</div><div style='width: 18%; height: 25px;  padding-top: 3px; text-align: center;'><input onclick=viewBedWard({$T.pl.pi},{$T.pl.trid},'N','onload','P')  style='font-size: 10px;' type='button' value='BED No.' class='edit' /></div> </div>  {#/for}";

var ipdBedWardTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-condensed table-stripped cf' style='margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='center' style='width: 1%;'><label class='TextFont'>#</label></th>"
		+ "<th class='' style='width: 3%;'><label class='TextFont'>Patient Name</label></th>"
		+ "<th class='' style='width: 1%;'><label class='TextFont'>UHID</label></th>"
		+ "<th class='' style='width: 1%;'><label class='TextFont'>Admission No</label></th>"
		+ "<th class='' style='width: 3%;'><label class='TextFont'>Ward Type</label></th>"
		+ "<th class='' style='width: 2%;'><label class='TextFont'>Ward Name</label></th>"
		+ "<th class='center' style='width: 1%; padding-right: 0px;'><label class='TextFont' style='float: right; padding-right: 0px;'>Bed No.</label></th>"
		+ "<th class='center' style='width: 1%; padding-right: 0px;'><label class='TextFont'>&nbsp;&nbsp;&nbsp;View</label></th>"
		+ "<th class='center' style='width: 1%; padding-right: 0px;'><label class='TextFont'>Print</label></th>"
		/*
		 * + " <th class='col-md-1-1' style='height: 21.5px;'><label
		 * class='TextFont'>Add History</label></th>"
		 */
		+ "		<th class='center' style='width: 1%; padding-right: 0px;'><label class='TextFont'>Relative Bed</label></th>"
		+ "	</tr>"
		+ "	</thead>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; overflow-y: scroll; height: 440px; max-height: auto;'>"
		+ "	<table class='table table-striped table-condensed cf'>"
		+ "<tbody class='cf'>"
		+ "{#foreach $T.pl as pl}"
		+ "	<tr>"
		+ "	<td class='center' style='width: 1%;'>{count++}.</td>"
		+ "	<td class='' style='width: 3%;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "	<td class='center' style='width: 1%;'>{$T.pl.pi}</td>"
		+ "	<td class='center' style='width: 2%;'>{$T.pl.objTreat.trCount}</td>"
		+ "	<td class='' style='width: 3%;'>{$T.pl.objHall.htnm}</td>"
		+ "	<td class='' style='width: 3%;'>{$T.pl.objHall.hn}</td>"
		+ "	<td class='' style='width: 1%;'>{$T.pl.oBed.bdnm}</td>"
		+ "	<td class='center' style='width: 1%;'>"
		+ "	<button onclick=viewBedWard({$T.pl.pi},{$T.pl.trid},'Y',{$T.pl.objHall.ht},'P','IPD') class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
		/*
		 * + " <input
		 * onclick=viewBedWard({$T.pl.pi},{$T.pl.trid},'Y',{$T.pl.objHall.ht},'P','IPD')
		 * type='button' value='VIEW' class='btn btn-xs btn-success' />"
		 */
		+ "	</td>"
		+ "	<td class='center' style='width: 1%;'>"
		+ "	<button onclick='printIPDFormJsp({$T.pl.pi});printIPDForm({$T.pl.pi});' class='btn btn-xs btn-success'><i class='fa fa-print'></i></button>"
		/*
		 * + " <input type='button' value='PRINT' class='btn btn-xs btn-success'
		 * onclick=printIPDForm({$T.pl.pi}) />"
		 */
		+ "	</td>"
		/*
		 * + " <td class='col-sm-1-1' style='height: 21.5px;'>" + " <input
		 * type='button' value='VIEW' class='btn btn-xs btn-success'
		 * onclick=viewAddHistory({$T.pl.pi}) />" + " </td>"
		 */
		+ "	<td class='center' style='width: 1%;'>"
		+ " <button onclick=viewBedWard({$T.pl.pi},{$T.pl.trid},'Y',{$T.pl.objHall.ht},'R','IPD') class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
		/*
		 * + " <input type='button' value='VIEW' class='btn btn-xs btn-success'
		 * onclick=viewBedWard({$T.pl.pi},{$T.pl.trid},'Y',{$T.pl.objHall.ht},'R','IPD')
		 * />"
		 */
		+ "	</td>" + "	</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

var ipdDICtemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 31.20%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.pi}</div><div style='width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.objTreat.trCount}</div><div style='width: 14%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.otrBed.trBed}</div><div style='width: 13%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input onclick=viewDIC({$T.pl.pi}) style='font-size: 10px;' type='button' value='VIEW DETAILS' class='edit' /></div></div>{#/for}";
var ipdDICCharttemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 31.20%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.pi}</div><div style='width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.trid}</div><div style='width: 14%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.otrBed.trBed}</div><div style='width: 13%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input onclick=viewDIC({$T.pl.pi}) style='font-size: 10px;' type='button' value='VIEW DETAILS' class='edit' /></div></div>{#/for}";

var ipdDRRtemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 31.50%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.pi}</div><div style='width: 12.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.objTreat.trCount}</div><div style='width: 14%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.otrBed.trBed}</div><div style='width: 13%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input onclick=viewDRR({$T.pl.pi}) style='font-size: 10px;' type='button' value='VIEW DETAILS' class='edit' /></div></div>{#/for}";

var ipdAdv = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 31.50%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.pi}</div><div style='width: 12.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.objTreat.trCount}</div><div style='width: 14%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.otrBed.trBed}</div><div style='width: 13%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input onclick=viewBillForIPD({$T.pl.pi},'IpdBillReceipt') style='font-size: 10px;' type='button' value='VIEW DETAILS' class='edit' /></div></div>{#/for}";
var ipdVDRtemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 31.50%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.pi}</div><div style='width: 12.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.objTreat.trCount}</div><div style='width: 14%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'></div><div style='width: 13%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input onclick='viewVDR({$T.pl.pi},{$T.pl.trid})' style='font-size: 10px;' type='button' value='VIEW DETAILS' class='edit' /></div></div> {#/for}";
var ipdNTRtemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 31.50%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.pi}</div><div style='width: 12.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.objTreat.trCount}</div><div style='width: 14%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'></div><div style='width: 13%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input onclick='viewNTR({$T.pl.pi},{$T.pl.trid})' style='font-size: 10px;' type='button' value='VIEW DETAILS' class='edit' /></div></div> {#/for}";
var ipdMattemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 36%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 16%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 16.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.objTreat.trCount}</div><div style='width: 13%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input onclick='viewMaterial({$T.pl.pi})' style='font-size: 10px;' type='button' value='VIEW DETAILS' class='edit' /></div></div>{#/for}";

var ipdDistemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 36%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 16%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 16.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.objTreat.trCount}</div><div style='width: 13%; height: 25px; padding-left: 4%; padding-top: 3px; text-align: center;'><input onclick='viewDischarge({$T.pl.pi},{$T.pl.trid})' style='font-size: 10px;' type='button' value='VIEW TREATMENT' class='edit' /></div></div>{#/for}";

var ipdcaseRegtemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 36%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 16%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 16.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.rgDt}</div><div style='width: 13%; height: 25px; padding-left: 4%; padding-top: 3px; text-align: center;'><input onclick='viewCaseRegTreatment({$T.pl.pi},{$T.pl.trid})' style='font-size: 10px;' type='button' value='VIEW TREATMENT' class='edit' /></div></div>{#/for}";

var ipdRegtemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 62px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 58px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count}.</div><div style='width: 21.1%; height: 58px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 7%; height: 58px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 8.2%; height: 59px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.trid}<input type='hidden' value='{$T.pl.trid}' id='trid{count}' /></div><div style='width: 21.7%; height: 59px; padding-left: 0.4%; padding-top: 3px; text-align: center;border-right: 1px solid #069;'><textarea  name='digno{count}' id='digno{count}' cols='24' rows='2'>{$T.pl.digno}</textarea></div><div style='width: 21.6%; height: 59px; padding-left: 0.4%; padding-top: 3px; text-align: center;border-right: 1px solid #069;'><textarea  name='remrk{count}' id='remrk{count++}' cols='24' rows='2'>{$T.pl.remark}</textarea></div><div style='width: 10.2%; height: 59px;  padding-left: 1%; padding-top: 3px; text-align: center;'><input type='button' style='font-size: 10px;' class='edit' onclick='setSummary({$T.pl.pi})' value='GET SUMMARY'></div></div>{#/for}<input type='hidden' value='{--count}' id='rowCount' />";

var orderFormtemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 36%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 16%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 16.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.trid}</div><div style='width: 13%; height: 25px; padding-left: 4%; padding-top: 3px; text-align: center;'><input onclick='viewOrders({$T.pl.pi},{$T.pl.trid})' style='font-size: 10px;' type='button' value='VIEW ORDER' class='edit' /></div></div>{#/for}";

var ipdDischargtemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 36%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 11.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 11.1%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.trid}</div>{#if $T.pl.objTreat.treEnd!=null}<div style='width: 13.1%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.objTreat.treEnd}</div>{#/if}{#if $T.pl.objTreat.treEnd==null}<div style='width: 13.1%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>Current</div>{#/if}<div style='width: 13%; height: 25px; padding-left: 3%; padding-top: 3px; text-align: center;'><input onclick='viewDischarge({$T.pl.pi},{$T.pl.trid},{$T.pl.objTreat.trCount})' style='font-size: 10px;' type='button' value='VIEW DETAILS' class='edit' /></div></div>{#/for}";
var caseRegtemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 36%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 11.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 11.1%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.objTreat.trCount}</div>{#if $T.pl.objTreat.treEnd!=null}<div style='width: 13.1%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.objTreat.treEnd}</div>{#/if}{#if $T.pl.objTreat.treEnd==null}<div style='width: 13.1%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>Current</div>{#/if}<div style='width: 13%; height: 25px; padding-left: 3%; padding-top: 3px; text-align: center;'><input onclick='viewCaseReg({$T.pl.pi},{$T.pl.trid})' style='font-size: 10px;' type='button' value='VIEW DETAILS' class='edit' /></div></div>{#/for}";

var patientDocDeskTemp = "{#foreach $T.pl as pl}<tr>	<td class='col-md-1-1 center'>{count++}.</td>	<td class='col-md-3-1 center'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn}		{$T.pl.ln}</td>	<td class='col-md-1-1 center'>{$T.pl.pi}</td>	<td class='col-md-1-1 center'>{$T.pl.ag} {$T.pl.agtp}</td>	<td class='col-md-1-1 center'>{$T.pl.wt} Kg</td>	<td class='col-md-3-1 center'><input		onclick='viewDoctorDesk({$T.pl.pi})' style='font-size: 10px;'		type='button' value='TREATMENT' class='edit' /></td></tr>{#/for}";

// +++++++++++++++++++++Template for RMO //
// Dashboard++++++++++++++++++++++++++++++++++//
var rmoDashboard = "{#foreach $T.pl as pl}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 35%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.ag} {$T.pl.agtp}</div><div style='width: 14%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'> {$T.pl.wt} kg.</div><div style='width: 10%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input  style='font-size: 10px;' type='button' onclick='viewPatientDetailsForRmoDashboard({$T.pl.pi})' value='TREATMENT' class='edit' /></div></div>{#/for}";

var rmoDashboardSearch = "{#foreach $T.pl as pl}<tr>	<td class='col-md-1-1 center'>{count++}.</td>	<td class='col-md-3-1 center'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn}		{$T.pl.ln}</td>	<td class='col-md-1-1 center'>{$T.pl.pi}</td>	<td class='col-md-1-1 center'>{$T.pl.ag} {$T.pl.agtp}</td>	<td class='col-md-1-1 center'>{$T.pl.wt} kg.</td>	<td class='col-md-1-1 center'>		<button type='button' onclick='viewPatientDetailsForRmoDashboardSearch({$T.pl.pi})' class='btn btn-xs btn-success' value='VIEW DETAILS'			 style='height: 21.5px;'		>	<i class='fa fa-edit'></i></button>	</td>	</tr>	{#/for}";

// +++++++++++++++Template for OPDDoctorDesk1+++++++++++++++++++++++//

var docDeskPatient = "<div style='width: 20%;'><img src='{$T.img}' width='50' height='50' /></div><div style='width: 80%;'><div style='width: 100%;'><div style='width: 40%;'><div style='width: 100%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Reg No.</div><div style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.pi}</div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>FirstName</div><div style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.fn}</div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Last Name</div><div style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.ln}</div></div></div><div style='width: 40%;'><div style='width: 100%;'><div style='width: 23%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>D.O.B</div><div style='width: 63%; padding-right: 7%;'><div style='width: 23%; color: #002c67;'>{$T.db}</div><div style='width: 23%; color: #002c67;'></div><div style='width: 34%; color: #002c67;'></div></div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 23%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Gender</div><div style='width: 7%; padding-right: 7%; color: #002c67;'>{$T.sx}</div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 23%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Age</div><div style='width: 63%; padding-right: 7%; color: #002c67;'>{$T.ag}{$T.agtp}</div></div><div style='width: 15%; padding-left: 7%; padding-top: 2%; font-weight: bold;'>OPD Status:</div><div style='width: 23%; padding-right: 5%;padding-left: 8%;padding-top: 2%; color: #002c67;'>{$T.objTreat.opd}</div></div></div></div>";

var IPCPat_temp = "{#foreach $T.pl as pl}{#if $T.pl.ods != '' }"
		+ "<table class='table table-bordered cf ' style='Width: 100%; margin-top: 0px;'>"
		+ "<tbody>		"
		+ "<tr id='div{++count}'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>{count}.</td>"
		+ "<td style='height: 21.5px;' class='col-md-4'>{$T.pl.tit} {$T.pl.fn} {$T.pl.ln}</td>"
		//+ "<td style='height: 21.5px;' class='col-md-1 center'>{$T.pl.pi}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>{$T.pl.centerPatientId}</td>"

		
		+ "<td style='height: 21.5px;' class='col-md-2 center'>{$T.pl.rgDt}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center' onclick='hideShowPreOPDBill({count})'>"
		+ "<img src='images/down.png' id='imgupdown{count}' />"
		+ "<input type='hidden' id='hideShowStatus{count}' value='0' /></td>"
		+ "</tr>"
		+ "</tbody></table>"
		+ "<table id='patPreOPDBill{count}' class='table table-bordered table-striped header-fixed' style='Width: 40%; margin-top: -20px; float: right; display:none;' class='col-md-1 center'>"
		+ "<tbody>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'>Treatment ID</th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'>Treatment Date</th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'>Discharge Date</th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'>Consent Form</th></tr>"
		+ "</tr>"
		+ "{#foreach $T.pl.lit as lit}"
		+ "<tr id='div{count}'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center' class=''>{$T.lit.ti}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center' class=''>{$T.lit.treStart}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center' class=''>{$T.lit.treEnd}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>"
		+ "<button value='VIEW' style='height: 21.5px;' onClick='goToPrevConsentForm({$T.lit.ti},{$T.pl.pi})'>"
		+ "<i class='fa fa-eye View' class='edit'></i></button></td></tr>{#/for}</tbody></table>"
		+ "<input type='hidden' value='{count}' id='rowCount' />{#/if}{#/for}";

var opdDischargeProcess = "<div style='width: 99%; background-color: #436a9d; padding: 0.5%; font-weight: bold;'><div style='width: 100%;'><div		style='width: 3%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div>									<div										style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%;'>Patient										Name</div>									<div										style='width: 6%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>Patient										ID</div>									<div										style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>Admission No</div>									<div										style='width: 11%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>Ward										Type</div>									<div										style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>Ward										Name</div>									<div										style='width: 4%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Bed No.</div><div style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.5%; text-align: center;'>View Details</div>								</div>							</div><div  style='width: 99.80%; height: 90%; overflow-y: auto; border: 1px solid #436a9d;' >{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 3.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 18.5%; height: 26px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 2px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 6.8%; height: 23px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 8.5%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px; text-align: center;'>{$T.pl.objTreat.trCount}</div><div style='width: 11.5%; height: 25px; padding-left: 1%; padding-top: 3px;border-right: 0.5px solid #069;'>{$T.pl.objHall.htnm}</div><div style='width: 20.8%; height: 25px; padding-left: 0.5%; padding-top: 3px;border-right: 1px solid #069;'>{$T.pl.objHall.hn}</div><div style='width: 5.5%; height: 25px; padding-left: 0.5%; padding-top: 3px;border-right: 1px solid #069;'>{$T.pl.oBed.bdnm}</div><div style='width: 19.8%; height: 25px; padding-left: 0.5%; padding-top: 3px; text-align: center;border-right: 1px solid #069;'><input onclick=viewDischargeProcess({$T.pl.pi},{$T.pl.trid},'Y',{$T.pl.objHall.ht}) style='font-size: 10px;' type='button' value='VIEW' class='edit' /></div>{#/for}</div>";

var patientDocTreatment = "{#foreach $T.dtl as dtl}<div style='width: 50%;' align='left'>	<div style='width: 100%; font-weight: bold;'>Presenting Symptoms</div>	<div style='width: 100%; border-width: 2px;'>		<div class='gridOut'	style='width: 98%; height: 120px; overflow-y: scroll; color: #002c67;'>{$T.dtl.ps}</div>	</div></div><div style='width: 50%;'>	<div style='width: 100%; font-weight: bold;'>Clinical Findings</div><div style='width: 100%;'>		<div class='gridOut'	style='width: 98%; height: 120px; overflow-y: scroll; color: #002c67;'>  {$T.dtl.cf}</div></div></div>	<div style='width: 33.3%; padding-top: 2%;'>		<div style='width: 100%;'>			<div style='width: 100%; font-weight: bold;'>Special				Investigations</div>			<div style='width: 100%; border: thin;'>				<div class='gridOut'					style='width: 98%; height: 90px; overflow-y: scroll; color: #002c67;'> {$T.dtl.si}</div>			</div>		</div>	</div>	 	<input type='hidden' id='id'		value='{$T.dtl.id}' />{#/for}";
/** ****************** Start opd report ************* */

var opd = '{#foreach $T.pl as pl}<div style="width: 100%; height: 28px; border-bottom: 1px solid #069;"><div style="width: 4%; height: 23px; text-align: left; border-right: 1px solid #069; padding-top: 5px;">{count++}.</div><div style="width: 10%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.pl.pi}</div>	<div style="width: 21.3%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: left;">{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style="width: 17%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: left;">{$T.pl.objTreat.rb}</div><div style="width: 7%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: left;">{$T.pl.ag} {$T.pl.agtp}</div><div style="width: 7%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: left;">{$T.pl.sx}</div><div style="width: 7%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: left;">{$T.pl.wt} kg</div><div style="width: 15%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align:left;">{$T.pl.objTreat.opd}</div></div>{#/for}';

function viewAddHistory(pid) {
	var ajaxResponse = $("#patobject").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == pid) {
			myObj = myArray.pl[i];
			break;
		}
	}
	var admissionNote = myObj.sym;
	myObj = JSON.stringify(myObj);

	window.location = "IPDAddHistory.jsp?" + "myObj="
			+ encodeURIComponent(myObj) + "&admisionNote=" + admissionNote;

}

function searchrispat() {
	var patId = $("#patid").val();
	var patName = $("#patname").val();
	var count = 0;
	// var date1 = $("#date1").val();
	// var date2 = $("#date2").val();

	/*
	 * if (patId == "") { alert("Enter Patient ID"); SetFocus("patid"); return
	 * false; }
	 */
	if (patId != "" && patName == "") {
		var result = $("#risdata").html();
		var myArray = JSON.parse(result);
		var myObj;
		for ( var i = 0; i < myArray.testDashboard.length; i++) {
			if (myArray.testDashboard[i].objTreat.pi == patId) {
				myObj = myArray.testDashboard[i];
				count++;
				break;
			}
		}
		if (count == 0) {
			alert("record not found");
		} else {
			var myOb = JSON.stringify(myObj);
			var obj = eval('(' + myOb + ')');

			$("#studTabD").setTemplate(RisTeSearch);
			$("#studTabD").processTemplate(obj);
		}
	} else if (patName != "") {
		var result = $("#risdata").html();
		var myArray = JSON.parse(result);
		var myObj;

		for ( var i = 0; i < myArray.testDashboard.length; i++) {
			if (myArray.testDashboard[i].fn == patName) {
				myObj = myArray.testDashboard[i];
				count++;
				break;
			}
		}
		if (count == 0) {
			alert("record not found");
		} else {
			var myOb = JSON.stringify(myObj);
			var obj = eval('(' + myOb + ')');

			$("#studTabD").setTemplate(RisTeSearch);
			$("#studTabD").processTemplate(obj);
		}
	} else {
		alert("Record not found");
		return false;
	}
}

/*function FetchDataOfTodayOnly(todays_date) {

	var result = $("#risdata").html();
	myArray = JSON.parse(result);
	var myObj;
	for ( var i = 0; i < myArray.testDashboard.length; i++) {

		var regDate = myArray.testDashboard[i].rgDt;

		if (regDate != "undefined") {
			var arr = regDate.split(" ");
			var date = arr[0];
			
			 * var time = arr[1]; var newdate = date[0]+"-"+date[1]+"-"+date[2];
			 
			if (todays_date == date) {
				myObj = myArray.testDashboard[i];
				alert("break:");
				break;
			}
		}
	}
	var myOb = JSON.stringify(myObj);
	var obj = eval('(' + myOb + ')');

	$("#studTabD").setTemplate(RisTeSearch);
	$("#studTabD").processTemplate(obj);
}*/
function FetchDataOfTodayOnly(todays_date) {
	
	var flag=$("#currPage").html();
	var id="";
	var status="";
	if(flag==0){
		id="1";
		status="N";
	}
	if(flag==1){
		id="";
		status="Y";
	}
	
	$("#studTabD"+id).empty();
	var result = $("#risdata").html();
	myArray = JSON.parse(result);

	var j=1;
	for ( var i = 0; i < myArray.testDashboard.length; i++) {

		var regDate = myArray.testDashboard[i].rgDt;
	
		if (typeof regDate != "undefined") {
			var arr = regDate.split(" ");
			var date = arr[0].replace("/","-").replace("/","-");
			var dat1=date.split("-");
			var finaldate=dat1[2]+"-"+dat1[1]+"-"+dat1[0] ;
			
			/*
			 * var time = arr[1]; var newdate = date[0]+"-"+date[1]+"-"+date[2];
			 */
			if (todays_date == finaldate && myArray.testDashboard[i].objTreat.tf==status+"") {
				
				if(j==1)
				$("#studTabD"+id).append("<div class='col-sm-12-1 scroller' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
		+ "<tbody id='todayPatient'>"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+ j++ +"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].objTreat.pi+"</td>"
		+ "<td class='col-sm-4-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].tit+" "+myArray.testDashboard[i].fn+" "+myArray.testDashboard[i].mn+" "+myArray.testDashboard[i].ln+"</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].sx+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].ag+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].objTreat.rt+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].objradiology.itStatus+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',"+myArray.testDashboard[i].objTreat.pi+","+myArray.testDashboard[i].objTreat.ti+")><i class='fa fa-check'></i></button>"
		+ "</td></tr></tbody></table></div>");
				
				else
					$("#todayPatient").append("<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+ j++ +"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].objTreat.pi+"</td>"
		+ "<td class='col-sm-4-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].tit+" "+myArray.testDashboard[i].fn+" "+myArray.testDashboard[i].mn+" "+myArray.testDashboard[i].ln+"</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].sx+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].ag+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].objTreat.rt+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].objradiology.itStatus+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',"+myArray.testDashboard[i].objTreat.pi+","+myArray.testDashboard[i].objTreat.ti+")><i class='fa fa-check'></i></button>"
		+ "</td></tr>");
			}
		}
	}
	
}

function updateFlag(type, PID, TID) {
	var ApprAmt = $("#txtTPAChr").val();
	var TtlAmnt = $("#docRCART").val();

	if (ApprAmt > TtlAmnt) {
		alert("Approved amount should be less than total amount");
		$("#txtTPAChr").focus();
		return false;
	}

	if (type != "" && PID == "" && TID == "") {
		var type = type;
		var PID = $("#popPIDounpro").html();
		var TID = $("#popTIDounpro").html();

	} else {
		$("#popPIDounpro").html(PID);
		$("#popTIDounpro").html(TID);
	}
	if (type == "unpro") {
		var type = type;
		var PatId = PID;
		var TreatId = TID;

	} else if (type == "draft") {
		var type = type;
		var PatId = $("#mpatid").html();
		var TreatId = $("#mtreatid").html();

	} else if (type == "drft") {
		var type = "unpro";
		var PatId = PID;
		var TreatId = TID;
		$("#applyPopUp").hide(true);
		location.href = "";

	} else if (type == "enhance") {
		var type = type;
		var PatId = PID;
		var TreatId = TID;

	} else if (type == "needinfo") {

		var type = type;
		var PatId = PID;
		var TreatId = TID;

	} else if (type == "approve") {

		var type = type;
		var PatId = PID;
		var TreatId = TID;

	} else if (type == "reject") {

		var type = type;
		var PatId = PID;
		var TreatId = TID;
	}

	var inputs = [];
	inputs.push('action=updatemanageflag');
	inputs.push('type=' + type);
	inputs.push('Pid=' + PatId);
	inputs.push('Tid=' + TreatId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			if (PID == "NewPree" || type == "unpro") {
				alert("Apply Successfully...");
			}
		}
	});

}

function setPatInfo() {
	var myObj = $("#divMyobj").html();
	userBean = JSON.parse(myObj);

	$("#initial").val(userBean.tit);
	$("#pName").val(userBean.fn + " " + userBean.mn + " " + userBean.ln);
	$("#age").val(userBean.ag);
	$("#sex").val(userBean.sx);
	$("#ipdOPdNo").val(userBean.objTreat.trCount);
	$("#contact").val(userBean.mb);

	$("#address").val(
			userBean.a1 + " " + userBean.a6 + " " + userBean.a2 + " "
					+ userBean.a3 + " " + userBean.a4 + " " + userBean.a5);

	$("#dob").val(userBean.db);
	$("#docName").val(userBean.objTreat.bedridden);
	$("#tretID").val(userBean.objTreat.ti);
}

function calculateEnh(type) {
	var ajaxResponse = $("#enhData").html();

	if (type == "enhance") {
		var appAmt = $("#EAA").val();
		myArray = JSON.parse(ajaxResponse);
		var claimAmt = myArray.pl[0].cliamAmt;
		var enhReq = claimAmt - appAmt;
		if (enhReq < 0) {
			alert("Approved Amount is Greater Than Claim Amount !");
			SetFocus("EAA");
			return false;
		} else {

			$("#EREQ").val(enhReq);
		}
	} else if (type == "approve") {
		var recAmt = $("#ARC").val();
		myArray = JSON.parse(ajaxResponse);
		var apprAmt = $("#AAA").val();
		var apprfinal = +recAmt + +apprAmt;
		var claimAmt = myArray.pl[0].cliamAmt;
		if (apprfinal > claimAmt) {
			alert("Approved Amount is Greater Than Claim Amount !");
			return false;

		} else {
			$("#AAA").val("");
			$("#AAA").val(apprfinal);
		}
	} else if (type == "reject") {
		var recAmt = $("#RRC").val();
		myArray = JSON.parse(ajaxResponse);
		var apprAmt = $("#RAA").val();
		var apprfinal = +recAmt + +apprAmt;
		var claimAmt = myArray.pl[0].cliamAmt;
		if (apprfinal > claimAmt) {
			alert("Approved Amount is Greater Than Claim Amount !");
			return false;

		} else {
			$("#RAA").val("");
			$("#RAA").val(apprfinal);
		}
	}
}

function printIPDForm(patientId) {
	var xxx = $("#hospDetails").html();
	hospDetails = eval('(' + xxx + ')');
	var hosp = hospDetails.listHosDetail[0];

	var ajaxResponse = $("#patobject").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == patientId) {
			myObj = myArray.pl[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	pinfo = JSON.parse(myObj);
	var opdate = pinfo.rgDt;
	if (opdate != "") {
		opDate1 = opdate.split("-");
		opDatey = opDate1[0];
		opDatem = opDate1[1];
		opDated = opDate1[2];
		var DateOperation = opDated + "-" + opDatem + "-" + opDatey;
	} else {
		DateOperation = "";
	}

	var WindowObject = window.open('', ' ', '');
	WindowObject.document
			.writeln('<html><body style="margin-left:4%;margin-right:4%;">');

	WindowObject.document.writeln('<div style="width:98%;margin-top:130PX;" >');

	WindowObject.document
			.writeln('_______________________________________________________________________________________');

	WindowObject.document
			.writeln('<div style="width:100%;float:left;text-align: center;margin-top:10PX;" ><b>INDOOR PATIENTS CASE SHEET</b></div>');

	WindowObject.document
			.writeln('_______________________________________________________________________________________');

	WindowObject.document
			.writeln("<div style='width: 100%;font-size: 14px;margin-top:2%;border: 1px solid #000000;padding : 2px;'><div style='width: 100%; margin-top: 3%;'><div style='width: 20%;  font-weight: bold;float: left;'>UHID</div><div style='width: 40%; float: left;'> : "
					+ pinfo.pi
					+ "</div><div style='width: 20%;  font-weight: bold;float: left;'>Indoor Reg. No.</div><div style='width: 20%; float: left;'> : "
					+ pinfo.objTreat.trCount + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%;  font-weight: bold;;float: left;'>Patient Name</div><div style='width: 40%; float: left;'> : "
					+ pinfo.tit
					+ "."
					+ pinfo.fn
					+ "&nbsp"
					+ pinfo.ln
					+ "</div><div style='width: 20%;  font-weight: bold;float: left;'>Age / Gender</div><div style='width: 20%; float: left;'> : "
					+ pinfo.ag
					+ "&nbsp;"
					+ pinfo.agtp
					+ " / "
					+ pinfo.sx
					+ "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%;  font-weight: bold;float: left;'>Address</div><div style='width: 75%; float: left;'> : "
					+ pinfo.a1
					+ "&nbsp"
					+ pinfo.a6
					+ "&nbsp"
					+ pinfo.a2
					+ "&nbsp" + pinfo.a3 + "</div></div><br>");

	var mlc = "";

	if (pinfo.liMLC.length > 0) {

		mlc = pinfo.liMLC[0].mlcid;

	}

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%;  font-weight: bold;float: left;'>Mobile No.</div><div style='width: 40%; float: left;'> : "
					+ pinfo.mb
					+ "</div><div style='width: 20%;  font-weight: bold;float: left;'>MLC No.</div><div style='width: 20%; float: left;'> : "
					+ mlc + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%; font-weight: bold;float: left;'>Date of Admission</div><div style='width: 40%;  float: left;'> : "
					+ pinfo.objTreat.treStart
					+ "</div><div style='width: 20%; font-weight: bold;float: left;'>Time of Admission</div><div style='width: 20%;  float: left;'> : "
					+ pinfo.objTreat.int + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%;  font-weight: bold;float: left;'>Date of Operation</div><div style='width: 75%; float: left;'> : &nbsp;"
					+ DateOperation + "</div></div><br>");
	var dischargeDate = "";
	var distime = "";
	if (pinfo.objTreat.treEnd == undefined || pinfo.objTreat.treEnd == "") {
		dischargeDate = "";
		disTime = "";
	} else {
		dischargeDate = pinfo.objTreat.treEnd;

		disTime = pinfo.objTreat.out;
	}
	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%; font-weight: bold;float: left;'>Date of Discharge</div><div style='width: 40%;  float: left;'> :&nbsp;"
					+ dischargeDate
					+ "</div><div style='width: 20%; font-weight: bold;float: left;'>Time of Discharge</div><div style='width: 20%;  float: left;'> : "
					+ disTime + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%; font-weight: bold;float: left;'>Type of Discharge</div><div style='width: 75%;  float: left;'> : &nbsp;&nbsp; Discharge   &nbsp;&nbsp; Transferred &nbsp;&nbsp;   DAMA &nbsp;&nbsp;   Absconded &nbsp;&nbsp;   Dead</div></div><br>");

	var refby = "";

	if (pinfo.rb == undefined || pinfo.rb == "") {

		refby == "";

	} else {
		refby = pinfo.rb;
	}

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%; font-weight: bold;float: left;'>Ref. Doctor</div><div style='width: 40%;  float: left;'> : "
					+ refby
					+ "</div><div style='width: 20%;  font-weight: bold;float: left;'>Undercare Doctor</div><div style='width: 20%; float: left;'> : "
					+ pinfo.objTreat.bedridden + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%;  font-weight: bold;float: left;'>Ward</div><div style='width: 20%; float: left;'> : "
					+ pinfo.objHall.htnm
					+ "</div><div style='width: 10%;  font-weight: bold;float: left;'>Room</div><div style='width: 20%; float: left;'> : "
					+ pinfo.objHall.hn
					+ "</div><div style='width: 15%;  font-weight: bold;float: left;'>Bed</div><div style='width: 15%; float: left;'> : "
					+ pinfo.oBed.bdnm + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%; font-weight: bold;float: left;'>Final Diagnosis</div><div style='width: 75%;  float: left;'> : ___________________________________________________________________</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%; margin-bottom: 6%;'><div style='width: 20%; font-weight: bold;float: left;'>Operation Done</div><div style='width: 75%;  float: left;'> : ___________________________________________________________________</div></div><br></div>");

	WindowObject.document
			.writeln('_______________________________________________________________________________________');

	WindowObject.document
			.writeln('<div style="width:100%;text-align: center;margin-top:10PX;" ><b>FOR OFFICE USE ONLY</b></div>');

	var tppay = "";

	if (pinfo.objTreat.tppay == "undefined" || pinfo.objTreat.tppay == "") {

		tppay = "";

	} else {
		tppay = pinfo.objTreat.tppay;
	}

	var cmpny = "";

	if (pinfo.objTreat.cmpny == undefined || pinfo.objTreat.cmpny == "") {

		cmpny == "";

	} else {
		cmpny = pinfo.objTreat.cmpny;
	}

	var insuCmpny = "";

	if (pinfo.objTreat.insuCmpny == undefined || pinfo.objTreat.insuCmpny == "") {

		insuCmpny == "";

	} else {
		insuCmpny = pinfo.objTreat.insuCmpny;
	}

	var paynm = "";

	if (pinfo.objTreat.paynm == undefined || pinfo.objTreat.paynm == "") {

		paynm == "";

	}

	else {
		paynm = pinfo.objTreat.paynm;
	}

	var relage = "";

	if (pinfo.objTreat.relage == undefined || pinfo.objTreat.relage == "") {

		relage == "";

	} else {
		relage = pinfo.objTreat.relage;
	}

	var relsex = "";

	if (pinfo.objTreat.relsex == undefined || pinfo.objTreat.relsex == "") {

		relsex == "";

	} else {
		relsex = pinfo.objTreat.relsex;
	}

	var relrelation = "";

	if (pinfo.objTreat.relrelation == undefined
			|| pinfo.objTreat.relrelation == "") {

		relrelation == "";

	} else {
		relrelation = pinfo.objTreat.relrelation;
	}

	var memoNo = "";

	if (pinfo.objTreat.memoNo == undefined || pinfo.objTreat.memoNo == "") {

		memoNo == "";

	} else {
		memoNo = pinfo.objTreat.memoNo;
	}

	var relAdd = "";

	if (pinfo.objTreat.relAdd == undefined || pinfo.objTreat.relAdd == "") {

		relAdd == "";

	} else {
		relAdd = pinfo.objTreat.relAdd;
	}

	var rmenoDt = "";

	if (pinfo.objTreat.rmenoDt == undefined || pinfo.objTreat.rmenoDt == "") {

		rmenoDt == "";

	} else {
		rmenoDt = pinfo.objTreat.rmenoDt;
	}

	var relmob = "";

	if (pinfo.objTreat.relmob == undefined || pinfo.objTreat.relmob == "") {

		relmob == "";

	} else {
		relmob = pinfo.objTreat.relmob;
	}

	var cashPolNo = "";

	if (pinfo.objTreat.cashPolNo == undefined || pinfo.objTreat.cashPolNo == "") {

		cashPolNo == "";

	} else {
		cashPolNo = pinfo.objTreat.cashPolNo;
	}

	var cnnNo = "";

	if (pinfo.objTreat.cnnNo == undefined || pinfo.objTreat.cnnNo == "") {

		cnnNo == "";

	} else {
		cnnNo = pinfo.objTreat.cnnNo;
	}

	WindowObject.document
			.writeln("<div style='width: 100%;font-size: 14px;margin-top:4%;padding : 2px;'><div style='width: 49.8%; border: 1px solid #000000;float: left;'>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 40%;  font-weight: bold;float: left;padding-left:2%;'> Type of Payment</div><div style='width: 45%; float: left;'> : "
					+ tppay + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 90%;  font-weight: bold;float: left;padding-left:2%;'>Name Of Person Responsible For Payment</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 0%;'><div style='width: 90%; float: left;padding-left:6%;'> : "
					+ paynm + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 98%;  float: left;padding-left:2%;'><div style='width: 20%;  font-weight: bold;;float: left;'>Age / Gender </div><div style='width: 25%; float: left;'> : "
					+ relage
					+ " / "
					+ relsex
					+ "</div><div style='width: 20%;  font-weight: bold;float: left;'>Relation</div><div style='width: 30%; float: left;'> : "
					+ relrelation + "</div></div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 25%;  font-weight: bold;float: left;padding-left:2%;'>Address</div><div style='width: 70%; float: left;'> : "
					+ relAdd + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 25%;  font-weight: bold;float: left;padding-left:2%;'>Mobile No.</div><div style='width: 70%; float: left;'> : "
					+ relmob + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;margin-bottom: 8%;'><div style='width: 40%;  font-weight: bold;float: left;padding-left:2%;'>Undertaking Sign</div><div style='width: 45%; float: left;'> : _________________</div></div><br>");

	WindowObject.document.writeln("</div>");

	WindowObject.document
			.writeln("<div style='width: 49.8%;  float: left; border: 1px solid #000000;'>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 40%;  font-weight: bold;float: left;padding-left:2%;'> Company Name</div><div style='width: 45%; float: left;'> : "
					+ cmpny + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 40%;  font-weight: bold;float: left;padding-left:2%;'>Insurance Company</div><div style='width: 45%; float: left;'> : "
					+ insuCmpny + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 90%;  font-weight: bold;float: left;padding-left:2%;'>Memo/Preauthorisation Letter No.</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 0%;'><div style='width: 90%; float: left;padding-left: 6%;'> : "
					+ memoNo + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 25%;  font-weight: bold;float: left;padding-left:2%;'>Date</div><div style='width: 70%; float: left;'> : "
					+ rmenoDt + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 55%;  font-weight: bold;float: left;padding-left:2%;'>Cashless policy I.D No. No.</div><div style='width: 35%; float: left;'> : "
					+ cashPolNo + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;margin-bottom: 8%;'><div style='width: 25%;  font-weight: bold;float: left;padding-left:2%;'>C.N.N.No.</div><div style='width: 70%; float: left;'> : "
					+ cnnNo + "</div></div><br>");

	WindowObject.document.writeln("</div></div>");

	WindowObject.document.writeln("</div></div>");

	WindowObject.document.writeln('</body></html>');

	WindowObject.document.close();

	WindowObject.focus();

	WindowObject.print();
	WindowObject.close();

}

function printIPDFormPDP(patientId) {
	var xxx = $("#hospDetails").html();
	hospDetails = eval('(' + xxx + ')');
	var hosp = hospDetails.listHosDetail[0];

	var ajaxResponse = $("#patobjectPDP").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == patientId) {
			myObj = myArray.pl[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	pinfo = JSON.parse(myObj);
	var opdate = pinfo.rgDt;
	if (opdate != "") {
		opDate1 = opdate.split("-");
		opDatey = opDate1[0];
		opDatem = opDate1[1];
		opDated = opDate1[2];
		var DateOperation = opDated + "-" + opDatem + "-" + opDatey;
	} else {
		DateOperation = "";
	}

	var WindowObject = window.open('', ' ', '');
	WindowObject.document
			.writeln('<html><body style="margin-left:4%;margin-right:4%;">');

	WindowObject.document.writeln('<div style="width:98%;margin-top:130PX;" >');

	WindowObject.document
			.writeln('_______________________________________________________________________________________');

	WindowObject.document
			.writeln('<div style="width:100%;float:left;text-align: center;margin-top:10PX;" ><b>INDOOR PATIENTS CASE SHEET</b></div>');

	WindowObject.document
			.writeln('_______________________________________________________________________________________');

	WindowObject.document
			.writeln("<div style='width: 100%;font-size: 14px;margin-top:2%;border: 1px solid #000000;padding : 2px;'><div style='width: 100%; margin-top: 3%;'><div style='width: 20%;  font-weight: bold;float: left;'>UHID</div><div style='width: 40%; float: left;'> : "
					+ pinfo.pi
					+ "</div><div style='width: 20%;  font-weight: bold;float: left;'>Indoor Reg. No.</div><div style='width: 20%; float: left;'> : "
					+ pinfo.objTreat.trCount + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%;  font-weight: bold;;float: left;'>Patient Name</div><div style='width: 40%; float: left;'> : "
					+ pinfo.tit
					+ "."
					+ pinfo.fn
					+ "&nbsp"
					+ pinfo.ln
					+ "</div><div style='width: 20%;  font-weight: bold;float: left;'>Age / Gender</div><div style='width: 20%; float: left;'> : "
					+ pinfo.ag
					+ "&nbsp;"
					+ pinfo.agtp
					+ " / "
					+ pinfo.sx
					+ "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%;  font-weight: bold;float: left;'>Address</div><div style='width: 75%; float: left;'> : "
					+ pinfo.a1
					+ "&nbsp"
					+ pinfo.a6
					+ "&nbsp"
					+ pinfo.a2
					+ "&nbsp" + pinfo.a3 + "</div></div><br>");

	var mlc = "";

	if (pinfo.liMLC.length > 0) {

		mlc = pinfo.liMLC[0].mlcid;

	}

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%;  font-weight: bold;float: left;'>Mobile No.</div><div style='width: 40%; float: left;'> : "
					+ pinfo.mb
					+ "</div><div style='width: 20%;  font-weight: bold;float: left;'>MLC No.</div><div style='width: 20%; float: left;'> : "
					+ mlc + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%; font-weight: bold;float: left;'>Date of Admission</div><div style='width: 40%;  float: left;'> : "
					+ pinfo.objTreat.treStart
					+ "</div><div style='width: 20%; font-weight: bold;float: left;'>Time of Admission</div><div style='width: 20%;  float: left;'> : "
					+ pinfo.objTreat.int + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%;  font-weight: bold;float: left;'>Date of Operation</div><div style='width: 75%; float: left;'> : &nbsp;"
					+ DateOperation + "</div></div><br>");
	var dischargeDate = "";
	var distime = "";
	if (pinfo.objTreat.treEnd == undefined || pinfo.objTreat.treEnd == "") {
		dischargeDate = "";
		disTime = "";
	} else {
		dischargeDate = pinfo.objTreat.treEnd;

		disTime = pinfo.objTreat.out;
	}
	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%; font-weight: bold;float: left;'>Date of Discharge</div><div style='width: 40%;  float: left;'> :&nbsp;"
					+ dischargeDate
					+ "</div><div style='width: 20%; font-weight: bold;float: left;'>Time of Discharge</div><div style='width: 20%;  float: left;'> : "
					+ disTime + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%; font-weight: bold;float: left;'>Type of Discharge</div><div style='width: 75%;  float: left;'> : &nbsp;&nbsp; Discharge   &nbsp;&nbsp; Transferred &nbsp;&nbsp;   DAMA &nbsp;&nbsp;   Absconded &nbsp;&nbsp;   Dead</div></div><br>");

	var refby = "";

	if (pinfo.rb == undefined || pinfo.rb == "") {

		refby == "";

	} else {
		refby = pinfo.rb;
	}

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%; font-weight: bold;float: left;'>Ref. Doctor</div><div style='width: 40%;  float: left;'> : "
					+ refby
					+ "</div><div style='width: 20%;  font-weight: bold;float: left;'>Undercare Doctor</div><div style='width: 20%; float: left;'> : "
					+ pinfo.objTreat.bedridden + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%;  font-weight: bold;float: left;'>Ward</div><div style='width: 20%; float: left;'> : "
					+ pinfo.objHall.htnm
					+ "</div><div style='width: 10%;  font-weight: bold;float: left;'>Room</div><div style='width: 20%; float: left;'> : "
					+ pinfo.objHall.hn
					+ "</div><div style='width: 15%;  font-weight: bold;float: left;'>Bed</div><div style='width: 15%; float: left;'> : "
					+ pinfo.oBed.bdnm + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%;'><div style='width: 20%; font-weight: bold;float: left;'>Final Diagnosis</div><div style='width: 75%;  float: left;'> : ___________________________________________________________________</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 3%; margin-bottom: 6%;'><div style='width: 20%; font-weight: bold;float: left;'>Operation Done</div><div style='width: 75%;  float: left;'> : ___________________________________________________________________</div></div><br></div>");

	WindowObject.document
			.writeln('_______________________________________________________________________________________');

	WindowObject.document
			.writeln('<div style="width:100%;text-align: center;margin-top:10PX;" ><b>FOR OFFICE USE ONLY</b></div>');

	var tppay = "";

	if (pinfo.objTreat.tppay == "undefined" || pinfo.objTreat.tppay == "") {

		tppay = "";

	} else {
		tppay = pinfo.objTreat.tppay;
	}

	var cmpny = "";

	if (pinfo.objTreat.cmpny == undefined || pinfo.objTreat.cmpny == "") {

		cmpny == "";

	} else {
		cmpny = pinfo.objTreat.cmpny;
	}

	var insuCmpny = "";

	if (pinfo.objTreat.insuCmpny == undefined || pinfo.objTreat.insuCmpny == "") {

		insuCmpny == "";

	} else {
		insuCmpny = pinfo.objTreat.insuCmpny;
	}

	var paynm = "";

	if (pinfo.objTreat.paynm == undefined || pinfo.objTreat.paynm == "") {

		paynm == "";

	}

	else {
		paynm = pinfo.objTreat.paynm;
	}

	var relage = "";

	if (pinfo.objTreat.relage == undefined || pinfo.objTreat.relage == "") {

		relage == "";

	} else {
		relage = pinfo.objTreat.relage;
	}

	var relsex = "";

	if (pinfo.objTreat.relsex == undefined || pinfo.objTreat.relsex == "") {

		relsex == "";

	} else {
		relsex = pinfo.objTreat.relsex;
	}

	var relrelation = "";

	if (pinfo.objTreat.relrelation == undefined
			|| pinfo.objTreat.relrelation == "") {

		relrelation == "";

	} else {
		relrelation = pinfo.objTreat.relrelation;
	}

	var memoNo = "";

	if (pinfo.objTreat.memoNo == undefined || pinfo.objTreat.memoNo == "") {

		memoNo == "";

	} else {
		memoNo = pinfo.objTreat.memoNo;
	}

	var relAdd = "";

	if (pinfo.objTreat.relAdd == undefined || pinfo.objTreat.relAdd == "") {

		relAdd == "";

	} else {
		relAdd = pinfo.objTreat.relAdd;
	}

	var rmenoDt = "";

	if (pinfo.objTreat.rmenoDt == undefined || pinfo.objTreat.rmenoDt == "") {

		rmenoDt == "";

	} else {
		rmenoDt = pinfo.objTreat.rmenoDt;
	}

	var relmob = "";

	if (pinfo.objTreat.relmob == undefined || pinfo.objTreat.relmob == "") {

		relmob == "";

	} else {
		relmob = pinfo.objTreat.relmob;
	}

	var cashPolNo = "";

	if (pinfo.objTreat.cashPolNo == undefined || pinfo.objTreat.cashPolNo == "") {

		cashPolNo == "";

	} else {
		cashPolNo = pinfo.objTreat.cashPolNo;
	}

	var cnnNo = "";

	if (pinfo.objTreat.cnnNo == undefined || pinfo.objTreat.cnnNo == "") {

		cnnNo == "";

	} else {
		cnnNo = pinfo.objTreat.cnnNo;
	}

	WindowObject.document
			.writeln("<div style='width: 100%;font-size: 14px;margin-top:4%;padding : 2px;'><div style='width: 49.8%; border: 1px solid #000000;float: left;'>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 40%;  font-weight: bold;float: left;padding-left:2%;'> Type of Payment</div><div style='width: 45%; float: left;'> : "
					+ tppay + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 90%;  font-weight: bold;float: left;padding-left:2%;'>Name Of Person Responsible For Payment</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 0%;'><div style='width: 90%; float: left;padding-left:6%;'> : "
					+ paynm + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 98%;  float: left;padding-left:2%;'><div style='width: 20%;  font-weight: bold;;float: left;'>Age / Gender </div><div style='width: 25%; float: left;'> : "
					+ relage
					+ " / "
					+ relsex
					+ "</div><div style='width: 20%;  font-weight: bold;float: left;'>Relation</div><div style='width: 30%; float: left;'> : "
					+ relrelation + "</div></div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 25%;  font-weight: bold;float: left;padding-left:2%;'>Address</div><div style='width: 70%; float: left;'> : "
					+ relAdd + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 25%;  font-weight: bold;float: left;padding-left:2%;'>Mobile No.</div><div style='width: 70%; float: left;'> : "
					+ relmob + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;margin-bottom: 8%;'><div style='width: 40%;  font-weight: bold;float: left;padding-left:2%;'>Undertaking Sign</div><div style='width: 45%; float: left;'> : _________________</div></div><br>");

	WindowObject.document.writeln("</div>");

	WindowObject.document
			.writeln("<div style='width: 49.8%;  float: left; border: 1px solid #000000;'>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 40%;  font-weight: bold;float: left;padding-left:2%;'> Company Name</div><div style='width: 45%; float: left;'> : "
					+ cmpny + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 40%;  font-weight: bold;float: left;padding-left:2%;'>Insurance Company</div><div style='width: 45%; float: left;'> : "
					+ insuCmpny + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 90%;  font-weight: bold;float: left;padding-left:2%;'>Memo/Preauthorisation Letter No.</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 0%;'><div style='width: 90%; float: left;padding-left: 6%;'> : "
					+ memoNo + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 25%;  font-weight: bold;float: left;padding-left:2%;'>Date</div><div style='width: 70%; float: left;'> : "
					+ rmenoDt + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;'><div style='width: 55%;  font-weight: bold;float: left;padding-left:2%;'>Cashless policy I.D No. No.</div><div style='width: 35%; float: left;'> : "
					+ cashPolNo + "</div></div><br>");

	WindowObject.document
			.writeln("<div style='width: 100%; margin-top: 4%;margin-bottom: 8%;'><div style='width: 25%;  font-weight: bold;float: left;padding-left:2%;'>C.N.N.No.</div><div style='width: 70%; float: left;'> : "
					+ cnnNo + "</div></div><br>");

	WindowObject.document.writeln("</div></div>");

	WindowObject.document.writeln("</div></div>");

	WindowObject.document.writeln('</body></html>');

	WindowObject.document.close();

	WindowObject.focus();

	WindowObject.print();
	WindowObject.close();

}
// Touheed Date 30-Dec-2015
// code for the print using jsp

function printIPDFormJsp(pid) {

	ajaxResponse = $("#patobject").html();

	myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == pid) {
			myObj = myArray.pl[i];

			break;
		}
	}

	myObj = JSON.stringify(myObj);

	// alert("Main data"+myObj);

	/*
	 * if (bedAllocated == 'N') { window.location.href = "IPD_BedWard.jsp?" +
	 * "patientId=" + patientId + "&treatmentId=" + treatmentId + "&myObj=" +
	 * encodeURIComponent(myObj) + "&bedallocated=" + bedAllocated + "&ht=" + ht +
	 * "&pattype=" + pattype + "&pageIncludeType=" + pageIncludeType; }
	 */

	setTimeout(function() {
		window.open(("printForIpd.jsp?" + "pid=" + encodeURIComponent(pid)
				+ "&myObj=" + encodeURIComponent(myObj)));
	}, 300);

	return;
}
function printIPDFormJspPDP(pid) {
	ajaxResponse = $("#patobjectPDP").html();
	console.log(ajaxResponse);
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == pid) {
			myObj = myArray.pl[i];

			break;
		}
	}

	myObj = JSON.stringify(myObj);
	setTimeout(function() {
		window.open(("printForIpd.jsp?" + "pid=" + encodeURIComponent(pid)
				+ "&myObj=" + encodeURIComponent(myObj)));
	}, 300);

	return;
}

function setSummary(value) {
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.pl.length; i++) {

		if (myArray.pl[i].pi == value) {

			myObj1 = myArray.pl[i];
			patID = myArray.pl[i].pi;
			break;
		}
	}
	myObj = JSON.stringify(myObj1);
	window.location = "IndoorCaseSheet.jsp?" + "myObj="
			+ encodeURIComponent(myObj) + "&patID=" + value;

}
function setIPDSummary() {
	var ajaxresponse = $("#myObj").html();
	proobj = eval('(' + ajaxresponse + ')');
	$("#patID").html(proobj.pi);
	pName = proobj.fn + " " + proobj.ln;
	$("#pName").html(pName);
	add = proobj.a1 + " " + proobj.a2 + " " + proobj.a3;
	$("#addr").html(add);
	$("#contact").html(proobj.mb);
	$("#age").html(proobj.ag);
	$("#weight").html(proobj.wt);
	$("#dob").html(proobj.db);
	$("#diagnosis").html(proobj.digno);
	$("#refDoc").html(proobj.rb);
	$("#indReg").html(proobj.trid);
	$("#refTo").html(proobj.rt);
	$("#OprDate").html(proobj.opDate);
	if ((proobj.opDate) == undefined)
		$("#oprDone").html('No');
	else
		$("#oprDone").html('Done');
	if (proobj.otrBed.in_Time != undefined) {
		var inTime = new Date(proobj.otrBed.in_Time);
		strInDate = inTime.getDate() + "/" + (inTime.getMonth() + 1) + "/"
				+ inTime.getFullYear();

		strInTime = inTime.getHours() + ":" + inTime.getMinutes();
		$("#regDate").html(strInDate);
		$("#inTime").html(strInTime);
	}

	$("#disDate").html(proobj.objTreat.treEnd);
	$("#noOfvisit").html(proobj.objTreat.nv);
	$("#bedNo").html(proobj.otrBed.trBed);
	$("#hallType").html(proobj.otrBed.hallType);
	$("#hallName").html(proobj.otrBed.hallName);
	$("#regDate").html(proobj.rgDt);

}
function viewPatientDetailsForRmoDashboard(Pid) {

	var patDetail = $("#patDetail").html();

	myArray = JSON.parse(patDetail);

	for ( var i = 0; i < myArray.pl.length; i++) {

		if (myArray.pl[i].pi == Pid) {

			myObj = myArray.pl[i];
			id = myObj.opa.paid;
			pname = myObj.tit + " " + myObj.fn + " " + myObj.ln;
			break;
		};
	}

	var myObj = JSON.stringify(myObj);

	window.location.href = 'OPD_RMO.jsp?pid=' + Pid + '&pname=' + pname
			+ '&patobj=' + myObj.decodeSpecialChars() + '&id=' + id;

	/*
	 * $("#txtPrjId").val(proobj.id);
	 */
}
function viewPatientDetailsForRmoDashboard(Pid) {
	// alert(app_date);
	var patDetail = $("#patDetail").html();

	myArray = JSON.parse(patDetail);

	for ( var i = 0; i < myArray.pl.length; i++) {

		if (myArray.pl[i].pi == Pid) {

			myObj = myArray.pl[i];
			id = myObj.opa.paid;
			pname = myObj.tit + " " + myObj.fn + " " + myObj.ln;
			break;
		}
		;
	}

	var myObj = JSON.stringify(myObj);

	window.location.href = 'OPD_RMO.jsp?pid=' + Pid + '&pname=' + pname
			+ '&patobj=' + myObj.decodeSpecialChars() + '&id=' + id;

}

function viewPatientDetailsForRmoDashboardSearch(Pid) {

	var patDetail = $("#patDetail").html();
	myArray = JSON.parse(patDetail);

	for ( var i = 0; i < myArray.pl.length; i++) {

		if (myArray.pl[i].pi == Pid) {

			myObj = myArray.pl[i];
			pname = myObj.tit + " " + myObj.fn + " " + myObj.ln;
			break;
		}
		;
	}

	myObj = JSON.stringify(myObj);
	window.location.href = 'OPD_RMO.jsp?pid=' + Pid + '&pname=' + pname
			+ '&patobj=' + myObj.decodeSpecialChars();

}

function fetchOPDRegister() {
	count = 1;
	var txtDate = $("#popup_container2").val();
	if (!isDate(txtDate)) {
		alert('Invalid  Date Format');
		$("#popup_container2").val("");
		return false;
	} else {
		var strF = txtDate.split("/");
		var opdDate = strF[0] + '-' + strF[1] + '-' + strF[2];
		var inputs = [];
		inputs.push('action=fetchOPDRegister');
		inputs.push('opdDate=' + opdDate);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				response = r;

				pobj1 = eval('(' + response + ')');

				$("#container").setTemplate(opd);
				$("#container").processTemplate(pobj1);

			}
		});
	}
}

/** ****************** End opd report ************* */

/** ******************Start IPDRegister function************* */
function saveIPDRegister() {
	var rowCount = $("#rowCount").val();
	var tridString = "";
	var dignoString = "";
	var remarkString = "";
	for ( var i = 1; i <= rowCount; i++) {
		tridString = $("#trid" + i).val() + " ~" + tridString;
		dignoString = $("#digno" + i).val() + " ~" + dignoString;
		remarkString = $("#remrk" + i).val() + " ~" + remarkString;
	}
	var inputs = [];
	inputs.push('action=saveIPDRegister');
	inputs.push('tridString=' + tridString);
	inputs.push('dignoString=' + dignoString);
	inputs.push('remarkString=' + remarkString);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			alert(r);
			if (r == "IPD Register is Updated successfully...") {
				location.reload();
			}
		}
	});
}

var fetchIPDRegisterReportTemp = '{#foreach $T.pl as pl}<div	style="width: 100%; height: 60px; border-bottom: 1px solid #069;"><div													style="width: 2.7%; height: 55px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">{count++}.</div>												<div													style="width: 6%; height: 55px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.pl.pi}</div>												<div													style="width: 16.1%; height: 55px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div>												<div													style="width: 4%; height: 57px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;">{$T.pl.ag} {$T.pl.agtp}</div>												<div													style="width: 4.1%; height: 57px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;">{$T.pl.sx}</div>												<div													style="width: 11.9%; height: 57px; border-right: 1px solid #069; padding-top: 3px;padding-left: 2px;"><textarea rows="2" cols="20" readonly="readonly" style="border: none;" >{$T.pl.a1} {$T.pl.a2} {$T.pl.a3}</textarea></div>												<div													style="width: 9%; height: 57px; border-right: 1px solid #069; padding-top: 3px; text-align: center;">{$T.pl.objTreat.treStart}</div>												<div													style="width: 8.1%; height: 57px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;">{$T.pl.objTreat.treEnd} {$T.pl.objTreat.out}</div>												<div													style="width: 11.8%; height: 57px; border-right: 1px solid #069; padding-left: 2px; padding-top: 3px;"><textarea rows="2" cols="20" readonly="readonly" style="border: none;" >{$T.pl.digno}</textarea></div>												<div													style="width: 11.9%; height: 57px; border-right: 1px solid #069; padding-left: 2px; padding-top: 3px;"><textarea rows="2" cols="20" readonly="readonly" style="border: none;" >{$T.pl.remark}</textarea></div><div	style="width: 8%; height: 57px;padding-left: 2px; padding-top: 3px;">{$T.pl.rb}</div></div>{#/for}';

function fetchIPDRegisterReport() {

	count = 1;

	var admitUnder = $("#admitUnder").val();

	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();

	var strF = from.split("/");

	var frmDt = strF[2] + '-' + strF[1] + '-' + strF[0];

	var strT = to.split("/");

	var toDt = strT[2] + '-' + strT[1] + '-' + strT[0];

	var inputs = [];

	inputs.push('action=fetchIPDRegisterReport');
	inputs.push('from=' + frmDt);
	inputs.push('to=' + toDt);
	inputs.push('admitUnder=' + admitUnder);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			response = r;
			pobj1 = eval('(' + response + ')');

			$("#container").setTemplate(fetchIPDRegisterReportTemp);
			$("#container").processTemplate(pobj1);
		}
	});

}

/** ******************End IPDRegister function************* */

/** ******************Start Steaker function************* */
// divPatFilesDisp
function showPatFiles() {

	var fileNames = $("#divPatFileName").html();
	var divFilePath = $("#divPatFile").html();

	/*
	 * var fileNames = filePath; var divFilePath = actualFilePath;
	 */

	if (fileNames == "null" || fileNames == "NULL" || fileNames == "undefined"
			|| fileNames == null) {
	} else {

		var arrFileNames = fileNames.split(",");
		var arrFilePath = divFilePath.split(",");

		// var Doc_div="rb"+rowCount;
		// loadRoundDoctors(Doc_div);

		for ( var i = 0; i < arrFileNames.length; i++) {
			if (arrFileNames[i] == "null" || arrFileNames[i] == "NULL"
					|| arrFileNames[i] == "undefined") {
			} else {

				var x = document.createElement('div');
				x.setAttribute('id', 'divId' + i);
				x.setAttribute('style',
						'width: auto; height:20px;margin-left:20px;');

				document.getElementById("divPatFilesDisp").appendChild(x);
				document.getElementById('divId' + i).innerHTML = "<div  style='width: auto; '>"
						+ (i)
						+ ".<a href='"
						+ arrFilePath[i]
						+ "' target='_blank'>"
						+ arrFileNames[i]
						+ "</a></div><input type='checkbox' id='chk'>";
			}
		}
	}
}

function setSteaker() {
	var sample;

	var myObj = $("#div1").html();

	pobj1 = eval('(' + myObj + ')');

	$("#setSteaker").setTemplate(setSteakerTemp);
	$("#setSteaker").processTemplate(pobj1);
}

function printSteaker(btnSteaker) {

	var btnSteakerId = btnSteaker.id;
	var divPi = "divPi";
	var bSplit = btnSteakerId.split("btnSteaker");
	var aSplit = bSplit.slice(1);
	var divId = divPi + aSplit;
	var myObj;
	divPi = $("#" + divId).html();

	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.pl.length; i++) {

		if (myArray.pl[i].pi == divPi) {

			myObj = myArray.pl[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);

	window.location = "Report_Steaker.jsp?" + "myObj="
			+ encodeURIComponent(myObj) + "&showSaveBtn=yes";

}
function viewSteakerPat() {

	var inputs = [];
	inputs.push('action=fetch');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
		
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(steakerTemplate);
			$("#container").processTemplate(pobj1);
		}
	});
}

/**
 * *********************************End Steaker
 * function******************************
 */


var ipdBedWardsearchTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-condensed table-stripped cf'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1' style=''><label class='TextFont'>#</label></th>"
		+ "<th class='col-md-3-1' style='padding-left: 0px;'><label class='TextFont'>Patient Name</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>UHID</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission No</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Allot Bed</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont'>Cancel Admission</label></th>"
		+ "	</tr>"
		+ "	</thead>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; overflow-y: scroll; height: 430px; max-height: auto;'>"
		+ "	<table class='table table-condensed table-stripped cf'>"
		+ "<tbody class='cf'>"
		+ "	{#foreach $T.pl as pl}"
		+ "	<tr>"
		+ "		<td class='col-sm-1-1' style='height: 21.5px;'>{count++}.</td>"
		+ "		<td class='col-sm-3-1' id='divPi{count}' style='height: 21.5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "		<td class='col-sm-2-1' id='divPi{count}' style='height: 21.5px;'>{$T.pl.pi}</td>"
		+ "		<td class='col-sm-2-1' style='height: 21.5px;'>{$T.pl.objTreat.trCount}</td>"
		+ "		<td class='col-sm-2-1' style='height: 21.5px;'>"
		+ "			<input type='button' value='ALLOT BED' class='btn btn-xs btn-success editUserAccess' id='btnDelete{count}' "
		+ "					onclick=viewBedWard({$T.pl.pi},{$T.pl.trid},'N','onload','P','IPDMain') style='font-size: 12px;' disabled/>"
		+ "		</td>"
		+ "		<td class='col-sm-2-1' style='height: 21.5px;'>"
		+ "			<input type='button' value='Cancel Admission' name='#login-box' class='btn btn-xs btn-success editUserAccess' id='submit' "
		+ "				onclick='cancelAdmission({$T.pl.pi},{$T.pl.trid})' disabled/>"
		+ "		</td>" + "	</tr>" + "	{#/for}" + "</tbody>" + "</table>"
		+ "</div>";

var echoStudySearch = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 35%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 13.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.ag} {$T.pl.agtp}</div><div style='width: 14%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.bg}</div><div style='width: 10%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='ADD ECHO STUDY' onclick='addEchoStudy({$T.pl.pi})' class='edit' /></div></div> {#/for}";

function fetchIPDPatientsForBedward() {
	// alert(page_name)
	count = 1;
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
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
		
			patientBean = eval('(' + ajaxResponse + ')');

			$("#container").setTemplate(ipdBedWardsearchTemp);
			$("#container").processTemplate(patientBean);
			$("#patobject").html(ajaxResponse);
			setTimeout(function(){userAccess();},100);
		}

	});

};

function searchIPDPatientsForBedward() {

	count = 1;

	var byName = $("#byName").val();

	var byId = $("#byId").val();
	if (byName != "" && byId != "") {
		alert("Please Search  By Either UHID OR Patient Name!");
	} else if (byName == "" && byId == "") {
		alert("Please Enter Patient Name Or UHID");
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}

		var inputs = [];
		inputs.push('action=searchIPDPatientsForBedward');
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + encodeURIComponent(value));
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
			
				patientBean = eval('(' + ajaxResponse + ')');
				if (patientBean.pl.length == 0) {
					alert("Patient details not found.");
				} else {
					$("#container").setTemplate(ipdBedWardsearchTemp);
					$("#container").processTemplate(patientBean);
					$("#patobject").html(ajaxResponse);
				}
				userAccess();
			}

		});
	}
};

function SearchPatientNameOnEnter(key, page_name) {
	var keycode = (key.which) ? key.which : key.keyCode;

	if ((keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123)
			|| keycode == 8 || keycode == 9 || keycode == 127
			|| (keycode > 36 && keycode < 40) || keycode == 46) {
		return true;
	} else if (keycode == 13) {

		if (page_name == "OPDOldPatientDatabase") {
			disppatientSearch("OPDOldPatientDatabase");
		} else if (page_name == "MarkVisit") {
			searchVisitingPatient();
		} else if (page_name == "OPDQueue") {
			setAppoTimeWatchesForOPD("search");
		} else if (page_name == "previousOPDbill") {
			prevOPDBillPatSearch('opd');
		} else if (page_name == "IPDQueue") {
			searchIPDPatientsForBedward();
		} else if (page_name == "IPDadvance") {
			disppatientbillSearch('onclick', 'IPD');
		} else if (page_name == "IPD_OldPatientDatabase") {
			sdispIPDDICpatientSearch('IPD_OldPatientDatabase');
		} else if (page_name == "previousConsentForm") {
			featchPreviousICFpat('search');
		} else if (page_name == "ChannelingDoctor") {
			searchDoctor();
		} else if (page_name == "ChannelingHospital") {
			searchHospitalDetails();
		} else if (page_name == "previousIPDbillGeneral") {
			prevOPDBillPatSearch('opd');
		} else if (page_name == "previousIPDbillCredit") {
			prevOPDBillPatSearch('opd');
		} else if (page_name == "pharmacyInvoice") {
			disppatientbillSearch('onclick', 'med');
		} else if (page_name == "visitingdoctor") {
			searchDocFee('visitingdoctor');
		} else if (page_name == "anesthetist") {
			searchDocFee('anesthetist');
		}else if (page_name == "Hospital" || page_name == "Surgeon") {
			discountApprovalSearch('search');
		}/*
			 * else if (page_name == "OPDAppoinment") {
			 * //autoSuggetionPationNames(); disppatientSearch("OPDAppoinment"); }
			 */

	} else {

		if (keycode != 32) {
			alert("Please Enter Alphabets only");
			return false;
		}
	}
};

function SearchPatientIdOnEnter(key, page_name) {

	var keycode = (key.which) ? key.which : key.keyCode;
	if ((keycode > 47 && keycode < 58) || keycode == 8 || keycode == 9
			|| (keycode > 36 && keycode < 41) || keycode == 127
			|| keycode == 27 || keycode == 46) {
		return true;
	} else if (keycode == 13) {
		// alert(keycode);
		if (page_name == "OPDOldPatientDatabase") {
			disppatientSearch("OPDOldPatientDatabase");
		} else if (page_name == "MarkVisit") {
			searchVisitingPatient();
		} else if (page_name == "OPDQueue") {
			setAppoTimeWatchesForOPD("search");
		} else if (page_name == "previousOPDbill") {
			viewPrevOPDBillPatient('search','opd');
		} else if (page_name == "IPDQueue") {
			searchIPDPatientsForBedward();
		} else if (page_name == "IPDadvance") {
			disppatientbillSearch('onclick', 'IPD');
		} else if (page_name == "IPD_OldPatientDatabase") {
			sdispIPDDICpatientSearch('IPD_OldPatientDatabase');
		} else if (page_name == "previousConsentForm") {
			featchPreviousICFpat('search');
		} else if (page_name == "ChannelingDoctor") {
			searchDoctor();
		} else if (page_name == "previousIPDbillGeneral") {
//			prevOPDBillPatSearch('opd');
		} else if (page_name == "previousIPDbillCredit") {
			prevOPDBillPatSearch('opd');
		} else if (page_name == "pharmacyInvoice") {
			disppatientbillSearch('onclick', 'med');
		} else if (page_name == "discountApproval") {
			discountApprovalSearch('search');
		}else if (page_name == "OPDQueueNew") {
			AutosuggestionForOPDque1("",'search');
		}
	} else {
		alert("Please Enter Numbers Only!");
		return false;
	}
};

function disppatientSearch(page_name) {

	count = 1;
	var byName = ($("#byName").val()).trim();

	var byId = $("#byId").val();
	var byTreatId = $("#byTreatId").val();
	var byMobile = $("#byMobile").val();
	var searchBy;
	var value;
	if (byName != "" && byId != "" && byMobile != "") {
		alert("Please Search By Either UHID OR Patient Name OR Mobile Number!");
		return false;
	} else if (byName != "" && byId != "") {
		alert("Please Search By Either Patient Name OR UHID!");
		return false;
	} else if (byId != "" && byMobile != "") {
		alert("Please Search By Either UHID OR Mobile Number!");
		return false;
	} else if (byName != "" && byMobile != "") {
		alert("Please Search By Either Patient Name OR Mobile Number!");
		return false;
	} else if (byName == "" && byId == "" && byMobile == "") {
		alert("Please Enter Patient Name Or UHID Or Mobile Number");
		return false;
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;
		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		} else if (byMobile != "") {
			if (byMobile.length < 10 || byMobile.length > 10) {
				alert("Please Enter proper Mobile Number.....");
				return false;
			}
			searchBy = "byMobile";
			value = byMobile;
		} else {
			searchBy = "byTreatId";
			value = byTreatId;
		}

		// searchBy = searchBy#@#<total | er | opd | ipd | diagnosis>

		if (page_name == "OPDOldPatientDatabase") {
			searchBy = (searchBy + "#@#" + ($("#patientTypeForSearch").val())
					.trim()).trim();
		}

		var inputs = [];
		inputs.push('action=ShowTopPat');
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + encodeURIComponent(value));
		inputs.push('page_name=' + page_name);
		inputs.push('showFun=showSearchPat');
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {

				ajaxResponse = r;
			
				$("#allPatInfo").html(ajaxResponse);
				patientBean = eval('(' + ajaxResponse + ')');
				// if (patientBean.pl.length != 0) {
				// alert("Patient details not found.");
				// } else {
				if (page_name == "OldPatientDatabase"
						|| page_name == "OPDOldPatientDatabase") {
					if ($("#userRole").html() == 'admin') {
						$("#divAdminAcess").show();
						$("#container").setTemplate(containerTemplateForAdmin);
					} else {
						$("#divAdminAcess").hide();
						$("#container").setTemplate(containerTemplateForUser);
					}
				} else if (page_name == "OPDInvestigationDashboard") {
					$("#container").setTemplate(patientInvestTemp);
				} else if (page_name == "IPD_OldPatientDatabase") {
					$("#container").setTemplate(ipdOldDBtemp);
				} else if (page_name == "IPD_BedWardDashboard") {
					$("#container").setTemplate(ipdBedWardsearchTemp);
					// $("#container").setTemplate(ipdDICtemp);
					$("#patobject").html(ajaxResponse);
				} else if (page_name == "IPD_DRR_Dashboard") {
					$("#container").setTemplate(ipdDRRtemp);
				} else if (page_name == "IPD_VDR_Dashboard") {
					$("#container").setTemplate(ipdVDRtemp);
				} else if (page_name == "pharmacyPatList") {
					$("#container").setTemplate(pharmacyBillTemplate);
				} else if (page_name == "IPD_MaterialsDashboard") {
					$("#container").setTemplate(ipdMattemp);
				} else if (page_name == "IPD_Discharge_Dashboard") {
					$("#container").setTemplate(ipdDistemp);
				} else if (page_name == "OPD_Appointment") {
					$("#container").setTemplate(opdDistemp);
				} else if (page_name == "OPD_RMO_Dashboard") {
					$("#container").setTemplate(rmoDashboardSearch);
					$("#patDetail").html(ajaxResponse);
				} else if (page_name == "Steaker") {
					$("#patientDetailsFeedback").html(ajaxResponse);
					$("#container").setTemplate(steakerTemplate);
				} else if (page_name == "2-D_EchoDashBoard") {
					$("#container").setTemplate(echoStudySearch);
					$("#divEchoId").html(ajaxResponse);
					$("#pageName").val('search');
				} else if (page_name == "OrderForm") {
					$("#container").setTemplate(orderFormtemp);
					$("#orderObj").html(ajaxResponse);
				} else if (page_name == "IPD_CaseRegister_Dashboard") {
					$("#container").setTemplate(ipdcaseRegtemp);
				}

				if (patientBean.pl.length == 0) {
					alert("Patient details not found.");
				}

				if (page_name == "OPDDoctorsDeskDashboard") {
					$("#OPDPatientList").html(ajaxResponse);
					/* $("#container").setTemplate(patientDocDeskTemp); */
					$("#containerOPD").setTemplate(containerTemplateForOPDTab);
					$("#containerOPD").processTemplate(patientBean);
					return true;
				}

				$("#container").processTemplate(patientBean);

				for ( var f = 0; f < patientBean.pl.length; f++) {
					if (patientBean.pl[f].objTreat.opddt == "") {
					} else {
						$("#OPD" + patientBean.pl[f].trid).attr("disabled",
								"disabled");
					}
				}

				$("#byName").val("");
				$("#byId").val("");
				$("#byMobile").val("");
				setTimeout(function(){userAccess();},500);
			} // success
		});
	}
};

var temtry = "<div class='col-sm-12-1 scroller'	style='margin-top: -21px; border: 1px solid #b8b8b8; height: 408px; max-height: auto; width:101%; '>	<table class='table table-striped table-condensed cf'>		<tbody>			{#foreach $T.lit as lit}			<tr>				<td class='col-md-1 center' style='height: 21.5px;'>{count++}.</td>				<td class='col-md-2 center' style='height: 21.5px;'>{$T.lit.ti}</td>				<td class='col-md-2 center' style='height: 21.5px;'>{$T.lit.trCount}</td>				<td class='col-md-1 center' style='height: 21.5px;'>{$T.lit.rt}</td>				<td class='col-md-2 center' style='height: 21.5px;'>{$T.lit.treStart}</td>				<!-- <td class='col-md-2 center' style='height: 21.5px;'>					<button class='btn btn-xs btn-success' value='VIEW'						id='btnView{count}' onclick='#'>						<i class='fa fa-eye View'></i>					</button>				</td> -->			</tr>			{#/for}		</tbody>	</table></div>";

function dispTreatpatientSearch(pid, page_name) {
	$("#authorization").show();
	$("#PreAutho").show();
	$("#authorization_form").show();
	$("#btnApply").show();
	$("#msearch").hide();
	$("#claimList").hide();
	/*
	 * $("#patientEdit").hide(); $("#Medi_Details").hide();
	 * $("#Treat_info").hide(); $("#BillInfo").hide(); $("#shtAttch").hide();
	 */
	count = 1;
	var byName = $("#byName").val();
	var byId = pid;
	var byTreatId = $("#byTreatId").val();
	var byMobile = $("#byMobile").val();
	var searchBy;
	var value;
	if (byName != "" && byId != "" && byMobile != "") {
		alert("Please Search By Either UHID OR Patient Name OR Mobile Number!");
		return false;
	} else if (byName != "" && byId != "") {
		alert("Please Search By Either Patient Name OR UHID!");
		return false;
	} else if (byId != "" && byMobile != "") {
		alert("Please Search By Either UHID OR Mobile Number!");
		return false;
	} else if (byName != "" && byMobile != "") {
		alert("Please Search By Either Patient Name OR Mobile Number!");
		return false;
	} else if (byName == "" && byId == "" && byMobile == "") {
		alert("Please Enter Patient Name Or UHID Or Mobile Number");
		return false;
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;
		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		} else if (byMobile != "") {
			if (byMobile.length < 10 || byMobile.length > 10) {
				alert("Please Enter proper Mobile Number.....");
				return false;
			}
			searchBy = "byMobile";
			value = byMobile;
		} else {
			searchBy = "byTreatId";
			value = byTreatId;
		}
		if (page_name == "OPDOldPatientDatabase") {
			searchBy = (searchBy + "#@#" + ($("#patientTypeForSearch").val())
					.trim()).trim();
		}
		var inputs = [];
		inputs.push('action=ShowTopPat');
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + encodeURIComponent(value));
		inputs.push('page_name=' + page_name);
		inputs.push('showFun=showSearchPat');
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				// alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				$("#allPatInfo").html(ajaxResponse);
				myArray = JSON.parse(ajaxResponse);
				for ( var i = 0; i < myArray.pl.length; i++) {
					if (myArray.pl[i].pi == byId) {
						myObj1 = myArray.pl[i];
						break;
					}
				}
				myObj = JSON.stringify(myObj1);
				setPdetail(myObj);
				OPDBillPatient("ipd", byId);
				// goToIPDBill("125", "240", "429");

				// setTreatmentClaim(byId);
			}
		});
	}
};


function OPDBillPatient(type, id) {

	count = 1;
	var inputs = [];
	inputs.push('action=fetchOPDBillPat');
	inputs.push('type=' + type);
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxresponce = r;
			myArra = JSON.parse(ajaxresponce);
			myObjj = JSON.stringify(myArra);
			pobj1 = eval('(' + myObjj + ')');
			$("#treatmentIDList").setTemplate(temtry);
			$("#treatmentIDList").processTemplate(pobj1);
			var len = myArra.lit.length;
			var myObj1 = myArra.lit[len - 1].ti;
			var spDisc = myArra.lit[len - 1].sdic;
			var treatID = myObj1;
			fetchTestDash(treatID);
			showAssessmentTemplate(treatID);
			featchOrderByDate(treatID);
			getIPDBill(spDisc, treatID);
			IPDBillDetails('pay', treatID, id);
			setIPDAdvancedPayment("set", treatID);

			// goToIPDPrevBill("125", "240", "429");

		}
	});
}

function setAutoPatientNameDischargedPat(inputId, type) {
	var resultData = [];

	var txtVal = $('#' + inputId).val();

	if ((type == "onload") || (txtVal != null && txtVal != "")) {
		var inputs = [];
		inputs.push('action=ShowIPDDischargedPATAutoSuggestion');
		inputs.push('txtVal=' + txtVal);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 15,
			cache : true,
			error : function() {
				alert('error');
			},
			success : function(r) {
				//alert(r);
				if (r.length == 20) {
					alert("NO MATCHING FOUND");

				} else {
					ajaxResponse = r;
					bean = eval('(' + ajaxResponse + ')');

					var template = "";
					for ( var j = 0; j < bean.pl.length; j++) {
						resultData.push({
							ID : bean.pl[j].pi,
							Name : bean.pl[j].files_name
						});

						template = template + '<li data-value="'
								+ (bean.pl[j].pi)
								+ '" class=""><a href="#">'
								+ bean.pl[j].files_name
								+ '</a></li>';

					}

					setTimeout(function() {

						$("#div" + inputId + " .typeahead").html(template);
						if (type != 'onload') {
							$("#div" + inputId + " .typeahead").show();
						}

						$("#" + inputId).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});

					}, 500);
				}
			}
		});

		function displayResult(item) {
			// $('#txtMfgByName').val(item.value);
			$("#" + inputId).val((item.text).trim());

		}
	}
}

function SearchIPDDischargedPatients(page_name) {

	var byName = $("#byNamePHYDIS").val().trim();
	var byId = $("#byIdPHYDIS").val();

	var searchBy = "";
	var value = "";
	if (byName != "" && byId != "") {
		alert("Please search either by UHID or by Patient Name");
		return false;
	} else if (byName == "" && byId == "") {
		alert("Please enter Patient Name or UHID for search");
		return false;
	} else if (byName.charAt(0) == " ") {
		alert("Please select Patient Name for search");
		return false;
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}

		var inputs = [];
		inputs.push('action=searchPhysicalDischrgedPAT');
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + encodeURIComponent(value));
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "PatientServlet",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						ajaxResponse = r;
						patientBean = eval('(' + ajaxResponse + ')');
						//$("#patobject").html(ajaxResponse);
						if (patientBean.pl.length == 0) {
							alert("Patient Not Found");
						} else {
							setPatientGridDataDISCHARGED(patientBean.pl);
						}
					}
				});
	}
};

function dispIPDDICpatientSearch(page_name) {

	count = 1;

	var byName = $("#byName").val().trim();
	
	var byId = $("#byId").val();

	if (page_name == "OPDDoctorsDeskDashboard") {
		byName = $("#byNameIPD").val();
		byId = $("#byIdIPD").val();
	}

	var searchBy = "";
	var value = "";
	if (byName != "" && byId != "") {
		alert("Please search either by UHID or by Patient Name");
		return false;
	} else if (byName == "" && byId == "") {
		alert("Please enter Patient Name or UHID for search");
		return false;
	} else if (byName.charAt(0) == " ") {
		alert("Please select Patient Name for search");
		return false;
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}

		var inputs = [];
		inputs.push('action=ShowIPDTopPat');
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + encodeURIComponent(value));
		inputs.push('showFun=showSearchPat');
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "PatientServlet",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						ajaxResponse = r;
						
						patientBean = eval('(' + ajaxResponse + ')');
						$("#patobject").html(ajaxResponse);
						
						if (patientBean.pl.length == 0) {
							alert("Patient Not Found");
						} else {
							if (page_name == "OldPatientDatabase"
									|| page_name == "OPDOldPatientDatabase") {
								$("#container").setTemplate(
										containerTemplateForAdmin);
							} else if (page_name == "OPDInvestigationDashboard") {
								$("#container").setTemplate(patientInvestTemp);
							} else if (page_name == "OPDDoctorsDeskDashboard") {
								$("#container").setTemplate(
										containerTemplateForIPD);
								/* $("#container").setTemplate(patientDocDeskTemp); */
							} else if (page_name == "IPD_OldPatientDatabase") {
								$("#patobject").html(ajaxResponse);
								$("#container").setTemplate(ipdBedWardTemp);
							} else if (page_name == "DischargeProcessDatabase") {
								$("#patobject").html(ajaxResponse);
								$("#container")
										.setTemplate(opdDischargeProcess);
							} else if (page_name == "IPD_BedWardDashboard") {
								$("#container").setTemplate(ipdBedWardTemp);
							} else if (page_name == "IPD_DIC_Dashboard") {
								$("#container").setTemplate(ipdDICCharttemp);
							} else if (page_name == "IPD_DRR_Dashboard") {
								$("#container").setTemplate(ipdDRRtemp);
							} else if (page_name == "IPD_VDR_Dashboard") {
								$("#container").setTemplate(ipdVDRtemp);
							} else if (page_name == "IPD_NTR_Dashboard") {
								$("#container").setTemplate(ipdNTRtemp);
							} else if (page_name == "IPD_MaterialsDashboard") {
								$("#container").setTemplate(ipdMattemp);
							} else if (page_name == "ipdservices") {
								$("#container").setTemplate(ipdServicestemp);
							} else if (page_name == "IPD_Discharge_Dashboard") {
								$("#container").setTemplate(ipdDistemp);
							} else if (page_name == "OPD_Appointment") {
								$("#container").setTemplate(opdDistemp);
							} else if (page_name == "OPD_RMO_Dashboard") {
								$("#container").setTemplate(rmoDashboard);
							} else if (page_name == "IPDPathologyPatientAssignTestDashboard") {
								$("#pathologyAllPatInfo").html(ajaxResponse);
								$("#container").setTemplate(
										ipdPathologyPatientAssignTests);
							} else if (page_name == "IPD_ADV") {
								$("#container").setTemplate(ipdAdv);
							} else if (page_name == "Steaker") {
								count = 1;
								//$("#patientDetailsFeedback").html(patientBean);
								$("#container").setTemplate(feedbackPatTemplate);
								$("#container").processTemplate(patientBean);
							}
							setPurchaseGridDataACTIVE(patientBean.pl);
							/*$("#container").processTemplate(patientBean);*/
							// location.reload();
						}
					}
				});
	}
};

function searchOPD_ER_IPDByMrnoFnameDOB(OPD_ER_IPD) {
	var byMrno = "";
	var byFname = "";
	var byDOB = "";

	var searchBy = "";
	var value = "";
	var OPD_INACTIVE_FLAG = false;

	if (OPD_ER_IPD == "OPD") {
		byMrno = ($("#byMrnoOPD").val()).trim();
		byFname = ($("#FnameOPD").val().split(" ")[0]).trim();
		byDOB = ($("#DOBOPD").val()).trim();
	} else if (OPD_ER_IPD == "ER") {
		byMrno = ($("#byMrnoER").val()).trim();
		byFname = ($("#FnameER").val().split(" ")[0]).trim();
		byDOB = ($("#DOBER").val()).trim();
	} else if (OPD_ER_IPD == "IPD") {
		byMrno = ($("#byMrnoIPD").val()).trim();
		byFname = ($("#FnameIPD").val().split(" ")[0]).trim();
		byDOB = ($("#DOBIPD").val()).trim();
	} else if ((OPD_ER_IPD.indexOf("_INACTIVE__")) != -1) {
		// if found:'OPD_INACTIVE__', 'IPD_INACTIVE__'
		OPD_INACTIVE_FLAG = true;
		byDOB = "DUMMY_VALUE";
	}

	if (byMrno != "" && byFname != "" && byDOB != "") {
		alert("Please Search By Either MR no. OR First Name OR Date of Birth!");
		return false;
	} else if (byMrno != "" && byFname != "") {
		alert("Please Search By Either MR no. OR First Name!");
		return false;
	} else if (byFname != "" && byDOB != "") {
		alert("Please Search By Either First Name OR Date of Birth!");
		return false;
	} else if (byDOB != "" && byMrno != "") {
		alert("Please Search By Either Date of Birth OR MR no.!");
		return false;
	} else if (byMrno == "" && byFname == "" && byDOB == "") {
		alert("Please Enter MR no. Or First Name Or Date of Birth");
		return false;
	} else {
		if (byMrno != "") {
			searchBy = "byMrno";
			value = byMrno;
		} else if (byFname != "") {
			searchBy = "byFname";
			value = byFname;
		} else if (byDOB != "") {
			searchBy = "byDOB";
			value = byDOB;

			// for fetching inactive patient by treatmentID
			// 'OPD_INACTIVE__434, IPD_INACTIVE__434'
			if (OPD_INACTIVE_FLAG) {
				searchBy = "byTreatmentID";
				value = (OPD_ER_IPD.split("__")[1]); // TreatmentID
				OPD_ER_IPD = (OPD_ER_IPD.split("__")[0]); // String
				byDOB = "";

				/*
				 * if (OPD_ER_IPD === "IPD_INACTIVE") { alert("Work under
				 * progress for IPD..."); return false; }
				 */

			}

		} else {
			searchBy = "";
			value = "";
		}

		if (searchBy == "" && value == "") {
			alert("Please Enter MR no. Or First Name Or Date of Birth...");
			return false;
		}
			
		var inputs = [];
		inputs.push('action=fetchPatientDataByOPD_ER_IPD');
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + value);
		inputs.push('OPD_ER_IPD=' + OPD_ER_IPD);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "PatientServlet",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						var ajaxResponse = r;
						var patientBean = eval('(' + ajaxResponse + ')');
						if (patientBean.pl.length == 0) {
							alert("Patient Not Found");
						} else {
								
							if (OPD_ER_IPD == "OPD") {
								count = 1;
								$("#OPDPatientList").html(ajaxResponse);
								$("#containerOPD").setTemplate(
										containerTemplateForOPDTab);
								$("#containerOPD").processTemplate(patientBean);
							} else if (OPD_ER_IPD == "ER") {
								count = 1;
								$("#ERPatientList").html(ajaxResponse);
								$("#containerER").setTemplate(
										containerTemplateForER);
								$("#containerER").processTemplate(patientBean);
							} else if (OPD_ER_IPD == "IPD") {
								count = 1;
								$("#patobject").html(ajaxResponse);
								$("#container").setTemplate(
										containerTemplateForIPD);
								$("#container").processTemplate(patientBean);
							} else if ((OPD_ER_IPD.indexOf("_INACTIVE")) != -1) {
								var pid = (patientBean.pl[0].pi);
								var refferedTo = (patientBean.pl[0].objTreat.rt);
								var ht = 0;

								if (undefined == refferedTo) {
									refferedTo = (patientBean.pl[0].rt);
									ht = (patientBean.pl[0].objHall.ht);
								}

								patientBean = (patientBean.pl[0]);
								patientBean = JSON.stringify(patientBean);

								if (refferedTo == "opd") {
									
								var pid1 = (patientBean.pi);
								var pname = (patientBean.fn+ " " +patientBean.mn+ " " +patientBean.ln);
								var admtDate = (patientBean.objTreat.treStart);
								var refferedToo = (patientBean.objTreat.rt);
								var admNo = (patientBean.objTreat.trCount);
								var doc = (patientBean.objDoc.dn);
								var tid1 = (patientBean.objTreat.ti);
								
								$("#pid1").html(pid1);
								$("#pname").html(pname);
								$("#regDate").html(admtDate);
								$("#refTo").html(refferedToo);
								$("#opdNo").html(admNo);
								$("#doc").html(doc);
								$("#tid1").html(tid1);
								
								fetchCKEditorDocterDesk1ForPrint();
								fetchAllergyAlertsForPrint(pid1);
								showAssessmentForPrint(tid1);
								fetchPrescriptionForPrint(tid1);
								fetchTestForPrint(tid1);
								fetchPCTreatmentInstructionForPrint(tid1);
								fetchIndividualTreatmentInstructionForPrint(tid1);
								fetchAdviceForPrint(tid1);
								fectchAllRadiotherapyForPrint(tid1,pid1);
								
								showSummaryPostPopup();
								
								
								} else if (refferedTo === "ipd") {
									
									var pid2 = (patientBean.pi);
									var pname = (patientBean.fn+ " " +patientBean.mn+ " " +patientBean.ln);
									var admtDate = (patientBean.objTreat.treStart);
									var refferedToo = (patientBean.objTreat.rt);
									var admNo = (patientBean.objTreat.trCount);
									var doc = (patientBean.objDoc.dn);
									var tid2 = (patientBean.objTreat.ti);
									
									$("#pid2").html(pid2);
									$("#pname2").html(pname);
									$("#regDate2").html(admtDate);
									$("#refTo2").html(refferedTo);
									$("#ipdNo2").html(admNo);
									$("#doc2").html(doc);
									$("#tid2").html(tid2);
								
									fetchCKEditorDocterDesk1ForPrintIPD();
									setDoctorPreRoundforPrintIPD();
									fetchAllergyAlertsForPrintIPD(pid2);
									showAssessmentForPrintIPD(tid2);
									fetchPrescriptionForPrintIPD(tid2);
									fetchTestForPrintIPD(tid2);
									fetchPCTreatmentInstructionForPrintIPD(tid2);
									fetchIndividualTreatmentInstructionForPrintIPD(tid2);
									showPatientAdmissionNoteIPD(tid2);
									fetchIpdServicesIPD();
									
									showSummaryPostPopupIPD();

									return false;
								} else if (refferedTo === "diagnosis") {

									setTimeout(
											function() {

												window
														.open(
																("diagnosticPatientTestAssign.jsp?myObj="
																		+ encodeURIComponent(patientBean) + "&pageType=diagnosis&callFor=previousTreatmentDiagnosis"),
																'_blank');

												

											}, 300);

								}

							}
						}
					}
				});
	}
};

function viewMaterial(patientId) {
	patientId = $("#PatID").html();
	ajaxResponse = $("#divPatId").html();
	myArray = JSON.parse(ajaxResponse);
	/*
	 * ajaxResponse = $("#patobject").html(); myArray =
	 * JSON.parse(ajaxResponse); for ( var i = 0; i < myArray.pl.length; i++) {
	 * if (myArray.pl[i].pi == patientId) { myObj = myArray.pl[i]; break; } }
	 */
	myObj = myArray;
	var treStart = myObj.objTreat.treStart;
	myObj = JSON.stringify(myObj);
	window.location.href = "IPD_Materials.jsp?" + "myObj="
			+ encodeURIComponent(myObj) + "&treStart=" + treStart;
	// }
	// window.location.href = "IPD_Materials.jsp?" + "patientId=" + patientId
	// + "&treatmentId=" + treatmentId;
}

function viewServices(patientId) {
	patientId = $("#PatID").html();
	ajaxResponse = $("#divPatId").html();
	myArray = JSON.parse(ajaxResponse);

	/*
	 * ajaxResponse = $("#patobject").html(); myArray =
	 * JSON.parse(ajaxResponse); for ( var i = 0; i < myArray.pl.length; i++) {
	 * if (myArray.pl[i].pi == patientId) { myObj = myArray.pl[i]; break; } }
	 */
	myObj = myArray;
	var trid = myObj.trid;
	myObj = JSON.stringify(myObj);
	window.location.href = "IPD_Services.jsp?" + "myObj="
			+ encodeURIComponent(myObj) + "&trid=" + trid;

}

// Added by Sagar
 function viewBedWard(treatmentId,phyDisFlag) {
	/*ajaxResponse = $("#patobject").html();*/
	//alert(ajaxResponse);
	/*myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == patientId) {
			myObj = myArray.pl[i];

			break;
		}
	}

	myObj = JSON.stringify(myObj);

	if (bedAllocated == 'N') {
		window.location.href = "IPD_BedWard.jsp?" + "patientId=" + patientId
				+ "&treatmentId=" + treatmentId + "&myObj="
				+ encodeURIComponent(myObj) + "&bedallocated=" + bedAllocated
				+ "&ht=" + ht + "&pattype=" + pattype + "&pageIncludeType="
				+ pageIncludeType+"&type=bed";
	} else {
		window.location.href = "IPD_CoverSheet.jsp?" + "patientId=" + patientId
				+ "&treatmentId=" + treatmentId + "&myObj="
				+ encodeURIComponent(myObj) + "&bedallocated=" + bedAllocated
				+ "&ht=" + ht + "&pattype=" + pattype + "&pageIncludeType="
				+ pageIncludeType+"&type=bed";
	}*/

	
	
	//Added by sagar
	
	/*if (bedAllocated == 'N') {
		window.location.href = "IPD_BedWard.jsp?" +"deptid=" + deptid  + "&patientId=" + patientId
				+ "&treatmentId=" + treatmentId +  "&bedallocated=" + bedAllocated
				+ "&ht=" + ht + "&pattype=" + pattype + "&pageIncludeType="
				+ pageIncludeType+"&type=bed";
	} else {*/
 window.location.href = "IPD_DoctorStation.jsp?" + "treatmentId=" + treatmentId + "&phyDisFlag=" + phyDisFlag ;
	 
	
 }
 
function viewBedWardIPD(treatmentId,callfrom,pid) {
 window.location.href = "IPD_DoctorStation2.jsp?" + "tid=" + treatmentId + "&callfrom=" + callfrom+"&pid="+pid;
	
}	
	/***********
	 * @author	: Sagar Kadam
	 * @date	: 9-jun-2017
	 * @reason	: to get doctor name from db 
	 **********/ 
	function getDoctornameForCommonTemp2() {
		 
		var drid=$("#drid").val();
		if(drid==undefined || drid==null || drid==""){
			return false;
			drid="0";
 		}
		//alert(drid);
 		var strArr = drid.split(',');
		for(var i=0; i<strArr.length; i++) 
		{  
			drid=parseInt(strArr[i]);
		
	 	jQuery.ajax({
			async 	: false,
			type 	: "POST",
			data 	: {
			 "drid" : drid,
	 			},
			url 	: "ehat/markvisit/getDoctorName",
			timeout : 1000 * 60 * 5,
			cache 	: false,
			error 	: function() {
	 		},
			success : function(r) {
				ajaxResponse = r;
				if(r.lstDoctorDto[0].doc_name!=undefined || r.lstDoctorDto[0].doc_name!=null){
				 
				$("#consultingDoctor").text(r.lstDoctorDto[0].doc_name);
				
				docName=r.lstDoctorDto[0].doc_name;
				}else{
					return false;
				}
				 
			}
		});
	 	
		}
		if(docName!=null){
			return docName;
			}
	}
	
	
	 
/*******************************************************************************
 * @author Sagar kadam
 * @date 27_June_2017
 * @Code for autosuggestion 
 ******************************************************************************/
function getAllPatientRecords2(inputId,callfrom) {
	
	var deptId=2;
	var usertype = "";
	var letter="";
	if (callfrom ="search") {
		letter=$("#byName").val();
	}
	
    var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        inputs.push('deptId=' + deptId);
        var str = inputs.join('&');
	
	jQuery.ajax({
	async : true,
	type : "POST",
	data 	: str + "&reqType=AJAX",
	url : "ehat/registration/getAllRecordsDeptwiseWithAuto",
	success : function(r) {
		//setTempPatientRecords(r);

		$("#OPDPatientList").html(r);
		
		
			$("#containerIPD").setTemplate(tabipdtempalte);
			$("#containerIPD").processTemplate(r);
			autoCompTablefoAllPatientRecords2(r,inputId);
			
		
	}
});}

 
/*******************************************************************************
 * @author Sagar kadam
 * @date 27_June_2017
 * @Code for previous autosummary
 ******************************************************************************/
function getAllPatientRecordsForPreviousAutosummary(inputId,callfrom) {
	//alert(callfrom);
	var type="";
	if(callfrom=="temp"){
		//alert(callfrom);
		type=callfrom;
	}
	if(callfrom=="auto"){
		//alert(callfrom);

		type=callfrom;
	}
	
	var deptId=2;
	var usertype = "";
	var letter="";
	var patienid=0;
	if (callfrom =="temp") {
		letter=$("#byName").val();
		if(letter=="" || letter ==undefined){
			letter=$("#byId").val();
		}
		
	}
	
    var findingName = $("#" + inputId).val();
    if(findingName=="" || findingName ==undefined){
    	findingName="";
	}else{
		letter = findingName;
	}
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        inputs.push('deptId=' + deptId);
        inputs.push('type=' + type);
       // inputs.push('patienid=' + patienid);
        
        var str = inputs.join('&');
	
	jQuery.ajax({
	async : true,
	type : "POST",
	data 	: str + "&reqType=AJAX",
	url : "ehat/registration/getAllForAutoSummary",
	success : function(r) {
		//setTempPatientRecords(r);

		 
		
			ipdAutoManualSummaryTemp(r);
		 
			ipdAutoManualSummaryAutosuggestion(r,inputId);
		
	}
});}



/*******************************************************************************
 * @author Sagar Kadam
 * @date 21_June_2017
 * @Code template Patient records.
 ************************************/
function ipdAutoManualSummaryTemp(r){
	var htm='';
	var index=1;
	 var drid=0;
	for ( var i = 0; i < r.listRegTreBillDto.length;i++) {
		
		 
		
		 
			 
			htm=htm 
				+ "<table class='table table-condensed cf'>"
				+ "<tbody>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+index+"</td>"
				+ "<td class='col-sm-3-1 center' style='height: 21.5px;'>"+ r.listRegTreBillDto[i].patientName+"  </td>"
	 			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+ r.listRegTreBillDto[i].patientId+"</td>"
			
	 			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+ r.listRegTreBillDto[i].mobile+"</td>"
	 			+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"+ r.listRegTreBillDto[i].mrnno+"</td>"

	 			
	 			/*+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>-</td>"*/
				
				+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
				+ "	<button onclick=ViewPreviousDischargeSummary("+r.listRegTreBillDto[i].treatmentId+") class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
				+ "		</td>"
				 
				  + "</tbody>" + "</table>";
			index++;
	
	 
		

	}
	$("#containerIPDAuto").html(htm);
	$("#containerIPDAuto").processTemplate(r);

}



/************
* @author	: Sagar Kadam
* @date		: 05-June-2017
* @codeFor	: Autosuggestion Template for patient Records
 ************/
function ipdAutoManualSummaryAutosuggestion(response, id) {
	//var qty = id.slice(0, -1); // for dyamic col getting id

	var myArray = response;// parsing response in JSON format

	$.widget(
		'custom.mcautocomplete',
		$.ui.autocomplete,
		{
			_create : function() {
				this._super();
				this.widget().menu("option", "items",
						"> :not(.ui-widget-header)");
			},
			_renderMenu : function(ul, items) {
				var self = this, thead;
				if (this.options.showHeader) {
					table = $('<div class="ui-widget-header" style="width:100%"></div>');
					$
							.each(
									this.options.columns,
									function(index, item) {
										table
												.append('<span style="padding:0 4px;float:left;width:'
														+ item.width
														+ ';">'
														+ item.name
														+ '</span>');
									});
					table
							.append('<div style="clear: both;"></div>');
					ul.append(table);
				}
				$.each(items, function(index, item) {
					self._renderItem(ul, item);
				});
			},
			_renderItem : function(ul, item) {
				var t = '', result = '';
				$
						.each(
								this.options.columns,
								function(index, column) {
									t += '<span style="padding:0 4px;float:left;width:'
											+ column.width
											+ ';">'
											+ item[column.valueField ? column.valueField
													: index]
											+ '</span>';
								});
				result = $('<li></li>')
						.data('ui-autocomplete-item', item)
						.append(
								'<a class="mcacAnchor">'
										+ t
										+ '<div style="clear: both;"></div></a>')
						.appendTo(ul);
				return result;
			}
	});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
	{
		// These next two options are what this plugin adds to the
		// autocomplete widget.
		showHeader : true,
		columns : [ {
			name : 'Patient Name',
			width : '100px',
			valueField : 'patientName'
		}, /*
			 * { name : 'unitCode', //width : '80px', valueField :
			 * 'unitCode' }
			 */],

		// Event handler for when a list item is selected.
		select : function(event, ui) {
			console.log(ui);
			
			var spl = (ui.item.spl = "" ? '' : ui.item.spl);
			if (ui.item.dn != 'No' && ui.item.spl != 'Record'
					&& ui.item.specialisationName != 'Found'
					&& ui.item.patientName != 'Match') {
			
				 
				$('#'+id).val(ui.item.patientName);
			}
			/*
			 * This function use for Enter keypress search
			 */
			
		//	getPreviousTreatmentPatient(id,'search');
			getAllPatientRecordsForPreviousAutosummary(id,'search');
			//setAutoCompleteMarkVisit(id, 'search');
			//$("#mrnNo").val(101);
			return false;
		},

		// The rest of the options are for configuring the ajax
		// webservice call.
		minLength : 1,
		source : function(request, response) {
			var data = myArray;
			console.log(data);
			console.log(data.listRegTreBillDto.length);
			var result;
			if (!data || data.listRegTreBillDto.length === 0 || !data.listRegTreBillDto
					|| data.listRegTreBillDto.length === 0) {
				/*
				 * result = [{ label: 'No match found.' }];
				 */
				result = [ {
					/* 'dn' : 'No', */
					'patientName' : 'Record',
					'patientId' : 'Found',
				/* 'depNm' : 'Match' */
				} ];
			} else {
				result = data.listRegTreBillDto;// Response List for All
				// Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}
 


/************
* @author	: Sagar Kadam
* @date		: 05-June-2017
* @codeFor	: Autosuggestion Template for patient Records
 ************/
function autoCompTablefoAllPatientRecords2(response, id) {
	//var qty = id.slice(0, -1); // for dyamic col getting id

	var myArray = response;// parsing response in JSON format

	$.widget(
		'custom.mcautocomplete',
		$.ui.autocomplete,
		{
			_create : function() {
				this._super();
				this.widget().menu("option", "items",
						"> :not(.ui-widget-header)");
			},
			_renderMenu : function(ul, items) {
				var self = this, thead;
				if (this.options.showHeader) {
					table = $('<div class="ui-widget-header" style="width:100%"></div>');
					$
							.each(
									this.options.columns,
									function(index, item) {
										table
												.append('<span style="padding:0 4px;float:left;width:'
														+ item.width
														+ ';">'
														+ item.name
														+ '</span>');
									});
					table
							.append('<div style="clear: both;"></div>');
					ul.append(table);
				}
				$.each(items, function(index, item) {
					self._renderItem(ul, item);
				});
			},
			_renderItem : function(ul, item) {
				var t = '', result = '';
				$
						.each(
								this.options.columns,
								function(index, column) {
									t += '<span style="padding:0 4px;float:left;width:'
											+ column.width
											+ ';">'
											+ item[column.valueField ? column.valueField
													: index]
											+ '</span>';
								});
				result = $('<li></li>')
						.data('ui-autocomplete-item', item)
						.append(
								'<a class="mcacAnchor">'
										+ t
										+ '<div style="clear: both;"></div></a>')
						.appendTo(ul);
				return result;
			}
	});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
	{
		// These next two options are what this plugin adds to the
		// autocomplete widget.
		showHeader : true,
		columns : [ {
			name : 'Patient Name',
			width : '100px',
			valueField : 'patientName'
		}, /*
			 * { name : 'unitCode', //width : '80px', valueField :
			 * 'unitCode' }
			 */],

		// Event handler for when a list item is selected.
		select : function(event, ui) {
			console.log(ui);
			
			var spl = (ui.item.spl = "" ? '' : ui.item.spl);
			if (ui.item.dn != 'No' && ui.item.spl != 'Record'
					&& ui.item.specialisationName != 'Found'
					&& ui.item.patientName != 'Match') {
			
				 
				$('#'+id).val(ui.item.patientName);
			}
			/*
			 * This function use for Enter keypress search
			 */
			
		//	getPreviousTreatmentPatient(id,'search');
			getAllPatientRecords2(id,'search');
			//setAutoCompleteMarkVisit(id, 'search');
			//$("#mrnNo").val(101);
			return false;
		},

		// The rest of the options are for configuring the ajax
		// webservice call.
		minLength : 1,
		source : function(request, response) {
			var data = myArray;
			console.log(data);
			console.log(data.listRegTreBillDto.length);
			var result;
			if (!data || data.listRegTreBillDto.length === 0 || !data.listRegTreBillDto
					|| data.listRegTreBillDto.length === 0) {
				/*
				 * result = [{ label: 'No match found.' }];
				 */
				result = [ {
					/* 'dn' : 'No', */
					'patientName' : 'Record',
					'patientId' : 'Found',
				/* 'depNm' : 'Match' */
				} ];
			} else {
				result = data.listRegTreBillDto;// Response List for All
				// Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}
 


/*******************************************************************************
 * @author Sagar Kadam
 * @date 21_June_2017
 * @Code template Patient records.
 ************************************/
var tabipdtempalte = "{#foreach $T.listRegTreBillDto as listRegTreBillDto}"
	+ "<tr id='trcount{count}'>"
	+ "<td class='center' style='width: 5%;'>{count++}.</td>"
	+ "<td class='' style='width: 10%'>123456789-D </td>"
	+ "<td class='' style='width: 15%;'>{$T.listRegTreBillDto.patientName}</td>"
	+ "<td class='center' style='width: 10%;'>{$T.listRegTreBillDto.age} Yr:{$T.listRegTreBillDto.gender}</td>"
	+ "<td class='center' style='width: 7%;'>50kg-D</td>"
	+ "<td class='center' style='width: 7%;'>IPD/124-D</td>"
	+ "<td class='center' style='width: 7%;'>22/06/2017-D</td>"
	+ "<td class='center' style='width: 7%;'>12:00-D</td>"



	/* + "<td class='center' style='width: 7%;'>{$T.pl.EpisdeVisitList[0].episodeNo}</td>" */
	+ "<td class='center' style='width: 7%;'>-</td>"

	+ "<td class='center' style='width: 7%;'>-</td>"
	 
	+ "<td class='center' style='width: 7%;'>"

	+ "<button onclick=viewBedWard({$T.listRegTreBillDto.treatmentId}) type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
	+ "</td>"
	+ "<td class='center' style='width: 7%;'>"
	+ '<button onclick="printIPDFormJsp({$T.listRegTreBillDto.patientId});" class="btn btn-xs btn-success"><i class="fa fa-print"></i></button>'
	+ "</td>" + "</tr>" + "{#/for}";
 


/*******************************************************************************
 * @author Sagar Kadam
 * @date 21_June_2017
 * @Code for ipd cover sheet 
 ************************************/
function viewBedWard2(tid, patientId,dept) {

	var depdoctordesk =$("#depdoctordesk").val();

		setTimeout(function() {
			window.location.href = "IPD_CoverSheet.jsp?treatmentId=" + tid  +"&patientId=" + patientId +"&patientId=" + patientId;
		}, 300);

}
/*
	if (bedAllocated == 'N') {
		window.location.href = "IPD_BedWard.jsp?" + "patientId=" + patientId
				+ "&treatmentId=" + treatmentId + "&myObj="
				+ encodeURIComponent(myObj) + "&bedallocated=" + bedAllocated
				+ "&ht=" + ht + "&pattype=" + pattype + "&pageIncludeType="
				+ pageIncludeType+"&type=bed";
	} else {
		window.location.href = "IPD_CoverSheet.jsp?" + "patientId=" + patientId
				+ "&treatmentId=" + treatmentId + "&myObj="
				+ encodeURIComponent(myObj) + "&bedallocated=" + bedAllocated
				+ "&ht=" + ht + "&pattype=" + pattype + "&pageIncludeType="
				+ pageIncludeType+"&type=bed";
	}
*/

 
/*****phisically discharged patient view***/
function viewBedWardPDP(patientId, treatmentId, bedAllocated, ht, pattype,
		pageIncludeType,type) {
	ajaxResponse = $("#patobjectPDP").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == patientId) {
			myObj = myArray.pl[i];

			break;
		}
	}

	myObj = JSON.stringify(myObj);

	if (bedAllocated == 'N') {
		window.location.href = "IPD_BedWard.jsp?" + "patientId=" + patientId
				+ "&treatmentId=" + treatmentId + "&myObj="
				+ encodeURIComponent(myObj) + "&bedallocated=" + bedAllocated
				+ "&ht=" + ht + "&pattype=" + pattype + "&pageIncludeType="
				+ pageIncludeType+"&type="+type;
	} else {
		window.location.href = "IPD_CoverSheet.jsp?" + "patientId=" + patientId
				+ "&treatmentId=" + treatmentId + "&myObj="
				+ encodeURIComponent(myObj) + "&bedallocated=" + bedAllocated
				+ "&ht=" + ht + "&pattype=" + pattype + "&pageIncludeType="
				+ pageIncludeType+"&type="+type;
	}

}

function RedirectToAllotBed() {
	
		window.location.href = "IPD_BedWardDashboard.jsp";

}
function viewIPDDoctorStationDashboard(patientId, treatmentId, bedAllocated,
		ht, pattype, pageIncludeType) {
	ajaxResponse = $("#patobject").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == patientId) {
			myObj = myArray.pl[i];
			break;
		}
	}

	myObj = JSON.stringify(myObj);

	if (bedAllocated == 'N') {
		window.location.href = "IPD_BedWard.jsp?" + "patientId=" + patientId
				+ "&treatmentId=" + treatmentId + "&myObj="
				+ encodeURIComponent(myObj) + "&bedallocated=" + bedAllocated
				+ "&ht=" + ht + "&pattype=" + pattype + "&pageIncludeType="
				+ pageIncludeType;
	} else {
		window.location.href = "IPD_DoctorStation.jsp?" + "patientId="
				+ patientId + "&treatmentId=" + treatmentId + "&myObj="
				+ encodeURIComponent(myObj) + "&bedallocated=" + bedAllocated
				+ "&ht=" + ht + "&pattype=" + pattype + "&pageIncludeType="
				+ pageIncludeType;
	}

}

function viewDischargePlan(treatmentId) {
	ajaxResponse = $("#divPatId").html();
	/*myArray = JSON.parse(ajaxResponse);
	
	 * ajaxResponse = $("#patobject").html(); myArray =
	 * JSON.parse(ajaxResponse); for ( var i = 0; i < myArray.pl.length; i++) {
	 * if (myArray.pl[i].pi == patientId) { myObj = myArray.pl[i];
	 * 
	 * break; } }
	 
	myObj = myArray;
	var trid = myObj.trid;
	myObj = JSON.stringify(myObj);*/

	//var patientId = $("#pid").val();
	var treatmentId = $("#tid").val();
	/*var bedAllocated = $("#bedAllocated").val();
	var ht = $("#ht").val();
	var pattype = $("#pattype").val();
	var pageIncludeType = 'IPD';
	var callFor = $("#callFor").val();
	var type = $("#callfromipd").val();
	var drid = $("#drid").val();*/


	window.location.href = "ipdDischarge_Plan.jsp?"  + "treatmentId=" + treatmentId ;

	
	
	/*var patientId = $("#pid").val();
	var treatmentId = $("#treatmentId").val();
	
	window.location.href = "ipdDischarge_Plan.jsp?" + "patientId=" + patientId
	+ "&treatmentId=" + treatmentId  ;*/
	
	
}

function viewDischargeProcess(patientId, treatmentId, bedAllocated, ht) {
	ajaxResponse = $("#divPatId").html();
	myArray = JSON.parse(ajaxResponse);
	/*
	 * ajaxResponse = $("#patobject").html(); myArray =
	 * JSON.parse(ajaxResponse); for ( var i = 0; i < myArray.pl.length; i++) {
	 * if (myArray.pl[i].pi == patientId) { myObj = myArray.pl[i];
	 * 
	 * break; } }
	 */
	myObj = myArray;
	var trid = myObj.trid;
	myObj = JSON.stringify(myObj);

	var patientId = $("#pid").val();
	var treatmentId = $("#treatmentId").val();
	var bedAllocated = $("#bedAllocated").val();
	var ht = $("#ht").val();
	var pattype = $("#pattype").val();
	var pageIncludeType = 'IPD';
	var callFor = $("#callFor").val();
	var type = $("#callfromipd").val();
	var relativeBedStatus = $("#relativeBedStatus").val();
	window.location.href = "ipdDischarge_Process.jsp?" + "patientId="
			+ patientId + "&treatmentId=" + treatmentId + "&bedallocated=" + bedAllocated
			+ "&ht=" + ht + "&pattype=" + pattype + "&pageIncludeType="
			+ pageIncludeType + "&type=" + type + "&callFor=" + callFor + "&relativeBedStatus=" + relativeBedStatus;

}

function viewDischargeProcess(treatmentId) {
/*	ajaxResponse = $("#divPatId").html();
	//myArray = JSON.parse(ajaxResponse);
	
	 * ajaxResponse = $("#patobject").html(); myArray =
	 * JSON.parse(ajaxResponse); for ( var i = 0; i < myArray.pl.length; i++) {
	 * if (myArray.pl[i].pi == patientId) { myObj = myArray.pl[i];
	 * 
	 * break; } }
	 
	myObj = myArray;
	var trid = myObj.trid;
	myObj = JSON.stringify(myObj);*/

	//var patientId = $("#pid").val();
	var treatmentId = $("#tid").val();
/*	var bedAllocated = $("#bedAllocated").val();
	var ht = $("#ht").val();
	var pattype = $("#pattype").val();
	var pageIncludeType = 'IPD';
	var callFor = $("#callFor").val();
	var type = $("#callfromipd").val();
	var drid = $("#drid").val();
*/

	window.location.href = "ipdDischarge_Process.jsp?" + "treatmentId=" + treatmentId ;
	
	
	
	/*window.location.href = "ipdDischarge_Process.jsp?" + "patientId="
	+ patientId + "&treatmentId=" + treatmentId ;*/

}


/*
function viewDischargeNote() {
	ajaxResponse = $("#divPatId").html();
	myArray = JSON.parse(ajaxResponse);
	alert(ajaxResponse);
	
	 * ajaxResponse = $("#patobject").html(); myArray =
	 * JSON.parse(ajaxResponse); for ( var i = 0; i < myArray.pl.length; i++) {
	 * if (myArray.pl[i].pi == patientId) { myObj = myArray.pl[i];
	 * 
	 * break; } }
	 
	myObj = myArray;
	var trid = myObj.trid;
	myObj = JSON.stringify(myObj);

	var patientId = $("#pid").val();
	var treatmentId = $("#tid").val();
	var bedAllocated = $("#bedAllocated").val();
	var ht = $("#ht").val();
	var pattype = $("#pattype").val();
	var pageIncludeType = 'IPD';
	var callFor = $("#callFor").val();
	var type = $("#callfromipd").val();
	var drid = $("#drid").val();

	 

	window.location.href = "IPD_DischargeNote.jsp?" + "patientId=" + patientId
			+ "&treatmentId=" + treatmentId  + "&bedallocated=" + bedAllocated
			+ "&ht=" + ht + "&pattype=" + pattype + "&pageIncludeType="
			+ pageIncludeType +"&type=" + type + "&drid=" + drid + "&callFor=" + callFor;
}
*/
/*function viewDischargeNote2() {
	ajaxResponse = $("#divPatId").html();
	myArray = JSON.parse(ajaxResponse);
	 
	
	 * ajaxResponse = $("#patobject").html(); myArray =
	 * JSON.parse(ajaxResponse); for ( var i = 0; i < myArray.pl.length; i++) {
	 * if (myArray.pl[i].pi == patientId) { myObj = myArray.pl[i];
	 * 
	 * break; } }
	 
	 
	var patientId = $("#pid").val();
	var treatmentId = $("#tid").val();
	 

	window.location.href = "IPD_DischargeNote.jsp?" + "patientId=" + patientId
			+ "&treatmentId=" + treatmentId;
}*/






function viewVDR(patientId, treatmentId) {
	window.location.href = "IPD_VDR.jsp?" + "patientId=" + patientId
			+ "&treatmentId=" + treatmentId;
}

function viewTreatment(patientId, trid) {

	window.location.href = "IPD_Discharge_Dashboard1.jsp?" + "&patientId="
			+ patientId + "&trid=" + trid;

}
function viewCaseRegTreatment(patientId, trid) {

	window.location.href = "IPD_CaseRegister_DashboardTreatments.jsp?"
			+ "&patientId=" + patientId + "&trid=" + trid;

}
function fetchPatAllTreatments() {

	var patientId = $("#patientId").val();

	var inputs = [];
	inputs.push('action=fetchPatAllTreatments');
	inputs.push('patientId=' + patientId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(ipdDischargtemp);
			$("#container").processTemplate(pobj1);
		}
	});

}

function fetchPatAllTreatmentsForCaseRegister() {

	var patientId = $("#patientId").val();

	var inputs = [];
	inputs.push('action=fetchPatAllTreatments');
	inputs.push('patientId=' + patientId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(caseRegtemp);
			$("#container").processTemplate(pobj1);
		}
	});

}
function viewDischarge(patientId, trid) {
	ajaxResponse = $("#divPatId").html();
	myArray = JSON.parse(ajaxResponse);
	/*
	 * ajaxResponse = $("#dischargeObj").html();
	 * 
	 * myArray = JSON.parse(ajaxResponse); for ( var i = 0; i <
	 * myArray.pl.length; i++) { if (myArray.pl[i].pi == patientId) { myObj =
	 * myArray.pl[i]; break; } }
	 */

	myObj = myArray;
	var rby = myObj.rb;
	var trid = myObj.trid;
	myObj = JSON.stringify(myObj);

	var patientId = $("#pid").val();
	var treatmentId = $("#treatmentId").val();
	var bedAllocated = $("#bedAllocated").val();
	var ht = $("#ht").val();
	var pattype = $("#pattype").val();
	var pageIncludeType = 'IPD';
	var callFor = $("#callFor").val();

	window.location.href = "IPD_Discharge.jsp?" + "patientId=" + patientId
			+ "&trid=" + trid + "&referby=" + rby + "&myObj="
			+ encodeURIComponent(myObj) + "&treatmentId=" + treatmentId
			+ "&bedallocated=" + bedAllocated + "&ht=" + ht + "&pattype="
			+ pattype + "&pageIncludeType=" + pageIncludeType + "&callFor="
			+ callFor;
}

function viewDischargeSummary(patientId, trid) { //new added by sagar
	//ajaxResponse = $("#divPatId").html();
	//myArray = JSON.parse(ajaxResponse);
	/*
	 * ajaxResponse = $("#dischargeObj").html();
	 * 
	 * myArray = JSON.parse(ajaxResponse); for ( var i = 0; i <
	 * myArray.pl.length; i++) { if (myArray.pl[i].pi == patientId) { myObj =
	 * myArray.pl[i]; break; } }
	 */

	/*myObj = myArray;
	var rby = myObj.rb;
	var trid = myObj.trid;
	myObj = JSON.stringify(myObj);
*/
	//var patientId = $("#pid").val();
	var treatmentId = $("#tid").val();
	/*var bedAllocated = $("#bedAllocated").val();
	var ht = $("#ht").val();
	var pattype = $("#pattype").val();
	var pageIncludeType = 'IPD';
	var callFor = $("#callFor").val();
	var type = $("#callfromipd").val();
	var drid = $("#drid").val();*/


	window.location.href = "IPD_DischargeAutoSummary2.jsp?"   + "treatmentId=" + treatmentId;
}

/*
function viewDischargeSummary2(patientId,trid) {
	ajaxResponse = $("#divPatId").html();
	//myArray = JSON.parse(ajaxResponse);
	 
	var patientId = $("#pid").val();
	var treatmentId = $("#tid").val();
	
	

	window.location.href = "IPD_DischargeAutoSummary2.jsp?" + "patientId="
			+ patientId + "&treatmentId=" + treatmentId ;
}*/



function viewDischargeNote() {
	ajaxResponse = $("#divPatId").html();
	//myArray = JSON.parse(ajaxResponse);
	/*
	 * ajaxResponse = $("#dischargeObj").html();
	 * 
	 * myArray = JSON.parse(ajaxResponse); for ( var i = 0; i <
	 * myArray.pl.length; i++) { if (myArray.pl[i].pi == patientId) { myObj =
	 * myArray.pl[i]; break; } }
	 */

	/*myObj = myArray;
	var rby = myObj.rb;
	var trid = myObj.trid;
	myObj = JSON.stringify(myObj);*/

	//var patientId = $("#pid").val();
	var treatmentId = $("#tid").val();
	/*var bedAllocated = $("#bedAllocated").val();
	var ht = $("#ht").val();
	var pattype = $("#pattype").val();
	var pageIncludeType = 'IPD';
	var callFor = $("#callFor").val();
	var type = $("#callfromipd").val();
	var drid = $("#drid").val();
*/

	window.location.href = "IPD_DischargeNote.jsp?"   + "treatmentId=" + treatmentId;
}

function viewDischargeNew(patientId, trid) {

	myArray = JSON.parse(ajaxResponse);
	myObj = "0";

	var rby = "";
	myObj = JSON.stringify(myObj);
	window.location.href = "IPD_Discharge.jsp?" + "myObj="
			+ encodeURIComponent(myObj) + "&patientId=" + patientId + "&trid="
			+ trid + "&referby=" + rby;
}

function viewCaseReg(patientId, trid) {

	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].trid == trid) {
			myObj = myArray.pl[i];
			break;
		}
	}
	var pname = "";
	if (myObj.tit == undefined) {
		pname = myObj.fn + " " + myObj.mn + " " + myObj.ln;
	} else {
		pname = myObj.tit + " " + myObj.fn + " " + myObj.mn + " " + myObj.ln;
	}
	myObj.trid = trid;
	myObj = JSON.stringify(myObj);

	window.location.href = "caseRegister.jsp?" + "myObj="
			+ encodeURIComponent(myObj) + "&patientId=" + patientId + "&trid="
			+ trid + "&pname=" + pname;

}

/** ************************ order Form start ************************** */

/** *********Create Division for order Form *************** */

function printOrderFprm() {
	var rowCountOrder = $("#RowCountOrder").val();

	var divPatId = $("#divPatId").html();

	divPatId = eval('(' + divPatId + ')');

	var WindowObject = window.open('', ' ', '');

	WindowObject.document
			.writeln('<div	style="text-align: center; padding-top: 10px; padding-bottom: 5px; width: 100%;"><b	style="font: "Times New Roman", Times, serif; font-size: 20px">ORDER FORM</b></div>');

	WindowObject.document
			.writeln('<div style="text-align: center; width: 100%;"><b	style="font: "Times New Roman", Times, serif; font-size: 15px">ENTER DATE, TIME AND SIGN ALL ENTRIES LEGIBLE</b></div>');

	WindowObject.document
			.writeln('<div style="text-align: center; padding-bottom: 12px; width: 100%;"><b style="font: "Times New Roman", Times, serif; font-size: 15px">ALL ORDERS MUST BE RENEWED IN 24 HOURS</b></div>');

	WindowObject.document
			.writeln('<div style="width: 100%; font-size: 15px"><table width="100%" border="1" cellpadding="0" cellspacing="0" style="font-size: 12px;"><tr style="height: 30px;"><td width="10%" align="center">DATE</td><td width="90%" align="left" style="padding-left: 10px;">'
					+ $("#date-pick").val()
					+ '<div style="float: right; width: 50%">Patient Name :&nbsp;&nbsp;'
					+ divPatId.fn
					+ " "
					+ divPatId.mn
					+ " "
					+ divPatId.ln
					+ '</div></td></tr></table>');

	WindowObject.document
			.writeln('<table width="100%" border="1" cellpadding="0" cellspacing="0"><tr style="height: 30px;"><td width="10%" align="center">#</td><td width="50%" align="center" style="padding-left: 10px;">DRUGES	& DOSES :</td><td width="5%" align="center">M</td><td width="5%" align="center">A</td><td width="5%" align="center">E</td><td width="5%" align="center">N</td><td width="20%" align="center">REMARKS</td><td width="5%" align="center">Days</td><td width="5%" align="center">Qty</td></tr>');

	for ( var l = 1; l <= rowCountOrder; l++) {

		WindowObject.document
				.writeln('<tr style="height: 25px;"><td  align="center">' + l
						+ '.</td><td>&nbsp;' + $("#txtdrug" + l).val()
						+ '</td>');
		if ($("#chkMorning" + l).attr('checked')) {
			WindowObject.document
					.writeln('<td>&nbsp;<img id="M1" src="images/Accept.png" width="15%" height="15%"></td>');
		} else {
			WindowObject.document
					.writeln('<td>&nbsp;<img id="M1" width="0%" height="0%" /></td>');
		}
		if ($("#chkAfterNoon" + l).attr('checked')) {
			WindowObject.document
					.writeln('<td>&nbsp;<img id="M1" src="images/Accept.png" width="15%" height="15%"></td>');
		} else {
			WindowObject.document
					.writeln('<td>&nbsp;<img id="M1" width="0%" height="0%" /></td>');
		}
		if ($("#chkEvening" + l).attr('checked')) {
			WindowObject.document
					.writeln('<td>&nbsp;<img id="M1" src="images/Accept.png" width="15%" height="15%"></td>');
		} else {
			WindowObject.document
					.writeln('<td>&nbsp;<img id="M1" width="0%" height="0%" /></td>');
		}
		if ($("#chkNight" + l).attr('checked')) {
			WindowObject.document
					.writeln('<td>&nbsp;<img id="M1" src="images/Accept.png" width="15%" height="15%"></td>');
		} else {
			WindowObject.document
					.writeln('<td>&nbsp;<img id="M1" width="0%" height="0%" /></td>');
		}

		WindowObject.document.writeln('<td>&nbsp;' + $("#txtremark" + l).val()
				+ '</td><td>&nbsp;' + $("#txtDays" + l).val()
				+ '</td><td>&nbsp;' + $("#txtQty" + l).val() + '</td></tr>');
	}

	WindowObject.document
			.writeln('<tr style="height: 25px;"><td>&nbsp;</td><td style="padding-left: 10px;" colspan="8">NOTE :</td></tr>');

	WindowObject.document
			.writeln('<tr style="height: 25px;"><td>&nbsp;</td><td colspan="8"><textarea rows="7" cols="8"	style="width: 90%;font-weight: bold;" id="txtIadv">'
					+ $("#statDose").val()
					+ '</textarea></td></tr></table></div>');

	WindowObject.document.close();

	WindowObject.focus();

	WindowObject.print();

	WindowObject.close();

}

var i = 1;

function toCreateDivOrder() {

	var hiddenRowCount = document.getElementById("RowCountOrder");
	var rowCount = hiddenRowCount.value;

	if (rowCount != 0) {
		var txtMedicine = $("#txtMedicine" + rowCount + "").val();
		var txtInstruction = $("#txtInstruction" + rowCount + "").val();
		var txtDays = $("#txtDays" + rowCount + "").val();
		var txtQty = $("#txtQty" + rowCount + "").val();

		if (txtMedicine == "" && txtQty == "") {
			alert("Please fill the previous added row.");
			return false;
		}
	}
	rowCount++;

	divId = "divo" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	document.getElementById("OrderDiv").appendChild(x);
	document.getElementById(divId).innerHTML = '<td style="height: 21.5px; width: 35px; text-align: center;">'
			+ (rowCount)
			+ '</td><td style="height: 21.5px; width: 230px;"><input type="text" class="form-control input-SmallText" onkeypress="fetchTxtDrug(this.id)" id="txtdrug'
			+ rowCount
			+ '" /></td><td style="height: 21.5px; width: 70px;" align="center"><input onclick="calQtyOfPrecription(1,'
			+ rowCount
			+ ')" type="checkbox"  id="chkMorning'
			+ rowCount
			+ '"></td><td style="height: 21.5px; width: 70px;" align="center"><input onclick="calQtyOfPrecription(1,'
			+ rowCount
			+ ')" type="checkbox" id="chkAfterNoon'
			+ rowCount
			+ '"></td><td style="height: 21.5px; width: 70px;" align="center"><input onclick="calQtyOfPrecription(1,'
			+ rowCount
			+ ')" type="checkbox" id="chkEvening'
			+ rowCount
			+ '"></td><td style="height: 21.5px; width: 70px;" align="center"><input onclick="calQtyOfPrecription(1,'
			+ rowCount
			+ ')" type="checkbox" id="chkNight'
			+ (rowCount)
			+ '"  ></td><td style="height: 21.5px; width: 230px;"><input type="text" class="form-control input-SmallText" id="txtremark'
			+ rowCount
			+ '" /></td><td style="height: 21.5px; width: 130px;"><input class="form-control input-SmallText" onkeyup="calQtyOfPrecription(1,'
			+ rowCount
			+ ')" onkeypress="return validateNumbers(event)" type="text" id="txtDays'
			+ rowCount
			+ '" /></td><td style="height: 21.5px; width: 130px;"><input class="form-control input-SmallText" onkeypress="return validateNumbers(event)" type="text" id="txtQty'
			+ rowCount
			+ '"></td><td><input type="checkbox" id="checkboxo'
			+ rowCount + '" /></td>';

	$("#RowCountOrder").val(rowCount);
	$("#addRowCountOrder").val(i);
	i++;

	// $(".auto").autocomplete("AutoSuggetionServlet?auto=medicine");

}
var ncount = 1;
function createItemDiv() {
	$("#needinf")
			.append(
					"<tr><td>"
							+ ncount
							+ "</td><td><input id='ntxt' class='form-control input-SmallText' type='text' name='textfield' style='margin-top: 4px; width: 90%;'></td><td><input id='chk' type='checkbox' rowcount='' name='chk1' style='margin-top: 12px;'></td></tr>");
	ncount++;
}

function fetchTxtDrug(ID) {

	$("#" + ID).autocomplete({
		source : function(request, response) {
			var auto = "medicine";
			// var data = "investigation";
			var findingName = $("#" + ID).val();
			var inputs = [];
			inputs.push('auto=' + auto);
			// inputs.push('data=' + data);
			inputs.push('q=' + findingName);
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					// alert(r);
					ajaxResponse = r;
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					response(availableTags);
				}
			});
		}
	});
}

/** **************Remove order Form Division********************** */
function calQtyOfPrecription(count, rowCount) {
	var temp = 0;
	if ($('#chkMorning' + rowCount).attr('checked')) {
		++temp;
	}
	if ($('#chkAfterNoon' + rowCount).attr('checked')) {
		++temp;
	}
	if ($('#chkEvening' + rowCount).attr('checked')) {
		++temp;
	}
	if ($('#chkNight' + rowCount).attr('checked')) {
		++temp;
	}
	var days = $("#txtDays" + rowCount).val();
	var qty = days * temp;
	$("#txtQty" + rowCount).val(qty);
	qty = 0;

}
function toRemoveDivOrder(RowCount) {

	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;

	var allVals = [];
	for ( var n = 1; n <= rowCount; n++) {

		var $radios = $('input:checkbox[id=checkboxo' + n + ']');
		if ($radios.is(':checked') == true) {
			allVals.push($radios.val());
			$("#divo" + n).remove();

		}
	}
}

function copyCurrentOrderForm(deleteForm) {
//	pobj = $("#divPatId").html();
	var treatmentId = $("#treatmentId").html();
	//pobj1 = eval('(' + pobj + ')');
	var date = $("#hiddenDate").val();
	var previousDate = $("#OFdate-pick").val();

	var inputs = [];
	inputs.push('action=copyCurrentOrderForm');
	inputs.push('tid=' + treatmentId);
	inputs.push('date=' + date);
	inputs.push('deleteForm=' + deleteForm);
	inputs.push('previousDate=' + previousDate);	

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "IPDTreatmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					if (r == 'delete') {
						var p = confirm("Order Form Already Present Do You Want To Override");
						if (p == true) {
							copyCurrentOrderForm(1);
						}
					} else if (r == "") {
						alert("Their Is No Data To Copy");
					} else {
						alert(r);
					}

					// window.location.reload();
				}
			});
}

var featchOrderFormByDateTemp = '{#foreach $T.ormali[0].ocodrli as ocodrli}'
		+ '<tr id="tdo{ocount}" >'
		+ '<td style="height: 21.5px; width: 35px; text-align: center;">{ocount}</td>'
		+ '<td style="height: 21.5px; width: 230px;">'
		+ '<input type="text" class="form-control input-SmallText auto" id="txtdrug{ocount}" value="{$T.ocodrli.drdo}" />'
		+ '</td>'
		+ '<td style="height: 21.5px; width: 70px;" align="center">'
		+ '<input type="checkbox" id="chkMorning{ocount}" />'
		+ '</td>'
		+ '<td style="height: 21.5px; width: 70px;" align="center">'
		+ '<input type="checkbox" id="chkAfterNoon{ocount}" />'
		+ '</td>'
		+ '<td style="height: 21.5px; width: 70px;" align="center">'
		+ '<input type="checkbox" id="chkEvening{ocount}" />'
		+ '</td>'
		+ '<td style="height: 21.5px; width: 70px;" align="center">'
		+ '<input type="checkbox" id="chkNight{ocount}" />'
		+ '</td>'
		+ '<td style="height: 21.5px; width: 230px;">'
		+ '<input value="{$T.ocodrli.rmrk}" class="form-control input-SmallText" type="text" id="txtremark{ocount}" />'
		+ '</td>'
		+ '<td style="height: 21.5px; width: 130px;">'
		+ '<input value="{$T.ocodrli.days}" class="form-control input-SmallText" type="text" id="txtDays{ocount}" />'
		+ '</td>'
		+ '<td style="height: 21.5px; width: 130px;">'
		+ '<input type="text" id="txtQty{ocount}" class="form-control input-SmallText" value="{$T.ocodrli.qty}" />'
		+ '</td>'
		+ '<td >'
		+ '<input type="checkbox" value="{$T.ocodrli.di}" name="" id="checkboxo{ocount}" />'
		+ '</td>'
		+ '</td>'
		+ '<input type="hidden" value="{$T.ocodrli.ocdID}" id="ocdID{ocount}" name="ocdID{ocount}" />'
		+ '<input type="hidden" value="{ocount++}" id="txtRowCount" name="txtRowCount" />'
		+ '</tr>' + '{#/for}'
		+ '<input type="hidden" value="{$T.ormali[0].omID}" id="omID" />'
		+ '<input type="hidden" value="{--ocount}" id="addRowCountOrder" />'
		+ '<input type="hidden" value="{ocount}" id="RowCountOrder" />';

var OFCount = 1;
var coverSheetOrderForm = "{#foreach $T.ormali as ormali}{#foreach $T.ormali.ocodrli as ocodrli}<tr><td class='col-md-1-1 TextFont'>{OFCount++}.</td>	"
		+ "<td class='col-md-10-1 TextFont'><i>{$T.ocodrli.prep}:</i> {$T.ocodrli.drdo}</td>"
		+ "<td class='col-md-1-1 TextFont'>Active</td>"
		/*
		 * + "<td class='col-md-3-1 center' style='padding-left: 15px;'>{$T.ocodrli.rmrk}</td> " + "<td class='col-md-2-1 center' style='padding-left: 15px;'>{$T.ocodrli.days}</td> "
		 */
		+ "</tr>{#/for}{#/for}";

function featchOrderFormByDate(type) {

	if (type == 'indent') {
		OFCount = 1;
		//var treatmentId = $("#treatmentId").val();
		var treatmentId =  $("#tid").val(); //added by paras
		
		var date_pick = $("#txtMRNDate").val();

		var inputs = [];
		inputs.push('action=featchOrderFormByDate');
		inputs.push('type=' + type);
		inputs.push('tid=' + treatmentId);
		inputs.push('date=' + date_pick);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "IPDTreatmentServlet",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
				//		alert('error');
					},
					success : function(r) {
						ajaxResponse = r;
						$("#objorder").html(ajaxResponse);
						var sampleBean = eval('(' + ajaxResponse + ')');
						var orderFormTemp = "";
						var instruction = "";
						$("#divOmID").html("");
						
						if (sampleBean.ormali.length > 0) {

							$("#divOmID").html(sampleBean.ormali[0].omID);

							for ( var int = 0; int < sampleBean.ormali[0].ocodrli.length; int++) {

								instruction = $(
										"#instruction option[value='"
												+ sampleBean.ormali[0].ocodrli[int].rmrk
												+ "']").text();

								orderFormTemp = orderFormTemp
										+ "<tr><td class='col-md-1-1 center'>"
										+ OFCount
										+ ".</td>"
										+ "<td class='col-md-2-1 center'>"
										+ sampleBean.ormali[0].ocodrli[int].drdo
										+ "<input id='productName"
										+ OFCount
										+ "' type='hidden' value='"
										+ sampleBean.ormali[0].ocodrli[int].drdo
										+ "'/>"
										+ "</td>"
										+ "<td class='col-md-2-1 center'>"
										+ sampleBean.ormali[0].ocodrli[int].prep

										+ "<input id='productId"
										+ OFCount
										+ "' type='hidden' value='"
										+ sampleBean.ormali[0].ocodrli[int].invProdID
										+ "'/>"

										+ "<input id='orderCompId"
										+ OFCount
										+ "' type='hidden' value='"
										+ sampleBean.ormali[0].ocodrli[int].ocdID
										+ "'/>"
										+ "</td>"

										/*
										 * + "<td class='col-md-2-1 center'>" +
										 * sampleBean.ormali[0].ocodrli[int].doseType + "</td>"
										 */
										/*
										 * + "<td class='col-md-3-1 center' style='padding-left: 15px;'>" +
										 * instruction // + //
										 * sampleBean.ormali[0].ocodrli[int].rmrk + "</td>"
										 */
										+ "<td class='col-md-2-1 center' style='padding-left: 15px;'>"
										+ sampleBean.ormali[0].ocodrli[int].days

										+ "<input id='productQty"
										+ OFCount
										+ "' type='hidden' value='"
										+ sampleBean.ormali[0].ocodrli[int].days
										+ "'/>"
										+ "<input id='daypr"
										+ OFCount
										+ "' type='hidden' value='"
										+ sampleBean.ormali[0].ocodrli[int].dayPrescription
										+ "'/>"
										+ "</td>";

								/*
								 * if
								 * (sampleBean.ormali[0].ocodrli[int].indentStatus ==
								 * 'process') { orderFormTemp = orderFormTemp + "<td class='col-md-2-1 center' style='padding-left: 15px;background-color:red'>" +
								 * sampleBean.ormali[0].ocodrli[int].indentStatus + "</td>"; }
								 * else { orderFormTemp = orderFormTemp + "<td class='col-md-2-1 center' style='padding-left: 15px;background-color:green'>" +
								 * sampleBean.ormali[0].ocodrli[int].indentStatus + "</td>"; }
								 */

								if (sampleBean.ormali[0].ocodrli[int].indentStatus == 'process') {
									orderFormTemp = orderFormTemp
											+ "<td class='col-md-1-1 center'>"
											+ "<input id='checkbox"
											+ OFCount
											+ "' type='checkbox' name='selectedGrp' value='"
											+ OFCount
											+ "' onclick='unCheckOF("
											+ (OFCount++)
											+ ","
											+ sampleBean.ormali[0].ocodrli[int].ocdID
											+ ")'"
											+ "style='margin-top: 2px;' /></td>";
								} else {
									orderFormTemp = orderFormTemp
											+ "<td class='col-md-1-1 center'>"
											+ "<input id='checkbox"
											+ OFCount
											+ "' type='checkbox' name='selectedGrp' value='"
											+ OFCount
											+ "' onclick='unCheckOF("
											+ (OFCount++)
											+ ","
											+ sampleBean.ormali[0].ocodrli[int].ocdID
											+ ")'"
											+ "style='margin-top: 2px;' /></td>";
								}
								orderFormTemp = orderFormTemp + "</tr>";
							}

						}
					
						$('#orderFormContent1').html(orderFormTemp);
						$("#OFSlaveID").val("0");

						// order form of cover sheet
						OFCount = 1;
						$("#coverSheetOrderForm").setTemplate(
								coverSheetOrderForm);
						$("#coverSheetOrderForm").processTemplate(sampleBean);

						var callFor = ($("#callFor").val()).trim();
						if (callFor === "previousTreatmentIPD") {
							$("#divCopyOrderForm").hide();

							setTimeout(function() {
								disableIpdDoctorStationJSP();
							}, 500);
						}
					}
				});
	} else if (type == 'previous' || type == 'previousAuto') {
		OFCount = 1;
		//var treatmentId = $("#treatmentId").val();
		var treatmentId =  $("#tr_Id").val(); //added by paras
		
		var date_pick = $("#OFdate-pick").val();
		var inputs = [];
		inputs.push('action=featchOrderFormByDate');
		inputs.push('tid=' + treatmentId);
		inputs.push('type=' + type);
		inputs.push('date=' + date_pick);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "IPDTreatmentServlet",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						var ajaxResponse = r;
						console.log(r);
					
						$("#previousorder").html(ajaxResponse);
						var sampleBean = eval('(' + ajaxResponse + ')');
						var medicineTempForDischargeSummary = "";
						var instruction = "";
						$("#divOmID").html("");

						if (sampleBean.ormali.length > 0) {

							$("#divOmID").html(sampleBean.ormali[0].omID);
							for ( var j = 0; j < sampleBean.ormali.length; j++) {

								for ( var int = 0; int < sampleBean.ormali[j].ocodrli.length; int++) {

									instruction = $(
											"#instruction option[value='"
													+ sampleBean.ormali[j].ocodrli[int].rmrk
													+ "']").text();
									
									prep = $(
											"#prep option[value='"
													+ (sampleBean.ormali[j].ocodrli[int].prep)
													+ "']").text();

									medicineTempForDischargeSummary = medicineTempForDischargeSummary
											+ ("<tr><td class='col-md-1-1 center'>"
													+ OFCount++
													+ ".</td>"
													+ "<td class='col-md-3-1 center'>"
													+ sampleBean.ormali[j].ocodrli[int].drdo
													+ "</td>"
													+ "<td class='col-md-2-1 center'>"
													+ sampleBean.ormali[j].ocodrli[int].prep
													+ "</td>"
													+ "<td class='col-md-3-1 center' style='padding-left: 15px;'>"
													+ instruction
													+ "</td>"
													+ "<td class='col-md-1-1 center' style='padding-left: 15px;'>"
													+ sampleBean.ormali[j].ocodrli[int].days
													+ "</td>"
													+ "<input id='ocdID"
													+ OFCount
													+ "' type='hidden' value='"
													+ sampleBean.ormali[j].ocodrli[int].ocdID
													+ " days' /><input id='omID"
													+ OFCount
													+ "' type='hidden' value='"
													+ sampleBean.ormali[j].ocodrli[int].omID
													+ "' />" + "</tr>");
								}
							}
						}
						// order form of cover sheet   //Change By Pooja @Date:20 Apr 2018
						OFCount = 1;
						$("#coverSheetOrderForm").setTemplate(                
								coverSheetOrderForm);
						$("#coverSheetOrderForm").processTemplate(sampleBean);
						
						// order form of discharge summary
						$('#dischargeSummaryTemplateForMedicine').html(
								medicineTempForDischargeSummary);
					}
				});
	} else {
		OFCount = 1;
		
		//var treatmentId = $("#treatmentId").val();
		var treatmentId =  $("#tr_Id").val(); //added by paras
		
		var date_pick = $("#OFdate-pick").val();
		if ($("#hiddenDate").val() == date_pick) {
			//$("#divCopyOrderForm").hide();
		} else {
			$("#divCopyOrderForm").show();
		}
		var type = "";
		var inputs = [];
		inputs.push('action=featchOrderFormByDate');
		inputs.push('tid=' + treatmentId);
		inputs.push('type=' + type);
		inputs.push('date=' + date_pick);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "IPDTreatmentServlet",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						var ajaxResponse = r;
						// alert(ajaxResponse);
						$("#objorder").html(ajaxResponse);
						var sampleBean = eval('(' + ajaxResponse + ')');
						var orderFormTemp = "";
						//var instruction = "";
						//var prep = "";
						$("#divOmID").html("");
						if (sampleBean.ormali.length > 0) {

							$("#divOmID").html(sampleBean.ormali[0].omID);

							for ( var int = 0; int < sampleBean.ormali[0].ocodrli.length; int++) {

								/*prep = $("#prep option[value='"+ (sampleBean.ormali[0].ocodrli[int].prep)+ "']").text();

								instruction = "";

								if ((sampleBean.ormali[0].ocodrli[int].rmrk) != 0) {
									instruction = $("#instruction option[value='"+ sampleBean.ormali[0].ocodrli[int].rmrk+ "']").text();
								}*/

								orderFormTemp = orderFormTemp
										+ "<tr><td class='col-md-1-1 center'>"
										+ OFCount
										+ ".</td>"
										+ "<td class='col-md-2-1 center'>"
										+ sampleBean.ormali[0].ocodrli[int].drdo
										+ "</td>"
										+ "<td class='col-md-2-1 center'>"
										+ sampleBean.ormali[0].ocodrli[int].prepName
										+ "</td>"
										/*
										 * + "<td class='col-md-2-1 center'>" +
										 * sampleBean.ormali[0].ocodrli[int].doseType + "</td>"
										 */
										+ "<td class='col-md-3-1 center' style='padding-left: 15px;'>"
										+ sampleBean.ormali[0].ocodrli[int].instruction
										// +
										// sampleBean.ormali[0].ocodrli[int].rmrk
										+ "</td>"
										+ "<td class='col-md-2-1 center' style='padding-left: 15px;'>"
										+ sampleBean.ormali[0].ocodrli[int].days
										+ "</td>"
										+ "<td class='col-md-1-1 center'>"
										+ "<input id='checkbox"
										+ OFCount
										+ "' type='checkbox' onclick='unCheckOF("
										+ (OFCount++)
										+ ","
										+ sampleBean.ormali[0].ocodrli[int].ocdID
										+ ")'"
										+ "style='margin-top: 2px;' /></td>"
										+ "</tr>";
							}
						}

						$('#orderFormContent').html(orderFormTemp);
						$("#OFSlaveID").val("0");

						// order form of cover sheet
						OFCount = 1;
						$("#coverSheetOrderForm").setTemplate(
								coverSheetOrderForm);
						$("#coverSheetOrderForm").processTemplate(sampleBean);
						

						var callFor = ($("#callFor").val());
						if (callFor === "previousTreatmentIPD") {
							$("#divCopyOrderForm").hide();

							setTimeout(function() {
								disableIpdDoctorStationJSP();
							}, 500);
						}
					}
				});
	}
}

function featchOrderByDate(treatID) {

	OFCount = 1;
	var treatmentId = treatID;
	var date_pick = $("#OFdatePick").val();
	if ($("#hiddenDate").val() == date_pick) {
		$("#divCopyOrderForm").hide();
	} else {
		$("#divCopyOrderForm").show();
	}

	var inputs = [];
	inputs.push('action=featchOrderFormByDate');
	inputs.push('tid=' + treatmentId);
	inputs.push('date=' + date_pick);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "IPDTreatmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					$("#objorder").html(ajaxResponse);
					var sampleBean = eval('(' + ajaxResponse + ')');
					var orderFormTemp = "";
					var instruction = "";
					$("#divOmID").html("");
					if (sampleBean.ormali.length > 0) {

						$("#divOmID").html(sampleBean.ormali[0].omID);

						for ( var int = 0; int < sampleBean.ormali[0].ocodrli.length; int++) {

							instruction = $(
									"#instruction option[value='"
											+ sampleBean.ormali[0].ocodrli[int].rmrk
											+ "']").text();

							orderFormTemp = orderFormTemp
									+ "<tr><td class='col-md-1-1 center'>"
									+ OFCount
									+ ".</td>"
									+ "<td class='col-md-2-1 center'>"
									+ sampleBean.ormali[0].ocodrli[int].drdo
									+ "</td>"
									+ "<td class='col-md-2-1 center'>"
									+ sampleBean.ormali[0].ocodrli[int].prep
									+ "</td>"
									/*
									 * + "<td class='col-md-2-1 center'>" +
									 * sampleBean.ormali[0].ocodrli[int].doseType + "</td>"
									 */
									+ "<td class='col-md-3-1 center' style='padding-left: 15px;'>"
									+ instruction
									// + sampleBean.ormali[0].ocodrli[int].rmrk
									+ "</td>"
									+ "<td class='col-md-2-1 center' style='padding-left: 15px;'>"
									+ sampleBean.ormali[0].ocodrli[int].days
									+ "</td>"
									+ "<td class='col-md-1-1 center'>"
									+ "<input id='checkbox" + OFCount
									+ "' type='checkbox' onclick='unCheckOF("
									+ (OFCount++) + ","
									+ sampleBean.ormali[0].ocodrli[int].ocdID
									+ ")'" + "style='margin-top: 2px;' /></td>"
									+ "</tr>";
						}

					}
					$('#orderFormContent').html(orderFormTemp);
					$("#OFSlaveID").val("0");

					// order form of cover sheet
					OFCount = 1;
					$("#coverSheetOrderForm").setTemplate(coverSheetOrderForm);
					$("#coverSheetOrderForm").processTemplate(sampleBean);

					/*
					 * var callFor = ($("#callFor").val()).trim(); if (callFor
					 * === "previousTreatmentIPD") {
					 * $("#divCopyOrderForm").hide();
					 * 
					 * setTimeout(function() { disableIpdDoctorStationJSP(); },
					 * 500); }
					 */
				}
			});
}

function saveOrderFormDetails(Page_Type) {

	var queryType = $("#OFqueryType").val();
//	var treatmentId = $.trim($('#treatmentId').val());
	
	var treatmentId =  $("#tr_Id").val();   //added by paras
	
	var date = $("#OFdate-pick").val();
	var prep = $.trim($("#prep :selected").val());
	var name = $.trim($("#name").val());
	var medicineID = $.trim($("#medicineID").val());
	var strength = $.trim($("#strength").val());
	var unit = $.trim($("#unit").val());
	var dose = $.trim($("#dose").val());
	var frequency = $.trim($("#frequency").val());
	var instruction = $.trim($("#instruction").val());
	var route = $.trim($("#route").val());
	var days = $.trim($("#days").val());
	var qty = $.trim($("#qty").val());
	var statDose = $("#statDose").val();
	
	var timeMorn = $.trim($("#timeMorn").val());
	var timeAfter = $.trim($("#timeAfter").val());
	var timeEven = $.trim($("#timeEven").val());
	var timeNight = $.trim($("#timeNight").val());
	if (timeMorn == "") 
	{
		timeMorn="00:00";
	}
	if (timeAfter == "") 
	{
		timeAfter="00:00";
	}
	if (timeEven == "") 
	{
		timeEven="00:00";
	}
	if (timeNight == "") 
	{
		timeNight="00:00";
	}
	
	
	var timePrescription = timeMorn+","+timeAfter+","+timeEven+","+timeNight;
	
	var morning="-";
	var afternoon="-";
	var evening="-";
	var night="-";
	
	if (prep == "") {
		alert("Please Select Prep...");
		SetFocus("prep");
		return false;
	}
	if ($("#medicineNotAvailableCheckbox").prop("checked")){
		// No need to show validation
		if(route=="" || route==null || route== undefined)
		{
			route="0";
		}
		}else{
			if (medicineID == "0" || medicineID == "undefined" || medicineID == "") {
				alert("Please enter proper medicine name");
				SetFocus("name");
				return false;
			}
			if (name == "") {
				alert("Please enter proper medicine name");
				$("#medicineID").val("0");
				SetFocus("name");
				return false;
			}
		}
	if (instruction == "0") {
		// alert("Please Select Instruction...");
		// SetFocus("instruction");
		// return false;
	}
	
	if (frequency == "0" || frequency == "undefined" || frequency == "") {
		alert("Please check at least one Time Slot for Frequency..!");
		SetFocus("mo");
		return false;
	}

	if (days == "") {
		alert("Please Enter days...");
		SetFocus("days");
		return false;
	}

	if (qty == "") {
		alert("Please Select Quantity...");
		SetFocus("qty");
		return false;
	}
	
	
	/*************
	 * @author	:  Touheed Khan
	 * @date	: 02-June-2016 
	 * @reason	: Setting timeslot
	 */
	
	var mor_flag="0";
	var aft_flag="0";
	var eve_flag="0";
	var night_flag="0";
	if(document.getElementById('mo').checked){
		morning = "Morning";
		mor_flag=$("#tmo").val();
		
	}
	if(document.getElementById('an').checked){
		afternoon = "Afternoon";
		aft_flag =$("#tan").val();
	}
	if(document.getElementById('ev').checked){
		evening = "Evening";
		eve_flag=$("#tev").val();
	}
	if(document.getElementById('nt').checked){
		night = "Night";
		night_flag=$("#tnt").val();
	}
	var dayPrescription = mor_flag+","+aft_flag+","+eve_flag+","+night_flag;
	
	
	var inputs = [];
	inputs.push('action=saveOrderFormDetails');
	inputs.push('queryType=' + queryType);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('date=' + date);
	inputs.push('prep=' + prep);
	inputs.push('medicineID=' + medicineID);
	inputs.push('name=' + encodeURIComponent(name));
	inputs.push('strength=' + strength);
	inputs.push('unit=' + unit);
	inputs.push('dose=' + dose);
	inputs.push('frequency=' + frequency);
	inputs.push('instruction=' + instruction);
	inputs.push('route=' + route);
	inputs.push('days=' + days);
	inputs.push('qty=' + qty);
	inputs.push('morning=' + morning);
	inputs.push('afternoon=' + afternoon);
	inputs.push('evening=' + evening);
	inputs.push('night=' + night);
	inputs.push('Page_Type=' + Page_Type);
	inputs.push('statDose=' + encodeURIComponent(statDose));
	inputs.push('dayPrescription=' + dayPrescription);
	inputs.push('timePrescription=' + timePrescription);

	if (queryType == 'update') {
		inputs.push('OFSlaveID=' + $.trim($('#OFSlaveID').val()));
	}

	var str = inputs.join('&');
	jQuery.ajax({
		//async : true,
		async : false,

		type : "POST",
		data : str + "&reqType=AJAX",
		url : "IPDTreatmentServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			$("#prep").val("0");
			$("#name").val('');
			$("#prep").attr("disabled", false);
			$("#name").attr("disabled", false);
			$("#strength").val('');
			$("#dose").val('');
			$("#unit").val('0');
			$("#frequency").val('');
			$("#instruction").val('0');
			$("#route").html('<option value="0">SELECT</option>');
			$("#route").val('0');
			$("#days").val('');
			$("#qty").val('');
			$("#medicineID").val('0');
			$('#OFSlaveID').val('0');
			$("#OFqueryType").val('insert');
			//Uchecking time slot
			$('#tmo').val('1');
			$('#tan').val('1');
			$('#tev').val('1');
			$('#tnt').val('1');
			$("#tmo").attr('readonly', 'readonly');
			$("#tan").attr('readonly', 'readonly');
			$("#tev").attr('readonly', 'readonly');
			$("#tnt").attr('readonly', 'readonly');
			uncheckingTimeSlot();
			if(Page_Type == 'TreatmentAtDischarge'){
				featchTreatmentAtDischarge();
			}else{
				featchOrderFormByDate();
			}
			// window.location.reload();
			return true;
		}
	});

	return;

	// $("#AddTest").show();

	/* OLD FUNCTION */

	var pobj = $("#divPatId").html();
	var pobj1 = eval('(' + pobj + ')');
	var date = $("#date-pick").val();
	var omID = $("#omID").val();
	var statDose = $("#statDose").val();
	var invAdv = $("#invAdv").val();
	var refAdvRem = $("#refAdvRem").val();
	var queryType = $("#queryType").val();

	if (date == null || date == "") {
		alert("Please Select Date To Save Order Form Details.");
		return false;
	}

	var objOrCo = 0;

	objOrCo = {
		orcodrli : []
	};
	var RowCountOrder = $("#RowCountOrder").val();

	var count = 0;
	if (RowCountOrder == 0) {
		alert("You can not save empty fields.");
		return false;
	}

	for ( var i = 1; i <= RowCountOrder; i++) {
		count++;
		var txtdrug = $("#txtdrug" + count + "").val();
		var txtremark = $("#txtremark" + count + "").val();
		var days = $("#txtDays" + count + "").val();
		var qty = $("#txtQty" + count + "").val();

		var morning;
		if ($("#chkMorning" + count).attr('checked')) {

			morning = "1";
		} else {
			morning = "0";
		}

		var afterNoon;
		if ($("#chkAfterNoon" + count).attr('checked')) {
			afterNoon = "1";
		} else {
			afterNoon = "0";
		}

		var evening;
		if ($("#chkEvening" + count).attr('checked')) {
			evening = "1";
		} else {
			evening = "0";
		}

		var night;
		if ($("#chkNight" + count).attr('checked')) {
			night = "1";
		} else {
			night = "0";
		}

		if (txtdrug == ""
				|| txtdrug == null
				|| (night == "0" && evening == "0" && afterNoon == "0" && morning == "0")
				|| days == "" || days == undefined || days == null
				&& txtremark == "") {
			alert("You can not save empty fields..");
			return false;
		} else if (txtdrug != undefined) {

			objOrCo.orcodrli.push({
				"drdo" : txtdrug,
				"mor" : morning,
				"aft" : afterNoon,
				"eve" : evening,
				"night" : night,
				"rmrk" : txtremark,
				"days" : days,
				"qty" : qty

			});
		}
	}

	if (objOrCo.orcodrli.length == 0) {
		alert("You can not save empty fields.");
		return false;
	}

	objOrCo = JSON.stringify(objOrCo);

	var inputs = [];
	inputs.push('action=saveOrderFormDetails');
	inputs.push('queryType=' + queryType);
	inputs.push('objOrCo=' + objOrCo);
	inputs.push('omID=' + omID);
	inputs.push('tid=' + pobj1.trid);
	inputs.push('date=' + date);
	inputs.push('statDose=' + encodeURIComponent(statDose));
	inputs.push('invAdv=' + encodeURIComponent(invAdv));
	inputs.push('refAdvRem=' + encodeURIComponent(refAdvRem));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "IPDTreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			// window.location.href = "IPD_DoctorStation.jsp";
			window.location.reload();
		}
	});
}

function unCheckOF(chkCount, OFSlaveID) {
	for ( var i = 1; i < OFCount; i++) {
		if (i == chkCount)
			continue;

		// var id1 = 'checkbox' + i;
		$('#checkbox' + i).prop('checked', false);
	}
	$("#OFSlaveID").val(OFSlaveID);
}

function editOrderForm() {
	//uchecking time slot
	uncheckingTimeSlot();
	var OFSlaveID = $('#OFSlaveID').val();

	if (OFSlaveID == "0" || OFSlaveID == "") {
		alert("Please check the checkbox...");
		return;
	}

	var selectRouteSelectBox = "<option value='0'>SELECT</option>";

	var ajaxResponse = $("#objorder").html();
	var sampleBean = eval('(' + ajaxResponse + ')');

	for ( var i = 0; i < sampleBean.ormali.length; i++) {
		for ( var j = 0; j < sampleBean.ormali[i].ocodrli.length; j++) {
			if (sampleBean.ormali[i].ocodrli[j].ocdID == OFSlaveID) {
				myObj1 = sampleBean.ormali[i].ocodrli[j];

				if ($.trim(myObj1.route) != "") {

					var routeDetailsResponse = $("#routeDetails").html();
					var routeDetailsResponseArray = JSON
							.parse(routeDetailsResponse.decodeSpecialChars());

					for ( var i = 0; i < routeDetailsResponseArray.rtlist.length; i++) {
						if (routeDetailsResponseArray.rtlist[i].prepId == myObj1.prep) {

							selectRouteSelectBox += ("<option value='"
									+ (routeDetailsResponseArray.rtlist[i].routeId)
									+ "'>"
									+ (routeDetailsResponseArray.rtlist[i].rtnm) + "</option>");
						}
					}
				}
				break;
			}
		}
	}

	$("#route").html(selectRouteSelectBox);

	$("#prep").val(myObj1.prep);
	$("#name").val(myObj1.drdo);
	$("#medicineID").val(myObj1.invProdID);
	$("#strength").val(myObj1.strength);
	$("#dose").val(myObj1.doseType);
	$("#frequency").val(myObj1.frequency);
	$("#instruction").val(myObj1.rmrk);
	$("#route").val(myObj1.route);
	$("#days").val(myObj1.days);
	$("#qty").val(myObj1.qty);
	$("#unit").val(myObj1.unit);
	$("#prep").attr("disabled", true);
	$("#name").attr("disabled", true);
	$("#OFqueryType").val('update');

	/***********
	 * @author	: Touheed Khan
	 * @date	: 03-June-2016
	 * @reason	: For time slot setting
	 */
	var mor = myObj1.mor;
	var aft = myObj1.aft;
	var eve = myObj1.eve;
	var night = myObj1.night;
	
	if(mor == "Morning"){
		$( "#mo").prop('checked', true);
	}
	if(aft == "Afternoon"){
		$( "#an").prop('checked', true);	
	}
	if(eve == "Evening"){
		$( "#ev").prop('checked', true);
	}	
	if(night == "Night"){
		$( "#nt").prop('checked', true);
	}
	/************End***********/
	var daypr=myObj1.dayPrescription;
	var dayprarr=daypr.split(",");
	$("#tmo").val(dayprarr[0]);
	$("#tan").val(dayprarr[1]);
	$("#tev").val(dayprarr[2]);
	$("#tnt").val(dayprarr[3]);
	$("#tmo").removeAttr("readonly");
	$("#tan").removeAttr("readonly");
	$("#tev").removeAttr("readonly");
	$("#tnt").removeAttr("readonly");
	
	var timepr=myObj1.timePrescription;
	var timeprrr=timepr.split(",");
	$("#timeMorn").val(timeprrr[0]);
	$("#timeAfter").val(timeprrr[1]);
	$("#timeEven").val(timeprrr[2]);
	$("#timeNight").val(timeprrr[3]);
	
	if(myObj1.invProdID=="0"){
		
		$( "#medicineNotAvailableCheckbox").prop('checked', true);
	}
	SetFocus("prep");
}

function deleteOrderForm() {

	var r = confirm("Please confirm to Delete Record?");
	if (r == true) {
		var OFSlaveID = $('#OFSlaveID').val();
		if (OFSlaveID == "0" || OFSlaveID == "") {
			alert("Please check the checkbox...");
			return;
		}
		var inputs = [];
		inputs.push('action=deleteOrderForm');
		inputs.push('OFSlaveID=' + OFSlaveID);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "IPDTreatmentServlet",
			timeout : 1000 * 60 * 6,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(res) {
				alert(res);
				$("#prep").val("");
				$("#name").val("");
				$("#medicineID").val("");
				$("#strength").val("");
				$("#dose").val("");
				$("#frequency").val("");
				$("#instruction").val("");
				$("#route").val("");
				$("#days").val("");
				$("#qty").val("");
				$("#unit").val("");
				$("#prep").val(0);
				$("#name").attr("disabled", false);
				setTimeout(function() {
				featchOrderFormByDate();
				}, 500);
				
				featchTreatmentAtDischarge();
				uncheckingTimeSlot();	
			}
		});
	}
}

var allOrderstemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 36%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 9.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 9.1%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.trid}</div><div style='width: 11.1%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.objom.date}</div><div style='width: 12.1%;border-right: 1px solid #069; height: 25px;  padding-top: 3px; text-align: center;'><input onclick='viewOrder({$T.pl.objom.omID},{$T.pl.trid})' style='font-size: 10px;' type='button' value='EDIT'  class='edit' /></div><div style='width: 12.1%; height: 25px;  padding-top: 3px; text-align: center;'><input onclick='deleteOrder({$T.pl.objom.omID},{$T.pl.trid})' style='font-size: 10px;' type='button' value='DELETE'  class='edit' /></div></div>{#/for}";

function deleteOrder(omID, trid) {
	var r = confirm("Are you confirm to delete order");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteOrder');
		inputs.push('omID=' + omID);
		inputs.push('trid=' + trid);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				window.location = "OrderForm.jsp";
			}
		});
	}
}

function viewOrders(patientId, trid) {

	var orderObj = $("#orderObj").html();

	var myArray = JSON.parse(orderObj);

	for ( var i = 0; i < myArray.pl.length; i++) {

		if (myArray.pl[i].pi == patientId) {

			myObj = myArray.pl[i];
			break;
		}
	}

	myObj = JSON.stringify(myObj);

	var myEscapedJSONString = (myObj.decodeSpecialChars());
	pobj1 = eval('(' + myEscapedJSONString + ')');

	var fn = pobj1.fn;
	var mn = pobj1.mn;
	var ln = pobj1.ln;
	var tit = pobj1.tit;

	window.location.href = "OrdersViewAll.jsp?" + "&fn=" + fn + "&mn=" + mn
			+ "&ln=" + ln + "&patientId=" + patientId + "&trid=" + trid
			+ "&tit=" + tit;

}

function viewOrder(omID, trid) {

	ajaxResponse = $("#myobj").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].objom.omID == omID) {
			myObj = myArray.pl[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);

	window.location.href = "OrderSpecView.jsp?" + "myObj="
			+ encodeURIComponent(myObj) + "&omID=" + omID + "&trid=" + trid;

}

function fetchPatAllOrders() {

	var trid = $("#trid").val();

	var inputs = [];
	inputs.push('action=fetchPatAllOrders');
	inputs.push('trid=' + trid);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			$("#myobj").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(allOrderstemp);
			$("#container").processTemplate(pobj1);
		}
	});

}
function saveOrderForm(qtyp) {

	var date = $("#date-pick").val();

	if (date == null || date == "") {

		alert('Please Select Date.');

	} else {

		var trid = $("#trid").val();
		var omID = $("#omID").val();

		var drugsDetailString = "";
		var signDetailString = "";
		var remarkDetailString = "";
		for ( var i = 1; i <= 15; i++) {
			var txtdrug = $("#txtdrug" + i).val();
			var txtsign = $("#txtsign" + i).val();
			var txtremark = $("#txtremark" + i).val();

			if (txtsign == "" || txtremark == "" || txtdrug == "") {
	
				if (txtdrug.length > 0 || txtsign.length > 0 || txtremark > 0) {
					alert("#No. : " + i + " Entry Must Be Filled Out");
					return false;
				}
			} else {
				drugsDetailString = drugsDetailString + "@" + txtdrug;
				signDetailString = signDetailString + "@" + txtsign;
				remarkDetailString = remarkDetailString + "@" + txtremark;
			}
		}

		var txtdoseDetailString = "";
		for ( var i = 1; i <= 5; i++) {
			var txtdose = $("#txtdose" + i).val();
			txtdoseDetailString = txtdoseDetailString + "@" + txtdose;
		}

		var txtIadv = $("#txtIadv").val();
		var txtRefAdv = $("#txtRefAdv").val();

		var inputs = [];
		inputs.push('action=saveOrderForm');
		inputs.push('trid=' + trid);

		inputs.push('drugsDetailString=' + drugsDetailString);
		inputs.push('signDetailString=' + signDetailString);
		inputs.push('remarkDetailString=' + remarkDetailString);
		inputs.push('txtdoseDetailString=' + txtdoseDetailString);
		inputs.push('date=' + date);

		inputs.push('txtIadv=' + encodeURIComponent(txtIadv));

		inputs.push('txtRefAdv=' + encodeURIComponent(txtRefAdv));
		inputs.push('qtyp=' + qtyp);
		inputs.push('omID=' + omID);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(r);
				window.location = "OrderForm.jsp";
			}
		});
	}
}
function fetchOrderDetails() {

	omID = $("#omID").val();

	trid = $("#trid").val();

	var inputs = [];
	inputs.push('action=fetchOrderDetails');
	inputs.push('omID=' + omID);
	inputs.push('trid=' + trid);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			for ( var i = 0; i < pobj1.ormali[0].ocodrli.length; i++) {
				var j = ++i;
				i--;
				$("#txtdrug" + j).val(pobj1.ormali[0].ocodrli[i].drdo);
				$("#txtsign" + j).val(pobj1.ormali[0].ocodrli[i].sign);
				$("#txtremark" + j).val(pobj1.ormali[0].ocodrli[i].rmrk);
			}

			for ( var i = 0; i < pobj1.ormali[0].ocostli.length; i++) {
				var j = ++i;
				i--;
				$("#txtdose" + j).val(pobj1.ormali[0].ocostli[i].stdo);
			}

			$("#date-pick").val(pobj1.ormali[0].date);
			$("#txtIadv").val(pobj1.ormali[0].invest);
			$("#txtRefAdv").val(pobj1.ormali[0].readrmrk);

		}
	});
}

/** ************************ order Form end ************************** */

function viewDoctorDesk(Patientid, opd_er) {

	var OPDPatientList = "";

	if (opd_er == "ER") {
		OPDPatientList = $("#ERPatientList").html();
	} else {
		OPDPatientList = $("#OPDPatientList").html();
	}

	var myArray = JSON.parse(OPDPatientList);
	var myObj = "";
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == Patientid) {
			myObj = myArray.pl[i];
			break;
		}
	}

	var pi = myObj.pi;
	if (myObj.opa == null) {

		// alert("");
		// window.location.href = "OPDDoctorsDesk2.jsp?pid=" + pi + "&id="
		// + myObj.otd.id + "&updateFlagOn=td&FunType=insert";
		parsedObj = JSON.stringify(myObj);

		setTimeout(function() {
			window.location.href = "OPDDoctorsDesk2.jsp?pid=" + pi
					+ "&id=0&updateFlagOn=direct&FunType=insert&myObj="
					+ encodeURIComponent(parsedObj);
		}, 300);

	} else if (myObj.opa != null) {

		parsedObj = JSON.stringify(myObj);
		setTimeout(function() {
			window.location.href = "OPDDoctorsDesk2.jsp?pid=" + pi + "&id="
					+ myObj.opa.paid + "&updateFlagOn=pa&FunType=insert&myObj="
					+ encodeURIComponent(parsedObj);
		}, 300);
	}

	/*
	 * window.location = "OPDDoctorsDesk1.jsp?" + "myObj=" +
	 * encodeURIComponent(myObj);
	 */

}
function setDocDeskPatient() {
	pobj = $("#div1").html();

	pobj1 = eval('(' + pobj + ')');
	$("#DoctorDesk").setTemplate($("#DoctorDesk").html());
	$("#DoctorDesk").processTemplate(pobj1);
	// pobj1 = JSON.parse(pobj1);
}
function viewDoctorTreatment(pi) {

	var inputs = [];
	inputs.push('action=DoctorDesk1');
	inputs.push('pid=' + pi);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);//patientDocTreatment
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#treatment").setTemplate(patientDocTreatment);
			$("#treatment").processTemplate(pobj1);
		}
	});
}
function passToAppo(btnAppo) {

	var btnAppoId = btnAppo.id;
	var divPi = "divPi";
	var bSplit = btnAppoId.split("btnAppo");
	var aSplit = bSplit.slice(1);
	var divId = divPi + aSplit;

	divPi = $("#" + divId).html();

	window.location = "OPD_Appointment.jsp?" + "divPi=" + divPi;
	setPatientView();
}

function passToView(btnView) {

	var myObj1 = null;
	ajaxResponse = $("#allPatInfo").html();

	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.pl.length; i++) {

		if (myArray.pl[i].pi == btnView) {

			myObj1 = myArray.pl[i];
			break;
		}
	}
	
	
	myObj = JSON.stringify(myObj1);
	window.location = "PatientEdit.jsp?" + "myObj=" + encodeURIComponent(myObj)
			+ "&showSaveBtn=No&CallFor=View";
}

var TempAuthorizationBar = '<form role="form" class="form-inline">	<div class="col-md-12-1" style="padding-top: 3px;">		<div class="list-group list-group-margin-bottom col-md-1-1"			style="border: hidden; margin-left: -9px; margin-top: 0px; margin-right: 0px; padding-left: 0px; margin-bottom: -9px;">			<li class="list-group-item zero-padding col-md-6-1"				style="margin-top: 0px;">{#if $T.img!= ""} <img				alt="Patient Image" class="img-responsive col-md-12-1" name="patImg"				id="patImg"				style="margin-right: 0px; margin-left: 5px; margin-top: 0px;"				src="{$T.img}"> {#/if}{#if $T.img== ""} <img				alt="Patient Image" class="img-responsive col-md-12-1"				style="margin-right: 0px; margin-left: 5px; margin-top: 0px;"				src="images/user1forbill.jpg"> {#/if}			</li>		</div>		<div style="padding-top: 15px" class="col-md-11-1">			<div class="col-md-1-1">				<div class="divide-10"></div>				<label class="col-md-6-1 TextFont" for="exampleInputEmail1">Bill					No</label> <label class="col-md-6-1 TextFont" id="invoiceNo"					for="exampleInputEmail1"></label> <input id="txtRecNo1"					value="{$T.liBM[0].id}" style="display: none">			</div>			<div class="col-md-2-1">				<div class="divide-10"></div>				<label class="col-md-4-1 TextFont" for="exampleInputEmail1">Patient					Id</label> <label id="patid" class="col-md-6-1 TextFont"					for="exampleInputEmail1">{$T.objTreat.pi}</label>			</div>			<div class="col-md-4-1">				<div class="divide-10"></div>				<label class="col-md-4-1 TextFont" for="exampleInputEmail1">Patient					Name</label> <label id="patname" class="col-md-8-1 TextFont"					for="exampleInputEmail1"> {$T.fn} {$T.ln}</label>			</div>			<div class="col-md-2-1">				<div class="divide-10"></div>				<label class="col-md-6-1 TextFont" for="exampleInputEmail1">IPD					No</label> <label id="ipdno" class="col-md-6-1 TextFont"					for="exampleInputEmail1">{$T.objTreat.trCount}</label>			</div>			<div class="col-md-1-1">				<div class="divide-10"></div>				<label class="col-md-4-1 TextFont" for="exampleInputEmail1">Age</label><label					id="" for="exampleInputEmail1" class="col-md-6-1 TextFont">{$T.ag}</label>			</div>			<div class="col-md-1-1">				<div class="divide-10"></div>				<label class="col-md-4-1 TextFont" for="exampleInputEmail1">Gender</label>				<label id="" for="exampleInputEmail1" class="col-md-6-1 TextFont" style="padding-left: 12px;">{$T.sx}</label>			</div>		</div>		<div style="padding-top: 14px; margin-bottom: -10px;"			class="col-md-11-1">			<div class="col-md-1-1">				<div class="divide-10"></div>				<label class="col-md-5-1 TextFont" for="exampleInputEmail1">DOA</label>				<label id="" for="exampleInputEmail1" class="col-md-6-1 TextFont"></label>			</div>			<div class="col-md-2-1">				<div class="divide-10"></div>				<label class="col-md-4-1 TextFont" for="exampleInputEmail1">DOD</label>				<label id="tEndDate" for="exampleInputEmail1"					class="col-md-6-1 TextFont"></label>			</div>			<div class="col-md-3-1">				<div class="divide-10"></div>				<label class="col-md-6-1 TextFont" for="exampleInputEmail1">Registered					Date</label> <label id="tStartDate" for="exampleInputEmail1"					class="col-md-6-1 TextFont">{$T.rgDt}</label>			</div>		</div>	</div></form>';
function setPdetail(myObj) {

	divPi = myObj;
	divPi1 = eval('(' + divPi.decodeSpecialChars() + ')');

	$("#sex").val(divPi1.sx);
	$("#fName").val(divPi1.fn);
	$("#mName").val(divPi1.mn);
	$("#lName").val(divPi1.ln);
	$("#dob").val(divPi1.db);
	$("#age").val(divPi1.ag);
	$("#ageType").val(divPi1.agtp);
	$("#blood").val(divPi1.bg);
	$("#identity").val(divPi1.identity);
	$("#IdentifctnNo").val(divPi1.identifnNo);
	$("#occuptn").val(divPi1.occupation);
	$("#weight").val(divPi1.wt);
	$("#mobNo").val(divPi1.mb);
	$("#emailId").val(divPi1.emailId);
	$("#religion").val(divPi1.religion);
	$("#lang").val(divPi1.language);
	$("#edu").val(divPi1.education);
	$("#annIncm").val(divPi1.annIncm);
	$("#radioGroup1").val(divPi1.st);
	$("#Nationlty").val(divPi1.nationality);
	$("#passptNo").val(divPi1.passportNo);
	$("#visa").val(divPi1.visa);
	$("#blood").val(divPi1.bg);

	if (divPi1.objTreat.rb == 0 && divPi1.sdisc == ""
			&& divPi1.objTreat.selRefBy != "News Paper") {
		$("#chkWalkin").attr('checked', true);
		hideSourceDiv();
	} else {
		$("#chkSource").attr('checked', true);
		$("#selReferredBy").val(divPi1.objTreat.selRefBy);

		if (divPi1.objTreat.selRefBy == "doctor") {
			setTimeout(function() {
				$("#doctorDiv").show();
				$("#refBy").val(divPi1.objTreat.rb);
			}, 500);
		} else {
			$("#referredByDiv").show();
			$("#txtReferredBy").val(divPi1.objTreat.txtRefBy);
		}
	}

	$("#conAdd1").val(divPi1.a1);
	$("#conAdd2").val(divPi1.a2);
	$("#conAdd3").val(divPi1.a3);

	$("#conAdd4").val(divPi1.a4);
	$("#conAdd5").val(divPi1.a5);
	$("#conAdd6").val(divPi1.a6);
	$("#conAdd7").val(divPi1.postalCode);
	$("#conAdd8").val(divPi1.homeNumber);
	$("#conAdd9").val(divPi1.on);
	$("#perAdd1").val(divPi1.perAdd1);
	$("#perAdd2").val(divPi1.perAdd2);
	$("#perAdd3").val(divPi1.perAdd3);
	$("#perAdd4").val(divPi1.perAdd4);
	$("#perAdd5").val(divPi1.perAdd5);
	$("#perAdd6").val(divPi1.perAdd6);
	$("#perAdd7").val(divPi1.perAdd7);
	$("#insuredTitle").val(divPi1.tit);
	var title = $("#insuredTitle").val();

	if (title == "Mr." || title == "Mast." || title == "B-B/O.") {

		$("#insuredSex").val("Male");
	} else {
		$("#insuredSex").val("Female");

	}

	if (divPi1.liSponser.length > 0) {
		$("#insuredFirstName").val(divPi1.liSponser[0].insuredFirstName);

		$("#insuredLastName").val(divPi1.liSponser[0].insuredLastName);
		$("#insuredAge").val(divPi1.liSponser[0].insuredAge);
		$("#insuredRelation").val(divPi1.liSponser[0].insuredRelation);
		$("#insuredMobile").val(divPi1.liSponser[0].insuredMobile);
		$("#insuredEmail").val(divPi1.liSponser[0].insuredEmail);
		$("#insuredAddress").val(divPi1.liSponser[0].insuredAddress);
		// $("#sponsoredType").val(divPi1.);
		// $("#companyName").val(divPi1.);
		$("#sponseredName").val(divPi1.liSponser[0].sponsredName);
		$("#companyId").val(divPi1.liSponser[0].companyId);
		$("#identification").val(divPi1.liSponser[0].identification);
		$("#identificationNo").val(divPi1.liSponser[0].identificationNo);
		$("#preauthNo").val(divPi1.liSponser[0].preauthNo);
		$("#preauthdate").val(divPi1.liSponser[0].preauthdate);

		$("#cashlessPolicyNo").val(divPi1.liSponser[0].cashlessPolicyNo);
		$("#insuranceValidFrom").val(divPi1.liSponser[0].insuranceValidFrom);
		$("#cnnNo").val(divPi1.liSponser[0].cnnNo);
		$("#insuranceValidTo").val(divPi1.liSponser[0].insuranceValidTo);

		var sponsredDetailsTemplateForList1 = '{#foreach $T.liSponser as liSponser}<tr>	<td class="input-SmallText filterable-cell col-md-1-1 margin-1">{sponsredCount}</td>	<td class="numeric input-SmallText filterable-cell col-md-2-1 margin-1">{$T.liSponser.sponsredName}</td>	<td class="numeric input-SmallText filterable-cell col-md-2-1 margin-1">{$T.liSponser.cashlessPolicyNo}</td>	<td class="numeric input-SmallText filterable-cell col-md-2-1 margin-1">{$T.liSponser.insuranceValidFrom}</td>	<td class="numeric input-SmallText filterable-cell col-md-2-1 margin-1">{$T.liSponser.insuranceValidTo}</td>	<td class="input-SmallText filterable-cell col-md-3-1 margin-1"><input		id="activeInsurance{$T.liSponser.sponseredNameId}" type="radio"		name="radio" data-target="#passwordPopUp" data-toggle="modal"		onclick="setSpecialDiscountId({$T.liSponser.sponseredNameId})" /></td></tr><input type="hidden" value="{sponsredCount++}" />{#/for}';

		$("#sponsredDetailsTablePre").setTemplate(
				sponsredDetailsTemplateForList1);
		$("#sponsredDetailsTablePre").processTemplate(divPi1);
		$("#activeInsurance" + divPi1.sdisc).attr('checked', true);
		//CKEDITOR.instances['textareaNotes'].setData((divPi1.objTreat.note));
		$("#textareaNotes").val(divPi1.objTreat.note);
	} else {
		//CKEDITOR.instances['textareaNotes'].setData((divPi1.objTreat.note));
		$("#textareaNotes").val(divPi1.objTreat.note);
	}
	$("#managePBar").setTemplate(TempAuthorizationBar);
	$("#managePBar").processTemplate(divPi1);

}

var patDocTempForView = "{#foreach $T.liDocs as lidoc}<div style='width: auto; height: 20px; margin-left: 20px;' id='divId{count}'><div style='width: auto;'>{count}.<a id='ancher{count}' href='{$T.lidoc.flpth}' target='_blank'>{$T.lidoc.flnm} </a></div></div>{#/for}<input  type='hidden' id='fileCount' value='{--count}' />";

function setViewButtonTemp() {

	divPi = $("#div1").html();

	divPi1 = eval('(' + divPi + ')');

	$("#patientEdit").setTemplate(patientViewTemplate);
	$("#patientEdit").processTemplate(divPi1);
	divPi1 = JSON.parse(divPi);
	getRefDoctors();
	setSpecialDiscountForReg();
	$("#radioGroup1").val(divPi1.st);
	$("#blood").val(divPi1.bg);
	$("#sex").val(divPi1.sx);
	$("#patImg").attr('src', divPi1.img);
	$("#patImg").attr('value', divPi1.img);
	$("#ageType").val(divPi1.agtp);
	$("#title").val(divPi1.tit);

	loadDoctors("reg");
	// for(var p=0;p<opd.length;p++){
	var opd = (divPi1.objTreat.opd).split(",");
	$("#opd").val(opd);
	setTimeout(function() {
		$('#selechoDoc').val(divPi1.objTreat.echo);
		$('#seltmtDoc').val(divPi1.objTreat.tmt);
		$("#refBy").val(divPi1.rb);
		$("#SpecialDiscount").val(divPi1.sdisc);
	}, 500);

	$("#divPatFilesDisp").setTemplate(patDocTempForView);
	$("#divPatFilesDisp").processTemplate(divPi1);

}


function passToEdit(pid) {
	ajaxResponse = $("#allPatInfo").html();
	//alert(ajaxResponse);
	myArray = JSON.parse(ajaxResponse);
	var myObj1 = null;
	for ( var i = 0; i < myArray.pl.length; i++) {

		if (myArray.pl[i].pi == pid) {
			myObj1 = myArray.pl[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj1);

	window.location = "PatientEdit.jsp?" + "myObj=" + encodeURIComponent(myObj)
			+ "&showSaveBtn=yes&CallFor=Edit";

}

var patDocTemp = "{#foreach $T.liDocs as lidoc}<div style='width: auto; height: 20px; margin-left: 20px;' id='divId{count}'><div style='width: auto;'>{count}.<a id='ancher{count}' href='{$T.lidoc.flpth}' target='_blank'>{$T.lidoc.flnm} </a></div><input type='checkbox' value='{$T.lidoc.docid}' id='chk{count++}' onclick='setRemoveBtnTemp()' ></div>{#/for}<input  type='hidden' id='fileCount' value='{--count}' />";

var sponsredCount = 1;

var sponsredDetailsTemplateForList = '{#foreach $T.liSponser as liSponser}<tr><td class="input-SmallText filterable-cell col-md-1-1 margin-1">{sponsredCount}</td><td class="numeric input-SmallText filterable-cell col-md-2-1 margin-1">{$T.liSponser.sponsredName}</td><td class="numeric input-SmallText filterable-cell col-md-2-1 margin-1">{$T.liSponser.cashlessPolicyNo}</td><td class="numeric input-SmallText filterable-cell col-md-2-1 margin-1">{$T.liSponser.insuranceValidFrom}</td><td class="numeric input-SmallText filterable-cell col-md-2-1 margin-1">{$T.liSponser.insuranceValidTo}</td><td class="input-SmallText filterable-cell col-md-3-1 margin-1"><input id="activeInsurance{$T.liSponser.sponseredNameId}" type="radio" name="radio" data-target="#passwordPopUp" data-toggle="modal" onclick="setSpecialDiscountId({$T.liSponser.sponseredNameId})" class="editUserAccess" disabled="disabled"/></td></tr><input type="hidden"  value="{sponsredCount++}"/>{#/for}';

function makeAllFieldsReadOnly() {
	$("#title").attr('disabled', true);
	$("#fName").attr('readonly', true);
	$("#mName").attr('readonly', true);
	$("#lName").attr('readonly', true);

	$("#sex").attr('disabled', true);
	$("#weight").attr('readonly', true);
	$("#radioGroup1").attr('disabled', true);

	$("#dob").attr('disabled', true);
	$("#age").attr('readonly', true);
	$("#ageType").attr('disabled', true);
	$("#mobNo").attr('readonly', true);
	$("#emailId").attr('readonly', true);
	$("#Nationlty").attr('disabled', true);
	$("#passptNo").attr('readonly', true);
	$("#visa").attr('readonly', true);

	$("#weight").attr('readonly', true);
	$("#height").attr('readonly', true);
	$("#year").attr('readonly', true);
	$("#month").attr('readonly', true);
	$("#days").attr('readonly', true);
	$("#HeadCIM").attr('readonly', true);

	$("#mobNo").attr('readonly', true);
	$("#emailId").attr('readonly', true);
	$("#Nationlty").attr('disabled', true);
	$("#passptNo").attr('readonly', true);
	$("#visa").attr('readonly', true);

	$("#blood").attr('disabled', true);
	$("#identity").attr('readonly', true);
	$("#religion").attr('readonly', true);
	$("#lang").attr('disabled', true);

	$("#IdentifctnNo").attr('readonly', true);
	$("#occuptn").attr('readonly', true);
	$("#edu").attr('readonly', true);
	$("#annIncm").attr('disabled', true);
	$("#chkWalkin").attr('disabled', true);
	$("#chkSource").attr('disabled', true);
	$("#selReferredBy").attr('disabled', true);
	$("#txtReferredBy").attr('readonly', true);
	$("#refBy").attr('disabled', true);

	$("#conAdd1").attr('readonly', true);
	$("#conAdd2").attr('readonly', true);
	$("#conAdd3").attr('disabled', true);
	$("#conAdd10").attr('disabled', true);
	$("#conAdd4").attr('disabled', true);
	$("#conAdd5").attr('disabled', true);
	$("#conAdd6").attr('disabled', true);
	$("#conAdd7").attr('readonly', true);
	$("#conAdd8").attr('readonly', true);
	$("#conAdd9").attr('readonly', true);

	$("#perAdd1").attr('readonly', true);
	$("#perAdd2").attr('readonly', true);
	$("#perAdd3").attr('disabled', true);
	$("#perAdd8").attr('disabled', true);
	$("#perAdd4").attr('disabled', true);
	$("#perAdd5").attr('disabled', true);
	$("#perAdd6").attr('disabled', true);
	$("#perAdd7").attr('readonly', true);

	$("#selfCheckbox").attr('disabled', true);

	$("#sponsoredType").attr('disabled', true);
	$("#sponseredName").attr('disabled', true);
	$("#companyId").attr('readonly', true);
	$("#identification").attr('readonly', true);
	$("#identificationNo").attr('readonly', true);
	$("#cnnNo").attr('readonly', true);
	$("#preauthNo").attr('readonly', true);
	$("#preauthdate").attr('disabled', true);
	$("#cashlessPolicyNo").attr('readonly', true);
	$("#btnSaveSponser").attr('disabled', true);
	$("#insuranceValidFrom").attr('disabled', true);
	$("#insuranceValidTo").attr('disabled', true);

	$("#textareaNotes").attr('disabled', true);
	setTimeout(function() {
		var refered_to = $("#refTo").val();
		if (refered_to == 'opd') {
			$("#doctorName").attr('disabled', true);
			$("#doctorSpecilization").attr('disabled', true);
			$("#doctorDepartments").attr('disabled', true);
			$("#opdVisitDate").attr('disabled', true);
			$("#opdVisitNo").attr('readonly', true);
			$("#opdVisitType").attr('readonly', true);
			$("#opdEpisodeDesciption").attr('disabled', true);
			$("#billCategory").attr('disabled', true);
			$("#vipCheckbox").attr('disabled', true);
			$("#SelectReasonVisitDetails").attr('disabled', true);

		} else if (refered_to == 'ipd') {
			$("#bedridden").attr('disabled', true);
			$("#seropositive").attr('disabled', true);
			$("#relativeTitle").attr('disabled', true);
			$("#relativeFirstName").attr('readonly', true);
			$("#relativeLastName").attr('readonly', true);
			$("#relativeSex").attr('disabled', true);
			$("#relativeMobile").attr('readonly', true);
			$("#relativeEmail").attr('readonly', true);
			$("#relativeAge").attr('readonly', true);
			$("#relativeRelation").attr('disabled', true);
			$("#relativeAddress").attr('readonly', true);
			$("#ipdDoctorName").attr('disabled', true);
			$("#ipdDoctorSpecilization").attr('disabled', true);
			$("#ipdDoctorDepartments").attr('disabled', true);
			$("#ipdDoctors").attr('disabled', true);
			$("#billCategory").attr('disabled', true);
			$("#txtIpdEpisodeNo").attr('readonly', true);
			$("#txtIpdVisitNo").attr('readonly', true);
			$("#ipdAdmissionDate").attr('disabled', true);
			$("#ipdEpisodeDescription").attr('disabled', true);
			$("#SelectReasonVisitDetails").attr('disabled', true);

		} else if (refered_to == 'er') {
			$("#erInformerTitle").attr('disabled', true);
			$("#erInformerFirstName").attr('readonly', true);
			$("#erInformerLastName").attr('readonly', true);
			$("#erInformerSex").attr('disabled', true);
			$("#erInformerMobile").attr('readonly', true);
			$("#erInformerEmail").attr('readonly', true);
			$("#erInformerAge").attr('readonly', true);
			$("#erInformerRelation").attr('disabled', true);
			$("#erInformerAddress").attr('readonly', true);
			$("#billCategory").attr('disabled', true);
			$("#erDescTextarea").attr('disabled', true);
			$("#erCMOConsultant").attr('disabled', true);
			$("#erdoctorSpecilization").attr('disabled', true);
			$("#erdoctorDepartments").attr('disabled', true);
			$("#SelectReasonVisitDetails").attr('disabled', true);
		} else if (refered_to == 'diagnosis') {
			$("#diagnosisDoctor").attr('disabled', true);
			$("#diagnosisHospital").attr('disabled', true);
			$("#billCategory").attr('disabled', true);
		}
	}, 2500);

	$("#mlc_no").attr('readonly', true);
	$("#firNo").attr('readonly', true);
	$("#authorityname").attr('readonly', true);
	$("#buccleNo").attr('readonly', true);
	$("#plStname").attr('readonly', true);
	$("#plAdress").attr('readonly', true);
	$("#mlcDate").attr('disabled', true);
	$("#mlcInformerTitle").attr('disabled', true);
	$("#mlcInformerFirstName").attr('readonly', true);
	$("#mlcInformerLastName").attr('readonly', true);
	$("#mlcInformerSex").attr('disabled', true);
	$("#mlcInformerAge").attr('readonly', true);
	$("#mlcInformerMobile").attr('readonly', true);
	$("#mlcInformerEmail").attr('readonly', true);
	$("#mlcInformerAddress").attr('readonly', true);
	$("#mlcInformerRelation").attr('disabled', true);
	$("#mlcCmoDoctor").attr('disabled', true);
	$("#incidentDetails").attr('disabled', true);

	
}

function setPatientView(bill, myObj) {
	
	loadDoctors("reg");
	// to empty multiple select dropdown
	//$('#ipdDoctors option:selected').remove();
	//$('select[multiple]').empty();
	
	$('#ipdDoctors').empty();
	
	if (bill == "billing") {
		divPi = myObj;
	} else {
		divPi = $("#div1").html();
		//alert("divPi..."+divPi);
	}

	divPi1 = eval('(' + divPi.decodeSpecialChars() + ')');
	$("#patientEdit").setTemplate($("#patientEdit").html());
	$("#patientEdit").processTemplate(divPi1);
	divPi1 = JSON.parse(divPi);
	getRefDoctors();
	setSpecialDiscountForReg();

	$("#patID").val(divPi1.pi);
	$("#regDate").html(divPi1.rgDt);
	$("#mrNo").html(divPi1.mrNo);
	$("#popup_container3").val(divPi1.rgDt);

	var first_update = divPi1.firstupdate;
	if (first_update != undefined) {
		var user_data = first_update.split("-");
		$("#firstUpdated").html(user_data[0]);
	} else {
		$("#firstUpdated").html("");
	}
	var last_update = divPi1.lastupdate;
	if (last_update != undefined) {
		var user_data = last_update.split("-");
		$("#lastUpdated").html(user_data[0]);
		$("#lastUpdateDate").html(user_data[1]);
	} else {
		$("#lastUpdated").html("");
		$("#lastUpdateDate").html("");
	}
	$("#radioGroup1").val(divPi1.st);
	$("#sex").val(divPi1.sx);
	$("#relSex").val(divPi1.objTreat.relsex);
	// new fields added
	$("#weight").val(divPi1.objTreat.wt);
	$("#height").val(divPi1.height);
	$("#year").val(divPi1.ag);
	$("#month").val(divPi1.month);
	$("#days").val(divPi1.days);
	$("#dob").val(divPi1.db);
	
	if (divPi1.perAddFlag == 1) {
		$("#chkAddress").prop('checked', true);
		$("#divPermanent").hide();
	}
	$("#trid").val(divPi1.objTreat.ti);
	if (divPi1.hs == "H")
		$("#hospTypeH").prop('checked', true);
	else
		$("#hospTypeD").prop('checked', true);

	$("#blood").val(divPi1.bg);
	if (divPi1.nationality == null || divPi1.nationality == "") {
		$("#Nationlty").val("");
	} else {
		$("#Nationlty").val(divPi1.nationality);
	}
	if (divPi1.nationality == "Other") {
		$("#passportDiv").show();
		$("#visaDiv").show();
		$("#passptNo").val(divPi1.passportNo);
		$("#visa").val(divPi1.visa);
	}

	if (divPi1.annIncm == null || divPi1.annIncm == "") {
		$("#annIncm").val('Select');
	} else {
		$("#annIncm").val(divPi1.annIncm);
	}
	if (divPi1.language == null || divPi1.language == "") {
		$("#lang").val('Select');
	} else {
		$("#lang").val(divPi1.language);
	}
	if (divPi1.objTreat.selRefBy == "select" || divPi1.objTreat.txtRefBy == "") {
		$("#chkWalkin").prop('checked', true);
		hideSourceDiv();
	} else {
		$("#chkSource").prop('checked', true);
		$("#selReferredBy").val(divPi1.objTreat.selRefBy);

		if (divPi1.objTreat.selRefBy == "select") {
			$("#doctorDiv").hide();
			$("#referredByDiv").hide();
		} else if (divPi1.objTreat.selRefBy == "doctor") {
			setTimeout(function() {
				$("#doctorDiv").show();
				$("#refBy").val(divPi1.objTreat.rb);
			}, 500);
		} else if (divPi1.objTreat.selRefBy == "inHousedoctor") {
			getInHouseDoctors();
			setTimeout(function() {
				$("#referredByDiv").hide();
				$("#doctorDiv").show();
				$("#refBy").val(divPi1.objTreat.rb);
			}, 1000);
		} else {
			$("#referredByDiv").show();
			$("#txtReferredBy").val(divPi1.objTreat.txtRefBy);
		}
	}
	
	setTimeout(function() {

		$("#conAdd3").val(divPi1.a3);
		$("#conAdd10").val(divPi1.a10);
		$("#conAdd4").val(divPi1.a4);
		$("#conAdd5").val(divPi1.a5);
		$("#conAdd6").val(divPi1.a6);
	}, 500);

	setTimeout(function() {
		$("#perAdd3").val(divPi1.perAdd3);
		$("#perAdd8").val(divPi1.perAdd8);
		$("#perAdd4").val(divPi1.perAdd4);
		$("#perAdd5").val(divPi1.perAdd5);
		$("#perAdd6").val(divPi1.perAdd6);
	}, 500);
	
	var refered_to = divPi1.objTreat.rt;
	var er_flag = divPi1.objTreat.erFlag;
	
	
	var billCatID = divPi1.objTreat.ipdBillCat;
	fetchSponsorCategoryMaster('PatientEdit',refered_to);
	//SetSponsorCategoryID(billCatID);
	setTimeout(function() {

		if (refered_to == 'opd' && er_flag == 'Y') {
			$("#refTo").val('er');
		} else {
			$("#refTo").val(refered_to);
		}

		var str = $('#refTo :selected').text();
		if (str == 'IPD') {
			$("#reasonVisitDetails").show();
			$("#BillCategory").show();
			$("#bedRidden").show();
			$("#seroPositive").show();
			$("#IPDUI").show();
			$("#OPDUI").hide();
			$("#ERUI").hide();
			$("#DiagnosisUI").hide();
		} else if (str == 'OPD') {
			$("#reasonVisitDetails").show();
			$("#BillCategory").show();
			$("#bedRidden").hide();
			$("#seroPositive").hide();
			$("#IPDUI").hide();
			$("#OPDUI").show();
			$("#ERUI").hide();
			$("#DiagnosisUI").hide();
		} else if (str == 'ER') {
			$("#reasonVisitDetails").show();
			$("#BillCategory").show();
			$("#bedRidden").hide();
			$("#seroPositive").hide();
			$("#IPDUI").hide();
			$("#OPDUI").hide();
			$("#ERUI").show();
			$("#DiagnosisUI").hide();
		} else if (str == 'Diagnostics') {
			$("#reasonVisitDetails").show();
			$("#BillCategory").show();
			$("#DiagnosisUI").show();
			$("#bedRidden").hide();
			$("#seroPositive").hide();
			$("#IPDUI").hide();
			$("#OPDUI").hide();
			$("#ERUI").hide();
		}
		$("#SpecialDiscount").val(divPi1.sdisc);
		$("#selectIpdDoc").val(divPi1.admit);
		$("#selCompany").val(divPi1.objTreat.cmpny);
		$("#selReferredBy").val(divPi1.objTreat.selRefBy);

	}, 2000);

	if (refered_to == 'opd' && er_flag == 'N') {
		
		setTimeout(function() {
			$("#SelectReasonVisitDetails").val(divPi1.objTreat.reasonOfVisit_id);
			$("#doctorName").val(divPi1.PatientOPDList[0].doctor_id);
			$("#doctorSpecilization").val(
					divPi1.PatientOPDList[0].doctor_spl_id);
			$("#doctorDepartments")
					.val(divPi1.PatientOPDList[0].doctor_dept_id);
		}, 2500);
		$("#opdVisitDate").val(divPi1.PatientOPDList[0].app_date);
		$("#opdVisitNo").val(divPi1.EpisdeVisitList[0].visitNo);
		$("#opdVisitType").val(divPi1.EpisdeVisitList[0].visitType);
		$("#opdEpisodeDesciption").val(
				divPi1.EpisdeVisitList[0].episodeDescription);

		/*if (divPi1.objTreat.ipdBillCat == 'Self') {
			$("#opdBillCategory").val("Self");
		} else {
			$("#opdBillCategory").val("Sponsor");
			$("#opdMsgdiv").show();
		}*/
		if (divPi1.PatientType == 'VIP') {
			$("#vipCheckbox").prop('checked', true);
		}

	} else if (refered_to == 'ipd' && er_flag == 'N') {
		
		
		setTimeout(function(){
			$("#relativeTitle").val(divPi1.PatientIPDList[0].patientRelativeTitle);
		},250);
		
	
		$("#relativeFirstName").val(
				divPi1.PatientIPDList[0].patientRelativeFirstName);
		$("#relativeLastName").val(
				divPi1.PatientIPDList[0].patientRelativeLastName);
		$("#relativeSex").val(divPi1.PatientIPDList[0].patientRelativeSex);
		$("#relativeMobile")
				.val(divPi1.PatientIPDList[0].patientRelativeMobile);
		$("#relativeEmail").val(divPi1.PatientIPDList[0].patientRelativeEmail);
		$("#relativeAge").val(divPi1.PatientIPDList[0].patientRelativeAge);
		if (divPi1.PatientIPDList[0].patientRelativeRelation == null
				|| divPi1.PatientIPDList[0].patientRelativeRelation == "") {
			$("#relativeRelation").val("select");
		} else {
			$("#relativeRelation").val(
					divPi1.PatientIPDList[0].patientRelativeRelation);
		}
		$("#relativeAddress").val(
				divPi1.PatientIPDList[0].patientRelativeAddress);

		setTimeout(function() {
			$("#SelectReasonVisitDetails").val(divPi1.objTreat.reasonOfVisit_id);
			$("#ipdDoctorName").val(divPi1.PatientIPDList[0].ipdDoctor_id);
			$("#ipdDoctorSpecilization").val(
					divPi1.PatientIPDList[0].ipdDoctor_spl_id);
			$("#ipdDoctorDepartments").val(
					divPi1.PatientIPDList[0].ipdDoctor_dept_id);
		}, 2500);

		
		for ( var i = 0; i < divPi1.IPDDoctorList.length; i++) {
			var o = new Option("option text", "value");
			// / jquerify the DOM object 'o' so we can use the html method
			$(o).html(divPi1.IPDDoctorList[i].docName + '\n');
			$(o).val(divPi1.IPDDoctorList[i].ipdDocId + '\n');
			$("#ipdDoctors").append(o);
		}

		/*if (divPi1.objTreat.ipdBillCat == 'Self') {
			$("#ipdbillCategory").val("Self");
		} else {
			$("#ipdbillCategory").val("Sponsor");
		}*/
		
		$("#txtIpdEpisodeNo").val(divPi1.EpisdeVisitList[0].episodeNo);
		$("#txtIpdVisitNo").val(divPi1.EpisdeVisitList[0].visitNo);
		$("#ipdAdmissionDate").val(divPi1.objTreat.ipdAdDt);
		$("#ipdEpisodeDescription").val(
				divPi1.EpisdeVisitList[0].episodeDescription);

	} else if (refered_to == 'opd' && er_flag == 'Y') {
		
		setTimeout(function(){
			$("#erInformerTitle").val(divPi1.PatientERList[0].informerTitle);	
		},250);
		
		$("#erInformerFirstName").val(divPi1.PatientERList[0].informerFName);
		$("#erInformerLastName").val(divPi1.PatientERList[0].informerLName);
		$("#erInformerSex").val(divPi1.PatientERList[0].informerSex);
		$("#erInformerMobile").val(divPi1.PatientERList[0].informerMbNo);
		$("#erInformerEmail").val(divPi1.PatientERList[0].informerEmailId);
		$("#erInformerAge").val(divPi1.PatientERList[0].informerAge);
		if (divPi1.PatientERList[0].informerRelation == null
				|| divPi1.PatientERList[0].informerRelation == "") {
			$("#erInformerRelation").val("select");
		} else {
			$("#erInformerRelation").val(
					divPi1.PatientERList[0].informerRelation);
		}
		$("#erInformerAddress").val(divPi1.PatientERList[0].informerAddress);
		/*if (divPi1.PatientERList[0].informerBillCtgy == 1) {
			$("#erBillCategory").val("Self");
		} else {
			$("#erBillCategory").val("Sponsor");
		}*/
		$("#erDescTextarea").val(divPi1.PatientERList[0].informerDescription);
		setTimeout(function() {
			$("#SelectReasonVisitDetails").val(divPi1.objTreat.reasonOfVisit_id);
			$("#erCMOConsultant").val(
					divPi1.PatientERList[0].informerCMOconsultant);
			$("#erdoctorSpecilization").val(
					divPi1.PatientERList[0].informerDoctor_spl_id);
			$("#erdoctorDepartments").val(
					divPi1.PatientERList[0].informerDoctor_dept_id);
		}, 2500);
	} else if (refered_to == 'diagnosis' && er_flag == 'N') {
		
		
		setTimeout(function() {
			$("#SelectReasonVisitDetails").val(divPi1.objTreat.reasonOfVisit_id);
			if (divPi1.objTreat.docter_id == 0) {
				$("#diagnosisDoctor").val("0");
			} else {
				$("#diagnosisDoctor").val(divPi1.objTreat.docter_id);
			}
			if (divPi1.objTreat.hospital_id == 0) {
				$("#diagnosisHospital").val("0");
			} else {
				$("#diagnosisHospital").val(divPi1.objTreat.hospital_id);
			}
		}, 2000);
	}
	
	if (divPi1.objTreat.bedridden == "Y") {
		$("#bedridden").prop('checked', true);
	}
	if (divPi1.objTreat.sero == "Y") {
		$("#seropositive").prop('checked', true);
	}

	if (divPi1.PatientType == "VIP") {
		$("#chkvip").prop('checked', true);
	} else {
		$("#chkothers").prop('checked', true);

	}

	if (divPi1.sdisc == "") {
		$("#empidDiv").hide();
	}
	$("#patImg").prop('src','pharmacy/pharmacy/readImage?url='+divPi1.img);
	$("#patImg").attr('value', divPi1.img);
	$("#ageType").val(divPi1.agtp);
	//domnic
	setTimeout(function() {
	$("#title").val(divPi1.tit);
	}, 250);
	$("#txtEmpID").val(divPi1.objTreat.empId);
	$("#firstDiv").html("Register By : " + divPi1.firstupdate);
	if (divPi1.lastupdate != undefined) {
		$("#lastDiv").html("Last Updated By : " + divPi1.lastupdate);
	}
		
	if (divPi1.liMLC.length != 0 && divPi1.liMLC[0].firNo != "") {
		
		
		$("#mlcDiv2").show();
		$("#mlc").attr('checked', 'checked');
		$("#mlcid").val(divPi1.liMLC[0].mlcid);

		$("#mlc_no").val(divPi1.liMLC[0].mlcno);
		$("#firNo").val(divPi1.liMLC[0].firNo);
		$("#authorityname").val(divPi1.liMLC[0].Anm);
		$("#buccleNo").val(divPi1.liMLC[0].Bno);
		$("#plStname").val(divPi1.liMLC[0].Pnm);
		$("#plAdress").val(divPi1.liMLC[0].padd);
		$("#mlcDate").val(divPi1.liMLC[0].mlcDt);
		
		$("#mlcInformerTitle").val(divPi1.liMLC[0].inftl);
		$("#mlcInformerFirstName").val(divPi1.liMLC[0].infnm);
		$("#mlcInformerLastName").val(divPi1.liMLC[0].inlnm);
		$("#mlcInformerSex").val(divPi1.liMLC[0].insx);
		$("#mlcInformerAge").val(divPi1.liMLC[0].inage);
		$("#mlcInformerMobile").val(divPi1.liMLC[0].inMb);
		$("#mlcInformerEmail").val(divPi1.liMLC[0].inEml);
		$("#mlcInformerAddress").val(divPi1.liMLC[0].inadd);
		
		if (divPi1.liMLC[0].inrel == null || divPi1.liMLC[0].inrel == "") {
			$("#mlcInformerRelation").val("select");
		} else {
			$("#mlcInformerRelation").val(divPi1.liMLC[0].inrel);
		}
		
		setTimeout(
				function() {
					if (divPi1.liMLC[0].mlcdoc == null
							|| divPi1.liMLC[0].mlcdoc == "") {
						$("#mlcCmoDoctor").val("0");
					} else {
						$("#mlcCmoDoctor").val(divPi1.liMLC[0].mlcdoc);
					}
				}, 1000);
		$("#incidentDetails").val(divPi1.liMLC[0].incd);
		$("#VehicleNo").val(divPi1.liMLC[0].vehno);
	}

	if (divPi1.objTreat.rt == "ipd") {
		$("#admitIPD").show();
		$("#ipdDiv").show();
	}
	$("#divPatFilesDisp").setTemplate(patDocTemp);
	$("#divPatFilesDisp").processTemplate(divPi1);

	$('[name=paymentType][value="' + divPi1.objTreat.tppay + '"]').prop(
			'checked', true);

	// sponsred details
	setTimeout(
			function() {
	$("#sponsredDetailsTable").setTemplate(sponsredDetailsTemplateForList);
	$("#sponsredDetailsTable").processTemplate(divPi1);

	$("#activeInsurance" + divPi1.sdisc).prop('checked', true);},500);
	
	setTimeout( function(){
		
		delete CKEDITOR.instances["textareaNotes"];
		CKEDITOR.replace("textareaNotes");
		CKEDITOR.instances["textareaNotes"].setData(divPi1.objTreat.note);
		//$("#textareaNotes").val(divPi1.objTreat.note);	
	}, 2500);
	
	setTimeout( function(){
		if(divPi1.objTreat.tf == "INACTIVE"){
			$("#billCategory").attr('disabled', true);
		}else{
			$("#billCategory").attr('disabled', false);
		}
	}, 2500);
	
}

function deletePatient(pi, ti) {

	var r = confirm("Are You Confirm To Delete Patient Record? ");
	if (r == true) {
		var inputs = [];
		inputs.push('action=DeletePatient');
		inputs.push('pId=' + pi);
		inputs.push('tId=' + ti);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				alert(r);
				location.reload();
			}
		});
	}
}

var ipdPathologyPatientAssignTests = "{#foreach $T.pl as pl}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div	style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{$T.pl.objTreat.treStart}</div><div style='width: 23%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 17%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.a1}</div><div style='width: 8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.trid}</div><div style='width: 5.5%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px; text-align: center;'>{$T.pl.ag} {$T.pl.agtp}</div><div style='width: 6%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px; text-align: center;'>{$T.pl.sx}</div><div	style='width: 7.5%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px; text-align: center;'>{$T.pl.mb}</div><div	style='width: 13%; height: 25px; padding-left: 1%; padding-top: 3px; border-right: 1px solid #069;'><input onclick=viewPatientAssignTests({$T.pl.pi})	style='font-size: 10px;' type='button' value='ADD ROUTINE TESTS' class='edit' /></div></div>{#/for}";

var ipdRadiologyPatientAssignTests = "{#foreach $T.pl as pl}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div	style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{$T.pl.objTreat.treStart}</div><div style='width: 23%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 17%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.a1}</div><div style='width: 8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.trid}</div><div style='width: 5.5%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px; text-align: center;'>{$T.pl.ag} {$T.pl.agtp}</div><div style='width: 6%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px; text-align: center;'>{$T.pl.sx}</div><div	style='width: 7.5%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px; text-align: center;'>{$T.pl.mb}</div><div	style='width: 13%; height: 25px; padding-left: 1%; padding-top: 3px; border-right: 1px solid #069;'><input onclick=viewRadiologyPatientAssignTests({$T.pl.pi})	style='font-size: 10px;' type='button' value='ADD ROUTINE TESTS' class='edit' /></div></div>{#/for}";

var ipdServicestemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 36%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 16%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 16.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.objTreat.trCount}</div><div style='width: 13%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input onclick='viewServices({$T.pl.pi})' style='font-size: 10px;' type='button' value='VIEW DETAILS' class='edit' /></div></div>{#/for}";

var containerTemplateForIPD = "{#foreach $T.pl as pl}"
		+ "<tr>"
		+ "<td class='center' style='width: 2%;'>{count++}.</td>"
		+ "<td class='' style='width: 5%;'>{$T.pl.mrNo}</td>"
		+ "<td class='' style='width: 11%;'>{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td class='' style='width: 3%;'>{$T.pl.ag}/{$T.pl.sx}</td>"

		+ "{#if $T.pl.wt==null}<td class='center' style='width: 2%;'>--</td>{#/if}"
		+ "{#if $T.pl.wt==0}<td class='center' style='width: 2%;'>--</td>{#/if}"
		+ "{#if $T.pl.wt!=0}<td class='center' style='width: 2%;'>{$T.pl.wt}</td>{#/if}"

		+ "<td class='center' style='width: 4%;'>{$T.pl.objTreat.trCount}</td>"
		+ "<td class='center' style='width: 3%;'>{$T.pl.objTreat.treStart}</td>"
		+ "<td class='' style='width: 3%;'>{$T.pl.objTreat.int}</td>"
		+ "<td class='' style='width: 9%;'>{$T.pl.objHall.htnm}</td>"
		+ "<td class='center' style='width: 3%;'>{$T.pl.oBed.bdnm}</td>"
		+ "<td class='center' style='width: 3%;'>"
		+ "<button onclick=viewIPDDoctorStationDashboard({$T.pl.pi},{$T.pl.trid},'Y',{$T.pl.objHall.ht},'P','IPD') type='button' class='btn btn-xs btn-success' ><i class='fa fa-eye View'></i></button>"
		/*
		 * + "<input
		 * onclick=viewIPDDoctorStationDashboard({$T.pl.pi},{$T.pl.trid},'Y',{$T.pl.objHall.ht},'P','IPD')
		 * type='button' value='VIEW' class='btn btn-xs btn-success' />"
		 */
		+ "</td>" + "</tr>" + "{#/for}";

/*
 * + "<input
 * onclick=viewBedWard({$T.pl.pi},{$T.pl.trid},'Y',{$T.pl.objHall.ht},'R','IPD')
 * type='button' value='VIEW' class='btn btn-xs btn-success' />"
 */

function display(page_name) {

	var patId =$("#pt_Id").val();
	var userId=$("#userId").val();
	var type="onload"
	var value=""; //fname.lname
	var searchBy=""//byName
	
	var input = [];
	//input.push('action=DisplayTopPat');
	input.push('patId=' + encodeURIComponent(patId));
	input.push('page_name=' + encodeURIComponent(page_name));
	input.push('userId=' + encodeURIComponent(userId));
	input.push('type=' + encodeURIComponent(type));
	input.push('value=' + encodeURIComponent(value));
	input.push('searchBy=' + encodeURIComponent(searchBy));
	var str = input.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./ehat/ipdhistory/displayTopPat",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			patientBean = eval('(' + ajaxResponse + ')');
			$("#patobject").html(ajaxResponse);

			if (page_name == "OldPatientDatabase"
					|| page_name == "OPDOldPatientDatabase") {
				$("#container").setTemplate(containerTemplate);
			} else if (page_name == "IPD_OldPatientDatabase") {
				// $("#container").setTemplate(ipdOldDBtemp);
				count = 1;
				$("#container").setTemplate(ipdBedWardTemp);
			} else if (page_name == "IPD_BedWardDashboard") {
				$("#container").setTemplate(ipdBedWardTemp);
			} else if (page_name == "IPD_DIC_Dashboard") {
				$("#container").setTemplate(ipdDICtemp);
			} else if (page_name == "IPD_DRR_Dashboard") {
				$("#container").setTemplate(ipdDRRtemp);
			} else if (page_name == "IPD_MaterialsDashboard") {
				$("#container").setTemplate(ipdMattemp);
			} else if (page_name == "ipdservices") {
				$("#container").setTemplate(ipdServicestemp);
			} else if (page_name == "IPD_Discharge_Dashboard") {
				$("#container").setTemplate(ipdDistemp);
			} else if (page_name == "IPD_DICChart_Dashboard") {
				$("#container").setTemplate(ipdDICCharttemp);
			} else if (page_name == "IPD_Angioplasty_Dashboard") {
				$("#container").setTemplate(IPD_Angioplasty_Dash_Temp);
			} else if (page_name == "IPDInvestigationDashboard") {
				$("#container").setTemplate(patientInvestTemp);
				$("#invtObj").html(ajaxResponse);
			} else if (page_name == "IPDPathologyPatientAssignTestDashboard") {
				$("#pathologyAllPatInfo").html(ajaxResponse);
				$("#container").setTemplate(ipdPathologyPatientAssignTests);
			} else if (page_name == "IPDRadiologyPatientAssignTestDashboard") {
				$("#pathologyAllPatInfo").html(ajaxResponse);
				$("#container").setTemplate(ipdRadiologyPatientAssignTests);
			} else if (page_name == "DischargeProcessDatabase") {
				// $("#patobject").html(ajaxResponse);
				$("#container").setTemplate(opdDischargeProcess);
			} else if (page_name == "OPDDoctorsDeskDashboard") {
				count = 1;
				$("#container").setTemplate(containerTemplateForIPD);
			}/*
				 * else if (page_name == "IPD_AdvanceDashboard") {
				 * $("#container").setTemplate(ipdAdvancetemp); }
				 */
			$("#container").processTemplate(patientBean);

		}
	});

}

/*****for physically dischagred patient*@auther* husen**/
function displayDischargedPat(page_name) {
	var input = [];
	input.push('action=DisplayDischargedPat');
	input.push('page_name=' + encodeURIComponent(page_name));

	var str = input.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			//alert("response:"+ajaxResponse);
			$("#patobjectPDP").html(ajaxResponse);
			patientBean = eval('(' + ajaxResponse + ')');
			setPatientGridDataDISCHARGED(patientBean.pl);
			
			var resultData = [];
			var template = "";
			for(var i=0;i<patientBean.pl.length;i++){
				var name=patientBean.pl[i].fn+" "+patientBean.pl[i].mn+" "+patientBean.pl[i].ln;
				var id=patientBean.pl[i].pi;
				resultData.push({
					ID : id,
					Name : name
				});
				template = template + '<li data-value="' + id
						+ '" class=""><a href="#">' + name
						+ '</a></li>';
			}
			
			setTimeout(function() {
				var inputID = "byNamePHYDIS";
				// $("#div" + inputID + " .typeahead").html("");
				$("#div" + inputID + " .typeahead").html(template);

				if (false) {
					$("#div" + inputID + " .typeahead").show();
				}
				$("#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {
		$("#byNamePHYDIS").val((item.text).trim());
	}
}

function setPatientGridDataDISCHARGED(result)
{
	var data = result;
    // prepare the data
    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'pi', type: 'string'},
            { name: 'tit', type: 'string'},
            { name: 'fn', type: 'string'},
            { name: 'mn', type: 'string'},
            { name: 'ln', type: 'string'},
            { name: 'trCount',map:'objTreat>trCount', type: 'string'},
            { name: 'htnm',map:'objHall>htnm', type: 'string'},
            { name: 'hn',map:'objHall>hn', type: 'string'},
            { name: 'bdnm',map:'oBed>bdnm', type: 'string'},
            { name: 'sponsredName',map:'liSponser>0>sponsredName', type: 'string'},
            { name: 'sx', type: 'string'},
            { name: 'trid', type: 'string'},
            { name: 'ht',map:'objHall>ht', type: 'string'},
            { name: 'a4', type: 'string'},
            { name: 'a6', type: 'string'}
           ],
        localdata: data
    };
     var columnrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
    	 
	        var datarow = $("#jqxgrid_PHYDIS").jqxGrid('getrowdata', row);
	        var title=datarow['tit'];
	        var fName=datarow['fn'];
	        var mName=datarow['mn'];
	        var lName=datarow['ln'];
	      return title+" "+fName +" " +mName +" " +lName;
    }; 
    var sponserenderer= function (row, column, value) {
    	if(value!="")
    	{
    		return value;
    	}
    	else
    	{
    		return 'Self';
    	}	
        
		
   }
    var viewrenderer= function (row, column, value) {
    	var datarow = $("#jqxgrid_PHYDIS").jqxGrid('getrowdata', row);
        var trId=datarow['trid'];
        var piId=datarow['pi'];
        var ht=datarow['ht'];
        
		return '<div style="text-align: center; margin-top:2px;margin-bottom:2px;"><button class="btn btn-xs btn-success" onclick=viewBedWardPDP('+piId+','+trId+',"Y",'+ht+',"P","IPD","PDP")><i class="fa fa-eye View"></i></button></div>';
   }
    var printrenderer= function (row, column, value) {
    	var datarow = $("#jqxgrid_PHYDIS").jqxGrid('getrowdata', row);
        var piId=datarow['pi'];
        
		return '<div style="text-align: center; margin-top: 2px;margin-bottom: 2px;"><button class="btn btn-xs btn-success" onclick=printIPDFormJspPDP('+piId+');><i class="fa fa-print"></i></button></div>';
   }
   /* var bedrenderer= function (row, column, value) {
    	var datarow = $("#jqxgrid_PHYDIS").jqxGrid('getrowdata', row);
    	 var trId=datarow['trid'];
	     var piId=datarow['pi'];
	     var ht=datarow['ht'];
        
		return '<div style="text-align: center; margin-top: 2px;margin-bottom: 2px;"><button class="btn btn-xs btn-success" onclick=RedirectToAllotBed()><i class="fa fa-eye View"></i></button></div>';
   }*/
    var dataAdapter = new $.jqx.dataAdapter(source, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
    $("#jqxgrid_PHYDIS").jqxGrid(
    {
        width: 1100,
        source: dataAdapter,
        columnsresize: true,
        pageable: true,
        showstatusbar: true,
        autoheight: true,
        sortable: true,
        altrows: true,
        enabletooltips: true,
        theme: 'energyblue',
        renderstatusbar: function (statusbar) {
            // appends buttons to the status bar.
            var container = $("<div style='overflow: hidden; position: relative; margin: 5px;'></div>");
            var searchButton = $("<div style='float: left; margin-left: 5px;'><img style='position: relative; margin-top: 2px;' src='images/search.png'/><span style='margin-left: 4px; position: relative; top: -3px;'>Find</span></div>");
            container.append(searchButton);
            statusbar.append(container);
            searchButton.jqxButton({  width: 50, height: 20 });
            // search for a record.
            searchButton.click(function (event) {
                var offset = $("#jqxgrid_PHYDIS").offset();
                $("#jqxwindow_PHYDIS").jqxWindow('open');
                $("#jqxwindow_PHYDIS").jqxWindow('move', offset.left + 30, offset.top + 30);
            }); 
        },
        columns: [
			{
			    text: 'Srl No', sortable: false, filterable: false, editable: false,
			    groupable: false, draggable: false, resizable: false,
			    datafield: '', columntype: 'number', width: 48,
			    cellsrenderer: function (row, column, value) {
			        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
			    }
			},
			{ text: 'UHID', datafield: 'pi',width: 75},
            { text: 'Patient First Name', datafield: 'fn',width: 1,hidden : true},
            { text: 'Patient Title', datafield: 'tit',width: 50,hidden : true},
            { text: 'Patient Medium Name', datafield: 'mn',width: 1,hidden : true},
            { text: 'Patient Name', datafield: 'ln',width: 280,cellsrenderer:columnrenderer},
            { text: 'Admission No', datafield: 'trCount',width: 140},
            { text: 'Ward Type', datafield: 'htnm',width: 130},
            { text: 'Ward Name', datafield: 'hn',width: 130},
            { text: 'Bed No', datafield: 'bdnm',width: 55},
            { text: 'Patient Type', datafield: 'sponsredName',width: 150 ,cellsrenderer:sponserenderer},
            { text: 'View', datafield: 'sx',width: 46,cellsrenderer:viewrenderer,enabletooltips: false},
            { text: 'Hall Id', datafield: 'ht',width: 1,hidden : true},
            { text: 'Tre Id', datafield: 'trid',width: 1,hidden : true},
            { text: 'Print', datafield: 'a4',width: 46,cellsrenderer:printrenderer,enabletooltips: false},
           /* { text: 'Re-Allot Bed', datafield: 'a6',width: 100,cellsrenderer:bedrenderer}*/	           
        ],
    });
    $("#jqxwindow_PHYDIS").jqxWindow({ resizable: false,  autoOpen: false, width: 210, height: 180 });
    // create find and clear buttons.
    $("#findButton_PHYDIS").jqxButton({ width: 70});
    $("#clearButton_PHYDIS").jqxButton({ width: 70});
    // create dropdownlist.
    $("#dropdownlist_PHYDIS").jqxDropDownList({ autoDropDownHeight: true, selectedIndex: 0, width: 200, height: 23, 
        source: [
            'Ward Type',
            'Ward Name'              
        ]
    });
    if (theme != "") {
        $("#inputField_PHYDIS").addClass('jqx-input-' + theme);
    }
    // clear filters.
    $("#clearButton_PHYDIS").click(function () {
        $("#jqxgrid_PHYDIS").jqxGrid('clearfilters');
    });
    // find records that match a criteria.
    $("#findButton_PHYDIS").click(function () {
        $("#jqxgrid_PHYDIS").jqxGrid('clearfilters');
        var searchColumnIndex = $("#dropdownlist_PHYDIS").jqxDropDownList('selectedIndex');
        var datafield = "";
        switch (searchColumnIndex) {
            case 0:
                datafield = "htnm";
                break;
                
            case 1:
                datafield = "hn";
                break;
          }
        var searchText = $("#inputField_PHYDIS").val();
        var filtergroup = new $.jqx.filter();
        var filter_or_operator = 1;
        var filtervalue = searchText;
        var filtercondition = 'contains';
        var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
        filtergroup.addfilter(filter_or_operator, filter);
        $("#jqxgrid_PHYDIS").jqxGrid('addfilter', datafield, filtergroup);
        // apply the filters.
        $("#jqxgrid_PHYDIS").jqxGrid('applyfilters');
    });
}

function displayIPD(page_name) {
	var input = [];
	input.push('action=DisplayTopPatIPD');
	var str = input.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			$("#myobj").html(ajaxResponse);
			patientBean = eval('(' + ajaxResponse + ')');

			if (page_name == "OldPatientDatabase"
					|| page_name == "OPDOldPatientDatabase") {
				$("#container").setTemplate(containerTemplate);
			} else if (page_name == "IPD_OldPatientDatabase") {
				$("#container").setTemplate(ipdOldDBtemp);
			} else if (page_name == "IPD_BedWardDashboard") {
				$("#container").setTemplate(ipdBedWardTemp);
			} else if (page_name == "IPD_DIC_Dashboard") {
				$("#container").setTemplate(ipdDICtemp);
			} else if (page_name == "IPD_DRR_Dashboard") {
				$("#container").setTemplate(ipdDRRtemp);
			} else if (page_name == "IPD_MaterialsDashboard") {
				$("#container").setTemplate(ipdMattemp);
			} else if (page_name == "IPD_Discharge_Dashboard") {
				$("#container").setTemplate(ipdDistemp);
				$("#dischargeObj").html(ajaxResponse);
			} else if (page_name == "IPD_CaseRegister_Dashboard") {
				$("#container").setTemplate(ipdcaseRegtemp);
			} else if (page_name == "IPD_Register_Dashboard") {
				$("#container").setTemplate(ipdRegtemp);
			} else if (page_name == "OrderForm") {
				$("#container").setTemplate(orderFormtemp);
				$("#orderObj").html(ajaxResponse);
			}
			$("#container").processTemplate(patientBean);

		}
	});

};

function saveRegistrationDetails(optType, pagenm, buttonValue) {

	// var hospType =
	// var hospType = $('input:radio[name="hospType"]:checked').val();

	var patID = $("#patID").val();

	var document = {
		liDocs : []
	};

	/*
	 * var fileCount = $("#fileCount").val();
	 * 
	 * alert("fileCount: " + fileCount);
	 * 
	 * for ( var i = 1; i <= fileCount; i++) {
	 * 
	 * var filePath = $("#ancher" + i + "").attr('href'); var fileName =
	 * $("#ancher" + i + "").html(); var documentId = $("#chk" + i + "").val();
	 * if (documentId == "on") { documentId = 0; } if (filePath != undefined) {
	 * 
	 * document.liDocs.push({ "pi" : patID, "flpth" : filePath, "flnm" :
	 * fileName, "docid" : documentId,
	 * 
	 * }); } }
	 */

	var trans = $("#chkInforSms").prop('checked') + "&"
			+ $("#chkInforEmail").prop('checked');
	var promo = $("#chkProSms").prop('checked') + "&"
			+ $("#chkProEmail").prop('checked');

	document = JSON.stringify(document);
	var appoid = $("#appoid").val();
	var conAdd1 = $("#conAdd1").val();
	var conAdd2 = $("#conAdd2").val();
	var conAdd3 = $("#conAdd3").val();
	var conAdd10 = $("#conAdd10").val();
	var conAdd4 = $("#conAdd4").val();
	var conAdd5 = $("#conAdd5").val();
	var conAdd6 = $("#conAdd6").val();
	var conAdd7 = $("#conAdd7").val();
	var conAdd8 = $("#conAdd8").val();
	var conAdd9 = $("#conAdd9").val();

	// permanent address
	var perAdd1 = $("#perAdd1").val();
	var perAdd2 = $("#perAdd2").val();
	var perAdd3 = $("#perAdd3").val();
	var perAdd8 = $("#perAdd8").val();
	var perAdd4 = $("#perAdd4").val();
	var perAdd5 = $("#perAdd5").val();
	var perAdd6 = $("#perAdd6").val();
	var perAdd7 = $("#perAdd7").val();

	var permanentAddressFlag;
	if ($("#chkAddress").prop('checked')) {
		permanentAddressFlag = 1;
	} else {
		permanentAddressFlag = 0;
	}

	var empId = $("#txtEmpID").val();

	// var age = $("#age").val();
	var blood = $("#blood").val();
	var dob = $("#dob").val();
	var title = $("#title :selected").val();
	var fname = $("#fName").val();
	var lname = $("#lName").val();
	var mName = $("#mName").val();
	var mobNo = $("#mobNo").val();
	var pattern = /^([0-9])*$/;
	if (!pattern.test(mobNo)) {
		alert("Mobile Number should be of digits only!");
		$("#mobNo").focus();
		return false;
	}

	var emailId = $("#emailId").val();
	var radioGroup1 = $("#radioGroup1").val();
	var refBy = $("#refBy :selected").val();

	var sex = $("#sex").val();
	var month = $("#month").val();
	var days = $("#days").val();
	var year = $("#year").val();

	var weight = ($("#weight").val()).trim();
	var height = ($("#height").val()).trim();
	if (weight == "")
		weight = 0;

	if (height == "")
		height = 0;

	var BMI = finalCalculatedBMI(height, weight);

	var PatientType;
	if ($("#vipCheckbox").is(':checked')) {
		PatientType = "VIP";
	} else {
		PatientType = "Others";
	}
	var passportNo;
	var visa;
	var nationality = $("#Nationlty :selected").val();
	if (nationality == "Indian" || nationality == "") {
		passportNo = "";
		visa = "";
	} else {
		passportNo = $("#passptNo").val();
		visa = $("#visa").val();
	}

	var religion = $("#religion").val();
	var language = $("#lang :selected").val();
	var identity = $("#identity").val();
	var identifnNo = $("#IdentifctnNo").val();
	var occupation = $("#occuptn").val();
	var education = $("#edu").val();
	var annIncm = $("#annIncm").val();
	//var note = CKEDITOR.instances['textareaNotes'].getData();
	var note = $("#textareaNotes").val();
	var divImg =$('#patImg').val();
	var file = $("#file1").val();
	/*if (file == "") {
		divImg = $("#divImg").val();
	} else {
		divImg = "images/patImages/" + patID + ".jpg";
	}*/
	var regDate = $("#popup_container3").val();
	var refByMob = $("#refByMob").val();

	var ageType = $("#ageType :selected").val();
	var opd = [];
	var echo = $('#selechoDoc').val();
	var tmt = $('#seltmtDoc').val();
	// var firNo = $('#firNo').val();
	var specialDiscount = $("#SpecialDiscount").val();

	var selectIpdDoc = $("#selectIpdDoc").val();
	var admitFor = $("#admitFor").val();
	var relNm = $("#relNm").val();
	var emrNo = $("#emrNo").val();

	// mlc details

	/* validation MLC Fileds */
	var mlcno = $("#mlc_no").val();
	var firNo = $("#firNo").val();
	var authorityname = $("#authorityname").val();
	var buccleNo = $("#buccleNo").val();
	var plStname = $("#plStname").val();
	var plAdress = $("#plAdress").val();
	var incidentDetails = $("#incidentDetails").val();
	var mlcDate = $("#mlcDate").val();
	var mlcInformerTitle = $("#mlcInformerTitle").val();
	var mlcInformerFirstName = $("#mlcInformerFirstName").val();
	var mlcInformerLastName = $("#mlcInformerLastName").val();
	var mlcInformerSex = $("#mlcInformerSex").val();
	var mlcInformerMobile = $("#mlcInformerMobile").val();
	var mlcInformerEmail = $("#mlcInformerEmail").val();
	if (mlcInformerEmail != "") {
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!filter.test(mlcInformerEmail)) {
			alert('Please Enter valid Email Id');
			$("#mlcInformerEmail").focus();
			return false;
		}
	}

	var mlcInformerAge = $("#mlcInformerAge").val();
	var mlcInformerRelation = $("#mlcInformerRelation").val();
	var mlcInformerAddress = $("#mlcInformerAddress").val();
	var mlcCmoDoctor = $("#mlcCmoDoctor").val();
	// end mlc details

	var refTo = $("#refTo").val();

	$('#opd option:selected').each(function() {
		opd.push($(this).val());
	});

	
	if (fname == null || fname == "") {
		alert("Patient first name must be filled out.");
		SetFocus("fName");
		return false;
	} else if (mName == null || mName == "") {
		// alert("Patient middle name must be filled out.");
		// return false;
	} else if (lname == null || lname == "") {
		alert("Patient last name must be filled out.");
		return false;
	} else if (mobNo == "") {
		alert("Mobile Number must be Entered.");
		return false;
	} else if (mobNo != "" && mobNo.length != 10) {
		alert(" Only 10 Digit Mobile Number is Allowed.");
		return false;
	} else if (mobNo != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(mobNo)) {
			alert("Mobile Number should be of digits only!");
			$("#mobNo").focus();
			return false;
		}
	} else if (mlcInformerEmail != "") {
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!filter.test(mlcInformerEmail)) {
			alert('Please Enter valid Email Id');
			$("#mlcInformerEmail").focus();
			return false;
		}
	} else if(refTo == "select"){
		alert("Please select patiet type.");
		return false;
	}

	var chkSource = $("input[name=refByRadio]:checked").val();
	if (chkSource == "source") {
		if ($("#selReferredBy").val() == "select") {
			alert("Please Select Referred By");
			SetFocus("selReferredBy");
			return false;
		}
	}

	var txtOtherRefDoc = $("#txtReferredBy").val();

	if (refBy == "select") {
		refBy = "0";
	} else if (refBy == "Other") {
		if (txtOtherRefDoc == "") {
			alert("Please Specify Referred Source Name.");
			return false;
		}
	} else if (refBy == undefined) {
		refBy = "0";
	} else if(refBy == null){
		refBy = "0";
	}
	
	var selReferredBy = $("#selReferredBy").val();
	var chkRefDoc = $('#chkRefDoc').is(":checked");
	var txtRefBy = $("#txtRefBy").val();
	var refByRadio = $("input[name='refByRadio']:checked").val();
	var txtReferredBy = $("#txtReferredBy").val();
	
	if (selReferredBy == "doctor" && chkRefDoc == false) {
		if (txtRefBy == "") {
			alert("Please Specify Referred Doctor Name.");
			return false;
		}
	}
	
	if ((selReferredBy == "doctor" && chkRefDoc ==true) || selReferredBy == "inHousedoctor") {
		txtReferredBy = $("#refBy :selected").text();
	} else if (selReferredBy == "doctor" && chkRefDoc == false){
		txtReferredBy = $("#txtRefBy").val();
		refBy = "0";
	}else{
		refBy = "0";
	}

	var bedridden;
	if ($('#bedridden').prop('checked')) {
		bedridden = "Y";
	} else {
		bedridden = "N";
	}

	var seropositive;
	if ($('#seropositive').prop('checked')) {
		seropositive = "Y";
	} else {
		seropositive = "N";
	}
	if(selReferredBy == "select"){
		refBy = "0";
	}
	
	// For Opd patient
	var doctorID = 0;
	var doctorSpecialization = 0;
	var doctorDepartments = 0;

	var informerTitle = "";
	var informerFirstName = "";
	var informerLastName = "";
	var informerSex = "";
	var informerMobile = "";
	var informerEmail = "";
	var informerAge = "";
	var informerRelation = "";
	var informerAddress = "";
	var informerCMOConsult = "";
	var informerDoc_spl_id = "";
	var informerDoc_dept_id = "";
	var informerBillCtgy = "";
	var informerDescription = "";

	if (refTo == "opd") {
		doctorID = $("#doctorName").val();
		doctorSpecialization = $("#doctorSpecilization").val();
		doctorDepartments = $("#doctorDepartments").val();
	} else if (refTo == "er") {
		doctorID = $("#erCMOConsultant").val();
		doctorSpecialization = $("#erdoctorSpecilization").val();
		doctorDepartments = $("#erdoctorDepartments").val();
	} else if (refTo == "ipd") {
		doctorID = $("#ipdDoctorName").val();
		doctorSpecialization = $("#ipdDoctorSpecilization").val();
		doctorDepartments = $("#ipdDoctorDepartments").val();
	}

	if (refTo == "er") {
		informerTitle = $("#erInformerTitle").val();
		informerFirstName = $("#erInformerFirstName").val();
		informerLastName = $("#erInformerLastName").val();
		informerSex = $("#erInformerSex").val();
		informerMobile = $("#erInformerMobile").val();
		informerEmail = $("#erInformerEmail").val();
		informerAge = $("#erInformerAge").val();
		informerRelation = $("#erInformerRelation").val();
		informerAddress = $("#erInformerAddress").val();
		informerCMOConsult = $("#erCMOConsultant").val();
		informerDoc_spl_id = $("#erdoctorSpecilization").val();
		informerDoc_dept_id = $("#erdoctorDepartments").val();
		informerBillCtgy = $("#billCategory").val();
		informerDescription = $("#erDescTextarea").val();
	}
	var diagnosisDoc = 0;
	var diagnosisHos = 0;

	// for print purpose only
	var diagnosisDocText = 0;
	if (refTo == "diagnosis") {
		diagnosisDoc = $("#diagnosisDoctor").val();
		diagnosisHos = $("#diagnosisHospital").val();
	}

	// For ipd patient
	var relativeTitle = $("#relativeTitle").val();
	var relativeFirstName = $("#relativeFirstName").val();
	var relativeLastName = $("#relativeLastName").val();
	var relativeSex = $("#relativeSex").val();
	var relativeMobile = $("#relativeMobile").val();
	var relativeEmail = $("#relativeEmail").val();
	var relativeAge = $("#relativeAge").val();
	var relativeRelation = $("#relativeRelation").val();
	var relativeAddress = $("#relativeAddress").val();

	var ipdDocIds = {
		liDocId : []
	};

	var docName = "";
	$('#ipdDoctors').find('option').each(function() {
		docName = docName + $(this).val();
	});
	var docId = "";
	var docArr = [];
	docArr = docName.split("\n");
	for ( var i = 0; i < docArr.length; i++) {
		if (docArr[i] != "") {
			ipdDocIds.liDocId.push({
				"docId" : docArr[i]
			});
		}
	}

	ipdDocIds = JSON.stringify(ipdDocIds);

	var txtIpdEpisodeNo;
	var txtIpdVisitNo;
	var ipdEpisodeDescription;
	var ipdAdmissionDate;
	var ipdbillCategory;
	var opdVisitType = "";

	if (refTo == "ipd") {
		txtIpdEpisodeNo = $("#txtIpdEpisodeNo").val();
		txtIpdVisitNo = $("#txtIpdVisitNo").val();
		ipdEpisodeDescription = $("#ipdEpisodeDescription").val();
		ipdAdmissionDate = $("#ipdAdmissionDate").val();
	
		ipdbillCategory = $("#billCategory").val();
		if (ipdbillCategory == "2") {
			if ($("#sponsoredType").val() == "select") {
				alert("Please select Sponsored Type");
				return false;
			} else if ($("#companyName").val() == "select") {
				alert("Please select Company Name");
				return false;
			} else if ($("#sponseredName").val() == "select") {
				alert("Please select Policy Name");
				return false;
			}
		}
	} else if (refTo == "opd") {
		txtIpdEpisodeNo = $("#opdEpisodeNo").val();
		txtIpdVisitNo = $("#opdVisitNo").val();
		ipdEpisodeDescription = $("#opdEpisodeDesciption").val();
		ipdAdmissionDate = $("#opdVisitDate").val();
		ipdbillCategory = $("#billCategory").val();
		opdVisitType = $("#opdVisitType").val();
		
	}else{
		
		ipdbillCategory = $("#billCategory").val();
	}
	// End IPD

	// sponsred details

	var insuredTitle = $("#insuredTitle").val();
	var insuredFirstName = $("#insuredFirstName").val();
	var insuredLastName = $("#insuredLastName").val();
	var insuredSex = $("#insuredSex").val();
	var insuredMobile = $("#insuredMobile").val();
	var insuredEmail = $("#insuredEmail").val();
	var insuredAge = $("#insuredAge").val();
	var insuredRelation = $("#insuredRelation").val();
	var insuredAddress = $("#insuredAddress").val();
	var sponsoredType = $("#sponsoredType").val();
	var companyName = $("#companyName").val();
	var sponseredName = $("#sponseredName").val();
	var companyId = $("#companyId").val();
	var identification = $("#identification").val();
	var identificationNo = $("#identificationNo").val();
	var preauthNo = $("#preauthNo").val();
	var preauthdate = $("#preauthdate").val();
	var cashlessPolicyNo = $("#cashlessPolicyNo").val();
	var cnnNo = $("#cnnNo").val();
	var insuranceValidFrom = $("#insuranceValidFrom").val();
	var insuranceValidTo = $("#insuranceValidTo").val();
	
		//Reason Of visit
	
	var idReasonOfVisit = $("#SelectReasonVisitDetails").val();
	
	
	// end sponsred details

	var inputs = [];
	inputs.push('action=Save_Now');

	if (pagenm == "otsch" || pagenm == "causality") {
		inputs.push('casualityFlag=Y');
	} else {
		inputs.push('casualityFlag=N');
	}

	inputs.push('diagnosisDoc=' + diagnosisDoc);
	inputs.push('diagnosisHos=' + diagnosisHos);

	inputs.push('informerTitle=' + informerTitle);
	inputs.push('informerFirstName=' + $.trim(informerFirstName));
	inputs.push('informerLastName=' + $.trim(informerLastName));
	inputs.push('informerSex=' + informerSex);
	inputs.push('informerMobile=' + $.trim(informerMobile));
	inputs.push('informerEmail=' + $.trim(informerEmail));
	inputs.push('informerAge=' + informerAge);
	inputs.push('informerRelation=' + informerRelation);
	inputs.push('informerAddress=' + $.trim(informerAddress));
	inputs.push('informerCMOConsult=' + informerCMOConsult);
	inputs.push('informerDoc_spl_id=' + informerDoc_spl_id);
	inputs.push('informerDoc_dept_id=' + informerDoc_dept_id);
	inputs.push('informerBillCtgy=' + informerBillCtgy);
	inputs.push('informerDescription=' + informerDescription);

	// ipd patient details

	inputs.push('relativeTitle=' + relativeTitle);
	inputs.push('relativeSex=' + relativeSex);
	inputs.push('relativeFirstName=' + relativeFirstName);
	inputs.push('relativeLastName=' + relativeLastName);
	inputs.push('relativeMobile=' + relativeMobile);
	inputs.push('relativeEmail=' + relativeEmail);
	inputs.push('relativeAge=' + relativeAge);
	inputs.push('relativeRelation=' + relativeRelation);
	inputs.push('relativeAddress=' + relativeAddress);
	inputs.push('txtIpdEpisodeNo=' + txtIpdEpisodeNo);
	inputs.push('txtIpdVisitNo=' + txtIpdVisitNo);
	inputs.push('ipdEpisodeDescription=' + ipdEpisodeDescription);
	inputs.push('ipdAdmissionDate=' + ipdAdmissionDate);
	inputs.push('ipdbillCategory=' + ipdbillCategory);
	inputs.push('ipdDocIds=' + ipdDocIds);
	inputs.push('opdVisitType=' + opdVisitType);

	inputs.push('docotorID=' + doctorID);
	inputs.push('doctorSpecialization=' + doctorSpecialization);
	inputs.push('doctorDepartments=' + doctorDepartments);

	/*
	 * inputs.push('typeOfPayment=' + typeOfPayment);
	 * inputs.push('txtPaymentPerName=' + txtPaymentPerName);
	 * inputs.push('txtRelAge=' + txtRelAge); inputs.push('relSex=' + relSex);
	 * inputs.push('txtRelRelation=' + txtRelRelation);
	 * inputs.push('txtRelAddress=' + txtRelAddress);
	 * inputs.push('txtRelMobile=' + txtRelMobile); inputs.push('selCompany=' +
	 * selCompany); inputs.push('txtInsuranceCmpny=' + txtInsuranceCmpny);
	 * inputs.push('txtMemoNo=' + txtMemoNo); inputs.push('popup_container4=' +
	 * popup_container4); inputs.push('txtCashlessPolicyNo=' +
	 * txtCashlessPolicyNo); inputs.push('txtCnnnNo=' + txtCnnnNo);
	 */

	inputs.push('bedridden=' + bedridden);
	inputs.push('seropositive=' + seropositive);

	inputs.push('document=' + document);
	inputs.push('appoid=' + appoid);
	inputs.push('queryType=' + optType);
	inputs.push('patID=' + patID);
	inputs.push('conAdd1=' + encodeURIComponent(conAdd1));
	inputs.push('conAdd2=' + encodeURIComponent(conAdd2));
	inputs.push('conAdd3=' + encodeURIComponent(conAdd3));
	inputs.push('conAdd10=' + encodeURIComponent(conAdd10));
	inputs.push('conAdd4=' + encodeURIComponent(conAdd4));
	inputs.push('conAdd5=' + encodeURIComponent(conAdd5));
	inputs.push('conAdd6=' + encodeURIComponent(conAdd6));
	inputs.push('conAdd7=' + encodeURIComponent(conAdd7));
	inputs.push('conAdd8=' + encodeURIComponent(conAdd8));
	inputs.push('conAdd9=' + encodeURIComponent(conAdd9));

	// permanent Address
	inputs.push('perAdd1=' + encodeURIComponent(perAdd1));
	inputs.push('perAdd2=' + encodeURIComponent(perAdd2));
	inputs.push('perAdd3=' + encodeURIComponent(perAdd3));
	inputs.push('perAdd8=' + encodeURIComponent(perAdd8));
	inputs.push('perAdd4=' + encodeURIComponent(perAdd4));
	inputs.push('perAdd5=' + encodeURIComponent(perAdd5));
	inputs.push('perAdd6=' + encodeURIComponent(perAdd6));
	inputs.push('perAdd7=' + encodeURIComponent(perAdd7));

	inputs.push('permanentAddressFlag='
			+ encodeURIComponent(permanentAddressFlag));

	inputs.push('empId=' + empId);

	// inputs.push('age=' + encodeURIComponent(age));
	inputs.push('refByMob=' + refByMob);
	inputs.push('blood=' + encodeURIComponent(blood));
	inputs.push('dob=' + encodeURIComponent(dob));
	inputs.push('title=' + title);
	inputs.push('ageType=' + ageType);
	inputs.push('fName=' + $.trim(encodeURIComponent(fname)));
	inputs.push('lName=' + $.trim(encodeURIComponent(lname)));
	inputs.push('mName=' + $.trim(encodeURIComponent(mName)));
	inputs.push('mobNo=' + mobNo);
	inputs.push('radioGroup1=' + radioGroup1);
	inputs.push('refBy=' + refBy);
	inputs.push('PatientType=' + PatientType);
	inputs.push('refTo=' + refTo);
	inputs.push('sex=' + sex);
	inputs.push('weight=' + weight);
	inputs.push('BMI=' + BMI);
	inputs.push('emailId=' + emailId);
	inputs.push('nationality=' + nationality);
	inputs.push('passportNo=' + passportNo);
	inputs.push('visa=' + visa);
	inputs.push('religion=' + religion);
	inputs.push('language=' + language);
	inputs.push('identity=' + identity);
	inputs.push('identifnNo=' + identifnNo);
	inputs.push('occupation=' + occupation);
	inputs.push('education=' + education);
	inputs.push('annIncm=' + annIncm);
	// new fileds added
	inputs.push('height=' + height);
	inputs.push('year=' + year);
	inputs.push('month=' + month);
	inputs.push('days=' + days);
	// inputs.push('HeadCIM=' + HeadCIM);

	inputs.push('note=' + encodeURIComponent(note));
	inputs.push('divImg=' + divImg);
	inputs.push('regDate=' + regDate);

	inputs.push('opd=' + opd);
	inputs.push('echo=' + echo);
	inputs.push('tmt=' + tmt);
	inputs.push('pagenm=' + pagenm);
	// inputs.push('hospType=' + hospType);
	inputs.push('specialDiscount=' + specialDiscount);

	inputs.push('selectIpdDoc=' + selectIpdDoc);
	inputs.push('admitFor=' + encodeURIComponent(admitFor));
	inputs.push('relNm=' + encodeURIComponent(relNm));
	inputs.push('emrNo=' + emrNo);

	// mlc details
	inputs.push('mlcno=' + mlcno);
	inputs.push('firNo=' + firNo);
	inputs.push('authorityname=' + encodeURIComponent(authorityname));
	inputs.push('buccleNo=' + encodeURIComponent(buccleNo));
	inputs.push('plStname=' + encodeURIComponent(plStname));
	inputs.push('plAdress=' + encodeURIComponent(plAdress));
	inputs.push('mlcid=' + $("#mlcid").val());
	inputs.push('incidentDetails=' + incidentDetails);
	inputs.push('mlcDate=' + mlcDate);
	inputs.push('mlcInformerTitle=' + mlcInformerTitle);
	inputs.push('mlcInformerFirstName=' + mlcInformerFirstName);
	inputs.push('mlcInformerLastName=' + mlcInformerLastName);
	inputs.push('mlcInformerSex=' + mlcInformerSex);
	inputs.push('mlcInformerMobile=' + mlcInformerMobile);
	inputs.push('mlcInformerEmail=' + mlcInformerEmail);
	inputs.push('mlcInformerAge=' + mlcInformerAge);
	inputs.push('mlcInformerRelation=' + mlcInformerRelation);
	inputs.push('mlcInformerAddress=' + mlcInformerAddress);
	inputs.push('mlcCmoDoctor=' + mlcCmoDoctor);
	// end mlc details

	inputs.push('trid=' + $("#trid").val());
	inputs.push('selReferredBy=' + selReferredBy);
	inputs.push('txtReferredBy=' + txtReferredBy);
	inputs.push('chkRefDoc=' + chkRefDoc);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());

	// sponsred details

	inputs.push('insuredTitle=' + insuredTitle);
	inputs.push('insuredFirstName=' + insuredFirstName);
	inputs.push('insuredLastName=' + insuredLastName);
	inputs.push('insuredSex=' + insuredSex);
	inputs.push('insuredMobile=' + insuredMobile);
	inputs.push('insuredEmail=' + insuredEmail);
	inputs.push('insuredAge=' + insuredAge);
	inputs.push('insuredRelation=' + insuredRelation);
	inputs.push('insuredAddress=' + insuredAddress);
	inputs.push('sponsoredType=' + sponsoredType);
	inputs.push('companyName=' + companyName);
	inputs.push('sponseredName=' + sponseredName);
	inputs.push('companyId=' + companyId);
	inputs.push('identification=' + identification);
	inputs.push('identificationNo=' + identificationNo);
	inputs.push('preauthNo=' + preauthNo);
	inputs.push('preauthdate=' + preauthdate);
	inputs.push('cashlessPolicyNo=' + cashlessPolicyNo);
	inputs.push('cnnNo=' + cnnNo);
	inputs.push('insuranceValidFrom=' + insuranceValidFrom);
	inputs.push('insuranceValidTo=' + insuranceValidTo);
	inputs.push('trans=' + encodeURIComponent(trans));
	inputs.push('promo=' + encodeURIComponent(promo));
	
	inputs.push('idReasonOfVisit=' + encodeURIComponent(idReasonOfVisit));	
	

	// end sponsred details

	var patientRegisterString = inputs.join('&');

	/*
	 * if (($("#CallFor").html()) === "View") {
	 * admissionPrint(patientRegisterString, queryType); return false; }
	 */

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : patientRegisterString + "&reqType=AJAX",
				url : "PatientServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					
					if (pagenm == "otsch") {
						$(".close").click();
						$("#patnameDiv").show();
					} else if (pagenm == "reg") {
						alert(ajaxResponse);

						// $("#frmUpload").ajaxForm().submit();

						if (buttonValue == "print") {
							var WindowObject = window.open('', ' ', '');
							WindowObject.document
									.writeln('<html><style type="text/css" media="print"> @page { size: landscape; }</style><body style="width:100%; height: 100%; "><div style="width:100%; height: 100%; "><div	style="width: 100%; margin-top: 2.3cm;margin-left: 0.7cm; font-size: 12px;"><div>Patient Name: '
											+ title
											+ ''
											+ fname
											+ ' '
											+ lname
											+ '</div><div>UHID: '
											+ patID
											+ '</div><div>Date: '
											+ regDate
											+ '</div><div style="margin-top: 4px;"><img src="http://localhost:8080/EhatEnterprise/BarcodeServlet?pid='
											+ patID
											+ '"></img></div></div></div></body></html>');

							WindowObject.document.close();

							WindowObject.focus();

							WindowObject.print();

							WindowObject.close();
						}

						if (($("#CallFor").html()) === "Edit") {

							if (($("#printButton").val()) === "on") {
								($("#printButton").val("off"));
								admissionPrint(patientRegisterString, queryType);
								return false;
							}
						}

						setTimeout(
								function() {

									//alert(ajaxResponse);

									if (refTo == "opd") {
										if (doctorID == 0) {
											window.location = "OPDOldPatientDatabase.jsp";
										} else {

											var inputs = [];
											inputs
													.push('action=opdPatientBillDetails');
											var str = inputs.join('&');
											jQuery
													.ajax({
														async : true,
														type : "POST",
														data : str
																+ "&reqType=AJAX",
														url : "DoctorServlet",
														timeout : 1000 * 60 * 1,
														cache : false,
														error : function() {
															alert('error');
														},
														success : function(r) {
															ajaxResponse = r;

															if (optType == "insert") {
																myArray = JSON
																		.parse(ajaxResponse);
																myObj = myArray.al[0];

																var pageType = "opd";
																var billtype = "S Roplekar";

																var fn = myObj.fn;
																var discID = myObj.sdisc;
																var ln = myObj.ln;
																var pname = myObj.tit
																		+ ""
																		+ fn
																		+ " "
																		+ ln;
																var dname = myObj.sdiscNm;
																var rdn = myObj.rdn;
																var rrd = myObj.rrd;
																var treatmentCount = myObj.treatmentCount;
																var treatmentId = myObj.trid;
																$('#paidAmount')
																		.val(
																				myObj.paid);

																myObj = JSON
																		.stringify(myObj);

																/*
																 * window.location =
																 * "opdBill.jsp?" +
																 * "myObj=" +
																 * encodeURIComponent(myObj) +
																 * "&billtype=" +
																 * billtype +
																 * "&pname=" +
																 * pname +
																 * "&sdisc=" +
																 * discID +
																 * "&rdn=" + rdn +
																 * "&rrd=" + rrd +
																 * "&treatmentCount=" +
																 * treatmentCount +
																 * "&pageType=" +
																 * pageType;
																 */

																window.location = "opdBill.jsp?"
																		+ "myObj="
																		+ encodeURIComponent(myObj)
																		+ "&pageType="
																		+ pageType;

															}
															if (queryType == "update") {
																window.location = "IPD_OPD_Database.jsp?"
																		+ "CallFrom=opdPatUpdate";
															}
														}
													});
										}
									} else if (refTo == "ipd") {
										window.location = "IPD_BedWardDashboard.jsp";
									} else if (refTo == "diagnosis") {
										window.location = "diagnoPatBillDashboard.jsp";
									} else if (refTo == "er") {
										window.location = "OPDOldPatientDatabase.jsp";
									}

								}, 300);

					} else if (pagenm == "causality") {
						//alert(ajaxResponse);
						window.location.reload();
					}
				}
			});
	if (refTo == "ipd") {
		printTicketOnSave(patID);
	}

}

function saveAndPrintRegistrationDetails(queryType, pagenm, buttonValue) {
	// var hospType =
	// var hospType = $('input:radio[name="hospType"]:checked').val();

	var patID = $("#patID").val();

	var document = {
		liDocs : []
	};

	/*
	 * var fileCount = $("#fileCount").val();
	 * 
	 * alert("fileCount: " + fileCount);
	 * 
	 * for ( var i = 1; i <= fileCount; i++) {
	 * 
	 * var filePath = $("#ancher" + i + "").attr('href'); var fileName =
	 * $("#ancher" + i + "").html(); var documentId = $("#chk" + i + "").val();
	 * if (documentId == "on") { documentId = 0; } if (filePath != undefined) {
	 * 
	 * document.liDocs.push({ "pi" : patID, "flpth" : filePath, "flnm" :
	 * fileName, "docid" : documentId,
	 * 
	 * }); } }
	 */

	var trans = $("#chkInforSms").prop('checked') + "&"
			+ $("#chkInforEmail").prop('checked');
	var promo = $("#chkProSms").prop('checked') + "&"
			+ $("#chkProEmail").prop('checked');

	document = JSON.stringify(document);
	var appoid = $("#appoid").val();
	var conAdd1 = $("#conAdd1").val();
	var conAdd2 = $("#conAdd2").val();
	var conAdd3 = $("#conAdd3").val();
	var conAdd10 = $("#conAdd10").val();
	var conAdd4 = $("#conAdd4").val();
	var Town = $("#conAdd3 option:selected").text();
	var Taluka = $("#conAdd10 option:selected").text();
	var District = $("#conAdd4 option:selected").text();
	var conAdd5 = $("#conAdd5").val();
	var conAdd6 = $("#conAdd6").val();
	var conAdd7 = $("#conAdd7").val();
	var conAdd8 = $("#conAdd8").val();
	var conAdd9 = $("#conAdd9").val();

	// permanent address
	var perAdd1 = $("#perAdd1").val();
	var perAdd2 = $("#perAdd2").val();
	var perAdd3 = $("#perAdd3").val();
	var perAdd8 = $("#perAdd8").val();
	var perAdd4 = $("#perAdd4").val();
	var perAdd5 = $("#perAdd5").val();
	var perAdd6 = $("#perAdd6").val();
	var perAdd7 = $("#perAdd7").val();

	var permanentAddressFlag;
	if ($("#chkAddress").prop('checked')) {
		permanentAddressFlag = 1;
	} else {
		permanentAddressFlag = 0;
	}

	var empId = $("#txtEmpID").val();

	// var age = $("#age").val();
	var blood = $("#blood").val();
	var dob = $("#dob").val();
	var title = $("#title :selected").val();
	var fname = $("#fName").val();
	var lname = $("#lName").val();
	var mName = $("#mName").val();
	var mobNo = $("#mobNo").val();
	var emailId = $("#emailId").val();
	var radioGroup1 = $("#radioGroup1").val();
	var refBy = $("#refBy :selected").val();
	if(refBy == undefined){
		$("#refBy").val(0);
		refBy = "0";
	}
	
	var sex = $("#sex").val();
	var weight = $("#weight").val();
	var year = $("#year").val();
	// NEW Fields added
	var height = $("#height").val();

	var month = $("#month").val();
	var days = $("#days").val();

	var PatientType;
	if ($("#vipCheckbox").is(':checked')) {
		PatientType = "VIP";
	} else {
		PatientType = "Others";
	}
	var passportNo;
	var visa;
	var nationality = $("#Nationlty :selected").val();
	if (nationality == "Indian" || nationality == "") {
		passportNo = "";
		visa = "";
	} else {
		passportNo = $("#passptNo").val();
		visa = $("#visa").val();
	}

	var religion = $("#religion").val();
	var language = $("#lang :selected").val();
	var identity = $("#identity").val();
	var identifnNo = $("#IdentifctnNo").val();
	var occupation = $("#occuptn").val();
	var education = $("#edu").val();
	var annIncm = $("#annIncm").val();
	var note = CKEDITOR.instances["textareaNotes"].getData();
	//var note = $("#textareaNotes").val();
	var divImg = $('#patImg').val();
	//alert("divImg:"+divImg);
	var file = $("#file1").val();
	/*if (file == "") {
		divImg = $("#divImg").val();
	} else {
		divImg = "images/patImages/" + patID + ".jpg";
	}*/
	var regDate = $("#popup_container3").val();
	var refByMob = $("#refByMob").val();

	var ageType = $("#ageType :selected").val();
	var opd = [];
	var echo = $('#selechoDoc').val();
	var tmt = $('#seltmtDoc').val();
	// var firNo = $('#firNo').val();
	var specialDiscount = $("#SpecialDiscount").val();

	var selectIpdDoc = $("#selectIpdDoc").val();
	var admitFor = $("#admitFor").val();
	var relNm = $("#relNm").val();
	var emrNo = $("#emrNo").val();

	// mlc details

	var mlcno = $("#mlc_no").val();
	var firNo = $("#firNo").val();
	var authorityname = $("#authorityname").val();
	var buccleNo = $("#buccleNo").val();
	var plStname = $("#plStname").val();
	var plAdress = $("#plAdress").val();
	var incidentDetails = $("#incidentDetails").val();
	var mlcDate = $("#mlcDate").val();
	var mlcInformerTitle = $("#mlcInformerTitle").val();
	var mlcInformerFirstName = $("#mlcInformerFirstName").val();
	var mlcInformerLastName = $("#mlcInformerLastName").val();
	var mlcInformerSex = $("#mlcInformerSex").val();
	var mlcInformerMobile = $("#mlcInformerMobile").val();
	var mlcInformerEmail = $("#mlcInformerEmail").val();
	var mlcInformerAge = $("#mlcInformerAge").val();
	var mlcInformerRelation = $("#mlcInformerRelation").val();
	var mlcInformerAddress = $("#mlcInformerAddress").val();
	var mlcCmoDoctor = $("#mlcCmoDoctor").val();
	// end mlc details

	var refTo = $("#refTo").val();

	$('#opd option:selected').each(function() {
		opd.push($(this).val());
	});

	if (fname == null || fname == "") {
		alert("Patient first name must be filled out.");
		SetFocus("fName");
		return false;
	} else if (mName == null || mName == "") {
		// alert("Patient middle name must be filled out.");
		// return false;
	} else if (lname == null || lname == "") {
		alert("Patient last name must be filled out.");
		return false;
	} else if (mobNo == "") {
		alert("Mobile Number must be Entered.");
		return false;
	} else if (mobNo != "" && mobNo.length != 10) {
		alert(" Only 10 Digit Mobile Number is Allowed.");
		return false;
	} else if (mobNo != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(mobNo)) {
			alert("Mobile Number should be of digits only!");
			$("#mobNo").focus();
			return false;
		}
	} else if (emailId != "") {
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (emailId != "") {
			if (emailId.match(mailformat)) {
				// return true;
			} else {
				alert("You have entered an invalid email address!");
				return false;
			}
		}
	} else if (refTo == "select") {
		alert(" Please select Patient Category.");
		SetFocus("refTo");
		return false;
	}
	
	var refByRadio = $("input[name='refByRadio']:checked").val();
	var txtOtherRefDoc = $("#txtReferredBy").val();

	if (refBy == "select") {
		refBy = "0";
	} else if (refBy == "Other") {
		if (txtOtherRefDoc == "") {
			alert("Please Specify Referred Source Name.");
			return false;
		}
	} else if (refBy == undefined) {
		refBy = "0";
	} 
	var selReferredBy = $("#selReferredBy").val();
	var txtReferredBy = $("#txtReferredBy").val();
	if (selReferredBy == "doctor" || selReferredBy == "inHousedoctor") {
		txtReferredBy = $("#refBy :selected").text();
	}

	if (refByRadio == "walkin") {
		refBy = "0";
		txtReferredBy = "";
		selReferredBy = "select";
	}

	var bedridden;
	if ($('#bedridden').prop('checked')) {
		bedridden = "Y";
	} else {
		bedridden = "N";
	}

	var seropositive;
	if ($('#seropositive').prop('checked')) {
		seropositive = "Y";
	} else {
		seropositive = "N";
	}
	if (refBy == "select") {
		refBy = "0";
	}if(selReferredBy == "select"){
		refBy = "0";
	}
	if(refBy == null){
		refBy = "0";
	}
	// For Ipd Billing Details
	/*
	 * var typeOfPayment = $('input:radio[name="paymentType"]:checked').val();
	 * var txtPaymentPerName = $("#txtPaymentPerName").val(); var txtRelAge =
	 * $("#txtRelAge").val(); var relSex = $("#relSex").val(); var
	 * txtRelRelation = $("#txtRelRelation").val(); var txtRelAddress =
	 * $("#txtRelAddress").val(); var txtRelMobile = $("#txtRelMobile").val();
	 * 
	 * var selCompany = $("#selCompany").val(); var txtInsuranceCmpny =
	 * $("#txtInsuranceCmpny").val(); var txtMemoNo = $("#txtMemoNo").val(); var
	 * popup_container4 = $("#popup_container4").val(); var txtCashlessPolicyNo =
	 * $("#txtCashlessPolicyNo").val(); var txtCnnnNo = $("#txtCnnnNo").val();
	 */
	// end ipd billing detais
	// For Opd patient
	var doctorID = 0;
	var doctorSpecialization = 0;
	var doctorDepartments = 0;

	var informerTitle = "";
	var informerFirstName = "";
	var informerLastName = "";
	var informerSex = "";
	var informerMobile = "";
	var informerEmail = "";
	var informerAge = "";
	var informerRelation = "";
	var informerAddress = "";
	var informerCMOConsult = "";
	var informerDoc_spl_id = "";
	var informerDoc_dept_id = "";
	var informerBillCtgy = "";
	var informerDescription = "";

	if (refTo == "opd") {
		doctorID = $("#doctorName").val();
		doctorSpecialization = $("#doctorSpecilization").val();
		doctorDepartments = $("#doctorDepartments").val();
	} else if (refTo == "er") {
		doctorID = $("#erCMOConsultant").val();
		doctorSpecialization = $("#erdoctorSpecilization").val();
		doctorDepartments = $("#erdoctorDepartments").val();
	} else if (refTo == "ipd") {
		doctorID = $("#ipdDoctorName").val();
		doctorSpecialization = $("#ipdDoctorSpecilization").val();
		doctorDepartments = $("#ipdDoctorDepartments").val();
	}

	if (refTo == "er") {
		informerTitle = $("#erInformerTitle").val();
		informerFirstName = $("#erInformerFirstName").val();
		informerLastName = $("#erInformerLastName").val();
		informerSex = $("#erInformerSex").val();
		informerMobile = $("#erInformerMobile").val();
		informerEmail = $("#erInformerEmail").val();
		informerAge = $("#erInformerAge").val();
		informerRelation = $("#erInformerRelation").val();
		informerAddress = $("#erInformerAddress").val();
		informerCMOConsult = $("#erCMOConsultant").val();
		informerDoc_spl_id = $("#erdoctorSpecilization").val();
		informerDoc_dept_id = $("#erdoctorDepartments").val();
		informerBillCtgy = $("#billCategory").val();
		informerDescription = $("#erDescTextarea").val();
	}
	var diagnosisDoc = 0;
	var diagnosisHos = 0;

	// for print purpose only
	var diagnosisDocText = 0;
	if (refTo == "diagnosis") {
		diagnosisDoc = $("#diagnosisDoctor").val();
		diagnosisHos = $("#diagnosisHospital").val();
	}

	// For ipd patient
	var relativeTitle = $("#relativeTitle").val();
	var relativeFirstName = $("#relativeFirstName").val();
	var relativeLastName = $("#relativeLastName").val();
	var relativeSex = $("#relativeSex").val();
	var relativeMobile = $("#relativeMobile").val();
	var relativeEmail = $("#relativeEmail").val();
	var relativeAge = $("#relativeAge").val();
	var relativeRelation = $("#relativeRelation").val();
	var relativeAddress = $("#relativeAddress").val();

	var ipdDocIds = {
		liDocId : []
	};

	var docName = "";
	$('#ipdDoctors').find('option').each(function() {
		docName = docName + $(this).val();
	});
	var docId = "";
	var docArr = [];
	docArr = docName.split("\n");
	for ( var i = 0; i < docArr.length; i++) {
		if (docArr[i] != "") {
			ipdDocIds.liDocId.push({
				"docId" : docArr[i]
			});
		}
	}

	ipdDocIds = JSON.stringify(ipdDocIds);

	var txtIpdEpisodeNo;
	var txtIpdVisitNo;
	var ipdEpisodeDescription;
	var ipdAdmissionDate;
	var ipdbillCategory;
	var opdVisitType = "";
	var BillCategoryName;
	
	if (refTo == "ipd") {
		txtIpdEpisodeNo = $("#txtIpdEpisodeNo").val();
		txtIpdVisitNo = $("#txtIpdVisitNo").val();
		ipdEpisodeDescription = $("#ipdEpisodeDescription").val();
		ipdAdmissionDate = $("#ipdAdmissionDate").val();
		ipdbillCategory = $("#billCategory").val();
		BillCategoryName = $("#billCategory option:selected").text();
		if (ipdbillCategory == "2") {
			
			if ($("#sponsoredType").val() == "select") {
				alert("Please select Sponsored Type");
				return false;
			} else if ($("#companyName").val() == "select") {
				alert("Please select Company Name");
				return false;
			} else if ($("#sponseredName").val() == "select") {
				alert("Please select Policy Name");
				return false;
			}
		}
	} else if (refTo == "opd") {
		txtIpdEpisodeNo = $("#opdEpisodeNo").val();
		txtIpdVisitNo = $("#opdVisitNo").val();
		ipdEpisodeDescription = $("#opdEpisodeDesciption").val();
		ipdAdmissionDate = $("#opdVisitDate").val();
		ipdbillCategory = $("#billCategory").val();
		BillCategoryName = $("#billCategory option:selected").text();
		
		opdVisitType = $("#opdVisitType").val();
	}else{
		
		ipdbillCategory = $("#billCategory").val();
		BillCategoryName = $("#billCategory option:selected").text();
		
	}
	// End IPD

	// sponsred details

	var insuredTitle = $("#insuredTitle").val();
	var insuredFirstName = $("#insuredFirstName").val();
	var insuredLastName = $("#insuredLastName").val();
	var insuredSex = $("#insuredSex").val();
	var insuredMobile = $("#insuredMobile").val();
	var insuredEmail = $("#insuredEmail").val();
	var insuredAge = $("#insuredAge").val();
	var insuredRelation = $("#insuredRelation").val();
	var insuredAddress = $("#insuredAddress").val();
	var sponsoredType = $("#sponsoredType").val();
	var companyName = $("#companyName").val();
	var sponseredName = $("#sponseredName").val();
	var companyId = $("#companyId").val();
	var identification = $("#identification").val();
	var identificationNo = $("#identificationNo").val();
	var preauthNo = $("#preauthNo").val();
	var preauthdate = $("#preauthdate").val();
	var cashlessPolicyNo = $("#cashlessPolicyNo").val();
	var cnnNo = $("#cnnNo").val();
	var insuranceValidFrom = $("#insuranceValidFrom").val();
	var insuranceValidTo = $("#insuranceValidTo").val();
	// end sponsred details
	
	//Reason Of visit
	
	var idReasonOfVisit = $("#SelectReasonVisitDetails").val();

	var inputs = [];
	inputs.push('action=Save_Now');

	if (pagenm == "otsch" || pagenm == "causality") {
		inputs.push('casualityFlag=Y');
	} else {
		inputs.push('casualityFlag=N');
	}

	inputs.push('diagnosisDoc=' + diagnosisDoc);
	inputs.push('diagnosisHos=' + diagnosisHos);

	inputs.push('informerTitle=' + informerTitle);
	inputs.push('informerFirstName=' + $.trim(informerFirstName));
	inputs.push('informerLastName=' + $.trim(informerLastName));
	inputs.push('informerSex=' + informerSex);
	inputs.push('informerMobile=' + $.trim(informerMobile));
	inputs.push('informerEmail=' + $.trim(informerEmail));
	inputs.push('informerAge=' + informerAge);
	inputs.push('informerRelation=' + informerRelation);
	inputs.push('informerAddress=' + $.trim(informerAddress));
	inputs.push('informerCMOConsult=' + informerCMOConsult);
	inputs.push('informerDoc_spl_id=' + informerDoc_spl_id);
	inputs.push('informerDoc_dept_id=' + informerDoc_dept_id);
	inputs.push('informerBillCtgy=' + informerBillCtgy);
	inputs.push('informerDescription=' + informerDescription);

	// ipd patient details

	inputs.push('relativeTitle=' + relativeTitle);
	inputs.push('relativeSex=' + relativeSex);
	inputs.push('relativeFirstName=' + relativeFirstName);
	inputs.push('relativeLastName=' + relativeLastName);
	inputs.push('relativeMobile=' + relativeMobile);
	inputs.push('relativeEmail=' + relativeEmail);
	inputs.push('relativeAge=' + relativeAge);
	inputs.push('relativeRelation=' + relativeRelation);
	inputs.push('relativeAddress=' + relativeAddress);
	inputs.push('txtIpdEpisodeNo=' + txtIpdEpisodeNo);
	inputs.push('txtIpdVisitNo=' + txtIpdVisitNo);
	inputs.push('ipdEpisodeDescription=' + ipdEpisodeDescription);
	inputs.push('ipdAdmissionDate=' + ipdAdmissionDate);
	inputs.push('ipdbillCategory=' + ipdbillCategory);
	inputs.push('BillCategoryName=' + encodeURIComponent(BillCategoryName));
	inputs.push('ipdDocIds=' + ipdDocIds);
	inputs.push('opdVisitType=' + opdVisitType);

	inputs.push('docotorID=' + doctorID);
	inputs.push('doctorSpecialization=' + doctorSpecialization);
	inputs.push('doctorDepartments=' + doctorDepartments);

	/*
	 * inputs.push('typeOfPayment=' + typeOfPayment);
	 * inputs.push('txtPaymentPerName=' + txtPaymentPerName);
	 * inputs.push('txtRelAge=' + txtRelAge); inputs.push('relSex=' + relSex);
	 * inputs.push('txtRelRelation=' + txtRelRelation);
	 * inputs.push('txtRelAddress=' + txtRelAddress);
	 * inputs.push('txtRelMobile=' + txtRelMobile); inputs.push('selCompany=' +
	 * selCompany); inputs.push('txtInsuranceCmpny=' + txtInsuranceCmpny);
	 * inputs.push('txtMemoNo=' + txtMemoNo); inputs.push('popup_container4=' +
	 * popup_container4); inputs.push('txtCashlessPolicyNo=' +
	 * txtCashlessPolicyNo); inputs.push('txtCnnnNo=' + txtCnnnNo);
	 */

	inputs.push('bedridden=' + bedridden);
	inputs.push('seropositive=' + seropositive);

	inputs.push('document=' + document);
	inputs.push('appoid=' + appoid);
	inputs.push('queryType=' + queryType);
	inputs.push('patID=' + patID);
	inputs.push('conAdd1=' + encodeURIComponent(conAdd1));
	inputs.push('conAdd2=' + encodeURIComponent(conAdd2));
	inputs.push('conAdd3=' + encodeURIComponent(conAdd3));
	inputs.push('conAdd10=' + encodeURIComponent(conAdd10));
	inputs.push('conAdd4=' + encodeURIComponent(conAdd4));

	inputs.push('Town=' + encodeURIComponent(Town));
	inputs.push('Taluka=' + encodeURIComponent(Taluka));
	inputs.push('District=' + encodeURIComponent(District));

	inputs.push('conAdd5=' + encodeURIComponent(conAdd5));
	inputs.push('conAdd6=' + encodeURIComponent(conAdd6));
	inputs.push('conAdd7=' + encodeURIComponent(conAdd7));
	inputs.push('conAdd8=' + encodeURIComponent(conAdd8));
	inputs.push('conAdd9=' + encodeURIComponent(conAdd9));

	// permanent Address
	inputs.push('perAdd1=' + encodeURIComponent(perAdd1));
	inputs.push('perAdd2=' + encodeURIComponent(perAdd2));
	inputs.push('perAdd3=' + encodeURIComponent(perAdd3));
	inputs.push('perAdd8=' + encodeURIComponent(perAdd8));
	inputs.push('perAdd4=' + encodeURIComponent(perAdd4));
	inputs.push('perAdd5=' + encodeURIComponent(perAdd5));
	inputs.push('perAdd6=' + encodeURIComponent(perAdd6));
	inputs.push('perAdd7=' + encodeURIComponent(perAdd7));

	inputs.push('permanentAddressFlag='
			+ encodeURIComponent(permanentAddressFlag));

	inputs.push('empId=' + empId);

	// inputs.push('age=' + encodeURIComponent(age));
	inputs.push('refByMob=' + refByMob);
	inputs.push('blood=' + encodeURIComponent(blood));
	inputs.push('dob=' + encodeURIComponent(dob));
	inputs.push('title=' + title);
	inputs.push('ageType=' + ageType);
	inputs.push('fName=' + $.trim(encodeURIComponent(fname)));
	inputs.push('lName=' + $.trim(encodeURIComponent(lname)));
	inputs.push('mName=' + $.trim(encodeURIComponent(mName)));
	inputs.push('mobNo=' + mobNo);
	inputs.push('radioGroup1=' + radioGroup1);
	inputs.push('refBy=' + refBy);
	inputs.push('PatientType=' + PatientType);
	inputs.push('refTo=' + refTo);
	inputs.push('sex=' + sex);
	inputs.push('weight=' + weight);
	inputs.push('emailId=' + emailId);
	inputs.push('nationality=' + nationality);
	inputs.push('passportNo=' + passportNo);
	inputs.push('visa=' + visa);
	inputs.push('religion=' + religion);
	inputs.push('language=' + language);
	inputs.push('identity=' + identity);
	inputs.push('identifnNo=' + identifnNo);
	inputs.push('occupation=' + occupation);
	inputs.push('education=' + education);
	inputs.push('annIncm=' + annIncm);
	// new fileds added
	inputs.push('height=' + height);
	inputs.push('year=' + year);
	inputs.push('month=' + month);
	inputs.push('days=' + days);
	// inputs.push('HeadCIM=' + HeadCIM);

	inputs.push('note=' + encodeURIComponent(note));
	inputs.push('divImg=' + divImg);
	inputs.push('regDate=' + regDate);

	inputs.push('opd=' + opd);
	inputs.push('echo=' + echo);
	inputs.push('tmt=' + tmt);
	inputs.push('pagenm=' + pagenm);
	// inputs.push('hospType=' + hospType);
	inputs.push('specialDiscount=' + specialDiscount);

	inputs.push('selectIpdDoc=' + selectIpdDoc);
	inputs.push('admitFor=' + encodeURIComponent(admitFor));
	inputs.push('relNm=' + encodeURIComponent(relNm));
	inputs.push('emrNo=' + emrNo);

	// mlc details

	inputs.push('mlcno=' + mlcno);
	inputs.push('firNo=' + firNo);
	inputs.push('authorityname=' + encodeURIComponent(authorityname));
	inputs.push('buccleNo=' + encodeURIComponent(buccleNo));
	inputs.push('plStname=' + encodeURIComponent(plStname));
	inputs.push('plAdress=' + encodeURIComponent(plAdress));
	inputs.push('mlcid=' + $("#mlcid").val());
	inputs.push('incidentDetails=' + incidentDetails);
	inputs.push('mlcDate=' + mlcDate);
	inputs.push('mlcInformerTitle=' + mlcInformerTitle);
	inputs.push('mlcInformerFirstName=' + mlcInformerFirstName);
	inputs.push('mlcInformerLastName=' + mlcInformerLastName);
	inputs.push('mlcInformerSex=' + mlcInformerSex);
	inputs.push('mlcInformerMobile=' + mlcInformerMobile);
	inputs.push('mlcInformerEmail=' + mlcInformerEmail);
	inputs.push('mlcInformerAge=' + mlcInformerAge);
	inputs.push('mlcInformerRelation=' + mlcInformerRelation);
	inputs.push('mlcInformerAddress=' + mlcInformerAddress);
	inputs.push('mlcCmoDoctor=' + mlcCmoDoctor);
	// end mlc details

	inputs.push('trid=' + $("#trid").val());
	inputs.push('selReferredBy=' + selReferredBy);
	inputs.push('txtReferredBy=' + txtReferredBy);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());

	// sponsred details

	inputs.push('insuredTitle=' + insuredTitle);
	inputs.push('insuredFirstName=' + insuredFirstName);
	inputs.push('insuredLastName=' + insuredLastName);
	inputs.push('insuredSex=' + insuredSex);
	inputs.push('insuredMobile=' + insuredMobile);
	inputs.push('insuredEmail=' + insuredEmail);
	inputs.push('insuredAge=' + insuredAge);
	inputs.push('insuredRelation=' + insuredRelation);
	inputs.push('insuredAddress=' + insuredAddress);
	inputs.push('sponsoredType=' + sponsoredType);
	inputs.push('companyName=' + companyName);
	inputs.push('sponseredName=' + sponseredName);
	inputs.push('companyId=' + companyId);
	inputs.push('identification=' + identification);
	inputs.push('identificationNo=' + identificationNo);
	inputs.push('preauthNo=' + preauthNo);
	inputs.push('preauthdate=' + preauthdate);
	inputs.push('cashlessPolicyNo=' + cashlessPolicyNo);
	inputs.push('cnnNo=' + cnnNo);
	inputs.push('insuranceValidFrom=' + insuranceValidFrom);
	inputs.push('insuranceValidTo=' + insuranceValidTo);
	inputs.push('trans=' + encodeURIComponent(trans));
	inputs.push('promo=' + encodeURIComponent(promo));
	
	inputs.push('idReasonOfVisit=' + encodeURIComponent(idReasonOfVisit));

	// end sponsred details

	var patientRegisterString = inputs.join('&');
	if (($("#CallFor").html()) === "View") {
		admissionPrint(patientRegisterString, queryType);
		return false;
	}

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : patientRegisterString + "&reqType=AJAX",
				url : "PatientServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					if (pagenm == "otsch") {
						$(".close").click();
						$("#patnameDiv").show();
					} else if (pagenm == "reg") {

						// $("#frmUpload").ajaxForm().submit();

						if (buttonValue == "print") {
							var WindowObject = window.open('', ' ', '');
							WindowObject.document
									.writeln('<html><style type="text/css" media="print"> @page { size: landscape; }</style><body style="width:100%; height: 100%; "><div style="width:100%; height: 100%; "><div	style="width: 100%; margin-top: 2.3cm;margin-left: 0.7cm; font-size: 12px;"><div>Patient Name: '
											+ title
											+ ''
											+ fname
											+ ' '
											+ lname
											+ '</div><div>UHID: '
											+ patID
											+ '</div><div>Date: '
											+ regDate
											+ '</div><div style="margin-top: 4px;"><img src="http://localhost:8080/EhatEnterprise/BarcodeServlet?pid='
											+ patID
											+ '"></img></div></div></div></body></html>');

							WindowObject.document.close();

							WindowObject.focus();

							WindowObject.print();

							WindowObject.close();
						}
						
						if (($("#CallFor").html()) === "Edit") {

							if (($("#printButton").val()) === "on") {
								($("#printButton").val("off"));
								var patID = $("#patID").val();
								admissionPrint(patientRegisterString, queryType,patID);
								return false;
							}

						}

						// print logic
						var patID = $("#patID").val();
					
						admissionPrint(patientRegisterString, queryType,patID);

						setTimeout(
								function() {

									alert(ajaxResponse);

									if (refTo == "opd") {
										if (doctorID == 0) {
											if (queryType == "update") {
												window.location = "IPD_OPD_Database.jsp?"
														+ "CallFrom=total";
											}else{
												window.location = "OPDOldPatientDatabase.jsp";
											}
										} else {

											var inputs = [];
											inputs
													.push('action=opdPatientBillDetails');
											var str = inputs.join('&');
											jQuery
													.ajax({
														async : true,
														type : "POST",
														data : str
																+ "&reqType=AJAX",
														url : "DoctorServlet",
														timeout : 1000 * 60 * 5,
														cache : false,
														error : function() {
															alert('error');
														},
														success : function(r) {
															ajaxResponse = r;

															if (queryType == "insert") {

																myArray = JSON
																		.parse(ajaxResponse);
																myObj = myArray.al[0];

																var pageType = "opd";
																var billtype = "S Roplekar";

																var fn = myObj.fn;
																var discID = myObj.sdisc;
																var ln = myObj.ln;
																var pname = myObj.tit
																		+ fn
																		+ " "
																		+ (myObj.mn)
																		+ " "
																		+ ln;
																var dname = myObj.sdiscNm;
																var rdn = myObj.rdn;
																var rrd = myObj.rrd;
																var treatmentCount = myObj.treatmentCount;
																var treatmentId = myObj.trid;
																$('#paidAmount')
																		.val(
																				myObj.paid);

																myObj = JSON
																		.stringify(myObj);

																/*
																 * window.location =
																 * "opdBill.jsp?" +
																 * "myObj=" +
																 * encodeURIComponent(myObj) +
																 * "&billtype=" +
																 * billtype +
																 * "&pname=" +
																 * pname +
																 * "&sdisc=" +
																 * discID +
																 * "&rdn=" + rdn +
																 * "&rrd=" + rrd +
																 * "&treatmentCount=" +
																 * treatmentCount +
																 * "&pageType=" +
																 * pageType;
																 */

																window.location = "opdBill.jsp?"
																		+ "myObj="
																		+ encodeURIComponent(myObj)
																		+ "&pageType="
																		+ pageType;

															}
															if (queryType == "update") {
																window.location = "IPD_OPD_Database.jsp?"
																		+ "CallFrom=total";
															}
														}
													});
										}
									} else if (refTo == "ipd") {
										if (($("#CallFor").html()) === "Edit") {
											//window.location.reload(true);
											passToEdit(patID);
											//window.location = "IPD_OPD_Database.jsp";
										} else {
											window.location = "IPD_BedWardDashboard.jsp";
										}
									} else if (refTo == "diagnosis") {
										//window.location = "diagnoPatBillDashboard.jsp";
										if (($("#CallFor").html()) === "Edit") {
											//window.location.reload(true);
											passToEdit(patID);
											//window.location = "IPD_OPD_Database.jsp";
										} else {
											window.location = "diagnoPatBillDashboard.jsp";
										}
									} else if (refTo == "er") {
										window.location = "OPDOldPatientDatabase.jsp";
									}

								}, 300);

					} else if (pagenm == "causality") {
						alert(ajaxResponse);
						window.location.reload(true);
					}
				}
			});
}

function ValidateEmail(inputText) {

	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (inputText != "") {
		if (inputText.match(mailformat)) {
			return true;
		} else {
			alert("You have entered an invalid email address!");
			return false;
		}
	}
};

function admissionPrint(patientRegistrationString, queryType,patID) {

	var companyNameText = $("#companyName option:selected").text();
	if (companyNameText == "-select-") {
		companyNameText = "";
	}

	// sponseredNameText is a policy name
	var sponseredNameText = $("#sponseredName option:selected").text();
	if (sponseredNameText == "-select-") {
		sponseredNameText = "";
	}

	var docInchargeNameText = "";
	var refferedTo = $("#refTo").val();

	if (refferedTo == "opd") {
		docInchargeNameText = $("#doctorName option:selected").text();
		if ((($("#doctorName").val()).trim()) == "0") {
			docInchargeNameText = "";
		}
	} else if (refferedTo == "er") {
		docInchargeNameText = $("#erCMOConsultant option:selected").text();
		if ((($("#erCMOConsultant").val()).trim()) == "0") {
			docInchargeNameText = "";
		}
	} else if (refferedTo == "ipd") {
		$('#ipdDoctors').find('option').each(
				function() {
					docInchargeNameText = docInchargeNameText
							+ (($(this).text()) + "@");
				});
	} else if (refferedTo == "diagnosis") {
		docInchargeNameText = $("#diagnosisDoctor option:selected").text();
		if ((($("#diagnosisDoctor").val()).trim()) == "0") {
			docInchargeNameText = "";
		}
	}

	if (queryType != "insert") {// update or view
		var pobj = $("#div1").html();
		var pobj1 = eval('(' + pobj + ')');
		var treatmentId = (pobj1.trid);
		var mrNo = (pobj1.mrNo);
		var trCount = (pobj1.objTreat.trCount);
		// var patientId = (pobj1.pi); // for death

		// START: date of discharge
		var dateActualDischarge = "";
		var dateExpectedDischarge = "";
		var timeExpectedDischarge = "";
		var dischargeCodeName = "";
		var inputs = [];
		inputs.push('action=fetchIPDDischargePlan');
		inputs.push('treatmentId=' + treatmentId);
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "PatientServlet",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error fetching DischargePlan');
					},
					success : function(r) {
						var ajaxResponse = r;
						var pobj1 = eval('(' + ajaxResponse + ')');
						if (pobj1.IPDDischargePlanDTOList.length > 0) {
							dateActualDischarge = (pobj1.IPDDischargePlanDTOList[0].dateActualDischarge);
							dateExpectedDischarge = (pobj1.IPDDischargePlanDTOList[0].dateExpectedDischarge);
							timeExpectedDischarge = (pobj1.IPDDischargePlanDTOList[0].dateSet);
							dischargeCodeName = (pobj1.IPDDischargePlanDTOList[0].dischargeCodeName);
						}
					}
				});
		// END: date of discharge

		// START: Bill Details
		var billNo = "";
		var billDate = "";
		// var recieptNo = ""; // need discussion
		// var recieptDate = ""; // need discussion
		var totalAmount = 0;
		var paidAmount = 0;

		var inputs = [];
		inputs.push('action=fetchBillDetailsByTreatmentID');
		inputs.push('treatId=' + treatmentId);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error fetching Bill Details');
			},
			success : function(r) {
				var ajaxResponse = r;
				var pobj = eval('(' + ajaxResponse + ')');

				for ( var int = 0; int < pobj.listRecMaster.length; int++) {
					totalAmount += parseFloat((pobj.listRecMaster[int].total));
					paidAmount += parseFloat((pobj.listRecMaster[int].pdAmt));
				}

				if ((pobj.listRecMaster.length) > 0) {
					billNo = (pobj.listRecMaster[0].billID);
					billDate = (pobj.listRecMaster[0].billDate);
				}

			}
		});
		// END: Bill Details

		// START: Diagnosis Details
		var primaryDiagnosis = "";
		var provisionalDiagnosis = "";
		var inputs = [];
		inputs.push('action=fetchAssessment');
		inputs.push('treatmentId=' + treatmentId);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "TreatmentServlet",
					timeout : 1000 * 60 * 6,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(res) {
						var ajaxResponse = res;
						var testObj = eval('(' + ajaxResponse + ')');

						var assessmentListLength = (testObj.assessmentList.length);
						var assessmentListLengthMinusOne = (assessmentListLength - 1);

						for ( var int = 0; int < assessmentListLength; int++) {

							if (testObj.assessmentList[int].diagno_type == 'Provisional') {
								provisionalDiagnosis += (testObj.assessmentList[int].diagnosis);
								if ((assessmentListLength > 2)
										&& ((int + 1) < assessmentListLengthMinusOne)) {
									provisionalDiagnosis += ", ";
								}

							} else if (testObj.assessmentList[int].diagno_type == 'Confirmed') {
								primaryDiagnosis += (testObj.assessmentList[int].diagnosis);
								if ((assessmentListLength > 2)
										&& ((int + 1) < assessmentListLengthMinusOne)) {
									primaryDiagnosis += ", ";
								}
							}
						}
					}
				});

		// END: Diagnosis Details

		setTimeout(function() {
			window.open("AdmissionPrint.jsp?" + patientRegistrationString
					+ "&companyNameText=" + companyNameText
					+ "&sponseredNameText=" + sponseredNameText
					+ "&dateActualDischarge=" + dateActualDischarge
					+ "&dateExpectedDischarge=" + dateExpectedDischarge
					+ "&timeExpectedDischarge=" + timeExpectedDischarge
					+ "&dischargeCodeName=" + dischargeCodeName + "&billNo="
					+ billNo + "&mrNo=" + mrNo + "&billDate=" + billDate
					+ "&totalAmount=" + totalAmount + "&paidAmount="
					+ paidAmount + "&docInchargeNameText="
					+ docInchargeNameText + "&trCount=" + trCount
					+ "&provisionalDiagnosis=" + provisionalDiagnosis
					+ "&primaryDiagnosis=" + primaryDiagnosis);
		}, 800);

	} else if (queryType == "insert") {
		window.open("AdmissionPrint.jsp?" + patientRegistrationString
				+ "&companyNameText=" + companyNameText + "&sponseredNameText="
				+ sponseredNameText + "&docInchargeNameText="
				+ docInchargeNameText);
	}

}

function autoAgeMonthDays() {

	var dob = $("#dob").val();
	//alert("dob*** "+dob)
	if (dob != "") {
		var ageString = getAgeYMD(dob);
		// alert(ageString);
		var ageStringArray = ageString.split("___");
		// alert(ageStringArray);
		$("#year").val(ageStringArray[0]);
		$("#month").val(ageStringArray[1]);
		$("#days").val(ageStringArray[2]);
		// var ageString = Y___M___D
	}

	/*
	 * $("#year").val(0); $("#month").val(0); $("#days").val(0); var today_year =
	 * ""; var today_month = ""; var today_day = ""; var dob = $("#dob").val(); //
	 * alert(dob); if (dob != "") { var ddob = dob.split("/");
	 * 
	 * var birth_year = ddob[2]; var birth_month = ddob[1]; var birth_day =
	 * ddob[0];
	 * 
	 * var today_date = new Date(); today_year = today_date.getFullYear();
	 * today_month = today_date.getMonth(); today_day = today_date.getDate();
	 * today_month++; var year = 0; var month = 0; var days = 0; var arrayDays = [
	 * "31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31" ];
	 * 
	 * if (today_year > birth_year) { year = today_year - birth_year;
	 * $("#year").val(year); // check month if (today_month > birth_month) {
	 * 
	 * month = today_month - birth_month; $("#month").val(month); // check day
	 * if (today_day > birth_day) {
	 * 
	 * days = today_day - birth_day; $("#days").val(days); } else if (today_day <
	 * birth_day) {
	 * 
	 * var day = arrayDays[birth_month - 1]; month = month - 1; today_day =
	 * today_day + parseInt(day); days = today_day - birth_day;
	 * $("#month").val(month); $("#days").val(days); } else { days = 0;
	 * $("#days").val(days); } } else if (today_month < birth_month) { year =
	 * year - 1; today_month = today_month + 12; month = today_month -
	 * birth_month; $("#year").val(year); $("#month").val(month); // check day
	 * if (today_day > birth_day) {
	 * 
	 * days = today_day - birth_day; $("#days").val(days); } else if (today_day <
	 * birth_day) {
	 * 
	 * var day = arrayDays[birth_month - 1]; month = month - 1; today_day =
	 * today_day + parseInt(day); days = today_day - birth_day;
	 * $("#month").val(month); $("#days").val(days); } else { days = 0;
	 * $("#days").val(days); } } else { month = 0; $("#month").val(month); //
	 * check day if (today_day > birth_day) {
	 * 
	 * days = today_day - birth_day; $("#days").val(days); } else if (today_day <
	 * birth_day) {
	 * 
	 * var day = arrayDays[birth_month - 1]; month = month - 1; today_day =
	 * today_day + parseInt(day); days = today_day - birth_day;
	 * $("#month").val(month); $("#days").val(days); } else { days = 0;
	 * $("#days").val(days); } } } else if (today_year == birth_year) { year =
	 * 0; $("#year").val(year); // check month if (today_month > birth_month) {
	 * 
	 * month = today_month - birth_month; $("#month").val(month); // check day
	 * if (today_day > birth_day) {
	 * 
	 * days = today_day - birth_day; $("#days").val(days); } else if (today_day <
	 * birth_day) {
	 * 
	 * var newMonth = birth_month - 1; var day = arrayDays[newMonth]; month =
	 * month - 1; today_day = today_day + parseInt(day); days = today_day -
	 * birth_day; $("#month").val(month); $("#days").val(days); } else { days =
	 * 0; $("#days").val(days); } } else { month = 0; $("#month").val(month); //
	 * check day if (today_day > birth_day) {
	 * 
	 * days = today_day - birth_day; $("#days").val(days); } else if (today_day <
	 * birth_day) {
	 * 
	 * var newMonth = birth_month - 1; var day = arrayDays[newMonth]; month =
	 * month - 1; today_day = today_day + parseInt(day); days = today_day -
	 * birth_day; $("#month").val(month); $("#days").val(days); } else { days =
	 * 0; $("#days").val(days); } } } }
	 */

}

function sendOpd(trid) {

	var inputs = [];
	inputs.push('action=btnopd');
	inputs.push('tid=' + trid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			// alert(r);
			location.reload();
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

function upload() {

	var x = document.forms["frmUpload"]["file1"].value;
	if (x.length == 0) {
		alert("Please Select Image");

	} else {

		$("#frmUpload").ajaxForm().submit();

	}
}

var removeBtnTemp = "<input type='button' value='Remove' class='edit' onclick='removeDocuments()'/>";

function setRemoveBtnTemp() {
	var sample;
	$("#removeBtn").setTemplate(removeBtnTemp);
	$("#removeBtn").processTemplate(sample);
}
function uploadFile() {

	/*
	 * var fileName = $("#divPatFileName").html(); var filePath1 =
	 * $("#divPatFile").html();
	 */

	var patID = $("#patID").val();
	var filePath = $("#fileUp").val();
	var actualFilePath = "images/pat_files/" + patID + "_" + filePath;

	var count = $("#fileCount").val();
	count++;

	/*
	 * $("#divPatFileName").html(fileName + "," + filePath);
	 * $("#divPatFile").html(actualFilePath);
	 */
	if (filePath.length == 0) {
		alert("Please Select File To Upload.");

	} else {

		$("#fileUploadfrm").attr(
				"action",
				"CommonsFileUploadServlet?patID=" + patID + "&filePath="
						+ filePath);
		setTimeout(function() {
			$("#fileUploadfrm").ajaxForm().submit();
		}, 500);

		// showPatFiles();

		var x = document.createElement('div');
		x.setAttribute('id', 'divId' + count);
		x.setAttribute('style', 'width: auto; height:20px;margin-left:20px;');

		document.getElementById("divPatFilesDisp").appendChild(x);
		document.getElementById('divId' + count).innerHTML = "<div  style='width: auto; '>"
				+ (count)
				+ ".<a id='ancher"
				+ count
				+ "' href='"
				+ actualFilePath
				+ "' target='_blank'>"
				+ filePath
				+ "</a></div><input type='checkbox' id='chk"
				+ count
				+ "'onclick=setRemoveBtnTemp() >";

		// $("#fileUploadfrm").submit();
		$("#fileCount").val(count);
	}
}

function uploadFileForCausality() {

	var patID = $("#patID").val();
	var filePath = $("#fileUp").val();
	var actualFilePath = "images/pat_files/" + patID + "_" + filePath;

	var count = $("#fileCount").val();
	count++;

	if (filePath.length == 0) {
		alert("Please Select File To Upload.");

	} else {

		$("#fileUploadfrm").attr(
				"action",
				"CommonsFileUploadServlet?patID=" + patID + "&filePath="
						+ filePath);
		setTimeout(function() {
			$("#fileUploadfrm").ajaxForm().submit();
		}, 500);

		// showPatFiles();

		var x = document.createElement('div');
		x.setAttribute('id', 'divId' + count);
		x.setAttribute('style', 'width: auto; height:20px;margin-left:20px;');

		document.getElementById("divPatFilesDisp").appendChild(x);
		document.getElementById('divId' + count).innerHTML = "<div  style='width: auto; '>"
				+ (count)
				+ ".<a id='ancher"
				+ count
				+ "' href='"
				+ actualFilePath
				+ "' target='_blank'>"
				+ filePath
				+ "</a></div><input type='checkbox' id='chk"
				+ count
				+ "'onclick=setRemoveBtnTemp() >";

		$("#fileCount").val(count);
	}
}

function removeDocuments() {

	var fileDel = [];
	var hideDiv = [];
	for ( var i = 1; i <= $("#fileCount").val(); i++) {

		var $radios = $('input:checkbox[id=chk' + i + ']');
		if ($radios.is(':checked') == true) {
			fileDel.push($("#chk" + i).val());
			hideDiv.push(i);
		}
	}

	if (fileDel.length == 0) {
		alert("Please Check At Least Single File To Remove.");
		return false;
	}

	var inputs = [];
	inputs.push('action=RemoveDocuments');
	inputs.push('fileDel=' + fileDel);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			if (ajaxResponse == "Flie Deleted Successfully") {

				for ( var j = 0; j < hideDiv.length; j++) {

					$("#divId" + hideDiv[j]).html("");
				}
			}
		}
	});
}
var setInHouseDocTemp = '<option value="select">select</option>{#foreach $T.dl as dl}<option value="{$T.dl.di}">{$T.dl.dn}</option>{#/for}';

function getInHouseDoctors() {

	var inputs = [];
	inputs.push('action=getInHouseDoctors');

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			prjobj = eval('(' + ajaxResponse + ')');
			$("#refBy").setTemplate(setInHouseDocTemp);
			$("#refBy").processTemplate(prjobj);
		}
	});
}

function setReferredBySource() {
	var selReferredBy = $("#selReferredBy").val();
	if (selReferredBy == "doctor") {
		getRefDoctors();
		$("#referredByDiv").hide();
		$("#doctorDiv").show();
		$("#submit").hide();
		showChkRefDocDiv();
		onclickChkRefDocDiv();
	} else if (selReferredBy == "inHousedoctor") {
		getInHouseDoctors();
		$("#referredByDiv").hide();
		$("#doctorDiv").show();
		$("#submit").hide();
		hideChkRefDocDiv();
	} else {
		$("#doctorDiv").hide();
		$("#referredByDiv").show();
		$("#refBy").val(0);
		hideChkRefDocDiv();
	}
}
function showPassVisaDiv() {
	var Nationlty = $("#Nationlty").val();
	if (Nationlty == "Indian" || Nationlty == "") {
		$("#passportDiv").hide();
		$("#visaDiv").hide();
	} else {
		$("#passportDiv").show();
		$("#visaDiv").show();
	}
}

function dispMessage(optType, pagenm, buttonValue) {
	var t = $("#title").val();
	var x = $("#fName").val();
	var y = $("#lName").val();
	var u = $("#mName").val();
	var z = $("#conAdd1").val();
	var a = $("#dob").val();
	var c = $("#mobNo").val();
	var b = $("#emrNo").val();
	var year = $("#year").val();

	var refBy = $("#refBy").val();
	var txtEmpID = $("#txtEmpID").val();
	var txtReferredBy = $("#txtReferredBy").val();

	var refTo = $("#refTo").val();
	var SpecialDiscount = $("#SpecialDiscount").val();
	var selReferredBy = $("#selReferredBy").val();
	var refByRadio = $("input[name='refByRadio']:checked").val();
	var popup_container3 = $("#popup_container3").val();
	var selectIpdDoc = $("#ipdDoctorName").val();
	var admitFor = $("#admitFor").val();
	var firNo = $("#firNo").val();
	var authorityname = $("#authorityname").val();
	var buccleNo = $("#buccleNo").val();
	var plStname = $("#plStname").val();
	var plAdress = $("#plAdress").val();
	var sex = $("#sex").val();
	var emailId = $("#emailId").val();
	var PatientType = $("input:radio[name='PatientType']:checked").val();

	// var hospType = $('input:radio[name="hospType"]:checked').val();
	/** *******************validation for*********************** */
	var ValidationExpression = /^([a-zA-Z ])*$/;
	if (!ValidationExpression.test(x)) {
		alert("First name only alphabets are allowed.");
		SetFocus("fName");
		return false;
	}
	if (!ValidationExpression.test(u)) {
		alert("Middle name only alphabets are allowed.");
		SetFocus("mName");
		return false;
	}
	if (!ValidationExpression.test(y)) {
		alert("Last name only alphabets are allowed.");
		SetFocus("lName");
		return false;
	}

	if (t == null || t == "select") {
		alert("Please Select Title");
		SetFocus("title");
		return false;
	} else if (sex == "") {
		alert("Please Select Gender");
		SetFocus("sex");
		return false;
	} else if (x == null || x == "") {
		alert("Patient first name must be filled out.");
		SetFocus("fName");
		return false;
	} else if (y == null || y == "") {
		alert("Patient last name must be filled out.");
		SetFocus("lName");
		return false;
	} else if (year == "" || year == null) {
		alert("Please enter patient age");
		$("#year").focus();
		return false;
	} else if (c == null || c == "") {
		alert("Mobile Number must be Entered.");
		SetFocus("mobNo");
		return false;
	} else if (c.length != 10) {
		alert(" Only 10 Digit Mobile Number Allowed.");
		SetFocus("mobNo");
		return false;
	} else if (refByRadio == undefined) {
		alert("Please Select Refer By");
		return false;
	} else if (refTo == "select") {
		alert(" Please select Patient Category.");
		SetFocus("refTo");
		return false;

	} else if (refTo == "ipd") {

		if (selectIpdDoc == 0) {
			alert("Please Select Admitted Under Doctor");
			return false;
		} else if (selectIpdDoc != 0) {
			// var docid = $("#ipdDoctorName").val();
			var docName = $("#ipdDoctorName option:selected").text();
			var add = docName + '\n';
			// var doctorid = docid + '\n';

			var flag = 0;
			$('#ipdDoctors').find('option').each(function() {
				if ($(this).html() == add) {
					// alert("Doctor Is Present In List");
					flag = 1;
				}
			});
			if (flag == 0) {
				alert("Please add Doctor In Doctor's List");
				return false;
			}
		} else if (opdBillCatg == "sponsor") {
			alert("Please Fill the Sponsor Details");
			return false;
		}

	} else if (refByRadio == "source") {
		// if(refBy == "select" && SpecialDiscount == "")
		if (selReferredBy == "select" && SpecialDiscount == "") {
			alert("Please Select Source");
			return false;
		} else if (selReferredBy == "doctor"
				|| selReferredBy == "inHousedoctor") {
			if (refBy == "select") {
				alert("Please Select Referred Doctor.");
				return false;
			}
		} else if ((selReferredBy != "doctor" || selReferredBy != "inHousedoctor")
				&& selReferredBy != "select") {
			if (txtReferredBy == "") {
				alert("Please Enter Referred Source.");
				return false;
			}
		} else if (SpecialDiscount != "") {
			if (txtEmpID == "") {
				alert("Please Enter Employee ID");
				return false;
			}
		}
	} else if (refByRadio == "walkin") {
		$("#refBy").val(0);
		$("#SpecialDiscount").val("");
		$("#txtEmpID").val("");
	} else if (PatientType == "chkvip") {
		$("#PatientType").val(0);
		// $("#SpecialDiscount").val("");
		// $("#txtEmpID").val("");
	} else if (PatientType == "chkothers") {
		$("#PatientType").val(0);
		// $("#SpecialDiscount").val("");
	}

	/*
	 * if ($("#mlc").attr("checked")) { if (firNo == "") { alert("Please Enter
	 * Fir No"); return false; } else if (authorityname == "") { alert("Please
	 * Enter Authority Name"); return false; } else if (buccleNo == "") {
	 * alert("Please Enter Buccle No"); return false; } else if (plStname == "") {
	 * alert("Please Enter Police Station Name"); return false; } else if
	 * (plAdress == "") { alert("Please Enter Police Station Address"); return
	 * false; } }
	 */

	saveAndPrintRegistrationDetails(optType, pagenm, buttonValue);
}

function savepatient(optType, pagenm, value) {

	var t = $("#title").val();
	var x = $("#fName").val();
	var y = $("#lName").val();
	var u = $("#mName").val();
	var z = $("#conAdd1").val();
	var a = $("#dob").val();
	var c = $("#mobNo").val();
	var b = $("#emrNo").val();
	var year = $("#year").val();

	var refBy = $("#refBy").val();
	var txtEmpID = $("#txtEmpID").val();
	var txtReferredBy = $("#txtReferredBy").val();

	var refTo = $("#refTo").val();
	var SpecialDiscount = $("#SpecialDiscount").val();
	var selReferredBy = $("#selReferredBy").val();
	var refByRadio = $("input[name='refByRadio']:checked").val();
	var popup_container3 = $("#popup_container3").val();
	var selectIpdDoc = $("#ipdDoctorName").val();
	var admitFor = $("#admitFor").val();
	var firNo = $("#firNo").val();
	var authorityname = $("#authorityname").val();
	var buccleNo = $("#buccleNo").val();
	var plStname = $("#plStname").val();
	var plAdress = $("#plAdress").val();
	var sex = $("#sex").val();
	var emailId = $("#emailId").val();
	var PatientType = $("input:radio[name='PatientType']:checked").val();
	var chkRefDoc = $('#chkRefDoc').is(":checked");
	var txtRefBy = $("#txtRefBy").val();
	
	// var hospType = $('input:radio[name="hospType"]:checked').val();

	/** *******************validation for*********************** */
	var ValidationExpression = /^([a-zA-Z ])*$/;
	if (!ValidationExpression.test(x)) {
		alert("First name only alphabets are allowed.");
		SetFocus("fName");
		return false;
	}
	if (!ValidationExpression.test(u)) {
		alert("Middle name only alphabets are allowed.");
		SetFocus("mName");
		return false;
	}
	if (!ValidationExpression.test(y)) {
		alert("Last name only alphabets are allowed.");
		SetFocus("lName");
		return false;
	}

	if (t == null || t == "select") {
		alert("Please Select Title");
		SetFocus("title");
		return false;
	} else if (sex == "") {
		alert("Please Select Gender");
		SetFocus("sex");
		return false;
	} else if (x == null || x == "") {
		alert("Patient first name must be filled out.");
		SetFocus("fName");
		return false;
	} else if (y == null || y == "") {
		alert("Patient last name must be filled out.");
		SetFocus("lName");
		return false;
	} else if (year == "" || year == null) {
		alert("Please enter patient age");
		$("#year").focus();
		return false;
	} else if (c == null || c == "") {
		alert("Mobile Number must be Entered.");
		SetFocus("mobNo");
		return false;
	} else if (c.length != 10) {
		alert(" Only 10 Digit Mobile Number Allowed.");
		SetFocus("mobNo");
		return false;
	} else if (emailId != "") {
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!filter.test(emailId)) {
			alert('Please Enter valid Email Id');
			$("#emailId").focus();
			return false;
		}
	} else if (refByRadio == undefined) {
		alert("Please Select Refer By");
		return false;
	} else if (refTo == "select") {
		alert(" Please select Patient Type.");
		SetFocus("refTo");
		return false;

	} else if (refTo == "ipd") {

		if (selectIpdDoc == 0) {
			alert("Please Select Admitted Under Doctor");
			return false;
		} else if (selectIpdDoc != 0) {
			// var docid = $("#ipdDoctorName").val();
			var docName = $("#ipdDoctorName option:selected").text();
			var add = docName + '\n';
			// var doctorid = docid + '\n';

			var flag = 0;
			$('#ipdDoctors').find('option').each(function() {
				if ($(this).html() == add) {
					// alert("Doctor Is Present In List");
					flag = 1;
				}
			});
			if (flag == 0) {
				alert("Please add Doctor In Doctor's List");
				return false;
			}
		} else if (opdBillCatg == "sponsor") {
			alert("Please Fill the Sponsor Details");
			return false;
		}

	} else if (refByRadio == "source") {
		// if(refBy == "select" && SpecialDiscount == "")
		if (selReferredBy == "select" || SpecialDiscount == "") {
			alert("Please Select Source");
			return false;
		} else if (selReferredBy == "doctor") {
			if(chkRefDoc == true){
				if (refBy == "select") {
					alert("Please Select Referred Doctor.");
					return false;
				}
			}else{
				if(txtRefBy == "" || txtRefBy == undefined){
					alert("Please Insert Doctors name .");
					return false;
				}
			}
			
		}else if(selReferredBy == "inHousedoctor"){
			if (refBy == "select") {
				alert("Please Select Referred Doctor.");
				return false;
			}
		} else if ((selReferredBy != "doctor" || selReferredBy != "inHousedoctor")
				&& selReferredBy != "select") {
			if (txtReferredBy == "") {
				alert("Please enter Referred Source.");
				return false;
			}
		} else if (SpecialDiscount != "") {
			if (txtEmpID == "") {
				alert("Please Enetr Employee ID");
				return false;
			}
		}
	} else if (refByRadio == "walkin") {
		$("#refBy").val(0);
		$("#SpecialDiscount").val("");
		$("#txtEmpID").val("");
	} else if (PatientType == "chkvip") {
		$("#PatientType").val(0);
		// $("#SpecialDiscount").val("");
		// $("#txtEmpID").val("");
	} else if (PatientType == "chkothers") {
		$("#PatientType").val(0);
		// $("#SpecialDiscount").val("");
	}

	/*
	 * if ($("#mlc").attr("checked")) { if (firNo == "") { alert("Please Enter
	 * Fir No"); return false; } else if (authorityname == "") { alert("Please
	 * Enter Authority Name"); return false; } else if (buccleNo == "") {
	 * alert("Please Enter Buccle No"); return false; } else if (plStname == "") {
	 * alert("Please Enter Police Station Name"); return false; } else if
	 * (plAdress == "") { alert("Please Enter Police Station Address"); return
	 * false; } }
	 */
	
	saveRegistrationDetails(optType, pagenm, value);
}

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function(e) {
			$('#patImg').attr('src', e.target.result);
		};

		reader.readAsDataURL(input.files[0]);
	}
}

var specialDiscountTempForReg = "<option value='' onclick='hideEmpIdDiv()'>select</option>{#foreach $T.sl as sl}<option onclick='showEmpIdDiv()' value='{$T.sl.si}'>{$T.sl.sn}</option>{#/for}";

function setSpecialDiscountForReg() {

	var inputs = [];
	inputs.push('action=SetSpecialDiscount');
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;

			billBean = eval('(' + ajaxResponse + ')');
			$("#SpecialDiscount").setTemplate(specialDiscountTempForReg);
			$("#SpecialDiscount").processTemplate(billBean);

			$("#selCompany").setTemplate(specialDiscountTempForReg);
			$("#selCompany").processTemplate(billBean);

		}
	});

}

/** *****************************Start Causality******************************** */

var causalityPatientTemp = "{#foreach $T.pl as pl}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div	style='width: 7%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 41.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: left;' id='uname{count}'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn}{$T.pl.ln}</div><div id='divPi{count}' style='width: 16.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.pl.pi}</div><div style='width: 18%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;' >{$T.pl.rgDt}</div><div style='width: 12%; height: 25px;  padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='EDIT' class='edit' id='btnEdit{count}' onclick='passToEdit({$T.pl.pi})' /></div></div>{#/for}";

function fetchCausalityPatients() {
	var inputs = [];
	inputs.push('action=fetchCausalityPatients');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
	
			$("#allPatInfo").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#causalityDiv").setTemplate(causalityPatientTemp);
			$("#causalityDiv").processTemplate(pobj1);
		}
	});
}

function causalityPatientSearch() {
	var byName = $("#byName").val();
	var byId = $("#byId").val();
	var searchBy;
	var value;
	if (byName != "" && byId != "") {
		alert("please search either by UHID or by Patient Name");
	} else if (byName == "" && byId == "") {
		alert("Please Enter Patient Name Or UHID");
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}

		var inputs = [];
		inputs.push('action=causalityPatientSearch');
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + encodeURIComponent(value));
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(ajaxResponse);
				patientBean = eval('(' + ajaxResponse + ')');
				if (patientBean.pl.length == 0) {
					alert("Causality Patient details not found.");
				} else {
					count = 1;
					$("#causalityDiv").setTemplate(causalityPatientTemp);
					$("#causalityDiv").processTemplate(patientBean);
				}
			}
		});
	}
};

/** ***************************End Causality******************************** */

function printCard(pid) {
	ajaxResponse = $("#allPatInfo").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.pl.length; i++) {

		if (myArray.pl[i].pi == pid) {
			myObj = myArray.pl[i];
			break;
		}
	}

	myObj = JSON.stringify(myObj);
	myObj = JSON.parse(myObj);

	var WindowObject = window.open('', ' ', '');

	WindowObject.document
			.writeln('<html><style type="text/css" media="print"> @page { size: landscape; }</style><body style="width:100%; height: 100%; "><div style="width:100%; height: 100%; "><div	style="width: 100%; margin-top: 2.3cm;margin-left: 0.7cm; font-size: 12px;"><div>P N: '
					+ myObj.tit
					+ ''
					+ myObj.fn
					+ ' '
					+ myObj.mn
					+ ' '
					+ myObj.ln
					+ '</div><div>UHID: '
					+ myObj.pi
					+ '</div><div>Date: '
					+ myObj.rgDt
					+ '</div><div style="margin-top: 4px;"><img src="http://localhost:8080/EhatEnterprise/BarcodeServlet?pid='
					+ myObj.pi + '"></img></div></div></div></body></html>');

	WindowObject.document.close();

	WindowObject.focus();

	WindowObject.print();

	WindowObject.close();

}

function fetchHospitalDetailsPrint() {

	var inputs = [];
	inputs.push('action=fetchHospitalDetails');
	inputs.push('corporateId=' + "0");
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('error');
		},
		success : function(r) {
			// alert("hi");
			var ajaxResponseHosp = r;
			// pobj1 = eval('(' + ajaxResponse + ')');
			$("#hospDetails").html(ajaxResponseHosp);
			var hospDetails = eval('(' + ajaxResponseHosp + ')');
			var hosp = hospDetails.listHosDetail[0];
			$("#hospName").html(hosp.hn);
			$("#hospAdd").html(hosp.ha + "-" + hosp.hz);
			$("#contact").html(hosp.hcon);
			// $("#hospitaldetails").html(hospDetails.listHosDetail[0].hn);
			$("#hospitalLogo").attr('src', hosp.flpt);
		}
	});

}

function onclickChkRefDocDiv(){
	var checkedOrNot = $('#chkRefDoc').is(":checked");
	if(checkedOrNot){
		$("#doctorDiv").show();
		$("#txtDoctorDiv").hide();
	}else{
		$("#doctorDiv").hide();
		$("#txtDoctorDiv").show();
	}
}
function hideChkRefDocDiv(){
	$("#chkRefDocDiv").hide();
	$("#txtDoctorDiv").hide();
}
function showChkRefDocDiv(){
	$("#chkRefDocDiv").show();
}

function showSourceDiv() {
	$("#sourceDiv").show();
	// $("#empidDiv").hide();
}

function hideSourceDiv() {
	$("#sourceDiv").hide();
}

function showEmpIdDiv() {
	$("#empidDiv").show();
}

function hideEmpIdDiv() {
	$("#empidDiv").hide();
}

function referToReadOnly() {
	 $("#refTo").attr("disabled", true);
	$("#refTo").val("select");
	$("#mlc").attr("disabled", true);
	$("#mlcDiv2").hide();
	$("#firNo").val("");
	$("#authorityname").val("");
	$("#buccleNo").val("");
	$("#plStname").val("");
	$("#plAdress").val("");
}

function referToEnable() {
	$("#refTo").attr("disabled", false);
	$("#mlc").attr("disabled", false);
}
function showIpdDiv() {
	$("#ipdDiv").show();
	$("#admitIPD").show();

	dp_cal = new Epoch('epoch_popup', 'popup', document
			.getElementById('popup_container4'));
}

function hideIpdDiv() {
	$("#ipdDiv").hide();
	$("#admitIPD").hide();
}

function showmlcDiv() {
	if ($("#mlc").attr("checked")) {
		$("#mlcDiv2").show();
	} else {
		$("#mlcDiv2").hide();
		$("#firNo").val("");
		$("#authorityname").val("");
		$("#buccleNo").val("");
		$("#plStname").val("");
		$("#plAdress").val("");
	}
}

function hideDivPermanent() {

	if ($("#chkAddress").is(':checked'))
		$("#divPermanent").hide(); // checked
	else
		$("#divPermanent").show();
}

var featchDignoPatBillTemp_var = "<div class='col-sm-12-1'>"
		+ "<table class='table table-condensed' style='margin-top: 15px;'>"
		+ "<thead>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='padding-right: 25px;'><div class='TextFont'>UHID</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='padding-right: 30px;'><div class='TextFont'>Admission No</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='padding-right: 30px;'><div class='TextFont'>Reg Date</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='padding-right: 30px;'><div class='TextFont'>View Bill</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 430px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.pl as pl}"
		+ "<tr id='colorDiv{count}'>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.pi}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.objTreat.trCount}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.rgDt}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='BILL' id='btnBill{count}' onclick='viewDignoBill({$T.pl.trid})'>"
		+ "<i class='fa fa-eye View'></i>" + "</button>"
		+ "</td></tr>{#/for}</tbody></table></div>";

var featchDignoPatTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-condensed' style='margin-top: 15px;'>"
		+ "<thead>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='padding-right: 25px;'><div class='TextFont'>UHID</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='padding-right: 30px;'><div class='TextFont'>Admission No</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='padding-right: 30px;'><div class='TextFont'>Reg Date</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='padding-right: 30px;'><div class='TextFont'>Add Tests</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 430px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.pl as pl}"
		+ "<tr id='colorDiv{count}'>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.pi}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.objTreat.trCount}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.rgDt}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<input class='btn btn-xs btn-success' type='button' value='ADD TEST' id='btnAdd{count}' onclick='viewDiagnosticsPatientAssignTests({$T.pl.trid})' />"
		+ "</td></tr>{#/for}</tbody></table></div>";

/** ********fetch Doctor Specilizationd ************************** */

function featchDignoPatBill(type, pageName) {
	count = 1;
	var searchBy = "";
	var value = "";
	if (type == "search") {
		var byName = $("#byName").val().trim();
		var byId = $("#byId").val().trim();
		if (byName != "" && byId != "") {
			alert("Please Search  By Either UHID OR Patient Name!");
			return false;
		} else if (byName == " " && byId == " ") {
			alert("Please Enter Patient Name Or UHID");
			return false;
		} else if (byName == null && byId == null) {
			alert("Please Enter Patient Name Or UHID");
			return false;
		} else if (byName.length == 0 && byId.length == 0) {
			alert("Please Enter Patient Name Or UHID");
			return false;
		} else {
			if (byName != "") {
				searchBy = "byName";
				value = byName;
			} else if (byId != "") {
				searchBy = "byId";
				value = byId;
			}
		}
	}

	var inputs = [];
	inputs.push('action=featchDignoPatBill');
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + encodeURIComponent(value));
	inputs.push('type=' + type);
	inputs.push('pageName=' + pageName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#appointedpatientDiv").html(ajaxResponse);
			$("#registeredPatientDiv").html(ajaxResponse);
			PatientAppointmentsBean = eval('(' + ajaxResponse + ')');

			if (PatientAppointmentsBean.pl.length > 0) {
				if (pageName == "dignoAssigntest") {
					$("#container").setTemplate(featchDignoPatTemp);
					$("#container").processTemplate(PatientAppointmentsBean);
				} else {
					$("#container").setTemplate(featchDignoPatBillTemp_var);
					$("#container").processTemplate(PatientAppointmentsBean);
				}
			} else {
				if (type == "search") {
					alert("Patient Not Found");
				}
			}
		}
	});
};

//added by sagar........27-jul-2017
function viewDiagnosticsPatientAssignTests(treatmentId) {

	/*myArray = JSON.parse($("#registeredPatientDiv").html());
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].trid == treatmentId) {
			myObj = myArray.pl[i];
			break;
		}
	}

	var myObj1 = JSON.stringify(myObj);
	// alert(myObj1);
	window.location = "diagnosticPatientTestAssign.jsp?" + "myObj="
			+ encodeURIComponent(myObj1) + "&pageType=diagnosis";*/
	
	window.location.href = "diagnosticPatientTestAssign.jsp?" + "treatmentId="
	+ encodeURIComponent(treatmentId);
}

function viewDignoBill(trid) {
	var pageType = $("#pageType").html();

	ajaxResponse = $("#appointedpatientDiv").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.pl.length; i++) {

		if (myArray.pl[i].trid == trid) {

			myObj = myArray.pl[i];
			break;
		}
	}
	var tit = myObj.tit;
	var fn = myObj.fn;
	var discID = myObj.sdisc;
	var ln = myObj.ln;
	var pname = tit + " " + fn + " " + ln;
	var refBy = myObj.objTreat.rb;
	myObj = JSON.stringify(myObj);

	window.location = "diagnosisBill.jsp?" + "myObj="
			+ encodeURIComponent(myObj) + "&pname=" + pname + "&sdisc="
			+ discID + "&pageType=" + pageType + "&refBy=" + refBy;

}

function viewCasualityBill(trid) {
	var pageType = $("#pageType").html();

	ajaxResponse = $("#appointedpatientDiv").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.pl.length; i++) {

		if (myArray.pl[i].trid == trid) {

			myObj = myArray.pl[i];
			break;
		}
	}
	var tit = myObj.tit;
	var fn = myObj.fn;
	var discID = myObj.sdisc;
	var ln = myObj.ln;
	var pname = tit + " " + fn + " " + ln;
	var refBy = myObj.objTreat.rb;
	myObj = JSON.stringify(myObj);

	window.location = "CasualtyBill.jsp?" + "myObj="
			+ encodeURIComponent(myObj) + "&pname=" + pname + "&sdisc="
			+ discID + "&pageType=" + pageType + "&refBy=" + refBy;

}

/** ************************************************************* */
/** ********IPD Services********************************* */

function saveIPDServNusring(){

	var quantity     =  1;
		// Bed Side Procedures
		var eleArrBedSide = null;

		// in Gases and Monitors
		var eleArrGas = null;

		// in Instruments and Equipments
		var eleArrInstrument = null;

		// Bed Side Procedures
		eleArrBedSide =  $("#txtEqQtyb1").val() ;
		if (($("#txtEqNameb1TestID").val()) == "")
			eleArrBedSide = "";

		// in Gases and Monitors
		eleArrGas = $("#txtEqQtyg1").val();
		if (($("#txtEqNameg1TestID").val()) == "")
			eleArrGas = "";
		//alert($("#txtEqNamei1TestID").val());

		// in Instruments and Equipments
		eleArrInstrument =$("#txtEqQtyi1").val() ;
		if (($("#txtEqNamei1TestID").val()) == "")
			eleArrInstrument = "";

		//alert(className);
		if (eleArrBedSide == "") {
			if (eleArrGas == "") {
				if (eleArrInstrument == "") {
					alert("Please enter atleast one valid service...");
					return false;
				}
			}
		}
		var classNameb = $('#Bed_Side_ProceduresTab').attr('class');
		var classNameg = $('#Gases_and_MonitorsTab').attr('class');
	 	var classNamei = $('#Instruments_and_EquipmentsTab').attr('class');
	 	
		var emrPer=$("#emrPer").val();
		if (emrPer == "" || emrPer == null || emrPer == undefined || isNaN(emrPer)) {
			emrPer=0;
		}

	  var values=0;
		
		if (classNameb=="active")
		{  
			values=6;
			if (($("#txtEqQtyb1").val()).trim() == "" || ($("#txtEqQtyb1").val()).trim() == 0) {
				alert("Please enter quantity for Bed Side Procedure...");
				SetFocus("txtEqQtyb1");
				eleArrBedSide = "";
				return false;
			}
			subserviceid = $("#txtEqNameb1TestID").val();
			quantity=$("#txtEqQtyb1").val() ;
		}

		if (classNameg=="active") {
			values=7;
			if (($("#txtEqQtyg1").val()).trim() == "" || ($("#txtEqQtyg1").val()).trim() == 0) {
				alert("Please enter quantity for Gases and Monitors...");
				SetFocus("txtEqQtyg1");
				eleArrGas = "";
				return false;
			}
			subserviceid = $("#txtEqNameg1TestID").val();
			quantity=$("#txtEqQtyg1").val() ;
		}

		if (classNamei=="active") {
			
			values=8;
			if (($("#txtEqQtyi1").val()).trim() == "" || ($("#txtEqQtyi1").val()).trim() == 0) {
				alert("Please enter quantity for Instruments and Equipments...");
				SetFocus("txtEqQtyi1");
				eleArrInstrument = "";
				return false;
			}
			subserviceid = $("#txtEqNamei1TestID").val();
			quantity=$("#txtEqQtyi1").val() ;
		}


		var queryType 	 = "insert";
		var module 	 = "OT";
		//var	patienttId   =  $("#patientId").text();
		var	patienttId   =  $("#pt_Id").val();
		var treatmentId  =  $("#tr_Id").val();  
		var	departmentId =  2;
		var billId       =  $("#bill_Id").val();  
		var	sourceTypeId =  1;
      	var serviceId    =  values;
		var subServiceId =  subserviceid;
        var rate = 0;
		var otherRate=0;
		var otherAmount=0;
		var sponsorId = $("#SponsorsourceTypeId").val();
		var chargesSlaveId = $("#chargesSlaveId").val();
		var txting1 = $("#txting1").val();
		var txtoutg1 = $("#txtoutg1").val();
	/*		getchargesNS(subServiceId);
			if (sponsorId > 0 && chargesSlaveId > 0) {
			otherRate = $("#chargesfromConfNS").val();
			}
			if(otherRate== 0 || otherRate== 0.0){
				otherRate =	$("#txtcategorycharges").val();
				
			}*/
		
		if (sponsorId > 0 && chargesSlaveId > 0) {
			receiptOf="sponsor";
			getchargesDRNST(0);
			otherRate = parseFloat($("#chargesfromConfNS").val());
			if(otherRate== 0 || otherRate== 0.0){
				getchargesDRNST(2);
				otherRate =	parseFloat($("#chargesubservice").val());
				}
			if(otherRate== 0 || otherRate== 0.0){
				
				otherRate =	parseFloat($("#chargesubservice").val());
				
			}
	
			otherAmount=otherRate *quantity;
			
		}
			
		
			rate =	$("#txtcategorycharges").val();	
		
		
		
		var amount       =  rate * quantity;  
		
		var billDetailsId     = $("#idbillipd").val();
	    
	    var unitId            = $("#unitId").val();
	    var doctorId          = 0;                         
	    var clinicalNotes     = "-";
	    var instructions      ="-";
	    var urgentflag='N';
	    var ot_flag='N';
	    var drdeskflag='N';
	    var coPay        = amount;
	    
	    var callfrom="DrDeskNS";
	
		if(unitId==null || unitId==""){
			unitId=1;
		}
		
		var serviceDetails = {
				listBillDetailsIpd : []
	        };
		serviceDetails.listBillDetailsIpd.push({
			billDetailsId:billDetailsId,
			patienttId : patienttId,
	        treatmentId : treatmentId,
	        departmentId : departmentId,
	        billId : billId,
	        sourceTypeId : sponsorId,
	        chargesSlaveId:chargesSlaveId,
	        rate : rate,
	        quantity : quantity,
	        amount : amount,
	        serviceId : serviceId,
	        subServiceId : subServiceId,
	      
	        doctorId:doctorId,
	        urgentFlag:urgentflag,
	        clinicalnotes:clinicalNotes,
	        instructions:instructions,
	        unitId : unitId,
	        ot_flag:ot_flag,
	        coPay  :coPay,
	        drdeskflag:drdeskflag,
	        callfrom : callfrom,
	        otherRate : otherRate,
	        otherAmount : otherAmount,
	        otherPay :otherAmount,
	        onBedFlag:"N",
	        emrPer:emrPer,
	        fromdate : txting1,
	        tomdate  : txtoutg1
	    });
	    
	    serviceDetails = JSON.stringify(serviceDetails);
		
		var inputs = [];
		inputs.push('module=' + module);
		inputs.push('queryType=' + queryType);
		inputs.push('serviceDetails=' + serviceDetails);
		inputs.push('callfrom=' + callfrom);
		/*inputs.push('billDetailsId=' + billDetailsId);
		inputs.push('patienttId=' + patienttId);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('sourceTypeId=' + sourceTypeId);
		inputs.push('billId=' + billId);
		inputs.push('amount=' + amount);
		inputs.push('quantity=' + quantity);
		inputs.push('departmentId=' + departmentId);
		inputs.push('rate=' + rate);
		inputs.push('subServiceId=' + subServiceId);
		inputs.push('serviceId=' + serviceId);
		inputs.push('unitId=' + unitId);
		inputs.push('doctorId=' + doctorId);
		
		
		inputs.push('ClinicalNotes=' + ClinicalNotes);
		inputs.push('instructions=' + instructions);
		inputs.push('urgentflag=' + urgentflag);*/
		
			var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/doctordesk/saveCpoe",
		
			success : function(r) {
				
				 
			if(r >0){
				alert("Service assign Successfully");
				refreshIPDServices(values);
				}
			}	
			
		});
		

}


function saveIPDServices() {
//old
	//var trid = $("#trid").html();
	
	//new trid
	var trid= $("#tid").val();
//	var idtriServices = $("#idtriServices").val();
	var idtriServices = $("#idtriServices").val();
	var queryType = $("#queryType").val();

	var pobj = $("#divPatId").html();
	operationobj = eval('(' + pobj + ')');
//old	
	//var hallid = operationobj.oBed.hi;
//new	
	var hallid =0;
	// Bed Side Procedures
	var eleArrBedSide = null;

	// in Gases and Monitors
	var eleArrGas = null;

	// in Instruments and Equipments
	var eleArrInstrument = null;

	// Bed Side Procedures
	eleArrBedSide = ($("#txtEqNameb1TestID").val()) + "-"
			+ ($("#txtEqQtyb1").val()) + "_"
			+ ($("#txtEqNameb1AssignedBy").val());
	if (($("#txtEqNameb1TestID").val()) == "")
		eleArrBedSide = "";

	// in Gases and Monitors
	eleArrGas = ($("#txtEqNameg1TestID").val()) + "-"
			+ ($("#txtEqQtyg1").val()) + "_"
			+ ($("#txtEqNameg1AssignedBy").val());
	if (($("#txtEqNameg1TestID").val()) == "")
		eleArrGas = "";
	//alert($("#txtEqNamei1TestID").val());

	// in Instruments and Equipments
	eleArrInstrument = ($("#txtEqNamei1TestID").val()) + "-"
			+ ($("#txtEqQtyi1").val()) + "_"
			+ ($("#txtEqNamei1AssignedBy").val());
	if (($("#txtEqNamei1TestID").val()) == "")
		eleArrInstrument = "";

	//alert(className);
	if (eleArrBedSide == "") {
		if (eleArrGas == "") {
			if (eleArrInstrument == "") {
				alert("Please enter atleast one valid service...");
				return false;
			}
		}
	}
	var classNameb = $('#Bed_Side_ProceduresTab').attr('class');
	var classNameg = $('#Gases_and_MonitorsTab').attr('class');
 	var classNamei = $('#Instruments_and_EquipmentsTab').attr('class');

  var values=0;
	
	if (classNameb=="active")
	{  
		values=6;
		if (($("#txtEqQtyb1").val()).trim() == "" || ($("#txtEqQtyb1").val()).trim() == 0) {
			alert("Please enter quantity for Bed Side Procedure...");
			SetFocus("txtEqQtyb1");
			eleArrBedSide = "";
			return false;
		}
	}

	if (classNameg=="active") {
		values=7;
		if (($("#txtEqQtyg1").val()).trim() == "" || ($("#txtEqQtyg1").val()).trim() == 0) {
			alert("Please enter quantity for Gases and Monitors...");
			SetFocus("txtEqQtyg1");
			eleArrGas = "";
			return false;
		}
	}

	if (classNamei=="active") {
		
		values=8;
		if (($("#txtEqQtyi1").val()).trim() == "" || ($("#txtEqQtyi1").val()).trim() == 0) {
			alert("Please enter quantity for Instruments and Equipments...");
			SetFocus("txtEqQtyi1");
			eleArrInstrument = "";
			return false;
		}
	}

	var inputs = [];
	inputs.push('action=saveIPDServices');
	// inputs.push('deleted=' + delSer); *not used
	inputs.push('eleArrBedSide=' + encodeURIComponent(eleArrBedSide));
	inputs.push('eleArrGas=' + encodeURIComponent(eleArrGas));
	inputs.push('eleArrInstrument=' + encodeURIComponent(eleArrInstrument));
	inputs.push('trid=' + trid);
	inputs.push('idtriServices=' + idtriServices);
	inputs.push('hallid=' + hallid);
	inputs.push('queryType=' + queryType);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			refreshIPDServices(values);
			// window.location.href = "IPD_IPDServicesDashboard.jsp";
			// window.location.reload();
		}
	});
}

function refreshIPDServices(values) {
	$("#txtEqNameb1").val("");
	$("#txtEqNameb1").prop("readonly", false);
	$("#txtEqQtyb1").val("");
	$("#txtEqNameb1TestID").val("");
	$("#txtEqNameb1AssignedBy").val("0");

	$("#txtEqNameg1").val("");
	$("#txtEqNameg1").prop("readonly", false);
	$("#txtEqQtyg1").val("");
	$("#txtEqNameg1TestID").val("");
	$("#txtEqNameg1AssignedBy").val("0");

	$("#txtEqNamei1").val("");
	$("#txtEqNamei1").prop("readonly", false);
	$("#txtEqQtyi1").val("");
	$("#txtEqNamei1TestID").val("");
	$("#txtEqNamei1AssignedBy").val("0");
if(values > 0){
	fetchIpdServices(values);	
}
	
}

function fetchIpdServices(values) {
//alert("hi");
	var trid = $("#trid").html();

	var inputs = [];
	//inputs.push('action=fetchIpdServices');
	inputs.push('trid=' + trid);
	inputs.push('serviceid=' + values);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "./ehat/ipdhistory/fetchIpdServices",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r) {
					ajaxResponse = r;
					 
				  resp =	eval('(' + ajaxResponse + ')');
					console.log(r);
					 
					//alert(resp.cpoedetails[0].categoryName);
			var htm="";	 
				//alert(resp.cpoedetails.length);
				for ( var k = 0; k < resp.cpoedetails.length; k++) {

					/*if (servicesList[k].ipdservicetype == "B" || servicesList[k].ipdservicetype == "b") {
						particularName = $("#bsp").html();
					} else if (servicesList[k].ipdservicetype == "g") {
						particularName = $("#gm").html();
					} else {
						particularName = $("#ie").html();
					}

					// remove \n
					particularName = particularName.replace(/\n/g,
							"");

					// remove multiple white spaces
					particularName = particularName.replace(/\s+/g,
							' ');
*/
					/*var checkboxID = (servicesList[k].test_ID + "-"
							+ servicesList[k].qty + "_" + servicesList[k].asignBy);

					var divId = "divIPDSerives" + k;
					var x = document.createElement('tr');
					x.setAttribute('id', divId);
					document.getElementById("ipdServiceSum")
							.appendChild(x);*/
					var dt=new Date(resp.cpoedetails[k].created_date_time).toLocaleString();
					htm =htm+ '<tr> '
							+ '<td style="height: 21.5px; width: 5%;">'
							+ (k + 1)
							+ '</td>'
							+ '<td style="height: 21.5px; width: 30%;">'
							+ resp.cpoedetails[k].categoryName
							+ '<input type="hidden" id="caName'+ k +'" value="'+ resp.cpoedetails[k].categoryName  +'" />'
							+ '<input type="hidden" id="caid'+ k +'" value="'+ resp.cpoedetails[k].categoryid  +'" />'
                            + '<input type="hidden" id="caQty'+ k +'" value="'+ resp.cpoedetails[k].quantity  +'" />'
                            + '<input type="hidden" id="frdate'+ k +'" value="'+ resp.cpoedetails[k].fromdate  +'" />'
                            + '<input type="hidden" id="todate'+ k +'" value="'+ resp.cpoedetails[k].tomdate  +'" />'

                            + '</td>'
							+ '<td style="height: 21.5px; width: 18%;">'
							+ resp.cpoedetails[k].servicename
							+ '</td>'
							+ '<td style="height: 21.5px; width: 7%;text-align: center;">'
							+  resp.cpoedetails[k].quantity
							+ '</td>'
							+ '<td style="height: 21.5px; width: 20%;text-align: center;">'
							+  resp.cpoedetails[k].docName
							+ '</td>'
							+ '<td style="height: 21.5px; width: 14%;">'
							+ dt
							+ '</td>'
							+ '<td style="height: 21.5px; width: 14%;">'
							+ '<button value="EDI" onclick="editIPDServices('+k+','+  resp.cpoedetails[k].serviceid +')" class="btn btn-xs btn-success" >'
							+'<i class="fa fa-edit"></i></button></td>'	
							+ '<td style="height: 21.5px;text-align: center;">'
							+ '<input id="checkbox_'
							+ k
							+ '" type="checkbox" class="ipdServiceDelete" onclick="chkUnchkChkBox('
							+ k
							+ ','+  resp.cpoedetails[k].serviceid +')"'
							+ 'value="'+ resp.cpoedetails[k].billipd_id  +'" '
 							+ '" style="margin-top: 2px; margin-left: 0px;" />'
 							+ '<input type="hidden" id="bidipd'+ k +'" value="'+ resp.cpoedetails[k].billipd_id  +'" />'

							+ '</td>'
							+ '</tr>';

					// 171-2_2499 == (test_ID)-(qty)_(asignBy);
				} // end of for loop
				//alert(htm);
				$("#ipdServiceSum").html(htm);
 				//$("#queryType").val("update");
				var preTreat = $("#preTreat").val();
				if(preTreat=="Y"){
					
					setTimeout(function() {
				        $('#IPD_Services').find('.editUserAccess').remove("onclick");
				        $('#IPD_Services').find('button,input,select').attr('disabled', 'disabled');}, 200);
					
				}
			} // end of if loop
				
				
					/*$("#servicesList").html(ajaxResponse);

					var serviceResponse = eval('(' + ajaxResponse + ')');

					if (serviceResponse.isli.length != 0) {
						if (serviceResponse.isli[0].liservices.length != 0) {
							var servicesList = serviceResponse.isli[0].liservices;
							var particularName = null;

							$("#servicesListLength").val(servicesList.length);

							document.getElementById("ipdServiceSum").innerHTML = "";

							for ( var k = 0; k < servicesList.length; k++) {

								if (servicesList[k].ipdservicetype == "B" || servicesList[k].ipdservicetype == "b") {
									particularName = $("#bsp").html();
								} else if (servicesList[k].ipdservicetype == "g") {
									particularName = $("#gm").html();
								} else {
									particularName = $("#ie").html();
								}

								// remove \n
								particularName = particularName.replace(/\n/g,
										"");

								// remove multiple white spaces
								particularName = particularName.replace(/\s+/g,
										' ');

								var checkboxID = (servicesList[k].test_ID + "-"
										+ servicesList[k].qty + "_" + servicesList[k].asignBy);

								var divId = "divIPDSerives" + k;
								var x = document.createElement('tr');
								x.setAttribute('id', divId);
								document.getElementById("ipdServiceSum")
										.appendChild(x);
								document.getElementById(divId).innerHTML = '<td style="height: 21.5px; width: 5%;">'
										+ (k + 1)
										+ '</td>'
										+ '<td style="height: 21.5px; width: 30%;">'
										+ servicesList[k].tname
										+ '</td>'
										+ '<td style="height: 21.5px; width: 18%;">'
										+ particularName
										+ '</td>'
										+ '<td style="height: 21.5px; width: 7%;text-align: center;">'
										+ servicesList[k].qty
										+ '</td>'
										+ '<td style="height: 21.5px; width: 20%;text-align: center;">'
										+ servicesList[k].assignUserName
										+ '</td>'
										+ '<td style="height: 21.5px; width: 14%;">'
										+ servicesList[k].assignDateTime
										+ '</td>'
										+ '<td style="height: 21.5px;text-align: center;">'
										+ '<input id="checkbox_'
										+ k
										+ '" type="checkbox" onclick="chkUnchkChkBox('
										+ k
										+ ')"'
										+ 'value="'
										+ checkboxID
										+ '" style="margin-top: 2px; margin-left: 0px;" />'
										+ '</td>';

								// 171-2_2499 == (test_ID)-(qty)_(asignBy);
							} // end of for loop
							$("#idtriServices").val(
									serviceResponse.isli[0].isid);
							$("#queryType").val("update");

						} // end of if loop
					}*/		
				
				});
}
function editIPDServices(value, serviceid){
	

	
	var prname=$("#caName"+ value +"").val();
	var caid =$("#caid"+ value +"").val();
	var ipdbillid=$("#bidipd"+ value +"").val();
	var qtyph=$("#caQty"+ value +"").val();
	if(serviceid==6){
		$("#txtEqNameb1TestID").val(caid);
		$("#txtEqNameb1").val(prname);
		$("#txtEqQtyb1").val(qtyph);
		$("#txtEqNameb1").prop("readonly", true);
	    $("#idbillipd").val(ipdbillid);
	
	}else if(serviceid==7){
		var frdate=$("#frdate"+ value +"").val();
		var todate =$("#todate"+ value +"").val();
		if(frdate==undefined){
		frdate="00.00";
		}
	if(todate==undefined){
		todate="00.00";
		}
		
		$("#txting1").val(frdate);
		$("#txtoutg1").val(todate);
		$("#txtEqNameg1TestID").val(caid);
		$("#txtEqNameg1").val(prname);
		$("#txtEqQtyg1").val(qtyph);
		$("#txtEqNameg1").prop("readonly", true);
		 $("#idbillipd").val(ipdbillid);
		
	}else{
		$("#txtEqNamei1TestID").val(caid);
		$("#txtEqNamei1").prop("readonly", true);
		$("#txtEqNamei1").val(prname);
		$("#txtEqQtyi1").val(qtyph);
		 $("#idbillipd").val(ipdbillid);
	}
	
}
/*function editIPDServices() {

	var counter = 0;
	var ipdServiceID = null;
	var exitFlag = false;
	$('#ipdServiceSum tr').each(function() {
		var len = $(this).find('input[type=checkbox]:checked').length;
		if (len == 1) {
			ipdServiceID = $('#checkbox_' + counter).val();
			exitFlag = true;
		}
		counter++;
	});

	if (exitFlag == false) {
		alert("please check the checbox and edit");
		return;
	}

	ipdServiceID = ipdServiceID.split("_")[1];

	var ajaxResponse = $("#servicesList").html();
	var serviceResponse = eval('(' + ajaxResponse + ')');

	if (serviceResponse.isli.length != 0) {
		if (serviceResponse.isli[0].liservices.length != 0) {
			var servicesList = serviceResponse.isli[0].liservices;

			for ( var k = 0; k < servicesList.length; k++) {

				if (ipdServiceID == servicesList[k].asignBy) {

					if (servicesList[k].ipdservicetype == "b" || servicesList[k].ipdservicetype == "B") {
						$("#txtEqNameb1").val(servicesList[k].tname);
						$("#txtEqNameb1").prop("readonly", true);
						$("#txtEqNameb1TestID").val(servicesList[k].test_ID);
						$("#txtEqNameb1AssignedBy")
								.val(servicesList[k].asignBy);
						$("#txtEqQtyb1").val(servicesList[k].qty);

					} else if (servicesList[k].ipdservicetype == "g") {
						$("#txtEqNameg1").val(servicesList[k].tname);
						$("#txtEqNameg1").prop("readonly", true);
						$("#txtEqNameg1TestID").val(servicesList[k].test_ID);
						$("#txtEqNameg1AssignedBy")
								.val(servicesList[k].asignBy);
						$("#txtEqQtyg1").val(servicesList[k].qty);

					} else {
						$("#txtEqNamei1").val(servicesList[k].tname);
						$("#txtEqNamei1").prop("readonly", true);
						$("#txtEqNamei1TestID").val(servicesList[k].test_ID);
						$("#txtEqNamei1AssignedBy")
								.val(servicesList[k].asignBy);
						$("#txtEqQtyi1").val(servicesList[k].qty);

					}
				}
			}
		}
	}
}*/

/*function deleteIPDServices(){

	var counter = 0;
	var ipdServiceID = null;
	var exitFlag = false;

	$('#ipdServiceSum tr').each(function() {
		var len = $(this).find('input[type=checkbox]:checked').length;
		if (len == 1) {
			ipdServiceID = $('#checkbox_' + counter).val();
			exitFlag = true;
		}
		counter++;
	});

	if (exitFlag == false) {
		alert("please check the checbox and delete");
		return;
	}

	var r = confirm("Are you Sure to Delete the Service...");
	if (r == true) {

		ipdServiceID = ipdServiceID.split("_")[1];
		var trid = $("#trid").html();
 
		var ajaxResponse = $("#servicesList").html();
		//alert(ajaxResponse);
		//var serviceResponse = eval('(' + ajaxResponse + ')');

		if (serviceResponse.isli.length != 0) {
			if (serviceResponse.isli[0].liservices.length != 0) {
				var servicesList = serviceResponse.isli[0].liservices;

				for ( var k = 0; k < servicesList.length; k++) {

					if (ipdServiceID == servicesList[k].asignBy) {

						var inputs = [];
						inputs.push('action=deleteIPDServices');
						inputs.push('trid=' + trid);
						inputs.push('testIDQty=' + ipdServiceID);
						inputs.push('ipdservicetype='
								+ servicesList[k].ipdservicetype);

						var str = inputs.join('&');
						jQuery.ajax({
							async : true,
							type : "POST",
							data : str + "&reqType=AJAX",
							url : "PatientServlet",
							timeout : 1000 * 60 * 5,
							catche : false,
							error : function() {
								// alert("error");
							},
							success : function(r) {
								ajaxResponse = r;
								alert(ajaxResponse);
								// refreshIPDServices();
								window.location.reload();
							}
						});
					}
				}
			}
		}
	}
}*/


// Mohd Tarique Aalam
function deleteIPDServices(){
	
	
	var ipdServiceID = [];
	$('input[class=ipdServiceDelete]:checked').each(function() {
		//alert($(this).val());
		ipdServiceID.push($(this).val());
	});
	
	var trid = $("#trid").html();
	
	var inputs = [];
	inputs.push('action=deleteIPDServices');
	inputs.push('ipdServiceID='+ipdServiceID);
	inputs.push('trid=' + trid);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			// refreshIPDServices();
			window.location.reload();
		}
	});
}


/** ***************IPD Services*************************** */
function setGender(callfrom) {

	var title = "";
	if (callfrom == 'demo') {
		title = $("#title").val();
	} else if (callfrom == 'ipd') {
		title = $("#relativeTitle").val();
	} else if (callfrom == 'er') {
		title = $("#erInformerTitle").val();
	} else if (callfrom == 'mlc') {
		title = $("#mlcInformerTitle").val();
	} else if (callfrom == 'sponsor') {
		title = $("#insuredTitle").val();
	}else if (callfrom == 'ehat_patient') {
		title = $("#prefix").val();
	}

	var inputs = [];
	inputs.push('title=' + title);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/fetchTitleGender",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('error');
		},
		success : function(r) {
			
			var gender= r;//eval('('+ r +')');		
			if(gender != "N/A"){
				if (callfrom == 'demo') {
					$("#sex").val(gender);
				} else if (callfrom == 'ipd') {
					$("#relativeSex").val(gender);
				} else if (callfrom == 'er') {
					$("#erInformerSex").val(gender);
				} else if (callfrom == 'mlc') {
					$("#mlcInformerSex").val(gender);
				} else if (callfrom == 'sponsor') {
					$("#insuredSex").val(gender);
				}else if (callfrom == 'ehat_patient') {
					//$("#gender").val(gender);
					$("#gender").select2('val',gender);
				}
		
			}else{
				if (callfrom == 'demo') {
					$("#sex").val("");
				} else if (callfrom == 'ipd') {
					$("#relativeSex").val("");
				} else if (callfrom == 'er') {
					$("#erInformerSex").val("");
				} else if (callfrom == 'mlc') {
					$("#mlcInformerSex").val("");
				} else if (callfrom == 'sponsor') {
					$("#insuredSex").val("");
				}else if (callfrom == 'ehat_patient') {
					$("#gender").val("");
				}				
			}
		}
	});
}

var consentTemplate = "	{#foreach $T.pl as pl}	<tr>		<td style='height: 21.5px;' class='col-md-1 center'>{count++}.</td>		<td style='height: 21.5px;' class='col-md-2-1'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>	<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.pi}</td>		<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.objTreat.trCount}</td>		<td style='height: 21.5px;' class='numeric col-md-1 center'>"
		+ "<button value='VIEW' style='height: 21.5px;' onClick='viewConsentForm({$T.pl.pi},{$T.pl.trid})'><i class='fa fa-eye View' class='edit'></i></button></td></tr>	{#/for}";

function displayPatient(type) {

	var searchBy;
	var value;
	if (type == "button") {
		var byName = $("#byName").val();
		var byId = $("#byId").val();
		if (byName == "" && byId == "") {
			alert("Please Enter Patient Name Or UHID for search");
			return false;
		} else if (byName != "" && byId != "") {
			alert("Please Enter Either Patient Name Or UHID for search");
			return false;
		} else if (byName.charAt(0) == " " || byId.charAt(0) == " ") {
			alert("Patient Name Or UHID can't start with space...!");
			return false;
		}

		if (byName != "") {
			value = byName;
			searchBy = "byName";
		} else {
			value = byId;
			searchBy = "byId";
		}
	} else {

	}

	var input = [];
	input.push('action=DisplayTopPatientForConsent');
	input.push('type=' + type);
	input.push('searchBy=' + searchBy);
	input.push('value=' + value);
	input.push('page_name=databaseForConsentForm');

	var str = input.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			patientBean = eval('(' + ajaxResponse + ')');
			if (patientBean.pl.length == 0) {
				if (type != "onload") {
					alert("Patient details not found.");
					$("#byName").val("");
				}
			} else {
				$("#patientobject").html(ajaxResponse);
				/*
				 * $("#containerforConsent").setTemplate(consentTemplate);
				 * $("#containerforConsent").processTemplate();
				 */
				$("#containerforConsent").setTemplate(consentTemplate);
				$("#containerforConsent").processTemplate(patientBean);
				$("#byName").val("");
			}
		}
	});
}

function saveConsentForm() {

	var queryType = $("#queryTypeicf").val();
	var tid = $("#tid").val();

	var templateData = CKEDITOR.instances['editor1'].getData();

	var idipdConsentForm = $("#idipdConsentForm").val();
	var idCustomizeTemplate = $("#selCustomizeTemp").val();

	var inputs = [];
//	inputs.push('action=saveConsentForm');
	inputs.push('queryType=' + queryType);
	inputs.push('idCustomizeTemplate=' + idCustomizeTemplate);
	inputs.push('tid=' + tid);
	inputs.push('templateData=' + encodeURIComponent(templateData));
	inputs.push('idipdConsentForm=' + idipdConsentForm);
	var str = inputs.join('&');

	if(templateData =="select" || templateData=="" || templateData==null){
		alert("Please Enter templateData!");
		return false;
	}
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "./ehat/ipdhistory/saveConsentForm",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			alert(r);
			/*
			 * if (ajaxResponse == " Form is Saved" || ajaxResponse == " Form is
			 * Updated") {
			 */
			featchAllConsentFormForTreatment();
			// }
			//window.location.reload(true);
		}
	});
}

function featchAllConsentFormForTreatment(callfrom) {
	var tid =0;
	if(callfrom == 'previous'){
		var tid = $("#tr_Id").val();
	}else{
		 tid = $("#tid").val();
	}
	

	var inputs = [];
	//inputs.push('action=featchAllConsentFormForTreatment');
	inputs.push('tid=' + tid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "./ehat/ipdhistory/featchAllConsentFormForTreatment",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			ajaxResponse = r;
			$("#allConcentForm").html(encodeURIComponent(ajaxResponse));
			patientBean = eval('(' + ajaxResponse + ')');
			
			$("#allConcentFormDiv")
					.setTemplate($("#allConcentFormTemp").html());
			$("#allConcentFormDiv").processTemplate(patientBean);
		}
	});

}

function setConsentFormbyIdICF(idicf) {

	// remove classes from all
	$("a").removeClass("icf");
	// add class to the one we clicked
	$("#anch" + idicf).addClass("icf");

	$("#queryTypeicf").val("update");
	var ajaxResponse = $("#allConcentForm").html();

	ajaxResponse = decodeURIComponent(ajaxResponse);
	var myArray = eval('(' + ajaxResponse + ')');

	for ( var i = 0; i < myArray.icfli.length; i++) {
		if (myArray.icfli[i].idicf == idicf) {
			myObj = myArray.icfli[i];
			break;
		}
	}

	$("#idipdConsentForm").val(idicf);
	$("#selCustomizeTemp").val(myObj.idct);
	// tinyMCE.get('editor1').setContent(myObj.tempdata);
	CKEDITOR.instances['editor1'].setData(myObj.tempdata);
}
//Added by Akshata
function featchPreviousICFpat(type) {

	count = 0;

	var unitId=1;
	var searchBy = "";
	var value = "";
	if (type == "search") {
		var byName = $("#byName").val();
		var byId = $("#byId").val();
		if (byName == "" && byId == "") {
			alert("Please enter Patient Name Or UHID for search");
			return false;
		} else if (byName != "" && byId != "") {
			alert("Please Enter Either Patient Name Or UHID");
			return false;
		}
		if (byName != "") {
			value = byName;
			searchBy = "byName";
		} else {
			value = byId;
			searchBy = "byId";
		}
	}

	var inputs = [];
	//inputs.push('action=featchPreviousICFpat');
	// inputs.push('strValue=' + strValue);
	inputs.push('type=' + type);
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + value);
	inputs.push('unitId=' + unitId)
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdhistory/featchPreviousICFpat",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			otPrevRecordsTemp_updated(ajaxResponse)
			
			/*$("#prevOPDBillObj").html(ajaxResponse);
			//patientBean = eval('(' + ajaxResponse + ')');
			if (ajaxResponse.length == 0) {
				if (type != "onload") {
					alert("Patient details not found.");
				}
			} else {
				$("#container").setTemplate(IPCPat_temp);
				$("#container").processTemplate(ajaxResponse);

				var rowCount = $("#rowCount").val();

				for ( var i = 1; i <= rowCount; i++) {

					$("#patPreOPDBill" + i).hide();
				}
			}
			$("#byName").val("");*/
		}
	});
}
//Added by Akshata
function otPrevRecordsTemp_updated(r){
	
	//	alert("r.lstRegviewDto.length... "+r.lstRegviewDto.length)
	 
	var htm = "<div class='col-sm-12-1'>"
		+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
		+ "<thead>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Mobile No</div></th>"

		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>UHID</div></th>"
		//+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"

		+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>View Consent Form</div></th>"
		 
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>";

var index = 1;	

htm =htm+ "<tbody>"	;
for ( var i = 0; i < r.length;i++) {

var patient_name = r[i].tit+" "+r[i].fn+" "+r[i].mn+" "+r[i].ln;
	htm= htm
	+ "<tr id='div123"+ r[i].pi+"'>"
	+ "<td style='height: 21.5px;' class='col-md-1 center'>"+index+"</td>"
	+ "<td style='height: 21.5px;' class='col-md-4 '>"+ patient_name+"</td>"
	+ "<td style='height: 21.5px;' class='col-md-2 center'>"+ r[i].mb+"</td>"

	+ "<td style='height: 21.5px;' class='col-md-1 center'>"+ r[i].pi+"</td>"
	//+ "<td style='height: 21.5px;' class='col-md-2 center'>"+datetime+"</td>"
	+ "<td style='height: 21.5px;' class='col-md-2 center' onclick='hideShowPreOPDBillOT("+ r[i].pi+")'>"
	+ "<img src='images/down.png' id='imgupdown"+ r[i].pi+"' />"
	+ "<input type='hidden' id='hideShowStatus123"+ r[i].pi+"' value='0' /><input type='hidden' id='patientDOB123' value='"+ r[i].pi+"' /></td>"
		
	+ "</tr>"
	+ "</tbody></table>"
			+ "<tr id='patPreOPDBill123"+ r[i].pi+"' style='width:0%;float:right'><td style='display:none' id='td123"+ r[i].pi+"'>"
					+ "<table class='table table-bordered table-striped header-fixed cf TextFont' style='Width: 45%; margin-top: 0px; margin-left: 577px;' class='col-md-1 center'>"
						+ "<tbody1 id='xyz"+ r[i].pi+"'>"
							+ "<tr>"
							+ "<th style='height: 21.5px;' class='col-md-2 center'>Treatment ID</th>"
							+ "<th style='height: 21.5px;' class='col-md-3 center'>Admission no.</th>"
							+ "<th style='height: 21.5px;' class='col-md-3 center'>Treatment Start Date</th>"
							+ "<th style='height: 21.5px;' class='col-md-3 center'>Consulting Doctor</th>"
							+ "<th style='height: 21.5px;' class='col-md-1 center'>Action</th>"
							+ "</tr>"
						+ "</tbody1>"
					+ "</table>"
				+ "</td></tr>";

		index++;

}

$("#prevOPDBillObj").html(htm);
}
//Added by Akshata
function goToPrevConsentForm(treatId, pid) {

	var ajaxResponse = $("#prevOPDBillObj").html();
	//var myArray = JSON.parse(ajaxResponse);

	/*for ( var i = 0; i < ajaxResponse.length; i++) {

		if (ajaxResponse[i].pi == pid) {

			myObj = ajaxResponse[i];
			break;
		}
	}*/

	myObj = JSON.stringify(ajaxResponse);

	window.location.href = "ipd_ConsentFormPrev.jsp?" + "patientId=" + pid
			+ "&myObj=" + encodeURIComponent(myObj) + "&treatId=" + treatId;
}

function setCommonPatInfoForPICF() {

	var pobj = $("#divPatId").html();
	var tid = $("#tid").html();
	var myarr = "";
	pobj1 = eval('(' + pobj + ')');

	for ( var i = 0; i < pobj1.lit.length; i++) {

		if (pobj1.lit[i].ti == tid) {

			myarr = pobj1.lit[i].lip[0];
			break;
		}
	}

	$("#commonPatInfo").setTemplate($("#setCommonPatInfoForPICFtemp").html());

	$("#commonPatInfo").processTemplate(myarr);
}

function setConsentForm() {

	var pobj = $("#formid").html();

	myObj = JSON.parse(pobj);

	var docName = myObj.objTreat.bedridden;
	var fn = myObj.fn;
	var mn = myObj.mn;
	var ln = myObj.ln;
	var tit = myObj.tit;
	var sx = myObj.sx;
	var age = myObj.ag;
	var pname = tit + " " + fn + " " + ln;
	$("#name").html(pname);
	$("#age").html(myObj.ag);
	$("#sex").html(myObj.sx);
	$("#pname").html(pname);
	$("#adoc").html(myObj.objTreat.bedridden);
	$("#pname1").html(pname);
	$("#docname").html(myObj.objTreat.bedridden);

}

function showAndHideNICU() {
	var PatientType = $("input:radio[name='PatientType']:checked").val();
	if (PatientType == "PD") {
		$("#nicu").hide();
		$("#paedDept").show();
	} else {
		$("#nicu").show();
		$("#paedDept").hide();
	}

}

//Jitendra 22 march 2019
function savedDischargeProcess() {	
	
	var queryType = $("#queryType").val();

	var allVals = [];
	for ( var n = 1; n <= 9; n++) {

		var $radios = $('input:checkbox[id=checkbox' + n + ']');
		if ($radios.is(':checked') == true) {
			allVals.push($radios.val());

		}
	}
	// var userRole = $("#userRole").html();

	//var listdischargeProcessObj1 = 0;
	var listdischargeProcessObj1 = {
		dischargesinglist : []
	};
	
	var count = 0;
	if (queryType == "insert") {
		for ( var i = 1; i <= 12; i++) {
			count++;
			var ID = $("#ID" + count + "").html();
			var userID = $("#userID" + count + "").html();
			var activity = $("#activity" + count + "").html();
			var txtstartTime = $("#txtstartTime" + count + "").val();
			var txtendTime = $("#txtendTime" + count + "").val();
			// var staffresp = $("#staffresp" + count + "").val();
			var remark = $("#remark" + count + "").val();
			// var dischargeID = $("#dischargeID" + count + "").html();
			var checkboxID = $("#checkbox" + i).html();
			if (checkboxID == "") {
				var checkboxID = 0;
			}
			/*
			 * if (activity == "" || txtstartTime == "" || txtendTime == "" ||
			 * staffresp == "" || remark == "") {
			 * 
			 * alert("You cannot save empty fields!!"); return false; }
			 */
			if (txtstartTime != undefined && txtstartTime != "") {
				listdischargeProcessObj1.dischargesinglist.push({

					"activity" : activity,
					"startTime" : txtstartTime,
					"endTime" : txtendTime,
					"staffresp" : userID,
					"remark" : remark,
					"ID" : ID,
					"iddischarge_process" : checkboxID
				});
			}
		}
	} else {

		for ( var i = 1; i <= 9; i++) {
			count++;
			var ID = $("#ID" + count + "").html();
			var userID = $("#userID" + count + "").html();
			var activity = $("#activity" + count + "").html();
			var txtstartTime = $("#txtstartTime" + count + "").val();
			var txtendTime = $("#txtendTime" + count + "").val();
			// var staffresp = $("#staffresp" + count + "").val();
			var remark = $("#remark" + count + "").val();
			var checkboxID = $("#checkbox" + i).html();
			if (checkboxID == "") {
				var checkboxID = 0;
			}
			/*
			 * if (activity == "" || txtstartTime == "" || txtendTime == "" ||
			 * staffresp == "" || remark == "") {
			 * 
			 * alert("You cannot save empty fields!!"); return false; }
			 */
			if (txtstartTime != undefined && txtstartTime != "") {
				listdischargeProcessObj1.dischargesinglist.push({

					"activity" : activity,
					"startTime" : txtstartTime,
					"endTime" : txtendTime,
					"staffresp" : userID,
					"remark" : remark,
					"ID" : ID,
					"iddischarge_process" : checkboxID ,
				});
			}
		}
	}
	
	listdischargeProcessObj1 = JSON.stringify(listdischargeProcessObj1);
	var inputs = [];
	//inputs.push('action=saveDischargeProcess');
	inputs.push('queryType=' + $("#queryType").val());
	inputs.push('tid=' + $("#tid").val());
	// inputs.push('userRole=' + $("#userRole").val());
	inputs.push('allVals=' + (allVals));
	inputs.push('listdischargeProcessObj1='
			+ encodeURIComponent(listdischargeProcessObj1));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "./ehat/ipdhistory/saveDischargeProcess",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			ajaxResponse = r;
			alert(ajaxResponse);
			$("#queryType").val("update");
		}
	});
}
	
	/*var count = 0;
	var servIdsChecked=[]; 
    $('input[name=proCheck]:checked').each(function(){
		
		servIdsChecked.push($(this).val());
		alert(servIdsChecked);
		
		
		//var ID = $("#ID" + count + "").html();
		var userID = $("#userID" + count + "").html();
		var activity = $("#activity" + count + "").html();
		var txtstartTime = $("#txtstartTime" + count + "").val();
		///var txtendTime = $("#txtendTime" + count + "").val();
		 var staffresp = $("#staffresp" + count + "").val();
		 var remark = $("#remark" + count + "").val();
		alert(activity+""+staffresp);
		count++;
		return false;
	});
	

    return false;
	*/
	/*var servIdsChecked=[]; 
	 $('input[name=proCheck]:checked').each(function(){
			
			servIdsChecked.push($(this).val());
			
	 });*/
	 
	//alert(servIdsChecked.length);
	/*var length=0;
	var allVals=0;
	
	$('input[name=proCheck]:checked').each(function(){
		var id=$(this).val();
		 
	var txtstartTime=$("#discharge_Time"+id).val();
	var activity=$("#activity"+id).val();
	var remark=$("#remark"+id).val();
	var staffresp=$("#staffresp"+id).val();	
	var txtendTime=0;
	var checkboxID=$("#activityId"+id).text();*/
	 
	//alert(activity+""+staffresp+""+remark+""+txtstartTime);
	
		 
			/*listdischargeProcessObj1.dischargelist.push({

				"activity" : activity,
				"st" : txtstartTime,
				"et" : txtendTime,
			 	"staffresp" : staffresp,
				"remark" : remark,
 				"ID" : checkboxID
			});
		 
		
		
	});*/
	
	//alert(listdischargeProcessObj1);
	/*return false;
	
	for ( var n = 0; n <= servIdsChecked.length; n++) {

		var $radios = $('input:checkbox[id=checkbox' + n + ']');
		if ($radios.is(':checked') == true) {
			alert("hi");
	 //allVals.push($radios.val());
 	 // length=	allVals;
			var activity = $("#activity" + n + "").html();
			var txtstartTime = 0.0;
			//var txtendTime = $("#txtendTime" + count + "").val();
			 var staffresp = $("#staffresp" + n + "").val();
			var remark = $("#remark" + n + "").val();
			// var dischargeID = $("#dischargeID" + count + "").html();
			var checkboxID = $("#checkbox" + n).html();
			if (checkboxID == "") {
				var checkboxID = 0;
			}*/
			
			/*
			if (txtstartTime != undefined && txtstartTime != "") {
				listdischargeProcessObj1.dischargelist.push({

					"activity" : activity,
					"st" : txtstartTime,
				//	"et" : txtendTime,
				 	"staffresp" : staffresp,
					"remark" : remark,
					"dischargeID" : checkboxID,
					"ID" : ID
				});
			}*/
			 
		
		//alert(activity+""+staffresp+""+remark+""+txtstartTime);
		/*listdischargeProcessObj1 = JSON.stringify(listdischargeProcessObj1);*/
	//	alert(listdischargeProcessObj198);
	 	/*var inputs = [];
		inputs.push('action=saveDischargeProcess');
		inputs.push('queryType=' + $("#queryType").val());
		inputs.push('tid=' + $("#tid").val());
		// inputs.push('userRole=' + $("#userRole").val());
		inputs.push('allVals=' + (allVals));
		inputs.push('listdischargeProcessObj1='
				+ encodeURIComponent(listdischargeProcessObj1));

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {

				ajaxResponse = r;
				alert(ajaxResponse);
				$("#queryType").val("update");
			}
		});
 	}*/
 
	
	/*alert("ur length---"+length.length);
 	var listdischargeProcessObj1 = 0;
	listdischargeProcessObj1 = {
		dischargelist : []
	};

	
	var count = 0;
	if (queryType == "insert") {
		alert(queryType);
		for ( var i = 0; i <= length.length; i++) {
			//count++;
		//	var ID = $("#ID" + count + "").html();
		//	var userID = $("#userID" + count + "").html();
			var activity = $("#activity" + count + "").html();
			var txtstartTime = 0.0;
			//var txtendTime = $("#txtendTime" + count + "").val();
			 var staffresp = $("#staffresp" + count + "").val();
			var remark = $("#remark" + count + "").val();
			// var dischargeID = $("#dischargeID" + count + "").html();
			var checkboxID = $("#checkbox" + i).html();
			if (checkboxID == "") {
				var checkboxID = 0;
			}
			alert(activity+""+staffresp+""+remark+""+txtstartTime);
			count++;
			
			 * if (activity == "" || txtstartTime == "" || txtendTime == "" ||
			 * staffresp == "" || remark == "") {
			 * 
			 * alert("You cannot save empty fields!!"); return false; }
			 
			if (txtstartTime != undefined && txtstartTime != "") {
				listdischargeProcessObj1.dischargelist.push({

					"activity" : activity,
					"st" : txtstartTime,
				//	"et" : txtendTime,
				 	"staffresp" : staffresp,
					"remark" : remark,
					"dischargeID" : checkboxID,
					"ID" : ID
				});
			}
		}*/
		
		
	//}
	
	//alert("tid-"+$("#tid").val());
	
	//alert(listdischargeProcessObj1.dischargelist);
	/* else {

		for ( var i = 1; i <= 9; i++) {
			count++;
			var ID = $("#ID" + count + "").html();
			var userID = $("#userID" + count + "").html();
			var activity = $("#activity" + count + "").html();
			var txtstartTime = $("#txtstartTime" + count + "").val();
			var txtendTime = $("#txtendTime" + count + "").val();
			// var staffresp = $("#staffresp" + count + "").val();
			var remark = $("#remark" + count + "").val();
			var checkboxID = $("#checkbox" + i).html();
			if (checkboxID == "") {
				var checkboxID = 0;
			}
			
			 * if (activity == "" || txtstartTime == "" || txtendTime == "" ||
			 * staffresp == "" || remark == "") {
			 * 
			 * alert("You cannot save empty fields!!"); return false; }
			 
			if (txtstartTime != undefined && txtstartTime != "") {
				listdischargeProcessObj1.dischargelist.push({

					"activity" : activity,
					"st" : txtstartTime,
					"et" : txtendTime,
					"staffresp" : userID,
					"remark" : remark,
					"dischargeID" : checkboxID,
					"ID" : ID,
				});
			}
		}
	}*/
	
	
	/*listdischargeProcessObj1 = JSON.stringify(listdischargeProcessObj1);
 	var inputs = [];
	inputs.push('action=saveDischargeProcess');
	inputs.push('queryType=' + $("#queryType").val());
	inputs.push('tid=' + $("#tid").val());
	// inputs.push('userRole=' + $("#userRole").val());
	inputs.push('allVals=' + (allVals));
	inputs.push('listdischargeProcessObj1='
			+ encodeURIComponent(listdischargeProcessObj1));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			ajaxResponse = r;
			alert(ajaxResponse);
			$("#queryType").val("update");
		}
	});

}*/
// var fetchDischargeTemplate='{#foreach dischargelist[count++] as dischargelist
// }<input id="idDischarge{count}" name="idDischarge{count++}" type="hidden"
// value="{$T.dischargelist.dischargeID}">{#/for}';

function fetchDischargeProcess() {

	var treatmentId = $("#tid").val();

	var inputs = [];
	//inputs.push('action=fetchDischargeProcess');
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "./ehat/ipdhistory/fetchDischargeProcess",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
	
			//pobj1 = eval('(' + ajaxResponse + ')');
			pobj1=r;
			// $("#container").setTemplate(fetchDischargeTemplate);
			// $("#container").processTemplate(pobj1);dischargesinglist
			if (pobj1.dischargesinglist.length > 0) {
				var count = 0;
				var a = 0;
				for ( var j = 1; j <= pobj1.dischargesinglist.length; j++) {
					for ( var i = 1; i <= 9; i++) {
						// count++;
						var dischargeID = $("#ID" + i).html();
						//jitendra var dischargeID=$("#checkbox" + i);
						//if (dischargeID == pobj1.dischargesinglist[i].ID) {
							$("#txtstartTime" + i + "").val(
									pobj1.dischargesinglist[i].startTime);
							$("#txtendTime" + i + "").val(
									pobj1.dischargesinglist[i].endTime);

							$("#remark" + i + "").val(
									pobj1.dischargesinglist[i].remark);
							$("#dischargeID" + i + "").html(
									pobj1.dischargesinglist[i].iddischarge_process);
							if (pobj1.dischargesinglist[i].st != "") {
								$("#staffresp" + i + "").val(
										pobj1.dischargesinglist[i].staffresp);
								$("#checkbox" + i).attr('checked', true);
								$("#checkbox" + i).html(
										pobj1.dischargesinglist[i].iddischarge_process);
								$("#userID" + i).html(
										pobj1.dischargesinglist[i].staffresp);

							}
							a++;
						//}/*
							// else { $("#checkbox" + i).attr('checked', false); }
							 

						// a++;

					}
				}

				$("#queryType").val('update');
				/*
				 * $("#txtstartTime1").val(pobj1.dischargelist[0].st);
				 * $("#txtendTime1").val(pobj1.dischargelist[0].et);
				 * $("#staffresp1").val(pobj1.dischargelist[0].staffresp);
				 * $("#remark1").val(pobj1.dischargelist[0].remark);
				 * $("#txtstartTime2").val(pobj1.dischargelist[1].st);
				 * $("#txtendTime2").val(pobj1.dischargelist[1].et);
				 * $("#staffresp2").val(pobj1.dischargelist[1].staffresp);
				 * $("#remark2").val(pobj1.dischargelist[1].remark);
				 * $("#txtstartTime3").val(pobj1.dischargelist[2].st);
				 * $("#txtendTime3").val(pobj1.dischargelist[2].et);
				 * $("#staffresp3").val(pobj1.dischargelist[2].staffresp);
				 * $("#remark3").val(pobj1.dischargelist[2].remark);
				 * $("#txtstartTime4").val(pobj1.dischargelist[3].st);
				 * $("#txtendTime4").val(pobj1.dischargelist[3].et);
				 * $("#staffresp4").val(pobj1.dischargelist[3].staffresp);
				 * $("#remark4").val(pobj1.dischargelist[3].remark);
				 * $("#txtstartTime5").val(pobj1.dischargelist[4].st);
				 * $("#txtendTime5").val(pobj1.dischargelist[4].et);
				 * $("#staffresp5").val(pobj1.dischargelist[4].staffresp);
				 * $("#remark5").val(pobj1.dischargelist[4].remark);
				 * $("#txtstartTime6").val(pobj1.dischargelist[5].st);
				 * $("#txtendTime6").val(pobj1.dischargelist[5].et);
				 * $("#staffresp6").val(pobj1.dischargelist[5].staffresp);
				 * $("#remark6").val(pobj1.dischargelist[5].remark);
				 * $("#txtstartTime7").val(pobj1.dischargelist[6].st);
				 * $("#txtendTime7").val(pobj1.dischargelist[6].et);
				 * $("#staffresp7").val(pobj1.dischargelist[6].staffresp);
				 * $("#remark7").val(pobj1.dischargelist[6].remark);
				 * $("#txtstartTime8").val(pobj1.dischargelist[7].st);
				 * $("#txtendTime8").val(pobj1.dischargelist[7].et);
				 * $("#staffresp8").val(pobj1.dischargelist[7].staffresp);
				 * $("#remark8").val(pobj1.dischargelist[7].remark);
				 * $("#txtstartTime9").val(pobj1.dischargelist[8].st);
				 * $("#txtendTime9").val(pobj1.dischargelist[8].et);
				 * $("#staffresp9").val(pobj1.dischargelist[8].staffresp);
				 * $("#remark9").val(pobj1.dischargelist[8].remark);
				 * $("#txtstartTime10").val(pobj1.dischargelist[9].st);
				 * $("#txtendTime10").val(pobj1.dischargelist[9].et);
				 * $("#staffresp10").val(pobj1.dischargelist[9].staffresp);
				 * $("#remark10").val(pobj1.dischargelist[9].remark);
				 * $("#txtstartTime11").val(pobj1.dischargelist[10].st);
				 * $("#txtendTime11").val(pobj1.dischargelist[10].et);
				 * $("#staffresp11").val(pobj1.dischargelist[10].staffresp);
				 * $("#remark11").val(pobj1.dischargelist[10].remark);
				 * $("#txtstartTime12").val(pobj1.dischargelist[11].st);
				 * $("#txtendTime12").val(pobj1.dischargelist[11].et);
				 * $("#staffresp12").val(pobj1.dischargelist[11].staffresp);
				 * $("#remark12").val(pobj1.dischargelist[11].remark);
				 * //$("#dischargeID").val(pobj1.dischargelist[11].remark);
				 */

			} else {

				$("#queryType").val('insert');
			}
		}
	});

}

function setval() {
	if ($("#userRole1").val() == "admin") {
	} else {
		for ( var i = 1; i <= 12; i++) {
			var $radios = $('input:checkbox[id=checkbox' + i + ']');
			if ($radios.is(':checked') == true) {
				var a = $("#userID" + i).html();
				if (a == "") {
					a = "aa";
				}
				var b = $("#userName").val();
				if (a != b) {
					$("#remark" + i).attr("disabled", true);
					$("#txtstartTime" + i).attr("disabled", true);
					$("#staffresp" + i).attr("disabled", true);
					$("#checkbox" + i).attr("disabled", true);
				}
			}
		}
	}
}

function setDischargeDetails() {

	var pobj = $("#divPatId").html();
	operationobj = eval('(' + pobj + ')');

	var fullname = operationobj.tit + "   " + operationobj.fn + "   "
			+ operationobj.mn + "   " + operationobj.ln;
	var age = operationobj.ag + " (YY) " + operationobj.month + " (MM) "
			+ operationobj.days + " (DD)"
			
	$("#name").html(fullname);
	$("#age").html(age);
	$("#sex").html(operationobj.sx);
	$("#prn").html(operationobj.pi);
	
	var consultName = (operationobj.objTreat.bedridden);

	if ((consultName.charAt(0)) == ",") {
		consultName = consultName.substring(1);
	}
	
	$("#consult").html(consultName);
	if(operationobj.liSponser.length != 0){
		$("#corporate").html(
				operationobj.liSponser[0].sponsredName + " ("
						+ operationobj.liSponser[0].companyName + ")");
	}else{
		$("#corporate").html("");

	}
	var fullBedname = (operationobj.objHall.hn + " ("
			+ operationobj.objHall.htnm + ") / " + operationobj.oBed.bi);
	$("#bedno").html(fullBedname);
	$("#bill_cat").html(operationobj.objTreat.billCategory_Name);

	
	var pobj1 = $("#hospDetails").html();
	operationobj1 = eval('(' + pobj1 + ')');
	var hosp = operationobj1.listHosDetail[0];
	$("#hospname").html(operationobj1.listHosDetail[0].hn);
	$("#hospAdd").html(hosp.ha + "-" + hosp.hz);
	$("#contact").html(hosp.hcon);
	$("#email").html(hosp.em);
	// $("#hospitaldetails").html(hospDetails.listHosDetail[0].hn);
	$("#hospitalLogo").attr("src", hosp.flpt);
}

function addDoctorServicesName(type, rowcount) {

	var docid = $("#txtEqName" + type + rowcount).val();

	if (docid == "") {
		alert("Please Select Service.");
		return false;
	}
	var docname;
	var doctorid;
	var strdocid = docid.split("_");

	if (strdocid.length == 1) {
		alert("Please Select Valid Test");
		return false;
	}

	docname = strdocid[0] + "" + '\n';
	doctorid = strdocid[1] + "" + "_0" + '\n';

	var o = new Option("option text", "value");
	// / jquerify the DOM object 'o' so we can use the html method
	$(o).html(docname);
	$(o).val(doctorid);
	// $(0).val();
	$("#txtEquipmet" + type + rowcount).append(o);
	$("#txtEqName" + type + rowcount).val("");

}

function removeDoctorServicesName(type, rowcount) {

	$('#txtEquipmet' + type + rowcount + ' option:selected').remove();

}

function addDoctorName(rowcount) {
	if (rowcount == undefined) {
		var docid = $("#docName").val();
		var docName = $("#docName option:selected").text();
	
		if (docid == "select") {
			alert("Please Select Doctor.");
			return false;
		}
		var add = docName + '\n';
		var doctorid = docid + '\n';

		var flag = 0;
		$('#txtDocName').find('option').each(function() {
			if ($(this).html() == add) {
				alert("Doctor Is Present In List");
				flag = 1;
			}
		});
		if (flag == 0) {
			var o = new Option("option text", "value");
			// / jquerify the DOM object 'o' so we can use the html method
			$(o).html(add);
			$(o).val(doctorid);
			// $(0).val();
			$("#txtDocName").append(o);

		}
	} else {
		var docid = $("#docName" + rowcount).val();
		var docName = $("#docName" + rowcount + " option:selected").text();

		if (docid == "select") {
			alert("Please Select Doctor.");
			return false;
		}
		var add = docName + '\n';
		var doctorid = docid + '\n';

		var flag = 0;
		$('#txtDocName' + rowcount).find('option').each(function() {
			if ($(this).html() == add) {
				alert("Doctor Is Present In List");
				flag = 1;
			}
		});
		if (flag == 0) {
			var o = new Option("option text", "value");
			// / jquerify the DOM object 'o' so we can use the html method
			$(o).html(add);
			$(o).val(doctorid);
			// $(0).val();
			$("#txtDocName" + rowcount).append(o);

		}
	}
}

function removeDoctorName(rowCount) {
	if (rowCount == undefined) {
		$('#txtDocName option:selected').remove();
	} else {
		$('#txtDocName' + rowCount + ' option:selected').remove();
	}
}

function printRegistrationDetails() {
	var hospDetails = $("#hospDetails").html();
	hospDetails = eval('(' + hospDetails + ')');
	var hosp = hospDetails.listHosDetail[0];
	var originalContents = document.body.innerHTML;
	var billHeader = $("#billHeader").val();
	var WindowObject = window.open('', ' ', '');

	WindowObject.document.writeln('<html><body>');

	WindowObject.document
			.writeln('<div style="width:25%;float:left;"><img src="'
					+ hosp.flpt
					+ '" width="200" height="100" alt="" /></div><div style="text-align: center;" id="SRBill"><h1>'
					+ hosp.hn + '</h1>	<b>' + hosp.ha + '-' + hosp.hz
					+ '</b><br></br> <b>Tel:-' + hosp.hcon + '.</b><b>Fax:-'
					+ hosp.hx + '.</b></div></div>');
	WindowObject.document.writeln('<html><head>');

	WindowObject.document.writeln('</head><body>');

	WindowObject.document
			.writeln('_______________________________________________________________________________________________________________________________<table cellpadding="10" cellspacing="0" style=" ;" width="100%">');

	WindowObject.document
			.writeln('<tr height="35px"><td  style="font-size:20px;width: 20%; ;padding-left: 10px;font-weight:bold;" align="left">UHID</td><td width="40%" style="font-size:20px; ;padding-left: 10px;" align="left" >'
					+ $("#patID").val()
					+ ' </td><td  width="20%" style="font-size:20px; ;padding-left: 10px;font-weight:bold;" align="left">Date Of Birth</td><td width="20%" style="font-size:20px; ;padding-left: 10px;" align="left" >'
					+ $("#popup_container2").val() + ' </td></tr>');

	WindowObject.document
			.writeln('<tr height="35px"><td  style="font-size:20px;width: 20%; ;padding-left: 10px;font-weight:bold;" align="left">Name of the Patient</td><td width="40%" style="font-size:20px;; ;padding-left: 10px;" align="left" >'
					+ $("#title").val()
					+ " "
					+ $("#fName").val().slice(0, 1).toUpperCase()
					+ $("#fName").val().slice(1)
					+ " "
					+ $("#mName").val().slice(0, 1).toUpperCase()
					+ $("#mName").val().slice(1)
					+ " "
					+ $("#lName").val().slice(0, 1).toUpperCase()
					+ $("#lName").val().slice(1)
					+ ' </td><td  style="font-size:20px; ;padding-left: 10px;font-weight:bold;" align="left">Gender</td><td style="font-size:20px; ;padding-left: 10px;" align="left" >'
					+ $("#sex").val() + ' </td></tr>');

	WindowObject.document
			.writeln('<tr height="35px"><td  style="font-size:20px; ;padding-left: 10px;font-weight:bold;" align="left">Age</td><td style="font-size:20px; ;padding-left: 10px;" align="left" >'
					+ $("#age").val()
					+ " "
					+ $("#ageType").val()
					+ ' </td><td  style="font-size:20px; ;padding-left: 10px;font-weight:bold;" align="left">Weight</td><td style="font-size:20px; ;padding-left: 10px;" align="left" >'
					+ $("#weight").val()
					+ " "
					+ $("#wtType").val()
					+ ' </td></tr>');

	WindowObject.document
			.writeln('<tr height="35px"><td  style="font-size:20px; ;padding-left: 10px;font-weight:bold;" align="left">Registration Date</td><td style="font-size:20px; ;padding-left: 10px;" align="left" >'
					+ $("#popup_container3").val()
					+ ' </td><td  style="font-size:20px; ;padding-left: 10px;font-weight:bold;" align="left">Referred By</td><td style="font-size:20px; ;padding-left: 10px;" align="left" >'
					+ $("input:radio[name=refByRadio]:checked").val()
					+ ' </td></tr>');

	WindowObject.document
			.writeln('<tr height="35px"><td  valign="top" style="font-size:20px; ;padding-left: 10px;font-weight:bold;" align="left">Referred To</td><td style="font-size:20px; ;padding-left: 10px;" align="left" >'
					+ $("#refTo").val()
					+ ' </td><td  style="font-size:20px; ;padding-left: 10px;font-weight:bold;" align="left">&nbsp</td><td style="font-size:20px; ;padding-left: 10px;" align="left" >'
					+ ' &nbsp</td></tr>');

	if ($("#refTo").val() == "ipd") {
		WindowObject.document
				.writeln('<tr height="35px"><td  valign="top" style="font-size:20px; ;padding-left: 10px;font-weight:bold;" align="left">&nbsp</td><td style="font-size:20px; ;padding-left: 10px;" align="left"  colspan="3">'
						+ '<table>');
		if ($("#selectIpdDoc option:selected").text() != "Select Doctor") {
			WindowObject.document
					.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Admitted Under Doctor : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
							+ $("#selectIpdDoc option:selected").text()
							+ '</td></tr>');
		}
		if ($("#admitFor").val() != "") {
			WindowObject.document
					.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Admitted For : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
							+ $("#admitFor").val() + '</td></tr>');
		}

		if (($('#bedridden').attr('checked') == true)
				&& ($('#seropositive').attr('checked') == true)) {
			WindowObject.document
					.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Bed Ridden &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp Sero Positive</td><td style="font-size:20px;padding-left: 10px;" align="left"></td></tr>');
		} else if ($('#bedridden').attr('checked') == true) {
			WindowObject.document
					.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Bed Ridden</td><td style="font-size:20px;padding-left: 10px;" align="left"></td></tr>');
		} else if ($('#seropositive').attr('checked') == true) {
			WindowObject.document
					.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Sero Positive</td><td style="font-size:20px;padding-left: 10px;" align="left"></td></tr>');

		}
		if ($("#relNm").val() != "") {
			WindowObject.document
					.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Relative Name : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
							+ $("#relNm").val() + '</td></tr>');
		}
		if ($("#emrNo").val() != "") {
			WindowObject.document
					.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Relative Contact No. : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
							+ $("#emrNo").val() + '</td></tr>');
		}
		if ($("input:radio[name=paymentType]:checked").val() == undefined) {

		} else {
			WindowObject.document
					.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Type Of Payment : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
							+ $("input:radio[name=paymentType]:checked").val()
							+ '</td></tr>');

		}
		if ($("#txtPaymentPerName").val() != "") {
			WindowObject.document
					.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Name Of Person Responsible For Payment: </td><td style="font-size:20px;padding-left: 10px;" align="left">'
							+ $("#txtPaymentPerName").val() + '</td></tr>');
		}
		if ($("#txtRelAge").val() != "") {
			WindowObject.document
					.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Age : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
							+ $("#txtRelAge").val() + '</td></tr>');
		}
		if ($("#relSex").val() != "") {
			WindowObject.document
					.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Gender : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
							+ $("#relSex").val() + '</td></tr>');
			if ($("#txtRelRelation").val() != "") {
				WindowObject.document
						.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Relation : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
								+ $("#txtRelRelation").val() + '</td></tr>');
			}

			if ($("#txtRelAddress").val() != "") {
				WindowObject.document
						.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Address : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
								+ $("#txtRelAddress").val() + '</td></tr>');
			}
			if ($("#txtRelMobile").val() != "") {
				WindowObject.document
						.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Mobile : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
								+ $("#txtRelMobile").val() + '</td></tr>');
			}
			if ($("#selCompany").val() != "") {
				WindowObject.document
						.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">TPA Name : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
								+ $("#selCompany").text() + '</td></tr>');
			}
			if ($("#txtInsuranceCmpny").val() != "") {
				WindowObject.document
						.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Insurance Company : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
								+ $("#txtInsuranceCmpny").val() + '</td></tr>');
			}
			if ($("#txtMemoNo").val() != "") {
				WindowObject.document
						.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Memo/Preauthorisation Letter No. : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
								+ $("#txtMemoNo").val() + '</td></tr>');
			}
			if ($("#popup_container4").val() != "") {
				WindowObject.document
						.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Date : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
								+ $("#popup_container4").val() + '</td></tr>');
			}
			if ($("#txtCashlessPolicyNo").val() != "") {
				WindowObject.document
						.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Cashless policy I.D No. No. : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
								+ $("#txtCashlessPolicyNo").val()
								+ '</td></tr>');
			}
			if ($("#txtCnnnNo").val() != "") {
				WindowObject.document
						.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">C.N.N.No. : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
								+ $("#txtCnnnNo").val() + '</td></tr>');
			}
			WindowObject.document.writeln('</table>' + ' </td></tr>');
		}
	}
	var residentialAddress = $("#conAdd1").val() + $("#conAdd6").val()
			+ $("#conAdd3").val() + $("#conAdd4").val() + $("#conAdd5").val()
			+ $("#conAdd6").val();

	if (residentialAddress != "") {
		WindowObject.document
				.writeln('<tr height="35px"><td  valign="top" style="font-size:20px; ;padding-left: 10px;font-weight:bold;" align="left" >Residential Address </td><td style="font-size:20px; ;padding-left: 10px;" align="left" >'

						+ $("#conAdd1").val());
		if (($("#conAdd6").val() != "") && ($("#conAdd1").val() != "")) {
			WindowObject.document.writeln(",");
		}
		WindowObject.document.writeln($("#conAdd6").val());
		if ($("#conAdd2").val() != "") {
			WindowObject.document.writeln(",");
		}

		WindowObject.document.writeln($("#conAdd2").val());
		if ($("#conAdd3").val() != "") {
			WindowObject.document.writeln(",");
		}
		WindowObject.document.writeln("</br>");
		WindowObject.document.writeln($("#conAdd3").val());
		if (($("#conAdd4").val() != "") && ($("#conAdd3").val() != "")) {
			WindowObject.document.writeln(",");
		}
		WindowObject.document.writeln($("#conAdd4").val());
		if ($("#conAdd5").val() != "") {
			WindowObject.document.writeln(",");
		}
		WindowObject.document.writeln($("#conAdd5").val());

		WindowObject.document.writeln(' </td></tr>');
	}

	if ($('#chkAddress').attr('checked') == true) {

	} else {
		var permanentAddress = $("#perAdd1").val() + $("#perAdd2").val()
				+ $("#perAdd3").val() + $("#perAdd4").val()
				+ $("#perAdd5").val() + $("#perAdd6").val();
		if (permanentAddress != "") {
			WindowObject.document
					.writeln('<tr height="35px"><td  valign="top" style="font-size:20px; ;padding-left: 10px;font-weight:bold;" align="left">Permanent Address</td><td style="font-size:20px; ;padding-left: 10px;" align="left"  colspan="3">'

							+ $("#perAdd1").val());
			if (($("#perAdd2").val() != "") && ($("#perAdd1").val() != "")) {
				WindowObject.document.writeln(",");
			}
			WindowObject.document.writeln($("#perAdd2").val());
			if ($("#perAdd3").val() != "") {
				WindowObject.document.writeln(",");
			}

			WindowObject.document.writeln($("#perAdd3").val());
			if ($("#perAdd4").val() != "") {
				WindowObject.document.writeln(",");
			}
			WindowObject.document.writeln("</br>");
			WindowObject.document.writeln($("#perAdd4").val());
			if (($("#perAdd5").val() != "") && ($("#perAdd4").val() != "")) {
				WindowObject.document.writeln(",");
			}
			WindowObject.document.writeln($("#perAdd5").val());
			if ($("#perAdd6").val() != "") {
				WindowObject.document.writeln(",");
			}
			WindowObject.document.writeln($("#perAdd6").val());

			WindowObject.document.writeln(' </td></tr>');
		}
		// +$("#perAdd1").val()+","+$("#perAdd2").val()+",</br>"+$("#perAdd3").val()+","+$("#perAdd4").val()+","+$("#perAdd5").val()+","+$("#perAdd6").val()
		// + ' </td></tr>');
	}

	if ($('#mlc').attr('checked') == true) {
		WindowObject.document
				.writeln('<tr height="35px"><td  valign="top" style="font-size:20px; ;padding-left: 10px;font-weight:bold;" align="left">MLC</td><td style="font-size:20px; ;padding-left: 10px;" align="left"  colspan="3">'
						+ '<table>');

		if ($("#firNo").val() != "") {
			WindowObject.document
					.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left"> FIR No. : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
							+ $("#firNo").val() + '</td></tr>');
		}
		if ($("#authorityname").val() != "") {
			WindowObject.document
					.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Authority Name : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
							+ $("#authorityname").val() + '</td></tr>');
		}
		if ($("#buccleNo").val() != "") {
			WindowObject.document
					.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Buccle No. : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
							+ $("#buccleNo").val() + '</td></tr>');
		}
		if ($("#plStname").val() != "") {
			WindowObject.document
					.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Police Station Name : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
							+ $("#plStname").val() + '</td></tr>');
		}
		if ($("#plAdress").val() != "") {
			WindowObject.document
					.writeln('<tr><td  style="font-size:20px;padding-left: 10px;font-weight:bold;" align="left">Police Station Address : </td><td style="font-size:20px;padding-left: 10px;" align="left">'
							+ $("#plAdress").val() + '</td></tr>');
		}
		WindowObject.document.writeln('</table></td></tr>');

	}

	WindowObject.document.writeln('</table>');

	WindowObject.document.writeln('');
	WindowObject.document.writeln('</body></html>');
	WindowObject.document.close();

	WindowObject.focus();

	WindowObject.print();

	WindowObject.close();

}
function cancelAdmission(patientId, treatmentId) {

	var r = confirm("Are you confirm to cancel Admission");
	if (r == true) {

		$("#icdDiagnosis").setTemplate($("#login-box").show());
		$("#trid").html(treatmentId);
		$("#pid").html(patientId);
	}
}
function submilReason() {

	var reasonTxt = $("#reasonTxt").val();
	if (reasonTxt == "") {
		alert("Please enter Reason");
		return false;
	}
	/*
	 * if (reasonTxt > 1000) { alert("Reason Length is too long") return false; }
	 */
	var pid = $("#pid").html();
	var trid = $("#trid").html();

	var inputs = [];
	inputs.push('action=saveReasonofCancel');
	inputs.push('reasonTxt=' + encodeURIComponent(reasonTxt));
	inputs.push('trid=' + trid);
	inputs.push('pid=' + pid);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			alert(r);
			$("#login-box").hide();
			$("#reasonTxt").val("");
			location.reload();
		}
	});

}

/* Doctor Departments and Specialization Code */

var doctorSpecilizationTemp = "<option value='0'>-select-</option>{#foreach $T.liSplz as spl}<option value='{$T.spl.splzId}'>{$T.spl.splzNm}</option>{#/for}";

function fetchDoctorSpecilizationsForPatientRegistration(type) {

	var inputs = [];
	inputs.push('action=fetchDoctorSpecilizations');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/gethospitalspcializationList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			/*var ajaxResponse = r;			
			pobj1 = eval('(' + ajaxResponse + ')');
			doctorBean = eval('(' + ajaxResponse + ')');*/
			
			var doctorSpecilizationTemp="<option value='0'>-- Select Specialization--</option>";	
			for(var i=0; i<r.hospitalspclgetlist.length; i++){
				
				doctorSpecilizationTemp = doctorSpecilizationTemp +'<option value="'+r.hospitalspclgetlist[i].specialisationId+'">'+r.hospitalspclgetlist[i].specializationName+'</option>';
			}
			
			if (type == "scheduler") {

				/*$("#doctorSpeciality").setTemplate(doctorSpecilizationTemp);
				$("#doctorSpeciality").processTemplate(doctorBean);
				
				$("#selHosDept").setTemplate(doctorSpecilizationTemp);
				$("#selHosDept").processTemplate(doctorBean);

				$("#selHosDeptNew").setTemplate(doctorSpecilizationTemp);
				$("#selHosDeptNew").processTemplate(doctorBean);*/		
				$("#doctorSpeciality").html(doctorSpecilizationTemp)
				$("#selHosDept").html(doctorSpecilizationTemp)
				$("#selHosDeptNew").html(doctorSpecilizationTemp)
				
			} else {
				/*$("#doctorSpecilization").setTemplate(doctorSpecilizationTemp);
				$("#doctorSpecilization").processTemplate(doctorBean);

				$("#ipdDoctorSpecilization").setTemplate(doctorSpecilizationTemp);
				$("#ipdDoctorSpecilization").processTemplate(doctorBean);

				$("#erdoctorSpecilization").setTemplate(doctorSpecilizationTemp);
				$("#erdoctorSpecilization").processTemplate(doctorBean);
				
				// Package Master speicilaization field
				$("#specialization").setTemplate(doctorSpecilizationTemp);
				$("#specialization").processTemplate(doctorBean);

				$("#ReserveDoctorSpecilization").setTemplate(doctorSpecilizationTemp);
				$("#ReserveDoctorSpecilization").processTemplate(doctorBean);
				
				$("#igetSpec").setTemplate(doctorSpecilizationTemp);
				$("#igetSpec").processTemplate(doctorBean);
				
				$("#iConsSpec").setTemplate(doctorSpecilizationTemp);
				$("#iConsSpec").processTemplate(doctorBean);
				
				$("#iAdvanceConsSpec").setTemplate(doctorSpecilizationTemp);
				$("#iAdvanceConsSpec").processTemplate(doctorBean);*/
				$("#drDeptId").html(doctorSpecilizationTemp);
				$("#doctorSpecilization").html(doctorSpecilizationTemp);
				$("#ipdDoctorSpecilization").html(doctorSpecilizationTemp);
				$("#erdoctorSpecilization").html(doctorSpecilizationTemp);
				$("#specialization").html(doctorSpecilizationTemp);
				$("#ReserveDoctorSpecilization").html(doctorSpecilizationTemp);
				$("#igetSpec").html(doctorSpecilizationTemp);
				$("#iConsSpec").html(doctorSpecilizationTemp);
				$("#iAdvanceConsSpec").html(doctorSpecilizationTemp);
			}
		}
	});

}

var doctorDepartmentTemp = "<option value='0'>-select-</option>{#foreach $T.liDep as dpl}<option value='{$T.dpl.depId}'>{$T.dpl.depNm}</option>{#/for}";

function fetchHospitalDepartmentsForPatientRegistration() {
	
	var admittedUnder = $("#refTo").val();
	var inputs = [];
	inputs.push('action=fetchHospitalDepartments');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
		
			pobj1 = eval('(' + ajaxResponse + ')');
			doctorBean = eval('(' + ajaxResponse + ')');

			$("#doctorDepartments").setTemplate(doctorDepartmentTemp);
			$("#doctorDepartments").processTemplate(doctorBean);

			$("#ipdDoctorDepartments").setTemplate(doctorDepartmentTemp);
			$("#ipdDoctorDepartments").processTemplate(doctorBean);

			$("#erdoctorDepartments").setTemplate(doctorDepartmentTemp);
			$("#erdoctorDepartments").processTemplate(doctorBean);
			
			$("#ReserveDoctorDepartments").setTemplate(doctorDepartmentTemp);
			$("#ReserveDoctorDepartments").processTemplate(doctorBean);
			
			$("#igetDept").setTemplate(doctorDepartmentTemp);
			$("#igetDept").processTemplate(doctorBean);
			
			$("#iConsDept").setTemplate(doctorDepartmentTemp);
			$("#iConsDept").processTemplate(doctorBean);
			
		}
	});
}

function fetchDepartmentsForAdvanceSearch(){

	var admittedUnder = $("#refTo").val();
	var inputs = [];
	inputs.push('action=fetchHospitalDepartments');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
		
			pobj1 = eval('(' + ajaxResponse + ')');
			doctorBean = eval('(' + ajaxResponse + ')');

			$("#doctorDepartments").setTemplate(doctorDepartmentTemp);
			$("#doctorDepartments").processTemplate(doctorBean);

			$("#ipdDoctorDepartments").setTemplate(doctorDepartmentTemp);
			$("#ipdDoctorDepartments").processTemplate(doctorBean);

			$("#erdoctorDepartments").setTemplate(doctorDepartmentTemp);
			$("#erdoctorDepartments").processTemplate(doctorBean);
			
			$("#ReserveDoctorDepartments").setTemplate(doctorDepartmentTemp);
			$("#ReserveDoctorDepartments").processTemplate(doctorBean);
			
			$("#igetDept").setTemplate(doctorDepartmentTemp);
			$("#igetDept").processTemplate(doctorBean);
			
			$("#iConsDept").setTemplate(doctorDepartmentTemp);
			$("#iConsDept").processTemplate(doctorBean);
			
			$("#iAdvanceConsDept").setTemplate(doctorDepartmentTemp);
			$("#iAdvanceConsDept").processTemplate(doctorBean);
			
		}
	});

}

function openBedMis() {
	window.location = "IPD_BedWardView.jsp?";
}

var docNameTemplateForOPD = "<option value='0'>---- select Doctor ----</option>{#foreach $T.dl as dl}	<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";

function setDocNameForRegistration() {

	var drDeptId = 0;
	var inputs = [];
	inputs.push('action=FetchDoctors');
	//inputs.push('action=FetchAllDoctorsForNS');
	inputs.push('date=onload');
	inputs.push('docType=doc');
	inputs.push('drDeptId='+drDeptId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
			$("#doctorObject").val(ajaxResponse);
			$("#doctorObject").html(ajaxResponse);
			var doctorBean = eval('(' + ajaxResponse + ')');

			$("#mlcCmoDoctor").setTemplate(docNameTemplateForOPD);
			$("#mlcCmoDoctor").processTemplate(doctorBean);

			$("#ipdDoctorName").setTemplate(docNameTemplateForOPD);
			$("#ipdDoctorName").processTemplate(doctorBean);

			$("#doctorName").setTemplate(docNameTemplateForOPD);
			$("#doctorName").processTemplate(doctorBean);

			$("#erCMOConsultant").setTemplate(docNameTemplateForOPD);
			$("#erCMOConsultant").processTemplate(doctorBean);

			$("#selDoctorName").setTemplate(docNameTemplateForOPD);
			$("#selDoctorName").processTemplate(doctorBean);

			$("#ReserveDoctorName").setTemplate(docNameTemplateForOPD);
			$("#ReserveDoctorName").processTemplate(doctorBean);
			
			$("#igetDoc").setTemplate(docNameTemplateForOPD);
			$("#igetDoc").processTemplate(doctorBean);
			
			$("#iConsDoc").setTemplate(docNameTemplateForOPD);
			$("#iConsDoc").processTemplate(doctorBean);
			
			$("#iAdvanceConsDoc").setTemplate(docNameTemplateForOPD);
			$("#iAdvanceConsDoc").processTemplate(doctorBean);
			
		}
	});
}
var List = "<div class='col-sm-12-1 scroller'	style='margin-top: -21px; border: 1px solid #b8b8b8; height: 408px; max-height: auto;'>	<table class='table table-striped table-condensed cf'>		<tbody>			{#foreach $T.pl.libm as libm}{#if $T.liBM.bda != '' }			<tr>				<td class='col-md-1 center' style='height: 21.5px;'>{count++}.</td>				<td class='col-md-4 center' style='height: 21.5px;'>{$T.pl.tit}					{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>				<td class='col-md-1 center' style='height: 21.5px;'>{$T.pl.pi}</td>				<td class='col-md-2 center' style='height: 21.5px;'>{$T.pl.rt}</td>				<td class='col-md-2 center' style='height: 21.5px;'>					<button class='btn btn-xs btn-success' value='VIEW'						id='btnView{count}' onclick=dispTreatpatientSearch({$T.pl.pi},'OPDOldPatientDatabase')>						<i class='fa fa-eye View'></i>					</button>				</td>			</tr>			{#/if}{#/for}		</tbody>	</table>	";
var TempNewPreAuthorization = "<div class='col-sm-12-1 scroller'	style='margin-top: -21px; border: 1px solid #b8b8b8; height: 408px; max-height: auto;'>	<table class='table table-striped table-condensed cf'>		<tbody>			{#foreach $T.pl as pl}			<tr>				<td class='col-md-1 center' style='height: 21.5px;'>{count++}.</td>				<td class='col-md-4 center' style='height: 21.5px;'>{$T.pl.tit}					{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>				<td class='col-md-1 center' style='height: 21.5px;'>{$T.pl.pi}</td>				<td class='col-md-2 center' style='height: 21.5px;'>{$T.pl.rt}</td>				<td class='col-md-2 center' style='height: 21.5px;'>					<button class='btn btn-xs btn-success' value='VIEW'						id='btnView{count}' onclick=dispTreatpatientSearch({$T.pl.pi},'OPDOldPatientDatabase')>						<i class='fa fa-eye View'></i>					</button>				</td>			</tr>			{#/for}		</tbody>	</table>	";
var TempTreatmentList = "{#foreach $T.pl.liBM as liBM}{#if $T.liBM.bda != '' }		<tr id='div{count}'>			<td style='height: 21.5px;' class='col-md-1 center' class=''>{$T.liBM.tid}</td>			<td style='height: 21.5px;' class='col-md-1 center' class=''>{$T.liBM.id}</td>			<td style='height: 21.5px;' class='col-md-1 center' class='numeric '>{$T.liBM.bda}</td>			<td style='height: 21.5px;' class='col-md-1 center'>				<button value='VIEW BILL' style='height: 21.5px;'					onClick='goToIPDPrevBill({$T.liBM.id},{$T.pl.pi},{$T.liBM.tid})'>					<i class='fa fa-eye View' class='edit'></i>				</button>			</td>		</tr>		{#/if}{#/for}";
var TempManageClaimDraft = "<div class='col-sm-12-1 scroller'	style='width: 101%; margin-top: -21px; border: 1px solid #b8b8b8; height: 408px; max-height: auto;'>	<table class='table table-striped table-condensed cf'>		<tbody>			{#foreach $T.pl as pl}			<tr>				<td class='col-md-1 center' style='height: 21.5px;'>{count++}.</td>				<td class='col-md-4 center' style='height: 21.5px;'>{$T.pl.fn}					{$T.pl.mn} {$T.pl.ln}</td>				<td class='col-md-1 center' style='height: 21.5px;'>{$T.pl.objTreat.pi}</td>				<td class='col-md-2 center' style='height: 21.5px;'>{$T.pl.objTreat.claim_time}</td>				<td class='col-md-2 center' style='height: 21.5px;'><input					class='btn btn-xs btn-success' type='button' value='Apply'					id='btnView{count}'					onclick = setID({$T.pl.objTreat.pi},{$T.pl.objTreat.ti},'','{$T.pl.fn}{$T.pl.mn}{$T.pl.ln}')					data-target='#applyPopUp' data-toggle='modal' /> 				</td>			</tr>			{#/for}		</tbody>	</table>	";
var TempTreatClosePat = "<div class='col-sm-12-1 scroller'	style='margin-top: -21px; border: 1px solid #b8b8b8; height: 408px; max-height: auto;'>	<table class='table table-striped table-condensed cf'style='width: 101%;'>		<tbody>			{#foreach $T.pl as pl}			<tr>				<td class='col-md-1 center' style='height: 21.5px;'>{count++}.</td>				<td class='col-md-3' style='height: 21.5px;'>{$T.pl.tit}					{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>				<td class='col-md-1 center' style='height: 21.5px;'>{$T.pl.objTreat.pi}</td>				<td class='col-md-1 center' style='height: 21.5px;'>{$T.pl.objTreat.ti}</td>				<td class='col-md-2 center' style='height: 21.5px;'>{$T.pl.objTreat.trCount}</td>				<td class='col-md-2 center' style='height: 21.5px;'>{$T.pl.objTreat.treEnd}</td>			</tr>			{#/for}		</tbody>	</table>	";

function setTreatTemp(type, PID, PName) {
	var PID = $("#MPreebyId").val();
	var PName = $("#MPreebyName").val();
	/*
	 * if(PID == "" || PName == "") { alert("Search field should not be blank");
	 * return false; }
	 */
	$("#msearch").show();
	$("#Status").hide();
	$("#authorization").hide();
	$("#Tclose").hide();
	$("#claimList").show();

	count = 1;
	var inputs = [];
	inputs.push('action=fetchPrevTreatmentPat');
	inputs.push('type=' + type);
	inputs.push('PID=' + PID);
	inputs.push('PName=' + PName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;

			$("#prevTreatmentObj").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#treatmentList").setTemplate(TempNewPreAuthorization);
			$("#treatmentList").processTemplate(pobj1);

		}
	});

}

function fetchCloseTreat() {
	$("#Tclose").show();
	$("#").hide();
	$("#Status").hide();
	$("#authorization").hide();
	$("#claimList").show();

	var PID = $("#ClosePatId").val();
	count = 1;
	var inputs = [];
	inputs.push('action=fetchCloseTreatPat');
	inputs.push('pid=' + PID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#treatcloseList").setTemplate(TempTreatClosePat);
			$("#treatcloseList").processTemplate(pobj1);
		}
	});
}

var TempManageClaimUnpro = "<div class='col-sm-12-1 scroller'	style='width: 101%; margin-top: -21px; border: 1px solid #b8b8b8; height: 350px; max-height: auto;'>	<table class='table table-striped table-condensed cf'>		<tbody>			{#foreach $T.pl as pl}			<tr>				<td class='col-md-1 center' style='height: 21.5px;'>{count++}.</td>				<td class='col-md-4 center' style='height: 21.5px;'>{$T.pl.fn}					{$T.pl.mn} {$T.pl.ln}</td>				<td class='col-md-1 center' style='height: 21.5px;'>{$T.pl.objTreat.pi}</td>				<td class='col-md-1 center' style='height: 21.5px;'>{$T.pl.objTreat.ti}</td>				<td class='col-md-2 center' style='height: 21.5px;'><input					class='btn btn-xs btn-warning' type='button' value='Enhanced'					id='btnView{count}'					onclick= setID({$T.pl.objTreat.pi},{$T.pl.objTreat.ti},'enhance')					data-target='#enhancePopUp' data-toggle='modal' /></td>				<td><input class='btn btn-xs btn-info' type='button'					value='Need	Info' id='btnView{count}'					onclick= setID({$T.pl.objTreat.pi},{$T.pl.objTreat.ti},'needinfo')					data-target='#needinfoPopUp' data-toggle='modal' /></td>				<td><input class='btn btn-xs btn-success' type='button'					value='Approve' id='btnView{count}'					onclick = setID({$T.pl.objTreat.pi},{$T.pl.objTreat.ti},'approve')					data-target='#approvePopUp' data-toggle='modal' /></td>			</tr>			{#/for}		</tbody>	</table>	";
var TempManageClaimEnhance = "<div class='col-sm-12-1 scroller'	style='width: 101%; margin-top: -21px; border: 1px solid #b8b8b8; height: 350px; max-height: auto;'>	<table class='table table-striped table-condensed cf'>		<tbody>			{#foreach $T.pl as pl}			<tr>				<td class='col-md-1 center' style='height: 21.5px;'>{count++}.</td>				<td class='col-md-4 center' style='height: 21.5px;'>{$T.pl.fn}					{$T.pl.mn} {$T.pl.ln}</td>				<td class='col-md-1 center' style='height: 21.5px;'>{$T.pl.objTreat.pi}</td>				<td class='col-md-1 center' style='height: 21.5px;'>{$T.pl.objTreat.ti}</td>				<td class='col-md-2 center' style='height: 21.5px;'><input					class='btn btn-xs btn-success' type='button' value='Approve'					id='btnView{count}'					onclick= setID({$T.pl.objTreat.pi},{$T.pl.objTreat.ti},'approve')					data-target='#approvePopUp' data-toggle='modal' /> <input					class='btn btn-xs btn-danger' type='button' value='Reject'					id='btnView{count}'					onclick= setID({$T.pl.objTreat.pi},{$T.pl.objTreat.ti},'reject')					data-target='#rejectPopUp' data-toggle='modal' /></td>			</tr>			{#/for}		</tbody>	</table>	";
var TempManageClaimApprove = "<div class='col-sm-12-1 scroller'	style='width: 101%; margin-top: -21px; border: 1px solid #b8b8b8; height: 350px; max-height: auto;'>	<table class='table table-striped table-condensed cf'>		<tbody>			{#foreach $T.pl as pl}			<tr>				<td class='col-md-1 center' style='height: 21.5px;'>{count++}.</td>				<td class='col-md-4 center' style='height: 21.5px;'>{$T.pl.fn}					{$T.pl.mn} {$T.pl.ln}</td>				<td class='col-md-1 center' style='height: 21.5px;'>{$T.pl.objTreat.pi}</td>				<td class='col-md-1 center' style='height: 21.5px;'>{$T.pl.objTreat.ti}</td>				<td class='col-md-2 center' style='height: 21.5px;'>Approved</td>			</tr>			{#/for}		</tbody>	</table>	";
var TempManageClaimReject = "<div class='col-sm-12-1 scroller'	style='width: 101%; margin-top: -21px; border: 1px solid #b8b8b8; height: 350px; max-height: auto;'>	<table class='table table-striped table-condensed cf'>		<tbody>			{#foreach $T.pl as pl}			<tr>				<td class='col-md-1 center' style='height: 21.5px;'>{count++}.</td>				<td class='col-md-4 center' style='height: 21.5px;'>{$T.pl.fn}					{$T.pl.mn} {$T.pl.ln}</td>				<td class='col-md-1 center' style='height: 21.5px;'>{$T.pl.objTreat.pi}</td>				<td class='col-md-1 center' style='height: 21.5px;'>{$T.pl.objTreat.ti}</td>				<td class='col-md-2 center' style='height: 21.5px;'>					Rejected				</td>			</tr>			{#/for}		</tbody>	</table>	";
var TempManageClaimAll = "<div class='col-sm-12-1 scroller'	style='width: 101%; margin-top: -21px; border: 1px solid #b8b8b8; height: 350px; max-height: auto;'>	<table class='table table-striped table-condensed cf'>		<tbody>			{#foreach $T.pl as pl}			<tr>				<td class='col-md-1 center' style='height: 21.5px;'>{count++}.</td>				<td class='col-md-4 center' style='height: 21.5px;'>{$T.pl.fn}					{$T.pl.mn} {$T.pl.ln}</td>				<td class='col-md-1 center' style='height: 21.5px;'>{$T.pl.objTreat.pi}</td>				<td class='col-md-1 center' style='height: 21.5px;'>{$T.pl.objTreat.ti}</td>				<td class='col-md-2 center' style='height: 21.5px;'>{$T.pl.objTreat.mcflag}</td>			</tr>			{#/for}		</tbody>	</table>	";

function setID(PID, TID, type, Fname) {

	$("#CPatid").html(PID);
	$("#CPatName").html(Fname);
	$("#popPIDounpro").html(PID);
	$("#popTIDounpro").html(TID);

	fetchmanageClaim(PID, TID, type);

}

function fetchmanageClaim(PID, TID, type) {
	if (type == "enhance") {
		$("#EAA").val("");
		$("#EREQ").val("");
		$("#EREQ").val("");
		$("#txtEnh").val("");
		$("#enhlab").val("");

	} else if (type == "approve") {
		$("#AAA").val("");
		$("#AER").val("");
		$("#ARC").val("");
		$("#txtapprov").val("");
		$("#applab").val("");
	} else if (type == "reject") {

		$("#RRC").val("");
		$("#txtreject").val("");
		$("#rejlab").val("");
	} else if (type == "needinfo") {
		$("#needlab").val("");
	}
	var inputs = [];
	inputs.push('action=fetchClaimManage');
	inputs.push('PID=' + PID);
	inputs.push('TID=' + TID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			var objClaim = eval('(' + ajaxResponse + ')');
			$("#enhData").html(ajaxResponse);

			setClaimData(objClaim, type);
		}
	});
}

function setClaimData(objClaim, type) {

	if (type == "enhance") {
		$("#ETA").val(objClaim.pl[0].TotalAmt);
	} else if (type == "approve") {
		$("#AAA").val(objClaim.pl[0].appAmt);
		$("#AER").val(objClaim.pl[0].AmtReq);
		$("#ATA").val(objClaim.pl[0].TotalAmt);
		$("#ARC").val(0);
	} else if (type == "reject") {
		$("#RAA").val(objClaim.pl[0].appAmt);
		$("#RER").val(objClaim.pl[0].AmtReq);
		$("#RTA").val(objClaim.pl[0].TotalAmt);
	}
}

function saveClaimDetails(type) {

	var PatID = $("#popPIDounpro").html();
	var TreatID = $("#popTIDounpro").html();

	if (type == "needinfo") {

	} else

	if (type == "enhance") {
		var ApproveAmt = $("#EAA").val();
		var AmtReq = $("#EREQ").val();
		// var TotalAmt = $("#ETA").val();
		var Note = $("#txtEnh").val();

	} else if (type == "approve") {
		var ApproveAmt = $("#AAA").val();
		var AmtReq = $("#AER").val();
		// var TotalAmt = $("#ATA").val();
		var AmtRec = $("#ARC").val();
		var Note = $("#txtapprov").val();

	} else if (type == "reject") {
		var ApproveAmt = $("#RAA").val();
		var AmtReq = $("#RER").val();
		// var TotalAmt = $("#RTA").val();
		var AmtRec = $("#RRC").val();
		var Note = $("#txtreject").val();

	} else if (type == "drft") {
		var ClAmt = $("#DCLA").val();
		var TotalAmt = $("#DTA").val();
		var Note = $("#txtapply").val();
	}

	if (type == "drft" && ClAmt == "") {
		alert("Please Enter Claim Amount");
		SetFocus("CLA");
		return false;
	}

	if (type != "drft" && ApproveAmt == "") {
		alert("Please Enter Approved Amount");
		SetFocus("EAA");
		return false;
	}

	if (type != "drft" && AmtReq == "") {
		alert("Please Enter Required Amount");
		SetFocus("EREQ");
		return false;
	}

	if (TotalAmt == "") {
		alert("Please Enter Total Amount");
		SetFocus("CTA");
		return false;
	}
	if (type == "approve" && AmtRec == "") {
		alert("Please Enter Recieved Amount");
		SetFocus("ERC");
		return false;
	}
	if (Note == "") {
		alert("Please Write Details ");
		return false;
	}

	var inputs = [];
	inputs.push('action=saveClaimDetail');
	inputs.push('type=' + type)
	inputs.push('Pid=' + PatID);
	inputs.push('Tid=' + TreatID);
	inputs.push('claimAmt=' + ClAmt);
	inputs.push('totalAmt=' + TotalAmt);
	inputs.push('note=' + Note);
	inputs.push('ApproveAmt=' + ApproveAmt);
	inputs.push('AmmountReq=' + AmtReq);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			if (type == "enhance") {
				$("#enhlab").html("Submitted Successfully...")
			} else if (type == "drft") {
				$("#draftlab").html("Submitted Successfully...")
			} else if (type == "reject") {
				$("#rejlab").html("Submitted Successfully...")
			} else if (type == "approve") {
				$("#applab").html("Submitted Successfully...")
			} else if (type == "needinfo") {
				$("#needlab").html("Submitted Successfully...")
			}
			updateFlag(type, '', '');
		}
	}
	);

}

function fetchManageClaimDetails(type) {

	count = 1;
	var inputs = [];
	inputs.push('action=fetchManageClaim');
	inputs.push('type=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			if (type == "draft") {
				$("#mcdraftList").setTemplate(TempManageClaimDraft);
				$("#mcdraftList").processTemplate(pobj1);
			} else if (type == "unpro") {
				$("#mcunproList").setTemplate(TempManageClaimUnpro);
				$("#mcunproList").processTemplate(pobj1);
			} else if (type == "enhance") {
				$("#mcEnhanceList").setTemplate(TempManageClaimEnhance);
				$("#mcEnhanceList").processTemplate(pobj1);

			} else if (type == "needinfo") {
				$("#mcNMIList").setTemplate(TempManageClaimEnhance);
				$("#mcNMIList").processTemplate(pobj1);

			} else if (type == "approve") {
				$("#mcApproveList").setTemplate(TempManageClaimApprove);
				$("#mcApproveList").processTemplate(pobj1);

			} else if (type == "reject") {
				$("#mcRejectList").setTemplate(TempManageClaimReject);
				$("#mcRejectList").processTemplate(pobj1);

			} else if (type == "all") {
				$("#mcAllList").setTemplate(TempManageClaimAll);
				$("#mcAllList").processTemplate(pobj1);
			}
		}
	});
}

var TempCompanyName = "<option id='0' value='0'>----Select----</option>{#foreach $T.pl as pl}<option id='{$T.pl.id}' value='{$T.pl.id}'>{$T.pl.compNm}</option>{#/for}";

function fetchCompanyDetails() {

	count = 1;
	var inputs = [];
	inputs.push('action=fetchCompanyDetails');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#company").setTemplate(TempCompanyName);
			$("#company").processTemplate(pobj1);
		}
	});
}

function setPatientSelectId(value) {
	count = 1;
	var CID = $("#companyID").html();
	var drft = $("#draft").html();
	var unpro = $("#unpro").html();
	var enh = $("#enhance").html();
	var needin = $("#needinfo").html();
	var app = $("#approve").html();
	var rej = $("#reject").html();
	if (value == null) {
		var value = CID;

	}
	var inputs = [];
	inputs.push('action=fetchInshurPatient');
	inputs.push('value=' + value);
	inputs.push('draft=' + drft);
	inputs.push('unprocess=' + unpro);
	inputs.push('enhance=' + enh);
	inputs.push('needinfo=' + needin);
	inputs.push('approve=' + app);
	inputs.push('reject=' + rej);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#companyID").html(value);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#Patcontainer").setTemplate(TempManageClaimAll);
			$("#Patcontainer").processTemplate(pobj1);
		}
	});
}

function viewClaimPatient(type) {
	var ID = $("#companyID").html();
	if (document.getElementById("chkDraft").checked == true) {
		var draft = null;
		$("#draft").html("draft");
	} else {
		$("#draft").html(null);
	}
	if (document.getElementById("chkUnprocessed").checked == true) {
		var unpro = null;
		$("#unpro").html("unpro");
	} else {
		$("#unpro").html(null);
	}
	if (document.getElementById("chkEnh").checked == true) {
		var enhance = null;
		$("#enhance").html("enhance");
	} else {
		$("#enhance").html(null);
	}
	if (document.getElementById("chkApproved").checked == true) {
		var approve = null;
		$("#approve").html("approve");
	} else {
		$("#approve").html(null);
	}
	if (document.getElementById("chkRejected").checked == true) {
		var reject = null;
		$("#reject").html("reject");
	} else {
		$("#reject").html(null);
	}
	if (document.getElementById("chkNeedInfo").checked == true) {
		var needinfo = null;
		$("#needinfo").html("needinfo");
	} else {
		$("#needinfo").html(null);
	}
	setPatientSelectId(null);
}

function showD() {

	$("#btnApply").hide();
	$("#authorization").hide();
	$("#claimList").hide();
	$("#Tclose").hide();
	$("#Status").show();

	fetchManageClaimDetails("draft");
}

function setSpecilizationAndDepartmentForRegistration() {

	var docId = 0;
	ajaxResponse = $("#doctorObject").val();

	doctorBean = eval('(' + ajaxResponse + ')');

	var admittedUnder = $("#refTo").val();

	if (admittedUnder == "select") {
		alert("Please select patient category");
		return false;
	}
	if (admittedUnder == "opd") {
		docId = $("#doctorName").val();
	} else if (admittedUnder == "ipd") {
		docId = $("#ipdDoctorName").val();
	} else if (admittedUnder == "er") {
		docId = $("#erCMOConsultant").val();
	} else if (admittedUnder == "room") {
		docId = $("#ReserveDoctorName").val();
	}

	for ( var i = 0; i < doctorBean.dl.length; i++) {
		if (doctorBean.dl[i].di == docId) {
			if (admittedUnder == "opd") {
				$('#doctorSpecilization').val(doctorBean.dl[i].sp);
				$('#doctorDepartments').val(doctorBean.dl[i].dept);
			}
			if (admittedUnder == "ipd") {
				$('#ipdDoctorSpecilization').val(doctorBean.dl[i].sp);
				$('#ipdDoctorDepartments').val(doctorBean.dl[i].dept);
			}
			if (admittedUnder == "er") {
				$('#erdoctorSpecilization').val(doctorBean.dl[i].sp);
				$('#erdoctorDepartments').val(doctorBean.dl[i].dept);
			}
			if (admittedUnder == "room") {
				$('#ReserveDoctorSpecilization').val(doctorBean.dl[i].sp);
				$('#ReserveDoctorDepartments').val(doctorBean.dl[i].dept);
			}
		}
		if (docId == 0) {
			if (admittedUnder == "opd") {
				$('#doctorSpecilization').val(0);
				$('#doctorDepartments').val(0);
			}
			if (admittedUnder == "ipd") {
				$('#ipdDoctorSpecilization').val(0);
				$('#ipdDoctorDepartments').val(0);
			}
			if (admittedUnder == "er") {
				$('#erdoctorSpecilization').val(0);
				$('#erdoctorDepartments').val(0);
			}
			if (admittedUnder == "room") {
				$('#ReserveDoctorSpecilization').val(doctorBean.dl[i].sp);
				$('#ReserveDoctorDepartments').val(doctorBean.dl[i].dept);
			}
		}
	}
}

function setDoctorsForDepartmentsForRegistration() {
	var doctorObjects = {
		dl : []
	};
	ajaxResponse = $("#doctorObject").val();
	doctorBean = eval('(' + ajaxResponse + ')');
	var admittedUnder = $("#refTo").val();
	if (admittedUnder == "select") {
		alert("Please select patient category");
		return false;
	}
	var departmentId;
	if (admittedUnder == "opd") {
		departmentId = $("#doctorDepartments").val();
	} else if (admittedUnder == "ipd") {
		departmentId = $("#ipdDoctorDepartments").val();
	} else if (admittedUnder == "er") {
		departmentId = $("#erdoctorDepartments").val();
	} else if (admittedUnder == "room") {
		departmentId = $("#ReserveDoctorDepartments").val();
	}

	for ( var i = 0; i < doctorBean.dl.length; i++) {
		if (doctorBean.dl[i].dept == departmentId) {
			doctorObjects.dl.push(doctorBean.dl[i]);
		}
	}
	if (admittedUnder == "opd") {
		$("#doctorName").setTemplate(docNameTemplateForOPD);
		$("#doctorName").processTemplate(doctorObjects);
	} else if (admittedUnder == "ipd") {
		$("#ipdDoctorName").setTemplate(docNameTemplateForOPD);
		$("#ipdDoctorName").processTemplate(doctorObjects);
	} else if (admittedUnder == "er") {
		$("#erCMOConsultant").setTemplate(docNameTemplateForOPD);
		$("#erCMOConsultant").processTemplate(doctorObjects);
	} else if (admittedUnder == "room") {
		$("#ReserveDoctorName").setTemplate(docNameTemplateForOPD);
		$("#ReserveDoctorName").processTemplate(doctorObjects);
	}
}

function setDoctorsFromSpecilizationForRegistration() {
	var doctorObjects = {
		dl : []
	};

	ajaxResponse = $("#doctorObject").val();
	doctorBean = eval('(' + ajaxResponse + ')');
	var admittedUnder = $("#refTo").val();
	var specializationId;
	if (admittedUnder == "opd") {
		specializationId = $("#doctorSpecilization").val();
	} else if (admittedUnder == "ipd") {
		specializationId = $("#ipdDoctorSpecilization").val();
	} else if (admittedUnder == "er") {
		specializationId = $("#erdoctorSpecilization").val();
	} else if (admittedUnder == "room") {
		specializationId = $("#ReserveDoctorSpecilization").val();
	}

	for ( var i = 0; i < doctorBean.dl.length; i++) {
		if (doctorBean.dl[i].sp == specializationId) {
			doctorObjects.dl.push(doctorBean.dl[i]);
		}
	}
	if (admittedUnder == "opd") {
		$("#doctorName").setTemplate(docNameTemplateForOPD);
		$("#doctorName").processTemplate(doctorObjects);
	} else if (admittedUnder == "ipd") {
		$("#ipdDoctorName").setTemplate(docNameTemplateForOPD);
		$("#ipdDoctorName").processTemplate(doctorObjects);
	} else if (admittedUnder == "er") {
		$("#erCMOConsultant").setTemplate(docNameTemplateForOPD);
		$("#erCMOConsultant").processTemplate(doctorObjects);
	} else if (admittedUnder == "room") {
		$("#ReserveDoctorName").setTemplate(docNameTemplateForOPD);
		$("#ReserveDoctorName").processTemplate(doctorObjects);
	}

}

function addIpdDoctorName() {

	var docid = $("#ipdDoctorName").val();
	var docName = $("#ipdDoctorName option:selected").text();

	if (docid == 0) {
		alert("Please Select Doctor.");
		return false;
	}
	var add = docName + '\n';
	var doctorid = docid + '\n';

	var flag = 0;
	$('#ipdDoctors').find('option').each(function() {
		if ($(this).html() == add) {
			alert("Doctor Is Present In List");
			flag = 1;
		}
	});
	if (flag == 0) {
		var o = new Option("option text", "value");
		// / jquerify the DOM object 'o' so we can use the html method
		$(o).html(add);
		$(o).val(doctorid);
		// $(0).val();
		$("#ipdDoctors").append(o);
	}
}

function removeIpdDoctor() {

	$('#ipdDoctors option:selected').remove();

}

function addIpdReserveDoctorName() {

	var docid = $("#ReserveDoctorName").val();
	var docName = $("#ReserveDoctorName option:selected").text();

	if (docid == 0) {
		alert("Please Select Doctor.");
		return false;
	}
	var add = docName + '\n';
	var doctorid = docid + '\n';

	var flag = 0;
	$('#ipdReserveDoctors').find('option').each(function() {
		if ($(this).html() == add) {
			alert("Doctor Is Present In List");
			flag = 1;
		}
	});
	if (flag == 0) {
		var o = new Option("option text", "value");
		// / jquerify the DOM object 'o' so we can use the html method
		$(o).html(add);
		$(o).val(doctorid);
		// $(0).val();
		$("#ipdReserveDoctors").append(o);
	}
}

function removeIpdReserveDoctor() {

	$('#ipdReserveDoctors option:selected').remove();

}

var sponsredDetailsTemplate = "<option value='select'>-select-</option>{#foreach $T.sponsoredDetailsDTOList as sl}<option value='{$T.sl.sposoredID}'>{$T.sl.sponsoredName}</option>{#/for}";

function fetchSponseredDetailsForRegistration(type) {
	var inputs = [];
	inputs.push('action=fetchSponsoredDetails');
	inputs.push('type=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("unable to fetch Sponsored details");
		},
		success : function(r) {
			var ajaxResponse = r;
			$("#SponsorDetails").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#sponsoredType").setTemplate(sponsredDetailsTemplate);
			$("#sponsoredType").processTemplate(pobj1);
		}
	});
}

var sponsredNameTemplate = "<option value='select'>-select-</option>{#foreach $T.sl as sl}<option value='{$T.sl.si}'>{$T.sl.sn}</option>{#/for}";

function getSponsreNameBySponserType() {
	var sponsoredTypeId = $("#sponsoredType").val();
	var inputs = [];
	inputs.push('action=fetchSponsredNameBySponserType');
	inputs.push('sponsoredTypeId=' + sponsoredTypeId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("unable to fetch Sponsored details");
		},
		success : function(r) {
			var ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#sponseredName").setTemplate(sponsredNameTemplate);
			$("#sponseredName").processTemplate(pobj1);
		}
	});
}

var companyNameTemplate = "<option value='select'>-select-</option>{#foreach $T.liCompAgg as lca}<option value='{$T.lca.id}'>{$T.lca.compNm}</option>{#/for}";

function getCompanyNameBySponserType() {
	/**
	 * ***************modified by
	 * 
	 * @author husen*************
	 */
	$("#insuranceValidFrom").val("");
	$("#insuranceValidTo").val("");
	var sponsoredTypeId = $("#sponsoredType").val();
	if (sponsoredTypeId == "select") {
		$("#companyName").val("select");
		$("#sponseredName").val("select");
		return false;
	} else {
		var inputs = [];
		inputs.push('action=fetchCompanyNameBySponserType');
		inputs.push('sponsoredTypeId=' + sponsoredTypeId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("unable to fetch Company details");
			},
			success : function(r) {
				var ajaxResponse = r;
			
				$("#CompanyDetails").html(ajaxResponse);
				pobj1 = eval('(' + ajaxResponse + ')');
				$("#companyName").setTemplate(companyNameTemplate);
				$("#companyName").processTemplate(pobj1);
			}
		});
	}
}

var policyNameTemplate = "<option value='select'>-select-</option>{#foreach $T.sl as sl}<option value='{$T.sl.si}'>{$T.sl.comNm}</option>{#/for}";

function getPolicyNameByCompanyName() {
	
	var sponsoredTypeId = $("#sponsoredType").val();
	var companyNameId = $("#companyName").val();
	var inputs = [];
	inputs.push('action=fetchPolicyNameByCompanyName');
	inputs.push('sponsoredTypeId=' + sponsoredTypeId);
	inputs.push('companyNameId=' + companyNameId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("unable to fetch Policy details");
		},
		success : function(r) {
			
			var ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#sponseredName").setTemplate(policyNameTemplate);
			$("#sponseredName").processTemplate(pobj1);
		}
	});
}

function showSponsoredTDForCostEstimation(){
	$(".sponsType").show();
	$(".compName").show();
	$(".policyName").show();
	fetchSponseredDetailsForRegistration('onload');
	
}

function hideSponsoredTDForCostEstimation(){
	$(".sponsType").hide();
	$(".compName").hide();
	$(".policyName").hide();
}

function setEffectiveDateofCompany() {

	var companyName = $("#companyName").val();
	/**
	 * ***************modified by
	 * 
	 * @author husen*************
	 */
	if (companyName == "select") {
		$("#sponseredName").val("select");
		$("#insuranceValidFrom").val("");
		$("#insuranceValidTo").val("")
		return false;
	} else {
		var details = $("#CompanyDetails").html();
		var detailsBean = eval('(' + details + ')');
	
		var myobj = null;
		for ( var i = 0; i < detailsBean.liCompAgg.length; i++) {
			if (detailsBean.liCompAgg[i].id == companyName) {
				myobj = detailsBean.liCompAgg[i];
				break;
			}
		}
		$("#insuranceValidFrom").val(myobj.effFroDt);
		$("#insuranceValidTo").val(myobj.effToDt);
	}
}

function makeSponsredFieldsReadOnly() {

	if ($("#selfCheckbox").is(':checked') == true) {
		$("#insuredTitle").attr('readonly', 'readonly');
		$("#insuredAddress").attr('readonly', 'readonly');
		$("#insuredFirstName").attr('readonly', 'readonly');
		$("#insuredLastName").attr('readonly', 'readonly');
		$("#insuredSex").attr('readonly', 'readonly');
		$("#insuredMobile").attr('readonly', 'readonly');
		$("#insuredEmail").attr('readonly', 'readonly');
		$("#insuredAge").attr('readonly', 'readonly');
		$("#insuredRelation").attr('disabled', 'disabled');

	} else {
		$("#insuredTitle").removeAttr('readonly', 'readonly');
		$("#insuredAddress").removeAttr('readonly', 'readonly');
		$("#insuredFirstName").removeAttr('readonly', 'readonly');
		$("#insuredLastName").removeAttr('readonly', 'readonly');
		$("#insuredSex").removeAttr('readonly', 'readonly');
		$("#insuredMobile").removeAttr('readonly', 'readonly');
		$("#insuredEmail").removeAttr('readonly', 'readonly');
		$("#insuredAge").removeAttr('readonly', 'readonly');
		$("#insuredRelation").removeAttr('disabled', false);
	}
}

function saveSponsredDetails(callfrom) {

	var patID = $("#patID").val();
	if (callfrom == "markVisit") {
		if (patID == 0) {
			alert("Please select patient to save Sponsor Details");
			return false;
		}
	}
	var insuredTitle = $("#insuredTitle").val();
	var insuredFirstName = $("#insuredFirstName").val();
	var insuredLastName = $("#insuredLastName").val();
	var insuredSex = $("#insuredSex").val();
	var insuredMobile = $("#insuredMobile").val();
	var insuredEmail = $("#insuredEmail").val();
	var insuredAge = $("#insuredAge").val();
	var insuredRelation = $("#insuredRelation").val();
	var insuredAddress = $("#insuredAddress").val();
	var sponsoredType = $("#sponsoredType").val();
	var sponseredName = $("#sponseredName").val();
	var companyNameId = $("#companyName").val();
	var companyId = $("#companyId").val();
	var identification = $("#identification").val();
	var identificationNo = $("#identificationNo").val();
	var preauthNo = $("#preauthNo").val();
	var preauthdate = $("#preauthdate").val();
	var cashlessPolicyNo = $("#cashlessPolicyNo").val();
	var cnnNo = $("#cnnNo").val();
	var insuranceValidFrom = $("#insuranceValidFrom").val();
	var insuranceValidTo = $("#insuranceValidTo").val();

	var inputs = [];
	inputs.push('action=saveSponsredDetails');
	inputs.push('patID=' + patID);
	inputs.push('insuredTitle=' + insuredTitle);
	inputs.push('insuredFirstName=' + insuredFirstName);
	inputs.push('insuredLastName=' + insuredLastName);
	inputs.push('insuredSex=' + insuredSex);
	inputs.push('insuredMobile=' + insuredMobile);
	inputs.push('insuredEmail=' + insuredEmail);
	inputs.push('insuredAge=' + insuredAge);
	inputs.push('insuredRelation=' + insuredRelation);
	inputs.push('insuredAddress=' + insuredAddress);
	inputs.push('sponsoredType=' + sponsoredType);
	inputs.push('companyNameId=' + companyNameId);
	inputs.push('sponseredName=' + sponseredName);
	inputs.push('companyId=' + companyId);
	inputs.push('identification=' + identification);
	inputs.push('identificationNo=' + identificationNo);
	inputs.push('preauthNo=' + preauthNo);
	inputs.push('preauthdate=' + preauthdate);
	inputs.push('cashlessPolicyNo=' + cashlessPolicyNo);
	inputs.push('cnnNo=' + cnnNo);
	inputs.push('insuranceValidFrom=' + insuranceValidFrom);
	inputs.push('insuranceValidTo=' + insuranceValidTo);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("Please fill sponsor details");
		},
		success : function(r) {
			alert(r);
			if (callfrom == "patientEdit") {
				viewPatient("forsinglepat");
			} else {
				setPatientSponsorDetailsForMarkVisit(patID);

				$("#insuredTitle").val("select");
				$("#insuredFirstName").val("");
				$("#insuredLastName").val("");
				$("#insuredSex").val("Select");
				$("#insuredMobile").val("");
				$("#insuredEmail").val("");
				$("#insuredAge").val("");
				$("#insuredRelation").val("");
				$("#insuredAddress").val("");
				$("#sponsoredType").val("select");
				$("#sponseredName").val("select");
				$("#companyName").val("select");
				$("#companyId").val("");
				$("#identification").val("");
				$("#identificationNo").val("");
				$("#preauthNo").val("");
				$("#preauthdate").val("");
				$("#cashlessPolicyNo").val("");
				$("#cnnNo").val("");
				$("#insuranceValidFrom").val("");
				$("#insuranceValidTo").val("");
			}
		}
	});
}

function setSpecialDiscountId(sponsredId) {
	$("#selectedSponsredId").val(sponsredId);
	$("#userPassword").val("");
	// $("#activeInsurance"+sponsredId).prop( "checked", true );
}

function changePatientSponser(callfrom) {

	var selectedSponsredId = $("#selectedSponsredId").val();
	$("#activeInsurance" + selectedSponsredId).prop("checked", true);
	var trid = $("#trid").val();
	var userPassword = $("#userPassword").val();

	var inputs = [];
	inputs.push('action=changePatientSponser');
	inputs.push('selectedSponsredId=' + selectedSponsredId);
	inputs.push('trid=' + trid);
	inputs.push('userPassword=' + userPassword);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("unable to fetch Sponsored details");
		},
		success : function(r) {
			alert(r);
			if (callfrom == "Registration") {
				viewPatient("forsinglepat");
				$("#passwordPopUp").modal('hide');
			} else if (callfrom == "Billing") {
				location.href = "BillingDashboardForIPD.jsp";
			} else {
				location.href = "BillingDashboardForIPD.jsp";
			}
		}
	});
}

function setSponserDetailsMsg() {
	
		if ($("#billCategory").val() == '2') {
			
			$("#Msgdiv").show();
			
		} else if($("#billCategory").val() == '0') {
			
			$("#Msgdiv").hide();
			
		}else{
			
			$("#Msgdiv").hide();
		}
	 
}

function setAutoPatientName(inputID, onload, callFrom) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	var autoType = '';
	var auto = '';
	if (callFrom == "IPD_OPD_PatientDatabase") {
		auto = 'PatientName';
	} else if (callFrom == "OPDOldPatientDatabase") {
		auto = 'OPDManagementPatient';
	} else if (callFrom == "IPD_BedWardPatientDatabase") {
		auto = 'ipdbedward';
	} else if (callFrom == "IPD_OldPatientDatabase") {
		auto = 'ipdPatient';
	} else if (callFrom == "IPD_Bill_PatientDatabase") {
		auto = 'IPDBillPatient';
	} else if (callFrom == "Diagno_PatientBillDatabase") {
		auto = 'DigonosticPatient';
	} else if (callFrom == "MarkVisit_Database") {
		auto = 'MarkVisitPatient';
	} else if (callFrom == "previousOPDbill") {
		auto = 'PreviousOPDBillPatient';
	} else if (callFrom == "IPD_AdvanceDatabase") {
		auto = 'IPDAdvance';
	} else if (callFrom == "Consentform_Database") {
		auto = 'Consentform';
	} else if (callFrom == "Manage_ReferenceDatabase") {
		auto = 'Manage_Reference';
	} else if (callFrom == "OPDDoctorDesk_Dashboard") {
		auto = 'OPDDoctorDesk';
		autoType = inputID.substring(5);
	} else if (callFrom == "OperationDashboard") {
		//auto = 'ManageOperationPatient';
	} else if (callFrom == "OperationSummaryDashboard") {
		auto = 'previousOperation';
	} else if (callFrom == "prevIPD_BillDatabase") {
		auto = 'preIPDBillPatient';
		autoType = 'g';
	} else if (callFrom == "BillingRegister") {
		auto = 'preIPDBillPatient';
		autoType = 'c';
	} else if (callFrom == "Pharmacy_Invoice") {
		auto = 'ipdPatient';
	} else if (callFrom == "CardioAssignTestPatientDatabase") {
		auto = 'CardiologyAssignPatient';
		// Auto Suggetion for Admin Model
	} else if (callFrom == "UserMgmt_Database"
			|| callFrom == "User_Access_Mgmt" || callFrom == "HRMgmt_Database") {
		auto = 'UserName';
	} else if (callFrom == "HallType_Management") {
		auto = 'HallTypeName';
	} else if (callFrom == "BedWard_Management") {
		auto = 'HallName';
	} else if (callFrom == "ChartMgmt_Database") {
		auto = 'ChartName';
	} else if (callFrom == "PhysiotherapyTest") {
		auto = 'PhysioTestName';
	} else if (callFrom == "DentalService_Database") {
		auto = 'DentalService';
	} else if (callFrom == "CasualityService_Database") {
		auto = 'CasualityTestName';
	} else if (callFrom == "OTandIPDservice_Database") {
		auto = 'IpdService';
		testType = $("#testType").val();
		if (testType == "bed") {
			autoType = 'b';
		} else if (testType == "gas") {
			autoType = 'g';
		} else if (testType == "instrument") {
			autoType = 'i';
		}
	} else if (callFrom == "NursingStation_BedSideProcedures") {
		auto = 'IpdService';
		autoType = 'b';
	} else if (callFrom == "NursingStation_GasesMonitors") {
		auto = 'IpdService';
		autoType = 'g';
	} else if (callFrom == "NursingStation_Instruments") {
		auto = 'IpdService';
		autoType = 'i';
	} else if (callFrom == "InvestigationTest") {
		auto = 'Investigation_Test';
	} else if (callFrom == "InvestigationTestGroup") {
		auto = 'Invest_Test_Group';
	} else if (callFrom == "InvestigationBodyPart") {
		auto = 'Invest_Body_Part';
	} else if (callFrom == "prev_databaseForConsentForm") {
		auto = 'prev_databaseForConsentForm';
	} else if (callFrom == "OPD_Appoinment") {
		auto = 'PatientName';
	} else if (callFrom == "Previous_ManualSummary") {
		auto = 'Previous_ManualSummary';
	} else if (callFrom == "Previous_AutoSummary") {
		auto = 'Previous_AutoSummary';
	}else if (callFrom == "Medicine") {
		auto = 'medicine';
	}else if (callFrom == "PreOperativeCheckListMasterDetails") {
		auto = 'PreOperativeCheckList';
	}else if (callFrom == "OTOperationAction") {
		auto = 'PreOperativeCheckList';
	}else if (callFrom == "PreviousDiagno_PatientBillDatabase") {
		auto = 'PreviousDiagno_PatientBillDatabase';
	}else if (callFrom == "ShowTopPatForCertificate") {
		auto = 'ShowTopPatForCertificate';
	}else if (callFrom == "OtherServicesCharges") {
		auto = 'OtherServicesCharges';
	}else if (callFrom == "Anaesthetist_Fee_Management") {
		auto = 'Anaesthetist_Fee_Management';
	}else if (callFrom == "Anaesthetist_Fee_Management") {
		auto = 'Anaesthetist_Fee_Management';
	}else if (callFrom == "Pre-Anaesthetic_Assessment") {
		auto = 'Pre-Anaesthetic_Assessment';
	}//Tushar Code For Visiting Doctor Fee @ 1Feb2017
	else if (callFrom == "Visiting_Doc_Fee_Management") {
		auto = 'Visiting_Doc_Fee_Management';
	}//Tushar Code For Medication Route Master @ 13Feb2017
	else if (callFrom == "routeMaster") {
		auto = 'routeMaster';
	}
	
	/*
	 * else if (callFrom == "OPD_Appoinment") { //alert("in OPDAppoinment's
	 * condition "); auto = 'AutoPatientNameforAppointment'; }
	 */
	
	urls="./ehat/otdata/ManageOperationPatient";
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : urls,
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					
					ajaxResponse = r;//decodeURIComponent(r);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					
					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					$("#pathiddenid").val(idValue);
					setTimeout(function() {
						// $("#div" + inputID + " .typeahead").html("");
						$("#div" + inputID + " .typeahead").html(template);

						if (onload != "onload") {
							$("#div" + inputID + " .typeahead").show();
						}
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);

					/*
					 * if($("#" + inputID).val() == ""){
					 * $(".typeahead").click(function(e) { e.stopPropagation(); //
					 * This is the preferred method. return false; // This
					 * should not be used unless you do not want }); }
					 */
				}
			});
	function displayResult(item) {
		
		$("#" + inputID).val((item.text).trim());
		//@author : Touheed Khan
		//for channeling doctor in Motivator
		$("#txtDoctorId").val((item.value).trim());
		//@author : Amol Saware
		//for search user in HR module 
		/*var currentPage=window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1,window.location.pathname.lastIndexOf('.jsp'));
		if(currentPage=="HRManagement"){
			searchViewUser('HRDashBoard');
		}*/
	}

}

function setAutoPatientNameFrPreAuth(inputID, onload) {
	var resultData = [];
	var findingName = $("#" + inputID).val();

	var inputs = [];
	inputs.push('action=autoPatientNameFrPreAuth');
	inputs.push('findingName=' + findingName);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PatientServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = decodeURIComponent(r);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
			
					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					$("#pathiddenid").val(idValue);
					setTimeout(function() {
						// $("#div" + inputID + " .typeahead").html("");
						$("#div" + inputID + " .typeahead").html(template);

						if (onload != "onload") {
							$("#div" + inputID + " .typeahead").show();
						}
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);

				}
			});
	function displayResult(item) {

		$("#byName").val((item.text).trim());
	}

}

/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:autosuggestion
 ***********/
function setnursingservices(inputID,value) {
	
	
	var findingName=$("#" + inputID).val();
	var unit = 1;
	var unitlist=""; 
	var depdocdeskid = 2;
	
		var querytype="operation";
	    var serviceid=value; 
	
    
	var inputs = [];
	inputs.push('unit=' + unit);
	inputs.push('findingName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + depdocdeskid);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getallservices",
		success : function(r) {
			/*	        alert(r.lstSubService[0].categoryName);
			*/			
				
						
						
			autoperationnursing(r,inputID,value);
			             
			         
							
					}
				});
	
	
}
/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:autosuggestion services
 ***********/
function autoperationnursing(response,id,value) {
	
	var qty = id.slice(0, -1); // for dyamic col getting id
	//alert("hi");
	var myArray = response;// parsing response in JSON format
	//alert(myArray);
	//alert("b");
	$
			.widget(
					'custom.mcautocomplete',
					$.ui.autocomplete,
					{
						_create : function() {
							this._super();
							this.widget().menu("option", "items",
									"> :not(.ui-widget-header)");
						},
						_renderMenu : function(ul, items) {
							var self = this, thead;
							if (this.options.showHeader) {
								table = $('<div class="ui-widget-header" style="width:100%"></div>');
								$
										.each(
												this.options.columns,
												function(index, item) {
													table
															.append('<span style="padding:0 4px;float:left;width:'
																	+ item.width
																	+ ';">'
																	+ item.name
																	+ '</span>');
												});
								table
										.append('<div style="clear: both;"></div>');
								ul.append(table);
							}
							$.each(items, function(index, item) {
								self._renderItem(ul, item);
							});
						},
						_renderItem : function(ul, item) {
							var t = '', result = '';
							$
									.each(
											this.options.columns,
											function(index, column) {
												t += '<span style="padding:0 4px;float:left;width:'
														+ column.width
														+ ';">'
														+ item[column.valueField ? column.valueField
																: index]
														+ '</span>';
											});
							result = $('<li></li>')
									.data('ui-autocomplete-item', item)
									.append(
											'<a class="mcacAnchor">'
													+ t
													+ '<div style="clear: both;"></div></a>')
									.appendTo(ul);
							return result;
						}
					});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
			{
				// These next two options are what this plugin adds to the
				// autocomplete widget.
				showHeader : true,
				columns : [ {
					name : 'CategoryName',
					width : '100px',
					valueField : 'categoryName'
				},{
					name : 'ServiceName',
					width : '90px',
					valueField : 'serviceName'
				}/*, {
					name : 'doctypeId',
				//	width : '90px',
					valueField : 'doctypeId'
				}*/],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					console.log(ui);
					// this.value = (ui.item ? ui.item.dn : '');
					// this.value = (ui.item.spl = 'undefined' ? '' :
					// ui.item.dn);
					var spl = (ui.item.spl = "" ? '' : ui.item.spl);
					if (ui.item.dn != 'No' && ui.item.spl != 'Record'
							&& ui.item.specialisationName != 'Found'
							&& ui.item.depNm != 'Match') {
					//	$('#results').text(ui.item ? 'Selected: ' + ui.item.dn + ', '+ spl + ', '+ ui.item.specialisationName + ', ' + ui.item.depNm: 'Nothing selected, input was ' + this.value);
						//$('#' + id).val(ui.item.dn);
						//$('#userDocId').val(ui.item.ui);
						//$('#selectedObj').html(JSON.stringify(ui.item));
				
						if(ui.item.categoryName!="NO"){
							
							if(value==6){
								$("#txtEqNameb1TestID").val(ui.item.categoryid);
							}else if(value==7){
								$("#txtEqNameg1TestID").val(ui.item.categoryid);
								 
							
							}else if(value==8){
								//alert("asa");
								$("#txtEqNamei1TestID").val(ui.item.categoryid);
							
							}
							$("#idservnur").val(ui.item.categoryid);
							}
						
						   var sponsorId = $("#SponsorsourceTypeId").val();
	                        var chargesSlaveId = $("#chargesSlaveId").val();
	                     //   if(sponsorId > 0 && chargesSlaveId > 0){
							var depdocdeskid = 2;

	                       if(sponsorId == 0 && chargesSlaveId == 0){
	                    	   if(depdocdeskid==2){
	                    		   getchargesDRNST(2);
	                     		var chargesfromConf= $("#chargesfromConfNS").val();
	                     		if(chargesfromConf==0 || chargesfromConf==null){
	                     			 $("#chargesubservice" ).val(ui.item.categorycharges); 
	                     			 $("#txtcategorycharges").val(ui.item.categorycharges);
	                     		}else{
	                     			 $("#chargesubservice" ).val(chargesfromConf); 
	                     			 $("#txtcategorycharges").val(chargesfromConf);
	                     		}
	                     	  }else{
	                         		 	   $("#chargesubservice" ).val(ui.item.categorycharges);
	                                	   $("#txtcategorycharges").val(ui.item.categorycharges); 
	                         		 }
	                   
	                             }else{
	                            	 getchargesDR(2);
	                            	 var chargesfromConf= $("#chargesfromConfNS").val();
	                            	 if(depdocdeskid==2){
	                            	
	                            		if(chargesfromConf==0 || chargesfromConf==null){
	                            			if(parseFloat (chargesfromConf)==0.0 || parseFloat(chargesfromConf) ==0 || chargesfromConf ==null || chargesfromConf ==undefined){
	                            				if(parseFloat (ui.item.configcharges)==0.0 || parseFloat(ui.item.configcharges) ==0 || ui.item.configcharges ==null || ui.item.configcharges ==undefined){
	                                   			 $("#chargesubservice").val(ui.item.categorycharges);

	                               			 }else{
	                                   			 $("#chargesubservice").val(ui.item.configcharges);

	                               			 }
	                            			}
	                            			$("#txtcategorycharges").val(ui.item.categorycharges);

	                            			/* $("#chargesubservice" ).val(ui.item.categorycharges); 
	                            			 $("#cpoeCharges2").val(ui.item.categorycharges);*/
	                            		}else{
	                            			     $("#chargesubservice" ).val(chargesfromConf); 
	                                           	 if(parseFloat (ui.item.configcharges)==0.0 || parseFloat(ui.item.configcharges) ==0 || ui.item.configcharges ==null || ui.item.configcharges ==undefined){
	                                			 $("#txtcategorycharges").val(ui.item.categorycharges);

	                            			 }else{
	                                			 $("#txtcategorycharges").val(ui.item.configcharges);

	                            			 }
	                            		}
	                            	 }else{

	                    			     $("#chargesubservice" ).val(chargesfromConf); 
	                                   	 if(parseFloat (ui.item.configcharges)==0.0 || parseFloat(ui.item.configcharges) ==0 || ui.item.configcharges ==null || ui.item.configcharges ==undefined){
	                        			 $("#txtcategorycharges").val(ui.item.categorycharges);

	                    			 }else{
	                        			 $("#txtcategorycharges").val(ui.item.configcharges);

	                    			 }
	                    		
	                        			 /*$("#chargesubservice" ).val(ui.item.categorycharges); 
	                        			 $("#cpoeCharges2").val(ui.item.categorycharges);*/

	                            	 }
	                            	
	                             }
					/*	$("#txtcategorycharges").val(ui.item.categorycharges);
						$("#txtcategorycharges2").val(ui.item.categorycharges);
*/						calculateEmerChrForIpdServices();
						
						$("#" + id).val(ui.item.categoryName);
					}
				
					return false;
					/*setallservautocomplete(id);
					return false;*/
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.lstService.length);
					var result;
					if (!data || data.lstService.length === 0 || !data.lstService
							|| data.lstService.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/*'dn' : 'No',*/
							'categoryName' : 'NO',
							'serviceName' : 'Match',
							/*'depNm' : 'Match'*/
						} ];
					} else {
						result = data.lstService;// Response List for All
													// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
					
			
				}
			});
}








function setAutoSuggestionForIPDServices(inputID, onload, callFrom) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var autoType = '';
	var auto = '';

	if (callFrom == "b") { // NursingStation_BedSideProcedures
		auto = 'IpdService';
		autoType = 'b';
	} else if (callFrom == "g") { // NursingStation_GasesMonitors
		auto = 'IpdService';
		autoType = 'g';
	} else if (callFrom == "i") { // NursingStation_Instruments
		auto = 'IpdService';
		autoType = 'i';
	}

	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}

					setTimeout(function() {
						// $("#div" + inputID + " .typeahead").html("");
						$("#div" + inputID + " .typeahead").html(template);

						if (onload != "onload") {
							$("#div" + inputID + " .typeahead").show();
						}

						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);

					/*
					 * if($("#" + inputID).val() == ""){
					 * $(".typeahead").click(function(e) { e.stopPropagation(); //
					 * This is the preferred method. return false; // This
					 * should not be used unless you do not want }); }
					 */
				}
			});
	function displayResult(item) {

		if (((item.text).trim()) != "") {
			if (callFrom == "b") { // NursingStation_BedSideProcedures
				$("#txtEqNameb1").val((item.text).trim());
				$("#txtEqNameb1TestID").val((item.value).trim());
				$("#txtEqNameb1AssignedBy").val("0");
				$("#txtEqQtyb1").val("0");
			} else if (callFrom == "g") { // NursingStation_GasesMonitors
				$("#txtEqNameg1").val((item.text).trim());
				$("#txtEqNameg1TestID").val((item.value).trim());
				$("#txtEqNameg1AssignedBy").val("0");
				$("#txtEqQtyg1").val("0");
			} else if (callFrom == "i") { // NursingStation_Instruments
				$("#txtEqNamei1").val((item.text).trim());
				$("#txtEqNamei1TestID").val((item.value).trim());
				$("#txtEqNamei1AssignedBy").val("0");
				$("#txtEqQtyi1").val("0");
			}
		} else {
			alert("Select Proper Service...");
		}
	}
}

// Suraj Code For Indent
function setIndentDetails() {
	var favorite = [];
	$.each($("input[name='selectedGrp']:checked"), function() {
		favorite.push($(this).val());
	});
	if ($("#txtMRNDate").val() == "") {
		alert("Please select MRN date");
		return false;
	}

	/* favorite.join(", "); */
	setIndentDetailsToRow(favorite);
}

// Suraj Code For Indent
function setIndentDetailsToRow(item) {
	/* var result=item.value.split(","); */
	for ( var i = 0; i < item.length; i++) {

		toCreateIndentDiv(item[i]);
	}
	$('#Po_Pop_Up').removeClass('fade');
	$('#Po_Pop_Up').modal('hide');

}

// Suraj Code For Indent
function toCreateIndentDiv(number) {
	/*
	 * var currentRow = currentRowCount; if (currentRow == undefined) {
	 * currentRow = 0; }
	 */

	var j = 1;

	var rowCount = $('#indentRowCount').val();
	if (rowCount == -1) {
		rowCount = 0;
	}
	/* if (rowCount == currentRow) { */

	rowId = "remove" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', rowId);
	/* x.setAttribute('class', 'col-md-12-1'); */
	x.setAttribute('style', 'margin-top:0px');
	document.getElementById("ItemInfoList").appendChild(x);
	var index = parseInt() - 1;
	document.getElementById(rowId).innerHTML = "<td style='display:none;'><input type='hidden' name='ltCounterSlave["
			+ index
			+ "].productMaster.productId' id='hiddenProductId"
			+ rowCount
			+ "' value='"
			+ $("#productId" + number).val()
			+ "' ></td>"

			+ "<input id='orderCompDrugId"
			+ rowCount
			+ "' type='hidden' value='"
			+ $("#orderCompId" + number).val()
			+ "' />"
			+ "</td>"

			+ "<td>"
			+ "<input type='checkbox' id='chckbox"
			+ rowCount
			+ "' name='checkbox"
			+ rowCount
			+ "'>"
			+ "</td>"

			+ "<td>"
			+ rowCount
			+ "</td>"

			+ "<td><input type='text' class='form-control input-SmallText' id='textProductName"
			+ rowCount
			+ "' readonly='true' value='"
			+ $("#productName" + number).val()
			+ "'></td>"

			+ "<td><input type='text' class='form-control input-SmallText'  id='textRequireQty"
			+ rowCount
			+ "' value='"
			+ $("#productQty" + number).val()
			+ "'></td>"

			+ "</tr>";

	rowCount++;
	$("#indentRowCount").val(rowCount);
	$("#addRowCount").val(j);
	j++;
	/* $('#textNo' + rowCount).focus(); */
	/* } */
}

// Suraj Code For Indent
function savePharmacyIndent() {
	
	// General In
	/* var txtmaterialReqaestNoteId = $("#txtmaterialReqaestNoteDocId").val(); */
	/* var txtDocNo = $("#txtmaterialReqaestNoteDocId").val(); */
	var txtDocDate = $("#popup_container2").val();
	/* var txtMRNTotal = $("#totalDocQty").val(); */
	var treatmentId;

	var storeId = $("#pharmaStoreId").val();

	var storeName = $("#pharmaStoreId option:selected").text();

	if (storeId == null || storeId == '') {
		alert("Please select Store First");
		return false;
	}

	var receivedFrom = $("#receivedFrom").val();
	if (receivedFrom == "OT") {
		treatmentId = $("#txtPatientTreatmentId").val();
	} else {
	//	treatmentId = $("#treatmentId").val();
		treatmentId =  $("#tr_Id").val();  // added paras
		
	}
	if (treatmentId == "0" || treatmentId == "") {
		alert("Please select patient name");
		$("#txtPatientName").focus();
		$("#txtPatientName").css("background-color", "#ffe5e5");
		return false;
	}
	/* var txtMRNRemark = $("#txtMRNRemark").val(); */

	/*
	 * var val = $("#btnAddNew").val(); alert(val); if(val = '+') {
	 * alert("please select at least one row"); $("#btnAddNew").focus(); return
	 * false; }
	 */
	if (txtDocDate == "" || txtDocDate == 0) {

		alert("Please select Doc date");
		$("#txtMRNDate").focus();
		return false;
	}

//	var totalRow = $("#indentRowCount").val();
	 var totalRow = $('#ItemInfoTable tbody tr').length;
	 
	
	 
	/* var txtMRNLocationName= $("#txtMRNLocationName").val(); */
	// var sclMRNLocation = $("#sclMRNLocation option:selected").text();
	/* var status = 'open'; */
	var materiallist = {
		ltIndentSlave : []
	};

	for ( var i = 1; i <= totalRow; i++) {

		/*
		 * var txtinventoryMaterailRequestNote = $(
		 * "#txtinventoryMaterailRequestNote" + i).val(); var txtMRNItemName =
		 * $("#txtinventoryMaterailRequestNoteItemcode_" + i).val(); var
		 * txtMRNItemcodeId = $("#txtMRNItemcodeId"+ i).val();
		 */
		var texttotalQty= $("#texttotalQty"+i).val();
		var indentProductId = $("#hiddenProductId" + i).val();
		if (indentProductId == "" || indentProductId == 0) {
			alert("please Select Product in " + i + " Row");
			$("#textProductName" + i).focus();
			return false;
		}

		var txtMRNDocQuantity = $("#textRequireQty" + i).val();
		//alert(txtMRNDocQuantity)
		//alert(texttotalQty)
		
	if(txtMRNDocQuantity == undefined || txtMRNDocQuantity == null || txtMRNDocQuantity == 'null')
			continue;
		
	/*if(txtMRNDocQuantity>texttotalQty){
		alert("Required Quantity is greater than Toatal Quantity");
		return false;
	}*/

		/*if (txtMRNDocQuantity == "" || txtMRNDocQuantity == 0) {
			alert("please Enter Required Quantity in " + i + " Row");
			$("#textRequireQty" + i).focus();
			return false;
		}*/

		var pattern = /^([0-9])*$/;
		if (!pattern.test(txtMRNDocQuantity)) {
			alert("Document quantity should be of digits only in " + i + " Row");
			$("#textRequireQty" + i).focus();
			return false;
		}
		 

		/* var indentSlaveId = 0; */

		/* var indentSlaveInterestedQty = $("#textProductQty" + i).val(); */

		/*
		 * if (indentSlaveInterestedQty == "" || indentSlaveInterestedQty == 0) {
		 * alert("please Enter Interested Quantity"); $("#textProductQty" +
		 * i).focus(); return false; }
		 */

		var orderCompId = 0;
		if ($("#orderCompDrugId" + i).val() != '')
			orderCompId = $("#orderCompDrugId" + i).val();
		
		
		//var textIndentProductBatchId = $("#textIndentProductBatchId" + i).val();
		

		materiallist.ltIndentSlave.push({

			/* mrn_item_info_slave_id : txtinventoryMaterailRequestNote, */
			/* productMaster.productId : txtMRNItemName, */
			/* mrn_item_info_slave_doc_qty : txtMRNDocQuantity, */
			indentSlaveRequireQty : txtMRNDocQuantity,
			/* indentSlaveId : indentSlaveId, */
			indentProductId : indentProductId,
			/* indentSlaveInterestedQty : indentSlaveInterestedQty, */
			indentOrderCompId : orderCompId
			//indentProductBatchId : textIndentProductBatchId
		/*
		 * mrn_item_info_slave_item_code:txtMRNItemcodeId,
		 * 
		 * mrn_item_info_slave_item_selItemQty : selItemQty,
		 */
		/*
		 * mrn_item_info_slave_update_date : new Date(),
		 * mrn_item_info_slave_create_date : new Date()
		 */

		});

	}
    var patientid= $("#pt_Id").val();      
    //alert(patientid);
	if(patientid=="" || patientid==undefined)
	{
        	
		patientid=$("#txtPatientId").val();
        	  
          }
	var li = materiallist.ltIndentSlave.length;
	
	if (materiallist.ltIndentSlave.length == 0) {
	//	alert("Please enter atleast one Item row to generate indent");
		//return false;
	}

	materiallist = JSON.stringify(materiallist);
	var inputs = [];
	/* inputs.push('action=SaveMaterialRequestNoteDetails'); */

	// General Info
	inputs.push("ltIndentSlave=" + materiallist);
	/* inputs.push('txtMRNID=' + txtMRNID); */
	/* inputs.push('txtDocNo=' + txtDocNo); */
	inputs.push('txtDocDate=' + txtDocDate);
	/* inputs.push('txtMRNTotal=' + txtMRNTotal); */
	inputs.push('indentTreatmentId=' + treatmentId);

	inputs.push('receivedFrom=' + receivedFrom);

	inputs.push('storeId=' + storeId);

	inputs.push('storeName=' + storeName);
	inputs.push('pId=' + patientid);

	/*
	 * inputs.push('txtMRNRemark=' + txtMRNRemark);
	 * inputs.push('txtMRNLocationName=' + txtMRNLocationName);
	 */
	/* inputs.push('sclMRNLocation=' + sclMRNLocation); */
	/* inputs.push('status=' + status); */
	/* inputs.push('txtmaterialReqaestNoteId=' + txtmaterialReqaestNoteId); */

	/*
	 * var jsonData=JSON.stringify(inputs);
	 * 
	 * var str = inputs.join('&');
	 */

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str,
		url : "./pharmacy/indentSale/saveIndent",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			alert("Record saved successfully..!");

			// $('#showhideMrnMaintabs').show();
			$('#mrn').tab('show');

			$("#ItemInfoList").html("");
			$("#indentRowCount").val("1");
			$("#totalDocQty").val("");

			// window.location.replace("inventory_Materail_Request_Note.jsp");
		}
	});
}

function toCreateManualIndent() {
	/*
	 * var currentRow = currentRowCount; if (currentRow == undefined) {
	 * currentRow = 0; }
	 */
	var j = 1;

	var rowCount = $('#indentRowCount').val();
	if (rowCount == -1) {
		rowCount = 0;
	}
	/* if (rowCount == currentRow) { */

	var index = parseInt(rowCount) - 1;
	var divContent = "";

	divContent = divContent
			+ "<tr id='remove"
			+ rowCount
			+ "'><td style='display:none;'><input type='hidden' name='ltCounterSlave["
			+ index
			+ "].productMaster.productId' id='hiddenProductId"
			+ rowCount
			+ "' "
			+ " value='0' ><input type='hidden' value='1' id='hiddenCurrentRow'></td>"

			+ "<input id='orderCompDrugId"
			+ rowCount
			+ "' type='hidden' value='' "
			+ "/>"
			+ "</td>"

			+ "<td>"
			+ "<input type='checkbox' id='chckbox"
			+ rowCount
			+ "' name='checkbox"
			+ rowCount
			+ "'>"
			+ "</td>"

			+ "<td>"
			+ rowCount
			+ "</td>"

			+ "<td><input type='text' class='form-control input-SmallText' id='textProductName"
			+ rowCount
			+ "'  onkeyup='setProductAutoComplete(event,"+ rowCount + ")'" + "></td>"

			+ "<td><input type='text' onblur=isNumber('textRequireQty"
			+ rowCount
			+ "') class='form-control input-SmallText'  id='textRequireQty"
			+ rowCount + "' value='0' ></td> "

			+ "<td><input type='text' onblur=isNumber('textRequireQty"
			+ rowCount
			+ "') class='form-control input-SmallText' readonly='true'  id='texttotalQty"
			+ rowCount + "'  value='0'></td> "
			
			+ "<td style='display:none;'><input type='hidden'  class='form-control input-SmallText' readonly='true'  id='textIndentProductBatchId"
			+ rowCount + "'  value='0'></td> "
			
			+ "<td style='display:none;'><input type='hidden'  class='form-control input-SmallText' readonly='true'  id='textIndentProductId"
			+ rowCount + "'  value='0'></td> "
			
			+ "</tr>";

	rowCount++;
	$("#indentRowCount").val(rowCount);
	$("#addRowCount").val(j);
	j++;

	$('#ItemInfoList').append(divContent);
	/* $('#textNo' + rowCount).focus(); */
	/* } */
}

function toRemoveRow() {

	var hiddenRowCount = $("#indentRowCount").val();
	var addrowCount = $("#addRowCount").val();
	var count = hiddenRowCount - addrowCount;
	var p = 1;

	var totaltblsize = $("#indentRowCount").val();
	var tbody = $("#ItemInfoTable tbody");
	var flag=0;
	if (tbody.children().length != 0) {
		for ( var i = 1; i < totaltblsize; i++) {

			var $radios = $('input:checkbox[name=checkbox' + p + ']');
			if ($radios.is(':checked') == true) {
				$("#remove" + p).remove();
				$("#hiddenProductId" + p).val('');
			flag=1;
			}
			p++;
		}
		if(flag==0){
			alert("Please Select Checkbox to Remove Indent");
			return false;
		}
	}else{
		alert("Please first add Indent...");
		return false;
	}
}


function AutoForSurgeryServices(inputId, type, autotype) {
	var resultData = [];

	var txtVal = $('#' + inputId).val();

	var findingName = "";
	if (txtVal != null && txtVal != "") {
		if (autotype == 'b') {
			findingName = $("#txtEqNameb1").val();

		} else if (autotype == 'g') {
			findingName = $("#txtEqNameg1").val();
		} else if (autotype == 'i') {
			findingName = $("#txtEqNamei1").val();
		}
		else if (autotype == 'c') {
			findingName = $("#txtEqNamec1").val();
		}
		var auto = 'IpdService';
		// alert(autotype);
		var inputs = [];
		inputs.push('auto=' + auto);
		inputs.push('autoType=' + autotype);
		inputs.push('q=' + findingName);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AutoSuggetionServlet",
			timeout : 1000 * 60 * 15,
			cache : true,
			error : function() {
				alert('error');
			},
			success : function(r) {
				if (r.length == 0) {
					alert("NO MATCHING FOUND");
				} else {
					ajaxResponse = decodeURIComponent(r);
					// alert(ajaxResponse);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					// alert(availableTags);
					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						if (autotype == 'c') {
							template = template + '<li data-value="' + idValue
							+ '" class=""><a href="#">' + arrValue[0] + "_"+ idValue +"_"+arrValue[2]+ '</a></li>';
						}else{
							template = template + '<li data-value="' + idValue
							+ '" class=""><a href="#">' + arrValue[0] + "_"
							+ idValue + '</a></li>';
							
						}
						
					}
					setTimeout(function() {// alert(template);
						// $("#div" + inputID + " .typeahead").html("");
						$("#div" + inputId + " .typeahead").html(template);

						if (onload != "onload") {
							$("#div" + inputId + " .typeahead").show();
						}

						$("#" + inputId).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});

						$("#" + inputId).data("typeahead").source = resultData;
					}, 1000);

				}
			}
		});

		function displayResult(item) {
			$("#" + inputId).val((item.text).trim());
		}
	}
}

function showOnclickManageClaimDetails() {
	$("#authorization_form").hide();
}

function showOnclickManageClaim() {
	$("#authorization_form").show();

}

var ipdManualSummaryTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-stripped table-condensed cf'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1' style=''><label class='TextFont'>#</label></th>"
		+ "<th class='col-md-3-1' style='padding-left: 0px;'><label class='TextFont'>Patient Name</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 25px;'>UHID</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission No</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 2px;'>View</label></th>"
		+ "	</tr>"
		+ "	</thead>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; overflow-y: scroll; height: 430px; max-height: auto; border: 1px solid #ddd;'>"
		+ "	<table class='table table-condensed table-striped cf'>"
		+ "<tbody class='cf'>"
		+ "	{#foreach $T.pl as pl}"
		+ "	<tr>"
		+ "		<td class='col-sm-1-1' style='height: 21.5px;'>{count++}.</td>"
		+ "		<td class='col-sm-3-1' style='height: 21.5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "		<td class='col-sm-2-1' style='height: 21.5px;'>{$T.pl.pi}</td>"
		+ "		<td class='col-sm-2-1' style='height: 21.5px;'>{$T.pl.objTreat.trCount}</td>"
		+ "		<td class='col-sm-2-1' style='height: 21.5px;'>"
		+ "	<button onclick=ViewPreviousDischargeSummary({$T.pl.pi},{$T.pl.trid}) class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
		+ "		</td>" + "	</tr>" + "	{#/for}" + "</tbody>" + "</table>"
		+ "</div>";

function ViewPreviousDischargeSummary(trid) {
	
	 
	
	
	var pageName = $("#pageName").val();
	/*var response = $("#patobject").html();
	var obj = JSON.parse(response);
	var patientId = 0;
	var treatmentId = 0;
	//var deptid=0;
	var drid="";
	var patdetails;
	 for ( var i = 0; i <= obj.pl.length; i++) {
		if (obj.pl[i].pi == patId) {
			patdetails = obj.pl[i];
			patientId = obj.pl[i].pi;
			treatmentId = obj.pl[i].trid;
			deptid=obj.pl[i].deptid;    //added by sagar
			drid=obj.pl[i].drid;     //added by sagar
			
			break;
		}
		 if(drid==null||drid==undefined){
			 drid=0;
		 }
		 
	} */
	//myObj = JSON.stringify(patdetails);
	if (pageName == "Manual") {
		window.location = "IPD_Previous_DischargeNote.jsp?"  + "treatmentId=" + trid  ;
	} else {
		window.location = "IPD_Previous_AutoSummary.jsp?"   + "treatmentId=" + trid ;
	}

}

function setTemplateDetails() {

	var patientId = $("#pid").val();
	var treatmentId = $("#tid").val();
	var inputs = [];
	inputs.push('action=fetchPatientsManualDischargeSummary');
	inputs.push('patientId=' + patientId);
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		//timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			objcusttemp = eval('(' + ajaxResponse + ')');
			var date = (objcusttemp.discharge_date).split("_");
			$("#selTempWiseSummary").val(objcusttemp.specialization);
			$("#selTempType").val(objcusttemp.type);
			$("#customizeTemplateName").val(objcusttemp.tempname);
			$("#discharge_date").val(date[0]);
			$("#discharge_Time").val(date[1]);
			$("#discharge_Type").val(objcusttemp.discharge_type);
			setTimeout( function() {
	            CKEDITOR.instances['editor1'].setData(objcusttemp.tempdata);
	            }, 600);
			$("#selTempWiseSummary").attr("disabled", "disabled");
			$("#selTempType").attr("disabled", "disabled");
			$("#discharge_Type").attr("disabled", "disabled");
		}
	});
}

function fetchIPDPatientsForManualDischargeSummary(type) {

	var searchBy = "";
	var value = "";
	if (type == "search") {
		var byName = $("#byName").val();
		var byId = $("#byId").val();
		if (byName == "" && byId == "") {
			alert("Please enter Patient Name Or UHID for search");
			return false;
		} else if (byName != "" && byId != "") {
			alert("Please Enter Either Patient Name Or UHID");
			return false;
		}
		if (byName != "") {
			value = byName;
			searchBy = "byName";
		} else {
			value = byId;
			searchBy = "byId";
		}
	}
	count = 1;
	var inputs = [];
	inputs.push('action=fetchIPDPatientsForManualDischargeSummary');
	inputs.push('type=' + type);
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + value);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			patientBean = eval('(' + ajaxResponse + ')');

			$("#container").setTemplate(ipdManualSummaryTemp);
			$("#container").processTemplate(patientBean);
			$("#patobject").html(ajaxResponse);
		}
	});
};

function fetchIPDPatientsForAutoDischargeSummary(type) {

	var searchBy = "";
	var value = "";
	if (type == "search") {
		var byName = $("#byName").val();
		var byId = $("#byId").val();
		if (byName == "" && byId == "") {
			alert("Please enter Patient Name Or UHID for search");
			return false;
		} else if (byName != "" && byId != "") {
			alert("Please Enter Either Patient Name Or UHID");
			return false;
		}
		if (byName != "") {
			value = byName;
			searchBy = "byName";
		} else {
			value = byId;
			searchBy = "byId";
		}
	}
	count = 1;
	var inputs = [];
	inputs.push('action=fetchIPDPatientsForAutoDischargeSummary');
	inputs.push('type=' + type);
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + value);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			patientBean = eval('(' + ajaxResponse + ')');

			$("#container").setTemplate(ipdManualSummaryTemp);
			$("#container").processTemplate(patientBean);
			$("#patobject").html(ajaxResponse);
		}
	});
};

function printTicketOnSave(patID) {
	var ipdAdmissionDate = $("#opdVisitDate").val();
	var title = $("#title").val();
	var fName = $("#fName").val();
	var mName = $("#mName").val();
	var lName = $("#lName").val();

	var WindowObject = window.open('', '_blank', '_blank');

	WindowObject.document
			.writeln('<html><style type="text/css" media="print"> @page { size: landscape; }</style><body style="width:100%; height: 100%; "><div style="width:100%; height: 100%; "><div style="width: 100%; margin-top: 2.3cm;margin-left: 0.7cm; font-size: 12px;"><div>P.N:'
					+ title
					+ ''
					+ fName
					+ ' '
					+ mName
					+ ' '
					+ lName
					+ '</div><div>Admission Date:'
					+ ipdAdmissionDate
					+ '</div><div style="margin-top: 4px;"><img src="BarcodeServlet?pid='
					+ patID + '"></img></div></div></div>');

	WindowObject.document.write('</body></html>');

	WindowObject.document.close();

	WindowObject.focus();

	WindowObject.print();

	WindowObject.close();
}

function previousIndentByTreatmentId() {
	var receivedFrom = $("#receivedFrom").val();
	if (receivedFrom == "OT") {
		treatmentId = $("#txtPatientTreatmentId").val();
	} else {
		//treatmentId = $("#treatmentId").val();
		
		treatmentId = $("#tr_Id").val(); //added by paras
	}

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "./pharmacy/indentSale/getPreviousIndentData",
		data : {
			treatmentId : treatmentId
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			setAllPreviousIndentData(r);
		}
	});

}

function setAllPreviousIndentData(data) {
	var result = jQuery.parseJSON(data);

	var divContent = "";
	var preIndentDisbale = $("#prevtr").val();
	if(preIndentDisbale=='previousPatient'){
		if (result.length > 0) {
			for ( var i = 0; i < result.length; i++) {
				
				var currentdate = new Date(result[i].date); 
				var datetime = currentdate.getDate() + "/"
				                + (currentdate.getMonth()+1)  + "/" 
				                + currentdate.getFullYear() + " "  
				                + currentdate.getHours() + ":"  
				                + currentdate.getMinutes() + ":" 
				                + currentdate.getSeconds();
				//alert(datetime);
				
				
				
				if (result[i].status == 'pending') {
					divContent = divContent
							+ "<tr><td class='col-md-1 center'>"
							+ (i + 1)
							+ "</td><td class='col-md-2 center'>"
							+ datetime
							+ "</td><td class='col-md-1 center'>"
							+ result[i].status
							+ "</td><td class='col-md-2 center'>"
							+ result[i].storeName
							+ "</td><td class='col-md-2 center'>"
							+ result[i].receiveFrom
							+ "</td>"
							+ "<td class='col-md-1 center'><button type='button' onclick='viewAllPreviousIndentDataById("
							+ result[i].indentId
							+ ")' id='btnView2' value='VIEW' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button></td>"
							
							+ "<td class='col-md-1 center'><button type='button' onclick='editAllPreviousIndentDataById("
							+ result[i].indentId
							+ ")' id='btnEdit2' value='EDIT' class='btn btn-xs btn-success'><i class='fa fa-edit Edit'></i></button></td>"
							
							
							+ "<td class='col-md-1 center'><button type='button' onclick='printAllPreviousIndentDataById("
							+ result[i].indentId
							+ ")' id='btnPrint2' value='PRINT' class='btn btn-xs btn-success'><i class='fa fa-print'></i></button></td>"
							
							+ "<td class='col-md-1 center'><button type='button' onclick='deleteIndent("
							+ result[i].indentId
							+ ")' class='btn btn-xs btn-primary' disabled='disabled'>  <i class='fa fa-times'>  </i></button></td></tr>";
				} else {
					divContent = divContent
							+ "<tr><td class='col-md-1 center'>"
							+ (i + 1)
							+ "</td><td class='col-md-2 center'>"
							+ datetime
							+ "</td><td class='col-md-1 center'>"
							+ result[i].status
							+ "</td><td class='col-md-2 center'>"
							+ result[i].storeName
							+ "</td><td class='col-md-2 center'>"
							+ result[i].receiveFrom
							+ "</td>"
						
							+ "<td class='col-md-1 center'><button type='button' onclick='viewAllPreviousIndentDataById("
							+ result[i].indentId
							+ ")' id='btnView2' value='VIEW' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button></td>"
							
							+ "<td class='col-md-1 center'><button type='button' onclick='editAllPreviousIndentDataById("
							+ result[i].indentId
							+ ")' id='btnEdit2' value='EDIT' class='btn btn-xs btn-success' disabled='disabled'><i class='fa fa-edit Edit'></i></button></td>"
							
							
							+ "<td class='col-md-1 center'><button type='button' onclick='printAllPreviousIndentDataById("
							+ result[i].indentId
							+ ")' id='btnPrint2' value='PRINT' class='btn btn-xs btn-success'><i class='fa fa-print'></i></button></td>"
							
							+ "<td class='col-md-1 center'><button type='button' onclick='' class='btn btn-xs btn-danger' disabled='disabled'>  <i class='fa fa-check'>  </i></button></td>"
							
							+"</tr>";
				}
			}
		} else {
			divContent = divContent + "<tr><td colspan=9>No Record Found</td></tr>";
		}

		$("#preIndentData").html(divContent);
		setTimeout(function(){userAccess();},100);
	}
	else{
		
		if (result.length > 0) {
			for ( var i = 0; i < result.length; i++) {
				
				var currentdate = new Date(result[i].date); 
				var datetime2 = currentdate.getDate() + "/"
				                + (currentdate.getMonth()+1)  + "/" 
				                + currentdate.getFullYear() + " "  
				                + currentdate.getHours() + ":"  
				                + currentdate.getMinutes() + ":" 
				                + currentdate.getSeconds();
				//alert(datetime);
				
				if (result[i].status == 'pending') {
					divContent = divContent
							+ "<tr><td class='col-md-1 center'>"
							+ (i + 1)
							+ "</td><td class='col-md-2 center'>"
							+ datetime2
							+ "</td><td class='col-md-1 center'>"
							+ result[i].status
							+ "</td><td class='col-md-2 center'>"
							+ result[i].storeName
							+ "</td><td class='col-md-2 center'>"
							+ result[i].receiveFrom
							+ "</td>"
							+ "<td class='col-md-1 center'><button type='button' onclick='viewAllPreviousIndentDataById("
							+ result[i].indentId
							+ ")' id='btnView2' value='VIEW' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button></td>"
							
							+ "<td class='col-md-1 center'><button type='button' onclick='editAllPreviousIndentDataById("
							+ result[i].indentId
							+ ")' id='btnEdit2' value='EDIT' class='btn btn-xs btn-success'><i class='fa fa-edit Edit'></i></button></td>"
							
							
							+ "<td class='col-md-1 center'><button type='button' onclick='printAllPreviousIndentDataById("
							+ result[i].indentId
							+ ")' id='btnPrint2' value='PRINT' class='btn btn-xs btn-success'><i class='fa fa-print'></i></button></td>"
							
							
							+ "<td class='col-md-1 center'><button type='button' onclick='deleteIndent("
							+ result[i].indentId
							+ ")' class='btn btn-xs btn-primary deleteUserAccess' disabled='disabled'>  <i class='fa fa-times'>  </i></button></td></tr>";
				} else {
					divContent = divContent
							+ "<tr><td class='col-md-1 center'>"
							+ (i + 1)
							+ "</td><td class='col-md-2 center'>"
							+ datetime2
							+ "</td><td class='col-md-1 center'>"
							+ result[i].status
							+ "</td><td class='col-md-2 center'>"
							+ result[i].storeName
							+ "</td><td class='col-md-2 center'>"
							+ result[i].receiveFrom
							+ "</td>"
							
							
							+ "<td class='col-md-1 center'><button type='button' onclick='viewAllPreviousIndentDataById("
							+ result[i].indentId
							+ ")' id='btnView2' value='VIEW' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button></td>"
							
							+ "<td class='col-md-1 center'><button type='button' onclick='editAllPreviousIndentDataById("
							+ result[i].indentId
							+ ")' id='btnEdit2' value='EDIT' class='btn btn-xs btn-success' disabled='disabled'><i class='fa fa-edit Edit'></i></button></td>"
							
							
								
							+ "<td class='col-md-1 center'><button type='button' onclick='printAllPreviousIndentDataById("
							+ result[i].indentId
							+ ")' id='btnPrint2' value='PRINT' class='btn btn-xs btn-success'><i class='fa fa-print'></i></button></td>"
							
							+ "<td id='btnCancel2' class='col-md-1 center'><button type='button' onclick='' class='btn btn-xs btn-danger'>  <i class='fa fa-check'>  </i></button></td>"
							+ "</tr>";
				}
			}
		} else {
			divContent = divContent + "<tr><td colspan=9>No Record Found</td></tr>";
		}

		$("#preIndentData").html(divContent);
		setTimeout(function(){userAccess();},100);
	}
	
	
}

function viewAllPreviousIndentDataById(value) {
	var indentId = value;
	$('#prevIndentPopUp').modal('show');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "./pharmacy/indentSale/getIndentDataById",
		data : {
			indentId : indentId
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			getIndentSaleDetailsById(indentId);
			setAllPreviousIndentDataById(r);

		}
	});
}

var productName = "";
function setAllPreviousIndentDataById(value) {
	$("#divIndentNo").html(value.indentId);
	$("#divIndentDate").html(getDate(value.indentDate));
	$("#divIndentGenerateFrom").html(value.indentReceivedFrom);

	var divContent = "";
	for ( var i = 0; i < value.ltIndentSlave.length; i++) {
		var productName1 = getProductNameByProductId(
				value.ltIndentSlave[i].indentProductId, i);
		divContent = divContent + "<tr><td class='center'>" + (i + 1)
				+ "</td><td class='center' id='productName" + i + "'>"
				+ productName1 + "</td><td class='center'>"
				+ value.ltIndentSlave[i].indentSlaveRequireQty + "</td></tr>";
	}
	$("#preIndentDataById").html(divContent);

}

// get formatted date dd/mm/yyyy
function getDate(milliseconds) {
	var d = new Date(milliseconds);
	var dd = d.getDate();
	var mm = d.getMonth() + 1; // January is 0!

	var yyyy = d.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}

	return dd + '/' + mm + '/' + yyyy;
}

function getProductNameByProductId(indentProductId, rowNumber) {

	if (indentProductId != '') {

		var inputs = [];
		inputs.push('productId=' + indentProductId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "./pharmacy/indentSale/getProductNameByProductId",
					catche : false,
					error : function() {

					},
					success : function(r) {
						setTimeout(function() {
							productName = r;
						}, 500);

						$("#productName" + rowNumber).html(r);
					}
				});
	}
	return productName;
}

function getIndentSaleDetailsById(indentId) {
	var indentId = indentId;
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "./pharmacy/indentSale/getMultipleIndentSaleDataById",
				data : {
					indentId : indentId
				},
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					setAllIndentSaleData(r);
				}
			});
}

function setAllIndentSaleData(data) {
	var result = data[0];
	$("#divIndentSaleNo").html(result.indentSalelId);
	$("#divIndentReceiveDate").html(result.indentSaleNarration);

	var divContent = "";
	for ( var i = 0; i < result.indentSaleSlaves.length; i++) {
		var productName1 = result.indentSaleSlaves[i].productMaster.productName;
		divContent = divContent + "<tr><td class='center'>" + (i + 1)
				+ "</td><td class='center'>" + productName1
				+ "</td><td class='center'>"
				+ result.indentSaleSlaves[i].indentSaleSlaveBatchCode
				+ "</td><td class='center'>"
				+ result.indentSaleSlaves[i].indentSaleSlaveBatchExpiry
				+ "</td><td class='center'>"
				+ result.indentSaleSlaves[i].indentSaleSlaveQty + "</td></tr>";
	}
	$("#preIndentSaleDataById").html(divContent);
}

function deleteIndent(indentId) {
	var indentId = indentId;
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "./pharmacy/indentSale/deleteIndent",
		data : {
			indentId : indentId
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			alert("Indent cancel succesfully");
			previousIndentByTreatmentId();
		}
	});
}

function addBlankRowInConsumption() {
	
	var divContent = "";
	/*var currentRowCount=1;
	hideSelected(currentRowCount);*/
	divContent = divContent
			+ "<input type='hidden' id='hiddenCurrentRow' value='0' /><tr id='remove1"
			+ "'><td><label  class=' input-SmallText'>"
			+ 1
			+ "</label></td>"
			+ "<input type='hidden' id='hiddenProductId"
			+ 1
			+ "' name='ltPurSlave["
			+ 0
			+ "].productMaster.productId' />"

			+ "<input type='hidden' id='textBatchId"
			+ 1
			+ "' name='ltPurSlave["
			+ 0
			+ "].productMaster.batchMaster[0].batchId' />"

			+ "<td><input type='text' name='ltPurSlave["
			+ 0
			+ "].productMaster.productName' autocomplete='off' id='textProductName"
			+ 1
			+ "' class='form-control input-SmallText' ' data-toggle='modal' data-target='#Counter_PopUp_Form' onclick='load("
			+ 1
			+ ")'/></td>"

			+ "<td style='display:none;'><input name='textAvlQty' type='text' class='form-control input-SmallText' id='textAvlQty"
			+ 1
			+ "' readonly='true' tabindex='-1' /></td>"

			+ "<td><input type='text' name='ltPurSlave["
			+ 0
			+ "].productMaster.productUnit' id='textUnit"
			+ 1
			+ "'  class='form-control input-SmallText' readonly='true' />"

			+ "</td><td><input type='text' name='ltPurSlave["
			+ 0
			+ "].productMaster.packType' id='textPack"
			+ 1
			+ "' readonly='true' class='form-control input-SmallText'/></td>"

			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].productMaster.compShortName' id='textCom"
			+ 1
			+ "' readonly='true' type='text' class='form-control input-SmallText'/></td>"

			+ "<td><input type='text' name='ltPurSlave["
			+ 0
			+ "].purSlaveQty' id=textQty"
			+ 1
			+ " class='form-control input-SmallText' readonly='true' /></td>"

			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].productMaster.batchMaster[0].batchCode' id=textBatch"
			+ 1
			+ "  type='text' class='form-control input-SmallText' readonly='true'/></td>"
			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].productMaster.batchMaster[0].batchExpDate' id=textExpiry"
			+ 1
			+ "  type='text' class='form-control input-SmallText' readonly='true'/></td>"
			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].purDisc' id='textDisc"
			+ 1
			+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"
			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].purVat' id='textVat"
			+ 1
			+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].purSlaveMrp' id='textMrp"
			+ 1
			+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].purslaverate' id='textRate"
			+ 1
			+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

			+ "<td style='display:none;'><input type='text' readonly='true' id='textRatePerUnit"
			+ 1
			+ "' class='form-control input-SmallText'></td>"

			+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
			+ 1
			+ "' readonly='true' ></td>"

			+ "<td style=display:none;><input type='text' name='mrnIssueSlaves["
			+ 0
			+ "].mrnIssueSlaveMrnSlaveId' id=txtMrnIssueMRNSlaveId"
			+ 1
			+ " value='0' class='form-control input-SmallText' readonly='true' /></td>"

			+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textClStk"
			+ 0
			+ "' readonly='true' ></td>"

			+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPurchaseRate"
			+ 1 + "' readonly='true' ></td>"
			
			+ "<td style='display:none;'><input type='text' readonly='true' id='textRatePerUnit"
			+ 1
			+ "' class='form-control input-SmallText'></td>"
			
			+ "<td style='display:none;'><input type='text' readonly='true' id='textDiscAmt"
			+ 1
			+ "' class='form-control input-SmallText'></td>"

			+ "<td><input type='text' id='textAmount1"
			+ "' class='form-control input-SmallText'  name='ltPurSlave[" + 0
			+ "].purSlaveAmt' " + " readonly='true'/></td>"

			+ "<td><input type='checkbox' id='deleteGroup1"
			+ "' value=1 name='deleteGroup'></td>"
			+ "<td id='hideIndividual"
			+ 1
			+ "'><div><input id='Billable1' checked='true' type='radio' value='B' name='Radio1'>Billable</div> <div><input id='Replaceable1' type='radio' value='R' name='Radio1'>Replaceable</div></td></tr>";
	
	$("#HSTDiv").html(divContent);
	
	hideSelected(1);
}

function getProductByBatch(productId) {
	var storeName = "store";
	var storeId = $("#selectStore").val();

	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : {
					productId : productId,
					storeId : storeId,
				},
				url : "./pharmacy/wardConsumption/getBatchDetailsForConsumption",
				error : function(error) {
					alert('error' + error);
				},
				success : function(result) {
					/* var jsObj = eval('(' + result + ')'); */
					var jsObj = $.parseJSON(result);
					$("#jqxgrid").jqxGrid({
						source : jsObj.result
					});
					if (jsObj.result.length > 0) {
						splitBatchContent(jsObj.result);
						$('#jqxgrid').jqxGrid('selectrow', 0);
						$("#particulars").blur();

					} else {
						$('#jqxgrid').jqxGrid('refresh');
					}
				}
			});
}

function splitBatchContent(result) {
	$('#jqxgrid').jqxGrid('selectrow', 0);
	setCounterGridData(result);
}

function setCounterGridData(result) {
	var data = result;
	// prepare the data
	var source = {
		datatype : "json",
		datafields : [ {
			name : 'batchCode',
			type : 'string'
		}, {
			name : 'batchExpDate',
			type : 'string'
		}, {
			name : 'mrp',
			type : 'string'
		}, {
			name : 'saleRate',
			type : 'string'
		}, {
			name : 'clearStock',
			type : 'string'
		}, {
			name : 'lastPurchaseFrom',
			type : 'string'
		}, {
			name : 'billNo',
			type : 'string'
		},

		{
			name : 'billDate',
			type : 'string'
		}, {
			name : 'batchId',
			type : 'string'
		}, {
			name : 'stockId',
			type : 'string'
		},

		{
			name : 'purchaseId',
			type : 'string'
		}, {
			name : 'purchaseSlaveId',
			type : 'string'
		}, {
			name : 'vat',
			type : 'string'
		}, {
			name : 'purchaseRate',
			type : 'string'
		},

		],
		localdata : data
	};

	var dataAdapter = new $.jqx.dataAdapter(source, {
		downloadComplete : function(data, status, xhr) {
		},
		loadComplete : function(data) {
		},
		loadError : function(xhr, status, error) {
		}
	});

	$("#jqxgrid")
			.jqxGrid(
					{
						width : 1100,
						source : dataAdapter,
						columnsresize : true,
						pageable : true,
						theme : 'energyblue',
						autoheight : true,
						sortable : true,
						altrows : true,
						enabletooltips : true,
						keyboardnavigation : true,
						editmode : 'enter',
						ready : function() {
							$("#jqxgrid").jqxGrid('selectcell', 0, 'batchCode');
							// focus jqxgrid.
							$("#jqxgrid").jqxGrid('focus');
							$('#jqxgrid').jqxGrid('selectrow', 0);
						},

						handlekeyboardnavigation : function(event) {
							var rowindex = $('#jqxgrid').jqxGrid(
									'getselectedrowindex');
							var key = event.charCode ? event.charCode
									: event.keyCode ? event.keyCode : 0;
							if (key == 13) {
								setPopUpValues1(rowindex);
							}
						},

						columns : [ {
							text : 'Batch Code',
							datafield : 'batchCode',
							width : 150
						}, {
							text : 'Expiry',
							datafield : 'batchExpDate',
							width : 50
						}, {
							text : 'MRP',
							datafield : 'mrp',
							width : 80
						}, {
							text : 'Sale Rate',
							datafield : 'saleRate',
							width : 100
						}, {
							text : 'Pur Rate',
							datafield : 'purchaseRate'
						},{
							text : 'Stock',
							datafield : 'clearStock'
						}, {
							text : 'Last Purchase From',
							datafield : 'lastPurchaseFrom',
							width : 250
						}, {
							text : 'Last Bill No',
							datafield : 'billNo',
							width : 150
						}, {
							text : 'Last Bill Date',
							datafield : 'billDate',
							width : 150
						}, {
							text : 'Batch Id',
							datafield : 'batchId',
							hidden : true
						}, {
							text : 'Stock Id',
							datafield : 'stockId',
							hidden : true
						}, {
							text : 'Purchase Id',
							datafield : 'purchaseId',
							hidden : true
						}, {
							text : 'Purchase Slave Id',
							datafield : 'purchaseSlaveId',
							hidden : true
						}, {
							text : 'Vat',
							datafield : 'vat',
							hidden : true
						} ],

					});

	$("#jqxgrid").bind('rowdoubleclick', function(event) {
		var lastRow = event.args.rowindex;
		setPopUpValues1(lastRow);
	});

	$('#Counter_Batch_Pop_Up').modal('show');

	$("#jqxgrid").jqxGrid('selectcell', 0, 'batchCode');
	// focus jqxgrid.

	setTimeout(function() {
		$("#jqxgrid").jqxGrid('focus');
	}, 500);
}

function calculateCounterDisc() {
	// net amount
	var rate = 0;
	var qty = 0;
	var unit = 0;
	var ratePerUnit = 0;
    var discount=0;
	var DiscAmt=0;
	var finalAmout=0;
	if($('#txtDis').val() <100)
		{
	if ($('#txtRate').val() != '' && $('#txtRate').val().length > 0)
		rate = parseFloat($('#txtRate').val());

	if ($('#txtWardQty').val() != '' && $('#txtWardQty').val().length > 0)
		qty = parseFloat($('#txtWardQty').val());

	
	if ($('#txtUnit').val() != '' && $('#txtUnit').val().length > 0)
		unit = parseFloat($('#txtUnit').val());
	
	if ($('#txtDis').val() != '' && $('#txtDis').val().length > 0)
		discount = parseFloat($('#txtDis').val());

	if ($('#hiddenProductId').val() != ''
			&& $('#hiddenProductId').val().length > 0 && $('#hiddenProductId').val() != 0)
		{
		ratePerUnit = (rate / unit).toFixed(3);
	
		finalAmout = (ratePerUnit * qty).toFixed(3);
		
		if ($('#txtDis').val() != '' && $('#txtDis').val().length > 0)
			{			
			discount = parseFloat($('#txtDis').val());
		   DiscAmt=(discount/100)*finalAmout;
		    
		   $('#txtDiscAmt').val((DiscAmt).toFixed(3));
			}
	
	}
		calculateCounterAmount();
		
	
		}
	else
		{
		alert("Enter Discount less than 100");
		  $('#txtDis').val(0);
		  $('#txtDiscAmt').val(0);
		   calculateCounterAmount();
		}
}


function calculateCounterAmount(value) {
	
	// net amount
	var rate = 0;
	var qty = 0;
	var unit = 0;
	var ratePerUnit = 0;
	var discount = 0;
	var DiscAmt = 0;
	/* var vat=0; */
	var vatAmt = 0;

	if ($('#txtRate').val() != '' && $('#txtRate').val().length > 0)
		rate = parseFloat($('#txtRate').val());

	if ($('#txtWardQty').val() != '' && $('#txtWardQty').val().length > 0)
		qty = parseFloat($('#txtWardQty').val());

	if (value == 'qty')
		$("#txtRate").focus();

	if ($('#txtUnit').val() != '' && $('#txtUnit').val().length > 0)
		unit = parseFloat($('#txtUnit').val());

	if ($('#hiddenProductId').val() != ''
			&& $('#hiddenProductId').val().length > 0
			&& $('#hiddenProductId').val() != 0) {
		ratePerUnit = (rate / unit).toFixed(3);

		$("#txtRatePerUnit").val(ratePerUnit);
		var finalAmout = (ratePerUnit * qty).toFixed(3);

		if ($('#txtDis').val() != '' && $('#txtDis').val().length > 0) {
			discount = parseFloat($('#txtDis').val());
			DiscAmt = (discount / 100) * finalAmout;
		}

		if ($('#txtDiscAmt').val() != '' && $('#txtDiscAmt').val().length > 0) {
			DiscAmt = parseFloat($('#txtDiscAmt').val());
		}

		if (DiscAmt < finalAmout)
			$('#txtAmt').val((finalAmout - DiscAmt).toFixed(3));
		else {
			$('#txtAmt').val((ratePerUnit * qty).toFixed(3));

		}

		var amt = parseFloat($('#txtAmt').val());
		val = (Math.floor(1000 * (amt / qty)) / 1000).toFixed(3);

		$('#txtRateForPrint').val(val);

	}
}
function chkPatient()
{
	var count=1;
	 if($("#selectConsType").val()=='Individual')
	 {
		 $("#HSTDiv").html("");
	   $("#hideIndividual"+count).hide();
	   $("#chkType").hide();
	 }
 else
	 {
	 $("#HSTDiv").html("");
	 $("#hideIndividual"+count).show();
	 $("#chkType").show();
	 }

}

function hideSelected(currentRowCount)
{
	 if($("#selectConsType").val()=='Individual')
		 {
		   $("#hideIndividual"+currentRowCount).hide();
		   $("#chkType").hide();
		 }
	 else
		 {
		 $("#chkType").show();
		 }
	
	/*$("#hideIndividual").hide();*/
	
}

function hideWardPop()
{
	$("#wardConsumptionPopUp").modal('hide');
	/*$("#wardConsumptionPopUp").hide();*/
}

function createWardConsumptionDiv(RowCount,currentRowCount) 
{
	
	var currentRowCount1=parseInt(currentRowCount)+1;
	
	var currentRow = currentRowCount;
	if (currentRow == undefined) {
		currentRow = 0;
	}
	var j = 1;
	
	if (rowCount == undefined) {
		rowCount = 1;
	}
	if (rowCount == -1) {
		rowCount = 0;
	}

	if (rowCount == currentRow) {

		var result = DublicateRecord(currentRow);
		
		if (result == 1) 
		{
			rowCount++;
			rowId = "remove" + rowCount;
			var x = document.createElement('tr');
			x.setAttribute('id', rowId);
			/* x.setAttribute('class', 'col-md-12-1'); */
			x.setAttribute('style', 'margin-top:0px');
			document.getElementById("HSTDiv").appendChild(x);
			var index = parseInt(rowCount) - 1;

			document.getElementById(rowId).innerHTML = "<tr id='remove"
					+ (rowCount)
					+ "'><td><label  class=' input-SmallText'>"
					+ (rowCount)
					+ "</label></td>"
					+ "<input type='hidden' id='hiddenProductId"
					+ (rowCount)
					+ "' name='ltPurSlave["
					+ (rowCount - 1)
					+ "].productMaster.productId' />"

					+ "<input type='hidden' id='textBatchId"
					+ (rowCount)
					+ "' name='ltPurSlave["
					+ (rowCount - 1)
					+ "].productMaster.batchMaster[0].batchId' />"

					+ "<td><input type='text' name='ltPurSlave["
					+ (rowCount - 1)
					+ "].productMaster.productName' autocomplete='off' id='textProductName"
					+ (rowCount)
					+ "' class='form-control input-SmallText' ' data-toggle='modal' data-target='#Product_Information' onclick='load("
					+ rowCount
					+ ")' onkeypress='load("
					+ rowCount
					+ ")'/></td>"

					+ "<td style='display:none;'><input name='textAvlQty' type='text' class='form-control input-SmallText' id='textAvlQty"
					+ rowCount
					+ "' readonly='true' tabindex='-1' /></td>"

					+ "<td><input type='text' name='ltPurSlave["
					+ (rowCount - 1)
					+ "].productMaster.productUnit' id='textUnit"
					+ (rowCount)
					+ "'  class='form-control input-SmallText' readonly='true' />"

					+ "</td><td><input type='text' name='ltPurSlave["
					+ (rowCount - 1)
					+ "].productMaster.packType' id='textPack"
					+ (rowCount)
					+ "' readonly='true' class='form-control input-SmallText'/></td>"

					+ "<td><input name='ltPurSlave["
					+ (rowCount - 1)
					+ "].productMaster.compShortName' id='textCom"
					+ (rowCount)
					+ "' readonly='true' type='text' class='form-control input-SmallText'/></td>"

					+ "<td><input type='text' name='ltPurSlave["
					+ (rowCount - 1)
					+ "].purSlaveQty' id=textQty"
					+ (rowCount)
					+ " class='form-control input-SmallText' readonly='true' /></td>"

					+ "<td><input name='ltPurSlave["
					+ (rowCount - 1)
					+ "].productMaster.batchMaster[0].batchCode' id=textBatch"
					+ (rowCount)
					+ "  type='text' class='form-control input-SmallText' readonly='true'/></td>"
					+ "<td><input name='ltPurSlave["
					+ (rowCount - 1)
					+ "].productMaster.batchMaster[0].batchExpDate' id=textExpiry"
					+ (rowCount)
					+ "  type='text' class='form-control input-SmallText' readonly='true'/></td>"
					+ "<td><input  name='ltPurSlave["
					+ (rowCount - 1)
					+ "].purVat'  id='textDisc"
					+ (rowCount)
					+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"
					+ "<td><input name='ltPurSlave["
					+ (rowCount - 1)
					+ "].purVat' id='textVat"
					+ (rowCount)
					+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

					+ "<td><input name='ltPurSlave["
					+ (rowCount - 1)
					+ "].purSlaveMrp' id='textMrp"
					+ (rowCount)
					+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

					+ "<td><input name='ltPurSlave["
					+ (rowCount - 1)
					+ "].purslaverate' id='textRate"
					+ (rowCount)
					+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

					+ "<td style='display:none;'><input type='text' readonly='true' id='textRatePerUnit"
					+ (rowCount)
					+ "' class='form-control input-SmallText'></td>"
					
					+ "<td style='display:none;'><input type='text' readonly='true' id='textDiscAmt"
					+ (rowCount)
					+ "' class='form-control input-SmallText'></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
					+ (rowCount)
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' name='mrnIssueSlaves["
					+ (rowCount - 1)
					+ "].mrnIssueSlaveMrnSlaveId' id=txtMrnIssueMRNSlaveId"
					+ (rowCount)
					+ " class='form-control input-SmallText' value='0' readonly='true' /></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textClStk"
					+ (rowCount)
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPurchaseRate"
					+ (rowCount)
					+ "' readonly='true' ></td>"

					+ "<td><input type='text' id='textAmount"
					+ (rowCount)
					+ "' class='form-control input-SmallText'  name='ltPurSlave["
					+ (rowCount - 1) + "].purSlaveAmt' "
					+ " readonly='true'/></td>"

					+ "<td ><input type='checkbox' id='deleteGroup" + (rowCount)
					+ "' value=" + (rowCount)
					+ " name='deleteGroup'></td>" 
					+ "<td id='hideIndividual"
					+ (rowCount)
					+ "'><div><input id='Billable"+(rowCount)+"' checked='true' type='radio' value='B' name='Radio"+(rowCount)+"'>Billable</div> <div><input id='Replaceable"+(rowCount)+"' type='radio' value='R' name='Radio"+(rowCount)+"'>Replaceable</div></td>"
					/*+ "<td id='hideIndividual"
					+ (rowCount)
					+ "'><input id='Billable"+(rowCount)+"'  type='radio' value='B' name='Radio"+(rowCount)+"'>Billable<input id='Replaceable"+(rowCount)+"' type='radio' value='R' name='Radio"+(rowCount)+"'>Replaceable</td>"*/
					+"</tr>";

			$("#consumptionRowCount").val(rowCount);
			$("#addRowCount").val(j);
			j++;
			$('#textProductName' + rowCount).focus();
			hideSelected(currentRowCount1);
			fillRows(currentRowCount);
		}
	
	} else {
		var result = DublicateRecord(currentRow);
		if (result == 1) {
			hideSelected(currentRowCount1);
			fillRows(currentRowCount);
		}
	}
}

function DublicateRecord(rowCount) {
	var productName;
	var productName1;
	var j = 1;

	var batchId;
	var batchId1;

	var count = $('#consumptionRowCount').val();
	while (j < (count)) {

		productName = $('#hiddenProductId' + j).val();
		productName1 = $('#hiddenProductId').val();

		batchId = $('#textBatchId' + j).val();
		batchId1 = $('#hiddenBatchId').val();

		if ((productName == productName1) && (batchId == batchId1)) {
			alert("Dublicate Record Not insert");
			return 0;
		}
		j++;
	}
	return 1;
}

function fillRows(rCount) {
	var result = DublicateRecord(rCount);
	if (result == 1) {
		var rowCount = parseInt(rCount);
		$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
		$('#textProductName' + rowCount).val($('#particulars1').val());
		$('#textUnit' + rowCount).val($('#txtUnit').val());
		$('#textPack' + rowCount).val($('#txtPack').val());
		$('#textCom' + rowCount).val($('#txtComp').val());
		$('#textMrp' + rowCount).val($('#txtMRP').val());
		$('#textQty' + rowCount).val($('#txtWardQty').val());
		$('#textLastPurRate' + rowCount).val($('#txtRate').val());
		$('#textBatch' + rowCount).val($('#txtBatchNo').val());
		$('#textExpiry' + rowCount).val($('#txtExpiry').val());
		$('#textBatchId' + rowCount).val($('#hiddenBatchId').val());
		$('#textStockId' + rowCount).val($('#hiddenStockId').val());
		$('#textStockQtyInHand' + rowCount).val($('#txtClStk').val());
		$('#textVat' + rowCount).val($('#txtVat').val());
		$('#textShelf' + rowCount).val($('#txtShelf').val());
		$('#textClStk' + rowCount).val($('#txtClStk').val());
		$('#textTotalStk' + rowCount).val($('#txtTotalStk').val());
		$('#textPurchaseRate' + rowCount).val($('#txtPurchaseRate').val());
		$('#textScm' + rowCount).val($('#txtScheme').val());
		$('#textRate' + rowCount).val($('#txtRate').val());
		$('#textAmount' + rowCount).val($('#txtAmt').val());
		$('#textDisc' + rowCount).val($('#txtDis').val());
		$('#textDiscAmt' + rowCount).val($('#txtDiscAmt').val());
		
		var amt=parseFloat($('#txtAmt').val());
		var qty=parseFloat($('#txtWardQty').val());
		var result=(amt/qty).toFixed(3);
		$('#textRatePerUnit' + rowCount).val(result);
		$("#button" + rowCount).attr('disabled', false);
		$("#textProductName" + rowCount).prop('disabled', true);
		calculateGrossAmount();
	}
}

function getWards() {
	var indentId = indentId;
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "./pharmacy/wardConsumption/getWards",
		data : {
			indentId : indentId
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			setWardDetails(r);
		}
	});
}

function setWardDetails(data) {
	var result = jQuery.parseJSON(data);
	var divContent = "";
	for ( var i = 0; i < result.length; i++) {
		divContent = divContent + "<option value=" + result[i].wardId + ">"
				+ result[i].wardName + "</option>";
	}
	$("#selectWard").html(divContent);
}

function getAllStore() {

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "./pharmacy/store/getAllStore",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			setStoreDetails(r);
		}
	});
}

function setStoreDetails(data) {
	var result = data;
	var divContent = "";
	for ( var i = 0; i < result.length; i++) {
		divContent = divContent + "<option value=" + result[i].storeId + ">"
				+ result[i].storeName + "</option>";
	}
	$("#selectStore").html(divContent);
}

function saveConsumption() 
{
	var Dis=0;
	var DisAmt=0;
	var storeId = $("#selectStore").val();
	
	var traetmentId = $("#selectStore").val();

	var wardId = $("#selectWard").val();

	var consType = $("#selectConsType").val();
	
	var hiddenTreatId = $("#hiddenTreatmentId").val();
	
	/* var consumtionType= */

	var totalRow = $("#consumptionRowCount").val();

	var txtDate = 0;
	if ($("#popup_container2").val() != null
			&& $("#popup_container2").val() != "") {
		txtDate = $("#popup_container2").val();
	} else {
		alert("Please Enter Date");
		$("#popup_container2").focus();
		return false;
	}

	var txtMRNDispensedto = $("#txtMRNDispensedto").val();

	var txtTime = 0;
	if ($("#txtTime").val() != null && $("#txtTime").val() != "") {
		txtTime = $("#txtTime").val();
	} else {
		alert("Please Enter Time");
		$("#txtTime").focus();
		return false;
	}

	var txtNaration = $("#txtNaration").val();

	if (totalRow.length < 1) {
		alert("Enter Only Valid data");
		return false;
	}

	var materiallist = {
		wardConsumptionSlaves : []
	};

	for ( var i = 1; i < totalRow; i++) {

		if ($("#hiddenProductId" + i).val() != null
				&& $("#hiddenProductId" + i).val() != "") {
			var batchId = 0;
			var productId = 0;
			if ($("#textBatchId" + i).val() != null
					&& $("#textBatchId" + i).val() != "") {
				batchId = $("#textBatchId" + i).val();
			} else {
				alert("Please select Batch");
				$("#textBatch" + i).focus();
				return false;
			}

			if ($("#hiddenProductId" + i).val() != null
					&& $("#hiddenProductId" + i).val() != "") {
				productId = $("#hiddenProductId" + i).val();
			} else {
				alert("Please select Product");
				$("#hiddenProductId" + i).focus();
				return false;
			}

			/* var productId = $("#hiddenProductId" + i).val(); */
		/*	var bilingType = document.querySelector('input[name = "Radio"'+i+'"]:checked').value;*/
			if($("#selectConsType").val()=='Patient')
			var bilingType1=$("input:radio[name=Radio" + i + "]:checked").val();
			else
			var	bilingType1='R';
											
			var batchCode = $("#textBatch" + i).val();

			var batchExpiry = $("#textExpiry" + i).val();

			var mrp = $("#textMrp" + i).val();

			var rate = $("#textRate" + i).val();

			var qty = $("#textQty" + i).val();
			
			var ratePerUnit = $("#textRatePerUnit" + i).val();
			
			if($("#textDisc" + i).val()!=null && $("#textDisc" + i).val()!='')
	            Dis= $("#textDisc" + i).val();
	
	          if($("#textDiscAmt" + i).val()!=null && $("#textDiscAmt" + i).val()!='')
                   DisAmt= $("#textDiscAmt" + i).val();
	         	       			
			if (qty == "" || qty == 0) {

				alert("Please Enter Proper Quantity");
				$("#textQty" + i).focus();
				return false;
			}

			var amt = $("#textAmount" + i).val();

			materiallist.wardConsumptionSlaves.push({
				wardSaleBatchCode : batchCode,
				wardBatchExpiry : batchExpiry,
				wardSlaveMrp : mrp,
				wardSlaveRate : rate,
				wardSlaveQty : qty,
				wardSlaveAmt : amt,
				wardSlaveBatchId : batchId,
				billingType : bilingType1,
				wardSlaveDisc : Dis,
				wardSlaveDiscAmt : DisAmt,
				wardSlaveRatePerUnit : ratePerUnit,
				productMaster : {
					'productId' : productId,
					'batchMaster' : [ {
						'batchId' : batchId,
						'stockMaster' : {
							'stockId' : $("#textStockId" + i).val(),
							'stockQtyInHand' : $("#textStockQtyInHand" + i)
									.val()
						}
					} ]
				}
			});

		}
	}

	if (materiallist.wardConsumptionSlaves.length < 1) {
		alert("Please Enter Valid Data");
		return false;
	}

	materiallist = JSON.stringify(materiallist);

	var inputs = [];

	inputs.push("wardConsumptionSlaves=" + materiallist);
	inputs.push("txtDate=" + txtDate);
	inputs.push("consType=" + consType);
	inputs.push("storeId=" + storeId);
	inputs.push("wardId=" + wardId);
	inputs.push("time=" + txtTime);
	inputs.push("txtNaration=" + txtNaration);
	inputs.push("txtMRNDispensedto=" + txtMRNDispensedto);
	inputs.push("txtTreatmentId=" + hiddenTreatId);
	
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str,
				url : "./pharmacy/wardConsumption/saveWardConsumption",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("oops something went wrong related to stock please save proper data or check mrp");
				},
				success : function(r) {
					alert(r.result);
					location.reload(true);
				}
			});
}

function autoSuggestionForDispensedto(inputID, typeauto) {
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();

	if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {
		var inputs = [];

		inputs.push('action=fetchDispensedtoNameAutosugg');
		inputs.push('txtVal=' + txtVal1);
		inputs.push('isEdit=no');
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "InventoryServlet",
			timeout : 1000 * 60 * 15,
			cache : true,
			error : function() {
				alert('error');
			},
			success : function(r) {
				var availableTags = [];
				if (r.length == 20) {
					alert("NO MATCHING FOUND");

				} else {
					ajaxResponse = eval('(' + r + ')');

					for ( var i = 0; i < ajaxResponse.ul.length; i++) {
						availableTags.push(ajaxResponse.ul[i].un + "_"
								+ ajaxResponse.ul[i].ui);
					}

					// availableTags = ajaxResponse.split("\n");

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});

						template = template + '<li data-value= "'
								+ (arrValue[1]) + '" class=""><a href="#">'
								+ arrValue[0] + '</a></li>';

					}

					$("#div" + inputID + " .typeahead").html(template);
					if (typeauto != 'onload') {
						$("#div" + inputID + " .typeahead").show();
					}

					setTimeout(function() {
						$('#' + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult1,
							scrollBar : true

						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 500);
				}
			}
		});

		function displayResult1(item) {
			$('#' + inputID).val(item.text);
			$("#txtMRNDispensedtoId").val(item.value);
		}
	}
}

function getWardConsumptionDetails() {
	
	var treatmentId = $("#hiddenTreatmentId").val();
	var inputs = [];
	inputs.push('treatId=' + treatmentId);
		
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "./pharmacy/wardConsumption/getWardConsumptionDetails",
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) 
		{
			setAllConsumptionData(r);
		}
	});
}

function getPrevWardConsumptionDetails() {
	
	var treatmentId = $("#hiddenTreatmentId").val();
	var inputs = [];
	inputs.push('treatId=' + treatmentId);
		
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "./pharmacy/wardConsumption/getPrevWardConsumptionDetails",
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) 
		{
			setPrvConsumptionData(r);
		}
	});
}

function setPrvConsumptionData(data) {
	var result = jQuery.parseJSON(data);

	var divContent = "";
	if (result.length > 0) {
		for ( var i = 0; i < result.length; i++) {
			divContent = divContent
					+ "<tr><td class='col-md-1 center'>"
					+ (i + 1)
					+ "</td><td class='col-md-2 center'>"
					+ result[i].date
					+ "</td><td class='col-md-2 center'>"
					+ result[i].consType
					+ "</td><td class='col-md-2 center'>"
					+ result[i].dispTo
					+ "</td><td class='col-md-2 center'>"
					+ result[i].store
					+ "</td>"
					+ "</td><td class='col-md-2 center'>"
					+ result[i].ward
					+ "</td>"
					+ "<td class='col-md-1 center'><button type='button' onclick='viewAllConsumptionDataById("
					+ result[i].wardSaleId
					+ ")' id='btnView2' value='VIEW' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button></td><td class='col-md-1 center'><a href='./pharmacy/wardConsumption/printView?wardConsumptionId="+ result[i].wardSaleId+"' class='btn btn-xs btn-success' id='btnPrint'> <i class='fa fa-print'></i> </a></td></tr>";
		}
	} else {
		divContent = divContent + "<tr><td colspan=7>No Record Found</td></tr>";
	}

	$("#preConsumptionDetailsById").html(divContent);
}

function setAllConsumptionData(data) {
	var result = jQuery.parseJSON(data);

	var divContent = "";
	if (result.length > 0) {
		for ( var i = 0; i < result.length; i++) {
			divContent = divContent
					+ "<tr><td class='col-md-1 center'>"
					+ (i + 1)
					+ "</td><td class='col-md-2 center'>"
					+ result[i].date
					+ "</td><td class='col-md-2 center'>"
					+ result[i].consType
					+ "</td><td class='col-md-2 center'>"
					+ result[i].dispTo
					+ "</td><td class='col-md-2 center'>"
					+ result[i].store
					+ "</td>"
					+ "</td><td class='col-md-2 center'>"
					+ result[i].ward
					+ "</td>"
					+ "<td class='col-md-1 center'><button type='button' onclick='viewAllConsumptionDataById("
					+ result[i].wardSaleId
					+ ")' id='btnView2' value='VIEW' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button></td><td class='col-md-1 center'><a href='./pharmacy/wardConsumption/printView?wardConsumptionId="+ result[i].wardSaleId+"' class='btn btn-xs btn-success' id='btnPrint'> <i class='fa fa-print'></i> </a></td></tr>";

		}
	} else {
		divContent = divContent + "<tr><td colspan=7>No Record Found</td></tr>";
	}

	$("#consumptionDetailsById").html(divContent);
}

function viewAllConsumptionDataById(value) {
	var wardConsumptionId = value;
	$('#wardConsumptionPopUp').modal('show');

	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "./pharmacy/wardConsumption/getWardConsumptionDetailsById",
				data : {
					wardConsumptionId : wardConsumptionId
				},
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					setAllConsumptionDataById(r);
				}
			});
}

function setAllConsumptionDataById(data) {
	var result = data[0];
	$("#divIndentSaleNo").html(result.wardSaleId);
	$("#divIndentReceiveDate").html(result.wardSaleNarration);

	var divContent = "";
	for ( var i = 0; i < result.wardConsumptionSlaves.length; i++) {
		var productName1 = result.wardConsumptionSlaves[i].productMaster.productName;
		divContent = divContent + "<tr><td class='center'>" + (i + 1)
				+ "</td><td class='center'>" + productName1
				+ "</td><td class='center'>"
				+ result.wardConsumptionSlaves[i].wardSaleBatchCode
				+ "</td><td class='center'>"
				+ result.wardConsumptionSlaves[i].wardBatchExpiry
				+ "</td><td class='center'>"
				+ result.wardConsumptionSlaves[i].wardSlaveQty + "</td></tr>";
	}
	$("#preIndentSaleDataById").html(divContent);
}

function deleteRow() {
	var finalAmount = 0.00;
	var r = confirm("Are you confirm to delete selected row");
	if (r == true) {
		var favorite = [];

		$.each($("input[name='deleteGroup']:checked"), function() {
			favorite.push($(this).val());
		});

		if (favorite.length == 0) {
			alert("Please select checkbox to delete");
		}

		for ( var i = 0; i < favorite.length; i++) {
			if ($("#hiddenProductId" + favorite[i]) != null
					&& $('#hiddenProductId' + favorite[i]).val() != "") {
				$("#deleteGroup" + favorite[i]).prop("checked", false);
				var amount = parseFloat($("#textAmount" + favorite[i]).val());
				$("#hiddenProductId" + favorite[i]).val("");
				$("#textBatchId" + favorite[i]).val("");
				$("#remove" + favorite[i]).remove();

				var mainAmount = parseFloat($("#txtAmount" + textNo).val());

				if (mainAmount >= amount)
					finalAmount = ((mainAmount) - (amount)).toFixed(3);

				$("#txtAmount" + textNo).val(finalAmount);

				$("#textAmount" + favorite[i]).val(0);

			} else {
				alert("Can not delete empty row");
				$("#deleteGroup" + favorite[i]).prop("checked", false);
			}
		}
	}
}

//suraj code for insert new row in indenttemplate

function addIndentBlankRow() {
	
	var j = 1;

	var rowCount = 1;
	
	if (rowCount == -1) {
		rowCount = 0;
	}
	/* if (rowCount == currentRow) { */
	
	var index = parseInt(rowCount) - 1;
	var divContent = "";

	divContent = divContent
			+ "<tr id='remove"
			+ rowCount
			+ "'><td style='display:none;'><input type='hidden' name='ltCounterSlave["
			+ index
			+ "].productMaster.productId' id='txtIndentTemplateProductId"
			+ rowCount
			+ "' "
			+ " ><input type='hidden' value='1' id='hiddenCurrentRow'></td>"

			+ "<input id='indentTemplateNumber"
			+ rowCount
			+ "' type='hidden' value='' "
			+ "/>"
			+ "</td>"

			+ "<td>"
			+ "<input type='checkbox' id='chckbox"
			+ rowCount
			+ "' name='checkbox"
			+ rowCount
			+ "'>"
			+ "</td>"

			+ "<td>"
			+ rowCount
			+ "</td>"

			+ "<td><input type='text' class='form-control input-SmallText' id='txtIndentTemplateProductName"
			+ rowCount
			+ "' data-toggle='modal' data-target='#indent_template_pop_up' onclick='loadIndentTemplate("
			+ rowCount + " )'" + "></td>"

			+ "<td><input type='text' onblur=isNumber('txtIndentTemplateRequireQty"
			+ rowCount
			+ "') class='form-control input-SmallText'  id='txtIndentTemplateRequireQty"
			+ rowCount + "'  ></td> "
			
			+ "<td><input type='text' class='form-control input-SmallText'  id='txtIndentTemplateNarration"
			+ rowCount + "'  ></td> "

			+ "</tr>";

	 $('#indentTemplateRowCount').val(2)
	$('#indetTemplateTable').html(divContent);
}


function addIndentTemplateRow() {
	
	var j = 1;

	var rowCount = $('#indentTemplateRowCount').val();
	
	if (rowCount == -1) {
		rowCount = 0;
	}
	/* if (rowCount == currentRow) { */
	
	var index = parseInt(rowCount) - 1;
	var divContent = "";

	divContent = divContent
			+ "<tr id='remove"
			+ rowCount
			+ "'><td style='display:none;'><input type='hidden' name='ltCounterSlave["
			+ index
			+ "].productMaster.productId' id='txtIndentTemplateProductId"
			+ rowCount
			+ "' "
			+ " ><input type='hidden' value='1' id='hiddenCurrentRow'></td>"

			+ "<input id='indentTemplateNumber"
			+ rowCount
			+ "' type='hidden' value='' "
			+ "/>"
			+ "</td>"

			+ "<td>"
			+ "<input type='checkbox' id='chckbox"
			+ rowCount
			+ "' name='checkbox"
			+ rowCount
			+ "'>"
			+ "</td>"

			+ "<td>"
			+ rowCount
			+ "</td>"

			+ "<td><input type='text' class='form-control input-SmallText' id='txtIndentTemplateProductName"
			+ rowCount
			+ "' data-toggle='modal' data-target='#indent_template_pop_up' onclick='loadIndentTemplate("
			+ rowCount + " )'" + "></td>"

			+ "<td><input type='text' onblur=isNumber('txtIndentTemplateRequireQty"
			+ rowCount
			+ "') class='form-control input-SmallText'  id='txtIndentTemplateRequireQty"
			+ rowCount + "'  ></td> "
			
			+ "<td><input type='text' class='form-control input-SmallText'  id='txtIndentTemplateNarration"
			+ rowCount + "'  ></td> "

			+ "</tr>";

	rowCount++;
	$("#indentTemplateRowCount").val(rowCount);
	j++;

	$('#indetTemplateTable').append(divContent);
	
}


function toRemoveTemplateRow() {

	var hiddenRowCount = $("#indentTemplateRowCount").val();
	var addrowCount = $("#addRowCount").val();
	var count = hiddenRowCount - addrowCount;
	var p = 1;

	var totaltblsize = $("#indentTemplateRowCount").val();
	for ( var i = 1; i < totaltblsize; i++) {

		var $radios = $('input:checkbox[name=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			$("#remove" + p).remove();
			/*$("#txtIndentTemplateProductId" + p).val('');*/

		}
		p++;
	}
}

//suraj code for indent template

function saveIndentTemplate() {
	
	var indentTemplateName = $("#txtIndentMasterName").val();
	if (indentTemplateName == null || indentTemplateName == '') {
		alert("Please Enter Template Name");
		return false;
	}
	
	var indentTemplateNarration = $("#txtIndentMasterNarration").val();
	
	var txtIndentMasterId=$("#txtIndentMasterId").val();
	
	var txtIndentUserIp=$("#txtIndentUserIp").val();
	
	var txtIndentAddUserId=$("#txtIndentAddUserId").val();
	var userId=$("#userId").val();
	if(txtIndentAddUserId==""){
		$("#txtIndentAddUserId").val(userId);
		txtIndentAddUserId=userId;
	}
	
	var txtIndentAddTime=$("#txtIndentAddTime").val();
	
	
	var txtIndentAddDate=$("#txtIndentAddDate").val();
	var todays_date=$("#todays_date").val();
	if(txtIndentAddDate==""){
		$("#txtIndentAddDate").val(todays_date);
		txtIndentAddDate= todays_date;
	}
	
	var totalRow = $("#indentTemplateRowCount").val();
	var materiallist = {
			indentTemplateSlaves : []
	};

	for ( var i = 1; i < totalRow; i++) {
		
		if ($("#txtIndentTemplateProductId" + i).val() != null
				&& $("#txtIndentTemplateProductId" + i).val() != "") {
			
			var indentProductId = $("#txtIndentTemplateProductId" + i).val();
			if (indentProductId == "" || indentProductId == 0) {
				alert("please Select Product in " + i + " Row");
				$("#txtIndentTemplateProductName" + i).focus();
				return false;
			}

			var qty = $("#txtIndentTemplateRequireQty" + i).val();
			if (qty == "" || qty == 0) {
				alert("please enter quantity in " + i + " Row");
				$("#txtIndentTemplateRequireQty" + i).focus();
				return false;
			}
			
			var narration=$("#txtIndentTemplateNarration" + i).val();
			if ($("#txtIndentTemplateSlaveId" + i).val() != null
					&& $("#txtIndentTemplateSlaveId" + i).val() != "") {
				
				materiallist.indentTemplateSlaves.push({
					indentTemplateSlaveId : $("#txtIndentTemplateSlaveId" + i).val(),
					productQty : qty,
					indentTemplateSlaveNarration:narration,
					productMaster : {
						'productId' : indentProductId
					}
				});
			} 
			else
			{
			materiallist.indentTemplateSlaves.push({

				productQty : qty,
				productMaster : {
					'productId' : indentProductId,
				},
				indentTemplateSlaveNarration : narration
				
			});
		 }
		}
	}

	var li = materiallist.indentTemplateSlaves.length;
	if (materiallist.indentTemplateSlaves.length < 1) {
		alert("Please enter atleast one Item row to generate indent");
		return false;
	}

	materiallist = JSON.stringify(materiallist);
	var inputs = [];

	// General Info
	inputs.push("txtIndentTemplateId=" + txtIndentMasterId);
	inputs.push("indentTemplateSlaves=" + materiallist);
	inputs.push('indentTemplateNarration=' + indentTemplateNarration);
	inputs.push('indentTemplateName=' + indentTemplateName);
	
	inputs.push('txtIndentUserIp=' + txtIndentUserIp);
	inputs.push('txtIndentAddUserId=' + txtIndentAddUserId);
	inputs.push('txtIndentAddTime=' + txtIndentAddTime);
	inputs.push('txtIndentAddDate=' + txtIndentAddDate);
	
	var totalRow = $("#indentTemplateRowCount").val();

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str,
		url : "./pharmacy/indentTemplate/saveIndentTemplate",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
		},
		success : function(r) {

			alert("Record saved successfully..!");

			$('#mrn').tab('show');

			$("#indetTemplateTable").html("");
			$("#indentTemplateRowCount").val("1");
			$("#totalDocQty").val("");
			
			$("#txtIndentMasterId").val("");
			$("#txtIndentMasterName").val("");
			$("#txtIndentMasterNarration").val("");
			
			$("#txtIndentAddDate").val("");
			$("#txtIndentAddTime").val("");
			$("#txtIndentAddUserId").val("");
			$("#txtIndentUserIp").val("");
		}
	});
}


function getIndentTemplateDetails(type) {
	$.ajax({
				async : true,
				type : "POST",
				//url : "/EhatEnterprise/pharmacy/indentTemplate/getIndentTemplateDetails",
				url : "./pharmacy/indentTemplate/getIndentTemplateDetails",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					
					if(type=="template")
						setAllIndentTemplateData(r);
					else
						setAllIndentTemplateDataForIndent(r);
				}
			});

}

function setAllIndentTemplateDataForIndent(data)
{
	var result = jQuery.parseJSON(data);
	var divContent="";
	divContent=divContent+"<select name='selectIndentTemplate' id='selectIndentTemplate' onchange='setIndentIPDRows()'><option>select</option>"
	for(var i=0;i<result.length;i++)
	{
		divContent=divContent+"<option value='"+result[i].Id+"'>"+result[i].name+"</option>";
	}	
	$("#selectIndentTemplateDiv").html("</select>"+divContent);
}


function setAllIndentTemplateData(data) {
	var result = jQuery.parseJSON(data);

	var divContent = "";
	if (result.length > 0) {
		for ( var i = 0; i < result.length; i++) {
			
			const result1 = new Date(result[i].date).toLocaleDateString('en-GB');
			
			divContent = divContent
					+ "<tr><td class='col-md-1 center'>"
					+ (i + 1)
					+ "</td><td class='col-md-2 center'>"
					+ result[i].name
					+ "</td><td class='col-md-2 center'>"
					+ result1
					+ "</td><td class='col-md-2 center'>"
					+ result[i].narration
					+ "<td class='col-md-1 center'><button type='button' onclick='viewAllIndentTemplateDataById("
					+ result[i].Id
					+ ")' id='btnView2' value='VIEW' class='btn btn-xs btn-warning'><i class='fa fa-eye View'></i></button></td><td class='col-md-1 center'><button onclick='editIndentTemplateDataById("+result[i].Id+")' class='btn btn-xs btn-success editUserAccess' id='btnPrint' disabled='disabled'> <i class='fa fa-edit'></i> </button></td>" 
					+" <td class='col-md-1 center'><button onclick='deleteIndentTemplate("+result[i].Id+")' class='btn btn-xs btn-danger deleteUserAccess' id='btnPrint' disabled='disabled'> <i class='fa fa-trash-o'></i> </button></td></tr>";
		}
	} else {
		divContent = divContent + "<tr><td colspan=7>No Record Found</td></tr>";
	}

	$("#consumptionDetailsById").html(divContent);
	setTimeout(function(){userAccess();},200);
}

function deleteIndentTemplate(value) {
	var indentTemplateId = value;
	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "./pharmacy/indentTemplate/deleteIndentTemplateDetails",
				data : {
					indentTemplateId : indentTemplateId
				},
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					getIndentTemplateDetails('template');
				}
			});
}

function viewAllIndentTemplateDataById(value) {
	var indentTemplateId = value;
	$('#indentTemplatePopUp').modal('show');

	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "./pharmacy/indentTemplate/getIndentTemplateDetailsById",
				data : {
					indentTemplateId : indentTemplateId
				},
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					setAllIndentTemplateDataById(r);
				}
			});
}

function showIndentTemplateList()
{
	$("#indentMasterListDiv").show();
	$("#divIndentMaster").show();
}

function setAllIndentTemplateDataById(data) {
	var result = data[0];
	$("#divIndentSaleNo").html(result.indentTemplateId);
	$("#divIndentReceiveDate").html(getDate(result.indentTemplateAddDate));

	var divContent = "";
	for ( var i = 0; i < result.indentTemplateSlaves.length; i++) {
		var productName1 = result.indentTemplateSlaves[i].productMaster.productName;
		divContent = divContent + "<tr><td class='center'>" + (i + 1)
				+ "</td><td class='center'>" + productName1
				+ "</td><td class='center'>"
				+ result.indentTemplateSlaves[i].productQty
				+ "</td><td class='center'>"
				+ result.indentTemplateSlaves[i].indentTemplateSlaveNarration
				+ "</tr>";
	}
	$("#preIndentTemplateDataById").html(divContent);
}

function editIndentTemplateDataById(value) {
	var indentTemplateId = value;
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "./pharmacy/indentTemplate/getIndentTemplateDetailsById",
				data : {
					indentTemplateId : indentTemplateId
				},
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					setEditIndentTemplateDataById(r);
				}
			});
}

function setEditIndentTemplateDataById(result)
{
	if(result!=null)
	{
		$("#txtIndentMasterId").val(result[0].indentTemplateId);
		$("#txtIndentMasterName").val(result[0].indentTemplateName);
		$("#txtIndentMasterNarration").val(result[0].indentTemplateNarration);
		$("#divListIndentTemplate").removeClass("active");
		$("#divNewIndentTemplate").addClass("active");
		
		$("#txtIndentAddDate").val(getDate(result[0].indentTemplateAddDate));
		$("#txtIndentAddTime").val(result[0].indentTemplateAddTime);
		$("#txtIndentAddUserId").val(result[0].indentTemplateAddUserId);
		$("#txtIndentUserIp").val(result[0].indentTemplateIp);
		
		
		$('#consumptionDiv').prop("class", "tab-pane fade active in");
		$('#consumptionDetails').prop("class", "tab-pane fade");
		
		var divContent="";
		
		for(var i=0;i<result[0].indentTemplateSlaves.length;i++)
		{
			var productId=result[0].indentTemplateSlaves[i].productMaster.productId;
			var productName=result[0].indentTemplateSlaves[i].productMaster.productName;
			var qty=result[0].indentTemplateSlaves[i].productQty;
			var narration=result[0].indentTemplateSlaves[i].indentTemplateSlaveNarration;
			var slaveId=result[0].indentTemplateSlaves[i].indentTemplateSlaveId;
			var rowCount=i+1;
			divContent = divContent
					+ "<tr id='remove"
					+ rowCount
					+ "'><td style='display:none;'><input type='hidden' id='txtIndentTemplateProductId"
					+ rowCount
					+ "' "
					+ " value='"+productId+"'><input type='hidden' value='1' id='hiddenCurrentRow'></td>"

					+ "<input id='indentTemplateNumber"
					+ rowCount
					+ "' type='hidden' value='"+(i+1)+"' "
					+ "/>"
					+ "</td>"
					
					+ "<input id='txtIndentTemplateSlaveId"
					+ rowCount
					+ "' type='hidden' value='"+slaveId+"' "
					+ "/>"
					
					+ "<td>"
					+ "<input type='checkbox' id='chckbox"
					+ rowCount
					+ "' name='checkbox"
					+ rowCount
					+ "'>"
					+ "</td>"

					+ "<td>"
					+ rowCount
					+ "</td>"

					+ "<td><input type='text' class='form-control input-SmallText' id='txtIndentTemplateProductName"
					+ rowCount
					+ "' data-toggle='modal' data-target='#indent_template_pop_up' onclick='loadIndentTemplate("
					+ rowCount + " )'" + " value='"+productName+"'></td>"

					+ "<td><input type='text' onblur=isNumber('txtIndentTemplateRequireQty"
					+ rowCount
					+ "') class='form-control input-SmallText'  id='txtIndentTemplateRequireQty"
					+ rowCount + "'  value='"+qty+"'></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText'  id='txtIndentTemplateNarration"
					+ rowCount + "'  value='"+narration+"'></td> "

					+ "</tr>";

			rowCount++;
			$("#indentTemplateRowCount").val(rowCount);
		}
		$('#indetTemplateTable').html(divContent);
	}
}

/***********
 * @author	: Touheed Khan
 * @date	: 04-June-2016
 * @reason	: For time slot setting unchecking
 */
function uncheckingTimeSlot(){
	
	$( "#mo").prop('checked', false);

	$( "#an").prop('checked', false);	

	$( "#ev").prop('checked', false);
	
	$( "#nt").prop('checked', false);
	
}
/***********
 * @author	: Tushar
 * @date	: 06-Oct-2016
 * @reason	: For Popup Privious Summary OPD
 */
function showSummaryPostPopup(value){
	$("#SummarypostPopup").show();
}
function hideSummaryPostPopup(value) {
	$("#SummarypostPopup").hide();
}

/***********
 * @author	: !rf@n Kh@n
 * @date	: 19-Oct-2016
 * @reason	: to fetch the title from database 
 */
function title(callFrom){
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/admin/getallpatienttitles",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			//ajaxResponse = r;
			var title = r;
			//var title = eval('(' + ajaxResponse + ')');
			// alert(title.titleList[0].fTitle);
			var html = "";
			html = html + "<option value='select'>-Select Title-</option>";
			for ( var i = 0; i < r.listPatientTitle.length; i++) {

				html = html + "<option value='" + r.listPatientTitle[i].patientTitle
						+ "'>" + r.listPatientTitle[i].patientTitle + "</option>";

			}
			if (callFrom == "PatientRegistration" || callFrom == "PatientEdit"
					|| callFrom == "VisitingPatient" || callFrom == "IPD_OPD_Database") {
				$("#title").html(html);
				$("#insuredTitle").html(html);
				$("#relativeTitle").html(html);
				$("#erInformerTitle").html(html);
				$("#mlcInformerTitle").html(html);

			} else if (callFrom == "UserManagement" || callFrom == "AdminEmployeeForm" || callFrom == "OPD_Appointment") {
				$("#title").html(html);

			} else if (callFrom == "labTestresult" || callFrom == "labTestreport") {
				$("#initial").html(html);

			} else if (callFrom == "HospitalOwnerDetails") {
				$("#selTitle").html(html);

			}else if (callFrom == "ehat_patient") {
				$("#prefix").html(html);
				$("#prefix2").html(html);
				$("#prefix3").html(html);
			}
			
			// $("#initial").html(html);
		}
	});

}

/***********
 * @author	: Tushar
 * @date	: 08-Nov-2016
 * @reason	: For Popup Privious Summary IPD
 */
function showSummaryPostPopupIPD(value){
	setTempForpopup();
	$("#IPDSummarypostPopup").show();
}
function hideSummaryPostPopupIPD(value) {
	$("#IPDSummarypostPopup").hide();
	$("#IPDSummarypostPopup").modal('hide');
	
}

function fetchCKEditorDocterDesk1ForPrintIPD() {
	
	var treatmentId = $('#tid2').html();
	var inputs = [];
	inputs.push('action=fetchCKEditorDocterDesk1');
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					var testObj = eval('(' + ajaxResponse + ')');
					
						var divContent="";
						if ((testObj.pattemplist.length) > 0) {
							
							for ( var int = 0; int < testObj.pattemplist.length; int++) {
								divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>" + testObj.pattemplist[int].tempdata + "</td></tr>";
							}
						}
						else
						{
							divContent=divContent+"<tr><td colspan = 4>No Record Found</td></tr>";
						}
						$("#SubObj2").html(divContent);
				}
			});
}
function setDoctorPreRoundforPrintIPD() {

	rowCount = 1;
	k = 1;
	count = 1;
	var treatmentId = $('#tid2').html();
	pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	var date = $("#date-pick").val();
	var inputs = [];
	inputs.push('action=PreviousDoctorRound');
	inputs.push('tid=' + treatmentId);
	inputs.push('date=' + date);

	var str = inputs.join('&');

	jQuery.ajax( {
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "IPDTreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			//alert(r);
			$("#DoctorRound").html(ajaxResponse);
			var testObj = eval('(' + ajaxResponse + ')');
			var divContent="";
			if (testObj.drrl.length > 0) {
				
				for ( var int = 0; int < testObj.drrl.length; int++) {
					divContent=divContent+"<tr class='col-md-12-1'><td class='form-group col-md-3-1 '>" + (int+1) +"</td>" 
					+ "<td class='form-group col-md-3-1 '>" + testObj.drrl[int].tm +"</td>" 
					+ "<td class='form-group col-md-3-1 '>" + testObj.drrl[int].cn +"</td>" 
					+ "<td class='form-group col-md-3-1 '>" + testObj.drrl[int].ia +"</td>" 
					+ "<td class='form-group col-md-3-1 '>" + testObj.drrl[int].rb +"</td>"
					+ "</tr>";
				}
			}
			else
			{
				divContent=divContent+"<tr><td colspan = 4>No Record Found</td></tr>";
			}
			$("#DocRound2").html(divContent);
		}
	});
}
function fetchAllergyAlertsForPrintIPD() {
	
	var pid = $('#pid').html();
		
	if (pid == "" || undefined == pid) {
		pid = $("#pid").val();
	}
	
	if (pid == "" || undefined == pid) {
		alert("UHID not fetched properly Allergy alerts...");
		return;
	}
	var inputs = [];
	inputs.push('action=fetchAllergyAlerts');
	inputs.push('pid=' + pid);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(res) {
				var ajaxResponse = res;
					$("#allergyAlertsDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');
					var divContent="";
					if (testObj.allergyAlertsDTOList.length > 0) {
							
						for ( var int = 0; int < testObj.allergyAlertsDTOList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>"+ testObj.allergyAlertsDTOList[int].allergyName+"\n"+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
					}
					$("#alertAllergy2").html(divContent);
				}	
			});
}
function showAssessmentForPrintIPD() {

	count = 1;
	flag_count = 1;
	assesTmpConfmedPrescriptionCount = 1;
	var treatmentId = $('#tid2').html();
	var inputs = [];
	inputs.push('action=fetchAssessment');
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(res) {
					var ajaxResponse = res;
					$("#assesmentDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');
					
					var divContent="";
					if (testObj.assessmentList.length > 0) {
							
						for ( var int = 0; int < testObj.assessmentList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>"+ testObj.assessmentList[int].diagnosis+"\n"+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
					}
					$("#conirmDiagno2").html(divContent);
				}
			});
}
function fetchTestForPrintIPD() {

	var treatmentId = $('#tid2').html();
	var inputs = [];
	inputs.push('action=fetchTestForDashboard');
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PathologyServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r) {
					ajaxResponse = r;
					$("#CPOE_TestDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');		
					var divContent="";
					if (testObj.testDashboard.length > 0) {
							
						for ( var int = 0; int < testObj.testDashboard.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1'><td class='form-group col-md-3-1 '>" + testObj.testDashboard[int].perticuler +"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.testDashboard[int].consultant +"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.testDashboard[int].date+"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.testDashboard[int].desciption+"</td>" 
							+ "<td class='form-group col-md-2-1 '>" + testObj.testDashboard[int].testType+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
					}
					$("#cpoeTest2").html(divContent);
					
				}
			});
}
function fetchPrescriptionForPrintIPD() {
	prepCount = 0;
	var treatmentId = $('#tid2').html();
	var inputs = [];
	inputs.push('action=fetchPrescription');
	inputs.push('treatmentId=' + treatmentId);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(res) {
					var ajaxResponse = res;
					$("#prescriptionDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');
					var divContent="";
					if (testObj.prescriptionList.length > 0) {
							
						for ( var int = 0; int < testObj.prescriptionList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1'><td>"+(int)+"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.prescriptionList[int].prepName + "</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.prescriptionList[int].name + "</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.prescriptionList[int].instructionName+"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.prescriptionList[int].days+" Days"+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
					}
					$("#prescription2").html(divContent);
				}
			});
}
function fetchPCTreatmentInstructionForPrintIPD() {
	
	var treatmentId = $('#tid2').html();
	var inputs = [];
	inputs.push('action=fetchPCTreatmentInstruction');
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					var testObj = eval('(' + ajaxResponse + ')');
					
					var divContent="";
					if (testObj.treatmentInstructionDTOList.length > 0) {
							
						for ( var int = 0; int < testObj.treatmentInstructionDTOList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>"+testObj.treatmentInstructionDTOList[int].treatmentChildInstructionName+"\n"+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
					}
					$("#genInst2").html(divContent);
					
				}
			});
}
function fetchIndividualTreatmentInstructionForPrintIPD() {
	
	var treatmentId = $('#tid2').html();
	var inputs = [];
	inputs.push('action=fetchIndividualTreatmentInstruction');
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					$("#TreatmentInstructionDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');

					var divContent="";
					if (testObj.reportInstructionDTOList.length > 0) {
							
						for ( var int = 0; int < testObj.reportInstructionDTOList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>"+testObj.reportInstructionDTOList[int].reportInstruction+"\n"+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
					}
					$("#primInst2").html(divContent);
					
				}
			});
}
function showPatientAdmissionNoteIPD() {
	
	var treatmentId = $("#tid2").html();
	var pid = $("#pid2").html();
	var inputs = [];
	inputs.push('action=fetchPatientAdmissionNote');
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('pid=' + pid);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			var obj = eval('(' + ajaxResponse + ')');
			var divContent="";
			if (obj.length > 0) {
				divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>"+obj.note+"\n"+"</td></tr>";
			}
			else
			{
				divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
			}
			$("#note2").html(divContent);
		}
	});
}
function fetchIpdServicesIPD() {

	var trid = $("#tid2").html();

	var inputs = [];
	inputs.push('action=fetchIpdServices');
	inputs.push('trid=' + trid);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PatientServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r) {
					ajaxResponse = r;
					$("#servicesList").html(ajaxResponse);
					var serviceResponse = eval('(' + ajaxResponse + ')');

					if (serviceResponse.isli.length != 0) {
							var servicesList = serviceResponse.isli[0].liservices;
							var divContent = "";
							$("#servicesListLength").val(servicesList.length);
								
								for ( var int = 0; int < servicesList.length; int++) {
									var a1 =  servicesList[int].ipdservicetype ;
									if(a1 == "b"){
										a1 = "Bed Side Procedures";
									}else if(a1 == "g"){
										a1 = "Gases and Monitors"; 
									}else{
										a1 = "Instruments and Equipments";
									}
								divContent=divContent+"<tr class='col-md-12-1'><td class='form-group col-md-3-1 '>"+ servicesList[int].tname +"</td>" 
								+ "<td class='form-group col-md-3-1 '>" + a1 +"</td>" 
								+ "<td class='form-group col-md-3-1 '>" + servicesList[int].qty + "</td>" 
								+ "<td class='form-group col-md-3-1 '>" + servicesList[int].assignUserName+"</td>" 
								+ "<td class='form-group col-md-3-1 '>" + servicesList[int].assignDateTime+"</td>"
								+ "</tr>";
						}
						}else
						{
							divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
						}
						$("#ipdServices2").html(divContent);
					
				}
			});
}
function printPrescriptionIPD(paramPopupOrPrint,callFrom) {
	
	callFrom = $("#pageType").val();
	hideSummaryPostPopupIPD();
	if (paramPopupOrPrint == "SHOW_POPUP_PRINT") {
		$("#iPrintIPDSummary").show();
	} else if (paramPopupOrPrint == "PRINT") {
		
		var pid = $.trim($("#patId").html());
		var tid = $.trim($('#treatmentId').val());
		
		var pid1 = $.trim($("#pid2").html());
		var tid1 = $.trim($("#tid2").html());
		var date = $("#regDate2").html();
		
		if(pid1 != "" || tid1 != ""){
			callFrom = "previousTreatmentIPD";
		}
		
		var instructionLanguage = $(
				"input[name='prepInstructionPopup']:checked").val();
		var pageSize = $(
		"input[name='prepInstructionPaperSizePopup']:checked").val();
		var vaccinationFlagCheckboxPrint = $(
				"input[name='vaccinationFlagCheckboxPrint']:checked").val();

		
		setTimeout(
				function() {

					$("#iPrintIPDSummary").hide();
					
					if(pid1 == "" && tid1 == ""){
						window
							.open(("IPDPrescriptionPrint.jsp?pid=" + pid + "&callFrom=" + callFrom
									+ "&tid=" + tid + "&instructionLanguage="
									+ instructionLanguage + "&date=" + date
									+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&pageSize="+pageSize));
					}
					else{
						window
							.open(("IPDPrescriptionPrint.jsp?pid1=" + pid1 + "&callFrom=" + callFrom
								+ "&tid1=" + tid1 + "&instructionLanguage="
								+ instructionLanguage + "&date=" + date
								+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&pageSize="+pageSize));
						
					}location.reload();
					}, 300);
		
	} else if (paramPopupOrPrint == "HIDE_POPUP_PRINT") {
		$("#iPrintIPDSummary").hide();
	}
	
}

//Shwetali changes for cancelIndent on 22 Dec 2016
function cancelIndentByTreatmentId() {
	var receivedFrom = $("#receivedFrom").val();
	if (receivedFrom == "OT") {
		treatmentId = $("#txtPatientTreatmentId").val();
	} else {
	//	treatmentId = $("#treatmentId").val();
		
		treatmentId = $("#tr_Id").val(); //added by paras
	}

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "./pharmacy/indentSale/getCancelIndentData",
		data : {
			treatmentId : treatmentId
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			setCancelIndentIndentData(r);
			}
	});

}

function setCancelIndentIndentData(data) {
	var result = jQuery.parseJSON(data);

	var divContent = "";
	if (result.length > 0) {
		for ( var i = 0; i < result.length; i++) {
			if (result[i].status == 'pending') {
				divContent = divContent
						+ "<tr><td class='col-md-1 center'>"
						+ (i + 1)
						+ "</td><td class='col-md-2 center'>"
						+ result[i].date
						+ "</td><td class='col-md-2 center'>"
						+ result[i].status
						+ "</td><td class='col-md-2 center'>"
						+ result[i].storeName
						+ "</td><td class='col-md-2 center'>"
						+ result[i].receiveFrom
						+ "</td>"
						+ "<td class='col-md-1 center'><button type='button' onclick='viewAllPreviousIndentDataById("
						+ result[i].indentId
						+ ")' id='btnView2' value='VIEW' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button></td></tr>";
			} else {
				divContent = divContent
						+ "<tr><td class='col-md-1 center'>"
						+ (i + 1)
						+ "</td><td class='col-md-2 center'>"
						+ result[i].date
						+ "</td><td class='col-md-2 center'>"
						+ result[i].status
						+ "</td><td class='col-md-2 center'>"
						+ result[i].storeName
						+ "</td><td class='col-md-2 center'>"
						+ result[i].receiveFrom
						+ "</td>"
						+ "<td class='col-md-1 center'><button type='button' onclick='viewAllPreviousIndentDataById("
						+ result[i].indentId
						+ ")' id='btnView2' value='VIEW' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button></td></tr>";
			}
		}
	} else {
		divContent = divContent + "<tr><td colspan=7>No Record Found</td></tr>";
	}

	$("#cancelIndentData").html(divContent);
}



/*************
 * @author	:  Manisha 
 * @date	: 29-Dec-2016 
 * @reason	: Fetch Treatment At Discharge Template
 */

function featchTreatmentAtDischarge(){
	
	
	DisCount = 1;
	var treatmentId = $("#treatmentId").val();
	var date_pick = $("#OFdate-pick").val();
	if ($("#hiddenDate").val() == date_pick) {
		$("#divCopyOrderForm").hide();
	} else {
		$("#divCopyOrderForm").show();
	}
	var type= "TreatmentAtDischarge";
	var inputs = [];
	inputs.push('action=featchTreatmentAtDischarge');
	inputs.push('tid=' + treatmentId);
	inputs.push('type=' + type);
	inputs.push('date=' + date_pick);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "IPDTreatmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
				},
				success : function(r) {
					var ajaxResponse = r;
					
					$("#objorder").html(ajaxResponse);
					var sampleBean = eval('(' + ajaxResponse + ')');
					var orderFormTemp = "";
					var instruction = "";
					var prepName = "";
					$("#divOmID").html("");

					if (sampleBean.ormali.length > 0) {

						$("#divOmID").html(sampleBean.ormali[0].omID);

						for ( var int = 0; int < sampleBean.ormali[0].ocodrli.length; int++) {
							
							prep = "";
							if ((sampleBean.ormali[0].ocodrli[int].prep) != 0) {
								prep = $(
										"#prep option[value='"
												+ (sampleBean.ormali[0].ocodrli[int].prep)
												+ "']").text();
							}
							
							instruction = "";

							if ((sampleBean.ormali[0].ocodrli[int].rmrk) != 0) {
								instruction = $(
										"#instruction option[value='"
												+ sampleBean.ormali[0].ocodrli[int].rmrk
												+ "']").text();
							}

							orderFormTemp = orderFormTemp
									+ "<tr><td class='col-md-1-1 center'>"
									+ DisCount
									+ ".</td>"
									+ "<td class='col-md-2-1 center'>"
									+ sampleBean.ormali[0].ocodrli[int].drdo
									+ "</td>"
									+ "<td class='col-md-2-1 center'>"
									+ sampleBean.ormali[0].ocodrli[int].prepName //jitendra 29 march
									+ "</td>"
									+ "<td class='col-md-3-1 center' style='padding-left: 15px;'>"
									+ instruction
									+ "</td>"
									+ "<td class='col-md-2-1 center' style='padding-left: 15px;'>"
									+ sampleBean.ormali[0].ocodrli[int].days
									+ "</td>"
									+ "<td class='col-md-1-1 center'>"
									+ "<input id='checkbox"
									+ DisCount
									+ "' type='checkbox' onclick='unCheckOF("
									+ (DisCount++)
									+ ","
									+ sampleBean.ormali[0].ocodrli[int].ocdID
									+ ")'"
									+ "style='margin-top: 2px;' /></td>"
									+ "</tr>";
						}
					}

					
					$('#orderFormContent').html(orderFormTemp);
					$("#OFSlaveID").val("0");

					// Treatment At Discharge of cover sheet
					DisCount = 1;
					$("#coverSheetOrderForm").setTemplate(
							coverSheetOrderForm);
					$("#coverSheetOrderForm").processTemplate(sampleBean);

					var callFor = ($("#callFor").val()).trim();
					if (callFor === "previousTreatmentIPD") {
						$("#divCopyOrderForm").hide();

						setTimeout(function() {
							disableIpdDoctorStationJSP();
						}, 500);
					}
				}
			});
}

// Code By - Kavita Bhangale Date - 15 Feb 2017
function setAutoPatientNameForMarkVisit(inputID, onload, callFrom) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	var autoType = '';
	var auto = '';
	if (callFrom == "MarkVisit_Database") {
		auto = 'MarkVisitPatient';
	} else if (callFrom == "IPD_OPD_PatientDatabase") {
		auto = 'Total_Database';
	} else if (callFrom == "previousOPDbill") {
		auto = 'PreviousOPDBillPatient';
	}  
	
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					
					ajaxResponse = r;//decodeURIComponent(r);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");
					
					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					$("#pathiddenid").val(idValue);
					
					$("#" + inputID ).html(template);
					$("#" + inputID ).show();
					setTimeout(function() {
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 00);
				}
			});
	function displayResult(item) {
		$("#" + inputID).val((item.text).trim());
		$("#txtDoctorId").val((item.value).trim());
	}
}

/************
 * @author	: Amrut Patil 
 * @date	: 10 March 2017
 * @codeFor	: Admission print on button -> Helpdesk-Database-Admission Print
 ***********/
function passToAdmissionPrint(pid){
	var patientType = $("input:radio[name='typeOfpatCheck']:checked").val();
	if(pid != "" || pid != null){
		window.open("AdmissionPrintOnHelpdeskPrintButton.jsp?"+"pid="+ pid +"&patientType="+patientType);
	}
}


function passToAdmissionPrint2(tid){
	
	/*var patientType = $("input:radio[name='typeOfpatCheck']:checked").val();
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : tid
		},
		url : "ehat/registration/fetchPatientsRecordByTreatmentId",
		success : function(r) {
			count=50;
 			var ptName=r.listRegTreBillDto[0].patientName;
 			var OpdIpdNo=r.listRegTreBillDto[0].trcount;
 			window.open("AdmissionPrintOnHelpdeskPrintButton.jsp?"+"tid="+ tid);
 	//window.open("ehat_lab_barcode.jsp?masterId="+masterId+"&count="+count+"&ptName="+ptName+"&OpdIpdNo="+OpdIpdNo);
}
	});*/
	window.open("AdmissionPrintOnHelpdeskPrintButton.jsp?"+"tid="+ tid);
}


/************
 * @author	: Manisha Padghankar 
 * @date	: 19 April 2017
 * @codeFor	: company Sponsor
 ***********/

var CompanyDetailsTemplate = "<option value='select'>-select-</option>{#foreach $T.CompanyDetailsDTOList as cl}<option value='{$T.cl.companyID}'>{$T.cl.comapanyname}</option>{#/for}";

function fetchSponseredCompanyDetailsForRegistration(type) {
	var inputs = [];
	inputs.push('action=fetchSponsoredCompanyDetails');
	inputs.push('type=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("unable to fetch Company details");
		},
		success : function(r) {
			var ajaxResponse = r;
			$("#CompanySponsorDetails").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#companyName").setTemplate(CompanyDetailsTemplate);
			$("#companyName").processTemplate(pobj1);
		}
	});
}


/************
 * @author	: Manisha Padghankar 
 * @date	: 21 April 2017
 * @codeFor	: company Sponsor
 ***********/

var PolicyDetailsTemplate = "<option value='select'>-select-</option>{#foreach $T.PolicyDetailsDTOList as pl}<option value='{$T.pl.policyID}'>{$T.pl.policyName}</option>{#/for}";

function fetchSponseredPolicyDetailsForRegistration(type) {
	var inputs = [];
	inputs.push('action=fetchSponsoredPolicyDetails');
	inputs.push('type=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("unable to fetch Policy details");
		},
		success : function(r) {
			var ajaxResponse = r;
			$("#PolicyDetails").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#sponseredName").setTemplate(PolicyDetailsTemplate);
			$("#sponseredName").processTemplate(pobj1);
		}
	});
}

var  CompanyNameByPolicyTypTemplate = "<option value='select'>-select-</option>{#foreach $T.PolicyDetailsDTOList as pl}<option value='{$T.pl.companyID}'>{$T.pl.policyName}</option>{#/for}";


/************
 * @author	: Manisha Padghankar 
 * @date	: 2 May 2017
 * @codeFor	: get Company NameByPolicyType
 ***********/
function getCompanyNameByPolicyType(policyId){
	
	ajaxResponse = $("#PolicyDetails").html();
	json = JSON.parse(ajaxResponse);
		
		for ( var i = 0; i < json.PolicyDetailsDTOList.length; i++) {
			if (json.PolicyDetailsDTOList[i].policyID == policyId) {

				   $('#companyName').val(json.PolicyDetailsDTOList[i].companyID);
				
				var CompanyId = $("#companyName").val();

				
					ajaxResponse = $("#CompanySponsorDetails").html();
					json2 = JSON.parse(ajaxResponse);

					for ( var i = 0; i < json2.CompanyDetailsDTOList.length; i++) {
						if (json2.CompanyDetailsDTOList[i].companyID == CompanyId) {
							$('#sponsoredType').val(json2.CompanyDetailsDTOList[i].sposoredID);
							break;
						}
					}
					break;
				}
			}
}


/************
 * @author	: Manisha Padghankar 
 * @date	: 2 May 2017
 * @codeFor	: get Company NameByPolicyType
 ***********/
function getSponsorTypeByPolicyTypeAndCompanyName(SponsorID){
	
	var sponsorObjects = {
			sponsoredDetailsDTOList : []
		};
		var OBJ = $("#SponsorDetails").html();

	    
		json = JSON.parse(OBJ);
		
		for ( var i = 0; i < json.sponsoredDetailsDTOList.length; i++) {

			//alert(json.districtList[i].state_id);
			
			if (json.sponsoredDetailsDTOList[i].sposoredID == SponsorID) {
				sponsorObjects.sponsoredDetailsDTOList.push(json.sponsoredDetailsDTOList[i]);
			}
		}

		$("#companyName").setTemplate(CompanyDetailsTemplate);
		$("#companyName").processTemplate(sponsorObjects);
		
		$("#sponseredName").setTemplate(PolicyDetailsTemplate);
		$("#sponseredName").processTemplate(sponsorObjects);
		
}

function getPolicyTypeByCompanyName(companyID){
	
	ajaxResponse = $("#CompanySponsorDetails").html();
	json = JSON.parse(ajaxResponse);
	

	for ( var i = 0; i < json.CompanyDetailsDTOList.length; i++) {
		if (json.CompanyDetailsDTOList[i].companyID == companyID) {
			$('#sponsoredType').val(json.CompanyDetailsDTOList[i].sposoredID);
			break;
		}
	}
	
	PolicyObjects = {
			PolicyDetailsDTOList : []
			
	}
	
	ajaxResponse = $("#PolicyDetails").html();
	
	json1 = JSON.parse(ajaxResponse);

	for ( var i = 0; i < json1.PolicyDetailsDTOList.length; i++) {
		if (json1.PolicyDetailsDTOList[i].companyID == companyID) {
			PolicyObjects.PolicyDetailsDTOList.push(json1.PolicyDetailsDTOList[i]);
		}
	}
	$("#sponseredName").setTemplate(PolicyDetailsTemplate);
	$("#sponseredName").processTemplate(PolicyObjects);
}
/************
* @author	: Parikshit Bhawar
* @date		: 14-June-2017
* @codeFor	: Get parameter from URL
 ************/
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};




//@author : Parikshit @date : 13-June-2017 @reason : to fetch RIS Report Data
function fetchRisReportList()
{
	var TestID=getUrlParameter('TestID');
	var TID=getUrlParameter('TID');
	//var PID = $("#patid").text();
	var PID = $("#patientId").text();
    var Invidrd = $("#Invidrd").val();

	var inputs = [];
	inputs.push('action=fetchRisReportList');
	inputs.push('TestID=' + TestID);
	inputs.push('tretId=' + TID);
	inputs.push('pid=' + PID);
	inputs.push('Invidrd=' + Invidrd);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
		
			var ajaxResponse=JSON.parse(r);
			$('#selRisCrTempList option[value="'+ajaxResponse.RTList[0].type+'"]').attr("selected",true);
			setRadiologyTemplates(ajaxResponse.RTList[0].type,ajaxResponse.RTList[0].ReadioID);
			CKEDITOR.instances['Riseditor1'].setData( ajaxResponse.RTList[0].TempData );
			
		}
	});
}

//@author : Parikshit @date : 13-June-2017 @reason : to set perticular template type in RIS Create Report
function setRadiologyTemplates(templateId,templateTypeId)
{
	var inputs = [];
	inputs.push('action=fetchRisType');
	inputs.push('ID='+templateId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#rislistobject").html(ajaxResponse);
			
			$("#risTempList").setTemplate(TemplateRISList);
			$("#risTempList").processTemplate(pobj1);
			
			$('#risTempList option[value="'+templateTypeId+'"]').attr("selected",true);
		}
	});	
}

/*******************************************************************************
 * @author Kishor Lokhande
 * @date 3_June_2017
 * @Code Getting Patient Data By Id
 ******************************************************************************/
function getPatientDataByTidris(r) {
	//alert(r);
	var deptID=0;
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : r
		},
		url : "ehat/registration/fetchPatientsRecordByTreatmentId",
		success : function(r) {
			// setTempPatientRecords(r);
			console.log(r);
			/* alert(r); */
			 /*****Added By Sagar******/
			//alert(r.listRegTreBillDto[0].sourceTypeId);
		//	getSponsorRecordsRIS(r.listRegTreBillDto[0].chargesMasterSlaveId,r.listRegTreBillDto[0].sourceTypeId);
			           /* callFrom=r.listRegTreBillDto[0].chargesMasterSlaveId;
			            alert(callFrom);
			            if (callFrom==null || callFrom=="" || callFrom==undefined ||callFrom==0){
			            	
			            	
			            }else{
			            	getSponsorRecords(r.listRegTreBillDto[0].sourceTypeId);}*/
			/* alert(); */
			$("#patientId").text(r.listRegTreBillDto[0].patientId);
			$("#age").text(r.listRegTreBillDto[0].age);
			$("#patientName").text(r.listRegTreBillDto[0].patientName );
		    $("#billNo").text(r.listRegTreBillDto[0].billId);
		    $("#depdocdeskid").val(r.listRegTreBillDto[0].departmentId);
			/*$("#patientName").text(r.ListRegTreBillDto[0].fName + " " + r.ListRegTreBillDto[0].mName + " "
			
							+ r.ListRegTreBillDto[0].lName);*/
		    dept=r.listRegTreBillDto[0].departmentId;
		    $("#drid").val(r.listRegTreBillDto[0].doctorId);
		    $("#pid").val(r.listRegTreBillDto[0].patientId);
		    
		    //****hidden set for bmi****//
		  //  alert("dob"+r.listRegTreBillDto[0].dob);
		   $("#dbirth").val(r.listRegTreBillDto[0].dob) ;
		  // alert(r.listRegTreBillDto[0].weight);
		   $("#weight1").val(r.listRegTreBillDto[0].weight) ;
		   $("#height1").val(r.listRegTreBillDto[0].height) ;
 
			$("#sex").text(r.listRegTreBillDto[0].gender);
			deptID =r.listRegTreBillDto[0].departmentId;
			$("#pId").val(r.listRegTreBillDto[0].patientId);
			$("#bId").val(r.listRegTreBillDto[0].billId);
			$("#tId").val(r.listRegTreBillDto[0].treatmentId);
			$("#treatmentId").html(r.listRegTreBillDto[0].treatmentId);
			$("#sId").val(r.listRegTreBillDto[0].serviceId);
			$("#ipdNo").text(r.listRegTreBillDto[0].fName);
			/* ****Added By Sagar******/
			if(r.listRegTreBillDto[0].sourceTypeId>0){
				
				$("#billCategoty").text("Sponsor");

			}else{
				$("#billCategoty").text("Self");
				$("#corporate").text("-");
			}
			 var fileName=r.listRegTreBillDto[0].imageName;	
			  if(fileName!="" && fileName!=null && fileName!=undefined){
				  $('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
			  }
 			/*  $("#ipdNo").text(r.listReg[0].fName);
			  $("#billCategoty").text(r.listReg[0].fName);
			  $("#consultingDoctor").text(r.listReg[0].fName);
			  $("#corporate").text(r.listReg[0].fName);
			  $("#doa").text(r.listReg[0].fName);
			  $("#dod").text(r.listReg[0].fName);*/
			 
			  $("#SponsorsourceTypeId").val(r.listRegTreBillDto[0].sourceTypeId);
			  $("#chargesSlaveId").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
			 
		}
	});
	return deptID;
}
function FetchDataOfLastWeek(){
	
	var flag=$("#currPage").html();
	var id="";
	var status="";
	if(flag==0){
		id="1";
		status="N";
	}
	if(flag==1){
		id="";
		status="Y";
	}
	$("#studTabD"+id).empty();
	
	var lastWeek = getLastWeek();
	var lastWeekMonth = lastWeek.getMonth() + 1;
	var lastWeekDay = lastWeek.getDate();
	var lastWeekYear = lastWeek.getFullYear();

	var lastWeekDate = (("00" + lastWeekDay.toString()).slice(-2)+ "/" + ("00" + lastWeekMonth.toString()).slice(-2) + "/" + ("0000" + lastWeekYear.toString()).slice(-4));
	
	var today = new Date();
    var todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    var month = todayDate.getMonth() + 1;
	var day = todayDate.getDate();
	var year = todayDate.getFullYear();
	
	var todaysDate = (("00" + day.toString()).slice(-2)+ "/" + ("00" + month.toString()).slice(-2) + "/" + ("0000" + year.toString()).slice(-4));
   
	var result = $("#risdata").html();
	var myArray = JSON.parse(result);
	var j=1;
	for ( var i = 0; i < myArray.testDashboard.length; i++) {
		
		var d1 = lastWeekDate.split("/");
		var d2 = todaysDate.split("/");
		var c = ((myArray.testDashboard[i].rgDt).split(" "))[0].split("/");
		//alert(c);
		var dat1 = c[0].split("-");
	    var finaldate=dat1[2]+"-"+dat1[1]+"-"+dat1[0] ;

		var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
		var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
		var check = new Date(dat1[2], parseInt(dat1[1])-1, dat1[0]);
		///alert(check);
		
		if (check >= from && check <= to && myArray.testDashboard[i].objTreat.tf==status+"") {
			if(j==1)
				$("#studTabD"+id).append("<div class='col-sm-12-1 scroller' style='margin-top:-21px; overflow-y: scroll;  height: 380px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf' style='width: 100%;'>"
		+ "<tbody id='todayPatient'>"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+ j++ +"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].objTreat.pi+"</td>"
		+ "<td class='col-sm-4-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].tit+" "+myArray.testDashboard[i].fn+" "+myArray.testDashboard[i].mn+" "+myArray.testDashboard[i].ln+"</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].sx+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].ag+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].objTreat.rt+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].objradiology.itStatus+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',"+myArray.testDashboard[i].objTreat.pi+","+myArray.testDashboard[i].objTreat.ti+")><i class='fa fa-check'></i></button>"
		+ "</td></tr></tbody></table></div>");
				
				else
					$("#todayPatient").append("<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+ j++ +"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].objTreat.pi+"</td>"
		+ "<td class='col-sm-4-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].tit+" "+myArray.testDashboard[i].fn+" "+myArray.testDashboard[i].mn+" "+myArray.testDashboard[i].ln+"</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].sx+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].ag+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].objTreat.rt+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+myArray.testDashboard[i].objradiology.itStatus+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button type='button' class='btn btn-xs btn-success' onclick = clickris('viewRis',"+myArray.testDashboard[i].objTreat.pi+","+myArray.testDashboard[i].objTreat.ti+")><i class='fa fa-check'></i></button>"
		+ "</td></tr>");
		}
	}

}
function getLastWeek(){
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return lastWeek ;
}


/***@author    :paras
 * @Date       :13-sep-2017
 * @code       : for getting charges of sponsor***/
function getchargesNS(serviceId) {
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	
		
	var	departmentId =  $("#deptid").val();
	
//	var categoryid = $("#subserviceid").val();
	var categoryid = serviceId;
	
	var treatId=$("#tr_Id").val();
	var toDate ="";
	//alert("toDateopd???"+toDate);
	
	if (toDate == "" || toDate == null || toDate == undefined
			) {
		toDate = "0";
	}
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined
			|| isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}

	if (categoryid == "" || categoryid == null || categoryid == undefined
			|| isNaN(categoryid)) {
		categoryid = 0;
	}
	
	var hallId = 0;
	var hallSlaveId = 0;
   if (departmentId == 2){
		
	   hallId = 2;
	}

	var inputs = [];

	inputs.push('serviceid=' + categoryid);
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('chargesSlaveId=' + chargesSlaveId);
	inputs.push('hallId=' + hallId);
	inputs.push('hallSlaveId=' + hallSlaveId);
	inputs.push('treatId=' + treatId);
	inputs.push('toDate=' + toDate);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getchargessponsor",

		success : function(r) {
			$("#chargesfromConfNS").val(r);
			console.log(r);

		}
	});
	
}


/************
* @author	: Akshata Desai
* @codeFor	: Get for ipd bill patients
 ************/
function getIpdPatientsForConcentForm(callform) {
//alert("hi..");
	var unit_id = $('#unitId').val();
	var inputs = [];
	 inputs.push('unit_id=' + unit_id); 
	 inputs.push('findText=' + 0);
     inputs.push('callFrom=' + callform);
     inputs.push('wardType=' + 0);
     inputs.push('wardName=' + 0);
	 
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "ehat/ipdPatients/autoSuggestationIpdPatients",
		timeout : 1000 * 60 * 15,
		cache	: false,
		success : function(r) {
			setIpdPatientsTempForConcentForm(r);
		}
	});
}

/************
* @author	: AKshata Desai
* @codeFor	: Set ipd queue template
 ************/
function setIpdPatientsTempForConcentForm(res){
	
	var count=1;
	var ipdqueueTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-condensed table-stripped cf'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-sm-1-1' style=''><label class='TextFont'>#</label></th>"
		+ "<th class='col-sm-2-1' style=''><label class='TextFont'>Mrn No</label></th>"

		+ "<th class='col-sm-2-1' style=''><label class='TextFont'>Patient Name</label></th>"
		+ "<th class='col-sm-1-1' style=''><label class='TextFont''>UHID</label></th>"
		+ "<th class='col-sm-1-1' style=''><label class='TextFont''>Mobile No</label></th>"

		+ "<th class='col-sm-1-1' style=''><label class='TextFont''>Age</label></th>"
		+ "<th class='col-sm-1-1' style=''><label class='TextFont''>Weight</label></th>"

		+ "<th class='col-sm-2-1' style=''><label class='TextFont''>Admission No</label></th>"
		+ "<th class='col-sm-2-1' style=''><label class='TextFont''>Admission Date/Time</label></th>"
/*		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission Ward</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Bed No</label></th>"*/
		+ "<th class='col-sm-2-1' style=''><label class='TextFont''>Action</label></th>"




		/*+ "<th class='col-md-2-1' style=''><label class='TextFont''>Print</label></th>"*/
		+ "</tr>"
		+ "</thead>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; overflow-y: scroll; height: 430px; max-height: auto;'>"
		+ "	<table class='table table-condensed table-stripped cf'>"
		+ "<tbody class='cf'>";
	
	for(var indx=0;indx<res.lstIpdbillPatientsBeds.length;indx++){
		
		var fullName=res.lstIpdbillPatientsBeds[indx].patient_name;
		var datetime= new Date(res.lstIpdbillPatientsBeds[indx].created_date_time).toLocaleString('en-GB');
		var centerPatientId = res.lstIpdbillPatientsBeds[indx].mrnno;
		ipdqueueTemp=ipdqueueTemp+"<tr>"
		+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"+count+"</td>"
		+ "	<td class='col-sm-2-1' id='mrnno"+count+"' style='height: 21.5px;'>"+res.lstIpdbillPatientsBeds[indx].mrnno+"</td>"

		+ "	<td class='col-sm-2-1' id='divPi"+count+"' style='height: 21.5px;'>"+fullName+"</td>"
		+ "	<td class='col-sm-1-1' id='divPi"+count+"' style='height: 21.5px;'>"+centerPatientId+"</td>"
		+ "	<td class='col-sm-1-1' id='divPi"+count+"' style='height: 21.5px;display:none;'>"+res.lstIpdbillPatientsBeds[indx].patient_id+"</td>"
		+ "	<td class='col-sm-1-1' id='divPi"+count+"' style='height: 21.5px;'>"+res.lstIpdbillPatientsBeds[indx].mobile+"</td>"

		
		+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"+res.lstIpdbillPatientsBeds[indx].age+"</td>"

		+ "	<td class='col-sm-1-1'  style='height: 21.5px;'>"+res.lstIpdbillPatientsBeds[indx].weight+"</td>"
		+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"+res.lstIpdbillPatientsBeds[indx].opdipdno+"</td>"

		+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"+datetime+"</td>"
		/*+ "	<td class='col-sm-1-1' style='height: 21.5px;'>--</td>"
		+ "	<td class='col-sm-1-1' style='height: 21.5px;'>--</td>"*/




		
		+ "<td class='center' style='width: 7%;'>"

		+ "<button onclick=viewConsentForm2("+res.lstIpdbillPatientsBeds[indx].treatment_id+","+res.lstIpdbillPatientsBeds[indx].department_id+") type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
		+ "</td>"
		/*+ "<td class='center' style='width: 7%;'>"
		+ "<button onclick=printIPDFormJsp("+res.lstIpdbillPatients[indx].pId+") class='btn btn-xs btn-success'><i class='fa fa-print'></i></button>"
		+ "</td>"*/
		
		
		
		 +"</tr>";		
		
		count=count+1;
	}
	ipdqueueTemp=ipdqueueTemp+"</tbody></table></div>";
	$("#containerforConsent").html(ipdqueueTemp);
}



function viewConsentForm1(treatmentId) {	

	window.location.href = "ipd_ConsentForm.jsp?" + "treatmentId="  + treatmentId /*+ "&bedallocated=" + bedAllocated
			+ "&ht=" + ht + "&pattype=" + pattype + "&pageIncludeType="
			+ pageIncludeType + "&type=" + type + "&callFor=" + callFor*/;

}

function viewConsentForm2(treatmentId,deptId) {	

	window.location.href = "ipd_ConsentForm.jsp?" + "treatmentId="  + treatmentId+"&deptId="+deptId /*+ "&bedallocated=" + bedAllocated
			+ "&ht=" + ht + "&pattype=" + pattype + "&pageIncludeType="
			+ pageIncludeType + "&type=" + type + "&callFor=" + callFor*/;

}


/************
* @author	: Sagar
* @date		: 1-July-2017
* @codeFor	: Get for ipd bill patients
 ************/
function autosuggesstionIpdBillPatients3(inputId,callfrom) {
//alert("hi..");
	var usertype = "";
	var letter="";
	if (callfrom ="search") {
		letter=$("#byName").val();
	}
	var findingName = $("#" + inputId).val();
	
	var inputs = [];	
	inputs.push('unit_id=' + 1);
    inputs.push('findText=' + findingName);
    inputs.push('callFrom=' + 2);
    inputs.push('wardType=' + 0);
    inputs.push('wardName=' + 0);
    
	/*inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('finalBill=' + "all");
	inputs.push('letter=' + letter);*/
	//var str = inputs.join('&');
	var str = inputs.join('&');
	jQuery.ajax({
		async	: true,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "ehat/ipdPatients/autoSuggestationIpdPatients",
		timeout : 1000 * 60 * 15,
		cache	: false,
		success : function(r) {

			if(letter=="" || letter==" " ){
				getIpdPatientsForConcentForm("ipd");
			}else{
				setIpdPatientsTempForConcentForm(r);
			}
			//getIpdBillPatients2("ipd");
			
			//autoCompTable2(r,id);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 15-Feb-2018
* @codeFor	: Fetch Bill Prefix
*************/
function getBillPrefix(callF,depId){
			
	var userId = parseInt($("#userId").val());	
	var unitId = parseInt($("#unitId").val());
		
	var inputs = [];	
	inputs.push("depId=" + depId);
	inputs.push("callFrom=" + callF);		
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/bill/getBillPrefix",
		error 	: function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			setBillPrefix(r);
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 15-Feb-2018
* @codeFor	: Fetch Bill Prefix
*************/
function setBillPrefix(r){
	
	var len = r.listEhatBillPrefix.length;		
	for(var n=0;n<len;n++){
		
		var lst = r.listEhatBillPrefix[n];
		if(lst.depId==0){
			
			// For Patient Id	  			
		  	$("#patPrefix").val(lst.billPrefix);
		  	$("#patMiddle").val(lst.billMiddle);
		  	$("#patSufix").val(lst.billSuffix); 	  	
		  	// For Patient Id
			
			// For bill Id		  
		  	if((lst.billRecBoth==1 || lst.billRecBoth==3)){
		  			
		  		$("#billPrefix").val(lst.billPrefix);
		  		$("#billMiddle").val(lst.billMiddle);
		  		$("#billSufix").val(lst.billSuffix);  						  			
		  	}
		  	// For bill Id
		  	
		  	// For Rec Id		  
		  	if((lst.billRecBoth==2 || lst.billRecBoth==3)){
		  			
		  		$("#recPrefix").val(lst.billPrefix);
		  		$("#recMiddle").val(lst.billMiddle);
		  		$("#recSufix").val(lst.billSuffix);  						  			
		  	}
		  	// For Rec Id
		}
		
	  	// For Patient Id	  	
	  	if(lst.depId==4){
	  			
	  		$("#patPrefix").val(lst.billPrefix);
	  		$("#patMiddle").val(lst.billMiddle);
	  		$("#patSufix").val(lst.billSuffix);  		
	  	}
	  	// For Patient Id
	  		
	  	// For bill Id	  	
	  	if((lst.billRecBoth==1 || lst.billRecBoth==3)){
	  			
	  		$("#billPrefix").val(lst.billPrefix);
	  		$("#billMiddle").val(lst.billMiddle);
	  		$("#billSufix").val(lst.billSuffix);  						  			
	  	}
	  	// For bill Id
	  	
	  	// For Rec Id	  
	  	if((lst.billRecBoth==2 || lst.billRecBoth==3)){
	  			
	  		$("#recPrefix").val(lst.billPrefix);
	  		$("#recMiddle").val(lst.billMiddle);
	  		$("#recSufix").val(lst.billSuffix);  						  			
	  	}
	  	// For Rec Id
	}		
}

/*
 * @author :  Sanjay Kumar Shah
 * @date   :  03-04-2018
 * @purpose:  print for with header and footer
 */
function ShowPopUpPrintForConsent(callfrom) {
	    var idipdConsentForm = $("#idipdConsentForm").val();
		var patientId = $.trim($('#patientId').html());
		var treatmentId = $.trim($('#treatmentId').html());
		
			setTimeout(function() {
				window.open(("ehat_ipdConsentFormPrint.jsp?" +"&patientId="+patientId+"&treatmentId="+treatmentId+"&idipdConsentForm="+idipdConsentForm+"&callfrom="+callfrom));
			}, 300);
}


//Tarique Aalam
function setBoxIpdServise() {


			if ($("#emrChrFlag").is(":checked")) {

				$('#emrPer').css("display","inline");
				getEmergancyCharges();
				calculateEmerChrForIpdServices();
			} else {
				$('#emrPer').css("display","none");
				$('#emrPer').val(0);
				calculateEmerChrForIpdServices();
			}
		}



//Tarique Aalam
function calculateEmerChrForIpdServices()
{
			var emrgancyper=parseFloat($('#emrPer').val());
			if (emrgancyper > 100) {
				alert("Percentage should be less than 100");
				$("#emrPer").val(0);
				return false;
			}
			var rate=0;
			//rate =parseFloat($("#txtcategorycharges2").val());
			rate =parseFloat($("#txtcategorycharges").val());
			var emp=parseFloat(rate*emrgancyper/100);
			//amount = parseFloat(emp + amount);
			rate = parseFloat(emp + rate);
			$("#txtcategorycharges").val(rate);
}

function Saveipdhistorytemp(){
	var customizeTemplateName= $("#selCustomizeTemp").val();
	var cn= $("#customizeTemplateName").val();
	if( customizeTemplateName=="0"){
		if(cn=="" ||cn==null ||cn==undefined){
			
			alert("Please Select Template Name");
			return false;
		}
		
	}
	var listIpdHisCompObj = {
			ltITemplateIPDHistoryslave : []
		};

	var userName = $("#docName").html();
	
	pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	  count = 1;
//	var tretID = pobj1.trid;
	var tretID = $("#tid").val(); //added by paras 
	var count = 0;
	var rowCount = $("#HisRowCount").val();
	for ( var i = 1; i <= rowCount; i++) {
		count++;
		var chkval = $('#checkbox' + i).attr('checked') ? 1 : 0;

			var chfdur = $("#chiefComp" + count + "").val();
			if (chfdur == "") {
				alert("Chief Complaints must be filled out");
				return false;
			}
			
			var idAdddHisComp = $("#idIPDComp" + count + "").val();
			var DurationValue = $("#qty"+ count + "").val();
			
			if (DurationValue == "") {
				alert("Please select Duration Quantity..");
				return false;
			}
			var day_month_year = $("#day_month_year" + count + "").val();
			
			if (day_month_year == "") {
				alert("Please select Duration..");
				return false;
			}
			var idIPDCompslave= $("#idIPDCompslave"+ count + "").val();
					
		if (chfdur != undefined) {
			listIpdHisCompObj.ltITemplateIPDHistoryslave.push({
				 "id_ipdhistoryslave":idIPDCompslave,
				"chfdur" : chfdur,
				"idAdddHisComp" : idAdddHisComp,
				"duration" :DurationValue,
				"days_month_year" :day_month_year,
				  "statuscf":"Y"
			});
		}
	}




	
	var dm = $("#chkDm").is(":checked") ? 1:0;
	dm = dm + "-"+ $("#txtDm").val();
	var htn = $("#chkHtn").is(":checked") ? 1:0 ;
	htn =  htn +"-"+ $("#txtHtn").val();
	
	var ihd = $("#chkIhd").is(":checked") ? 1:0 ;
	ihd = ihd +"-"+ $("#txtIhd").val();
	var baco = $("#chkBaco").is(":checked") ? 1:0 ;
	baco = baco +"-"+ $("#txtBaco").val();
	var othr = $("#chkOther").is(":checked") ? 1:0;
	othr = othr +"-"+ $("#txtOther").val();
	listIpdHisCompObj.ltITemplateIPDHistoryslave.push({
        "id_ipdhistoryslave":$("#id_ipdhistoryslave").val(),
		"past_surgical_his" : $("#pastSurgHistory").val(),
		"medications" : $("#medications").val(),
		"Past_Reguler" :$("#pastReguler").val(),
		"Present_reguler" :$("#PresentReguler").val(),
        "gynac":$("#gynac").val(),
        "drugReactions" :$("#drugReaction").val(),
        "familyHistory":$("#familyHis").val(),
        "personalHistory":$("#perHistory").val(),
        "habbits":$("#habbits").val(),
        "bowel":$("#bowel").val(),
        "blader":$("#blader").val(),
        "temp":$("#temparature").val(),
        "pallor":$("#pallor").val(),
        "lcterus":$("#lcterus").val(),
        "pulse" :$("#pulse").val(),
        "clubbing":$("#clubbing").val(),
        "oedema" :$("#oedema").val(),
        "bp":$("#bp").val(),
        "lymph":   $("#lymph").val(),
         "rs":$("#rs").val()   ,
       "cns" :$("#cns").val(),
       "cvs":$("#cvs").val(),
       "pa":$("#pa").val(),
       "local_Exma":$("#localExm").val(),
       "investigation":$("#invsRep").val(),
       "provisional":$("#provDia").val(),
       "treatment":$("#treatPlan").val(),
       "chiefComplaintsTemp":$("#chiefComplaintsTxt").val(),
       "clinicalFinding":$("#clinicalFinding").val(),
       "name":$("#name").val(),
       "dm":dm,
       "htn":htn,
       "ihd":ihd,
       "bacopd":baco,
       "other":othr,
       "statuscf":"N"

        
	});
	var listIpdHisObj = {
			ltiTemplateIPDHistory : []
		};
	
	listIpdHisObj.ltiTemplateIPDHistory.push({
        "id_ipdhistorymaster":$("#id_ipdhistorymaster").val(),
		"templatename" : $("#customizeTemplateName").val(),
		
       

        
	});
	listIpdHisCompObj = JSON.stringify(listIpdHisCompObj);
	listIpdHisObj = JSON.stringify(listIpdHisObj);

	var inputs = [];


	inputs.push('listIpdHisCompObj=' + listIpdHisCompObj);
	inputs.push('listIpdHisObj=' +listIpdHisObj);
	


	var str = inputs.join('&');
	
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/Saveipdhistorytemp",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert("Save Sucessfully");
			window.location = "IpdTemplateHistory.jsp";
		}
	});

}
var Count = 1;

var fetchIPDHisCompipd ='{#foreach $T.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave as listIpdHisCompo}'
+'{#if $T.listIpdHisCompo.statuscf== "Y"}'+
'<tr id="divH{count}">'+
'<td align="center" style="width: 8.35%; font: bold; height: 21.5px; ">{count}.</td>'+
'<td style="width: 33.96%; height: 21.5px;">'+
'<textarea rows ="1" cols ="38" class="" id="chiefComp{count}" value="{$T.listIpdHisCompo.chfdur}">{$T.listIpdHisCompo.chfdur}</textarea></td>'+
'<td style="width: 50.96%; height: 21.5px;">'+
'<input style="width:60%;" type="range" min="0" max="100" class="defaultSlider" id="defaultSlider_{count}" name="duration{count}" id="duration{count}" value="{$T.listIpdHisCompo.duration}" />'+
'<p class="note"><span class="duration_{count}"></span>'+
'<input type = "text" class="col-sm-1-1" style="margin-left:63%; margin-top:-4.6%; font-weight:bold;" name="qty{count}'+
'"id="qty{count}" value = "{$T.listIpdHisCompo.duration}" onkeyup="changeSlider({count})" />'+
'<select class="col-sm-3-1" style="margin-left:3%; margin-top:-4.6%;" id="day_month_year{count}" name="day_month_year{count}">'+
'<option value="{$T.listIpdHisCompo.days_month_year}">{$T.listIpdHisCompo.days_month_year}</option><option value="Select">-Select-</option><option value="Days">Days</option>'+
'<option value="Month">Month</option><option value="Year">Year</option></select>'+
'</p></td>'+
'<td style=" height: 21.5px;">'+
'<input type="checkbox" name="chiefCompcheckbox" id="chiefCompcheckbox{count}"/>'+
'<input id="idIPDComp{count}" name="idIPDComp{count++}" type="hidden" value="{$T.listIpdHisCompo.idAdddHisComp}"/></td>'+
'<input id="idIPDCompslave{count}" name="idIPDCompslave{count++}" type="hidden" value="{$T.listIpdHisCompo.id_ipdhistoryslave}"/></td>'+

'{#/if}'+
'{#/for}'+
'</tr>'+
'<input type="hidden" value="{count}" id="addRowCount" name="addRowCount"/>';
function fetchTemplateIPDHistory(val){
	var customizeTemplateName= $("#selCustomizeTemp").val();
	if(customizeTemplateName==null || customizeTemplateName==undefined || customizeTemplateName=="-" ||customizeTemplateName==0 || customizeTemplateName=="0"){
		
		if(val=="Dr"){
		return false;
		}else{
		
			window.location = "IpdTemplateHistory.jsp";
		}
		}
	var inputs = [];
	
	 inputs.push("value="+ customizeTemplateName);	
	 inputs.push("callform="+ "Onchange");	
	 var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/fetchTemplateIPDHistory",
		error : function() {
			alert('error');
		},
		success : function(r) {
			 ajaxResponse = r;
  			 
  			 $("#historyDetails").html(ajaxResponse);
 		//	pobj = eval('(' + ajaxResponse + ')'); 
  			var countobj=0;
 			if(ajaxResponse.ltiTemplateIPDHistory.length > 0)
 				{
 				
 				  if(val!="Dr"){
 					 $("#id_ipdhistorymaster").val(ajaxResponse.ltiTemplateIPDHistory[0].id_ipdhistorymaster);
 	 				 $("#customizeTemplateName").val(ajaxResponse.ltiTemplateIPDHistory[0].templatename)  
 				  }
 			       for(  var cnt=0;cnt<ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave.length;cnt++){
 			        		if(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].statuscf=="N"){
 			 				
 			 				  if(val!="Dr"){
 	 		 				$("#id_ipdhistoryslave").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].id_ipdhistoryslave);
 			 				  }
 			 				$("#chiefComplaintsTxt").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].chiefComplaintsTemp);
 							$("#clinicalFinding").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].clinicalFinding);
 	 			 			$("#pastSurgHistory").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].pastSur);
 	 			 			$("#medications").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].medic);
 	 			 			$("#pastReguler").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].pastReg);
 	 			 			$("#PresentReguler").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].preReg);
 	 			 			$("#gynac").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].gynac);
 	 			 			$("#drugReaction").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].DrgRea);
 	 			 			$("#familyHis").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].famHis);
 	 			 			$("#perHistory").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].perHis);
 	 			 			$("#habbits").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].hab);
 	 			 			$("#bowel").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].bowel);
 	 			 			$("#blader").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].blader);
 	 			 			$("#temparature").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].temp);
 	 			 			$("#pallor").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].pallor);
 	 			 			$("#lcterus").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].lcterus);
 	 			 			$("#pulse").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].pulse);
 	 			 			$("#clubbing").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].clubbing);
 	 			 			$("#oedema").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].oedema);
 	 			 			$("#bp").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].bp);
 	 			 			$("#lymph").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].lymph);
 	 			 			$("#rs").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].rs);
 	 			 			$("#cns").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].cns);
 	 			 			$("#cvs").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].cvs);
 	 			 			$("#pa").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].pa);
 	 			 			$("#localExm").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].locE);
 	 			 			
 	 			 			$("#invsRep").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].invtg);
 	 			 			$("#provDia").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].prov);
 	 			 			$("#treatPlan").val(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].tt);
 	 			 
 	 			 			var htn = (ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].htn).split("-");
 	 			 			(htn[0] > 0) ? $("#chkHtn").attr('checked', true) :  $("#chkHtn").attr('checked', false);
 	 			 			$("#txtHtn").val(htn[1]);
 	 			 
 	 			 			var dm = (ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].dm).split("-");
 	 			 			(dm[0] > 0) ? $("#chkDm").attr('checked', true) :  $("#chkDm").attr('checked', false);
 	 			 			$("#txtDm").val(dm[1]);
 	 			 
 	 			 			var ihd = (ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].ihd).split("-");
 	 			 			(ihd[0] > 0) ? $("#chkIhd").attr('checked', true) :  $("#chkIhd").attr('checked', false);
 	 			 			$("#txtIhd").val(ihd[1]);
 	 			 
 	 			 			var bacopd = (ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].bacopd).split("-");
 	 			 			(bacopd[0] > 0) ? $("#chkBaco").attr('checked', true) :  $("#chkBaco").attr('checked', false);
 	 			 			$("#txtBaco").val(bacopd[1]);
 	 			 
 	 			 			var otr = (ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].otr).split("-");
 	 			 			(otr[0] > 0) ? $("#chkOther").attr('checked', true) :  $("#chkOther").attr('checked', false);
 	 			 			$("#txtOther").val(otr[1]);

 						}else{
 							countobj ++;
 							$("#HisRowCount").val(countobj);
 						} }
 
 	 				if(val!="Dr"){
 	 					var html="";
 	 					var count=1;
 	 			       for(  var cnt=0;cnt<ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave.length;cnt++){
			        		if(ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].statuscf== "Y"){
			        			html=html+'<tr id="divH'+ count +'">'+
			        			'<td align="center" style="width: 8.35%; font: bold; height: 21.5px; ">'+ count +'.</td>'+
			        			'<td style="width: 33.96%; height: 21.5px;">'+
			        			'<textarea rows ="1" cols ="38" class="" id="chiefComp'+ count +'" value="'+ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].chfdur +'">'+ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].chfdur +'</textarea></td>'+
			        			'<td style="width: 50.96%; height: 21.5px;">'+
			        			'<input style="width:60%;" type="range" min="0" max="100" class="defaultSlider" id="defaultSlider_'+ count +'" name="duration'+ count +'" id="duration'+ count +'" value="'+ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].duration+'" />'+
			        			'<p class="note"><span class="duration_'+ count +'"></span>'+
			        			'<input type = "text" class="col-sm-1-1" style="margin-left:63%; margin-top:-4.6%; font-weight:bold;" name="qty'+ count +''+
			        			'"id="qty'+ count +'" value = "'+ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].duration+'" onkeyup="changeSlider('+ count +')" />'+
			        			'<select class="col-sm-3-1" style="margin-left:3%; margin-top:-4.6%;" id="day_month_year'+ count +'" name="day_month_year'+ count +'">'+
			        			'<option value="'+ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].days_month_year+'">'+ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].days_month_year+'</option><option value="Select">-Select-</option><option value="Days">Days</option>'+
			        			'<option value="Month">Month</option><option value="Year">Year</option></select>'+
			        			'</p></td>'+
			        			'<td style=" height: 21.5px;">'+
			        			'<input type="checkbox" name="chiefCompcheckbox" id="chiefCompcheckbox'+ count +'"/>'+
			        			'<input id="idIPDComp'+ count +'" name="idIPDComp'+ (count)+'" type="hidden" value="'+ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].idAdddHisComp+'"/></td>'+
			        			'<input id="idIPDCompslave'+ count +'" name="idIPDCompslave'+ (count)+'" type="hidden" value="'+ajaxResponse.ltiTemplateIPDHistory[0].ltITemplateIPDHistoryslave[cnt].id_ipdhistoryslave+'"/></td>'+

			        			'{#/if}'+
			        			'{#/for}'+
			        			'</tr>'+
			        			'<input type="hidden" value="'+ count +'" id="addRowCount" name="addRowCount"/>';
			        			count++;
			        		}
			        		
 	 			       }
 	 			     $("#historyDiv").html(html);
 	 				/*$("#historyDiv").setTemplate(fetchIPDHisCompipd);
 				    $("#historyDiv").processTemplate(ajaxResponse);*/
 				    }
			
 				}
		}
	});
	
}

function fetchtemplatename(value){
	var selectRouteSelectBox = "<option value='Dr'>NewTemplate</option>";
	var inputs = [];
	var ajaxresponce;
	 inputs.push("customizeTemplateName="+ value);	 
	 var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/fetchtemplatename",
		error : function() {
			alert('error');
		},
		success : function(o) {
			Object.keys(o).forEach(function(key) {
				
				var keyvalu=key;
				var values=o[key];
			   if(keyvalu!=undefined && values!= undefined ){
				 selectRouteSelectBox = selectRouteSelectBox + "<option value='"+ keyvalu+"'>"+ values +"</option>";
			   }
			});
		$("#selCustomizeTemp").html(selectRouteSelectBox);	
	/*	alert(Object.keys(o).length);
		if(Object.keys(o).length  >0){
			var  values=Object.keys(o).length ;
			for( var idx = 0; i <=  values; idx++) {
				   
				 var key = Object.keys(o)[idx];
				  value = o[key];
			    alert("keyy==" +  key + "== value" + value);
				}
		}*/
			
		}
	});
	
}

function getchargesDRNST(hallid) {
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	
		
	var	departmentId =  $("#depdocdeskid").val();
	
	var categoryid = $("#idservnur").val();
	var treatId=$("#tr_Id").val();
	var toDate ="";
	//alert("toDateopd???"+toDate);
	
	if (toDate == "" || toDate == null || toDate == undefined
			) {
		toDate = "0";
	}
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined
			|| isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}

	if (categoryid == "" || categoryid == null || categoryid == undefined
			|| isNaN(categoryid)) {
		categoryid = 0;
	}
	
    var hallId=2;
	var hallSlaveId = 0;
   if (departmentId == 2){
		
	   hallId =hallid;
	}

	var inputs = [];

	inputs.push('serviceid=' + categoryid);
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('chargesSlaveId=' + chargesSlaveId);
	inputs.push('hallId=' + hallId);
	inputs.push('hallSlaveId=' + hallSlaveId);
	inputs.push('treatId=' + treatId);
	inputs.push('toDate=' + toDate);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getchargessponsor",

		success : function(r) {
			$("#chargesfromConfNS").val(r);
			console.log(r);

		}
	});	
}
//Added by Akshata
function hideShowPreOPDBillOT(count) {

	var hideShowStatus = $("#hideShowStatus123" + count).val();

	if (hideShowStatus == 0) {

		$("#imgupdown" + count).attr('src', "images/up.png");
		$("#patPreOPDBill123" + count).show();
		$("#hideShowStatus123" + count).val(1);
		closeTreatmentDetailsOfPatientOT(count);

	} 
}
//Added by Akshata
function  closeTreatmentDetailsOfPatientOT(patientId ) {
	
	 var ajaxr="";
		jQuery.ajax({
			async 	: true,
			type : "POST",
			
			url  : "ehat/billNoble/getPrevPatdetails",
			data : {
	   "patientId" : patientId,
	   "deptId" : 2,
			},
	     timeout : 1000 * 60 * 5,
		   cache : true,
		   error : function() {
				    alert('error');
			},
		 success : function(response) {
			  console.log(response);
			  ajaxr = response;
			  setTempForInnerLoopOt(response);
		     		
				 	 
			}
		});
	return ajaxr;
}
//Added by Akshata

function setTempForInnerLoopOt(r1){
	 //alert("hi");
	 var htm=" class='table table-bordered table-striped header-fixed cf 'style='width: 40%; margin-top: 0px; float: right; display: table;'>";
	 + "<td style='height: 21.5px;' class='col-md-2 center' class=''>treatment Id</td>"
	+ "<td style='height: 21.5px;' class='col-md-2 ' class=''>Admission  No</td>"
	 + "<td style='height: 21.5px;' class='col-md-5 ' class=''>Date</td>"
	 + "<td style='height: 21.5px;' class='col-md-2 ' class=''>BIll No</td>"
	 + "<i class='fa fa-eye View'></i></button></td>> </tr>";
	 
	 for ( var j = 0; j < r1.listTreatment.length;j++) {
			var datetime= new Date(r1.listTreatment[j].createdDateTime).toLocaleDateString('en-GB');

		 htm=htm+ "<tr id='div123"+ r1.listTreatment[j].patientId+"' class='table table-bordered table-striped header-fixed cf 'style='width: 40%; margin-top: 0px; float: right; display: table;'>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-2 center' class=''>"+ r1.listTreatment[j].invoiceCount+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-2 ' class=''>"+ r1.listTreatment[j].opdipdno+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-5 ' class=''>"+ datetime+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-2 ' class=''>"+ r1.listTreatment[j].treatmentId+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-1 '>";
		 htm=htm+ "<button style='height: 21.5px;' class='btn btn-xs btn-success' onClick='goToPrevConsentForm("+ r1.listTreatment[j].treatmentId+","+ r1.listTreatment[j].patientId+")'>";
		 htm=htm+ "<i class='fa fa-eye View'></i></button></td>";
		 htm=htm	+ "<input type='hidden' value='"+ r1.listTreatment[j].patientId+"' id='rowCount' /></tr>";
		 
		
		 $("#patPreOPDBill123" + r1.listTreatment[j].patientId).html(htm);
		 $("#td123" + r1.listTreatment[j].patientId).show();
		 $("#xyz" + r1.listTreatment[j].patientId).html(htm);
		}
	
	 
}

//Added by Akshata
/*function PrintPreviousForConsent(callfrom) {
    var idipdConsentForm = $("#idipdConsentForm").val();
	var patientId = $('#pid').val();
	
	var treatmentId = $("#treatId").val();	
	
		setTimeout(function() {
			window.open(("ehat_ipdConsentFormPrint.jsp?" +"&patientId="+patientId+"&treatmentId="+treatmentId+"&idipdConsentForm="+idipdConsentForm+"&callfrom="+callfrom));
		}, 300);
}*/

function PrintPreviousForConsent(callfrom) {
    var idipdConsentForm = $("#idipdConsentForm").val();
	var patientId = $('#pid').val();
	
	var treatmentId = $("#treatId").val();	
	
		setTimeout(function() {
			window.open(("ehat_ipdConsentFormPrint.jsp?" +"&patientId="+patientId+"&treatmentId="+treatmentId+"&idipdConsentForm="+idipdConsentForm+"&callfrom="+callfrom));
		}, 300);
}

//added by vishant pawar  @reason: get all record for consent form
function getAllRecordForCosentForm(callform){
	
	var unit_id = $('#unitId').val();
	var inputs = [];
	 inputs.push('unit_id=' + unit_id); 
	 inputs.push('findText=' + 0);
     inputs.push('callFrom=' + callform);
     inputs.push('deptId=' + 0);
	 
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "ehat/ipdPatients/getAllRecordForCosentForm",
		timeout : 1000 * 60 * 15,
		cache	: false,
		success : function(r) {
			setIpdPatientsTempForConcentForm(r);
		}
	});
	
}

/************
* @author	: Sagar
* @date		: 1-July-2017
* @codeFor	: Get for ipd bill patients
 ************/
function searchRecordForConsentForm(inputId,callfrom) {
//alert("hi..");
	var usertype = "";
	var letter="";
	if (callfrom ="search") {
		letter=$("#byName").val();
	}
	var findingName = $("#" + inputId).val();
	
	var deptName = $('input[name="typeOfpatCheckConsentForm"]:checked').val();
	
	var inputs = [];	
	inputs.push('unit_id=' + 1);
    inputs.push('findText=' + findingName);
    inputs.push('callFrom=' + deptName);
    inputs.push('deptId=' + 0);
    
	/*inputs.push('findingName=' + findingName);
	inputs.push('usertype=' + usertype);
	inputs.push('finalBill=' + "all");
	inputs.push('letter=' + letter);*/
	//var str = inputs.join('&');
	var str = inputs.join('&');
	jQuery.ajax({
		async	: true,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "ehat/ipdPatients/getAllRecordForCosentForm",
		timeout : 1000 * 60 * 15,
		cache	: false,
		success : function(r) {

			if(letter=="" || letter==" " ){
				getAllRecordForCosentForm("all");
			}else{
				setIpdPatientsTempForConcentForm(r);
			}
			//getIpdBillPatients2("ipd");
			
			//autoCompTable2(r,id);
		}
	});
}

function checkedRadioButtonConsentForm() {
	  $("#chkTotalConsentForm").prop("checked", true);
}


/*function setProductAutoComplete(key,currentVal) {
	$('#hiddenCurrentRow').val(currentVal);
	
	if (key != null) {
		var keycode = (key.which) ? key.which : key.keyCode;
		if (keycode == 9) {
			$('#txtQty').focus();
			return false;
		}
	}

	var findingName = $("#textProductName"+currentVal).val();
	var inputs = [];
	inputs.push('letter=' + findingName);
	var str = inputs.join('&');
	jQuery.ajax({

		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./pharmacy/product/autoSuggestionProduct",
		timeout : 1000 * 60 * 15,

		error : function(error) {
		},
		success : function(r) {
			var availableTags = [];
			var resultData = [];

			if (r.length > 0) {
				for ( var i = 0; i < r.length; i++) {
					availableTags[i] = r[i].productName + '_'
							+ r[i].productId;
				}
			}

			var template = "";
			for ( var j = 0; j < availableTags.length; j++) {
				var arrValue = (availableTags[j]).split("_");
				var idValue = (arrValue[1]);
				resultData.push({
					ID : idValue+'_'+currentVal,
					Name : arrValue[0]
				});

				template = template + '<li data-value="' + (arrValue[1])
						+ '" class=""><a href="#">' + arrValue[0]
						+ '</a></li>';

			}
			$(".typehead1").html(template);
			$(".typehead1").show();

			setTimeout(function() {
				$("#textProductName"+currentVal).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : getTotalStockWithoutExpiry,
					scrollBar : true

				});
				$("#textProductName"+currentVal).data('typeahead').source = resultData;
			}, 500);
		}
	});
}


function getTotalStockWithoutExpiry(item) {
	
	var hiddenRowC=$('#hiddenCurrentRow').val();
	var content = item.value.split("_");
	var text = item.text;
	var value = item.value;
	var rowCount= content[1];
	var id= content[0];
	
	$('#hiddenProductId'+rowCount).val(id);
	
	var inputs = [];
	inputs.push('productID=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./pharmacy/purchase/getTotalStockWithoutExpiry",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$('#totalQty').val(r);
			$('#texttotalQty'+hiddenRowC).val(r);
		}
	});
	//createRow();
}*/


/************
* @author	: Vishant Pawar
* @date		: 14-Dec-2023
* @codeFor	: Print Prev Indent
*************/
function printAllPreviousIndentDataById(indentId){
	
	
	var treatId = $("#tr_Id").val();
	var patId = $("#pt_Id").val();
	var unitId = 1;//$("unitId").val();
  
	var deptId=1;
  
	// var pendFlag="N"; 
	// var recId=0;
		
    
    window.open("prev_indent_print.jsp?indentId="+indentId+"&treatId="+treatId+"&patId="+patId+"&unitId"+unitId);
	

	
	
}
/************
* @author	: Vishant Pawar
* @date		: 14-Dec-2023
* @codeFor	: Edit Prev Indent
*************/

function editAllPreviousIndentDataById(value){
	
	
	var indentId = value;
	$('#editIndentPopUp').modal('show');
//	$('#editIndentPopUp').show();

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "./pharmacy/indentSale/getIndentDataById",
		data : {
			indentId : indentId
		},
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			//getIndentSaleDetailsById(indentId);
			setAllPreviousIndentDataById2(r);

		}
	});
	
}

/************
* @author	: Vishant Pawar
* @date		: 14-Dec-2023
* @codeFor	: set Prev Indent
*************/
function setAllPreviousIndentDataById2(value) {
	
	$("#editdivIndentNo").html(value.indentId);
	$("#editdivIndentDate").html(getDate(value.indentDate));
	$("#editdivIndentGenerateFrom").html(value.indentReceivedFrom);

	var divContent = "";
	var rowCount=1;
	for ( var i = 0; i < value.ltIndentSlave.length; i++) {
		
		getTotalStockWithoutExpiryIndentEdit(value.ltIndentSlave[i].indentProductId,rowCount);
		
		var productName1 = getProductNameByProductId(
				value.ltIndentSlave[i].indentProductId, i);
		divContent = divContent + "<tr><td class='center'>" + (i + 1)
				+ "</td><td class='center' id='productName" + i + "'>"
				+ productName1 + "</td>"
				//+ "<td class='center'>"+ value.ltIndentSlave[i].indentSlaveRequireQty + "</td>"
				+ "<td><input type='text' class='form-control input-SmallText'  id='productRequireQty"
				+ rowCount
				+ "' value='"
				+ value.ltIndentSlave[i].indentSlaveRequireQty
				+ "'></td>"
				
				+ "<td><input type='text' class='form-control input-SmallText'  id='totalQty"
				+ rowCount
				+ "' value='"
				+ $("#totalQTY" + rowCount).val()
				+ "' disabled='disabled'></td><tr><input type='hidden' id='indentSlaveId"+rowCount
				+ "' value='"
				+  value.ltIndentSlave[i].indentSlaveId
				+ "'>";
				
				//+ "<td class='center'>"
				//+ totalQTY + "</td></tr>";
				rowCount++
		}
	$("#indentRowCount").val(value.ltIndentSlave.length);
	$("#editpreIndentDataById").html(divContent);

}


/************
* @author	: Vishant Pawar
* @date		: 14-Dec-2023
* @codeFor	: get total stock without expiry
*************/
function getTotalStockWithoutExpiryIndentEdit(productId,rowCount) {
	
	//var hiddenRowC=$('#hiddenCurrentRow').val();
//	var content = item.value.split("_");
//	var text = item.text;
//	var value = item.value;
//	var rowCount= content[1];
//	var id= content[0];
	
	//$('#hiddenProductId'+rowCount).val(productId);
	
	var inputs = [];
	inputs.push('productID=' + productId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./pharmacy/purchase/getTotalStockWithoutExpiry",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
		if(r!="" || r!==null){
			
			//return r;
			$('#totalQTY'+rowCount).val(r);
			$('#totalQty'+rowCount).val(r);
			}
		else{
			
			$('#totalQTY'+rowCount).val("0");
			$('#totalQty'+rowCount).val("0");
			//$('#texttotalQty'+hiddenRowC).val("0");
		}
		}
	});
	//createRow();
}

/************
* @author	: Vishant Pawar
* @date		: 14-Dec-2023
* @codeFor	: Save Prev Indent
*************/
function saveIndentSlave(){
	
	var tableLength = $("#indentRowCount").val();//$("#editpreIndentTable tbody").length;
	
	var indentId = $("#editdivIndentNo").html();
	
	var indentMaster={
		
	   indentId:indentId,
	   ltIndentSlave:[]
	}
	for(var i=1;i<=tableLength;i++){
		
		
		var indentSlaveId = $("#indentSlaveId"+i).val();
		var productRequireQty = $("#productRequireQty"+i).val();
		
		
		var indentSlave ={
			indentSlaveId:indentSlaveId,
			indentSlaveRequireQty:productRequireQty
			
		};
		indentMaster.ltIndentSlave.push(indentSlave);
		//alert(indentSlave);
		
	}
	
	
	//var inputs = [];
	//inputs.push('indentData=' + productId);
	//var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		//data : indentMaster,
		//dataType	: 'json',
        data		: JSON.stringify(indentMaster),
        contentType	: 'application/json',
		//contentType: 'application/json',
		url : "./pharmacy/indentSale/editPreIndentByIndentId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			
			alertify.success("Indent Edited Successfully")
			$('#editIndentPopUp').modal('hide');
		}
	});
	
	
}
