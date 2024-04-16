function saveOrgan(){
	/*var donorType=$("input:radio[name=donor_menu]:checked").val();
	if(donorType=="new"){
		saveNewOrganDonor();
	}else if(donorType=="existing"){
		saveExistingOrganDonor();
	}else{
		alert("Select radio button new donor or existing donor ");
	}*/
	
	saveNewOrganDonor();
}
// aniket kanse 1 DEC 2021
function saveNewOrganDonor(){
	
	var id = $('#donorRegId').val();
	var patientId= $('#patientId').val();
	
//	alert("saveNewOrganDonorpatientId--: " + patientId);
	var donorTypeId = $('select#donorType').val();
	var donorType = $('select#donorType option:selected').text();
	if(donorTypeId=="" || donorTypeId == "0"){
		alert("Please select donor type");
		return false;
	}
	var intendToDonate = $("input[name=radioDonate]:checked").val();
	
	
	
	if(intendToDonate == "" || intendToDonate == 0 || intendToDonate == "undefined" || intendToDonate == undefined){
		alert("Please Select Intend  to Doante First");
		return false;
	}
	
	var prefix = $('#prefix').val();
	if(prefix=="" || prefix == "0"){
		alert("Please enter first name");
		return false;
	}
	
	var firstName = $('#firstName').val();
	if(firstName==""){
		alert("Please enter first name");
		return false;
	}
	
	var middleName = $('#middleName').val();
	/*if(middleName==""){
		alert("Please enter middle name");
		return false;
	}*/

	var lastName = $('#lastName').val();
	if(lastName==""){
		alert("Please enter last name");
		return false;
	}

	var birthDate = $('#birthDate').val();
	
//	var birthDate =  Date.parse(dob);
//	console.log(birthDate);
	
	if(birthDate==""){
		//alert("Please enter birth date");
		//return false;
	}

	var address = $('#address').val();
	if(address==""){
		alert("Please enter address");
		return false;
	}
	
	var cityId = $('#city').val();
	if(cityId=="" || cityId == "0"){
		cityId=0;
		//alert("Please select city name");
		//return false;
	}
	
	var districtId = $('#district').val();
	if(districtId=="" || districtId == "0"){
		districtId=0;
	//	alert("Please select district name");
		//return false;
	}
	
	var stateId = $('#state').val();
	if(stateId=="" || stateId == "0"){
		stateId=0;
		//alert("Please select state name");
		//return false;
	}

	var occupation = $('#occupation').val();
	
	var contactNo1 = $('#contactNo1').val();
	if(contactNo1==""){
		alert("Please enter contact no");
		return false;
	}
	
	var contactNo2 = $('#contactNo2').val();
	
	var age = $('#age').val();
	if(age==""){
		alert("Please enter age");
		return false;
	}

	var gender=$("input:radio[name=gender]:checked").val();
	if(gender==""){
		alert("Please select gender");
		return false;
	}
	
	var bloodGroupId = $('#bloodGroupId').val();
	if(bloodGroupId=="" || bloodGroupId =="0"){
		alert("Please enter blood group");
		return false;
	}

	var bodySize = $('#bodySize').val();
	if(bodySize==""){
		alert("Please enter body size");
		return false;
	}
	
	var bodyType = $('#body_type').val();
	if(bodyType==""  || bodyType=="0" || bodyType==0){
		alert("Please enter body type");
		return false;
	}
	
	var identityCard =  $('#identityCard').val();
	if(identityCard==""){
		alert("Please enter identity Card");
		return false;
	}
	 var bodySize= $("#bodySize").val();
	if(bodySize==""){
		alert("Please enter body size");
		return false;
	}
	var organIdList = "";
	var donateOrganName="";
	$('#select_organ_donor_name_id option:selected').each(function() {
		if(!organIdList == "" && organIdList!=0 && organIdList!=undefined && organIdList!='undefined'){
			organIdList = organIdList +","+ $(this).val();
			donateOrganName = donateOrganName+","+$(this).text();
		}else{
			organIdList = $(this).val();
			donateOrganName = $(this).text();
		}	    
	});
	
	if(organIdList == "" || organIdList==0 || organIdList==undefined || organIdList=='undefined'){
		alert("Please Select atleat one organ name");
		return false;
	}
	
	/*var intendToDonateOrganId = $('#intendToDonateOrganId').val();
	if(intendToDonateOrganId=="" || intendToDonateOrganId =="0"){
		alert("Please enter blood group");
		return false;
	}*/
	
	var Remarks = $('#Remarks').val();
	if(Remarks==""){
		alert("Please enter Remarks");
		return false;
	}
	
	
	
	var proofId = $('#proofId').val();
	
	var intendSelectId = $('#intendToDonateOrganId').val();
	
	
	
	
	var inputs = [];	
	inputs.push('id=' + id);
	inputs.push('donorTypeId=' + donorTypeId);
	inputs.push('donorType=' + donorType);
	inputs.push('intendToDonate=' + intendToDonate);
	inputs.push('prefix=' + prefix);
	inputs.push('firstName=' + firstName);
	inputs.push('middleName=' + middleName);
	inputs.push('lastName=' + lastName);
	inputs.push('birthDate=' + birthDate);
	inputs.push('address=' + address);
	inputs.push('cityId=' + cityId);
	inputs.push('districtId=' + districtId);
	inputs.push('stateId=' + stateId);
	inputs.push('occupation=' + occupation);
	inputs.push('contactNo1=' + contactNo1);
	inputs.push('contactNo2=' + contactNo2);
	inputs.push('age=' + age);
	inputs.push('gender=' + gender);
	inputs.push('bloodGroupId=' + bloodGroupId);
	inputs.push('bodySize=' + bodySize);
	inputs.push('bodyType=' + bodyType);
	inputs.push('identityCard=' + identityCard);
	inputs.push('intendToDonateOrganId=' + organIdList);
	inputs.push('donateOrganName=' + donateOrganName);
	inputs.push('Remarks=' + Remarks);
	inputs.push('patientId=' + patientId);
	inputs.push('proofId=' + proofId);
	inputs.push('intendSelectId=' + intendSelectId);

	
	var str = inputs.join('&');

	jQuery.ajax({
		
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/organdonor/saveOrganDonation",
		
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			toggleRegDiv();
			if (data == 1) {
				alertify.success("Donor Saved Sucessfully");
				//location.reload(true);
				getAllDonorsList();
				clearOrganDonorForm();
				
			}
			else if (data == 2) {
				alertify.success( "Donor Updated Sucessfully");	
				//location.reload(true);
				getAllDonorsList();
				clearOrganDonorForm();
			}else if (data == 3) {
				alertify.success( "Patient already exit in Organ Donor.");	
				getAllDonorsList();
				clearOrganDonorForm();
			}
		}
	});	
}

function clearOrganDonorForm(){
	$('#donorRegId').val(0);
	$('#patientId').val(0);
	$('select#donorType').val(0);
	$("input[name=radioDonate]:checked").val();
	$('#prefix').val(0);
	$('#firstName').val(" ");
	$('#middleName').val(" ");
	$('#lastName').val(" ");
	$('#birthDate').val(" ");
	$('#address').val(" ");
	$('#city').val(0);
	$('#district').val(0);
	$('#state').val(0);
	$('#occupation').val(" ");
	$('#contactNo1').val(" ");
	$('#contactNo2').val(" ");
	$('#age').val(" ");
	$("input:radio[name=gender]:checked").val();
	$("input:radio[name=ra_gender]:checked").val();
	$('#bloodGroupId').val(0);
	$('#body_type').select2('val',0);
	$('#identityCard').val('');
	$('#bodySize').val('');
	$('#identityCard').val('');
	$('#select_organ_donor_name_id').select2('val','');
	$('#Remarks').val('');
}

function saveDonarTreatment(){
	saveExistingOrganDonor();
}

// this is by vishnu for existing donor
function saveExistingOrganDonor(){
	var organDonorId = $('#donorRegId').val();
	
	
	var patientId=$('#patientId').val();
	var id=$('#treatmentId').val();
	var donorTypeId = $('select#donorType option:selected').val();
	var donorType = $('select#donorType option:selected').text();
	/*var intendToDonateOrganId = $('select#intendToDonateOrganId option:selected').val();
	if(intendToDonateOrganId=="" || intendToDonateOrganId =="0"){
		alert("Please enter blood group");
		return false;
	}*/
	
	var organIdList = "";
	var donateOrganName="";
	$('#select_organ_donor_name_id option:selected').each(function() {
		if(!organIdList == "" && organIdList!=0 && organIdList!=undefined && organIdList!='undefined'){
			organIdList = organIdList +","+ $(this).val();
			donateOrganName = donateOrganName+","+$(this).text();
		}else{
			organIdList = $(this).val();
			donateOrganName = $(this).text();
		}	    
	});
	

	
	if(organIdList == "" || organIdList==0 || organIdList==undefined || organIdList=='undefined'){
		alert("Please Select atleat one organ name");
		return false;
	}
	
	var Remarks = $('#Remarks').val();
	if(Remarks==""){
		alert("Please enter Remarks");
		return false;
	}
	
	var prefix = $('#prefix').val();
	if(prefix=="" || prefix == "0"){
		alert("Please enter first name");
		return false;
	}
	
	var firstName = $('#firstName').val();
	if(firstName==""){
		alert("Please enter first name");
		return false;
	}
	
	var middleName = $('#middleName').val();
	/*if(middleName==""){
		alert("Please enter middle name");
		return false;
	}*/

	var lastName = $('#lastName').val();
	if(lastName==""){
		alert("Please enter last name");
		return false;
	}

	var contactNo1 = $('#contactNo1').val();
	if(contactNo1==""){
		alert("Please enter contact no");
		return false;
	}
	
	var intendSelectId = $('#intendToDonateOrganId').val();
	
	
	
	var inputs = [];	
	inputs.push('organDonorTreatmentId=' + id);
	inputs.push('donorTypeId=' + donorTypeId);
	inputs.push('donorType=' + donorType);
	inputs.push('intendToDonateOrganId=' + organIdList);
	inputs.push('donateOrganName=' + donateOrganName);
	inputs.push('organDonorId=' + organDonorId);
	inputs.push('patientId=' + patientId);
	inputs.push('remark=' + Remarks);
	inputs.push('prefix=' + prefix);
	inputs.push('firstName=' + firstName);
	inputs.push('middleName=' + middleName);
	inputs.push('lastName=' + lastName);
	inputs.push('contactNo1=' + contactNo1);
	inputs.push('intendSelectId=' + intendSelectId);
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		url : "ehat/organdonor/saveOrganDonationTreatment",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			toggleRegDiv();
			if (data == 1) {
				alertify.success("Donor treatment save Sucessfully");
				getAllDonorsTreatmentList();
				clearDonorForm();
				getAllDonorsList();
			}
			else if (data == 2) {
				alertify.success( "Donor treatment Updated Sucessfully");	
				getAllDonorsTreatmentList();
				getAllDonorsList();
			}
		}
	});	
}

function setDonorSearchType(){
	
	$("#donorSearchId").val("");
	var searchType = $("#searchType").val();
	
	if(searchType == 1){
		
		$("#donorSearchId").attr("placeholder", "Type Donor Id Here");
		
	}else if(searchType == 2){
		//Added By Annapurna
		$("#donorSearchName").attr("placeholder", "Type Donor Name Here");
	}
}

function donorsAutoSuggestion(inputID) {
	
	var call=$("#callFrom").val();	
//	alert("call : " + call);
	
	if(call == "New"){
		donorsAutoSuggestionForReg(inputID);
	}else if(call == "Exit"){
		donorsAutoSuggestionForTreat(inputID);
	}
}


function donorsAutoSuggestionForReg(inputID) {
	
	//	alert("this is the search function-- 03 DEC Aniket");
	
	var callFrom =  $("#searchType").val();
	if(callFrom == 0){
		alert("Please select search type");
		return false;
	}
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	
//	var patSearchType = $("#searchType").val();
//	alert(patSearchType + " " + findingName);
//	return false;
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	var inputs = [];	
	inputs.push('findText=' + findingName.trim());	
//	inputs.push('patSearchType=' + patSearchType);		
	inputs.push('callFrom=' + callFrom);		
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/organdonor/donorAutoSuggestion",
		cache : false,		
		success : function(r) {
			var template = "";
			
					for ( var j = 0; j < r.listOrganDonationRegistrationDto.length; j++) {
						
					//	alert( r.listOrganDonationRegistrationDto[j].id +"-"+r.listOrganDonationRegistrationDto[j].donorName +"-"+r.listOrganDonationRegistrationDto[j].mobile);
						
						var arrValue = r.listOrganDonationRegistrationDto[j].id +"-"+r.listOrganDonationRegistrationDto[j].donorName +"-"+r.listOrganDonationRegistrationDto[j].mobile;
						var idValue = r.listOrganDonationRegistrationDto[j].id;
						var donorName = r.listOrganDonationRegistrationDto[j].donorName;
						resultData.push({
							ID : idValue,
							Name : donorName
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}
					
			setTimeout(function() {

				$("div#odt_Doc_name .typeahead").html(template);
				$("div#odt_Doc_name .typeahead").show();

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
		var donorId = res[0];
		var donorName = res[1];
		//var patMobile = res[2];
		
	//	alert("donorId :" + donorId + " donorName :"  + donorName);
		
		$("#" + inputID).val(donorName);	
		
	//	setDonorList(patId);
		
		setDonorList(donorId);
	
		// aniket, 12 DEC 21
	//	setDonorDetails(donorId);
	}
}

function setDonorDetails(donorId){
	
	if(donorId !=undefined && donorId!=null && donorId!="" && donorId!="null"){
		
		var inputs = [];
		inputs.push('id=' + donorId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organDonorCheckupList/getOrganDonorById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				toggleRegDiv();
			
				$('#donorRegId').val(r.id);
				$("#donorType").val(r.donorTypeId);
				
				var intendToDonate = r.intendToDonate;
				if(intendToDonate == "N"){
					$("#radioIntendNow").attr("checked","checked");
				}else if(intendToDonate == "A"){
					$("#radioIntendAfterDeath").attr("checked","checked");
				}
				
				$("#prefix").val(r.prefix);
				$("#firstName").val(r.firstName);
				$("#middleName").val(r.middleName);
				$("#lastName").val(r.lastName);
				$("#birthDate").val(r.birthDate);
				
				$("#address").val(r.address);
				$("#city").val(r.cityId);
				$("#district").val(r.districtId);
				$("#state").val(r.stateId);
				
				$("#occupation").val(r.occupation);
				$("#contactNo1").val(r.contactNo1);
				$("#contactNo2").val(r.contactNo2);
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
				$("#bodySize").val(r.bodySize);
				$("#intendToDonateOrganId").val(r.intendToDonateOrganId);
				$("#Remarks").val(r.remarks);
				$("#patientId").val(r.patientRegistered.patientId);
				 
				setAllDonorsList(r, "search");

			}
		});
	}
}


function setDonorList(organDonorId){
	
//	alert("--setDonorList--->>--" + organDonorId);
	
	if(organDonorId !=undefined && organDonorId != null && organDonorId != "" && organDonorId != "null"){
		
		var inputs = [];
		inputs.push('id=' + organDonorId);
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/organDonorCheckupList/getOrganDonorById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
//				alert("---before sending to set data----");
				setAllDonorsList(r, "search");
			}
		});
	}
	
}

function showOrganPatientDeatils(){
	var call=$("#callFrom").val();
	
	if(call == "Exit"){
		getAllDonorsTreatmentList();
	}else{
		getAllDonorsList();
	}
}

//aniket kanse 3 DEC 2021
function getAllDonorsList(){
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
		url : "ehat/organdonor/getAllDonorsList",
		data : str + "&reqType=AJAX",
	//	timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllDonorsList(r, "All");
		}
	});
}

function setAllDonorsList(r, CallFrom) {

	var htm = "";
	var index = 1;
	if (CallFrom == "All") {
		for ( var i = 0; i < r.listOrganDonationRegistrationDto.length; i++) {
			
			var datetime =new Date(r.listOrganDonationRegistrationDto[i].createdDate).toLocaleString('en-GB');
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganDonationRegistrationDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganDonationRegistrationDto[i].prefix +" "+ r.listOrganDonationRegistrationDto[i].firstName +" "+ r.listOrganDonationRegistrationDto[i].middleName +" "+ r.listOrganDonationRegistrationDto[i].lastName 
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganDonationRegistrationDto[i].donorType
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganDonationRegistrationDto[i].donateOrganName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					//+ getDateWithTime(r.listOrganDonationRegistrationDto[i].createdDate)
					+ datetime
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editOrganDonor('
					+ r.listOrganDonationRegistrationDto[i].id
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganDonor('
					+ r.listOrganDonationRegistrationDto[i].id
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					+ '</tr>';
			index++;
		}
	} else if (CallFrom == "search") {
		var datetime =new Date(r.createdDate).toLocaleString('en-GB');
		htm = htm
		+ '<tr> '
		+ ' <td class="col-md-1 center">'
		+ index
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.id
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.prefix +" "+ r.firstName +" "+ r.middleName +" "+ r.lastName 
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.donorType
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.donateOrganName
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		//+ getDateWithTime(r.createdDate)
		+ datetime
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-success" onclick=editOrganDonor('
		+ r.id
		+ ')><i class="fa fa-edit"></i></button></td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-danger" onclick=deleteDonor('
		+ r.id
		+ ')><i class="fa fa-trash-o"></i></button></td>'
		+ '</tr>';
		index++;
	}
	$("#organDonorsListDetails").html(htm);
}

function getAllDonorsTreatmentList(){
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
		url : "ehat/organdonor/getAllDonorsTreatmentList",
		data : str + "&reqType=AJAX",
//		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllDonorsTreatmentList(r, "All");
		}
	});
}

function setAllDonorsTreatmentList(r, CallFrom) {
	
	var htm = "";
	var index = 1;
	if (CallFrom == "All") {
		for ( var i = 0; i < r.listOrganDonorTreatmentDto.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganDonorTreatmentDto[i].organDonorTreatmentId
					+ '</td>'
				/*	+ ' <td class="col-md-1 center">'
					+ r.listOrganDonorTreatmentDto[i].organDonationRegistrationDto.id
					+ '</td>'*/
					
					+ ' <td class="col-md-1 center">'
					+ r.listOrganDonorTreatmentDto[i].donorId
					+ '</td>'
					
					/*+ ' <td class="col-md-1 center">'
					+ r.listOrganDonorTreatmentDto[i].organDonationRegistrationDto.prefix +" "+ r.listOrganDonorTreatmentDto[i].organDonationRegistrationDto.firstName +" "+ r.listOrganDonorTreatmentDto[i].organDonationRegistrationDto.middleName +" "+ r.listOrganDonorTreatmentDto[i].organDonationRegistrationDto.lastName 
					+ '</td>'*/
					
					+ ' <td class="col-md-1 center">'
					+ r.listOrganDonorTreatmentDto[i].prefix +" "+ r.listOrganDonorTreatmentDto[i].firstName +" "+ r.listOrganDonorTreatmentDto[i].middleName +" "+ r.listOrganDonorTreatmentDto[i].lastName 
					+ '</td>'
					
				/*	+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editOrganDonorTreatment('
					+ r.listOrganDonorTreatmentDto[i].organDonationRegistrationDto.id+","+r.listOrganDonorTreatmentDto[i].organDonorTreatmentId
					+ ')><i class="fa fa-edit"></i></button></td>'*/
					
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editOrganDonorTreatment('
					+ r.listOrganDonorTreatmentDto[i].donorId+","+r.listOrganDonorTreatmentDto[i].organDonorTreatmentId
					+ ')><i class="fa fa-edit"></i></button></td>'
					
					
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganDonorTreatment('
					+ r.listOrganDonorTreatmentDto[i].organDonorTreatmentId	
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					
					
					
					if(r.listOrganDonorTreatmentDto[i].isCheckup =="Y" ){
						/*htm = htm	 + ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-info"  disabled  onclick=sendDonorToCheckupList('
						+ r.listOrganDonorTreatmentDto[i].organDonationRegistrationDto.id+","+r.listOrganDonorTreatmentDto[i].organDonationRegistrationDto.patientId+","+r.listOrganDonorTreatmentDto[i].organDonorTreatmentId
						+ ')><i class="fa fa-cloud-upload"></i></button></td>'*/
						
						
						htm = htm	 + ' <td class="col-md-1 center">'
				//		+ '	<button class="btn btn-xs btn-info"  disabled  onclick=sendDonorToCheckupList('
					+ '	<button class="btn btn-xs btn-info"   onclick=sendDonorToCheckupList('
						+ r.listOrganDonorTreatmentDto[i].donorId+","+r.listOrganDonorTreatmentDto[i].patientId+","+r.listOrganDonorTreatmentDto[i].organDonorTreatmentId
						+ ')><i class="fa fa-cloud-upload"></i></button></td>'
						
					}else{
						htm = htm	 + ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-info" onclick=sendDonorToCheckupList('
						+ r.listOrganDonorTreatmentDto[i].donorId+","+r.listOrganDonorTreatmentDto[i].patientId+","+r.listOrganDonorTreatmentDto[i].organDonorTreatmentId
						+ ')><i class="fa fa-cloud-upload"></i></button></td>'
					}
					
			htm = htm
					+ '</tr>';
			index++;
		}
	}
	$("#organDonorsTreatmentListDetails").html(htm);
}


function deleteOrganDonor(donorId){
	
	if(donorId !=undefined && donorId!=null && donorId!="" && donorId!="null"){
		var r = confirm("Are You Sure You Want To Delete Donor Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/organdonor/deleteOrganDonor",
				data : {
					"donorId" : donorId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllDonorsList();
				}
			});
		}
	}
}

function editOrganDonor(donorId){
	
	
	
	if(donorId !=undefined && donorId!=null && donorId!="" && donorId!="null"){
		var inputs = [];
		inputs.push('id=' + donorId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/organdonor/editOrganDonor",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				toggleRegDiv();
				$("#donor_menu_new").attr("checked","checked");
				$('#donorRegId').val(r.id);
				//$("#patientId").val(r.patientRegistered.patientId);
				$("#patientId").val(r.patientId);
				$("#donorType").val(r.donorTypeId);
				var intendToDonate = r.intendToDonate;
				if(intendToDonate == "N"){
					$("#radioIntendNow").attr("checked","checked");
				}else if(intendToDonate == "A"){
					$("#radioIntendAfterDeath").attr("checked","checked");
				}
				
				$("#prefix").val(r.prefix);
				$("#firstName").val(r.firstName);
				$("#middleName").val(r.middleName);
				$("#lastName").val(r.lastName);
				$("#birthDate").val(r.birthDate);
				
				$("#address").val(r.address);
				$("#city").val(r.cityId);
				$("#district").val(r.districtId);
				$("#state").val(r.stateId);
				
				$("#occupation").val(r.occupation);
				$("#contactNo1").val(r.contactNo1);
				$("#contactNo2").val(r.contactNo2);
				$("#age").val(r.age);
				
				var gender = r.gender;
				if(gender == "M"){
					$("#maleG").attr("checked","checked");
				}else if(gender == "F"){
					$("#femaleG").attr("checked","checked");
				}else if(gender == "O"){
					$("#otherG").attr("checked","checked");
				}
				$("#identityCard").val(r.identityCard);
				$("#body_type").select2("val",r.bodyType);
				$("#bloodGroupId").val(r.bloodGroupId);
				$("#bodySize").val(r.bodySize);
				//$("#intendToDonateOrganId").val(r.intendToDonateOrganId);
				var organArray = r.intendToDonateOrganId;
				var array = organArray.split(',');
				$.each(array, function(index, item) {
					$("#select_organ_donor_name_id").select2("val", $("#select_organ_donor_name_id").select2("val").concat(item));
				});
				$("#Remarks").val(r.remarks);
				$("#proofId").val(r.proofId);
				
				$("#treatmentDiv").show();
			}
		});
	}
	
}

function editOrganDonorTreatment(donorId,treatmentId){
	if(donorId !=undefined && donorId!=null && donorId!="" && donorId!="null"){
		var inputs = [];
		inputs.push('organTreatId=' + treatmentId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/organdonor/editOrganDonorTreatment",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				toggleRegDiv();
				$("#donor_menu_existing").attr("checked","checked");
				$('#donorRegId').val(donorId);
				$('#treatmentId').val(treatmentId);
				$("#donorType").val(r.donorTypeId);
				
				var intendToDonate = r.intendToDonate;
				if(intendToDonate == "N"){
					$("#radioIntendNow").attr("checked","checked");
				}else if(intendToDonate == "A"){
					$("#radioIntendAfterDeath").attr("checked","checked");
				}
				
				$("#prefix").val(r.organDonationRegistrationDto.prefix);
				$("#firstName").val(r.organDonationRegistrationDto.firstName);
				$("#middleName").val(r.organDonationRegistrationDto.middleName);
				$("#lastName").val(r.organDonationRegistrationDto.lastName);
				$("#birthDate").val(r.organDonationRegistrationDto.birthDate);
				
				$("#address").val(r.organDonationRegistrationDto.address);
				$("#city").val(r.organDonationRegistrationDto.cityId);
				$("#district").val(r.organDonationRegistrationDto.districtId);
				$("#state").val(r.organDonationRegistrationDto.stateId);
				
				$("#occupation").val(r.organDonationRegistrationDto.occupation);
				$("#contactNo1").val(r.organDonationRegistrationDto.contactNo1);
				$("#contactNo2").val(r.organDonationRegistrationDto.contactNo2);
				$("#age").val(r.organDonationRegistrationDto.age);
				
				var gender = r.organDonationRegistrationDto.gender;
				if(gender == "M"){
					$("#maleG").attr("checked","checked");
				}else if(gender == "F"){
					$("#femaleG").attr("checked","checked");
				}else if(gender == "O"){
					$("#otherG").attr("checked","checked");
				}
				
				
				$("#identityCard").val(r.organDonationRegistrationDto.identityCard);
				$("#body_type").select2("val",r.organDonationRegistrationDto.bodyType);
				$("#bloodGroupId").val(r.organDonationRegistrationDto.bloodGroupId);
				$("#bodySize").val(r.organDonationRegistrationDto.bodySize);
				//$("#Remarks").val(r.organDonationRegistrationDto.remarks);
				$("#Remarks").val(r.remark);
				//$("#patientId").val(r.patientRegistered.patientId);
				$("#patientId").val(r.organDonationRegistrationDto.patientId);
				var organArray = r.intendToDonateOrganId;
				
				
				var array = organArray.split(',');
				
				
				
				$("#select_organ_donor_name_id").select2("val",array);
				
				$.each(array, function(index, item) {
				//	$("#select_organ_donor_name_id").select2("val", $("#select_organ_donor_name_id").select2("val").concat(item));
				});
				 
				$("#proofId").val(r.organDonationRegistrationDto.proofId);
				$("#treatmentDiv").show();
			}
		});
	}
}

function deleteOrganDonorTreatment(donorTreatmentId){
	
	if(donorTreatmentId !=undefined && donorTreatmentId!=null && donorTreatmentId!="" && donorTreatmentId!="null"){
		var r = confirm("Are You Sure You Want To Delete Donor Details ? ");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/organdonor/deleteOrganDonorTreatment",
				data : {
					"donorTreatmentId" : donorTreatmentId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllDonorsTreatmentList();
				}
			});
		}
	}
	
}

// by aniket, 18 JAN 22
function sendDonorToCheckupListOld(donorId,patientId){
	window.location.href = "odt_organ_donor_checkup_list.jsp?" + "donorId=" + encodeURIComponent(donorId)+ "&patientId=" + encodeURIComponent(patientId);
	//window.location.href = "odt_organ_donor_checkup_list.jsp?" + "donorId=" + encodeURIComponent(donorId);
}

function sendDonorToCheckupList(donorId,patientId,treatmentId){
	window.location.href = "odt_organ_donor_checkup_list.jsp?" + "donorId=" + encodeURIComponent(donorId)+ "&patientId=" + encodeURIComponent(patientId)+ "&treatmentId=" + encodeURIComponent(treatmentId);
	//window.location.href = "odt_organ_donor_checkup_list.jsp?" + "donorId=" + encodeURIComponent(donorId);
}


// start code for existring patient search:: aniket 9 DEC 21

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

function setAutoPatientNameOrganDonor(inputID,callFrom) {
	
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
		//	url : "ehat/markvisit/autoSuggestionMarkVisit1",
		url : "ehat/organdonor/searchPatientByStoredProcedure",
			//url : "ehat/organdonor/searchPatientByStoredProcedurefor_organDonor",
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
			var patMobile = res[2];
			
			$("#" + inputID).val(patName);	
			$("#" + inputID).val(patMobile);	
				
				if(callFrom == "reg"){
					setSearchedPatientDetailsForDonorRegistration(patId);
				}
			}	
		
	}				// END-----------------------
	
		
}

function setSearchedPatientDetailsForDonorRegistration(patId){
	
	jQuery.ajax({
		async 	: false,
		type 	: "POST",
		data 	: {
		 "ptid" : patId,
 			},
		url 	: "ehat/markvisit/getPatientDetails",
		timeout : 1000 * 60 * 5,
		cache 	: false,
		error 	: function() {
			alert('Error fetching patient information !');
		},
		success : function(r) {
   			setPatientDetailsDonorReg(r);
		}
	});
	
}

function setPatientDetailsDonorReg(r){
	
//	alert(JSON.stringify(r));
	
	$('#patientId').val(r.lstMarkVisit[0].ptId);
	
//	alert("setPatientDetailsDonorReg patientID--: " + r.lstMarkVisit[0].ptId);
	
	$('#prefix').val(r.lstMarkVisit[0].prefix);
	$('#firstName').val(r.lstMarkVisit[0].fName);
	$('#middleName').val(r.lstMarkVisit[0].mName);
	$('#lastName').val(r.lstMarkVisit[0].lName);
	$('#birthDate').val(r.lstMarkVisit[0].dob);
	
	$('#address').val(r.lstMarkVisit[0].address);
	$('#city').val(r.lstMarkVisit[0].twnId);
	$('#district').val(r.lstMarkVisit[0].districtId);
	$('#state').val(r.lstMarkVisit[0].stateId);
	
	$('#occupation').val(r.lstMarkVisit[0].occupation);
	$('#contactNo1').val(r.lstMarkVisit[0].mobile);
	$('#age').val(r.lstMarkVisit[0].age);
	
	var gender = r.lstMarkVisit[0].gender;
	if (gender == "Male") {
		$("#maleG").attr("checked", "checked");
	} else if (gender == "Female") {
		$("#femaleG").attr("checked", "checked");
	} else if (gender == "Other") {
		$("#otherG").attr("checked", "checked");
	}
	
	
	
	$('#bloodGroupId').val(r.lstMarkVisit[0].bloodGroupId);
	
}


function clearDonorForm(){
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


function searchDonorByName(value,callfrom){
	var resultData = [];
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/searchDonorByName",
		data :{
			searchName : value
		},
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			var template = "";
			for ( var j = 0; j < r.length; j++) {
				var donorName=r[j].title+". "+r[j].donorFname+" "+r[j].donorLname;
				var arrValue = r[j].donorId +"-"+donorName+"-"+r[j].contactNumber1;
				var donorId = r[j].donorId;
				var donorFname = r[j].donorFname;
				resultData.push({
					ID : donorId,
					Name : arrValue
				});
				template = template + '<li data-value="' + donorId + '" class=""><a href="#">' + arrValue + '</a></li>';
			}
			
			setTimeout(function() {
				$("#divtext_search_name .typeahead").html(template);
				$("#divtext_search_name .typeahead").show();
				
				$("#text_search_name").typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("#text_search_name").data('typeahead').source = resultData;
			}, 500);
		}
	});
	function displayResult(item) {
		var res = item.text.split('-');
		var id = res[0];
		var name = res[1];
		$("#text_search_name").val(name);	
		getDonorById(id,callfrom);
	}
}


function getDonorById(id,callfrom){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/getDonorById",
		data : {
			id : id
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			
			if(r!=null){
				if(callfrom=='reg'){
					$('#donorId').val(r.donorId);
					$('#title').val(r.title);
					$('#title').attr('disabled', 'disabled');
					$('#txt_first_name').val(r.donorFname);
					$('#txt_first_name').attr('disabled', 'disabled');
					$('#txt_middle_name').val(r.donorMname);
					$('#txt_middle_name').attr('disabled', 'disabled');
					$('#txt_last_name').val(r.donorLname);
					$('#txt_last_name').attr('disabled', 'disabled');
					$('#txt_birth_date').val(r.birthDate);
					$('#txt_birth_date').attr('disabled', 'disabled');
					$('#ta_address').val(r.address);
					$('#ta_address').attr('disabled', 'disabled');
					$('#txt_occupation').val(r.occupation);
					$('#txt_occupation').attr('disabled', 'disabled');
					$('#txt_contact1').val(r.contactNumber1);
					$('#txt_contact1').attr('disabled', 'disabled');
					$('#txt_contact2').val(r.contactNumber2);
					$('#txt_contact2').attr('disabled', 'disabled');
					$('#txt_age').val(r.age);
					$('#txt_age').attr('disabled', 'disabled');
					$('#txt_blood_group').val(r.bloodGroup);
					$('#txt_blood_group').attr('disabled', 'disabled');
					$("input:radio[name='ra_gender'][value='"+r.gender+"']").prop("checked",true);			
					$("input:radio[name='ra_gender']").attr('disabled', 'disabled');
					
					$('#user_title').val(r.title);
					$('#user_title').attr('disabled', 'disabled');
					$('#donor_first_name').val(r.donorFname);
					$('#donor_first_name').attr('disabled', 'disabled');
					$('#donor_middle_name').val(r.donorMname);
					$('#donor_middle_name').attr('disabled', 'disabled');
					$('#donor_last_name').val(r.donorLname);
					$('#donor_last_name').attr('disabled', 'disabled');
					$('#blood_user_title').val(r.title);
					$('#blood_user_title').attr('disabled', 'disabled');
					$('#blood_first_name').val(r.donorFname);
					$('#blood_first_name').attr('disabled', 'disabled');
					$('#blood_middle_name').val(r.donorMname);
					$('#blood_middle_name').attr('disabled', 'disabled');
					$('#blood_last_name').val(r.donorLname);
					$('#blood_last_name').attr('disabled', 'disabled');
					$('#donorTreatmentId').val(r.maxDonorTreatmentId);

				}else if(callfrom=='reaction'){
					$('#donorId').val(r.donorId);
					$('#title').val(r.title);
					$('#title').attr('disabled', 'disabled');
					$('#txt_first_name').val(r.donorFname);
					$('#txt_first_name').attr('disabled', 'disabled');
					$('#txt_middle_name').val(r.donorMname);
					$('#txt_middle_name').attr('disabled', 'disabled');
					$('#txt_last_name').val(r.donorLname);
					$('#txt_last_name').attr('disabled', 'disabled');
					$('#donorTreatmentId').val(r.maxDonorTreatmentId);
					getCheckUpListByTreatmentId('reaction');
				}
			}
	
		}
	});
}

function getCheckUpListByTreatmentId(callfrom){
	var donorTreatmentId=$("#donorTreatmentId").val();
	if(donorTreatmentId==0){
		return false;
	}
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/getCheckUpByTreatmentId",
		data : {
			id : donorTreatmentId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r!=null){
				if(callfrom=='reaction'){
					document.getElementById('la_weight').innerText=r.donorWeight+" Kg";
					document.getElementById('la_height').innerText=r.donorHeight+" Cm";
					document.getElementById('la_haemoglobin').innerText=r.donorHemoglobin;
					document.getElementById('la_temprature').innerText=r.donorTemprature;
				}else if(callfrom=='testregister'){
					document.getElementById('la_weight').innerText=r.donorWeight+" Kg";
					document.getElementById('la_height').innerText=r.donorHeight+" Cm";
					document.getElementById('la_haemoglobin').innerText=r.donorHemoglobin;
					document.getElementById('la_temprature').innerText=r.donorTemprature;
				}
			}
		}
	});
}


function saveDonorReaction(){
	
	var ra_pain=$("input:radio[name=ra_pain]:checked").val();
	if(ra_pain==""){
		alert("Select pain");
		return false;
	}
	
	
	var ra_allergy_reaction=$("input:radio[name=ra_allergy_reaction]:checked").val();
	if(ra_allergy_reaction==""){
		alert("Select allergy reaction");
		return false;
	}

	
	var ra_outcome=$("input:radio[name=ra_outcome]:checked").val();
	if(ra_outcome==""){
		alert("Select outcome");
		return false;
	}

	var ta_remarks=$("#ta_remarks").val();
	var sel_type_of_blood_bag=$("#sel_type_of_blood_bag").val();
	var donorTreatmentId=$("#donorTreatmentId").val();
	
	var inputs = [];	
	inputs.push('donorReactionId= 0');
	inputs.push('donorTreatmentId=' + donorTreatmentId);
	inputs.push('sel_type_of_blood_bag=' + sel_type_of_blood_bag);
	inputs.push('remark=' + ta_remarks);
	inputs.push('outcome=' + ra_outcome);
	inputs.push('pain=' + ra_pain);
	inputs.push('allergyReaction=' + ra_allergy_reaction);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/donor/saveDonorReaction",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Donor Reaction Saved Sucessfully");
				clearDonorForm();
			}
			else if (data == 2) {
				alertify.success( "Donor Reaction Updated Sucessfully");				
			}
		}
	});	
}

function getDetailsByBloodBag(value){
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/getDetailsByBloodBag",
		data : {
			bloodBagId : value
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
				if(r!=0){
					document.getElementById('la_typebloodBag').innerText=" "+r.typeOfBloodBag;
					document.getElementById('la_bloodBagNo').innerText=" "+r.bloodBagDetails;
					document.getElementById('la_bloodGroup').innerText=" "+r.donorTreatment.donorMaster.bloodGroup;
					document.getElementById('la_bloodItemNo').innerText=" "+r.bloodItemName;
					document.getElementById('la_volumeCollection').innerText=" "+r.volumeOfCollection+" ml";
					document.getElementById('la_remarks').innerText=" "+r.bloodBagDetailsRemarks;

				}
			}
		});
}

function getDonorDetails(){
	var donorTreatmentId=$("#donorTreatmentId").val();
	if(donorTreatmentId==0){
		return false;
	}
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/getCheckUpByTreatmentId",
		data : {
			id : donorTreatmentId
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r!=null){
					document.getElementById('la_weight').innerText=r.donorWeight+" Kg";
					document.getElementById('la_height').innerText=r.donorHeight+" Cm";
					document.getElementById('la_haemoglobin').innerText=r.donorHemoglobin;
					document.getElementById('la_temprature').innerText=r.donorTemprature;
			}
		}
	});
}

function saveTestRegister(){
	var sel_bloodBagNumber=$("#sel_bloodBagNumber").val();
	if(sel_bloodBagNumber==0){
		alert("Select blood Bag");
		return false;
	}
	
	var donorTreatmentId=$("#donorTreatmentId").val();
	if(donorTreatmentId==0){
		alert("Select blood Bag");
		return false;
	}

	var date_of_bag_collection=$("#date_of_bag_collection").val();
	if(date_of_bag_collection==""){
		alert("Select collection date");
		return false;
	}
	
	//var sel_component_seperation=$("#sel_component_seperation").val();
	
	var resultTestA=$("#sel_test_result_testA").val();
	var date_result_testA=$("#date_time_result_testA").val();
	var reamrk_testA=$("#reamrk_testA").val();
	var identificationTestAntibody=$("#sel_test_result_identificationTestAntibody").val();
	var date_identificationTestAntibody=$("#inward_date_time_identificationTestAntibody").val();
	var reamrk_identificationTestAntibody=$("#reamrk_identificationTestAntibody").val();
	var identificationBlood=$("#sel_test_result_identificationBlood").val();
	var date_identificationBlood=$("#inward_date_time_identificationBlood").val();
	var reamrk_identificationBlood=$("#reamrk_identificationBlood").val();
	var remarks_test_register=$("#remarks_test_register").val();
	
	var inputs = [];	
	inputs.push('testRegisterId=0');
	inputs.push('bloodBagNumber=' + sel_bloodBagNumber);
	inputs.push('donorTreatmentId=' + donorTreatmentId);
	inputs.push('dateOfBagCollection=' + date_of_bag_collection);
	//inputs.push('section=' + sel_component_seperation);
	inputs.push('resultTestA=' + resultTestA);
	inputs.push('dateTestA=' + date_time_result_testA);
	inputs.push('remarkTestA=' + reamrk_testA);
	inputs.push('resultIdentificationTestAntibody=' + identificationTestAntibody);
	inputs.push('dateIdentificationTestAntibody=' + date_identificationTestAntibody);
	inputs.push('remarkIdentificationTestAntibody=' + reamrk_identificationTestAntibody);
	inputs.push('resultIdentificationBlood=' + identificationBlood);
	inputs.push('remarkIdentificationBlood=' + reamrk_identificationBlood);
	inputs.push('dateIdentificationBlood=' + date_identificationBlood);
	inputs.push('remark=' + remarks_test_register);
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/donor/saveTestRegister",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Test Register Saved Sucessfully");
				clearDonorForm();
			}
			else if (data == 2) {
				alertify.success( "Test Register Updated Sucessfully");				
			}
		}
	});	
}

function saveComponentSeperation(){
	/*var sel_bloodBagNumber=$("#sel_bloodBagNumber").val();
	if(sel_bloodBagNumber==0){
		alert("Select blood Bag");
		return false;
	}
	
	var donorTreatmentId=$("#donorTreatmentId").val();
	if(donorTreatmentId==0){
		alert("Select blood Bag");
		return false;
	}

	var date_of_bag_collection=$("#date_of_bag_collection").val();
	if(date_of_bag_collection==""){
		alert("Select collection date");
		return false;
	}
	
	var plasma_volume=$("#plasma_volume").val();
	var plasma_expiry_date=$("#plasma_expiry_date").val();
	var plasma_reamrk=$("#plasma_reamrk").val();
	var ffp_volume=$("#ffp_volume").val();
	var ffp_expiry_date=$("#ffp_expiry_date").val();
	var ffp_reamrk=$("#ffp_reamrk").val();
	var rcell_volume=$("#rcell_volume").val();
	var rcell_expiry_date=$("#rcell_expiry_date").val();
	var rcell_reamrk=$("#rcell_reamrk").val();
	var remarks=$("#remarks_component_seperation").val();*/

	var listObj = {
			lstComponentseperation : []
		};
	
	 var table = document.getElementById("componentSepreationDetails");
     var rows = table.getElementsByTagName("tr").length;
     
     for ( var i = 1; i <= rows; i++) {
    	 var sel_bloodBagNumber=$("#sel_bloodBagNumber").val();
    	 if(sel_bloodBagNumber==0){
    			alert("Select blood Bag");
    			return false;
    		}
          var donor_treatment_id=$("#donorTreatmentId").val(); 
          if(donorTreatmentId==0){
      		alert("Select blood Bag");
      		return false;
      	}
          
          var compremarks=$("#remarks_component_seperation").val();
          var componentSeperationId=$("#ComponentSeperationId").val();
          var date_of_bag_collection=$("#date_of_bag_collection").val();
      		if(date_of_bag_collection==""){
      		alert("Select collection date");
      		return false;
      		}
          var test_name =$("#testname" +i).text();
          var volume = $("#plasma_volume" + i).val();
          var date = $("#plasma_expiry_date" +i).val();  
          var remark = $("#plasma_reamrk" +i).val();
         
			setlistObj(listObj,sel_bloodBagNumber,donor_treatment_id,compremarks,componentSeperationId,date_of_bag_collection,test_name,volume,date,remark);				
		}
    
     listObj = JSON.stringify(listObj);

	var inputs = [];	
	inputs.push("listObj="+ encodeURIComponent(listObj));
	/*inputs.push('bloodBagNumber=' + sel_bloodBagNumber);
	inputs.push('donorTreatmentId=' + donorTreatmentId);
	inputs.push('dateOfBagCollection=' + date_of_bag_collection);

	inputs.push('plasmaVolume=' + plasma_volume);
	inputs.push('plasmaExpiryDate=' + plasma_expiry_date);
	inputs.push('plasmaRemark=' + plasma_reamrk);
	inputs.push('ffpVolume=' + ffp_volume);
	inputs.push('ffpExpiryDate=' + ffp_expiry_date);
	inputs.push('ffpRemark=' + ffp_reamrk);
	inputs.push('rCellVolume=' + rcell_volume);
	inputs.push('rCellExpiryDate=' + rcell_expiry_date);*/
	/*inputs.push('rCellRemark=' + rcell_reamrk);
	inputs.push('componentSeperationRemark=' + remarks);*/
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/donor/saveComponentSeperation",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Component Seperation Saved Sucessfully");
				clearDonorForm();
			}
			else if (data == 2) {
				alertify.success("Component Seperation Updated Sucessfully");				
			}
		}
	});	
}

function setlistObj(listObj,sel_bloodBagNumber,donor_treatment_id,compremarks,componentSeperationId,date_of_bag_collection,test_name,volume,date,remark){
	listObj.lstComponentseperation.push({
		bloodBagNumber : sel_bloodBagNumber,
		donorTreatmentId :donor_treatment_id,
		componentSeperationRemark : compremarks,
		componentSeperationId : componentSeperationId,
		dateOfBagCollection : date_of_bag_collection,
		componentName : test_name,
		volume : volume,
		expiryDate : date,
		componentRemark :remark
		
	});
}

function getBloodBagInComponent(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/donor/getBloodBagsInComponent",
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r.length > 0){
				var divContent = "";
		        divContent = divContent + "<select><option value='0'>--Select Blood Bag--</option>";
		         for ( var i = 0; i < r.length; i++) {          
		        	 divContent = divContent + "<option value='"+r[i].bloodBagNumber+"'>"+ r[i].bagDetails + "</option>";
		            }
		        divContent = divContent + "</select>";
		            $("#sel_bloodBagNumber").html(divContent);
		            $("#sel_bloodBagNumber").html(divContent);
			}
		}
		
	});

}

function getBloodBagInStock(){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/donor/getBloodBagsInStocks",
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r.length > 0){
				var divContent = "";
		        divContent = divContent + "<select><option value='0'>--Select Blood Bag--</option>";
		         for ( var i = 0; i < r.length; i++) {          
		        	 divContent = divContent + "<option value='"+r[i].bloodBagNumber+"'>"+ r[i].bagDetails + "</option>";
		            }
		        divContent = divContent + "</select>";
		            $("#sel_bloodBagNumber").html(divContent);
		            $("#sel_bloodBagNumber").html(divContent);
			}
					
		}
		
	});
	
}

function getDonorInfoByBloodBag(callfrom){
	var sel_bloodBagNumber=$("#sel_bloodBagNumber").val();
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/getDonorByBloodBagId",
		data : {
			bloodBagId : sel_bloodBagNumber
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r!=0){
				$('#donorId').val(r.donorId);
				$('#title').val(r.title);
				$('#title').attr('disabled', 'disabled');
				$('#txt_first_name').val(r.donorFname);
				$('#txt_first_name').attr('disabled', 'disabled');
				$('#txt_middle_name').val(r.donorMname);
				$('#txt_middle_name').attr('disabled', 'disabled');
				$('#txt_last_name').val(r.donorLname);
				$('#txt_last_name').attr('disabled', 'disabled');
				$('#donorTreatmentId').val(r.maxDonorTreatmentId);
				$('#txt_blood_group').val(r.bloodGroup);
				$('#txt_blood_group').attr('disabled', 'disabled');
				getDonorDetails();
				getComponentSeprationById(callfrom);
				
			}
		}
	});
}



function getComponentSeprationById(callfrom){
	var sel_bloodBagNumber=$("#sel_bloodBagNumber").val();

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor/getComponentByBloodBagId",
		data : {
			bloodBagId : sel_bloodBagNumber,
			callfrom : callfrom
		},
		cache : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(r) {
			if(r!= 0){
				
			     var rowCount=0;
					var divContent = "";
					total = 0;
					
					divContent = divContent
							+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";

					for ( var i = 0; i < r.length; i++) {
						//$("#componentSeperateId").val(r[i].componentSeperationId);
						rowCount++;
							divContent = divContent + "<tr><input type='hidden'   id='componentSeperateId" + rowCount + "' value='"
							+ r[i].componentSeperationId + "' ><td>" +r[i].componentName+ "</td><td>"
							+ r[i].volume + "</td><td><input type='date' class='form-control' id='inward_date"+rowCount+"'>"
							+ "</td><td>" + r[i].expiryDate + "</td><td><textarea class='form-control' name='reamrk' id='stockComponent_reamrk"+rowCount+"' rows='5'></textarea></td></tr>";
						
					}

					$("#stockDetails").html(divContent);
				/*$("#componentSeperateId").val(r.componentSeperationId);
				$("#plasma_volume").val(r.plasmaVolume);
				$("#plasma_expiry_date").val(r.plasmaExpiryDate);
				$("#plasma_reamrk").val(r.plasmaRemark);
				$("#ffp_volume").val(r.ffpVolume);
				$("#ffp_expiry_date").val(r.ffpExpiryDate);
				$("#ffp_reamrk").val(r.ffpRemark);
				$("#rcell_volume").val(r.rCellVolume);
				$("#rcell_expiry_date").val(r.rCellExpiryDate);
				$("#rcell_reamrk").val(r.rCellRemark);*/
				if(callfrom=='discard'){
					  var rowCount=0;
						var divContent = "";
						total = 0;
						
						divContent = divContent
								+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";

						for ( var i = 0; i < r.length; i++) {
							//$("#componentSeperateId").val(r[i].componentSeperationId);
							rowCount++;
								divContent = divContent + "<tr><input type='hidden'   id='componentSeperateId" + rowCount + "' value='"
								+ r[i].componentSeperationId + "' ><td>" +r[i].componentName+ "</td><td>"
								+ r[i].volume + "</td><td><input type='date' class='form-control' value='"+r[i].inwardDate+"' readonly='readonly'>"
						//		+ "</td><td>" + r[i].expiryDate + "</td><td><input type='date' class='form-control' id='discard_date"+rowCount+"'></td><td><textarea class='form-control' name='reamrk' id='discardReason"+rowCount+"' rows='5'></textarea></td>" +
								+ "</td><td>" + r[i].expiryDate + "</td><td><input type='date' class='form-control' id='discard_date"+rowCount+"'></td><td><select class='form-select' id='discardReason"+rowCount+"'></select></td>" +
										"<td><select class='form-select' id='discard_by"+rowCount+"'><option value='0'>Select</option></select></td></tr>";
							
								getDiscardReasons(rowCount); //aniket kanse 27 MAY 21
						}

						$("#discardDetails").html(divContent);
					/*$("#plasma_inward_date").val(r.plasmaInwardDate);
					$("#ffp_inward_date").val(r.ffpInwardDate);
					$("#rcell_inward_date").val(r.rcellInwardDate);
					
					$("#plasma_checkbox").val(r.componentSeperationId);
					$("#ffp_checkbox").val(r.componentSeperationId);
					$("#rcell_checkbox").val(r.componentSeperationId);*/
					
				}
			}
		}
	});
}

//aniket kanse 27 MAY 21
function getDiscardReasons(count){
	// alert("count :: " + count);
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/getAllDiscardReasons",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setDiscardReasons(r,count);
		}
	});
}

function setDiscardReasons(r,count){
var list = "<option value=0 class='un'>SELECT</option>";
	
    for ( var i = 0; i < r.listDiscardReason.length; i++) {  

        list = list + "<option value='"+r.listDiscardReason[i].discardReasonId+"' class='un'>" + (r.listDiscardReason[i].reasonName) + "</option>";    
    }  
   // list = list + "<option value='-1' class='un'></option>";  
    $("#discardReason"+count).html(list);
}

function saveStockRegister(){
	/*var componentSeperateId=$("#componentSeperateId").val();
	if(componentSeperateId==0){
		return false;
	}

	var sel_bloodBagNumber=$("#sel_bloodBagNumber").val();
	if(sel_bloodBagNumber==0){
		alert("Select blood Bag");
		return false;
	}
	
	var donorTreatmentId=$("#donorTreatmentId").val();
	if(donorTreatmentId==0){
		alert("Select blood Bag");
		return false;
	}

	var date_of_bag_collection=$("#date_of_bag_collection").val();
	if(date_of_bag_collection==""){
		alert("Select collection date");
		return false;
	}
	
	var plasma_inward_date=$("#plasma_inward_date").val();
	var ffp_inward_date=$("#ffp_inward_date").val();
	var rcell_inward_date=$("#rcell_inward_date").val();
	var stock_reamrk=$("#stock_remark").val();*/
	
	var listStockObj = {
			lstStockRegister : []
		};
	
	 var table = document.getElementById("stockDetails");
     var rows = table.getElementsByTagName("tr").length;
     
     for ( var i = 1; i <= rows; i++) {
    	 var sel_bloodBagNumber=$("#sel_bloodBagNumber").val();
    	 if(sel_bloodBagNumber==0){
    			alert("Select blood Bag");
    			return false;
    		}
          var donor_treatment_id=$("#donorTreatmentId").val(); 
          if(donorTreatmentId==0){
      		alert("Select blood Bag");
      		return false;
      	}
         var componentSeperateId=$("#componentSeperateId" +i).val();
      	if(componentSeperateId==0){
      		return false;
      	}
      	 var stockId=$("#stockId").val();
      	 var date_of_bag_collection=$("#date_of_bag_collection").val();
   		if(date_of_bag_collection==""){
   		alert("Select collection date");
   		return false;
   		}
   		var remark = $("#stock_remark").val();
          var date = $("#inward_date" +i).val();  
          var Compremark = $("#stockComponent_reamrk" +i).val();
         
			setlistStockObj(listStockObj,sel_bloodBagNumber,donor_treatment_id,componentSeperateId,date_of_bag_collection,remark,date,Compremark,stockId);				
		}
    
     listStockObj = JSON.stringify(listStockObj);

	var inputs = [];
	inputs.push("listStockObj="+ encodeURIComponent(listStockObj));
	/*inputs.push('componentSeperationId='+componentSeperateId);
	inputs.push('bloodBagNumber=' + sel_bloodBagNumber);
	inputs.push('donorTreatmentId=' + donorTreatmentId);
	inputs.push('dateOfStockRegister=' + date_of_bag_collection);
	inputs.push('plasmaInwardDate=' + plasma_inward_date);
	inputs.push('ffpInwardDate=' + ffp_inward_date);
	inputs.push('rcellInwardDate=' + rcell_inward_date);
	inputs.push('stockRegisterRemark=' + stock_reamrk);*/

	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/donor/saveStock",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Stock Saved Sucessfully");
				clearDonorForm();
			}
			else if (data == 2) {
				alertify.success("Stock Updated Sucessfully");				
			}
		}
	});	
	
}

function setlistStockObj(listStockObj,sel_bloodBagNumber,donor_treatment_id,componentSeperateId,date_of_bag_collection,remark,date,Compremark,stockId){
	listStockObj.lstStockRegister.push({
		bagId : sel_bloodBagNumber,
		donorTreatmentId :donor_treatment_id,
		compSepId : componentSeperateId,
		dateOfBagCollection : date_of_bag_collection,
		inwardDate : date,
		stock_remark : remark,
		compReamrk : Compremark,
		stockId : stockId
	});
}

function fetchAuthorisedDoctor(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/donor_checkuplist/fetchDoctor",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setAuthorisedDoctor(r);
		}
	});
}

function setAuthorisedDoctor(r){
	var list="<option value='0'>select</option>";
		for ( var int = 0; int < r.listDoctorDetails.length; int++) {
			list=list+'<option value="'+(r.listDoctorDetails[int].user_ID)+'">'+(r.listDoctorDetails[int].doc_name)+'</option>';
		}
		var table = document.getElementById("discardDetails");
        var rows = table.getElementsByTagName("tr").length;
        for(var i=0;i<rows;i++){ 
			
			$('#discard_by'+(i+1)).html(list);
		
		}
		
		/*$("#ffp_authorised_by").html(list);
		$("#rcell_authorised_by").html(list);*/
	}

function saveDiscardStock(){
	/*var componentSeperateId=$("#componentSeperateId").val();
	if(componentSeperateId==0){
		return false;
	}

	var sel_bloodBagNumber=$("#sel_bloodBagNumber").val();
	if(sel_bloodBagNumber==0){
		alert("Select blood Bag");
		return false;
	}
	
	var donorTreatmentId=$("#donorTreatmentId").val();
	if(donorTreatmentId==0){
		alert("Select blood Bag");
		return false;
	}

	var date_of_bag_collection=$("#date_of_bag_collection").val();
	if(date_of_bag_collection==""){
		alert("Select collection date");
		return false;
	}
	
	var plasma_discard_date=$("#plasma_discard_date").val();
	var plasma_discard_reason=$("#plasma_discard_reason").val();
	var plasma_authorised_by=$("#plasma_authorised_by").val();
	if(plasma_authorised_by=="0"){
		alert("Select plasma Authorised By");
		return false;
	}

	
	var ffp_discard_date=$("#ffp_discard_date").val();
	var ffp_discard_reason=$("#ffp_discard_reason").val();
	var ffp_authorised_by=$("#ffp_authorised_by").val();
	if(ffp_authorised_by=="0"){
		alert("Select ffp Authorised By");
		return false;
	}


	var rcell_discard_date=$("#rcell_discard_date").val();
	var rcell_discard_reason=$("#rcell_discard_reason").val();
	var rcell_authorised_by=$("#rcell_authorised_by").val();
	if(rcell_authorised_by=="0"){
		alert("Select r-cell Authorised By");
		return false;
	}

	var discardStock_remark=$("#discardStock_remark").val();*/
	var listDiscardStockObj = {
			lstStockRegister : []
		};
	
	 var table = document.getElementById("discardDetails");
     var rows = table.getElementsByTagName("tr").length;

     for ( var i = 1; i <= rows; i++) {
    	 var sel_bloodBagNumber=$("#sel_bloodBagNumber").val();
    	 if(sel_bloodBagNumber==0){
    			alert("Select blood Bag");
    			return false;
    		}
          var donor_treatment_id=$("#donorTreatmentId").val(); 
          if(donorTreatmentId==0){
      		alert("Select blood Bag");
      		return false;
      	}
         var componentSeperateId=$("#componentSeperateId" +i).val();
      	if(componentSeperateId==0){
      		return false;
      	}
      	 
      	 var date_of_bag_collection=$("#date_of_bag_collection").val();
   		if(date_of_bag_collection==""){
   		alert("Select collection date");
   		return false;
   		}
   		var discardRemark = $("#discardStock_remark").val(); 
   		var dicardReason =$("#discardReason" +i).val();
          var discard_by = $("#discard_by" +i).val();
         
			setlistDiscardStockObj(listDiscardStockObj,sel_bloodBagNumber,donor_treatment_id,componentSeperateId,date_of_bag_collection,discardRemark,dicardReason,discard_by);				
		}
    
     listDiscardStockObj = JSON.stringify(listDiscardStockObj);
     
	var inputs = [];	
	/*inputs.push('componentSeperationId='+componentSeperateId);
	inputs.push('bloodBagNumber=' + sel_bloodBagNumber);
	inputs.push('donorTreatmentId=' + donorTreatmentId);
	inputs.push('dateOfStockDiscard=' + date_of_bag_collection);
	inputs.push('plasmaDiscardDate=' + plasma_discard_date);
	inputs.push('plasmaDiscardReason=' + plasma_discard_reason);
	inputs.push('plasmaAuthorizedBy=' + plasma_authorised_by);
	inputs.push('ffpDiscardDate=' + ffp_discard_date);
	inputs.push('ffpDiscardReason=' + ffp_discard_reason);
	inputs.push('ffpAuthorizedBy=' + ffp_authorised_by);
	inputs.push('rcellDiscardDate=' + rcell_discard_date);
	inputs.push('rcellDiscardReason=' + rcell_discard_reason);
	inputs.push('rcellAuthorizedBy=' + rcell_authorised_by);
	inputs.push('stockRegisterRemark=' + discardStock_remark);*/
	inputs.push("listDiscardStockObj="+ encodeURIComponent(listDiscardStockObj));
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/donor/discardStock",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Discard stock Sucessfully");
				clearDonorForm();
			}
			else if (data == 2) {
				alertify.success("Discard stock Updated Sucessfully");				
			}
		}
	});	
}

function setlistDiscardStockObj(listDiscardStockObj,sel_bloodBagNumber,donor_treatment_id,componentSeperateId,date_of_bag_collection,discardRemark,dicardReason,discard_by){
	listDiscardStockObj.lstStockRegister.push({
		bagId : sel_bloodBagNumber,
		donorTreatmentId :donor_treatment_id,
		compSepId : componentSeperateId,
		discardDate : date_of_bag_collection,
		discardRemark : discardRemark,
		discardReason : dicardReason,
		discardby : discard_by
		
	});
}


//aniket kanse 27 MAY 21
function getAllTestsDetails(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_test_master/getAllTestsMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setAllTestsDetails(r);
		}
	});
}

function setAllTestsDetails(r){
	
	var htmBody = "";
	if (r.listTestMaster.length == 0 || r.listTestMaster.length == null) {
		htmBody = htmBody + "<tr style='height:30px; color:red; font-size:30px;'><th class='center' colspan='12'>No Records</th></tr>";
		
	} else {
		
		for ( var i = 0; i < r.listTestMaster.length; i++) {
			
			htmBody = htmBody + "<tr style='height:21px;'>"
			+ "<td class='col-md-1 center' >" + r.listTestMaster[i].testName + "</td>"
		//	+ "<td class='col-md-1 center' ><select class='form-select' id='sel_test_result_test_"+(i+1)+"'></select></td>"
			+ "<td class='col-md-1 center' ><input type='text' class='form-control' id='txt_result_"+(i+1)+"' placeholder='Result'></td>"
			+ "<td class='col-md-1 center' ><input type='date' class='form-control' id='date_time_result_test_"+(i+1)+"'></td>"
			+ "<td class='col-md-1 center' ><textarea class='form-control' id='reamrk_test_"+(i+1)+"' rows='5'></textarea></td>";
		}
	}
	
	$("#testRegisterDetailsBody").html(htmBody);
}


function getCityList(){
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organdonor/getCityList",
		 timeout : 1000 * 60 * 5, 
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setCitiesList(r);
		},
	});
}

function setCitiesList(r){
	
	var list = "";  
	list = list + "<option value='0'> - Select City - </option>";
	
    for ( var i = 0; i < r.cityList.length; i++) {  

        list = list + "<option value='"+r.cityList[i].city_id+"' class='un'>" + (r.cityList[i].city_name) + "</option>";    
    }  
    list = list + "<option value='-1' class='un'></option>";  
    $("#city").html(list);
}

function getDistrictList(){
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organdonor/getDistrictList",
		 timeout : 1000 * 60 * 5, 
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setDistrictList(r);
		},
	});
	
}

function setDistrictList(r){
	
	var list = "";  
	list = list + "<option value='0'> - Select District - </option>";
	
    for ( var i = 0; i < r.districtList.length; i++) {  

        list = list + "<option value='"+r.districtList[i].district_id+"' class='un'>" + (r.districtList[i].district_name) + "</option>";    
    }  
    list = list + "<option value='-1' class='un'></option>";  
    $("#district").html(list);
	
}

function getStateList(){
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organdonor/getStateList",
		 timeout : 1000 * 60 * 5, 
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setStateList(r);
		},
	});
	
}

function setStateList(r){
	
	var list = "";  
	list = list + "<option value='0'> - Select State - </option>";
	
    for ( var i = 0; i < r.stateList.length; i++) {  

        list = list + "<option value='"+r.stateList[i].state_id+"' class='un'>" + (r.stateList[i].state_name) + "</option>";    
    }  
    list = list + "<option value='-1' class='un'></option>";  
    $("#state").html(list);
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

function toggleRegDiv() {
	$("#divForNewDonorReg").toggle('slow');
	//$("#header_search_donor").hide();
}

function showPatSearchDiv() {
	$("#header_search_donor").toggle('slow');
	$("#divForNewDonorReg").hide();
}

function setBloodGroupList(r){
	
	var list = "";  
	list = list + "<option value='0'> - Select Blood Group - </option>";
	
    for ( var i = 0; i < r.lstBloodGroupMaster.length; i++) {  

        list = list + "<option value='"+r.lstBloodGroupMaster[i].bloodGroupId+"' class='un'>" + (r.lstBloodGroupMaster[i].bloodGrouptName) + "</option>";    
    }  
    $("#bloodGroupId").html(list);
    $("#stockinward_blood_group").html(list);
}


//this all about checkuplist by Vishnu

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
			$("#user_title_checkuplist").html(html);
			$("#prefix").html(html);
			$("#title_consentform").html(html);
			$("#stockinward_title").html(html);
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


function saveCheckupList(){
	var checkupListId = $('#checkupListId').val();
	var organDonorId = $('#organDonorId').val();
	var treatmentId = $('#treatmentCheckupListId').val();
	
	if(treatmentId == "" || treatmentId == 0 || treatmentId==undefined){
		alert("Please check treatment id");
		return false;
	}
	
	if(organDonorId == "" || organDonorId == 0 || organDonorId==undefined){
		alert("Please select organ donor");
		return false;
	}
	var title = $('#user_title_checkuplist option:selected').val();
	if(title == "select" || title==""){
		alert("Please select title");
		return false;
	}
	var donor_first_name = $('#donor_first_name').val();
	if(donor_first_name == "" || donor_first_name == undefined || donor_first_name == "undefined"){
		alert("Please enter first name");
		return false;
	}
	var donor_middle_name = $('#donor_middle_name').val();
//	if(donor_middle_name=="" || donor_middle_name == undefined || donor_middle_name == "undefined"){
//		alert("Please enter middle name");
//		return false;
//	}

	var donor_last_name = $('#donor_last_name').val();
	if(donor_last_name=="" || donor_last_name == undefined || donor_last_name == "undefined"){
		alert("Please enter last name");
		return false;
	}

	var donor_feeling_good=$("input:radio[name=donor_feeling_good]:checked").val();
	if(donor_feeling_good=="1" || donor_feeling_good==1){
		donor_feeling_good = 1;
	}else if(donor_feeling_good=="0" || donor_feeling_good==0){
		donor_feeling_good = 0;
	}else{
		alert("Select donor feeling good");
		return false;
	}
	
	var allergy_record=$("input:radio[name=allergy_record]:checked").val();
	if(allergy_record=="1" || allergy_record==1){
		allergy_record = 1;
	}else if(allergy_record=="0" || allergy_record==0){
		allergy_record = 0;
	}else{
		alert("Select any allergy record");
		return false;
	}
	
	var previous_health_issue=$("input:radio[name=previous_health_issue]:checked").val();
	if(previous_health_issue =="1" || previous_health_issue ==1){
		previous_health_issue = 1;
	}else if(previous_health_issue =="0" || previous_health_issue==0){
		previous_health_issue = 0;
	}else{
		alert("Select any previous health issue");
		return false;
	}
	
	var heabit_details = $('#heabit_details').val();
	if(heabit_details=="" || heabit_details=="undefined" || heabit_details==undefined){
		alert("Please enter any habit");
		return false;
	}

	var weight = $('#weight').val();
	if(weight=="" || weight=="undefined" || weight==undefined){
		alert("Please enter weight");
		return false;
	}
	
	var organ_donation_test1 = $('#organ_donation_test1').val();
	if(organ_donation_test1=="" || organ_donation_test1=="undefined" || organ_donation_test1==undefined){
		alert("Please enter organ donation test1");
		return false;
	}
	
	var height = $('#height').val();
	if(height=="" || height=="undefined" || height==undefined){
		alert("Please enter height");
		return false;
	}
	
	var organ_donation_test2 = $('#organ_donation_test2').val();
	if(organ_donation_test2=="" || organ_donation_test2=="undefined" || organ_donation_test2==undefined){
		alert("Please enter organ donation test2");
		return false;
	}
	
	var blood_pressure = $('#blood_pressure').val();
	if(blood_pressure=="" || blood_pressure=="undefined" || blood_pressure==undefined){
		alert("Please enter blood pressure");
		return false;
	}
	
	var organ_donation_test3 = $('#organ_donation_test3').val();
	if(organ_donation_test3=="" || organ_donation_test3=="undefined" || organ_donation_test3==undefined){
		alert("Please enter organ donation test3");
		return false;
	}
	
	var temprature = $('#temprature').val();
	if(temprature=="" || temprature=="undefined" || temprature==undefined){
		alert("Please enter temprature");
		return false;
	}
	
	var pulse = $('#pulse').val();
	if(pulse=="" || pulse=="undefined" || pulse==undefined){
		alert("Please enter pulse");
		return false;
	}
	
	var haemoglobin = $('#haemoglobin').val();
	if(haemoglobin=="" || haemoglobin=="undefined" || haemoglobin==undefined){
		alert("Please enter haemoglobin");
		return false;
	}
	
	var doctor_id = $("#doctor_name option:selected").val();
	
	
	
	if(doctor_id == "select"){
		alert("Please Select Doctor First");
		return false;
	}
	
	var doctor_name = $("#doctor_name option:selected").text();
	if(doctor_name=="" || doctor_name==undefined || doctor_name=="undefined"){
		alert("Please select doctor_name");
		return false;
	}
	
	var accept_or_decline = $("#accept_or_decline option:selected").val();
	if(accept_or_decline==0 || accept_or_decline=="" || accept_or_decline==undefined || accept_or_decline=="undefined"){
		alert("Please select accept or decline");
		return false;
	}
	
	var checkup_remarks = $('#checkup_remarks').val();
	if(checkup_remarks=="" || checkup_remarks ==undefined || checkup_remarks =="undefined"){
		alert("Please enter checkup remarks");
		return false;
	}
	var organIdList = "";
	$('#select_organ_name_id option:selected').each(function() {
		if(!organIdList == "" && organIdList!=0 && organIdList!=undefined && organIdList!='undefined'){
			organIdList = organIdList +","+ $(this).val();
		}else{
			organIdList = $(this).val();
		}	    
	});
	
	if(organIdList == "" || organIdList==0 || organIdList==undefined || organIdList=='undefined'){
		
		alert("Please Select atleat one organ name");
		return false;
	}

	var inputs = [];	
	inputs.push('checkupListId= '+checkupListId);
	inputs.push('title=' + title);
	inputs.push('organDonorId= '+organDonorId);
	inputs.push('donorFName=' + donor_first_name);
	inputs.push('donorMName=' + donor_middle_name);
	inputs.push('donorLName=' + donor_last_name);
	inputs.push('isDonorFeelingGood=' + donor_feeling_good);
	inputs.push('isAnyAllergyRecord=' + allergy_record);
	inputs.push('isPreviousHealthIssue=' + previous_health_issue);
	inputs.push('anyHabit=' + heabit_details);
	inputs.push('weightInKg=' + weight);
	inputs.push('organDonationTest1=' + organ_donation_test1);
	inputs.push('heightInCm=' + height);
	inputs.push('organDonationTest2=' + organ_donation_test2);
	inputs.push('bloodPressure=' + blood_pressure);
	inputs.push('organDonationTest3=' + organ_donation_test3);
	inputs.push('tempperature=' + temprature);
	inputs.push('pluse=' + pulse);
	inputs.push('hemoglobin=' + haemoglobin);
	inputs.push('checkupDoneBy=' + doctor_name);
	inputs.push('checkupDoneById=' + doctor_id);
	inputs.push('checkupStatus=' + accept_or_decline);
	inputs.push('remark=' + checkup_remarks);
	inputs.push('intendToDonateOrganId=' + organIdList);
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');

	jQuery.ajax({
		type : "POST",
		url : "ehat/organDonorCheckupList/saveOrganDonorCheckupList",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Organ Donor Checkuplist Saved Sucessfully");
				clearorganDonorCheckupList();
				window.location.href = "odt_organ_donor_checkup_list.jsp";
			}else if (data == 2) {
				alertify.success( "Organ Donor Checkuplist Updated Sucessfully");
				window.location.href = "odt_organ_donor_checkup_list.jsp";
			}
		}
	});	
}

function editOrganDonorCheckupList(checkupListId) {
	 
	if(checkupListId !=undefined && checkupListId!=null && checkupListId!="" && checkupListId!="null"){
		
		var inputs = [];
		inputs.push('checkupListId=' + checkupListId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organDonorCheckupList/editOrganDonorCheckupList",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				$('#searchId').val('');
				$("#divForEntryOrganDonorCheckuplist").show('slow');
				$('#organDonorId').val(r.organDonationRegistrationDto.id);
				$('#checkupListId').val(r.checkupListId);
				$('#treatmentCheckupListId').val(r.organDonorTreatment.organDonorTreatmentId);
				
				$("#donor_first_name").val(r.donorFName);
				$("#donor_middle_name").val(r.donorMName);
				$("#donor_last_name").val(r.donorLName);
				$("select#user_title_checkuplist").val(r.title);
				
//				alert("isDonorFeelingGood : " + r.isDonorFeelingGood);
//				alert("isAnyAllergyRecord : " + r.isAnyAllergyRecord);
//				alert("isPreviousHealthIssue : " + r.isPreviousHealthIssue);
				
				// changed by Aniket : 17 FEB 22 
				$("input:radio[name=donor_feeling_good][value='"+r.isDonorFeelingGood+"']").prop("checked", true);
				$("input:radio[name=allergy_record][value='"+r.isAnyAllergyRecord+"']").prop("checked", true);
				$("input:radio[name=previous_health_issue][value='"+r.isPreviousHealthIssue+"']").prop("checked", true);
				
				/*if(r.isDonorFeelingGood == 1){
					
					$("input[name=donor_feeling_good]").prop("checked", true);
				}else if(r.isDonorFeelingGood == 0){
					$("input[name=donor_feeling_good]").prop("checked", true);
				}else{
					$("input[name=donor_feeling_good]").removeAttr("checked");
				}*/
				
				/*if(r.isAnyAllergyRecord == 1){
					$("input[name=allergy_record]").prop("checked", true);
				}else if(r.isAnyAllergyRecord == 0){
					$("input[name=allergy_record]").prop("checked", true);
				}else{
					$("input[name=allergy_record]").removeAttr("checked");
				}
				
				if(r.isPreviousHealthIssue == 1){
					$("input[name=previous_health_issue]").prop("checked", true);
				}else if(r.isPreviousHealthIssue == 0){
					$("input[name=previous_health_issue]").prop("checked", true);
				}else{
					$("input[name=previous_health_issue]").removeAttr("checked");
				}*/
				
				
				$("#heabit_details").val(r.anyHabit);
				$("#weight").val(r.weightInKg);
				$("#organ_donation_test1").val(r.organDonationTest1);
				$("#height").val(r.heightInCm);
				$("#organ_donation_test2").val(r.organDonationTest2);
				$("#blood_pressure").val(r.bloodPressure);
				$("#organ_donation_test3").val(r.organDonationTest3);
				$("#temprature").val(r.tempperature);
				$("#pulse").val(r.pluse);
				$("#haemoglobin").val(r.hemoglobin);
				$("select#doctor_name").val(r.checkupDoneById);
				$("select#accept_or_decline").val(r.checkupStatus);
				$("#checkup_remarks").val(r.remark);
				var organArray = r.intendToDonateOrganId;
				var array = organArray.split(',');
				$.each(array, function(index, item) {
					$("#select_organ_name_id").select2("val", $("#select_organ_name_id").select2("val").concat(item));
				});
				
				//$("#select_organ_name_id").select2("val", r.intendToDonateOrganId);
			}
		});
	}
}

function getAllDonorCheckupList() {

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
		data : str + "&reqType=AJAX",
		url : "ehat/organDonorCheckupList/getAllOrganDonorCheckupList",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllDonorCheckupList(r, "All");
		}
	});
}


function setAllDonorCheckupList(r, CallFrom) {

	
	
	var htm = "";
	var index = 1;
	if(r !="" && r!=undefined){
		if (CallFrom == "All") {
			for ( var i = 0; i < r.lstOrganDonorCheckupListDto.length; i++) {
				
				var checkupdate = new Date(r.lstOrganDonorCheckupListDto[i].createdDate).toLocaleString('en-GB');
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorCheckupListDto[i].checkupListId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorCheckupListDto[i].donorTreatmentId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorCheckupListDto[i].donorId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorCheckupListDto[i].title+" "+r.lstOrganDonorCheckupListDto[i].donorFName+" "+r.lstOrganDonorCheckupListDto[i].donorMName+" "+r.lstOrganDonorCheckupListDto[i].donorLName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						//+ getDateWithTime(r.lstOrganDonorCheckupListDto[i].createdDate)
						+ checkupdate
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorCheckupListDto[i].checkupDoneBy
						+ '</td>';
						if(r.lstOrganDonorCheckupListDto[i].isConsentGiven=="Y"){
							htm = htm	+ ' <td class="col-md-1 center">'
							+ '	<button disabled class="btn btn-xs btn-success" onclick=editOrganDonorCheckupList('
							+ r.lstOrganDonorCheckupListDto[i].checkupListId
							+ ')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button disabled class="btn btn-xs btn-danger" onclick=deleteOrganDonorCheckupList('
							+ r.lstOrganDonorCheckupListDto[i].checkupListId+","+ r.lstOrganDonorCheckupListDto[i].donorTreatmentId+ ')><i class="fa fa-trash-o"></i></button></td>'
						
							 if(r.lstOrganDonorCheckupListDto[i].checkupStatus=="Decline"){
										 htm = htm + ' <td class="col-md-1 center">'
								//	+ '	<button disabled class="btn btn-xs btn-success" disabled onclick=sendCheckupListToConsentForm('
									+ '	<button disabled class="btn btn-xs btn-success"  onclick=sendCheckupListToConsentForm('
									+ r.lstOrganDonorCheckupListDto[i].donorId+","+r.lstOrganDonorCheckupListDto[i].donorTreatmentId+","+r.lstOrganDonorCheckupListDto[i].checkupListId
									+ ')><i class="fa fa-edit"></i></button></td>';
							 }else{
								 htm = htm + ' <td class="col-md-1 center">'
									+ '	<button  class="btn btn-xs btn-success" onclick=sendCheckupListToConsentForm('
									+ r.lstOrganDonorCheckupListDto[i].donorId+","+r.lstOrganDonorCheckupListDto[i].donorTreatmentId+","+r.lstOrganDonorCheckupListDto[i].checkupListId
									+ ')><i class="fa fa-edit"></i></button></td>';
							 }
							if(r.lstOrganDonorCheckupListDto[i].isOrganCollected=="Y"){
								
								 if(r.lstOrganDonorCheckupListDto[i].checkupStatus=="Decline"){
								
								htm = htm + ' <td class="col-md-1 center">'
								+ '	<button disabled class="btn btn-xs btn-success" disabled  onclick=addOrganCollection('
								+ r.lstOrganDonorCheckupListDto[i].donorId+","+r.lstOrganDonorCheckupListDto[i].donorTreatmentId+","+r.lstOrganDonorCheckupListDto[i].checkupListId
								+ ')><i class="fa fa-edit"></i></button></td>';
								 }else{
									 htm = htm + ' <td class="col-md-1 center">'
										+ '	<button disabled class="btn btn-xs btn-success"   onclick=addOrganCollection('
										+ r.lstOrganDonorCheckupListDto[i].organDonationRegistrationDto.id+","+r.lstOrganDonorCheckupListDto[i].organDonorTreatment.organDonorTreatmentId+","+r.lstOrganDonorCheckupListDto[i].checkupListId
										+ ')><i class="fa fa-edit"></i></button></td>';
								 }
							}else{
								 if(r.lstOrganDonorCheckupListDto[i].checkupStatus=="Decline"){
								htm = htm + ' <td class="col-md-1 center">'
								+ '	<button  class="btn btn-xs btn-success" disabled  onclick=addOrganCollection('
								+ r.lstOrganDonorCheckupListDto[i].donorId+","+r.lstOrganDonorCheckupListDto[i].donorTreatmentId+","+r.lstOrganDonorCheckupListDto[i].checkupListId
								+ ')><i class="fa fa-edit"></i></button></td>';
								 }else{
									 htm = htm + ' <td class="col-md-1 center">'
										+ '	<button  class="btn btn-xs btn-success" onclick=addOrganCollection('
										+ r.lstOrganDonorCheckupListDto[i].donorId+","+r.lstOrganDonorCheckupListDto[i].donorTreatmentId+","+r.lstOrganDonorCheckupListDto[i].checkupListId
										+ ')><i class="fa fa-edit"></i></button></td>';
								 }
							}
							htm = htm+ '</tr>';
						}else{
							htm = htm	+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success" onclick=editOrganDonorCheckupList('
							+ r.lstOrganDonorCheckupListDto[i].checkupListId
							+ ')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganDonorCheckupList('	+ r.lstOrganDonorCheckupListDto[i].checkupListId+","+ r.lstOrganDonorCheckupListDto[i].donorTreatmentId+ ')><i class="fa fa-trash-o"></i></button></td>'
						
							if(r.lstOrganDonorCheckupListDto[i].checkupStatus=="Decline"){
								htm = htm	  + ' <td class="col-md-1 center">'
						//	+ '	<button class="btn btn-xs btn-success" disabled onclick=sendCheckupListToConsentForm('
							+ '	<button class="btn btn-xs btn-success"  onclick=sendCheckupListToConsentForm('
							+ r.lstOrganDonorCheckupListDto[i].donorId+","+r.lstOrganDonorCheckupListDto[i].donorTreatmentId+","+r.lstOrganDonorCheckupListDto[i].checkupListId
							+ ')><i class="fa fa-edit"></i></button></td>';
							}else{
								htm = htm	  + ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-success"  onclick=sendCheckupListToConsentForm('
								+ r.lstOrganDonorCheckupListDto[i].donorId+","+r.lstOrganDonorCheckupListDto[i].donorTreatmentId+","+r.lstOrganDonorCheckupListDto[i].checkupListId
								+ ')><i class="fa fa-edit"></i></button></td>';
							}
							
							 if(r.lstOrganDonorCheckupListDto[i].checkupStatus=="Decline"){
							htm = htm + ' <td class="col-md-1 center">'
								+ '	<button disabled class="btn btn-xs btn-success" disabled  onclick=addOrganCollection('
								+ r.lstOrganDonorCheckupListDto[i].donorId+","+r.lstOrganDonorCheckupListDto[i].donorTreatmentId+","+r.lstOrganDonorCheckupListDto[i].checkupListId
								+ ')><i class="fa fa-edit"></i></button></td>';
							 }else{
								 htm = htm + ' <td class="col-md-1 center">'
									+ '	<button disabled class="btn btn-xs btn-success" onclick=addOrganCollection('
									+ r.lstOrganDonorCheckupListDto[i].donorId+","+r.lstOrganDonorCheckupListDto[i].donorTreatmentId+","+r.lstOrganDonorCheckupListDto[i].checkupListId
									+ ')><i class="fa fa-edit"></i></button></td>';
							 }
							htm = htm+ '</tr>';
						}
						
				index++;
			}
		} else if (CallFrom == "search") {
			
			var checkupdate = new Date(r.createdDate).toLocaleString('en-GB');
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.checkupListId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.organDonorTreatment.organDonorTreatmentId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.organDonationRegistrationDto.id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.title+" "+r.donorFName +" "+r.donorMName+" "+r.donorLName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.checkupDoneBy
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					//+ getDateWithTime(r.createdDate)
					+ checkupdate
					+ '</td>';
					if(r.isConsentGiven=="Y"){
						htm = htm	
						+ ' <td class="col-md-1 center">'
						+ '	<button disabled class="btn btn-xs btn-success" onclick=editOrganDonorCheckupList('
						+ r.checkupListId
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button disabled class="btn btn-xs btn-danger" onclick=deleteOrganDonorCheckupList('+ r.checkupListId+","+r.organDonorTreatment.organDonorTreatmentId+ ')><i class="fa fa-trash-o"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=sendCheckupListToConsentForm('
					//	+ '	<button disabled class="btn btn-xs btn-success" onclick=sendCheckupListToConsentForm('
						+ r.organDonationRegistrationDto.id+","+r.organDonorTreatment.organDonorTreatmentId+","+r.checkupListId
						+ ')><i class="fa fa-edit"></i></button></td>';
						if(r.isOrganCollected=="Y"){	
							htm = htm	+ ' <td class="col-md-1 center">'
							+ '	<button disabled class="btn btn-xs btn-success" onclick=addOrganCollection('
							+ r.organDonationRegistrationDto.id+","+r.organDonorTreatment.organDonorTreatmentId+","+r.checkupListId
							+ ')><i class="fa fa-edit"></i></button></td>';
						}else{
							htm = htm	+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success" onclick=addOrganCollection('
							+ r.organDonationRegistrationDto.id+","+r.organDonorTreatment.organDonorTreatmentId+","+r.checkupListId
							+ ')><i class="fa fa-edit"></i></button></td>';
						}
						htm = htm + '</tr>';
					}else{
						htm = htm
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editOrganDonorCheckupList('
						+ r.checkupListId
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganDonorCheckupList('	+ r.checkupListId+","+r.organDonorTreatment.organDonorTreatmentId+ ')><i class="fa fa-trash-o"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=sendCheckupListToConsentForm('
						+ r.organDonationRegistrationDto.id+","+r.organDonorTreatment.organDonorTreatmentId+","+r.checkupListId
						+ ')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button disabled class="btn btn-xs btn-success" onclick=addOrganCollection('
							+ r.organDonationRegistrationDto.id+","+r.organDonorTreatment.organDonorTreatmentId+","+r.checkupListId
							+ ')><i class="fa fa-edit"></i></button></td>'
						+ '</tr>';
					}
			index++;
		}
	}
	$("#organDonorCheckupListDetails").html(htm);
}

function addOrganCollection(donorId,treatmentId,checkupListId){
	
	// window.location.href = "odt_organ_collection.jsp?" + "checkupListId=" + encodeURIComponent(checkupListId);
	   window.location.href = "odt_organ_collection.jsp?" + "donorId=" + encodeURIComponent(donorId)+ "&treatmentId=" + encodeURIComponent(treatmentId)+ "&checkupListId=" + encodeURIComponent(checkupListId);
}

function deleteOrganDonorCheckupList(checkupListId,donarTreatmentId) {
	
	if(checkupListId !=undefined && checkupListId!=null && checkupListId!="" && checkupListId!="null"){
		var r = confirm("Are You Sure You Want To Delete Donor Type Master Detail");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/organDonorCheckupList/deleteOrganDonorCheckupList",
				data : {
					"checkupListId" : checkupListId,
					"donarTreatmentId" : donarTreatmentId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllDonorCheckupList();
				}
			});
		}
	}
}


function organDonorCheckupListAutoSuggestion(inputID){
	var callFrom =  $("#searchType").val();
	if(callFrom == 0){
		alert("Please select search type");
		return false;
	}
	var resultData = [];
	var checkupList = $("#" + inputID).val();

	if (checkupList == "" || checkupList == null || checkupList == "null"
			|| checkupList == undefined) {
		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllDonorCheckupList();
		return false;
	}

	var inputs = [];
	inputs.push('checkupListId=' + checkupList);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/organDonorCheckupList/organDonorCheckupListAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstOrganDonorCheckupListDto.length; j++) {
				var arrValue = response.lstOrganDonorCheckupListDto[j].checkupListId
						+ "-" + response.lstOrganDonorCheckupListDto[j].donorFName+" "+response.lstOrganDonorCheckupListDto[j].donorMName+" "+response.lstOrganDonorCheckupListDto[j].donorLName;
				var idValue = response.lstOrganDonorCheckupListDto[j].checkupListId;
				var donorName = response.lstOrganDonorCheckupListDto[j].donorFName+" "+response.lstOrganDonorCheckupListDto[j].donorMName+" "+response.lstOrganDonorCheckupListDto[j].donorLName;
				resultData.push({
					ID : idValue,
					Name : donorName,
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
		var checkupListId = res[0];
		var donorName = res[1];
		if(checkupListId !=undefined && checkupListId!=null && checkupListId!="" && checkupListId!="null"){
			getOrganDonorCheckupListById(checkupListId);
		}
		$("input#" + inputID).val(donorName);
	}
}


function getOrganDonorCheckupListById(checkupListId) {
	if(checkupListId !=undefined && checkupListId!=null && checkupListId!="" && checkupListId!="null"){
		var inputs = [];
		inputs.push('checkupListId=' + checkupListId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organDonorCheckupList/editOrganDonorCheckupList",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				setAllDonorCheckupList(r, "search");
				clearorganDonorCheckupList();
			}
	
		});
	}
}

function donorCheckupListSearchById() {
	var checkupListId = $("#searchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(checkupListId)) {
		alert("Please Enter Number Only!");
		return false;
	}
	getOrganDonorCheckupListById(checkupListId);
}

function getOrganDonorById(organDonorId) {
	if(organDonorId !=undefined && organDonorId!=null && organDonorId!="" && organDonorId!="null"){
		var inputs = [];
		inputs.push('id=' + organDonorId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organDonorCheckupList/getOrganDonorById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				 $("#donor_first_name").val(r.firstName);
				 $("#donor_middle_name").val(r.middleName);
				 $("#donor_last_name").val(r.lastName);
				 $("#organDonorId").val(r.id);
				 $("#user_title_checkuplist option:selected").text(r. prefix);
				 $("#user_title_checkuplist option:selected").val(r. prefix);
				 $("#divForEntryOrganDonorCheckuplist").toggle('slow');
			}
		});
	}
}

function getOrganDonorTreatmentByPatientIdAndOrganDonorId(patientId,organDonorId,treatmentId){
	
	if(organDonorId !=undefined && organDonorId!=null && organDonorId!="" && organDonorId!="null" && patientId !=undefined && patientId!=null && patientId!="" && patientId!="null" && treatmentId !=undefined && treatmentId!=null && treatmentId!="" && treatmentId!="null"){
		var inputs = [];
		inputs.push('organDonorId=' + organDonorId);
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/organDonorCheckupList/getOrganDonorByIdAndPatientIdTreatmentId",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				 $("#treatmentCheckupListId").val(r.organDonorTreatmentId);
				 $("#patientId").val(r.patientId);
				 
				 var organArray = r.intendToDonateOrganId;
				 
				 var array = organArray.split(',');
				 $.each(array, function(index, item) {
					$("#select_organ_name_id").select2("val", $("#select_organ_name_id").select2("val").concat(item));
				 });
				 
			}
		});
	}
}

function setOrganInMultiSelect(){
	var organId = $('#select_organ_name').val();	
	$("#select_organ_name_id").select2("val", $("#select_organ_name_id").select2("val").concat(organId));	
}

function setOrganDonorInMultiSelect(){
	var organId = $('#intendToDonateOrganId').val();	
	
	if(organId > 0)
	$("#select_organ_donor_name_id").select2("val", $("#select_organ_donor_name_id").select2("val").concat(organId));	
}


function getAllIntendedOrgans(){
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
			setIntendedOrgans(r);
		},
	});
}

function setIntendedOrgans(r){
	
	var list = "";  
	list = list + "<option value='0'> - Select Organ - </option>";
	
    for ( var i = 0; i < r.lstIntendOrganDonorMasterDto.length; i++) {  

        list = list + "<option value='"+r.lstIntendOrganDonorMasterDto[i].intendId+"' class='un'>" + (r.lstIntendOrganDonorMasterDto[i].intendOrganDonor) + "</option>";    
    }  
    list = list + "<option value='-1' class='un'></option>";  
    $('#select_organ_name_id').html(list);
    $('#select_organ_name_id').select2();
    $('#stockinwar_dorgan_name').html(list);
    $('#stockinwar_dorgan_name').select2();
    $('#select_organ_name').select2();
    $('#select_organ_name').html(list);
    

}

function clearorganDonorCheckupList(){
	$('#user_title_checkuplist').val();
	$('#donor_first_name').val("");
	$('#donor_middle_name').val("");
	$('#donor_last_name').val("");
	$('#donor_feeling_good').val("");
	$('#allergy_record').val("");
	$('#previous_health_issue').val("");
	$('#heabit_details').val("");
	$('#weight').val("");
	$('#organ_donation_test1').val("");
	$('#height').val("");
	$('#organ_donation_test2').val("");
	$('#blood_pressure').val("");
	$('#organ_donation_test3').val("");
	$('#temprature').val("");
	$('#pulse').val("");
	$('#haemoglobin').val("");
	$('#doctor_name').val("");
	$('#accept_or_decline').val("");
	$('#checkup_remarks').val("");
	$('#searchId').val("");
}

function toggleEntryDivOrganDonorCheckuplist() {
	$("#divForEntryOrganDonorCheckuplist").toggle('slow');
}

// this is related to consent form by Vishnu

function saveConsentForm(){
	var checkupListId = $('#consentFormCheckupListId').val();
	var consentFormId = $('#consentFormId').val();
	var organDonorId = $('#organDonorId').val();
	var treatmentId = $('#consentFormTreatmentId').val();
	
	if(treatmentId == "" || treatmentId == 0 || treatmentId==undefined){
		alert("Please check treatment id");
		return false;
	}
	
	if(organDonorId == "" || organDonorId == 0 || organDonorId==undefined){
		alert("Please select organ donor");
		return false;
	}
	var title = $('#title_consentform option:selected').val();
	if(title == "select" || title==""){
		alert("Please select title");
		return false;
	}
	var consent_form_relation = $('select#consent_form_relation option:selected').val();
	if(consent_form_relation == "0" || consent_form_relation==""){
		alert("Please select relation");
		return false;
	}
	
	var consent_form_first_name = $('#consent_form_first_name').val();
	if(consent_form_first_name == "" || consent_form_first_name == undefined || consent_form_first_name == "undefined"){
		alert("Please enter first name");
		return false;
	}
	var consent_form_middle_name = $('#consent_form_middle_name').val();
//	if(consent_form_middle_name=="" || consent_form_middle_name == undefined || consent_form_middle_name == "undefined"){
//		alert("Please enter middle name");
//		return false;
//	}

	var consent_form_last_name = $('#consent_form_last_name').val();
	if(consent_form_last_name=="" || consent_form_last_name == undefined || consent_form_last_name == "undefined"){
		alert("Please enter last name");
		return false;
	}
	
	var consent_form_sign_by_name = $('#consent_form_sign_by_name').val();
	if(consent_form_sign_by_name=="" || consent_form_sign_by_name == undefined || consent_form_sign_by_name == "undefined"){
		alert("Please enter sign by name");
		return false;
	}
	var consent_form_remarks = $('#consent_form_remarks').val();
	if(consent_form_remarks=="" || consent_form_remarks ==undefined || consent_form_remarks =="undefined"){
		alert("Please enter checkup remarks");
		return false;
	}
	
	var form = $("#documentForm")[0];
	if (document.getElementsByName("uploadConsentFormDocs").length == 0 || $("#consent_form").val() == "") {
		alert("Please select file");
		return false;
	}
	
	var consentFormFile = getFileValue('consent_form');

	var data = new FormData(form);
	data.append("consentFormId", consentFormId);
	data.append("title", title);
	data.append("donorFName", consent_form_first_name);
	data.append("donorMName", consent_form_middle_name);
	data.append("donorLName", consent_form_last_name);
	data.append("signByName", consent_form_sign_by_name);
	data.append("relation", consent_form_relation);
	data.append("consentFormFile", consentFormFile);
	data.append("remark", consent_form_remarks);
	data.append("organDonorId", organDonorId);
	data.append("checkupListId", checkupListId);
	data.append("treatmentId", treatmentId);
	data.append("uploadConsentFormDocs", consentFormFile);

	jQuery.ajax({
		type : "POST",
		enctype: 'multipart/form-data',
		url : "ehat/organDonorConsentForm/saveOrganDonorConsentForm",
		//data	: str + "&reqType=AJAX",
		data : data,
		processData : false,
		contentType : false,
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Organ donor consent form saved sucessfully");
				getAllDonorConsentForm();
				clearOrganDonorConsentForm();
				toggleEntryDivOrganDonorConsentForm();
			}else if (data == 2) {
				alertify.success("Organ donor consent form updated sucessfully");
				getAllDonorConsentForm();
				clearOrganDonorConsentForm();
				toggleEntryDivOrganDonorConsentForm();
			}
		}
	});	

}


function editOrganDonorConsentForm(consentFormId) {
	if(consentFormId !=undefined && consentFormId!=null && consentFormId!="" && consentFormId!="null"){
		
		var inputs = [];
		inputs.push('consentFormId=' + consentFormId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organDonorConsentForm/editOrganDonorConsentForm",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
			//	alert(JSON.stringify(r));
				
				$('#searchConsentFromId').val('');
				$("#divForEntryOrganDonorConsentForm").show('slow');
				$('#organDonorId').val(r.organDonationRegistrationDto.id);
				$('#consentFormId').val(r.consentFormId);
				$('#consentFormCheckupListId').val(r.organDonorCheckupListDto.checkupListId);
				$('#consentFormTreatmentId').val(r.organDonorTreatment.organDonorTreatmentId);
				
				$("#consent_form_first_name").val(r.donorFName);
				$("#consent_form_middle_name").val(r.donorMName);
				$("#consent_form_last_name").val(r.donorLName);
				$("select#title_consentform").val(r.title);
				
				$("#consent_form_sign_by_name").val(r.signByName);
				$("select#consent_form_relation").val(r.relation);
				$("#consent_form_remarks").val(r.remark);
				
				//aniket kanse, 5 SEPT 22
			//	$("#consent_form").val('"+r.consentFormFile+"');
			//	alert(r.consentFormFile);
				$("#consent_form").text(r.consentFormFile);
			}
		});
	}
}

function getAllDonorConsentForm() {

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
		url : "ehat/organDonorConsentForm/getAllOrganDonorConsentForm",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllDonorConsentForm(r, "All");
		}
	});
}


function setAllDonorConsentForm(r, CallFrom) {

	var htm = "";
	var index = 1;
	if(r !="" && r!=undefined){
		if (CallFrom == "All") {
			for ( var i = 0; i < r.lstOrganDonorConsentFormDto.length; i++) {
				
				var consentDate =new Date(r.lstOrganDonorConsentFormDto[i].createdDate).toLocaleString('en-GB');
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorConsentFormDto[i].consentFormId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorConsentFormDto[i].donorId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorConsentFormDto[i].organDonorTreatmentId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorConsentFormDto[i].organCheckuListId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorConsentFormDto[i].title+" "+r.lstOrganDonorConsentFormDto[i].donorFName+" "+r.lstOrganDonorConsentFormDto[i].donorMName+" "+r.lstOrganDonorConsentFormDto[i].donorLName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorConsentFormDto[i].signByName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorConsentFormDto[i].relation
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '<a href="#" onclick=viewConsernDocument('+i+','+r.lstOrganDonorConsentFormDto[i].consentFormId+')>' +r.lstOrganDonorConsentFormDto[i].consentFormFile+' </a>'
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						//+ getDateWithTime(r.lstOrganDonorConsentFormDto[i].createdDate)
						+ consentDate
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editOrganDonorConsentForm('
						+ r.lstOrganDonorConsentFormDto[i].consentFormId
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganDonorConsentForm('
						+ r.lstOrganDonorConsentFormDto[i].consentFormId
						+ ')><i class="fa fa-trash-o"></i></button></td>'
						
						+ "<td class='col-md-1 center'><input type='hidden' id='hiddenDocid"
						+ (i)
						+ "' value='"
						+ r.lstOrganDonorConsentFormDto[i].consentFormFile
						+ "'>"
					
						+ "</td> "
						
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
					+ r.consentFormId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.organDonationRegistrationDto.id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.organDonorTreatment.organDonorTreatmentId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.organDonorCheckupListDto.checkupListId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.title+" "+r.donorFName +" "+r.donorMName+" "+r.donorLName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.signByName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.relation
					+ '</td>'
					
					/*+ ' <td class="col-md-1 center">'
					+ r.consentFormFile
					+ '</td>'*/
					
					+ ' <td class="col-md-1 center">'
					+ '<a href="#" onclick=viewConsernDocument('+0+','+r.consentFormId+')>' +r.consentFormFile+' </a>'
					+ '</td>'
					
					+ ' <td class="col-md-1 center">'
					+ getDateWithTime(r.createdDate)
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editOrganDonorConsentForm('
					+ r.consentFormId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganDonorConsentForm('
					+ r.consentFormId
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					
					+ "<td class='col-md-1 center'><input type='hidden' id='hiddenDocid"
					+ (0)
					+ "' value='"
					+ r.consentFormFile
					+ "'>"
				
					+ "</td> "
					
					+ '</tr>';
			index++;
		}
	}
	$("#organDonorConsentFormDetails").html(htm);
}

function deleteOrganDonorConsentForm(consentFormId) {
	
	if(consentFormId !=undefined && consentFormId!=null && consentFormId!="" && consentFormId!="null"){
		var r = confirm("Are You Sure You Want To Delete Donor Type Master Detail");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/organDonorConsentForm/deleteOrganDonorConsentForm",
				data : {
					"consentFormId" : consentFormId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllDonorConsentForm();
				}
			});
		}
	}
}

function organDonorConsentFormAutoSuggestion(inputID){
	var callFrom =  $("#searchType").val();
	if(callFrom == 0){
		alert("Please select search type");
		return false;
	}
	var resultData = [];
	var consentFormId = $("#" + inputID).val();

	if (consentFormId == "" || consentFormId == null || consentFormId == "null"
			|| consentFormId == undefined) {
		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllDonorConsentForm();
		return false;
	}

	var inputs = [];
	inputs.push('consentFormId=' + consentFormId);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/organDonorConsentForm/organDonorConsentFormAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstOrganDonorConsentFormDto.length; j++) {
				var arrValue = response.lstOrganDonorConsentFormDto[j].consentFormId
						+ "-" + response.lstOrganDonorConsentFormDto[j].donorFName+" "+response.lstOrganDonorConsentFormDto[j].donorMName+" "+response.lstOrganDonorConsentFormDto[j].donorLName;
				var idValue = response.lstOrganDonorConsentFormDto[j].consentFormId;
				var donorName = response.lstOrganDonorConsentFormDto[j].donorFName+" "+response.lstOrganDonorConsentFormDto[j].donorMName+" "+response.lstOrganDonorConsentFormDto[j].donorLName;
				resultData.push({
					ID : idValue,
					Name : donorName,
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
		var consentFormId = res[0];
		var donorName = res[1];
		if(consentFormId !=undefined && consentFormId!=null && consentFormId!="" && consentFormId!="null"){
			getOrganDonorConsentFromById(consentFormId);
		}
		$("input#" + inputID).val(donorName);
	}

}

function setCheckupListSearchType(){
	
	$("#searchId").val("");
	var searchType = $("#searchType").val();
	
	if(searchType == 1){
		
		$("#searchId").attr("placeholder", "Type Donor Id Here");
		
	}else if(searchType == 2){
		
		$("#searchId").attr("placeholder", "Type CheckupList id Here");
	}
}

function getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId(checkupListId,organDonorId,treatmentId){
	
	if(organDonorId !=undefined && organDonorId!=null && organDonorId!="" && organDonorId!="null" && checkupListId !=undefined && checkupListId!=null && checkupListId!="" && checkupListId!="null" && treatmentId !=undefined && treatmentId!=null && treatmentId!="" && treatmentId!="null"){
		var inputs = [];
		inputs.push('organDonorId=' + organDonorId);
		inputs.push('checkupListId=' + checkupListId);
		inputs.push('treatmentId=' + treatmentId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organDonorConsentForm/getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				 $("#consentFormCheckupListId").val(r.checkupListId);
			}
		});
	}
}

function getFileValue(id){
	var files = $('#'+id).prop("files");
	var document = $.map(files, function(val) {
		return val.name;
	});
	return document;
}

function getOrganDonorByIdInConsentForm(organDonorId) {
	if(organDonorId !=undefined && organDonorId!=null && organDonorId!="" && organDonorId!="null"){
		var inputs = [];
		inputs.push('id=' + organDonorId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organDonorCheckupList/getOrganDonorById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				 $("#consent_form_first_name").val(r.firstName);
				 $("#consent_form_middle_name").val(r.middleName);
				 $("#consent_form_last_name").val(r.lastName);
				 $("#organDonorId").val(r.id);
				 $("#title_consentform option:selected").text(r. prefix);
				 $("#title_consentform option:selected").val(r. prefix);
				 $("#divForEntryOrganDonorConsentForm").toggle('slow');
			}
		});
	}
}

function getOrganDonorConsentFromById(consentFormId) {
	if(consentFormId !=undefined && consentFormId!=null && consentFormId!="" && consentFormId!="null"){
		var inputs = [];
		inputs.push('consentFormId=' + consentFormId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organDonorConsentForm/editOrganDonorConsentForm",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				setAllDonorConsentForm(r, "search");
				clearOrganDonorConsentForm();
			}
	
		});
	}
}


function toggleEntryDivOrganDonorConsentForm() {
	$("#divForEntryOrganDonorConsentForm").toggle('slow');
}

function sendCheckupListToConsentForm(donorId,treatmentId,checkupListId){
	window.location.href = "odt_organ_donor_consent_form.jsp?" + "donorId=" + encodeURIComponent(donorId)+ "&treatmentId=" + encodeURIComponent(treatmentId)+ "&checkupListId=" + encodeURIComponent(checkupListId);
}

function getDateWithTime(date) {
	var date1;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	var hours = formattedDate.getHours();
	var minute = formattedDate.getMinutes();
	var seconds = formattedDate.getSeconds();
	date1 = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2) + " "+ hours + ":" +('0' + minute).slice(-2)+ ":" +('0' + seconds).slice(-2);
	//datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2);
	console.log("Datee >> " + date1);
	return date1;
}
function clearOrganDonorConsentForm(){
	
	$('#consent_form_title').val("");
	$('#consent_form_first_name').val("");
	$('#consent_form_middle_name').val("");
	$('#consent_form_last_name').val("");
	$('#consent_form').val("");
	$('#consent_form_sign_by_name').val("");
	$('#consent_form_relation option:selected').val(0);
	$('#consent_form_remarks').val("");
	$('#searchConsentFromId').val("");
	$('#consentFormId').val("");
}

// this is related to organ stock inward by Vishnu

function saveOrganDonorStockInward(){
	
	var stockInwardId = $('#stockInwardId').val();
	var organCollectionId = $('#organCollectionId').val();
	var treatmentId = $('#stockInwardTreatmentId').val();
	var organDonorId = $('#organDonorId').val();
	var checkupListId = $('#stockInwardCheckupListId').val();
		var stockinwar_dorgan_id  = $('#stockinwar_dorgan_name option:selected').val();
	var stockinwar_dorgan_name  = $('#stockinwar_dorgan_name option:selected').text();
	var containerName=organCollectionId +"-"+treatmentId+"-"+stockinwar_dorgan_name;
	
	if(organCollectionId=="" || organCollectionId == undefined || organCollectionId == "undefined" || organCollectionId==0){
		alert("Please select container");
		return false;
	}
	var stockinward_date_of_collection = $('#stockinward_date_of_collection').val();
	if(stockinward_date_of_collection=="" || stockinward_date_of_collection == undefined || stockinward_date_of_collection == "undefined"){
		alert("Please enter collection date");
		return false;
	}
	
	var stockinward_title = $('#stockinward_title option:selected').val();
	if(stockinward_title == "select" || stockinward_title=="" || stockinward_title==0){
		alert("Please select title");
		return false;
	}
	
	var stockinward_first_name = $('#stockinward_first_name').val();
	if(stockinward_first_name == "" || stockinward_first_name == undefined || stockinward_first_name == "undefined"){
		alert("Please enter first name");
		return false;
	}
	var stockinward_middle_name = $('#stockinward_middle_name').val();
//	if(stockinward_middle_name=="" || stockinward_middle_name == undefined || stockinward_middle_name == "undefined"){
//		alert("Please enter middle name");
//		return false;
//	}

	var stockinward_last_name = $('#stockinward_last_name').val();
	if(stockinward_last_name=="" || stockinward_last_name == undefined || stockinward_last_name == "undefined"){
		alert("Please enter last name");
		return false;
	}
	
	var stockinward_blood_groupId = $('select#stockinward_blood_group option:selected').val();
	var stockinward_blood_group = $('select#stockinward_blood_group option:selected').text();
	if(stockinward_blood_groupId=="" || stockinward_blood_groupId == undefined || stockinward_blood_groupId == "undefined" || stockinward_blood_groupId==0){
		alert("Please select blood group");
		return false;
	}
	

	
	if(stockinwar_dorgan_id=="" || stockinwar_dorgan_id ==undefined || stockinwar_dorgan_id =="undefined" || stockinwar_dorgan_id==0){
		alert("Please select organ name");
		return false;
	}
		
	var stockinward_body_typeId = $("select#stockinward_body_type option:selected").val();
	var stockinward_body_type = $("select#stockinward_body_type option:selected").text();
	if(stockinward_body_typeId=="" || stockinward_body_typeId ==undefined || stockinward_body_typeId =="undefined" || stockinward_body_typeId==0){
		alert("Please select body type");
		return false;
	}
	
	var bodySize = $("#bodySize").val(); 
	if(bodySize=="" || bodySize ==undefined || bodySize =="undefined" || bodySize==0){
		alert("Please enter size");
		return false;
	}
	
	var stockinward_qty = $("#stockinward_qty").val();
	if(stockinward_qty=="" || stockinward_qty ==undefined || stockinward_qty =="undefined" || stockinward_qty==0){
		alert("Please enter qty");
		return false;
	}
	
	var stockinward_inward_date1 = ($("#stockinward_inward_date").val()).split("/");
	var stockinward_inward_date = (stockinward_inward_date1[2] + "/" + stockinward_inward_date1[1] + "/" + stockinward_inward_date1[0]);
	if(stockinward_inward_date=="" || stockinward_inward_date ==undefined || stockinward_inward_date =="undefined" || stockinward_inward_date==0){
		alert("Please enter inward date");
		return false;
	}
	
	var stockinward_preservationId = $("select#stockinward_preservation option:selected").val();
	var stockinward_preservation = $("select#stockinward_preservation option:selected").text();
	if(stockinward_preservationId=="" || stockinward_preservationId ==undefined || stockinward_preservationId =="undefined" || stockinward_preservationId==0){
		alert("Please select preservation method");
		return false;
	}

	var stockinward_cold_ischemia_timeId = $("#stockinward_cold_ischemia_time option:selected").val();
	var stockinward_cold_ischemia_time = $("select#stockinward_cold_ischemia_time option:selected").text();
	//var stockinward_cold_ischemia_time = $("select#stockinward_cold_ischemia_time option:selected").text();
	if(stockinward_cold_ischemia_timeId=="" || stockinward_cold_ischemia_timeId ==undefined || stockinward_cold_ischemia_timeId =="undefined" || stockinward_cold_ischemia_timeId==0){
		alert("Please select cold ischemia time");
		return false; 
	}
	
	var stockinward_expiry_date1 = ($("#stockinward_expiry_date").val()).split("/");
	var stockinward_expiry_date = (stockinward_expiry_date1[2] + "/" + stockinward_expiry_date1[1] + "/" + stockinward_expiry_date1[0]);
	if(stockinward_expiry_date=="" || stockinward_expiry_date ==undefined || stockinward_expiry_date =="undefined" || stockinward_expiry_date==0){
		alert("Please enter expiry date");
		return false; 
	}

	
	
	if(treatmentId == "" || treatmentId == 0 || treatmentId==undefined){
		alert("Please check treatment id");
		return false;
	}
	
	if(organDonorId == "" || organDonorId == 0 || organDonorId==undefined){
		alert("Please select organ donor");
		return false;
	}
	
	var stockinward_remarks = $('#stockinward_remarks').val();
	if(stockinward_remarks=="" || stockinward_remarks ==undefined || stockinward_remarks =="undefined"){
		alert("Please enter stock inward remarks");
		return false;
	}
	
 //	document.getElementById("primeLoader").style.display = "block";
 //	$('#primeLoader').style.display = "block";
	
	var inputs = [];	
	
	inputs.push('stockInwardId=' +encodeURIComponent(parseInt(stockInwardId)));
	inputs.push('title=' + encodeURIComponent(stockinward_title));
	inputs.push('donorFName=' + encodeURIComponent(stockinward_first_name));
	inputs.push('donorMName=' + encodeURIComponent(stockinward_middle_name));
	inputs.push('donorLName=' + encodeURIComponent(stockinward_last_name));
	inputs.push('organId=' + encodeURIComponent(parseInt(stockinwar_dorgan_id)));
	inputs.push('dorganName=' + encodeURIComponent(stockinwar_dorgan_name));
	inputs.push('preservationMethodId=' + encodeURIComponent(stockinward_preservationId));
	inputs.push('preservationMethod=' + encodeURIComponent(stockinward_preservation));
	inputs.push('collectionDateTime=' + encodeURIComponent(stockinward_date_of_collection));
	inputs.push('stockInwardDateTime=' + encodeURIComponent(stockinward_inward_date));
	inputs.push('coldIschemiaTimeId=' + encodeURIComponent(stockinward_cold_ischemia_timeId));
	inputs.push('coldIschemiaTime=' + encodeURIComponent(stockinward_cold_ischemia_time));
	inputs.push('bloodGroupId=' + encodeURIComponent(stockinward_blood_groupId));
	inputs.push('bloodGroup=' + encodeURIComponent(stockinward_blood_group));
	inputs.push('bodyTypeId=' + encodeURIComponent(stockinward_body_typeId));
	inputs.push('bodyType=' + encodeURIComponent(stockinward_body_type));
	inputs.push('organSize=' + encodeURIComponent(bodySize));
	inputs.push('stockInwardExpiryDate=' + encodeURIComponent(stockinward_expiry_date));
	inputs.push('organQuantity=' + encodeURIComponent(stockinward_qty));
	inputs.push('organAvailableQuantity=' + encodeURIComponent(stockinward_qty));
	inputs.push('remark=' +encodeURIComponent(stockinward_remarks));
	
	inputs.push('organDonorId= '+encodeURIComponent(organDonorId));
	inputs.push('organCollectionId=' + encodeURIComponent(organCollectionId));
	inputs.push('treatmentId=' + encodeURIComponent(treatmentId));
		inputs.push('containerName=' + containerName);
	var str = inputs.join('&');
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/organDonorStockInward/saveOrganDonorStockInward",
		data	: str + "&reqType=AJAX",
		error : function() {
			alertify.error('Network Issue');
		},
		success : function(data) {
			if (data == 1) {
				alertify.success("Stock Inward saved sucessfully");
				clearOrganDonorStockInward();
				getAllDonorStockInward();
				
				location.reload(true);
			}else if (data == 2) {
				alertify.success("Stock Inward updated sucessfully");
				clearOrganDonorStockInward();
				getAllDonorStockInward();
				
				location.reload(true);
			}
			
			// document.getElementById("primeLoader").style.display = "none";
		}
	});	

}


function editOrganDonorStockInward(stockInwardId) {
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
				
		//		alert(JSON.stringify(r));

				
				$('#searchstockInwardId').val('');
				$("#divForNewDonorReg").show('slow');
				$('#organDonorId').val(r.organDonationRegistrationDto.id);
				$('#stockInwardId').val(r.stockInwardId);
				$('#stockInwardTreatmentId').val(r.organDonorTreatment.organDonorTreatmentId);
				$('#organCollectionId').val(r.organCollectionDto.organCollectionId);
				
		//		$('select#stockinward_container_name').val(r.organCollectionDto.organCollectionId);
				
				// contaier name fetch problem fix, aniket 6 SEPT 22
				var listContainer = ""; 
				listContainer = listContainer + "<option value='"+r.organCollectionDto.organCollectionId+"' class='un'>" + (r.organCollectionDto.organCollectionId +"-" +r.organDonorTreatment.organDonorTreatmentId +"-" +r.dorganName) + "</option>";
			    $("#stockinward_container_name").html(listContainer);
			    $("#stockinward_container_name").prop('disabled', true);
			    
				
				
				$("#select stockinward_title").val(r.title);
				$("#stockinward_first_name").val(r.donorFName);
				$("#stockinward_middle_name").val(r.donorMName);
				$("#stockinward_last_name").val(r.donorLName);
				$('#stockinward_date_of_collection').val(r.collectionDateTime);
				$('select#stockinward_blood_group').val(r.bloodGroupId);
				$("#stockinwar_dorgan_name").select2("val",r.organId);
				$("select#stockinward_body_type").select2("val",r.bodyTypeId); 
				$("#bodySize").val(r.organSize); 
				$("#stockinward_qty").val(r.organQuantity);
				$("#stockinward_inward_date").val(r.stockInwardExpiryDate);
				$("select#stockinward_preservation").select2("val",r.preservationMethodId); 
				$("#stockinward_cold_ischemia_time").select2('val',r.coldIschemiaTime); //Added By Annapurna
				$("select#stockinward_cold_ischemia_time").select2("val",r.coldIschemiaTimeId);
				$("#stockinward_expiry_date").val(r.stockInwardExpiryDate);
				$("#stockinward_remarks").val(r.remark);
			}
		});
	}
}

function getAllDonorStockInward() {
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
		url : "ehat/organDonorStockInward/getAllOrganDonorStockInward",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllDonorStockInward(r, "All");
		}
	});
}


function setAllDonorStockInward(r, CallFrom) {
	
//	alert("--setAllDonorStockInward--");
//	return false;

	var htm = "";
	var index = 1;
	if(r !="" && r!=undefined){
		if (CallFrom == "All") {
			for ( var i = 0; i < r.lstOrganDonorStockInwardDto.length; i++) {
				
				var expirydate =new Date(r.lstOrganDonorStockInwardDto[i].stockInwardExpiryDate).toLocaleString('en-GB');
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorStockInwardDto[i].stockInwardId
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorStockInwardDto[i].organCollectionId+"-"+r.lstOrganDonorStockInwardDto[i].donorTreatmentId+"-"+r.lstOrganDonorStockInwardDto[i].dorganName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorStockInwardDto[i].donorFName+" "+r.lstOrganDonorStockInwardDto[i].donorMName+" "+r.lstOrganDonorStockInwardDto[i].donorLName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorStockInwardDto[i].bodyType
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorStockInwardDto[i].dorganName
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorStockInwardDto[i].preservationMethod
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorStockInwardDto[i].coldIschemiaTime
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorStockInwardDto[i].organQuantity
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.lstOrganDonorStockInwardDto[i].organAvailableQuantity
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						//+ getDateWithTime(r.lstOrganDonorStockInwardDto[i].stockInwardExpiryDate)
						+ expirydate
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editOrganDonorStockInward('
						+ r.lstOrganDonorStockInwardDto[i].stockInwardId
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
//						+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganDonorStockInward('
//						+ r.lstOrganDonorStockInwardDto[i].stockInwardId
//						+ ')><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';
				index++;
			}
		} else if (CallFrom == "search") {
			
			var expirydate =new Date(r.stockInwardExpiryDate).toLocaleString('en-GB');
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.stockInwardId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.organCollectionDto.organCollectionId+"-"+r.organDonorTreatment.organDonorTreatmentId+"-"+r.dorganName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.organDonationRegistrationDto.prefix+" "+r.organDonationRegistrationDto.firstName+" "+r.organDonationRegistrationDto.middleName+" "+r.organDonationRegistrationDto.lastName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.bodyType
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.organCollectionDto.collectionDateTime
					+ '</td>'
				
					+ ' <td class="col-md-1 center">'
					+ r.dorganName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.preservationMethod
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.coldIschemiaTime
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.organQuantity
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.organAvailableQuantity
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					//+ getDateWithTime(r.stockInwardExpiryDate)
					+ expirydate
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editOrganDonorStockInward('
					+ r.stockInwardId
					+ ')><i class="fa fa-edit"></i></button></td>'
//					+ ' <td class="col-md-1 center">'
//					+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganDonorStockInward('
//					+ r.stockInwardId
//					+ ')><i class="fa fa-trash-o"></i></button></td>'
					+ '</tr>';
			index++;
		}
	}
	$("#organDonorStockInwardDetails").html(htm);
}

function deleteOrganDonorStockInward(stockInwardId) {
	
	if(stockInwardId !=undefined && stockInwardId!=null && stockInwardId!="" && stockInwardId!="null"){
		var r = confirm("Are You Sure You Want To Delete Stock Inward Detail");
		if (r == true) {
			jQuery.ajax({
				type : "POST",
				url : "ehat/organDonorStockInward/deleteOrganDonorStockInward",
				data : {
					"stockInwardId" : stockInwardId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(response) {
					alertify.error(response);
					getAllDonorStockInward();
				}
			});
		}
	}
}

function organDonorStockInwardAutoSuggestion(inputID){
	var callFrom =  $("#searchType").val();
	if(callFrom == 0){
		alert("Please select search type");
		return false;
	}
	var resultData = [];
	var stockInwardId = $("#" + inputID).val();

	if (stockInwardId == "" || stockInwardId == null || stockInwardId == "null"
			|| stockInwardId == undefined) {
		alert("Please enter search value");
		$("#" + inputID).focus();
		getAllDonorStockInward();
		return false;
	}

	var inputs = [];
	inputs.push('stockInwardId=' + stockInwardId);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/organDonorStockInward/organDonorStockInwardAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstOrganDonorStockInwardDto.length; j++) {
				var arrValue = response.lstOrganDonorStockInwardDto[j].stockInwardId
						+ "-" + response.lstOrganDonorStockInwardDto[j].donorFName+" "+response.lstOrganDonorStockInwardDto[j].donorMName+" "+response.lstOrganDonorStockInwardDto[j].donorLName;
				var idValue = response.lstOrganDonorStockInwardDto[j].stockInwardId;
				var donorName = response.lstOrganDonorStockInwardDto[j].donorFName+" "+response.lstOrganDonorStockInwardDto[j].donorMName+" "+response.lstOrganDonorStockInwardDto[j].donorLName;
				resultData.push({
					ID : idValue,
					Name : donorName,
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
		var stockInwardId = res[0];
		var donorName = res[1];
		if(stockInwardId !=undefined && stockInwardId!=null && stockInwardId!="" && stockInwardId!="null"){
			getOrganDonorStockInwardById(stockInwardId);
		}
		$("input#" + inputID).val(donorName);
	}

}

function getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId(organDonorId,checkupListId,treatmentId){
	
	if(organDonorId !=undefined && organDonorId!=null && organDonorId!="" && organDonorId!="null" && checkupListId !=undefined && checkupListId!=null && checkupListId!="" && checkupListId!="null" && treatmentId !=undefined && treatmentId!=null && treatmentId!="" && treatmentId!="null"){
		var inputs = [];
		inputs.push('organDonorId=' + organDonorId);
		inputs.push('checkupListId=' + checkupListId);
		inputs.push('treatmentId=' + treatmentId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organDonorStockInward/getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				 $("#consentFormCheckupListId").val(r.checkupListId);
			}
		});
	}
}

function getOrganDonorByIdInStockInward(organDonorId) {
	
	if(organDonorId !=undefined && organDonorId!=null && organDonorId!="" && organDonorId!="null"){
		var inputs = [];
		inputs.push('id=' + organDonorId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organDonorCheckupList/getOrganDonorById",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				 $("#stockinward_first_name").val(r.firstName);
				 $("#stockinward_middle_name").val(r.middleName);
				 $("#stockinward_last_name").val(r.lastName);
				 $("#organDonorId").val(r.id);
				 $("#title_stockInward option:selected").text(r. prefix);
				 $("#title_stockInward option:selected").val(r. prefix);
				 $("#divForEntryOrganDonorStockInward").toggle('slow');
			}
		});
	}
}

function donorStockInwardSearchById() {
	var stockInwardId = $("#stockInwardSearchId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(stockInwardId)) {
		alert("Please Enter Number Only!");
		return false;
	}
	getOrganDonorStockInwardById(stockInwardId);
}


function getOrganDonorStockInwardById(stockInwardId) {
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
				setAllDonorStockInward(r, "search");
				clearOrganDonorStockInward();
			}
	
		});
	}
}

function getContainerList(){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/organDonorStockInward/getContainerList",
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
    for ( var i = 0; i < r.listOrganCollectionDto.length; i++) {  

        list = list + "<option value='"+r.listOrganCollectionDto[i].organCollectionId+"' class='un'>" + (r.listOrganCollectionDto[i].organCollectionId+"-"+r.listOrganCollectionDto[i].organDonorTreatment.organDonorTreatmentId+"-"+r.listOrganCollectionDto[i].organName) + "</option>";    
    }  
	$('#stockinward_container_name').html(list);
}

function getOrganCollectionById(){
	var organContainer = $('select#organContainer option:selected').val();
	if(organContainer !=undefined && organContainer!=null && organContainer!="" && organContainer!="null"){
		var inputs = [];
		inputs.push('organCollectionId=' + organContainer);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organDonorStockInward/getOrganCollectionById",
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

function getOnSelectOrganCollectionById(){
	var organContainer = $('select#organContainer option:selected').val();
	
//	alert("stockinwardContainerId---" + stockinwardContainerId);
//	return;
	
	if(organContainer !=undefined && organContainer!=null && organContainer!="" && organContainer!="null"){
		
		var inputs = [];
		inputs.push('organCollectionId=' + organContainer);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organDonorStockInward/getOnSelectOrganCollectionById",
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

function setSearchType(){
	
	$("#stockInwardSearchId").val("");
	var searchType = $("#searchType").val();
	
	if(searchType == 1){
		
		$("#stockInwardSearchId").attr("placeholder", "Type Donor Id Here");
		
	}else if(searchType == 2){
		
		$("#stockInwardSearchId").attr("placeholder", "Type Stock Inward id Here");
	}
}


function setOrganCollection(r){
	
//	alert(JSON.stringify(r));
//	alert(r.collectionDateTime);
	
	$('#prefix').val(r.prefix);
	$('#stockinward_first_name').val(r.firstName);
	$('#stockinward_middle_name').val(r.middleName);
	$('#stockinward_last_name').val(r.lastName);
	$('#stockInwardTreatmentId').val(r.organDonorTreatment.organDonorTreatmentId);
	$('#organCollectionId').val(r.organCollectionId);
	$('#organDonorId').val(r.organDonationRegistrationDto.id);
	$('#stockInwardCheckupListId').val(r.donorCheckupList.checkupListId);
	
	$('#stockinward_date_of_collection').val(r.collectionDateTime);
//	$('#stockinward_date_of_collection').text(r.collectionDateTime);
	
	$("#stockinwar_dorgan_name").select2("val",r.organId);
	$('select#stockinward_blood_group').val(r.bloodGroupId);
	$("#stockinward_qty").val(r.organQuantity);
	$("#bodySize").val(r.bodySize); 
	$("select#stockinward_body_type").select2("val",r.bodyTypeId); 
	$("select#stockinward_preservation").select2("val",r.preservationMethodId); 
	$("select#stockinward_cold_ischemia_time").select2("val",r.coldIschemiaTimeId);
	$("#stockinward_remarks").val(r.remark);
}

function toggleEntryDivOrganDonorStockInward() {
	$("#divForEntryOrganDonorStockInward").toggle('slow');
}


function clearOrganDonorStockInward(){
	$('select#stockinward_title').val("select");
	$('#stockinward_first_name').val("");
	$('#stockinward_middle_name').val("");
	$('#stockinward_last_name').val("");
	$('#stockInwardTreatmentId').val(0);
	$('#organCollectionId').val(0);
	$('#organDonorId').val(0);
	$('#stockInwardCheckupListId').val(0);
	$('#stockinward_date_of_collection').val(0);
	$("#stockinwar_dorgan_name").select2("val",0);
	$('select#stockinward_blood_group').val(0);
	$("#stockinward_qty").val();
	$("#bodySize").val(); 
	$("select#stockinward_body_type").select2("val",0);
	$("select#stockinward_preservation").select2("val",0);
	$("select#stockinward_cold_ischemia_time").select2("val",0);
	$("#stockinward_remarks").val(0);
}

function getOrganDonorTreatmentStatus(){
	var stockinwardContainerId = $('select#stockinward_container_name option:selected').val();
	if(stockinwardContainerId !=undefined && stockinwardContainerId!=null && stockinwardContainerId!="" && stockinwardContainerId!="null"){
		var inputs = [];
		inputs.push('organCollectionId=' + stockinwardContainerId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organDonor/getOrganDonorTreatmentStatus",
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
    $("#body_type").html(list);
    $('#body_type').select2();
    $("#stockinward_body_type").html(list);
    $('#stockinward_body_type').select2();
}

function getAllOrgansFromTreatment(treatmentId){
	if(treatmentId !=undefined && treatmentId!=null && treatmentId!="" && treatmentId!="null"){
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/organdonor/getAllOrgansAgainstTreatment",
			data : str + "&reqType=AJAX",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function(e) {
				//alert('error');
			},
			success : function(r) {
				setOrgansToDropDown(r);
			}
		});
	}
}

function setOrgansToDropDown(r){
	var list = "";  
	list = list + "<option value='0'> - Select Organ - </option>";
    for ( var i = 0; i < r.lstIntendOrganDonorMasterDto.length; i++) {  
        list = list + "<option value='"+r.lstIntendOrganDonorMasterDto[i].intendId+"' class='un'>" + (r.lstIntendOrganDonorMasterDto[i].intendOrganDonor) + "</option>";    
    }  
   // $('#select_organ_name').select2();
   // $("#select_organ_name").html(list);
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
    $("#stockinward_cold_ischemia_time").html(list);
    $('#stockinward_cold_ischemia_time').select2();
}

function getAllPreservationMethodMaster() {
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/preservationMethodMaster/getAllPreservationMethodMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllPreservationMethodList(r);
		}
	});
}

function setAllPreservationMethodList(r){
	var list = "";  
	list = list + "<option value='0'> - Preservation Method - </option>";
    for ( var i = 0; i < r.lstPreservationMethodMasterDto.length; i++) {  
        list = list + "<option value='"+r.lstPreservationMethodMasterDto[i].preservationMethodMasterId+"' class='un'>" + (r.lstPreservationMethodMasterDto[i].preservationMethodName) + "</option>";    
    }  
    $("#stockinward_preservation").html(list);
    $('#stockinward_preservation').select2();
    
}


function setCallFrom(call){
	
	$("#callFrom").val(call);
	$("#donorSearchId").val(" ");
	$("#donorSearchName").val(" ");
	$("#searchType").val(0);
	if(call == "Exit"){
		
		$("#saveDiv").hide();
		$("#divForNewDonorReg").hide();
		clearOrganDonorForm();
		clearDonorForm();
	}else{
		$("#saveDiv").show();
		$("#divForNewDonorReg").hide();
		clearOrganDonorForm();
		clearDonorForm();
	}
	
	
}

function donorsAutoSuggestionForTreat(inputID) {
	
	//	alert("this is the search function-- 03 DEC Aniket");
	
	var callFrom =  $("#searchType").val();
	if(callFrom == 0){
		alert("Please select search type");
		return false;
	}
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	
//	var patSearchType = $("#searchType").val();
//	alert(patSearchType + " " + findingName);
//	return false;
	
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		
		alert("Please enter search value");
		$("#" + inputID).focus();
		return false;
	}
	
	var inputs = [];	
	inputs.push('findText=' + findingName);	
//	inputs.push('patSearchType=' + patSearchType);		
	inputs.push('callFrom=' + callFrom);		
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/organdonor/donorTreatAutoSuggestion",
		cache : false,		
		success : function(r) {
			var template = "";
			
			
			
					for ( var j = 0; j < r.listOrganDonorTreatmentDto.length; j++) {
						
					//	alert( r.listOrganDonationRegistrationDto[j].id +"-"+r.listOrganDonationRegistrationDto[j].donorName +"-"+r.listOrganDonationRegistrationDto[j].mobile);
						
						var arrValue = r.listOrganDonorTreatmentDto[j].organDonorTreatmentId +"-"+r.listOrganDonorTreatmentDto[j].donorName +"-"+r.listOrganDonorTreatmentDto[j].mobile+"-"+r.listOrganDonorTreatmentDto[j].donorId;
						var idValue = r.listOrganDonorTreatmentDto[j].organDonorTreatmentId;
						var donorName = r.listOrganDonorTreatmentDto[j].donorName;
						resultData.push({
							ID : idValue,
							Name : donorName
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}
					
			setTimeout(function() {

				$("div#odt_Doc_name .typeahead").html(template);
				$("div#odt_Doc_name .typeahead").show();

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
		var donorId = res[0];
		var donorName = res[1];
		//var patMobile = res[2];
		
	//	alert("donorId :" + donorId + " donorName :"  + donorName);
		
		$("#" + inputID).val(donorName);	
		
	
		
		getDonarTreatment(donorId);
	
		
	}
}

function getDonarTreatment(donorId){
		var inputs = [];
		inputs.push('organTreatId=' + donorId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			url : "ehat/organdonor/editOrganDonorTreatment",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				

				var htm = "";
				var index = 1;
				
					
						htm = htm
								+ '<tr> '
								+ ' <td class="col-md-1 center">'
								+ index
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.organDonorTreatmentId
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.organDonationRegistrationDto.id
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ r.prefix +" "+ r.firstName +" "+ r.middleName +" "+ r.lastName 
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-success" onclick=editOrganDonorTreatment('
								+ r.organDonationRegistrationDto.id+","+r.organDonorTreatmentId
								+ ')><i class="fa fa-edit"></i></button></td>'
								+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganDonorTreatment('
								+ r.organDonorTreatmentId	
								+ ')><i class="fa fa-trash-o"></i></button></td>'
								
								if(r.isCheckup == "Y"){
									htm = htm + ' <td class="col-md-1 center">'
							//	+ '	<button class="btn btn-xs btn-info"  disabled   onclick=sendDonorToCheckupList('
								+ '	<button class="btn btn-xs btn-info"   onclick=sendDonorToCheckupList('
								+ r.organDonationRegistrationDto.id+","+r.organDonationRegistrationDto.patientId+","+r.organDonorTreatmentId
								+ ')><i class="fa fa-cloud-upload"></i></button></td>'
								}else{
									htm = htm + ' <td class="col-md-1 center">'
									+ '	<button class="btn btn-xs btn-info" onclick=sendDonorToCheckupList('
									+ r.organDonationRegistrationDto.id+","+r.organDonationRegistrationDto.patientId+","+r.organDonorTreatmentId
									+ ')><i class="fa fa-cloud-upload"></i></button></td>'
								}
								
						htm = htm
								+ '</tr>';
						
					
			
				$("#organDonorsTreatmentListDetails").html(htm);

				
			}
		});
	

	
}


function getOrganTreatmentListOnCheckupList(){

	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/organdonor/getAllDonorsTreatmentList",
		data : str + "&reqType=AJAX",
//		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setOrganTreatListOnCheckupList(r);
		}
	});

}

function setOrganTreatListOnCheckupList(r){

	var htm = "";
	var index = 1;
	
		for ( var i = 0; i < r.listOrganDonorTreatmentDto.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganDonorTreatmentDto[i].organDonorTreatmentId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganDonorTreatmentDto[i].organDonationRegistrationDto.id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.listOrganDonorTreatmentDto[i].organDonationRegistrationDto.prefix +" "+ r.listOrganDonorTreatmentDto[i].organDonationRegistrationDto.firstName +" "+ r.listOrganDonorTreatmentDto[i].organDonationRegistrationDto.middleName +" "+ r.listOrganDonorTreatmentDto[i].organDonationRegistrationDto.lastName 
					+ '</td>'
					/*+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=editOrganDonorTreatment('
					+ r.listOrganDonorTreatmentDto[i].organDonationRegistrationDto.id+","+r.listOrganDonorTreatmentDto[i].organDonorTreatmentId
					+ ')><i class="fa fa-edit"></i></button></td>'*/
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" onclick=deleteOrganDonorTreatment('
					+ r.listOrganDonorTreatmentDto[i].organDonorTreatmentId	
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-info" onclick=sendDonorToCheckupList('
					+ r.listOrganDonorTreatmentDto[i].organDonationRegistrationDto.id+","+r.listOrganDonorTreatmentDto[i].organDonationRegistrationDto.patientId+","+r.listOrganDonorTreatmentDto[i].organDonorTreatmentId
					+ ')><i class="fa fa-cloud-upload"></i></button></td>'
					+ '</tr>';
			index++;
		}
	
	$("#organDonorCheckupListDetails").html(htm);

	
}


function viewConsernDocument(index , consernFormId){
	
	var document = $("#hiddenDocid"+index).val();
	
	if(document ==null || document =="" || document ==undefined){
		alert("No File To View First Upload And Save file");
	}else{
		$('#ViewDocumemnt').attr("src","ehat/organDonorConsentForm/viewOpdDocuments?documentId="+consernFormId+"&fileName="+document);
		$('#viewDocModal').modal('show');
		
		
		//$('#documentComment').html(note);
		
		
	}
}


function setLength(){
	
	$("#identityCard").val("");
	var patSearchType = $("#proofId").val();
	
	if(patSearchType == 1){
		
		$("#identityCard").attr("placeholder", "Type Aaddhar card Here");
		$("#identityCard").attr("maxlength", "12");
		
	}else if(patSearchType == 2){
		
		$("#identityCard").attr("placeholder", "Type Pan card Here");
		$("#identityCard").attr("maxlength", "10");
		
	}else if(patSearchType == 3){
		
		$("#identityCard").attr("placeholder", "Type Passport Here");
		$("#identityCard").attr("maxlength", "12");
	}else if(patSearchType == 4){
		
		$("#identityCard").attr("placeholder", "Type License Here");
		$("#identityCard").attr("maxlength", "16");
	}else if(patSearchType == 5){
		
		$("#identityCard").attr("placeholder", "Type Other Here");
		$("#identityCard").attr("maxlength", "10");
	}
	
}

function refreshDonarName(){
	
	$("#donorSearchId").val(" ");
	$("#donorSearchName").val(" ");
}

//Added By Annapurna
function getContainerListForOrgan_StockInward()
{
	$.ajax({
		type : "GET",
		url : "ehat/organDonorStockInward/getContainerListForOrgan_StockInward",
		async : false,
		error : function() {
			alert("Something Went Wrong!!")
		},
		success : function(r) {
			setContainersListForStockInward(r);
		}
	});
}


function setContainersListForStockInward(r){
//	alert("length"+r.listOrganCollectionDto.length );
	var list = "";  
	list = list + "<option value='0'> - Select Container - </option>";
    for ( var i = 0; i < r.listOrganCollectionDto.length; i++) {  

        list = list + "<option value='"+r.listOrganCollectionDto[i].organCollectionId+"' class='un'>" + (r.listOrganCollectionDto[i].organCollectionId+"-"+r.listOrganCollectionDto[i].organDonorTreatment.organDonorTreatmentId+"-"+r.listOrganCollectionDto[i].organName) + "</option>";    
    }  
	$('#organContainer').html(list);
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

