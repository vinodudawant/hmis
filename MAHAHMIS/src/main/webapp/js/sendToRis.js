//Sanjay
/*function sendToRis(deptId){
	var r = confirm("Are you sure to Send these tests into RIS?");
	if(r==false){
		return false;
	}
	
	//var subSrvNBilDetIds=[]; 
	var subList 	= {	subSrvList : [] };
    $('input[name=opdBillCheckbox]:checked').each(function(){
		var bilDetId	=  parseInt($(this).val());
		if ( isNaN(bilDetId)) {
			bilDetId=0;
		}
		//getting service id 
		var serviceId 		= parseInt($("#sId"+bilDetId).text());
		if ( isNaN(serviceId)) {
			serviceId=0;
		}
		//getting sub service id
		var subSrvid	= parseInt($("#subserviceid"+bilDetId).text());
		if ( isNaN(subSrvid)) {
			subSrvid=0;
		}
		//Added by Laxman on 31-Jan-2018.
		//getting Doctor id
		var refDocId	= parseInt($("#dId"+bilDetId).text());
		if ( isNaN(refDocId)) {
			refDocId=0;
		}
		alert("------>>>>>"+bilDetId);
		//pusing sub service id into variable
		//subSrvNBilDetIds.push(bilDetId+"^"+subSrvid);
		subList.subSrvList.push({
			bilDetId		: bilDetId,
			serviceId		: serviceId,
			subSrvid 		: subSrvid,
			refDocId		: refDocId,
		});	
		 
	});
    
   
    subList = JSON.stringify(subList);
    alert("------>>>>>subList "+subList+"\n patientId "+patientId+"\n treatmentId "+treatmentId +"\n deptId"+deptId);
    var inputs = [];
    inputs.push("patientId="+patientId);
    inputs.push("treatmentId=" + treatmentId);
	inputs.push("subList=" + subList);	
	inputs.push("deptId="+deptId);
	
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/ris/sendToRis",
		error 	: function() {
					alert('Not coneected to server: Please check connections!');
				 },
		success : function(r) {
			if(r=="-1"){
				alert("Test has been already sent to Ris!");
			}else if(parseInt(r)>0){
					alertify.success("Tests Sent.");
				}
					
		}
	});	
}
*/
function sendToRis() {
   
	var r = confirm("Are you sure to Send these tests into RIS?");
	if (r == false) {
		return false;
	}
  
	var patientId = parseInt($("#patientId").text());
	if ( isNaN(patientId)) {
		patientId=0;
	}
	
	var treatmentId = parseInt($("#treatmentId").text());
	if ( isNaN(treatmentId)) {
		treatmentId=0;
	}
	
	var investigationTestUrgentFlag = 0;
	if (investigationTestUrgentFlag == 0) {
		investigationTestUrgentFlag = $("#idHiddentUrgencyStatus").val();
	}else{
			investigationTestUrgentFlag =  1;
	}

	if (investigationTestUrgentFlag == 0) {
		investigationTestUrgentFlag = 1;
	}
	var particular = new Array();
	//var subSrvNBilDetIds=[]; 
	var subList 	= {	subSrvList : [] };
    $('input[name=opdBillCheckbox]:checked').each(function(){
		var bilDetId	=  parseInt($(this).val());
		if ( isNaN(bilDetId)) {
			bilDetId=0;
		}
		//getting service id 
		var serviceId 		= parseInt($("#sId"+bilDetId).text());
		if ( isNaN(serviceId)) {
			serviceId=0;
		}
		
		if(serviceId == 13){
			var chargesSlaveId = $("#chargesSlaveId").val();
			if(chargesSlaveId > 0){
				
				sendToPhlebotomyFromSaveSponsor(0);
			}else{
				
				sendToPhlebotomyFromSave(0);
			}
			resetAll("general");
			return false;
		}
		
		if(serviceId != 12){
			alert("Please select investigation Test!");
			return false;
		}
		//getting sub service id
		var subSrvid	= parseInt($("#subserviceid"+bilDetId).text());
		if ( isNaN(subSrvid)) {
			subSrvid=0;
		}
		
		var testName	= $("#catName"+bilDetId).text();
		var totalBillAmt	= $("#char"+bilDetId).text();
		var doctorId	= $("#dId"+bilDetId).text();
		particular.push(testName);
		
		//pusing sub service id into variable
		//subSrvNBilDetIds.push(bilDetId+"^"+subSrvid);
		subList.subSrvList.push({
			bilDetId		: bilDetId,
			serviceId		: serviceId,
			subSrvid 		: subSrvid,
			testName		: testName,
			totalBillAmt	: totalBillAmt,
			doctorId	: doctorId
		});	
	});
    if(particular.length == 0){
		//alert("Please select At least one investigation Test!");
		return false;
	}
    subList = JSON.stringify(subList);
    
    var inputs = [];
    inputs.push("patientId="+patientId);
    inputs.push("treatmentId=" + treatmentId);
	inputs.push("subList=" + subList);	
	inputs.push("invesTestFlag="+investigationTestUrgentFlag);
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/ris/sendToRis",
		error 	: function() {
					alert('Not coneected to server: Please check connections!');
				 },
		success : function(r) {
			if(r=="-1"){
				alert("Test has been already sent to Ris!");
			}else if(parseInt(r)>0){
					alertify.success("Tests Sent.");
			}else{
					alertify.error("Test has not been sent");
			}
			//window.location.reload(true);
	        
			$('#RisStatusPopUp').modal('hide');  // Added by Rohini			
			getPatientBillAmount(treatmentId,servId);
			getPatientBillAmountForSponsor(treatmentId,servId);
			updateBillMasterTotalForOPD();     
			clearAllFieldsOfOpd();			
			stActiveTab();
						
		}
	});	
}
function setUrgency(no){
	$("#idHiddentUrgencyStatus").val(no);
}