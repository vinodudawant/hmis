
/************
* @author	: Mohd Tarique Aalam
* @date		: 
* @codeFor	: fetch live Patients  
 ************/
function fetchVisitingPatientAlive(callfrom) {
	$("#searchFrom").val("all");
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/death/getMarkVisitList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			setTempMarkVisit(r);
		}
	});
}
 

function setTempMarkVisit(r) {

	var htm = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
			+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"
			//+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>UHID</div></th>"


			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Age</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Gender</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>Select</div></th>"

			+ "</tr>" + "</thead>	" + "</table></div>";

	var index = 1;
	var Mrn = 1010101111;
	for ( var i = 0; i < r.lstRegviewDto.length; i++) {

		var datetime = new Date(r.lstRegviewDto[i].createdDateTime)
				.toLocaleString();

		var a = "";

		htm = htm
				+ "<div class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;display:none;'>"
				+ "<table class='table table-condensed cf'>"
				+ "<tbody>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				+ "</td>"
				+ "<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].patientName
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ datetime
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].centerPatientId
				+ "</td>"

				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].age
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].gender
				+ "</td>"

				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'><input type='checkbox' class='deathclass' value="
				+ r.lstRegviewDto[i].ptId + " id='deathid"
				+ r.lstRegviewDto[i].ptId + "'></td>" + "</tr>" + "</tbody>"
				+ "</table>" + "</div>";
		index++;
		Mrn++;
	}

	$("#container").html(htm);
	$("#allPatInfo").html(r);

}

/************
* @author	: Mohd Tarique Aalam
* @date		: 
* @codeFor	: search live and dead Patients  according to searchFrom 
 ************/
function setAutoCompleteMarkVisit(inputId, callfrom) {
	var letter = "";
	var call = $("#searchFrom").val();
	letter = $("#byName").val();
	var findingName = $("#" + inputId).val();
	var inputs = [];
	inputs.push('findingName=' + findingName);
	inputs.push('letter=' + letter);
	inputs.push('call=' + encodeURIComponent(call));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/death/autoSuggestionDeathRecord",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			if (call == "all") {
				setTempMarkVisit(r);
			} else {
				setTempMarkVisit2(r);
			}
		}
	});
}

/************
* @author	: Mohd Tarique Aalam
* @date		: 
* @codeFor	: save records for of dead Patients 
 ************/
function saveDeathRecord() {
	var deathId = $("#deathId").val();
	var narration = $("#narration").val();
	if (narration == "" || narration == null || narration == undefined) {
		alert("please insert narration");
		return false;
	}

	var docId = $("#doctorNameForDeath").val();

	var patientId = [];
	$('input[class=deathclass]:checked').each(function() {

		patientId.push($(this).val());
	});

	if (deathId == 0) {
		if (patientId == 0) {
			alert("please select atleast one patient !");
			return false;
		}
	}

	var deathFlag = $('input:radio[name="DeathOrAlive"]:checked').val();
	var callFrom = $('#callfrom').val();
	if (callFrom == 'all') {
		if (deathFlag == "N") {
			alert('Patient is alive can not save!!!');
			return false;
		}
	}

	var deathDate = $("#OFdate-pick").val();
	if (deathDate == "" || deathDate == null || deathDate == undefined) {
		alert("please select Death Date");
		return false;
	}

	var deathTime = $("#discharge_Time_note").val();
	if (deathTime == "" || deathTime == null || deathTime == undefined) {
		alert("please select Death Time");
		return false;
	}
	
	if (docId == 0) {
		alert("please select Doctor !");
		return false;
	}
	
	var inputs = [];

	inputs.push("patientId=" + patientId);
	inputs.push("narration=" + narration);
	inputs.push("docId=" + docId);
	inputs.push("deathId=" + deathId);
	inputs.push("deathFlag=" + deathFlag);
	inputs.push("deathDate=" + encodeURIComponent(deathDate));
	inputs.push("deathTime=" + encodeURIComponent(deathTime));

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/death/save",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			alert(r);
			refreshDead();
			//window.location.reload(true);
		}
	});

}

function refreshDead()
{
$("#deathId").val(0);
/*$('#docId').val(0);*/
$("#narration").val("");
$("#doctorNameForDeath").val(0);
$("#OFdate-pick").val("");
$("#discharge_Time_note").val("");
fetchVisitingPatientAlive();
}

/************
* @author	: Mohd Tarique Aalam
* @date		: 
* @codeFor	: fetch records of dead Patients 
 ************/
function fetchVisitingPatient2(callfrom) {
	$("#searchFrom").val("death");
	$("#callfrom").val(callfrom);

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/death/getDeathList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			setTempMarkVisit2(r);
		}
	});
}
 
function setTempMarkVisit2(r) {

	var htm = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
			+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Death Date</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Death Time</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Death Declaration under Doctor</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Narration</div></th>"
			/*
			 * + "<th class='col-md-1-1 center' style='height: 21.5px;'><div
			 * class='TextFont'>Death Date</div></th>"
			 */
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Age</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Gender</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>deathFlag</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>Edit</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>Delete</div></th>"
			/*
			 * + "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div
			 * class='TextFont'>Select</div></th>"
			 */

			+ "</tr>" + "</thead>	" + "</table></div>";

	var index = 1;
	var Mrn = 1010101111;
	for ( var i = 0; i < r.lstRegviewDto.length; i++) {

		var datetime = new Date(r.lstRegviewDto[i].createdDateTime)
				.toLocaleString();
		var deathDate = new Date(r.lstRegviewDto[i].deathDate).toDateString();

		var date = new Date(r.lstRegviewDto[i].deathDate).getDate();
		var month = new Date(r.lstRegviewDto[i].deathDate).getMonth() + 1;
		var year = new Date(r.lstRegviewDto[i].deathDate).getFullYear();

		var ddate = "" + date + "/" + month + "/" + year + "";
		var deathId = r.lstRegviewDto[i].deathId;
		var narration = r.lstRegviewDto[i].narration;
		var docid = r.lstRegviewDto[i].docid;

		var edit1 = "";

		if (r.lstRegviewDto[i].sponsorchargesSlaveId == ""
				|| r.lstRegviewDto[i].sponsorchargesSlaveId == null
				|| r.lstRegviewDto[i].sponsorchargesSlaveId == undefined
				|| r.lstRegviewDto[i].sponsorchargesSlaveId == 0) {
			edit1 = edit1
					+ "class='col-sm-1-1 center' style='height: 21.5px;'>"
					+ "<button class='btn btn-xs btn-success'  data-target='' data-toggle='modal' value='EDIT' id='btnEdit' onclick='editDeath("
					+ deathId + ")'>" + "<i class='fa fa-edit'></i>"
					+ "</button>";

		} else {
			edit1 = edit1
					+ "class='col-sm-1-1 center' style='height: 21.5px;'>"
					+ "<button class='btn btn-xs btn-success'  data-target='' data-toggle='modal' value='EDIT' id='btnEdit' onclick='editDeath("
					+ deathId + ")'>" + "<i class='fa fa-edit'></i>"
					+ "</button>";
		}

		htm = htm
				+ "<div class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;display:none;'>"
				+ "<table class='table table-condensed cf'>"
				+ "<tbody>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				+ "</td>"
				+ "<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].patientName
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ datetime
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ deathDate
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].deathTime
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].doctorName
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].narration
				+ "</td>"
				/* + "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+datetime+"</td>" */
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].ptId
				+ "</td>"

				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].age
				+ "</td>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].gender
				+ "</td>"

				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ r.lstRegviewDto[i].deathFlag
				+ "</td>"

				+ "<td "
				+ edit1
				+ "</td>"

				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ "<button class='btn btn-xs btn-danger' value='DELETE' id='btnDelete'  onclick='deleteDeathRecord("
				+ deathId + ")'>" + "<i class='fa fa-trash-o'></i>"
				+ "</button>" + "</td>"

				+ "<input type='hidden' id='narration" + deathId + "' value='"
				+ narration + "'>" + "<input type='hidden' id='docId" + deathId
				+ "' value='" + docid + "'>" + "<input type='hidden' id='ddate"
				+ deathId + "' value='" + ddate + "'>"
				+ "<input type='hidden' id='deathTime" + deathId + "' value='"
				+ r.lstRegviewDto[i].deathTime + "'>"
				+ "</tr>" + "</tbody>" + "</table>" + "</div>";
		index++;
		Mrn++;
	}

	$("#container").html(htm);
	$("#allPatInfo").html(r);
}

/************
* @author	: Mohd Tarique Aalam
* @date		: 
* @codeFor	: edit Patient Death Records
 ************/
function editDeath(deathId) {
	$("#deathId").val(deathId);
	var docId = $('#docId' + deathId).val();
	$("#narration").val($('#narration' + deathId).val());
	$("#doctorNameForDeath").val(docId);
	$("#OFdate-pick").val($('#ddate' + deathId).val());
	$("#discharge_Time_note").val($('#deathTime' + deathId).val());

}

/************
* @author	: Mohd Tarique Aalam
* @date		: 
* @codeFor	: delete records of dead Patients 
 ************/
function deleteDeathRecord(deathId) {
	var r = confirm("Are You Sure You Want To Delete Death Patient Records?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/death/deleteDeathRecord",
			data : {
				"deathId" : deathId
			},
			// timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				fetchVisitingPatient2();
				//window.location.reload(true);
			}
		});
	}

}



/************
* @author	: Mohd Tarique Aalam
* @date		: 10/05/2018
* @codeFor	: To set Doctor Names  
 ************/
function setDoctorList() {
	
	var callform="-";
	var inputs = [];
	inputs.push("call="+ callform);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/death/setDoctorList",
		timeout : 1000 * 60 * 15,
		//cache : false,
		success : function(r) {

			setTempDoctorList(r);
		}
	});	
}

function setTempDoctorList(r) {
	var docList = "<option value='0'>-select-</option>";
	for ( var i = 0; i < r.length; i++) {
		//Changed By Akshata
		docList = docList + "<option value=" + r[i].doctor_ID + "> " + r[i].doc_name
				+ " </option>";

	}
	$("#doctorNameForDeath").html(docList);
	$("#doctorNameForDeath").select2();

}