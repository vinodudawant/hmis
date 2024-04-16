function getPatientIdBySearchType(callFrom,searchText,patSearchType) {
	
	var patientId = 0;
	$("#container").addClass("loading");
    var inputs = [];
   
    inputs.push('searchType=' + patSearchType);  
    inputs.push('searchText=' + searchText);
    inputs.push('callFrom=' + callFrom);
    var str = inputs.join('&');
    jQuery.ajax({
        async 	: false,
        type 	: "POST",
        data 	: str + "&reqType=AJAX",
      
        url 	: "ehat/patientSearch/getPatientDetailsByLegacyUHIDNumber",
        cache 	: true,
        success : function(r) {
        	
        	if(r.patientId > 0){
        		
        		patientId = r.patientId;        		     		
        		
        	}else{
        		
        		alertify.error("Patient not found !!!");
        		return false;
        	}         	
        }
    });
    return patientId;
}

function getPatientAutoDetails(inputID,callFrom,e){

	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var patSearchType = $("#patSearchType").val();
	
	if(patSearchType == 1){
		
		 var key = e.which;
		 if(key == 13) { // the enter key code
		  
			var patientId = $("#byName").val();
			
			if(callFrom == "prevOpdDD"){
					
				setSearchedPatientPrevOpdTemp(patientId,"byPatientId");
			}
			else if(callFrom == "prevDiagnosticDD"){
				setSearchedPatientPrevDiagnosticTemp(patientId)
			}
			else{
				
				setSearchedPatientRegTemp(patientId,'0','0');
			}
		 }
		 return false;  
		
	}else if(patSearchType == 3 ){
		
		 var key = e.which;
		 if(key == 13) { // the enter key code
		  
			var mobile = $("#byName").val();

			if(callFrom == "reg"){
				
				setSearchedPatientRegTemp(0,findingName,'0');
			}else if(callFrom == "prevOpdDD"){
				
				 setSearchedPatientPrevOpdTemp(mobile,"byMobile");
			}
			else if(callFrom == "prevDiagnosticDD"){
				//setSearchedPatientPrevDiagnosticTemp(patientId);
				setSearchedPatientPrevDiagnosticTempByMobile(mobile,"byMobile");
			}
		 }
		 return false;  
		 
	}	
	else if( patSearchType == 4 || patSearchType == 5 ){
		
		 var key = e.which;
		 if(key == 13) { // the enter key code
		  
			var searchText = $("#byName").val();
			
			var patientId = getPatientIdBySearchType(callFrom,searchText,patSearchType);
			
			if(callFrom == "prevOpdDD"){
				
				setSearchedPatientPrevOpdTemp(patientId,"byPatientId");
			}
			else if(callFrom == "prevDiagnosticDD"){
				setSearchedPatientPrevDiagnosticTemp(patientId)
			}
			else{
				
				setSearchedPatientRegTemp(patientId,'0','0');
			}

			
		 }
		 return false;  
		 
	}
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	var callFromDD = "";
	var callFromIpdDD = "";
	var callFromDiagnosticDD="";
	
	if(callFrom == "prevOpdDD"){
		
		callFromDD = "prevOpdDD";
		callFrom = "prevOpd";
	}
	
	
	
	if(callFrom == "prevDiagnosticDD"){
		callFromDiagnosticDD="prevDiagnosticDD";
		callFrom = "prevDiagnostic";
	}
	
	if(callFrom == "prevIpdDD"){
		
		callFromIpdDD = "prevIpdDD";
		callFrom = "prevIpd";
	}
	
	
	var inputs = [];	
	inputs.push('searchText=' + findingName);	
	inputs.push('searchType=' + parseInt(patSearchType));		
	inputs.push('callFrom=' + callFrom);		
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/patientSearch/getPatientAutoDetails",
		cache : false,		
		success : function(r) {
			
			var template = "";
			for ( var j = 0; j < r.lstRegviewDto.length; j++) {
				
				var arrValue = r.lstRegviewDto[j].ptId +"-"+r.lstRegviewDto[j].patientName +"-"+r.lstRegviewDto[j].mobile;
				var idValue = r.lstRegviewDto[j].ptId;
				var patName = r.lstRegviewDto[j].patientName;
				resultData.push({
					ID : idValue,
					Name : patName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue
						+ '</a></li>';
			}
			
			setTimeout(function() {

				$("#div" + inputID + " .typeahead").html(template);
				$("#div" + inputID + " .typeahead").show();
				
				$("#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var patId = res[0];
		var patName = res[1];
		//var patMobile = res[2];
		
		$("#" + inputID).val(patName);	
		
		if(callFrom == "prevOpdDD"){
			
			setSearchedPatientPrevOpdDDTemp(patId);
			
		}else if(callFrom == "prevIpdDD"){
			
			setSearchedPatientPrevIpdDDTemp(patId);
		}
		else if(callFrom == "prevDiagnosticDD"){
			
			setSearchedPatientPrevDiagnosticDDTemp(patId)
		}
		else {
			
			if(callFrom == "reg"){
				
				setSearchedPatientRegTemp(patId,'0','0');
				
			}else if(callFrom == "prevOpd"){
				
				setSearchedPatientPrevOpdTemp(patId,"byPatientId");
				
			}else if(callFrom == "prevIpd"){
				
				setSearchedPatientPrevIpdTemp(patId);
			}
			else if(callFrom == "prevDiagnostic"){
				
				setSearchedPatientPrevDiagnosticTemp(patId);
			}
		}			
	}

}


function getPatientAutoByOPD(inputID,callFrom,e){

	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var patSearchType = $("#selectsearchopd").val();
	
	if(patSearchType == 1){
		
		 var key = e.which;
		 if(key == 13) { // the enter key code
		  
			var patientId = $("#patientopd").val();
			if(patientId == "")
				patientId = 0;
			fetchOpdQueuePatient(patientId,'-','-',1);
		 }
		 return false;  
		
	}else if(patSearchType == 3 ){
		 var key = e.which;
		 if(key == 13) { // the enter key code
		  
			var searchText = $("#patientopd").val();
			//var patientId =getPatientIdBySearchType(callFrom,searchText,patSearchType)
			fetchOpdQueuePatient(0,searchText,'-',1);
		 }
		 return false;  
	}else if( patSearchType == 4 || patSearchType == 5){
		
		 var key = e.which;
		 if(key == 13) { // the enter key code
		  
			var searchText = $("#patientopd").val();
			var patientId =getPatientIdBySearchType(callFrom,searchText,patSearchType)
			fetchOpdQueuePatient(patientId,'-','-',1);
		 }
		 return false;  
		 
	}
	
	if(patSearchType == 2){
		
		if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
			
			alert("Please enter search value");
			$("#" + inputID).focus();
			return false;
		}
			
		var inputs = [];	
		inputs.push('findText=' + findingName);
		inputs.push('patSearchType=2');		
		inputs.push('callFrom=' + callFrom);		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/markvisit/autoSuggestionMarkVisit1",
			cache : false,		
			success : function(r) {
				
				var template = "";
				for ( var j = 0; j < r.lstRegviewDto.length; j++) {
					
					var arrValue = r.lstRegviewDto[j].ptId +"-"+r.lstRegviewDto[j].patientName +"-"+r.lstRegviewDto[j].mobile;
					var idValue = r.lstRegviewDto[j].ptId;
					var patName = r.lstRegviewDto[j].patientName;
					resultData.push({
						ID : idValue,
						Name : patName
					});
					template = template + '<li data-value="' + idValue
							+ '" class=""><a href="#">' + arrValue
							+ '</a></li>';
				}
				
				setTimeout(function() {

					$("#div" + inputID + " .typeahead").html(template);
					$("#div" + inputID + " .typeahead").show();
					
					$("#" + inputID).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true
					});
					$("#" + inputID).data('typeahead').source = resultData;
				}, 500);
			}
		});
		function displayResult(item) {

			var res = item.text.split('-');
			var patId = res[0];
			var patName = res[1];
			//var patMobile = res[2];
			
			$("#" + inputID).val(patName);	
				
			fetchOpdQueuePatient(patId,'-','-',1);
			
			$("#patientopd").val("");
		}
	}

}

function getIPDAutoDetails(inputID, e){
	var callFrom="";
	var patSearchType=$("#patSearchType").val();
	if(patSearchType == 1 || patSearchType == 3 ){
		var key = e.which;
		 if(key == 13) {
			 //alert("ENTER CLICKED!!!");
			 setAutoPatientName(inputID);
		 }
	}else if(patSearchType == 5){
		var key = e.which;
		 if(key == 13) {
			 var searchText = $("#" + inputID).val();
			 var patientID=getPatientIdBySearchType(callFrom,searchText,patSearchType);
				getPatientInfoByPatientId(patientID);
		 }
		
		
	}else if(patSearchType == 2){

		var callFrom=$("#patSearchType").val();
		
		var resultData = [];
	var searchText = $("#" + inputID).val();

	if (searchText == "" || searchText == null || searchText == "null"	|| searchText == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getIpdQueue();
		return false;
	}

	var unit_id=$('#unitId').val();

	var inputs = [];
	inputs.push('unit_id=' + unit_id);
	inputs.push('findText=' + searchText);

	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdQueue/autoSuggestationIpdQueue",
		cache : false,
		success : function(response) {
			
				var template = "";
				
				for ( var j = 0; j < response.lstIpdQueue.length; j++) {
					var arrValue = response.lstIpdQueue[j].patient_id +"-"+response.lstIpdQueue[j].patient_name;
					var idValue = response.lstIpdQueue[j].patient_id;
					var stateName = response.lstIpdQueue[j].patient_name;
					resultData.push({
						ID : idValue,
						Name : stateName
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
		var patId = res[0];
		var stateName = res[1];		
		getPatientInfoByPatientId(patId);
		$("input#" + inputID).val(patId);
	}

	}
}

function getIpdGeneralBillAutoDetails(inputID, e){
	var callFrom="";
var patSearchType=$("#patSearchType").val();
	
	if(patSearchType == 1 || patSearchType == 3)
	{
		 var key = e.which;
		 if(key == 13) {
			 //alert("ENTER CLICKED!!!");
			 setAutoPatientName(inputID);
		 }
	}else if(patSearchType == 5){
		var key = e.which;
		 if(key == 13) {
			 var searchText = $("#" + inputID).val();
			 var patientID=getPatientIdBySearchType(callFrom,searchText,patSearchType);
			 
				var wardType = $('#wardTypeHall').val();
				var wardName = $('#wardName').val();
				var unit_id = parseInt($("#unitId").val());
				var startIndex = 0;
				
				if (searchText == "" || searchText == null || searchText == "null"	|| searchText == undefined) {
					
					$("#" + inputID).focus();
					return false;
				}
				
				var inputs = [];
				inputs.push('unit_id=' + unit_id);
				inputs.push('findText=' + patientID);
				inputs.push('wardType=' + wardType);
				inputs.push('wardName=' + wardName);
				inputs.push('callFrom=' + "1");
				inputs.push('startIndex=' + startIndex);
				var str = inputs.join('&');
				
				
				jQuery.ajax({
					async : false,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "ehat/ipdGenFinalBill/autoSuggestationGeneralBillPatients",
					cache : false,
					success : function(response) {
						
						if(response.lstIpdbillPatients.length > 0)
						{
							
							setIpdbillPatientsTemp(response,"search",1);
							
						}else{
							alert("No data found!!");
							return false;
						}
					
				}
			});
				
			 
		 }
	}else{
		
		var resultData = [];
		var callFrom=$("#patSearchType").val();
		var searchText = $("#" + inputID).val();
		var wardType = $('#wardTypeHall').val();
		var wardName = $('#wardName').val();
		var unit_id = parseInt($("#unitId").val());
		var startIndex = 0;
		
		if (searchText == "" || searchText == null || searchText == "null"	|| searchText == undefined) {
		
			$("#" + inputID).focus();
			return false;
		}
		
		var inputs = [];
		inputs.push('unit_id=' + unit_id);
		inputs.push('findText=' + searchText);
		inputs.push('wardType=' + wardType);
		inputs.push('wardName=' + wardName);
		inputs.push('callFrom=' + callFrom);
		inputs.push('startIndex=' + startIndex);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ipdGenFinalBill/autoSuggestationGeneralBillPatients",
			cache : false,
			success : function(response) {
			
				var template = "";
				
				for ( var j = 0; j < response.lstIpdbillPatients.length; j++) {
					var arrValue = response.lstIpdbillPatients[j].patient_id +"-"+response.lstIpdbillPatients[j].patient_name;
					var idValue = response.lstIpdbillPatients[j].patient_id;
					var stateName = response.lstIpdbillPatients[j].patient_name;
					//setIpdbillPatientsTemp(response,"search"); //Added By Annapurna
					resultData.push({
						ID : idValue,
						Name : stateName
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
		var patId = res[0];
		var stateName = res[1];	
		var wardType = $('#wardTypeHall').val();
		var wardName = $('#wardName').val();
		getPatientInfoByPatientId(patId);
		$("input#" + inputID).val(patId);
	}
}

	
}

function getIPDFinalAutoDetails(inputID, e){
var patSearchType=$("#patSearchType").val();
	var callFrom="";
	if(patSearchType == 1 || patSearchType == 3)
	{
		 var key = e.which;
		 if(key == 13) {
			 setAutoPatientNameFinalBill(inputID);
		 }
	}else if(patSearchType == 5){
		var key = e.which;
		 if(key == 13) {
			 var searchText = $("#" + inputID).val();
		  var patientID= getPatientIdBySearchType(callFrom,searchText,patSearchType)
		  
		  var resultData = [];
		  var searchText = $("#" + inputID).val();
		  var wardType = $('#wardTypeHall').val();
		  var wardName = $('#wardName').val();

		  if (searchText == "" || searchText == null || searchText == "null"	|| searchText == undefined) {

//		  	alert("Please enter search value");
		  	$("#" + inputID).focus();
		  	//getIpdQueue();
//		  	getIpdBillPatients();
		  	return false;
		  }

		  var unit_id = parseInt($("#unitId").val());
		  var startIndex = 0;

		  var inputs = [];
		  inputs.push('unit_id=' + unit_id);
		  inputs.push('findText=' + patientID);
		  inputs.push('wardType=' + wardType);
		  inputs.push('wardName=' + wardName);
		  inputs.push('callFrom=' + "1");
		  inputs.push('startIndex=' + startIndex);
		  var str = inputs.join('&');
  
		  jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/ipdGenFinalBill/autoSuggestationFinalBillPatients",
				cache : false,
				success : function(response) {
						
						if(response.lstIpdbillPatients.length > 0)
						{
							setIpdbillPatientsTempFinalBill(response,"search",1);
							
						}else{
							alert("No data found!!");
							return false;
						}
					
				}
			});
		  
		 }
	}
	else{
		var callFrom=$("#patSearchType").val();
		//alert(callFrom);
		
		var resultData = [];
	var searchText = $("#" + inputID).val();
	var wardType = $('#wardTypeHall').val();
	var wardName = $('#wardName').val();

	if (searchText == "" || searchText == null || searchText == "null"	|| searchText == undefined) {

		$("#" + inputID).focus();
		return false;
	}

	var unit_id = parseInt($("#unitId").val());
	var startIndex = 0;

	var inputs = [];
	inputs.push('unit_id=' + unit_id);
	inputs.push('findText=' + searchText);
	inputs.push('wardType=' + wardType);
	inputs.push('wardName=' + wardName);
	inputs.push('callFrom=' + callFrom);
	inputs.push('startIndex=' + startIndex);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdGenFinalBill/autoSuggestationFinalBillPatients",
		cache : false,
		success : function(response) {
			
				var template = "";
				
				for ( var j = 0; j < response.lstIpdbillPatients.length; j++) {
					var arrValue = response.lstIpdbillPatients[j].patient_id +"-"+response.lstIpdbillPatients[j].patient_name;
					var idValue = response.lstIpdbillPatients[j].patient_id;
					var stateName = response.lstIpdbillPatients[j].patient_name;
					resultData.push({
						ID : idValue,
						Name : stateName
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
		var patId = res[0];
		var stateName = res[1];	
		var wardType = $('#wardTypeHall').val();
		var wardName = $('#wardName').val();
		getPatientInfoByPatientIdFinalBill(patId);
		$("input#" + inputID).val(patId);
	}
	}
}