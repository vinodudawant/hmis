
/************
 * @author	: Vinod Udawant
 * @date		: 18-Nov-2019
 * @codeFor	: Check uncheck all checkbox in table
 ************/
function toggleEntryDiv(id) {

	/*$("#"+id).slideToggle('slow', function() {
	});*/
	if (id == "divForEdit") {

		$("#divForEntry").show('slow');
	} else {

		$("#divForEntry").toggle('slow');
	}
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : saveICDDiagnosisLevel1
 ******************************************************************************/
function saveICDDiagnosisLevel1() {
	var icdFlag = "";
	var icdId = $("#icdId").val();
	var icdCode = $("#icdCode").val();
	var icdDiagnosis = $("#icdDiagnosis").val();
	var icdDescription = $("#icdDescription").val();
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();

	if (document.getElementById('icd10').checked) {
		icdFlag = 1;
	}

	if (document.getElementById('icdo').checked) {
		icdFlag = "0";
	}

	if (icdFlag == "" || icdFlag == null || icdFlag == "null") {
		alert("Select ICDd10 OR ICDO");
		return false;
	}

	var inputs = [];
	inputs.push("idicd10_L=" + icdId);
	inputs.push("icd_code_L=" + icdCode);
	inputs.push("name_L=" + icdDiagnosis);
	inputs.push("name_L1=" + icdDescription);
	inputs.push("icd_Flag=" + icdFlag);
	inputs.push("createdBy=" + userId);
	inputs.push("unitId=" + unitId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/saveicddiagnosisLevel1",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (response == 1) {
				alertify.success("Record saved successfully..!");
			} else if (response == 2) {
				alertify.success("Record Updated successfully..!");
			} else if (response == 3) {
				alertify.error("ICD Code is Already Present..!");
			} else {
				alertify.error("Network Issue");
			}

			fetchICD10Level1();
			refershIcd10Mgmt();

		}
	});

}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : fetchICD10Level1()
 ******************************************************************************/
function fetchICD10Level1() {

	var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/fetchicd10level1",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			seticd10CodeMgmtTemplate(r);
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : seticd10CodeMgmtTemplate()
 ******************************************************************************/

function seticd10CodeMgmtTemplate(response) {

	var htm = "";
	var index = 1;

	for ( var i = 0; i < response.icd10_L_List.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.icd10_L_List[i].idicd10_L
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.icd10_L_List[i].icd_code_L
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ response.icd10_L_List[i].name_L
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess"  data-toggle="modal"  onclick=editIcd10CodeMgmt('
				+ response.icd10_L_List[i].idicd10_L
				+ ')><i class="fa fa-edit"></i></button></td>'

				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger deleteUserAccess"   onclick=deleteIcd10CodeMgmt('
				+ response.icd10_L_List[i].idicd10_L
				+ ')><i class="fa fa-trash-o"></i></button></td>'

				+ '</tr>';

		index++;

	}
	$("#icd10codeMgmtBody").html(htm);
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : editIcd10CodeMgmt()
 ******************************************************************************/
function editIcd10CodeMgmt(icdId) {

	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('icdId=' + icdId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/editIcd10codemgmt",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {

			$("#icdId").val(r.idicd10_L);
			$("#icdCode").val(r.icd_code_L);
			$("#icdDiagnosis").val(r.name_L);
			$("#icdDescription").val(r.name_L1);
			if (r.icd_Flag == parseInt(1)) {
				document.getElementById('icd10').checked = true;
			} else {
				document.getElementById('icdo').checked = true;
			}
			toggleEntryDiv('divForEntry');

		}
	});

}

/************
 * @author	: Dayanand Khandekar
 * @date		: 20-jan-2020
 * @codeFor	: deleteIcd10CodeMgmt
 ************/

function deleteIcd10CodeMgmt(id) {

	var r = confirm("Are You Sure You Want Delete To Icd 10 Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/admin/deleteicd10codemgmt",
			data : {
				"icdId" : id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);

				fetchICD10Level1();
			}
		});
	}
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : icd10CodeMgmtAutoSuggestion()
 ******************************************************************************/

function icd10CodeMgmtAutoSuggestion(inputID) {

	var resultData = [];
	var icdCode = $("input#" + inputID).val();
	if (icdCode == "" || icdCode == null || icdCode == "null"
			|| icdCode == undefined) {
		alert("Please enter search value");
		$("input#" + inputID).focus();
		fetchICD10Level1();
		return false;
	}
	var icdFlag="";
	if (document.getElementById('icd10').checked) {
		icdFlag = 1;
	}

	if (document.getElementById('icdo').checked) {
		icdFlag = "0";
	}
	
	var inputs = [];
	inputs.push('icdCode=' + icdCode);
	inputs.push('icdFlag=' + icdFlag);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/icd10Codemgmtautosuggestion",
		cache : false,
		success : function(response) {
			//alert(JSON.stringify(response));

			var template = "";
			for ( var j = 0; j < response.icd10_L_List.length; j++) {

				var arrValue = response.icd10_L_List[j].idicd10_L + "-"
						+ response.icd10_L_List[j].icd_code_L;
				var idValue = response.icd10_L_List[j].idicd10_L;
				var docName = response.icd10_L_List[j].icd_code_L;

				resultData.push({
					ID : idValue,
					Name : docName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}
			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displaySubInventorySearchResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	//below function to set the search value to search text feild and calling getPackingDetailsById function
	function displaySubInventorySearchResult(item) {
		
		var res = item.text.split('-');
		var id = res[0];
		var subInventoryName = res[1];
		getIcd10CodeMgmtById(id);
		$("#" + inputID).val(subInventoryName);
	}
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : refershIcd10Mgmt()
 ******************************************************************************/
function refershIcd10Mgmt() {
	$("#icdId").val(0);
	$("#icdCode").val("");
	$("#icdDiagnosis").val("");
	$("#icdDescription").val("");

	document.getElementById('icd10').checked;

}
/************
 * @author	: Dayanand Khandekar
 * @date		: 20-Jan-2020
 * @codeFor	:  getIcd10CodeMgmtById 
 ************/
function getIcd10CodeMgmtById(id) {

	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('icdId=' + id);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/editIcd10codemgmt",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {

			seticd10codeTemplateAfterAuto(r);

		}
	});

}
/************
 * @author	: Dayanand Khandekar
 * @date		: 20-Jan-2020
 * @codeFor	:  getIcd10CodeMgmtByIdOnClick
 ************/
function getIcd10CodeMgmtByIdOnClick() {
	var id = $("#invistgroupId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(id)) {
		alert("Please Enter ICD ID Only!");
		$("#invistgroupId").focus();
		return false;
	}
	getIcd10CodeMgmtById(id);
}
/************
 * @author	: Dayanand Khandekar
 * @date		: 20-Jan-2020
 * @codeFor	:  seticd10codeTemplateAfterAuto
 ************/
function seticd10codeTemplateAfterAuto(response) {
	if (response.icd_code_L == null || response.icd_code_L == ""
			|| response.icd_code_L == "null") {
		alert("Record Not Found");
		return false;
	}

	var htm = "";
	var index = 1;

	htm = htm
			+ '<tr> '
			+ ' <td class="col-md-1 center">'
			+ index
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+ response.idicd10_L
			+ '</td>'

			+ ' <td class="col-md-1 center">'
			+ response.icd_code_L
			+ '</td>'

			+ ' <td class="col-md-1 center">'
			+ response.name_L
			+ '</td>'

			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success editBodyPartMaster"  data-toggle="modal"  onclick=editIcd10CodeMgmt('
			+ response.idicd10_L
			+ ')><i class="fa fa-edit"></i></button></td>'

			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger deleteUserAccess "   onclick=deleteIcd10CodeMgmt('
			+ response.idicd10_L
			+ ')><i class="fa fa-trash-o"></i></button></td>'

			+ '</tr>';

	index++;

	$("#icd10codeMgmtBody").html(htm);
}
