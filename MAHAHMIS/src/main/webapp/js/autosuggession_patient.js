function setPatientSearchType(){
	
	$("#byName").val("");
	var patSearchType = $("#patSearchType").val();
	
	if(patSearchType == 1){
		
		$("#byName").attr("placeholder", "Type UHID Here");
		$("#byName").attr("onkeypress", "return validateNumOnly(event)");
		$("#byName").removeAttr("minlength");
		$("#byName").removeAttr("maxlength");
		
	}else if(patSearchType == 2){
		
		$("#byName").attr("placeholder", "Type Patient Name Here");
		$("#byName").attr("onkeypress", "return validateOnlyName(event)");
		$("#byName").removeAttr("minlength");
		$("#byName").removeAttr("maxlength");
		
	}else if(patSearchType == 3){
		
		$("#byName").attr("placeholder", "Type Patient Mobile Here");
		$("#byName").attr("onkeypress", "return validateNumOnly(event)");
		$("#byName").attr("minlength", "10");
		$("#byName").attr("maxlength", "10");
		
	}else if(patSearchType == 4){
		
		$("#byName").attr("placeholder", "Type Patient Aadhaar No Here");
		$("#byName").attr("minlength", "12");
		$("#byName").attr("maxlength", "12");
	}else if(patSearchType == 5){
		
		$("#byName").attr("placeholder", "Type Patient Legacy UHID No Here");
		$("#byName").attr("minlength", "12");
		$("#byName").attr("maxlength", "12");
	}
}

function setAutoPatientName(inputID,callFrom,e) {
	
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
		
	}else if(patSearchType == 3){
		
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
		 
	}else if(patSearchType == 4){
		
		 var key = e.which;
		 if(key == 13) { // the enter key code
		  
			var addhar = $("#byName").val();
			if(callFrom == "reg"){
				
				setSearchedPatientRegTemp(0,'0',addhar);
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
	inputs.push('findText=' + findingName);	
	inputs.push('patSearchType=' + patSearchType);		
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

function setSearchedPatientRegTemp(patId,mobile,addhar) {
	var startIndex = 0;
	$("#container").addClass("loading");
    var inputs = [];
    inputs.push('patientId=' + patId);  
    inputs.push('mobileNo=' + mobile);  
    inputs.push('addharNo=' + addhar);  
    inputs.push('startIndex=' + startIndex);
    var str = inputs.join('&');
    jQuery.ajax({
        async 	: true,
        type 	: "POST",
        data 	: str + "&reqType=AJAX",
        //url 	: "ehat/markvisit/autoSuggestionMarkVisit",
        url 	: "ehat/register/autoSuggestionMarkVisit",
        cache 	: true,
        success : function(r) {
        	
        	if(r.lstRegviewDto.length > 0){
        		
        		setTempMarkVisit(r,1);
        	}else{
        		
        		alertify.error("Patient not found !!!");
        	}
        	            	
        }
    });
}

function setSearchedPatientPrevOpdTemp(patId,searchType,pageNumber) {
	
	var usertype = searchType;
	var letter = patId;	
    var findingName = "-";
    var deptId = 1;

    var inputs = [];
    inputs.push('findingName=' + findingName);
    inputs.push('usertype=' + usertype);
    inputs.push('letter=' + letter);
    inputs.push('deptId=' + deptId);
    inputs.push('startIndex=' + 0);
    var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
 		url 	: "ehat/billNoble/getPreviousTreatmentPatient",		
		success : function(r) {
			 
			opdPrevRecordsTemp(r,1);  		
		}
	});
}

function setSearchedPatientPrevDiagnosticTemp(patId,pageNumber) {
	
	var usertype = "exact";
	var letter = patId;	
    var findingName = "-";
    var deptId = 3;

    var inputs = [];
    inputs.push('findingName=' + findingName);
    inputs.push('usertype=' + usertype);
    inputs.push('letter=' + letter);
    inputs.push('deptId=' + deptId);
    inputs.push('startIndex=' + 0);
    var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
 		url 	: "ehat/billNoble/getPreviousTreatmentPatient",		
		success : function(r) {
			 
			opdPrevRecordsTemp(r,1);  		
		}
	});
}

function setSearchedPatientPrevIpdTemp(patId) {
	
	var usertype = "exact";
	var letter = patId;	
    var findingName = "-";
    var deptId = 2;

    var inputs = [];
    inputs.push('findingName=' + findingName);
    inputs.push('usertype=' + usertype);
    inputs.push('letter=' + letter);
    inputs.push('deptId=' + deptId);
    var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
 		url 	: "ehat/billNoble/getPreviousTreatmentPatient",		
		success : function(r) {
			 
			opdPrevRecordsTemp(r);  		
		}
	});
}

function setSearchedPatientPrevOpdDDTemp(patId) {
	
	var usertype = "exact";
	var letter = patId;	
    var findingName = "-";
    var deptId = 1;

    var inputs = [];
    inputs.push('findingName=' + findingName);
    inputs.push('usertype=' + usertype);
    inputs.push('letter=' + letter);
    inputs.push('deptId=' + deptId);
    var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
 		url 	: "ehat/billNoble/getPreviousTreatmentPatient",		
		success : function(r) {
			 
			setpatientForTreatmentDD(r);  		
		}
	});
}


function setSearchedPatientPrevIpdDDTemp(patId){
	
	var usertype = "exact";
	var letter = patId;	
    var findingName = "-";
    var deptId = 2;

    var inputs = [];
    inputs.push('findingName=' + findingName);
    inputs.push('usertype=' + usertype);
    inputs.push('letter=' + letter);
    inputs.push('deptId=' + deptId);
    var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
 		url 	: "ehat/billNoble/getPreviousTreatmentPatient",		
		success : function(r) {
			 
			setpatientForTreatmentDD(r);  		
		}
	});
}

 function setSearchedPatientPrevDiagnosticDDTemp(patId){
	
	var usertype = "exact";
	var letter = patId;	
    var findingName = "-";
    var deptId = 3;

    var inputs = [];
    inputs.push('findingName=' + findingName);
    inputs.push('usertype=' + usertype);
    inputs.push('letter=' + letter);
    inputs.push('deptId=' + deptId);
    var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
 		url 	: "ehat/billNoble/getPreviousTreatmentPatient",		
		success : function(r) {
			 
			setpatientForTreatmentDD(r);  		
		}
	});
}
 
 function setSearchedPatientPrevDiagnosticTempByMobile(mobile,pageNumber) {
		
		var usertype = "exact";
		var letter = mobile;	
	    var findingName = "-";
	    var deptId = 3;

	    var inputs = [];
	    inputs.push('findingName=' + findingName);
	    inputs.push('usertype=' + usertype);
	    inputs.push('letter=' + letter);
	    inputs.push('deptId=' + deptId);
	    var str = inputs.join('&');
		jQuery.ajax({
			async 	: true,
			type 	: "POST",
			data 	: str + "&reqType=AJAX",
	 		url 	: "ehat/billNoble/setSearchedPatientPrevDiagnosticTempByMobile",		
			success : function(r) {
				 
				opdPrevRecordsTemp(r,1);  		
			}
		});
	}