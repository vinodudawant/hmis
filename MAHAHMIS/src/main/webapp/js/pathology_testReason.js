/********************************************************************************
 * @author Ajay khandare
 * @since 14-04-2020
 * @comment for save  Test Reason Master
*******************************************************************************/
function saveTestReasonMaster(){
	var reasonname = $("#reasonname").val();
	var reasonId = $('#reasonId').val();
    var reasontype = "";
    var sampleTypeId = $("#sampleTypes").val();
    
    if(reasonname == "" || reasonname == null){
		alertify.error("Please enter test reason.");
		return false;
	}
    
    if(sampleTypeId == "0"){
		alertify.error("Please select sample type.");
		return false;
	}
    
    if ($("#rejectid").is(":checked")) {
		reasontype = "R";
	}else if ($("#unrejectid").is(":checked")) {
		reasontype = "U";
	}else if ($("#recollectionid").is(":checked")) {
		reasontype = "C";
	}
    	
	var inputs = [];	
	inputs.push('idTestreason=' + reasonId);
	inputs.push('testReasonName=' + reasonname);
	inputs.push('reasonType=' + reasontype);
	inputs.push('sampleType=' + sampleTypeId);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/testReason/saveTestReason",
		data	: str + "&reqType=AJAX",
		error : function() {
			
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Test Reason Saved Successfully");
			}
			else if (data == 2) {
				alertify.success( "Test Reason Updated Successfully");				
			}
			else if(data==3){
				alertify.error("Test Reason Name is Already Exist");
			}else{
				alertify.error("Oops Some Problem Occurred");
			}
			getAllTestReasonList();
			resetTestReasonForm();
		}
	});
}

/****************************************************************************************************
 * @author Ajay khandare
 * @since 14-04-2020
 * @comment for clear Test Reason Form
******************************************************************************************************/	
function resetTestReasonForm(){
	$('#reasonname').val("");
	$("#rejectid").prop('checked', true);
	$("#sampleTypes").val(0);
}


/****************************************************************************************************
 * @author Ajay khandare
 * @since 14-04-2020
 * @comment for fetch all Test Reason List
******************************************************************************************************/	
function getAllTestReasonList(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/testReason/getAllTestReason",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.testReasonlist.length; i++) {
				var sampleTypeName = "-"
				if(r.testReasonlist[i].labTestSampleType != null)
					sampleTypeName = r.testReasonlist[i].labTestSampleType.sampleName;
				
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.testReasonlist[i].testReasonName+"</td>";
				divContent = divContent
					+ "<td class='col-md-1 center'>"+sampleTypeName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editTestReason('"+r.testReasonlist[i].idTestreason+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteTestReason('"+r.testReasonlist[i].idTestreason+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}
			$('#specialCaseTableBody').html(divContent);
		}
	});	
}


/****************************************************************************************************
  * @author Ajay khandare
 * @since 14-04-2020
 * @comment for edit Test Reason by id
******************************************************************************************************/	
function editTestReason(id) {
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/testReason/editTestReasonById",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
		$('#reasonname').val(r.testReasonName);
		$('#reasonId').val(r.idTestreason);
		getSampleTypes();
		$('#sampleTypes').val(r.labTestSampleType.idTestSample);
		
		if (r.reasonType == "R") {		
			$("#rejectid").prop('checked', true);
		} else if (r.reasonType == "U") {		
			$("#unrejectid").prop('checked', true);
		} else if (r.reasonType == "C") {		
			$("#recollectionid").prop('checked', true);
		}
		$("#divForAddForm").show('slow');
		}
	});

}

/****************************************************************************************************
  * @author Ajay khandare
 * @since 14-04-2020
 * @comment for delete Test Reason by id
******************************************************************************************************/	
function deleteTestReason(id){
	var r = confirm("Are you sure you want to delete this reason ?");
 	if (r == true) { 
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/testReason/deleteTestReasonById",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r==true){
				alertify.success( " Test Reason Delete Successfully");		
			}else{
				alertify.error( "Test Reason Not Deleted.");		
			}
			getAllTestReasonList();
		}
	});
 	}
}

/****************************************************************************************************
  * @author Ajay khandare
 * @since 14-04-2020
 * @comment for search Test Reason by name
******************************************************************************************************/	
function searchSpecialCaseByName(value){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/testReason/searchTestReasonByName",
		data :{
			searchName : value
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var divContent = "";
			for ( var i = 0; i < r.testReasonlist.length; i++) {
				divContent = divContent
						+ '<tr>'
						+ "<td  class='col-md-1 center'>"+ (i + 1) + "</td>";
				divContent = divContent
						+ "<td class='col-md-1 center'>"+ r.testReasonlist[i].testReasonName+"</td>";
				divContent = divContent
					+ "<td class='col-md-1 center'>"+ r.testReasonlist[i].labTestSampleType.sampleName+"</td>";
				divContent = divContent+ " <td class='col-md-1 center'>"
						+ "<button class='btn btn-xs btn-success' onclick=editTestReason('"+r.testReasonlist[i].idTestreason+"')><i class='fa fa-edit'></i></button></td>";
				divContent = divContent
						+ " <td class='col-md-1 center'>"
						+ "	<button class='btn btn-xs btn-danger' onclick=deleteTestReason('"+r.testReasonlist[i].idTestreason+"')><i class='fa fa-trash-o'></i></button></td></tr>";
			}

			$('#specialCaseTableBody').html(divContent);
		}
	});
}

/************
* @author	: Akshay Mache
* @date		: 5-Feb-2020
* @codeFor	: Get Test Sample
 ************/
function getSampleTypes() {
	var byName="";
	var callFrom='onload';
	var inputs = [];
	inputs.push('searchText=' + encodeURIComponent(byName));
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/testsample/getalltestsamples",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var dropdownList='<option value="0">Select sample types</option>';
			for ( var i = 0; i < r.testSamplelist.length; i++) {
				dropdownList=dropdownList+'<option value="'+r.testSamplelist[i].idTestSample+'">'+r.testSamplelist[i].sampleName+'</option>';	
			}	
			$("#sampleTypes").html(dropdownList);
		}
	});
}