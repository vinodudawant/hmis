/********
 * @author	: Touheed Khan
 * @date	: 21-Aug-2017
 * @base	: given test send to lab
 ********/
function sendToLab(deptId){
	
	var chargesSlaveId = $("#chargesSlaveId").val();
	if(chargesSlaveId > 0){
		
		sendToPhlebotomyFromSaveSponsor(1);
	}else{
		
		sendToPhlebotomyFromSave(1);
	}
	/*var departmentId=$("#deptId").val();
	var r = confirm("Are you sure to Send these tests into Lab?");
	if(r==false){
		return false;
	}
	var flagTest=0;
	var patientId = parseInt($("#patientId").text());
	if ( isNaN(patientId)) {
		patientId=0;
	}
	var treatmentId = parseInt($("#treatmentId").text());
	if ( isNaN(treatmentId)) {
		treatmentId=0;
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
		//alert("------>>>>>"+bilDetId);
		//pusing sub service id into variable
		//subSrvNBilDetIds.push(bilDetId+"^"+subSrvid);
		subList.subSrvList.push({
			bilDetId		: bilDetId,
			serviceId		: serviceId,
			subSrvid 		: subSrvid,
			refDocId		: refDocId,
		});	
		
		flagTest=1;
	});
    
   
    subList = JSON.stringify(subList);
	if(flagTest==0){
		alertify.error("Please Select At Least One Test For Sent To Lab...!");
		return false;
	}
    var inputs = [];
    inputs.push("patientId="+patientId);
    inputs.push("treatmentId=" + treatmentId);
	inputs.push("subList=" + subList);	
	inputs.push("deptId="+departmentId);
	
	
	var str = inputs.join('&');	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",	
		url 	: "ehat/lab/sendToLab",
		error 	: function() {
					alert('Not coneected to server: Please check connections!');
				 },
		success : function(r) {
			if(r=="-1"){
				alertify.error("Test has been already sent to lab..!");
			}else if(r=="-2"){
				alertify.error("Duplicate test can not be send to lab..!");
			}else if(r=="-3"){
				alertify.error("Only Pathology test are allowed send to lab..!");
			}else if(parseInt(r)>0){
					alertify.success("Tests Sent.");
			}else{
				alertify.error("NetWork error...");
			}
					
		}
	});	*/
}