
function saveOPDHistoryIPD(){
	
var historyId=$("#historyMasterId").val();

//	var historyId=0;
	
	var treatmentId=$("#tr_Id").val();
	
	var patientId=$("#pt_Id").val();
	
	var templateId=$("#selCustomizeTemp").val();
	//templateId=0;
	
	var templateName=$("#selCustomizeTemp option:selected" ).text();
	
	var medicalOfficerName=$("#medOffName").val();
	
	var mrnNo=$("#mrn").val();
	
	
	var chiefComplaintss=$("#chiefComplaintsTxt").val();
	
	var negativeHistory=$("#clinicalFinding").val();
	
	var dmFlag="N";
	if($('#chkDm').is(':checked')){ 
		dmFlag="Y";
	} 
	var dmDuration=$("#txtDm").val();
	
	
	var htnFlag="N";
	if($('#chkHtn').is(':checked')){ 
		htnFlag="Y";
	} 
	
	var htnDuration=$("#txtHtn").val();
	
	var ihdFlag="N";
	
	
	if($('#chkIhd').is(':checked')){ 
		ihdFlag="Y";
	} 
	
	var ihdDuration=$("#txtIhd").val();
	
	var bacopdFlag="N";
	
	if($('#chkBaco').is(':checked')){ 
		bacopdFlag="Y";
	} 
	
	var bacopdDuration=$("#txtBaco").val();
	
	var otherFlag="N";
	
	if($('#chkOther').is(':checked')){ 
		otherFlag="Y";
	} 
	
	var otherDuration=$("#txtOther").val();
	
	var pastSurgicalHistory=$("#pastSurgHistory").val();
	
	var medications=$("#medications").val();
	
	var obsHistory=$("#gynac").val();
	
	var anyAllergy=$("#drugReaction").val();
	
	var familyHistory=$("#familyHis").val();
	
	var personalHistory=$("#perHistory").val();
	
	var temperature=$("#temparature").val();
	var aa=/[^a-zA-Z0-9]/.test( temperature );
    
	   if(aa==true){
		   alert("Teamperature Should Not Accept Special Symbol..");
		   return false;
	   }
	
	var pallor=$("#pallor").val();
	
	var icterus=$("#lcterus").val();
	
	var pulse=$("#pulse").val();
	
	var clubbing=$("#clubbing").val();
	
	var oedema=$("#oedema").val();
	
	var bp=$("#bp").val();
	
	var lymphAdenopathy=$("#lymph").val();
	
	var cvs=$("#cvs").val();
	
	var rs=$("#rs").val();
	
	var pa=$("#pa").val();
	
	var cns=$("#cns").val();
	
	var localExamination=$("#localExm").val();
	
	var investigationReport=$("#invsRep").val();
	
	var historySlaveList = {
			getListOfHistorySlaveDTO : []
		};
	
var rows = $('#historyTable1 tbody tr.newRowHistoryRow').length;

 
	
	for ( var i = 1; i <= rows; i++) {
		var historySalveId = $("#historySlaveId" + i).val();
		

		var chiefComplaints = $("#chiefComp" + i).val();
		var duration = $("#qty" + i).val();
		var durationType = $("#day_month_year" + i).val();
		
		
		if(chiefComplaints.trim() === ""){
			alert("Cheif Complaints Must Be Filled Out");
			return false;
		}
		if(duration.trim() == ""){
			alert("Please Select Duration Quantity");
			return false;
		}
		
		if(durationType.trim() == ""){
			alert("Please Select Duration");
			return false;
		}
		

		setHistorySlavefoInfoList(historySlaveList, historySalveId,
				chiefComplaints, duration, durationType);
	}
	
	historySlaveList = JSON.stringify(historySlaveList);
	
	
var inputs = [];
	
	inputs.push('historyId=' + historyId);
	
	
	inputs.push('templateId=' + templateId);
	
	inputs.push('templateName=' + templateName);
	
	inputs.push('medicalOfficerName=' + medicalOfficerName);
	
	inputs.push('mrnNo=' + mrnNo);
	
	inputs.push('chiefComplaints=' + chiefComplaintss);
	
	inputs.push('negativeHistory=' + negativeHistory);
	
	inputs.push('dmFlag=' + dmFlag);
	
	inputs.push('dmDuration=' + dmDuration);
	
	inputs.push('htnFlag=' + htnFlag);
	
	inputs.push('htnDuration=' + htnDuration);
	
	inputs.push('ihdFlag=' + ihdFlag);
	
	inputs.push('ihdDuration=' + ihdDuration);
	
	inputs.push('bacopdFlag=' + bacopdFlag);
	
	inputs.push('bacopdDuration=' + bacopdDuration);
	
	inputs.push('otherFlag=' + otherFlag);
	
	inputs.push('otherDuration=' + otherDuration);
	
	inputs.push('pastSurgicalHistory=' + pastSurgicalHistory);
	
	inputs.push('medications=' + medications);
	
	inputs.push('obsHistory=' + obsHistory);
	
	inputs.push('anyAllergy=' + anyAllergy);
	
	inputs.push('familyHistory=' + familyHistory);
	
	inputs.push('personalHistory=' + personalHistory);
	
	inputs.push('temperature=' + temperature);
	
	inputs.push('pallor=' + pallor);
	
	inputs.push('icterus=' + icterus);
	
	inputs.push('pulse=' + pulse);
	
	inputs.push('clubbing=' + clubbing);
	
	inputs.push('oedema=' + oedema);
	
	inputs.push('bp=' + bp);
	
	inputs.push('lymphAdenopathy=' + lymphAdenopathy);
	
	inputs.push('cvs=' + cvs);
	

	
	inputs.push('rs=' + rs);
	
	inputs.push('pa=' + pa);
	
	inputs.push('cns=' + cns);
	
	inputs.push('localExamination=' + localExamination);
	
	inputs.push('investigationReport=' + investigationReport);
	
	inputs.push("historySlaveList="	+ encodeURIComponent(historySlaveList));
	
inputs.push('patientId=' + patientId);
	
	inputs.push('treatmentId=' + treatmentId);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdhistory/saveOPDHistory",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
				//refreshHistoryData();
				getOPDPatientHistoryByTreatment();
			}else if(r==2) {
				alert("Record Updated Successfully");
				//refreshHistoryData();
				getOPDPatientHistoryByTreatment();
			}
			else {
				alert("Network Issue..");
			}

			
			

		}
	});
	
	
}