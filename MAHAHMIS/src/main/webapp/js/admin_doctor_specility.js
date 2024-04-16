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
function saveDoctorSpeciality() {
	var docSplId = $("#docSplId").val();
	var selDocSpeciality = $("#selDocSpeciality").val();
	var txtwdConsultation = $("#txtwdConsultation").val();
	var txtwdFollowup = $("#txtwdFollowup").val();
	var txtweConsultation = $("#txtweConsultation").val();
	var txtweFollowup = $("#txtweFollowup").val();

	var userId = $("#userId").val();
	var unitId = $("#unitId").val();

	
	if (selDocSpeciality == ""||selDocSpeciality=="null"||selDocSpeciality==null) {
		alert("Please Enter Doctor Specility");
		return false;
	}
	

	var inputs = [];
	inputs.push('idDoctorSpecilities=' + docSplId);
	inputs.push('specialityName=' + selDocSpeciality);
	inputs.push('wdConsultation=' + txtwdConsultation);
	inputs.push('wdFolloup=' + txtwdFollowup);
	inputs.push('weConsultation=' + txtweConsultation);
	inputs.push('weFolloup=' + txtweFollowup);
	
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/saveDoctorSpeciality",
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
			}  else {
				alertify.error("Network Issue");
			}
			defaultViewDoctorSpeciality();
			refershDoctorSpecility();

		}
	});

}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 28-May-2020
 * @codeFor : defaultViewDoctorSpeciality()
 ******************************************************************************/
function defaultViewDoctorSpeciality() {

	var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/defaultViewDoctorSpeciality",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			

			setdoctorSpecilityTemplate(r);
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 28-May-2020
 * @codeFor : setdoctorSpecilityTemplate()
 ******************************************************************************/

function setdoctorSpecilityTemplate(response) {
	

	var htm = "";
	var index = 1;

	for ( var i = 0; i < response.listDoctorSpecility.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.listDoctorSpecility[i].idDoctorSpecilities
				+ '</td>'
				
				+ ' <td class="col-md-1 center">'
				+ response.listDoctorSpecility[i].specialityName
				+ '</td>'

				

				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster"  data-toggle="modal"  onclick=editDoctorSpeciality('
				+ response.listDoctorSpecility[i].idDoctorSpecilities
				+ ')><i class="fa fa-edit"></i></button></td>'

				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger deleteUserAccess"   onclick=deleteDoctorSpecility('
				+ response.listDoctorSpecility[i].idDoctorSpecilities
				+ ')><i class="fa fa-trash-o"></i></button></td>'

				+ '</tr>';

		index++;

	}
	$("#doctorSpecilityBody").html(htm);
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 28-May-2020
 * @codeFor : editDoctorSpeciality()
 ******************************************************************************/
function editDoctorSpeciality(docSplId) {

	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('docSplId=' + docSplId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/editDoctorSpeciality",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {

			$("#docSplId").val(r.idDoctorSpecilities);
			$("#selDocSpeciality").val(r.specialityName);
			$("#txtwdConsultation").val(r.wdConsultation);
			$("#txtwdFollowup").val(r.wdFolloup);
			$("#txtweConsultation").val(r.weConsultation);
			$("#txtweFollowup").val(r.weFolloup);
			
			toggleEntryDiv('divForEntry');
		}
	});

}

/************
 * @author	: Dayanand Khandekar
 * @date		: 28-May-2020
 * @codeFor	: deleteDoctorSpecility
 ************/

function deleteDoctorSpecility(id) {

	var r = confirm("Are You Sure You Want To Delete Doctor Specility");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/admin/deleteDoctorSpecility",
			data : {
				"docSplId" : id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);

				defaultViewDoctorSpeciality();
			}
		});
	}
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : channelDoctorAutoSuggestion()
 ******************************************************************************/

function doctorSpecilityAutoSuggestion(inputID) {

	var resultData = [];
	var doctorName = $("input#" + inputID).val();
	if (doctorName == "" || doctorName == null || doctorName == "null"
			|| doctorName == undefined) {
		alert("Please enter search value");
		$("input#" + inputID).focus();
		defaultViewDoctorSpeciality();
		return false;
	}
	var inputs = [];
	var unitId = $("#unitId").val();
	inputs.push('doctorSplName=' + doctorName);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/admin/doctorSpecilityAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.listDoctorSpecility.length; j++) {

				var arrValue = response.listDoctorSpecility[j].idDoctorSpecilities + "-"
						+ response.listDoctorSpecility[j].specialityName;
				var idValue = response.listDoctorSpecility[j].idDoctorSpecilities;
				var docName = response.listDoctorSpecility[j].specialityName;

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
		var docName = res[1];
		getDoctorSpecilityById(id);
		$("#" + inputID).val(docName);
	}
}

/************
 * @author	: Dayanand Khandekar
 * @date		: 28-May-2020
 * @codeFor	:  getDoctorSpecilityById 
 ************/
function getDoctorSpecilityById(id) {

	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('docSplId=' + id);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/admin/editDoctorSpeciality",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {

			setDoctorSpecilityTemplateAfterAuto(r);

		}
	});

}

/************
 * @author	: Dayanand Khandekar
 * @date		: 28-May-2020
 * @codeFor	:  setDoctorSpecilityTemplateAfterAuto
 ************/
function setDoctorSpecilityTemplateAfterAuto(response) {
	if (response.specialityName == null || response.specialityName == ""
			|| response.specialityName == "null") {
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
			+ response.idDoctorSpecilities
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+ response.specialityName
			+ '</td>'

			

			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success editBodyPartMaster"  data-toggle="modal"  onclick=editDoctorSpeciality('
			+ response.idDoctorSpecilities
			+ ')><i class="fa fa-edit"></i></button></td>'

			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger deleteUserAccess"   onclick=deleteDoctorSpecility('
			+ response.idDoctorSpecilities
			+ ')><i class="fa fa-trash-o"></i></button></td>'

			+ '</tr>';

	index++;

	$("#doctorSpecilityBody").html(htm);
}

/************
 * @author	: Dayanand Khandekar
 * @date		: 28-May-2020
 * @codeFor	:  getDoctorSpecilityByIdOnClick
 ************/
function getDoctorSpecilityByIdOnClick() {
	var id = $("#channelID").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(id)) {
		alert("Please Enter  ID Only!");
		$("#channelID").focus();
		return false;
	}
	getDoctorSpecilityById(id);
}

/************
 * @author	: Dayanand Khandekar
 * @date		: 28-May-2020
 * @codeFor	:  refershDoctorSpecility
 ************/
function refershDoctorSpecility() {
	$("#docSplId").val(0);
	$("#selDocSpeciality").val("");
	$("#txtwdConsultation").val("");
	 $("#txtwdFollowup").val("");
	 $("#txtweConsultation").val("");
	 $("#txtweFollowup").val("");

}

