/************
* @author	: Akshata Desai
* @date		: O7-Feb-2020
* @codeFor	:  toggleEntryDiv
 ************/
function toggleEntryDiv(id) {

	/*$("#"+id).slideToggle('slow', function() {
	});*/
	if (id == "divForEdit") {

		$("#divForEntryComplaint").show('slow');
	} else {

		$("#divForEntryComplaint").toggle('slow');
	}
}
/************
* @author	: Akshata Desai
* @date		: O7-Feb-2020
* @codeFor	: Save Complaint master
 ************/
function saveComplaintMaster(){
	var complaintCode = $("#complaintCode").val();
	var complaint_name = $("#complaintName").val();
	var complaint_id = $("#complaintId").val();
	var userId= $("#userId").val();
	var unitId= $("#unitId").val();
	
	if(complaint_name=="" || complaint_name==undefined || complaint_name==null || complaint_name=="null"  ){
		alert("please enter Complaint name");		
		$("#complaintName").focus();					
		return false;
	}	
	
	if(complaintCode=="" || complaintCode==undefined || complaintCode==null || complaintCode=="null"  ){
		alert("please enter Complaint code");		
		$("#complaintCode").focus();					
		return false;
	}	
	
	var inputs = [];	
	inputs.push('complaintCode=' + complaintCode);
	inputs.push('complaintName=' + complaint_name);
	inputs.push('complaintId=' + complaint_id);
	inputs.push('userId='+userId);
	inputs.push('createdBy='+userId);
	inputs.push('unitId='+unitId);
	var str1 = inputs.join('&');
	
	jQuery.ajax({
		type :"POST",
		url :"ehat/complaint_master/saveComplaint",
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
			 alertify.success("Complaint name already exists");
		 }
		 else {
				alertify.error("Oops having some issued");
				
			}
			getAllComplaintMaster();
			refreshComplaintMaster();
		},		
	})
}

/************
* @author	: Akshata Desai
* @date		: O7-Feb-2020
* @codeFor	: Refresh Complaint master
 ************/

function refreshComplaintMaster(){
	$('#complaintCode').val('');
	$('#complaintName').val('');
	$('#complaintId').val(0);
	
	
}

/************
* @author	: Akshata Desai
* @date		: O7-Feb-2020
* @codeFor	: List of Complaint master
 ************/
function getAllComplaintMaster(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/complaint_master/getAllComplaintMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllComplaintMaster(r,"All");			
		}
	});
}

function setAllComplaintMaster(r,CallFrom){

	var htm ="";
	var index = 1;
	if(CallFrom=="All"){
		for ( var i = 0; i < r.lstComplaintMaster.length; i++) {		
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstComplaintMaster[i].complaintId+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstComplaintMaster[i].complaintCode+'</td>'
			+ ' <td class="col-md-1 center">'+r.lstComplaintMaster[i].complaintName+'</td>'		
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editComplaintMaster('+r.lstComplaintMaster[i].complaintId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteComplaintMaster('+r.lstComplaintMaster[i].complaintId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;
		}
	}else if(CallFrom=="search"){
			htm = htm + '<tr> '
			+ ' <td class="col-md-1 center">'+index+'</td>'
			+ ' <td class="col-md-1 center">'+r.complaintId+'</td>'
			+ ' <td class="col-md-1 center">'+r.complaintCode+'</td>'
			+ ' <td class="col-md-1 center">'+r.complaintName+'</td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success" onclick=editComplaintMaster('+r.complaintId+')><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-danger" onclick=deleteComplaintMaster('+r.complaintId+')><i class="fa fa-trash-o"></i></button></td>'
			+ '</tr>';
			index++;	
	}			
	$("#complaintDetails").html(htm);
}

/************
* @author	: Akshata Desai
* @date		: O7-Feb-2020
* @codeFor	: Edit Complaint master
 ************/
function editComplaintMaster(complaintId){		
	var inputs = [];
	inputs.push('complaintId=' + complaintId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/complaint_master/editComplaintMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {	
			$('#searchId').val('');
			$("#divForEntryComplaint").show('slow');
			$('#complaintCode').val(r.complaintCode);
			$('#complaintName').val(r.complaintName);
			$('#complaintId').val(r.complaintId);	
			
		}
	});
}

/************
* @author	: Akshata Desai
* @date		: O7-Feb-2020
* @codeFor	: Delete Complaint master
 ************/
function deleteComplaintMaster(complaintId) {
	var r = confirm("Are You Sure You Want To Delete Complaint Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/complaint_master/deleteComplaintMaster",
			data : {
				"complaintId" : complaintId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				refreshComplaintMaster();
				getAllComplaintMaster();
			}
		});
	}
}

/************
* @author	: Akshata Desai
* @date		: 07-Feb-2020
* @codeFor	: autosuggestion for Complaint Master
 ************/
function centerComplaintAutoSuggestion(inputID) {
	var resultData = [];
	var complaintName = $("#" + inputID).val();
	var complaintCode = $("#"+inputID).val();
/*	var userId= $("#userId").val();
	var unitId= $("#unitId").val();*/

	if (complaintName == "" || complaintName == null || complaintName == "null"	|| complaintName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		 getAllComplaintMaster();
		
		return false;
	}

	var inputs = [];
	inputs.push('complaintName=' + complaintName);
	inputs.push('complaintCode=' + complaintCode);
	/*inputs.push('userId='+userId);
	inputs.push('createdBy='+userId);
	inputs.push('unitId='+unitId);*/
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/complaint_master/centerComplaintAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstComplaintMaster.length; j++) {
				var arrValue = response.lstComplaintMaster[j].complaintId +"-"+response.lstComplaintMaster[j].complaintName+"-"+response.lstComplaintMaster[j].complaintCode;
				var idValue = response.lstComplaintMaster[j].complaintId;
				var complaintName = response.lstComplaintMaster[j].complaintName;
				var complaintCode = response.lstComplaintMaster[j].complaintCode;
				resultData.push({
					ID : idValue,
					Name : complaintName,
					Code : complaintCode
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue +  '</a></li>';
			}

			setTimeout(function() {
				$("div#documentByName .typeahead").html(template);
				$("div#documentByName .typeahead").show();

				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name'+"-"+'Code',
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
		var complaintId = res[0];
		var complaintName = res[1];	
		var complaintCode = res[2];
		getComplaintMasterBycomplaintId(complaintId);
		$("input#" + inputID).val(complaintName);
		$("input#"+inputID).val(complaintCode);
	}
}

/************
* @author	: Akshata Desai
* @date		: 07-Feb-2020
* @codeFor	:  get getComplaintMasterBycomplaintId Detail
 ************/
function getComplaintMasterBycomplaintId(complaintId){
	var inputs = [];
	inputs.push('complaintId=' + complaintId);	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/complaint_master/editComplaintMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllComplaintMaster(r,"search");
			refreshComplaintMaster();
		}
		
	});

}

/************
* @author	: Akshata Desai
* @date		: 07-feb-2020
* @codeFor	:  get centerComplaintMasterSearchById Detail 
 ************/
function centerComplaintMasterSearchById(){
	
	//var id = $("#searchId").val();
	var complaintId=$("#searchId").val();	
	//var pattern = /^[0-9a-zA-Z]+$/;
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(complaintId)) {
		alert("Please Enter Number Only!");
		$("#complaintId").focus();
		return false;
	}
	getComplaintMasterBycomplaintId(complaintId);	
}


