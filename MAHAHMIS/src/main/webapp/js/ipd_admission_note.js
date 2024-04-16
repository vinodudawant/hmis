function updateAdmissionNote(){
	
	
//	var patID = $("#pid").val();
///	var treatID = $("#treatmentId").val();
	
	
	var patID = $("#pt_Id").val();
	var treatID = $("#tr_Id").val();  
	
	//var note = $("#ipd_adnote").val();
	
  var adNote = CKEDITOR.instances['ipd_adnote'].getData();
  
	
	if(adNote == ""){
		adNote = "-";
	}
	// alert(note);
	var inputs = [];
	inputs.push('adNote=' + encodeURIComponent(adNote));
	
	inputs.push('treatID=' + treatID);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/IpdAuto_Summary/updateAdmissionNote",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
		   if(r > 0){
			   alert("Record Updated SuccessFully");
			   FetchAdmissionNote();
			   
		   }
		
		
		}
			
		
	});
}


function FetchAdmissionNote() 
{
	var pid = $("#pt_Id").val();
	var treatmentId = $("#tr_Id").val(); 
	var inputs = [];
	
	// inputs.push('action=fetchPatientAdmissionNote');
	
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('pid=' + pid);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/IpdAuto_Summary/fetchPatientAdmissionNote",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
		
		CKEDITOR.instances['ipd_adnote'].setData(r.listTreatment[0].notes);ipd_adnote
		 //$("#ipd_adnote").val(r.listTreatment[0].notes);
		}
			
		
	});
}