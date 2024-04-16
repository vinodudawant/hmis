/************
* @author	: Rahul Patil
* @date		: 9-Dec-2021
* @codeFor	: Save for Subjective Objective Master
 ************/
function saveSubjectiveObjectiveMaster(){
	var subjective_type = $('#subjective_objective_tempType').val();
	var subjective_Id = $('#subjectiveId').val();
	var userId= $("#userId").val();
	var unitId= $("#unitId").val();
	if(subjective_type=="" || subjective_type==undefined || subjective_type==null || subjective_type=="null"  ){
		alert("please enter subjective Objective Temp Type");		
		$("#subjective_objective_tempType").focus();					
		return false;
	}	
	var inputs = [];	
	inputs.push('subjectiveObjectivetempType=' + subjective_type);
	inputs.push('subjectiveId=' + subjective_Id);
	inputs.push('userId='+userId);
	inputs.push('createdBy='+userId);
	inputs.push('unitId='+unitId);
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/subjective/saveSubjective",
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
			 alertify.success("Subjective Objective Temp Type name already exists");
		 }
		 else {
				alertify.error("Oops having some issued");
				
			}
			getAllSubjectiveMaster();
		 refreshSubjectiveMaster();
		},		
	});
	
}
/************
* @author	: Rahul Patil
* @date		: 9-Dec-2021
* @codeFor	: Refresh for Subjective Objective Master
 ************/
function refreshSubjectiveMaster(){
	$('#subjective_objective_tempType').val('');
	$('#subjectiveId').val(0);
}

/************
* @author	: Rahul Patil
* @date		: 9-Dec-2021
* @codeFor	: Get data of Subjective Objective Master
 ************/

function getAllSubjectiveMaster(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/subjective/getAllSubjectiveMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllSubjectiveMaster(r,"All");		
			var subjectiveListTemp = "";
			subjectiveListTemp = subjectiveListTemp + "<option value='0'>--Select Subjective--</option>";
			for ( var i = 0; i < r.lstSubjectiveMaster.length; i++) {
				subjectiveListTemp = subjectiveListTemp + "<option value=" +r.lstSubjectiveMaster[i].subjectiveId + " data-name="+r.lstSubjectiveMaster[i].subjectiveObjectivetempType+">"
					+ r.lstSubjectiveMaster[i].subjectiveObjectivetempType + "</option>";
			}
			$("#bodyPart").html(subjectiveListTemp);
			setdatatocepTemp(r);
			setdatatoaccessTemp(r);
		}
	});

}
function setdatatocepTemp(r){
	var subjectiveListTemp = "";
	subjectiveListTemp = subjectiveListTemp + "<option value='0'>--Select Subjective Objective Temp Type--</option>";
	for ( var i = 0; i < r.lstSubjectiveMaster.length; i++) {
		subjectiveListTemp = subjectiveListTemp + "<option value=" +r.lstSubjectiveMaster[i].subjectiveId + " data-name="+r.lstSubjectiveMaster[i].subjectiveObjectivetempType+">"
			+ r.lstSubjectiveMaster[i].subjectiveObjectivetempType + "</option>";
	}
	$("#cpsubjective").html(subjectiveListTemp);	
	$("#cpsubjective").select2();	
}

function setdatatoaccessTemp(r){
	var subjectiveListAccessTemp = "";
	subjectiveListAccessTemp = subjectiveListAccessTemp + "<option value='0'>--Select Subjective Objective Temp Type--</option>";
	for ( var i = 0; i < r.lstSubjectiveMaster.length; i++) {
		subjectiveListAccessTemp = subjectiveListAccessTemp + "<option value=" +r.lstSubjectiveMaster[i].subjectiveId + " data-name="+r.lstSubjectiveMaster[i].subjectiveObjectivetempType+">"
			+ r.lstSubjectiveMaster[i].subjectiveObjectivetempType + "</option>";
	}
	$("#accessTempsubjective").html(subjectiveListAccessTemp);	
	$("#accessTempsubjective").select2();	
}

/************
* @author	: Rahul Patil
* @date		: 10-Dec-2021
* @codeFor	: Set Subjective Objective Master
 ************/
function setAllSubjectiveMaster(r,CallFrom){

	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.lstSubjectiveMaster.length; i++) {		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstSubjectiveMaster[i].subjectiveId+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstSubjectiveMaster[i].subjectiveObjectivetempType+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editSubjectiveMaster('+r.lstSubjectiveMaster[i].subjectiveId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteSubjectiveMaster('+r.lstSubjectiveMaster[i].subjectiveId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.subjectiveId+'</td>'
			+ ' <td class="col-md-1 center">'+r.subjectiveObjectivetempType+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editSubjectiveMaster('+r.subjectiveId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteSubjectiveMaster('+r.subjectiveId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;	
	}			
	$("#subjectiveDetails").html(htm);
	
	
}

/************
* @author	: Rahul Patil
* @date		: 10-Dec-2021
* @codeFor	: Edit of Subjective Objective Master
 ************/
function editSubjectiveMaster(subjective_Id){
	var inputs = [];
	inputs.push('subId=' + subjective_Id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/subjective/editSubjectiveMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
			
			$("#divForEntrySubjective").show('slow');
			$('#searchId').val('');
			$('#subjective_objective_tempType').val(r.subjectiveObjectivetempType);
			$('#subjectiveId').val(r.subjectiveId);			
		}
	});

}

/************
* @author	: Rahul Patil
* @date		: 10-Dec-2021
* @codeFor	: Delete data of Subjective Objective Master
 ************/

function deleteSubjectiveMaster(subjective_Id){

	var r = confirm("Are You Sure You Want To Delete Subjective Objective Temp Type Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/subjective/deleteSubjectiveDTO",
			data : {
				"subId" : subjective_Id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshSubjectiveMaster();
				getAllSubjectiveMaster();
			}
		});
	}

	
}

/************
* @author	: Rahul Patil
* @date		: 10-Dec-2021
* @codeFor	: Search data for Subjective Objective Master
 ************/
function centerSubjectiveAutoSuggestion(inputID) {
	var resultData = [];
	var subjective_objective_tempType = $("#" + inputID).val();

	if (subjective_objective_tempType == "" || subjective_objective_tempType == null || subjective_objective_tempType == "null"	|| subjective_objective_tempType == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllSubjectiveMaster();
		return false;
	}

	var inputs = [];
	inputs.push('subjective_objective_tempType=' + subjective_objective_tempType);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/subjective/centerSubjectiveAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstSubjectiveMaster.length; j++) {
				var arrValue = response.lstSubjectiveMaster[j].subjectiveId +"-"+response.lstSubjectiveMaster[j].subjectiveObjectivetempType;
				var idValue = response.lstSubjectiveMaster[j].subjectiveId;
				var subjective_objective_tempType = response.lstSubjectiveMaster[j].subjectiveObjectivetempType;
				resultData.push({
					ID : idValue,
					Name : subjective_objective_tempType
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
		var subjectiveId = res[0];
		var subjective_objective_tempType = res[1];		
		getSubjectiveMasterBystateId(subjectiveId);
		$("input#" + inputID).val(subjective_objective_tempType);
	}
}

/************
* @author	: Rahul Patil
* @date		: 10-Dec-2021
* @codeFor	: Get data by ID for Subjective Objective Master
 ************/
function getSubjectiveMasterBystateId(subjectiveId){
	var inputs = [];
	inputs.push('subId=' + subjectiveId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/subjective/editSubjectiveMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllSubjectiveMaster(r,"search");
			
		}
		
	});

}

/************
* @author	: Rahul Patil
* @date		: 10-Dec-2021
* @codeFor	: Search data by ID for Subjective Objective Master
 ************/

function centerSubjectiveMasterSearchById(){
	
	var subjectiveId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(subjectiveId)) {
		alert("Please Enter Number Only!");
		$("#subjectiveId").focus();
		return false;
	}
	getSubjectiveMasterBystateId(subjectiveId);	
}

/************
* @author	: Rahul Patil
* @date		: 9-Dec-2021
* @codeFor	: Code for toggle
 ************/
function toggleEntryDiv(){
	$("#divForEntrySubjective").toggle('slow');
}