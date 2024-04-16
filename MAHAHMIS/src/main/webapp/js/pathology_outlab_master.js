/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @codeFor : set All state Master Detail
 ******************************************************************************/
function getAllStateMaster() {
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/inventoryM/getAllStateMaster",
		error : function() {
			alert('error');
		},
		success : function(r) {
			var divContent = "";
			divContent = divContent
				+ "<select name='State Name' class='col-md-12'><option value='0'>--Select State--</option>";
			for ( var i = 0; i < r.stateList.length; i++) {
				divContent = divContent + "<option value='"							
       				+ r.stateList[i].state_ID + "'>"
					+ r.stateList[i].stateName + "</option>";
			}
			divContent = divContent + "</select>";
				$("#stateFromAddress").html(divContent);
				$("#stateFromAddress").select2();
		}
	});
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @codeFor : set All state Master Detail
 ******************************************************************************/
function getAllDistrictByStateId() {
	stateId = $('#stateFromAddress').val();	
	jQuery.ajax({
				async : false,
				type : "GET",
				url : "ehat/inventoryM/getAllDistrictByStateId",
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
					divContent = divContent + "<option value='0'>--Select District--</option>";
					for ( var i = 0; i < r.districtList.length; i++) {
						divContent = divContent + "<option value='"	+ r.districtList[i].district_ID + "'>"+ r.districtList[i].districtName + "</option>";
					}					
						$("#districtFromAddress").html(divContent);
						$("#districtFromAddress").select2();					
				}
			});
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @codeFor : set All state Master Detail
 ******************************************************************************/
function getAllTalukaBydDistictId() {	 
	var	districtId = $('#districtFromAddress').val();		
	jQuery.ajax({
				async : false,
				type : "GET",
				url : "ehat/inventoryM/getAllTalukaBydDistictId",
				data : {
					"districtId" : districtId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					var divContent = "";
					divContent = divContent
							+ "<select name='Taluka Name' class='col-md-12'><option value='0'>--Select Taluka--</option>";
					for ( var i = 0; i < r.talukaList.length; i++) {
						divContent = divContent + "<option value='"	+ r.talukaList[i].taluka_ID + "'>"+ r.talukaList[i].talukaName + "</option>";
					}
					divContent = divContent + "</select>";					
						$("#talukaFromAddress").html(divContent);
						$("#talukaFromAddress").select2();
				}
			});
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @codeFor : set All state Master Detail
 ******************************************************************************/
function getAllCityByTalukaId(inputID) {
	var talukaId = $('#talukaFromAddress').val();	
	jQuery.ajax({
				async : false,
				type : "GET",
				url : "ehat/inventoryM/getAllCityByTalukaId",
				data : {
					"talukaId" : talukaId
				},
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {

					var divContent = "";
					divContent = divContent
							+ "<select name='room Name' class='col-md-12'><option value='0'>---Select City---</option>";

					for ( var i = 0; i < r.cityList.length; i++) {
						divContent = divContent + "<option value='"+ r.cityList[i].city_ID + "'  >"+ r.cityList[i].cityName + "</option>";
					}
					divContent = divContent + "</select>";
						$("#cityFromAddress").html(divContent);
						$("#cityFromAddress").select2();					
				}
			});
}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @codeFor : set All state Master Detail
 ******************************************************************************/
function getSelectedCityName(inputID) {
	
	var hiddenCityName = $("#cityFromAddress option:selected").text();
	document.getElementById("hiddenCityFromPartyMaster").value = hiddenCityName;
}

function getSelectedCountryName(inputID) {
	
	var hiddenCountryName = $("#countryFromAddress option:selected").text();
	document.getElementById("hiddenCountryFromPartyMaster").value = hiddenCountryName;
	
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to reset  General information   .
 ******************************************************************************/
function resetInfoFields(tabType) {
	if (tabType === "generalInfo") {
		$('#generalFormId')[0].reset();
	} else if (tabType === "contactInfo") {
		$('#contactFormId')[0].reset();
	} else if (tabType === "addressInfo") {
		$('#addressFormId')[0].reset();
		$("#countryFromAddress").select2("val", 0);
		$("#stateFromAddress").select2("val", 0);
		$("#districtFromAddress").select2("val", 0);
		$("#talukaFromAddress").select2("val", 0);
		$("#cityFromAddress").select2("val", 0);
	} else if (tabType === "paymentInfo") {
		$('#paymentFormId')[0].reset();
	} else if (tabType === "TermsAndConditionInfo") {
		$('#termsAndConditionsTitle').select2('val', 0);
		$('#termsAndCondition').val('').empty();
	} else if (tabType === "outLabMaster") {
		$('#outlabfromId')[0].reset();
	}
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to add Ganeral information   .
 ******************************************************************************/
function addDynamicRecordsToGeneralInfoTable() {
	
	var tablelength = $('#GeneralInfoTable tbody tr.newAdded').length;
	var id=tablelength+1;
	var generalMobileNo = $("#generalMobileNo").val().trim();
	var generalLandLineNo = $("#generalLandLineNo").val();
	var generalWebSite = $("#generalWebSite").val();
	var generalCompanyMail = $("#generalCompanyMail").val();
	var generalGstNO = $("#generalGstNO").val();
	var generalPanNo = $("#generalPanNo").val();

	if (generalMobileNo != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(generalMobileNo)) {
			alert("Phone1 should be of digits.!");
			$("#generalMobileNo").focus();
			return false;
		}
	}

	if (generalLandLineNo != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(generalLandLineNo)) {
			alert("Phone1 should be of digits.!");
			$("#generalLandLineNo").focus();
			return false;
		}
	}

	if (generalLandLineNo == "") {
		alert("Land Line should not be Empty!");
		$("#generalLandLineNo").focus();
		return false;
	}

	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center" id="generalGstNOId'
			+ id
			+ '">'
			+ generalGstNO
			+ '</td>'
			+ ' <td class="col-md-1 center" id="generalMobileNoId'
			+ id
			+ '">'
			+ generalMobileNo
			+ '</td>'
			+ ' <td class="col-md-1 center" id="generalLandLineNoId'
			+ id
			+ '">'
			+ generalLandLineNo
			+ '</td>'
			+ ' <td class="col-md-1 center" id="generalCompanyMailId'
			+ id
			+ '">'
			+ generalCompanyMail
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="generalWebSiteId'
			+ id
			+ '" style="display:none">'
			+ generalWebSite
			+ '</td>'
			+ ' <td class="col-md-1 center" id="generalPanNoId'
			+ id
			+ '" style="display:none">'
			+ generalPanNo
			+ '</td>'
			+ ' <td class="col-md-1 center" id="generalInfoId'
			+ id
			+ '" style="display:none">'
			+ 0
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="geneInfoId1'
			+ id
			+ '" style="display:none" >'
			+ id
			+ '</td>'
			
			// test1
			+ ' <td class="col-md-1 center"><input type="hidden" id="editGeneralPartMaster'
			+ id
			+ '" value="'
			+ id
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editGeneralInfoPartyMaster('
			+ id
			+ ',\'fromUI\')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id="deleteGeneralPartMaster'
			+ id + '" onclick="deletePartyMasterSlave(' + id
			+ ',\'deleteGeneral\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyGeneralTableInfoList").append(htm);
	$('#generalFormId')[0].reset();
}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to edit Ganeral information   .
 ******************************************************************************/
function editGeneralInfoPartyMaster(id, callFrom) {
	var rows = $('#GeneralInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var generalInfoId = $("#geneInfoId1" + i).text();
		var genInfoIdAdd = $("#generalInfoId" + i).text();
		if (generalInfoId == id || genInfoIdAdd == id) {
			$("#geneInfoIdNew").val($("#generalInfoId" + i).html());
			$("#generalMobileNo").val($("#generalMobileNoId" + i).html());
			$("#generalLandLineNo").val($("#generalLandLineNoId" + i).html());
			$("#generalWebSite").val($("#generalWebSiteId" + i).html());
			$("#generalCompanyMail").val($("#generalCompanyMailId" + i).html());
			$("#generalGstNO").val($("#generalGstNOId" + i).html());
			$("#generalPanNo").val($("#generalPanNoId" + i).html());
			$("#updateGeneralInfo").attr('myid', generalInfoId);
			$("#saveGeneralInfo").hide();
			$("#updateGeneralInfo").show();
			if (callFrom == "fromDB") {
				document.getElementById("saveGeneralInfo").style.display = "none";
				$("#updateGeneralInfo").show();
			} else if (callFrom == "fromUI") {
				$("#updateGeneralInfo").show();
				$("#saveGeneralInfo").hide();
			}

		}
	}
}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to update Ganeral information   .
 ******************************************************************************/
function updateGeneralInfoPartyMaster() {
	var rows = $('#GeneralInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updateGeneralInfo").attr('myid');
		if (id == i) {
			$("#generalInfoId" + i).html($("#geneInfoIdNew").val());
			$("#generalMobileNoId" + i).html($("#generalMobileNo").val());
			$("#generalLandLineNoId" + i).html($("#generalLandLineNo").val());
			$("#generalWebSiteId" + i).html($("#generalWebSite").val());
			$("#generalCompanyMailId" + i).html($("#generalCompanyMail").val());
			$("#generalGstNOId" + i).html($("#generalGstNO").val());
			$("#generalPanNoId" + i).html($("#generalPanNo").val());
			document.getElementById("updateGeneralInfo").style.display = "none";
			$("#updateGeneralInfo").hide();
			 $("#saveGeneralInfo").show();
			
			/*
			 * $("#saveGeneralInfo").hide();
			$("#updateGeneralInfo").show();
			if (callFrom == "fromDB") {
				document.getElementById("saveGeneralInfo").style.display = "none";
				$("#updateGeneralInfo").show();
			} else if (callFrom == "fromUI") {
				$("#updateGeneralInfo").show();
				$("#saveGeneralInfo").hide();
			}
			 */
		}
	}
	resetInfoFields('generalInfo');
}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to delete Ganeral information   .
 ******************************************************************************/
function deletePartyMasterSlave(id, callFrom) {
	var labMasterId = $("#labMasterId").val();
	
	var r = confirm("Are you sure you want to delete this record.");
	if(r){
		if (callFrom === "deleteGeneral") {
			$("#PartyGeneralTableInfoList").on('click','#deleteGeneralPartMaster' + id + '',
					function() {
						var isNew = $("#deleteGeneralPartMaster" + id).attr('isNew');
						if (isNew != undefined && isNew != null && isNew == "false") {
							$(this).closest('tr').remove();
							var inputs = [];
							inputs.push('id=' + id);
							inputs.push('labMasterId=' + labMasterId);
							inputs.push('callFrom=' + callFrom);
							var str = inputs.join('&');
							jQuery.ajax({
								async : true,
								type : "POST",
								url : "ehat/outlabmastercontroller/deleteoutlabslave",
								data : str + "&reqType=AJAX",
								error : function() {
								alert('error');
								},
								success : function(response) {
									alert(response);
								}
							});
						} else {
							$(this).closest('tr').remove();
						}
				});
	} else if (callFrom === "deleteContact") {
		$("#PartyContactTableInfoList")
				.on('click','#deleteContactPartMaster' + id + '',
						function() {
							var isNew = $("#deleteContactPartMaster" + id).attr('isNew');
							if (isNew != undefined && isNew != null && isNew == "false") {
								$(this).closest('tr').remove();
								var inputs = [];
								inputs.push('id=' + id);
								inputs.push('labMasterId=' + labMasterId);
								inputs.push('callFrom=' + callFrom);
								var str = inputs.join('&');
								jQuery.ajax({
											async : true,
											type : "POST",
											url : "ehat/outlabmastercontroller/deleteoutlabslave",
											data : str + "&reqType=AJAX",
											error : function() {
												alert('error');
											},
											success : function(response) {
												alert(response);
											}
										});
							} else {
								$(this).closest('tr').remove();
							}
						});
	} else if (callFrom === "deleteAddress") {
		$("#PartyAddressTableInfoList")
				.on('click','#deleteAddressPartMaster' + id + '',
						function() {
							var isNew = $("#deleteAddressPartMaster" + id).attr('isNew');
							if (isNew != undefined && isNew != null && isNew == "false") {
								$(this).closest('tr').remove();
								var inputs = [];
								inputs.push('id=' + id);
								inputs.push('labMasterId=' + labMasterId);
								inputs.push('callFrom=' + callFrom);
								var str = inputs.join('&');
								jQuery.ajax({
											async : true,
											type : "POST",
											url : "ehat/outlabmastercontroller/deleteoutlabslave",
											data : str + "&reqType=AJAX",
											error : function() {
												alert('error');
											},
											success : function(response) {
												alert(response);
											}
										});
							} else {
								$(this).closest('tr').remove();
							}
						});
	} else if (callFrom === "deletePayment") {
		$("#PartyPaymentInfoTableList").on('click','#deletePaymentPartMaster' + id + '',
						function() {
							var isNew = $("#deletePaymentPartMaster" + id).attr('isNew');
							if (isNew != undefined && isNew != null && isNew == "false") {
								$(this).closest('tr').remove();
								var inputs = [];
								inputs.push('id=' + id);
								inputs.push('labMasterId=' + labMasterId);
								inputs.push('callFrom=' + callFrom);
								var str = inputs.join('&');
								jQuery.ajax({
											async : true,
											type : "POST",
											url : "ehat/outlabmastercontroller/deleteoutlabslave",
											data : str + "&reqType=AJAX",
											error : function() {
												alert('error');
											},
											success : function(response) {
												alert(response);
											}
										});
							} else {
								$(this).closest('tr').remove();
							}
						});
	} else if (callFrom === "deleteTermsAndCondition") {
		$("#TermsAndConditionInfoTableList").on('click', '#deleteTermsAndCondition' + id + '',
						function() {
							var isNew = $("#deleteTermsAndCondition" + id).attr('isNew');
							if (isNew != undefined && isNew != null && isNew == "false") {
								$(this).closest('tr').remove();
								var inputs = [];
								inputs.push('id=' + id);
								inputs.push('labMasterId=' + labMasterId);
								inputs.push('callFrom=' + callFrom);
								var str = inputs.join('&');
								jQuery.ajax({
											async : true,
											type : "POST",
											url : "ehat/outlabmastercontroller/deleteoutlabslave",
											data : str + "&reqType=AJAX",
											error : function() {
												alert('error');
											},
											success : function(response) {
												alert(response);
											}
										});
							} else {
								$(this).closest('tr').remove();
							}
						});
	}else if (callFrom === "deleteOutLab") {
		$("#outlabmastertablelist").on('click', '#deleteOutLabMaster' + id + '',
				function() {
					var isNew = $("#deleteOutLabMaster" + id).attr('isNew');
					if (isNew != undefined && isNew != null && isNew == "false") {
						$(this).closest('tr').remove();
						var inputs = [];
						inputs.push('id=' + id);
						inputs.push('labMasterId=' + labMasterId);
						inputs.push('callFrom=' + callFrom);
						var str = inputs.join('&');
						jQuery.ajax({
									async : true,
									type : "POST",
									url : "ehat/outlabmastercontroller/deleteoutlabslave",
									data : str + "&reqType=AJAX",
									error : function() {
										alert('error');
									},
									success : function(response) {
										alert(response);
									}
								});
					} else {
						$(this).closest('tr').remove();
					}
				});
		}
	}
}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to add Contact information   .
 ******************************************************************************/
function addDynamicRecordsToContactInfoTable(id) {

	var rows = $('#ContactInfoTable tbody tr.newAdded').length;
	var id=rows+1;
	
	var contactPerson = $("#contactPerson").val();
	var contactDesignation = $("#contactDesignation").val();
	var contatcAddress = $("#contatcAddress").val();
	var contactGender = $("#contactGender").val();
	var contactDob = $("#contactDateofbirth").val();
	var contactPhoneOne = $("#contactPhoneOne").val();
	var contactPhoneSecond = $("#contactPhoneSecond").val();
	var contactMail = $("#contactMail").val();
	if (contactPerson == "") {
		alert("Contact Person name should not  be  empty ..!");
		$("#contactPerson").focus();
		return false;
	}
	
	if (contactPhoneOne == "") {
		alert("Contact Phone-1 should not  be  empty ..!");
		$("#contactPhoneOne").focus();
		return false;
	}
	
	if (contactPhoneSecond == "") {
		alert("Contact Phone-2 should not  be  empty ..!");
		$("#contactPhoneSecond").focus();
		return false;
	}

	if (contactPerson != "") {
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(contactPerson)) {
			alert("Contact Person name should be of alphabets only with a single space allowed..!");
			$("#contactPerson").focus();
			return false;
		}
	}

	if (contactPhoneOne != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(contactPhoneOne)) {
			alert("Phone1 should be of digits.!");
			$("#contactPhoneOne").focus();
			return false;
		}
	}

	if (contactPhoneSecond != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(contactPhoneSecond)) {
			alert("Phone2 should be of digits.!");
			$("#contactPhoneSecond").focus();
			return false;
		}
	}
	if (contactMail != "") {
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!filter.test(contactMail)) {
			alert('Please Enter valid Email Id');
			$("#contactMail").focus();
			return false;
		}
	}

	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactPersonId'
			+ id
			+ '">'
			+ contactPerson
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="contactPhoneOneId'
			+ id
			+ '">'
			+ contactPhoneOne
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactPhoneSecondId'
			+ id
			+ '">'
			+ contactPhoneSecond
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="contactDesignationId'
			+ id
			+ '">'
			+ contactDesignation
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contatcAddressId'
			+ id
			+ '">'
			+ contatcAddress
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactGenderId'
			+ id
			+ '" style="display:none">'
			+ contactGender
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactDobId'
			+ id
			+ '" style="display:none">'
			+ contactDob
			+ '</td>'

			+ ' <td class="col-md-1 center" id="contactMailId'
			+ id
			+ '" style="display:none">'
			+ contactMail
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactInfoId'
			+ id
			+ '" style="display:none">'
			+ 0
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactInfoId1'
			+ id
			+ '" style="display:none" >'
			+ id
			+ '</td>'
	 
			
			+ ' <td class="col-md-1 center"><input type="hidden" id="editContactPartMaster'
			+ id
			+ '" value="'
			+ id
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editContactInfoPartyMaster('
			+ id
			+ ',\'fromUI\')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deleteContactPartMaster'
			+ id + '" onclick="deletePartyMasterSlave(' + id
			+ ',\'deleteContact\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyContactTableInfoList").append(htm);
	$('#contactFormId')[0].reset();

}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to edit Contact information   .
 ******************************************************************************/
function editContactInfoPartyMaster(id, callFrom) {
	var rows = $('#ContactInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var contactInfoId = $("#contactInfoId1" + i).text();
		var conInfoIdAdd = $("#contactInfoId" + i).text();
		if (contactInfoId == id || conInfoIdAdd == id) {
			$("#conInfoIdNew").val($("#contactInfoId" + i).html());
			$("#contactPerson").val($("#contactPersonId" + i).html());
			$("#contactDesignation").val($("#contactDesignationId" + i).html());
			$("#contatcAddress").val($("#contatcAddressId" + i).html());
			$("#contactGender").val($("#contactGenderId" + i).html());
			$("#contactDateofbirth").val($("#contactDobId" + i).html());
			$("#contactPhoneOne").val($("#contactPhoneOneId" + i).html());
			$("#contactPhoneSecond").val($("#contactPhoneSecondId" + i).html());
			$("#contactMail").val($("#contactMailId" + i).html());
			$("#updateContactInfo").attr('updateContactInfoId', contactInfoId);
			if (callFrom == "fromDB") {
				document.getElementById("saveContactInfo").style.visibility = "hidden";
				$("#updateContactInfo").show();
			} else if (callFrom == "fromUI") {
				$("#updateContactInfo").show();
				$("#saveContactInfo").hide();
			}
		}
	}
}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to update Contact information   .
 ******************************************************************************/
function updateContactInfoPartyMaster() {
	var rows = $('#ContactInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updateContactInfo").attr('updateContactInfoId');
		if (i == id) {
			$("#contactInfoId" + i).html($("#conInfoIdNew").val());
			$("#contactPersonId" + i).html($("#contactPerson").val());
			$("#contactDesignationId" + i).html($("#contactDesignation").val());
			$("#contatcAddressId" + i).html($("#contatcAddress").val());
			$("#contactGenderId" + i).html($("#contactGender").val());
			$("#contactDobId" + i).html($("#contactDateofbirth").val());
			$("#contactPhoneOneId" + i).html($("#contactPhoneOne").val());
			$("#contactPhoneSecondId" + i).html($("#contactPhoneSecond").val());
			$("#contactMailId" + i).html($("#contactMail").val());
			$("#saveContactInfo").show();
			$("#updateContactInfo").hide();
		}
	}
	resetInfoFields('contactInfo');
}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to Add Address information   .
 ******************************************************************************/
function addDynamicRecordsToAddressInfoTable() {
	
	var rows = $('#AddressInfoTable tbody tr.newAdded').length;
	var id=rows+1;
	var companyName = $("#companyNameFromAddress").val();
	
	var companyArea = $("#areaFromAddress").val();
	var companyCountry = $("#countryFromAddress").val();
	
	var companyState = $("#stateFromAddress").val();
	var companyDistict = $("#districtFromAddress").val();
	var companyTaluka = $("#talukaFromAddress").val();
	var companyCity = $("#cityFromAddress").val();
	var companyStreet = $("#streetFromAddress").val();
	var companyPin = $("#pincodeFromAddress").val();
	var companyAddress = $("#addressFromAddress").val();
	
	var hiddenCountryName = $("#hiddenCountryFromPartyMaster").val();
	var hiddenStateName = $("#hiddenStateFromPartyMaster").val();	
	var hiddenDistrictName = $("#hiddenDistrictFromPartyMaster").val();
	var hiddenTalukaName = $("#hiddenTalukaFromPartyMaster").val();
	var hiddenCityName = $("#hiddenCityFromPartyMaster").val();
	//alert(hiddenCityName);
	if (companyAddress == "") {
		alert("address should not be empty..!");
		$("#addressFromAddress").focus();
		return false;

	}

	if (companyPin != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(companyPin)) {
			alert("Pin code should be of digits only!");
			
			$("#pincodeFromAddress").focus();
			return false;
		}
		var result=checkPincodeLength();
		if(result==1){
			alert("Pincode must be of 6 digits");
			$("#pincodeFromAddress").val('');
			return false;
		}else{
			
		}
	}

	if (hiddenStateName != "") {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(companyState)) {
			alert("State name should be of alphabets only with a single space allowed..!");
			$("#stateFromAddress").focus();
			return false;
		}
	}

	if (companyStreet != "" || companyStreet != null) {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(companyStreet)) {
			alert("Street should be of alphabets and digits only with a single space allowed..!");
			$("#streetFromAddress").focus();
			return false;
		}
	}

	if (hiddenCountryName != "" || hiddenCountryName != null) {
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(hiddenCountryName)) {
			alert("Country should be of alphabets only with a single space allowed..!");
			$("#countryFromAddress").focus();
			return false;
		}
	}
	var companyAddressType = false;

	if ($('#billingAddress').is(":checked") == true) {
		companyAddressType = $("#billingAddress").val();
	}
	if ($('#shippingAddress').is(":checked") == true) {
		companyAddressType = $("#shippingAddress").val();
	}

	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyNameId'
			+ id
			+ '">'
			+ companyName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyCountryId'
			+ id
			+ '">'
			+ hiddenCountryName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyCityId'
			+ id
			+ '">'
			+ hiddenCityName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyAddressId'
			+ id
			+ '" style="display:none">'
			+ companyAddress
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyAddressTypeId'
			+ id
			+ '" style="display:none">'
			+ companyAddressType
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyStreetId'
			+ id
			+ '" style="display:none">'
			+ companyStreet
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyAreaId'
			+ id
			+ '" style="display:none">'
			+ companyArea
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyPinId'
			+ id
			+ '" style="display:none">'
			+ companyPin
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyStateId'
			+ id
			+ '" style="display:none">'
			+ hiddenStateName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyDistrictId'
			+ id
			+ '" style="display:none">'
			+ hiddenDistrictName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyTalukaId'
			+ id
			+ '" style="display:none">'
			+ hiddenTalukaName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="hiddenCountryNameId'
			+ id
			+ '" style="display:none">'
			+ companyCountry
			+ '</td>'
			+ ' <td class="col-md-1 center" id="hiddenStateNameId'
			+ id
			+ '" style="display:none">'
			+ companyState
			+ '</td>'
			+ ' <td class="col-md-1 center" id="hiddenDistrictNameId'
			+ id
			+ '" style="display:none">'
			+ companyDistict
			+ '</td>'
			+ ' <td class="col-md-1 center" id="hiddenTalukaNameId'
			+ id
			+ '" style="display:none">'
			+ companyTaluka
			+ '</td>'
			+ ' <td class="col-md-1 center" id="hiddenCityNameId'
			+ id
			+ '" style="display:none">'
			+ companyCity
			+ '</td>'
			+ ' <td class="col-md-1 center" id="addressInfoId'
			+ id
			+ '" style="display:none">'
			+ 0
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="addressInfoId1'
			+ id
			+ '" style="display:none">'
			+ id
			+ '</td>'
			
			
			+ ' <td class="col-md-1 center"><input type="hidden" id="editAddressPartMaster'
			+ id
			+ '" value="'
			+ id
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editAddressInfoPartyMaster('
			+ id
			+ ',\'fromUI\')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deleteAddressPartMaster'
			+ id + '" onclick="deletePartyMasterSlave(' + id
			+ ',\'deleteAddress\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyAddressTableInfoList").append(htm);
	$('#addressFormId')[0].reset();
	$("#countryFromAddress").select2("val", 0);
	$("#stateFromAddress").select2("val", 0);
	$("#districtFromAddress").select2("val", 0);
	$("#talukaFromAddress").select2("val", 0);
	$("#cityFromAddress").select2("val", 0);

	$("#companyNameFromAddress").val("");
	$("#areaFromAddress").val("");
	$("#streetFromAddress").val("");
	$("#pincodeFromAddress").val("");
	$("#addressFromAddress").val("");
	$("#hiddenCountryFromPartyMaster").val("");
	$("#hiddenStateFromPartyMaster").val("");
	$("#hiddenDistrictFromPartyMaster").val("");
	$("#hiddenTalukaFromPartyMaster").val("");
	$("#hiddenCityFromPartyMaster").val("");

}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to check pin code validate   .
 ******************************************************************************/
function checkPincodeLength(){
	var result="";
	var pincode=$("#pincodeFromAddress").val();
	if(pincode.length < 6) {		
		result=1;
		
	}else{
		result=2;
	}
	return result;
}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to edit Address information   
 ******************************************************************************/
function editAddressInfoPartyMaster(id, callFrom) {
	var rows = $('#AddressInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {

		var addressInfoId = $("#addressInfoId1" + i).text();
		var addInfoIdAdd = $("#addressInfoId" + i).text();
		if (id == addressInfoId || id == addInfoIdAdd) {
			$("#addInfoIdNew").val($("#addressInfoId" + id).html());
			$("#companyNameFromAddress").val($("#companyNameId" + id).html());
			$("#countryFromAddress").select2('val',$("#hiddenCountryNameId" + id).html());
			$("#stateFromAddress").select2('val',$("#hiddenStateNameId" + id).html());
			
			getAllDistrictByStateId('stateFromAddress');
			$("#districtFromAddress").select2('val',$("#hiddenDistrictNameId" + id).html());
			getAllTalukaBydDistictId('districtFromAddress');
			$("#talukaFromAddress").select2('val',$("#hiddenTalukaNameId" + id).html());
			
			getAllCityByTalukaId('talukaFromAddress');
			$("#cityFromAddress").select2('val',$("#hiddenCityNameId" + id).html());
			$("#streetFromAddress").val($("#companyStreetId" + id).html());
			$("#pincodeFromAddress").val($("#companyPinId" + id).html());
			$("#areaFromAddress").val($("#companyAreaId" + id).html());
			$("#addressFromAddress").val($("#companyAddressId" + id).html());

			$("#hiddenCountryFromPartyMaster").val($("#companyCountryId" + id).html());
			$("#hiddenStateFromPartyMaster").val($("#companyStateId" + id).html());
			$("#hiddenDistrictFromPartyMaster").val($("#companyDistrictId" + id).html());
			$("#hiddenTalukaFromPartyMaster").val($("#companyTalukaId" + id).html());
			$("#hiddenCityFromPartyMaster").val($("#companyCityId" + id).html());

			if ($("#companyAddressTypeId" + id).html() === "ShippingAddress") {
				$("#shippingAddress").val($("#companyAddressTypeId" + id).html());
				$('#shippingAddress').prop("checked", true);
				$('#billingAddress').prop("checked", false);
			} else {
				$("#billingAddress").val($("#companyAddressTypeId" + id).html());
				$('#billingAddress').prop("checked", true);
				$('#shippingAddress').prop("checked", false);
			}
			$("#updateAddressInfo").attr('updateAddressInfoId', addressInfoId);
			if (callFrom == "fromDB") {
				document.getElementById("saveAddressInfo").style.visibility = "hidden";
				$("#updateAddressInfo").show();
			} else if (callFrom == "fromUI") {
				$("#updateAddressInfo").show();
				$("#saveAddressInfo").hide();
			}
		}
	}
}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to update Address information   
 ******************************************************************************/
function updateAddressInfoPartyMaster() {
	var rows = $('#AddressInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updateAddressInfo").attr('updateAddressInfoId');
		if (i == id) {
			$("#addressInfoId" + i).html($("#addInfoIdNew").val());
			$("#companyNameId" + i).html($("#companyNameFromAddress").val());
			$("#hiddenCountryNameId" + i).html($("#countryFromAddress").val());
			$("#hiddenStateNameId" + i).html($("#stateFromAddress").val());
			$("#hiddenDistrictNameId" + i).html($("#districtFromAddress").val());
			$("#hiddenTalukaNameId" + i).html($("#talukaFromAddress").val());
			$("#hiddenCityNameId" + i).html($("#cityFromAddress").val());

			$("#companyCountryId" + i).html($("#hiddenCountryFromPartyMaster").val());
			$("#companyStateId" + i).html($("#hiddenStateFromPartyMaster").val());
			$("#companyDistrictId" + i).html($("#hiddenDistrictFromPartyMaster").val());
			$("#companyTalukaId" + i).html(	$("#hiddenTalukaFromPartyMaster").val());
			$("#companyCityId" + i).html($("#hiddenCityFromPartyMaster").val());

			$("#companyAddressId" + i).html($("#addressFromAddress").val());
			$("#companyStreetId" + i).html($("#streetFromAddress").val());
			$("#companyPinId" + i).html($("#pincodeFromAddress").val());
			$("#companyAreaId" + i).html($("#areaFromAddress").val());
				if ($("#shippingAddress").is(":checked")) {
					$('#shippingAddress').prop("checked", true);
					$("#companyAddressTypeId" + i).html($("#shippingAddress").val());
					$('#billingAddress').prop("checked", false);
				} else if($("#billingAddress").is(":checked")) {
					$('#billingAddress').prop("checked", true);
					$("#companyAddressTypeId" + i).html($("#billingAddress").val());
					$('#shippingAddress').prop("checked", false);
				}
			
			document.getElementById("saveAddressInfo").style.visibility = "visible";
			$("#saveAddressInfo").show();
			$("#updateAddressInfo").hide();
		}
	}
	resetInfoFields('addressInfo');
}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to add Payment information   
 ******************************************************************************/
function addDynamicRecordsToPaymentInfoTable() {
	var rows = $('#PaymentInfoTable tbody tr.newAdded').length;
    var id=rows+1;
	var bankName = $("#bankName").val();
	var bankIfscCode = $("#bankIfscCode").val();
	var accountHolderName = $("#accountHolderName").val();
	var accountNumber = $("#accountNumber").val();
	var cityId = $("#cityId").val();
	var accountAddress = $("#accountAddress").val();
	var paymentTerm = $("#paymentTerm").val();
	var creditTerm = $("#creditTerm").val();

	if (bankName != "") {
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(bankName)) {
			alert("Bank name should be of alphabets only with a single space allowed..!");
			$("#bankName").focus();
			return false;
		}
	}

	if (accountNumber == "" || accountNumber == undefined
			|| accountNumber == null) {
		alert("Account Number code should be of digits only!");
		$("#accountNumber").focus();
		return false;
	}

	if (accountHolderName != "") {
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(accountHolderName)) {
			alert("Account Person name should be of alphabets only with a single space allowed..!");
			$("#accountHolderName").focus();
			return false;
		}
	}

	if (accountAddress != "" || accountAddress != null) {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(accountAddress)) {
			alert("Address should be of alphabets and digits only with a single space allowed..!");
			$("#accountAddress").focus();
			return false;
		}
	}

	if (bankIfscCode != "" || bankIfscCode != null) {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(bankIfscCode)) {
			alert("IFSC should be of alphabets and digits only with a single space allowed..!");
			$("#bankIfscCode").focus();
			return false;
		}
	}

	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center" id="accountHolderNameId'
			+ id
			+ '">'
			+ accountHolderName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="accountNumberId'
			+ id
			+ '">'
			+ accountNumber
			+ '</td>'
			+ ' <td class="col-md-1 center" id="accountAddressId'
			+ id
			+ '">'
			+ accountAddress
			+ '</td>'
			+ ' <td class="col-md-1 center" id="bankNameId'
			+ id
			+ '" style="display:none">'
			+ bankName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="bankIFSCId'
			+ id
			+ '" style="display:none">'
			+ bankIfscCode
			+ '</td>'
			+ ' <td class="col-md-1 center" id="accountCityId'
			+ id
			+ '" style="display:none">'
			+ cityId
			+ '</td>'
			+ ' <td class="col-md-1 center" id="paymentTermsId'
			+ id
			+ '" style="display:none">'
			+ paymentTerm
			+ '</td>'
			+ ' <td class="col-md-1 center" id="creditTermsId'
			+ id
			+ '" style="display:none">'
			+ creditTerm
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="paymentInfoId'
			+ id
			+ '" style="display:none">'
			+ 0
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="payInfoId1'
			+ id
			+ '" style="display:none" >'
			+ id
			+ '</td>'
			
			
			+ ' <td class="col-md-1 center"><input type="hidden" id="editPaymentPartMaster'
			+ id
			+ '" value="'
			+ id
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editPaymentInfoPartyMaster('
			+ id
			+ ')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deletePaymentPartMaster'
			+ id + '" onclick="deletePartyMasterSlave(' + id
			+ ',\'deletePayment\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyPaymentInfoTableList").append(htm);
	$('#paymentFormId')[0].reset();
}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to edit Payment information   
 ******************************************************************************/
function editPaymentInfoPartyMaster(id) {
	var rows = $('#PaymentInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var paymentInfoId = $("#payInfoId1" + i).text();
		var payInfoIddd = $("#paymentInfoId" + i).text();
		if (id == paymentInfoId || id == payInfoIddd) {
			$("#payInfoIdNew").val($("#paymentInfoId" + id).html());
			$("#bankName").val($("#bankNameId" + i).html());
			$("#bankIfscCode").val($("#bankIFSCId" + i).html());
			$("#accountHolderName").val($("#accountHolderNameId" + i).html());
			$("#accountNumber").val($("#accountNumberId" + i).html());
			$("#cityId").val($("#accountCityId" + i).html());
			$("#accountAddress").val($("#accountAddressId" + i).html());
			$("#paymentTerm").val($("#paymentTermsId" + i).html());
			$("#creditTerm").val($("#creditTermsId" + i).html());
			$("#updatePaymentInfo").attr('updatePaymentInfoId', paymentInfoId);
			$("#savePaymentInfo").hide();
			$("#updatePaymentInfo").show();
		}
	}
}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to update Payment information   
 ******************************************************************************/
function updatePaymentInfoPartyMaster() {
	var rows = $('#PaymentInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updatePaymentInfo").attr('updatePaymentInfoId');
		if (i == id) {
			$("#paymentInfoId" + i).html($("#payInfoIdNew").val());
			$("#bankNameId" + i).html($("#bankName").val());
			$("#bankIFSCId" + i).html($("#bankIfscCode").val());
			$("#accountHolderNameId" + i).html($("#accountHolderName").val());
			$("#accountNumberId" + i).html($("#accountNumber").val());
			$("#accountCityId" + i).html($("#cityId").val());
			$("#accountAddressId" + i).html($("#accountAddress").val());
			$("#paymentTermsId" + i).html($("#paymentTerm").val());
			$("#creditTermsId" + i).html($("#creditTerm").val());
			$("#savePaymentInfo").show();
			$("#updatePaymentInfo").hide();
		}
	}
	resetInfoFields('paymentInfo');
}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to add TermsAndCondition information   
 ******************************************************************************/
function addDynamicRecordsToTermsAndConditionInfoTable() {
	
	var rows = $('#TermsAndConditionInfoTable tbody tr.newAdded').length;	
	var id=rows+1;
	var termsAndCondition = $("#termsAndCondition").val();

	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			
			+ ' <td class="col-md-1 center">'+ id+ '</td>'

			+ ' <td class="col-md-1 center" id="txtTermsAndConditionId'+ id+ '">'+ termsAndCondition+ '</td>'+ id+ '">'
			
			+ ' <td class="col-md-1 center" id="termsAndCondId'+ id
			+ '" style="display:none">'+ 0+ '</td>'
			
			+ ' <td class="col-md-1 center"><input type="hidden" id="termsAndCondSlaveId'+ id+ '" value="'+ id
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editTermsAndConditionInfoPartyMaster('+id+')"><i class="fa fa-edit"></i></button></td>'
			
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deleteTermsAndCondition'
			+ id + '" onclick="deletePartyMasterSlave('+ id + ',\'deleteTermsAndCondition\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#TermsAndConditionInfoTableList").append(htm);
	$('#termsAndCondition').val("").empty();

}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to edit TermsAndCondition information   
 ******************************************************************************/
function editTermsAndConditionInfoPartyMaster(id) {
	var rows = $('#TermsAndConditionInfoTable tbody tr.newAdded').length;
	
	for ( var i = 1; i <= rows; i++) {
		var termsAndCondSlaveId = $("#termsAndCondSlaveId" + i).val();
		if (termsAndCondSlaveId == id) {
			$("#termsAndCondition").val($("#txtTermsAndConditionId" + id).html());
			$("#updateTermsAndConditionInfo").attr('updatetermsAndCondInfoId', termsAndCondSlaveId);
			$("#saveTermsAndConditionInfo").hide();
			$("#updateTermsAndConditionInfo").show();
		}
	}
}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to update TermsAndCondition information   
 ******************************************************************************/
function updateTermsAndConditionPartyMaster() {
	var rows = $('#TermsAndConditionInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var termsAndCondId = $("#termsAndCondSlaveId" + i).val();
		var id = $("#updateTermsAndConditionInfo").attr('updatetermsAndCondInfoId');
		if (termsAndCondId == id) {
			$("#txtTermsAndConditionId" + i).html($("#termsAndCondition").val());
			$("#saveTermsAndConditionInfo").show();
			$("#updateTermsAndConditionInfo").hide();
		}
	}
	resetInfoFields('TermsAndConditionInfo');
}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to get TermsAndCondition information   
 ******************************************************************************/
function getTermConditionMaster(termconditionId) {
	$("#termsAndConditionsSelectedId").val(termconditionId);
	var inputs = [];
	inputs.push('termconditionId=' + termconditionId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryM/editTermAndConditionMasterDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#termsAndCondition").val(r.termconditionName);
			$("#termsAndCondSlaveId" + termconditionId).val(r.termConditionId);
			$('#termsAndConditionsTitle').select2('val', r.termConditionId);
			$("#updateTermsAndConditionInfo").attr('updatetermsAndCondInfoId',r.termConditionId);
		}
	});
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to autosuggestion for test name.
 ******************************************************************************/
function autoSuggestionForTestName(inputID) {
	var testName = $('#' + inputID).val();	
	var inputs = [];
	inputs.push('testname=' + testName);
	var str = inputs.join('&');
	jQuery.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/outlabmastercontroller/autosuggestionfortestname",
				cache : false,
				success : function(r) {
			var availableTags = [];
			var resultData = [];
			if (r.length == 50) {
				alert("NO MATCHING FOUND");

			} else {
				ajaxResponse = r;
				for ( var i = 0; i < ajaxResponse.lstSubService.length; i++) {
					availableTags.push(ajaxResponse.lstSubService[i].categoryname + "~"
							+ ajaxResponse.lstSubService[i].testRate + "~"
							+ ajaxResponse.lstSubService[i].testId);
				}

				var template = "";
				for ( var j = 0; j < availableTags.length; j++) {
					var arrValue = (availableTags[j]).split("~");							
					var idValue = (arrValue[0]);
					var testvalue =(arrValue[1]);
					var testId =(arrValue[2]);
					resultData.push({
						ID : idValue,
						testid :testvalue+"~"+testId,
						Name : arrValue[0],
					});

					template = template + '<li data-value= "' + (arrValue[1]) +(arrValue[2])
							+ '" class=""><a href="#">' + arrValue[0]+ arrValue[1]
							+ '</a></li>';

				}       
				$("#div" + inputID + " .typeahead").html(template);
				setTimeout(function() {
					$('#' + inputID).typeahead({
						source : resultData,
						displayField : 'Name',
					    valueField : 'testid',
				     	onSelect : displayResult,
						scrollBar : true

					});

				}, 500);	
			}
		}
	});

	function displayResult(item) {
		$('#' + inputID).val(item.text);
		var testChargesId = (item.value).split("~");
		$("#testRate").val(testChargesId[0]);	
		$("#testId").val(testChargesId[1]);
       
	}

}
/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to add OutLab information   
 ******************************************************************************/
function addDynamicRecordsToOutLabTable() {
	var id=$('#OutLabmastertable')
	var rows = $('#OutLabmastertable tbody tr.newAdded').length;
	var rowcount=$('#OutLabmastertable tbody tr').length;
	
	// code  for Avoid duplicate test Added By Annapurna 
	if(rows>0){
	for( i=0; i<rowcount; i++){
		exitingTestId= $("#testId"+(i+1)).text();
		  var testId = $("#testId").val();
		   if(testId==Number(exitingTestId))
		  {
		  alert("Test Already Exist!....");
		  return false;
		  }
	  }
	}
	var id=rows+1;
	
    var fromDate = $("#fromDate").val();	
    var toDate = $("#toDate").val();	
    var testName = $("#testName").val();  
    var testRate = $("#testRate").val();
    var testId = $("#testId").val();
		

	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="testName'
			+ id
			+ '">'
			+ testName
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="testId'
			+ id
			+ '" style="display:none" >'
			+ testId
			+ '</td>'
			
			
			+ ' <td class="col-md-1 center" id="testRate'
			+ id
			+ '">'
			+ testRate
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="fromDate'
			+ id
			+ '">'
			+ fromDate
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="toDate'
			+ id
			+ '" >'
			+ toDate
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="outlabId'
			+ id
			+ '" style="display:none">'
			+ 0
			+ '</td>'
			
			
			+ ' <td class="col-md-1 center" id="outlabId1'
			+ id
			+ '" style="display:none" >'
			//+ id
			+0
			+ '</td>'
			
			+ ' <td class="col-md-1 center"><input type="hidden" id="editOutLabMaster' + id + '" value="'+ id+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editOutLabMaster1('+ id+ ')"><i class="fa fa-edit"></i></button></td>'
			
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deleteOutLabMaster'
			+ id + '" onclick="deletePartyMasterSlave(' + id
			+ ',\'deleteOutLab\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	
	$("#outlabmastertablelist").append(htm);
	$('#outlabfromId')[0].reset();
	$('#testName').val("");
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to update OutLab information   
 ******************************************************************************/
function updateOutLabMaster() {
	var rows = $('#OutLabmastertable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updateOutlab").attr('updateOutlabId');	
		if (i == id) {	
			/*$("#outlabId1").val($("#outlabmasterId" + id).html());
			$("#testName").val($("#testName" + id).html());
			$("#testRate").val($("#testRate" + i).html());
			$("#testId").val($("#testId" + i).html());
			$("#fromDate").val($("#fromDate" + i).html());
			$("#toDate").val($("#toDate" + i).html());
			$("#saveOutLabTable").show();
			$("#updateOutlab").hide();*/
			
			$("#outlabId1" + i).html($("#outlabmasterId").val());
			$("#testName" + i).html($("#testName").val());
			$("#testRate" + i).html($("#testRate").val());
			$("#testId" + i).html($("#testId").val());
			$("#fromDate" + i).html($("#fromDate").val());
			$("#toDate" + i).html($("#toDate").val());
			$("#saveOutLabTable").show();
			$("#updateOutlab").hide();
		}
	}
	resetInfoFields('outLabMaster');
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to Save  OutLab Master   
 ******************************************************************************/
function saveOutLabMaster() {

	var labMasterId = $("#labMasterId").val();
	var outlabName = $("#outlabName").val();
	var partyMasterStatus = $("#masterStatus option:selected").val();
	var partyMasterPriority = $("#masterPriority option:selected").val();
	var labType = $("#labType option:selected").val();
	var callFromFunction = $("#callFromFunction").val();

	if (outlabName == "" || outlabName == null) {
		alert("please enter out lab name");
		$("#outlabName").focus();
		return false;
	}

	var status = document.getElementById("masterStatus");
	if (status.options[status.selectedIndex].value == 0) {
		alert('please select party status');
		$("#masterStatus").focus();
		return false;
	}
	
	if (labType == 0) {
		alert('please select lab type');
		$("#labType").focus();
		return false;
	}

	// var genralInfo = $("#PartyGeneralTableInfoList").html().length;
	var genralInfo = $('#GeneralInfoTable tbody tr.newAdded').length;
	if (genralInfo == "" || genralInfo == null || genralInfo == 0) {
		alert("Enter at least One Record In General Info tab ");
		return false;
	}

	// var contactInfo = $("#PartyContactTableInfoList").html();
	var contactInfo = $('#ContactInfoTable tbody tr.newAdded').length;
	if (contactInfo == "" || contactInfo == null || contactInfo == 0) {
		alert("Enter at least One Record In Contact Info tab ");
		return false;
	}

	// var addressInfo = $("#PartyAddressTableInfoList").html();
	var addressInfo = $('#AddressInfoTable tbody tr.newAdded').length;
	if (addressInfo == "" || addressInfo == null || addressInfo == 0) {
		alert("Enter at least One Record In Address Info tab ");
		return false;
	}

	var outlabinfo = $('#OutLabmastertable tbody tr.newAdded').length;
	if (outlabinfo == "" || outlabinfo == null || outlabinfo == 0) {
		alert("Enter at least One Record In Out Lab  tab ");
		return false;
	}
	
	// this is for general info
	var outlabrGeneralInfoDto = {
			outlabrGeneralInfoDtoList : []
	};
	
	var rows = $('#GeneralInfoTable tbody tr.newAdded').length;
	var generalRowCount = $("#generalInfoRows").val();
	if(callFromFunction == "Edit")
		rows = generalRowCount;

	for ( var i = 1; i <= rows; i++) {
		var generalInfoId = $("#generalInfoId" + i).html();
		var generalGstNOId = $("#generalGstNOId" + i).html();
		var generalMobileNoId = $("#generalMobileNoId" + i).html();
		var generalCompanyMailId = $("#generalCompanyMailId" + i).html();
		var generalLandLineNoId = $("#generalLandLineNoId" + i).html();
		var generalWebSiteId = $("#generalWebSiteId" + i).html();
		var generalPanNoId = $("#generalPanNoId" + i).html();
		
		if(generalLandLineNoId == undefined || generalLandLineNoId == "" || generalLandLineNoId == null || generalLandLineNoId == "null")
			continue;
		else{
			outlabrGeneralInfoDto.outlabrGeneralInfoDtoList.push({
				"id" : generalInfoId,
				"gstTransactionNo" : generalGstNOId,
				"mobile" : generalMobileNoId,
				"mail" : generalCompanyMailId,
				"landline" :generalLandLineNoId,
				"website" : generalWebSiteId,
				"pancardNo" : generalPanNoId
			});
		}
	}
	outlabrGeneralInfoDto = JSON.stringify(outlabrGeneralInfoDto);

	// this is for contact details
	var outlabContactInfoDto = {
			outlabContactInfoDtoList : []
	};
	
	var rows = $('#ContactInfoTable tbody tr.newAdded').length;
	var contactRowCount = $("#contactInfoRows").val();
	if(callFromFunction == "Edit")
		rows = contactRowCount;

	for ( var i = 1; i <= rows; i++) {
		var contactInfoId = $("#contactInfoId" + i).html();
		var contactPersonId = $("#contactPersonId" + i).html();
		var contactDesignationId = $("#contactDesignationId" + i).html();
		var contatcAddressId = $("#contatcAddressId" + i).html();
		var contactGenderId = $("#contactGenderId" + i).html();
		var contactDobId = $("#contactDobId" + i).html();
		var contactPhoneOneId = $("#contactPhoneOneId" + i).html();
		var contactPhoneSecondId = $("#contactPhoneSecondId" + i).html();
		var contactMailId = $("#contactMailId" + i).html();

		if(contactPersonId == undefined || contactPersonId == "" || contactPersonId == null || contactPersonId == "null")
			continue;
		else{
			outlabContactInfoDto.outlabContactInfoDtoList.push({
				"id" : contactInfoId,
				"contactName" : contactPersonId,
				"contactDesignation" : contactDesignationId,
				"contactAddress" : contatcAddressId,
				"contactGender" :contactGenderId,
				"contactDob" : contactDobId,
				"contactPhoneNumber1" : contactPhoneOneId,
				"contactPhoneNumber2" : contactPhoneSecondId,
				"contactEmail" : contactMailId,
			});
		}
	}
	outlabContactInfoDto = JSON.stringify(outlabContactInfoDto);

	// this is for address details
	var outlabAddressInfoDto = {
			outlabAddressInfoDtoList : []
	};
	var rows = $('#AddressInfoTable tbody tr.newAdded').length;
	var addressRowCount = $("#addressInfoRows").val();
	if(callFromFunction == "Edit")
		rows = addressRowCount;
	
	for ( var i = 1; i <= rows; i++) {
		var addressInfoId = $("#addressInfoId" + i).html();
		var companyNameId = $("#companyNameId" + i).html();
		var companyStreetId = $("#companyStreetId" + i).html();
		var companyPinId = $("#companyPinId" + i).html();
		var companyAreaId = $("#companyAreaId" + i).html();
		var companyCountryId = $("#companyCountryId" + i).html();
		var companyStateId = $("#companyStateId" + i).html();
		var companyTalukaId = $("#companyTalukaId" + i).html();
		var companyCityId = $("#companyCityId" + i).html();
		var companyAddressId = $("#companyAddressId" + i).html();
		var companyAddressType = $("#companyAddressTypeId" + i).html();

		var countryNameId = $("#hiddenCountryNameId" + i).html();
		var stateNameId = $("#hiddenStateNameId" + i).html();
		var districtNameId = $("#hiddenDistrictNameId" + i).html();
		var districtNameIdValue = $("#companyDistrictId" + i).html();
		var talukaNameId = $("#hiddenTalukaNameId" + i).html();
		var cityNameId = $("#hiddenCityNameId" + i).html();

		if(countryNameId == undefined || countryNameId == "" || countryNameId == null || countryNameId == "null")
			countryNameId=0;
		
		if(stateNameId == undefined || stateNameId == "" || stateNameId == null || stateNameId == "null")
			stateNameId=0;
		
		if(districtNameId == undefined || districtNameId == "" || districtNameId == null || districtNameId == "null")
			districtNameId=0;
		
		if(talukaNameId == undefined || talukaNameId == "" || talukaNameId == null || talukaNameId == "null")
			talukaNameId=0;
		
		if(cityNameId == undefined || cityNameId == "" || cityNameId == null || cityNameId == "null")
			cityNameId=0;
		
		
		if(companyAddressId == undefined || companyAddressId == "" || companyAddressId == null || companyAddressId == "null")
			continue;
		else{
			outlabAddressInfoDto.outlabAddressInfoDtoList.push({
				"id" : addressInfoId,
				"companyName" : companyNameId,
				"street" : companyStreetId,
				"pin" : companyPinId,
				"area" :companyAreaId,				
				"address" : companyAddressId,
				"addressType" : companyAddressType,		
				"country" : companyCountryId,
				"countryId" : countryNameId ,	
				"state" : companyStateId,
				"stateId" : stateNameId ,
				"districtName" :districtNameIdValue ,
				"districtId" : districtNameId ,
				"talukaName" :companyTalukaId ,
				"talukaId" : talukaNameId ,
				"city" :companyCityId ,
				"cityId" :cityNameId ,
			});
		}
	}

	outlabAddressInfoDto = JSON.stringify(outlabAddressInfoDto);

	// this is for payment details
	var outlabPaymentInfoDto = {
			outlabPaymentInfoDtoList : []
	};
	var rows = $('#PaymentInfoTable tbody tr.newAdded').length;
	var paymentRowCount = $("#paymentInfoRows").val();
	if(callFromFunction == "Edit")
		rows = paymentRowCount;
	
	for ( var i = 1; i <= rows; i++) {
		var paymentInfoId = $("#paymentInfoId" + i).html();
		var bankNameId = $("#bankNameId" + i).html();
		var bankIFSCId = $("#bankIFSCId" + i).html();
		var accountHolderNameId = $("#accountHolderNameId" + i).html();
		var accountNumberId = $("#accountNumberId" + i).html();
		var accountCityId = $("#accountCityId" + i).html();
		var accountAddressId = $("#accountAddressId" + i).html();
		var paymentTermsId = $("#paymentTermsId" + i).html();
		var creditTermsId = $("#creditTermsId" + i).html();

		if(accountNumberId == undefined || accountNumberId == "" || accountNumberId == null || accountNumberId == "null")
			continue;
		else{
			outlabPaymentInfoDto.outlabPaymentInfoDtoList.push({
				"id" : paymentInfoId,
				"bankName" : bankNameId,
				"bankIFSC" : bankIFSCId,
				"accountHolderName" : accountHolderNameId,
				"accountNumber" :accountNumberId,
				"accountCity" : accountCityId,
				"accountAddress" : accountAddressId,
				"paymentTerms" : paymentTermsId,
				"creditTerms" : creditTermsId,
			});
		}
	}
	outlabPaymentInfoDto = JSON.stringify(outlabPaymentInfoDto);

	// this is for payment details
	var outlabTermsAndConditionInfoDto = {
			outlabTermsAndConditionInfoDtoList : []
	};
	var rows = $('#TermsAndConditionInfoTable tbody tr.newAdded').length;
	var termsAndConditionRowCount = $("#termsAndConditionInfoRows").val();
	if(callFromFunction == "Edit")
		rows = termsAndConditionRowCount;
	
	for ( var i = 1; i <= rows; i++) {	
		var termsAndConditionInfoId = $("#termsAndCondId" + i).html();
		var termsAndConditionNameId = $("#txtTermsAndConditionId" + i).html();
		
		if(termsAndConditionNameId == undefined || termsAndConditionNameId == "" || termsAndConditionNameId == null || termsAndConditionNameId == "null")
			continue;
		else{
			outlabTermsAndConditionInfoDto.outlabTermsAndConditionInfoDtoList.push({
				"id" : termsAndConditionInfoId,
				"termconditionName" : termsAndConditionNameId,
			});
		}
	}

	outlabTermsAndConditionInfoDto = JSON.stringify(outlabTermsAndConditionInfoDto);
	
	var outlabTestInfoDetails = {
			outlabTestInfoDetailsList : []
		};
	var rows = $('#OutLabmastertable tbody tr.newAdded').length;
	/*var labTestRowCount = $("#labTestInfoRows").val();
	if(callFromFunction == "Edit")
		rows = labTestRowCount;*/
		
	for ( var i = 1; i <= rows; i++) {		
		var outlabId1 = $("#outlabId1" + i).html();
		var testName = $("#testName" + i).html();
		var testId = $("#testId" + i).html();
		var testRate = $("#testRate" + i).html();
		var fromDate = $("#fromDate" + i).html();
		var toDate = $("#toDate" + i).html();
			
		if(fromDate == undefined || fromDate == "" || fromDate == null || fromDate == "null")
			continue;
		else{
			outlabTestInfoDetails.outlabTestInfoDetailsList.push({
				"id" : outlabId1,
				"testName" : testName,
				"testId" : testId,
				"testRate" : testRate,
				"fromDate" : fromDate,
				"toDate" :toDate,
			});
		}
	}

	outlabTestInfoDetails = JSON.stringify(outlabTestInfoDetails);
	
	var inputs = [];
	inputs.push("id=" + labMasterId);
	inputs.push("name=" + outlabName);
	inputs.push("status=" + partyMasterStatus);
	inputs.push("priority=" + partyMasterPriority);
	inputs.push("labType=" + labType);
	inputs.push("outlabrGeneralInfoDto="+ outlabrGeneralInfoDto);
	inputs.push("outlabContactInfoDto="+  outlabContactInfoDto);
	inputs.push("outlabAddressInfoDto="+ outlabAddressInfoDto);
	inputs.push("outlabPaymentInfoDto="+ outlabPaymentInfoDto);
	inputs.push("outlabTermsAndConditionInfoDto="+ outlabTermsAndConditionInfoDto);
	inputs.push("outlabTestInfoDetails="+ outlabTestInfoDetails);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/outlabmastercontroller/saveoutlabmastermaster1",
		cache : false,
		error : function() {
			alertify.error("Error");
		},
		success : function(r) {
			response = r;
			if (response == 1) {
				alert("Record saved successfully..!");
				onCloseBtnRefrshPageOutLab();
				setTimeout(function() {
					window.location.reload();
				}, 1000);
			} else if (response == 2) {
				alert("Record Updated successfully..!");
				onCloseBtnRefrshPageOutLab();
				setTimeout(function() {
					window.location.reload();
				}, 1000);
			} else if (response == 3) {
				alertify.error("Out Lab Name Already Present In The System...!!!");
			} else {
				alertify.error("Oops something went wrong.....");
			}
			getAllOutLabMaster();
			$("#txtPartySaveUpdate").val("0");					
		}
	});
}

/*******************************************************************************
 * @author Ajay khandare
 * @since 05-05-2020
 * @comment for Refrsh Page OutLab
 ******************************************************************************/
function onCloseBtnRefrshPageOutLab() {
	window.location.replace("pathology_outlab_master.jsp");
}
/*******************************************************************************
 * @author Ajay khandare
 * @since 05-05-2020
 * @comment for get all record OutLab Master
 ******************************************************************************/
function getAllOutLabMaster() {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/outlabmastercontroller/getalloutlabmaster",
		error : function() {
			alert("error");
		},
		success : function(r) {
			setTemplateOutLabMasterList(r);
			setTemplateOutLabMasterForExport(r);
		}
	});
}

/*******************************************************************************
 * @author Ajay khandare
 * @since 05-05-2020
 * @comment for set template OutLab Master
 ******************************************************************************/

function setTemplateOutLabMasterList(r) {

	var optionList = "<option></option>";
	var masterModuleBody = '<thead class="panel-heading" id="ehatTHead">'
		+ '<tr>'
		
		+ '<th  class="col-md-1 center" style="height: 21.5px;">#</th>'
		+ '<th  class="col-md-1 center" style="height: 21.5px;">Out Lab ID</th>'
		+ '<th  class="col-md-1 center" style="height: 21.5px;">Out Lab Name</th>'

		+ '<th class="col-md-1 center">Edit</th>'
		+ '<th class="col-md-1 center">Delete</th></tr></thead>';
	for ( var int = 0; int < r.outLabMasterDtoList.length; int++) {
		masterModuleBody = masterModuleBody
				+'<tr>'
				+ '<td id="row'
				+ (r.outLabMasterDtoList[int].id)
				+ '"  class="col-md-1 center" style="height: 21.5px;"">'
				+ (int + 1)
				+ '</td>'
								
				+ '<td id="outlabId'
				+ (r.outLabMasterDtoList[int].id)
				+ '"  class="col-md-1 center" style="height: 21.5px;"">'
				+ (r.outLabMasterDtoList[int].id)
				+ '</td>'
				
				+ '<td id="outlabName'
				+ (r.outLabMasterDtoList[int].id)
				+ '"  class="col-md-1 center" style="height: 21.5px;"">'
				+ (r.outLabMasterDtoList[int].name)
				+ ' </td>'
				
				+ '<td id="status'
				+ (r.outLabMasterDtoList[int].id)
				+ '"  class="col-md-1 center" style="height: 21.5px; display:none "">'
				+ (r.outLabMasterDtoList[int].status)
				+ ' </td>'
				
				+ '<td id="priority'
				+ (r.outLabMasterDtoList[int].id)
				+ '"  class="col-md-1 center" style="height: 21.5px; display:none"">'
				+ (r.outLabMasterDtoList[int].priority)
				+ ' </td>'
				
				+ '<td  class="col-md-1 center" style="height: 21.5px;" ><button class="btn btn-xs btn-success " value="EDIT" id=btnEdit10'
				+ r.outLabMasterDtoList[int].id
				+ ' onclick="editOutLabMaster('+ r.outLabMasterDtoList[int].id+ ')"><i class="fa fa-edit"></i></button></td>'

				+ '<td  class="col-md-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-danger deleteUserAccess" value="DELETE" id=btnDelete10 '
				+ r.outLabMasterDtoList[int].id
				+ ' onclick=deleteOutLabMaster('+ r.outLabMasterDtoList[int].id+ ') > <i class="fa fa-trash-o"></i></button> </td>'

			
				+ '</tr>';

	}
	$("#outlabmastertableList").html(masterModuleBody);
	$("#ehatTable").html(masterModuleBody);
}

/*******************************************************************************
 * @author Ajay khandare
 * @date 09 June 2020
 * @Code This function is use to edit OutLab information   
 ******************************************************************************/
function editOutLabMaster1(id) {
	var rows = $('#OutLabmastertable tbody tr.newAdded').length;

	for ( var i = 1; i <= rows; i++) {
		var outlabId1 = $("#outlabId1" + i).text();
		var outlabId = $("#outlabId" + i).text();		
		if (id == outlabId1 || id == outlabId) {	
			$("#outlabmasterId").val($("#outlabId1" + id).html());
			$("#testName").val($("#testName" + id).html());
			$("#testRate").val($("#testRate" + i).html());
			$("#testId").val($("#testId" + i).html());
			$("#fromDate").val($("#fromDate" + i).html());
			$("#toDate").val($("#toDate" + i).html());
			$("#updateOutlab").attr('updateOutlabId', outlabId1);
			$("#saveOutLabTable").hide();
			$("#updateOutlab").show();
		}
	}
}

/*****************************************************************
 * @author Ajay khandare
 * @date 05-05-2020
 * @Code update OutLab Master
 ******************************************************************/
function editOutLabMaster(id) {	
	var inputs = [];
	inputs.push('outlabmasterId=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/outlabmastercontroller/editoutlabmasterbyId",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {	
			$('#labMasterId').val(response.id);
			$('#outlabName').val(response.name);
			$("#masterStatus").val(response.status);
			$("#masterPriority").val(response.priority);
			$("#labType").val(response.labType);
			$("#callFromFunction").val("Edit");
			$("#itemMasterModal").modal('show');
			setEditOutLabSlaveInfo(response) ;
		}

	});
}

/*******************************************************************************
 * @author Ajay khandare
 * @since 05-05-2020
 * @comment for Edit OutLab Slave Info OutLab Master
 ******************************************************************************/
function setEditOutLabSlaveInfo(response) {
	var length = 0;
	if (response.outlabrGeneralInfoDtoList.length != 0
			&& response.outlabrGeneralInfoDtoList != null
			&& response.outlabrGeneralInfoDtoList != "") {

		length = response.outlabrGeneralInfoDtoList.length;
		$("#generalInfoRows").val(length);
		var htm = "";
		var count = 0;
		for (var i = 0; i < length; i++) {
			count++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="generalGstNOId'
					+ count
					+ '">'
					+ response.outlabrGeneralInfoDtoList[i].gstTransactionNo
					+ '</td>'
					+ ' <td class="col-md-1 center" id="generalMobileNoId'
					+ count
					+ '">'
					+ response.outlabrGeneralInfoDtoList[i].mobile
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="generalLandLineNoId'
					+ count
					+ '">'
					+ response.outlabrGeneralInfoDtoList[i].landline
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="generalCompanyMailId'
					+ count
					+ '">'
					+ response.outlabrGeneralInfoDtoList[i].mail
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="generalWebSiteId'
					+ count
					+ '" style="display:none">'
					+ response.outlabrGeneralInfoDtoList[i].website
					+ '</td>'
					+ '<td class="col-md-1 center" id="generalPanNoId'
					+ count
					+ '" style="display:none">'
					+ response.outlabrGeneralInfoDtoList[i].pancardNo
					+ '</td>'
					+ ' <td class="col-md-1 center" id="generalInfoId'
					+ count
					+ '" style="display:none">'
					+ response.outlabrGeneralInfoDtoList[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center" id="geneInfoId1'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="geneInfoId'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="geneInfoNewId'
					+ count
					+ '" style="display:none">'
					+ response.outlabrGeneralInfoDtoList[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center"><input type="hidden" id="editGeneralPartMaster'
					+ count
					+ '" value="'
					+ count
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editGeneralInfoPartyMaster('
					+ count
					+ ',\'fromDB\')" '
					+ '><i class="fa fa-edit"></i></button></td>'

					+ '<td class="col-md-1 center"><button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteGeneralPartMaster'
					+ response.outlabrGeneralInfoDtoList[i].id
					+ '" onclick="deletePartyMasterSlave('
					+ response.outlabrGeneralInfoDtoList[i].id
					+ ',\'deleteGeneral\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#PartyGeneralTableInfoList").html(htm);
	}

	if (response.outlabContactInfoDtoList.length != 0
			&& response.outlabContactInfoDtoList != null
			&& response.outlabContactInfoDtoList != "") {
		length = response.outlabContactInfoDtoList.length;
		$("#contactInfoRows").val(length);
		var count = 0;
		var htm = "";
		for ( var i = 0; i < length; i++) {
			count++;
			htm = htm
					+ '<tr class="newAdded"> '
					
					+ ' <td class="col-md-1 center">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactPersonId'
					+ count
					+ '">'
					+ response.outlabContactInfoDtoList[i].contactName
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="contactPhoneOneId'
					+ count
					+ '">'
					+ response.outlabContactInfoDtoList[i].contactPhoneNumber1
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactPhoneSecondId'
					+ count
					+ '">'
					+ response.outlabContactInfoDtoList[i].contactPhoneNumber2
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="contactDesignationId'
					+ count
					+ '">'
					+ response.outlabContactInfoDtoList[i].contactDesignation
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contatcAddressId'
					+ count
					+ '">'
					+ response.outlabContactInfoDtoList[i].contactAddress
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactGenderId'
					+ count
					+ '" style="display:none">'
					+ response.outlabContactInfoDtoList[i].contactGender
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactDobId'
					+ count
					+ '" style="display:none">'
					+ response.outlabContactInfoDtoList[i].contactDob
					+ '</td>'

					+ ' <td class="col-md-1 center" id="contactMailId'
					+ count
					+ '" style="display:none">'
					+ response.outlabContactInfoDtoList[i].contactEmail
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactInfoId'
					+ count
					+ '" style="display:none">'
					+ response.outlabContactInfoDtoList[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center"><input type="hidden" id="editContactPartMaster'
					+ count
					+ '" value="'
					+ count
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editContactInfoPartyMaster('
					+ count
					+ ',\'fromDB\')"><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center" id="contactInfoId1'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="conInfoId'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="conInfoNewId'
					+ count
					+ '" style="display:none">'
					+ response.outlabContactInfoDtoList[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteContactPartMaster'
					+ response.outlabContactInfoDtoList[i].id
					+ '" onclick="deletePartyMasterSlave('
					+ response.outlabContactInfoDtoList[i].id
					+ ',\'deleteContact\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#PartyContactTableInfoList").html(htm);
	}
	if (response.outlabAddressInfoDtoList.length != 0
			&& response.outlabAddressInfoDtoList != null
			&& response.outlabAddressInfoDtoList != "") {
		length = response.outlabAddressInfoDtoList.length;
		$("#addressInfoRows").val(length);
		var count = 0;
		var htm = "";
		for ( var i = 0; i < length; i++) {
			count++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyNameId'
					+ count
					+ '">'
					+ response.outlabAddressInfoDtoList[i].companyName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyCountryId'
					+ count
					+ '">'
					+ response.outlabAddressInfoDtoList[i].country
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyCityId'
					+ count
					+ '">'
					+ response.outlabAddressInfoDtoList[i].city
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyAddressId'
					+ count
					+ '" style="display:none">'
					+ response.outlabAddressInfoDtoList[i].address
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyAddressTypeId'
					+ count
					+ '" style="display:none">'
					+ response.outlabAddressInfoDtoList[i].addressType
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyStreetId'
					+ count
					+ '" style="display:none">'
					+ response.outlabAddressInfoDtoList[i].street
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyAreaId'
					+ count
					+ '" style="display:none">'
					+ response.outlabAddressInfoDtoList[i].area
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyPinId'
					+ count
					+ '" style="display:none">'
					+ response.outlabAddressInfoDtoList[i].pin
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyStateId'
					+ count
					+ '" style="display:none">'
					+ response.outlabAddressInfoDtoList[i].state
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyDistrictId'
					+ count
					+ '" style="display:none">'
					+ response.outlabAddressInfoDtoList[i].districtName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyTalukaId'
					+ count
					+ '" style="display:none">'
					+ response.outlabAddressInfoDtoList[i].talukaName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenCountryNameId'
					+ count
					+ '" style="display:none">'
					+ response.outlabAddressInfoDtoList[i].countryId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenStateNameId'
					+ count
					+ '" style="display:none">'
					+ response.outlabAddressInfoDtoList[i].stateId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenDistrictNameId'
					+ count
					+ '" style="display:none">'
					+ response.outlabAddressInfoDtoList[i].districtId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenTalukaNameId'
					+ count
					+ '" style="display:none">'
					+ response.outlabAddressInfoDtoList[i].talukaId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenCityNameId'
					+ count
					+ '" style="display:none">'
					+ response.outlabAddressInfoDtoList[i].cityId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="addressInfoId'
					+ count
					+ '" style="display:none">'
					+ response.outlabAddressInfoDtoList[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center" id="addressInfoId1'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="addInfoId'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center"><input type="hidden" id="editAddressPartMaster'
					+ count
					+ '" value="'
					+ count
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editAddressInfoPartyMaster('
					+ count
					+ ',\'fromDB\')"><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteAddressPartMaster'
					+ response.outlabAddressInfoDtoList[i].id
					+ '"  onclick="deletePartyMasterSlave('
					+ response.outlabAddressInfoDtoList[i].id
					+ ',\'deleteAddress\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#PartyAddressTableInfoList").html(htm);
	}
	if (response.outlabPaymentInfoDtoList.length != 0
			&& response.outlabPaymentInfoDtoList != null
			&& response.outlabPaymentInfoDtoList != "") {
		length = response.outlabPaymentInfoDtoList.length;
		$("#paymentInfoRows").val(length);
		var id = 0;
		var htm = "";
		for ( var i = 0; i < length; i++) {
			id++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ id
					+ '</td>'
					+ ' <td class="col-md-1 center" id="accountHolderNameId'
					+ id
					+ '">'
					+ response.outlabPaymentInfoDtoList[i].accountHolderName
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="accountNumberId'
					+ id
					+ '">'
					+ response.outlabPaymentInfoDtoList[i].accountNumber
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="accountAddressId'
					+ id
					+ '">'
					+ response.outlabPaymentInfoDtoList[i].accountAddress
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="bankNameId'
					+ id
					+ '" style="display:none">'
					+ response.outlabPaymentInfoDtoList[i].bankName
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="bankIFSCId'
					+ id
					+ '" style="display:none">'
					+ response.outlabPaymentInfoDtoList[i].bankIFSC
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="accountCityId'
					+ id
					+ '" style="display:none">'
					+ response.outlabPaymentInfoDtoList[i].accountCity
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="paymentTermsId'
					+ id
					+ '" style="display:none">'
					+ response.outlabPaymentInfoDtoList[i].paymentTerms
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="creditTermsId'
					+ id
					+ '" style="display:none">'
					+ response.outlabPaymentInfoDtoList[i].creditTerms
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="paymentInfoId'
					+ id
					+ '" style="display:none">'
					+ response.outlabPaymentInfoDtoList[i].id
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="payInfoId'
					+ id
					+ '" style="display:none">'
					+ id
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="payInfoNewId'
					+ id
					+ '" style="display:none">'
					+ response.outlabPaymentInfoDtoList[i].id
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="paymentInfoId'
					+ id
					+ '" style="display:none">'
					+ response.outlabPaymentInfoDtoList[i].id
					+ '</td>'
					
					
					+ ' <td class="col-md-1 center" id="payInfoId1'
					+ id
					+ '" style="display:none">'
					+ id
					+ '</td>'
					
					+ ' <td class="col-md-1 center"><input type="hidden" id="editPaymentPartMaster'
					+ id
					+ '" value="'
					+ id
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editPaymentInfoPartyMaster('
					+ id
					+ ')"><i class="fa fa-edit"></i></button></td>'
					
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deletePaymentPartMaster'
					+ response.outlabPaymentInfoDtoList[i].id
					+ '" onclick="deletePartyMasterSlave('
					+ response.outlabPaymentInfoDtoList[i].id
					+ ',\'deletePayment\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#PartyPaymentInfoTableList").html(htm);
	}

	if (response.outlabTermsAndConditionInfoDtoList.length != 0
			&& response.outlabTermsAndConditionInfoDtoList != null
			&& response.outlabTermsAndConditionInfoDtoList != "") {
		length = response.outlabTermsAndConditionInfoDtoList.length;
		$("#termsAndConditionInfoRows").val(length);
		var id = 0;
		var htm = "";
		for ( var i = 0; i < length; i++) {
			id++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ id
					+ '</td>'
					+ ' <td class="col-md-1 center" id="txtTermsAndConditionId'
					+ id
					+ '">'
					+ response.outlabTermsAndConditionInfoDtoList[i].termconditionName
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="termsAndCondId'
					+ id
					+ '" style="display:none">'
					+ response.outlabTermsAndConditionInfoDtoList[i].id
					+ '</td>'
					
					+ ' <td class="col-md-1 center"><input type="hidden" id="termsAndCondSlaveId'
					+ id
					+ '" value="'
					+ id
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editTermsAndConditionInfoPartyMaster('
					+ id
					+ ')"><i class="fa fa-edit"></i></button></td>'
					
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteTermsAndCondition'
					+ response.outlabTermsAndConditionInfoDtoList[i].id
					+ '" onclick="deletePartyMasterSlave('
					+ response.outlabTermsAndConditionInfoDtoList[i].id
					+ ',\'deleteTermsAndCondition\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#TermsAndConditionInfoTableList").html(htm);
	}

	
	if (response.outlabTestInfoDetailsList.length != 0
			&& response.outlabTestInfoDetailsList != null
			&& response.outlabTestInfoDetailsList != "") {
		length = response.outlabTestInfoDetailsList.length;
		$("#labTestInfoRows").val(length);
		var id = 0;
		var htm = "";
		for ( var i = 0; i < length; i++) {
			id++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ id
					+ '</td>'
				
					+ ' <td class="col-md-1 center" id="testName'
					+ id
					+ '">'
					+ response.outlabTestInfoDetailsList[i].testName
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="testId'
					+ id
					+ '" style="display:none" >'
					+ response.outlabTestInfoDetailsList[i].testId
					+ '</td>'
				
					+ ' <td class="col-md-1 center" id="testRate'
					+ id
					+ '">'
					+ response.outlabTestInfoDetailsList[i].testRate
					+ '</td>'
						
					
					+ ' <td class="col-md-1 center" id="fromDate'
					+ id
					+ '" style="">'
					+ response.outlabTestInfoDetailsList[i].fromDate
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="toDate'
					+ id
					+ '" style="">'
					+ response.outlabTestInfoDetailsList[i].toDate
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="outlabId'
					+ id
					+ '" style="display:none">'
					+ id
					+ '</td>'
					
					
					+ ' <td class="col-md-1 center" id="outlabId1'
					+ id
					+ '" style="display:none" >'
					//+ id
					+response.outlabTestInfoDetailsList[i].id
					+ '</td>'
					
					+ ' <td class="col-md-1 center"><input type="hidden" id="outlabId1'+id+'" value="'+id+'"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editOutLabMaster1('+id+')"><i class="fa fa-edit"></i></button></td>'
					
					+ ' <td class="col-md-1 center">'+ '<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteOutLabMaster'
					+ response.outlabTestInfoDetailsList[i].id+ '" onclick="deletePartyMasterSlave('+ response.outlabTestInfoDetailsList[i].id+ ',\'deleteOutLab\')" '+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#outlabmastertablelist").html(htm);
	}
}


/******************************************************************
 * @author Ajay khandare
 * @date 05-05-2020
 * @Code Delete data from temp id out lab master
 ******************************************************************/
function deleteOutLabMaster(id) {
	var r = confirm("Are You Sure You Want To Delete out lab Master?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/outlabmastercontroller/deleteoutlabmasterId",
			data : {
				"outlabmasterId" : id
			},
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alert(response);
				getAllOutLabMaster();
			}
		});
	}
}

/*******************************************************************************
 * @author Ajay khandare
 * @since 05-05-2020
 * @comment for set template OutLab Master
 ******************************************************************************/

function setTemplateOutLabMasterForExport(r) {
	var masterModuleBody = "";
	for ( var int = 0; int < r.outLabMasterDtoList.length; int++) {
		masterModuleBody = masterModuleBody
			+'<tr>'

			+ '<td id="row'
			+ (r.outLabMasterDtoList[int].id)
			+ '"  class="col-md-1 center" style="height: 21.5px;"">'
			+ (int + 1)
			+ '</td>'
								
			+ '<td id="outlabId'
			+ (r.outLabMasterDtoList[int].id)
			+ '"  class="col-md-1 center" style="height: 21.5px;"">'
			+ (r.outLabMasterDtoList[int].id)
			+ '</td>'
				
			+ '<td id="outlabName'
			+ (r.outLabMasterDtoList[int].id)
			+ '"  class="col-md-1 center" style="height: 21.5px;"">'
			+ (r.outLabMasterDtoList[int].name)
			+ ' </td>'
				
			+ '</tr>';
		}
	$("#outlabmastertablebody").html(masterModuleBody);
}

function resetAllField(){
	
	$("#labMasterId").val(0);
	$("#outlabName").val("");
	$("#masterStatus").val("");
	$("#masterPriority").val("");
	$("#labType").val("0");
	$("#callFromFunction").val("Save");
	
	$("#generalFormId")[0].reset();
	$("#contactFormId")[0].reset();
	$("#addressFormId")[0].reset();
	$("#paymentFormId")[0].reset();
	$("#termsAndCondition").val("").empty();
	$("#outlabfromId")[0].reset();
	
	var generalInfoTableRowCount = 1;
	var GeneralInfoTable = document.getElementById('GeneralInfoTable');
	var rowCount = GeneralInfoTable.rows.length;
	for (var i = generalInfoTableRowCount; i < rowCount; i++) {
		GeneralInfoTable.deleteRow(generalInfoTableRowCount);
	}
	
	var contactInfoTableRowCount = 1;
	var ContactInfoTable = document.getElementById('ContactInfoTable');
	var rowCount = ContactInfoTable.rows.length;
	for (var i = contactInfoTableRowCount; i < rowCount; i++) {
		ContactInfoTable.deleteRow(contactInfoTableRowCount);
	}
	
	var addressInfoTableRowCount = 1;
	var AddressInfoTable = document.getElementById('AddressInfoTable');
	var rowCount = AddressInfoTable.rows.length;
	for (var i = addressInfoTableRowCount; i < rowCount; i++) {
		AddressInfoTable.deleteRow(addressInfoTableRowCount);
	}
	
	var paymentInfoTableRowCount = 1;
	var PaymentInfoTable = document.getElementById('PaymentInfoTable');
	var rowCount = PaymentInfoTable.rows.length;
	for (var i = paymentInfoTableRowCount; i < rowCount; i++) {
		PaymentInfoTable.deleteRow(paymentInfoTableRowCount);
	}
	
	var termsAndConditionInfoTableRowCount = 1;
	var TermsAndConditionInfoTable = document.getElementById('TermsAndConditionInfoTable');
	var rowCount = TermsAndConditionInfoTable.rows.length;
	for (var i = termsAndConditionInfoTableRowCount; i < rowCount; i++) {
		TermsAndConditionInfoTable.deleteRow(termsAndConditionInfoTableRowCount);
	}
	
	var outLabMasterTableRowCount = 1;
	var OutLabmastertable = document.getElementById('OutLabmastertable');
	var rowCount = OutLabmastertable.rows.length;
	for (var i = outLabMasterTableRowCount; i < rowCount; i++) {
		OutLabmastertable.deleteRow(outLabMasterTableRowCount);
	}
}

/*******************************************************************************
 * @author : Akshay Mache
 * @date   : 12-09-2020
 * @codeFor : search Autosuggestion for Out Lab Details
 ******************************************************************************/
function getAutoPartyMaster(businessMasterId) {
	var resultData = [];
	var businessMasterName = $("input#" + businessMasterId).val();

	if (businessMasterName == "" || businessMasterName == null
			|| businessMasterName == "null" || businessMasterName == undefined) {

		alertify.error("Please enter search value");
		$("input#" + businessMasterId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('name=' + businessMasterName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/outlabmastercontroller/outLabMasterAutoSuggestion",
				cache : false,
				success : function(response) {
					if (response.outLabMasterDtoList.length == 0) {
						alertify.error("Data Not Found...!!!");
					}
					var template = "";
					for ( var j = 0; j < response.outLabMasterDtoList.length; j++) {
						var arrValue = response.outLabMasterDtoList[j].id + "-"
								+ response.outLabMasterDtoList[j].name;
						var idValue = response.outLabMasterDtoList[j].id;
						var labName = response.outLabMasterDtoList[j].name;
						resultData.push({
							ID : idValue,
							Name : labName
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}

					setTimeout(
						function() {
							$("div#partyMasterByName .typeahead").html(template);
							$("div#partyMasterByName .typeahead").show();

							$("input#" + businessMasterId).typeahead({
								source : resultData,
								displayField : 'Name',
								valueField : 'ID',
								onSelect : displayResult,
								scrollBar : true
							});
							$("input#" + businessMasterId).data('typeahead').source = resultData;
						}, 500);
				}
			});

	function displayResult(item) {
		var res = item.text.split('-');
		var businessId = res[0];
		var labName = res[1];
		getOutLabLabMasterById(businessId);
		$("input#" + businessMasterId).val(labName);
	}
}

function getOutLabLabMasterById(outLabId) {
	var inputs = [];
	inputs.push('id=' + outLabId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/outlabmastercontroller/getOutLabLabMasterById",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			setTemplateOutLabMasterList(response);
			$('#seachPartyMaster').val("");
		}
	});
}