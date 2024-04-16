/************
* @author	: Akshata Desai
* @date		: 11-March-2020
* @codeFor	:  toggleEntryDiv
 ************/
function toggleEntryDiv(id) {

	/*$("#"+id).slideToggle('slow', function() {
	});*/
	if (id == "divForEdit") {

		$("#divForEntryHistory").show('slow');
	} else {

		$("#divForEntryHistory").toggle('slow');
	}
}
/************
* @author	: Akshata Desai
* @date		: 11-March-2020
* @codeFor	:  Save History Details
 ************/
function saveHistoryMaster(){
	var history_name = $("#historyName").val();
	var historyCode = $("#historyCode").val();
	var history_id = $("#historyId").val();
	var userId=$("#userId").val();
	var unitId=$("#unitId").val();
	if(history_name=="" || history_name==undefined || history_name==null || history_name=="null"  ){
		alert("please enter history");		
		$("#historyName").focus();					
		return false;
	}
	
	if(historyCode=="" || historyCode==undefined || historyCode==null || historyCode=="null"  ){
		alert("please enter history Code");		
		$("#historyCode").focus();					
		return false;
	}
	var inputs = [];	
	inputs.push('historyName=' + history_name);
	inputs.push('historyId=' + history_id);
	inputs.push('historyCode='+historyCode);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	var str1 = inputs.join('&');
	jQuery.ajax({
		type :"POST",
		url :"ehat/history_master/saveHistory",
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
			 alertify.success("History already exists");
		 }
		 else {
				alertify.error("Oops having some issued");
				
			}
			getAllHistoryMaster();
			refreshHistoryMaster();
		},		
	})
	
}
/************
* @author	: Akshata Desai
* @date		: 11-March-2020
* @codeFor	:  Refresh History Details
 ************/
function refreshHistoryMaster(){
	$('#historyName').val('');
	$('#historyId').val(0);
	$('#historyCode').val('');
}
/************
* @author	: Akshata Desai
* @date		: 11-March-2020
* @codeFor	:  Get all History Details
 ************/
function getAllHistoryMaster(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/history_master/getAllHistoryMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllHistoryMaster(r,"All");			
		}
	});
}

function setAllHistoryMaster(r,CallFrom){
	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.lstHistoryMaster.length; i++) {		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstHistoryMaster[i].historyId+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstHistoryMaster[i].historyCode+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstHistoryMaster[i].historyName+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success editUserAccess" onclick=editHistoryMaster('+r.lstHistoryMaster[i].historyId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteHistoryMaster('+r.lstHistoryMaster[i].historyId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.historyId+'</td>'
			+ ' <td class="col-md-1 center">'+r.historyCode+'</td>'
			+ ' <td class="col-md-1 center">'+r.historyName+'</td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editHistoryMaster('+r.historyId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteHistoryMaster('+r.historyId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;	
	}			
	$("#historyDetails").html(htm);
	
}
/************
* @author	: Akshata Desai
* @date		: 11-March-2020
* @codeFor	:  Edit History Record
 ************/
function editHistoryMaster(historyId){
	var inputs = [];
	inputs.push('historyId=' + historyId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/history_master/editHistoryMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
			$("#divForEntryHistory").show('slow');
			$('#searchId').val('');
			$('#historyCode').val(r.historyCode);
			$('#historyName').val(r.historyName);
			$('#historyId').val(r.historyId);			
		}
	});
	
}
/************
* @author	: Akshata Desai
* @date		: 11-March-2020
* @codeFor	: Delete History Record
 ************/
function deleteHistoryMaster(historyId){
	
	var r = confirm("Are You Sure You Want To Delete History Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/history_master/deleteHistoryMaster",
			data : {
				"historyId" : historyId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshHistoryMaster();
				getAllHistoryMaster();
			}
		});
	}
}
/************
* @author	: Akshata Desai
* @date		: 11-March-2020
* @codeFor	: Search History Record
 ************/
function centerHistoryAutoSuggestion(inputID){
	var resultData = [];
	var historyName = $("#" + inputID).val();
	var historyCode = $("#"+inputID).val();
	

	if (historyName == "" || historyName == null || historyName == "null"	|| historyName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllHistoryMaster();
		return false;
	}

	var inputs = [];
	inputs.push('historyName=' + historyName);
	inputs.push('historyCode=' + historyCode);
;
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/history_master/centerHistoryAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstHistoryMaster.length; j++) {
				var arrValue = response.lstHistoryMaster[j].historyId +"-"+response.lstHistoryMaster[j].historyName+"-"+response.lstHistoryMaster[j].historyCode;
				var idValue = response.lstHistoryMaster[j].historyId;
				var historyName = response.lstHistoryMaster[j].historyName;
				var historyCode = response.lstHistoryMaster[j].historyCode;
				resultData.push({
					ID : idValue,
					Name : historyName,
					Code : historyCode
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
		var historyId = res[0];
		var historyName = res[1];	
		var historyCode = res[2];
		getHistoryMasterByHistoryId(historyId);
		$("input#" + inputID).val(historyName);
		$("input#"+inputID).val(historyCode);
	}

}

function getHistoryMasterByHistoryId(historyId){
	var inputs = [];
	inputs.push('historyId=' + historyId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/history_master/editHistoryMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllHistoryMaster(r,"search");
			
		}
		
	});
}
/************
* @author	: Akshata Desai
* @date		: 11-March-2020
* @codeFor	: Search History Record By ID
 ************/
function centerHistoryMasterSearchById(){
	var historyId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(historyId)) {
		alert("Please Enter Number Only!");
		$("#historyId").focus();
		return false;
	}
	getHistoryMasterByHistoryId(historyId);	
}
