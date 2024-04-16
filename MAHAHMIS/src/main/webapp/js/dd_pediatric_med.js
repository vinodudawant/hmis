/**
 * 
 */

function getCompanies() {
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/medication/companyList",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var companylistTemp = "";
			companylistTemp = companylistTemp
					+ "<option value='0'>--Select company--</option>";
			for (var i = 0; i < r.length; i++) {
				companylistTemp = companylistTemp + "<option value="
						+ r[i].compId + " data-name=" + r[i].compName + ">"
						+ r[i].compName + "</option>";
			}
			$("#comName").html(companylistTemp);
		}
	});
}

function getPrepartion() {
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/medication/prepList",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var preplistTemp = "";
			preplistTemp = preplistTemp
					+ "<option value='0'>--Select prepartion--</option>";
			for (var i = 0; i < r.length; i++) {
				preplistTemp = preplistTemp + "<option value="
						+ r[i].preparationId + ">" + r[i].preparationName
						+ "</option>";
			}
			$("#prepName").html(preplistTemp);
		}
	});
}

function getMediList(id, callform) {

	var resultData = [];
	var medName = $("input#" + id).val();
	var inputs = [];
	inputs.push('callform=' + callform);
	inputs.push('medicine=' + medName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/medication/medAutoSuggestionForSearch",
		cache : false,
		success : function(response) {
			var template = "";
			for (var j = 0; j < response.length; j++) {
				console.log(response[j].medicineName);
				var arrValue = response[j].medicineName;
				var idValue = response[j].id;
				var pname = response[j].medicineName;
				// $("#medIdForSearch").val(response[j].id);
				// console.log($("#medIdForSearch").val());
				resultData.push({
					ID : idValue,
					Name : pname
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}
			setTimeout(function() {
				$("div#medByName .typeahead").html(template);
				$("div#medByName .typeahead").show();

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
		var item_id = res[0];
		var itemName = res[1];
		console.log(item_id + " " + itemName);
		var id = item.value;
		getTableDataById(id);
		// var id = $("#medIdForSearch").val(0);
		// $("input#" + id).val(itemName);
		// console.log($("input#" + id).val);
	}
}

function getTableDataById(id) {
	var inputs = [];
	inputs.push('medId=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/medication/medicationById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setDataToMainTable(r);
		}
	});
}

function getMedicineName(id, callform) {

	var comName = $("#comName").val();
	
	// alert("--comName--" + comName);
	
	// return false;
	
	
	var prepName = $("#prepName").val();
	var resultData = [];
	var medName = $("input#" + id).val();

	var inputs = [];

	inputs.push('callform=' + callform);
	inputs.push('productName=' + medName);
	inputs.push('comName=' + comName);
	inputs.push('prep=' + prepName);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/medication/medAutoSuggestion",
		cache : false,
		success : function(r) {
			
		//	alert(JSON.stringify(r));
			
/*			var template = "";
			for (var j = 0; j < response.listMedication.length; j++) {
				// alert(response.listMedication[j].productName);
				var arrValue = response.listMedication[j].productName;
				var idValue = response.listMedication[j].productId;
				var pname = response.listMedication[j].productName;
				// $("#medicineId").val(response.listMedication[j].productId);
				resultData.push({
					ID : idValue,
					Name : pname
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}
			setTimeout(function() {
				$("div#itemByName .typeahead").html(template);
				$("div#itemByName .typeahead").show();

				$("input#" + id).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + id).data('typeahead').source = resultData;
			}, 500);*/
			
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
			
							
							setTimeout(function() {
								
								$("div#itemByName .typeahead").html(template);
								$("div#itemByName .typeahead").show();
						
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

		/*var res = item.text.split('-');
		var item_id = res[0];
		var itemName = res[1];
		console.log(item_id + " " + itemName);
		var id = item.value;
		getUnitandStrength(id);
		// $("#medicineId").val(0);
		$("input#" + id).val(itemName);
		// console.log($("input#" + id).val);
		*/	
		
	var res = item.text.split('-');		// changed, aniket, 7 FEB 22
	
//	 alert("--res--: " + res);
		
		var medicineId = res[0];
		var medicineName = res[1];
		
		$("#medicineId").val(medicineId);			// changed, aniket, 8 FEB 22
		getUnitandStrength(medicineId);		// changed, aniket, 7 FEB 22
		
		$("input#" + id).val(medicineName);
		
	}
}

//function getUnitandStrength(id) {
function getUnitandStrength(medicineId) {
	
/*	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/medication/strengthAndUnit",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			for (var i = 0; i < r.length; i++) {
				$("#capacity").val(r[i].strengthName);
				$("#uomName").val(r[i].uomId);
			}

		}
	});*/
	
	if(medicineId !=undefined && medicineId!=null && medicineId!="" && medicineId!="null"){
		
		var inputs = [];
		inputs.push('productId=' + medicineId);
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/prescriptionController/getMedicineById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
		//		if(callfrom == "prescription")
					
		//			$("#medicineID").val(r.productId);
		//			$("#name").val(r.productName);
					$("#prepName").val(r.preparationMaster.preparationId);
					$("#strength").val(r.strengthMaster.strengthName);
					$("#uomName").val(r.uomMaster.uomId);
					
					$("#comName").val(r.companyMaster.compId);
					
							//			fetchRoutesByPreparationId(callfrom);
					
				
			}
		});
	}

}

function getUoms() {
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/medication/uomList",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var uomlistTemp = "";
			uomlistTemp = uomlistTemp
					+ "<option value='0'>--Select uom--</option>";
			for (var i = 0; i < r.length; i++) {
				uomlistTemp = uomlistTemp + "<option value=" + r[i].uomId + ">"
						+ r[i].uomName + "</option>";
			}
			$("#uomName").html(uomlistTemp);
		}
	});
}

function getInst() {

	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/doctorDesk/getPreDetails",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			var instlistTemp = "";
			instlistTemp = instlistTemp
					+ "<option value='0'>--Select Instruction--</option>";
			for (var i = 0; i < r.length; i++) {
				instlistTemp = instlistTemp + "<option value=" + r[i].id + ">"
						+ r[i].englishInstruction + "</option>";
			}
			$("#instName").html(instlistTemp);
		}
	});
}

function saveMedication() {
	
	var medId = $("#medId").val();
	var comName = $("#comName").val();
	var freqency = $("#freqency").val();
	var days = $("#days").val();
	var prepName = $("#prepName").val();
	var medname = $("#medname").val();
	var instName = $("#instName").val();
	var other = $("#other").val();
	var strength = $("#strength").val();
	var capacity = $("#capacity").val();
	var uomName = $("#uomName").val();
	var dosePerDay = $("#dosePerDay").val();
	var fixedDose = $("#fixedDose").val();
	var userFor = $("input[name='userfor']:checked").val();
	var compName = $("#comName").find(':selected').attr('data-name');
	
	var medicineId = $("#medicineId").val();		// aniket kanse 8 FEB 22
	
	$("#searchMedicine").val("");
	
//	 alert("--medname-: " + medname); 
	 var medicineName ="";
	if(medId==0){
		var ary = medname.split("-");
		  medicineName = ary[1];
	}
	else{
		medicineName = medname;
	}
	
//	 alert("--array-0-: " + ary[0]); 
//	 alert("--array-1-: " + ary[1]); 
	 
	var mor_flag="0";
	var aft_flag="0";
	var eve_flag="0";
	var night_flag="0";
	
	if(document.getElementById('MO').checked){
		mor_flag=1;
	}else{
		mor_flag=0;
	}
	
	if(document.getElementById('AN').checked){
		aft_flag=1;
	}else{
		aft_flag=0;
	}
	
	if(document.getElementById('EV').checked){
		eve_flag=1;
	}else{
		eve_flag=0;
	}
	
	if(document.getElementById('NT').checked){
		night_flag=1;
	}else{
		night_flag=0;
	}
	 
	 if (medicineName == "" || medicineName == undefined || medicineName == null) {
			alertify.error("please select medicine !");
			return false;
		}
	 
//	 return false;
	
	if (comName == "" || comName == undefined || comName == "0") {

		alertify.error("please select company name");
		return false;
	}
	if (freqency == "" || freqency == undefined || freqency == null) {
		alertify.error("please enter frequency");
		return false;
	}
	if (days == "" || days == undefined || days == null) {
		alertify.error("please enter days");
		return false;
	}
	if (prepName == "" || prepName == undefined || prepName == 0) {
		alertify.error("please enter prepartion name");
		return false;
	}
//	if (medname == "" || medname == undefined || medname == null) {
//		alertify.error("please select medicine name");
//		return false;
//	}
	if (instName == "" || instName == undefined || instName == 0) {
		alertify.error("please select Instruction");
		return false;
	}
	if (strength == "" || strength == undefined || strength == null) {
		alertify.error("please enter strength");
		return false;
	}
	if (uomName == "" || uomName == undefined || uomName == 0) {
		alertify.error("please select unit");
		return false;
	}
	if (dosePerDay == "" || dosePerDay == undefined || dosePerDay == null) {
		alertify.error("please enter doses");
		return false;
	}

	if (fixedDose == "" || fixedDose == undefined || fixedDose == null) {
		alertify.error("please enter fix doses");
		return false;
	}
	
	
	if (medicineId == "" || medname == undefined || medname == null || medicineId == 0) {
		alertify.error("please select medicine");
		return false;
	}
	
	
	var inputs = [];
	inputs.push('id=' + medId);
	inputs.push('compName=' + encodeURIComponent(compName));
	inputs.push('medicineName=' + medicineName);
	inputs.push('instructionName=' + instName);
	inputs.push('strengthName=' + strength);
	inputs.push('unit=' + uomName);
	inputs.push('frequency=' + freqency);
	inputs.push('days=' + days);
	inputs.push('prepId=' + prepName);
	inputs.push('compId=' + comName);
	inputs.push('others=' + other);
	inputs.push('capacity=' + capacity);
	inputs.push('dosePerDay=' + dosePerDay);
	inputs.push('fixedDose=' + fixedDose);
	inputs.push('usedFor=' + userFor);
	inputs.push('medicineId=' + medicineId);
	
	inputs.push('morningFlag=' + mor_flag);
	inputs.push('afterNoonFlag=' + aft_flag);
	inputs.push('eveningFlag=' + eve_flag);
	inputs.push('nightFlag=' + night_flag);
	
	console.log("comName" + comName);



	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/medication/saveMedication",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			getMedicationList();
			$("#md1").modal('hide');
			alertify.success(r);
			clearform();

		}
	});
}

function getMedicationList() {
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/medication/medicationList",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setDataToMainTable(r);
		}
	});
}

function setDataToMainTable(r) {
	var htm = "";
	var index = 1;
	for (var i = 0; i < r.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td  class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td  class="col-md-3 center">'
				+ r[i].compName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].medicineName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].fixedDose
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].dosePerDay
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].frequency
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].days
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r[i].strengthName
				+ '</td>'
				+ '<td class="col-md-1 center"><button class="btn btn-success btn-xs" onclick=editMedicationById('
				+ r[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ '<td class="col-md-1 center"><button class="btn btn-danger btn-xs" onclick=deleteMedicine('
				+ r[i].id + ')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
		index++;
	}
	$("#medicationList").html(htm);
}

function clearform() {
	$("#medId").val(0);
	$("#comName").val("0");
	$("#freqency").val("");
	$("#days").val("");
	$("#prepName").val("0");
	$("#medname").val("");
	$("#instName").val("0");
	$("#other").val("");
	$("#strength").val("");
	$("#capacity").val("");
	$("#uomName").val("0");
	$("#dosePerDay").val("");
	$("#fixedDose").val("");
	
}

function editMedicationById(id) {
	$("#md1").modal('show');
	var inputs = [];
	inputs.push("medId=" + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/medication/medicationById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			onloadData();
			for (var i = 0; i < r.length; i++) {
				$("#medId").val(r[i].id);
				$("#comName").val(r[i].compId);
				$("#freqency").val(r[i].frequency);
				$("#days").val(r[i].days);
				$("#prepName").val(r[i].prepId);
				$("#medname").val(r[i].medicineName);
				$("#instName").val(r[i].instructionName);
				$("#other").val(r[i].others);
				$("#strength").val(r[i].capacity);
				$("#capacity").val(r[i].strengthName);
				$("#uomName").val(r[i].unit);
				$("#dosePerDay").val(r[i].dosePerDay);
				$("#fixedDose").val(r[i].fixedDose);
				$("#medicineId").val(r[i].medicineId)
				
				 
					if(r[i].morningFlag == 1){
						$("#MO").prop('checked', true);
					}else{
						$("#MO").prop('checked', false);
					}
					
					if(r[i].afterNoonFlag == 1){
						$("#AN").prop('checked', true);
					}else{
						$("#AN").prop('checked', false);
					}
					
					if(r[i].eveningFlag == 1){
						$("#EV").prop('checked', true);
					}else{
						$("#EV").prop('checked', false);
					}
					
					if(r[i].nightFlag == 1){
						$("#NT").prop('checked', true);
					}else{
						$("#NT").prop('checked', false);
					}

				
			}
		}
	});
}

function deleteMedicine(id) {
	var inputs = [];
	inputs.push("medId=" + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/medication/deleteMedication",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			getMedicationList();
			clearform();
			alertify.success(r);
		}
	});
}

function onloadData() {
	getCompanies();
	getPrepartion();
	getUoms();
	getInst();
	clearform();
}

function getFrequencyCount(callFrom){
	  var countFrequency=0;
	  
	  var frequency=$("#freqency").val();
	  if(frequency == "")
		  frequency=0;
	 
	   if(callFrom == "mo"){
		   if(document.getElementById('MO').checked){
			   frequency =parseInt(frequency)+1 ;
			   
			   $("#freqency").val(frequency);
			}else{
				frequency =parseInt(frequency)-1 ;
				 $("#freqency").val(frequency);
			}
	   }
	   
	   if(callFrom == "an"){
		   if(document.getElementById('AN').checked){
			   frequency =parseInt(frequency)+1 ;
			   $("#freqency").val(frequency);
			}else{
				frequency =parseInt(frequency)-1 ;
				 $("#freqency").val(frequency);
			}
	   }
	   
	   if(callFrom == "ev"){
		   if(document.getElementById('EV').checked){
			   frequency =parseInt(frequency)+1 ;
			   $("#freqency").val(frequency);
			}else{
				frequency =parseInt(frequency)-1 ;
				 $("#freqency").val(frequency);
			}
	   }
	   
	   if(callFrom == "nt"){
		   if(document.getElementById('NT').checked){
			   frequency =parseInt(frequency)+1 ;
			   $("#freqency").val(frequency);
			}else{
				frequency =parseInt(frequency)-1 ;
				 $("#freqency").val(frequency);
			}
	   }
	  
	   
}