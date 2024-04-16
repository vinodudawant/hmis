
function getIVFPrescriptionTemplate(id){
	
	var todaysDefaultDate = $("#date").html();
	var dateSplit = todaysDefaultDate.split('-');
	todaysDefaultDate = dateSplit[0] + "/" + dateSplit[1] + "/" + dateSplit[2];
	var depid = $("#depdocdeskid").val();
	
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	
	$("#ipdDoctorStationJSPHeadDiv").html('');
	$("#Prescription").show();
	
//	fetchAllPrescriptionInstruction();
	fetchAllIVFPrescriptionInstruction();
	
//	getAllPreparationsForPrescription();
	getAllIVFPreparationsForPrescription();
	
//	getAllRoutesForPrescription();
	getAllRoutesForPrescriptionIVF();

//	fetchAllUnits();
	fetchAllUnitsIVF();
	
//	getAllPrescriptions();
	getAllPrescriptionsIVF();
	
//	getDiagnosisList();
	getDiagnosisListIVF();	
	
	fetchAllAllergyAlerts();
	
	getfollowUpForIVF();
	
}

function getIVFInstruction(){
	
	var DWMSelect = ($("#DWMSelect").val()).trim();
	if (DWMSelect == "") {
		return false;
	}

	var value = $("#noOf").val();

	if ((value.trim()) == "")
		value = "--";

	$("#divfollow").html(
			"Please do follow up after " + value + " " + DWMSelect
					+ ". Please take prior appointment.");
}

function savefollowUpForIVFPatient(saveFetchParam){
	
//	alert("saveFetchParam : " + saveFetchParam);
	
//	return false;
	
	var followUpId = $("#followUpId").val();
	
//	alert("-- in savefollowUpForOPDPatient -- " + followUpId);
	
	var docId =  $("#userdr_id").val();
	var docName = $("#docName").html();
	var patientId = $("#pt_Id").val();
	var patientName = $("#pname").text();
	
	if(patientName==null||patientName==""){
		patientName =$("#patientName").text();
	}
	
	var treatmentId =$("#tr_Id").val();
	
	var prescriptionDetails = $("#prescriptionDetails").html();
//	prescriptionDetails = eval('(' + prescriptionDetails + ')');
	
	var treatmentDocId =0;
	if(prescriptionDetails == undefined || prescriptionDetails == ""){
		treatmentDocId=0;
		
	}else{
		treatmentDocId = prescriptionDetails.treatment_doctor_Id;
	}
	
	var DWMSelect = "";
	var numberOf = $("#noOf").val();

	if (saveFetchParam == "SAVE") {

		DWMSelect = ($("#DWMSelect").val()).trim();
		if (DWMSelect == "") {
			alert("Please select Follow up: day, week or month...");
			return false;
		}

		if (numberOf == "") {
			return false;
		}
	}
	
	var ivfTreatId =$("#ivfTreatId").val();
	
//	alert("--ivfTreatId--" + ivfTreatId);
	
	var inputs = [];
	
	inputs.push('followUpId=' + followUpId);		// int
	inputs.push('radioValue=' + DWMSelect);			// string
	inputs.push('numberOf=' + numberOf);			// int
	inputs.push('docId=' + docId);					// int
	inputs.push('docName=' + docName);				// string
	inputs.push('patientId=' + patientId);			// int
	inputs.push('patientName=' + patientName);		// string
	inputs.push('treatmentId=' + treatmentId);		// int
	inputs.push('treatmentDocId=' + treatmentDocId);// int
	
	//for IVF
	inputs.push('ivfTreatId=' + ivfTreatId);// int
	
	
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ivfPrescriptionController/savefollowUpForIVFPatient",
		
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				
				alert("record inserted");
				getfollowUpForIVF();
			}
			else if (data == 2) {
				
				alert("record updated");
				getfollowUpForIVF();
			}	
		}
	});
}


function getfollowUpForIVF(){
	

	
	// alert("-- in getfollowUpForOPDPatient -- ");
	var ivfTreatId =$("#ivfTreatId").val();
	
	var treatmentId = $("#tr_Id").val();
	var unitId = $("#unitId").val();
	
	var inputs = [];
	
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('unitId=' + unitId);
	
	//for IVF
	inputs.push('ivfTreatId=' + ivfTreatId);// int
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ivfPrescriptionController/getfollowUpForIVFDoctorDesk",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
		//	alert(JSON.stringify(r));
			
			setfollowUpForIVFPatient(r);
			
		}
	});
	
}

function setfollowUpForIVFPatient(r){
	
	if (!$.trim(r)){  
		
	}
	else{   
		var dateF = new Date(r.date).toLocaleDateString('en-GB');
		
	//	$("#followUpId").val(r.followUpId);	// added 11 FEB 22
		
	//	alert("set ivf folloup : " + r.ivfFollowUpId);
		
		$("#followUpId").val(r.ivfFollowUpId);	// added 11 FEB 22
		
		$("#DWMSelect").val(r.radioDayWeekMonth);

		$("#noOf").val(r.valueDayWeekMonth);

		$("#divfollow").html("");

		$("#divfollowDate").html(
				"Next follow up on: "
				+ (dateF) + ".");
//						+ (r.nextFolloUpDate) + ".");
	}

}

function fetchAllIVFPrescriptionInstruction(){
	
	var inputs = [];
	inputs.push('unitId=' + $('#unitId').val());
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/prescriptionController/getIntsructionsForPrescriptions",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(res) {
			
			setIVFPrescriptionInstruction(res);
			
		}
	});
}


function setIVFPrescriptionInstruction(r){
	
	var list = "";  
	list = list + "<option value='0'> -SELECT- </option>";
	
    for ( var i = 0; i < r.listPrescriptionInstructionDto.length; i++) {  

        list = list + "<option value='"+r.listPrescriptionInstructionDto[i].id+"' class='un'>" + (r.listPrescriptionInstructionDto[i].englishInstruction) + " / " + (r.listPrescriptionInstructionDto[i].hindiInstruction)+ " / " + (r.listPrescriptionInstructionDto[i].marathiInstruction) +"</option>";    
    }  
    
    $("#instruction").html(list);
    $("#instructionDoc").html(list); // added, 13 JAN 22 // for OPD prescription template
    
}

function getAllIVFPreparationsForPrescription(){
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/prescriptionController/fetchpreparationmaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(res) {
			
			setPreparationsForPrescriptionIVF(res);
		}
	});
} 

function setPreparationsForPrescriptionIVF(r){
	
	var list = "";  
	list = list + "<option value='0'> -SELECT- </option>";
	
    for ( var i = 0; i < r.listpreparationmaster.length; i++) {  

        list = list + "<option value='"+r.listpreparationmaster[i].preparationId+"' class='un'>" + (r.listpreparationmaster[i].preparationName) + "</option>";    
    }  
    
    $("#prep").html(list);
    $("#prepDoc").html(list); // added, 13 JAN 22 // for OPD prescription template
	
}

function getAllRoutesForPrescriptionIVF(){
	
	var unitID = $("#unitId").val();
	
	var inputs = [];
	inputs.push('unitId=' + unitID);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/prescriptionController/getAllRoutesForPrescription",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllRoutesIVF(r);
		}
	});
}

function setAllRoutesIVF(r){
	
	var list = "";  
	list = list + "<option value='0'> -SELECT- </option>";
	
    for ( var i = 0; i < r.listroutemasters.length; i++) {  

        list = list + "<option value='"+r.listroutemasters[i].route_id+"' class='un'>" + (r.listroutemasters[i].routename) + "</option>";    
    }  
    
    $("#route").html(list);
    $("#routeDoc").html(list);		// added, 13 JAN 22 // for OPD prescription template
	
}

function fetchAllUnitsIVF(){
	
	var inputs = [];
	inputs.push('unitId=' + $('#unitId').val());
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/prescriptionController/fetchAllUnits",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(res) {
			
			setAllUnitsIVF(res);
			
		}
	});
}

function setAllUnitsIVF(r){
	
	var list = "";  
	list = list + "<option value='0'> -SELECT UNIT- </option>";
	
    for ( var i = 0; i < r.listUomMaster.length; i++) {  

        list = list + "<option value='"+r.listUomMaster[i].uomId+"' class='un'>" + (r.listUomMaster[i].uomName) +"</option>";    
    }  
    
    $("#unit").html(list);
    $("#unitDoc").html(list);		// added, 13 JAN 22 // for OPD prescription template
}


function getAllPrescriptionsIVF(){
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	var unitID = $("#unitId").val();
	
	var ivfTreatId =$("#ivfTreatId").val();
	
	if(treatmentId !=undefined && treatmentId !=null && treatmentId !="" && treatmentId !="null"){
		
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('unitId=' + unitID);
		inputs.push('ivfTreatId=' + ivfTreatId);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/ivfPrescriptionController/getAllIVFPrescriptions",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
			
		//		alert(JSON.stringify(r));
				
				setAllPrescriptionsIVF(r);
			}
		});
	}
}

function setAllPrescriptionsIVF(r){
	
	var testObj = r;

	var prescriptionContentTemp = "";
	var instruction = "";
	var prep = "";
	var unit = "";
	var frequency="";
	
	var prepCount = 0;
	
	if (testObj.listIVFPrescriptionDtoSP.length > 0) {
		
		for ( var int = 0; int < testObj.listIVFPrescriptionDtoSP.length; int++) {

			prescriptionContentTemp = prescriptionContentTemp
					+ "<tr><td class='col-md-1-1 center'>"
					+ ++prepCount
					+ ".</td>"
					+ "<td class='col-md-2-1'>"
					+ testObj.listIVFPrescriptionDtoSP[int].prepName
					+ ". "
					+ testObj.listIVFPrescriptionDtoSP[int].medicineName
					+ "</td>"
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listIVFPrescriptionDtoSP[int].strength
					+ "</td>"
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listIVFPrescriptionDtoSP[int].dose
					+ "</td>"
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listIVFPrescriptionDtoSP[int].unitName
					+ "</td>"
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listIVFPrescriptionDtoSP[int].dayPrescription
					+ "</td>"
					+ "<td class='col-md-3-1 center' style='padding-left: 15px;'>"
					+ testObj.listIVFPrescriptionDtoSP[int].instructionName
					+ "</td>"
					+ "<td class='col-md-1-1 center' style='padding-left: 15px;'>"
					+ testObj.listIVFPrescriptionDtoSP[int].days
					+ "</td>"
					+ "<td class='col-md-1-1 center' style='padding-left: 15px;'>"
					+ testObj.listIVFPrescriptionDtoSP[int].qty
					+ "</td>"
					+ "<td class='col-md-1-1 center'>"
					+ "<input name='prepTreatmentMedicineCheckbox' id='"
					+ (testObj.listIVFPrescriptionDtoSP[int].ivfPrescriptionId)
					+ "' type='checkbox' style='cursor: pointer; margin-top: 2px;' /></td>"
					+ "</tr>";
		}
	}

	$('#prescriptionContent').html(prescriptionContentTemp);
	$("#prescription_id").val("0");

	/*prepCount = 0;
	$("#prescriptionCoverSheetContent").setTemplate(
			prescriptionCoverSheetContent);
	$("#prescriptionCoverSheetContent")
			.processTemplate(testObj);*/
	
}

function getDiagnosisListIVF(){
	
	var treatmentId = $("#tr_Id").val();
	
	var inputs = [];
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagonosis/lisofDiagonosis",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setDiagnosisListIVF(r);
		}
	});
}

function setDiagnosisListIVF(r){
	
		var htm = "";
		var index = 1;
		for ( var i = 0; i < r.length; i++) {
			
			if(r[i].diagnoType == "Confirmed"){
				htm = htm 
				
					+ '<tr> ' 
					+ "<td class='col-md-1-1 center'>" + index + '</td>' 
					+ "<td class='col-md-3-1 center'>"+ r[i].diagoName + "</td>" 
					+ "<td class='col-md-2-1 center'>" + r[i].icd10_code+ "</td>"
					+ '</tr>';
			index++;
			}
		}
		$("#assesmentContentConfirmaedPrescription").html(htm);
}

// changed for  IVF


function saveIVFPrescription(){
	
	var ivfTreatId =$("#ivfTreatId").val();
	
//	alert("-- -- ivfTreatId : " + ivfTreatId);
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	var patientId = $.trim($('#pt_Id').val()); 		
	
	var prep = $.trim($("#prep :selected").val());
	var medicineName = $.trim($("#name").val());
	var medicineID = $.trim($("#medicineID").val()); // 0 from UI
	
//	alert("-- -- medicineID : " + medicineID);
	
//	alert("-- -- medicineID : " + medicineID);
//	return false;
	
	var strength = $.trim($("#strength").val());	// "capacity" on UI
	var unit = $.trim($("#unit").val());
	var dose = $.trim($("#dose").val());			// only number

	var frequency = $.trim($("#frequency").val());
	var instruction = $.trim($("#instruction").val());
	var route = $.trim($("#route").val());
	var days = $.trim($("#days").val());
	var qty = $.trim($("#qty").val());
	var paediatricsMedicineFlag = $.trim($("#paediatricsMedicineFlag").val());
	
//	var paediatricsMedicineCapacity = ($("#paediatricsMedicineCapacity").val()).trim(); 		// hidden field, not specified on UI.
	var paediatricsMedicineCapacity = 0;			// hardcoded, data type not fixed in old flow, need to be specified
	
	
	var mor_flag="0";
	var aft_flag="0";
	var eve_flag="0";
	var night_flag="0";
	if(frequency=="" || frequency==null || frequency==undefined){
		alert("Please Select frequency...");
		SetFocus("frequency");
		return false;
	}
	if (prep == "") {
		alert("Please Select Prep...");
		SetFocus("prep");
		return false;
	}
		if ($("#medicineNotAvailableCheckbox").prop("checked")){
			// No need to show validation 
	}else{
		
		if (medicineID == "0" || medicineID == "undefined" || medicineID == "") {
			alert("Please Enter proper medicine name");
			SetFocus("name");
			return false;
		}
		if (medicineName == "") {
			alert("Please Enter proper medicine name");
			SetFocus("name");
			return false;
			}
		
	}
		
		

	if (instruction == "0") {
		// alert("Please Select Instruction...");
		// SetFocus("instruction");
		// return false;
	}

	if (days == "") {
		alert("Please Enter days...");
		SetFocus("days");
		return false;
	}

	if (qty == "") {
		alert("Please Select Quantity...");
		SetFocus("qty");
		return false;
	}
	if (qty != "") {
		var pattern = /^[0-9]+\.?[0-9]*$/;
		if (!pattern.test(qty)) {
			alert("Quantity should be of digits and a decimal point Only!");
			$("#qty").focus();
			return false;
		}
	}
	
	if(document.getElementById('mo').checked){
		mor_flag=$("#tmo").val();
	}
	if(document.getElementById('an').checked){
		aft_flag =$("#tan").val();
	}
	if(document.getElementById('ev').checked){
		eve_flag=$("#tev").val();
	}
	if(document.getElementById('nt').checked){
		night_flag=$("#tnt").val();
	}
	
	var dayPrescription = mor_flag+","+aft_flag+","+eve_flag+","+night_flag;
	
	var prescriptionId = $.trim($('#prescription_id').val());
	
	// alert("--IVF prescriptionId--: " + prescriptionId);
	
	// alert("--IVF medicineID--: " + medicineID);
	
	
	var inputs = [];
	inputs.push('ivfPrescriptionId=' + prescriptionId);	// int
	inputs.push('patientId=' + patientId);				// int
	inputs.push('treatmentId=' + treatmentId);			// int
	inputs.push('prep=' + prep);						// int
	inputs.push('medicineID=' + medicineID);			// int
	inputs.push('medicineName=' + encodeURIComponent(medicineName));	// Str
	inputs.push('strength=' + strength);				//capacity  - string
	inputs.push('unit=' + unit);						// int
	inputs.push('dose=' + dose);						// Str
	inputs.push('frequency=' + frequency);				// double
	inputs.push('instruction=' + instruction);			// int
	inputs.push('route=' + route);						// int
	inputs.push('days=' + days);						// double
	inputs.push('qty=' + qty);							// double
	inputs.push('paediatricsMedicineFlag=' + paediatricsMedicineFlag);         		// Str 2
	inputs.push('paediatricsMedicineCapacity=' + paediatricsMedicineCapacity);		// Str 2
	inputs.push('dayPrescription=' + dayPrescription);	// Str
	
	//for IVF
//	inputs.push('ivfTreatId=' + ivfTreatId);// int
	inputs.push('ivfTreatmentId=' + ivfTreatId);
	
	var str = inputs.join('&');

	jQuery.ajax({
		
		type : "POST",
		data : str + "&reqType=AJAX",
	//	url : "ehat/prescriptionController/saveOPDPrescription",
		url : "ehat/ivfPrescriptionController/saveIVFPrescription",
		
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alert("Prescription Saved Sucessfully");
				clearPrescriptionFields();
				
				getAllPrescriptionsIVF();
		//		location.reload(true);
				
			}
			else if (data == 2) {
				alert( "Prescription Updated Sucessfully");
				clearPrescriptionFields();
				
				getAllPrescriptionsIVF();
		//		location.reload(true);
				
			}	
		}
	});
}


/**
 *  @aniket_kanse, 22 DEC 21, for prescription: get medicine names by auto suggestion.
 */
function autoSuggestMedicinesIVF(id, callfrom){
	
	
	
//	alert("id : "  + id + ", callfrom : " + callfrom);
	
	var prep = ($("#prep").val()).trim();
	var findingName = $("#" + id).val();
	
	var letter = findingName;
	
	if (callfrom == "opdTemplate") {
	//	$("#medicineIDDoc").val("0");
		prep = ($("#prepDoc").val()).trim();
	}
	
	/*if(letter == "" || letter == null || letter == "null" || letter == undefined){
		
		alert("Please enter search value");
		$("#" + id).focus();
		return false;
	}*/
	
	var parameterFetchMedicine = "NORMAL";
	if ($("#paediatricsDocCheckBox").prop("checked")){
		parameterFetchMedicine = "PAEDIA_DOC_CHECKBOX";
		
		getPaediatricsMedicineIVF(id, prep, letter);
		
		return;
		
	}
	//flow designed and developed by Akshata 4-april-2022 
	if ($("#fetchStockFromChkbox").prop("checked")){
	//	parameterFetchMedicine = "PAEDIA_DOC_CHECKBOX";
		
		getPharmacyStockMedicineIVF(id, prep, letter);
		
		return;
		
	}

	
	var inputs = [];
	
//	inputs.push('auto=' + auto);
//	inputs.push('findingName=' + findingName);
//	inputs.push('parameterFetchMedicine=' + parameterFetchMedicine);
	inputs.push('prep=' + prep);
	inputs.push('letter=' + letter);
	
	var str = inputs.join('&');
	

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/prescriptionController/autoSuggestMedicinelist",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var resultData = [];
						var template = "";
						
						for ( var j = 0; j < r.lstprod.length; j++) {
							
							var arrValue = r.lstprod[j].productId +"-"+r.lstprod[j].productName;
							var idValue = r.lstprod[j].productId;
							var productName = r.lstprod[j].productName;
							
							resultData.push({
								ID : idValue,
								Name : productName
							});
							template = template + '<li data-value="' + idValue
									+ '" class=""><a href="#">' + arrValue
									+ '</a></li>';
						}
						
				if(callfrom == "prescription"){
					
					setTimeout(function() {
						
						$("div#divTagname .typeahead").html(template);
						$("div#divTagname .typeahead").show();
				
						$("input#" + id).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("input#" + id).data('typeahead').source = resultData;
					}, 500);
					
				}else if(callfrom == "opdTemplate"){
					
					setTimeout(function() {
						
						$("div#divTagmedicineNameDoc .typeahead").html(template);
						$("div#divTagmedicineNameDoc .typeahead").show();
				
						$("input#" + id).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("input#" + id).data('typeahead').source = resultData;
					}, 500);
					
				}
		}
	});
	
	function displayResult(item) {
		
		var res = item.text.split('-');
		
		var medicineId = res[0];
		var medicineName = res[1];
		
		$("#" + id).val(res[1]);
		
		setMedicineDetailsIVF(medicineId, callfrom);
	
	}
}

function setMedicineDetailsIVF(medicineId, callfrom){
	
	
	if(medicineId !=undefined && medicineId!=null && medicineId!="" && medicineId!="null"){
		
		var inputs = [];
		inputs.push('productId=' + medicineId);
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/prescriptionController/getMedicineById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				if(callfrom == "prescription"){
					
					$("#medicineID").val(r.productId);
					$("#name").val(r.productName);
					$("#prep").val(r.preparationMaster.preparationId);
					$("#strength").val(r.strengthMaster.strengthName);
					$("#unit").val(r.uomMaster.uomId);
					fetchRoutesByPreparationId(callfrom);
					
				} else if(callfrom == "opdTemplate"){							// if added, 13 JAN 22
					
					$("#medicineIDDoc").val(r.productId);
					$("#medicineNameDoc").val(r.productName);
					$("#prepDoc").val(r.preparationMaster.preparationId);
					$("#strengthDoc").val(r.strengthMaster.strengthName);
					$("#unitDoc").val(r.uomMaster.uomId);
					fetchRoutesByPreparationId(callfrom);
				}
			}
		});
	}
}


function getPaediatricsMedicineIVF(id, prep, letter){
//	alert("--getPaediatricsMedicine--" + id + "--" + prep + "--" + letter);
	
	var inputs = [];
	
	inputs.push('prep=' + prep);
	inputs.push('letter=' + letter);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/prescriptionController/paediatricsMedicineAutoSuggestList",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			
		//	alert(JSON.stringify(response));
			
			var resultData = [];
			var template = "";
			for (var j = 0; j < response.listMedication.length; j++) {
				
				var arrValue = response.listMedication[j].id + "-" + response.listMedication[j].medicineName;
				var idValue = response.listMedication[j].id;
				var pname = response.listMedication[j].medicineName;
				
				resultData.push({
					ID : idValue,
					Name : pname
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}
			setTimeout(function() {
				$("div#divTagname .typeahead").html(template);
				$("div#divTagname .typeahead").show();

				$("input#" + id).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + id).data('typeahead').source = resultData;
			}, 500);
					
				
		}
	});
	
	function displayResult(item) {
		
		var res = item.text.split('-');
		
		var medicineId = res[0];
		var medicineName = res[1];
		
		$("#" + id).val(res[1]);
		
		getPaediatricMedicineByIdIVF(medicineId, "prescription");
	
	}
}

function getPaediatricMedicineByIdIVF(medicineId, callfrom){
	
//	alert("--getPaediatricsMedicine--" + medicineId + "--" + callfrom );
	
	if(medicineId !=undefined && medicineId!=null && medicineId!="" && medicineId!="null"){
		
		var inputs = [];
		inputs.push('id=' + medicineId);
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/prescriptionController/getPaediatricsMedicineById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
		//		alert(JSON.stringify(r));	
				
					$("#medicineID").val(r.medicineId);
					$("#name").val(r.medicineName);
					$("#prep").val(r.prepId);
					$("#strength").val(r.strengthName);
					$("#unit").val(r.unit);
					fetchRoutesByPreparationId(callfrom);
					
			}
		});
	}
}

/******
 * @author   : HM00069
 * @Code     : for getting medicine from pharmacy stock auto suggestions
 * *****/
function getPharmacyStockMedicineIVF(id, prep, letter){

	//alert("--getPaediatricsMedicine--" + id + "--" + prep + "--" + letter);
	
	var inputs = [];
	
	inputs.push('prep=' + prep);
	inputs.push('letter=' + letter);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/prescriptionController/getPharmacyStockMedicine",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			
			//alert(JSON.stringify(response));
			
			var resultData = [];
			var template = "";
			for (var j = 0; j < response.listOPDPrescriptionDto.length; j++) {
				
				var arrValue = response.listOPDPrescriptionDto[j].stock_product_id + "-" + response.listOPDPrescriptionDto[j].product_name;
				var idValue = response.listOPDPrescriptionDto[j].stock_product_id;
				var pname = response.listOPDPrescriptionDto[j].product_name;
				
				resultData.push({
					ID : idValue,
					Name : pname
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}
			setTimeout(function() {
				$("div#divTagname .typeahead").html(template);
				$("div#divTagname .typeahead").show();

				$("input#" + id).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + id).data('typeahead').source = resultData;
			}, 500);
					
				
		}
	});
	
	function displayResult(item) {
		
		var res = item.text.split('-');
		
		var medicineId = res[0];
		var medicineName = res[1];
		
		$("#" + id).val(res[1]);
		
		getMedicineFromStockByIdIVF(medicineId, "prescription");
	
	}

}
/******
 * @author   : HM00069
 * @Code     : for getting pediatrics medicine by ID
 * *****/
function getMedicineFromStockByIdIVF(medicineId, callfrom){
	
	//alert("--getPaediatricsMedicine--" + medicineId + "--" + callfrom );
	
	if(medicineId !=undefined && medicineId!=null && medicineId!="" && medicineId!="null"){
		
		var inputs = [];
		inputs.push('id=' + medicineId);
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/prescriptionController/getMedicineFromStockById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
		//		alert(JSON.stringify(r));	
				
					$("#medicineID").val(r.stock_product_id);
					$("#name").val(r.product_name);
					$("#prep").val(r.product_preparation_id);
					$("#strength").val(r.strength_name);
					$("#unit").val(r.uom_name);
					fetchRoutesByPreparationId(callfrom);
					
			}
		});
	}
}

function editOPDPrescriptionsIVF(){
	
	// alert("------------IVF EDIT-----------------s");
	
	var unitId = $("#unitId").val();
	
	if (($("#prescriptionContent").html()).trim() == "") {
		alert("No Data to Edit...");
		return false;
	}
	
	var array = new Array();
	var ivfPrescriptionId = 0;
	
	var dayPrescription ="";
	$("input[name='prepTreatmentMedicineCheckbox']:checked").each(function() {
		array.push($(this).val());
		ivfPrescriptionId = ($(this).attr('id')).trim();
		
	});

	if ((array.length) == 0) {
		alert("Please check the checkbox to edit...");
		return false;
	}

	if ((array.length) != 1) {
		alert("Please Select Single Checkbox...");
		return false;
	}

	if (ivfPrescriptionId == "0" || ivfPrescriptionId == "") {
		alert("Please check the checkbox...");
		return false;
	}
	
//	alert("--ivfPrescriptionId : " + ivfPrescriptionId + ", -- unit ID : " + unitId);
	
	$("#prescription_id").val(ivfPrescriptionId);
	
	if(ivfPrescriptionId != undefined && ivfPrescriptionId != null && ivfPrescriptionId !="" && ivfPrescriptionId !="null"){
			
			var inputs = [];
			
			inputs.push('unitId=' + unitId);
			inputs.push('ivfPrescriptionId=' + ivfPrescriptionId);
			
			var str = inputs.join('&');
			
			jQuery.ajax({
				async : true,
				type : "GET",
				url : "ehat/ivfPrescriptionController/getIVFPrescriptionById",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {
					
				//	alert( JSON.stringify(r) );
					
					setIVFPrescriptionForEditing(r);
				}
			});
		}
}

function setIVFPrescriptionForEditing(r){
	
//	alert(" response : " + JSON.stringify(r));
	
	$("#prescription_id").val(r.prescriptionId);
	
	var dayPrescription ="";
	
	$("#medicineID").val(r.medicineId);
	
	$("#prep").val(r.prep);
	$("#name").val(r.medicineName);
	$("#strength").val(r.strength);
	
	$("#prep").prop('disabled', true);
	$("#name").prop('disabled', true);
	$("#strength").prop('disabled', true);
	
	$("#dose").val(r.dose);
	$("#unit").val(r.unit);
	
	dayPrescription = r.dayPrescription;
	
	$("#mo").prop('checked', false);
	$("#an").prop('checked', false);	
	$("#ev").prop('checked', false);
	$("#nt").prop('checked', false);
	
	var arr = dayPrescription.split(",");
	
	if(arr[0]!="0"){
		$("#mo").prop('checked', true);
		$("#tmo").removeAttr("readonly");
	}
	
	if(arr[1]!="0"){
		$("#an").prop('checked', true);
		$("#tan").removeAttr("readonly");
	}
	
	if(arr[2]!="0"){
		$("#ev").prop('checked', true);
		$("#tev").removeAttr("readonly");
	}
	
	if(arr[3]!="0"){
		$("#nt").prop('checked', true);
		$("#tnt").removeAttr("readonly");
	}
	$("#tmo").val(arr[0]);
	$("#tan").val(arr[1]);
	$("#tev").val(arr[2]);
	$("#tnt").val(arr[3]);
	
	
	$("#frequency").val(r.frequency);
	$("#instruction").val(r.instruction);
	$("#route").val(r.route);
	$("#days").val(r.days);
	$("#qty").val(r.qty);
	
	
	if ((r.paediatricsMedicineFlag) == 'Y') {
		$("#paediatricsDocCheckBox").prop("checked", true);
	} else {
		$("#paediatricsDocCheckBox").prop("checked", false);
	}

	if(r.medicineId == "0"){
		$( "#medicineNotAvailableCheckbox").prop('checked', true);
	}
}


function deleteOPDPrescriptionsIVF(){
	
	var unitId = $("#unitId").val();
	
	if (($("#prescriptionContent").html()).trim() == "") {
		alert("No Data to delete...");
		return false;
	}
	
	var ivf_prescription_id = new Array();					// <--Changed by Akshata 4-April-2022

	$("input[name='prepTreatmentMedicineCheckbox']:checked").each(function() {
		ivf_prescription_id.push($(this).attr('id'));
		
	});

	if ((ivf_prescription_id.length) == 0) {
		alert("Please check the checkbox to delete...");
		return false;
	}
	var r = confirm("Delete Record ?");
	if (r) {
		var inputs = [];
		
		inputs.push('unitId=' + unitId);
		inputs.push('ivfPrescriptionId=' + ivf_prescription_id);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "ehat/ivfPrescriptionController/deleteIVFPrescription",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				alert(r);
				getAllPrescriptionsIVF();
			}
		});
	}
	
}