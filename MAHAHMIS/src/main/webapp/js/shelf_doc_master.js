/************
* @author	: Dayanand Khandekar
* @date		: 30-Sept-2019
* @codeFor	: save Shelf Master Detail
 ************/
function saveSelfMaster() {
	var shelfName = $('#shelfName').val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var shelfId=$('#shelfId').val();
	var roomID=$('#roomID').val();
	var rackId=$('#rackId').val();
	var fileCount=$('#fileCount').val();
	
	if(roomID=="" || roomID==undefined || roomID==null ||roomID=='0'){
		alert("please enter room Name");		
		$("#roomID").focus();					
		return false;
	}
	if(rackId=="" || rackId==undefined || rackId==null ||rackId=='0'){
		alert("please enter rack Name");		
		$("#rackId").focus();					
		return false;
	}
	if(shelfName=="" || shelfName==undefined || shelfName==null){
		alert("please enter shelfName Name");		
		$("#shelfName").focus();					
		return false;
	}	
	if(fileCount=="" || fileCount==undefined || fileCount==null ||fileCount=='0'){
		alert("please enter file capacity");
		$("#fileCount").focus();					
		return false;
	}
	if(parseFloat(fileCount) <= 0){
		alert("please enter fileCount Greater Than Zero");
		$("#fileCount").focus();	
		return false;
	}
	
	var inputs = [];	
	inputs.push('shelDocName=' + shelfName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('selfDocId=' + shelfId);
	inputs.push('roomId=' + roomID);
	inputs.push('rackId=' + rackId);
	inputs.push('fileCount=' + fileCount);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type : "POST",
		url : "ehat/shelfdoc/saveSelfMaster",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Records Saved Sucessfully");				
			} else if (r == 2){
				alertify.success( "Records Updated Sucessfully");				
			}else if (r == 3){				
				alertify.error("Shelf Name is Already Exist");				
			}else{
				alertify.error("Oops Some Problem Ocured");
			}			
			getAllShelfDoc();
			refreshShelfDoc();
		}
	});	
}
/************
* @author	: Dayanand Khandekar
* @date		: 30-Sept-2019
* @codeFor	: get All Self Master Detail
 ************/
function  getAllShelfDoc(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/shelfdoc/getAllShelfDoc",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setShelDocTemp(r);			
		}
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 26-Sept-2019
* @codeFor	: set Shelf Master Detail
 ************/
function setShelDocTemp(r) {	
	var htm ="";
	var index = 1;
	for ( var i = 0; i < r.lstShelfDoc.length; i++){		
				htm = htm + '<tr> '
				+ ' <td class="col-md-1 center">'+index+'</td>'
				+ ' <td class="col-md-1 center">'+r.lstShelfDoc[i].selfDocId+'</td>'
				+ ' <td class="col-md-1 center">'+r.lstShelfDoc[i].roomName+'</td>'
				+ ' <td class="col-md-1 center">'+r.lstShelfDoc[i].rackName+'</td>'		
				+ ' <td class="col-md-1 center">'+r.lstShelfDoc[i].shelDocName+'</td>'		
				+ ' <td class="col-md-1 center">'+r.lstShelfDoc[i].fileCount+'</td>'		          
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster" onclick=editShelfDoc('+r.lstShelfDoc[i].selfDocId+')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster" onclick=deleteShelfDoc('+r.lstShelfDoc[i].selfDocId+')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
				index++;
	}
	$("#shelfDocDetails").html(htm);
}
/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: edit Shelf Master Detail
 ************/
function editShelfDoc(selfDocId){
		
	var inputs = [];
	inputs.push('selfDocId=' + selfDocId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/shelfdoc/editShelfDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
            $('#shelfName').val(r.shelDocName);
			$('#shelfId').val(r.selfDocId);
			$('#roomID').select2('val',r.roomId);
			$("#roomID").select2("enable", false);
			getAllRackByRoomId();
			$('#rackId').select2('val',r.rackId);			
			$("#rackId").select2("enable", false)
			$('#fileCount').val(r.fileCount);		
		}
	});
}

/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: delete Shelf master Detail 
 ************/
function deleteShelfDoc(selfDocId) {
	var r = confirm("Are You Sure You Want To Delete Shelf Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/shelfdoc/deleteShelfDoc",
			data : {
				"selfDocId" : selfDocId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshShelfDoc();
				getAllShelfDoc();
			}
		});
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 8-oct-2019
* @codeFor	: set All room Master Detail
 ************/
function  getAllRoomMasterDoc(){
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/roommsater/getAllRoomMasterDoc",
		error : function() {
			alert('error');
		},
		success : function(r) {					
			var divContent = "";
            divContent = divContent
                    + "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";
           
            for ( var i = 0; i < r.lstroomMaster.length; i++) {                            
                	divContent = divContent + "<option value='" + r.lstroomMaster[i].roomId + "'>"
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
* @date		: 8-oct-2019
* @codeFor	: get All rack Master Detail
 ************/
function getAllRackByRoomId()
{
	var roomID=$('#roomID').val();	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/shelfdoc/getAllRackByRoomId",
		data : {
			"roomID" : roomID
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var divContent = "";
            divContent = divContent
                    + "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";
                      
            for ( var i = 0; i < r.lstrackMaster.length; i++){          
                       divContent = divContent + "<option value='" + r.lstrackMaster[i].rackId + "'  >"
                        + r.lstrackMaster[i].rackName + "</option>";
            }
            divContent = divContent + "</select>";
            $("#rackId").html(divContent);
            $("#rackId").select2();           
		}	
	});
  }
/************
* @author	: Dayanand Khandekar
* @date		: 8-oct-2019
* @codeFor	: refresh shelf Master Detail
 ************/
function refreshShelfDoc()
{
	$("#roomID").select2('val',"0");
	$("#rackId").select2('val',"0");
	$("#shelfId").val(0);
	$('#shelfName').val("");
	$('#fileCount').val(0);
	
}