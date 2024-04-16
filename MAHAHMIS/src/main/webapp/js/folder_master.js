/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: save Folder Master Detail
 ************/
function saveFolderDoc() {	
	var folderName = $('#folderName').val();
	var userId=$('#userId').val();
	var unitId=$('#unitId').val();
	var folderId=$('#folderId').val();
	var department = $('#department').val();
	
	if(folderName=="" || folderName==undefined || folderName==null){
		alert("please enter folder name ");		
		$("#folderName").focus();					
		return false;
	}
	if(department=="" || department==undefined || department==null ||department==0 ){
		alert("please select DepartMent ");		
		$("#department").focus();					
		return false;
	}

	var inputs = [];	
	inputs.push('folderName=' + folderName);
	inputs.push('folderId=' + folderId);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('departMent=' + department);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type : "POST",
		url : "ehat/folderdoc/saveFolderDoc",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r){
			if (r == 1){
				alertify.success("Records Saved Sucessfully");	
				window.location.reload(true);
			} else if (r == 2){
				alertify.success( "Records Updated Sucessfully");
				window.location.reload(true);
			}else if (r == 3){				
				alertify.error("Folder Name is Already Exist");	
				window.location.reload(true);
			}else{
				alertify.error("Oops Some Problem Ocured");
				window.location.reload(true);
			}
			
			refreshFolderDoc();
			
			getAllFolderfDoc();			
		}
	});	
}
/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: get All Folder Master Detail
 ************/
function  getAllFolderfDoc(){
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/folderdoc/getAllFolderfDoc",
		error : function() {
			alert('error');
		},
		success : function(r){			
			setFolderDocTemp(r);			
		}
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: set Folder Master Detail
 ************/
function setFolderDocTemp(r){	
			var htm ="";
			var index = 1;
			var department="";
	for ( var i = 0; i < r.lstfolderDoc.length; i++){
				
				if (r.lstfolderDoc[i].departMent == 1) {
					department = "OPD";
				} else if (r.lstfolderDoc[i].departMent == 2){
					department = "IPD";
				} else if (r.lstfolderDoc[i].departMent == 3){
					department = "Diagnostic";
				}		
				htm = htm + '<tr> '
				+ ' <td class="col-md-1 center">'+index+'</td>'
				+ ' <td class="col-md-1 center">'+r.lstfolderDoc[i].folderId+'</td>'
				+ ' <td class="col-md-1 center">'+r.lstfolderDoc[i].folderName+'</td>'
				+ ' <td class="col-md-1 center">'+department+'</td>'
				+ ' <td class="col-md-1 center">'
				+ '		<button class="btn btn-xs btn-success editBodyPartMaster" onclick=editFolderDoc('+ r.lstfolderDoc[i].folderId+')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '		<button class="btn btn-xs btn-success editBodyPartMaster" onclick=deleteFolderDoc('+ r.lstfolderDoc[i].folderId+')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';					
				index++;
	}
	$("#folderDocDetails").html(htm);
}
/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: edit Folder Master Detail
 ************/
function editFolderDoc(folderId){		
	var inputs = [];
	inputs.push('folderId=' + folderId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/folderdoc/editFolderDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#folderName').val(r.folderName);
			$('#folderId').val(r.folderId);
			$('#department').val(r.departMent);
		}
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: delete Folder master Detail 
 ************/
function deleteFolderDoc(folderId){	
	var r = confirm("Are You Sure You Want To Delete Folder");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/folderdoc/deleteFolderDoc",
			data : {
				"folderId" : folderId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response){
				alertify.error(response);
				refreshFolderDoc();
				getAllFolderfDoc();
				}
		});
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 1-oct-2019
* @codeFor	: refreshFolderDoc master Detail 
 ************/
function refreshFolderDoc(){	
	$('#folderName').val(" ");
	$('#folderId').val(0);
	$('#department').val(0);
}
