function saveAmbulancePatient() {

	var id = $('#ambulanceMasterId').val();
	var patientId = $('#patientId').val();
	var patientName = $('#patientName').val();
	var requisitionDate = $('#requisitionDate').val();
	var uHIDNumber = $('#uHIDNumber').val();
	var consultantName = $('#consultantName').val();
	var pickupLocation = $('#pickupLocation').val();
	var dropLocation = $('#dropLocation').val();
	var purpose = $('#purpose').val();
	var callerNumber = $('#callerNumber').val();
	var status = $('#status').val();
	var callerName = $('#callerName').val();
	var statusRemark = $('#statusRemark').val();
	var time = $('#time').val();
	var emergencyPatient = $('#emergencyPatient').val();
	if($('[name="emergencyPatient"]').is(':checked')){ 
		emergencyPatient="Y";
	} else { 
		emergencyPatient="N";
	};
	
	var deptId = $('#department').val();
	var department = $('#department option:selected').text();
	 if(department=="--Select--")
	 {
		 department ="-";
	 }
	var doctorId = $('#doctor').val();
	var nurseId = $('#nurse').val();
	var wardId = $('#wardTypeSelect').val();
	var doctorName = $('#doctor option:selected').text();
	 if(doctorName=="select")
	 {
		 doctorName ="-";
	 }
	var nurseName = $('#nurse option:selected').text();
	 if(nurseName=="select")
	 {
		 nurseName ="-";
	 }
	var wardName = $('#wardTypeSelect option:selected').text();
	 if(wardName=="--Select--")
	 {
		 wardName ="-";
	 }
	if(department=="Casuality"){
		emergencyPatient="Y";
	}
	 
	 var regex = /^[a-zA-Z\s]*$/;
	  if (!regex.test(callerName)) {
		 
		  alert("Please  enter only alphabates! for callerName");
		  
		  ("#callerName").focus();
	      
		  return false;
	  }
	 
	if (patientName == "" || patientName == undefined
			|| patientName == null  ||
			requisitionDate == "" || requisitionDate == undefined
			|| requisitionDate == null ||
			consultantName == "" || consultantName == undefined
			|| consultantName == null  ||
			pickupLocation == "" || pickupLocation == undefined
			|| pickupLocation == null  ||
			dropLocation == "" || dropLocation == undefined
			|| dropLocation == null  ||
			callerName == "" || callerName == undefined
			|| callerName == null  ||
			nurseName == "" || nurseName == undefined
			|| nurseName == null || nurseName == "-" ||
			callerNumber == "" || callerNumber == undefined
			|| callerNumber == null || 
			doctorName == "" || doctorName == undefined
			|| doctorName == null || doctorName == "-" ||
			time == "" || time == undefined
			|| time == null
		) 
		{
		 alert("Please enter ALL AmbulancePatient Details");
		
		 return false;
	}

	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('id=' + patientId);
	inputs.push('patientName=' + patientName);
	inputs.push('requisitionDate=' + requisitionDate);
	inputs.push('uHIDNumber=' + uHIDNumber);
	inputs.push('consultantName=' + consultantName);
	inputs.push('pickupLocation=' + pickupLocation);
	inputs.push('dropLocation=' + dropLocation);
	inputs.push('purpose=' + purpose);
	inputs.push('callerNumber=' + callerNumber);
	inputs.push('status=' + status);
	inputs.push('callerName=' + callerName);
	inputs.push('statusRemark=' + statusRemark);
	inputs.push('time=' + time);
	inputs.push('department=' + department);
	inputs.push('deptId=' +deptId);
	inputs.push('DoctorId=' + doctorId);
	inputs.push('NurseId=' + nurseId);
	inputs.push('wardId=' + wardId);
	inputs.push('doctorName=' + doctorName);
	inputs.push('nurseName=' + nurseName);
	inputs.push('wardName=' + wardName);
	inputs.push('emergencyPatient=' +emergencyPatient);

	
	var str = inputs.join('&');
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/ambulancePatient/saveAmbulancePatient",
		data : str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(data) {
		
			
		if(emergencyPatient=="Casuality"){
			
			window.location = "ambulance_assign.jsp?";
			
		}else
			{
			if (data == 1) {
				alertify.success("AmbulancePatient Saved Sucessfully");
				clearAmbulancePatient();
				getAllAmbulancePatient();
			} else if (data == 2) {
				alertify.success("AmbulancePatient Updated Sucessfully");
				clearAmbulancePatient();
				getAllAmbulancePatient();
			} else if (data == 3) {
				alertify.success("AmbulancePatient already present");
				clearAmbulancePatient();
				getAllAmbulancePatient();
			}
		}
		}
	});
}

function getAmbulanceDetailsById(patientId) {
	
	if(patientId !=undefined && patientId!=null && patientId!="" && patientId!="null"){
		
		//toggleEntryDivEhatContents();
		
		var inputs = [];
		inputs.push('id=' + patientId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/ambulancePatient/getAmbulanceDetailsById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				 $("#ambulanceMasterId").val(r.listAmbulancePatientDto[0].id);
				 $("#patientName").val(r.listAmbulancePatientDto[0].patientName);
				 $("#patientId").val(r.listAmbulancePatientDto[0].patientId);
				 $("#uHIDNumber").val(r.listAmbulancePatientDto[0].uHIDNumber);
				 $("#consultantName").val(r.listAmbulancePatientDto[0].consultantName);
				 $("#pickupLocation").val(r.listAmbulancePatientDto[0].pickupLocation);
				 $("#dropLocation").val(r.listAmbulancePatientDto[0].dropLocation);
				 $("#purpose").val(r.listAmbulancePatientDto[0].purpose);
				 $("#callerNumber").val(r.listAmbulancePatientDto[0].callerNumber);
				 $("#status").val(r.listAmbulancePatientDto[0].status);
				 $("#callerName").val(r.listAmbulancePatientDto[0].callerName);
				 $("#statusRemark").val(r.listAmbulancePatientDto[0].statusRemark);
				 $("#nurseName").val(r.listAmbulancePatientDto[0].nurseName);
				 $("#doctorName").val(r.listAmbulancePatientDto[0].doctorName);
				 $("#emergencyPatient").val(r.listAmbulancePatientDto[0].emergencyPatient);
				 
			}
		});
	}
}

function toggleEntryDiv() {
	$("#divForEntryAmbulanceRequisitionType").toggle('slow');
}

function getAllAmbulancePatient(callfrom){
	
	var inputs = [];
	inputs.push('status=' + callfrom);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ambulancePatient/getAllAmbulancePatient",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setAllPatient(r, "All");
		}
	});
}

function setAllPatient(r, CallFrom){
	
 var htm = "";
	var index = 1;
	if(r !="" && r!=undefined){
		if (CallFrom == "All") {
			for ( var i = 0; i < r.listAmbulancePatientDto.length; i++) {
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].id
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].uHIDNumber
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].patientName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].department
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].requisitionDate
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].consultantName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].pickupLocation
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].dropLocation
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].purpose
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].callerName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].callerNumber
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].status
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].statusRemark
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].time
						+ '</td>'
				/*		+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].emergencyPatient
						+ '</td>'*/				
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editAmbulancePatient('
						+ r.listAmbulancePatientDto[i].id
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteAmbulancePatient('
						+ r.listAmbulancePatientDto[i].id
						+ ')><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';
				index++;
			};
		} else if (CallFrom == "search") {
			for ( var i = 0; i < r.listAmbulancePatientDto.length; i++) {
			
			htm = htm
					+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].id
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+r.listAmbulancePatientDto[i].uHIDNumber
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].patientName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].department
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].requisitionDate
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].consultantName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].pickupLocation
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].dropLocation
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].purpose
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].callerName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].callerNumber
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].status
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].statusRemark
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listAmbulancePatientDto[i].time
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editAmbulancePatient('
						+ r.listAmbulancePatientDto[i].id
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteAmbulancePatient('
						+ r.listAmbulancePatientDto[i].id
						+ ')><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';
			index++;
		}
	}
	$("#ambulancePatientList").html(htm);
	}
}

function editAmbulancePatient(id) {

	$("#patientInfoDiv").show();
		
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ambulancePatient/editAmbulancePatient",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var req_date = r.requisitionDate;
			var date_created = req_date.split(" ");
			
			$('#searchId').val('');
			$("#divForEntryAmbulanceRequisitionType").show('slow');
			$('#patientName').val(r.patientName);
			$('#requisitionDate').val(date_created[0]);
			$('#ambulanceMasterId').val(r.id);
			$('#uHIDNumber').val(r.uHIDNumber);
			$('#consultantName').val(r.consultantName);
			$('#pickupLocation').val(r.pickupLocation);
			$('#dropLocation').val(r.dropLocation);
			$('#purpose').val(r.purpose);
			$('#callerNumber').val(r.callerNumber);
			$('#status').val(r.status);
			$('#callerName').val(r.callerName);
			$('#statusRemark').val(r.statusRemark);
			$('#doctor').select2('val',r.doctorId);
			$('#nurse').select2('val',r.nurseId);
			$('#wardTypeSelect').select2('val',r.wardId);
			$('#emergencyPatient').val(r.emergencyPatient);
			$('#time').val(r.time);
			$('#department').select2('val',r.deptId);
			
		}
	});
}

function getAmbulancePatientList(){

jQuery.ajax({
	async : true,
	type : "GET",
	url : "ehat/ambulancePatient/getAmbulancePatientList",
	 timeout : 1000 * 60 * 5, 
	cache : false,
	error : function() {
		alert('error');
	},
	success : function(r) {
		setAmbulancePatientList(r);
	},
});
}

function deleteAmbulancePatient(patientId){

	if(patientId !=undefined && patientId!=null && patientId!="" && patientId!="null"){
	
		var r = confirm("Are You Sure You Want To Delete Ambulance Patient Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/ambulancePatient/deleteAmbulancePatient",
				data : {
					"id" : patientId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllAmbulancePatient("onload");
				}
			});
		}
	}
}

function AmbulancePatientSearchById() {
	var patientId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(patientId)) {
		alert("Please Enter Number Only!");
		return false;
	}
	getAmbulanceDetailsById(patientId);
}

function clearAmbulancePatient() {
	
	$('#uHIDNumber').val('');
	$('#patientName').val('');
	$('#consultantName').val('');
	$('#requisitionDate').val('');
	$('#time').val('');
	$('#doctor').select2('val','0');
	$('#nurse').select2('val','0');
	$('#department').select2('val','0');
	$('#wardTypeSelect').select2('val','0');
	$('#pickupLocation').val('');
	$('#dropLocation').val('');
	$('#purpose').val('');
	$('#callerNumber').val('');
	$('#status').val('');
	$('#callerName').val('');
	$('#statusRemark').val('');
	
}

function openAmbulanceRequisitionFormJsp()
{
	window.location = "ambulance_requisition_form.jsp?";
}

function getDepts() {
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/dept/viewAllDeptListAll",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			
			var htm = "<option id=0>Select</option>";
			for ( var i = 0; i < r.lstDepts.length; i++) {
		
				htm = htm + "<option value="+r.lstDepts[i].deptId+">"+r.lstDepts[i].deptName+"</option>";
			}
			$("#department").html(htm);
			$("#department").select2();
			
			$("#department_for_header").html(htm);
			$("#department_for_header").select2();
		}
	});
}

function fetchMarkVisitPatient() {
	
	$("#patPhotoDiv").hide();
	$("#getPatDiv").removeClass("col-md-9");
	$("#getPatDiv").addClass("col-md-12");
	
	$("#headerforsave").show();
	$("#appointHeader").hide();
	
	jQuery.ajax({
		async 	: false,
		type 	: "POST",
 		url 	: "ehat/register/getMarkVisitList",
		/*timeout : 1000 * 60 * 5,*/
		cache 	: false,
		error 	: function() {
			alert('error');
		},
		success : function(r) {
			
			ajaxResponse = r;	
			setTempMarkVisit(r);	
 		},
	});	
}

function setTempMarkVisit(r) {
	
	var htm="";
	var index = 1;	
	for ( var i = 0; i < r.lstRegviewDto.length;i++) {
	
		var datetime= new Date(r.lstRegviewDto[i].createdDateTime).toLocaleString();
		var centerPatientId = r.lstRegviewDto[i].centerPatientId;
		
		var a="";
		var appoint="";
		var edit1="";
	
		if(Number(r.lstRegviewDto[i].ttId) == 0){
			
			edit1 = edit1
			+ "class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button class='btn btn-xs btn-success'  data-target='' data-toggle='modal' value='EDIT' type='button' id='btnEdit"
			+ r.lstRegviewDto[i].ptId
			+ "' onclick='setVisitingPatientDetails1("
			+ r.lstRegviewDto[i].ptId + ",\"edit\",0)'>"
			+ "<i class='fa fa-edit'></i>" + "</button>"
		}else{
			
			if (r.lstRegviewDto[i].blockFlag == "T") {
				if (r.lstRegviewDto[i].tFlag == "Y") { // setting dynamic td on ui

					a = a
							+ " class='col-sm-1-1 center' style='height: 21.5px;'>"
							+ "<button id='blockPatMV"
							+ r.lstRegviewDto[i].ptId
							+ "' class='btn btn-xs btn-primary ' data-target='' type='button' data-toggle='modal' value='MARK' disabled='disabled' ><i class='fa fa-times'></i></button>"
								
					appoint = appoint 			
					+ "class='col-sm-1-1 center' style='height: 21.5px;'> " 
					+ "<button disabled id='appoint"+r.lstRegviewDto[i].ptId+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' type='button' id='btnVisit' value='view'><i class='fa fa-times'></i></button>"
				
				}
				if (r.lstRegviewDto[i].tFlag == "N") // setting dynamic td on ui
				{
					a = a
							+ "class='col-sm-1-1 center'><button id='blockPatMV"
							+ r.lstRegviewDto[i].ptId
							+ "' data-toggle='modal' data-target='#ICDCodePopUp' type='button' onclick='setVisitingPatientDetails1("
							+ r.lstRegviewDto[i].ptId
							+ ",\"mark\")' value='MARK' class='btn btn-xs btn-success ' disabled='disabled'><i class='fa fa-check'></i></button>"
							
					appoint = appoint 			
					+ "class='col-sm-1-1 center' style='height: 21.5px;'> " 
					+ "<button id='appoint"+r.lstRegviewDto[i].ptId+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' onclick='setVisitingPatientDetails1("+ r.lstRegviewDto[i].ptId+",\"appoint\")' type='button' id='btnVisit' value='view'><i class='fa-calendar'></i></button>"
				}
				if (r.lstRegviewDto[i].sponsorchargesSlaveId == ""
						|| r.lstRegviewDto[i].sponsorchargesSlaveId == null
						|| r.lstRegviewDto[i].sponsorchargesSlaveId == undefined
						|| r.lstRegviewDto[i].sponsorchargesSlaveId == 0) {
					edit1 = edit1
							+ "class='col-sm-1-1 center' style='height: 21.5px;'>"
							+ "<button class='btn btn-xs btn-success'  data-target='' data-toggle='modal' value='EDIT' type='button' id='btnEdit"
							+ r.lstRegviewDto[i].ptId
							+ "' onclick='setVisitingPatientDetails1("
							+ r.lstRegviewDto[i].ptId + ",\"edit\")' disabled='disabled'>"
							+ "<i class='fa fa-edit'></i>" + "</button>"

				} else {
					edit1 = edit1
							+ "class='col-sm-1-1 center' style='height: 21.5px;'>"
							+ "<button class='btn btn-xs btn-success' disabled='disabled' data-target='' data-toggle='modal' type='button' value='EDIT' id='btnEdit"
							+ r.lstRegviewDto[i].ptId
							+ "' onclick='setVisitingPatientDetails1("
							+ r.lstRegviewDto[i].ptId
							+ ",\"edit\"),updateChargesMasterSlave("
							+ r.lstRegviewDto[i].sponsorchargesSlaveId
							+ "),fetchSuperCatogoiresSlave("
							+ r.lstRegviewDto[i].sponsorchargesSlaveId + ")'>"
							+ "<i class='fa fa-edit'></i>" + "</button>"
				}

			} else {
				if (r.lstRegviewDto[i].tFlag == "Y") { // setting dynamic td on ui

					appoint = appoint 			
					+ "class='col-sm-1-1 center' style='height: 21.5px;'> " 
					+ "<button disabled='disabled' id='appoint"+r.lstRegviewDto[i].ptId+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' type='button' id='btnVisit' value='view'><i class='fa fa-times'></i></button>"
									
					a = a
							+ " class='col-sm-1-1 center' style='height: 21.5px;'>"
							+ "<button id='blockPatMV"
							+ r.lstRegviewDto[i].ptId
							+ "' class='btn btn-xs btn-primary editUserAccess' data-target='' type='button' data-toggle='modal' value='MARK'  ><i class='fa fa-times'></i></button>"
					
				}
				if (r.lstRegviewDto[i].tFlag == "N") // setting dynamic td on ui
				{
					appoint = appoint 			
					+ "class='col-sm-1-1 center' style='height: 21.5px;'> " 
					+ "<button id='appoint"+r.lstRegviewDto[i].ptId+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' onclick='setVisitingPatientDetails1("+ r.lstRegviewDto[i].ptId+",\"appoint\")' type='button' id='btnVisit' value='view'><i class='fa-calendar'></i></button>"
								
					a = a
							+ "class='col-sm-1-1 center'><button id='blockPatMV"
							+ r.lstRegviewDto[i].ptId
							+ "' data-toggle='modal' data-target='#ICDCodePopUp' type='button' onclick='setVisitingPatientDetails1("
							+ r.lstRegviewDto[i].ptId
							+ ",\"mark\")' value='MARK' class='btn btn-xs btn-success editUserAccess'><i class='fa fa-check'></i></button>"
							
				}
				if (r.lstRegviewDto[i].sponsorchargesSlaveId == ""
						|| r.lstRegviewDto[i].sponsorchargesSlaveId == null
						|| r.lstRegviewDto[i].sponsorchargesSlaveId == undefined
						|| r.lstRegviewDto[i].sponsorchargesSlaveId == 0) {
					edit1 = edit1
							+ "class='col-sm-1-1 center' style='height: 21.5px;'>"
							+ "<button class='btn btn-xs btn-success'  data-target='' data-toggle='modal' value='EDIT' type='button' id='btnEdit"
							+ r.lstRegviewDto[i].ptId
							+ "' onclick='setVisitingPatientDetails1("
							+ r.lstRegviewDto[i].ptId + ",\"edit\")'>"
							+ "<i class='fa fa-edit'></i>" + "</button>"

				} else {
					edit1 = edit1
							+ "class='col-sm-1-1 center' style='height: 21.5px;'>"
							+ "<button class='btn btn-xs btn-success'  data-target='' data-toggle='modal' type='button' value='EDIT' id='btnEdit"
							+ r.lstRegviewDto[i].ptId
							+ "' onclick='setVisitingPatientDetails1("
							+ r.lstRegviewDto[i].ptId
							+ ",\"edit\"),updateChargesMasterSlave("
							+ r.lstRegviewDto[i].sponsorchargesSlaveId
							+ "),fetchSuperCatogoiresSlave("
							+ r.lstRegviewDto[i].sponsorchargesSlaveId + ")'>"
							+ "<i class='fa fa-edit'></i>" + "</button>"
				}

			}
		}
		
		htm=htm+ "<div class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;'>"
		+ "<table class='table table-condensed cf'>"
		+ "<tbody>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+index+"</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>"+ r.lstRegviewDto[i].patientName+"</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+datetime+"</td>"
		/* + "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+ patIdPrefix +"</td>" */
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"+ centerPatientId +"</td>"		
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>";
		
		if(Number(r.lstRegviewDto[i].ttId) == 0){
			
			htm = htm + "<button id='blockPatView"+r.lstRegviewDto[i].ptId+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' onclick='setVisitingPatientDetails1("+ r.lstRegviewDto[i].ptId+",\"view\",0)' type='button' id='btnVisit' value='view'><i class='fa fa-eye View'></i></button>";
		}else{
			
			htm = htm + "<button id='blockPatView"+r.lstRegviewDto[i].ptId+"' class='btn btn-xs btn-success editUserAccess' data-target='' data-toggle='modal' onclick='setVisitingPatientDetails1("+ r.lstRegviewDto[i].ptId+",\"view\")' type='button' id='btnVisit' value='view'><i class='fa fa-eye View'></i></button>";
		}
			
		htm = htm + "</td>"	
		+ "<td "+edit1+"</td>"		
		+ "<td style='height: 21.5px;' class='col-sm-1-1 center hide'><button onclick='passToAdmissionPrint2("+ r.lstRegviewDto[i].ttId+")' id='btnEdit1' type='button' value='EDIT' class='btn btn-xs btn-success editUserAccess'><i class='fa fa-print'></i></button> "
		+ "</td> "		
		+ "<td class='col-sm-1-1 center hide' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-info ' type='button' onclick='viewBillHistory("+ r.lstRegviewDto[i].ptId+")'>"
		+ "<i class='fa fa-file-text-o'></i>"
		+ "</button>"
		+ "</td>"
		+ "<td class='col-sm-1-1 center hide' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-danger ' value='DELETE' type='button' id='btnDelete'  onclick='deletePatientReg("+ r.lstRegviewDto[i].ptId+","+ r.lstRegviewDto[i].ttId+")'>"
		+ "<i class='fa fa-trash-o'></i>"
		+ "</button>"
		+ "</td>"		
		+ "<td "+a+"</td>"
		
		+ "<td "+appoint+"</td>";
		
		
		if(r.lstRegviewDto[i].blockFlag == "F"){//Patient with one warning = F
	
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='blockBtn"+ r.lstRegviewDto[i].ptId+"' class='btn btn-xs ' value='"
			+ r.lstRegviewDto[i].blockFlag+"' type='button'  onclick='preBlockPatient("
			+ r.lstRegviewDto[i].ptId+",\""+ r.lstRegviewDto[i].patientName
			+"\",\"registration\")' data-toggle='tooltip' title='1]"+r.lstRegviewDto[i].blockNarration1+" -By("+r.lstRegviewDto[i].blockUserName1+")'><i class='fa fa-times-circle' style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o 'style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o' style='font-size:18px;color:red'></i></button>"
			+ "</td>";
			
		}else{//Active patient = N
			htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<button id='blockBtn"+ r.lstRegviewDto[i].ptId+"' class='btn btn-xs ' value='"
			+ r.lstRegviewDto[i].blockFlag+"' type='button'  onclick='preBlockPatient("
			+ r.lstRegviewDto[i].ptId+",\""+ r.lstRegviewDto[i].patientName
			+"\",\"registration\")' ><i class='fa fa-circle-o' style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o 'style='font-size:18px;color:red'></i>&nbsp<i class='fa fa-circle-o' style='font-size:18px;color:red'></i></button>"
			+ "</td>";
		}
		
		htm=htm+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' title='admPrint' type='button'  value='PRINT' onclick='AdmissionPrint("+ r.lstRegviewDto[i].ttId+")'><i class='fa fa-print' class='edit'></button>"  //Added By Pooja
		+ "</td>";
		
		htm=htm+ "</tr>" + "</tbody>" + "</table>" + "</div>";
		index++;
		//Mrn++;
	}
	$("#container").html(htm);
	$("#CamPatId").val(r.lstRegviewDto[0].ptId);
	$("#container").html(htm);
	$("#allPatInfo").html(r);
	//$("#ehatTable").html(htm);
	var maxPatId=Number(r.lstRegviewDto[0].ptId)+Number(1);
	$("#maxPatId").val(maxPatId);
	$("#container").removeClass("loading");
}

function autosuggesstionForOtherRecords(inputId,callfrom) {

	var usertype = "";
	var letter="";
	 
		if (callfrom ="search") {
			letter=$("#byName1").val();
			if($("#byid").is(':checked')){
				usertype="Y";
				
			}else{
				usertype="N";
			}
		}
	
 	var inputs = [];	
 	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async	: true,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url : "ehat/registration/autosuggesstionForOtherRecords",
 		cache	: false,
		success : function(r) {
		
			console.log(r);
			//setIpdbillPatientsTemp2(r);
			//autoCompTable2(r,id);
			setOtherRecords(r);
			 
			autoForOtherRecord(r, inputId);
		}
	});
}

function autoForOtherRecord(response, id) {
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
			valueField : 'fName',
		//	valueField : 'lName'
		}, /*
			 * { name : 'unitCode', //width : '80px', valueField :
			 * 'unitCode' }
			 */],

		// Event handler for when a list item is selected.
		select : function(event, ui) {
			console.log(ui);
			
			var spl = (ui.item.spl = "" ? '' : ui.item.spl);
			if (ui.item.dn != 'No' && ui.item.spl != 'Record'
					&& ui.item.fName != 'Found'
					&& ui.item.fName != 'Match') {
 				//console.log(nm);
				//setAutoCompleteForIpdQueue('byName','search');
			 
			}
			/*
			 * This function use for Enter keypress search
			 */
			//setAutoCompleteForIpdQueue2(id, 'search');
			//autosuggesstionIpdBillPatients2(id, 'search');
			autosuggesstionForOtherRecords(id, 'search1');
			return false;
		},

		// The rest of the options are for configuring the ajax
		// webservice call.
		minLength : 1,
		source : function(request, response) {
			var data = myArray;
			console.log(data);
			console.log(data.listReg.length);
			var result;
			if (!data || data.listReg.length === 0 || !data.listReg
					|| data.listReg.length === 0) {
				/*
				 * result = [{ label: 'No match found.' }];
				 */
				result = [ {
					/* 'dn' : 'No', */
					'fName' : 'Not Found',
					'fName' : 'Found',
				/* 'depNm' : 'Match' */
				} ];
			} else {
				result = data.listReg;// Response List for All
				// Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}

function setAutoPatientName(inputID,callFrom,e) {

	var resultData = [];
	var findingName = $("#" + inputID).val();
	var patSearchType = $("#patSearchType").val();
	
	if(patSearchType == 1){
		
		 var key = e.which;
		 if(key == 13) { // the enter key code
		  
			var patientId = $("#byName").val();
			setSearchedPatientRegTemp(patientId,'0','0');
		 }
		 return false;  
		
	}else if(patSearchType == 3){
		
		 var key = e.which;
		 if(key == 13) { // the enter key code
		  
			var mobile = $("#byName").val();
			setSearchedPatientRegTemp(0,mobile,'0');
		 }
		 return false;  
		 
	}else if(patSearchType == 4){
		
		 var key = e.which;
		 if(key == 13) { // the enter key code
		  
			var addhar = $("#byName").val();
			setSearchedPatientRegTemp(0,'0',addhar);
		 }
		 return false;  
	}
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	var callFromDD = "";
	var callFromIpdDD = "";
	if(callFrom == "prevOpdDD"){
		
		callFromDD = "prevOpdDD";
		callFrom = "prevOpd";
	}
	
	if(callFrom == "prevIpdDD"){
		
		callFromIpdDD = "prevIpdDD";
		callFrom = "prevIpd";
	}
	
	var inputs = [];	
	inputs.push('findText=' + findingName);	
	inputs.push('patSearchType=' + patSearchType);		
	inputs.push('callFrom=' + callFrom);		
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/markvisit/autoSuggestionMarkVisit1",
		cache : false,		
		success : function(r) {
			
			var template = "";
			for ( var j = 0; j < r.lstRegviewDto.length; j++) {
				
				var arrValue = r.lstRegviewDto[j].ptId +"-"+r.lstRegviewDto[j].patientName +"-"+r.lstRegviewDto[j].mobile ;
				var idValue = r.lstRegviewDto[j].ptId;
				var patName = r.lstRegviewDto[j].patientName;
				resultData.push({
					ID : idValue,
					Name : patName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue
						+ '</a></li>';
			}
			
			setTimeout(function() {

				$("#div" + inputID + " .typeahead").html(template);
				$("#div" + inputID + " .typeahead").show();
				
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

		var res = item.text.split('-');
		var patId = res[0];
		var patName = res[1];
		//var patMobile = res[2];
		
		$("#" + inputID).val(patName);	
		
		if(callFromDD == "prevOpdDD"){

			setSearchedPatientPrevOpdDDTemp(patId);
			
		}else if(callFromIpdDD == "prevIpdDD"){

			setSearchedPatientPrevIpdDDTemp(patId);
		}else{
			
			if(callFrom == "reg"){

				setSearchedPatientRegTemp(patId,'0','0');
				
			}else if(callFrom == "prevOpd"){
				
//				setSearchedPatientPrevOpdTemp(patId);
				
			}else if(callFrom == "prevIpd"){
				
//				setSearchedPatientPrevIpdTemp(patId);
			}	
		}			
	}
}

function setSearchedPatientRegTemp(patId,mobile,addhar) {

	$("#container").addClass("loading");
    var inputs = [];
    inputs.push('patientId=' + patId);  
    inputs.push('mobileNo=' + mobile);  
    inputs.push('addharNo=' + addhar);  
    var str = inputs.join('&');
    jQuery.ajax({
        async 	: false,
        type 	: "POST",
        data 	: str + "&reqType=AJAX",
     
        url 	: "ehat/register/autoSuggestionMarkVisit",
        cache 	: true,
        success : function(r) {
        	
        	if(r.lstRegviewDto.length > 0){
        		
        		setTempMarkVisit(r);
        		
        		setPatientDetailsOnUI(r);
        		getDoctorName(patId);
        	}else{
        		
        		alertify.error("Patient not found !!!");
        	}
        }
    });
}

function setPatientDetailsOnUI(r){
	
	for ( var i = 0; i < r.lstRegviewDto.length;i++) {
		
		 $("#patientName").val(r.lstRegviewDto[i].patientName);
		 $("#uHIDNumber").val(r.lstRegviewDto[i].centerPatientId);
		 $("#department").val(r.lstRegviewDto[i].department_id);
	}
}

function fetchWardName_for_header()
{
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/wardtypecontroller/fetchwardname",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
				fetchWardName_for_header1(r);
			}
	});	
}

function fetchWardName_for_header1(r)
{
	
	var list="";
	list=list+ "<select name='wardTypeHall'  class='col-md-12' ><option value='0'>--Select--</option>";
	for ( var int = 0; int < r.lstChargesSlave.length; int++) {

		list=list+'<option  value="'+(r.lstChargesSlave[int].slaveId)+'"  data-selfid="'+r.lstChargesSlave[int].selfId+'" data-name="'+r.lstChargesSlave[int].categoryName+'">'+(r.lstChargesSlave[int].categoryName)+'</option>';
		}	
	$("#wardTypeSelect_for_header").html(list);
}

function wardName(id)
{
	var value = $("#wardTypeSelect").find(':selected').attr('data-name');
	$("#wardName").val(value);
	var  selfid = $("#wardTypeSelect").find(':selected').attr('data-selfid');
	$("#wardHallSelect").val(selfid);
	$('#wardHallSelect').attr("disabled", true); 
}

function fetchWardName()
{
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/wardtypecontroller/fetchwardname",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
				setWardName(r);
			}
	});	
}
function setWardName(r)
{
	var list="";
	list=list+ "<select name='wardTypeHall'  class='col-md-12' ><option value='0'>--Select--</option>";
	for ( var int = 0; int < r.lstChargesSlave.length; int++) {

		list=list+'<option  value="'+(r.lstChargesSlave[int].slaveId)+'"  data-selfid="'+r.lstChargesSlave[int].selfId+'" data-name="'+r.lstChargesSlave[int].categoryName+'">'+(r.lstChargesSlave[int].categoryName)+'</option>';
		}	
	$("#wardTypeSelect").html(list);
	$("#wardTypeSelect").select2();
	
	$("#wardTypeSelect_for_header1").html(list);
	$("#wardTypeSelect_for_header1").select2();
}

function getDoctorName(patientId){

    var inputs = [];
  
    inputs.push('id=' + patientId);  
   
    var str = inputs.join('&');
    jQuery.ajax({
        async 	: false,
        type 	: "GET",
        data 	: str + "&reqType=AJAX",
        url 	: "ehat/ambulancePatient/getDoctorName",
        cache 	: true,
        success : function(r) {
        	
        $("#consultantName").val(r);
        	       	
        }
    });
}
    
function getDoctors(){

        var inputs = [];
      
        inputs.push('id=' + 1);  
       
        var str = inputs.join('&');
        jQuery.ajax({
            async 	: false,
            type 	: "GET",
            data 	: str + "&reqType=AJAX",
            url 	: "ehat/ambulancePatient/getDoctors",
            cache 	: true,
            success : function(r) {
            	
          //  $("#doctors").val(r);  
            
            var divContent = "<option value='0'>select</option>";
            
            for ( var i = 0; i < r.usersList.length; i++){             
	                divContent = divContent + "<option value='" + r.usersList[i].user_ID + "'  >"
	                        + r.usersList[i].title +"-"+r.usersList[i].f_name+"-"+r.usersList[i].m_name+ "-"+r.usersList[i].l_name+   "</option>";
            }
           
            $("#doctor").html(divContent);
            $("#doctor").select2();
           
            }
        });
}

function getNurse(){
	
    var inputs = [];
  
    inputs.push('id=' + 1);  
   
    var str = inputs.join('&');
    jQuery.ajax({
        async 	: false,
        type 	: "GET",
        data 	: str + "&reqType=AJAX",
        url 	: "ehat/ambulancePatient/getNurse",
        cache 	: true,
        success : function(r) {
        
        var divContent = "<option value='0'>select</option>";
        
        for ( var i = 0; i < r.usersList.length; i++){             
                divContent = divContent + "<option value='" + r.usersList[i].user_ID + "'  >"
                        + r.usersList[i].title +"-"+r.usersList[i].f_name+"-"+r.usersList[i].m_name+ "-"+r.usersList[i].l_name+   "</option>";
        }
       
        $("#nurse").html(divContent);
        $("#nurse").select2();
       
        }
    });
    
}

function showPatientInfoForm(){
	$("#patientInfoDiv").show();
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function isCharacter(evt) {
	 var regex = /^[a-zA-Z\s]*$/;
	  if (!regex.test(evt)) {
		  alert("Please only enter alphabates!");
		  ("#callerName").focus();
	  }
}

/*function getAmbulancePatientByDate()
{	
	var resultData = [];
	
	var patientId=1;
	var uHIDNumber = "";
	var patientName="";
	
		var requisitionDate=$("#txtFdate").val();
		var aa=requisitionDate.split("/");
		var toDate = $("#txtTdate").val();
		
	
		var fromDate=aa[2]+"-"+aa[1]+"-"+aa[0];
		var bb=toDate.split("/");
		
		var toDate1=bb[2]+"-"+bb[1]+"-"+bb[0];
		
        var inputs = [];
        inputs.push('requisition_date=' + fromDate);
        inputs.push('toDate=' + toDate1);
       
        var str = inputs.join('&');
	
	jQuery.ajax({
	async : false,
	type : "POST",
	data 	: str + "&reqType=AJAX",
	url : "ehat/ambulancePatient/getAmbulancePatientByDate",
	success : function(r) {
		
		var template = "";
		
		 var htm = "";
			var index = 1;
			if(r.listAmbulancePatientInfo.length > 0){
				
					for ( var i = 0; i < r.listAmbulancePatientInfo.length; i++) {
						var dateF= new Date(r.listAmbulancePatientInfo[i].requisition_date).toLocaleDateString('en-GB');
						htm = htm
								+ '<tr> '
								+ ' <td class="col-md-1 center">'
								+ index
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.listAmbulancePatientInfo[i].uhid_number
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.listAmbulancePatientInfo[i].patient_name
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.listAmbulancePatientInfo[i].id
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.listAmbulancePatientInfo[i].requisition_date
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.listAmbulancePatientInfo[i].consultant_name
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.listAmbulancePatientInfo[i].pickup_location
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.listAmbulancePatientInfo[i].drop_location
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.listAmbulancePatientInfo[i].purpose
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.listAmbulancePatientInfo[i].caller_name
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.listAmbulancePatientInfo[i].caller_number
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.listAmbulancePatientInfo[i].status
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.listAmbulancePatientInfo[i].status_remark
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.listAmbulancePatientInfo[i].time
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.listAmbulancePatientInfo[i].emergencyPatient
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-success" onclick=editAmbulancePatient('
								+ r.listAmbulancePatientInfo[i].id
								+ ')><i class="fa fa-edit"></i></button></td>'
								+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-danger" onclick=deleteAmbulancePatient('
								+ r.listAmbulancePatientInfo[i].id
								+ ')><i class="fa fa-trash-o"></i></button></td>'
								+ '</tr>';
						index++;
					};
					$("#ambulancePatientList").html(htm);
			}
		}
	});	
}*/

function autoSuggestion(inputID)
{	
	var resultData = [];
	
	var patientId=1;
	var uHIDNumber = "";
	var patientName="";
	
		var patSearchType=$("#patSearchType").val();
		var findingName = $("#" + inputID).val();
		
        var inputs = [];
        inputs.push('callFrom=' + patSearchType);
        inputs.push('text=' + findingName);
       
        var str = inputs.join('&');
	
	jQuery.ajax({
	async : false,
	type : "POST",
	data 	: str + "&reqType=AJAX",
	url : "ehat/ambulancePatient/autoSuggestion",
	success : function(r) {
		
		var template = "";
		for ( var j = 0; j < r.listAmbulancePatientDto.length; j++) {
			
			var arrValue = r.listAmbulancePatientDto[j].patientId +"-"+r.listAmbulancePatientDto[j].patientName +"-"+r.listAmbulancePatientDto[j].mobileNo ;
			var idValue = r.listAmbulancePatientDto[j].patientId;
			var patName = r.listAmbulancePatientDto[j].patientName;
			resultData.push({
				ID : idValue,
				Name : patName
			});
			template = template + '<li data-value="' + idValue
					+ '" class=""><a href="#">' + arrValue
					+ '</a></li>';
		}
		
		setTimeout(function() {

			$("#div" + inputID + " .typeahead").html(template);
			$("#div" + inputID + " .typeahead").show();
			
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

		var res = item.text.split('-');
		var patId = res[0];
		var patName = res[1];
		//var patMobile = res[2];
		
		$("#" + inputID).val(patName);	
		getAmbulancePtatientById(patId);
	}
}

function getAmbulancePtatientById(patientId) {
	
	if(patientId !=undefined && patientId!=null && patientId!="" && patientId!="null"){
		
		var inputs = [];
		inputs.push('id=' + patientId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/ambulancePatient/getAmbulancePatientById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				var htm = "";
				var index = 1;
				if(r.listAmbulancePatientDto.length > 0){
					
						for ( var i = 0; i < r.listAmbulancePatientDto.length; i++) {
							htm = htm
									+ '<tr> '
									+ ' <td class="col-md-1 center">'
									+ index
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].uHIDNumber
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].patientName
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].requisitionDate
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].consultantName
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].pickupLocation
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].dropLocation
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].purpose
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].callerName
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].callerNumber
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].status
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ r.listAmbulancePatientDto[i].statusRemark
									+ '</td>'
									+ ' <td class="col-md-1 center">'
									+ '	<button class="btn btn-xs btn-success" onclick=editAmbulancePatient('
									+ r.listAmbulancePatientDto[i].id
									+ ')><i class="fa fa-edit"></i></button></td>'
									+ ' <td class="col-md-1 center">'
									+ '	<button class="btn btn-xs btn-danger" onclick=deleteAmbulancePatient('
									+ r.listAmbulancePatientDto[i].id
									+ ')><i class="fa fa-trash-o"></i></button></td>'
									+ '</tr>';
							index++;
						};
						
						$("#ambulancePatientList").html(htm);
				}
			}
		});
	}
}

function searchbyFilters()
{
	var status = $("#statusMaster option:selected").text();
	var department = $("#department_for_header option:selected").text();
	var requisitionDate=$("#txtFdate").val();
	var aa=requisitionDate.split("/");
	var toDate = $("#txtTdate").val();
	
	var fromDate=aa[2]+"-"+aa[1]+"-"+aa[0];
	var bb=toDate.split("/");
	
	var toDate1=bb[2]+"-"+bb[1]+"-"+bb[0];
	var wardTypeSelect = $("#wardTypeSelect_for_header1 option:selected").val();
	
    var inputs = [];
    inputs.push('status=' + status);
    inputs.push('department=' + department);
    inputs.push('requisitionDate=' + fromDate);
    inputs.push('toDate=' + toDate1); 
	inputs.push('wardTypeSelect=' + wardTypeSelect);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ambulancePatient/getfilterAmbulancePatientMasterWithDate",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if(r!==null){
				
				setAllPatient(r, "search");
			
			}else{
				
        		alertify.error("Patient not found !!!");
        	}
						
		}
	});
}

function getAllStatusMaster() {

	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/statusMaster/getAllStatusMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			setAllStatusMaster(r, "All");
			setStatusMaster(r);
		}
	});
}

function setAllStatusMaster(r, CallFrom) {

	var htm = "";
	var index = 1;
	if (r != "" && r != undefined) {
		if (CallFrom == "All") {
			for (var i = 0; i < r.listStatusMasterDto.length; i++) {
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listStatusMasterDto[i].statusType
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editStatusMaster('
						+ r.listStatusMasterDto[i].statusId
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteStatusMaster('
						+ r.listStatusMasterDto[i].statusId
						+ ')><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';
				index++;
			}
			;
		} else if (CallFrom == "search") {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.statusType
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editStatusMaster('
					+ r.statusId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteStatusMaster('
					+ r.statusId
					+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			index++;
		}
	}
	$("#statusMasterList").html(htm);
}

function setStatusMaster(r){
	var list="<option value='0'>-select-</option>";
	
	for ( var int = 0; int < r.listStatusMasterDto.length; int++) {
		
		list=list+'<option value="'+(r.listStatusMasterDto[int].statusId)+'">'+(r.listStatusMasterDto[int].statusType)+'</option>';
		
	}
	$("#statusMaster").html(list);
}

function closeWin()
{
	$("#patientInfoDiv").hide();
}
