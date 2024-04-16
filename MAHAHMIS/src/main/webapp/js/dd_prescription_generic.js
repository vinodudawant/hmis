function getMedicinesWithGeneric(id, callfrom){
	
	var prep = ($("#prep").val()).trim();
	var findingName = $("#" + id).val();
	
	var letter = findingName;
	
     var genericFlag="N";
	
	if ($("#genericCheckbox").prop("checked")){
		genericFlag="Y";
	}
	
	
	
	var parameterFetchMedicine = "NORMAL";
	if ($("#paediatricsDocCheckBox").prop("checked")){
		parameterFetchMedicine = "PAEDIA_DOC_CHECKBOX";
		
		getPaediatricsMedicine(id, prep, letter);
		
		return;
		
	}
	//flow designed and developed by Akshata 4-april-2022 
	if ($("#fetchStockFromChkbox").prop("checked")){
		
		getPharmacyStockMedicineWithgeneric(id, genericFlag, letter);
		
		return;
		
	}

	
	var inputs = [];
	

	inputs.push('genericFlag=' + genericFlag);
	inputs.push('letter=' + letter);
	
	var str = inputs.join('&');
	

	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/prescriptiongeneric/getMedicinesWithGeneric",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var resultData = [];
						var template = "";
						
						for ( var j = 0; j < r.lstPrescriptionGenericDTO.length; j++) {
							
							 var drugName="";
							  if(r.lstPrescriptionGenericDTO[j].nutracalProduct == 0)
								  drugName=r.lstPrescriptionGenericDTO[j].drugName;
							
							var arrValue = r.lstPrescriptionGenericDTO[j].productId +"-"+r.lstPrescriptionGenericDTO[j].productName+"-"+drugName;
							var idValue = r.lstPrescriptionGenericDTO[j].productId;
							var productName = r.lstPrescriptionGenericDTO[j].productName;
							
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


function getPharmacyStockMedicineWithgeneric(id, genericFlag, letter){

	
	var inputs = [];
	
	inputs.push('genericFlag=' + genericFlag);
	inputs.push('letter=' + letter);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/prescriptiongeneric/getPharmacyStockMedicine",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
		
			
			var resultData = [];
			var template = "";
			for ( var j = 0; j < r.lstPrescriptionGenericDTO.length; j++) {
				
				 var drugName="";
				  if(r.lstPrescriptionGenericDTO[j].nutracalProduct == 0)
					  drugName=r.lstPrescriptionGenericDTO[j].drugName;
				
				var arrValue = r.lstPrescriptionGenericDTO[j].productId +"-"+r.lstPrescriptionGenericDTO[j].productName+"-"+drugName;
				var idValue = r.lstPrescriptionGenericDTO[j].productId;
				var productName = r.lstPrescriptionGenericDTO[j].productName;
				
				resultData.push({
					ID : idValue,
					Name : productName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue
						+ '</a></li>';
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
		
		setMedicineDetails(medicineId, "prescription");
		
		//getMedicineFromStockById(medicineId, "prescription");
	
	}

}

function getGenMedicineDataforIpd(id, callfrom){
	if ($("#medicineNotAvailableCheckbox").is(":checked")){
		
		return false;
	}else{
		getMedicinesWithGeneric(id, callfrom);
	}
}

