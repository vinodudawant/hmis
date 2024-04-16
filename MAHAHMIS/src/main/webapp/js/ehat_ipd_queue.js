/************
* @author	: Dayanand Khandekar
* @date		: 26-04-2021
* @codeFor	: Get all IPD Patient
 ************/
function getIpdQueue(){
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/ipdbill/viewIpdQueue",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setIpdQueuePatientList(r,"All");			
		}
	});
}

/************
* @author	: Dayanand Khandekar
* @date		: 26-04-2021
* @codeFor	: setIpdQueuePatientList
 ************/
function setIpdQueuePatientList(r,callFrom){

	var htm ="";
	var index = 1;
	 if(callFrom === "All"){
				for ( var i = 0; i < r.lstIpdQueue.length; i++) {		
							htm = htm + '<tr> '
							+ ' <td class="col-md-1 center">'+index+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstIpdQueue[i].patientName+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstIpdQueue[i].mobile+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstIpdQueue[i].mrnno+'</td>'	
							+ ' <td class="col-md-1 center">'+r.lstIpdQueue[i].centerPatientId+'</td>'	
							+ ' <td class="col-md-1 center">'+r.lstIpdQueue[i].opdipdno+'</td>'	
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success" onclick=viewBedWard('+r.lstIpdQueue[i].treatId+')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger" onclick=deleteStateMaster('+r.lstIpdQueue[i].treatId+')><i class="fa fa-trash-o"></i></button></td>'
							+ '</tr>';
							index++;
						}
	 }else if(callFrom === "ById"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.patientName+'</td>'
			+ ' <td class="col-md-1 center">'+r.mobile+'</td>'
			+ ' <td class="col-md-1 center">'+r.mrnno+'</td>'	
			+ ' <td class="col-md-1 center">'+r.centerPatientId+'</td>'	
			+ ' <td class="col-md-1 center">'+r.opdipdno+'</td>'	
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=viewBedWard('+r.treatId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteStateMaster('+r.treatId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
	 }
			
	$("#ipdQuepatientDeatilsDetails").html(htm);
}

function setAutoPatientName(inputID) {
	var resultData = [];
var searchText = $("#" + inputID).val();

if (searchText == "" || searchText == null || searchText == "null"	|| searchText == undefined) {

	alert("Please enter search value");
	$("#" + inputID).focus();
	getIpdQueue();
	return false;
}

var inputs = [];
inputs.push('searchText=' + searchText);
//inputs.push('callFrom=' + callFrom);
var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "POST",
	data : str + "&reqType=AJAX",
	url : "ehat/ipdbill/autoSuggestationIpdQueue",
	cache : false,
	success : function(response) {

		var template = "";
		if( response.lstIpdQueue.length == 0){
			alertify.error("Record Not Found.....");
			 $("#" + inputID).val(" ");
			return false;
		}
		for ( var j = 0; j < response.lstIpdQueue.length; j++) {
			var arrValue = response.lstIpdQueue[j].treatId +"-"+response.lstIpdQueue[j].patientName;
			var idValue = response.lstIpdQueue[j].treatId;
			var stateName = response.lstIpdQueue[j].patientName;
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
	var stateId = res[0];
	var stateName = res[1];		
	getIpdQueuePatientByTreatmentId(stateId);
	$("input#" + inputID).val(stateName);
}
}

function getIpdQueuePatientByTreatmentId(treatId){
	var inputs = [];
	inputs.push('treatId=' + treatId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbill/getIpdQueuePatientByTreatmentId",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setIpdQueuePatientList(r,"ById");			
		}
	});
}

function viewBedWard(treatId){
	window.location.href = "ehat_IPD_BedWard.jsp?treatId=" + treatId;
}