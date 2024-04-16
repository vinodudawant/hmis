function toggleEntryDiv(id) {

	if (id == "divForEdit") {

		$("#divForEntryTestMaster").show('slow');
	} else {

		$("#divForEntryTestMaster").toggle('slow');
	}
}


function saveTestMaster(callfrom){
	
	var testName = $("#testName").val();
	var testMasterId = $("#testMasterId").val();
	var userId= $("#userId").val();
	var unitId= $("#unitId").val();
	
	var testIssueFlag = callfrom;
	
	alert("testIssueFlag :: " + testIssueFlag);
	
	if(testName=="" || testName==undefined || testName==null || testName=="null"  ){
		alert("please enter Test name");		
		$("#testName").focus();					
		return false;
	}	
	
	var inputs = [];	
	inputs.push('testName=' + testName);
	inputs.push('testMasterId=' + testMasterId);
	//inputs.push('userId='+userId);
	inputs.push('createdBy='+userId);
	inputs.push('unitId='+unitId);
	inputs.push('testIssueFlag='+testIssueFlag);
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/bb_test_master/saveTest",
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
			 alertify.success("Test already exists");
		 }
		 else {
				alertify.error("Some Problem Occurred");
				
			}
			 getAllTestsMaster();
			 refreshTestMaster();
		},
		
	});
}

function refreshTestMaster(){
	
	$('#testName').val('');
	$('#testMasterId').val(0);
	
}

function getAllTestsMaster(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/getAllTestsMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//setAllBloodGroupMaster(r,"All");
			setAllTestMaster(r,"All");
			
		}
	});
}

function setAllTestMaster(r,CallFrom){ 
	
	
	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.listTestMaster.length; i++) {		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.listTestMaster[i].testMasterId+'</td>'
			+ ' <td class="col-md-1 center">'+r.listTestMaster[i].testName+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editTestMaster('+r.listTestMaster[i].testMasterId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteTestMaster('+r.listTestMaster[i].testMasterId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
		htm = htm + '<tr> '
		+ ' <td class="col-md-1 center">'+index+'</td>'
		+ ' <td class="col-md-1 center">'+r.testMasterId+'</td>'
		+ ' <td class="col-md-1 center">'+r.testName+'</td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-success" onclick=editTestMaster('+r.testMasterId+')><i class="fa fa-edit"></i></button></td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-danger" onclick=deleteTestMaster('+r.testMasterId+')><i class="fa fa-trash-o"></i></button></td>'
		+ '</tr>';
		index++;	
}		
	
	$("#testBodyDetails").html(htm);
}


function editTestMaster(testMasterId){	
	
	var inputs = [];
	inputs.push('testMasterId=' + testMasterId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/editTestMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
			$('#searchId').val('');
			$("#divForEntryTestMaster").show('slow');
			$('#testName').val(r.testName);
			$('#testMasterId').val(r.testMasterId);	
			
		}
	});
}

function deleteTestMaster(testMasterId) {
	var r = confirm("Are You Sure You Want To Delete Test Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/bb_test_master/deleteTestMaster",
			data : {
				"testMasterId" : testMasterId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshTestMaster();
				getAllTestsMaster();
			}
		});
	}
}

function testMasterAutoSuggestion(inputID) {
	
	var resultData = [];
	var testName = $("#" + inputID).val();

	if (testName == "" || testName == null || testName == "null"	|| testName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		
		getAllTestsMaster();
		return false;
	}

	var inputs = [];
	inputs.push('testName=' + testName);;
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bb_test_master/testMasterAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.listTestMaster.length; j++) {
				var arrValue = response.listTestMaster[j].testMasterId +"-"+response.listTestMaster[j].testName;
				var idValue = response.listTestMaster[j].testMasterId;
				var testName = response.listTestMaster[j].testName;
				resultData.push({
					ID : idValue,
					Name : testName,
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue +  '</a></li>';
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
		var testMasterId = res[0];
		var testName = res[1];	
		
		getTestMasterById(testMasterId);
		
		$("input#" + inputID).val(testName);
	}
}


function getTestMasterById(testMasterId){
	var inputs = [];
	inputs.push('testMasterId=' + testMasterId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/editTestMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllTestMaster(r,"search");
			refreshTestMaster();
		}
	});
}

function testMasterSearchById(){

	var complaintId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(complaintId)) {
		alert("Please Enter Number Only!");
		$("#complaintId").focus();
		return false;
	}
	getTestMasterById(testMasterId);	
}


//--------------------------------------------------TEST MASTER CODE END---------------------------------------

//------------------------------------------------DISCARD REASON CODE START-------------------------------------


function toggleEntryDivDiscardReason(id) {

	if (id == "divForEdit") {

		$("#divForEntryDiscardReason").show('slow');
	} else {

		$("#divForEntryDiscardReason").toggle('slow');
	}
}

function saveDiscardReason(){
	
	var reasonName = $("#reasonName").val();
	var discardReasonId = $("#discardReasonId").val();
	var userId= $("#userId").val();
	var unitId= $("#unitId").val();
	
	if(reasonName=="" || reasonName==undefined || reasonName==null || reasonName=="null"  ){
		alert("please enter Discard Reason name");		
		$("#reasonName").focus();					
		return false;
	}	
	
	var inputs = [];	
	inputs.push('reasonName=' + reasonName);
	inputs.push('discardReasonId=' + discardReasonId);
	//inputs.push('userId='+userId);
	inputs.push('createdBy='+userId);
	inputs.push('unitId='+unitId);
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/bb_test_master/saveDiscardReason",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issue");
		},
		success: function(data){
			if(data==1){
			alertify.success("Data Saved successfully");
			}
		 else if(data==2){
			 alertify.success("Data Updated successfully");
			 
			}
		 else if(data==3){
			 alertify.success("Discard Reason already exists");
		 }
		 else {
				alertify.error("Some Problem Occurred");
				
			}
			 getAllDiscardReasons();
			 refreshDiscardReasons();
		},
		
	});
}

function refreshDiscardReasons(){
	
	$('#reasonName').val('');
	$('#discardReasonId').val(0);
	
}

function  getAllDiscardReasons(){
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/getAllDiscardReasons",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setAllDiscardReasons(r,"All");
		}
	});
}

function setAllDiscardReasons(r,CallFrom){
	
	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.listDiscardReason.length; i++) {		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.listDiscardReason[i].discardReasonId+'</td>'
			+ ' <td class="col-md-1 center">'+r.listDiscardReason[i].reasonName+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editDiscardReason('+r.listDiscardReason[i].discardReasonId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteDiscardReason('+r.listDiscardReason[i].discardReasonId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
		htm = htm + '<tr> '
		+ ' <td class="col-md-1 center">'+index+'</td>'
		+ ' <td class="col-md-1 center">'+r.discardReasonId+'</td>'
		+ ' <td class="col-md-1 center">'+r.reasonName+'</td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-success" onclick=editDiscardReason('+r.discardReasonId+')><i class="fa fa-edit"></i></button></td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-danger" onclick=deleteDiscardReason('+r.discardReasonId+')><i class="fa fa-trash-o"></i></button></td>'
		+ '</tr>';
		index++;	
}		
	
	$("#discardBodyDetails").html(htm);
	
}

function editDiscardReason(discardReasonId){
	
	var inputs = [];
	inputs.push('discardReasonId=' + discardReasonId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/editDiscardReason",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
			$('#searchId').val('');
			$("#divForEntryDiscardReason").show('slow');
			$('#reasonName').val(r.reasonName);
			$('#discardReasonId').val(r.discardReasonId);	
			
		}
	});
}

function deleteDiscardReason(discardReasonId){
	
	var r = confirm("Are You Sure You Want To Delete This Discard Reason");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/bb_test_master/deleteDiscardReason",
			data : {
				"discardReasonId" : discardReasonId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshDiscardReasons();
				getAllDiscardReasons();
				 
			}
		});
	}
}

function discardReasonAutoSugg(inputID) {
	
	//alert("-----auto sugg");
	
	var resultData = [];
	var reasonName = $("#" + inputID).val();

	if (reasonName == "" || reasonName == null || reasonName == "null"	|| reasonName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		
		getAllDiscardReasons();
		return false;
	}

	var inputs = [];
	inputs.push('reasonName=' + reasonName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bb_test_master/discardReasonAutoSugg",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.listDiscardReason.length; j++) {
				var arrValue = response.listDiscardReason[j].discardReasonId +"-"+response.listDiscardReason[j].reasonName;
				var idValue = response.listDiscardReason[j].discardReasonId;
				var reasonName = response.listDiscardReason[j].reasonName;
				resultData.push({
					ID : idValue,
					Name : reasonName,
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue +  '</a></li>';
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
		var discardReasonId = res[0];
		var reasonName = res[1];	
		
		getDiscardReasonById(discardReasonId);
		
		$("input#" + inputID).val(reasonName);
	}
}

function getDiscardReasonById(discardReasonId){
	
	
	var inputs = [];
	inputs.push('discardReasonId=' + discardReasonId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/editDiscardReason",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllDiscardReasons(r,"search");
			refreshDiscardReasons();
		}
	});
}

function DiscardReasonSearchById(){

	var complaintId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(complaintId)) {
		alert("Please Enter Number Only!");
		$("#complaintId").focus();
		return false;
	}
	getDiscardReasonById(discardReasonId);	
}


//-END----------------------

//---------------------------------compatibility type CODE START-----------------

function toggleEntryDivcompaType(id) {

	if (id == "divForEdit") {

		$("#divForEntryCompaType").show('slow');
	} else {

		$("#divForEntryCompaType").toggle('slow');
	}
}

function saveCompatibilityType(){
	
	var compatibilityType = $("#compatibilityType").val();
	var compatibilityTypeId = $("#compatibilityTypeId").val();
	var userId= $("#userId").val();
	var unitId= $("#unitId").val();
	
	if(compatibilityType=="" || compatibilityType==undefined || compatibilityType==null || compatibilityType=="null"  ){
		alert("please enter compatibility Type name");		
		$("#compatibilityType").focus();					
		return false;
	}	
	
	var inputs = [];	
	inputs.push('compatibilityType=' + compatibilityType);
	inputs.push('compatibilityTypeId=' + compatibilityTypeId);
	//inputs.push('userId='+userId);
	inputs.push('createdBy='+userId);
	inputs.push('unitId='+unitId);
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/bb_test_master/saveCompatibilityType",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issue");
		},
		success: function(data){
			if(data==1){
			alertify.success("Data Saved successfully");
			}
		 else if(data==2){
			 alertify.success("Data Updated successfully");
			 
			}
		 else if(data==3){
			 alertify.success("Discard Reason already exists");
		 }
		 else {
				alertify.error("Some Problem Occurred");
				
			}
			 getAllCompatibilityType();
			 refreshCompatibilityType();
		},
		
	});
}

function refreshCompatibilityType(){
	
	$('#compatibilityType').val('');
	$('#compatibilityTypeId').val(0);
	
}

function  getAllCompatibilityType(){
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/getAllCompatibilityType",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setAllCompatibilityType(r,"All");
			SetAllCompatibilityTypeDetails(r);
		}
	});
}

function setAllCompatibilityType(r,CallFrom){
	
	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.listCompatibilityType.length; i++) {		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.listCompatibilityType[i].compatibilityTypeId+'</td>'
			+ ' <td class="col-md-1 center">'+r.listCompatibilityType[i].compatibilityType+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editCompatibilityType('+r.listCompatibilityType[i].compatibilityTypeId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteCompatibilityType('+r.listCompatibilityType[i].compatibilityTypeId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
		htm = htm + '<tr> '
		+ ' <td class="col-md-1 center">'+index+'</td>'
		+ ' <td class="col-md-1 center">'+r.compatibilityTypeId+'</td>'
		+ ' <td class="col-md-1 center">'+r.compatibilityType+'</td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-success" onclick=editCompatibilityType('+r.compatibilityTypeId+')><i class="fa fa-edit"></i></button></td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-danger" onclick=deleteCompatibilityType('+r.compatibilityTypeId+')><i class="fa fa-trash-o"></i></button></td>'
		+ '</tr>';
		index++;	
}		
	
	$("#compaTypeBodyDetails").html(htm);
}

function editCompatibilityType(compatibilityTypeId){
	
	var inputs = [];
	inputs.push('compatibilityTypeId=' + compatibilityTypeId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/editCompatibilityType",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
			$('#searchId').val('');
			$("#divForEntryCompaType").show('slow');
			$('#compatibilityType').val(r.compatibilityType);
			$('#compatibilityTypeId').val(r.compatibilityTypeId);	
			
		}
	});
}

function deleteCompatibilityType(compatibilityTypeId){
	
	var r = confirm("Are You Sure You Want To Delete This Compatibility Type ?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/bb_test_master/deleteCompatibilityType",
			data : {
				"compatibilityTypeId" : compatibilityTypeId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshCompatibilityType();
				getAllCompatibilityType();
				 
			}
		});
	}
}

function compaTypeAutoSugg(inputID) {
	
	//alert("-----auto sugg");
	
	var resultData = [];
	var compatibilityType = $("#" + inputID).val();

	if (compatibilityType == "" || compatibilityType == null || compatibilityType == "null"	|| compatibilityType == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		
		getAllCompatibilityType();
		return false;
	}

	var inputs = [];
	inputs.push('compatibilityType=' + compatibilityType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bb_test_master/compaTypeAutoSugg",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.listCompatibilityType.length; j++) {
				var arrValue = response.listCompatibilityType[j].compatibilityTypeId +"-"+response.listCompatibilityType[j].compatibilityType;
				var idValue = response.listCompatibilityType[j].compatibilityTypeId;
				var compatibilityType = response.listCompatibilityType[j].compatibilityType;
				resultData.push({
					ID : idValue,
					Name : compatibilityType,
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue +  '</a></li>';
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
		var compatibilityTypeId = res[0];
		var compatibilityType = res[1];	
		
		getCompatibilityTypeById(compatibilityTypeId);
		
		$("input#" + inputID).val(compatibilityType);
	}
}

function getCompatibilityTypeById(compatibilityTypeId){
	
	
	var inputs = [];
	inputs.push('compatibilityTypeId=' + compatibilityTypeId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/editCompatibilityType",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllCompatibilityType(r,"search");
			refreshCompatibilityType();
		}
	});
}

function compaTypeSearchById(){

	var complaintId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(complaintId)) {
		alert("Please Enter Number Only!");
		$("#complaintId").focus();
		return false;
	}
	getCompatibilityTypeById(compatibilityTypeId);	
}

//---------END

//--------------------------PRIORITY MASTER---START------------------

function toggleEntryDivPriority(id) {

	if (id == "divForEdit") {

		$("#divForEntryPriority").show('slow');
	} else {

		$("#divForEntryPriority").toggle('slow');
	}
}

function savePriority(){
	
	var priority = $("#priority").val();
	var priorityId = $("#priorityId").val();
	var userId= $("#userId").val();
	var unitId= $("#unitId").val();
	
	if(priority=="" || priority==undefined || priority==null || priority=="null"  ){
		alert("please enter Priority!");		
		$("#priority").focus();					
		return false;
	}	
	
	var inputs = [];	
	inputs.push('priority=' + priority);
	inputs.push('priorityId=' + priorityId);
	//inputs.push('userId='+userId);
	inputs.push('createdBy='+userId);
	inputs.push('unitId='+unitId);
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/bb_test_master/savePriority",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issue");
		},
		success: function(data){
			if(data==1){
			alertify.success("Data Saved successfully");
			}
		 else if(data==2){
			 alertify.success("Data Updated successfully");
			 
			}
		 else if(data==3){
			 alertify.success("Discard Reason already exists");
		 }
		 else {
				alertify.error("Some Problem Occurred");
				
			}
			 getAllpriority();
			 refreshpriority();
		},
		
	});
	
}

function refreshpriority(){
	
	$('#priority').val('');
	$('#priorityId').val(0);
	
}

function  getAllpriority(){
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/getAllpriority",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setAllpriority(r,"All");
			SetAllProrityDetails(r);
		}
	});
}

function SetAllProrityDetails(r){
	var divContent = "";
    divContent = divContent + "<select><option value='0'>--Select Priority--</option>";
     for ( var i = 0; i < r.listPriorityMaster.length; i++) {          
    	 divContent = divContent + "<option value='"+r.listPriorityMaster[i].priorityId+"'>"+ r.listPriorityMaster[i].priority + "</option>";
        }
    divContent = divContent + "</select>";
        $("#priority").html(divContent);
        var table = document.getElementById("bloodRequisitionDetails");
        var rows = table.getElementsByTagName("tr").length;
        for(var i=0;i<rows;i++){ 
			
			$('#priority'+(i+1)).html(divContent);
		
		}
        
}

function setAllpriority(r,CallFrom){
	
	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.listPriorityMaster.length; i++) {		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.listPriorityMaster[i].priorityId+'</td>'
			+ ' <td class="col-md-1 center">'+r.listPriorityMaster[i].priority+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editPriority('+r.listPriorityMaster[i].priorityId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deletePriority('+r.listPriorityMaster[i].priorityId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
		htm = htm + '<tr> '
		+ ' <td class="col-md-1 center">'+index+'</td>'
		+ ' <td class="col-md-1 center">'+r.priorityId+'</td>'
		+ ' <td class="col-md-1 center">'+r.priority+'</td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-success" onclick=editPriority('+r.priorityId+')><i class="fa fa-edit"></i></button></td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-danger" onclick=deletePriority('+r.priorityId+')><i class="fa fa-trash-o"></i></button></td>'
		+ '</tr>';
		index++;	
}		
	
	$("#priorityBodyDetails").html(htm);
}

function editPriority(priorityId){
	
	var inputs = [];
	inputs.push('priorityId=' + priorityId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/editPriority",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
			$('#searchId').val('');
			$("#divForEntryPriority").show('slow');
			$('#priority').val(r.priority);
			$('#priorityId').val(r.priorityId);	
			
		}
	});
}

function deletePriority(priorityId){
	
	var r = confirm("Are You Sure You Want To Delete This Compatibility Type ?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/bb_test_master/deletePriority",
			data : {
				"priorityId" : priorityId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshpriority();
				getAllpriority();
				 
			}
		});
	}
}

function priorityAutoSugg(inputID) {
	
	//alert("-----auto sugg");
	
	var resultData = [];
	var priority = $("#" + inputID).val();

	if (priority == "" || priority == null || priority == "null"	|| priority == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		
		getAllpriority();
		return false;
	}

	var inputs = [];
	inputs.push('priority=' + priority);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bb_test_master/priorityAutoSugg",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.listPriorityMaster.length; j++) {
				var arrValue = response.listPriorityMaster[j].priorityId +"-"+response.listPriorityMaster[j].priority;
				var idValue = response.listPriorityMaster[j].priorityId;
				var priority = response.listPriorityMaster[j].priority;
				resultData.push({
					ID : idValue,
					Name : priority,
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue +  '</a></li>';
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
		var priorityId = res[0];
		var priority = res[1];	
		
		getPriorityById(priorityId);
		
		$("input#" + inputID).val(priority);
	}
}

function getPriorityById(priorityId){
	
	
	var inputs = [];
	inputs.push('priorityId=' + priorityId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/editPriority",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllpriority(r,"search");
			refreshpriority();
		}
	});
}

function compaTypeSearchById(){

	var complaintId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(complaintId)) {
		alert("Please Enter Number Only!");
		$("#complaintId").focus();
		return false;
	}
	getPriorityById(priorityId);	
}

//---------END

//--------------------------rate of transfusion ---START------------------

function toggleEntryDivTrans(id) {

	if (id == "divForEdit") {

		$("#divForEntryTrans").show('slow');
	} else {

		$("#divForEntryTrans").toggle('slow');
	}
}

function saveTransfusion(){
	
	var transfusion = $("#transfusion").val();
	var transfusionId = $("#transfusionId").val();
	var userId= $("#userId").val();
	var unitId= $("#unitId").val();
	
	if(transfusion=="" || transfusion==undefined || transfusion==null || transfusion=="null"  ){
		alert("please enter transfusion!");		
		$("#transfusion").focus();					
		return false;
	}	
	
	var inputs = [];	
	inputs.push('transfusion=' + transfusion);
	inputs.push('transfusionId=' + transfusionId);
	//inputs.push('userId='+userId);
	inputs.push('createdBy='+userId);
	inputs.push('unitId='+unitId);
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/bb_test_master/saveTransfusion",
		data	: str1 + "&reqType=AJAX",
		error: function(){
			alertify.error("Network issue");
		},
		success: function(data){
			if(data==1){
			alertify.success("Data Saved successfully");
			}
		 else if(data==2){
			 alertify.success("Data Updated successfully");
			 
			}
		 else if(data==3){
			 alertify.success("Discard Reason already exists");
		 }
		 else {
				alertify.error("Some Problem Occurred");
				
			}
			 getAllTransfusion();
			 refreshTransfusion();
		},
		
	});
	
}

function refreshTransfusion(){
	
	$('#transfusion').val('');
	$('#transfusionId').val(0);
	
}

function  getAllTransfusion(){
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/getAllTransfusion",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setAllTransfusion(r,"All");
			setAllTransfusionRate(r);
		}
	});
}

function setAllTransfusion(r,CallFrom){
	
	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.listRateOfTransfusion.length; i++) {		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.listRateOfTransfusion[i].transfusionId+'</td>'
			+ ' <td class="col-md-1 center">'+r.listRateOfTransfusion[i].transfusion+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editTransfusion('+r.listRateOfTransfusion[i].transfusionId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteTransfusion('+r.listRateOfTransfusion[i].transfusionId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
		htm = htm + '<tr> '
		+ ' <td class="col-md-1 center">'+index+'</td>'
		+ ' <td class="col-md-1 center">'+r.transfusionId+'</td>'
		+ ' <td class="col-md-1 center">'+r.transfusion+'</td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-success" onclick=editTransfusion('+r.transfusionId+')><i class="fa fa-edit"></i></button></td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-danger" onclick=deleteTransfusion('+r.transfusionId+')><i class="fa fa-trash-o"></i></button></td>'
		+ '</tr>';
		index++;	
}		
	
	$("#transfusionBodyDetails").html(htm);
}

function editTransfusion(transfusionId){
	
	var inputs = [];
	inputs.push('transfusionId=' + transfusionId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/editTransfusion",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
			$('#searchId').val('');
			$("#divForEntryTrans").show('slow');
			$('#transfusion').val(r.transfusion);
			$('#transfusionId').val(r.transfusionId);	
			
		}
	});
}

function deleteTransfusion(transfusionId){
	
	var r = confirm("Are You Sure You Want To Delete This Record ?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/bb_test_master/deleteTransfusion",
			data : {
				"transfusionId" : transfusionId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshTransfusion();
				getAllTransfusion();
				 
			}
		});
	}
}

function rateAutoSugg(inputID) {
	
	//alert("-----auto sugg");
	
	var resultData = [];
	var transfusion = $("#" + inputID).val();

	if (transfusion == "" || transfusion == null || transfusion == "null"	|| transfusion == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		
		getAlltransfusion();
		return false;
	}

	var inputs = [];
	inputs.push('transfusion=' + transfusion);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bb_test_master/rateAutoSugg",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.listRateOfTransfusion.length; j++) {
				var arrValue = response.listRateOfTransfusion[j].transfusionId +"-"+response.listRateOfTransfusion[j].transfusion;
				var idValue = response.listRateOfTransfusion[j].transfusionId;
				var transfusion = response.listRateOfTransfusion[j].transfusion;
				resultData.push({
					ID : idValue,
					Name : transfusion,
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue +  '</a></li>';
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
		var transfusionId = res[0];
		var transfusion = res[1];	
		
		getTransfusionById(transfusionId);
		
		$("input#" + inputID).val(transfusion);
	}
}

function getTransfusionById(transfusionId){
	
	
	var inputs = [];
	inputs.push('transfusionId=' + transfusionId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/editTransfusion",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllTransfusion(r,"search");
			refreshTransfusion();
		}
	});
}

function rateTypeSearchById(){

	var complaintId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(complaintId)) {
		alert("Please Enter Number Only!");
		$("#complaintId").focus();
		return false;
	}
	getTransfusionById(transfusionId);	
}

//---------END