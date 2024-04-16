/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment To Save Lab Formula.
************************************************************/
function saveLabFormula1() {
	var resultTestId = $.trim($("#resultTestId").val());
	var expTestId = $.trim($("#texArSHform").val());
	var idLabFormula = $("#idLabFormula").val();

	if (resultTestId == "") {
		alert("Please Select First Half Of Formula.");
		return false;
	} else if (expTestId == "") {
		alert("Please Select Second Half Of Formula.");
		return false;
	}

	expTestId = expTestId.replace(/\{/g, "$");
	expTestId = expTestId.replace(/\}/g, "$");

	var inputs = [];
	inputs.push('idlabFormula=' + idLabFormula);
	inputs.push('resultTestId=' + encodeURIComponent(resultTestId));
	inputs.push('expTestId=' + encodeURIComponent(expTestId));
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/labformula/savelabformula",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
		}
	});
	$("#txtFHform").val("");
	$("#texArSHform").val("");
	$("#idLabFormula").val("0");
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment To Edit Lab Formula.
************************************************************/
function editLabFormula1() {
	var labFormId = 0;
	$.each($('.radio:checked'), function() {
		labFormId = $(this).val();
	});
	if (labFormId == 0) {
		alert("Please Select Lab Formula To Edit.");
		return false;
	}

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/labformula/getlabformulabyid/"+labFormId,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$("#txtFHform").val(r.labTestDTO.testName);
			$("#texArSHform").val(r.expTestId);
			$("#resultTestId").val(r.labTestDTO.idTest);
			$("#idLabFormula").val(labFormId);
		}
	});
	
	$(".close").click();
	$("#iPopupFormula").hide('hide');
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment To Delete Lab Formula.
************************************************************/
function deleteLabFormula1() {
	var labFormId = 0;
	$.each($('.radio:checked'), function() {
		labFormId = $(this).val();
	});
	if (labFormId == 0) {
		alert("Please Select Lab Formula To Delete.");
		return false;
	}

	var r = confirm("Are You Confirm To Delete Lab Formula.");

	if(!r){
		return false;
	}
	else {
		jQuery.ajax({
			async : true,
			type : "DELETE",
			url : "ehat/labformula/deletelabformula/"+labFormId,
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {

				if (r) {

					alert( "Lab Formula deleted Successfully.");
					$(".close").click();
				}
			}
		});
	}
	$("#iPopupFormula").hide('hide');
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment To Hide Lab Formula Popup.
************************************************************/
function hideiPopupFormula(){
	$("#iPopupFormula").hide('hide');
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment To Get All Headings.
************************************************************/
function getLabFormulaHeadings(type) {
	if (type == "onload") {
		$("#txtTestHeadingSearch").val("");
	}
	var inputs = [];
	inputs.push('type=' + type);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/labformula/getlabformulaheadings",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			if (r.labheadingsList.length > 0) {
				if (type == "onload") {
					setLabFormulaHeadingTemp(r);				
				}
			}
		}
	});
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment To set template for lab headings.
************************************************************/
function setLabFormulaHeadingTemp(response){
	var divContent="";
	for(var i = 0; i < response.labheadingsList.length; i++){
		divContent=divContent+"<tr>"
		+ "<td class = 'col-md-1-1' style = 'margin-top:-7px;'>"
		+ "<input type = 'checkbox' value = '"+response.labheadingsList[i].idheadings+"' id = 'headcheck"+response.labheadingsList[i].idheadings+"' name = 'headchk' onclick = featchLabFormulaPro("+response.labheadingsList[i].idheadings+",'assisgn','"+response.labheadingsList[i].isCategory+"')></td>"
		+ "<td class = 'col-md-10-1' style = 'margin-top:-2px;'>"+response.labheadingsList[i].hcode+" - "+response.labheadingsList[i].heading+"</td></tr>";
	}
	$("#HeadingDiv").html(divContent);
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment To Fetch Lab Formula Profiles.
************************************************************/
function featchLabFormulaPro(idHed, type, isCategory) {
	$('input:checkbox[name=headchk]').attr("checked", false);
	$('input:checkbox[id=headcheck' + idHed + ']').attr("checked", true);
	var $radios = $('input:checkbox[id=headcheck' + idHed + ']');
	
	if ($radios.is(':checked') == true) {
		proTestCount = 1;
		var inputs = [];
		inputs.push('isCategory=' + isCategory);
		inputs.push('idHed=' + idHed);
		inputs.push('type=' + type);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "ehat/labformula/featchLabFormulaPro",
			error : function() {
				alert('Network Issue!!!');
			},
			success : function(r) {
				$("#testDetails").html(r);
				if (r.labheadingsList.length > 0) {
					$("#testDiv").setTemplate(featchProAndTestTemp);
					$("#testDiv").processTemplate(r);
				}
			}
		});
	}
}

var featchProAndTestTemp = "<div id='featchProAndTestTemp'>"
	+ "{#foreach $T.labheadingsList[0].labPkgli as lbpkgli}"
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
	+ "{#param name=x value=1} " +
			"" +
			"{#foreach $T.pkgprotstli.lbpkgproli as lbpkgproli}"
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
	+ "{#/for} " +
			"{#foreach $T.labheadingsList[0].labProfileList as lbProLi}"
	+ "<div style='width: 100%; margin-top: 20px;' id='proDiv{$T.lbProLi.idprofile}'>"
	+ "<div class='col-sm-12-1' style='border-bottom: 1px solid #b8b8b8; border-top: 0px solid #b8b8b8; padding-bottom: 5px;' id='proIdDiv{$T.lbProLi.idprofile}'>"
	+ "<div class='divide-20'></div>"
	+ "<div class='col-sm-1-1'	style='text-align: center; padding-top: 5px;'>"
	+ "<input type='checkbox' value='{$T.lbProLi.idprofile}' id='procheck{$T.lbProLi.idprofile}' onclick='sendProToAsign({$T.lbProLi.idprofile})' /></div>"
	+ "<div class='col-sm-10-1' style='padding-left: 1%; padding-top: 5px; text-align: left;' id='ProCodNm{$T.lbProLi.idprofile}'>{$T.lbProLi.profileCode} - {$T.lbProLi.profileName}</div>"
	+ "<input type='hidden' id='ProCodCharge{$T.lbProLi.idprofile}' value='{$T.lbProLi.profileCharges}' /></div>"
	+ "{#param name=x value=1} " +
			"{#foreach $T.lbProLi.labProfileTestCompDTO as protestLi}"
	+ "<div class='col-sm-12-1' style='width: 94%; float: right; margin-top: 0px; padding-bottom: 5px; border-bottom: 1px solid #b8b8b8; border-left: 1px solid #b8b8b8; border-top: 0px solid blue;'"
	+ "id='proTestDiv-{$T.protestLi.idTest}-{$T.lbProLi.idprofile}'>"
	+ "<div class='divide-10'></div>"
	+ "<div class='col-sm-1-1'	style='text-align: center; padding-top: 5px;'>"
	+ "<input type='checkbox' value='{$T.protestLi.idTest}' id='proTestcheck-{$T.protestLi.idTest}-{$T.lbProLi.idprofile}'"
	+ "id='proTestcheck{$T.lbProLi.idprofile}' onclick='sendProTestToAsign({$T.protestLi.idTest},{$T.lbProLi.idprofile})' /></div>"
	+ "<div class='col-sm-10-1' style='padding-left: 1%; padding-top: 5px; text-align: left;' id='proTestNm-{$T.protestLi.idTest}-{$T.lbProLi.idprofile}'>"
	+ "{$T.protestLi.testCode} - {$T.protestLi.testName}</div>"
	+ "<input type='hidden' id='proTestCharge-{$T.protestLi.idTest}-{$T.lbProLi.idprofile}' value='{$T.protestLi.testRate}' /></div>"
	+ "<input type='hidden' value='{$T.protestLi.idTest}'	id='ProTestId-{$T.lbProLi.idprofile}-{$P.x++}' /> {#/for}"
	+ "<input type='hidden' id='proTestCount{$T.lbProLi.idprofile}' value='{--$P.x}' /></div>"
	+ "{#/for} " +
			"{#foreach $T.lbHedLi[0].labTestList as lbTestLi}"
	+ "<div class='col-sm-12-1' style='width: 100%; border-bottom: 1px solid #b8b8b8; padding-bottom: 5px; margin-top: 10px;' id='testDiv{$T.lbTestLi.idTest}'>"
	+ "<div class='col-sm-1-1'	style='text-align: center; padding-top: 5px;'>"
	+ "<input type='checkbox' value='{$T.lbTestLi.idTest}' id='testcheck{$T.lbTestLi.idTest}' onclick='sendTestToAsign({$T.lbTestLi.idTest})' /></div>"
	+ "<div class='col-sm-10-1' style='padding-left: 1%; padding-top: 5px; text-align: left;' id='testNm{$T.lbTestLi.idTest}'>{$T.lbTestLi.testCode} - {$T.lbTestLi.testName}"
	+ "<input type='hidden' id='testCharge{$T.lbTestLi.idTest}' value='{$T.lbTestLi.testRate}' /></div></div>{#/for}</div>";


function sendProToAsign(proId) {

	var count = $("#testCount").val();
	var procount = $("#profileCount").val();
	$('input:checkbox[id=procheck' + proId + ']').attr("checked", true);
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
		$('input:checkbox[id=procheck' + proId + ']').attr("disabled", true);
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

function setFormilaSideInducator(indiVal) {
	$("#selIndi").val(indiVal);
}

function sendSymbToSH(sym) {

	var texArSHform = $.trim($('#texArSHform').val());

	$('#texArSHform').val(texArSHform + sym);
}

function featchLabFormulas() {
	count = 1;
	var searchText = $.trim($("#serchTxt").val());
	var searchType = "search";
	if (searchText == "") {
		searchType = "onload";
	}
	
    jQuery.ajax({
        async : true,
        type : "POST",
    	data : {    	
			"searchText" : searchText,
			"searchType" : searchType
		},
		url : "ehat/labformula/featchLabFormulas",
        success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.labFormulaList.length; i++) {
				divContent = divContent
						+ "<tr><td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.labFormulaList[i].labTestDTO.testName+"</td>";
				
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.labFormulaList[i].expTestId+"</td>";
		
				divContent = divContent + "<td class='col-md-1 center' id='testIdd'><input class='radio' id='checkbx"+(i+1)+"' name = 'radio' type='radio' value='"+ r.labFormulaList[i].idlabFormula+"'></td></tr>";
			}
			$('#formulalist').html(divContent);
		   
			$("#iPopupFormula").show('show');
        }
    });  
}

var featchLabFormulasTemp = '{#foreach $T.labFormulaList as lbfrmLi}<div style="width: 100%; height: 25px; border: 1px solid #b8b8b8; border-top: none;"> <div style="width: 5%; height: 25px; border-right: 1px solid #b8b8b8; padding-left: 1%; padding-top: 5px;">{count}</div> <div style="width: 12%; height: 25px; border-right: 1px solid #b8b8b8; padding-left: 1%; padding-top: 5px;">{$T.lbfrmLi.formulaLH}</div> <div style="width: 73%; height: 25px; border-right: 1px solid #b8b8b8; padding-left: 1%; padding-top: 5px;">{$T.lbfrmLi.expTestId}</div> <div style="width: 5.5%; height: 25px; border-right: 1px solid #b8b8b8; padding-left: 1%; padding-top: 5px;"> <input type="checkbox" id="checkbx" name="checkbox{count++}" value="{$T.lbfrmLi.labTestDTO.idTest}" style="width: 80%;"/></div></div> {#/for}';

function setTemplate(r){
	var divContent="";
	for(var i = 0; i < r.length; i++){
		divContent = divContent+"<tr><td><div style='width: 100%; height: 25px; border: 1px solid #b8b8b8; border-top: none;'> <div style='width: 5%; height: 25px; border-right: 1px solid #b8b8b8; padding-left: 1%; padding-top: 5px;'>"+i+1+"</div> <div style='width: 12%; height: 25px; border-right: 1px solid #b8b8b8; padding-left: 1%; padding-top: 5px;'>"+r[i].formulaLH+"</div> <div style='width: 73%; height: 25px; border-right: 1px solid #b8b8b8; padding-left: 1%; padding-top: 5px;'>"+r[i].expTestId+"</div> <div style='width: 5.5%; height: 25px; border-right: 1px solid #b8b8b8; padding-left: 1%; padding-top: 5px;'> <input type='checkbox' id='checkbx' name='checkbox"+i+1+"' value='"+r[i].labTestDTO.idTest+"' style='width: 80%;'/></div></div></td></tr>";
	}
	$("#icdDiagnosis").html(divContent);
}

function labFormulaAutoSugg(formulaId) {
	var resultData = [];
	var labFormula = $("input#" + formulaId).val();

	if (labFormula == "" || labFormula == null || labFormula == "null" || labFormula == undefined) {
		alert("Please enter search value");
		$("input#" + formulaId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(labFormula));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/labformula/labformulaautosugg",
		cache : false,
		success : function(response) {
			var template = "";
			for ( var j = 0; j < response.labFormulaList.length; j++) {
				var arrValue = response.labFormulaList[j].idlabFormula +"-"+response.labFormulaList[j].labTestDTO.testName;
				var idValue = response.labFormulaList[j].idlabFormula;
				var labFormula = response.labFormulaList[j].labTestDTO.testName;
				resultData.push({
					ID : idValue,
					Name : labFormula
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#divbyName .typeahead").html(template);
				$("div#divbyName .typeahead").show();

				$("input#" + formulaId).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + formulaId).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var formulaId = res[0];
		var formulaName = res[1];
		getFormulaById(formulaId);
		$("input#" + formulaId).val(formulaName);
	}
}

function getFormulaById(formulaId) {
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/labformula/getlabformulabyid/"+formulaId,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			templateForLabFormula(response);
			$('#byName').val("");
		}
	});
}

function templateForLabFormula(r){
	var divContent = "";
		divContent = divContent
				+ "<tr><td  class='col-md-1 center'>"+1+ "</td>";
		
		divContent = divContent
				+ "<td class='col-md-1 center'>"+ r.labTestDTO.testName+"</td>";
		
		divContent = divContent
				+ "<td class='col-md-1 center'>"+ r.expTestId+"</td>";

		divContent = divContent + "<td class='col-md-1 center' id='testIdd'><input class='radio' id='checkbx"+1+"' name = 'radio' type='radio' value='"+ r.idlabFormula+"'></td></tr>";
	$('#formulalist').html(divContent);
}