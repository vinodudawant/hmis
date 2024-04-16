/*Consulting Room Master*/
function insertRoom(){
	var roomId = $('#masterRoomId').val();
	if(roomId=="" || roomId==null){
		saveRoom();
	}
	else{
		saveRoom();
	}
}

//Save Rooms.
function saveRoom(){
	
	var roomId= $('#roomId').val();
	var roomName = $('#roomName').val();

	if(roomId == "" || roomId == null || roomId == undefined){
		roomId = 0;
	}
	var inputs = [];	
	inputs.push('roomId=' + roomId);
	inputs.push('roomName=' + roomName);
	var str = inputs.join('&');
	
	if(roomName!="" && roomName!=null || roomName== undefined){
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/scheduler/saveRoom",
		data	: str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			alert(response);
			refreshRoomMaster();
		}
	});
	}
	else{
		alert("Please enter room name");
	}
}

function refreshRoomMaster(){
	$('#masterRoomId').val("");
	$('#roomName').val("");
	$('#roomId').val(0);
	getAllRoom();
}

//Fetch Rooms
function getAllRoom(){
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/scheduler/getAllRoom",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			//alert(response);
			var roomBody="";
			var index = 1;
			for(var i=0;i<response.listSchedulerRoomMasterDto.length;i++){
				roomBody = roomBody + "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"+index+"</td>" 
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"+response.listSchedulerRoomMasterDto[i].roomId+"</td>" 
				+"<td id='rName"+response.listSchedulerRoomMasterDto[i].roomId+"' class='col-sm-1-1 center' style='height: 21.5px;'>"+response.listSchedulerRoomMasterDto[i].roomName+"</td>"
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+"<button class='btn btn-xs btn-success editUserAccess' onclick='getRoomByRoomId("+response.listSchedulerRoomMasterDto[i].roomId+")' disabled='disabled'><i class='fa fa-edit'></i>"
				+"</button><td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteUserAccess' onclick='deleteRoom("+response.listSchedulerRoomMasterDto[i].roomId+")' disabled='disabled'><i class='fa fa-trash-o'></i></button></td></tr>";
				index++;
			}
			//$('#roomId').val(index);
			$('#roomName').val("");
			$('#masterRoomBody').html(roomBody);
			setTimeout(function(){userAccess();},100);
		}
	});
}


function getRoomByRoomId(roomId){
	
			$('#roomId').val(roomId);
			$('#masterRoomId').val(roomId);
			$('#roomName').val($('#rName' + roomId).html());
}

//delete room
function deleteRoom(roomId){
	var r = confirm("Are you sure you want to delete room?");
    if (r == true){
	jQuery.ajax({
		type : "POST",
		url : "ehat/scheduler/deleteRoom",
		data : {
			"roomId" : roomId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshRoomMaster();
			//alert(response);
		}
	});
	}
}

//Save Time Slots

function saveDoctorSlotTime() {
	var divDocName=$("#divDocName").val();
	if(divDocName==0){
		alert("Plese select Doctor Name");
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
		inputs.push('queryType=' + $("#queryType").val());
		inputs.push('status=' + "Y");
		inputs.push('idschedularDoctorTimeSlot=' + $("#idschedularDoctorTimeSlot").val());
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
		}
	});
};



//To fetch time slot and set.
function getDoctorTimeSlotDetails() {

	var inputs = [];
	inputs.push('doctorId=' + $("#divDocName").val());
	inputs.push('pageName=SchedulingDoctorSlot');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
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
				$("#queryType").val("save");
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
				$("#queryType").val("update");
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

/*
//get all doctor name on onload
function getAllDoctorListNew(callFrom){
	
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
		url : "ehat/scheduler/getAllDoctorList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			var selectList = "<option value=''>Select Room</option>";
			for(var i=0;i<response.listSchedulerRoomMasterDto.length;i++){
				selectList = selectList + "<option value='"+response.listSchedulerRoomMasterDto[i].roomId+"'>"+response.listSchedulerRoomMasterDto[i].roomName+"</option>";
			}
			$("#divDocName").processTemplate(selectList);
		}
	});
}*/


//To Fetch all hosp specialisation
function getHospSpecialization1() {
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/profees/getHospSpecialization",
		error : function() {
			alert('error');
		},
		success : function(r) {
		
			setTempHospSpeacialisation(r);//call template
		}
	});
}


// To Set hosp specialisation
function setTempHospSpeacialisation(r) {

	var list = "<option value='0'>--Select--</option>";//static value as 0
	for ( var i = 0; i < r.listHospSpcl.length; i++) {

		list = list + "<option value='" + r.listHospSpcl[i].specialisationId + "'>"
				+ (r.listHospSpcl[i].specializationName) + "</option>";
	}
	$("#selHosDept").html(list);//setting list on selectbox id
	$("#selHosDeptNew").html(list);//setting list on selectbox id
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

	} else {
		appointmentDate = $("#idTourDateDetails").val();
		arrDate = ($("#idTourDateDetails").val()).split("/");
		doctorId = $("#selDoctorName").val();
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
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
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
					//alert(ajaxResponse);
					$("#DocNotAvailable").html(ajaxResponse);
					
					//var pobj1 = eval('(' + ajaxResponse + ')');
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
			});
	}
}

//Show availbe doctors appontment
function showDoctorAppointmentsNew(callFrom) {
//alert("hi");
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
			
			if (na.liNA.length > 0) {
				for ( var j = 0; j < na.liNA.length; j++) {
					
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

			for ( var i = 0; i < r.liapp.length; i++) {
				if (r.liapp[i].docid == doctorId) {
					var appStartTime = r.liapp[i].aptf;
					var patientName;
					patientName = r.liapp[i].title + r.liapp[i].patNm + ' '
							+ r.liapp[i].lastName;
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
					var arrTempDate = (r.liapp[i].appdt).split("/");
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
			
			if (na.liNA.length > 0) {
				for ( var j = 0; j < na.liNA.length; j++) {
					
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

			for ( var i = 0; i < r.liapp.length; i++) {
				if (r.liapp[i].docid == doctorId) {
					var appStartTime = r.liapp[i].aptf;
					var patientName;
					patientName = r.liapp[i].title + r.liapp[i].patNm + ' '
							+ r.liapp[i].lastName;
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
					var arrTempDate = (r.liapp[i].appdt).split("/");
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
											alert("Select Patient");
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
		if (na.liNA.length > 0) {
			for ( var j = 0; j < na.liNA.length; j++) {
				
				// dateCompare function returns 1 if greater, -1 if less and 0 if the same
				//var checkStartTime = dateCompare(nAstartTime, doctorTime[0]);
				//var checkEndTime = dateCompare(nAendTime, doctorTime[1]);
				
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
				events1.push(event);
				events.push(event);
			}
		}
		//Kavita code End
		
		//for appointments scheduled
		for ( var i = 0; i < r.liapp.length; i++) {
			if (r.liapp[i].docid == doctorId) {
				var appStartTime = r.liapp[i].aptf;
				var patientName;
				patientName = r.liapp[i].title + r.liapp[i].patNm + ' '
						+ r.liapp[i].lastName;
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
				var arrTempDate = (r.liapp[i].appdt).split("/");
				var appStartDate = arrTempDate[2] + "-" + arrTempDate[1] + "-"
						+ arrTempDate[0];
				// var appStartDate = r.liapp[i].appdt;

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
								alert("Select Patient");
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

//AutoSuggestion

function setAutoPatientNameForSchedulerNew(inputID,callFrom,patSearchType) {
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	///var patSearchType = $("#patSearchType").val();
	//alert(findingName);
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
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
			autosuggesstionTempForSchedulerNew(r,inputID);
			
		}
	});
}

function  autosuggesstionTempForSchedulerNew(response, id) {
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
			valueField : 'patientName'
		}, /*
			 * { name : 'unitCode', //width : '80px', valueField :
			 * 'unitCode' }
			 */],

		// Event handler for when a list item is selected.
		select : function(event, ui) {
			//console.log(ui);
			
			var spl = (ui.item.spl = "" ? '' : ui.item.spl);
			if (ui.item.dn != 'No' && ui.item.spl != 'Record'
					&& ui.item.specialisationName != 'Found'
					&& ui.item.patientName != 'Match') {
			
				
				$('#hidpatId').val(ui.item.ptId);			   
				$("#byId").val(ui.item.ptId);	
				$("#byName").val(ui.item.patientName);	
				$("#byMobile").val(ui.item.mobile);
				//getPatientDetails(ui.item.ptId);
				getPatientDetailsNew(ui.item.ptId);
				
			}
			/*
			 * This function use for Enter keypress search
			 */
			
			//getAllPatientRecordsForScheduler(id,'search');
			//setDetailsToField();
			return false;
		},

		// The rest of the options are for configuring the ajax
		// webservice call.
		minLength : 1,
		source : function(request, response) {
			var data = myArray;
			var result;
			if (!data || data.lstRegviewDto.length === 0 || !data.lstRegviewDto
					|| data.lstRegviewDto.length === 0) {
				/*
				 * result = [{ label: 'No match found.' }];
				 */
				result = [ {
					/* 'dn' : 'No', */
					'patientName' : 'Record',
					'patientId' : 'Found',
				/* 'depNm' : 'Match' */
				} ];
			} else {
				result = data.lstRegviewDto;// Response List for All
				// Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}









function getAllDoctorListNewAll(){
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
		success : function(response) {/*
			var selectList = "<option value=''>Select Doctor</option>";
			for(var i=0;i<response.listDoctorDetailsDto.length;i++){
				selectList = selectList + "<option value='"+response.listDoctorDetailsDto[i].doctor_ID+"'>"+response.listDoctorDetailsDto[i].doc_name+"</option>";
			}
			$("#divDocName").html(selectList);*/
		}
	});
}










function changeAppointmentOfPatientNew(appointmentId) {
	if ($("#idTourDateDetails").val() == ""
			|| $("#idTourDateDetails").val() == null) {
		alert("Please Select Date");
		return false;
	}
	$("#divAllPatientList").html("");
	var appointmentType = $("#appointmentType").val();
	
	var myObj = null;
	
	if(appointmentType == "ReSchedule"){
		var pobj = $("#reScheduleList").html();
		pobj = eval('(' + pobj + ')');
		for ( var i = 0; i < pobj.liapp.length; i++) {
			if (pobj.liapp[i].apid == appointmentId) {
				myObj = pobj.liapp[i];
			}
		}
	}else{
		var divAppo = $("#divAppo").html();
		divAppo = eval('(' + divAppo + ')');
		for ( var i = 0; i < divAppo.liapp.length; i++) {
			if (divAppo.liapp[i].apid == appointmentId) {
				myObj = divAppo.liapp[i];
			}
		}
	}
	
	if (myObj.nt != "") {
		$("#textareaNote").val(myObj.nt);
	} else {
		$("#textareaNote").val(myObj.det);
	}
	//alert(myObj);
	$("#hidpatId").val(myObj.patid);
	getPatientDetailsNew(myObj.patid);
	$("#appointmentId").val(myObj.apid);
	$("#idTourDateDetails").val(myObj.appdt);
	$("#selHosDept").val(myObj.bid);
	//getDoctorNameList();
	getAllDoctorListfromSpec();
	setTimeout(function() {
		$("#selDoctorName").val(myObj.docid);
		setTimeout(function() {
			//getDoctorTimeList();
			getDoctorTimeListNew();
		}, 200);
	}, 200);

	setTimeout(
			function() {
				var patientDetails = $("#patientDetails").html();
				patientDetails = eval('(' + patientDetails + ')');
				var patName = patientDetails.patientList[0].prefix + patientDetails.patientList[0].fName + " "
						+ patientDetails.patientList[0].lName;
				var templatePatientDetails = '<div class="panel panel-default"><div class="panel-body"><div class="divide-10"></div><table id="" cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered table-hover"><thead><tr><th>UHID: '
						+  patientDetails.patientList[0].patientId;
						+ '</th></tr><tr><th>Patient Name: '
						+ patName
						+ '</th></tr><tr><th>Mobile No.: '
						+ patientDetails.patientList[0].mobile
						+ '</th></tr></thead></table></div></div>';
				$("#divAllPatientList").html(templatePatientDetails);
			}, 200);
}



function setPatientIntoListNew(type) {
	//alert("hi");
	var indexOf = "";
	var patientName = "";
	var doctorName = "" ;
	var patientListSearch = $("#patientListSearch").val();
	patientListSearch = patientListSearch.toLocaleLowerCase();

	if ($("#appointmentType").val() == "New") {
		//alert("ddd");
		var patientListArray = [];
		var divAppo = $("#divAppo").html();
		divAppo = eval('(' + divAppo + ')');
		for ( var i = 0; i < divAppo.liapp.length; i++) {
			if (divAppo.liapp[i].aptyId == "New") {
				if(type == "patient"){
					 patientName = divAppo.liapp[i].patNm + " " + divAppo.liapp[i].lastName ;
					patientName = patientName.toLocaleLowerCase();
						 indexOf = (patientName).indexOf(patientListSearch);
				}else{
					doctorName = divAppo.liapp[i].docNm ;
					doctorName = doctorName.toLocaleLowerCase();
					 indexOf = (doctorName).indexOf(patientListSearch);
				}
				if (indexOf > -1) {
					patientListArray.push(divAppo.liapp[i]);
				}
			}
		}
		
		var newPatientTemplate1 = '<tbody>';
		for ( var j = 0; j < patientListArray.length; j++) {
			 
			newPatientTemplate1 = newPatientTemplate1
					+ '<tr class="gradeX" id="new' + patientListArray[j].apid
					+ '">' + '<td>' + patientListArray[j].title + ' '
					+ patientListArray[j].patNm + ' '
					+ patientListArray[j].lastName + '<br />'
					+ '<div class="divide-10"></div>'
					+ '<button class="btn btn-xs btn-primary" type="submit"'
					+ '	data-toggle="modal" data-target=""'
					+ '	onclick="changeAppointmentOfNewPatientNew('
					+ patientListArray[j].apid + ')">change</button></td>'
					+ '<td>' + patientListArray[j].docNm + '<br />'
					+ '<div class="divide-10"></div>'
					+ '	<button class="btn btn-xs btn-danger" type="submit"'
					+ '		data-toggle="modal" data-target=""'
					+ '		onclick="cancelAppointment('
					+ patientListArray[j].apid + ')">Cancel</button></td>'
					+ '<td class="center">' + patientListArray[j].appdt
					+ '</br>' + patientListArray[j].aptf + '</br>'
					+ '<div class="divide-10"></div>'
					+ '		<button class="btn btn-xs btn-success" type="submit"'
					+ '			data-toggle="modal" data-target=""'
					+ '			onclick="registerPatient(' + patientListArray[j].apid +',\'newReg\')">Register</button></td>'
					+ '</tr>';
			/*
			 * + '<tr class="gradeX" id="new"><td>' +
			 * patientListArray[j].title + ' ' + patientListArray[j].patNm + ' ' +
			 * patientListArray[j].lastName + '<br /><div class="divide-10"></div><button
			 * class="btn btn-xs btn-primary" type="submit" data-toggle="modal"
			 * data-target="" onclick="registerNewPat(' +
			 * patientListArray[j].apid + ')" >Register</button><td>' +
			 * patientListArray[j].docNm + '<br /></td><td class="center">' +
			 * patientListArray[j].appdt + '</br>' + patientListArray[j].aptf + '</br><br /></td></td></tr>';
			 */
		}
		newPatientTemplate1 = newPatientTemplate1 + '</tbody>';

		$("#newPatientList").setTemplate(newPatientTemplate1);
		var temp;
		$("#newPatientList").processTemplate(temp);

	} else if ($("#appointmentType").val() == "Existing") {
		var patientListArray = [];
		var divAppo = $("#divAppo").html();
		divAppo = eval('(' + divAppo + ')');
		for ( var i = 0; i < divAppo.liapp.length; i++) {
			if (divAppo.liapp[i].aptyId == "Existing") {
				if(type == "patient"){
				 patientName = divAppo.liapp[i].patNm + " " + divAppo.liapp[i].lastName ;
				patientName = patientName.toLocaleLowerCase();
					 indexOf = (patientName).indexOf(patientListSearch);
				}else{
					doctorName = divAppo.liapp[i].docNm ;
					doctorName = doctorName.toLocaleLowerCase();
					 indexOf = (doctorName).indexOf(patientListSearch);
				}
				if (indexOf > -1) {
					patientListArray.push(divAppo.liapp[i]);
				}
			}
		}

		var existingPatientTemplate1 = '<tbody>';
		for ( var j = 0; j < patientListArray.length; j++) {
			existingPatientTemplate1 = existingPatientTemplate1
					+ '<tr class="gradeX" id="existing'
					+ patientListArray[j].apid
					+ '"><td>'
					+ patientListArray[j].title
					+ ' '
					+ patientListArray[j].patNm
					+ ' '
					+ patientListArray[j].lastName
					+ '<br /><div class="divide-10"></div><button class="btn btn-xs btn-primary"	type="submit" data-toggle="modal" data-target="" onclick="setExistingAppointmentType(),changeAppointmentOfPatientNew('
					+ patientListArray[j].apid
					+ ')" >change</button><td>'
					+ patientListArray[j].docNm
					+ '<br />	<div class="divide-10"></div>	<button class="btn btn-xs btn-danger"	type="submit" data-toggle="modal"	data-target="" onclick="cancelAppointment({ $T.liapp.apid})">cancel</button></td><td class="center">'
					+ patientListArray[j].appdt
					+ '</br>'
					+ patientListArray[j].aptf
					+ '<br/><div class="divide-10"></div>	<button class="btn btn-xs btn-success"	onclick="registerPatient('
					+ patientListArray[j].apid + ',\'mark\')" data-toggle="modal"	data-target="#MarkPatient">Mark Visit</button></td></td></tr>';
		}
		existingPatientTemplate1 = existingPatientTemplate1 + '</tbody>';

		$("#existingPatientList").setTemplate(existingPatientTemplate1);
		var temp;
		$("#existingPatientList").processTemplate(temp);

	} else if ($("#appointmentType").val() == "FollowUp") {
		//alert("FollowUp");
		var patientListArray = [];
		var divAppo = $("#divAppo").html();
		divAppo = eval('(' + divAppo + ')');
		for ( var i = 0; i < divAppo.liapp.length; i++) {
			if (divAppo.liapp[i].aptyId == "FollowUp") {
				if(type == "patient"){
					 patientName = divAppo.liapp[i].patNm + " " + divAppo.liapp[i].lastName ;
					patientName = patientName.toLocaleLowerCase();
						 indexOf = (patientName).indexOf(patientListSearch);
				}else{
					doctorName = divAppo.liapp[i].docNm ;
					doctorName = doctorName.toLocaleLowerCase();
					 indexOf = (doctorName).indexOf(patientListSearch);
				}
				if (indexOf > -1) {
					patientListArray.push(divAppo.liapp[i]);
				}
			}
		}
		var followUpPatientTemplate1 = '<tbody>';
		for ( var j = 0; j < patientListArray.length; j++) {
			followUpPatientTemplate1 = followUpPatientTemplate1
					+ '<tr class="gradeX" id="existing'
					+ patientListArray[j].apid
					+ '"><td>'
					+ patientListArray[j].title
					+ ' '
					+ patientListArray[j].patNm
					+ ' '
					+ patientListArray[j].lastName
					+ '<br /><div class="divide-10"></div><button class="btn btn-xs btn-primary"	type="submit" data-toggle="modal" data-target="" onclick="setExistingAppointmentType(),changeAppointmentOfPatientNew('
					+ patientListArray[j].apid
					+ ')" >change</button><td>'
					+ patientListArray[j].docNm
					+ '<br />	<div class="divide-10"></div>	<button class="btn btn-xs btn-danger"	type="submit" data-toggle="modal"	data-target="" onclick="cancelAppointment({ $T.liapp.apid})">cancel</button></td><td class="center">'
					+ patientListArray[j].appdt
					+ '</br>'
					+ patientListArray[j].aptf
					+ '<br/><div class="divide-10"></div>	<button class="btn btn-xs btn-success"	onclick="registerPatient('
					+ patientListArray[j].apid
					+ ',\"mark\")" data-toggle="modal"	data-target="#MarkPatient">Mark Visit</button></td></td></tr>';
		}

		var followUpList = $("#followUpList").html();
		var pobj = eval('(' + followUpList + ')');
		var patientListArrayFollowUp = [];
		for ( var i = 0; i < pobj.liapp.length; i++) {
			var indexOf = (pobj.liapp[i].patNm).indexOf(patientListSearch);
			if (indexOf > -1) {
				patientListArrayFollowUp.push(pobj.liapp[i]);
			}
		}

		for ( var j = 0; j < patientListArrayFollowUp.length; j++) {
			followUpPatientTemplate1 = followUpPatientTemplate1
					+ '<tr class="gradeX" id="existing'
					+ patientListArrayFollowUp[j].apid
					+ '"><td>'
					+ patientListArrayFollowUp[j].patNm
					+ '<br /><div class="divide-10"></div><button class="btn btn-xs btn-primary"	type="submit" data-toggle="modal" data-target="" onclick="getPatientDetailsFollowUpNew('
					+ patientListArrayFollowUp[j].apid
					+ ')" >Schedule </br> Appointment</button><td>'
					+ patientListArrayFollowUp[j].docNm
					+ '<br />'
					// added by kishor for add cancle button when search
					+'<div class="divide-10"></div>	<button class="btn btn-xs btn-danger"	type="submit" data-toggle="modal"	data-target="" onclick="cancelAppointment({ $T.liapp.apid})">cancel</button></td><td class="center">'
					+ patientListArrayFollowUp[j].appdt
					+ '</br></td>'
					
					
					/*+ '<td class="center">'
					+ patientListArrayFollowUp[j].appdt
					+ '</br><br /></td>'*/
					+' </td></tr>';
		}

		followUpPatientTemplate1 = followUpPatientTemplate1 + '</tbody>';

		$("#followUpPatientList").setTemplate(followUpPatientTemplate1);
		var temp;
		$("#followUpPatientList").processTemplate(temp);
	} else if ($("#appointmentType").val() == "ReSchedule") {
		var pobj = $("#reScheduleList").html();
		pobj = eval('(' + pobj + ')');
		var patientListArrayReSchedule = [];
		for ( var i = 0; i < pobj.liapp.length; i++) {
			if(type == "patient"){
				patientName = pobj.liapp[i].patNm + " " + pobj.liapp[i].lastName ;
				patientName = patientName.toLocaleLowerCase();
					 indexOf = (patientName).indexOf(patientListSearch);
			}else{
				doctorName = pobj.liapp[i].docNm ;
				doctorName = doctorName.toLocaleLowerCase();
				 indexOf = (doctorName).indexOf(patientListSearch);
			}
			if (indexOf > -1) {
				patientListArrayReSchedule.push(pobj.liapp[i]);
			}
		}
		
		var reSchedulePatientTemplate1 = '<tbody>';
		for ( var j = 0; j < patientListArrayReSchedule.length; j++) {
			reSchedulePatientTemplate1 = reSchedulePatientTemplate1
					+ '<tr class="gradeX" id="existing'
					+ patientListArrayReSchedule[j].apid
					+ '"><td>'
					+ patientListArrayReSchedule[j].title
					+ ' '
					+ patientListArrayReSchedule[j].patNm
					+ ' '
					+ patientListArrayReSchedule[j].lastName
					+ '<br /><div class="divide-10"></div>';
			
					if(patientListArrayReSchedule[j].aptyId == "New"){
						if(patientListArrayReSchedule[j].patid == "0"){
							reSchedulePatientTemplate1 = reSchedulePatientTemplate1
							+ '<button class="btn btn-xs btn-primary" type="submit" data-toggle="modal" data-target="" onclick="setReScheduleAppointmentType(),changeAppointmentOfNewPatientNew('
							+ patientListArrayReSchedule[j].apid
							+ ')" >change</button>';
						}else{
							reSchedulePatientTemplate1 = reSchedulePatientTemplate1
							+ '<button class="btn btn-xs btn-primary" type="submit" data-toggle="modal" data-target="" onclick="setReScheduleAppointmentType(),changeAppointmentOfPatientNew('
							+ patientListArrayReSchedule[j].apid
							+ ')" >change</button>';
						}
					}else{
						reSchedulePatientTemplate1 = reSchedulePatientTemplate1
						+ '<button class="btn btn-xs btn-primary" type="submit" data-toggle="modal" data-target="" onclick="setReScheduleAppointmentType(),changeAppointmentOfPatientNew('
						+ patientListArrayReSchedule[j].apid
						+ ')" >change</button>';
					}
					
					reSchedulePatientTemplate1 = reSchedulePatientTemplate1
						+ '</td><td>'
						+ patientListArrayReSchedule[j].docNm
						+ '<br/><div class="divide-10"></div>'
						+ '<button class="btn btn-xs btn-danger" type="submit" data-toggle="modal"	data-target="" onclick="cancelAppointment('
						+ patientListArrayReSchedule[j].apid
						+ ')">cancel</button></td>'
						+ '<td class="center">'
						+ patientListArrayReSchedule[j].appdt
						+ '</br>'
						+ patientListArrayReSchedule[j].aptf
						+ '<br/><div class="divide-10"></div>';
						
						if(patientListArrayReSchedule[j].aptyId == "New"){
														
							if(patientListArrayReSchedule[j].patid == "0"){
								
								reSchedulePatientTemplate1 = reSchedulePatientTemplate1
								+ '<button class="btn btn-xs btn-success"	type="submit" data-toggle="modal" '
								+ ' onclick="registerPatient('+ patientListArrayReSchedule[j].apid + ',\'newReg\')" >Register</button>';
							}else{
								reSchedulePatientTemplate1 = reSchedulePatientTemplate1
								+ '<button class="btn btn-xs btn-success" onclick="registerPatient('
								+ patientListArrayReSchedule[j].apid
								+ ',\'mark\')" data-toggle="modal"	data-target="#MarkPatient">Mark Visit</button>';
							}
						}else{
							reSchedulePatientTemplate1 = reSchedulePatientTemplate1
							+ '<button class="btn btn-xs btn-success" onclick="registerPatient('
							+ patientListArrayReSchedule[j].apid
							+ ',\'mark\')" data-toggle="modal"	data-target="#MarkPatient">Mark Visit</button>';
						}
					reSchedulePatientTemplate1 = reSchedulePatientTemplate1
						+ '</td></tr>';
		}
		
		reSchedulePatientTemplate1 = reSchedulePatientTemplate1 + '</tbody>';

		$("#reSchedulePatientList").setTemplate(reSchedulePatientTemplate1);
		var temp;
		$("#reSchedulePatientList").processTemplate(temp);
	}
}



function getPatientDetailsFollowUpNew(followUpId) {
	if ($("#idTourDateDetails").val() == ""
			|| $("#idTourDateDetails").val() == null) {
		alert("Please Select Date");
		return false;
	}
	// $("#divPatientSearch").hide();
	$("#divAllPatientList").html("");

	setTimeout(
			function() {
				var patientDetails = $("#patientDetails").html();
				patientDetails = eval('(' + patientDetails + ')');
				var patName = patientDetails.patientList[0].prefix + patientDetails.patientList[0].fName + " "
						+ patientDetails.patientList[0].lName;
				var templatePatientDetails = '<div class="panel panel-default"><div class="panel-body"><div class="divide-10"></div><table id="" cellpadding="0" cellspacing="0" border="0" class="datatable table table-striped table-bordered table-hover"><thead><tr><th>UHID: '
						+ patientDetails.patientList[0].patientId
						+ '</th></tr><tr><th>Patient Name: '
						+ patName
						+ '</th></tr><tr><th>Mobile No.: '
						+ patientDetails.patientList[0].mobile
						+ '</th></tr></thead></table></div></div>';
				$("#divAllPatientList").html(templatePatientDetails)
			}, 200);
	
	/*var r = $("#divAppo").html();
	r = eval('(' + r + ')');*/
	
	var followUpList = $("followUpList").html();
	followUpList = eval('(' + followUpList + ')');
	var reqObj = "";
	$("#appointmentId").val(followUpId);
	var patientId = 0;
	var doctorId = 0;
	
	for ( var p = 0; p < pobj.liapp.length; p++) {

		if (pobj.liapp[p].apid == followUpId) {
			reqObj = pobj.liapp[p];
			patientId = reqObj.patid;
			doctorId = reqObj.docid;
			//alert(patientId +"--"+doctorId);
			$("#idTourDateDetails").val(reqObj.appdt);
			break;
		}
	}

	if (patientId != null && patientId != undefined && patientId != "") {
		var inputs = [];
		//inputs.push('action=getPatientDetails');
		inputs.push('patientId=' + patientId);

		var str = inputs.join('&');

		jQuery
				.ajax({

					async : true,
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

						var patientDetailTemp = '<label class="TextFont">UHID : {$T.patientList[0].patientId}</label>'
							+ '<div class="divide-10"></div><label class="TextFont">Patient Name :{ $T.patientList[0].prefix} {$T.patientList[0].fName} {$T.patientList[0].lName}</label>'
							+ '<div class="divide-10"></div><label class="TextFont">Patient Mobile Number : {$T.patientList[0].mobile}</label>'
							+ '<div class="divide-10"></div><label class="TextFont" id"appSlotTiming"></label>';

						$("#patientDetailsDiv").setTemplate(patientDetailTemp);
						$("#patientDetailsDiv").processTemplate(patientDetails);
					}
				
				});
	}
	$("#appointmentType").val("FollowUpSchedule");
	//setDocNameForRegistration();
	$("#selHosDept").val(reqObj.bid);
	
	//return false;
	//getDoctorNameList();
	getAllDoctorListfromSpec();
	setTimeout(function() {
		$("#selDoctorName").val(doctorId);
		//getDoctorTimeList();
		getDoctorTimeListNew();
	}, 500);
	
	/*$("#hidpatId").val(myObj.patid);
	$("#appointmentId").val(myObj.apid);

	$("#idTourDateDetails").val(myObj.appdt);
	$("#selHosDept").val(myObj.bid);
	getDoctorNameList();
	setTimeout(function() {
		$("#selDoctorName").val(myObj.docid);
		setTimeout(function() {
			getDoctorTimeList();
		}, 200);
	}, 200);
	*/
}