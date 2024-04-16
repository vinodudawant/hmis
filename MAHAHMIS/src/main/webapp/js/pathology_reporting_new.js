function getReportingSamples(callFrom){
	setTimeout(function() {
		searchReportingPatient(callFrom);
	}, 500);
}
/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Auto-Suggestion.
************************************************************/
function reportingPatientAutoSuggestion(patientId, type) {
	var tabId = $("#tabId li.active").attr('id');
	
	var emailStatusRadioBtn = "";
	if(tabId == "normalTabLi"){
		emailStatusRadioBtn = $("#normalEmailStatus").val();
	}else if(tabId == "abnormalTabLi"){
		emailStatusRadioBtn = $("#abnormalEmailStatus").val();
	}else if(tabId == "cAbnormalTabLi"){
		emailStatusRadioBtn = $("#cAbnormalEmailStatus").val();
	}else if(tabId == "patientPrintTabLi"){
		emailStatusRadioBtn = $("#patientprintTestEmailStatus").val();
	}
	
	$('#activeTabId').val(tabId);
	
	var resultData = [];
	var patient = $("input#" + patientId).val();
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
		$("#byName").attr("placeholder", "Type Patient Id Here");
		$('#byName').attr('onkeypress','return validateNumber(event);');//Added by amol search only number
	}else if(patientTypeId == 3){
		searchBy = "byBarcode";
		
		if (patient.length != 14) {//Added by kishor for barcode search only after enter 14 char.
			$("div#divbyName .typeahead").hide();
			return false;
		}
	}else if(patientTypeId == 4){
		searchBy = "byMobile";
		$("#byName").attr("placeholder", "Type Patient Mobile No Here");
		$('#byName').attr('onkeypress','return validateNumber(event);');//Added by amol search only number
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
	inputs.push('emailStatus=' + emailStatusRadioBtn);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/reportingPatientAutoSuggestion",
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
					getReportingPatientById(patId, type, tabId, emergencyFlag);
					$("input#" + patientId).val(patientName);
				}
			}else{
				
				alertify.error("Record not found");
			}
			/*var template = "";
			for(var j = 0; j < response.labSampleWiseMasterDtoList.length; j++) {
				var arrValue = "";
				var idValue = "";
				var name = "";
				
				//var treatmentId = 0;
				//if(tabId == "allTabLi" || tabId == "patientWiseTabLi"){
				//	treatmentId = response.labSampleWiseMasterDtoList[j].treatmentId;
				//}else{
				//	treatmentId = response.labSampleWiseMasterDtoList[j].patientId;
				//}
				
				if(searchBy == "byMobile"){
					arrValue = response.labSampleWiseMasterDtoList[j].patientId+"-"+response.labSampleWiseMasterDtoList[j].mobile +"-"+response.labSampleWiseMasterDtoList[j].patientname;
					idValue = response.labSampleWiseMasterDtoList[j].mobile;
					name = response.labSampleWiseMasterDtoList[j].patientname;
				}else if(searchBy == "byBarcode"){
					arrValue = response.labSampleWiseMasterDtoList[j].patientId+"-"+response.labSampleWiseMasterDtoList[j].barCode +"-"+response.labSampleWiseMasterDtoList[j].patientname;
					idValue = response.labSampleWiseMasterDtoList[j].barCode;
					name = response.labSampleWiseMasterDtoList[j].patientname;
				}else{
					arrValue = response.labSampleWiseMasterDtoList[j].patientId +"-"+response.labSampleWiseMasterDtoList[j].patientname;
					idValue = response.labSampleWiseMasterDtoList[j].patientId;
					name = response.labSampleWiseMasterDtoList[j].patientname;
				}
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
			}, 500);*/
		}
	});
	function displayResult(item) {
		var res = item.text.split('-');
		var patId = res[0];
		var patientName = res[1];
		getReportingPatientById(patId, type, tabId, emergencyFlag);
		$("input#" + patientId).val(patientName);
	}
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Get Phlebotomy Patient by ID.
************************************************************/
function getReportingPatientById(id, type, tabId, emergencyFlag) {
	var tab = "";
	tabId = $('#activeTabId').val();
	
	if(tabId=="normalTabLi"){
		tab = "normal";	
	}else if(tabId=="abnormalTabLi"){
		tab = "abnormal";
	}else if(tabId=="cAbnormalTabLi"){
		tab = "cAbnormal";
	}else if(tabId == "patientWiseTabLi"){
		tab = "patientWise";
	}else if(tabId == "patientPrintTabLi"){
		tab = "patientPrinttWise";
	}else{
		tab = "all";
	}
	
	var emergencyFlag = $("#emergencyFlag").val();
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
		url : "ehat/pathologysearch/getReportingPatientById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			setPatientTemp(response, type, tab);
			$('#byName').val("");
		}
	});
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment To search Phlebotomy Patient records.
************************************************************/
function searchReportingPatient(callFrom){
	var tabId = jQuery('#tabId').find('li.active').attr('id');
	var	callFromTemp = "reportingAutoSugg";

	var tab = "";
	if(tabId=="normalTabLi"){
		tab = "normal";	
		$('#reportingAllTableBody').empty();
		$('#reportingAbnormalTableBody').empty();
		$('#reportingCAbnormalTableBody').empty();
		$('#reportingPatientWiseTableBody').empty();
		$('#reportingTemplateWiseTableBody').empty();		
	}else if(tabId=="abnormalTabLi"){
		tab = "abnormal";
		$('#reportingAllTableBody').empty();
		$('#reportingNormalTableBody').empty();
		$('#reportingCAbnormalTableBody').empty();
		$('#reportingPatientWiseTableBody').empty();
		$('#reportingTemplateWiseTableBody').empty();
	}else if(tabId=="cAbnormalTabLi"){
		tab = "cAbnormal";
		$('#reportingAllTableBody').empty();
		$('#reportingNormalTableBody').empty();
		$('#reportingAbnormalTableBody').empty();
		$('#reportingPatientWiseTableBody').empty();
		$('#reportingTemplateWiseTableBody').empty();
	}else if(tabId == "patientWiseTabLi"){
		tab = "patientWise";
		$('#reportingAllTableBody').empty();
		$('#reportingNormalTableBody').empty();
		$('#reportingAbnormalTableBody').empty();
		$('#reportingCAbnormalTableBody').empty();
		$('#reportingTemplateWiseTableBody').empty();
	}else if(tabId == "templateTestTabLi"){
		tab = "templateWise";
		$('#reportingAllTableBody').empty();
		$('#reportingNormalTableBody').empty();
		$('#reportingAbnormalTableBody').empty();
		$('#reportingCAbnormalTableBody').empty();
		$('#reportingPatientWiseTableBody').empty();
	}else if(tabId == "patientPrintTabLi"){
		tab = "patientPrinttWise";
		$('#reportingAllTableBody').empty();
		$('#reportingNormalTableBody').empty();
		$('#reportingAbnormalTableBody').empty();
		$('#reportingCAbnormalTableBody').empty();
		$('#reportingTemplateWiseTableBody').empty();
	}
	else{
		tab = "all";
		$('#reportingNormalTableBody').empty();
		$('#reportingAbnormalTableBody').empty();
		$('#reportingCAbnormalTableBody').empty();
		$('#reportingPatientWiseTableBody').empty();
		$('#reportingTemplateWiseTableBody').empty();
	}
	
	var custTypeId =  $.trim($("#custTypeForSearch").val());
	var custNameId =  $.trim($("#custNameForSearch").val());
	var txtFdate = $.trim($("#txtFdate").val());
	var txtTdate = $.trim($("#txtTdate").val());
	var startIndex = 0;
	var emergencyFlag = $("#emergencyFlag").val();
	
	if(custTypeId == "0" && custNameId == "0" && txtFdate == "" && txtTdate == "") {
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

	var emailStatusRadioBtn = "";
	if(tabId == "normalTabLi"){
		emailStatusRadioBtn = $("#normalEmailStatus").val();
	}else if(tabId == "abnormalTabLi"){
		emailStatusRadioBtn = $("#abnormalEmailStatus").val();
	}else if(tabId == "cAbnormalTabLi"){
		emailStatusRadioBtn = $("#cAbnormalEmailStatus").val();
	}else if(tabId == "patientWiseTabLi"){
		emailStatusRadioBtn = $("#patientWiseEmailStatus").val();
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
	inputs.push('emailStatus=' +emailStatusRadioBtn);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/searchReportingPatient",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#custTypeForSearch").val(0);
			$("#custNameForSearch").val(0);
			setPatientTemp(r, callFromTemp, tab);
			setReportingPaginationTemplate(r, callFrom, tabId);
			//below line of code commentted by Rohit 29-08-2021 to avoid the fuzzy query
			//getRecordCountForReportingTabIndicator(txtFdate, txtTdate);
		}
	});
}

function setReportingPaginationTemplate(r, callFrom, tabId){
	if(tabId == "allTabLi"){
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
				numberOfRows +="<li onclick='reportingPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='reportingPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='reportingNextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#allNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#allNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#allJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='allPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='reportingJumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#allPagination').html(numberOfRows);
	}else if(tabId == "patientWiseTabLi"){
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
				numberOfRows +="<li onclick='reportingPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='reportingPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='reportingNextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#patientWiseNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#patientWiseNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#patientWiseJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='patientWisePageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='reportingJumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#patientWisePagination').html(numberOfRows);
	}else if(tabId == "normalTabLi"){
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
				numberOfRows +="<li onclick='reportingPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='reportingPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='reportingNextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#normalNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#normalNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#normalJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='normalPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='reportingJumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#normalPagination').html(numberOfRows);
	}else if(tabId == "abnormalTabLi"){
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
				numberOfRows +="<li onclick='reportingPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='reportingPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='reportingNextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#abnormalNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#abnormalNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#abnormalJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='abnormalPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='reportingJumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#abnormalPagination').html(numberOfRows);
	}else if(tabId == "cAbnormalTabLi"){
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
				numberOfRows +="<li onclick='reportingPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='reportingPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='reportingNextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#cAbnormalNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#cAbnormalNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#cAbnormalJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='cAbnormalPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='reportingJumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#cAbnormalPagination').html(numberOfRows);
	}else if(tabId == "patientPrintTabLi"){
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
				numberOfRows +="<li onclick='reportingPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='reportingPagination("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='reportingNextPagination("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#allNumberOfPagesPatientPrint').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#allNumberOfPagesPatientPrint').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#allJumpToPagePatientPrint').html("<li><a>Go to page <input size='4' placeholder='page #' id='allPageNumberPatientPrint' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='reportingJumpToPage("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#allPaginationPatientPrint').html(numberOfRows);
	}
}

function reportingPagination(pageNumber, numberOfPages, callFrom, tabId){
	var tab = "";
	if(tabId=="normalTabLi"){
		tab = "normal";	
	}else if(tabId=="abnormalTabLi"){
		tab = "abnormal";
	}else if(tabId=="cAbnormalTabLi"){
		tab = "cAbnormal";
	}else if(tabId == "patientWiseTabLi"){
		tab = "patientWise";
	}else{
		tab = "all";
	}
	
	var callFromTemp = "reportingAutoSugg";
	
	var custTypeId = $('#custTypeId').val();
	var custNameId = $('#custNameId').val();
	var txtFdate = $('#fromDate').val();
	var txtTdate = $('#toDate').val();
	var searchBy = $('#searchBy').val();
	var emergencyFlag = $("#emergencyFlag").val();
	
	var emailStatusRadioBtn = "";
	if(tabId == "normalTabLi"){
		emailStatusRadioBtn = $("#normalEmailStatus").val();
	}else if(tabId == "abnormalTabLi"){
		emailStatusRadioBtn = $("#abnormalEmailStatus").val();
	}else if(tabId == "cAbnormalTabLi"){
		emailStatusRadioBtn = $("#cAbnormalEmailStatus").val();
	}
	
	var inputs = [];
	var startIndex = (pageNumber - 1) + "0";
	inputs.push('custTypeId=' + custTypeId);
	inputs.push('custNameId=' + custNameId);
	inputs.push('fromDate=' + txtFdate);
	inputs.push('toDate=' + txtTdate);
	inputs.push('callFrom=' + callFrom);
	inputs.push('searchBy=' + searchBy);
	inputs.push('tabId=' + tabId);
	inputs.push('startIndex=' +startIndex);
	inputs.push('emergencyFlag=' +emergencyFlag);
	inputs.push('emailStatus=' +emailStatusRadioBtn);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/reportingPagination",
		error : function() {
			alert("error");
		},
		success : function(r) {
			
	        setPatientTemp(r, callFromTemp, tab, pageNumber);

	        if(tabId == "allTabLi")
	        	$('#allNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	        else if(tabId == "normalTabLi")
	        	$('#normalNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(tabId == "abnormalTabLi")
	    		$('#abnormalNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(tabId == "cAbnormalTabLi")
	    		$('#cAbnormalNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(tabId == "patientWiseTabLi")
	    		$('#patientWiseNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
 		},
	});	
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination Next Button.
************************************************************/
function reportingNextPagination(currentIndex, numberOfPages, callFrom, tabId){
	var displayPagination = currentIndex + 5;
	var numberOfRows = '';
	numberOfRows  = numberOfRows + '<li class="previous" onclick="reportingPreviousPagination('+currentIndex+','+Math.round(numberOfPages)+',\''+callFrom+'\',\''+tabId+'\');"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	if(numberOfPages < displayPagination){
		displayPagination = numberOfPages + 1;
	}
	for(var j = currentIndex; j < displayPagination; j++){
		numberOfRows +='<li onclick="reportingPagination('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\', \''+tabId+'\')"><a>'+j+'</a></li>';
	}
	if(numberOfPages >= displayPagination){
		numberOfRows +='<li class="next" onclick="reportingNextPagination('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\', \''+tabId+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	}
	
    if(tabId == "allTabLi")
    	$('#allPagination').html(numberOfRows);
    else if(tabId == "normalTabLi")
    	$('#normalPagination').html(numberOfRows);
	else if(tabId == "abnormalTabLi")
		$('#abnormalPagination').html(numberOfRows);
	else if(tabId == "cAbnormalTabLi")
		$('#cAbnormalPagination').html(numberOfRows);
	else if(tabId == "patientWiseTabLi")
		$('#patientWisePagination').html(numberOfRows);
		
    reportingPagination(currentIndex, numberOfPages, callFrom, tabId);
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination Previous Button.
************************************************************/
function reportingPreviousPagination(currentIndex, numberOfPages, callFrom, tabId){
	var displayPagination = currentIndex - 5;
	var numberOfRows = '';
	if(currentIndex > 6){
		numberOfRows +='<li class="previous" onclick="reportingPreviousPagination('+displayPagination+','+Math.round(numberOfPages)+',\''+callFrom+'\',\''+tabId+'\')"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	}
	for(var j = displayPagination; j < currentIndex; j++){
		numberOfRows +='<li onclick="reportingPagination('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\',\''+tabId+'\')"><a>'+j+'</a></li>';
	}
	numberOfRows +='<li class="next" onclick="reportingNextPagination('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\',\''+tabId+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	
	if(tabId == "allTabLi")
    	$('#allPagination').html(numberOfRows);
    else if(tabId == "normalTabLi")
    	$('#normalPagination').html(numberOfRows);
	else if(tabId == "abnormalTabLi")
		$('#abnormalPagination').html(numberOfRows);
	else if(tabId == "cAbnormalTabLi")
		$('#cAbnormalPagination').html(numberOfRows);
	else if(tabId == "patientWiseTabLi")
		$('#patientWisePagination').html(numberOfRows);
	
	reportingPagination(displayPagination, numberOfPages, callFrom, callType);
}

function reportingJumpToPage(numberOfPages, callFrom, tabId){
	var pageNo = 0;

	if(tabId == "allTabLi")
		pageNo = $("#allPageNumber").val();
	else if(tabId == "normalTabLi")
		pageNo = $("#normalPageNumber").val();
	else if(tabId == "abnormalTabLi")
		pageNo = $("#abnormalPageNumber").val();
	else if(tabId == "cAbnormalTabLi")
		pageNo = $("#cAbnormalPageNumber").val();
	else if(tabId == "patientWiseTabLi")
		pageNo = $("#patientWisePageNumber").val();
	
	if(pageNo <= numberOfPages){
		reportingPagination(pageNo, numberOfPages, callFrom, tabId);
	}else{
		alert("Invalid page number.");
	}
	
	if(tabId == "allTabLi")
		$("#allPageNumber").val("");
	else if(tabId == "normalTabLi")
		$("#normalPageNumber").val("");
	else if(tabId == "abnormalTabLi")
		$("#abnormalPageNumber").val("");
	else if(tabId == "cAbnormalTabLi")
		$("#cAbnormalPageNumber").val("");
	else if(tabId == "patientWiseTabLi")
		$("#patientWisePageNumber").val("");
}

/******** @author kranti Godse ************/
$(function() {
    $('#toggle-event3').change(function() {
    	if($(this).prop('checked') == true){
    		reportingToggleSwitch('labAvailableSwitchYes','reporting','Y');
    	}else{
    		reportingToggleSwitch('labAvailableSwitchNo','reporting','All');
    	}
    })
  })

function reportingToggleSwitch(id, callFrom,flag) {
	var sel = flag; //$("#" + id).data('title');
	var tog = 'emergencyFlag';//$("#" + id).data('toggle');
	
	$('#' + tog).val(sel);
	$('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]')
			.removeClass('active').addClass('notActive');
	$('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass(
			'notActive').addClass('active');

	setTimeout(function() {
		if(callFrom == "reporting"){
			searchReportingPatient("reportingSearchBtn");
		}
	}, 500);
}

function getReportingEmailSentNotSentData(callFrom){
	
	if(callFrom == "normal"){
		if($("#normalSent").is(":checked")){
			$("#normalEmailStatus").val("Y");
		}else if($("#normalNotSent").is(":checked")){
			$("#normalEmailStatus").val("N");
		}
		searchReportingPatient("reportingSearchBtn");
	}else if(callFrom == "abnormal"){
		if($("#abnormalSent").is(":checked")){
			$("#abnormalEmailStatus").val("Y");
		}else if($("#abnormalNotSent").is(":checked")){
			$("#abnormalEmailStatus").val("N");
		}
		searchReportingPatient("reportingSearchBtn");
	}else if(callFrom == "cAbnormal"){
		if($("#cAbnormalSent").is(":checked")){
			$("#cAbnormalEmailStatus").val("Y");
		}else if($("#cAbnormalNotSent").is(":checked")){
			$("#cAbnormalEmailStatus").val("N");
		}
		searchReportingPatient("reportingSearchBtn");
	}
	else{
		if($("#patientWiseSent").is(":checked")){
			$("#patientWiseEmailStatus").val("Y");
		}else if($("#patientWiseNotSent").is(":checked")){
			$("#patientWiseEmailStatus").val("N");
		}
		searchReportingPatient("reportingSearchBtn");
	}
}

function reportingEmail(callFrom){
	var idList = [];
	var currentId;
	var bulkSendBtnId = "";
	if(callFrom == "allRecord"){
		$('#reportingAllTableBody').find('input[name="allTest"]').each(function() {
			if($(this).is(":checked")) {
				currentId = $('#' + this.id).val();
				if(currentId != 0) {
					idList.push(currentId);
				}
			}
		});
		bulkSendBtnId = "allBulkEmail";
	}else if(callFrom == "normalRecord"){
		$('#reportingNormalTableBody').find('input[name="normalTest"]').each(function() {
			if($(this).is(":checked")) {
				currentId = $('#' + this.id).val();
				if(currentId != 0) {
					idList.push(currentId);
				}
			}
		});
		bulkSendBtnId = "normalBulkEmail";
	}else if(callFrom == "abNormalRecord"){
		$('#reportingAbnormalTableBody').find('input[name="abnormalTest"]').each(function() {
			if($(this).is(":checked")) {
				currentId = $('#' + this.id).val();
				if(currentId != 0) {
					idList.push(currentId);
				}
			}
		});
		bulkSendBtnId = "abNormalBulkEmail";
	}else if(callFrom == "cAbnormalRecord"){
		$('#reportingCAbnormalTableBody').find('input[name="cAbnormalTest"]').each(function() {
			if($(this).is(":checked")) {
				currentId = $('#' + this.id).val();
				if(currentId != 0) {
					idList.push(currentId);
				}
			}
		});
		bulkSendBtnId = "cAbnormalBulkEmail";
	}

	idList = idList.join('-');
	if(idList.length == 0) {
		alert("Please select at least one sample/test.");
		return false;
	}
	if(idList.length > 0) {
		var r = "";		
		r = confirm("Are you sure you want to send bulk email.");
		if(r) {
			var inputs = [];
			inputs.push('id=' + encodeURIComponent(idList));
			inputs.push('emailTo=' + "");
			inputs.push('emailCC=' + "");
			inputs.push('callFrom=' + " ");
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/phlebotomy/reportingEmail",
				catche : false,
				beforeSend : function() {
					$(':input[id="'+bulkSendBtnId+'"]').prop('disabled', true);
				},
				complete : function() {
					$(':input[id="'+bulkSendBtnId+'"]').prop('disabled', false);
				},error : function() {
					alert('Network Issue!');
				},
				success : function(r) {					
					alertify.success(r);
					if(callFrom == "normalRecord" || callFrom == "abNormalRecord" || callFrom == "cAbnormalRecord"){
						searchReportingPatient("reportingSearchBtn");
					}
				}
			});
		}
	}
}

function sendReportVaiMail(){
	var tabId = jQuery('#tabId').find('li.active').attr('id');
	var callFrom=" ";
	if(tabId == "patientWiseTabLi"){
		callFrom="patientWise";
	}
	
	var masterIdd = $("#masterIdd").val();
	var emailTo = $("#emailTo").val();

	if(emailTo == "null" ||emailTo==null ||emailTo==undefined || emailTo=="" ) {
		alert("Please Enter Email ID");
		return false;
	}
	var array = emailTo.split(",");		
	for(var i = 0; i < array.length; i++){	    
	     if(array[i] != "") {
			var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			if(array[i] != "") {
				if(array[i].match(mailformat)) {
				} else {
					alert("You have entered an invalid TO email address!");
					return false;
				}
			}
		}
	}
	
	var emailCC = $("#emailCC").val();
	var array1 = emailCC.split(",");		
	for(var i = 0; i < array1.length; i++){	    
		if(array1[i] != "") {
			var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			if(array1[i] != "") {
				if(array1[i].match(mailformat)) {
				} else {
					alert("You have entered an invalid CC email address!");
					return false;
				}
			}
		}
	}	
	var idList = [];
	idList.push(masterIdd);
	var inputs = [];
	inputs.push('id=' + encodeURIComponent(idList));
	inputs.push('emailTo=' + emailTo);
	inputs.push('emailCC=' + emailCC);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/reportingEmail",
		catche : false,
		error : function() {
			alert('Network Issue!');
		},
        success : function(r) {
        	alertify.success("Email Send Successfully");
        	$("#emailTo").val('');
        	$("#emailCC").val('');
        	$("#massageId").val('');
        	$("#patientNameemail").val('');
    		$("#emailreportingPopUp").modal('hide'); 
    		
			searchReportingPatient("reportingSearchBtn");
        }
    });
}

function getReportingSamplesByCollectedAt(callFrom){
	var tabId = jQuery('#tabId').find('li.active').attr('id');
	var	callFromTemp = "reportingAutoSugg";

	var tab = "";
	if(tabId=="normalTabLi"){
		tab = "normal";	
	}else if(tabId=="abnormalTabLi"){
		tab = "abnormal";
	}else if(tabId=="cAbnormalTabLi"){
		tab = "cAbnormal";
	}else if(tabId == "patientWiseTabLi"){
		tab = "patientWise";
	}else{
		tab = "all";
	}
	
	var startIndex = 0;
	var txtFdate = $.trim($("#txtFdate").val());
	var txtTdate = $.trim($("#txtTdate").val());
	var emergencyFlag = $("#emergencyFlag").val();
	var collectedAtId = $("#collectedAt").val();

	if(collectedAt == 0)
		return false;
	
	var emailStatusRadioBtn = "";
	if(tabId == "normalTabLi"){
		emailStatusRadioBtn = $("#normalEmailStatus").val();
	}else if(tabId == "abnormalTabLi"){
		emailStatusRadioBtn = $("#abnormalEmailStatus").val();
	}else if(tabId == "cAbnormalTabLi"){
		emailStatusRadioBtn = $("#cAbnormalEmailStatus").val();
	}
	
	var inputs = [];
		inputs.push('callFrom=' + callFrom);
		inputs.push('tabId=' + tabId);
		inputs.push('startIndex=' +startIndex);
		inputs.push('emergencyFlag=' +emergencyFlag);
		inputs.push('collectedAtId=' +collectedAtId);
		inputs.push('txtFdate=' +txtFdate);
		inputs.push('txtTdate=' +txtTdate);
		inputs.push('emailStatus=' +emailStatusRadioBtn);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/getReportingSamplesByCollectedAt",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setPatientTemp(r, callFromTemp, tab);
			setReportingPaginationTempForCollectedAt(r, callFrom, tabId);
		}
	});
}

function setReportingPaginationTempForCollectedAt(r, callFrom, tabId){
	if(tabId == "allTabLi"){
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
				numberOfRows +="<li onclick='reportingPaginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='reportingPaginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='reportingNextPaginationOnCollectedAt("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#allNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#allNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#allJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='allPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='reportingJumpToPageOnCollectedAt("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#allPagination').html(numberOfRows);
	}else if(tabId == "patientWiseTabLi"){
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
				numberOfRows +="<li onclick='reportingPaginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='reportingPaginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='reportingNextPaginationOnCollectedAt("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#patientWiseNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#patientWiseNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#patientWiseJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='patientWisePageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='reportingJumpToPageOnCollectedAt("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#patientWisePagination').html(numberOfRows);
	}else if(tabId == "normalTabLi"){
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
				numberOfRows +="<li onclick='reportingPaginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='reportingPaginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='reportingNextPaginationOnCollectedAt("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#normalNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#normalNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#normalJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='normalPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='reportingJumpToPageOnCollectedAt("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#normalPagination').html(numberOfRows);
	}else if(tabId == "abnormalTabLi"){
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
				numberOfRows +="<li onclick='reportingPaginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='reportingPaginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='reportingNextPaginationOnCollectedAt("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#abnormalNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#abnormalNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#abnormalJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='abnormalPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='reportingJumpToPageOnCollectedAt("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#abnormalPagination').html(numberOfRows);
	}else if(tabId == "cAbnormalTabLi"){
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
				numberOfRows +="<li onclick='reportingPaginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}else{
				numberOfRows +="<li onclick='reportingPaginationOnCollectedAt("+index+", "+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\")'><a>"+index+"</a></li>";
			}
			index = index + 1;
		}
		if(numberOfPages > 5){
			numberOfRows +="<li class='next' onclick='reportingNextPaginationOnCollectedAt("+index+","+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
		if(count == 0)
			$('#cAbnormalNumberOfPages').html("<li><a>Page 0 of "+(Math.ceil(numberOfPages))+"</a></li>");
		else{
			$('#cAbnormalNumberOfPages').html("<li><a>Page 1 of "+(Math.ceil(numberOfPages))+"</a></li>");
			$('#cAbnormalJumpToPage').html("<li><a>Go to page <input size='4' placeholder='page #' id='cAbnormalPageNumber' onkeypress='return validateNumber(event)'/><button class='btn btn-primary btn-xs' onclick='reportingJumpToPageOnCollectedAt("+Math.ceil(numberOfPages)+", \""+callFrom+"\", \""+tabId+"\");'>Go</button></a></li>");
		}
		$('#cAbnormalPagination').html(numberOfRows);
	}
}

function reportingPaginationOnCollectedAt(pageNumber, numberOfPages, callFrom, tabId){
	var tab = "";
	if(tabId=="normalTabLi"){
		tab = "normal";	
	}else if(tabId=="abnormalTabLi"){
		tab = "abnormal";
	}else if(tabId=="cAbnormalTabLi"){
		tab = "cAbnormal";
	}else if(tabId == "patientWiseTabLi"){
		tab = "patientWise";
	}else{
		tab = "all";
	}
	
	var callFromTemp = "reportingAutoSugg";
	var collectedAtId = $("#collectedAt").val();
	var txtFdate = $('#fromDate').val();
	var txtTdate = $('#toDate').val();
	var emergencyFlag = $("#emergencyFlag").val();
	
	var emailStatusRadioBtn = "";
	if(tabId == "normalTabLi"){
		emailStatusRadioBtn = $("#normalEmailStatus").val();
	}else if(tabId == "abnormalTabLi"){
		emailStatusRadioBtn = $("#abnormalEmailStatus").val();
	}else if(tabId == "cAbnormalTabLi"){
		emailStatusRadioBtn = $("#cAbnormalEmailStatus").val();
	}
	
	var inputs = [];
	var startIndex = (pageNumber - 1) + "0";
	inputs.push('callFrom=' + callFrom);
	inputs.push('tabId=' + tabId);
	inputs.push('startIndex=' +startIndex);
	inputs.push('emergencyFlag=' +emergencyFlag);
	inputs.push('collectedAtId=' +collectedAtId);
	inputs.push('txtFdate=' +txtFdate);
	inputs.push('txtTdate=' +txtTdate);
	inputs.push('emailStatus=' +emailStatusRadioBtn);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		catche : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/pathologysearch/reportingPaginationOnCollectedAt",
		error : function() {
			alert("error");
		},
		success : function(r) {
			
	        setPatientTemp(r, callFromTemp, tab, pageNumber);
	        //alert("aaaaaaaaaaa"+r);

	        if(tabId == "allTabLi")
	        	$('#allNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	        else if(tabId == "normalTabLi")
	        	$('#normalNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(tabId == "abnormalTabLi")
	    		$('#abnormalNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(tabId == "cAbnormalTabLi")
	    		$('#cAbnormalNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
	    	else if(tabId == "patientWiseTabLi")
	    		$('#patientWiseNumberOfPages').html("<li><a>Page "+pageNumber+" of "+(Math.round(numberOfPages))+"</a></li>");
 		},
	});	
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination Next Button.
************************************************************/
function reportingNextPaginationOnCollectedAt(currentIndex, numberOfPages, callFrom, tabId){
	var displayPagination = currentIndex + 5;
	var numberOfRows = '';
	numberOfRows  = numberOfRows + '<li class="previous" onclick="reportingPreviousPaginationOnCollectedAt('+currentIndex+','+Math.round(numberOfPages)+',\''+callFrom+'\',\''+tabId+'\');"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	if(numberOfPages < displayPagination){
		displayPagination = numberOfPages + 1;
	}
	for(var j = currentIndex; j < displayPagination; j++){
		numberOfRows +='<li onclick="reportingPaginationOnCollectedAt('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\', \''+tabId+'\')"><a>'+j+'</a></li>';
	}
	if(numberOfPages >= displayPagination){
		numberOfRows +='<li class="next" onclick="reportingNextPaginationOnCollectedAt('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\', \''+tabId+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	}
	
    if(tabId == "allTabLi")
    	$('#allPagination').html(numberOfRows);
    else if(tabId == "normalTabLi")
    	$('#normalPagination').html(numberOfRows);
	else if(tabId == "abnormalTabLi")
		$('#abnormalPagination').html(numberOfRows);
	else if(tabId == "cAbnormalTabLi")
		$('#cAbnormalPagination').html(numberOfRows);
	else if(tabId == "patientWiseTabLi")
		$('#patientWisePagination').html(numberOfRows);
		
    reportingPaginationOnCollectedAt(currentIndex, numberOfPages, callFrom, tabId);
}

/***********************************************************
 * @author Akshay Mache
 * @since  2-03-2020
 * @comment Phlebotomy Patient Pagination Previous Button.
************************************************************/
function reportingPreviousPaginationOnCollectedAt(currentIndex, numberOfPages, callFrom, tabId){
	var displayPagination = currentIndex - 5;
	var numberOfRows = '';
	if(currentIndex > 6){
		numberOfRows +='<li class="previous" onclick="reportingPreviousPaginationOnCollectedAt('+displayPagination+','+Math.round(numberOfPages)+',\''+callFrom+'\',\''+tabId+'\')"><a><i class="fa fa-backward" aria-hidden="true"></i></a></li>';
	}
	for(var j = displayPagination; j < currentIndex; j++){
		numberOfRows +='<li onclick="reportingPaginationOnCollectedAt('+j+', '+Math.round(numberOfPages)+', \''+callFrom+'\',\''+tabId+'\')"><a>'+j+'</a></li>';
	}
	numberOfRows +='<li class="next" onclick="reportingNextPaginationOnCollectedAt('+j+','+Math.round(numberOfPages)+',\''+callFrom+'\',\''+tabId+'\')"><a><i class="fa fa-forward" aria-hidden="true"></i></a></li>';
	
	if(tabId == "allTabLi")
    	$('#allPagination').html(numberOfRows);
    else if(tabId == "normalTabLi")
    	$('#normalPagination').html(numberOfRows);
	else if(tabId == "abnormalTabLi")
		$('#abnormalPagination').html(numberOfRows);
	else if(tabId == "cAbnormalTabLi")
		$('#cAbnormalPagination').html(numberOfRows);
	else if(tabId == "patientWiseTabLi")
		$('#patientWisePagination').html(numberOfRows);
	
	reportingPaginationOnCollectedAt(displayPagination, numberOfPages, callFrom, callType);
}

function reportingJumpToPageOnCollectedAt(numberOfPages, callFrom, tabId){
	var pageNo = 0;
	if(tabId == "allTabLi")
		pageNo = $("#allPageNumber").val();
	else if(tabId == "normalTabLi")
		pageNo = $("#normalPageNumber").val();
	else if(tabId == "abnormalTabLi")
		pageNo = $("#abnormalPageNumber").val();
	else if(tabId == "cAbnormalTabLi")
		pageNo = $("#cAbnormalPageNumber").val();
	else if(tabId == "patientWiseTabLi")
		pageNo = $("#patientWisePageNumber").val();
	
	if(pageNo <= numberOfPages){
		reportingPaginationOnCollectedAt(pageNo, numberOfPages, callFrom, tabId);
	}else{
		alert("Invalid page number.");
	}
	
	if(tabId == "allTabLi")
		$("#allPageNumber").val("");
	else if(tabId == "normalTabLi")
		$("#normalPageNumber").val("");
	else if(tabId == "abnormalTabLi")
		$("#abnormalPageNumber").val("");
	else if(tabId == "cAbnormalTabLi")
		$("#cAbnormalPageNumber").val("");
	else if(tabId == "patientWiseTabLi")
		$("#patientWisePageNumber").val("");
}