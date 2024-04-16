
function saveOrganRequest(){
	var requestRegId = $('#requestRegId').val();
	var patientId= $('#patientId').val();
	var requestTreatmentId= $('#requestTreatmentId').val();
	var prefix = $('select#oragn_request_title').val();
	if(prefix=="" || prefix == "0" || prefix == "select"){
		alert("Please enter title name");
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
	
	var contactNo1 = $('#contact_number_1').val();
	if(contactNo1==""){
		alert("Please enter contact no 1");
		return false;
	}
	
	var contactNo2 = $('#contact_number_2').val();
	
	var age = $('#age').val();
	if(age == "" || age == undefined){
		alert("Please enter age");
		return false;
	}

	var gender=$("input:radio[name=gender]:checked").val();
	if(gender==""){
		alert("Please select gender");
		return false;
	}
	
	var bloodGroupId = $('select#bloodGroupId option:selected').val();
	var bloodGroup = $('select#bloodGroupId option:selected').text();
	if(bloodGroupId=="" || bloodGroupId =="0"){
		alert("Please enter blood group");
		return false;
	}
	var hemoglobin = $('#hemoglobin').val();
	if(hemoglobin=="" || hemoglobin == undefined){
		alert("Please enter hemoglobin");
		return false;
	}
	
	var height = $('#height').val();
	if(height==""){
		alert("Please enter body height");
		return false;
	}
	
	var Weight = $('#Weight').val();
	if(Weight==""){
		alert("Please enter body Weight");
		return false;
	}

	var ward_name = $('#ward_name').val();
	if(ward_name==""){
		alert("Please enter ward name");
		return false;
	}

	var bed_number = $('#bed_number').val();
	if(bed_number==""){
		alert("Please enter bed number");
		return false;
	}
	
	var organ_nameId = $('select#organ_name option:selected').val();
	var organName = $('select#organ_name option:selected').text();
	if(organ_nameId=="" || organ_nameId==0){
		alert("Please select organ Name");
		return false;
	}
	
	var diagnosis_nameId = $('select#diagnosis_name option:selected').val();
	var diagnosisName = $('select#diagnosis_name option:selected').text();
	if(diagnosis_nameId=="" || diagnosis_nameId==0){
		alert("Please select diagnosis name");
		return false;
	}
	
	var bodyTypeId = $('select#organrequest_body_type option:selected').val();
	var bodyType = $('select#organrequest_body_type option:selected').text();
	if(bodyTypeId=="" || bodyTypeId==0){
		alert("Please select body type");
		return false;
	}
	
	var bodySize = $('#body_size').val();
	if(bodySize==""){
		alert("Please enter body size");
		return false;
	}
	
	var doctor_nameId = $('select#doctor_name option:selected').val();
	var doctor_name = $('select#doctor_name option:selected').text();
	if(doctor_nameId=="" || doctor_nameId==0){
		alert("Please select referred by");
		return false;
	}
	
	var priority=$("input:radio[name=planned]:checked").val();
	if(priority==""){
		alert("Please select priority");
		return false;
	}
	
	var Remarks = $('#Remarks').val();
	if(Remarks==""){
		alert("Please enter Remarks");
		return false;
	}
	var inputs = [];	
	inputs.push('requestId=' + requestRegId);
	inputs.push('prefix=' + prefix);
	inputs.push('firstName=' + firstName);
	inputs.push('middleName=' + middleName);
	inputs.push('lastName=' + lastName);
	inputs.push('contactNo1=' + contactNo1);
	inputs.push('contactNo2=' + contactNo2);
	inputs.push('age=' + age);
	inputs.push('gender=' + gender);
	inputs.push('bloodGroupId=' + bloodGroupId);
	inputs.push('bloodGroup=' + encodeURIComponent(bloodGroup));
	inputs.push('hemoglobin=' + hemoglobin);
	inputs.push('weight=' + Weight);
	inputs.push('height=' + height);
	inputs.push('wardName=' + ward_name);
	inputs.push('bedNumber=' + bed_number);
	inputs.push('intendToDonateOrganId=' + organ_nameId);
	inputs.push('intendToDonateOrgan=' + organName);
	inputs.push('diagnosisWithId=' + diagnosis_nameId);
	inputs.push('diagnosisWith=' + diagnosisName);
	inputs.push('bodyType=' + bodyType);
	inputs.push('bodyTypeId=' + bodyTypeId);
	inputs.push('bodySize=' + bodySize);
	inputs.push('referredById=' + doctor_nameId);
	inputs.push('referredByName=' + doctor_name);
	inputs.push('priority=' + priority);
	inputs.push('Remarks=' + Remarks);
	inputs.push('patientId=' + patientId);
	inputs.push('treatmentId=' + requestTreatmentId);
	
	var str = inputs.join('&');

	jQuery.ajax({
		
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/organRequest/saveOrganRequest",
		
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Organ Requester Saved Sucessfully");
				getAllOrganRequestList();
				toggleRegDiv();
				clearOrganRequest();
			}
			else if (data == 2) {
				alertify.success( "Organ Requester Updated Sucessfully");	
				getAllOrganRequestList();
				toggleRegDiv();
				clearOrganRequest();
			}
		}
	});	
}

function organRequestAutoSuggestion(inputID) {
	
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
		}
		//getOrganRequestDetails(organRequestId);
	}
}

function getOrganRequestDetails(organRequestId){
	
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
				toggleRegDiv();
				$('#requestRegId').val(r.requestId);
				$("#requestTreatmentId").val(r.treatmentDto.treatmentId);
				$("#patientId").val(r.patientRegistered.patientId);
				
				$("select#oragn_request_title").val(r.prefix);
				$("select#oragn_issue_title").val(r.prefix);
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
				$("select#organrequest_body_type").select2("val",r.bodyTypeId);
				$("select#organissue_body_type").select2("val",r.bodyTypeId);
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
				setAllOrganRequest(r, "search");
			}
	
		});
	}
}


function organRequestSearchById() {
	var requestId = $("#requestSearchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(requestId)) {
		alert("Please Enter Number Only!");
		return false;
	}
	getOrganRequestById(requestId);
}



function getAllOrganRequestList(){
	var fromDate = $("#fromDate").val();
	var toDate = $("#lastDate").val();
	
	var str = getDateFormat(fromDate, toDate); //added by sandip
	var fromDate = str.split(':')[0];
	var toDate = str.split(':')[1];
	
	var inputs = [];
	
	inputs.push('fromDate=' + fromDate);
	inputs.push('lastDate=' + toDate);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/organRequest/getAllOrganRequestList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllOrganRequest(r, "All");
		}
	});
}

function setAllOrganRequest(r, CallFrom) {
	var htm = "";
	var index = 1;
	if (CallFrom == "All") {
		for ( var i = 0; i < r.listOrganRequestDto.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganRequestDto[i].requestId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganRequestDto[i].prefix +" "+ r.listOrganRequestDto[i].firstName +" "+ r.listOrganRequestDto[i].middleName +" "+ r.listOrganRequestDto[i].lastName 
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganRequestDto[i].intendToDonateOrgan
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganRequestDto[i].bloodGroup
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganRequestDto[i].bodyType
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganRequestDto[i].priority
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editOrganRequest('
					+ r.listOrganRequestDto[i].requestId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganRequest('
					+ r.listOrganRequestDto[i].requestId
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					+ '</tr>';
			index++;
		}
	} else if (CallFrom == "search") {
		
		htm = htm
		+ '<tr> '
		+ ' <td class="col-md-1 center">'
		+ index
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.requestId
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.prefix +" "+ r.firstName +" "+ r.middleName +" "+ r.lastName 
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.intendToDonateOrgan
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.bloodGroup
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.bodyType
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.priority
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-success" onclick=editOrganRequest('
		+ r.requestId
		+ ')><i class="fa fa-edit"></i></button></td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganRequest('
		+ r.requestId
		+ ')><i class="fa fa-trash-o"></i></button></td>'
		+ '</tr>';
		index++;
	}
	$("#organRequestListDetails").html(htm);
}

function deleteOrganRequest(organRequestId){
	
	if(organRequestId !=undefined && organRequestId!=null && organRequestId!="" && organRequestId!="null"){
		var r = confirm("Are You Sure You Want To Delete Organ Request Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/organRequest/deleteOrganRequest",
				data : {
					"organRequestId" : organRequestId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllOrganRequestList();
					location.reload(true);
					
				}
			});
		}
	}
	
}

function editOrganRequest(organRequestId){
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
				toggleRegDiv();
			
				
			//	alert(JSON.stringify(r));
				
				$('#requestRegId').val(r.requestId);
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
				$("input:radio[name='gender'][value='"+gender+"']").prop("checked",true);
				/*if(gender == "M"){
					$("#maleG").attr("checked","checked");
				}else if(gender == "F"){
					$("#femaleG").attr("checked","checked");
				}else if(gender == "O"){
					$("#otherG").attr("checked","checked");
				}*/
				
				$("#bloodGroupId").val(r.bloodGroupId);
				$("#hemoglobin").val(r.hemoglobin);
				$("#height").val(r.height);
				$("#Weight").val(r.weight);
				$("#ward_name").val(r.wardName);
				$("#bed_number").val(r.bedNumber);
				$("select#organ_name").val(r.intendToDonateOrganId);
				$("select#diagnosis_name").val(r.diagnosisWithId);
				$("select#organrequest_body_type").select2('val',r.bodyTypeId);
				$("#body_size").val(r.bodySize);
				$("select#doctor_name").val(r.referredById);
				
				var priority = r.priority;
				$("input:radio[name='planned'][value='"+priority+"']").prop("checked",true);
				/*if(priority == "urgent"){
					$("#urgent_id").attr("checked","checked");
				}else if(gender == "planned"){
					$("#planned_id").attr("checked","checked");
				}*/
				$("#Remarks").val(r.remarks);
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

function setAutoPatientNameOrgnRequest(inputID,callFrom) {
	
//	alert("organ request - " + callFrom);
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var patSearchType = $("#patSearchType").val();
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	var fromYear = $('#year-dropdown').val();
	
	var searchStringLength = findingName.length;
//	alert("searchStringLength : " + searchStringLength);
	
	if( searchStringLength >= 3){		// start--------------
	
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
		url : "ehat/organdonor/searchPatientByStoredProcedurefor_organREquest",
		//url : "ehat/organdonor/searchPatientByStoredProcedure",
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
	}				// END-----------------------
}

function setSearchedPatientDetailsForRequestRegistration(patId){
	if(patId !=undefined && patId !=null && patId!="" && patId !=0){
		jQuery.ajax({
			async 	: false,
			type 	: "POST",
			data 	: {
			 "patientId" : patId,
	 			},
			url 	: "ehat/organRequest/getPatientDetailsWithMaxTreatmentId",
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
	$('select#oragn_request_title').val(r.patientList[0].prefix);
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
	
	if(r.patientList[0].height!=undefined && r.patientList[0].height !="" && r.patientList[0].height!=null && r.patientList[0].height!='null'){
		$('#height').val(r.patientList[0].height);
	}
	
	if(r.patientList[0].weight!=undefined && r.patientList[0].weight !="" && r.patientList[0].weight!=null && r.patientList[0].weight!='null'){
		$('#Weight').val(r.patientList[0].weight);
	}
	
	$('#bloodGroupId').val(r.patientList[0].bloodGroupId);
}


function clearOrganRequest(){
	$('#oragn_request_title').val("select");
	$('#firstName').val("");
	$('#middleName').val("");
	$('#lastName').val("");
	$('#contact_number_1').val("");
	$('#contact_number_2').val("");
	$('#age').val("");
	$('#bloodGroupId').val("");
	$('#hemoglobin').val("");
	$('#height').val("");
	$('#Weight').val("");
	$('#ward_name').val("");
	$('#bed_number').val("");
	$('#organ_name').val("");
	$('#diagnosis_name').val("");
	$('#organrequest_body_type').select2('val',0);
	$('#body_size').val("");
	$('#doctor_name').val("");
	$('#Remarks').val("");
	$("input:radio[name='planned']").attr('checked', false);		
	$("input:radio[name='gender']").attr('checked', false);	
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
			$("#oragn_request_title").html(html);
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
    $("#organrequest_body_type").html(list);
    $('#organrequest_body_type').select2();
    
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