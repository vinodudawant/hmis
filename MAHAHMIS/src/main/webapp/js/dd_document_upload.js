/**
	 * @author :HM00066
	 * @Date :29-12-2021
	 * @Code :This method is for create body of document in opd doctor desk
	 * @return 
	 **/

function temForUploadDocumentOPD(id) {
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	$("#diets").hide();
	$("#ipdDoctorStationJSPHeadDiv").html(" ");

	var temp=  '<div class="tab-pane active" id="Upload_Document"><div class="box-body col-md-12-1" style="padding-top: 10px; padding-bottom: 0px">'
		+ '	<div class="form-group  box border col-md-12-1" style="padding-top: 10px;">'
		+ '	<form method="post" enctype="multipart/form-data" name="fileUploadfrm" id="fileUploadform">'
		+ '	<input type="hidden" value="0" name="TRTiD" id="TRTiD"><input type="hidden" value="0" name="PiD" id="PiD"><div class="centered"><div class="divide-10"></div>'
		+ '	<div style="height: 50px;" class="col-md-12-1"><label style="margin-top: 3px; padding-left: 5px;" class="col-md-2-1">Select a File to Upload: </label>'
		+ '	<input type="file" style="margin-top: 0px; cursor: pointer;" id="ifile" multiple name="uploadOpdDocs"><br></div>'
		+ '	<div class="divide-10"></div><div style="height: 50px;" class="col-md-12-1">'
		+ '	<label style="margin-top: 3px; padding-left: 5px;" class="col-md-2-1">Comment: </label>'
		+ '	<textarea maxlength="120" id="iNotes" name="txtNotes" style="width: 236px; height: 48px;" cols="60" rows="2" class="col-md-4-1"></textarea>'
		+ '	</div><div class="divide-10"></div><div style="height: 50px;" class="col-md-6-1">'
		+ '	<label style="margin-top: 3px; padding-left: 5px;" class="col-md-12-1"></label>'
		+ '	<button style=" margin-top: 3px; margin-left: -100px" class="btn btn-xs btn-success editUserAccess"  id="ifileUp" name="fileUp" onclick="saveDoctorDeskDocument()" type="button">Upload Document</button>'
		+ '	</div></div></form><br><div class="divide-10"></div><div class="box-body col-md-12s-1" style="padding-top: 10px; padding-bottom: 0px">'
		+ '	<div class="form-group  box border col-md-12-1"><div class="col-md-12-1" style="margin-top: 0px;  padding-left: 3px;">'
		+ '	<div class="col-sm-12-1" style="margin-top: 0px;margin-top: 0px; height: 250px; overflow-y: scroll;" id="divdocDispTable"><div class="col-sm-12s-1">'
		+ '	<table class="table table-bordered table-condensed header-fixed cf" style="margin-top: 10px;">'
		+ '	<thead><tr><th class="col-md-1-1 center" style="height: 21.5px;"><div class="TextFont">#</div></th>'
		+ '	<th class="col-md-2-1" style="height: 21.5px; padding-left: 50px;"><div class="TextFont">Document</div></th>'
		+ '	<th class="col-md-2-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Note</div></th>'
		+ '	<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Date</div></th>'
		/*+ '	<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Edit</div></th>'*/
		+ '	<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">View</div></th>'
		+ '	<th class="col-md-1-1 center" style="height: 21.5px; padding-left: 0px;"><div class="TextFont">Delete</div></th>'
		+ '	</tr></thead><tbody id="docDispTable"><tr><td colspan="5">No Record Found</td></tr></tbody>'
		+ '	</table></div></div></div></div></div></div></div>';

	$("#ipdDoctorStationJSPHeadDiv").html(temp);
	getAllOpdDocuments();
}

/**
 * @author :HM00066
 * @Date :28-12-2021
 * @Code :This method is document upload doctor desk
 * @return
 **/

function saveDoctorDeskDocument(){
	var documentId = $('#documentId').val();
	var patientId = $('#pt_Id').val();
	var treatmentId = $('#tr_Id').val();
	
	if(treatmentId == "" || treatmentId == 0 || treatmentId==undefined){
		alert("Please check treatment id");
		return false;
	}
	
	var remarks = $('#iNotes').val();
	if(remarks=="" || remarks ==undefined || remarks =="undefined"){
		alert("Please enter remarks");
		return false;
	}
	
	var form = $("#fileUploadform")[0];
	if (document.getElementsByName("uploadOpdDocs").length == 0 || $("#ifile").val() == "") {
		alert("Please select file");
		return false;
	}
	
	document.getElementById("primeLoader").style.display = "block";
	
	var doctorDeskFile = getFileValue('ifile');

	var data = new FormData(form);
	data.append("documentId", documentId);
	data.append("doctorDeskFile", doctorDeskFile);
	data.append("remark", remarks);
	data.append("patientId", patientId);
	data.append("treatmentId", treatmentId);
	data.append("uploadOpdDocs", doctorDeskFile);

	jQuery.ajax({
		async:false,
		type : "POST",
		enctype: 'multipart/form-data',
		url : "ehat/opdDocumentUpload/saveDoctorDeskDocument",
		data : data,
		processData : false,
		contentType : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Document saved sucessfully");
				clearAllFieldData();
				getAllOpdDocuments();
			}else if (data == 2) {
				alertify.success("Document updated sucessfully");
				getAllOpdDocuments();
				clearAllFieldData();
			}
			document.getElementById("primeLoader").style.display = "none";
		}
	});	
}

function getFileValue(id){
	var files = $('#'+id).prop("files");
	var document = $.map(files, function(val) {
		return val.name;
	});
	return document;
}

/**
 * @author :HM00066
 * @Date :24-12-2021
 * @Code :This method is fetch doctor list
 * @return 
 **/

function getAllOpdDocuments(){
	var patientId = $('#pt_Id').val();
	var treatmentId = $('#tr_Id').val();
	var inputs = [];
	inputs.push('patientId=' + patientId);
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async: true,
		type: "GET",
		url: "ehat/opdDocumentUpload/getAllOPDDocuments",
		data : str + "&reqType=AJAX",
		timeout: 1000 * 60 * 5,
		catche: false,
		error: function () {
			alert("error");
		},
		success: function (r) {
			setAllOpdDocuments(r);
		}
	});
}

/**
 * @author :HM00066
 * @Date :29-12-2021
 * @Code :This method is Edit document in opd  doctor desk
 * @return DoctorDeskDocumentUploadDto
 **/

function editOpdDocuments(documentId) {
	if(documentId !=undefined && documentId!=null && documentId!="" && documentId!="null"){
		
		var inputs = [];
		inputs.push('documentId=' + documentId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/opdDocumentUpload/editOPDDocuments",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				$('#documentId').val(r.documentId);
				$('#pt_Id').val(r.patientRegistered.patientId);
				$('#tr_Id').val(r.treatmentDto.treatmentId);
				$("#iNotes").val(r.remark);
			}
		});
	}
}

/**
 * @author :HM00066
 * @Date :29-12-2021
 * @Code :This method is Delete document in opd doctor desk
 * @return boolean
 **/

function deleteOpdDocuments(documentId) {
	if(documentId !=undefined && documentId!=null && documentId!="" && documentId!="null"){
		var r = confirm("Are You Sure You Want To Delete Document");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/opdDocumentUpload/deleteOPDDocuments",
				data : {
					"documentId" : documentId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					if(response == true){
						alertify.success("Document Deleted Successfully");	
					}else{
						alertify.error("Document Not Deleted");
					}					
					getAllOpdDocuments();
				}
			});
		}
	}
}

/**
 * @author :HM00066
 * @Date :29-12-2021
 * @Code :This method is set document in opd doctor desk
 * @return 
 **/
function setAllOpdDocuments(result) {
	var divContent = "";
	var prevtre = $('#prevtr').val();
	if (result.lstDoctorDeskDocumentUploadDto.length > 0) {
		for (var i = 0; i < result.lstDoctorDeskDocumentUploadDto.length; i++) {
			if (prevtre == "previousTreatmentOPDER") {
				divContent = divContent
						+ "<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"
						+ (i + 1)
						+ "</div></td>"
						+ "<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='hiddenDocid"
						+ (i + 1)
						+ "' value='"
						+ result.lstDoctorDeskDocumentUploadDto[i].doctorDeskFile
						+ "'>"
						+ result.lstDoctorDeskDocumentUploadDto[i].doctorDeskFile
						+ "</td> "
						+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDocnote"
						+ (i + 1)
						+ "' value='"
						+ lstDoctorDeskDocumentUploadDto[i].remark
						+ "'>"
						+ result.lstDoctorDeskDocumentUploadDto[i].remark
						+ "</td> "
						+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDate"
						+ (i + 1)
						+ "' value='"
						+ getDateWithTime(result.lstDoctorDeskDocumentUploadDto[i].createdDate)
						+ "'>"
						+ getDateWithTime(result.lstDoctorDeskDocumentUploadDto[i].createdDate)
						+ "</td> "
						/*+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button id='hiddenRv"
						+ (i + 1)
						+ "' class='btn btn-xs btn-success' style='margin-left: 6px;cursor: pointer;' onclick='editOpdDocuments("
						+ result.lstDoctorDeskDocumentUploadDto[i].documentId
						+ ")'><i class='fa fa fa-edit'></i></button></td>"*/
						+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button id='hiddenRv"
						+ (i + 1)
						+ "' class='btn btn-xs btn-success' style='margin-left: 6px;cursor: pointer;' onclick='viewOpdDocuments("
						+ (i + 1)+","+result.lstDoctorDeskDocumentUploadDto[i].documentId
						+ ")' type='button'><i class='fa fa-eye View'></i></button></td>"
						+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button id='hiddenR"
						+ (i + 1)
						+ "' class='btn btn-xs btn-danger hidden' style='margin-center: 6px;cursor: pointer;' onclick='deleteOpdDocuments("
						+ result.lstDoctorDeskDocumentUploadDto[i].documentId
						+ ")' disabled=''><i class='fa fa-trash-o'></i></button></td></tr>";
			} else {
				divContent = divContent
						+ "<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"
						+ (i + 1)
						+ "</div></td>"
						+ "<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='hiddenDocid"
						+ (i + 1)
						+ "' value='"
						+ result.lstDoctorDeskDocumentUploadDto[i].doctorDeskFile
						+ "'>"
						+ result.lstDoctorDeskDocumentUploadDto[i].doctorDeskFile
						+ "</td> "
						+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDocnote"
						+ (i + 1)
						+ "' value='"
						+ result.lstDoctorDeskDocumentUploadDto[i].remark
						+ "'>"
						+ result.lstDoctorDeskDocumentUploadDto[i].remark
						+ "</td> "
						+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDate"
						+ (i + 1)
						+ "' value='"
						+ getDateWithTime(result.lstDoctorDeskDocumentUploadDto[i].createdDate)
						+ "'>"
						+ getDateWithTime(result.lstDoctorDeskDocumentUploadDto[i].createdDate)
						+ "</td> "
						/*+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button id='hiddenRv"
						+ (i + 1)
						+ "' class='btn btn-xs btn-success' style='margin-left: 6px;cursor: pointer;' onclick='editOpdDocuments("
						+ result.lstDoctorDeskDocumentUploadDto[i].documentId
						+ ")'><i class='fa fa fa-edit'></i></button></td>"*/
						+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button id='hiddenRv"
						+ (i + 1)
						+ "' class='btn btn-xs btn-success' style='margin-left: 6px;cursor: pointer;' onclick='viewOpdDocuments("
						+ (i + 1)+","+result.lstDoctorDeskDocumentUploadDto[i].documentId
						+ ")' type='button'><i class='fa fa-eye View'></i></button></td>"
						+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button id='hiddenR"
						+ (i + 1)
						+ "' class='btn btn-xs btn-danger deleteBtn' style='margin-center: 6px;cursor: pointer;' onclick='deleteOpdDocuments("
						+ result.lstDoctorDeskDocumentUploadDto[i].documentId + ")'><i class='fa fa-trash-o'> </i></button></td></tr>";
			}
		}
	} else {
		divContent = divContent
				+ "<tr><td colspan = 5>No Record Found</td></tr>";
	}
	$("#docDispTable").html(divContent);
}

/**
* @author :HM00066
* @Date :30-12-2021
* @Code :This method is view uploaded file
* @return 
**/

function viewOpdDocuments(rowNumber,documentId) {
	var document = $("#hiddenDocid"+rowNumber).val();
	var note = $("#hiddenDocnote"+rowNumber).val();
	if(document ==null || document =="" || document ==undefined){
		alert("No File To View First Upload And Save file");
	}else{
		$('#ViewDocumemnt').attr("src","ehat/opdDocumentUpload/viewOpdDocuments?documentId="+documentId+"&fileName="+document);
		$('#viewDocModal').modal('show');
		$('#documentComment').html(note);
	}
}

/**
* @author :HM00066
* @Date :30-12-2021
* @Code :This method is get date and time 
* @return 
**/

function getDateWithTime(date) {
	var date1;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	var hours = formattedDate.getHours();
	var minute = formattedDate.getMinutes();
	var seconds = formattedDate.getSeconds();
	date1 = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2) + " "+ hours + ":" +('0' + minute).slice(-2)+ ":" +('0' + seconds).slice(-2);
	return date1;
	
}

/**
* @author :HM00066
* @Date :30-12-2021
* @Code :This method is clear all field after save.
* @return 
**/

function clearAllFieldData(){
	$('#documentId').val(0);
	$('#ifile').val("");
	$('#iNotes').val("")	
} 



