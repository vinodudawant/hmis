function forwordPageAuthorizedRoutineValueTemplateWiseForOutSource(masterid,treatmentId,patientId,sampleTypeId,profileId){
	var CovidReportProfileId= $("#CovidReportProfileId").val();
	var SARSCOV2ANTIGEN= $("#SARSCOV2ANTIGEN").val();
	var COVID19RNAAMPLIFICATION= $("#COVID19RNAAMPLIFICATION").val();
	var REALTIMEHEPATITISCVIRUSHCV= $("#REALTIMEHEPATITISCVIRUSHCV").val();
	var REALTIMETRUENAT= $("#REALTIMETRUENAT").val();
	
	if(CovidReportProfileId==profileId || SARSCOV2ANTIGEN== profileId || COVID19RNAAMPLIFICATION == profileId || REALTIMEHEPATITISCVIRUSHCV == profileId || REALTIMETRUENAT == profileId)		{
		window.location.href = "pathology_authorization_routineResult.jsp?masterid=" + masterid+"&treatmentId="+treatmentId+"&sampleTypeId=" + sampleTypeId+"&profileId=" + profileId;
	}else{
		window.location.href = "pathology_outsource_authorization_templatewise_lab.jsp?masterid=" + masterid+"&treatmentId="+treatmentId+"&sampleTypeId=" + sampleTypeId+"&profileId=" + profileId;
	}	
}


function saveTemplateInfoFromOutSource(callFrom){
    var patientId= $("#patientId").text(); // change by Rohini Ambhore
	//var patientId= $("#patientId11").text();
	var treatmentId= $("#treatmentId").text();
	var gender= $("#sex").text();
	var patientName= $("#patientName").text();
	var masterid= $("#masterid").val();
	var profileName= $("#profileNameId").val();
	var templateId = $("#templateNameId").val();
	var templateName=	$("#templateNameId option:selected").text();
	

	
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	
	var machineId = $("#equipmentId").val();
	var machineName=	$("#equipmentId option:selected").text();
	
	var templateData = "";
		templateData = CKEDITOR.instances['RiseditorSubjective'].getData();
		
		if(templateId == "" || templateId == undefined || templateId == null || templateId==0){
			alertify.alert("Please Select Template First");
			return false;
		}
		
		
		if(profileName == "" || profileName == undefined || profileName == null){
			alertify.alert("Please Select profileName Name");
			return false;
		}
		
		
	if(templateName == "" || templateName == undefined || templateName == null){
		alertify.alert("Please Select Template Name");
		return false;
	}
	else if(templateData == "" || templateData == undefined || templateData == null){
		alertify.alert("Please Enter Template Data");
		return false;
	}
	
	
	if(machineName == "" || machineName == undefined || machineName == null){
		alertify.alert("Please Select machineName ");
		return false;
	}
	
	
	
	var inputs = [];	
	inputs.push('masterId=' + masterid);
	inputs.push('patientId=' + patientId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('gender=' + gender);
	inputs.push('patientName=' + patientName);
	inputs.push('profileName=' + profileName);
	inputs.push('templateId=' + templateId);
	inputs.push('templateName=' + templateName);
	inputs.push('templateData=' + encodeURIComponent(templateData));
	inputs.push('callFrom=' +callFrom);
	inputs.push('machineId=' +machineId);
	inputs.push('machineName=' +machineName);
	

	
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/phlebotomy/saveTemplateInfo",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if(r==1){
				//alertify.success("Record Updated Successfully ");
				alert("Record Updated Successfully");
				if(callFrom == "post"){
					//generatePdfOnServer();
				}
				// window.location.href = "pathology_proccessing.jsp";
				 window.location.href = "pathology_phlebotomy_outsource.jsp";
			}
			else{
				alertify.error("Network Issue ");
			}
			
		}
	});
}