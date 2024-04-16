/************
* @author	: Dayanand Khandekar
* @date		: 30-Sept-2019
* @codeFor	: save Shelf Master Detail
 ************/
function saveroomMaster() {
	var roomName = $('#roomName').val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var roomId=$('#roomId').val();
	if(roomName=="" || roomName==undefined || roomName==null){
		alert("please enter roomName");		
		$("#roomName").focus();					
		return false;
	}	
	var inputs = [];	
	inputs.push('roomName=' + roomName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('roomId=' + roomId);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type : "POST",
		url : "ehat/roommsater/saveroomMaster",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if (r == 1) {
				alertify.success("Records Saved Sucessfully");				
			} else if (r == 2) {
				alertify.success( "Records Updated Sucessfully");				
			}else if (r == 3) {				
				alertify.error("Room Name is Already Exists");				
			}else {
				alertify.error("Oops Some Problem Ocured");
			}
			refreshroomDoc();
			getAllRoomMasterDoc();
		}
	});	
}

/************
* @author	: Dayanand Khandekar
* @date		: 30-Sept-2019
* @codeFor	: get All Self Master Detail
 ************/
function  getAllRoomMasterDoc(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/roommsater/getAllRoomMasterDoc",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setRoomDocTemp(r);			
		}
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 26-Sept-2019
* @codeFor	: set Shelf Master Detail
 ************/
function setRoomDocTemp(r) {
	
	var htm ="";
	var index = 1;
	for ( var i = 0; i < r.lstroomMaster.length; i++) {		
				htm = htm + '<tr> '
				+ ' <td class="col-md-1 center">'+index+'</td>'
				+ ' <td class="col-md-1 center">'+r.lstroomMaster[i].roomId+'</td>'
				+ ' <td class="col-md-1 center">'+r.lstroomMaster[i].roomName+'</td>'		
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" onclick=editRoomDoc('+r.lstroomMaster[i].roomId+')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" onclick=deleteRoomMaster('+r.lstroomMaster[i].roomId+')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
				index++;
	}
	$("#roomDocDetails").html(htm);
}

/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: edit Shelf Master Detail
 ************/
function editRoomDoc(roomId){		
	var inputs = [];
	inputs.push('roomId=' + roomId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/roommsater/editRoomDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#roomName').val(r.roomName);
			$('#roomId').val(r.roomId);
		}
	});
}

/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: delete Shelf master Detail 
 ************/
function deleteRoomMaster(roomId) {
	var r = confirm("Are You Sure You Want To Delete Room Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/roommsater/deleteRoomMaster",
			data : {
				"roomId" : roomId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshroomDoc();
				getAllRoomMasterDoc();
			}
		});
	}
}
function refreshroomDoc(){	
	$('#roomName').val("");
	$('#roomId').val(0);
}
