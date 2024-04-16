


/**
 * @author :Rahul Patil
 * @Date :25-08-2022
 * @Code :This method is document upload doctor desk
 * @return
 **/

function uploadDocument(){
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
	if (document.getElementsByName("uploadDocs").length == 0 || $("#ifile").val() == "") {
		alert("Please select file");
		return false;
	}
	
	//document.getElementById("primeLoader").style.display = "block";
	
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
		url : "ehat/nursingDocument/saveNursingDocument",
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
				getNursingDocument();
			}else if (data == 2) {
				alertify.success("Document updated sucessfully");
				getNursingDocument();
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

function getNursingDocument(){
	var patientId = $('#pt_Id').val();
	var treatmentId = $('#tr_Id').val();
	var inputs = [];
	inputs.push('patientId=' + patientId);
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async: true,
		type: "GET",
		url: "ehat/nursingDocument/getNursingDocument",
		data : str + "&reqType=AJAX",
		timeout: 1000 * 60 * 5,
		catche: false,
		error: function () {
			alert("error");
		},
		success: function (r) {
			
			setUploadDocList(r);
		}
	});
}

function setUploadDocList(result)
{

	//var result=jQuery.parseJSON(data);
	var divContent="";
	var prevtre= $('#prevtr').val();
	if(result.lstNursingDocument.length>0){
		//var callFrom = $("#callFrom").val();
		for(var i=0;i<result.lstNursingDocument.length;i++)
		{
			if (prevtre == "previousTreatmentOPDER") {
				divContent=divContent+"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"+(i+1)+"</div></td>" +
				"<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='hiddenDocid"+(i+1)+"' value='"+result.lstNursingDocument[i].doctorDeskFile+"'>"+result.lstNursingDocument[i].doctorDeskFile+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDocnote"+(i+1)+"' value='"+result.lstNursingDocument[i].remark+"'>"+result.lstNursingDocument[i].remark+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenRv"+(i+1)+"' value='"+getDateWithTime(result.lstNursingDocument[i].createdDate)+"'>"+getDateWithTime(result.lstNursingDocument[i].createdDate)+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><i id='hiddenRv"+(i+1)+"' class='fa fa-eye fa-1x' style='margin-left: 6px;cursor: pointer;' onclick='ReadDocuments("
						+ (i + 1)+","+result.lstNursingDocument[i].documentId
						+ ")' type='button'></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
				"<i id='hiddenR"+(i+1)+"' class='fa fa-trash-o fa-1x ' style='margin-center: 6px;cursor: pointer;' onclick='delDocument("
						+ result.lstNursingDocument[i].documentId
						+ ")' type='button' disabled=''>  </i></td></tr>";
			}
			else{
				divContent=divContent+"<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"+(i+1)+"</div></td>" +
				"<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='hiddenDocid"+(i+1)+"' value='"+result.lstNursingDocument[i].doctorDeskFile+"'>"+result.lstNursingDocument[i].doctorDeskFile+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDocnote"+(i+1)+"' value='"+result.lstNursingDocument[i].remark+"'>"+result.lstNursingDocument[i].remark+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenRv"+(i+1)+"' value='"+getDateWithTime(result.lstNursingDocument[i].createdDate)+"'>"+getDateWithTime(result.lstNursingDocument[i].createdDate)+"</td> " +
				"<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><i id='hiddenRv"+(i+1)+"' class='fa fa-eye fa-1x' style='margin-left: 6px;cursor: pointer;' onclick='ReadDocuments("
						+ (i + 1)+","+result.lstNursingDocument[i].documentId
						+ ")' type='button'></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
				"<i id='hiddenR"+(i+1)+"' class='fa fa-trash-o fa-1x ' style='margin-center: 6px;cursor: pointer;' onclick='delDocument("
						+ result.lstNursingDocument[i].documentId
						+ ")' type='button' disabled=''>  </i></td></tr>";
			}
			}
	}
	else
	{
		divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
	}
	$("#docDispTable").html(divContent);
}

/**
 * @author :HM00066
 * @Date :29-12-2021
 * @Code :This method is Edit document in opd  doctor desk
 * @return DoctorDeskDocumentUploadDto
 **/
/*Reading Data*/
function ReadDocuments(rowNumber,documentId) {
	var doc = $("#hiddenDocid"+rowNumber).val();
	var note = $("#hiddenDocnote"+rowNumber).val();
	var note = $("#hiddenDocnote"+rowNumber).val();
	//$('#ViewDocumemnt').attr("src","ReadDocServlet?fileName="+doc);
	$('#ViewDocumemnt').attr("src","ehat/nursingDocument/ReadDocuments?documentId="+documentId+"&fileName="+doc);
	$('#viewDocModal').modal('show');
	
	$('#documentComment').html(note);
}
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

function delDocument(documentId){

	if(documentId !=undefined && documentId!=null && documentId!="" && documentId!="null"){
		var r = confirm("Are You Sure You Want To Delete Document");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/nursingDocument/deleteNursingDocuments",
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
					getNursingDocument();
				}
			});
		}
	}

}
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
 * @Code :This method is set document in opd doctor desk
 * @return 
 **/
function setNursingDocuments(result) {
	var divContent = "";
	var prevtre = $('#prevtr').val();
	if (result.lstNursingDocument.length > 0) {
		for (var i = 0; i < result.lstNursingDocument.length; i++) {
			if (prevtre == "previousTreatmentOPDER") {
				divContent = divContent
						+ "<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"
						+ (i + 1)
						+ "</div></td>"
						+ "<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='hiddenDocid"
						+ (i + 1)
						+ "' value='"
						+ result.lstNursingDocument[i].doctorDeskFile
						+ "'>"
						+ result.lstNursingDocument[i].doctorDeskFile
						+ "</td> "
						+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDocnote"
						+ (i + 1)
						+ "' value='"
						+ lstNursingDocument[i].remark
						+ "'>"
						+ result.lstNursingDocument[i].remark
						+ "</td> "
						+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenDate"
						+ (i + 1)
						+ "' value='"
						+ getDateWithTime(result.lstNursingDocument[i].createdDate)
						+ "'>"
						+ getDateWithTime(result.lstNursingDocument[i].createdDate)
						+ "</td> "
						/*+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button id='hiddenRv"
						+ (i + 1)
						+ "' class='btn btn-xs btn-success' style='margin-left: 6px;cursor: pointer;' onclick='editOpdDocuments("
						+ result.lstDoctorDeskDocumentUploadDto[i].documentId
						+ ")'><i class='fa fa fa-edit'></i></button></td>"*/
						+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button id='hiddenRv"
						+ (i + 1)
						+ "' class='btn btn-xs btn-success' style='margin-left: 6px;cursor: pointer;' onclick='viewOpdDocuments("
						+ (i + 1)+","+result.lstNursingDocument[i].documentId
						+ ")' type='button'><i class='fa fa-eye View'></i></button></td>"
						+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button id='hiddenR"
						+ (i + 1)
						+ "' class='btn btn-xs btn-danger hidden' style='margin-center: 6px;cursor: pointer;' onclick='deleteOpdDocuments("
						+ result.lstNursingDocument[i].documentId
						+ ")' disabled=''><i class='fa fa-trash-o'></i></button></td></tr>";
			} else {
				divContent = divContent
						+ "<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"
						+ (i + 1)
						+ "</div></td>"
						+ "<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='hiddenDocid"
						+ (i + 1)
						+ "' value='"
						+ result.lstNursingDocument[i].doctorDeskFile
						+ "'>"
						+ result.lstNursingDocument[i].doctorDeskFile
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
						+ getDateWithTime(result.lstNursingDocument[i].createdDate)
						+ "'>"
						+ getDateWithTime(result.lstNursingDocument[i].createdDate)
						+ "</td> "
						/*+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button id='hiddenRv"
						+ (i + 1)
						+ "' class='btn btn-xs btn-success' style='margin-left: 6px;cursor: pointer;' onclick='editOpdDocuments("
						+ result.lstDoctorDeskDocumentUploadDto[i].documentId
						+ ")'><i class='fa fa fa-edit'></i></button></td>"*/
						+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button id='hiddenRv"
						+ (i + 1)
						+ "' class='btn btn-xs btn-success' style='margin-left: 6px;cursor: pointer;' onclick='viewOpdDocuments("
						+ (i + 1)+","+result.lstNursingDocument[i].documentId
						+ ")' type='button'><i class='fa fa-eye View'></i></button></td>"
						+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button id='hiddenR"
						+ (i + 1)
						+ "' class='btn btn-xs btn-danger deleteBtn' style='margin-center: 6px;cursor: pointer;' onclick='deleteOpdDocuments("
						+ result.lstNursingDocument[i].documentId + ")'><i class='fa fa-trash-o'> </i></button></td></tr>";
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



