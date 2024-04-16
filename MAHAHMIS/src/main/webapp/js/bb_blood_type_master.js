/**
* @Author: Akshata Desai
* @Code :This code for Open the div
* @return
**/
function toggleEntryDiv(id) {

	if (id == "divForEdit") {

		$("#divForEntryBloodType").show('slow');
	} else {

		$("#divForEntryBloodType").toggle('slow');
	}
}

/**
* @Author: Akshata Desai
* @Code :Save Type Master
* @return
**/
function saveBloodType(){
var bloodTypeName = $("#bloodTypeName").val();
var bloodTypeId = $("#bloodTypeId").val();
var userId= $("#userId").val();
var unitId= $("#unitId").val();

if(bloodTypeName=="" || bloodTypeName==undefined || bloodTypeName==null || bloodTypeName=="null"  ){
	alert("please enter Blood Type name");		
	$("#bloodTypeName").focus();					
	return false;
}	

var inputs = [];	
inputs.push('bloodTypeName=' + bloodTypeName);
inputs.push('bloodTypeId=' + bloodTypeId);
inputs.push('createdBy='+userId);
inputs.push('unitId='+unitId);
var str1 = inputs.join('&');

jQuery.ajax({
	type :"POST",
	url :"ehat/bb_blood_type/saveTypeGroup",
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
		 alertify.success("Blood Group already exists");
	 }
	 else {
			alertify.error("Oops having some issued");
			
		}
		getAllBloodTypeMaster();
		refreshBloodTypeMaster();
	},
	
})
}

/**
* @Author: Akshata Desai
* @Code :refresh Type Master
* @return
**/
function refreshBloodTypeMaster(){
	$('#bloodTypeName').val('');
	$('#bloodTypeId').val(0);
	
	
}

/**
* @Author: Akshata Desai
* @Code :get all Type Master
* @return
**/

function getAllBloodTypeMaster(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_blood_type/getAllBloodTypeMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllBloodTypeMaster(r,"All");			
		}
	});
}

/**
* @Author: Akshata Desai
* @Code :set all Type Master
* @return
**/
function setAllBloodTypeMaster(r,CallFrom){

	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.lstBloodTypeMaster.length; i++) {		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstBloodTypeMaster[i].bloodTypeId+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstBloodTypeMaster[i].bloodTypeName+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editBloodTypeMaster('+r.lstBloodTypeMaster[i].bloodTypeId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodTypeMaster('+r.lstBloodTypeMaster[i].bloodTypeId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.bloodTypeId+'</td>'
			+ ' <td class="col-md-1 center">'+r.bloodTypeName+'</td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editBloodTypeMaster('+r.bloodTypeId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodTypeMaster('+r.bloodTypeId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;	
	}			
	$("#bloodTypeDetails").html(htm);
}

/**
* @Author: Akshata Desai
* @Code :edit Type Master
* @return
**/
function editBloodTypeMaster(bloodTypeId){
	var inputs = [];
	inputs.push('bloodTypeId=' + bloodTypeId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_blood_type/editBloodTypeMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
			$('#searchId').val('');
			$("#divForEntryBloodType").show('slow');
			$('#bloodTypeName').val(r.bloodTypeName);
			$('#bloodTypeId').val(r.bloodTypeId);	
			
		}
	});
}

/**
* @Author: Akshata Desai
* @Code :delete Type Master
* @return
**/

function deleteBloodTypeMaster(bloodTypeId) {
	var r = confirm("Are You Sure You Want To Delete Blood Type Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/bb_blood_type/deleteBloodTypeMaster",
			data : {
				"bloodTypeId" : bloodTypeId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshBloodTypeMaster();
				getAllBloodTypeMaster();
			}
		});
	}
}

/**
* @Author: Akshata Desai
* @Code :serach Type Master
* @return
**/

function centerBloodTypeAutoSuggestion(inputID) {
	var resultData = [];
	var bloodTypeName = $("#" + inputID).val();


	if (bloodTypeName == "" || bloodTypeName == null || bloodTypeName == "null"	|| bloodTypeName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllBloodTypeMaster();
		
		return false;
	}

	var inputs = [];
	inputs.push('bloodTypeName=' + bloodTypeName);;
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bb_blood_type/centerBloodTypeAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstBloodTypeMaster.length; j++) {
				var arrValue = response.lstBloodTypeMaster[j].bloodTypeId +"-"+response.lstBloodTypeMaster[j].bloodTypeName;
				var idValue = response.lstBloodTypeMaster[j].bloodTypeId;
				var bloodGroupName = response.lstBloodTypeMaster[j].bloodTypeName;
				resultData.push({
					ID : idValue,
					Name : bloodTypeName,
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
		var bloodTypeId = res[0];
		var bloodTypeName = res[1];	
		getBloodTypeMasterBybloodTypeId(bloodTypeId);
		$("input#" + inputID).val(bloodTypeName);
	}
}


function getBloodTypeMasterBybloodTypeId(bloodTypeId){
	var inputs = [];
	inputs.push('bloodTypeId=' + bloodTypeId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_blood_type/editBloodTypeMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllBloodTypeMaster(r,"search");
			refreshBloodTypeMaster();
		}
		
	});

}


function centerBloodGroupMasterSearchById(){

	var bloodTypeId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(bloodTypeId)) {
		alert("Please Enter Number Only!");
		$("#bloodTypeId").focus();
		return false;
	}
	getBloodTypeMasterBybloodTypeId(bloodGroupId);	
}


