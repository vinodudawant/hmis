function setAutoPatientNameOnAppointMent(inputID,patSearchType) {
	
	var resultData = [];
	var callFrom="reg";
	var findingName = $("#" + inputID).val();
	
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
//	var fromYear = $('#year-dropdown').val();
	var fromYear="2022";
	
	var inputs = [];	
	inputs.push('searchText=' + findingName);	
	inputs.push('searchType=' + patSearchType);		
//	inputs.push('callFrom=' + callFrom);	
	//inputs.push('fromYear=' + fromYear);
		
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/scheduler/getSchedularExistingPatientDTOList",
		cache : false,		
		success : function(r) {
			
			var template = "";
			for ( var j = 0; j < r.getSchedularExistingPatientDTOList.length; j++) {
				
				var arrValue = r.getSchedularExistingPatientDTOList[j].patient_id +"-"+r.getSchedularExistingPatientDTOList[j].patient_name +"-"+r.getSchedularExistingPatientDTOList[j].mobile;
				var idValue = r.getSchedularExistingPatientDTOList[j].patient_id;
				var patName = r.getSchedularExistingPatientDTOList[j].patient_name;
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
				//$("#" + inputID).data('typeahead').source = resultData;
				
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var patId = res[0];
		var patName = res[1];
		var patMobile = res[2];
		
		
	
		
	
		
		//$("#" + inputID).val(patName);	
		
		getPatientInfoByPatientId(patId);
			
			
		}			
}

function getPatientInfoByPatientId(patId){
	
	jQuery.ajax({
		async 	: false,
		type 	: "POST",
		data 	: {
		 "ptid" : patId,
 			},
		url 	: "ehat/markvisit/getPatientDetails",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			alert('Error fetching patient information !');
		},
		success : function(r) {
			
			$('#byId').val(" ");
			$('#byMobile').val(" ");
			$('#byName').val("");
			
			$('#byId').val(r.lstMarkVisit[0].ptId);
			$('#byName').val(r.lstMarkVisit[0].fName +" "+r.lstMarkVisit[0].mName+" "+r.lstMarkVisit[0].lName);
			$('#byMobile').val(r.lstMarkVisit[0].mobile);
			
			var ajaxResponse = JSON.stringify(r);
			$("#patientDetails").html(ajaxResponse);
			
		
		}
	});
}



/************
* @author	:Dayanand Khandekar
* @date		: 11-1-2022
* @codeFor	: Get Specialization For dropdown
 ************/
function getSpecializationOnSchedulerAppointment() {
	var unitId=1;
	var userId=1;
	var callFrom="";
	var person = {
        unitId : unitId,
        userId : userId,
        callFrom : callFrom
    }
    $.ajax({
    	async 		: false,
     //   url			: 'ehat/opdconsultant/getSpecialization',
    	url			: 'ehat/register/getSpecialization',
        type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(person),
        contentType	: 'application/json',
        success		: function (r) {
            
        	setSpecializationOnSchedulerAppointment(r,"selHosDeptNew");
        }        
    });
}
/************
* @author	:Dayanand Khandekar
* @date		: 11-1-2022
* @codeFor	: set Specialization For dropdown
 ************/
function setSpecializationOnSchedulerAppointment(r,dropDownId){
	
	var htm = "<option value=0>--Select--</option>";
	for ( var i = 0; i < r.lstSpecialization.length; i++) {

		htm = htm + "<option value="+r.lstSpecialization[i].idhospital_Specialization+">"+r.lstSpecialization[i].specialization_name+"</option>";
	}
	$("#"+dropDownId).html(htm);
	$("#"+dropDownId).select2();
	
	$("#selHosDept").html(htm);
	$("#selHosDept").select2();	
}


/************
* @author	:Dayanand Khandekar
* @date		: 11-1-2022
* @codeFor	: Get Doctor List by specilization Id  For dropdown
 ************/
function getDoctorBySpecializationSchedulerAppointment(callFrom) {
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
        //url			: 'ehat/opdconsultant/getDoctorBySpecialization',
    	  url			: 'ehat/register/getDoctorBySpecialization',
        type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(person),
        contentType	: 'application/json',
        success		: function (r) {
            
        	setDoctorBySpecializationSchedulerAppointment(r,"selDoctorNameNew",callFrom);
        }        
    });
}
/************
* @author	:Dayanand Khandekar
* @date		: 11-1-2022
* @codeFor	: set  doctor list For dropdown
 ************/
function setDoctorBySpecializationSchedulerAppointment(r,dropDownId,callFrom){
	
	
	var htm = "<option value=0>--Select--</option>";
	for ( var i = 0; i < r.lstDoctorBySpecialization.length; i++) {

		htm = htm + "<option value="+r.lstDoctorBySpecialization[i].doctor_id+">"+r.lstDoctorBySpecialization[i].doc_name+"</option>";
	}

	$("#"+dropDownId).html(htm);
	//$("#"+dropDownId).select2();
	
}


function getSpecializationOnTodaysAppointment(){

	var unitId=1;
	var userId=1;
	var callFrom="";
	var person = {
        unitId : unitId,
        userId : userId,
        callFrom : callFrom
    }
    $.ajax({
    	async 		: false,
      //  url			: 'ehat/opdconsultant/getSpecialization',
    	url			: 'ehat/register/getSpecialization',
        type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(person),
        contentType	: 'application/json',
        success		: function (r) {
            
        	setSpecializationOnTodaysAppointment(r,"selHosDept");
        }        
    });

	
}


/************
* @author	:Dayanand Khandekar
* @date		: 11-1-2022
* @codeFor	: set Specialization For dropdown
 ************/
function setSpecializationOnTodaysAppointment(r,dropDownId){
	
	var htm = "<option value=0>--Select--</option>";
	for ( var i = 0; i < r.lstSpecialization.length; i++) {

		htm = htm + "<option value="+r.lstSpecialization[i].idhospital_Specialization+">"+r.lstSpecialization[i].specialization_name+"</option>";
	}
	$("#"+dropDownId).html(htm);
	//$("#"+dropDownId).select2();
	
	
}


/************
* @author	:Dayanand Khandekar
* @date		: 11-1-2022
* @codeFor	: Get Doctor List by specilization Id  For dropdown
 ************/
function getDoctorBySpecializationTodayAppointment(callFrom) {
	var unitId=1;
	var userId=1;
	var callFrom="";
	var doctorId = 0;

		doctorId = $("#selHosDept").val();
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
       // url			: 'ehat/opdconsultant/getDoctorBySpecialization',
    	  url			: 'ehat/register/getDoctorBySpecialization',
        type		: 'post',
        dataType	: 'json',
        data		: JSON.stringify(person),
        contentType	: 'application/json',
        success		: function (r) {
            
        	setDoctorBySpecializationTodayAppointment(r,"selDoctorName",callFrom);
        }        
    });
}
/************
* @author	:Dayanand Khandekar
* @date		: 11-1-2022
* @codeFor	: set  doctor list For dropdown
 ************/
function setDoctorBySpecializationTodayAppointment(r,dropDownId,callFrom){
	
	
	var htm = "<option value=0>--Select--</option>";
	for ( var i = 0; i < r.lstDoctorBySpecialization.length; i++) {

		htm = htm + "<option value="+r.lstDoctorBySpecialization[i].doctor_id+">"+r.lstDoctorBySpecialization[i].doc_name+"</option>";
	}

	$("#"+dropDownId).html(htm);
	$("#"+dropDownId).select2();
	
}


//Fetch Start and End Time from doctor
function getDoctorTimeListNew(callFrom) {
	var appointmentDate;
	var doctorId;
	var arrDate;
	if (callFrom == "New") {
		appointmentDate = $("#idNewAppointment").val();
		arrDate = ($("#idNewAppointment").val()).split("/");
		doctorId = $("#selDoctorNameNew").val();
		var specializationId = $('#selHosDeptNew').val();
	} else {
		appointmentDate = $("#idTourDateDetails").val();
		arrDate = ($("#idTourDateDetails").val()).split("/");
		doctorId = $("#selDoctorName").val();
		var specializationId = $('#selHosDeptNew').val();
	}
	if (appointmentDate == null || appointmentDate == undefined
			|| appointmentDate == "") {
		alert("Please Select Date");
		if (callFrom == "New") {
			$("#selDoctorNameNew").val(0);
		} else {
			$("#selDoctorName").val(0);
		}
		return false;
	}

	var morningStartTime;
	var morningEndTime;
	var afterNoonStartTime;
	var afterNoonEndTime;
	var eveningStartTime;
	var eveningEndTime;
	var morningDuration;
	var afterNoonDuration;
	var eveningDuration;

	var morning;
	var afterNoon;
	var evening;
	var oneTime;

	var date = new Date(arrDate[1] + "/" + arrDate[0] + "/" + arrDate[2]);
	var day = date.getDay();
	
	if ((appointmentDate != "" || appointmentDate != null)
			|| (doctorId != "" || doctorId != null || doctorId != 0)) {
	
		
		
		if (doctorId == 0) {
			alert("Please Select Doctor Name First");
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!

			var yyyy = today.getFullYear();
			if(dd<10){
			    dd='0'+dd
			} 
			if(mm<10){
			    mm='0'+mm
			} 
			var today = dd+'/'+mm+'/'+yyyy;
		
			if (callFrom == "New") {
				$("#idNewAppointment").val(today);
			}else {
				$("#idTourDateDetails").val(today);
			}
			return false;
		}
		
	var inputs = [];
	inputs.push('action=getDoctorTimeList');
	if (callFrom == "New") {
		inputs.push('doctorId=' + $("#selDoctorNameNew").val());
	} else {
		inputs.push('doctorId=' + $("#selDoctorName").val());
	}
	inputs.push('appointmentDate=' + appointmentDate);
	inputs.push('pageName=Appointment');
	inputs.push('specializationId=' + specializationId);
	
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/scheduler/getDoctorTimeSlotDetailsFromDoc",
				//url : "AppointmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					var ajaxResponse = JSON.stringify(r);
				
					if(r.listSchedularDoctorTimeSlotDto.length=='0' || r.listSchedularDoctorTimeSlotDto[0].color=='null'  || r.listSchedularDoctorTimeSlotDto==undefined){ 
						if (callFrom == "New") {
							$('#selDoctorTimeNew').empty();
							$('#selDoctorTimeNew').append(
									$('<option>').text('-Select-').val("0"));
							for ( var i = 0; i < timeSlots.length; i++) {
								$('#selDoctorTimeNew').append(
										$('<option>').text(timeSlots[i]).val(
												valueTimeSlots[i]));
							}
						} else {
							$('#selDoctorTime').empty();
							$('#selDoctorTime').append(
									$('<option>').text('-Select-').val("0"));
							for ( var j = 0; j <= timeSlots.length; j++) {
								$('#selDoctorTime').append(
										$('<option>').text(timeSlots[j]).val(
												valueTimeSlots[j]));
							}
						}
						if (undefined != pobj1.color) {
							$("#color").val(pobj1.color);
							$("#eventsAppointment").val(pobj1.color);
							$("#eventsAppointment").css("background-color",
									pobj1.color);
						}
				}
					else {
						$("#color").val(r.listSchedularDoctorTimeSlotDto[0].color);
						$("#eventsAppointment").val(r.listSchedularDoctorTimeSlotDto[0].color);
						$("#eventsAppointment").css("background-color", r.listSchedularDoctorTimeSlotDto[0].color);
						//alert(ajaxResponse);
						$("#DocNotAvailable").html(ajaxResponse);
						
						var pobj1 = eval('(' + ajaxResponse + ')');
						if ( r.listSchedularDoctorTimeSlotDto.length > 0) {
						if (day == 1) {
							morningStartTime = r.listSchedularDoctorTimeSlotDto[0].monMorningStart;
							morningEndTime = r.listSchedularDoctorTimeSlotDto[0].monMorningEnd;
							morningDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

							afterNoonStartTime = r.listSchedularDoctorTimeSlotDto[0].monAfternoonStart;
							afterNoonEndTime = r.listSchedularDoctorTimeSlotDto[0].monAfternoonEnd;
							afterNoonDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

							eveningStartTime = r.listSchedularDoctorTimeSlotDto[0].monEverningStart;
							eveningEndTime = r.listSchedularDoctorTimeSlotDto[0].monEverningEnd;
							eveningDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

						} else if (day == 2) {
							morningStartTime = r.listSchedularDoctorTimeSlotDto[0].tueMorningStart;
							morningEndTime = r.listSchedularDoctorTimeSlotDto[0].tueMorningEnd;
							morningDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

							afterNoonStartTime = r.listSchedularDoctorTimeSlotDto[0].tueAfternoonStart;
							afterNoonEndTime = r.listSchedularDoctorTimeSlotDto[0].tueAfternoonEnd;
							afterNoonDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

							eveningStartTime = r.listSchedularDoctorTimeSlotDto[0].tueEverningStart;
							eveningEndTime = r.listSchedularDoctorTimeSlotDto[0].tueEverningEnd;
							eveningDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

						} else if (day == 3) {
							morningStartTime = r.listSchedularDoctorTimeSlotDto[0].wedMorningStart;
							morningEndTime = r.listSchedularDoctorTimeSlotDto[0].wedMorningEnd;
							morningDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

							afterNoonStartTime = r.listSchedularDoctorTimeSlotDto[0].wedAfternoonStart;
							afterNoonEndTime = r.listSchedularDoctorTimeSlotDto[0].wedAfternoonEnd;
							afterNoonDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

							eveningStartTime = r.listSchedularDoctorTimeSlotDto[0].wedEverningStart;
							eveningEndTime = r.listSchedularDoctorTimeSlotDto[0].wedEverningEnd;
							eveningDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

						} else if (day == 4) {
							morningStartTime = r.listSchedularDoctorTimeSlotDto[0].thiMorningStart;
							morningEndTime = r.listSchedularDoctorTimeSlotDto[0].thiMorningEnd;
							morningDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

							afterNoonStartTime = r.listSchedularDoctorTimeSlotDto[0].thiAfternoonStart;
							afterNoonEndTime = r.listSchedularDoctorTimeSlotDto[0].thiAfternoonEnd;
							afterNoonDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

							eveningStartTime = r.listSchedularDoctorTimeSlotDto[0].thiEverningStart;
							eveningEndTime = r.listSchedularDoctorTimeSlotDto[0].thiEverningEnd;
							eveningDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

						} else if (day == 5) {
							morningStartTime = r.listSchedularDoctorTimeSlotDto[0].friMorningStart;
							morningEndTime = r.listSchedularDoctorTimeSlotDto[0].friMorningEnd;
							morningDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

							afterNoonStartTime = r.listSchedularDoctorTimeSlotDto[0].friAfternoonStart;
							afterNoonEndTime = r.listSchedularDoctorTimeSlotDto[0].friAfternoonEnd;
							afterNoonDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

							eveningStartTime = r.listSchedularDoctorTimeSlotDto[0].friEverningStart;
							eveningEndTime = r.listSchedularDoctorTimeSlotDto[0].friEverningEnd;
							eveningDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

						} else if (day == 6) {
							morningStartTime = r.listSchedularDoctorTimeSlotDto[0].satMorningStart;
							morningEndTime = r.listSchedularDoctorTimeSlotDto[0].satMorningEnd;
							morningDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

							afterNoonStartTime = r.listSchedularDoctorTimeSlotDto[0].satAfternoonStart;
							afterNoonEndTime = r.listSchedularDoctorTimeSlotDto[0].satAfternoonEnd;
							afterNoonDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

							eveningStartTime = r.listSchedularDoctorTimeSlotDto[0].satEverningStart;
							eveningEndTime = r.listSchedularDoctorTimeSlotDto[0].satEverningEnd;
							eveningDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

						} else if (day == 0) {
							morningStartTime = r.listSchedularDoctorTimeSlotDto[0].sunMorningStart;
							morningEndTime = r.listSchedularDoctorTimeSlotDto[0].sunMorningEnd;
							morningDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

							afterNoonStartTime = r.listSchedularDoctorTimeSlotDto[0].sunAfternoonStart;
							afterNoonEndTime = r.listSchedularDoctorTimeSlotDto[0].sunAfternoonEnd;
							afterNoonDuration = r.listSchedularDoctorTimeSlotDto[0].duration;

							eveningStartTime = r.listSchedularDoctorTimeSlotDto[0].sunEverningStart;
							eveningEndTime = r.listSchedularDoctorTimeSlotDto[0].sunEverningEnd;
							eveningDuration = r.listSchedularDoctorTimeSlotDto[0].duration;
						}

						var timeSlots = [];
						var slotDuration = [];
						var valueTimeSlots = [];
						if (morningStartTime != null
								&& morningStartTime != morningEndTime) {
							morning = "Morning " + morningStartTime + "-"
									+ morningEndTime;
							timeSlots.push(morning);
							slotDuration.push(morningDuration);
							valueTimeSlots.push(morningStartTime + "-"
									+ morningEndTime + "-" + morningDuration);
						}
						if (afterNoonStartTime != null
								&& afterNoonStartTime != afterNoonEndTime) {
							afterNoon = "Afternoon " + afterNoonStartTime + "-"
									+ afterNoonEndTime;
							timeSlots.push(afterNoon);
							slotDuration.push(afterNoonDuration);
							valueTimeSlots.push(afterNoonStartTime + "-"
									+ afterNoonEndTime + "-" + afterNoonDuration);
						}

						if (eveningStartTime != null
								&& eveningStartTime != eveningEndTime) {
							evening = "Evening " + eveningStartTime + "-"
									+ eveningEndTime;
							timeSlots.push(evening);
							slotDuration.push(eveningDuration);
							valueTimeSlots.push(eveningStartTime + "-"
									+ eveningEndTime + "-" + eveningDuration);
						}
						//alert("hii");
							if(r.listForDoctorAvailable.length > 0){
							var Duration = pobj1.duration;
							var oneTimeStartTime;
							var oneTimeEndTime;
							for(var z = 0; z < r.listForDoctorAvailable.length; z++){
								oneTimeStartTime = r.listForDoctorAvailable[z].ftime;
								oneTimeEndTime = r.listForDoctorAvailable[z].ttime;
								if (oneTimeStartTime != null
										&& oneTimeStartTime != oneTimeEndTime) {
									oneTime = "One-Time " + oneTimeStartTime + "-"
											+ oneTimeEndTime;
									timeSlots.push(oneTime);
									slotDuration.push(Duration);
									valueTimeSlots.push(oneTimeStartTime + "-"
											+ oneTimeEndTime + "-" + Duration);
								}
							}
						}
						
						if (callFrom == "New") {
							$('#selDoctorTimeNew').empty();
							$('#selDoctorTimeNew').append(
									$('<option>').text('-Select-').val("0"));
							for ( var i = 0; i < timeSlots.length; i++) {
								$('#selDoctorTimeNew').append(
										$('<option>').text(timeSlots[i]).val(
												valueTimeSlots[i]));
							}
						} else {
							$('#selDoctorTime').empty();
							$('#selDoctorTime').append(
									$('<option>').text('-Select-').val("0"));
							for ( var j = 0; j < timeSlots.length; j++) {
								$('#selDoctorTime').append(
										$('<option>').text(timeSlots[j]).val(
												valueTimeSlots[j]));
							}
						}
						if (undefined != pobj1.color) {
							$("#color").val(pobj1.color);
							$("#eventsAppointment").val(pobj1.color);
							$("#eventsAppointment").css("background-color",
									pobj1.color);
						}
						
					}	
						
					}

					}
			});
	fetchFollowUpNew(callFrom);
	getAppointedListOfPatientNew(callFrom);
	
	}
}





//Show availbe doctors appontment
function showDoctorAppointmentsNew(callFrom) {

	var appointmentType = $("#appointmentType").val();
	
	var color = $("#color").val();
	
	


	if (callFrom == "calender1") {
		var doctorId;
		var doctorTim;
		// var now = new Date();
		var date = new Date();
		var now = new Date((date.getMonth() + 1) + '/' + date.getDate() + '/'
				+ date.getFullYear());
		var startTime;
		var endTime;
		var cuurentHours;
		now.setHours(0, 0, 0, 0);
		var selectedDate;
		var appDate;
		var arrAppDate;
		var startTime;
		var endTime;
		var duration;
		if (appointmentType == "New") {
			doctorId = $("#selDoctorNameNew").val();
			doctorTime = ($("#selDoctorTimeNew").val()).split("-");
			// now = new Date();
			startTime = parseInt(doctorTime[0]);// parseInt($("#startTime").val());
			endTime = parseInt(doctorTime[1]);// parseInt($("#endTime").val());
			cuurentHours = parseInt(now.getHours());
			now.setHours(0, 0, 0, 0);

			var arrSceduleDate = ($("#idNewAppointment").val()).split("/");
			selectedDate = new Date(arrSceduleDate[1] + "/" + arrSceduleDate[0]
					+ "/" + arrSceduleDate[2]);

			if ((selectedDate < now)) {
				alert('Appointment not availables for previous date,please select another date');
				return false;
			} else if (((startTime >= cuurentHours) && (endTime > cuurentHours))
					|| (selectedDate > now)) {
			}
			appDate = $("#idNewAppointment").val();
			arrAppDate = appDate.split("/");
			startTime = parseInt(doctorTime[0]);
			endTime = parseInt(doctorTime[1]);
			duration = parseInt(doctorTime[2]);

			var events = new Array();
			
			//for doctor not available
			//@Code-By = Kavita Bhangale Date= 25/10/2016
			var na = $("#DocNotAvailable").html();
			
			
			
			na = eval('(' + na + ')');
			
			
			
			if (na.listDoctorNA.length > 0) {
				for ( var j = 0; j < na.listDoctorNA.length; j++) {
					
					var NAReason = 'Doctor Not Available' + ' --- (' + na.liNA[j].nte + ')';
					var arrTempDate = (na.liNA[j].date).split("/");
					var appStartDate = arrTempDate[2] + "-" + arrTempDate[1]
							+ "-" + arrTempDate[0];

					event = new Object();
					event.title = NAReason;
					event.start = appStartDate + "T" + na.liNA[j].ftime;
					event.end = appStartDate + "T" + na.liNA[j].ttime; 
					event.backgroundColor = Theme.colors.blue;
					event.color = Theme.colors.blue;
					event.allDay = false;
					events.push(event);
				}
			}
			//Kavita code End

			var r = $("#divAppo").html();
			r = eval('(' + r + ')');
			
          
			 
			
			//alert(na.listDoctorNA.length);

			for ( var i = 0; i < r.listAppointmet.length; i++) {
				if (r.listAppointmet[i].doctorId == doctorId) {
					var appStartTime = r.listAppointmet[i].apptTimeFrom;
					var patientName;
					patientName = r.listAppointmet[i].title + r.listAppointmet[i].patientName + ' '
							+ r.listAppointmet[i].lastName;
					var appTimeStart;
					var tempTime;
					if (appStartTime % 1 != 0) {
						var arrAppStartTime = appStartTime.toString()
								.split('.');
						if (arrAppStartTime[0] < 10) {
							tempTime = "0" + arrAppStartTime[0];
						} else {
							tempTime = arrAppStartTime[0];
						}
						appTimeStart = tempTime;
					} else {
						if (appStartTime < 10) {
							tempTime = "0" + appStartTime;
						} else {
							tempTime = appStartTime;
						}
						appTimeStart = tempTime;
					}
					var appTimeEnd = addMinutes(appTimeStart, duration);
					//var arrTempDate = (r.listAppointmet[i].apptDate).split("/");
					var dateF= new Date(r.listAppointmet[i].apptDate).toLocaleDateString('en-GB');
					var arrTempDate=dateF.split("/");
					var appStartDate = arrTempDate[2] + "-" + arrTempDate[1]
							+ "-" + arrTempDate[0];
					// var appStartDate = r.liapp[i].appdt;

					event = new Object();
					event.title = patientName;
					event.start = appStartDate + "T" + appTimeStart;// its a
					// date //
					// string
					event.end = appStartDate + "T" + appTimeEnd; // its a
					// date //
					// string.
					if (color == "yellow") {
						event.backgroundColor = Theme.colors.yellow;
						event.color = Theme.colors.yellow;
					} else if (color == "red") {
						event.backgroundColor = Theme.colors.red;
						event.color = Theme.colors.red;
					} else if (color == "orange") {
						event.backgroundColor = Theme.colors.orange;
						event.color = Theme.colors.orange;
					} else if (color == "pink") {
						event.backgroundColor = Theme.colors.pink;
						event.color = Theme.colors.pink;
					} else if (color == "green") {
						event.backgroundColor = Theme.colors.green;
						event.color = Theme.colors.green;
					}

					event.allDay = false; //
					events.push(event);
				}
			}

			$('#calendar1').html("");
			$('#calendar1')
					.fullCalendar(
							{
								header : {
									left : '',
									center : 'title',
									right : '',
									allDaySlot : false,
								},
								allDaySlot : !0,
								allDayText : "all-day",
								firstHour : startTime,
								slotMinutes : duration,
								defaultEventMinutes : 120,
								axisFormat : "h(:mm)tt",
								timeFormat : {
									agenda : "h:mm{ - h:mm}"
								},
								dragOpacity : {
									agenda : .5
								},
								minTime : startTime,
								maxTime : endTime,
								slotEventOverlap : !0,
								selectable : true,
								selectHelper : true,
								select : function(start, end, allDay) {

									$("#appDateTime").val(start);
									$("#appEndTime").val(end);

									if ($("#appDateTime").val(start) != $(
											"#appEndTime").val(end)) {
										var r = confirm("Do you want to schedule appoinment?");
										if (r == true) {
											scheduleAppointmentOfPatientNew('New');
										}
									}
									$(".popup").show();
									$(".title").focus();
									$(".submitFrom").click(
											function() {

												var title = $(
														"#selDoctorNameNew")
														.text();

												if (title) {

													calendar.fullCalendar(
															'renderEvent', {
																title : title,
																start : start,
																end : end,
																allDay : allDay
															}, true // make the
													// event
													// "stick"
													);
												}
												$(".popup").hide();
											});

									$(".exit").click(function() {
										// clear all info, unselect events
										// and...
										$(".popup").hide();
									});

									// calendar.fullCalendar('unselect');

								},
								// editable : true//,
								droppable : true
							});
			$('#calendar1').fullCalendar('gotoDate', arrAppDate[2],
					(arrAppDate[1] - 1), arrAppDate[0]);
			$('#calendar1').fullCalendar('addEventSource', events);
		} else {
			doctorId = $("#selDoctorNameNew").val();
			doctorTime = ($("#selDoctorTimeNew").val()).split("-");
			// var now = new Date();
			var date = new Date();
			var now = new Date((date.getMonth() + 1) + '/' + date.getDate()
					+ '/' + date.getFullYear());
			startTime = parseInt(doctorTime[0]);// parseInt($("#startTime").val());
			endTime = parseInt(doctorTime[1]);// parseInt($("#endTime").val());
			cuurentHours = parseInt(now.getHours());
			now.setHours(0, 0, 0, 0);
			var arrSceduleDate = ($("#idNewAppointment").val()).split("/");
			selectedDate = new Date(arrSceduleDate[1] + "/" + arrSceduleDate[0]
					+ "/" + arrSceduleDate[2]);
			if ((selectedDate < now)) {
				alert('Appointment not availables for previous date,please select another date');
				return false;
			} else if (((startTime >= cuurentHours) && (endTime > cuurentHours))
					|| (selectedDate > now)) {
			}
			appDate = $("#idNewAppointment").val();
			arrAppDate = appDate.split("/");
			startTime = parseInt(doctorTime[0]);
			endTime = parseInt(doctorTime[1]);
			duration = parseInt(doctorTime[2]);
			
			var events = new Array();
			
			//for doctor not available
			//@Code-By = Kavita Bhangale Date= 25/10/2016
			var na = $("#DocNotAvailable").html();
			na = eval('(' + na + ')');
			
			
			if (na.listDoctorNA.length > 0) {
				for ( var j = 0; j < na.listDoctorNA.length; j++) {
					
					var NAReason = 'Doctor Not Available' + ' --- (' + na.liNA[j].nte + ')';
					var arrTempDate = (na.listDoctorNA[j].date).split("/");
					var appStartDate = arrTempDate[2] + "-" + arrTempDate[1]
							+ "-" + arrTempDate[0];

					event = new Object();
					event.title = NAReason;
					event.start = appStartDate + "T" + na.liNA[j].ftime;
					event.end = appStartDate + "T" + na.liNA[j].ttime; 
					event.backgroundColor = Theme.colors.blue;
					event.color = Theme.colors.blue;
					event.allDay = false;
					events.push(event);
				}
			}
			//Kavita code End

			var r = $("#divAppo").html();
			r = eval('(' + r + ')');

			for ( var i = 0; i < r.listAppointmet.length; i++) {
				if (r.listAppointmet[i].doctorId == doctorId) {
					var appStartTime = r.listAppointmet[i].apptTimeFrom;
					var patientName;
					patientName = r.listAppointmet[i].title + r.listAppointmet[i].patientName + ' '
					+ r.listAppointmet[i].lastName;

					var appTimeStart;
					var tempTime;
					if (appStartTime % 1 != 0) {
						var arrAppStartTime = appStartTime.toString()
								.split('.');
						if (arrAppStartTime[0] < 10) {
							tempTime = "0" + arrAppStartTime[0];
						} else {
							tempTime = arrAppStartTime[0];
						}
						appTimeStart = tempTime;
					} else {
						if (appStartTime < 10) {
							tempTime = "0" + appStartTime;
						} else {
							tempTime = appStartTime;
						}
						appTimeStart = tempTime;
					}
					var appTimeEnd = addMinutes(appTimeStart, duration);
					//var arrTempDate = (r.listAppointmet[i].appdt).split("/");
					var dateF= new Date(r.listAppointmet[i].apptDate).toLocaleDateString('en-GB');
					var arrTempDate=dateF.split("/");
					
					var appStartDate = arrTempDate[2] + "-" + arrTempDate[1]
							+ "-" + arrTempDate[0];
					// var appStartDate = r.liapp[i].appdt;
					event = new Object();
					event.title = patientName;
					event.start = appStartDate + "T" + appTimeStart;// its a
					// date //
					// string
					event.end = appStartDate + "T" + appTimeEnd; // its a
					// date //
					// string.
					if (color == "yellow") {
						event.backgroundColor = Theme.colors.yellow;
						event.color = Theme.colors.yellow;
					} else if (color == "red") {
						event.backgroundColor = Theme.colors.red;
						event.color = Theme.colors.red;
					} else if (color == "orange") {
						event.backgroundColor = Theme.colors.orange;
						event.color = Theme.colors.orange;
					} else if (color == "pink") {
						event.backgroundColor = Theme.colors.pink;
						event.color = Theme.colors.pink;
					} else if (color == "green") {
						event.backgroundColor = Theme.colors.green;
						event.color = Theme.colors.green;
					}

					event.allDay = false; //
					events.push(event);
				}
			}

			$('#calendar1').html("");
			$('#calendar1')
					.fullCalendar(
							{
								header : {
									left : '',
									center : 'title',
									right : '',
									allDaySlot : false,
									
								},
								allDaySlot : !0,
								allDayText : "all-day",
								firstHour : startTime,
								slotMinutes : duration,
								defaultEventMinutes : 120,
								axisFormat : "h(:mm)tt",
								timeFormat : {
									agenda : "h:mm{ - h:mm}"
								},
								dragOpacity : {
									agenda : .5
								},
								minTime : startTime,
								maxTime : endTime,
								slotEventOverlap : !0,
								selectable : true,
								selectHelper : true,
								select : function(start, end, allDay) {

									if ($("#patientDetails").html() == ""
											|| $("#patientDetails").html() == null) {
										if ($("#appointmentType").val() != "New") {
											alert("Select Patient33");
											return false;
										}
									}

									$("#appDateTime").val(start);
									$("#appEndTime").val(end);

									var r = confirm("Do you want to schedule appoinment?");
									if (r == true) {
										scheduleAppointmentOfPatientNew();
									}

									// $(".popup").show();
									$(".title").focus();
									$(".submitFrom").click(
											function() {

												var title = $(
														"#selDoctorNameNew")
														.text();

												if (title) {

													calendar.fullCalendar(
															'renderEvent', {
																title : title,
																start : start,
																end : end,
																allDay : allDay
															}, true // make the
													// event
													// "stick"
													);
												}
												$(".popup").hide();
											});

									$(".exit").click(function() {
										// clear all info, unselect events
										// and...
										$(".popup").hide();
									});

									// calendar.fullCalendar('unselect');
								},
								// editable : true//,
								droppable : true
							});
			$('#calendar1').fullCalendar('gotoDate', arrAppDate[2],
					(arrAppDate[1] - 1), arrAppDate[0]);
			$('#calendar1').fullCalendar('addEventSource', events);
		}

	} else {
		//alert("else");

		var doctorId = $("#selDoctorName").val();
		var doctorTime = ($("#selDoctorTime").val()).split("-");
		// var now = new Date();
		var date = new Date();
		var now = new Date((date.getMonth() + 1) + '/' + date.getDate() + '/'
				+ date.getFullYear());

		var startTime = parseInt(doctorTime[0]);// parseInt($("#startTime").val());
		var endTime = parseInt(doctorTime[1]);// parseInt($("#endTime").val());
		var cuurentHours = parseInt(now.getHours());
		now.setHours(0, 0, 0, 0);

		var arrSceduleDate = ($("#idTourDateDetails").val()).split("/");
		selectedDate = new Date(arrSceduleDate[1] + "/" + arrSceduleDate[0]
				+ "/" + arrSceduleDate[2]);

		if ((selectedDate < now)) {
			alert('Appointment not availables for previous date,please select another date');
			return false;
		} else if (((startTime >= cuurentHours) && (endTime > cuurentHours))
				|| (selectedDate > now)) {

		}
		var appDate = $("#idTourDateDetails").val();
		var arrAppDate = appDate.split("/");
		var startTime = parseInt(doctorTime[0]);
		var endTime = parseInt(doctorTime[1]);
		var duration = parseInt(doctorTime[2]);

		var r = $("#divAppo").html();
		//alert(r);
		r = eval('(' + r + ')');
		
		var na = $("#DocNotAvailable").html();
		//alert(na);
		na = eval('(' + na + ')');

		var events = new Array();
		var events1 = [];
		
		//for doctor not available
		//@Code-By = Kavita Bhangale Date= 25/10/2016
		if (na.listDoctorNA.length > 0) {
			for ( var j = 0; j < na.listDoctorNA.length; j++) {
				
				// dateCompare function returns 1 if greater, -1 if less and 0 if the same
				//var checkStartTime = dateCompare(nAstartTime, doctorTime[0]);
				//var checkEndTime = dateCompare(nAendTime, doctorTime[1]);
				
				var NAReason = 'Doctor Not Available' + ' --- (' + na.liNA[j].nte + ')';
				var arrTempDate = (na.listDoctorNA[j].date).split("/");
				var appStartDate = arrTempDate[2] + "-" + arrTempDate[1]
						+ "-" + arrTempDate[0];

				event = new Object();
				event.title = NAReason;
				event.start = appStartDate + "T" + na.liNA[j].ftime;
				event.end = appStartDate + "T" + na.liNA[j].ttime; 
				event.backgroundColor = Theme.colors.blue;
				event.color = Theme.colors.blue;
				event.allDay = false;
				events1.push(event);
				events.push(event);
			}
		}
		//Kavita code End
		
		
		
		//for appointments scheduled
		for ( var i = 0; i < r.listAppointmet.length; i++) {
			if (r.listAppointmet[i].doctorId == doctorId) {
				var appStartTime = r.listAppointmet[i].apptTimeFrom;
				var patientName;
				patientName = r.listAppointmet[i].title + r.listAppointmet[i].patientName  + ' '
						+ r.listAppointmet[i].lastName;;
				var appTimeStart;
				var tempTime;
				if (appStartTime % 1 != 0) {
					var arrAppStartTime = appStartTime.toString().split('.');
					if (arrAppStartTime[0] < 10) {
						tempTime = "0" + arrAppStartTime[0];
					} else {
						tempTime = arrAppStartTime[0];
					}
					appTimeStart = tempTime;
				} else {
					if (appStartTime < 10) {
						tempTime = "0" + appStartTime;
					} else {
						tempTime = appStartTime;
					}
					appTimeStart = tempTime;
				}
				var appTimeEnd = addMinutes(appTimeStart, duration);
				/*var arrTempDate = (r.listAppointmet[i].apptDate).split("/");
				var appStartDate = arrTempDate[2] + "-" + arrTempDate[1] + "-"
						+ arrTempDate[0];*/
				
				
				var dateF= new Date(r.listAppointmet[i].apptDate).toLocaleDateString('en-GB');
				var arrTempDate=dateF.split("/");
				
				
				//var arrTempDate = dateApp.split("-");
				var appStartDate = arrTempDate[2] + "-" + arrTempDate[1] + "-"
						+ arrTempDate[0];
				

				event = new Object();
				event.title = patientName;
				event.start = appStartDate + "T" + appTimeStart;// its a date //
				// string
				event.end = appStartDate + "T" + appTimeEnd; // its a date //
				// string.
				if (color == "yellow") {
					event.backgroundColor = Theme.colors.yellow;
					event.color = Theme.colors.yellow;
				} else if (color == "red") {
					event.backgroundColor = Theme.colors.red;
					event.color = Theme.colors.red;
				} else if (color == "orange") {
					event.backgroundColor = Theme.colors.orange;
					event.color = Theme.colors.orange;
				} else if (color == "pink") {
					event.backgroundColor = Theme.colors.pink;
					event.color = Theme.colors.pink;
				} else if (color == "green") {
					event.backgroundColor = Theme.colors.green;
					event.color = Theme.colors.green;
				}

				event.allDay = false;
				event.editable = true;
				events1.push(event);
				events.push(event);
			}
		}
		$('#calendar').html("");
		$('#calendar').fullCalendar(
				{
					header : {
						left : '',
						center : 'title',
						right : '',
						allDaySlot : false,
					},
					allDaySlot : !0,
					allDayText : "all-day",
					firstHour : startTime,
					slotMinutes : duration,
					defaultEventMinutes : 120,
					axisFormat : "h(:mm)tt",
					timeFormat : {
						agenda : "h:mm{ - h:mm}"
					},
					dragOpacity : {
						agenda : .5
					},
					minTime : startTime,
					maxTime : endTime,
					slotEventOverlap : !0,
					selectable : true,
					selectHelper : true,
					select : function(start, end, allDay) {
						
						if ($("#patientDetails").html() == ""
								|| $("#patientDetails").html() == null) {
							if ($("#appointmentType").val() != "New" && $("#appointmentType").val() != "ReSchedule") {
								alert("Select Patient11");
								return false;
							}
						}
						$("#appDateTime").val(start);
						$("#appEndTime").val(end);
						// var title = prompt('Event Title:');
						$(".popup").show();
						
						$(".title").focus();
						$(".submitFrom").click(function() {
							var title = $("#selDoctorName").text();
							if (title) {

								calendar.fullCalendar('renderEvent', {
									title : title,
									start : start,
									end : end,
									allDay : allDay
								}, true // make the event "stick"
								);
							}
							$(".popup").hide();
						});
						$(".exit").click(function() {
							// clear all info, unselect events and...
							$(".popup").hide();
						});

						// calendar.fullCalendar('unselect');
					},
					// editable : true//,
					droppable : true
				});
		$('#calendar').fullCalendar('gotoDate', arrAppDate[2],
				(arrAppDate[1] - 1), arrAppDate[0]);
		$('#calendar').fullCalendar('addEventSource', events);
	}
}


//for Fetch list of exsting pationt details
function getAppointedListOfPatientNew(callFrom) {
	
	/*var consultantObj;
	
	var inputs = [];
	inputs.push('date=onload');
	inputs.push('docType=All');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/scheduler/getAllDoctorList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = JSON.stringify(r);
			//alert(JSON.stringify(r));
			consultantObj = eval('(' + ajaxResponse + ')');
			
		}
	});*/

	var appointmentDate;
	var actionType;
	if (callFrom == "New") {
		appointmentDate = $("#idNewAppointment").val();
		} else {
		appointmentDate = $("#idTourDateDetails").val();
	}
	
	//added new code
var newDate=appointmentDate.split("/");
	
	var newDate=newDate[2]+"-"+newDate[1]+"-"+newDate[0];
	var inputs = [];
	inputs.push('action=FetchQueue');
	inputs.push('txtAppoDate=' + encodeURIComponent(newDate));
	
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/scheduler/fetchList",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
				},
				success : function(r) {
					var ajaxResponse = JSON.stringify(r);
					
				
					
					var html = '';
					
					$("#divAppo").html(ajaxResponse);

					var date = $("#idTourDateDetails").val();
					var existingPatientTemplate = '<tbody>{#foreach $T.liapp as liapp}{#if $T.liapp.aptyId=="Existing"}{#if $T.liapp.appdt=="'
							+ date
							+ '"}<tr class="gradeX" id="existing{$T.liapp.apid}"><td>{$T.liapp.title}{$T.liapp.patNm} {$T.liapp.lastName}<br /><div class="divide-10"></div><button class="btn btn-xs btn-primary"	type="submit" data-toggle="modal" data-target="" onclick="setExistingAppointmentType(),changeAppointmentOfPatientNew({$T.liapp.apid})" >change</button><td>{ $T.liapp.docNm}<br />	<div class="divide-10"></div>	<button class="btn btn-xs btn-danger"	type="submit" data-toggle="modal"	data-target="" onclick="cancelAppointmentNew({ $T.liapp.apid})">cancel</button></td><td class="center">{ $T.liapp.appdt}</br>{ $T.liapp.aptf}<br />	<div class="divide-10"></div>	<button class="btn btn-xs btn-success"	onclick="registerPatient({$T.liapp.apid},\'mark\')" data-toggle="modal"	data-target="#MarkPatient">Mark Visit</button></td></td></tr>{#/if}{#/if}{#/for} <tbody>';
					//$("#existingPatientList").setTemplate(existingPatientTemplate);
					//$("#existingPatientList").processTemplate(r);

					var newPatientTemplate1 = '<tbody>{#foreach $T.liapp as liapp}{#if $T.liapp.aptyId=="New"}{#if $T.liapp.patid=="0"}{#if $T.liapp.appdt=="'
							+ date
							+ '"}<tr class="gradeX" id="new{$T.liapp.apid}"><td>{$T.liapp.title}{$T.liapp.patNm} {$T.liapp.lastName}<br /><div class="divide-10"></div><button class="btn btn-xs btn-primary"	type="submit" data-toggle="modal" data-target="" onclick="changeAppointmentOfNewPatientNew({$T.liapp.apid})" >change</button><td>{ $T.liapp.docNm}<br /><div class="divide-10"></div>	<button class="btn btn-xs btn-danger"	type="submit" data-toggle="modal"	data-target="" onclick="cancelAppointmentNew({ $T.liapp.apid})">cancel</button></td><td class="center">{ $T.liapp.appdt}<br />{ $T.liapp.aptf}</br><div class="divide-10"></div><button class="btn btn-xs btn-success"	type="submit" data-toggle="modal" data-target="" onclick="registerPatient({$T.liapp.apid},\'newReg\')" >Register</button></td></td></tr>{#/if}{#/if}{#/if}{#/for} <tbody>';
					//$("#newPatientList").setTemplate(newPatientTemplate1);
					//$("#newPatientList").processTemplate(r);
					 
					
					
					/* <Dashboard.jsp Todays Appointment> */
					/*var count = 1;
					for ( var int = 0; int < consultantObj.listDoctorDetailsDto.length; int++) {
						var Doc_name = consultantObj.listDoctorDetailsDto[int].doc_name;
						
						for ( var i = 0; i < r.liapp.length; i++) {
							
							var docNm1 = r.liapp[i].docNm;	
							var pname = r.liapp[i].title + r.liapp[i].patNm + r.liapp[i].lastName;
							var mobNo = r.liapp[i].mobNo;
							var aptf = r.liapp[i].aptf;
							
							if (docNm1 == Doc_name) {
								
								html = html + '<tr class="gradeX">';
								html = html + '<td class="col-md-1-1" >'+(count)+'</td>';
								html = html + '<td class="col-md-3-1" >'+(docNm1)+'</td>';
								html = html + '<td class="col-md-3-1 " >'+(pname)+'</td>';
								html = html + '<td class="col-md-3-1" >'+(mobNo)+'</td>';
								html = html + '<td class="col-md-2-1" >'+(aptf)+'</td>';
								html = html + '</tr>';
								count++;
							}
						}
					}
					$("#newPatientListDashboard").html(html);
					
					var newPatientTemplate1Dashboard = '{#foreach $T.liapp as liapp}{#if $T.liapp.aptyId=="New" || $T.liapp.aptyId=="Existing" || $T.liapp.aptyId=="FollowUp"}'
							+ '{#if $T.liapp.appdt=="'
							+ date
							+ '"}<tr class="gradeX">'
							+ '<td class="col-md-1-1">{countDash++}</td>'
							+ '<td class="col-md-3-1">{ $T.liapp.docNm}</td>'
							+ '<td class="col-md-3-1">{$T.liapp.title} {$T.liapp.patNm} {$T.liapp.lastName}</td>'
							+ '<td class="col-md-3-1">{ $T.liapp.mobNo}</td>'
							+ '<td class="col-md-2-1">{$T.liapp.aptf}</td></tr>{#/if}{#/if}{#/for}';

					$("#newPatientListDashboard").setTemplate(
							newPatientTemplate1Dashboard);
					$("#newPatientListDashboard").processTemplate(r);

					if (count > 0) {
						$("#OPDQueueCount").html((--count));
					}*/
					/* </Dashboard.jsp Todays Appointment> */
				}
			});
}


function changeAppointmentOfNewPatientNew(appointmentId) {

	if ($("#idTourDateDetails").val() == ""
			|| $("#idTourDateDetails").val() == null) {
		alert("Please Select Date");
		return false;
	}

	$("#divAllPatientList").html("");
	var appointmentType = $("#appointmentType").val();
	
	if(appointmentType == "ReSchedule"){
		var pobj = $("#reScheduleList").html();
		
		pobj = eval('(' + pobj + ')');
		var myObj = null;
		
		for ( var i = 0; i < pobj.listAppointmet.length; i++) {
			if (pobj.listAppointmet[i].appt_ID == appointmentId) {
				myObj = pobj.listAppointmet[i];
			}
		}
	}else if(appointmentType == "FollowUp"){
		//var pobj = $("#followUpList").html();
		//pobj = eval('(' + pobj + ')');
		//alert("hii..."+pobj.lstFolloupPatientList[0].patient_id);
	  var follow_up_patient_id=	$("#follow_up_patient_id").val();
		setFollowPatientInfoOnPopUp(follow_up_patient_id);
	}
	else{
		var divAppo = $("#divAppo").html();
		divAppo = eval('(' + divAppo + ')');
		//alert(JSON.stringify(divAppo));
		var myObj = null;
		for ( var i = 0; i < divAppo.listAppointmet.length; i++) {
			if (divAppo.listAppointmet[i].apptId == appointmentId) {
				myObj = divAppo.listAppointmet[i];
				break;
			}
		}
	}
	
		if(appointmentType == "ReSchedule"){
				getPatientDetailsNew(myObj.appt_ID);
				if (myObj.nt != "") {
					$("#textareaNote").val(myObj.note);
				} else {
					$("#textareaNote").val(myObj.details);
				}
				$("#hidpatId").val(myObj.patient_ID);
				$("#appointmentId").val(myObj.appt_ID);
		
				var dateF= new Date(myObj.appt_date).toLocaleDateString('en-GB');
				$("#idTourDateDetails").val(dateF);
				$("#selHosDept").val(myObj.branch_id);
				//getDoctorNameList();
				getAllDoctorListfromSpec();
			
		}else if(appointmentType == "FollowUp"){
			
			var pobj = $("#followUpList").html();
			pobj = eval('(' + pobj + ')');
			//getPatientDetailsNew(pobj.lstFolloupPatientList[0].patient_id);
		}
		else{
			getPatientDetailsNew(myObj.apptId);
			
			if (myObj.nt != "") {
				$("#textareaNote").val(myObj.note);
			} else {
				$("#textareaNote").val(myObj.details);
			}
			$("#hidpatId").val(myObj.patientId);
			$("#appointmentId").val(myObj.apptId);
		
			var dateF= new Date(myObj.apptDate).toLocaleDateString('en-GB');
			$("#idTourDateDetails").val(dateF);
			$("#selHosDept").val(myObj.branchId);
			//getDoctorNameList();
			getAllDoctorListfromSpec();
			
		}
	
	setTimeout(function() {
		if(appointmentType == "ReSchedule"){
		$("#selDoctorName").val(myObj.doctor_id);
		}else if(appointmentType == "FollowUp"){
			
			var pobj = $("#followUpList").html();
			pobj = eval('(' + pobj + ')');
			$("#selDoctorName").val(pobj.lstFolloupPatientList[0].doctor_id);
		}else{
			$("#selDoctorName").val(myObj.doctorId);
		}
		setTimeout(function() {
			//getDoctorTimeList();
			if(appointmentType != "FollowUp"){
			getDoctorTimeListNew();
			}
		}, 200);
	}, 200);

	setTimeout(
			function() {
				if(appointmentType == "ReSchedule"){
				var patName = myObj.patient_title + myObj.patient_Name + " " + myObj.patient_last_name;
				var templatePatientDetails = '<div class="panel panel-default"><div class="panel-body"><div class="divide-10"></div><table id="" cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered table-hover"><thead><tr><th>Patient Name: '
						+ patName
						+ '</th></tr><tr><th>Mobile No.: '
						+ myObj.mobile_No
						+ '</th></tr></thead></table></div></div>';
				$("#divAllPatientList").html(templatePatientDetails)

				var patientDetailTemp = '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Patient Name :'
						+ patName
						+ '</label>'
						+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Patient Mobile Number : '
						+ myObj.mobile_No
						+ '</label>'
						+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont" id"appSlotTiming"></label>';

				$("#patientDetailsDiv").html(patientDetailTemp);
			}else if(appointmentType == "FollowUp"){
			 var 	patientDetails = $("#patientDetails").html();
			 patientDetails = eval('(' + patientDetails + ')');
			
			 //var patid = patientDetails.patientList[0].patientId;
			 var patid = patientDetails.lstMarkVisit[0].ptId;
				//patName = patientDetails.patientList[0].fName;
			 var patName1 = patientDetails.lstMarkVisit[0].fName;
				//patLastName = patientDetails.patientList[0].lName;
			 var patLastName = patientDetails.lstMarkVisit[0].lName;
				//title = patientDetails.patientList[0].prefix;
			 var title = patientDetails.lstMarkVisit[0].prefix;
				//patMob = patientDetails.patientList[0].mobile;
			 var patMob = patientDetails.lstMarkVisit[0].mobile;
				var patName=title +"-"+patName1+"-"+"-"+patLastName;
				
				
				
				var templatePatientDetails = '<div class="panel panel-default"><div class="panel-body"><div class="divide-10"></div><table id="" cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered table-hover"><thead><tr><th>Patient Name: '
						+ patName
						+ '</th></tr><tr><th>Mobile No.: '
						+ patMob
						+ '</th></tr></thead></table></div></div>';
				$("#divAllPatientList").html(templatePatientDetails)

				var patientDetailTemp = '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Patient Name11 :'
						+ patName
						+ '</label>'
						+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Patient Mobile Number : '
						+ patMob
						+ '</label>'
						+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont" id"appSlotTiming"></label>';

				$("#patientDetailsDiv").html(patientDetailTemp);
			}
				else{
						var patName = myObj.title + myObj.patientName + " " + myObj.lastName;
						var templatePatientDetails = '<div class="panel panel-default"><div class="panel-body"><div class="divide-10"></div><table id="" cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered table-hover"><thead><tr><th>Patient Name: '
								+ patName
								+ '</th></tr><tr><th>Mobile No.: '
								+ myObj.mobNo
								+ '</th></tr></thead></table></div></div>';
						$("#divAllPatientList").html(templatePatientDetails)
		
						var patientDetailTemp = '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Patient Name22 :'
								+ patName
								+ '</label>'
								+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Patient Mobile Number : '
								+ myObj.mobNo
								+ '</label>'
								+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont" id"appSlotTiming"></label>';
		
						$("#patientDetailsDiv").html(patientDetailTemp);
			}
			}, 200);
}



function getPatientDetailsNew(appointmentId) {
	
	//alert(appointmentId);
	var autocomplete;
	var patientName;
	var patientId;
	if (appointmentId == 0) {
		autocomplete = $("#autocomplete").val();
		patientName = autocomplete.split("_");
		patientId = patientName[1];
	} else {
		//patientId = $("#hidpatId").val();
		patientId =appointmentId;
		//alert("pt id"+patientId);
		/*patientId = patientId.replace("\n", "");
		patientId = patientId.replace(" ", "");*/
		// var ajaxResponse=$("#followUpList").html();
		// var pobj = eval('(' + ajaxResponse + ')');
	}
	
	if (patientId != null && patientId != undefined && patientId != "") {
		//alert("higggggggg");
		
		var inputs = [];
		inputs.push('patientId=' + patientId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : false,
					type : "POST",
					data : str + "&reqType=AJAX",
					//url : "AppointmentServlet",
					url : "ehat/scheduler/getPatientDetailsNew",
					timeout : 1000 * 60 * 15,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						var ajaxResponse = JSON.stringify(r);
						//ajaxResponse = r;
						//alert(ajaxResponse);
						$("#patientDetails").html(ajaxResponse);
						var patientDetails = eval('(' + ajaxResponse + ')');
						

						var patientDetailTemp = '<label class="TextFont">Patient Id : {$T.patientList[0].patientId}</label>'
							+ '<div class="divide-10"></div><label class="TextFont">Patient Name :{ $T.patientList[0].prefix} {$T.patientList[0].fName} {$T.patientList[0].lName}</label>'
							+ '<div class="divide-10"></div><label class="TextFont">Patient Mobile Number : {$T.patientList[0].mobile}</label>'
							+ '<div class="divide-10"></div><label class="TextFont" id"appSlotTiming"></label>';

						$("#patientDetailsDiv").setTemplate(patientDetailTemp);
						$("#patientDetailsDiv").processTemplate(patientDetails);
					}
				});
	}
}



//get all doctor name from spec
function getAllDoctorListfromSpec(callFrom){
	
	
	
	var inputs = [];
	//inputs.push('date=onload');
	if (callFrom == "New") {
		inputs.push('date=' + $("#selHosDeptNew").val());
	} else {
		inputs.push('date=' + $("#selHosDept").val());
	}
	inputs.push('docType=doctor');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "ehat/scheduler/getAllDoctorListfromSpec",
		url : "ehat/scheduler/getAllDoctorList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if (callFrom == "New") {
				var selectList = "<option value=''>Select Doctor</option>";
				for(var i=0;i<r.listDoctor.length;i++)
				{
					selectList=selectList+'<option value="'+r.listDoctor[i].doctor_ID+'">'+r.listDoctor[i].doc_name+'</option>';
					}
				$("#selDoctorNameNew").html(selectList);
				
			} else {
				var selectList = "<option value=''>Select Doctor</option>";
				for(var i=0;i<r.listDoctor.length;i++)
				{
					selectList=selectList+'<option value="'+r.listDoctor[i].doctor_ID+'">'+r.listDoctor[i].doc_name+'</option>';
					}
				$("#selDoctorName").html(selectList);
			}
			
		}
	});
}


function scheduleAppointmentOfPatientNew(callFrom) {
	//alert("new new");
		var appointmentDate;
		var patientDetails;
		var appoTypeAR;
		var appoType;
		var details;
		var note;
		var branchId;
		var appointmentId;
		var appDateTime;
		var doctorId;
		var divTokens;
		var divAppoList;
		var trid;
		var patid;
		var txtAppoDate;
		var patName;
		var patLastName;
		var title;
		var patMob;
		var noOfToken;

		var queryType = $("#queryType").val();
		if (callFrom == "New") {
			appointmentDate = $("#idNewAppointment").val();
			appoTypeAR = "addAppo";
			appoType = $("#appointmentType").val();
			details = $("#details").val();

			// alert(details);

			note = "";

			branchId = $("#selHosDeptNew").val();
			appointmentId = 0;

			appDateTime = ($("#appDateTime").val()).split(" ");
			// alert(appDateTime);
			doctorId = $("#selDoctorNameNew").val();
			divTokens = "M" + doctorId + "M" + appDateTime[4] + "#";

			divAppoList = $("#divAppo").html();
			trid = 0;
			patid = 0;
			patName = $("#txtPName").val();
			patLastName = $("#txtLastName").val();
			title = $("#title").val();
			patMob = $("#patMob").val();
			noOfToken = divTokens.split("#");
		} else {
			if (queryType == "save") {
				appointmentDate = $("#idNewAppointment").val();
				if (appointmentDate == null || appointmentDate == "") {
					alert("Please Select Appointment Date");
					return false;
				} else if (($("#selHosDeptNew").val()) == "0"
						|| ($("#selHosDeptNew").val()) == undefined) {
					alert("Please Select Speciality");
					return false;
				} else if (($("#selDoctorNameNew").val()) == "0"
						|| ($("#selDoctorNameNew").val()) == undefined) {
					alert("Please Select Doctor");
					return false;
				} else if (($("#selDoctorTimeNew").val()) == "0"
						|| ($("#selDoctorTimeNew").val()) == undefined) {
					alert("Please Select Doctor's Timing");
					return false;
				}

				branchId = $("#selHosDeptNew").val();
				doctorId = $("#selDoctorNameNew").val();

			} else {
				appointmentDate = $("#idTourDateDetails").val();
				if (appointmentDate == null || appointmentDate == "") {
					alert("Please Select Appointment Date");
					return false;
				} else if (($("#selHosDept").val()) == "0"
						|| ($("#selHosDept").val()) == undefined) {
					alert("Please Select Speciality");
					return false;
				} else if (($("#selDoctorName").val()) == "0"
						|| ($("#selDoctorName").val()) == undefined) {
					alert("Please Select Doctor");
					return false;
				} else if (($("#selDoctorTime").val()) == "0"
						|| ($("#selDoctorTime").val()) == undefined) {
					alert("Please Select Doctor's Timing");
					return false;
				}

				branchId = $("#selHosDept").val();
				doctorId = $("#selDoctorName").val();

			}

			patientDetails = $("#patientDetails").html();
			
			if (patientDetails != "") {
				patientDetails = eval('(' + patientDetails + ')');
			}
			
			

			appoTypeAR = "addAppo";
			appoType = $("#appointmentType").val();
			details = $("#new_description").val();// details";

			// alert(details);

			note = $("#textareaNote").val();

			appointmentId = $("#appointmentId").val();

			appDateTime = ($("#appDateTime").val()).split(" ");

			divTokens = "M" + doctorId + "M" + appDateTime[4] + "#";

			divAppoList = $("#divAppo").html();
			trid = 0;
			var myObj = null;
			if (appointmentId == 0 && appoType != "FollowUp") {
				/*patid = patientDetails.pi;
				patName = patientDetails.fn;
				patLastName = patientDetails.ln;
				title = patientDetails.tit;
				patMob = patientDetails.mb;*/
			//	patid = patientDetails.patientList[0].patientId;
				patid = patientDetails.lstMarkVisit[0].ptId;
				//patName = patientDetails.patientList[0].fName;
				patName = patientDetails.lstMarkVisit[0].fName;
				//patLastName = patientDetails.patientList[0].lName;
				patLastName = patientDetails.lstMarkVisit[0].lName;
				//title = patientDetails.patientList[0].prefix;
				title = patientDetails.lstMarkVisit[0].prefix;
				//patMob = patientDetails.patientList[0].mobile;
				patMob = patientDetails.lstMarkVisit[0].mobile;
			} else {

				if (appoType == "FollowUp") {
					
					/*patid = patientDetails.patientList[0].patientId;
					patName = patientDetails.patientList[0].fName;
					patLastName = patientDetails.patientList[0].lName;
					title = patientDetails.patientList[0].prefix;
					patMob = patientDetails.patientList[0].mobile;*/
					
					patid = patientDetails.lstMarkVisit[0].ptId;
					//patName = patientDetails.patientList[0].fName;
					patName = patientDetails.lstMarkVisit[0].fName;
					//patLastName = patientDetails.patientList[0].lName;
					patLastName = patientDetails.lstMarkVisit[0].lName;
					//title = patientDetails.patientList[0].prefix;
					title = patientDetails.lstMarkVisit[0].prefix;
					//patMob = patientDetails.patientList[0].mobile;
					patMob = patientDetails.lstMarkVisit[0].mobile;
					
					appointmentId=	$("#follow_up_id").val();
					
				} else {
					
					if(appoType == "ReSchedule"){
						var pobj = $("#reScheduleList").html();
						pobj = eval('(' + pobj + ')');
						for ( var i = 0; i < pobj.listAppointmet.length; i++) {
							if (pobj.listAppointmet[i].appt_ID == appointmentId) {
								myObj = pobj.listAppointmet[i];
							}
						}
					}else{
						var divAppo = $("#divAppo").html();
						divAppo = eval('(' + divAppo + ')');
						for ( var i = 0; i < divAppo.listAppointmet.length; i++) {
							if (divAppo.listAppointmet[i].apptId == appointmentId) {
								myObj = divAppo.listAppointmet[i];
								break;
							}
						}
					}
					if(appoType == "ReSchedule"){
						
						$("#textareaNote").val(myObj.note);
						$("#hidpatId").val(myObj.patient_ID);
						patid = myObj.patient_ID;
						patName =myObj.patient_Name;
						patLastName = myObj.patient_last_name;
						title =myObj.patient_title;
						patMob =myObj.mobile_No;
					}else{
						$("#textareaNote").val(myObj.note);
						$("#hidpatId").val(myObj.patientId);
						patid = patientDetails.patientList[0].patientId;
						patName = patientDetails.patientList[0].fName;
						patLastName = patientDetails.patientList[0].lName;
						title = patientDetails.patientList[0].prefix;
						patMob = patientDetails.patientList[0].mobile;
					}
				}

			}

			noOfToken = divTokens.split("#");
		}

		var arrValidateDateTime = ($("#appDateTime").val()).split(" ");
		var validateStartTime = arrValidateDateTime[4];
		var validateDate = new Date();
		var validateCurrentTime = validateDate.getHours() + ":"
				+ validateDate.getMinutes() + ":" + validateDate.getSeconds();
		var validateCurrentDate = validateDate.getDay() + "/"
				+ (validateDate.getMonth() + 1) + "/" + validateDate.getFullYear();

		var startTime = validateCurrentTime;
		var endTime = validateStartTime;
		
		
		
		var regExp = /(\d{1,2})\:(\d{1,2})\:(\d{1,2})/;
		
		if (parseInt(endTime.replace(regExp, "$1$2$3")) > parseInt(startTime
				.replace(regExp, "$1$2$3"))) {
			/*
			 * alert("End time is greater"); }
			 * 
			 * if(validateStartTime > validateCurrentTime){
			 */
			var temp1;
			var temp2;
			
		} else {
			var arrAppoDate = appointmentDate.split("/");
			var dateOne = new Date(arrAppoDate[2], (arrAppoDate[1] - 1),
					arrAppoDate[0]);
			var dateTwo = new Date(validateDate.getFullYear(), validateDate
					.getMonth(), validateDate.getDate());
			
			
			
			if (dateOne <= dateTwo) {
				alert("Please select valid time slot to schedule appointment");
				return false;
			}
			
			
		}
		if (title == "select" || title == undefined) {
			alert("Please Select Patient Title To Save Appointment.");
			return false;
		} else if (patName == "" || patName == undefined) {
			alert("Please Enter Patient First Name To Save Appointment.");
			return false;
		} else if (patLastName == "") {
			alert("Please Enter Patient Last Name To Save Appointment.");
			return false;
		} else if (divTokens == "") {
			alert("Please Select Timeslot To Save Appointment.");
			return false;
		} else if (appoType == "New") {
			if (patMob == "") {
				alert("Please Enter Patient Mobile No To Save Appointment.");
				return false;
			}
			else if(patMob.length!=10){
				alert("Length of Mobile Number Should 10 Digit !!!");
				return false;
			} 
			
			
			else if (noOfToken.length > 2) {
				alert("Please Select Only One Timeslot To Save Appointment.");
				return false;
			}
		} else if (noOfToken.length > 2) {
			alert("Please Select Only One Timeslot To Save Appointment.");
			return false;
		}
		if(appoType == "ReSchedule"){
			appoType = myObj.appt_type_id;
		}
		
		var regType = 'N';//$("#regType").val();

		var inputs = [];
		inputs.push('action=SaveAppointmentAdd');
		inputs.push('appoTypeAR=' + appoTypeAR);
		inputs.push('appoType=' + appoType);
		inputs.push('title=' + encodeURIComponent(title));
		inputs.push('patName=' + encodeURIComponent(patName));
		inputs.push('patLastName=' + encodeURIComponent(patLastName));
		inputs.push('patMob=' + encodeURIComponent(patMob));
		inputs.push('details=' + encodeURIComponent(details));
		inputs.push('divTokens=' + encodeURIComponent(divTokens));
		//inputs.push('divAppoList=' + encodeURIComponent(divAppoList));
		inputs.push('trid=' + trid);
		inputs.push('patid=' + patid);
		inputs.push('txtAppoDate=' + appointmentDate);

		inputs.push('branchId=' + branchId);
		inputs.push('appointmentId=' + appointmentId);
		inputs.push('note=' + encodeURIComponent(note));
		inputs.push('regType=' + regType);	
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "AppointmentServlet",
			url : "ehat/scheduler/SavescheduleAppointmentOfPatientNew",
			timeout : 1000 * 60 * 15,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				if (ajaxResponse == "Appointment Saved successfully..."
						|| ajaxResponse == "Appointment Updated successfully...") {
					location.reload();
				}
			}
		});
	}





//Ganesh JS Code for Fetch list of Reschedule pationt details
function fetchReScheduleApptNew() {
	countForFollowUp = 1;

	var date = $("#idTourDateDetails").val();

	var inputs = [];
	inputs.push('action=FetchAppointmentsForReSchedule');
	// inputs.push('txtAppoDate=' + encodeURIComponent(txtAppoDate));
	inputs.push('txtAppoDate=' + encodeURIComponent(date));
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/scheduler/fetchRescheduleList",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					
					var ajaxResponse = JSON.stringify(r);
					//$("#reScheduleList").html(ajaxResponse);
					$("#reSchedulePatientList").html("");
					var divAppo = eval('(' + ajaxResponse + ')');

					var followUpPatientTemplate1 = '<tbody>{#foreach $T.liapp as liapp}'
							+ '<tr class="gradeX" id="existing{$T.liapp.apid}">'
							+ '<td>{$T.liapp.title}{$T.liapp.patNm} {$T.liapp.lastName}<br/><div class="divide-10"></div>'
							//+ '<button class="btn btn-xs btn-primary" type="submit" data-toggle="modal" data-target="" onclick="setReScheduleAppointmentType(),changeAppointmentOfPatientNew({$T.liapp.apid})" >change</button>'
							+ '{#if $T.liapp.aptyId=="New"}'
							+ '{#if $T.liapp.patid=="0"}'
							+ '<button class="btn btn-xs btn-primary" type="submit" data-toggle="modal" data-target="" onclick="setReScheduleAppointmentType(),changeAppointmentOfNewPatientNew({$T.liapp.apid})" >change</button>'
							+ '{#else}'
							+ '<button class="btn btn-xs btn-primary" type="submit" data-toggle="modal" data-target="" onclick="setReScheduleAppointmentType(),changeAppointmentOfPatientNew({$T.liapp.apid})" >change</button>'
							+ '{#/if}'
							+ '{#else}'
							+ '<button class="btn btn-xs btn-primary" type="submit" data-toggle="modal" data-target="" onclick="setReScheduleAppointmentType(),changeAppointmentOfPatientNew({$T.liapp.apid})" >change</button>'
							+ '{#/if}'
							+ '</td>'
							+ '<td>{ $T.liapp.docNm}<br/><div class="divide-10"></div>'
							+ '<button class="btn btn-xs btn-danger" type="submit" data-toggle="modal"	data-target="" onclick="cancelAppointmentNew({ $T.liapp.apid})">cancel</button></td>'
							+ '<td class="center">{ $T.liapp.appdt}</br>{ $T.liapp.aptf}<br/><div class="divide-10"></div>'
							+ '{#if $T.liapp.aptyId=="New"}'
							+ '{#if $T.liapp.patid=="0"}'
							+ '<button class="btn btn-xs btn-success"	type="submit" data-toggle="modal" data-target="" onclick="registerPatient({$T.liapp.apid},\'newReg\')" >Register</button>'
							+ '{#else}'
							+ '<button class="btn btn-xs btn-success" onclick="registerPatient({$T.liapp.apid},\'mark\')" data-toggle="modal"	data-target="#MarkPatient">Mark Visit</button>'
							+ '{#/if}'
							+ '{#else}'
							+ '<button class="btn btn-xs btn-success" onclick="registerPatient({$T.liapp.apid},\'mark\')" data-toggle="modal"	data-target="#MarkPatient">Mark Visit</button>'
							+ '{#/if}</td></tr>{#/for}';
															
					$("#reSchedulePatientList").setTemplate(followUpPatientTemplate1);
					$("#reSchedulePatientList").processTemplate(divAppo);
					
					$('#ReschedulePatientsToday').html(divAppo.listAppointmet.length);
				}
			});

}


function getCountForFollowUpAndRescheduleNew(){

	var date = $("#idTourDateDetails").val();
	
	var inputs = [];
	inputs.push('txtAppoDate=' + encodeURIComponent(date));
	var str = inputs.join('&');
	jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/scheduler/fetchCount",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(ajaxResponse) {
					//alert("ajaxResponse"+ajaxResponse.rescheduleCount);
					
					$('#FollowUpPatientsToday').html(ajaxResponse.followUpCount);
					$('#ReschedulePatientsToday').html(ajaxResponse.rescheduleCount);
				}
			});
}


function cancelAppointmentNew(appointmentId) {
	var r = confirm("Do you want to remove appointment?");
	//alert(appointmentId);
	if (r == true) {
		var inputs = [];
		inputs.push('appId=' + appointmentId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/scheduler/removeAppointMent",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				if(r==1){
					alert("Appointment Removed");
				}else{
					alert("Network Issue");
				}
				$("#existing" + appointmentId).html("");
				getAppointedListOfPatientNew();
				setTimeout(function() {
					fetchFollowUpNew();
				}, 200);
				showDoctorAppointmentsNew();
				//fetchReScheduleApptNew();
			}
		});
	}
}

function getPatientAppointListData(callFrom){

	var date = $("#idTourDateDetails").val();
	var newDate=date.split("/");
	
	var appointmentDate=newDate[2]+"-"+newDate[1]+"-"+newDate[0];
	//var appointmentType=$("#appointmentType").val();
	
	var actionType="L";

var inputs = [];

inputs.push('appointmentDate=' + appointmentDate);
inputs.push('appointmentType=' + callFrom);
inputs.push('actionType=' + actionType);



var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "POST",
	data : str + "&reqType=AJAX",
	url : "ehat/scheduler/getPatientAppointListData",
	timeout : 1000 * 60 * 5,
	cache : false,
	error : function() {
		// 
	},
	success : function(r) {
		
		$("#reSchedulePatientList").html("");
		$("#newPatientList").html("");
		$("#existingPatientList").html("");
		
		
		//strat set new patient details
		
		if(callFrom == "New"){
		var newPatientresult = '';
		if (r.listAppointmet.length > 0) {
			newPatientresult = newPatientresult + '<tbody>';
				for (var i = 0; i < r.listAppointmet.length; i++) {
						if(r.listAppointmet[i].appt_type_id == "New"){
							
							var dateF= new Date(r.listAppointmet[i].appt_date).toLocaleDateString('en-GB');
									
							newPatientresult = newPatientresult	+ '<tr> '
									+ '	<td >' +r.listAppointmet[i].patient_title+" "+ r.listAppointmet[i].patient_Name + " "+ r.listAppointmet[i].patient_last_name
									+'<br> <button type="submit" class="btn btn-primary" style="font-size: 13px;padding: 2px;margin: 3px 0 0;"  onclick="changeAppointmentOfNewPatientNew('+r.listAppointmet[i].appt_ID+')">Change</button>'
									+'</td>'
									
									+ '	<td >' + r.listAppointmet[i].doc_Name
									+ '<br> <button type="submit" class="btn btn-danger" style="font-size: 13px;padding: 2px;margin: 3px 0 0;" onclick="cancelAppointmentNew('+r.listAppointmet[i].appt_ID+')">Cancel</button>'
									+'</td>'
									
									+ '	<td >' + dateF+ " "+r.listAppointmet[i].appt_time_from
									+ '<br> <button type="submit" class="btn btn-success" style="font-size: 13px;padding: 2px;margin: 3px 0 0;" onclick="registerPatient('+r.listAppointmet[i].appt_ID+','+'&apos;newReg&apos;'+')">Register</button>'
									+'</td>'
		
									+ '</tr>'
									
								
								}
					}
				newPatientresult = newPatientresult + '</tbody>';
			$("#newPatientList").html(newPatientresult);
		}
		}
		//end set new patient Details
		
		//start exiting patient details
		var resultExistingPatient = '';
		if (r.listAppointmet.length > 0) {
			resultExistingPatient = resultExistingPatient + '<tbody>';
				for (var i = 0; i < r.listAppointmet.length; i++) {
						if(r.listAppointmet[i].appt_type_id == "Existing"){
							
							var dateF= new Date(r.listAppointmet[i].appt_date).toLocaleDateString('en-GB');
							resultExistingPatient = resultExistingPatient	+ '<tr> '
		
							+ '	<td >' +r.listAppointmet[i].patient_title+" "+ r.listAppointmet[i].patient_Name + " "+ r.listAppointmet[i].patient_last_name
							+'<br> <button type="submit" class="btn btn-primary" style="font-size: 13px;padding: 2px;margin: 3px 0 0;"  onclick="changeAppointmentOfNewPatientNew('+r.listAppointmet[i].appt_ID+')">Change</button>'
							+'</td>'
							
							+ '	<td >' + r.listAppointmet[i].doc_Name
							+ '<br> <button type="submit" class="btn btn-danger" style="font-size: 13px;padding: 2px;margin: 3px 0 0;" onclick="cancelAppointmentNew('+r.listAppointmet[i].appt_ID+')">Cancel</button>'
							+'</td>'
							
							+ '	<td >' + dateF + " "+r.listAppointmet[i].appt_time_from
							+ '<br> <button type="submit" class="btn btn-success" style="font-size: 13px;padding: 2px;margin: 3px 0 0;" onclick="registerPatient('+r.listAppointmet[i].appt_ID+','+'&apos;mark&apos;'+')">Mark Visit</button>'
							+'</td>'

							+ '</tr>'
									
								
								}
					}
				resultExistingPatient = resultExistingPatient + '</tbody>';
				$("#existingPatientList").html(resultExistingPatient);
		}
		//end existing patient details;
		
		//start Reschedule patient details
		var resultReschedulePatient = '';
		
		if (r.listAppointmet.length > 0) {
			resultReschedulePatient = resultReschedulePatient + '<tbody>';
				for (var i = 0; i < r.listAppointmet.length; i++) {
						//if(r.listAppointmet[i].apptTypeId == "Reschedule"){
							
							var dateF= new Date(r.listAppointmet[i].appt_date).toLocaleDateString('en-GB');
							resultReschedulePatient = resultReschedulePatient	+ '<tr> '
		
							+ '	<td >' +r.listAppointmet[i].patient_title+" "+ r.listAppointmet[i].patient_Name + " "+ r.listAppointmet[i].patient_last_name
							+'<br> <button type="submit" class="btn btn-primary" style="font-size: 13px;padding: 2px;margin: 3px 0 0;"  onclick="changeAppointmentOfNewPatientNew('+r.listAppointmet[i].appt_ID+')">Change</button>'
							+'</td>'
							
							+ '	<td >' + r.listAppointmet[i].doc_Name
							+ '<br> <button type="submit" class="btn btn-danger" style="font-size: 13px;padding: 2px;margin: 3px 0 0;" onclick="cancelAppointmentNew('+r.listAppointmet[i].appt_ID+')">Cancel</button>'
							+'</td>'
							
							+ '	<td >' + dateF + " "+r.listAppointmet[i].appt_time_from
							
						if(r.listAppointmet[i].patient_ID == 0){
								resultReschedulePatient=resultReschedulePatient	+ '<br> <button type="submit" class="btn btn-success" style="font-size: 13px;padding: 2px;margin: 3px 0 0;" onclick="registerPatient('+r.listAppointmet[i].appt_ID+','+'&apos;newReg&apos;'+')">Register</button>'
						}else{
							resultReschedulePatient=resultReschedulePatient	+ '<br> <button type="submit" class="btn btn-success" style="font-size: 13px;padding: 2px;margin: 3px 0 0;" onclick="registerPatient('+r.listAppointmet[i].appt_ID+','+'&apos;mark&apos;'+')">Mark Visit</button>'
							}
							+'</td>'


							+ '</tr>'
									
								
								//}
					}
				resultReschedulePatient = resultReschedulePatient + '</tbody>';
				
				$("#reSchedulePatientList").html(resultReschedulePatient);
				var ajaxResponse = JSON.stringify(r);
				$("#reScheduleList").html(ajaxResponse);
		}
		//end Reschedule patient details;
		
		var NewCount = 0;
		var ExistingCount = 0;
		for ( var i = 0; i < r.listAppointmet.length; i++) {
			if(r.listAppointmet[i].appt_type_id == "New"){
				
				NewCount++;
			}
			if(r.listAppointmet[i].appt_type_id == "Existing"){
				ExistingCount++;
			}
		}
		
		
		$('#NewPatientsToday').html(NewCount);
		$('#ExistingPatientsToday').html(ExistingCount);


	}
	
	});

}

function setAppointmentType(type) {
	$("#appointmentType").val(type);
}
function searchPatientInfoByPatientNameOrDoctorName(searchBy){


	var date = $("#idTourDateDetails").val();
	var appointmentType=$("#appointmentType").val();
	var searchName=$("#patientListSearch").val();
	var newDate=date.split("/");
	
	var appointmentDate=newDate[2]+"-"+newDate[1]+"-"+newDate[0];
	//var appointmentType=$("#appointmentType").val();
	
	var actionType="L";

var inputs = [];

inputs.push('appointmentDate=' + appointmentDate);
inputs.push('appointmentType=' + appointmentType);
inputs.push('actionType=' + "S");
inputs.push('searchType=' + searchBy);
inputs.push('searchName=' + searchName);

if(appointmentType == "FollowUp"){
	searchFolloupPatientList(searchBy,searchName);
}

var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "POST",
	data : str + "&reqType=AJAX",
	url : "ehat/scheduler/getPatientAppointListData",
	timeout : 1000 * 60 * 5,
	cache : false,
	error : function() {
		// 
	},
	success : function(r) {
		
		
		
		//strat set new patient details
		
		if(appointmentType == "New"){
		var newPatientresult = '';
		if (r.listAppointmet.length > 0) {
			newPatientresult = newPatientresult + '<tbody>';
				for (var i = 0; i < r.listAppointmet.length; i++) {
						if(r.listAppointmet[i].appt_type_id == "New"){
							
							var dateF= new Date(r.listAppointmet[i].appt_date).toLocaleDateString('en-GB');
									
							newPatientresult = newPatientresult	+ '<tr> '
									+ '	<td >' +r.listAppointmet[i].patient_title+" "+ r.listAppointmet[i].patient_Name + " "+ r.listAppointmet[i].patient_last_name
									+'<br> <button type="submit" class="btn btn-primary" style="font-size: 13px;padding: 2px;margin: 3px 0 0;"  onclick="changeAppointmentOfNewPatientNew('+r.listAppointmet[i].appt_ID+')">Change</button>'
									+'</td>'
									
									+ '	<td >' + r.listAppointmet[i].doc_Name
									+ '<br> <button type="submit" class="btn btn-danger" style="font-size: 13px;padding: 2px;margin: 3px 0 0;" onclick="cancelAppointmentNew('+r.listAppointmet[i].appt_ID+')">Cancel</button>'
									+'</td>'
									
									+ '	<td >' + dateF+ " "+r.listAppointmet[i].appt_time_from
									+ '<br> <button type="submit" class="btn btn-success" style="font-size: 13px;padding: 2px;margin: 3px 0 0;" onclick="registerPatient('+r.listAppointmet[i].appt_ID+','+'&apos;newReg&apos;'+')">Register</button>'
									+'</td>'
		
									+ '</tr>'
									
								
								}
					}
				newPatientresult = newPatientresult + '</tbody>';
			//$("#newPatientList").html(newPatientresult);
		}
		}
		//end set new patient Details
		
		//start exiting patient details
		
		var resultExistingPatient = '';
		if (r.listAppointmet.length > 0) {
			resultExistingPatient = resultExistingPatient + '<tbody>';
				for (var i = 0; i < r.listAppointmet.length; i++) {
						if(r.listAppointmet[i].appt_type_id == "Existing"){
							
							var dateF= new Date(r.listAppointmet[i].appt_date).toLocaleDateString('en-GB');
							resultExistingPatient = resultExistingPatient	+ '<tr> '
		
							+ '	<td >' +r.listAppointmet[i].patient_title+" "+ r.listAppointmet[i].patient_Name + " "+ r.listAppointmet[i].patient_last_name
							+'<br> <button type="submit" class="btn btn-primary" style="font-size: 13px;padding: 2px;margin: 3px 0 0;"  onclick="changeAppointmentOfNewPatientNew('+r.listAppointmet[i].appt_ID+')">Change</button>'
							+'</td>'
							
							+ '	<td >' + r.listAppointmet[i].doc_Name
							+ '<br> <button type="submit" class="btn btn-danger" style="font-size: 13px;padding: 2px;margin: 3px 0 0;" onclick="cancelAppointmentNew('+r.listAppointmet[i].appt_ID+')">Cancel</button>'
							+'</td>'
							
							+ '	<td >' + dateF + " "+r.listAppointmet[i].appt_time_from
							+ '<br> <button type="submit" class="btn btn-success" style="font-size: 13px;padding: 2px;margin: 3px 0 0;" onclick="registerPatient('+r.listAppointmet[i].appt_ID+','+'&apos;mark&apos;'+')">Mark Visit</button>'
							+'</td>'

							+ '</tr>'
									
								
								}
					}
				resultExistingPatient = resultExistingPatient + '</tbody>';
				//$("#existingPatientList").html(resultExistingPatient);
		}
		//end existing patient details;
		
		
		
		var NewCount = 0;
		var ExistingCount = 0;
		for ( var i = 0; i < r.listAppointmet.length; i++) {
			if(r.listAppointmet[i].appt_type_id == "New"){
				
				NewCount++;
			}
			if(r.listAppointmet[i].appt_type_id == "Existing"){
				ExistingCount++;
			}
		}
		
		
		$('#NewPatientsToday').html(NewCount);
		$('#ExistingPatientsToday').html(ExistingCount);
		
		
		
		//start Reschedule patient details
		var resultReschedulePatient = '';
		
		if (r.listAppointmet.length > 0) {
			resultReschedulePatient = resultReschedulePatient + '<tbody>';
				for (var i = 0; i < r.listAppointmet.length; i++) {
						//if(r.listAppointmet[i].apptTypeId == "Reschedule"){
							
							var dateF= new Date(r.listAppointmet[i].appt_date).toLocaleDateString('en-GB');
							resultReschedulePatient = resultReschedulePatient	+ '<tr> '
		
							+ '	<td >' +r.listAppointmet[i].patient_title+" "+ r.listAppointmet[i].patient_Name + " "+ r.listAppointmet[i].patient_last_name
							+'<br> <button type="submit" class="btn btn-primary" style="font-size: 13px;padding: 2px;margin: 3px 0 0;"  onclick="changeAppointmentOfNewPatientNew('+r.listAppointmet[i].appt_ID+')">Change</button>'
							+'</td>'
							
							+ '	<td >' + r.listAppointmet[i].doc_Name
							+ '<br> <button type="submit" class="btn btn-danger" style="font-size: 13px;padding: 2px;margin: 3px 0 0;" onclick="cancelAppointmentNew('+r.listAppointmet[i].appt_ID+')">Cancel</button>'
							+'</td>'
							
							+ '	<td >' + dateF + " "+r.listAppointmet[i].appt_time_from
							
						if(r.listAppointmet[i].patient_ID == 0){
							resultReschedulePatient=resultReschedulePatient	+ '<br> <button type="submit" class="btn btn-success" style="font-size: 13px;padding: 2px;margin: 3px 0 0;" onclick="registerPatient('+r.listAppointmet[i].appt_ID+','+'&apos;newReg&apos;'+')">Register</button>'
						}else{
							resultReschedulePatient=resultReschedulePatient	+ '<br> <button type="submit" class="btn btn-success" style="font-size: 13px;padding: 2px;margin: 3px 0 0;" onclick="registerPatient('+r.listAppointmet[i].appt_ID+','+'&apos;mark&apos;'+')">Mark Visit</button>'
							}
								+'</td>'


							+ '</tr>'
									
								
								//}
					}
				resultReschedulePatient = resultReschedulePatient + '</tbody>';
				
				$("#reSchedulePatientList").html(resultReschedulePatient);
		}
		//end Reschedule patient details;


	}
	
	});


}

function setFollowPatientInfoOnPopUp(patId){
	
	jQuery.ajax({
		async 	: false,
		type 	: "POST",
		data 	: {
		 "ptid" : patId,
 			},
		url 	: "ehat/markvisit/getPatientDetails",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			alert('Error fetching patient information !');
		},
		success : function(r) {
			
			$('#byId').val(" ");
			$('#byMobile').val(" ");
			$('#byName').val("");
			
			$('#byId').val(r.lstMarkVisit[0].ptId);
			$('#byName').val(r.lstMarkVisit[0].fName +" "+r.lstMarkVisit[0].mName+" "+r.lstMarkVisit[0].lName);
			$('#byMobile').val(r.lstMarkVisit[0].mobile);
			
			var ajaxResponse = JSON.stringify(r);
			$("#patientDetails").html(ajaxResponse);
			
			
			var patName = r.lstMarkVisit[0].fName +" "+r.lstMarkVisit[0].mName+" "+r.lstMarkVisit[0].lName
			var templatePatientDetails = '<div class="panel panel-default"><div class="panel-body"><div class="divide-10"></div><table id="" cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered table-hover"><thead><tr><th>Patient Name: '
					+ patName
					+ '</th></tr><tr><th>Mobile No.: '
					+ r.lstMarkVisit[0].mobile
					+ '</th></tr></thead></table></div></div>';
			$("#divAllPatientList").html(templatePatientDetails)

			var patientDetailTemp = '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Patient Name :'
					+ patName
					+ '</label>'
					+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont">Patient Mobile Number : '
					+r.lstMarkVisit[0].mobile
					+ '</label>'
					+ '<div class="divide-10"></div><label for="exampleInputEmail1" class="TextFont" id"appSlotTiming"></label>';

			$("#patientDetailsDiv").html(patientDetailTemp);
			
			
		
		}
	});
}


function setFollowUpId(followUpId,follow_up_patient_id){
	$("#follow_up_id").val(followUpId);
	$("#follow_up_patient_id").val(follow_up_patient_id);
}


//Ganesh JS Code for Fetch list of followUP pationt details
function fetchFollowUpNew(callFrom) {
	countForFollowUp = 1;
	
	var appointmentDate;
	if (callFrom == "New") {
		appointmentDate = $("#idNewAppointment").val();
		} else {
		appointmentDate = $("#idTourDateDetails").val();
	}
	var inputs = [];
//	inputs.push('action=FetchFollowUp');
	//inputs.push('txtAppoDate=' + encodeURIComponent(appointmentDate));
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				//url : "ehat/scheduler/fetchFollowUpList",
				url : "ehat/scheduler/getFolloupPatientList",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					var ajaxResponse = JSON.stringify(r);
					
					//alert("fetchFollowUpNew "+ajaxResponse);
					pobj = eval('(' + ajaxResponse + ')');

					$("#followUpList").html(ajaxResponse);
					$("#followUpPatientList").html("");

					//data
					
					//start follow up patient list
					var resultExistingPatient = '';
					if (r.lstFolloupPatientList.length > 0) {
						resultExistingPatient = resultExistingPatient + '<tbody>';
							for (var i = 0; i < r.lstFolloupPatientList.length; i++) {
								
										
								var dateF= new Date(r.lstFolloupPatientList[i].date).toLocaleDateString('en-GB');
								var arrTempDate=dateF.split("/");
								var followUpDate = arrTempDate[2] + "-" + arrTempDate[1]+ "-" + arrTempDate[0];
										resultExistingPatient = resultExistingPatient	+ '<tr> '
					
										+ '	<td >' +r.lstFolloupPatientList[i].patient_name
										+'<br> <button type="submit" class="btn btn-primary" style="font-size: 13px;padding: 2px;margin: 3px 0 0;"  onclick="setFollowUpId('+r.lstFolloupPatientList[i].follow_up_id+','+r.lstFolloupPatientList[i].patient_id+'),changeAppointmentOfNewPatientNew('+r.lstFolloupPatientList[i].patient_id+') ">Schedule Appointment</button>'
										+'</td>'
										
										+ '	<td >' + r.lstFolloupPatientList[i].doctor_name
										+ '<br> <button type="submit" class="btn btn-danger" style="font-size: 13px;padding: 2px;margin: 3px 0 0;" onclick="cancelFollowUp('+r.lstFolloupPatientList[i].follow_up_id+')">Cancel</button>'
										+'</td>'
										
										+ '	<td >' +followUpDate
										
										+'</td>'

										+ '</tr>'
												
										
								}
							
							resultExistingPatient = resultExistingPatient + '</tbody>';
							$("#followUpPatientList").html(resultExistingPatient);
					}
					//follow up patient list

					
					
				}
			});
}


function searchFolloupPatientList(searchBy,searchName){
	var inputs = [];

	
	inputs.push('serachType=' + searchBy);
	inputs.push('searchText=' + searchName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/scheduler/searchFolloupPatientList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
		
			$("#followUpPatientList").html("");

			//start follow up patient list
			var resultExistingPatient = '';
			if (r.lstFolloupPatientList.length > 0) {
				resultExistingPatient = resultExistingPatient + '<tbody>';
					for (var i = 0; i < r.lstFolloupPatientList.length; i++) {
						
								
						var dateF= new Date(r.lstFolloupPatientList[i].date).toLocaleDateString('en-GB');
						var arrTempDate=dateF.split("/");
						var followUpDate = arrTempDate[2] + "-" + arrTempDate[1]+ "-" + arrTempDate[0];
								resultExistingPatient = resultExistingPatient	+ '<tr> '
			
								+ '	<td >' +r.lstFolloupPatientList[i].patient_name
								+'<br> <button type="submit" class="btn btn-primary" style="font-size: 13px;padding: 2px;margin: 3px 0 0;"  onclick="setFollowUpId('+r.lstFolloupPatientList[i].follow_up_id+','+r.lstFolloupPatientList[i].patient_id+'),changeAppointmentOfNewPatientNew('+r.lstFolloupPatientList[i].patient_id+') ">Schedule Appointment</button>'
								+'</td>'
								
								+ '	<td >' + r.lstFolloupPatientList[i].doctor_name
								+ '<br> <button type="submit" class="btn btn-danger" style="font-size: 13px;padding: 2px;margin: 3px 0 0;" onclick="cancelFollowUp('+r.lstFolloupPatientList[i].follow_up_id+')">Cancel</button>'
								+'</td>'
								
								+ '	<td >' +followUpDate
								
								+'</td>'

								+ '</tr>'
										
								
						}
					
					resultExistingPatient = resultExistingPatient + '</tbody>';
					$("#followUpPatientList").html(resultExistingPatient);
			}
			//follow up patient list

			
		}
	});
}


function cancelFollowUp(followUpId){

	
	jQuery.ajax({
		async 	: false,
		type 	: "POST",
		data 	: {
		 "followUpId" : followUpId,
 			},
		url 	: "ehat/scheduler/cancelPatientFollowUp",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			alert('Network Issues !');
		},
		success : function(r) {
			if(r==1){
				alert("FollowUp Cancel Sucessfully");
				fetchFollowUpNew();
			}else{
				alert('Network Issues !');
			}
		}
	});

	
}


function getDocSpecilizationByDoctorId(docId,specId) {
	
	
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