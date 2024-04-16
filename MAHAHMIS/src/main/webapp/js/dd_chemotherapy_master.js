/************
* @author	: Akshata Desai
* @date		: 11-Feb-2020
* @codeFor	:  toggleEntryDiv
 ************/
function toggleEntryDiv(id) {

	/*$("#"+id).slideToggle('slow', function() {
	});*/
	if (id == "divForEdit") {

		$("#divForEntryChemo").show('slow');
	} else {

		$("#divForEntryChemo").toggle('slow');
	}
}
/************
* @author	: Akshata Desai
* @date		: 11-Feb-2020
* @codeFor	: Save Chemotherapy master
 ************/
function saveChemoMaster(){
	var chemotherapyName = $("#chemotherapyName").val();
	var indication = $("#indication").val();
	var frequency = $("#frequency").val();
	var noOfCycle = $("#noOfCycle").val();
	var dose = $("#dose").val();
	var investigation = $("#investigation").val();
	var drugOrders = $("#drugOrders").val();
	var postMedication = $("#postMedication").val();
	var advice = $("#advice").val();
	
	var weight=$("#weight").val();
	var height=$("#height").val();
	var bsa =$("#bsa").val();
	var bloodorders=$("#bloodorders").val();
	var allergies=$("#allergies").val();
	var history=$("#history").val();
	//return false;
	var chemotherapyId = $("#chemotherapyId").val();
	
	
	if(chemotherapyId == null || chemotherapyId == undefined || chemotherapyId == "")
	{
		chemotherapyId=0;
	}
	
	if(chemotherapyName=="" || chemotherapyName==undefined || chemotherapyName==null || chemotherapyName=="null"){
		alert("please enter chemotherapy name");		
		$("#chemotherapyName").focus();					
		return false;
	}	
	
	var inputs = [];
	inputs.push('chemotherapyName=' + chemotherapyName);
	inputs.push('indication=' + indication);
	inputs.push('frequency=' + frequency);
	inputs.push('noOfCycle='+ noOfCycle);
	inputs.push('dose=' + dose);
	inputs.push('investigation=' + investigation);
	inputs.push('drugOrders=' + drugOrders);
	inputs.push('postMedication=' + postMedication);
	inputs.push('advice=' + advice);
	
	inputs.push('weight=' + weight);
	inputs.push('height=' + height);
	inputs.push('bsa=' + bsa);
	inputs.push('blood_orders=' + bloodorders);
	inputs.push('allergies=' + allergies);
	inputs.push('history=' + history);
	
	inputs.push('chemotherapyId=' + chemotherapyId);
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/chemotherapy_master/saveChemoMaster",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issued");
		},
		success: function(data){
			if(data==1){
			alertify.success("Data Saved successfully");
			}
		 else if(data==2){
			 alertify.success("Data Updated successfully");
			}
		 else if(data==3){
			 alertify.success("Chemotherapy name already exists");
		 }
		 else {
				alertify.error("Oops having some issued");
				
			}
			getAllChemoMaster();
			refreshChemoMaster();
		},		
	})
}
/************
* @author	: Akshata Desai
* @date		: 11-Feb-2020
* @codeFor	: Refresh Chemotherapy master
 ************/
function refreshChemoMaster(){
	$("#chemotherapyName").val('');
	$("#indication").val('');
	$("#weight").val('');
	$("#height").val('');
	$("#bsa").val('');
	$("#bloodOrders").val('');
	$("#allergies").val('');
	$("#history").val('');
	$("#frequency").val('');
	$("#noOfCycle").val('');
	$("#dose").val('');
	$("#investigation").val('');
	$("#drugOrders").val('');
	$("#postMedication").val('');
	$("#advice").val('');
	$("#chemotherapyId").val(0);
	
}
/************
* @author	: Akshata Desai
* @date		: 11-Feb-2020
* @codeFor	: List of Chemotherapy master
 ************/
function getAllChemoMaster(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/chemotherapy_master/getAllChemoMaster",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllChemoMaster(r,"All");			
		}
	});
}

function setAllChemoMaster(r,CallFrom){

	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.lstchemotherapyMaster.length; i++) {		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstchemotherapyMaster[i].chemotherapyId+'</td>'
			//+ ' <td class="col-md-1 center">'+r.lstchemotherapyMaster[i].complaintCode+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstchemotherapyMaster[i].chemotherapyName+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success editUserAccess" onclick=editChemoMaster('+r.lstchemotherapyMaster[i].chemotherapyId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteChemoMaster('+r.lstchemotherapyMaster[i].chemotherapyId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.chemotherapyId+'</td>'
			//+ ' <td class="col-md-1 center">'+r.complaintCode+'</td>'
			+ ' <td class="col-md-1 center">'+r.chemotherapyName+'</td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success editUserAccess" onclick=editChemoMaster('+r.chemotherapyId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteChemoMaster('+r.chemotherapyId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;	
	}			
	$("#chemoDetails").html(htm);
}
/************
* @author	: Akshata Desai
* @date		: 11-Feb-2020
* @codeFor	: Edit Chemotherapy master
 ************/
function editChemoMaster(chemotherapyId){		
	var inputs = [];
	inputs.push('chemotherapyId=' + chemotherapyId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/chemotherapy_master/editChemoMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {		
			$("#divForEntryChemo").show('slow');
			$('#searchId').val('');
			$('#chemotherapyName').val(r.chemotherapyName);
			$('#chemotherapyId').val(r.chemotherapyId);		
			$('#indication').val(r.indication);
			$('#frequency').val(r.frequency);
			$('#noOfCycle').val(r.noOfCycle);
			$('#dose').val(r.dose);
			$('#investigation').val(r.investigation);
			$('#drugOrders').val(r.drugOrders);
			$('#postMedication').val(r.postMedication);
			$('#advice').val(r.advice);
			$('#weight').val(r.weight);
			$('#height').val(r.height);
			$('#bsa').val(r.bsa);
			$('#bloodorders').val(r.blood_orders);
			$('#allergies').val(r.allergies);
			$('#history').val(r.history);
			
			
		}
	});
}

/************
* @author	: Akshata Desai
* @date		: 11-Feb-2020
* @codeFor	: Delete Chemotherapy master
 ************/
function deleteChemoMaster(chemotherapyId) {
	var r = confirm("Are You Sure You Want To Delete Complaint Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/chemotherapy_master/deleteChemoMaster",
			data : {
				"chemotherapyId" : chemotherapyId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshChemoMaster();
				getAllChemoMaster();
			}
		});
	}
}

/************
* @author	: Akshata Desai
* @date		: 11-Feb-2020
* @codeFor	:  Auto suggestion search Detail
 ************/
function centerChemoAutoSuggestion(inputID) {
	var resultData = [];
	var chemotherapyName = $("#" + inputID).val();

	if (chemotherapyName == "" || chemotherapyName == null || chemotherapyName == "null"	|| chemotherapyName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllChemoMaster();
		return false;
	}

	var inputs = [];
	inputs.push('chemotherapyName=' + chemotherapyName);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/chemotherapy_master/centerChemoAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstchemotherapyMaster.length; j++) {
				var arrValue = response.lstchemotherapyMaster[j].chemotherapyId +"-"+response.lstchemotherapyMaster[j].chemotherapyName;
				var idValue = response.lstchemotherapyMaster[j].chemotherapyId;
				var chemotherapyName = response.lstchemotherapyMaster[j].chemotherapyName;
				resultData.push({
					ID : idValue,
					Name : chemotherapyName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var chemotherapyId = res[0];
		var chemotherapyName = res[1];		
		getChemoMasterBychemotherapyId(chemotherapyId);
		$("input#" + inputID).val(chemotherapyName);
	}
}

/************
* @author	: Akshata Desai
* @date		: 11-Feb-2020
* @codeFor	:  get getChemoMasterBychemotherapyId Detail
 ************/
function getChemoMasterBychemotherapyId(chemotherapyId){
	var inputs = [];
	inputs.push('chemotherapyId=' + chemotherapyId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/chemotherapy_master/editChemoMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllChemoMaster(r,"search");
			
		}
		
	});
}
/************
* @author	: Akshata Desai
* @date		: 11-feb-2020
* @codeFor	:  get centerChemoMasterSearchById details 
 ************/
function centerChemoMasterSearchById(){
	var chemotherapyId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(chemotherapyId)) {
		alert("Please Enter Number Only!");
		$("#chemotherapyId").focus();
		return false;
	}
	getChemoMasterBychemotherapyId(chemotherapyId);	
}

