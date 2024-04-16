/************
* @author	: Akshata Desai
* @date		: O7-Feb-2020
* @codeFor	:  toggleEntryDiv
 ************/
function toggleEntryDiv(id) {

	/*$("#"+id).slideToggle('slow', function() {
	});*/
	if (id == "divForEdit") {

		$("#divForEntryClinical").show('slow');
	} else {

		$("#divForEntryClinical").toggle('slow');
	}
}
/************
* @author	: Akshata Desai
* @date		: O7-Feb-2020
* @codeFor	: Save Clinical Evolution master
 ************/
function saveClinicalEvolutionMaster(){
	var clinicalCode= $("#clinicalCode").val();
	var clinicalName = $("#clinicalName").val();
	var clinicalId = $("#clinicalId").val();
	var userId= $("#userId").val();
	var unitId= $("#unitId").val();
	
	if(clinicalName=="" || clinicalName==undefined || clinicalName==null || clinicalName=="null"){
		alert("please enter clinical evolution name");		
		$("#clinicalName").focus();					
		return false;
	}	
	
	
	if(clinicalCode=="" || clinicalCode==undefined || clinicalCode==null || clinicalCode=="null"){
		alert("please enter clinical evolution name");		
		$("#clinicalCode").focus();					
		return false;
	}
	var inputs = [];	
	inputs.push('clinicalCode=' + clinicalCode);
	inputs.push('clinicalName=' + clinicalName);
	inputs.push('clinicalId=' + clinicalId);
	inputs.push('userId='+userId);
	inputs.push('createdBy='+userId);
	inputs.push('unitId='+unitId);
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/clinical_evolution_master/saveClinicalEvolutionMaster",
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
			 alertify.success("Organ name already exists");
		 }
		 else {
				alertify.error("Oops having some issued");
				
			}
			getAllClinialEvolutionMaster();
			refreshClinicalEvolutionMaster();
		},		
	})
}

/************
* @author	: Akshata Desai
* @date		: 10-Feb-2020
* @codeFor	: Refresh Clinical Evolution master
 ************/

function refreshClinicalEvolutionMaster(){
	$('#clinicalCode').val('');
	$('#clinicalName').val('');
	$('#clinicalId').val(0);
	
	
}

/************
* @author	: Akshata Desai
* @date		: 10-Feb-2020
* @codeFor	: Get List of Clinical Evolution master
 ************/
function getAllClinialEvolutionMaster(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/clinical_evolution_master/getAllClinialEvolutionMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllClinicalEvolutionMaster(r,"All");			
		}
	});
}

function setAllClinicalEvolutionMaster(r,CallFrom){

	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.lstclinicalevolutionMaster.length; i++) {		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstclinicalevolutionMaster[i].clinicalId+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstclinicalevolutionMaster[i].clinicalCode+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstclinicalevolutionMaster[i].clinicalName+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editClinicalEvolutionMaster('+r.lstclinicalevolutionMaster[i].clinicalId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteClinicalEvolutionMaster('+r.lstclinicalevolutionMaster[i].clinicalId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.clinicalId+'</td>'
			+ ' <td class="col-md-1 center">'+r.clinicalCode+'</td>'
			+ ' <td class="col-md-1 center">'+r.clinicalName+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editClinicalEvolutionMaster('+r.clinicalId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteClinicalEvolutionMaster('+r.clinicalId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;	
	}			
	$("#clinicalEvolutionDetails").html(htm);
}
/************
* @author	: Akshata Desai
* @date		: 10-Feb-2020
* @codeFor	: Edit Clinical Evolution master
 ************/
function editClinicalEvolutionMaster(clinicalId){		
	var inputs = [];
	inputs.push('clinicalId=' + clinicalId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/clinical_evolution_master/editClinicalEvolutionMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
			$("#divForEntryClinical").show('slow');
			$('#searchId').val('');
			$('#clinicalName').val(r.clinicalName);
			$('#clinicalId').val(r.clinicalId);		
			$('#clinicalCode').val(r.clinicalCode);
		}
	});
}

/************
* @author	: Akshata Desai
* @date		: 10-Feb-2020
* @codeFor	: Delete Clinical Evolution master
 ************/
function deleteClinicalEvolutionMaster(clinicalId) {
	var r = confirm("Are You Sure You Want To Delete Complaint Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/clinical_evolution_master/deleteClinicalEvolutionMaster",
			data : {
				"clinicalId" : clinicalId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshClinicalEvolutionMaster();
				getAllClinialEvolutionMaster();
			}
		});
	}
}

/************
* @author	: Akshata Desai
* @date		: 10-Feb-2020
* @codeFor	: autosuggestion for Clinical Evolution Master
 ************/


function centerClinicalEvolutionAutoSuggestion(inputID) {
	var resultData = [];
	var clinicalName = $("#" + inputID).val();
	var clinicalCode = $("#"+inputID).val();
	

	if (clinicalName == "" || clinicalName == null || clinicalName == "null"	|| clinicalName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllClinialEvolutionMaster();
		return false;
	}

	var inputs = [];
	inputs.push('clinicalName=' + clinicalName);
	inputs.push('clinicalCode='+clinicalCode);
	
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/clinical_evolution_master/centerClinicalEvolutionAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstclinicalevolutionMaster.length; j++) {
				var arrValue = response.lstclinicalevolutionMaster[j].clinicalId +"-"+response.lstclinicalevolutionMaster[j].clinicalName+"-"+response.lstclinicalevolutionMaster[j].clinicalCode;
				var idValue = response.lstclinicalevolutionMaster[j].clinicalId;
				var clinicalName = response.lstclinicalevolutionMaster[j].clinicalName;
				var clinicalCode = response.lstclinicalevolutionMaster[j].clinicalCode;
				resultData.push({
					ID : idValue,
					Name : clinicalName,
					code : clinicalCode
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name'+" "+'Code',
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
		var clinicalId = res[0];
		var clinicalName = res[1];		
		var clinicalCode = res[2];
		getClinicalEvolutionMasterByclinicalId(clinicalId);
		$("input#" + inputID).val(clinicalName);
		$("input#"+inputID).val(clinicalCode);
	}
}

/************
* @author	: Akshata Desai
* @date		: 10-Feb-2020
* @codeFor	:  get getClinicalEvolutionMasterByclinicalId Detail
 ************/
function getClinicalEvolutionMasterByclinicalId(clinicalId){
	var inputs = [];
	inputs.push('clinicalId=' + clinicalId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/clinical_evolution_master/editClinicalEvolutionMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllClinicalEvolutionMaster(r,"search");
			
		}
		
	});

}

/************
* @author	: Akshata Desai
* @date		: 10-feb-2020
* @codeFor	:  get centerClinicalEvolutionMasterSearchById Detail 
 ************/
function centerClinicalEvolutionMasterSearchById(){
	

	var clinicalId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(clinicalId)) {
		alert("Please Enter Number Only!");
		$("#clinicalId").focus();
		return false;
	}
	getClinicalEvolutionMasterByclinicalId(clinicalId);	
}
