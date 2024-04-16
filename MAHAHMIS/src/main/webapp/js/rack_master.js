/************
* @author	: Dayanand Khandekar
* @date		: 30-Sept-2019
* @codeFor	: save Shelf Master Detail
 ************/
function saverackMaster() {	
	var rackName = $('#rackName').val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var rackId=$('#rackId').val();
	var roomID=$('#roomID').val();
	var sheltCount=$('#sheltCount').val();
	
	if(roomID=="" || roomID==undefined || roomID==null ||roomID=='0'){
		alert("please Select Room Name ");		
		$("#roomID").focus();					
		return false;
	}	
	if(rackName=="" || rackName==undefined || rackName==null){
		alert("please enter rackName ");
		
		$("#roomName").focus();					
		return false;
	}
	if(sheltCount=="" || sheltCount==undefined || sheltCount==null  ||sheltCount=='0'){
		alert("please enter sheltCount ");
		 $("#sheltCount").focus();					
		return false;
		}
	if(parseFloat(sheltCount) <= 0){
		alert("please enter shelfCount Greater Than Zero");
		$("#sheltCount").focus();	
		return false;
	}
	
	var inputs = [];	
	inputs.push('rackName=' + rackName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('rackId=' + rackId);
	inputs.push('roomId=' + roomID);
	inputs.push('sheltCount=' + sheltCount);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type : "POST",
		url : "ehat/rackmsater/saverackMaster",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r == 1){
				alertify.success("Records Saved Sucessfully");				
			} else if(r == 2){
				alertify.success( "Records Updated Sucessfully");				
			}else if(r == 3){				
				alertify.error("Rack Name is Already Exist");				
			}else{
				alertify.error("Oops Some Problem Ocured");
			}	
			refreshrackDoc();
			getAllRackMasterDoc();
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
			var divContent = "";
            divContent = divContent
                    + "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";
           
	            for ( var i = 0; i < r.lstroomMaster.length; i++){             
		                divContent = divContent + "<option value='" + r.lstroomMaster[i].roomId + "'  >"
		                        + r.lstroomMaster[i].roomName + "</option>";
	            }
            divContent = divContent + "</select>";
            $("#roomID").html(divContent);
            $("#roomID").select2();
		}		
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 26-Sept-2019
* @codeFor	: get Shelf Master Detail
 ************/
function  getAllRackMasterDoc(){
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/rackmsater/getAllRackMasterDoc",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setRackDocTemp(r);			
		}
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 26-Sept-2019
* @codeFor	: set Shelf Master Detail
 ************/
function setRackDocTemp(r) {
	
	var htm ="";
	var index = 1;
	for ( var i = 0; i < r.lstrackMaster.length; i++) {		
				htm = htm + '<tr> '
				+ ' <td class="col-md-1 center">'+index+'</td>'
				+ ' <td class="col-md-1 center">'+r.lstrackMaster[i].rackId+'</td>'
				+ ' <td class="col-md-1 center">'+r.lstrackMaster[i].roomName+'</td>'
				+ ' <td class="col-md-1 center">'+r.lstrackMaster[i].rackName+'</td>'
				+ ' <td class="col-md-1 center">'+r.lstrackMaster[i].sheltCount+'</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" onclick=editRackDoc('+r.lstrackMaster[i].rackId+')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" onclick=deleteRackMaster('+r.lstrackMaster[i].rackId+')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
				index++;
	}
	$("#rackDocDetails").html(htm);
}
/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: edit Shelf Master Detail
 ************/
function editRackDoc(rackId){		
	var inputs = [];
	inputs.push('rackId=' + rackId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/rackmsater/editRackDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {			
			$('#rackName').val(r.rackName);
			$('#rackId').val(r.rackId);			
			$('#roomID').select2('val', r.roomId);
			$("#roomID").select2("enable", false)
			$('#sheltCount').val(r.sheltCount);
		}
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: delete Shelf master Detail 
 ************/
function deleteRackMaster(rackId) {
	var r = confirm("Are You Sure You Want To Delete Rack Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/rackmsater/deleteRackMaster",
			data : {
				"rackId" : rackId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshrackDoc();
				getAllRackMasterDoc();
			}
		});
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: referesh Shelf master Detail 
 ************/
function refreshrackDoc(){	
	$('#rackName').val("");
	$('#roomID').select2('val',0);	
	$('#rackId').val(0);
	$('#sheltCount').val(0);
}
