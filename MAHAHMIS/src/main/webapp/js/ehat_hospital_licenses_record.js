
/****************************************************************************************************
 * @author Vishnu Thorat 
 * @since 25-11-2020 
 * @comment for save  Hospital License 
******************************************************************************************************/	
function saveHospitalLicense(){
	 var form = $("#documentMainForm")[0];
	 var id = $("#hospitalLicenseId").val();
	 var documentName = $("#documentName").val();
	 if(documentName == "" || documentName == undefined || documentName == null){
		 alert("Please enter document name...");
		 return false;
	 }
	
	 var descClauseNoDetails = $("#descClauseNoDetails").val();
	 var regNoLicenseNo = $("#regNoLicenseNo").val();
	 if(regNoLicenseNo == "" || regNoLicenseNo == undefined || regNoLicenseNo == null){
		 alert("Please enter registration no/licence no....");
		 return false;
	 }
	 
	 var issuingAuthOfficeName = $("#issuingAuthOfficeName").val();
	 if(issuingAuthOfficeName == "" || issuingAuthOfficeName == undefined || issuingAuthOfficeName == null){
		 alert("Please enter issuing authority office name...");
		 return false;
	 }
	 var issuingAuthOfficeAddress = $("#issuingAuthOfficeAddress").val();
	 var issuedOnDate = $("#issuedOnDate").val();
	 if(issuedOnDate == "" || issuedOnDate == undefined || issuedOnDate == null){
		 alert("Please enter issued on date...");
		 return false;
	 }
	 var isApplicable = $("#isApplicable option:selected").val();
	 if(isApplicable == 0 || isApplicable == undefined){
		 alert("Please Select Applicable...");
		 return false;
	 }
	 var issuingAuthorityContactPerson = $("#issuingAuthorityContactPerson").val();
	 var issuingAuthorityContactNO = $("#issuingAuthorityContactNO").val();
	 var issuingAuthorityContactEmail = $("#issuingAuthorityContactEmail").val();
	 if(issuingAuthorityContactNO == "" || issuingAuthorityContactNO == undefined || issuingAuthorityContactNO == null){
		 alert("Please enter issuing authority contact no");
		 return false; 
	 }
	 
	 var validFromDate = $("#validFromDate").val();
	 if(validFromDate == "" || validFromDate == undefined || validFromDate == null){
		 alert("Please enter valid till date...");
		 return false;
	 }
	 var validTillDate = $("#validTillDate").val();
	 if(validTillDate == "" || validTillDate == undefined || validTillDate == null){
		 alert("Please enter valid till date...");
		 return false;
	 }
	 
	 var renewalSubmissionDate = $("#renewalSubmissionDate").val();
	 if(renewalSubmissionDate == "" || renewalSubmissionDate == undefined || renewalSubmissionDate == null){
		 alert("Please enter renewal submission date...");
		 return false;
	 }
	 var actionAlertDate = $("#actionAlertDate").val();
	 if(actionAlertDate == "" || actionAlertDate == undefined || actionAlertDate == null){
		 alert("Please enter action alert date...");
		 return false;
	 }
	
	 var status = $("#status option:selected").val();
	 if(status == 0 || status == undefined){
		 alert("Please Select Status...");
		 return false;
	 }
	 var note = $("#Comments").val();
	 var hospitalLicenseDto = {
			 lstHospitalLicenseDto : []
			};
	 hospitalLicenseDto.lstHospitalLicenseDto.push({
			id : (id != 'undefined' && id != null) ? id : 0,
			documentName : (documentName != 'undefined' && documentName != null) ? documentName :'NA',
			descClauseNoDetails :(descClauseNoDetails != 'undefined' && descClauseNoDetails != null) ? descClauseNoDetails :'NA',
			regNoLicenseNo:(regNoLicenseNo != 'undefined' && regNoLicenseNo != null) ? regNoLicenseNo :'NA',
			issuingAuthOfficeName : (issuingAuthOfficeName != 'undefined' && issuingAuthOfficeName != null && issuingAuthOfficeName !="") ? issuingAuthOfficeName :'NA',
			issuingAuthOfficeAddress:(issuingAuthOfficeAddress != 'undefined' && issuingAuthOfficeAddress != null && issuingAuthOfficeAddress !="") ? issuingAuthOfficeAddress :'NA',
			issuedOnDate:(issuedOnDate != 'undefined' && issuedOnDate != null && issuedOnDate !="") ? issuedOnDate :'NA',
			isApplicable:(isApplicable != 'undefined' && isApplicable != null && isApplicable !="" && isApplicable !="0" && isApplicable !=0) ? isApplicable :'NA',
			issuingAuthorityContactPerson:(issuingAuthorityContactPerson != 'undefined' && issuingAuthorityContactPerson != null && issuingAuthorityContactPerson !="") ? issuingAuthorityContactPerson :'NA',
			issuingAuthorityContactNO:(issuingAuthorityContactNO != 'undefined' && issuingAuthorityContactNO != null && issuingAuthorityContactNO !="") ? issuingAuthorityContactNO :'NA',
			issuingAuthorityContactEmail:(issuingAuthorityContactEmail != 'undefined' && issuingAuthorityContactEmail != null && issuingAuthorityContactEmail !="") ? issuingAuthorityContactEmail :'NA',
			validFromDate:(validFromDate != 'undefined' && validFromDate != null && validFromDate !="") ? validFromDate :'NA',
			validTillDate:(validTillDate != 'undefined' && validTillDate != null && validTillDate !="") ? validTillDate :'NA',
			renewalSubmissionDate:(renewalSubmissionDate != 'undefined' && renewalSubmissionDate != null && renewalSubmissionDate !="") ? renewalSubmissionDate :'NA',
			actionAlertDate:(actionAlertDate != 'undefined' && actionAlertDate != null && actionAlertDate !="") ? actionAlertDate :'NA',
			status:(status != 'undefined' && status != null && status !="" && status !="0" && status !=0) ? status :'NA',
			note:(note != 'undefined' && note != null && note !="") ? note :'NA',
		});
	 
	 	var data = new FormData(form);
		data.append("lstHospitalLicenseDto", JSON.stringify(hospitalLicenseDto));
		jQuery.ajax({
			async : false,
			type : "POST",
			enctype : 'multipart/form-data',
			url : "ehat/hospitalLicense/saveHospitalLicense",
			data : data,
			processData : false,
			contentType : false,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				
				if (r[0] == 1) {
					
					if (document.getElementsByName("uploadHospitalLicenseDocs").length != 0 && $("#uploadHospitalLicenseDocument").val() != "") {
						uploadHospitalLicenseDocuments(r[1],"SAVEMASTER");
					}else{
						resetHospitalLicenseForm();
						setTimeout(function() {
					         window.location.reload();
					      }, 1000);
						getAllHospitalLicense();
						$("#hospitalLicenseId").val(0);
						$('#uploadHospitalLicenseDocument').val("");
						$('#uploadhlComment').val("");
					}
					alertify.success("Records Saved Sucessfully"); // alert("Record
					
					//to refresh the data
					
				} else if (r[0] == 2) {
					if (document.getElementsByName("uploadHospitalLicenseDocs").length != 0 && $("#uploadHospitalLicenseDocument").val() != "") {
						uploadHospitalLicenseDocuments(r[1],"SAVEMASTER");
					}else{
						$('#uploadHospitalLicenseDocument').val("");
						$('#uploadhlComment').val("");
						resetHospitalLicenseForm();
						setTimeout(function() {
					         window.location.reload();
					      }, 1000);
						getAllHospitalLicense();
					}
					alertify.success("Record Updated successfully..!"); // alert("Record
					//to refresh the data
					
				} else if(r[0] == 0) {
					alertify.error("Oops something went wrong.....!");
					//to refresh the data
					$('#uploadHospitalLicenseDocument').val("");
					$('#uploadhlComment').val("");
					resetHospitalLicenseForm();
					setTimeout(function() {
				         window.location.reload();
				      }, 1000);
				}
			}
		});
}


/****************************************************************************************************
 * @author Vishnu Thorat 
 * @since 25-11-2020 
 * @comment for edit Hospital License by id
******************************************************************************************************/	
function editHospitalLicense(id) {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/hospitalLicense/editHospitalLicense",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			 getUploadedHospitalLicenseDocuments(r.id);
			 $("#hospitalLicenseId").val(r.id);
			 $("#documentName").val(r.documentName);
			 $("#descClauseNoDetails").val(r.descClauseNoDetails);
			 $("#regNoLicenseNo").val(r.regNoLicenseNo);
			 $("#issuingAuthOfficeName").val(r.issuingAuthOfficeName);
			 $("#issuingAuthOfficeAddress").val(r.issuingAuthOfficeAddress);
			 $("#issuedOnDate").val(getDate(r.issuedOnDate));
			 $("#isApplicable option:selected").val(r.isApplicable);
			 $("#isApplicable option:selected").text(r.isApplicable);
			 $("#issuingAuthorityContactPerson").val(r.issuingAuthorityContactPerson);
			 $("#issuingAuthorityContactNO").val(r.issuingAuthorityContactNO);
			 $("#issuingAuthorityContactEmail").val(r.issuingAuthorityContactEmail);
			 $("#validFromDate").val(getDate(r.validFromDate));
			 $("#validTillDate").val(getDate(r.validTillDate));
			 $("#renewalSubmissionDate").val(getDate(r.renewalSubmissionDate));
			 $("#actionAlertDate").val(getDate(r.actionAlertDate));
			 $("#status option:selected").val(r.status);
			 $("#status option:selected").text(r.status);
			 $("#status").attr("disabled","disabled");
			 $("#Comments").val(r.note);

		}
	});
}

function deleteHospitalLicense(id) {
	
	if (confirm("Do you want delete this record for hospital license !")) {
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "ehat/hospitalLicense/deleteHospitalLicense",
			data : {
				id : id
			},
			cache : false,
			error : function() {
				alertify.error('Network Issue');
			},
			success : function(r) {
				if(r == 1){
					alertify.success("Record Deleted Sucessfully");	
					setTimeout(function() {
				         window.location.reload();
				      }, 1000);
					getAllHospitalLicense();
				}else{
					alertify.error("Oops Some Problem Ocured");
					setTimeout(function() {
				         window.location.reload();
				      }, 1000);
				}
				 
			}
		});
	}
}
/****************************************************************************************************
 * @author Vishnu Thorat 
 * @since 25-11-2020 
 * @comment for edit Hospital License by id
******************************************************************************************************/	
function getAllHospitalLicense() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/hospitalLicense/getAllHospitalLicense",
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			setHospitalLicense(r);
		}
	});
}

function setHospitalLicense(response) {

	var htm = "";
	var index = 1;
	if(response !="" && response !=null && response.lstHospitalLicenseDto !=null){
		for (var i = 0; i < response.lstHospitalLicenseDto.length; i++) {
			htm = htm +
				'<tr> ' +
				' <td class="col-md-1 center">' +
				index +
				'</td>' +
				' <td class="col-md-1 center">' +
				getDateWithTime(response.lstHospitalLicenseDto[i].createdDate) +
				'</td>' +
				' <td class="col-md-1 center">' +
				response.lstHospitalLicenseDto[i].documentName +
				'</td>' +
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].descClauseNoDetails
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].issuingAuthOfficeName
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].issuingAuthOfficeAddress
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].issuingAuthorityContactPerson
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].issuingAuthorityContactNO
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].issuingAuthorityContactEmail
				 +
				'</td>'+
				
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].isApplicable
				 +
				'</td>'+' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].regNoLicenseNo
				 +
				'</td>'+
				' <td class="col-md-1 center">' +getDate(response.lstHospitalLicenseDto[i].issuedOnDate)
				 +
				'</td>'+
				' <td class="col-md-1 center">' +getDate(response.lstHospitalLicenseDto[i].validFromDate)
				 +
				'</td>'+
				' <td class="col-md-1 center">' +getDate(response.lstHospitalLicenseDto[i].validTillDate)
				 +
				'</td>'+
				' <td class="col-md-1 center">' +getDate(response.lstHospitalLicenseDto[i].renewalSubmissionDate)
				 +
				'</td>'+
				' <td class="col-md-1 center">' +getDate(response.lstHospitalLicenseDto[i].actionAlertDate)
				 +
				'</td>'+' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].status
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].note
				 +
				'</td>';
				
				if(response.lstHospitalLicenseDto[i].lstHospitalLicenseDocUploadDto !=null){
					for (var j = 0; j < response.lstHospitalLicenseDto[i].lstHospitalLicenseDocUploadDto.length; j++) {
						htm = htm + ' <td class="col-md-1 center">' +
					'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" value="'+JSON.parse(response.lstHospitalLicenseDto[i].lstHospitalLicenseDocUploadDto[0].imagePath)+'" onclick=viewHospitalLicense(' +
						response.lstHospitalLicenseDto[i].id +',this.value)><i class="fa fa-eye View"></i></button></td>';
						break;
					}
				}else{
					htm = htm + ' <td class="col-md-1 center">NA</td>';
				}
				htm = htm + ' <td class="col-md-1 center">' +
					'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#hospitalLicensesModal" onclick=editHospitalLicense(' +
					response.lstHospitalLicenseDto[i].id +')><i class="fa fa fa-edit"></i></button></td>' +
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].userName
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].lastLoggedInDateTime
				 +
				'</td>'+
				' <td class="col-md-1 center">' +
				'	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deleteHospitalLicense(' +
				response.lstHospitalLicenseDto[i].id +')><i class="fa fa-trash-o"></i></button></td>'+ 
				'</tr>';
			index++;
			
			var numberOfRows="";
			var index1=1;
			var count=response.noOfPages;
			var numberOfPages=(count/10);
			var displayPagination=numberOfPages;	
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
				displayPagination=5;
			}
			for(var j=0;j<displayPagination;j++){
				numberOfRows +="<li onclick='paginationHospitalLicense("+index1+");'><a>"+index1+"</a></li>";
				index1=index1+1;
			}
			if(numberOfPages>6){
				numberOfRows +="<li class='next' onclick='nextPaginationHospitalLicense("+index1+","+Math.round(numberOfPages)+");'><a class='page-link' href='#'>Next</a></li>";
			}
			$('#totalNumberOfPagesHL').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
			$('#hlRecordPagination').html(numberOfRows);
		}
	}
		
	$("#hospitalLicenseTbody").html(htm);
}

/****************************************************************************************************
 * @author Vishnu Thorat 
 * @since 25-11-2020 
 * @comment for reset Hospital License form
******************************************************************************************************/	
function resetHospitalLicenseForm(){
	 $("#hospitalLicenseId").val("");
	 $("#documentName").val("");
	 $("#descClauseNoDetails").val("");
	 $("#regNoLicenseNo").val("");
	 $("#issuingAuthOfficeName").val("");
	 $("#issuingAuthOfficeAddress").val("");
	 $("#issuedOnDate").val("");
	 $("#isApplicable option:selected").val("0");
	 $("#issuingAuthorityContactPerson").val("");
	 $("#issuingAuthorityContactNO").val("");
	 $("#issuingAuthorityContactEmail").val("");
	 $("#validFromDate").val("");
	 $("#validTillDate").val("");
	 $("#renewalSubmissionDate").val("");
	 $("#actionAlertDate").val("");
	 $("#status option:selected").val("0");
	 $("#Comments").val("");

}


function uploadHospitalLicenseDocuments(hlMasterId,callFrom) {
	
	var form = $("#documentForm")[0];
	if (document.getElementsByName("uploadHospitalLicenseDocs").length == 0 || $("#uploadHospitalLicenseDocument").val() == "") {
		alert("Please select file");
		return false;
	}
	var hospitalLicenseMasterId = 0;
	if(hlMasterId  !=undefined && hlMasterId !=null && hlMasterId !=0 && hlMasterId !='undefined'){
		hospitalLicenseMasterId = hlMasterId;
	}else{
		hospitalLicenseMasterId = $("#hospitalLicenseId").val();	
	}
	var hospitalLicenseSlaveId = $("#hospitalLicenseSlaveId").val();
	var uploadHospitalLicenseDocument = getFileValue('uploadHospitalLicenseDocument');
	var uploadhlComment = $("#uploadhlComment").val();

	var hospitalLicenseDocumentUpload = {
			lstHospitalLicenseDocUploadDto : []
		};
	hospitalLicenseDocumentUpload.lstHospitalLicenseDocUploadDto.push({
		id : hospitalLicenseSlaveId,
		hospitalLicenseMasterId : hospitalLicenseMasterId,
		imagePath : JSON.stringify(uploadHospitalLicenseDocument),
		note : uploadhlComment,
	});

	var data = new FormData(form);
	data.append("documentUpload", JSON.stringify(hospitalLicenseDocumentUpload));
	data.append("hospitalLicenseId", hospitalLicenseMasterId);

	jQuery.ajax({
		async : false,
		type : "POST",
		enctype : 'multipart/form-data',
		url : "ehat/hospitalLicense/uploadHospitalLicenseDocument",
		data : data,
		processData : false,
		contentType : false,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if(r == 1){
				alertify.success("Document Uploaded Sucessfully"); 
				getUploadedHospitalLicenseDocuments(hospitalLicenseMasterId);
				$('#uploadHospitalLicenseDocument').val("");
				$('#uploadhlComment').val("");
				if(callFrom =="SAVEMASTER"){
					resetHospitalLicenseForm()
					setTimeout(function() {
				         window.location.reload();
				      }, 1000);
				}
				
			}else if(r == 2){
				alertify.success("Document Updated Sucessfully"); 
				getUploadedHospitalLicenseDocuments(hospitalLicenseMasterId);
				$('#uploadHospitalLicenseDocument').val("");
				$('#uploadhlComment').val("");
				if(callFrom =="SAVEMASTER"){
					resetHospitalLicenseForm()
					setTimeout(function() {
				         window.location.reload();
				      }, 1000);
				}
			}else if(r == 0){
				$('#uploadHospitalLicenseDocument').val("");
				$('#uploadhlComment').val("");
				alertify.error("Oops Some Problem Ocured"); 
			}
		}
	});
}
function getUploadedHospitalLicenseDocuments(hospitalLicenseId){
	var count = 0;
	var htm = "";
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {"hospitalLicenseId" : hospitalLicenseId },
		url : "ehat/hospitalLicense/getUploadedHospitalLicenseDocuments",
		success : function(response) {
			if(response !=null && response !="" && response.lstHospitalLicenseDocUploadDto !=null){
				var fileName = "";
				for ( var i = 0; i < response.lstHospitalLicenseDocUploadDto.length; i++) {
					count++;
					fileName = response.lstHospitalLicenseDocUploadDto[i].imagePath;
					htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="filePathDocumentUploadId' + count
					+ '" >'
					+ response.lstHospitalLicenseDocUploadDto[i].imagePath.replace(/[\[\]']+/g,'').replace(/"/g,"")
					+ '</td>'
					+ ' <td class="col-md-1 center" id="uploadedDateDocumentUploadId' + count
					+ '" >'
					+ getDateWithTime(response.lstHospitalLicenseDocUploadDto[i].createdDate)
					+ '</td>'
					//view button
					+ ' <td class="col-md-1 center"><button id="viewDocumentUploadId'+count+'" value="'+JSON.parse(response.lstHospitalLicenseDocUploadDto[i].imagePath)+'"  type="button" onclick="viewUploadedDocument(this.value)" ><i class="fa fa-eye" title="View Document"></i></button>'
					+ '</td>'
					//Delete button
					+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger" id="deleteDocumentUploadId'+count+'" value="'+response.lstHospitalLicenseDocUploadDto[i].id+'"  type="button" onclick="deleteUploadedDocumentHospitalLicense(this.value)" ><i class="fa fa-trash-o" title="Delete Document"></i></button>'
					+ '</td>'
					
					+ '</tr>';
				}
				$('#uploadedDocumentHLBody').html(htm);
			}
			var length =  $('tbody#uploadedDocumentHLBody tr.newAdded').length;
			if(length >0){
				$('#uploadHospitalLicenseDocument').attr("disabled","disabled");
				$('#uploadhlComment').attr("disabled","disabled");
			}else{
				$('#uploadHospitalLicenseDocument').removeAttr("disabled","disabled");
				$('#uploadhlComment').removeAttr("disabled","disabled");
			}
		}
			
	});
}

function deleteUploadedDocumentHospitalLicense(id) {
	
	if (confirm("Do you want delete this document of hospital license !")) {
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "ehat/hospitalLicense/deleteUploadedDocumentHospitalLicense",
			data : {
				id : id
			},
			cache : false,
			error : function() {
				alertify.error('Network Issue');
			},
			success : function(r) {
				if(r == 1){
					alertify.success("Record Deleted Sucessfully");	
					setTimeout(function() {
				         window.location.reload();
				      }, 1000);
					getAllHospitalLicense();
				}else{
					alertify.error("Oops Some Problem Ocured");
					setTimeout(function() {
				         window.location.reload();
				      }, 1000);
				}
				 
			}
		});
	}
}
function viewUploadedDocument(document){
	if(document ==null || document =="" || document ==undefined){
		alert("No File To View First Upload And Save file");
	}else{
		var hospitalLicenseId = $("#hospitalLicenseId").val();
		$('#viewDocumentHL').attr("src","");
		$('#viewDocumentHL').attr("src","ehat/hospitalLicense/readDocuments?hospitalLicenseId="+hospitalLicenseId+"&fileName="+document);
		$('#viewHLDocModal').modal('show');
	}

}

function viewHospitalLicense(id,document){
		window.open("ehat/hospitalLicense/readDocuments?hospitalLicenseId="+id+"&fileName="+document);
}


function getAllHospitalLicenseReports() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/hospitalLicense/getAllHospitalLicenseReports",
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			setHospitalLicenseReports(r);
		}
	});
}

function setHospitalLicenseReports(response) {

	var htm = "";
	var index = 1;
	if(response.lstHospitalLicenseDto.length > 0 ){
		for (var i = 0; i < response.lstHospitalLicenseDto.length; i++) {
			htm = htm +
				'<tr> ' +
				' <td class="col-md-1 center">' +
				index +
				'</td>' +
				' <td class="col-md-1 center">' +
				getDate(response.lstHospitalLicenseDto[i].createdDate) +
				'</td>' +
				' <td class="col-md-1 center">' +
				getTimeHospitalLicenseReport(response.lstHospitalLicenseDto[i].createdDate) +
				'</td>' +
				' <td class="col-md-1 center">' +
				response.lstHospitalLicenseDto[i].documentName +
				'</td>' +
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].descClauseNoDetails
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].issuingAuthOfficeName
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].issuingAuthOfficeAddress
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].issuingAuthorityContactPerson
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].issuingAuthorityContactNO
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].issuingAuthorityContactEmail
				 +
				'</td>'+
				
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].isApplicable
				 +
				'</td>'+' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].regNoLicenseNo
				 +
				'</td>'+
				' <td class="col-md-1 center">' +getDate(response.lstHospitalLicenseDto[i].issuedOnDate)
				 +
				'</td>'+
				' <td class="col-md-1 center">' +getDate(response.lstHospitalLicenseDto[i].validFromDate)
				 +
				'</td>'+
				' <td class="col-md-1 center">' +getDate(response.lstHospitalLicenseDto[i].validTillDate)
				 +
				'</td>'+
				' <td class="col-md-1 center">' +getDate(response.lstHospitalLicenseDto[i].renewalSubmissionDate)
				 +
				'</td>'+
				' <td class="col-md-1 center">' +getDate(response.lstHospitalLicenseDto[i].actionAlertDate)
				 +
				'</td>'+' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].status
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].note
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].userName
				 +
				'</td>'+
				' <td class="col-md-1 center">' +response.lstHospitalLicenseDto[i].lastLoggedInDateTime
				 +
				'</td>'+
				'</tr>';
			index++;
		}
	}
		
	$("#hospitalLicenseTbodyReports").html(htm);
}

function searchHospitalLicense(callFrom) {
	
		if(callFrom == "HLRNONREPORT"){
			var  searchByDate = $("#filterByDate option:selected").val();
			var  fromDate = $("#fromDate").val();
			var  toDate = $("#toDate").val();
			var  searchByDocument = $("#filterByDocument option:selected").val();
			var  documentName = $("#documentNameId").val();
			var  licenseNo = $("#licenseNoId").val();
			var  status = $("#filterByStatus option:selected").val();
			if(searchByDate == 0){
				alertify.error("Please select date filter");
				return false; 
			}else if(searchByDate != 0 && searchByDate == "All"){
				if(searchByDocument == 0){
					alertify.error("Please select document filter");
					return false; 
				}else if(searchByDocument !=0 && searchByDocument == "Document Name" && documentName == "" ){
					alertify.error("Please enter document name");
					return false; 
				}else if(searchByDocument !=0 && searchByDocument == "License No" && licenseNo == "" ){
					alertify.error("Please enter license no");
					return false; 
				}else if(searchByDocument !=0 && searchByDocument =="All"){
					if(fromDate == "" && toDate == ""){
						fromDate = 0;
						toDate = 0;
					}
				}else if(searchByDocument == 0 ){
					alertify.error("Please select document filter");
					return false; 
				}
			}else if(searchByDate != 0 && searchByDate == "Entry Date"){
				if(fromDate == ""){
					alertify.error("Please enter from date");
					return false; 
				}else if(fromDate != "" && toDate == ""){
					alertify.error("Please enter to date");
					return false; 
				}
				if(searchByDocument !=0 && searchByDocument == "Document Name" && documentName == "" ){
					alertify.error("Please enter document name");
					return false;
				}else if(searchByDocument !=0 && searchByDocument == "License No" && licenseNo == "" ){
					alertify.error("Please enter license no");
					return false;
				}else if(searchByDocument !=0 && searchByDocument =="All"){
					if(fromDate == "" && toDate == ""){
						fromDate = 0;
						toDate = 0;
					}
				}else if(searchByDocument == 0 ){
					alertify.error("Please select document filter");
					return false; 
				}
			}else if(searchByDate != 0 && searchByDate == "Valid from"){
				if(fromDate == ""){
					alertify.error("Please enter from date");
					return false; 
				}else if(fromDate != "" && toDate == ""){
					alertify.error("Please enter to date");
					return false; 
				}
				
				if(searchByDocument !=0 && searchByDocument == "Document Name" && documentName == "" ){
					alertify.error("Please enter document name");
					return false;
				}else if(searchByDocument !=0 && searchByDocument == "License No" && licenseNo == "" ){
					alertify.error("Please enter license no");
					return false;
				}else if(searchByDocument !=0 && searchByDocument =="All"){
					if(fromDate == "" && toDate == ""){
						fromDate = 0;
						toDate = 0;
					}
				}else if(searchByDocument == 0 ){
					alertify.error("Please select document filter");
					return false; 
				}
			}else if(searchByDate != 0 && searchByDate == "Valid till"){
				if(fromDate == ""){
					alertify.error("Please enter from date");
					return false; 
				}else if(fromDate != "" && toDate == ""){
					alertify.error("Please enter to date");
					return false; 
				}
				
				if(searchByDocument !=0 && searchByDocument == "Document Name" && documentName == "" ){
					alertify.error("Please enter document name");
					return false;
				}else if(searchByDocument !=0 && searchByDocument == "License No" && licenseNo == "" ){
					alertify.error("Please enter license no");
					return false;
				}else if(searchByDocument !=0 && searchByDocument =="All"){
					if(fromDate == "" && toDate == ""){
						fromDate = 0;
						toDate = 0;
					}
				}else if(searchByDocument == 0 ){
					alertify.error("Please select document filter");
					return false; 
				}
			}else if(searchByDate != 0 && searchByDate == "Renewal Submission"){
				if(fromDate == ""){
					alertify.error("Please enter from date");
					return false; 
				}else if(fromDate != "" && toDate == ""){
					alertify.error("Please enter to date");
					return false; 
				}
				
				if(searchByDocument !=0 && searchByDocument == "Document Name" && documentName == "" ){
					alertify.error("Please enter document name");
					return false;
				}else if(searchByDocument !=0 && searchByDocument == "License No" && licenseNo == "" ){
					alertify.error("Please enter license no");
					return false;
				}else if(searchByDocument !=0 && searchByDocument =="All"){
					if(fromDate == "" && toDate == ""){
						fromDate = 0;
						toDate = 0;
					}
				}else if(searchByDocument == 0 ){
					alertify.error("Please select document filter");
					return false; 
				}
			}else if(searchByDate != 0 && searchByDate == "Action Alert"){
				if(fromDate == ""){
					alertify.error("Please enter from date");
					return false; 
				}else if(fromDate != "" && toDate == ""){
					alertify.error("Please enter to date");
					return false; 
				}
				
				if(searchByDocument !=0 && searchByDocument == "Document Name" && documentName == "" ){
					alertify.error("Please enter document name");
					return false;
				}else if(searchByDocument !=0 && searchByDocument == "License No" && licenseNo == "" ){
					alertify.error("Please enter license no");
					return false;
				}else if(searchByDocument !=0 && searchByDocument =="All"){
					if(fromDate == "" && toDate == ""){
						fromDate = 0;
						toDate = 0;
					}
				}else if(searchByDocument == 0 ){
					alertify.error("Please select document filter");
					return false; 
				}
			}
		}else if(callFrom == "HLRREPORT"){
			var  searchByDate = $("#filterByDateReport option:selected").val();
			var  fromDate = $("#fromDateReport").val();
			var  toDate = $("#toDateReport").val();
			var  searchByDocument = $("#filterByDocumentReport option:selected").val();
			var  documentName = $("#documentNameIdReport").val();
			var  licenseNo = $("#licenseNoIdReport").val();
			var  status = $("#filterByStatusReport option:selected").val();
			if(searchByDate == 0){
				alertify.error("Please select date filter");
				return false; 
			}else if(searchByDate != 0 && searchByDate == "All"){
				if(searchByDocument == 0){
					alertify.error("Please select document filter");
					return false; 
				}else if(searchByDocument !=0 && searchByDocument == "Document Name" && documentName == "" ){
					alertify.error("Please enter document name");
					return false; 
				}else if(searchByDocument !=0 && searchByDocument == "License No" && licenseNo == "" ){
					alertify.error("Please enter license no");
					return false; 
				}else if(searchByDocument !=0 && searchByDocument =="All"){
					if(fromDate == "" && toDate == ""){
						fromDate = 0;
						toDate = 0;
					}
				}else if(searchByDocument == 0 ){
					alertify.error("Please select document filter");
					return false; 
				}
			}else if(searchByDate != 0 && searchByDate == "Entry Date"){
				if(fromDate == ""){
					alertify.error("Please enter from date");
					return false; 
				}else if(fromDate != "" && toDate == ""){
					alertify.error("Please enter to date");
					return false; 
				}
				if(searchByDocument !=0 && searchByDocument == "Document Name" && documentName == "" ){
					alertify.error("Please enter document name");
					return false;
				}else if(searchByDocument !=0 && searchByDocument == "License No" && licenseNo == "" ){
					alertify.error("Please enter license no");
					return false;
				}else if(searchByDocument !=0 && searchByDocument =="All"){
					if(fromDate == "" && toDate == ""){
						fromDate = 0;
						toDate = 0;
					}
				}else if(searchByDocument == 0 ){
					alertify.error("Please select document filter");
					return false; 
				}
			}else if(searchByDate != 0 && searchByDate == "Valid from"){
				if(fromDate == ""){
					alertify.error("Please enter from date");
					return false; 
				}else if(fromDate != "" && toDate == ""){
					alertify.error("Please enter to date");
					return false; 
				}
				
				if(searchByDocument !=0 && searchByDocument == "Document Name" && documentName == "" ){
					alertify.error("Please enter document name");
					return false;
				}else if(searchByDocument !=0 && searchByDocument == "License No" && licenseNo == "" ){
					alertify.error("Please enter license no");
					return false;
				}else if(searchByDocument !=0 && searchByDocument =="All"){
					if(fromDate == "" && toDate == ""){
						fromDate = 0;
						toDate = 0;
					}
				}else if(searchByDocument == 0 ){
					alertify.error("Please select document filter");
					return false; 
				}
			}else if(searchByDate != 0 && searchByDate == "Valid till"){
				if(fromDate == ""){
					alertify.error("Please enter from date");
					return false; 
				}else if(fromDate != "" && toDate == ""){
					alertify.error("Please enter to date");
					return false; 
				}
				
				if(searchByDocument !=0 && searchByDocument == "Document Name" && documentName == "" ){
					alertify.error("Please enter document name");
					return false;
				}else if(searchByDocument !=0 && searchByDocument == "License No" && licenseNo == "" ){
					alertify.error("Please enter license no");
					return false;
				}else if(searchByDocument !=0 && searchByDocument =="All"){
					if(fromDate == "" && toDate == ""){
						fromDate = 0;
						toDate = 0;
					}
				}else if(searchByDocument == 0 ){
					alertify.error("Please select document filter");
					return false; 
				}
			}else if(searchByDate != 0 && searchByDate == "Renewal Submission"){
				if(fromDate == ""){
					alertify.error("Please enter from date");
					return false; 
				}else if(fromDate != "" && toDate == ""){
					alertify.error("Please enter to date");
					return false; 
				}
				
				if(searchByDocument !=0 && searchByDocument == "Document Name" && documentName == "" ){
					alertify.error("Please enter document name");
					return false;
				}else if(searchByDocument !=0 && searchByDocument == "License No" && licenseNo == "" ){
					alertify.error("Please enter license no");
					return false;
				}else if(searchByDocument !=0 && searchByDocument =="All"){
					if(fromDate == "" && toDate == ""){
						fromDate = 0;
						toDate = 0;
					}
				}else if(searchByDocument == 0 ){
					alertify.error("Please select document filter");
					return false; 
				}
			}else if(searchByDate != 0 && searchByDate == "Action Alert"){
				if(fromDate == ""){
					alertify.error("Please enter from date");
					return false; 
				}else if(fromDate != "" && toDate == ""){
					alertify.error("Please enter to date");
					return false; 
				}
				
				if(searchByDocument !=0 && searchByDocument == "Document Name" && documentName == "" ){
					alertify.error("Please enter document name");
					return false;
				}else if(searchByDocument !=0 && searchByDocument == "License No" && licenseNo == "" ){
					alertify.error("Please enter license no");
					return false;
				}else if(searchByDocument !=0 && searchByDocument =="All"){
					if(fromDate == "" && toDate == ""){
						fromDate = 0;
						toDate = 0;
					}
				}else if(searchByDocument == 0 ){
					alertify.error("Please select document filter");
					return false; 
				}
			}
		}
		
		var inputs = [];
		inputs.push("searchByDate=" + encodeURIComponent(searchByDate));
		inputs.push("fromDate=" + encodeURIComponent(fromDate));
		inputs.push("toDate=" + encodeURIComponent(toDate));
		inputs.push("searchByDocument=" + encodeURIComponent(searchByDocument));
		inputs.push("documentName=" + encodeURIComponent(documentName));
		inputs.push("licenseNo=" + encodeURIComponent(licenseNo));
		inputs.push("status=" + encodeURIComponent(status));
		
		var str = inputs.join('&');
		console.log(str);
		jQuery.ajax({
			async : true,
			type : "GET",
			data: str + "&reqType=AJAX",
			url : "ehat/hospitalLicense/searchHospitalLicense",
			cache : false,
			error : function() {
				alertify.error('Network Issue');
			},
			success : function(response) {
				
				if(callFrom == "HLRNONREPORT"){
					setHospitalLicense(response);
					$("#filterByDate").val("0");
					$("#fromDate").val("");
					$("#toDate").val("");
					$("#filterByDocument").val("0");
					$("#documentNameId").val("");
					$("#licenseNoId").val("");
					$("#filterByStatus").val("0");
				}else if(callFrom == "HLRREPORT"){
					setHospitalLicenseReports(response);
					$("#filterByDateReport").val("0");
					$("#fromDateReport").val("");
					$("#toDateReport").val("");
					$("#filterByDocumentReport").val("0");
					$("#documentNameIdReport").val("");
					$("#licenseNoIdReport").val("");
					$("#filterByStatusReport").val("0");
				}
			}
		});
}

function autoSearchDocumentNameHospitalLicense(id,callFrom) {
	var resultData = [];
	var documentName = $("input#" + id).val();

	if (documentName == "" || documentName == null || documentName == "null" ||
			documentName == undefined) {

		alertify.error("Please enter search value");
		$("input#" + id).focus();
		return false;
	}
	var inputs = [];
	inputs.push('documentName=' + documentName);
	var str = inputs.join('&');
	jQuery
		.ajax({
			async: false,
			type: "POST",
			data: str + "&reqType=AJAX",
			url: "ehat/hospitalLicense/hospitalLicenseDocumentAutoSuggestion",
			cache: false,
			success: function (response) {
				var template = "";
				
				if(response.lstHospitalLicenseDto.length == 0){
					alertify.error("Record Not Found...!!!");
					if(callFrom == "NONREPORT"){
						document.getElementById('documentNameId').value = "";
					}else if(callFrom == "REPORT"){
						document.getElementById('documentNameIdReport').value = "";	
					}
				}
				
				for (var j = 0; j < response.lstHospitalLicenseDto.length; j++) {
					var arrValue = response.lstHospitalLicenseDto[j].documentName;
					var idValue = response.lstHospitalLicenseDto[j].id;
					var documentName1 = response.lstHospitalLicenseDto[j].documentName;
					resultData.push({
						ID: idValue,
						Name: documentName1
					});
					template = template + '<li data-value="' + idValue +
						'" class=""><a href="#">' + arrValue +
						'</a></li>';
					
				}

				setTimeout(function () {
					if(callFrom == "NONREPORT"){
						$("div#byDocumentName .typeahead").html(template);
						$("div#byDocumentName .typeahead").show();
					}else if(callFrom == "REPORT"){
						$("div#byDocumentName .typeahead").html(template);
						$("div#byDocumentName .typeahead").show();	
					}

					$("input#" + id).typeahead({
						source: resultData,
						displayField: 'Name',
						valueField: 'ID',
						onSelect: displayResult,
						scrollBar: true
					});
					$("input#" + id).data('typeahead').source = resultData;
				}, 500);
			}
		});

	function displayResult(item) {
		var documentId = item.value;
		var documentNmae = item.text;
		$("input#" + id).val(documentNmae);
		if(callFrom == "NONREPORT"){
			$("#documentNameHiddenId").val(documentId);
		}else if(callFrom == "REPORT"){
			$("#documentNameHiddenIdReport").val(documentId);
		}
		
	}
}


function autoSearchRegNoLicenseNoHospitalLicense(id,callFrom) {
	var resultData = [];
	var regNOLicenseNo = $("input#" + id).val();

	if (regNOLicenseNo == "" || regNOLicenseNo == null || regNOLicenseNo == "null" || regNOLicenseNo == undefined) {

		alertify.error("Please enter search value");
		$("input#" + id).focus();
		return false;
	}
	var inputs = [];
	inputs.push('regNOLicenseNo=' + regNOLicenseNo);
	var str = inputs.join('&');
	jQuery
		.ajax({
			async: false,
			type: "POST",
			data: str + "&reqType=AJAX",
			url: "ehat/hospitalLicense/hospitalLicenseRegNOLicenseNOAutoSuggestion",
			cache: false,
			success: function (response) {
				var template = "";
				
				if(response.lstHospitalLicenseDto.length == 0){
					alertify.error("Record Not Found...!!!");
					
					if(callFrom == "NONREPORT"){
						document.getElementById('licenseNoId').value = "";
					}else if(callFrom == "REPORT"){
						document.getElementById('licenseNoIdReport').value = "";
					}
				}
				
				for (var j = 0; j < response.lstHospitalLicenseDto.length; j++) {
					var arrValue = response.lstHospitalLicenseDto[j].regNoLicenseNo;
					var idValue = response.lstHospitalLicenseDto[j].id;
					var regNoLicenseNo1 = response.lstHospitalLicenseDto[j].regNoLicenseNo;
					resultData.push({
						ID: idValue,
						Name: regNoLicenseNo1
					});
					template = template + '<li data-value="' + idValue +
						'" class=""><a href="#">' + arrValue +
						'</a></li>';
					
				}

				setTimeout(function () {
					if(callFrom == "NONREPORT"){
						$("div#byRegNoLicenseNo .typeahead").html(template);
						$("div#byRegNoLicenseNo .typeahead").show();
					}else if(callFrom == "REPORT"){
						$("div#byRegNoLicenseNoReport .typeahead").html(template);
						$("div#byRegNoLicenseNoReport .typeahead").show();
					}

					$("input#" + id).typeahead({
						source: resultData,
						displayField: 'Name',
						valueField: 'ID',
						onSelect: displayResult,
						scrollBar: true
					});
					$("input#" + id).data('typeahead').source = resultData;
				}, 500);
			}
		});

	function displayResult(item) {
		var regNoLicenseNoId = item.value;
		var regNoLicenseNo = item.text;
		$("input#" + id).val(regNoLicenseNo);
		
		if(callFrom == "NONREPORT"){
			$("#licenseNoHiddenId").val(regNoLicenseNoId);
		}else if(callFrom == "REPORT"){
			$("#licenseNoHiddenIdReport").val(regNoLicenseNoId);
		}
	}
}
/********************************************************************************
 * @author Vishnu Thorat 
 * @since 25-11-2020 
 * @comment for get Time 
*******************************************************************************/
function getTime(id) {
	$("#"+id).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 10
	});
}

/********************************************************************************
 * @author Vishnu Thorat 
 * @since 25-11-2020 
 * @comment for get Today date 
*******************************************************************************/
function getTodaydate(){
	var todayDate=new Date().getDate()+"/"+((new Date().getMonth())+(01))+"/"+new Date().getFullYear();
	var todayTime=new Date().getHours() + ":"+ new Date().getMinutes();
	$("#collectiondate").val(todayDate);	
	$("#collectionTime").val(todayTime);
}

function getFileValue(id){
	var files = $('#'+id).prop("files");
	var document = $.map(files, function(val) {
		return val.name;
	});
	return document;
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

function getDate(date) {
	var datee;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2);
	return datee;
}
function getTimeHospitalLicenseReport(date) {
	var date1;
	var formattedDate = new Date(date);
	var hours = formattedDate.getHours();
	var minute = formattedDate.getMinutes();
	var seconds = formattedDate.getSeconds();
	date1 = + hours + ":" +('0' + minute).slice(-2)+ ":" +('0' + seconds).slice(-2);
	return date1;
}

function getStatus(	) {
	if($("#validTillDate").val() !=""){
		var dayRemaining = new Date($("#validTillDate").val());
		var currentDate = new Date();
		const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
		const firstDate = dayRemaining;
		const secondDate = currentDate;
		const diffDays = Math.round(Math.sign((firstDate - secondDate) / oneDay));
		const diffVal = Math.round(Math.abs((firstDate - secondDate) / oneDay));
		
		if(diffDays <0){
			$("#status").val("Expired");
		}else{
			$("#status").val("Valid");	
		}
	}
}
function refreshData(){
	$("#status").attr("disabled","disabled");
	$("#uploadedDocumentHLBody").html("");
	$('#uploadHospitalLicenseDocument').removeAttr("disabled","disabled");
	$('#uploadhlComment').removeAttr("disabled","disabled");
}


