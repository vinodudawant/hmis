
function toCreateTherapyRow(){

 	var rowCount = $("#rowCountTherapy").val();

 	if (rowCount == -1) {
 		rowCount = 0;
 	}
 	rowCount++;
 	rowId = "TherapyRowNo" + rowCount;
 	var x = document.createElement('tr');
 	x.setAttribute('id', rowId);
 	document.getElementById("therapyTBody").appendChild(x);
 	document.getElementById(rowId).innerHTML = '<th><label>'+ rowCount+'.</label> </th>'
		+ '<th><input id="therapyDate'+ rowCount+'" class="form-control input-SmallText col-md-12-1" type="text" style="margin-top:0px;" '
		+ ' readonly="readonly" onclick=displayCalendar(document.getElementById(this.id),\"dd/mm/yyyy\",this) value="" name="therapyDate"></th>'
		+ '<th><input class="form-control input-SmallText  TextFont" id="energy'+ rowCount+'" type="text"></th>'
		+ '<th><input class="form-control input-SmallText  TextFont" id="fieldSizeSkin'+ rowCount+'" type="text"></th>'
		+ '<th><input class="form-control input-SmallText  TextFont" id="fieldSizeTumour'+ rowCount+'" type="text"></th>'
		+ '<th><input class="form-control input-SmallText  TextFont" id="depthtxt'+ rowCount+'" type="text"></th>'
		+ '<th><input class="form-control input-SmallText  TextFont" id="wedgetxt'+ rowCount+'" type="text"></th>'
		+ '<th><input class="form-control input-SmallText  TextFont" id="gantrytxt'+ rowCount+'" type="text"></th>'
		+ '<th><input class="form-control input-SmallText  TextFont" id="collAngle'+ rowCount+'" type="text"></th>'
		+ '<th><input class="form-control input-SmallText  TextFont" id="couchAngle'+ rowCount+'" type="text"></th>'
		+ '<th><input class="form-control input-SmallText  TextFont" id="doseFraction'+ rowCount+'" type="text"></th>'
		+ '<th><input class="form-control input-SmallText  TextFont" id="treatmentTime'+ rowCount+'" type="text"></th>'
		+ '<th><input id="checkTherapyRecord" type="checkbox" name="checkTherapyRecord'+ rowCount+'">'
		+ '<input id="idTherapyRecord'+ rowCount+'" type="hidden" value="0"></th>';
 			
 	$("#rowCountTherapy").val(rowCount);
	
}


function toRemoveTherapyRow(){

	var RowCount = $("#rowCountTherapy").val();
	if (RowCount == "0") {
		alert("No Data to delete");
		return false;
	}
	var allVals = [];
	var flag = false;
	
	$.each($('#checkTherapyRecord:checked'), function() {
		allVals.push($(this).val());
		flag = true;
	});

	if (!flag) {
		alert("please check the checbox...");
		return false;
	}
	var p = 1;
	
	for ( var i = 0; i < (RowCount); i++) {
		var $radios = $('input:checkbox[name=checkTherapyRecord' + p + ']');
		if ($radios.is(':checked') == true) {
			var id =$("#idTherapyRecord"+p).val();
			$("#TherapyRowNo" + p).remove();
			if(id != 0){
				deleteTherapyRecord(id);
			}
		}
		p++;
	}; 
}


function toCreateAuditRow(){

 	var rowCount = $("#rowCountAudit").val();

 	if (rowCount == -1) {
 		rowCount = 0;
 	}
 	rowCount++;
 	rowId = "AuditRowNo" + rowCount;
 	var x = document.createElement('tr');
 	x.setAttribute('id', rowId);
 	document.getElementById("auditTBody").appendChild(x);
 	document.getElementById(rowId).innerHTML = '<th><label>'+ rowCount+'.</label> </th>'
		+ '<th><input id="auditDate'+ rowCount+'" class="form-control input-SmallText col-md-12-1" type="text" style="margin-top:0px;" '
		+ ' readonly="readonly" onclick=displayCalendar(document.getElementById(this.id),\"dd/mm/yyyy\",this) value="" name="auditDate"></th>'
		+ '<td><input id="auditRemark'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="auditSign'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="checkboxAudit" type="checkbox" name="checkboxAudit'+ rowCount+'">'
		+ '<input id="idAuditRecord'+ rowCount+'" type="hidden" value="0"></td>';
 			
 	$("#rowCountAudit").val(rowCount);
	
}


function toRemoveAuditRow(){

	var RowCount = $("#rowCountAudit").val();
	if (RowCount == "0") {
		alert("No Data in Audit to delete");
		return false;
	}
	var allVals = [];
	var flag = false;
	
	$.each($('#checkboxAudit:checked'), function() {
		allVals.push($(this).val());
		flag = true;
	});

	if (!flag) {
		alert("please check the checbox...");
		return false;
	}
	var p = 1;
	
	for ( var i = 0; i < (RowCount); i++) {
		var $radios = $('input:checkbox[name=checkboxAudit' + p + ']');
		if ($radios.is(':checked') == true) {
			var id =$("#idAuditRecord"+p).val();
			$("#AuditRowNo" + p).remove();
			if(id != 0){
				deleteAuditRecord(id);
			}
		}
		p++;
	}; 
}


function toCreateDailyTreatmentRow(){

 	var rowCount = $("#rowCountDailyTreatment").val();

 	if (rowCount == -1) {
 		rowCount = 0;
 	}
 	rowCount++;
 	rowId = "dailyTreatmentRowNo" + rowCount;
 	var x = document.createElement('tr');
 	x.setAttribute('id', rowId);
 	document.getElementById("dailyTreatmentTBody").appendChild(x);
 	document.getElementById(rowId).innerHTML = '<th><label>'+ rowCount+'.</label> </th>'
		+ '<th><input id="dailyTreatmentDate'+ rowCount+'" class="form-control input-SmallText col-md-12-1" type="text" style="margin-top:0px;" '
		+ ' readonly="readonly" onclick=displayCalendar(document.getElementById(this.id),\"dd/mm/yyyy\",this) value="" name="dailyTreatmentDate"></th>'
		+ '<td><input id="unittxt'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="tumorDosetxt'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f1Mu'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f1Td'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f2Mu'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f2Td'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f3Mu'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f3Td'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f4Mu'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f4Td'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f5Mu'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f5Td'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f6Mu'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f6Td'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f7Mu'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f7Td'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f8Mu'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f8Td'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f9Mu'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f9Td'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f10Mu'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="f10Td'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="checkboxDailyTreatment" type="checkbox" name="checkboxDailyTreatment'+ rowCount+'">'
		+ '<input id="idDailyTreatmentRecord'+ rowCount+'" type="hidden" value="0"></td>';	
 		
 	$("#rowCountDailyTreatment").val(rowCount);
	
}


function toRemoveDailyTreatmentRow(){

	var RowCount = $("#rowCountDailyTreatment").val();
	if (RowCount == "0") {
		alert("No Data in Daily Treatment to delete");
		return false;
	}
	var allVals = [];
	var flag = false;
	
	$.each($('#checkboxDailyTreatment:checked'), function() {
		allVals.push($(this).val());
		flag = true;
	});

	if (!flag) {
		alert("please check the checbox...");
		return false;
	}
	var p = 1;
	
	for ( var i = 0; i < (RowCount); i++) {
		var $radios = $('input:checkbox[name=checkboxDailyTreatment' + p + ']');
		if ($radios.is(':checked') == true) {
			var id =$("#idDailyTreatmentRecord"+p).val();
			$("#dailyTreatmentRowNo" + p).remove();
			if(id != 0){
				deleteDailyTreatmentRecord(id);
			}
		}
		p++;
	}; 
}


function toCreatePortalRow(){

 	var rowCount = $("#rowCountPortal").val();

 	if (rowCount == -1) {
 		rowCount = 0;
 	}
 	rowCount++;
 	rowId = "portalVerificationRowNo" + rowCount;
 	var x = document.createElement('tr');
 	x.setAttribute('id', rowId);
 	document.getElementById("portalVerificationTBody").appendChild(x);
 	document.getElementById(rowId).innerHTML = '<th><label>'+ rowCount+'.</label> </th>'
		+ '<th><input id="portalVerificationDate'+ rowCount+'" class="form-control input-SmallText col-md-12-1" type="text" style="margin-top:0px;" '
		+ ' readonly="readonly" onclick=displayCalendar(document.getElementById(this.id),\"dd/mm/yyyy\",this) value="" name="portalVerificationDate"></th>'
		+ '<td><input id="imageAP'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="imageLat'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="KVBased'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="MVBased'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="errorX'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="errorY'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="errorZ'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="correctionX'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="correctionY'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="correctionZ'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="rttSign'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="phySign'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="checkboxPortalVerification" type="checkbox" name="checkboxPortalVerification'+ rowCount+'">'
		+ '<input id="idPortalVerificationRecord'+ rowCount+'" type="hidden" value="0"></td>';

 	$("#rowCountPortal").val(rowCount);

}


function toRemovePortalRow(){

	var RowCount = $("#rowCountPortal").val();
	if (RowCount == "0") {
		alert("No Data in Portal Verification to delete");
		return false;
	}
	var allVals = [];
	var flag = false;
	
	$.each($('#checkboxPortalVerification:checked'), function() {
		allVals.push($(this).val());
		flag = true;
	});

	if (!flag) {
		alert("please check the checbox...");
		return false;
	}
	var p = 1;
	
	for ( var i = 0; i < (RowCount); i++) {
		var $radios = $('input:checkbox[name=checkboxPortalVerification' + p + ']');
		if ($radios.is(':checked') == true) {
			var id =$("#idPortalVerificationRecord"+p).val();
			$("#portalVerificationRowNo" + p).remove();
			if(id != 0){
				deleteVerificationRecord(id);
			}
		}
		p++;
	}; 
}


function toCreateReviewRow(){

 	var rowCount = $("#rowCountPatientReview").val();

 	if (rowCount == -1) {
 		rowCount = 0;
 	}
 	rowCount++;
 	rowId = "patientReviewRowNo" + rowCount;
 	var x = document.createElement('tr');
 	x.setAttribute('id', rowId);
 	document.getElementById("patientReviewTBody").appendChild(x);
 	document.getElementById(rowId).innerHTML = '<th><label>'+ rowCount+'.</label> </th>'
		+ '<th><input id="patientReviewDate'+ rowCount+'" class="form-control input-SmallText col-md-12-1" type="text" style="margin-top:0px;" '
		+ ' readonly="readonly" onclick=displayCalendar(document.getElementById(this.id),\"dd/mm/yyyy\",this) value="" name="patientReviewDate"></th>'
		+ '<td><input id="findingsNToxicity'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="patientAdvice'+ rowCount+'" class="form-control input-SmallText TextFont" type="text"></td>'
		+ '<td><input id="checkboxPatientReview" type="checkbox" name="checkboxPatientReview'+ rowCount+'">'
		+ '<input id="idPatientReviewRecord'+ rowCount+'" type="hidden" value="0"></td>';

 	$("#rowCountPatientReview").val(rowCount);
	
}


function toRemoveReviewRow(){

	var RowCount = $("#rowCountPatientReview").val();
	if (RowCount == "0") {
		alert("No Data in Patient Review to delete");
		return false;
	}
	var allVals = [];
	var flag = false;
	
	$.each($('#checkboxPatientReview:checked'), function() {
		allVals.push($(this).val());
		flag = true;
	});

	if (!flag) {
		alert("please check the checbox...");
		return false;
	}
	var p = 1;
	
	for ( var i = 0; i < (RowCount); i++) {
		var $radios = $('input:checkbox[name=checkboxPatientReview' + p + ']');
		if ($radios.is(':checked') == true) {
			var id =$("#idPatientReviewRecord"+p).val();
			$("#patientReviewRowNo" + p).remove();
			if(id != 0){
				deleteReviewRecord(id);
			}
		}
		p++;
	}; 
}


function fetchDataForPageExternalTherapy(){
	
	fetchExternalTreatmentPrescription();
	fetchTreatmentTherapy();
	fetchPhysicsCal();
	fetchChecklistForTechnologist();
	fetchAudit();
	fetchDailyTreatment();
	fetchPortalVerification();
	fetchPatientReview();
}


// #code by : Sufiyan Shaikh #for : saving RadioTherapy Chart Checklist
function saveRadioTherapyChartChecklist(){

	var patId = $("#pathiddenid").val();
	var id = $("#RadioTherapyChartChecklistId").val();
	var CompletionDay = $("#RadiotherapyCompletionDay").val();
	var date = $("#RadiotherapyDate").val();
	var sign = $("#RadiotherapySign").val();
    var checkedActions = document.getElementsByClassName('radioTherapyCheck');
    var allData="";
		  
	  for(var i=0; checkedActions[i]; ++i){
	      if(checkedActions[i].checked){
	    	  allData = allData+checkedActions[i].value+",";
	      }
	  }
	  
	if(allData==""){
		alert("please select atleast 1 checkbox to save ...");
		return false ;
	}  
	
	if(patId==0){
		alert("please select a patient from the list ...");
		return false ;
	}
	
		var RadioTherapyChart = {
			chartList : []
    }; 
  
	RadioTherapyChart.chartList.push({
	  radioTherapyChartId:id,
	  patientId:patId,
	  date:date,
	  completionDay: CompletionDay,
	  sign:sign,
	  particularValues: allData,
  });
  
	RadioTherapyChart=JSON.stringify(RadioTherapyChart);
		
		
		var inputs = [];
		inputs.push('RadioTherapyChart=' + RadioTherapyChart);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/radiation/saveRadioTherapyChartChecklist",	
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				
			},
			success : function(ajaxResponse) {
				alert(ajaxResponse);
				fetchRadioTherapyChartChecklist(patId);
			}
		});
}


//fetching RadioTherapy Chart Checklist
function fetchRadioTherapyChartChecklist(patId){

	if(patId!=0){
		
		var inputs = [];
		inputs.push('patientId=' + patId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/radiation/fetchRadioTherapyChartChecklist",	
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				
			},
			success : function(radiationBean) {
				
				clearAllRadioTherapyChartChecklist();
				if(radiationBean.chartList.length !=0){
					
					$("#RadioTherapyChartChecklistId").val(radiationBean.chartList[0].radioTherapyChartId);
					$("#RadiotherapyCompletionDay").val(radiationBean.chartList[0].completionDay);
					$("#RadiotherapySign").val(radiationBean.chartList[0].sign);
					$("#RadiotherapyDate").val(radiationBean.chartList[0].date);
					
					var fields = radiationBean.chartList[0].particularValues;
					checkb = fields.split(',');
					for(var j=0;j< (checkb.length - 1);j++){
						var no = checkb[j].match(/\d+/g).map(Number);
						document.getElementById("chkRTCClist_"+no).checked = true;
					}
				}
			}
		});
	}
}


//clearing all fields 
function clearAllRadioTherapyChartChecklist(){

	var total = $("#totalPageParticulars").val();
	$("#RadiotherapyCompletionDay").val("");
	$("#RadiotherapySign").val("");
	$("#RadiotherapyDate").val("");
	
	for(var j=1;j<= total;j++){
		document.getElementById("chkRTCClist_"+j).checked = false;
	}
	
}


function savePatientClinicalData(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
  var date = $("#todays_date").val();
  var RegNo = $("#PCDregNotxt").val();
  var RTNo = $("#PCDrtNotxt").val();
  var Diagnosis  = $("#PCDdiagnosistxt").val();
  var Histology  = $("#PCDhistologytxt").val();
  var Stage  = $("#PCDStagetxt").val();
  var TNM  = $("#PCDTNMtxt").val();
  var T = $("#PCDTtxt").val();
  var N = $("#PCDNtxt").val();
  var M = $("#PCDMtxt").val(); 
  
  var HistoryAndFindings = $("#PCDHistoryNFinfingstxt").val();
  var PreviousTreatment = $("#prevtreatmentTA").val();
  var Surgery  = $("#SurgeryTA").val();
  var Chemotherapy  = $("#chemotherapyTA").val();
  var Radiotherapy  = $("#radiotherapyTA").val();
  var CountouringDetails = $("#countouringDetailsTA").val();
  
  var RadiationSummaryFrom = $("#RadioSummaryFrom").val();
  var RadiationSummaryTo = $("#RadioSummaryTo").val();
  var BrachyTherapy  = $("input[name=Therapyplanned]:checked").val();
  
  var FinalDosageP1  = $("#RadioSummaryFinalDosageP1").val();
  var GYP1 = $("#RadioSummaryGYP1").val();
  var FractionDaysP1 = $("#RadioSummaryFractionP1").val();
  var SiteP1 = $("#RadioSummarySiteP1").val();
  
  var FinalDosageP2  = $("#RadioSummaryFinalDosageP2").val();
  var GYP2 = $("#RadioSummaryGYP2").val();
  var FractionDaysP2 = $("#RadioSummaryFractionP2").val();
  var SiteP2 = $("#RadioSummarySiteP2").val();
  
  var FinalDosageP3  = $("#RadioSummaryFinalDosageP3").val();
  var GYP3 = $("#RadioSummaryGYP3").val();
  var FractionDaysP3 = $("#RadioSummaryFractionP3").val();
  var SiteP3 = $("#RadioSummarySiteP3").val();
  
  var CauseOfGap = $("#RadioSummaryCOG").val();
  var Protocol = $("input[name=protocol]:checked").val();
  var formId = $("#PatientClinicalDataId").val();
   
  var intentionValues ="";
  var fractionationValues ="";
  var evaluationValues ="";
  
  var checkedIntention = document.getElementsByClassName('checkIntention');
  var checkedFractionation = document.getElementsByClassName('checkFractionation');
  var checkedEvaluation = document.getElementsByClassName('checkFinalEvaluation');
  
  for(var i=0; checkedIntention[i]; ++i){
      if(checkedIntention[i].checked){
    	  if(checkedIntention[i].value=="Others"){
    		  if($("#otherIntentiontxt").val()==""){
    			  alert("Please fill 'other' Intention or un-tick the 'other' checkbox! ");
    			  return false;
    		  }
    		  intentionValues = intentionValues +"Others#"+ $("#otherIntentiontxt").val() +"~";  
    	  }else{
    		  intentionValues = intentionValues + checkedIntention[i].value +"~";
    	  }
      }
  }
  
  for(var i=0; checkedFractionation[i]; ++i){
      if(checkedFractionation[i].checked){
    	  if(checkedFractionation[i].value=="Others"){
    		  if($("#otherFractionationtxt").val() ==""){
    			  alert("Please fill other Fractionation or un-tick the 'other' checkbox! ");
    			  return false;
    		  }
    		  fractionationValues = fractionationValues +"Others#"+ $("#otherFractionationtxt").val() +"~";
    	  }else{
    		  fractionationValues = fractionationValues + checkedFractionation[i].value +"~";
    	  }
      }
  }

  for(var i=0; checkedEvaluation[i]; ++i){
      if(checkedEvaluation[i].checked){
    	  evaluationValues = evaluationValues + checkedEvaluation[i].value +"~";
      }
  }
	if(BrachyTherapy==undefined){
		alert("please tick yes or no for BrachyTherapy Planned");
		return false;
	}
	if(Protocol==undefined){
		alert("please tick yes or no for Protocol");
		return false;
	}
	
	var PatientClinicalData = {
			clinicalList : []
    }; 
  
	PatientClinicalData.clinicalList.push({
	 patientClinicalId:formId,
	 patientId:patientId,
	 date:date,
	 regNo: RegNo,
	 rtNo:RTNo,
	 diagnosis: Diagnosis,
	 histology:Histology,
	 stage:Stage,
	 tnm:TNM,
	 t:T,
	 n:N,
	 m:M,
	 historyAndFindings:HistoryAndFindings,
	 previousTreatment:PreviousTreatment,
	 surgery:Surgery,
	 chemotherapy:Chemotherapy,
	 radiotherapy:Radiotherapy,
	 countouringDetails:CountouringDetails,
	 radiationSummaryFrom:RadiationSummaryFrom,
	 radiationSummaryTo:RadiationSummaryTo,
	 brachyTherapy:BrachyTherapy,
	 finalDosageP1:FinalDosageP1,
	 finalDosageP2:FinalDosageP2,
	 finalDosageP3:FinalDosageP3,
	 gyP1:GYP1,
	 gyP2:GYP2,
	 gyP3:GYP3,
	 siteP1:SiteP1,
	 siteP2:SiteP2,
	 siteP3:SiteP3,
	 fractionDaysP1:FractionDaysP1,
	 fractionDaysP2:FractionDaysP2,
	 fractionDaysP3:FractionDaysP3,
	 causeOfGap:CauseOfGap,
	 protocol:Protocol,
	 intentionValues:intentionValues,
	 fractionationValues:fractionationValues,
	 evaluationValues:evaluationValues
  });
  
	PatientClinicalData=JSON.stringify(PatientClinicalData);
	
	var inputs = [];
	inputs.push('PatientClinicalData=' + PatientClinicalData);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/savePatientClinicalData",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
		},
		success : function(response) {
			alert(response);
			fetchPatientClinicalData();
		}
	});	
}


function fetchPatientClinicalData(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
  var date = $("#todays_date").val();
  var inputs = [];
	inputs.push('patientId=' + patientId);
	inputs.push('date=' + date);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/fetchPatientClinicalData",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
		},
		success : function(PatientClinicalData) {
			if(PatientClinicalData.clinicalList.length !=0){
			 
				$("#PatientClinicalDataId").val(PatientClinicalData.clinicalList[0].patientClinicalId);
				 $("#PCDregNotxt").val(PatientClinicalData.clinicalList[0].regNo);
				 $("#PCDrtNotxt").val(PatientClinicalData.clinicalList[0].rtNo);
				 $("#PCDdiagnosistxt").val(PatientClinicalData.clinicalList[0].diagnosis);
				 $("#PCDhistologytxt").val(PatientClinicalData.clinicalList[0].histology);
				 $("#PCDStagetxt").val(PatientClinicalData.clinicalList[0].stage);
				 $("#PCDTNMtxt").val(PatientClinicalData.clinicalList[0].tnm);
				 $("#PCDTtxt").val(PatientClinicalData.clinicalList[0].t);
				 $("#PCDNtxt").val(PatientClinicalData.clinicalList[0].n);
				 $("#PCDMtxt").val(PatientClinicalData.clinicalList[0].m); 
				  
				 $("#PCDHistoryNFinfingstxt").val(PatientClinicalData.clinicalList[0].historyAndFindings);
				 $("#prevtreatmentTA").val(PatientClinicalData.clinicalList[0].previousTreatment);
				 $("#SurgeryTA").val(PatientClinicalData.clinicalList[0].surgery);
				 $("#chemotherapyTA").val(PatientClinicalData.clinicalList[0].chemotherapy);
				 $("#radiotherapyTA").val(PatientClinicalData.clinicalList[0].radiotherapy);
				 $("#countouringDetailsTA").val(PatientClinicalData.clinicalList[0].countouringDetails);
				  
				 $("#RadioSummaryFrom").val(PatientClinicalData.clinicalList[0].radiationSummaryFrom);
				 $("#RadioSummaryTo").val(PatientClinicalData.clinicalList[0].radiationSummaryTo);
				  
				 $("#RadioSummaryFinalDosageP1").val(PatientClinicalData.clinicalList[0].finalDosageP1);
				 $("#RadioSummaryGYP1").val(PatientClinicalData.clinicalList[0].gyP1);
				 $("#RadioSummaryFractionP1").val(PatientClinicalData.clinicalList[0].fractionDaysP1);
				 $("#RadioSummarySiteP1").val(PatientClinicalData.clinicalList[0].siteP1);
				  
				 $("#RadioSummaryFinalDosageP2").val(PatientClinicalData.clinicalList[0].finalDosageP2);
				 $("#RadioSummaryGYP2").val(PatientClinicalData.clinicalList[0].gyP2);
				 $("#RadioSummaryFractionP2").val(PatientClinicalData.clinicalList[0].fractionDaysP2);
				 $("#RadioSummarySiteP2").val(PatientClinicalData.clinicalList[0].siteP2);
				  
				 $("#RadioSummaryFinalDosageP3").val(PatientClinicalData.clinicalList[0].finalDosageP3);
				 $("#RadioSummaryGYP3").val(PatientClinicalData.clinicalList[0].gyP3);
				 $("#RadioSummaryFractionP3").val(PatientClinicalData.clinicalList[0].fractionDaysP3);
				 $("#RadioSummarySiteP3").val(PatientClinicalData.clinicalList[0].siteP3);
				  
				 $("#RadioSummaryCOG").val(PatientClinicalData.clinicalList[0].causeOfGap);
				 $("input[name=Therapyplanned][value=" + PatientClinicalData.clinicalList[0].brachyTherapy + "]").attr('checked', 'checked');
				 $("input[name=protocol][value=" + PatientClinicalData.clinicalList[0].protocol + "]").attr('checked', 'checked');
				 
				 var arrIntention =PatientClinicalData.clinicalList[0].intentionValues.split('~');
					for(var j=0;j< (arrIntention.length - 1);j++){
						if(arrIntention[j].contains("Others#")){
							var others = arrIntention[j].split('Others#');
							$("input[class=checkIntention][value="+"Others"+"]").attr('checked', 'checked');
							$("#otherIntentionDiv").show();
							$("#otherIntentiontxt").val(others[1]);
						}else{
							$("input[class=checkIntention][value=" + arrIntention[j] + "]").attr('checked', 'checked');
						}
					}
					
				 var arrFractionation =PatientClinicalData.clinicalList[0].fractionationValues.split('~');
				 	for(var j=0;j< (arrFractionation.length - 1);j++){
						if(arrFractionation[j].contains("Others#")){
							var others = arrFractionation[j].split('Others#');
							$("input[class=checkFractionation][value="+"Others"+"]").attr('checked', 'checked');
							$("#otherFractionationDiv").show();
							$("#otherFractionationtxt").val(others[1]);
						}else{
							$("input[class=checkFractionation][value=" + arrFractionation[j] + "]").attr('checked', 'checked');
						}
					}
				 
			 	 var arrEvaluation =PatientClinicalData.clinicalList[0].evaluationValues.split('~');
				 	for(var j=0;j< (arrEvaluation.length - 1);j++){
						$("input[class=checkFinalEvaluation][value=" + arrEvaluation[j] + "]").attr('checked', 'checked');
					}	
			}
		}
	});	
}


function setOtherIntention(){
	var checkedIntention="";
	  checkedIntention = document.getElementsByClassName('checkIntention');
	  var flag=false;
	  for(var i=0; checkedIntention[i]; ++i){
	      if(checkedIntention[i].value == "Others" && checkedIntention[i].checked){
	    	  flag=true;
	      }
	  }
      if(flag){
    	  $("#otherIntentionDiv").show();
      }else {
    	  $("#otherIntentionDiv").hide();
      }
}


function setOtherFractionation(){
	var checkedFractionation="";
	checkedFractionation = document.getElementsByClassName('checkFractionation');
	 var flag =false; 
	  for(var i=0; checkedFractionation[i]; ++i){
	      if(checkedFractionation[i].value == "Others" && checkedFractionation[i].checked){
	    	 flag=true;
	      }
	  }
      if(flag){
    	  $("#otherFractionationDiv").show();
      }else {
    	  $("#otherFractionationDiv").hide();
      }
}


function setOrfitManualValue(){
	
	var checkImmobilized="";
	checkImmobilized = document.getElementsByClassName('checkImmobilized');
	  var flag=false;
	  for(var i=0; checkImmobilized[i]; ++i){
	      if(checkImmobilized[i].value == "ORFIT" && checkImmobilized[i].checked){
	    	  flag=true;
	      }
	  }
    if(flag){
  	  $("#ERTP_OrfitClampDiv").show();
    }else {
  	  $("#ERTP_OrfitClampDiv").hide();
    }
}


function setBMC_manualValue(){
	
	var checkBMC="";
	checkBMC = document.getElementsByClassName('checkBMC');
	
	  var flagWedge=false;
	  var flagBolus=false;
	  
	  for(var i=0; checkBMC[i]; ++i){
	      if(checkBMC[i].value == "Wedge" && checkBMC[i].checked){
	    	  flagWedge=true;
	      } 
	      if(checkBMC[i].value == "Bolus" && checkBMC[i].checked){
	    	  flagBolus=true;
	      }
	  }
	  
    if(flagWedge){
    	$("#ERTP_WedgeDiv").show();
    }else {
    	$("#ERTP_WedgeDiv").hide();
    }
    if(flagBolus){
    	  $("#ERTP_BolusDiv").show();
    }else {
    	  $("#ERTP_BolusDiv").hide();
    }
    
}


function saveExternalTreatmentPrescription(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
	var date =$("#todays_date").val();
	  
	  var prescription = $("#prescriptionTA").val();
	  var primary = $("#primaryTA").val();
	  var boost  = $("#boostTA").val();
	  
	  var ISO_Lat_x1 = $("#lat1").val();
	  var ISO_Lat_x2 = $("#lat2").val();
	  var ISO_Lat_x3 = $("#lat3").val();
	  
	  var ISO_Lon_y1 = $("#lon1").val();
	  var ISO_Lon_y2 = $("#lon2").val();
	  var ISO_Lon_y3 = $("#lon3").val();
	  
	  var ISO_Ver_z1 = $("#ver1").val();
	  var ISO_Ver_z2 = $("#ver2").val();
	  var ISO_Ver_z3 = $("#ver3").val();
	  
	  var treatmentSeperationAP = $("#SeperationAP").val();
	  var treatmentSeperationLat = $("#SeperationLat").val(); 
	  var armPosition = $("#ERTP_ArmPositiontxt").val();

	  var IndexerSlot = $("#ERTP_IndexerSlottxt").val();
	  var HeadRestNo = $("#ERTP_HeadRestNotxt").val();
	  var SSNtoChainDistance = $("#ERTP_SSNtoChainDistancetxt").val();
	  
	  var HeadRestValues = "";
	  var IntraoralProsthesis = $("#ERTP_IntraoralProsthesistxt").val();
	  var BladderProtocol = $("#ERTP_BladdersProtocoltxt").val();
	  var ConcChemotherapy = $("#ERTP_ConcChemotherapytxt").val();
	  
	  var BreastBoard = $("input[name=BreastBoard]:checked").val();
	  var BBWedgeNo = $("#ERTP_BBWedgeNotxt").val();
	  var BBSlotNo = $("#ERTP_BBSlotNotxt").val();
	  
	  var ShoulderRetractor = $("input[name=ShoulderRetractor]:checked").val();
	  var SRSlotNo = $("#ERTP_SRSlotNotxt").val();
	  
	  if(BreastBoard==undefined){
		  alert('Please tick "Yes" or "No" for Breast Board');
		  return false;
	  }
	  if(ShoulderRetractor==undefined){
		  alert('Please tick "Yes" or "No" for Shoulder Retractor');
		  return false;
	  }

	  var BasePlateValues = "";
	  var positionValues = "";
	  var OrientationValues = "";
	  var ImmobilizedDeviceValues = "";
	  var BMCValues = "";
	  var treatmentModeValues = "";
	  
	  var treatmentModechecked = document.getElementsByClassName('checkTreatMode');
	  for(var i=0; treatmentModechecked[i]; ++i){
	      if(treatmentModechecked[i].checked){
	    		  treatmentModeValues = treatmentModeValues + treatmentModechecked[i].value +"~";
	      }
	  }
	  
	  var checkedPosition = document.getElementsByClassName('checkPostion');
	  for(var i=0; checkedPosition[i]; ++i){
	      if(checkedPosition[i].checked){
	    	  positionValues = positionValues + checkedPosition[i].value +"~";
	      }
	  }
	  
	  var checkOrientation = document.getElementsByClassName('checkOrientation');
	  for(var i=0; checkOrientation[i]; ++i){
	      if(checkOrientation[i].checked){
	    	  OrientationValues = OrientationValues + checkOrientation[i].value +"~";
	      }
	  }
	  
	  var checkBasePlate = document.getElementsByClassName('checkBasePlate');
	  for(var i=0; checkBasePlate[i]; ++i){
	      if(checkBasePlate[i].checked){
	    	  BasePlateValues = BasePlateValues + checkBasePlate[i].value +"~";
	      }
	  }
	  
	  var checkHeadRest = document.getElementsByClassName('checkHeadRest');
	  for(var i=0; checkHeadRest[i]; ++i){
	      if(checkHeadRest[i].checked){
	    	  HeadRestValues = HeadRestValues + checkHeadRest[i].value +"~";
	      }
	  }
	  
	  var checkImmobilized = document.getElementsByClassName('checkImmobilized');
	  for(var i=0; checkImmobilized[i]; ++i){
	      if(checkImmobilized[i].checked){
	    	  if(checkImmobilized[i].value=="ORFIT"){
	    		  if($("#ERTP_OrfitClamptxt").val() !="" ){
	    			  ImmobilizedDeviceValues = ImmobilizedDeviceValues + "ORFIT#" +$("#ERTP_OrfitClamptxt").val()+"~";  
	    		  }else{
	    			  alert('Please fill the "ORFIT" field or untick the "ORFIT" checkbox');
	    			  $("#ERTP_OrfitClamptxt").focus();
	    			  return false;	
	    		  }
	    	  }else{
	    		  ImmobilizedDeviceValues = ImmobilizedDeviceValues + checkImmobilized[i].value +"~";
	    	  }
	      }
	  }
	  
	  var checkBMC = document.getElementsByClassName('checkBMC');
	  for(var i=0; checkBMC[i]; ++i){
	      if(checkBMC[i].checked){
	    	  if(checkBMC[i].value=="Wedge"){
	    		  if( $("#ERTP_Wedgetxt").val() !="" ){
	    			  BMCValues = BMCValues +"Wedge#"+$("#ERTP_Wedgetxt").val()+"~";
	    			  
	    		  }else{
	    			  alert('Please fill the "Wedge" field or untick the "Wedge" checkbox');
	    			  $("#ERTP_Wedgetxt").focus();
	    			  return false; 
	    		  }
	    	  }else if(checkBMC[i].value=="Bolus"){
	    		  if( $("#ERTP_Bolustxt").val() !="" ){
	    			  BMCValues = BMCValues +"Bolus#"+$("#ERTP_Bolustxt").val()+"~";
	    		  }else{
	    			  alert('Please fill the "Bolus" field or untick the "Bolus" checkbox');
	    			  $("#ERTP_Bolustxt").focus();
	    			  return false; 
	    		  }
	    	  }else{
	    		  BMCValues = BMCValues + checkBMC[i].value +"~";
	    	  }
	      }
	  }
	  
	var RadiationUnit =  $("#ERTP_RadiationUnittxt").val();
	var ProvisionalTotalDose =  $("#ERTP_ProvisionalTotalDosetxt").val();
	var Phase1 =  $("#ERTP_Phase1txt").val();
	var Phase2 =  $("#ERTP_Phase2txt").val();
	var Phase3 =  $("#ERTP_Phase3txt").val();
	var ProvisionalOverallTime =  $("#ERTP_ProvisionalOverallTimetxt").val();
	var Fractionation =  $("#ERTP_Fractionationtxt").val();
	var Brachytherapy =  $("#ERTP_Brachytherapytxt").val();
	var id =  $("#treatmentPrescriptionId").val();
	
	
	var TreatmentPrescription = {
			setupList : []
    }; 
	TreatmentPrescription.setupList.push({
		treatmentPrescriptionId:id,
		patientId:patientId,
		date:date,
		prescription:prescription,
		primary:primary,
		boost:boost,
		
		isoLatX1:ISO_Lat_x1,
		isoLatX2:ISO_Lat_x2,
		isoLatX3:ISO_Lat_x3,
		
		isoLonY1:ISO_Lon_y1,
		isoLonY2:ISO_Lon_y2,
		isoLonY3:ISO_Lon_y3,
		
		isoVerZ1:ISO_Ver_z1,
		isoVerZ2:ISO_Ver_z2,
		isoVerZ3:ISO_Ver_z3,
		
		treatmentModeValues:treatmentModeValues,
		positionValues:positionValues,
		orientationValues:OrientationValues,
		basePlateValues:BasePlateValues,
		headRestValues:HeadRestValues,
		immobilizedDeviceValues:ImmobilizedDeviceValues,
		bmcValues:BMCValues,
		
		treatmentSeperationAP:treatmentSeperationAP,
		treatmentSeperationLat:treatmentSeperationLat,
		armPosition:armPosition,
		indexerSlot:IndexerSlot,

		headRestNo:HeadRestNo,
		ssnToChainDistance:SSNtoChainDistance,
		intraoralProsthesis:IntraoralProsthesis,
		bladderProtocol:BladderProtocol,
		concChemotherapy:ConcChemotherapy,
		breastBoard:BreastBoard,
		bbWedgeNo:BBWedgeNo,
		bbSlotNo:BBSlotNo,
		shoulderRetractor:ShoulderRetractor,
		srSlotNo:SRSlotNo,
		
		radiationUnit:RadiationUnit,
		provisionalTotalDose:ProvisionalTotalDose,
		phase1:Phase1,
		phase2:Phase2,
		phase3:Phase3,
		provisionalOverallTime:ProvisionalOverallTime,
		fractionation:Fractionation,
		brachytherapy:Brachytherapy
		
	});
	
	TreatmentPrescription=JSON.stringify(TreatmentPrescription);
	var inputs = [];
	inputs.push('TreatmentPrescription=' + TreatmentPrescription);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/saveExternalPrescription",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
		},
		success : function(response) {
			alert(response);
			fetchExternalTreatmentPrescription();
		}
	});	
}


function fetchExternalTreatmentPrescription(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
  var date = $("#todays_date").val();
  var inputs = [];
	inputs.push('patientId=' + patientId);
	inputs.push('date=' + date);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/fetchExternalPrescription",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
		},
		success : function(TreatmentPrescription) {
			
			if(TreatmentPrescription.setupList.length !=0){
				
				 $("#treatmentPrescriptionId").val(TreatmentPrescription.setupList[0].treatmentPrescriptionId);
				 $("#prescriptionTA").val(TreatmentPrescription.setupList[0].prescription);
				 $("#primaryTA").val(TreatmentPrescription.setupList[0].primary);
				 $("#boostTA").val(TreatmentPrescription.setupList[0].boost);
				
				 $("#lat1").val(TreatmentPrescription.setupList[0].isoLatX1);
				 $("#lat2").val(TreatmentPrescription.setupList[0].isoLatX2);
				 $("#lat3").val(TreatmentPrescription.setupList[0].isoLatX3);
				  
				 $("#lon1").val(TreatmentPrescription.setupList[0].isoLonY1);
				 $("#lon2").val(TreatmentPrescription.setupList[0].isoLonY2);
				 $("#lon3").val(TreatmentPrescription.setupList[0].isoLonY3);
				  
				 $("#ver1").val(TreatmentPrescription.setupList[0].isoVerZ1);
				 $("#ver2").val(TreatmentPrescription.setupList[0].isoVerZ2);
				 $("#ver3").val(TreatmentPrescription.setupList[0].isoVerZ3);
				  
				 $("#SeperationAP").val(TreatmentPrescription.setupList[0].treatmentSeperationAP);
				 $("#SeperationLat").val(TreatmentPrescription.setupList[0].treatmentSeperationLat); 
				 $("#ERTP_ArmPositiontxt").val(TreatmentPrescription.setupList[0].armPosition);

				 $("#ERTP_IndexerSlottxt").val(TreatmentPrescription.setupList[0].indexerSlot);
				 $("#ERTP_HeadRestNotxt").val(TreatmentPrescription.setupList[0].headRestNo);
				 $("#ERTP_SSNtoChainDistancetxt").val(TreatmentPrescription.setupList[0].ssnToChainDistance);
				  
				 $("#ERTP_IntraoralProsthesistxt").val(TreatmentPrescription.setupList[0].intraoralProsthesis);
				 $("#ERTP_BladdersProtocoltxt").val(TreatmentPrescription.setupList[0].bladderProtocol);
				 $("#ERTP_ConcChemotherapytxt").val(TreatmentPrescription.setupList[0].concChemotherapy);
				  
				 $("#ERTP_BBWedgeNotxt").val(TreatmentPrescription.setupList[0].bbWedgeNo);
				 $("#ERTP_BBSlotNotxt").val(TreatmentPrescription.setupList[0].bbSlotNo);
				  
				$("#ERTP_SRSlotNotxt").val(TreatmentPrescription.setupList[0].srSlotNo);
				$("#ERTP_RadiationUnittxt").val(TreatmentPrescription.setupList[0].radiationUnit);
				$("#ERTP_ProvisionalTotalDosetxt").val(TreatmentPrescription.setupList[0].provisionalTotalDose);
				$("#ERTP_Phase1txt").val(TreatmentPrescription.setupList[0].phase1);
				$("#ERTP_Phase2txt").val(TreatmentPrescription.setupList[0].phase2);
				$("#ERTP_Phase3txt").val(TreatmentPrescription.setupList[0].phase3);
				$("#ERTP_ProvisionalOverallTimetxt").val(TreatmentPrescription.setupList[0].provisionalOverallTime);
				$("#ERTP_Fractionationtxt").val(TreatmentPrescription.setupList[0].fractionation);
				$("#ERTP_Brachytherapytxt").val(TreatmentPrescription.setupList[0].brachytherapy);
				 
				 $("input[name=BreastBoard][value="+TreatmentPrescription.setupList[0].breastBoard+"]").attr('checked', 'checked');
				 $("input[name=ShoulderRetractor][value="+TreatmentPrescription.setupList[0].shoulderRetractor+"]").attr('checked', 'checked');
				 
				 var arrHeadRest =TreatmentPrescription.setupList[0].headRestValues.split('~');
					for(var j=0;j< (arrHeadRest.length - 1);j++){
							$("input[class=checkHeadRest][value="+arrHeadRest[j]+"]").attr('checked', 'checked');
						
					}
				var arrOrient =TreatmentPrescription.setupList[0].orientationValues.split('~');
					for(var j=0;j< (arrOrient.length - 1);j++){
							$("input[class=checkOrientation][value="+arrOrient[j]+"]").attr('checked', 'checked');
						
					}	
				var arrbase =TreatmentPrescription.setupList[0].basePlateValues.split('~');
				for(var j=0;j< (arrbase.length - 1);j++){
						$("input[class=checkBasePlate][value="+arrbase[j]+"]").attr('checked', 'checked');
					
					}
				
				var arrPosition =TreatmentPrescription.setupList[0].positionValues.split('~');
				for(var j=0;j< (arrPosition.length - 1);j++){
						$("input[class=checkPostion][value="+arrPosition[j]+"]").attr('checked', 'checked');
					
				}
				
				var arrMode =TreatmentPrescription.setupList[0].treatmentModeValues.split('~');
				for(var j=0;j< (arrMode.length - 1);j++){
						$("input[class=checkTreatMode][value="+arrMode[j]+"]").attr('checked', 'checked');
					
				}	
				var arrImmobilized =TreatmentPrescription.setupList[0].immobilizedDeviceValues.split('~');
				for(var j=0;j< (arrImmobilized.length - 1);j++){
					if(arrImmobilized[j].contains("ORFIT#")){
						var others = arrImmobilized[j].split('ORFIT#');
						$("input[class=checkImmobilized][value="+"ORFIT"+"]").attr('checked', 'checked');
						$("#ERTP_OrfitClampDiv").show();
						$("#ERTP_OrfitClamptxt").val(others[1]);
					}else{
						$("input[class=checkImmobilized][value="+arrImmobilized[j]+"]").attr('checked', 'checked');
					}
				}	
				
				var arrBMC =TreatmentPrescription.setupList[0].bmcValues.split('~');
				for(var j=0;j< (arrBMC.length - 1);j++){
					if(arrBMC[j].contains("Wedge#")){
						var others = arrBMC[j].split('Wedge#');
						$("input[class=checkBMC][value="+"Wedge"+"]").attr('checked', 'checked');
						$("#ERTP_WedgeDiv").show();
						$("#ERTP_Wedgetxt").val(others[1]);
					}else if(arrBMC[j].contains("Bolus#")){
						var others = arrBMC[j].split('Bolus#');
						$("input[class=checkBMC][value="+"Bolus"+"]").attr('checked', 'checked');
						$("#ERTP_BolusDiv").show();
						$("#ERTP_Bolustxt").val(others[1]);
					}else{
						$("input[class=checkBMC][value="+arrBMC[j]+"]").attr('checked', 'checked');
					}
				}		
			}
		}
	});	
}


function saveTreatmentTherapy(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
	var date = $("#todays_date").val();
	var rows = $("#rowCountTherapy").val();
	
	var TreatmentTherapy = {
			therapyList : []
    }; 
	if(rows == 0){
		alert("Please insert atleast a row and then save ...!");
		return false;
	}
		
	for(var i=1;i<= rows ;i++ ){
		
		var id = $("#idTherapyRecord"+i).val();
		if(id == undefined)
			continue;
		
		var therapyDate= $("#therapyDate"+i).val();
		var energy = $("#energy"+i).val();
		var skinSize = $("#fieldSizeSkin"+i).val();
		var tumourSize = $("#fieldSizeTumour"+i).val();
		var depth = $("#depthtxt"+i).val();
		var wedge = $("#wedgetxt"+i).val();
		var gantry = $("#gantrytxt"+i).val();
		var collAngle = $("#collAngle"+i).val();
		var couchAngle = $("#couchAngle"+i).val();
		var doseFraction = $("#doseFraction"+i).val();
		var treatmentTime = $("#treatmentTime"+i).val();
		TreatmentTherapy.therapyList.push({
			
			treatmentTherapyId:id,
			patientId:patientId,
			date:date,
			
			therapyDate:therapyDate,
			energy:energy,
			skinSize:skinSize,
			tumourSize:tumourSize,
			depth:depth,
			wedge:wedge,
			gantry:gantry,
			collAngle:collAngle,
			couchAngle:couchAngle,
			doseFraction:doseFraction,
			treatmentTime:treatmentTime
		});
	}
	
	TreatmentTherapy=JSON.stringify(TreatmentTherapy); 
	var inputs = [];
	inputs.push('TreatmentTherapy=' + TreatmentTherapy);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/saveTreatmentTherapy",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			fetchTreatmentTherapy();
		}
	});
}


function fetchTreatmentTherapy(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
	var date = $("#todays_date").val();
	var inputs = [];
	inputs.push('patientId=' + patientId);
	inputs.push('date=' + date);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/fetchTreatmentTherapy",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(TreatmentTherapy) {
			if(TreatmentTherapy.therapyList.length !=0){
				$("#rowCountTherapy").val(TreatmentTherapy.therapyList.length);
				var rowCount=0; 
				var htm ='';
				for(var i=0;i<TreatmentTherapy.therapyList.length;i++){
					
					rowCount=i+1;
					htm = htm+'<tr id="TherapyRowNo'+rowCount+'"><th><label>'+ rowCount+'.</label> </th>'
					+ '<th><input id="therapyDate'+ rowCount+'" class="form-control input-SmallText col-md-12-1" type="text" style="margin-top:0px;" '
					+ ' readonly="readonly" onclick=displayCalendar(document.getElementById(this.id),\"dd/mm/yyyy\",this) value="'+TreatmentTherapy.therapyList[i].therapyDate+'" name="therapyDate"></th>'
					+ '<th><input class="form-control input-SmallText  TextFont" id="energy'+ rowCount+'" value="'+TreatmentTherapy.therapyList[i].energy+'" type="text"></th>'
					+ '<th><input class="form-control input-SmallText  TextFont" id="fieldSizeSkin'+ rowCount+'" value="'+TreatmentTherapy.therapyList[i].skinSize+'" type="text"></th>'
					+ '<th><input class="form-control input-SmallText  TextFont" id="fieldSizeTumour'+ rowCount+'" value="'+TreatmentTherapy.therapyList[i].tumourSize+'" type="text"></th>'
					+ '<th><input class="form-control input-SmallText  TextFont" id="depthtxt'+ rowCount+'" value="'+TreatmentTherapy.therapyList[i].depth+'" type="text"></th>'
					+ '<th><input class="form-control input-SmallText  TextFont" id="wedgetxt'+ rowCount+'" value="'+TreatmentTherapy.therapyList[i].wedge+'" type="text"></th>'
					+ '<th><input class="form-control input-SmallText  TextFont" id="gantrytxt'+ rowCount+'" value="'+TreatmentTherapy.therapyList[i].gantry+'" type="text"></th>'
					+ '<th><input class="form-control input-SmallText  TextFont" id="collAngle'+ rowCount+'" value="'+TreatmentTherapy.therapyList[i].collAngle+'" type="text"></th>'
					+ '<th><input class="form-control input-SmallText  TextFont" id="couchAngle'+ rowCount+'" value="'+TreatmentTherapy.therapyList[i].couchAngle+'" type="text"></th>'
					+ '<th><input class="form-control input-SmallText  TextFont" id="doseFraction'+ rowCount+'" value="'+TreatmentTherapy.therapyList[i].doseFraction+'" type="text"></th>'
					+ '<th><input class="form-control input-SmallText  TextFont" id="treatmentTime'+ rowCount+'" value="'+TreatmentTherapy.therapyList[i].treatmentTime+'" type="text"></th>'
					+ '<th><input id="checkTherapyRecord" type="checkbox" name="checkTherapyRecord'+ rowCount+'">'
					+ '<input id="idTherapyRecord'+ rowCount+'" value="'+TreatmentTherapy.therapyList[i].treatmentTherapyId+'" type="hidden" value="0"></th></tr>';
				}
				$("#therapyTBody").html(htm);
			}
		}
	});
}


function deleteTherapyRecord(id){
	
	var inputs = [];
	inputs.push('id=' + id);
	 
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/deleteTherapyRecord",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert("error");
		},
		success : function(response) {
			alert(response);
		}
	});
}


function saveChecklistForTechnologist(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
	var date = $("#todays_date").val();
	
	var TechnologistChecklist = {
			checkList : []
    }; 
	var id=$("#technoChecklistId").val();
	var technoChecklistDate = $("#technoChecklistDate").val();
	var dateWiseTechSign = $("#dateWiseTechSign").val();
	var dateWiseTOSign = $("#dateWiseTOSign").val();
	var weeklyTechSign = $("#weeklyTechSign").val();
	var weeklyTOSign = $("#weeklyTOSign").val();
	var technoInstructions = $("#technoInstructionsTA").val();
	
	var dateWiseValues = "";
	var reviewByDate = document.getElementsByClassName('reviewByDate');
	  for(var i=0; reviewByDate[i]; ++i){
	      if(reviewByDate[i].checked){
	    	  dateWiseValues = dateWiseValues + reviewByDate[i].value +"~";
	      }
	  }
	var weeklyValues = "";
	var weeklyReview = document.getElementsByClassName('weeklyReview');
	  for(var i=0; weeklyReview[i]; ++i){
	      if(weeklyReview[i].checked){
	    	  weeklyValues = weeklyValues + weeklyReview[i].value +"~";
	      }
	  }  
	
	TechnologistChecklist.checkList.push({
		
		technoChecklistId:id,
		patientId:patientId,
		date:date,
		
		technoDate:technoChecklistDate,
		dateWiseTechSign:dateWiseTechSign,
		dateWiseTOSign:dateWiseTOSign,
		weeklyTechSign:weeklyTechSign,
		weeklyTOSign:weeklyTOSign,
		instructions:technoInstructions,
		dailyReviews:dateWiseValues,
		weeklyReviews:weeklyValues
	});
	
	TechnologistChecklist=JSON.stringify(TechnologistChecklist); 
	var inputs = [];
	inputs.push('TechnologistChecklist=' + TechnologistChecklist);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/saveChecklistForTechnologist",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			fetchChecklistForTechnologist();
		}
	});
}


function fetchChecklistForTechnologist(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
	var date = $("#todays_date").val();
	var inputs = [];
	inputs.push('patientId=' + patientId);
	inputs.push('date=' + date);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/fetchChecklistForTechnologist",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(Technologist) {
			if(Technologist.checkList.length !=0){
				
				$("#technoChecklistId").val(Technologist.checkList[0].technoChecklistId);
				$("#technoChecklistDate").val(Technologist.checkList[0].technoDate);
				$("#dateWiseTechSign").val(Technologist.checkList[0].dateWiseTechSign);
				$("#dateWiseTOSign").val(Technologist.checkList[0].dateWiseTOSign);
				$("#weeklyTechSign").val(Technologist.checkList[0].weeklyTechSign);
				$("#weeklyTOSign").val(Technologist.checkList[0].weeklyTOSign);
				$("#technoInstructionsTA").val(Technologist.checkList[0].instructions);
				daily = Technologist.checkList[0].dailyReviews.split('~');
				weekly = Technologist.checkList[0].weeklyReviews.split('~');
				
				for(var j=0;j< (daily.length - 1);j++){
						$("input[class=reviewByDate][value="+daily[j]+"]").attr('checked', 'checked');
				}
				for(var j=0;j< (weekly.length - 1);j++){
						$("input[class=weeklyReview][value="+weekly[j]+"]").attr('checked', 'checked');
				}
			}
		}
	});
}


function saveAudit(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
	var date = $("#todays_date").val();
	var rows = $("#rowCountAudit").val();
	var Audit = {
			auditList : []
    }; 
	for(var i=1;i<=rows;i++){
		var id= $("#idAuditRecord"+i).val();
		if(id==undefined)
			continue;
		var auditDate= $("#auditDate"+i).val();
		var auditRemark= $("#auditRemark"+i).val();
		var auditSign= $("#auditSign"+i).val();
		
		Audit.auditList.push({
			auditId:id,
			patientId:patientId,
			date:date,
			auditDate:auditDate,
			auditRemark:auditRemark,
			auditSign:auditSign
		});
	}
	
	Audit=JSON.stringify(Audit); 
	var inputs = [];
	inputs.push('Audit=' + Audit);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/saveAudit",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			fetchAudit();
		}
	});
}


function fetchAudit(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		return false;
	}
	
	var date = $("#todays_date").val();
	var inputs = [];
	inputs.push('patientId=' + patientId);
	inputs.push('date=' + date);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/fetchAudit",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(Audit) {
			
			if(Audit.auditList.length !=0){
				$("#rowCountAudit").val(Audit.auditList.length);
				var rowCount=0; 
				var htm ='';
				for(var i=0;i<Audit.auditList.length;i++){
					
					rowCount=i+1;
					htm = htm+'<tr id="AuditRowNo'+ rowCount+'" ><th><label>'+ rowCount+'.</label> </th>'
					+ '<th><input id="auditDate'+ rowCount+'" value="'+Audit.auditList[i].auditDate+'" class="form-control input-SmallText col-md-12-1" type="text" style="margin-top:0px;" '
					+ ' readonly="readonly" onclick=displayCalendar(document.getElementById(this.id),\"dd/mm/yyyy\",this) name="auditDate"></th>'
					+ '<td><input id="auditRemark'+ rowCount+'"  value="'+Audit.auditList[i].auditRemark+'"class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="auditSign'+ rowCount+'"  value="'+Audit.auditList[i].auditSign+'"class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="checkboxAudit" type="checkbox" name="checkboxAudit'+ rowCount+'">'
					+ '<input id="idAuditRecord'+ rowCount+'"  value="'+Audit.auditList[i].auditId+'"type="hidden" value="0"></td></tr>';
					
				}
				$("#auditTBody").html(htm);
			}
		}
	});
}


function deleteAuditRecord(id){
	
	var inputs = [];
	inputs.push('id=' + id);
	 
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/deleteAuditRecord",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert("error");
		},
		success : function(response) {
			alert(response);
		}
	});

}


function saveDailyTreatment(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
	var date = $("#todays_date").val();
	var rows = $("#rowCountDailyTreatment").val();
	var DailyTreatment = {
			treatmentList : []
    }; 
	for(var i=1;i<=rows;i++){
		var id= $("#idDailyTreatmentRecord"+i).val();
		if(id==undefined)
			continue;
		var DTRDate= $("#dailyTreatmentDate"+i).val();
		var unit= $("#unittxt"+i).val();
		var tumorDose= $("#tumorDosetxt"+i).val();
		
		var f1MU= $("#f1Mu"+i).val();
		var f1TD= $("#f1Td"+i).val();
		var f2MU= $("#f2Mu"+i).val();
		var f2TD= $("#f2Td"+i).val();
		var f3MU= $("#f3Mu"+i).val();
		var f3TD= $("#f3Td"+i).val();
		var f4MU= $("#f4Mu"+i).val();
		var f4TD= $("#f4Td"+i).val();
		var f5MU= $("#f5Mu"+i).val();
		var f5TD= $("#f5Td"+i).val();
		var f6MU= $("#f6Mu"+i).val();
		var f6TD= $("#f6Td"+i).val();
		var f7MU= $("#f7Mu"+i).val();
		var f7TD= $("#f7Td"+i).val();
		var f8MU= $("#f8Mu"+i).val();
		var f8TD= $("#f8Td"+i).val();
		var f9MU= $("#f9Mu"+i).val();
		var f9TD= $("#f9Td"+i).val();
		var f10MU= $("#f10Mu"+i).val();
		var f10TD= $("#f10Td"+i).val();
		
		
		DailyTreatment.treatmentList.push({
			dailyTreatmentId:id,
			patientId:patientId,
			date:date,
			
			treatmentDate:DTRDate,
			unit:unit,
			tumorDose:tumorDose,
			
			f1MU:f1MU,
			f2MU:f2MU,
			f3MU:f3MU,
			f4MU:f4MU,
			f5MU:f5MU,
			f6MU:f6MU,
			f7MU:f7MU,
			f8MU:f8MU,
			f9MU:f9MU,
			f10MU:f10MU,
			
			f1TD:f1TD,
			f2TD:f2TD,
			f3TD:f3TD,
			f4TD:f4TD,
			f5TD:f5TD,
			f6TD:f6TD,
			f7TD:f7TD,
			f8TD:f8TD,
			f9TD:f9TD,
			f10TD:f10TD
		});
	}
	
	DailyTreatment=JSON.stringify(DailyTreatment); 
	var inputs = [];
	inputs.push('DailyTreatment=' + DailyTreatment);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/saveDailyTreatment",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			fetchDailyTreatment();
		}
	});
}


function fetchDailyTreatment(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		return false;
	}
	
	var date = $("#todays_date").val();
	var inputs = [];
	inputs.push('patientId=' + patientId);
	inputs.push('date=' + date);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/fetchDailyTreatment",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(DailyTreatment) {
			
			if(DailyTreatment.treatmentList.length !=0){
				
				$("#rowCountDailyTreatment").val(DailyTreatment.treatmentList.length);
				var rowCount=0; 
				var htm ='';
				for(var i=0;i<DailyTreatment.treatmentList.length;i++){
					
					rowCount=i+1;
					htm = htm+'<tr id="dailyTreatmentRowNo'+ rowCount+'"><td><label>'+ rowCount+'.</label> </td>'
					+ '<td><input id="dailyTreatmentDate'+ rowCount+'" class="form-control input-SmallText col-md-12-1" type="text" style="margin-top:0px;" '
					+ ' readonly="readonly" onclick=displayCalendar(document.getElementById(this.id),\"dd/mm/yyyy\",this) value="'+DailyTreatment.treatmentList[i].treatmentDate+'" name="dailyTreatmentDate"></td>'
					+ '<td><input id="unittxt'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].unit+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="tumorDosetxt'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].tumorDose+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f1Mu'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f1MU+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f1Td'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f1TD+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f2Mu'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f2MU+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f2Td'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f2TD+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f3Mu'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f3MU+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f3Td'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f3TD+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f4Mu'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f4MU+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f4Td'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f4TD+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f5Mu'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f5MU+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f5Td'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f5TD+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f6Mu'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f6MU+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f6Td'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f6TD+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f7Mu'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f7MU+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f7Td'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f7TD+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f8Mu'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f8MU+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f8Td'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f8TD+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f9Mu'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f9MU+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f9Td'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f9TD+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f10Mu'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f10MU+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="f10Td'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].f10TD+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="checkboxDailyTreatment" type="checkbox" name="checkboxDailyTreatment'+ rowCount+'">'
					+ '<input id="idDailyTreatmentRecord'+ rowCount+'" value="'+DailyTreatment.treatmentList[i].dailyTreatmentId+'" type="hidden" value="0"></td></tr>';	
					
				}
				$("#dailyTreatmentTBody").html(htm);
			}
		}
	});
}


function deleteDailyTreatmentRecord(id){
	
	var inputs = [];
	inputs.push('id=' + id);
	 
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/deleteDailyTreatmentRecord",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert("error");
		},
		success : function(response) {
			alert(response);
		}
	});
}


function savePortalVerification(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
	var date = $("#todays_date").val();
	var rows = $("#rowCountPortal").val();
	
	var PortalVerification = {
			verificationList : []
    }; 
	
	for(var i=1;i<=rows;i++){
		
		var id = $("#idPortalVerificationRecord"+i).val();
		if(id==undefined)
			continue;
		var portalDate = $("#portalVerificationDate"+i).val();
		var imageAP = $("#imageAP"+i).val();
		var imageLat = $("#imageLat"+i).val();
		var kvBased = $("#KVBased"+i).val();
		var mvBased = $("#MVBased"+i).val();
		var errorX = $("#errorX"+i).val();
		var errorY = $("#errorY"+i).val();
		var errorZ = $("#errorZ"+i).val();
		var correctionX = $("#correctionX"+i).val();
		var correctionY = $("#correctionY"+i).val();
		var correctionZ = $("#correctionZ"+i).val();
		var rttSign = $("#rttSign"+i).val();
		var phySign = $("#phySign"+i).val();
		
		PortalVerification.verificationList.push({
			portalVerificationId:id,
			
			patientId: patientId,
			date: date,
			
			portalDate:portalDate,
			imageAP:imageAP,
			imageLat: imageLat,
			kvBased: kvBased,
			mvBased: mvBased,
			errorX: errorX,
			errorY: errorY,
			errorZ: errorZ,
			correctionX: correctionX,
			correctionY: correctionY,
			correctionZ: correctionZ,
			rttSign: rttSign,
			phySign: phySign
			
		});
	}
	
	PortalVerification=JSON.stringify(PortalVerification); 
	var inputs = [];
	inputs.push('PortalVerification=' + PortalVerification);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/savePortalVerification",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			fetchPortalVerification();
		}
	});	
}


function fetchPortalVerification(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		return false;
	}
	
	var date = $("#todays_date").val();
	var inputs = [];
	inputs.push('patientId=' + patientId);
	inputs.push('date=' + date);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/fetchPortalVerification",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(PortalVerification) {
			
			if(PortalVerification.verificationList.length !=0){
				
				$("#rowCountPortal").val(PortalVerification.verificationList.length);
				var rowCount=0;
				var htm ='';
				for(var i=0;i<PortalVerification.verificationList.length;i++){
					rowCount=i+1;
				 	htm = htm + '<tr id="portalVerificationRowNo'+ rowCount+'"><th><label>'+ rowCount+'.</label> </th>'
						+ '<th><input id="portalVerificationDate'+ rowCount+'" class="form-control input-SmallText col-md-12-1" type="text" style="margin-top:0px;" '
						+ ' readonly="readonly" onclick=displayCalendar(document.getElementById(this.id),\"dd/mm/yyyy\",this) value="'+PortalVerification.verificationList[i].portalDate+'" name="portalVerificationDate"></th>'
						+ '<td><input id="imageAP'+ rowCount+'" value="'+PortalVerification.verificationList[i].imageAP+'" class="form-control input-SmallText TextFont" type="text"></td>'
						+ '<td><input id="imageLat'+ rowCount+'" value="'+PortalVerification.verificationList[i].imageLat+'" class="form-control input-SmallText TextFont" type="text"></td>'
						+ '<td><input id="KVBased'+ rowCount+'" value="'+PortalVerification.verificationList[i].kvBased+'" class="form-control input-SmallText TextFont" type="text"></td>'
						+ '<td><input id="MVBased'+ rowCount+'" value="'+PortalVerification.verificationList[i].mvBased+'" class="form-control input-SmallText TextFont" type="text"></td>'
						+ '<td><input id="errorX'+ rowCount+'"  value="'+PortalVerification.verificationList[i].errorX+'"class="form-control input-SmallText TextFont" type="text"></td>'
						+ '<td><input id="errorY'+ rowCount+'"  value="'+PortalVerification.verificationList[i].errorY+'"class="form-control input-SmallText TextFont" type="text"></td>'
						+ '<td><input id="errorZ'+ rowCount+'"  value="'+PortalVerification.verificationList[i].errorZ+'"class="form-control input-SmallText TextFont" type="text"></td>'
						+ '<td><input id="correctionX'+ rowCount+'"  value="'+PortalVerification.verificationList[i].correctionX+'"class="form-control input-SmallText TextFont" type="text"></td>'
						+ '<td><input id="correctionY'+ rowCount+'" value="'+PortalVerification.verificationList[i].correctionY+'" class="form-control input-SmallText TextFont" type="text"></td>'
						+ '<td><input id="correctionZ'+ rowCount+'" value="'+PortalVerification.verificationList[i].correctionZ+'" class="form-control input-SmallText TextFont" type="text"></td>'
						+ '<td><input id="rttSign'+ rowCount+'"  value="'+PortalVerification.verificationList[i].rttSign+'"class="form-control input-SmallText TextFont" type="text"></td>'
						+ '<td><input id="phySign'+ rowCount+'"  value="'+PortalVerification.verificationList[i].phySign+'"class="form-control input-SmallText TextFont" type="text"></td>'
						+ '<td><input id="checkboxPortalVerification" type="checkbox" name="checkboxPortalVerification'+ rowCount+'">'
						+ '<input id="idPortalVerificationRecord'+ rowCount+'"  value="'+PortalVerification.verificationList[i].portalVerificationId+'" type="hidden" value="0"></td>';

				}
				$("#portalVerificationTBody").html(htm);
			}
		}
	});
}


function deleteVerificationRecord(id){
	
	var inputs = [];
	inputs.push('id=' + id);
	 
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/deleteVerificationRecord",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert("error");
		},
		success : function(response) {
			alert(response);
		}
	});
}


function savePatientReview(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
	var date = $("#todays_date").val();
	var rows = $("#rowCountPatientReview").val();
	
	var PatientReview = {
			reviewList : []
    }; 
	
	for(var i=1;i<=rows;i++){
		
		var id = $("#idPatientReviewRecord"+i).val();
		if(id==undefined)
			continue;
		var reviewDate = $("#patientReviewDate"+i).val();
		var findingsNtoxicity = $("#findingsNToxicity"+i).val();
		var advice = $("#patientAdvice"+i).val();
		
		PatientReview.reviewList.push({
			patientReviewId:id,
			patientId: patientId,
			date: date,
			
			reviewDate: reviewDate,
			findingsNtoxicity: findingsNtoxicity,
			advice: advice 
		});
	}	
	
	PatientReview=JSON.stringify(PatientReview); 
	var inputs = [];
	inputs.push('PatientReview=' + PatientReview);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/savePatientReview",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			fetchPatientReview();
		}
	});	
}


function fetchPatientReview(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
	var date = $("#todays_date").val();
	
	var inputs = [];
	inputs.push('date=' + date);
	inputs.push('patientId=' + patientId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/fetchPatientReview",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(PatientReview) {
			
			if(PatientReview.reviewList.length !=0){
				
				$("#rowCountPatientReview").val(PatientReview.reviewList.length);
				var rowCount=0;
				var htm ='';
				for(var i=0;i<PatientReview.reviewList.length;i++){
					rowCount=i+1;
				 	htm = htm + '<tr id="patientReviewRowNo'+ rowCount+'"><th><label>'+ rowCount+'.</label> </th>'
					+ '<th><input id="patientReviewDate'+ rowCount+'" value="'+PatientReview.reviewList[i].reviewDate+'" class="form-control input-SmallText col-md-12-1" type="text" style="margin-top:0px;" '
					+ ' readonly="readonly" onclick=displayCalendar(document.getElementById(this.id),\"dd/mm/yyyy\",this) value="" name="patientReviewDate"></th>'
					+ '<td><input id="findingsNToxicity'+ rowCount+'"  value="'+PatientReview.reviewList[i].findingsNtoxicity+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="patientAdvice'+ rowCount+'"  value="'+PatientReview.reviewList[i].advice+'" class="form-control input-SmallText TextFont" type="text"></td>'
					+ '<td><input id="checkboxPatientReview" type="checkbox" name="checkboxPatientReview'+ rowCount+'">'
					+ '<input id="idPatientReviewRecord'+ rowCount+'"  value="'+PatientReview.reviewList[i].patientReviewId+'" type="hidden" value="0"></td></tr>';
					
				}
				$("#patientReviewTBody").html(htm);
			}
		}
	});	
}


function deleteReviewRecord(id){

	var inputs = [];
	inputs.push('id=' + id);
	 
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/deleteReviewRecord",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert("error");
		},
		success : function(response) {
			alert(response);
		}
	});
}


function toCreatePhyCalRow(){

 	var rowCount = $("#rowCountPhysicsCal").val();

 	if (rowCount == -1) {
 		rowCount = 0;
 	}
 	rowCount++;
 	rowId = "physicsCalRowNo" + rowCount;
 	var x = document.createElement('tr');
 	x.setAttribute('id', rowId);
 	document.getElementById("physicsCalTBody").appendChild(x);
 	document.getElementById(rowId).innerHTML = '<th><label>'+ rowCount+'.</label> </th>'
		+ '<td><input id="pcDate'+ rowCount+'" class="form-control input-SmallText col-md-12-1" type="text" style="margin-top:0px;" '
		+ ' readonly="readonly" onclick=displayCalendar(document.getElementById(this.id),\"dd/mm/yyyy\",this) value="" name="pcDate"></th>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="pcEnergy'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="pcFieldSize'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="pcEqSq'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="pcSSD'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="pcDepth'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="pcOutput'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="pcDoseRate'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="pcDO'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="pcTAR'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="pcWedgeAngle'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="pcModFactor'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="pcOtherFactor'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="pcInverseSq'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="pcNoFraction'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="pcDoseFraction'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="pcTreatmentTime'+ rowCount+'" type="text"></td>'
		+ '<td><input id="checkboxPhysicsCal" type="checkbox" name="checkboxPhysicsCal'+ rowCount+'" ></td>'
		+ '<input id="idCalculationRecord'+ rowCount+'" type="hidden" value="0"></th>';
 			
 	$("#rowCountPhysicsCal").val(rowCount);

}


function toRemovePhyCalRow(){

	var RowCount = $("#rowCountPhysicsCal").val();
	if (RowCount == "0") {
		alert("No Data to delete");
		return false;
	}
	var allVals = [];
	var flag = false;
	
	$.each($('#checkboxPhysicsCal:checked'), function() {
		allVals.push($(this).val());
		flag = true;
	});

	if (!flag) {
		alert("please check the checbox...");
		return false;
	}
	var p = 1;
	
	for ( var i = 0; i < (RowCount); i++) {
		var $radios = $('input:checkbox[name=checkboxPhysicsCal' + p + ']');
		if ($radios.is(':checked') == true) {
			var id =$("#idCalculationRecord"+p).val();
			$("#physicsCalRowNo" + p).remove();
			if(id != 0){
				deleteCalculationRecord(id);
			}
		}
		p++;
	}; 
}


function savePhysicsCal(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
	var date = $("#todays_date").val();
	var rows = $("#rowCountPhysicsCal").val();
	
	var PhysicsCalculation = {
			calculationList : []
    }; 
	
	for(var i=1;i<=rows;i++){
		
		var id = $("#idCalculationRecord"+i).val();
		if(id==undefined)
			continue;
		var pcDate = $("#pcDate"+i).val();
		var pcEnergy = $("#pcEnergy"+i).val();
		var pcFieldSize = $("#pcFieldSize"+i).val();
		var pcEqSq = $("#pcEqSq"+i).val();
		var pcSSD = $("#pcSSD"+i).val();
		var pcDepth = $("#pcDepth"+i).val();
		var pcOutput = $("#pcOutput"+i).val();
		var pcDoseRate = $("#pcDoseRate"+i).val();
		var pcDO = $("#pcDO"+i).val();
		var pcTAR = $("#pcTAR"+i).val();
		var pcWedgeAngle = $("#pcWedgeAngle"+i).val();
		var pcModFactor = $("#pcModFactor"+i).val();
		var pcOtherFactor = $("#pcOtherFactor"+i).val();
		var pcInverseSq = $("#pcInverseSq"+i).val();
		var pcNoFraction = $("#pcNoFraction"+i).val();
		var pcDoseFraction = $("#pcDoseFraction"+i).val();
		var pcTreatmentTime = $("#pcTreatmentTime"+i).val();
		
		PhysicsCalculation.calculationList.push({
			physicsCalculationId:id,
			patientId: patientId,
			date: date,
			
			pcDate: pcDate,
			pcEnergy: pcEnergy,
			pcFieldSize: pcFieldSize,
			pcEqSq: pcEqSq,
			pcSSD: pcSSD,
			pcDepth: pcDepth,
			pcOutput: pcOutput,
			pcDoseRate: pcDoseRate,
			pcDO: pcDO,
			pcTAR: pcTAR,
			pcWedgeAngle: pcWedgeAngle,	
			pcModFactor: pcModFactor,	
			pcOtherFactor: pcOtherFactor,	
			pcInverseSq: pcInverseSq,	
			pcNoFraction: pcNoFraction,	
			pcDoseFraction: pcDoseFraction,	
			pcTreatmentTime: pcTreatmentTime 
		});
	}	
	
	PhysicsCalculation=JSON.stringify(PhysicsCalculation); 
	var inputs = [];
	inputs.push('PhysicsCalculation=' + PhysicsCalculation);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/savePhysicsCal",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			fetchPhysicsCal();
		}
	});	
}


function fetchPhysicsCal(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
	var date = $("#todays_date").val();
	
	var inputs = [];
	inputs.push('date=' + date);
	inputs.push('patientId=' + patientId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/fetchPhysicsCal",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(PhysicsCal) {
			
			if(PhysicsCal.calculationList.length !=0){
				
				$("#rowCountPhysicsCal").val(PhysicsCal.calculationList.length);
				var rowCount=0;
				var htm ='';
				for(var i=0;i<PhysicsCal.calculationList.length;i++){
					rowCount=i+1;
				 	htm = htm + '<tr id="physicsCalRowNo'+ rowCount+'"><th><label>'+ rowCount+'.</label> </th>'
					+ '<td><input id="pcDate'+ rowCount+'" class="form-control input-SmallText col-md-12-1" type="text" style="margin-top:0px;" '
					+ ' readonly="readonly" onclick=displayCalendar(document.getElementById(this.id),\"dd/mm/yyyy\",this) value="'+PhysicsCal.calculationList[i].pcDate+'" name="pcDate"></th>'
					+ '<td><input class="form-control input-SmallText  TextFont"  value="'+PhysicsCal.calculationList[i].pcEnergy+'"  id="pcEnergy'+ rowCount+'" type="text"></td>'
					+ '<td><input class="form-control input-SmallText  TextFont"  value="'+PhysicsCal.calculationList[i].pcFieldSize+'" id="pcFieldSize'+ rowCount+'" type="text"></td>'
					+ '<td><input class="form-control input-SmallText  TextFont"  value="'+PhysicsCal.calculationList[i].pcEqSq+'" id="pcEqSq'+ rowCount+'" type="text"></td>'
					+ '<td><input class="form-control input-SmallText  TextFont"  value="'+PhysicsCal.calculationList[i].pcSSD+'" id="pcSSD'+ rowCount+'" type="text"></td>'
					+ '<td><input class="form-control input-SmallText  TextFont"  value="'+PhysicsCal.calculationList[i].pcDepth+'" id="pcDepth'+ rowCount+'" type="text"></td>'
					+ '<td><input class="form-control input-SmallText  TextFont"  value="'+PhysicsCal.calculationList[i].pcOutput+'" id="pcOutput'+ rowCount+'" type="text"></td>'
					+ '<td><input class="form-control input-SmallText  TextFont"  value="'+PhysicsCal.calculationList[i].pcDoseRate+'" id="pcDoseRate'+ rowCount+'" type="text"></td>'
					+ '<td><input class="form-control input-SmallText  TextFont"  value="'+PhysicsCal.calculationList[i].pcDO+'" id="pcDO'+ rowCount+'" type="text"></td>'
					+ '<td><input class="form-control input-SmallText  TextFont"  value="'+PhysicsCal.calculationList[i].pcTAR+'" id="pcTAR'+ rowCount+'" type="text"></td>'
					+ '<td><input class="form-control input-SmallText  TextFont"  value="'+PhysicsCal.calculationList[i].pcWedgeAngle+'" id="pcWedgeAngle'+ rowCount+'" type="text"></td>'
					+ '<td><input class="form-control input-SmallText  TextFont"  value="'+PhysicsCal.calculationList[i].pcModFactor+'" id="pcModFactor'+ rowCount+'" type="text"></td>'
					+ '<td><input class="form-control input-SmallText  TextFont"  value="'+PhysicsCal.calculationList[i].pcOtherFactor+'" id="pcOtherFactor'+ rowCount+'" type="text"></td>'
					+ '<td><input class="form-control input-SmallText  TextFont"  value="'+PhysicsCal.calculationList[i].pcInverseSq+'" id="pcInverseSq'+ rowCount+'" type="text"></td>'
					+ '<td><input class="form-control input-SmallText  TextFont"  value="'+PhysicsCal.calculationList[i].pcNoFraction+'" id="pcNoFraction'+ rowCount+'" type="text"></td>'
					+ '<td><input class="form-control input-SmallText  TextFont"  value="'+PhysicsCal.calculationList[i].pcDoseFraction+'" id="pcDoseFraction'+ rowCount+'" type="text"></td>'
					+ '<td><input class="form-control input-SmallText  TextFont"  value="'+PhysicsCal.calculationList[i].pcTreatmentTime+'" id="pcTreatmentTime'+ rowCount+'" type="text"></td>'
					+ '<td><input id="checkboxPhysicsCal" type="checkbox" name="checkboxPhysicsCal'+ rowCount+'" ></td>'
					+ '<input id="idCalculationRecord'+ rowCount+'" value="'+PhysicsCal.calculationList[i].physicsCalculationId+'" type="hidden" value="0"></th></tr>';
				 	
				}
				$("#physicsCalTBody").html(htm);
			}
		}
	});
}	


function deleteCalculationRecord(id){

	var inputs = [];
	inputs.push('id=' + id);
	 
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/deleteCalculationRecord",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert("error");
		},
		success : function(response) {
			alert(response);
		}
	});
}


function toCreatePaymentRow(){

 	var rowCount = $("#rowCountPayment").val();

 	if (rowCount == -1) {
 		rowCount = 0;
 	}
 	rowCount++;
 	rowId = "paymentRowNo" + rowCount;
 	var x = document.createElement('tr');
 	x.setAttribute('id', rowId);
 	document.getElementById("paymentTBody").appendChild(x);
 	document.getElementById(rowId).innerHTML = '<th><label>'+ rowCount+'.</label> </th>'
		+ '<td><input id="paymentDate'+ rowCount+'" class="form-control input-SmallText col-md-12-1" type="text" style="margin-top:0px;" '
		+ ' readonly="readonly" onclick=displayCalendar(document.getElementById(this.id),\"dd/mm/yyyy\",this) value="" name="paymentDate"></th>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="recieptNo'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="amtPaid'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="amtDue'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="recieptSign'+ rowCount+'" type="text"></td>'
		+ '<td><input class="form-control input-SmallText  TextFont" id="patientSign'+ rowCount+'" type="text"></td>'
		+ '<td><input id="checkboxPaymentDetails" type="checkbox" name="checkboxPaymentDetails'+ rowCount+'"></td>'
		+ '<input id="idPaymentRecord'+ rowCount+'" type="hidden" value="0"></th>';
 	
 	$("#rowCountPayment").val(rowCount);

}


function toRemovePaymentRow(){

	var RowCount = $("#rowCountPayment").val();
	if (RowCount == "0") {
		alert("No Data to delete");
		return false;
	}
	var allVals = [];
	var flag = false;
	
	$.each($('#checkboxPaymentDetails:checked'), function() {
		allVals.push($(this).val());
		flag = true;
	});

	if (!flag) {
		alert("please check the checbox...");
		return false;
	}
	var p = 1;
	
	for ( var i = 0; i < (RowCount); i++) {
		var $radios = $('input:checkbox[name=checkboxPaymentDetails' + p + ']');
		if ($radios.is(':checked') == true) {
			var id =$("#idPaymentRecord"+p).val();
			$("#paymentRowNo" + p).remove();
			if(id != 0){
				deletePaymentRecord(id);
			}
		}
		p++;
	}; 

}


function savePaymentDetails(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
	var date = $("#todays_date").val();
	var rows = $("#rowCountPayment").val();
	
	var PaymentDetails = {
			paymentList : []
    }; 
	
	for(var i=1;i<=rows;i++){
		
		var id = $("#idPaymentRecord"+i).val();
		if(id==undefined)
			continue;
		var paymentDate = $("#paymentDate"+i).val();
		var recieptNo = $("#recieptNo"+i).val();
		var amtPaid = $("#amtPaid"+i).val();
		var amtDue = $("#amtDue"+i).val();
		var recieptSign = $("#recieptSign"+i).val();
		var patientSign = $("#patientSign"+i).val();
		
		PaymentDetails.paymentList.push({
			paymentDetailId:id,
			patientId: patientId,
			date: date,
			
			paymentDate: paymentDate,
			recieptNo: recieptNo,
			amtPaid: amtPaid,
			amtDue: amtDue,
			recieptSign: recieptSign,
			patientSign: patientSign
		});
	}	
	
	PaymentDetails=JSON.stringify(PaymentDetails); 
	var inputs = [];
	inputs.push('PaymentDetails=' + PaymentDetails);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/savePaymentDetails",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			fetchPaymentDetails();
		}
	});	
}


function fetchPaymentDetails(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
	var date = $("#todays_date").val();
	
	var inputs = [];
	inputs.push('date=' + date);
	inputs.push('patientId=' + patientId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/fetchPaymentDetails",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(PaymentDetails) {
			
			if(PaymentDetails.paymentList.length !=0){
				
				$("#rowCountPayment").val(PaymentDetails.paymentList.length);
				var rowCount=0;
				var htm ='';
				for(var i=0;i<PaymentDetails.paymentList.length;i++){
					rowCount=i+1;
				 	htm = htm + '<tr id="paymentRowNo'+ rowCount+'"><th><label>'+ rowCount+'.</label> </th>'
						+ '<td><input id="paymentDate'+ rowCount+'" class="form-control input-SmallText col-md-12-1" type="text" style="margin-top:0px;" '
						+ ' readonly="readonly" onclick=displayCalendar(document.getElementById(this.id),\"dd/mm/yyyy\",this) value="'+PaymentDetails.paymentList[i].paymentDate+'" name="paymentDate"></th>'
						+ '<td><input class="form-control input-SmallText  TextFont" value="'+PaymentDetails.paymentList[i].recieptNo+'" id="recieptNo'+ rowCount+'" type="text"></td>'
						+ '<td><input class="form-control input-SmallText  TextFont" value="'+PaymentDetails.paymentList[i].amtPaid+'" id="amtPaid'+ rowCount+'" type="text"></td>'
						+ '<td><input class="form-control input-SmallText  TextFont" value="'+PaymentDetails.paymentList[i].amtDue+'" id="amtDue'+ rowCount+'" type="text"></td>'
						+ '<td><input class="form-control input-SmallText  TextFont" value="'+PaymentDetails.paymentList[i].recieptSign+'" id="recieptSign'+ rowCount+'" type="text"></td>'
						+ '<td><input class="form-control input-SmallText  TextFont" value="'+PaymentDetails.paymentList[i].patientSign+'" id="patientSign'+ rowCount+'" type="text"></td>'
						+ '<td><input id="checkboxPaymentDetails" type="checkbox" name="checkboxPaymentDetails'+ rowCount+'"></td>'
						+ '<input id="idPaymentRecord'+ rowCount+'" value="'+PaymentDetails.paymentList[i].paymentDetailId+'" type="hidden"></th></tr>';
				 	
				}
				$("#paymentTBody").html(htm);
			}
		}
	});

}


function deletePaymentRecord(id){

	var inputs = [];
	inputs.push('id=' + id);
	 
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/deletePaymentRecord",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert("error");
		},
		success : function(response) {
			alert(response);
		}
	});
}


function setOtherCategory(){
	
	var checkCategory="";
	checkCategory = document.getElementsByClassName('checkCategory');
	  var flag=false;
	  for(var i=0; checkCategory[i]; ++i){
	      if(checkCategory[i].value == "Others" && checkCategory[i].checked){
	    	  flag=true;
	      }
	  }
    if(flag){
  	  $("#otherCategoryDiv").show();
    }else {
  	  $("#otherCategoryDiv").hide();
    }

}


function savePaymentPackage(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
	var packageAmt =$("#pkgAmtFiguretxt").val();
	var regexp = /^(0|[1-9]+[0-9]*)$/;

    if (!regexp.test(packageAmt)) {
    	alert("Please Enter only Numbers ");
    	return false;
    }
	
	var date = $("#todays_date").val();
	var checkCategory = document.getElementsByClassName('checkCategory');
	var categoryValues = "";
	  for(var i=0; checkCategory[i]; ++i){
	      if(checkCategory[i].checked){
	    	  if(checkCategory[i].value=="Others"){
	    		  if($("#otherCategorytxt").val() !="" ){
	    			  categoryValues = categoryValues + "Others#" +$("#otherCategorytxt").val()+"~";  
	    		  }else{
	    			  alert('Please Specify Other or untick the "Others" checkbox');
	    			  $("#otherCategorytxt").focus();
	    			  return false;	
	    		  }
	    	  }else{
	    		  categoryValues = categoryValues + checkCategory[i].value +"~";
	    	  }
	      }
	  }
	  
	  var checkTreatMode = document.getElementsByClassName('checkTreatMode');
	  var modeValues = "";
		  for(var i=0; checkTreatMode[i]; ++i){
		      if(checkTreatMode[i].checked){
		    	  modeValues = modeValues + checkCategory[i].value +"~";
		      }
		  }  
		
	var id = $("#paymentPackageId").val();
	var PaymentPackage = {
			packageList : []
    }; 
	PaymentPackage.packageList.push({
		paymentPackageId:id,
		patientId: patientId,
		date: date,
		
		categories: categoryValues,
		treatmentMode: modeValues,
		packageAmt: packageAmt
	});
	
	PaymentPackage=JSON.stringify(PaymentPackage); 
	var inputs = [];
	inputs.push('PaymentPackage=' + PaymentPackage);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/savePaymentPackage",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			fetchPaymentPackage();
		}
	});	
}


function fetchPaymentPackage(){
	
	var patientId = $("#pathiddenid").val();
	if(patientId==0){
		alert("Please Select a Patient ...");
		return false;
	}
	var date = $("#todays_date").val();
	
	var inputs = [];
	inputs.push('date=' + date);
	inputs.push('patientId=' + patientId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/fetchPaymentPackage",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(PaymentPackage) {
			
			if(PaymentPackage.packageList.length !=0){
				
				$("#paymentPackageId").val(PaymentPackage.packageList[0].paymentPackageId);
				$("#pkgAmtFiguretxt").val(PaymentPackage.packageList[0].packageAmt);
				$("#pkgAmtWordstxt").val(PaymentPackage.packageList[0].packageAmtInWords);
				
				var modes = PaymentPackage.packageList[0].treatmentMode.split('~');
				var categories = PaymentPackage.packageList[0].categories.split('~');
				
					for(var j=0;j< (categories.length - 1);j++){
						if(categories[j].contains("Others#")){
							var others = categories[j].split('Others#');
							$("input[class=checkCategory][value="+"Others"+"]").attr('checked', 'checked');
							$("#otherCategoryDiv").show();
							$("#otherCategorytxt").val(others[1]);
						}else{
							$("input[class=checkCategory][value=" + categories[j] + "]").attr('checked', 'checked');
						}
					}
					for(var j=0;j< (modes.length - 1);j++){
							$("input[class=checkTreatMode][value=" + modes[j] + "]").attr('checked', 'checked');
					}
			}
		}
	});
}


function getRadiationPatients(type){

	var patientName = $("#byName").val();
	
	var inputs = [];
	inputs.push('patientName=' + patientName);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/getRadiationPatients",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(RadiationPatients) {
		
			if(type=="onload"){
				setCurTempRadDashBoard(RadiationPatients);
			}else{
				setPrevTempRadDashBoard(RadiationPatients);
			}
			
		}
	});	
}


function viewRadiationPatient(patientID,treatmentID,testName){
	window.location.href = "RadiotherapyChart.jsp?" + "patientId="+patientID+"&treatmentId="+treatmentID+"&testName="+testName;
	
}


function setPatientDetails(patientId){
	
	var inputs = [];
	inputs.push('patientId=' + patientId);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/radiation/fetchPatientDetailsToSet",	
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				
			},
			success : function(PatientsDetails){
		}
	});	
}


function saveRadiationConsentForm(){

	var queryType = $("#queryTypeicf").val();
	var patientId = $("#pathiddenid").val();

	var templateData = CKEDITOR.instances['editor1'].getData();
	var consentFormId = $("#consentFormId").val();
	var idCustomizeTemplate = $("#selCustomizeTemp").val();
	if(idCustomizeTemplate=="0"){
		alert("Please Select a Template . . . ");
		return false;
	}
	var date = $("#todays_date").val();

var RadiationConsent = {
		consentList : []
}; 
RadiationConsent.consentList.push({
	consentFormId:consentFormId,
	patientId: patientId,
	date: date,
	templateData:templateData,
	customizeTemplateId: idCustomizeTemplate,
	queryType: queryType
});

RadiationConsent=JSON.stringify(RadiationConsent); 
	var inputs = [];
	inputs.push('RadiationConsent=' + encodeURIComponent(RadiationConsent));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/saveRadiationConsentForm",	
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			
		},
		success : function(r){
			alert(r);
			fetchAllRadiationConsentForm();
		}
	});
}


function fetchAllRadiationConsentForm(){

	var patientId = $("#pathiddenid").val();
	var inputs = [];
	inputs.push('patientId=' + patientId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/fetchAllRadiationConsentForm",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ConsentForm) {
			
			if(ConsentForm.consentList.length !=0){
				
				var htm ='<div id="allConcentFormTemp" >'
					+'<ul id="already-set" style="padding-left: 10px;">';
				for(var i=0;i<ConsentForm.consentList.length;i++){
				 	htm = htm + '<li><a href="#" id="anch'+ConsentForm.consentList[i].consentFormId+'" onmouseover="this.style.color='+'"black"'+'" '
				 	+' onmouseout="this.style.backgroundColor='+'"transparent"'+ ';this.style.color='+'"inherit"'+' "'
				 	+' onclick="setConsentFormData('+ConsentForm.consentList[i].consentFormId+')">'
				 	+ConsentForm.consentList[i].date+'('+ConsentForm.consentList[i].consentFormId+')</a></li>';
				 	
				}
				htm=htm+'</ul></div>';
				$("#allConcentFormDiv").html(htm);
			}
		}
	});
}

function setConsentFormData(id){
	
	var inputs = [];
	inputs.push('consentFormId=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/fetchRadiationConsentFormById",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ConsentForm) {
			
			CKEDITOR.instances['editor1'].setData(ConsentForm.consentList[0].templateData);
			$("#consentFormId").val(id);
			$("#selCustomizeTemp").val(ConsentForm.consentList[0].customizeTemplateId);
			$("#queryTypeicf").val("update");
	
		}
	});	
}


function sendToRadiation(callFrom){
	
	var billDetailsIds=[];
	 $('input[name=opdBillCheckbox]:checked').each(function(){
			var bilDetId	=  parseInt($(this).val());
			billDetailsIds.push(bilDetId);
	 });
	 
	var inputs = [];
	inputs.push('billDetailsIds=' + billDetailsIds);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/radiation/sendToRadiation",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);

		}
	});	
}

/************
 *@author	:  Laxman Nikam
 *@date		: 25-July-2018
 *@codeFor	: Tab colour change of Lab
 ***********/
function tabColorChange(callFrom){

	$("#byName").val('');
	if(callFrom == "ct"){
		//getLabTestPatientDashboard('onload', 'labTestResults');
		getRadiationPatients('onload');
		$("#ct").css("background-color", "#00ff80");
		$("#prev").css("background-color", "");
			
	}else if(callFrom == "prev"){
		getRadiationPatients('prev');
		//getLabTestPatientDashboard('prev', 'labTestResults');
		$("#ct").css("background-color", "");
		$("#prev").css("background-color", "#00ff80");
	 }
}

/************
 *@author	:  Laxman Nikam
 *@date		: 25-July-2018
 *@codeFor	: set current dashboard template
 ***********/
function setCurTempRadDashBoard(RadiationPatients){
	
	var patientName = $("#byName").val();
	var htm ='';
	
	if(RadiationPatients.patientList.length !=0){
		
		var rowCount=0;
		
		for(var i=0;i<RadiationPatients.patientList.length;i++){
			
			if(RadiationPatients.patientList[i].tFlag=="Y"){
				rowCount=i+1;
				var testname ="";
				testname = "'"+RadiationPatients.patientList[i].testName+"'";
			 	htm = htm + '<tr><td><label>'+ rowCount+'.</label> </td>'
					+ '<td><label id="patientName'+ rowCount+'" >'+RadiationPatients.patientList[i].patientName+'</label></td>'
					+ '<td><label id="patientId'+ rowCount+'">'+RadiationPatients.patientList[i].patientId+'</label></td>'
					+ '<td><label id="registrationDate'+ rowCount+'">'+moment(RadiationPatients.patientList[i].registrationDate).format("DD-MM-YYYY h:mm:ss")+'</label></td>'
					+ '<td><label id="treatmentId'+ rowCount+'">'+RadiationPatients.patientList[i].treatmentId+'</label></td>'
					+ '<td><label id="testName'+ rowCount+'">'+RadiationPatients.patientList[i].testName+'</label></td>'
					+ '<td><label id="admissionDate'+ rowCount+'">'+moment(RadiationPatients.patientList[i].admissionDate).format("DD-MM-YYYY h:mm:ss")+'</label></td>'
					+ '<td><label id="billNo'+ rowCount+'">'+RadiationPatients.patientList[i].billNo+'</label></td>'
					+ '<td><label id="billDate'+ rowCount+'">'+moment(RadiationPatients.patientList[i].billDate).format("DD-MM-YYYY h:mm:ss")+'</label></td>'
					+ '<td><button class="btn btn-xs btn-success" type="button" onclick="viewRadiationPatient('+RadiationPatients.patientList[i].patientId+','+RadiationPatients.patientList[i].treatmentId+','+testname+')">'
					+ '<i class="fa fa-eye View"></i></button></td></tr>';
			}
		}
	}else if(patientName==""){
		htm = htm + '<tr><td><label>'+1+'.</label> </td>'
				+ '<td colspan="9"><label><b>No Record To Display !!! </b></label> </td></tr>';
	}else{
		htm = htm + '<tr><td><label>'+1+'.</label> </td>'
				+ '<td colspan="9"><label><b>No Record Found !!! </b></label></td></tr>';
	} 
	$("#radPatDbTBody").html(htm);

}

/************
 *@author	:  Laxman Nikam
 *@date		: 25-July-2018
 *@codeFor	: set previous dashboard template.
 ***********/
function setPrevTempRadDashBoard(RadiationPatients){
	
	var patientName = $("#byName").val();
	var htm ='';
	
	if(RadiationPatients.patientList.length !=0){
		
		var rowCount=0;
		
		for(var i=0;i<RadiationPatients.patientList.length;i++){
			
			if(RadiationPatients.patientList[i].tFlag=="N"){
			
				rowCount=i+1;
				var testname ="";
				testname = "'"+RadiationPatients.patientList[i].testName+"'";
			 	htm = htm + '<tr><td><label>'+ rowCount+'.</label> </td>'
					+ '<td><label id="patientName'+ rowCount+'" >'+RadiationPatients.patientList[i].patientName+'</label></td>'
					+ '<td><label id="patientId'+ rowCount+'">'+RadiationPatients.patientList[i].patientId+'</label></td>'
					+ '<td><label id="registrationDate'+ rowCount+'">'+moment(RadiationPatients.patientList[i].registrationDate).format("DD-MM-YYYY h:mm:ss")+'</label></td>'
					+ '<td><label id="treatmentId'+ rowCount+'">'+RadiationPatients.patientList[i].treatmentId+'</label></td>'
					+ '<td><label id="testName'+ rowCount+'">'+RadiationPatients.patientList[i].testName+'</label></td>'
					+ '<td><label id="admissionDate'+ rowCount+'">'+moment(RadiationPatients.patientList[i].admissionDate).format("DD-MM-YYYY h:mm:ss")+'</label></td>'
					+ '<td><label id="billNo'+ rowCount+'">'+RadiationPatients.patientList[i].billNo+'</label></td>'
					+ '<td><label id="billDate'+ rowCount+'">'+moment(RadiationPatients.patientList[i].billDate).format("DD-MM-YYYY h:mm:ss")+'</label></td>'
					+ '<td><button class="btn btn-xs btn-success" type="button" onclick="viewRadiationPatient('+RadiationPatients.patientList[i].patientId+','+RadiationPatients.patientList[i].treatmentId+','+testname+')">'
					+ '<i class="fa fa-eye View"></i></button></td></tr>';
			}
		}
	}else if(patientName==""){
		htm = htm + '<tr><td><label>'+1+'.</label> </td>'
				+ '<td colspan="9"><label><b>No Record To Display !!! </b></label> </td></tr>';
	}else{
		htm = htm + '<tr><td><label>'+1+'.</label> </td>'
				+ '<td colspan="9"><label><b>No Record Found !!! </b></label></td></tr>';
	} 
	$("#radPrevPatDbTBody").html(htm);

}
/************
 *@author	:  Laxman Nikam
 *@date		: 25-July-2018
 *@codeFor	: get Radiation Patient Data on search.
 ***********/
function getRadPatientsOnSerach(type){
	
	var tabcurr =$('#tabcurr').attr('class'); 
	var tabprev =$('#tabprev').attr('class');
	
	if(tabcurr=="active"){
		type="onload";
	}else if(tabprev=="active"){
		type="prev";
	}
	
	getRadiationPatients(type);
}
