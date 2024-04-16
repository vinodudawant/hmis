/************
* @author	: Dayanand Khandekar
* @date		: 18-1-2022
* @codeFor	: Save consulting room  master
 ************/
function saveRoomMaster() {
	var roomId = $('#roomId').val();
	var roomName = $('#roomName').val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	
	
	if(roomName=="" || roomName==undefined || roomName==null || roomName=="null"  ){
		
		alert("please enter state name");		
		$("#roomName").focus();					
		return false;
	}	
	
	
	
	var inputs = [];	
	inputs.push('roomMasterId=' + roomId);
	inputs.push('roomName=' + roomName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/croom/saveConsultingRoom",
		data	: str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(r) {
			
			if (r == 1) {
				
				alertify.success("Records Saved Sucessfully");				
			} else if (r == 2) {
				
				alertify.success( "Records Updated Sucessfully");				
			}else if (r == 3) {				
				
				alertify.error("State Name is Already Exist");				
			}else {
				
				alertify.error("Oops Some Problem Ocured");
			}
			refreshRoomMaster();
			getAllConsultingRoom();
		}
	});	
}

/************
* @author	: Dayanand Khandekar
* @date		: 18-1-2022
* @codeFor	: this function used for refreshRoomMaster
 ************/
function refreshRoomMaster(){
	
	$('#roomName').val('');
	$('#roomId').val(0);
}

/************
* @author	: Dayanand Khandekar
* @date		: 18-1-2022
* @codeFor	: this function used for getAllConsultingRoom
 ************/
function getAllConsultingRoom(){
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
			setAllConsultingRoomMaster(r);			
		}
	});
}

/************
* @author	: Dayanand Khandekar
* @date		: 18-1-2022
* @codeFor	: this function used for setAllConsultingRoomMaster
 ************/
function setAllConsultingRoomMaster(r){

	var htm ="";
	var index = 1;
	
				for ( var i = 0; i < r.getListOfConsultingRoomMaterDTO.length; i++) {		
							htm = htm + '<tr> '
							+ ' <td class="col-md-1 center">'+index+'</td>'
							+ ' <td class="col-md-1 center">'+r.getListOfConsultingRoomMaterDTO[i].roomMasterId+'</td>'
							+ ' <td class="col-md-1 center">'+r.getListOfConsultingRoomMaterDTO[i].roomName+'</td>'		
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success" onclick=editConsultingRoom('+r.getListOfConsultingRoomMaterDTO[i].roomMasterId+')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger" onclick=deleteConsultingRoom('+r.getListOfConsultingRoomMaterDTO[i].roomMasterId+')><i class="fa fa-trash-o"></i></button></td>'
							+ '</tr>';
							index++;
						}
		
			
	$("#stateDetails").html(htm);
}

/************
* @author	: Dayanand Khandekar
* @date		: 18-1-2022
* @codeFor	: this function used for editConsultingRoom
 ************/
function editConsultingRoom(roomId){		
	var inputs = [];
	inputs.push('roomId=' + roomId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/croom/editConsultingRoom",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {			
			$('#roomName').val(r.roomName);
			$('#roomId').val(r.roomMasterId);
		}
	});
}

/************
* @author	: Dayanand Khandekar
* @date		: 18-1-2022
* @codeFor	: this function used for deleteConsultingRoom
 ************/
function deleteConsultingRoom(roomId) {
	
	var userId=$("#userId").val();
	
	var r = confirm("Are You Sure You Want To Delete State Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "GET",
			url : "ehat/croom/deleteConsultingRoom",
			data : {
				"roomId" : roomId,
				"userId" : userId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshRoomMaster();
				getAllConsultingRoom();
			}
		});
	}
}
