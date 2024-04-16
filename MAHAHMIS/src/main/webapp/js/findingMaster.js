
/************
Finding Master 
***************/

function toggleEntryDivForFindingMaster(){
	
	$("#divForFindingMaster").toggle('slow');
}

/************
* @author	:Rohini Ambhore
* @date		: 13-Dec-2021
* @codeFor	: Save Finding Master
 **************/

function saveFindingMaster(){
	
	
	var findingMasterId = $("#findingMasterId").val();
	var findingName = $("#findingName").val();	
	
	if(findingName == "" || findingName == undefined ){
		alert("Please Insert Finding Name!");
		return false;
	}
	
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	
	var inputs = [];

	inputs.push('findingMasterId=' + findingMasterId);
	inputs.push('findingName=' + findingName);	
	
	inputs.push('userId=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('createdBy=' + userId);	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subjectiveObject/saveFindingMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error...');
		},
		success : function(r) {
			alert((r));
			
			alertify.success(r);
			
			
			}
	});

    refreshFindingMaster();
	getAllFindingMasters();
}



function refreshFindingMaster(){

	        $('#findingMasterId').val("");
			$('#findingName').val("");
			
}

/************
* @author	:Rohini Ambhore
* @date		: 13-Dec-2021
* @codeFor	: To Get List Of Finding master
 **************/

function getAllFindingMasters()
{
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/subjectiveObject/getAllFindingMasters",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setAllFindingMaster(r,"All");		
			
		}
	});
	
}

/************
* @author	:Rohini Ambhore
* @date		: O9-Dec-2021
* @codeFor	: To set List Of Finding master
 **************/

function setAllFindingMaster(r,CallFrom){

	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.lstFindingMaster.length; i++) {	
			
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstFindingMaster[i].findingMasterId+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstFindingMaster[i].findingName+'</td>'
				
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editFindingMaster('+r.lstFindingMaster[i].findingMasterId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger editUserAccess" onclick=deletFindingMaster('+r.lstFindingMaster[i].findingMasterId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.findingMasterId+'</td>'
			+ ' <td class="col-md-1 center">'+r.findingName+'</td>'
			//+ ' <td class="col-md-1 center">'+r.lstSubjectiveObjectiveTempDto[i].subTemplateType+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editFindingMaster('+r.findingMasterId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger editUserAccess" onclick=deletFindingMaster('+r.findingMasterId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;	
	}			
	$("#subObjMasterDetails").html(htm);
	
}


/************
* @author	: Rohini Ambhore 
* @date		: O9-Dec-2021
* @codeFor	: Edit Subjective Objective Template master
 ************/
function editFindingMaster(findingMasterId){
	
	var inputs = [];
	inputs.push('findingMasterId=' + findingMasterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/subjectiveObject/editFindingMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {		
		
			$("#divForFindingMaster").show('slow');
			$('#searchId').val('');
			
			$('#findingMasterId').val(r.findingMasterId);	
			$('#findingName').val(r.findingName);	
		
		}
	});
}


/************
* @author	: Rohini Ambhore 
* @date		: 13-Dec-2021
* @codeFor	: Delete Finding master
 ************/

function deletFindingMaster(findingMasterId) {
	var r = confirm("Are You Sure You Want To Delete Subjective Objective Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/subjectiveObject/deletFindingMaster",
			data : {
				"findingMasterId" : findingMasterId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				
				alertify.error(response);
				
				refreshFindingMaster();
				getAllFindingMasters();
			}
		});
	}
}


/************
* @author	: Rohini Ambhore 
* @date		: 13-Dec-2021
* @codeFor	: auttosuggestion for Master Master
 ************/

function FindingMasterAutoSuggestion(inputID) {
	
	var resultData = [];
	var findingName = $("#" + inputID).val();

	if (findingName == "" || findingName == null || findingName == "null"	|| findingName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllSubObjective();
		return false;
	}

	var inputs = [];
	inputs.push('findingName=' + findingName);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subjectiveObject/FindingMasterAutoSuggestion",
		cache : false,
		success : function(response) {
	
	var template = "";
			for ( var j = 0; j < response.lstFindingMaster.length; j++) {
				 
				var arrValue = response.lstFindingMaster[j].findingMasterId +"-"+response.lstFindingMaster[j].findingName;
			
				var idValue = response.lstFindingMaster[j].findingMasterId;
				var subObjName = response.lstFindingMaster[j].findingName;
				
				resultData.push({
					ID : idValue,
					Name : subObjName
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
		var findingMasterId = res[0];
		var findingName = res[1];	
				
		getFindingMasterByFindingMasterId(findingMasterId);
		$("input#" + inputID).val(subTempName);
	}

}



/************
* @author	: Rohini Ambhore 
* @date		: 10-Dec-2021
* @codeFor	:  get getSubObjMaster Detail BysubObjTempId 
 ************/
function getFindingMasterByFindingMasterId(findingMasterId){
	
	var inputs = [];
	inputs.push('findingMasterId=' + findingMasterId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/subjectiveObject/editFindingMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			$("#searchId").val('');
			setAllFindingMaster(r,"search");
			
		}
		
	});

}



/************
* @author	: Rohini Ambhore
* @date		: 13-Dec-2021
* @codeFor	:  get centerFindingMasterSearchById 
 ************/

function centerFindingMasterSearchById(){
	
	var findingMasterId = $("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(findingMasterId)) {
		alert("Please Enter Number Only!");
		$("#findingMasterId").focus();
		return false;
	}
	getFindingMasterByFindingMasterId(findingMasterId);	
}	

	
