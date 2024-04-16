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
	
	//alert("testIssueFlag :: " + testIssueFlag);
	
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
	//	url : "ehat/bb_test_master/getAllTestsMaster",
		url : "ehat/bb_test_master/getAllIssues",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//setAllBloodGroupMaster(r,"All");
			setAllTestMaster(r,"All");
			SetAllTestMastersDetails(r);
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