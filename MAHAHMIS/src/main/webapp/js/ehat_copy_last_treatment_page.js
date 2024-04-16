function previousPatientHeaderListTreatmentWise(){
	var treatmentId= $("#tr_Id").val();
	var patientId=$("#pt_Id").val();
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	inputs.push('tid=' + encodeURIComponent(treatmentId));
	inputs.push('pid=' +encodeURIComponent(patientId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ddPreviousTreamentDetails/previousPatientHeaderListTreatmentWise",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			getConsultantDrNam(treatmentId);
			
		}
	});
}

var patientSummaryTemplate = "{#foreach $T.lit as lit}"
		+ "<tr>"
		+ "<td class='col-md-1-1'>{count++}.</td>"
		+ "<td class='col-md-3-1'>{$T.lit.department}</td>"
		+ "<td class='col-md-3-1'>{$T.lit.ctd}</td>"
		+ "<td class='col-md-6-1'>{$T.lit.treStart}</td>"
		
		+ "<td class='col-md-1-1'>"
		+ "{#if $T.lit.department=='opd'}<button onclick=printPrescriptionNewCover('{$T.lit.pi}','{$T.lit.ti}','PRINT') type='button'"
		+ " class='btn btn-xs btn-info coversheetBtn'><i class='fa fa-print Print'></i></button></td>{#/if}"
		+ "{#if $T.lit.department=='ipd'}<button onclick=printPrescriptionNewCoverIpd('{$T.lit.pi}','{$T.lit.ti}','PRINT') type='button'"
		+ " class='btn btn-xs btn-info coversheetBtn'><i class='fa fa-print Print'></i></button></td>{#/if}"
		+ "{#if $T.lit.department=='diagnosis'}<button onclick=printCpoeNewCoverDia('{$T.lit.pi}','{$T.lit.ti}') type='button'"
		+ " class='btn btn-xs btn-info coversheetBtn'><i class='fa fa-print Print'></i></button></td>{#/if}"
		+ "</tr>{#/for}";



function fetchPreviousTreatmentsByTreatmentID() {
	
	var treatmentId = ($("#tr_Id").val()).trim();
	var inputs = [];
	//inputs.push('action=fetchPreviousTreatmentsByTreatmentID');
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/doctordesk/fetchPreviousTreatmentsByTreatmentID",
		data	: str + "&reqType=AJAX",
		error : function() {

		},
		success : function(r) {
			count = 1;
			var divContent = "<option value='0'>Copy From Last Treatment</option>";
			for ( var i = 0; i < r.litreatment.length; i++) {
				
				divContent = divContent + "<option value='"
						+ r.litreatment[i].treatment_ID + "'>"
						+ r.litreatment[i].tstartDate + "/" + r.litreatment[i].treatment_ID + "/" + r.litreatment[i].createdDate + "</option>";
			}
			
			
			var divContent1 = "<option value='0'>Copy From Last Prescription</option>";
			for ( var i = 0; i < r.litreatment.length; i++) {
				
				divContent1 = divContent1 + "<option value='"
						+ r.litreatment[i].treatment_ID + "'>"
						+ r.litreatment[i].tstartDate + "</option>";
			}
			$('#iSelTreatmentToCopy').html(divContent);
			
			$('#iSelPrecsriptionToCopy').html(divContent1);
			
			//$("#previousPatientSummaryTable").setTemplate(patientSummaryTemplate);
			//$("#previousPatientSummaryTable").processTemplate(r);
			
		}
	});
}

function fetchTreatmentDataToCopy(){
	
	var prevTreatmentId = $("#iSelTreatmentToCopy").val();
	var currentTreatmentId = ($("#tr_Id").val()).trim();
	var patId = ($("#pt_Id").val()).trim();
	
	var r = confirm("Are you sure to pull data from selected OPD Treatment ?");
	if (r == false) {
		return false;
	}else{
			if((currentTreatmentId != 0 && prevTreatmentId != 0) && patId != 0){
				setPrevSubObjToCurrent(patId,prevTreatmentId,currentTreatmentId);
				setPrevComplaintFindingToCurrent(patId,prevTreatmentId,currentTreatmentId);
				setPrevAssessmentToCurrent(patId,prevTreatmentId,currentTreatmentId);
				setPrevPresciptionToCurrent(patId,prevTreatmentId,currentTreatmentId);
				setPrevGenerelInstructionToCurrent(patId,prevTreatmentId,currentTreatmentId);
				setPrevIndividualInstructionToCurrent(patId,prevTreatmentId,currentTreatmentId);
				setPrevSurgeryAdviceToCurrent(patId,prevTreatmentId,currentTreatmentId);
				setPrevRadiotherapyToCurrent(patId,prevTreatmentId,currentTreatmentId);
				setPrevChemotherapyToCurrent(patId,prevTreatmentId,currentTreatmentId);
				setPrevDocumentsToCurrent(patId,prevTreatmentId,currentTreatmentId);
				//setPrevPresciptionToCurrentIPD(patId,prevTreatmentId,currentTreatmentId);
				setPrevHistoryToCurrentIPD(patId,prevTreatmentId,currentTreatmentId);
				setPrevClinicalEvaluationOPD(patId,prevTreatmentId,currentTreatmentId);
				setPrevPresciptionToCurrentOPDtoIPD(patId,prevTreatmentId,currentTreatmentId);
				setPrevDietOPDtoOPDAndIPD(patId,prevTreatmentId,currentTreatmentId);
				setPrevPresciptionToCurrentOPD(patId, prevTreatmentId, currentTreatmentId);
				
				alert("Previous Treatment Saved Successfully");
				location.reload();
			}
	}
}
function setPrevSubObjToCurrent(patId,prev,current){
	var inputs = [];
	inputs.push('action=setPrevSubObjToCurrent');
	inputs.push('patId=' + patId);
	inputs.push('prev=' + prev);
	inputs.push('current=' + current);  
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('Subjective/Objective Not Inserted');
		},
		success : function(r) {
			ajaxResponse = r;
			//alert(r);
		}
	});
}

function setPrevComplaintFindingToCurrent(patId,prev,current){
	var inputs = [];
	inputs.push('action=setPrevComplaintFindingToCurrent');
	inputs.push('patId=' + patId);
	inputs.push('prev=' + prev);
	inputs.push('current=' + current);  
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('Complaints/Findings Not Inserted');
		},
		success : function(r) {
			ajaxResponse = r;
			//alert(r);
		}
	});
}
function setPrevAssessmentToCurrent(patId, prev, current){
	
	var inputs = [];
	inputs.push('action=setPrevAssessmentToCurrent');
	inputs.push('patId=' + patId);
	inputs.push('prev=' + prev);
	inputs.push('current=' + current);  
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('Assessment Not Inserted');
		},
		success : function(r) {
			ajaxResponse = r;
			//alert(r);
		}
	});
}

function setPrevPresciptionToCurrent(patId, prev, current){
	
	var inputs = [];
	//inputs.push('action=setPrevPresciptionToCurrent');
	inputs.push('patId=' + patId);
	inputs.push('prev=' + prev);
	inputs.push('current=' + current);  
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "ehat/previousTreatemnt/setPrevPresciptionToCurrent",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('Presciption Not Inserted');
		},
		success : function(r) {
			ajaxResponse = r;
			//alert(r);
		}
	});
}
function setPrevGenerelInstructionToCurrent(patId, prev, current){
	
	var inputs = [];
	inputs.push('action=setPrevGenerelInstructionToCurrent');
	inputs.push('patId=' + patId);
	inputs.push('prev=' + prev);
	inputs.push('current=' + current);  
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('Generel Instruction Not Inserted');
		},
		success : function(r) {
			ajaxResponse = r;
			//alert(r);
		}
	});
}
function setPrevIndividualInstructionToCurrent(patId, prev, current){
	
	var inputs = [];
	inputs.push('action=setPrevIndividualInstructionToCurrent');
	inputs.push('patId=' + patId);
	inputs.push('prev=' + prev);
	inputs.push('current=' + current);  
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('Individual Instruction Not Inserted');
		},
		success : function(r) {
			ajaxResponse = r;
			//alert(r);
		}
	});
}
function setPrevSurgeryAdviceToCurrent(patId, prev, current){
	
	var inputs = [];
	inputs.push('action=setPrevSurgeryAdviceToCurrent');
	inputs.push('patId=' + patId);
	inputs.push('prev=' + prev);
	inputs.push('current=' + current);  
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('Surgery Advice Not Inserted');
		},
		success : function(r) {
			ajaxResponse = r;
			//alert(r);
		}
	});
}
function setPrevHistoryToCurrentIPD(patId, prev, current){
	
	var inputs = [];
	inputs.push('action=setPrevHistoryToCurrentIPD');
	inputs.push('patId=' + patId);
	inputs.push('prev=' + prev);
	inputs.push('current=' + current);  
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('Surgery Advice Not Inserted');
		},
		success : function(r) {
			ajaxResponse = r;
			//alert(r);
		}
	});
}

function setPrevRadiotherapyToCurrent(patId, prev, current){
	
	var inputs = [];
	inputs.push('action=setPrevRadiotherapyToCurrent');
	inputs.push('patId=' + patId);
	inputs.push('prev=' + prev);
	inputs.push('current=' + current);  
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('Radiotherapy Not Inserted');
		},
		success : function(r) {
			ajaxResponse = r;
			//alert(r);
		}
	});
}
function setPrevChemotherapyToCurrent(patId, prev, current){
	
	var inputs = [];
	inputs.push('action=setPrevChemotherapyToCurrent');
	inputs.push('patId=' + patId);
	inputs.push('prev=' + prev);
	inputs.push('current=' + current);  
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('Chemotherapy Not Inserted');
		},
		success : function(r) {
			ajaxResponse = r;
			//alert(r);
		}
	});
}
function setPrevDocumentsToCurrent(patId, prev, current){
	
	var inputs = [];
	inputs.push('action=setPrevDocumentsToCurrent');
	inputs.push('patId=' + patId);
	inputs.push('prev=' + prev);
	inputs.push('current=' + current);  
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('Documents Not Inserted');
		},
		success : function(r) {
			ajaxResponse = r;
			//alert(r);
		}
	});
}
function setPrevPresciptionToCurrentIPD(patId, prev, current){
	
	var inputs = [];
	inputs.push('action=setPrevOrderFormToCurrentIPD');
	inputs.push('patId=' + patId);
	inputs.push('prev=' + prev);
	inputs.push('current=' + current);  
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('IPD Presciption Not Inserted');
		},
		success : function(r) {
			ajaxResponse = r;
			//alert(r);
		}
	});
}





function printPrescriptionNewCover (pid,tid,type){
	callFrom = $("#pageType").val();
	callFrom1 = $("#callFrom").val();
	hideSummaryPostPopupNew();
	 if (type == "PRINT") {
		var editorContent="null";
			
		var pid1 = $.trim($("#pid2").html());
		var tid1 = $.trim($("#tid2").html());
		
		
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
		
	} else if (type == "HIDE_POPUP_PRINT") {
		$("#iPrintBill").hide();
	}
}



function printPrescriptionNewCoverIpd (pid,tid,type){
	callFrom = $("#pageType").val();
	callFrom1 = $("#callFrom").val();
	hideSummaryPostPopupNew();
	 if (type == "PRINT") {
			
		var pid1 = $.trim($("#pid2").html());
		var tid1 = $.trim($("#tid2").html());
		var date = $("#regDate2").html();
		var date_pick = $("#OFdate-pick").val();
		
		if(pid1 != "" || tid1 != ""){
			callFrom = "previousTreatmentOPDER";
		}
		
		var instructionLanguage = $(
				"input[name='prepInstructionPopup']:checked").val();
		var pageSize = $(
		"input[name='prepInstructionPaperSizePopup']:checked").val();
		var vaccinationFlagCheckboxPrint = $(
				"input[name='vaccinationFlagCheckboxPrint']:checked").val();
		var dischargedate = $("#discharge_date").val();

		var discharge_Time = $("#discharge_Time").val();
		var timeDate=dischargedate +"  "+ discharge_Time;
		
		var tomId = $("#idSelOperationData").val(); 
		var idopd = "";
		if($("#idopdlab").is(':checked')){
		$.each($("input[name='chkopd']:checked"), function(){
			idopd = idopd + $(this).val()+",";
		});
		}
		var divfollow = $("#divfollowDate").html(); 
		var discharge_Type = $("#discharge_Type").val();
		var shraddhaFlow=  $("#shraddhaFlow").val();
		
		setTimeout(
				function() {

					$("#iPrintBill").hide();
					
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
									+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&date_pick="+date_pick+"&discharge_Type="+encodeURIComponent(discharge_Type)+"&tomId="+encodeURIComponent(tomId)
									+"&dischargedate="+encodeURIComponent(timeDate) + "&divfollow="+ encodeURIComponent(divfollow) +"&opdlab="+idopd));
				
							
						
					}
					else{
						window
							.open(("IPDPrescriptionPrint.jsp?pid1=" + pid1 + "&callFrom=" + callFrom
								+ "&tid1=" + tid1 + "&instructionLanguage="
								+ instructionLanguage + "&date=" + date
								+ "&vaccinationFlagCheckboxPrint=" + vaccinationFlagCheckboxPrint+"&pageSize="+pageSize+"&discharge_Type="+encodeURIComponent(discharge_Type)+"&tomId="+encodeURIComponent(tomId)
								+"&dischargedate="+encodeURIComponent(timeDate) + "&divfollow="+encodeURIComponent(divfollow) +"&opdlab="+idopd));
						
					}location.reload();
					}, 300);
	} else if (type == "HIDE_POPUP_PRINT") {
		$("#iPrintBill").hide();
	}
}





function printCpoeNewCoverDia (pid,tid){
	var callFrom = "default";
	hideSummaryPostPopupNew();

		
		setTimeout(
				function() {

					$("#iPrintBill").hide();
					

						window
							.open(("DiagnosticPrint.jsp?patID=" + pid + "&callFrom=" + callFrom
									+ "&treatID=" + tid));
						location.reload();
					}, 300);
	
} 


function setPrevClinicalEvaluationOPD(patId,prev,current){
	var inputs = [];
	inputs.push('action=setPrevClinicalEvaluationOPD');
	inputs.push('patId=' + patId);
	inputs.push('prev=' + prev);
	inputs.push('current=' + current);  
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('Subjective/Objective Not Inserted');
		},
		success : function(r) {
			ajaxResponse = r;
			//alert(r);
		}
	});
}



function setPrevPresciptionToCurrentOPDtoIPD(patId, prev, current){
	
	var inputs = [];
	inputs.push('action=setPrevPresciptionToCurrentOPDtoIPD');
	inputs.push('patId=' + patId);
	inputs.push('prev=' + prev);
	inputs.push('current=' + current);  
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('Presciption Not Inserted');
		},
		success : function(r) {
			//alert("prevprescription="+ JSON.stringify(r));
			ajaxResponse = r;
			//alert(r);
		}
	});
}

function setPrevDietOPDtoOPDAndIPD(patId, prev, current){
	
	var inputs = [];
	inputs.push('action=setPrevDietOPDtoOPDAndIPD');
	inputs.push('patId=' + patId);
	inputs.push('prev=' + prev);
	inputs.push('current=' + current);  
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('Presciption Not Inserted');
		},
		success : function(r) {
			//alert("prevprescription="+ JSON.stringify(r));
			ajaxResponse = r;
			//alert(r);
		}
	});
}


function setPrevPresciptionToCurrentOPD(patId, prev, current){
	
	var inputs = [];
	inputs.push('action=setPrevOrderFormToCurrentOPD');
	inputs.push('patId=' + patId);
	inputs.push('prev=' + prev);
	inputs.push('current=' + current);  
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('IPD Presciption Not Inserted');
		},
		success : function(r) {
			ajaxResponse = r;
			//alert(r);
		}
	});
}


function fetchPrescriptionDataToCopy(){
	//alert("HEllo");
	
	var prevTreatmentId = $("#iSelPrecsriptionToCopy :selected").val(); 
	var currentTreatmentId = ($("#tr_Id").val()).trim();
	var patId = ($("#pt_Id").val()).trim();
	
	
	if (r == false) {
		return false;
	}else{
			if((currentTreatmentId != 0 && prevTreatmentId != 0) && patId != 0){
				
				var r = confirm("Are you sure to pull data from selected OPD/IPD Prescription ?");
			if(r == true){	
				setPrevPresciptionToCurrent(patId,prevTreatmentId,currentTreatmentId);
				//setPrevPresciptionToCurrentOPDtoIPD(patId,prevTreatmentId,currentTreatmentId);
				//setPrevPresciptionToCurrentOPD(patId,prevTreatmentId,currentTreatmentId);
				
				alert("Previous Prescription Saved Successfully");
				location.reload();
			}
			}
	}
}


function fetchPrevoiusDataToCurrentTreatment(){
	//alert("HEllo");
	
	var prevTreatmentId = $("#iSelTreatmentToCopy :selected").val(); 
	var currentTreatmentId = ($("#tr_Id").val()).trim();
	var patId = ($("#pt_Id").val()).trim();
	
	
	
	var r = confirm("Are you sure to pull data from selected OPD/IPD ?");
	if (r == false) {
		return false;
	}else{
			if((currentTreatmentId != 0 && prevTreatmentId != 0) && patId != 0){
				
				
				setPreviousDataToCurrentTreatment(patId,prevTreatmentId,currentTreatmentId);
				
			
				location.reload();
			}
	}
}

function setPreviousDataToCurrentTreatment(patId,prevTreatmentId,currentTreatmentId){

	
	var inputs = [];
	//inputs.push('action=setPrevPresciptionToCurrent');
	inputs.push('patId=' + patId);
	inputs.push('prev=' + prevTreatmentId);
	inputs.push('current=' + currentTreatmentId);  
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "ehat/previousTreatemnt/setPreviousDataToCurrentTreatment",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			
		}
	});

	
}