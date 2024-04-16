function getAllImportedFile() {
	jQuery
			.ajax({
				type : "POST",
				url : "pharmacy/pharmacy/getAllImportedFile",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					$('#importedFilesDisplayModal').modal('show');
					var importedFilesDisplayBody = "";
					var index = 1;
					for ( var i = 0; i < response.length; i++) {
						importedFilesDisplayBody = importedFilesDisplayBody
								+ "<tr><td>"
								+ index
								+ ""
								+ "</td><td>"
								+ response[i].fileName
								+ "</td><td>"
								+ response[i].addedOn
								+ "</td>"
								+ "<td><button class='btn btn-xs btn-success' onclick=downloadFile('"
								+ response[i].fileName
								+ "')><i class='fa fa-download'></i></button></td></tr>";
						index++;
					}
					$('#importedFilesDisplayBody').html(
							importedFilesDisplayBody);
					if (response.length == 0) {
						$('#importedFilesDisplayBody')
								.html(
										"<tr><td class='center' colspan='4'><b>Sorry no file is imported...</b></td></tr>");
					}
				}
			});
}
	
function downloadFile(fileName){
	$('#downloadExcel').attr('src',"pharmacy/pharmacy/downloadFile?fileName="+fileName);
}
	
function getEmployeeAttendanceDetails(){
	var month = $('#month').val();
	var year = $('#year').val();
	var userId = $('#userID').val();
	var date = "%%-"+month+"-"+year;
	if(month!="" && year!=""){
	jQuery.ajax({
		type : "POST",
		url : "pharmacy/pharmacy/getEmployeeAttendanceDetails",
		data : {
			"date" : date,
			"userId" : userId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			for(var i=0;i<response.attendanceSlaveArray.length;i++){
				$('#dateTr').append("<td align='center' style='border: 1px solid;'>"+response.attendanceSlaveArray[i].date+"</td>");
				$('#statusTr').append("<td align='center' style='border: 1px solid;'>"+response.attendanceSlaveArray[i].status+"</td>");
				$('#inTimeTr').append("<td align='center' style='border: 1px solid;'>"+response.attendanceSlaveArray[i].inTime+"</td>");
				$('#outTimeTr').append("<td align='center' style='border: 1px solid;'>"+response.attendanceSlaveArray[i].outTime+"</td>");
				$('#totalTimeTr').append("<td align='center' style='border: 1px solid;'>"+response.attendanceSlaveArray[i].totalTime+"</td>");
			}
			$('#totalDays').val('30');
			$('#presentDays').val(response.attendanceMasterObject.presentDays);
			$('#absentDays').val(response.attendanceMasterObject.absentDays);
			$('#attendanceRecordDiv').show();
			if(response.attendanceSlaveArray.length==0){
				$('#totalDays').val('');
				$('#presentDays').val('');
				$('#absentDays').val('');
				$('#attendanceRecordDiv').hide();
			}
		}
	});
	}
}

/*Consulting Room Master*/
function insertRoom(){
	var roomId = $('#masterRoomId').val();
	if(roomId=="" || roomId==null){
		saveRoom();
	}
	else{
		updateRoom(roomId);
	}
	getNextId1();
}

function refreshRoomMaster(){
	$('#masterRoomId').val("");
	$('#roomName').val("");
	getAllRoom();
}

function saveRoom(){
	var roomName = $('#roomName').val();
	if(roomName!="" && roomName!=null){
	jQuery.ajax({
		type : "POST",
		url : "/EhatEnterprise/pharmacy/common/saveRoom",
		data : {
			"roomName" : roomName
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshRoomMaster();
			alert(response);
		}
	});
	}
	else{
		alert("Please enter room name");
	}
}

function getRoomByRoomId(roomId){
	jQuery.ajax({
		type : "POST",
		url : "/EhatEnterprise/pharmacy/common/getRoomByRoomId",
		data : {
			"roomId" : roomId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			$('#roomId').val(response.roomId);
			$('#masterRoomId').val(response.roomId);
			$('#roomName').val(response.roomName);
		}
	});
}

function updateRoom(roomId){
	var roomName = $('#roomName').val();
	if(roomName!="" && roomName!=null){
	jQuery.ajax({
		type : "POST",
		url : "/EhatEnterprise/pharmacy/common/updateRoom",
		data : {
			"roomId" : roomId,
			"roomName" : roomName
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			refreshRoomMaster();
			alert(response);
		}
	});
	}
	else{
		alert("Please enter room name");
	}
}

function deleteRoom(roomId){
	var r = confirm("Are you sure you want to delete room?");
    if (r == true){
	jQuery.ajax({
		type : "POST",
		url : "/EhatEnterprise/pharmacy/common/deleteRoom",
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
			alert(response);
		}
	});
	}
}

function getAllRoom(){
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "/EhatEnterprise/pharmacy/common/getAllRoom",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			//alert(response);
			var roomBody="";
			var index = 1;
			for(var i=0;i<response.length;i++){
				roomBody = roomBody + "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"+index+""
				+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"+response[i].roomId+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"+response[i].roomName+"</td><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+"<button class='btn btn-xs btn-success editUserAccess' onclick='getRoomByRoomId("+response[i].roomId+")' disabled='disabled'><i class='fa fa-edit'></i>"
				+"</button><td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteUserAccess' onclick='deleteRoom("+response[i].roomId+")' disabled='disabled'><i class='fa fa-trash-o'></i></button></td></tr>";
				index++;
			}
			//$('#roomId').val(index);
			$('#roomName').val("");
			$('#masterRoomBody').html(roomBody);
			setTimeout(function(){userAccess();},100);
		}
	});
}