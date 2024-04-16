/************
* @author	:Dayanand Khandekar
* @date		: 11-1-2022
* @codeFor	: get  doctor specilization id For dropdown
 ************/
function getAllDoctorList(){


	var inputs = [];
	var date = "";
	inputs.push('docType=' + "All");
	inputs.push('date=' + "");

	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/scheduler/getAllDoctorList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
		
			var listdepartment = "<option value=0>--Select--</option>";
			for(var i=0;i<r.listDoctor.length;i++)
			{
				listdepartment=listdepartment+'<option value="'+r.listDoctor[i].doctor_ID+'">'+r.listDoctor[i].doc_name+'</option>';
				}
			$("#divDocName").select2();
			$("#divDocName").html(listdepartment);
		
			
			//$('#divDocName').attr("disabled","disabled");
		}
	});
}
function getDoctorBySpecializationScheduler(callFrom) {
	var unitId=1;
	var userId=1;
	var callFrom="";
	var doctorId = 0;

		doctorId = $("#selHosDeptNew").val();
		var isMultispeciality = $("#isMultiple").val();
		if(isMultispeciality == "Multiple")
		{
			return true;
			}
	
	var person = {
		doctor_id : doctorId,
        unitId : unitId,
        userId : userId,
        callFrom : "speciality"
    }
    $.ajax({
    	async 		: false,
        url			: 'ehat/register/getDoctorBySpecialization',
        type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(person),
        contentType	: 'application/json',
        success		: function (r) {
            
        	setDoctorBySpecializationScheduler(r,"selDoctorNameNew",callFrom);
        }        
    });
}
/************
* @author	:Dayanand Khandekar
* @date		: 11-1-2022
* @codeFor	: set  doctor list For dropdown
 ************/
function setDoctorBySpecializationScheduler(r,dropDownId,callFrom){
	
	
	var htm = "<option value=0>--Select--</option>";
	for ( var i = 0; i < r.lstDoctorBySpecialization.length; i++) {

		htm = htm + "<option value="+r.lstDoctorBySpecialization[i].doctor_id+">"+r.lstDoctorBySpecialization[i].doc_name+"</option>";
	}

	$("#"+dropDownId).html(htm);
	$("#divDocName").html(htm);
	
}

function getDocSpecilizationByDoctorIdNew(docId,specId) {
	
	
	var doctorID = $("#"+docId).val();
	
	if (doctorID == null || doctorID == "") {
		return false;
	} 
	else {
		var inputs = [];
		inputs.push('doctorId=' + doctorID);
		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/users/getDoctorDetailsByDoctorId",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				if (r.specialisation.includes(",")) {
					$('#isMultiple').val("Multiple");
					var specialisationArray = r.specialisation.split(',');
					var namesArray = r.specializationName.split(',');

					var selectBox = $("#"+specId);

					selectBox.empty();

					$.each(specialisationArray, function(index, value) {
						selectBox.append($('<option>', {
							value : value,
							text : namesArray[index].trim()
						}));
					});

					selectBox.trigger('#'+specId+' change.select2');
					selectBox.select2('val', specialisationArray[0]);
				} else {
					getSpecializationOnSchedulerAppointment();
					$('#isMultiple').val("Single");
					$("#"+specId).select2('val', r.specialisation);
				}
			}
		});
	}
}


function getAllConsultingRoom() {
	var unitId=$("#unitId").val();
	var inputs = [];	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/croom/getAllConsultingRoom",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			var selectList = "<option value=''>Select Room</option>";
			for ( var i = 0; i <r. getListOfConsultingRoomMaterDTO.length; i++) {
				selectList = selectList
						+ "<option value='"+r.getListOfConsultingRoomMaterDTO[i].roomMasterId+"'>"
						+ r.getListOfConsultingRoomMaterDTO[i].roomName + "</option>";
			}
			$('.consultingRoom').html(selectList);		
		}
	});
	
	
}


//Save Time Slots

function saveDoctorSlotTime() {		
		var divDocName=$("#divDocName").val();
		var specializationId = $('#selHosDeptNew').val();
		
		if(divDocName==0 && specializationId=='' && specializationId==0){
			alert("Plese select Doctor Name or Specialization");
			return false;
		}	
	var inputs = [];
	/* Morning Slot */
	var txtMorSunStart = $("#txtMorSunStart").val();
	var txtMorMonStart = $("#txtMorMonStart").val();
	var txtMorTueStart = $("#txtMorTueStart").val();
	var txtMorWedStart = $("#txtMorWedStart").val();
	var txtMorThiStart = $("#txtMorThiStart").val();
	var txtMorFriStart = $("#txtMorFriStart").val();
	var txtMorSatStart = $("#txtMorSatStart").val();
	var txtMorSatEnd = $("#txtMorSatEnd").val();
	var txtMorFriEnd = $("#txtMorFriEnd").val();
	var txtMorThiEnd = $("#txtMorThiEnd").val();
	var txtMorWedEnd = $("#txtMorWedEnd").val();
	var txtMorTueEnd = $("#txtMorTueEnd").val();
	var txtMorMonEnd = $("#txtMorMonEnd").val();
	var txtMorSunEnd = $("#txtMorSunEnd").val();
	
	var txtMorSunRoom = $("#txtMorSunRoom").val();
	var txtMorMonRoom = $("#txtMorMonRoom").val();
	var txtMorTueRoom = $("#txtMorTueRoom").val();
	var txtMorWedRoom = $("#txtMorWedRoom").val();
	var txtMorThuRoom = $("#txtMorThuRoom").val();
	var txtMorFriRoom = $("#txtMorFriRoom").val();
	var txtMorSatRoom = $("#txtMorSatRoom").val();
	/* /Morning Slot */
	/* After Noon Slot */
	var txtAftSunStart = $("#txtAftSunStart").val();
	var txtAftMonStart = $("#txtAftMonStart").val();
	var txtAftTueStart = $("#txtAftTueStart").val();
	var txtAftWedStart = $("#txtAftWedStart").val();
	var txtAftThiStart = $("#txtAftThiStart").val();
	var txtAftFriStart = $("#txtAftFriStart").val();
	var txtAftSatStart = $("#txtAftSatStart").val();
	var txtAftSatEnd = $("#txtAftSatEnd").val();
	var txtAftFriEnd = $("#txtAftFriEnd").val();
	var txtAftThiEnd = $("#txtAftThiEnd").val();
	var txtAftWedEnd = $("#txtAftWedEnd").val();
	var txtAftTueEnd = $("#txtAftTueEnd").val();
	var txtAftMonEnd = $("#txtAftMonEnd").val();
	var txtAftSunEnd = $("#txtAftSunEnd").val();
	
	var txtAftSunRoom = $("#txtAftSunRoom").val();
	var txtAftMonRoom = $("#txtAftMonRoom").val();
	var txtAftTueRoom = $("#txtAftTueRoom").val();
	var txtAftWedRoom = $("#txtAftWedRoom").val();
	var txtAftThuRoom = $("#txtAftThuRoom").val();
	var txtAftFriRoom = $("#txtAftFriRoom").val();
	var txtAftSatRoom = $("#txtAftSatRoom").val();
	/* /After Noon Slot */
	/* Evening Slot */
	var txtEveSunStart = $("#txtEveSunStart").val();
	var txtEveMonStart = $("#txtEveMonStart").val();
	var txtEveTueStart = $("#txtEveTueStart").val();
	var txtEveWedStart = $("#txtEveWedStart").val();
	var txtEveThiStart = $("#txtEveThiStart").val();
	var txtEveFriStart = $("#txtEveFriStart").val();
	var txtEveSatStart = $("#txtEveSatStart").val();
	var txtEveSatEnd = $("#txtEveSatEnd").val();
	var txtEveFriEnd = $("#txtEveFriEnd").val();
	var txtEveThiEnd = $("#txtEveThiEnd").val();
	var txtEveWedEnd = $("#txtEveWedEnd").val();
	var txtEveTueEnd = $("#txtEveTueEnd").val();
	var txtEveMonEnd = $("#txtEveMonEnd").val();
	var txtEveSunEnd = $("#txtEveSunEnd").val();
	
	var txtEveSunRoom = $("#txtEveSunRoom").val();
	var txtEveMonRoom = $("#txtEveMonRoom").val();
	var txtEveTueRoom = $("#txtEveTueRoom").val();
	var txtEveWedRoom = $("#txtEveWedRoom").val();
	var txtEveThuRoom = $("#txtEveThuRoom").val();
	var txtEveFriRoom = $("#txtEveFriRoom").val();
	var txtEveSatRoom = $("#txtEveSatRoom").val();
	/* /Evening Slot */
	
	if (((txtMorSunStart == "" && txtMorSunEnd == "")
			|| (txtMorMonStart == "" && txtMorMonEnd == "")
			|| (txtMorTueStart == "" && txtMorTueEnd == "")
			|| (txtMorWedStart == "" && txtMorWedEnd == "")
			|| (txtMorThiStart == "" && txtMorThiEnd == "")
			|| (txtMorFriStart == "" && txtMorFriEnd == "") || (txtMorSatStart == "" && txtMorSatEnd == ""))
			|| ((txtAftSunStart == "" && txtAftSunEnd == "")
					|| (txtAftMonStart == "" && txtAftMonEnd == "")
					|| (txtAftTueStart == "" && txtAftTueEnd == "")
					|| (txtAftWedStart == "" && txtAftWedEnd == "")
					|| (txtAftThiStart == "" && txtAftThiEnd == "")
					|| (txtAftFriStart == "" && txtAftFriEnd == "") || (txtAftSatStart == "" && txtAftSatEnd == ""))
			|| ((txtEveSunStart == "" && txtEveSunEnd == "")
					|| (txtEveMonStart == "" && txtEveMonEnd == "")
					|| (txtEveTueStart == "" && txtEveTueEnd == "")
					|| (txtEveWedStart == "" && txtEveWedEnd == "")
					|| (txtEveThiStart == "" && txtEveThiEnd == "")
					|| (txtEveFriStart == "" && txtEveFriEnd == "") || (txtEveSatStart == "" && txtEveSatEnd == ""))) {

		alert("Please Enter Correct Filled Can Not Be Saved");
		return ;
	}else if(( (txtMorSunStart > txtMorSunEnd)
			|| (txtMorMonStart > txtMorMonEnd)
			|| (txtMorTueStart > txtMorTueEnd)
			|| (txtMorWedStart > txtMorWedEnd)
			|| (txtMorThiStart > txtMorThiEnd)
			|| (txtMorFriStart > txtMorFriEnd) || (txtMorSatStart > txtMorSatEnd))
			|| ((txtAftSunStart > txtAftSunEnd)
					|| (txtAftMonStart > txtAftMonEnd)
					|| (txtAftTueStart > txtAftTueEnd)
					|| (txtAftWedStart > txtAftWedEnd)
					|| (txtAftThiStart > txtAftThiEnd)
					|| (txtAftFriStart > txtAftFriEnd) || (txtAftSatStart > txtAftSatEnd))
			|| ((txtEveSunStart > txtEveSunEnd)
					|| (txtEveMonStart > txtEveMonEnd)
					|| (txtEveTueStart > txtEveTueEnd)
					|| (txtEveWedStart > txtEveWedEnd)
					|| (txtEveThiStart > txtEveThiEnd)
					|| (txtEveFriStart > txtEveFriEnd) || (txtEveSatStart > txtEveSatEnd))){
		alert("Start Time Should Be Less Than End Time..");
		return ;
	}
	
	//validation by Amol Saware
	else if(txtMorSunStart != "" && txtMorSunEnd != "" && txtMorSunStart != txtMorSunEnd && txtMorSunRoom == ""){
		$('#txtMorSunRoom').css("border-color","red");
		alert("Please Select Sunday Morning Room..");
		return ;
	}
	
	else if(txtMorMonStart != "" && txtMorMonEnd != "" && txtMorMonStart != txtMorMonEnd && txtMorMonRoom == ""){
		$('#txtMorMonRoom').css("border-color","red");
		alert("Please Select Monday Morning Room..");
		return ;
	}
	
	else if(txtMorTueStart != "" && txtMorTueEnd != "" && txtMorTueStart != txtMorTueEnd && txtMorTueRoom == ""){
		$('#txtMorTueRoom').css("border-color","red");
		alert("Please Select Tuesday Morning Room..");
		return ;
	}
	
	else if(txtMorWedStart != "" && txtMorWedEnd != "" && txtMorWedStart != txtMorWedEnd && txtMorWedRoom == ""){
		$('#txtMorWedRoom').css("border-color","red");
		alert("Please Select Wednesday Morning Room..");
		return ;
	}
	
	else if(txtMorThiStart != "" && txtMorThiEnd != "" && txtMorThiStart != txtMorThiEnd && txtMorThuRoom == ""){
		$('#txtMorThuRoom').css("border-color","red");
		alert("Please Select Thursday Morning Room..");
		return ;
	}
	
	else if(txtMorFriStart != "" && txtMorFriEnd != "" && txtMorFriStart != txtMorFriEnd && txtMorFriRoom == ""){
		$('#txtMorFriRoom').css("border-color","red");
		alert("Please Select Friday Morning Room..");
		return ;
	}
	
	else if(txtMorSatStart != "" && txtMorSatEnd != "" && txtMorSatStart != txtMorSatEnd && txtMorSatRoom == ""){
		$('#txtMorSatRoom').css("border-color","red");
		alert("Please Select Saturday Morning Room..");
		return ;
	}
	
	else if(txtAftSunStart != "" && txtAftSunEnd != "" && txtAftSunStart != txtAftSunEnd && txtAftSunRoom == ""){
		$('#txtAftSunRoom').css("border-color","red");
		alert("Please Select Sunday Afternoon Room..");
		return ;
	}
	
	else if(txtAftMonStart != "" && txtAftMonEnd != "" && txtAftMonStart != txtAftMonEnd && txtAftMonRoom == ""){
		$('#txtAftMonRoom').css("border-color","red");
		alert("Please Select Monday Afternoon Room..");
		return ;
	}
	
	else if(txtAftTueStart != "" && txtAftTueEnd != "" && txtAftTueStart != txtAftTueEnd && txtAftTueRoom == ""){
		$('#txtAftTueRoom').css("border-color","red");
		alert("Please Select Tuesday Afternoon Room..");
		return ;
	}
	
	else if(txtAftWedStart != "" && txtAftWedEnd != "" && txtAftWedStart != txtAftWedEnd && txtAftWedRoom == ""){
		$('#txtAftWedRoom').css("border-color","red");
		alert("Please Select Wednesday Afternoon Room..");
		return ;
	}
	
	else if(txtAftThiStart != "" && txtAftThiEnd != "" && txtAftThiStart != txtAftThiEnd && txtAftThuRoom == ""){
		$('#txtAftThuRoom').css("border-color","red");
		alert("Please Select Thursday Afternoon Room..");
		return ;
	}
	
	else if(txtAftFriStart != "" && txtAftFriEnd != "" && txtAftFriStart != txtAftFriEnd && txtAftFriRoom == ""){
		$('#txtAftFriRoom').css("border-color","red");
		alert("Please Select Friday Afternoon Room..");
		return ;
	}
	
	else if(txtAftSatStart != "" && txtAftSatEnd != "" && txtAftSatStart != txtAftSatEnd && txtAftSatRoom == ""){
		$('#txtAftSatRoom').css("border-color","red");
		alert("Please Select Saturday Afternoon Room..");
		return ;
	}
	
	else if(txtEveSunStart != "" && txtEveSunEnd != "" && txtEveSunStart != txtEveSunEnd && txtEveSunRoom == ""){
		$('#txtEveSunRoom').css("border-color","red");
		alert("Please Select Sunday Evening Room..");
		return ;
	}
	
	else if(txtEveMonStart != "" && txtEveMonEnd != "" && txtEveMonStart != txtEveMonEnd && txtEveMonRoom == ""){
		$('#txtEveMonRoom').css("border-color","red");
		alert("Please Select Monday Evening Room..");
		return ;
	}
	
	else if(txtEveTueStart != "" && txtEveTueEnd != "" && txtEveTueStart != txtEveTueEnd && txtEveTueRoom == ""){
		$('#txtEveTueRoom').css("border-color","red");
		alert("Please Select Tuesday Evening Room..");
		return ;
	}
	
	else if(txtEveWedStart != "" && txtEveWedEnd != "" && txtEveWedStart != txtEveWedEnd && txtEveWedRoom == ""){
		$('#txtEveWedRoom').css("border-color","red");
		alert("Please Select Wednesday Evening Room..");
		return ;
	}
	
	else if(txtEveThiStart != "" && txtEveThiEnd != "" && txtEveThiStart != txtEveThiEnd && txtEveThuRoom == ""){
		$('#txtEveThuRoom').css("border-color","red");
		alert("Please Select Thursday Evening Room..");
		return ;
	}
	
	else if(txtEveFriStart != "" && txtEveFriEnd != "" && txtEveFriStart != txtEveFriEnd && txtEveFriRoom == ""){
		$('#txtEveFriRoom').css("border-color","red");
		alert("Please Select Friday Evening Room..");
		return ;
	}
	
	else if(txtEveSatStart != "" && txtEveSatEnd != "" && txtEveSatStart != txtEveSatEnd && txtEveSatRoom == ""){
		$('#txtEveSatRoom').css("border-color","red");
		alert("Please Select Saturday Evening Room..");
		return ;
	}//End
	
/*
 * else if(( (txtMorSunStart == txtMorSunEnd) || (txtMorMonStart ==
 * txtMorMonEnd) || (txtMorTueStart == txtMorTueEnd) || (txtMorWedStart ==
 * txtMorWedEnd) || (txtMorThiStart == txtMorThiEnd) || (txtMorFriStart ==
 * txtMorFriEnd) || (txtMorSatStart == txtMorSatEnd)) || ((txtAftSunStart ==
 * txtAftSunEnd) || (txtAftMonStart == txtAftMonEnd) || (txtAftTueStart ==
 * txtAftTueEnd) || (txtAftWedStart == txtAftWedEnd) || (txtAftThiStart ==
 * txtAftThiEnd) || (txtAftFriStart == txtAftFriEnd) || (txtAftSatStart ==
 * txtAftSatEnd)) || ((txtEveSunStart == txtEveSunEnd) || (txtEveMonStart ==
 * txtEveMonEnd) || (txtEveTueStart == txtEveTueEnd) || (txtEveWedStart ==
 * txtEveWedEnd) || (txtEveThiStart == txtEveThiEnd) || (txtEveFriStart ==
 * txtEveFriEnd) || (txtEveSatStart == txtEveSatEnd))){ alert("Start Time Should
 * Not Be Equal.."); }
 */
	else {
		
		inputs.push('sunMorningStart=' + txtMorSunStart);
		inputs.push('sunMorningEnd=' + txtMorSunEnd);
		inputs.push('monMorningStart=' + txtMorMonStart);
		inputs.push('monMorningEnd=' + txtMorMonEnd);
		inputs.push('tueMorningStart=' + txtMorTueStart);
		inputs.push('tueMorningEnd=' + txtMorTueEnd);
		inputs.push('wedMorningStart=' + txtMorWedStart);
		inputs.push('wedMorningEnd=' + txtMorWedEnd);
		inputs.push('thiMorningStart=' + txtMorThiStart);
		inputs.push('thiMorningEnd=' + txtMorThiEnd);
		inputs.push('friMorningStart=' + txtMorFriStart);
		inputs.push('friMorningEnd=' + txtMorFriEnd);
		inputs.push('satMorningStart=' + txtMorSatStart);
		inputs.push('satMorningEnd=' + txtMorSatEnd);
		
		inputs.push('sunMorningRoom=' + txtMorSunRoom);
		inputs.push('monMorningRoom=' + txtMorMonRoom);
		inputs.push('tueMorningRoom=' + txtMorTueRoom);
		inputs.push('wedMorningRoom=' + txtMorWedRoom);
		inputs.push('thuMorningRoom=' + txtMorThuRoom);
		inputs.push('friMorningRoom=' + txtMorFriRoom);
		inputs.push('satMorningRoom=' + txtMorSatRoom);
		// push Afternoon Time slote
		inputs.push('sunAfternoonStart=' + txtAftSunStart);
		inputs.push('sunAfternoonEnd=' + txtAftSunEnd);
		inputs.push('monAfternoonStart=' + txtAftMonStart);
		inputs.push('monAfternoonEnd=' + txtAftMonEnd);
		inputs.push('tueAfternoonStart=' + txtAftTueStart);
		inputs.push('tueAfternoonEnd=' + txtAftTueEnd);
		inputs.push('wedAfternoonStart=' + txtAftWedStart);
		inputs.push('wedAfternoonEnd=' + txtAftWedEnd);
		inputs.push('thiAfternoonStart=' + txtAftThiStart);
		inputs.push('thiAfternoonEnd=' + txtAftThiEnd);
		inputs.push('friAfternoonStart=' + txtAftFriStart);
		inputs.push('friAfternoonEnd=' + txtAftFriEnd);
		inputs.push('satAfternoonStart=' + txtAftSatStart);
		inputs.push('satAfternoonEnd=' + txtAftSatEnd);
		
		inputs.push('sunAfternoonRoom=' + txtAftSunRoom);
		inputs.push('monAfternoonRoom=' + txtAftMonRoom);
		inputs.push('tueAfternoonRoom=' + txtAftTueRoom);
		inputs.push('wedAfternoonRoom=' + txtAftWedRoom);
		inputs.push('thuAfternoonRoom=' + txtAftThuRoom);
		inputs.push('friAfternoonRoom=' + txtAftFriRoom);
		inputs.push('satAfternoonRoom=' + txtAftSatRoom);
		// push Evening Time Slote
		inputs.push('sunEverningStart=' + txtEveSunStart);
		inputs.push('sunEverningEnd=' + txtEveSunEnd);
		inputs.push('monEverningStart=' + txtEveMonStart);
		inputs.push('monEverningEnd=' + txtEveMonEnd);
		inputs.push('tueEverningStart=' + txtEveTueStart);
		inputs.push('tueEverningEnd=' + txtEveTueEnd);
		inputs.push('wedEverningStart=' + txtEveWedStart);
		inputs.push('wedEverningEnd=' + txtEveWedEnd);
		inputs.push('thiEverningStart=' + txtEveThiStart);
		inputs.push('thiEverningEnd=' + txtEveThiEnd);
		inputs.push('friEverningStart=' + txtEveFriStart);
		inputs.push('friEverningEnd=' + txtEveFriEnd);
		inputs.push('satEverningStart=' + txtEveSatStart);
		inputs.push('satEverningEnd=' + txtEveSatEnd);
		
		inputs.push('sunEverningRoom=' + txtEveSunRoom);
		inputs.push('monEverningRoom=' + txtEveMonRoom);
		inputs.push('tueEverningRoom=' + txtEveTueRoom);
		inputs.push('wedEverningRoom=' + txtEveWedRoom);
		inputs.push('thuEverningRoom=' + txtEveThuRoom);
		inputs.push('friEverningRoom=' + txtEveFriRoom);
		inputs.push('satEverningRoom=' + txtEveSatRoom);
		
		inputs.push('Doctor_ID=' + divDocName);
		inputs.push('duration=' + $("#slotDuration").val());
		inputs.push('color=' + $("#eventsAppointment").val());
		inputs.push('status=' + "Y");
		inputs.push('idschedularDoctorTimeSlot=' + $("#idschedularDoctorTimeSlot").val());
		inputs.push('specializationId=' + specializationId);
		/*inputs.push('action=saveDoctorSlotTime');*/
		// var str = inputs.join('&');
	}
	var str = inputs.join('&');
	jQuery.ajax({

		async : false,
		type : "POST",
		url : "ehat/scheduler/saveDoctorSlotTime",
		data	: str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			alert(response);
			window.location.reload();
		}
	});
};



//To fetch time slot and set.
function getDoctorTimeSlotDetails() {
	var specializationId = $('#selHosDeptNew').val();
	var inputs = [];
	inputs.push('doctorId=' + $("#divDocName").val());
	inputs.push('specializationId=' + specializationId);
	inputs.push('pageName=SchedulingDoctorSlot');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/scheduler/getDoctorTimeSlotDetails",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			//var ajaxResponse = r;
			//var pobj1 = eval('(' + ajaxResponse + ')');
		//alert(response.listSchedularDoctorTimeSlotDto.length);
			if ( response.listSchedularDoctorTimeSlotDto.length == 0) {
			//	$("#queryType").val("save");
				$("#idschedularDoctorTimeSlot").val(0);

				$("#txtMorSunStart").val("00:00:00");
				$("#txtMorMonStart").val("00:00:00");
				$("#txtMorTueStart").val("00:00:00");
				$("#txtMorWedStart").val("00:00:00");
				$("#txtMorThiStart").val("00:00:00");
				$("#txtMorFriStart").val("00:00:00");
				$("#txtMorSatStart").val("00:00:00");

				$("#txtMorSatEnd").val("00:00:00");
				$("#txtMorFriEnd").val("00:00:00");
				$("#txtMorThiEnd").val("00:00:00");
				$("#txtMorWedEnd").val("00:00:00");
				$("#txtMorTueEnd").val("00:00:00");
				$("#txtMorMonEnd").val("00:00:00");
				$("#txtMorSunEnd").val("00:00:00");
				
				$("#txtMorSunRoom").val('');
				$("#txtMorMonRoom").val('');
				$("#txtMorTueRoom").val('');
				$("#txtMorWedRoom").val('');
				$("#txtMorThuRoom").val('');
				$("#txtMorFriRoom").val('');
				$("#txtMorSatRoom").val('');
				
				/* /Morning Slot */
				/* After Noon Slot */
				$("#txtAftSunStart").val("12:00:00");
				$("#txtAftMonStart").val("12:00:00");
				$("#txtAftTueStart").val("12:00:00");
				$("#txtAftWedStart").val("12:00:00");
				$("#txtAftThiStart").val("12:00:00");
				$("#txtAftFriStart").val("12:00:00");
				$("#txtAftSatStart").val("12:00:00");

				$("#txtAftSatEnd").val("12:00:00");
				$("#txtAftFriEnd").val("12:00:00");
				$("#txtAftThiEnd").val("12:00:00");
				$("#txtAftWedEnd").val("12:00:00");
				$("#txtAftTueEnd").val("12:00:00");
				$("#txtAftMonEnd").val("12:00:00");
				$("#txtAftSunEnd").val("12:00:00");
				
				$("#txtAftSunRoom").val('');
				$("#txtAftMonRoom").val('');
				$("#txtAftTueRoom").val('');
				$("#txtAftWedRoom").val('');
				$("#txtAftThuRoom").val('');
				$("#txtAftFriRoom").val('');
				$("#txtAftSatRoom").val('');
				/* /After Noon Slot */
				/* Evening Slot */
				$("#txtEveSunStart").val("16:00:00");
				$("#txtEveMonStart").val("16:00:00");
				$("#txtEveTueStart").val("16:00:00");
				$("#txtEveWedStart").val("16:00:00");
				$("#txtEveThiStart").val("16:00:00");
				$("#txtEveFriStart").val("16:00:00");
				$("#txtEveSatStart").val("16:00:00");

				$("#txtEveSatEnd").val("16:00:00");
				$("#txtEveFriEnd").val("16:00:00");
				$("#txtEveThiEnd").val("16:00:00");
				$("#txtEveWedEnd").val("16:00:00");
				$("#txtEveTueEnd").val("16:00:00");
				$("#txtEveMonEnd").val("16:00:00");
				$("#txtEveSunEnd").val("16:00:00");
				
				$("#txtEveSunRoom").val('');
				$("#txtEveMonRoom").val('');
				$("#txtEveTueRoom").val('');
				$("#txtEveWedRoom").val('');
				$("#txtEveThuRoom").val('');
				$("#txtEveFriRoom").val('');
				$("#txtEveSatRoom").val('');

			} else {
				//$("#queryType").val("update");
				$("#idschedularDoctorTimeSlot").val(response.listSchedularDoctorTimeSlotDto[0].idschedularDoctorTimeSlot);
				

				$("#slotDuration").val(response.listSchedularDoctorTimeSlotDto[0].duration);
				$("#eventsAppointment").val(response.listSchedularDoctorTimeSlotDto[0].color);
				$("#eventsAppointment").css("background-color", response.listSchedularDoctorTimeSlotDto[0].color);

				$("#txtMorSunStart").val(response.listSchedularDoctorTimeSlotDto[0].sunMorningStart);
				$("#txtMorMonStart").val(response.listSchedularDoctorTimeSlotDto[0].monMorningStart);
				$("#txtMorTueStart").val(response.listSchedularDoctorTimeSlotDto[0].tueMorningStart);
				$("#txtMorWedStart").val(response.listSchedularDoctorTimeSlotDto[0].wedMorningStart);
				$("#txtMorThiStart").val(response.listSchedularDoctorTimeSlotDto[0].thiMorningStart);
				$("#txtMorFriStart").val(response.listSchedularDoctorTimeSlotDto[0].friMorningStart);
				$("#txtMorSatStart").val(response.listSchedularDoctorTimeSlotDto[0].satMorningStart);

				$("#txtMorSatEnd").val(response.listSchedularDoctorTimeSlotDto[0].satMorningEnd);
				$("#txtMorFriEnd").val(response.listSchedularDoctorTimeSlotDto[0].friMorningEnd);
				$("#txtMorThiEnd").val(response.listSchedularDoctorTimeSlotDto[0].thiMorningEnd);
				$("#txtMorWedEnd").val(response.listSchedularDoctorTimeSlotDto[0].wedMorningEnd);
				$("#txtMorTueEnd").val(response.listSchedularDoctorTimeSlotDto[0].tueMorningEnd);
				$("#txtMorMonEnd").val(response.listSchedularDoctorTimeSlotDto[0].monMorningEnd);
				$("#txtMorSunEnd").val(response.listSchedularDoctorTimeSlotDto[0].sunMorningEnd);
				
				$("#txtMorSunRoom").val(response.listSchedularDoctorTimeSlotDto[0].sunMorningRoom);
				$("#txtMorMonRoom").val(response.listSchedularDoctorTimeSlotDto[0].monMorningRoom);
				$("#txtMorTueRoom").val(response.listSchedularDoctorTimeSlotDto[0].tueMorningRoom);
				$("#txtMorWedRoom").val(response.listSchedularDoctorTimeSlotDto[0].wedMorningRoom);
				$("#txtMorThuRoom").val(response.listSchedularDoctorTimeSlotDto[0].thuMorningRoom);
				$("#txtMorFriRoom").val(response.listSchedularDoctorTimeSlotDto[0].friMorningRoom);
				$("#txtMorSatRoom").val(response.listSchedularDoctorTimeSlotDto[0].satMorningRoom);
				/* /Morning Slot */
				/* After Noon Slot */
				$("#txtAftSunStart").val(response.listSchedularDoctorTimeSlotDto[0].sunAfternoonStart);
				$("#txtAftMonStart").val(response.listSchedularDoctorTimeSlotDto[0].monAfternoonStart);
				$("#txtAftTueStart").val(response.listSchedularDoctorTimeSlotDto[0].tueAfternoonStart);
				$("#txtAftWedStart").val(response.listSchedularDoctorTimeSlotDto[0].wedAfternoonStart);
				$("#txtAftThiStart").val(response.listSchedularDoctorTimeSlotDto[0].thiAfternoonStart);
				$("#txtAftFriStart").val(response.listSchedularDoctorTimeSlotDto[0].friAfternoonStart);
				$("#txtAftSatStart").val(response.listSchedularDoctorTimeSlotDto[0].satAfternoonStart);

				$("#txtAftSatEnd").val(response.listSchedularDoctorTimeSlotDto[0].satAfternoonEnd);
				$("#txtAftFriEnd").val(response.listSchedularDoctorTimeSlotDto[0].friAfternoonEnd);
				$("#txtAftThiEnd").val(response.listSchedularDoctorTimeSlotDto[0].thiAfternoonEnd);
				$("#txtAftWedEnd").val(response.listSchedularDoctorTimeSlotDto[0].wedAfternoonEnd);
				$("#txtAftTueEnd").val(response.listSchedularDoctorTimeSlotDto[0].tueAfternoonEnd);
				$("#txtAftMonEnd").val(response.listSchedularDoctorTimeSlotDto[0].monAfternoonEnd);
				$("#txtAftSunEnd").val(response.listSchedularDoctorTimeSlotDto[0].sunAfternoonEnd);
				
				$("#txtAftSunRoom").val(response.listSchedularDoctorTimeSlotDto[0].sunAfternoonRoom);
				$("#txtAftMonRoom").val(response.listSchedularDoctorTimeSlotDto[0].monAfternoonRoom);
				$("#txtAftTueRoom").val(response.listSchedularDoctorTimeSlotDto[0].tueAfternoonRoom);
				$("#txtAftWedRoom").val(response.listSchedularDoctorTimeSlotDto[0].wedAfternoonRoom);
				$("#txtAftThuRoom").val(response.listSchedularDoctorTimeSlotDto[0].thuAfternoonRoom);
				$("#txtAftFriRoom").val(response.listSchedularDoctorTimeSlotDto[0].friAfternoonRoom);
				$("#txtAftSatRoom").val(response.listSchedularDoctorTimeSlotDto[0].satAfternoonRoom);
				/* /After Noon Slot */
				/* Evening Slot */
				$("#txtEveSunStart").val(response.listSchedularDoctorTimeSlotDto[0].sunEverningStart);
				$("#txtEveMonStart").val(response.listSchedularDoctorTimeSlotDto[0].monEverningStart);
				$("#txtEveTueStart").val(response.listSchedularDoctorTimeSlotDto[0].tueEverningStart);
				$("#txtEveWedStart").val(response.listSchedularDoctorTimeSlotDto[0].wedEverningStart);
				$("#txtEveThiStart").val(response.listSchedularDoctorTimeSlotDto[0].thiEverningStart);
				$("#txtEveFriStart").val(response.listSchedularDoctorTimeSlotDto[0].friEverningStart);
				$("#txtEveSatStart").val(response.listSchedularDoctorTimeSlotDto[0].satEverningStart);

				$("#txtEveSatEnd").val(response.listSchedularDoctorTimeSlotDto[0].satEverningEnd);
				$("#txtEveFriEnd").val(response.listSchedularDoctorTimeSlotDto[0].friEverningEnd);
				$("#txtEveThiEnd").val(response.listSchedularDoctorTimeSlotDto[0].thiEverningEnd);
				$("#txtEveWedEnd").val(response.listSchedularDoctorTimeSlotDto[0].wedEverningEnd);
				$("#txtEveTueEnd").val(response.listSchedularDoctorTimeSlotDto[0].tueEverningEnd);
				$("#txtEveMonEnd").val(response.listSchedularDoctorTimeSlotDto[0].monEverningEnd);
				$("#txtEveSunEnd").val(response.listSchedularDoctorTimeSlotDto[0].sunEverningEnd);
				
				$("#txtEveSunRoom").val(response.listSchedularDoctorTimeSlotDto[0].sunEverningRoom);
				$("#txtEveMonRoom").val(response.listSchedularDoctorTimeSlotDto[0].monEverningRoom);
				$("#txtEveTueRoom").val(response.listSchedularDoctorTimeSlotDto[0].tueEverningRoom);
				$("#txtEveWedRoom").val(response.listSchedularDoctorTimeSlotDto[0].wedEverningRoom);
				$("#txtEveThuRoom").val(response.listSchedularDoctorTimeSlotDto[0].thuEverningRoom);
				$("#txtEveFriRoom").val(response.listSchedularDoctorTimeSlotDto[0].friEverningRoom);
				$("#txtEveSatRoom").val(response.listSchedularDoctorTimeSlotDto[0].satEverningRoom);
			}
		}
	});
}



