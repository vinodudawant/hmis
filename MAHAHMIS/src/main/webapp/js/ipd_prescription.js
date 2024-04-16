/**
 *  @aniket_kanse, 20 DEC 21, for doctor desk - prescription
 *   
 */

function getPrescriptionTemplate(id){
	
	var todaysDefaultDate = $("#date").html();
	var dateSplit = todaysDefaultDate.split('-');
	todaysDefaultDate = dateSplit[0] + "/" + dateSplit[1] + "/" + dateSplit[2];
	var depid = $("#depdocdeskid").val();
	
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	
	$("#ipdDoctorStationJSPHeadDiv").html('');
	$("#Prescription").show();
	//Added By Akshata 
	$("#ddInstructions").hide();
	$("#instruct").hide();
	$("#diets").hide();
	$("#ADNOTE").hide();
	fetchAllPrescriptionInstruction();
	getAllPreparationsForPrescription();
	getAllRoutesForPrescription();
	fetchAllUnits();
	//getAllPrescriptions();
	
	
	getAllPrescriptionsDateWise();
	
	getDiagnosisList();
	
	fetchAllAllergyAlerts();
	
	getfollowUpForOPDPatient();
	
}


function getAllPrescriptions(){
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	var unitID = $("#unitId").val();
	
	if(treatmentId !=undefined && treatmentId !=null && treatmentId !="" && treatmentId !="null"){
		
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('unitId=' + unitID);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/prescriptionController/getAllPrescriptionsByTreatmentId",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				setAllPrescriptions(r);
			}
		});
	}
}

//added by vishant
function getAllPrescriptionsDateWise(){
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	var unitID = $("#unitId").val();
	var prescriptionOrderDate = $("#OFdate-pick4").val();
	
	if(treatmentId !=undefined && treatmentId !=null && treatmentId !="" && treatmentId !="null"){
		
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('unitId=' + unitID);
		inputs.push('prescriptionOrderDate=' + prescriptionOrderDate);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/prescriptionController/getAllPrescriptionsByTreatmentIdDateWise",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				setAllPrescriptions(r);
			}
		});
	}
}

function setAllPrescriptions(r){
	
	var testObj = r;

	var prescriptionContentTemp = "";
	var instruction = "";
	var prep = "";
	var unit = "";
	var frequency="";
	
	var prepCount = 0;
	
	if (testObj.listOPDPrescriptionDtoSP.length > 0) {
		
		for ( var int = 0; int < testObj.listOPDPrescriptionDtoSP.length; int++) {

			prescriptionContentTemp = prescriptionContentTemp
					+ "<tr><td class='col-md-1-1 center'>"
					+ ++prepCount
					+ ".</td>"
					
					+ "<td class='col-md-2-1'>"
					+ testObj.listOPDPrescriptionDtoSP[int].prepName
					+ "</td>"
					
					if(testObj.listOPDPrescriptionDtoSP[int].nutracalProductFlag==0){
						prescriptionContentTemp = prescriptionContentTemp
					+ "<td class='col-md-2-1'>"
					+ testObj.listOPDPrescriptionDtoSP[int].medicineName
					
					+ "<br>" +"("+testObj.listOPDPrescriptionDtoSP[int].drugName +")"
					+ "</td>"
					}
					else{
						prescriptionContentTemp = prescriptionContentTemp
						+ "<td class='col-md-2-1'>"
						+ testObj.listOPDPrescriptionDtoSP[int].medicineName
						
						
						+ "</td>"
					}
					prescriptionContentTemp = prescriptionContentTemp
					
					
					
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listOPDPrescriptionDtoSP[int].strength
					+ "</td>"
					
				if(testObj.listOPDPrescriptionDtoSP[int].dose!=null)	{
					prescriptionContentTemp = prescriptionContentTemp
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listOPDPrescriptionDtoSP[int].dose
					+ "</td>"
				}
				else{
					prescriptionContentTemp = prescriptionContentTemp
					+ "<td class='col-md-1-1 center'>"
					+ "-"
					+ "</td>"
				}
					prescriptionContentTemp = prescriptionContentTemp
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listOPDPrescriptionDtoSP[int].unitName
					+ "</td>"
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listOPDPrescriptionDtoSP[int].dayPrescription
					+ "</td>"
					+ "<td class='col-md-3-1 center' style='padding-left: 15px;'>"
					+ testObj.listOPDPrescriptionDtoSP[int].instructionNameForUI
					+ "</td>"
					+ "<td class='col-md-1-1 center' style='padding-left: 15px;'>"
					+ testObj.listOPDPrescriptionDtoSP[int].days
					+ "</td>"
					+ "<td class='col-md-1-1 center' style='padding-left: 15px;'>"
					+ testObj.listOPDPrescriptionDtoSP[int].qty
					+ "</td>"
					
					if( testObj.listOPDPrescriptionDtoSP[int].ecogreenPrescrptionId == 0){
						prescriptionContentTemp = prescriptionContentTemp	+ "<td class='col-md-1-1 center'>"
						+ "<input name='prepTreatmentMedicineCheckbox' id='"
						+ (testObj.listOPDPrescriptionDtoSP[int].prescriptionId)
						+ "' type='checkbox' style='cursor: pointer; margin-top: 2px;' /></td>"
					}else{
						prescriptionContentTemp = prescriptionContentTemp	+ "<td class='col-md-1-1 center'>"
						+ "<input name='prepTreatmentMedicineCheckbox' id='"
						+ (testObj.listOPDPrescriptionDtoSP[int].prescriptionId)
						+ "' type='checkbox' style='cursor: pointer; margin-top: 2px;' disabled /></td>"
					}
					
					prescriptionContentTemp = prescriptionContentTemp
					
					+ "</tr>";
		}
		
		$("#divOmID").html(testObj.listOPDPrescriptionDtoSP[testObj.listOPDPrescriptionDtoSP.length-1].prescriptionId);
		
	}else{$("#divOmID").html('-')}

	$('#prescriptionContent').html(prescriptionContentTemp);
	$("#prescription_id").val("0");

	/*prepCount = 0;
	$("#prescriptionCoverSheetContent").setTemplate(
			prescriptionCoverSheetContent);
	$("#prescriptionCoverSheetContent")
			.processTemplate(testObj);*/
	
}

function fetchAllUnits(){
	
	
	var inputs = [];
	inputs.push('unitId=' + 1);
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
			
			setAllUnits(res);
			
		}
	});
}

function setAllUnits(r){
	
	var list = "";  
	list = list + "<option value='0'> -SELECT UNIT- </option>";
	
    for ( var i = 0; i < r.listUomMaster.length; i++) {  

        list = list + "<option value='"+r.listUomMaster[i].uomId+"' class='un'>" + (r.listUomMaster[i].uomName) +"</option>";    
    }  
    
    $("#unit").html(list);
    $("#unitDoc").html(list);		// added, 13 JAN 22 // for OPD prescription template
}

function fetchAllPrescriptionInstruction(){
	
	
	var inputs = [];
	inputs.push('unitId=' + 1);
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
			
			setPrescriptionInstruction(res);
			
		}
	});
}

function setPrescriptionInstruction(r){
	
	var list = "";  
	list = list + "<option value='0'> -SELECT- </option>";
	
    for ( var i = 0; i < r.listPrescriptionInstructionDto.length; i++) {  

        list = list + "<option value='"+r.listPrescriptionInstructionDto[i].id+"' class='un'>" + (r.listPrescriptionInstructionDto[i].englishInstruction) + " / " + (r.listPrescriptionInstructionDto[i].hindiInstruction)+ " / " + (r.listPrescriptionInstructionDto[i].marathiInstruction) +"</option>";    
    }  
    
    $("#instruction").html(list);
    $("#instructionDoc").html(list); // added, 13 JAN 22 // for OPD prescription template
    
}

function getAllPreparationsForPrescription(){
	
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
			
			setPreparationsForPrescription(res);
		}
	});
} 


function setPreparationsForPrescription(r){
	
	var list = "";  
	list = list + "<option value='0'> -SELECT- </option>";
	
    for ( var i = 0; i < r.listpreparationmaster.length; i++) {  

        list = list + "<option value='"+r.listpreparationmaster[i].preparationId+"' class='un'>" + (r.listpreparationmaster[i].preparationName) + "</option>";    
    }  
    
    $("#prep").html(list);
    $("#prepDoc").html(list); // added, 13 JAN 22 // for OPD prescription template
	
}

/**
 *  @aniket_kanse, 22 DEC 21, for prescription: fetch routes by preparation ID.
 */
function fetchRoutesByPreparationId(callfrom){
	
	if(callfrom == "prescription"){
		var prepID = $("#prep").val();
	} else {
		var prepID = $("#prepDoc").val();
	}
	
	
	var unitID = $("#unitId").val();
	
	var inputs = [];
	inputs.push('prepID=' + prepID);
	inputs.push('unitId=' + unitID);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/prescriptionController/getRoutesByPreparationId",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setRoutes(r);
			
			var prepID = $("#prep").val();
			fetchPreprationById(prepID);
		}
	});
}

function setRoutes(r){
	
	var list = "";  
	
//	alert(r);
//	alert(JSON.stringify(r));
	
	if(r.listroutemasters.length > 0){
		
		list = list +  "<option value='"+r.listroutemasters[0].route_id+"' class='un'>" + (r.listroutemasters[0].routename) + "</option>";    
	    
	    $("#route").html(list);
	    $("#routeDoc").html(list);
		
	} else {
		
		alert(" No Routes found for selected preparation !");
		getAllRoutesForPrescription();
	}
	
}

function getAllRoutesForPrescription(){
	
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
			setAllRoutes(r);
		}
	});
}

function setAllRoutes(r){
	
	var list = "";  
	list = list + "<option value='0'> -SELECT- </option>";
	
    for ( var i = 0; i < r.listroutemasters.length; i++) {  

        list = list + "<option value='"+r.listroutemasters[i].route_id+"' class='un'>" + (r.listroutemasters[i].routename) + "</option>";    
    }  
    
    $("#route").html(list);
    $("#routeDoc").html(list);		// added, 13 JAN 22 // for OPD prescription template
	
}

function getPaediatricsMedicine(id, prep, letter){
//	alert("--getPaediatricsMedicine--" + id + "--" + prep + "--" + letter);
	
	var inputs = [];
	
	inputs.push('prep=' + prep);
	inputs.push('letter=' + letter);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
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
		
		getPaediatricMedicineById(medicineId, "prescription");
	
	}
}

function getPaediatricMedicineById(medicineId, callfrom){
	
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
				
					//$("#medicineID").val(r.medicineId);
					//$("#name").val(r.medicineName);
					//$("#prep").val(r.prepId);
					//$("#strength").val(r.strengthName);
					//$("#unit").val(r.unit);
					//fetchRoutesByPreparationId(callfrom);
				

				
				//		alert(JSON.stringify(r));	
						
							$("#medicineID").val(r.medicineId);
							$("#name").val(r.medicineName);
							$("#prep").val(r.prepId);
							$("#strength").val(r.strengthName);
							$("#unit").val(r.unit);
							$("#dose").val(r.fixedDose);
							$("#instruction").val(r.instructionName);
							$("#frequency").val(r.frequency);
							$("#days").val(r.days);
							
							 var days=$("#days").val();
							var frequency= $("#frequency").val();
							$("#qty").val(parseInt(days) * parseInt(frequency) );
							if(r.morningFlag == 1){
								$("#mo").prop('checked', true);
							}else{
								$("#mo").prop('checked', false);
							}
							
							if(r.afterNoonFlag == 1){
								$("#an").prop('checked', true);
							}else{
								$("#an").prop('checked', false);
							}
							
							if(r.eveningFlag == 1){
								$("#ev").prop('checked', true);
							}else{
								$("#ev").prop('checked', false);
							}
							
							if(r.nightFlag == 1){
								$("#nt").prop('checked', true);
							}else{
								$("#nt").prop('checked', false);
							}
							
							
							fetchRoutesByPreparationId(callfrom);
							
					
					
			}
		});
	}
}


/**
 *  @aniket_kanse, 22 DEC 21, for prescription: get medicine names by auto suggestion.
 */
function autoSuggestMedicines(id, callfrom){
	
	
	
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
		
		getPaediatricsMedicine(id, prep, letter);
		
		return;
		
	}
	//flow designed and developed by Akshata 4-april-2022 
	if ($("#fetchStockFromChkbox").prop("checked")){
	//	parameterFetchMedicine = "PAEDIA_DOC_CHECKBOX";
		
		getPharmacyStockMedicine(id, prep, letter);
		
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
		
		setMedicineDetails(medicineId, callfrom);
	
	}
}

function setMedicineDetails(medicineId, callfrom){
	
	
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
					var preparationQtyStatus = r.preparationMaster.preparationQty;
					if(preparationQtyStatus=="1"){
						$("#qty").val(1);
						$("#preprationQty").val("1");
					}
					else{
						
						$("#qty").val(0);
						$("#preprationQty").val("0");
					}
					
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


function saveOPDPrescription(){
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	var patientId = $.trim($('#pt_Id').val()); 		
	
	var prep = $.trim($("#prep :selected").val());
	var medicineName = $.trim($("#name").val());
	var medicineID = $.trim($("#medicineID").val()); // 0 from UI
	
	var prescriptionOrderDate = $("#OFdate-pick4").val();
	
	//alert("-- -- medicineID : " + medicineID);
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
	if (prep == "" || prep == "0") {
		alert("Please Select Prep...");
		SetFocus("prep");
		return false;
	}
	if ($("#medicineNotAvailableCheckbox").prop("checked")){
		
		var medicineName = $("#name").val();
		if (medicineName == "") {
			alert("Please Enter proper medicine name");
			SetFocus("name");
			return false;
		}
			// No need to show validation 
	}else if($("#fetchStockFromChkbox").prop("checked")){
		
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
	
	var inputs = [];
	inputs.push('prescriptionId=' + prescriptionId);	// int
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
	inputs.push('prescriptionOrderDate=' + prescriptionOrderDate);
	
	var str = inputs.join('&');

	jQuery.ajax({
		
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/prescriptionController/saveOPDPrescription",
		
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
			//	alert("Prescription Saved Sucessfully");
				clearPrescriptionFields();
				
				//getAllPrescriptions();
				getAllPrescriptionsDateWise();
		//		location.reload(true);
				
			}
			else if (data == 2) {
			//	alert( "Prescription Updated Sucessfully");
				clearPrescriptionFields();
				
				//getAllPrescriptions();
				getAllPrescriptionsDateWise();
		//		location.reload(true);
				
			}	
		}
	});
}
	
function clearPrescriptionFields(){
	
	$("#medicineID").val("0");
//	$('#prep').prop('disabled', false);
//	$('#name').prop('disabled', false);
	$("#prep").val('0');
	$("#name").val('');
	$("#strength").val('');
	$("#dose").val('');
	$("#unit").val('0');
	$("#frequency").val('');
	$("#instruction").val('0');
	$("#route").val('0');
	$("#days").val('');
	$("#qty").val('');
	$("#paediatricsMedicineFlag").val('N');
//	$("#paediatricsMedicineCapacity").val("");
	
	$("#mo").prop('checked', false);
	$("#an").prop('checked', false);	
	$("#ev").prop('checked', false);
	$("#nt").prop('checked', false);
	$('#tmo').val('1');
	$('#tan').val('1');
	$('#tev').val('1');
	$('#tnt').val('1');
	$("#tmo").attr('readonly', 'readonly');
	$("#tan").attr('readonly', 'readonly');
	$("#tev").attr('readonly', 'readonly');
	$("#tnt").attr('readonly', 'readonly');
	
//	getAllPrescriptions();
}

function editOPDPrescriptions(){
	
//	alert("-- editing prescription :: ");
	
	var unitId = $("#unitId").val();
	
	if (($("#prescriptionContent").html()).trim() == "") {
		alert("No Data to Edit...");
		return false;
	}
	
	var array = new Array();
	var prescription_id = 0;
	var dayPrescription ="";
	$("input[name='prepTreatmentMedicineCheckbox']:checked").each(function() {
		array.push($(this).val());
		prescription_id = ($(this).attr('id')).trim();
		
	});

	if ((array.length) == 0) {
		alert("Please check the checkbox to edit...");
		return false;
	}

	if ((array.length) != 1) {
		alert("Please Select Single Checkbox...");
		return false;
	}

	if (prescription_id == "0" || prescription_id == "") {
		alert("Please check the checkbox...");
		return false;
	}
	
//	alert("--prescription_id : " + prescription_id + ", -- unit ID : " + unitId);
	
	$("#prescription_id").val(prescription_id);
	
	if(prescription_id !=undefined && prescription_id !=null && prescription_id !="" && prescription_id !="null"){
			
			var inputs = [];
			
			inputs.push('unitId=' + unitId);
			inputs.push('prescriptionId=' + prescription_id);
			
			var str = inputs.join('&');
			
			jQuery.ajax({
				async : true,
				type : "GET",
				url : "ehat/prescriptionController/getPrescriptionById",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {
					
				//	alert( JSON.stringify(r) );
					
					setPrescriptionForEditing(r);
				}
			});
		}
}

function setPrescriptionForEditing(r){
	
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


function deleteOPDPrescriptions(){
	
	var unitId = $("#unitId").val();
	
	if (($("#prescriptionContent").html()).trim() == "") {
		alert("No Data to delete...");
		return false;
	}
	//Changed by Akshata 4-April-2022
	var prescription_id = new Array();
	//var prescription_id = 0;
	$("input[name='prepTreatmentMedicineCheckbox']:checked").each(function() {
		//prescription_id = ($(this).attr('id')).trim();
		prescription_id.push($(this).attr('id'));
		
	});

	/*if (prescription_id == "0" || prescription_id == "") {
		alert("Please check the checkbox...");
		return false;
	}*/
	if ((prescription_id.length) == 0) {
		alert("Please check the checkbox to delete...");
		return false;
	}
	var r = confirm("Delete Record ?");
	if (r) {
		var inputs = [];
		
		inputs.push('unitId=' + unitId);
		inputs.push('prescriptionId=' + prescription_id);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "ehat/prescriptionController/deleteOPDPrescription",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				alert(r);
				getAllPrescriptions();
			}
		});
	}
	
}

function opdPrescriptionPrintPopup(){
	$("#iPrintBillNewOPD").show();
}

function printPrescriptionHF(callFrom){
	
	var instructionLanguage = $("input[name='prepInstructionPopup1']:checked").val();
	
//	var billId=$("#billNo").text();    
	var billId=0;
	var treatId = $("#tr_Id").val();
	var patId = $("#pt_Id").val();
  
	var deptId=1;
	 var pendFlag="N"; 
	 var recId=0;
	 var unitId = $("#unitId").val();
	 
	 
    if(callFrom == "HF") {
    	
    	window.open("ipd_prescription_hf_english_print.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag+"&instructionLanguage="+instructionLanguage+"&unitId="+unitId);
    	
    } if(callFrom == "Plain") {
    	
    	window.open("ipd_prescription_plain_print.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag+"&instructionLanguage="+instructionLanguage+"&unitId="+unitId);
    	
    }   else if(callFrom == "OPD"){
    	
    	window.open("ipd_prescription_print.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag+"&instructionLanguage="+instructionLanguage+"&unitId="+unitId);
    }
	 	
}

function saveUpdateOPDPrescriptionTemplates(){
	
	var templateId = ($("#docTemplateNameID").val()).trim();
	
	var templateName = ($("#docTemplateNameText").val()).trim();
	if (templateName == "") {
		alert("Please enter template name...");
		return false;
	}

	var myTemplateCheckBoxFlag = "N";
	if ($("#docMyTemplateCheckbox").prop("checked")){
		myTemplateCheckBoxFlag = "Y";
	}

	var orgTemplateCheckBoxFlag = "N";
	if ($("#docOrgTemplateCheckbox").prop("checked")){
		orgTemplateCheckBoxFlag = "Y";
	}
		
	var inputs = [];
	
	inputs.push('templateId=' + templateId);
	inputs.push('templateName=' + templateName);
	inputs.push('myTemplateCheckBoxFlag=' + myTemplateCheckBoxFlag);
	inputs.push('orgTemplateCheckBoxFlag=' + orgTemplateCheckBoxFlag);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/prescriptionController/saveOPDPrescriptionTemplates",
		
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alert("Prescription Template Saved Sucessfully");
				fetchOPDPrescriptionTemplatesByID("0");
			}
			else if (data == 2) {
				alert( "Prescription Template Updated Sucessfully");
				
				// on update
				if (templateId != 0) {
					setTimeout(function() {
						fetchOPDPrescriptionTemplatesByID(templateId);
						$("#docTemplateNameSelect").val(templateId);
					}, 500);
				}
				
			}else if (data == 3) {				
				
				alert("Prescription Template is Already Exist");				
			}else {
				
				alert("Oops Some Problem Ocured");
			}
		}
	});
}


function fetchOPDPrescriptionTemplatesByID(templateId){
	
//	 alert("--fetchOPDPrescriptionTemplatesByID :: templateId-- " + templateId);
	 
	 
	
	var inputs = [];
	inputs.push('templateId=' + templateId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/prescriptionController/fetchOPDPrescriptionTemplatesByID",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if (templateId == 0) {
				setOPDPrescriptionTemplatesNew(r);
			} else if(templateId != 0){
				
		//		alert("--setOPDPrescriptionTemplatesExisting--" + JSON.stringify(r));
				setOPDPrescriptionTemplatesExistingg(r);
			}
			
		}
	});
	
}

function setOPDPrescriptionTemplatesNew(r){
	
		if(r != null ){
			
			var list = "";  
			list = list + "<option value='0'> - New Template - </option>";
			
		    for ( var i = 0; i < r.listOPDPrescriptionTemplatesDTO.length; i++) {  
	
		        list = list + "<option value='"+r.listOPDPrescriptionTemplatesDTO[i].templateId+"'>" + (r.listOPDPrescriptionTemplatesDTO[i].templateName) + "</option>";    
		    }  
		    
		    $("#docTemplateNameSelect").html(list);
		    
		    $("#existingAddReplaceTemplateNameSelect").html(list);		// for saving prescription as OPD template.
		    
		    
		    
		    $("#docTemplateNameText").val("");
			$("#docTemplateNameID").val("0");
			$("#docMyTemplateCheckbox").prop('checked', true);
			$("#docOrgTemplateCheckbox").prop('checked', false);
			
			var htm = "";
			var index = 1;
			
			var htm1 = "";
			var index1 = 1;
		// debugger;
			
			for ( var i = 0; i < r.listOPDPrescriptionTemplatesDTO.length; i++) {
				
						if (r.listOPDPrescriptionTemplatesDTO[i].myTemplateCheckBoxFlag == "Y" ) {
							
							htm = htm
							+ '<tr> '
							+ ' <td class="col-sm-1-1 center">'
							+ index1
							+ '</td>'
							+ ' <td class="col-sm-1-1 center">'
							+ r.listOPDPrescriptionTemplatesDTO[i].templateName
							+ '</td>'
							+ ' <td class="col-sm-2-1 center">'
							+ r.listOPDPrescriptionTemplatesDTO[i].doctorName
							+ '</td>'
							
							+ ' <td class="col-sm-1-1 center">'
							+ '	<button class="btn btn-xs btn-primary" value="Use" onclick=usePrescriptionTemp('
							+ r.listOPDPrescriptionTemplatesDTO[i].templateId
							+ ')><i class="fa fa-edit"></i></button></td>'
							
							+ ' <td class="col-sm-1-1 center">'
							+ '	<button class="btn btn-xs btn-danger" onclick=deletePrescriptionTemp('
							+ r.listOPDPrescriptionTemplatesDTO[i].templateId
							+ ')><i class="fa fa-trash-o"></i></button></td>'
							+ '</tr>';
					index1++;
					$("#prepDocMyTemplateTable").html(htm);
					
				}
			}
			
			for ( var i = 0; i < r.listOPDPrescriptionTemplatesDTO.length; i++) {
				
				if (r.listOPDPrescriptionTemplatesDTO[i].orgTemplateCheckBoxFlag == "Y") {
					
					htm1 = htm1
					+ '<tr> '
					+ ' <td class="col-sm-1-1 center">'
					+ index1
					+ '</td>'
					+ ' <td class="col-sm-1-1 center">'
					+ r.listOPDPrescriptionTemplatesDTO[i].templateName
					+ '</td>'
					+ ' <td class="col-sm-2-1 center">'
					+ r.listOPDPrescriptionTemplatesDTO[i].doctorName
					+ '</td>'
					
					+ ' <td class="col-sm-1-1 center">'
					+ '	<button class="btn btn-xs btn-primary" value="Use" onclick=usePrescriptionTemp('
					+ r.listOPDPrescriptionTemplatesDTO[i].templateId
					+ ')><i class="fa fa-edit"></i></button></td>'
					
					+ ' <td class="col-sm-1-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deletePrescriptionTemp('
					+ r.listOPDPrescriptionTemplatesDTO[i].templateId
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					+ '</tr>';
			index1++;
			$("#prepDocOrgTemplateTable").html(htm1);
			
		}
      }
			
			
    }
}

//function setOPDPrescriptionTemplatesExistingg(obj){

function setOPDPrescriptionTemplatesExistingg(r){
	
	//	alert("--in function setOPDPrescriptionTemplatesExisting--" + JSON.stringify(r));
		
	//	debugger;
	
	if(r != null ){
		
		$("#docTemplateNameText").val(r.listOPDPrescriptionTemplatesDTO[0].templateName);
		$("#docTemplateNameID").val(r.listOPDPrescriptionTemplatesDTO[0].templateId);
		
		if ((r.listOPDPrescriptionTemplatesDTO[0].myTemplateCheckBoxFlag) == "Y"){
			$("#docMyTemplateCheckbox").prop('checked', true);
		} else{
			$("#docMyTemplateCheckbox").prop('checked', false);
		}
		
		if ((r.listOPDPrescriptionTemplatesDTO[0].orgTemplateCheckBoxFlag) == "Y"){
			$("#docOrgTemplateCheckbox").prop('checked', true);
		}
		else{
			$("#docOrgTemplateCheckbox").prop('checked', false);
		}
		
		var opdPrescriptionTemplateContent = "";
		var prep = "";
		var instruction = "";
		var route = "";
		prepCount = 0;
		
		if ((r.listOPDPrescriptionTemplatesDTO[0].listOPDPrescriptionTemplateMedicineDto.length) > 0) {
			
			for ( var int = 0; int < (r.listOPDPrescriptionTemplatesDTO[0].listOPDPrescriptionTemplateMedicineDto.length); int++) {
				
				
				if ((r.listOPDPrescriptionTemplatesDTO[0].listOPDPrescriptionTemplateMedicineDto[int].prep) != 0) {
					prep = $(
							"#prepDoc option[value='"
									+ (r.listOPDPrescriptionTemplatesDTO[0].listOPDPrescriptionTemplateMedicineDto[int].prep)
									+ "']").text();
				}
				
				if ((r.listOPDPrescriptionTemplatesDTO[0].listOPDPrescriptionTemplateMedicineDto[int].instruction) != 0) {
					instruction = $(
							"#instructionDoc option[value='"
									+ (r.listOPDPrescriptionTemplatesDTO[0].listOPDPrescriptionTemplateMedicineDto[int].instruction)
									+ "']").text();
				}
				
				if ((r.listOPDPrescriptionTemplatesDTO[0].listOPDPrescriptionTemplateMedicineDto[int].route) != 0) {
					route = $(
							"#routeDoc option[value='"
									+ (r.listOPDPrescriptionTemplatesDTO[0].listOPDPrescriptionTemplateMedicineDto[int].route)
									+ "']").text();
				}
				
				var frequency="";
				var newchar = '-';                            
				frequency = r.listOPDPrescriptionTemplatesDTO[0].listOPDPrescriptionTemplateMedicineDto[int].dayPrescription; 
				if ( frequency == "0,0,0,0" || frequency == null || frequency == "" || frequency == undefined){
					frequency = r.listOPDPrescriptionTemplatesDTO[0].listOPDPrescriptionTemplateMedicineDto[int].frequency;                  
					}else{                                
						frequency = frequency.split(',').join(newchar); 
					}
				
				opdPrescriptionTemplateContent = opdPrescriptionTemplateContent
				
				+ "<tr><td class='col-md-1-1 center'>"
				+ (++prepCount)
				+ ".</td>"
				+ "<td class='col-md-4-1'>"
				+ (prep)
				+ ". "
				+ r.listOPDPrescriptionTemplatesDTO[0].listOPDPrescriptionTemplateMedicineDto[int].medicineName
				+ "</td>"

				+ "<td class='col-md-1-1 center'>"
				+ r.listOPDPrescriptionTemplatesDTO[0].listOPDPrescriptionTemplateMedicineDto[int].strength
				+ "</td>"

				+ "<td class='col-md-1-1 center'>"
				+ r.listOPDPrescriptionTemplatesDTO[0].listOPDPrescriptionTemplateMedicineDto[int].dose
				+ "</td>"

				+ "<td class='col-md-1-1 center'>"
				+ frequency
				+ "</td>"

				+ "<td class='col-md-2-1 center'>"
				+ instruction
				+ "</td>"

				+ "<td class='col-md-1-1 center'>"
				+ route
				+ "</td>"

				+ "<td class='col-md-1-1 center'>"
				+ r.listOPDPrescriptionTemplatesDTO[0].listOPDPrescriptionTemplateMedicineDto[int].days
				+ "</td>"

				+ "<td class='col-md-1-1 center'>"
				+ r.listOPDPrescriptionTemplatesDTO[0].listOPDPrescriptionTemplateMedicineDto[int].qty
				+ "</td>"

				+ "<td>"
				+ "<input type='checkbox' name='chkboxPrescTempMedicine' id='"
				+ r.listOPDPrescriptionTemplatesDTO[0].listOPDPrescriptionTemplateMedicineDto[int].templateMedicineId
				+ "' style='cursor: pointer;' /></td>"
				+ "</tr>";
				
				
			} // END for
			
		} // END if
		
		$('#prescriptionTemplateContentDocTable').html(opdPrescriptionTemplateContent);
			
	}
}

function refreshFetchOPDPrescriptionTemplate(){
	
	var templateId = ($("#docTemplateNameSelect").val()).trim();
	
//	alert("templateId : " + templateId);
	
//	return; 
	
	if (templateId == "0") {
		disableOPDPrescriptionTemplate();							// new 1
		refreshOPDPrescriptionTemplatesModal();     				// new 2
		refreshOPDPrescriptionTemplateMedicine();					// new 3
	} else {
		enableOPDPrescriptionTemplate();							// new 4
		refreshOPDPrescriptionTemplateMedicine();					// new 3
		fetchOPDPrescriptionTemplatesByID(templateId);
	}
	
}

function disableOPDPrescriptionTemplate(){
	
	$("#prepDocTemplateMedicineID").val("0");
	$("#prepDoc").prop("disabled", true);
	$("#medicineNameDoc").prop("disabled", true);
	$("#medicineIDDoc").prop("disabled", true);
	$("#strengthDoc").prop("disabled", true);
	$("#unitDoc").prop("disabled", true);
	$("#doseDoc").prop("disabled", true);
	$("#frequencyDoc").prop("disabled", true);
	$("#instructionDoc").prop("disabled", true);
	$("#routeDoc").prop("disabled", true);
	$("#daysDoc").prop("disabled", true);
	$("#qtyDoc").prop("disabled", true);
	//$("#saveMedDoc").prop("disabled", false);
}

function refreshOPDPrescriptionTemplatesModal(){
	
	$("#docTemplateNameID").val("0");
	$("#docTemplateNameText").val("");
	$("#docOrgTemplateCheckbox").prop("checked", false);
	$("#prescriptionTemplateContentDocTable").html("");
	$("#prescriptionTemplateContentDocHiddenDiv").html("");

	// disable Paeditric checkbox
	$("#paediatricsDocCheckBox").prop("checked", false);
	
}

function refreshOPDPrescriptionTemplateMedicine(){
	
	$("#prepDocTemplateMedicineID").val("0");
	$("#prepDoc").val("0");
	$("#medicineNameDoc").val("");
	$("#medicineIDDoc").val("0");
	$("#strengthDoc").val("");
	$("#unitDoc").val("0");
	$("#doseDoc").val("");
	$("#frequencyDoc").val("");
	$("#instructionDoc").val("0");
	$("#routeDoc").val("0");
	$("#daysDoc").val("");
	$("#qtyDoc").val("");
	
	$("#mo1").prop('checked', false);
	$("#an1").prop('checked', false);	
	$("#ev1").prop('checked', false);
	$("#nt1").prop('checked', false);
	$("#tmo1").val("1");
	$("#tan1").val("1");
	$("#tev1").val("1");
	$("#tnt1").val("1");
	$("#tmo1").attr('readonly', 'readonly');
	$("#tan1").attr('readonly', 'readonly');
	$("#tev1").attr('readonly', 'readonly');
	$("#tnt1").attr('readonly', 'readonly');
	
	$("#prepDocTemplateMedicineID").removeAttr("disabled");
	$("#prepDoc").removeAttr("disabled");
	$("#medicineNameDoc").removeAttr("disabled");
	$("#medicineIDDoc").removeAttr("disabled");
	$("#strengthDoc").removeAttr("disabled");
	
	$("#unitDoc").removeAttr("disabled");
	$("#doseDoc").removeAttr("disabled");
	$("#frequencyDoc").removeAttr("disabled");
	$("#instructionDoc").removeAttr("disabled");
	$("#routeDoc").removeAttr("disabled");
	$("#daysDoc").removeAttr("disabled");
	$("#qtyDoc").removeAttr("disabled");

	// $("#prescriptionTemplateContentDocTable").html("");
}

function enableOPDPrescriptionTemplate(){
	
	$("#prepDoc").prop("disabled", false);
	$("#medicineNameDoc").prop("disabled", false);
	$("#medicineIDDoc").prop("disabled", false);
	$("#strengthDoc").prop("disabled", false);
	$("#unitDoc").prop("disabled", false);
	$("#doseDoc").prop("disabled", false);
	$("#frequencyDoc").prop("disabled", false);
	$("#instructionDoc").prop("disabled", false);
	$("#routeDoc").prop("disabled", false);
	$("#daysDoc").prop("disabled", false);
	$("#qtyDoc").prop("disabled", false);
	//$("#saveMedDoc").prop("disabled", false);
}

function saveUpdateOPDPrescriptionTemplateMedicine(){
	
	var templateId = $('#docTemplateNameSelect').val();
	if (templateId == "0") {
		alert("Please Select Template...");
		return false;
	}

	var templateMedicineId = $.trim($("#prepDocTemplateMedicineID").val());		// PK of OPDPrescriptionTemplateMedicineDto
	var prep = $.trim($("#prepDoc :selected").val());
	var medicineName = $.trim($("#medicineNameDoc").val());
	var medicineID = $.trim($("#medicineIDDoc").val());
	var strength = $.trim($("#strengthDoc").val());
	var unit = $.trim($("#unitDoc").val());
	var dose = $.trim($("#doseDoc").val());
	var frequency = $.trim($("#frequencyDoc").val());
	var instruction = $.trim($("#instructionDoc").val());
	var route = $.trim($("#routeDoc").val());
	var days = $.trim($("#daysDoc").val());
	var qty = $.trim($("#qtyDoc").val());
	
	var mor_flag="0";
	var aft_flag="0";
	var eve_flag="0";
	var night_flag="0";
	
	if ($("#medicineNotAvailableCheckboxTemp").prop("checked")){
		
	}else{
		if (medicineID == "0" || medicineID == "undefined"
			|| medicineID == "") {
		alert("Please Enter proper medicine name !");
		$("#medicineIDDoc").val("0");
		SetFocus("medicineNameDoc");
		return false;
	}
	if (medicineName == "") {
		alert("Please Enter proper medicine name !");
		SetFocus("medicineNameDoc");
		return false;
	}
	}
	if (prep == "" || prep == "0") {
		alert("Please Select Prep !");
		return false;
	}
	if (instructionDoc == "0") {
		// alert("Please Select Instruction...");
		// SetFocus("instructionDoc");
		// return false;
	}
	if (days == "") {
		alert("Please Enter days !");
		SetFocus("daysDoc");
		return false;
	}
	if (qty == "") {
		alert("Please Select Quantity !");
		SetFocus("qtyDoc");
		return false;
	}

	if(document.getElementById('mo1').checked){
		//mor_flag = "1";
		mor_flag=$("#tmo1").val();
	}
	if(document.getElementById('an1').checked){
		//aft_flag = "1";
		aft_flag =$("#tan1").val();
	}
	if(document.getElementById('ev1').checked){
		//eve_flag = "1";
		eve_flag=$("#tev1").val();
	}
	if(document.getElementById('nt1').checked){
		//night_flag = "1";
		night_flag=$("#tnt1").val();
	}
	
	var dayPrescription = mor_flag+","+aft_flag+","+eve_flag+","+night_flag;

	var inputs = [];
	
	inputs.push('templateMedicineId=' + templateMedicineId);		// int		// PK
	inputs.push('templateId=' + templateId);						// int
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
//	inputs.push('paediatricsMedicineFlag=' + paediatricsMedicineFlag);         		// Str 2
//	inputs.push('paediatricsMedicineCapacity=' + paediatricsMedicineCapacity);		// Str 2
	inputs.push('dayPrescription=' + dayPrescription);	// Str
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/prescriptionController/saveUpdateOPDPrescTempMeds",
		
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alert("Template Medicines Saved Sucessfully");
				refreshOPDPrescriptionTemplateMedicine();
				fetchOPDPrescriptionTemplatesByID(templateId);
			}
			else if (data == 2) {
				alert( "Template Medicines Updated Sucessfully");
				refreshOPDPrescriptionTemplateMedicine();
				fetchOPDPrescriptionTemplatesByID(templateId);
				
			}	
		}
	});
}

function editOPDPrescriptionTemplateMedicine(){
	
	var unitId = $("#unitId").val();
	
	if (($("#prescriptionTemplateContentDocTable").html()).trim() == "") {
		alert("No data to edit in template !");
		return false;
	}
	
	var opdTemplatePrescriptionContentTableArray = new Array();
	var templateMedicineId = 0;

	$("input[name='chkboxPrescTempMedicine']:checked").each(function() {
		opdTemplatePrescriptionContentTableArray.push($(this).val());
		templateMedicineId = ($(this).attr('id')).trim();
		
		// alert("--templateMedicineId : " + templateMedicineId);
	});

	if ((opdTemplatePrescriptionContentTableArray.length) == 0) {
		alert("Please check the checkbox to edit medicines !");
		return false;
	}

	if ((opdTemplatePrescriptionContentTableArray.length) != 1) {
		alert("Please Select Single Checkbox !");
		return false;
	}
	
	$("#prepDocTemplateMedicineID").val(templateMedicineId);
	
	if(templateMedicineId != undefined && templateMedicineId !=null && templateMedicineId !="" && templateMedicineId != "null"){
			
			var inputs = [];
			
			inputs.push('unitId=' + unitId);
			inputs.push('templateMedicineId=' + templateMedicineId);
			
			var str = inputs.join('&');
			
			jQuery.ajax({
				async : true,
				type : "GET",
				url : "ehat/prescriptionController/getOPDPrescriptionTemplateMedicineById",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(r) {
					
					setOPDPrescriptionTemplateMedicineDetails(r);
				}
			});
		}
}

function setOPDPrescriptionTemplateMedicineDetails(obj){
	
	// alert( JSON.stringify(r) );
	
	$("#prepDocTemplateMedicineID").val(obj.templateMedicineId);
	$("#prepDoc").val(obj.prep);
	$("#medicineNameDoc").val(obj.medicineName);
	$("#medicineIDDoc").val(obj.medicineID);
	$("#strengthDoc").val(obj.strength);
	$("#unitDoc").val(obj.unit);
	$("#doseDoc").val(obj.dose);
	$("#frequencyDoc").val(obj.frequency);
	$("#instructionDoc").val(obj.instruction);
	$("#routeDoc").val(obj.route);
	$("#daysDoc").val(obj.days);
	$("#qtyDoc").val(obj.qty);
	
	$("#mo1").prop('checked', false);
	$("#an1").prop('checked', false);	
	$("#ev1").prop('checked', false);
	$("#nt1").prop('checked', false);
	
	var dayPrescription = obj.dayPrescription;
	var arr =dayPrescription.split(",");
	
	if(arr[0]!="0"){
		$("#mo1").prop('checked', true);
	
		$("#tmo1").removeAttr("readonly");
	}
	
	if(arr[1]!="0"){
		$("#an1").prop('checked', true);
	
		$("#tan1").removeAttr("readonly");
	}
	
	if(arr[2]!="0"){
		$("#ev1").prop('checked', true);
		
		$("#tev1").removeAttr("readonly");
	}
	
	if(arr[3]!="0"){
		$("#nt1").prop('checked', true);

		$("#tnt1").removeAttr("readonly");
	}
	$("#tmo1").val(arr[0]);
	$("#tev1").val(arr[2]);
	$("#tan1").val(arr[1]);
	$("#tnt1").val(arr[3]);
}

function deleteOPDPrescriptionTemplateMedicine(){
	
	var unitId = $("#unitId").val();
	
	if (($("#prescriptionTemplateContentDocTable").html()).trim() == "") {
		alert("No data to delete in template !");
		return false;
	}
	
	var opdTemplatePrescriptionContentTableArray = new Array();
	var templateMedicineId = 0;

	$("input[name='chkboxPrescTempMedicine']:checked").each(function() {
		opdTemplatePrescriptionContentTableArray.push($(this).val());
		templateMedicineId = ($(this).attr('id')).trim();
		
		// alert("--templateMedicineId : " + templateMedicineId);
	});

	if ((opdTemplatePrescriptionContentTableArray.length) == 0) {
		alert("Please check the checkbox to delete medicines !");
		return false;
	}

	if ((opdTemplatePrescriptionContentTableArray.length) != 1) {
		alert("Please Select Single Checkbox !");
		return false;
	}
	
	var r = confirm("Delete Record ?");
	if (r) {
		var inputs = [];
		
		inputs.push('unitId=' + unitId);
		inputs.push('templateMedicineId=' + templateMedicineId);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "ehat/prescriptionController/deleteOPDPrescriptionTemplateMedicine",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				alert(r);
				fetchOPDPrescriptionTemplatesByID($.trim($('#docTemplateNameSelect').val()));
			}
		});
	}
	
}


function usePrescriptionTemp(templateId){
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	var patientId = $.trim($('#pt_Id').val()); 		
	
	var inputs = [];
	
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('patientId=' + patientId);
	inputs.push('templateId=' + templateId);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/prescriptionController/usePrescriptionTemp",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			alert(r);
			getAllPrescriptions();
			
		}
	});
}

function deletePrescriptionTemp(templateId){
	
	var unitId = $("#unitId").val();
	
	var r = confirm("Delete Template ?");
	
	if (r) {
		var inputs = [];
		
		inputs.push('unitId=' + unitId);
		inputs.push('templateId=' + templateId);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "ehat/prescriptionController/deleteOPDPrescriptionTemplate",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				alert(r);
				fetchOPDPrescriptionTemplatesByID("0");
			}
		});
	}
}

function addPrescriptionAsOPDTemplate(){
	
	var treatmentId = $.trim($('#tr_Id').val());
	
	if (($("#prescriptionContent").html()).trim() == "") {
		alert("No data to save...");
		return false;
	}
	
	
	var prescriptionIDArray = new Array();
	$("input[name='prepTreatmentMedicineCheckbox']:checked").each(function() {
		prescriptionIDArray.push($(this).attr('id'));
	});

	if ((prescriptionIDArray.length) == 0) {
		alert("Please select one or more medicines checkbox !");
		return false;
	}
	
	var newExistingRadio = ($("#addNewUpdateExistingTemplateSelect").val()).trim();
	
	var templateId = "";
	var templateName = "";
	var myTemplateCheckBoxFlag = "N";
	var orgTemplateCheckBoxFlag = "N";
	
	if (newExistingRadio == "NEW") {

		templateName = ($("#existingAddReplaceTemplateNameText").val()).trim();

		if (templateName == "") {
			alert("Please enter Template Name...");
			return false;
		}

		var usedForTemplateValue = $("input[name='usedForTemplate']:checked").val();

		if (usedForTemplateValue == "BOTH") {
			myTemplateCheckBoxFlag = "Y";
			orgTemplateCheckBoxFlag = "Y";
			
		} else if (usedForTemplateValue == "MYTEMPLATE") {
			
			myTemplateCheckBoxFlag = "Y";
		} else if (usedForTemplateValue == "ORGNTEMPLATE") {
			
			orgTemplateCheckBoxFlag = "Y";
		}

	} else if (newExistingRadio == "EXISTING") {
		
		templateId = ($("#existingAddReplaceTemplateNameSelect").val()).trim();

		if (templateId == "") {
			alert("Please select Template Name...");
			return false;
		}

		if (templateId == "undefined") {
			alert("Please select Template Name...");
			return false;
		}

		if (templateId == "0") {
			alert("Please select Template Name...");
			return false;
		}
	}
	
	var unitId = $("#unitId").val();
	
	
	var inputs = [];
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('unitId=' + unitId);
	inputs.push('prescriptionIDArray=' + prescriptionIDArray);
	inputs.push('newExistingRadio=' + newExistingRadio);
	inputs.push('templateId=' + templateId);
	inputs.push('templateName=' + templateName);
	inputs.push('myTemplateCheckBoxFlag=' + myTemplateCheckBoxFlag);
	inputs.push('orgTemplateCheckBoxFlag=' + orgTemplateCheckBoxFlag);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/prescriptionController/addPrescriptionAsOPDTemplate",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			alert(r);
			
		}
	});
}

function getDiagnosisList(){
	
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
			
			setDiagnosisList(r);
		}
	});
}

function setDiagnosisList(r){
	
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

function getOPDInstruction(){
	
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

function savefollowUpForOPDPatient(saveFetchParam){
	
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
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/prescriptionController/savefollowUpForOPDPatient",
		
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				
				getfollowUpForOPDPatient();
			}
			else if (data == 2) {
				
				getfollowUpForOPDPatient();
			}	
		}
	});
}


function getfollowUpForOPDPatient(){
	
	// alert("-- in getfollowUpForOPDPatient -- ");
	
	var treatmentId = $("#tr_Id").val();
	var unitId = $("#unitId").val();
	
	var inputs = [];
	
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('unitId=' + unitId);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/prescriptionController/getfollowUpForOPDPatient",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setfollowUpForOPDPatient(r);
			
		}
	});
}

function setfollowUpForOPDPatient(r){
	
	if (!$.trim(r)){  
		
	}
	else{   
		var dateF = new Date(r.date).toLocaleDateString('en-GB');
		
		$("#followUpId").val(r.followUpId);	// added 11 FEB 22
		
		$("#DWMSelect").val(r.radioDayWeekMonth);

		$("#noOf").val(r.valueDayWeekMonth);

		$("#divfollow").html("");

		$("#divfollowDate1").html(
				"Next follow up on: "
				+ (dateF) + ".");
//						+ (r.nextFolloUpDate) + ".");
	}

}


/******
 * @author   : HM00069
 * @Code     : for getting medicine from pharmacy stock auto suggestions
 * *****/
function getPharmacyStockMedicine(id, prep, letter){

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
		
		getMedicineFromStockById(medicineId, "prescription");
	
	}

}
/******
 * @author   : HM00069
 * @Code     : for getting pediatrics medicine by ID
 * *****/
function getMedicineFromStockById(medicineId, callfrom){
	
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

function fetchPreprationById(prepID){
	
	var inputs = [];
	inputs.push('prepID=' + prepID);
	//inputs.push('unitId=' + unitID);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/prescriptionController/getPreparationById",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//setRoutes(r);
			
			if(r!=null){
				var preparationQty = r.preparationQty;
				if(preparationQty=="1"){
					$("#qty").val(1);
					$("#preprationQty").val("1");
				}
			}
		}
	});
}


//added by vishant
function editSequence(){
	
	$("#editSequence2").modal('show');
	getAllPrescriptionsForSequence();
	
}

function closePopupSequence(){
	$("#editSequence2").modal('hide');
	getAllPrescriptions();
	
}

function getAllPrescriptionsForSequence(){
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	var unitID = $("#unitId").val();
	var prescriptionOrderDate = $("#OFdate-pick4").val();
	
	if(treatmentId !=undefined && treatmentId !=null && treatmentId !="" && treatmentId !="null"){
		
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('unitId=' + unitID);
		inputs.push('prescriptionOrderDate=' + prescriptionOrderDate);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/prescriptionController/getAllPrescriptionsByTreatmentIdDateWise",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				setAllPrescriptionsForSequence(r);
			}
		});
	}
}

function setAllPrescriptionsForSequence(r){
	
	var testObj = r;

	var prescriptionContentTemp = "";
	var instruction = "";
	var prep = "";
	var unit = "";
	var frequency="";
	var prescriptionIds = [];
	
	var prepCount = 0;
	
	if (testObj.listOPDPrescriptionDtoSP.length > 0) {
		
		for ( var int = 0; int < testObj.listOPDPrescriptionDtoSP.length; int++) {

			var id = testObj.listOPDPrescriptionDtoSP[int].prescriptionId;
			prescriptionIds.push(id);
			prescriptionContentTemp = prescriptionContentTemp
					+ "<tr><td class='col-md-1-1 center'>"
					+ ++prepCount
					+ ".</td>"
					
					+ "<td class='col-md-2-1'>"
					+ testObj.listOPDPrescriptionDtoSP[int].prepName
					+ "</td>"
					
					if(testObj.listOPDPrescriptionDtoSP[int].nutracalProductFlag==0){
						prescriptionContentTemp = prescriptionContentTemp
					+ "<td class='col-md-2-1'>"
					+ testObj.listOPDPrescriptionDtoSP[int].medicineName
					
					+ "<br>" +"("+testObj.listOPDPrescriptionDtoSP[int].drugName +")"
					+ "</td>"
					}
					else{
						prescriptionContentTemp = prescriptionContentTemp
						+ "<td class='col-md-2-1'>"
						+ testObj.listOPDPrescriptionDtoSP[int].medicineName
						
						
						+ "</td>"
					}
					prescriptionContentTemp = prescriptionContentTemp
					
					
					
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listOPDPrescriptionDtoSP[int].strength
					+ "</td>"
					
				if(testObj.listOPDPrescriptionDtoSP[int].dose!=null)	{
					prescriptionContentTemp = prescriptionContentTemp
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listOPDPrescriptionDtoSP[int].dose
					+ "</td>"
				}
				else{
					prescriptionContentTemp = prescriptionContentTemp
					+ "<td class='col-md-1-1 center'>"
					+ "-"
					+ "</td>"
				}
					prescriptionContentTemp = prescriptionContentTemp
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listOPDPrescriptionDtoSP[int].unitName
					+ "</td>"
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listOPDPrescriptionDtoSP[int].dayPrescription
					+ "</td>"
					+ "<td class='col-md-3-1 center' style='padding-left: 15px;'>"
					+ testObj.listOPDPrescriptionDtoSP[int].instructionNameForUI
					+ "</td>"
					+ "<td class='col-md-1-1 center' style='padding-left: 15px;'>"
					+ testObj.listOPDPrescriptionDtoSP[int].days
					+ "</td>"
					+ "<td class='col-md-1-1 center' style='padding-left: 15px;'>"
					+ testObj.listOPDPrescriptionDtoSP[int].qty
					+ "</td>"
					
					+ "<td class='col-md-1 center' style='display: none;'><input type='text' style='text-align:center;' onkeypress='return validateNumber(event)' id='sequence"+id+"' value="+testObj.listOPDPrescriptionDtoSP[int].prescriptionSequenceId+"></td>"
					+ "<td class='col-md-1-1 center'  style='display: none;'>"
					+ id
					+ "</td>"
					+ "</tr>";
		}
		
		$("#divOmID").html(testObj.listOPDPrescriptionDtoSP[testObj.listOPDPrescriptionDtoSP.length-1].prescriptionId);
		
	}
	else{$("#divOmID").html('-')}

	
	
	$('#prescriptionContent2').html(prescriptionContentTemp);
	$("#prescription_id").val("0");
	//$("#prescriptionContent2").tableDnD();
	$("#prescriptionIds").val(JSON.stringify(prescriptionIds));
	
	
	
	
	/*prepCount = 0;
	$("#prescriptionCoverSheetContent").setTemplate(
			prescriptionCoverSheetContent);
	$("#prescriptionCoverSheetContent")
			.processTemplate(testObj);*/
	
}



function saveIPDPrescriptionSequence(){
	
	var list = [];
	  // Iterate through each row in the tbody
	$('#prescriptionSequenceTable tbody tr').each(function(index, element) {
	    // Access data within the current row
	    var id = $(this).find('td:eq(11)').text();
	    var seq =(index+1);
//	    var seq = $("#sequence"+id).val();
		list.push(id+"-"+seq);
	    
	    //var age = $(this).find('td:eq(1)').text();
	    
	    // Do something with the data (e.g., log to console)
	    //console.log('Row ' + (index + 1) + ': Name=' + name + ', Age=' + age);
	  });
	
	//var list = [];
	var treatment_id = $("#tid").val();
	/*var data = $("#prescriptionIds").val();
	var response = JSON.parse(data);
	
	for(var i = 0; i < response.length; i++){
		var id = response[i];
		var seq = $("#sequence"+id).val();
		list.push(id+"-"+seq);
	}*/
	var inputs = [];
	inputs.push('list=' + encodeURIComponent(list));
	//inputs.push('profileId=' + encodeURIComponent(profileId));
	inputs.push('treatmentId=' + treatment_id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/prescriptionController/updateIPDPrescriptionSequence",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
		success : function(r) {
			if(r == 1){
				alertify.success("Sequence Updated Successfully.");
			}else{
				alertify.error("Something went wrong.");
			}
			closePopupSequence();
		}
	});
}

function printIpdPrescrption(callFrom){
	
	var instructionLanguage = $("input[name='prepInstructionPopup1']:checked").val();
	
//	var billId=$("#billNo").text();    
	var billId=0;
	var treatId = $("#tr_Id").val();
	var patId = $("#pt_Id").val();
  
	var deptId=1;
	 var pendFlag="N"; 
	 var recId=0;
	 var unitId = $("#unitId").val();
	 
    	
    	window.open("ipd_prescription_print_new.jsp?billId="+billId+"&treatId="+treatId+"&patId="+patId+"&recId="+recId+"&pendFlag="+pendFlag+"&instructionLanguage="+instructionLanguage+"&unitId="+unitId);
   
	 	
}

function sendPrescptionToEcogreen(){

	
	//Changed by Akshata 4-April-2022
	var prescription_id = new Array();
	//var prescription_id = 0;
	$("input[name='prepTreatmentMedicineCheckbox']:checked").each(function() {
		//prescription_id = ($(this).attr('id')).trim();
		prescription_id.push($(this).attr('id'));
		
	});


	if ((prescription_id.length) == 0) {
		alert("Please Select At Least one Item to send..");
		return false;
	}
	var r = confirm("Are U Want Send the  Record ?");
	if (r) {
		var inputs = [];
		
		
		inputs.push('prescriptionId=' + prescription_id);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "ehat/ecogreen/api/sendPrescptionToEcogreen",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				alert(r.msg);
				getAllPrescriptionsDateWise();
			}
		});
	}
	

}