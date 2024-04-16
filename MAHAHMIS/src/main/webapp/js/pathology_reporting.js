function getTatReport(){
	var collectionFromDate=$("#collectionFromDate").val();
	var collectionToDate=$("#collectionToDate").val();

	var inputs = [];
 	inputs.push("collectionFromDate=" + collectionFromDate);
 	inputs.push("collectionToDate=" + collectionToDate);
 	var str = inputs.join('&');
 	jQuery.ajax({
 		async	: false,
 		type	: "GET",
 		data	: str + "&reqType=AJAX",
 		url		: "ehat/analytics/getTatReport",
 		error	: function() {
 			alertify.error("Network Issue");
 		},
 		success : function(r) {
 			if(r.tatReportList.length > 0){
 				setTatReportTemp(r); 							 				 				 
 			}else{
 				$("#patientTatReportBody").html('');
 			}
 			$("#fromDate").val(collectionFromDate);
 			$("#toDate").val(collectionToDate);
 		}
 	});
}

function setTatReportTemp(r){	
	var htm = "";
	var index = 0;
	var isNew = true;
	for(var i = 0; i < r.tatReportList.length; i = i + 4) {
		index++;
		isNew = true;
	
		htm = htm
			+'<tr>'
			+'	<td rowspan="4" style="vertical-align : middle;text-align:center;">'+index+'</td>'
			+'	<td rowspan="4" style="vertical-align : middle;text-align:center;">'+r.tatReportList[i].collectionDate+'</td>';
		for(var j = i; j < i + 4; j++){
			if(isNew){
				htm = htm
				+'	<td>'+r.tatReportList[j].collectionAt+'</td>'
				+'	<td style="text-align: right;">'+r.tatReportList[j].totalPatients+'</td>'
				+'	<td style="text-align: right;">'+r.tatReportList[j].totalSamples+'</td>'
				+'	<td style="text-align: right;">'+r.tatReportList[j].tatPass+'</td>'
				+'	<td style="text-align: right;">'+r.tatReportList[j].tatFail+'</td>';
				isNew = false;
			}else{
				htm = htm
				+'<tr>'
				+'	<td>'+r.tatReportList[j].collectionAt+'</td>'
				+'	<td style="text-align: right;">'+r.tatReportList[j].totalPatients+'</td>'
				+'	<td style="text-align: right;">'+r.tatReportList[j].totalSamples+'</td>'
				+'	<td style="text-align: right;">'+r.tatReportList[j].tatPass+'</td>'
				+'	<td style="text-align: right;">'+r.tatReportList[j].tatFail+'</td>';
				+'<tr>';
			}
		}
		htm = htm
			+'</tr>';
	}
	$("#patientTatReportBody").html(htm);
}

function exportToExcel(){
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	
	$("#patientTatReport").table2excel({
		filename: "TatReport("+fromDate+" To "+toDate+").xls" 
	});
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 18_02_2021
 * @Code This function is use to get Test name.
 ******************************************************************************/
function getTestname() {
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		url		: "ehat/analytics/getTestName",
		success : function(r) {
			setTestname(r);
		}
	});
}
/*********************************************************
 * @author Ajay khandare
 * @date 18_02_2021
 * @Code This function is use to  set Test  name.
 *********************************************************/
function setTestname(r){	
	var list="<option value='0'>-select-</option>";	
	for ( var i = 0; i < r.dtoList.length; i++) {
		list=list+'<option value="'+(r.dtoList[i].testId)+'">'+(r.dtoList[i].testName)+'</option>';		
	}	
	$("#testId").html(list);	
	$("#testId").select2();	
}
/**********************************************************
 * @author Ajay khandare
 * @date 18_02_2021
 * @Code This function is use to get Test name.
 **********************************************************/
function getTestCountSummaryReport(){
	
	var collectionFromDate=$("#collectionFromDate").val();
	var collectionToDate=$("#collectionToDate").val();
	var testId=$("#testId").val();
	
    var inputs = [];
 	inputs.push("collectionFromDate=" + collectionFromDate);
 	inputs.push("collectionToDate=" + collectionToDate);
 	inputs.push("testId=" + testId);
 	var str = inputs.join('&');
 	jQuery.ajax({
 		async	: false,
 		type	: "POST",
 		data	: str + "&reqType=AJAX",
 		url		: "ehat/analytics/getTestCountSummaryReport",
 		error	: function() {
 			alertify.error("Network Issue");
 		},
 		success : function(r) {
			
 		
				var divContent = "";
				if (r.dtoList.length == 0 || r.dtoList.length == null) {
					// no records.
					divContent = divContent
							+ "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>Record Not Found...!!!</th></tr>";
				} else {
				for(var i = 0; i < r.dtoList.length; i++) {
					divContent = divContent+ '<tr style="height:2px;">'	
					   + "<td class='col-md-1 center'>"+(i+1) +"</td>"
						+ "<td class='col-md-1 center'>"+r.dtoList[i].centerName +"</td>"
						+ "<td class='col-md-1 center'>"+r.dtoList[i].collectionDate +"</td>"	
						+ "<td class='col-md-1 center'>"+r.dtoList[i].collectionAt +"</td>"			
						+ "<td class='col-md-1 center'>"+r.dtoList[i].testName+"</td>"
						+ "<td class='col-md-1 center'>"+r.dtoList[i].totaTests+"</td>"
						+ "<td class='col-md-1 center'>"+r.dtoList[i].totalPositive_Detected +"</td>"
						+ "<td class='col-md-1 center'>"+r.dtoList[i].total_Negative_Non_Detected +"</td>"
						+ "<td class='col-md-1 center'>"+r.dtoList[i].totalRejected+"</td>"
						+ "<td class='col-md-1 center'>"+r.dtoList[i].totalAuthenticatedtests+"</td>" 
						+ "<td class='col-md-1 center'></td></tr>";						
					
				}
				}
				 $("#patientsummaryReportBody").html(divContent);
					
		}
 	});	
}
function exportToExceltestCountSummaryReport(){
	var fromDate = $("#collectionFromDate").val();
	var toDate = $("#collectionToDate").val();
	
	$("#patientsummaryReportExport").table2excel({
		filename: "TestCountSummaryReport("+fromDate+" To "+toDate+").xls" 
	});
}

function exportToExceltestPatientTestDetails(){
	var fromDate = $("#collectionFromDate").val();
	var toDate = $("#collectionToDate").val();
	
	$("#patientTestDetailsReportExport").table2excel({
		filename: "Patient_Test_details_report("+fromDate+" To "+toDate+").xls" 
	});
}



/**********************************************************
 * @author Kishor Lokhande
 * @date 23_02_2021
 * @Code This function is use to fetch Patient Test details report's data.
 **********************************************************/

function patientTestDetailsReportData(){
	var collectionFromDate=$("#collectionFromDate").val();
	var collectionToDate=$("#collectionToDate").val();

	var inputs = [];
 	inputs.push("collectionFromDate=" + collectionFromDate);
 	inputs.push("collectionToDate=" + collectionToDate);
 	var str = inputs.join('&');
 	jQuery.ajax({
 		async	: false,
 		type	: "GET",
 		data	: str + "&reqType=AJAX",
 		url		: "ehat/analytics/patientTestDetailsReportData",
 		beforeSend : function() {
			$('#ajaxloaderimg').show();
			$('#patientTestDetailsReportUI').hide();			
		},
		complete : function() {
			$('#ajaxloaderimg').hide();
			$('#patientTestDetailsReportUI').show();
		},
 		error	: function() {
 			alertify.error("Network Issue");
 		},
 		success : function(r) {
 			//alert(r.patientTestDetailsReportList.length);
 			if(r.patientTestDetailsReportList.length > 0){
 				setPatientTestDetailsReportDataTemp(r); 							 				 				 
 			}else{
 				$("#patientTestDetailsReportBody").empty();
 				alert("Record Not Found.");
 			}
 			$("#fromDate").val(collectionFromDate);
 			$("#toDate").val(collectionToDate);
 		}
 	});
	
}

function setPatientTestDetailsReportDataTemp(r){	
	var htm = "";
	var htmUi = "";
	for(var i = 0; i < r.patientTestDetailsReportList.length; i++) {
		
		var registrationDateTime= new Date(r.patientTestDetailsReportList[i].registrationDateTime).toLocaleString('en-GB', { hour24: true });
		var authenticationDateTime= new Date(r.patientTestDetailsReportList[i].authenticationDateTime).toLocaleString('en-GB', { hour24: true });
		var postDateTime= new Date(r.patientTestDetailsReportList[i].postDateTime).toLocaleString('en-GB', { hour24: true });
		var paymentDateTime= new Date(r.patientTestDetailsReportList[i].paymentDateTime).toLocaleString('en-GB', { hour24: true });
		var mailSentDateTime= new Date(r.patientTestDetailsReportList[i].mailSentDateTime).toLocaleString('en-GB', { hour24: true });
		
		if(registrationDateTime =="Invalid Date"){
			registrationDateTime=",";
		}if(authenticationDateTime =="Invalid Date"){
			authenticationDateTime=",";
		}if(postDateTime =="Invalid Date"){
			postDateTime=",";
		}if(paymentDateTime =="Invalid Date"){
			paymentDateTime=",";
		}if(mailSentDateTime =="Invalid Date"){
			mailSentDateTime=",";
		}
		//alert(paymentDateTime);
		var regDateTime = registrationDateTime.split(',');
		var authDateTime = authenticationDateTime.split(',');
		var repoDateTime = postDateTime.split(',');
		var payDateTime = paymentDateTime.split(',');
		var mailDateTime = mailSentDateTime.split(',');
		
		var reportPrinted ="N"; 
		var isMailSend ="N"; 

		if (r.patientTestDetailsReportList[i].testStatusId == 6) {
			reportPrinted = "Y";
		} else {
			reportPrinted = "N";
		}
		var iDTypeName ="";

		if(r.patientTestDetailsReportList[i].iDTypeId == 1){
			iDTypeName="Aadhar card";
		}else if(r.patientTestDetailsReportList[i].iDTypeId == 2){
			iDTypeName="Pan card";
		}else if(r.patientTestDetailsReportList[i].iDTypeId == 3){
			iDTypeName="Passport";
		}else if(r.patientTestDetailsReportList[i].iDTypeId == 4){
			iDTypeName="Driving License";
		}else if(r.patientTestDetailsReportList[i].iDTypeId == 5){
			iDTypeName="Other";
		}
		
		 var tResulst = r.patientTestDetailsReportList[i].testResult.split(',');
		 var ctVal = r.patientTestDetailsReportList[i].ctValue.split(',');
		 var ctValue = "";
		 if(ctVal[1]=="undefined" || ctVal[1]==undefined){
			 ctValue =ctVal[0];
		 }else{
			 ctValue =ctVal[1];
		 }
		 var barcode="";
		 var paymentStatus="";
		 if (r.patientTestDetailsReportList[i].barcode == null || r.patientTestDetailsReportList[i].barcode == "null") {
			barcode = "";
		} else {
			barcode = r.patientTestDetailsReportList[i].barcode;
		}
		if (r.patientTestDetailsReportList[i].paymentStatus == null
				|| r.patientTestDetailsReportList[i].paymentStatus == "null") {
			paymentStatus = "";
		} else {
			if (r.patientTestDetailsReportList[i].paymentStatus == "Y") {
				paymentStatus = "Paid";
			} else {
				paymentStatus = "UnPaid";
			}

		}
	var statusDescription =""; 
	if(r.patientTestDetailsReportList[i].testStatusId ==1){
		statusDescription="Collection Pending";
	} if(r.patientTestDetailsReportList[i].testStatusId==2){
		statusDescription="Accessing Pending";
	} if(r.patientTestDetailsReportList[i].testStatusId==3){
		statusDescription="Accepted Done";
	} if(r.patientTestDetailsReportList[i].testStatusId==4){
		statusDescription="Sample Rejected";
	}if(r.patientTestDetailsReportList[i].testStatusId==5){
		statusDescription="Sample In Authorization";
	}if(r.patientTestDetailsReportList[i].testStatusId==6){
		statusDescription="Sample Reported";
	}
		var mailAck="";
		if (r.patientTestDetailsReportList[i].mailAck == null || r.patientTestDetailsReportList[i].mailAck == "null" || r.patientTestDetailsReportList[i].mailAck == "N" || r.patientTestDetailsReportList[i].mailAck == "") {
			mailAck="Mail Not Send Yet.";
			isMailSend = "N";
		} else {
			isMailSend = "Y";
			mailAck = r.patientTestDetailsReportList[i].mailAck;
		}
		//Set data for UI Tepmlate
		htmUi = htmUi		
		+'<tr>'
		+'<td style="text-align: right;">'+(i+1)+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].collectedAt+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].centerName+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].testName+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].collectionDate+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].collectionTime+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].patientName+'</td>'
		+'<td style="text-align: right;">'+r.patientTestDetailsReportList[i].patientAge+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].gender+'</td>'
		+'<td style="text-align: right;">'+r.patientTestDetailsReportList[i].mobile+'</td>'	
		+'<td>'+r.patientTestDetailsReportList[i].patientEmail+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].address+'</td>'
		+'<td>'+tResulst[0]+'</td>'																
		+'</tr>';
		 
		//Set data for Export to ecxel
		htm = htm
		+'<tr>'
		+'<td style="text-align: right;">'+(i+1)+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].collectedAt+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].centerName+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].testName+'</td>'		
		+'<td>'+r.patientTestDetailsReportList[i].collectionDate+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].collectionTime+'</td>'
		+'<td>'+regDateTime[0]+'</td>'
		+'<td>'+regDateTime[1]+'</td>'
		+'<td>'+authDateTime[0]+'</td>'	
		+'<td>'+authDateTime[1]+'</td>'	
		+'<td>'+repoDateTime[0]+'</td>'	
		+'<td>'+repoDateTime[1]+'</td>'	
		+'<td>'+barcode+'</td>'	
		+'<td>'+r.patientTestDetailsReportList[i].patientId+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].patientName+'</td>'
		+'<td style="text-align: right;">'+r.patientTestDetailsReportList[i].patientAge+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].gender+'</td>'
		+'<td style="text-align: right;">'+r.patientTestDetailsReportList[i].mobile+'</td>'	
		+'<td>'+r.patientTestDetailsReportList[i].patientEmail+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].address+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].districtName+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].stateName+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].pincode+'</td>'
		+'<td>'+tResulst[0]+'</td>'	
		+'<td>'+ctValue+'</td>'			
		+'<td>'+r.patientTestDetailsReportList[i].flightNo+'</td>'	
		+'<td>'+statusDescription+'</td>'	
		+'<td>'+reportPrinted+'</td>'	
		+'<td>'+iDTypeName+'</td>'	
		+'<td>"'+(r.patientTestDetailsReportList[i].iDNumber)+'"</td>'	
		+'<td>'+r.patientTestDetailsReportList[i].patientDOB+'</td>'		
		+'<td>'+r.patientTestDetailsReportList[i].doctorName+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].nationality+'</td>'
		+'<td>'+paymentStatus+'</td>'
		+'<td style="text-align: right;">'+r.patientTestDetailsReportList[i].amount+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].paymentType+'</td>'
		+'<td>'+payDateTime[0]+'</td>'
		+'<td>'+payDateTime[1]+'</td>'
		+'<td>'+isMailSend+'</td>'
		+'<td>'+mailDateTime[0]+'</td>'
		+'<td>'+mailDateTime[1]+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].sampleType+'</td>'
		+'<td>'+mailAck+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].arrivalCity+'</td>'
		+'<td>'+r.patientTestDetailsReportList[i].destinationCity+'</td>'																																	
		+'</tr>';
	}
	$("#patientTestDetailsReportBodyUi").html(htmUi);
	$("#patientTestDetailsReportBody").html(htm);
}