/************
* @author	: Akshata Desai
* @date		: O6-Feb-2020
* @codeFor	: Save Organ master
 ************/
function saveOrganMaster(){
	
	var organ_name = $("#organName").val();
	var organ_id = $("#organId").val();
	var userId= $("#userId").val();
	var unitId= $("#unitId").val();
	
	if(organ_name=="" || organ_name==undefined || organ_name==null || organ_name=="null"  ){
		alert("please enter organ name");		
		$("#organName").focus();					
		return false;
	}	
	
	var inputs = [];	
	inputs.push('organName=' + organ_name);
	inputs.push('organId=' + organ_id);
	inputs.push('userId='+userId);
	inputs.push('createdBy='+userId);
	inputs.push('unitId='+unitId);
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/organ/saveOrgan",
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
			 alertify.success("Organ name already exists");
		 }
		 else {
				alertify.error("Oops having some issued");
				
			}
			getAllOrganMaster();
			refreshOrganMaster();
		},		
	});
}

/************
* @author	: Akshata Desai
* @date		: O6-Feb-2020
* @codeFor	: Refresh Organ master
 ************/

function refreshOrganMaster(){
	$('#organName').val('');
	$('#organId').val(0);
	
	
}

function toggleEntryDiv(){
	$("#divForEntryOrgan").toggle('slow');
}

/************
* @author	: Akshata Desai
* @date		: O6-Feb-2020
* @codeFor	: List of Organ master
 ************/
function getAllOrganMaster(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organ/getAllOrganMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllOrganMaster(r,"All");		
			var organListTemp = "";
			organListTemp = organListTemp + "<option value='0'>--Select Organ--</option>";
			for ( var i = 0; i < r.lstOrganMaster.length; i++) {
				organListTemp = organListTemp + "<option value=" +r.lstOrganMaster[i].organId + " data-name="+r.lstOrganMaster[i].organName+">"
					+ r.lstOrganMaster[i].organName + "</option>";
			}
			$("#bodyPart").html(organListTemp);
			setdatatocepTemp(r);
			setdatatoaccessTemp(r);
		}
	});
}

function setdatatocepTemp(r){
	var organListTemp = "";
	organListTemp = organListTemp + "<option value='0'>--Select Organ--</option>";
	for ( var i = 0; i < r.lstOrganMaster.length; i++) {
		organListTemp = organListTemp + "<option value=" +r.lstOrganMaster[i].organId + " data-name="+r.lstOrganMaster[i].organName+">"
			+ r.lstOrganMaster[i].organName + "</option>";
	}
	$("#cporgans").html(organListTemp);	
	$("#cporgans").select2();	
}

function setdatatoaccessTemp(r){
	var organListAccessTemp = "";
	organListAccessTemp = organListAccessTemp + "<option value='0'>--Select Organ--</option>";
	for ( var i = 0; i < r.lstOrganMaster.length; i++) {
		organListAccessTemp = organListAccessTemp + "<option value=" +r.lstOrganMaster[i].organId + " data-name="+r.lstOrganMaster[i].organName+">"
			+ r.lstOrganMaster[i].organName + "</option>";
	}
	$("#accessTemporgans").html(organListAccessTemp);	
	$("#accessTemporgans").select2();	
}
function setAllOrganMaster(r,CallFrom){

	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.lstOrganMaster.length; i++) {		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstOrganMaster[i].organId+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstOrganMaster[i].organName+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success editUserAccess" onclick=editOrganMaster('+r.lstOrganMaster[i].organId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteOrganMaster('+r.lstOrganMaster[i].organId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.organId+'</td>'
			+ ' <td class="col-md-1 center">'+r.organName+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editOrganMaster('+r.organId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganMaster('+r.organId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;	
	}			
	$("#organDetails").html(htm);
	
	
}

/************
* @author	: Akshata Desai
* @date		: O6-Feb-2020
* @codeFor	: Edit Organ master
 ************/
function editOrganMaster(organ_Id){		
	var inputs = [];
	inputs.push('organ_Id=' + organ_Id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organ/editOrganMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {		
			$("#divForEntryOrgan").show('slow');
			$('#searchId').val('');
			$('#organName').val(r.organName);
			$('#organId').val(r.organId);			
		}
	});
}

/************
* @author	: Akshata Desai
* @date		: O6-Feb-2020
* @codeFor	: Delete Organ master
 ************/
function deleteOrganMaster(organ_Id) {
	var r = confirm("Are You Sure You Want To Delete Organ Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/organ/deleteOrganMaster",
			data : {
				"organ_Id" : organ_Id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshOrganMaster();
				getAllOrganMaster();
			}
		});
	}
}

/************
* @author	: Akshata Desai
* @date		: 7-Feb-2020
* @codeFor	: auttosuggestion for Organ Master
 ************/


function centerOrganAutoSuggestion(inputID) {
	var resultData = [];
	var organName = $("#" + inputID).val();

	if (organName == "" || organName == null || organName == "null"	|| organName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllOrganMaster();
		return false;
	}

	var inputs = [];
	inputs.push('organName=' + organName);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/organ/centerOrganAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstOrganMaster.length; j++) {
				var arrValue = response.lstOrganMaster[j].organId +"-"+response.lstOrganMaster[j].organName;
				var idValue = response.lstOrganMaster[j].organId;
				var organName = response.lstOrganMaster[j].organName;
				resultData.push({
					ID : idValue,
					Name : organName
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
		var organId = res[0];
		var organName = res[1];		
		getOrganMasterBystateId(organId);
		$("input#" + inputID).val(organName);
	}
}

/************
* @author	: Akshata Desai
* @date		: 7-Feb-2020
* @codeFor	:  get getOrganMasterBystateId Detail
 ************/
function getOrganMasterBystateId(organ_Id){
	var inputs = [];
	inputs.push('organ_Id=' + organ_Id);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organ/editOrganMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllOrganMaster(r,"search");
			
		}
		
	});

}

/************
* @author	: Akshata Desai
* @date		: 7-feb-2020
* @codeFor	:  get centerOrganMasterSearchById 
 ************/
function centerOrganMasterSearchById(){
	
	var organId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(organId)) {
		alert("Please Enter Number Only!");
		$("#organId").focus();
		return false;
	}
	getOrganMasterBystateId(organId);	
}