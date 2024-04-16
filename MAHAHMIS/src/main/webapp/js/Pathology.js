//pathology.js
var count = 1;
var ajaxResponse;
var sample = "";
var divCount = 1;
var sr = 1;
var pkgCnt = new Array();
// variable for new individual
var rowCountindi = 1;
var individualtest = 0;
var isNew = 0;
var unitindi;
var smplColFlag = "";
var smplAccptFlag = "";

var featchPrevLabTestOfPatTemp = '{#foreach $T.proLi[3] as lbpkgli}'
		+ '<div style="width: 100%; margin-top: 15px;"	id="pkgAssignDiv{$T.lbpkgli.idlbpkg}-{pkgcount}">'
		+ '<div class="col-sm-12-1" style="border-bottom: 1px solid #b8b8b8; padding-bottom: 5px;padding-top: 20px;" id="pkgIdDiv{$T.lbpkgli.idlbpkg}">'
		+ '<div	class="col-sm-1-1" style="text-align: center; padding-top: 5px;">'
		+ '<input type="checkbox" value="{$T.lbpkgli.idlbpkg}" id="Assignpkgcheck" checked="checked" onclick=sendPkgToRemove("{$T.lbpkgli.idlbpkg}-{pkgcount}") />'
		+ '</div>'
		+ '<div	class="col-sm-8-1" style="padding-left: 1%; padding-top: 5px; text-align: left;" id="PkgCodNm{$T.lbpkgli.idlbpkg}">{$T.lbpkgli.pkgcod} -	{$T.lbpkgli.pkgnm}'
		+ '</div>'
		+ '<div	class="col-sm-2-1" style="padding-left: 1%; padding-top: 5px; text-align: left;" id="AssPkgCodCharge{$T.lbpkgli.idlbpkg}">{$T.lbpkgli.pkgchrg}'
		+ '</div></div>'
		+ '{#param name=xp value=1}{#foreach $T.lbpkgli.lbproli as lbproli}'
		+ '<div style="width: 94%;margin-top: 8px; float: right;" id="pkgproDiv{$T.lbproli.proId}">'
		+ '<div	class="col-sm-12-1" style="border-bottom: 1px solid #b8b8b8; border-left: 1px solid #b8b8b8;border-top: 1px solid #b8b8b8; padding-bottom: 5px;" id="pkgproIdDiv{$T.lbproli.proId}">'
		+ '<div class="divide-10"></div>'
		+ '<div	class="col-sm-1-1" style="text-align: center; padding-top: 5px;">'
		+ '<input type="checkbox" value="{$T.lbproli.proId}" checked="checked" id="pkgAssignprocheck{$T.lbpkgli.idlbpkg}" />'
		+ '</div>'
		+ '<div class="col-sm-10-1" style="padding-left: 1%; padding-top: 5px; text-align: left;" id="pkgProCodNm-{$T.lbpkgli.idlbpkg}-{$T.lbproli.proId}">{$T.lbproli.proCode} - {$T.lbproli.proNm}'
		+ '</div>'
		+ '<input type="hidden"	id="pkgProCodCharge-{$T.lbpkgli.idlbpkg}-{$T.lbproli.proId}" value="{$T.lbproli.proChr}" />'
		+ '</div>'
		+ '{#param name=x value=1} {#foreach $T.lbproli.testli as testli}'
		+ '<div	class="col-sm-12-1" style="width: 92%; margin-top: 0px; border-bottom: 1px solid #b8b8b8; border-left: 1px solid #b8b8b8; padding-bottom: 5px; float: right;" id="pkgproTestDiv-{$T.lbpkgli.idlbpkg}-{$T.lbproli.proId}-{$T.testli.tid}">'
		+ '<div class="divide-10"></div>'
		+ '<div class="col-sm-1-1" style="text-align: center; padding-top: 5px;">'
		+ '<input type="checkbox" value="{$T.testli.tid}" checked="checked"	id="pkgAssignproTestcheck{$T.lbproli.proId}" /></div>'
		+ '<div class="col-sm-10-1" style="padding-left: 1%; padding-top: 5px; text-align: left;"	id="pkgproTestNm-{$T.lbpkgli.idlbpkg}-{$T.lbproli.proId}-{$T.testli.tid}">{$T.testli.tnm}'
		+ '</div><input type="hidden" id="pkgproTestCharge-{$T.lbpkgli.idlbpkg}-{$T.lbproli.proId}-{$T.testli.tid}"	value="{$T.testli.trt}" />'
		+ '<input type="hidden"	id="pkgAssignproTestlabtestresultid{$T.lbproli.proId}{$T.testli.tid}" value="{$T.testli.idTstRe}">'
		+ '</div><input type="hidden" value="{$T.testli.tid}" id="pkgProTestId-{$T.lbpkgli.idlbpkg}-{$T.lbproli.proId}-{$P.x++}" /> '
		+ '{#/for}<input type="hidden"	id="pkgproTestCount{$T.lbpkgli.idlbpkg}-{$T.lbproli.proId}"	value="{--$P.x}" />'
		+ '</div><input type="hidden" value="{$T.lbproli.proId}"	id="pkgProId-{$T.lbpkgli.idlbpkg}-{$P.xp++}" />'
		+ '{#/for} {#param	name=xt value=1}{#foreach $T.lbpkgli.lbtstli as lbtstli}'
		+ '<div class="col-sm-12-1" style="width:94%; border-bottom: 1px solid #b8b8b8;border-left: 1px solid #b8b8b8;border-top: 1px solid #b8b8b8; float: right;padding-bottom:5px;margin-top:0px;" id="pkgtestDiv{$T.lbtstli.tid}">'
		+ '<div class="divide-10"></div>'
		+ '<div class="col-sm-1-1" style="text-align: center; padding-top: 5px;">'
		+ '<input type="checkbox" value="{$T.lbtstli.tid}" checked="checked" id="pkgtestAssigncheck{$T.lbpkgli.idlbpkg}" /></div>'
		+ '<div class="col-sm-10-1" style="padding-left: 1%; padding-top: 5px; text-align: left;"	id="pkgtestNm-{$T.lbpkgli.idlbpkg}-{$T.lbtstli.tid}">{$T.lbtstli.tnm}'
		+ '<input type="hidden" id="pkgtestCharge-{$T.lbpkgli.idlbpkg}-{$T.lbtstli.tid}" value="{$T.lbtstli.trt}" />'
		+ '<input type="hidden" id="pkgtestlabtestresultid{$T.lbpkgli.idlbpkg}{$T.lbtstli.tid}"	value="{$T.lbtstli.idTstRe}"></div></div>'
		+ '<input type="hidden" value="{$T.lbtstli.tid}" id="pkgTestId-{$T.lbpkgli.idlbpkg}-{$P.xt++}" /> {#/for}'
		+ '<input type="hidden" id="pkgproCount{$T.lbpkgli.idlbpkg}" value="{--$P.xp}" />'
		+ '<input type="hidden" id="pkgTestCount{$T.lbpkgli.idlbpkg}" value="{--$P.xt}" /></div>'
		+ '{#/for} {#foreach $T.proLi[0] as proLi}'
		+ '<div style="width: 100%;" id="proAssignDiv{$T.proLi.proId}{profilecount}">'
		+ '<div class="col-sm-12-1" style="border-bottom: 1px solid #b8b8b8; border-left: 0px solid #b8b8b8; padding-bottom: 5px;padding-top:20px;" id="proIdDiv{$T.proLi.proId}">'
		+ '<div class="col-sm-1-1" style="text-align: center; padding-top: 5px;">'
		+ '<input  name="Assignprocheck" type="checkbox" value="{$T.proLi.proId}" id="Assignprocheck" checked="checked" onclick=sendProTestToRemove("{$T.proLi.proId}-{profilecount}")  />'
		+ '</div>'
		+ '<div class="col-sm-8-1" style="text-align: left; padding-top: 5px;"	id="ProCodNm{$T.proLi.proId}">{$T.proLi.proCode} - {$T.proLi.proNm}</div>'
		+ '<div class="col-sm-2-1" style="padding-left: 1%; padding-top: 5px; text-align: left;"	id="AssProCodCharge{$T.proLi.proId}">{$T.proLi.proChr}'
		+ '</div></div>'
		+ '{#param name=x value=1}{#foreach $T.proLi.testli as testli}'
		+ '<div class="col-sm-12-1" style="width: 94%;border-bottom: 1px solid #b8b8b8; border-left: 1px solid #b8b8b8;padding-bottom: 5px;padding-top:20px; float: right;" id="AssignproTestDiv-{$T.testli.tid}-{$T.proLi.proId}">'
		+ '<div class="col-sm-1-1" style="text-align: center; padding-top: 5px;">'
		+ '<input type="checkbox" name="profileTest{$T.proLi.proId}" value="{$T.testli.tid}" id="AssignproTestcheck{$T.proLi.proId}{profilecount}" checked="checked" onclick="sendTestProToFormula({$T.testli.tid},{$T.proLi.proId})" />'
		+ '</div>'
		+ '<div class="col-sm-10-1" style="padding-left: 1%; padding-top: 5px; text-align: left;"	id="AssignproTestNm-{$T.testli.tid}-{$T.proLi.proId}">{$T.testli.tcd} - {$T.testli.tnm}'
		+ '<input type="hidden" id="AssignproTestCharge-{$T.testli.tid}-{$T.proLi.proId}" value="{$T.testli.trt}" />'
		+ '</div></div>'
		+ '<input type="hidden" value="{$T.testli.tid}" id="AssignProTestId{$P.x++}" />'
		+ '<input type="hidden"	id="labprotestresultid-{$T.testli.tid}-{$T.proLi.proId}{count++}" value="{$T.testli.idTstRe}">'
		+ '<input type="hidden" value="{profilecount++}" id="profileNumber"/>{#/for}'
		+ '<input type="hidden" id="AssignproTestCount{$T.proLi.proId}" value="{--$P.x}" />'
		+ '</div>{#/for}{#foreach $T.proLi[1] as testli}'
		+ '<div class="col-sm-12-1" style="border-bottom: 1px solid #b8b8b8;padding-bottom: 5px; margin-top: 0px;"	id="testAssignDiv{$T.testli.tid}{count}">'
		+ '<div class="divide-10"></div>'
		+ '<div class="col-sm-1-1" style="text-align: center; padding-top: 5px;">'
		+ '<input type="checkbox" name="testAssigncheck" value="{$T.testli.tid}" id="testAssigncheck" onclick=sendTestToRemove("{$T.testli.tid}-{count}")	checked="checked" /></div>'
		+ '<div class="col-sm-8-1" style="padding-left: 1%; padding-top: 5px; text-align: left;"	id="testNm{$T.testli.tid}">	{$T.testli.tcd} - {$T.testli.tnm}'
		+ '<input type="hidden" id="testCharge{$T.testli.tid}" value="{$T.testli.trt}" />'
		+ '</div>'
		+ '<div class="col-sm-2-1" style="padding-left: 1%; padding-top: 5px; text-align: left;"	id="testAssignCharge{$T.testli.tid}">{$T.testli.trt}'
		+ '</div></div><input type="hidden" value="{count}" id="TestNumber{$T.testli.tid}"/>'
		+ '<input type="hidden" id="labtestresultid{$T.testli.tid}{count++}" value="{$T.testli.idTstRe}">{#/for}';

function click2(fieldId) {
	// alert("in click");
	var id = fieldId.id;
	// alert(id);
	$(function() {
		$(".demo").timepickr({
			convention : 12
		});
	});
}

function autoSuggestionForLab(inputID, onload, callFrom) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	// alert(findingName);
	// var autoType = '';
	var auto = "";
	// alert(callFrom);

	if (callFrom == "labCollectionCenter") {
		auto = "CollectionCenterName";
	} else if (callFrom == "pathologyGroup") {
		auto = "PathologyGroup";
	} else if (callFrom == "pathologyPackages") {
		auto = "PathologyPackages";
	} else if (callFrom == "packagesCharges") {
		auto = "PackagesCharges";
	} else if (callFrom == "pathologyProfile") {
		auto = "PathologyProfile";
	} else if (callFrom == "pathologyProfileCharges") {
		auto = "PathologyProfileCharges";
	} else if (callFrom == "labTest") {
		auto = "LabTest";
	} else if (callFrom == "labTestCharges") {
		auto = "LabTestCharges";
	} else if (callFrom == "pathologyOrgan") {
		auto = "PathologyOrgan";
	} else if (callFrom == "pathologyDocChargeType") {
		auto = "PathologyDocChargeType";
	} else if (callFrom == "pathologyTestPatType") {
		auto = "PathologyTestPatType";
	} else if (callFrom == "labUnitType") {
		auto = "LabUnitType";
	} else if (callFrom == "labTestMethod") {
		auto = "LabTestMethod";
	} else if (callFrom == "labDocTechnician") {
		auto = "LabDocTechnician";
	} else if (callFrom == "labTestPatient") {
		auto = "LabTestPatient";
	}

	// labTestCharges/pathologyOrgan/pathologyDocChargeType/labDocTechnician/labTestPatient
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	// inputs.push('autoType=' + autoType);
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
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					setTimeout(function() {// alert(template);
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
		$("#byName").val((item.text).trim());

	}
}

/*
 * function SearchDiagnosticsElements(key, page_name) {
 * 
 * var keycode = (key.which) ? key.which : key.keyCode; //alert(keycode); if
 * ((keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123) || keycode ==
 * 32 || keycode == 8 || keycode == 9 || keycode == 127 || (keycode > 36 &&
 * keycode < 40) || keycode == 46) { return true; } else if (keycode == 13) { //
 * alert(page_name); if(page_name =="labCollectionCenter"){
 * searchLabCollectionCenterName(); } if (page_name == "OPDOldPatientDatabase") {
 * disppatientSearch("OPDOldPatientDatabase"); } else if (page_name ==
 * "MarkVisit") { searchVisitingPatient(); } else if (page_name == "OPDQueue") {
 * setAppoTimeWatchesForOPD("search"); } else if (page_name ==
 * "previousOPDbill") { prevOPDBillPatSearch('opd'); } else if (page_name ==
 * "IPDQueue") { searchIPDPatientsForBedward(); } else if (page_name ==
 * "IPDadvance") { disppatientbillSearch('onclick', 'IPD'); } else if (page_name ==
 * "IPD_OldPatientDatabase") {
 * sdispIPDDICpatientSearch('IPD_OldPatientDatabase'); } else if (page_name ==
 * "previousConsentForm") { featchPreviousICFpat('search'); } else if (page_name ==
 * "ChannelingDoctor") { searchDoctor(); } else if (page_name ==
 * "ChannelingHospital") { searchHospitalDetails(); } else if (page_name ==
 * "previousIPDbillGeneral") { prevOPDBillPatSearch('opd'); } else if (page_name ==
 * "previousIPDbillCredit") { prevOPDBillPatSearch('opd'); } else if (page_name ==
 * "pharmacyInvoice") { disppatientbillSearch('onclick', 'med'); } else if
 * (page_name == "visitingdoctor") { searchDocFee('visitingdoctor'); } else if
 * (page_name == "anesthetist") { searchDocFee('anesthetist'); } else if
 * (page_name == "OPDAppoinment") { //autoSuggetionPationNames();
 * disppatientSearch("OPDAppoinment"); } } else { alert("Please Enter Alphabets
 * only"); return false; } };
 * 
 * 
 * function searchLabCollectionCenterName() { var byName=$("#byName").val();
 * alert(byName); }
 */

function featchPreviousLabTestOfPat(callFrom) {

	var treatmentId = $("#treatmentId").val();
	var hallid = 0;
	if (callFrom == "IPD") {
		var pobj = $("#divPatId").html();
		var myobj = eval('(' + pobj + ')');
		hallid = myobj.oBed.hi;
	} else {
		hallid = 0;
	}

	var inputs = [];
	inputs.push('action=featchPrevLabTestOfPat');
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('hallid=' + hallid);
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
			count = 1;
			profilecount = 1;
			pkgcount = 1;
			var pobj1 = eval('(' + ajaxResponse + ')');
			// alert(pobj1.proLi[3].length);
			if (pobj1.proLi[3].length != 0) {
				pkgCnt[pkgCnt.length] = pobj1.proLi[3][0].idlbpkg;
			} else {
				pkgCnt[pkgCnt.length] = 0;
			}
			if (pobj1.proLi.length > 0) {
				// alert(pobj1.proLi.length);
				$("#assignTestDiv").setTemplate(featchPrevLabTestOfPatTemp);
				$("#assignTestDiv").processTemplate(pobj1);
				$("#testCount").val(count);
				$("#profileCount").val(profilecount);
				// alert(count);
				if (pobj1.proLi[2].length > 0) {
					$("#divtotalAmt").html(pobj1.proLi[2][0].proChr);
					$("#labPatId").val(pobj1.proLi[2][0].hedId);
					$("#testResultMastId").val(pobj1.proLi[2][0].proId);

					$("#pathologyqueryType").val('update');
					$("#doctor").val(pobj1.proLi[2][0].proSt);
				}
			}
		}
	});
}

function printlabReportDiv() {
	var WindowObject = window.open('', ' ', '');

	WindowObject.document
			.writeln('<html><body style="width: 800px;height: 1050px;border:0px solid black;">');

	var pkgcount = $("#reportpkgCount").val();
	z = 1;
	k = 1;
	y = 1;
	x = 1;

	// alert($("#collectionDate").val());
	var newDate = $("#collectionDate").val();
	var collectionDate;
	var finalCollectionDate = "";

	if (newDate.indexOf("-") != -1) {
		collectionDate = newDate.split("-");
		finalCollectionDate = " " + collectionDate[2] + "/" + collectionDate[1]
				+ "/" + collectionDate[0];
	} else {
		collectionDate = newDate;
		finalCollectionDate = collectionDate;
	}

	// alert(finalCollectionDate);

	var tempDate = $("#collectionOutDate").val();
	var collectionOutDate;
	var finalCollectionOutDate = "";
	if (tempDate.indexOf("-") != -1) {
		collectionOutDate = tempDate.split("-");
		finalCollectionOutDate = " " + collectionOutDate[2] + "/"
				+ collectionOutDate[1] + "/" + collectionOutDate[0];
	} else {
		collectionOutDate = tempDate;
		finalCollectionOutDate = collectionOutDate;
	}

	// alert(finalCollectionOutDate);

	var rdate = $("#reportdueDate").val();
	var reportDate;
	var finalReportdueDate = "";
	if (rdate.indexOf("-") != -1) {
		reportDate = rdate.split("-");
		finalReportdueDate = " " + reportDate[2] + "/" + reportDate[1] + "/"
				+ reportDate[0];
	} else {
		reportDate = rdate;
		finalReportdueDate = reportDate;
	}

	var technician = $("#technician :selected").text();

	var doctor = $("#doctor :selected").text();

	// alert(finalReportdueDate);

	for ( var i = 1; i < pkgcount; i++) {

		WindowObject.document
				.writeln('<div style="width: 100%;height:1050px;"><div style="width: 100%;margin-top:1.4in;"><div	style="width: 65%; border-right: solid 1px black; border-bottom: solid 1px black; float: left; "><div style="width: 98%; padding-left: 5px;">Patient Name : '
						+ $("#initial :selected").text()
						+ $("#pName").val()
						+ '</div><div style="width: 98%; padding-left: 5px;">Age&nbsp; / Gender : &nbsp; '
						+ $("#age").val()
						+ $("#ageType :selected").text()
						+ " / "
						+ $("#sex :selected").text()
						+ '</div>	<div style="width: 98%; padding-left: 5px; padding-top: 20px;">Reference Dr. :&nbsp; '
						+ $("#doctor :selected").text()
						+ '</div></div><div	style="width: 34.5%; border-bottom: solid 1px black; float: left; "><div style="width: 90%; padding-left: 5px;">Collected :&nbsp; '
						+ finalCollectionDate
						+ '&nbsp;'
						+ $("#collectionTime").val()
						+ '</div>	<div style="width: 90%; padding-left: 5px;">');

		WindowObject.document.writeln('Received :&nbsp; '
				+ finalCollectionOutDate + '&nbsp;' + $("#collTimeOut").val()
				+ '');

		WindowObject.document
				.writeln('</div>	<div style="width: 90%; padding-left: 5px;">Reported :&nbsp; '
						+ finalReportdueDate
						+ '&nbsp;'
						+ $("#reportDueTime").val()
						+ '</div><div style="width: 90%; padding-left: 5px;">Patient ID:&nbsp; '
						+ $("#patientId").html()
						+ '</div>	</div></div><div style="width: 100%;padding-top:10%;">');

		WindowObject.document
				.writeln('<div style="width: 100%; margin-top: 25px;height: 30px; border: 0px solid black;"><div	style="width: 2%; border: 0px solid #FFF; border-right: 0px solid black; padding-left: 1%; font-weight: bold; padding-right: 1%;float:left;height: 30px; ">Sr.</div>	<div style="width: 40%;padding-left: 1%; font-weight: bold; border-right: 0px solid black;float:left;height: 30px;">Test Name</div>	<div style="width: 15%;padding-left: 1%;  border-right: 0px solid black; font-weight: bold;float:left;height: 30px; ">Test	Result</div><div	style="width: 19%; border: 0px solid #FFF; border-right: 0px solid black; padding-left: 1%; font-weight: bold; padding-right: 1%;float:left;height: 30px; ">Normal Values</div><div	style="width: 16%; border: 0px solid #FFF;  padding-left: 1%; font-weight: bold; padding-right: 1%;float:left;height: 30px; ">Method</div></div>');

		var srtstno = 1;

		WindowObject.document
				.writeln('<div	style="width: 100%; height: 28px;float:left;  border-bottom: 0px solid black; padding-top: 0px; border-left: 0px solid black;border-right: 0px solid black;" ><div style="width: 3.1%; height: 23px; padding-left: 1%; border-right: 0px solid black; padding-top: 5px;float:left;  text-align: left;">'
						+ srtstno++
						+ '</div>&nbsp;&nbsp;'
						+ $("#pkgDiv" + i).html() + '</div>');

		var reportpkgproCount = $("#reportpkgproCount" + i).val();
		for ( var l = x; l < reportpkgproCount; l++) {
			WindowObject.document
					.writeln('<div	style="width: 100%; height: 28px;float:left;  border-bottom: 0px solid black; padding-top: 15px; border-left: 0px solid black;border-right: 0px solid black;" ><div style="width: 3.1%; height: 23px; padding-left: 1%; border-right: 0px solid black; padding-top: 5px;float:left;  text-align: left;">&nbsp;</div>&nbsp;&nbsp;'
							+ $("#pkgproDiv" + i + l).html() + '</div>');

			var reportpkgproTestCount = $("#reportpkgproTestCount" + i + l)
					.val();
			for ( var j = y; j < reportpkgproTestCount; j++) {

				var testNorVal = $.trim($("#testNR" + i + l + j).html());
				var testRE = $.trim($("#testRE" + i + l + j).html());

				var n = testNorVal.indexOf("-");

				if (n != -1) {

					var profileid = testNorVal.split("-");

					var lowval = $.trim(profileid[0]);

					var maxvla = profileid[1].split(" ");
					// console.log("$" + maxvla + "*");
					var highval = maxvla[1];
					console.log("@" + highval + "*");
					if ((parseFloat(testRE) < parseFloat(lowval))
							|| (parseFloat(testRE) > parseFloat(highval))) {

						testRE = "<div style='width: 100%; background-color: red;'><strong> "
								+ testRE + " </strong> </div>";
					}
				}

				WindowObject.document
						.writeln('<div style="width: 100%; height: 40px;float:left; border-bottom: 0px solid black; border-left: 0px solid black;border-right: 0px solid black;"	><div style="width: 3.1%; height: 29px; padding-left: 1%; border-right: 0px solid black; padding-top: 0px;float:left;  text-align: left;">&nbsp;</div><div style="width: 40%; height: 23px; padding-left: 2%; border-right: 0px solid black; padding-top: 5px;float:left;  text-align: left;">'
								+ $("#testNM" + i + l + j).html()
								+ '</div><div style="width: 15%;float:left;  height: 23px; text-align: left; padding-left: 1%; border-right: 0px solid black; padding-top: 5px;" >'
								+ testRE
								+ '</div><div style="width: 19%; float:left; height: 23px; text-align: left;padding-left: 1%; border-right: 0px solid black; padding-top: 5px;">'
								+ $("#testNR" + i + l + j).html()
								+ '</div><div style="width: 16%; float:left; height: 23px; text-align: left;padding-left: 1%; padding-top: 5px;">'
								+ $("#testMethod" + i + l + j).html()
								+ '</div></div>');

			}
			y = j;
		}
		x = l;

		var testprocount = $("#reportpkgtestCount" + i).val();
		for ( var k = z; k < testprocount; k++) {

			var testNorVal = $.trim($("#pkgtestNR" + i + k).html());
			var testRE = $.trim($("#pkgtestRE" + i + k).html());

			var n = testNorVal.indexOf("-");

			if (n != -1) {

				var profileid = testNorVal.split("-");

				var lowval = $.trim(profileid[0]);

				var maxvla = profileid[1].split(" ");
				// console.log("$" + maxvla + "*");
				var highval = maxvla[1];
				console.log("@" + highval + "*");
				if ((parseFloat(testRE) < parseFloat(lowval))
						|| (parseFloat(testRE) > parseFloat(highval))) {

					testRE = "<div style='width: 100%; background-color: red;'><strong> "
							+ testRE + " </strong> </div>";
				}
			}

			WindowObject.document
					.writeln('<div style="width: 100%; height: 40px;float:left; border-bottom: 0px solid black; border-left: 0px solid black;border-right: 0px solid black;"	><div style="width: 3.1%; height: 29px; padding-left: 1%; border-right: 0px solid black; padding-top: 0px;float:left;  text-align: left;">&nbsp;</div><div style="width: 40%; height: 23px; padding-left: 2%; border-right: 0px solid black; padding-top: 5px;float:left;  text-align: left;">'
							+ $("#pkgtestNM" + i + k).html()
							+ '</div><div style="width: 15%;float:left;  height: 23px; text-align: left; padding-left: 1%; border-right: 0px solid black; padding-top: 5px;" >'
							+ testRE
							+ '</div><div style="width: 19%; float:left; height: 23px; text-align: left;padding-left: 1%; border-right: 0px solid black; padding-top: 5px;">'
							+ $("#pkgtestNR" + i + k).html()
							+ '</div><div style="width: 16%; float:left; height: 23px; text-align: left;padding-left: 1%; padding-top: 5px;">'
							+ $("#pkgtestMethod" + i + k).html()
							+ '</div></div>');
		}
		z = k;

		WindowObject.document.writeln('</div>');
		WindowObject.document
				.writeln('<div style="width: 100%;margin-top:670px;font-weight:bold;"><div style="width: 30%;padding-top:2%;padding-left:1%;float:left;" >'
						+ $("#doctor :selected").text()
						+ '</div><div style="width: 30%;padding-top:2%;padding-left:3%;float:left;" >'
						+ $("#technician :selected").text()
						+ '</div><div style="width: 30%;padding-top:2%;padding-left:1%;float:right;font-weight:bold;" >MD Pathologist</div><div style="width: 30%;padding-top:2%;padding-left:3%;float:left;font-weight:bold;" >Lab Incharge</div></div></div>');

	}

	var procount = $("#reportproCount").val();
	var k = 1;
	var z = 1;

	for ( var i = 1; i < procount; i++) {

		WindowObject.document
				.writeln('<div style="width: 100%;height:1050px;"><div style="width: 100%;margin-top:1.4in;"><div	style="width: 65%; border-right: solid 1px black; border-bottom: solid 1px black; float: left; "><div style="width: 98%; padding-left: 5px;">Patient Name : '
						+ $("#initial :selected").text()
						+ $("#pName").val()
						+ '</div><div style="width: 98%; padding-left: 5px;">Age&nbsp; / Gender : &nbsp; '
						+ $("#age").val()
						+ $("#ageType :selected").text()
						+ " / "
						+ $("#sex :selected").text()
						+ '</div>	<div style="width: 98%; padding-left: 5px; padding-top: 20px;">Reference Dr. :&nbsp; '
						+ $("#doctor :selected").text()
						+ '</div></div><div	style="width: 34.5%; border-bottom: solid 1px black; float: left; "><div style="width: 90%; padding-left: 5px;">Collected :&nbsp; '
						+ finalCollectionDate
						+ '&nbsp;'
						+ $("#collectionTime").val()
						+ '</div>	<div style="width: 90%; padding-left: 5px;">');

		WindowObject.document.writeln('Received :&nbsp; '
				+ finalCollectionOutDate + '&nbsp;' + $("#collTimeOut").val()
				+ '');

		WindowObject.document
				.writeln('</div>	<div style="width: 90%; padding-left: 5px;">Reported :&nbsp; '
						+ finalReportdueDate
						+ '&nbsp;'
						+ $("#reportDueTime").val()
						+ '</div><div style="width: 90%; padding-left: 5px;">Patient ID:&nbsp; '
						+ $("#patientId").html()
						+ '</div>	</div></div><div style="width: 100%;padding-top:10%;">');

		WindowObject.document
				.writeln('<div style="width: 100%; margin-top: 25px;height: 30px; border: 0px solid black;"><div	style="width: 2%; border: 0px solid #FFF; border-right: 0px solid black; padding-left: 1%; font-weight: bold; padding-right: 1%;float:left;height: 30px; ">Sr.</div>	<div style="width: 40%;padding-left: 1%; font-weight: bold; border-right: 0px solid black;float:left;height: 30px;">Test Name</div>	<div style="width: 15%;padding-left: 1%;  border-right: 0px solid black; font-weight: bold;float:left;height: 30px; ">Test	Result</div><div	style="width: 19%; border: 0px solid #FFF; border-right: 0px solid black; padding-left: 1%; font-weight: bold; padding-right: 1%;float:left;height: 30px; ">Normal Values</div><div	style="width: 16%; border: 0px solid #FFF;  padding-left: 1%; font-weight: bold; padding-right: 1%;float:left;height: 30px; ">Method</div></div>');

		var srtstno = 1;

		WindowObject.document
				.writeln('<div	style="width: 100%; height: 28px;float:left;  border-bottom: 0px solid black; padding-top: 0px; border-left: 0px solid black;border-right: 0px solid black;" ><div style="width: 3.1%; height: 23px; padding-left: 1%; border-right: 0px solid black; padding-top: 5px;float:left;  text-align: left;">'
						+ srtstno++
						+ '</div>&nbsp;&nbsp;'
						+ $("#proDiv" + i).html() + '</div>');

		var testprocount = $("#reportproTestCount" + i).val();
		for (k = z; k < testprocount; k++) {

			var testNorVal = $.trim($("#testNR" + i + k).html());
			var testRE = $.trim($("#testRE" + i + k).html());

			var n = testNorVal.indexOf("-");

			if (n != -1) {

				var profileid = testNorVal.split("-");

				var lowval = $.trim(profileid[0]);

				var maxvla = profileid[1].split(" ");
				// console.log("$" + maxvla + "*");
				var highval = maxvla[1];
				console.log("@" + highval + "*");
				if ((parseFloat(testRE) < parseFloat(lowval))
						|| (parseFloat(testRE) > parseFloat(highval))) {

					testRE = "<div style='width: 100%; background-color: red;'><strong> "
							+ testRE + " </strong> </div>";
				}
			}

			WindowObject.document
					.writeln('<div style="width: 100%; height: 40px;float:left; border-bottom: 0px solid black; border-left: 0px solid black;border-right: 0px solid black;"	><div style="width: 3.1%; height: 29px; padding-left: 1%; border-right: 0px solid black; padding-top: 0px;float:left;  text-align: left;">&nbsp;</div><div style="width: 40%; height: 23px; padding-left: 2%; border-right: 0px solid black; padding-top: 5px;float:left;  text-align: left;">'
							+ $("#testNM" + i + k).html()
							+ '</div><div style="width: 15%;float:left;  height: 23px; text-align: left; padding-left: 1%; border-right: 0px solid black; padding-top: 5px;" >'
							+ testRE
							+ '</div><div style="width: 19%; float:left; height: 23px; text-align: left;padding-left: 1%; border-right: 0px solid black; padding-top: 5px;">'
							+ $("#testNR" + i + k).html()
							+ '</div><div style="width: 16%; float:left; height: 23px; text-align: left;padding-left: 1%; padding-top: 5px;">'
							+ $("#testMethod" + i + k).html() + '</div></div>');

		}
		z = ++k;

		WindowObject.document.writeln('</div>');
		WindowObject.document
				.writeln('<div style="width: 100%;margin-top:670px;font-weight:bold;"><div style="width: 30%;padding-top:2%;padding-left:1%;float:left;" >'
						+ $("#doctor :selected").text()
						+ '</div><div style="width: 30%;padding-top:2%;padding-left:3%;float:left;" >'
						+ $("#technician :selected").text()
						+ '</div><div style="width: 30%;padding-top:2%;padding-left:8%;float:left;font-weight:bold;" > MD Pathologist</div><div style="width: 30%;padding-top:2%;padding-left:8%;float:left;font-weight:bold;" >Lab Incharge</div></div></div>');

	}

	var reporttestcount = $("#reportTestCount").val();
	if (reporttestcount >= 1) {
		var no = 1;

		for ( var i = 1; i <= reporttestcount; i++) {

			var note = $.trim($("#testNote" + i).html());
			var clinicalUse = $.trim($("#testClinicaluse" + i).html());
			var increLevel = $.trim($("#testIncreasedlevel" + i).html());
			var inter = $.trim($("#testInterpretation" + i).html());
			var comments = $.trim($("#testComments" + i).html());

			if (note == "" && clinicalUse == "" && increLevel == ""
					&& inter == "" && comments == "") {
				if (i == 1) {
					WindowObject.document
							.writeln('<div style="width: 100%;height:1050px;"><div style="width: 100%;margin-top:1.25in;"><div	style="width: 65%; border-right: solid 1px black; border-bottom: solid 1px black; float: left; "><div style="width: 98%; padding-left: 5px;">Patient Name : '
									+ $("#initial :selected").text()
									+ $("#pName").val()
									+ '</div><div style="width: 98%; padding-left: 5px;">Age&nbsp; / Gender : &nbsp; '
									+ $("#age").val()
									+ $("#ageType :selected").text()
									+ " / "
									+ $("#sex :selected").text()
									+ '</div>	<div style="width: 98%; padding-left: 5px; padding-top: 20px;">Reference Dr. :&nbsp; '
									+ $("#doctor :selected").text()
									+ '</div></div><div	style="width: 34.5%; border-bottom: solid 1px black; float: left; "><div style="width: 90%; padding-left: 5px;">Collected :&nbsp; '
									+ finalCollectionDate
									+ '&nbsp;'
									+ $("#collectionTime").val()
									+ '</div>	<div style="width: 90%; padding-left: 5px;">');

					WindowObject.document.writeln('Received :&nbsp; '
							+ finalCollectionOutDate + '&nbsp;'
							+ $("#collTimeOut").val() + '');

					WindowObject.document
							.writeln('</div>	<div style="width: 90%; padding-left: 5px;">Reported :&nbsp; '
									+ finalReportdueDate
									+ '&nbsp;'
									+ $("#reportDueTime").val()
									+ '</div><div style="width: 90%; padding-left: 5px;">Patient ID:&nbsp; '
									+ $("#patientId").html()
									+ '</div>	</div></div><div style="width: 100%;padding-top:10%;">');

					WindowObject.document
							.writeln('<div style="width: 100%; margin-top: 25px;height: 30px; border: 0px solid black;"><div	style="width: 2%; border: 0px solid #FFF; border-right: 0px solid black; padding-left: 1%; font-weight: bold; padding-right: 1%;float:left;height: 30px; ">Sr.</div>	<div style="width: 40%;padding-left: 1%; font-weight: bold; border-right: 0px solid black;float:left;height: 30px;">Test Name</div>	<div style="width: 15%;padding-left: 1%;  border-right: 0px solid black; font-weight: bold;float:left;height: 30px; ">Test	Result</div><div	style="width: 19%; border: 0px solid #FFF; border-right: 0px solid black; padding-left: 1%; font-weight: bold; padding-right: 1%;float:left;height: 30px; ">Normal Values</div><div	style="width: 16%; border: 0px solid #FFF;  padding-left: 1%; font-weight: bold; padding-right: 1%;float:left;height: 30px; ">Method</div></div>');

				}
				var testNorVal = $.trim($("#testNR" + i).html());
				var testRE = $.trim($("#testRE" + i).html());

				var n = testNorVal.indexOf("-");

				if (n != -1) {

					var profileid = testNorVal.split("-");

					var lowval = $.trim(profileid[0]);

					var maxvla = profileid[1].split(" ");
					// console.log("$" + maxvla + "*");
					var highval = maxvla[1];
					console.log("@" + highval + "*");
					if ((parseFloat(testRE) < parseFloat(lowval))
							|| (parseFloat(testRE) > parseFloat(highval))) {

						testRE = "<div style='width: 100%; background-color: red;'><strong> "
								+ testRE + " </strong> </div>";
					}
				}

				WindowObject.document
						.writeln('<div style="width: 100%; height: 40px;float:left; border-bottom: 0px solid		  black; border-left: 0px solid black;border-right: 0px solid black;" ><div		  style="width: 3.1%; height: 29px; padding-left: 1%; border-right: 0px		  solid black; padding-top: 0px;float:left; text-align: left;">'
								+ no++
								+ '</div><div style="width: 40%; height: 23px; padding-left:		  1%; border-right: 0px solid black; padding-top: 5px;float:left;		  text-align: left;">'
								+ $("#testNM" + i).html()
								+ '</div><div		  style="width: 15%;float:left; height: 23px; text-align: left;		  padding-left: 1%; border-right: 0px solid black; padding-top: 5px;" >'
								+ testRE
								+ '</div><div style="width: 20%; float:left;		  height: 23px; text-align: left;padding-left: 1%; border-right: 0px solid		  black; padding-top: 5px;">'
								+ $("#testNR" + i).html()
								+ '</div><div		  style="width: 16%; float:left; height: 23px; text-align:		  left;padding-left: 1%; padding-top: 5px;">'
								+ $("#testMethod" + i).html() + '</div></div>');
			}
		}
		if (no > 1) {
			WindowObject.document
					.writeln('<div style="width: 96%; float:left;		  border-bottom: 0px solid black; border-left: 0px solid		  black;border-right: 0px solid black;" >&nbsp;&nbsp;Advice :		  &nbsp;&nbsp;'
							+ $("#txtReportNote").val() + '</div></div>');

			WindowObject.document
					.writeln('<div style="width: 100%;margin-top:670px;font-weight:bold;"><div style="width: 30%;padding-top:2%;padding-left:1%;float:left;" >'
							+ $("#doctor :selected").text()
							+ '</div><div style="width: 30%;padding-top:2%;padding-left:3%;float:left;" >'
							+ $("#technician :selected").text()
							+ '</div><div style="width: 30%;padding-top:2%;padding-left:1%;float:left;font-weight:bold;" >MD Pathologist</div><div style="width: 30%;padding-top:2%;padding-left:3%;float:left;font-weight:bold;" >Lab Incharge</div></div></div>');
		}
	}

	for ( var i = 1; i <= reporttestcount; i++) {

		var note = $.trim($("#testNote" + i).html());
		var clinicalUse = $.trim($("#testClinicaluse" + i).html());
		var increLevel = $.trim($("#testIncreasedlevel" + i).html());
		var inter = $.trim($("#testInterpretation" + i).html());
		var comments = $.trim($("#testComments" + i).html());

		if (note == "" && clinicalUse == "" && increLevel == "" && inter == ""
				&& comments == "") {
		} else {

			WindowObject.document
					.writeln('<div style="width: 100%;height:1050px;"><div style="width: 100%;margin-top:1.15in;"><div	style="width: 65%; border-right: solid 1px black; border-bottom: solid 1px black; float: left; "><div style="width: 98%; padding-left: 5px;">Patient Name : '
							+ $("#initial :selected").text()
							+ $("#pName").val()
							+ '</div><div style="width: 98%; padding-left: 5px;">Age&nbsp; / Gender : &nbsp; '
							+ $("#age").val()
							+ $("#ageType :selected").text()
							+ " / "
							+ $("#sex :selected").text()
							+ '</div>	<div style="width: 98%; padding-left: 5px; padding-top: 20px;">Reference Dr. :&nbsp; '
							+ $("#doctor :selected").text()
							+ '</div></div><div	style="width: 34.5%; border-bottom: solid 1px black; float: left; "><div style="width: 90%; padding-left: 5px;">Collected :&nbsp; '
							+ finalCollectionDate
							+ '&nbsp;'
							+ $("#collectionTime").val()
							+ '</div>	<div style="width: 90%; padding-left: 5px;">');

			WindowObject.document.writeln('Received :&nbsp; '
					+ finalCollectionOutDate + '&nbsp;'
					+ $("#collTimeOut").val() + '');

			WindowObject.document
					.writeln('</div>	<div style="width: 90%; padding-left: 5px;">Reported :&nbsp; '
							+ finalReportdueDate
							+ '&nbsp;'
							+ $("#reportDueTime").val()
							+ '</div><div style="width: 90%; padding-left: 5px;">Patient ID:&nbsp; '
							+ $("#patientId").html()
							+ '</div>	</div></div><div style="width: 100%;padding-top:10%;">');

			WindowObject.document
					.writeln('<div style="width: 100%; margin-top: 25px;height: 30px; border: 0px solid black;"><div	style="width: 2%; border: 0px solid #FFF; border-right: 0px solid black; padding-left: 1%; font-weight: bold; padding-right: 1%;float:left;height: 30px; ">Sr.</div>	<div style="width: 40%;padding-left: 1%; font-weight: bold; border-right: 0px solid black;float:left;height: 30px;">Test Name</div>	<div style="width: 15%;padding-left: 1%;  border-right: 0px solid black; font-weight: bold;float:left;height: 30px; ">Test	Result</div><div	style="width: 19%; border: 0px solid #FFF; border-right: 0px solid black; padding-left: 1%; font-weight: bold; padding-right: 1%;float:left;height: 30px; ">Normal Values</div><div	style="width: 16%; border: 0px solid #FFF;  padding-left: 1%; font-weight: bold; padding-right: 1%;float:left;height: 30px; ">Method</div></div>');

			var no = 1;

			var testNorVal = $.trim($("#testNR" + i).html());
			var testRE = $.trim($("#testRE" + i).html());

			var n = testNorVal.indexOf("-");

			if (n != -1) {

				var profileid = testNorVal.split("-");

				var lowval = $.trim(profileid[0]);

				var maxvla = profileid[1].split(" ");

				var highval = $.trim(maxvla[2]);

				if ((parseFloat(testRE) < parseFloat(lowval))
						|| (parseFloat(testRE) > parseFloat(highval))) {

					testRE = "<div style='width: 100%; background-color: red;'><strong> "
							+ testRE + " </strong> </div>";
				}
			}

			WindowObject.document
					.writeln('<div style="width: 100%; height: 28px;float:left; border-bottom: 0px solid		  black; border-left: 0px solid black;border-right: 0px solid black;" ><div		  style="width: 3.1%; height: 29px; padding-left: 1%; border-right: 0px		  solid black; padding-top: 0px;float:left; text-align: left;">'
							+ no++
							+ '</div><div style="width: 40%; height: 23px; padding-left:		  1%; border-right: 0px solid black; padding-top: 5px;float:left;		  text-align: left;">'
							+ $("#testNM" + i).html()
							+ '</div><div		  style="width: 15%;float:left; height: 23px; text-align: left;		  padding-left: 1%; border-right: 0px solid black; padding-top: 5px;" >'
							+ testRE
							+ '</div><div style="width: 20%; float:left;		  height: 23px; text-align: left;padding-left: 1%; border-right: 0px solid		  black; padding-top: 5px;">'
							+ $("#testNR" + i).html()
							+ '</div><div		  style="width: 16%; float:left; height: 23px; text-align:		  left;padding-left: 1%; padding-top: 5px;">'
							+ $("#testMethod" + i).html() + '</div></div>');
			if ($("#testNote").html() != "") {
				WindowObject.document
						.writeln('<div style="width: 96%;padding-top:2%;float:left;font-weight:bold;" >Note:</div><div style="width: 96%;float:left;" >'
								+ $("#testNote" + i).html() + '</div>');
			}
			if ($("#testClinicaluse" + i).html() != "") {
				WindowObject.document
						.writeln('<div style="width: 96%;padding-top:2%;float:left;font-weight:bold;" >Clinical Use:</div><div style="width: 96%;float:left;" >'
								+ $("#testClinicaluse" + i).html() + '</div>');
			}
			if ($("#testIncreasedlevel" + i).html() != " ") {
				WindowObject.document
						.writeln('<div style="width: 96%;padding-top:2%;float:left;font-weight:bold;" >Increased Level:</div><div style="width: 96%;float:left;" >'
								+ $("#testIncreasedlevel" + i).html()
								+ '</div>');
			}

			if ($("#testInterpretation" + i).html() != " ") {
				WindowObject.document
						.writeln('<div style="width: 96%;padding-top:2%;float:left;font-weight:bold;" >Interpretation:</div><div style="width: 96%;float:left;" >'
								+ $("#testInterpretation" + i).html()
								+ '</div>');
			}
			if ($("#testComments" + i).html() != " ") {
				WindowObject.document
						.writeln('<div style="width: 96%;padding-top:2%;float:left;font-weight:bold;" >Comments:</div><div style="width: 96%;float:left;" >'
								+ $("#testComments" + i).html() + '</div>');
			}
			if ($("#txtReportNote").val() != "") {
				WindowObject.document.writeln('<div class="divide-40"></div>');
				WindowObject.document
						.writeln('<div style="width: 96%;margin-top:10%; float:left;" >&nbsp;&nbsp;Advice :		  &nbsp;&nbsp;'
								+ $("#txtReportNote").val() + '</div></div>');
			}

			WindowObject.document
					.writeln('<div style="width: 100%;margin-top:670px;font-weight:bold;"><div style="width: 30%;padding-top:2%;padding-left:1%;float:left;" >'
							+ $("#doctor :selected").text()
							+ '</div><div style="width: 30%;padding-top:2%;padding-left:3%;float:left;" >'
							+ $("#technician :selected").text()
							+ '</div><div style="width: 30%;padding-top:2%;padding-left:1%;float:left;font-weight:bold;" >MD Pathologist</div><div style="width: 30%;padding-top:2%;padding-left:1%;float:left;font-weight:bold;" >Lab Incharge</div></div></div>');
		}
	}

	WindowObject.document.writeln('</body></html>');
	WindowObject.document.close();
	WindowObject.focus();
	WindowObject.print();
	WindowObject.close();
}

function LabReportDivPrint() {
	var trId = $("#treat_ID").val();
	var testmasterId = $("#testmasterId").html();
	var Gender = $("#initial").val();
	var patientName = $("#pName").val();
	var sex = $("#sex").val();
	age = $("#age").val();
	var ageType = $("#ageType").val();
	var pathospType = $("#pathospType").val();
	var address = $("#address").val();
	var doctor = $("#doctor").val();
	var technician = $("#technician").val();
	var collectionDate = $("#collectionDate").val();
	var collectionTime = $("#collectionTime").val();
	var reportdueDate = $("#reportdueDate").val();
	var reportDueTime = $("#reportDueTime").val();
	var collectionOutDate = $("#collectionOutDate").val();
	var collTimeOut = $("#collTimeOut").val();
	var txtReportNote = $("#txtReportNote").val();

	window.open("labTestReportPrint.jsp?" + "Gender="
			+ encodeURIComponent(Gender) + "&patientName="
			+ encodeURIComponent(patientName) + "&sex=" + sex
			+ "&testmasterId=" + testmasterId + " &trId=" + trId + "&age="
			+ age + " &ageType=" + ageType + "&pathospType=" + pathospType
			+ "&address=" + encodeURIComponent(address) + "&doctor="
			+ encodeURIComponent(doctor) + "&technician="
			+ encodeURIComponent(technician) + "&collectionDate="
			+ encodeURIComponent(collectionDate) + "&collectionTime="
			+ encodeURIComponent(collectionTime) + "&reportdueDate="
			+ encodeURIComponent(reportdueDate) + "&reportDueTime="
			+ encodeURIComponent(reportDueTime) + "&collectionOutDate="
			+ encodeURIComponent(collectionOutDate) + "&collTimeOut="
			+ encodeURIComponent(collTimeOut) + "&txtReportNote="
			+ encodeURIComponent(txtReportNote));

}

/** ***************** Lab Pat Assign Test Start ****************** */

function sendPkgToRemove(proId) {

	var total = 0;
	var amount = $("#divtotalAmt").html();
	var profileid = proId.split("-");
	// var protestid = $("#AssignproTestCount" + proid).val();
	if (amount <= 0) {

		total = 0;
	} else {
		var prochargediv = $("#AssPkgCodCharge" + profileid[0]);
		var procharge = prochargediv.html();
		total = parseFloat($("#divtotalAmt").html()) - parseFloat(procharge);
	}

	$("#divtotalAmt").html(total);
	$('#pkgAssignDiv' + profileid[0] + '-' + profileid[1]).remove();
	// $("#procheck" + protestid).attr("checked", false);
}

function sendProTestToRemove(proId) {

	var total = 0;
	var amount = $("#divtotalAmt").html();
	var profileid = proId.split("-");
	// var protestid = $("#AssignproTestCount" + proid).val();
	if (amount <= 0) {

		total = 0;
	} else {
		var prochargediv = $("#AssProCodCharge" + profileid[0]);
		var procharge = prochargediv.html();
		total = parseFloat($("#divtotalAmt").html()) - parseFloat(procharge);
	}

	$("#divtotalAmt").html(total);
	$('#proAssignDiv' + profileid[0] + profileid[1]).remove();
	// $("#procheck" + protestid).attr("checked", false);
}

function sendTestToRemove(tid) {
	var total = 0;
	var amount = $("#divtotalAmt").html();
	var testid = tid.split("-");

	if (amount <= 0) {

		total = 0;
	} else {
		total = parseFloat($("#divtotalAmt").html())
				- parseFloat($("#testAssignCharge" + testid[0]).html());
	}

	$("#divtotalAmt").html(total);
	$('#testAssignDiv' + testid[0] + testid[1]).remove();
	// $("#testcheck" + tid).attr("checked", false);
	setTimeout(function() {
		$('#TestNumber' + testid[0]).val(0);
		$('#labtestresultid' + testid[0] + testid[1]).val(0);
	}, 50);

}

var featchProAndTestTemp = "<div id='featchProAndTestTemp'>"
		+ "{#foreach $T.lbHedLi[0].lbpkgli as lbpkgli}"
		+ "<div style='width: 100%; border-bottom: 0px solid #b8b8b8; margin-top: 0px;' id='pkgDiv{$T.lbpkgli.idlbpkg}'>"
		+ "<div class='col-sm-12-1' style='border-bottom: 1px solid #b8b8b8; padding-bottom: 5px;'	id='pkgIdDiv{$T.lbpkgli.idlbpkg}'>"
		+ "<div class='divide-20'></div>"
		+ "<div class='col-sm-1-1'	style='text-align: center; padding-top: 5px;'>"
		+ "<input type='checkbox' value='{$T.lbpkgli.idlbpkg}'	id='pkgcheck{$T.lbpkgli.idlbpkg}' onclick='sendPkgToAsign({$T.lbpkgli.idlbpkg})' /></div>"
		+ "<div class='col-sm-10-1' style='padding-left: 1%; padding-top: 5px; text-align: left;' id='PkgCodNm{$T.lbpkgli.idlbpkg}'>"
		+ "{$T.lbpkgli.pkgcod}	- {$T.lbpkgli.pkgnm}</div>"
		+ "<input type='hidden' id='PkgCodCharge{$T.lbpkgli.idlbpkg}'	value='{$T.lbpkgli.pkgchrg}' /></div>"
		+ "{#param name=xp value=1}{#param name=xt value=1}"
		+ "{#foreach $T.lbpkgli.pkgprotstli as pkgprotstli}"
		+ "{#if $T.pkgprotstli.typeTP=='P'}"
		+ "<div style='width: 94%; float: right; margin-top: 8px;'	id='pkgproDiv{$T.pkgprotstli.idprotst}'>"
		+ "<div class='col-sm-12-1' style='border-bottom: 1px solid #b8b8b8; padding-bottom: 5px; border-left: 1px solid #b8b8b8; border-top: 1px solid #b8b8b8;' id='pkgproIdDiv{$T.pkgprotstli.idprotst}'>"
		+ "<div class='divide-10'></div>"
		+ "<div class='col-sm-1-1'	style='text-align: center; padding-top: 5px;'>"
		+ "<input type='checkbox' value='{$T.pkgprotstli.idprotst}' id='pkgprocheck-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}' /></div>"
		+ "<div class='col-sm-10-1' style='padding-left: 1%; padding-top: 5px; text-align: left;' id='pkgProCodNm-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}'>"
		+ "{$T.pkgprotstli.tstCod} - {$T.pkgprotstli.tstNm}</div>"
		+ "<input type='hidden' id='pkgProCodCharge-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}' value='{$T.pkgprotstli.tstRt}' /></div>"
		+ "{#param name=x value=1} {#foreach $T.pkgprotstli.lbpkgproli as lbpkgproli}"
		+ "<div class='col-sm-12-1' style='width: 92%; float: right; padding-bottom: 5px; margin-top: 0px; border-bottom: 1px solid #b8b8b8; border-left: 1px solid #b8b8b8; border-top: 0px solid #b8b8b8;'"
		+ "id='pkgproTestDiv-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}-{$T.lbpkgproli.idtst}'>"
		+ "<div class='divide-10'></div>"
		+ "<div class='col-sm-1-1'	style='text-align: center; border-left: 0px solid #b8b8b8; padding-top: 5px;'>"
		+ "<input type='checkbox' value='{$T.lbpkgproli.idtst}' id='pkgproTestcheck-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}-{$T.lbpkgproli.idtst}' /></div>"
		+ "<div class='col-sm-10-1' style='padding-left: 1%; padding-top: 5px; text-align: left;' id='pkgproTestNm-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}-{$T.lbpkgproli.idtst}'>{$T.lbpkgproli.tstCod} - {$T.lbpkgproli.tstNm}</div>"
		+ "<input type='hidden' id='pkgproTestCharge-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}-{$T.lbpkgproli.idtst}'	value='{$T.lbpkgproli.tstRt}' /></div>"
		+ "<input type='hidden' value='{$T.lbpkgproli.idtst}'	id='pkgProTestId-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}-{$P.x++}' />"
		+ "{#/for}<input type='hidden'	id='pkgproTestCount{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}' value='{--$P.x}' /></div>"
		+ "<input type='hidden' value='{$T.pkgprotstli.idprotst}' id='pkgProId-{$T.lbpkgli.idlbpkg}-{$P.xp++}' /> {#/if}"
		+ "{#if $T.pkgprotstli.typeTP=='T'}"
		+ "<div class='col-sm-12-1' style='width: 94%; float: right; margin-top: 0px; padding-bottom: 5px; border-bottom: 1px solid #b8b8b8; border-left: 1px solid #b8b8b8; border-top: 1px solid #b8b8b8;'"
		+ "id='pkgtestDiv{$T.pkgprotstli.idprotst}'>"
		+ "<div class='divide-10'></div>"
		+ "<div class='col-sm-1-1'	style='text-align: center; padding-top: 5px;'>"
		+ "<input type='checkbox' value='{$T.pkgprotstli.idprotst}' id='pkgtestcheck{$T.pkgprotstli.idprotst}' /></div>"
		+ "<div class='col-sm-10-1' style='padding-left: 1%; padding-top: 5px; text-align: left;' id='pkgtestNm-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}'>"
		+ "{$T.pkgprotstli.tcd} - {$T.pkgprotstli.tstNm} <input type='hidden' id='pkgtestCharge-{$T.lbpkgli.idlbpkg}-{$T.pkgprotstli.idprotst}' value='{$T.pkgprotstli.idprotst}' /></div></div>"
		+ "<input type='hidden' value='{$T.pkgprotstli.idprotst}' id='pkgTestId-{$T.lbpkgli.idlbpkg}-{$P.xt++}' />"
		+ "{#/if}{#/for} <input type='hidden'	id='pkgproCount{$T.lbpkgli.idlbpkg}' value='{--$P.xp}' />"
		+ "<input type='hidden' id='pkgTestCount{$T.lbpkgli.idlbpkg}' value='{--$P.xt}' /></div>"
		+ "{#/for} {#foreach $T.lbHedLi[0].lbProLi as lbProLi}"
		+ "<div style='width: 100%; margin-top: 20px;' id='proDiv{$T.lbProLi.proId}'>"
		+ "<div class='col-sm-12-1' style='border-bottom: 1px solid #b8b8b8; border-top: 0px solid #b8b8b8; padding-bottom: 5px;' id='proIdDiv{$T.lbProLi.proId}'>"
		+ "<div class='divide-20'></div>"
		+ "<div class='col-sm-1-1'	style='text-align: center; padding-top: 5px;'>"
		+ "<input type='checkbox' value='{$T.lbProLi.proId}' id='procheck{$T.lbProLi.proId}' onclick='sendProToAsign({$T.lbProLi.proId})' /></div>"
		+ "<div class='col-sm-10-1' style='padding-left: 1%; padding-top: 5px; text-align: left;' id='ProCodNm{$T.lbProLi.proId}'>{$T.lbProLi.proCode} - {$T.lbProLi.proNm}</div>"
		+ "<input type='hidden' id='ProCodCharge{$T.lbProLi.proId}' value='{$T.lbProLi.proChr}' /></div>"
		+ "{#param name=x value=1} {#foreach $T.lbProLi.protestLi as protestLi}"
		+ "<div class='col-sm-12-1' style='width: 94%; float: right; margin-top: 0px; padding-bottom: 5px; border-bottom: 1px solid #b8b8b8; border-left: 1px solid #b8b8b8; border-top: 0px solid blue;'"
		+ "id='proTestDiv-{$T.protestLi.testId}-{$T.lbProLi.proId}'>"
		+ "<div class='divide-10'></div>"
		+ "<div class='col-sm-1-1'	style='text-align: center; padding-top: 5px;'>"
		+ "<input type='checkbox' value='{$T.protestLi.testId}' id='proTestcheck-{$T.protestLi.testId}-{$T.lbProLi.proId}'"
		+ "id='proTestcheck{$T.lbProLi.proId}' onclick='sendProTestToAsign({$T.protestLi.testId},{$T.lbProLi.proId})' /></div>"
		+ "<div class='col-sm-10-1' style='padding-left: 1%; padding-top: 5px; text-align: left;' id='proTestNm-{$T.protestLi.testId}-{$T.lbProLi.proId}'>"
		+ "{$T.protestLi.tstCod} - {$T.protestLi.tstNm}</div>"
		+ "<input type='hidden' id='proTestCharge-{$T.protestLi.testId}-{$T.lbProLi.proId}' value='{$T.protestLi.tstRt}' /></div>"
		+ "<input type='hidden' value='{$T.protestLi.testId}'	id='ProTestId-{$T.lbProLi.proId}-{$P.x++}' /> {#/for}"
		+ "<input type='hidden' id='proTestCount{$T.lbProLi.proId}' value='{--$P.x}' /></div>"
		+ "{#/for} {#foreach $T.lbHedLi[0].lbTestLi as lbTestLi}"
		+ "<div class='col-sm-12-1' style='width: 100%; border-bottom: 1px solid #b8b8b8; padding-bottom: 5px; margin-top: 10px;' id='testDiv{$T.lbTestLi.tid}'>"
		+ "<div class='col-sm-1-1'	style='text-align: center; padding-top: 5px;'>"
		+ "<input type='checkbox' value='{$T.lbTestLi.tid}' id='testcheck{$T.lbTestLi.tid}' onclick='sendTestToAsign({$T.lbTestLi.tid})' /></div>"
		+ "<div class='col-sm-10-1' style='padding-left: 1%; padding-top: 5px; text-align: left;' id='testNm{$T.lbTestLi.tid}'>{$T.lbTestLi.tcd} - {$T.lbTestLi.tnm}"
		+ "<input type='hidden' id='testCharge{$T.lbTestLi.tid}' value='{$T.lbTestLi.trt}' /></div></div>{#/for}</div>";

// Touheed
// Date 15-Dec-2015
function setTemplate1(result) {
	var divContent = "<section  id='connected'><div  class='col-md-12-1' style='margin-top:0px;margin-left:-15px'><ol id='ol1' class='connected list right'><lh draggable='false'><font color='#4682B4'><b>Drag From Here..........!</b></font></lh>";
	// alert("result is"+result);
	for ( var i = 0; i < result.lbHedLi.length; i++) {
		for ( var j = 0; j < result.lbHedLi[0].lbProLi.length; j++) {
			// alert("code:"+result.lbHedLi[0].lbProLi[j].proChr);
			divContent = divContent + "<li title='Amount-"
					+ result.lbHedLi[0].lbProLi[j].proChr
					+ "'style= 'border: 1px solid #ffd2a6;'><b>"
					+ result.lbHedLi[0].lbProLi[j].proCode + "</b>-";
			divContent = divContent + "<b>"
					+ result.lbHedLi[0].lbProLi[j].proNm + ":</b>";
			divContent = divContent + "<input id='pro"
					+ result.lbHedLi[0].lbProLi[j].proId
					+ "' type='hidden' name='proid' value='"
					+ result.lbHedLi[0].lbProLi[j].proId + "'>";
			divContent = divContent + "<ol>";
			for ( var k = 0; k < result.lbHedLi[0].lbProLi[j].protestLi.length; k++) {
				// alert("Test
				// name:"+result.lbHedLi[0].lbProLi[j].protestLi[k].tstNm);
				/*
				 * divContent=divContent+ "<li style= 'border: 1px solid #ffe5cc;'>"+result.lbHedLi[0].lbProLi[j].protestLi[k].tstCod+" -
				 * "+result.lbHedLi[0].lbProLi[j].protestLi[k].tstNm;
				 * divContent=divContent+ "</li>";
				 */

				if (result.lbHedLi[0].lbProLi[j].protestLi[k].testId != 0) {

					divContent = divContent + "<input type='checkbox' id='test"
							+ result.lbHedLi[0].lbProLi[j].protestLi[k].testId
							+ "'  name='chk"
							+ result.lbHedLi[0].lbProLi[j].proId + "' value='"
							+ result.lbHedLi[0].lbProLi[j].protestLi[k].testId
							+ "' />"
							+ result.lbHedLi[0].lbProLi[j].protestLi[k].tstCod
							+ " - "
							+ result.lbHedLi[0].lbProLi[j].protestLi[k].tstNm
							+ "<br />";

				} else {

					divContent = divContent + "<lable><b>"
							+ result.lbHedLi[0].lbProLi[j].protestLi[k].hdnm
							+ "</b></lable><br />";

				}

				// alert("Test
				// id:"+result.lbHedLi[0].lbProLi[j].protestLi[k].testId);

			}

			divContent = divContent + "</ol></li>";
		}

		for ( var t = 0; t < result.lbHedLi[0].lbTestLi.length; t++) {
			// alert("lenth:----"+result.lbHedLi[0].lbTestLi.length);
			// alert("test:-----"+result.lbHedLi[0].lbTestLi[t].tnm);
			divContent = divContent + "<li title='Amount-"
					+ result.lbHedLi[0].lbTestLi[t].trt
					+ "' style= 'border: 1px solid #ddd;'>"
					+ result.lbHedLi[0].lbTestLi[t].tcd + " - "
					+ result.lbHedLi[0].lbTestLi[t].tnm;
			divContent = divContent + "<input id='tid"
					+ result.lbHedLi[0].lbTestLi[t].tid
					+ "' type='hidden' name='testid' value='"
					+ result.lbHedLi[0].lbTestLi[t].tid + "'>";
			divContent = divContent + "</li>";

		}
	}
	divContent = divContent + "</ol></div></section>";
	$("#leftDiv").html(divContent);

	var call = $("#headingCall").val();
	// alert(call);
	if (call == 0) {
		setTemplate2();
	}

	sort();
}
// Touheed
// Sorting data
// Date 15-Dec-2015
function sort() {
	$('.sortable').sortable();
	$('.handles').sortable({
		handle : 'span'
	});
	$('.connected').sortable({
		connectWith : '.demo'
	});
	$('.exclude').sortable({
		items : ':not(.disabled)'
	});

	var _gaq = _gaq || [];
	_gaq.push([ '_setAccount', 'UA-36251023-1' ]);
	_gaq.push([ '_trackPageview' ]);

	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl'
				: 'http://www')
				+ '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
}
// Touheed
// Sorting template left side
// Date 15-Dec-2015
function setTemplate2() {
	var divContent2 = "<div  class='col-md-12-1' style='margin-top:0px;margin-left:-15px'><ol id='ol2'  class='connected list left'>";
	divContent2 = divContent2
			+ "<lh draggable='false'><font color='#556B2F'><b>Drop Here..........!<b></font></lh></ol></div>";

	$("#rightDiv").html(divContent2);
}

function featchProAndTest(idHed, type) {
	if (type == "pkg") {

		idHed = $("#heading").val();

		if (idHed == "select") {
			return false;
		}

		proTestCount = 1;

		var inputs = [];
		inputs.push('action=featchProAndTest');
		inputs.push('idHed=' + idHed);
		inputs.push('type=' + type);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PathologyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				var ajax = r;
				// alert(ajax);
				var pobj11 = eval('(' + ajax + ')');
				$("#testDetails").html(ajax);
				if (pobj11.lbHedLi.length > 0) {
					// $("#testDiv").setTemplate(featchProAndTestTemp);
					$("#testDiv").setTemplate(
							$("#pathologyPackagesTemp").html());
					$("#testDiv").processTemplate(pobj11);

					// Touheed code for Lab Package Demo
					$("#strValue1").val("");
					setTemplate1(pobj11);
					$("#testDivPro").processTemplate(pobj11);
					$("#headingCall").val(1);
				}
			}
		});

	} else {
		$('input:checkbox[name=headchk]').attr("checked", false);
		$('input:checkbox[id=headcheck' + idHed + ']').attr("checked", true);
		var $radios = $('input:checkbox[id=headcheck' + idHed + ']');
		if ($radios.is(':checked') == true) {

			var hallid;
			var pageType = $("#pageType").val();
			if (pageType == "IPD") {
				var pobj = $("#divPatId").html();
				var myobj = eval('(' + pobj + ')');
				hallid = myobj.oBed.hi;
			} else {
				hallid = 0;
			}

			proTestCount = 1;
			var inputs = [];
			inputs.push('action=featchProAndTest');
			inputs.push('idHed=' + idHed);
			inputs.push('type=' + type);
			inputs.push('hallid=' + hallid);
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PathologyServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					var ajax = r;
					// alert(ajaxResponse);
					var pobj11 = eval('(' + ajax + ')');
					$("#testDetails").html(ajax);
					if (pobj11.lbHedLi.length > 0) {
						$("#testDiv").setTemplate(featchProAndTestTemp);
						$("#testDiv").processTemplate(pobj11);
					}

				}
			});
		}

	}

}
var tempDragDrop1 = "{#foreach $T.lbHedLi[0].lbTestLi as tli}"
		+ "<tr>"
		+ "<td>{count}.</td>"
		+ "<td title='{$T.tli.tcd},{$T.tli.trt}'>{$T.tli.tnm}</td>"
		+ "<input type='hidden' id='tid{$T.tli.tid}' value='{$T.tli.tid}' name='tk' />"
		+ "</tr> {count++}" + "{#/for}";

function searchProAndTest(type) {

	var idHeading = "";
	var strValue = "";
	var hallid = 0;

	if (type == "pkg") {
		idHeading = $("#heading").val();
		strValue = $("#strValue1").val();
	} else {

		var pageType = $("#pageType").val();
		if (pageType == "IPD") {
			var pobj = $("#divPatId").html();
			var myobj = eval('(' + pobj + ')');
			hallid = myobj.oBed.hi;
		} else {
			hallid = 0;
		}

		strValue = $("#strValue").val();
		$('input[name="headchk"]:checked').each(function() {
			idHeading = this.value;
		});
	}
	if (idHeading == "" || idHeading == "select") {

		alert("Please Select Heading To Search Test.");
		return false;
	} else if (strValue == "") {

		alert("Please Enter Test Name To Search.");
		return false;
	}

	proTestCount = 1;

	var inputs = [];
	inputs.push('action=SearchProAndTest');
	inputs.push('idHed=' + idHeading);
	inputs.push('strValue=' + strValue);
	inputs.push('type=' + type);
	inputs.push('hallid=' + hallid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajax = r;
			// alert(ajaxResponse);
			var pobj11 = eval('(' + ajax + ')');
			$("#testDetails").html(ajax);
			// alert(pobj11.lbHedLi.length);
			if (pobj11.lbHedLi[0].lbTestLi.length > 0
					|| pobj11.lbHedLi[0].lbpkgli.length > 0
					|| pobj11.lbHedLi[0].lbProLi.length > 0) {
				$("#testDiv").setTemplate(featchProAndTestTemp);
				$("#testDiv").processTemplate(pobj11);

				console.log(pobj11);
				// @code by Touheed for Profile Test search 15-Mar-2016
				count = 1;
				$("#tb1").setTemplate(tempDragDrop1);
				$("#tb1").processTemplate(pobj11);

				// Touheed Date 15-Dec-2015
				// Set Up template at search button in Lab Package Advanced
				$("#strValue1").val("");
				setTemplate1(pobj11);
			} else {
				alert("Test Is Not Found Under Current Heading");
			}
		}
	});
}

function sendPkgToAsign(pkgId) {

	var count = $("#testCount").val();
	var pkgCount = $("#pkgCount").val();

	for ( var k = 0; k < pkgCnt.length; k++) {
		if (pkgCnt[k] == pkgId) {
			alert("Sorry, You Can't Add Same Packege again !");
			return false;
		}
	}

	pkgCnt[pkgCnt.length] = pkgId;

	var $radios = $('input:checkbox[id=pkgcheck' + pkgId + ']');
	if ($radios.is(':checked') == true) {
		var pro = "";
		var test = "";

		var pkg = '<div style="width: 100%; margin-top:20px;" id="pkgAssignDiv'
				+ pkgId
				+ "-"
				+ pkgCount
				+ '">	<div class="col-sm-12-1" style="border-bottom: 1px solid #b8b8b8; padding-bottom: 5px;padding-top: 20px;" id="pkgIdDiv'
				+ pkgId
				+ '"><div class="col-sm-1-1" style="text-align: center; padding-top: 5px;"><input name="Assignprocheck" type="checkbox" value="'
				+ pkgId
				+ '"	id="Assignpkgcheck" checked="checked"	onclick=sendPkgToRemove("'
				+ pkgId
				+ '-'
				+ pkgCount
				+ '") /></div>	<div class="col-sm-8-1"	style="text-align: left; padding-top: 5px;"	id="PkgCodNm'
				+ pkgId
				+ '">'
				+ $("#PkgCodNm" + pkgId).html()
				+ '</div>	<div class="col-sm-2-1"	style="padding-left: 1%; padding-top: 5px; text-align: left;"	id="AssPkgCodCharge'
				+ pkgId + '">' + $("#PkgCodCharge" + pkgId).val()
				+ '</div></div>';

		var pkgproCount = $("#pkgproCount" + pkgId).val();

		for ( var i = 1; i <= pkgproCount; i++) {

			var proId = $("#pkgProId-" + pkgId + "-" + i).val();
			pro = pro
					+ '<div style="width: 94%;float : right; margin-top:8px;" id="pkgproAssignDiv'
					+ proId
					+ i
					+ '">	<div class="col-sm-12-1" style="border-top: 1px solid #b8b8b8; border-bottom: 1px solid #b8b8b8; border-left: 1px solid #b8b8b8; padding-bottom: 5px;"	id="pkgproIdDiv'
					+ proId
					+ '"><div class="divide-10"></div><div class="col-sm-1-1" style="text-align: center; border-right: 0px solid #069; border-left: 0px solid #069; padding-top: 5px;"><input name="Assignpkgprocheck" type="checkbox" value="'
					+ proId
					+ '"	id="pkgAssignprocheck'
					+ pkgId
					+ '" checked="checked" /></div>	<div class="col-sm-10-1" style="text-align: left; padding-top: 5px;"	id="pkgProCodNm'
					+ proId + '">'
					+ $("#pkgProCodNm-" + pkgId + "-" + proId).html()
					+ '</div></div>';

			var proTestLegth = $("#pkgproTestCount" + pkgId + "-" + proId)
					.val();

			for ( var k = 1; k <= proTestLegth; k++) {

				var testId = parseInt($(
						"#pkgProTestId-" + pkgId + "-" + proId + "-" + k).val());
				var testNm = $(
						"#pkgproTestNm-" + pkgId + "-" + proId + "-" + testId)
						.html();
				var testName = testNm.split('-');

				var testCharges = $(
						"#pkgproTestCharge-" + pkgId + "-" + proId + "-"
								+ testId).val();
				// $("#proTestcheck-" + testId + "-" + proId).attr("checked",
				// true);

				if (testId != 0 || testId != "0") { // @author : Touheed @date :
					// 29-Apr-2016
					pro = pro
							+ '<div class="col-sm-12-1"	style="width: 92%; margin-top:0px; border-bottom: 1px solid #b8b8b8; border-left: 1px solid #b8b8b8; float: right;padding-bottom: 5px;"	id="pkgAssignproTestDiv-'
							+ testId
							+ '-'
							+ proId
							+ '"><div class="divide-10"></div><div class="col-sm-1-1" style="text-align: center; padding-top: 5px;"><input type="checkbox" name="profileTest'
							+ proId
							+ '" value="'
							+ testId
							+ '"		id="pkgAssignproTestcheck'
							+ proId
							+ '" checked="checked" onclick=sendTestProToFormula('
							+ testId
							+ ','
							+ proId
							+ ')	/>	</div>	<div class="col-sm-10-1" style="padding-left: 1%; padding-top: 5px; text-align: left;"		id="pkgAssignproTestNm-'
							+ testId
							+ '-'
							+ proId
							+ '">	'
							+ testNm
							+ '<input type="hidden"	id="pkgAssignproTestCharge-'
							+ testId
							+ '-'
							+ proId
							+ '"  value="'
							+ testName[1]
							+ '" />	</div></div><input type="hidden" value="'
							+ testId
							+ '"	id="pkgAssignProTestId-'
							+ proId
							+ '-'
							+ k
							+ '" /><input type="hidden"	id="pkgAssignproTestCount'
							+ proId
							+ count
							+ '" value="'
							+ k
							+ '" /><input type="hidden" id="pkglabprotestresultid-'
							+ testId + '-' + proId + count + '" value="0">';

				}

			}
			pro = pro + "</div>";
		}

		var pkgTestCount = $("#pkgTestCount" + pkgId).val();
		for ( var j = 1; j <= pkgTestCount; j++) {
			var tid = $("#pkgTestId-" + pkgId + "-" + j).val();
			var testNm = $("#pkgtestNm-" + pkgId + "-" + tid).html();
			var testCharges = $("#pkgtestCharge-" + pkgId + "-" + tid).val();

			if (tid != 0 || tid != "0") { // @author : Touheed @date :
				// 29-Apr-2016

				test = test
						+ '<div class="col-sm-12-1" style="padding-bottom:5px; margin-top: 0px; width: 94%;float : right;border-left: 1px solid #b8b8b8; border-bottom: 1px solid #b8b8b8;border-top: 1px solid #b8b8b8;"	id="pkgtestAssignDiv'
						+ tid
						+ j
						+ '"><div class="divide-10"></div><div class="col-sm-1-1" style="text-align: center; padding-top: 5px;"><input type="checkbox" name="testAssigncheck" value="'
						+ tid
						+ '" id="pkgtestAssigncheck'
						+ pkgId
						+ '"  checked="checked"/></div><div class="col-sm-10-1"	style="padding-left: 1%; padding-top: 5px; text-align: left;"	id="pkgtestNm"'
						+ tid
						+ '">'
						+ testNm
						+ ' <input type="hidden"	id="pkgtestCharge"'
						+ tid
						+ '" value="'
						+ testCharges
						+ '" /></div><input type="hidden" id="pkglabtestresultid'
						+ tid + j + '" value="0"></div>';
			}

		}

		var end = "</div>";
		$('#assignTestDiv').append(pkg + pro + test + end);
		var total = parseFloat($("#PkgCodCharge" + pkgId).val())
				+ parseFloat($("#divtotalAmt").html());
		$("#divtotalAmt").html(total);
		count++;
		// procount++;
		pkgCount++;
		$("#testCount").val(count);
		// $("#profileCount").val(procount);
		$("#pkgCount").val(pkgCount);
		$('input:checkbox[id=pkgcheck' + pkgId + ']').attr("checked", false);

	} else {
		var total = 0;
		var amount = $("#divtotalAmt").html();
		if (amount == 0) {

			total = $("#divtotalAmt").html();
		} else {
			total = parseFloat($("#divtotalAmt").html())
					- parseFloat($("#ProCodCharge" + pkgId).val());
		}

		$("#divtotalAmt").html(total);
		$('#proAssignDiv' + pkgId).remove();
	}
}

function sendProToAsign(proId) {

	var count = $("#testCount").val();
	var procount = $("#profileCount").val();
	var $radios = $('input:checkbox[id=procheck' + proId + ']');
	if ($radios.is(':checked') == true) {

		var pro = '<div style="width: 100%;margin-top:20px;" id="proAssignDiv'
				+ proId
				+ procount
				+ '">	<div class="col-sm-12-1" style="border-bottom: 1px solid #b8b8b8; padding-bottom: 5px;padding-top:18px;"	id="proIdDiv'
				+ proId
				+ '"><div class="col-sm-1-1"	style="text-align: center; padding-top: 5px;"><input name="Assignprocheck" type="checkbox" value="'
				+ proId
				+ '"	id="Assignprocheck" checked="checked"	onclick=sendProTestToRemove("'
				+ proId
				+ '-'
				+ procount
				+ '") /></div>	<div class="col-sm-8-1" style="text-align: left; padding-top: 5px;"	id="ProCodNm'
				+ proId
				+ '">'
				+ $("#ProCodNm" + proId).html()
				+ '</div>	<div class="col-sm-2-1"	style="padding-left: 1%; padding-top: 5px; text-align: left;"	id="AssProCodCharge'
				+ proId + '">' + $("#ProCodCharge" + proId).val()
				+ '</div></div>';
		var proTestLegth = $("#proTestCount" + proId).val();
		var testDiv = "";
		for ( var k = 1; k <= proTestLegth; k++) {

			var testId = parseInt($("#ProTestId-" + proId + "-" + k).val());
			var testNm = $("#proTestNm-" + testId + "-" + proId).html();
			var testName = testNm.split('-');
			var testCharges = $("#proTestCharge-" + testId + "-" + proId).val();
			// $("#proTestcheck-" + testId + "-" + proId).attr("checked", true);
			testDiv = testDiv
					+ '<div class="col-sm-12-1"	style="width: 94%;border-bottom: 1px solid #b8b8b8; border-left: 1px solid #b8b8b8; float: right; margin-top:0px;"	id="AssignproTestDiv-'
					+ testId
					+ '-'
					+ proId
					+ '"><div class="divide-10"></div><div class="col-sm-1-1" style="padding-bottom:5px; text-align: center; padding-top: 5px;"><input type="checkbox" name="profileTest'
					+ proId
					+ '" value="'
					+ testId
					+ '" id="AssignproTestcheck'
					+ proId
					+ procount
					+ '" checked="checked"	onclick="sendTestProToFormula('
					+ testId
					+ ','
					+ proId
					+ ')" /></div><div class="col-sm-10-1" style="padding-left: 1%; padding-top: 5px; text-align: left;"		id="AssignproTestNm-'
					+ testId + '-' + proId + '">' + testNm
					+ '<input type="hidden"	id="pkgAssignproTestCharge-'
					+ testId + '-' + proId + '"  value="' + testName[1]
					+ '" />	</div></div><input type="hidden" value="' + testId
					+ '"	id="AssignProTestId-' + proId + '-' + k
					+ '" /><input type="hidden"	id="AssignproTestCount' + proId
					+ count + '" value="' + k
					+ '" /><input type="hidden" id="labprotestresultid-'
					+ testId + '-' + proId + count + '" value="0">';
			procount++;
		}
		var end = "</div>";
		$('#assignTestDiv').append(pro + testDiv + end);
		var total = parseFloat($("#ProCodCharge" + proId).val())
				+ parseFloat($("#divtotalAmt").html());
		$("#divtotalAmt").html(total);
		count++;

		$("#testCount").val(count);
		$("#profileCount").val(procount);
		$('input:checkbox[id=procheck' + proId + ']').attr("checked", false);

	} else {
		var total = 0;
		var amount = $("#divtotalAmt").html();
		if (amount == 0) {

			total = $("#divtotalAmt").html();
		} else {
			total = parseFloat($("#divtotalAmt").html())
					- parseFloat($("#ProCodCharge" + proId).val());
		}

		$("#divtotalAmt").html(total);
		$('#proAssignDiv' + proId).remove();
	}
}

function sendTestToAsign(tid) {
	var count = $("#testCount").val();
	var $radios = $('input:checkbox[id=testcheck' + tid + ']');
	if ($radios.is(':checked') == true) {

		// var testId = parseInt($("#ProTestId" + k).val());
		var testNm = $("#testNm" + tid).html();
		var testCharges = $("#testCharge" + tid).val();
		var test = '<div class="col-sm-12-1" style="border-bottom: 1px solid #b8b8b8; margin-top:0px; "	id="testAssignDiv'
				+ tid
				+ count
				+ '"><div class="divide-10"></div><div class="col-sm-1-1" style="text-align: center; padding-bottom: 5px; border-right: 0px solid orange; padding-top: 5px;"><input type="checkbox" name="testAssigncheck" value="'
				+ tid
				+ '" id="testAssigncheck" onclick=sendTestToRemove("'
				+ tid
				+ '-'
				+ count
				+ '")  checked="checked"/></div><div class="col-sm-8-1" style="padding-left: 1%; padding-top: 5px; text-align: left;" id=testNm'
				+ tid
				+ '>'
				+ testNm
				+ '</div><div class="col-sm-2-1" style="padding-left: 1%; padding-top: 5px; text-align: left;"	id="testAssignCharge'
				+ tid
				+ '">'
				+ testCharges
				+ '</div></div><input type="hidden" id="labtestresultid'
				+ tid
				+ count + '" value="0">';
		$('#assignTestDiv').append(test);
		var total = parseFloat(testCharges)
				+ parseFloat($("#divtotalAmt").html());
		$("#divtotalAmt").html(total);
		count++;
		$("#testCount").val(count);
		$('input:checkbox[id=testcheck' + tid + ']').attr("checked", false);
	} else {
		var total = 0;
		var amount = $("#divtotalAmt").html();
		if (amount == 0) {
			total = $("#divtotalAmt").html();

		} else {
			total = parseFloat($("#divtotalAmt").html())
					- parseFloat($("#testCharge" + tid).val());
		}

		$("#divtotalAmt").html(total);
		$('#testAssignDiv' + tid).remove();
	}
}

function saveAssignedTests(type, callFrom) {

	var labPatId = $.trim($("#labPatId").val());
	var pageType = $("#pageType").val();
	if (labPatId == "" || labPatId == undefined) {
		labPatId = 0;
	}
	var testResultMastId = $.trim($("#testResultMastId").val());
	if (testResultMastId == "" || testResultMastId == undefined) {
		testResultMastId = 0;
	}
	var trid = 0;
	var patId = 0;
	var initial = $.trim($("#initial").val());
	var pName = $.trim($("#pName").val());
	var sex = $.trim($("#sex").val());
	var doctor = $.trim($("#doctor").val());
	var address = encodeURIComponent($.trim($("#address").val()));
	var age = $.trim($("#age").val());
	var ageType = $.trim($("#ageType").val());
	var labresultFlag = "N";

	if (type == "opdTestAssign") {
		var checkFlag = $('#labresultFlag').is(':checked');
		if (checkFlag == true) {
			labresultFlag = $.trim($("#labresultFlag").val());
		}
	}
	var month = 0;
	var day = 0;

	var queryType = "insert";
	if ($("#pageType").val() == "DoctorDesk" || type == "opdTestAssign") {
		queryType = $.trim($("#pathologyqueryType").val());
	} else {
		queryType = $.trim($("#queryType").val());
	}

	if ($("#pageType").val() == "DoctorDesk") {
		queryType = "insert";
	}

	var emergency = 0;

	var $radios = $('input:checkbox[id=emergency]');
	if ($radios.is(':checked') == true) {
		emergency = 1;
	}

	var technician = $.trim($("#technician").val());

	var collectionDate = $.trim($("#collectionDate").val());
	var collectionTime = $.trim($("#collectionTime").val());
	var reportdueDate = $.trim($("#reportdueDate").val());
	var reportDueTime = $.trim($("#reportDueTime").val());

	var collDateOut = $.trim($("#collDateOut").val());
	var collTimeOut = $.trim($("#collTimeOut").val());

	var ptype = $.trim($("#pathospType :selected").val());
	var collcenter = $.trim($("#collcenter :selected").val());
	// var refpathoDocName = $.trim($("#doctor :selected").val());
	var chkOutSrc = 0;

	var $radios = $('input:checkbox[id=chkOutSrc]');
	if ($radios.is(':checked') == true) {
		chkOutSrc = 1;
	}

	if (type != "opdTestAssign") {

		if (pName == "") {
			alert("Please Enter Patient Name!");
			SetFocus("pName");
			return false;
		} else if (ptype == "select") {
			alert("Please select Patient type!");
			SetFocus("pName");
			return false;
		} else if (doctor == "0") {
			alert("Please Select Refer Doctor Name!");
			SetFocus("proNm");
			return false;
		} else if (age == "") {
			alert("Please Enter Age Of Patient!");
			SetFocus("age");
			return false;
		} else if (collectionDate == "") {
			alert("Please Select Collection Date!");
			SetFocus("collectionDate");
			return false;
		} else if (collectionTime == "") {
			alert("Please Select Collection Time!");
			SetFocus("collectionTime");
			return false;
		} else if (reportdueDate == "") {
			alert("Please Select Report Due Date!");
			SetFocus("reportdueDate");
			return false;
		} else if (reportDueTime == "") {
			alert("Please Select Select Report Due Time!");
			SetFocus("reportDueTime");
			return false;
		} else if (chkOutSrc == 1) {

			if (collectionDate == "") {
				alert("Please Select Collection Date!");
				SetFocus("collectionDate");
				return false;
			} else if (collectionTime == "") {
				alert("Please Select Collection Time!");
				SetFocus("collectionTime");
				return false;
			}

		}
	} else {
		/*
		 * if (doctor == "0") { alert("Please Select Refer Doctor Name!");
		 * SetFocus("proNm"); return false; }
		 */
		if (type == "opdTestAssign") {
			myObj1 = $("#divPatId").html();
			if (myObj1 == undefined) {
				myObj1 = $("#PreTre").html();
			}
		} else {
			myObj1 = $("#div1").html();
			if (myObj1 == undefined) {
				myObj1 = $("#PreTre").html();
			}
		}

		// alert(myObj1);
		myObj = JSON.parse(myObj1);

		trid = myObj.trid;
		patId = myObj.pi;
		initial = myObj.tit;
		pName = myObj.fn + " " + myObj.mn + " " + myObj.ln;
		sex = myObj.sx;

		if (myObj.a1 != "") {
			address = address + myObj.a1 + " ";
		}
		if (myObj.a2 != "") {
			address = address + myObj.a2 + " ";
		}
		if (myObj.a3 != "") {
			address = address + myObj.a3 + " ";
		}
		if (myObj.a4 != "") {
			address = address + myObj.a4 + " ";
		}
		if (myObj.a5 != "") {
			address = address + myObj.a5 + " ";
		}
		if (myObj.a6 != "") {
			address = address + myObj.a6 + " ";
		}

		age = myObj.ag;
		ageType = myObj.agtp;

		// @modifiedBy: Touheed @modifiedDate:11-Apr-2016
		// for age type condition
		month = myObj.month;
		day = myObj.days;

		if (myObj.ag == undefined) {
			age = 0;
		}
		if (myObj.agtp == undefined) {
			ageType = "";
		}

		// @modifiedBy: Touheed @modifiedDate:11-Apr-2016
		// for age type condition
		if (age != 0) {
			ageType = "Yrs";
		} else if (age == 0 && month != 0) {
			ageType = "Months";
			age = month;
		} else {
			ageType = "Days";
			age = day;
		}

		// alert("age type: "+ ageType);
		// alert("month::"+myObj.month);
		// alert("Days::"+myObj.days);
		// return false;

		technician = 0;
		collcenter = 0;
		ptype = 0;
		doctor = 0;

	}

	var allpkgfileVals = [];
	$.each($('#Assignpkgcheck:checked'), function() {
		allpkgfileVals.push($(this).val());
	});

	pkgTestValue = {
		rtli : []
	};
	// var k = 1;
	for ( var j = 1; j <= allpkgfileVals.length; j++) {

		var idlbpkg = allpkgfileVals[(j - 1)];

		var allpkgProfileVals = [];
		$.each($('#pkgAssignprocheck' + idlbpkg + ':checked'), function() {
			allpkgProfileVals.push($(this).val());
		});

		for ( var i = 1; i <= allpkgProfileVals.length; i++) {

			var profileId = allpkgProfileVals[(i - 1)];

			$.each($('#pkgAssignproTestcheck' + profileId + ':checked'),
					function() {
						var idtestresult = 0;

						var protestid = $(
								"#pkgAssignproTestlabtestresultid" + profileId
										+ $(this).val()).val();
						if (protestid != undefined) {
							idtestresult = protestid;
						}
						// k++;

						pkgTestValue.rtli.push({
							"tid" : ($(this).val()),
							"proid" : profileId,
							"idlbpkg" : idlbpkg,
							"rtid" : idtestresult,
							"pc" : i

						});
					});
		}

		$.each($('#pkgtestAssigncheck' + idlbpkg + ':checked'), function() {
			var idtestresult = 0;

			var testresultid = $(
					"#pkgtestlabtestresultid" + idlbpkg + $(this).val()).val();

			if (testresultid != undefined) {
				idtestresult = testresultid;
			}

			pkgTestValue.rtli.push({
				"tid" : ($(this).val()),
				"idlbpkg" : idlbpkg,
				"rtid" : idtestresult
			});
		});

	}

	var allprofileVals = [];
	$.each($('#Assignprocheck:checked'), function() {
		allprofileVals.push($(this).val());
	});
	var proCount = $("#profileCount").val();
	proTestValue = {
		rtli : []
	};
	var k = 1;
	for ( var i = 1; i <= allprofileVals.length; i++) {
		var profileId = allprofileVals[(i - 1)];
		for ( var z = 1; z < proCount; z++) {
			// alert($('#AssignproTestcheck' + profileId + z).val());
			if ($('#AssignproTestcheck' + profileId + z).is(':checked') == true) {

				var idtestresult = 0;
				var protestid = $(
						"#labprotestresultid"
								+ "-"
								+ $('#AssignproTestcheck' + profileId + z)
										.val() + "-" + profileId + z).val();
				if (protestid != undefined) {
					idtestresult = protestid;
				}
				k = z;
				proTestValue.rtli.push({
					"tid" : ($('#AssignproTestcheck' + profileId + z).val()),
					"proid" : profileId,
					"rtid" : idtestresult,
					"pc" : i

				});
			}
		}

	}

	testValue = {
		rtli : []
	};

	$.each($('#testAssigncheck:checked'), function() {
		var idtestresult = 0;
		var testId = $(this).val() + (k++);
		var testresultid = $("#labtestresultid" + testId).val();

		if (testresultid != undefined) {
			idtestresult = $("#labtestresultid" + testId).val();
		}

		if ($(this).val().length <= 4) {

			testValue.rtli.push({
				"tid" : ($(this).val()),
				"rtid" : idtestresult
			});
		}

	});

	/*
	 * if (queryType == "insert" && (testValue.rtli.length == 0 ||
	 * proTestValue.rtli.length == 0 || pkgTestValue.rtli.length == 0)) {
	 * alert("Please Assign At Least one Test To Save!"); return false; }
	 */

	/* validation for Pathology */
	if (testValue.rtli.length == 0) {
		if (proTestValue.rtli.length == 0) {
			if (pkgTestValue.rtli.length == 0 && queryType == "insert") {
				alert("Please Assign At Least one Test To Save!");
				return false;
			}
		}
	}

	var hallid = 0;
	if (pageType == "IPD") {
		var pobj = $("#divPatId").html();
		var myobj = eval('(' + pobj + ')');
		hallid = myobj.oBed.hi;
	} else {
		hallid = 0;
	}

	var inputs = [];
	inputs.push('action=SaveAssignTests');
	inputs.push('initial=' + initial);
	inputs.push('pName=' + encodeURIComponent(pName));
	inputs.push('sex=' + sex);
	inputs.push('doctor=' + doctor);
	inputs.push('address=' + encodeURIComponent(address));
	inputs.push('age=' + encodeURIComponent(age));
	inputs.push('ageType=' + encodeURIComponent(ageType));
	inputs.push('emergency=' + encodeURIComponent(emergency));
	inputs.push('technician=' + encodeURIComponent(technician));
	inputs.push('collectionDate=' + collectionDate);
	inputs.push('collectionTime=' + collectionTime);
	inputs.push('reportdueDate=' + reportdueDate);
	inputs.push('reportDueTime=' + reportDueTime);
	inputs.push('collDateOut=' + collDateOut);
	inputs.push('collTimeOut=' + collTimeOut);
	inputs.push('chkOutSrc=' + chkOutSrc);
	inputs.push('testValue=' + JSON.stringify(testValue));
	inputs.push('proTestValue='
			+ encodeURIComponent(JSON.stringify(proTestValue)));

	inputs.push('pkgTestValue=' + JSON.stringify(pkgTestValue));
	inputs.push('ptype=' + ptype);
	inputs.push('collcenter=' + encodeURIComponent(collcenter));
	inputs.push('amount=' + encodeURIComponent($("#divtotalAmt").html()));
	inputs.push('trid=' + trid);
	inputs.push('patId=' + patId);
	inputs.push('queryType=' + queryType);
	inputs.push('labPatId=' + labPatId);
	inputs.push('testResultMastId=' + testResultMastId);
	inputs.push('hallid=' + hallid);
	inputs.push('labresultFlag=' + labresultFlag);
	inputs.push('callFrom=' + callFrom);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			alert(ajaxResponse);
			// fetchTestDashboard();
			// featchPreviousLabTestOfPat();
			location.reload();
			/*
			 * if (ajaxResponse == "Test Assign Successfully.") window.location =
			 * 'PathologyPatientAssignTestDashboard.jsp';
			 */
		}
	});

}

/** ***************** Lab Assign Test End ****************** */

/** ************* Lab Heading start ***************** */

var editHeadingTemp = "<div	style='height: 97.5%; border: 1px solid #ddd;' >"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Edit Heading</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Heading Name'>Heading Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='headNm' name='headNm' type='text' placeholder='Heading Name' value='{$T.hedNm}' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Heading Code'>Heading Code<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='hcode' name='hcode' type='text' placeholder='Heading Code' value='{$T.hcod}'"
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service Charges'>Note:<b style='color: red; padding-left: 3px;'></b></label>"
		+ "<textarea rows='3' cols='23' id='note' placeholder='Note' class='col-md-7-1'"
		+ "required='true' style='margin-left:0%;'>{$T.spclNt}</textarea></div>"
		+ "<input type='hidden' id='idHed' value='{$T.idHed}'><input type='hidden' id='queryType' value='update'></div></div>";

function editGroup(idtg) {

	$("#userID").val(idtg);
	ajaxResponse = $("#userObj").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.lbHedLi.length; i++) {

		if (myArray.lbHedLi[i].idHed == idtg) {
			myObj1 = myArray.lbHedLi[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj1);
	var myEscapedJSONString = (myObj.decodeSpecialChars());
	userBean = eval('(' + myEscapedJSONString + ')');

	$("#infoDiv").setTemplate(editHeadingTemp);
	$("#infoDiv").processTemplate(userBean);

}

var defaultHeadingsTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 98%; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>ID</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Heading Name</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Code</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 410px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.lbHedLi as lbHedLi}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.lbHedLi.idHed}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;' id='uname{count}'>{$T.lbHedLi.hedNm}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.lbHedLi.hcod}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onclick='editGroup({$T.lbHedLi.idHed})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='DELETE' id='btnDelete{count}' onClick='deleteGroup({$T.lbHedLi.idHed})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

var addHeadingTemp = "<div	style='height: 97.5%; border: 1px solid #ddd;' id='addViewGroupTemp'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Add Heading</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Heading Name'>Heading Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='headNm' name='headNm' type='text' placeholder='Heading Name' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Heading Code'>Heading Code<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='hcode' name='hcode' type='text' placeholder='Heading Code' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/>"
		+ "<input type='hidden' id='idHed' value='0'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Note'>Note:</label>"
		+ "<textarea rows='3' cols='23' id='note' placeholder='Note' class='col-md-7-1'"
		+ "required='true' style='margin-left:0%;'></textarea></div>"
		+ "<input type='hidden' id='queryType' value='insert'></div></div>";

function getGroups(type) {

	var byName = $("#byName").val();
	if (byName == "" && type == "search") {
		alert("Please Insert Heading Name For Search");
		return false;
	}
	var inputs = [];
	inputs.push('action=getGroups');
	inputs.push('byName=' + encodeURIComponent(byName));
	inputs.push('type=' + type);
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
			// alert(r);
			ajaxResponse = r;
			count = 1;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#userObj").html(ajaxResponse);

			if (pobj1.lbHedLi.length == 0) {

				alert("Heading Name Not Found.");

			} else {
				$("#userMangTemp").setTemplate(defaultHeadingsTemp);
				$("#userMangTemp").processTemplate(pobj1);
				$("#byName").val("");
			}

			var sample = "";
			$("#infoDiv").setTemplate(addHeadingTemp);
			$("#infoDiv").processTemplate(sample);
		}
	});
}

function saveGroups() {
	var groupName = $.trim($("#headNm").val());
	var hcode = $.trim($("#hcode").val());
	var note = $.trim($("#note").val());

	var queryType = $.trim($("#queryType").val());

	var idHed = $.trim($("#idHed").val());

	if (groupName == "") {
		alert("Please Enter Heading Name!");
		SetFocus("headNm");
		return false;
	}
	if (hcode == "") {
		alert("Please Enter Heading Code!");
		SetFocus("hcode");
		return false;
	}
	var inputs = [];
	inputs.push('action=saveGroups');
	inputs.push('groupName=' + encodeURIComponent(groupName));
	inputs.push('note=' + encodeURIComponent(note));
	inputs.push('queryType=' + queryType);
	inputs.push('Code=' + hcode);
	inputs.push('idHed=' + idHed);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			alert(ajaxResponse);
			window.location = 'PathologyGroups.jsp';
		}
	});

}

function deleteGroup(idGroup) {
	var r = confirm("Are You Confirm To Remove Heading.");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteGroups');
		inputs.push('idGroup=' + idGroup);
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
				alert(ajaxResponse);
				location.reload();

			}
		});
	}
}
/** ************* Lab Heading End ***************** */

/** ***************** Lab Profile Start ****************** */

var getAllHeadingTemp = '<option value="0">SELECT</option>{#foreach $T.lbHedLi as lbHedLi}<option value="{$T.lbHedLi.idHed}">{$T.lbHedLi.hcod} - {$T.lbHedLi.hedNm}</option>{#/for}';

var getAllHeadingPKGTemp = '<option value="select">SELECT</option>{#foreach $T.lbHedLi as lbHedLi}<option value="{$T.lbHedLi.idHed}"  >{$T.lbHedLi.hcod} - {$T.lbHedLi.hedNm}</option>{#/for}';

var HeadingDivTemp = '{#foreach $T.lbHedLi as lbHedLi}'
		+ '<tr><td class="col-md-1-1" style="margin-top:-7px;">'
		+ '<input type="checkbox" value="{$T.lbHedLi.idHed}" id="headcheck{$T.lbHedLi.idHed}" name="headchk" onclick=featchProAndTest({$T.lbHedLi.idHed},"assign") /></td>'
		+ '<td class="col-md-10-1" style="margin-top:-2px;">{$T.lbHedLi.hcod} - {$T.lbHedLi.hedNm}</td></tr>{#/for}';

function getAllHeading(type, pageNm) {
	// alert(type);
	var strValue = null;
	var heading_id = 0;
	if (type == "onload") {
		$("#txtTestHeadingSearch").val("");
		strValue = "";
		heading_id = 0;
	} else if (type == "search") {
		strValue = $("#txtTestHeadingSearch").val();
		heading_id = $("#headingId").val();
	}

	var inputs = [];
	inputs.push('action=getGroups');
	inputs.push('byName=' + strValue);
	inputs.push('heading_id=' + heading_id);
	inputs.push('type=' + type);
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
			count = 1;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.lbHedLi.length > 0) {
				if (pageNm == "assignTest") {
					$("#HeadingDiv").setTemplate(HeadingDivTemp);
					$("#HeadingDiv").processTemplate(pobj1);
				} else if (pageNm == "onPkgAdd") {
					$("#heading").setTemplate(getAllHeadingPKGTemp);
					$("#heading").processTemplate(pobj1);

					$("#allHeadingDiv").html(ajaxResponse);

				} else {
					$("#heading").setTemplate(getAllHeadingTemp);
					$("#heading").processTemplate(pobj1);
				}
			} else {
				$("#HeadingDiv").html('<option value="0">SELECT</option>');
				$("#heading").html('<option value="0">SELECT</option>');
			}
		}
	});
}

var temp1 = "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Test Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Code</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Charges</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Select</div></th>"
		+ "</tr>"
		+ "</thead>"
		+ "<tbody>"
		+ "	{#foreach $T.tli as tli}"
		+ "<tr>"
		+ "<td class='col-md-1-1 center'>{count}.</td>"
		+ "<td class='col-md-3-1 center' id='txtTestNm{count}'>{$T.tli.tnm}</td>"
		+ "<td class='numeric col-md-1-1 center' id='testCode{count}'>{$T.tli.tcd}</td>"
		+ "<td class='numeric col-md-1-1 center' id='testCharge{count}'>{$T.tli.trt}</td>"
		+ "<td class='numeric col-md-1-1 center'><input id='checkbox{count++}' type='checkbox' value='{$T.tli.tid}' /></td>"
		+ "</tr>"
		+ "{#/for}"
		+ "<input type='hidden' id='testRowCount' value='{--count}' />"
		+ "</tbody></table>";

/*
 * var tempDemo = "<table id='tableDemo' class='table table-striped
 * table-condensed cf'>" + " {#foreach $T.tli as tli}" + "<tr id='tableDemo{count}' draggable='true' ondragstart='drag(event)'>" + "<td class='col-md-1-1 center'>{count}.</td>" + "<td class='col-md-3-1 center' id='txtTestNm{count}'>{$T.tli.tnm}</td>" + "<td class='numeric col-md-1-1 center' id='testCode{count}'>{$T.tli.tcd}</td>" + "<td class='numeric col-md-1-1 center' id='testCharge{count}'>{$T.tli.trt}</td>" + "<td class='numeric col-md-1-1 center'><input
 * id='checkbox{count++}' type='checkbox' value='{$T.tli.tid}' /></td>" + "</tr>" +
 * "{#/for}" + "<input type='hidden' id='testRowCount' value='{--count}' />" + "</tbody></table>";
 */

// Touheed Code for profile demo
// Date 04-Dec-2015
var pdeatails = "";

var tempDemo = "<table id='tableDemo' class='table table-striped table-condensed cf'>"
		+ "	{#foreach $T.tli as tli}"
		+ "<tr id='tableDemo{count}' draggable='true' ondragstart='drag(event)'>"
		+ "<td class='col-md-1-1 center'>{count}.</td>"
		+ "<td class='col-md-3-1 center' id='txtTestNm{count}' title='{$T.tli.tcd},{$T.tli.trt}'>{$T.tli.tnm}</td>"
		+ "<input type='hidden' id='' value='{count++}' />"
		+ "</tr>"
		+ "{#/for}"
		+ "<input type='hidden' id='testRowCount' value='{--count}' />"
		+ "</tbody></table>";

var tempDragDrop = "{#foreach $T.tli as tli}"
		+ "<tr>"
		+ "<td>{count}.</td>"
		+ "<td title='{$T.tli.tcd},{$T.tli.trt}'>{$T.tli.tnm}</td>"
		+ "<input type='hidden' id='tid{$T.tli.tid}' value='{$T.tli.tid}' name='tk' />"
		+ "</tr> {count++}" + "{#/for}";

var enableDropdown = "<table  id='table-draggable2' class='table table-striped table-condensed cf'>"
		+ "<tbody class='connectedSortable' id='tb2'>"
		+ "<tr> <th> <th></tr>"
		+ "</tbody></table>";

function featchTeastUnderHeading() {

	var heading = $.trim($("#heading").val());
	/*
	 * if (heading == "select") { alert("Please Select Heading To Get Test.");
	 * $("#divTest").html(""); return false; }
	 */
	var inputs = [];
	inputs.push('action=featchTeastUnderHeading');
	inputs.push('headingId=' + heading);
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
			count = 1;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#divTest").html("");
			if (pobj1.tli.length > 0) {
				$("#divTest").setTemplate(temp1);
				$("#divTest").processTemplate(pobj1);
				// Touheed Demo
				/*
				 * $("#divTestDemo").setTemplate(tempDemo);
				 * $("#divTestDemo").processTemplate(pobj1);
				 */
				count = 1;
				$("#tb1").setTemplate(tempDragDrop);
				$("#tb1").processTemplate(pobj1);
				$("#proDemo").html(ajaxResponse);

				/*
				 * var callTime = $("#callTime").val(); //alert(callTime);
				 * if(callTime == 0){ makeDivEmptyt2(); }
				 */
				// makeDivEmptyt2();
				$("#callTime").val(1);

			} else {
				$("#tb1").processTemplate("");
			}
		}
	});
}

var editProfileTemp = "<div	style='height: 97.5%; border: 1px solid #ddd;' id='addViewProfileTemp'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Edit Profile</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Heading Name'>Heading Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<select id='heading' name='heading' onchange='featchTeastUnderHeading()' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' ></select></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Profile Name'>Profile Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='proNm' name='proNm' type='text' placeholder='Profile Name' value='{$T.proNm}' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/>"
		+ "<input type='hidden' id='idPro' value='{$T.proId}'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Profile Code'>Profile Code<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='proCode' name='proCode' type='text' placeholder='Profile Code' value='{$T.proCode}' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Profile Charges'>Profile Charges:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='proCharge' name='proCharge' type='text' placeholder='Profile Charges' value='{$T.proChr}' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='10' onkeypress='return validateNumbers(event)' />"
		+ "<input type='hidden' id='queryType' value='update' /></div></div></div>"
		+ "<div class='divide-40'></div>"
		+ "<div id='divTest' style='border:1px solid #ddd; height: 175px; overflow-y: scroll;' class='col-md-12-1'></div>";

function editProfile(idtg) {

	$("#userID").val(idtg);
	ajaxResponse = $("#userObj").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.proLi.length; i++) {

		if (myArray.proLi[i].proId == idtg) {
			myObj1 = myArray.proLi[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj1);

	var myEscapedJSONString = (myObj.decodeSpecialChars());
	userBean = eval('(' + myEscapedJSONString + ')');

	$("#infoDiv").setTemplate(editProfileTemp);
	$("#infoDiv").processTemplate(userBean);
	getAllHeading("onload");

	setTimeout(function() {

		$("#heading").val(userBean.hedId);
		featchTeastUnderHeading();

		setTimeout(function() {
			var testRowCount = $.trim($("#testRowCount").val());

			for ( var j = 1; j <= testRowCount; j++) {
				var chkmdi = $("#checkbox" + j).val();

				for ( var i = 0; i < userBean.protestLi.length; i++) {
					if (chkmdi == userBean.protestLi[i].testId) {

						$("#checkbox" + j).attr('checked', true);
					}
				}
			}
		}, 300);
	}, 300);
}

// Touheed code for Lab profile demo
// Date Dec-08-2015

// Added by Laxman for select default first heading and their Test.
function addProfileDemo() {

	$("#txtInterpretation").val("");
	$("#txtComments").val("");

	var length = ($('#heading').children('option').length) - 1;
	if (length > 0) {
		$("#heading").val($("#heading option:eq(1)").val());
		featchTeastUnderHeading();
	} else {
		$("#heading").val($("#heading option:eq(0)").val());
		featchTeastUnderHeading();
	}

}
function editProfileDemo(idtg) {

	$("#userID").val(idtg);
	ajaxResponse = $("#userObj").html();

	var temp = eval('(' + ajaxResponse + ')');
	for ( var i = 0; i < temp.proLi.length; i++) {
		if (temp.proLi[i].proId == idtg) {
			myObj1 = temp.proLi[i];
			break;
		}
	}

	myObj = JSON.stringify(myObj1);

	$("#testHead").html("Edit Profile");
	// $("#heading").val(myObj1.hedId);
	$("#proNm").val(myObj1.proNm);
	$("#proCode").val(myObj1.proCode);
	$("#proCharge").val(myObj1.proChr);
	$("#motivatorCash").val(myObj1.motivatorCash);
	$("#motivatorSponsored").val(myObj1.motivatorSponsored);
	$("#txtClinicPercent").val(myObj1.clinicPercent);
	$("#queryType").val("update");
	$("#idPro").val(idtg);
	$("#edit").val(1);
	// Added by Laxman
	$("#serviceid").val(myObj1.serviceid);
	$("#subserviceid").val(myObj1.subserviceid);
	$("#categorycharges").val(myObj1.proChr);
	$("#proCode").val(myObj1.proCode);
	$("#txtInterpretation").val(myObj1.proInterpretation);
	$("#txtComments").val(myObj1.proComments);

	// alert("interpretation :"+$("#txtInterpretation").val());
	// alert("comments :"+$("#txtComments").val());
	// inside div make tb2 table empty
	var fake = $("#fake").html();
	pobj1 = eval('(' + fake + ')');
	/*
	 * $("#tb2").setTemplate(tempDragDrop); $("#tb2").processTemplate(pobj1);
	 */

	setTimeout(
			function() {
				var length = ($('#heading').children('option').length) - 1;
				if (length > 0) {
					$("#heading").val($("#heading option:eq(1)").val());
					featchTeastUnderHeading();
				} else {
					$("#heading").val($("#heading option:eq(0)").val());
					featchTeastUnderHeading();
				}
				setTimeout(
						function() {
							// var ajaxTestList = $("#proDemo").html();
							var ajaxProTeList = $("#userObj").html();

							// var ajTL = JSON.parse(ajaxTestList);
							var ajProTL = JSON.parse(ajaxProTeList);

							var ct = 0;
							for ( var i = 0; i < ajProTL.proLi.length; i++) {

								if (ajProTL.proLi[i].proId == idtg) {

									for ( var j = 0; j < ajProTL.proLi[i].protestLi.length; j++) {

										// for(var a=0; a<ajTL.tli.length; a++){

										// if(ajTL.tli[a].tid ==
										// ajProTL.proLi[i].protestLi[j].testId){
										// Count incrasing
										// }

										// }

										if (0 == ajProTL.proLi[i].protestLi[j].testId) {

											$("#tb2")
													.append(
															"<tr>"
																	+ "<td></td>"
																	+ "<td>"
																	+ ajProTL.proLi[i].protestLi[j].hdnm
																	+ "</td>"
																	+ "<td>"
																	+ "<input type='hidden'"
																	+ " value='"
																	+ ajProTL.proLi[i].protestLi[j].hdnm
																	+ "'"
																	+ "name='hd' />"
																	+ "</td>"
																	+ "</tr>");

										} else {
											ct++;
											// inserting table rows in the tb2
											$("#tb2")
													.append(
															"<tr>"
																	+ "<td>"
																	+ ct
																	+ ".</td>"
																	+ "<td title='"
																	+ ajProTL.proLi[i].protestLi[j].tstCod
																	+ ","
																	+ ajProTL.proLi[i].protestLi[j].tstRt
																	+ "'>"
																	+ ajProTL.proLi[i].protestLi[j].tstNm
																	+ "</td>"
																	+ "<td>"
																	+ "<input type='hidden' id='tid"
																	+ ajProTL.proLi[i].protestLi[j].testId
																	+ "'"
																	+ " value='"
																	+ ajProTL.proLi[i].protestLi[j].testId
																	+ "'"
																	+ "name='tk' />"
																	+ "</td>"
																	+ "</tr>");
										}
									}
								}
							}
						}, 300);

			}, 300);
}

var getProfileTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 98%; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>ID</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Profile Name</div></th>"
		+ "<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Code</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 410px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.proLi as proLi}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.proLi.proId}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;' id='uname{count}'>{$T.proLi.proNm}</td>"
		+ "<td class='col-sm-1-1' style='height: 21.5px;'>{$T.proLi.proCode}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onclick='editProfile({$T.proLi.proId})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='DELETE' id='btnDelete{count}' onClick='deleteProfile({$T.proLi.proId})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

// Touheed Code for Profile Demo
var getProfileTempDemo = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 100%; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>ID</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Profile Name</div></th>"
		+ "<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Code</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 410px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.proLi as proLi}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.proLi.proId}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;' id='uname{count}'>{$T.proLi.proNm}</td>"
		+ "<td class='col-sm-1-1' style='height: 21.5px;'>{$T.proLi.proCode}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onclick='editProfileDemo({$T.proLi.proId})' data-target='#popProfile' data-toggle='modal'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='DELETE' id='btnDelete{count}' onClick='deleteProfile({$T.proLi.proId})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

var addProfileTemp = "<div	style='height: 97.5%; border: 1px solid #ddd;' id='addViewProfileTemp'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Add Profile</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Heading Name'>Heading Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<select id='heading' name='heading' onchange='featchTeastUnderHeading()' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' ></select></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Profile Name'>Profile Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='proNm' name='proNm' type='text' placeholder='Profile Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/>"
		+ "<input type='hidden' id='idPro' value='0'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Profile Code'>Profile Code<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='proCode' name='proCode' type='text' placeholder='Profile Code' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Profile Charges'>Profile Charges:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='proCharge' name='proCharge' type='text' placeholder='Profile Charges' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='10' onkeypress='return validateNumbers(event)' />"
		+ "<input type='hidden' id='queryType' value='insert' /></div></div></div>"
		+ "<div class='divide-40'></div>"
		+ "<div id='divTest' style='border:1px solid #ddd; height: 175px; overflow-y: scroll;' class='col-md-12-1'></div>";

function getProfiles(fetchtype, type) {

	var byName = $.trim($("#byName").val());
	if (byName == "" && fetchtype == "search") {
		alert("Please Insert Profile Name For Search");
		return false;
	}
	var inputs = [];
	inputs.push('action=getProfiles');
	inputs.push('byName=' + encodeURIComponent(byName));
	inputs.push('type=' + type);
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
					count = 1;
					testObj = eval('(' + ajaxResponse + ')');
					$("#userObj").html(ajaxResponse);
					if (type == "charges") {

						$('#labProfileTab > thead > tr:nth-child(n+2)')
								.remove();
						$('#labProfileTab > tbody > tr:nth-child(n+2)')
								.remove();

						var halllist = $("#InvTestAllHallDetails").html();
						var halldetails = eval('(' + halllist + ')');

						var ProfileCharges = "<tr id = 'headerTr'>"
								+ "<th class='center' style = 'width: 30px;'><div class='TextFont'>ID</div></th>"
								+ "<th class='' style = 'width: 200px;'><div class='TextFont'>Lab Profile Name</div></th>"
								+ "<th class='' style = 'width: 100px;'><div class='TextFont'>Profile Code</div></th>"
								+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>OPD Charges</div></th>";

						$
								.each(
										halldetails.hl,
										function(name, value) {
											ProfileCharges = ProfileCharges
													+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>"
													+ value.hn + "</div></th>";
										});
						ProfileCharges = ProfileCharges + "</tr>";
						$('#InvstTestHeading').after(ProfileCharges);

						// var count = 1;
						$
								.each(
										testObj.proLi,
										function(name, value) {
											var Profilebody = "";
											Profilebody = Profilebody
													+ "<tr id=Test"
													+ count
													+ "><td class='center' style='height: 21.5px;width: 30px;'>"
													+ value.proId
													+ "</td><td class='' style='height: 21.5px;width: 200px;'>"
													+ value.proNm
													+ "</td><td class='' style='height: 21.5px;width: 100px;'>"
													+ value.proCode + "</td>";

											var profileChrgs = 0;
											var slaveid = 0;
											var hallid = 0;

											if (value.hallWsTestChrgsList.length > 0) {
												for ( var j = 0; j < value.hallWsTestChrgsList.length; j++) {
													if (value.hallWsTestChrgsList[j].hallID == 0) {
														profileChrgs = value.hallWsTestChrgsList[j].chrgs;
														slaveid = value.hallWsTestChrgsList[j].slaveId;
														hallid = 0;

														Profilebody = Profilebody
																+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
																+ value.proId
																+ "-HallID"
																+ hallid
																+ " value = '"
																+ profileChrgs
																+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'labprofilechargesslaveID"
																+ value.proId
																+ "-"
																+ hallid
																+ "' value = '"
																+ slaveid
																+ "' /></td>";
													}
												}
											} else {
												Profilebody = Profilebody
														+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
														+ value.proId
														+ "-HallID"
														+ hallid
														+ " value = '"
														+ value.proChr
														+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'labprofilechargesslaveID"
														+ value.proId + "-"
														+ hallid
														+ "' value = '"
														+ slaveid + "' /></td>";
											}

											$
													.each(
															halldetails.hl,
															function(name,
																	hallvalue) {

																var isPresent = 0;
																for ( var i = 0; i < value.hallWsTestChrgsList.length; i++) {
																	if (hallvalue.hi == value.hallWsTestChrgsList[i].hallID) {
																		profileChrgs = value.hallWsTestChrgsList[i].chrgs;
																		slaveid = value.hallWsTestChrgsList[i].slaveId;
																		hallid = value.hallWsTestChrgsList[i].hallID;
																		isPresent = 1;
																		break;
																	}
																}
																if (isPresent > 0) {
																	Profilebody = Profilebody
																			+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
																			+ value.proId
																			+ "-HallID"
																			+ hallid
																			+ " value = '"
																			+ profileChrgs
																			+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'labprofilechargesslaveID"
																			+ value.proId
																			+ "-"
																			+ hallid
																			+ "' value = '"
																			+ slaveid
																			+ "' /></td>";
																} else {
																	/*
																	 * if(fetchtype !=
																	 * "onload") {
																	 * alert("Record
																	 * Not
																	 * Found");
																	 * setFocus("byName"); }
																	 */

																	profileChrgs = value.proChr;
																	slaveid = 0;
																	hallid = hallvalue.hi;

																	Profilebody = Profilebody
																			+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
																			+ value.proId
																			+ "-HallID"
																			+ hallid
																			+ " value = '"
																			+ profileChrgs
																			+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'labprofilechargesslaveID"
																			+ value.proId
																			+ "-"
																			+ hallid
																			+ "' value = '"
																			+ slaveid
																			+ "' /></td>";
																}
															});

											Profilebody = Profilebody + "</tr>";

											$('#Test' + (count - 1)).after(
													Profilebody);
											count++;
										});

					} else {

						if (testObj.proLi.length == 0) {
							alert("Lab Profile Name Not Found.");
						} else {

							$("#userMangTemp").setTemplate(getProfileTemp);
							$("#userMangTemp").processTemplate(testObj);
							// Touheed for Deomo 03-Dec-2015
							$("#userMangTempDemo").setTemplate(
									getProfileTempDemo);
							$("#userMangTempDemo").processTemplate(testObj);
						}
						var sample = "";
						$("#infoDiv").setTemplate(addProfileTemp);
						$("#infoDiv").processTemplate(sample);
					}

					$("#byName").val("");
				}
			});

}

// Function to save Hall wise charges of laboratory Profiles

function saveLabProfileChargesSlave() {

	var result = $("#userObj").html();
	var testObj = eval('(' + result + ')');
	var halllist = $("#InvTestAllHallDetails").html();
	var halldetails = eval('(' + halllist + ')');

	var profileObj = 0;

	profileObj = {
		proLi : []

	};

	for ( var i = 0; i < testObj.proLi.length; i++) {

		var testid = testObj.proLi[i].proId;
		var hallid = 0;
		var charges = $("#TestID" + testid + "-HallID0").val();
		var slaveid = $("#labprofilechargesslaveID" + testid + "-0").val();

		if (charges == "" || charges == null || charges == undefined) {
			charges = 0;
		}

		var hallwschrgslist = [];

		hallwschrgslist.push({
			"hallID" : hallid,
			"testID" : testid,
			"chrgs" : charges,
			"slaveId" : slaveid,
		});

		for ( var j = 0; j < halldetails.hl.length; j++) {
			var hlid = halldetails.hl[j].hi;
			var chrg = $("#TestID" + testid + "-HallID" + hlid).val();
			var slvid = $("#labprofilechargesslaveID" + testid + "-" + hlid)
					.val();

			if (chrg == "" || chrg == null || chrg == undefined) {
				chrg = 0;
			}

			hallwschrgslist.push({
				"hallID" : hlid,
				"testID" : testid,
				"chrgs" : chrg,
				"slaveId" : slvid
			});
		}

		profileObj.proLi.push({
			"hallWsTestChrgsList" : hallwschrgslist,
			"proId" : testid
		});

	}

	profileObj = JSON.stringify(profileObj);
	var inputs = [];
	inputs.push('action=saveLabProfileHallWiseCharges');
	inputs.push('profileObj=' + encodeURIComponent(profileObj));
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
			alert(r);
			location.reload();
		}
	});
}

function saveProfiles() {

	var heading = $.trim($("#heading").val());
	var proNm = $.trim($("#proNm").val());
	var proCode = $.trim($("#proCode").val());
	var proCharge = $.trim($("#proCharge").val());
	var queryType = $.trim($("#queryType").val());
	var idPro = $.trim($("#idPro").val());

	var testRowCount = $.trim($("#testRowCount").val());

	var testLi = [];

	for ( var i = 1; i <= testRowCount; i++) {

		var $radios = $('input:checkbox[id=checkbox' + i + ']');
		if ($radios.is(':checked') == true) {
			testLi.push($radios.val());
		}
	}

	if (heading == "select") {
		alert("Please Select Heading Name!");
		SetFocus("heading");
		return false;
	} else if (proNm == "") {
		alert("Please Enter Lab Profile Name!");
		SetFocus("proNm");
		return false;
	} else if (proCode == "") {
		alert("Please Enter Lab Profile Code!");
		SetFocus("proCode");
		return false;
	} else if (proCharge == "") {
		alert("Please Enter Lab Profile Charges!");
		SetFocus("proCharge");
		return false;
	} else if (testLi.length == 0) {
		alert("Please Select Lab Test!");
		return false;
	}

	var inputs = [];
	inputs.push('action=saveLabProfile');
	inputs.push('proNm=' + encodeURIComponent(proNm));
	inputs.push('queryType=' + queryType);
	inputs.push('heading=' + encodeURIComponent(heading));
	inputs.push('proCode=' + encodeURIComponent(proCode));
	inputs.push('proCharge=' + encodeURIComponent(proCharge));
	inputs.push('idPro=' + idPro);
	inputs.push('testLi=' + testLi);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			alert(ajaxResponse);
			window.location = 'PathologyProfile.jsp';
		}
	});
}

// Touheed
// Code for Profile Demo Date 08-12-2015
function saveProfilesDemo() {
	// Change by Laxman As per new requierment on 23-Jan-2018.
	// var serviceId =$.trim($("#serviceid").val());
	var serviceId = "11";
	var subServiceId = $.trim($("#subserviceid").val());
	var heading = 0;// $.trim($("#heading").val());
	var proNm = $.trim($("#proNm").val());
	var proCode = $.trim($("#proCode").val());
	var proCharge = $.trim($("#categorycharges").val());
	var queryType = $.trim($("#queryType").val());
	var idPro = $.trim($("#idPro").val());
	var edit = $.trim($("#edit").val());
	var motivatorCash = 0;
	var motivatorSponsored = 0;
	var clinicPercent = 0;
	var interpretation = $('#txtInterpretation').val();
	var comments = $('#txtComments').val();

	// alert("interpretation :"+interpretation);
	// alert("comments :"+comments);
	// Row Count
	var rows = $('#tb2 tr').length;
	var testNames = [];
	// fetching values from tb2 table
	if (subServiceId == 0 || subServiceId == "") {
		alert("Please enter valid service Name");
		$("#proNm").val("");
		return false;
	}
	$('#tb2 tr').each(function() {
		var ptid = $(($(this).find('input[name=tk]'))).attr('value');

		var hd = $(($(this).find('input[name=hd]'))).attr('value');
		// Checking Condition if Its undefined then it should not not
		// insert
		if (ptid != undefined) {
			testNames.push(ptid);
		}

		if (hd != undefined) {
			hd = 0 + "$" + hd;
			testNames.push(hd);
		}
	});

	// Removeing duplicate elements from array
	var testLi = [];
	$.each(testNames, function(i, el) {
		if ($.inArray(el, testLi) === -1)
			testLi.push(el);
	});
	/*
	 * alert(testLi); return false;
	 */
	if (motivatorCash == "") {
		motivatorCash = 0;
	}
	if (motivatorSponsored == "") {
		motivatorSponsored = 0;
	}
	if (clinicPercent == "") {
		clinicPercent = 0;
	}
	if (heading == "select") {
		alert("Please Select Heading Name!");
		SetFocus("heading");
		return false;
	} else if (proNm == "") {
		alert("Please Enter Lab Profile Name!");
		SetFocus("proNm");
		return false;
	}/*
		 * else if (proCode == "") { alert("Please Enter Lab Profile Code!");
		 * SetFocus("proCode"); return false; } else if (proCharge == "") {
		 * alert("Please Enter Lab Profile Charges!"); SetFocus("proCharge");
		 * return false; } else if(proCharge < motivatorCash){ alert("Motivator
		 * cash must be less than profile charge."); SetFocus("motivatorCash");
		 * return false; } else if(proCharge < motivatorSponsored){
		 * alert("Motivator sponsored must be less than profile charge.");
		 * SetFocus("motivatorSponsored"); return false; } else if(clinicPercent >
		 * 100){ alert("Clinic % can not be less than '0' and greater than
		 * '100'"); SetFocus("txtClinicPercent"); return false; }
		 */
	// Checking condition,is request coming from edit button?
	else if (edit == 1) {
		if (rows == 1 || rows == 0) {
			alert("You can't remove all tests,Please drop minimum one Lab test in Right table!");
			makeDivEmptyt2();
			return false;
		}
	}
	if (edit == 0) {
		if (rows == 1) {
			alert("Please Drag Test From Left Side Box and Drop it into Right Empty Box!");
			makeDivEmptyt2();
			return false;
		}

	} else if (testLi.length < testNames.length) {
		alert("Please Remove Duplicate Element From Right Box!");
		// makeDivEmptyt2();
		SetFocus("tb1");
		return false;
	}
	var inputs = [];
	inputs.push('action=saveLabProfile');
	inputs.push('proNm=' + encodeURIComponent(proNm));
	inputs.push('queryType=' + queryType);
	inputs.push('heading=' + encodeURIComponent(heading));
	inputs.push('proCode=' + encodeURIComponent(proCode));
	inputs.push('proCharge=' + encodeURIComponent(proCharge));
	inputs.push('idPro=' + idPro);
	inputs.push('testLi=' + testLi);
	inputs.push('motivatorCash=' + motivatorCash);
	inputs.push('motivatorSponsored=' + motivatorSponsored);
	inputs.push('clinicPercent=' + clinicPercent);
	inputs.push('serviceId=' + serviceId);
	inputs.push('subServiceId=' + subServiceId);
	inputs.push('interpretation=' + encodeURIComponent(interpretation));
	inputs.push('comments=' + encodeURIComponent(comments));
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			alert(ajaxResponse);
			window.location = 'pathoProfileDemo.jsp';
			$("#callTime").val(0);
			$('#txtInterpretation').val("");
			$('#txtComments').val("");
		}
	});
}

function deleteProfile(idGroup) {
	var r = confirm("Are You Confirm To Remove Lab Profile.");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteLabProfiles');
		inputs.push('idGroup=' + idGroup);
		inputs.push('type=pro');
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
				alert(ajaxResponse);
				location.reload();

			}
		});
	}
}

/** ***************** Lab Profile End ****************** */

/** *************laboratory Tests ********** */
/**
 * ******Add individual age vise***@author:paras
 * suryawanshi****@Date:28-Dec-2016**************************
 */

var addLabTestTemp = "<div	style='height: 97.5%; border: 1px solid #ddd; overflow-y:scroll;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Add Test</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Test Name'>Test Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='testName' name='testName' type='text' placeholder='Test Name' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' />"
		+ "<input type = 'hidden' id = 'testId' value = '0' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Test Code'>Test Code<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='testCode' name='testCode' type='text' placeholder='Test Code' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"

		// Change by Laxman as per new requierment on 23-Jan-2018.
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px; display:none;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Test Rate'>Test Rate<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='testRate' name='testRate' type='text' placeholder='Test Rate' onkeypress='return validateNumbers(event)' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px; display:none;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Test Rate'>Motivator Cash<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='motivatorCash' name='motivatorCash' type='text' placeholder='Motivator Cash' onkeypress='return validateNumbers(event)' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px; display:none;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Test Rate'>Motivator Sponsored<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='motivatorSponsored' name='motivatorSponsored' type='text' placeholder='Motivator Sponsored' onkeypress='return validateNumbers(event)' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px; display:none;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1'>Clinic %</label>"
		+ "<input id='txtClinicPercent' name='clinicPercent' value='{$T.clinicPercent}' type='text' placeholder='Clinic %' onkeypress='return validateNumPer(event)' "
		+ "class='form-control input-SmallText col-md-7-1'  style='margin-left:0%;' maxlength='5' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Heading Name'>Select Heading:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<select id='heading' name='heading' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' value='0'>SELECT</select></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Test Method'>Test Method:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<select id='testMethod' name='testMethod' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' ></select></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"

		// Tushar Changes

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;' id='reportType'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont' for='Test Method'>Report Type:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input type='radio' name='reportType' id='parameterWise' style='margin-left: 15%;' checked='checked' value='i' onclick='setParameterWise()'>Parameter Wise"
		+ "<input type='radio' name='reportType' id='templateWise' style='margin-left: 10%;' value='t' onclick='setTemplateWise()'>Template Wise</div>"

		// Tushar Changes

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;' id='normalValues'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont' for='Test Method'>Normal Values:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input type='radio' name='normalValueType' id='individual' style='margin-left: 15%;' checked='checked' value='i' onclick='setIndividual()'>Individual"
		+ "<input type='radio' name='normalValueType' id='general' style='margin-left: 10%;' value='g' onclick='setGeneral()'>General</div>"

		/*
		 * + "<div class='form-group Remove-Padding col-md-12-1'
		 * style='padding-left: 96px;margin-top:11px;' id='oldandnew'>" + "<div
		 * class='divide-10'></div>" + "<input type='radio' name='gendervise'
		 * id='genderind' style='margin-left: 15%;' value='gn'
		 * onclick='setGendervise()'>Gender vies" + "<input type='radio'
		 * name='agevise' id='ageind' style='margin-left: 29px;' value='ag'
		 * onclick='setAgevise()'>Age vies</div>"
		 */

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;' id='NormalValuesGen'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' >General<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='General' name='General' type='text' placeholder='General' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;' id='NormalValuesIndi'>"
		+ "<div class='divide-10'></div>"
		+ "<table width='100%' border='1' cellpadding='0' cellspacing='0'>"
		+ "<tr width='100%'>"
		+ "<td width='25%'>Value Type</td>"
		+ "<td width='25%'>Lower</td>"
		+ "<td width='25%'>Upper</td>"
		+ "<td width='30%'>Unit</td>"
		+ "</tr>"
		+ "<tr width='100%'>"
		+ "<td width='25%'>Male</td>"
		+ "<td width='25%'><input type='text' style='width: 90%;' value = '0' id='l1'></td>"
		+ "<td width='25%'><input type='text' style='width: 90%;' value = '0' id='u1'></td>"
		+ "<td width='30%'><select id='unit1' style='width: 90%;' ></select></td>"
		+ "</tr>"
		+ "<tr width='100%'>"
		+ "<td width='25%'>Female</td>"
		+ "<td width='25%'><input style='width: 90%;' type='text' id='l2' value = '0'></td>"
		+ "<td width='25%'><input style='width: 90%;' type='text' id='u2'value = '0'></td>"
		+ "<td width='30%'><select style='width: 90%;' id='unit2'></select></td>"
		+ "</tr>"
		+ "<tr width='100%'>"
		+ "<td width='25%'>Child</td>"
		+ "<td width='25%'><input style='width: 90%;' type='text' id='l3' value = '0'></td>"
		+ "<td width='25%'><input style='width: 90%;' type='text' id='u3'value = '0'></td>"
		+ "<td width='30%'><select style='width: 90%;' id='unit3'></select></td>"
		+ "</tr>"
		+ "<tr width='100%'>"
		+ "<td width='25%'>Neonate</td>"
		+ "<td width='25%'><input style='width: 90%;' type='text' id='l4' value = '0'></td>"
		+ "<td width='25%'><input style='width: 90%;' type='text' id='u4' value = '0'></td>"
		+ "<td width='30%'><select style='width: 90%;' id='unit4'></select></td>"
		+ "</tr>"
		+ "</table>"
		+ "</div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' id='addremoveindi' style='margin-top:7px;'>"

		+ "<button value='+' id='btnAddNew' type='button' class='btn btn-xs btn-success' onclick='toCreateDivindi()'>+</button>"

		+ "<button value='_' class='btn btn-xs btn-success' style='margin: 7px;' onclick='toRemoveDivindi()' type='button'>-</button>"
		+ "</div>"

		+ "<div class='form-group Remove-Padding  col-md-12-1'  style='height: 140px;margin-top:11px; overflow-y: scroll; overflow-x:scroll; border: 1px solid #b8b8b8;'id='divNormalValuesIndi'>"

		+ "<table  class='table table-bordered table-striped table-condensed'>"
		+ "<thead>"
		+ "<tr>"
		+ "<th class='col-md-1 center ' style='background-color:#A0B0E0;'>#</th>"
		+ "<th class='col-md-1 center ' style='background-color:#A0B0E0;'>Sr.no</th>"
		+ "<th class='col-md-2-1 center' colspan='2' style='background-color:#FFF0F0;'>Age</th>"
		+ "<th class='col-md-2-1 center'colspan='4' style='background-color:#E0E8F0;'>Normal Values</th>"
		+ "<th class='col-md-2-1 center' colspan='3' style='background-color:#F0FFF0;'>Gender</th>"
		+ "<th class='col-md-3-1 center' style='background-color:#A0B0E0;'>Unit</th>"
		+ "</tr>"
		+ "</thead>"
		+ "<thead>"
		+ "<tr>"
		+ "<td style='background-color:#A0B0E0;'></td>"
		+ "<td style='background-color:#A0B0E0;'></td>"
		+ "<td class='col-md-1-1 center'  style='background-color:#FFF0F0;'>FAge</td>"
		+ "<td class='col-md-1-1 center'  style='background-color:#FFF0F0;'>TAge</td>"
		+ "<td class='col-md-1-1 center' style='background-color:#E0E8F0;' >CL</td>"
		+ "<td class='col-md-1-1 center' style='background-color:#E0E8F0;'>Low</td>"
		+ "<td class='col-md-1-1 center' style='background-color:#E0E8F0;'>High</td>"
		+ "<td class='col-md-1-1 center' style='background-color:#E0E8F0;'>CH</td>"
		+ "<td class='col-md-1-1 center' style='background-color:#F0FFF0;'>Male</td>"
		+ "<td class='col-md-1-1 center' style='background-color:#F0FFF0;'>Female</td>"
		+ "<td class='col-md-1-1 center' style='background-color:#F0FFF0;'>Others</td>"
		+ "<td class='col-md-1-1 center' style='background-color:#A0B0E0;'></td>"
		+ "</tr>"
		+ "</thead>"
		+ "<tbody id='infonormalvalue' >"
		+ "</tbody>"
		+ "</table>"

		+ "</div>"

		// Tushar Changes
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;' id='iTemp'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for=''></label>"
		+ "<input id='iTempBtn' type='button' class='col-md-5-1' value='Create Template' onClick='createTemplateForLabTest()' style='margin-left:30%;'></div>"
		// Tushar Changes

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;' id='iNote'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Note'>Note:</label>"
		+ "<textarea rows='3' cols='23' id='testNote' placeholder='Note' class='col-md-7-1'"
		+ "required='true' style='margin-left:0%;'></textarea></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'  id='iTestClinicalUse'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Clinical Use'>Clinical Use:</label>"
		+ "<textarea rows='3' cols='23' id='testClinicalUse' placeholder='Clinical Use' class='col-md-7-1'"
		+ "required='true' style='margin-left:0%;'></textarea></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'  id='iTestIncreasedLevel'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Increased Level'>Increased Level:</label>"
		+ "<textarea rows='3' cols='23' id='testIncreasedLevel' placeholder='Increased Level' class='col-md-7-1'"
		+ "required='true' style='margin-left:0%;'></textarea></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'  id='iInterpretation'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Interpretation'>Interpretation:</label>"
		+ "<textarea rows='3' cols='23' id='testInterpretation' placeholder='Interpretation' class='col-md-7-1'"
		+ "required='true' style='margin-left:0%;'></textarea></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;' id='iComments'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Comments'>Comments:</label>"
		+ "<textarea rows='3' cols='23' id='testComments' placeholder='Comments' class='col-md-7-1'"
		+ "required='true' style='margin-left:0%;'></textarea></div>"
		+ "<input type='hidden' id='queryType' value='insert'></div></div>";

// function to add Tests
function addLabTests() {
	var SampleBean = 0;
	$("#infoDiv").setTemplate(addLabTestTemp);
	$("#infoDiv").processTemplate(SampleBean);
	$("#NormalValuesGen").hide();
	$("#testName").focus();
	getAllHeading("onload");
	getAllTestMethod("onload");
	getAllUnitType();

	$("#selRisTempList").val(0);
	$("#iTestTemplateName").val("");
	$("#iImpression").val("");
	CKEDITOR.instances['iEditorTestTemplate'].setData("");
	$("#iTemp").hide();
}
// Save Tests
function saveLabTest() {
	// alert("hello");
	var testid = $("#testId").val();
	var testName = $("#testName").val().trim();
	var testCode = $("#testCode").val().trim();
	var testRate = 0;
	var motivatorCash = 0;
	var motivatorSponsored = 0;
	var clinicPercent = 0;
	var heading = $("#heading :selected").val();
	var testMethod = $("#testMethod :selected").val();
	var sampleType = $("#idSampleType").val();
	var templateWise = ($('#templateWise').val());
	var queryType = $("#queryType").val();
	var nvType = $('input[name=normalValueType]:checked').val();
	var testNote = $("#testNote").val();
	var testClinicalUse = $("#testClinicalUse").val();
	var testIncreasedLevel = $("#testIncreasedLevel").val();
	var testInterpretation = $("#testInterpretation").val();
	var testComments = $("#testComments").val();
	var reportType = $('input[name=reportType]:checked').val();
	// Modify by Laxman on 23-Jan-2018.
	/*
	 * if(motivatorCash == "") { motivatorCash = 0; } if(motivatorSponsored ==
	 * "") { motivatorSponsored = 0; }
	 * 
	 * if(clinicPercent == "" || clinicPercent == undefined) { clinicPercent =
	 * 0; }
	 */
	if (testName == "" || testName == null || testName.length == 0) {
		alert("Please Enter Test Name.");
		SetFocus("testName");
		$("#testName").val("");
		return false;
	} else if (testCode == "" || testCode.length == 0 || testCode == null) {
		alert("Please Enter  Test Code.");
		SetFocus("testCode");
		$("#testCode").val("");
		return false;
	} /*
		 * else if (testRate == "" || testRate.length == 0 || testRate == null) {
		 * alert("Please Enter Test Rate."); SetFocus("testRate");
		 * $("#testRate").val(""); return false; } else if(testRate <
		 * motivatorCash){ alert("Motivator cash must be less than test rate.");
		 * SetFocus("motivatorCash"); return false; } else if(testRate <
		 * motivatorSponsored){ alert("Motivator sponsored must be less than
		 * test rate."); SetFocus("motivatorSponsored"); return false; } else
		 * if(clinicPercent > 100){ alert("Clinic % can not be lessthan 0 and
		 * greater than 100"); SetFocus("txtClinicPercent");
		 * $("#txtClinicPercent").val(""); return false; }
		 */else if (heading == "0" || heading == undefined) {
		alert("Please Select Heading.");
		SetFocus("heading");
		return false;
	} else if (testMethod == "select" || testMethod == undefined) {
		alert("Please select Test Method.");
		SetFocus("testMethod");
		return false;
	} else if (reportType == "t") {
		// Tushar Changes

		var TestTemplateName = $("#iTestTemplateName").val();
		if (TestTemplateName == "") {
			alert("Please select Test Template Name.");
			SetFocus("iTestTemplateName");
			return false;
		}
		var idlabtesttemplates = $("#idlabtesttemplates").val();
		var testTemplate = CKEDITOR.instances["iEditorTestTemplate"].getData();
		var impression = $("#iImpression").val();

		var inputs = [];
		inputs.push('action=SaveLabTest');
		inputs.push('queryType=' + queryType);
		inputs.push('testid=' + testid);
		inputs.push('testName=' + encodeURIComponent(testName));
		inputs.push('testRate=' + encodeURIComponent(testRate));
		inputs.push('motivatorCash=' + motivatorCash);
		inputs.push('motivatorSponsored=' + motivatorSponsored);
		inputs.push('testCode=' + encodeURIComponent(testCode));
		inputs.push('clinicPercent=' + encodeURIComponent(clinicPercent));
		inputs.push('heading=' + encodeURIComponent(heading));
		inputs.push('testMethod=' + encodeURIComponent(testMethod));
		inputs.push('sampleType=' + encodeURIComponent(sampleType));
		inputs.push('idlabtesttemplates='
				+ encodeURIComponent(idlabtesttemplates));
		inputs.push('testTemplateName=' + encodeURIComponent(TestTemplateName));
		inputs.push('testTemplate=' + encodeURIComponent(testTemplate));
		inputs.push('templateWise=' + templateWise);
		inputs.push('reportType=' + reportType);
		inputs.push('impression=' + encodeURIComponent(impression));

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PathologyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(r) {
				ajaxResponse = r;
				alert(r);
				location.reload();
				$("#byName").val("");
				$("#inored").val("insert"); // set for remove row hidden filed
			}
		});
	} else {

		var inputs = [];
		var general = "";
		normalValue = {
			nvli : []
		};
		newnoramlvalue = { // newnoramlvalue individuals@author:paras
			// @Date:26Dec
			normalValuelindividual : []
		};
		if (nvType == "i") {
			for ( var i = 1; i < 5; i++) {
				var lowerval = $.trim($("#l" + i).val());
				var upperval = $.trim($("#u" + i).val());
				var unitval = $("#unit" + i + " :selected").val();
				var sexType = $("#sx" + i).val();
				if (lowerval == "" && upperval == "") {
					alert("Please Enter Normal Values.");
					return false;
				} else {
					if (lowerval == "") {
						alert("Please select Lower Value.");
						return false;
					} else if (upperval == "") {
						alert("Please select Upper Value.");
						return false;
					}
					if (unitval == "select") {
						alert("Please select Test Unit.");
						return false;
					} else {
						normalValue.nvli.push({
							"nvlv" : lowerval,
							"nvuv" : upperval,
							"nvut" : unitval,
							"nvsx" : sexType

						});
					}
				}
			}

			// new individual age vise @author:paras @Date:26Dec
			var tblsizeindi = $("#inditblsize").val(); // get tatal size of
			// table
			// alert(tblsizeindi);
			for ( var i = 1; i <= tblsizeindi; i++) {

				// parseInt($("#testRate").val().trim());
				var txtFage = $("#txtFage" + i).val();
				// alert(txtFage);
				var selAge = $("#selAge" + i).val();
				var txtTage = $("#txtTage" + i).val();
				var txtCL = $("#txtCL" + i).val();
				var txtLow = $("#txtLow" + i).val();
				var txtHigh = $("#txtHigh" + i).val();
				var txtCH = $("#txtCH" + i).val();
				var male;
				var female;
				var others;
				var selUnit = $("#selUnit" + i).val();
				// var txtneworoldnvl= $("#txtneworoldnvl").val();
				var txtneworoldnvl = $("#txtnvlid" + i).val();
				if (txtneworoldnvl == undefined || txtneworoldnvl == null) {
					txtneworoldnvl = "new";
				}

				var $chkM = $('input:checkbox[name=checkboxmale' + i + ']');
				var $chkF = $('input:checkbox[name=checkboxfemale' + i + ']');
				var $chkO = $('input:checkbox[name=checkboxothers' + i + ']');
				// alert("old and new is====="+txtneworoldnvl);
				// alert("age type is=="+ selAge);
				if (txtFage != null && txtFage != undefined) { // check fage is
					// empty

					if (txtFage == "" || txtFage == null || txtFage == "NaN") {
						alert("Please Enter Fage in-" + i + "-Row");
						$("#txtFage" + i).focus();
						return false;
					}
					if (txtTage == "" || txtTage == null || txtTage == "NaN") { // check
						// Tage
						// is
						// emptys

						alert("Please Enter Tage in-" + i + "-Row");
						$("#txtTage" + i).focus();
						return false;
					}
					if (txtCL == "" || txtCL == null || txtCL == "NaN") { // check
						// CL
						// is
						// empty
						alert("Please Enter CL Values in-" + i + "-Row");
						$("#txtCL" + i).focus();
						return false;
					}
					if (txtLow == "" || txtLow == null || txtLow == "NaN") { // check
						// LOw
						// is
						// empty
						alert("Please Enter Low Values in-" + i + "-Row");
						$("#txtLow" + i).focus();
						return false;
					}
					if (txtHigh == "" || txtHigh == null || txtHigh == "NaN") { // check
						// High
						// is
						// empty
						alert("Please Enter High  Values in-" + i + "-Row");
						$("#txtHigh" + i).focus();
						return false;
					}
					if (txtCH == "" || txtCH == null || txtCH == "NaN") { // check
						// ch
						// is
						// empty
						alert("Please Enter CH Values  in-" + i + "-Row");
						$("#txtCH" + i).focus();
						return false;
					}
					if (selUnit == "select") {
						alert("Please Select Unit Values  in-" + i + "-Row");
						$("#selUnit" + i).focus();
						return false;
					}

					if (parseFloat(txtFage) > parseFloat(txtTage)) { // check
						// fromage
						// is
						// greate
						// than
						// toage
						alert("Fage Should be less than  Tage in-" + i + "-Row");
						$("#txtFage" + i).focus();
						return false;
					}
					if (parseFloat(txtLow) > parseFloat(txtHigh)) {
						alert("Low values Should be less than High Values in-"
								+ i + "-Row"); // check lower values is greate
						// than highth values
						$("#txtLow" + i).focus();
						return false;
					}
					if (parseFloat(txtCL) > parseFloat(txtCH)) {
						alert("CL values Should be less than CH Valuesin-" + i
								+ "-Row"); // check cl is is greate thang ch
						// values
						$("#txtCL" + i).focus();
						return false;
					} // check for gender
					if ($chkM.is(':checked') == false
							&& $chkF.is(':checked') == false
							&& $chkO.is(':checked') == false) {

						alert("Please select at least one gender in-" + i
								+ "-Row");
						$("#chkmale" + i).focus();
						$("#chkfemale" + i).focus();
						$("#chkothers" + i).focus();
						return false;
					}
					/**
					 * **********set status Y or N***(Y=for only check record of
					 * gender)************
					 */
					if ($chkM.is(':checked') == true) {

						male = "Y";
						// alert(male);
					} else {
						male = "N";
						// alert(male);
					}

					if ($chkF.is(':checked') == true) {

						female = "Y";
						// alert(female);
					} else {
						female = "N";

					}
					if ($chkO.is(':checked') == true) {

						others = "Y";
					} else {
						others = "N";

					}
					/**
					 * *******end***set status Y or N***(Y=for only check record
					 * of gender)************
					 */
					// push all records of age vise individuals
					newnoramlvalue.normalValuelindividual.push({

						"nvlv" : txtLow,
						"nvuv" : txtHigh,
						"nvut" : selUnit,
						"fage" : txtFage,
						"age" : selAge,
						"tage" : txtTage,
						"cl" : txtCL,
						"ch" : txtCH,
						"male" : male,
						"female" : female,
						"others" : others,
						"newrow" : txtneworoldnvl
					});
				}
			}
			var nvlindi = JSON.stringify(newnoramlvalue); // new individual
			// age vise
			// @author:paras
			// @Date:26Dec
			// alert(nvlindi);
			inputs.push('newnvlindividual=' + nvlindi);
			var testValue = JSON.stringify(normalValue);
			inputs.push('normalValues=' + testValue);
		} else {
			general = $("#General").val();
			if (general == "") {
				alert("Please Enter Normal Values.");
				return false;
			} else {
				inputs.push('general=' + general);
			}
		}

		inputs.push('action=SaveLabTest');
		inputs.push('queryType=' + queryType);
		inputs.push('testid=' + testid);
		inputs.push('testName=' + encodeURIComponent(testName));
		inputs.push('testRate=' + encodeURIComponent(testRate));
		inputs.push('motivatorCash=' + motivatorCash);
		inputs.push('motivatorSponsored=' + motivatorSponsored);
		inputs.push('testCode=' + encodeURIComponent(testCode));
		inputs.push('clinicPercent=' + encodeURIComponent(clinicPercent));
		inputs.push('heading=' + encodeURIComponent(heading));
		inputs.push('testMethod=' + encodeURIComponent(testMethod));
		inputs.push('nvType=' + nvType);
		inputs.push('testNote=' + testNote);
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
		inputs.push('testClinicalUse=' + testClinicalUse);
		inputs.push('testIncreasedLevel=' + testIncreasedLevel);
		inputs.push('testInterpretation=' + testInterpretation);
		inputs.push('testComments=' + testComments);
		inputs.push('reportType=' + reportType);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PathologyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(r);
				location.reload();
				$("#byName").val("");
				$("#inored").val("insert"); // set for remove row hidden filed
				$("#idlabtesttemplates").val(0);
			}
		});

	}

}

var ViewLabTestTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 98%; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>ID</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Test Name</div></th>"
		+ "<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Test Code</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 410px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.tli as tli}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.tli.tid}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.tli.tnm}</td>"
		+ "<td class='col-sm-1-1' style='height: 21.5px;'>{$T.tli.tcd}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onclick='editLabTest({$T.tli.tid})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='DELETE' id='btnDelete{count}' onClick='deleteLabTest({$T.tli.tid})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

// function to fetch all Tests
function ViewlabtestList(fetchType, type) {
	count = 1;
	var byName = $("#byName").val();
	if (byName == "" && (fetchType == "search" || fetchType == "searchlabTest")) {
		alert("Please Enter Test Name");
		return false;
	}
	if (byName == " " || byName == null) {

		alert("Please Enter Valid Test Name");
		return false;
	}
	var inputs = [];
	inputs.push('action=fetchlabTest');
	inputs.push('fetchType=' + fetchType);
	inputs.push('byName=' + encodeURIComponent(byName));
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PathologyServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					// alert(ajaxResponse);
					$("#labTestDiv").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');
					if (fetchType == "search" || fetchType == "searchlabTest") {
						if (testObj.tli.length == 0) {
							alert("Record Not Found");
							return false;
						}
					}
					if (type == "charges") {
						$('#labTestTab > thead > tr:nth-child(n+2)').remove();
						$('#labTestTab > tbody > tr:nth-child(n+2)').remove();

						var halllist = $("#InvTestAllHallDetails").html();
						var halldetails = eval('(' + halllist + ')');

						var TestCharges = "<tr id = 'headerTr'>"
								+ "<th class='center' style = 'width: 30px;'><div class='TextFont'>ID</div></th>"
								+ "<th class='' style = 'width: 200px;'><div class='TextFont'>Lab Test Name</div></th>"
								+ "<th class='' style = 'width: 100px;'><div class='TextFont'>Test Code</div></th>"
								+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>OPD Charges</div></th>";

						$
								.each(
										halldetails.hl,
										function(name, value) {
											TestCharges = TestCharges
													+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>"
													+ value.hn + "</div></th>";
										});
						TestCharges = TestCharges + "</tr>";
						$('#InvstTestHeading').after(TestCharges);

						// var count = 1;
						$
								.each(
										testObj.tli,
										function(name, value) {
											var Testbody = "";
											Testbody = Testbody
													+ "<tr id=Test"
													+ count
													+ "><td class='center' style='height: 21.5px;width: 30px;'>"
													+ value.tid
													+ "</td><td class='' style='height: 21.5px;width: 200px;'>"
													+ value.tnm
													+ "</td><td class='' style='height: 21.5px;width: 100px;'>"
													+ value.tcd + "</td>";

											var testChrgs = 0;
											var slaveid = 0;
											var hallid = 0;

											if (value.hallWsTestChrgsList.length > 0) {
												for ( var j = 0; j < value.hallWsTestChrgsList.length; j++) {
													if (value.hallWsTestChrgsList[j].hallID == 0) {
														testChrgs = value.hallWsTestChrgsList[j].chrgs;
														slaveid = value.hallWsTestChrgsList[j].slaveId;
														hallid = 0;

														Testbody = Testbody
																+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
																+ value.tid
																+ "-HallID"
																+ hallid
																+ " value = '"
																+ testChrgs
																+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'labtestchargesslaveID"
																+ value.tid
																+ "-" + hallid
																+ "' value = '"
																+ slaveid
																+ "' /></td>";
													}
												}
											} else {
												Testbody = Testbody
														+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
														+ value.tid
														+ "-HallID"
														+ hallid
														+ " value = '"
														+ value.trt
														+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'labtestchargesslaveID"
														+ value.tid + "-"
														+ hallid
														+ "' value = '"
														+ slaveid + "' /></td>";

											}

											$
													.each(
															halldetails.hl,
															function(name,
																	hallvalue) {
																var isPresent = 0;
																for ( var i = 0; i < value.hallWsTestChrgsList.length; i++) {
																	if (hallvalue.hi == value.hallWsTestChrgsList[i].hallID) {
																		testChrgs = value.hallWsTestChrgsList[i].chrgs;
																		slaveid = value.hallWsTestChrgsList[i].slaveId;
																		hallid = value.hallWsTestChrgsList[i].hallID;
																		isPresent = 1;
																		break;
																	}
																}

																if (isPresent > 0) {
																	Testbody = Testbody
																			+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
																			+ value.tid
																			+ "-HallID"
																			+ hallid
																			+ " value = '"
																			+ testChrgs
																			+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'labtestchargesslaveID"
																			+ value.tid
																			+ "-"
																			+ hallid
																			+ "' value = '"
																			+ slaveid
																			+ "' /></td>";
																} else {

																	testChrgs = value.trt;
																	slaveid = 0;
																	hallid = hallvalue.hi;

																	Testbody = Testbody
																			+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
																			+ value.tid
																			+ "-HallID"
																			+ hallid
																			+ " value = '"
																			+ testChrgs
																			+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'labtestchargesslaveID"
																			+ value.tid
																			+ "-"
																			+ hallid
																			+ "' value = '"
																			+ slaveid
																			+ "' /></td>";
																}
															});

											Testbody = Testbody + "</tr>";

											$('#Test' + (count - 1)).after(
													Testbody);
											count++;
										});

						// $("#userMangTemp").setTemplate(ViewLabTestChargesTemp);
					} else {
						$("#userMangTemp").setTemplate(ViewLabTestTemp);
						$("#userMangTemp").processTemplate(testObj);
					}

					$("#strValue").val("");
					$("#byName").val("");
				}
			});
}

// Function to save Hall wise charges of laboratory Tests

function saveLabTestChargesSlave() {

	var result = $("#labTestDiv").html();
	var testObj = eval('(' + result + ')');
	var halllist = $("#InvTestAllHallDetails").html();
	var halldetails = eval('(' + halllist + ')');

	var TestObj = 0;

	TestObj = {
		tli : []

	};

	for ( var i = 0; i < testObj.tli.length; i++) {

		var testid = testObj.tli[i].tid;
		var hallid = 0;
		var charges = $("#TestID" + testid + "-HallID0").val();
		var slaveid = $("#labtestchargesslaveID" + testid + "-0").val();

		if (charges == "" || charges == null || charges == undefined) {
			charges = 0;
		}

		var hallwschrgslist = [];

		hallwschrgslist.push({
			"hallID" : hallid,
			"testID" : testid,
			"chrgs" : charges,
			"slaveId" : slaveid,
		});

		for ( var j = 0; j < halldetails.hl.length; j++) {
			var hlid = halldetails.hl[j].hi;
			var chrg = $("#TestID" + testid + "-HallID" + hlid).val();
			var slvid = $("#labtestchargesslaveID" + testid + "-" + hlid).val();

			if (chrg == "" || chrg == null || chrg == undefined) {
				chrg = 0;
			}

			hallwschrgslist.push({
				"hallID" : hlid,
				"testID" : testid,
				"chrgs" : chrg,
				"slaveId" : slvid
			});
		}

		TestObj.tli.push({
			"hallWsTestChrgsList" : hallwschrgslist,
			"tid" : testid
		});

	}

	TestObj = JSON.stringify(TestObj);
	var inputs = [];
	inputs.push('action=saveLabTestHallWiseCharges');
	inputs.push('TestObj=' + encodeURIComponent(TestObj));
	inputs.push('sid=' + encodeURIComponent(0));
	inputs.push('pageType=' + encodeURIComponent("NormalCharges"));
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
			alert(r);
			location.reload();
		}
	});
}
/**
 * add template**for*Edit*new individual
 * labtest**********@author:paras**@Date:27Dec***********************
 */
// Function to Edit laboratory Tests
var editLabTestTemp = "<div	style='height: 97.5%; border: 1px solid #ddd; overflow-y:scroll;' >"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Edit Test</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Test Name'>Test Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='testName' name='testName' type='text' placeholder='Test Name' value='{$T.tnm}'"
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' />"
		+ "<input type = 'hidden' id = 'testId' value='{$T.tid}' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Test Code'>Test Code<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='testCode' name='testCode' type='text' placeholder='Test Code' value='{$T.tcd}' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"

		// Change by Laxman as per new requierment on 23-Jan-2018.
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px; display:none;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Test Rate'>Test Rate<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='testRate' name='testRate' type='text' placeholder='Test Rate' value='{$T.trt}' onkeypress='return validateNumbers(event)' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px; display:none;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Test Rate'>Motivator Cash<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='motivatorCash' name='motivatorCash' value='{$T.motivatorCash}' type='text' placeholder='Test Rate' onkeypress='return validateNumbers(event)' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px; display:none;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Test Rate'>Motivator Sponsored<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='motivatorSponsored' name='motivatorSponsored' value='{$T.motivatorSponsored}' type='text' placeholder='Test Rate' onkeypress='return validateNumbers(event)' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px; display:none;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1'>Clinic %</label>"
		+ "<input id='txtClinicPercent' name='clinicPercent' value='{$T.clinicPercent}' type='text' placeholder='Clinic %' onkeypress='return validateNumPer(event)' "
		+ "class='form-control input-SmallText col-md-7-1'  style='margin-left:0%;' maxlength='5' min='0' max='100'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Heading Name'>Select Heading:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<select id='heading' name='heading' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' value='0'>SELECT</select></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Test Method'>Test Method:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<select id='testMethod' name='testMethod' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' ></select></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"

		// Tushar Changes

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;' id='reportType'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont' for='Test Method'>Report Type:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "{#if $T.vt != 't'}"
		+ "<input type='radio' name='reportType' id='parameterWise' style='margin-left: 15%;' checked='checked' value='p' onclick='setParameterWise()'>Parameter Wise"
		+ "<input type='radio' name='reportType' id='templateWise' style='margin-left: 10%;' value='t' onclick='setTemplateWise()'>Template Wise</div>"
		+ "{#else}"
		+ "<input type='radio' name='reportType' id='parameterWise' style='margin-left: 15%;' value='p' onclick='setParameterWise()'>Parameter Wise"
		+ "<input type='radio' name='reportType' id='templateWise' style='margin-left: 10%;' checked='checked' value='t' onclick='setTemplateWise()'>Template Wise</div>{#/if}"

		+ "{#if $T.vt != 't'}"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;' id='iTemp' hidden='hidden'>"
		+ "{#else}"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;' id='iTemp'>{#/if}"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for=''></label>"
		+ "<input id='iTempBtn' type='button' class='col-md-5-1' value='Create Template' onClick='createTemplateForLabTest()' style='margin-left:30%;'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;' id='normalValues'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont' for='Test Method'>Normal Values:</label>"
		+ "<input type='radio' name='normalValueType' id='individual' style='margin-left: 15%;' checked='checked' value='i' onclick='setIndividual()'>Individual"
		+ "<input type='radio' name='normalValueType' id='general' style='margin-left: 10%;' value='g' onclick='setGeneral()'>General</div>"

		/*
		 * + "<div class='form-group Remove-Padding col-md-12-1'
		 * style='padding-left: 96px;margin-top:11px;' id='oldandnew'>" + "<div
		 * class='divide-10'></div>" + "<input type='radio' name='gendervise'
		 * id='genderind' style='margin-left: 15%;' value='gn'
		 * onclick='setGendervise()'>Gender vies" + "<input type='radio'
		 * name='agevise' id='ageind' style='margin-left: 29px;' value='ag'
		 * onclick='setAgevise()'>Age vies</div>"
		 */

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;' id='NormalValuesGen'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' >General<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='General' name='General' type='text' placeholder='General' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;' id='NormalValuesIndi'>"
		+ "<div class='divide-10'></div>"
		+ "<table width='100%' border='1' cellpadding='0' cellspacing='0'>"
		+ "<tr width='100%'>"
		+ "<td width='25%'>Value Type</td>"
		+ "<td width='25%'>Lower</td>"
		+ "<td width='25%'>Upper</td>"
		+ "<td width='30%'>Unit</td>"
		+ "</tr>"
		+ "<tr width='100%'>"
		+ "<td width='25%'>Male</td>"
		+ "<td width='25%'><input type='text' style='width: 90%;' value='0' id='l1'></td>"
		+ "<td width='25%'><input type='text' style='width: 90%;' value='0' id='u1'></td>"
		+ "<td width='30%'><select id='unit1' style='width: 90%;'></select></td>"
		+ "</tr>"
		+ "<tr width='100%'>"
		+ "<td width='25%'>Female</td>"
		+ "<td width='25%'><input style='width: 90%;' type='text' value='0' id='l2'></td>"
		+ "<td width='25%'><input style='width: 90%;' type='text' value='0' id='u2'></td>"
		+ "<td width='30%'><select style='width: 90%;' id='unit2'></select></td>"
		+ "</tr>"
		+ "<tr width='100%'>"
		+ "<td width='25%'>Child</td>"
		+ "<td width='25%'><input style='width: 90%;' type='text' value='0' id='l3'></td>"
		+ "<td width='25%'><input style='width: 90%;' type='text' value='0' id='u3'></td>"
		+ "<td width='30%'><select style='width: 90%;' id='unit3'></select></td>"
		+ "</tr>"
		+ "<tr width='100%'>"
		+ "<td width='25%'>Neonate</td>"
		+ "<td width='25%'><input style='width: 90%;' type='text' value='0' id='l4'></td>"
		+ "<td width='25%'><input style='width: 90%;' type='text'  value='0' id='u4'></td>"
		+ "<td width='30%'><select style='width: 90%;' id='unit4'></select></td>"
		+ "</tr>"
		+ "</table>"
		+ "</div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' id='addremoveindi' style='margin-top:7px;'>"

		+ "<button value='+' id='btnAddNew' type='button' class='btn btn-xs btn-success' onclick='toCreateDivindi()'>+</button>"

		+ "<button value='_' class='btn btn-xs btn-success' style='margin: 7px;' onclick='toRemoveDivindi()' type='button'>-</button>"
		+ "</div>"

		+ "<div class='form-group Remove-Padding  col-md-12-1'  style='height: 140px;margin-top:11px; overflow-y: scroll; overflow-x:scroll; border: 1px solid #b8b8b8;'id='divNormalValuesIndi'>"

		+ "<table  class='table table-bordered table-striped table-condensed'>"
		+ "<thead>"
		+ "<tr>"
		+ "<th class='col-md-1 center ' style='background-color:#A0B0E0;'>#</th>"
		+ "<th class='col-md-1 center ' style='background-color:#A0B0E0;'>Sr.no</th>"
		+ "<th class='col-md-2-1 center' colspan='2' style='background-color:#FFF0F0;'>Age</th>"
		+ "<th class='col-md-2-1 center'colspan='4' style='background-color:#E0E8F0;'>Normal Values</th>"
		+ "<th class='col-md-2-1 center' colspan='3' style='background-color:#F0FFF0;'>Gender</th>"
		+ "<th class='col-md-3-1 center' style='background-color:#A0B0E0;'>Unit</th>"
		+ "</tr>"
		+ "</thead>"
		+ "<thead>"
		+ "<tr>"
		+ "<td style='background-color:#A0B0E0;'></td>"
		+ "<td style='background-color:#A0B0E0;'></td>"
		+ "<td class='col-md-1-1 center'  style='background-color:#FFF0F0;'>FAge</td>"
		+ "<td class='col-md-1-1 center'  style='background-color:#FFF0F0;'>TAge</td>"
		+ "<td class='col-md-1-1 center' style='background-color:#E0E8F0;' >CL</td>"
		+ "<td class='col-md-1-1 center' style='background-color:#E0E8F0;'>Low</td>"
		+ "<td class='col-md-1-1 center' style='background-color:#E0E8F0;'>High</td>"
		+ "<td class='col-md-1-1 center' style='background-color:#E0E8F0;'>CH</td>"
		+ "<td class='col-md-1-1 center' style='background-color:#F0FFF0;'>Male</td>"
		+ "<td class='col-md-1-1 center' style='background-color:#F0FFF0;'>Female</td>"
		+ "<td class='col-md-1-1 center' style='background-color:#F0FFF0;'>Others</td>"
		+ "<td class='col-md-1-1 center' style='background-color:#A0B0E0;'></td>"
		+ "</tr>"
		+ "</thead>"
		+ "<tbody id='infonormalvalue' >"
		+ "</tbody>"
		+ "</table>"
		+ "</div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;' id='iNote'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Note'>Note:</label>"
		+ "<textarea rows='3' cols='23' id='testNote' placeholder='Note' class='col-md-7-1'"
		+ "required='true' style='margin-left:0%;'>{$T.tnote}</textarea></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;' id='iTestClinicalUse'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Clinical Use'>Clinical Use:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<textarea rows='3' cols='23' id='testClinicalUse' placeholder='Clinical Use' class='col-md-7-1'"
		+ "required='true' style='margin-left:0%;'>{$T.tcliuse}</textarea></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;' id='iTestIncreasedLevel'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Increased Level'>Increased Level:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<textarea rows='3' cols='23' id='testIncreasedLevel' placeholder='Increased Level' class='col-md-7-1'"
		+ "required='true' style='margin-left:0%;'>{$T.tinrl}</textarea></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;' id='iInterpretation'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Interpretation'>Interpretation:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<textarea rows='3' cols='23' id='testInterpretation' placeholder='Interpretation' class='col-md-7-1'"
		+ "required='true' style='margin-left:0%;'>{$T.tinter}</textarea></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;' id='iComments'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Comments'>Comments:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<textarea rows='3' cols='23' id='testComments' placeholder='Comments' class='col-md-7-1'"
		+ "required='true' style='margin-left:0%;'>{$T.tcommnt}</textarea></div>"
		+ "<input type='hidden' id='queryType' value='update'></div></div>";

function editLabTest(id) {

	var inputs = [];
	inputs.push('action=fetchlabTestById');
	inputs.push('byId=' + encodeURIComponent(id));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;

			// var list = $("#labTestDiv").html();
			var myArray = JSON.parse(ajaxResponse);

			for ( var i = 0; i < myArray.tli.length; i++) {
				if (myArray.tli[i].tid == id) {
					myObj = myArray.tli[i];
					break;
				}
			}
			$("#idlabtest").val(id);
			$("#testId").val(id);
			$("#iTestTemplateName").val(myObj.testTemplateName);
			// $("#iEditorTestTemplate").val(myObj.testTemplate);
			CKEDITOR.instances['iEditorTestTemplate']
					.setData((myObj.testTemplate));
			$("#iImpression").val(myObj.impressions);

			// myObj = JSON.stringify(myObj);
			sBean = myObj;

			// commented
			/*
			 * $("#txtMRNID").val(count); count++; test++; totalDocQty(); var
			 * tblSubContractingCountRow1 = $("#txtMRNID").val();
			 * $("#totalRow").val(tblSubContractingCountRow1);
			 */

			// Added by vinod
			$("#infoDiv").setTemplate(editLabTestTemp);
			$("#infoDiv").processTemplate(sBean);
			getAllHeading("onload");
			getAllTestMethod("onload");
			// ViewTestSampleList('onload');
			getAllUnitType();

			if (sBean.vt == "i") {

				$("#NormalValuesGen").hide();
				$("#individual").attr("checked", true);
				// $("#addremoveindi").hide();
			} else if (sBean.vt == "t") {
				$("#normalValues").hide();
				$("#NormalValuesGen").hide();
				$("#NormalValuesIndi").hide();
				$("#divNormalValuesIndi").hide();
				$("#addremoveindi").hide();
				$("#oldandnew").hide();
				$("#iNote").hide();
				$("#iTestClinicalUse").hide();
				$("#iTestIncreasedLevel").hide();
				$("#iInterpretation").hide();
				$("#iComments").hide();
				$("#templateWise").attr("checked", true);
			} else {
				$("#NormalValuesIndi").hide();
				$("#divNormalValuesIndi").hide();
				$("#addremoveindi").hide();
				$("#oldandnew").hide();
				$("#general").attr("checked", true);
			}

			setAddlabTestbutton();

			setTimeout(function() {
				$("#heading").val(sBean.hid);
				$("#testMethod").val(sBean.tmd);

				for ( var k = 0; k < sBean.tnvli.length; k++) {
					if (sBean.vt == "i") {
						if (sBean.tnvli[k].nvsx == "m") {
							$("#l" + (1)).val(sBean.tnvli[k].nvlv);
							$("#u" + (1)).val(sBean.tnvli[k].nvuv);
							$("#unit" + (1)).val(sBean.tnvli[k].nvut);
						} else if (sBean.tnvli[k].nvsx == "f") {
							$("#l" + (2)).val(sBean.tnvli[k].nvlv);
							$("#u" + (2)).val(sBean.tnvli[k].nvuv);
							$("#unit" + (2)).val(sBean.tnvli[k].nvut);
						} else if (sBean.tnvli[k].nvsx == "c") {
							$("#l" + (3)).val(sBean.tnvli[k].nvlv);
							$("#u" + (3)).val(sBean.tnvli[k].nvuv);
							$("#unit" + (3)).val(sBean.tnvli[k].nvut);
						} else if (sBean.tnvli[k].nvsx == "n") {
							$("#l" + (4)).val(sBean.tnvli[k].nvlv);
							$("#u" + (4)).val(sBean.tnvli[k].nvuv);
							$("#unit" + (4)).val(sBean.tnvli[k].nvut);
						}
					} else {
						$("#General").val(sBean.tnvli[k].nvlv);
					}
				}
			}, 500);
			editnewindividual(sBean, ajaxResponse); // edit new individual
			// @author:paras
			// @Date:27-Dec-2016
		}
	});

	$("#idlabtesttemplates").val("0");
}

// set add Tests button
var addlabTest = '<input onclick="addLabTests()"	style="font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;"		type="button" value="Add" />';

function setAddlabTestbutton() {
	var Bean;
	$("#addLabTests").setTemplate(addlabTest);
	$("#addLabTests").processTemplate(Bean);

}

// Delete Laboratory Tests
function deleteLabTest(Id) {
	var r = confirm("Are You Confirm To Delete Lab Test.");
	if (r == true) {

		var inputs = [];
		inputs.push('action=DeleteLabTest');
		inputs.push('id=' + Id);
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
				alert(r);
				location.reload();
			}
		});
	}
}
var getAllMethodTemp = '<option value="select">SELECT</option>{#foreach $T.tmli as tmli}<option value="{$T.tmli.tmid}">{$T.tmli.tmcd} - {$T.tmli.tmnm}</option>{#/for}';

function getAllTestMethod(fetchType) {
	count = 1;

	var inputs = [];
	inputs.push('action=fetchTestMethod');
	inputs.push('fetchType=' + fetchType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;

			pobj1 = eval('(' + ajaxResponse + ')');
			$("#testMethod").setTemplate(getAllMethodTemp);
			$("#testMethod").processTemplate(pobj1);
		}
	});
}

var getAllUnitTemp = '{#foreach $T.unitli as uli}<option value="{$T.uli.unitid}">{$T.uli.unitnm}</option>{#/for}';

function getAllUnitType() {
	count = 1;
	var inputs = [];
	inputs.push('action=fetchUnitType');
	inputs.push('callFrom=' + 'onload');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);

			pobj1 = eval('(' + ajaxResponse + ')');
			for ( var i = 1; i < 5; i++) {
				$("#unit" + i).setTemplate(getAllUnitTemp);
				$("#unit" + i).processTemplate(pobj1);
			}
			unitindi = r;
		}
	});
}

var temp = '<option value="0">SELECT</option>{#foreach $T.dtli as dtli}<option value="{$T.dtli.id}">{$T.dtli.dnm}</option>{#/for}';
var temp1 = '<option value="0">SELECT</option>';
// function to get technician Doctor
function getTechnicianAndDoctor(fetchType, byName) {
	count = 1;

	var inputs = [];
	inputs.push('action=fetchDoctechnician');
	inputs.push('fetchType=' + fetchType);
	inputs.push('byName=' + encodeURIComponent(byName));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajax = r;
			// alert(ajaxResponse);
			var pobj11 = eval('(' + ajax + ')');
			if (byName == "Doctor") {
				$("#doctor").setTemplate(temp);
				$("#doctor").processTemplate(pobj11);
			} else {
				$("#technician").setTemplate(temp1);
				$("#technician").processTemplate(temp1);
			}
		}
	});
}

/** *************laboratory Tests End********** */

/** ***************** Lab Organ Start ****************** */

var temp2 = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 98%; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>ID</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Lab Organ Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 410px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.lbOrgLi as lbOrgLi}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.lbOrgLi.idlbOrg}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.lbOrgLi.lbOrgNm}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onclick='editLabOrgan({$T.lbOrgLi.idlbOrg})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='DELETE' id='btnDelete{count}' onClick='deleteLabOrgan({$T.lbOrgLi.idlbOrg})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

var addViewLabOrganTemp = "<div	style='height: 97.5%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Add Lab Organ</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Lab Organ Name'>Lab Organ Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='headNm' name='headNm' type='text' placeholder='Lab Organ Name' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' />"
		+ "<input type = 'hidden' id = 'idHed' value = '0' /></div>"
		+ "<input type='hidden' id='queryType' value='insert' /></div></div>";

var editViewLabOrganTemp = "<div	style='height: 97.5%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Add Lab Organ</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Lab Organ Name'>Lab Organ Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='headNm' name='headNm' type='text' placeholder='Lab Organ Name' value='{$T.lbOrgNm}' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' />"
		+ "<input type = 'hidden' id = 'idHed' value = '{$T.idlbOrg}' /></div>"
		+ "<input type='hidden' id='queryType' value='update' /></div></div>";

function getLabOrgans(type) {

	var byName = $.trim($("#byName").val());
	if (byName == "" && type == "search") {
		alert("Please Insert Lab Organ Name For Search");
		return false;
	}
	var inputs = [];
	inputs.push('action=getLabOrgans');
	inputs.push('byName=' + encodeURIComponent(byName));
	inputs.push('type=' + type);
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
			count = 1;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#userObj").html(ajaxResponse);

			if (pobj1.lbOrgLi.length == 0) {

				alert("Lab Organ Name Not Found.");

			} else {
				$("#userMangTemp").setTemplate(temp2);
				$("#userMangTemp").processTemplate(pobj1);
				$("#byName").val("");
			}

			var sample = "";
			$("#infoDiv").setTemplate(addViewLabOrganTemp);
			$("#infoDiv").processTemplate(sample);
		}
	});
}

function saveLabOrgans() {
	var groupName = $.trim($("#headNm").val());

	var queryType = $.trim($("#queryType").val());

	var idHed = $.trim($("#idHed").val());

	if (groupName == "") {
		alert("Please Enter Lab Organ Name!");
		SetFocus("headNm");
		return false;
	}

	var inputs = [];
	inputs.push('action=saveLabOrgans');
	inputs.push('groupName=' + encodeURIComponent(groupName));
	inputs.push('queryType=' + queryType);
	inputs.push('idHed=' + idHed);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			alert(ajaxResponse);
			window.location = 'PathologyOrgan.jsp';
		}
	});
}

function editLabOrgan(idtg) {

	$("#userID").val(idtg);
	ajaxResponse = $("#userObj").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.lbOrgLi.length; i++) {

		if (myArray.lbOrgLi[i].idlbOrg == idtg) {
			myObj1 = myArray.lbOrgLi[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj1);
	var myEscapedJSONString = (myObj.decodeSpecialChars());
	userBean = eval('(' + myEscapedJSONString + ')');

	$("#infoDiv").setTemplate(editViewLabOrganTemp);
	$("#infoDiv").processTemplate(userBean);
}

function deleteLabOrgan(idGroup) {
	var r = confirm("Are You Confirm To Remove Lab Organ.");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteLabOrgans');
		inputs.push('idGroup=' + idGroup);
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
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}
/** ***************** Lab Organ Start ****************** */

/** ***************** Lab Doc Charge Type Start ****************** */

var temp3 = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 98%; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>ID</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Doctor Charges Type Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 410px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.lbDocChTypLi as lbDocChTypLi}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.lbDocChTypLi.idDocChTyp}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.lbDocChTypLi.DocChTypNm}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onclick='editDocChargeType({$T.lbDocChTypLi.idDocChTyp})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='DELETE' id='btnDelete{count}' onClick='deleteDocChargeType({$T.lbDocChTypLi.idDocChTyp})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

var addViewDocChargeTypeTemp = "<div	style='height: 97.5%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Add Doctor Charges Type</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Doctor Charges Type Name'>Doctor Charges Type Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='headNm' name='headNm' type='text' placeholder='Doctor Charges Type Name' onkeypress='return validatealphabetic(event)'"
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' />"
		+ "<input type = 'hidden' id = 'idHed' value = '0' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Doctor Charges'>Doctor Charges:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='docCharge' name='docCharge' type='text' placeholder='Doctor Charges' onkeypress='return validateNumbers(event)'"
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' /></div>"
		+ "<input type='hidden' id='queryType' value='insert' /></div></div>";

var editViewDocChargeTypeTemp = "<div	style='height: 97.5%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Edit Doctor Charges Type</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Doctor Charges Type Name'>Doctor Charges Type Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='headNm' name='headNm' type='text' placeholder='Doctor Charges Type Name' value='{$T.DocChTypNm}' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' onkeypress='return validatealphabetic(event)'/>"
		+ "<input type = 'hidden' id = 'idHed' value='{$T.idDocChTyp}' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Doctor Charges'>Doctor Charges:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='docCharge' name='docCharge' type='text' placeholder='Doctor Charges' value='{$T.DocChTypCh}' onkeypress='return validateNumbers(event)'"
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' /></div>"
		+ "<input type='hidden' id='queryType' value='update' /></div></div>";

function editDocChargeType(idtg) {

	$("#userID").val(idtg);
	ajaxResponse = $("#userObj").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.lbDocChTypLi.length; i++) {

		if (myArray.lbDocChTypLi[i].idDocChTyp == idtg) {
			myObj1 = myArray.lbDocChTypLi[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj1);
	var myEscapedJSONString = (myObj.decodeSpecialChars());
	userBean = eval('(' + myEscapedJSONString + ')');

	$("#infoDiv").setTemplate(editViewDocChargeTypeTemp);
	$("#infoDiv").processTemplate(userBean);

}

function getDocChargeTypes(type) {

	var byName = $.trim($("#byName").val());
	if (byName == "" && type == "search") {
		alert("Please Insert Doctor Charges Type Name For Search");
		return false;
	}
	var inputs = [];
	inputs.push('action=getDocChargeTypes');
	inputs.push('byName=' + byName);
	inputs.push('type=' + type);
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
					count = 1;
					// alert(ajaxResponse);
					pobj1 = eval('(' + ajaxResponse + ')');
					$("#userObj").html(ajaxResponse);
					if ($("#pagetype").val() == "labDocCharge") {
						$("#chargeType")
								.setTemplate(
										"<option value='0'>-select-</option>{#foreach $T.lbDocChTypLi as lbDocChTypLi}<option value='{$T.lbDocChTypLi.idDocChTyp}'>{$T.lbDocChTypLi.DocChTypNm}</option>{#/for}");
						$("#chargeType").processTemplate(pobj1);
					} else {
						if (pobj1.lbDocChTypLi.length == 0) {

							alert("Lab Doctor Charges Type Name Not Found.");

						} else {
							$("#userMangTemp").setTemplate(temp3);
							$("#userMangTemp").processTemplate(pobj1);
							$("#byName").val("");
						}

						var sample = "";
						$("#infoDiv").setTemplate(addViewDocChargeTypeTemp);
						$("#infoDiv").processTemplate(sample);
					}
				}
			});
}

function saveDocChargeTypes() {
	var groupName = $.trim($("#headNm").val());
	var docCharge = $.trim($("#docCharge").val());
	var queryType = $.trim($("#queryType").val());

	var idHed = $("#idHed").val();

	if (groupName == "") {
		alert("Please Enter Doctor Charges Type Name!");
		SetFocus("headNm");
		return false;
	} else if (docCharge == "") {
		alert("Please Enter Doctor Charges!");
		SetFocus("docCharge");
		return false;
	}

	var inputs = [];
	inputs.push('action=saveDocChargeTypes');
	inputs.push('groupName=' + encodeURIComponent(groupName));
	inputs.push('queryType=' + queryType);
	inputs.push('idHed=' + idHed);
	inputs.push('docCharge=' + encodeURIComponent(docCharge));
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			alert(ajaxResponse);
			window.location = 'PathologyDocChargeType.jsp';
		}
	});
}

function deleteDocChargeType(idGroup) {
	var r = confirm("Are You Confirm To Remove Lab Doctor Charge Type.");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteDocChargeTypes');
		inputs.push('idGroup=' + idGroup);
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
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}
/** ***************** Lab Doc Charge Type End ****************** */

/** ***************** Lab Pat Type Start ****************** */
function editLabPatType(idtg) {

	$("#userID").val(idtg);
	ajaxResponse = $("#userObj").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.labpatienttypeList.length; i++) {

		if (myArray.labpatienttypeList[i].idlabPatientType == idtg) {
			myObj1 = myArray.labpatienttypeList[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj1);
	var myEscapedJSONString = (myObj.decodeSpecialChars());
	userBean = eval('(' + myEscapedJSONString + ')');

	$("#infoDiv").setTemplate(editViewLabPatTypeTemp);
	$("#infoDiv").processTemplate(userBean);

}

var patTypestemp = '<option value="select">SELECT</option><option value="1">OPD</option><option value="2">IPD</option><option value="3">Diagnostic</option>';

var labPatType = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 98%; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>ID</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Lab Patient Type Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 410px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.labpatienttypeList as labpatienttypeList}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.labpatienttypeList.idlabPatientType}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.labpatienttypeList.patTypeName}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onclick='editLabPatType({$T.labpatienttypeList.idlabPatientType})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='DELETE' id='btnDelete{count}' onClick='deleteLabPatType({$T.labpatienttypeList.idlabPatientType})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

var addViewLabPatTypeTemp = "<div	style='height: 97.5%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Add Lab Patient Type</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Lab Patient Type Name'>Lab Patient Type Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='headNm' name='headNm' type='text' placeholder='Lab Patient Type Name' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' />"
		+ "<input type = 'hidden' id = 'idHed' value = '0' /></div>"
		+ "<input type='hidden' id='queryType' value='insert' /></div></div>";

var editViewLabPatTypeTemp = "<div	style='height: 97.5%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Edit Lab Patient Type</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Lab Patient Type Name'>Lab Patient Type Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='headNm' name='headNm' type='text' placeholder='Lab Patient Type Name' value='{$T.patTypeName}' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' />"
		+ "<input type = 'hidden' id = 'idHed' value='{$T.idlabPatientType}' /></div>"
		+ "<input type='hidden' id='queryType' value='update' /></div></div>";

function getLabPatTypes(type, pageName) {

	var byName = $.trim($("#byName").val());
	if (byName == "" && type == "search") {
		alert("Please Insert Lab Patient Type Name For Search");
		return false;
	}
	var inputs = [];
	inputs.push('action=getLabPatTypes');
	inputs.push('byName=' + encodeURIComponent(byName));
	inputs.push('type=' + type);
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
			count = 1;
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#userObj").html(ajaxResponse);

			if (pageName == "assignedTest") {
				$("#pathospType").setTemplate(patTypestemp);
				$("#pathospType").processTemplate(pobj1);
			} else {
				if (pobj1.labpatienttypeList.length == 0) {

					alert("Lab Patient Type Name Not Found.");

				} else {
					$("#userMangTemp").setTemplate(labPatType);
					$("#userMangTemp").processTemplate(pobj1);
					$("#strValue").val("");
				}

				var sample = "";
				$("#infoDiv").setTemplate(addViewLabPatTypeTemp);
				$("#infoDiv").processTemplate(sample);
			}
		}
	});
}

function saveLabPatTypes() {
	var groupName = $.trim($("#headNm").val());

	var queryType = $.trim($("#queryType").val());

	var idHed = $.trim($("#idHed").val());

	if (groupName == "") {
		alert("Please Enter Lab Patient Type Name!");
		SetFocus("headNm");
		return false;
	}

	var inputs = [];
	inputs.push('action=saveLabPatTypes');
	inputs.push('groupName=' + encodeURIComponent(groupName));
	inputs.push('queryType=' + queryType);
	inputs.push('idHed=' + idHed);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			alert(ajaxResponse);
			window.location = 'PathologyTestPatientType.jsp';
		}
	});
}

function deleteLabPatType(idGroup) {
	var r = confirm("Are You Confirm To Remove Lab Patient Type.");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteLabPatTypes');
		inputs.push('idGroup=' + idGroup);
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
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}
/** ***************** Lab Pat Type End ****************** */

/** *************laboratory Unit Type start********** */

var addlabUnitTypetemp = "<div	style='height: 97.5%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Add Unit Type</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Unit Type'>Unit Type:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='unitName' name='unitName' type='text' placeholder='Unit Type' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' />"
		+ "<input type='hidden' id='idunit' value='0'></div>"
		+ "<input type='hidden' id='queryType' value='insert'></div></div>";

// function to add unit type
function addlabUnitType() {
	var userBean;
	$("#labUnitType").setTemplate(addlabUnitTypetemp);
	$("#labUnitType").processTemplate(userBean);
	$("#unitName").focus();
}
// Save unit Type
function saveUnitType() {
	var idunit = $("#idunit").val();
	var unitname = $.trim($("#unitName").val());
	var queryType = $("#queryType").val();
	if (unitname == "") {
		alert("Please Enter Unit Type.");
		SetFocus("unitName");
	} else {

		var inputs = [];
		inputs.push('action=SaveUnitType');
		inputs.push('queryType=' + queryType);
		inputs.push('idunit=' + idunit);
		inputs.push('unitname=' + encodeURIComponent(unitname));
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PathologyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(r);
				window.location = "labunitType.jsp";
			}
		});
	}
}

var viewunitTypeTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 98%; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>ID</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Unit Type Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 410px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.unitli as uli}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.uli.unitid}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;' id='uname{count}'>{$T.uli.unitnm}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onclick='editUnitType({$T.uli.unitid})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='DELETE' id='btnDelete{count}' onClick='deleteUnitType({$T.uli.unitid})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

// function to fetch all unit type
function ViewUnitList(callFrom) {

	var byName = $("#byName").val();
	if (byName == "" && callFrom == "search") {
		alert("Please Enter Unit Type Name for Search");
		return false;
	}
	if (byName == " " || byName == null) {
		alert("Please Enter Valid Unit Type Name");
		return false;
	}
	count = 1;
	var inputs = [];
	inputs.push('action=fetchUnitType');
	inputs.push('byName=' + encodeURIComponent(byName));
	inputs.push('callFrom=' + callFrom);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#UnitTypeDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			objMRN = JSON.parse(r);
			if (objMRN.unitli.length > 0) {
				$("#UnitTypeList").setTemplate(viewunitTypeTemp);
				$("#UnitTypeList").processTemplate(pobj1);
			} else {
				// alert("Record Not Found");
				ViewUnitList();
			}
			$("#byName").val("");
		}
	});
}

var editUnitTypeTemp = "<div	style='height: 97.5%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Edit Unit Type</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Unit Type'>Unit Type:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='unitName' name='unitName' type='text' placeholder='Unit Type' value='{$T.unitnm}'"
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' />"
		+ "<input type='hidden' id='idunit' value='{$T.unitid}'></div>"
		+ "<input type='hidden' id='queryType' value='update'></div></div>";

// Function to Edit laboratory Unit Type
function editUnitType(unitid) {

	var unitlist = $("#UnitTypeDiv").html();
	var myArray = JSON.parse(unitlist);

	for ( var i = 0; i < myArray.unitli.length; i++) {
		if (myArray.unitli[i].unitid == unitid) {
			myObj = myArray.unitli[i];
			break;
		}
	}

	unitBean = myObj;

	$("#labUnitType").setTemplate(editUnitTypeTemp);
	$("#labUnitType").processTemplate(unitBean);
	setAddunittypebutton();
}

// set add unit type button
var addunittypebutton = '<input onclick="addlabUnitType()"	style="font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;"		type="button" value="Add Unit Type" />';

function setAddunittypebutton() {
	var userBean;
	$("#addUnitType").setTemplate(addunittypebutton);
	$("#addUnitType").processTemplate(userBean);
}

// Delete Laboratory Unit Type
function deleteUnitType(unitid) {
	var r = confirm("Are You Confirm To Delete Unit Type.");
	if (r == true) {

		var inputs = [];
		inputs.push('action=DeleteUnitType');
		inputs.push('unitid=' + unitid);
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
				alert(r);
				location.reload();
			}
		});
	}
}
/** *************laboratory Unit Type End********** */

/** *************laboratory Test Method start********** */

var addlabTestMethodtemp = "<div	style='height: 97.5%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Add Test Method</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Test Method Name'>Test Method Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='methodName' name='methodName' type='text' placeholder='Test Method Name' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' />"
		+ "<input type='hidden' id='idunit' value='0'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Test Method Code'>Test Method Code:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='methodCode' name='methodCode' type='text' placeholder='Test Method Code' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' /></div>"
		+ "<input type='hidden' id='queryType' value='insert'></div></div>";

// function to add Test Method
function addlabTestMethod() {
	var methodBean;
	$("#labTestMethod").setTemplate(addlabTestMethodtemp);
	$("#labTestMethod").processTemplate(methodBean);
	$("#methodName").focus();
}
// Save Test Method
function saveTestMethod() {
	var idmethod = $("#methodId").val();
	var methodName = $("#methodName").val().trim();
	var methodCode = $("#methodCode").val().trim();
	var queryType = $("#queryType").val();
	if (methodName == "" || methodName.length == 0 || methodName == null) {
		alert("Please Enter Test Method Name.");
		SetFocus("methodName");
		$("#methodName").val("");
	} else if (methodCode == "" || methodCode.length == 0 || methodCode == null) {
		alert("Please Enter Test Method Code.");
		SetFocus("methodCode");
		$("#methodCodess").val("");
	} else {

		var inputs = [];
		inputs.push('action=SaveTestMethod');
		inputs.push('queryType=' + queryType);
		inputs.push('idmethod=' + idmethod);
		inputs.push('methodCode=' + encodeURIComponent(methodCode));
		inputs.push('methodName=' + encodeURIComponent(methodName));
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PathologyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(r);
				window.location = "labTestMethod.jsp";
			}
		});
	}
}

var viewTestMethodTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 98%; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>ID</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Test Method Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 410px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.tmli as tmli}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.tmli.tmid}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;' id='uname{count}'>{$T.tmli.tmnm}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onclick='editTestMethod({$T.tmli.tmid})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='DELETE' id='btnDelete{count}' onClick='deleteTestMethod({$T.tmli.tmid})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

// function to fetch all Test Methods
function ViewTestMethodList(fetchType) {
	count = 1;
	var byName = $("#byName").val();
	if (byName == "" && fetchType == "search") {
		alert("Please Insert Test Method Name For Search");
		return false;
	}
	var inputs = [];
	inputs.push('action=fetchTestMethod');
	inputs.push('fetchType=' + fetchType);
	inputs.push('byName=' + encodeURIComponent(byName));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			// alert(r);
			if (r == 0 || r == null) {
				alert("Record Not Fund");
			}
			ajaxResponse = r;
			$("#TestmethodDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			objMRN = JSON.parse(r);

			$("#TestMethodList").setTemplate(viewTestMethodTemp);
			$("#TestMethodList").processTemplate(pobj1);
			$("#byName").val("");

		}
	});
}

var editTestMethodTemp = "<div	style='height: 97.5%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Edit Test Method</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Test Method Name'>Test Method Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='methodName' name='methodName' type='text' placeholder='Test Method Name' value='{$T.tmnm}'"
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' />"
		+ "<input type='hidden' id='methodId' value='{$T.tmid}' ></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Test Method Code'>Test Method Code:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='methodCode' name='methodCode' type='text' placeholder='Test Method Code' value='{$T.tmcd}' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' /></div>"
		+ "<input type='hidden' id='queryType' value='update'></div></div>";

// Function to Edit laboratory Test Method
function editTestMethod(methodid) {

	var methodlist = $("#TestmethodDiv").html();
	var myArray = JSON.parse(methodlist);

	for ( var i = 0; i < myArray.tmli.length; i++) {
		if (myArray.tmli[i].tmid == methodid) {
			myObj = myArray.tmli[i];
			break;
		}
	}
	// myObj = JSON.stringify(myObj);
	methodBean = myObj;

	$("#labTestMethod").setTemplate(editTestMethodTemp);
	$("#labTestMethod").processTemplate(methodBean);
	setAddTestMethodbutton();
}

// set add Test Method button
var addtestMethodbutton = '<input onclick="addlabTestMethod()"	style="font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;"		type="button" value="Add Test Method" />';

function setAddTestMethodbutton() {
	var Bean;
	$("#addTestMethod").setTemplate(addtestMethodbutton);
	$("#addTestMethod").processTemplate(Bean);
}

// Delete Laboratory Test Method
function deleteTestMethod(methodId) {
	var r = confirm("Are You Confirm To Delete Test Method.");
	if (r == true) {

		var inputs = [];
		inputs.push('action=DeleteTestMethod');
		inputs.push('methodId=' + methodId);
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
				alert(r);
				location.reload();
			}
		});
	}
}
/** *************laboratory Test Method End********** */

/** *************laboratory Test Sample start********** */

var addlabTestSampletemp = "<div	style='height: 97.5%; border: 1px solid #ddd;' >"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Add Test Sample:</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Test Sample Name'>Test Sample Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='sampleName' name='sampleName' type='text' placeholder='Test Sample Name' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' /></div>"
		+ "<input type='hidden' id='queryType' value='insert' />	</div></div>";

// function to add Test Sample
function addlabTestSample() {
	var SampleBean = "";
	$("#labTestSample").setTemplate(addlabTestSampletemp);
	$("#labTestSample").processTemplate(SampleBean);
	$("#sampleName").focus();
}
// Save Test Sample
function saveTestSample() {
	var idSample = $("#sampleId").val();
	var sampleName = $("#sampleName").val().trim();
	// alert(sampleName.length);
	var queryType = $("#queryType").val();

	if (sampleName == ' ' || sampleName == null || sampleName.length == 0) {
		alert("Please Enter Test Sample Name.");
		SetFocus("sampleName");
		$("#sampleName").val("");

	} else {

		var inputs = [];
		inputs.push('action=SaveTestSample');
		inputs.push('queryType=' + queryType);
		inputs.push('idSample=' + idSample);
		inputs.push('sampleName=' + encodeURIComponent(sampleName));
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PathologyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(r);
				window.location = "labSample.jsp";
			}
		});
	}
}

var viewTestSampleTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 98%; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>ID</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Laboratory Test Sample</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 410px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.smplli as smplli}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.smplli.smplid}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;' id='uname{count}'>{$T.smplli.smplnm}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onclick='editTestSample({$T.smplli.smplid})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='DELETE' id='btnDelete{count}' onClick='deleteTestSample({$T.smplli.smplid})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

// function to fetch all Test Sample
function ViewTestSampleList(fetchType) {
	count = 1;
	var byName = $("#byName").val();
	if (byName == ""
			&& (fetchType == "search" || fetchType == "searchlabSample")) {
		alert("Please Insert Test Sample Name For Search");
		return false;
	}
	var inputs = [];
	inputs.push('action=fetchTestSample');
	inputs.push('fetchType=' + fetchType);
	inputs.push('byName=' + encodeURIComponent(byName));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);

			$("#TestSampleDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if (fetchType == "search" || fetchType == "searchlabSample") {
				if (pobj1.smplli.length == 0) {
					alert("Record Not Found.");
					SetFocus("sampleName");
					return false;
				}
			}

			$("#TestSampleList").setTemplate(viewTestSampleTemp);
			$("#TestSampleList").processTemplate(pobj1);
			$("#byName").val("");

		}
	});
}

var editTestSampleTemp = "<div	style='height: 97.5%; border: 1px solid #ddd;' >"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Edit Test Sample:</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Test Sample Name'>Test Sample Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='sampleName' name='sampleName' type='text' placeholder='Test Sample Name' value='{$T.smplnm}' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' /></div>"
		+ "<input type='hidden' id='sampleId' value='{$T.smplid}' />"
		+ "<input type='hidden' id='queryType' value='update' />	</div></div>";

// Function to Edit laboratory Test Sample
function editTestSample(sampleid) {

	var samplelist = $("#TestSampleDiv").html();
	var myArray = JSON.parse(samplelist);

	for ( var i = 0; i < myArray.smplli.length; i++) {
		if (myArray.smplli[i].smplid == sampleid) {
			myObj = myArray.smplli[i];
			break;
		}
	}
	// myObj = JSON.stringify(myObj);
	sBean = myObj;

	$("#labTestSample").setTemplate(editTestSampleTemp);
	$("#labTestSample").processTemplate(sBean);
	setAddTestSamplebutton();
}

// set add Test Sample button
var addtestSamplebutton = '<input onclick="addlabTestSample()"	style="font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;"		type="button" value="Add Test Sample" />';

function setAddTestSamplebutton() {
	var Bean = "";
	$("#addTestSample").setTemplate(addtestSamplebutton);
	$("#addTestSample").processTemplate(Bean);
}

// Delete Laboratory Test Sample
function deleteTestSample(sampleId) {
	var r = confirm("Are You Confirm To Delete Test Sample.");
	if (r == true) {

		var inputs = [];
		inputs.push('action=DeleteTestSample');
		inputs.push('sampleId=' + sampleId);
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
				alert(r);
				location.reload();
			}
		});
	}
}
/** *************laboratory Test Sample End********** */

/** *************laboratory Doctor,Technician Start********** */

var addDoctorTechniciantemp = "<div	style='height: 97.5%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Add Doctor or Technician:</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Select entry Type'>Select entry Type:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<select class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' id='entryType' style='width: 100%;' onchange='setDoctorChargesType()'>"
		+ "<option value='select'>Select</option>"
		+ "<option value='Doctor'>Doctor</option><option value='Technician'>Technician</option></select></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Name'>Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='Name' name='Name' type='text' placeholder='Name' maxlength='45' required='true' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' onkeypress='return validatealphabetic(event)' />"
		+ "<input type='hidden' id='Id' value='0' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='address'>Address<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='address' name='address' type='text' placeholder='Address' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='250'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='City'>City</label>"
		+ "<input id='city' name='city' type='text' placeholder='City' onkeypress='return validatealphabetic(event)' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='50'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='State'>State</label>"
		+ "<input id='state' name='state' type='text' placeholder='State' onkeypress='return validatealphabetic(event)' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='50'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Phone Number'>Phone Number<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='phone' name='phone' type='text' placeholder='Phone Number' onkeypress='return validateNumbers(event)' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='10'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Email Id'>Email Id<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='email' name='email' type='text' placeholder='Email Id' onchange='return ValidateEmail()' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='50'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Degree'>Degree<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='degree' name='degree' type='text' placeholder='Degree' onkeypress='return validatealphabetic(event)'"
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='50'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;' id='DoctorPlan'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Doctor Charges Type'>Doctor Charges Type:</label>"
		+ "<select id='chargeType' class='form-control input-SmallText col-md-7-1' style='margin-left:0%;'></select></div>"
		+ "<input type='hidden' id='queryType' value='insert'></div></div>";

// function to add Doctor,Technician
function addDoctorTechnician() {
	var SampleBean = "";
	$("#labDoctech").setTemplate(addDoctorTechniciantemp);
	$("#labDoctech").processTemplate(SampleBean);
	getDocChargeTypes("onload");
	$("#Name").focus();
}

function setDoctorChargesType() {
	var entryType = $("#entryType").val();
	if (entryType == "Doctor") {
		$("#chargeType").attr("disabled", false);
	} else {
		$("#chargeType").attr("disabled", true);
	}
}

// Save Doctor,Technician
function saveDoctorTechnician() {
	var id = $("#Id").val();
	var name = $("#Name").val();
	var address = $("#address").val();
	var city = $("#city").val();
	var state = $("#state").val();
	var degree = $("#degree").val();
	var phone = $("#phone").val();
	var email = $("#email").val();
	var chargeType = $("#chargeType :selected").val();
	var entryType = $("#entryType :selected").val();
	var queryType = $("#queryType").val();
	if (entryType == "select") {
		alert("Please select Entry Type.");
		SetFocus("entryType");
		return false;
	} else if (name == "") {
		alert("Please Enter Name.");
		SetFocus("Name");
		return false;
	} else if (address == "") {
		alert("Please Enter address.");
		SetFocus("address");
		return false;
	} else if (phone == "") {
		alert("Please Enter phone number.");
		SetFocus("phone");
		return false;
	} else if (phone.length != 10) {
		alert("Only 10 Digit Mobile Number Allow.");
		setFocus("phone");
		return false;
	} else if (email == "") {
		alert("Please Enter Email Id.");
		SetFocus("email");
		return false;
	} else if (degree == "") {
		alert("Please Enter degree.");
		SetFocus("degree");
		return false;
	} else if (email != "") {
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (email.match(mailformat)) {
			// return true;
		} else {
			alert("You have entered an invalid email address!");
			SetFocus("email");
			return false;
		}
	}

	var inputs = [];
	inputs.push('action=SaveDoctorTechnician');
	inputs.push('queryType=' + queryType);
	inputs.push('id=' + id);
	inputs.push('address=' + encodeURIComponent(address));
	inputs.push('city=' + encodeURIComponent(city));
	inputs.push('state=' + encodeURIComponent(state));
	inputs.push('degree=' + encodeURIComponent(degree));
	inputs.push('phone=' + encodeURIComponent(phone));
	inputs.push('email=' + encodeURIComponent(email));
	inputs.push('entryType=' + entryType);
	inputs.push('chargeType=' + chargeType);
	inputs.push('name=' + encodeURIComponent(name));
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			alert(r);
			location.reload();
		}
	});
}

var ViewDoctechnicianTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 98%; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>ID</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Laboratory User</div></th>"
		+ "<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Type</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 410px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.dtli as dtli}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.dtli.id}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;' id='uname{count}'>{$T.dtli.dnm}</td>"
		+ "<td class='col-sm-1-1' style='height: 21.5px;'>{$T.dtli.dty}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onclick='editDoctechnician({$T.dtli.id})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='DELETE' id='btnDelete{count}' onClick='deleteDoctechnician({$T.dtli.id})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

// function to fetch all Doctor,Technician
function ViewDoctechnicianList(fetchType) {
	count = 1;

	var byName = $.trim($("#byName").val());
	if (byName == "" && fetchType == "search") {
		alert("Please Insert Lab Doctor or Technician Name");
		return false;
	}

	var inputs = [];
	inputs.push('action=fetchDoctechnician');
	inputs.push('fetchType=' + fetchType);
	inputs.push('byName=' + encodeURIComponent(byName));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			$("#DoctechDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if (fetchType == "search" && pobj1.dtli.length == 0) {
				alert("Detail  Not Found");
				return false;
			}
			$("#labDoctechList").setTemplate(ViewDoctechnicianTemp);
			$("#labDoctechList").processTemplate(pobj1);
			$("#byName").val("");
		}
	});
}

var editDocTechTemp = "<div	style='height: 97.5%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Edit Doctor or Technician:</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Select entry Type'>Select entry Type:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<select class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' id='entryType' onchange='setDoctorChargesType()'>"
		+ "<option value='select'>Select</option>"
		+ "<option value='Doctor'>Doctor</option><option value='Technician'>Technician</option></select></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Name'>Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='Name' name='Name' type='text' placeholder='Name' maxlength='45' required='true' value='{$T.dnm}' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' onkeypress='return validatealphabetic(event)' />"
		+ "<input type='hidden' id='Id' value='{$T.id}' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='address'>Address<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='address' name='address' type='text' placeholder='Address' value='{$T.add}' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='250'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='City'>City</label>"
		+ "<input id='city' name='city' type='text' placeholder='City' value='{$T.ct}' onkeypress='return validatealphabetic(event)' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='50'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='State'>State</label>"
		+ "<input id='state' name='state' type='text' placeholder='State' value='{$T.st}' onkeypress='return validatealphabetic(event)' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='50'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Phone Number'>Phone Number<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='phone' name='phone' type='text' placeholder='Phone Number' value='{$T.ph}' onkeypress='return validateNumbers(event)' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='10'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Email Id'>Email Id<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='email' name='email' type='text' placeholder='Email Id' onchange='return ValidateEmail()' value='{$T.em}' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='50'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Degree'>Degree<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='degree' name='degree' type='text' placeholder='Degree' value='{$T.deg}' onkeypress='return validatealphabetic(event)'"
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='50'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;' id='DoctorPlan'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Doctor Charges Type'>Doctor Charges Type:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<select id='chargeType' value='{$T.iddchr}' class='form-control input-SmallText col-md-7-1' style='margin-left:0%;'></select></div>"
		+ "<input type='hidden' id='queryType' value='update'></div></div>";

// Function to Edit laboratory Doctor,Technician
function editDoctechnician(id) {

	var list = $("#DoctechDiv").html();
	var myArray = JSON.parse(list);

	for ( var i = 0; i < myArray.dtli.length; i++) {
		if (myArray.dtli[i].id == id) {
			myObj = myArray.dtli[i];
			break;
		}
	}
	// myObj = JSON.stringify(myObj);
	sBean = myObj;

	$("#labDoctech").setTemplate(editDocTechTemp);
	$("#labDoctech").processTemplate(sBean);
	$("#entryType").val(sBean.dty);
	getDocChargeTypes("onload");

	setTimeout(function() {
		$("#chargeType").val(sBean.iddchr);
	}, 100);

	if (sBean.dty == "Technician") {
		$("#chargeType").attr("disabled", true);
	}
	setAddDocTechnicianbutton();
}

// set add Doctor,Technician button
var addTechnicianbutton = '<input onclick="addDoctorTechnician()"	style="font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;"		type="button" value="Add" />';

function setAddDocTechnicianbutton() {
	var Bean;
	$("#addTechnician").setTemplate(addTechnicianbutton);
	$("#addTechnician").processTemplate(Bean);
}

// Delete Laboratory Doctor,Technician
function deleteDoctechnician(Id) {
	var r = confirm("Are You Confirm To Delete This Record.");
	if (r == true) {

		var inputs = [];
		inputs.push('action=DeleteDocTechnician');
		inputs.push('id=' + Id);
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
				alert(r);
				location.reload();
			}
		});
	}
}
/** *************laboratory Doctor,Technician End********** */

/** *************laboratory Collection Center ********** */

var addCollectiontemp = "<div	style='height: 97.5%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Add Collection Center:</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Collection Center Name'>Collection Center Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='Name' name='Name' type='text' placeholder='Collection Center Name' maxlength='100' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' onkeypress='return validatealphabetic(event)' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Collection Center Address'>Collection Center Address:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='address' name='address' type='text' placeholder='Collection Center Address' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='225'/>"
		+ "<input type='hidden' id='idHed' value='0'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Collection Center City'>Collection Center City:</label>"
		+ "<input id='city' name='city' type='text' placeholder='Collection Center City' maxlength='50' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' onkeypress='return validatealphabetic(event)' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Collection Center State'>Collection Center State:</label>"
		+ "<input id='state' name='state' type='text' placeholder='Collection Center State' maxlength='50' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' onkeypress='return validatealphabetic(event)' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Collection Center Phone Number'>Collection Center Phone Number:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='phone' name='phone' type='text' placeholder='Collection Center Phone Number' maxlength='10' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' onkeypress='return validateNumbers(event)' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Collection Center Email Id'>Collection Center Email Id:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='email' name='email' type='text' placeholder='Collection Center Email Id' maxlength='45' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' onblur='return ValidateEmail()' /></div>"
		+ "<input type='hidden' id='queryType' value='insert'></div></div>";

// function to add collection center
function addcollection() {
	var SampleBean;
	$("#labcollection").setTemplate(addCollectiontemp);
	$("#labcollection").processTemplate(SampleBean);
	$("#Name").focus();
}
// Save collection center
function saveCollectionCenter() {
	var id = $("#Id").val();
	var name = $("#Name").val();
	var address = $("#address").val();
	var city = $("#city").val();
	var state = $("#state").val();
	var phone = $("#phone").val();
	var email = $("#email").val();
	var queryType = $("#queryType").val();
	if (name == "") {
		alert("Please Enter Collection Center  Name.");
		SetFocus("Name");
		return false;
	} else if (address == "") {
		alert("Please Enter Collection Center Address.");
		SetFocus("address");
		return false;
	} else if (phone == "") {
		alert("Please Enter Collection Center Phone Number.");
		SetFocus("phone");
		return false;
	} else if (phone.length != 10) {
		alert("Only 10 Digit Mobile Number Allow.");
		setFocus("phone");
		return false;
	} else if (email == "") {
		alert("Please Enter  Email Id.");
		SetFocus("email");
		return false;
	} else if (email != "") {
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (email.match(mailformat)) {
			// return true;
		} else {
			alert("You have entered an invalid email address!");
			SetFocus("email");
			return false;
		}
	}

	var inputs = [];
	inputs.push('action=saveCollectionCenter');
	inputs.push('queryType=' + queryType);
	inputs.push('id=' + id);
	inputs.push('address=' + encodeURIComponent(address));
	inputs.push('city=' + encodeURIComponent(city));
	inputs.push('state=' + encodeURIComponent(state));
	inputs.push('phone=' + encodeURIComponent(phone));
	inputs.push('email=' + encodeURIComponent(email));
	inputs.push('name=' + encodeURIComponent(name));
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			alert(r);
			location.reload();
		}
	});

}

var colltemp = '<option value="0">SELECT</option>{#foreach $T.ccli as ccli}<option value="{$T.ccli.ccid}">{$T.ccli.ccnm}</option>{#/for}';

var ViewCollectionCenterTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 98%; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>ID</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Collection Center Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 410px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.ccli as ccli}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.ccli.ccid}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;' id='uname{count}'>{$T.ccli.ccnm}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onclick='editCollectionCenter({$T.ccli.ccid})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='DELETE' id='btnDelete{count}' onClick='deleteCollectionCenter({$T.ccli.ccid})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

// function to fetch all collection center
function ViewCollectionCenterList(fetchType, pagenm) {

	count = 1;
	var byName = $("#byName").val();
	/*
	 * if(fetchType == 'search'){ if(byName == "" || byName == null) {
	 * alert("Please Enter Something For Search."); SetFocus("byName"); } }
	 */
	var inputs = [];
	inputs.push('action=fetchCollectionCenter');
	inputs.push('fetchType=' + fetchType);
	inputs.push('byName=' + encodeURIComponent(byName));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pagenm == "assignedTest") {
				$("#collcenter").setTemplate(colltemp);
				$("#collcenter").processTemplate(pobj1);

			} else {
				if (fetchType != "onload") {
					if (byName == "" || byName == null) {
						alert("Please Enter Something For Search.");
						SetFocus("byName");

					} else {

						SetFocus("byName");
					}
				}
				$("#collectionDiv").html(ajaxResponse);
				$("#labcollectionList").setTemplate(ViewCollectionCenterTemp);
				$("#labcollectionList").processTemplate(pobj1);
				$("#byName").val("");
			}
		}
	});
}

var editCollectionTemp = "<div	style='height: 97.5%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Edit Collection Center:</h3></div>"
		+ "<div class='divide-10'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Collection Center Name'>Collection Center Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='Name' name='Name' type='text' placeholder='Collection Center Name' maxlength='100' value='{$T.ccnm}' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' onkeypress='return validatealphabetic(event)' />"
		+ "<input type='hidden' id='Id' value='{$T.ccid}'></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Collection Center Address'>Collection Center Address:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='address' name='address' type='text' placeholder='Collection Center Address' value='{$T.ccadd}' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='225'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Collection Center City'>Collection Center City:</label>"
		+ "<input id='city' name='city' type='text' placeholder='Collection Center City' maxlength='50' value='{$T.ccct}' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' onkeypress='return validatealphabetic(event)' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Collection Center State'>Collection Center State:</label>"
		+ "<input id='state' name='state' type='text' placeholder='Collection Center State' maxlength='50' value='{$T.ccst}' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' onkeypress='return validatealphabetic(event)' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Collection Center Phone Number'>Collection Center Phone Number:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='phone' name='phone' type='text' placeholder='Collection Center Phone Number' maxlength='10' value='{$T.ccph}' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' onkeypress='return validateNumbers(event)' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Collection Center Email Id'>Collection Center Email Id:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='email' name='email' type='text' placeholder='Collection Center Email Id' maxlength='45' value='{$T.ccem}' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' onblur='return validateEmail()' /></div>"
		+ "<input type='hidden' id='queryType' value='update'></div></div>";

// Function to Edit laboratory collection center
function editCollectionCenter(id) {

	var list = $("#collectionDiv").html();
	var myArray = JSON.parse(list);

	for ( var i = 0; i < myArray.ccli.length; i++) {
		if (myArray.ccli[i].ccid == id) {
			myObj = myArray.ccli[i];
			break;
		}
	}
	// myObj = JSON.stringify(myObj);
	sBean = myObj;

	$("#labcollection").setTemplate(editCollectionTemp);
	$("#labcollection").processTemplate(sBean);
	setAddCollectionbutton();
}

// set add collection center button
var addcollectionbutton = '<input onclick="addcollection()"	style="font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;"		type="button" value="Add" />';

function setAddCollectionbutton() {
	var Bean;
	$("#addcollection").setTemplate(addcollectionbutton);
	$("#addcollection").processTemplate(Bean);
}

// Delete Laboratory collection center
function deleteCollectionCenter(Id) {
	var r = confirm("Are You Confirm To Delete Collection Center.");
	if (r == true) {

		var inputs = [];
		inputs.push('action=DeleteCollectionCenter');
		inputs.push('id=' + Id);
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
				alert(r);
				location.reload();
			}
		});
	}
}
/** *************laboratory collection center End********** */

/** ************* Start Sagar ******************************************** */

function searchPatientAssignedTest() {

	var byName = $("#byName").val();
	var byId = $("#byId").val();
	var searchBy;
	var value;
	if (byName != "" && byId != "") {
		alert("Please Search Either By Patient Id or by Patient Name!");
		SetFocus("byName");
		return false;
	} else if (byName == "" && byId == "") {
		alert("Please Enter Patient Name Or Patient Id!");
		SetFocus("byName");
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
		inputs.push('action=searchPatientAssignedTest');
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + encodeURIComponent(value));
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PathologyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(ajaxResponse);
				count = 1;
				$("#pathologyAllPatInfo").html(ajaxResponse);
				pobj1 = eval('(' + ajaxResponse + ')');
				$("#container").setTemplate(pathologyPatientDashboard);
				$("#container").processTemplate(pobj1);
			}
		});
	}

}

var editPatientAssignedTestTemp = "{#foreach $T.liGrpSlave as liGrpSlave}{#foreach $T.liGrpSlave.liTstSlave as liTstSlave}<div id='divId{divCount}'	style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div	style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{divCount}</div><div id='uname2' style='width: 47%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: left;'>{$T.liTstSlave.objTst.tName}</div><div id='patAmt{divCount}' style='width: 17%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.liTstSlave.objTst.patAmt}</div><div style='width: 16%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.liTstSlave.st}</div><div style='width: 7%; height: 23px; padding-left: 1%; padding-top: 5px; text-align: center;'>	<input id='assignedCheckbox' name='assignedCheckbox{divCount}' type='checkbox' value='{$T.liTstSlave.tstId}'></div></div><input type='hidden' id='idTestSlave{divCount}' value='{$T.liTstSlave.idTestSlave}'><input type='hidden' value='{divCount++}'>{#/for}{#/for}<input	type='hidden' id='divCount' value='{divCount}' />";

function setEditPatientAssignedTestTemp(myObj) {
	$("#divtotalAmt").html(myObj.tlamt);
	$("#assignTestDiv").setTemplate(editPatientAssignedTestTemp);
	$("#assignTestDiv").processTemplate(myObj);
}

function editPatientAssignTests(testMasterId) {
	// alert(patientId);
	var myArray = JSON.parse($("#pathologyAllPatInfo").html());
	for ( var i = 0; i < myArray.liTestMaster.length; i++) {
		if (myArray.liTestMaster[i].idtestmstr == testMasterId) {
			myObj = myArray.liTestMaster[i];
			break;
		}
	}

	myObj = JSON.stringify(myObj);
	window.location = "PathologyEditPatientAssignTests.jsp?" + "myObj="
			+ encodeURIComponent(myObj);

}

function savePatientTestsRoutine() {
	var rowCount = $("#rowCount").val();
	var patientSubTests = {
		lisubTestSlave : []
	};
	for ( var i = 1; i <= rowCount; i++) {
		var reading = $("#reading" + i).val();
		var idSubTestSlave = $("#idSubTestSlave" + i).val();
		var status = "Completed";
		var reportStatus;
		if ($("#chk" + i).is(':checked')) {
			reportStatus = "SR";
		} else {
			reportStatus = "NR";
		}

		if (reading == "") {
			alert("Please Enter Reading For #" + i);
			return false;
		}
		patientSubTests.lisubTestSlave.push({
			"idSubTestSlave" : idSubTestSlave,
			"reading" : reading,
			"st" : status,
			"repoSt" : reportStatus
		});

	}
	patientSubTests = JSON.stringify(patientSubTests);
	var testMasterId = $("#testMasterId").val();
	var docComment = $("#docComment").val();

	var inputs = [];
	inputs.push('action=savePatientTestsRoutine');
	inputs.push('patientSubTests=' + patientSubTests);
	inputs.push('testMasterId=' + testMasterId);
	inputs.push('docComment=' + encodeURIComponent(docComment));

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
			alert(ajaxResponse);
			window.location.href = "PathologyPatientDashboard.jsp";
		}
	});

}

var patientRoutingTestFinding = "{#foreach $T.liGrpSlave as liGrpSlave} {#foreach $T.liGrpSlave.liTstSlave as liTstSlave}{#foreach $T.liTstSlave.liSubTstSlave as liSubTests} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count}.</div><div style='width: 16%; height: 23px; padding-left: 1%; border-right: 1px solid #069; padding-top: 5px;'>{$T.liTstSlave.objTst.tName}</div><div style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.liSubTests.objSubTst.subnm}</div><div style='width: 10%; height: 23px; border-right: 1px solid #069; text-align: center; padding-top: 5px;'><input type='text' id='reading{count}' value='{$T.liSubTests.reading}' style='width: 60%'></div><div style='width: 10%; height: 23px; border-right: 1px solid #069; text-align: center; padding-top: 5px;'>{$T.liSubTests.objSubTst.unt}</div><div style='width: 10%; height: 25px; border-right: 1px solid #069; text-align: center; padding-top: 3px; text-align: center;'>{$T.liSubTests.objSubTst.nrange}</div><div	style='width: 12%; height: 25px; border-right: 1px solid #069; text-align: center; padding-top: 3px; text-align: center;'>{#if $T.liSubTests.repoSt=='SR'}<input type='checkbox' id='chk{count}' checked='checked' value='{$T.liSubTests.idSubTestSlave}'>{#/if}{#if $T.liSubTests.repoSt=='NR'}<input type='checkbox' id='chk{count}'  value='{$T.liSubTests.idSubTestSlave}'>{#/if}</div></div><input id='idSubTestSlave{count}' type='hidden'	value='{$T.liSubTests.idSubTestSlave}' /><input type='hidden' value='{count++}' />{#/for}{#/for}{#/for}<input id='rowCount' type='hidden' value='{--count}' />";

function setAssignedTestTemp(myObj) {

	$("#assignTestDiv").setTemplate(patientRoutingTestFinding);
	$("#assignTestDiv").processTemplate(myObj);
}

function viewPathologyRoutineTestFindings(idtestmstr) {
	myArray = JSON.parse($("#pathologyAllPatInfo").html());
	for ( var i = 0; i < myArray.liTestMaster.length; i++) {
		if (myArray.liTestMaster[i].idtestmstr == idtestmstr) {
			myObj = myArray.liTestMaster[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	window.location = "PathologyRoutineTestFindings.jsp?" + "myObj="
			+ encodeURIComponent(myObj);

}

function patientBill(idtestmstr) {

	myArray = JSON.parse($("#pathologyAllPatInfo").html());
	for ( var i = 0; i < myArray.liTestMaster.length; i++) {
		if (myArray.liTestMaster[i].idtestmstr == idtestmstr) {
			myObj = myArray.liTestMaster[i];
			pi = myArray.liTestMaster[i].objPat.pi;
			var totalAmount = myArray.liTestMaster[i].tlamt;
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	window.location.href = "PathologypatientBill.jsp?" + "myObj="
			+ encodeURIComponent(myObj) + "&totalAmount=" + totalAmount;

}

var patReportTestTemp = '<div style="width: 100%; padding-left: 1%; padding-top: 1%; padding-right: 7%; float: left;"><table border="" width="650" height="30";><tr>	<td><center><font size=4><b>SEROLOGY</b></font>	</center></td></tr></table></div><div style="width: 100%; padding-left: 27%; padding-top: 1%; padding-right: 7%; float: left;"><table border="" width="300" height="20";><tr><td><center fontsize="20">REPORT ON APOLIPOPROTEIN</center></td></tr></table></div><div style="width: 100%; padding-left: 1%; padding-top: 1%; padding-right: 7%; float: left;"><table border="" width="650" height="30";><tr><td><center>DESCRIPTION</center></td><td><center>OBSERVED VALUE</center></td><td><center>UNIT</center></td><td><center>NORMAL VALUE</center></td></tr></table>{for }<table width="650" height="30" cellspacing="0" cellpadding="0"	style="border: 1px solid; border-color: gray;"><tr><td align="center" style="border: 1px solid;border-color: gray; "><center>DESCRIPTION</center></td><td align="center" style="border: 1px solid; border-color: gray;"><center>OBSERVED VALUE</center></td><td align="center" style="border: 1px solid;border-color: gray;"><center>UNIT</center></td><td align="center" style="border: 1px solid; border-color: gray;"><center>NORMAL VALUE</center></td></tr></table>{#for}</div>';

function setReportDetails() {

	var ajaxResponce = $("#myObj").html();
	userBean = eval('(' + ajaxResponce + ')');
	// alert(ajaxResponce);
	pname = userBean.objPat.fn + " " + userBean.objPat.ln;
	$("#pName").html(pname);
	$("#regDate").html(userBean.objPat.rgDt);
	$("#age").html(userBean.objPat.ag);
	$("#sex").html(userBean.objPat.sx);
	$("#refDoc").html(userBean.objPat.objTreat.rb);
	$("#reportTest").setTemplate($("#reportTest").html());
	$("#reportTest").processTemplate(userBean);

}
var pathologyPatientDashboard = "{#foreach $T.liTestMaster as liTestMaster}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div	style='width: 13%;padding-left: 1%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{$T.liTestMaster.currTime}</div><div style='width: 19%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.liTestMaster.objPat.tit}{$T.liTestMaster.objPat.fn} {$T.liTestMaster.objPat.mn} {$T.liTestMaster.objPat.ln}</div><div style='width: 5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.liTestMaster.objPat.trid}</div><div style='width: 5.5%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px; text-align: center;'>{$T.liTestMaster.objPat.ag} {$T.liTestMaster.objPat.agtp}</div><div style='width: 5%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px; text-align: center;'>{$T.liTestMaster.objPat.sx}</div><div	style='width: 7.5%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px; text-align: center;'>{$T.liTestMaster.objPat.mb}</div><div	style='width: 9%; height: 25px; padding-left: 1%; padding-top: 3px; border-right: 1px solid #069;'><input onclick=editPatientAssignTests({$T.liTestMaster.idtestmstr})	style='font-size: 10px;' type='button' value='ROUTINE TESTS' class='edit' /></div><div	style='width: 4%; height: 25px; padding-left: 1%; padding-top: 3px; border-right: 1px solid #069;'><input onclick=patientBill({$T.liTestMaster.idtestmstr})	style='font-size: 10px;' type='button' value='BILL' class='edit' /></div><div style='width: 9.5%; height: 25px; padding-left: 0.5%; padding-top: 3px; border-right: 1px solid #069;'><input onclick=viewPathologyRoutineTestFindings({$T.liTestMaster.idtestmstr}) style='font-size: 10px;' type='button' value='ROUTINE VALUES'	class='edit' /></div><div style='width: 9.5%; height: 25px; padding-left: 0.5%; padding-top: 3px;'><input onclick=viewPathalogyPatientReport({$T.liTestMaster.idtestmstr}) style='font-size: 10px;' type='button' value='ROUTINE REPORT' class='edit' /></div></div>{#/for}";

function fetchPatientAssignedTest() {
	var inputs = [];
	inputs.push('action=fetchPatientAssignedTest');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			$("#pathologyAllPatInfo").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(pathologyPatientDashboard);
			$("#container").processTemplate(pobj1);

		}
	});
}

function savePatientAssignedTests() {
	var idTestSlave;
	var queryType = $("#queryType").val();
	var allVals = [];
	var rowCount = $("#divCount").val();
	for ( var i = 1; i <= (rowCount - 1); i++) {
		var radios = $('input:checkbox[name=assignedCheckbox' + i + ']');
		allVals.push(radios.val());
	}

	if (allVals.length == 0) {
		alert("Please Assign Test First");
		return false;
	}
	var patientTests = [];

	var testDetails = $("#testDetails").html();
	var myArray = JSON.parse(testDetails);

	var k = 0;
	for ( var i = 0; i < myArray.listTestGrp.length; i++) {
		var j = 0;
		var liTestLength = myArray.listTestGrp[i].liTests.length;
		for ( var m = 0; m < liTestLength; m++) {
			if (myArray.listTestGrp[i].liTests[j].idTest != allVals[k]) {
				myArray.listTestGrp[i].liTests.splice(j, 1);

			} else {
				if (j != myArray.listTestGrp[i].liTests.length
						&& k != allVals.length) {
					j++;
					k++;

				} else {
					break;
				}
			}

		}
	}

	patientTests = JSON.stringify(myArray);
	var trId = $("#treatmentId").val();
	var totalAmt = $("#divtotalAmt").html();
	var testMasterId = $("#testMasterId").val();

	var inputs = [];
	inputs.push('action=savePatientAssignedTests');
	inputs.push('patientTests=' + patientTests);
	inputs.push('trId=' + trId);
	inputs.push('totalAmt=' + encodeURIComponent(totalAmt));
	inputs.push('queryType=' + queryType);
	inputs.push('testMasterId=' + testMasterId);

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
			alert(ajaxResponse);
			// window.location.href = "PathologyPatientDashboard.jsp";
		}
	});
}

function addTestToPatients() {

	var allVals = [];
	$.each($('#checkbox:checked'), function() {
		allVals.push($(this).val());
	});
	if (allVals.length == 0) {
		alert("Please Select Test Name First");
		return false;
	}
	var divCount = $("#divCount").val();
	myArray = JSON.parse($("#testDetails").html());
	for ( var k = 0; k < myArray.listTestGrp.length; k++) {
		for ( var i = 0; i < myArray.listTestGrp[k].liTests.length; i++) {
			if (allVals.length != 0) {
				for ( var j = 0; j < allVals.length; j++) {
					if (myArray.listTestGrp[k].liTests[i].idTest == allVals[j]) {
						myObj = myArray.listTestGrp[k].liTests[i];
						myObj = JSON.stringify(myObj);
						myObj = JSON.parse(myObj);

						var x = document.createElement('div');
						x.setAttribute('id', 'divId' + divCount);
						x
								.setAttribute('style',
										'width:100%; height: 28px; border-bottom: 1px solid #069;');

						document.getElementById("assignTestDiv").appendChild(x);
						document.getElementById('divId' + divCount).innerHTML = '<div style="width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
								+ divCount
								+ '</div><div id="uname2" style="width: 47%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: left;">'
								+ myObj.tName
								+ '</div><div id="patAmt'
								+ divCount
								+ '" style="width: 17%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;">'
								+ myObj.patAmt
								+ '</div></div><div id="utype2" style="width: 16%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;">In Process</div><div id="utype2" style="width: 7%; height: 23px; padding-left: 1%; padding-top: 5px; text-align: center;"><input id="assignedCheckbox" name="assignedCheckbox'
								+ divCount
								+ '" type="checkbox" value="'
								+ myObj.idTest + '"></div>';

						var total = $("#divtotalAmt").html();
						total = parseFloat(total) + parseFloat(myObj.patAmt);
						$("#divtotalAmt").html(total);
						divCount++;
					}
				}
			}
		}
	}
	$("#divCount").val(divCount);

}

function removePatientAssignedTest() {

	var allVals = [];
	$.each($('#assignedCheckbox:checked'), function() {
		allVals.push($(this).val());
	});

	if (allVals.length == 0) {
		alert("Please Select Test Name First");
		return false;
	}

	var testIds = [];
	var divCount = $("#divCount").val();
	var p = 1;
	var q = divCount;
	if (allVals.length != 0) {
		for ( var i = 0; i < q; i++) {

			var $radios = $('input:checkbox[name=assignedCheckbox' + p + ']');
			if ($radios.is(':checked') == true) {

				var testId = $("#idTestSlave" + p).val();
				if (testId != undefined && testId != "") {
					testIds.push(testId);
				}

				var remTotal = $("#patAmt" + p).html();
				var total = $("#divtotalAmt").html();
				total = parseFloat(total) - parseFloat(remTotal);
				$("#divtotalAmt").html(total);
				$("#divId" + p).remove();
				// divCount--;
			}
			p++;

		}
	}
	$("#divCount").val(divCount);

	if (slaveIds.length != 0) {
		var r = confirm("Are You Confirm To Remove Test?");
		if (r == true) {
			var inputs = [];
			inputs.push('action=removeAssignedTest');
			inputs.push('slaveIds=' + testIds);
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
					// alert(ajaxResponse);
					// window.location = 'PathologyEditPatientAssignTests.jsp';
				}
			});
		} else {
			location.reload();
		}
	}
}

// var pathologyPatientAssignTests = "{#foreach $T.pl as pl}<div style='width:
// 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%;
// height: 23px; text-align: center; border-right: 1px solid #069; padding-top:
// 5px;'>{count++}.</div><div style='width: 9.1%; height: 23px; text-align:
// center; border-right: 1px solid #069; padding-top:
// 5px;'>{$T.pl.objTreat.treStart}</div><div style='width: 31%; height: 23px;
// border-right: 1px solid #069; padding-left: 1%; padding-top:
// 5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width:
// 9.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%;
// padding-top: 5px;'>{$T.pl.trid}</div><div style='width: 8.5%; height: 25px;
// border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px;
// text-align: center;'>{$T.pl.ag} {$T.pl.agtp}</div><div style='width: 8.6%;
// height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top:
// 3px; text-align: center;'>{$T.pl.sx}</div><div style='width: 9.5%; height:
// 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px;
// text-align: center;'>{$T.pl.mb}</div><div style='width: 14%; height: 25px;
// padding-left: 1%; padding-top: 3px; text-align: center;'><input
// onclick=viewPatientAssignTests({$T.pl.trid}) style='font-size: 10px;'
// type='button' value='ADD ROUTINE TESTS' class='edit' /></div></div>{#/for}";
var pathologyPatientAssignTests = "{#foreach $T.pl as pl}<tr>	<td class='col-md-1-1 center'>{count++}.</td>	<td class='col-md-1-1 center'>{$T.pl.objTreat.treStart}</td>	<td class=' col-md-1-1 center'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn}		{$T.pl.ln}</td>	<td class=' col-md-1-1 center'>{$T.pl.trid}</td>	<td class=' col-md-1-1 center'>{$T.pl.ag} {$T.pl.agtp}</td>	<td class='  col-md-1-1 center'>{$T.pl.sx}</td>	<td class='  col-md-1-1 center'>{$T.pl.mb}</td>	<td class='   col-md-2-1  center'><input		onclick=viewPatientAssignTests({$T.pl.trid}) style='font-size: 10px;'		type='button' value='ADD ROUTINE TESTS' class='edit' /></td></tr>{#/for}";

function searchRegPatientsForPathologyTest(page_name) {

	count = 1;
	var byName = $("#byName").val();
	var byId = $("#byId").val();
	var searchBy;
	var value;
	if (byName != "" && byId != "") {
		alert("Please Search Either By Patient Id or by Patient Name!");
		SetFocus("byName");
		return false;
	} else if (byName == "" && byId == "") {
		alert("Please Enter Patient Name Or Patient Id!");
		SetFocus("byName");
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
		inputs.push('action=searchRegPatientsForPathologyTest');
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + encodeURIComponent(value));
		inputs.push('pageName=' + page_name);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PathologyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(ajaxResponse);
				$("#pathologyAllPatInfo").html(ajaxResponse);
				patientBean = eval('(' + ajaxResponse + ')');
				if (patientBean.pl.length == 0) {
					alert("Patient details not found.");
				} else if (page_name == "Radiology") {
					$("#container").setTemplate(radiologyPatientAssignTests);
					$("#container").processTemplate(patientBean);
				} else if (page_name == "dental") {
					$("#container")
							.setTemplate($("#dentalServicesTemp").html());
					$("#container").processTemplate(patientBean);
				} else if (page_name == "casuality") {
					$("#container").setTemplate(
							$("#casualityServicesTemp").html());
					$("#container").processTemplate(patientBean);
				} else if (page_name == "cardiology") {
					$("#container").setTemplate(cardiologyPatientAssignTests);
					$("#container").processTemplate(patientBean);
				} else {
					$("#container").setTemplate(pathologyPatientAssignTests);
					$("#container").processTemplate(patientBean);

				}
			}
		});
	}
};

// var radiologyPatientAssignTests = "{#foreach $T.pl as pl}<div style='width:
// 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%;
// height: 23px; text-align: center; border-right: 1px solid #069; padding-top:
// 5px;'>{count++}.</div><div style='width: 8%; height: 23px; text-align:
// center; border-right: 1px solid #069; padding-top:
// 5px;'>{$T.pl.objTreat.treStart}</div><div style='width: 23%; height: 23px;
// border-right: 1px solid #069; padding-left: 1%; padding-top:
// 5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width:
// 17%; height: 23px; border-right: 1px solid #069; padding-left: 1%;
// padding-top: 5px;'>{$T.pl.a1}</div><div style='width: 8%; height: 23px;
// border-right: 1px solid #069; padding-left: 1%; padding-top:
// 5px;'>{$T.pl.objTreat.trCount}</div><div style='width: 5.5%; height: 25px;
// border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px;
// text-align: center;'>{$T.pl.ag} {$T.pl.agtp}</div><div style='width: 6%;
// height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top:
// 3px; text-align: center;'>{$T.pl.sx}</div><div style='width: 7.5%; height:
// 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px;
// text-align: center;'>{$T.pl.mb}</div><div style='width: 13%; height: 25px;
// padding-left: 1%; padding-top: 3px; border-right: 1px solid #069;'><input
// onclick=viewRadiologyPatientAssignTests({$T.pl.pi}) style='font-size: 10px;'
// type='button' value='ADD TESTS' class='edit' /></div></div>{#/for}";
var radiologyPatientAssignTests = "{#foreach $T.pl as pl}<tr>	<td class='col-md-1-1 center'>{count++}.</td>	<td class='col-md-1-1 center'>{$T.pl.objTreat.treStart}</td>	<td class='col-md-1-1 center'>{$T.pl.tit}{$T.pl.fn}		{$T.pl.mn} {$T.pl.ln}</td>	<td class='col-md-1-1 center'>{$T.pl.a1}</td>	<td class='col-md-1-1 center'>{$T.pl.objTreat.trCount}</td>	<td class='col-md-1-1 center'>{$T.pl.ag}		{$T.pl.agtp}</td>	<td class='col-md-1-1 center'>{$T.pl.sx}</td>	<td class='col-md-1-1 center'>{$T.pl.mb}</td>	<td class='col-md-1-1 center'>		<input onclick=viewRadiologyPatientAssignTests({$T.pl.pi})			style='font-size: 10px;' type='button' value='ADD TESTS' class='edit' />	</td></tr>{#/for}";

// var cardiologyPatientAssignTests = "{#foreach $T.pl as pl}<div style='width:
// 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%;
// height: 23px; text-align: center; border-right: 1px solid #069; padding-top:
// 5px;'>{count++}.</div><div style='width: 8%; height: 23px; text-align:
// center; border-right: 1px solid #069; padding-top:
// 5px;'>{$T.pl.objTreat.treStart}</div><div style='width: 23%; height: 23px;
// border-right: 1px solid #069; padding-left: 1%; padding-top:
// 5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width:
// 17%; height: 23px; border-right: 1px solid #069; padding-left: 1%;
// padding-top: 5px;'>{$T.pl.a1}</div><div style='width: 9%; height: 23px;
// border-right: 1px solid #069; padding-left: 1%; padding-top:
// 5px;'>{$T.pl.objTreat.trCount}</div><div style='width: 5.5%; height: 25px;
// border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px;
// text-align: center;'>{$T.pl.ag} {$T.pl.agtp}</div><div style='width: 6%;
// height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top:
// 3px; text-align: center;'>{$T.pl.sx}</div><div style='width: 7.5%; height:
// 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px;
// text-align: center;'>{$T.pl.mb}</div><div style='width: 13%; height: 25px;
// padding-left: 1%; padding-top: 3px; border-right: 1px solid #069;'><input
// onclick=viewCardiologyPatientAssignTests({$T.pl.pi}) style='font-size: 10px;'
// type='button' value='ADD TESTS' class='edit' /></div></div>{#/for}";

var cardiologyPatientAssignTests = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 99%; margin-top: 9px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Sr	No.</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Date</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Patient Name</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Address</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Admission No</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Age</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Gender</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Contact No</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'><div>Add Routine Tests</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 400px; max-height: auto;' id='TimeslotTD{countForNATable}'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.pl as pl}"
		+ "<tr><td style='height: 21.5px;' class='numeric col-md-1 center'>{count++}.</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.objTreat.treStart}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-2 center'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.a1}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.objTreat.trCount}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.ag}	{$T.pl.agtp}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.sx}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.mb}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'><input onclick=viewCardiologyPatientAssignTests({$T.pl.pi}) style='font-size: 10px;' type='button'  value='ADD TESTS' class='btn btn-xs btn-success' /></td>"
		+ "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

var dentalServicesTemp = "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 300px; max-height: auto;' id='TimeslotTD{countForNATable}'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.pl as pl}"
		+ "<tr><td style='height: 21.5px;' class='numeric col-md-1 center'>{count++}.</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.objTreat.treStart}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-2 center'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.objTreat.trCount}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.ag}	{$T.pl.agtp}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.sx}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>{$T.pl.mb}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'><input onclick=viewDentalServicePatAssignTests({$T.pl.pi}) style='font-size: 10px;' type='button'  value='Add Other Services' class='edit' /></td>"
		+ "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

/*
 * var cardiologyPatientAssignTests = "{#foreach $T.pl as pl}" + "<tr><td style='height: 21.5px;' class=''>{count++}.</td>" + "<td style='height: 21.5px;' class=''>{$T.pl.objTreat.treStart}</td>" + "<td style='height: 21.5px;' class='numeric '>{$T.pl.tit}{$T.pl.fn}
 * {$T.pl.mn} {$T.pl.ln}</td>" + "<td style='height: 21.5px;' class='numeric '>{$T.pl.a1}</td>" + "<td style='height: 21.5px;' class='numeric '>{$T.pl.objTreat.trCount}</td>" + "<td style='height: 21.5px;' class='numeric '>{$T.pl.ag}
 * {$T.pl.agtp}</td>" + "<td style='height: 21.5px;' class='numeric '>{$T.pl.sx}</td>" + "<td style='height: 21.5px;' class='numeric '>{$T.pl.mb}</td>" + "<td style='height: 21.5px;' class='numeric '><input
 * onclick=viewCardiologyPatientAssignTests({$T.pl.pi}) style='font-size: 10px;'
 * type='button' value='ADD TESTS' class='edit' /></td>" + "</tr>{#/for}";
 */

function fetchRegPatientsForPathalogyTests(page_name) {
	var inputs = [];
	inputs.push('action=fetchRegPatientsForPathalogyTests');
	inputs.push('pageName=' + page_name);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PathologyServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {

					ajaxResponse = r;
					// alert(ajaxResponse);patientDocTreatment
					// alert("got1");
					$("#pathologyAllPatInfo").html(ajaxResponse);
					pobj1 = eval('(' + ajaxResponse + ')');
					if (page_name == "Radiology") {
						$("#container")
								.setTemplate(radiologyPatientAssignTests);
						$("#container").processTemplate(pobj1);
						// alert("got2");
					} else if (page_name == "cardiology") {
						// alert("got3");
						$("#container").setTemplate(
								cardiologyPatientAssignTests);
						$("#container").processTemplate(pobj1);

					} else if (page_name == "dental") {
						$("#container").setTemplate(dentalServicesTemp);
						$("#container").processTemplate(pobj1);
						// alert("got4");
					} else if (page_name == "casuality") {
						$("#container").setTemplate(
								$("#casualityServicesTemp").html());
						$("#container").processTemplate(pobj1);
						// alert("got5");
					} else {
						$("#container")
								.setTemplate(pathologyPatientAssignTests);
						$("#container").processTemplate(pobj1);
					}

				}
			});
}

function deleteTest(testId) {
	var r = confirm("Are You Confirm To Remove Test?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deletePathologyTest');
		inputs.push('testId=' + testId);
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
				alert(ajaxResponse);
				location.reload();

			}
		});
	}
}

function addTestDetails() {

	window.location.href = 'PathologyTestsDashBoard.jsp';

}

var defaultViewTestTemp = "{#foreach $T.listTestGrp as lg} {#foreach $T.lg.liTests as listlabTest}	<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div	style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div id='divPi{count}'	style='width: 13.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.lg.gn}</div><div	style='width: 30.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: left;'	id='uname{count}'>{$T.listlabTest.tName}</div><div	style='width: 14%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: left;'	id='utype{count}'>{$T.listlabTest.patAmt}</div><div	style='width: 12.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: left;'	id='utype{count}'>{$T.listlabTest.regAmt}</div><div	style='width: 7%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='EDIT'	class='edit' id='btnEdit{count}' onclick='editTestDetails({$T.listlabTest.idTest})' /></div><div style='width: 8%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='DELETE'	class='edit' id='btnDelete{count}' 	onClick='deleteTest({$T.listlabTest.idTest})' /></div></div>{#/for} {#/for}";

function editTestDetails(testId) {
	$("#btnAddtestDetail").show();
	$("#testHeading").html('<h2>&nbsp;&nbsp;Edit Test</h2>');
	var testDetails = $("#testDetails").html();
	var myArray = JSON.parse(testDetails);
	for ( var j = 0; j < myArray.listTestGrp.length; j++) {
		for ( var i = 0; i < myArray.listTestGrp[j].liTests.length; i++) {
			if (myArray.listTestGrp[j].liTests[i].idTest == testId) {
				myObj = myArray.listTestGrp[j].liTests[i];
				break;
			}
		}
	}
	myObj = JSON.stringify(myObj);
	myObj = JSON.parse(myObj);

	$("#txtTestCode").val(myObj.idTest);
	getGroupsForSubtests();
	setTimeout(function() {
		$("#selGroups").val(myObj.idgr);
	}, 500);
	$("#txtTestName").val(myObj.tName);
	$("#txtPatAmount").val(myObj.patAmt);
	$("#txtReaCoast").val(myObj.regAmt);
	$("#txtTestNote").val(myObj.tNote);
	$("#queryType").val("update");
}

var testForAssignTemp = "{#foreach $T.listTestGrp as lg} {#foreach $T.lg.liTests as listlabTest}	<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div	style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div id='divPi{count}'	style='width: 16%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.lg.gn}</div><div style='width: 47%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: left;'	id='uname{count}'>{$T.listlabTest.tName}</div><div 	style='width: 18%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;' id='utype{count}'>{$T.listlabTest.patAmt}</div><div style='width: 7%; height: 23px; padding-left: 1%; padding-top: 5px; text-align: center;'	id='utype{count}'><input type='checkbox' id='checkbox' value='{$T.listlabTest.idTest}' /></div></div>{#/for}{#/for}";

function searchTestDetails(page_name) {
	var strValue = $("#strValue").val();
	if (strValue == "") {
		alert("Please Insert Something For Search");
		return false;
	}
	var inputs = [];
	inputs.push('action=getTestDash');
	inputs.push('strValue=' + encodeURIComponent(strValue));
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
			count = 1;
			// alert(ajaxResponse);
			$("#testDetails").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.listlabTest.length == 0) {
				alert("Test Details Not Found");
				return false;
			}
			if (page_name == "PathologyPatientAssignTest") {
				$("#testDiv").setTemplate(testForAssignTemp);
				$("#testDiv").processTemplate(pobj1);
			} else {
				$("#testDiv").setTemplate(defaultViewTestTemp);
				$("#testDiv").processTemplate(pobj1);
			}

		}
	});

}

function getTestDashboard(page_name) {
	var strValue = $("#strValue").val();
	var inputs = [];
	inputs.push('action=getTestDash');
	inputs.push('strValue=' + encodeURIComponent(strValue));
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
			count = 1;
			// alert(ajaxResponse);
			$("#testDetails").html(ajaxResponse);
			var pobj1 = eval('(' + ajaxResponse + ')');
			if (page_name == "PathologyPatientAssignTest") {
				$("#testDiv").setTemplate(testForAssignTemp);
				$("#testDiv").processTemplate(pobj1);
			} else {
				$("#testDiv").setTemplate(defaultViewTestTemp);
				$("#testDiv").processTemplate(pobj1);

				$("#selGroups").setTemplate(groupsNameTemp);
				$("#selGroups").processTemplate(pobj1);
			}

		}
	});

}

function saveTestDetails() {
	var txtTestCode = $("#txtTestCode").val();
	var selGroups = $("#selGroups").val();
	var txtTestName = $("#txtTestName").val();
	var txtPatAmount = $("#txtPatAmount").val();
	var txtReaCoast = $("#txtReaCoast").val();
	var txtTestNote = $("#txtTestNote").val();
	if (selGroups == "select") {
		alert("Please Select Group Name");
		return false;
	} else if (txtTestName == "") {
		alert("Please Enter Test Name");
		return false;
	} else if (txtPatAmount == "") {
		alert("Please Enter Patient Amount");
		return false;
	} else if (txtReaCoast == "") {
		alert("Please Enter Reagent Cost");
		return false;
	}

	var inputs = [];
	inputs.push('action=saveTestDetails');
	inputs.push('txtTestCode=' + txtTestCode);
	inputs.push('selGroups=' + selGroups);
	inputs.push('txtTestName=' + encodeURIComponent(txtTestName));
	inputs.push('txtPatAmount=' + encodeURIComponent(txtPatAmount));
	inputs.push('txtReaCoast=' + encodeURIComponent(txtReaCoast));
	inputs.push('txtTestNote=' + encodeURIComponent(txtTestNote));
	inputs.push('queryType=' + $("#queryType").val());

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
			alert(ajaxResponse);
			window.location = "PathologyTestsDashBoard.jsp";
		}
	});
}

function fetchTestId() {

	var inputs = [];
	inputs.push('action=fetchTestId');
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
			// alert(ajaxResponse);
			var testData = eval('(' + ajaxResponse + ')');
			$("#txtTestCode").val(testData.idTest);
			// getGroupsForSubtests();

		}
	});
}

function editSubTestDetais(subTestId) {
	$("#subTestSearchDiv").hide();
	setBtnSaveSubtestDetailTemp();
	var subTestDetail = $("#subTestDetail").html();
	var myArray = JSON.parse(subTestDetail);
	for ( var i = 0; i < myArray.liSubTest.length; i++) {
		if (myArray.liSubTest[i].subtstid == subTestId) {
			myObj = myArray.liSubTest[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	myObj = JSON.parse(myObj);
	$("#subtestDetailDiv").setTemplate(addSubTestDetailTemp);
	$("#subtestDetailDiv").processTemplate(sample);
	$("#txtCode").val(myObj.subtstid);
	getGroupsForSubtests();
	setTimeout(function() {
		$("#selGroups").val(myObj.grpid);
		getTestForSubTests(myObj.grpid);
		$("#SelTests").val(myObj.tstid);
	}, 500);

	setTimeout(function() {
		$("#SelTests").val(myObj.tstid);
	}, 1000);

	$("#txtSubtest").val(myObj.subnm);
	$("#txtNormalRange").val(myObj.nrange);

	var rangeArray = [];
	rangeArray = (myObj.nrange).split('-');
	$("#txtNormalRange1").val(rangeArray[0]);
	$("#txtNormalRange2").val(rangeArray[1]);
	$("#txtUnit").val(myObj.unt);

	var rangeArrayM = [];
	rangeArrayM = (myObj.nrangeM).split('-');
	$("#txtNormalRangeM1").val(rangeArrayM[0]);
	$("#txtNormalRangeM2").val(rangeArrayM[1]);

	var rangeArrayF = [];
	rangeArrayF = (myObj.nrangeF).split('-');
	$("#txtNormalRangeF1").val(rangeArrayF[0]);
	$("#txtNormalRangeF2").val(rangeArrayF[1]);

	var rangeArrayC = [];
	rangeArrayC = (myObj.nrangeC).split('-');
	$("#txtNormalRangeC1").val(rangeArrayC[0]);
	$("#txtNormalRangeC2").val(rangeArrayC[1]);

	$("#txtNormalRangeM").val(myObj.nrangeM);
	$("#txtNormalRangeF").val(myObj.nrangeF);
	$("#txtNormalRangeC").val(myObj.nrangeC);
	$("#txtRange").html(myObj.refrange);
	$("#queryType").val("update");
}

function deleteSubTest(subTestId) {
	var r = confirm("Are You Confirm To Remove Sub Test?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteSubTest');
		inputs.push('subTestId=' + subTestId);
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
				alert(ajaxResponse);
				location.reload();

			}
		});
	}
}

var subTestDetailTemp = "<div	style='width: 98%; background-color: black; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div style='width: 4%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div style='width: 7%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Group</div><div style='width: 25%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: left;'>Test</div><div style='width: 25%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: left;'>Sub Test</div><div style='width: 5%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Unit</div><div style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Normal Range</div><div style='width: 5%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Edit</div> <div style='width: 5%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Delete</div></div></div><div style='width: 100%; height: 91%; overflow-y: scroll;'>{#foreach $T.liSubTest as liSubTest}<div style='width: 100%; border-bottom: 1px solid #069;'><div style='width: 5%; text-align: center; border-right: 1px solid #069; height: 23px; padding-top: 5px;'>{count++}.</div><div style='width: 9%; text-align: center; border-right: 1px solid #069; height: 23px; padding-top: 5px;'>{$T.liSubTest.grpnm}</div><div id='divPi{count}' style='width: 26.5%; border-right: 1px solid #069; height: 23px; padding-top: 5px; padding-left: 5px;'>{$T.liSubTest.testnm}</div><div style='width: 27%; border-right: 1px solid #069; text-align: left; height: 23px; padding-top: 5px; padding-left: 5px;'>{$T.liSubTest.subnm}</div><div style='width: 6.5%; text-align: center; border-right: 1px solid #069; height: 23px; padding-top: 5px;'>{$T.liSubTest.unt}</div><div	style='width: 10.2%; text-align: center; border-right: 1px solid #069; height: 23px; padding-top: 5px;'>{$T.liSubTest.nrange}</div><div	style='width: 7%; border-right: 1px solid #069; text-align: center; height: 23px; padding-top: 5px;'><input style='font-size: 10px;' type='button' value='EDIT'	class='edit' id='btnEdit{count}' onclick='editSubTestDetais({$T.liSubTest.subtstid})' /></div><div	style='width: 7%; text-align: center; height: 23px; padding-top: 5px;'>	<input style='font-size: 10px;' type='button' value='DELETE' class='edit' id='btnDelete{count}' 	onClick='deleteSubTest({$T.liSubTest.subtstid})' /></div></div>{#/for}</div>";

function searchSubTestDetails(page_name) {
	count = 1;
	var strValue = $("#strValue").val();

	if (strValue == "") {
		alert("Please Enter Sub Test Name!");
		return false;
	}

	var inputs = [];

	inputs.push('action=fetchSubTestDetails');

	inputs.push('strValue=' + encodeURIComponent(strValue));

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
			// alert(ajaxResponse);
			$("#subTestDetail").html(ajaxResponse);
			var subtestData = eval('(' + ajaxResponse + ')');
			if (subtestData.liSubTest.length == 0) {
				alert("Sub test Details Not Found");
				return false;
			}
			if (page_name == "PathologyPatientAssignTest") {
				$("#testDiv").setTemplate(testForAssignTemp);
				$("#testDiv").processTemplate(subtestData);
			} else {
				$("#subtestDetailDiv").setTemplate(subTestDetailTemp);
				$("#subtestDetailDiv").processTemplate(subtestData);
			}

		}
	});

}

function fetchSubTestDetails(page_name) {
	count = 1;
	var strValue = $("#strValue").val();
	/*
	 * if(strValue=="") { alert("Please Enter Sub Test Name!"); }
	 */
	var inputs = [];

	inputs.push('action=fetchSubTestDetails');

	inputs.push('strValue=' + encodeURIComponent(strValue));

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
			// alert(ajaxResponse);
			$("#subTestDetail").html(ajaxResponse);
			var subtestData = eval('(' + ajaxResponse + ')');
			if (page_name == "PathologyPatientAssignTest") {
				$("#testDiv").setTemplate(testForAssignTemp);
				$("#testDiv").processTemplate(subtestData);
			} else {
				$("#subtestDetailDiv").setTemplate(subTestDetailTemp);
				$("#subtestDetailDiv").processTemplate(subtestData);
			}
		}
	});

}

var addSubTestDetailTemp = "<div style='width: 100%; margin-left: 2%'><div style='width: 80%;'><h2>Add SubTest Details</h2></div><div style='width: 100%;'><div style='width: 10%;'>Code</div><div style='width: 10%;'><input type='text' id='txtCode' name='txtCode'	readonly='readonly'	style='width: 100%; background-color: lightgray;'/></div></div><div style='width: 100%; padding-top: 1%;'><div style='width: 10%;'>Group</div><div style='width: 64%;'><select style='width: 51%;' id='selGroups' name='selGroups'	onclick='getTestForSubTests(this.value)'></select></div></div><div style='width: 100%; padding-top: 1%;'><div style='width: 10%;'>Tests</div><div style='width: 64%;'><select style='width: 51%;' id='SelTests' name='SelTests'></select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='checkbox' id='chkreport' name='chkreport'	style='width: 6.5%;' ' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't Show In Report</div></div><div style='width: 100%; padding-top: 1%;'><div style='width: 10%;'>Sub Test Name</div><div style='width: 32%;'><input type='text' id='txtSubtest' name='txtSubtest'	style='width: 100%;' /></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unit <input type='checkbox' id='chkUnit' name='chkUnit'	style='width: 6.5%;' '  /> <input type='text' id='txtUnit'	name='txtUnit' style='width: 10%;' /></div><div style='width: 100%; padding-top: 1%;'><div style='width: 10%;'>Normal Range<input type='checkbox' id='chkUnit'	name='chkUnit' style='width: 8.3%;' /></div><div style='width: 10%;'><input type='text' id='txtNormalRange' name='txtNormalRange'	readonly='readonly' style='width: 100%;' /></div><div style='width: 10%; margin-left: 20px;'>Normal Range</div>	<div style='width: 10%;'><input type='text' id='txtNormalRange1'	name='txtNormalRange1' style='width: 100%;' /></div><div style='width: 10%; margin-left: 20px;'>Normal Range</div><div style='width: 10%;'>	<input type='text' id='txtNormalRange2'	onkeyup='setNormalRenge()' name='txtNormalRange2' style='width: 100%;' /></div></div><div style='width: 100%; padding-top: 1%;'><div style='width: 10%;'>Normal Range(M)</div><div style='width: 10%;'><input type='text' id='txtNormalRangeM'	name='txtNormalRangeM' style='width: 100%;' /></div><div style='width: 10%; margin-left: 20px;'>Normal	Range(M)</div><div style='width: 10%;'><input type='text' id='txtNormalRangeM1'	name='txtNormalRangeM1' style='width: 100%;' />	</div><div style='width: 10%; margin-left: 20px;'>Normal Range(M)</div>	<div style='width: 10%;'><input type='text' id='txtNormalRangeM2' onkeyup='setNormalRengeM()' name='txtNormalRangeM2' style='width: 100%;' /></div></div><div style='width: 100%; padding-top: 1%;'><div style='width: 10%;'>Normal Range(F)</div><div style='width: 10%;'><input type='text' id='txtNormalRangeF' readonly='readonly'	name='txtNormalRangeF' style='width: 100%;' /></div><div style='width: 10%; margin-left: 20px;'>Normal Range(F)</div><div style='width: 10%;'><input type='text' id='txtNormalRangeF1' name='txtNormalRangeF1' style='width: 100%;' /></div><div style='width: 10%; margin-left: 20px;'>Normal Range(F)</div><div style='width: 10%;'><input type='text' id='txtNormalRangeF2' onkeyup='setNormalRengeF()' name='txtNormalRangeF2' style='width: 100%;' />"
		+ "</div>	</div><div style='width: 100%; padding-top: 1%;'><div style='width: 10%;'>Normal Range(C)</div><div style='width: 10%;'><input type='text' id='txtNormalRangeC' readonly='readonly'		name='txtNormalRangeC' style='width: 100%;' /></div><div style='width: 10%; margin-left: 20px;'>Normal	Range(C)</div><div style='width: 10%;'><input type='text' id='txtNormalRangeC1'	name='txtNormalRangeC1' style='width: 100%;' /></div><div style='width: 10%; margin-left: 20px;'>Normal	Range(C)</div><div style='width: 10%;'>	<input type='text' id='txtNormalRangeC2'	onchange='setNormalRengeC()' name='txtNormalRangeC2' style='width: 100%;' /></div></div><div style='width: 100%; padding-top: 1%;'>	<div style='width: 10%;'>Ref Range <input type='checkbox' id='chkUnit' name='chkUnit'	style='width: 8.3%;' /></div><div style='width: 50%; color: red;'><textarea id='txtRange' name='txtRange' rows='2' cols='41.8'></textarea></div></div></div>";

var btnSaveSubtestDetailTemp = "<input style='font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;' type='button' value='Save Now' onclick='saveSubTestDetails()' />";

function setBtnSaveSubtestDetailTemp() {
	$("#btnSubtestDetail").setTemplate(btnSaveSubtestDetailTemp);
	$("#btnSubtestDetail").processTemplate(sample);
}

function saveSubTestDetails() {

	var txtCode = $("#txtCode").val();
	var selGroups = $("#selGroups").val();
	var SelTests = $("#SelTests").val();
	var txtSubtest = $("#txtSubtest").val();
	var txtNormalRange = $("#txtNormalRange").val();
	var txtNormalRange1 = $("#txtNormalRange1").val();
	var txtNormalRange2 = $("#txtNormalRange2").val();
	var txtUnit = $("#txtUnit").val();
	var txtNormalRangeM = $("#txtNormalRangeM").val();
	var txtNormalRangeF = $("#txtNormalRangeF").val();
	var txtNormalRangeC = $("#txtNormalRangeC").val();
	var txtRange = $("#txtRange").val();

	if (selGroups == "select") {
		alert("Please Select Group Name!");
		SetFocus("selGroups");
		return false;
	} else if (SelTests == "select") {
		alert("Please Select Test!");
		SetFocus("SelTests");
		return false;
	}
	if (txtSubtest == "") {
		alert("Please Enter Sub-Test Name!");
		SetFocus("txtSubtest");
		return false;
	} else if (txtUnit == "") {
		alert("Please Enter Unit!");
		SetFocus("txtUnit");
		return false;
	} else if (txtNormalRange1 == "") {
		alert("Please Enter Normal Range!");
		SetFocus("txtNormalRange1");
		return false;
	} else if (txtNormalRange2 == "") {
		alert("Please Enter Normal Range!");
		SetFocus("txtNormalRange2");
		return false;
	}

	var inputs = [];
	inputs.push('action=saveSubTestDetails');
	inputs.push('txtCode=' + encodeURIComponent(txtCode));
	inputs.push('selGroups=' + encodeURIComponent(selGroups));
	inputs.push('SelTests=' + SelTests);
	inputs.push('txtSubtest=' + encodeURIComponent(txtSubtest));
	inputs.push('txtNormalRange=' + encodeURIComponent(txtNormalRange));
	inputs.push('txtUnit=' + encodeURIComponent(txtUnit));
	inputs.push('txtNormalRangeM=' + encodeURIComponent(txtNormalRangeM));
	inputs.push('txtNormalRangeF=' + encodeURIComponent(txtNormalRangeF));
	inputs.push('txtNormalRangeC=' + encodeURIComponent(txtNormalRangeC));
	inputs.push('txtRange=' + encodeURIComponent(txtRange));
	inputs.push('queryType=' + $("#queryType").val());

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
			alert(ajaxResponse);
			location.reload();
		}
	});
}

function setNormalRenge() {

	$("#txtNormalRange").val(
			$("#txtNormalRange1").val() + " - " + $("#txtNormalRange2").val());
}

function setNormalRengeM() {

	$("#txtNormalRangeM")
			.val(
					$("#txtNormalRangeM1").val() + " - "
							+ $("#txtNormalRangeM2").val());
}

function setNormalRengeF() {

	$("#txtNormalRangeF")
			.val(
					$("#txtNormalRangeF1").val() + " - "
							+ $("#txtNormalRangeF2").val());
}

function setNormalRengeC() {

	$("#txtNormalRangeC")
			.val(
					$("#txtNormalRangeC1").val() + " - "
							+ $("#txtNormalRangeC2").val());
}

var testNameTemp = '<option value="select">SELECT</option>{#foreach $T.listlabTest as listlabTest}<option value="{$T.listlabTest.idTest}">{$T.listlabTest.tName}</option>{#/for}';

function getTestForSubTests(grpid) {
	if (grpid != "select") {

		var inputs = [];
		inputs.push('action=getTestForGroupId');
		inputs.push('grpid=' + grpid);
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
				count = 1;
				// alert(ajaxResponse);
				pobj1 = eval('(' + ajaxResponse + ')');
				$("#SelTests").setTemplate(testNameTemp);
				$("#SelTests").processTemplate(pobj1);

			}
		});
	}

}

function fetchSubTestId() {
	$("#subTestSearchDiv").hide();
	setBtnSaveSubtestDetailTemp();
	var inputs = [];
	inputs.push('action=fetchSubTestId');

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
			// alert(ajaxResponse);
			var subtestData = eval('(' + ajaxResponse + ')');
			$("#subtestDetailDiv").setTemplate(addSubTestDetailTemp);
			$("#subtestDetailDiv").processTemplate(sample);
			$("#txtCode").val(subtestData.subtstid);
			getGroupsForSubtests();
			$("#queryType").val("insert");
		}
	});
}

var groupsNameTemp = '<option value="select">SELECT</option>{#foreach $T.listTestGrp as grpli}<option value="{$T.grpli.idtg}">{$T.grpli.gn}</option>{#/for}';

function getGroupsForSubtests() {
	var strValue = $("#strValue").val();
	var inputs = [];

	inputs.push('action=getGroups');
	inputs.push('strValue=' + encodeURIComponent(strValue));
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
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#selGroups").setTemplate(groupsNameTemp);
			$("#selGroups").processTemplate(pobj1);

		}
	});
}
function deleteSublabs(sublid) {
	var r = confirm("Are You Confirm To Remove Lab?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteSublabs');
		inputs.push('sublid=' + sublid);
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
				alert(ajaxResponse);
				location.reload();

			}
		});
	}
}

var btnSaveSubLabTemp = "<input style='font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;' type='button' value='Save Now' onclick='saveSubLabDetails()' />";

function setBtnSaveSubLabTemp() {
	$("#Addlabs").setTemplate(btnSaveSubLabTemp);
	$("#Addlabs").processTemplate(sample);
}
function editSubLabDetais(sublid) {

	var subLabDetailData = $("#subLabDetailData").html();
	var myArray = JSON.parse(subLabDetailData);
	for ( var i = 0; i < myArray.sublli.length; i++) {
		if (myArray.sublli[i].sublid == sublid) {
			myObj = myArray.sublli[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	myObj = JSON.parse(myObj);
	$("#subLabDetailDiv").setTemplate(addSubLabDetailTemp);
	$("#subLabDetailDiv").processTemplate(sample);
	$("#txtCode").val(myObj.sublid);
	$("#txtLabName").val(myObj.nm);
	$("#txtIncharge").val(myObj.inch);
	$("#txtDegree").val(myObj.deg);
	$("#txtAddress").html(myObj.add);
	$("#txtArea").val(myObj.area);
	$("#txtCity").val(myObj.city);
	$("#txtPincode").val(myObj.pin);
	$("#txtPhoneno").val(myObj.ph);
	$("#txtMobileno").val(myObj.mob);
	$("#txtEmail").val(myObj.eml);
	$("#txtOpen").val(myObj.dob);
	$("#txtSpecialinfo").val(myObj.splinf);
	$("#txtOpen").val(myObj.dob);
	$("#txtSpecialinfo").val(myObj.splinf);
	$("#queryType").val("update");
	setBtnSaveSubLabTemp();
}

var subLabDetailTemp = "<div style='width: 98%; background-color: black; padding: 1%; font-weight: bold;'><div style='width: 100%;'>	<div style='width: 4%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div style='width: 25%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: left;'>Lab Name</div><div style='width: 30%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: left;'>Address</div><div style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Mobile</div><div style='width: 5%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Edit</div><div style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Lab Rates</div><div style='width: 6%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Delete </div></div></div><div style='width: 100%; height: 91%; overflow-y: scroll;'>{#foreach $T.sublli as sublli}<div style='width: 100%;  border-bottom: 1px solid #069;'><div	style='width: 5%; text-align: center; border-right: 1px solid #069;height:23px;padding-top:5px;'>{count++}.</div><div id='divPi{count}'	style='width: 26.6%; border-right: 1px solid #069; height:23px;padding-top:5px;padding-left:5px;'>{$T.sublli.nm}</div><div	style='width: 31.6%; border-right: 1px solid #069; text-align: left;height:23px;padding-top:5px;padding-left:5px;'>{$T.sublli.add}</div><div style='width: 10%; border-right: 1px solid #069; text-align: left;height:23px;padding-top:5px;text-align: center'>{$T.sublli.mob}</div><div	style='width: 7%; border-right: 1px solid #069; text-align: center;height:23px;padding-top:5px;'><input style='font-size: 10px;' type='button' value='EDIT'	class='edit' id='btnEdit{count}' onclick='editSubLabDetais({$T.sublli.sublid})' /></div><div	style='width: 10%; border-right: 1px solid #069; text-align: center;height:23px;padding-top:5px;'><input style='font-size: 10px;' type='button' 	value='LAB RATE' class='edit' id='btnEdit{count}'	onclick='editDistributor()' /></div><div style='width: 7%; text-align: center;height:23px;padding-top:5px;'>	<input style='font-size: 10px;' type='button' value='DELETE'	class='edit' id='btnDelete{count}'		onClick='deleteSublabs({$T.sublli.sublid})' /></div></div>{#/for}</div>";

function fetchSublabDetails() {
	var inputs = [];
	inputs.push('action=fetchSubLabDetails');
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
			// alert(ajaxResponse);
			$("#subLabDetailData").html(ajaxResponse);
			var subLabData = eval('(' + ajaxResponse + ')');
			$("#subLabDetailDiv").setTemplate(subLabDetailTemp);
			$("#subLabDetailDiv").processTemplate(subLabData);
		}
	});
}

function saveSubLabDetails() {
	var txtCode = $("#txtCode").val();
	var txtLabName = $("#txtLabName").val();
	var txtIncharge = $("#txtIncharge").val();
	var txtDegree = $("#txtDegree").val();
	var txtAddress = $("#txtAddress").val();
	var txtArea = $("#txtArea").val();
	var txtCity = $("#txtCity").val();
	var txtPincode = $("#txtPincode").val();
	var txtPhoneno = $("#txtPhoneno").val();
	var txtMobileno = $("#txtMobileno").val();
	var txtEmail = $("#txtEmail").val();
	var txtOpen = $("#txtOpen").val();
	var txtSpecialinfo = $("#txtSpecialinfo").val();
	var queryType = $("#queryType").val();

	if (txtLabName == "") {
		alert("Please Enter Lab Name!");
		SetFocus("txtLabName");
		return false;
	} else if (txtIncharge == "") {
		alert("Please Enter Lab Incharge Name!");
		SetFocus("txtIncharge");
		return false;
	} else if (txtAddress = "") {
		alert("Please Enter Lab Address!");
		SetFocus("txtAddress");
		return false;
	} else if (txtCity == "") {
		alert("Please Enter City Name!");
		SetFocus("txtCity");
		return false;
	} else if (txtPincode == "") {
		alert("Please Enter Pincode Number!");
		SetFocus("txtPincode");
		return false;
	} else if (txtMobileno == "") {
		alert("Please Enter Mobile Number!");
		SetFocus("txtMobileno");
		return false;
	} else {
		var inputs = [];
		inputs.push('action=saveSubLabDetails');
		inputs.push('txtCode=' + encodeURIComponent(txtCode));
		inputs.push('txtLabName=' + encodeURIComponent(txtLabName));
		inputs.push('txtIncharge=' + encodeURIComponent(txtIncharge));
		inputs.push('txtDegree=' + encodeURIComponent(txtDegree));
		inputs.push('txtAddress=' + encodeURIComponent(txtAddress));
		inputs.push('txtArea=' + encodeURIComponent(txtArea));
		inputs.push('txtCity=' + encodeURIComponent(txtCity));
		inputs.push('txtPincode=' + encodeURIComponent(txtPincode));
		inputs.push('txtPhoneno=' + encodeURIComponent(txtPhoneno));
		inputs.push('txtMobileno=' + encodeURIComponent(txtMobileno));
		inputs.push('txtEmail=' + encodeURIComponent(txtEmail));
		inputs.push('txtOpen=' + encodeURIComponent(txtOpen));
		inputs.push('txtSpecialinfo=' + encodeURIComponent(txtSpecialinfo));
		inputs.push('queryType=' + queryType);

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
				alert(ajaxResponse);
				window.location.href = 'PathologyLabsDashboard.jsp';
			}
		});
	}
}

var addSubLabDetailTemp = "<div style='width: 100%; margin-left: 2%'><div style='width: 80%;'><h2>Out Lab Details</h2></div><div style='width: 100%;'><div style='width: 8%;'>Code</div><div style='width: 10%;'><input type='text' id='txtCode' name='txtCode' readonly='readonly'style='width: 100%; background-color: lightgray' /></div></div><div style='width: 100%; padding-top: 1%;'><div style='width: 8%;'>Lab Name</div><div style='width: 40%;'><input type='text' id='txtLabName' name='txtLabName'style='width: 100%; onkeypress='return validateNumbers(event)' /></div></div><div style='width: 100%; padding-top: 1%;'><div style='width: 8%;'>Lab Incharge</div><div style='width: 14.1%;'><input type='text' id='txtIncharge' name='txtIncharge'style='width: 100%;' /></div><div style='width: 8%; margin-left: 40px;'>Degree</div><div style='width: 14.1%;'><input type='text' id='txtDegree' name='txtDegree'style='width: 100%;' /></div></div><div style='width: 100%; padding-top: 1%;'><div style='width: 8%;'>Address</div><div style='width: 40%; color: red;'><textarea type='text' id='txtAddress' name='txtAddress' rows='3'cols='53' onkeypress='return validatealphabetic(event)'></textarea></div></div><div style='width: 100%; padding-top: 1%;'><div style='width: 8%;'>Locality Area</div><div style='width: 40%;'><input type='text' id='txtArea' name='txtArea' style='width: 100%;' ' /></div></div><div style='width: 100%; padding-top: 1%;'><div style='width: 8%;'>City</div><div style='width: 14.1%;'><input type='text' id='txtCity' name='txtCity' style='width: 100%;' /></div><div style='width: 8%; margin-left: 40px;'>Pin Code</div><div style='width: 14.1%;'><input type='text' id='txtPincode' name='txtPincode'style='width: 100%;' /></div></div><div style='width: 100%; padding-top: 1%;'><div style='width: 8%;'>Phone No</div><div style='width: 14.1%;'><input type='text' id='txtPhoneno' name='txtPhoneno'style='width: 100%;' /></div><div style='width: 8%; margin-left: 40px;'>Mobile No</div><div style='width: 14.1%;'><input type='text' id='txtMobileno' name='txtMobileno'style='width: 100%;' /></div></div><div style='width: 100%; padding-top: 1%;'><div style='width: 8%;'>Email</div><div style='width: 40%;'><input type='text' id='txtEmail' name='txtEmail'style='width: 100%;' ' /></div></div><div style='width: 100%; padding-top: 1%;'><div style='width: 8%;'>Open Date</div><div style='width: 10%;'><input type='text' id='txtOpen' name='txtOpen' style='width: 100%;' ' /></div></div><div style='width: 100%; padding-top: 1%;'><div style='width: 8%;'>Special Info</div><div style='width: 40%; color: red;'><textarea type='text' id='txtSpecialinfo' name='txtSpecialinfo'rows='2' cols='53' onkeypress='return validatealphabetic(event)'></textarea></div></div></div>";

function fetchLabId() {
	var sample;
	var inputs = [];
	inputs.push('action=fetchLabId');

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
			var subLabData = eval('(' + ajaxResponse + ')');
			$("#subLabDetailDiv").setTemplate(addSubLabDetailTemp);
			$("#subLabDetailDiv").processTemplate(sample);
			$("#txtCode").val(subLabData.sublid);
			$("#queryType").val("insert");
			setBtnSaveSubLabTemp();
		}
	});
}

function fetchOwnLabDetails(callFrom) {
	var inputs = [];
	inputs.push('action=fetchOwnLabDetails');
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
			// alert(ajaxResponse);
			var mainLabData = eval('(' + ajaxResponse + ')');
			if (callFrom == "LabForm") {
				$("#txtLabName").val(mainLabData.limainlab[0].nm);
				$("#txtAddress").html(mainLabData.limainlab[0].add);
				$("#email").val(mainLabData.limainlab[0].eml);
				$("#txtPathologist").val(mainLabData.limainlab[0].pthl);
				$("#txtDegree").val(mainLabData.limainlab[0].deg);
				$("#txtLabCode").val(mainLabData.limainlab[0].mlc);
				$("#txtTelephone").val(mainLabData.limainlab[0].tel);
				$("#txtOpeningTime").val(mainLabData.limainlab[0].ot);
				$("#txtClosingTime").val(mainLabData.limainlab[0].ct);
				$("#txtLunchTime").val(mainLabData.limainlab[0].lt);
				$("#selClosedDay").val(mainLabData.limainlab[0].cd);
				$("#txtFooter").val(mainLabData.limainlab[0].fn);
				$("#hiddenMainLabId").val(mainLabData.limainlab[0].mlid);
			} else {
				$("#labName").html(mainLabData.limainlab[0].nm);
				$("#labAdd").html(mainLabData.limainlab[0].add);
				$("#labTelephone").html(mainLabData.limainlab[0].tel);
				$("#OpenTime").html(mainLabData.limainlab[0].ot);
				$("#CloseTime").html(mainLabData.limainlab[0].ct);
				$("#LunchTime").html(mainLabData.limainlab[0].lt);
				$("#closeOn").html(mainLabData.limainlab[0].cd);
				$("#footerLab").html(mainLabData.limainlab[0].fn);
			}
		}
	});
}

function saveOwnLabDetails() {
	var labName = $("#txtLabName").val();
	var address = $("#txtAddress").val();
	var txtEmail = $("#email").val();
	var txtPathologist = $("#txtPathologist").val();
	var txtDegree = $("#txtDegree").val();
	var txtLabCode = $("#txtLabCode").val();
	var txtTelephone = $("#txtTelephone").val();
	var txtOpeningTime = $("#txtOpeningTime").val();
	var txtClosingTime = $("#txtClosingTime").val();
	var txtLunchTime = $("#txtLunchTime").val();
	var selClosedDay = $("#selClosedDay").val();
	var txtFooter = $("#txtFooter").val();
	var hiddenMainLabId = $("#hiddenMainLabId").val();

	if (labName == "") {
		icon - thin - right - arrow
		alert("Please Enter Lab Name!");
		SetFocus("txtLabName");
		return false;
	} else if (txtPathologist == "") {
		alert("Please Enter Pathologist Name!");
		SetFocus("txtPathologist");
		return false;
	} else if (txtTelephone == "") {
		alert("Please Enter Telephone Number!");
		SetFocus("txtTelephone");
		return false;
	}

	var inputs = [];
	inputs.push('action=saveOwnLabDetails');
	inputs.push('labName=' + encodeURIComponent(labName));
	inputs.push('address=' + encodeURIComponent(address));
	inputs.push('txtEmail=' + encodeURIComponent(txtEmail));
	inputs.push('txtPathologist=' + encodeURIComponent(txtPathologist));
	inputs.push('txtDegree=' + encodeURIComponent(txtDegree));
	inputs.push('txtLabCode=' + encodeURIComponent(txtLabCode));
	inputs.push('txtTelephone=' + encodeURIComponent(txtTelephone));
	inputs.push('txtOpeningTime=' + encodeURIComponent(txtOpeningTime));
	inputs.push('txtClosingTime=' + encodeURIComponent(txtClosingTime));
	inputs.push('txtLunchTime=' + encodeURIComponent(txtLunchTime));
	inputs.push('selClosedDay=' + encodeURIComponent(selClosedDay));
	inputs.push('txtFooter=' + encodeURIComponent(txtFooter));
	inputs.push('hiddenMainLabId=' + encodeURIComponent(hiddenMainLabId));
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			alert(ajaxResponse);
		}
	});

}
/** ************* End Sagar ******************************************** */
// Modify By Laxman for current/hold/recall Template on 25-Jan-2018.
var tempforCurrntLab = "<table class='table table-bordered table-striped table-condensed cf'><thead class='cf'>"
		+ "<tr><th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Date</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Assign Time </div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Report Due Date</div></th>"
		+ "<th class='numeric col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
		+ "<th class='numeric col-md-3-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Age</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Gender</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Test</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Routine Value</div></th>"

		/*
		 * + "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div
		 * class='TextFont'><button onclick='printSelTests()'
		 * data-placement='left' data-toggle='tooltip' class='btn btn-xs
		 * btn-warning' data-original-title='OutSourceTest'><i class='fa
		 * fa-print'></i></button></div></th>"
		 */
		// + "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div
		// class='TextFont'>Routine Report</div></th>"
		+ "	</tr></thead><tbody>"
		+ " {#foreach $T.listLabResultMstViewDto as lbrsltli}<tr>"
		+ "<td class='filterable-cell' align='center'>{count++}.</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.assignDate}</td>"
		+ "<td class='filterable-cell'>{$T.lbrsltli.assignTime}</td>"

		+ "{#if $T.lbrsltli.reportdueDate !='undefined' && $T.lbrsltli.reportdueDate != null && $T.lbrsltli.reportdueDate !=''}"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.reportdueDate}</td>"
		+ "{#else}"
		+ "<td class='filterable-cell' align='center'></td>"
		+ "{#/if}"
		+ "<td class='filterable-cell'>{$T.lbrsltli.patientId}</td>"
		+ "<td class='filterable-cell'>{$T.lbrsltli.patientName}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.age}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.gender}</td>"
		// + "<td class='filterable-cell'
		// align='center'>{$T.lbrsltli.testName}</td>"
		+ "<td class='filterable-cell' id = 'testname_{count - 1}' >{$T.lbrsltli.testName}</td>"
		+ "<td class='numeric filterable-cell'><input onclick='viewTestforResult({$T.lbrsltli.labrequestId},{$T.lbrsltli.treatmentId})'	style='font-size: 10px;' type='button' class = 'btn btn-xs btn-warning' value='ROUTINE VALUES' /></td>"
		+ "<td class='numeric filterable-cell'><input type='checkbox' style='margin-top: 2px; margin-left: 00px; cursor: pointer;' id='checkboxTest_{count-1}' value='{$T.lbrsltli.labrequestId}' "
		+ "onclick='checkPatientId(this.id,{$T.lbrsltli.patientId},{$T.lbrsltli.treatmentId},[{$T.lbrsltli.testid}],{$T.lbrsltli.labrequestId},[{$T.lbrsltli.rate}])'>"
		+ "<input type='hidden' id='testidfor_{$T.lbrsltli.labrequestId}' name='testidfor_{$T.lbrsltli.labrequestId}' value='{$T.lbrsltli.testid}' />"
		+ "<input type='hidden' id='testratefor_{$T.lbrsltli.labrequestId}' name='testratefor_{$T.lbrsltli.labrequestId}' value='{$T.lbrsltli.rate}' />"
		+ "</td>"

		/*
		 * + "<td class='numeric filterable-cell'><input type='checkbox'
		 * style='margin-top: 2px; margin-left: 00px; cursor: pointer;'
		 * id='checkboxTest_{count - 1}' value='{$T.lbrsltli.labrequestId}'
		 * onclick='checkPatId(this.id,{$T.lbrsltli.patientId},{$T.lbrsltli.treatmentId})'></td>"
		 */

		// + "<td class='numeric filterable-cell'><input
		// onclick='viewPathalogyPatientReport({$T.trmli.dateTime})'
		// style='font-size: 10px;' type='button' class = 'btn btn-xs
		// btn-success' value='ROUTINE REPORT' /></td>"
		+ "</tr>{#/for}</tbody></table>";

// @author:paras suryawanshi @code:template for unauthorised
// Modify By Laxman for unauthorized on 06-Feb-2018.
var tempforLabCrntUnAutho = "<table class='table table-bordered table-striped table-condensed cf'><thead class='cf'>"
		+ "<tr><th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Date</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Assign Time </div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Report Due Date</div></th>"
		+ "<th class='numeric col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
		+ "<th class='numeric col-md-3-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Age</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Gender</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Test</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Routine Value</div></th>"
		// + "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div
		// class='TextFont'>Routine Report</div></th>"
		+ "	</tr></thead><tbody>"
		+ " {#foreach $T.listLabResultMstViewDto as lbrsltli}"
		+ "<td class='filterable-cell' align='center'>{count++}.</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.assignDate}</td>"
		+ "<td class='filterable-cell'>{$T.lbrsltli.assignTime}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.reportdueDate}</td>"
		+ "<td class='filterable-cell'>{$T.lbrsltli.patientId}</td>"
		+ "<td class='filterable-cell'>{$T.lbrsltli.patientName}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.age}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.gender}</td>"
		// + "<td class='filterable-cell'
		// align='center'>{$T.trmli.objp.psx}</td>"
		+ "<td class='filterable-cell' id = 'testname_{count - 1}' >{$T.lbrsltli.testName}</td>"
		+ "<td class='numeric filterable-cell'><input onclick='viewTestforResult({$T.lbrsltli.labrequestId},{$T.lbrsltli.treatmentId})'	style='font-size: 10px;' type='button' class = 'btn btn-xs btn-warning' value='ROUTINE VALUES' /></td>"
		+ "<td class='numeric filterable-cell'><input value='{$T.lbrsltli.labrequestId}' id='chkun'	style='font-size: 10px;' type='checkBox' class = 'btn btn-xs btn-success'  /></td>"
		+ "</tr>{#/for}</tbody></table>";

// Modify by Laxman on for authorized Template 08-Feb-2018.
var tempforAuthLab = "<table class='table table-bordered table-condensed cf'><thead class='cf'>"
		+ "<button onclick='refreshPatPrevSelTest();' style='margin-left: 1003px;' data-placement='left' class='btn btn-xs btn-danger'><i class='fa fa-refresh'></i></button>"
		+ "<tr><th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Date</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Assign Time </div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Report Due Date</div></th>"
		+ "<th class='numeric col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
		+ "<th class='numeric col-md-3-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Age</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Gender</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Test</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Routine Value</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'><button onclick='printSelTests()' data-placement='left' data-toggle='tooltip' class='btn btn-xs btn-warning' data-original-title='Print'><i class='fa fa-print'></i></button></div></th>"
		+ "	</tr></thead><tbody>"
		+ " {#foreach $T.listLabResultMstViewDto as lbrsltli}"
		+ "<td class='filterable-cell' align='center'>{count++}.</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.assignDate}</td>"
		+ "<td class='filterable-cell'>{$T.lbrsltli.assignTime}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.reportdueDate}</td>"
		+ "<td class='filterable-cell'>{$T.lbrsltli.patientId}</td>"
		+ "<td class='filterable-cell'>{$T.lbrsltli.patientName}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.age}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.gender}</td>"
		// + "<td class='filterable-cell'
		// align='center'>{$T.lbrsltli.assignDate}</td>"
		+ "<td class='filterable-cell' id = 'testname_{count - 1}' >{$T.lbrsltli.testName}</td>"
		+ "<td class='numeric filterable-cell'><input onclick='viewTestforResult({$T.lbrsltli.labrequestId},{$T.lbrsltli.treatmentId})' style='font-size: 10px;' type='button' class = 'btn btn-xs btn-warning' value='ROUTINE VALUES'/></td>"
		+ "<td class='numeric filterable-cell'><input type='checkbox' style='margin-top: 2px; margin-left: 00px; cursor: pointer;' id='checkboxTest_{count - 1}' value='{$T.lbrsltli.labrequestId}' onclick='checkPatId(this.id,{$T.lbrsltli.patientId},{$T.lbrsltli.treatmentId})'></td>"
		+ "</tr>{#/for}</tbody></table>";

// Added by Laxman for Privious template on 07-Feb-2018.
var tempforLabPrivst = "<table class='table table-bordered table-condensed cf'><thead class='cf'>"
		+ "<button onclick='refreshPatPrevSelTest();' style='margin-left: 1003px;' data-placement='left' class='btn btn-xs btn-danger'><i class='fa fa-refresh'></i></button>"
		+ "<tr><th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Date</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Assign Time </div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Report Due Date</div></th>"
		+ "<th class='numeric col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
		+ "<th class='numeric col-md-3-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Age</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Gender</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Test</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Routine Value</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'><button onclick='printSelTests()' data-placement='left' data-toggle='tooltip' class='btn btn-xs btn-warning' data-original-title='Print'><i class='fa fa-print'></i></button></div></th>"
		+ "	</tr></thead><tbody>"
		+ " {#foreach $T.listLabResultMstViewDto as lbrsltli}"
		+ "<td class='filterable-cell' align='center'>{count++}.</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.assignDate}</td>"
		+ "<td class='filterable-cell'>{$T.lbrsltli.assignTime}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.reportdueDate}</td>"
		+ "<td class='filterable-cell'>{$T.lbrsltli.patientId}</td>"
		+ "<td class='filterable-cell'>{$T.lbrsltli.patientName}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.age}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.gender}</td>"
		// + "<td class='filterable-cell'
		// align='center'>{$T.lbrsltli.assignDate}</td>"
		+ "<td class='filterable-cell' id = 'testname_{count - 1}' >{$T.lbrsltli.testName}</td>"
		+ "<td class='numeric filterable-cell'><input onclick='viewTestforResult({$T.lbrsltli.labrequestId},{$T.lbrsltli.treatmentId})' style='font-size: 10px;' type='button' class = 'btn btn-xs btn-warning' value='ROUTINE VALUES'/></td>"
		+ "<td class='numeric filterable-cell'><input type='checkbox' style='margin-top: 2px; margin-left: 00px; cursor: pointer;' id='checkboxTest_{count - 1}' value='{$T.lbrsltli.labrequestId}' onclick='checkPatId(this.id,{$T.lbrsltli.patientId},{$T.lbrsltli.treatmentId})'></td>"
		+ "</tr>{#/for}</tbody></table>";

var tempforHeam = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 99%; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Age</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Gender</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>View Chart</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 410px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.trmli as trmli}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.trmli.objp.pini}{$T.trmli.objp.pnm}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.trmli.pid}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.trmli.objp.pag} {$T.trmli.objp.pagty}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.trmli.objp.psx}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='View' id='btnView{count}' onClick='viewFlowChart({$T.trmli.tmid})'>"
		+ "<i class='fa fa-eye'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

// Modify By Laxman on 25-Jan-2018.
function getLabTestPatientDashboard(type, page) {
	var strValue = $.trim($("#byName").val());
	var strBarcode = $.trim($("#byBarcode").val());

	if (type == "search" && (strBarcode == "" && strValue == "")) {
		alert("Please Insert Something For Search");
		return false;
	}
	if (strBarcode != "" && strValue != "") {
		alert("Please insert only one value for search");
		$("#byName").val('');
		$("#byBarcode").val('');
	} else {
		var inputs = [];
		inputs.push('action=getPatientTestDash');
		inputs.push('strValue=' + encodeURIComponent(strValue));
		inputs.push('strBarcode=' + encodeURIComponent(strBarcode));
		inputs.push('type=' + type);
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
						//alert(r);
						ajaxResponse = r;
						count = 1;

						// alert("-------->>>"+JSON.stringify(ajaxResponse));
						var pobj1 = eval('(' + ajaxResponse + ')');
						if (pobj1.listLabResultMstViewDto.length > 0) {
							$("#pathologyAllPatInfo").html(ajaxResponse);
							if (page == 'heamo') {
								$("#patientcontainer").setTemplate(tempforHeam);
							} else if (page == 'labTestResults') {

								if (type == 'onload' || type == 'opd'
										|| type == 'ipd' || type == 'diagnosis') {
									$("#patientcontainer").setTemplate(
											tempforCurrntLab);
									$("#patientcontainer").processTemplate(
											pobj1);

								} else if (type == 'unathot' || type == 'cl'
										|| type == 'ch' || type == 'nl') {
									$("#patientcontainerU").setTemplate(
											tempforLabCrntUnAutho); // set new
									// template
									// by paras
									$("#patientcontainerU").processTemplate(
											pobj1);
								} else if (type == 'autho' || type == 'authIpd'
										|| type == 'authOpd'
										|| type == 'authDiagnosis') {
									$("#patientcontainerAuth").setTemplate(
											tempforAuthLab);
									$("#patientcontainerAuth").processTemplate(
											pobj1);

								} else if (type == 'holdt') {
									$("#patientcontainerH").setTemplate(
											tempforCurrntLab);
									$("#patientcontainerH").processTemplate(
											pobj1);

								} else if (type == 'recallt') {
									$("#patientcontainerR").setTemplate(
											tempforCurrntLab);
									$("#patientcontainerR").processTemplate(
											pobj1);

								} else if (type == 'privst'
										|| type == 'privIpd'
										|| type == 'privOpd'
										|| type == 'privDiagnosis') {
									$("#patientcontainerPrivst").setTemplate(
											tempforLabPrivst);
									$("#patientcontainerPrivst")
											.processTemplate(pobj1);

								}
								if (type == 'outlab') {
									$("#patientcontainerOutsource")
											.setTemplate(
													patientcontainerOutSource);
									$("#patientcontainerOutsource")
											.processTemplate(pobj1);
								}
								/*
								 * for ( var i = 0; i <
								 * pobj1.listLabTestResultViewDto.length; i++) {
								 * if(pobj1.trmli[i].ptflag == "N"){ if
								 * (pobj1.trmli[i].testlist.length > 0) { var
								 * testCount = pobj1.trmli[i].testlist.length;
								 * var testdet = pobj1.trmli[i].testlist[0].tst +
								 * "-" + pobj1.trmli[i].testlist[0].tcd;
								 * 
								 * if (testCount > 1) { var title = ""; for (
								 * var j = 0; j <
								 * pobj1.trmli[i].testlist.length; j++) { var
								 * testname = pobj1.trmli[i].testlist[j].tst +
								 * "--" + pobj1.trmli[i].testlist[j].tcd + "--" +
								 * pobj1.trmli[i].testlist[j].tnm; title = title + " " +
								 * testname + "\n"; } testdet = testdet +
								 * "&nbsp;&nbsp;" + '<a href="#"
								 * style="color:red;" data-toggle="tooltip"
								 * data-placement="bottom" title="' + title +
								 * '"><i class = "fa fa-plus-circle"></i></a>';
								 * $("#testname_"+(i + 1)).html(testdet); } else {
								 * $("#testname_"+(i + 1)).html(testdet); } } } }
								 */
							}
						} else {
							if (type != "onload") {
								alertify.error("Record Not Found");
								// alert("Record Not Found");
								SetFocus("byName");
							}
							$("#patientcontainer").html("");
							$("#patientcontainerAuth").html("");
							$("#patientcontainerH").html("");
							$("#patientcontainerR").html("");
							$("#patientcontainerPrivst").html("");
							$("#patientcontainerOutsource").html("");
						}

						/*
						 * count = 1;
						 * $("#patientcontainerPrevious").setTemplate(tempforLabPrevious);
						 * $("#patientcontainerPrevious").processTemplate(pobj1);
						 * 
						 * for ( var i = 0; i < pobj1.trmli.length; i++) {
						 * if(pobj1.trmli[i].ptflag == "Y"){ if
						 * (pobj1.trmli[i].testlist.length > 0) { var testCount =
						 * pobj1.trmli[i].testlist.length; var testdet =
						 * pobj1.trmli[i].testlist[0].tst + "-" +
						 * pobj1.trmli[i].testlist[0].tcd;
						 * 
						 * if (testCount > 1) { var title = ""; for ( var j = 0;
						 * j < pobj1.trmli[i].testlist.length; j++) { var
						 * testname = pobj1.trmli[i].testlist[j].tst + "--" +
						 * pobj1.trmli[i].testlist[j].tcd + "--" +
						 * pobj1.trmli[i].testlist[j].tnm; title = title + " " +
						 * testname + "\n"; } testdet = testdet + "&nbsp;&nbsp;" + '<a
						 * href="#" style="color:red;" data-toggle="tooltip"
						 * data-placement="bottom" title="' + title + '"><i
						 * class = "fa fa-plus-circle"></i></a>';
						 * $("#prevtestname_"+(i + 1)).html(testdet); } else {
						 * $("#prevtestname_"+(i + 1)).html(testdet); } } } }
						 */
					}
				});
	}
}
// Modify by Laxman.
function viewTestforResult(testmasterId, treatmentId) {

	window.location.href = "labTestresult.jsp?testmasterId=" + testmasterId
			+ "&treatmentId=" + treatmentId;

}

function viewPathalogyPatientReport(idtestmstr) {

	var patientTest = $("#pathologyAllPatInfo").html();

	var myArray = JSON.parse(patientTest);

	for ( var i = 0; i < myArray.trmli.length; i++) {
		if (myArray.trmli[i].tmid == idtestmstr) {
			myObj = myArray.trmli[i];
			break;
		}
	}
	var pid = myObj.objp.ehatPi;
	myObj.testlist = null;
	myObj = JSON.stringify(myObj);
	sBean = myObj;
	window.location.href = "labTestReport.jsp?testmasterId=" + idtestmstr
			+ "&patientdetails=" + sBean.decodeSpecialChars() + "&patientId="
			+ pid;

}
var valTypeNR = "";
var protestcount = 1;
var procount = 1;
var testcount = 1;
var totalcount = 1;

var abc = "<table class='table table-bordered table-striped table-condensed cf' style='border:1px;'>"
		+ "<tbody>"
		+ "{#foreach $T.proLi[2] as pkgLi}"
		+ "<tr>"
		+ "	<td class='col-sm-2-1'>{sr++}</td>"
		+ "	<td class='col-sm-10-1' id='pkgDiv{$T.pkgLi.idlbpkg}'>{$T.pkgLi.pkgnm}</td>"
		+ "	{#foreach $T.pkgLi.lbproli as lbproli}"
		+ "	<td class='numeric ' id='proDiv{$T.lbproli.proId}'>{$T.lbproli.proNm}</td>"
		+ "	{#foreach $T.lbproli.testli as testli}"
		+ "	<td class='numeric ' id='testDiv{$T.testli.tid}'>"
		+ "	<td class=''>{$T.testli.tnm} <input type='hidden'value='{$T.testli.tnm}' id='nameOfTest{count}' /><input		type='hidden' value='{$T.testli.objLbForm.extstid}'	id='formulaForTest{count}' /></td>"
		+ "<td class=''><input type='hidden' value='{$T.testli.idTstRe}' id='idResultTest{count}' /><input 	type='hidden' value='{$T.testli.tid}' id='idOfTest{count}' /> <input	type='text' value='{$T.testli.tstRe}'onfocus='setFormulaToTestResult({count})' id='testvalue{count++}'		maxlength='12' /></td>"
		+ "	<td class=''>{#if $T.testli.vt =='g'}{$T.testli.tnvli[0].nvlv} {#/if} {#if $T.testli.vt =='i} {#if valTypeNR !=''} {#foreach $T.testli.tnvli as tnvli} {#if valTypeNR == $T.tnvli.nvsx}{$T.tnvli.nvlv} &nbsp; - &nbsp; {$T.tnvli.nvuv}"
		+ "	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {$T.tnvli.unitnm}{#/if} {#/for}"
		+ "	{#/if} {#/if}</td>"
		+ "	<td class=''>{$T.testli.tmethd}</td>"
		+ "	</td> {#/for} {#/for} {#foreach $T.pkgLi.lbtstli as testli}"
		+ "	<td class='' id='testDiv{$T.testli.tid}'>"
		+ "	<td class=''>{$T.testli.tcd} - {$T.testli.tnm}<input type='hidden' value='' {$T.testli.tnm}' id='nameOfTest{count}' /><input		type='hidden' value='{$T.testli.objLbForm.extstid}' id='formulaForTest{count}' />"
		+ "	</td>"
		+ "	<td class=''><input type='hidden'value='{$T.testli.idTstRe}' id='idResultTest{count}' /><input type='hidden' value='{$T.testli.tid}' id='idOfTest{count}' /> <input type='text' value='{$T.testli.tstRe}' onfocus='setFormulaToTestResult({count})' id='testvalue{count++}' maxlength='12' /></td>"
		+ "	<td class=''>{#if $T.testli.vt =='g'}{$T.testli.tnvli[0].nvlv} {#/if} {#if $T.testli.vt =='i'} {#if valTypeNR !=''}"
		+ "{#foreach $T.testli.tnvli as tnvli} {#if valTypeNR == $T.tnvli.nvsx}{$T.tnvli.nvlv} &nbsp; - &nbsp; {$T.tnvli.nvuv}"
		+ "	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {$T.tnvli.unitnm}{#/if} {#/for}"
		+ "	{#/if} {#/if}</td>"
		+ "	<td class=''>{$T.testli.tmethd}</td>"
		+ "	</td> {#/for} {#/for} {#foreach $T.proLi[0] as proLi}"
		+ "	<td class=''>"
		+ "	<td class=''>{sr++}</td>"
		+ "	<td class='' id='proDiv{$T.proLi.proId}'>{$T.proLi.proNm}</td>"
		+ "	{#foreach $T.proLi.testli as testli}"
		+ "	<td class='' id='testDiv{$T.testli.tid}'>"
		+ "	<td class=''>{$T.testli.tcd} - {$T.testli.tnm}<input type='hidden' value='{$T.testli.tnm}' id='nameOfTest{count}' /><input type='hidden' value='{$T.testli.objLbForm.extstid}' id='formulaForTest{count}' /></td>"
		+ "	<td class=''><input type='hidden' value='{$T.testli.idTstRe}' id='idResultTest{count}' /><input type='hidden' value='{$T.testli.tid}' id='idOfTest{count}' /> <input type='text' value='{$T.testli.tstRe}' onfocus='setFormulaToTestResult({count})' id='testvalue{count++}' maxlength='12' /></td>"
		+ "	<td class=''>{#if $T.testli.vt =='g'}"
		+ "	{$T.testli.tnvli[0].nvlv} {#/if} {#if $T.testli.vt =='i'} {#if valTypeNR !=''} {#foreach $T.testli.tnvli as tnvli}"
		+ "{#if valTypeNR == $T.tnvli.nvsx}{$T.tnvli.nvlv} &nbsp; - &nbsp; {$T.tnvli.nvuv}"
		+ "	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {$T.tnvli.unitnm}{#/if} {#/for}"
		+ "	{#/if} {#/if}</td>"
		+ "	<td class=''>{$T.testli.tmethd}</td>"
		+ "	</td> {#/for} {#/for} {#foreach $T.proLi[1] as testli}"
		+ "	<td class='' id='testDiv{$T.testli.tid}'>"
		+ "	<td class=''>$T.testli.tcd} - {$T.testli.tnm}<input type='hidden' value='{$T.testli.tnm}' id='nameOfTest{count}' /><input type='hidden' value='{$T.testli.objLbForm.extstid}' id='formulaForTest{count}' /></td>"
		+ "	<td class=''><input type='hidden' value='{$T.testli.idTstRe}' id='idResultTest{count}' /><input type='hidden' value='{$T.testli.tid}' id='idOfTest{count}' /> <input type='text' value='{$T.testli.tstRe}' 	onfocus='setFormulaToTestResult({count})' id='testvalue{count++}' /></td>"
		+ "	<td class=''>{#if $T.testli.vt =='g'}"
		+ "	{$T.testli.tnvli[0].nvlv} {#/if} {#if $T.testli.vt =='i'} {#if valTypeNR !=''} {#foreach $T.testli.tnvli as tnvli}"
		+ "{#if valTypeNR == $T.tnvli.nvsx} {$T.tnvli.nvlv} &nbsp; - &nbsp; {$T.tnvli.nvuv}"
		+ "	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {$T.tnvli.unitnm}{#/if} {#/for}"
		+ "	{#/if}{#/if}</td>"
		+ "	<td class=''>{$T.testli.tmethd}</td> {#/for}"
		+ "	</td>"
		+ "</tbody>" + "</table>";

// Modify by Laxman on 30-Jan-2018.
function viewTestResult(callfrom) {
	var tretId = "";
	var testmasterId = "";
	// @codeBy : Kavita @codeDate : 3-Feb-2017
	if (callfrom == "OTAnaestheticAssess") {
		var valTypeNR = "n";
		tretId = ($("#treatmentId").val()).trim();
		testmasterId = ($("#testmasterId").val()).trim();
		var patientObj = $("#divPatId").html();
		var patJsObj = eval('(' + patientObj + ')');
		var age = patJsObj.ag;
		var gender = patJsObj.sx;
		if (age > 15) {
			if (gender == "Male") {
				valTypeNR = "m";
			} else if (gender == "Female") {
				valTypeNR = "f";
			}
		} else if (15 >= age && age >= 3) {
			valTypeNR = "c";
		} else if (age < 3) {
			valTypeNR = "n";
		}

	}// end @codeBy : Kavita @codeDate : 3-Feb-2017
	else if (callfrom == "OpdDoctorDesk2") {
		var valTypeNR = "n";
		tretId = ($("#treatmentId").html()).trim();
		testmasterId = ($("#testmasterId").val()).trim();
		var ag = $("#age").html();
		var age = ag.split("Y")[0];
		var gender = $("#sex").html();

		if (age > 15) {
			if (gender == "Male") {
				valTypeNR = "m";
			} else if (gender == "Female") {
				valTypeNR = "f";
			}

		} else if (15 >= age && age >= 3) {
			valTypeNR = "c";
		} else if (age < 3) {
			valTypeNR = "n";
		}
	} else {

		testmasterId = $("#testmasterId").html();
		var patientTest = $("#patientdetails").html();
		var patData = eval('(' + patientTest + ')');
		var valTypeNR = "n";
		if (patData.listRegTreBillDto[0].age.split("Y")[0] > 15) {
			if (patData.listRegTreBillDto[0].gender == "Male") {
				valTypeNR = "m";
			} else if (patData.listRegTreBillDto[0].gender == "Female") {
				valTypeNR = "f";
			}
		} else if (15 >= patData.listRegTreBillDto[0].age.split("Y")[0]
				&& patData.listRegTreBillDto[0].age.split("Y")[0] >= 3) {
			valTypeNR = "c";
		} else if (patData.listRegTreBillDto[0].age.split("Y")[0] < 3) {
			valTypeNR = "n";
		}

		tretId = patData.listRegTreBillDto[0].treatmentId;
		$("#treat_ID").val(tretId);
	}

	var inputs = [];
	inputs.push('action=viewTestforResult');
	inputs.push('testmasterId=' + testmasterId);
	inputs.push('tretId=' + tretId);
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
					// alert(r);
					ajaxResponse = r;
					testcount = 1;
					count = 1;
					protestcount = 1;
					pkgcount = 1;
					pkgprocount = 1;
					pkgprotestcount = 1;
					pkgtestcount = 1;
					procount = 1;
					totalcount = 1;
					$("#testDetails").html(ajaxResponse);
					var pobj1 = eval('(' + ajaxResponse + ')');

					// $("#testDiv").setTemplate(abc);
					/*
					 * $("#testDiv").setTemplate($("#featchProAndTestTemp").html());
					 * $("#testDiv").processTemplate(pobj1);
					 */
					var pid = "";
					var count = 1;

					// alert("pobj id ::"+pobj1.proLi[2][0].idlbpkg);
					console.log(pobj1);

					if (callfrom != "OpdDoctorDesk2") {
						// Code by Touheed
						ajaxResponse = $("#userObj").html();
						myArray = JSON.parse(ajaxResponse);
					}
					// This is for Pakcage only
					sr1 = 1;
					testcount1 = 1;
					count1 = 1;
					protestcount1 = 1;
					pkgcount1 = 1;
					pkgprocount1 = 1;
					pkgprotestcount1 = 1;
					pkgtestcount1 = 1;
					procount1 = 1;
					totalcount1 = 1;

					var html = "";
					for ( var pk = 0; pk < pobj1.proLi[2].length; pk++) {
						var packageID = pobj1.proLi[2][pk].idlbpkg;

						// alert(pobj1.proLi[2][pk].pkgnm);
						html = html
								+ "<div class='col-md-12-1' style='border-bottom: 1px solid #ddd;margin-top: -11px;'>";
						html = html + "<div class='divide-20'></div>";
						html = html
								+ "<div class='col-md-1-1' style='height: 28px; padding-left: 3%; border-top: 1px solid #ddd;border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>"
								+ (sr1++) + "</div>";

						html = html
								+ "<div class='col-md-11-1' style='height: 28px; padding-left: 1%;padding-top: 2px; text-align: left; border-top: 1px solid #ddd;' id='pkgDiv"
								+ (pkgcount1) + "'>"
								+ (pobj1.proLi[2][pk].pkgnm) + "</div>";
						html = html
								+ "<input type='hidden' value='pk' id='type"
								+ testcount + "' />";
						html = html + "</div>";

						for ( var i = 0; i < myArray.lbpkgli.length; i++) {

							if (myArray.lbpkgli[i].idlbpkg == packageID) {
								myObj1 = myArray.lbpkgli[i];
								break;
							}
						}
						myObj = JSON.stringify(myObj1);
						userBean = eval('(' + myObj + ')');
						console.log(userBean);

						pid = userBean.idlbpkg;

						// Now If both contains same packageID
						if (packageID == pid) {

							// alert("Pckage id "+pid);

							for ( var pr = 0; pr < userBean.pkgprotstli.length; pr++) {

								var tType = userBean.pkgprotstli[pr].typeTP;
								// alert(tType);

								if (tType == "P") {
									var pid = userBean.pkgprotstli[pr].idprotst;
									// alert(pid);

									// profile from main list
									for ( var p = 0; p < pobj1.proLi[2][pk].lbproli.length; p++) {

										if (pobj1.proLi[2][pk].lbproli[p].proId == pid) {

											// alert(pobj1.proLi[2][pk].lbproli[p].proNm);
											html = html
													+ "<div class='col-md-12-1'";
											html = html
													+ "style='margin-top: -11px;'>";
											html = html
													+ "<div class='divide-20'></div>";
											html = html
													+ "<div class='col-md-1-1'";
											html = html
													+ "style='height: 28px; padding-left: 2%;border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>";
											html = html + "</div>";

											html = html
													+ "<div class='col-md-11-1'";
											html = html
													+ "style='height: 28px; padding-left: 4%; padding-top: 2px; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; text-align: left;'";
											html = html
													+ "id='pkgproDiv"
													+ (pkgcount1)
													+ (pkgprocount)
													+ "'>"
													+ (pobj1.proLi[2][pk].lbproli[p].proNm)
													+ "</div>";
											html = html
													+ "<input type='hidden' value='pkp' id='type"
													+ (testcount) + "' />";
											html = html + "</div>";
											// test in profile
											for ( var pt = 0; pt < pobj1.proLi[2][pk].lbproli[p].testli.length; pt++) {

												if (pobj1.proLi[2][pk].lbproli[p].testli[pt].tid != 0) {

													html = html
															+ "<div class='col-md-12-1'  style='margin-top: -11px;'";
													html = html
															+ "id='testDiv"
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tid)
															+ "'>";
													html = html
															+ "<div class='divide-20'></div>";
													html = html
															+ "<input type='hidden' value='pkpt' id='type"
															+ (procount1)
															+ "' />";

													html = html
															+ "<div class='col-md-2-1'";
													html = html
															+ "style='height: 28px; padding-left: 1%; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>";
													html = html + "</div>";

													html = html
															+ "<div class='col-md-4-1'";
													html = html
															+ "style='height: 28px; padding-left: 2%; border-top: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'";
													html = html
															+ "id='testNM"
															+ (pkgcount1)
															+ (pkgprocount1)
															+ (pkgprotestcount1)
															+ "'>"
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnm);
													html = html
															+ "<input type='hidden' value='"
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnm)
															+ "' id='nameOfTest"
															+ (count1) + "' />";
													html = html
															+ "<input type='hidden' value='"
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].objLbForm.extstid)
															+ "' id='formulaForTest"
															+ count1 + "' />";
													html = html + "</div>";

													if (pobj1.proLi[2][pk].lbproli[p].testli[pt].tstRe == undefined) {
														pobj1.proLi[2][pk].lbproli[p].testli[pt].tstRe = "";
													}
													var rowNum = count1;
													html = html
															+ "<div class='col-md-2-1'";
													html = html
															+ "style='height: 28px;border-top: 1px solid #ddd;border-right: 1px solid #ddd; padding-top: 2px;padding-left: 1%;padding-right: 1%;'";
													html = html
															+ "id='testRE"
															+ (pkgcount1)
															+ (pkgprocount1)
															+ (pkgprotestcount1)
															+ "'>";
													html = html
															+ "<input type='hidden' value='"
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].idTstRe)
															+ "' id='idResultTest"
															+ (count1) + "' />";
													html = html
															+ "<input type='hidden' value='"
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tid)
															+ "' id='idOfTest"
															+ (count1) + "' />";
													html = html
															+ "<input type='text' value='"
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tstRe)
															+ "' onfocus='setFormulaToTestResult("
															+ count1
															+ ")' id='testvalue"
															+ (count1++)
															+ "' maxlength='100' style='width: 100%;' />";
													html = html + "</div>";

													html = html
															+ "<div class='col-md-2-1'";
													html = html
															+ "style='height: 28px; padding-left: 1%; border-right: 1px solid #ddd; border-top: 1px solid #ddd; padding-top: 2px;text-align: center;'";
													html = html
															+ "id='testNR"
															+ (pkgcount1)
															+ (pkgprocount1)
															+ (pkgprotestcount1)
															+ "'>";

													if (pobj1.proLi[2][pk].lbproli[p].testli[pt].vt == "g") {

														html = html
																+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[0].nvlv);

													}

													if (pobj1.proLi[2][pk].lbproli[p].testli[pt].vt == "i") {

														/**
														 * ************lab*newindividual***@author:paras*
														 * for
														 * pakage-profile****************
														 */

														if (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli.length > 4) {

															if (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[4].oldandnew == 1) // for
															// new
															// records
															// age
															// vise.
															{

																var a = pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[4].oldandnew;
																// alert(a);
																var k = pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[4].male;
																// alert(k);
																html = html
																		+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[4].nvlv)
																		+ " - "
																		+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[4].nvuv)
																		+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[4].unitnm);

															} else {
																if (valTypeNR != "") { // for
																	// new
																	// records
																	// gendar
																	// vise.

																	for ( var k = 0; k < pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli.length; k++) {

																		if (valTypeNR == pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].nvsx) {

																			html = html
																					+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].nvlv)
																					+ " - "
																					+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].nvuv)
																					+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].unitnm);

																		}
																	}

																}
															}
														} else { // for new
															// records
															// gendar
															// vise.

															if (valTypeNR != "") {

																for ( var k = 0; k < pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli.length; k++) {

																	if (valTypeNR == pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].nvsx) {

																		html = html
																				+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].nvlv)
																				+ " - "
																				+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].nvuv)
																				+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].unitnm);

																	}
																}

															}
														}
													}

													html = html + "</div>";

													html = html
															+ "<div id='testMethod"
															+ (pkgcount)
															+ (pkgprocount)
															+ (pkgprotestcount)
															+ "' class='col-md-2-1'";
													html = html
															+ "style='height: 28px;border-top: 1px solid #ddd; padding-top: 2px;'>";
													html = html
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tmethd);

													// for popup to type value
													html = html
															+ "<button id='btnInsert"
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tid)
															+ (rowNum)
															+ "' class='btn btn-xs btn-success' value='' name='btnInsert' onclick='openEditorForResult("
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].idTstRe)
															+ ","
															+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tid)
															+ ","
															+ (rowNum)
															+ ",\"pkgprots\")' title='Type Result'  style='float:right'>";
													if (callfrom == "OpdDoctorDesk2"
															|| callfrom == "OTAnaestheticAssess") {
														html = html
																+ "<i class='fa fa-eye View'></i> </button>";
													} else {
														html = html
																+ "<i class='fa fa-edit'></i> </button>";
													}

													// for popup to type value

													html = html + "</div>";
													html = html + "</div>";

													html = html
															+ "<input type='hidden' value='"
															+ (pkgprotestcount1++)
															+ "{}' />";

												}

											}
											html = html
													+ "<input type='hidden' value='"
													+ (pkgprotestcount1)
													+ "' id='reportpkgproTestCount"
													+ (pkgcount1)
													+ (pkgprocount1) + "' />";
											html = html
													+ "<input type='hidden' value='"
													+ (pkgprocount1++) + "' />";
											html = html
													+ "<input type='hidden' value='"
													+ (pkgprocount1)
													+ "' id='reportpkgproCount"
													+ (pkgcount1) + "' />";

											break;
										}

									}

								}// if Profile
								else {
									var tid = userBean.pkgprotstli[pr].idprotst;
									// alert(tid);
									// test from main list
									for ( var t = 0; t < pobj1.proLi[2][pk].lbtstli.length; t++) {

										if (pobj1.proLi[2][pk].lbtstli[t].tid == tid) {

											// alert(pobj1.proLi[2][pk].lbtstli[t].tnm);

											html = html
													+ "<div class='col-md-12-1' style='margin-top: -11px;' id='pkgtestDiv"
													+ (pkgcount1)
													+ (pkgtestcount1) + "'>";
											html = html
													+ "<div class='divide-20'></div>";
											html = html
													+ "<input type='hidden' value='pkt' id='type"
													+ (testcount1) + "' />";
											html = html
													+ "<div class='col-md-1-1' style='height: 28px;padding-left: 1%;border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'></div>";
											html = html
													+ "<div class='col-md-5-1' style='height: 28px; padding-left: 2%;border-top: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'";
											html = html
													+ "id='pkgtestNM"
													+ (pkgcount1)
													+ (pkgtestcount)
													+ "'>"
													+ (pobj1.proLi[2][pk].lbtstli[t].tnm);
											html = html
													+ "<input type='hidden' value='"
													+ (pobj1.proLi[2][pk].lbtstli[t].tnm)
													+ "' id='nameOfTest"
													+ (count1) + "' />";
											html = html
													+ "<input type='hidden' value='"
													+ (pobj1.proLi[2][pk].lbtstli[t].objLbForm.extstid)
													+ "' id='formulaForTest"
													+ count1 + "' />";
											html = html + "</div>";
											if (pobj1.proLi[2][pk].lbtstli[t].tstRe == undefined) {
												pobj1.proLi[2][pk].lbtstli[t].tstRe = "";
											}
											var rowNum = count1;
											html = html
													+ "<div class='col-md-2-1'";
											html = html
													+ "style='height: 28px; padding-left: 1%; padding-right: 1%; border-top: 1px solid #ddd;border-right: 1px solid #ddd; padding-top: 2px;'";
											html = html + "id='pkgtestRE"
													+ (pkgcount1)
													+ (pkgtestcount1) + "'>";
											html = html
													+ "<input type='hidden' value='"
													+ (pobj1.proLi[2][pk].lbtstli[t].idTstRe)
													+ "' id='idResultTest"
													+ (count1) + "' />";
											html = html
													+ "<input type='hidden' value='"
													+ (pobj1.proLi[2][pk].lbtstli[t].tid)
													+ "' id='idOfTest" + count1
													+ "' />";
											html = html
													+ "<input	type='text' value='"
													+ (pobj1.proLi[2][pk].lbtstli[t].tstRe)
													+ "' onfocus='setFormulaToTestResult("
													+ count1
													+ ")' onkeypress='return validateSpecialMoreChar(event)' id='testvalue"
													+ (count1++)
													+ "' maxlength='100' style='width: 100%;'/></div>";
											html = html
													+ "<div class='col-md-2-1'";
											html = html
													+ "style='height: 28px; padding-left: 1%; border-right: 1px solid #ddd;border-top: 1px solid #ddd; padding-top: 2px;text-align: center;'";
											html = html + "id='pkgtestNR"
													+ (pkgcount1)
													+ (pkgtestcount1) + "'>";

											if (pobj1.proLi[2][pk].lbtstli[t].vt == "g") {

												html = html
														+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[0].nvlv);

											}

											if (pobj1.proLi[2][pk].lbtstli[t].vt == "i") {

												/**
												 * ************lab*newindividual***@author:paras*
												 * for
												 * pakage-test****************
												 */

												if (pobj1.proLi[2][pk].lbtstli[t].tnvli.length > 4) {

													if (pobj1.proLi[2][pk].lbtstli[t].tnvli[4].oldandnew == 1) // for
													// new
													// records
													// age
													// vise.
													{

														var a = pobj1.proLi[2][pk].lbtstli[t].tnvli[4].oldandnew;
														// alert(a);
														var k = pobj1.proLi[2][pk].lbtstli[t].tnvli[4].male;
														// alert(k);
														html = html
																+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[4].nvlv)
																+ " - "
																+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[4].nvuv)
																+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[4].unitnm);

													} else {

														if (valTypeNR != "") {

															for ( var tnv = 0; tnv < pobj1.proLi[2][pk].lbtstli[t].tnvli.length; tnv++) {

																if (valTypeNR == pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].nvsx) {
																	html = html
																			+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].nvlv)
																			+ " - "
																			+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].nvuv)
																			+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].unitnm);
																}
															}

														}
													}
												} else {

													if (valTypeNR != "") {

														for ( var tnv = 0; tnv < pobj1.proLi[2][pk].lbtstli[t].tnvli.length; tnv++) {

															if (valTypeNR == pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].nvsx) {
																html = html
																		+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].nvlv)
																		+ " - "
																		+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].nvuv)
																		+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].unitnm);
															}
														}

													}
												}
											}

											html = html + "</div>";

											html = html
													+ "<div class='col-md-2-1' id='pkgtestMethod"
													+ (pkgcount1)
													+ (pkgtestcount1) + "' ";
											html = html
													+ "style='height: 28px;border-top: 1px solid #ddd; padding-top: 2px;'>";
											html = html
													+ ((pobj1.proLi[2][pk].lbtstli[t].tmethd));
											// for popup to type value
											html = html
													+ "<button id='btnInsert"
													+ (pobj1.proLi[2][pk].lbtstli[t].tid)
													+ (rowNum)
													+ "' class='btn btn-xs btn-success' value='' name='btnInsert' onclick='openEditorForResult("
													+ (pobj1.proLi[2][pk].lbtstli[t].idTstRe)
													+ ","
													+ (pobj1.proLi[2][pk].lbtstli[t].tid)
													+ ","
													+ (rowNum)
													+ ",\"pkgts\")' title='Type Result'  style='float:right'>";
											if (callfrom == "OpdDoctorDesk2"
													|| callfrom == "OTAnaestheticAssess") {
												html = html
														+ "<i class='fa fa-eye View'></i> </button>";
											} else {
												html = html
														+ "<i class='fa fa-edit'></i> </button>";
											}
											// for popup to type value
											html = html + "</div>";
											html = html + "</div>";

											html = html
													+ "<input type='hidden' value='"
													+ (pkgtestcount1++)
													+ "' />";
											/*
											 * html = html+"<input
											 * type='hidden'
											 * value='"+(pkgtestcount1)+"'
											 * id='reportpkgtestCount"+pkgcount1+"'
											 * />"; html = html+"<input
											 * type='hidden'
											 * value='"+(pkgcount1+++)"' />";
											 * html = html+"<input
											 * type='hidden'
											 * value='"+(pkgcount1)+"'
											 * id='reportpkgCount' />";
											 */
											break;

										}// if inner else

									}// else inner for loop

								}// else test

							}

						}// if for package id equal

					}// for main list proLi[2]

					// 2nd list inside main list

					for ( var pk = 0; pk < pobj1.proLi[0].length; pk++) {
						/*var tempTestOrPackage = pobj1.proLi[0][pk].proNm;
						if (pobj1.proLi[0][pk].pkgNm != "-"
							&& pobj1.proLi[0][pk].pkgNm != null
							&& pobj1.proLi[0][pk].pkgNm != "") {
							tempTestOrPackage = pobj1.proLi[0][pk].pkgNm;
						}*/
						//alert("kkkkkkkk:"+pobj1.proLi[0][pk].lab_test_code);
						
						
						html = html + "<div class='col-md-12-1'";
						html = html
								+ "style='border-top: 1px solid #ddd; margin-top: -1px;'>";
						html = html + "<div class='divide-10'></div>";
						html = html + "<div class='col-md-1-1'";
						html = html
								+ "style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>"
								+ (sr1++);
						html = html + "</div>";

						html = html + "<div class='col-md-11-1'";
						html = html
								+ " style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;left;font-weight: bold;'";
						html = html + " id='proDiv" + (procount1) + "' data-value='"+ pobj1.proLi[0][pk].lab_test_code +"'>  "
								+ pobj1.proLi[0][pk].proNm + "   ";	//jitendra @data-value attribute set to div  12 Aug 2019
						
						if (pobj1.proLi[0][pk].refdocname != "-"
								&& pobj1.proLi[0][pk].refdocname != null
								&& pobj1.proLi[0][pk].refdocname != "") {
							html = html
									+ "[ "
									+ (pobj1.proLi[0][pk].refdocname)
											.toUpperCase() + " ]";
						}

						if (pobj1.proLi[0][pk].pkgNm != "-"
								&& pobj1.proLi[0][pk].pkgNm != null
								&& pobj1.proLi[0][pk].pkgNm != "") {
							html = html + " - (" + pobj1.proLi[0][pk].pkgNm
									+ ")</div>";
						} else {
							html = html + "</div>";
						}
						html = html + "<input type='hidden' value='p' id='type"
								+ (testcount1) + "' />";
						html = html + "</div>";

						// {#foreach $T.proLi.testli as testli}

						for ( var ts = 0; ts < pobj1.proLi[0][pk].testli.length; ts++) {

							if (pobj1.proLi[0][pk].testli[ts].tid != 0) {
								
								html = html + "<div class='col-md-12-1'";
								html = html + "style='margin-top: -11px;'";
								html = html + "id='testDiv"
										+ (pobj1.proLi[0][pk].testli[ts].tid)
										+ "'>";
								html = html + "<div class='divide-20'></div>";
								html = html
										+ "<input type='hidden' value='pt' id='type"
										+ (procount1) + "' />";
								html = html + "<div class='col-md-2-1'";
								html = html
										+ "style='height: 28px; padding-left: 1%; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'></div>";
								html = html + "<div class='col-md-4-1'";
								html = html
										+ "style='height: 28px; padding-left: 2%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'";
								html = html + "id='testNM" + (procount1)
										+ (protestcount1) + "'>"
										+ (pobj1.proLi[0][pk].testli[ts].tnm);
								html = html + "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].testli[ts].tnm)
										+ "' id='nameOfTest" + (count1)
										+ "' />";
								html = html
										+ "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].testli[ts].objLbForm.extstid)
										+ "' id='formulaForTest" + count1
										+ "' />";
								html = html + "</div>";

								if (pobj1.proLi[0][pk].testli[ts].tstRe == undefined) {
									pobj1.proLi[0][pk].testli[ts].tstRe = "";
								}
								var rowNum = count1;

								// Added by Laxman on 01-Feb-2018.
								html = html + "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].serviceid)
										+ "' id='serviceId" + (count1) + "' />";
								html = html + "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].subserviceid)
										+ "' id='subserviceId" + (count1)
										+ "' />";
								html = html + "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].labreqid)
										+ "' id='labreqId" + (count1) + "' />";
								html = html + "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].labreqslvid)
										+ "' id='labreqslvId" + (count1)
										+ "' />";
								html = html
										+ "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].testli[ts].ndgnrl)
										+ "' id='narrationId" + (count1)
										+ "' />";
								html = html
										+ "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].testli[ts].idTstRe)
										+ "' id='idResultTest" + (count1)
										+ "' />";
								html = html + "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].testli[ts].tid)
										+ "' id='idOfTest" + (count1) + "' />";
								html = html + "<input type='hidden' value='"
										+ (pobj1.proLi[0][pk].testli[ts].vt)
										+ "' id='isTemplate" + (count1)
										+ "' />";

								if (pobj1.proLi[0][pk].testli[ts].vt == "t") {// for
									// template

									html = html + "<div class='col-md-2-1'";
									html = html
											+ "style='height: 28px; border-bottom: 1px solid #ddd; text-align: left; padding-left: 1%; padding-right: 1%; border-right: 1px solid #ddd; padding-top: 2px;'";
									html = html + "id='testRE" + (procount1)
											+ (protestcount1) + "'>";
									html = html
											+ "<input type='hidden' value='"
											+ (pobj1.proLi[0][pk].testli[ts].idTstRe)
											+ "' id='idTempResultTest"
											+ (count1) + "' />";
									html = html
											+ "<input type='hidden' value='"
											+ (pobj1.proLi[0][pk].testli[ts].tid)
											+ "' id='idOfTempTest" + (count1)
											+ "' />";

									html = html
											+ "<input	type='button' value='"
											+ (pobj1.proLi[0][pk].testli[ts].tnm)
											+ "' id='tempTestValue"
											+ count1
											+ "' onClick=viewTemplateForLabTest("
											+ count1
											+ "); maxlength='12' style='width: 100%;' /></div>";
									// $("#iTestTemplateName").val(pobj1.proLi[0][pk].testli[ts].tnm);
									$("#iImpression")
											.val(
													pobj1.proLi[0][pk].testli[ts].impressions);
									CKEDITOR.instances['iEditorTestTemplate']
											.setData((pobj1.proLi[0][pk].testli[ts].testTemplate));

									$("#idlabtest").val(
											pobj1.proLi[0][pk].testli[ts].tid);
									$("#hTestTemplateName").val(
											pobj1.proLi[0][pk].testli[ts].tnm);
									$("#hTestTemplate")
											.val(
													pobj1.proLi[0][pk].testli[ts].testTemplate);
									$("#hImpression")
											.val(
													pobj1.proLi[0][pk].testli[ts].impressions);
									$("#hID").val(count1);
									count1++;
								} else {

									html = html + "<div class='col-md-2-1'";
									html = html
											+ "style='height: 28px; border-bottom: 1px solid #ddd; text-align: left; padding-left: 1%; padding-right: 1%; border-right: 1px solid #ddd; padding-top: 2px;'";
									html = html + "id='testRE" + (procount1)
											+ (protestcount1) + "'>";

									html = html
											+ "<input	type='text' value='"
											+ (pobj1.proLi[0][pk].testli[ts].tstRe)
											+ "' onfocus='setFormulaToTestResult("
											+ count1
											+ ")' id='testvalue"
											+ (count1++)
											+ "' maxlength='100' style='width: 100%;'/></div>";

								}
								html = html + "<div class='col-md-2-1'";
								html = html
										+ "style='height: 28px; border-bottom: 1px solid #ddd; padding-left: 1%; border-right: 1px solid #ddd; padding-top: 2px;text-align: center;'";
								html = html + "id='testNR" + (procount1)
										+ (protestcount1) + "'>";

								if (pobj1.proLi[0][pk].testli[ts].vt == "g") {
									html = html
											+ (pobj1.proLi[0][pk].testli[ts].tnvli[0].nvlv);
								}

								if (pobj1.proLi[0][pk].testli[ts].vt == "i") {

									/**
									 * ************lab*newindividual***@author:paras*
									 * for profile****************
									 */

									if (pobj1.proLi[0][pk].testli[ts].tnvli.length > 4) {

										if (pobj1.proLi[0][pk].testli[ts].tnvli[4].oldandnew == 1) // for
										// new
										// records
										// age
										// vise.
										{

											var a = pobj1.proLi[0][pk].testli[ts].tnvli[4].oldandnew;
											// alert(a);
											var k = pobj1.proLi[0][pk].testli[ts].tnvli[4].male;
											// alert(k);
											html = html
													+ (pobj1.proLi[0][pk].testli[ts].tnvli[4].nvlv)
													+ " - "
													+ (pobj1.proLi[0][pk].testli[ts].tnvli[4].nvuv)
													+ (pobj1.proLi[0][pk].testli[ts].tnvli[4].unitnm);

										} else {
											if (valTypeNR != "") {
												// {#foreach $T.testli.tnvli as
												// tnvli}
												for ( var j = 0; j < pobj1.proLi[0][pk].testli[ts].tnvli.length; j++) {
													if (valTypeNR == pobj1.proLi[0][pk].testli[ts].tnvli[j].nvsx) {
														html = html
																+ (pobj1.proLi[0][pk].testli[ts].tnvli[j].nvlv)
																+ " - "
																+ (pobj1.proLi[0][pk].testli[ts].tnvli[j].nvuv)
																+ (pobj1.proLi[0][pk].testli[ts].tnvli[j].unitnm);
													}
												}
											}
										}
									} else { // for old records age vise.

										if (valTypeNR != "") {
											for ( var j = 0; j < pobj1.proLi[0][pk].testli[ts].tnvli.length; j++) {
												if (valTypeNR == pobj1.proLi[0][pk].testli[ts].tnvli[j].nvsx) {
													html = html
															+ (pobj1.proLi[0][pk].testli[ts].tnvli[j].nvlv)
															+ " - "
															+ (pobj1.proLi[0][pk].testli[ts].tnvli[j].nvuv)
															+ (pobj1.proLi[0][pk].testli[ts].tnvli[j].unitnm);
												}
											}
										}
									}
								}
								/**
								 * ****end********lab*newindividual***@author:paras*
								 * for profile****************
								 */
								html = html + "</div>";

								html = html + "<div id='testMethod"
										+ (procount1) + (protestcount1)
										+ "' class='col-md-2-1'";
								html = html
										+ "style='height: 28px; border-bottom: 1px solid #ddd; padding-top: 2px;' title='"
										+ pobj1.proLi[0][pk].testli[ts].tmethd
										+ "'>";
								if (pobj1.proLi[0][pk].testli[ts].tmethd.length > 25) {
									html = html
											+ (pobj1.proLi[0][pk].testli[ts].tmethd
													.substring(0, 25)) + "...";
								} else {
									html = html
											+ (pobj1.proLi[0][pk].testli[ts].tmethd);
								}
								// Added by Laxman on for edit btnClass
								// narration 07-Feb-2018.
								var btnClass = "btn-success";

								if (pobj1.proLi[0][pk].testli[ts].ndgnrl != undefined
										&& pobj1.proLi[0][pk].testli[ts].ndgnrl != ""
										&& pobj1.proLi[0][pk].testli[ts].ndgnrl != "undefined"
										&& pobj1.proLi[0][pk].testli[ts].ndgnrl != "-") {
									btnClass = "btn-danger";
								}
								// for popup to type value
								html = html
										+ "<button id='btnInsert"
										+ (pobj1.proLi[0][pk].testli[ts].tid)
										+ (rowNum)
										+ "' class='btn btn-xs "
										+ btnClass
										+ "' value='' name='btnInsert' onclick='openEditorForResult("
										+ (pobj1.proLi[0][pk].testli[ts].idTstRe)
										+ ","
										+ (pobj1.proLi[0][pk].testli[ts].tid)
										+ ","
										+ (rowNum)
										+ ",\"prots\")' title='Type Result'  style='float:right'>";
								if (callfrom == "OpdDoctorDesk2"
										|| callfrom == "OTAnaestheticAssess") {
									html = html
											+ "<i class='fa fa-eye View'></i> </button>";
								} else {
									html = html
											+ "<i class='fa fa-edit'></i> </button>";
								}
								// comment teporary for template print.
								// alert("------"+pobj1.proLi[0][pk].testli[ts].vt);
								// alert("------"+pobj1.proLi[0][pk].tstSts);

								if (pobj1.proLi[0][pk].testli[ts].vt == "t"
										&& (pobj1.proLi[0][pk].tstSts == "A" || pobj1.proLi[0][pk].tstSts == "P")) {
									html = html
											+ "<button id='btnPrint"
											+ (pobj1.proLi[0][pk].testli[ts].idTstRe)
											+ "' class='btn btn-xs btn-warning' value='' name='btnPrint' onclick='printTestTemplateData("
											+ pobj1.proLi[0][pk].testli[ts].idTstRe
											+ ")' title='Print Template'  style='float:right'><i class='fa fa-print'></i></button>";
								}
								// for popup to type value
								html = html + "</div>";

								html = html + "</div>";

								html = html + "<input type='hidden' value='"
										+ (protestcount1++) + "' />";

							}/*
								 * else{ html = html+"<div class='col-md-12-1'
								 * style='margin-top: -11px;'>"; html = html+"<div
								 * class='divide-20'></div>"; html = html +"<input
								 * type='hidden' value='' id='' />"; html = html +"<div
								 * class='col-md-2-1' style='height: 28px;
								 * padding-left: 1%; border-right: 1px solid
								 * #ddd; padding-top: 2px; text-align: left;'>";
								 * html = html +"</div>"; html = html +"<div
								 * class='col-md-4-1' style='height: 28px;
								 * padding-left: 2%; border-top: 1px solid #ddd;
								 * border-right: 1px solid #ddd; padding-top:
								 * 2px; text-"; html = html +"align: left;'
								 * id=''>"+(pobj1.proLi[0][pk].testli[ts].tnm);
								 * html = html+"</div>";
								 * 
								 * html=html+"<div class='col-md-2-1'
								 * style='height: 28px;border-top: 1px solid
								 * #ddd; padding-left: 1%; border-right: 1px
								 * solid #ddd; padding-top: 2px;'> ";
								 * html=html+"</div>";
								 * 
								 * html = html+"<div class='col-md-2-1'
								 * style='height: 28px; padding-left: 1%;
								 * border-right: 1px solid #ddd; border-top: 1px
								 * solid #ddd; padding-top: 2px;'> "; html =
								 * html+"</div>";
								 * 
								 * html = hmlt+"<div id='' class='col-md-2-1'
								 * style='height: 28px; text-align:
								 * center;border-top: 1px solid #ddd;
								 * padding-top: 2px;'> ";
								 * 
								 * html = hmlt+"</div>"; //html =
								 * html+(pobj1.proLi[0][pk].testli[ts].tnm);
								 * html = html+"</div>"; }
								 */

						}

						html = html + "<input type='hidden' value='"
								+ (protestcount1++)
								+ "' id='reportproTestCount" + (procount1)
								+ "' />";
						html = html + "<input type='hidden' value='"
								+ (procount1++) + "' />";

					}
					html = html + "<input type='hidden' value='" + (procount1)
							+ "' id='reportproCount' />";

					// 3rd list @ first position
					for ( var pk = 0; pk < pobj1.proLi[1].length; pk++) {

						html = html + "<div class='col-md-12-1'";
						html = html + "style='margin-top: -11px;'";
						html = html + "id='testDiv" + (pobj1.proLi[1][pk].tid)
								+ "'>";
						html = html + "<div class='divide-20'></div>";
						html = html + "<input type='hidden' value='t' id='type"
								+ (testcount1) + "' />";

						html = html + "<div class='col-md-1-1'";
						html = html
								+ "style='height: 28px; padding-left: 1%;border-top: 1px solid #ddd;  border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>"
								+ (sr1++) + "</div>";

						html = html + "<div class='col-md-5-1'";
						html = html
								+ "style='height: 28px; padding-left: 1%;border-top: 1px solid #ddd;  border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'";
						html = html + "id='testNM" + (count1) + "'>"
								+ (pobj1.proLi[1][pk].tnm);
						html = html + "<input type='hidden' value='"
								+ (pobj1.proLi[1][pk].tnm) + "' id='nameOfTest"
								+ (count1) + "' />";
						html = html + "<input type='hidden' value='"
								+ (pobj1.proLi[1][pk].objLbForm.extstid)
								+ "' id='formulaForTest" + count1 + "' />";
						html = html + "</div>";

						if (pobj1.proLi[1][pk].tstRe == undefined) {
							pobj1.proLi[1][pk].tstRe = "";
						}
						var rowNum = count1;
						html = html + "<div class='col-md-2-1'";
						html = html
								+ "style='height: 28px; text-align: left; padding-left: 1%; padding-right:1%; border-top: 1px solid #ddd;  border-right: 1px solid #ddd; padding-top: 2px;'";
						html = html + "id='testRE" + (count1) + "'>";
						html = html + "<input type='hidden' value='"
								+ (pobj1.proLi[1][pk].idTstRe)
								+ "' id='idResultTest" + (count1) + "' />";
						html = html + "<input type='hidden' value='"
								+ (pobj1.proLi[1][pk].tid) + "' id='idOfTest"
								+ (count1) + "' />";

						/*
						 * if(pobj1.proLi[1][pk].vt == "g"){
						 * 
						 * 
						 * html = html+"<input type='text' value='-'
						 * id='testvalue"+(count1++)+"' maxlength='12'
						 * style='width: 100%;' /></div>"; }else{
						 */

						html = html
								+ "<input	type='text' value='"
								+ (pobj1.proLi[1][pk].tstRe)
								+ "' onfocus='setFormulaToTestResult("
								+ count1
								+ ")' id='testvalue"
								+ (count1++)
								+ "' maxlength='100' style='width: 100%;'/></div>";

						// }

						html = html + "<div class='col-md-2-1'";
						html = html
								+ "style='height: 28px; padding-left: 1%;border-top: 1px solid #ddd;  border-right: 1px solid #ddd; padding-top: 2px;text-align: center;'";
						html = html + "id='testNR" + (count1) + "'>";

						if (pobj1.proLi[1][pk].vt == "g") {
							// {$T.testli.tnvli[0].nvlv}
							html = html + (pobj1.proLi[1][pk].tnvli[0].nvlv);
						}

						if (pobj1.proLi[1][pk].vt == "i") {

							/**
							 * ************lab*newindividual***@author:paras*
							 * for test****************
							 */
							if (pobj1.proLi[1][pk].tnvli.length > 4) {

								if (pobj1.proLi[1][pk].tnvli[4].oldandnew == 1) // for
								// new
								// records
								// age
								// vise.
								{

									var a = pobj1.proLi[1][pk].tnvli[4].oldandnew;
									// alert(a);
									var k = pobj1.proLi[1][pk].tnvli[4].male;
									// alert(k);
									html = html
											+ (pobj1.proLi[1][pk].tnvli[4].nvlv)
											+ " - "
											+ (pobj1.proLi[1][pk].tnvli[4].nvuv)
											+ (pobj1.proLi[1][pk].tnvli[4].unitnm);

								} else {
									if (valTypeNR != "") {
										// {#foreach $T.testli.tnvli as tnvli}
										for ( var i = 0; i < pobj1.proLi[1][pk].tnvli.length; i++) {
											// $T.tnvli.nvsx
											if (valTypeNR == pobj1.proLi[1][pk].tnvli[i].nvsx) {
												// {$T.tnvli.nvlv} -
												// {$T.tnvli.nvuv}{$T.tnvli.unitnm}
												html = html
														+ (pobj1.proLi[1][pk].tnvli[i].nvlv)
														+ " - "
														+ (pobj1.proLi[1][pk].tnvli[i].nvuv)
														+ (pobj1.proLi[1][pk].tnvli[i].unitnm);
											}
										}
									}
								}
							} else {

								if (valTypeNR != "") { // for old records
									// gender vise.
									// {#foreach $T.testli.tnvli as tnvli}
									for ( var i = 0; i < pobj1.proLi[1][pk].tnvli.length; i++) {
										// $T.tnvli.nvsx
										if (valTypeNR == pobj1.proLi[1][pk].tnvli[i].nvsx) {
											// {$T.tnvli.nvlv} -
											// {$T.tnvli.nvuv}{$T.tnvli.unitnm}
											html = html
													+ (pobj1.proLi[1][pk].tnvli[i].nvlv)
													+ " - "
													+ (pobj1.proLi[1][pk].tnvli[i].nvuv)
													+ (pobj1.proLi[1][pk].tnvli[i].unitnm);
										}
									}
								}

							}

						}

						/** ********end************************* */
						html = html + "</div>";

						html = html
								+ "<div id='testMethod{count}' class='col-md-2-1'";
						html = html
								+ "style='height: 28px; border-top: 1px solid #ddd;  text-align: left; padding-top: 2px;'>";
						html = html + (pobj1.proLi[1][pk].tmethd);

						// var tst ="ts";

						// if(pobj1.proLi[1][pk].vt == "g"){

						html = html
								+ "<button id='btnInsert"
								+ (pobj1.proLi[1][pk].tid)
								+ (rowNum)
								+ "' class='btn btn-xs btn-success' value='' name='btnInsert' onclick='openEditorForResult("
								+ (pobj1.proLi[1][pk].idTstRe)
								+ ","
								+ (pobj1.proLi[1][pk].tid)
								+ ","
								+ (rowNum)
								+ ",\"ts\")' title='Type Result'  style='float:right'>";
						if (callfrom == "OpdDoctorDesk2"
								|| callfrom == "OTAnaestheticAssess") {
							html = html
									+ "<i class='fa fa-eye View'></i> </button>";
						} else {
							html = html
									+ "<i class='fa fa-edit'></i> </button>";
						}
						// }

						html = html + "</div>";

						html = html + "<div id='testNote" + (count1)
								+ "' style='display: none;'>"
								+ (pobj1.proLi[1][pk].tnote) + "</div>";
						html = html + "<div id='testClinicaluse" + (count1)
								+ "' style='display: none;'>"
								+ (pobj1.proLi[1][pk].tcliuse) + "</div>";
						html = html + "<div id='testIncreasedlevel" + (count1)
								+ "' style='display: none;'>";
						html = html + (pobj1.proLi[1][pk].tinrl) + "</div>";
						html = html + "<div id='testInterpretation" + (count1)
								+ "' style='display: none;'>"
								+ (pobj1.proLi[1][pk].tinter);
						html = html + "</div>";
						html = html + "<div id='testComments" + (count1++)
								+ "' style='display: none;'>"
								+ (pobj1.proLi[1][pk].tcommnt);
						html = html + "</div>";

						html = html + "</div>";

					}
					html = html + "<input type='hidden' value='" + (--count1)
							+ "' id='reportTestCount' />";

					// @codeModifyBy : Kavita @codeDate : 3-Feb-2017
					if (callfrom == "OpdDoctorDesk2"
							|| callfrom == "OTAnaestheticAssess") {
						$("#testDivLab").html(html);
					} else {
						$("#dynamicProAndTestTemp").html(html);
						$("#testDiv").html(html);
					}

				}
			});
}
// Added by Laxman on 02-Feb-2018.
function setRefDocNmTemp(refDocName) {
	var docnmlist = refDocName.split(",");
	var htm = "";
	if (refDocName != "") {
		if (docnmlist.length > 1) {
			htm = htm
					+ '<button style="font-size:11px;" onclick="showDoctors();">'
					+ ' Show Refer / Consulting Doctors <i style="font-size:15px;color:SteelBlue ;" id="shBillView" class="fa fa-chevron-circle-down" >'
					+ '</i></button> '
					+ '<div id="temp" class="box border" style="width:91%;height:50px;display:none;overflow-y: scroll;padding:5px;"> '
					+ ' <table > ' + '<tr> '
					+ '<th width="505Px"> Doctor Name  </th> ' + '</tr>';
			for ( var g = 0; g < docnmlist.length; g++) {
				htm = htm + '<tr><td>' + docnmlist[g] + '</td></tr> ';
			}
			htm = htm + '</table></div> ';
			$("#refDrname").html(htm);
		} else {
			htm = htm + '<input type="text" id="doctorName"'
					+ 'class="form-control input-SmallText" value="'
					+ docnmlist[0] + '" readonly="readonly"/>';
			$("#refDrname").html(htm);
		}

	} else {
		htm = htm + '<input type="text" id="doctorName"'
				+ 'class="form-control input-SmallText" readonly="readonly"/>';
		$("#refDrname").html(htm);
	}
}
// Added by Laxman on 02-Feb-2018.
function showDoctors() {
	// $("#"+count).toggle("toggle");

	$("#temp").toggle('toggle');
	var curClass = $("#shBillView").attr('class');

	if (curClass == "fa fa-chevron-circle-up") {

		$("#shBillView").removeClass('fa fa-chevron-circle-up');
		$("#shBillView").addClass('fa fa-chevron-circle-down');
		// $("#billText").text('Show Bill View');

	} else {

		$("#shBillView").removeClass('fa fa-chevron-circle-down');
		$("#shBillView").addClass('fa fa-chevron-circle-up');
		// $("#billText").text('Show Receipt View');
	}
}

// Modify by Laxman on 29-Jan-2018.
function setTestForResult() {
	count = 1;
	var address = "";
	
	// var Technician = $("#user").val();
	var patientTest = $("#patientdetails").html();
	// alert("patientTest :"+patientTest);

	var patData = eval('(' + patientTest + ')');
	//alert(patData.listRegTreBillDto[0].patientName);
	setTimeout(function() {
		var pName = patData.listRegTreBillDto[0].patientName.split(" ")[1]
				+ " " + patData.listRegTreBillDto[0].patientName.split(" ")[2]
				+ " " + patData.listRegTreBillDto[0].patientName.split(" ")[3];
		var initial = patData.listRegTreBillDto[0].patientName.split(" ")[0];
		//$("#pName").val(pName);
		$("#pName").val(patData.listRegTreBillDto[0].patientName); //aniket/7/1/2020/lnt_nagar
		$("#initial").val(initial);
		$("#sex").val(patData.listRegTreBillDto[0].gender);
		var ptage = "";
		var age = patData.listRegTreBillDto[0].age;

		if ((age.split("/")[0]) == "0Y") {
			if ((age.split("/")[1]) == "0M") {
				ptage = (age.split("/")[2]);
			} else {
				if ((age.split("/")[2]) == "0D") {
					ptage = (age.split("/")[1]);
				} else {
					ptage = (age.split("/")[1]) + "/" + (age.split("/")[2]);
				}
			}
		} else {

			if ((age.split("/")[1]) == "0M") {
				if ((age.split("/")[2]) == "0D") {
					ptage = age.split("/")[0];
				} else {
					ptage = age.split("/")[0] + "/" + age.split("/")[2];
				}
			} else {
				if ((age.split("/")[2]) == "0D") {
					ptage = age.split("/")[0] + "/" + age.split("/")[1];
				} else {
					ptage = age;
				}
			}

		}

		$("#age").val(ptage);
		$("#pathospType").val(patData.listRegTreBillDto[0].departmentId);
		$("#address").val(patData.listRegTreBillDto[0].address);
		var refDocName = $("#refDocName").html();

		/*
		 * //Added by Laxman on 02-Feb-2018.set Template for multiple consultant
		 * Doctor name. setRefDocNmTemp(refDocName);
		 */
		/*
		 * if (patientdetails.tmpty == 0) {
		 * 
		 * if (patientdetails.trPtTyp == "opd") { $("#pathospType").val(1); }
		 * else if (patientdetails.trPtTyp == "ipd") { $("#pathospType").val(2); }
		 * else { $("#pathospType").val(3); } } else {
		 * $("#pathospType").val(patientdetails.tmpty); }
		 * 
		 * 
		 * if (patientdetails.trPtTyp != "" && patientdetails.trPtTyp !=
		 * undefined) {
		 * 
		 * if (patientdetails.trPtTyp == "opd") { $("#pathospType").val(1); }
		 * else if (patientdetails.trPtTyp == "ipd") { $("#pathospType").val(2); }
		 * else { $("#pathospType").val(3); } //making field read only
		 * $('#pathospType').attr("disabled", true); }
		 */
		$('#pName').attr("disabled", true);
		$('#initial').attr("disabled", true);
		$('#sex').attr("disabled", true);
		$('#age').attr("disabled", true);
		$('#ageType').attr("disabled", true);
		$('#pathospType').attr("disabled", true);
		$('#address').attr("disabled", true);
		$("#doctorName").attr("disabled", true);
		// $("#doctor").val(patientdetails.objp.docID);
		/*
		 * var a1 = patientdetails.objp.a1; var a2 = patientdetails.objp.a2; var
		 * town = patientdetails.objp.town; var taluka =
		 * patientdetails.objp.taluka; var district =
		 * patientdetails.objp.district;
		 * 
		 * if(town == undefined){ town = 0; } if(taluka == undefined){ taluka =
		 * 0; } if(district == undefined){ district = 0; }
		 * 
		 * if (a1 != "") { address = a1 + ","; } if (a2 != "") { address =
		 * address + a2 + ","; } if ( town != 0 ) { address = address + town +
		 * ","; } if (taluka != 0) { address = address + taluka + ","; } if
		 * (district != 0) { address = address + district + "."; }
		 * $("#address").val(address); $("#sex").val(patientdetails.objp.psx);
		 */

	}, 200);

}
// Added by Laxman on 05-feb-2018.
function fetchonloadTestResult() {

	var labReqMstId = $("#testmasterId").html();

	var inputs = [];
	inputs.push('labReqMstId=' + labReqMstId);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/lab/fetchonloadTestResult",
				error : function() {
					alert('Network Issue!!!');
				},

				success : function(r) {
					// alert("=="+JSON.stringify(r));

					if (r.listLabRequest[0].testStatus == "U") {// Unthorised
						$("#saveBtn").hide();
						$("#phfBtn").hide();
						$("#prtBtn").hide();
						$("#phHos").hide();
						$("#vrtBtn").show();
						$("#hldBtn").show();
						$("#reclBtn").show();
						$("#postBtn").hide();
						$("#revcBtn").show();
						$("#svBtn").hide();

					} else if (r.listLabRequest[0].testStatus == "A") { // athorised
						$("#saveBtn").hide();
						$("#phfBtn").show();
						$("#prtBtn").show();
						$("#phHos").hide();
						$("#vrtBtn").hide();
						$("#hldBtn").hide();
						$("#reclBtn").hide();
						$("#postBtn").show();
						$("#revcBtn").show();
						$("#svBtn").hide();

					} else if (r.listLabRequest[0].testStatus == "R") { // Recall
						$("#saveBtn").hide();
						$("#phfBtn").hide();
						$("#prtBtn").hide();
						$("#phHos").hide();
						$("#vrtBtn").show();
						$("#hldBtn").show();
						$("#reclBtn").hide();
						$("#postBtn").hide();
						$("#revcBtn").show();
						$("#svBtn").hide();

					} else if (r.listLabRequest[0].testStatus == "H") { // Hold
						$("#saveBtn").hide();
						$("#phfBtn").hide();
						$("#prtBtn").hide();
						$("#phHos").hide();
						$("#vrtBtn").show();
						$("#hldBtn").hide();
						$("#reclBtn").show();
						$("#postBtn").hide();
						$("#revcBtn").show();
						$("#svBtn").hide();

					} else if (r.listLabRequest[0].testStatus == "C") { // Current
						$("#saveBtn").show();
						$("#phfBtn").hide();
						$("#prtBtn").hide();
						$("#phHos").hide();
						$("#vrtBtn").hide();
						$("#hldBtn").show();
						$("#reclBtn").show();
						$("#postBtn").hide();
						$("#revcBtn").hide();
						$("#svBtn").show();
					} else if (r.listLabRequest[0].testStatus == "P") { // Privious
						$("#saveBtn").hide();
						$("#phfBtn").show();
						$("#prtBtn").show();
						$("#phHos").hide();
						$("#vrtBtn").hide();
						$("#hldBtn").hide();
						$("#reclBtn").hide();
						$("#postBtn").hide();
						$("#revcBtn").hide();
						$("#svBtn").hide();
					}

					if (r.listLabRequest[0].pathologistId != ""
							&& r.listLabRequest[0].pathologistId != null) {
						$("#IdPathologist").val(
								r.listLabRequest[0].pathologistId);
					}

					// for DocName Not Repeat.
					var DocNameList = (r.labResultMstViewDto[0].refDocName)
							.split(',').filter(function(item, i, allItems) {
								return i == allItems.indexOf(item);
							}).join(',');

					// set templet for refDocNames.
					setRefDocNmTemp(DocNameList);

					var currentdate = new Date();
					var date = currentdate.getDate() + "/"
							+ (currentdate.getMonth() + 1) + "/"
							+ currentdate.getFullYear();

					var cmptime = currentdate.getHours() + ":"
							+ currentdate.getMinutes();

					// alert("cmptime::"+cmptime);
					var time = 0;

					if (cmptime >= 13) {

						var hh = currentdate.getHours() - 12;
						hh = JSON.stringify(hh);
						if (hh.length == 1) {

							hh = "0" + hh;
						}

						var mm = currentdate.getMinutes();

						mm = JSON.stringify(mm);

						if (mm.length == 1) {

							mm = "0" + mm;
						}

						time = hh + ":" + mm + " pm";
					} else if (cmptime > 12 && cmptime < 13) {

						var hh = currentdate.getHours();
						hh = JSON.stringify(hh);
						if (hh.length == 1) {

							hh = "0" + hh;
						}

						var mm = currentdate.getMinutes();

						mm = JSON.stringify(mm);

						if (mm.length == 1) {

							mm = "0" + mm;
						}

						time = hh + ":" + mm + " pm";
					} else {

						time = currentdate.getHours() + ":"
								+ currentdate.getMinutes() + " am";

					}
					if (r.listLabRequest[0].smplColletDatetime != ""
							&& r.listLabRequest[0].smplColletDatetime != undefined
							&& r.listLabRequest[0].smplColletDatetime != null) {
						var smplCollDate = new Date(
								r.listLabRequest[0].smplColletDatetime)
								.toLocaleString();
						smplCollDate = smplCollDate.split(",")[0];
						var smplCollTime = new Date(
								r.listLabRequest[0].smplColletDatetime);
						smplCollTime = smplCollTime.getHours() + ":"
								+ smplCollTime.getMinutes();
						$("#collectionTime").val(smplCollTime);
						$("#collectionDate").val(smplCollDate);
					} else {
						$("#collectionDate").val(date);
						// $("#collectionTime").val(cmptime);
					}

					var someDate = new Date();

					someDate.setDate(someDate.getDate() + 1);

					var dd = someDate.getDate();
					var mm = someDate.getMonth() + 1;
					var y = someDate.getFullYear();

					// var someFormattedDate = y + '-' + mm + '-' + dd;
					// alert(patientdetails.tmdd);

					if (r.listLabRequest[0].reportDueDatetime != ""
							&& r.listLabRequest[0].reportDueDatetime != undefined
							&& r.listLabRequest[0].reportDueDatetime != null) {
						var reprtDueDate = new Date(
								r.listLabRequest[0].reportDueDatetime)
								.toLocaleString();
						reprtDueDate = reprtDueDate.split(",")[0];
						var reprtDueTime = new Date(
								r.listLabRequest[0].reportDueDatetime);
						reprtDueTime = reprtDueTime.getHours() + ":"
								+ reprtDueTime.getMinutes();
						$("#reportDueTime").val(reprtDueTime);
						$("#reportdueDate").val(reprtDueDate);
					}/*
						 * else{ $("#reportdueDate").val(date); }
						 */

					if (r.listLabRequest[0].advice != ""
							&& r.listLabRequest[0].advice != "-") {
						$("#txtReportNote").val(r.listLabRequest[0].advice);
					} else {
						$("#txtReportNote").val("");
					}

					if (r.listLabRequest[0].smplAccptDatetime != ""
							&& r.listLabRequest[0].smplAccptDatetime != undefined
							&& r.listLabRequest[0].smplAccptDatetime != null) {
						var smplAccptDate = new Date(
								r.listLabRequest[0].smplAccptDatetime)
								.toLocaleString();
						smplAccptDate = smplAccptDate.split(",")[0];
						var smplAccptTime = new Date(
								r.listLabRequest[0].smplAccptDatetime);
						smplAccptTime = smplAccptTime.getHours() + ":"
								+ smplAccptTime.getMinutes();
						$("#collTimeOut").val(smplAccptTime);
						$("#collectionOutDate").val(smplAccptDate);
					} else {
						$("#collectionOutDate").val(date);
						// $("#collTimeOut").val(cmptime);//insted of time we
						// are cmptime
					}
					// hideShowOutSrcDiv();
					// $("#collcenter").val(patientdetails.cid);
					// }
				}
			});

}

function savePatientTestsResult() {

	var patientTest = $("#patientdetails").html();
	var patientdetails = eval('(' + patientTest + ')');

	var patId = patientdetails.pid;
	var testMasterId = $("#testmasterId").html();

	var initial = $.trim($("#initial").val());
	var pName = $.trim($("#pName").val());
	var sex = $.trim($("#sex").val());
	var doctor = $.trim($("#doctor").val());
	// alert("doctor..."+doctor);
	var address = $.trim($("#address").val());
	var age = $.trim($("#age").val());
	var ageType = $.trim($("#ageType").val());
	var pathologist = $("#IdPathologist").val();

	var emergency = 0;

	var $radios = $('input:checkbox[id=emergency]');
	if ($radios.is(':checked') == true) {
		emergency = 1;
	}

	var technician = $.trim($("#technician").val());
	// alert("technician..."+technician);

	var collectionDate = $.trim($("#collectionDate").val());
	var collectionTime = $.trim($("#collectionTime").val());
	var reportdueDate = $.trim($("#reportdueDate").val());
	var reportDueTime = $.trim($("#reportDueTime").val());

	var collDateOut = $.trim($("#collectionOutDate").val());
	var collTimeOut = $.trim($("#collTimeOut").val());

	var ptype = $.trim($("#pathospType :selected").val());
	var collcenter = $.trim($("#collcenter :selected").val());
	var txtReportNote = $.trim($("#txtReportNote").val());
	var chkOutSrc = 0;

	var $radios = $('input:checkbox[id=chkOutSrc]');
	if ($radios.is(':checked') == true) {
		chkOutSrc = 1;
	}

	if (pName == "") {
		alert("Please Enter Patient Name!");
		SetFocus("pName");
		return false;
	} else if (ptype == "select") {
		alert("Please Select Patient Type!");
		SetFocus("pathospType");
		return false;
	} else if (age == "") {
		alert("Please Enter Age Of Patient!");
		SetFocus("age");
		return false;
	} else if (collectionDate == "") {
		alert("Please Select Collection Date!");
		SetFocus("collectionDate");
		return false;
	} else if (collectionTime == "") {
		alert("Please Select Collection Time!");
		SetFocus("collectionTime");
		return false;
	} else if (pathologist == "0") {
		alert("Please Select pathologist");
		SetFocus("IdPathologist");
		return false;
	} else if (reportdueDate == "") {
		alert("Please Select Report Due Date!");
		SetFocus("reportdueDate");
		return false;
	} else if (reportDueTime == "") {
		alert("Please Select Select Report Due Time!");
		SetFocus("reportDueTime");
		return false;
	} else if (chkOutSrc == 1) {
		if (collectionDate == "") {
			alert("Please Select Collection Date!");
			SetFocus("collectionDate");
			return false;
		} else if (collectionTime == "") {
			alert("Please Select Collection Time!");
			SetFocus("collectionTime");
			return false;
		}
	}

	var reportTestCount = $("#reportTestCount").val();

	var resultSet = '';

	for ( var k = 1; k <= reportTestCount; k++) {

		/*
		 * resultSet = resultSet + $("#idResultTest" + k).val() + "@@@" +
		 * $("#testvalue" + k).val() + "~~~";
		 */

		var testval = $("#testvalue" + k).val();

		if (testval == "" || testval == undefined) {

			testval = "-";

			resultSet = resultSet + $("#idResultTest" + k).val() + "@@@"
					+ testval + "~~~";

		} else {

			resultSet = resultSet + $("#idResultTest" + k).val() + "@@@"
					+ $("#testvalue" + k).val() + "~~~";

		}

	}

	var inputs = [];
	inputs.push('action=savePatientTestsResult');
	inputs.push('resultSet=' + encodeURIComponent(resultSet));
	inputs.push('initial=' + initial);
	inputs.push('pName=' + encodeURIComponent(pName));
	inputs.push('sex=' + encodeURIComponent(sex));
	inputs.push('doctor=' + encodeURIComponent(doctor));
	inputs.push('address=' + encodeURIComponent(address));
	inputs.push('age=' + encodeURIComponent(age));
	inputs.push('ageType=' + ageType);
	inputs.push('emergency=' + emergency);
	inputs.push('pathologist=' + pathologist);
	inputs.push('technician=' + encodeURIComponent(technician));
	inputs.push('collectionDate=' + collectionDate);
	inputs.push('collectionTime=' + collectionTime);
	inputs.push('reportdueDate=' + reportdueDate);
	inputs.push('reportDueTime=' + reportDueTime);
	inputs.push('collDateOut=' + collDateOut);
	inputs.push('collTimeOut=' + collTimeOut);
	inputs.push('chkOutSrc=' + chkOutSrc);
	inputs.push('ptype=' + ptype);
	inputs.push('collcenter=' + collcenter);
	inputs.push('patId=' + patId);
	inputs.push('testMasterId=' + testMasterId);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	inputs.push('txtReportNote=' + txtReportNote);
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
			count = 1;
			alert(ajaxResponse);
			if (ajaxResponse == "Patient Test Result Save Successfully") {
				window.location = "labTestPatientDashboard.jsp";
			} else if (ajaxResponse == "Dublicate Data Cannot be saved") {
				window.location = "labTestPatientDashboard.jsp";
			}
		}
	});

}

function labTestBill(testmasterId) {

	// $("#testDetails").html(ajaxResponse);
	var patientTest = $("#pathologyAllPatInfo").html();

	var myArray = JSON.parse(patientTest);

	for ( var i = 0; i < myArray.trmli.length; i++) {
		if (myArray.trmli[i].tmid == testmasterId) {
			myObj = myArray.trmli[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	sBean = myObj;
	window.location.href = "labtestBill.jsp?testmasterId=" + testmasterId
			+ "&patientdetails=" + sBean.decodeSpecialChars();

}

function setPatientDetailsForBill() {
	count = 1;

	var patientTest = $("#patientdetails").html();
	var patientdetails = eval('(' + patientTest + ')');
	setTimeout(function() {
		$("#pName").html(patientdetails.objp.pini + patientdetails.objp.pnm);

		$("#refDoc").html(patientdetails.rfDocNm);
		$("#doctor").val(patientdetails.did);
		$("#sex").html(patientdetails.objp.psx);

		$("#age").html(
				patientdetails.objp.pag + " " + patientdetails.objp.pagty);
		$("#totalAmount").html(patientdetails.amt);

	}, 2000);

}

function getsearchPathologyTestDetails() {
	count = 1;

	var strValue = $("#strValue").val();
	strValue = $.trim(strValue);
	if (strValue == "") {
		alert("Please Enter Test Name For Search");
		SetFocus("strValue");
		return false;
	}
	var inputs = [];
	inputs.push('action=getsearchPathologyTestDetails');
	inputs.push("strValue=" + encodeURIComponent(strValue));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;

			pobj1 = eval('(' + ajaxResponse + ')');
			$("#testDetails").html(ajaxResponse);
			if (pobj1.lbHedLi.length > 0) {
				$("#testDiv").setTemplate(featchProAndTestTemp);
				$("#testDiv").processTemplate(pobj1);
			}
		}
	});
}

/* lab formula start */

function setFormilaSideInducator(indiVal) {
	$("#selIndi").val(indiVal);
}

function sendProToAsignfield(proId) {

	var $radios = $('input:checkbox[id=procheck' + proId + ']');
	if ($radios.is(':checked') == true) {

		$('#assignTestDiv').html("");

		var pro = '<div style="width: 100%;" id="proAssignDiv'
				+ proId
				+ '">	<div style="width: 100%; height: 28px; border-bottom: 1px solid #069;display: none;"	id="proIdDiv'
				+ proId
				+ '"><div	 class="col-md-2-1" style="height: 23px; text-align: center; border-right: 1px solid #069; border-left: 1px solid #069; padding-top: 10px;"><input name="Assignprocheck" type="checkbox" value="'
				+ proId
				+ '"	id="Assignprocheck" checked="checked"	onclick=sendProTestToRemove("'
				+ proId
				+ '-'
				+ '") /> </div>	<div	  class="col-md-10-1" style=" height: 23px; text-align: left; border-right: 1px solid #069; padding-top: 10px;"	id="ProCodNm'
				+ proId
				+ '">'
				+ $("#ProCodNm" + proId).html()
				+ '</div>	<div	style="width: 12%; height: 23px; padding-left: 1%; padding-top: 5px; text-align: left;"	id="AssProCodCharge'
				+ proId + '">' + $("#ProCodCharge" + proId).val()
				+ '</div></div>';
		var proTestLegth = $("#proTestCount" + proId).val();
		var testDiv = "";
		for ( var k = 1; k <= proTestLegth; k++) {

			var testId = parseInt($("#ProTestId-" + proId + "-" + k).val());
			var testNm = $("#proTestNm-" + testId + "-" + proId).html();
			var testName = testNm.split('-');
			var testCharges = $("#proTestCharge-" + testId + "-" + proId).val();
			// $("#proTestcheck-" + testId + "-" + proId).attr("checked", true);
			testDiv = testDiv
					+ '<div	style="width: 100%; height: 28px; border-bottom: 1px solid #069; float: right;"	id="AssignproTestDiv-'
					+ testId
					+ '-'
					+ proId
					+ '">	<div  class="col-md-2-1" style=" height: 23px; text-align: center; border-right: 1px solid #069; border-left: 1px solid #069; padding-top: 10px;"><input type="checkbox" name="profileTest'
					+ proId
					+ '" value="'
					+ testId
					+ '"		id="AssignproTestcheck'
					+ proId
					+ '" onclick="sendTestProToFormula('
					+ testId
					+ ','
					+ proId
					+ ')" />	</div>	<div	 class="col-md-10-1"	style="height: 23px; padding-left: 1%; padding-top: 10px; text-align: left;"		id="AssignproTestNm-'
					+ testId + '-' + proId + '">	' + testNm
					+ '<input type="hidden"	id="pkgAssignproTestCharge-'
					+ testId + '-' + proId + '"  value="' + testName[1]
					+ '" />	</div></div><input type="hidden" value="' + testId
					+ '"	id="AssignProTestId-' + proId + '-' + k
					+ '" /><input type="hidden"	id="AssignproTestCount' + proId
					+ '" value="' + k
					+ '" /><input type="hidden" id="labprotestresultid-'
					+ testId + '-' + proId + '" value="0">';

		}
		var end = "</div>";
		$('#assignTestDiv').append(pro + testDiv + end);

		$('input:checkbox[id=procheck' + proId + ']').attr("checked", false);

	} else {
		$('#proAssignDiv' + proId).remove();
	}
}

function sendSymbToSH(sym) {

	var texArSHform = $.trim($('#texArSHform').val());

	$('#texArSHform').val(texArSHform + sym);

}

function sendTestToFormula(tid) {

	var selIndi = $("#selIndi").val();

	if (selIndi == "FH") {

		var testCharge = $.trim($('#testCharge' + tid).val());

		$('#txtFHform').val("{" + testCharge + "}");

		$('#resultTestId').val(tid);

	} else {

		var texArSHform = $.trim($('#texArSHform').val());

		var testCharge = $.trim($('#testCharge' + tid).val());

		$('#texArSHform').val(texArSHform + "{" + testCharge + "}");
	}
	$('input:checkbox[id=testcheck' + tid + ']').attr("checked", false);

}

function sendTestProToFormula(tid, proid) {

	var selIndi = $("#selIndi").val();

	if (selIndi == "FH") {

		var testCharge = $.trim($(
				'#pkgAssignproTestCharge-' + tid + "-" + proid).val());

		$('#txtFHform').val("{" + testCharge + "}");

		$('#resultTestId').val(tid);

	} else {

		var texArSHform = $.trim($('#texArSHform').val());

		var testCharge = $.trim($(
				'#pkgAssignproTestCharge-' + tid + "-" + proid).val());

		$('#texArSHform').val(texArSHform + "{" + testCharge + "}");
	}
	$('input:checkbox[id=pkgAssignproTestCharge' + proid + ']').attr("checked",
			false);
}

function saveLabFormula() {

	var resultTestId = $.trim($("#resultTestId").val());
	var texArSHform = $.trim($("#texArSHform").val());

	if (resultTestId == "") {
		alert("Please Select First Half Of Formula.");
		return false;
	} else if (texArSHform == "") {
		alert("Please Select Second Half Of Formula.");
		return false;
	}

	texArSHform = texArSHform.replace(/\{/g, "$");
	texArSHform = texArSHform.replace(/\}/g, "$");

	var inputs = [];
	inputs.push('action=SaveLabFormula');
	inputs.push('resultTestId=' + encodeURIComponent(resultTestId));
	inputs.push('texArSHform=' + encodeURIComponent(texArSHform));
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

			alert(ajaxResponse);

		}
	});
	$("#txtFHform").val("");
	$("#texArSHform").val("");

}

var featchLabFormulasTemp = '{#foreach $T.lbfrmLi as lbfrmLi}<div 	style="width: 100%; height: 25px; border: 1px solid #b8b8b8; border-top: none;"> <div style="width: 5%; height: 25px; border-right: 1px solid #b8b8b8; padding-left: 1%; padding-top: 5px;">{count}</div> <div style="width: 12%; height: 25px; border-right: 1px solid #b8b8b8; padding-left: 1%; padding-top: 5px;">{$T.lbfrmLi.LHForm}</div> <div style="width: 73%; height: 25px; border-right: 1px solid #b8b8b8; padding-left: 1%; padding-top: 5px;">{$T.lbfrmLi.extstid}</div> <div style="width: 5.5%; height: 25px; border-right: 1px solid #b8b8b8; padding-left: 1%; padding-top: 5px;"> <input type="checkbox" id="checkbx" name="checkbox{count++}" value="{$T.lbfrmLi.retstid}" style="width: 80%;" /> </div> </div> {#/for}';

function featchLabFormulas() {

	count = 1;
	var serchTxt = $.trim($("#serchTxt").val());
	var serchTyp = "search";
	if (serchTxt == "") {
		serchTyp = "onload";
	}

	var inputs = [];
	inputs.push('action=featchLabFormulas');
	inputs.push('serchTxt=' + serchTxt);
	inputs.push('serchTyp=' + serchTyp);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#labFormulasData").html(ajaxResponse);
			ICDbean = eval('(' + ajaxResponse + ')');

			$("#icdDiagnosis").setTemplate($("#featchLabFormulasTemp").html());

			$("#icdDiagnosis").processTemplate(ICDbean);

			$("#iPopupFormula").show('show');
		}

	});

}

function editLabFormula() {

	var labFormulasData = $("#labFormulasData").html();
	labFormulasData = eval('(' + labFormulasData + ')');
	var formId = 0;
	$.each($('.radio:checked'), function() {
		formId = $(this).val();
	});

	if (formId == 0) {
		alert("Please Select Lab Formula To Edit.");
		return false;
	}

	for ( var i = 0; i < labFormulasData.lbfrmLi.length; i++) {
		if (formId == labFormulasData.lbfrmLi[i].idlf) {

			$("#txtFHform").val(labFormulasData.lbfrmLi[i].LHForm);

			$("#texArSHform").val(labFormulasData.lbfrmLi[i].extstid);

			$("#resultTestId").val(labFormulasData.lbfrmLi[i].retstid);
		}

	}

	$(".close").click();
	$("#iPopupFormula").hide('hide');

}

function deleteLabFormula() {

	var labFormId = 0;
	$.each($('.radio:checked'), function() {
		labFormId = $(this).val();
	});

	if (labFormId == 0) {
		alert("Please Select Lab Formula To Delete.");
		return false;
	}

	var r = confirm("Are You Confirm To Delete Lab Formula.");
	if (r == true) {

		var inputs = [];
		inputs.push('action=DeleteLabFormula');
		inputs.push('labFormId=' + labFormId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PathologyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;

				if (ajaxResponse == "Lab Formula is deleted Successfully.") {

					alert(ajaxResponse);
					$(".close").click();
				}

			}
		});
	}
	$("#iPopupFormula").hide('hide');
}

// operator table
var ops = {
	'+' : {
		op : '+',
		precedence : 10,
		assoc : 'L',
		exec : function(l, r) {
			return l + r;
		}
	},
	'-' : {
		op : '-',
		precedence : 10,
		assoc : 'L',
		exec : function(l, r) {
			return l - r;
		}
	},
	'*' : {
		op : '*',
		precedence : 20,
		assoc : 'L',
		exec : function(l, r) {
			return l * r;
		}
	},
	'/' : {
		op : '/',
		precedence : 20,
		assoc : 'L',
		exec : function(l, r) {
			return l / r;
		}
	},
	'**' : {
		op : '**',
		precedence : 30,
		assoc : 'R',
		exec : function(l, r) {
			return Math.pow(l, r);
		}
	}
};

// constants or variables
var vars = {
	e : Math.exp(1),
	pi : Math.atan2(1, 1) * 4
};

// input for parsing
// var r = { string: '123.45+33*8', offset: 0 };
// r is passed by reference: any change in r.offset is returned to the caller
// functions return the parsed/calculated value
function parseVal(r) {
	var startOffset = r.offset;
	var value;
	var m;
	// floating point number
	// example of parsing ("lexing") without aid of regular expressions
	value = 0;
	while ("0123456789".indexOf(r.string.substr(r.offset, 1)) >= 0
			&& r.offset < r.string.length)
		r.offset++;
	if (r.string.substr(r.offset, 1) == ".") {
		r.offset++;
		while ("0123456789".indexOf(r.string.substr(r.offset, 1)) >= 0
				&& r.offset < r.string.length)
			r.offset++;
	}
	if (r.offset > startOffset) { // did that work?
		// OK, so I'm lazy...
		return parseFloat(r.string.substr(startOffset, r.offset - startOffset));
	} else if (r.string.substr(r.offset, 1) == "+") { // unary plus
		r.offset++;
		return parseVal(r);
	} else if (r.string.substr(r.offset, 1) == "-") { // unary minus
		r.offset++;
		return negate(parseVal(r));
	} else if (r.string.substr(r.offset, 1) == "(") { // expression in parens
		r.offset++; // eat "("
		value = parseExpr(r);
		if (r.string.substr(r.offset, 1) == ")") {
			r.offset++;
			return value;
		}
		r.error = "Parsing error: ')' expected";
		throw 'parseError';
	} else if (m = /^[a-z_][a-z0-9_]*/i.exec(r.string.substr(r.offset))) { // variable/constant
		// name
		// sorry for the regular expression, but I'm too lazy to manually build
		// a varname lexer
		var name = m[0]; // matched string
		r.offset += name.length;
		if (name in vars)
			return vars[name]; // I know that thing!
		r.error = "Semantic error: unknown variable '" + name + "'";
		throw 'unknownVar';
	} else {
		if (r.string.length == r.offset) {
			r.error = 'Parsing error at end of string: value expected';
			throw 'valueMissing';
		} else {
			r.error = "Parsing error: unrecognized value";
			throw 'valueNotParsed';
		}
	}
}

function negate(value) {
	return -value;
}

function parseOp(r) {
	if (r.string.substr(r.offset, 2) == '**') {
		r.offset += 2;
		return ops['**'];
	}
	if ("+-*/".indexOf(r.string.substr(r.offset, 1)) >= 0)
		return ops[r.string.substr(r.offset++, 1)];
	return null;
}

function parseExpr(r) {
	var stack = [ {
		precedence : 0,
		assoc : 'L'
	} ];
	var op;
	var value = parseVal(r); // first value on the left
	for (;;) {
		op = parseOp(r) || {
			precedence : 0,
			assoc : 'L'
		};
		while (op.precedence < stack[stack.length - 1].precedence
				|| (op.precedence == stack[stack.length - 1].precedence && op.assoc == 'L')) {
			// precedence op is too low, calculate with what we've got on the
			// left, first
			var tos = stack.pop();
			if (!tos.exec)
				return value; // end reached
			// do the calculation ("reduce"), producing a new value
			value = tos.exec(tos.value, value);
		}
		// store on stack and continue parsing ("shift")
		stack.push({
			op : op.op,
			precedence : op.precedence,
			assoc : op.assoc,
			exec : op.exec,
			value : value
		});
		value = parseVal(r); // value on the right
	}
}

function parse(string) { // wrapper
	var r = {
		string : string,
		offset : 0
	};
	try {
		var value = parseExpr(r);
		if (r.offset < r.string.length) {
			r.error = 'Syntax error: junk found at offset ' + r.offset;
			throw 'trailingJunk';
		}
		return value;
	} catch (e) {
		alert(r.error + ' (' + e + '):\n' + r.string.substr(0, r.offset)
				+ '<*>' + r.string.substr(r.offset));
		return;
	}
}

/* lab formula end */
/*--------------------------------------------------------Jyoti------------------------------------------------------------------------------------------------------*/

function viewFlowChart(idtestmstr) {
	var tretID = $("#tretID").html();
	// alert(tretID);
	var patientTest = $("#pathologyAllPatInfo").html();
	// alert(patientTest);
	var myArray = JSON.parse(patientTest);

	for ( var i = 0; i < myArray.trmli.length; i++) {
		if (myArray.trmli[i].tmid == idtestmstr) {
			myObj = myArray.trmli[i];
			break;
		}
	}
	var pid = myObj.pid;
	var tid = myObj.tretId;
	myObj = JSON.stringify(myObj);
	// alert(myObj);
	var sBean = myObj;
	window.location.href = "haemodialysisReport.jsp?testmasterId=" + idtestmstr
			+ "&patientdetails=" + sBean.decodeSpecialChars() + "&patientId="
			+ pid + "&pageName=" + "New" + "&trid=" + tid;

}
function setChartForm() {
	// alert("jj");
	count = 1;

	var haemodialysis = $("#haemodialysisId").html();
	var pageName = $("#pageName").html();
	// alert(pageName);
	var myObj = JSON.parse(haemodialysis);
	// var pin = myObj.objp.pini;
	// alert(pin);
	if (pageName == "New") {
		var fn = myObj.objp.pnm;
		var age1 = myObj.objp.pag;
		var pagty = myObj.objp.pagty;
		var sex = myObj.objp.psx;
		var age = age1 + " " + pagty + " " + "/" + " " + sex;

		var dt = myObj.objp.pdt;
		// var pname = pin + " " + fn;
		var pname = fn;
		// var tretID = myObj.tretId;
		var tretID = $("#tretID").val();
		$("#pname1").html(pname);
		$("#age").html(age);
	} else {
		var fn = myObj.fn;
		var ln = myObj.ln;
		var agtp = myObj.agtp;
		var age1 = myObj.ag;
		var sex = myObj.sx;
		var age = age1 + " " + agtp + " " + "/" + " " + sex;
		var dt = myObj.rgDt;
		var pname = fn + " " + ln;
		$("#pname1").html(pname);
		$("#age").html(age);
		// var tretID = myObj.trid;
		var tretID = $("#tretID").val();
		$("#popup_container4").html(dt);
		$("#save").hide();
	}
	fetchFormDetails(tretID);
}
function CreateDivForFlowChart(RowCount) {
	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;

	if (rowCount == -1) {
		rowCount = 0;
	}
	rowCount++;
	divId = "tr" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	x.setAttribute('style', 'width: 100%; height: 28px;');
	document.getElementById("testDiv").appendChild(x);
	document.getElementById(divId).innerHTML = '<tr id="remove'
			+ rowCount
			+ '"><td class="col-md-1-1" style="height: 21.5px;">'
			+ (rowCount)
			+ '</td> <td class="col-md-1-1" style="height: 21.5px;">	<input class="col-md-12-1" style="text-transform: capitalize;  margin-top: -3%" type="text" value=""  class="demo" onclick="click1(this)" readonly="readonly"	name="textfield" id="time'
			+ rowCount
			+ '" /></td><td class="col-md-2-1" style="height: 21.5px;" >	<input class="col-md-12-1" style=" margin-top: -2%" type="text" name="textfield"	id="bp'
			+ rowCount
			+ '" /></td><td class="col-md-1-1" style="height: 21.5px;" >	<input class="col-md-12-1" style=" margin-top: -3%" type="text" name="textfield"	id="bfr'
			+ rowCount
			+ '" /></td><td class="col-md-1-1" style="height: 21.5px;">	<input class="col-md-12-1" style=" margin-top: -3%" type="text" name="textfield"	id="ap'
			+ rowCount
			+ '" /></td><td class="col-md-1-1" style="height: 21.5px;">	<input class="col-md-12-1" style=" margin-top: -3%" type="text" name="textfield"	id="vp'
			+ rowCount
			+ '" /></td><td class="col-md-1-1" style="height: 21.5px;">	<input class="col-md-12-1" style=" margin-top: -3%" type="text" name="textfield"	id="ufr'
			+ rowCount
			+ '" /></td><td class="col-md-1-1 center" style="height: 21.5px;">	<input class="col-md-12-1" style=" margin-top: -3%" type="text" name="textfield"	id="hep'
			+ rowCount
			+ '" value="" onkeypress="return validateNumbers(event)" />	</td>	<td class="col-md-1-1  center" style="height: 21.5px;"><input type="checkbox" value="" name="checkbox'
			+ rowCount + '" id="checkbox' + rowCount
			+ '"></td></tr><input type="hidden" id="cid" value="0"/>';

	$('#time' + rowCount).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});

	$("#RowCount").val(rowCount);
	$("#addRowCount").val(mm);

	mm++;

}
function removeDivForFlowChart() {
	var r = confirm("You Want to Cancel This Detail");
	if (r == true) {
		// var hiddenRowCount = document.getElementById(RowCount);
		var rowCount = $("#RowCount").val();
		// alert(rowCount);
		/* var allVals = []; */
		var allVals = [];
		for ( var n = 1; n <= rowCount; n++) {
			var $radios = $('input:checkbox[id=checkbox' + n + ']');
			if ($radios.is(':checked') == true) {
				cid = $("#cid" + n).val();
				allVals.push(cid);

				$("#tr" + n).remove();
			}
		}
		removeDiv(allVals);
	}

}
function removeDiv(allVals) {

	var inputs = [];
	inputs.push('action=removeDiv');
	inputs.push('allVals=' + allVals);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			// location.reload();
		}
	});

}
function saveReport() {

	var objform = 0;

	objform = {
		objformli : []
	};
	var RowCount = $("#RowCount").val();

	var count = 0;
	if (RowCount == 0) {
		/*
		 * alert("You can not save empty fields.");
		 * 
		 * return false;
		 */
	} else {
		for ( var i = 1; i <= RowCount; i++) {
			count++;
			var time = $("#time" + count + "").val();
			var bp = $("#bp" + count + "").val();
			var bfr = $("#bfr" + count + "").val();
			var ap = $("#ap" + count + "").val();
			var vp = $("#vp" + count + "").val();
			var ufr = $("#ufr" + count + "").val();
			var hep = $("#hep" + count + "").val();
			var cid = $("#cid" + count + "").val();

			if (time == "" && bp == "" && bfr == "" && ap == "" && vp == ""
					&& ufr == "" && hep == "") {
				alert("You can not save empty fields.");
				SetFocus("time");
				return false;
			} else if (time != undefined) {

				objform.objformli.push({
					"time" : time,
					"bp" : bp,
					"bfr" : bfr,
					"ap" : ap,
					"vp" : vp,
					"ufr" : ufr,
					"hep" : hep,
					"cid" : cid

				});
			}
		}
	}
	/*
	 * if (objform.objformli.length == 0) { alert("You can not save empty
	 * fields."); return false; }
	 */
	var dat = $("#popup_container4").val();
	if (dat == null || dat == "") {
		alert("You can not save empty date.");
		SetFocus("popup_container4");
		return false;
	}
	objform = JSON.stringify(objform);
	var haemodialysis = $("#haemodialysisId").html();
	// /alert(haemodialysis);
	var myObj = JSON.parse(haemodialysis);
	var tretId = myObj.tretId;

	var inputs = [];
	inputs.push('action=saveReport');
	inputs.push('queryType=' + $("#queryType").val());
	inputs.push('tretId=' + tretId);
	inputs.push('objform=' + encodeURIComponent(objform));
	inputs.push('dialyzetype=' + encodeURIComponent($("#dialyzetype").val()));
	inputs.push('dialyzeuse=' + encodeURIComponent($("#dialyzeuse").val()));
	inputs.push('tubingtype=' + encodeURIComponent($("#tubingtype").val()));
	inputs.push('tubinguse=' + encodeURIComponent($("#tubinguse").val()));
	inputs.push('hd=' + encodeURIComponent($("#hd").val()));
	inputs.push('frequency=' + encodeURIComponent($("#frequency").val()));
	inputs.push('shift=' + encodeURIComponent($("#shift").val()));
	inputs.push('vstatus=' + encodeURIComponent($("#vstatus").val()));
	inputs.push('duration=' + encodeURIComponent($("#duration").val()));
	inputs.push('preBP=' + encodeURIComponent($("#preBP").val()));
	inputs.push('prepulse=' + encodeURIComponent($("#prepulse").val()));
	inputs.push('pretemp=' + encodeURIComponent($("#pretemp").val()));
	inputs.push('prewt=' + encodeURIComponent($("#prewt").val()));
	inputs.push('postBP=' + encodeURIComponent($("#postBP").val()));
	inputs.push('postpulse=' + encodeURIComponent($("#postpulse").val()));
	inputs.push('posttemp=' + encodeURIComponent($("#posttemp").val()));
	inputs.push('postwt=' + encodeURIComponent($("#postwt").val()));
	inputs.push('doctornotes=' + encodeURIComponent($("#doctornotes").val()));
	inputs.push('strBy=' + encodeURIComponent($("#strBy").val()));
	inputs.push('stopby=' + encodeURIComponent($("#stopby").val()));
	inputs.push('drywt=' + encodeURIComponent($("#drywt").val()));
	inputs.push('wtgain=' + encodeURIComponent($("#wtgain").val()));
	inputs.push('target=' + encodeURIComponent($("#target").val()));
	inputs.push('postdrug=' + encodeURIComponent($("#postdrug").val()));

	inputs.push('date=' + $("#popup_container4").val());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			location.reload();
		}
	});

}
var fetchReport = '{#foreach $T.listmaster[0].listcompo as listcompo}'
		+ '<tr id="tr{count}"	style="height: 28px;">'
		+ '<td class="col-md-1-1 center" style="height: 21.5px;">{count}</td>'
		+ '<td class="col-md-1-1 center" style="height: 21.5px;">'
		+ '<input class="col-md-12-1" style="margin-top:-2%;" type="text" id="time{count}" readonly="readonly"	value="{$T.listcompo.time}" onclick="click1(this)" /></td>'
		+ '<td class="col-md-2-1 center" style="height: 21.5px;">'
		+ '<input class="col-md-12-1" style="margin-top:-1%;" type="text" id="bp{count}" value="{$T.listcompo.bp}" /></td>'
		+ '<td class="col-md-1-1 center" style="height: 21.5px;">'
		+ '<input class="col-md-12-1" style="margin-top:-2%;" type="text" id="bfr{count}" value="{$T.listcompo.bfr}" /></td>'
		+ '<td class="col-md-1-1 center" style="height: 21.5px;">'
		+ '<input class="col-md-12-1" style="margin-top:-2%;" type="text" id="ap{count}" value="{$T.listcompo.ap}" />	</td>'
		+ '<td class="col-md-1-1 center" style="height: 21.5px;">'
		+ '<input class="col-md-12-1" style="margin-top:-2%;" type="text" id="vp{count}" value="{$T.listcompo.vp}" />	</td>'
		+ '<td class="col-md-1-1 center" style="height: 21.5px;">'
		+ '<input class="col-md-12-1" style="margin-top:-2%;" type="text" id="ufr{count}" value="{$T.listcompo.ufr}" />	</td>'
		+ '<td class="col-md-1-1 center" style="height: 21.5px;">'
		+ '<input class="col-md-12-1" style="margin-top:-2%;" type="text" id="hep{count}" value="{$T.listcompo.hep}" />	</td>'
		+ '<td class="col-md-1-1 center" style="height: 21.5px;">'
		+ '<input type="checkbox" id="checkbox{count}" name="checkbox" />	</td></tr>'
		+ '<input id="cid{count}" name="cid{count++}" type="hidden"	value="{$T.listcompo.cid}">{#/for}'
		+ '<input id="addRowCount" name="addRowCount" type="hidden" value="{count}">';

function fetchFormDetails(tretID) {
	// alert("ok");
	count = 1;

	var inputs = [];
	inputs.push('action=fetchFormDetails');
	inputs.push('tretID=' + tretID);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PathologyServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {

					ajaxResponse = r;
					// alert(ajaxResponse);
					$("#divjaxresponse").html(ajaxResponse);
					pobj = eval('(' + ajaxResponse + ')');

					if (pobj.listmaster.length > 0) {
						$("#queryType").val('update');

						$("#testDiv").setTemplate(fetchReport);
						$("#testDiv").processTemplate(pobj);
						$("#RowCount").val(--count);
						$("#dialyzetype").val(pobj.listmaster[0].dtype);
						$("#popup_container4").val(pobj.listmaster[0].date);
						$("#dialyzeuse").val(pobj.listmaster[0].duse);
						$("#tubingtype").val(pobj.listmaster[0].ttype);
						$("#tubinguse").val(pobj.listmaster[0].tuse);
						$("#hd").val(pobj.listmaster[0].hd);
						$("#frequency").val(pobj.listmaster[0].fre);
						$("#shift").val(pobj.listmaster[0].sh);
						$("#vstatus").val(pobj.listmaster[0].vs);
						$("#duration").val(pobj.listmaster[0].dur);
						$("#preBP").val(pobj.listmaster[0].pbp);
						$("#postBP").val(pobj.listmaster[0].postBp);
						$("#drywt").val(pobj.listmaster[0].dryWt);
						$("#prepulse").val(pobj.listmaster[0].ppl);
						$("#postpulse").val(pobj.listmaster[0].postp);
						$("#wtgain").val(pobj.listmaster[0].wtgain);
						$("#pretemp").val(pobj.listmaster[0].ptemp);
						$("#posttemp").val(pobj.listmaster[0].posttemp);
						$("#target").val(pobj.listmaster[0].target);
						$("#prewt").val(pobj.listmaster[0].pwt);
						$("#postwt").val(pobj.listmaster[0].postwt);
						$("#doctornotes").val(pobj.listmaster[0].dnotes);

						// alert(pobj.listmaster[0].listcompo.length);
						for ( var temp = 1; temp <= pobj.listmaster[0].listcompo.length; temp++) {
							$('#time' + temp).datetimepicker({
								datepicker : false,
								format : 'H:i',
								step : 15
							});
						}

					} else {

						$("#queryType").val('insert');
					}
				}
			});
}

function printFormDetail(divName) {
	var xxx = $("#hospDetails").html();
	hospDetails = eval('(' + xxx + ')');

	var hosp = hospDetails.listHosDetail[0];

	var originalContents = document.body.innerHTML;

	var WindowObject = window.open('', ' ', '');
	WindowObject.document
			.writeln('<div style="width: 100%; border: 2px solid; height:100%; align:center;" id="jjjj">');

	WindowObject.document
			.writeln('<div style="width:99%; padding-bottom: 5px;padding-top: 5px;padding-left: 1%;border-bottom:1px solid; float:left;"><div style="width:15%;float:left; padding-top: 10px;"><img src="'
					+ hosp.flpt
					+ '" width="170" height="90" alt="" /></div><div style="text-align:center;padding-left: 2px;" id="SRBill"><h1>'
					+ hosp.hn
					+ '</h1><b>'
					+ hosp.ha
					+ '&nbsp;&nbsp;-&nbsp;&nbsp;'
					+ hosp.hz
					+ '&nbsp;&nbsp;</b><br></br> <b>Tel:-&nbsp;&nbsp;'
					+ hosp.hcon
					+ '.&nbsp;&nbsp;</b><b>Fax:-'
					+ hosp.hx
					+ '.</b> </div>');
	WindowObject.document
			.writeln('</div><div style="width: 100%; border-bottom: 2px solid;"><center><h4 style="align: center;padding-top:40px;">HAEMODIALYSIS FLOW CHART</h4></center></div>');

	WindowObject.document
			.writeln('<div style="width: 100%; padding-top: 1%;padding-left: 1%; float:left;"> <div style="width: 35%;"><div style="width:40%; padding-top: 1%; float:left;font-weight: bold;">Patient Name:</div><div style="width: 60%; float:left;">'
					+ $("#pname1").html()
					+ ' </div></div><div style="width: 38%; float:left;"><div style="width:30%; float:left;font-weight: bold;">Age/Gender :</div>'
					+ $("#age").html()
					+ ' </div><div style="width: 20%; float:left;"><div style="width: 40%; float:left;font-weight: bold;">Date :</div>'
					+ $("#popup_container4").val() + '</div> </div>');

	WindowObject.document
			.writeln('<div style="width: 100%; padding-top: 1%;padding-left:1%;float:left;"><div style="width: 35%;float:left;"><div style="width:40%; float:left;font-weight: bold;padding-left:1%;">Dialyze Type:</div><div style="width:30%; float:left;">'
					+ $("#dialyzetype").val()
					+ '</div></div><div style="width: 38%;float:left;"><div style="width:40%; float:left;font-weight: bold;">Dialyzer Use: </div><div style="width:30%; float:left;">'
					+ $("#dialyzeuse").val()
					+ '</div></div><div style="width: 25%;float:left;"><div style="width: 55%; float:left;font-weight: bold;">Tubing Type: </div><div style="width:30%; float:left;">'
					+ $("#tubingtype").val() + '</div></div></div>');

	WindowObject.document
			.writeln('<div style="width: 100%; padding-top: 1%;padding-left: 1%;float:left;"><div style="width: 35%;float:left;"><div style="width:40%; float:left;font-weight: bold;">Tubing Use:</div><div style="width:30%; float:left;">'
					+ $("#tubinguse").val()
					+ '</div></div><div style="width:38%;padding-left: 0%;float:left;"><div style="width:30%; float:left;font-weight: bold;">No of HD: </div><div style="width:30%; float:left;padding-left: 10%;">'
					+ $("#hd").val()
					+ '</div></div><div style="width:25%;padding-left: 0%;float:left;"><div style="width:50%; float:left;font-weight: bold;">Frequency: </div><div style="width:30%; float:left;">'
					+ $("#frequency").val() + '</div></div></div>');

	WindowObject.document
			.writeln('<div style="width: 100%; padding-top: 1%;padding-left: 1%;float:left;"><div style="width: 35%; float:left;"><div style="width:60%;  float:left;font-weight: bold;">Shift-I/II/III:Access:</div><div style="width:30%; float:left;">'
					+ $("#shift").val()
					+ '</div></div><div style="width: 38%;padding-left: 0%;float:left;"><div style="width: 50%;   padding-top:0%; float:left;font-weight: bold;">/WK; Vital Status:</div><div style="width:30%; float:left;">'
					+ $("#vstatus").val()
					+ '</div></div><div style="width: 25%; float:left;"><div style="width: 40%; padding-top: 1%;float:left;font-weight: bold;">Duration:</div>'
					+ $("#duration").val() + '</div></div>');

	/*
	 * WindowObject.document .writeln('<div style="width: 100%; padding-top:
	 * 1%;padding-left: 1%;float:left;"><div style="width: 50%; float:left;"><div
	 * style="width: 25%; padding-top: 1%;float:left;font-weight:
	 * bold;">Duration:</div><div style="width: 40%; float:left;">' +
	 * $("#duration").val() + '</div></div></div>');
	 */
	WindowObject.document
			.writeln('<div style="width: 100%; padding-top: 2%;float:left;"><div style="width: 44.4%;float:left;border:1.5px solid;"><div style="width: 50%;font: bold; font-size: medium; padding-bottom: 0%;float:left; padding-left:25%;font-weight: bold;">Machine No:</div></div><div style="width: 55%; font: bold; font-size: medium;  border: 1.5px solid ;padding-left:0 px; padding-bottom: 0%; float:left;font-weight: bold;text-align:center;">Doctor Notes&nbsp;&nbsp;&nbsp;<div style="width: 40%; float: left;"></div></div></div>');
	WindowObject.document.writeln('<br><br>');

	WindowObject.document
			.writeln('<div style="width: 44.5%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float:left;" id="tableContent"><table cellspacing="0" cellpadding="0" style="border: 1px solid;"><tbody><tr><td align="center" style="border: 1px solid;width:25%;"></td><td align="center" style="border: 1px solid;font-weight: bold;width:25%;">Pre</td><td align="center" style="border: 1px solid;font-weight: bold;width:25%;">Post</td><td align="center" style="border: 1px solid;font-weight: bold;width:25%;"></td></tr><tr><td width="15%" align="center" style="border: 1px solid;">B.P.</td><td style="border: 0.2px solid;" align="center"> '
					+ $("#preBP").val()
					+ '</td><td style="border: 0.2px solid;" align="center"> '
					+ $("#postBP").val()
					+ '</td><td width="30%" padding-left="10px">Dry Wt</td><td align="center"> '
					+ $("#drywt").val() + '&nbsp;&nbsp;&nbsp;</td>');

	WindowObject.document
			.writeln('</td><td ><div style="width: 45%; float:left;padding-right:10px;">Kg</div></td></tr><tr>	<td width="15%" align="center" style="border: 1px solid;">Pulse</td><td style="border: 0.2px solid;" align="center">'
					+ $("#prepulse").val()
					+ '</td><td style="border: 0.2px solid;" align="center">'
					+ $("#postpulse").val()
					+ '</td><td width="30%" padding-left="10px" padding-top="12px" >Wt. gain</td><td  align="center"> '
					+ $("#wtgain").val() + '&nbsp;&nbsp;&nbsp;</td>');

	WindowObject.document
			.writeln('</td><td ><div style="width: 45%; float:left;padding-right:10px;">Kg</div></td></tr><tr><td width="15%" align="center" style="border: 1px solid;">Temp</td><td style="border: 0.2px solid;" align="center">'
					+ $("#pretemp").val()
					+ '</td><td style="border: 0.2px solid;" align="center">'
					+ $("#posttemp").val()
					+ '</td><td width="30%"  padding-left="10px"  padding-top="12px">Target</td><td  align="center"> '
					+ $("#target").val() + '&nbsp;&nbsp;&nbsp;</td>');

	WindowObject.document
			.writeln('</td><td ><div style="width: 45%; float:left;padding-right:10px;">Kg</div></td></tr><tr><td width="15%" align="center" style="border: 1px solid;">Wt.(kg)</td><td style="border: 0.2px solid;" align="center">'
					+ $("#prewt").val()
					+ '</td><td style="border: 0.2px solid;" align="center">'
					+ $("#postwt").val()
					+ '</td><td width="35%" align="center"></td><td align="center"> </td>');

	WindowObject.document
			.writeln('</td><td ><div style="width: 45%; float:left;"></div></td></tr></tbody></table></div><div style="width: 45%; padding-left: 5%;float:left;"><div style="width: 100%; float:left;"></div></div>');

	WindowObject.document
			.writeln('<div style="width: 55%; padding-left: 0%; padding-top: 0%; float:left;"> <div style="width: 100%; float:left;border:1.5px solid;"><td align="center" style="border: 1px solid;font-weight: bold;"><textarea rows="7" cols="54" id="doctornotes" style="width: 495px; height: 105px;" >'
					+ $("#doctornotes").val() + '</textarea></td></div></div>');

	WindowObject.document.writeln('<br><br>');
	var rowCount = $("#RowCount").val();
	var time = $("#time").val();
	// alert(time);
	var z = 1;
	WindowObject.document
			.writeln('<div style="width: 70%;padding-top:2%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float:left;" id="tableContent"><table cellspacing="0" cellpadding="0" style="border: 1px solid;"><tbody><tr><td   width="15%" align="center" style="border: 1px solid;font-weight: bold;">Time</td><td  width="15%"  align="center" style="border: 1px solid;font-weight: bold;">B.P.</td><td   width="15%"align="center" style="border: 1px solid;font-weight: bold;">BFR</td><td  width="15%" align="center" style="border: 1px solid;font-weight: bold;">AP</td><td  width="15%" align="center" style="border: 1px solid;font-weight: bold;">VP</td><td   width="15%" align="center" style="border: 1px solid;font-weight: bold;">UFR</td><td  width="15%"  align="center" style="border: 1px solid;font-weight: bold;">Heparen</td></td>');

	for ( var i = 1; i <= rowCount; i++) {
		if ($("#time" + i).val() != undefined)

			WindowObject.document
					.writeln('<div style="width: 70%;pading-top:2%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float:left;" id="tableContentcomp"></div><tbody><tr>'
							// + (z++)
							+ '<td width="15%" align="center" style="border: 1px solid;">'
							+ $("#time" + i).val()
							+ '</td><td  width="15%" style="border: 0.2px solid;" align="center"> '
							+ $("#bp" + i).val()
							+ '</td><td width=15%" style="border: 0.2px solid;" align="center"> '
							+ $("#bfr" + i).val()
							+ '</td><td width="15%"  style="border: 0.2px solid;" align="center">'
							+ $("#ap" + i).val()
							+ '</td><td width="15%"  style="border: 0.2px solid;" align="center">'
							+ $("#vp" + i).val()
							+ '</td><td width="15%"  style="border: 0.2px solid;" align="center">'
							+ $("#ufr" + i).val()
							+ '</td><td width="15%"  style="border: 0.2px solid;" align="center">'
							+ $("#hep" + i).val() + '</td></div>');
	}
	WindowObject.document
			.writeln('</td><td ></td></tr></tbody></table></div><div style="width:28%; padding-left: 1%;float:left;"><div style="width:50%;"><div style="width:100%;padding-top:7%;padding-left:0%;">Started By:</div><div style="width:100%;margin-left:30%;float:left; padding-top:0%;">'
					+ $("#strBy").val()
					+ '</div></div><div style="width:100%;"><div style="width: 80%; float:left;padding-left:0%;padding-top:4%;">Stopped By:</div><div style="width:100%;margin-left:30%; float:left;padding-top:4%;">'
					+ $("#stopby").val() + '</div></div></div>');

	WindowObject.document
			.writeln('<div style="width: 100%; float:left;"><div style="width: 15%; padding-top: 5%; padding-left: 2%;float:left;font-weight: bold;">Post HD Drugs:</div><div style="width: 70%; float:left; padding-top: 5%; ">'
					+ $("#postdrug").val() + '</div></div>');

	WindowObject.document
			.writeln('<div style="width: 100%; float:left;"><div style="width: 35%; padding-top: 5%; float:left;font-weight: bold;"></div><div style="width: 40%; float:left;font-weight: bold;padding-top:7%;padding-left:80%;">Staff Sign</div></div>');

	WindowObject.document.writeln('</div>');
	WindowObject.focus();

	WindowObject.print();

	WindowObject.close();

}
function click1(fieldId) {
	$(function() {
		$(".demo").timepickr({
			convention : 12

		});

	});

}

/* lab package start */

function sendProToAsignPkg(proId) {

	var count = $("#testCount").val();
	var $radios = $('input:checkbox[id=procheck' + proId + ']');
	if ($radios.is(':checked') == true) {

		var pro = '<div style="width: 100%;margin-top: 20px;" id="proAssignDiv'
				+ proId
				+ '">	<div class="col-sm-12-1" style="border-bottom: 1px solid #b8b8b8; border-top: 0px solid #b8b8b8; padding-bottom: 5px;"	id="proIdDiv'
				+ proId
				+ '"><div class="divide-20"></div><div	class="col-md-1-1" style="text-align: center; padding-top: 5px;"><input name="Assignprocheck" type="checkbox" value="'
				+ proId
				+ '"	id="Assignprocheck" checked="checked" onclick="sendPkgProTestToRemove('
				+ proId
				+ ')" /></div>	<div	class="col-md-9-1" style="padding-left: 1%; padding-top: 5px; text-align: left;" id="ProCodNm'
				+ proId
				+ '">'
				+ $("#ProCodNm" + proId).html()
				+ '</div>	<div	class="col-md-2-1" style="padding-left: 1%; padding-top: 5px; text-align: left;" id="AssProCodCharge'
				+ proId + '">' + $("#ProCodCharge" + proId).val()
				+ '</div></div>';
		var proTestLegth = $("#proTestCount" + proId).val();
		var testDiv = "";
		for ( var k = 1; k <= proTestLegth; k++) {

			var testId = parseInt($("#ProTestId-" + proId + "-" + k).val());
			var testNm = $("#proTestNm-" + testId + "-" + proId).html();
			var testName = testNm.split('-');
			var testCharges = $("#proTestCharge-" + testId + "-" + proId).val();
			// $("#proTestcheck-" + testId + "-" + proId).attr("checked", true);
			testDiv = testDiv
					+ '<div	class="col-sm-12-1" style="width: 94%; float: right; margin-top: 0px; padding-bottom: 5px; border-bottom: 1px solid #b8b8b8; border-left: 1px solid #b8b8b8;"	id="AssignproTestDiv-'
					+ testId
					+ '-'
					+ proId
					+ '"><div class="divide-10"></div><div class="col-md-1-1" style="text-align: center; padding-top: 5px;"><input type="checkbox" name="profileTest'
					+ proId
					+ '" value="'
					+ testId
					+ '"		id="AssignproTestcheck'
					+ proId
					+ '" checked="checked"	/>	</div>	<div	class="col-md-11-1"	style="padding-left: 1%; padding-top: 5px; text-align: left;" id="AssignproTestNm-'
					+ testId + '-' + proId + '">	' + testNm
					+ '<input type="hidden"	id="pkgAssignproTestCharge-'
					+ testId + '-' + proId + '"  value="' + testName[1]
					+ '" />	</div></div><input type="hidden" value="' + testId
					+ '"	id="AssignProTestId-' + proId + '-' + k
					+ '" /><input type="hidden"	id="AssignproTestCount' + proId
					+ count + '" value="' + k
					+ '" /><input type="hidden" id="labprotestresultid-'
					+ testId + '-' + proId + count + '" value="0">';
		}
		var end = "</div>";
		$('#assignTestDiv').append(pro + testDiv + end);
		var total = parseFloat($("#ProCodCharge" + proId).val())
				+ parseFloat($("#divtotalAmt").html());
		$("#divtotalAmt").html(total);
		count++;

		$("#testCount").val(count);

		// $('input:checkbox[id=procheck' + proId + ']').attr("checked", false);

	} else {
		var total = 0;
		var amount = $("#divtotalAmt").html();
		if (amount == 0) {

			total = $("#divtotalAmt").html();
		} else {
			total = parseFloat($("#divtotalAmt").html())
					- parseFloat($("#ProCodCharge" + proId).val());
		}
		$("#divtotalAmt").html(total);
		$('#proAssignDiv' + proId).remove();
	}
}

function sendTestToAsignPkg(tid) {
	var count = $("#testCount").val();
	var $radios = $('input:checkbox[id=testcheck' + tid + ']');
	if ($radios.is(':checked') == true) {

		// var testId = parseInt($("#ProTestId" + k).val());
		var testNm = $("#testNm" + tid).html();
		var testCharges = $("#testCharge" + tid).val();
		var test = '<div class="col-sm-12-1" style="width: 100%; border-bottom: 1px solid #b8b8b8; padding-bottom: 5px; margin-top: 10px;"	id="testAssignDiv'
				+ tid
				+ '"><div class="col-md-1-1" style="text-align: center; padding-top: 5px;"><input type="checkbox" name="testAssigncheck" value="'
				+ tid
				+ '"id="testAssigncheck"   checked="checked"  onclick="sendPkgTestToRemove('
				+ tid
				+ ')" /></div><div	class="col-md-9-1" style="padding-left: 1%; padding-top: 5px; text-align: left;" id="testNm'
				+ tid
				+ '">'
				+ testNm
				+ '<input type="hidden"	id="testCharge'
				+ tid
				+ '" value="'
				+ testCharges
				+ '" /></div><div	class="col-md-2-1" style=" padding-left: 1%; padding-top: 5px; text-align: left;"	id="testAssignCharge'
				+ tid
				+ '">'
				+ testCharges
				+ '</div><input type="hidden" id="labtestresultid'
				+ tid
				+ count + '" value="0"/></div>';

		$('#assignTestDiv').append(test);
		var total = parseFloat(testCharges)
				+ parseFloat($("#divtotalAmt").html());
		$("#divtotalAmt").html(total);
		count++;
		$("#testCount").val(count);
		// $('input:checkbox[id=testcheck' + tid + ']').attr("checked", false);
	} else {
		var total = 0;
		var amount = $("#divtotalAmt").html();
		if (amount == 0) {
			total = $("#divtotalAmt").html();

		} else {
			total = parseFloat($("#divtotalAmt").html())
					- parseFloat($("#testCharge" + tid).val());
		}

		$("#divtotalAmt").html(total);
		$('#testAssignDiv' + tid).remove();
	}
}

function savePackages() {

	var heading = $.trim($("#heading").val());
	var pkgNm = $.trim($("#proNm").val());
	var pkgCode = $.trim($("#proCode").val());
	var pkgCharge = $.trim($("#proCharge").val());
	var queryType = $.trim($("#queryType").val());
	var idPkg = $.trim($("#idPro").val());

	if (heading == "select") {
		alert("Please Select Heading Name!");
		SetFocus("heading");
		return false;
	} else if (pkgNm == "") {
		alert("Please Enter Lab Package Name!");
		SetFocus("proNm");
		return false;
	} else if (pkgCode == "") {
		alert("Please Enter Lab Package Code!");
		SetFocus("proCode");
		return false;
	} else if (pkgCharge == "") {
		alert("Please Enter Lab Package Charges!");
		SetFocus("proCharge");
		return false;
	}

	var objLabPkg = 0;

	objLabPkg = {
		lbpkgli : []
	};

	var pkgprotestList = [];

	$("#assignTestDiv").children().each(
			function() {

				var idElemnt = $(this).attr('id');

				if (idElemnt.indexOf("proAssignDiv") != -1) {

					var idpro = idElemnt.slice(12, idElemnt.length);
					// alert(idpro);
					var labpkgproList = [];

					$('input[name="profileTest' + idpro + '"]:checked').each(
							function(index) {
								var idtst = this.value;

								labpkgproList.push({
									"idpro" : idpro,
									"idtst" : idtst
								});

							});
					var typeTP = "P";

					var proName = $("#ProCodNm" + idpro).html().split("-");

					if (labpkgproList.length == 0) {
						alert("Please Select At Least One Test Under "
								+ $.trim(proName[1]) + " Profile.");
						return false;
					}

					pkgprotestList.push({
						"lbpkgproli" : labpkgproList,
						"idprotst" : idpro,
						"typeTP" : typeTP
					});

				} else if (idElemnt.indexOf("testAssignDiv") != -1) {

					var idtest = idElemnt.slice(13, idElemnt.length);
					// alert(idtest);
					var typeTP = "T";

					pkgprotestList.push({
						"idprotst" : idtest,
						"typeTP" : typeTP
					});

				}
				// alert(idElemnt);
			});

	if (pkgprotestList.length == 0) {
		alert("Please Select At Least One Test Or Profile To Add This Package.");
		return false;
	} else if (pkgprotestList.length > 0) {
		var count = 0;
		for ( var k = 0; k < pkgprotestList.length; k++) {
			if (pkgprotestList[k].typeTP == "P") {
				count++;
			}
		}
		if (count == 0) {
			alert("Please Select At Least One Profile To Add This Package.");
			return false;
		}
	}

	objLabPkg.lbpkgli.push({
		"idlbpkg" : idPkg,
		"idhed" : heading,
		"pkgnm" : pkgNm,
		"pkgcod" : pkgCode,
		"pkgchrg" : pkgCharge,
		"pkgprotstli" : pkgprotestList
	});

	if (objLabPkg.lbpkgli.length == 0) {
		alert("You can not save empty fields.");
		return false;
	}

	objLabPkg = JSON.stringify(objLabPkg);

	var inputs = [];
	inputs.push('action=SavePackages');
	inputs.push('queryType=' + queryType);
	inputs.push('objLabPkg=' + objLabPkg);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {

			alert(ajaxResponse);
			window.location.href = "PathologyPackages.jsp";
		}
	});

}

// Touheed
// Code for Lab Pakcage Demo DATE: 11-DEC-2015
function savePackagesDemo() {

	var heading = $.trim($("#heading").val());
	var pkgNm = $.trim($("#proNm").val());
	var pkgCode = $.trim($("#proCode").val());
	var pkgCharge = parseInt($.trim($("#proCharge").val()));
	var motivatorCash = parseInt($('#motivatorCash').val());
	var motivatorSponsored = parseInt($('#motivatorSponsored').val());
	var clinicPercent = $('#txtClinicPercent').val();
	var queryType = $.trim($("#queryType").val());
	var idPkg = "";

	if (queryType == "update") {
		idPkg = $.trim($("#userID").val());
	} else {
		idPkg = $.trim($("#idPro").val());
	}

	if (motivatorCash == "" || isNaN(motivatorCash)) {
		motivatorCash = 0;
	}
	if (motivatorSponsored == "" || isNaN(motivatorSponsored)) {
		motivatorSponsored = 0;
	}
	if (clinicPercent == "") {
		clinicPercent = 0;
	}

	if (heading == "select") {
		alert("Please Select Heading Name!");
		SetFocus("heading");
		return false;
	}
	if (pkgNm == "") {
		alert("Please Enter Lab Package Name!");
		SetFocus("proNm");
		return false;
	}
	if (pkgCode == "") {
		alert("Please Enter Lab Package Code!");
		SetFocus("proCode");
		return false;
	}
	if (pkgCharge == "") {
		alert("Please Enter Lab Package Charges!");
		SetFocus("proCharge");
		return false;
	}
	if (pkgCharge < motivatorCash) {
		alert("Motivator cash must be less than package charge.");
		SetFocus("motivatorCash");
		return false;
	}
	if (pkgCharge < motivatorSponsored) {
		alert("Motivator sponsored must be less than package charge.");
		SetFocus("motivatorSponsored");
		return false;
	}
	if (clinicPercent > 100) {
		alert("Clinic % can not be less than '0' and greater than '100'");
		SetFocus("txtClinicPercent");
		return false;
	}
	var objLabPkg = 0;

	objLabPkg = {
		lbpkgli : []
	};

	var pkgprotestList = [];

	$('#rightDiv li')
			.each(
					function() {

						var idElemnt = $(($(this).find('input[name=proid]')))
								.attr('value');

						var testid = $(($(this).find('input[name=testid]')))
								.attr('value');

						var headNameP = $(
								($(this).find('input[name=headNameP]'))).attr(
								'value');
						// alert("testid"+testid);

						/* var idElemnt = $(this).attr('id'); */
						// alert("idElemnt---->"+idElemnt);
						if (idElemnt != "" && idElemnt != "0"
								&& idElemnt != undefined) {
							// alert("Hello ");
							var idpro = idElemnt;
							// alert("------------idpro coming");
							// alert(idpro);
							var labpkgproList = [];

							$('input[name="chk' + idpro + '"]:checked').each(
									function(index) {
										var idtst = this.value;
										// alert("idtst---->"+idtst);
										labpkgproList.push({
											"idpro" : idpro,
											"idtst" : idtst
										});

									});
							var typeTP = "P";

							// var proName = $("#ProCodNm" +
							// idpro).html().split("-");

							if (labpkgproList.length == 0) {
								/*
								 * alert("Please Select At Least One Test Under " +
								 * $.trim(proName[1]) + " Profile.");
								 */
								alert("Please Select At Least One Test Under Profile.");
								setTimeout(funcx, 100);
								return false;
							}

							pkgprotestList.push({
								"lbpkgproli" : labpkgproList,
								"idprotst" : idpro,
								"typeTP" : typeTP
							});

						} else if (testid != "" && testid != "0"
								&& testid != undefined) {

							var idtest = testid;
							// alert(idtest);
							var typeTP = "T";

							pkgprotestList.push({
								"idprotst" : idtest,
								"typeTP" : typeTP
							});

						} else if (headNameP != "" && headNameP != "0"
								&& headNameP != undefined) {

							var idtest = 0;
							// alert(idtest);
							var typeTP = headNameP;

							pkgprotestList.push({
								"idprotst" : idtest,
								"typeTP" : typeTP
							});

						}
						// alert(idElemnt);
					});

	if (pkgprotestList.length == 0) {
		alert("Please Select At Least One Test Or Profile To Add This Package.");
		return false;
	} else if (pkgprotestList.length > 0) {
		var count = 0;
		for ( var k = 0; k < pkgprotestList.length; k++) {
			if (pkgprotestList[k].typeTP == "P") {
				count++;
			}
		}
		if (count == 0) {
			alert("Please Select At Least One Profile To Add This Package.");
			return false;
		}
	}

	objLabPkg.lbpkgli.push({
		"idlbpkg" : idPkg,
		"idhed" : heading,
		"pkgnm" : pkgNm,
		"pkgcod" : pkgCode,
		"pkgchrg" : pkgCharge,
		"pkgprotstli" : pkgprotestList,
		"motivatorCash" : motivatorCash,
		"motivatorSponsored" : motivatorSponsored,
		"clinicPercent" : clinicPercent
	});

	if (objLabPkg.lbpkgli.length == 0) {
		alert("You can not save empty fields.");
		return false;
	}

	objLabPkg = JSON.stringify(objLabPkg);

	var inputs = [];
	inputs.push('action=SavePackages');
	inputs.push('queryType=' + queryType);
	inputs.push('objLabPkg=' + objLabPkg);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {

			alert(ajaxResponse);
			window.location.href = "pathologyPackagesDemo.jsp";

			$("#headingCall").val(0);
		}
	});

}

var defaultViewPackageTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 98%; margin-top: 20px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>ID</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Package Name</div></th>"
		+ "<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Code</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 200px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.lbpkgli as lbpkgli}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.lbpkgli.idlbpkg}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;' id='uname{count}'>{$T.lbpkgli.pkgnm}</td>"
		+ "<td class='col-sm-1-1' style='height: 21.5px;' id='uname{count}'>{$T.lbpkgli.pkgcod}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success center' value='EDIT' id='btnEdit{count}' onclick='editPackage({$T.lbpkgli.idlbpkg})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success center' value='DELETE' id='btnDelete{count}' onClick='deletePackage({$T.lbpkgli.idlbpkg})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

// Touheed
// Code for Lab Pacakge Date: 11/Dec/2015

var defaultViewPackageTempDemo = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 100%; margin-top: 20px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>ID</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Package Name</div></th>"
		+ "<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Code</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 450px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.lbpkgli as lbpkgli}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.lbpkgli.idlbpkg}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;' id='uname{count}'>{$T.lbpkgli.pkgnm}</td>"
		+ "<td class='col-sm-1-1' style='height: 21.5px;' id='uname{count}'>{$T.lbpkgli.pkgcod}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success center' value='EDIT' id='btnEdit{count}' data-toggle='modal' data-target='#popPackage' data-backdrop='static' onclick='editPackageDemo({$T.lbpkgli.idlbpkg})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success center' value='DELETE' id='btnDelete{count}' onClick='deletePackage({$T.lbpkgli.idlbpkg})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function getPackages(fetchtype, type) {

	var byName = $.trim($("#byName").val());
	if (byName == "" && fetchtype == "search") {
		alert("Please Insert Package Name For Search");
		return false;
	}
	var inputs = [];
	//inputs.push('action=GetPackages');
	inputs.push('byName=' + byName);
	inputs.push('type=' + fetchtype);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
			//	url : "PathologyServlet",
				url : "./ehat/ipdhistory/getPackages",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r) {
					// alert(r);
					ajaxResponse = r;
					count = 1;
					// alert(ajaxResponse);
					//pobj1 = eval('(' + ajaxResponse + ')');
					pobj1 = ajaxResponse ;
					$("#userObj").html(ajaxResponse);
					// $("#userObj1").html(ajaxResponse);
					if (type == "charges") {

						$('#labPackageTab > thead > tr:nth-child(n+2)')
								.remove();
						$('#labPackageTab > tbody > tr:nth-child(n+2)')
								.remove();

						var halllist = $("#InvTestAllHallDetails").html();
						var halldetails = eval('(' + halllist + ')');

						var PackageCharges = "<tr id = 'headerTr'>"
								+ "<th class='center' style = 'width: 30px;'><div class='TextFont'>ID</div></th>"
								+ "<th class='' style = 'width: 200px;'><div class='TextFont'>Lab Package Name</div></th>"
								+ "<th class='' style = 'width: 100px;'><div class='TextFont'>Profile Code</div></th>"
								+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>OPD Charges</div></th>";

						$
								.each(
										halldetails.hl,
										function(name, value) {
											PackageCharges = PackageCharges
													+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>"
													+ value.hn + "</div></th>";
										});
						PackageCharges = PackageCharges + "</tr>";
						$('#InvstTestHeading').after(PackageCharges);

						// var count = 1;
						$
								.each(
										pobj1.lbpkgli,
										function(name, value) {
											var Packagebody = "";
											Packagebody = Packagebody
													+ "<tr id=Test"
													+ count
													+ "><td class='center' style='height: 21.5px;width: 30px;'>"
													+ value.idlbpkg
													+ "</td><td class='' style='height: 21.5px;width: 200px;'>"
													+ value.pkgnm
													+ "</td><td class='' style='height: 21.5px;width: 100px;'>"
													+ value.pkgcod + "</td>";

											var packageChrgs = 0;
											var slaveid = 0;
											var hallid = 0;

											if (value.hallWsTestChrgsList.length > 0) {
												for ( var j = 0; j < value.hallWsTestChrgsList.length; j++) {
													if (value.hallWsTestChrgsList[j].hallID == 0) {
														packageChrgs = value.hallWsTestChrgsList[j].chrgs;
														slaveid = value.hallWsTestChrgsList[j].slaveId;
														hallid = 0;

														Packagebody = Packagebody
																+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
																+ value.idlbpkg
																+ "-HallID"
																+ hallid
																+ " value = '"
																+ packageChrgs
																+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'labprofilechargesslaveID"
																+ value.idlbpkg
																+ "-"
																+ hallid
																+ "' value = '"
																+ slaveid
																+ "' /></td>";
													}
												}
											} else {
												Packagebody = Packagebody
														+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
														+ value.idlbpkg
														+ "-HallID"
														+ hallid
														+ " value = '"
														+ value.pkgchrg
														+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'labprofilechargesslaveID"
														+ value.idlbpkg + "-"
														+ hallid
														+ "' value = '"
														+ slaveid + "' /></td>";
											}

											$
													.each(
															halldetails.hl,
															function(name,
																	hallvalue) {

																var isPresent = 0;
																for ( var i = 0; i < value.hallWsTestChrgsList.length; i++) {
																	if (hallvalue.hi == value.hallWsTestChrgsList[i].hallID) {
																		packageChrgs = value.hallWsTestChrgsList[i].chrgs;
																		slaveid = value.hallWsTestChrgsList[i].slaveId;
																		hallid = value.hallWsTestChrgsList[i].hallID;
																		isPresent = 1;
																		break;
																	}
																}
																if (isPresent > 0) {
																	Packagebody = Packagebody
																			+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
																			+ value.idlbpkg
																			+ "-HallID"
																			+ hallid
																			+ " value = '"
																			+ packageChrgs
																			+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'labprofilechargesslaveID"
																			+ value.idlbpkg
																			+ "-"
																			+ hallid
																			+ "' value = '"
																			+ slaveid
																			+ "' /></td>";
																} else {

																	packageChrgs = value.pkgchrg;
																	slaveid = 0;
																	hallid = hallvalue.hi;

																	Packagebody = Packagebody
																			+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
																			+ value.idlbpkg
																			+ "-HallID"
																			+ hallid
																			+ " value = '"
																			+ packageChrgs
																			+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'labprofilechargesslaveID"
																			+ value.idlbpkg
																			+ "-"
																			+ hallid
																			+ "' value = '"
																			+ slaveid
																			+ "' /></td>";
																}
															});

											Packagebody = Packagebody + "</tr>";

											$('#Test' + (count - 1)).after(
													Packagebody);
											count++;
										});

					} else {
						if (pobj1.lbpkgli.length == 0) {

							if (fetchtype != "onload")
								alert("Lab Package Name Not Found.");

						} else {
							$("#userMangTemp").setTemplate(
									defaultViewPackageTemp);
							$("#userMangTemp").processTemplate(pobj1);
							// For package Demo
							$("#userMangTempPakDemo").setTemplate(
									defaultViewPackageTempDemo);
							$("#userMangTempPakDemo").processTemplate(pobj1);
						}
						var sample = "";
						$("#infoDiv").setTemplate(
								$("#addViewProfileTemp").html());
						// $("#infoDiv").setTemplate(addPackageTemp);
						$("#infoDiv").processTemplate(sample);
					}
					$("#byName").val("");
				}
			});
}

// Function to save Hall wise charges of laboratory Packages

function saveLabPackageChargesSlave() {

	var result = $("#userObj").html();
	var testObj = eval('(' + result + ')');
	var halllist = $("#InvTestAllHallDetails").html();
	var halldetails = eval('(' + halllist + ')');

	var packageObj = 0;

	packageObj = {
		lbpkgli : []

	};

	for ( var i = 0; i < testObj.lbpkgli.length; i++) {

		var testid = testObj.lbpkgli[i].idlbpkg;
		var hallid = 0;
		var charges = $("#TestID" + testid + "-HallID0").val();
		var slaveid = $("#labprofilechargesslaveID" + testid + "-0").val();

		if (charges == "" || charges == null || charges == undefined) {
			charges = 0;
		}

		var hallwschrgslist = [];

		hallwschrgslist.push({
			"hallID" : hallid,
			"testID" : testid,
			"chrgs" : charges,
			"slaveId" : slaveid,
		});

		for ( var j = 0; j < halldetails.hl.length; j++) {
			var hlid = halldetails.hl[j].hi;
			var chrg = $("#TestID" + testid + "-HallID" + hlid).val();
			var slvid = $("#labprofilechargesslaveID" + testid + "-" + hlid)
					.val();

			if (chrg == "" || chrg == null || chrg == undefined) {
				chrg = 0;
			}

			hallwschrgslist.push({
				"hallID" : hlid,
				"testID" : testid,
				"chrgs" : chrg,
				"slaveId" : slvid
			});
		}

		packageObj.lbpkgli.push({
			"hallWsTestChrgsList" : hallwschrgslist,
			"idlbpkg" : testid
		});

	}

	packageObj = JSON.stringify(packageObj);
	var inputs = [];
	inputs.push('action=saveLabPackageHallWiseCharges');
	inputs.push('packageObj=' + encodeURIComponent(packageObj));
	inputs.push('sid=' + encodeURIComponent(0));
	inputs.push('pageType=' + encodeURIComponent("NormalCharges"));
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
			alert(r);
			location.reload();
		}
	});
}

function editPackage(idpkg) {
	$("#infoDiv").html("");
	$("#userID").val(idpkg);
	ajaxResponse = $("#userObj").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.lbpkgli.length; i++) {

		if (myArray.lbpkgli[i].idlbpkg == idpkg) {
			myObj1 = myArray.lbpkgli[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj1);
	userBean = eval('(' + myObj + ')');

	$("#infoDiv").setTemplate($("#editViewLabProfileTemp").html());
	$("#infoDiv").processTemplate(userBean);

	var ajaxResponse = $("#allHeadingDiv").html();
	pobj1 = eval('(' + ajaxResponse + ')');

	if (pobj1.lbHedLi.length > 0) {

		$("#heading").setTemplate(getAllHeadingPKGTemp);
		$("#heading").processTemplate(pobj1);

	}
	setTimeout(
			function() {

				$("#heading").val(userBean.idhed);
				featchProAndTest(userBean.idhed, 'pkg');

				setTimeout(
						function() {

							for ( var i = 0; i < userBean.pkgprotstli.length; i++) {
								if (userBean.pkgprotstli[i].typeTP == 'P') {
									$(
											"#procheck"
													+ userBean.pkgprotstli[i].idprotst)
											.attr("checked", true);

									sendProToAsignPkg(userBean.pkgprotstli[i].idprotst);

									$(
											'input[name="profileTest'
													+ userBean.pkgprotstli[i].idprotst
													+ '"]').each(function() {
										this.checked = false;
									});
									$(
											'input[name="profileTest'
													+ userBean.pkgprotstli[i].idprotst
													+ '"]')
											.each(
													function() {
														for ( var j = 0; j < userBean.pkgprotstli[i].lbpkgproli.length; j++) {
															if (userBean.pkgprotstli[i].lbpkgproli[j].idtst == this.value) {
																this.checked = true;
															}
														}
													});
								} else {
									$(
											"#testcheck"
													+ userBean.pkgprotstli[i].idprotst)
											.attr("checked", true);

									sendTestToAsignPkg(userBean.pkgprotstli[i].idprotst);
								}
							}
						}, 300);
			}, 500);
}

// Touheed
// code for lab package
// Date 18-Dec-2015
function editPackageDemo(idpkg) {

	$("#infoDiv").html("");
	$("#userID").val(idpkg);
	ajaxResponse = $("#userObj").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.lbpkgli.length; i++) {

		if (myArray.lbpkgli[i].idlbpkg == idpkg) {
			myObj1 = myArray.lbpkgli[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj1);
	userBean = eval('(' + myObj + ')');

	console.log(userBean);

	$("#testHead").html("Edit Lab Package");
	$("#heading").val(myObj1.hedId);
	$("#proNm").val(myObj1.pkgnm);
	$("#proCode").val(myObj1.pkgcod);
	$("#proCharge").val(myObj1.pkgchrg);
	$("#motivatorCash").val(myObj1.motivatorCash);
	$("#motivatorSponsored").val(myObj1.motivatorSponsored);
	$("#txtClinicPercent").val(myObj1.clinicPercent);
	$("#queryType").val("update");
	$("#userID").val(idpkg);
	$("#edit").val(1);

	var ajaxResponse = $("#allHeadingDiv").html();
	pobj1 = eval('(' + ajaxResponse + ')');

	// setTemplate1(pobj1);
	console.log(userBean);
	if (pobj1.lbHedLi.length > 0) {

		$("#heading").setTemplate(getAllHeadingPKGTemp);
		$("#heading").processTemplate(pobj1);

	}
	setTimeout(function() {

		$("#heading").val(userBean.idhed);
		featchProAndTest(userBean.idhed, 'pkg');

	}, 100);

	setTimeout(
			function() {

				var divContent = "<div  class='col-md-12-1' style='margin-top:0px;margin-left:-15px'><ol id='ol2'  class='connected list left'>";
				divContent = divContent
						+ "<lh draggable='false'><font color='#556B2F'><b>Drop Here..........!</b></font></lh>";

				for ( var i = 0; i < userBean.pkgprotstli.length; i++) {

					if (userBean.pkgprotstli[i].typeTP == "P") {

						var testrate = userBean.pkgprotstli[i].tstRt;
						var testcode = userBean.pkgprotstli[i].tstCod;
						var testname = userBean.pkgprotstli[i].tstNm;
						var proid = userBean.pkgprotstli[i].idprotst;

						divContent = divContent + "<li title='Amount-"
								+ testrate
								+ "' style= 'border: 1px solid #ffd2a6;'><b>"
								+ testcode + "</b>-";
						divContent = divContent + "<b>" + testname + "</b>";
						// divContent=divContent+ ":</b>";
						divContent = divContent + "<input id='pro" + proid
								+ "' type='hidden' value='" + proid
								+ "' name='proid'>";

						// inside profile
						for ( var j = 0; j < userBean.pkgprotstli[i].lbpkgproli.length; j++) {

							var tid = userBean.pkgprotstli[i].lbpkgproli[j].idtst;
							var proid = userBean.pkgprotstli[i].idprotst;
							var tcode = userBean.pkgprotstli[i].lbpkgproli[j].tstCod;
							var tname = userBean.pkgprotstli[i].lbpkgproli[j].tstNm;

							divContent = divContent + "<ol>";
							// for Profile Heading
							if (tid == 0) {

								divContent = divContent + "<lable><b>";
								divContent = divContent + tname;
								divContent = divContent + "</b></lable><br/>";

							} else {

								divContent = divContent
										+ "<input id='test"
										+ tid
										+ "' checked = 'true' type='checkbox' value='"
										+ tid + "' name='chk" + proid + "' />";
								divContent = divContent + tcode + "-" + tname;
								divContent = divContent + "<br />";
							}

							divContent = divContent + "</ol>";
						}
						divContent = divContent + "</li>";

					} else if (userBean.pkgprotstli[i].typeTP == "T") {

						var trate = userBean.pkgprotstli[i].tstRt;
						var tcode = userBean.pkgprotstli[i].tstCod;
						var tname = userBean.pkgprotstli[i].tstNm;
						var proid = userBean.pkgprotstli[i].idprotst;

						divContent = divContent + "<li title='Amount-" + trate
								+ "' style= 'border: 1px solid #ddd;'>" + tcode
								+ " - ";
						divContent = divContent + tname;
						// divContent=divContent+ ":</b>";
						divContent = divContent + "<input id='pro" + proid
								+ "' type='hidden' value='" + proid
								+ "' name='testid' />";
						divContent = divContent + "<br />";
						divContent = divContent + "</li>";

					} else if ((userBean.pkgprotstli[i].idprotst == "0")) {
						var tstNm = userBean.pkgprotstli[i].tstNm;

						divContent = divContent + "<li><b>" + tstNm + "</b>";
						divContent = divContent
								+ "<input  type='hidden' value='" + tstNm
								+ "' name='headNameP'></li>";
					}
				}

				divContent = divContent + "</ol></div>";
				$("#rightDiv").html(divContent);

				sort();

			}, 400);

}

function sendPkgProTestToRemove(proId) {

	$('#proAssignDiv' + proId).remove();
	$('#procheck' + proId).attr("checked", false);
}

function sendPkgTestToRemove(tid) {
	$('#testAssignDiv' + tid).remove();
	$('#testcheck' + tid).attr("checked", false);
}

function deletePackage(idGroup) {
	var r = confirm("Are You Confirm To Remove Lab Package.");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteLabProfiles');
		inputs.push('idGroup=' + idGroup);
		inputs.push('type=pkg');
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
				alert(ajaxResponse);
				location.reload();

			}
		});
	}
}

function viewFlowChartForPrevious(idtestmstr, pid) {

	var patientTest = $("#pathologyAllPatInfo").html();

	var myArray = JSON.parse(patientTest);
	var haemoObj = "";
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == pid) {
			myObj1 = myArray.pl[i];
			for ( var k = 0; k < myObj1.haemDyLi.length; k++) {
				if (myObj1.haemDyLi[k].mid == idtestmstr) {
					haemoObj = myObj1.haemDyLi[k];
					break;
				}
			}
		}
	}
	myObj = JSON.stringify(myObj1);
	var sBean = myObj;
	// alert(sBean);
	window.location.href = "haemodialysisReport.jsp?testmasterId=" + idtestmstr
			+ "&patientdetails=" + decodeURIComponent(sBean) + "&pageName="
			+ "Previous" + "&trid=" + haemoObj.tid;
	// alert("4");

}
/** ********************************************************************************************************************************* */
var count = 0;
var previousHaemodialysisFlowChart = "<table class='table table-bordered table-condensed cf' style='margin-bottom: 0px;'>"
		+ "{#foreach $T.objtrop as pl}"
		+ "<tr>"
		+ "<td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont'>{count++}</div></td> "
		+ "<td style='height: 21.5px;' class='numeric col-md-1-1 center'><div class='TextFont'>{$T.pl.tit}{$T.pl.fn} {$T.pl.ln}</div></td>"
		+ "<td style='height: 21.5px;' class='col-md-2-1 center'><div class='TextFont'>{$T.pl.pi}</div></td>"
		+ "<td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont'>{$T.pl.rgDt}</div></td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1-1 center'><div style='width: 12%; height: 25px; border-right: 1px solid #069; padding-left: 2%; padding-top: 3px; text-align: center;'"
		+ "onclick='hideShowPreOPDBill({count})'>"
		+ "<img src='images/down.png' id='imgupdown{count}' /> <input"
		+ "type='hidden' id='hideShowStatus{count}' value='0' />"
		+ "</div></td>" + "</tr>" + "{#/for}" + "</table>";

function PatientDashboardForHaemodialysis(type) {
	var strValue = $.trim($("#byName").val());
	if (strValue == "" && type == "search") {
		alert("Please Insert Something For Search");
		return false;
	}
	var inputs = [];
	inputs.push('action=PatientDashboardForHaemodialysis');
	inputs.push('strValue=' + encodeURIComponent(strValue));
	inputs.push('type=' + type);

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
			// alert(r);
			// alert(count);
			count = 1;

			var pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.pl.length > 0) {

				$("#pathologyAllPatInfo").html(ajaxResponse);

				// $("#patientcontainer").setTemplate($("#getPatientTestDashTemp").html());

				// not working...
				// $("#patientcontainer").setTemplate(previousHaemodialysisFlowChart);
				$("#patientcontainer").processTemplate(pobj1);

				var rowCount = $("#rowCount").val();
				for ( var i = 1; i <= rowCount; i++) {
					$("#patPreOPDBill" + i).hide();
				}
			} else {
				$("#patientcontainer").html("");
				alert("Lab Patient Name  Not Found.");
			}

		}
	});
}

var testRowCount = 1;
var TestDash = '{#foreach $T.testDashboard as test}<tr>'
		+ '<td class="col-md-1-1 center">{testRowCount}.</td>'
		+ '<td class="col-md-2-1 center">{$T.test.perticuler}</td>'
		+ '<td class="col-md-1-1 center">{$T.test.date} </td>'
		+ '<td class="col-md-2-1 center">{$T.test.consultant}</td>'
		+ '<td class="col-md-3-1 center">{$T.test.desciption}</td>'
		+ '<td class="col-md-1-1 center">{$T.test.testType}</td>'
		+ '{#if $T.test.status=="N"}'
		+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testRowCount}" style="width:60px; background-color: green;" disabled></input></td>'
		+ '<td class="col-md-1-1 center">'
		+ '<input id="checkboxTest{testRowCount}" type="checkbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" onclick="unCheckTestCheckBox({testRowCount++},{$T.test.id})"/></td>'
		+ '{#/if}'
		+ '{#if $T.test.status=="Y"}'
		+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testRowCount}" style="width:60px; background-color: red;" disabled></input></td>'
		+ '<td class="col-md-1-1 center">'
		+ '<input id="checkboxTest{testRowCount}" type="checkbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" onclick="unCheckTestCheckBox({testRowCount++},{$T.test.id})" disabled = true/></td>'
		+ '{#/if}' + '</tr>{#/for}';

var testRowCount = 1;
var TestDashNursing = '{#foreach $T.testDashboard as test}<tr>'
		+ '<td class="col-md-1-1 center">{testRowCount}.</td>'
		+ '<td class="col-md-2-1 center">{$T.test.perticuler}</td>'
		+ '<td class="col-md-1-1 center">{$T.test.date} </td>'
		+ '<td class="col-md-2-1 center">{$T.test.consultant}</td>'
		+ '<td class="col-md-3-1 center">{$T.test.desciption}</td>'
		+ '<td class="col-md-1-1 center">{$T.test.testType}</td>'
		+ '{testRowCount++}</tr>{#/for}';

var coverSheetInvestDashBoardVar = '{#foreach $T.testDashboard as test}{#if $T.test.testType=="Investigation"}<tr>'
		+ '<td class="col-md-1-1 TextFont">{testRowCount++}.</td>'
		+ '<td class="col-md-4-1 TextFont">{$T.test.perticuler}</td>'
		+ '<td class="col-md-2-1 TextFont">{$T.test.date}</td>'
		+ '<td class="col-md-2-1">'
		+ '<button class="btn btn-xs btn-success"><i class="fa fa-edit"></i></button> '
		+ ' <button class="btn btn-xs btn-primary"><i class="fa fa-credit-card"></i></button>'
		+ '</td>' + '{#/if}</tr>{#/for}';

var coverSheetLabDashBoardVar = '{#foreach $T.testDashboard as test}{#if $T.test.testType=="Pathology"}<tr>'
		+ '<td class="col-md-1-1 TextFont">{testRowCount++}.</td>'
		+ '<td class="col-md-4-1 TextFont">{$T.test.perticuler}</td>'
		+ '<td class="col-md-2-1 TextFont">{$T.test.date}</td>'
		+ '<td class="col-md-2-1 TextFont">{$T.test.time}</td>'
		/*
		 * + '<td class="col-md-1-1">' + '<button class="btn btn-xs
		 * btn-success"><i class="fa fa-edit"></i></button> ' + ' <button
		 * class="btn btn-xs btn-primary"><i class="fa fa-credit-card"></i></button>' + '</td>'
		 */
		+ '{#/if}</tr>{#/for}';

/*
 * function fetchTestDashboard(treatID) { alert("Treatment ID "+ treatID); if
 * (treatID != null) {
 * 
 * var inputs = []; inputs.push('action=fetchTestForDashboard');
 * inputs.push('treatmentId=' + treatID); } else { var inputs = [];
 * inputs.push('action=fetchTestForDashboard'); inputs.push('treatmentId=' +
 * $("#treatmentId").val()); } var str = inputs.join('&'); jQuery.ajax({ async :
 * true, type : "POST", data : str + "&reqType=AJAX", url : "PathologyServlet",
 * timeout : 1000 * 60 * 5, catche : false, error : function() {
 * //alert("error"); }, success : function(r) { ajaxResponse = r;
 * $("#CPOE_TestDetails").html(ajaxResponse); var pobj1 = eval('(' +
 * ajaxResponse + ')');
 * 
 * if (treatID != null) { alert("In Set Template"); testRowCount = 1;
 * $("#testDash").setTemplate(TestDash); $("#testDash").processTemplate(pobj1);
 * $('#CPOE_testId').val(""); $('#CPOErowCount').val("0"); } else { // cover
 * sheet: Investigation testRowCount = 1;
 * $("#coverSheetInvestDashBoard").setTemplate( coverSheetInvestDashBoardVar);
 * $("#coverSheetInvestDashBoard").processTemplate(pobj1);
 * 
 * coverSheetLabDashBoard testRowCount = 1;
 * $("#coverSheetLabDashBoard").setTemplate( coverSheetLabDashBoardVar);
 * $("#coverSheetLabDashBoard").processTemplate(pobj1); } } }); }
 */

var dischargeSummaryTemplate = '{#foreach $T.testDashboard as test}<tr>'
		+ '<td class="col-md-1-1 center">{testRowCount++}.</td>'
		+ '<td class="col-md-3-1 center">{$T.test.perticuler}</td>'
		+ '<td class="col-md-1-1 center">{$T.test.date} </td>'
		+ '<td class="col-md-1-1 center">{$T.test.desciption}</td>'
		+ '<td class="col-md-1-1 center">{$T.test.testType}</td>'
		+ '<input id="checkboxTest{testRowCount}" type="hidden" value="{$T.test.id})" >'
		+ '</tr>{#/for}';

function fetchTestDashboard() {
	var inputs = [];
	inputs.push('action=fetchTestForDashboard');
	inputs.push('treatmentId=' + $("#tid").val()); // added by sagar
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
			// alert(r);
			$("#CPOE_TestDetails").html(ajaxResponse);
			var pobj1 = eval('(' + ajaxResponse + ')');
			testRowCount = 1;
			$("#testDash").setTemplate(TestDash);
			$("#testDash").processTemplate(pobj1);
			// Nurisng Dashboard
			$("#testDashNursing").setTemplate(TestDashNursing);
			$("#testDashNursing").processTemplate(pobj1);

			$('#CPOE_testId').val("");
			$('#CPOErowCount').val("0");

			// cover sheet IPD or OPD: Investigation
			testRowCount = 1;
			// $("#coverSheetInvestDashBoard").setTemplate(
			// coverSheetInvestDashBoardVar);
			// $("#coverSheetInvestDashBoard").processTemplate(pobj1);

			/* coverSheetLabDashBoard */
			testRowCount = 1;
			// $("#coverSheetLabDashBoard").setTemplate(
			// coverSheetLabDashBoardVar);
			// $("#coverSheetLabDashBoard").processTemplate(pobj1);

			testRowCount = 1;
			$("#dischargeSummaryTemplate")
					.setTemplate(dischargeSummaryTemplate);
			$("#dischargeSummaryTemplate").processTemplate(pobj1);
			/* Auto Discharge Summary */

		}
	});
}

function fetchTestDash(treatID) {
	var tr = treatID;
	var inputs = [];
	inputs.push('action=fetchTestForDashboard');
	inputs.push('treatmentId=' + tr);
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
					var pobj1 = eval('(' + ajaxResponse + ')');

					testRowCount = 1;
					$("#testtDash").setTemplate(TestDash);
					$("#testtDash").processTemplate(pobj1);
					$('#CPOE_testId').val("");
					$('#CPOErowCount').val("0");

					// cover sheet: Investigation
					testRowCount = 1;
					$("#coverSheetInvestDashBoard").setTemplate(
							coverSheetInvestDashBoardVar);
					$("#coverSheetInvestDashBoard").processTemplate(pobj1);

					/* coverSheetLabDashBoard */
					testRowCount = 1;
					$("#coverSheetLabDashBoard").setTemplate(
							coverSheetLabDashBoardVar);
					$("#coverSheetLabDashBoard").processTemplate(pobj1);

				}
			});
}

// Author : nIKHIL; Date : 13/10/2014;
// modified : Abhijit; Date : 10/11/2014;
function unCheckTestCheckBox(testRowNo, testID) {
	for ( var rowNum = 1; rowNum < testRowCount; rowNum++) {
		if (rowNum == testRowNo)
			continue;

		var checkboxID = 'checkboxTest' + rowNum;
		document.getElementById(checkboxID).checked = false;
	}

	$("#CPOE_testId").val(testID);
	$("#CPOErowCount").val(testRowNo);

}

function fetchDoctorHospital() {
	count = 1;
	var inputs = [];
	inputs.push('action=fetchDoctorHospital');
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PathologyServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					var ajaxResponse = r;
					$("#testDetails").html(ajaxResponse);
					var pobj1 = eval('(' + ajaxResponse + ')');

					$("#doctor")
							.setTemplate(
									"<option value='0' selected='selected'>-Select-</option>{#foreach $T.cdl as tl}<option value='{$T.tl.cid}'>{$T.tl.cdn}</option>{#/for}");
					$("#doctor").processTemplate(pobj1);

					$("#hospital")
							.setTemplate(
									"<option value='0' selected='selected'>-Select-</option>{#foreach $T.cdl["
											+ (pobj1.cdl.length - 1)
											+ "].chann_hosList as tl}<option value='{$T.tl.id}'>{$T.tl.hosName}</option>{#/for}");
					$("#hospital").processTemplate(pobj1);

					$("#doctor1")
							.setTemplate(
									"<option value='0' selected='selected'>Select</option>{#foreach $T.cdl as tl}<option value='{$T.tl.cid}'>{$T.tl.cdn}</option>{#/for}");
					$("#doctor1").processTemplate(pobj1);

					$("#hospital1")
							.setTemplate(
									"<option value='0' selected='selected'>Select</option>{#foreach $T.cdl["
											+ (pobj1.cdl.length - 1)
											+ "].chann_hosList as tl}<option value='{$T.tl.id}'>{$T.tl.hosName}</option>{#/for}");
					$("#hospital1").processTemplate(pobj1);

					/*
					 * $("#doctor2") .setTemplate( "<option value='0'
					 * selected='selected'>Select</option>{#foreach $T.cdl as
					 * tl}<option value='{$T.tl.cid}'>{$T.tl.cdn}</option>{#/for}");
					 * $("#doctor2").processTemplate(pobj1);
					 */
					$("#hospital2")
							.setTemplate(
									"<option value='0' selected='selected'>Select</option>{#foreach $T.cdl["
											+ (pobj1.cdl.length - 1)
											+ "].chann_hosList as tl}<option value='{$T.tl.id}'>{$T.tl.hosName}</option>{#/for}");
					$("#hospital2").processTemplate(pobj1);

					$("#doctor3")
							.setTemplate(
									"<option value='0'>Select</option>{#foreach $T.cdl as tl}<option value='{$T.tl.cid}'>{$T.tl.cdn}</option>{#/for}");
					$("#doctor3").processTemplate(pobj1);

					$("#hospital3")
							.setTemplate(
									"<option value='0'>Select</option>{#foreach $T.cdl["
											+ (pobj1.cdl.length - 1)
											+ "].chann_hosList as tl}<option value='{$T.tl.id}'>{$T.tl.hosName}</option>{#/for}");
					$("#hospital3").processTemplate(pobj1);

					$("#diagnosisDoctor")
							.setTemplate(
									"<option value='0'>Select</option>{#foreach $T.cdl as tl}<option value='{$T.tl.cid}'>{$T.tl.cdn}</option>{#/for}");
					$("#diagnosisDoctor").processTemplate(pobj1);

					$("#diagnosisHospital")
							.setTemplate(
									"<option value='0'>Select</option>{#foreach $T.cdl["
											+ (pobj1.cdl.length - 1)
											+ "].chann_hosList as tl}<option value='{$T.tl.id}'>{$T.tl.hosName}</option>{#/for}");
					$("#diagnosisHospital").processTemplate(pobj1);

					$("#editDiagnosisDoctor")
							.setTemplate(
									"<option value='0'>Select</option>{#foreach $T.cdl as tl}<option value='{$T.tl.cid}'>{$T.tl.cdn}</option>{#/for}");
					$("#editDiagnosisDoctor").processTemplate(pobj1);

					$("#editDiagnosisHospital")
							.setTemplate(
									"<option value='0'>Select</option>{#foreach $T.cdl["
											+ (pobj1.cdl.length - 1)
											+ "].chann_hosList as tl}<option value='{$T.tl.id}'>{$T.tl.hosName}</option>{#/for}");
					$("#editDiagnosisHospital").processTemplate(pobj1);

					$("#doctorForPhysiotherapy")
							.setTemplate(
									"<option value='0'>Select</option>{#foreach $T.cdl as tl}<option value='{$T.tl.cid}'>{$T.tl.cdn}</option>{#/for}");
					$("#doctorForPhysiotherapy").processTemplate(pobj1);

					$("#hospitalForPhysiotherapy")
							.setTemplate(
									"<option value='0'>Select</option>{#foreach $T.cdl["
											+ (pobj1.cdl.length - 1)
											+ "].chann_hosList as tl}<option value='{$T.tl.id}'>{$T.tl.hosName}</option>{#/for}");
					$("#hospitalForPhysiotherapy").processTemplate(pobj1);

					$("#doctorForOther")
							.setTemplate(
									"<option value='0'>Select</option>{#foreach $T.cdl as tl}<option value='{$T.tl.cid}'>{$T.tl.cdn}</option>{#/for}");
					$("#doctorForOther").processTemplate(pobj1);

					$("#hospitalForOther")
							.setTemplate(
									"<option value='0'>Select</option>{#foreach $T.cdl["
											+ (pobj1.cdl.length - 1)
											+ "].chann_hosList as tl}<option value='{$T.tl.id}'>{$T.tl.hosName}</option>{#/for}");
					$("#hospitalForOther").processTemplate(pobj1);

				}
			});
}

// Author : nIKHIL; Date : 13/10/2014;
// modified : Abhijit; Date : 10/11/2014;
function editCPOE_Test() {

	var CPOErowCount = $("#CPOErowCount").val();
	if (($("#testDash").html()) == "") {
		alert("No Data to Edit CPOE Test");
		return;
	}
	if (CPOErowCount == '0') {
		alert("Please check the CheckBox...");
		return;
	}

	var ajaxResponse = $("#CPOE_TestDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	/*
	 * for ( var i = 0; i < myArray.testDashboard.length; i++) { if
	 * (myArray.testDashboard[i].id == id) { myObj1 = myArray.testDashboard[i];
	 * break; } }
	 */
	CPOErowCount = CPOErowCount - 1;
	myObj1 = myArray.testDashboard[CPOErowCount];

	if (myObj1.testType == "Investigation") {
		// $("Investigation").removeAttr("class");
		// $("InvestigationList").removeAttr("class");
		// $("CasualityServices").removeAttr("class");
		// $("CasualityServicesList").removeAttr("class");
		// $('#PathologyList').attr('class', 'in active');
		// $('#Pathology').attr('class', 'in active');

		$("#InvestigationQueryType").val('update');

		$("#billSlaveID").val(myObj1.billSlaveID);
		$("#investigationSlaveID").val(myObj1.investigationSlaveID);

		$("#testCodeInvestigation").val(myObj1.testCode);
		$("#testCodeInvestigation").prop("readonly", true);
		$("#investigationtestId").val(myObj1.testCode);

		$("#InvestigationTestName").val(myObj1.perticuler);
		$("#InvestigationTestName").prop("readonly", true);

		$("#investigationInstruction").val(myObj1.instructions);
		$("#investigationClinicalNote").val(myObj1.clinicalNotes);
		$("#doctor2").val(myObj1.refDocId);
		$("#hospital2").val(myObj1.refHospId);

		$("#radiologyTestType").val(myObj1.idradiologyGroup);
		$("#radiologyTestType").attr("disabled", true);
		$("#radiologyBodyPart").val(myObj1.idradiologyBodyPart);
		$("#radiologyBodyPart").attr("disabled", true);

		if (myObj1.urgentflag == "1")
			$('#InvestigationUrgent').prop('checked', true);
		else
			$('#InvestigationUrgent').prop('checked', false);

	} else if (myObj1.testType == "Casuality") {

		// $("Investigation").removeAttr("class");
		// $("InvestigationList").removeAttr("class");
		// $("PathologyList").removeAttr("class");
		// $("Pathology").removeAttr("class");
		// $('#CasualityServices').attr('class', 'in active');
		// $('#CasualityServicesList').attr('class', 'in active');

		$("#casualityServiceQueryType").val('update');
		$("#billSlaveID").val(myObj1.billSlaveID);
		// idCasualtyTreatment
		$("#idCasualtyTreatment").val(myObj1.idcasualityservice);

		$("#casualityTest_Code").val(myObj1.testCode);
		$("#casualityTest_Code").prop("readonly", true);
		$("#casualitytestId").val(myObj1.testCode);

		$("#txtCasualityTestName").val(myObj1.perticuler);
		$("#txtCasualityTestName").prop("readonly", true);

		$("#casualityInstruction").val(myObj1.instructions);
		$("#casualityClinicalNote").val(myObj1.clinicalNotes);
		$("#doctor3").val(myObj1.refDocId);
		$("#hospital3").val(myObj1.refHospId);

		if (myObj1.urgentflag == "1")
			$('#casualityUrgent').prop('checked', true);
		else
			$('#casualityUrgent').prop('checked', false);

	} else if (myObj1.testType == "Pathology") {
		alert("Pathology Test can't be edited after assinged..!");
		// fetchTestDashboard();
		// $('#CPOE_testId').val("");
		// $('#CPOErowCount').val("0");
	} else if (myObj1.testType == "Physiotherapy") {
		$("#physiotherapyQueryType").val('update');
		$("#billSlaveID").val(myObj1.billSlaveID);
		$("#idPhysiotherapyTreatment").val(myObj1.idcasualityservice);

		$("#physiotherapyTest_Code").val(myObj1.testCode);
		$("#physiotherapyTest_Code").prop("readonly", true);
		$("#physiotherapytestId").val(myObj1.testCode);

		$("#txtPhysiotherapyTestName").val(myObj1.perticuler);
		$("#txtPhysiotherapyTestName").prop("readonly", true);

		$("#physiotherapyInstruction").val(myObj1.instructions);
		$("#physiotherapyClinicalNote").val(myObj1.clinicalNotes);
		$("#doctorForPhysiotherapy").val(myObj1.refDocId);
		$("#hospitalForPhysiotherapy").val(myObj1.refHospId);
	} else if (myObj1.testType == "Other") {
		$("#otherServiceQueryType").val('update');
		$("#billSlaveID").val(myObj1.billSlaveID);
		// idCasualtyTreatment
		$("#idOtherTreatment").val(myObj1.idcasualityservice);

		$("#otherTest_Code").val(myObj1.testCode);
		$("#otherTest_Code").prop("readonly", true);
		$("#othertestId").val(myObj1.testCode);

		$("#txtOtherTestName").val(myObj1.perticuler);
		$("#txtOtherTestName").prop("readonly", true);

		$("#otherInstruction").val(myObj1.instructions);
		$("#otherClinicalNote").val(myObj1.clinicalNotes);
		$("#doctorForOther").val(myObj1.refDocId);
		$("#hospitalForOther").val(myObj1.refHospId);
	}

}

// Author : nIKHIL; Date : 15/10/2014;
function deleteCPOE_Test() {

	if (($("#testDash").html()) == "") {
		alert("No Data to Delete CPOE Test");
		return;
	}
	var CPOErowCount = $("#CPOErowCount").val();
	if (CPOErowCount == '0') {
		alert("Please check the CheckBox...");
		return;
	}

	var ajaxResponse = $("#CPOE_TestDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	CPOErowCount = CPOErowCount - 1;
	myObj1 = myArray.testDashboard[CPOErowCount];

	if (myObj1.testType == "Pathology") {
		alert("Pathology Test can't be deleted after Assigned..!");
		// fetchTestDashboard();
		// $('#CPOE_testId').val("");
		// $('#CPOErowCount').val("0");
		return;
	}

	var r = confirm("Please confirm to Delete Record?");
	if (r == true) {
		/*
		 * var CPOE_testId = $('#CPOE_testId').val(); var ajaxResponse =
		 * $("#CPOE_TestDetails").html(); var myArray =
		 * JSON.parse(ajaxResponse.decodeSpecialChars()); for ( var i = 0; i <
		 * myArray.testDashboard.length; i++) { if (myArray.testDashboard[i].id ==
		 * CPOE_testId) { myObj1 = myArray.testDashboard[i]; break; } }
		 */

		// PK of test table
		var CPOE_testId = $('#CPOE_testId').val();
		var testType = myObj1.testType;
		var trId = $("#treatmentId").val();
		var inputs = [];
		inputs.push('action=deleteCPOE_Test');
		inputs.push("CPOE_testId=" + CPOE_testId);
		inputs.push("trId=" + trId);
		inputs.push('testType=' + encodeURIComponent(testType));
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PathologyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				// fetchTestDashboard();

				// $("#CPOErowCount").val("0");
				// $('#CPOE_testId').val("");

				// window.location.reload();

				if (myObj1.testType == "Investigation") {

					$("#InvestigationTestName").val("");
					$("#InvestigationTestName").prop("readonly", false);
					$("#InvestigationQueryType").val("insert");
					$('#investigationtestId').val("0");
					$("#investigationInstruction").val("");
					$("#investigationClinicalNote").val("");
					$("#testCodeInvestigation").val("");
					$("#radiologyTestType").val("select");
					$("#radiologyBodyPart").val("select");
					$("#doctor2").val("0");
					$("#hospital2").val("0");
					$("#charges1").val("0");
					$("#billSlaveID").val("0");
					$("#investigationSlaveID").val("0");
					$('#InvestigationUrgent').prop('checked', false);

				} else if (myObj1.testType == "Casuality") {

					$("#casualityServiceQueryType").val('insert');
					$("#billSlaveID").val("0");
					// idCasualtyTreatment
					$("#idCasualtyTreatment").val("0");
					$("#casualityTest_Code").val("");
					$("#casualitytestId").val("0");
					$("#txtCasualityTestName").val("");
					$("#txtCasualityTestName").prop("readonly", false);
					$("#casualityInstruction").val("");
					$("#casualityClinicalNote").val("");
					$("#doctor3").val("0");
					$("#hospital3").val("0");
					$('#casualityUrgent').prop('checked', false);
				} else if (myObj1.testType == "Physiotherapy") {

					$("#physiotherapyQueryType").val('insert');
					$("#billSlaveID").val("0");
					$("#idPhysiotherapyTreatment").val("0");
					$("#physiotherapyTest_Code").val("");
					$("#physiotherapytestId").val("0");
					$("#txtPhysiotherapyTestName").val("");
					$("#physiotherapyInstruction").val("");
					$("#physiotherapyClinicalNote").val("");
					$("#doctorForPhysiotherapy").val("0");
					$("#hospitalForPhysiotherapy").val("0");
				}
			}
		});

	}
}

function uploadDigitalSignatureLogo() {
	var filePath = $("#fileUp").val();
	// alert("filePath..."+filePath);
	if (filePath.length == 0) {
		alert("Please Select File To Upload.");
	} else {
		var arr = [];
		var extension;
		arr = filePath.split(".");
		extension = arr[arr.length - 1];

		if (extension == "jpg" || extension == "jpeg" || extension == "tft"
				|| extension == "png" || extension == "JPG"
				|| extension == "JPEG" || extension == "TFT"
				|| extension == "PNG" || extension == "bmp"
				|| extension == "BMP") {
		} else {
			alert("Please Select Valid Image Format (.jpg, .jpeg, .png, .bmp, .tft) To Upload.");
			return false;
		}
		$("#fileUploadfrm").attr("action",
				"DigitalSignatureUploadServlet?filePath=" + filePath);
		setTimeout(function() {
			/*
			 * $("#fileUploadfrm").submit(function(e) { var formObj = $(this);
			 * 
			 * var formData = new FormData(this); $.ajax({ url:
			 * "HospitalLogoUploadServlet?filePath=" + filePath, type: 'POST',
			 * data: formData, mimeType:"multipart/form-data", contentType:
			 * false, cache: false, processData:false, success: function(data,
			 * textStatus, jqXHR) { }, error: function(jqXHR, textStatus,
			 * errorThrown) { } }); // e.preventDefault(); //Prevent Default
			 * action. // e.unbind(); }); $("#fileUploadfrm").submit(); //
			 * Submit the form
			 */
			$("#fileUploadfrm").ajaxForm().submit();
		}, 500);
	}
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

function fetchOnLoadDigitalSignatureImage() {
	var inputs = [];
	inputs.push('action=fetchOnLoadDigitalSignatureImage');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			// alert("ajaxResponse..."+ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			// $("#ImgData").html(r);

			if (pobj1.listHosDetail.length > 0) {
				$("#patImg").attr("src",
						pobj1.listHosDetail[0].digitalSignature);
				$("#DigsignHiddenId").val(pobj1.listHosDetail[0].idhp);
			}
		}
	});
}

function saveDigitalSignatureImage() {
	if ($("#fileUp").val() == "") {
		filePath = document.getElementById('patImg').getAttribute('src');
	} else {
		filePath = "images/Hospital/" + $("#fileUp").val();
	}

	var inputs = [];
	inputs.push('action=saveDigitalSignatureDetails');

	inputs.push('filePath=' + encodeURIComponent(filePath));
	var DigsignHiddenId = $("#DigsignHiddenId").val();

	inputs.push('idhp=' + DigsignHiddenId);

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
			alert(r);
			location.reload();
		}
	});
}

// Touheed
// Code for enabling profile Date:09-12-15
function enableProfileTes() {

	$("#testHead").html("Add Profile");
	$("#heading").val("select");
	$("#proNm").val("");
	$("#proCode").val("");
	$("#motivatorCash").val("");
	$("#motivatorSponsored").val("");
	$("#proCharge").val("");
	$("#queryType").val("insert");
	$("#idPro").val("0");
	makeDivEmptyt1();
	makeDivEmptyt2();
	$("#callTime").val(0);
}
// Touheed
// Make tb2 refresh Date:09-12-15
function makeDivEmptyt2() {

	// inside div make tb2 table empty
	var fake = $("#fake").html();
	pobj1 = eval('(' + fake + ')');
	$("#tb2").setTemplate(enableDropdown);
	$("#tb2").processTemplate(pobj1);

}

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 09-Dec-2016
 * @codeFor : Make tb1 refres
 ******************************************************************************/
function makeDivEmptyt1() {

	// inside div make tb2 table empty
	var fake = $("#fake").html();
	pobj1 = eval('(' + fake + ')');
	$("#tb1").setTemplate(tempDragDrop);
	$("#tb1").processTemplate(pobj1);

}

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 09-Dec-2016
 * @codeFor : Resfreshing page without reloading url
 ******************************************************************************/
function redirectPackage() {
	// window.location = 'pathologyPackagesDemo.jsp';
	$("#testHead").html("Add Lab Package");
	$("#heading").val("select");
	$("#proNm").val("");
	$("#motivatorCash").val("");
	$("#motivatorSponsored").val("");
	$("#proCode").val("");
	$("#proCharge").val("");
	$("#queryType").val("insert");
	$("#userID").val(0);
	$("#strValue1").val("");

	var fake = $("#fake").html();
	pobj1 = eval('(' + fake + ')');
	// making left div empty
	$("#leftDiv").setTemplate(fake);
	$("#leftDiv").processTemplate(pobj1);
	// making Right div empty
	$("#rightDiv").setTemplate(fake);
	$("#rightDiv").processTemplate(pobj1);

	$("#headingCall").val(0);

}

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 10-Feb-2016
 * @codeFor : Print lab result
 ******************************************************************************/
function printLabResult(callfrom) {

	var reportTestCount = $("#reportTestCount").val();

	var resultcnt = 0;

	for ( var k = 1; k <= reportTestCount; k++) {

		var testval = $("#testvalue" + k).val();
		var testtempval = $("#tempTestValue" + k).val();

		if (testval == "-" || testval == undefined || testval == "") {

			resultcnt++;

		}
		if (testtempval != undefined) {

			if (testtempval == "-" || testtempval == "") {

				resultcnt++;

			} else {
				resultcnt = 0;
			}
		}

	}

	if (resultcnt == reportTestCount) {
		alert("At least one Test Result should be filled for Print..!");
		return false;
	}

	ajaxResponse = $("#patientdetails").html();
	// alert("ajaxResponse..."+ajaxResponse);
	myArray = JSON.parse(ajaxResponse);

	/*
	 * for ( var i = 0; i < myArray.pl.length; i++) { if (myArray.pl[i].pi ==
	 * pid) { myObj = myArray.pl[i]; var aaaa = myObj.town; alert("aaaa"+aaaa); } }
	 */
	// var IdPathologist = $("#IdPathologist").val();
	var TechnicianName = $("#TechnicianName").val();
	var TechN = "withN";// $('input[name=printTech]:checked').val();
	// var TechN1 = $('input[name=printTech1]:checked').val();
	myObj = myArray;
	myObj = JSON.stringify(myObj);
	// alert("myObj..."+myObj);
	var advice = $("#txtReportNote").val();
	if (advice == "") {
		advice = 0;
	}
	// alert("advice.."+advice);
	var testmasterId = $.trim($('#testmasterId').html());
	var treatmentId = $.trim($('#treatmentId').html());
	if (callfrom == 'print') {
		setTimeout(function() {
			window
					.open(("labResultPDF.jsp?" + "&testmasterId="
							+ testmasterId + "&treatmentId=" + treatmentId
							+ "&TechN=" + encodeURIComponent(TechN)));
		}, 300);
	} else if (callfrom == 'printGen') {
		setTimeout(function() {
			window
					.open(("labResultPDFGen.jsp?" + "&testmasterId="
							+ testmasterId + "&treatmentId=" + treatmentId
							+ "&TechN=" + encodeURIComponent(TechN)));
		}, 300);

	} else {
		setTimeout(function() {
			window
					.open(("labResultPDFNoFoHe.jsp?" + "&testmasterId="
							+ testmasterId + "&treatmentId=" + treatmentId
							+ "&TechN=" + encodeURIComponent(TechN)));
		}, 300);
	}

	return;

}

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 16-Feb-2016
 * @codeFor : Hide Pop up
 ******************************************************************************/
function hideiPopupFormula() {
	$("#iPopupFormula").hide('hide');
}

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 18-Feb-2016
 * @codeFor : Fetching lab result is posted,if posted then data of that posted
 *          test
 ******************************************************************************/
function fetchLabResultData(callfrom) {
	var treatmentId = $.trim($('#treatmentId').val());
	var inputs = [];
	//inputs.push('action=fetchLabResultData');
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				//url : "PathologyServlet",
				url : "./ehat/ipdhistory/fetchLabResultData",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					// alert(r);
					if ((r.trim()) != "") {
						var html = "<tr>";

						var labdata = r;
						var maindata = labdata.split("~");
						// var data = maindata.split("$");
						var count = 1;
						for ( var i = 0; i < maindata.length; i++) {
							var data = maindata[i].split("$");
							// alert(data[0]+data[1]+data[2]+data[3]);
							var flag = data[0];
							var id = data[1];
							var date = data[2];
							var time = data[3];

							if ($.trim(flag) == "Y") {

								/*
								 * html = html+'<div class="col-md-4-1"
								 * style="background-color: #ccffeb; margin-top:
								 * 0px;">' +'<input id="btn'+count+'"
								 * type="radio" name="postbtn"
								 * onclick="changeValueForResult(this.value)"
								 * value="'+flag+'^'+id+'^'+date+'^'+time+'" ><b>Post'+count+'</b>' +'</div>'
								 */;

								html = html + "<td class='col-sm-1-1 center'>"
										+ count + "</td>";
								html = html
										+ "<td class='col-sm-3-1 center'>POST</td>";
								html = html + "<td class='col-sm-3-1 center'>"
										+ time + "</td>";
								html = html + "<td class='col-sm-3-1 center'>"
										+ date + "</td>";
								html = html
										+ "<td class='col-sm-1-1 center'><input id='btn"
										+ count
										+ "' type='radio' name='postbtn' onclick='changeValueForResult(this.value)' value='"
										+ flag + '^' + id + '^' + date + '^'
										+ time + "' /></td>";

								$('#labbut').removeAttr('disabled');
								$("#labrestxt").css("display", "");
								count++;
							}

							html = html + "</tr>";
							$("#totalpost").html(html);
							if (callfrom == "OTAnaestheticAssess") {
								$("#testmasterId").val($.trim(id));
							}
						}

						/*
						 * setTimeout(function() { $("#postPopup").show(); },
						 * 500);
						 */

						/*
						 * return false;
						 * 
						 * var flag = data[0]; var id = data[1]; var date =
						 * data[2]; var time = data[3]; // alert("Date::"+date+"
						 * time::"+time); if(date == "null" && time == "null"){
						 * date=" "; time=" "; }
						 * 
						 * $("#testmasterId").val( $.trim(id));
						 * 
						 * if( $.trim(flag)=="Y") {
						 * $('#labbut').removeAttr('disabled');
						 * $('#postDate').html(date); $('#postTime').html(time); }
						 */
					}

				}
			});
}

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 18-Feb-2016
 * @codeFor : Post lab Result from lab
 ******************************************************************************/
function postLabReport(labResultMasterid) {

	var reportTestCount = $("#reportTestCount").val();

	var resultcnt = 0;

	for ( var k = 1; k <= reportTestCount; k++) {

		var testval = $("#testvalue" + k).val();

		if (testval == "-" || testval == undefined || testval == "") {

			resultcnt++;

		}

	}

	if (resultcnt == reportTestCount) {
		alert("At least one Test Result should be filled for Post..!");
		return false;
	}

	var r = confirm("Are you confirm to Post Lab Report?");
	if (r == true) {

		var dt = new Date();
		var time = dt.getHours() + ":" + dt.getMinutes() + ":"
				+ dt.getSeconds();
		var date = dt.getUTCDate() + "/" + dt.getUTCMonth() + "/"
				+ dt.getUTCFullYear();

		var inputs = [];
		inputs.push('action=postLabReport');
		inputs.push("labResultMasterid=" + labResultMasterid);
		inputs.push("time=" + time);
		inputs.push("date=" + date);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PathologyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);

				window.location = "labTestPatientDashboard.jsp";
			}
		});

	}
}

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 18-Feb-2016
 * @codeFor : View Lab result on Doctor Desk View Button Click
 ******************************************************************************/
function viewAllLabTestResult(callfrom) {

	// Checking radio button is checked or not
	if ($('[name="postbtn"]').is(':checked')) {

		// Popup hide
		$("#postPopup").hide();
		if (callfrom == "OTAnaestheticAssess") {
			viewTestResult("OTAnaestheticAssess");
		} else {
			viewTestResult("OpdDoctorDesk2");
		}

		setTimeout(function() {
			$("#iPopupFormula").show();
		}, 500);

		setTimeout(function() {
			$('#testDivLab').find('input, text').attr("readonly", "readonly");
			$('#txtLabNote').attr("readonly", "readonly");
			document.getElementById('btnSavelab').style.visibility = 'hidden';

		}, 500);

	} else {
		alert("Please check atleast one Radio button to View Post!");
		return false;
	}

}

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 18-Feb-2016
 * @codeFor : Hide popup
 ******************************************************************************/
function closeLabPop() {
	$("#iPopupFormula").hide();
}

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 18-Feb-2016
 * @codeFor : Making inputs fields readonly
 ******************************************************************************/
function nonEditableLabTestReport() {
	setTimeout(function() {
		$('#testDiv').find('input, text').attr("readonly", "readonly");
		$('#txtLabNote').attr("readonly", "readonly");
		document.getElementById('btnSavelab').style.visibility = 'hidden';
	}, 100);
}

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 24-Feb-2016
 * @codeFor : Open eidtor to type details
 ******************************************************************************/
function openEditorForResult(id, testId, rowNum, type) {
	// alert("labid::"+id+" tid::"+testId);
	var note = "";
	$("#iPopupEditor").show('show');
	if ($("#narrationId" + rowNum).val() != "undefined") {
		note = $("#narrationId" + rowNum).val();
	}
	$("#txtLabNote").val(note);
	$("#idLabResult").val(id);
	$("#btnIdLab").val(testId);
	$("#rowNum").val(rowNum);

	// var ts ="ts";
	/*
	 * var ajaxResponse = $("#testDetails").html();
	 * 
	 * myArray = JSON.parse(ajaxResponse);
	 * 
	 * console.log(myArray);
	 * 
	 * if(type === "ts"){ var range = myArray.proLi[1].length;
	 * 
	 * 
	 * 
	 * for(var i =0 ;i<range;i++){
	 * 
	 * if(myArray.proLi[1][i].idTstRe == id){ var note =
	 * myArray.proLi[1][i].ndgnrl; //alert("nnnnnn--"+note);
	 * $("#txtLabNote").val(note); break; } }
	 * 
	 * }else if(type === "pkgts"){ //test inside Pacakge
	 * //$("#txtLabNote").val("pkgts"); var range = myArray.proLi[2].length;
	 * 
	 * for ( var i = 0; i < range; i++) {
	 * 
	 * var testRange = myArray.proLi[2][i].lbtstli.length; for ( var i2 = 0; i2 <
	 * testRange; i2++) {
	 * 
	 * if (myArray.proLi[2][i].lbtstli[i2].idTstRe==id) { var note =
	 * myArray.proLi[2][i].lbtstli[i2].ndgnrl; $("#txtLabNote").val(note);
	 * break; } } }
	 * 
	 * 
	 * }else if(type === "pkgprots"){ // test inside Pakcage Profile
	 * //$("#txtLabNote").val("pkgprots"); var range = myArray.proLi[2].length;
	 * for ( var int = 0; int < range; int++) { var testRange =
	 * myArray.proLi[2][int].lbproli.length;
	 * 
	 * for ( var i2 = 0; i2 < testRange; i2++) {
	 * 
	 * 
	 * var trn = myArray.proLi[2][int].lbproli[i2].testli.length;
	 * 
	 * for(var j =0;j<trn;j++){
	 * 
	 * if(myArray.proLi[2][int].lbproli[i2].testli[j].idTstRe==id){ var note
	 * =myArray.proLi[2][int].lbproli[i2].testli[j].ndgnrl;
	 * $("#txtLabNote").val(note); break; } } } }
	 * 
	 * }else{// test inside Profile // $("#txtLabNote").val("Profile test"); var
	 * range = myArray.proLi[0].length; for ( var i = 0; i < range; i++) {
	 * 
	 * var tlen = myArray.proLi[0][i].testli.length;
	 * 
	 * for ( var j = 0; j < tlen; j++) {
	 * 
	 * if(myArray.proLi[0][i].testli[j].idTstRe == id ){
	 * 
	 * var note = myArray.proLi[0][i].testli[j].ndgnrl;
	 * $("#txtLabNote").val(note); break; } } } }
	 */

}

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 24-Feb-2016
 * @codeFor : close eidtor
 ******************************************************************************/
function closeEditorForResult() {
	$("#iPopupEditor").hide('hide');
	$("#idLabResult").val(0);
	$("#btnIdLab").val(0);
	$("#txtLabNote").val("");
}

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 24-Feb-2016
 * @codeFor : Save Editor typed data
 ******************************************************************************/
// Modify by Laxman on 07-Feb-2018.
function saveEditorForResult() {
	var idLabResult = $("#idLabResult").val();
	var btnIdLab = $("#btnIdLab").val();
	var noteLab = $("#txtLabNote").val();
	var rowNum = $("#rowNum").val();
	if (noteLab == "") {
		alert("Please write narration.");
		return false;
	}

	$("#narrationId" + rowNum).val(noteLab);
	if (noteLab != "") {
		$("#btnInsert" + btnIdLab + rowNum).removeClass("btn-success");
		$("#btnInsert" + btnIdLab + rowNum).addClass("btn-danger");
	}
	$("#iPopupEditor").hide('hide');
	// alert("btnIdLab="+btnIdLab+" rowNum="+rowNum);

}

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 07-Mar-2016
 * @codeFor : validation and Show Pop up
 ******************************************************************************/
function addHeadingPopup() {

	var heading = $("#heading").val();
	// alert(heading);
	if (heading == "select") {
		alert("Please Select Heading First...!");
		SetFocus("heading");
		return false;
	}
	$("#ipopHead").modal('show');

}

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 07-Mar-2016
 * @codeFor : Hide Pop up
 ******************************************************************************/
function addHeadingPopupHide() {
	$("#ipopHead").modal('hide');
	$("#headingNamePck").val("");
}

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 07-Mar-2016
 * @codeFor : Add heading as Row
 ******************************************************************************/
function addHeadingAsRow(from) {
	// alert(from);
	if (from == "package") {
		var head = $("#headingNamePck").val();

		if (head != "") {

			$("#ol2").append(
					"<li><b>" + head + "</b>" + "<input  type='hidden' value='"
							+ head + "' name='headNameP'></li>");
			sort();
			addHeadingPopupHide();
		} else {
			alert("Please Type Heading name");
			SetFocus("headingNamePck");
		}
	} else {
		var head = $("#headingNamePck").val();
		// alert(head);
		if (head != "") {

			$("#tb2").append(
					"<tr> <td></td> <td>" + head + "</td>"
							+ "<input  type='hidden' name='hd' value='" + head
							+ "'></tr>");
			sort();
			addHeadingPopupHide();
		} else {
			alert("Please Type Heading name");
			SetFocus("headingNamePck");
		}
	}
}

var setPhathologyListTemplate = "<option value='0' selected='selected'>-SELECT-</option>{#foreach $T.docList as dl"
		+ "}<option value='{$T.dl.docId}'>{$T.dl.docName}</option>{#/for}";

function fetchonloadPathologistlist() {
	var inputs = [];
	inputs.push('action=fetchonloadPathologistslist');

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			var obj = eval('(' + ajaxResponse + ')');
			$('#IdPathologist').setTemplate(setPhathologyListTemplate);
			$('#IdPathologist').processTemplate(obj);
		}
	});

}

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 20-Apr-2016
 * @codeFor : Tab colour change of Lab
 ******************************************************************************/
function tabColorChange(callFrom) {
	/*
	 * if(callFrom == "ct"){ $("#ct").css("background-color", "#00ff80");
	 * $("#pt").css("background-color", ""); }else{
	 * $("#ct").css("background-color", ""); $("#pt").css("background-color",
	 * "#00ff80"); }
	 * 
	 */
	$("#byName").val('');
	$("#txtFdate").val('');
	$("#txtTdate").val('');
	$("#byBarcode").val('');

	if (callFrom == "ct") {
		$("#chkTotal").prop("checked", true);
		getLabTestPatientDashboard('onload', 'labTestResults');
		$("#ct").css("background-color", "#00ff80");
		$("#autho").css("background-color", "");
		$("#unathot").css("background-color", "");
		$("#recallt").css("background-color", "");
		$("#holdt").css("background-color", "");
		$("#privst").css("background-color", "");
		$("#outlab").css("background-color", "");

	} else if (callFrom == "autho") {
		getLabTestPatientDashboard('autho', 'labTestResults');
		$("#authochkTotal").prop("checked", true);
		$("#ct").css("background-color", "");
		$("#autho").css("background-color", "#00ff80");
		$("#unathot").css("background-color", "");
		$("#recallt").css("background-color", "");
		$("#holdt").css("background-color", "");
		$("#privst").css("background-color", "");
		$("#outlab").css("background-color", "");

	} else if (callFrom == "unathot") {
		getLabTestPatientDashboard('unathot', 'labTestResults');
		$("#ct").css("background-color", "");
		$("#autho").css("background-color", "");
		$("#unathot").css("background-color", "#00ff80");
		$("#recallt").css("background-color", "");
		$("#holdt").css("background-color", "");
		$("#privst").css("background-color", "");
		$("#outlab").css("background-color", "");

	} else if (callFrom == "recallt") {
		getLabTestPatientDashboard('recallt', 'labTestResults');
		$("#ct").css("background-color", "");
		$("#autho").css("background-color", "");
		$("#unathot").css("background-color", "");
		$("#recallt").css("background-color", "#00ff80");
		$("#holdt").css("background-color", "");
		$("#privst").css("background-color", "");
		$("#outlab").css("background-color", "");

	} else if (callFrom == "holdt") {
		getLabTestPatientDashboard('holdt', 'labTestResults');
		$("#ct").css("background-color", "");
		$("#autho").css("background-color", "");
		$("#unathot").css("background-color", "");
		$("#recallt").css("background-color", "");
		$("#holdt").css("background-color", "#00ff80");
		$("#privst").css("background-color", "");
		$("#outlab").css("background-color", "");

	} else if (callFrom == "privst") {
		getLabTestPatientDashboard('privst', 'labTestResults');
		$("#privchkTotal").prop("checked", true);
		$("#ct").css("background-color", "");
		$("#privst").css("background-color", "#00ff80");
		$("#unathot").css("background-color", "");
		$("#recallt").css("background-color", "");
		$("#holdt").css("background-color", "");
		$("#autho").css("background-color", "");
		$("#outlab").css("background-color", "");

	} else if (callFrom == "outlab") {
		// loadPopUp1();
		getAllLaboutSourcelist();
		$("#outlab").css("background-color", "#00ff80");
		$("#ct").css("background-color", "");
		$("#privst").css("background-color", "");
		$("#unathot").css("background-color", "");
		$("#recallt").css("background-color", "");
		$("#holdt").css("background-color", "");
		$("#autho").css("background-color", "");

	}
}

/* ____________________Creating Template___________________ */
var tempforLabPrevious = "<table class='table table-bordered table-striped table-condensed cf'><thead class='cf'>"
		+ "<tr><th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Date</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Assign Time </div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Report Due Date</div></th>"
		+ "<th class='numeric col-md-4-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Age</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Gender</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Test</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Routine Report</div></th>"
		+ "	</tr></thead><tbody>"
		+ " {#foreach $T.trmli as trmli}{#if $T.trmli.ptflag =='Y'}<tr>"
		+ "<td class='filterable-cell' align='center'>{count++}.</td>"
		+ "<td class='filterable-cell' align='center'>{$T.trmli.tmcoll}</td>"
		+ "<td class='filterable-cell'>{$T.trmli.objp.timeEn}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.trmli.tmdd}</td>"
		+ "<td class='filterable-cell'>{$T.trmli.objp.pini}{$T.trmli.objp.pnm}</td>"
		+ "{#if $T.trmli.objp.pagty !='undefined'}"
		+ "<td class='filterable-cell' align='center'>{$T.trmli.objp.pag}{$T.trmli.objp.pagty}</td>"
		+ "{#/if}"
		+ "{#if $T.trmli.objp.pagty =='undefined'}"
		+ "<td class='filterable-cell' align='center'>{$T.trmli.objp.pag}</td>"
		+ "{#/if}"
		+ "<td class='filterable-cell' align='center'>{$T.trmli.objp.psx}</td>"
		+ "<td class='filterable-cell' id = 'prevtestname_{count - 1}' >{$T.trmli.testlist[0].tst} - {$T.trmli.testlist[0].tcd}</td>"
		+ "<td class='numeric filterable-cell'><input onclick='viewPathalogyPatientReportPrevious({$T.trmli.tmid})'	style='font-size: 10px;' type='button' class = 'btn btn-xs btn-success' value='ROUTINE REPORT' /></td>"
		+ "</tr>{#/if}{#/for}</tbody></table>";

/* ____________________Creating Template___________________ */

/*******************************************************************************
 * @author : Touheed Khan
 * @date : 20-Apr-2016
 * @base : Get perivious Treatment id
 * 
 * @modified : Touheed Khan
 * @date : 21-Apr-2016
 * @base : No need of sperate function it been setted on load by ptflag
 *       (Previous Treatment Flag),so following code commented
 ******************************************************************************/
/*
 * function getPreviousTreatTest(callFrom){
 * 
 * 
 * var inputs = []; inputs.push('action=getPreviousTreatTest');
 * inputs.push('callFrom=' + callFrom);
 * 
 * var str = inputs.join('&');
 * 
 * jQuery.ajax({ async : true, type : "POST", data : str + "&reqType=AJAX", url :
 * "PathologyServlet", timeout : 1000 * 60 * 5, catche : false, error :
 * function() { // alert("error"); }, success : function(r) { ajaxResponse = r;
 * count = 1; //alert(ajaxResponse);
 * 
 * var pobj1 = eval('(' + ajaxResponse + ')');
 * $("#patientcontainerPrevious").setTemplate(tempforLabPrevious);
 * $("#patientcontainerPrevious").processTemplate(pobj1); } }); }
 */
/*******************************************************************************
 * @author : Touheed Khan
 * @date : 20-Feb-2016
 * @reason : Send to Privious Treatment Id
 ******************************************************************************/
function discardLabReport(labResultMasterid) {

	var r = confirm("Are you confirm to Discard Lab Report?");
	if (r == true) {

		var dt = new Date();
		var time = dt.getHours() + ":" + dt.getMinutes() + ":"
				+ dt.getSeconds();
		var date = dt.getUTCDate() + "/" + dt.getUTCMonth() + "/"
				+ dt.getUTCFullYear();

		var inputs = [];
		inputs.push('action=discardLabReport');
		inputs.push("labResultMasterid=" + labResultMasterid);
		inputs.push("time=" + time);
		inputs.push("date=" + date);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PathologyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				// ajaxResponse = r;
				alert(r);
				window.location = "labTestPatientDashboard.jsp";

			}
		});

	}
}

/*******************************************************************************
 * @author : Touheed Khan
 * @date : 21-Apr-2016
 * @reason : Giveing only Print option
 ******************************************************************************/
function viewPathalogyPatientReportPrevious(idtestmstr) {

	var patientTest = $("#pathologyAllPatInfo").html();

	var myArray = JSON.parse(patientTest);

	for ( var i = 0; i < myArray.trmli.length; i++) {
		if (myArray.trmli[i].tmid == idtestmstr) {
			myObj = myArray.trmli[i];
			break;
		}
	}
	var pid = myObj.objp.ehatPi;
	myObj = JSON.stringify(myObj);
	sBean = myObj;
	window.location.href = "labTestReportPrevious.jsp?testmasterId="
			+ idtestmstr + "&patientdetails=" + sBean.decodeSpecialChars()
			+ "&patientId=" + pid;
}

/*******************************************************************************
 * @author : Touheed Khan
 * @date : 27-Apr-2016
 * @reason : Show popup.
 ******************************************************************************/
function showPostPopup(value) {
	setTimeout(function() {
		$("#postPopup").show();
	}, 500);

}

/*******************************************************************************
 * @author : Touheed Khan
 * @date : 27-Apr-2016
 * @reason : Hide popup.
 ******************************************************************************/
function hideValueforResult() {
	$("#postPopup").hide();
}

/*******************************************************************************
 * @author : Touheed Khan
 * @date : 27-Apr-2016
 * @reason : Setting selected radio button values.
 ******************************************************************************/
function changeValueForResult(value) {
	var data = value.split("^");
	var flag = data[0];
	var id = data[1];
	var date = data[2];
	var time = data[3];

	if (date == "null" && time == "null") {
		date = " ";
		time = " ";
	}
	$("#testmasterId").val(id);
	$('#postDate').html(date);
	$('#postTime').html(time);
}

/*******************************************************************************
 * @author : Touheed Khan
 * @date : 10-May-2016
 * @reason : Save collection sample and accepted sample.
 ******************************************************************************/
// Modify by Laxman on 05-Feb-2018.
function saveCollectionAndAccepted(callFrom, btntype, labTestResultMasterId) {

	// call fuction for check sample collect or not
	checkSampleCol();

	var date = "";
	var time = "";
	// getting patient type
	var deptId = $("#pathospType").val();

	if (btntype == "collected") {// for collected save button
		date = $("#collectionDate").val();
		time = $("#collectionTime").val();
		smplDateTime = date + " " + time;
		// validation
		if (date == "") {
			alertify.error("Please Select Date.");
			SetFocus("collectionDate");
			return false;
		} else if (time == "") {
			alertify.error("Please Select Time.");
			SetFocus("collectionTime");
			return false;
		}

	} else if (smplColFlag == "Y" && btntype == "accepted") {// for accepted
		// save button
		// (btntype ==
		// "accepted")
		date = $("#collectionOutDate").val();
		time = $("#collTimeOut").val();
		smplDateTime = date + " " + time;
		// validation
		if (date == "") {
			alertify.error("Please Select Date.");
			SetFocus("collectionOutDate");
			return false;
		} else if (time == "") {
			alertify.error("Please Select Time.");
			SetFocus("collTimeOut");
			return false;
		}
	} else if (smplColFlag == "N") {
		alertify.error("Please Collect Sample First..");
		SetFocus("collectionTime");
		return false;
	}

	var inputs = [];
	inputs.push('action=saveCollectionAndAccepted');
	inputs.push('labTestResultMasterId=' + labTestResultMasterId);
	inputs.push('smplDateTime=' + smplDateTime);
	inputs.push('btntype=' + btntype);
	inputs.push('deptId=' + deptId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r.indexOf("Saved") != -1) {
				alertify.success(r);
			} else {
				alertify.error(r);
			}

		}
	});

};
function generateBarcode(callFrom, labTestResultMasterId) {

	$('#Counter_Batch_Pop_Up').modal("show");
	$('#Counter_Batch_Pop_Up').modal();
};

function generateBarcodePrint(masterId) {

	var count = 1;
	if ($("#txtBarcodecnt").val() != '' && $("#txtBarcodecnt").val() != null) {
		count = $("#txtBarcodecnt").val();
	}
	window.open("ehat_labtest_barcode.jsp?masterId=" + masterId + "&count="
			+ count);
	// window.open("ehat_lab_barcode.jsp?masterId="+masterId+"&count="+count+"&ptName="+ptName+"&OpdIpdNo="+OpdIpdNo+"&age="+age);

	$("#txtBarcodecnt").val('');

	$('#Counter_Batch_Pop_Up').modal("hide");
}
//jitendra 
function generateBarcodePrint1(masterId) {
	var tempPatient = document.getElementById("pName").value;
	
	var tempTestName = $(proDiv1).data('value');	//jitendra 12 Aug 2019 @ to get test name 
	
	var count = 1;
	if ($("#txtBarcodecnt").val() != '' && $("#txtBarcodecnt").val() != null) {
		count = $("#txtBarcodecnt").val();
	}
	if(tempPatient && tempTestName)
		{
		window.open("ehat_labtest_barcode.jsp?masterId=" + masterId + "&count="
				+ count + "&tempPatient="+ tempPatient + "&tempTestName="+ tempTestName);
		}
	else
		{
		window.open("ehat_labtest_barcode.jsp?masterId=" + masterId + "&count="
				+ count );
		}
	
	// window.open("ehat_lab_barcode.jsp?masterId="+masterId+"&count="+count+"&ptName="+ptName+"&OpdIpdNo="+OpdIpdNo+"&age="+age);

	$("#txtBarcodecnt").val('');

	$('#Counter_Batch_Pop_Up').modal("hide");
}

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 30-May-2016
 * @codeFor : Tab colour change of IPD Nursing Station
 ******************************************************************************/
/*
 * function tabColorChangeIPD(callFrom){ if(callFrom == "dr"){
 * $("#dr").css("background-color", "#00ff80"); $("#cp").css("background-color",
 * ""); $("#md").css("background-color", ""); }else if(callFrom == "cp"){
 * $("#dr").css("background-color", ""); $("#cp").css("background-color",
 * "#00ff80"); $("#md").css("background-color", ""); }else{
 * $("#dr").css("background-color", ""); $("#cp").css("background-color", "");
 * $("#md").css("background-color", "#00ff80"); } }
 */

/*******************************************************************************
 * @author : TouHeeD KhaN
 * @date : 02-June-2016
 * @codeFor : Set frequency value
 ******************************************************************************/
function setFrequency() {
	var frequency = 0;
	var count = 0;
	// mo an ev nt
	if (document.getElementById('mo').checked) {
		count++;
		$("#tmo").removeAttr("readonly");
		$("#tmo").val(1);
	} else {
		$("#tmo").attr('readonly', 'readonly');
		$("#tmo").val(0);
	}
	if (document.getElementById('an').checked) {
		count++;
		$("#tan").removeAttr("readonly");
		$("#tan").val(1);
	} else {
		$("#tan").attr('readonly', 'readonly');
		$("#tan").val(0);
	}
	if (document.getElementById('ev').checked) {
		count++;
		$("#tev").removeAttr("readonly");
		$("#tev").val(1);
	} else {
		$("#tev").attr('readonly', 'readonly');
		$("#tev").val(0);
	}
	if (document.getElementById('nt').checked) {
		count++;
		$("#tnt").removeAttr("readonly");
		$("#tnt").val(1);
	} else {
		$("#tnt").attr('readonly', 'readonly');
		$("#tnt").val(0);
	}
	frequency = count;
	$("#frequency").val(frequency);
	calculateQuantity();
}

/*******************************************************************************
 * @author : Tushar Sonawane
 * @date : 31-Aug-2016
 ******************************************************************************/
function ShowPopUpPrint(callfrom) {
	$('#printtypeforbtn').val(callfrom);
	if (callfrom != "0" || callfrom != 0) {
		if (callfrom == "printHF") {
			printLabResult('print');

		} else if (callfrom == "printHosptial") {

			printLabResult('printGen');
		} else {
			printLabResult('printwithoutheader');
		}
	}
	// $("#iPrint").show('show');
}
function HidePopUpPrint() {
	$('#printtypeforbtn').val(0);
	$("#iPrint").hide('show');

}
function printClicked() {
	var ptype = $('#printtypeforbtn').val();
	// alert("==ptype "+ptype);
	if (ptype != "0" || ptype != 0) {
		if (ptype == "printHF") {
			printLabResult('print');

		} else if (ptype == "printHosptial") {

			printLabResult('printGen');
		} else {
			printLabResult('printwithoutheader');
		}
	}
	$("#iPrint").hide('hide');
}
/*******************************************************************************
 * @author : paras suryawanshi
 * @date : 23-Dec-2016
 * @code :create Div individual
 ******************************************************************************/
function toCreateDivindi() {

	var pojoindi = eval('(' + unitindi + ')'); // fech unit.

	if (individualtest > 0 && isNew > 0) { // new row added for edit lab test
		if (rowCountindi == 1) { // check if table has noumber of row

			rowCountindi = individualtest;
		}
		// $("#txtneworoldnvl").val("1");
		rowCountindi++;

		$("#infonormalvalue")
				.append(
						// set template of row
						"<tr id='deleterow"
								+ rowCountindi
								+ "'> "
								+ "<td>"
								+ rowCountindi
								+ "</td>"

								+ "<td> <input type='checkbox'  name='checkboxindi"
								+ rowCountindi
								+ "' id='chkindi"
								+ rowCountindi
								+ "'/></td>"
								+ " <td><input type='text' class='form-control input-SmallText'  style='text-align:left;width:60px;' id='txtFage"
								+ rowCountindi
								+ "'  ><select  id='selAge"
								+ rowCountindi
								+ "'><option value='3'>Year</option><option value='2'>Month</option><option value='1'>Days</option></select></td>"
								+ " <td><input type='text' class='form-control input-SmallText' style='text-align:left;width:60px;'  id='txtTage"
								+ rowCountindi
								+ "'  ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' style='text-align:left;width:60px;' id='txtCL"
								+ rowCountindi
								+ "'  ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' style='text-align:left;width:60px;' id='txtLow"
								+ rowCountindi
								+ "'  ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' style='text-align:left;width:60px;' id='txtHigh"
								+ rowCountindi
								+ "'  ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' style='text-align:left;width:60px;' id='txtCH"
								+ rowCountindi
								+ "'  ></td>"
								+ "<td> <input type='checkbox'  name='checkboxmale"
								+ rowCountindi
								+ "' id='chkmale"
								+ rowCountindi
								+ "'/></td>"
								+ "<td> <input type='checkbox'  name='checkboxfemale"
								+ rowCountindi
								+ "' id='chkfemale"
								+ rowCountindi
								+ "'/></td>"
								+ "<td> <input type='checkbox'  name='checkboxothers"
								+ rowCountindi
								+ "' id='chkothers"
								+ rowCountindi
								+ "'/></td>"
								+ " <td><select  style='width: 100px;' id='selUnit"
								+ rowCountindi + "'  ></select></td>"
								+ " </tr>");

		$("#selUnit" + rowCountindi).setTemplate(getAllUnitTemp)
				.processTemplate(pojoindi);

		$("#indiRowCount").val(rowCountindi);
		var inditblsize = $("#indiRowCount").val();
		$("#inditblsize").val(inditblsize);
		individualtest = 0;
		rowCountindi++;

	} else {
		// added row for new test normal values
		$("#infonormalvalue")
				.append(
						"<tr id='deleterow"
								+ rowCountindi
								+ "'> "
								+ "<td>"
								+ rowCountindi
								+ "</td>"

								+ "<td> <input type='checkbox'  name='checkboxindi"
								+ rowCountindi
								+ "' id='chkindi"
								+ rowCountindi
								+ "'/></td>"
								+ " <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)'  style='text-align:left;width:60px;' id='txtFage"
								+ rowCountindi
								+ "'  ><select  id='selAge"
								+ rowCountindi
								+ "'><option value='3'>Year</option><option value='2'>Month</option><option value='1'>Days</option></select></td>"
								+ " <td><input type='text' class='form-control input-SmallText'  onkeypress='return validateNumbers(event)' style='text-align:left;width:60px;'  id='txtTage"
								+ rowCountindi
								+ "'  ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)'    style='text-align:left;width:60px;' id='txtCL"
								+ rowCountindi
								+ "'  ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)'  style='text-align:left;width:60px;' id='txtLow"
								+ rowCountindi
								+ "'  ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' style='text-align:left;width:60px;' id='txtHigh"
								+ rowCountindi
								+ "'  ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)'  style='text-align:left;width:60px;' id='txtCH"
								+ rowCountindi
								+ "'  ></td>"
								+ "<td> <input type='checkbox'  name='checkboxmale"
								+ rowCountindi
								+ "' id='chkmale"
								+ rowCountindi
								+ "'/></td>"
								+ "<td> <input type='checkbox'  name='checkboxfemale"
								+ rowCountindi
								+ "' id='chkfemale"
								+ rowCountindi
								+ "'/></td>"
								+ "<td> <input type='checkbox'  name='checkboxothers"
								+ rowCountindi
								+ "' id='chkothers"
								+ rowCountindi
								+ "'/></td>"
								+ " <td><select  style='width: 100px;'  id='selUnit"
								+ rowCountindi + "'  ></select></td>"
								+ " </tr>");
		$("#selUnit" + rowCountindi).setTemplate(getAllUnitTemp)
				.processTemplate(pojoindi); // set values to unit text filed.

		$("#indiRowCount").val(rowCountindi); // set row to hideen filed
		var inditblsize = $("#indiRowCount").val(); // set totalrow to hideen
		// filed
		$("#inditblsize").val(inditblsize);

		rowCountindi++;

	}
}

/*******************************************************************************
 * @author : paras suryawanshi
 * @date : 23-Dec-2016
 * @code :Remove Div individual
 ******************************************************************************/
function toRemoveDivindi() {
	var type = $("#inored").val(); // get value for type(edit or insert)
	// alert(type);
	var hideRowCount = $("#indiRowCount").val();
	var tblsizeindi = $("#inditblsize").val();

	var temp = hideRowCount;
	var p = 1;

	if (type == "insert") { // remove row for new labet test normal value
		// (inserted time)

		for ( var i = 0; i < tblsizeindi; i++) {

			var $radios = $('input:checkbox[name=checkboxindi' + p + ']'); // remove
			// row
			// only
			// check
			// row.
			if ($radios.is(':checked') == true) {
				$("#deleterow" + p + "").remove();
				temp = temp - 1;
				$("#indiRowCount").val(temp);
			}
			p++;
		}
		// alert(removerow);
		isNew = 1;
		individualtest = 0;

	} else {

		removerow = { // newnoramlvalue json individuals@author:paras
			// @Date:26Dec
			removenvl : []
		};
		for ( var i = 0; i < tblsizeindi; i++) { // remove row for labet test
			// normal value (edit time)

			var $radios = $('input:checkbox[name=checkboxindi' + p + ']'); // remove
			// row
			// only
			// check
			// row.

			if ($radios.is(':checked') == true) {
				var rowrv = $("#txtnvlid" + p).val(); // get hidden
				// normalvalueid for
				// only check fileds
				removerow.removenvl.push({
					'nvid' : rowrv
				});
				$("#deleterow" + p + "").remove();
				temp = temp - 1;
				$("#indiRowCount").val(temp); // set total row after remove.

			}
			p++;
		}
		var removerowedit = JSON.stringify(removerow); // covert to json
		// alert(removerowedit);

		var inputs = [];
		inputs.push('action=RemoveROWLab');
		inputs.push('labTestremoverowedit=' + removerowedit);
		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PathologyServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				// alert('error');
			},
			success : function(r) {
				alert(r);
			}
		});

		isNew = 1; // set for new row added after remove
		// individualtest=0;

	}

}
/*******************************************************************************
 * @author : paras suryawanshi
 * @date : 23-Dec-2016
 * @code :editnewindividual
 ******************************************************************************/
function editnewindividual(sBean, list) {
	// alert(list);
	$("#inored").val("edit"); // set for call form which is use in for remove
	// row
	isNew = 1;
	var Countindividual = 1;
	var pojoedit = eval('(' + unitindi + ')'); // fetch unittype
	for ( var k = 0; k < sBean.normalValueslinewindi.length; k++) { // set
		// template
		// for new
		// normal
		// values
		// age
		// vise(edit)
		$("#infonormalvalue")
				.append(
						"<tr id='deleterow"
								+ Countindividual
								+ "'> "
								+ "<td>"
								+ Countindividual
								+ " </td>"

								+ "<td> <input type='checkbox'  name='checkboxindi"
								+ Countindividual
								+ "' id='chkindi"
								+ Countindividual
								+ "'/><input type='hidden' class='form-control input-SmallText' style='text-align:left;width:60px;' id='txtneworoldnvl' value='0' ><input type='hidden' class='form-control input-SmallText' style='text-align:left;width:60px;' id='txtnvlid"
								+ Countindividual
								+ "' value='"
								+ sBean.normalValueslinewindi[k].nvid
								+ "' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText'  style='text-align:left;width:60px;' id='txtFage"
								+ Countindividual
								+ "'  value='"
								+ sBean.normalValueslinewindi[k].fage
								+ "' ><select  id='selAge"
								+ Countindividual
								+ "'><option value='3'>Year</option><option value='2'>Month</option><option value='1'>Days</option></select></td>"
								+ " <td><input type='text' class='form-control input-SmallText' style='text-align:left;width:60px;'  id='txtTage"
								+ Countindividual
								+ "' value='"
								+ sBean.normalValueslinewindi[k].tage
								+ "' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' style='text-align:left;width:60px;' id='txtCL"
								+ Countindividual
								+ "' value='"
								+ sBean.normalValueslinewindi[k].cl
								+ "' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' style='text-align:left;width:60px;' id='txtLow"
								+ Countindividual
								+ "' value='"
								+ sBean.normalValueslinewindi[k].nvlv
								+ "' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' style='text-align:left;width:60px;' id='txtHigh"
								+ Countindividual
								+ "'  value='"
								+ sBean.normalValueslinewindi[k].nvuv
								+ "'></td>"
								+ " <td><input type='text' class='form-control input-SmallText' style='text-align:left;width:60px;' id='txtCH"
								+ Countindividual
								+ "'  value='"
								+ sBean.normalValueslinewindi[k].ch
								+ "'></td>"
								+ "<td> <input type='checkbox'  name='checkboxmale"
								+ Countindividual
								+ "' id='chkmale"
								+ Countindividual
								+ "'/></td>"
								+ "<td> <input type='checkbox'  name='checkboxfemale"
								+ Countindividual
								+ "' id='chkfemale"
								+ Countindividual
								+ "'/></td>"
								+ "<td> <input type='checkbox'  name='checkboxothers"
								+ Countindividual
								+ "' id='chkothers"
								+ Countindividual
								+ "'/></td>"
								+ " <td><select  style='width: 100px;' id='selUnit"
								+ Countindividual + "'  ></select></td>"
								+ " </tr>");

		$("#selUnit" + Countindividual).setTemplate(getAllUnitTemp)
				.processTemplate(pojoedit); // set unit type value & template.
		$("#selUnit" + Countindividual)
				.val(sBean.normalValueslinewindi[k].nvut);

		$("#selAge" + Countindividual).val(sBean.normalValueslinewindi[k].age); // set
		// age
		// set male,female ,others(onlychecked)
		if (sBean.normalValueslinewindi[k].male == "Y") {
			document.getElementById("chkmale" + Countindividual).checked = true;
		}
		if (sBean.normalValueslinewindi[k].female == "Y") {
			document.getElementById("chkfemale" + Countindividual).checked = true;
		}
		if (sBean.normalValueslinewindi[k].others == "Y") {
			document.getElementById("chkothers" + Countindividual).checked = true;
		}

		// set total row count
		$("#indiRowCount").val(Countindividual);
		Countindividual++;
		individualtest++;

	}
	var inditblsize = $("#indiRowCount").val();
	// alert(inditblsize);
	$("#inditblsize").val(inditblsize); // set total row count to hidden filed
	// $("#txtneworoldnvl").val("1");

}
// Added by Laxman for validateServiceName
function validateServiceName(inputID) {
	$("#subserviceid").val(0);
}
/*******************************************************************************
 * @author : Laxman Nikam
 * @date : 23-Jan-2018
 * @code : autosuggestion
 ******************************************************************************/
function autoSuggForService(inputID) {
	// var listofunit=[];
	// var resultData = [];
	var findingName = $("#" + inputID).val();
	// var unit = $("#uId").val();
	// var unitlist=listofunit.slice(1);
	var unit = $("#uId").val();
	var depdocdeskid = 3;
	var serviceid = 11;
	var unitlist = "";
	// var q=$('#queryType').val();
	var querytype = "all";
	/*
	 * if(q == "update"){ serviceid =$("#servId").val(); }else{ serviceid=
	 * $("#servId").val(); }
	 */

	var inputs = [];
	inputs.push('unit=' + unit);
	inputs.push('findingName=' + findingName);
	inputs.push('unitlist=' + unitlist);
	inputs.push('depdocdeskid=' + depdocdeskid);
	inputs.push('querytype=' + querytype);
	inputs.push('serviceid=' + serviceid);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getallservices",

		success : function(r) {
			console.log(r);
			autoCompOnProfileName(r, inputID);
		}
	});
}

/*******************************************************************************
 * @author : Laxman Nikam
 * @date : 23-Jan-2018
 * @code : autosuggestion services
 ******************************************************************************/
function autoCompOnProfileName(response, id) {
	// var qty = id.slice(0, -1); // for dyamic col getting id
	// alert("hi");
	var myArray = response;// parsing response in JSON format
	// alert(myArray);
	// alert("b");
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
								table = $('<div class="ui-widget-header" style="width:104%"></div>');
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
	$("#" + id)
			.mcautocomplete(
					{
						// These next two options are what this plugin adds to
						// the
						// autocomplete widget.
						showHeader : true,
						columns : [ {
							name : 'CategoryName',
							width : '150px',
							valueField : 'categoryName'
						}, {
							name : 'ServiceName',
							width : '100px',
							valueField : 'serviceName'
						}, {
							name : 'categorycharges',
							width : '100px',
							valueField : 'categorycharges'
						} ],

						// Event handler for when a list item is selected.
						select : function(event, ui) {
							console.log(ui);
							// this.value = (ui.item ? ui.item.dn : '');
							// this.value = (ui.item.spl = 'undefined' ? '' :
							// ui.item.dn);
							// var spl = (ui.item.spl = "" ? '' : ui.item.spl);
							// if (ui.item.categoryName!="NO") {
							// $('#results').text(ui.item ? 'Selected: ' +
							// ui.item.dn + ', '+ spl + ', '+
							// ui.item.specialisationName + ', ' +
							// ui.item.depNm: 'Nothing selected, input was ' +
							// this.value);
							// $('#' + id).val(ui.item.dn);
							// $('#userDocId').val(ui.item.ui);
							// $('#selectedObj').html(JSON.stringify(ui.item));
							// alert("subserviceid ::"+ui.item.categoryid);
							// alert("serviceid ::"+ui.item.serviceid);
							$('#proNm').val(ui.item.categoryName);
							$("#subservicesname").val(ui.item.categoryName);
							$("#subserviceid").val(ui.item.categoryid);
							$("#servicename").val(ui.item.serviceName);
							$("#serviceid").val(ui.item.serviceid);
							$("#categorycharges").val(ui.item.categorycharges);
							$("#servId").val(ui.item.serviceid);
							$("#proCode").val(ui.item.codeName);
							/*
							 * $("#concession" ).val(ui.item.concession);
							 * $("#amount" ).val(ui.item.amount);
							 * $("#iscombination").val(ui.item.iscombination);
							 */

							// calculatePerticularTotal1();
							/*
							 * if($("#uId").val()==0){
							 * $("#allunitid").val(ui.item.categoryid); }
							 */
							// fetchSuperCatogoires(ui.item.categoryid);
							// }
							SetFocus("strValue1");
							return false;
							/*
							 * setallservautocomplete(id); return false;
							 */
						},

						// The rest of the options are for configuring the ajax
						// webservice call.
						minLength : 1,
						source : function(request, response) {
							var data = myArray;
							console.log(data);
							console.log(data.lstService.length);
							var result;
							if (!data || data.lstService.length === 0
									|| !data.lstService
									|| data.lstService.length === 0) {
								/*
								 * result = [{ label: 'No match found.' }];
								 */
								result = [ {
									/* 'dn' : 'No', */
									'categoryName' : 'NO',
									'serviceName' : 'Match',
								/* 'depNm' : 'Match' */
								} ];
							} else {
								result = data.lstService;// Response List for
								// All
								// Services
							}
							response(result);
							$('#ui-id-1').css("z-index", "10000000000");
							$('#ui-id-1').css("width", "385px");

						}
					});
}

/*******************************************************************************
 * @author Laxman Nikam
 * @date 31-Jan-2018
 * @Code Getting Patient Data By TreatmentId
 ******************************************************************************/
function getPatientDataByTreatId(r) {
	var deptID = 0;
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : r
		},
		url : "ehat/registration/fetchPatientsRecordByTreatmentId",
		success : function(r) {
			
			r = JSON.stringify(r);
			//alert(r);
			$("#patientdetails").html(r);
		}
	});
	return deptID;
}

/*******************************************************************************
 * @author Laxman Nikam
 * @date 31-Jan-2018
 * @Code Save Patient Lab Tests Result Data
 ******************************************************************************/
function saveLabTestResult(btnType) {
	// Call for check sample accpeted or not.
	checkSamplAccpted();
	if (smplAccptFlag == "Y") {

		var patientTest = $("#patientdetails").html();
		var patientdetails = eval('(' + patientTest + ')');
		var patientId = patientdetails.listRegTreBillDto[0].patientId;
		var departmentId = patientdetails.listRegTreBillDto[0].departmentId;
		var treatmentId = patientdetails.listRegTreBillDto[0].treatmentId;
		var labReqMstId = $("#testmasterId").html();
		var unitId = $("#unitId").val();
		var pathologistId = $("#IdPathologist").val();
		var txtReportNote = $.trim($("#txtReportNote").val());
		var reportdueDate = $.trim($("#reportdueDate").val());
		var reportDueTime = $.trim($("#reportDueTime").val());
		var reportTestCount = $("#reportTestCount").val();

		if (reportTestCount == "0" || reportTestCount == 0) {
			alertify.error("Please first configure Test");
			return false;
		}
		if (pathologistId == "0") {
			alertify.error("Please Select pathologist");
			SetFocus("IdPathologist");
			return false;
		} else if (reportdueDate == "") {
			alertify.error("Please Select Report Due Date!");
			SetFocus("reportdueDate");
			return false;
		} else if (reportDueTime == "") {
			alertify.error("Please Select Select Report Due Time!");
			SetFocus("reportDueTime");
			return false;
		}

		reportdueDate = reportdueDate + " " + reportDueTime;
		var labResultId = $("#labResultId").val();
		var serviceId = "";
		var subServiceId = "";
		var labRequestId = "";
		var labReqSlvId = "";

		if (labResultId == "" || labResultId == null
				|| labResultId == undefined) {
			labResultId = 0;
		}
		var labResultDetails = {
			listLabResultDto : []
		};

		var testResult = "";
		var testId = "";
		var labResultId = "";
		var isTemplate = "";

		for ( var k = 1; k <= reportTestCount; k++) {
			narration = $("#narrationId" + k).val();

			if (narration == undefined || narration == "undefined") {
				narration = "-";
			}
			testResult = $("#testvalue" + k).val();
			testId = $("#idOfTest" + k).val();
			labResultId = $("#idResultTest" + k).val();
			isTemplate = $("#isTemplate" + k).val();
			if (testResult == "" || testResult == undefined) {
				testResult = "-";
			}

			serviceId = $("#serviceId" + k).val();
			subServiceId = $("#subserviceId" + k).val();
			labRequestId = $("#labreqId" + k).val();
			labReqSlvId = $("#labreqslvId" + k).val();
			if (isTemplate == "t") {
				isTemplate = "Y";
			} else {
				isTemplate = "N";
			}

			labResultDetails.listLabResultDto.push({
				labResultId : labResultId,
				patientId : patientId,
				treatmentId : treatmentId,
				labRequestId : labRequestId,
				labReqSlvId : labReqSlvId,
				serviceId : serviceId,
				subServiceId : subServiceId,
				unitId : unitId,
				departmentId : departmentId,
				testResult : testResult,
				testId : testId,
				narration : narration,
				isTemplateFlag : isTemplate
			});

		}
		labResultDetails = JSON.stringify(labResultDetails);
		var inputs = [];
		inputs.push('labReqMstId=' + labReqMstId);
		inputs.push('reportdueDateTime=' + reportdueDate);
		inputs.push('pathologistId=' + pathologistId);
		inputs.push('txtReportNote=' + txtReportNote);
		inputs.push('labResultDetails=' + labResultDetails);
		inputs.push('btnType=' + btnType);
		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/lab/saveLabTestResult",
			error : function() {
				alert('Network Issue!!!');
			},

			success : function(r) {
				ajaxResponse = r;
				if (ajaxResponse != -1) {
					if (labResultId == 0) {
						alert("Data save successfully.");
						window.location = "labTestPatientDashboard.jsp";
					} else {
						alert("Data update successfully.");
						window.location = "labTestPatientDashboard.jsp";
					}
				} else {
					alert("Network Error!!!");
					window.location = "labTestPatientDashboard.jsp";
				}
			}
		});

	} else if (smplAccptFlag == "N") {
		alertify.error("Please Accept Sample First...");
		$("#viewLabTestTemplate").modal('hide');
		SetFocus("collTimeOut");
		return false;
	}
}

/*******************************************************************************
 * @author Laxman Nikam
 * @date 06-Feb-2018
 * @Code check sample Collect or not.
 ******************************************************************************/
function checkSampleCol() {

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"labReqMstId" : $("#testmasterId").html()
		},
		url : "ehat/lab/checkSampleCol",
		error : function() {
			alert("Network Issue!!!");
		},
		success : function(r) {
			smplColFlag = r;
		}
	});
}

/*******************************************************************************
 * @author Laxman Nikam
 * @date 06-Feb-2018
 * @Code check sample Accept or not.
 ******************************************************************************/
function checkSamplAccpted() {

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"labReqMstId" : $("#testmasterId").html()
		},
		url : "ehat/lab/checkSamplAccpted",
		error : function() {
			alert("Network Issue!!!");
		},
		success : function(r) {
			smplAccptFlag = r;
		}
	});
}

/*******************************************************************************
 * @author : paras suryawanshi
 * @date : 9-Mar-2017
 * @code :check all
 ******************************************************************************/
// Modify by laxman on 08-Feb-2018.
function seleallpatient() {
	var btnName = $('#txtselall').val();
	if (btnName == "Select All") {
		$(':checkbox').each(function() {
			this.checked = true;
		});
		$("#txtselall").attr('value', 'Unselect All');
	} else {
		$(':checkbox').each(function() {
			this.checked = false;
		});
		$("#txtselall").attr('value', 'Select All');
	}

}

function getLabTestPatientSearch() {
	count = 1;
	var type = "";
	var tabautho = $('#tabautho').attr('class');
	var tabhold = $('#tabhold').attr('class');
	var tabrecall = $('#tabrecall').attr('class');
	var tabunatho = $('#tabunatho').attr('class');
	var tabprivst = $('#tabprivst').attr('class');

	if (tabautho == "active") {
		type = "autho";
	} else if (tabhold == "active") {
		type = "holdt";
	} else if (tabrecall == "active") {
		type = "recallt";
	} else if (tabunatho == "active") {
		type = "unathot";
	} else if (tabprivst == "active") {
		type = "privst";
	} else {
		type = "onload";

	}
	var strBarcode = $.trim($("#byBarcode").val());
	var strValue = $.trim($("#byName").val());
	var txtFdate = $.trim($("#txtFdate").val());
	var txtTdate = $.trim($("#txtTdate").val());
	if (strValue == "" && txtFdate == "" && txtTdate == "" && strBarcode == "") {
		alert("Please Insert Something For Search");
		return false;
	}

	if (strBarcode != ""
			&& (txtFdate != "" || txtTdate != "" || strValue != "")) {
		alert("Please insert Only Name and Date or Only Barcode for search");

		return false;
	}
	if ((txtFdate != "" && (txtTdate == ""))
			|| (txtTdate != "" && (txtFdate == ""))) {
		$("#byName").val(" ");
		$("#byBarcode").val(" ");
		$("#txtTdate").val(" ");
		$("#txtFdate").val(" ");
		alert("Please insert Both Date for search");
		return false;
	}
	if (txtFdate != "" && txtTdate != ""
			&& (strBarcode != "" || strValue != "")) {
		$("#byName").val(" ");
		$("#byBarcode").val(" ");
		$("#txtTdate").val(" ");
		$("#txtFdate").val(" ");
		alert("Please insert Only Name and Date or Only Barcode for search");

		return false;
	}
	// code by darpan
	$("#byName").val(" ");
	$("#byBarcode").val(" ");
	$("#txtTdate").val(" ");
	$("#txtFdate").val(" ");
	// -----end----
	if (strBarcode == "") {
		if (strValue != "") {
			if (txtFdate == "" || txtTdate == "") {

				txtFdate = "N";
				txtTdate = "N";
			}
		} else {
			if (txtFdate != "" && txtTdate != "") {

				// strValue="D";

			} else {
				alert("Please insert Both Date for search");
				return false;
			}

		}
	}
	var inputs = [];
	inputs.push('strValue=' + strValue);
	inputs.push('strBarcode=' + strBarcode);
	inputs.push('txtFdate=' + txtFdate);
	inputs.push('txtTdate=' + txtTdate);
	inputs.push('type=' + type);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/lab/getLabTestPatientSearch",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			// alert("-------->>>"+JSON.stringify(ajaxResponse));
			var pobj1 = r;
			if (pobj1.listLabResultMstViewDto.length > 0) {
				$("#pathologyAllPatInfo").html(ajaxResponse);
				if (type == 'onload' || type == 'opd' || type == 'ipd'
						|| type == 'diagnosis') {
					$("#patientcontainer").setTemplate(tempforCurrntLab);
					$("#patientcontainer").processTemplate(pobj1);
				} else if (type == 'unathot' || type == 'cl' || type == 'ch'
						|| type == 'nl') {
					$("#patientcontainerU").setTemplate(tempforLabCrntUnAutho); // set
					// new
					// template
					// by
					// paras
					$("#patientcontainerU").processTemplate(pobj1);
				} else if (type == 'autho' || type == 'authIpd'
						|| type == 'authOpd' || type == 'authDiagnosis') {
					$("#patientcontainerAuth").setTemplate(tempforAuthLab);
					$("#patientcontainerAuth").processTemplate(pobj1);

				} else if (type == 'holdt') {
					$("#patientcontainerH").setTemplate(tempforCurrntLab);
					$("#patientcontainerH").processTemplate(pobj1);
				} else if (type == 'recallt') {
					$("#patientcontainerR").setTemplate(tempforCurrntLab);
					$("#patientcontainerR").processTemplate(pobj1);
				} else if (type == 'privst' || type == 'privIpd'
						|| type == 'privOpd' || type == 'privDiagnosis') {
					$("#patientcontainerPrivst").setTemplate(tempforLabPrivst);
					$("#patientcontainerPrivst").processTemplate(pobj1);
				}

			} else {
				alertify.error("Record Not Found");
				$("#patientcontainer").html("");
				$("#patientcontainerAuth").html("");
				$("#patientcontainerH").html("");
				$("#patientcontainerR").html("");
				$("#patientcontainerPrivst").html("");

			}
		}
	});
}

function changeStatusOfLabRprt(type, labReqId) {

	var reportTestCount = $("#reportTestCount").val();
	var labReqIdList = [];
	var msg = "";
	if (type == "authselect") {
		$.each($('#chkun:checked'), function() {
			labReqIdList.push($(this).val());
		});
	} else {
		labReqIdList.push(labReqId);
	}

	if (reportTestCount == "0" || reportTestCount == 0) {
		alertify.error("Please first configure Test");
		return false;
	}
	if (labReqIdList.length == 0) {
		alert("Please check  at least one Routines values");
		return false;
	}
	if (labReqId == 0 && labReqId == undefined && labReqId == "") {
		alert("Lab Master Id NA.");
		return false;
	}
	if (type == "auth" || type == "authselect") {
		msg = "Are you confirm to Authorize Lab Report?";
	} else if (type == "hold") {
		msg = "Are you confirm to Hold Lab Report?";
	} else if (type == "recall") {
		msg = "Are you confirm to Recall Lab Report?";
	} else if (type == "bktocrnt") {
		msg = "Are you confirm to Back To Current Lab Report?";
	} else if (type == "post") {
		msg = "Are you confirm to Post Lab Report?";
	} else {
		msg = "Are you confirm?";
	}
	var r = confirm(msg);
	if (r == true) {

		var inputs = [];
		inputs.push("labReqIdList=" + labReqIdList);
		inputs.push("type=" + type);
		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/lab/changeStatusOfLabRprt",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				alert(r);
				window.location = "labTestPatientDashboard.jsp";
			}
		});
	}
}

function cleartxt() {

	$("#byName").val('');
	$("#txtFdate").val('');
	$("#txtTdate").val('');
	$("#byBarcode").val('');

}

var setLabTestTempList = "<option value='0' onclick='setNewCustomizeLabTemp()'>NewTemplate</option>{#foreach $T.tli as tli}"
		+ "<option value='{$T.tli.idlabTestTemplate}' onclick='setLabTemp({$T.tli.idlabTestTemplate})'>{$T.tli.testTemplateName}</option> {#/for}";

function fetchlabTestTemplates(idResultTest) {

	var idlabtest = 0;
	if (idResultTest == 0) {
		var hID = $("#hID").val();
		idlabtest = $("#idOfTempTest" + hID).val();
		// idTest = $("#htestId").val();
	} else {
		idlabtest = $("#idlabtest").val();
	}

	var val = "no";
	var inputs = [];
	inputs.push('action=fetchTestTemplateData');
	inputs.push('idlabtest=' + idlabtest);
	inputs.push('val=' + val);
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
			$("#labTestList").html(ajaxResponse);
			var pobj1 = eval('(' + ajaxResponse + ')');
			$("#selRisTempList").setTemplate(setLabTestTempList);
			$("#selRisTempList").processTemplate(pobj1);
			$("#idlabtesttemplates").val("1");
		}
	});
}

function setNewCustomizeLabTemp() {
	$("#iTestTemplateName").val("");
	$("#iImpression").val("");
	// $("#queryType").val("insert");
	CKEDITOR.instances['iEditorTestTemplate'].setData("");
	$("#idlabtesttemplates").val("0");
}
function setLabTemp(id) {
	var val = "id";
	var inputs = [];
	inputs.push('action=fetchTestTemplateData');
	inputs.push('idlabtest=' + id);
	inputs.push('val=' + val);
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
			var myArray = eval('(' + ajaxResponse + ')');
			for ( var i = 0; i < myArray.tli.length; i++) {
				if (myArray.tli[i].idlabTestTemplate == id) {
					myObj = myArray.tli[i];
					break;
				}
			}
			$("#idlabtesttemplates").val(id);
			$("#iTestTemplateName").val(myObj.testTemplateName);
			$("#iImpression").val(myObj.impressions);
			CKEDITOR.instances['iEditorTestTemplate']
					.setData((myObj.testTemplate));
			$("#queryType").val("update");

		}
	});
}
function viewTemplateForLabTest(count) {

	$("#iTestTemplateName").val($("#tempTestValue" + count).val());
	$("#hID").val(count);
	fetchPatientTestTemplate(0);
	fetchlabTestTemplates(0);
	$("#viewLabTestTemplate").modal('show');
};
function hideShowOutSrcDiv() {
	var $radios = $('input:checkbox[id=chkOutSrc]');
	if ($radios.is(':checked') == true) {
		$("#divOutsource").show();
	} else {
		$("#divOutsource").hide();
	}
}
function fetchPatientTestTemplate(idResultTest) {
	if (idResultTest == 0) {
		var hID = $("#hID").val();
		idResultTest = $("#idTempResultTest" + hID).val();
		// idTest = $("#htestId").val();
	}
	var inputs = [];
	inputs.push('action=fetchPatientTestTemplate');
	// inputs.push('idOfTest=' + idTest);
	inputs.push('idResultTest=' + idResultTest);

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
			// alert(ajaxResponse);
			var pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.tli[0].idTstRe != undefined && pobj1.tli[0].idTstRe != 0
					&& pobj1.tli[0].testTemplateName != null) {
				setTimeout(function() {

					var tempName = pobj1.tli[0].testTemplateName.replace(
							"<p></p>", "");
					$("#iTestTemplateName").val(tempName);
					$("#iImpression").val(pobj1.tli[0].impressions);
					CKEDITOR.instances['iEditorTestTemplate']
							.setData((pobj1.tli[0].testTemplate));

					$("#hTestTemplateName").val(tempName);
					$("#hTestTemplate").val(pobj1.tli[0].testTemplate);
					$("#hImpression").val(pobj1.tli[0].impressions);
					$("#hQueryType").val("update");
				}, 250);
			}
		}
	});
}
function maxTestID() {

	var inputs = [];
	inputs.push('action=fetchMaxTestTemplateId');
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
			// alert(ajaxResponse);
			if (r != 0) {
				$("#htestId").val(ajaxResponse);
				$("#hQueryType").val("update");

			}

		}
	});
}

function savePatientTestTemplate() {

	// Call for check sample accpeted or not.
	checkSamplAccpted();
	if (smplAccptFlag == "Y") {

		var patientTest = $("#patientdetails").html();
		var patientdetails = eval('(' + patientTest + ')');
		var patientId = patientdetails.listRegTreBillDto[0].patientId;
		var departmentId = patientdetails.listRegTreBillDto[0].departmentId;
		var treatmentId = patientdetails.listRegTreBillDto[0].treatmentId;
		var labReqMstId = $("#testmasterId").html();
		var unitId = $("#unitId").val();
		var reportdueDate = $.trim($("#reportdueDate").val());
		var reportDueTime = $.trim($("#reportDueTime").val());
		// var treatmentId = $.trim($("#treatmentId").html());
		reportdueDate = reportdueDate + " " + reportDueTime;
		var labResultId = $("#labResultId").val();

		if (labResultId == "" || labResultId == null
				|| labResultId == undefined) {
			labResultId = 0;
		}
		var labResultDetails = {
			listLabResultDto : []
		};

		var labResultId = "";

		var hID = ($("#hID").val()).trim();
		var idOfTest = ($("#idOfTempTest" + hID).val()).trim();
		var idResultTest = ($("#idTempResultTest" + hID).val()).trim();
		var testTemplateName = ($("#iTestTemplateName").val()).trim();
		var testTemplate = (CKEDITOR.instances["iEditorTestTemplate"].getData());
		var impression = ($("#iImpression").val()).trim();

		var serviceId = "";
		var subServiceId = "";
		var labReqSlvId = "";
		serviceId = $("#serviceId" + hID).val();
		subServiceId = $("#subserviceId" + hID).val();
		labRequestId = $("#labreqId" + hID).val();
		labReqSlvId = $("#labreqslvId" + hID).val();

		if (testTemplateName == "") {
			alertify.error("Please Select Template");
			SetFocus("selRisTempList");
			return false;
		}
		if (testTemplate == "") {
			testTemplate = "-";
		}
		if (impression == "") {
			impression = "-";
		}
		var isTemplateFlag = "Y";
		labResultDetails.listLabResultDto.push({
			labResultId : idResultTest,
			labRequestId : labReqMstId,
			patientId : patientId,
			treatmentId : treatmentId,
			labReqSlvId : labReqSlvId,
			serviceId : serviceId,
			subServiceId : subServiceId,
			unitId : unitId,
			departmentId : departmentId,
			testResult : testTemplateName,
			testId : idOfTest,
			impressions : impression,
			isTemplateFlag : isTemplateFlag,
		});

		labResultDetails = JSON.stringify(labResultDetails);

		var inputs = [];
		inputs.push('labResultDetails=' + encodeURIComponent(labResultDetails));
		inputs.push('testTemplate=' + encodeURIComponent(testTemplate));
		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/lab/savePatientTestTemplate",
			error : function() {
				alert('Network Issue!!!');
			},

			success : function(r) {
				ajaxResponse = r;

				if (ajaxResponse != -1) {

					if (idResultTest == 0) {
						$("#idTempResultTest" + hID).val(r);
						$("#idResultTest" + hID).val(r);
						alert("Data save successfully.");
						$("#viewLabTestTemplate").modal('hide');

					} else {
						alert("Data update successfully.");
						$("#viewLabTestTemplate").modal('hide');
					}
				} else {
					alert("Network Error!!!");
					$("#viewLabTestTemplate").modal('hide');
				}
			}
		});
	} else if (smplAccptFlag == "N") {
		$("#viewLabTestTemplate").modal('hide');
		alertify.error("Please Accept Sample First...");
		SetFocus("collTimeOut");
		return false;
	}
}

function printTestTemplateData(idResultTest) {

	var patientTest = $("#patientdetails").html();
	var patientdetails = eval('(' + patientTest + ')');
	var treatmentId = patientdetails.listRegTreBillDto[0].treatmentId;
	var hID = $("#hID").val();
	var idOfTest = $("#idOfTempTest" + hID).val();
	// var idResultTest = $("#idTempResultTest"+hID).val();
	var testmasterId = $.trim($('#testmasterId').html());

	setTimeout(
			function() {
				window.open(("labTestTemplatePrint.jsp?&testmasterId="
						+ testmasterId + "&treatmentId=" + treatmentId
						+ "&idResultTest=" + idResultTest));
			}, 500);
}

function checkPatId(id, pid, trtId) {
	var idPatPrevSelTest = $("#idPatPrevSelTest").val();
	if (pid != idPatPrevSelTest && idPatPrevSelTest != 0) {
		alertify.error("Please Select Same Patient for Print");
		$("#" + id + "").prop("checked", false);
		$("#idPatPrevSelTest").val(idPatPrevSelTest);
		return false;
	} else {
		$("#idPatPrevSelTest").val(pid);
		$('#treatmentId').val(trtId);
	}
}
function refreshPatPrevSelTest() {
	$(':checkbox').each(function() {
		this.checked = false;
	});
	$("#idPatPrevSelTest").val(0);
	$('#treatmentId').val(0);
}
function printSelTests() {
	var treatmentId = $.trim($('#treatmentId').val());
	var allVals = [];
	$(':checkbox').each(function() {
		if (this.checked == true) {
			allVals.push($(this).val());
			//alert($(this).val());
		}
	});
	if (allVals.length == 0) {
		alertify.error("Please Select at least one Patient for Print");
		return false;
	}
	// window.open("labResultPDFGenSelected.jsp?"+"&allVals="
	// +encodeURIComponent(allVals)+"&treatmentId=" + treatmentId);
	setTimeout(
			function() {
				window
						.open(("labResultPDFGenSelected.jsp?" + "&allVals="
								+ encodeURIComponent(allVals) + "&treatmentId=" + treatmentId));
			}, 300);
	refreshPatPrevSelTest();

}

function setFormulaToTestResult(rowCount) {
	var formulaForTest = $("#formulaForTest" + rowCount).val();
	// alert(formulaForTest);

	if (formulaForTest != "" && formulaForTest != "undefined"
			&& formulaForTest != "null") {
		var reportTestCount = $("#reportTestCount").val();
		formulaForTest = formulaForTest.replace(/\{/g, "$");
		formulaForTest = formulaForTest.replace(/\}/g, "$");

		var applFormula = formulaForTest.split("$");

		var expTestIdForm = "";

		for ( var i = 0; i < applFormula.length; i++) {

			var valFieldFinal = 0;

			if (i % 2 == 0) {
				if (applFormula[i] != "") {
					valFieldFinal = applFormula[i];
				}
			} else {

				var valField = 0;

				for ( var j = 1; j <= reportTestCount; j++) {
					var namei = applFormula[i];
					var name = $.trim($("#nameOfTest" + j).val());

					if (namei == name) {
						valField = $("#testvalue" + j).val();

						if (valField == "") {
							alert("Enter Value Of "
									+ $("#nameOfTest" + j).val() + " Test.");
							break;
						}

						break;
					}
				}

				valFieldFinal = valField;
			}

			if (valFieldFinal != 0) {

				expTestIdForm = expTestIdForm + valFieldFinal;
			}
		}

		// alert(expTestIdForm);

		// expTestIdForm = JSON.stringify(expTestIdForm);

		var x = parse(expTestIdForm);
		if (x != null)
			$("#testvalue" + rowCount).val(x.toFixed(2));
		$("#testvalue" + rowCount).prop('readonly', true);

	}
}

// operator table
var ops = {
	'+' : {
		op : '+',
		precedence : 10,
		assoc : 'L',
		exec : function(l, r) {
			return l + r;
		}
	},
	'-' : {
		op : '-',
		precedence : 10,
		assoc : 'L',
		exec : function(l, r) {
			return l - r;
		}
	},
	'*' : {
		op : '*',
		precedence : 20,
		assoc : 'L',
		exec : function(l, r) {
			return l * r;
		}
	},
	'/' : {
		op : '/',
		precedence : 20,
		assoc : 'L',
		exec : function(l, r) {
			return l / r;
		}
	},
	'**' : {
		op : '**',
		precedence : 30,
		assoc : 'R',
		exec : function(l, r) {
			return Math.pow(l, r);
		}
	}
};

// constants or variables
var vars = {
	e : Math.exp(1),
	pi : Math.atan2(1, 1) * 4
};

// input for parsing
// var r = { string: '123.45+33*8', offset: 0 };
// r is passed by reference: any change in r.offset is returned to the caller
// functions return the parsed/calculated value
function parseVal(r) {
	var startOffset = r.offset;
	var value;
	var m;
	// floating point number
	// example of parsing ("lexing") without aid of regular expressions
	value = 0;
	while ("0123456789".indexOf(r.string.substr(r.offset, 1)) >= 0
			&& r.offset < r.string.length)
		r.offset++;
	if (r.string.substr(r.offset, 1) == ".") {
		r.offset++;
		while ("0123456789".indexOf(r.string.substr(r.offset, 1)) >= 0
				&& r.offset < r.string.length)
			r.offset++;
	}
	if (r.offset > startOffset) { // did that work?
		// OK, so I'm lazy...
		return parseFloat(r.string.substr(startOffset, r.offset - startOffset));
	} else if (r.string.substr(r.offset, 1) == "+") { // unary plus
		r.offset++;
		return parseVal(r);
	} else if (r.string.substr(r.offset, 1) == "-") { // unary minus
		r.offset++;
		return negate(parseVal(r));
	} else if (r.string.substr(r.offset, 1) == "(") { // expression in parens
		r.offset++; // eat "("
		value = parseExpr(r);
		if (r.string.substr(r.offset, 1) == ")") {
			r.offset++;
			return value;
		}
		r.error = "Parsing error: ')' expected";
		throw 'parseError';
	} else if (m = /^[a-z_][a-z0-9_]*/i.exec(r.string.substr(r.offset))) { // variable/constant
		// name
		// sorry for the regular expression, but I'm too lazy to manually build
		// a varname lexer
		var name = m[0]; // matched string
		r.offset += name.length;
		if (name in vars)
			return vars[name]; // I know that thing!
		r.error = "Semantic error: unknown variable '" + name + "'";
		throw 'unknownVar';
	} else {
		if (r.string.length == r.offset) {
			r.error = 'Parsing error at end of string: value expected';
			throw 'valueMissing';
		} else {
			r.error = "Parsing error: unrecognized value";
			throw 'valueNotParsed';
		}
	}
}

function negate(value) {
	return -value;
}

function parseOp(r) {
	if (r.string.substr(r.offset, 2) == '**') {
		r.offset += 2;
		return ops['**'];
	}
	if ("+-*/".indexOf(r.string.substr(r.offset, 1)) >= 0)
		return ops[r.string.substr(r.offset++, 1)];
	return null;
}

function parseExpr(r) {
	var stack = [ {
		precedence : 0,
		assoc : 'L'
	} ];
	var op;
	var value = parseVal(r); // first value on the left
	for (;;) {
		op = parseOp(r) || {
			precedence : 0,
			assoc : 'L'
		};
		while (op.precedence < stack[stack.length - 1].precedence
				|| (op.precedence == stack[stack.length - 1].precedence && op.assoc == 'L')) {
			// precedence op is too low, calculate with what we've got on the
			// left, first
			var tos = stack.pop();
			if (!tos.exec)
				return value; // end reached
			// do the calculation ("reduce"), producing a new value
			value = tos.exec(tos.value, value);
		}
		// store on stack and continue parsing ("shift")
		stack.push({
			op : op.op,
			precedence : op.precedence,
			assoc : op.assoc,
			exec : op.exec,
			value : value
		});
		value = parseVal(r); // value on the right
	}
}

function parse(string) { // wrapper
	var r = {
		string : string,
		offset : 0
	};
	try {
		var value = parseExpr(r);
		if (r.offset < r.string.length) {
			r.error = 'Syntax error: junk found at offset ' + r.offset;
			throw 'trailingJunk';
		}
		return value;
	} catch (e) {
		alert(r.error + ' (' + e + '):\n' + r.string.substr(0, r.offset)
				+ '<*>' + r.string.substr(r.offset));
		return;
	}
}

/* lab formula end */
/*--------------------------------------------------------Jyoti------------------------------------------------------------------------------------------------------*/

var HeadingLabFrmDiv = '{#foreach $T.lbHedLi as lbHedLi}'
		+ '<tr><td class="col-md-1-1" style="margin-top:-7px;">'
		+ '<input type="checkbox" value="{$T.lbHedLi.idHed}" id="headcheck{$T.lbHedLi.idHed}" name="headchk" onclick=featchLabFormulaPro({$T.lbHedLi.idHed},"assign","{$T.lbHedLi.isCat}") /></td>'
		+ '<td class="col-md-10-1" style="margin-top:-2px;">{$T.lbHedLi.hcod} - {$T.lbHedLi.hedNm}</td></tr>{#/for}';

function getLabFormulaHeading(type) {
	// alert(type);

	if (type == "onload") {
		$("#txtTestHeadingSearch").val("");
	}
	var inputs = [];
	// inputs.push('action=getGroups');
	inputs.push('type=' + type);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/lab/getLabFormulaHeading",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			count = 1;
			if (r.lbHedLi.length > 0) {
				if (type == "onload") {
					$("#HeadingDiv").setTemplate(HeadingLabFrmDiv);
					$("#HeadingDiv").processTemplate(r);
				}
			}
		}
	});
}

function featchLabFormulaPro(idHed, type, isCategory) {
	$('input:checkbox[name=headchk]').attr("checked", false);
	$('input:checkbox[id=headcheck' + idHed + ']').attr("checked", true);
	var $radios = $('input:checkbox[id=headcheck' + idHed + ']');
	if ($radios.is(':checked') == true) {

		proTestCount = 1;
		var inputs = [];
		// inputs.push('action=featchProAndTest');
		inputs.push('isCategory=' + isCategory);
		inputs.push('idHed=' + idHed);
		inputs.push('type=' + type);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/lab/featchLabFormulaPro",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				$("#testDetails").html(r);
				if (r.lbHedLi.length > 0) {
					$("#testDiv").setTemplate(featchProAndTestTemp);
					$("#testDiv").processTemplate(r);
				}

			}
		});
	}

}
/*----------------------------------------------Added by Ajay:26-04-2019--------------------------------------------------------------*/
function autoSuggestionForDoctorSale(inputID, typeauto) {
	var resultData = [];
	var txtVal1 = $('#' + inputID).val();
	var inputs = [];
	inputs.push('doctorname=' + txtVal1);
	inputs.push('callfrom=' + typeauto);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/report/fetchDoctor",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('error');
		},
		success : function(r) {

			var availableTags = [];
			if (r.length == 50) {
				alert("NO MATCHING FOUND");

			} else {
				ajaxResponse = r;
				for ( var i = 0; i < ajaxResponse.listDoctor.length; i++) {
					availableTags.push(ajaxResponse.listDoctor[i].dn + "_"
							+ ajaxResponse.listDoctor[i].di);
				}

				var template = "";
				for ( var j = 0; j < availableTags.length; j++) {
					var arrValue = (availableTags[j]).split("_");
					var idValue = (arrValue[1]);
					resultData.push({
						ID : idValue,
						Name : arrValue[0]
					});

					template = template + '<li data-value= "' + (arrValue[1])
							+ '" class=""><a href="#">' + arrValue[0]
							+ '</a></li>';

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
						onSelect : displayResult2,
						scrollBar : true

					});

				}, 500);
			}
		}
	});

	function displayResult2(item) {
		$('#' + inputID).val(item.text);
		$("#hiddenDoctorId").val(item.value);
	}

}
/*----------------------------------------------ending by Ajay:26-04-2019--------------------------------------------------------------*/

// Added by ajay :11-04-2019
function viewOutSourceTestforResult() {
	var allVals = [];
	$(':checkbox').each(function() {
		if (this.checked == true) {
			allVals.push($(this).val());
		}
	});
	if (allVals.length == 0) {
		alertify.error("Please Select at least one Patient for OutSource");
		return false;
	}
	$("#outSourcelabpopup").modal('show');
}
/*----------------------------------------------Added by Ajay:11-04-2019--------------------------------------------------------------*/
/*----------------------------------------------Added by Ajay:26-04-2019 chech box function check current tab test result --------------------------------------------------------------*/

function checkPatientId(id, pid, trtId, testid, labrequestid, rate) {
	var patientId = $("#patientId").val();
	if (pid != patientId && patientId != 0) {
		alertify.error("Please Select Same Patient");
		$("#" + id + "").prop("checked", false);
		$("#patientId").val(patientId);
		return false;
	} else {
		$("#patientId").val(pid);
		$('#treatmentId').val(trtId);
		$('#testid').val(testid);
		$('#labrequestid').val(labrequestid);
		$('#rate').val(rate);
		recordchechbox(id, pid, trtId, testid, labrequestid, rate);
	}

}
/*----------------------------------------------ending by Ajay:26-04-2019--------------------------------------------------------------*/
/*----------------------------------------------Added by Ajay:26-04-2019 count chechbox value -------------------------------------------------------------*/

var patientArray = [];
var treatmentArray = [];
var testIdArray = [];
var labrequestIdArray = [];
var rateArray = [];
function recordchechbox(id, pid, trtId, testid, labrequestid, rate) {
	if ($('#' + id).is(':checked')) {

		this.patientArray.push(pid);
		this.treatmentArray.push(trtId);
		this.testIdArray.push(testid);
		this.labrequestIdArray.push(labrequestid);
		this.rateArray.push(rate);
		/*alert(labrequestid);
		alert(testid);
		alert(rate);*/
	}
/*
	for ( var i = 0; i < patientArray.length; i++) {
		console.log(patientArray[i]);
	}

	for ( var i = 0; i < treatmentArray.length; i++) {
		console.log(treatmentArray[i]);
	}

	for ( var i = 0; i < testIdArray.length; i++) {
		console.log(testIdArray[i]);
	}

	for ( var i = 0; i < labrequestIdArray.length; i++) {
		console.log(labrequestIdArray[i]);
	}
	for ( var i = 0; i < rateArray.length; i++) {
		console.log(rateArray[i]);
	}*/

}
/*----------------------------------------------Added by Ajay:26-04-2019  save outsource --------------------------------------------------------------*/

function saveTestOutSourceToLab() {
	var outlabId = $('#outlabId').val();
	var outsourcemasterid = $("#outsourcemasterid").val();
	var treatmentId = $('#treatmentId').val();
	var patientId = $('#patientId').val();
	var dispatchDate = $('#dispatchDate').val();
	var dispatchTime = $('#dispatchTime').val();
	var carrierId = $('#carrierId').val();
	var CommentId = $('#CommentId').val();

	if (treatmentId == 0 || treatmentId == "undefined" || treatmentId == null) {
		alert("Please Select Patient");
		$("#treatmentId").focus();
		return false;
	}
	
	
	var testid = {
		listOutSource : []//do not change please check back-end flow then change value

	};
	testid.listOutSource.push({

		testIdArray : testIdArray,
	});

	var labrequestid = {
		listlabrequestId : [],//do not change please check back-end flow then change value

	};

	labrequestid.listlabrequestId.push({

		labrequestIdArray : labrequestIdArray,
	});

	var labRate = {
		listlabRate : [],//do not change please check back-end flow then change value

	};

	labRate.listlabRate.push({

		rateArray : rateArray,
	});

	testid = JSON.stringify(testid);//do not change please check back-end flow then change value
	labrequestid = JSON.stringify(labrequestid);//do not change please check back-end flow then change value
	labrate = JSON.stringify(labRate);//do not change please check back-end flow then change value
/*	alert("TestiD" + testid);
	alert("LabrequestID" + labrequestid);
	alert("LabRate" + labrate);*/

/*	if (outSourcelabName == "" || outSourcelabName == "undefined"
		|| outSourcelabName == null) {
	alert("Please Enter lab Name");
	$("#outSourcelabName").focus();
	return false;
}
	*/
	
	
	var inputs = [];

	inputs.push('outlabId=' + outlabId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('patientId=' + patientId);
	inputs.push('outsourcemasterid=' + outsourcemasterid);
	inputs.push('dispatchDate=' + dispatchDate);
	inputs.push('dispatchTime=' + dispatchTime);
	inputs.push('carrierId=' + carrierId);
	inputs.push('CommentId=' + CommentId);
	inputs.push('labrequestid=' + labrequestid);
	inputs.push('testid=' + testid);
	inputs.push('labrate=' + labrate);
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		url : "ehat/OutSourceMasterController/saveOutSourceTest",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert("Record saved successfully..!");
		     printOutSource11();
			$('#dispatchDate').val('');
			$('#dispatchTime').val('');
			$('#carrierId').val('');
			$('#CommentId').val('');
		  //   window.location.replace("labTestPatientDashboard.jsp");

		}
	});
}
/*----------------------------------------------ending by Ajay:26-04-2019--------------------------------------------------------------*/

/*----------------------------------------------Added by Ajay:26-04-2019  fetch list outsource--------------------------------------------------------------*/

function getAllLaboutSourcelist() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/OutSourceMasterController/fetchLabOutsourceList",
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if (r.listlaboutSource.length > 0) {

				$("#patientcontainerOutSource").setTemplate(
						patientcontainerOutSource);
				$("#patientcontainerOutSource").processTemplate(r);

			}
		}
	});
}
/*----------------------------------------------ending by Ajay:26-04-2019--------------------------------------------------------------*/

/*----------------------------------------------Added by Ajay:26-04-2019  set template outsource --------------------------------------------------------------*/

var count3 = 1;
var patientcontainerOutSource = "<table class='table table-bordered table-condensed cf'><thead class='cf'>"
		+ "<tr><th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Dispatch Date</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Dispatch Time </div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>OutSource Lab Name </div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Age</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Gender</div></th>"
		+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Test</div></th>"

		/*+ "<th class='numeric col-md-3-1 center' style='height: 21.5px;'><div class='TextFont' ><button onclick='printOutSource11()' data-placement='left' data-toggle='tooltip' class='btn btn-xs btn-warning' data-original-title='Print'><i class='fa fa-print'></i></button></div></th>"*/
		+ "<th style='height: 21.5px;' class='numeric col-md-3-1 center'><div class='TextFont'><button data-original-title='Print' class='btn btn-xs btn-warning' data-toggle='tooltip' data-placement='left' onclick='printOutSource11()'><i class='fa fa-print'></i></button></div></th>"
		+ "	</tr></thead><tbody>"
		+ " {#foreach $T.listlaboutSource as lbrsltli}"
		+ "<td class='filterable-cell' align='center'>{count3++}.</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.disdate}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.distime1}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.labname}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.pid}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.patientName}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.age}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.gendar}</td>"
		+ "<td class='filterable-cell' align='center'>{$T.lbrsltli.testname}</td>"
		+ "<td class='numeric filterable-cell'><input type='checkbox' style='margin-top: 2px; margin-left: 9px; cursor: pointer;' id='checkboxTest_{count - 1}' value='{$T.lbrsltli.labreqId}' onclick='checkPatientOutSource(this.id,{$T.lbrsltli.pid},{$T.lbrsltli.trtId})'></td>"
		+ "</tr>{#/for}</tbody></table>";

/*----------------------------------------------ending by Ajay:26-04-2019--------------------------------------------------------------*/

/*----------------------------------------------Added by Ajay:26-04-2019- outsource print validate same patient but multiple test accepted-------------------------------------------------------------*/

function checkPatientOutSource(id, pid, trtId) {
	var patientId = $("#patientId").val();
	if (pid != patientId && patientId != 0) {
		alertify.error("Please Select Same Patient");
		$("#" + id + "").prop("checked", true);
		$("#patientId").val(patientId);
		return false;
	} else {
		$("#patientId").val(pid);
		$('#treatmentId').val(trtId);

	}

}
/*----------------------------------------------ending by Ajay:26-04-2019--------------------------------------------------------------*/

/*----------------------------------------------Added by Ajay:26-04-2019--------------------------------------------------------------*/

function printOutSource11() {
	var treatmentId = $.trim($('#treatmentId').val());
	var allVals = [];
	$(':checkbox').each(function() {
		if (this.checked == true) {
			allVals.push($(this).val());
		}
	});
	if (allVals.length == 0) {
		alertify.error("Please Select at least one Patient for Print");
		return false;
	}
	setTimeout(
			function() {
				window
						.open(("outSourceTestPdf.jsp?" + "&allVals="
								+ encodeURIComponent(allVals) + "&treatmentId=" + treatmentId));
			}, 300);
	refreshPatPrevSelTest();

}
/*----------------------------------------------ending by Ajay:26-04-2019--------------------------------------------------------------*/


