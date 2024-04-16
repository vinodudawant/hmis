/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: save DocChecklist Master Detail
 ************/
function saveDocCheckList() {	
	var docName = $('#docName').val();
	var userId=$('#userId').val();
	var unitId=$('#unitId').val();
	var docId=$('#docId').val();
	var department = $('#department').val();
	if(docName=="" || docName==undefined || docName==null){
		alert("please enter docName ");		
		$("#docName").focus();					
		return false;
	}
	if(department=="" || department==undefined || department==null ||department==0 ){
		alert("please select DepartMent ");		
		$("#department").focus();					
		return false;
	}	
	var inputs = [];	
	inputs.push('docName=' + docName);
	inputs.push('docId=' + docId);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('departMent=' + department);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type : "POST",
		url : "ehat/doccheklist/saveDocCheckList",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r){
			if (r == 1) {
				alertify.success("Records Saved Sucessfully");				
			} else if (r == 2){
				alertify.success( "Records Updated Sucessfully");				
			}else if (r == 3){				
				alertify.error("Doc Name is Already Exist");				
			}else{
				alertify.error("Oops Some Problem Ocured");
			}
			refreshDocCheckList();
			getAllDocChecklist();			
		}
	});	
}
/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: get All DocChecklist Master Detail
 ************/
function  getAllDocChecklist()
{
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/doccheklist/getAllDocChecklist",
		error : function(){
			alert('error');
		},
		success : function(r) {			
			setDocCheckListTemp(r);			
		}
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: set DocChecklist Master Detail
 ************/
function setDocCheckListTemp(r){
	
	var htm ="";
	var index = 1;
	var department="";
	for ( var i = 0; i < r.lstChecklistDoc.length; i++) {		
						if (r.lstChecklistDoc[i].departMent == 1){
							department = "OPD";
						} else if (r.lstChecklistDoc[i].departMent == 2){
							department = "IPD";
						} else if (r.lstChecklistDoc[i].departMent == 3){
							department = "Diagnostic";
						}						
						htm = htm + '<tr> '
						+ ' <td class="col-md-1 center">'+index+'</td>'
						+ ' <td class="col-md-1 center">'+r.lstChecklistDoc[i].docId+'</td>'
						+ ' <td class="col-md-1 center">'+r.lstChecklistDoc[i].docName+'</td>'
						+ ' <td class="col-md-1 center">'+department+'</td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success editBodyPartMaster" onclick=editDocChecklist('+ r.lstChecklistDoc[i].docId+')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '		<button class="btn btn-xs btn-success editBodyPartMaster" onclick=deleteDocCheckList('+ r.lstChecklistDoc[i].docId+')><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';		
						
						index++;
	}
	$("#docChecklistDetails").html(htm);
}
/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: edit DocChecklist Master Detail
 ************/
function editDocChecklist(docId){
		
	var inputs = [];
	inputs.push('docId=' + docId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/doccheklist/editDocChecklist",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#docName').val(r.docName);
			$('#docId').val(r.docId);
			$('#department').val(r.departMent);
		}
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: delete DocChecklist master Detail 
 ************/
function deleteDocCheckList(docId) {
	
	var r = confirm("Are You Sure You Want To Delete Folder");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/doccheklist/deleteDocCheckList",
			data : {
				"docId" : docId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshDocCheckList();
				getAllDocChecklist();
			}
		});
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: refersh DocChecklist master Detail 
 ************/
function refreshDocCheckList(){	
	$('#docName').val("");
	$('#docId').val('0');
	$('#department').val('0');
}
