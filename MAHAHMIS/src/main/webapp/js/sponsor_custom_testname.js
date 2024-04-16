
function fetchAllService() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/serv/fetchServiceList2",
		
		success : function(response) {
			multiSelectnew(response);
			
		}
	});

}
function multiSelectnew(response) {

	var list = "<option></option>";

	for ( var i = 0; i < response.listService.length; i++) {

		list = list + '<option value="' + (response.listService[i].serviceId)
				+ '">' + (response.listService[i].serviceName) + '</option>';

	}
	$("#listmstr_select").html(list);
}



function addRouteMaster(id) {
	if (id == "divForEntry") {
		$("#divForEntry").toggle('slow');
	} 
}

function getSponsorRecords() {
	
	jQuery.ajax({
	
		async : false,
		type : "POST",
		data : {
			"chargesMasterDto" : 1
		},
		url : "ehat/registration/fetchSponsorRecords",
		success : function(r) {
 			
			setTemplateForSponsorSelectList(r)
		
		}
	});
}


function setTemplateForSponsorSelectList(r){
	
	if(r.lstChargesSlave.length == 0){
	
		$("#sponsorId").select2('val',"");
		
	}

	var list="<option></option>";
	

	for ( var int = 0; int < r.lstChargesSlave.length; int++) {

			list=list+'<option value="'+(r.lstChargesSlave[int].slaveId)+'">'+(r.lstChargesSlave[int].categoryName)+'</option>';
		 	
	}	
	
	$("#sponsorId").html(list);
	
	}


function getTestDetailsByServiceId(){
	
	var sponsorId =$("#sponsorId").val();
	
	var serviceId =$("#listmstr_select").val();
	
	var inputs = [];
	
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('serviceId=' + serviceId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/sponsorcustomtest/getTestDetailsByServiceId",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTestDetaisl(r);
		}

	});
	
}

function setTestDetaisl(r) {
	var htm = "";
	var index = 1;

	for (var i = 0; i < r.lstSponsorCustomTestName.length; i++) {
		htm = htm
				+ '<tr class="newRowHistoryRow" id="count'+ parseInt(index)+' "> '
				+ ' <td class="col-md-1 center"> '+ index	+ '</td>'
				+ ' <td class="col-md-5">'+ r.lstSponsorCustomTestName[i].categoryName + '</td>'
				+ ' <td class="col-md-5 center"> '
				+ '		<input type="text" class="form-control" id="testName'+i+'" value="'+r.lstSponsorCustomTestName[i].testName+'"> </input>'
				+ '		<input type="hidden" id="serviceId'+i+'" value="'+r.lstSponsorCustomTestName[i].serviceId+'"> </input>'
				+ '		<input type="hidden"  id="subServiceId'+i+'" value="'+r.lstSponsorCustomTestName[i].subServiceId+'"> </input>'
				+ '		<input type="hidden"  id="id'+i+'" value="'+r.lstSponsorCustomTestName[i].id+'"> </input>'
				+ ' </td>'			
				+ '</tr>';
		index++;
	}
	$("#testDetailsTempBody").html(htm);
	
	
	
	
}



function  saveTestDetails(){
	var rows = $('#testDetails tbody tr.newRowHistoryRow').length;

	var lstTestData = {
			lstSponsorCustomTestName : []
		};
	  
	var sponsorId=$("#sponsorId").val();
	
	for ( var i = 0; i <= rows; i++) {
		var testName = $("#testName" + i).val();
	 
		if(testName == "-" || testName == " " || testName =="null" || testName == null || testName == "undefined" || testName == undefined){
			
		}else{
		var id = $("#id" + i).val();
		var serviceId = $("#serviceId" + i).val();
		var subServiceId = $("#subServiceId" + i).val();
		setTestDetailsData(lstTestData, id,testName,serviceId,subServiceId,sponsorId);
		}
	}
	var inputs = [];
	lstTestData = JSON.stringify(lstTestData);
	inputs.push("testDetails="	+ encodeURIComponent(lstTestData));
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/sponsorcustomtest/saveSponsorCustomTestName",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
				getTestDetailsByServiceId();
				
			}else if(r==2) {
				alert("Record Updated Successfully");
				getTestDetailsByServiceId();
				
			}
			else {
				alert("Network Issue..");
			}

			
			

		}
	});
	
}

function setTestDetailsData(lstTestData, id,testName,serviceId,subServiceId,sponsorId){
	var userId=$("#userId").val();
	var unitId=$("#unitId").val();
	lstTestData.lstSponsorCustomTestName.push({
		id : id,
		testName : testName,
		serviceId : serviceId,
		subServiceId : subServiceId,
		sponsorId : sponsorId,
		userId : userId,
		unitId : unitId,
	});
}


function fecthSubServiceList(id){
	
	var serviceID = ($("#listmstr_select").val()).trim();
	var searchText = $("#" + id).val();
	
	var letter = searchText;
	
	if(serviceID == 0 || serviceID == "" || serviceID == null || serviceID == "null" || serviceID == "undefined" || serviceID == undefined){
		alert("Please Select Service First");
		return false;
	}
	
	var inputs = [];
	

	inputs.push('searchText=' + letter);
	inputs.push('serviceId=' + serviceID);
	
	var str = inputs.join('&');
	

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sponsorcustomtest/getSubservicelistById",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var resultData = [];
						var template = "";
						
						for ( var j = 0; j < r.lstSubService.length; j++) {
							
							
							
							var arrValue = r.lstSubService[j].subId +"-"+r.lstSubService[j].categoryName;
							var idValue = r.lstSubService[j].subId;
							var productName = r.lstSubService[j].categoryName;
							
							resultData.push({
								ID : idValue,
								Name : productName
							});
							template = template + '<li data-value="' + idValue
									+ '" class=""><a href="#">' + arrValue
									+ '</a></li>';
						}
						
					setTimeout(function() {
						
						$("div#documentByName .typeahead").html(template);
						$("div#documentByName .typeahead").show();
				
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
		
		var subserviceID = res[0];
		var medicineName = res[1];
		
		$("#" + id).val(res[1]);
		
		getTestDetailsBySubServiceId(subserviceID);
	
	}
}


function getTestDetailsBySubServiceId(subserviceID){

	
	var sponsorId =$("#sponsorId").val();
	
	var serviceId =$("#listmstr_select").val();
	
	if(sponsorId == 0 || sponsorId == null || sponsorId == "null" || sponsorId == undefined || sponsorId == "undefined"){
		alert("Please Select Sponsor First");
		return false;
	}
	
	var inputs = [];
	
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('serviceId=' + serviceId);
	
	inputs.push('subServiceId=' + subserviceID);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/sponsorcustomtest/getTestDetailsBySubServiceId",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTestDetaisl(r);
		}

	});
	

	
}