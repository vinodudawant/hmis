function saveAnaesthesiaApprovalDetails1(){
	var preOfNotes = $("#preOfNotes").val();
    var treatmentId = $("#tr_Id").val();
	var patientId = $("#pid").val();
	//var pid = $("#pid").val();
	var approvalRemark = $("#approvalRemark").val();
	var approval = $('input:radio[name=approval]:checked').val();
	//var tretID = $("#tretID").html();
	//var tomId = $("#tomId").val();
	var inputs = [];
	//inputs.push('action=saveAnaesthesiaApprovalDetails');
	inputs.push('preOfNotes=' + preOfNotes);
	inputs.push('patientId=' + patientId);
	inputs.push('approvalRemark=' + approvalRemark);
	inputs.push('approval=' + approval);
	inputs.push('treatmentId=' + treatmentId);
	//inputs.push('tomId=' + tomId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/approval/saveAnaesthesiaApproval",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			if (r == 1) {
				
				alertify.success("Records Saved Sucessfully");				
			} else if (r == 2) {
				
				alertify.success( "Records Updated Sucessfully");				
			}else {
				
				alertify.error("Oops Some Problem Ocured");
			}
				
		//	alert(ajaxResponse);
			if (approval == "approval") {
				$("#idConductOfAnaesthiaTab").show();
				$("#AnaesthesiaApproval").show();
				$("#idSaveAnaesthesiaApproval").show();
				$("#approvalStatus").val('approval');
			} else {
				$("#idConductOfAnaesthiaTab").hide();
				$("#approvalStatus").val('disApproval');
			}
		}
	});
}

function savePreOperationNotes1(){
	var preOpId = $("#id").val();
	var preOp = $("#preOpNotes").val();
	 var treatmentId = $("#tr_Id").val();
		
		var patientId = $("#pid").val();
	var inputs = [];
	//inputs.push('action=SavePreOpNote');
	inputs.push('preOpId=' + preOpId);
	inputs.push('preOp=' + preOp);
	inputs.push('patientId=' + patientId);
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/approval/savePreOp",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			if (r == 1) {
				
				alertify.success("Records Saved Sucessfully");				
			} else if (r == 2) {
				
				alertify.success( "Records Updated Sucessfully");				
			}else {
				
				alertify.error("Oops Some Problem Ocured");
			}
			getAnaesthesiaPreOp();
		}
	});
	
}

function getAnaesthesiaPreOp()
{
	 var treatmentId = $("#tr_Id").val();
	 var patientId = $("#pid").val();
	 var inputs = [];
	 inputs.push('patientId=' +patientId);
	 inputs.push('treatmentId=' + treatmentId);
	 var str = inputs.join('&');
	 jQuery.ajax({
		 async : true,
		 type : "POST",
		 data : str + "&reqType=AJAX",
		 url : "ehat/approval/getAnaesthesiaPreOp",
		 timeout : 1000 * 60 * 5,
		 cache : false,
		 error : function() {
			 alertify.error("Something went wrong..");
		 },
	 	success : function(r) {
	 		$('#preOpNotes').val(r.preOp);
	 		$('#preOpId').val(r.preOpId);
	 					
		}
	 });
	 
}

function saveIntraOperationNotes1(){
	var intraOpNotesDtoId = $("#id").val();
	var intraOpNotes = $("#intraOpNotes").val();
	 var treatmentId = $("#tr_Id").val();
		
		var patientId = $("#pid").val();
	var inputs = [];
	//inputs.push('action=SavePreOpNote');
	inputs.push('IntraOpNotesDtoId=' + intraOpNotesDtoId);
	inputs.push('intraOpNotes=' + intraOpNotes);
	inputs.push('patientId=' + patientId);
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/approval/saveIntraOperation",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			if (r == 1) {
				
				alertify.success("Records Saved Sucessfully");				
			} else if (r == 2) {
				
				alertify.success( "Records Updated Sucessfully");				
			}else {
				
				alertify.error("Oops Some Problem Ocured");
			}
			getIntraOperation();
		}
	});
	
}

function getIntraOperation()
{
	 var treatmentId = $("#tr_Id").val();
	 var patientId = $("#pid").val();
	 var inputs = [];
	 inputs.push('patientId=' +patientId);
	 inputs.push('treatmentId=' + treatmentId);
	 var str = inputs.join('&');
	 jQuery.ajax({
		 async : true,
		 type : "POST",
		 data : str + "&reqType=AJAX",
		 url : "ehat/approval/getIntraOperation",
		 timeout : 1000 * 60 * 5,
		 cache : false,
		 error : function() {
			 alertify.error("Something went wrong..");
		 },
	 	success : function(r) {
	 		$('#intraOpNotes').val(r.intraOpNotes);
	 		$('#intraOpNotesDtoId').val(r.intraOpNotesDtoId);
			
		}
	 });
	 
}


function fetchAnaesthesiaApproval()
{
	 var treatmentId = $("#tr_Id").val();
	 var patientId = $("#pid").val();
	 var inputs = [];
	 inputs.push('patientId=' +patientId);
	 inputs.push('treatmentId=' + treatmentId);
	 var str = inputs.join('&');
	 jQuery.ajax({
		 async : true,
		 type : "POST",
		 data : str + "&reqType=AJAX",
		 url : "ehat/approval/fetchAnaesthesiaApproval",
		 timeout : 1000 * 60 * 5,
		 cache : false,
		 error : function() {
			 alertify.error("Something went wrong..");
		 },
	 	success : function(r) {
	 		$('#approvalStatus').val(r.approval)
	 		$('#preOfNotes').val(r.preOfNotes);
	 		$('#approvalRemark').val(r.approvalRemark);
	 		$("#approval").prop('checked', true);
			checkingApprovalStatusForConductAnaesthiaTab();
		}
	 });
	 
}