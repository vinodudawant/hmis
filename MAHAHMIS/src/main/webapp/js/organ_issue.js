
function saveOrganIssue(){
	var issueId = $('#issueId').val();
	var crossMatchId = $('#issueCrossMatchId').val();
	var requesterId= $('#issueRequestId').val();
	var stockInwardId= $('#issueStockInwardId').val();
	
	var oragn_request_title = $('select#oragn_issue_title').val();
	if(oragn_request_title=="" || oragn_request_title==0 || oragn_request_title==undefined || oragn_request_title==null){
		alert("Please select title");
		return false;
	}
	
	var firstName = $('#firstName').val();
	if(firstName==""){
		alert("Please enter first name");
		return false;
	}
	
	var middleName = $('#middleName').val();
//	if(middleName==""){
//		alert("Please enter middle name");
//		return false;
//	}

	var lastName = $('#lastName').val();
	if(lastName==""){
		alert("Please enter last name");
		return false;
	}
	
	//var stockInwardId = $('select#container_id option:selected').val();
	var containerNo = $('#container_id ').val();
	/*if(stockInwardId=="" || stockInwardId =="0"){
		alert("Please select container");
		return false;
	}*/
	
	var blood_group_container = $('select#blood_group_container option:selected').val();
	if(blood_group_container=="" || blood_group_container =="0"){
		alert("Please enter blood group");
		return false;
	}
	
	var organ_nameId = $('#organ_name ').val();
	if(organ_nameId=="" || organ_nameId==0){
		alert("Please select organ Name");
		return false;
	}
	
	var coldIschemiaTimeId = $('select#cold_ischemia_time option:selected').val();
	if(coldIschemiaTimeId=="" || coldIschemiaTimeId==0){
		alert("Please select Clod Ischemia Time ");
		return false;
	}
	
	var expriy_date = $('#expriy_date').val();
	if(coldIschemiaTimeId=="" || coldIschemiaTimeId==0){
		alert("Please select Clod Ischemia Time ");
		return false;
	}
	
	var organSize = $('#size_id').val();
	if(organSize=="" || organSize==null){
		alert("Please enter size ");
		return false;
	}
	
	var available_qty = $('#available_qty').val();
	if(available_qty=="" || available_qty==0){
		alert("Please enter available qty ");
		return false;
	}
	
	var required_quantity = $('#required_quantity').val();
	if(required_quantity=="" || required_quantity==0){
		alert("Please enter required qty ");
		return false;
	}
	
	var cross_match_date_time = $('#cross_match_date_time').val();
	if(cross_match_date_time=="" || cross_match_date_time==0 || cross_match_date_time==null || cross_match_date_time==undefined){
		alert("Please enter date time ");
		return false;
	}
	
	var cross_match_compatible_type = $('select#cross_match_compatible_type option:selected').val();
	if(cross_match_compatible_type=="" || cross_match_compatible_type==0){
		alert("Please select compatible type ");
		return false;
	}
	
	var issue_remark = $('#issue_remark').val();
	if(issue_remark==""){
		alert("Please enter Remarks");
		return false;
	}
	var isOrganIssue =$("input:checkbox[name=organissue]:checked").val();
	var isOrganIssueValue='N';
	if(isOrganIssue == "" || isOrganIssue == undefined){
		alert("Please check organ issue");
		return false;
	}else if(isOrganIssue == 'on'){
		isOrganIssueValue='Y';
	}
	
	var inputs = [];	
	inputs.push('issueId=' + issueId);
	inputs.push('bloodGroupId=' + blood_group_container);
	inputs.push('containerNo=' + containerNo);
	inputs.push('expiryDate=' + expriy_date);
	inputs.push('availableQty=' + available_qty); 
	inputs.push('requiredQty=' + required_quantity); 
	inputs.push('organSize=' + organSize);
	inputs.push('isOrganIssued=' + isOrganIssueValue);
	inputs.push('Remarks=' + issue_remark);
	inputs.push('organId=' + organ_nameId);
	inputs.push('requesterId=' + requesterId);
	inputs.push('crossMatchId=' + crossMatchId);
	inputs.push('stockInwardId=' + stockInwardId);
	
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/organIssue/saveOrganIssue",
		cache : false,
		
		success : function(data) {
			if (data == 1) {
				alertify.success("Organ Issue Saved Sucessfully");
				getAllOrganIssueList();
				clearOrganIssue();
			}
			else if (data == 2) {
				alertify.success( "Organ Issue Updated Sucessfully");	
				getAllOrganIssueList();
				clearOrganIssue();
			}
		},
		error : function() {
			alertify.error('Network Issue');
		}
	});	
}

function clearOrganIssue(){
	$('#oragn_issue_title').val("select");
	$('#firstName').val("");
	$('#middleName').val("");
	$('#lastName').val("");
	$('#contact_number_1').val("");
	$('#contact_number_2').val("");
	$('#age').val("");
	$("input:radio[name='gender']").attr('checked', false);	
	$('#bloodGroupId').val("");
	$('#hemoglobin').val("");
	$('#height').val("");
	$('#Weight').val("");
	$('#ward_name').val("");
	$('#bed_number').val("");
	$('#organ_name').select2('val',0);
	$('#body_size').val("");
	$("input:radio[name='planned']").attr('checked', false);
	$('#organissue_body_type').select2('val',0);
	$('#container_id').val("");
	$('#organ_name_container').select2('val',0);
	$('#cross_match_remark').val("");
	$('#issue_remark').val(""); 
	$('#required_quantity').val(""); 
	$('#available_qty').val(""); 
	$('#size_id').val(""); 
	$('#blood_group_container').val("0"); 
	$('#expriy_date').val(""); 
	$("input:radio[name='organissue']").attr('checked', false);
	$('#cold_ischemia_time').select2('val',0);
	$('#cross_match_date_time').val(""); 
	$('#cross_match_compatible_type').val("0"); 
}

function organIssueAutoSuggestion(inputID) {
	
	var callFrom =  $("#searchType").val();
	if(callFrom == 0){
		alert("Please select search type");
		return false;
	}
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	var inputs = [];	
	inputs.push('organIssueId=' + findingName);	
	inputs.push('callFrom=' + callFrom);		
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/organIssue/issueAutoSuggestion",
		cache : false,		
		success : function(r) {
			var template = "";
			
					for ( var j = 0; j < r.listOrganIssueDto.length; j++) {
						
						var arrValue = r.listOrganIssueDto[j].issueId +"-"+r.listOrganIssueDto[j].prefix +"-"+r.listOrganIssueDto[j].firstName+"-"+r.listOrganIssueDto[j].middleName+"-"+r.listOrganIssueDto[j].lastName;
						var idValue = r.listOrganIssueDto[j].issueId;
						var organIssueName = r.listOrganIssueDto[j].firstName;
						resultData.push({
							ID : idValue,
							Name : organIssueName
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}
					
			setTimeout(function() {

				$("div#organRquestDiv .typeahead").html(template);
				$("div#organRquestDiv .typeahead").show();

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
		var organIssueId = res[0];
		var organIssueName = res[1];
		$("#" + inputID).val(organIssueName);	
		if(organIssueId !=0 && organIssueId!=undefined && organIssueId!=""&& organIssueId!=null){
			getOrganIssueById(organIssueId);
		}
	}
}


function organCrossMatchAutoSuggestion(inputID) {
	
	var callFrom =  $("#searchType").val();
	if(callFrom == 0){
		alert("Please select search type");
		return false;
	}
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	var inputs = [];	
	inputs.push('organCrossMatchId=' + findingName);	
	inputs.push('callFrom=' + callFrom);		
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/organCrossMatch/crossMatchAutoSuggestion",
		cache : false,		
		success : function(r) {
			var template = "";
			
					for ( var j = 0; j < r.listOrganCrossMatchDto.length; j++) {
						
						var arrValue = r.listOrganCrossMatchDto[j].crossMatchId +"-"+r.listOrganCrossMatchDto[j].prefix +"-"+r.listOrganCrossMatchDto[j].firstName+"-"+r.listOrganCrossMatchDto[j].middleName+"-"+r.listOrganCrossMatchDto[j].lastName;
						var idValue = r.listOrganCrossMatchDto[j].crossMatchId;
						var organCrossMatchName = r.listOrganCrossMatchDto[j].firstName;
						resultData.push({
							ID : idValue,
							Name : organCrossMatchName
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}
					
			setTimeout(function() {

				$("div#organRquestDiv .typeahead").html(template);
				$("div#organRquestDiv .typeahead").show();

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
		var organCrossMatchId = res[0];
		var organCrossMatchName = res[1];
		$("#" + inputID).val(organCrossMatchName);	
		if(organCrossMatchId !=0 && organCrossMatchId!=undefined && organCrossMatchId!=""&& organCrossMatchId!=null){
			getOrganCrossMatchById(organCrossMatchId);
			getOrganCrossMatchById();
		}
	}
}

function organRequestAutoSuggestionOrgnIssue(inputID) {
	
//	alert("orgn issue js");
	
	var callFrom = 1;
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	var inputs = [];	
	inputs.push('organRequestId=' + findingName);	
	inputs.push('callFrom=' + callFrom);		
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/organRequest/requestAutoSuggestion",
		cache : false,		
		success : function(r) {
			var template = "";
			
					for ( var j = 0; j < r.listOrganRequestDto.length; j++) {
						
						var arrValue = r.listOrganRequestDto[j].requestId +"-"+r.listOrganRequestDto[j].prefix +"-"+r.listOrganRequestDto[j].firstName+"-"+r.listOrganRequestDto[j].middleName+"-"+r.listOrganRequestDto[j].lastName;
						var idValue = r.listOrganRequestDto[j].requestId;
						var organRequestName = r.listOrganRequestDto[j].firstName;
						resultData.push({
							ID : idValue,
							Name : organRequestName
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}
					
			setTimeout(function() {

				$("div#organRquestDiv .typeahead").html(template);
				$("div#organRquestDiv .typeahead").show();

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
		var organRequestId = res[0];
		var organRequestName = res[1];
		$("#" + inputID).val(organRequestName);	
		if(organRequestId !=0 && organRequestId!=undefined && organRequestId!=""&& organRequestId!=null){
			getOrganRequestById(organRequestId);
			getOrganContainerNameById(organRequestId);
		}
	}
}

function getOrganRequestById(organRequestId){
	if(organRequestId !=undefined && organRequestId!=null && organRequestId!="" && organRequestId!="null"){
		var inputs = [];
		inputs.push('organRequestId=' + organRequestId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organRequest/editOrganRequest",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				setOrganRequesterDetails(r);
				getOrganCrossMatchById(r.requestId);
			}
	
		});
	}
}

function setOrganRequesterDetails(r){
	$('#requestIdCrossMatch').val(r.requestId);
	$("#crossMatchTreatmentId").val(r.treatmentDto.treatmentId);
	
	$("select#oragn_request_title").val(r.prefix);
	$("select#oragn_issue_title").val(r.prefix);
	$("#firstName").val(r.firstName);
	$("#middleName").val(r.middleName);
	$("#lastName").val(r.lastName);
	$("#contact_number_1").val(r.patientRegistered.mobile);
	$("#contact_number_2").val(r.contactNo2);
	$("#age").val(r.patientRegistered.age);
	var gender = r.patientRegistered.gender;
	if(gender == "Male"){
		$("#maleG").attr("checked","checked");
	}else if(gender == "Female"){
		$("#femaleG").attr("checked","checked");
	}else if(gender == "Other"){
		$("#otherG").attr("checked","checked");
	}
	
	$("#bloodGroupId").val(r.bloodGroupId);
	$("#hemoglobin").val(r.hemoglobin);
	$("#height").val(r.height);
	$("#Weight").val(r.weight);
	$("#ward_name").val(r.wardName);
	$("#bed_number").val(r.bedNumber);
	$("select#organ_name").select2("val",r.intendToDonateOrganId);
	getAllOrganContainerList(r.intendToDonateOrganId);
	$("select#diagnosis_name").val(r.diagnosisWithId);
	$("select#organrequest_body_type").val(r.bodyTypeId);
	$("select#organissue_body_type").select2("val",r.bodyTypeId);
	$("#body_size").val(r.bodySize);
	
	var priority = r.priority;
	$("input:radio[name='planned'][value='"+priority+"']").prop("checked",true);
	
	/*if(priority == "urgent"){
		$("#urgent_id").attr("checked","checked");
	}else if(gender == "planned"){
		$("#planned_id").attr("checked","checked");
	}*/
	$("#Remarks").val(r.remarks);
}

function getOrganCrossMatchById(requesterId){
	if(requesterId !=undefined && requesterId!=null && requesterId!="" && requesterId!="null"){
		var inputs = [];
		inputs.push('requesterId=' + requesterId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organIssue/getOrganCrossMatchById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				if(r!=null && r!=""){
					setOrganCrossMatchOrganIssue(r);	
				}else{
					alert(" No Cross Match Data Found");
				}
				
			}
	
		});
	}
}

function setOrganCrossMatchOrganIssue(r){
	//$('select#container_id').val(r.organDonorStockInwardDto.stockInwardId);
	$('select#blood_group_container').val(r.bloodGroupId);
	//$('select#organ_name_container').select2("val",r.intendOrganDonorMasterDto.intendId);
	$('select#cold_ischemia_time').select2("val",r.coldIschemiaTimeId);
	$('#expriy_date').val(r.stockInwardExpiryDate);
	$('#size_id').val(r.organSize);
	$('#available_qty').val(r.availableQuantity);
	$('#required_quantity').val(r.requiredQuantity);
	$('#cross_match_date_time').val(r.crossMatchDateAndTime);
	$('select#cross_match_compatible_type').val(r.compatibilityType);
	$("#cross_match_remark").val(r.compatibilityRemarks);
	
	$("#issueCrossMatchId").val(r.crossMatchId);
	$("#issueRequestId").val(r.organRequestDto.requestId);
	$("#issueStockInwardId").val(r.organDonorStockInwardDto.stockInwardId);
	$("#container_id").val(r.organDonorStockInwardDto.containerName);
	$("#organ_name_container").val(r.organDonorStockInwardDto.dorganName);
	
	
}



function getOrganRequestDetails(organCrossMatchId){
	
	if(organCrossMatchId !=undefined && organCrossMatchId!=null && organCrossMatchId!="" && organCrossMatchId!="null"){
		
		var inputs = [];
		inputs.push('organCrossMatchId=' + organCrossMatchId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organCrossMatch/editOrganCrossMatch",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				toggleRegDiv();
			
				$('#requestRegId').val(r.crossMatchId);
				$("#requestTreatmentId").val(r.treatmentDto.treatmentId);
				$("#patientId").val(r.patientRegistered.patientId);
				
				$("select#oragn_request_title").val(r.prefix);
				$("#firstName").val(r.firstName);
				$("#middleName").val(r.middleName);
				$("#lastName").val(r.lastName);
				$("#contact_number_1").val(r.contactNo1);
				$("#contact_number_2").val(r.contactNo2);
				$("#age").val(r.age);
				var gender = r.gender;
				if(gender == "M"){
					$("#maleG").attr("checked","checked");
				}else if(gender == "F"){
					$("#femaleG").attr("checked","checked");
				}else if(gender == "O"){
					$("#otherG").attr("checked","checked");
				}
				
				$("#bloodGroupId").val(r.bloodGroupId);
				$("#hemoglobin").val(r.hemoglobin);
				$("#height").val(r.height);
				$("#Weight").val(r.weight);
				$("#ward_name").val(r.wardName);
				$("#bed_number").val(r.bedNumber);
				$("select#organ_name").val(r.intendToDonateOrganId);
				$("select#diagnosis_name").val(r.diagnosisWithId);
				$("select#organrequest_body_type").val(r.bodyTypeId);
				$("#body_size").val(r.bodySize);
				$("select#doctor_name").val(r.referredById);
				
				var priority = r.priority;
				if(priority == "urgent"){
					$("#urgent_id").attr("checked","checked");
				}else if(gender == "planned"){
					$("#planned_id").attr("checked","checked");
				}
				$("#Remarks").val(r.remarks);
			}
		});
	}
}

/*function getOrganCrossMatchById(organCrossMatchId){
	if(organCrossMatchId !=undefined && organCrossMatchId!=null && organCrossMatchId!="" && organCrossMatchId!="null"){
		var inputs = [];
		inputs.push('organCrossMatchId=' + organCrossMatchId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organCrossMatch/editOrganCrossMatch",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				setAllOrganCrossMatch(r, "search");
			}
	
		});
	}
}*/


function organIssueSearchById() {
	var issueId = $("#issueSearchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(issueId)) {
		alert("Please Enter Number Only!");
		return false;
	}
	getOrganIssueById(issueId);
}


function getOrganIssueById(organIssueId){

	if(organIssueId !=undefined && organIssueId!=null && organIssueId!="" && organIssueId!="null"){
		
		var inputs = [];
		inputs.push('organIssueId=' + organIssueId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organIssue/editOrganIssue",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				setAllOrganIssue(r, "search");	
			}
		});
	}
	

}


function getAllOrganIssueList(){
	var unitId = $("#unitId").val();
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var inputs = [];
	inputs.push('unitId=' + unitId);
	inputs.push('fromDate=' + fromDate);
	inputs.push('lastDate=' + toDate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/organIssue/getAllOrganIssueList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllOrganIssue(r, "All");
		}
	});
}

function setAllOrganIssue(r, CallFrom) {
	var htm = "";
	var index = 1;
	if (CallFrom == "All") {
		for ( var i = 0; i < r.listOrganIssueDto.length; i++) {
			
			var crmatchdate =new Date(r.listOrganIssueDto[i].crossMatchDateAndTime).toLocaleString('en-GB');
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganIssueDto[i].issueId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganIssueDto[i].prefix +" "+ r.listOrganIssueDto[i].firstName +" "+ r.listOrganIssueDto[i].middleName +" "+ r.listOrganIssueDto[i].lastName 
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganIssueDto[i].donarPrefix +" "+ r.listOrganIssueDto[i].donarfirstName +" "+ r.listOrganIssueDto[i].donarmiddleName +" "+ r.listOrganIssueDto[i].donarlastName 
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganIssueDto[i].intendToDonateOrgan
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganIssueDto[i].bloodGroup
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					//+ r.listOrganIssueDto[i].crossMatchDateAndTime
					+ crmatchdate
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganIssueDto[i].compatibilityType
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganIssueDto[i].containerNo
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editOrganIssue('
					+ r.listOrganIssueDto[i].issueId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganIssue('
					+ r.listOrganIssueDto[i].issueId
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					+ '</tr>';
			index++;
		}
	} else if (CallFrom == "search") {
		
		var crmatchdate =new Date(r.organCrossMatchDto.crossMatchDateAndTime).toLocaleString('en-GB');
		htm = htm
		+ '<tr> '
		+ ' <td class="col-md-1 center">'
		+ index
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.issueId
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.organRequestDto.prefix +" "+ r.organRequestDto.firstName +" "+ r.organRequestDto.middleName +" "+ r.organRequestDto.lastName
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.organDonorStockInwardDto.organDonationRegistrationDto.prefix +" "+ r.organDonorStockInwardDto.organDonationRegistrationDto.firstName +" "+ r.organDonorStockInwardDto.organDonationRegistrationDto.middleName +" "+ r.organDonorStockInwardDto.organDonationRegistrationDto.lastName 
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.intendOrganDonorMasterDto.intendOrganDonor
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.organRequestDto.bloodGroup
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		//+ r.organCrossMatchDto.crossMatchDateAndTime
		+ crmatchdate
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.organCrossMatchDto.compatibilityType
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.containerNo
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-success" onclick=editOrganIssue('
		+ r.issueId
		+ ')><i class="fa fa-edit"></i></button></td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganIssue('
		+ r.issueId
		+ ')><i class="fa fa-trash-o"></i></button></td>'
		+ '</tr>';
		index++;
	}
	$("#organIssueDetails").html(htm);
}

function deleteOrganIssue(organIssueId){
	
	if(organIssueId !=undefined && organIssueId!=null && organIssueId!="" && organIssueId!="null"){
		var r = confirm("Are You Sure You Want To Delete Organ Cross  Match Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/organIssue/deleteOrganIssue",
				data : {
					"organIssueId" : organIssueId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.success(response);
					getAllOrganIssueList();
				}
			});
		}
	}
	
}

function editOrganIssue(organIssueId){
	if(organIssueId !=undefined && organIssueId!=null && organIssueId!="" && organIssueId!="null"){
		
		var inputs = [];
		inputs.push('organIssueId=' + organIssueId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organIssue/editOrganIssue",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				toggleRegDiv();
				$('#crossMatchId').val(r.crossMatchId);
				$("#crossMatchTreatmentId").val(r.organRequestDto.treatmentDto.treatmentId);
				$("#patientId").val(r.organRequestDto.patientRegistered.patientId);
				$("#requestIdCrossMatch").val(r.organRequestDto.requestId);
				$("#stockInwardId").val(r.organDonorStockInwardDto.stockInwardId);
				
				$('select#oragn_request_title').val(r.organRequestDto.patientRegistered.prefix);
				$('#firstName').val(r.organRequestDto.patientRegistered.fName);
				$('#middleName').val(r.organRequestDto.patientRegistered.mName);
				$('#lastName').val(r.organRequestDto.patientRegistered.lName);
				$('#contact_number_1').val(r.organRequestDto.patientRegistered.mobile);
				$('#age').val(r.organRequestDto.patientRegistered.age);
				var gender = r.organRequestDto.patientRegistered.gender;
				if (gender == "Male") {
					$("#maleG").attr("checked", "checked");
				} else if (gender == "Female") {
					$("#femaleG").attr("checked", "checked");
				} else if (gender == "Other") {
					$("#otherG").attr("checked", "checked");
				}
				$('#bloodGroupId').val(r.bloodGroupId);
				$("#hemoglobin").val(r.organRequestDto.hemoglobin);
				$("#height").val(r.organRequestDto.height);
				$("#Weight").val(r.organRequestDto.weight);
				$("#ward_name").val(r.organRequestDto.wardName);
				$("#bed_number").val(r.organRequestDto.bedNumber);
				$("select#organ_name").select2("val",r.intendOrganDonorMasterDto.intendId);
				$("select#organrequest_body_type").val(r.organRequestDto.bodyTypeId);
				$("#body_size").val(r.organSize);
				var priority = r.organRequestDto.priority;
				if(priority == "urgent"){
					$("#urgent_id").attr("checked","checked");
				}else if(gender == "planned"){
					$("#planned_id").attr("checked","checked");
				}
				
				$("select#lvmpho_cross_test").val(r.lvmphoTestResult);
				$("select#blo_type_comp").val(r.bloTypeCompResult);
				$("select#hum_leu_anti_type").val(r.humLeuAntiTypeResult);
				$("select#hla_anti").val(r.hlaAntiResult);
				$("select#per_rea_anti").val(r.perReaAntiResult);
				$("select#serum_cross_match").val(r.serumResult);
				
				$("#lvmpho_cross_test_date").val(r.lvmphoTestDate);
				$("#blo_type_comp_date").val(r.bloTypeCompDate);
				$("#hum_leu_anti_type_date").val(r.humLeuAntiTypeDate);
				$("#hla_anti_date").val(r.hlaAntiDate);
				$("#per_rea_anti_date").val(r.perReaAntiDate);
				$("#serum_cross_match_date").val(r.serumDate);
				
				$('select#container_id').val(r.organDonorStockInwardDto.stockInwardId);
				$('select#blood_group_container').val(r.bloodGroupId);
				$('select#organ_name_container').val(r.intendOrganDonorMasterDto.intendId);
				$('select#cold_ischemia_time').val(r.coldIschemiaTimeId);
				$('#expriy_date').val(r.stockInwardExpiryDate);
				$('#size_id').val(r.organSize);
				$('#available_qty').val(r.availableQuantity);
				$('#required_quantity').val(r.requiredQuantity);
				$('#cross_match_date_time').val(r.crossMatchDateAndTime);
				$('select#cross_match_compatible_type').val(r.compatibilityType);
				$("#cross_match_remark").val(r.compatibilityRemarks);
			}
		});
	}
	
}

function setPatientSearchType(){
	$("#byName").val("");
	var patSearchType = $("#patSearchType").val();
	
	if(patSearchType == 1){
		
		$("#byName").attr("placeholder", "Type Patient Id Here");
		
	}else if(patSearchType == 2){
		
		$("#byName").attr("placeholder", "Type Patient Name Here");
		
	}else if(patSearchType == 3){
		
		$("#byName").attr("placeholder", "Type Patient Mobile Here");
	}
}

function setAutoPatientName(inputID,callFrom) {
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var patSearchType = $("#patSearchType").val();
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	var fromYear = $('#year-dropdown').val();
	
	var inputs = [];	
	inputs.push('findText=' + findingName);	
	inputs.push('patSearchType=' + patSearchType);		
	inputs.push('callFrom=' + callFrom);	
	inputs.push('fromYear=' + fromYear);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/organdonor/searchPatientByStoredProcedure",
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
		$("#" + inputID).val(patName);	
			if(callFrom == "reg"){
				setSearchedPatientDetailsForRequestRegistration(patId);
			}
		}			
}

function setSearchedPatientDetailsForRequestRegistration(patId){
	if(patId !=undefined && patId !=null && patId!="" && patId !=0){
		jQuery.ajax({
			async 	: false,
			type 	: "POST",
			data 	: {
			 "patientId" : patId,
	 			},
			url 	: "ehat/organCrossMatch/getPatientDetailsWithMaxTreatmentId",
			timeout : 1000 * 60 * 5,
			cache 	: false,
			error 	: function() {
				alert('Error fetching patient information !');
			},
			success : function(r) {
	   			setPatientDetailsRequestReg(r);
			}
		});
	}
}

function setPatientDetailsRequestReg(r){
	$('#patientId').val(r.patientList[0].patientId);
	$('#prefix').val(r.patientList[0].prefix);
	$('#firstName').val(r.patientList[0].fName);
	$('#middleName').val(r.patientList[0].mName);
	$('#lastName').val(r.patientList[0].lName);
	$('#contact_number_1').val(r.patientList[0].mobile);
	$('#age').val(r.patientList[0].age);
	$('#requestTreatmentId').val(r.patientList[0].maxTreatmentId);
	var gender = r.patientList[0].gender;
	if (gender == "Male") {
		$("#maleG").attr("checked", "checked");
	} else if (gender == "Female") {
		$("#femaleG").attr("checked", "checked");
	} else if (gender == "Other") {
		$("#otherG").attr("checked", "checked");
	}
	$('#bloodGroupId').val(r.patientList[0].bloodGroupId);
}


function clearOrganCrossMatch(){
	$('#title').val();
	$('#title').attr('disabled', false);
	$('#txt_first_name').val("");
	$('#txt_first_name').attr('disabled', false);
	$('#txt_middle_name').val("");
	$('#txt_middle_name').attr('disabled', false);
	$('#txt_last_name').val("");
	$('#txt_last_name').attr('disabled', false);
	$('#txt_birth_date').val("");
	$('#txt_birth_date').attr('disabled', false);
	$('#ta_address').val("");
	$('#ta_address').attr('disabled', false);
	$('#txt_occupation').val("");
	$('#txt_occupation').attr('disabled', false);
	$('#txt_contact1').val("");
	$('#txt_contact1').attr('disabled', false);
	$('#txt_contact2').val("");
	$('#txt_contact2').attr('disabled', false);
	$('#txt_age').val("");
	$('#txt_age').attr('disabled', false);
	$('#txt_blood_group').val("");
	$('#txt_blood_group').attr('disabled', false);
	$("input:radio[name=ra_gender]:checked").val();
	$("input:radio[name='ra_gender']").attr('disabled', false);			
}

function getBloodGroupList(){
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organdonor/getBloodGroupList",
		 timeout : 1000 * 60 * 5, 
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setBloodGroupList(r);
		},
	});
}

function setBloodGroupList(r) {

	var list = "";
	list = list + "<option value='0'> - Select Blood Group - </option>";

	for (var i = 0; i < r.lstBloodGroupMaster.length; i++) {

		list = list + "<option value='" + r.lstBloodGroupMaster[i].bloodGroupId
				+ "' class='un'>" + (r.lstBloodGroupMaster[i].bloodGrouptName)
				+ "</option>";
	}
	$("#bloodGroupId").html(list);
	$("#blood_group_container").html(list);
}

function getAllIntendedOrgansToDonate() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organdonor/getAllOrgansIntendedToDonate",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setOrgansList(r);
		},
	});
}

function setOrgansList(r) {

	var list = "";
	list = list + "<option value='0'> - Select Organ - </option>";

	for (var i = 0; i < r.lstIntendOrganDonorMasterDto.length; i++) {

		list = list + "<option value='"
				+ r.lstIntendOrganDonorMasterDto[i].intendId + "' class='un'>"
				+ (r.lstIntendOrganDonorMasterDto[i].intendOrganDonor)
				+ "</option>";
	}
	$("#organ_name").html(list);
	$("#organ_name").select2();
	$('#organ_name_container').select2();
	$("#organ_name_container").html(list);

}

function toggleRegDiv() {
	$("#divForNewDonorReg").toggle('slow');
	$("#header_search_donor").hide();
}

function showPatSearchDiv() {
	$("#header_search_donor").toggle('slow');
	$("#divForNewDonorReg").hide();
}

function getAllTitle(){
	
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organDonorCheckupList/getAllTitle",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var html = "";
			html = html + "<option value='select'>-Select Title-</option>";
			for ( var i = 0; i < r.length; i++) {

				html = html + "<option value='" + r[i].fTitle
						+ "'>" + r[i].fTitle + "</option>";

			}
			$("#oragn_stock_inward_title").html(html);
		}
	});
}

function getAllDoctors(){
	
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organDonorCheckupList/getAllDoctors",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var html = "";
			html = html + "<option value='select'>--Select Doctor Name--</option>";
			for ( var i = 0; i < r.length; i++) {

				html = html + "<option value='" + r[i].doctor_ID
						+ "'>" + r[i].doc_name + "</option>";

			}
			$("#doctor_name").html(html);
		}
	});
}

function getAllOrganContainerList(organId){
	if(organId !=null && organId!="" && organId!=undefined){
		var inputs = [];
		inputs.push('organId=' + organId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organIssue/getAllOrganContainerList",
			data : str + "&reqType=AJAX",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				setAllOrganContainerList(r);
			}
		});
	}
	
}


function setAllOrganContainerList(r){
	var list = "";  
	list = list + "<option value='0'> - Select Container - </option>";
    for ( var i = 0; i < r.lstOrganDonorStockInwardDto.length; i++) {  

        list = list + "<option value='"+r.lstOrganDonorStockInwardDto[i].stockInwardId+"' class='un'>" + (r.lstOrganDonorStockInwardDto[i].organCollectionDto.organCollectionId+"-"+r.lstOrganDonorStockInwardDto[i].organDonorTreatment.organDonorTreatmentId+"-"+r.lstOrganDonorStockInwardDto[i].dorganName) + "</option>";    
    }  
	$('#container_id').html(list);
}

function getContainerList(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organDonorStockInward/getAllOrganDonorStockInward",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setContainerList(r);
		}
	});
}

function setContainerList(r){
	var list = "";  
	list = list + "<option value='0'> - Select Container - </option>";
    for ( var i = 0; i < r.lstOrganDonorStockInwardDto.length; i++) {  

        list = list + "<option value='"+r.lstOrganDonorStockInwardDto[i].stockInwardId+"' class='un'>" + (r.lstOrganDonorStockInwardDto[i].organCollectionDto.organCollectionId+"-"+r.lstOrganDonorStockInwardDto[i].organDonorTreatment.organDonorTreatmentId+"-"+r.lstOrganDonorStockInwardDto[i].dorganName) + "</option>";    
    }  
	$('#container_id').html(list);
}

function getOrganCollectionById(){
	var stockInwardId = $('select#container_id option:selected').val();
	if(stockInwardId !=undefined && stockInwardId!=null && stockInwardId!="" && stockInwardId!="null" && stockInwardId!=0){
		var inputs = [];
		inputs.push('stockInwardId=' + stockInwardId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organDonorStockInward/editOrganDonorStockInward",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				setOrganCollection(r);
			}
	
		});
	}else{
		alert("Please select container");
		return false;
	}
}

function setOrganCollection(r){
	$('#stockInwardTreatmentId').val(r.organDonorTreatment.organDonorTreatmentId);
	$('#organCollectionId').val(r.organCollectionId);
	$('#organDonorId').val(r.organDonationRegistrationDto.id);
	$('#expriy_date').val(r.stockInwardExpiryDate);
	$("#organ_name_container").select2("val",r.organId);
	$('select#blood_group_container').val(r.bloodGroupId);
	$("#available_qty").val(r.organQuantity);
	$("#size_id").val(r.organSize); 
	$("select#stockinward_body_type").val(r.bodyTypeId); 
	$("select#cold_ischemia_time").val(r.coldIschemiaTimeId);
}

function validateQty(){
	var available_qty = $("#available_qty").val();
	var required_quantity = $("#required_quantity").val();
	if(parseInt(required_quantity)> parseInt(available_qty)){
		alert("Required quantity should be less than available qty ! ");
		return false ;
	}
}

function getAllBodyType() {
	var unitId = $("#unitId").val();
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bodyType/getAllBodyType",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setBodyTypeList(r);
		}
	});
}

function setBodyTypeList(r){
	var list = "";  
	list = list + "<option value='0'> - Select Body Type - </option>";
    for ( var i = 0; i < r.lstBodyTypeDto.length; i++) {  
        list = list + "<option value='"+r.lstBodyTypeDto[i].bodyTypeId+"' class='un'>" + (r.lstBodyTypeDto[i].bodyTypeName) + "</option>";    
    }  
    $("#organissue_body_type").html(list);
    $('#organissue_body_type').select2();
    
}


function getAllClodIschemiaTime() {
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/clodIschemiaTime/getAllClodIschemiaTime",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllClodIschemiaTimeList(r);
		}
	});
}

function setAllClodIschemiaTimeList(r){
	var list = "";  
	list = list + "<option value='0'> - Cold Ischemia Time - </option>";
    for ( var i = 0; i < r.lstClodIschemiaTimeDto.length; i++) {  
        list = list + "<option value='"+r.lstClodIschemiaTimeDto[i].clodIschemiaTimeId+"' class='un'>" + (r.lstClodIschemiaTimeDto[i].clodIschemiaTimeName) + "</option>";    
    }  
    $("#cold_ischemia_time").html(list);
    $('#cold_ischemia_time').select2();
    
}

function getAllTitle(){
	
	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organDonorCheckupList/getAllTitle",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var html = "";
			html = html + "<option value='select'>-Select Title-</option>";
			for ( var i = 0; i < r.length; i++) {

				html = html + "<option value='" + r[i].fTitle
						+ "'>" + r[i].fTitle + "</option>";

			}
			$("#oragn_issue_title").html(html);
		}
	});
}

function getOrganContainerNameById(id){
	if(id !=undefined && id!=null && id!="" && id!="null"){
		
		var inputs = [];
		inputs.push('id=' + id);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/organDonorStockInward/getOrganContainerNameById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				setContainerName(r);
			}
		});
	}
}

function setContainerName(r){
	
 var htm = "";
	var index = 1;
	if(r !="" && r!=undefined){
		
			for ( var i = 0; i < r.listOrganCrossMatchDto[i].length; i++) {
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ ' <td class="col-md-1 center">'
						+ r.listOrganCrossMatchDto[i].dorganName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.listOrganCrossMatchDto[i].containerName
						+ '</td>'
											

}
	$("#collectedOrgansList").html(htm);
	
}
}

//added by sandip 
function getDateFormat(fdate, tdate)
{
	farr = fdate.split('/');
	tarr = tdate.split('/');
	
	fdate = farr[2]+'-'+farr[1]+'-'+farr[0];
	tdate = tarr[2]+'-'+tarr[1]+'-'+tarr[0];
	
	return fdate+':'+tdate;
}