function validateNumber(evt){
	var patientTypeId = $('#patSearchType').val();
	
	if(patientTypeId == 1)
		return false;
	else if(patientTypeId == 0)
		return false;
	
	 evt = (evt) ? evt : window.event;
	   var charCode = (evt.which) ? evt.which : evt.keyCode;
	   if (charCode > 32 && (charCode < 48 || charCode > 57)) {
		   alert("Enter only numbers");
		   $('#byName').val("");
	      return false;
	   }
	return true;
}
function AplhaNumerice(key, pervision)
{
var patientTypeId = $('#patSearchType').val();
	
	if(patientTypeId == 2 || patientTypeId == 4)
		return false;
	else if(patientTypeId == 0)
		return false;
	var keycode = (key.which) ? key.which : key.keyCode;
	if ((keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123)
			|| keycode == 8 || keycode == 9 || keycode == 127 || keycode == 13
			|| (keycode > 34 && keycode < 41)) {
		return true;
	} else {
		alert("Please Enter Alphabets Only!");
		return false;

	}
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Auto-Suggestion.
************************************************************/
function phelbotomyPatientAutoSuggestion(patientId, type) {
	var tabId =  "";
	var checkcall = $("#callformforAuthorizationSearch").val();
	
	if(type == "appointmentAutoSugg"){
		tabId =  "";
	}else if(type == "phelbotomyAutoSugg"){
		tabId =  $("#tabId li.active").attr('id');
	}else if(type == "accessionTestAutoSugg"){
		tabId =  $("#tabId li.active").attr('id');
	}else if(type == "BTOBRecollection"){
		tabId =  $("#tabId li.active").attr('id');
	}else if(type == "BTOCRecollection"){
		tabId =  $("#tabId li.active").attr('id');
	}else if(type == "processingAutoSugg"){
		tabId =  $("#tabId li.active").attr('id');
	}else if(type == "reportingAutoSugg"){
		tabId =  $("#tabId li.active").attr('id');
	}
	else if(type == "authorizationAutoSugg" && checkcall == 'templatetest'){
		tabId = 'authorizationtemplatetest' ;
	}
	

	var resultData = [];
	var patient = $("input#" + patientId).val();
	
	if(patient == "" || patient == null || patient == "null" || patient == undefined){
		alert("Please enter search value");
		$("input#" + patientId).focus();//Added by amol for search value 
		return false;
	}
	var patientTypeId = $('#patSearchType').val();
	
	if(patientTypeId == 2 || patientTypeId == 4){
		/*var charCode = (evt.which) ? evt.which : evt.keyCode;
		   if (charCode > 32 && (charCode < 48 || charCode > 57)) {
			   alert("Enter only numbers");
			   $('#byName').val("");
		    }*/
		//return false;
	}else if(patientTypeId == 0){
		alert("First select patient type.");
		$('#byName').val("");
		return false;
	}

	var searchBy = "";
	if(patientTypeId == 1){
		searchBy = "byName";
		$("#byName").attr("placeholder", "Type Patient Name Here");
		$('#byName').attr('onkeypress','');//Added by amol search only character
	}else if(patientTypeId == 2){
		searchBy = "byId";
		$("#byName").attr("placeholder", "Type Patient Name Here");
		$('#byName').attr('onkeypress','return validateNumber(event);');//Added by amol search only number
	} else if (patientTypeId == 3) {
		searchBy = "byBarcode";
		if(patient.length != 14) {//Added by kishor for barcode search only after enter 14 char.
			$("div#divbyName .typeahead").hide();
			return false;
		}
	}else if(patientTypeId == 4){
		searchBy = "byMobile";
		$("#byName").attr("maxlength", "10");
		$("#byName").attr("placeholder", "Type Patient Mobile No Here");
		$('#byName').attr('onkeypress',
        'return validateNumber(event);');//Added by amol search only number
	}else if(patientTypeId == 5){
		searchBy = "byBarcode";
		$('#byName').attr('onkeypress','');//Added by amol search only character
	}
	
	if (patient == "" || patient == null || patient == "null" || patient == undefined) {
		//alert("Please enter search value");
		$("input#" + patientId).focus();
		$("div#divbyName .typeahead").hide();
		return false;
	}
	
	if(patientTypeId != 1){
		
		var e = window.event;
		var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
		if (charCode != 13) {
			return false;
		}
	}
	
	var emergencyFlag = $("#emergencyFlag").val();
	
	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(patient));
	inputs.push('searchBy=' + encodeURIComponent(searchBy));
	inputs.push('callFrom=' + type);
	inputs.push('tabId=' + tabId);
	inputs.push('emergencyFlag=' + emergencyFlag);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/phelbotomypatientautosuggestion",
		cache : false,
		success : function(response) {
			
			if(response.labSampleWiseMasterDtoList.length > 0){
				
				if(patientTypeId == 1){
					
					var template = "";
					for(var j = 0; j < response.labSampleWiseMasterDtoList.length; j++) {
						var arrValue = "";
						var idValue = "";
						var name = "";
						
						arrValue = response.labSampleWiseMasterDtoList[j].patientId +"-"+response.labSampleWiseMasterDtoList[j].patientname;
						idValue = response.labSampleWiseMasterDtoList[j].patientId;
						name = response.labSampleWiseMasterDtoList[j].patientname;
						
						resultData.push({
							ID : idValue,
							Name : name
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue + '</a></li>';
					}
		
					setTimeout(function() {
						$("div#divbyName .typeahead").html(template);
						$("div#divbyName .typeahead").show();
		
						$("input#" + patientId).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("input#" + patientId).data('typeahead').source = resultData;
					}, 500);
				}else{
					
					var patId = response.labSampleWiseMasterDtoList[0].patientId;
					var patientName = response.labSampleWiseMasterDtoList[0].patientname;
					getPatientById(patId, type, tabId, emergencyFlag);
					$("input#" + patientId).val(patientName);
				}
				
			}else{
				
				alertify.error("Record not found");
			}
		}
	});
	function displayResult(item) {
		var res = item.text.split('-');
		var patId = res[0];
		var patientName = res[1];
		getPatientById(patId, type, tabId, emergencyFlag);
		$("input#" + patientId).val(patientName);
	}
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Get Phlebotomy Patient by ID.
************************************************************/
function getPatientById(id, type, tabId, emergencyFlag) {
	emergencyFlag = $("#emergencyFlag").val();
	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('callFrom=' + type);
	inputs.push('tabId=' + tabId);
	inputs.push('emergencyFlag=' + emergencyFlag);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/getpatientbyid",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setPatientTemp(response, type, tabId);
			$('#byName').val("");
		}
	});
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment To search Phlebotomy Patient records.
************************************************************/
function searchLabTestPatient(callFrom){
	$('#patSearchType').val(2);
	var tabId =  "";
	$("#callformforAuthorizationSearch").val('');  // add by Rohini.
	
	if(callFrom == "appointmentSearchBtn"){
		tabId = "";
		callFromTemp = "appointmentAutoSugg";
	}else if(callFrom == "phelbotomySearchBtn"){
		tabId =  jQuery('#tabId').find('li.active').attr('id');
		callFromTemp = "phelbotomyAutoSugg";
	}else if(callFrom == "accessionTestSearchBtn"){
		tabId =  jQuery('#tabId').find('li.active').attr('id');
		callFromTemp = "accessionTestAutoSugg";
	}else if(callFrom == "accessionTrackStatusSearchBtn"){
		callFromTemp = "accessionTrackStatusAutoSugg";
	}else if(callFrom == "processingSearchBtn"){
		tabId =  jQuery('#tabId').find('li.active').attr('id');
		callFromTemp = "processingAutoSugg";
	}else if(callFrom == "authorizationSearchBtn"){
		callFromTemp = "authorizationAutoSugg";
	}else if(callFrom == "reportingSearchBtn"){
		callFromTemp = "reportingAutoSugg";
	}else if(callFrom == "outSourceSearchBtn"){
		callFromTemp = "outSourceAutoSugg";
	}else if(callFrom == "BTOBRecollection"){
		tabId =  jQuery('#tabId').find('li.active').attr('id');
		callFromTemp = "BTOBRecollection";
	}else if(callFrom == "BTOCRecollection"){
		tabId =  jQuery('#tabId').find('li.active').attr('id');
		callFromTemp = "BTOCRecollection";
	}
	
	var custTypeId =  $.trim($("#custTypeForSearch").val());
	
	var custNameId =  $.trim($("#custNameForSearch").val());
	
	var txtFdate = $.trim($("#txtFdate").val());
	
	var txtTdate = $.trim($("#txtTdate").val());
	
	var startIndex = 0;
	
	var emergencyFlag = $("#emergencyFlag").val();
	
	if (custTypeId == "0" && custNameId == "0" && txtFdate == "" && txtTdate == "") {
		alert("Please enter something to search");
		return false;
	}
	
	var searchBy = "";
	if(custTypeId == 0){
		if ((txtFdate != "" && (txtTdate == "")) || (txtTdate != "" && (txtFdate == ""))) {
			$("#custTypeForSearch").val(0);
			$("#txtTdate").val(" ");
			$("#txtFdate").val(" ");
			alert("Please select both date to search");
			return false;
		}else{
			searchBy = "byDate";
		}
	}else if(custTypeId != 0 && custNameId == 0){
		
		if(txtFdate == "" && txtTdate == ""){
			searchBy = "byType";
		}else if (txtFdate != "" && txtTdate == "") {
			$("#custTypeForSearch").val(0);
			$("#custNameForSearch").val(0);
			$("#txtTdate").val("");
			$("#txtFdate").val("");
			alert("Please select both date to search");
			return false;
		}else if(txtFdate == "" && txtTdate != ""){
			$("#custTypeForSearch").val(0);
			$("#custNameForSearch").val(0);
			$("#txtTdate").val("");
			$("#txtFdate").val("");
			alert("Please select both date to search");
			return false;
		}else if((txtFdate != "" && txtTdate != "" && custTypeId != 0)) {
			searchBy = "byTypeDate";
		}
	}else if(custTypeId != 0 && custNameId != 0){
		if(txtFdate == "" && txtTdate == ""){
			searchBy = "byTypeName";
		}else if (txtFdate != "" && txtTdate == "") {
			$("#custTypeForSearch").val(0);
			$("#custNameForSearch").val(0);
			$("#txtTdate").val("");
			$("#txtFdate").val("");
			alert("Please select both date to search");
			return false;
		}else if(txtFdate == "" && txtTdate != ""){
			$("#custTypeForSearch").val(0);
			$("#custNameForSearch").val(0);
			$("#txtTdate").val("");
			$("#txtFdate").val("");
			alert("Please select both date to search");
			return false;
		}else if((txtFdate != "" && txtTdate != "" && custTypeId != 0 && custNameId != 0)) {
			searchBy = "byAll";
		}
	}
	
	$("#custTypeId").val(custTypeId);
	$("#custNameId").val(custNameId);
	$("#fromDate").val(txtFdate);
	$("#toDate").val(txtTdate);
	$("#searchBy").val(searchBy);
	
	var inputs = [];
	inputs.push('custTypeId=' + custTypeId);
	inputs.push('custNameId=' + custNameId);
	inputs.push('fromDate=' + txtFdate);
	inputs.push('toDate=' + txtTdate);
	inputs.push('callFrom=' + callFrom);
	inputs.push('searchBy=' + searchBy);
	inputs.push('tabId=' + tabId);
	inputs.push('startIndex=' +startIndex);
	inputs.push('emergencyFlag=' +emergencyFlag);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/searchlabtestpatient",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#custTypeForSearch").val(0);
			$("#custNameForSearch").val(0);
			//$("#txtTdate").val("");
			//$("#txtFdate").val("");
			setPatientTemp(r, callFromTemp, tabId);
			setPaginationTemplate(r, callFrom, tabId);
			if(callFrom == "phelbotomySearchBtn" || callFrom == "accessionTestSearchBtn")
				getDynamicTabCount(custTypeId, custNameId, txtFdate, txtTdate, callFrom, searchBy, emergencyFlag);
			else if(callFrom == "authorizationSearchBtn")
				//getRecordCountForAuthorizeTabIndicator(txtFdate, txtTdate);
				getRecordCountOnAuthorization();
		else if(callFrom == "reportingSearchBtn")
			getRecordCountForReportingTabIndicator(txtFdate, txtTdate);
		else if(callFrom == "processingSearchBtn")
			getProcessingCount("processingSearchBtn");
	}
	});
}

function getProcessingCount(callFrom){
	var tabId =  "";
	if(callFrom == "processingSearchBtn"){
		tabId =  jQuery('#tabId').find('li.active').attr('id');
		callFromTemp = "processingAutoSugg";
	}
	var custTypeId =  $.trim($("#custTypeForSearch").val());
	var custNameId =  $.trim($("#custNameForSearch").val());
	var txtFdate = $.trim($("#txtFdate").val());
	var txtTdate = $.trim($("#txtTdate").val());
	var startIndex = 0;
	var emergencyFlag = $("#emergencyFlag").val();
	if (custTypeId == "0" && custNameId == "0" && txtFdate == "" && txtTdate == "") {
		alert("Please enter something to search");
		return false;
	}
	
	var searchBy = "";
	if(custTypeId == 0){
		if ((txtFdate != "" && (txtTdate == "")) || (txtTdate != "" && (txtFdate == ""))) {
			$("#custTypeForSearch").val(0);
			$("#txtTdate").val(" ");
			$("#txtFdate").val(" ");
			alert("Please select both date to search");
			return false;
		}else{
			searchBy = "byDate";
		}
	}else if(custTypeId != 0 && custNameId == 0){
		
		if(txtFdate == "" && txtTdate == ""){
			searchBy = "byType";
		}else if (txtFdate != "" && txtTdate == "") {
			$("#custTypeForSearch").val(0);
			$("#custNameForSearch").val(0);
			$("#txtTdate").val("");
			$("#txtFdate").val("");
			alert("Please select both date to search");
			return false;
		}else if(txtFdate == "" && txtTdate != ""){
			$("#custTypeForSearch").val(0);
			$("#custNameForSearch").val(0);
			$("#txtTdate").val("");
			$("#txtFdate").val("");
			alert("Please select both date to search");
			return false;
		}else if((txtFdate != "" && txtTdate != "" && custTypeId != 0)) {
			searchBy = "byTypeDate";
		}
	}else if(custTypeId != 0 && custNameId != 0){
		if(txtFdate == "" && txtTdate == ""){
			searchBy = "byTypeName";
		}else if (txtFdate != "" && txtTdate == "") {
			$("#custTypeForSearch").val(0);
			$("#custNameForSearch").val(0);
			$("#txtTdate").val("");
			$("#txtFdate").val("");
			alert("Please select both date to search");
			return false;
		}else if(txtFdate == "" && txtTdate != ""){
			$("#custTypeForSearch").val(0);
			$("#custNameForSearch").val(0);
			$("#txtTdate").val("");
			$("#txtFdate").val("");
			alert("Please select both date to search");
			return false;
		}else if((txtFdate != "" && txtTdate != "" && custTypeId != 0 && custNameId != 0)) {
			searchBy = "byAll";
		}
	}
	
	$("#custTypeId").val(custTypeId);
	$("#custNameId").val(custNameId);
	$("#fromDate").val(txtFdate);
	$("#toDate").val(txtTdate);
	$("#searchBy").val(searchBy);
	
	var inputs = [];
	inputs.push('custTypeId=' + custTypeId);
	inputs.push('custNameId=' + custNameId);
	inputs.push('fromDate=' + txtFdate);
	inputs.push('toDate=' + txtTdate);
	inputs.push('callFrom=' + callFrom);
	inputs.push('searchBy=' + searchBy);
	inputs.push('tabId=' + tabId);
	inputs.push('startIndex=' +startIndex);
	inputs.push('emergencyFlag=' +emergencyFlag);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/getProcessingCount",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#proccRecCount').text(r);
	}
	});
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination.
************************************************************/
function pagination(pageNumber, numberOfPages, callFrom){
	var emergencyFlag = $("#emergencyFlag").val();
	
	var callFromTemp = "";
	var tabId = "";
	if(callFrom == "phlebotomy"){
		callFromTemp = "phelbotomyAutoSugg";
	}else if(callFrom == "accession"){
		callFromTemp = "accessionTestAutoSugg";
		tabId = "AL";
	}else if(callFrom == "accessionPending"){
		callFromTemp = "accessionTestAutoSugg";
		tabId = "accessionPending";
	}else if(callFrom == "collectionPending"){
		callFromTemp = "accessionTestAutoSugg";
		tabId = "collectionPending";
	}else if(callFrom == "accessionDone"){
		callFromTemp = "accessionTestAutoSugg";
		tabId = "accessionDone";
	}else if(callFrom == "rejectedSample"){
		callFromTemp = "accessionTestAutoSugg";
		tabId = "rejectedSample";
	}else if(callFrom == "accessionTrackStatus"){
		callFromTemp = "accessionTrackStatusAutoSugg";
	}else if(callFrom == "processing"){
		callFromTemp = "processingAutoSugg";
		tabId = "AL";
	}else if(callFrom == "authorization"){
		callFromTemp = "authorizationAutoSugg";
	}else if(callFrom == "reporting"){
		callFromTemp = "reportingAutoSugg";
	}else if(callFrom == "outsource"){
		callFromTemp = "outSourceAutoSugg";
	}else if(callFrom == "accessionpathologist"){
		callFromTemp = "processingAutoSugg";
		tabId = "accessionpatho";
	}else if(callFrom == "allBToB"){
		callFromTemp = "BTOBRecollection";
		tabId = "ALBToB";
	}else if(callFrom == "ARBToB"){
		callFromTemp = "BTOBRecollection";
		tabId = "rejectedSampleBToB";
	}else if(callFrom == "PRBToB"){
		callFromTemp = "BTOBRecollection";
		tabId = "pathoRecollectionBToB";
	}else if(callFrom == "allBToC"){
		callFromTemp = "BTOCRecollection";
		tabId = "ALBToC";
	}else if(callFrom == "ARBToC"){
		callFromTemp = "BTOCRecollection";
		tabId = "rejectedSampleBToC";
	}else if(callFrom == "PRBToC"){
		callFromTemp = "BTOCRecollection";
		tabId = "pathoRecollectionBToC";
	}
	
	var inputs = [];
	var startIndex = (pageNumber - 1) + "0";
	inputs.push('callFrom=' + callFrom);
    inputs.push('startIndex='+startIndex);
    inputs.push('emergencyFlag='+emergencyFlag);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch	/getphlebotomypagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        setPatientTemp(r, callFromTemp, tabId);
	        
	        if(callFrom == "phlebotomy")
	        	$('#phlebotomyNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "accession")
	    		$('#accessionNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "accessionPending")
	    		$('#accessionPendingNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "collectionPending")
	    		$('#collectionPendingNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "accessionDone")
	    		$('#accessionDoneNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "rejectedSample")
	    		$('#rejectedSampleNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "accessionTrackStatus")
	    		$('#accessionTrackStatusNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "processing")
	    		$('#processingNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "authorization")
	    		$('#authorizationNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "reporting")
	    		$('#reportingNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "outsource")
	    		$('#outSourceNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "accessionpathologist")
	    		$('#accessionPathologistNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "allBToB")
	    		$('#allBToBNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "ARBToB")
	    		$('#ARBToBNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "PRBToB")
	    		$('#PRBToBNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "allBToC")
	    		$('#allBToCNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "ARBToC")
	    		$('#ARBToCNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "PRBToC")
	    		$('#PRBToCNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
 		},
	});	
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination Next Button.
************************************************************/
function nextPagination(currentIndex, numberOfPages, callFrom){
	var displayPagination = currentIndex + 5;
	var numberOfRows = '';
	numberOfRows  = numberOfRows + '<li class="previous" onclick="previousPagination('+currentIndex+','+Math.round(numberOfPages)+',\''+callFrom+'\');"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	if(numberOfPages < displayPagination){
		displayPagination = numberOfPages + 1;
	}
	for(var j = currentIndex; j < displayPagination; j++){
		numberOfRows +='<li onclick="pagination('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\')"><a>'+j+'</a></li>';
	}
	if(numberOfPages >= displayPagination){
		numberOfRows +='<li class="next" onclick="nextPagination('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	}
	
	if(callFrom == "phlebotomy")
		$('#phlebotomyPagination').html(numberOfRows);
	else if(callFrom == "accession")
		$('#accessionPagination').html(numberOfRows);
	else if(callFrom == "accessionPending")
		$('#accessionPendingPagination').html(numberOfRows);
	else if(callFrom == "collectionPending")
		$('#collectionPendingPagination').html(numberOfRows);
	else if(callFrom == "accessionDone")
		$('#accessionDonePagination').html(numberOfRows);
	else if(callFrom == "rejectedSample")
		$('#rejectedSamplePagination').html(numberOfRows);
	else if(callFrom == "accessionTrackStatus")
		$('#accessionTrackStatusPagination').html(numberOfRows);
	else if(callFrom == "processing")
		$('#processingPagination').html(numberOfRows);
	else if(callFrom == "authorization")
		$('#authorizationPagination').html(numberOfRows);
	else if(callFrom == "reporting")
		$('#reportingPagination').html(numberOfRows);
	else if(callFrom == "outsource")
		$('#outSourcePagination').html(numberOfRows);
	else if(callFrom == "allBToB")
		$('#allBToBPagination').html(numberOfRows);
	else if(callFrom == "ARBToB")
		$('#ARBToBPagination').html(numberOfRows);
	else if(callFrom == "PRBToB")
		$('#PRBToBPagination').html(numberOfRows);
	else if(callFrom == "allBToC")
		$('#allBToCPagination').html(numberOfRows);
	else if(callFrom == "ARBToC")
		$('#ARBToCPagination').html(numberOfRows);
	else if(callFrom == "PRBToC")
		$('#PRBToCPagination').html(numberOfRows);
	
	pagination(currentIndex, numberOfPages, callFrom);
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination Previous Button.
************************************************************/
function previousPagination(currentIndex, numberOfPages, callFrom){
	var displayPagination = currentIndex - 5;
	var numberOfRows = '';
	if(currentIndex > 6){
		numberOfRows +='<li class="previous" onclick="previousPagination('+displayPagination+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	}
	for(var j = displayPagination; j < currentIndex; j++){
		numberOfRows +='<li onclick="pagination('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\')"><a>'+j+'</a></li>';
	}
		numberOfRows +='<li class="next" onclick="nextPagination('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	
	if(callFrom == "phlebotomy")
		$('#phlebotomyPagination').html(numberOfRows);
	else if(callFrom == "accession")
		$('#accessionPagination').html(numberOfRows);
	else if(callFrom == "accessionPending")
		$('#accessionPendingPagination').html(numberOfRows);
	else if(callFrom == "collectionPending")
		$('#collectionPendingPagination').html(numberOfRows);
	else if(callFrom == "accessionDone")
		$('#accessionDonePagination').html(numberOfRows);
	else if(callFrom == "rejectedSample")
		$('#rejectedSamplePagination').html(numberOfRows);
	else if(callFrom == "accessionTrackStatus")
		$('#accessionTrackStatusPagination').html(numberOfRows);
	else if(callFrom == "processing")
		$('#processingPagination').html(numberOfRows);
	else if(callFrom == "authorization")
		$('#authorizationPagination').html(numberOfRows);
	else if(callFrom == "reporting")
		$('#reportingPagination').html(numberOfRows);
	else if(callFrom == "outsource")
		$('#outSourcePagination').html(numberOfRows);
	else if(callFrom == "allBToB")
		$('#allBToBPagination').html(numberOfRows);
	else if(callFrom == "ARBToB")
		$('#ARBToBPagination').html(numberOfRows);
	else if(callFrom == "PRBToB")
		$('#PRBToBPagination').html(numberOfRows);
	else if(callFrom == "allBToC")
		$('#allBToCPagination').html(numberOfRows);
	else if(callFrom == "ARBToC")
		$('#ARBToCPagination').html(numberOfRows);
	else if(callFrom == "PRBToC")
		$('#PRBToCPagination').html(numberOfRows);

	pagination(displayPagination, numberOfPages, callFrom);
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Get count of PARTIAL, COLLECTION, OPEN Phlebotomy Patient records.
************************************************************/
function getCountOfRecords(){
    jQuery.ajax({
    	async : true,
    	type : "GET",
    	url : "ehat/pathologysearch/getRecordCount",
    	timeout : 1000 * 60 * 5,
    	catche : false,
    	error : function() {
    		alert('Network Issue!');
    	},
    	success : function(r) {    		
    		var a=r.split(",");
    		$('#open').text(a[0]);
    		$('#collection').text(a[1]);
    		$('#partial').text(a[2]);
    	}
    });
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment To fetch & show track status report.
************************************************************/
function openTrackStatusPopup(masterId){
	getStatus(masterId);
}

function getStatus(masterId){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/pathologysearch/getstatus/"+masterId,
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$("#trackStatusPopup").modal('show');

			if(r.labSampleWiseMasterDtoList.length>=0){
				var divContent = "";
				for(var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
					var inOutHouse = r.labSampleWiseMasterDtoList[i].inOutHouse;
					var testStatus = r.labSampleWiseMasterDtoList[i].teststatus;
					
					var createdDateTime= new Date(r.labSampleWiseMasterDtoList[i].createDate).toLocaleString();
					var acceptedDateTime= new Date(r.labSampleWiseMasterDtoList[i].acceptedDateTime).toLocaleString();
					var collectedDateTime= new Date(r.labSampleWiseMasterDtoList[i].collecteddatetime).toLocaleString();
					var rejectedDateTime= new Date(r.labSampleWiseMasterDtoList[i].rejecteddatetime).toLocaleString();
					var unauthorizedDateTime= new Date(r.labSampleWiseMasterDtoList[i].unauthorizeddatetime).toLocaleString();
					var authorizedDateTime= new Date(r.labSampleWiseMasterDtoList[i].authorizeddatetime).toLocaleString();
					var postDateTime= new Date(r.labSampleWiseMasterDtoList[i].postdatetime).toLocaleString();

					divContent = divContent+ '<tr style="height:2px;" >'							
			        	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].createdByName +"</td>"
			        	+ "<td class='col-md-1 center'>"+createdDateTime +"</td>";
			        
					if(testStatus == 1 && inOutHouse == 0){
						divContent = divContent							
							+ "<td class='col-md-1 center'>Collection Pending</td>"
							+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].collectedByName +"</td>"
							+ "<td class='col-md-1 center'>-</td>"
							+ "<td class='col-md-1 center'>-</td>"
							+ "<td class='col-md-1 center'>-</td>";
					}else if(testStatus == 2 && inOutHouse == 0){
						divContent = divContent							
							+ "<td class='col-md-1 center'>Accession Pending</td>"
					        + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].collectedByName +"</td>"
					        + "<td class='col-md-1 center'>"+collectedDateTime +"</td>"
					        + "<td class='col-md-1 center'>-</td>"
					        + "<td class='col-md-1 center'>-</td>";
					}else if(testStatus == 3 && inOutHouse == 0){
						divContent = divContent
						+ "<td class='col-md-1 center'>Accession Done</td>"
					    + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].acceptedByName +"</td>"
					    + "<td class='col-md-1 center'>"+acceptedDateTime +"</td>"
					    + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].collectedByName +"</td>"
					    + "<td class='col-md-1 center'>"+collectedDateTime +"</td>"
					    + "<td class='col-md-1 center'>-</td>"
					    + "<td class='col-md-1 center'>-</td>";
					}else if(testStatus == 4 && inOutHouse == 0){
						divContent = divContent
							+ "<td class='col-md-1 center'>Sample Rejected</td>"
					        + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].rejectedByName +"</td>"
					        + "<td class='col-md-1 center'>"+rejectedDateTime +"</td>"
					        + "<td class='col-md-1 center'>-</td>"
					        + "<td class='col-md-1 center'>-</td>";
					}else if(testStatus <= 6 && inOutHouse == 0){
						divContent = divContent
							+ "<td class='col-md-1 center'>Accession Done</td>"
					        + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].collectedByName +"</td>"
					        + "<td class='col-md-1 center'>"+collectedDateTime +"</td>"
					        + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].collectedByName +"</td>"
					        + "<td class='col-md-1 center'>"+collectedDateTime +"</td>";
					}else {
						divContent = divContent
						+ "<td class='col-md-1 center'>-</td>"
				        + "<td class='col-md-1 center'>-</td>"
				        + "<td class='col-md-1 center'>-</td>"
				        + "<td class='col-md-1 center'>-</td>"
				        + "<td class='col-md-1 center'>-</td>";
					}
						
					if(testStatus == 5 || testStatus == 6){
						divContent = divContent
					        + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].authorizedByName +"</td>"
					        + "<td class='col-md-1 center'>"+authorizedDateTime +"</td>";
					}else{
						divContent = divContent
					       + "<td class='col-md-1 center'>-</td>"
					       + "<td class='col-md-1 center'>-</td>";
					}
						
					if(testStatus == 6){
						divContent = divContent
					    	+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].postByName +"</td>"
					        + "<td class='col-md-1 center'>"+postDateTime +"</td>";
					}else{
						divContent = divContent
					       + "<td class='col-md-1 center'>-</td>"
					       + "<td class='col-md-1 center'>-</td>";
					}
					
					if(inOutHouse == 1){
						divContent = divContent
							+ "<td class='col-md-1 center'>OutSource</td>"
							+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].collectedByName+"</td>"
							+ "<td class='col-md-1 center'>"+collectedDateTime+"</td>";
					}else if(testStatus == 8){
						divContent = divContent
							+ "<td class='col-md-1 center'>OutSourced</td>"
							+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].collectedByName+"</td>"
							+ "<td class='col-md-1 center'>"+collectedDateTime+"</td>";
					}else{
						divContent = divContent
			        		+ "<td class='col-md-1 center'>-</td>"
			        		+ "<td class='col-md-1 center'>-</td>"
			        		+ "<td class='col-md-1 center'>-</td>";
					}
					divContent = divContent+ "</tr>";
				}
				$('#trackStatusTableBody').html(divContent);
			}
		}
	});
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment To hide track status report.
************************************************************/
function hidePopupTrackStatus(){
	$("#trackStatusPopup").modal('hide');
}


/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment To fetch Customer Names.
************************************************************/
function fetchCustomerNames(callFrom) {
	var type = $("#custTypeForSearch").val();

	if(type == "0"){
		var custListTemp = "";
		custListTemp = custListTemp
		+ "<option value='0'>--Select Customer--</option>";
		
		$("#custNameForSearch").html(custListTemp);
	}else if (type == "1") {
		getAllBusinessMaster("admin", "0");
	} else if (type == "2") {
		getAllBusinessLabMaster("admin", "0");
	} else if (type == "3") {
		getAdminHospital("admin", "0");
	} else if (type == "4") {
		getAllClinicMaster("admin", "0");
	} else if (type == "5") {
		getAllCollection("admin", "0");
	}
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment To Get All Business Master.
************************************************************/
function getAllBusinessMaster(userType, customerId) {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/businessCustMaster/getAllBusinessMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			if(userType == "admin"){
				var custListTemp = "";
				custListTemp = custListTemp
						+ "<option value='0'>--Select inhouseLab--</option>";
				for ( var i = 0; i < response.businessMasterDto.length; i++) {
					custListTemp = custListTemp + "<option value="
							+ response.businessMasterDto[i].id + " data-name='"
							+ response.businessMasterDto[i].name + "'>"
							+ response.businessMasterDto[i].name + "</option>";
				}
				$("#custNameForSearch").html(custListTemp);
			}else{
				var custListTemp = "";
				for ( var i = 0; i < response.businessMasterDto.length; i++) {
					if(response.businessMasterDto[i].id == customerId){
						custListTemp = custListTemp + "<option value="
							+ response.businessMasterDto[i].id + " data-name='"
							+ response.businessMasterDto[i].name + "'>"
							+ response.businessMasterDto[i].name + "</option>";
						
						break;
					}
				}
				$("#custNameForSearch").html(custListTemp);
				$("#custNameForSearch").prop("disabled", true);
			}
		}
	});
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment To Get All Business Lab Master.
************************************************************/
function getAllBusinessLabMaster(userType, customerId) {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/businessCustMaster/getAllBusinessLabMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			if(userType == "admin"){
				var custListTemp = "";
				custListTemp = custListTemp
						+ "<option value='0'>--Select Lab--</option>";
				for ( var i = 0; i < response.businessMasterDto.length; i++) {
					custListTemp = custListTemp + "<option value="
							+ response.businessMasterDto[i].id + " data-name='"
							+ response.businessMasterDto[i].name + "'>"
							+ response.businessMasterDto[i].name + "</option>";
				}
				$("#custNameForSearch").html(custListTemp);
			}else{
				var custListTemp = "";
				for ( var i = 0; i < response.businessMasterDto.length; i++) {
					if(response.businessMasterDto[i].id == customerId){
						custListTemp = custListTemp + "<option value="
							+ response.businessMasterDto[i].id + " data-name='"
							+ response.businessMasterDto[i].name + "'>"
							+ response.businessMasterDto[i].name + "</option>";
						
						break;
					}
				}
				$("#custNameForSearch").html(custListTemp);
				$("#custNameForSearch").prop("disabled", true);
			}
		}
	});
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment To Get Admin Hospital.
************************************************************/
function getAdminHospital(userType, customerId) {
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/registration/getAdminHospital",
		data : "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(userType == "admin"){
				var custListTemp = "";
				custListTemp = custListTemp
						+ "<option value='0'>--Select Hospital--</option>";
				for ( var i = 0; i < r.length; i++) {
					custListTemp = custListTemp + "<option value=" + r[i].id
							+ " data-name='" + r[i].hospitalName + "'>"
							+ r[i].hospitalName + "(" + r[i].hospitalCode + ")"
							+ "</option>";
				}
				$("#custNameForSearch").html(custListTemp);
			}else{
				var custListTemp = "";
				for ( var i = 0; i < r.length; i++) {
					if(r[i].id == customerId){
						custListTemp = custListTemp + "<option value=" + r[i].id
							+ " data-name='" + r[i].hospitalName + "'>"
							+ r[i].hospitalName + "(" + r[i].hospitalCode + ")"
							+ "</option>";
						
						break;
					}
				}
				$("#custNameForSearch").html(custListTemp);
				$("#custNameForSearch").prop("disabled", true);
			}
		}
	});
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment To Get All Clinic Master.
************************************************************/
function getAllClinicMaster(userType, customerId) {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/clinicmaster/getAllClinicMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			if(userType == "admin"){
				var custListTemp = "";
				custListTemp = custListTemp
						+ "<option value='0'>--Select Clinic--</option>";
				for ( var i = 0; i < response.length; i++) {
					custListTemp = custListTemp + "<option value="
							+ response[i].clinicUnitId + " data-name='"
							+ response[i].clinicName + "'>"
							+ response[i].clinicName + "</option>";
				}
				$("#custNameForSearch").html(custListTemp);
			}else{
				var custListTemp = "";
				for ( var i = 0; i < response.length; i++) {
					if(response[i].clinicUnitId == customerId){
						custListTemp = custListTemp + "<option value="
							+ response[i].clinicUnitId + " data-name='"
							+ response[i].clinicName + "'>"
							+ response[i].clinicName + "</option>";
						
						break;
					}
				}
				$("#custNameForSearch").html(custListTemp);
				$("#custNameForSearch").prop("disabled", true);
			}
		}
	});
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment To Get All Collection.
************************************************************/
function getAllCollection(userType, customerId) {
	var inputs = [];
	type = "";
	inputs.push('callfrom=' + type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/admincollection/getCollectionMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			if(userType == "admin"){
				var custListTemp = "";
				custListTemp = custListTemp
						+ "<option value='0'>--Select Collection--</option>";
				for ( var i = 0; i < response.length; i++) {
					custListTemp = custListTemp + "<option value=" + response[i].id
							+ " data-name='" + response[i].collectionName + "'>"
							+ response[i].collectionName + "</option>";
				}
				$("#custNameForSearch").html(custListTemp);
			}else{
				var custListTemp = "";
				for ( var i = 0; i < response.length; i++) {
					if(response[i].id == customerId){
						custListTemp = custListTemp + "<option value=" + response[i].id
							+ " data-name='" + response[i].collectionName + "'>"
							+ response[i].collectionName + "</option>";
						
						break;
					}
				}
				$("#custNameForSearch").html(custListTemp);
				$("#custNameForSearch").prop("disabled", true);
			}
		}
	});
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Get count of PARTIAL, COLLECTION, OPEN Phlebotomy Patient records.
************************************************************/
function getRecollectionRecordsCount(callFrom){
	var inputs = [];
	inputs.push('callform=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/getRecollectionRecordCount",
		timeout : 1000 * 60 * 5,
		catche : false,
    	error : function() {
    		alert('Network Issue!');
    	},
    	success : function(r) {   		
    		var a = r.split(",");
    		if(callFrom == "BTOBRecollection"){
    			$('#subChrgCount').text(a[0]);
        		$('#deptCount').text(a[1]);
        		$('#servCount').text(a[2]);
    		}else if(callFrom == "BTOCRecollection"){
    			$('#subChrgCount').text(a[0]);
        		$('#deptCount').text(a[1]);
        		$('#servCount').text(a[2]);
    		}
    	}
    });
}

function searchBtoCRecollectionPatient(callFrom){
	var emergencyFlag = $("#emergencyFlag").val();
	var tabId =  jQuery('#tabId').find('li.active').attr('id');
	var txtFdate = $.trim($("#txtFdate").val());
	var txtTdate = $.trim($("#txtTdate").val());
	var searchBy = "";
	var startIndex = 0;
	var custTypeId =  "0";
	var custNameId =  "0";
	
	if(callFrom == "BTOBRecollection"){
		custTypeId =  $.trim($("#custTypeForSearch").val());
		custNameId =  $.trim($("#custNameForSearch").val());
		
		if(custTypeId == "0" && custNameId == "0" && txtFdate == "" && txtTdate == "") {
			alert("Please enter something to search");
			return false;
		}
		
		if(custTypeId == 0){
			if ((txtFdate != "" && (txtTdate == "")) || (txtTdate != "" && (txtFdate == ""))) {
				$("#custTypeForSearch").val(0);
				$("#txtTdate").val(" ");
				$("#txtFdate").val(" ");
				alert("Please select both date to search");
				return false;
			}else{
				searchBy = "byDate";
			}
		}else if(custTypeId != 0 && custNameId == 0){
			
			if(txtFdate == "" && txtTdate == ""){
				searchBy = "byType";
			}else if (txtFdate != "" && txtTdate == "") {
				$("#custTypeForSearch").val(0);
				$("#custNameForSearch").val(0);
				$("#txtTdate").val("");
				$("#txtFdate").val("");
				alert("Please select both date to search");
				return false;
			}else if(txtFdate == "" && txtTdate != ""){
				$("#custTypeForSearch").val(0);
				$("#custNameForSearch").val(0);
				$("#txtTdate").val("");
				$("#txtFdate").val("");
				alert("Please select both date to search");
				return false;
			}else if((txtFdate != "" && txtTdate != "" && custTypeId != 0)) {
				searchBy = "byTypeDate";
			}
		}else if(custTypeId != 0 && custNameId != 0){
			if(txtFdate == "" && txtTdate == ""){
				searchBy = "byTypeName";
			}else if (txtFdate != "" && txtTdate == "") {
				$("#custTypeForSearch").val(0);
				$("#custNameForSearch").val(0);
				$("#txtTdate").val("");
				$("#txtFdate").val("");
				alert("Please select both date to search");
				return false;
			}else if(txtFdate == "" && txtTdate != ""){
				$("#custTypeForSearch").val(0);
				$("#custNameForSearch").val(0);
				$("#txtTdate").val("");
				$("#txtFdate").val("");
				alert("Please select both date to search");
				return false;
			}else if((txtFdate != "" && txtTdate != "" && custTypeId != 0 && custNameId != 0)) {
				searchBy = "byAll";
			}
		}
	}else{
		if(txtFdate == "" && txtTdate == "") {
			alert("Please choose both dates to search");
			return false;
		}else if((txtFdate != "" && (txtTdate == "")) || (txtTdate != "" && (txtFdate == ""))) {
			$("#txtTdate").val(" ");
			$("#txtFdate").val(" ");
			alert("Please select both date to search");
			return false;
		}else{
			searchBy = "byDate";
		}
	}
	
/*	alert("callFrom : "+callFrom);
	alert("tabId : "+tabId);
*/	
	$("#custTypeId").val(custTypeId);
	$("#custNameId").val(custNameId);
	$("#fromDate").val(txtFdate);
	$("#toDate").val(txtTdate);
	$("#searchBy").val(searchBy);
	
	var inputs = [];
	inputs.push('custTypeId=' + custTypeId);
	inputs.push('custNameId=' + custNameId);
	inputs.push('fromDate=' + txtFdate);
	inputs.push('toDate=' + txtTdate);
	inputs.push('callFrom=' + callFrom);
	inputs.push('searchBy=' + searchBy);
	inputs.push('tabId=' + tabId);
	inputs.push('startIndex=' +startIndex);
	inputs.push('emergencyFlag=' +emergencyFlag);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/searchlabtestpatient",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setPatientTemp(r, callFrom, tabId);
			setPaginationTemplate(r, callFrom, tabId);
			getDynamicTabCount(custTypeId, custNameId, txtFdate, txtTdate, callFrom, searchBy, emergencyFlag);
		}
	});
}

function setCustName(userType, customerType, customerId){
	if(userType != "admin"){
		$("#custTypeForSearch").val(customerType);
		$("#custTypeForSearch").prop("disabled", true);
		
		if(customerType == "0"){
			var custListTemp = "";
			custListTemp = custListTemp
			+ "<option value='0'>--Select Customer--</option>";
			
			$("#custNameForSearch").html(custListTemp);
			$("#custNameForSearch").prop("disabled", true);
		}else if (customerType == "1") {
			getAllBusinessMaster(userType, customerId);
		} else if (customerType == "2") {
			getAllBusinessLabMaster(userType, customerId);
		} else if (customerType == "3") {
			getAdminHospital(userType, customerId);
		} else if (customerType == "4") {
			getAllClinicMaster(userType, customerId);
		} else if (customerType == "5") {
			getAllCollection(userType, customerId);
		}
	}
}

function jumpToPage(numberOfPages, callFrom, type, callType){
	var pageNo = 0;

	if(callFrom == "phleboOpen")
		pageNo = $("#phleboOpenPageNumber").val();
	else if(callFrom == "phleboCollected")
		pageNo = $("#phleboCollectedPageNumber").val();
	else if(callFrom == "accession")
		pageNo = $("#accessionPageNumber").val();
	else if(callFrom == "accessionPending")
		pageNo = $("#accessionPendingPageNumber").val();
	else if(callFrom == "collectionPending")
		pageNo = $("#collectionPendingPageNumber").val();
	else if(callFrom == "accessionDone")
		pageNo = $("#accessionDonePageNumber").val();
	else if(callFrom == "rejectedSample")
		pageNo = $("#rejectedSamplePageNumber").val();
	else if(callFrom == "accessionTrackStatus")
		pageNo = $("#pageNumber").val();
	else if(callFrom == "processing")
		pageNo = $("#processingPageNumber").val();
	else if(callFrom == "authorization")
		pageNo = $("#authorizationPageNumber").val();
	else if(callFrom == "reporting")
		pageNo = $("#reportingPageNumber").val();
	else if(callFrom == "outsource")
		pageNo = $("#outsourcePageNumber").val();
	else if(callFrom == "accessionpathologist")
		pageNo = $("#accessionpathologistPageNumber").val();
	else if(callFrom == "allBToB")
		pageNo = $("#allBToBPageNumber").val();
	else if(callFrom == "ARBToB")
		pageNo = $("#ARBToBPageNumber").val();
	else if(callFrom == "PRBToB")
		pageNo = $("#PRBToBPageNumber").val();
	else if(callFrom == "allBToC")
		pageNo = $("#allBToCPageNumber").val();
	else if(callFrom == "ARBToC")
		pageNo = $("#ARBToCPageNumber").val();
	else if(callFrom == "PRBToC")
		pageNo = $("#PRBToCPageNumber").val();
	
	if(pageNo <= numberOfPages){
		if(type == "onload")
			pagination(pageNo, numberOfPages, callFrom);
		else if(type == "search")
			paginationOnSearch(pageNo, numberOfPages, callFrom, callType);
	}else{
		alert("Invalid page number.");
	}
	$("#pageNumber").val("");
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination.
************************************************************/
function paginationOnSearch(pageNumber, numberOfPages, callFrom, callType){
	var callFromTemp = "";
	var tabId = "";
	if(callFrom == "phleboOpen"){
		callFromTemp = "phelbotomyAutoSugg";
		tabId = "open";
	}else if(callFrom == "appointment"){
		callFromTemp = "appointmentAutoSugg";
		tabId = "";
	}else if(callFrom == "phleboCollected"){
		callFromTemp = "phelbotomyAutoSugg";
		tabId = "collected";
	}else if(callFrom == "accession"){
		callFromTemp = "accessionTestAutoSugg";
		tabId = "AL";
	}else if(callFrom == "accessionPending"){
		callFromTemp = "accessionTestAutoSugg";
		tabId = "accessionPending";
	}else if(callFrom == "collectionPending"){
		callFromTemp = "accessionTestAutoSugg";
		tabId = "collectionPending";
	}else if(callFrom == "accessionDone"){
		callFromTemp = "accessionTestAutoSugg";
		tabId = "accessionDone";
	}else if(callFrom == "rejectedSample"){
		callFromTemp = "accessionTestAutoSugg";
		tabId = "rejectedSample";
	}else if(callFrom == "accessionTrackStatus"){
		callFromTemp = "accessionTrackStatusAutoSugg";
	}else if(callFrom == "processing"){
		callFromTemp = "processingAutoSugg";
		tabId = "AL";
	}else if(callFrom == "authorization"){
		callFromTemp = "authorizationAutoSugg";
	}else if(callFrom == "reporting"){
		callFromTemp = "reportingAutoSugg";
	}else if(callFrom == "outsource"){
		callFromTemp = "outSourceAutoSugg";
	}else if(callFrom == "accessionpathologist"){
		callFromTemp = "processingAutoSugg";
		tabId = "accessionpatho";
	}else if(callFrom == "allBToB"){
		callFromTemp = "BTOBRecollection";
		tabId = "ALBToB";
	}else if(callFrom == "ARBToB"){
		callFromTemp = "BTOBRecollection";
		tabId = "rejectedSampleBToB";
	}else if(callFrom == "PRBToB"){
		callFromTemp = "BTOBRecollection";
		tabId = "pathoRecollectionBToB";
	}else if(callFrom == "allBToC"){
		callFromTemp = "BTOCRecollection";
		tabId = "ALBToC";
	}else if(callFrom == "ARBToC"){
		callFromTemp = "BTOCRecollection";
		tabId = "rejectedSampleBToC";
	}else if(callFrom == "PRBToC"){
		callFromTemp = "BTOCRecollection";
		tabId = "pathoRecollectionBToC";
	}
	
	var custTypeId = $('#custTypeId').val();
	var custNameId = $('#custNameId').val();
	var txtFdate = $('#fromDate').val();
	var txtTdate = $('#toDate').val();
	var searchBy = $('#searchBy').val();
	var emergencyFlag = $("#emergencyFlag").val();
	
	var inputs = [];
	var startIndex = (pageNumber - 1) + "0";
	inputs.push('custTypeId=' + custTypeId);
	inputs.push('custNameId=' + custNameId);
	inputs.push('fromDate=' + txtFdate);
	inputs.push('toDate=' + txtTdate);
	inputs.push('callFrom=' + callType);
	inputs.push('searchBy=' + searchBy);
	inputs.push('tabId=' + tabId);
	inputs.push('startIndex=' +startIndex);
	inputs.push('emergencyFlag=' +emergencyFlag);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/paginationonsearch",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        setPatientTemp(r, callFromTemp, tabId, pageNumber);

	        if(callFrom == "phleboOpen")
	        	$('#phleboOpenNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	        else if(callFrom == "phleboCollected")
	        	$('#phleboCollectedNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "accession")
	    		$('#accessionNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "accessionPending")
	    		$('#accessionPendingNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "collectionPending")
	    		$('#collectionPendingNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "accessionDone")
	    		$('#accessionDoneNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "rejectedSample")
	    		$('#rejectedSampleNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "accessionTrackStatus")
	    		$('#accessionTrackStatusNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "processing")
	    		$('#processingNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "authorization")
	    		$('#authorizationNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "reporting")
	    		$('#reportingNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "outsource")
	    		$('#outSourceNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "accessionpathologist")
	    		$('#accessionPathologistNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "allBToB")
	    		$('#allBToBNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "ARBToB")
	    		$('#ARBToBNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "PRBToB")
	    		$('#PRBToBNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "allBToC")
	    		$('#allBToCNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "ARBToC")
	    		$('#ARBToCNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "PRBToC")
	    		$('#PRBToCNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
 		},
	});	
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination Next Button.
************************************************************/
function nextPaginationOnSearch(currentIndex, numberOfPages, callFrom, callType){
	var displayPagination = currentIndex + 5;
	var numberOfRows = '';
	numberOfRows  = numberOfRows + '<li class="previous" onclick="previousPaginationOnSearch('+currentIndex+','+Math.round(numberOfPages)+',\''+callFrom+'\',\''+callType+'\');"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	if(numberOfPages < displayPagination){
		displayPagination = numberOfPages + 1;
	}
	for(var j = currentIndex; j < displayPagination; j++){
		numberOfRows +='<li onclick="paginationOnSearch('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\', \''+callType+'\')"><a>'+j+'</a></li>';
	}
	if(numberOfPages >= displayPagination){
		numberOfRows +='<li class="next" onclick="nextPaginationOnSearch('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\', \''+callType+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	}
	
    if(callFrom == "phleboOpen")
    	$('#phleboOpenPagination').html(numberOfRows);
    else if(callFrom == "phleboCollected")
    	$('#phleboCollectedPagination').html(numberOfRows);
	else if(callFrom == "accession")
		$('#accessionPagination').html(numberOfRows);
	else if(callFrom == "accessionPending")
		$('#accessionPendingPagination').html(numberOfRows);
	else if(callFrom == "collectionPending")
		$('#collectionPendingPagination').html(numberOfRows);
	else if(callFrom == "accessionDone")
		$('#accessionDonePagination').html(numberOfRows);
	else if(callFrom == "rejectedSample")
		$('#rejectedSamplePagination').html(numberOfRows);
	else if(callFrom == "accessionTrackStatus")
		$('#accessionTrackStatusPagination').html(numberOfRows);
	else if(callFrom == "processing")
		$('#processingPagination').html(numberOfRows);
	else if(callFrom == "authorization")
		$('#authorizationPagination').html(numberOfRows);
	else if(callFrom == "reporting")
		$('#reportingPagination').html(numberOfRows);
	else if(callFrom == "outsource")
		$('#outSourcePagination').html(numberOfRows);
	else if(callFrom == "allBToB")
		$('#allBToBPagination').html(numberOfRows);
	else if(callFrom == "ARBToB")
		$('#ARBToBPagination').html(numberOfRows);
	else if(callFrom == "PRBToB")
		$('#PRBToBPagination').html(numberOfRows);
	else if(callFrom == "allBToC")
		$('#allBToCPagination').html(numberOfRows);
	else if(callFrom == "ARBToC")
		$('#ARBToCPagination').html(numberOfRows);
	else if(callFrom == "PRBToC")
		$('#PRBToCPagination').html(numberOfRows);
	
	paginationOnSearch(currentIndex, numberOfPages, callFrom, callType);
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination Previous Button.
************************************************************/
function previousPaginationOnSearch(currentIndex, numberOfPages, callFrom, callType){
	var displayPagination = currentIndex - 5;
	var numberOfRows = '';
	if(currentIndex > 6){
		numberOfRows +='<li class="previous" onclick="previousPaginationOnSearch('+displayPagination+','+Math.round(numberOfPages)+',\''+callFrom+'\',\''+callType+'\')"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	}
	for(var j = displayPagination; j < currentIndex; j++){
		numberOfRows +='<li onclick="paginationOnSearch('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\',\''+callType+'\')"><a>'+j+'</a></li>';
	}
	numberOfRows +='<li class="next" onclick="nextPaginationOnSearch('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\',\''+callType+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	
	if(callFrom == "phleboOpen")
    	$('#phleboOpenPagination').html(numberOfRows);
    else if(callFrom == "phleboCollected")
    	$('#phleboCollectedPagination').html(numberOfRows);
	else if(callFrom == "accession")
		$('#accessionPagination').html(numberOfRows);
	else if(callFrom == "accessionPending")
		$('#accessionPendingPagination').html(numberOfRows);
	else if(callFrom == "collectionPending")
		$('#collectionPendingPagination').html(numberOfRows);
	else if(callFrom == "accessionDone")
		$('#accessionDonePagination').html(numberOfRows);
	else if(callFrom == "rejectedSample")
		$('#rejectedSamplePagination').html(numberOfRows);
	else if(callFrom == "accessionTrackStatus")
		$('#accessionTrackStatusPagination').html(numberOfRows);
	else if(callFrom == "processing")
		$('#processingPagination').html(numberOfRows);
	else if(callFrom == "authorization")
		$('#authorizationPagination').html(numberOfRows);
	else if(callFrom == "reporting")
		$('#reportingPagination').html(numberOfRows);
	else if(callFrom == "outsource")
		$('#outSourcePagination').html(numberOfRows);
	else if(callFrom == "allBToB")
		$('#allBToBPagination').html(numberOfRows);
	else if(callFrom == "ARBToB")
		$('#ARBToBPagination').html(numberOfRows);
	else if(callFrom == "PRBToB")
		$('#PRBToBPagination').html(numberOfRows);
	else if(callFrom == "allBToC")
		$('#allBToCPagination').html(numberOfRows);
	else if(callFrom == "ARBToC")
		$('#ARBToCPagination').html(numberOfRows);
	else if(callFrom == "PRBToC")
		$('#PRBToCPagination').html(numberOfRows);

	paginationOnSearch(displayPagination, numberOfPages, callFrom, callType);
}

function setPaginationTemplate(r, callFrom, tabId){
	if(callFrom == "phelbotomySearchBtn" && tabId == "open"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"phleboOpen\", \""+callFrom+"\")'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"phleboOpen\", \""+callFrom+"\")'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+","+Math.ceil(numberOfPages)+", \"phleboOpen\", \""+callFrom+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#phleboOpenNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#phleboOpenNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#phleboOpenJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='phleboOpenPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"phleboOpen\", \"search\", \"phelbotomySearchBtn\");'>Go</button></a></li>");
		}
		$('#phleboOpenPagination').html(numberOfRows);
	}else if(callFrom == "phelbotomySearchBtn" && tabId == "collected"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"phleboCollected\", \""+callFrom+"\")'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"phleboCollected\", \""+callFrom+"\")'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+","+Math.ceil(numberOfPages)+", \"phleboCollected\", \""+callFrom+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#phleboCollectedNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#phleboCollectedNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#phleboCollectedJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='phleboCollectedPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"phleboCollected\", \"search\", \"phelbotomySearchBtn\");'>Go</button></a></li>");
		}
		$('#phleboCollectedPagination').html(numberOfRows);
	}else if(callFrom == "appointmentSearchBtn"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination = 5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"appointment\", \""+callFrom+"\")'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"appointment\", \""+callFrom+"\")'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+","+Math.ceil(numberOfPages)+", \"appointment\", \""+callFrom+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#appointmentNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#appointmentNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#appointmentJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='appointmentPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"appointment\", \"search\", \"appointmentSearchBtn\");'>Go</button></a></li>");
		}
		$('#appointmentPagination').html(numberOfRows);
	}else if(callFrom == "accessionTestSearchBtn" && tabId == "AL"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='page-item disabled'><a data-toggle='tab'><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li class='page-item active' id="+index+" onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"accession\", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}else{
				numberOfRows +="<li class='page-item' id="+index+" onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"accession\", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='page-item' onclick='nextPaginationOnSearch("+index+","+Math.ceil(numberOfPages)+", \"accession\", \""+callFrom+"\");'><a data-toggle='tab'><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#accessionNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#accessionNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='accessionPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"accession\", \"search\", \"accessionTestSearchBtn\");'>Go</button></a></li>");
		}
		$('#accessionPagination').html(numberOfRows);
	}else if(tabId == "accessionPending"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
		if(j == 0){
			numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"accessionPending\", \""+callFrom+"\");'><a>"+index+"</a></li>";
		}else{
			numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"accessionPending\", \""+callFrom+"\");'><a>"+index+"</a></li>";
		}
		index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+","+Math.ceil(numberOfPages)+",\"accessionPending\", \""+callFrom+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#accessionPendingNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#accessionPendingNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='accessionPendingPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"accessionPending\", \"search\", \"accessionTestSearchBtn\");'>Go</button></a></li>");
		}
			$('#accessionPendingPagination').html(numberOfRows);
	}else if(tabId == "collectionPending"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnSearch("+index+","+Math.ceil(numberOfPages)+", \"collectionPending\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnSearch("+index+","+Math.ceil(numberOfPages)+", \"collectionPending\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"collectionPending\", \""+callFrom+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#collectionPendingNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#collectionPendingNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='collectionPendingPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"collectionPending\", \"search\", \"accessionTestSearchBtn\");'>Go</button></a></li>");
		}
		$('#collectionPendingPagination').html(numberOfRows);
	}else if(tabId == "accessionDone"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"accessionDone\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"accessionDone\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"accessionDone\", \""+callFrom+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#accessionDoneNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#accessionDoneNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='accessionDonePageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"accessionDone\", \"search\", \"accessionTestSearchBtn\");'>Go</button></a></li>");
		}
		$('#accessionDonePagination').html(numberOfRows);
	}else if(tabId == "rejectedSample"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"rejectedSample\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"rejectedSample\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+","+Math.ceil(numberOfPages)+", \"rejectedSample\", \""+callFrom+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#rejectedSampleNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#rejectedSampleNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='rejectedSamplePageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"rejectedSample\", \"search\", \"accessionTestSearchBtn\");'>Go</button></a></li>");
		}
		$('#rejectedSamplePagination').html(numberOfRows);
	}else if(callFrom == "accessionTrackStatusSearchBtn"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination = 5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"accessionTrackStatus\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"accessionTrackStatus\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"accessionTrackStatus\", \""+callFrom+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		$('#accessionTrackStatusNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
		$('#accessionTrackStatusPagination').html(numberOfRows);
	}else if(callFrom == "processingSearchBtn" && tabId == "AL"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination = 5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"processing\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"processing\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+","+Math.ceil(numberOfPages)+", \"processing\", \""+callFrom+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#processingNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#processingNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='processingPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"processing\", \"search\", \"processingSearchBtn\");'>Go</button></a></li>");
		}
		$('#processingPagination').html(numberOfRows);
	}else if(callFrom == "authorizationSearchBtn"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination = 5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"authorization\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"authorization\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"authorization\", \""+callFrom+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#authorizationNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#authorizationNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='authorizationPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"authorization\", \"search\", \"authorizationSearchBtn\");'>Go</button></a></li>");
		}
		$('#authorizationPagination').html(numberOfRows);
	}else if(callFrom == "reportingSearchBtn"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination = 5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"reporting\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"reporting\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"reporting\", \""+callFrom+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#reportingNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#reportingNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='reportingPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"reporting\", \"search\", \"reportingSearchBtn\");'>Go</button></a></li>");
		}
		$('#reportingPagination').html(numberOfRows);
	}else if(callFrom == "outSourceSearchBtn"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination = 5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"outsource\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"outsource\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"outsource\", \""+callFrom+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#outSourceNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#outSourceNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='outsourcePageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"outsource\", \"search\", \"outSourceSearchBtn\");'>Go</button></a></li>");
		}
		$('#outSourcePagination').html(numberOfRows);
	}else if(tabId == "accessionpatho"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination = 5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"accessionpathologist\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"accessionpathologist\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"accessionpathologist\", \""+callFrom+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#accessionPathologistNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#accessionPathologistNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='accessionpathologistPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"accessionpathologist\", \"search\", \"processingSearchBtn\");'>Go</button></a></li>");
		}
		$('#accessionPathologistPagination').html(numberOfRows);
	}else if(tabId == "ALBToB"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"allBToB\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"allBToB\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"allBToB\", \""+callFrom+"\");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#allBToBNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#allBToBNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='allBToBPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"allBToB\", \"search\", \"BTOBRecollection\");'>Go</button></a></li>");
		}
		$('#allBToBPagination').html(numberOfRows);
	}else if(tabId == "rejectedSampleBToB"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"ARBToB\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"ARBToB\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"ARBToB\", \""+callFrom+"\");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#ARBToBNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#ARBToBNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='ARBToBPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"ARBToB\", \"search\", \"BTOBRecollection\");'>Go</button></a></li>");
		}
		$('#ARBToBPagination').html(numberOfRows);
	}else if(tabId == "pathoRecollectionBToB"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"PRBToB\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"PRBToB\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"PRBToB\", \""+callFrom+"\");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#PRBToBNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#PRBToBNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='PRBToBPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"PRBToB\", \"search\", \"BTOBRecollection\");'>Go</button></a></li>");
		}
		$('#PRBToBPagination').html(numberOfRows);
	}else if(tabId == "ALBToC"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"allBToC\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"allBToC\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"allBToC\", \""+callFrom+"\");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#allBToCNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#allBToCNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='allBToCPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"allBToC\", \"search\", \"BTOCRecollection\");'>Go</button></a></li>");
		}
		$('#allBToCPagination').html(numberOfRows);
	}else if(tabId == "rejectedSampleBToC"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"ARBToC\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"ARBToC\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"ARBToC\", \""+callFrom+"\");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#ARBToCNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#ARBToCNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='ARBToCPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"ARBToC\", \"search\", \"BTOCRecollection\");'>Go</button></a></li>");
		}
		$('#ARBToCPagination').html(numberOfRows);
	}else if(tabId == "pathoRecollectionBToC"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"PRBToC\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"PRBToC\", \""+callFrom+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \"PRBToC\", \""+callFrom+"\");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#PRBToCNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#PRBToCNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='PRBToCPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPage("+Math.ceil(numberOfPages)+", \"PRBToC\", \"search\", \"BTOCRecollection\");'>Go</button></a></li>");
		}
		$('#PRBToCPagination').html(numberOfRows);
	}else if(tabId == "outsource"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='outSourcePaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \""+tabId+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='outSourcePaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \""+tabId+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextOutSourcePaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \""+tabId+"\");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#outSourceNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#outSourceNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='outsourcePageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='outSourceJumpToPage("+Math.ceil(numberOfPages)+", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#outSourcePagination').html(numberOfRows);
	}else if(tabId == "forcedOutSource"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='outSourcePaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \""+tabId+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='outSourcePaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \""+tabId+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextOutSourcePaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \""+tabId+"\");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#outSourceForcedNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#outSourceForcedNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#outsourceforcedJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='forcedOutsourcePageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='outSourceJumpToPage("+Math.ceil(numberOfPages)+", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#outSourceForcedPagination').html(numberOfRows);
	}
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination.
************************************************************/
function outSourcePaginationOnSearch(pageNumber, numberOfPages, callFrom){
	var outSourceType = $('#outSourceType').val();
	var outSourceTypeId = $('#outSourceTypeId').val();
	var txtFdate = $('#fromDate').val();
	var txtTdate = $('#toDate').val();
	var searchBy = $('#searchBy').val();
	var emergencyFlag = $("#emergencyFlag").val();
	
	var inputs = [];
	var startIndex = (pageNumber - 1) + "0";
	inputs.push('outSourceType=' + outSourceType);
	inputs.push('outSourceTypeId=' + outSourceTypeId);
	inputs.push('fromDate=' + txtFdate);
	inputs.push('toDate=' + txtTdate);
	inputs.push('searchBy=' + searchBy);
	inputs.push('tabId=' + callFrom);
	inputs.push('startIndex=' +startIndex);
	inputs.push('emergencyFlag=' +emergencyFlag);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/outsourcepaginationonsearch",
		error : function() {
			alert("error");
		},
		success : function(r) {
			if (callFrom == "outsource") {
				setoutSourcedTemplate(r);
			} else if (callFrom == "forcedOutSource") {
				settemplateForcedOutsource(r);
			}
	        
	        if(callFrom == "outsource")
	        	$('#outSourceNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "forcedOutSource")
	    		$('#outSourceForcedNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
 		},
	});	
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination Next Button.
************************************************************/
function nextOutSourcePaginationOnSearch(currentIndex, numberOfPages, callFrom){
	var displayPagination = currentIndex + 5;
	var numberOfRows = '';
	numberOfRows  = numberOfRows + '<li class="previous" onclick="previousOutSourcePaginationOnSearch('+currentIndex+','+Math.round(numberOfPages)+',\''+callFrom+'\');"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	if(numberOfPages < displayPagination){
		displayPagination = numberOfPages + 1;
	}
	for(var j = currentIndex; j < displayPagination; j++){
		numberOfRows +='<li onclick="outSourcePaginationOnSearch('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\')"><a>'+j+'</a></li>';
	}
	if(numberOfPages >= displayPagination){
		numberOfRows +='<li class="next" onclick="nextOutSourcePaginationOnSearch('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	}
	
	if(callFrom == "outsource")
		$('#outSourcePagination').html(numberOfRows);
	else if(callFrom == "forcedOutSource")
		$('#outSourceForcedPagination').html(numberOfRows);
	
	outSourcePaginationOnSearch(currentIndex, numberOfPages, callFrom);
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination Previous Button.
************************************************************/
function previousOutSourcePaginationOnSearch(currentIndex, numberOfPages, callFrom){
	var displayPagination = currentIndex - 5;
	var numberOfRows = '';
	if(currentIndex > 6){
		numberOfRows +='<li class="previous" onclick="previousOutSourcePaginationOnSearch('+displayPagination+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	}
	for(var j = displayPagination; j < currentIndex; j++){
		numberOfRows +='<li onclick="outSourcePaginationOnSearch('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\')"><a>'+j+'</a></li>';
	}
	numberOfRows +='<li class="next" onclick="nextOutSourcePaginationOnSearch('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	
	if(callFrom == "outsource")
		$('#outSourcePagination').html(numberOfRows);
	else if(callFrom == "forcedOutSource")
		$('#outSourceForcedPagination').html(numberOfRows);

	outSourcePaginationOnSearch(displayPagination, numberOfPages, callFrom);
}

function outSourceJumpToPage(numberOfPages, callFrom){
	var pageNo = 0;

	if(callFrom == "outsource")
		pageNo = $("#outsourcePageNumber").val();
	else if(callFrom == "forcedOutSource")
		pageNo = $("#forcedOutsourcePageNumber").val();
	
	if(pageNo <= numberOfPages){
		outSourcePaginationOnSearch(pageNo, numberOfPages, callFrom);
	}else{
		alert("Invalid page number.");
	}
	
	if(callFrom == "outsource")
		$("#outsourcePageNumber").val(0);
	else if(callFrom == "forcedOutSource")
		$("#forcedOutsourcePageNumber").val(0);
}

function outsourceExportToPdf(){
	var tabId =  $("#tabId li.active").attr('id');
	window.open("Phlebotomy_outsource_records.jsp?"+"&callFrom=" + encodeURIComponent(tabId));
}

/******** @author kranti Godse ************/

$(function() {
    $('#toggle-event0').change(function() {
    	if($(this).prop('checked') == true){
    		toggleSwitch('labAvailableSwitchYes','appointment','Y');
    	}else{
    		toggleSwitch('labAvailableSwitchNo','appointment','All');
    	}
    });
  });

$(function() {
    $('#toggle-event').change(function() {
    	if($(this).prop('checked') == true){
    		toggleSwitch('labAvailableSwitchYes','accession','Y');
    	}else{
    		toggleSwitch('labAvailableSwitchNo','accession','All');
    	}
    });
  });
$(function() {
    $('#toggle-event1').change(function() {
    	if($(this).prop('checked') == true){
    		toggleSwitch('labAvailableSwitchYes','processing','Y');
    	}else{
    		toggleSwitch('labAvailableSwitchNo','processing','All');
    	}
    });
  });
$(function() {
    $('#toggle-event2').change(function() {
    	if($(this).prop('checked') == true){
    		toggleSwitch('labAvailableSwitchYes','authorization','Y');
    	}else{
    		toggleSwitch('labAvailableSwitchNo','authorization','All');
    	}
    });
  });
  $(function() {
    $('#toggle-event4').change(function() {
    	if($(this).prop('checked') == true){
    		toggleSwitch('labAvailableSwitchYes','phlebotomy','Y');
    	}else{
    		toggleSwitch('labAvailableSwitchNo','phlebotomy','All');
    	}
    });
  });
  // For B2C Recollection Emergency Flag.
  $(function() {
	$('#toggle-event9').change(function() {
		if ($(this).prop('checked') == true) {
			toggleSwitch('labAvailableSwitchYes', 'B2C', 'Y');
		} else {
			toggleSwitch('labAvailableSwitchNo', 'B2C', 'All');
		}
	});
});
  
function toggleSwitch(id, callFrom,flag) {
	var sel = flag;//$("#" + id).data('title');
	var tog = 'emergencyFlag';//$("#" + id).data('toggle');
	
	$('#' + tog).val(sel);
	$('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]')
			.removeClass('active').addClass('notActive');
	$('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass(
			'notActive').addClass('active');
	var tabId = "";
	if(callFrom == "phlebotomy" || callFrom == "accession" || callFrom == "outsource" || callFrom == "processing" || callFrom == "B2B" || callFrom == "B2C"){
		tabId =  $("#tabId li.active").attr('id');
	}

	setTimeout(function() {
		if(callFrom == "phlebotomy"){
			searchLabTestPatient("phelbotomySearchBtn");
		}else if(callFrom == "appointment"){
			searchLabTestPatient("appointmentSearchBtn");
		}else if(callFrom == "accession"){
			searchLabTestPatient("accessionTestSearchBtn");
		}else if(callFrom == "processing"){
			searchLabTestPatient("processingSearchBtn");
		}else if(callFrom == "authorization"){
			searchLabTestPatient("authorizationSearchBtn");
		}else if(callFrom == "outsource"){
			searchDateWiseOutSourced();
		}else if(callFrom == "reporting"){
			searchLabTestPatient("reportingSearchBtn");
		}else if(callFrom == "B2C"){
			searchBtoCRecollectionPatient("BTOCRecollection");
		}
		/*
		 * if(callFrom == "outSourceSearchBtn"){
			searchDateWiseOutSourced();
		}else if(callFrom == "BTOCRecollection"){
			searchBtoCRecollectionPatient(callFrom);
		}
		 */
		/*else if(callFrom == "B2B" && tabId == "ALBToB"){
			getAllRecollectionRequestBToBAndBToC("allBToB");
		}else if(callFrom == "B2B" && tabId == "rejectedSampleBToB"){
			getAllRecollectionRequestBToBAndBToC("ARBToB");
		}else if(callFrom == "B2B" && tabId == "pathoRecollectionBToB"){
			getAllRecollectionRequestBToBAndBToC("PRBToB");
		}*/
	}, 500);
}

function validateNumber(evt){
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 32 && (charCode < 48 || charCode > 57)) {
		alert("Enter only numbers");
	    return false;
	}
	return true;
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Get Phlebotomy Patient by ID.
************************************************************/
function getLisRecordsCount() {
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/phlebotomy/getLisRecordsCount",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			alert(r);
		}
	});
}

function getSamplesByCollectedAt(callFrom){
	var tabId =  "";
	if(callFrom == "phlebotomy"){
		tabId = jQuery('#tabId').find('li.active').attr('id');
		callFromTemp = "phelbotomyAutoSugg";
	}else if(callFrom == "appointment"){
		tabId = "";
		callFromTemp = "appointmentAutoSugg";
	}else if(callFrom == "accession"){
		tabId = jQuery('#tabId').find('li.active').attr('id');
		callFromTemp = "accessionTestAutoSugg";
	}else if(callFrom == "accessionTrackStatus"){
		callFromTemp = "accessionTrackStatusAutoSugg";
	}else if(callFrom == "processing"){
		tabId =  jQuery('#tabId').find('li.active').attr('id');
		callFromTemp = "processingAutoSugg";
	}else if(callFrom == "authorization"){
		callFromTemp = "authorizationAutoSugg";
	}else if(callFrom == "reporting"){
		callFromTemp = "reportingAutoSugg";
	}else if(callFrom == "outsource"){
		tabId = jQuery('#tabId').find('li.active').attr('id');
		callFromTemp = "outSourceAutoSugg";
	}else if(callFrom == "BTOCRecollection"){
		tabId = jQuery('#tabId').find('li.active').attr('id');
		callFromTemp = "BTOCRecollection";
	}
	
	var startIndex = 0;
	var txtFdate = $.trim($("#txtFdate").val());
	var txtTdate = $.trim($("#txtTdate").val());
	var emergencyFlag = $("#emergencyFlag").val();
	var collectedAtId = $("#collectedAt").val();

	if(collectedAt == 0)
		return false;
	
	var inputs = [];
	inputs.push('callFrom=' + callFrom);
	inputs.push('tabId=' + tabId);
	inputs.push('startIndex=' +startIndex);
	inputs.push('emergencyFlag=' +emergencyFlag);
	inputs.push('collectedAtId=' +collectedAtId);
	inputs.push('txtFdate=' +txtFdate);
	inputs.push('txtTdate=' +txtTdate);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/getSamplesByCollectedAt",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setPatientTemp(r, callFromTemp, tabId);
			setPaginationTemplateForCollectedAt(r, callFrom, tabId);
		}
	});
}

function setPaginationTemplateForCollectedAt(r, callFrom, tabId){
	if(callFrom == "phlebotomy"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;		
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnCollectedAt("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#phlebotomyNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#phlebotomyNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='phlebotomyPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPageForCollectedAt("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#phlebotomyPagination').html(numberOfRows);
	}else if(callFrom == "accession" && tabId == "AL"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='page-item disabled'><a data-toggle='tab'><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li class='page-item active' id="+index+" onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a data-toggle='tab'>"+index+"</a></li>";
			}else{
				numberOfRows +="<li class='page-item' id="+index+" onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a data-toggle='tab'>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='page-item' onclick='nextPaginationOnCollectedAt("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a data-toggle='tab'><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#accessionNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#accessionNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='accessionPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPageForCollectedAt("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#accessionPagination').html(numberOfRows);
	}else if(callFrom == "accession" && tabId == "accessionPending"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
		if(j == 0){
			numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
		}else{
			numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
		}
		index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnCollectedAt("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#accessionPendingNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#accessionPendingNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#accessionPendingJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='accessionPendingPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPageForCollectedAt("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
			$('#accessionPendingPagination').html(numberOfRows);
	}else if(callFrom == "accession" && tabId == "collectionPending"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnCollectedAt("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#collectionPendingNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#collectionPendingNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#collectionPendingJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='collectionPendingPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPageForCollectedAt("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#collectionPendingPagination').html(numberOfRows);
	}else if(callFrom == "accession" && tabId == "accessionDone"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnCollectedAt("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#accessionDoneNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#accessionDoneNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#accessionDoneJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='accessionDonePageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPageForCollectedAt("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#accessionDonePagination').html(numberOfRows);
	}else if(callFrom == "accession" && tabId == "rejectedSample"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnCollectedAt("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#rejectedSampleNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#rejectedSampleNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#rejectedSampleJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='rejectedSamplePageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPageForCollectedAt("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#rejectedSamplePagination').html(numberOfRows);
	}else if(callFrom == "processing" && tabId == "AL"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination = 5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnCollectedAt("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#processingNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#processingNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='processingPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPageForCollectedAt("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#processingPagination').html(numberOfRows);
	}else if(callFrom == "authorization"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination = 5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnCollectedAt("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#authorizationNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#authorizationNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='authorizationPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPageForCollectedAt("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#authorizationPagination').html(numberOfRows);
	}else if(callFrom == "reporting"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination = 5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnCollectedAt("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#reportingNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#reportingNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='reportingPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPageForCollectedAt("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#reportingPagination').html(numberOfRows);
	}else if(callFrom == "BTOCRecollection" && tabId == "ALBToC"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnCollectedAt("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#allBToCNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#allBToCNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='allBToCPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPageForCollectedAt("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#allBToCPagination').html(numberOfRows);
	}else if(callFrom == "BTOCRecollection" && tabId == "rejectedSampleBToC"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnCollectedAt("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#ARBToCNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#ARBToCNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#ARBToCJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='ARBToCPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPageForCollectedAt("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#ARBToCPagination').html(numberOfRows);
	}else if(callFrom == "BTOCRecollection" && tabId == "pathoRecollectionBToC"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnCollectedAt("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#PRBToCNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#PRBToCNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#PRBToCJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='PRBToCPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPageForCollectedAt("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#PRBToCPagination').html(numberOfRows);
	}else if(callFrom == "outsource" && tabId == "outsource"){
		var numberOfRows = "";
		var index = 1;
		var count = r.rowCount;
		var numberOfPages = (count/10);
		var displayPagination = numberOfPages;			
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
			displayPagination=5;
		}
		for(var j = 0; j < displayPagination; j++){
			if(j == 0){
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='paginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='nextPaginationOnCollectedAt("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#outSourceNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#outSourceNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#jumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='outsourcePageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='jumpToPageForCollectedAt("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#outSourcePagination').html(numberOfRows);
	}
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination.
************************************************************/
function paginationOnCollectedAt(pageNumber, numberOfPages, callFrom, tabId){
	var callFromTemp = "";
	if(callFrom == "phlebotomy"){
		callFromTemp = "phelbotomyAutoSugg";
	}else if(callFrom == "accession"){
		callFromTemp = "accessionTestAutoSugg";
	}else if(callFrom == "processing"){
		callFromTemp = "processingAutoSugg";
	}else if(callFrom == "authorization"){
		callFromTemp = "authorizationAutoSugg";
	}else if(callFrom == "reporting"){
		callFromTemp = "reportingAutoSugg";
	}else if(callFrom == "outsource"){
		callFromTemp = "outSourceAutoSugg";
	}else if(callFrom == "BTOCRecollection"){
		callFromTemp = "BTOCRecollection";
	}
	
	var emergencyFlag = $("#emergencyFlag").val();
	var collectedAtId = $("#collectedAt").val();
	var txtFdate = $.trim($("#txtFdate").val());
	var txtTdate = $.trim($("#txtTdate").val());
	
	var inputs = [];
	var startIndex = (pageNumber - 1) + "0";
	inputs.push('callFrom=' + callFrom);
	inputs.push('tabId=' + tabId);
	inputs.push('startIndex=' +startIndex);
	inputs.push('emergencyFlag=' +emergencyFlag);
	inputs.push('collectedAtId=' +collectedAtId);
	inputs.push('txtFdate=' +txtFdate);
	inputs.push('txtTdate=' +txtTdate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/paginationOnCollectedAt",
		error : function() {
			alert("error");
		},
		success : function(r) {
	        setPatientTemp(r, callFromTemp, tabId);
	        
	        if(callFrom == "phlebotomy")
	        	$('#phlebotomyNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "accession" && tabId == "AL")
	    		$('#accessionNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "accession" && tabId == "accessionPending")
	    		$('#accessionPendingNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "accession" && tabId == "collectionPending")
	    		$('#collectionPendingNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "accession" && tabId == "accessionDone")
	    		$('#accessionDoneNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "accession" && tabId == "rejectedSample")
	    		$('#rejectedSampleNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "processing" && tabId == "AL")
	    		$('#processingNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "authorization")
	    		$('#authorizationNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "reporting")
	    		$('#reportingNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "outsource")
	    		$('#outSourceNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "BTOCRecollection" && tabId == "ALBToC")
	    		$('#allBToCNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "BTOCRecollection" && tabId == "rejectedSampleBToC")
	    		$('#ARBToCNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "BTOCRecollection" && tabId == "pathoRecollectionBToC")
	    		$('#PRBToCNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
 		},
	});	
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination Next Button.
************************************************************/
function nextPaginationOnCollectedAt(currentIndex, numberOfPages, callFrom, callType){
	var displayPagination = currentIndex + 5;
	var numberOfRows = '';
	numberOfRows  = numberOfRows + '<li class="previous" onclick="previousPaginationOnCollectedAt('+currentIndex+','+Math.round(numberOfPages)+',\''+callFrom+'\',\''+callType+'\');"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	if(numberOfPages < displayPagination){
		displayPagination = numberOfPages + 1;
	}
	for(var j = currentIndex; j < displayPagination; j++){
		numberOfRows +='<li onclick="paginationOnCollectedAt('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\', \''+callType+'\')"><a>'+j+'</a></li>';
	}
	if(numberOfPages >= displayPagination){
		numberOfRows +='<li class="next" onclick="nextPaginationOnCollectedAt('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\', \''+callType+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	}
	
	if(callFrom == "phlebotomy")
		$('#phlebotomyPagination').html(numberOfRows);
	else if(callFrom == "accession" && tabId == "AL")
		$('#accessionPagination').html(numberOfRows);
	else if(callFrom == "accession" && tabId == "accessionPending")
		$('#accessionPendingPagination').html(numberOfRows);
	else if(callFrom == "accession" && tabId == "collectionPending")
		$('#collectionPendingPagination').html(numberOfRows);
	else if(callFrom == "accession" && tabId == "accessionDone")
		$('#accessionDonePagination').html(numberOfRows);
	else if(callFrom == "accession" && tabId == "rejectedSample")
		$('#rejectedSamplePagination').html(numberOfRows);
	else if(callFrom == "processing" && tabId == "AL")
		$('#processingPagination').html(numberOfRows);
	else if(callFrom == "authorization")
		$('#authorizationPagination').html(numberOfRows);
	else if(callFrom == "reporting")
		$('#reportingPagination').html(numberOfRows);
	else if(callFrom == "outsource")
		$('#outSourcePagination').html(numberOfRows);
	else if(callFrom == "BTOCRecollection" && tabId == "ALBToC")
		$('#allBToCPagination').html(numberOfRows);
	else if(callFrom == "BTOCRecollection" && tabId == "rejectedSampleBToC")
		$('#ARBToCPagination').html(numberOfRows);
	else if(callFrom == "BTOCRecollection" && tabId == "pathoRecollectionBToC")
		$('#PRBToCPagination').html(numberOfRows);
	
	paginationOnCollectedAt(currentIndex, numberOfPages, callFrom, callType);
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination Previous Button.
************************************************************/
function previousPaginationOnCollectedAt(currentIndex, numberOfPages, callFrom, callType){
	var displayPagination = currentIndex - 5;
	var numberOfRows = '';
	if(currentIndex > 6){
		numberOfRows +='<li class="previous" onclick="previousPaginationOnCollectedAt('+displayPagination+','+Math.round(numberOfPages)+',\''+callFrom+'\',\''+callType+'\')"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	}
	for(var j = displayPagination; j < currentIndex; j++){
		numberOfRows +='<li onclick="paginationOnCollectedAt('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\',\''+callType+'\')"><a>'+j+'</a></li>';
	}
	numberOfRows +='<li class="next" onclick="nextPaginationOnCollectedAt('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\',\''+callType+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	
	if(callFrom == "phlebotomy")
		$('#phlebotomyPagination').html(numberOfRows);
	else if(callFrom == "accession" && tabId == "AL")
		$('#accessionPagination').html(numberOfRows);
	else if(callFrom == "accession" && tabId == "accessionPending")
		$('#accessionPendingPagination').html(numberOfRows);
	else if(callFrom == "accession" && tabId == "collectionPending")
		$('#collectionPendingPagination').html(numberOfRows);
	else if(callFrom == "accession" && tabId == "accessionDone")
		$('#accessionDonePagination').html(numberOfRows);
	else if(callFrom == "accession" && tabId == "rejectedSample")
		$('#rejectedSamplePagination').html(numberOfRows);
	else if(callFrom == "processing" && tabId == "AL")
		$('#processingPagination').html(numberOfRows);
	else if(callFrom == "authorization")
		$('#authorizationPagination').html(numberOfRows);
	else if(callFrom == "reporting")
		$('#reportingPagination').html(numberOfRows);
	else if(callFrom == "outsource")
		$('#outSourcePagination').html(numberOfRows);
	else if(callFrom == "BTOCRecollection" && tabId == "ALBToC")
		$('#allBToCPagination').html(numberOfRows);
	else if(callFrom == "BTOCRecollection" && tabId == "rejectedSampleBToC")
		$('#ARBToCPagination').html(numberOfRows);
	else if(callFrom == "BTOCRecollection" && tabId == "pathoRecollectionBToC")
		$('#PRBToCPagination').html(numberOfRows);

	paginationOnCollectedAt(displayPagination, numberOfPages, callFrom, callType);
}

function jumpToPageForCollectedAt(numberOfPages, callFrom, tabId){
	var pageNo = 0;

	if(callFrom == "phlebotomy")
		pageNo = $("#phlebotomyPageNumber").val();
	else if(callFrom == "accession" && tabId == "AL")
		pageNo = $("#accessionPageNumber").val();
	else if(callFrom == "accession" && tabId == "accessionPending")
		pageNo = $("#accessionPendingPageNumber").val();
	else if(callFrom == "accession" && tabId == "collectionPending")
		pageNo = $("#collectionPendingPageNumber").val();
	else if(callFrom == "accession" && tabId == "accessionDone")
		pageNo = $("#accessionDonePageNumber").val();
	else if(callFrom == "accession" && tabId == "rejectedSample")
		pageNo = $("#rejectedSamplePageNumber").val();
	else if(callFrom == "processing" && tabId == "AL")
		pageNo = $("#processingPageNumber").val();
	else if(callFrom == "authorization")
		pageNo = $("#authorizationPageNumber").val();
	else if(callFrom == "reporting")
		pageNo = $("#reportingPageNumber").val();
	else if(callFrom == "outsource")
		pageNo = $("#outsourcePageNumber").val();
	else if(callFrom == "BTOCRecollection" && tabId == "ALBToC")
		pageNo = $("#allBToCPageNumber").val();
	else if(callFrom == "BTOCRecollection" && tabId == "rejectedSampleBToC")
		pageNo = $("#ARBToCPageNumber").val();
	else if(callFrom == "BTOCRecollection" && tabId == "pathoRecollectionBToC")
		pageNo = $("#PRBToCPageNumber").val();
	
	if(pageNo <= numberOfPages){
		paginationOnCollectedAt(pageNo, numberOfPages, callFrom, tabId);
	}else{
		alert("Invalid page number.");
	}
	
	if(callFrom == "phlebotomy")
		$("#phlebotomyPageNumber").val("");
	else if(callFrom == "accession" && tabId == "AL")
		$("#accessionPageNumber").val("");
	else if(callFrom == "accession" && tabId == "accessionPending")
		$("#accessionPendingPageNumber").val("");
	else if(callFrom == "accession" && tabId == "collectionPending")
		$("#collectionPendingPageNumber").val("");
	else if(callFrom == "accession" && tabId == "accessionDone")
		$("#accessionDonePageNumber").val("");
	else if(callFrom == "accession" && tabId == "rejectedSample")
		$("#rejectedSamplePageNumber").val("");
	else if(callFrom == "processing" && tabId == "AL")
		$("#processingPageNumber").val("");
	else if(callFrom == "authorization")
		$("#authorizationPageNumber").val("");
	else if(callFrom == "reporting")
		$("#reportingPageNumber").val("");
	else if(callFrom == "outsource")
		$("#outsourcePageNumber").val("");
	else if(callFrom == "BTOCRecollection" && tabId == "ALBToC")
		$("#allBToCPageNumber").val("");
	else if(callFrom == "BTOCRecollection" && tabId == "rejectedSampleBToC")
		$("#ARBToCPageNumber").val("");
	else if(callFrom == "BTOCRecollection" && tabId == "pathoRecollectionBToC")
		$("#PRBToCPageNumber").val("");
}

function getSamples(callFrom){
//	alert("Inside getSamples : "+callFrom);
	setTimeout(function() {
		if(callFrom == "outSourceSearchBtn"){
			searchDateWiseOutSourced();
		}else if(callFrom == "BTOCRecollection" || callFrom == "BTOBRecollection"){
			searchBtoCRecollectionPatient(callFrom);
		}
		else{
			searchLabTestPatient(callFrom);
		}
	}, 500);
}

function getCollectedAtOptions() {
	var userFor = $("#userFor").val();
	var inputs = [];
	inputs.push('action=getRefDoctors');

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ChannelingServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');	
		},
		success : function(r) {
			setCollectedAtOptionsTemplate(r, userFor);
		}
	});
}

function setCollectedAtOptionsTemplate(r, userFor){
	var dropdownList = "<option value='0'>-SELECT-</option>";
	var myArray = $.parseJSON(r);
	if(userFor == "airport"){
		for(var i = 0; i < 4; i++) {
			if(myArray.cdl[i].cdn == "Domestic Arrival" || myArray.cdl[i].cdn == "domestic arrival" || myArray.cdl[i].cdn == "DOMESTIC ARRIVAL")
				dropdownList = dropdownList + "<option value="+myArray.cdl[i].cid+">"+myArray.cdl[i].cdn+"</option>";
			else
				dropdownList = dropdownList + "<option value="+myArray.cdl[i].cid+">"+myArray.cdl[i].cdn+"</option>";
		}
		$("#collectedAt").html(dropdownList);
		$("#collectedAt").select2();
	}else{
		for(var i = 4; i < myArray.cdl.length; i++) {
			dropdownList = dropdownList + "<option value="+myArray.cdl[i].cid+">"+myArray.cdl[i].cdn+"</option>";
		}
		$("#refBy").html(dropdownList);
		$("#refBy").select2();
	}
}

function getDynamicTabCount(custTypeId, custNameId, txtFdate, txtTdate, callFrom, searchBy, emergencyFlag){
	var inputs = [];
	inputs.push('custTypeId=' + custTypeId);
	inputs.push('custNameId=' + custNameId);
	inputs.push('fromDate=' + txtFdate);
	inputs.push('toDate=' + txtTdate);
	inputs.push('callFrom=' + callFrom);
	inputs.push('searchBy=' + searchBy);
	inputs.push('emergencyFlag=' +emergencyFlag);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/getDynamicTabCount",
		error : function() {
			alert('error');
		},
		success : function(r) {
			var data = r.split(",");
			if(callFrom == "phelbotomySearchBtn"){
				$("#subChrgCount").text(data[0]);
				$("#chrgCount").text(data[1]);
			}else if(callFrom == "accessionTestSearchBtn"){
				$("#subChrgCount").text(data[0]);
				$("#chrgCount").text(data[1]);
				$("#subCount").text(data[2]);
				$("#servCount").text(data[3]);
				$("#deptCount").text(data[4]);
			}else if(callFrom == "BTOCRecollection"){
				$("#subChrgCount").text(data[0]);
				$("#deptCount").text(data[1]);
				$("#servCount").text(data[2]);
			}
		}
	});
}

//This functiono is used for clear search data for LIS
function clearSearch(callfrom) {
	 $('#emergencyFlag').val("All");
		if(callfrom == "phelbotomy") {
			searchLabTestPatient("phelbotomySearchBtn");
			$("#custNameForSearch").select2("val", 0);
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //As January is 0.
			var yyyy = today.getFullYear();
			if(dd<10) dd='0'+dd;
			if(mm<10) mm='0'+mm;
			var date = dd+'/'+mm+'/'+yyyy;
			$("#txtFdate").val(date);
			$("#txtTdate").val(date);
			$("#byName").val('');
		}else if(callfrom == "appointment") {
			$("#custNameForSearch").select2("val", 0);
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //As January is 0.
			var yyyy = today.getFullYear();
			if(dd<10) dd='0'+dd;
			if(mm<10) mm='0'+mm;
			var date = dd+'/'+mm+'/'+yyyy;
			$("#txtFdate").val(date);
			$("#txtTdate").val(date);
			$("#byName").val('');
			
			searchLabTestPatient("appointmentSearchBtn");
			
		}else if(callfrom == "accession") {
			searchLabTestPatient("accessionTestSearchBtn");
			$("#bulksapmle").click(function() {
				var status = false;
				if ($("#bulksapmle").is(':checked'))
					status = true;
				$('input[type=checkbox]').not(":disabled").prop('checked', status);
			});

			$("#bulksapmle1").click(function() {
				var status = false;
				if ($("#bulksapmle1").is(':checked'))
					status = true;
				$('input[type=checkbox]').not(":disabled").prop('checked', status);
			});
			$("#byName").val('');
			
		} else if (callfrom == "proccessing") {
			searchLabTestPatient("processingSearchBtn");
			$("#bulksapmle").click(function() {
				var status = false;
				if ($("#bulksapmle").is(':checked'))
					status = true;
				$('input[type=checkbox]').not(":disabled").prop('checked', status);
			});
		} else if (callfrom == "authorization") {
			//searchLabTestPatient("authorizationSearchBtn");
			searchReportingPatient("reportingSearchBtn");
			//getRecordCountForAuthorizeTabIndicator();
			$("#bulksapmle").click(function() {
				var status = false;
				if ($("#bulksapmle").is(':checked'))
					status = true;
				$('input[type=checkbox]').not(":disabled").prop('checked', status);
			});
		} else if (callfrom == "reporting") {
			searchLabTestPatient("reportingSearchBtn");
			$("#custNameForSearch").select2("val", 0);
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //As January is 0.
			var yyyy = today.getFullYear();
			if(dd<10) dd='0'+dd;
			if(mm<10) mm='0'+mm;
			var date = dd+'/'+mm+'/'+yyyy;
			$("#txtFdate").val(date);
			$("#txtTdate").val(date);
			$("#byName").val('');
		}
		getAllCustomerType('custTypeForSearch');
		$("#collectedAt").select2();
		getCollectedAtOptions();
		$('#patSearchType').val(3);
		$('#custNameForSearch').select2();//Changes By Amol For Clear Customer Name after clear all..
		$("div#divbyName .typeahead").hide();
		//for toggle switch
		var sel = $("#labAvailableSwitchBoth").data('title');
		var tog = $("#labAvailableSwitchBoth").data('toggle');
		$('#' + tog).val(sel);
		$('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]')
				.removeClass('active').addClass('notActive');
		$('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass(
				'notActive').addClass('active');

}
function validateText(){
	var patSearchType = $("#patSearchType").val();
	if(patSearchType == 4){
		$('#byName').attr('onkeypress','return validateNumOnly(event);');
	}
	
}
/***********************************************************
 * @author Amol Jadhav
 * @since  27-05-2021
 * @comment Validation Auto-Suggestion.
************************************************************/
function setPatientSearchType(){
	
	$("#byName").val("");
	//var patSearchType = $("#patSearchType").val();
	var patSearchType = $('#patSearchType').val();
	
	// alert(patSearchType)
	
	if(patSearchType == 1){
		
		$("#byName").attr("placeholder", "Type Patient Name Here");
		$('#byName').attr('onkeypress',
                'return validatealphabetic(event);');
		
		
	}else if(patSearchType == 2){
		
		$("#byName").attr("placeholder", "Type Patient UHID Here");
		$('#byName').attr('onkeypress',
		'return validateNumOnly(event);');
		
	}else if(patSearchType == 3){
		
		$("#byName").attr("placeholder", "Type Patient MachineBarcode Here");
		$('#byName').attr('onkeypress',
		'return validateAlphaNumberic(event);');
	}else if(patSearchType == 4){
		
		$("#byName").attr("placeholder", "Type Patient Mobile Here");
		$('#byName').attr('onkeypress',
		'return validateNumOnly(event);');
	}else if(patSearchType == 5){
		
		$("#byName").attr("placeholder", "Type Patient Barcode Here");
		$('#byName').attr('onkeypress',
		'return validateAlphaNumberic(event);');
	}
	
}
function validateAlphaNumberic(key) {
	var keycode = (key.which) ? key.which : key.keyCode;
	if ((keycode > 47 && keycode < 58) || (keycode > 64 && keycode < 91)
			|| (keycode > 96 && keycode < 123) || keycode == 8 || keycode == 9
			|| keycode == 127 || keycode == 13 || keycode == 46
			|| (keycode > 34 && keycode < 41)) {

		return true;
	} else {
		alert("Please Enter Alphabets And Numbers Only!");
		return false;
	}
};

function exportToExcel(callFrom){
	var tableBody = "";
	var file = "";
	if(callFrom == "ALBToB"){
		tableBody = "accessionRecordTableBody";
		file = "BToB_RecollectionFromAccession";
	}else if(callFrom=="rejectedSampleBToB"){
		tableBody = "rejectedSampleTabId";
		file = "BToB_RejectedSample";
	}else if(callFrom=="pathoRecollectionBToB"){
		tableBody = "pathologyRecolltionId";
		file = "BToB_PathologiestRecollection";
	}else if(callFrom=="ALBToC"){
		tableBody = "currentRecordTable";
		file = "BToC_RecollectionFromAccession";
	}else if(callFrom=="rejectedSampleBToC"){
		tableBody = "previousRecordTable";
		file = "BToC_RejectedSample";
	}else if(callFrom=="pathoRecollectionBToC"){
		tableBody = "ehatTable";
		file = "BToC_PathologiestRecollection";
	}

	$("#"+tableBody).table2excel({
		filename: file,
		exportOptions: {
			modifier : {
                // DataTables core
                order : 'index', // 'current', 'applied',
                //'index', 'original'
                page : 'all', // 'all', 'current'
                search : 'none' // 'none', 'applied', 'removed'
            },
            columns: [ 0, 1, 2, ,3, 4, 5, 6, 7, 9, 10, 11 ]
        }
	});
}

function acceptInPhlebotomy() {
	idList = [];
	var currentId;
	$("#appointmentTabId").find('input[name="testid"]').each(function() {
		if ($(this).is(":checked")) {
			currentId = $('#' + this.id).val();
			if (currentId != 0) {
				idList.push(currentId);
			} 
		}
	});
	idList = idList.join('-');
	if(idList.length > 0){	
    	var r = confirm("Are You Sure You Want To Collect this Sample/Tests ?");
    	if (r == true) {
    		var inputs = [];
    		inputs.push('id=' + encodeURIComponent(idList));
    		var str = inputs.join('&');
    		jQuery.ajax({
    			async : true,
    			type : "POST",
    			data : str + "&reqType=AJAX",
    			url : "ehat/pathologysearch/acceptInPhlebotomy",
    			timeout : 1000 * 60 * 5,
    			catche : false,
    			error : function() {
    				alert('Network Issue!');
    			},
    			success : function(r) {
    				alertify.success(r);   				
    				searchLabTestPatient("appointmentSearchBtn");
    			}
    		});
    	}
	}	
}


function getSamplesReport(callFrom){
	
	$("#testNameBlock").show();
	$("#emgcollectedat").hide();

//	alert("Inside getSamples : "+callFrom);
	setTimeout(function() {
		if(callFrom == "outSourceSearchBtn"){
			searchDateWiseOutSourceLabReport();
		}
	}, 500);
}


function searchDateWiseOutSourceLabReport()
{
	var tabId =  $("#tabId li.active").attr('id');
	var outSourceType =  $.trim($("#outSourceType").val());	
	var outSourceTypeId =  $.trim($("#outSourceTypeId").val());		
	var txtFdate = $.trim($("#txtFdate").val());		
	var txtTdate = $.trim($("#txtTdate").val());
	var testName = $.trim($("#testName").val());
	var startIndex = 0;
	var searchBy = "";
	var getTestName = "";
	var emergencyFlag = $("#emergencyFlag").val();
	
	if (outSourceType != "0" && outSourceTypeId == "0" && testName == "0") {
		alert("Please select Lab Name or test Name")
		return false;
	}
	
	if (outSourceType == "0" && outSourceTypeId == "0" && txtFdate == "" && txtTdate == "") {
		alert("Please enter something to search");
		return false;
	}
	
	if(outSourceType == 0){
		
		if ((txtFdate != "" && (txtTdate == "")) || (txtTdate != "" && (txtFdate == ""))) {
			$("#outSourceType").val(0);
			$("#txtTdate").val(" ");
			$("#txtFdate").val(" ");
			alert("Please select both date to search");
			return false;
		}else{
			searchBy = "byDate";
		}
	}else if(outSourceType != 0 && outSourceTypeId != 0){
		if(txtFdate == "" && txtTdate == ""){
			searchBy = "byType";
		}else if (txtFdate != "" && txtTdate == "") {
			$("#outSourceType").val(0);
			$("#outSourceTypeId").val(0);
			$("#txtTdate").val("");
			$("#txtFdate").val("");
			alert("Please select both date to search");
			return false;
		}else if(txtFdate == "" && txtTdate != ""){
			$("#outSourceType").val(0);
			$("#outSourceTypeId").val(0);
			$("#txtTdate").val("");
			$("#txtFdate").val("");
			alert("Please select both date to search");
			return false;
		}else if(txtFdate != "" && txtTdate != "") {
			searchBy = "byAll";
			
		}
	}else if(outSourceType != 0 && outSourceTypeId == 0){
		$("#outSourceType").val(0);
		alert("Please select lab name to search the lab reports.");
		return false;
	}
	
	if(testName != "0"){
		getTestName = testName;
	}else if(testName == "0"){
		getTestName = testName;
	}
	
	$("#outSourceType").val(outSourceType);
	$("#outSourceTypeId").val(outSourceTypeId);
	$("#fromDate").val(txtFdate);
	$("#toDate").val(txtTdate);
	$("#searchBy").val(searchBy);
	var departmentId = $("#departmentId").val();
	
	var inputs = [];
	inputs.push('outSourceType=' + outSourceType);
	inputs.push('outSourceTypeId=' + outSourceTypeId);
	inputs.push('tabId=' + tabId);
	inputs.push('fromDate=' + txtFdate);
	inputs.push('toDate=' + txtTdate);
	inputs.push('searchBy=' + searchBy);
	inputs.push('startIndex=' + startIndex);
	inputs.push('emergencyFlag=' +emergencyFlag);
	inputs.push('getTestName=' +0);
	inputs.push('departmentId=' + departmentId);
	
/*	alert("tabId: "+tabId)
	alert("outSourceType: "+outSourceType)
	alert("outSourceTypeId: "+outSourceTypeId)
	alert("txtFdate: "+txtFdate)
	alert("txtTdate: "+txtTdate)
	alert("searchBy: "+searchBy)
	alert("startIndex: "+startIndex)
	alert("emergencyFlag: "+emergencyFlag)
	
	return false;*/
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/searchDateWiseOutSourceLabReport",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if (tabId == "outsourcelabreport") {
				setoutSourcedLabReport(r);
			}
		}
	});
}


function setoutSourcedLabReport(r)
{
	
	if(r.labSampleWiseMasterDtoList.length>0){
		var divContent = "";
		var statusss="";
		var x = 1;
		for ( var i = 0; i < r.labSampleWiseMasterDtoList.length; i++) {
			
			var datetime = r.labSampleWiseMasterDtoList[i].datetime.split("-");  // ex input "2010-01-18"
			var date = datetime[2]+ "/" +datetime[1]+ "/" +datetime[0].substring(2); //ex out: "18/01/10"
			
		divContent = divContent+ '<tr style="height:2px;" >'							
        			+ "<td class='col-md-1 center'>"+x+"</td>"			
			        + "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].outlabName +"</td>"
			        
	    divContent = divContent+ "<td class='col-md-2 center'>"+r.labSampleWiseMasterDtoList[i].patientname +"</td>"
					
		divContent = divContent
					+ "<td class='col-md-1 center'>"+date+"</td>"	
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].testName+"</td>"
					+ "<td class='col-md-1 center'>"+r.labSampleWiseMasterDtoList[i].testRate+"</td>";
			x++;
		}	
	
		$('#reportingtabId').html(divContent);
	}else{
		var divContent = "";
	    divContent = divContent+ "<tr>" 
	    +"<td colspan='6'><h2 style='color: red;font-size: 20px;text-align: center;font-weight: bold'>No records available!</h2></td>"
	    +"</tr>";
	    
		$('#reportingtabId').html(divContent);
	}

}

function exportToExcelOutSourceLabReport(){
	var fromDate = $("#txtFdate").val();
	var toDate = $("#txtTdate").val();
	
	$("#outsourcelabreporttab").table2excel({
		exclude: ".noExl", 
		filename: "forcedoutsourcetab("+fromDate+" To "+toDate+").xls" 
	});
}
