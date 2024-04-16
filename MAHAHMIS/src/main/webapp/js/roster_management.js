//function added by kishor for  set date dynamic
function setDays() {

	if ($('#scheduledate').val() == null || $('#scheduledate').val() == "") {
		alert("Please Select Date First");
		return false;
	}
	
	var duration = $("#duration option:selected").val();

	var days = 0;
	if (duration == 0) {
		alert("Please Select Max Duration ");
		return false;
	} else if (duration == 1) {
		days = 7;
	} else if (duration == 2) {
		days = 14;
	} else if (duration == 3) {
		days = 21;
	} else if (duration == 4) {
		days = 28;
	} else if (duration == 5) {
		days = 35;
	} else if (duration == 6) {
		days = 29;
	} else if (duration == 7) {
		days = 30;
	} else if (duration == 8) {
		days = 31;
	}else if (duration == 9) {
		days = 1;
	}

	var masterModuleBody = "";
	for ( var a = 0; a <= days - 1; a++) {
		var daysAllName = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday',
				'Thursday', 'Friday', 'Saturday' ];

		var myDate = $('#scheduledate').val();
		var res = myDate.split("-");
		
		var mainRes = res[2] + "," + res[1] + "," + res[0];
		
		var d = new Date(mainRes);
		
		next_date = new Date(d.setDate(d.getDate() + a));
		
		var dayName = daysAllName[d.getDay()];

		// alert(next_date);
		masterModuleBody = masterModuleBody + '<tr>'
				+ '<td class="col-md-1 center"  id="checkboxidss' + (a + 1)
				+ '" ><input type="checkbox"  id="checkboxid' + (a + 1)	+ '" name ="checkboxid' + (a + 1) + '" checked="checked"></td>'
				+ '<td class="col-md-1 center"  id="daysAndDate' + (a + 1)
				+ '">' + dayName + ' '
				+ (next_date).toLocaleDateString('en-GB');
		+'</td>' + '</tr>';
	}
	$("#setDatetime").html(masterModuleBody);

}

// added by ajay:26/09/2019 save Roster Scheduler
function saveRosterSchedule() {
	var schedulerId = $("#schedulerId").val();
	
	
	var scheduleStardate = $("#scheduledate").val();
	
	if (scheduleStardate == null || scheduleStardate == "") {
		alert("Please Select Date First");
		return false;
	}
	
	
	var nameSchedule = $("#name").val();
	
	
	if (nameSchedule == null ||nameSchedule == "") {
		alert("Please Enter Name");
		return false;
	}
	

	var maxDuration = $("#duration").val();
	//alert(maxDuration);
	if (maxDuration == null ||maxDuration == "" || maxDuration == 0) {
		
		alert("Please select Max Duration");
		return false;
	}
	
	if (maxDuration == 1) {
		maxDuration = "1 Week";
	}
	if (maxDuration == 2) {
		maxDuration = "2 Week";
	}

	if (maxDuration == 3) {
		maxDuration = "3 Week";
	}

	if (maxDuration == 4) {
		maxDuration = "4 Week";
	}

	if (maxDuration == 5) {
		maxDuration = "5 Week";
	}

	if (maxDuration == 6) {
		maxDuration = "29 days";
	}

	if (maxDuration == 7) {
		maxDuration = "30 days";
	}

	if (maxDuration == 8) {
		maxDuration = "31 days";
	}
	if (maxDuration == 9) {
		maxDuration = "1 day";
	}
	var tableRows = $('#setDatetime tr').length;
	var scheduleDetails = {
		scheduleDetailsList : []
	};
	for ( var index = 1; index <= tableRows; index++) {

		if ($('#checkboxid' + index).is(":checked")) {
			checkboxid = "Y";// it is checked

		} else {
			checkboxid = "N";

		}
		var resultDayAndDate = document.getElementById("daysAndDate" + index).innerText;
		var res = resultDayAndDate.split(" ");
		var resDay = res[0];
		var resDate = res[1];

		scheduleDetails.scheduleDetailsList.push({
			datechecked : checkboxid,
			resDay : resDay,
			resDate : resDate,
			schedulerId : schedulerId,
			scheduleStardate : scheduleStardate,
			nameSchedule : nameSchedule,
			maxDuration : maxDuration,

		});
	}

	scheduleDetails = JSON.stringify(scheduleDetails);

	var inputs = [];
	inputs.push("scheduleDetails=" + encodeURIComponent(scheduleDetails));
	inputs.push("schedulerId=" + encodeURIComponent(schedulerId));

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/rosterschedule/saveRosterschedule",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			
			if(r == 1) {
				alert("Record saved successfully..!");
			}if(r == 2){
				alert("already roster present");
			} 
			getRosterList();
			refreRosterSchedule();
		}
	});
}

//added by ajay:26/09/2019 get retrive data form RosterSchedule
function getRosterScheduleList() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/rosterschedule/getRosterScheduleList",

		success : function(r) {
			
			//setTemplateshiftMaster(r);// call template
		}
	});
}

// added by ajay:26/09/2019 save shift master
function saveShiftMaster() {
	
	
	var shiftId = $("#shiftId").val();
	
	var shiftname = $("#Shiftname").val();
	
	if (shiftname == null || shiftname == "") {
		alert("Please Enter Shift Name");
		return false;
	}
	
	var abbrevation = $("#abbrevation").val();
	
	if (abbrevation == null || abbrevation == "") {
		alert("Please Enter Abbrevation");
		return false;
	}
	
	var location = $("#location").val();
	if (location == null || location == "") {
		alert("Please Enter Location");
		return false;
	}
	
	var startTime = $("#startTime").val();
	
	if (startTime == null || startTime == "") {
		alert("Please Enter Start Time");
		return false;
	}
	
	var sameDay = $("#sameDay").val();
	if (sameDay == null || sameDay == "") {
		alert("Please Enter Same Day ");
		return false;
	}
	
	var endTime = $("#endTime").val();
	if (endTime == null || endTime == "") {
		alert("Please Enter End Time ");
		return false;
	}
	
	var breakTime = $("#breakTime").val();
	if (breakTime == null || breakTime == "") {
		breakTime="00:00";
	}

	
	
	
	var inputs = [];
	inputs.push('shiftId=' + shiftId);
	inputs.push('shiftname=' + shiftname);
	inputs.push('abbrevation=' + abbrevation);
	inputs.push('location=' + location);
	inputs.push('startTime=' + startTime);
	inputs.push('sameDay=' + sameDay);
	inputs.push('endTime=' + endTime);
	inputs.push('breakTime=' + breakTime);

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/rosterschedule/saveShiftmaster",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(r) {
			if (r == 1) {
				alert("Record saved successfully..!");
			} else  if(r==2){
				alert("Record Update successfully..!");
			}else if(r==3){
				alert("Shift Name Already Exists..");
			}else{
				alert("Network Issue");
			}
			getShiftmasterList();
			refreshshiftmasterTest();
		}
	});
}

//added by ajay:26/09/2019 get retrive data form shift master
function getShiftmasterList() {

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/rosterschedule/getShiftmasterList",

		success : function(r) {
			setTemplateshiftMaster(r);// call template
		}
	});
}

//added by ajay:26/09/2019 get retrive data form shift master then set data setTemplateshiftMaster function
function setTemplateshiftMaster(r)
{
	var optionList = "<option></option>";

	var masterModuleBody = '<thead class="cf" style="background: wheat;" id="ehatTHead">'
			+ '<tr>'
			+ '<th  class="col-md-1 center" style="height: 21.5px;">#</th>'
		/*	+ '<th  class="col-md-1 center" style="height: 21.5px;">Shift ID</th>'*/
			+ '<th  class="col-md-1 center" style="height: 21.5px;">Shift Name</th>'
			+ '<th  class="col-md-1 center" style="height: 21.5px;">Abbrevation</th>'
			+ '<th  class="col-md-1 center" style="height: 21.5px;">Location</th>'
			+ '<th  class="col-md-1 center" style="height: 21.5px;">Start Time</th>'
			+ '<th class="col-md-1 center" style="height: 21.5px;">Same Day</th>'
			+ '<th class="col-md-1 center" style="height: 21.5px;">End Time</th>'
		/*	+ '<th class="col-md-1 center" style="height: 21.5px;">Break Time</th>'*/
			+ '<th class="col-md-1 center" >Edit</th>'
			+ '<th class="col-md-1 center" >Delete</th>'
			+ '<th class="col-md-1 center"></th>' + '</tr></thead>';

	for ( var int = 0; int < r.shiftmasterList.length; int++) {
	    	
		var sameday1 = r.shiftmasterList[int].sameDay;
		var Days;

		if (sameday1 == 1) {
			Days = "sameDay";

		}
		if (sameday1 == 2) {
			Days = "NextDay";
		}

		// alert(r.listOutSourceMaster.length);
		masterModuleBody = masterModuleBody
				+

				'<tr>'
				+ '<td id="row'
				+ (r.shiftmasterList[int].shiftId)
				+ '"  class="col-md-1 center" style="height: 21.5px;"">'
				+ (int + 1)
				+ '</td>'
				+ '<td id="shiftId'
				+ (r.shiftmasterList[int].shiftId)
				+ '"  class="col-md-1 center" style="display:none;"height: 21.5px;"">'
				+ (r.shiftmasterList[int].shiftId)
				+ '</td>'
				+ '<td id="shiftnamed'
				+ (r.shiftmasterList[int].shiftId)
				+ '"  class="col-md-1 center" style="height: 21.5px;"">'
				+ (r.shiftmasterList[int].shiftname)
				+ ' </td>'

				+ '<td id="abbrevation'
				+ (r.shiftmasterList[int].shiftId)
				+ '"  class="col-md-1 center" style="height: 21.5px;"">'
				+ (r.shiftmasterList[int].abbrevation)
				+ ' </td>'

				+ '<td id="location'
				+ (r.shiftmasterList[int].shiftId)
				+ '"  class="col-md-1 center" style="height: 21.5px;"">'
				+ (r.shiftmasterList[int].location)
				+ ' </td>'

				+ '<td id="startTime'
				+ (r.shiftmasterList[int].shiftId)
				+ '" class="col-md-1 center" >'
				+ (r.shiftmasterList[int].startTime)
				+ ' </td>'

				+ '<td id="daysss'
				+ (r.shiftmasterList[int].shiftId)
				+ '" class="col-md-1 center" >'+Days+ ' </td>'

				+ '<td id="endTime'
				+ (r.shiftmasterList[int].shiftId)
				+ '" class="col-md-1 center" >'
				+ (r.shiftmasterList[int].endTime)
				+ ' </td>'

			/*	+ '<td id="breakTime'
				+ (r.shiftmasterList[int].shiftId)
				+ '" class="col-md-1 center" >'
				+ (r.shiftmasterList[int].breakTime)
				+ ' </td>'
*/
				+ '<td  class="col-md-1 center" style="height: 21.5px;" ><button class="btn btn-xs btn-success " value="EDIT" id=btnEdit10'
				+ r.shiftmasterList[int].shiftId
				+ ' onclick="editShiftmaster('
				+ r.shiftmasterList[int].shiftId
				+ ')"><i class="fa fa-edit"></i></button></td>'

				+ '<td  class="col-md-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-danger deleteUserAccess" value="DELETE" id=btnDelete10 '
				+ r.shiftmasterList[int].shiftId
				+ ' onclick=deleteShiftmaster('
				+ r.shiftmasterList[int].shiftId
				+ ') > <i class="fa fa-trash-o"></i></button> </td>'

				+ '</tr>';

		optionList = optionList + "<option value="
				+ r.shiftmasterList[int].shiftId + ">"
				+ r.shiftmasterList[int].outSourcelabName + "</option>";
	}

	$("#masterModuleBodyShift").html(masterModuleBody);
	$("#ehatTable").html(masterModuleBody);

	}

//added by ajay:26/09/2019 Refresh function

function refreshshiftmasterTest() {
	$('#Shiftname').val(" ");
	$('#abbrevation').val(" ");
	$('#location').val(" ");
	$('#startTime').val(" ");
	$('#samedays').val(" ");
	$('#endTime').val(" ");
	$('#breakTime').val(" ");

}
//added by ajay:26/09/2019 edit function
function editShiftmaster(shiftId) {
	
    $('#shiftId').val(shiftId);
	$('#Shiftname').val($('#shiftnamed' + shiftId).html());
	$('#abbrevation').val($('#abbrevation' + shiftId).html());
	$('#location').val($('#location' + shiftId).html());
	$('#startTime').val($('#startTime' + shiftId).html());
	$('#samedays').val($('#daysss' + shiftId).html());
	$('#endTime').val($('#endTime' + shiftId).html());
	$('#breakTime').val($('#breakTime' + shiftId).html());
	/*refreshOutTest();*/	
}
//added by ajay:26/09/2019 delelted function
function deleteShiftmaster(shiftId) {

	if (shiftId == "" || shiftId == null || shiftId == undefined) {
		shiftId = 0;
	}
	var r = confirm("Are You Sure You Want To Delete Shift  Master?");
	if (r == true) {

		var inputs = [];

		inputs.push('shiftId=' + encodeURIComponent(shiftId));
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "ehat/rosterschedule/deleteshiftMaster",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert('Network Issue!');
					},
					success : function(r) {
						alert(r);
						getShiftmasterList(r);

					}
				});

	}
}



function setWeellyCalenderOnLoad() {
	
	var todays_date = $("#todays_date").val();
	var arrDate = todays_date.split("-");
	//alert(arrDate);
	$('#calendar').html("");
	$('#calendar').fullCalendar(
			{
			    header: {
			        left: 'prev,next today',
			        center: 'title',
			        right: 'month,agendaWeek,agendaDay,listWeek'
			    },
			    defaultDate: '2018-10-01',
			   // navLinks: true,
			    //eventLimit: true,
			    events: [{
			            title: 'Front-End Conference',
			            start: '2018-10-01',
			            end: '2018-10-02'
			        },
			        {
			            title: 'Hair stylist with Mike',
			            start: '2018-11-20',
			            allDay: true
			        },
			        {
			            title: 'Car mechanic',
			            start: '2018-11-14T09:00:00',
			            end: '2018-11-14T11:00:00'
			        },
			        {
			            title: 'Dinner with Mike',
			            start: '2018-11-21T19:00:00',
			            end: '2018-11-21T22:00:00'
			        },
			        {
			            title: 'Chillout',
			            start: '2018-11-15',
			            allDay: true
			        },
			        {
			            title: 'Vacation',
			            start: '2019-10-03',
			            end: '2019-10-02'
			        },
			    ]
});
	/*$('#calendar').fullCalendar('gotoDate', arrDate[0], (arrDate[1] - 1),
			arrDate[2]);*/

}
//added by ajay:26/09/2019 show popup function
function addNewShiftPopup() {
	$("#useraddShiftPopUp").show();
}
//added by ajay:26/09/2019 hide popup  function
function hideaddShiftpopup1() {
	refreshassignsfihtpopup();
	$("#useraddShiftPopUp").hide();
	

}
//added by ajay:26/09/2019 hide popup  function
function getShiftlist() {

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/rosterschedule/getShiftmasterList",

		success : function(r) {
			setTemplatename(r);// call template
		}
	});
}

function setTemplatename(r){
	
	var list="<option value='0'>-select-</option>";
	
	for ( var int = 0; int < r.shiftmasterList.length; int++) {
		list=list+'<option value="'+(r.shiftmasterList[int].shiftId)+'">'+(r.shiftmasterList[int].shiftname)+'</option>';
		
	}	
	$("#shiftid").html(list);

}
//added by ajay:26/09/2019 getshiftmasterRecordset  function and set value
function getshiftmasterRecordset()
{ 
		var shiftid = $('#shiftid').val();
		
		jQuery.ajax({
			async : false,
			type : "POST",
			data : {
				"shiftid" : shiftid,
			},
			url : "ehat/rosterschedule/geShiftMasterRecordList",
			success : function(r) {
				

					if (r.shiftmasterList.length > 0) {
						$('#startTime').val(r.shiftmasterList[0].startTime);
						$("#sameDay").val(r.shiftmasterList[0].sameDay);
						$("#location").val(r.shiftmasterList[0].location);
						$("#endTime").val(r.shiftmasterList[0].endTime);
					

				}
			}
		});

	}
//added by ajay:27/09/2019 checkOnedays if radio buttuon one day active  function and set value
function checkOnedays()
{
	
	

}
//added by ajay:27/09/2019 checkOnedays if radio buttuon all day active  function and set value
function chechAllDays()
{
	var tableRows = $('#setDatetime tr').length;
	
	for ( var index = 1; index <= tableRows; index++) {
	
	$("#checkboxidp" + index).prop("checked", true);
	
	}
		 

}
//added by ajay:27/09/2019 checkOnedays if radio buttuon some  day active  function and set value
function chehcsomeDays()
{
     var tableRows = $('#setDatetime tr').length;
	
	for ( var index = 1; index <= tableRows; index++) {
	
	$("#checkboxidp" + index).prop("checked", false);
	
	}
}

function getAllRoleForHrr(){
	jQuery.ajax({
		type : "POST",
		url : "useraccess/getAllRole",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			var roleListForHr = "<option value=''>Select</option>";
			for(var i=0;i<response.length;i++){
				roleListForHr = roleListForHr + "<option value='"+response[i].roleName+"'>"+response[i].roleName+"</option>";
			}
			$('#userType').html(roleListForHr);
			$('#userType').select2();
			
			$('#employeetype').html(roleListForHr);
			$('#employeetype').select2();
		}
	});
}

function getUserListFromType(){

	var userType = $("#userType option:selected").text();

		jQuery.ajax({
			async : false,
			type : "POST",
			data : {
				"userType" : userType
			},
			url : "ehat/rosterschedule/getUserListFromType",
			success : function(response) {

				var roleListForHr = "<option value=''>Select</option>";
				for(var i=0;i<response.length;i++){
					roleListForHr = roleListForHr + "<option value='"+response[i].userId+"'>"+response[i].userName+"</option>";
				}
				$('#employeeList').html(roleListForHr);
				$('#employeeList').select2();
				
				$('#employeeid').html(roleListForHr);
				$('#employeeid').select2();
			
			}
		});
	
}

function getUserListFromTypeOnPopUp(){


	var userType = $("#employeetype option:selected").text();

		jQuery.ajax({
			async : false,
			type : "POST",
			data : {
				"userType" : userType
			},
			url : "ehat/rosterschedule/getUserListFromType",
			success : function(response) {

				var roleListForHr = "";/*"<option value=''>Select</option>";*/
				for(var i=0;i<response.length;i++){
					roleListForHr = roleListForHr + "<option value='"+response[i].userId+"'>"+response[i].userName+"</option>";
				}
				
				$('#employeeid').html(roleListForHr);
				$('#employeeid').select2();
			
			}
		});
	

	
}


//added by ajay:26/09/2019 get retrive data form RosterSchedule
function getRosterScheduleList() {

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/rosterschedule/getRosterScheduleList",

		success : function(r) {
			setTemplateOnAssignShift(r);// call template
		}
	});
}
function setTemplateOnAssignShift(r) {
			
		var masterModuleBody = 
			+ '<tr>'
			+ '<th class="col-md-1 center" style="height: 21.5px;">'
			+ '<div class="TextFont">Time</div></th>';
		
				//for(var i=0;i< r.scheduleDetailsList.length;i++){
					
					masterModuleBody = masterModuleBody
					
					+ '<th bgcolor="#4863A0" class="col-md-1 center" style="height: 21.5px;">'
					+ '<div class="TextFont" style="color:white;">Sunday</div></th>'
					
					+ '<th bgcolor="#4863A0" class="col-md-1 center" style="height: 21.5px;">'
					+ '<div class="TextFont" style="color:white;">Monday</div></th>'
					
					+ '<th bgcolor="#4863A0" class="col-md-1 center" style="height: 21.5px;">'
					+ '<div class="TextFont" style="color:white;">Tuesday</div></th>'
					
					+ '<th bgcolor="#4863A0" class="col-md-1 center" style="height: 21.5px;">'
					+ '<div class="TextFont" style="color:white;">Wednesday</div></th>'
					
					+ '<th bgcolor="#4863A0" class="col-md-1 center" style="height: 21.5px;">'
					+ '<div class="TextFont" style="color:white;">Thursday</div></th>'
					
					+ '<th bgcolor="#4863A0" class="col-md-1 center" style="height: 21.5px;">'
					+ '<div class="TextFont" style="color:white;">Friday</div></th>'
					
					+ '<th bgcolor="#4863A0" class="col-md-1 center" style="height: 21.5px;">'
					+ '<div class="TextFont" style="color:white;">Saturday</div></th>'
					
					;
				//}
				
				masterModuleBody =masterModuleBody
				+ '</tr>'
				;


		$("#tHeadDayss").html(masterModuleBody);
		

		var timee = 00;
		var masterModuleBody1 = "";
		for ( var i = 1; i <= 24; i++) {
	
			masterModuleBody1 = masterModuleBody1 + '<tr>'
	
			+ '<td class="col-md-1 center" >' + timee + '.00</td>';
			for ( var j = 0; j < 7; j++) {
	
				masterModuleBody1 = masterModuleBody1 + '<td></td>';
	
			}
	
			masterModuleBody1 = masterModuleBody1 + '</tr>';
			timee = timee + 1;
		}
		$("#setTimeDetails").html(masterModuleBody1);
}

// added by ajay:27/09/2019 checkOnedays if chechedbox buttuon checheked
function checkCountbyactiveButton()
{

	var count = 1;
	var count1 = 0;
	if ($('#mondays').is(":checked")) {
		emergency = "Y";// it is checked
		count1 = count1 + count;
	}
	if ($('#tuesday').is(":checked")) {
		emergency = "Y";// it is checked
		count1 = count1 + count;
	}

	if ($('#wednesday').is(":checked")) {
		emergency = "Y";// it is checked
		count1 = count1 + count;

	}

	if ($('#thursday').is(":checked")) {
		emergency = "Y";// it is checked
		count1 = count1 + count;
	}

	if ($('#friday').is(":checked")) {
		emergency = "Y";// it is checked
		count1 = count1 + count;
	}

	if ($('#saturday').is(":checked")) {
		emergency = "Y";// it is checked
		count1 = count1 + count;
	}

	if ($('#sundays').is(":checked")) {
		emergency = "Y";// it is checked
		count1 = count1 + count;
	}

	if (count1 == 1) {

		$("#patienttype").prop("checked", true);
	}

	if (count1 == 7) {

		$("#Usertype").prop("checked", true);
	}

	if (count1 == 2 || count1 == 6) {

		$("#Doctortype").prop("checked", true);
	}

}
//added by ajay:27/09/2019 save shifttype master
function saveShiftAssignAllocation() {

	var shiftallocationId = $("#shiftallocationId").val();
	
	
	var shiftid = $("#shiftid").val();
	
	if (shiftid == null || shiftid == "") {
		alert("Please Select Shift type ");
		return false;
	}
	
	var date = $("#date").val();
	
	if (date == null || date == "") {
		alert("Please Select Date ");
		return false;
	}
	
	var startTime = $("#startTime").val();
	
	if (startTime == null || startTime == "") {
		alert("Please Select Start Time ");
		return false;
		
	}
	
	var endTime = $("#endTime").val();
	
	if (endTime == null || endTime == "") {
		alert("Please Select End Time ");
		return false;
	}
	
	var sameDay = $("#sameDay").val();
	
	if (sameDay == null || sameDay == "") {
		alert("Please Select same Day ");
		return false;
	}
	
	var name = $("#name").val();
	
	if (name == null || name == "") {
		alert("Please Enter Name ");
		return false;
	}
	
	var location = $("#location").val();
	
	if (location == null || location == "") {
		alert("Please Enter Location ");
		return false;
	}
	
	var colourId = $("#colourId").val();
	
	if (colourId == null || colourId == "") {
		alert("Please Select Colour ");
		return false;
	}
	
	var scheduleid = $("#scheduleid").val();
	
	if (scheduleid == null || scheduleid == "" ||  scheduleid == 0) {
		alert("Please Select Schedule Type ");
		return false;
	}
	
	
    var employeeid1 = $("#employeeid").val();
	
	if (employeeid1 == null || employeeid1 == "" ||  employeeid1 == 0) {
		alert("Please Select Employee  ");
		return false;
	}
	
	
    var employeetype1 = $("#employeetype").val();
	
	if (employeetype1 == null || employeetype1 == "" ||  employeetype1 == 0) {
		alert("Please Select Employee Type  ");
		return false;
	}
	
	
	
	var employeeidList = "";
	var employeetype = "";
	
	if(shiftallocationId == 0)
		{
		 employeetype = $("#employeetype option:selected ").val();
		 
		
		$('#employeeid option:selected').each(function() {
			if (!employeeidList == "") {
				employeeidList = employeeidList + "," + $(this).val();
				
			} else {
				employeeidList = $(this).val();

			}

		});
		
		}else // for update only one employee update 
			{
			    employeetype = $("#employeetype option:selected ").text();
				 var count = $("#employeeid :selected").length;		
		       	  if(count == 1)
				  {
					   employeeidList = $("#employeeid option:selected ").val(); 
						
				  }
					else
					{
						 alert("Can not Selected multiple Employee");
						 return false;		
					}
		
			}

	
 // Starting schedule Details added mutliple entry	
	var scheduleDays ="";
	var scheduleDate ="";
	var listchecked=[];
	var countChecked="";
	var res ="";
	var count = 0;
	$('input[name=checkboxidp]:checked').each(function() {
		
		listchecked = $(this).val();
		countChecked =$(this).length;
		count =  count + 1;
		 res = listchecked.split(" ");
		 scheduleDays += res[0] +",";
		 
		 scheduleDate += res[1]+",";
		 
		});
	
	

	var selecteddays = scheduleDays.substring(0, scheduleDays.length-1);
	
	var selectedDates = scheduleDate.substring(0, scheduleDate.length-1);
	
	// ending schedule Details added mutliple entry
	var shiftDetails = {
			shiftDetailsList : []
		};


	shiftDetails.shiftDetailsList.push({
		shiftallocationId :shiftallocationId,
		shiftid : shiftid,
		date :date,
		startTime :startTime,
		endTime :endTime,
		sameDay :sameDay,
		name :name,
		location :location,
		colourId :colourId,
		employeetype :employeetype,
		employeeidList :employeeidList,
		scheduleid :scheduleid,
		selecteddays :selecteddays,
		selectedDates :selectedDates,
		countOfDate :count,

			});

	shiftDetails = JSON.stringify(shiftDetails);
	
	
	var inputs = [];
	inputs.push("shiftDetails=" + encodeURIComponent(shiftDetails));
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str1 + "&reqType=AJAX",
		url : "ehat/rosterschedule/saveShiftTypeallocationmaster",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r == 1) {
				alert("Record saved successfully..!");
			} else {
				alert("Record Update successfully..!");
			}
			
			refreshassignsfihtpopup();
			hideaddShiftpopup1();

		}
	});
}


//added by ajay:26/09/2019 get retrive data form RosterSchedule and set popup shift assign 
function getRosterList() {
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/rosterschedule/getRosterList",

		success : function(r) {
			//alert(JSON.stringify(r));
			setTemplateOnAssignShiftschdule(r);// call template
		}
	});
}

function setTemplateOnAssignShiftschdule(r){
	
	var list="<option value='0'>--Select--</option>";
	
	for ( var int = 0; int < r.schedulerList.length; int++) {
		list=list+'<option value="'+(r.schedulerList[int].countid)+'">'+(r.schedulerList[int].nameSchedule)+'</option>';
		
	}	
	$("#scheduleid").html(list);
	$("#scheduleid").select2();
	$("#rosterList").html(list);
	$("#rosterList").select2();

}

//added by ajay:26/09/2019 get  getShiftTypeallocation 
function getShiftTypeallocation() {
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/rosterschedule/getShiftTypeallocation",

		success : function(r) {
			//setTemplateOnAssignShiftschdule(r);// call template
		}
	});
}


function getRosterScheduleListFromId(rosterListId) {

	//var rosterListId = $("#rosterList option:selected").val();
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"rosterListId" : rosterListId
		},
		url : "ehat/rosterschedule/getRosterScheduleListFromId",

		success : function(r) {
			//setTemplateOnAssignShift(r);// call template
			
			var masterModuleBody = 
				+ '<tr>'
				+ '<th class="col-md-1 center" style="height: 21.5px;">'
				+ '<div class="TextFont">Time</div></th>';
			
					for(var i=0;i< r.scheduleDetailsList.length;i++){
						
						masterModuleBody = masterModuleBody
						
						+ '<th class="col-md-1 center" style="height: 21.5px;">'
						+ '<div class="TextFont">'+r.scheduleDetailsList[i].resDay+'('+r.scheduleDetailsList[i].resDate+')</div></th>'
						;
					}
					
					masterModuleBody =masterModuleBody
					+ '</tr>'
					;


			$("#tHeadDayss").html(masterModuleBody);
		}
	});
}



function getRosterListOfEmployee() {

	var rosterListId = $("#rosterList option:selected").val();
	var employeeListId = $("#employeeList option:selected").val();

	if (rosterListId == 0 || rosterListId == null || rosterListId == "") {
		alert("Please Select Roster Type");
		return false;
	}

	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : {
					"rosterListId" : rosterListId
				},
				url : "ehat/rosterschedule/getRosterScheduleListFromId",

				success : function(r) {
					var masterModuleBody = +'<tr>'
							+ '<th class="col-md-1 center" style="height: 21.5px;">'
							+ '<div class="TextFont">Time</div></th>';

					for ( var i = 0; i < r.schedulerList.length; i++) {

						masterModuleBody = masterModuleBody

								+ '<th bgcolor="#4863A0" class="col-md-1 center" style="height: 21.5px;">'
								+ '<div class="TextFont" style="color:white;">'
								+ r.schedulerList[i].resDay + '('+ r.schedulerList[i].resDate+ ')</div></th>';
					}

					masterModuleBody = masterModuleBody + '</tr>';

					$("#tHeadDayss").html(masterModuleBody);

					jQuery
							.ajax({
								async : false,
								type : "POST",
								data : {
									"rosterListId" : rosterListId,
									"employeeListId" : employeeListId
								},
								url : "ehat/rosterschedule/getRosterListOfEmployee",

								success : function(rr) {
									

									var masterModuleBody1 = "";
									if (rr.shiftallocationlist.length > 0) {

										var timee = 00;
										var dayy = "Friday";
										var a = 0;
										var k = 0; // temp

										for ( var i = 1; i <= 24; i++) {
											masterModuleBody1 = masterModuleBody1
													+ '<tr>'

													+ '<td class="col-md-1 center" >'
													+ timee + '.00</td>';

							                   for ( var j = 0; j < r.schedulerList.length; j++)

										      {
												
							                	   var dynamicDate = ((r.schedulerList[j].resDate));
												
							                	   var dateFromAssignShift = rr.shiftallocationlist[0].selectedDates;

												
							                	   if (dynamicDate == undefined) {
													dynamicDate = "";
												
							                	   }
												
							                	   if (dateFromAssignShift == undefined) {
													dateFromAssignShift = "";
                                                  
							                	   }

												var mainTesting = false;
												var countInt = "";

											for ( var k = 0; k < rr.shiftallocationlist.length; k++)

												{ // temp multiple times

													var startTimeee = (rr.shiftallocationlist[k].startTime).split(":");

													var endTimeee = (rr.shiftallocationlist[k].endTime.split(":"));

													if (startTimeee[0] < timee
															&& endTimeee[0] >= timee)

													{
														mainTesting = true;
														countInt = k;
														break;

													}

												}
										
												if (mainTesting&& dateFromAssignShift.includes(dynamicDate))

												{
													var red = rr.shiftallocationlist[countInt].colourId;

													if (red == undefined) {
														red = "";
													}
													masterModuleBody1 = masterModuleBody1

															+ '<td id='+ rr.shiftallocationlist[countInt].shiftallocationId+ ' bgcolor="'+ red+ '" onclick="editShiftallocation('+ rr.shiftallocationlist[countInt].shiftallocationId+ ');"></td>';

												} else {
													masterModuleBody1 = masterModuleBody1
															+ '<td></td>';

												}
											}
											masterModuleBody1 = masterModuleBody1
													+ '</tr>';
											timee = timee + 1;

											if (a < rr.shiftallocationlist.length - 1) {

												a = a + 1;
											}

											$("#setTimeDetails").html(
													masterModuleBody1);
										}

									} else {

										alert("No Shift Present");

										var timee = 00;

										var masterModuleBody1 = "";
										for ( var i = 1; i <= 24; i++) {
											masterModuleBody1 = masterModuleBody1
													+ '<tr>'

													+ '<td class="col-md-1 center" >'
													+ timee + '.00</td>';
											for ( var j = 0; j < r.schedulerList.length; j++) {

												masterModuleBody1 = masterModuleBody1
														+ '<td></td>';

											}

											masterModuleBody1 = masterModuleBody1
													+ '</tr>';
											timee = timee + 1;
										}

										$("#setTimeDetails").html(masterModuleBody1);

									}
								}
							});

				}
			});

}




//added by ajay:30/09/2019 refreRosterSchedule  
function refreRosterSchedule() {
	$('#scheduledate').val(" ");
	$('#name').val(" ");
	$('#duration ').val(0);
	$('#setDatetime ').empty();
}


//added by ajay:30/09/2019 auto suggestion shift master
function setAutoCompleteForshiftMaster(inputId, callfrom) {
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName").val();
	}

	var inputs = [];

	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/rosterschedule/autoSuggestionshiftMasterNames",

		cache : false,
		success : function(r) {

			if (callfrom == "search") {

				setTemplateshiftMaster(r);

			} else {

			}

		}
	});
}

//added by ajay:30/09/2019 auto suggestion RosterS chedule master
function setAutoCompleteForRosterScheduleMaster(inputId, callfrom) {
	var letter = "";
	if (callfrom = "search") {
		letter = $("#byName").val();
	}

	var inputs = [];

	inputs.push('letter=' + letter);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/rosterschedule/autoSuggestionRosterScheduleNames",

		cache : false,
		success : function(r) {

			if (callfrom == "search") {

				setTemplateshiftMaster(r);

			} else {

			}

		}
	});
}

//added by ajay:30/09/2019 refreshassignsfihtpopup  
function refreshassignsfihtpopup() {
	$('#shiftid').val(" ");
	$('#date').val(" ");
	$('#startTime').val(" ");
	$('#sameDay').val(" ");
	$('#endTime').val(" ");
	$('#name').val(" ");
	$('#colourId').val(" ");
	$('#location').val(" ");
	$('#scheduleid ').select2('val',"");
	$('#employeetype ').select2('val',"");
	$('#employeeid ').select2('val',"");

	

}

function editShiftallocation(shiftallocationid)
{
	$("#deleteShift").show();

	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"shiftallocationid" : shiftallocationid,
		},
		url : "ehat/rosterschedule/editShiftallocation",
		success : function(r) {
			
		
			
				if (r.shiftallocationlist.length > 0) {
				$('#shiftallocationId').val(r.shiftallocationlist[0].shiftallocationId);
				$('#shiftid').val(r.shiftallocationlist[0].shiftid);
				$('#date').val(r.shiftallocationlist[0].date);
				$('#startTime').val(r.shiftallocationlist[0].startTime);
				$('#sameDay').val(r.shiftallocationlist[0].sameDay);
				$('#endTime').val(r.shiftallocationlist[0].endTime);
				$('#name').val(r.shiftallocationlist[0].name);
				$('#colourId').val(r.shiftallocationlist[0].colourId);
				$('#location').val(r.shiftallocationlist[0].location);	
				$("#employeetype").select2('val',r.shiftallocationlist[0].employeetype);
				$("#employeeid").select2('val',r.shiftallocationlist[0].employeeidList);
				$("#scheduleid").select2('val',r.shiftallocationlist[0].scheduleid);
			          
                var selecteddates = r.shiftallocationlist[0].selectedDates;

				var scheduleID = r.shiftallocationlist[0].scheduleid;
				
				$('#SelectedDatesHidden').val(selecteddates);	//temp
				$('#rosterscheduleId').val(scheduleID);	//temp
				callRosterSchedule(scheduleID, selecteddates);
				
				
				
				$("#useraddShiftPopUp").show();
				$("#rosterSchedulePopUp").show();
				

			}
		}
	});


}
function deleteShiftAllocation() {
	var  shiftallocationid = $('#shiftallocationId').val();

	if (shiftallocationid == "" || shiftallocationid == null || shiftallocationid == undefined) {
		shiftallocationid = 0;
	}
	var r = confirm("Are You Sure You Want To Delete Assign shift ?");
	if (r == true) {

		var inputs = [];

		inputs.push('shiftallocationid=' + encodeURIComponent(shiftallocationid));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/rosterschedule/deleteShiftAllocation",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				alert(r);
				refreshassignsfihtpopup();
				hideaddShiftpopup1();
				window.location.reload();
			}
		});

	}
}

// added by ajay :5/10/2019 : check availble time if already assign start time between to end time that time not accepted shift assign
function checkTimeDateExitingEmployee()
{ 
	var employeeid = $('#employeeid option:selected').val();
    var endTime = $('#endTime').val();
	var startTime = $('#startTime').val();
	
    var scheduleid = $("#scheduleid").val();
    
	if (scheduleid == null || scheduleid == "" ||  scheduleid == 0) {
		alert("Please Select Schedule Type ");
		return false;
	}

	var scheduleDate ="";
	var listchecked=[];

	var res ="";
	
	$('input[name=checkboxidp]:checked').each(function() {
		
		listchecked = $(this).val();
		 res = listchecked.split(" ");
		 scheduleDate += res[1]+",";
		 
		});
	var selectedDates = scheduleDate.substring(0, scheduleDate.length-1);

	
		jQuery.ajax({
			async : false,
			type : "POST",
			data : {
				"employeeid" : employeeid,
				"startTime" : startTime,
				"endTime" : endTime,
				"scheduleid" : scheduleid,
				"selectedDates" : selectedDates,
			},
			url : "ehat/rosterschedule/checkTimeDateExitingEmployee",
			success : function(r) {
				
				  if (r > 0) {
				    alert("already Shift Present that Time");
				    $('#employeeid ').select2('val',"");
				    return false;
				  } 
				
			}
		});

	}
// added by ajay:5/10/2019/ if date are change then refresh value on employee type and employee value
function refreshonEmployeetypeAndEmployee()
{
	
	$('#employeeid ').select2('val',"");
	$('#employeetype ').select2('val',"");
}


//Added by Kishor For dashboard view
function setTemplateOnDashboard() {
			
		var masterModuleBody = 
			+ '<tr>';
			/* + '<th class="col-md-1 center" style="height: 21.5px;">';
			+ '<div class="TextFont">Time</div></th>';*/
		
				//for(var i=0;i< r.scheduleDetailsList.length;i++){
					
					masterModuleBody = masterModuleBody
					
					+ '<th bgcolor="#4863A0" class="col-md-1 center" style="height: 21.5px;">'
					+ '<div class="TextFont" style="color:white;">Sunday</div></th>'
					
					+ '<th bgcolor="#4863A0" class="col-md-1 center" style="height: 21.5px;">'
					+ '<div class="TextFont" style="color:white;">Monday</div></th>'
					
					+ '<th bgcolor="#4863A0" class="col-md-1 center" style="height: 21.5px;">'
					+ '<div class="TextFont" style="color:white;">Tuesday</div></th>'
					
					+ '<th bgcolor="#4863A0" class="col-md-1 center" style="height: 21.5px;">'
					+ '<div class="TextFont" style="color:white;">Wednesday</div></th>'
					
					+ '<th bgcolor="#4863A0" class="col-md-1 center" style="height: 21.5px;">'
					+ '<div class="TextFont" style="color:white;">Thursday</div></th>'
					
					+ '<th bgcolor="#4863A0" class="col-md-1 center" style="height: 21.5px;">'
					+ '<div class="TextFont" style="color:white;">Friday</div></th>'
					
					+ '<th bgcolor="#4863A0" class="col-md-1 center" style="height: 21.5px;">'
					+ '<div class="TextFont" style="color:white;">Saturday</div></th>'
					
					;
				//}
				
				masterModuleBody =masterModuleBody
				+ '</tr>'
				;


		$("#tHeadDayssDashboard").html(masterModuleBody);
		

		var timee = 00;
		var masterModuleBody1 = "";
		for ( var i = 1; i <= 24; i++) {
	
			masterModuleBody1 = masterModuleBody1 + '<tr>'
	
			/*+ '<td class="col-md-1 center" style="height: 21.5px;"></td>'*/;
			for ( var j = 0; j < 7; j++) {
	
				masterModuleBody1 = masterModuleBody1 + '<td class="col-md-1 center" style="height: 21.5px;"></td>';
	
			}
	
			masterModuleBody1 = masterModuleBody1 + '</tr>';
			timee = timee + 1;
		}
		$("#setTimeDetailsOnDashboard").html(masterModuleBody1);
}




function getRosterScheduleListFromIdForDashboard(callfrom) {
	var employeeListId=0;
	var rosterListId = $("#rosterList option:selected").val();
	var userTypeNmae = $("#userType option:selected").val();
	
	if(callfrom == "userType")
		{
		employeeListId =1;
		if(rosterListId == 0 || rosterListId == null || rosterListId == ""){
			alert("Please Select Roster Type");
			return false;
		}	
		}else
			{
		 employeeListId = 0;
			}
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"rosterListId" : rosterListId
		},
		url : "ehat/rosterschedule/getRosterScheduleListFromId",

		success : function(r) {
			//setTemplateOnAssignShift(r);// call template
			if(r.schedulerList.length > 0){
				var masterModuleBody = 
					+ '<tr>'
					/*+ '<th class="col-md-1 center" style="height: 21.5px;">'
					+ '<div class="TextFont">Time</div></th>'*/;
				
						for(var i=0;i< r.schedulerList.length;i++){
							
							masterModuleBody = masterModuleBody
							
							+ '<th bgcolor="#4863A0" class="col-md-1 center" style="height: 21.5px;">'
							+ '<div class="TextFont" style="color:white;">'+r.schedulerList[i].resDay+'('+r.schedulerList[i].resDate+')</div></th>'
							;
						}
						
						masterModuleBody =masterModuleBody
						+ '</tr>'
						;


				$("#tHeadDayssDashboard").html(masterModuleBody);
				
				jQuery.ajax({
					async : false,
					type : "POST",
					data : {
						"rosterListId" : rosterListId,
						"employeeListId" : employeeListId,
						"userTypeNmae" : userTypeNmae
					},
					url : "ehat/rosterschedule/getRosterListOfEmployeeTypeForDashboard",

					success : function(rr) {
						//alert(rr.shiftDetailsList.length);
						if(rr.shiftallocationlist.length > 0){
						//alert(rr.shiftDetailsList[0].selecteddays);
						
						
						var masterModuleBody1="";
						//var red="#4863A0";
						//for(var i=1;i<= 24;i++){
						for(var i=0;i< rr.shiftallocationlist.length;i++){
							masterModuleBody1 = masterModuleBody1
							+ '<tr style="height: 21.5px;">'
							
							/*+ '<td class="col-md-1 center" >'+timee+'.00</td>'*/;
							for(var j=0;j< r.schedulerList.length;j++){
								
								var resDate=(r.schedulerList[j].resDate);
								var selectedDates = rr.shiftallocationlist[i].selectedDates;
								var selectedDatesss = r.schedulerList[j].resDate.toString();
								
								
								
								if( selectedDates.includes(resDate)) {
								
									var red=rr.shiftallocationlist[i].colourId;
									if(red == undefined){
										red="";
									}
									
									masterModuleBody1 = masterModuleBody1
									+ '<td  style="cursor:pointer; color:white;" value='+r.schedulerList[j].resDate+' id='+rr.shiftallocationlist[i].employeetype+"_"+selectedDatesss+' bgcolor="'+red+'" onclick="showPopUpOfShiftDashboard(this.id,'+rr.shiftallocationlist[i].scheduleid+');">'+(rr.shiftallocationlist[i].employeetype).toUpperCase()+'</td>';
								}else{
									masterModuleBody1 = masterModuleBody1
									+ '<td></td>';
								}
								
							}
							
							masterModuleBody1 = masterModuleBody1
							+ '</tr>';
						}
						//}
						
						$("#setTimeDetailsOnDashboard").html(masterModuleBody1);
					}else{
						alert("No Shift Present");

						//alert(rr.shiftDetailsList[0].selecteddays);
						var timee=00;
						
						var masterModuleBody1="";
						for(var i=1;i<= 24;i++){
							masterModuleBody1 = masterModuleBody1
							+ '<tr>'
							
							+ '<td class="col-md-1 center" >'+timee+'.00</td>';
							for(var j=0;j< r.schedulerList.length;j++){
								
									masterModuleBody1 = masterModuleBody1
									+ '<td></td>';
								
							}
							
							masterModuleBody1 = masterModuleBody1
							+ '</tr>';
							timee=timee + 1;
						}
						
						$("#setTimeDetails").html(masterModuleBody1);
					
						//return false;
					}
				}
				});
			}else{
				setTemplateOnDashboard();
			}
			
			
			
		}
	});

	
	

	//var rosterListId = $("#rosterList option:selected").val();
	

	
}
//added by ajay:5/10/2019/ get value roster scheduler  and set 
function getrosterListbyId() {

	var rosterListId = $("#rosterList option:selected").val();
	if (rosterListId == null || rosterListId == "" ||  rosterListId == 0) {
		alert("Please Select Schedule Type ");
		return false;
	}
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"rosterListId" : rosterListId
		},
		url : "ehat/rosterschedule/getrosterDateinsertTime",

		success : function(r) {
			
			
			if (r.schedulerList.length > 0) {
			
				$('#scheduledate').val(r.schedulerList[0].scheduleStardate);
				$('#name').val(r.schedulerList[0].nameSchedule);
			
				
				var duration = r.schedulerList[0].maxDuration;
			
				var max = 0;
				if (duration == "1 Week") {

					max = 1;
				}
                if (duration == "2 Week") {

					max = 2;
				}
				if (duration == "3 Week") {

					max = 3;
				}
				if (duration == "4 Week") {

					max = 4;
				}
				if (duration == "5 Week") {

					max = 5;
				}
				if (duration == "29 days") {

					max = 6;
				}
				if (duration == "30 days") {

					max = 7;
				}
				if (duration == "31 days") {

					max = 8;
				}if (duration == "1 day") {

					max = 9;
				}
				$("#duration").val(max);
				
	
			}
			
			
			 setRoterListDetails(r);
			
		}
	});
}


/*******************************************************************************
 * @author : Ajay khandare
 * @date : 05-10-2019
 * @codeFor : get value roster scheduler and set
 ******************************************************************************/
function setRoterListDetails(r) {

	var divContent = "";
	
	for ( var i = 0; i < r.schedulerList.length; i++) {
	
		divContent = divContent

				+ "<tr><td class='center' style='height: 21.5px;'>"
				+ r.schedulerList[i].resDay+"</td>"
				+ "<td class='center' style='height: 21.5px;'>"	
				+ r.schedulerList[i].resDate
				+ "</td>";
			

	}

	$('#setDatetime').html(divContent);
}


function rotserSchedulepopup()
{
	$("#rosterSchedulePopUp").show();
	//getrosterDate();
}

function rotserSchedulehidepopup()
{
	$("#rosterSchedulePopUp").hide();
	
}

//added by ajay:7/10/2019/ get date roster scheduler
function getrosterDate() {
	

	var rosterListId = $("#scheduleid option:selected").val();

	if (rosterListId == null || rosterListId == "" ||  rosterListId == 0) {
		alert("Please Select Schedule Type ");
		return false;
	}
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"rosterListId" : rosterListId
		},
		url : "ehat/rosterschedule/getrosterDateinsertTime",

		success : function(r) {
			
			 setRoterDateDetails(r);
			 rotserSchedulepopup();
		}
	});
}


/************
* @author	: Ajay khandare
* @date		: 07-10-2019
* @codeFor	:  get value roster scheduler  and set 
 ************/
function setRoterDateDetails(r) {
	

	var divContent = "";
	
	for ( var i = 0; i < r.schedulerList.length; i++) {
	
		divContent = divContent
		+ "<tr><td class='col-md-1' style='height: 21.5px;'>"
		+ " <input type='checkbox'  class='form-control input-SmallText' id='checkboxidp"+ (i + 1)+ "'  value='"+ r.schedulerList[i].resDay+ " "+r.schedulerList[i].resDate+"' name='checkboxidp' checked='checked'></td>"
		
		+ "<td class='col-md-1' style='height: 21.5px;'>"
		+ " <input type='text'  readonly='readonly' class='form-control input-SmallText' id='scheduleDays"
		+ (i + 1)
		+ "' value='"
		+ r.schedulerList[i].resDay
		+ "'></td>"

		+ "<td class='col-md-1' style='height: 21.5px;'>"
		+ " <input type='text'  readonly='readonly' class='form-control input-SmallText' id='scheduleDate"
		+ (i + 1)
		+ "' value='"
		+ r.schedulerList[i].resDate
		+ "'></td>";
		


	}

	$('#setDatetime').html(divContent);
}



//added by ajay:9/10/2019/ get date roster scheduler
function getrosterDateEdit(scheduleId,selecteddates) {
	
	var scheduleId1 = "";
	
	
	if (scheduleId > 0) {
		scheduleId1 =scheduleId;
       
		employeetype = $("#employeetype option:selected").val();
     	employeeid = $("#employeeid option:selected").val();
	
	} else {
		scheduleId1 = $("#scheduleid option:selected").val();
	
		employeetype = $("#employeetype option:selected").val();
		
		employeeid = $("#employeeid option:selected").val();
		
	}

	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"rosterListId" : scheduleId1,
			"employeeType" : employeetype,
			"employeeId" : employeeid
		},
		url : "ehat/rosterschedule/getrosterDate",

		success : function(r) {
		
				var selecteddates = "";
				if (r.schedulerList.length > 0) {
				selecteddates = r.schedulerList[0].selectedDates;
				
			}
			
			 setRoterDateDetailsEdit(r,selecteddates);
			 rotserSchedulepopup();
		}
	});
}


/************
* @author	: Ajay khandare
* @date		: 09-10-2019
* @codeFor	:  get value roster scheduler  and set 
 ************/
function setRoterDateDetailsEdit(r,selecteddatesShift) {
	
	var divContent = "";

	

	if(selecteddatesShift == undefined)
		{
	
		for ( var i = 0; i < r.scheduleDetailsList.length; i++) {
			
			divContent = divContent
			+ "<tr><td class='col-md-1' style='height: 21.5px;'>"
			+ " <input type='checkbox'  class='form-control input-SmallText' id='checkboxidp"+ (i + 1)+ "'  value='"+ r.scheduleDetailsList[i].resDay+ " "+r.scheduleDetailsList[i].resDate+"' name='checkboxidp'></td>";
			
			
			divContent = divContent
			+ "<td class='col-md-1' style='height: 21.5px;'>"
			+ " <input type='text'  readonly='readonly' class='form-control input-SmallText' id='scheduleDays"
			+ (i + 1)
			+ "' value='"
			+ r.scheduleDetailsList[i].resDay
			+ "'></td>"
			divContent = divContent
			+ "<td class='col-md-1' style='height: 21.5px;'>"
			+ " <input type='text'  readonly='readonly' class='form-control input-SmallText' id='scheduleDate"
			+ (i + 1)
			+ "' value='"
			+ r.scheduleDetailsList[i].resDate
			+ "'></td>";
	
		}
	
		
		}else
			{
	
			for ( var i = 0; i < r.schedulerList.length; i++) {
				var scheduleDate= r.schedulerList[i].resDate;
			
				if(selecteddatesShift.includes(scheduleDate)) {
				
				divContent = divContent
				+ "<tr><td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='checkbox'  class='form-control input-SmallText' id='checkboxidp"+ (i + 1)+ "'  value='"+ r.schedulerList[i].resDay+ " "+r.schedulerList[i].resDate+"' name='checkboxidp' checked='checked'></td>";
				
				}
				else
					{
					divContent = divContent
					+ "<tr><td class='col-md-1' style='height: 21.5px;'>"
					+ " <input type='checkbox'  class='form-control input-SmallText' id='checkboxidp"+ (i + 1)+ "'  value='"+ r.schedulerList[i].resDay+ " "+r.schedulerList[i].resDate+"' name='checkboxidp'></td>";

					}
				divContent = divContent
				
				+ "<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='text'  readonly='readonly' class='form-control input-SmallText' id='scheduleDays"
				+ (i + 1)
				+ "' value='"
				+ r.schedulerList[i].resDay
				+ "'></td>"

				+ "<td class='col-md-1' style='height: 21.5px;'>"
				+ " <input type='text'  readonly='readonly' class='form-control input-SmallText' id='scheduleDate"
				+ (i + 1)
				+ "' value='"
				+ r.schedulerList[i].resDate
				+ "'></td>";
		
			}
			
			}
	

	$('#setDatetime').html(divContent);
}
//added by ajay:9/10/2019/ callRosterSchedule selete on scheduletype that time call this function
function callRosterSchedule(scheduleID,selecteddates)
{
	
	
	var SelectedDatesHidden = $("#SelectedDatesHidden").val();
	var shiftallocationId = $("#shiftallocationId").val();
	var rosterscheduleId = $("#rosterscheduleId").val();
	
	if (shiftallocationId == 0) {
		getrosterDate();
	} else {
		
		getrosterDateEdit(scheduleID,SelectedDatesHidden);
		
	}

}


function showPopUpOfShiftDashboard(employeetype,scheduleid){
	
    var res = employeetype.split("_");
	var employeetypee = res[0];
	var resDate = res[1];
	
	if(scheduleid == undefined || scheduleid == "" || scheduleid == null){
		alert("Please select Roster Type");
		return false;
	}
	if(employeetypee == undefined || employeetypee == ""){
		alert("Please select Employee Type");
		return false;
	}
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"rosterListId" : scheduleid,
			"resDate" : resDate,
			"userTypeName" : employeetypee
		},
		url : "ehat/rosterschedule/showPopUpOfShiftDashboard",

		success : function(r) {
			
			
			
			$("#userShiftDashboardPopUp").show();
			
			
			var masterModuleBody = "";
			
					for(var i=0;i< r.shiftallocationlist.length;i++){
						
						masterModuleBody = masterModuleBody
						+ '<tr>'
						+ '<td class="col-md-1 center" style="height: 21.5px;">'+r.shiftallocationlist[i].userName+'</td>'
						+ '<td class="col-md-1 center" style="height: 21.5px;">'+(r.shiftallocationlist[i].userType).toUpperCase()+'</td>'
						+ '<td class="col-md-1 center" style="height: 21.5px;">'+r.shiftallocationlist[i].startTime+'</td>'
						+ '<td class="col-md-1 center" style="height: 21.5px;">'+r.shiftallocationlist[i].endTime+'</td>'
						
						+ '</tr>'
						;
					}
			$("#tHeadDash").html(masterModuleBody);
			
		}
	});

}

function closePopUpOnDashboard(){
	
	$("#userShiftDashboardPopUp").hide();


}
//adding by ajay: validate current date to previous date	
function validateDateRosterScheduler()
{
	var date = new Date();
	var now = new Date((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
	
	var arrSceduleDate = ($("#scheduledate").val()).split("-");
	
	var selectedDate = new Date(arrSceduleDate[1] + "/" + arrSceduleDate[0]	+ "/" + arrSceduleDate[2]);

	if ((selectedDate < now)) {
		alert('roster scheduler not availables for previous date,please select another date');
         $("#scheduledate").val("");
		return false;
	} 
}

function getSpecializationInfo() {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/admin/gethospitalspcializationList",
		success : function(r) {
			
			setspcializationList(r);
		}
	});
}

function setspcializationList(r)
{
	var listspec="";
	listspec = listspec + "<select class='col-md-12'><option value='0'>--Select --</option>";
	for(var i=0;i<r.hospitalspclgetlist	.length;i++)
	{
		listspec=listspec+'<option value="'+r.hospitalspclgetlist[i].specialisationId+'">'+r.hospitalspclgetlist[i].specializationName+'</option>';
	}
	$("#selDocSpec").html(listspec);
}
