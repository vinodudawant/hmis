function getDignosisTemplate(id) {
	
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
		
	$("#diets").hide();
	$("#Prescription").hide();
	$("#ddInstructions").hide();
	$("#instruct").hide();
	$("#ADNOTE").hide();
	
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
			+ '<label for="exampleInputEmail1" class="TextFont">Date<span class="required text-danger">*</span></label>'
			+ '<input type="text" class="form-control input-SmallText" onclick="displayCalendar(document.getElementById(\'assesmentDate\'),\'dd/mm/yyyy\',this)" readonly="readonly" name="date" placeholder="Date" onchange="checkCurrentDate(\'DoctorStation\')" id="assesmentDate">'
			+ '</div></div><div style="margin-top: 10px;" class="col-sm-1-1" id="col5">'
			+ '<div class="form-group Remove-Padding col-sm-12-1"><div class="divide-10"></div>'
			+ '	<label for="exampleInputEmail1" class="TextFont">Diagnosis Type</label>'
			+ ' <select class="form-control input-SmallText" id="diagno_type" name="diagno_type"><option value="Provisional">Provisional</option>'
			+ '<option value="Confirmed">Confirmed</option></select></div></div>'
			+ '<div style="margin-top: 10px;" class="col-sm-2-1" id="col6"><div class="form-group Remove-Padding col-sm-12-1">'
			+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Comments <span class="required text-danger">*</span></label>'
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
			+ '<label value="Edit" id="editAssesmentProvisionalLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"  onclick="editPOPDDignosis()"> <i class="fa fa-edit"></i> Edit</label>'
			+ '<label value="Delete" id="deleteAssessmentProvisionalLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" onclick="deletePOPDDignosis()" > <i class="fa fa-trash-o"></i>Delete</label>'
			+ '<label id="confirmDiagnosisProvisionalLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: -5px; " onclick="updateDignosisConfirmStatus(\'Confirmed\')">'
			+ '<i class="fa fa-check-square-o"></i> Confirm Diagnosis</label></div>'
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
			+ '</label> <label value="Edit" id="editAssesmentConfirmLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;"  onclick="editCOPDDignosis()"> <i class="fa fa-edit"></i> Edit'
			+ '</label> <label value="Delete" id="deleteAssessmentConfirmLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: 0px;" onclick="deleteCOPDDignosis()"> <i class="fa fa-trash-o"></i>Delete'
			+ '</label> <label id="provisionalDiagnosisConfirmLabel" class="btn" style="padding-top: 0px; margin-right: 20px; margin-bottom: -5px; " onclick="updateDignosisProvisionalStatus(\'Provisional\')" > <i class="fa fa-check-square-o"></i> Provisional Diagnosis'
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
	diagosListOPD();

}



/*******************************************************************************
 * @author : Dayanand Khandekar
 * @codeFor : Function to get autosugesstion for diagonosis section
 ******************************************************************************/

function getAutoSuggestionDiagoName(id, callform) {
	
	var resultData = [];
	var inputs = [];
	var diagoName = $("input#" + id).val();
	var diagoName2 = diagoName.trim();
	var radio = $("input:radio[name=ICD]:checked").val();
	inputs.push('callform=' + callform);
	inputs.push('diagoName=' + diagoName2);
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
	//var treatmentId;
	var diagoMasterId = $("#diagoMasterId").val();
	var diagoname = $("#diagnosis").val();
	var diagodesc = $("#diagno_description").val();
	var diagoicd10 = $("#icd10_code").val();
	var diagodate = $("#assesmentDate").val();
	var type = $("#diagno_type").val();
	var comments = $("#comment").val();
	var dignosisBy = $("#txtUserName").val();
	
	
	

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
	
	
	if (dignosisBy == "" || dignosisBy == undefined || dignosisBy == null) {
		dignosisBy="";
	}

	/*var data = {
		'patientId' : patientId,
		'treatmentId' : treatmentId,
		'id' : diagoMasterId,
		'diagoName' : diagoname,
		'diagndesc' : diagodesc,
		'icd10_code' : diagoicd10,
		'date' : diagodate,
		'comment' : comments,
		'diagnoType' : type
	}

	// var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagonosis/savediagonosis",
		data : JSON.stringify(data),
		dataType : 'text',
		contentType : 'application/json; charset=utf-8',
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);

			resetDiagoFormOPD();
			diagosList();
		}
	});*/
	
	var inputs = [];
	
	inputs.push('id=' + diagoMasterId);
	
	inputs.push('diagoName=' + diagoname);
	
	inputs.push('diagndesc=' + diagodesc);
	
	inputs.push('icd10_code=' + diagoicd10);

	inputs.push('date=' + diagodate);
	
	inputs.push('diagnoType=' + type);
	
	inputs.push('comment=' + comments);
	inputs.push('dignosisBy=' + dignosisBy);
	
	inputs.push('patientId=' + patientId);

	inputs.push('treatmentId=' + treatmentId);
	
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/diagonosis/savediagonosis",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			alert(r);

			diagosListOPD();
			refreshOPDDignosisData();
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
 * @author : Arpit Gupta
 * @codeFor : Function to get diagonosis list
 ******************************************************************************/

function diagosListOPD() {
	var inputs = [];
	var treatmentId = $("#tr_Id").val();
	

	
	

	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagonosis/lisofDiagonosis",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setProvisinalDataToDiagonosisTable(r);
			setConfirmDataToDiagonosisTable(r);
			
			var prevtre = $('#prevtr').val();
			if(prevtre=='previousPatient'){
			    previousTreatmentDisable();
			}
		}
	});
}

function setProvisinalDataToDiagonosisTable(r) {

	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.length; i++) {
		if(r[i].diagnoType == "Provisional"){
		htm = htm + '<tr> ' + " <td class='col-md-1-1 center'>" + index + '</td>' 
				+ "<td class='col-md-2-1 center'>"+ r[i].diagoName + "</td>" 
				+ "<td class='col-md-2-1 center'>" + r[i].diagndesc + "</td>"
				+ "<td class='col-md-1-1 center'>" + r[i].icd10_code+ "</td>"
				+ "<td class='col-md-1-1 center'>" + r[i].date + "</td>" 
				+ "<td class='col-md-1-1 center'>" + r[i].diagnoType + "</td>"
				+ "<td class='col-md-2-1 center'>" +  r[i].dignosisBy  + "</td>"
				+ "<td class='col-md-2-1 center'>"+ r[i].comment + "</td>"
				+ '<td class="col-md-1-1 center"><input  name="diagotablecheckbox"  value="' + r[i].id+ '" id="nt' + r[i].id
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
	for ( var i = 0; i < r.length; i++) {
		if(r[i].diagnoType == "Confirmed"){
		htm = htm + '<tr> ' + " <td class='col-md-1-1 center'>" + index + '</td>' 
				+ "<td class='col-md-2-1 center'>"+ r[i].diagoName + "</td>" 
				+ "<td class='col-md-2-1 center'>" + r[i].diagndesc + "</td>"
				+ "<td class='col-md-1-1 center'>" + r[i].icd10_code+ "</td>"
				+ "<td class='col-md-1-1 center'>" + r[i].date + "</td>" 
				+ "<td class='col-md-1-1 center'>" + r[i].diagnoType + "</td>"
				+ "<td class='col-md-2-1 center'>" +  r[i].dignosisBy  + "</td>"
				+ "<td class='col-md-2-1 center'>"+ r[i].comment + "</td>"
				+ '<td class="col-md-1-1 center"><input  name="diagotablecheckbox"  value="' + r[i].id+ '" id="nt' + r[i].id
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


function editPOPDDignosis() {
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

	inputs.push('id=' + idList);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagonosis/getdiagonosisById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			for ( var i = 0; i < r.length; i++) {
				$("#diagnosis").val(r[i].diagoName);
				$("#diagno_description").val(r[i].diagndesc);
				$("#icd10_code").val(r[i].icd10_code);
				$("#assesmentDate").val(r[i].date);
				$("#diagno_type").val(r[i].diagnoType);
				$("#comments").val(r[i].comment);
				$("#diagoMasterId").val(r[i].id);
			//	$("#diagosForm").show();
			}
		}
	});
}

function deletePOPDDignosis() {
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

	inputs.push('id=' + idList);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagonosis/deleteDiagonosis",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			diagosListOPD();
		}
	});
}




function editCOPDDignosis() {
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

	inputs.push('id=' + idList);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagonosis/getdiagonosisById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			for ( var i = 0; i < r.length; i++) {
				$("#diagnosis").val(r[i].diagoName);
				$("#diagno_description").val(r[i].diagndesc);
				$("#icd10_code").val(r[i].icd10_code);
				$("#assesmentDate").val(r[i].date);
				$("#diagno_type").val(r[i].diagnoType);
				$("#comments").val(r[i].comment);
				$("#diagoMasterId").val(r[i].id);
			//	$("#diagosForm").show();
			}
		}
	});
}

function deleteCOPDDignosis() {
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

	inputs.push('id=' + idList);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagonosis/deleteDiagonosis",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			diagosListOPD();
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
	//	alert("Please enter search value");
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

	   
	
	inputs.push('id=' + idList);
	inputs.push('userId=' + userId);
	inputs.push('callFrom=' + callfrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagonosis/updateDignosisStatus",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r)
			diagosListOPD();
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
	
	
	inputs.push('id=' + idList);
	inputs.push('userId=' + userId);
	inputs.push('callFrom=' + callfrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagonosis/updateDignosisStatus",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r)
			diagosListOPD();
		}
	});
	
}