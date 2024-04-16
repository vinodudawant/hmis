function dataOnCoversheet(refferedTo,treatId){
var patientId=parseInt($('#patientId').html());
$('#pIdd').val(patientId);
$('#tIdd').val(treatId);

$('#pIddI').val(patientId);
$('#tIddI').val(treatId);

	
	if (refferedTo == "OPD") {

		
		showSummaryPostPopupNew();
		
		fetchCKEditorDocterDesk1ForPrintNew(treatId);
		fetchAllergyAlertsForPrintNew(patientId);
		showAssessmentForPrintNew(treatId);
		fetchPrescriptionForPrintNew(treatId);
		fetchTestForPrintNew(treatId);
		fetchPCTreatmentInstructionForPrintNew(treatId);
		fetchIndividualTreatmentInstructionForPrintNew(treatId);
		fetchAdviceForPrintNew(treatId);
		fectchAllRadiotherapyForPrintNew(treatId, patientId);
		setPatientsDetails();//set patient details Opd

	} else if (refferedTo === "IPD") {

		// setTempForpopup();
		// showSummaryPostPopupIPD();
		showSummaryPostPopupIPDNew();

		fetchCKEditorDocterDesk1ForPrintIPDNew(treatId);
		setDoctorPreRoundforPrintIPDNew(treatId);
		fetchAllergyAlertsForPrintIPDNew(patientId);
		showAssessmentForPrintIPDNew(treatId);
		// fetchPrescriptionForPrintIPDNew(treatId);
		featchOrderFormByDateNew(treatId, 'previous');// Order Form

		fetchTestForPrintIPDNew(treatId);

		fetchPCTreatmentInstructionForPrintIPDNew(treatId);
		fetchIndividualTreatmentInstructionForPrintIPDNew(treatId);
		fetchIpdServicesIPDNew(treatId);
		showPatientAdmissionNoteIPDNew(treatId, patientId);
		//setPatientsDetailsIpd();//set patient details Ipd

	} else if (refferedTo === "DIAGNO") {

					setTimeout(
							function() {

								window
										.open(
												("diagnosticPatientTestAssign.jsp?myObj="
														+ encodeURIComponent(patientBean) + "&pageType=diagnosis&callFor=previousTreatmentDiagnosis"),
												'_blank');

								

							}, 300);

				}

}


function fetchCKEditorDocterDesk1ForPrintNew(treatId) {
	var inputs = [];
	inputs.push('action=fetchCKEditorDocterDesk1');
	inputs.push('treatmentId=' + treatId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					
				},
				success : function(r) {
					ajaxResponse = r;
					var testObj = eval('(' + ajaxResponse + ')');
					
						var divContent="";
						if ((testObj.pattemplist.length) > 0) {
					
							for ( var int = 0; int < testObj.pattemplist.length; int++) {
								divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>" + testObj.pattemplist[int].tempdata + "</td></tr>";
							}
						}
						else
						{
							divContent=divContent+"<tr><td colspan = 4>No Record Found</td></tr>";
						}
						$("#SubObj").html(divContent);
				}
			});
}




//Tushar Changes for= Popup patient previous treatment @10 Oct 2016
function fetchAllergyAlertsForPrintNew(patientId) {
	
	var pid = $('#pid').html();
		
	if (pid == "" || undefined == pid) {
		pid = $("#pid").val();
	}
	
	if (pid == "" || undefined == pid) {
		alert("Patient ID not fetched properly Allergy alerts...");
		return;
	}
	var inputs = [];
	inputs.push('action=fetchAllergyAlerts');
	inputs.push('pid=' + pid);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					
				},
				success : function(res) {
				var ajaxResponse = res;
					$("#allergyAlertsDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');
					var divContent="";
					if (testObj.allergyAlertsDTOList.length > 0) {
							
						for ( var int = 0; int < testObj.allergyAlertsDTOList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>"+ testObj.allergyAlertsDTOList[int].allergyName+
							" --- "+testObj.allergyAlertsDTOList[int].allergyDate+"\n"+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
					}
					$("#alertAllergy").html(divContent);
				}	
			});
}	
function showAssessmentForPrintNew(treatId) {

	count = 1;
	flag_count = 1;
	assesTmpConfmedPrescriptionCount = 1;
	var inputs = [];
	inputs.push('action=fetchAssessment');
	inputs.push('treatmentId=' + treatId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					
				},
				success : function(res) {
					var ajaxResponse = res;
					$("#assesmentDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');
					
					var divContent="";
					if (testObj.assessmentList.length > 0) {
							
						for ( var int = 0; int < testObj.assessmentList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>"+ testObj.assessmentList[int].diagnosis+"\n"+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
					}
					$("#conirmDiagno").html(divContent);
				}
			});
}
function fetchPrescriptionForPrintNew(treatId) {
	prepCount = 0;
	//var treatmentId = $('#tid1').html();
	//var treatmentId = 239;
	var inputs = [];
	inputs.push('action=fetchPrescription');
	inputs.push('treatmentId=' + treatId);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					
				},
				success : function(res) {
					var ajaxResponse = res;
					$("#prescriptionDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');
					
					var divContent="";
					if (testObj.prescriptionList.length > 0) {
							
						for ( var int = 0; int < testObj.prescriptionList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1'><td class='form-group col-md-3-1 '>" + testObj.prescriptionList[int].prepName +"." + testObj.prescriptionList[int].name+"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.prescriptionList[int].dose + " " +testObj.prescriptionList[int].instructionName +"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.prescriptionList[int].frequency+" Times a Day"+"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.prescriptionList[int].days+" Days"+"</td>" 
							+ "<td class='form-group col-md-1-1 '>" + testObj.prescriptionList[int].qty+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
					}
					$("#prescriptionNew").html(divContent);
					$("#OrderForm").html(divContent);
				}
			});
}
function fetchTestForPrintNew(treatId) {/*

	var inputs = [];
	inputs.push('action=fetchTestForDashboard');
	inputs.push('treatmentId=' + treatId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PathologyServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// 
				},
				success : function(r) {
					ajaxResponse = r;
					// alert(r);
					$("#CPOE_TestDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');		
					
					var divContent="";
					if (testObj.testDashboard.length > 0) {
							
						for ( var int = 0; int < testObj.testDashboard.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1'><td class='form-group col-md-3-1 '>" + testObj.testDashboard[int].perticuler +"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.testDashboard[int].consultant +"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.testDashboard[int].date+"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.testDashboard[int].desciption+"</td>" 
							+ "<td class='form-group col-md-2-1 '>" + testObj.testDashboard[int].testType+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
					}
					$("#cpoeTestNew").html(divContent);
					
				}
			});
*/
	
var tID  = treatId; 
	
	var depid= $("#depdocdeskid").val(); 
    var servid=0;
	if(treatId==0){
		
	//	return false;
		
	}
	
	
    var callform="default";
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/fetchbilldetails",
		data	: {
			"tID"        : tID,
			"callform"   :callform,
			"servid"      :servid
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(r) {
			var divContent="";
			if (r.cpoeServdetails.length > 0) {
					
				for ( var int = 0; int < r.cpoeServdetails.length; int++) {
					//alert(r.cpoeServdetails[int].categoryName);
					
					divContent=divContent
					+"<tr class='col-md-12-1'><td class='form-group col-md-3-1 '>" + r.cpoeServdetails[int].categoryName +"</td>" 
					+ "<td class='form-group col-md-3-1 '>" + r.cpoeServdetails[int].docName +"</td>" 
					+ "<td class='form-group col-md-3-1 '>" + r.cpoeServdetails[int].created_date_time+"</td>" 
					+ "<td class='form-group col-md-3-1 '>-</td>" 
					+ "<td class='form-group col-md-2-1 '>" + r.cpoeServdetails[int].servicename+"</td></tr>";
				}
			}
			else
			{
				divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
			}
			//alert(divContent);
			$("#cpoeTest").html(divContent);
			
		}
	});
}


function fetchPCTreatmentInstructionForPrintNew(TreatId) {
	//var treatmentId = $('#tid1').html();
	var inputs = [];
	inputs.push('action=fetchPCTreatmentInstruction');
	inputs.push('treatmentId=' + TreatId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					
				},
				success : function(r) {
					ajaxResponse = r;
					var testObj = eval('(' + ajaxResponse + ')');
					
					var divContent="";
					if (testObj.treatmentInstructionDTOList.length > 0) {
							
						for ( var int = 0; int < testObj.treatmentInstructionDTOList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>"+testObj.treatmentInstructionDTOList[int].treatmentChildInstructionName+"\n"+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
					}
					$("#genInst").html(divContent);
					
				}
			});
}

function fetchIndividualTreatmentInstructionForPrintNew(tratId) {
	var inputs = [];
	inputs.push('action=fetchIndividualTreatmentInstruction');
	inputs.push('treatmentId=' + tratId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					
				},
				success : function(r) {
					ajaxResponse = r;
					$("#TreatmentInstructionDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');

					var divContent="";
					if (testObj.reportInstructionDTOList.length > 0) {
							
						for ( var int = 0; int < testObj.reportInstructionDTOList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>"+testObj.reportInstructionDTOList[int].reportInstruction+"\n"+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
					}
					$("#primInst").html(divContent);
					
				}
			});
}


function fetchAdviceForPrintNew(treatId) {
	var inputs = [];
	inputs.push('action=fetchAdvice');
	inputs.push('treatmentId=' + treatId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			// alert(r);
			ajaxResponse = r;
			$("#adviceDetails").html(ajaxResponse);
			var testObj = eval('(' + ajaxResponse + ')');
			
			var divContent="";
			if (testObj.adviceDTOList.length > 0) {
					
				for ( var int = 0; int < testObj.adviceDTOList.length; int++) {
					divContent=divContent + "<tr class='col-md-12-1' style='margin-top: 6px;'><td class='form-group col-md-6-1 '>"+testObj.adviceDTOList[int].operationName+"</td>"+"<td class='form-group col-md-6-1 '>"+testObj.adviceDTOList[int].adviceDate+"</td></tr>";
				}
			}
			else
			{
				divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
			}
			$("#surgeryAdvice").html(divContent);
		}
	});
}
function fectchAllRadiotherapyForPrintNew(treatId,pId) {
	var pagetype = "OPDDoctorDesk2";
	var treatmentId = treatId;
	var patientId = pId;
	
	if(treatmentId == undefined && patientId == undefined ){
		treatmentId = ($("#treatmentId").html());
		patientId = $("#pid").html();
	}
	
	var inputs = [];
	inputs.push('action=fectchAllRadiotherapy');
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('patientId=' + patientId);
	inputs.push('pagetype=' + pagetype);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		// timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(res) {
		
			countRadiotherapy = 1;
			testObj = eval('(' + res + ')');	
			
			var divContent="";
			if (testObj.radioList.length > 0) {
					
				for ( var int = 0; int < testObj.radioList.length; int++) {
					divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-4-1 '>" + testObj.radioList[int].serum_creatine + "</td>"
					+ "<td class='form-group col-md-4-1 '>"+testObj.radioList[int].radiationName + "</td>"
					+ "<td class='form-group col-md-2-1 '>"+testObj.radioList[int].adviceDate2+ "-" +testObj.radioList[int].advSimTime + "</td>" 
					+ "<td class='form-group col-md-2-1 '>"+testObj.radioList[int].adviceDateTreatment+ "-" +testObj.radioList[int].advTrtTime + "</td></tr>";
				}
			}
			else
			{
				divContent=divContent+"<tr><td colspan = 4>No Record Found</td></tr>";
			}
			$("#RedioAdvice").html(divContent);
			
			
		}
	});
}

function setPatientsDetails(){
	var pid1=$('#patientId').text();
	var pname=$('#patientName').text();
	var opdNo=$('#ipdNo').text();
	var regDate=$('#doa').text();
	//var refTo=$('#patientId').text();
	//var doc=$('#consultingDoctorr').text();
	
	$('#pid1').text(pid1);
	$('#pname1').text(pname);
	$('#opdNo').text(opdNo);
	$('#regDate').text(regDate);
	//$('#doc').text(doc);	
	
}
function setPatientsDetailsIpd(){
	var pid1=$('#patientId').text();
	var pname=$('#patientName').text();
	var opdNo=$('#ipdNo').text();
	var regDate=$('#doa').text();
	//var refTo=$('#patientId').text();
	//var doc=$('#consultingDoctorr').text();
	
	$('#pid2').text(pid1);
	$('#pname2').text(pname);
	$('#ipdNo2').text(opdNo);
	$('#regDate2').text(regDate);
	//$('#doc').text(doc);
	
	
}

 function showSummaryPostPopupIPDNew(value){
	var temp1="";
	temp1=+'<div class="form-group col-md-12-1" style="background-color: #e7e7e7; margin-bottom: 2px;">'
+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
+'<label> Patient ID:</label>'
+'</div>'
+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
+'<label id="pid2"> </label>'
+'</div>'
+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
+'	<label> Patient Name:</label>'
+'</div>'
+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
+'	<label id="pname2"> </label>'
+'</div>'
+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
+'	<label> IPD No:</label>'
+'</div>'
+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
+'	<label id="ipdNo2"> </label>'
+'</div>'
+'</div>'
+'<div class="form-group col-md-12-1">'
+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
+'	<label> Registered Date:</label>'
+'</div>'
+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
+'	<label id="regDate2"> </label>'
+'</div>'
+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
+'	<label> Ref To:</label>'
+'</div>'
+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
+'	<label id="refTo2"> </label>'
+'</div>'
+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
+'	<label> Doctor Name:</label>'
+'</div>	'
+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
+'	<label id="doc2"> </label>'
+'</div>'
+'</div>'

+'<div class="form-group col-md-12-1">	'
+'<div class="form-group col-md-3-1" style="margin-top: -20px;">'
+'	<label style="font-size: 14px;"> Previous Doctor Round Report:</label>'
+'</div>'
+'<div class="form-group col-md-12-1">'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> #.</label>'
+'</div>'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Time</label>'
+'</div>'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Clinical Notes</label>'
+'</div>'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Investigation Advice</label>'
+'</div>'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> RoundBy</label>'
+'</div>'
+'</div>	'
+'<div class="form-group col-md-12-1">'
+'<div class="form-group col-md-12-1 TextFont">'
+'	<label id="DocRound2" class="form-group col-md-12-1" style="margin-top: 12px; font-size: 9px;"> </label>'
+'</div>'
+'</div>'
+'<div class="form-group col-md-12-1">	'
+'<div class="form-group col-md-2-1" style="margin-top: -20px;">'
+'	<label style="font-size: 14px;"> Subjective & Objective:</label>'
+'</div>'
+'<div class="form-group col-md-2-1 TextFont">'
+'	<label id="SubObj2" style="font-size: 9px;"> </label>'
+'</div>'
+'</div>'
+'<div class="form-group col-md-12-1">	'
+'<div class="form-group col-md-2-1" style="margin-top: -20px;">'
+'	<label style="font-size: 14px;"> Alerts & Allergies:</label>'
+'</div>'
+'<div class="form-group col-md-2-1 TextFont">'
+'	<label id="alertAllergy2" style="font-size: 9px;"> </label>'
+'</div>'
+'</div>'
+'<div class="form-group col-md-12-1">'
+'<div class="form-group col-md-2-1" style="margin-top: -20px;">'
+'	<label style="font-size: 14px;"> Confirmed Diagnosis:</label>'
+'</div>	'
+'<div class="form-group col-md-10-1 TextFont">'
+'	<label id="conirmDiagno2" style="font-size: 9px;"> </label>'
+'</div>'
+'</div>'
+'<div class="form-group col-md-12-1" style="margin-top: -20px;">'
+'	<label style="font-size: 14px;"> CPOE:</label>'
+'</div>	'
+'<div class="form-group col-md-12-1">'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Particulars</label>'
+'</div>'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Consultant Name</label>'
+'</div>'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Date</label>'
+'</div>'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Type</label>'
+'</div>'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Test</label>'
+'</div>'
+'</div>'		
+'<div class="form-group col-md-12-1">'
+'<div class="form-group col-md-12-1 TextFont">'
+'	<label id="cpoeTest2" class="form-group col-md-12-1" style="margin-top: 12px; font-size: 9px;"> </label>'
+'</div>'
+'</div>'
+'<div class="form-group col-md-12-1" style="margin-top: -20px;">'
+'	<label style="font-size: 14px;"> IPD Services:</label>'
+'</div>	'
+'<div class="form-group col-md-12-1">'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Particulars/Details</label>'
+'</div>'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Service Type</label>'
+'</div>'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Quantity</label>'
+'</div>'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Assign By</label>'
+'</div>'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Assign Date & Time</label>'
+'</div>'
+'</div>		'
+'<div class="form-group col-md-12-1">'
+'<div class="form-group col-md-12-1 TextFont">'
+'	<label id="ipdServices2" class="form-group col-md-12-1" style="margin-top: 12px; font-size: 9px;"> </label>'
+'</div>'
+'</div>'
+'<div class="form-group col-md-12-1" style="margin-top: -20px;">'
+'	<label style="font-size: 14px;"> Order Form:</label>'
+'</div>	'
+'<div class="form-group col-md-12-1">'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> #.</label>'
+'</div>'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Prep</label>'
+'</div>'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Drug</label>'
+'</div>'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Advice</label>'
+'</div>'
+'<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Duration</label>'
+'</div>'
+'</div>		'
+'<div class="form-group col-md-12-1">'
+'<div class="form-group col-md-12-1 TextFont">'
+'	<label id="prescription2" class="form-group col-md-12-1" style="margin-top: 12px; font-size: 9px;"> </label>'
+'</div>'
+'</div>'

+'<div class="form-group col-md-12-1">'
+'<div class="form-group col-md-12-1" style="margin-top: -20px;">'
+'	<label style="font-size: 14px;"> General Instructions:</label>'
+'</div>'
+'<div class="form-group col-md-12-1 TextFont">'
+'	<label id="genInst2" class="form-group col-md-12-1" style="font-size: 9px;"> </label>'
+'</div>'
+'</div>'
+'<div class="form-group col-md-12-1">'
+'<div class="form-group col-md-12-1" style="margin-top: -20px;">'
+'	<label style="font-size: 14px;"> Primary Instructions:</label>'
+'</div>'
+'<div class="form-group col-md-12-1 TextFont">'
+'	<label id="primInst2" class="form-group col-md-12-1" style="font-size: 9px;"> </label>'
+'</div>'
+'</div>'
+'<div class="form-group col-md-12-1">'
+'<div class="form-group col-md-12-1" style="margin-top: -20px;">'
+'	<label style="font-size: 14px;"> Admission Note:</label>'
+'</div>'
+'<div class="form-group col-md-12-1 TextFont">'
+'	<label id="note2" class="form-group col-md-12-1" style="font-size: 9px;"> </label>'
+'</div>'
+'</div>'
+'<div class="form-group col-md-12-1" id="summaryData">'
+'</div>	'
+'</div>';
	

		$("#setTempIpnInOpd").html(temp1);

	// $("#IPDSummarypostPopup").show();
	$("#IPDSummarypostPopup").modal('show');
	
	
}

function showSummaryPostPopupNew(value){
//	$("#SummarypostPopup").show();

	
	var temp="";
	temp='<div class="form-group col-md-12-1" style="background-color: #e7e7e7; margin-bottom: 2px;">'
	+ '<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
	+	'<label> Patient ID:</label>'
	+'</div>'
	+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
	+'	<label id="pid1"> </label>'
	+'</div>'
	+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
	+'	<label> Patient Name:</label>'
	+'</div>'
	+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
	+'	<label id="pname1"> </label>'
	+'</div>'
	+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
	+'	<label> OPD No:</label>'
	+'</div>'
	+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
		+'<label id="opdNo"> </label>'
	+'</div>'
+'</div>'
+'<div class="form-group col-md-12-1">'
	+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
	+	'<label> Registered Date:</label>'
	+'</div>'
	+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
	+'	<label id="regDate"> </label>'
	+'</div>'
	+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
	+'	<label> Ref To:</label>'
	+'</div>'
	+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
	+	'<label id="refTo"> </label>'
	+'</div>'
	+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
	+'	<label> Doctor Name:</label>'
	+'</div>	'
	+'<div class="form-group col-md-2-1" style="background-color: #e7e7e7">'
	+	'<label id="doc"> </label>'
	+'</div>'
	+'</div>'

+'<div class="form-group col-md-12-1">	'
	+'<div class="form-group col-md-2-1" style="margin-top: -20px;">'
	+'	<label style="font-size: 14px;"> Subjective & Objective:</label>'
	+'</div>'
	+'<div class="form-group col-md-2-1 TextFont">'
		+'<label id="SubObj" style="font-size: 9px;"> </label>'
	+'</div>'
+'</div>'
+'<div class="form-group col-md-12-1">	'
	+'<div class="form-group col-md-2-1" style="margin-top: -20px;">'
		+'<label style="font-size: 14px;"> Alerts & Allergies:</label>'
	+'</div>'
	+'<div class="form-group col-md-2-1 TextFont">'
		+'<label id="alertAllergy" style="font-size: 9px;"> </label>'
	+'</div>'
+'</div>'
+'<div class="form-group col-md-12-1">'
+'	<div class="form-group col-md-2-1" style="margin-top: -20px;">'
+'		<label style="font-size: 14px;"> Confirmed Diagnosis:</label>'
+'	</div>	'
+'	<div class="form-group col-md-10-1 TextFont">'
+'		<label id="conirmDiagno" style="font-size: 9px;"> </label>'
+'	</div>'
+'</div>'
+'<div class="form-group col-md-12-1" style="margin-top: -20px;">'
+'		<label style="font-size: 14px;"> RX:</label>'
+'</div>	'
+'<div class="form-group col-md-12-1">'
+'	<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Prep. Drug</label>'
+'	</div>'
+'	<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Advice</label>'
+'	</div>'
+'	<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Frequency</label>'
+'	</div>'
+'	<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Duration</label>'
+'	</div>'
+'	<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Qty</label>'
+'	</div>'
+'</div>		'
+'<div class="form-group col-md-12-1">'
+'	<div class="form-group col-md-12-1 TextFont">'
+'		<label id="prescriptionNew" class="form-group col-md-12-1" style="margin-top: 12px; font-size: 9px;"> </label>'
+'	</div>'
+'</div>'
+'<div class="form-group col-md-12-1" style="margin-top: -20px;">'
+'		<label style="font-size: 14px;"> CPOE:</label>'
+'</div>	'
+'<div class="form-group col-md-12-1">'
+'	<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Particulars</label>'
+'	</div>'
+'	<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Consultant Name</label>'
+'	</div>'
+'	<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Date</label>'
+'	</div>'
+'	<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Type</label>'
+'	</div>'
+'	<div class="form-group col-md-3-1" style="background-color: #e7e7e7;"><label> Test</label>'
+'	</div>'
+'</div>		'
+'<div class="form-group col-md-12-1">'
+'	<div class="form-group col-md-12-1 TextFont">'
+'		<label id="cpoeTest" class="form-group col-md-12-1" style="margin-top: 12px; font-size: 9px;"> </label>'
+'	</div>'
+'</div>'
+'<div class="form-group col-md-12-1">'
+'	<div class="form-group col-md-12-1" style="margin-top: -20px;">'
+'		<label style="font-size: 14px;"> General Instructions:</label>'
+'	</div>'
+'	<div class="form-group col-md-12-1 TextFont">'
+'		<label id="genInst" class="form-group col-md-12-1" style="font-size: 9px;"> </label>'
+'	</div>'
+'</div>'
+'<div class="form-group col-md-12-1">'
+'	<div class="form-group col-md-12-1 TextFont" style="margin-top: -20px;">'
+'		<label style="font-size: 14px;"> Primary Instructions:</label>'
+'	</div>'
+'	<div class="form-group col-md-12-1">'
+'		<label id="primInst" class="form-group col-md-12-1" style="font-size: 9px;"> </label>'
+'	</div>'
+'</div>'
+'<div class="form-group col-md-12-1">'
+'	<div class="form-group col-md-12-1" style="margin-top: -20px;">'
+'		<label style="font-size: 14px; "> Surgery Advice:</label>'
+'	</div>'
+'	<div class="form-group col-md-6-1" style="background-color: #e7e7e7;"><label> Operation Name</label>'
+'	</div>'
+'	<div class="form-group col-md-6-1" style="background-color: #e7e7e7;"><label> Advice Date</label>'
+'	</div>'
+'	<div class="form-group col-md-12-1 TextFont">'
+'		<label id="surgeryAdvice" class="form-group col-md-12-1" style="margin-top: 4PX; font-size: 9px;"> </label>'
+'	</div>'
+'</div>'
+'<div class="form-group col-md-12-1" style="margin-top: -20px;">'
+'	<label style="font-size: 14px;">Rediotherapy Advice:</label> '
+'</div>'
+'<div class="form-group col-md-12-1">'
+'	<div class="form-group col-md-4-1" style="background-color: #e7e7e7;"><label> Serum Creatine</label>'
+'	</div>'
+'	<div class="form-group col-md-4-1" style="background-color: #e7e7e7;"><label> Radiation Technique</label>'
+'	</div>'
+'	<div class="form-group col-md-2-1" style="background-color: #e7e7e7;"><label> Simulation Date & Time</label>'
+'	</div>'
+'	<div class="form-group col-md-2-1" style="background-color: #e7e7e7;"><label> Treatment Date & Time</label>'
+'	</div>'
+'</div>		'
+'<div class="form-group col-md-12-1">'
+'	<div class="form-group col-md-12-1">'
+'		<label id="RedioAdvice" class="form-group col-md-12-1" style="margin-top: 4px; font-size: 9px;"> </label>'
+'	</div>'
+'</div>'
+'<div class="form-group col-md-12-1" id="summaryData">'
+'</div>';
	
	$("#setBodyOpdCoverSheet").html(temp);
	$("#SummarypostPopup123").modal('show');
	$("#SummarypostPopup").modal('show');
}


function hideSummaryPostPopupNew(value) {
	$("#SummarypostPopup123").modal('hide');
	$("#SummarypostPopup").modal('hide');
}



function printPrescriptionNew(paramPopupOrPrint,callFrom) {
	
	callFrom = $("#pageType").val();
	callFrom1 = $("#callFrom").val();
	hideSummaryPostPopupNew();
	/*if (paramPopupOrPrint == "SHOW_POPUP_PRINT") {
		$("#iPrintBillNew").show();
	} else*/ if (paramPopupOrPrint == "PRINT") {
		var editorContent="null";
			/*if(callFrom1=="null"){
		 //editorContent = CKEDITOR.instances['editorSubObjTreatment'].getData();
		 editorContent="";
		}
		else{
			editorContent = "null";
		}*/
			//alert("hii"+editorContent);
		/*$('#ckEditorData').html(editorContent);
		var ckEditorText = $('#ckEditorData p').text();*/

		//$('#pIdd').val(patientId);
		//$('#tIdd').val(treatId);
		
		/*var pid = $.trim($("#patId").html());
		var tid = $.trim($('#treatmentId').val());*/
		
		var pid = $('#pIdd').val();
		var tid = $('#tIdd').val();
		
		var pid1 = $.trim($("#pid1").html());
		var tid1 = $.trim($("#tid1").html());
		
		//alert(pid);
		//alert(tid);
		//alert(callFrom);
		//alert(callFrom1);
		if(pid1 != "" || tid1 != ""){
			callFrom = "previousTreatmentOPDER";
		}
		
		var instructionLanguage = $(
				"input[name='prepInstructionPopup']:checked").val();
		var pageSize = $(
		"input[name='prepInstructionPaperSizePopup']:checked").val();
		var vaccinationFlagCheckboxPrint = $(
				"input[name='vaccinationFlagCheckboxPrint']:checked").val();

		
		setTimeout(
				function() {

					$("#iPrintBill").hide();
					
					/*if(pid1 == "" && tid1 == ""){*/
						/*window
							.open(("OPDPrescriptionPrintNew.jsp?patId=" + pid + "&callFrom=" + callFrom
									+ "&treatID=" + tid + "&instructionLanguage="
									+ instructionLanguage
									+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&pageSize="+pageSize+ "&editorContent=" +encodeURIComponent(editorContent)));*/
						
						window.open("OPDPrescriptionPrintNew.jsp?"+"patID=" +
								encodeURIComponent(pid) + "&treatID=" + encodeURIComponent(tid)+"&editorContent="+encodeURIComponent(editorContent));
						/*}
					else{
						window
							.open(("OPDPrescriptionPrint.jsp?pid=" + 211 + "&callFrom=" + callFrom
								+ "&tid=" + 242 + "&instructionLanguage="
								+ instructionLanguage
								+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&pageSize="+pageSize+ "&editorContent=" +encodeURIComponent(editorContent)));
						
					}*/
				location.reload();
					}, 300);
		
	} else if (paramPopupOrPrint == "HIDE_POPUP_PRINT") {
		$("#iPrintBill").hide();
	}
	
}


function printCurrentPrescriptionNewOpd(paramPopupOrPrint,callFrom) {
callFrom = $("#pageType").val();
callFrom1 = $("#callFrom").val();
hideSummaryPostPopupNew();
 if (paramPopupOrPrint == "PRINT") {
	var editorContent="null";
		
	
	var pid = parseInt($('#patientId').html());
	var tid = parseInt($('#treatmentId').html());
	
	var pid1 = $.trim($("#pid1").html());
	var tid1 = $.trim($("#tid1").html());
	
	
	if(pid1 != "" || tid1 != ""){
		callFrom = "previousTreatmentOPDER";
	}
	
	var instructionLanguage = $(
			"input[name='prepInstructionPopup']:checked").val();
	var pageSize = $(
	"input[name='prepInstructionPaperSizePopup']:checked").val();
	var vaccinationFlagCheckboxPrint = $(
			"input[name='vaccinationFlagCheckboxPrint']:checked").val();

	
	setTimeout(
			function() {

				$("#iPrintBill").hide();
				
				
					window.open("OPDPrescriptionPrintNew.jsp?"+"patID=" +
							encodeURIComponent(pid) + "&treatID=" + encodeURIComponent(tid)+"&editorContent="+encodeURIComponent(editorContent));
					
			//location.reload();
				}, 300);
	
} else if (paramPopupOrPrint == "HIDE_POPUP_PRINT") {
	$("#iPrintBill").hide();
}}

function printCurrentPrescriptionNewIpd(paramPopupOrPrint,callFrom) {

	
	callFrom = $("#pageType").val();
	hideSummaryPostPopupIPD();
	/*if (paramPopupOrPrint == "SHOW_POPUP_PRINT") {
		$("#iPrintIPDSummary").show();
	} else */if (paramPopupOrPrint == "PRINT") {
		
		var pid = parseInt($('#patientId').html());
		var tid = parseInt($('#treatmentId').html());
		
		var pid1 = $.trim($("#pid2").html());
		var tid1 = $.trim($("#tid2").html());
		var date = $("#regDate2").html();
		var date_pick = $("#OFdate-pick").val();
		//alert(date_pick);
		
		if(pid1 != "" || tid1 != ""){
			callFrom = "previousTreatmentIPD";
		}
		
		var instructionLanguage = $(
				"input[name='prepInstructionPopup']:checked").val();
		var pageSize = $(
		"input[name='prepInstructionPaperSizePopup']:checked").val();
		var vaccinationFlagCheckboxPrint = $(
				"input[name='vaccinationFlagCheckboxPrint']:checked").val();

		
		setTimeout(
				function() {

					$("#iPrintIPDSummary").hide();
					
					if(pid1 == "" && tid1 == ""){/*
						window
							.open(("IPDPrescriptionPrint.jsp?pid=" + pid + "&callFrom=" + callFrom
									+ "&tid=" + tid + "&instructionLanguage="
									+ instructionLanguage + "&date=" + date
									+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&pageSize="+pageSize));
					
					*/

						window
							.open(("IPDPrescriptionPrintNew.jsp?patID=" + pid + "&callFrom=" + callFrom
									+ "&treatID=" + tid + "&instructionLanguage="
									+ instructionLanguage + "&date=" + date
									+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&date_pick="+date_pick));
				
							
						
					}
					else{
						window
							.open(("IPDPrescriptionPrint.jsp?pid1=" + pid1 + "&callFrom=" + callFrom
								+ "&tid1=" + tid1 + "&instructionLanguage="
								+ instructionLanguage + "&date=" + date
								+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&pageSize="+pageSize));
						
					}location.reload();
					}, 300);
		
	} else if (paramPopupOrPrint == "HIDE_POPUP_PRINT") {
		$("#iPrintIPDSummary").hide();
	}
	

}



function fetchCKEditorDocterDesk1ForPrintIPDNew(treatId) {
	
	//var treatmentId = $('#tid2').html();
	var inputs = [];
	inputs.push('action=fetchCKEditorDocterDesk1');
	inputs.push('treatmentId=' + treatId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					var testObj = eval('(' + ajaxResponse + ')');
					
						var divContent="";
						if ((testObj.pattemplist.length) > 0) {
							
							for ( var int = 0; int < testObj.pattemplist.length; int++) {
								divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>" + testObj.pattemplist[int].tempdata + "</td></tr>";
							}
						}
						else
						{
							divContent=divContent+"<tr><td colspan = 4>No Record Found</td></tr>";
						}
						$("#SubObj2").html(divContent);
				}
			});
}
function setDoctorPreRoundforPrintIPDNew(treatId) {

	rowCount = 1;
	k = 1;
	count = 1;
	//var treatmentId = $('#tid2').html();
	pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	var date = $("#date-pick").val();
	//alert(date);
	var inputs = [];
	//inputs.push('action=PreviousDoctorRound');
	//inputs.push('tid=' + treatId);
	//inputs.push('date=' + date);

	inputs.push('treatmentID='+treatId);
	inputs.push('drRoundIdList='+'');
	
	var str = inputs.join('&');

	jQuery.ajax( {
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "IPDTreatmentServlet",
		url:'./ehat/doctordesk/fetchSelctedIpdDrRound',
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			//alert(r);
			$("#DoctorRound").html(ajaxResponse);
			var testObj = eval('(' + ajaxResponse + ')');
			var divContent="";
			if (testObj.drrl.length > 0) {
				
				for ( var int = 0; int < testObj.drrl.length; int++) {
					divContent=divContent+"<tr class='col-md-12-1'><td class='form-group col-md-3-1 '>" + (int+1) +"</td>" 
					+ "<td class='form-group col-md-3-1 '>" + testObj.drrl[int].tm +"</td>" 
					+ "<td class='form-group col-md-3-1 '>" + testObj.drrl[int].cn +"</td>" 
					+ "<td class='form-group col-md-3-1 '>" + testObj.drrl[int].ia +"</td>" 
					+ "<td class='form-group col-md-3-1 '>" + testObj.drrl[int].docName +"</td>"
					+ "</tr>";
				}
			}
			else
			{
				divContent=divContent+"<tr><td colspan = 4>No Record Found</td></tr>";
			}
			$("#DocRound2").html(divContent);
		}
	});
}
function fetchAllergyAlertsForPrintIPDNew(pId) {
	
	var pid = $('#pid').html();
		
	if (pid == "" || undefined == pid) {
		pid = $("#pid").val();
	}
	
	if (pId == "" || undefined == pId) {
		alert("Patient ID not fetched properly Allergy alerts...");
		return;
	}
	var inputs = [];
	inputs.push('action=fetchAllergyAlerts');
	inputs.push('pid=' + pId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(res) {
				var ajaxResponse = res;
					$("#allergyAlertsDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');
					var divContent="";
					if (testObj.allergyAlertsDTOList.length > 0) {
							
						for ( var int = 0; int < testObj.allergyAlertsDTOList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>"+ testObj.allergyAlertsDTOList[int].allergyName+
							"---"+testObj.allergyAlertsDTOList[int].allergyDate+"\n"+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
					}
					$("#alertAllergy2").html(divContent);
				}	
			});
}
function showAssessmentForPrintIPDNew(TreatId) {

	count = 1;
	flag_count = 1;
	assesTmpConfmedPrescriptionCount = 1;
	//var treatmentId = $('#tid2').html();
	var inputs = [];
	inputs.push('action=fetchAssessment');
	inputs.push('treatmentId=' + TreatId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(res) {
					var ajaxResponse = res;
					$("#assesmentDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');
					
					var divContent="";
					if (testObj.assessmentList.length > 0) {
							
						for ( var int = 0; int < testObj.assessmentList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>"+ testObj.assessmentList[int].diagnosis+"\n"+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
					}
					$("#conirmDiagno2").html(divContent);
				}
			});
}
function fetchTestForPrintIPDNew(treatId) {

	//var treatmentId = $('#tid2').html();
	/*var inputs = [];
	inputs.push('action=fetchTestForDashboard');
	inputs.push('treatmentId=' + treatId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PathologyServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r) {
					ajaxResponse = r;
					$("#CPOE_TestDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');		
					var divContent="";
					if (testObj.testDashboard.length > 0) {
							
						for ( var int = 0; int < testObj.testDashboard.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1'><td class='form-group col-md-3-1 '>" + testObj.testDashboard[int].perticuler +"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.testDashboard[int].consultant +"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.testDashboard[int].date+"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.testDashboard[int].desciption+"</td>" 
							+ "<td class='form-group col-md-2-1 '>" + testObj.testDashboard[int].testType+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
					}
					$("#cpoeTest2").html(divContent);
					
				}
			});*/
	
	 var callform="default";
		jQuery.ajax({
			async : false,
			type 	: "POST",
			url 	: "ehat/doctordesk/fetchipddetailsdrdesk",
			data	: {
				"tID"        : treatId,
				"callform"   :callform
			},
			timeout : 1000 * 60 * 5,
			cache 	: false,
		
			success : function(r) {
				var divContent="";
				if (r.cpoeServdetails.length > 0) {
						
					for ( var int = 0; int < r.cpoeServdetails.length; int++) {
						//alert(r.cpoeServdetails[int].categoryName);
						
						divContent=divContent
						+"<tr class='col-md-12-1'><td class='form-group col-md-3-1 '>" + r.cpoeServdetails[int].categoryName +"</td>" 
						+ "<td class='form-group col-md-3-1 '>" + r.cpoeServdetails[int].docName +"</td>" 
						+ "<td class='form-group col-md-3-1 '>" + r.cpoeServdetails[int].created_date_time+"</td>" 
						+ "<td class='form-group col-md-3-1 '>-</td>" 
						+ "<td class='form-group col-md-2-1 '>" + r.cpoeServdetails[int].servicename+"</td></tr>";
					}
				}
				else
				{
					divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
				}
				//alert(divContent);
				$("#cpoeTest2").html(divContent);
				
			}
			
		});
	
}
function fetchPrescriptionForPrintIPDNew(treatId) {
	prepCount = 0;
//	var treatmentId = $('#tid2').html();
	var inputs = [];
	inputs.push('action=fetchPrescription');
	inputs.push('treatmentId=' + treatId);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(res) {
					var ajaxResponse = res;
					$("#prescriptionDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');
					var divContent="";
					if (testObj.prescriptionList.length > 0) {
							
						for ( var int = 0; int < testObj.prescriptionList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1'><td>"+(int)+"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.prescriptionList[int].prepName + "</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.prescriptionList[int].name + "</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.prescriptionList[int].instructionName+"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + testObj.prescriptionList[int].days+" Days"+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
					}
					$("#prescription2").html(divContent);
				}
			});
}
function fetchPCTreatmentInstructionForPrintIPDNew(treatId) {
	
	//var treatmentId = $('#tid2').html();
	var inputs = [];
	inputs.push('action=fetchPCTreatmentInstruction');
	inputs.push('treatmentId=' + treatId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					var testObj = eval('(' + ajaxResponse + ')');
					
					var divContent="";
					if (testObj.treatmentInstructionDTOList.length > 0) {
							
						for ( var int = 0; int < testObj.treatmentInstructionDTOList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>"+testObj.treatmentInstructionDTOList[int].treatmentChildInstructionName+"\n"+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
					}
					$("#genInst2").html(divContent);
					
				}
			});
}


function fetchIndividualTreatmentInstructionForPrintIPDNew(treatId) {
	
	//var treatmentId = $('#tid2').html();
	var inputs = [];
	inputs.push('action=fetchIndividualTreatmentInstruction');
	inputs.push('treatmentId=' + treatId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "TreatmentServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					$("#TreatmentInstructionDetails").html(ajaxResponse);
					var testObj = eval('(' + ajaxResponse + ')');

					var divContent="";
					if (testObj.reportInstructionDTOList.length > 0) {
							
						for ( var int = 0; int < testObj.reportInstructionDTOList.length; int++) {
							divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>"+testObj.reportInstructionDTOList[int].reportInstruction+"\n"+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";
					}
					$("#primInst2").html(divContent);
					
				}
			});
}
function showPatientAdmissionNoteIPDNew(treatId,pId) {
	
	//var treatmentId = $("#tid2").html();
	//var pid = $("#pid2").html();
	var inputs = [];
	inputs.push('action=fetchPatientAdmissionNote');
	inputs.push('treatmentId=' + treatId);
	inputs.push('pid=' + pId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			var obj = eval('(' + ajaxResponse + ')');
			var divContent="";
			var a=obj.notes;
			
			if(a=="" || a==null){
				divContent=divContent+"<tr><td colspan = 1>No Record Found</td></tr>";

			}else{
				divContent=divContent+"<tr class='col-md-12-1' style='margin-top: 4px;'><td class='form-group col-md-12-1 '>"+obj.notes+"\n"+"</td></tr>";

			}
			
			$("#note2").html(divContent);
		}
	});
}
function fetchIpdServicesIPDNew(treatId) {
//alert(treatId);
	//var trid = $("#tid2").html();
var serviceId=7;
	var inputs = [];
	inputs.push('action=fetchIpdServices');
	inputs.push('trid=' + treatId);
	inputs.push('serviceid=' + serviceId);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "PatientServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r2) {
					ajaxResponse = r2;
					//$("#servicesList").html(ajaxResponse);
					var r = eval('(' + ajaxResponse + ')');

					var divContent="";
					if (r.cpoedetails.length > 0) {
							
						for ( var int = 0; int < r.cpoedetails.length; int++) {
							//alert(r.cpoeServdetails[int].categoryName);
							var dateTime= new Date(r.cpoedetails[int].created_date_time).toLocaleDateString('en-GB');
							divContent=divContent
							+"<tr class='col-md-12-1'><td class='form-group col-md-3-1 '>" + r.cpoedetails[int].categoryName +"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + r.cpoedetails[int].servicename +"</td>" 
							+ "<td class='form-group col-md-3-1 '>" + r.cpoedetails[int].quantity+"</td>" 
							+ "<td class='form-group col-md-3-1 '>-</td>" 
							+ "<td class='form-group col-md-2-1 '>" + dateTime+"</td></tr>";
						}
					}
					else
					{
						divContent=divContent+"<tr><td colspan = 5>No Record Found</td></tr>";
					}
					//alert(divContent);
					$("#ipdServices2").html(divContent);					
				
				
				}
			});
}


function printPrescriptionIPDNew(paramPopupOrPrint,callFrom) {
	
	callFrom = $("#pageType").val();
	hideSummaryPostPopupIPD();
	/*if (paramPopupOrPrint == "SHOW_POPUP_PRINT") {
		$("#iPrintIPDSummary").show();
	} else */if (paramPopupOrPrint == "PRINT") {
		
		var pid = $('#pIddI').val();
		var tid = $('#tIddI').val();
		
		var pid1 = $.trim($("#pid2").html());
		var tid1 = $.trim($("#tid2").html());
		var date = $("#regDate2").html();
		var date_pick = $("#OFdate-pick").val();
		//alert(date_pick);
		
		if(pid1 != "" || tid1 != ""){
			callFrom = "previousTreatmentIPD";
		}
		
		var instructionLanguage = $(
				"input[name='prepInstructionPopup']:checked").val();
		var pageSize = $(
		"input[name='prepInstructionPaperSizePopup']:checked").val();
		var vaccinationFlagCheckboxPrint = $(
				"input[name='vaccinationFlagCheckboxPrint']:checked").val();

		
		setTimeout(
				function() {

					$("#iPrintIPDSummary").hide();
					
					if(pid1 == "" && tid1 == ""){/*
						window
							.open(("IPDPrescriptionPrint.jsp?pid=" + pid + "&callFrom=" + callFrom
									+ "&tid=" + tid + "&instructionLanguage="
									+ instructionLanguage + "&date=" + date
									+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&pageSize="+pageSize));
					
					*/

						window
							.open(("IPDPrescriptionPrintNew.jsp?patID=" + pid + "&callFrom=" + callFrom
									+ "&treatID=" + tid + "&instructionLanguage="
									+ instructionLanguage + "&date=" + date
									+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&date_pick="+date_pick));
				
							
						
					}
					else{
						window
							.open(("IPDPrescriptionPrint.jsp?pid1=" + pid1 + "&callFrom=" + callFrom
								+ "&tid1=" + tid1 + "&instructionLanguage="
								+ instructionLanguage + "&date=" + date
								+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&pageSize="+pageSize));
						
					}location.reload();
					}, 300);
		
	} else if (paramPopupOrPrint == "HIDE_POPUP_PRINT") {
		$("#iPrintIPDSummary").hide();
	}
	
}

function featchOrderFormByDateNew(treatId,type){


	if (type == 'previous') {
		OFCount = 1;
		//var treatmentId = $("#treatmentId").val();
		var treatmentId =  $("#tr_Id").val(); //added by paras
		
		var date_pick = $("#OFdate-pick").val();
		var inputs = [];
		inputs.push('action=featchOrderFormByDate');
		inputs.push('tid=' + treatId);
		inputs.push('type=' + type);
		inputs.push('date=' + date_pick);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "IPDTreatmentServlet",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						var ajaxResponse = r;
						console.log(r);
					
						$("#previousorder").html(ajaxResponse);
						var sampleBean = eval('(' + ajaxResponse + ')');
						var medicineTempForDischargeSummary = "";
						var divContent="";
						var instruction = "";
						$("#divOmID").html("");

						if (sampleBean.ormali.length > 0) {

							$("#divOmID").html(sampleBean.ormali[0].omID);
							for ( var j = 0; j < sampleBean.ormali.length; j++) {

								for ( var int = 0; int < sampleBean.ormali[j].ocodrli.length; int++) {
									var srNo=int +1;
												
									
									divContent=divContent+"<tr class='col-md-12-1'>" +
									+ "<td class='form-group col-md-1-1'>1</td>" 
									+ "<td class='form-group col-md-3-1 '>" + srNo + "</td>" 
									+ "<td class='form-group col-md-3-1 '>" + sampleBean.ormali[j].ocodrli[int].drdo + "</td>" 
									+ "<td class='form-group col-md-3-1 '>" + sampleBean.ormali[j].ocodrli[int].prep + "</td>" 
									/*+ "<td class='form-group col-md-3-1 '>" +  sampleBean.ormali[j].ocodrli[int].rmrk +"</td>"*/
									+ "<td class='form-group col-md-3-1 '>" +  sampleBean.ormali[j].ocodrli[int].mor +"/"+
									sampleBean.ormali[j].ocodrli[int].eve +"/"+sampleBean.ormali[j].ocodrli[int].night +"</td>"
									+ "<td class='form-group col-md-2-1 '>" + sampleBean.ormali[j].ocodrli[int].days+" Days"+"</td></tr>";
									
									
								}
							}
						}
						
						$('#prescription2').html(divContent);
					}
				});
	} 

}


function fetchIpdCoversheetLab(){ 
	var deptId = $("#deptId").val();
	var tID    = $("#tr_Id").val(); 
	//var servid = 11;
    var callform="coversheet";
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/fetchIpdCoversheetLab",
		data	: {
			"tID"        : tID,
			"callform"   :callform,
			"deptId"   :deptId,
			//"servid"      :servid,
			
		},
		//timeout : 1000 * 60 * 5,
		cache 	: true,
	
		success : function(response) {
			setIpdlab(response);
		}
	});
}


function setIpdlab(response) {
	//alert("--->>>>"+JSON.stringify(response));
	
	var pathoMngmnt=$("#pathoMngmnt").val();
	if(pathoMngmnt=="on"){
		$(".lab_button").show();
		$(".b").hide();
	}else{
		$(".b").show();
		$(".lab_button").hide();
	}
	
	var htm = "";
	var index = 1;
	var count = 1;
	$("#labbut").prop('disabled',true);
	$("#labcmpbut").prop('disabled',true);
	for ( var i = 0; i < response.cpoeServdetails.length; i++) {
		var dateTime=new Date(response.cpoeServdetails[i].inserted_date_time).toLocaleString();
		var date=dateTime.split(",")[0];
		var time=dateTime.split(",")[1];
		if(response.listLabRequest[i].postedResultFlag=="Y"){
			$("#labbut").prop('disabled',false);
			$("#labcmpbut").prop('disabled',false);
			var testmasterId=response.listLabRequest[i].labRequestId;
			var postDate=response.listLabRequest[i].postedDatetime;
			var labReqSlvId=response.listLabRequestSlave[i].labReqSlvId;
			//Profile Id.
			var subSerId=response.cpoeServdetails[i].categoryid;
			var isPackageFlag = "";
			isPackageFlag = response.listLabRequestSlave[i].isPackageFlag;
			htm = htm
			+ "<tr id='labNmRow"+count+"' class='btn-success' onClick='setLabTestId1("+count+","+postDate+")' ondblClick='setLabTestId("+count+","+postDate+")'>"
			+ "<td class='col-md-1-1 TextFont'>"+ index	+ "</td>"
			+ "<td class='col-md-4-1 TextFont'  >"+ response.cpoeServdetails[i].categoryName+ "</td>"
			+ "<td class='col-md-2-1 TextFont' >"+date + "</td>"
			+ "<td class='col-md-2-1 TextFont' >"+time+ "</td>"
			//+ "<td class='col-md-2-1 TextFont'></td>"
			+"<input type='hidden' value='"+testmasterId+"' id='labReqMstId"+(count)+"' />"
			+"<input type='hidden' value='"+labReqSlvId+"' id='labReqSlvId"+(count)+"' />"
			+"<input type='hidden' value='"+postDate+"' id='postDateId"+(count)+"' />"
			+"<input type='hidden' value='"+subSerId+"' id='subSerId"+(count)+"' />"
			+"<input type='hidden' value='"+isPackageFlag+"' id='isPackageFlag"+(count)+"' />"
	        + "</tr>";
	count++;	
	index++;
		}else{
			htm = htm
			+ "<tr id='labNmRow"+count+"' class=''><td class='col-md-1-1 TextFont'>"+ index+ "</td>"
			+ "<td class='col-md-4-1 TextFont'  >"+ response.cpoeServdetails[i].categoryName+ "</td>"
			+ "<td class='col-md-2-1 TextFont' >"+date + "</td>"
			+ "<td class='col-md-2-1 TextFont' >"+time+ "</td>"
			//+ "<td class='col-md-2-1 TextFont'></td>"
	        + "</tr>";
	count++;	
	index++;
		}

	}

	$("#coverSheetLabDashBoard").html(htm);

}

/************
 *@author	:  Laxman Nikam
 *@date		:  14-Feb-2018
 *@codeFor	:  viewLabTestResult in DoctorDesk.
 ***********/ 
function setLabTestId(count,postDate){ 
	//alert(testmaster+"****"+labReqSlvId+"****"+postDate+"*****"+subSerId);
	
	var postDtTm=new Date(postDate).toLocaleString();
	var postDt=postDtTm.split(",")[0];
	var postTm=postDtTm.split(" ")[1];
	
	if(postDtTm == "null"){
		postDt=" ";
		postTm=" ";
	}
	$("#testmasterId").val($("#labReqMstId"+count).val());
	$("#labReqSlvId").val($("#labReqSlvId"+count).val());
	$('#postDate').html(postDt);
	$('#postTime').html(postTm);
	$('#subSerId').val($("#subSerId"+count).val());
	$('#isPackageFlag').val($("#isPackageFlag"+count).val());
	//call viewLabResultDoctorDesk.
	showPopUpTestResult("labindiv");
}
/************
 *@author	:  Laxman Nikam
 *@date		:  14-Feb-2018
 *@codeFor	:  viewLabTestResult and show popUp on DoctorDesk.
 ***********/ 
function showPopUpTestResult(callfrom){
	//set Template.
	IPDCoversheetTemp();
	if(callfrom=="labindiv"){
		$('#postDt').hide();
		$('#postTm').hide();
		$('#pViewBtn').hide();
		$('#pDvBtnOnClick').hide();
		$('#pDvBtn').hide();
		//Call viewTestResult1.
		fetchLabTestResult("labindiv");

		setTimeout(function() {
			$("#iPopupFormula").show();
		}, 500);
		
		setTimeout(function() {
		$('#testDivLab').find('input, text').attr("readonly", "readonly");
		$('#txtLabNote').attr("readonly", "readonly");
		//document.getElementById('btnSavelab').style.visibility = 'hidden';
		
		}, 500);
	}else if(callfrom=="viewbtn"){
		$('#pDvBtn').hide();
		$('#pDvBtnOnClick').hide();
		$('#pViewBtn').hide();
		//Call viewTestResult1.
		$('#postDt').hide();
		$('#postTm').hide();
		//fetchLabTestResult("viewbtn");
		fetchLabTestOnDashBoard2();

		setTimeout(function() {
			$("#iPopupFormula").show();
		}, 500);
		
		setTimeout(function() {
		$('#testDivLab').find('input, text').attr("readonly", "readonly");
		$('#txtLabNote').attr("readonly", "readonly");
		//document.getElementById('btnSavelab').style.visibility = 'hidden';
		
		}, 500);
	}else if(callfrom=="labonclick"){
		$('#pDvBtn').hide();
		$('#pViewBtn').hide();
		$('#pDvBtnOnClick').hide();
		
		$('#postDt').hide();
		$('#postTm').hide();
		//Call viewTestResult1.
		fetchLabTestResult("labonclick");

		setTimeout(function() {
			$("#iPopupFormula").show();
		}, 500);
		
		setTimeout(function() {
		$('#testDivLab').find('input, text').attr("readonly", "readonly");
		$('#txtLabNote').attr("readonly", "readonly");
		//document.getElementById('btnSavelab').style.visibility = 'hidden';
		
		}, 500);
	}
}

/************
 *@author	:  Laxman Nikam
 *@date		:  14-Feb-2018
 *@codeFor	:  view Lab Test Result of posted test.
 ***********/ 
function fetchLabTestResult(callfrom) {
	var tretId="";
	var testmasterId ="";
	var labReqSlvId ="";
	var subSerId ="";
	var isPackageFlag ="";
	if(callfrom == "labindiv"){
		 var valTypeNR = "n";
		 tretId = ($("#treatmentId").html()).trim();
		 testmasterId = ($("#testmasterId").val()).trim();
		 labReqSlvId=($("#labReqSlvId").val()).trim();
		 subSerId=($("#subSerId").val()).trim();
		 var ag=$("#age").html();
		 var age=ag.split("Y")[0];
		 var gender =$("#sex").html();
		 
		 if (age > 15) {
			 if (gender == "Male") {
				 valTypeNR = "m";
			 } else if (gender == "Female") {
					valTypeNR = "f";
				}
			 
		 }else if (15 >= age && age >= 3) {
				valTypeNR = "c";
			} else if (age < 3) {
				valTypeNR = "n";
			}
	}else if(callfrom=="viewbtn"){
		
		 var valTypeNR = "n";
		 tretId = ($("#treatmentId").html()).trim();
		 testmasterId = 0;
		 labReqSlvId=0;
		 subSerId=0;
		 var ag=$("#age").html();
		 var age=ag.split("Y")[0];
		 var gender =$("#sex").html();
		 
		 if (age > 15) {
			 if (gender == "Male") {
				 valTypeNR = "m";
			 } else if (gender == "Female") {
					valTypeNR = "f";
				}
			 
		 }else if (15 >= age && age >= 3) {
				valTypeNR = "c";
			} else if (age < 3) {
				valTypeNR = "n";
			}
	
	}else if(callfrom=="labonclick"){

		 var valTypeNR = "n";
		 tretId = ($("#treatmentId").html()).trim();
		 testmasterId = ($("#testmasterId").val()).trim();
		 labReqSlvId=($("#labReqSlvId").val()).trim();
		 subSerId=($("#subSerId").val()).trim();
		 isPackageFlag = ($("#isPackageFlag").val()).trim();
		 var ag=$("#age").html();
		 var age=ag.split("Y")[0];
		 var gender =$("#sex").html();
		 
		 if (age > 15) {
			 if (gender == "Male") {
				 valTypeNR = "m";
			 } else if (gender == "Female") {
					valTypeNR = "f";
				}
			 
		 }else if (15 >= age && age >= 3) {
				valTypeNR = "c";
			} else if (age < 3) {
				valTypeNR = "n";
			}
	}
 
	var inputs = [];
	//inputs.push('action=viewTestforResult');
	inputs.push('testmasterId=' + testmasterId);
	inputs.push('labReqSlvId=' + labReqSlvId);
	inputs.push('subSerId=' + subSerId);
	inputs.push('tretId=' + tretId);
	inputs.push('isPackageFlag=' + isPackageFlag);
	inputs.push('callfrom=' + callfrom);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url 	: "ehat/doctordesk/fetchLabTestResult",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			//alert("****"+JSON.stringify(r));
			ajaxResponse = r;
			testcount = 1;
			count = 1;
			protestcount = 1;
			pkgcount = 1;
			pkgprocount = 1;
			pkgprotestcount = 1;
			pkgtestcount = 1;
			procount = 1;
			totalcount = 1;
			$("#testDetails").html(ajaxResponse);
			var pobj1 = ajaxResponse;
			var pid ="";
			var count = 1;
			
			// alert("pobj id ::"+pobj1.proLi[2][0].idlbpkg);
			console.log(pobj1);
			
			sr1=1;
			testcount1 = 1;
			count1 = 1;
			protestcount1 = 1;
			pkgcount1 = 1;
			pkgprocount1 = 1;
			pkgprotestcount1 = 1;
			pkgtestcount1 = 1;
			procount1 = 1;
			totalcount1 = 1;
			
		
			var html= "";
			
			//For nursing station pop up.
		if(pobj1.proLi[0].length==0 && pobj1.proLi[1].length==0 && pobj1.proLi[2].length==0){
				setTimeout(function() {
					$("#iPopupFormula").hide();
				}, 500);
				alert("Test result are not posted...!!!");
				return false;
			}
			
		for(var pk=0;pk<pobj1.proLi[2].length;pk++){
							var packageID = pobj1.proLi[2][pk].idlbpkg;
							
							// alert(pobj1.proLi[2][pk].pkgnm);
							html = html+"<div class='col-md-12-1' style='border-bottom: 1px solid #ddd;margin-top: -11px;'>";
							html = html+"<div class='divide-20'></div>";
							html = html+"<div class='col-md-1-1' style='height: 28px; padding-left: 3%; border-top: 1px solid #ddd;border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>"+(sr1++)+"</div>";
							
							html = html+"<div class='col-md-11-1' style='height: 28px; padding-left: 1%;padding-top: 2px; text-align: left; border-top: 1px solid #ddd;' id='pkgDiv"+(pkgcount1)+"'>" + (pobj1.proLi[2][pk].pkgnm) + "</div>";
							html = html+"<input type='hidden' value='pk' id='type"+testcount+"' />";
							html = html+"</div>";
							
							
						
							
							for ( var i = 0; i < myArray.lbpkgli.length; i++) {
								
								if (myArray.lbpkgli[i].idlbpkg == packageID) {
									myObj1 = myArray.lbpkgli[i];
									break;
								}
							}
							myObj = JSON.stringify(myObj1);
							userBean = eval('(' + myObj + ')');
							console.log(userBean);
							
							pid = userBean.idlbpkg;
							
							// Now If both contains same packageID
							if(packageID==pid){
								
									// alert("Pckage id "+pid);
									
									for(var pr=0;pr < userBean.pkgprotstli.length;pr++){
										
										var tType =userBean.pkgprotstli[pr].typeTP;
										// alert(tType);
										
										if(tType=="P"){
											var pid =userBean.pkgprotstli[pr].idprotst;
											// alert(pid);
											
											// profile from main list
											for(var p=0;p<pobj1.proLi[2][pk].lbproli.length;p++){
												
											if( pobj1.proLi[2][pk].lbproli[p].proId==pid ){
												
												// alert(pobj1.proLi[2][pk].lbproli[p].proNm);
													html = html+"<div class='col-md-12-1'";
													html = html+"style='margin-top: -11px;'>";
													html = html+"<div class='divide-20'></div>";
													html = html+"<div class='col-md-1-1'";
													html = html+"style='height: 28px; padding-left: 2%;border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>";
													html = html+"</div>";
													
													html = html+"<div class='col-md-11-1'";
													html = html+"style='height: 28px; padding-left: 4%; padding-top: 2px; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; text-align: left;'";
													html = html+"id='pkgproDiv"+(pkgcount1)+(pkgprocount)+"'>"+(pobj1.proLi[2][pk].lbproli[p].proNm)+"</div>";
													html = html+"<input type='hidden' value='pkp' id='type"+(testcount)+"' />";
													html = html+"</div>";
													// test in profile
													for(var pt=0;pt<pobj1.proLi[2][pk].lbproli[p].testli.length;pt++){
														
														if(pobj1.proLi[2][pk].lbproli[p].testli[pt].tid !=0){
															
															html = html+"<div class='col-md-12-1'  style='margin-top: -11px;'";
															html = html+"id='testDiv"+(pobj1.proLi[2][pk].lbproli[p].testli[pt].tid)+"'>";
															html = html+"<div class='divide-20'></div>";
															html = html+"<input type='hidden' value='pkpt' id='type"+(procount1)+"' />";
															
															html = html+"<div class='col-md-2-1'";
															html = html+"style='height: 28px; padding-left: 1%; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>";
															html = html+"</div>";
															
															html = html+"<div class='col-md-4-1'";
															html = html+"style='height: 28px; padding-left: 2%; border-top: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'";
															html = html+"id='testNM"+(pkgcount1)+(pkgprocount1)+(pkgprotestcount1)+"'>"+(pobj1.proLi[2][pk].lbproli[p].testli[pt].tnm);
															html = html+"<input type='hidden' value='"+(pobj1.proLi[2][pk].lbproli[p].testli[pt].tnm)+"' id='nameOfTest"+(count1)+"' />";
															html = html+"<input type='hidden' value='"+(pobj1.proLi[2][pk].lbproli[p].testli[pt].objLbForm.extstid)+"' id='formulaForTest"+count1+"' />";
		 													html = html+"</div>";
		 													
		 													if(pobj1.proLi[2][pk].lbproli[p].testli[pt].tstRe==undefined){
		 														pobj1.proLi[2][pk].lbproli[p].testli[pt].tstRe="";
		 													}
		 													var rowNum= count1;
		 													html = html+"<div class='col-md-2-1'";
		 													html = html+"style='height: 28px;border-top: 1px solid #ddd;border-right: 1px solid #ddd; padding-top: 2px;padding-left: 1%;padding-right: 1%;'";
		 													html = html+"id='testRE"+(pkgcount1)+(pkgprocount1)+(pkgprotestcount1)+"'>";
		 													html = html+"<input type='hidden' value='"+(pobj1.proLi[2][pk].lbproli[p].testli[pt].idTstRe)+"' id='idResultTest"+(count1)+"' />";
		 													html = html+"<input type='hidden' value='"+(pobj1.proLi[2][pk].lbproli[p].testli[pt].tid)+"' id='idOfTest"+(count1)+"' />";
		 													html = html+"<input type='text' value='"+(pobj1.proLi[2][pk].lbproli[p].testli[pt].tstRe)+"' onfocus='setFormulaToTestResult("+count1+")' id='testvalue"+(count1++)+"' maxlength='100' style='width: 100%;' />";
		 													html = html+"</div>";
		 													
		 													
		 													html = html+"<div class='col-md-2-1'";
		 													html = html+"style='height: 28px; padding-left: 1%; border-right: 1px solid #ddd; border-top: 1px solid #ddd; padding-top: 2px;text-align: center;'";
		 													html = html+"id='testNR"+(pkgcount1)+(pkgprocount1)+(pkgprotestcount1)+"'>";
		 													
		 												if (pobj1.proLi[2][pk].lbproli[p].testli[pt].vt=="g") {
		 														
		 													html = html+(pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[0].nvlv);
		 														
														}
		 													
		 												if (pobj1.proLi[2][pk].lbproli[p].testli[pt].vt=="i") {

		 													/**************lab*newindividual***@author:paras* for pakage-profile*****************/	
		 													
		 													if(pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli.length>4){
		 														
		 														if(pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[4].oldandnew==1)               //for new records age vise.
		 														{		
		 														
		 														var a=pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[4].oldandnew;
		 													//	alert(a);
		 												        var k =pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[4].male;
		 									                  //  alert(k);
		 									                    html = html+ (pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[4].nvlv)+" - "+(pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[4].nvuv)+(pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[4].unitnm);
		 														
		 									               		}else{
		 									               		if(valTypeNR !=""){                                   //for new records gendar vise.
				 													
			 														for(var k =0;k<pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli.length;k++){
			 															
			 															if(valTypeNR == pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].nvsx ){
			 																
			 														html = html+(pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].nvlv)+" - "+(pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].nvuv)+(pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].unitnm);		
			 													
			 															}
			 														}
			 													}
		 													}
		 													}else{                                               //for new records gendar vise.
		 													
		 													if(valTypeNR !=""){
		 													
		 														for(var k =0;k<pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli.length;k++){
		 															
		 															if(valTypeNR == pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].nvsx ){
		 																
		 														html = html+(pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].nvlv)+" - "+(pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].nvuv)+(pobj1.proLi[2][pk].lbproli[p].testli[pt].tnvli[k].unitnm);		
		 													
		 															}
		 														}
		 													}
		 												}		
														}
		 												
		 												html = html+"</div>";
		 												
		 												html = html+"<div id='testMethod"+(pkgcount)+(pkgprocount)+(pkgprotestcount)+"' class='col-md-2-1'";
		 												html = html+"style='height: 28px;border-top: 1px solid #ddd; padding-top: 2px;'>";
		 												html = html+(pobj1.proLi[2][pk].lbproli[p].testli[pt].tmethd);
		 												
		 												//for popup to type value
														html = html+"<button id='btnInsert"+(pobj1.proLi[2][pk].lbproli[p].testli[pt].tid)+(rowNum)+"' class='btn btn-xs btn-success' value='' name='btnInsert' onclick='openEditorForResult("+(pobj1.proLi[2][pk].lbproli[p].testli[pt].idTstRe)+","+(pobj1.proLi[2][pk].lbproli[p].testli[pt].tid)+","+(rowNum)+",\"pkgprots\")' title='Type Result'  style='float:right'>";
														html = html+"<i class='fa fa-eye View'></i> </button>";
														//for popup to type value
														
		 												html = html+"</div>";
		 												html = html+"</div>";
		 												
		 												html = html+"<input type='hidden' value='"+(pkgprotestcount1++)+"{}' />";
		 												
														}
												}
												html = html+"<input type='hidden' value='"+(pkgprotestcount1)+"' id='reportpkgproTestCount"+(pkgcount1)+(pkgprocount1)+"' />";
												html = html+"<input type='hidden' value='"+(pkgprocount1++)+"' />";
												html = html+"<input type='hidden' value='"+(pkgprocount1)+"' id='reportpkgproCount"+(pkgcount1)+"' />";
												
												break;
											}
											}
										}// if Profile
										else{
											var tid =userBean.pkgprotstli[pr].idprotst;
											// alert(tid);
											// test from main list
											for(var t=0;t<pobj1.proLi[2][pk].lbtstli.length;t++){
												
												if(pobj1.proLi[2][pk].lbtstli[t].tid == tid){
													
													// alert(pobj1.proLi[2][pk].lbtstli[t].tnm);
													
													html = html+"<div class='col-md-12-1' style='margin-top: -11px;' id='pkgtestDiv"+(pkgcount1) +(pkgtestcount1)+"'>";
													html = html+"<div class='divide-20'></div>";
													html = html+"<input type='hidden' value='pkt' id='type"+(testcount1)+"' />";
													html = html+"<div class='col-md-1-1' style='height: 28px;padding-left: 1%;border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'></div>";
													html = html+"<div class='col-md-5-1' style='height: 28px; padding-left: 2%;border-top: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'";
													html = html+"id='pkgtestNM"+(pkgcount1)+(pkgtestcount)+"'>"+(pobj1.proLi[2][pk].lbtstli[t].tnm);
													html = html+"<input type='hidden' value='"+(pobj1.proLi[2][pk].lbtstli[t].tnm)+"' id='nameOfTest"+(count1)+"' />";
													html = html+"<input type='hidden' value='"+(pobj1.proLi[2][pk].lbtstli[t].objLbForm.extstid)+"' id='formulaForTest"+count1+"' />";
													html = html+"</div>";
													if(pobj1.proLi[2][pk].lbtstli[t].tstRe==undefined){
														pobj1.proLi[2][pk].lbtstli[t].tstRe="";
													}
													var rowNum = count1;
													html = html+"<div class='col-md-2-1'";
													html = html+"style='height: 28px; padding-left: 1%; padding-right: 1%; border-top: 1px solid #ddd;border-right: 1px solid #ddd; padding-top: 2px;'";
													html = html+"id='pkgtestRE"+(pkgcount1)+(pkgtestcount1)+"'>";
													html = html+"<input type='hidden' value='"+(pobj1.proLi[2][pk].lbtstli[t].idTstRe)+"' id='idResultTest"+(count1)+"' />";
													html = html+"<input type='hidden' value='"+(pobj1.proLi[2][pk].lbtstli[t].tid)+"' id='idOfTest"+count1+"' />";
													html = html+"<input	type='text' value='"+(pobj1.proLi[2][pk].lbtstli[t].tstRe)+"' onfocus='setFormulaToTestResult("+count1+")' onkeypress='return validateSpecialMoreChar(event)' id='testvalue"+(count1++)+"' maxlength='100' style='width: 100%;'/></div>";
													html = html+"<div class='col-md-2-1'";
													html = html+"style='height: 28px; padding-left: 1%; border-right: 1px solid #ddd;border-top: 1px solid #ddd; padding-top: 2px;text-align: center;'";
													html = html+"id='pkgtestNR"+(pkgcount1)+(pkgtestcount1)+"'>";
													
												if(pobj1.proLi[2][pk].lbtstli[t].vt == "g"){
												
													html = html+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[0].nvlv) ;	
														
												}
												
												if(pobj1.proLi[2][pk].lbtstli[t].vt =="i"){
													
											/**************lab*newindividual***@author:paras* for pakage-test*****************/	
 													
 													if(pobj1.proLi[2][pk].lbtstli[t].tnvli.length>4){
 														
 														if(pobj1.proLi[2][pk].lbtstli[t].tnvli[4].oldandnew==1)               //for new records age vise.
 														{		
 														
 														var a=pobj1.proLi[2][pk].lbtstli[t].tnvli[4].oldandnew;
 														//alert(a);
 												        var k =pobj1.proLi[2][pk].lbtstli[t].tnvli[4].male;
 									                 //   alert(k);
 									                    html = html+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[4].nvlv)+" - "+(pobj1.proLi[2][pk].lbtstli[t].tnvli[4].nvuv)+(pobj1.proLi[2][pk].lbtstli[t].tnvli[4].unitnm);
 														
 									               		}else{

 															if(valTypeNR !=""){
 																
 																for(var tnv = 0; tnv<pobj1.proLi[2][pk].lbtstli[t].tnvli.length;tnv++){
 																	
 																	if(valTypeNR == pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].nvsx){
 																html = html+(pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].nvlv)+" - "+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].nvuv)+(pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].unitnm);
 																	}
 																}
 															}
 													}
 													}else{
													
														if(valTypeNR !=""){
														
														for(var tnv = 0; tnv<pobj1.proLi[2][pk].lbtstli[t].tnvli.length;tnv++){
															
															if(valTypeNR == pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].nvsx){
														html = html+(pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].nvlv)+" - "+ (pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].nvuv)+(pobj1.proLi[2][pk].lbtstli[t].tnvli[tnv].unitnm);
															}
														}
														
													}
 												 }
												}
												
												html = html+"</div>";
												
												html = html+"<div class='col-md-2-1' id='pkgtestMethod"+(pkgcount1)+(pkgtestcount1)+"' ";
												html = html+"style='height: 28px;border-top: 1px solid #ddd; padding-top: 2px;'>";
												html = html+((pobj1.proLi[2][pk].lbtstli[t].tmethd));
												//for popup to type value
												html = html+"<button id='btnInsert"+(pobj1.proLi[2][pk].lbtstli[t].tid)+(rowNum)+"' class='btn btn-xs btn-success' value='' name='btnInsert' onclick='openEditorForResult("+(pobj1.proLi[2][pk].lbtstli[t].idTstRe)+","+(pobj1.proLi[2][pk].lbtstli[t].tid)+","+(rowNum)+",\"pkgts\")' title='Type Result'  style='float:right'>";
												html = html+"<i class='fa fa-eye View'></i> </button>";
												/*if(callfrom == "labindiv"  || callfrom == "viewbtn"){
													html = html+"<i class='fa fa-eye View'></i> </button>";
												}else{
													html = html+"<i class='fa fa-edit'></i> </button>";
												}*/
												//for popup to type value
												html =html+"</div>";
												html = html+"</div>";
												
												html = html+"<input type='hidden' value='"+(pkgtestcount1++)+"' />";
													break;
													
												}// if inner else
											}// else inner for loop
										}// else test
									}
									
							}// if for package id equal
			}// for main list proLi[2]
		
		// 2nd list inside main list
		
			for(var pk=0;pk<pobj1.proLi[0].length;pk++){
				html = html+"<div class='col-md-12-1'";
				html = html+"style='border-top: 1px solid #ddd; margin-top: -1px;'>";
				html = html+"<div class='divide-10'></div>";
				html = html+"<div class='col-md-1-1'";
				html = html+"style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>"+(sr1++);
				html = html+"</div>";
				var postDtTm=new Date(pobj1.proLi[0][pk].postDtTm).toLocaleString();
				html = html+"<div class='col-md-11-1'";
				html = html+"style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;left;font-weight: bold;'";
				html = html+"id='proDiv"+(procount1)+"'>"+pobj1.proLi[0][pk].proNm+"   [ "+(pobj1.proLi[0][pk].refdocname).toUpperCase()+" : "+postDtTm+" ]";
				if(pobj1.proLi[0][pk].pkgNm!="-" && pobj1.proLi[0][pk].pkgNm!=null && pobj1.proLi[0][pk].pkgNm!=""){
					html = html+" - ("+pobj1.proLi[0][pk].pkgNm+")</div>";
				}else{
					html = html+"</div>";
				}
				html = html+"<input type='hidden' value='p' id='type"+(testcount1)+"' />";
				html = html+"</div>";
				
				// {#foreach $T.proLi.testli as testli}
				
				for(var ts=0; ts<pobj1.proLi[0][pk].testli.length;ts++){
					
				if(pobj1.proLi[0][pk].testli[ts].tid!=0){
					
					html = html+"<div class='col-md-12-1'";
					html = html+"style='margin-top: -11px;'";
					html = html+"id='testDiv"+(pobj1.proLi[0][pk].testli[ts].tid)+"'>";
					html = html+"<div class='divide-20'></div>";
					html = html+"<input type='hidden' value='pt' id='type"+(procount1)+"' />";
					html = html+"<div class='col-md-2-1'";
					html = html+"style='height: 28px; padding-left: 1%; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'></div>";
					html = html+"<div class='col-md-4-1'";
					html = html+"style='height: 28px; padding-left: 2%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'";
					html = html+"id='testNM"+(procount1)+(protestcount1)+"'>"+(pobj1.proLi[0][pk].testli[ts].tnm);
					html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].testli[ts].tnm)+"' id='nameOfTest"+(count1)+"' />";
					html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].testli[ts].objLbForm.extstid)+"' id='formulaForTest"+count1+"' />";
					html = html+"</div>";
					
					if(pobj1.proLi[0][pk].testli[ts].tstRe==undefined){
						pobj1.proLi[0][pk].testli[ts].tstRe="";
					}
					var rowNum = count1;

					//Added by Laxman on 01-Feb-2018.
					html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].serviceid)+"' id='serviceId"+(count1)+"' />";
					html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].subserviceid)+"' id='subserviceId"+(count1)+"' />";
					html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].labreqid)+"' id='labreqId"+(count1)+"' />";
					html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].labreqslvid)+"' id='labreqslvId"+(count1)+"' />";
					html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].testli[ts].ndgnrl)+"' id='narrationId"+(count1)+"' />";
					html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].testli[ts].idTstRe)+"' id='idResultTest"+(count1)+"' />";
					html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].testli[ts].tid)+"' id='idOfTest"+(count1)+"' />";
					html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].testli[ts].vt)+"' id='isTemplate"+(count1)+"' />";
					
					if(pobj1.proLi[0][pk].testli[ts].vt == "t"){//for template

					html = html+"<div class='col-md-2-1'";
					html = html+"style='height: 28px; border-bottom: 1px solid #ddd; text-align: left; padding-left: 1%; padding-right: 1%; border-right: 1px solid #ddd; padding-top: 2px;'";
					html = html+"id='testRE"+(procount1)+(protestcount1)+"'>";
					html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].testli[ts].idTstRe)+"' id='idTempResultTest"+(count1)+"' />";
					html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].testli[ts].tid)+"' id='idOfTempTest"+(count1)+"' />";

						html = html+"<input	type='button' value='"+(pobj1.proLi[0][pk].testli[ts].tnm)+"' id='tempTestValue"+count1+"' onClick=viewTemplateForLabTest("+count1+"); maxlength='12' style='width: 100%;' /></div>";
						//$("#iTestTemplateName").val(pobj1.proLi[0][pk].testli[ts].tnm);
						$("#iImpression").val(pobj1.proLi[0][pk].testli[ts].impressions);
						CKEDITOR.instances['iEditorTestTemplate'].setData((pobj1.proLi[0][pk].testli[ts].testTemplate));
						
						$("#idlabtest").val(pobj1.proLi[0][pk].testli[ts].tid);
						$("#hTestTemplateName").val(pobj1.proLi[0][pk].testli[ts].tnm);
						$("#hTestTemplate").val(pobj1.proLi[0][pk].testli[ts].testTemplate);
						$("#hImpression").val(pobj1.proLi[0][pk].testli[ts].impressions);
						$("#hID").val(count1);
						count1++;
						}else{

					html = html+"<div class='col-md-2-1'";
					html = html+"style='height: 28px; border-bottom: 1px solid #ddd; text-align: left; padding-left: 1%; padding-right: 1%; border-right: 1px solid #ddd; padding-top: 2px;'";
					html = html+"id='testRE"+(procount1)+(protestcount1)+"'>";
					
					html = html+"<input	type='text' value='"+(pobj1.proLi[0][pk].testli[ts].tstRe)+"' onfocus='setFormulaToTestResult("+count1+")' id='testvalue"+(count1++)+"' maxlength='100' style='width: 100%;'/></div>";
					
					
					}
					html = html+"<div class='col-md-2-1'";
					html = html+"style='height: 28px; border-bottom: 1px solid #ddd; padding-left: 1%; border-right: 1px solid #ddd; padding-top: 2px;text-align: center;'";
					html = html+"id='testNR"+(procount1)+(protestcount1)+"'>";

					if(pobj1.proLi[0][pk].testli[ts].vt == "g"){
					html = html+(pobj1.proLi[0][pk].testli[ts].tnvli[0].nvlv);	
					}
					
					if (pobj1.proLi[0][pk].testli[ts].vt == "i"){
						

						/**************lab*newindividual***@author:paras* for profile*****************/	
						
						if(pobj1.proLi[0][pk].testli[ts].tnvli.length>4){
							
							if(pobj1.proLi[0][pk].testli[ts].tnvli[4].oldandnew==1)               //for new records age vise.
							{		
							
							var a=pobj1.proLi[0][pk].testli[ts].tnvli[4].oldandnew;
						//	alert(a);
					        var k =pobj1.proLi[0][pk].testli[ts].tnvli[4].male;
		                  //  alert(k);
		                    html = html+ (pobj1.proLi[0][pk].testli[ts].tnvli[4].nvlv)+" - "+(pobj1.proLi[0][pk].testli[ts].tnvli[4].nvuv)+(pobj1.proLi[0][pk].testli[ts].tnvli[4].unitnm);
							
		               		}else{
									if(valTypeNR !=""){
							// {#foreach $T.testli.tnvli as tnvli}
										for(var j=0; j<pobj1.proLi[0][pk].testli[ts].tnvli.length;j++){
											  if(valTypeNR ==pobj1.proLi[0][pk].testli[ts].tnvli[j].nvsx){ 
												  html = html+(pobj1.proLi[0][pk].testli[ts].tnvli[j].nvlv)+ " - "+(pobj1.proLi[0][pk].testli[ts].tnvli[j].nvuv)+(pobj1.proLi[0][pk].testli[ts].tnvli[j].unitnm);
											  }
											}
							}
						}
						}else{                                                                       //for old records age vise.
						
						if(valTypeNR !=""){
							for(var j=0; j<pobj1.proLi[0][pk].testli[ts].tnvli.length;j++){
							  if(valTypeNR ==pobj1.proLi[0][pk].testli[ts].tnvli[j].nvsx){ 
								  html = html+(pobj1.proLi[0][pk].testli[ts].tnvli[j].nvlv)+ " - "+(pobj1.proLi[0][pk].testli[ts].tnvli[j].nvuv)+(pobj1.proLi[0][pk].testli[ts].tnvli[j].unitnm);
							  }
							}
						}
					}
				}
					/******end********lab*newindividual***@author:paras* for profile*****************/	
					html = html+"</div>";
					
					
					html = html+"<div id='testMethod"+(procount1)+(protestcount1)+"' class='col-md-2-1'";
					html = html+"style='height: 28px; border-bottom: 1px solid #ddd; padding-top: 2px;' title='"+pobj1.proLi[0][pk].testli[ts].tmethd+"'>";
					if(pobj1.proLi[0][pk].testli[ts].tmethd.length > 25){
					html = html+(pobj1.proLi[0][pk].testli[ts].tmethd.substring(0, 25))+"...";
					}else{
						html = html+(pobj1.proLi[0][pk].testli[ts].tmethd);
					}
					//Added by Laxman on for edit btnClass narration 07-Feb-2018.
					var btnClass="btn-success";
					if(pobj1.proLi[0][pk].testli[ts].ndgnrl!=undefined && pobj1.proLi[0][pk].testli[ts].ndgnrl!="" && pobj1.proLi[0][pk].testli[ts].ndgnrl!="undefined" && pobj1.proLi[0][pk].testli[ts].ndgnrl!="-"){
						btnClass="btn-danger";
					}
					//for popup to type value
					html = html+"<button id='btnInsert"+(pobj1.proLi[0][pk].testli[ts].tid)+(rowNum)+"' class='btn btn-xs "+btnClass+"' value='' name='btnInsert' onclick='openEditorForResult("+(pobj1.proLi[0][pk].testli[ts].idTstRe)+","+(pobj1.proLi[0][pk].testli[ts].tid)+","+(rowNum)+",\"prots\")' title='Type Result'  style='float:right'>";
					html = html+"<i class='fa fa-eye View'></i> </button>";
					/*if(callfrom == "labindiv"  || callfrom == "viewbtn"){
						html = html+"<i class='fa fa-eye View'></i> </button>";
					}else{
						html = html+"<i class='fa fa-edit'></i> </button>";
					}*/
					//for popup to type value
					html = html+"</div>";
					
					html = html+"</div>";
					
					html = html+"<input type='hidden' value='"+(protestcount1++)+"' />";
					
				}
				
				}
				
				html = html+"<input type='hidden' value='"+(protestcount1++)+"' id='reportproTestCount"+(procount1)+"' />";
				html = html+"<input type='hidden' value='"+(procount1++)+"' />";
						
			}
				html = html+"<input type='hidden' value='"+(procount1)+"' id='reportproCount' />";
		
				
			// 3rd list @ first position
			for(var pk=0;pk<pobj1.proLi[1].length;pk++){
				
				html = html+"<div class='col-md-12-1'";
				html = html+"style='margin-top: -11px;'";
				html = html+"id='testDiv"+(pobj1.proLi[1][pk].tid)+"'>";
				html = html+"<div class='divide-20'></div>";
				html = html+"<input type='hidden' value='t' id='type"+(testcount1)+"' />";
				
				html = html+"<div class='col-md-1-1'";
				html = html+"style='height: 28px; padding-left: 1%;border-top: 1px solid #ddd;  border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>"+(sr1++)+"</div>";
				
				html = html+"<div class='col-md-5-1'";
				html = html+"style='height: 28px; padding-left: 1%;border-top: 1px solid #ddd;  border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'";
				html = html+"id='testNM"+(count1)+"'>"+(pobj1.proLi[1][pk].tnm);
				html = html+"<input type='hidden' value='"+(pobj1.proLi[1][pk].tnm)+"' id='nameOfTest"+(count1)+"' />";
				html = html+"<input type='hidden' value='"+(pobj1.proLi[1][pk].objLbForm.extstid)+"' id='formulaForTest"+count1+"' />";
				html = html+"</div>";
				
				if(pobj1.proLi[1][pk].tstRe==undefined){
					pobj1.proLi[1][pk].tstRe="";
				}
				var rowNum = count1;
				html = html+"<div class='col-md-2-1'";
				html = html+"style='height: 28px; text-align: left; padding-left: 1%; padding-right:1%; border-top: 1px solid #ddd;  border-right: 1px solid #ddd; padding-top: 2px;'";
				html = html+"id='testRE"+(count1)+"'>";
				html = html+"<input type='hidden' value='"+(pobj1.proLi[1][pk].idTstRe)+"' id='idResultTest"+(count1)+"' />";
				html = html+"<input type='hidden' value='"+(pobj1.proLi[1][pk].tid)+"' id='idOfTest"+(count1)+"' />";
				

				/*if(pobj1.proLi[1][pk].vt == "g"){

					
					html = html+"<input	type='text' value='-' id='testvalue"+(count1++)+"' maxlength='12' style='width: 100%;' /></div>";
				}else{*/
					
					html = html+"<input	type='text' value='"+(pobj1.proLi[1][pk].tstRe)+"' onfocus='setFormulaToTestResult("+count1+")' id='testvalue"+(count1++)+"' maxlength='100' style='width: 100%;'/></div>";

			//	}
				
				html = html+"<div class='col-md-2-1'";
				html = html+"style='height: 28px; padding-left: 1%;border-top: 1px solid #ddd;  border-right: 1px solid #ddd; padding-top: 2px;text-align: center;'";
				html = html+"id='testNR"+(count1)+"'>";
				
				if(pobj1.proLi[1][pk].vt == "g"){
				// {$T.testli.tnvli[0].nvlv}
				html = html+(pobj1.proLi[1][pk].tnvli[0].nvlv);	
				}
				
				if(pobj1.proLi[1][pk].vt == "i"){
					
					
					/**************lab*newindividual***@author:paras* for test*****************/
			if(pobj1.proLi[1][pk].tnvli.length>4){
				
						if(pobj1.proLi[1][pk].tnvli[4].oldandnew==1)               //for new records age vise.
						{		
						
						var a=pobj1.proLi[1][pk].tnvli[4].oldandnew;
						//alert(a);
				        var k =pobj1.proLi[1][pk].tnvli[4].male;
	                //    alert(k);
	                    html = html+ (pobj1.proLi[1][pk].tnvli[4].nvlv)+" - "+(pobj1.proLi[1][pk].tnvli[4].nvuv)+(pobj1.proLi[1][pk].tnvli[4].unitnm);
						
	               		}else{
								if(valTypeNR !=""){
						// {#foreach $T.testli.tnvli as tnvli}
						for(var i=0;i< pobj1.proLi[1][pk].tnvli.length;i++){
							// $T.tnvli.nvsx
							if(valTypeNR == pobj1.proLi[1][pk].tnvli[i].nvsx){
								// {$T.tnvli.nvlv} -
								// {$T.tnvli.nvuv}{$T.tnvli.unitnm}
								html = html+ (pobj1.proLi[1][pk].tnvli[i].nvlv)+" - "+(pobj1.proLi[1][pk].tnvli[i].nvuv)+(pobj1.proLi[1][pk].tnvli[i].unitnm);
							}
						}
						}
					}
					}else{
						
						if(valTypeNR !=""){                                             //for old records gender vise. 	
							// {#foreach $T.testli.tnvli as tnvli}
							for(var i=0;i< pobj1.proLi[1][pk].tnvli.length;i++){
								// $T.tnvli.nvsx
								if(valTypeNR == pobj1.proLi[1][pk].tnvli[i].nvsx){
									// {$T.tnvli.nvlv} -
									// {$T.tnvli.nvuv}{$T.tnvli.unitnm}
									html = html+ (pobj1.proLi[1][pk].tnvli[i].nvlv)+" - "+(pobj1.proLi[1][pk].tnvli[i].nvuv)+(pobj1.proLi[1][pk].tnvli[i].unitnm);
								}
							}
							}
						
						}
			
				}

	 /**********end**************************/		
				html = html+"</div>";
				
				html = html+"<div id='testMethod{count}' class='col-md-2-1'";
				html = html+"style='height: 28px; border-top: 1px solid #ddd;  text-align: left; padding-top: 2px;'>";
				html = html+(pobj1.proLi[1][pk].tmethd);
				
				//var tst ="ts";
				
				//if(pobj1.proLi[1][pk].vt == "g"){
					
					html = html+"<button id='btnInsert"+(pobj1.proLi[1][pk].tid)+(rowNum)+"' class='btn btn-xs btn-success' value='' name='btnInsert' onclick='openEditorForResult("+(pobj1.proLi[1][pk].idTstRe)+","+(pobj1.proLi[1][pk].tid)+","+(rowNum)+",\"ts\")' title='Type Result'  style='float:right'>";
					html = html+"<i class='fa fa-eye View'></i> </button>";
					/*if(callfrom == "labindiv"  || callfrom == "viewbtn"){
						html = html+"<i class='fa fa-eye View'></i> </button>";
					}else{
						html = html+"<i class='fa fa-edit'></i> </button>";
					}*/
				//}
			
				html = html+"</div>";
				
				html = html+"<div id='testNote"+(count1)+"' style='display: none;'>"+(pobj1.proLi[1][pk].tnote)+"</div>";
				html = html+"<div id='testClinicaluse"+(count1)+"' style='display: none;'>"+(pobj1.proLi[1][pk].tcliuse)+"</div>";
				html = html+"<div id='testIncreasedlevel"+(count1)+"' style='display: none;'>";
				html = html+(pobj1.proLi[1][pk].tinrl)+"</div>";
				html = html+"<div id='testInterpretation"+(count1)+"' style='display: none;'>"+(pobj1.proLi[1][pk].tinter);
				html = html+"</div>";
				html = html+"<div id='testComments"+(count1++)+"' style='display: none;'>"+(pobj1.proLi[1][pk].tcommnt);
				html = html+"</div>";
				
				html = html+"</div>";
				
			}
				html = html+"<input type='hidden' value='"+(--count1)+"' id='reportTestCount' />";
		
			$("#testDivLab").html(html);
		}
	});
}


function ShowPrint(callfrom){
	labResultPrint(callfrom);
}

/************
 *@author	:  Laxman Nikam
 *@date		:  15-Feb-2018
 *@codeFor	:  Print lab result
 ***********/ 
function labResultPrint(callfrom) {
//alert("***"+callfrom);
	var labReqSlvId=0;
	var testmasterId=0;
	var treatmentId=0;
	var subSerId=0;
	subSerId=$.trim($('#subSerId').val());
	treatmentId=($("#treatmentId").html()).trim();
	testmasterId=($("#testmasterId").val()).trim();
	labReqSlvId=($("#labReqSlvId").val()).trim();
	//alert("****"+subSerId);
	if(callfrom == "indivprint"){
		setTimeout(function() {
			//Print individual lab Result PDF of Patient
			window.open(("doctorDeskLabResultPDF.jsp?"+"&subSerId="+subSerId+"&testmasterId="+testmasterId+"&treatmentId="+treatmentId+"&callfrom=" +encodeURIComponent(callfrom)));
		}, 300);
	}else if(callfrom == "labonclick"){
		setTimeout(function() {
			//Print labonclick lab Result PDF of Patient
			window.open(("doctorDeskLabResultPDF.jsp?"+"&testmasterId="+testmasterId+"&labReqSlvId="+labReqSlvId+"&treatmentId="+treatmentId+"&callfrom=" +encodeURIComponent(callfrom)));
		}, 300);
	}else{
		setTimeout(function() {
			//Print All lab Result PDF of Patient
			window.open(("doctorDeskViewLabResultPDF.jsp?"+"&treatmentId="+treatmentId+"&TechN=" +encodeURIComponent("withN")));
		}, 300);
	}
	return;
}


//Added by Laxman for IPD Coversheet Lab result PopUp. on 19-Feb-2018.
function IPDCoversheetTemp(){
	var temp = '<div class="modal-dialog">'
		+'<div class="modal-content col-md-12-1" style="width:108%; margin-top: 7%; margin-left: 4%;">'
			+'<div class="modal-header">'
				+'<h4 id="testHead" style="margin-top: -3px;"><i class="fa fa-fw"><img width="19px;" height="19px;" src="images/science-512.png" alt=""></i> Lab Test Results :'
				+'<button id="pDvBtn" class="btn btn-xs btn-warning" title="Print" onclick="ShowPrint(\'indivprint\')" style="margin-left: 75%;margin-right: 5px;display:none;"><i class="fa fa-print"></i></button>'
				+'<button id="pViewBtn" class="btn btn-xs btn-warning" title="Print" onclick="ShowPrint(\'viewprint\')" style="margin-left: 75%;margin-right: 5px;display:none;"><i class="fa fa-print"></i></button>'
				+'<button id="pDvBtnOnClick" class="btn btn-xs btn-warning" title="Print" onclick="ShowPrint(\'labonclick\')" style="margin-left: 75%;margin-right: 5px;display:none;"><i class="fa fa-print"></i></button>'
				+'<button class="btn btn-xs btn-danger" title="Close" type="button" onclick="closeLabPop()" style="margin-left: 78%;margin-right: 5px;"><i class="fa fa-times"></i></button>'
				+'</h4>'
			+'</div>'
			+'<div class="modal-body">'
				+'<div class="divide-20"></div>'
				+'<div class="col-sm-12-1">'
					+'<div id="postDt" class="col-sm-6-1 center">'
						+'<label class="TextFont col-md-3-1">Posted Date:</label><label id="postDate" class="TextFont col-md-3-1"></label></div>'
					+'<div id="postTm" class="col-sm-6-1 center"><label class="TextFont col-md-3-1">Posted Time:</label> <label id="postTime" class="TextFont col-md-3-1"></label>'
					+'</div></div>'
				+'<div class="divide-10"></div>'
				+'<div id="ratediv" class="col-sm-12-1">'
					+'<table class="table table-bordered" style="margin-top: 0px; width: 98.70%;">'
						+'<thead>'
							+'<tr style="font-size:10px;">'
								+'<th class="col-sm-1 center">#</th>'
								+'<th class="col-sm-5-1 center">Test Name</th>'
								+'<th class="col-sm-2-1 center">Test Result</th>'
								+'<th class="col-sm-2-1 center">Normal Values</th>'
								+'<th class="col-sm-2-1 center">Method</th>'
							+'</tr>'
						+'</thead>'
					+'</table>'
				+'</div>'
				+'<div id="testDivLab" class="col-md-12-1" style="width:100%; height: 300px; overflow-y: scroll; border: 1px solid #436a9d; margin-top: -21px; margin-bottom: 10px;"></div>'
			+'</div>'
		+'</div>'
+'</div>';
	
	$("#iPopupFormula").html(temp);
}

//Added by Laxman for IPD Coversheet Compare Lab result PopUp. on 22-Feb-2018.
function CompareTestResultTemp(){
	var temp = '<div class="modal-dialog">'
		+'<div class="modal-content col-md-12-1" style="width:108%; margin-top: 7%; margin-left: 4%;">'
			+'<div class="modal-header">'
				+'<h4 id="testHead" style="margin-top: -3px;"><i class="fa fa-fw"><img width="19px;" height="19px;" src="images/science-512.png" alt=""></i>Compare Lab Test Results :'
				+'<button class="btn btn-xs btn-danger" title="Close" type="button" onclick="closeComparePop()" style="margin-left: 70%;margin-right: 5px;"><i class="fa fa-times"></i></button>'
				+'</h4>'
			+'</div>'
			+'<div class="modal-body">'
				+'<div id="testDivCompareLab" class="col-md-12-1" style="height: 400px; max-height: auto;  overflow-x: scroll; overflow-y: scroll;">'
				+'<table id="labTestTable" class="table table-bordered table-condensed cf table-fixed"'
				+'style="font-size:10px; margin-bottom: 9px;  overflow-x: scroll; overflow-y: scroll; max-width: 1000%; table-layout:fixed;">'
					+'<thead  style="background-color: lightgray;" id="labTestHeader">'
					+'</thead>'
					+'<tbody class="table-striped"  id="labTestDiv">'
					+'</tbody>'
				+'</table>'
				+'</div>'
			+'</div>'
			+'</div>'
+'</div>';
	
	$("#iPopupCompare").html(temp);
}


/************
 *@author	:  Laxman Nikam
 *@date		:  22-Feb-2018
 *@codeFor	:  Compare Lab Test Result and show popUp In DoctorDesk Coversheet.
 ***********/ 
function showComparePopUp(callfrom){
	//set Template.
	CompareTestResultTemp();
	
	if(callfrom=="cmprbtn"){
		//Call Compare TestResult.
		CompareLabTestResult("cmprbtn");

		setTimeout(function() {
			$("#iPopupCompare").show();
			$("#testDivCompareLab").animate({ scrollTop: 0 }, "fast");
			$("#testDivCompareLab").animate({ scrollLeft: 0 }, "fast");
		}, 500);
		
		setTimeout(function() {
		$('#testDivCompareLab').find('input, text').attr("readonly", "readonly");
		$('#txtLabNote').attr("readonly", "readonly");
		//document.getElementById('btnSavelab').style.visibility = 'hidden';
		
		}, 500);
	}
}

/************
 *@author	:  TouHeeD KhaN
 *@date		:  18-Feb-2016
 *@codeFor	:  Hide popup
 ***********/ 
function closeComparePop(){
	$("#iPopupCompare").hide();
	$("#iPopupNursing").hide();
}

/************
 *@author	:  Laxman Nikam
 *@date		:  14-Feb-2018
 *@codeFor	:  view Lab Test Result of posted test.
 ***********/ 
function CompareLabTestResult(callfrom) {
	var tretId="";
	var PatientId="";
	if(callfrom=="cmprbtn"){
		
		 var valTypeNR = "n";
		 tretId = ($("#treatmentId").html()).trim();
		 PatientId = ($("#patientId").html()).trim();
		 var ag=$("#age").html();
		 var age=ag.split("Y")[0];
		 var gender =$("#sex").html();
		 
		 if (age > 15) {
			 if (gender == "Male") {
				 valTypeNR = "m";
			 } else if (gender == "Female") {
					valTypeNR = "f";
				}
			 
		 }else if (15 >= age && age >= 3) {
				valTypeNR = "c";
			} else if (age < 3) {
				valTypeNR = "n";
			}
	
	}
 
	var inputs = [];
	inputs.push('tretId=' + tretId);
	inputs.push('callfrom=' + callfrom);
	inputs.push('PatientId=' + PatientId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url 	: "ehat/doctordesk/compareLabTestResult",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			//alert("****"+JSON.stringify(r));
			ajaxResponse = r;
			testcount = 1;
			count = 1;
			protestcount = 1;
			pkgcount = 1;
			pkgprocount = 1;
			pkgprotestcount = 1;
			pkgtestcount = 1;
			procount = 1;
			totalcount = 1;
			$("#testDetails").html(ajaxResponse);
			var pobj1 = ajaxResponse;
			var postDtTm="";
			var pid ="";
			var count = 1;
			var cnt=1;
			
			// alert("pobj id ::"+pobj1.proLi[2][0].idlbpkg);
			console.log(pobj1);
			sr1=1;
			testcount1 = 1;
			count1 = 1;
			protestcount1 = 1;
			pkgcount1 = 1;
			pkgprocount1 = 1;
			pkgprotestcount1 = 1;
			pkgtestcount1 = 1;
			procount1 = 1;
			totalcount1 = 1;
			var TestHeader = "";
			var htm= "";
			
		// 2nd list inside main list(for profile)
		var basketItems =[];
		var dateArr=[];
		for(var pk=0;pk<pobj1.proLi[0].length;pk++){
			basketItems[pk]=pobj1.proLi[0][pk].subserviceid;
			dateArr[pk]=pobj1.proLi[0][pk].postDtTm;
		}
		basketItems = $.unique(basketItems);
		//dateArr=$.unique(dateArr);
		dateArr = dateArr.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
		
		TestHeader=TestHeader+'<tr><th style="width: 40px;">#</th>'
		+'<th colspan="2" style="width: 400px; text-align: center;">Test Name</th>'
		+'<th style="width: 150px;text-align: center;">Normal Values</th>';
	
			for(var k=0;k<dateArr.length;k++){
				postDtTm=new Date(dateArr[k]).toLocaleString();
				TestHeader = TestHeader + "<th style='height: 21.5px; width: 150px;text-align: center;font-weight:bold'>Test Result</th>";
			}
			TestHeader = TestHeader + "</tr>";
			$("#labTestHeader").html(TestHeader);
			
			//For No. of profile.
			for(var pk=0;pk<pobj1.proLi[0].length;pk++){
				//alert("----->>"+pobj1.proLi[0][pk].subserviceid);
				if(jQuery.inArray((pobj1.proLi[0][pk].subserviceid), basketItems) != -1) {
				    basketItems = jQuery.grep(basketItems, function(value) {
				    	  return value != (pobj1.proLi[0][pk].subserviceid);
				    	});
					
					/******************Start count/Profile Name*******************/
				    htm = htm + "<tr id='profileTrId"+cnt+"'>"
								+"<td style='height: 21.5px; width: 183px;text-align: center;font-weight:bold'>"+(cnt++)+"</td>"
								+"<td colspan='2' style='height: 21.5px; width: 300px;word-wrap:break-word ;text-align: left;font-weight:bold'>"+pobj1.proLi[0][pk].proNm+"</td>"
								+"<td style='height: 21.5px; width: 183px;text-align: center;'></td>"
								+"</tr>";
					/******************End count/Profile Name*******************/
					//$("#labTestDiv").append(trProData);
					
					//For No. of Test inside profile.
					for(var ts=0; ts<pobj1.proLi[0][pk].testli.length;ts++){
						
					if(pobj1.proLi[0][pk].testli[ts].tid!=0){
						 /**********start test normal values*****************/
						var testNorVal="";
						if(pobj1.proLi[0][pk].testli[ts].vt == "g"){
							testNorVal=pobj1.proLi[0][pk].testli[ts].tnvli[0].nvlv;
						}
						
						if (pobj1.proLi[0][pk].testli[ts].vt == "i"){

							if(pobj1.proLi[0][pk].testli[ts].tnvli.length>4){
								
								if(pobj1.proLi[0][pk].testli[ts].tnvli[4].oldandnew==1)               //for new records age vise.
								{		
								
								var a=pobj1.proLi[0][pk].testli[ts].tnvli[4].oldandnew;
							//	alert(a);
						        var k =pobj1.proLi[0][pk].testli[ts].tnvli[4].male;
			                  //  alert(k);
			                    testNorVal=(pobj1.proLi[0][pk].testli[ts].tnvli[4].nvlv)+" - "+(pobj1.proLi[0][pk].testli[ts].tnvli[4].nvuv)+(pobj1.proLi[0][pk].testli[ts].tnvli[4].unitnm);
			               		}else{
										if(valTypeNR !=""){
								// {#foreach $T.testli.tnvli as tnvli}
											for(var j=0; j<pobj1.proLi[0][pk].testli[ts].tnvli.length;j++){
												  if(valTypeNR ==pobj1.proLi[0][pk].testli[ts].tnvli[j].nvsx){ 
													  testNorVal=(pobj1.proLi[0][pk].testli[ts].tnvli[j].nvlv)+ " - "+(pobj1.proLi[0][pk].testli[ts].tnvli[j].nvuv)+(pobj1.proLi[0][pk].testli[ts].tnvli[j].unitnm);
												  }
											}
										}
			               		}
							}else{                                                                       //for old records age vise.
							
							if(valTypeNR !=""){
								for(var j=0; j<pobj1.proLi[0][pk].testli[ts].tnvli.length;j++){
								  if(valTypeNR ==pobj1.proLi[0][pk].testli[ts].tnvli[j].nvsx){ 
									  testNorVal=(pobj1.proLi[0][pk].testli[ts].tnvli[j].nvlv)+ " - "+(pobj1.proLi[0][pk].testli[ts].tnvli[j].nvuv)+(pobj1.proLi[0][pk].testli[ts].tnvli[j].unitnm);
								  }
								}
							}
						}
					}
						/******************Start Normal Values/TestResult*******************/
						htm =htm +"<tr id='testTrId"+count1+"'>"
						+"<td></td>"
						+"<td style='width:100px;'></td>"
						+"<td style='height: 21.5px; width: 200px;word-wrap:break-word; text-align: left;'>"+(pobj1.proLi[0][pk].testli[ts].tnm)+"</td>"
						+"<td style='height: 21.5px; width: 183px;text-align: center;'>"+testNorVal+"</td>";
						for(var p=0;p<dateArr.length;p++){
							htm = htm + "<td style='height: 21.5px; width: 183px;text-align: center;'>"
													+"<input id='"+dateArr[p]+"_"+pobj1.proLi[0][pk].testli[ts].tid+"_"+pobj1.proLi[0][pk].subserviceid+"' type='text' value='-' maxlength='100' style='width:100%;text-align: center;'/>"
													+"</td>";
							
						}
						//trTstData = trTstData + "</tr>";
						/******************End Normal Values/TestResult*******************/
						//$("#labTestDiv").append(html);
						count1++;
						htm = htm+"</tr>";
						/**********End test normal values*****************/
					} 
					}
				}
			}
			/******************Start For Date*******************/
			
			$("#labTestDiv").html(htm);
			
				for(var k=0;k<dateArr.length;k++){
					postDtTm=new Date(dateArr[k]).toLocaleString();
					$("#profileTrId1").append("<td style='height: 21.5px; width: 183px;text-align: center;font-weight:bold'>"+postDtTm+"</td>");
				}
				for(var kk=1;kk<=cnt;kk++){
					for(var k=0;k<dateArr.length;k++){
						$("#profileTrId"+(kk+1)).append("<td style='height: 21.5px; width: 183px;text-align: center;'></td>");
					}
				}
			/******************End For Date*******************/
			/******************Start For TestResult values*******************/
				for(var k=0;k<pobj1.proLi[0].length;k++){
					for(var ts=0; ts<pobj1.proLi[0][k].testli.length;ts++){
						$("#"+pobj1.proLi[0][k].postDtTm+"_"+pobj1.proLi[0][k].testli[ts].tid+"_"+pobj1.proLi[0][k].subserviceid).val(pobj1.proLi[0][k].testli[ts].tstRe);
					}

				}
			/******************End For TestResult values*******************/
		}
	});
}

/************
 *@author	:  Laxman Nikam
 *@date		:  26-Feb-2018
 *@codeFor	:  viewLabTestResult in DoctorDesk on Single Click.
 ***********/ 
function setLabTestId1(count,postDate){ 
	//alert(testmaster+"****"+labReqSlvId+"****"+postDate);
	
	var postDtTm=new Date(postDate).toLocaleString();
	var postDt=postDtTm.split(",")[0];
	var postTm=postDtTm.split(" ")[1];
	
	if(postDtTm == "null"){
		postDt=" ";
		postTm=" ";
	}
	$("#testmasterId").val($("#labReqMstId"+count).val());
	$("#labReqSlvId").val($("#labReqSlvId"+count).val());
	$('#postDate').html(postDt);
	$('#postTime').html(postTm);
	$('#subSerId').val($("#subSerId"+count).val());
	$('#isPackageFlag').val($("#isPackageFlag"+count).val());
	//call viewLabResultDoctorDesk.
	showPopUpTestResult("labonclick");
}

function printPrescriptionNewOpd(paramPopupOrPrint,callFrom2) {
	callFrom = $("#pageType").val();
	callFrom1 = $("#callFrom").val();
	hideSummaryPostPopupNew();
	 if (paramPopupOrPrint == "PRINT") {
		var editorContent="null";
			
		
		var pid = parseInt($('#patientId').html());
		var tid = parseInt($('#treatmentId').html());
		
		var pid1 = $.trim($("#pid1").html());
		var tid1 = $.trim($("#tid1").html());
		
		
		if(pid1 != "" || tid1 != ""){
			callFrom = "previousTreatmentOPDER";
		}
		
		var instructionLanguage = $(
				"input[name='prepInstructionPopup1']:checked").val();
		
	//"input[name='prepInstructionPopup']:checked").val();
		var pageSize = $(
		"input[name='prepInstructionPaperSizePopup']:checked").val();
		var vaccinationFlagCheckboxPrint = $(
				"input[name='vaccinationFlagCheckboxPrint']:checked").val();

		
		setTimeout(
				function() {

					/*$("#iPrintBill").hide();*/
					
					$("#iPrintBill").hide();
					
					if(callFrom2=="NR"){
						window.open("OPDPrescriptionPrint.jsp?"+"patID=" +
								encodeURIComponent(pid) + "&treatID=" + encodeURIComponent(tid)+"&editorContent="+encodeURIComponent(editorContent)+"&instructionLanguage="+encodeURIComponent(instructionLanguage));	
					}else{
						window.open("OPDPrescriptionPrintEhatnew.jsp?"+"patID=" +
								encodeURIComponent(pid) + "&treatID=" + encodeURIComponent(tid)+"&instructionLanguage="+encodeURIComponent(instructionLanguage) +"&call="+callFrom2);
						
					}
					
				//location.reload();
					}, 300);
		
	} else if (paramPopupOrPrint == "HIDE_POPUP_PRINT") {
		$("#iPrintBill").hide();
	}
	 
}

//added by kishor for show Ipd nursing chart on popup
function showPopUpVitals(){
//alert("3020");
NursingTestResultTemp();
	
		setTimeout(function() {
			$("#iPopupNursing").show();
			 var todays_date = $("#date").html();
				var arrDate = todays_date.split("-");
				var date = arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2];
				$("#date-pick").val(date);
				
			$("#testDivCompareLab").animate({ scrollTop: 0 }, "fast");
			$("#testDivCompareLab").animate({ scrollLeft: 0 }, "fast");
		}, 500);
		
		setTimeout(function() {
		$('#testDivCompareLab').find('input, text').attr("readonly", "readonly");
		$('#txtLabNote').attr("readonly", "readonly");
		
		}, 500);
		var todays_date = $("#date").html();
		var arrDate = todays_date.split("-");
		var date = arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2];
		$("#date-pick").val(date);
		setDefaultViewChartSlaveNew();
		setDefaultChartNames();
}

//Added by Kishor for IPD Coversheet Compare Lab result PopUp. on 10-April-2018.
function NursingTestResultTemp(){
	var temp = '<div class="modal-dialog">'
		+'<div class="modal-content col-md-12-1" style="width:114%; margin-top: 7%; margin-left: -4%;">'
			+'<div class="modal-header">'
				+'<h4 id="testHead" style="margin-top: -3px;"><i class="fa fa-fw"><img width="19px;" height="19px;" src="images/science-512.png" alt=""></i>IPD Nursing Chart :'
				+'<button class="btn btn-xs btn-danger" title="Close" type="button" onclick="closeComparePop()" style="margin-left: 70%;margin-right: 5px;"><i class="fa fa-times"></i></button>'
				+'</h4>'
			+'</div>'			
			
			+'<ul class="nav nav-tabs"> '
			+'  <li class="active"><a data-toggle="tab" href="#IPD_Nursing_Chart">Data View</a></li> '
			+'  <li><a data-toggle="tab" href="#graph_view">Graph View</a></li> '		
			+'</ul> '
			
			+'<div class="tab-content"> '
			+'<div id="IPD_Nursing_Chart" class="tab-pane fade in active">'

			+'	<div class="divide-20"></div>'
			
			+'	<div class="form-group Remove-Padding col-md-3-1" '
			+'		style="padding-left: 10px;"> '
			+'		<label class="TextFont col-md-4-1">Select Date:</label> <input'
			+'		id="date-pick" name="date-pick"'
			+'		onclick="displayCalendar(document.getElementById(\'date-pick\'),\'dd/mm/yyyy\',this)"'
			+'		class="form-control input-SmallText col-md-6-1"'
			+'		readonly="readonly"'
			+'		onchange="setDefaultViewChartSlaveNew(),setDefaultChartNames()" />'			
			+'	</div>'

			+'<div class="form-group Remove-Padding col-md-4-1">'
			+'<label class="TextFont col-md-4-1">Select Chart'
			+'	Type:</label> <select id="cType" name="cType"'
			+'	class="form-control input-SmallText TextFont col-md-6-1"'
			+'	onclick="setDefaultViewChartSlaveNew(),setDefaultChartNames()">'
			/*+'	<option value="Select">-Select-</option>'
			+'	<option selected="selected" value="NursingChart">Nursing'
			+'		Chart</option>'
			+'	<option value="4">INPUT</option>'
			+'	<option value="2">Intensivist</option>'
			+'	<option value="5">OUTPUT</option>'
			+'	<option value="1">Post Operation</option>'*/
			
			+'	<option value="3">VITALS</option>'
			+'	</select> <input type="hidden" id="idcTypeMast" value="0"'
			+'		name="idcTypeMast" />'
			+'</div>'
			
			/*+'<div class="form-group Remove-Padding col-md-4-1">'
			+'<a onclick="setDefaultViewChartSlaveNew(3),setTempRecordGraph(\'Temp\');" href="#Monitoring_Graph" data-toggle="tab">Graph </a>' 
			+'</div>'*/
			
			+'<div class="form-group Remove-Padding col-md-2-1" id="save1"'
			+'style="margin-top: -19px;display: none;" >'
			+'<input type="button" onclick="saveDIC()" class="btn btn-xs btn-success editUserAccess" id="saveButton"'
			+'	value="Save" disabled="disabled"/>'
			+'</div>'

			+'<div class="form-group Remove-Padding col-md-1-1"'
			+'style="margin-top: -20px;">'
			+'<input type="button" onclick="toCreateDiv(\'RowCount\')"'
			+'	value="+" id="addDiv" class="editUserAccess" disabled="disabled"/> <input type="button"'
			+'	onclick="toRemoveDivDIC(\'RowCount\')" value="-"'
			+'	id="remDiv" class="editUserAccess" disabled="disabled"/>'
			+'</div>'			

			+'<div class="divide-10"></div>'
			+'<div class="divide-10"></div>'

			+'<div id="IPD_DICContent">'
			+'<div id="chartAddTempNew"></div>'
			+'</div>'
   
			+'<div id="chartSlaveTemp"'
			+'style="padding-top: 0%; height: 50%;display: none;">'
			+'<div id="times" class="col-sm-12-1"'
			+'	style="height: 400px; max-height: auto; overflow-x: auto">'
			+'	<table'
			+'		class="table table-bordered table-striped table-condensed cf table-fixed"'
			+'		style="width: 300%; max-width: 800%;">'
			+'		<thead>'
			+'			<tr>'
			+'				<th class="TextFont center" style="width: 30px;">Sr</th>'
			+'				<th class="TextFont center" style="width: 270px;">Name</th>'
			+'				<th class="TextFont center" style="width: 100px;">8'
			+'					am</th>'
			+'				<th class="TextFont center" style="width: 100px;">9'
			+'					am</th>'
			+'				<th class="TextFont center" style="width: 100px;">10'
			+'					am</th>'
			+'				<th class="TextFont center" style="width: 100px;">11'
			+'					am</th>'
			+'				<th class="TextFont center" style="width: 100px;">12'
			+'					pm</th>'
			+'				<th class="TextFont center" style="width: 100px;">1'
			+'					pm</th>'
			+'				<th class="TextFont center" style="width: 100px;">2'
			+'					pm</th>'
			+'				<th class="TextFont center" style="width: 100px;">3'
			+'					pm</th>'
			+'				<th class="TextFont center" style="width: 100px;">4'
			+'					pm</th>'
			+'				<th class="TextFont center" style="width: 100px;">5'
			+'					pm</th>'
			+'				<th class="TextFont center" style="width: 100px;">6'
			+'					pm</th>'
			+'				<th class="TextFont center" style="width: 100px;">7'
			+'					pm</th>'
			+'				<th class="TextFont center" style="width: 100px;">8'
			+'					pm</th>'
			+'				<th class="TextFont center" style="width: 100px;">9'
			+'					pm</th>'
			+'				<th class="TextFont center" style="width: 100px;">10'
			+'					pm</th>'
			+'				<th class="TextFont center" style="width: 100px;">11'
			+'					pm</th>'
			+'				<th class="TextFont center" style="width: 100px;">12'
			+'					am</th>'
			+'				<th class="TextFont center" style="width: 100px;">1'
			+'					am</th>'
			+'				<th class="TextFont center" style="width: 100px;">2'
			+'					am</th>'
			+'				<th class="TextFont center" style="width: 100px;">3'
			+'					am</th>'
			+'				<th class="TextFont center" style="width: 100px;">4'
			+'					am</th>'
			+'				<th class="TextFont center" style="width: 100px;">5'
			+'					am</th>'
			+'				<th class="TextFont center" style="width: 100px;">6'
			+'					am</th>'
			+'				<th class="TextFont center" style="width: 100px;">7'
			+'					am</th>'
			+'			</tr>'
			+'		</thead>'
			+'		<tbody id="vitalsbody">'
			+'		</tbody>'
			
			+'		</table>'
			+'</div>'

			+'<div id="chartAddTemp" class="col-md-12-1"'
			+'	style="margin: 0px;"></div>'

			+'<input type="hidden" value="0" id="addRowCount" /> <input'
			+'	type="hidden" value="0" id="RowCount" />'
			+'</div>'

			+'</div>'			
			
			+'<div id="graph_view" class="tab-pane fade"> '
		   
			+'<div id="Monitoring_Graph"> '			
			+'		<div class="modal-content"> ' 			
			+'				<div class="modal-body" id="tempModalGraph" style="margin-bottom: -5%;"> '			
			+'					<div style="margin-top: 0px; margin-left: 10px;" class="tabbable tabs-left col-md-12-1"> '
			+'						<ul style="height: 150px;" class="nav nav-tabs" id="ipdMonitoringSheetVerticalTab"> '
			+'							<li><a onclick="setDefaultViewChartSlaveNew(3),setTempRecordGraph(\'Temp\');" href="#Monitoring_Graph" data-toggle="tab">Temp Graph </a></li> '
			+'							<li><a onclick="setDefaultViewChartSlaveNew(3),setTempRecordGraph(\'Pulse\');" href="#Monitoring_Graph" data-toggle="tab">Pulse Graph </a></li> '
			+'							<li><a onclick="setDefaultViewChartSlaveNew(3),setTempRecordGraphForBp(\'Bp\');" href="#Monitoring_Graph" data-toggle="tab">Bp Graph </a></li> '
			+'							<li><a onclick="setDefaultViewChartSlaveNew(3),setTempRecordGraph(\'Spo\');" href="#Monitoring_Graph" data-toggle="tab">Spo Graph </a></li> '
			+'						</ul> '
			+' 						<div style="margin-top: 15px;" class="tab-content col-md-10-1"> '
			+'							<div class="tab-pane fade in active col-md-12" id="Monitoring_Graph"> '		
			+'							<div id="tempratureContainer" style="height: 300px; width: 80%"></div> '		
			+' 						</div> '
			+' 					</div> '	
			+'				</div>	'						
			+'			</div> '
			+'		</div> '
			+'</div> '
			
		    +'</div> '
		    +'</div> '
			
			
			
+'</div>';
	
	$("#iPopupNursing").html(temp);
	$("#save").hide();

}

function printPrepDataOPD(){
	$("#iPrintBillNewOPD").show();
}


function fetchLabTestOnDashBoard2(){

	var t = $("#treatmentId").text();
	jQuery.ajax({
		async : false,
		type : "POST",
		
		data : {
			"treatmentId" : t,
			"serviceId" : 0
		},
		url : "ehat/opdServicesAdvised/getPatientSubServiceDetailsOnIPD",
		success : function(r) {
			

			$("#coverSheetLabDashBoard").html("");
			var htm = "";
			var rowCount = 0;
			
			var labData=[];
		if (r.listSubServiceIpdDto.length > 0) {
				
				for ( var i = 0; i < r.listSubServiceIpdDto.length; i++) {

							if(r.listSubServiceIpdDto[i].serviceId ==11    ||  r.listSubServiceIpdDto[i].serviceId ==13 && r.listSubServiceIpdDto[i].serviceId !=12 ){
						
							
							
							if(r.listSubServiceIpdDto[i].sndtolabflag.trim() == "Y"){
								
								
								labData.push(r.listSubServiceIpdDto[i]);
								
								//htm = htm 	+ '<td class="col-md-4-1 TextFont" style="background-color:#a8bc7b"> <a onclick=getOPDIPDLabtestResult('+r.listSubServiceIpdDto[i].billDetailsId+')>'+r.listSubServiceIpdDto[i].categoryName+'</a> </td>'
							}
						
						}
					
				}
				getOPDIPDLabtestResult2(labData);
				
			}
		
			
		
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});

	
	
}

function getOPDIPDLabtestResult2(pobj1){
	
	
	var unitId=$("#unitId").val();
	var treatmentId = $("#tr_Id").val();
	var patientAge=0;
	var ageIn=0;
	var sexType=0;
	var sex = $("#sex").text();
	var age = $("#age").text();
	  var ageArray=  age.split("/");
	  var yearData=ageArray[0];
	  var year = yearData.replace(/\D/g, '');
	  var monthData=ageArray[1];
	  var month = monthData.replace(/\D/g, '');
	  var daysData=ageArray[2];
	  var days = daysData.replace(/\D/g, '');
	  if(year > 0){
		  patientAge=year;
		  ageIn=1;
	  }else if(year == 0 && month > 0){
		  patientAge=month;
		  ageIn=2;
	  }else {
		  patientAge=days;
		  ageIn=3;
	  }
	  
	  if(sex.trim() == "Male" ){
		  sexType=1;
	  }else if(sex.trim() == "Female"){
		  sexType=2;
	  }
	  var html = "";
	  ajaxResponse = pobj1;
		testcount = 1;
		count = 1;
		protestcount = 1;
		pkgcount = 1;
		pkgprocount = 1;
		pkgprotestcount = 1;
		pkgtestcount = 1;
		procount = 1;
		totalcount = 1;
		$("#testDetails").html(ajaxResponse);
		//var pobj1 = ajaxResponse;
		var pid ="";
		var count = 1;
		
		// alert("pobj id ::"+pobj1.proLi[2][0].idlbpkg);
		//console.log(pobj1);
		
		sr1=1;
		testcount1 = 1;
		count1 = 1;
		protestcount1 = 1;
		pkgcount1 = 1;
		pkgprocount1 = 1;
		pkgprotestcount1 = 1;
		pkgtestcount1 = 1;
		procount1 = 1;
		totalcount1 = 1;
 for(var pk=0;pk<pobj1.length;pk++){ 
	  
	var inputs = [];
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('billDetailsId=' +pobj1[pk].billDetailsId);
	inputs.push('age=' + patientAge);
	inputs.push('ageIn=' + ageIn);
	inputs.push('sexType=' + sexType);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdCoverSheetLab/getOPDIPDLabtestResult",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#labTestResultBody").html(" ");
			var temp="";
			var count=1;
			if(r.lstOPDIPDLabtestresult.length > 0){
				

				

				$("#coverSheetLabDashBoard").html("");
				
				var rowCount = 0;
				
				//var labData=[];
			
			
				//alert("****"+JSON.stringify(r));
				
				
			
				//var htm= "";
				
				//For nursing station pop up.
			/*if(pobj1.proLi[0].length==0 && pobj1.proLi[1].length==0 && pobj1.proLi[2].length==0){
					setTimeout(function() {
						$("#iPopupFormula").hide();
					}, 500);
					alert("Test result are not posted...!!!");
					return false;
				}*/
				
			//for(var pk=0;pk<ajaxResponse.length;pk++){}// for main list proLi[2]
			
			// 2nd list inside main list
			
			//for(var pk=0;pk<pobj1.length;pk++){
					html = html+"<div class='col-md-12-1'";
					html = html+"style='border-top: 1px solid #ddd; margin-top: -1px;'>";
					html = html+"<div class='divide-10'></div>";
					html = html+"<div class='col-md-1-1'";
					html = html+"style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'>"+(sr1++);
					html = html+"</div>";
					var postDtTm=new Date(r.lstOPDIPDLabtestresult[0].postdate).toLocaleString();
					html = html+"<div class='col-md-11-1'";
					html = html+"style='height: 28px; padding-left: 1%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;left;font-weight: bold;'";
					html = html+"id='proDiv"+(procount1)+"'>"+pobj1[pk].categoryName+"   [ "+(pobj1[pk].docName).toUpperCase()+" : "+postDtTm+" ]";
//					if(pobj1.proLi[0][pk].pkgNm!="-" && pobj1.proLi[0][pk].pkgNm!=null && pobj1.proLi[0][pk].pkgNm!=""){
//						html = html+" - ("+pobj1.proLi[0][pk].pkgNm+")</div>";
//					}else{
						html = html+"</div>";
//					}
					html = html+"<input type='hidden' value='p' id='type"+(testcount1)+"' />";
					html = html+"</div>";
					
					// {#foreach $T.proLi.testli as testli}
					//r.lstOPDIPDLabtestresult.length > 0	
				for(var ts=0; ts<r.lstOPDIPDLabtestresult.length;ts++){
						
					if(r.lstOPDIPDLabtestresult.length>0){
						
						html = html+"<div class='col-md-12-1'";
						html = html+"style='margin-top: -11px;'";
						html = html+"id='testDiv"+(r.lstOPDIPDLabtestresult[ts].profileId)+"'>";
						html = html+"<div class='divide-20'></div>";
						html = html+"<input type='hidden' value='pt' id='type"+(procount1)+"' />";
						html = html+"<div class='col-md-2-1'";
						html = html+"style='height: 28px; padding-left: 1%; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'></div>";
						html = html+"<div class='col-md-4-1'";
						html = html+"style='height: 28px; padding-left: 2%; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd; padding-top: 2px; text-align: left;'";
						html = html+"id='testNM"+(procount1)+(protestcount1)+"'>"+(r.lstOPDIPDLabtestresult[ts].testName);
						html = html+"<input type='hidden' value='"+(r.lstOPDIPDLabtestresult[ts].normalValue)+"' id='nameOfTest"+(count1)+"' />";
						html = html+"<input type='hidden' value='"+(r.lstOPDIPDLabtestresult[ts].testResult)+"' id='formulaForTest"+count1+"' />";
						html = html+"</div>";
						
						/*if(pobj1.proLi[0][pk].testli[ts].tstRe==undefined){
							pobj1.proLi[0][pk].testli[ts].tstRe="";
						}*/
						var rowNum = count1;

						//Added by Laxman on 01-Feb-2018.
//						html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].serviceid)+"' id='serviceId"+(count1)+"' />";
//						html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].subserviceid)+"' id='subserviceId"+(count1)+"' />";
//						html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].labreqid)+"' id='labreqId"+(count1)+"' />";
//						html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].labreqslvid)+"' id='labreqslvId"+(count1)+"' />";
//						html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].testli[ts].ndgnrl)+"' id='narrationId"+(count1)+"' />";
//						html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].testli[ts].idTstRe)+"' id='idResultTest"+(count1)+"' />";
//						html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].testli[ts].tid)+"' id='idOfTest"+(count1)+"' />";
//						html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].testli[ts].vt)+"' id='isTemplate"+(count1)+"' />";
						
						/*	if(pobj1.proLi[0][pk].testli[ts].vt == "t"){//for template

						html = html+"<div class='col-md-2-1'";
						html = html+"style='height: 28px; border-bottom: 1px solid #ddd; text-align: left; padding-left: 1%; padding-right: 1%; border-right: 1px solid #ddd; padding-top: 2px;'";
						html = html+"id='testRE"+(procount1)+(protestcount1)+"'>";
						html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].testli[ts].idTstRe)+"' id='idTempResultTest"+(count1)+"' />";
						html = html+"<input type='hidden' value='"+(pobj1.proLi[0][pk].testli[ts].tid)+"' id='idOfTempTest"+(count1)+"' />";

							html = html+"<input	type='button' value='"+(pobj1.proLi[0][pk].testli[ts].tnm)+"' id='tempTestValue"+count1+"' onClick=viewTemplateForLabTest("+count1+"); maxlength='12' style='width: 100%;' /></div>";
							//$("#iTestTemplateName").val(pobj1.proLi[0][pk].testli[ts].tnm);
							$("#iImpression").val(pobj1.proLi[0][pk].testli[ts].impressions);
							CKEDITOR.instances['iEditorTestTemplate'].setData((pobj1.proLi[0][pk].testli[ts].testTemplate));
							
							$("#idlabtest").val(pobj1.proLi[0][pk].testli[ts].tid);
							$("#hTestTemplateName").val(pobj1.proLi[0][pk].testli[ts].tnm);
							$("#hTestTemplate").val(pobj1.proLi[0][pk].testli[ts].testTemplate);
							$("#hImpression").val(pobj1.proLi[0][pk].testli[ts].impressions);
							$("#hID").val(count1);
							count1++;
							}else{*/

						html = html+"<div class='col-md-2-1'";
						html = html+"style='height: 28px; border-bottom: 1px solid #ddd; text-align: left; padding-left: 1%; padding-right: 1%; border-right: 1px solid #ddd; padding-top: 2px;'";
						html = html+"id='testRE"+(procount1)+(protestcount1)+"'>";
						
						html = html+"<input	type='text' value='"+(r.lstOPDIPDLabtestresult[ts].testResult)+"' onfocus='setFormulaToTestResult("+count1+")' id='testvalue"+(count1++)+"' maxlength='100' style='width: 100%;'/></div>";
						
						
						//}
						html = html+"<div class='col-md-2-1'";
						html = html+"style='height: 28px; border-bottom: 1px solid #ddd; padding-left: 1%; border-right: 1px solid #ddd; padding-top: 2px;text-align: center;'";
						html = html+"id='testNR"+(procount1)+(protestcount1)+"'>";
						
						html = html
						+ (r.lstOPDIPDLabtestresult[ts].normalValue);
						
						/******end********lab*newindividual***@author:paras* for profile*****************/	
						html = html+"</div>";
						
						
						html = html+"<div id='testMethod"+(procount1)+(protestcount1)+"' class='col-md-2-1'";
						html = html+"style='height: 28px; border-bottom: 1px solid #ddd; padding-top: 2px;' title='"+r.lstOPDIPDLabtestresult[ts].methodname+"'>";
						if(r.lstOPDIPDLabtestresult[ts].methodname.length > 25){
						html = html+(r.lstOPDIPDLabtestresult[ts].methodname.substring(0, 25))+"...";
						}else{
							html = html+(r.lstOPDIPDLabtestresult[ts].methodname);
						}
						//Added by Laxman on for edit btnClass narration 07-Feb-2018.
						var btnClass="btn-success";
						/*if(pobj1.proLi[0][pk].testli[ts].ndgnrl!=undefined && pobj1.proLi[0][pk].testli[ts].ndgnrl!="" && pobj1.proLi[0][pk].testli[ts].ndgnrl!="undefined" && pobj1.proLi[0][pk].testli[ts].ndgnrl!="-"){
							btnClass="btn-danger";
						}*/
						//for popup to type value
						html = html+"<button id='btnInsert"+(r.lstOPDIPDLabtestresult[ts].testName)+(rowNum)+"' class='btn btn-xs "+btnClass+"' value='' name='btnInsert' onclick='openEditorForResult("+(r.lstOPDIPDLabtestresult[ts].testName)+","+(r.lstOPDIPDLabtestresult[ts].testName)+","+(rowNum)+",\"prots\")' title='Type Result'  style='float:right'>";
						//html = html+"<i class='fa fa-eye View'></i> </button>";
						//if(callfrom == "labindiv"  || callfrom == "viewbtn"){
							html = html+"<i class='fa fa-eye View'></i> </button>";
						/*}else{
							html = html+"<i class='fa fa-edit'></i> </button>";
						}*/
						//for popup to type value
						html = html+"</div>";
						
						html = html+"</div>";
						
						html = html+"<input type='hidden' value='"+(protestcount1++)+"' />";
						
					}
					
					}
					
				//	html = html+"<input type='hidden' value='"+(protestcount1++)+"' id='reportproTestCount"+(procount1)+"' />";
				//	html = html+"<input type='hidden' value='"+(procount1++)+"' />";
							
				//}
				//	html = html+"<input type='hidden' value='"+(procount1)+"' id='reportproCount' />";
			
					
				/*		
					html = html+"</div>";
					
					html = html+"<div id='testMethod{count}' class='col-md-2-1'";
					html = html+"style='height: 28px; border-top: 1px solid #ddd;  text-align: left; padding-top: 2px;'>";
					html = html+(pobj1.proLi[1][pk].tmethd);
					
					//var tst ="ts";
					
					//if(pobj1.proLi[1][pk].vt == "g"){
						
						html = html+"<button id='btnInsert"+(pobj1.proLi[1][pk].tid)+(rowNum)+"' class='btn btn-xs btn-success' value='' name='btnInsert' onclick='openEditorForResult("+(pobj1.proLi[1][pk].idTstRe)+","+(pobj1.proLi[1][pk].tid)+","+(rowNum)+",\"ts\")' title='Type Result'  style='float:right'>";
						html = html+"<i class='fa fa-eye View'></i> </button>";
						if(callfrom == "labindiv"  || callfrom == "viewbtn"){
							html = html+"<i class='fa fa-eye View'></i> </button>";
						}else{
							html = html+"<i class='fa fa-edit'></i> </button>";
						}
					//}
				
					html = html+"</div>";
					
					html = html+"<div id='testNote"+(count1)+"' style='display: none;'>"+(pobj1.proLi[1][pk].tnote)+"</div>";
					html = html+"<div id='testClinicaluse"+(count1)+"' style='display: none;'>"+(pobj1.proLi[1][pk].tcliuse)+"</div>";
					html = html+"<div id='testIncreasedlevel"+(count1)+"' style='display: none;'>";
					html = html+(pobj1.proLi[1][pk].tinrl)+"</div>";
					html = html+"<div id='testInterpretation"+(count1)+"' style='display: none;'>"+(pobj1.proLi[1][pk].tinter);
					html = html+"</div>";
					html = html+"<div id='testComments"+(count1++)+"' style='display: none;'>"+(pobj1.proLi[1][pk].tcommnt);
					html = html+"</div>";
					
					html = html+"</div>";
					
				}
					html = html+"<input type='hidden' value='"+(--count1)+"' id='reportTestCount' />";
			
				$("#testDivLab").html(html);*/
			
			
				
			}
			
			//$("#labResultModal").show();
			}
		});
 }
 $("#testDivLab").html(html);
}
