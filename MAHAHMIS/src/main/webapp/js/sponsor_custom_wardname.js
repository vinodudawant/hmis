
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


function getWardDetailsBySponsorId(){
	
	var sponsorId =$("#sponsorId").val();
	
	
	
	var inputs = [];
	
	inputs.push('sponsorId=' + sponsorId);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/sponsorcustomtest/getWardDetailsBySponsorId",
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

	for (var i = 0; i < r.lstSponsorCustomWardName.length; i++) {
		htm = htm
				+ '<tr class="newRowHistoryRow" id="count'+ parseInt(index)+' "> '
				+ ' <td class="col-md-1 center"> '+ index	+ '</td>'
				+ ' <td class="col-md-5">'+ r.lstSponsorCustomWardName[i].wardName + '</td>'
				+ ' <td class="col-md-5 center"> '
				+ '		<input type="text" class="form-control" id="testName'+i+'" value="'+r.lstSponsorCustomWardName[i].customWardName+'"> </input>'
				+ '		<input type="hidden"  id="chargeMasterId'+i+'" value="'+r.lstSponsorCustomWardName[i].chargeMasterId+'"> </input>'
				+ '		<input type="hidden"  id="id'+i+'" value="'+r.lstSponsorCustomWardName[i].id+'"> </input>'
				+ ' </td>'			
				+ '</tr>';
		index++;
	}
	$("#testDetailsTempBody").html(htm);
	
	
	
	
}



function  saveTestDetails(){
	var rows = $('#testDetails tbody tr.newRowHistoryRow').length;

	var lstTestData = {
			lstSponsorCustomWardName : []
		};
	  
	var sponsorId=$("#sponsorId").val();
	
	for ( var i = 0; i <= rows; i++) {
		var testName = $("#testName" + i).val();
	 
		if(testName == "-" || testName == " " || testName =="null" || testName == null || testName == "undefined" || testName == undefined){
			
		}else{
		var id = $("#id" + i).val();
		var chargeMasterId = $("#chargeMasterId" + i).val();
		
		setTestDetailsData(lstTestData, id,testName,chargeMasterId,sponsorId);
		}
	}
	var inputs = [];
	lstTestData = JSON.stringify(lstTestData);
	inputs.push("wardDeatisls="	+ encodeURIComponent(lstTestData));
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/sponsorcustomtest/saveSponsorCustomWardName",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r == 1) {
				alert("Record Saved Successfully");
				getWardDetailsBySponsorId();
				
			}else if(r==2) {
				alert("Record Updated Successfully");
				getWardDetailsBySponsorId();
				
			}
			else {
				alert("Network Issue..");
			}

			
			

		}
	});
	
}

function setTestDetailsData(lstTestData, id,testName,chargeMasterId,sponsorId){
	var userId=$("#userId").val();
	var unitId=$("#unitId").val();
	lstTestData.lstSponsorCustomWardName.push({
		id : id,
		customWardName : testName,
		chargeMasterId : chargeMasterId,
		sponsorId : sponsorId,
		userId : userId,
		unitId : unitId,
	});
}


function fecthSubServiceList(id){
	
	var sponsorId = ($("#sponsorId").val()).trim();
	var searchText = $("#" + id).val();
	
	var letter = searchText;
	
	if(sponsorId == 0 || sponsorId == "" || sponsorId == null || sponsorId == "null" || sponsorId == "undefined" || sponsorId == undefined){
		alert("Please Select Sponsor First");
		return false;
	}
	
	var inputs = [];
	

	inputs.push('searchText=' + letter);
	
	
	var str = inputs.join('&');
	

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/sponsorcustomtest/getWardListAutoSuggestion",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var resultData = [];
						var template = "";
						
						for ( var j = 0; j < r.lstChargesSlave.length; j++) {
							
							
							
							var arrValue = r.lstChargesSlave[j].slaveId +"-"+r.lstChargesSlave[j].categoryName;
							var idValue = r.lstChargesSlave[j].slaveId;
							var productName = r.lstChargesSlave[j].categoryName;
							
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


function getTestDetailsBySubServiceId(chargeId){

	
	var sponsorId =$("#sponsorId").val();
	
	
	
	if(sponsorId == 0 || sponsorId == null || sponsorId == "null" || sponsorId == undefined || sponsorId == "undefined"){
		alert("Please Select Sponsor First");
		return false;
	}
	
	var inputs = [];
	
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('chargeId=' + chargeId);
	
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/sponsorcustomtest/getWardDetailsBysponsorIdandChargeId",
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