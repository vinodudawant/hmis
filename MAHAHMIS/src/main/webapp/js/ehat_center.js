function validateAlphabetsByRegExpression(id){
	var reg = /^[A-Za-z]+$/;
	var value = $('#' + id).val();
	
	if (value != "" && !reg.test(value)) {
		alert("Please Enter Only Alphabets!");
		$('#' + id).val("");
		return false;
	}
}

function setAutoPatientName(inputID,callFrom) {

	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	var inputs = [];	
	inputs.push('findText=' + findingName);	
	inputs.push('callFrom=' + callFrom);		
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/centerMgt/autoSuggestionCenterMaster",
		cache : false,		
		success : function(r) {
			
			var template = "";
			for ( var j = 0; j < r.lstRegviewDto.length; j++) {
				
				var arrValue = r.lstRegviewDto[j].ptId +"-"+r.lstRegviewDto[j].patientName +"-"+r.lstRegviewDto[j].mobile;
				var idValue = r.lstRegviewDto[j].ptId;
				var patName = r.lstRegviewDto[j].patientName;
				resultData.push({
					ID : idValue,
					Name : patName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue
						+ '</a></li>';
			}
			
			setTimeout(function() {

				$("#div" + inputID + " .typeahead").html(template);
				$("#div" + inputID + " .typeahead").show();
				
				$("#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {

		var res = item.text.split('-');
		var patId = res[0];
		var patName = res[1];
		//var patMobile = res[2];
		
		$("#" + inputID).val(patName);	
		
		if(callFrom == "stateMaster"){
			
			setSearchedPatientPrevOpdDDTemp(patId);
			
		}else if(callFrom == "districtMaster"){
			
			setSearchedPatientPrevIpdDDTemp(patId);
		}			
	}
}

/************
* @author	: Vinod Udawant
* @date		: 21-Oct-2019
* @codeFor	: Save state master
 ************/
function saveStateMaster() {
	
	var stateName = $('#stateName').val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var stateId = $('#stateId').val();
	
	if(stateName=="" || stateName==undefined || stateName==null || stateName=="null"  ){
		
		alert("please enter state name");		
		$("#stateName").focus();					
		return false;
	}	
	var inputs = [];	
	inputs.push('stateName=' + stateName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('stateId=' + stateId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/centerMgt/saveStateMaster",
		data	: str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(r) {
			
			if (r == 1) {
				
				alertify.success("Records Saved Sucessfully");				
			} else if (r == 2) {
				
				alertify.success( "Records Updated Sucessfully");				
			}else if (r == 3) {				
				
				alertify.error("State Name is Already Exist");				
			}else {
				
				alertify.error("Oops Some Problem Ocured");
			}
			refreshStateMaster();
			getAllStateMaster();
		}
	});	
}

/************
* @author	: Vinod Udawant
* @date		: 21-Oct-2019
* @codeFor	: Refresh state master
 ************/
function refreshStateMaster(){
	
	$('#stateName').val('');
	$('#stateId').val(0);
}

/************
* @author	: Vinod Udawant
* @date		: 21-Oct-2019
* @codeFor	: Get all state master
 ************/
function getAllStateMaster(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgt/getAllStateMaster",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllStateMaster(r,"All");			
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 21-Oct-2019
* @codeFor	: Set all state master
 ************/
function setAllStateMaster(r,CallFrom){

	var htm ="";
	var index = 1;
	if(CallFrom=="All")
		{
				for ( var i = 0; i < r.lstStateMaster.length; i++) {		
							htm = htm + '<tr> '
							+ ' <td class="col-md-1 center">'+index+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstStateMaster[i].stateId+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstStateMaster[i].stateName+'</td>'		
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success editUserAccess" onclick=editStateMaster('+r.lstStateMaster[i].stateId+')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteStateMaster('+r.lstStateMaster[i].stateId+')><i class="fa fa-trash-o"></i></button></td>'
							+ '</tr>';
							index++;
						}
		}else if(CallFrom=="search"){
						htm = htm + '<tr> '
						+ ' <td class="col-md-1 center">'+index+'</td>'
						+ ' <td class="col-md-1 center">'+r.stateId+'</td>'
						+ ' <td class="col-md-1 center">'+r.stateName+'</td>'		
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success editUserAccess" onclick=editStateMaster('+r.stateId+')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteStateMaster('+r.stateId+')><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';
						index++;		
		
		}
			
	$("#stateDetails").html(htm);
}

/************
* @author	: Vinod Udawant
* @date		: 21-Oct-2019
* @codeFor	: Edit state master
 ************/
function editStateMaster(stateId){		
	var inputs = [];
	inputs.push('stateId=' + stateId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgt/editStateMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {			
			$('#stateName').val(r.stateName);
			$('#stateId').val(r.stateId);			
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 21-Oct-2019
* @codeFor	: Delete state master
 ************/
function deleteStateMaster(stateId) {
	var r = confirm("Are You Sure You Want To Delete State Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/centerMgt/deleteStateMaster",
			data : {
				"stateId" : stateId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshStateMaster();
				getAllStateMaster();
			}
		});
	}
}

/************
* @author	: Vinod Udawant
* @date		: 21-Oct-2019
* @codeFor	: Get all state master
 ************/
function getAllStateMasterOption(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgt/getAllStateMaster",
		error : function() {
			alert('Network Issue');
		},
		success : function(r) {
			
			var htm = "<option value=0>--- Select State ---</option>";
			for ( var i = 0; i < r.lstStateMaster.length; i++) {
				
				htm = htm + "<option value="+r.lstStateMaster[i].stateId+">"+r.lstStateMaster[i].stateName+"</option>";
			}
			$("#stateId").html(htm);
			$("#stateId").select2();
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 21-Oct-2019
* @codeFor	: Save district master
 ************/
function saveDistrictMaster() {
	
	var districtId = $('#districtId').val();
	var stateId = $('#stateId').val();
	var districtName = $('#districtName').val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	
	if(districtName=="" || districtName==undefined || districtName==null){
		
		alert("please enter disrict name");		
		$("#districtName").focus();					
		return false;
	}	
	var inputs = [];	
	inputs.push('districtId=' + districtId);
	inputs.push('stateId=' + stateId);
	inputs.push('districtName=' + districtName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);	
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/centerMgt/saveDistrictMaster",
		data	: str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(r) {
			
			if (r == 1) {
				
				alertify.success("Records Saved Sucessfully");				
			} else if (r == 2) {
				
				alertify.success( "Records Updated Sucessfully");				
			}else if (r == 3) {				
				
				alertify.error("District Name is Already Exist");				
			}else {
				
				alertify.error("Oops Some Problem Ocured");
			}
			refreshDistrictMaster();
			getAllDistrictMaster();
		}
	});	
}

/************
* @author	: Vinod Udawant
* @date		: 21-Oct-2019
* @codeFor	: Refresh district master
 ************/
function refreshDistrictMaster(){
	
	//$('#stateId').val('');
	$("#stateId").select2('val',"0");
	$('#districtName').val('');
	$('#districtId').val('0');
}

/************
* @author	: Vinod Udawant
* @date		: 21-Oct-2019
* @codeFor	: Get all district master
 ************/
function getAllDistrictMaster(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgt/getAllDistrictMaster",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllDistrictMaster(r,"All");			
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 21-Oct-2019
* @codeFor	: Set all district master
 ************/
function setAllDistrictMaster(r,CallFrom){

	var htm ="";
	var index = 1;
	if(CallFrom=="All")
		{
				for ( var i = 0; i < r.lstDistrictMaster.length; i++) {		
							htm = htm + '<tr> '
							+ ' <td class="col-md-1 center">'+index+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstDistrictMaster[i].districtId+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstDistrictMaster[i].stateName+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstDistrictMaster[i].districtName+'</td>'		
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success editUserAccess" onclick=editDistrictMaster('+r.lstDistrictMaster[i].districtId+')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteDistrictMaster('+r.lstDistrictMaster[i].districtId+')><i class="fa fa-trash-o"></i></button></td>'
							+ '</tr>';
							index++;
				}
		}else if(CallFrom=="search"){
				htm = htm + '<tr> '
				+ ' <td class="col-md-1 center">'+index+'</td>'
				+ ' <td class="col-md-1 center">'+r.districtId+'</td>'
				+ ' <td class="col-md-1 center">'+r.stateName+'</td>'
				+ ' <td class="col-md-1 center">'+r.districtName+'</td>'		
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editUserAccess" onclick=editDistrictMaster('+r.districtId+')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteDistrictMaster('+r.districtId+')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';
				index++;
			
		}
	$("#districtDetails").html(htm);
}

/************
* @author	: Vinod Udawant
* @date		: 21-Oct-2019
* @codeFor	: Edit district master
 ************/
function editDistrictMaster(districtId){		
	var inputs = [];
	inputs.push('districtId=' + districtId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgt/editDistrictMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {			
			//$('#stateId').val(r.stateId);
			$('#stateId').select2('val',r.stateId);
			$('#districtName').val(r.districtName);
			$('#districtId').val(r.districtId);			
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 21-Oct-2019
* @codeFor	: Delete district master
 ************/
function deleteDistrictMaster(districtId) {
	var r = confirm("Are You Sure You Want To Delete District Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/centerMgt/deleteDistrictMaster",
			data : {
				"districtId" : districtId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshDistrictMaster();
				getAllDistrictMaster();
			}
		});
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	: saveTypeMaster
 ************/
function saveTypeMaster() {
	
	var typeName = $('#typeName').val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var typeId = $('#typeId').val();
	
	if(typeName=="" || typeName==undefined || typeName==null){
		
		alert("please enter type name");		
		$("#typeName").focus();					
		return false;
	}	
	var inputs = [];	
	inputs.push('typeName=' + typeName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('typeId=' + typeId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/centerMgt/saveTypeMaster",
		data	: str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(r) {
			
			if (r == 1) {
				
				alertify.success("Records Saved Sucessfully");				
			} else if (r == 2) {
				
				alertify.success( "Records Updated Sucessfully");				
			}else if (r == 3) {				
				
				alertify.error("Type Name is Already Exist");				
			}else {
				
				alertify.error("Oops Some Problem Ocured");
			}
			refreshTypeMaster();
			getAllTypeMaster();
		}
	});	
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:getAllType Master Detail
 ************/
function getAllTypeMaster(){	
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/centerMgt/getAllTypeMaster",
		error : function() {
			alert('error');
		},
		success : function(r){			
			setTypeMasterDocTemp(r,"All");		
		}
	});	
}

/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  setTypeMasterDocTemp  Detail
 ************/
function setTypeMasterDocTemp(r,callFrom){		
			var htm ="";
			var index = 1;
		if(callFrom=="All")
			{
				for ( var i = 0; i < r.lsttypemaster.length; i++){	
						htm = htm + '<tr> '
							+ ' <td class="col-md-1 center">'+index+'</td>'
							+ ' <td class="col-md-1 center">'+r.lsttypemaster[i].typeId+'</td>'
							+ ' <td class="col-md-1 center">'+r.lsttypemaster[i].typeName+'</td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editTypeMasterDoc('+ r.lsttypemaster[i].typeId+')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteTypeMasterDoc('+ r.lsttypemaster[i].typeId+')><i class="fa fa-trash-o"></i></button></td>'
							+ '</tr>';					
							index++;
				}
			}else if(callFrom==="search"){
				
				htm = htm + '<tr> '
				+ ' <td class="col-md-1 center">'+index+'</td>'
				+ ' <td class="col-md-1 center">'+r.typeId+'</td>'
				+ ' <td class="col-md-1 center">'+r.typeName+'</td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editTypeMasterDoc('+ r.typeId+')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteTypeMasterDoc('+ r.typeId+')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';					
				index++;
				
			}		
	
	$("#typeMasterDetails").html(htm);
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  editTypeMasterDoc  Detail
 ************/
function editTypeMasterDoc(typeId){
	var inputs = [];
	inputs.push('typeId=' + typeId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgt/editTypeMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(myOBJECT) {
			 $("#typeId").val(myOBJECT.typeId);
			$("#typeName").val(myOBJECT.typeName);			
		
		}
		
	});

}
/************
* @author	: Dayanand Khandekar
* @date		: 1-Nov-2019
* @codeFor	:  deleteComanyMasterDoc  Detail
 ************/
function deleteTypeMasterDoc(typeId){
	var r = confirm("Are You Sure You Want To Type Doc");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/centerMgt/deleteTypeMasterDoc",
			data : {
				"typeId" : typeId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response){
				alertify.error(response);
				refreshTypeMaster();
				getAllTypeMaster();
				}
		});
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  refreshTypeMaster  Detail
 ************/
function refreshTypeMaster(){
	 $("#typeId").val('0');
	$("#typeName").val("");
	
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	: auttosuggestion for Type Master
 ************/
function centertypeAutoSuggestion(inputID) {
	var resultData = [];
	var typeName = $("#" + inputID).val();

	if (typeName == "" || typeName == null || typeName == "null"	|| typeName == undefined) {

	
		$("#" + inputID).focus();
		getAllTypeMaster();
		return false;
	}

	var inputs = [];
	inputs.push('typeName=' + typeName);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/centerMgt/centertypeAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lsttypemaster.length; j++) {
				var arrValue = response.lsttypemaster[j].typeId +"-"+response.lsttypemaster[j].typeName;
				var idValue = response.lsttypemaster[j].typeId;
				var typeName = response.lsttypemaster[j].typeName;
				resultData.push({
					ID : idValue,
					Name : typeName
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
		var typeId = res[0];
		var typeName = res[1];		
		getTypeMasterByTypeId(typeId);
		$("input#" + inputID).val(typeName);
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  get getTypeMasterBycompanyId Detail
 ************/
function getTypeMasterByTypeId(typeId){
	var inputs = [];
	inputs.push('typeId=' + typeId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgt/editTypeMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTypeMasterDocTemp(r,"search");
			
		}
		
	});

}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  get centertypeMasterSearchById 
 ************/
function centertypeMasterSearchById(){
	var typeId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(typeId)) {
		alert("Please Enter Number Only!");
		$("#searchId").focus();
		return false;
	}
	getTypeMasterByTypeId(typeId);
	
}

/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	: saveHospitalCodeMaster
 ************/
function saveHospitalCodeMaster() {
	
	var hospitalCode = $('#hospitalCode').val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var hospitalId = $('#hospitalId').val();
	
	if(hospitalCode=="" || hospitalCode==undefined || hospitalCode==null){
		
		alert("please enter hospital code");		
		$("#hospitalCode").focus();					
		return false;
	}	
	var inputs = [];	
	inputs.push('hospitalCode=' + hospitalCode);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('hospitalId=' + hospitalId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/centerMgt/saveHospitalCodeMaster",
		data	: str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(r) {
			
			if (r == 1) {
				
				alertify.success("Records Saved Sucessfully");				
			} else if (r == 2) {
				
				alertify.success( "Records Updated Sucessfully");				
			}else if (r == 3) {				
				
				alertify.error("Code Name is Already Exist");				
			}else {
				
				alertify.error("Oops Some Problem Ocured");
			}
			refreshHospitalCodeMaster();
			getAllHospitalMaster();
		}
	});	
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:getAllHospitalMaster  Detail
 ************/
function getAllHospitalMaster(){	
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/centerMgt/getAllHospitalMaster",
		error : function() {
			alert('error');
		},
		success : function(r){			
			setHospitalMasterDocTemp(r,"All");		
		}
	});	
}

/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  setHospitalMasterDocTemp  Detail
 ************/
function setHospitalMasterDocTemp(r,callFrom){		
			var htm ="";
			var index = 1;
		if(callFrom=="All")
			{
				for ( var i = 0; i < r.lsthospitalDoc.length; i++){	
						htm = htm + '<tr> '
							+ ' <td class="col-md-1 center">'+index+'</td>'
							+ ' <td class="col-md-1 center">'+r.lsthospitalDoc[i].hospitalId+'</td>'
							+ ' <td class="col-md-1 center">'+r.lsthospitalDoc[i].hospitalCode+'</td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editHospitalMasterDoc('+ r.lsthospitalDoc[i].hospitalId+')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteHospitalMasterDoc('+ r.lsthospitalDoc[i].hospitalId+')><i class="fa fa-trash-o"></i></button></td>'
							+ '</tr>';					
							index++;
				}
			}else if(callFrom==="search"){
				
				htm = htm + '<tr> '
				+ ' <td class="col-md-1 center">'+index+'</td>'
				+ ' <td class="col-md-1 center">'+r.hospitalId+'</td>'
				+ ' <td class="col-md-1 center">'+r.hospitalCode+'</td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editHospitalMasterDoc('+ r.hospitalId+')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteHospitalMasterDoc('+ r.hospitalId+')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';					
				index++;
				
			}		
	
	$("#hospitalMasterDetails").html(htm);
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  editHospitalMasterDoc  Detail
 ************/
function editHospitalMasterDoc(hospitalId){
	var inputs = [];
	inputs.push('hospitalId=' + hospitalId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgt/editHospitalMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(myOBJECT) {
			 $("#hospitalId").val(myOBJECT.hospitalId);
			$("#hospitalCode").val(myOBJECT.hospitalCode);			
		
		}
		
	});

}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  deleteHospitalMasterDoc  Detail
 ************/
function deleteHospitalMasterDoc(hospitalId){
	var r = confirm("Are You Sure You Want To Hospital Doc");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/centerMgt/deleteHospitalMasterDoc",
			data : {
				"hospitalId" : hospitalId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response){
				alertify.error(response);
				refreshHospitalCodeMaster();
				getAllHospitalMaster();
				}
		});
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  refreshHospitalCodeMaster  Detail
 ************/
function refreshHospitalCodeMaster(){
	 $("#hospitalId").val('0');
	$("#hospitalCode").val("");
	
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	: auttosuggestion for Hospital/College Code Master
 ************/
function centerhospitalAutoSuggestion(inputID) {
	var resultData = [];
	var hospitalCode = $("#" + inputID).val();

	if (hospitalCode == "" || hospitalCode == null || hospitalCode == "null"	|| hospitalCode == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllHospitalMaster();
		return false;
	}

	var inputs = [];
	inputs.push('hospitalCode=' + hospitalCode);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/centerMgt/centerhospitalAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lsthospitalDoc.length; j++) {
				var arrValue = response.lsthospitalDoc[j].hospitalId +"-"+response.lsthospitalDoc[j].hospitalCode;
				var idValue = response.lsthospitalDoc[j].hospitalId;
				var hospitalCode = response.lsthospitalDoc[j].hospitalCode;
				resultData.push({
					ID : idValue,
					Name : hospitalCode
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
		var hospitalId = res[0];
		var hospitalCode = res[1];		
		getHospitalMasterByhospitalId(hospitalId);
		$("input#" + inputID).val(hospitalCode);
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  get getHospitalMasterByhospitalId Detail
 ************/
function getHospitalMasterByhospitalId(hospitalId){
	var inputs = [];
	inputs.push('hospitalId=' + hospitalId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgt/editHospitalMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setHospitalMasterDocTemp(r,"search");
			
		}
		
	});

}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  get centerHospitalMasterSearchById 
 ************/
function centerHospitalMasterSearchById(){
	var hospitalId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(hospitalId)) {
		alert("Please Enter Number Only!");
		$("#hospitalId").focus();
		return false;
	}
	getHospitalMasterByhospitalId(hospitalId);
	
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	: saveYearMaster
 ************/
function saveYearMaster() {
	
	var year = $('#year').val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var yearId = $('#yearId').val();
	
	if(year=="" || year==undefined || year==null){
		
		alert("please enter year");		
		$("#year").focus();					
		return false;
	}	
	var inputs = [];	
	inputs.push('year=' + year);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('yearId=' + yearId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/centerMgt/saveYearMaster",
		data	: str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(r) {
			
			if (r == 1) {
				
				alertify.success("Records Saved Sucessfully");				
			} else if (r == 2) {
				
				alertify.success( "Records Updated Sucessfully");				
			}else if (r == 3) {				
				
				alertify.error(" Year is Already Exist");				
			}else {
				
				alertify.error("Oops Some Problem Ocured");
			}
			refreshYearMaster();
			getAllYearMaster();
		}
	});	
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:getAllYearMaster  Detail
 ************/
function getAllYearMaster(){	
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/centerMgt/getAllYearMaster",
		error : function() {
			alert('error');
		},
		success : function(r){			
			setYearMasterDocTemp(r,"All");		
		}
	});	
}

/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  setYearMasterDocTemp  Detail
 ************/
function setYearMasterDocTemp(r,callFrom){		
			var htm ="";
			var index = 1;
		if(callFrom=="All")
			{
				for ( var i = 0; i < r.lstyearDoc.length; i++){	
						htm = htm + '<tr> '
							+ ' <td class="col-md-1 center">'+index+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstyearDoc[i].yearId+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstyearDoc[i].year+'</td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editYearMasterDoc('+ r.lstyearDoc[i].yearId+')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteYearMasterDoc('+ r.lstyearDoc[i].yearId+')><i class="fa fa-trash-o"></i></button></td>'
							+ '</tr>';					
							index++;
				}
			}else if(callFrom==="search"){
				
				htm = htm + '<tr> '
				+ ' <td class="col-md-1 center">'+index+'</td>'
				+ ' <td class="col-md-1 center">'+r.yearId+'</td>'
				+ ' <td class="col-md-1 center">'+r.year+'</td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editYearMasterDoc('+ r.yearId+')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteYearMasterDoc('+ r.yearId+')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';					
				index++;
				
			}		
	
	$("#yearMasterDetails").html(htm);
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  editYearMasterDoc  Detail
 ************/
function editYearMasterDoc(yearId){
	var inputs = [];
	inputs.push('yearId=' + yearId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgt/editYearMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(myOBJECT) {
			 $("#yearId").val(myOBJECT.yearId);
			$("#year").val(myOBJECT.year);			
		
		}
		
	});

}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  deleteYearMasterDoc  Detail
 ************/
function deleteYearMasterDoc(yearId){
	var r = confirm("Are You Sure You Want To Year Doc");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/centerMgt/deleteYearMasterDoc",
			data : {
				"yearId" : yearId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response){
				alertify.error(response);
				refreshYearMaster();
				getAllYearMaster();
				}
		});
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  refreshYearMaster  Detail
 ************/
function refreshYearMaster(){
	 $("#yearId").val('0');
	$("#year").val("");
	
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	: auttosuggestion for Year Master
 ************/
function centeryearAutoSuggestion(inputID) {
	var resultData = [];
	var year = $("#" + inputID).val();

	if (year == "" || year == null || year == "null"	|| year == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllYearMaster();
		return false;
	}

	var inputs = [];
	inputs.push('year=' + year);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/centerMgt/centeryearAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstyearDoc.length; j++) {
				var arrValue = response.lstyearDoc[j].yearId +"-"+response.lstyearDoc[j].year;
				var idValue = response.lstyearDoc[j].yearId;
				var year = response.lstyearDoc[j].year;
				resultData.push({
					ID : idValue,
					Name : year
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
		var yearId = res[0];
		var year = res[1];		
		getYearMasterByYearId(yearId);
		$("input#" + inputID).val(year);
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  get getYearMasterByYearId Detail
 ************/
function getYearMasterByYearId(yearId){
	var inputs = [];
	inputs.push('yearId=' + yearId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgt/editYearMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setYearMasterDocTemp(r,"search");
			
		}
		
	});

}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  get centerYearMasterSearchById 
 ************/
function centerYearMasterSearchById(){
	var yearId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(yearId)) {
		alert("Please Enter Number Only!");
		$("#yearId").focus();
		return false;
	}
	getYearMasterByYearId(yearId);
	
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  getAllStateMasterForCenter
 ************/
function getAllStateMasterForCenter() {

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgt/getAllStateMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			var divContent = "";
            divContent = divContent
                    + "<select name='State Name' class='col-md-12'><option value='0'>---Select---</option>";
         for ( var i = 0; i < r.lstStateMaster.length; i++) {            
        	 			divContent = divContent + "<option value='" + r.lstStateMaster[i].stateId + "'  >"
                        + r.lstStateMaster[i].stateName + "</option>";
            }
            divContent = divContent + "</select>";
            $("#stateId").html(divContent);
        
		}
	});
}

/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  getAllTypeMasterForCenter
 ************/
function getAllTypeMasterForCenter() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/centerMgt/getAllTypeMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			var divContent = "";
            divContent = divContent
                    + "<select name='State Name' class='col-md-12'><option value='0'>---Select---</option>";
         for ( var i = 0; i < r.lsttypemaster.length; i++) {            
        	 			divContent = divContent + "<option value='" + r.lsttypemaster[i].typeId + "'  >"
                        + r.lsttypemaster[i].typeName + "</option>";
            }
            divContent = divContent + "</select>";
            $("#typeId").html(divContent);
        
		}
	});
}

/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  getAllHospitalMasterForCenter
 ************/
function getAllHospitalMasterForCenter() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/centerMgt/getAllHospitalMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			var divContent = "";
            divContent = divContent
                    + "<select name='State Name' class='col-md-12'><option value='0'>---Select---</option>";
         for ( var i = 0; i < r.lsthospitalDoc.length; i++) {            
        	 			divContent = divContent + "<option value='" + r.lsthospitalDoc[i].hospitalId + "'  >"
                        + r.lsthospitalDoc[i].hospitalCode + "</option>";
            }
            divContent = divContent + "</select>";
            $("#hospitalId").html(divContent);
        
		}
	});
}

/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  getAllYearMasterForCenter
 ************/
function getAllYearMasterForCenter() {

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/centerMgt/getAllYearMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			var divContent = "";
            divContent = divContent
                    + "<select name='State Name' class='col-md-12'><option value='0'>---Select---</option>";
         for ( var i = 0; i < r.lstyearDoc.length; i++) {            
        	 			divContent = divContent + "<option value='" + r.lstyearDoc[i].yearId + "'  >"
                        + r.lstyearDoc[i].year + "</option>";
            }
            divContent = divContent + "</select>";
            $("#yearId").html(divContent);
        
		}
	});
}

/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	: getAllDistrictBystateId()
 ************/
function getAllDistrictBystateId()
{
	var stateId=$('#stateId').val();	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/centerMgt/getAllDistrictBystateId",
		data : {
			"stateId" : stateId
		},
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var divContent = "";
            divContent = divContent
                    + "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";
                      
            for ( var i = 0; i < r.lstDistrictMaster.length; i++){          
                       divContent = divContent + "<option value='" + r.lstDistrictMaster[i].districtId + "'  >"
                        + r.lstDistrictMaster[i].districtName + "</option>";
            }
            divContent = divContent + "</select>";
            $("#distictId").html(divContent);
            $("#distictId").select2();           
		}	
	});
  }
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	: saveCenterMaster
 ************/
function saveCenterMaster() {
	var centerId = $('#centerId').val();
	var stateId = $('#stateId').val();
	var distictId = $('#distictId').val();
	var typeId = $('#typeId').val();
	var hospitalId = $('#hospitalId').val();	
	var yearId = $('#yearId').val();
	var centerName = $('#centerName').val();
	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	
	if(stateId=="" || stateId==undefined || stateId==null || stateId=='0'){
		
		alert("please select state");		
		$("#stateId").focus();					
		return false;
	}
	
	if(distictId=="" || distictId==undefined || distictId==null ||distictId=='0'){
		
			alert("please select district");		
			$("#distictId").focus();					
			return false;
		}	
	
		if(typeId=="" || typeId==undefined || typeId==null ||typeId=='0'){
			
			alert("please select Type");		
			$("#typeId").focus();					
			return false;
		}	
	
		if(hospitalId=="" || hospitalId==undefined || hospitalId==null ||hospitalId=='0'){
				
				alert("please select Hospital Code");		
				$("#hospitalId").focus();					
				return false;
			}	
		

		if(yearId=="" || yearId==undefined || yearId==null ||yearId=='0'){
				
				alert("please select Year");		
				$("#yearId").focus();					
				return false;
			}	
		
		if(centerName=="" || centerName==undefined || centerName==null){
			
			alert("please enter center name");		
			$("#centerName").focus();					
			return false;
		}	
	var inputs = [];	
	inputs.push('centerId=' + centerId);
	inputs.push('stateId=' + stateId);
	inputs.push('districtId=' + distictId);
	inputs.push('typeId=' + typeId);
	inputs.push('hospitalId=' + hospitalId);
	inputs.push('yearId=' + yearId);
	inputs.push('centerName=' + centerName);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);	
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/centerMgt/saveCenterMaster",
		data	: str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(r) {
			
			if (r == 1) {
				
				alertify.success("Records Saved Sucessfully");				
			} else if (r == 2) {
				
				alertify.success( "Records Updated Sucessfully");				
			}else if (r == 3) {				
				
				alertify.error(" Year is Already Exist");				
			}else {
				
				alertify.error("Oops Some Problem Ocured");
			}
			resetCeneterMaster();
			getAllCenterMaster();
		}
	});	
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:getAllCenterMaster  Detail
 ************/
function getAllCenterMaster(){	
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/centerMgt/getAllCenterMaster",
		error : function() {
			alert('error');
		},
		success : function(r){			
			setCenterMasterDocTemp(r,"All");		
		}
	});	
}

/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  setCenterMasterDocTemp  Detail
 ************/
function setCenterMasterDocTemp(r,callFrom){		
			var htm ="";
			var index = 1;
		if(callFrom=="All")
			{
				for ( var i = 0; i < r.lstcenterdoc.length; i++){	
						htm = htm + '<tr> '
							+ ' <td class="col-md-1 center">'+index+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstcenterdoc[i].centerId+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstcenterdoc[i].stateName+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstcenterdoc[i].districtName+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstcenterdoc[i].typeName+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstcenterdoc[i].hospitalName+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstcenterdoc[i].year+'</td>'
							+ ' <td class="col-md-1 center">'+r.lstcenterdoc[i].centerName+'</td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editCenterMasterDoc('+ r.lstcenterdoc[i].centerId+')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteCenterMasterDoc('+ r.lstcenterdoc[i].centerId+')><i class="fa fa-trash-o"></i></button></td>'
							+ '</tr>';					
							index++;
				}
			}else if(callFrom==="search"){				
				htm = htm + '<tr> '
				+ ' <td class="col-md-1 center">'+index+'</td>'
				+ ' <td class="col-md-1 center">'+r.centerId+'</td>'
				+ ' <td class="col-md-1 center">'+r.stateName+'</td>'
				+ ' <td class="col-md-1 center">'+r.districtName+'</td>'
				+ ' <td class="col-md-1 center">'+r.typeName+'</td>'
				+ ' <td class="col-md-1 center">'+r.hospitalName+'</td>'
				+ ' <td class="col-md-1 center">'+r.year+'</td>'
				+ ' <td class="col-md-1 center">'+r.centerName+'</td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editCenterMasterDoc('+ r.centerId+')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger deleteUserAccess" onclick=deleteCenterMasterDoc('+ r.centerId+')><i class="fa fa-trash-o"></i></button></td>'
				+ '</tr>';					
				index++;
				
			}		
	
	$("#centerDocDetails").html(htm);
}

/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  editCenterMasterDoc  Detail
 ************/
function editCenterMasterDoc(centerId){
	var inputs = [];
	inputs.push('centerId=' + centerId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgt/editCenterMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {			
			$('#centerId').val(r.centerId);
			$('#stateId').select2('val',r.stateId);
			$('#distictId').select2('val',r.districtId);
			$('#typeId').select2('val',r.typeId);
			$('#hospitalId').select2('val',r.hospitalId);
			$('#yearId').select2('val',r.yearId);
			/*$('#stateId').val(myOBJECT.stateId);
			$('#distictId').val(myOBJECT.districtId);
			$('#typeId').val(myOBJECT.typeId);
			$('#hospitalId').val(myOBJECT.hospital$('#stateId').val(myOBJECT.stateId);
			$('#distictId').val(myOBJECT.districtId);
			$('#typeId').val(myOBJECT.typeId);
			$('#hospitalId').val(myOBJECT.hospitalId);
			$('#yearId').val(myOBJECT.yearId);Id);
			$('#yearId').val(myOBJECT.yearId);*/
			$('#centerName').val(r.centerName);	
		
		}
		
	});

}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  deleteCenterMasterDoc  Detail
 ************/
function deleteCenterMasterDoc(centerId){
	var r = confirm("Are You Sure You Want To Center Doc");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/centerMgt/deleteCenterMasterDoc",
			data : {
				"centerId" : centerId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response){
				alertify.error(response);
				resetCeneterMaster();
				getAllCenterMaster();
				}
		});
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  resetCeneterMaster  Detail
 ************/
function resetCeneterMaster(){
	$('#centerId').val('0');
	$("#stateId").select2('val',"0");
	$("#distictId").select2('val',"0");
	$("#typeId").select2('val',"0");
	$("#hospitalId").select2('val',"0");
	$("#yearId").select2('val',"0");	
	$('#centerName').val("");		
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	: auttosuggestion for Center Master
 ************/
function inventoryCenterMasterAutoSuggestion(inputID) {
	var resultData = [];
	var centerName = $("#" + inputID).val();

	if (centerName == "" || centerName == null || centerName == "null"	|| centerName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllHospitalMaster();
		return false;
	}

	var inputs = [];
	inputs.push('centerName=' + centerName);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/centerMgt/inventoryCenterMasterAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstcenterdoc.length; j++) {
				var arrValue = response.lstcenterdoc[j].centerId +"-"+response.lstcenterdoc[j].centerName;
				var idValue = response.lstcenterdoc[j].centerId;
				var centerName = response.lstcenterdoc[j].centerName;
				resultData.push({
					ID : idValue,
					Name : centerName
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
		var centerId = res[0];
		var centerName = res[1];		
		getCenterMasterByCenterId(centerId);
		$("input#" + inputID).val(centerName);
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  get getCenterMasterByCenterId Detail
 ************/
function getCenterMasterByCenterId(centerId){
	var inputs = [];
	inputs.push('centerId=' + centerId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgt/editCenterMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setCenterMasterDocTemp(r,"search");
			
		}
		
	});

}
/************
* @author	: Dayanand Khandekar
* @date		: 6-Nov-2019
* @codeFor	:  get centerHospitalMasterSearchById 
 ************/
function getCenterMasterById(){
	var centerId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(centerId)) {
		alert("Please Enter Number Only!");
		$("#centerId").focus();
		return false;
	}
	getCenterMasterByCenterId(centerId);	
}

/************
* @author	: Dayanand Khandekar
* @date		: 7-Nov-2019
* @codeFor	: auttosuggestion for State Master
 ************/
function centerStateAutoSuggestion(inputID) {
	var resultData = [];
	var stateName = $("#" + inputID).val();

	if (stateName == "" || stateName == null || stateName == "null"	|| stateName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllStateMaster();
		return false;
	}

	var inputs = [];
	inputs.push('stateName=' + stateName);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/centerMgt/centerStateAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstStateMaster.length; j++) {
				var arrValue = response.lstStateMaster[j].stateId +"-"+response.lstStateMaster[j].stateName;
				var idValue = response.lstStateMaster[j].stateId;
				var stateName = response.lstStateMaster[j].stateName;
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
		getStateMasterBystateId(stateId);
		$("input#" + inputID).val(stateName);
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 7-Nov-2019
* @codeFor	:  get getStateMasterBystateId Detail
 ************/
function getStateMasterBystateId(stateId){
	var inputs = [];
	inputs.push('stateId=' + stateId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgt/editStateMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllStateMaster(r,"search");
			
		}
		
	});

}
/************
* @author	: Dayanand Khandekar
* @date		: 7-Nov-2019
* @codeFor	:  get centerStateMasterSearchById 
 ************/
function centerStateMasterSearchById(){
	var stateId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(stateId)) {
		alert("Please Enter Number Only!");
		$("#stateId").focus();
		return false;
	}
	getStateMasterBystateId(stateId);	
}

/************
* @author	: Dayanand Khandekar
* @date		: 7-Nov-2019
* @codeFor	: auttosuggestion for District Master
 ************/
function centerDistrictMasterAutoSuggestion(inputID) {
	var resultData = [];
	var districtName = $("#" + inputID).val();

	if (districtName == "" || districtName == null || districtName == "null"	|| districtName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllDistrictMaster();
		return false;
	}

	var inputs = [];
	inputs.push('districtName=' + districtName);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/centerMgt/centerDistrictMasterAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstDistrictMaster.length; j++) {
				var arrValue = response.lstDistrictMaster[j].districtId +"-"+response.lstDistrictMaster[j].districtName;
				var idValue = response.lstDistrictMaster[j].districtId;
				var districtName = response.lstDistrictMaster[j].districtName;
				resultData.push({
					ID : idValue,
					Name : districtName
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
		var districtId = res[0];
		var districtName = res[1];		
		getDistrictMasterBydistrictId(districtId);
		$("input#" + inputID).val(districtName);
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 7-Nov-2019
* @codeFor	:  get getDistrictMasterBydistrictId Detail
 ************/
function getDistrictMasterBydistrictId(districtId){
	var inputs = [];
	inputs.push('districtId=' + districtId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/centerMgt/editDistrictMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllDistrictMaster(r,"search");
			
		}
		
	});

}
/************
* @author	: Dayanand Khandekar
* @date		: 7-Nov-2019
* @codeFor	: getDistrictMasterById
 ************/
function getDocumentNumberById(){
	var docId=$("#searchId").val();	
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(districtId)) {
		alert("Please Enter Number Only!");
		$("#stateId").focus();
		return false;
	}
	getDistrictMasterBydistrictId(districtId);	
}