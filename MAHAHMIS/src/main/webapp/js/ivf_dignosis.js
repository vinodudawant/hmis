/*******************************************************************************
 * @author Dayanand Khandekar
 * @since 25-3-2021
 * @comment get IVf Digno INfO
 ******************************************************************************//*
function setIvfDignosisTemplateForIVFDoctorStation(id) {
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	$('#dynamicset').html('');
	$('#ipdDoctorStationJSPHeadDiv').html('');
	$("#ipdDoctorStationJSPHeadDiv").html('');
	$("#diets").hide();
	ivfTemForDignosis();
	getListOfIVFDignosis();
	showADNOTE(id);
}

*//*******************************************************************************
 * @author Dayanand Khandekar
 * @since 25-3-2021
 * @comment set IVF Digno Template For UI
 ******************************************************************************//*
function ivfTemForDignosis() {

	
	var temp = '<div style="margin-bottom: 9px;" class="col-sm-12-1" id="row1">'
			+ '<input type="hidden" class="form-control input-SmallText" id="dignosisMasterId" value="0">'
			+ '<div style="margin-top: 10px; margin-left: 10px;" class="col-sm-2-1" id="col1">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Diagnosis</label>'
			+ '<div id="divdiagnosis"><input type="text" class="typeahead form-control input-SmallText" onkeypress="setDiagnosisAutocompleteNameDescpID(\'diagnosis\', \'onkeypress\');" id="diagnosis" name="diagnosis" placeholder="diagnosis">'
			+ '</div><input type="hidden" value="0" id="EditFlag"></div></div>'
			+ '<div style="margin-top: 10px;" class="col-sm-2-1" id="col2">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Diagnosis & Description</label>'
			+ '<div id="divdiagno_description"><input type="text" class="typeahead form-control input-SmallText" onkeypress="setDiagnosisAutocompleteNameDescpID(\'diagno_description\',\'onkeypress\');" name="diagno_description" placeholder="Diagnosis &amp; Description" id="diagno_description">'
			+ '</div></div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col3">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">ICD10 Code</label> '
			+ '<div id="divicd10_code"><input type="text" class="typeahead form-control input-SmallText" id="icd10_code" onkeypress="setDiagnosisAutocompleteNameDescpID(\'icd10_code\',\'onkeypress\');" name="icd10_code" placeholder="ICD 10 Code"><input type="hidden" value="0" id="EditFlag"></div></div>'
			+ '</div><div style="margin-top: 10px;" class="col-sm-1-1" id="col4">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Date</label>'
			+ '<input type="text" class="form-control input-SmallText" onclick="displayCalendar(document.getElementById(\'assesmentDate\'),\'dd/mm/yyyy\',this)" readonly="readonly" name="date" placeholder="Date" onchange="checkCurrentDate(\'DoctorStation\')" id="assesmentDate">'
			+ '</div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col5">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '	<label for="exampleInputEmail1" class="TextFont">DiagnosisType</label>'
			+ ' <select class="form-control input-SmallText" id="diagno_type" name="diagno_type"><option value="Provisional">Provisional</option>'
			+ '<option value="Confirmed">Confirmed</option></select></div></div>'
			+ '<div style="margin-top: 10px;" class="col-sm-2-1" id="col6"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Comments</label>'
			+ '<input type="text" class="form-control input-SmallText" id="comment" name="comment" placeholder="Comments">'
			+ '</div></div>'
			+ '<div id="col7" class="col-sm-2-1" style="margin-top: 10px; margin-left: 80px; margin-bottom: -40px; z-index: 1000;"> <label style="margin-bottom: 0px">Search By: </label> <div class=divide-5></div> <label> <input type="radio" name="ICD" value="ICD10" id="ICD10" checked="checked">ICD10 </label> <label> <input type="radio" name="ICD"value="ICD0" id="ICDO">ICDO<br></label></div>'
			+ '<div style="margin-top: 10px;" class="col-sm-2-1" id="col8">'
			+ '<div class="divide-10"></div><div id="diagno"><button id="saveeditassesment1" onclick="saveIVFDignosis();" class="btn btn-xs btn-success">Save</button></div>'
			+ '<div class="btn-group"><button data-target="#ICD10ButtonPopup" onclick=setAddICDCodeTemp("ICD10"),fetchICD10Level1("onload","ICD10"); style="margin-left: 40px; margin-top: 14px;" data-toggle="modal" class="btn btn-xs btn-info">Add Update ICD10</button>'
			+ '<button data-target="#ICD10ButtonPopup" onclick=setAddICDCodeTemp("ICD0"),fetchICD10Level1("onload","ICDO"); style="margin-left: 159px; margin-top: -22px;" data-toggle="modal" class="btn btn-xs btn-info">Add Update ICDO</button></div></div></div>'

			+ '</div></div><div style="margin-top: 9px;" class="col-sm-12-1" id="row2">'
			+ '<div class="col-md-12-1"><div class="col-sm-12-1">'
			+ '<h6 style="margin-left: 10px;">ProvisionalDiagnosis</h6></div>'
			+ '<div style="padding-top: 10px; padding-bottom: 0px" class="box-body col-md-12-1">'
			+ '<div class="form-group  box border col-md-12-1"><div style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;" class="col-md-12-1">'
			+ '<label value="New" id="enableAsmntTextBoxesProvisionalLabelP" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;" onclick="refreshIVFDigno()"> <i class="fa fa-plus"></i> New</label>'
			+ '<label value="Edit" id="editAssesmentProvisionalLabelP" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" onclick="editProvisionalIVFDignosis()"> <i class="fa fa-edit"></i> Edit</label>'
			+ '<label value="Delete" id="deleteAssessmentProvisionalLabelP" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" onclick="deleteProvisionalIVFDignosis()" > <i class="fa fa-trash-o"></i>Delete</label>'
			+ '<label id="confirmDiagnosisProvisionalLabelP" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: -5px;" onclick="setconfirmIVFDignosis()" >'
			+ '<i class="fa-check-square-o"></i> Confirm Diagnosis</label></div>'
			+ '<div class="col-sm-12-1">'
			+ '<table class="table table-bordered responsive" id="ivfDignoProvisionalTabel">'
			+ '<thead>'
			+ '<tr>'
			+ '<th >Select</th>'
			+ '<th> #</th>'
			+ '<th>Diagnosis</th>'
			+ '<th>Diagnosis Description</th>'
			+ '<th>ICD 10 Code</th>'
			+ '<th>Date</th>'
			+ '<th>Diagnosis Type</th>'
			+ '<th>Diagnosed By</th>'
			+ '	<th >Comment</th>'
			+ '</tr></thead>'
			+ '<tbody id="assesmentContentProvisional">'
			+ '</tbody>'
			+ '</table>'
			
			 * +'<div style="overflow-y: scroll; height: 111px; maxheight:
			 * auto; margin-top: -21px;" class="col-sm-12-1" id="flip-scroll">' + '<table
			 * class="table table-bordered table-striped table-condensed cf">' + '<tbody
			 * id="assesmentContentProvisional"></tbody>' +'</table>' + '</div>'
			 
			+ '</div></div></div></div></div>'

			+ '<div class="col-sm-12-1" id="row3"><div class="col-md-12-1"><div class="col-sm-12-1">'
			+ '<h6 style="margin-left: 10px;">Confirmed Diagnosis</h6></div>'
			+ '<div style="padding-top: 10px; padding-bottom: 0px" class="box-body col-md-12-1">'
			+ '<div style="padding-top: 0px; margin-bottom: 10px;" class="form-group box border col-md-12-1">'
			+ '<div style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;" class="col-md-12-1">'
			+ '<label value="New" id="enableAsmntTextBoxesConfirmLabelC" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;" onclick="refreshIVFDigno();"> <i class="fa fa-plus"></i> New'
			+ '</label> <label value="Edit" id="editAssesmentConfirmLabelC" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" onclick="editIVFConfirmDignosis()"> <i class="fa fa-edit"></i> Edit'
			+ '</label> <label value="Delete" id="deleteAssessmentConfirmLabelC" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" onclick="deleteConfirmIVFDignosis()" > <i class="fa fa-trash-o"></i>Delete'
			+ '</label> <label id="provisionalDiagnosisConfirmLabelC" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: -5px;" onclick="setprovisinalIVFDignosis()" > <i class="fa-check-square-o"></i> Provisional Diagnosis'
			+ '	</label> </div>'
			+ '<div  class="col-sm-12-1">'
			+ '<table class="table table-bordered responsive"  id="ivfDignoConfirmTabel">'
			+ '<thead>'
			+ '<tr>'
			+ '<th >Select</th>'
			+ '<th> #</th>'
			+ '<th>Diagnosis</th>'
			+ '<th>Diagnosis Description</th>'
			+ '<th>ICD 10 Code</th>'
			+ '<th>Date</th>'
			+ '<th>Diagnosis Type</th>'
			+ '<th>Diagnosed By</th>'
			+ '	<th >Comment</th>'
			+ '</tr></thead>'
			+ '<tbody id="assesmentContentConfirmaed">'
			+ '</tbody>'
			+ '</table>'
			
			 * + '<div style="overflow-y: scroll; height: 111px; maxheight:
			 * auto; margin-top: -21px;" class="col-sm-12-1" id="flip-scroll">' + '<table
			 * class="table table-bordered table-striped table-condensed cf"><tbody
			 * id="assesmentContentConfirmaed"></tbody>' + '</table></div>'
			 
			+ '</div></div></div></div></div></div>';

	 userAccess(); 
	//$("#ipdDoctorStationJSPHeadDiv").html(" ");
	$("#ipdDoctorStationJSPHeadDiv").html(temp);
	
	var prevtr = $("#prevtr").val();
	if(prevtr == "previousIvfTreatment"){
		//alert(prevtr);
		document.getElementById("saveeditassesment1").disabled = "true";
	}

}

*//*******************************************************************************
 * @author Dayanand Khandekar
 * @since 25-3-2021
 * @comment Save IVF Digno Info
 ******************************************************************************//*
function saveIVFDignosis() {
	var dignosisMasterId = $("#dignosisMasterId").val();

	var treatmentId = $("#tr_Id").val();
	var IVFTreatmentId = $("#IVFTreatmentId").val();

	var patientId = $("#patientId").text();

	var patientName = $("#patientName").text();

	var patient_age = $("#age").text();

	var patient_gender = $("#sex").text();

	var Diagnosis = $("#diagnosis").val();

	var diagnosisDescription = $("#diagno_description").val();

	var ICD10Code = $("#icd10_code").val();

	var date = $("#assesmentDate").val();

	var diagnosisType = $("#diagno_type").val();

	var comments = $("#comment").val();

	var coupleId = $("#ivfCoupleId").val();

	var batchCreationId = $("#ivfbatchCreationId").val();

	var userId = $("#userId").val();

	var unitId = $("#unitId").val();

	var inputs = [];

	inputs.push('dignosisMasterId=' + dignosisMasterId);

	inputs.push('patientId=' + patientId);

	inputs.push('treatmentId=' + treatmentId);

	inputs.push('patientName=' + patientName);

	inputs.push('patient_age=' + patient_age);

	inputs.push('patient_gender=' + patient_gender);

	inputs.push('diagnosis=' + Diagnosis);

	inputs.push('diagnosisDescription=' + diagnosisDescription);

	inputs.push('iCD10Code=' + ICD10Code);

	inputs.push('date=' + date);

	inputs.push('diagnosisType=' + diagnosisType);

	inputs.push('comments=' + comments);

	inputs.push('coupleId=' + coupleId);

	inputs.push('batchCreationId=' + batchCreationId);

	inputs.push('createdBy=' + userId);

	inputs.push('userId=' + userId);

	inputs.push('unitId=' + unitId);

	inputs.push('updatedBy=' + userId);
	
	inputs.push('ivfTreatId=' + IVFTreatmentId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfdoctordesk/saveIVFDignosis",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
			} else if (r == 2) {
				alert("Record Updated Successfully");
			} else {
				alert("Network Issue..");
			}

			getListOfIVFDignosis();

		}
	});

}

*//*******************************************************************************
 * @author Dayanand Khandekar
 * @since 25-3-2021
 * @comment fetch IVF Digno Template For UI
 ******************************************************************************//*
function getListOfIVFDignosis() {
	var ivftreatmentId = $("#IVFTreatmentId").val();

	var unitId = $("#unitId").val();

	var inputs = [];

	inputs.push('ivftreatmentId=' + ivftreatmentId);

	inputs.push('unitId=' + unitId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfdoctordesk/getListOfIVFDignosis",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {

			setIvfProvisisonalDignoTemplate(r);
			setIVFConfirmedDignosisTemplate(r);

		}
	});
}

*//*******************************************************************************
 * @author Dayanand Khandekar
 * @since 25-3-2021
 * @comment set Provisional IVF Digno Template List
 ******************************************************************************//*
function setIvfProvisisonalDignoTemplate(r) {
	$("#assesmentContentProvisional").html("");

	var htm = "";

	var rowCount = 0;

	if (r.getListOfIVFDignosisDTO.length > 0) {

		for ( var i = 0; i < r.getListOfIVFDignosisDTO.length; i++) {
			if (r.getListOfIVFDignosisDTO[i].diagnosisType === "Provisional") {
				rowCount++;

				htm = htm
						+ "<tr class='newStudyIVFDigno' id='count"
						+ (rowCount)
						+ "'>"

						+ "<td><input type='checkbox' class='chkivfdigno'   value='"
						+ rowCount
						+ "'"

						+ " name='ivfdignodocid'   isNew='false' id='checkbox"
						+ rowCount
						+ "' onclick='setSelectedCheckBoxForProvisinalIVFDigno("
						+ rowCount + ")'></td>"

						+ "<td> <span id='snum" + rowCount + "'>" + rowCount
						+ "</span><input type='hidden' id='ivfDignosisMasterId"
						+ rowCount + "' value="
						+ r.getListOfIVFDignosisDTO[i].dignosisMasterId
						+ "></td>"

						+ "<td>" + r.getListOfIVFDignosisDTO[i].diagnosis
						+ " </td> "

						+ "<td>"
						+ r.getListOfIVFDignosisDTO[i].diagnosisDescription
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].iCD10Code
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].date
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].diagnosisType
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].dignosedBy
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].comments
						+ " </td> "

						+ "</tr>";
			}

		}
		$("#assesmentContentProvisional").append(htm);
	}

}

*//*******************************************************************************
 * @author Dayanand Khandekar
 * @since 25-3-2021
 * @comment set Confirm IVF Digno Template List
 ******************************************************************************//*
function setIVFConfirmedDignosisTemplate(r) {
	$("#assesmentContentConfirmaed").html("");
	var htm1 = "";
	var rowCount1 = 0;
	if (r.getListOfIVFDignosisDTO.length > 0) {

		for ( var i = 0; i < r.getListOfIVFDignosisDTO.length; i++) {
			if (r.getListOfIVFDignosisDTO[i].diagnosisType === "Confirmed") {
				rowCount1++;

				htm1 = htm1
						+ "<tr class='newStudyIVFDignoConfirm' id='count"
						+ (rowCount1)
						+ "'>"

						+ "<td><input type='checkbox' class='chkivfdignoconfirm'   value='"
						+ rowCount1
						+ "'"

						+ " name='ivfdignodocidconfirm'   isNew='false' id='checkboxconfirm"
						+ rowCount1
						+ "' onclick='setSelectedCheckBoxForConfirmIVFDigno("
						+ rowCount1
						+ ")'></td>"

						+ "<td> <span id='snum"
						+ rowCount1
						+ "'>"
						+ rowCount1
						+ "</span><input type='hidden' id='ivfDignosisMasterIdConfirm"
						+ rowCount1 + "' value="
						+ r.getListOfIVFDignosisDTO[i].dignosisMasterId
						+ "></td>"

						+ "<td>" + r.getListOfIVFDignosisDTO[i].diagnosis
						+ " </td> "

						+ "<td>"
						+ r.getListOfIVFDignosisDTO[i].diagnosisDescription
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].iCD10Code
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].date
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].diagnosisType
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].dignosedBy
						+ " </td> "

						+ "<td>" + r.getListOfIVFDignosisDTO[i].comments
						+ " </td> "

						+ "</tr>";

			}
		}
		$("#assesmentContentConfirmaed").append(htm1);

	}
}

*//*******************************************************************************
 * @author Dayanand Khandekar
 * @since 25-3-2021
 * @comment edit Provisional IVF Digno
 ******************************************************************************//*
function editProvisionalIVFDignosis() {
	var ivfdignoMasterId = 0;
	var userId = parseInt($("#userId").val());
	$("input[name='ivfdignodocid']:checked").each(function() {

		ivfdignoMasterId = $("#ivfDignosisMasterId" + $(this).val()).val();

	});

	if (ivfdignoMasterId == 0 || ivfdignoMasterId === "") {
		alert("Please Select At Least One CheckBox..");
		return false;
	}

	var inputs = [];
	inputs.push('ivfdignoMasterId=' + ivfdignoMasterId);
	// inputs.push('userId=' + userId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ivfdoctordesk/editIVFDignosis",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {

			$("#dignosisMasterId").val(r.dignosisMasterId);

			$("#diagnosis").val(r.diagnosis);

			$("#diagno_description").val(r.diagnosisDescription);

			$("#icd10_code").val(r.iCD10Code);

			$("#assesmentDate").val(r.date);

			$("#diagno_type").val(r.diagnosisType);

			$("#comment").val(r.comments);

		}
	});

}

*//*******************************************************************************
 * @author Dayanand Khandekar
 * @since 25-3-2021
 * @comment edit Confirm IVF Digno
 ******************************************************************************//*
function editIVFConfirmDignosis() {
	var ivfdignoMasterId = 0;
	var userId = parseInt($("#userId").val());
	$("input[name='ivfdignodocidconfirm']:checked").each(
			function() {

				ivfdignoMasterId = $(
						"#ivfDignosisMasterIdConfirm" + $(this).val()).val();

			});

	if (ivfdignoMasterId == 0 || ivfdignoMasterId === "") {
		alert("Please Select At Least One CheckBox..");
		return false;
	}

	var inputs = [];
	inputs.push('ivfdignoMasterId=' + ivfdignoMasterId);
	// inputs.push('userId=' + userId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ivfdoctordesk/editIVFDignosis",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {

			$("#dignosisMasterId").val(r.dignosisMasterId);

			$("#diagnosis").val(r.diagnosis);

			$("#diagno_description").val(r.diagnosisDescription);

			$("#icd10_code").val(r.iCD10Code);

			$("#assesmentDate").val(r.date);

			$("#diagno_type").val(r.diagnosisType);

			$("#comment").val(r.comments);

		}
	});

}
*//*******************************************************************************
 * @author Dayanand Khandekar
 * @since 25-3-2021
 * @comment set only seleted chek box for Provisional IVF Digno Template List
 ******************************************************************************//*
function setSelectedCheckBoxForProvisinalIVFDigno(rowCount) {
	var rows = $('#ivfDignoProvisionalTabel tbody tr').length;

	for ( var i = 1; i <= rows; i++) {
		if (i == rowCount) {
			var id = 'checkbox' + i;

			$('#' + id).prop('checked', true);
		} else {
			var id = 'checkbox' + i;
			$('#' + id).prop('checked', false);
		}
	}
}

*//*******************************************************************************
 * @author Dayanand Khandekar
 * @since 25-3-2021
 * @comment set only seleted chek box for Confirm IVF Digno Template List
 ******************************************************************************//*
function setSelectedCheckBoxForConfirmIVFDigno(rowCount) {
	var rows = $('#ivfDignoConfirmTabel tbody tr').length;

	for ( var i = 1; i <= rows; i++) {
		if (i == rowCount) {
			var id = 'checkboxconfirm' + i;

			$('#' + id).prop('checked', true);
		} else {
			var id = 'checkboxconfirm' + i;
			$('#' + id).prop('checked', false);
		}
	}

}

*//*******************************************************************************
 * @author Dayanand Khandekar
 * @since 25-3-2021
 * @comment referesh dignosis information
 ******************************************************************************//*
function refreshIVFDigno() {

	$("#dignosisMasterId").val(0);
	$("#diagnosis").val('');
	$("#diagno_description").val('');
	$("#icd10_code").val('');
	$("#assesmentDate").val('');
	$("#diagno_type").val(diagno_type);
	$("#comment").val('');
}

*//*******************************************************************************
 * @author Dayanand Khandekar
 * @since 25-3-2021
 * @comment delete Provisional IVF Digno Info
 ******************************************************************************//*

function deleteProvisionalIVFDignosis() {
	var ivfdignoMasterId = 0;
	var userId = parseInt($("#userId").val());
	$("input[name='ivfdignodocid']:checked").each(function() {

		ivfdignoMasterId = $("#ivfDignosisMasterId" + $(this).val()).val();

	});

	if (ivfdignoMasterId == 0 || ivfdignoMasterId === "") {
		alert("Please Select At Least One CheckBox..");
		return false;
	}

	var inputs = [];
	inputs.push('ivfdignoMasterId=' + ivfdignoMasterId);
	inputs.push('userId=' + userId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ivfdoctordesk/deleteIVFDigno",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {

			if (r == 1) {
				alert("Record Deleted Successfully");
				getListOfIVFDignosis();
			} else {
				alert("Network Issue..");
			}

		}
	});

}

*//*******************************************************************************
 * @author Dayanand Khandekar
 * @since 25-3-2021
 * @comment delete Confirm IVF Digno Info
 ******************************************************************************//*

function deleteConfirmIVFDignosis() {
	var ivfdignoMasterId = 0;
	var userId = parseInt($("#userId").val());
	$("input[name='ivfdignodocidconfirm']:checked").each(
			function() {

				ivfdignoMasterId = $(
						"#ivfDignosisMasterIdConfirm" + $(this).val()).val();

			});

	if (ivfdignoMasterId == 0 || ivfdignoMasterId === "") {
		alert("Please Select At Least One CheckBox..");
		return false;
	}

	var inputs = [];
	inputs.push('ivfdignoMasterId=' + ivfdignoMasterId);
	inputs.push('userId=' + userId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ivfdoctordesk/deleteIVFDigno",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {

			if (r == 1) {
				alert("Record Deleted Successfully");
				getListOfIVFDignosis();
			} else {
				alert("Network Issue..");
			}
		}
	});

}

*//*******************************************************************************
 * @author Dayanand Khandekar
 * @since 25-3-2021
 * @comment set confirm dignosis type for Provisional IVF Digno Info
 ******************************************************************************//*

function setconfirmIVFDignosis() {
	var ivfdignoMasterId = 0;
	var userId = parseInt($("#userId").val());
	$("input[name='ivfdignodocid']:checked").each(function() {

		ivfdignoMasterId = $("#ivfDignosisMasterId" + $(this).val()).val();

	});

	if (ivfdignoMasterId == 0 || ivfdignoMasterId === "") {
		alert("Please Select At Least One CheckBox..");
		return false;
	}

	var inputs = [];
	inputs.push('ivfdignoMasterId=' + ivfdignoMasterId);
	inputs.push('dignosisType=' + "Confirmed");

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ivfdoctordesk/setProvisinalOrConfirmDignosisType",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {

			if (r == 1) {
				alert("Record Updated Successfully");
				getListOfIVFDignosis();
			} else {
				alert("Network Issue..");
			}

		}
	});

}

*//*******************************************************************************
 * @author Dayanand Khandekar
 * @since 25-3-2021
 * @comment set provisinal dignosis type for Confirm IVF Digno Info
 ******************************************************************************//*

function setprovisinalIVFDignosis() {
	var ivfdignoMasterId = 0;
	var userId = parseInt($("#userId").val());
	$("input[name='ivfdignodocidconfirm']:checked").each(
			function() {

				ivfdignoMasterId = $(
						"#ivfDignosisMasterIdConfirm" + $(this).val()).val();

			});

	if (ivfdignoMasterId == 0 || ivfdignoMasterId === "") {
		alert("Please Select At Least One CheckBox..");
		return false;
	}

	var inputs = [];
	inputs.push('ivfdignoMasterId=' + ivfdignoMasterId);
	inputs.push('dignosisType=' + "Provisional");

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ivfdoctordesk/setProvisinalOrConfirmDignosisType",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {

			if (r == 1) {
				alert("Record Updated Successfully");
				getListOfIVFDignosis();
			} else {
				alert("Network Issue..");
			}
		}
	});

}
*/

function getDignosisTemplate(id) {
	
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	$("#diets").hide();
	$("#Prescription").hide();
	$("#instruct").hide();
	
	$("#ipdDoctorStationJSPHeadDiv").html(" ");
	

	var temp = '<div style="margin-bottom: 9px;" class="col-sm-12-1" id="row1">'
			+'<input type="hidden" id="diagoMasterId" value="0">'
			+ '<div style="margin-top: 10px; margin-left: 10px;" class="col-sm-2-1" id="col1">'
			+ '<div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Diagnosis</label>'
			+ '<div id="divdiagnosis"><input type="text" class="typeahead form-control input-SmallText" onkeypress="getAutoSuggestionDiagoName(this.id,\'diagoname\');" id="diagnosis" name="diagnosis" placeholder="diagnosis">'
			+ '</div><input type="hidden" value="0" id="EditFlag"></div></div>'
			+ '<div style="margin-top: 10px;" class="col-sm-2-1" id="col2">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Diagnosis & Description</label>'
			+ '<div id="divdiagno_description"><input type="text" class="typeahead form-control input-SmallText" onkeypress="getAutoSuggestionDiagoName(this.id, \'diagoname\');" name="diagno_description" placeholder="Diagnosis &amp; Description" id="diagno_description">'
			+ '</div></div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col3">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">ICD10 Code</label> '
			+ '<div id="divicd10_code"><input type="text" class="typeahead form-control input-SmallText" id="icd10_code" onkeypress="icd10CodeMgmtAutoSuggestion(this.id);" name="icd10_code" placeholder="ICD 10 Code"><input type="hidden" value="0" id="EditFlag"></div></div>'
			+ '</div><div style="margin-top: 10px;" class="col-sm-1-1" id="col4">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '<label for="exampleInputEmail1" class="TextFont">Date</label>'
			+ '<input type="text" class="form-control input-SmallText" onclick="displayCalendar(document.getElementById(\'assesmentDate\'),\'dd/mm/yyyy\',this)" readonly="readonly" name="date" placeholder="Date" onchange="checkCurrentDate(\'DoctorStation\')" id="assesmentDate">'
			+ '</div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col5">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '	<label for="exampleInputEmail1" class="TextFont">Diagnosis Type</label>'
			+ ' <select class="form-control input-SmallText" id="diagno_type" name="diagno_type"><option value="Provisional">Provisional</option>'
			+ '<option value="Confirmed">Confirmed</option></select></div></div>'
			+ '<div style="margin-top: 10px;" class="col-sm-2-1" id="col6"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Comments</label>'
			+ '<input type="text" class="form-control input-SmallText" id="comment" name="comment" placeholder="Comments">'
			+ '</div></div>'
			+ '<div id="col7" class="col-sm-2-1" style="margin-top: 10px; margin-left: 80px; margin-bottom: -40px; z-index: 1000;"> <label style="margin-bottom: 0px">Search By: </label> <div class=divide-5></div> <label> <input type="radio" name="ICD" value="1" id="ICD10" checked="checked">ICD10 </label> <label> <input type="radio" name="ICD"value="0" id="ICDO">ICDO<br></label></div>'
			+ '<div style="margin-top: 10px;" class="col-sm-2-1" id="col8">'
			+ '<div class="divide-10"></div><button id="saveOPDDignosis()" onclick="saveOPDDignosis();" class="btn btn-xs btn-success">Save</button>'
			+ '<div class="btn-group"> <button data-target="#ICD10ButtonPopup" onclick=setAddICDCodeTempOPD("ICD10"),getICD10ListByType("1"); style="margin-left: 40px; margin-top: 14px;" data-toggle="modal" class="btn btn-xs btn-info">Add Update ICD10</button>'
			+ '<button data-target="#ICD10ButtonPopup" onclick=setAddICDCodeTempOPD("ICD0"),getICD10ListByType("0"); style="margin-left: 159px; margin-top: -22px;" data-toggle="modal" class="btn btn-xs btn-info">Add Update ICDO</button></div></div></div>'

			+ '</div></div><div style="margin-top: 9px;" class="col-sm-12-1" id="row2">'
			+ '<div class="col-md-12-1"><div class="col-sm-12-1">'
			+ '<h6 style="margin-left: 10px;">Provisional Diagnosis</h6></div>'
			+ '<div style="padding-top: 10px; padding-bottom: 0px" class="box-body col-md-12-1">'
			+ '<div class="form-group  box border col-md-12-1"><div style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;" class="col-md-12-1">'
			+ '<label value="New" id="enableAsmntTextBoxesProvisionalLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;"> <i class="fa fa-plus"></i> New</label>'
			+ '<label value="Edit" id="editAssesmentProvisionalLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"  onclick="editPIVFDignosis()"> <i class="fa fa-edit"></i> Edit</label>'
			+ '<label value="Delete" id="deleteAssessmentProvisionalLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" onclick="deletePIVFDignosis()" > <i class="fa fa-trash-o"></i>Delete</label>'
			+ '<label id="confirmDiagnosisProvisionalLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: -5px; " onclick="updateDignosisConfirmStatus(\'Confirmed\')">'
			+ '<i class="fa-check-square-o"></i> Confirm Diagnosis</label></div>'
			+ '<div style="margin-top: 0px;" class="col-sm-12-1"><table class="table table-bordered table-condensed header-fixed cf" style="width : 1090px; margin-top: 10px;">'
			+ '<thead><tr><th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">#</div></th>'
			+ '<th style="height: 21.5px; padding-left: 50px;" class="col-md-2-1"><div class="TextFont">Diagnosis</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Diagnosis Description</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">ICD 10 Code</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Date</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Diagnosis Type</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Diagnosed By</div></th>'
			+ '	<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Comment</div></th>'
			+ '<th style="height: 21.5px; padding-left: 30px;" class="center"><div class="TextFont"></div></th></tr></thead>'
			+ '</table><div style="overflow-y: scroll; height: 111px; maxheight: auto; margin-top: -21px;" class="col-sm-12-1" id="flip-scroll">'
			+ '<table class="table table-bordered table-striped table-condensed cf">'
			+ '<tbody id="assesmentContentProvisional"></tbody></table>'
			+ '</div></div></div></div></div></div>'

			+ '<div class="col-sm-12-1" id="row3"><div class="col-md-12-1"><div class="col-sm-12-1">'
			+ '<h6 style="margin-left: 10px;">Confirmed Diagnosis</h6></div>'
			+ '<div style="padding-top: 10px; padding-bottom: 0px" class="box-body col-md-12-1">'
			+ '<div style="padding-top: 0px; margin-bottom: 10px;" class="form-group box border col-md-12-1">'
			+ '<div style="margin-top: 0px; background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange; padding-left: 3px;" class="col-md-12-1">'
			+ '<label value="New" id="enableAsmntTextBoxesConfirmLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px; margin-left: 20px;" > <i class="fa fa-plus"></i> New'
			+ '</label> <label value="Edit" id="editAssesmentConfirmLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"  onclick="editCIVFDignosis()"> <i class="fa fa-edit"></i> Edit'
			+ '</label> <label value="Delete" id="deleteAssessmentConfirmLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" onclick="deleteCIVFDignosis()"> <i class="fa fa-trash-o"></i>Delete'
			+ '</label> <label id="provisionalDiagnosisConfirmLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: -5px; " onclick="updateDignosisProvisionalStatus(\'Provisional\')" > <i class="fa-check-square-o"></i> Provisional Diagnosis'
			+ '	</label> </div>'
			+ '<div style="margin-top: 0px;" class="col-sm-12-1">'
			+ '<table class="table table-bordered table-condensed header-fixed cf" style="width : 1090px; margin-top: 10px;"><thead>'
			+ '<tr><th style="height: 21.5px;" class="col-md-1-1 center"><div class="TextFont">#</div></th>'

			+ '<th style="height: 21.5px; padding-left: 5px;" class="col-md-2-1 center"><div class="TextFont">Diagnosis</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Diagnosis Description</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">ICD 10 Code</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Date</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-1-1 center"><div class="TextFont">Diagnosis Type</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Diagnosed By</div></th>'
			+ '<th style="height: 21.5px; padding-left: 0px;" class="col-md-2-1 center"><div class="TextFont">Comment</div></th>'
			+ '<th style="height: 21.5px; padding-left: 30px;" class="center"><div class="TextFont"></div></th></tr></thead></table>'
			+ '<div style="overflow-y: scroll; height: 111px; maxheight: auto; margin-top: -21px;" class="col-sm-12-1" id="flip-scroll">'
			+ '<table class="table table-bordered table-striped table-condensed cf"><tbody id="assesmentContentConfirmaed"></tbody>'
			+ '</table></div></div></div></div></div></div></div>';

	/* userAccess(); */

	$("#ipdDoctorStationJSPHeadDiv").html(temp);
	getListOfIVFDignosis();

}



/*******************************************************************************
 * @author : Dayanand Khandekar
 * @codeFor : Function to get autosugesstion for diagonosis section
 ******************************************************************************/

function getAutoSuggestionDiagoName(id, callform) {
	
	var resultData = [];
	var inputs = [];
	var diagoName = $("input#" + id).val();
	var radio = $("input:radio[name=ICD]:checked").val();
	inputs.push('callform=' + callform);
	inputs.push('diagoName=' + diagoName);
	inputs.push('diagoType=' + radio);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/diagonosis/diagosAutoSuggestion",
		cache : false,
		success : function(response) {

			if (callform == "diagoname") {
				console.log("diagoname");
				//$("#callform").val(callform);
				setResponslistTodiagoNameOPD(response, id);
			}

			else if (callform == "diagodesc") {
				console.log("desc");
				$("#callformDigno").val(callform);
				setResponslistTodiagodesc(response, id);
			}

			else {
				console.log("else");
				$("#callformDigno").val(callform);
				setResponslistToIcdCode(response, id);
			}

		}

	});
}


function setResponslistTodiagoNameOPD(response, id) {

	var resultData = [];
	var template = "";
	for ( var j = 0; j < response.length; j++) {
		var arrValue = response[j].name_L;
		var idValue = response[j].idicd10_L;
		var pname = response[j].name_L;
		// console.log(arrValue + " " + idValue + " " + pname);
		//$("#diagoId").val(response[j].idicd10_L);
		resultData.push({
			ID : idValue,
			Name : pname
		});
		template = template + '<li data-value="' + idValue
				+ '" class=""><a href="#">' + arrValue + '</a></li>';
	}
	setTimeout(function() {
		$("div#divdiagnosis .typeahead").html(template);
		$("div#divdiagnosis .typeahead").show();

		$("input#" + id).typeahead({
			source : resultData,
			displayField : 'Name',
			valueField : 'ID',
			onSelect : displayResult,
			scrollBar : true
		});
		$("input#" + id).data('typeahead').source = resultData;
	}, 500);

	function displayResult(item) {
		var id = item.value;
		getDiagonosisByIdOPDDigno(id);
	}
}

function getDiagonosisByIdOPDDigno(id) {
	var callform = $("#callformDigno").val();
	// alert(callform);
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagonosis/digoById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			
			
				for ( var i = 0; i < r.length; i++) {
					$("#diagno_description").val(r[i].name_L1);
					$("#icd10_code").val(r[i].icd_code_L);
				}
			

			
				
		}
	});
}





/*******************************************************************************
 * @author : Dayanand Khandekar
 * @codeFor : Function to save diagonosis data
 ******************************************************************************/

function saveOPDDignosis() {
	var treatmentId = $("#tr_Id").val();
	var patientId = $("#pt_Id").val();
	var ivfTreatId = $("#ivfTreatId").val();
	//var treatmentId;
	var diagoMasterId = $("#diagoMasterId").val();
	var diagoname = $("#diagnosis").val();
	var diagodesc = $("#diagno_description").val();
	var diagoicd10 = $("#icd10_code").val();
	var diagodate = $("#assesmentDate").val();
	var type = $("#diagno_type").val();
	var comments = $("#comment").val();
	
	
	

	if (diagoname == "" || diagoname == undefined || diagoname == null) {
		alertify.error("please enter diagonosis name");
		return false;
	}
	else if (diagodesc == "" || diagodesc == undefined || diagodesc == null) {
		alertify.error("please enter description");
		return false;
	}
	else if (diagoicd10 == "" || diagoicd10 == undefined || diagoicd10 == null) {
		alertify.error("please enter icd10 code");
		return false;
	}
	else if (diagodate == "" || diagodate == undefined || diagodate == null) {
		alertify.error("please enter dianosys date");
		return false;
	}
	
	else if (type == "" || type == undefined || type == null || type == 0) {
		alertify.error("please select type");
		return false;
	}
	else if (comments == "" || comments == undefined || comments == null) {
		alertify.error("please enter comment");
		return false;
	}
	

	
	
	var inputs = [];
	
	inputs.push('dignosisMasterId=' + diagoMasterId);
	
	inputs.push('diagnosis=' + diagoname);
	
	inputs.push('diagnosisDescription=' + diagodesc);
	
	inputs.push('iCD10Code=' + diagoicd10);

	inputs.push('date=' + diagodate);
	
	inputs.push('diagnosisType=' + type);
	
	inputs.push('comments=' + comments);
	
	inputs.push('dignosedBy=' + "");
	
	inputs.push('patientId=' + patientId);

	inputs.push('treatmentId=' + treatmentId);
	
	inputs.push('ivfTreatId=' + ivfTreatId);
	
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfdiagnosis/saveIVFDignosis",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if(r==1){
				alert("Record Saved Successfully");
			}else if(r==2){
				alert("Record Updated Successfully");
			}else{
				alert("Network Issue");
			}
			
			refreshOPDDignosisData();
			getListOfIVFDignosis();
			
		}
	});

	
	
}

function refreshOPDDignosisData(){
	$("#diagnosis").val(" ");
	$("#diagno_description").val(" ");
	$("#icd10_code").val(" ");
	$("#assesmentDate").val(" ");
	$("#diagno_type").val(" ");
	$("#comment").val(" ");
	$("#diagoMasterId").val(0);
}


/*******************************************************************************
 * @author : Dayanand khandekar
 * @codeFor : Function to get diagonosis list
 ******************************************************************************/

function getListOfIVFDignosis() {
	var inputs = [];
	var ivfTreatId = $("#ivfTreatId").val();
	var unitId = $("#unitId").val();
	
 
	
	

	inputs.push('ivfTreatId=' + ivfTreatId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ivfdiagnosis/getListOfIVFDignosis",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setProvisinalDataToDiagonosisTable(r);
			setConfirmDataToDiagonosisTable(r);
		}
	});
}

function setProvisinalDataToDiagonosisTable(r) {
	
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.getListOfIVFDignosisDTO.length; i++) {
		if(r.getListOfIVFDignosisDTO[i].diagnosisType == "Provisional"){
		htm = htm + '<tr> ' + " <td class='col-md-1-1 center'>" + index + '</td>' 
				+ "<td class='col-md-2-1 center'>"+ r.getListOfIVFDignosisDTO[i].diagnosis + "</td>" 
				+ "<td class='col-md-2-1 center'>" + r.getListOfIVFDignosisDTO[i].diagnosisDescription + "</td>"
				+ "<td class='col-md-1-1 center'>" + r.getListOfIVFDignosisDTO[i].iCD10Code+ "</td>"
				+ "<td class='col-md-1-1 center'>" + r.getListOfIVFDignosisDTO[i].date + "</td>" 
				+ "<td class='col-md-1-1 center'>" + r.getListOfIVFDignosisDTO[i].diagnosisType + "</td>"
				+ "<td class='col-md-2-1 center'>" + " " + "</td>"
				+ "<td class='col-md-2-1 center'>"+ r.getListOfIVFDignosisDTO[i].comments + "</td>"
				+ '<td class="center"><input  name="diagotablecheckbox"  value="' + r.getListOfIVFDignosisDTO[i].dignosisMasterId+ '" id="nt' + r.getListOfIVFDignosisDTO[i].dignosisMasterId
				+ '" type="checkbox"  style="cursor: pointer" /></td>'
				+ '</tr>';
		index++;
		}
	}
	if (r.length == 0) {
		htm = htm
				+ "<tr><td colspan='8' class='center text-danger'>Sorry No Records To Display</td></tr>";
	}

	$("#assesmentContentProvisional").html(htm);

}

function setConfirmDataToDiagonosisTable(r){
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.getListOfIVFDignosisDTO.length; i++) {
		if(r.getListOfIVFDignosisDTO[i].diagnosisType == "Confirmed"){
			htm = htm + '<tr> ' + " <td class='col-md-1-1 center'>" + index + '</td>' 
			+ "<td class='col-md-2-1 center'>"+ r.getListOfIVFDignosisDTO[i].diagnosis + "</td>" 
			+ "<td class='col-md-2-1 center'>" + r.getListOfIVFDignosisDTO[i].diagnosisDescription + "</td>"
			+ "<td class='col-md-1-1 center'>" + r.getListOfIVFDignosisDTO[i].iCD10Code+ "</td>"
			+ "<td class='col-md-1-1 center'>" + r.getListOfIVFDignosisDTO[i].date + "</td>" 
			+ "<td class='col-md-1-1 center'>" + r.getListOfIVFDignosisDTO[i].diagnosisType + "</td>"
			+ "<td class='col-md-2-1 center'>" + " " + "</td>"
			+ "<td class='col-md-2-1 center'>"+ r.getListOfIVFDignosisDTO[i].comments + "</td>"
			+ '<td class="center"><input  name="diagotablecheckbox"  value="' + r.getListOfIVFDignosisDTO[i].dignosisMasterId+ '" id="nt' + r.getListOfIVFDignosisDTO[i].dignosisMasterId
			+ '" type="checkbox"  style="cursor: pointer" /></td>'
			+ '</tr>';
	index++;
	}
	}
	if (r.length == 0) {
		htm = htm
				+ "<tr><td colspan='8' class='center text-danger'>Sorry No Records To Display</td></tr>";
	}

	$("#assesmentContentConfirmaed").html(htm);
}


function editPIVFDignosis() {
	var idList = [];
	var inputs = [];
	$("#assesmentContentProvisional").find('input[name="diagotablecheckbox"]').each(function() {

		if ($(this).is(":checked")) {
			var currentId = $('#' + this.id).val();
			idList.push(currentId);
		}
	});

	if (idList.length == 0) {
		alertify.error("Please check  at least one checkbox");
		return false;
	}
	else if(idList.length > 1){
		alertify.error("please select only one checkbox");
		return false;
	}

	inputs.push('ivfdignoMasterId=' + idList);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ivfdiagnosis/editIVFDignosis",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
				$("#diagnosis").val(r.diagnosis);
				$("#diagno_description").val(r.diagnosisDescription);
				$("#icd10_code").val(r.iCD10Code);
				$("#assesmentDate").val(r.date);
				$("#diagno_type").val(r.diagnosisType);
				
				$("#comment").val(r.comments);
				$("#diagoMasterId").val(r.dignosisMasterId);
			//	$("#diagosForm").show();
			
		}
	});
}

function deletePIVFDignosis() {
	var idList = [];
	var inputs = [];
	$("#assesmentContentProvisional").find('input[name="diagotablecheckbox"]').each(function() {

		if ($(this).is(":checked")) {
			var currentId = $('#' + this.id).val();
			idList.push(currentId);
		}
	});

	if (idList.length == 0) {
		alertify.error("Please check  at least one checkbox");
		return false;
	}

	inputs.push('ivfdignoMasterId=' + idList);
	inputs.push('userId=' + 1);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/ivfdiagnosis/deleteIVFDigno",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(r==1){
			alertify.success("Record Deleted Successfully");
			}else{
				alertify.error("Netwok Issue");
			}
			getListOfIVFDignosis();
		}
	});
}




function editCIVFDignosis() {
	var idList = [];
	var inputs = [];
	$("#assesmentContentConfirmaed").find('input[name="diagotablecheckbox"]').each(function() {

		if ($(this).is(":checked")) {
			var currentId = $('#' + this.id).val();
			idList.push(currentId);
		}
	});

	if (idList.length == 0) {
		alertify.error("Please check  at least one checkbox");
		return false;
	}
	else if(idList.length > 1){
		alertify.error("please select only one checkbox");
		return false;
	}

	inputs.push('ivfdignoMasterId=' + idList);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ivfdiagnosis/editIVFDignosis",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			$("#diagnosis").val(r.diagnosis);
			$("#diagno_description").val(r.diagnosisDescription);
			$("#icd10_code").val(r.iCD10Code);
			$("#assesmentDate").val(r.date);
			$("#diagno_type").val(r.diagnosisType);
			
			$("#comment").val(r.comments);
			$("#diagoMasterId").val(r.dignosisMasterId);
			
		}
	});
}

function deleteCIVFDignosis() {
	var idList = [];
	var inputs = [];
	$("#assesmentContentConfirmaed").find('input[name="diagotablecheckbox"]').each(function() {

		if ($(this).is(":checked")) {
			var currentId = $('#' + this.id).val();
			idList.push(currentId);
		}
	});

	if (idList.length == 0) {
		alertify.error("Please check  at least one checkbox");
		return false;
	}

	inputs.push('ivfdignoMasterId=' + idList);
	inputs.push('userId=' + 1);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/ivfdiagnosis/deleteIVFDigno",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(r==1){
			alertify.success("Record Deleted Successfully");
			}else{
				alertify.error("Network issue..");
			}
			getListOfIVFDignosis();
		}
	});
}


function setAddICDCodeTempOPD(callFrom) {
	
	if(callFrom == "ICD10"){
		$("#a").show();
		$("#b").hide();
	}else{
		$("#b").show();
		$("#a").hide();
	}
	
	
	$("#txtIcdCode").val("");
	$("#txtIcdDiagnosis").val("");
	$("#txtIcdDiagnosis1").val("");
	$("#idIcd10L").val("0");
	
	$("#callformDigno").val(callFrom);
	
	
}


/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 20-jan-2020
 * @codeFor : saveICDDiagnosisLevel1
 ******************************************************************************/
function saveICDDiagnosisLevelOPD(callFrom) {
	var icdFlag = "";
	var icdId = $("#idIcd10L").val();
	var icdCode = $("#txtIcdCode").val();
	var icdDiagnosis =$("#txtIcdDiagnosis").val();
	var icdDescription = $("#txtIcdDiagnosis1").val();
//	var userId = $("#userId").val();
	//var unitId = $("#unitId").val();
	var userId=1;
	var unitId=1;
	icdFlag=callFrom;
	/*if (document.getElementById('icd10').checked) {
		icdFlag = 1;
	}

	if (document.getElementById('icdo').checked) {
		icdFlag = "0";
	}*/
	
	
	
	/*if(callFrom == "ICD10"){
		icdFlag=1;
	}else if(callFrom =="ICDO"){
		icdFlag=0;
	}*/

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
		async : false,
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
				alert("Record saved successfully..!");
			} else if (response == 2) {
				alert("Record Updated successfully..!");
			} else if (response == 3) {
				alert("ICD Code is Already Present..!");
			} else {
				alert("Network Issue");
			}

			
			getICD10ListByType(icdFlag);
			//refershIcd10Mgmt();

		}
	});

}


function getICD10ListByType(type){
	
	var inputs = [];
	//var treatmentId = $("#type").val();
	

	
	

	inputs.push('type=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/admin/getICD10ListByType",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			seticd10DataToTemplate(r,type);
			
		}
	});
	
}

function seticd10DataToTemplate(response,type){

	var htm = "";
	var index = 1;

	for ( var i = 0; i < response.icd10_L_List.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
			
				+ ' <td class="col-md-1 center">'
				+ response.icd10_L_List[i].icd_code_L
				+ '</td>'

				+ ' <td class="col-md-3 center">'
				+ response.icd10_L_List[i].name_L
				+ '</td>'

				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster"  data-toggle="modal"  onclick=editIcd10CodeMgmt('
				+ response.icd10_L_List[i].idicd10_L
				+ ')><i class="fa fa-edit"></i></button></td>'

				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger deleteUserAccess"   onclick=deleteIcd10CodeMgmt('+ response.icd10_L_List[i].idicd10_L+','+type+')><i class="fa fa-trash-o"></i></button></td>'

				+ '</tr>';

		index++;

	}
	$("#DRRDiv1").html(htm);
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
		async : false,
		type : "GET",
		url : "ehat/admin/editIcd10codemgmt",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			 $("#idIcd10L").val(r.idicd10_L);
			$("#txtIcdCode").val(r.icd_code_L);
			$("#txtIcdDiagnosis").val(r.name_L);
			 $("#txtIcdDiagnosis1").val(r.name_L1);
			

		}
	});

}

/************
 * @author	: Dayanand Khandekar
 * @date		: 28-12-2021
 * @codeFor	: deleteIcd10CodeMgmt
 ************/

function deleteIcd10CodeMgmt(id,type) {

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
				alert(response);

				getICD10ListByType(type)
			}
		});
	}
}



/*******************************************************************************
 * @author : Dayanand Khandekar
 * @codeFor : Function to get autosugesstion for diagonosis section
 ******************************************************************************/

function getAutoSuggestionDiagoNameOnPopUp(id) {
	var radio=0;
	var callFrom=$("#callformDigno").val();
	
	if(callFrom == "ICD10"){
		radio=1;
	}else if(callFrom == "ICD0"){
		radio=0;
	}
	
	
	var resultData = [];
	var inputs = [];
	var diagoName = $("input#" + id).val();
	
	
	
	//var radio = $("input:radio[name=ICD]:checked").val();
	inputs.push('callform=' + "diagoname");
	inputs.push('diagoName=' + diagoName);
	inputs.push('diagoType=' + radio);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/diagonosis/diagosAutoSuggestion",
		cache : false,
		success : function(response) {

			
				
				//$("#callform").val(callform);
				setResponslistTodiagoNameOPDOnPopUp(response, id,radio);
			

			

		}

	});
}


function setResponslistTodiagoNameOPDOnPopUp(response, id,type) {

	
	
	var resultData = [];
	var template = "";
	for ( var j = 0; j < response.length; j++) {
		var arrValue = response[j].name_L;
		var idValue = response[j].idicd10_L;
		var pname = response[j].name_L;
		// console.log(arrValue + " " + idValue + " " + pname);
		//$("#diagoId").val(response[j].idicd10_L);
		resultData.push({
			ID : idValue,
			Name : pname
		});
		template = template + '<li data-value="' + idValue
				+ '" class=""><a href="#">' + arrValue + '</a></li>';
	}
	setTimeout(function() {
		$("div#divByICD .typeahead").html(template);
		$("div#divByICD .typeahead").show();

		$("input#" + id).typeahead({
			source : resultData,
			displayField : 'Name',
			valueField : 'ID',
			onSelect : displayResult,
			scrollBar : true
		});
		$("input#" + id).data('typeahead').source = resultData;
	}, 500);

	function displayResult(item) {
		var id = item.value;
		getIC10DetailsById(id,type);
	}
}


function getIC10DetailsById(id,type){
	//var unitId = $("#unitId").val();
	var unitId =1;
	var inputs = [];
	inputs.push('icdId=' + id);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/admin/editIcd10codemgmt",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			
			var htm = "";
			var index = 1;

			
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
					
						+ ' <td class="col-md-1 center">'
						+ r.icd_code_L
						+ '</td>'

						+ ' <td class="col-md-3 center">'
						+ r.name_L
						+ '</td>'

						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success editBodyPartMaster"  data-toggle="modal"  onclick=editIcd10CodeMgmt('
						+ r.idicd10_L
						+ ')><i class="fa fa-edit"></i></button></td>'

						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger deleteUserAccess"   onclick=deleteIcd10CodeMgmt('+ r.idicd10_L+','+type+')><i class="fa fa-trash-o"></i></button></td>'

						+ '</tr>';

				index++;

		
			$("#DRRDiv1").html(htm);
			

		}
	});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 17-jan-2022
 * @codeFor : icd10CodeMgmtAutoSuggestion()
 ******************************************************************************/

function icd10CodeMgmtAutoSuggestion(inputID) {

	var resultData = [];
	var icdCode = $("input#" + inputID).val();
	if (icdCode == "" || icdCode == null || icdCode == "null"
			|| icdCode == undefined) {
		alert("Please enter search value");
		$("input#" + inputID).focus();
		
		return false;
	}
	var icdFlag="";
	if (document.getElementById('ICD10').checked) {
		icdFlag = 1;
	}

	if (document.getElementById('ICDO').checked) {
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
				$("div#divicd10_code .typeahead").html(template);
				$("div#divicd10_code .typeahead").show();

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
		async : false,
		type : "GET",
		url : "ehat/admin/editIcd10codemgmt",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {

			$("#diagnosis").val(r.name_L);
			$("#diagno_description").val(r.name_L);

		}
	});

}

function updateDignosisConfirmStatus(callfrom){
	var idList = [];
	var inputs = [];
	
	var userId=$("#userId").val();
	
	$("#assesmentContentProvisional").find('input[name="diagotablecheckbox"]').each(function() {

		if ($(this).is(":checked")) {
			var currentId = $('#' + this.id).val();
			idList.push(currentId);
		}
	});

	if (idList.length == 0) {
		alertify.error("Please check  at least one checkbox");
		return false;
	}

	   
	
	inputs.push('ivfdignoMasterId=' + idList);
	inputs.push('userId=' + userId);
	inputs.push('callFrom=' + callfrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/ivfdiagnosis/updateDignosisStatus",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert("Record Updated Successfully")
			getListOfIVFDignosis();
		}
	});
}

function updateDignosisProvisionalStatus(callfrom){
	var userId=$("#userId").val();
	var idList = [];
	var inputs = [];
	$("#assesmentContentConfirmaed").find('input[name="diagotablecheckbox"]').each(function() {

		if ($(this).is(":checked")) {
			var currentId = $('#' + this.id).val();
			idList.push(currentId);
		}
	});

	if (idList.length == 0) {
		alertify.error("Please check  at least one checkbox");
		return false;
	}
	
	
	inputs.push('ivfdignoMasterId=' + idList);
	inputs.push('userId=' + userId);
	inputs.push('callFrom=' + callfrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/ivfdiagnosis/updateDignosisStatus",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert("Record Updated Successfully");
			getListOfIVFDignosis();
		}
	});
	
}














