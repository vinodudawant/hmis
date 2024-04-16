function refreshOPDPrescriptionTemplatesModal(){
	
	$("#docTemplateNameID").val("0");
	$("#docTemplateNameText").val("");
	$("#docOrgTemplateCheckbox").prop("checked", false);
	$("#prescriptionTemplateContentDocTable").html("");
	$("#prescriptionTemplateContentDocHiddenDiv").html("");

	// disable Paeditric checkbox
	$("#paediatricsDocCheckBox").prop("checked", false);
	
}
function saveUpdateOPDPrescriptionTemplates1(){
	
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
				setOPDPrescriptionTemplatesNew1(r);
			} else if(templateId != 0){
				
		//		alert("--setOPDPrescriptionTemplatesExisting--" + JSON.stringify(r));
				setOPDPrescriptionTemplatesExistingg1(r);
			}
			
		}
	});
	
}

function setOPDPrescriptionTemplatesNew1(r){
	
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
						+ '	<button class="btn btn-xs btn-primary" value="Use" onclick=usePrescriptionTemp1('
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
				+ '	<button class="btn btn-xs btn-primary" value="Use" onclick=usePrescriptionTemp1('
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

function setOPDPrescriptionTemplatesExistingg1(r){
	
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
function usePrescriptionTemp1(templateId){
	
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
		url : "ehat/treatmentDischargeController/usePrescriptionTemp",
		//url : "ehat/prescriptionController/usePrescriptionTemp",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			alert(r);
			getAllPrescriptions1();
			
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

function saveOPDPrescription1(){
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	var patientId = $.trim($('#pt_Id').val()); 		
	
	var prep = $.trim($("#prep :selected").val());
	var medicineName = $.trim($("#name").val());
	var medicineID = $.trim($("#medicineID").val()); // 0 from UI
	
	//alert("-- -- medicineID : " + medicineID);
//	return false;
	
	var strength = $.trim($("#strength").val());	// "capacity" on UI
	var unit = 1;
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
	
	var prescriptionId = $('#prescriptionId').val();
	if(prescriptionId=="" || prescriptionId==null){
		prescriptionId=0;
	}
	
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
	
	var str = inputs.join('&');

	jQuery.ajax({
		
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/treatmentDischargeController/savetreatmentDischarge",
		
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alert("Prescription Saved Sucessfully");
				clearPrescriptionFields();
				
				getAllPrescriptions1();
		//		location.reload(true);
				
			}
			else if (data == 2) {
				alert( "Prescription Updated Sucessfully");
				clearPrescriptionFields();
				
				getAllPrescriptions1();
		//		location.reload(true);
				
			}	
		}
	});
}
function getAllPrescriptions1(){
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	var unitID = 1;
	
	if(treatmentId !=undefined && treatmentId !=null && treatmentId !="" && treatmentId !="null"){
		
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('unitId=' + unitID);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/treatmentDischargeController/getAllPrescriptionsByTreatmentId",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				setAllPrescriptions1(r);
			}
		});
	}
}
function setAllPrescriptions1(r){

	var testObj = r;

	var prescriptionContentTemp = "";
	var instruction = "";
	var prep = "";
	var unit = "";
	var frequency="";
	
	var prepCount = 0;
	$('#prescriptionContent1').html(" ");
	if (testObj.listtreatmentdischarge.length > 0) {
		
		for ( var int = 0; int < testObj.listtreatmentdischarge.length; int++) {

			prescriptionContentTemp = prescriptionContentTemp
					+ "<tr><td class='col-md-1-1 center'>"
					+ ++prepCount
					+ ".</td>"
					+ "<td class='col-md-2-1 center'>"
					/*+ testObj.listtreatmentdischarge[int].prepName
					+ ". "*/
					+ testObj.listtreatmentdischarge[int].medicineName
					+ "</td>"
					+ "<td class='col-md-2-1 center'>"
					+ testObj.listtreatmentdischarge[int].prepName
					+ "</td>"
					/*+ "<td class='col-md-1-1 center'>"
					+ testObj.listtreatmentdischarge[int].strength
					+ "</td>"
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listtreatmentdischarge[int].dose
					+ "</td>"
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listtreatmentdischarge[int].unit
					+ "</td>"
					+ "<td class='col-md-1-1 center'>"
					+ testObj.listtreatmentdischarge[int].dayPrescription
					+ "</td>"*/
					+ "<td class='col-md-3-1 center' style='padding-left: 15px;'>"
					+ testObj.listtreatmentdischarge[int].instructionName
					+ "</td>"
					+ "<td class='col-md-2-1 center' style='padding-left: 15px;'>"
					+ testObj.listtreatmentdischarge[int].days
					+ "</td>"
					/*+ "<td class='col-md-1-1 center' style='padding-left: 15px;'>"
					+ testObj.listtreatmentdischarge[int].qty
					+ "</td>"*/
					+ "<td class='col-md-1-1 center'>"
					+ "<input name='prepTreatmentMedicineCheckbox' id='"
					+ (testObj.listtreatmentdischarge[int].prescriptionId)
					+ "' type='checkbox' style='cursor: pointer; margin-top: 2px;' /></td>"
					+ "</tr>";
		}
	}

	$('#prescriptionContent1').append(prescriptionContentTemp);
	$("#prescription_id").val("0");

	/*prepCount = 0;
	$("#prescriptionCoverSheetContent").setTemplate(
			prescriptionCoverSheetContent);
	$("#prescriptionCoverSheetContent")
			.processTemplate(testObj);*/
	
}
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

function getPrescriptionTemplate(id){
	
	var todaysDefaultDate = $("#date").html();
	var dateSplit = todaysDefaultDate.split('-');
	todaysDefaultDate = dateSplit[0] + "/" + dateSplit[1] + "/" + dateSplit[2];
	var depid = 2;
	
	$(".ehatList").removeClass("active");
	$("#" + id).addClass("active");
	
	$("#ipdDoctorStationJSPHeadDiv").html('');
	$("#Prescription").show();
	//Added By Akshata 
	$("#ddInstructions").hide();
	$("#instruct").hide();
	
	fetchAllPrescriptionInstruction();
	getAllPreparationsForPrescription();
	getAllRoutesForPrescription();
	fetchAllUnits();
	getAllPrescriptions1();
	
//	getDiagnosisList();
	
	//fetchAllAllergyAlerts();
	
	getfollowUpForOPDPatient();
	
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
	
	$('#prep').val(0);
//	getAllPrescriptions();
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
function saveUpdateOPDPrescriptionTemplateMedicine1(){
	
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
	if (prep == "") {
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

//added by vishant 18/07/2023
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

		$("#divfollowDate").html(
				"Next follow up on: "
				+ (dateF) + ".");
//						+ (r.nextFolloUpDate) + ".");
	}

}

function editIPDTreatmentAtDicharge(){
	
	
	if (($("#prescriptionContent1").html()).trim() == "") {
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
	$("#prescriptionId").val(prescription_id);
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
	
	
	var inputs = [];
	
	inputs.push('prescriptionId=' + prescription_id);
	inputs.push('unitId=' + unitId);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/treatmentDischargeController/editIPDTreatmentAtDicharge",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			//setfollowUpForOPDPatient(r);
			$("#prescription_id").val(r.prescriptionId);
			$("#prescriptionId").val(r.prescriptionId);
			
			var dayPrescription ="";
			
			//$("#medicineID").val(r.medicineId);
			
			$("#prep").val(r.prep);
			$("#name").val(r.medicineName);
			$("#strength").val(r.strength);
			
			$("#prep").prop('disabled', true);
			$("#name").prop('disabled', true);
			$("#strength").prop('disabled', true);
			
			$("#dose").val(r.dose);
			$("#unit").val(r.unit);
			
			$("#frequency").val(r.frequency);
			$("#instruction").val(r.instruction);
			$("#route").val(r.route);
			$("#days").val(r.days);
			$("#qty").val(r.qty);
			
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
			
			if ((r.paediatricsMedicineFlag) == 'Y') {
				$("#paediatricsDocCheckBox").prop("checked", true);
			} else {
				$("#paediatricsDocCheckBox").prop("checked", false);
			}

			if(r.productMaster == null){
				$( "#medicineNotAvailableCheckbox").prop('checked', true);
			}
		}
		
		
	});

}


function deleteIPDTreatmentAtDicharge(){
	
	var unitId = $("#unitId").val();
	
	if (($("#prescriptionContent1").html()).trim() == "") {
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
			url : "ehat/treatmentDischargeController/deleteIPDTreatmentAtDicharge",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				alert(r);
				getAllPrescriptions1();
			}
		});
	}
	
}


function treatmentAtDischargePrescrptionPrint(){

	
	var dischargedate = $("#discharge_date").val();
	if(dischargedate == ""){
		alert("Please save discharge summary then print");
		return false;
	}else{
		
		var discharge_Time = $("#discharge_Time").val();
		var timeDate=dischargedate +"  "+ discharge_Time;
		var patID = $("#pt_Id").val();
		var treatID = $("#treatmentId").val();
		var tomId = $("#idSelOperationData").val(); //By Pooja
		
	
		var discharge_Type = $("#discharge_Type").val();
		
		window.open("treatmentatdischarge_prescrption_print.jsp?"+"patID=" +
			encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)+"&discharge_Type="+encodeURIComponent(discharge_Type)+"&tomId="+encodeURIComponent(tomId)
			+"&dischargedate="+encodeURIComponent(timeDate));
	}
	

	
}