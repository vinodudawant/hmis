/*******************************************************************************
 * @author Akshay Mache
 * @since 01-09-2020
 * @comment To get B2B Collection and Collected Records.
 ******************************************************************************/
function getB2BCollectionsRecords(callFrom){
	var testStatus = 0;
	if(callFrom == "collection")
		testStatus = 101;
	else if(callFrom == "collected")
		testStatus = 102;
	else if(callFrom == "rejected")
		testStatus = 4;
	
	var emergencyFlag = $("#emergencyFlag").val();
	var unitId = $("#unitId").val();
	var userType = $("#userType").val();
	var userCustomerType = $("#userCustomerType").val();
	var userCustomerId = $("#userCustomerId").val();
	var userId = $("#userId").val();
	var startIndex = 0;
	
	var inputs = [];
	inputs.push('emergencyFlag=' + encodeURIComponent(emergencyFlag));
	inputs.push('startIndex=' + encodeURIComponent(startIndex));
	inputs.push('testStatus=' + encodeURIComponent(testStatus));
	inputs.push('unitId=' + encodeURIComponent(unitId));
	inputs.push('userType=' + encodeURIComponent(userType));
	inputs.push('userId=' + encodeURIComponent(userId));
	inputs.push('userCustomerType=' + encodeURIComponent(userCustomerType));
	inputs.push('userCustomerId=' + encodeURIComponent(userCustomerId));
	var str = inputs.join('&');	
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/getB2BCollectionsRecords",
		error : function() {
			alert("error");
		},
		success : function(r) {
			if(callFrom == "collection")
				setPatientTemp(r, "b2bCollection", "");
			else if(callFrom == "collected")
				setPatientTemp(r, "b2bCollected", "");
			else if(callFrom == "rejected")
				setPatientTemp(r, "b2bRejected", "");
			
			onloadPaginationTemplate(r, callFrom);
		}
	});
}

function onloadPaginationTemplate(r, callFrom){
	if(callFrom == "collection"){
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
				numberOfRows +="<li class='page-item active' id="+index+" onclick='b2BPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}else{
				numberOfRows +="<li class='page-item' id="+index+" onclick='b2BPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}
			index = index + 1;
		}
		
		if(numberOfPages > 5){
			numberOfRows +="<li class='page-item' onclick='b2BNextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
	
		if(count == 0)
			$('#collectionNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#collectionNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#collectionJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='collectionPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='b2BJumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \"onload\");'>Go</button></a></li>");
		}
		$('#collectionPagination').html(numberOfRows);
	}else if(callFrom == "collected"){
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
				numberOfRows +="<li class='page-item active' id="+index+" onclick='b2BPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}else{
				numberOfRows +="<li class='page-item' id="+index+" onclick='b2BPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='page-item' onclick='b2BNextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#collectedNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#collectedNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#collectedJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='collectedPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='b2BJumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \"onload\");'>Go</button></a></li>");
		}
		$('#collectedPagination').html(numberOfRows);
	}else if(callFrom == "rejected"){
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
				numberOfRows +="<li class='page-item active' id="+index+" onclick='b2BPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}else{
				numberOfRows +="<li class='page-item' id="+index+" onclick='b2BPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='page-item' onclick='b2BNextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#rejectedNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#rejectedNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#rejectedJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='rejectedPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='b2BJumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \"onload\");'>Go</button></a></li>");
		}
		$('#rejectedPagination').html(numberOfRows);
	}else if(callFrom == "assign"){
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
				numberOfRows +="<li class='page-item active' id="+index+" onclick='b2BAssignAndTransferPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}else{
				numberOfRows +="<li class='page-item' id="+index+" onclick='b2BAssignAndTransferPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='page-item' onclick='b2BAssignAndTransferNextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#sampleAssignNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#sampleAssignNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#sampleAssignJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='sampleAssignPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='b2BJumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \"onload\");'>Go</button></a></li>");
		}
		$('#sampleAssignPagination').html(numberOfRows);
	}else if(callFrom == "assigned"){
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
				numberOfRows +="<li class='page-item active' id="+index+" onclick='b2BAssignAndTransferPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}else{
				numberOfRows +="<li class='page-item' id="+index+" onclick='b2BAssignAndTransferPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='page-item' onclick='b2BAssignAndTransferNextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#sampleAssignedNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#sampleAssignedNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#sampleAssignedJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='sampleAssignedPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='b2BJumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \"onload\");'>Go</button></a></li>");
		}
		$('#sampleAssignedPagination').html(numberOfRows);
	}else if(callFrom == "runnerTransfer"){
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
				numberOfRows +="<li class='page-item active' id="+index+" onclick='b2BAssignAndTransferPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}else{
				numberOfRows +="<li class='page-item' id="+index+" onclick='b2BAssignAndTransferPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='page-item' onclick='b2BAssignAndTransferNextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#runnerTransferNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#runnerTransferNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#runnerTransferJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='runnerTransferPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='b2BJumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \"onload\");'>Go</button></a></li>");
		}
		$('#runnerTransferPagination').html(numberOfRows);
	}
}

/********************************************************
* @author Akshay Mache
* @since 01-09-2020
* @comment To Collect B2B Collection Sample. 
*********************************************************/
function collectSample(masterIds){
	var r = confirm("Are you sure you want to collect this sample?");
	var testStatus = 102;
	var idList = [];
	idList = masterIds.split(",");
	
	var barCode = $.trim($("#barCode"+idList[0]).val());
	
	if (barCode == "" || barCode == "0" || barCode == "null" || barCode == null) {
		alert("Please Enter Barcode.");
		return false;
	}
	
	var unitId = $("#unitId").val();
	var userId = $("#userId").val();
	
	if(r){
		var inputs = [];
		inputs.push('masterIds=' + encodeURIComponent(idList));
		inputs.push('testStatus=' + encodeURIComponent(testStatus));
		inputs.push('barcode=' + encodeURIComponent(barCode));
		inputs.push('unitId=' + encodeURIComponent(unitId));
		inputs.push('userId=' + encodeURIComponent(userId));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/pathologysearch/collectB2BSample",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				if(r){
					alertify.success("Sample Collected Successfully.");   
				}else{
    				alertify.error("Something went wrong.");
    			}
				getB2BCollectionsRecords('collection');
			}
		});
	}
}

/********************************************************
* @author Akshay Mache
* @since 01-09-2020
* @comment To Accept B2B Collected Sample. 
*********************************************************/
function acceptSample(masterIds){
    var r = confirm("Are you sure you want to submit this sample?");
    var testStatus = 2;
    var unitId = $("#unitId").val();
	var userId = $("#userId").val();
	
    if(r){
    	var inputs = [];
    	inputs.push('masterIds=' + encodeURIComponent(masterIds));
    	inputs.push('testStatus=' + encodeURIComponent(testStatus));
    	inputs.push('unitId=' + encodeURIComponent(unitId));
		inputs.push('userId=' + encodeURIComponent(userId));
    	var str = inputs.join('&');
    	jQuery.ajax({
    		async : true,
    		type : "POST",
    		data : str + "&reqType=AJAX",
    		url : "ehat/pathologysearch/submitB2BSample",
    		timeout : 1000 * 60 * 5,
    		catche : false,
    		error : function() {
    			alert('Network Issue!');
    		},
    		success : function(r) {
    			if(r){
    				alertify.success("Sample Submited Successfully.");   
    			}else{
    				alertify.error("Something went wrong.");
    			}
    			getB2BCollectionsRecords('collected');
    		}
    	});
    }
}

/***********************************************************
 * @author Akshay Mache
 * @since  02-09-2020
 * @comment B2B Patient Pagination.
************************************************************/
function b2BPagination(pageNumber, numberOfPages, callFrom){
	var emergencyFlag = $("#emergencyFlag").val();
	var testStatus = 0;
	if(callFrom == "collection")
		testStatus = 101;
	else if(callFrom == "collected")
		testStatus = 102;
	else if(callFrom == "rejected")
		testStatus = 4;
	
	var unitId = $("#unitId").val();
	var userType = $("#userType").val();
	var userId = $("#userId").val();
	var userCustomerType = $("#userCustomerType").val();
	var userCustomerId = $("#userCustomerId").val();
	
	var inputs = [];
	var startIndex = (pageNumber - 1) + "0";
    inputs.push('startIndex='+startIndex);
    inputs.push('testStatus='+testStatus);
    inputs.push('emergencyFlag='+emergencyFlag);
    inputs.push('unitId=' + encodeURIComponent(unitId));
	inputs.push('userType=' + encodeURIComponent(userType));
	inputs.push('userId=' + encodeURIComponent(userId));
	inputs.push('userCustomerType=' + encodeURIComponent(userCustomerType));
	inputs.push('userCustomerId=' + encodeURIComponent(userCustomerId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/getB2BPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
			if(callFrom == "collection")
				setPatientTemp(r, "b2bCollection", "");
			else if(callFrom == "collected")
				setPatientTemp(r, "b2bCollected", "");
			else if(callFrom == "rejected")
				setPatientTemp(r, "b2bRejected", "");
	        
	        if(callFrom == "collection")
	        	$('#collectionNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "collected")
	    		$('#collectedNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "rejected")
	    		$('#rejectedNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
 		},
	});	
}

/***********************************************************
 * @author Akshay Mache
 * @since  02-09-2020
 * @comment B2B Patient Pagination Next Button.
************************************************************/
function b2BNextPagination(currentIndex, numberOfPages, callFrom){
	var displayPagination = currentIndex + 5;
	var numberOfRows = '';
	numberOfRows  = numberOfRows + '<li class="previous" onclick="b2BPreviousPagination('+currentIndex+','+Math.round(numberOfPages)+',\''+callFrom+'\');"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	if(numberOfPages<displayPagination){
		displayPagination = numberOfPages + 1;
	}
	for(var j = currentIndex; j < displayPagination; j++){
		numberOfRows +='<li onclick="b2BPagination('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\')"><a>'+j+'</a></li>';
	}
	if(numberOfPages > displayPagination){
		numberOfRows +='<li class="next" onclick="b2BNextPagination('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	}
	
	if(callFrom == "collection")
		$('#collectionPagination').html(numberOfRows);
	else if(callFrom == "collected")
		$('#collectedPagination').html(numberOfRows);
	else if(callFrom == "rejected")
		$('#rejectedPagination').html(numberOfRows);

	b2BPagination(currentIndex, numberOfPages, callFrom);
}

/***********************************************************
 * @author Akshay Mache
 * @since  02-09-2020
 * @comment B2B Patient Pagination Previous Button.
************************************************************/
function b2BPreviousPagination(currentIndex, numberOfPages, callFrom){
	var displayPagination = currentIndex - 5;
	var numberOfRows = '';
	if(currentIndex > 6){
		numberOfRows +='<li class="previous" onclick="b2BPreviousPagination('+displayPagination+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	}
	for(var j = displayPagination; j < currentIndex; j++){
		numberOfRows +='<li onclick="b2BPagination('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\')"><a>'+j+'</a></li>';
	}
		numberOfRows +='<li class="next" onclick="b2BNextPagination('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	
		if(callFrom == "collection")
			$('#collectionPagination').html(numberOfRows);
		else if(callFrom == "collected")
			$('#collectedPagination').html(numberOfRows);
		else if(callFrom == "rejected")
			$('#rejectedPagination').html(numberOfRows);
		
		b2BPagination(displayPagination, numberOfPages, callFrom);
}

/***********************************************************
 * @author Akshay Mache
 * @since  02-09-2020
 * @comment To search B2B Collection, Collected & Rejected Samples.
************************************************************/
function searchB2BRecords(callFrom){
	var testStatus = 0;
	if(callFrom == "collection")
		testStatus = 101;
	else if(callFrom == "collected")
		testStatus = 102;
	else if(callFrom == "rejected")
		testStatus = 4;
	
	var custTypeId =  $.trim($("#custTypeForSearch").val());
	var custNameId =  $.trim($("#custNameForSearch").val());
	var txtFdate = $.trim($("#txtFdate").val());
	var txtTdate = $.trim($("#txtTdate").val());
	var startIndex = 0;
	var emergencyFlag = $("#emergencyFlag").val();
	var unitId = $("#unitId").val();
	var userType = $("#userType").val();
	var userId = $("#userId").val();
		
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
			alert("Please select both date to search.");
			return false;
		}else{
			searchBy = "byDate";
		}
	}else if(custTypeId != 0 && custNameId == 0){
		alert("Please select customer name.");
		return false;
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
	inputs.push('testStatus=' + testStatus);
	inputs.push('searchBy=' + searchBy);
	inputs.push('startIndex=' +startIndex);
	inputs.push('emergencyFlag=' +emergencyFlag);
	inputs.push('unitId=' + encodeURIComponent(unitId));
	inputs.push('userId=' + encodeURIComponent(userId));
	inputs.push('userType=' + encodeURIComponent(userType));
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/searchB2BRecords",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#custTypeForSearch").val(0);
			$("#custNameForSearch").val(0);
			$("#txtTdate").val("");
			$("#txtFdate").val("");
			
			if(callFrom == "collection"){
				setPatientTemp(r, "b2bCollection", "");
				setB2BPaginationTemplate(r, callFrom);
			}else if(callFrom == "collected"){
				setPatientTemp(r, "b2bCollected", "");
				setB2BPaginationTemplate(r, callFrom);
			}else if(callFrom == "rejected"){
				setPatientTemp(r, "b2bRejected", "");
				setB2BPaginationTemplate(r, callFrom);
			}
		}
	});
}

/***********************************************************
 * @author Akshay Mache
 * @since  02-09-2020
 * @comment B2B Patient Auto-Suggestion.
************************************************************/
function b2BPatientAutoSuggestion(patientId, type) {
	var resultData = [];
	var patient = $("input#" + patientId).val();
	var patientTypeId = $('#patSearchType').val();
	var unitId = $("#unitId").val();
	var userType = $("#userType").val();
	var userCustomerType = $("#userCustomerType").val();
	var userCustomerId = $("#userCustomerId").val();
	var userId = $("#userId").val();
	
	var testStatus = 0;
	if(type == "collection")
		testStatus = 101;
	else if(type == "collected")
		testStatus = 102;
	else if(type == "rejected")
		testStatus = 4;

	if(patientTypeId == 2 || patientTypeId == 4){
		/*var charCode = (evt.which) ? evt.which : evt.keyCode;
		   if (charCode > 32 && (charCode < 48 || charCode > 57)) {
			   alert("Enter only numbers");
			   $('#byName').val("");
		    }*/
		//return false;
	}
	else if(patientTypeId == 0){
		alert("First select patient type.");
		$('#byName').val("");
		return false;
	}

	var searchBy = "";
	if(patientTypeId == 1){
		searchBy = "byName";
	}else if(patientTypeId == 2){
		searchBy = "byId";
	}else if(patientTypeId == 3){
		searchBy = "byBarcode";
	}else if(patientTypeId == 4){
		searchBy = "byMobile";
	}
	
	if (patient == "" || patient == null || patient == "null" || patient == undefined) {
		alert("Please enter search value");
		$("input#" + patientId).focus();
		return false;
	}

	var emergencyFlag = $("#emergencyFlag").val();
	
	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(patient));
	inputs.push('searchBy=' + encodeURIComponent(searchBy));
	inputs.push('testStatus=' + testStatus);
	inputs.push('emergencyFlag=' + emergencyFlag);
	inputs.push('unitId=' + encodeURIComponent(unitId));
	inputs.push('userId=' + encodeURIComponent(userId));
	inputs.push('userType=' + encodeURIComponent(userType));
	inputs.push('userCustomerType=' + encodeURIComponent(userCustomerType));
	inputs.push('userCustomerId=' + encodeURIComponent(userCustomerId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/b2BPatientAutoSuggestion",
		cache : false,
		success : function(response) {
			var template = "";
			for ( var j = 0; j < response.labSampleWiseMasterDtoList.length; j++) {
				var arrValue = response.labSampleWiseMasterDtoList[j].patientId +"-"+response.labSampleWiseMasterDtoList[j].patientname;
				var idValue = response.labSampleWiseMasterDtoList[j].patientId;
				var name = response.labSampleWiseMasterDtoList[j].patientname;
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
		}
	});
	function displayResult(item) {
		var res = item.text.split('-');
		var patId = res[0];
		var patientName = res[1];
		getB2BPatientById(patId, type, emergencyFlag, testStatus);
		$("input#" + patientId).val(patientName);
	}
}

/***********************************************************
 * @author Akshay Mache
 * @since  02-09-2020
 * @comment Get B2B Patient by ID.
************************************************************/
function getB2BPatientById(id, type, emergencyFlag, testStatus) {
	var emergencyFlag = $("#emergencyFlag").val();
	var unitId = $("#unitId").val();
	var userId = $("#userId").val();
	var userType = $("#userType").val();
	var userCustomerType = $("#userCustomerType").val();
	var userCustomerId = $("#userCustomerId").val();
	
	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('emergencyFlag=' + emergencyFlag);
	inputs.push('testStatus=' + testStatus);
	inputs.push('unitId=' + encodeURIComponent(unitId));
	inputs.push('userId=' + encodeURIComponent(userId));
	inputs.push('userType=' + encodeURIComponent(userType));
	inputs.push('userCustomerType=' + encodeURIComponent(userCustomerType));
	inputs.push('userCustomerId=' + encodeURIComponent(userCustomerId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/getB2BPatientById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			if(type == "collection"){
				setPatientTemp(response, "b2bCollection", "");
			}else if(type == "collected"){
				setPatientTemp(response, "b2bCollected", "");
			}else if(type == "rejected"){
				setPatientTemp(response, "b2bRejected", "");
			}
			$('#byName').val("");
		}
	});
}

/***********************************************************
 * @author Akshay Mache
 * @since  02-09-2020
 * @comment B2B Patient Pagination On Search.
************************************************************/
function b2BPaginationOnSearch(pageNumber, numberOfPages, callFrom){
	var custTypeId = $('#custTypeId').val();
	var custNameId = $('#custNameId').val();
	var txtFdate = $('#fromDate').val();
	var txtTdate = $('#toDate').val();
	var searchBy = $('#searchBy').val();
	var emergencyFlag = $("#emergencyFlag").val();
	var unitId = $("#unitId").val();
	var userId = $("#userId").val();
	var userType = $("#userType").val();
	
	var testStatus = 0;
	if(callFrom == "collection")
		testStatus = 101;
	else if(callFrom == "collected")
		testStatus = 102;
	else if(callFrom == "rejected")
		testStatus = 4;
	else if(callFrom == "assign")
		testStatus = 112;
	else if(callFrom == "assigned")
		testStatus = "101,102,4";
	
	var inputs = [];
	var startIndex = (pageNumber - 1) + "0";
	inputs.push('custTypeId=' + custTypeId);
	inputs.push('custNameId=' + custNameId);
	inputs.push('fromDate=' + txtFdate);
	inputs.push('toDate=' + txtTdate);
	inputs.push('testStatus=' + testStatus);
	inputs.push('searchBy=' + searchBy);
	inputs.push('startIndex=' +startIndex);
	inputs.push('emergencyFlag=' +emergencyFlag);
	inputs.push('unitId=' + encodeURIComponent(unitId));
	inputs.push('userId=' + encodeURIComponent(userId));
	inputs.push('userType=' + encodeURIComponent(userType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/b2BPaginationOnSearch",
		error : function() {
			alert("error");
		},
		success : function(r) {
			if(callFrom == "collection")
				setPatientTemp(r, "b2bCollection", "");
			else if(callFrom == "collected")
				setPatientTemp(r, "b2bCollected", "");
			else if(callFrom == "rejected")
				setPatientTemp(r, "b2bRejected", "");
			else if(callFrom == "assign")
				setPatientTemp(r, "b2bAssign", "");
			else if(callFrom == "assigned")
				setPatientTemp(r, "b2bAssigned", "");
	        
	        if(callFrom == "collection")
	        	$('#collectionNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "collected")
	    		$('#collectedNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "rejected")
	    		$('#rejectedNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "assign")
	    		$('#sampleAssignNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "assigned")
	    		$('#sampleAssignedNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
 		},
	});	
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-09-2020
 * @comment B2B Patient Pagination On Search Next Button.
************************************************************/
function b2BNextPaginationOnSearch(currentIndex, numberOfPages, callFrom){
	var displayPagination = currentIndex + 5;
	var numberOfRows = '';
	numberOfRows  = numberOfRows + '<li class="previous" onclick="b2BPreviousPaginationOnSearch('+currentIndex+','+Math.round(numberOfPages)+',\''+callFrom+'\');"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	if(numberOfPages<displayPagination){
		displayPagination = numberOfPages + 1;
	}
	for(var j = currentIndex; j < displayPagination; j++){
		numberOfRows +='<li onclick="b2BPaginationOnSearch('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\')"><a>'+j+'</a></li>';
	}
	if(numberOfPages > displayPagination){
		numberOfRows +='<li class="next" onclick="b2BNextPaginationOnSearch('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	}
	
	if(callFrom == "collection")
		$('#collectionPagination').html(numberOfRows);
	else if(callFrom == "collected")
		$('#collectedPagination').html(numberOfRows);
	else if(callFrom == "rejected")
		$('#rejectedPagination').html(numberOfRows);
	else if(callFrom == "assign")
		$('#sampleAssignPagination').html(numberOfRows);
	else if(callFrom == "assigned")
		$('#sampleAssignedPagination').html(numberOfRows);
	
	b2BPaginationOnSearch(currentIndex, numberOfPages, callFrom);
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-09-2020
 * @comment B2B Patient Pagination On Search Previous Button.
************************************************************/
function b2BPreviousPaginationOnSearch(currentIndex, numberOfPages, callFrom){
	var displayPagination = currentIndex - 5;
	var numberOfRows = '';
	if(currentIndex > 6){
		numberOfRows +='<li class="previous" onclick="b2BPreviousPaginationOnSearch('+displayPagination+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	}
	for(var j = displayPagination; j < currentIndex; j++){
		numberOfRows +='<li onclick="b2BPaginationOnSearch('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\')"><a>'+j+'</a></li>';
	}
		numberOfRows +='<li class="next" onclick="b2BPaginationOnSearch('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	
		if(callFrom == "collection")
			$('#collectionPagination').html(numberOfRows);
		else if(callFrom == "collected")
			$('#collectedPagination').html(numberOfRows);
		else if(callFrom == "rejected")
			$('#rejectedPagination').html(numberOfRows);
		else if(callFrom == "assign")
			$('#sampleAssignPagination').html(numberOfRows);
		else if(callFrom == "assigned")
			$('#sampleAssignedPagination').html(numberOfRows);

		b2BPaginationOnSearch(displayPagination, numberOfPages, callFrom);
}

/******************************************************************************
 * @author Akshay K Mache
 * @since 1-09-2020
 * @comment To bulk submit samples.
 ******************************************************************************/
function bulkSubmit(){
	idList = [];
	var currentId;
	$("#collectedRecordTableBody").find('input[name="testid"]').each(function() {
		if ($(this).is(":checked")) {
			currentId = $('#' + this.id).val();
			if (currentId != 0) {
				idList.push(currentId);
			}
		}
	});
	
	idList = idList.join('-');
	if(idList.length <= 0){
		alertify.error('Please select samples to submit.');
		
		return false;
	}else{
		var r = confirm("Are you sure you want to submit this samples?");
		var testStatus = 2;
		var unitId = $("#unitId").val();
		var userId = $("#userId").val();
		
		if(r){
			var inputs = [];
			inputs.push('masterIds=' + encodeURIComponent(idList));
			inputs.push('testStatus=' + encodeURIComponent(testStatus));
			inputs.push('unitId=' + encodeURIComponent(unitId));
			inputs.push('userId=' + encodeURIComponent(userId));
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/pathologysearch/submitB2BSample",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {
					if(r){
						alertify.success("Samples Submited Successfully.");   
					}else{
						alertify.error("Something went wrong.");
					}
					getB2BCollectionsRecords('collected');
				}
			});
		}
	}
}

/********************************************************
* @author Akshay K Mache
* @since 1-09-2020
* @comment To show reject Sample pop up.
*********************************************************/
function rejectSamplePopup(masterId, callFrom, sampleTypeId){
	if(callFrom == "collection")
		$('#collectionMasterId').val(masterId);
	else if(callFrom == "collected")
		$('#collectedMasterId').val(masterId);
	
	$("#rejectPopup").modal('show');
	getTestReasonname("R", sampleTypeId);
}

/******************************************************************************
 * @author Akshay K Mache
 * @since 2-09-2020
 * @comment To reject collection & Collected samples.
 ******************************************************************************/
function rejectSample(callFrom){
	var masterIds = 0;
	var reason = $("#testReasonIDList").val();
	var testStatus = 4;
	var rejectedFrom = 0;
	var unitId = $("#unitId").val();
	var userId = $("#userId").val();
	
	if(callFrom == "collection"){
		masterIds = $('#collectionMasterId').val();
		rejectedFrom = 101;
	}else if(callFrom == "collected"){
		masterIds = $('#collectedMasterId').val();
		rejectedFrom = 102;
	}
	
	if (reason == "" || reason == null	|| reason == undefined || reason == "0") {
		alert("please select rejection reason.");
		return false;
	}
	
	var r = confirm("Are you sure you want to reject this sample?");
	if(r){
		var inputs = [];
		inputs.push('masterIds=' + encodeURIComponent(masterIds));
		inputs.push('testStatus=' + encodeURIComponent(testStatus));
		inputs.push('reason=' + encodeURIComponent(reason));
		inputs.push('rejectedFrom=' + encodeURIComponent(rejectedFrom));
		inputs.push('unitId=' + encodeURIComponent(unitId));
		inputs.push('userId=' + encodeURIComponent(userId));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/pathologysearch/rejectB2BSample",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				closeRejectPopup(callFrom);
				if(r){
					alertify.success("Sample rejected Successfully.");   
				}else{
    				alertify.error("Something went wrong.");
    			}
				
				if(callFrom == "collection")
					getB2BCollectionsRecords('collection');
				else if(callFrom == "collected")
					getB2BCollectionsRecords('collected');
			}
		});
	}
}

/******************************************************************************
 * @author Akshay K Mache
 * @since 1-09-2020
 * @comment To hide reject sample pop up.
 ******************************************************************************/
function closeRejectPopup(callFrom)
{
	$("#rejectPopup").modal('hide');
}

/******************************************************************************
 * @author Akshay K Mache
 * @since 2-09-2020
 * @comment To un-reject Collection & Collected sample.
 ******************************************************************************/
function unrejectSample(masterIds, callFrom){
	var testStatus = 0;
	if(callFrom == "collection")
		testStatus = 101;
	else if(callFrom == "collected")
		testStatus = 102;
	
	var r = confirm("Are you sure you want to unreject this sample?");
	var unitId = $("#unitId").val();
	if (r) {
		var inputs = [];
		inputs.push('masterIds=' + encodeURIComponent(masterIds));
		inputs.push('testStatus=' + encodeURIComponent(testStatus));
		inputs.push('unitId=' + encodeURIComponent(unitId));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/pathologysearch/unrejectB2BSample",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				if(r){
					alertify.success("Sample unrejected Successfully.");   
				}else{
    				alertify.error("Something went wrong.");
    			}
				
				getB2BCollectionsRecords('rejected');
			}
		});
	}
}

/******************************************************************************
 * @author Akshay K Mache
 * @since 3-09-2020
 * @comment To drop reject sample.
 ******************************************************************************/
function dropSample(masterIds){
	var r = confirm("Are you sure you want to drop this sample.");
	var userId = $("#userId").val();
	if(!r){
		return false;
	}else{
		var inputs = [];
		inputs.push('masterIds=' + encodeURIComponent(masterIds));
		inputs.push('userId=' + encodeURIComponent(userId));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/pathologysearch/dropB2BSample",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				if(r){
					alertify.success("Sample droped Successfully.");   
				}else{
    				alertify.error("Something went wrong.");
    			}
				getB2BCollectionsRecords('rejected');
			}
		});
	}
}

/******************************************************************************
 * @author Akshay K Mache
 * @since 3-09-2020
 * @comment To get Emergency Flag Wise B2B Collection, Collected & Rejected Samples..
 ******************************************************************************/
function toggleSwitch(id, callFrom) {
	var sel = $("#" + id).data('title');
	var tog = $("#" + id).data('toggle');
	
	$('#' + tog).val(sel);
	$('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]')
			.removeClass('active').addClass('notActive');
	$('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass(
			'notActive').addClass('active');

	setTimeout(function() {
		if(callFrom == "collection"){
			getB2BCollectionsRecords("collection");
		}else if(callFrom == "collected"){
			getB2BCollectionsRecords("collected");
		}else if(callFrom == "rejected"){
			getB2BCollectionsRecords("rejected");
		}else if(callFrom == "runnerTransfer"){
			getB2BAsssignAndTransferRecords("runnerTransfer");
		}else if(callFrom == "assign"){
			var tabId =  $("#tabId li.active").attr('id');
			if(tabId == "assignSample")
				getB2BAsssignAndTransferRecords("assign");
			else if(tabId == "assignedSample")
				getB2BAsssignAndTransferRecords("assigned");
		}
	}, 500);
}

/******************************************************************************
 * @author Akshay K Mache
 * @since 3-09-2020
 * @comment To set pagination template on search functionality.
 ******************************************************************************/
function setB2BPaginationTemplate(r, callFrom){
	if(callFrom == "collection"){
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
				numberOfRows +="<li class='page-item active' id="+index+" onclick='b2BPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}else{
				numberOfRows +="<li class='page-item' id="+index+" onclick='b2BPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}
			index = index + 1;
		}
		
		if(numberOfPages > 5){
			numberOfRows +="<li class='page-item' onclick='b2BNextPaginationOnSearch("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
	
		if(count == 0)
			$('#collectionNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#collectionNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#collectionJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='collectionPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='b2BJumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \"search\");'>Go</button></a></li>");
		}
		$('#collectionPagination').html(numberOfRows);
	}else if(callFrom == "collected"){
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
				numberOfRows +="<li class='page-item active' id="+index+" onclick='b2BPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}else{
				numberOfRows +="<li class='page-item' id="+index+" onclick='b2BPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='page-item' onclick='b2BNextPaginationOnSearch("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#collectedNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#collectedNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#collectedJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='collectedPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='b2BJumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \"search\");'>Go</button></a></li>");
		}
		$('#collectedPagination').html(numberOfRows);
	}else if(callFrom == "rejected"){
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
				numberOfRows +="<li class='page-item active' id="+index+" onclick='b2BPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}else{
				numberOfRows +="<li class='page-item' id="+index+" onclick='b2BPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='page-item' onclick='b2BNextPaginationOnSearch("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#rejectedNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#rejectedNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#rejectedJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='rejectedPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='b2BJumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \"search\");'>Go</button></a></li>");
		}
		$('#rejectedPagination').html(numberOfRows);
	}else if(callFrom == "assign"){
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
				numberOfRows +="<li class='page-item active' id="+index+" onclick='b2BAssignAndTransferPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}else{
				numberOfRows +="<li class='page-item' id="+index+" onclick='b2BAssignAndTransferPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='page-item' onclick='b2BAssignAndTransferNextPaginationOnSearch("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#sampleAssignNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#sampleAssignNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#sampleAssignJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='sampleAssignPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='b2BJumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \"search\");'>Go</button></a></li>");
		}
		$('#sampleAssignPagination').html(numberOfRows);
	}else if(callFrom == "assigned"){
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
				numberOfRows +="<li class='page-item active' id="+index+" onclick='b2BAssignAndTransferPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}else{
				numberOfRows +="<li class='page-item' id="+index+" onclick='b2BAssignAndTransferPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='page-item' onclick='b2BAssignAndTransferNextPaginationOnSearch("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#sampleAssignedNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#sampleAssignedNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#sampleAssignedJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='sampleAssignedPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='b2BJumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \"search\");'>Go</button></a></li>");
		}
		$('#sampleAssignedPagination').html(numberOfRows);
	}else if(callFrom == "runnerTransfer"){
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
				numberOfRows +="<li class='page-item active' id="+index+" onclick='b2BAssignAndTransferPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}else{
				numberOfRows +="<li class='page-item' id="+index+" onclick='b2BAssignAndTransferPaginationOnSearch("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='page-item' onclick='b2BAssignAndTransferNextPaginationOnSearch("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\");'><a data-toggle='tab'><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#runnerTransferNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#runnerTransferNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#runnerTransferJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='runnerTransferPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='b2BJumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \"search\");'>Go</button></a></li>");
		}
		$('#runnerTransferPagination').html(numberOfRows);
	}
}

/******************************************************************************
 * @author Akshay K Mache
 * @since 3-09-2020
 * @comment To Jump to specific page number.
 ******************************************************************************/
function b2BJumpToPage(numberOfPages, callFrom, type){
	var pageNo = 0;
	
	if(callFrom == "collection")
		pageNo = $("#collectionPageNumber").val();
	else if(callFrom == "collected")
		pageNo = $("#collectedPageNumber").val();
	else if(callFrom == "rejected")
		pageNo = $("#rejectedPageNumber").val();
	else if(callFrom == "assign")
		pageNo = $("#sampleAssignPageNumber").val();
	else if(callFrom == "assigned")
		pageNo = $("#sampleAssignedPageNumber").val();
	else if(callFrom == "runnerTransfer")
		pageNo = $("#runnerTransferPageNumber").val();
	
	if(callFrom == "collection" || callFrom == "collected" || callFrom == "rejected"){
		if(pageNo <= numberOfPages){
			if(type == "onload")
				b2BPagination(pageNo, numberOfPages, callFrom);
			else if(type == "search")
				b2BPaginationOnSearch(pageNo, numberOfPages, callFrom);
		}else{
			alert("Invalid page number.");
		}
	}else{
		if(pageNo <= numberOfPages){
			if(type == "onload")
				b2BAssignAndTransferPagination(pageNo, numberOfPages, callFrom);
			else if(type == "search")
				b2BAssignAndTransferPaginationOnSearch(pageNo, numberOfPages, callFrom);
		}else{
			alert("Invalid page number.");
		}
	}
	
	if(callFrom == "collection")
		$("#collectionPageNumber").val("0");
	else if(callFrom == "collected")
		$("#collectedPageNumber").val("0");
	else if(callFrom == "rejected")
		$("#rejectedPageNumber").val("0");
	else if(callFrom == "assign")
		$("#sampleAssignPageNumber").val("0");
	else if(callFrom == "assigned")
		$("#sampleAssignedPageNumber").val("0");
}

/******************************************************************************
 * @author Akshay K Mache
 * @since 3-09-2020
 * @comment To validate number.
 ******************************************************************************/
function validateNumber(evt){
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 32 && (charCode < 48 || charCode > 57)) {
		alert("Enter only numbers");
	    return false;
	}
	return true;
}

/******************************************************************************
 * @author Akshay K Mache
 * @since 3-09-2020
 * @comment To validate number.
 ******************************************************************************/
function getAllCustomerTypes() {
	var userType = $("#userType").val();
	var userCustomerType = $("#userCustomerType").val();
	
	var inputs = [];
	inputs.push('userCustomerType=' + encodeURIComponent(userCustomerType));
	inputs.push('userType=' + encodeURIComponent(userType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/b2bSamples/getCustomerTypes",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			/*var custListTemp = custListTemp	+ "<option value='0'>--Select Customer Type--</option>";
			
			for (var i = 0; i < response.lstCustomerType.length; i++) {
				
				custListTemp = custListTemp + "<option value="
						+ response.lstCustomerType[i].id + " data-name=" + response.lstCustomerType[i].id + ">"
						+ response.lstCustomerType[i].custType+ "</option>";
			}
			$("#"+id).html(custListTemp);
			$("#"+id).select2();*/
		}
	});
}

/******************************************************************************
 * @author Akshay K Mache
 * @since 3-09-2020
 * @comment To validate number.
 ******************************************************************************/
function getCustomerNames(typeSelectId,nameSelectId) {
	var	customerType = $("#"+typeSelectId).val();
	var userCustomerId = $("#userCustomerId").val();
	var userType = $("#userType").val();
	var inputs = [];	
 	inputs.push("customerType=" + customerType);
 	inputs.push("userCustomerNameId=" + userCustomerId);
 	inputs.push("userType=" + userType);
 	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data	: str + "&reqType=AJAX",
		url : "ehat/b2bSamples/getCustomerNames",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			/*var custListTemp = custListTemp	+ "<option value='0'>--Select Customer--</option>";
			
			for (var i = 0; i < response.businessMasterDto.length; i++) {
				
				custListTemp = custListTemp + "<option value="
						+ response.businessMasterDto[i].id + " data-name=" + response.businessMasterDto[i].id + ">"
						+ response.businessMasterDto[i].name+ "</option>";
			}
			$("#"+nameSelectId).html(custListTemp);
			$("#"+nameSelectId).select2();*/
		}
	});
}

/**********************************
 * @author Akshay Mache
 * @since 28/09/2020
 * @comment To get all Lab Patches
***********************************/
function getAllPatches(){
	var unitId = $('#unitId').val();
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/pathologysearch/getAllPatches",
		data :{
			unitId : unitId
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(response) {
			var dropDownList = dropDownList	+ "<option value='0'>Select Patch</option>";
			for (var i = 0; i < response.labPatchList.length; i++) {
				
				dropDownList = dropDownList + "<option value="
						+ response.labPatchList[i].patchLabs + " data-name=" + response.labPatchList[i].patchLabs + ">"
						+ response.labPatchList[i].patchName+ "</option>";
			}
			$("#patchId").html(dropDownList);
			$("#patchId").select2();
		}
	});	
}

/*******************************************
 * @author Akshay Mache
 * @since 29/10/2020
 * @comment To get all Runner Boys by Patch.
********************************************/
function getRunnerBoysByPatch(callFrom){
	var patchId = $("#patchId").val();
	var unitId = $("#unitId").val();

	var inputs = [];	
 	inputs.push("patchId=" + patchId);
 	inputs.push("unitId=" + unitId);
 	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data	: str + "&reqType=AJAX",
		url : "ehat/pathologysearch/getRunnerBoysByPatch",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			var dropDownList = "";
			if(callFrom == "assign"){
				dropDownList = dropDownList + "<option value='0'>Select Runner Boy</option>";
			}else{
				dropDownList = dropDownList	+ "<option value='0'>Select Transferrer</option>";
			}
			
			for (var i = 0; i < response.listDoctorDetails.length; i++) {
				
				dropDownList = dropDownList + "<option value="
						+ response.listDoctorDetails[i].user_ID + " data-name=" + response.listDoctorDetails[i].user_ID + ">"
						+ response.listDoctorDetails[i].user_Name+ "</option>";
			}
			if(callFrom == "assign"){
				$("#runnerBoyId").html(dropDownList);
				$("#runnerBoyId").select2();
			}else{
				$("#runnersList").val(JSON.stringify(response));
				$("#transferrerId").html(dropDownList);
				$("#transferrerId").select2();
			}
		}
	});
}

/******************************************************
 * @author Akshay Mache
 * @since 29/10/2020
 * @comment To assign samples to particular runner boy.
*******************************************************/
function assignSamples(){
	var runnerBoyId = $("#runnerBoyId").val();
	
	if(runnerBoyId == 0){
		alertify.error('Please select runner boy first.');
		
		return false;
	}
	var idList = [];
	var currentId;
	$("#sampleAssignTableBody").find('input[name="testid"]').each(function() {
		if ($(this).is(":checked")) {
			currentId = $('#' + this.id).val();
			if (currentId != 0) {
				idList.push(currentId);
			}
		}
	});
	idList = idList.join('-');

	if(idList.length <= 0){
		alertify.error('Please select samples to assign.');
		
		return false;
	}else{
		var r = confirm("Are you sure you want to assign this samples?");
		var testStatus = 101;
		var unitId = $("#unitId").val();
		var userId = $("#userId").val();
		
		if(r){
			var inputs = [];
			inputs.push('masterIds=' + encodeURIComponent(idList));
			inputs.push('testStatus=' + encodeURIComponent(testStatus));
			inputs.push('unitId=' + encodeURIComponent(unitId));
			inputs.push('userId=' + encodeURIComponent(userId));
			inputs.push('runnerBoyId=' + encodeURIComponent(runnerBoyId));
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/pathologysearch/assignB2BSamples",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {
					if(r){
						alertify.success("Samples Assigned Successfully.");
					}else{
						alertify.error("Something went wrong.");
					}
					//getB2BCollectionsRecords('assign');
					getB2BAsssignAndTransferRecords('assign');
					$("#patchId").select2('val',"0");
					$("#runnerBoyId").select2('val',"0");
				}
			});
		}
	}
}

function getAssignedSamplesByRunnerBoy(){
	var runnerBoyId = $('#runnerBoyFilter').val();
	var testStatus = "101,102,4";
	var emergencyFlag = $("#emergencyFlag").val();
	var unitId = $("#unitId").val();
	var userType = $("#userType").val();
	var userCustomerType = $("#userCustomerType").val();
	var userCustomerId = $("#userCustomerId").val();
	
	if(runnerBoyId == -1 || runnerBoyId == "-1")
		return false;
	
	var inputs = [];
	inputs.push('emergencyFlag=' + encodeURIComponent(emergencyFlag));
	inputs.push('runnerBoyId=' + encodeURIComponent(runnerBoyId));
	inputs.push('testStatus=' + encodeURIComponent(testStatus));
	inputs.push('unitId=' + encodeURIComponent(unitId));
	inputs.push('userType=' + encodeURIComponent(userType));
	inputs.push('userCustomerType=' + encodeURIComponent(userCustomerType));
	inputs.push('userCustomerId=' + encodeURIComponent(userCustomerId));
	var str = inputs.join('&');	
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/getB2BSamplesByRunnerBoy",
		error : function() {
			alert("error");
		},
		success : function(r) {
			setPatientTemp(r, "b2bAssigned", "");
		}
	});
}

/*********************************
 * @author Akshay Mache
 * @since 29/10/2020
 * @comment To get all Runner Boys
**********************************/
function getAllRunnerBoys(){
	var unitId = $('#unitId').val();
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/pathologysearch/getAllRunnerBoys",
		data :{
			unitId : unitId
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(response) {
			var transferrerList = transferrerList + "<option value='0'>Select Transferrer</option>";
			var transfereeList = transfereeList + "<option value='0'>Select Transferee</option>";
			var dropDownList = "";//
			for (var i = 0; i < response.listDoctorDetails.length; i++) {
				
				dropDownList = dropDownList + "<option value="
						+ response.listDoctorDetails[i].user_ID + " data-name=" + response.listDoctorDetails[i].user_ID + ">"
						+ response.listDoctorDetails[i].user_Name+ "</option>";
			}
			
			transferrerList = transferrerList + dropDownList;
			transfereeList = transfereeList + dropDownList;
			
			$("#transferrerId").html(transferrerList);
			$("#transferrerId").select2();
			
			$("#transfereeId").html(transfereeList);
			$("#transfereeId").select2();
		}
	});
}

/********************************************************
* @author Akshay Mache
* @since 01-09-2020
* @comment To Accept B2B Collected Sample. 
*********************************************************/
function unassignSample(masterIds){
    var r = confirm("Are you sure you want to unassign this sample?");
    var testStatus = 112;
    var unitId = $("#unitId").val();
	var userId = $("#userId").val();
	
    if(r){
    	var inputs = [];
    	inputs.push('masterIds=' + encodeURIComponent(masterIds));
    	inputs.push('testStatus=' + encodeURIComponent(testStatus));
    	inputs.push('unitId=' + encodeURIComponent(unitId));
		inputs.push('userId=' + encodeURIComponent(userId));
    	var str = inputs.join('&');
    	jQuery.ajax({
    		async : true,
    		type : "POST",
    		data : str + "&reqType=AJAX",
    		url : "ehat/pathologysearch/unassignB2BSample",
    		timeout : 1000 * 60 * 5,
    		catche : false,
    		error : function() {
    			alert('Network Issue!');
    		},
    		success : function(r) {
    			if(r){
    				alertify.success("Sample Unassigned Successfully.");   
    			}else{
    				alertify.error("Something went wrong.");
    			}
    			//getB2BCollectionsRecords('assigned');
    			getB2BAsssignAndTransferRecords('assigned');
    		}
    	});
    }
}

function getTransferee(){
	var transferrerId = $("#transferrerId").val(); 
	var data = $("#runnersList").val();
	var response = JSON.parse(data)
	var dropDownList = dropDownList	+ "<option value='0'>Select Transferee</option>";
	for (var i = 0; i < response.listDoctorDetails.length; i++) {
		if(response.listDoctorDetails[i].user_ID != transferrerId){
			dropDownList = dropDownList + "<option value="
				+ response.listDoctorDetails[i].user_ID + " data-name=" + response.listDoctorDetails[i].user_ID+ ">"
				+ response.listDoctorDetails[i].user_Name+ "</option>";
		}
	}
	
	$("#transfereeId").html(dropDownList);
	$("#transfereeId").select2();
}

function getB2BSamplesByRunnerBoy(){
	var runnerBoyId = $("#transferrerId").val();
	var testStatus = "101";
	var emergencyFlag = $("#emergencyFlag").val();
	var unitId = $("#unitId").val();
	var userType = $("#userType").val();
	var userCustomerType = $("#userCustomerType").val();
	var userCustomerId = $("#userCustomerId").val();
	
	if(runnerBoyId == -1 || runnerBoyId == "-1")
		return false;
	
	var inputs = [];
	inputs.push('emergencyFlag=' + encodeURIComponent(emergencyFlag));
	inputs.push('runnerBoyId=' + encodeURIComponent(runnerBoyId));
	inputs.push('testStatus=' + encodeURIComponent(testStatus));
	inputs.push('unitId=' + encodeURIComponent(unitId));
	inputs.push('userType=' + encodeURIComponent(userType));
	inputs.push('userCustomerType=' + encodeURIComponent(userCustomerType));
	inputs.push('userCustomerId=' + encodeURIComponent(userCustomerId));
	var str = inputs.join('&');	
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/getB2BTransferedSamplesByRunnerBoy",
		error : function() {
			alert("error");
		},
		success : function(r) {
			setPatientTemp(r, "b2bRunnerTransfer", "");
		}
	});
}

function transferSamples(){
	var transferrerId = $("#transferrerId").val();
	var transfereeId = $("#transfereeId").val();
	var fDate = $.trim($("#fDate").val());
	//var days = $.trim($("#days").val());
	var days = 0;
	var unitId = $("#unitId").val();
	var userId = $("#userId").val();
	var userCustomerType = $("#userCustomerType").val();
	var userCustomerId = $("#userCustomerId").val();
	
	var idList = [];
	var currentId;
	$("#runnerWiseTableBody").find('input[name="testid"]').each(function() {
		if ($(this).is(":checked")) {
			currentId = $('#' + this.id).val();
			if (currentId != 0) {
				idList.push(currentId);
			}
		}
	});
	idList = idList.join("-");
	if(transferrerId == "0"){
		alertify.error("Please Select Transferrer.");
		return false;
	}else if(transfereeId == "0"){
		alertify.error("Please Select Transferee.");
		return false;
	}
	/*
	else if(fDate == ""){
		alertify.error("Please Enter From Date.");
		return false;
	}else if(days == ""){
		alertify.error("Please Enter Days.");
		return false;
	}
	*/
	else if(idList.length <= 0){
		alertify.error('Please select samples to assign.');
		return false;
	}else{
		var r = confirm("Are you sure you want to transfer those samples?");
		if(r){
			var inputs = [];
			inputs.push('masterIds=' + encodeURIComponent(idList));
			inputs.push('transferrerId=' + encodeURIComponent(transferrerId));
			inputs.push('transfereeId=' + encodeURIComponent(transfereeId));
			inputs.push('fDate=' + encodeURIComponent(fDate));
			inputs.push('days=' + encodeURIComponent(days));
			inputs.push('unitId=' + encodeURIComponent(unitId));
			inputs.push('transferedBy=' + encodeURIComponent(userId));
			inputs.push('userCustomerType=' + encodeURIComponent(userCustomerType));
			inputs.push('userCustomerId=' + encodeURIComponent(userCustomerId));
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/pathologysearch/transferB2BSamples",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert('Network Issue!');
				},
				success : function(r) {
					if(r == 1){
						alertify.success("Samples Transfered Successfully.");
					}else{
						alertify.error("Something went wrong.");
					}
					//getB2BCollectionsRecords('runnerTransfer');
					getB2BSamplesByRunnerBoy();
				}
			});
		}
	}
}

/*******************************************************************************
 * @author Akshay Mache
 * @since 01-09-2020
 * @comment To get B2B Collection and Collected Records.
 ******************************************************************************/
function getB2BAsssignAndTransferRecords(callFrom){
	var testStatus = 0;
	if(callFrom == "assign")
		testStatus = 112;
	else if(callFrom == "assigned")
		testStatus = "101,102,4";
	else if(callFrom == "runnerTransfer")
		testStatus = 101;
	
	var emergencyFlag = $("#emergencyFlag").val();
	var unitId = $("#unitId").val();
	var userType = $("#userType").val();
	var userCustomerType = $("#userCustomerType").val();
	var userCustomerId = $("#userCustomerId").val();
	var userId = $("#userId").val();
	var startIndex = 0;
	
	var inputs = [];
	inputs.push('emergencyFlag=' + encodeURIComponent(emergencyFlag));
	inputs.push('startIndex=' + encodeURIComponent(startIndex));
	inputs.push('testStatus=' + encodeURIComponent(testStatus));
	inputs.push('unitId=' + encodeURIComponent(unitId));
	inputs.push('userType=' + encodeURIComponent(userType));
	inputs.push('userId=' + encodeURIComponent(userId));
	inputs.push('userCustomerType=' + encodeURIComponent(userCustomerType));
	inputs.push('userCustomerId=' + encodeURIComponent(userCustomerId));
	var str = inputs.join('&');	
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/getB2BAsssignAndTransferRecords",
		error : function() {
			alert("error");
		},
		success : function(r) {
			if(callFrom == "assign")
				setPatientTemp(r, "b2bAssign", "");
			else if(callFrom == "assigned")
				setPatientTemp(r, "b2bAssigned", "");
			else if(callFrom == "runnerTransfer")
				setPatientTemp(r, "b2bRunnerTransfer", "");
			
			onloadPaginationTemplate(r, callFrom);
		}
	});
}

/***********************************************************
 * @author Akshay Mache
 * @since  02-09-2020
 * @comment B2B Patient Auto-Suggestion.
************************************************************/
function b2BAssignAndTransferAutoSuggestion(patientId, type) {
	var resultData = [];
	var patient = $("input#" + patientId).val();
	var patientTypeId = $('#patSearchType').val();
	var unitId = $("#unitId").val();
	var userType = $("#userType").val();
	var userCustomerType = $("#userCustomerType").val();
	var userCustomerId = $("#userCustomerId").val();
	
	var testStatus = 0;
	var tabId = "";
	var assignCallFrom = "";
	if(type == "assign"){
		tabId =  $("#tabId li.active").attr('id');
		if(tabId == "assignSample"){
			testStatus = 112;
			assignCallFrom = "assign";
		}else if(tabId == "assignedSample"){
			testStatus = "101,102,4";
			assignCallFrom = "assigned";
		}
		type = assignCallFrom;
	}else if(type == "runnerTransfer"){
		testStatus = 101;
	}
	if(patientTypeId == 2 || patientTypeId == 4){
		/*var charCode = (evt.which) ? evt.which : evt.keyCode;
		   if (charCode > 32 && (charCode < 48 || charCode > 57)) {
			   alert("Enter only numbers");
			   $('#byName').val("");
		    }*/
		//return false;
	}
	else if(patientTypeId == 0){
		alert("First select patient type.");
		$('#byName').val("");
		return false;
	}

	var searchBy = "";
	if(patientTypeId == 1){
		searchBy = "byName";
	}else if(patientTypeId == 2){
		searchBy = "byId";
	}else if(patientTypeId == 3){
		searchBy = "byBarcode";
	}else if(patientTypeId == 4){
		searchBy = "byMobile";
	}
	
	if (patient == "" || patient == null || patient == "null" || patient == undefined) {
		alert("Please enter search value");
		$("input#" + patientId).focus();
		return false;
	}

	var emergencyFlag = $("#emergencyFlag").val();
	
	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(patient));
	inputs.push('searchBy=' + encodeURIComponent(searchBy));
	inputs.push('testStatus=' + testStatus);
	inputs.push('emergencyFlag=' + emergencyFlag);
	inputs.push('unitId=' + encodeURIComponent(unitId));
	inputs.push('userType=' + encodeURIComponent(userType));
	inputs.push('userCustomerType=' + encodeURIComponent(userCustomerType));
	inputs.push('userCustomerId=' + encodeURIComponent(userCustomerId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/b2BAssignAndTransferAutoSuggestion",
		cache : false,
		success : function(response) {
			var template = "";
			for ( var j = 0; j < response.labSampleWiseMasterDtoList.length; j++) {
				var arrValue = response.labSampleWiseMasterDtoList[j].patientId +"-"+response.labSampleWiseMasterDtoList[j].patientname;
				var idValue = response.labSampleWiseMasterDtoList[j].patientId;
				var name = response.labSampleWiseMasterDtoList[j].patientname;
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
		}
	});
	function displayResult(item) {
		var res = item.text.split('-');
		var patId = res[0];
		var patientName = res[1];
		getB2BAssignAndTransferPatientById(patId, type, emergencyFlag, testStatus);
		$("input#" + patientId).val(patientName);
	}
}

/***********************************************************
 * @author Akshay Mache
 * @since  02-09-2020
 * @comment Get B2B Patient by ID.
************************************************************/
function getB2BAssignAndTransferPatientById(id, type, emergencyFlag, testStatus) {
	var emergencyFlag = $("#emergencyFlag").val();
	var unitId = $("#unitId").val();
	var userType = $("#userType").val();
	var userCustomerType = $("#userCustomerType").val();
	var userCustomerId = $("#userCustomerId").val();
	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('emergencyFlag=' + emergencyFlag);
	inputs.push('testStatus=' + testStatus);
	inputs.push('unitId=' + encodeURIComponent(unitId));
	inputs.push('userType=' + encodeURIComponent(userType));
	inputs.push('userCustomerType=' + encodeURIComponent(userCustomerType));
	inputs.push('userCustomerId=' + encodeURIComponent(userCustomerId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/getB2BAssignAndTransferPatientById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			if(type == "runnerTransfer"){
				setPatientTemp(response, "b2bRunnerTransfer", "");
			}else if(type == "assign"){
				setPatientTemp(response, "b2bAssign", "");
			}else if(type == "assigned"){
				setPatientTemp(response, "b2bAssigned", "");
			}
			$('#byName').val("");
		}
	});
}

/***********************************************************
 * @author Akshay Mache
 * @since  02-09-2020
 * @comment To search B2B Collection, Collected & Rejected Samples.
************************************************************/
function searchB2BAssignAndTransferRecords(callFrom){
	var testStatus = 0;
	var tabId = "";
	var assignCallFrom = "";
	if(callFrom == "runnerTransfer")
		testStatus = 101;
	else if(callFrom == "assign"){
		tabId =  $("#tabId li.active").attr('id');
		if(tabId == "assignSample"){
			testStatus = 112;
			assignCallFrom = "assign";
		}else if(tabId == "assignedSample"){
			testStatus = "101,102,4";
			assignCallFrom = "assigned";
		}
	}
	
	var custTypeId =  $.trim($("#custTypeForSearch").val());
	var custNameId =  $.trim($("#custNameForSearch").val());
	var txtFdate = $.trim($("#txtFdate").val());
	var txtTdate = $.trim($("#txtTdate").val());
	var startIndex = 0;
	var emergencyFlag = $("#emergencyFlag").val();
	var unitId = $("#unitId").val();
	var userType = $("#userType").val();
		
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
			alert("Please select both date to search.");
			return false;
		}else{
			searchBy = "byDate";
		}
	}else if(custTypeId != 0 && custNameId == 0){
		alert("Please select customer name.");
		return false;
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
	inputs.push('testStatus=' + testStatus);
	inputs.push('searchBy=' + searchBy);
	inputs.push('startIndex=' +startIndex);
	inputs.push('emergencyFlag=' +emergencyFlag);
	inputs.push('unitId=' + encodeURIComponent(unitId));
	inputs.push('userType=' + encodeURIComponent(userType));
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/searchB2BAssignAndTransferRecords",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#custTypeForSearch").val(0);
			$("#custNameForSearch").val(0);
			$("#txtTdate").val("");
			$("#txtFdate").val("");
			
			if(callFrom == "runnerTransfer"){
				setPatientTemp(r, "b2bRunnerTransfer", "");
				setB2BPaginationTemplate(r, callFrom);
			}else if(callFrom == "assign"){
				if(assignCallFrom == "assign"){
					setPatientTemp(r, "b2bAssign", "");
					setB2BPaginationTemplate(r, assignCallFrom);
				}else if(assignCallFrom == "assigned"){
					setPatientTemp(r, "b2bAssigned", "");
					setB2BPaginationTemplate(r, assignCallFrom);
				}
			}
		}
	});
}

/***********************************************************
 * @author Akshay Mache
 * @since  02-09-2020
 * @comment B2B Patient Pagination.
************************************************************/
function b2BAssignAndTransferPagination(pageNumber, numberOfPages, callFrom){
	var emergencyFlag = $("#emergencyFlag").val();
	var testStatus = 0;
	if(callFrom == "assign")
		testStatus = 112;
	else if(callFrom == "runnerTransfer")
		testStatus = 101;
	else if(callFrom == "assigned")
		testStatus = "101,102,4";
	
	var unitId = $("#unitId").val();
	var userType = $("#userType").val();
	var userId = $("#userId").val();
	var userCustomerType = $("#userCustomerType").val();
	var userCustomerId = $("#userCustomerId").val();
	
	var inputs = [];
	var startIndex = (pageNumber - 1) + "0";
    inputs.push('startIndex='+startIndex);
    inputs.push('testStatus='+testStatus);
    inputs.push('emergencyFlag='+emergencyFlag);
    inputs.push('unitId=' + encodeURIComponent(unitId));
	inputs.push('userType=' + encodeURIComponent(userType));
	inputs.push('userId=' + encodeURIComponent(userId));
	inputs.push('userCustomerType=' + encodeURIComponent(userCustomerType));
	inputs.push('userCustomerId=' + encodeURIComponent(userCustomerId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/b2BAssignAndTransferPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
			if(callFrom == "runnerTransfer")
				setPatientTemp(r, "b2bRunnerTransfer", "");
			else if(callFrom == "assign")
				setPatientTemp(r, "b2bAssign", "");
			else if(callFrom == "assigned")
				setPatientTemp(r, "b2bAssigned", "");
	        
	    	if(callFrom == "runnerTransfer")
	    		$('#runnerTransferNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "assign")
	    		$('#sampleAssignNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "assigned")
	    		$('#sampleAssignedNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
 		},
	});	
}

/***********************************************************
 * @author Akshay Mache
 * @since  02-09-2020
 * @comment B2B Patient Pagination Next Button.
************************************************************/
function b2BAssignAndTransferNextPagination(currentIndex, numberOfPages, callFrom){
	var displayPagination = currentIndex + 5;
	var numberOfRows = '';
	numberOfRows  = numberOfRows + '<li class="previous" onclick="b2BAssignAndTransferPreviousPagination('+currentIndex+','+Math.round(numberOfPages)+',\''+callFrom+'\');"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	if(numberOfPages<displayPagination){
		displayPagination = numberOfPages + 1;
	}
	for(var j = currentIndex; j < displayPagination; j++){
		numberOfRows +='<li onclick="b2BAssignAndTransferPagination('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\')"><a>'+j+'</a></li>';
	}
	if(numberOfPages > displayPagination){
		numberOfRows +='<li class="next" onclick="b2BAssignAndTransferNextPagination('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	}
	
	if(callFrom == "runnerTransfer")
		$('#runnerTransferPagination').html(numberOfRows);
	else if(callFrom == "assign")
		$('#sampleAssignPagination').html(numberOfRows);
	else if(callFrom == "assigned")
		$('#sampleAssignedPagination').html(numberOfRows);

	b2BAssignAndTransferPagination(currentIndex, numberOfPages, callFrom);
}

/***********************************************************
 * @author Akshay Mache
 * @since  02-09-2020
 * @comment B2B Patient Pagination Previous Button.
************************************************************/
function b2BAssignAndTransferPreviousPagination(currentIndex, numberOfPages, callFrom){
	var displayPagination = currentIndex - 5;
	var numberOfRows = '';
	if(currentIndex > 6){
		numberOfRows +='<li class="previous" onclick="b2BAssignAndTransferPreviousPagination('+displayPagination+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	}
	for(var j = displayPagination; j < currentIndex; j++){
		numberOfRows +='<li onclick="b2BAssignAndTransferPagination('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\')"><a>'+j+'</a></li>';
	}
		numberOfRows +='<li class="next" onclick="b2BAssignAndTransferNextPagination('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	
		if(callFrom == "runnerTransfer")
			$('#runnerTransferPagination').html(numberOfRows);
		else if(callFrom == "assign")
			$('#sampleAssignPagination').html(numberOfRows);
		else if(callFrom == "assigned")
			$('#sampleAssignedPagination').html(numberOfRows);
		
		b2BAssignAndTransferPagination(displayPagination, numberOfPages, callFrom);
}

/***********************************************************
 * @author Akshay Mache
 * @since  02-09-2020
 * @comment B2B Patient Pagination On Search.
************************************************************/
function b2BAssignAndTransferPaginationOnSearch(pageNumber, numberOfPages, callFrom){
	var custTypeId = $('#custTypeId').val();
	var custNameId = $('#custNameId').val();
	var txtFdate = $('#fromDate').val();
	var txtTdate = $('#toDate').val();
	var searchBy = $('#searchBy').val();
	var emergencyFlag = $("#emergencyFlag").val();
	var unitId = $("#unitId").val();
	var userType = $("#userType").val();
	
	var testStatus = 0;
	if(callFrom == "runnerTransfer")
		testStatus = 101;
	else if(callFrom == "assign")
		testStatus = 112;
	else if(callFrom == "assigned")
		testStatus = "101,102,4";
	
	var inputs = [];
	var startIndex = (pageNumber - 1) + "0";
	inputs.push('custTypeId=' + custTypeId);
	inputs.push('custNameId=' + custNameId);
	inputs.push('fromDate=' + txtFdate);
	inputs.push('toDate=' + txtTdate);
	inputs.push('testStatus=' + testStatus);
	inputs.push('searchBy=' + searchBy);
	inputs.push('startIndex=' +startIndex);
	inputs.push('emergencyFlag=' +emergencyFlag);
	inputs.push('unitId=' + encodeURIComponent(unitId));
	inputs.push('userType=' + encodeURIComponent(userType));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/b2BAssignAndTransferPaginationOnSearch",
		error : function() {
			alert("error");
		},
		success : function(r) {
			if(callFrom == "runnerTransfer")
				setPatientTemp(r, "b2bRunnerTransfer", "");
			else if(callFrom == "assign")
				setPatientTemp(r, "b2bAssign", "");
			else if(callFrom == "assigned")
				setPatientTemp(r, "b2bAssigned", "");
	        
	        if(callFrom == "runnerTransfer")
	    		$('#runnerTransferNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "assign")
	    		$('#sampleAssignNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(callFrom == "assigned")
	    		$('#sampleAssignedNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
 		},
	});	
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-09-2020
 * @comment B2B Patient Pagination On Search Next Button.
************************************************************/
function b2BAssignAndTransferNextPaginationOnSearch(currentIndex, numberOfPages, callFrom){
	var displayPagination = currentIndex + 5;
	var numberOfRows = '';
	numberOfRows  = numberOfRows + '<li class="previous" onclick="b2BAssignAndTransferPreviousPaginationOnSearch('+currentIndex+','+Math.round(numberOfPages)+',\''+callFrom+'\');"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	if(numberOfPages<displayPagination){
		displayPagination = numberOfPages + 1;
	}
	for(var j = currentIndex; j < displayPagination; j++){
		numberOfRows +='<li onclick="b2BAssignAndTransferPaginationOnSearch('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\')"><a>'+j+'</a></li>';
	}
	if(numberOfPages > displayPagination){
		numberOfRows +='<li class="next" onclick="b2BAssignAndTransferNextPaginationOnSearch('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	}
	
	if(callFrom == "runnerTransfer")
		$('#runnerTransferPagination').html(numberOfRows);
	else if(callFrom == "assign")
		$('#sampleAssignPagination').html(numberOfRows);
	else if(callFrom == "assigned")
		$('#sampleAssignedPagination').html(numberOfRows);
	
	b2BAssignAndTransferPaginationOnSearch(currentIndex, numberOfPages, callFrom);
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-09-2020
 * @comment B2B Patient Pagination On Search Previous Button.
************************************************************/
function b2BAssignAndTransferPreviousPaginationOnSearch(currentIndex, numberOfPages, callFrom){
	var displayPagination = currentIndex - 5;
	var numberOfRows = '';
	if(currentIndex > 6){
		numberOfRows +='<li class="previous" onclick="b2BAssignAndTransferPreviousPaginationOnSearch('+displayPagination+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	}
	for(var j = displayPagination; j < currentIndex; j++){
		numberOfRows +='<li onclick="b2BAssignAndTransferPaginationOnSearch('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\')"><a>'+j+'</a></li>';
	}
		numberOfRows +='<li class="next" onclick="b2BAssignAndTransferPaginationOnSearch('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	
		if(callFrom == "runnerTransfer")
			$('#runnerTransferPagination').html(numberOfRows);
		else if(callFrom == "assign")
			$('#sampleAssignPagination').html(numberOfRows);
		else if(callFrom == "assigned")
			$('#sampleAssignedPagination').html(numberOfRows);

		b2BAssignAndTransferPaginationOnSearch(displayPagination, numberOfPages, callFrom);
}