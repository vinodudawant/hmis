
function saveOrganCrossMatch(){
	var crossMatchId = $('#crossMatchId').val();
	var patientId= $('#patientId').val();
	var treatmentId= $('#crossMatchTreatmentId').val();
	var requesterId= $('#requestIdCrossMatch').val();
	
	
	
	var oragn_request_title = $('select#oragn_request_title').val();
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
	
	var stockInwardId = $('select#container_id option:selected').val();
	if(stockInwardId=="" || stockInwardId =="0"){
		alert("Please select container");
		return false;
	}
	
	var blood_group_container = $('select#blood_group_container option:selected').val();
	if(blood_group_container=="" || blood_group_container =="0"){
		alert("Please enter blood group");
		return false;
	}
	
	var organ_nameId = $('select#organ_name_container option:selected').val();
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
	
	var cross_match_remark = $('#cross_match_remark').val();
	if(cross_match_remark==""){
		alert("Please enter Remarks");
		return false;
	}
	
	// this is all about slave data store image
	
	var crossMatchSlaveId = $("#crossMatchSlaveId").val();
	
	var lvmphoTest = $("#lvmpho_cross_test_name").val().trim();
	var bloTypeComp = $("#blo_type_comp_name").val().trim();
	var humLeuAntiType = $("#hum_leu_anti_type_name").val().trim();
	var hlaAnti = $("#hla_anti_name").val().trim();
	var perReaAnti = $("#per_rea_anti_name").val().trim();
	var serumTest = $("#serum_cross_match_name").val().trim();
	
	var lvmphoTestResult = $("select#lvmpho_cross_test").val();
	if(lvmphoTestResult==0 || lvmphoTestResult =="" || lvmphoTestResult==undefined || lvmphoTestResult==null){
		alert("Please select Lymphocytotoxic Result ");
		return false;
	}
	var bloTypeCompResult = $("select#blo_type_comp").val();
	if(bloTypeCompResult==0 || bloTypeCompResult =="" || bloTypeCompResult==undefined || bloTypeCompResult==null){
		alert("Please select blo type Result ");
		return false;
	}
	var humLeuAntiTypeResult = $("select#hum_leu_anti_type").val();
	if(humLeuAntiTypeResult==0 || humLeuAntiTypeResult =="" || humLeuAntiTypeResult==undefined || humLeuAntiTypeResult==null){
		alert("Please select hum leu anti Result ");
		return false;
	}
	var hlaAntiResult = $("select#hla_anti").val();
	if(hlaAntiResult==0 || hlaAntiResult =="" || hlaAntiResult==undefined || hlaAntiResult==null){
		alert("Please select hlaAnti Result ");
		return false;
	}
	var perReaAntiResult = $("select#per_rea_anti").val();
	if(perReaAntiResult==0 || perReaAntiResult =="" || perReaAntiResult==undefined || perReaAntiResult==null){
		alert("Please select perReaAnti Result ");
		return false;
	}
	var serumResult = $("select#serum_cross_match").val();
	if(serumResult==0 || serumResult =="" || serumResult==undefined || serumResult==null){
		alert("Please select  serum Result ");
		return false;
	}
	
	var lvmphoTestDate = $("#lvmpho_cross_test_date").val();
	var bloTypeCompDate = $("#blo_type_comp_date").val();
	var humLeuAntiTypeDate = $("#hum_leu_anti_type_date").val();
	var hlaAntiDate = $("#hla_anti_date").val();
	var perReaAntiDate = $("#per_rea_anti_date").val();
	var serumDate = $("#serum_cross_match_date").val();
	var form = $("#documentForm")[0];
	if (document.getElementsByName("testResultDocumentName").length == 0 || $("#testResultDocument").val() == "") {
		alert("Please select file");
		return false;
	}
	
	var serumFile = getFileValue('testResultDocument');
	
	var data = new FormData(form);
	data.append('crossMatchId', crossMatchId);
	data.append('patientId', patientId);
	data.append('treatmentId', treatmentId);
	data.append('organId', organ_nameId);
	data.append('stockInwardId', stockInwardId);
	data.append('requestId', requesterId);
	data.append('lvmphoTest', lvmphoTest);
	data.append('lvmphoTestResult',lvmphoTestResult);
	data.append('lvmphoTestDate',lvmphoTestDate);
	data.append('bloTypeComp',bloTypeComp);
	data.append('bloTypeCompResult',bloTypeCompResult);
	data.append('bloTypeCompDate',bloTypeCompDate);
	data.append('humLeuAntiType',humLeuAntiType);
	data.append('humLeuAntiTypeResult',humLeuAntiTypeResult);
	data.append('humLeuAntiTypeDate',humLeuAntiTypeDate);
	data.append('hlaAnti',hlaAnti);
	data.append('hlaAntiResult',hlaAntiResult);
	data.append('hlaAntiDate',hlaAntiDate);
	data.append('perReaAnti',perReaAnti);
	data.append('perReaAntiResult',perReaAntiResult);
	data.append('perReaAntiDate',perReaAntiDate);
	data.append('serumTest',serumTest);
	data.append('serumResult',serumResult);
	data.append('serumDate',serumDate);
	
	data.append('bloodGroupId', blood_group_container);
	data.append('coldIschemiaTimeId', coldIschemiaTimeId);
	data.append('requiredQuantity', required_quantity);
	data.append('availableQuantity', available_qty);
	data.append('stockInwardExpiryDate', expriy_date);
	data.append('organSize', organSize);
	data.append('crossMatchDateAndTime', cross_match_date_time);
	data.append('compatibilityType', cross_match_compatible_type);
	data.append('uploadedFile', serumFile);
	data.append('testResultDocumentName',serumFile);
	data.append('CompatibilityRemarks', cross_match_remark);
	//var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		enctype : 'multipart/form-data',
		//data : str + "&reqType=AJAX",
		url : "ehat/organCrossMatch/saveOrganCrossMatch",
		data :data,
		processData : false,
		contentType : false,
		catche : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Organ Cross Match Saved Sucessfully");
				getAllOrganCrossMatchList();
				clearOrganCrossMatch();
				toggleRegDiv();
			}
			else if (data == 2) {
				alertify.success( "Organ Cross Match Updated Sucessfully");	
				getAllOrganCrossMatchList();
				clearOrganCrossMatch();
				toggleRegDiv();
			}
		}
	});	
}

function getFileValue(id){
	var files = $('#'+id).prop("files");
	var document = $.map(files, function(val) {
		return val.name;
	});
	return document;
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
		}
	}
}

function organRequestAutoSuggestion(inputID) {
	
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
				setOrganCrossMatch(r);
			}
	
		});
	}
}

function setOrganCrossMatch(r){
	$('#requestIdCrossMatch').val(r.requestId);
	$("#crossMatchTreatmentId").val(r.treatmentDto.treatmentId);
	$("#patientId").val(r.patientRegistered.patientId);
	
	$("select#oragn_request_title").val(r.prefix);
	$("#firstName").val(r.firstName);
	$("#middleName").val(r.middleName);
	$("#lastName").val(r.lastName);
	$("#contact_number_1").val(r.patientRegistered.mobile);
	$("#contact_number_2").val(r.contactNo2);
	$("#age").val(r.patientRegistered.age);
	
	var gender = r.patientRegistered.gender;
//	alert(gender);
//	$("input:radio[name='gender'][value='"+gender+"']").prop("checked",true);
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
	getAllOrganCrossMastchContainerList(r.intendToDonateOrganId);
	$("select#diagnosis_name").val(r.diagnosisWithId);
	$("select#organrequest_body_type").select2("val",r.bodyTypeId);
	$("select#organcrossmatch_body_type").select2("val",r.bodyTypeId);
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
function getOrganCrossMatchById(organCrossMatchId){
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
}


function organCrossMatchSearchById() {
	var crossMatchId = $("#crossMatchSearchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(crossMatchId)) {
		alert("Please Enter Number Only!");
		return false;
	}
	getOrganCrossMatchById(crossMatchId);
}



function getAllOrganCrossMatchList(){
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
		url : "ehat/organCrossMatch/getAllOrganCrossMatchList",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllOrganCrossMatch(r, "All");
		}
	});
}

function setAllOrganCrossMatch(r, CallFrom) {
	var htm = "";
	var index = 1;
	if (CallFrom == "All") {
		for ( var i = 0; i < r.listOrganCrossMatchDto.length; i++) {
			
			var crossmdate=new Date(r.listOrganCrossMatchDto[i].crossMatchDateAndTime).toLocaleString('en-GB');
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganCrossMatchDto[i].crossMatchId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganCrossMatchDto[i].requestId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganCrossMatchDto[i].prefix +" "+ r.listOrganCrossMatchDto[i].firstName +" "+ r.listOrganCrossMatchDto[i].middleName +" "+ r.listOrganCrossMatchDto[i].lastName 
					+ '</td>'
					/*+ ' <td class="col-md-1 center">'
					+ r.listOrganCrossMatchDto[i].intendOrganDonorMasterDto.intendOrganDonor
					+ '</td>'*/
					
					+ ' <td class="col-md-1 center">'
					+ r.listOrganCrossMatchDto[i].intendToDonateOrgan
					+ '</td>'
					
					+ ' <td class="col-md-1 center">'
					+ r.listOrganCrossMatchDto[i].organCollectionId+"-"+r.listOrganCrossMatchDto[i].donarTreatmentId+"-"+r.listOrganCrossMatchDto[i].intendToDonateOrgan
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganCrossMatchDto[i].bloodGroup
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganCrossMatchDto[i].bodyType
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganCrossMatchDto[i].priority
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					//+ r.listOrganCrossMatchDto[i].crossMatchDateAndTime
					+ crossmdate
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editOrganCrossMatch('
					+ r.listOrganCrossMatchDto[i].crossMatchId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganCrossMatch('
					+ r.listOrganCrossMatchDto[i].crossMatchId
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					+ '</tr>';
			index++;
		}
	} else if (CallFrom == "search") {
		
		var crossmdate=new Date(r.crossMatchDateAndTime).toLocaleString('en-GB');
		htm = htm
		+ '<tr> '
		+ ' <td class="col-md-1 center">'
		+ index
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.crossMatchId
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.organRequestDto.requestId
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.organRequestDto.prefix +" "+ r.organRequestDto.firstName +" "+ r.organRequestDto.middleName +" "+ r.organRequestDto.lastName
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.intendOrganDonorMasterDto.intendOrganDonor
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.organDonorStockInwardDto.organCollectionDto.organCollectionId+"-"+r.organDonorStockInwardDto.organDonorTreatment.organDonorTreatmentId+"-"+r.organDonorStockInwardDto.organCollectionDto.organName
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.organRequestDto.bloodGroup
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.organRequestDto.bodyType
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.organRequestDto.priority
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		//+ r.crossMatchDateAndTime
		+ crossmdate
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-success" onclick=editOrganCrossMatch('
		+ r.crossMatchId
		+ ')><i class="fa fa-edit"></i></button></td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganCrossMatch('
		+ r.crossMatchId
		+ ')><i class="fa fa-trash-o"></i></button></td>'
		+ '</tr>';
		index++;
	}
	$("#organCrossMatchListDetails").html(htm);
}

function deleteOrganCrossMatch(organCrossMatchId){
	
	if(organCrossMatchId !=undefined && organCrossMatchId!=null && organCrossMatchId!="" && organCrossMatchId!="null"){
		var r = confirm("Are You Sure You Want To Delete Organ Cross  Match Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/organCrossMatch/deleteOrganCrossMatch",
				data : {
					"organCrossMatchId" : organCrossMatchId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllOrganCrossMatchList();
				}
			});
		}
	}
	
}

function editOrganCrossMatch(organCrossMatchId){
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
				
			//	alert(JSON.stringify(r));
				
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
				$("select#organcrossmatch_body_type").select2("val",r.organRequestDto.bodyTypeId);
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
				$('select#cold_ischemia_time').select2("val",r.coldIschemiaTimeId);
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
	$('#oragn_request_title').val("select");
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
	$('#organcrossmatch_body_type').select2('val',0);
	$('#body_size').val("");
	$("input:radio[name='planned']").attr('checked', false);
	$('#lvmpho_cross_test').val("");
	$('#lvmpho_cross_test').val("0");
	$('#blo_type_comp').val("0");
	$('#hum_leu_anti_type').val("0");
	$('#hla_anti').val("0");
	$('#per_rea_anti').val("0");
	$('#serum_cross_match').val("0");
	$('#cross_match_remark').val("");
	$('select#container_id').val("0");
	$('#testResultDocument').val("");
	$('#size_id').val("");
	$('select#organ_name_container').select2("val",0);
	$('select#cold_ischemia_time').select2("val",0);
	$('#expriy_date').val("");
	$('#available_qty').val("");
	$('#required_quantity').val("");
	$('#cross_match_date_time').val("");
	$('#cross_match_date_time').val("");
	$('select#cross_match_compatible_type').val("0");
	$('select#blood_group_container').val("0");
			
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

function getAllOrganCrossMastchContainerList(organId){
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
				setAllOrganCrossMastchContainerList(r);
			}
		});
	}
	
}

function setAllOrganCrossMastchContainerList(r){
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
	if(stockInwardId !=undefined && stockInwardId!=null && stockInwardId!="" && stockInwardId!="null"){
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
//	$("select#cold_ischemia_time").val(r.coldIschemiaTimeId);
	$("select#cold_ischemia_time").select2("val",r.coldIschemiaTimeId);
}

function checkQty(){
	var available_qty = $("#available_qty").val();
	var required_quantity = $("#required_quantity").val();
	if(parseInt(required_quantity)> parseInt(available_qty)){
		alert("Required qty should be less than available qty ");
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
    $("#organcrossmatch_body_type").html(list);
    $('#organcrossmatch_body_type').select2();
    
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

//added by sandip 
function getDateFormat(fdate, tdate)
{
	farr = fdate.split('/');
	tarr = tdate.split('/');
	
	fdate = farr[2]+'-'+farr[1]+'-'+farr[0];
	tdate = tarr[2]+'-'+tarr[1]+'-'+tarr[0];
	
	return fdate+':'+tdate;
}
