/**
 * @author aniket_kanse
 * @since 28/10/2020
 */
function getRadiologistList(){
//	alert("new JS");
	
	jQuery.ajax({
    	async : false,
    	type : "GET",
    	//data 	: str + "&reqType=AJAX",
		url : "ehat/ris/getAllRadiologistsList",
		success : function(r) {
			//alert(r);
			//var r = JSON.stringify(r);
			setRadiologist(r);
			$("#btnEditReport").attr('disabled', true);
		}
	});
}

function setRadiologist(r){
	
	//var result = JSON.stringify(r);
	//alert("Hello"+result);
	
	
	//var list = "";
	var list = "<option value='0'>Select Radiologist/Cardiologist</option>";
    for ( var i = 0; i < r.listDoctor.length; i++) {    

		list = list + "<option value='"+r.listDoctor[i].doctor_ID+"'>" + (r.listDoctor[i].doc_name) + "</option>";
    	
    //	list = list + "<option value='"+r.listDoctorDetails[i].Doctor_ID+"'>" + (r.listDoctorDetails[i].doc_name) + "</option>";
    	
		}   
	$("#radiologist").html(list);   
}

/**
 * @author aniket_kanse
 * @since 4/11/2020
 * @param pId
 */
function getTakenArrivalDateTime(idradTestName, Idradiology){
	
	/*alert("idTestRadiology>>> " + idradTestName);
	alert("idRadiologyTest>>> " + Idradiology);*/
	
	jQuery.ajax({
		
		async : false,
		type  : "GET",
		data  : {
					"idTestRadiology" : idradTestName,
					"idRadiologyTest" : Idradiology
				},
		url	  : "ehat/ris/getTakenArrivalDateTime",
		timeout : 1000*60*5,
		cache : false,
		error : function(){
			alert("Error");
		},
		success : function(r){
			
			setDates(r);
		}
	});
	
}

function setDates(r){
	//arrivalDate arrivalTime takenDate takenTime
	var arrivalArray = new Array();
	var arr = r[0].arrivalTime;
	arrivalArray = arr.split(" ");
	
	var arrDate = arrivalArray[0];
		if(arrDate == 0 || arrDate == undefined || arrDate == "" || arrDate == "0"){
			alert("Please check Arrival in Diagnostic Test !");
			window.location = "ehat_Ris.jsp?";
		}else {
			$("#arrivalDate").val(arrDate);
		}
	
	$("#arrivalTime").val(arrivalArray[1] + " " + arrivalArray[2]);
	
	var takenArray = new Array();
	var taken = r[0].takenTime;
	takenArray = taken.split(" ");
	
	
	var takenDate = takenArray[0];
	if(takenDate == 0 || takenDate == undefined || takenDate == "" || takenDate == "0"){
		alert("Please check Taken in Diagnostic Test !");
		window.location = "ehat_Ris.jsp?";
	}else {
		$("#takenDate").val(takenArray[0]);
	}
	$("#takenTime").val(takenArray[1] + " " + takenArray[2]);
	
}

/**
 * @author Aniket Kanse
 * @since 05/11/2020
 */
function saveRisReportRecords(){
	
	var idRadiologyTest = parseInt($("#Idradiology").text());
//	alert("--idradiology_test-- :: " + idradiology_test);
	var testReportId = $("#testReportId").val();
	
	if(testReportId == 0 || testReportId == undefined || testReportId == "" || testReportId == "0" || testReportId == null || testReportId == "null" || testReportId == "undefined"){
		alert("Please Create RIS Report First !");
		return false;
	}
	
	var patientId = parseInt($("#patientId").text());
	var patientName = $("#patientName").text();
	var treatmentId = parseInt($("#treatmentId").text());
    var departmentNo = $("#ipdNo").text();	// aniket 6 FEB 22 // after changing it to diagnostics id
	
	var arrivalDate = $("#arrivalDate").val();
	var arrivalTime = $("#arrivalTime").val();
	var takenDate = $("#takenDate").val();
	var takenTime = $("#takenTime").val();
	
	var investigation = $("#investigationName").val();
	var instruction = $("#instruction").val();
	var clinicalNotes = $("#clinicalNotes").val();
	var radiologist = $("#radiologist").find('option').filter(':selected').text();
	//alert("radiologist--:: " + radiologist);
	var id = $("#viewRISReportId").val();
	
	//alert("testReportId -- " + testReportId);
	//validations
	
	if (investigation == "" || investigation == null) {
		alert("Please Verify Investigation !");
		return false;
	}
	
	if (radiologist == "" || radiologist == null || radiologist == "Select Radiologist" || radiologist == 0) {
		alert('please select radiologist');
		$("#radiologist").focus();
		return false;
	}
	
	
	var inputs = [];
	inputs.push("id=" + id);
	inputs.push("idRadiologyTest=" + idRadiologyTest);
	inputs.push("testReportId=" + testReportId);
	inputs.push("patientId=" + patientId);
	inputs.push("patientName=" + patientName);
	inputs.push("treatmentId=" + treatmentId);
	inputs.push("departmentNo=" + departmentNo);
	
	inputs.push("arrivalDate=" + arrivalDate);
	inputs.push("arrivalTime=" + arrivalTime);
	inputs.push("takenDate=" + takenDate);
	inputs.push("takenTime=" + takenTime);
	
	inputs.push("investigation=" + investigation);
	inputs.push("instruction=" + instruction);
	inputs.push("clinicalNotes=" + clinicalNotes);
	inputs.push("radiologist=" + radiologist);
	
	var str = inputs.join('&');
	
	jQuery
	.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/saveRisReportRecords",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			alert(r);
			
			//$("#report").val("0");
			$("#instruction").val("");
			$("#clinicalNotes").val("");
			$("#testReportId").val("");
			
			location.reload(true);
			
		}
	});
}

function fetchRisReportRecordByPatientId(patientId){
	
	//alert("patient ID = " + patientId);
	
	jQuery.ajax({
		async 	: false,
		type 	: "GET",
		data 	: {
					"idradTestName" : patientId,
 			},
 			url : "ehat/ris/fetchRisReportRecordByPatientId",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			alert('error');
		},
		success : function(r) {
		//alert(r);
   		setRisReportRecords(r);
		}
	});
	
}
	
/**
 * @author aniket kanse
 * @param r
 * @since 07/11/2020
 */
function setRisReportRecords(r){
	
	//$("#risReportsList").val(r);
	
	var htmBody = "";
	if (r.listViewRisRecordsDTO.length == 0 || r.listViewRisRecordsDTO.length == null) {
		htmBody = htmBody + "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>No Records Found</th></tr>";
		
	} else {
		
		for ( var i = 0; i < r.listViewRisRecordsDTO.length; i++) {
			
			htmBody = htmBody + "<tr style='height:21px;'>"
			+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
			+ "<td class='col-md-1 center' >" + r.listViewRisRecordsDTO[i].radiologist + "</td>";
		//	+ "<td class='col-md-1 center' ><button class='btn btn-xs btn-warning' onclick=viewRisReport('"+r.listViewRisRecordsDTO[i].testReportId+"')><i class='fa fa-eye'></i></button></td>";
			
			if(r.listViewRisRecordsDTO[i].verifyFlag == 'Y'){
				htmBody = htmBody 
				+ "<td class='col-md-1 center' ><button type='button' class='btn btn-xs btn-success' disabled id='verify"+(i+1)+"' onclick=verifyRisReport('"+r.listViewRisRecordsDTO[i].id+"','"+ (i + 1)+"')> <i class='fa fa-check-circle' aria-hidden='true'></i></button></td>";
			}else {
				htmBody = htmBody 
				+ "<td class='col-md-1 center' ><button type='button' class='btn btn-xs btn-success' id='verify"+(i+1)+"' onclick=verifyRisReport('"+r.listViewRisRecordsDTO[i].id+"','"+ (i + 1)+"')> <i class='fa fa-check-circle' aria-hidden='true'></i></button></td>";
			}
			
			//+ "<td class='col-md-1 center' ><button type='button' class='btn btn-xs btn-success' id='verify"+(i+1)+"' onclick=verifyRisReport('"+r.listViewRisRecordsDTO[i].id+"','"+ (i + 1)+"')> <i class='fa fa-check-circle' aria-hidden='true'></i></button></td>";
			
			if(r.listViewRisRecordsDTO[i].verifyFlag == 'Y'){
				htmBody = htmBody 
				+ "<td class='col-md-1 center' ><button type='button' class='btn btn-xs btn-info' id='post"+(i+1)+"' onclick=sendRisReport('"+r.listViewRisRecordsDTO[i].testReportId+"','post','"+r.listViewRisRecordsDTO[i].id+"')> <i class='fa fa-cloud-upload' aria-hidden='true'></i></button></td>";
			}else {
				htmBody = htmBody 
				+ "<td class='col-md-1 center' ><button type='button' class='btn btn-xs btn-info' disabled id='post"+(i+1)+"' onclick=sendRisReport('"+r.listViewRisRecordsDTO[i].testReportId+"','post')> <i class='fa fa-cloud-upload' aria-hidden='true'></i></button></td>";
			}
			
			
			htmBody = htmBody
			+ "<td class='col-md-1 center' ><button type='button' class='btn btn-xs btn-warning'  title='With H/F' onclick=printRisReport('"+r.listViewRisRecordsDTO[i].testReportId+"','"+r.listViewRisRecordsDTO[i].id+"','withHf')> <i class='fa fa-print' aria-hidden='true'></i></button>"
		    + "<span style='margin-left: 5px;'></span> <button type='button' class='btn btn-xs btn-success'  title='Without H/F' onclick=printRisReport('"+r.listViewRisRecordsDTO[i].testReportId+"','"+r.listViewRisRecordsDTO[i].id+"','withoutHf')> <i aria-hidden='true' class='fa fa-print'></i> </button> </td>";
			
			if(r.listViewRisRecordsDTO[i].verifyFlag == 'Y'){
				htmBody = htmBody 
				+ "<td class='col-md-1 center' ><button type='button' class='btn btn-xs btn-danger' id='send"+(i+1)+"' onclick=sendRisReport('"+r.listViewRisRecordsDTO[i].testReportId+"','send','"+r.listViewRisRecordsDTO[i].id+"')> <i class='fa fa-envelope' aria-hidden='true'></i></button></td>";
			}else {
				htmBody = htmBody 
				+ "<td class='col-md-1 center' ><button type='button' class='btn btn-xs btn-danger' disabled id='send"+(i+1)+"' onclick=sendRisReport('"+r.listViewRisRecordsDTO[i].testReportId+"','send')> <i class='fa fa-envelope' aria-hidden='true'></i></button></td>";
			}
			
			htmBody = htmBody
			+ "<td class='col-md-1 center' >" + r.listViewRisRecordsDTO[i].createdByUserName + "</td>" 
			+ "<td class='col-md-1 center' >" + r.listViewRisRecordsDTO[i].createdDate + "</td>";
			
			if(r.listViewRisRecordsDTO[i].postFlag == 'Y'){
				htmBody = htmBody 
				+ "<td class='col-md-1 center' ><button type='button' class='btn btn-xs btn-primary' disabled onclick=editRisReportRecord('"+r.listViewRisRecordsDTO[i].id+"')> <i class='fa fa-pencil-square-o' aria-hidden='true'></i></button></td>";
			}else {
				htmBody = htmBody 
				+ "<td class='col-md-1 center' ><button type='button' class='btn btn-xs btn-primary' onclick=editRisReportRecord('"+r.listViewRisRecordsDTO[i].id+"')> <i class='fa fa-pencil-square-o' aria-hidden='true'></i></button></td>";
			}
			
			if(r.listViewRisRecordsDTO[i].postFlag == 'Y'){
				htmBody = htmBody 
				+ "<td class='col-md-1 center' ><button type='button' class='btn btn-xs btn-primary' disabled onclick=editRisRep('"+r.listViewRisRecordsDTO[i].id+"')> <i class='fa fa-pencil-square-o' aria-hidden='true'></i></button></td>";
			}else {
				htmBody = htmBody 
				+ "<td class='col-md-1 center' ><button type='button' class='btn btn-xs btn-primary' onclick=editRisRep('"+r.listViewRisRecordsDTO[i].id+"')> <i class='fa fa-pencil-square-o' aria-hidden='true'></i></button></td>";
			}
			
			htmBody = htmBody
			+ "<td class='col-md-1 center' ><button type='button' class='btn btn-xs btn-warning' onclick=deleteRisReportRecord('"+r.listViewRisRecordsDTO[i].id+"')> <i class='fa fa-times' aria-hidden='true'></i></button></td>"
			
			+'</tr>';
		}
	}
	$("#risRecTableBody").html(htmBody);
}

function editRisRep(recordId){
	editRisReportRecord(recordId);
	editRISReport(0);
}


/**
 * @autor aniket kanse
 * @since 09/11/2020
 * @param reportId
 */
function verifyRisReport(id, count){
	
	//document.getElementById("post" + count).disabled = false; 
	$("#post" + count).prop('disabled',false);
	$("#send" + count).prop('disabled',false);
	
	var r = confirm("Verify RIS Record ?");
	if (r == true) {
	
		jQuery.ajax({
			async 	: false,
			type 	: "POST",
			data 	: {
						"id" : id,
	 			},
	 			url : "ehat/ris/verifyRisReportRecord",
			timeout : 1000 * 60 * 5,
			cache 	: false,
			error 	: function() {
				alert('error');
			},
			success : function(r) {
			if(r == 1){
				//alert("Verified !");
				alertify.success("Verified !");
				location.reload();
			}else
				alert("There is some problem verifying record !");
				location.reload();
			}
		});
	}
}

function editRisReportRecord(recordId){
	
	//alert("Edit RIS report ID :: " + recordId);
	$("#btnCreReport").attr('disabled', true);
	$("#btnEditReport").attr('disabled', false);
	
	jQuery.ajax({
		async 	: false,
		type 	: "GET",
		data 	: {
					"id" : recordId,
 			},
 			url : "ehat/ris/getSingleRISRecord",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			alert('error');
		},
		success : function(r) {
			//alert(r);
			setRISObject(r);
		}
	});
}

function setRISObject(r){
	
	for(var i=0;i<r.length;i++){
		
		//alert(r[i].radiologist);
		
		$("#arrivalDate").val(r[i].arrivalDate);
		$("#arrivalTime").val(r[i].arrivalTime);
		$("#takenDate").val(r[i].takenDate);
		$("#takenTime").val(r[i].takenTime);
		
		$("#investigationName").val(r[i].investigation);
		$("#instruction").val(r[i].instruction);
		$("#clinicalNotes").val(r[i].clinicalNotes);
		
		var selected = r[i].radiologist;
		$("#radiologist option").filter(function() {
		  return $(this).text() == selected;
		}).prop('selected', true);
		
		//setting hidden fields below
		
		$("#viewRISReportId").val(r[i].id); //PK ehat_view_ris_records
		$("#testReportId").val(r[i].testReportId); // PK ehat_radiology_test_report
		//$("#arrivalDate").val(r[i].arrivalDate);
		$("#createUpdateReportId").val(r[i].testReportId);	//PK ehat_radiology_test_report
	}
}
	
/**
 * @autor aniket kanse
 * @since 08/11/2020
 * @param reportId
 */
function viewRisReport(idRadiologyTestReport){
	
	var pageType = getUrlParameter("pageType");
	
	jQuery.ajax({
		async 	: false,
		type 	: "POST",
		data 	: {
					"idRadiologyTestReport" : idRadiologyTestReport,
 			},
 			url : "ehat/ris/viewRisReportRecord",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			alert('error');
		},
		success : function(r) {
			
		if(r.listRadiologyTempReportDTO.length > 0){
				
					if(pageType == "Nuclear"){
					setTimeout( function() {
						CKEDITOR.instances['viewckeditor1'].setData(r.listRadiologyTempReportDTO[0].templateData);
						 $('#selRisCrTempList1 option[value="'+r.listRadiologyTempReportDTO[0].templateTypeId+'"]').attr("selected",true);
						 $("#selRisCrTempList1").prop("disabled", true);
						 $("#risTemplateList").prop("disabled", true);  
						CKEDITOR.instances['Riseditor1'].setData(r.listRadiologyTempReportDTO[0].templateData);
						CKEDITOR.instances['Riseditor1'].setReadOnly(true);
						CKEDITOR.instances['RiseditorSubjective1'].setData(r.listRadiologyTempReportDTO[0].nuclearData);
						setRadiologyTemplates(r.listRadiologyTempReportDTO[0].templateId);
						}, 600);
					setTimeout( function() {
						CKEDITOR.instances['viewckeditor2'].setData(r.listRadiologyTempReportDTO[0].nuclearData);
					},500);
					}
					else{
					 setTimeout( function() {
					 CKEDITOR.instances['viewckeditor1'].setData(r.listRadiologyTempReportDTO[0].templateData);
					 $('#selRisCrTempList1 option[value="'+r.listRadiologyTempReportDTO[0].templateTypeId+'"]').attr("selected",true);
					 CKEDITOR.instances['Riseditor1'].setData(r.listRadiologyTempReportDTO[0].templateData);
					 setRadiologyTemplates(r.listRadiologyTempReportDTO[0].templateId);
					 }, 600);
				 }

			}else{
				
				$("#btnCreRepo").attr('disabled', false);
				if(pageType == "Nuclear"){
					 setTimeout( function() {
					CKEDITOR.instances['Riseditor1'].setReadOnly(true);
					 },600);
				}
			}
		}
	});
	
	$('#RisPopUp').modal("show");
}
	



function printRisReport(reportId, pkViewRisRecordsDTO,isHeader){
	
	   var idRadiologyTestReport = reportId;	// PK of table ehat_radiology_test_report;
	   var pageType = getUrlParameter("pageType");
	   var testid = $("#TestID").text();
	   if(testid =="" || testid == null || testid == "null"){
		   testid = getUrlParameter("Idradiology");
	   }
  //   var patID = $("#patientId").text();				// changed, aniket, 31 JAN 22
	   
	   var patID = $("#PID").text();
	   var treatID = $("#TID").html();
	   var radiologyTestId = $("#idradTestName").text();
	   //for getting dept id to check receipt no is it IPD/OPD
	   var deptCallfrom = $('#depdocdeskid').val();
	   var callfrom="";
	   if(deptCallfrom == 1)
	   {
		   callfrom = "receiptris";
		}else if(deptCallfrom == 2)
		{
			callfrom= "receiptRisIpd"
		}else
		{
			callfrom= "receipt"
		}
	   
	   
	   setTimeout(
	           function() {
//	               window.open(("ehat_risReportRecordPrint.jsp?" 
//	            		   + "testId=" +(testid) 
//	            		   + "&patID=" + encodeURIComponent(patID) 
//	            		   + "&treatID=" + encodeURIComponent(treatID)
//	            		   + "&radiologyTestId=" + encodeURIComponent(radiologyTestId)
//	            		   + "&idRadiologyTestReport=" + encodeURIComponent(idRadiologyTestReport)
//	            		   + "&pkViewRisRecordsDTO=" + encodeURIComponent(pkViewRisRecordsDTO)
//	                       + "&pageType=" +pageType));
	        	   
	        	   window.open(("ehat_risReportRecordPrint_new.jsp?" 
	            		   + "testId=" +(testid) 
	            		   + "&patID=" + encodeURIComponent(patID) 
	            		   + "&treatID=" + encodeURIComponent(treatID)
	            		   + "&radiologyTestId=" + encodeURIComponent(radiologyTestId)
	            		   + "&idRadiologyTestReport=" + encodeURIComponent(idRadiologyTestReport)
	            		   + "&pkViewRisRecordsDTO=" + encodeURIComponent(pkViewRisRecordsDTO)
	            		   + "&pendFlag=" + "N"
	                       + "&pageType=" +pageType
	                       + "&callFrom=" +callfrom
	                       + "&isHeader=" +isHeader));
	   }, 300);
	
}

function sendRisReport(reportId, callfrom, pkViewRisRecordsDTO){
	
	//alert("callfrom -- > " + callfrom);
	$("#pkViewRisRecordsDTO").val(pkViewRisRecordsDTO);	// aniket kanse / 17 DEC 2020
	
	$("#reportIdForMail").val(reportId);
	$("#emailRISCallFrom").val(callfrom);
	
	if(callfrom == "send"){
		
		var r = confirm("Are You Sure You Want To Email this Report?");
		if (r == true) {   		
			$("#sendRisEmailPopUp").modal('show');  		   		
		} 
		
	} else {
		
		var patientsEmailId = $("#patientsEmailId").val();
		
		if(patientsEmailId == 0 || patientsEmailId == undefined || patientsEmailId == "" || patientsEmailId == "0" || patientsEmailId == null){
			alert("Patient's Email Id does not exist !");
			return false;
		}else{
			var r = confirm("Are You Sure You Want To Post this Report?");
			if (r == true) {   		
				//alert("Posting Report !");
				sendRisReportEmail();
			} 
		}
	}
	
	
}

function closeSendRisEmailPopup()
{
	$("#sendRisEmailPopUp").modal('hide');  
	//$("#patientNameemail").val('');
}

function sendRisReportEmail(){
	var fromEmailAddress = $("#centerSpecificFromEmail").val();
	var idRadiologyTestReport = $("#reportIdForMail").val();	// PK of table ehat_radiology_test_report;
	
	var patientsEmailId = $("#patientsEmailId").val();		//if posting, use patient's email address as recipient.
	var emailRISCallFrom = $("#emailRISCallFrom").val();	//for differentiating between post and send.
	
	var pageType = getUrlParameter("pageType");
	var testid = $("#TestID").text();
	   if(testid =="" || testid == null || testid == "null"){
		   testid = getUrlParameter("Idradiology");
	   }
	var patID = $("#patientId").text();
	var treatID = $("#TID").html();
	var radiologyTestId = $("#idradTestName").text();
	
	var emailTo = $("#emailTo").val();
	var emailCC = $("#emailCC").val();
	var mailBody = $("#mailBodyId").val();
	
	var pkViewRisRecordsDTO = $("#pkViewRisRecordsDTO").val();
	
		jQuery.ajax({
	        async : true,
	        type : "POST",
	    	data : {
	    		fromEmailAddress :fromEmailAddress,
	    		idRadiologyTestReport : idRadiologyTestReport,
	    		patientsEmailId : patientsEmailId,
	    		emailRISCallFrom : emailRISCallFrom,
	    		pageType : pageType,
	    		testid : testid,
	    		patID : patID,
	    		treatID : treatID,
	    		radiologyTestId : radiologyTestId,
	    		emailTo : emailTo,
	    		emailCC : emailCC,
	    		mailBody : mailBody,
	    		pkViewRisRecordsDTO : pkViewRisRecordsDTO
			},
			url : "ehat/ris/sendRisReportEmail",
	        success : function(r) {      	
	        		alertify.success("Report Sent !");
	        		//alert("Report Sent !");
	        		$("#emailTo").val('');
	        		$("#emailCC").val('');
	        		$("#mailBodyId").val('');
	    			$("#sendRisEmailPopUp").modal('hide');  
	    			
	    			setPostFlag(idRadiologyTestReport);		//set post flag to Y , to disable investigation edit and report edit after posting/emailing report/ //aniket / 30 NOV 2020 
	    					
	        }
	    });
	   
}

//aniket kanse / 16 DEC 2020 / Email validation.
function validateEmail(id) {
	var email = $("#"+id).val();
	
	var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(email)) {
        return true;
    }
    else {
    	alert("Please enter valid email id");
        return false;
    }
}


function setPostFlag(testReportId){
	//alert("-- post flag --"  + testReportId);
	
	jQuery.ajax({
		async 	: false,
		type 	: "POST",
		data 	: {
					"testReportId" : testReportId,
 			},
 			url : "ehat/ris/setPostFlag",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			alert('error');
		},
		success : function(r) {
		if(r == 1){
			//alertify.success("Verified !");
			alert("Report Sent !");
			location.reload();
		}else
			//alert("There was some problem in sending report !");
			location.reload();
		}
	});
}

function deleteRisReportRecord(id){
	
	var r = confirm("Delete RIS Record ?");
	if (r == true) {
	
		jQuery.ajax({
			async 	: false,
			type 	: "POST",
			data 	: {
						"id" : id,
	 			},
	 			url : "ehat/ris/deleteRisReportRecord",
			timeout : 1000 * 60 * 5,
			cache 	: false,
			error 	: function() {
				alert('error');
			},
			success : function(r) {
			if(r == 1){
				alert("Record Deleted !");
				location.reload();
			}else
				alert("There is some problem deleting record !");
				location.reload();
			}
		});
	}
	
}

function editRISReport(check){
	
	var pageType = getUrlParameter("pageType");
	
	var TestID = $("#viewtest").val();//$("#TestID").text().trim(); 
	if(TestID == 0 || TestID == undefined || TestID == ""){
	 TestID = $("#idTestRadiology").text(); 
	}
	var TID = $("#TID").text();
	var PID = $("#PID").text();
	var idradTestName = $("#Idradiology").text();
	
	var testReportId = $("#createUpdateReportId").val();
	
	/*window.location.href = "ehat_EditRISReportTemp.jsp?" + "&TestID=" + TestID + "&Tid=" + TID + "&Pid=" + PID 
	+"&idradTestName="+idradTestName + "&testReportId=" + testReportId + "&pageType=" + pageType + "&check=" + check;*/
	
	window.location = "ehat_EditRISReportTemp.jsp?" + "&TestID=" + TestID + "&Tid=" + TID + "&Pid=" + PID 
	+"&idradTestName="+idradTestName + "&testReportId=" + testReportId + "&pageType=" + pageType + "&check=" + check;
	
}

function getRISReportToEdit(idRadiologyTestReport){
	
	var pageType = getUrlParameter("pageType");
	
	jQuery.ajax({
		async 	: false,
		type 	: "POST",
		data 	: {
					"idRadiologyTestReport" : idRadiologyTestReport,
 			},
 			url : "ehat/ris/viewRisReportRecord",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			alert('error');
		},
		success : function(r) {
			
		if(r.listRadiologyTempReportDTO.length > 0){
				
					if(pageType == "Nuclear"){
					setTimeout( function() {
						CKEDITOR.instances['viewckeditor1'].setData(r.listRadiologyTempReportDTO[0].templateData);
						 $('#selRisCrTempList1 option[value="'+r.listRadiologyTempReportDTO[0].templateTypeId+'"]').attr("selected",true);
						 $("#selRisCrTempList1").prop("disabled", true);
						 $("#risTemplateList").prop("disabled", true);  
						CKEDITOR.instances['Riseditor1'].setData(r.listRadiologyTempReportDTO[0].templateData);
						CKEDITOR.instances['Riseditor1'].setReadOnly(true);
						CKEDITOR.instances['RiseditorSubjective1'].setData(r.listRadiologyTempReportDTO[0].nuclearData);
						setRadiologyTemplates(r.listRadiologyTempReportDTO[0].templateId);
						}, 600);
					setTimeout( function() {
						CKEDITOR.instances['viewckeditor2'].setData(r.listRadiologyTempReportDTO[0].nuclearData);
					},500);
					}
					else{
					 setTimeout( function() {
					 CKEDITOR.instances['viewckeditor1'].setData(r.listRadiologyTempReportDTO[0].templateData);
					 $('#selRisCrTempList1 option[value="'+r.listRadiologyTempReportDTO[0].templateTypeId+'"]').attr("selected",true);
					 CKEDITOR.instances['Riseditor1'].setData(r.listRadiologyTempReportDTO[0].templateData);
					 setRadiologyTemplates(r.listRadiologyTempReportDTO[0].templateId);
					 }, 600);
				 }

			}else{
				
				$("#btnCreRepo").attr('disabled', false);
				if(pageType == "Nuclear"){
					 setTimeout( function() {
					CKEDITOR.instances['Riseditor1'].setReadOnly(true);
					 },600);
				}
			}
		}
	});
	
}

function setRISDocuments(r){		//caller method is present in file "ehat_patient.js", named "fetchImage(testid)" // aniket_kanse, 25 NOV 2020
	
	var htmBody = "";
	if (r.lstRisImageUploadDTONew.length == 0 || r.lstRisImageUploadDTONew.length == null) {
		htmBody = htmBody + "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>No Records Found</th></tr>";
		
	} else {
		
		for ( var i = 0; i < r.lstRisImageUploadDTONew.length; i++) {
			
			htmBody = htmBody + "<tr style='height:21px;'>"
			+ "<td class='col-md-1 center' >" + (i + 1)+ "</td>"
			+ "<td class='col-md-3 center' >" + r.lstRisImageUploadDTONew[i].documentName + "</td>" 
			+ "<td class='col-md-3 center' >" + r.lstRisImageUploadDTONew[i].comment + "</td>"
			+ "<td class='col-md-1 center' ><button class='btn btn-xs btn-warning' onclick=viewRisUpDocument('"+encodeURI(r.lstRisImageUploadDTONew[i].risFile)+"','"+r.lstRisImageUploadDTONew[i].idRadiologyTestReport+"')><i class='fa fa-eye'></i></button></td>"
			+ "<td class='col-md-1 center' >" + r.lstRisImageUploadDTONew[i].createdByUser + "</td>" 
			+ "<td class='col-md-1 center' >" + r.lstRisImageUploadDTONew[i].stringDate + "</td>"
			+ "<td class='col-md-1 center' ><button class='btn btn-xs btn-danger' onclick=deleteRisUpDocument('"+r.lstRisImageUploadDTONew[i].idRadiologyTestReport+"')> <i class='fa fa-times' aria-hidden='true'></i></button></td>"
			+'</tr>';
		}
	}
	$("#listImg").html(htmBody);
	
}

function viewRisUpDocument(imageName, idRadiologyTestReport){
	
	// alert("imageName :  " + imageName + ", idRadiologyTestReport : " + idRadiologyTestReport);
	
	$('#ViewDocumemnt123').attr("src","ehat/ris/viewRISDocuments?idRadiologyTestReport="+idRadiologyTestReport+"&fileName="+imageName);
	$('#viewDocModal123').modal('show');
	$('#documentComment').html(imageName);
}


function deleteRisUpDocument(idRadiologyTestReport){
	
	var r = confirm("Delete This Document ?");
	if (r == true) {
	
		jQuery.ajax({
			async 	: false,
			type 	: "POST",
			data 	: {
						"idRadiologyTestReport" : idRadiologyTestReport,
	 			},
	 			url : "ehat/ris/deleteRisDocuments",
			timeout : 1000 * 60 * 5,
			cache 	: false,
			error 	: function() {
				alert('error');
			},
			success : function(r) {
			if(r == 1){
				alert("Document Deleted !");
				location.reload();
			}else
				alert("There is some problem deleting record !");
				location.reload();
			}
		});
	}
}


function fetchRisTemplateType(){
	
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ris/fetchRisTemplateTypeList",
		 timeout : 1000 * 60 * 5, 
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setRISTemplateTypeList(r);
		},
	});
}

function setRISTemplateTypeList(r){
	
	var list = "";  
	list = list + "<option value='0'> - Select Template Type - </option>";
	
    for ( var i = 0; i < r.testList.length; i++) {  

        list = list + "<option value='"+r.testList[i].test_ID+"' class='un'>" + (r.testList[i].tName) + "</option>";    
    }  
    $("#selRisTempType").html(list);
}