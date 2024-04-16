/********************************************************************************
 * @author Rohit Sandbhor
 * @since 10-01-2020
 * @comment to save state master
*******************************************************************************/
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
		url : "ehat/unit/saveStateMaster",
		data	: str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(r) {
			
			if (r == 1) {
				
				alertify.success("Records Saved Successfully");				
			} else if (r == 2) {
				
				alertify.success( "Records Updated Successfully");				
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




/********************************************************************************
 * @author Rohit Sandbhor
 * @since 10-01-2020
 * @comment Below js code to to load the states on unit master
*******************************************************************************/
function getAllStateMaster(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/unit/getAllStateMaster",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllStateMaster(r,"All");			
		}
	});
}

/******************************************
 * @author Rohit Sandbhor
 * @since 10-01-2020
 * @codeFor	: Set all state master
 *****************************************/
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
 * @author Rohit Sandbhor
 * @since 10-01-2020
* @codeFor	: Edit state master
 ************/
function editStateMaster(stateId){		
	var inputs = [];
	inputs.push('stateId=' + stateId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/unit/editStateMaster",
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
 * @author Rohit Sandbhor
 * @since 10-01-2020
 * @codeFor	: Delete state master
 ************/
function deleteStateMaster(stateId) {
	var r = confirm("Are You Sure You Want To Delete State Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/unit/deleteStateMaster",
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
 * @author Rohit Sandbhor
 * @since 10-01-2020
* @codeFor	: Refresh state master
 ************//*
function refreshStateMaster(){
	
	$('#stateName').val('');
	$('#stateId').val(0);
}

/********************************************************************************
 * @author Rohit Sandbhor
 * @since 10-01-2020
 * @comment Below js code to to load the state list on unit masters page
*******************************************************************************/
function getAllStateMasterOnUnitMaster() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/unit/getAllStateMaster",
		error : function() {
			alert('error');
		},
		success : function(r) {
				for ( var i = 0; i < r.lstStateMaster.length; i++) {		
				$('#statename').append(
						'<option value="' + r.lstStateMaster[i].stateId + '">' + r.lstStateMaster[i].stateName
								+ '</option>');
				}
			
		}
	});
}

/************
 * @author Rohit Sandbhor
 * @since 10-01-2020
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
		url : "ehat/unit/stateAutoSuggestion",
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
 * @author Rohit Sandbhor
 * @since 10-01-2020
* @codeFor	:  get getStateMasterBystateId Detail
 ************/
function getStateMasterBystateId(stateId){
	var inputs = [];
	inputs.push('stateId=' + stateId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/unit/editStateMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			console.log(r);
			setAllStateMaster(r,"search");
			
		}
		
	});

}

/********************************************************************************
 * @author Rohit Sandbhor
 * @since 10-01-2020
 * @comment Below js code to to load the state list on unit masters page
*******************************************************************************/
function getAllUnitMaster() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/collection/getAllUnitMaster",
		error : function() {
			alert('error');
		},
		success : function(r) {
				for ( var i = 0; i < r.lstUnit.length; i++) {		
				$('#labId').append(
						'<option value="' + r.lstUnit[i].unitId + '">' + r.lstUnit[i].unitName
								+ '</option>');
				}
			
		}
	});
}

/********************************************************************************
 * @author Rohit Sandbhor
 * @since 10-01-2020
 * @comment Below js code to to save the collection center master details
*******************************************************************************/
function saveCollectionCenterMaster(){
	var centerName  = $('#centerNameId').val();
	var centerCode  = $('#centerCodeId').val();
	var pattern = /^([0-9])*$/;
	if (!pattern.test(centerCode) ||centerCode=="" || centerCode==null) {
		alert("Please Enter centerCode in digits");
		$("#centerCodeId").focus();
		return false;
	}
	var inchargePerson =$('#inchargePersonId').val();
	var phoneNo =$('#phoneNoId').val();
	var address =$('#addressId').val();
	var cityName =$('#cityNameId').val();
	var emailId =$('#emailId').val();
	var collectionsCenterMaster =$('#collectionsCenterMasterId').val(); 
	var userId = $('#userId').val();
	var unitId =0; 
		//$('#unitId').val();
	
	
	var inputs = [];	
	inputs.push('centerName=' + centerName);
	inputs.push('centerCode=' + centerCode);
	inputs.push('inchargePerson=' + inchargePerson);
	inputs.push('phoneNo=' + phoneNo);
	inputs.push('address=' + address);
	inputs.push('cityName=' + cityName);
	inputs.push('emailId=' + emailId);
	inputs.push('id=' + collectionsCenterMaster);
	inputs.push('userId='+userId);
	inputs.push('createdBy='+userId);
	inputs.push('updatedBy='+userId);
	inputs.push('unitId='+unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		url : 'ehat/collection/saveCollectionCenterMasterDetails',
		type: 'POST',
		data	: str + "&reqType=AJAX",
		error: function(){
			alert('Network Issue..!!');
		},
		success : function(data){
			if (data == 1) {
				alertify.success("Records Saved Successfully");
				
			}
			else if (data == 2) {
				alertify.success( "Records Updated Successfully");				
			}
			else {
				alertify.error("Oops Some Problem Ocured");
			}
			refreshCollectionCenterMaster();
			getAllCollectionCenterMasterRecords();
		}
		
	});
}

/********************************************************************************
 * @author Rohit Sandbhor
 * @since 10-01-2020
 * @comment Below js code to to get the all collection center master records
*******************************************************************************/
function  getAllCollectionCenterMasterRecords(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/collection/getAllCollectionCenterMasterRecords",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			setCollectionCenterDataToTable(r,"all");			
		}
	});
}

/********************************************************************************
 * @author Rohit Sandbhor
 * @since 10-01-2020
 * @comment Below js code to to set the collection center data to table
*******************************************************************************/
function setCollectionCenterDataToTable(r,callFrom) {

	var htm ="";
	var index = 1;
	if(callFrom== "all"){
	for (var i = 0; i < r.lstCollectionCenterMaster.length; i++) {		
		htm = htm + '<tr> '
		+ ' <td class="col-md-1 center">'+index+'</td>'
		+ ' <td class="col-md-1 center">'+r.lstCollectionCenterMaster[i].id+'</td>'
		+ ' <td class="col-md-1 center">'+r.lstCollectionCenterMaster[i].centerName+'</td>'
		+ ' <td class="col-md-1 center">'+r.lstCollectionCenterMaster[i].centerCode+'</td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editCollectionCenterMaster('+r.lstCollectionCenterMaster[i].id+')><i class="fa fa-edit"></i></button></td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deleteCollectionCenterMaster('+r.lstCollectionCenterMaster[i].id+')><i class="fa fa-trash-o"></i></button></td>'
		+ '</tr>';
		index++;
	}
	}else if(callFrom=="search"){
		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.id+'</td>'
			+ ' <td class="col-md-1 center">'+r.centerName+'</td>'
			+ ' <td class="col-md-1 center">'+r.centerCode+'</td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=editCollectionCenterMaster('+r.id+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" onclick=deleteCollectionCenterMaster('+r.id+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		
		
	}
	$("#collectionCenterMasterTbody").html(htm);
}

/********************************************************************************
 * @author Rohit Sandbhor
 * @since 10-01-2020
 * @comment Below js code to refresh collection center master
*******************************************************************************/
function refreshCollectionCenterMaster(){
	$('#centerNameId').val("");
	$('#collectionsCenterMasterId').val(0);
	$('#centerCodeId').val("");
	$('#inchargePersonId').val("");
	$('#phoneNoId').val("");
	$('#addressId').val("");
	$('#cityNameId').val("");
	$('#emailId').val("");
	
}

/********************************************************************************
 * @author Rohit Sandbhor
 * @since 10-01-2020
 * @comment Below js code to edit collection center master
*******************************************************************************/
function editCollectionCenterMaster(id){		
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/collection/editCollectionCenterMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			$('#centerNameId').val(r.centerName);
			$('#collectionsCenterMasterId').val(r.id);
			$('#centerCodeId').val(r.centerCode);
			$('#inchargePersonId').val(r.inchargePerson);
			$('#phoneNoId').val(r.phoneNo);
			$('#addressId').val(r.address);
			$('#cityNameId').val(r.cityName);
			$('#emailId').val(r.emailId);
			
		}
	});
}

/********************************************************************************
 * @author Rohit Sandbhor
 * @since 10-01-2020
 * @comment Below js code to delete collection center master
*******************************************************************************/
function deleteCollectionCenterMaster(id) {
	var r = confirm("Are You Sure You Want To Delete Collection Center Master Details");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/collection/deleteCollectionCenterMaster",
			data : {
				"id" : id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('Network Issue..!!');
			},
			success : function(response) {
				alertify.error(response);
				refreshCollectionCenterMaster();
				getAllCollectionCenterMasterRecords();
			}			
		});		
	}
}

/********************************************************************************
 * @author Rohit Sandbhor
 * @since 10-01-2020
* @codeFor	: auttosuggestion for collection center master
 ********************************************************************************/
function collectionCenterAutoSuggestion(inputID) {
	var resultData = [];
	var collectionCenterName = $("#" + inputID).val();

	if (collectionCenterName == "" || collectionCenterName == null || collectionCenterName == "null"	|| collectionCenterName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllCollectionCenterMasterRecords();
		return false;
	}

	var inputs = [];
	inputs.push('centerName=' + collectionCenterName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/collection/collectionCenterAutoSuggestion",
		cache : false,
		success : function(response) {
			var template = "";
			for ( var j = 0; j < response.lstCollectionCenterMaster.length; j++) {
				var arrValue = response.lstCollectionCenterMaster[j].id +"-"+response.lstCollectionCenterMaster[j].centerName;
				var idValue = response.lstCollectionCenterMaster[j].id;
				var centerName = response.lstCollectionCenterMaster[j].centerName;
				resultData.push({
					ID : idValue,
					Name : centerName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#collectionByName .typeahead").html(template);
				$("div#collectionByName .typeahead").show();

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
		var collectionId = res[0];
		var centerName = res[1];		
		getCollectionCenterMasterByCollectionId(collectionId);
		$("input#" + inputID).val(centerName);
	}
}
/************
 * @author Rohit Sandbhor
 * @since 10-01-2020
* @codeFor	:  get getStateMasterBystateId Detail
 ************/
function getCollectionCenterMasterByCollectionId(collectionId){
	var inputs = [];
	//alert(collectionId);
	inputs.push('id=' + collectionId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/collection/editCollectionCenterMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			console.log(r);
			setCollectionCenterDataToTable(r,"search");
			
		}
		
	});

}
