function saveDischargePlan() {
	//alert(Hii);
	//var pId = $("#pid").val();
//	alert(pId);
	var tId = $("#tid").val();
	var idplan = $("#idplan").val();
	//var unitid = $("#unitid").val();
	var dateAdmission = $("#dateAdmission").val();
	var dateExpectedDischarge = $("#dateExpectedDischarge").val();
	var dateSet = $("#dateSet").val();
	var isInformed = $("#isInformed").val();
	var transportArranged =  $("#transportArranged").val();
	var transOwnArrvTime = $("#transOwnArrvTime").val();
	
	var isTransportOwnBooked = $('input:checkbox[id=isTransportOwnBooked]');
	if(isTransportOwnBooked.is(':checked') == true){
		isTransportOwnBooked = "Y";
	}else{
		isTransportOwnBooked = "N";
	}
	var isOwnMedic = $('input:checkbox[id=isOwnMedic]');
	if(isOwnMedic.is(':checked') == true){
		isOwnMedic = "Y";
	}else{
		isOwnMedic = "N";
	}
	var isNewMedic = $('input:checkbox[id=isNewMedic]');
	if(isNewMedic.is(':checked') == true){
		isNewMedic = "Y";
	}else{
		isNewMedic = "N";
	}
	var isSocialService = $('input:checkbox[id=isSocialService]');
	if(isSocialService.is(':checked') == true){
		isSocialService = "Y";
	}else{
		isSocialService = "N";
	}
	var isOT = $('input:checkbox[id=isOT]');
	if(isOT.is(':checked') == true){
		isOT = "Y";
	}else{
		isOT = "N";
	}
	var isPhysio = $('input:checkbox[id=isPhysio]');
	if(isPhysio.is(':checked') == true){
		isPhysio = "Y";
	}else{
		isPhysio = "N";
	}
	var isOther = $('input:checkbox[id=isOther]');
	if(isOther.is(':checked') == true){
		isOther = "Y";
	}else{
		isOther = "N";
	}
	var isTDL = $('input:checkbox[id=isTDL]');
	if(isTDL.is(':checked') == true){
		isTDL = "Y";
	}else{
		isTDL = "N";
	}
	
	var socialServiceRefDate = $("#socialServiceRefDate").val();
	var OTRefDate = $("#OTRefDate").val();
	var physioRefDate = $("#physioRefDate").val();
	var otherRefDate = $("#otherRefDate").val();
	var socialServiceAssesDate = $("#socialServiceAssesDate").val();
	var OTAssesDate = $("#OTAssesDate").val();
	var physioAssesDate =  $("#physioAssesDate").val();
	var otherAssesDate = $("#otherAssesDate").val();
	var dateActualDischarge = $("#dateActualDischarge").val();
	var dischargeCode = $("#dischargeCode").val();
	var TDLTime = $('#TDLTime').val();
	
	
	
	var diagCapacity =  $("#diagCapacity").val();
	var waitTestRes = $("#waitTestRes").val();
	var waitMedRevDisc = $("#waitMedRevDisc").val();
	var MedConsulDelay = $("#MedConsulDelay").val();
	var AlliedHelDelay = $("#AlliedHelDelay").val();
	var RefCommProvLate = $("#RefCommProvLate").val();
	var PatWaitConsEquip = $("#PatWaitConsEquip").val();
	var Medication = $("#Medication").val();
	var Transport = $("#Transport").val();
	var OtherHeltFacl = $("#OtherHeltFacl").val();
	var Pallative = $("#Pallative").val();
	var Rehabilitation = $("#Rehabilitation").val();
	var CareNurseHome = $("#CareNurseHome").val();
	
	/* var plandata01 = {
			  plandatalist : []
	        };*/
	 var inputs = [];
	// plandata01.plandatalist.push({
	    	//pId:pId,
	 		inputs.push("tId=" + tId);
			inputs.push("idplan=" + idplan);
			//inputs.push("unitid=" + unitid);
			inputs.push("dateAdmission=" + dateAdmission);
			inputs.push("dateExpectedDischarge=" + dateExpectedDischarge);
			inputs.push("dateSet=" + dateSet);
			inputs.push("isInformed=" + isInformed);
			inputs.push("transportArranged=" + transportArranged);
			inputs.push("transOwnArrvTime=" + transOwnArrvTime);
			inputs.push("isTransportOwnBooked=" + isTransportOwnBooked);
			inputs.push("isOwnMedic=" + isOwnMedic);
			inputs.push("isNewMedic=" + isNewMedic);
			inputs.push("isSocialService=" +isSocialService);
			inputs.push("isOT=" + isOT);
			inputs.push("isPhysio=" +isPhysio);
			inputs.push("isOther=" + isOther);
			inputs.push("isTDL=" + isTDL);
			inputs.push("socialServiceRefDate=" +socialServiceRefDate);
			inputs.push("OTRefDate=" + OTRefDate);
			inputs.push("physioRefDate=" + physioRefDate);
			inputs.push("otherRefDate=" + otherRefDate);
			inputs.push("socialServiceAssesDate=" + socialServiceAssesDate);
			inputs.push("OTAssesDate=" + OTAssesDate);
			inputs.push("physioAssesDate=" +physioAssesDate);
			inputs.push("otherAssesDate=" + otherAssesDate);
			inputs.push("dateActualDischarge=" + dateActualDischarge);
			inputs.push("dischargeCode=" + dischargeCode);
			inputs.push("TDLTime=" + TDLTime);
			inputs.push("diagCapacity=" + diagCapacity);
			inputs.push("waitTestRes=" + waitTestRes);
			inputs.push("waitMedRevDisc=" + waitMedRevDisc);
			inputs.push("MedConsulDelay=" + MedConsulDelay);
			inputs.push("AlliedHelDelay=" + AlliedHelDelay);
			inputs.push("RefCommProvLate=" + RefCommProvLate);
			inputs.push("PatWaitConsEquip=" + PatWaitConsEquip);
			inputs.push("Medication=" + Medication);
			inputs.push("Transport=" + Transport);
			inputs.push("OtherHeltFacl=" + OtherHeltFacl);
			inputs.push("Pallative=" +Pallative);
			inputs.push("Rehabilitation=" + Rehabilitation);
			inputs.push("CareNurseHome=" + CareNurseHome);
		//	});
	    
	// plandata01 = JSON.stringify(plandata01);
	   
	 //   inputs.push('plandata01=' + plandata01);
	    var str = inputs.join('&');

	    jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/IPD_Discharge/saveDischargePlan",
		
			success : function(response) {
				alert(response);
				fetchDischargePlan();
			}
		});

	}

function fetchDischargePlan() {
	
	var tId = $("#tid").val();
    var inputs = [];
    inputs.push('tId=' + tId);
		 var str = inputs.join('&');

		    jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/IPD_Discharge/fetchDischargePlan",
			
			success : function(response) {
						
						$("#idplan").val(response.plandatalist[0].idplan);
						$("#dateAdmission").val(response.plandatalist[0].dateAdmission);
						$("#dateExpectedDischarge").val(response.plandatalist[0].dateExpectedDischarge);
						$("#dateSet").val(response.plandatalist[0].dateSet);

						$("#isInformed").val(response.plandatalist[0].isInformed);
						
						$("#transportArranged").val(response.plandatalist[0].transportArranged);

						(response.plandatalist[0].isInformed == "Y") ? ($('#isInformed').attr('checked', true)): ($('#isInformed').attr('checked', false));

						/* 					(pobj1.IPDDischargePlanDTOList[0].isInformedByPatient == "Y") 
						 ? ($('#isInformedByPatient').attr('checked', true)) 
						 : ($('#isInformedByPatient').attr('checked', false));
						
						 (pobj1.IPDDischargePlanDTOList[0].isInformedByStaff == "Y") 
						 ? ($('#isInformedByStaff').attr('checked', true)) 
						 : ($('#isInformedByStaff').attr('checked', false)); */

						(response.plandatalist[0].isTransportOwn == "Y") ? ($('#isTransportOwn').attr('checked', true)): ($('#isTransportOwn').attr('checked',false));

						(response.plandatalist[0].isTransportOwnBooked == "Y") ? ($('#isTransportOwnBooked').attr('checked', true)): ($('#isTransportOwnBooked').attr('checked', false));

						$("#transOwnArrvTime").val(response.plandatalist[0].transOwnArrvTime);

						/* (pobj1.IPDDischargePlanDTOList[0].isTransportAmb == "Y") 
						? ($('#isTransportAmb').attr('checked', true)) 
							: ($('#isTransportAmb').attr('checked', false));
						
						(pobj1.IPDDischargePlanDTOList[0].isTransportAmbBooked == "Y") 
						? ($('#isTransportAmbBooked').attr('checked', true)) 
							: ($('#isTransportAmbBooked').attr('checked', false));
						
						$("#transAmbArrvTime").val(pobj1.IPDDischargePlanDTOList[0].transAmbArrvTime); */

						(response.plandatalist[0].isOwnMedic == "Y") ? ($('#isOwnMedic').attr('checked', true)): ($('#isOwnMedic').attr('checked', false));

						(response.plandatalist[0].isNewMedic == "Y") ? ($('#isNewMedic').attr('checked', true)): ($('#isNewMedic').attr('checked', false));

						(response.plandatalist[0].isTransferLetter == "Y") ? ($('#isTransferLetter').attr('checked', true)): ($('#isTransferLetter').attr('checked',false));

						(response.plandatalist[0].isSocialService == "Y") ? ($('#isSocialService').attr('checked', true)): ($('#isSocialService').attr('checked',false));

						$("#socialServiceRefDate").val(response.plandatalist[0].socialServiceRefDate);
						$("#socialServiceAssesDate").val(response.plandatalist[0].socialServiceAssesDate);

						(response.plandatalist[0].isOT == "Y") ? ($('#isOT').attr('checked', true)): ($('#isOT').attr('checked', false));

						$("#OTRefDate").val(response.plandatalist[0].otrefDate);
						$("#OTAssesDate").val(response.plandatalist[0].otassesDate);

						(response.plandatalist[0].isPhysio == "Y") ? ($('#isPhysio').attr('checked', true)): ($('#isPhysio').attr('checked', false));

						$("#physioRefDate").val(response.plandatalist[0].physioRefDate);
						$("#physioAssesDate").val(response.plandatalist[0].physioAssesDate);

						(response.plandatalist[0].isOther == "Y") ? ($('#isOther').attr('checked', true)): ($('#isOther').attr('checked', false));

						$("#otherRefDate").val(response.plandatalist[0].otherRefDate);
						$("#otherAssesDate").val(response.plandatalist[0].otherAssesDate);
						$("#dateActualDischarge").val(response.plandatalist[0].dateActualDischarge);

						$("#dischargeCode").val(response.plandatalist[0].dischargeCode);

						(response.plandatalist[0].isTDL == "Y") ? ($('#isTDL').attr('checked', true)): ($('#isTDL').attr('checked', false));
						$("#TDLTime").val(response.plandatalist[0].tdltime);
						$("#diagCapacity").val(response.plandatalist[0].diagCapacity);
						$("#waitTestRes").val(response.plandatalist[0].waitTestRes);
						$("#waitMedRevDisc").val(response.plandatalist[0].waitMedRevDisc);
						$("#MedConsulDelay").val(response.plandatalist[0].medConsulDelay);
						$("#AlliedHelDelay").val(response.plandatalist[0].alliedHelDelay);
						$("#RefCommProvLate").val(response.plandatalist[0].refCommProvLate);
						$("#PatWaitConsEquip").val(response.plandatalist[0].patWaitConsEquip);
						$("#Medication").val(response.plandatalist[0].medication);
						$("#Transport").val(response.plandatalist[0].transport);
						$("#OtherHeltFacl").val(response.plandatalist[0].otherHeltFacl);
						$("#Pallative").val(response.plandatalist[0].pallative);
						$("#Rehabilitation").val(response.plandatalist[0].rehabilitation);
						$("#CareNurseHome").val(response.plandatalist[0].careNurseHome);
			}
			});
}



function savedIPDDischargeProcess() {	
	
	var tId = $("#tid").val();
	var idProcess = $("#idProcess").val();
	//var unitid = $("#unitId").val();
	var txtstartTime1 = $("#txtstartTime1").val();
	var txtstartTime2 = $("#txtstartTime2").val();
	var txtstartTime3 = $("#txtstartTime3").val();
	var txtstartTime4 = $("#txtstartTime4").val();
	var txtstartTime5 = $("#txtstartTime5").val();
	var txtstartTime6 = $("#txtstartTime6").val();
	var txtstartTime7 = $("#txtstartTime7").val();
	var txtstartTime8 = $("#txtstartTime8").val();
	var txtstartTime9 = $("#txtstartTime9").val();
	
	var staffresp1 = $("#staffresp1").val();
	var staffresp2 = $("#staffresp2").val();
	var staffresp3 = $("#staffresp3").val();
	var staffresp4 = $("#staffresp4").val();
	var staffresp5 = $("#staffresp5").val();
	var staffresp6 = $("#staffresp6").val();
	var staffresp7 = $("#staffresp7").val();
	var staffresp8 = $("#staffresp8").val();
	var staffresp9 = $("#staffresp9").val();
	
	var remark1 = $("#remark1").val();
	var remark2 = $("#remark2").val();
	var remark3 = $("#remark3").val();
	var remark4 = $("#remark4").val();
	var remark5 = $("#remark5").val();
	var remark6 = $("#remark6").val();
	var remark7 = $("#remark7").val();
	var remark8 = $("#remark8").val();
	var remark9 = $("#remark9").val();
	
	

	var checkbox1 = $('input:checkbox[id=checkbox1]');
	if(checkbox1.is(':checked') == true){
		checkbox1 = "Y";
	}else{
		checkbox1 = "N";
	}
	var checkbox2 = $('input:checkbox[id=checkbox2]');
	if(checkbox2.is(':checked') == true){
		checkbox2 = "Y";
	}else{
		checkbox2 = "N";
	}
	var checkbox3 = $('input:checkbox[id=checkbox3]');
	if(checkbox3.is(':checked') == true){
		checkbox3 = "Y";
	}else{
		checkbox3 = "N";
	}
	var checkbox4 = $('input:checkbox[id=checkbox4]');
	if(checkbox4.is(':checked') == true){
		checkbox4 = "Y";
	}else{
		checkbox4 = "N";
	}
	var checkbox5 = $('input:checkbox[id=checkbox5]');
	if(checkbox5.is(':checked') == true){
		checkbox5 = "Y";
	}else{
		checkbox5 = "N";
	}
	var checkbox6 = $('input:checkbox[id=checkbox6]');
	if(checkbox6.is(':checked') == true){
		checkbox6 = "Y";
	}else{
		checkbox6 = "N";
	}
	var checkbox7 = $('input:checkbox[id=checkbox7]');
	if(checkbox7.is(':checked') == true){
		checkbox7 = "Y";
	}else{
		checkbox7 = "N";
	}
	var checkbox8 = $('input:checkbox[id=checkbox8]');
	if(checkbox8.is(':checked') == true){
		checkbox8 = "Y";
	}else{
		checkbox8 = "N";
	}
	var checkbox9 = $('input:checkbox[id=checkbox9]');
	if(checkbox9.is(':checked') == true){
		checkbox9 = "Y";
	}else{
		checkbox9 = "N";
	}
	
/*	 var processdata01 = {
			  processdatalist : []
	        };
	 processdata01.processdatalist.push({*/
	var inputs = [];
		
	inputs.push("tId=" +tId);
	inputs.push("idProcess =" + idProcess);
	//inputs.push("unitid =" + unitid);
	inputs.push("txtstartTime1=" + txtstartTime1);
	inputs.push("txtstartTime2=" + txtstartTime2);
	inputs.push("txtstartTime3=" + txtstartTime3);
	inputs.push("txtstartTime4=" + txtstartTime4);
	inputs.push("txtstartTime5=" + txtstartTime5);
	inputs.push("txtstartTime6=" + txtstartTime6);
	inputs.push("txtstartTime7=" + txtstartTime7);
	inputs.push("txtstartTime8=" + txtstartTime8);
	inputs.push("txtstartTime9=" + txtstartTime9);
	    	
			inputs.push("staffresp1=" + staffresp1);
			inputs.push("staffresp2=" + staffresp2);
			inputs.push("staffresp3=" + staffresp3);
			inputs.push("staffresp4=" + staffresp4);
			inputs.push("staffresp5=" + staffresp5);
			inputs.push("staffresp6=" + staffresp6);
			inputs.push("staffresp7=" + staffresp7);
			inputs.push("staffresp8=" + staffresp8);
			inputs.push("staffresp9=" + staffresp9);
	    	
				inputs.push("remark1=" + remark1);
				inputs.push("remark2=" + remark2);
				inputs.push("remark3=" + remark3);
				inputs.push("remark4=" + remark4);
				inputs.push("remark5=" + remark5);
				inputs.push("remark6=" + remark6);
				inputs.push("remark7=" + remark7);
				inputs.push("remark8=" + remark8);
				inputs.push("remark9=" + remark9);
	    	
			inputs.push("checkbox1=" + checkbox1);
			inputs.push("checkbox2=" + checkbox2);
			inputs.push("checkbox3=" + checkbox3);
			inputs.push("checkbox4=" + checkbox4);
			inputs.push("checkbox5=" + checkbox5);
			inputs.push("checkbox6=" + checkbox6);
			inputs.push("checkbox7=" + checkbox7);
			inputs.push("checkbox8=" + checkbox8);
			inputs.push("checkbox9=" + checkbox9);
	    	
		//	});
	    
	// processdata01 = JSON.stringify(processdata01);
	    
	//    inputs.push('processdata01=' + processdata01);
	    var str = inputs.join('&');

	    jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/IPD_Discharge/saveDischargeProcess",
		
			success : function(response) {
				alert(response);
				fetchIPDDischargeProcess();
			}
		});

}

function fetchIPDDischargeProcess() {
	
	var tId = $("#tid").val();
    var inputs = [];
    inputs.push('tId=' + tId);
		 var str = inputs.join('&');

		    jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/IPD_Discharge/fetchDischargeProcess",
			
			success : function(response) {
						$("#idProcess").val(response.processdatalist[0].idProcess);
						$("#txtstartTime1").val(response.processdatalist[0].txtstartTime1);
						$("#txtstartTime2").val(response.processdatalist[0].txtstartTime2);
						$("#txtstartTime3").val(response.processdatalist[0].txtstartTime3);
						$("#txtstartTime4").val(response.processdatalist[0].txtstartTime4);
						$("#txtstartTime5").val(response.processdatalist[0].txtstartTime5);
						$("#txtstartTime6").val(response.processdatalist[0].txtstartTime6);
						$("#txtstartTime7").val(response.processdatalist[0].txtstartTime7);
						$("#txtstartTime8").val(response.processdatalist[0].txtstartTime8);
						$("#txtstartTime9").val(response.processdatalist[0].txtstartTime9);
						
						$("#staffresp1").val(response.processdatalist[0].staffresp1);
						$("#staffresp2").val(response.processdatalist[0].staffresp2);
						$("#staffresp3").val(response.processdatalist[0].staffresp3);
						$("#staffresp4").val(response.processdatalist[0].staffresp4);
						$("#staffresp5").val(response.processdatalist[0].staffresp5);
						$("#staffresp6").val(response.processdatalist[0].staffresp6);
						$("#staffresp7").val(response.processdatalist[0].staffresp7);
						$("#staffresp8").val(response.processdatalist[0].staffresp8);
						$("#staffresp9").val(response.processdatalist[0].staffresp9);
				
						
						$("#remark1").val(response.processdatalist[0].remark1);
						$("#remark2").val(response.processdatalist[0].remark2);
						$("#remark3").val(response.processdatalist[0].remark3);
						$("#remark4").val(response.processdatalist[0].remark4);
						$("#remark5").val(response.processdatalist[0].remark5);
						$("#remark6").val(response.processdatalist[0].remark6);
						$("#remark7").val(response.processdatalist[0].remark7);
						$("#remark8").val(response.processdatalist[0].remark8);
						$("#remark9").val(response.processdatalist[0].remark9);
						

						(response.processdatalist[0].checkbox1 == "Y") ? ($('#checkbox1').attr('checked', true)): ($('#checkbox1').attr('checked', false));
						(response.processdatalist[0].checkbox2 == "Y") ? ($('#checkbox2').attr('checked', true)): ($('#checkbox2').attr('checked', false));
						(response.processdatalist[0].checkbox3 == "Y") ? ($('#checkbox3').attr('checked', true)): ($('#checkbox3').attr('checked', false));
						(response.processdatalist[0].checkbox4 == "Y") ? ($('#checkbox4').attr('checked', true)): ($('#checkbox4').attr('checked', false));
						(response.processdatalist[0].checkbox5 == "Y") ? ($('#checkbox5').attr('checked', true)): ($('#checkbox5').attr('checked', false));
						(response.processdatalist[0].checkbox6 == "Y") ? ($('#checkbox6').attr('checked', true)): ($('#checkbox6').attr('checked', false));
						(response.processdatalist[0].checkbox7 == "Y") ? ($('#checkbox7').attr('checked', true)): ($('#checkbox7').attr('checked', false));
						(response.processdatalist[0].checkbox8 == "Y") ? ($('#checkbox8').attr('checked', true)): ($('#checkbox8').attr('checked', false));
						(response.processdatalist[0].checkbox9 == "Y") ? ($('#checkbox9').attr('checked', true)): ($('#checkbox9').attr('checked', false));

			}
			});
}


function getTemplateListByDepartmentId(){


	//var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('departmentId=' + 2);//diet->diet opd
	inputs.push('unitId=' + 1);
	inputs.push('selectTemplateType=' + 'd');

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/IPD_Discharge/getTemplateListByDepartmentId",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			//alert("error");
		},
		success : function(r) {

			var divContent = "<option value='0'>select</option>";
           
            for ( var i = 0; i < r.pattemplist.length; i++){             
	                divContent = divContent + "<option value='" + r.pattemplist[i].idpattemp + "'  >"
	                        + r.pattemplist[i].tempname + "</option>";
            }
           
            $("#selTempWiseSummary").html(divContent);
            $("#selTempWiseSummary").select2();
            $("#selTempWiseSummary").on("change", function () { 
            	getCustomizeTemplatesIDDischarge(); 
            });
		}		
	});

	
}

function getCustomizeTemplatesIDDischarge(){
	
	var id = $("#selTempWiseSummary").val();
	if(id==""||id==null||id=="null"){
		$("#selTempWiseSummary").val(0);
		
		return false;
		id=0;
	}
	
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/IPD_Discharge/gettemplatelistbytemplateid",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {			
			
			//$("#idCustomizeTemplateci").val(r.idCustomizeTemplate);
			//$('#customizeTemplateNameci').val(r.temp_name);
			CKEDITOR.instances['editor1'].setData(r.tempdata);
			$('#customizeTemplateName').val(r.tempname);
		}
	});
	
}

function saveIPDDischargeSummaryTemplate(callFrom) {
	
	
		var idIPDdischargeSummary = $("#idIPDdischargeSummary").val();
		var templateData = "";
		var queryType = $("#queryTypeicf").val();
		var selTempWiseSummary = $("#selTempWiseSummary").val();
		var selTempType = $("#selTempType").val();
		var templateName = $("#customizeTemplateName").val();
		if(callFrom == 'Report')
 		{
			templateData = CKEDITOR.instances['viewckeditor1'].getData();

		} else if (callFrom == 'IPD') {
			templateData = CKEDITOR.instances['editor1'].getData();
		}
		
		var date = $("#date").html();
		var discharge_dateNew = $("#discharge_date_note").val();
		var discharge_Time = $("#discharge_Time_note").val();
		
		if (discharge_dateNew == "") {
			alert("Please select discharge date");
			$("#discharge_date").focus();
			return false;
		}
		if (discharge_Time == "") {
			alert("Please select discharge time");
			$("#discharge_Time").focus();
			return false;
		}

		if (discharge_dateNew != "") {
			var temp = discharge_dateNew.split("/");
			var disDate = new Date(temp[2], temp[1] - 1, temp[0]);
			//var admsndate = $("#treStartDate").html();
			var admsndate = $("#doa").val(); 
			var addt = admsndate.split("/");
			var addDate = new Date(addt[2],addt[1]-1,addt[0]); 
			if (disDate.getTime() < addDate.getTime()) {
				alert("Date should not be before admission date!");
				return false;
			}else{
				discharge_dateNew = temp[2] + "-" + temp[1] + "-" + temp[0] + " "
				+ discharge_Time;
			}
		}

		var discharge_Type = $("#discharge_Type").val();
		if (discharge_Type == "") {
			alert("Please select discharge type!");
			$("#discharge_Type").focus();
			return false;
		}

		if (queryType == "update") {
			idIPDdischargeSummary = $("#idIPDdischargeSummary").val();
		}
		var treatmentId = $("#tid").val(); //Added by Sagar
		var pid = $("#pid").val();

		var inputs = [];
	
		inputs.push('queryType=' + queryType);
		inputs.push('dischargeDate=' + encodeURIComponent(discharge_dateNew));
		inputs.push('discharge_Type=' + encodeURIComponent(discharge_Type));
		inputs.push('selTempWiseSummary='+ encodeURIComponent(selTempWiseSummary));
		inputs.push('selTempType=' + selTempType);
		inputs.push('templateName=' + templateName);
		inputs.push('templateData=' + encodeURIComponent(templateData));
		inputs.push('idIPDdischargeSummary=' + idIPDdischargeSummary);
		inputs.push('date=' + date);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('pid=' + pid);

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/IPD_Discharge/saveIPDDischargeSummaryTemplate",
	//		timeout : 1000 * 60 * 5,
		//	cache : false,
			error : function() {
				
			},
			success : function(r) {
				ajaxResponse = r;
				alert(r);
				setTimeout(function() {

					// setNewCustomizeTemp();
					window.location.reload(true);
					// fetchCustomizeTemplateList();
				}, 500);
			}
		});
	
}

function fetchIPDDischargeSummaryTemplate(callFrom,pagetype) {
	if (callFrom == 'IPD') {
		var treatmentId = $("#tid").val(); 
		var pid = $("#pid").val();
		
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('pid=' + pid);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "ehat/IPD_Discharge/fetchIPDDischargeSummaryTemplate",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						
					},
					success : function(r) {
						$("#IPDdischargeSummaryTemplateDiv").html(r);
						
					//	var tobj = eval('(' + ajaxResponse + ')');
						if (r != null) {
							$("#idIPDdischargeSummary").val(r.idipdPatientDischargeSummary);
							$("#templateName").html(r.tempName);
							$("#customizeTemplateName").val(r.tempName);
							//alert(myObj.discharge_date);
							
							
						//dd=new Date(disDate);
							//alert(disDate);
					var	disDate=r.dischargeDate.replace(/\-/g,'/');
						 disDate=disDate.split("_");
						 
							//alert(disDate[0]+"date");
							//alert(disDate[1]+"time");
							
							var cal_date = r.dischargeDate.split("-");
							//alert(cal_date);
							var new1=cal_date[2].split("_");
							//alert(new1);
							var mydate =new1[0]+"/"+cal_date[1]+"/"+cal_date[0];
							$("#selTempWiseSummary").val(r.idCustomizeTemplate); 
							$("#discharge_date_note").val(mydate);
							$("#discharge_date").val(mydate);
							$("#discharge_Time").val(r.dischargeTime);
							$("#discharge_Time_note").val(r.dischargeTime);
			
							CKEDITOR.instances['viewckeditor1']
									.setData(r.tempData);
							CKEDITOR.instances['editor1']
							.setData(r.tempData);
						/*	$('#customizeTemplateName').val(myObj.discharge_type);*/
							$("#discharge_Type").val(r.dischargeType);
						
							if(r.tempData != null || r.tempData != undefined || r.tempData != "" || r.tempData != "null")
								{
								$("#queryTypeicf").val("update");
								}
							else
								{
								$("#queryTypeicf").val("insert");
								}
						} else {
							/*var v1=new Date();
							var mth=v1.getMonth()+1;
						var	cal_date=v1.getFullYear()+"-"+mth+"-"+v1.getDate();
						  cal_date = cal_date.split("-");
						var mydate = cal_date[2]+"/"+cal_date[1]+"/"+cal_date[0];
						$("#discharge_date_note").val(mydate);*/
  							alert("No Discharge Summary Template is Saved for this Patient...");
							//$("discharge_date_note").html(v2);
							//$("discharge_Time_note").val(disDate[1]);
							return false;
						}
					}
				});
	}
}



function fetchOperationsData(){
	var pid = $("#pid").val();
	var tid = $("#tid").val();
	
	var inputs = [];
	
	inputs.push('pid='+ pid);
	inputs.push('tid='+ tid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/IPD_Discharge/fetchOperationsData",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			
			/*var ajaxResponse = r;
			
			var OprnName ="";
			var tomId = 0;
			
			
			var pobj1 =JSON.parse(ajaxResponse.decodeSpecialChars());
		*/
			for(var i = 0; i < pobj1.toli.length; i++){
				/*if(pobj1.toli[i].on != "" || pobj1.toli[i].on != null){
					OprnName = pobj1.toli[i].on; 
					tomId= pobj1.toli[i].id;
				}*/
				tomId= pobj1.toli[i].tomid;
				$("#tomId").val(tomId);
				/*$("#idSelOperationData").setTemplate(SelOperationDataTemplate);
				$("#idSelOperationData").processTemplate(pobj1);*/
				
			}
			
		}
	});
}

