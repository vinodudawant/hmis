/**
 * 
 * @param id
 * @returns {Boolean}
 */

var rowCount = 1;
var test = 0;
var isNew = 0;
var srNumber = 1;
var minLen;
var maxLen;

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to add dynamic records to contact info table
 *          on purchase order form
 * @param id
 * @returns {Boolean}
 */
function addDynamicRecordsToContactInfoTable(id) {

	var contactPerson = $("#contactPerson").val();
	var contactDesignation = $("#contactDesignation").val();
	var contatcAddress = $("#contatcAddress").val();
	var contactGender = $("#contactGender").val();
	var contactDob = $("#contactDateofbirth").val();
	var contactPhoneOne = $("#contactPhoneOne").val();
	var contactPhoneSecond = $("#contactPhoneSecond").val();
	var contactMail = $("#contactMail").val();
	if (contactPerson == "") {
		alert("Contact Person name shouldnot  be  empty ..!");
		$("#contactPerson").focus();
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
			+ ' <td class="col-md-1 center" id="contactPhoneOneId'
			+ id
			+ '" style="display:none">'
			+ contactPhoneOne
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactPhoneSecondId'
			+ id
			+ '" style="display:none">'
			+ contactPhoneSecond
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
			+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editContactInfoPartyMaster('
			+ id
			+ ')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deleteContactPartMaster'
			+ id + '" onclick="deletePartyMasterSlaveOnPRO(' + id
			+ ',\'deleteContact\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyContactTableInfoList").append(htm);
	$('#contactFormId')[0].reset();

}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to add dynamic records to address info table
 *          on purchase order form
 */
function addDynamicRecordsToAddressInfoTable(id) {

	var companyName = $("#companyNameFromAddress").val();
	var companyCity = $("#cityFromAddress").val();
	var companyStreet = $("#streetFromAddress").val();
	var companyPin = $("#pincodeFromAddress").val();
	var companyArea = $("#areaFromAddress").val();
	var companyCountry = $("#countryFromAddress").val();
	var companyState = $("#stateFromAddress").val();
	var companyAddress = $("#addressFromAddress").val();

	if (companyAddress == "") {
		alert("address should not be empty..!");
		$("#addressFromAddress").focus();
		return false;

	}
	if (companyCity != "") {
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(companyCity)) {
			alert("City name should be of alphabets only with a single space allowed..!");
			$("#cityFromAddress").focus();
			return false;
		}

	}

	if (companyPin != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(companyPin)) {
			alert("Pin code should be of digits only!");
			$("#pincodeFromAddress").focus();
			return false;
		}
	}

	if (companyState != "") {
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

	if (companyCountry != "" || companyCountry != null) {
		var pattern = /^([a-zA-Z]+\s?)*$/;
		if (!pattern.test(companyCountry)) {
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
			+ companyCountry
			+ '</td>'
			+ ' <td class="col-md-1 center" id="companyCityId'
			+ id
			+ '">'
			+ companyCity
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
			+ companyState
			+ '</td>'
			+ ' <td class="col-md-1 center" id="addressInfoId'
			+ id
			+ '" style="display:none">'
			+ 0
			+ '</td>'
			+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editAddressInfoPartyMasterOnPO('
			+ id
			+ ')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deleteAddressPartMaster'
			+ id + '" onclick="deletePartyMasterSlaveOnPRO(' + id
			+ ',\'deleteAddress\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyAddressTableInfoList").append(htm);
	$('#addressFormId')[0].reset();
}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to edit general info party master details on
 *          purchase order form
 */
function editGeneralInfoPartyMaster(id, callFrom) {
	var rows = $('#GeneralInfoTable tbody tr.newAdded').length;
	var generalInfoId = $("#generalInfoId" + id).html();
	$("#generalMobileNo").val($("#generalMobileNoId" + id).html());
	$("#generalLandLineNo").val($("#generalLandLineNoId" + id).html());
	$("#generalWebSite").val($("#generalWebSiteId" + id).html());
	$("#generalCompanyMail").val($("#generalCompanyMailId" + id).html());
	$("#generalGstNO").val($("#generalGstNOId" + id).html());
	if ($("#generalRatingId" + id).html().trim() != "null"
			|| $("#generalRatingId" + id).html().trim() != null
			|| $("#generalRatingId" + id).html().trim() != undefined
			|| $("#generalRatingId" + id).html().trim() != "") {
		$("#generalRating").val($("#generalRatingId" + id).html().trim());
	} else {
		$("#generalRating").val(0);
	}
	$("#generalPanNo").val($("#generalPanNoId" + id).html());
	$("#updateGeneralInfo").attr('myid', generalInfoId);
	$("#saveGeneralInfo").hide();
	$("#updateGeneralInfo").show();
}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to update general info party master details
 *          on purchase order form
 */
function updateGeneralInfoPartyMaster() {
	var rows = $('#GeneralInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var generalInfoId = $("#generalInfoId" + i).html();
		var id = $("#updateGeneralInfo").attr('myid');
		if (i == id) {
			$("#generalMobileNoId" + i).html($("#generalMobileNo").val());
			$("#generalLandLineNoId" + i).html($("#generalLandLineNo").val());
			$("#generalWebSiteId" + i).html($("#generalWebSite").val());
			$("#generalCompanyMailId" + i).html($("#generalCompanyMail").val());
			$("#generalGstNOId" + i).html($("#generalGstNO").val());
			$("#generalRatingId" + i).html($("#generalRating").val());
			$("#generalPanNoId" + i).html($("#generalPanNo").val());
			$("#saveGeneralInfo").show();
			$("#updateGeneralInfo").hide();
		}
	}
	resetInfoFields('generalInfo');
}
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to edit contact info party master details on
 *          purchase order form
 */
function editContactInfoPartyMaster(id) {
	var rows = $('#ContactInfoTable tbody tr.newAdded').length;
	var contactInfoId = $("#contactInfoId" + id).html();
	$("#contactInfoId").val($("#contactInfoId" + id).html());
	$("#contactPerson").val($("#contactPersonId" + id).html());
	$("#contactDesignation").val($("#contactDesignationId" + id).html());
	$("#contatcAddress").val($("#contatcAddressId" + id).html());
	$("#contactGender").val($("#contactGenderId" + id).html());
	$("#contactDateofbirth").val($("#contactDobId" + id).html());
	$("#contactPhoneOne").val($("#contactPhoneOneId" + id).html());
	$("#contactPhoneSecond").val($("#contactPhoneSecondId" + id).html());
	$("#contactMail").val($("#contactMailId" + id).html());
	$("#updateContactInfo").attr('updateContactInfoId', contactInfoId);
	$("#saveContactInfo").hide();
	$("#updateContactInfo").show();
}
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to update conatact info party master details
 *          on purchase order form
 */
function updateContactInfoPartyMaster() {
	var rows = $('#ContactInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var contactInfoId = $("#contactInfoId" + i).html();
		var id = $("#updateContactInfo").attr('updateContactInfoId');
		if (i == id) {
			$("#contactInfoId" + i).html($("#contactInfoId").val());
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
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to edit address info party master details on
 *          purchase order form
 */
function editAddressInfoPartyMaster(id) {
	var rows = $('#AddressInfoTable tbody tr.newAdded').length;
	var addressInfoId = $("#addressInfoId" + id).html();
	$("#addressInfoId").val($("#addressInfoId" + id).html());
	$("#companyNameFromAddress").val($("#companyNameId" + id).html());
	$("#cityFromAddress").val($("#companyCityId" + id).html());
	$("#streetFromAddress").val($("#companyStreetId" + id).html());
	$("#pincodeFromAddress").val($("#companyPinId" + id).html());
	$("#areaFromAddress").val($("#companyAreaId" + id).html());
	$("#countryFromAddress").val($("#companyCountryId" + id).html());
	$("#stateFromAddress").val($("#companyStateId" + id).html());
	$("#addressFromAddress").val($("#companyAddressId" + id).html());
	if ($("#companyAddressTypeId" + id).html() === "ShippingAddress") {
		$("#shippingAddress").val($("#companyAddressTypeId" + id).html());
	} else {
		$("#billingAddress").val($("#companyAddressTypeId" + id).html());
	}
	$("#updateAddressInfo").attr('updateAddressInfoId', addressInfoId);
	$("#saveAddressInfo").hide();
	$("#updateAddressInfo").show();
}
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to update address info party master details
 *          on purchase order form
 */
function updateAddressInfoPartyMaster() {
	var rows = $('#AddressInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var addressInfoId = $("#addressInfoId" + i).html();
		var id = $("#updateAddressInfo").attr('updateAddressInfoId');
		if (i == id) {
			$("#addressInfoId" + i).html($("#addressInfoId").val());
			$("#companyNameId" + i).html($("#companyNameFromAddress").val());
			$("#companyCityId" + i).html($("#cityFromAddress").val());
			$("#companyStreetId" + i).html($("#streetFromAddress").val());
			$("#companyPinId" + i).html($("#pincodeFromAddress").val());
			$("#companyAreaId" + i).html($("#areaFromAddress").val());
			$("#companyCountryId" + i).html($("#countryFromAddress").val());
			$("#companyStateId" + i).html($("#stateFromAddress").val());
			$("#companyAddressId" + i).html($("#addressFromAddress").val());
			if ($("#shippingAddress").val() === "ShippingAddress") {
				$("#companyAddressTypeId" + i)
						.html($("#shippingAddress").val());
			} else {
				$("#companyAddressTypeId" + i).html($("#billingAddress").val());
			}

			$("#saveAddressInfo").show();
			$("#updateAddressInfo").hide();
		}
	}
	resetInfoFields('addressInfo');
}
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to delete party master slave
 */
function deletePartyMasterSlaveOnPRO(id, callFrom) {
	var partyMasterId = $("#partyMasterId").val();
	if (callFrom === "deleteGeneral") {

		$("#PartyGeneralTableInfoList")
				.on(
						'click',
						'#deleteGeneralPartMaster' + id + '',
						function() {
							var isNew = $("#deleteGeneralPartMaster" + id)
									.attr('isNew');
							if (isNew != undefined && isNew != null
									&& isNew == "false") {
								$(this).closest('tr').remove();
								var inputs = [];
								inputs.push('id=' + id);
								inputs.push('partyMasterId=' + partyMasterId);
								inputs.push('callFrom=' + callFrom);
								var str = inputs.join('&');
								jQuery
										.ajax({
											async : true,
											type : "POST",
											url : "ehat/invPartyMaster/deletePartyMasterSlave",
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
				.on(
						'click',
						'#deleteContactPartMaster' + id + '',
						function() {
							var isNew = $("#deleteContactPartMaster" + id)
									.attr('isNew');
							if (isNew != undefined && isNew != null
									&& isNew == "false") {
								$(this).closest('tr').remove();
								var inputs = [];
								inputs.push('id=' + id);
								inputs.push('partyMasterId=' + partyMasterId);
								inputs.push('callFrom=' + callFrom);
								var str = inputs.join('&');
								jQuery
										.ajax({
											async : true,
											type : "POST",
											url : "ehat/invPartyMaster/deletePartyMasterSlave",
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
				.on(
						'click',
						'#deleteAddressPartMaster' + id + '',
						function() {
							var isNew = $("#deleteAddressPartMaster" + id)
									.attr('isNew');
							if (isNew != undefined && isNew != null
									&& isNew == "false") {
								$(this).closest('tr').remove();
								var inputs = [];
								inputs.push('id=' + id);
								inputs.push('partyMasterId=' + partyMasterId);
								inputs.push('callFrom=' + callFrom);
								var str = inputs.join('&');
								jQuery
										.ajax({
											async : true,
											type : "POST",
											url : "ehat/invPartyMaster/deletePartyMasterSlave",
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
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to get item master slave details modal using
 *          item master id and rest form as well this function is dynamic
 * @param itemMasterId
 */
function getItemMasterSlaveDetailsOnPurchaseOrder(itemMasterId) {
	getItemMasterSlaveDetailsByIdOnPurchaseOrder(itemMasterId);
	$('#purchaseOrderModalId').modal('show');

}
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to get item master slave details by using
 *          item master id and rest form as well this function is dynamic
 * @param itemMasterId
 */
function getItemMasterSlaveDetailsByIdOnPurchaseOrder(itemMasterId) {
	var inputs = [];
	inputs.push('id=' + itemMasterId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : 'POST',
				data : str + "&reqType=AJAX",
				url : 'ehat/inventoryPurchaseReOrder/getItemMasterSlaveDetails',
				timeout : 1000 * 60 * 5,
				catche : false,
				success : function(r) {
					console.log(r);
					for ( var i = 0; i < r.itemPurchaseSlaveDto.length; i++) {
						if (i == 0) {
							$("#itemMasterSlaveRecordList")
									.html(
											"<tr><td>"
													+ "<input type='radio' name='row' id='rowId"
													+ i
													+ "' value="
													+ i
													+ "  autofocus='autofocus'></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='itemNameId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' value="
													+ itemMasterId
													+ "  id='itemId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													// HSN Id
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='HSNNameModalPO"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													// HSN Name
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='HSNNameValueModalPO"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='itemQuantityId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='purchaseUnitPriceOneId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='cgstRateId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='sgstRateId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='taxNameId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='taxRateId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='purchaseUomFactorOneId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='purchaseUomFactorTwoId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='purchaseUomFactorThreeId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='purchaseUomFactorFourId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													// added this to get unit
													// names on purchase order
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText'  id='uomUnitOneNameId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText'  id='uomUnitTwoNameId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText'  id='uomUnitThreeNameId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText'  id='uomUnitFourNameId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													
													//to check reagent item type
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText'  id='reagentItemStatus"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText'  id='assetItemStatus"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText'  id='isItemBatchWise"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													
													//asset manufacture name
													+ "<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='manufactureName"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+
													//asset amc value
													"<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='assetAmcValId1"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+
													//asset pm value
													"<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='assetPmValId1"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+
													//asset amc year
													"<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='assetAmcYearId1"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+
													//asset pm year
													"<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='assetPmYearId1"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+
													//asset product warranty
													"<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='assetProductWarrantyId1"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+

													// added by Vishnu Thorat to hold
													// asset product category
													"<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='assetProductCategoryItemPopUpId"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+
													//lab equipment status
													"<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='labEquipmentItemStatus"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"

													+ "</tr>");

						}

						else {
							$("#itemMasterSlaveRecordList")
									.append(
											"<tr><td>"
													+ "<input type='radio' name='row' id='rowId"
													+ i
													+ "' value="
													+ i
													+ " autofocus='autofocus'></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='itemNameId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' value="
													+ itemMasterId
													+ "  id='itemId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													// HSN Id
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='HSNNameModalPO"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													// HSN Name
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='HSNNameValueModalPO"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='itemQuantityId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='purchaseUnitPriceOneId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='cgstRateId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='sgstRateId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='taxNameId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='taxRateId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='purchaseUomFactorOneId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='purchaseUomFactorTwoId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='purchaseUomFactorThreeId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText' readonly='true' id='purchaseUomFactorFourId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													// added this to get unit
													// names on purchase order
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText'  id='uomUnitOneNameId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText'  id='uomUnitTwoNameId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText'  id='uomUnitThreeNameId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText'  id='uomUnitFourNameId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													
													//to check reagent item type
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText'  id='reagentItemStatus"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText'  id='assetItemStatus"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText'  id='isItemBatchWise"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													
													//asset manufacture name
													+ "<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='manufactureName"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+
													//asset amc value
													"<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='assetAmcValId1"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+
													//asset pm value
													"<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='assetPmValId1"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+
													//asset amc year
													"<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='assetAmcYearId1"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+
													//asset pm year
													"<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='assetPmYearId1"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+
													//asset product warranty
													"<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='assetProductWarrantyId1"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+

													// added by Vishnu Thorat to hold
													// asset product category
													"<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='assetProductCategoryItemPopUpId"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+
													//lab equipment status
													"<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='labEquipmentItemStatus"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"

													+ "</tr>");

						}

						if(r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor2 == 0) {
							$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
							$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice1);
							$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
							$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
							$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
							$("#purchaseUomFactorFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
							$("#itemNameId" + i).val(r.itemName);
							$("#cgstRateId" + i).val(r.cgst);
							$("#sgstRateId" + i).val(r.sgst);
							$("#taxNameId" + i).val(r.taxName);
							$("#taxRateId" + i).val(r.taxRate);
							$("#HSNNameModalPO" + i).val(r.hsnName);
							$("#HSNNameValueModalPO" + i).val(r.hsnNameValue);
							$("#assetItemStatus" + i).val(r.assetItemStatus);
							$("#isItemBatchWise" + i).val(r.batchWise);
							$("#uomUnitOneNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitOneName);
							$("#uomUnitTwoNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitTwoName);
							$("#uomUnitThreeNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitThreeName);
							$("#uomUnitFourNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitFourName);
							//to check reagent item type
							$("#reagentItemStatus" + i).val(r.reagentItemStatus);
							//added by Vishnu Thorat on 12-08-2020
							$("#manufactureName" + i).val(r.companyName);
							$("#assetAmcValId1" + i).val(r.itemMaintenanceSlaveDto.amccmcFreeTextDuration);
							$("#assetPmValId1" + i).val(r.itemMaintenanceSlaveDto.preventiveMaintenanceFreeTextDuration);
							$("#assetAmcYearId1" + i).val(r.itemMaintenanceSlaveDto.amccmcDuration);
							$("#assetPmYearId1" + i).val(r.itemMaintenanceSlaveDto.preventiveMaintenanceDuration);
							$("#assetProductWarrantyId1" + i).val(r.itemMaintenanceSlaveDto.warrantyWithProduct);
							$("#assetProductCategoryItemPopUpId" + i).val(r.categoryType);
							$("#labEquipmentItemStatus" + i).val(r.labEquipmentStatus);
						} else if(r.itemPurchaseSlaveDto[i].purchaseUomFactor2 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor3 == 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor4 == 0) {
							$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
							$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice2);
							$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
							$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
							$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
							$("#purchaseUomFactorFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
							$("#itemNameId" + i).val(r.itemName);
							$("#cgstRateId" + i).val(r.cgst);
							$("#sgstRateId" + i).val(r.sgst);
							$("#taxNameId" + i).val(r.taxName);
							$("#taxRateId" + i).val(r.taxRate);
							$("#HSNNameModalPO" + i).val(r.hsnName);
							$("#HSNNameValueModalPO" + i).val(r.hsnNameValue);
							$("#assetItemStatus" + i).val(r.assetItemStatus);
							$("#isItemBatchWise" + i).val(r.batchWise);
							$("#uomUnitOneNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitOneName);
							$("#uomUnitTwoNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitTwoName);
							$("#uomUnitThreeNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitThreeName);
							$("#uomUnitFourNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitFourName);
							//to check reagent item type
							$("#reagentItemStatus" + i).val(r.reagentItemStatus);
							//added by Vishnu Thorat on 12-08-2020
							$("#manufactureName" + i).val(r.companyName);
							$("#assetAmcValId1" + i).val(r.itemMaintenanceSlaveDto.amccmcFreeTextDuration);
							$("#assetPmValId1" + i).val(r.itemMaintenanceSlaveDto.preventiveMaintenanceFreeTextDuration);
							$("#assetAmcYearId1" + i).val(r.itemMaintenanceSlaveDto.amccmcDuration);
							$("#assetPmYearId1" + i).val(r.itemMaintenanceSlaveDto.preventiveMaintenanceDuration);
							$("#assetProductWarrantyId1" + i).val(r.itemMaintenanceSlaveDto.warrantyWithProduct);
							$("#assetProductCategoryItemPopUpId" + i).val(r.categoryType);
							$("#labEquipmentItemStatus" + i).val(r.labEquipmentStatus);
						} else if(r.itemPurchaseSlaveDto[i].purchaseUomFactor3 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor2 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor4 == 0) {
							$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
							$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice3);
							$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
							$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
							$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
							$("#purchaseUomFactorFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
							$("#itemNameId" + i).val(r.itemName);
							$("#cgstRateId" + i).val(r.cgst);
							$("#sgstRateId" + i).val(r.sgst);
							$("#taxNameId" + i).val(r.taxName);
							$("#taxRateId" + i).val(r.taxRate);
							$("#HSNNameModalPO" + i).val(r.hsnName);
							$("#HSNNameValueModalPO" + i).val(r.hsnNameValue);
							$("#assetItemStatus" + i).val(r.assetItemStatus);
							$("#isItemBatchWise" + i).val(r.batchWise);
							$("#uomUnitOneNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitOneName);
							$("#uomUnitTwoNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitTwoName);
							$("#uomUnitThreeNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitThreeName);
							$("#uomUnitFourNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitFourName);
							//to check reagent item type
							$("#reagentItemStatus" + i).val(r.reagentItemStatus);
							//added by Vishnu Thorat on 12-08-2020
							$("#manufactureName" + i).val(r.companyName);
							$("#assetAmcValId1" + i).val(r.itemMaintenanceSlaveDto.amccmcFreeTextDuration);
							$("#assetPmValId1" + i).val(r.itemMaintenanceSlaveDto.preventiveMaintenanceFreeTextDuration);
							$("#assetAmcYearId1" + i).val(r.itemMaintenanceSlaveDto.amccmcDuration);
							$("#assetPmYearId1" + i).val(r.itemMaintenanceSlaveDto.preventiveMaintenanceDuration);
							$("#assetProductWarrantyId1" + i).val(r.itemMaintenanceSlaveDto.warrantyWithProduct);
							$("#assetProductCategoryItemPopUpId" + i).val(r.categoryType);
							$("#labEquipmentItemStatus" + i).val(r.labEquipmentStatus);
						} else if(r.itemPurchaseSlaveDto[i].purchaseUomFactor4 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor3 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor2 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0) {
							$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
							$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice4);
							$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
							$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
							$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
							$("#purchaseUomFactorFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
							$("#itemNameId" + i).val(r.itemName);
							$("#cgstRateId" + i).val(r.cgst);
							$("#sgstRateId" + i).val(r.sgst);
							$("#taxNameId" + i).val(r.taxName);
							$("#taxRateId" + i).val(r.taxRate);
							$("#HSNNameModalPO" + i).val(r.hsnName);
							$("#HSNNameValueModalPO" + i).val(r.hsnNameValue);
							$("#assetItemStatus" + i).val(r.assetItemStatus);
							$("#isItemBatchWise" + i).val(r.batchWise);
							$("#uomUnitOneNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitOneName);
							$("#uomUnitTwoNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitTwoName);
							$("#uomUnitThreeNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitThreeName);
							$("#uomUnitFourNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitFourName);
							//to check reagent item type
							$("#reagentItemStatus" + i).val(r.reagentItemStatus);
							//added by Vishnu Thorat on 12-08-2020
							$("#manufactureName" + i).val(r.companyName);
							$("#assetAmcValId1" + i).val(r.itemMaintenanceSlaveDto.amccmcFreeTextDuration);
							$("#assetPmValId1" + i).val(r.itemMaintenanceSlaveDto.preventiveMaintenanceFreeTextDuration);
							$("#assetAmcYearId1" + i).val(r.itemMaintenanceSlaveDto.amccmcDuration);
							$("#assetPmYearId1" + i).val(r.itemMaintenanceSlaveDto.preventiveMaintenanceDuration);
							$("#assetProductWarrantyId1" + i).val(r.itemMaintenanceSlaveDto.warrantyWithProduct);
							$("#assetProductCategoryItemPopUpId" + i).val(r.categoryType);
							$("#labEquipmentItemStatus" + i).val(r.labEquipmentStatus);
				}
			}
		}
	});

}


/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to set modal info to table on purchase order
 *          and rest form as well this function is dynamic
 */
function setModalInfoToTableOnPurchaseOrder() {
	var table = document.getElementById("ItemInfoTablePO");
	var itemSlaveRowCount = table.rows.length;
	var newItemSlaveRowCount = itemSlaveRowCount - 1;
	var totalRow = 0;
	$('#itemMasterSlaveRecordList input[type=radio]').each(function() {
		totalRow++;
	});
	var totalCheckboxes = $('input[name=row]:checked').val();
	setTableValuesToPurchaseOrderItemInfo(totalCheckboxes, totalRow,
			newItemSlaveRowCount);

}
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to set modal info to table on purchase order
 *          and rest form as well this function is dynamic
 */
function setTableValuesToPurchaseOrderItemInfo(totalCheckboxes, totalRow,
		radioButtonIndex) {
	var userState = $("#userState").val();
	var venderState= $("#hiddenVenderStatePRO").val();
	if (totalRow >= 1) {
		if (totalCheckboxes == undefined || totalCheckboxes == "undefined") {
			alert("Please select atleast one checkbox");
			return 0;
		} else {
			var factor1 = $('#purchaseUomFactorOneId' + totalCheckboxes).val();
			var factor2 = $('#purchaseUomFactorTwoId' + totalCheckboxes).val();
			var factor3 = $('#purchaseUomFactorThreeId' + totalCheckboxes)
					.val();
			var factor4 = $('#purchaseUomFactorFourId' + totalCheckboxes).val();

			$('#itemMasterId' + radioButtonIndex).val(
					$('#itemId' + totalCheckboxes).val());
			$('#txtPurchaseQuotationUnitPrice' + radioButtonIndex).val(
					$('#purchaseUnitPriceOneId' + totalCheckboxes).val());
			$('#txtPurchaseQuotationFactorOne' + radioButtonIndex).val(
					$('#purchaseUomFactorOneId' + totalCheckboxes).val());
			$('#txtPurchaseQuotationFactorTwo' + radioButtonIndex).val(
					$('#purchaseUomFactorTwoId' + totalCheckboxes).val());
			$('#txtPurchaseQuotationFactorThree' + radioButtonIndex).val(
					$('#purchaseUomFactorThreeId' + totalCheckboxes).val());
			$('#txtPurchaseQuotationFactorFour' + radioButtonIndex).val(
					$('#purchaseUomFactorFourId' + totalCheckboxes).val());
			$('#txtPurchaseQuotationActualQuantity' + radioButtonIndex).val(
					$('#itemQuantityId' + totalCheckboxes).val());
			$('#txtPurchaseQuotationPendingQuantity' + radioButtonIndex).val(
					$('#itemQuantityId' + totalCheckboxes).val());
			$('#txtPurchaseQuotationItemName_' + radioButtonIndex).val(
					$('#itemNameId' + totalCheckboxes).val());
			if(userState == venderState){
				$('#txtPurchaseQuotationTaxCodePO_' + radioButtonIndex).val(
						$('#taxRateId' + totalCheckboxes).val());
				$('#txtPurchaseQuotationTaxAmount_' + radioButtonIndex).val(0);
			}else{
				$('#txtPurchaseQuotationTaxCodePO_' + radioButtonIndex).val(0);
				$('#txtPurchaseQuotationTaxAmount_' + radioButtonIndex).val($('#taxRateId' + totalCheckboxes).val());
			}
			
			$('#hsnCodePurchaseOrder' + radioButtonIndex).val(
					$('#HSNNameModalPO' + totalCheckboxes).val());
			$('#hsnCodeNamePurchaseOrder' + radioButtonIndex).val(
					$('#HSNNameValueModalPO' + totalCheckboxes).val());

			$('#uomUnitFactorOneNameId' + radioButtonIndex).text(
					$('#uomUnitOneNameId' + totalCheckboxes).val());
			$('#uomUnitFactorTwoNameId' + radioButtonIndex).text(
					$('#uomUnitTwoNameId' + totalCheckboxes).val());
			$('#uomUnitFactorThreeNameId' + radioButtonIndex).text(
					$('#uomUnitThreeNameId' + totalCheckboxes).val());
			$('#uomUnitFactorFourNameId' + radioButtonIndex).text(
					$('#uomUnitFourNameId' + totalCheckboxes).val());
			$('#reagentItemStatusId' + radioButtonIndex).val($('#reagentItemStatus' + totalCheckboxes).val());
			
			$('#assetItemStatusId' + radioButtonIndex).val(
					$('#assetItemStatus' + totalCheckboxes).val());
			$('#isItemBatchWiseId' + radioButtonIndex).val(
					$('#isItemBatchWise' + totalCheckboxes).val());
			//added by Vishnu Thorat on 12-08-2020
			$('#assetItemManufactureId' + radioButtonIndex).val($('#manufactureName' + totalCheckboxes).val());
			$('#assetAmcValId' + radioButtonIndex).val($('#assetAmcValId1' + totalCheckboxes).val());
			$('#assetPmValId' + radioButtonIndex).val($('#assetPmValId1' + totalCheckboxes).val());
			$('#assetAmcYearId' + radioButtonIndex).val($('#assetAmcYearId1' + totalCheckboxes).val());
			$('#assetPmYearId' + radioButtonIndex).val($('#assetPmYearId1' + totalCheckboxes).val());
			$('#assetProductWarrantyId' + radioButtonIndex).val($('#assetProductWarrantyId1' + totalCheckboxes).val());
			$('#assetProductCategory' + radioButtonIndex).val($('#assetProductCategoryItemPopUpId' + totalCheckboxes).val());
			$('#labEquipmentItemStatusId' + radioButtonIndex).val($('#labEquipmentItemStatus' + totalCheckboxes).val());
			
			if (factor1 != 0 && factor2 == 0) {
				$('#uomUnitLatestFactorId' + radioButtonIndex).text(
						$('#uomUnitOneNameId' + totalCheckboxes).val());
			} else if (factor2 != 0 && factor1 != 0 && factor3 == 0
					&& factor4 == 0) {
				$('#uomUnitLatestFactorId' + radioButtonIndex).text(
						$('#uomUnitTwoNameId' + totalCheckboxes).val());
			} else if (factor3 != 0 && factor2 != 0 && factor1 != 0
					&& factor4 == 0) {
				$('#uomUnitLatestFactorId' + radioButtonIndex).text(
						$('#uomUnitThreeNameId' + totalCheckboxes).val());
			} else if (factor4 != 0 && factor3 != 0 && factor2 != 0
					&& factor1 != 0) {
				$('#uomUnitLatestFactorId' + radioButtonIndex).text(
						$('#uomUnitFourNameId' + totalCheckboxes).val());
			}
			$("#purchaseOrderModalId").modal("hide");

		}

	}
}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to set modal info to set party contact info
 *          and address info on purchase order
 * @param response
 */
function setPartyContactInfoOnPurchaseReOrder(response) {

	var length = 0;

	if (response.partyMasterContactInfoDto.length != 0
			&& response.partyMasterContactInfoDto != null
			&& response.partyMasterContactInfoDto != "") {
		length = response.partyMasterContactInfoDto.length;
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
					+ response.partyMasterContactInfoDto[i].contactName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactDesignationId'
					+ count
					+ '">'
					+ response.partyMasterContactInfoDto[i].contactDesignation
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contatcAddressId'
					+ count
					+ '">'
					+ response.partyMasterContactInfoDto[i].contactAddress
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactGenderId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterContactInfoDto[i].contactGender
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactDobId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterContactInfoDto[i].contactDob
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactPhoneOneId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterContactInfoDto[i].contactPhoneNumber1
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactPhoneSecondId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterContactInfoDto[i].contactPhoneNumber2
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactMailId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterContactInfoDto[i].contactEmail
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactInfoId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterContactInfoDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center"><input type="hidden" id="editContactPartMaster'
					+ count
					+ '" value="'
					+ count
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editContactInfoPartyMasterOnPO('
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
					+ response.partyMasterContactInfoDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteContactPartMaster'
					+ response.partyMasterContactInfoDto[i].id
					+ '" onclick="deletePartyMasterSlaveOnPRO('
					+ response.partyMasterContactInfoDto[i].id
					+ ',\'deleteContact\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#PartyContactTableInfoList").html(htm);
	}
	if (response.partyMasterAddressInfoDto.length != 0
			&& response.partyMasterAddressInfoDto != null
			&& response.partyMasterAddressInfoDto != "") {
		length = response.partyMasterAddressInfoDto.length;

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
					+ response.partyMasterAddressInfoDto[i].companyName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyCountryId'
					+ count
					+ '">'
					+ response.partyMasterAddressInfoDto[i].country
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyCityId'
					+ count
					+ '">'
					+ response.partyMasterAddressInfoDto[i].city
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyAddressId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].address
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyAddressTypeId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].addressType
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyStreetId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].street
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyAreaId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].area
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyPinId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].pin
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyStateId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].state
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyDistrictId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].districtName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyTalukaId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].talukaName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenCountryNameId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].countryId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenStateNameId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].stateId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenDistrictNameId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].districtId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenTalukaNameId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].talukaId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="hiddenCityNameId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].cityId
					+ '</td>'
					+ ' <td class="col-md-1 center" id="addressInfoId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterAddressInfoDto[i].id
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
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editAddressInfoPartyMasterOnPO('
					+ count
					+ ',\'fromDB\')"><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteAddressPartMaster'
					+ response.partyMasterAddressInfoDto[i].id
					+ '"  onclick="deletePartyMasterSlaveOnPRO('
					+ response.partyMasterAddressInfoDto[i].id
					+ ',\'deleteAddress\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#PartyAddressTableInfoList").html(htm);
	}

	if (response.termsAndConditionInfoDto.length != 0
			&& response.termsAndConditionInfoDto != null
			&& response.termsAndConditionInfoDto != "") {
		length = response.termsAndConditionInfoDto.length;
		var id = 0;
		var htm = "";
		for ( var i = 0; i < length; i++) {
			id++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ id
					+ '</td>'
					+ ' <td class="col-md-1 center" id="txtTermsAndConditionsTitleId'
					+ id
					+ '">'
					+ response.termsAndConditionInfoDto[i].headingName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="txtTermsAndConditionId'
					+ id
					+ '">'
					+ response.termsAndConditionInfoDto[i].termconditionName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="termsAndCondId'
					+ id
					+ '" style="display:none">'
					+ response.termsAndConditionInfoDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center"><input type="hidden" id="termsAndCondSlaveId'
					+ id
					+ '" value="'
					+ response.termsAndConditionInfoDto[i].termsConditionSlaveId
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editTermsAndConditionInfoPartyMaster('
					+ response.termsAndConditionInfoDto[i].termsConditionSlaveId
					+ ')"><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deleteTermsAndCondition'
					+ response.termsAndConditionInfoDto[i].id
					+ '" onclick="deletePartyMasterSlaveOnPRO('
					+ response.termsAndConditionInfoDto[i].id
					+ ',\'deleteTermsAndCondition\')" '
					+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		}
		$("#TermsAndConditionInfoTableList").html(htm);
	}

	var length = 0;
	if (response.partyMasterGeneralInfoDto.length != 0
			&& response.partyMasterGeneralInfoDto != null
			&& response.partyMasterGeneralInfoDto != "") {

		length = response.partyMasterGeneralInfoDto.length;
		for ( var i = 0; i < length; i++) {

			var gstNo = response.partyMasterGeneralInfoDto[i].gstTransactionNo;
			if (gstNo == null || gstNo == "null") {
				$("#partGstNo").val(0);
			} else {
				$("#partGstNo").val(gstNo);
			}

		}

	}

}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to get terms and condition for purchase order
 */
function getTermAndConditionForPurchaseOrder() {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/inventoryM/getAllInventoryTermAndCondition",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setTermAndConditionOnPurchaseOrder(r);
		}
	});
}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to set terms and condition on purchase order
 * @param r
 */
function setTermAndConditionOnPurchaseOrder(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lsttermcondition.length; i++) {
		htm = htm
				+ '<tr class="newAdded"> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center" id="hiddenTCId'
				+ index
				+ '" style="display: none;">'
				+ r.lsttermcondition[i].termConditionId
				+ '</td>'
				+ ' <td class="col-md-1 center" id="hiddenTCName'
				+ index
				+ '">'
				+ r.lsttermcondition[i].termconditionName
				+ '</td>'
				+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-success editBodyPartMaster" onclick=editTermPurchaseQuotationMaster('
				+ r.lsttermcondition[i].termConditionId
				+ ')><i class="fa fa-plus"></i></button></td>' + '</tr>';
		index++;
	}
	$("#termsConditionOnPurchaseOrderTbodyId").html(htm);
}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to add dynamic rows on purchase order
 * @param tabType
 */
function addDynamicRowsOnPurchaseOrder(tabType) {
	if (tabType === "ContactInfo") {
		var rows = $('#contactInfoTablePurchaseOrder tbody tr.newAdded').length;
		addDynamicRecordsToContactInfoTableOnPurchaseOrder(rows + 1);
	} else if (tabType === "AddressInfo") {
		var rows = $('#addressInfoTablePurchaseOrder tbody tr.newAdded').length;
		addDynamicRecordsToAddressInfoTableOnPurchaseOrder(rows + 1);
	} else if (tabType == "TermsAndConditionInfo") {
		var rows = $('#termsAndConditionTablePurchaseOrder tbody tr.newAdded').length;
		addDynamicRecordsToTermsAndConditionTableOnPurchaseOrder(rows + 1);
	}

}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to add dynamic records to contact info table
 *          on purchase order
 * @param id
 * @returns {Boolean}
 */
function addDynamicRecordsToContactInfoTableOnPurchaseOrder(id) {

	var contactPerson = $("#contactPerson").val();
	var contactDesignation = $("#contactDesignation").val();
	var contatcAddress = $("#contatcAddress").val();
	var contactGender = $("#contactGender").val();
	var contactDob = $("#contactDateofbirth").val();
	var contactPhoneOne = $("#contactPhoneOne").val();
	var contactPhoneSecond = $("#contactPhoneSecond").val();
	var contactMail = $("#contactMail").val();
	if (contactPerson == "") {
		alert("Contact Person name shouldnot  be  empty ..!");
		$("#contactPerson").focus();
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
			+ ' <td class="col-md-1 center" id="contactPhoneOneId'
			+ id
			+ '" style="display:none">'
			+ contactPhoneOne
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactPhoneSecondId'
			+ id
			+ '" style="display:none">'
			+ contactPhoneSecond
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
			+

			' <td class="col-md-1 center" id="contactInfoId'
			+ id
			+ '" style="display:none">'
			+ 0
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactInfoId1'
			+ id
			+ '" style="display:none" >'
			+ id
			+ '</td>'
			+

			' <td class="col-md-1 center"><input type="hidden" id="editContactPartMaster'
			+ id
			+ '" value="'
			+ id
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editContactInfoPartyMasterOnPO('
			+ id
			+ ',\'fromUI\')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deleteContactPartMaster'
			+ id + '" onclick="deletePartyMasterSlaveOnPRO(' + id
			+ ',\'deleteContact\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyContactTableInfoList").append(htm);
	$('#contactFormId')[0].reset();

}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to set modal info to table on purchase order
 *          and rest form as well this function is dynamic
 * @param id
 * @returns {Boolean}
 */

function addDynamicRecordsToAddressInfoTableOnPurchaseOrder(id) {

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

	var hiddenCountryName = $("#hiddenCountryFromAddress").val();
	var hiddenStateName = $("#hiddenStateFromPartyAddress").val();
	var hiddenDistrictName = $("#hiddenDistrictFromPartyAddress").val();
	var hiddenTalukaName = $("#hiddenTalukaFromPartyAddress").val();
	var hiddenCityName = $("#hiddenCityFromPartyMaster").val();

	if (companyAddress == "") {
		alert("address should not be empty..!");
		$("#addressFromAddress").focus();
		return false;

	}
	if (hiddenCityName != "") {
		var pattern = /^([a-zA-Z]+.\s?)*$/;
		if (!pattern.test(hiddenCityName)) {
			alert("City name should be of alphabets only with a single space allowed..!");
			$("#cityFromAddress").focus();
			return false;
		}

	}

	if (companyPin != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(companyPin)) {
			alert("Pin code should be of digits only!");
			$("#pincodeFromAddress").focus();
			return false;
		}
	}

	if (hiddenStateName != "") {
		var pattern = /^([a-zA-Z0-9]+\s?)*$/;
		if (!pattern.test(hiddenStateName)) {
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
			+ ' <td class="col-md-1 center" id="companyDistictId'
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
			+

			' <td class="col-md-1 center" id="addressInfoId1'
			+ id
			+ '" style="display:none">'
			+ id
			+ '</td>'
			+

			' <td class="col-md-1 center" id="addInfoId'
			+ id
			+ '" style="display:none">'
			+ id
			+ '</td>'
			+

			' <td class="col-md-1 center"><input type="hidden" id="editAddressPartMaster'
			+ id
			+ '" value="'
			+ id
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editAddressInfoPartyMasterOnPO('
			+ id
			+ ',\'fromUI\')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deleteAddressPartMaster'
			+ id + '" onclick="deletePartyMasterSlaveOnPRO(' + id
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
 * @author Vishnu Thorat
 * @since 05112019
 * @comment Below js code save Purchase Re Order and slaves details w.r.t purchase
 *          order id
 ******************************************************************************/
function savePurchaseReOrder() {
	var orderNo = $("#orderNoId").val();
	var supplierMobileNo = $("#supplierMobileNoId").val();
	var orderDate = $("#orderDateId").val();
	var deliveryDate = $("#deliveryDateId").val();
	var supplierAddress = $("#supplierAddressId").val();
	var supplierName = $("#hiddenSupplierNameId").val();
	// added by Vishnu
	var supplierId = $("#hiddenPartyMasterId").val();
	var orderSeries = $("#orderSeriesId").val();
	var orderStatus = $("#orderStatusId").val();
	if(orderStatus == '0'){
		alertify.error("Please select order status");
		return false;
	}

	var supplierState = $("#supplierStateId").val();
	
	var purchaseQuotationNumber = $("#purchaseQuotationNumberId").val();
	// var termsAndCondition = $("#termconditionIdPurchaseOrderId").val();
	var partyMasterId = $("#hiddenPartyMasterId").val();
	var purchaseOrderRemark = $("#purchaseOrderRemarkId").val();
	// calculation values
	var lessSpecialDiscount = $("#lessSpecialDiscountId").val();
	var lessDebitAmount = $("#lessDebitAmountId").val();
	var lessCDPercent1 = $("#lessCDPercent1Id").val();
	var lessCDPercent2 = $("#lessCDPercent2Id").val();
	var addOctroi = $("#addOctroiId").val();
	var addSurcharge = $("#addSurchargeId").val();
	var addCreditAmount = $("#addCreditAmountId").val();
	var addFreight = $("#addFreightId").val();
	// below is the total GST value inside box
	var taxVat = $("#taxVatId").val();
	// below is the total IGST value inside box
	var igstTotalValue = $("#taxIgstId").val();
	var taxLBT = $("#taxLBTId").val();
	var taxCST = $("#taxCSTId").val();
	var taxExVat = $("#taxExVatId").val();
	var taxTotalTaxes = $("#taxTotalTaxesId").val();
	var grossAmount = $("#grossAmountId").val();
	var grossLessAmount = $("#grossLessAmountId").val();
	var grossAddAmount = $("#grossAddAmountId").val();
	var grossTaxes = $("#grossTaxesId").val();
	var grossNetAmount = $("#grossNetAmountId").val();
	var totalgstAmount = $("#totalGstAmt").val();
	var totalIgstAmount = $("#totaliGstAmt").val();
	var partGstNo = $("#partGstNo").val();

	var userId = $("#userId").val();
	var unitId = $("#unitId").val();
	var id = $("#purchaseOrderId").val();
	var referenceNo = $("#referenceNoId").val();

	// var supplierStateName = $("#supplierStateId").text();
	var supplierStateName = $("#supplierStateId option:selected").text();

	var purchaseReOrderItemSlaveDetails = {
		lstPurchaseReOrderItemSlaveDto : []
	};
	var purchaseReOrderPartyContactDetails = {
		partyMasterContactInfoDto : []
	};
	var purchaseReOrderPartyAddressDetails = {
		partyMasterAddressInfoDto : []
	};

	var rowsPurchaseReOrderItemSlave = $('#ItemInfoTablePO tbody tr.newAdded').length;
	var rowsPurchaseReOrderPartyContactSlave = $('#contactInfoTablePurchaseOrder tbody tr.newAdded').length;
	var rowsPurchaseReOrderPartyAddressSlave = $('#addressInfoTablePurchaseOrder tbody tr.newAdded').length;

	// validation
	if (supplierName == "" || supplierName == null || supplierName == undefined
			|| supplierName == "undefined") {
		alert("please enter supplier name");
		$("#supplierName").focus();
		return false;
	}
	if (orderDate == "" || orderDate == null || orderDate == undefined
			|| orderDate == "undefined") {
		alert("please select purchase order date");
		$("#orderDateId").focus();
		return false;
	}
	if (deliveryDate == "" || deliveryDate == null || deliveryDate == undefined
			|| deliveryDate == "undefined") {
		alert("please select purchase order delivery date");
		$("#deliveryDateId").focus();
		return false;
	}
	if (referenceNo == "" || referenceNo == null || referenceNo == undefined
			|| referenceNo == "undefined") {
		alert("please select purchase order reference number");
		$("#referenceNoId").focus();
		return false;
	}
	var isChecked  = false;
	var totalItemQuantity = 0;
	var totalItemDiscount = 0;
	for ( var i = 1; i <= rowsPurchaseReOrderItemSlave; i++) {
		var itemSlaveId = $("#itemSlaveId" + i).val();
		var itemMasterId = $("#itemMasterId" + i).val();
		var txtPurchaseQuotationItemName = $(
				"#txtPurchaseQuotationItemName_" + i).val();

		if (txtPurchaseQuotationItemName == ""
				|| txtPurchaseQuotationItemName == null
				|| txtPurchaseQuotationItemName == undefined
				|| txtPurchaseQuotationItemName == "undefined") {
			alert("Without Filling Item Details You Cannot Raise PO..!!!");
			$("#txtPurchaseQuotationItemName_" + i).focus();
			return false;
		}

		var txtPurchaseQuotationDocQuantity = $(
				"#txtPurchaseQuotationDocQuantity" + i).val();
		var txtPurchaseQuotationUnitPrice = $(
				"#txtPurchaseQuotationUnitPrice" + i).val();
		var txtPurchaseQuotationTrdeDiscountPercentage = $(
				"#txtPurchaseQuotationTrdeDiscountPercentage" + i).val();
		var txtPurchaseQuotationTrdeDiscountInRupess = $(
				"#txtPurchaseQuotationTrdeDiscountInRupess" + i).val();
		var txtPurchaseQuotationTrdeDiscountAmt = $(
				"#txtPurchaseQuotationTrdeDiscountAmt" + i).val();
		var txtPurchaseQuotationBaseAmount = $(
				"#txtPurchaseQuotationBaseAmount" + i).val();
		// below is the item wise GST value
		var txtPurchaseQuotationTaxCodePO = $(
				"#txtPurchaseQuotationTaxCodePO_" + i).val();
		// below is the item wise IGST value
		var txtPurchaseQuotationTaxAmount = $(
				"#txtPurchaseQuotationTaxAmount_" + i).val();
		// below is the item wise GST amount value
		var txtPurchaseOrderTaxAmtinRs = $("#txtPurchaseOrderTaxAmtinRs" + i)
				.val();
		// below is the item wise IGST amount value
		var igstAmountValue = $("#igstAmtId" + i).val();
		// below is the total amount
		var totalAmount = $("#txtPurchaseQuotationRowAmount" + i).val();
		var txtPurchaseQuotationFactorOne = $(
				"#txtPurchaseQuotationFactorOne" + i).val();
		var txtPurchaseQuotationFactorTwo = $(
				"#txtPurchaseQuotationFactorTwo" + i).val();
		var txtPurchaseQuotationFactorThree = $(
				"#txtPurchaseQuotationFactorThree" + i).val();
		var txtPurchaseQuotationFactorFour = $(
				"#txtPurchaseQuotationFactorFour" + i).val();
		var txtPurchaseQuotationActualQuantity = $(
				"#txtPurchaseQuotationActualQuantity" + i).val();
		var txtPurchaseQuotationPendingQuantity = $(
				"#txtPurchaseQuotationPendingQuantity" + i).val();
		var hsnName = $("#hsnCodePurchaseOrder" + i).val();
		var hsnNameValue = $("#hsnCodeNamePurchaseOrder" + i).val();

		// this is added by Vishnu for unit factor name
		var uomUnitLatestFactorId = $("#uomUnitLatestFactorId" + i).text();
		var uomUnitFactorOneNameId = $("#uomUnitFactorOneNameId" + i).text();
		var uomUnitFactorTwoNameId = $("#uomUnitFactorTwoNameId" + i).text();
		var uomUnitFactorThreeNameId = $("#uomUnitFactorThreeNameId" + i).text();
		var uomUnitFactorFourNameId = $("#uomUnitFactorFourNameId" + i).text();
		
		var assetItemManufacture = $("#assetItemManufactureId" + i).val();
		var assetAmcVal = $("#assetAmcValId" + i).val();
		var assetPmVal = $("#assetPmValId" + i).val();
		var assetAmcYear = $("#assetAmcYearId" + i).val();
		var assetPmYear = $("#assetPmYearId" + i).val();
		var assetProductWarranty = $("#assetProductWarrantyId" + i).val();
		var assetProductCategory = $("#assetProductCategory" + i).val();
		var labEquipmentItemStatus = $("#labEquipmentItemStatusId" + i).val();
		
		var reagentItemStatus = $("#reagentItemStatusId" + i).val();
		var assetItemStatusId = $("#assetItemStatusId" + i).val();

		var isItemBatchWiseId = $("#isItemBatchWiseId" + i).val();
		if($('#checkbox'+i+':checkbox:checked').length > 0){
			totalItemQuantity = parseInt(totalItemQuantity) + parseInt(txtPurchaseQuotationDocQuantity);
			totalItemDiscount = parseInt(totalItemDiscount) + parseInt(txtPurchaseQuotationTrdeDiscountAmt);
			$("#totalItemQuantityId").val(totalItemQuantity);
			$("#totalItemDiscountId").val(totalItemDiscount);
			isChecked = true;
			setPurchaseReOrderItemSlaveList(purchaseReOrderItemSlaveDetails,
					itemSlaveId, itemMasterId, txtPurchaseQuotationItemName,
					txtPurchaseQuotationDocQuantity, txtPurchaseQuotationUnitPrice,
					txtPurchaseQuotationTrdeDiscountPercentage,
					txtPurchaseQuotationTrdeDiscountInRupess,
					txtPurchaseQuotationTrdeDiscountAmt,
					txtPurchaseQuotationBaseAmount, txtPurchaseQuotationTaxCodePO,
					txtPurchaseQuotationTaxAmount, txtPurchaseOrderTaxAmtinRs,
					txtPurchaseQuotationFactorOne, txtPurchaseQuotationFactorTwo,
					txtPurchaseQuotationFactorThree,
					txtPurchaseQuotationFactorFour,
					txtPurchaseQuotationActualQuantity,
					txtPurchaseQuotationPendingQuantity, hsnName, hsnNameValue,
					igstAmountValue, totalAmount, uomUnitLatestFactorId,
					uomUnitFactorOneNameId, uomUnitFactorTwoNameId,
					uomUnitFactorThreeNameId, uomUnitFactorFourNameId,reagentItemStatus, assetItemStatusId, isItemBatchWiseId,
					assetItemManufacture,assetAmcVal,assetPmVal,assetAmcYear,assetPmYear,assetProductWarranty,assetProductCategory,
					labEquipmentItemStatus);
		}
		
	}
	if(isChecked == false){
		alert("Please mark as checked atleat one checkbox for purchase return order slave records !!");
		return false;
	}
	for ( var i = 1; i <= rowsPurchaseReOrderPartyContactSlave; i++) {
		var userId = $("#userId").val();
		var unitId = $("#unitId").val();
		var contactInfoId = $("#contactInfoId" + i).html();
		var contactPersonId = $("#contactPersonId" + i).html();
		var contactDesignationId = $("#contactDesignationId" + i).html();
		var contatcAddressId = $("#contatcAddressId" + i).html();
		var contactGenderId = $("#contactGenderId" + i).html();
		var contactDobId = $("#contactDobId" + i).html();
		var contactPhoneOneId = $("#contactPhoneOneId" + i).html();
		var contactPhoneSecondId = $("#contactPhoneSecondId" + i).html();
		var contactMailId = $("#contactMailId" + i).html();
		setPurchaseReOrderPartyContactSlaveList(purchaseReOrderPartyContactDetails,
				contactPersonId, contactDesignationId, contatcAddressId,
				contactGenderId, contactDobId, contactPhoneOneId,
				contactPhoneSecondId, contactMailId, contactInfoId, userId,
				unitId);
	}
	for ( var i = 1; i <= rowsPurchaseReOrderPartyAddressSlave; i++) {

		var userId = $("#userId").val();
		var unitId = $("#unitId").val();
		var addressInfoId = $("#addressInfoId" + i).html();
		var companyAddressType = $("#companyAddressTypeId" + i).html();
		var companyNameId = $("#companyNameId" + i).html();
		var companyCountryName = $("#companyCountryId" + i).html();
		var companyStateName = $("#companyStateId" + i).html();
		var companyDistrictName = $("#companyDistrictId" + i).html();
		var companyTalukaName = $("#companyTalukaId" + i).html();
		var companyCityName = $("#companyCityId" + i).html();

		var countryId = $("#hiddenCountryNameId" + i).html();
		var stateId = $("#hiddenStateNameId" + i).html();
		var districtId = $("#hiddenDistrictNameId" + i).html();
		var talukaId = $("#hiddenTalukaNameId" + i).html();
		var cityId = $("#hiddenCityNameId" + i).html();
		var companyAddressId = $("#companyAddressId" + i).html();
		var companyStreetId = $("#companyStreetId" + i).html();
		var companyPinId = $("#companyPinId" + i).html();
		var companyAreaId = $("#companyAreaId" + i).html();

		setPurchaseReOrderPartyAddressSlaveList(purchaseReOrderPartyAddressDetails,
				addressInfoId, companyAddressType, companyNameId,
				companyAddressId, companyStreetId, companyPinId, companyAreaId,
				companyCityName, cityId, companyTalukaName, talukaId,
				companyDistrictName, districtId, companyStateName, stateId,
				companyCountryName, countryId, userId, unitId);
	}

	var partyMasterTermsAndConditionInfoDtoDetails = {
		termsAndConditionInfoDto : []
	};
	var rows = $('#TermsAndConditionInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var userId = $("#userId").val();
		var unitId = $("#unitId").val();
		var termsAndConditionTitleId = $("#txtTermsAndConditionsTitleId" + i)
				.html();
		var termsAndConditionNameId = $("#txtTermsAndConditionId" + i).html();
		var termsAndConditionInfoId = $("#termsAndCondId" + i).html();
		var termsAndConditionSlaveId = $("#termsAndCondSlaveId" + i).val();
		setTermsAndConditionInfoList(
				partyMasterTermsAndConditionInfoDtoDetails,
				termsAndConditionInfoId, termsAndConditionTitleId,
				termsAndConditionNameId, userId, unitId,
				termsAndConditionSlaveId);
	}

	partyMasterTermsAndConditionInfoDtoDetails = JSON
			.stringify(partyMasterTermsAndConditionInfoDtoDetails);
	purchaseReOrderItemSlaveDetails = JSON
			.stringify(purchaseReOrderItemSlaveDetails);
	purchaseReOrderPartyContactDetails = JSON
			.stringify(purchaseReOrderPartyContactDetails);
	purchaseReOrderPartyAddressDetails = JSON
			.stringify(purchaseReOrderPartyAddressDetails);
	
	//validation gross amount is not '0'
	if ($("#grossAmountId").val() == null || $("#grossAmountId").val() == "" || $("#grossAmountId").val() == "0") {
		alert("While Generating PO Gross Amount Should Not Be Zero..Re-Calculate the product details!!");
		return false;
	}
	//validation taxes amount is not '0'
	if ($("#grossTaxesId").val() == null || $("#grossTaxesId").val() == "" || $("#grossTaxesId").val() == "0") {
		alert("While Generating PO Taxes Amount Should Not Be Zero..Re-Calculate the product details!!");
		return false;
	}
	//validation net amount is not '0'
	if ($("#grossNetAmountId").val() == null || $("#grossNetAmountId").val() == "" || $("#grossNetAmountId").val() == "0") {
		alert("While Generating PO Net Amount Should Not Be Zero..Re-Calculate the product details!!");
		return false;
	}
	totalItemQuantity1 = $("#totalItemQuantityId").val();
	totalItemDiscount1 = $("#totalItemQuantityId").val();
	var inputs = [];
	// purchase order details
	inputs.push('id=' + id);
	inputs.push('orderNo=' + orderNo);
	inputs.push('supplierMobileNo=' + supplierMobileNo);
	inputs.push('orderDate=' + orderDate);
	inputs.push('deliveryDate=' + deliveryDate);
	inputs.push('supplierAddress=' + supplierAddress);
	inputs.push('supplierName=' + supplierName);
	inputs.push('orderSeries=' + orderSeries);
	inputs.push('supplierStateId=' + supplierState);
	inputs.push('orderStatus=' + orderStatus);
	inputs.push('totalItemQuantity=' + totalItemQuantity1);
	inputs.push('totalItemDiscount=' + totalItemDiscount1);
	inputs.push('purchaseQuotationNumber=' + purchaseQuotationNumber);
	inputs.push('referenceNo=' + referenceNo);
	// inputs.push('termsAndConditions=' + termsAndCondition);
	inputs.push('partyMasterId=' + partyMasterId);
	inputs.push('lessSpecialDiscount=' + lessSpecialDiscount);
	inputs.push('lessDebitAmount=' + lessDebitAmount);
	inputs.push('lessCDPercent1=' + lessCDPercent1);
	inputs.push('lessCDPercent2=' + lessCDPercent2);
	inputs.push('addOctroi=' + addOctroi);
	inputs.push('addSurcharge=' + addSurcharge);
	inputs.push('addCreditAmount=' + addCreditAmount);
	inputs.push('addFreight=' + addFreight);
	inputs.push('taxVat=' + taxVat);
	inputs.push('taxLBT=' + taxLBT);
	inputs.push('taxCST=' + taxCST);
	inputs.push('taxExVat=' + taxExVat);
	inputs.push('taxTotalTaxes=' + taxTotalTaxes);
	inputs.push('grossAmount=' + grossAmount);
	inputs.push('grossLessAmount=' + grossLessAmount);
	inputs.push('grossAddAmount=' + grossAddAmount);
	inputs.push('grossTaxes=' + grossTaxes);
	inputs.push('grossNetAmount=' + grossNetAmount);
	inputs.push('purchaseOrderRemark=' + purchaseOrderRemark);
	// added by Vishnu
	inputs.push('supplierId=' + supplierId);
	inputs.push('igstTotalValue=' + igstTotalValue);

	// added by Vishnu Thorat
	inputs.push('totalgstAmount=' + totalgstAmount);
	inputs.push('totalIgstAmount=' + totalIgstAmount);
	inputs.push('partGstNo=' + partGstNo);
	inputs.push('supplierState=' + supplierStateName);
	inputs.push('userId=' + userId);
	inputs.push('createdBy=' + userId);
	inputs.push('updatedBy=' + userId);
	inputs.push('unitId=' + unitId);
	// item slave details
	inputs.push('purchaseReOrderItemSlaveDetails='
			+ purchaseReOrderItemSlaveDetails);
	// party contact details
	inputs.push('purchaseReOrderPartyContactDetails='
			+ purchaseReOrderPartyContactDetails);
	// party address details
	inputs.push('purchaseReOrderPartyAddressDetails='
			+ purchaseReOrderPartyAddressDetails);
	inputs.push('partyMasterTermsAndConditionInfoDtoDetails='
			+ partyMasterTermsAndConditionInfoDtoDetails);

	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryPurchaseReOrder/savePurchaseReOrderModule",
		cache : false,
		success : function(r) {
			if (r[0] == 1) {
				if (document.getElementsByName("uploadPoDocs").length != 0 && $("#uploadPoDocument").val() != "") {
					uploadPurchaseOrderDocuments(r[1]);
				}
				alertify.success("Records Saved Sucessfully");
				setTimeout(function() {
					window.location.reload();
				}, 300);

			} else if (r[0] == 2) {
				
				if (document.getElementsByName("uploadPoDocs").length != 0 && $("#uploadPoDocument").val() != "") {
					uploadPurchaseOrderDocuments(r[1]);
				}
				alertify.success("Records Updated Sucessfully");
				setTimeout(function() {
					window.location.reload();
				}, 500);
			} else {
				alertify.error("Oops Some Problem Ocured");
			}

		}
	});

}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to set purchase re order item slave list details
 *          to pojo
 * @param txtPurchaseQuotationItemName
 * @param txtPurchaseQuotationDocQuantity
 * @param txtPurchaseQuotationUnitPrice
 * @param txtPurchaseQuotationTrdeDiscountPercentage
 * @param txtPurchaseQuotationTrdeDiscountInRupess
 * @param txtPurchaseQuotationTrdeDiscountAmt
 * @param txtPurchaseQuotationBaseAmount
 * @param txtPurchaseQuotationTaxCodePO
 * @param txtPurchaseQuotationTaxAmount
 * @param txtPurchaseOrderTaxAmtinRs
 * @param txtPurchaseQuotationFactorOne
 * @param txtPurchaseQuotationFactorTwo
 * @param txtPurchaseQuotationFactorThree
 * @param txtPurchaseQuotationFactorFour
 * @param txtPurchaseQuotationActualQuantity
 * @param txtPurchaseQuotationPendingQuantity
 * @returns
 */
function setPurchaseReOrderItemSlaveList(purchaseReOrderItemSlaveDetails,
		itemSlaveId, itemMasterId, txtPurchaseQuotationItemName,
		txtPurchaseQuotationDocQuantity, txtPurchaseQuotationUnitPrice,
		txtPurchaseQuotationTrdeDiscountPercentage,
		txtPurchaseQuotationTrdeDiscountInRupess,
		txtPurchaseQuotationTrdeDiscountAmt, txtPurchaseQuotationBaseAmount,
		txtPurchaseQuotationTaxCodePO, txtPurchaseQuotationTaxAmount,
		txtPurchaseOrderTaxAmtinRs, txtPurchaseQuotationFactorOne,
		txtPurchaseQuotationFactorTwo, txtPurchaseQuotationFactorThree,
		txtPurchaseQuotationFactorFour, txtPurchaseQuotationActualQuantity,
		txtPurchaseQuotationPendingQuantity, hsnName, hsnNameValue,
		igstAmountValue, totalAmount, uomUnitLatestFactorId,
		uomUnitFactorOneNameId, uomUnitFactorTwoNameId,
		uomUnitFactorThreeNameId, uomUnitFactorFourNameId,reagentItemStatus, assetItemStatusId, isItemBatchWiseId,
		assetItemManufacture,assetAmcVal,assetPmVal,assetAmcYear,assetPmYear,assetProductWarranty,assetProductCategory,
		labEquipmentItemStatus) {

	purchaseReOrderItemSlaveDetails.lstPurchaseReOrderItemSlaveDto.push({
		/*id : itemSlaveId,
		item_master_id : itemMasterId,
		itemName : txtPurchaseQuotationItemName,
		itemQuantity : txtPurchaseQuotationDocQuantity,
		itemUnitPrice : txtPurchaseQuotationUnitPrice,
		itemTradeDiscount : txtPurchaseQuotationTrdeDiscountPercentage,
		itemTradeDiscountRupees : txtPurchaseQuotationTrdeDiscountInRupess,
		itemTradeDiscountAmount : txtPurchaseQuotationTrdeDiscountAmt,
		itemTradeBaseAmount : txtPurchaseQuotationBaseAmount,
		gst : txtPurchaseQuotationTaxCodePO,
		igst : txtPurchaseQuotationTaxAmount,
		// below is the GST total tax amount is rs
		gstAmountValue : txtPurchaseOrderTaxAmtinRs,
		// below is the IGST total tax amount is rs
		igstAmountValue : igstAmountValue,
		itemPurchaseFactorUom1 : txtPurchaseQuotationFactorOne,
		itemPurchaseFactorUom2 : txtPurchaseQuotationFactorTwo,
		itemPurchaseFactorUom3 : txtPurchaseQuotationFactorThree,
		itemPurchaseFactorUom4 : txtPurchaseQuotationFactorFour,
		itemActualQuantity : txtPurchaseQuotationActualQuantity,
		itemPendingQuantity : txtPurchaseQuotationPendingQuantity,
		hsnName : hsnName,
		hsnNameValue : hsnNameValue,
		// below is the total amount
		totalAmount : totalAmount,
		uomUnitLatestFactorName : uomUnitLatestFactorId,
		uomUnitFactorOneName : uomUnitFactorOneNameId,
		uomUnitFactorTwoName : uomUnitFactorTwoNameId,
		uomUnitFactorThreeName : uomUnitFactorThreeNameId,
		uomUnitFactorFourName : uomUnitFactorFourNameId,
		itemReagentStatus : (reagentItemStatus != 'undefined' && reagentItemStatus != null && reagentItemStatus != '') ? reagentItemStatus : 0,
		itemAssetStatus : assetItemStatusId,
		isItemBatchWise : (isItemBatchWiseId != 'undefined' && isItemBatchWiseId != null && isItemBatchWiseId !="") ? isItemBatchWiseId : "NO",
		manufactureName : (assetItemManufacture != 'undefined' && assetItemManufacture != null) ? assetItemManufacture : null,
		amcVal : (assetAmcVal != 'undefined' && assetAmcVal != null) ? assetAmcVal : 0,
		pmVal : (assetPmVal != 'undefined' && assetPmVal != null) ? assetPmVal : 0,
		amcYear : (assetAmcYear != 'undefined' && assetAmcYear != null) ? assetAmcYear : null,
		pmYear : (assetPmYear != 'undefined' && assetPmYear != null) ? assetPmYear: null,
		productWarranty : (assetProductWarranty != 'undefined' && assetProductWarranty != null) ? assetProductWarranty : null,
		productCategory : (assetProductCategory != 'undefined' && assetProductCategory != null) ? assetProductCategory : null,
		itemLabEquipmentStatus : (labEquipmentItemStatus != 'undefined' && labEquipmentItemStatus != null && labEquipmentItemStatus != '') ? labEquipmentItemStatus : 0,*/

		id : itemSlaveId,
		item_master_id : itemMasterId,
		itemName : txtPurchaseQuotationItemName,
		itemQuantity : txtPurchaseQuotationDocQuantity,
		itemUnitPrice : (txtPurchaseQuotationUnitPrice != 'undefined' && txtPurchaseQuotationUnitPrice != null) ? txtPurchaseQuotationUnitPrice : 0,
		itemTradeDiscount : (txtPurchaseQuotationTrdeDiscountPercentage != 'undefined' && txtPurchaseQuotationTrdeDiscountPercentage != null && txtPurchaseQuotationTrdeDiscountPercentage !='') ? txtPurchaseQuotationTrdeDiscountPercentage : 0,
		itemTradeDiscountRupees : (txtPurchaseQuotationTrdeDiscountInRupess != 'undefined' && txtPurchaseQuotationTrdeDiscountInRupess != null && txtPurchaseQuotationTrdeDiscountInRupess !='') ? txtPurchaseQuotationTrdeDiscountInRupess : 0,
		itemTradeDiscountAmount : (txtPurchaseQuotationTrdeDiscountAmt != 'undefined' && txtPurchaseQuotationTrdeDiscountAmt != null && txtPurchaseQuotationTrdeDiscountAmt !='') ? txtPurchaseQuotationTrdeDiscountAmt : 0,
		itemTradeBaseAmount : (txtPurchaseQuotationBaseAmount != 'undefined' && txtPurchaseQuotationBaseAmount != null && txtPurchaseQuotationBaseAmount !='') ? txtPurchaseQuotationBaseAmount : 0,
		gst : (txtPurchaseQuotationTaxCodePO != 'undefined' && txtPurchaseQuotationTaxCodePO != null) ? txtPurchaseQuotationTaxCodePO : 0,
		igst : (txtPurchaseQuotationTaxAmount != 'undefined' && txtPurchaseQuotationTaxAmount != null) ? txtPurchaseQuotationTaxAmount : 0,
		// below is the GST total tax amount is rs
		gstAmountValue : (txtPurchaseOrderTaxAmtinRs != 'undefined' && txtPurchaseOrderTaxAmtinRs != null) ? txtPurchaseOrderTaxAmtinRs : 0,
		// below is the IGST total tax amount is rs
		igstAmountValue : (igstAmountValue != 'undefined' && igstAmountValue != null) ? igstAmountValue : 0,
		itemPurchaseFactorUom1 : (txtPurchaseQuotationFactorOne != 'undefined' && txtPurchaseQuotationFactorOne != null) ? txtPurchaseQuotationFactorOne : 0,
		itemPurchaseFactorUom2 : (txtPurchaseQuotationFactorTwo != 'undefined' && txtPurchaseQuotationFactorTwo != null) ? txtPurchaseQuotationFactorTwo : 0,
		itemPurchaseFactorUom3 : (txtPurchaseQuotationFactorThree != 'undefined' && txtPurchaseQuotationFactorThree != null) ? txtPurchaseQuotationFactorThree : 0,
		itemPurchaseFactorUom4 : (txtPurchaseQuotationFactorFour != 'undefined' && txtPurchaseQuotationFactorFour != null) ? txtPurchaseQuotationFactorFour : 0,
		itemActualQuantity : (txtPurchaseQuotationActualQuantity != 'undefined' && txtPurchaseQuotationActualQuantity != null) ? txtPurchaseQuotationActualQuantity : 0,
		itemPendingQuantity : (txtPurchaseQuotationPendingQuantity != 'undefined' && txtPurchaseQuotationPendingQuantity != null) ? txtPurchaseQuotationPendingQuantity : 0,
		hsnName : (hsnName != 'undefined' && hsnName != null) ? hsnName : 0,
		hsnNameValue : (hsnNameValue != 'undefined' && hsnNameValue != null) ? hsnNameValue : 0,
		// below is the total amount
		totalAmount :(totalAmount != 'undefined' && totalAmount != null) ? totalAmount : 0,
		uomUnitLatestFactorName : uomUnitLatestFactorId,
		uomUnitFactorOneName : uomUnitFactorOneNameId,
		uomUnitFactorTwoName : uomUnitFactorTwoNameId,
		uomUnitFactorThreeName : uomUnitFactorThreeNameId,
		uomUnitFactorFourName : uomUnitFactorFourNameId,
		itemReagentStatus : (reagentItemStatus != 'undefined' && reagentItemStatus != null && reagentItemStatus != '') ? reagentItemStatus : 0,
		itemAssetStatus : (assetItemStatusId != 'undefined' && assetItemStatusId != null && assetItemStatusId !=undefined && assetItemStatusId !="null" ) ? assetItemStatusId : 0,
		isItemBatchWise : (isItemBatchWiseId != 'undefined' && isItemBatchWiseId != null && isItemBatchWiseId !="") ? isItemBatchWiseId : "NO",
		manufactureName : (assetItemManufacture != 'undefined' && assetItemManufacture != null && assetItemManufacture!=undefined && assetItemManufacture !="null") ? assetItemManufacture : 'NA',
		amcVal : (assetAmcVal != 'undefined' && assetAmcVal != null && assetAmcVal !='null') ? assetAmcVal : 0,
		pmVal : (assetPmVal != 'undefined' && assetPmVal != null && assetPmVal !='null') ? assetPmVal : 0,
		amcYear : (assetAmcYear != 'undefined' && assetAmcYear != null && assetAmcYear !='null') ? assetAmcYear : 'NA',
		pmYear : (assetPmYear != 'undefined' && assetPmYear != null && assetPmYear !='null') ? assetPmYear: 'NA',
		productWarranty : (assetProductWarranty != 'undefined' && assetProductWarranty != null && assetProductWarranty !='null') ? assetProductWarranty : 'NA',
		productCategory : (assetProductCategory != 'undefined' && assetProductCategory != null && assetProductCategory !='null') ? assetProductCategory : 'NA',
		itemLabEquipmentStatus : (labEquipmentItemStatus != 'undefined' && labEquipmentItemStatus != null && labEquipmentItemStatus != '' && labEquipmentItemStatus !='null') ? labEquipmentItemStatus : 0,
	
	});
}
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to set purchase re order party contact slave
 *          list to pojo
 * @param purchaseOrderPartyContactDetails
 * @param contactPerson
 * @param contactDesignation
 * @param contactAddress
 * @param contactGender
 * @param contactDateofbirth
 * @param contactPhoneOne
 * @param contactPhoneSecond
 * @param contactMail
 */
function setPurchaseReOrderPartyContactSlaveList(
		purchaseReOrderPartyContactDetails, contactPersonId,
		contactDesignationId, contatcAddressId, contactGenderId, contactDobId,
		contactPhoneOneId, contactPhoneSecondId, contactMailId, contactInfoId,
		userId, unitId) {

	purchaseReOrderPartyContactDetails.partyMasterContactInfoDto.push({
		id : contactInfoId,
		contactName : contactPersonId,
		contactDesignation : contactDesignationId,
		contactAddress : contatcAddressId,
		contactGender : contactGenderId,
		contactDob : contactDobId,
		contactPhoneNumber1 : contactPhoneOneId,
		contactPhoneNumber2 : contactPhoneSecondId,
		contactEmail : contactMailId,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId,
	});

}
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to set purchase order address slave list to
 *          pojo
 * @param purchaseReOrderPartyAddressDetails
 * @param companyName
 * @param cityId
 * @param companyStreet
 * @param companyPin
 * @param companyArea
 * @param countryId
 * @param stateId
 * @param companyAddress
 * @param companyAddressType
 */
function setPurchaseReOrderPartyAddressSlaveList(
		purchaseReOrderPartyAddressDetails, addressInfoId, companyAddressType,
		companyNameId, companyAddressId, companyStreetId, companyPinId,
		companyAreaId, companyCityName, cityId, companyTalukaName, talukaId,
		companyDistrictName, districtId, companyStateName, stateId,
		companyCountryName, countryId, userId, unitId) {

	purchaseReOrderPartyAddressDetails.partyMasterAddressInfoDto.push({
		id : addressInfoId,
		addressType : companyAddressType,
		companyName : companyNameId,
		address : companyAddressId,
		street : companyStreetId,
		pin : companyPinId,
		area : companyAreaId,
		city : companyCityName,
		cityId : cityId,
		talukaName : companyTalukaName,
		talukaId : talukaId,
		districtName : companyDistrictName,
		districtId : districtId,
		state : companyStateName,
		stateId : stateId,
		country : companyCountryName,
		countryId : countryId,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId,

	});

}
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to add dynamic records to terms and condition
 *          table on purchase order
 * @param id
 */
function addDynamicRecordsToTermsAndConditionTableOnPurchaseOrder(id) {
	var termsAndConditionsTitle = $("#termsAndConditionsTitle option:selected")
			.html();
	var termsAndConditionsTitleVal = $(
			"#termsAndConditionsTitle option:selected").val();
	var termsAndCondition = $("#termsAndCondition").val();

	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center" id="txtTermsAndConditionsTitleId'
			+ id
			+ '">'
			+ termsAndConditionsTitle
			+ '</td>'
			+ ' <td class="col-md-1 center" id="txtTermsAndConditionId'
			+ id
			+ '">'
			+ termsAndCondition
			+ '</td>'
			+ id
			+ '">'
			+ ' <td class="col-md-1 center" id="termsAndCondId'
			+ id
			+ '" style="display:none">'
			+ 0
			+ '</td>'
			+ ' <td class="col-md-1 center"><input type="hidden" id="termsAndCondSlaveId'
			+ id
			+ '" value="'
			+ termsAndConditionsTitleVal
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editTermsAndConditionInfoPartyMasterOnPO('
			+ termsAndConditionsTitleVal
			+ ')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deleteTermsAndCondition'
			+ id + '" onclick="deletePartyMasterSlaveOnPRO('
			+ termsAndConditionsTitleVal + ',\'deleteTermsAndCondition\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#TermsAndConditionInfoTableList").append(htm);
	$('#termsAndConditionsTitle').select2('val', 0);
	$('#termsAndCondition').val("").empty();

}
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to set check trade amount percentage
 * @param id
 * @param rowcount
 */

function chkTradAmtorPercentage(id, rowcount) {
	var matches = id.match(/(\d+)/);
	if(matches[0] != rowcount){
		rowcount = matches[0];
	}
	var txtPurchaseQuotationTrdeDiscountPercentage = $("#txtPurchaseQuotationTrdeDiscountPercentage" + rowcount).val();
	var txtTredeAmt = $("#txtPurchaseQuotationTrdeDiscountPercentage" + rowcount).val();

	if (txtPurchaseQuotationTrdeDiscountPercentage == ''|| txtPurchaseQuotationTrdeDiscountPercentage == null) {
		document.getElementById("txtPurchaseQuotationTrdeDiscountInRupess"+ rowcount).disabled = false;
		$("#txtPurchaseQuotationTrdeDiscountAmt" + rowcount).val(' ');
		$("#txtPurchaseQuotationBaseAmount" + rowcount).val(' ');
		$("#txtPurchaseQuotationRowAmount" + rowcount).val(' ');
	}

	if (!txtPurchaseQuotationTrdeDiscountPercentage == ''
			|| !txtPurchaseQuotationTrdeDiscountPercentage == null) {
		document.getElementById("txtPurchaseQuotationTrdeDiscountInRupess"
				+ rowcount).disabled = true;
		$("#txtPurchaseQuotationTrdeDiscountInRupess" + rowcount).val(0);
		calculTradeDis("txtPurchaseQuotationTrdeDiscountPercentage", rowcount);
	}
}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to calculate trade discount
 * @param id
 * @param rowCount
 * @returns {Boolean}
 */
function calculTradeDis(id, rowCount) {
	var treadeDiscount = $(
			"#txtPurchaseQuotationTrdeDiscountPercentage" + rowCount).val();
	var oldbaseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
	if (treadeDiscount > 100) {
		alert("Trade Discount should not more than 100");
		$("#txtPurchaseQuotationTrdeDiscountPercentage" + rowCount).val('');

		$("#txtPurchaseQuotationTrdeDiscountAmt" + rowCount).val('');
		$("#txtPurchaseQuotationBaseAmount" + rowCount).val('');
		$("#txtPurchaseQuotationRowAmount" + rowCount).val('');
		var docqty = $("#txtPurchaseQuotationDocQuantity" + rowCount).val();
		var unitprise = $("#txtPurchaseQuotationUnitPrice" + rowCount).val();
		var baseAmt = docqty * unitprise;
		$("#txtPurchaseQuotationBaseAmount" + rowCount).val(baseAmt.toFixed(2));
		$("#txtPurchaseQuotationTrdeDiscountPercentage" + rowCount).focus();
		return false;
	} else {
		if (treadeDiscount) {
			
			$('#txtPurchaseQuotationBaseAmount' + rowCount).val('');
			$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val('');
			
			var docqty = $("#txtPurchaseQuotationDocQuantity" + rowCount).val();
			var unitprise = $("#txtPurchaseQuotationUnitPrice" + rowCount)
					.val();
			
			var baseAmt = docqty * unitprise;
			
			var totalAmtInpercntage = baseAmt * treadeDiscount / 100;
			$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val(
					totalAmtInpercntage);
			
			var finalBaseAmt = baseAmt - totalAmtInpercntage;
			$('#txtPurchaseQuotationBaseAmount' + rowCount).val(
					finalBaseAmt.toFixed(2));
			
			var totaltblsize = $("#totaltblsize").val();
			var FinaltradeDiscount = 0;
			for ( var i = 1; i <= totaltblsize; i++) {
				var txtPurchaseQuotationTrdeDiscountAmt = $(
						"#txtPurchaseQuotationTrdeDiscountAmt" + i).val();
				if (txtPurchaseQuotationTrdeDiscountAmt != ''
						&& txtPurchaseQuotationTrdeDiscountAmt != null
						&& txtPurchaseQuotationTrdeDiscountAmt != undefined) {
					FinaltradeDiscount = (parseFloat(FinaltradeDiscount) + parseFloat(txtPurchaseQuotationTrdeDiscountAmt))
							.toFixed(2);
				}
			}
			$("#txtPurchaseOrderTotalDocDiscount").val(FinaltradeDiscount);
			$("#totalItemDiscountId").val(FinaltradeDiscount);
		}
	}
	rowAmtCal(1, rowCount);
	totalGrossAmtPO(1, rowCount);
	totalVatAmt(1, rowCount);
}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to validate numbers
 * @param key
 * @returns {Boolean}
 */
function validateNumbers(key) {
	var keycode = (key.which) ? key.which : key.keyCode;
	if ((keycode > 47 && keycode < 58) || (keycode > 95 && keycode < 106)
			|| keycode == 8 || keycode == 9 || keycode == 127 || keycode == 13
			|| keycode == 27 || keycode == 46) {

		return true;
	} else {
		alert("Please Enter Numbers Only!");
		return false;
	}
}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to row amount calculate
 * @param id
 * @param rowCount
 * @returns {Boolean}
 */
function rowAmtCal(id, rowCount) {
	
	var gstTaxAmt = 0;
	var iGgstTaxAmt = 0;
	var taxAmt = $("#txtPurchaseQuotationTaxAmount" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#txtPurchaseQuotationRowAmount' + rowCount).val('');
	}
	
	if($("#txtPurchaseQuotationTaxAmount_" + rowCount).val() == 0 && $("#txtPurchaseQuotationTaxCodePO_" + rowCount).val() > 0){
		taxAmt = 	$("#txtPurchaseQuotationTaxCodePO_" + rowCount).val();
	}else if($("#txtPurchaseQuotationTaxAmount_" + rowCount).val() > 0 && $("#txtPurchaseQuotationTaxCodePO_" + rowCount).val() == 0){
		taxAmt = 	$("#txtPurchaseQuotationTaxAmount_" + rowCount).val();
	}
	
	var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
	if (baseAmt == " " || baseAmt == null) {
		$("#txtPurchaseQuotationRowAmount" + rowCount).val(' ');
		return false;
	} else {
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();

		var userState = $('#userState').val();
		var hiddenVenderState = $('#hiddenVenderStatePO').val();
		if(userState == hiddenVenderState){
			gstTaxAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
			$('#txtPurchaseOrderTaxAmtinRs' + rowCount).val(gstTaxAmt);
			$('#igstAmtId' + rowCount).val(0);
		}else{
			iGgstTaxAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
			$('#igstAmtId' + rowCount).val(iGgstTaxAmt);
			$('#txtPurchaseOrderTaxAmtinRs' + rowCount).val(0);
		}
		
		//var taxAmt = $("#txtPurchaseQuotationTaxAmount_" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
	///	$('#txtPurchaseOrderTaxAmtinRs' + rowCount).val(finalcaltaxanmount); // add
		// tax
		// amount
		// in
		// Rs
		// @author:paras
		// @Date:23nov
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmtcalculationgTax = finalsumofRowAmt.toFixed(2);
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(
				finalRowAmtcalculationgTax);
	}

}
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to calculate total VAT amount
 * @param id
 * @param rowCount
 */
function totalVatAmt(id, rowCount) {
	var sum = 0;
	var baseAmount;
	var RowCount = $("#rowCountId").val();
	var caltaxonBaseAmt;
	var totaltblsize = $("#totaltblsize").val();
	for ( var i = 1; i <= totaltblsize; i++) {
		var checkbox = $('#checkbox'+i+':checkbox:checked').length;
		if(checkbox > 0){
			baseAmount = $("#txtPurchaseQuotationBaseAmount" + i).val();
			var taxAmt = $("#txtPurchaseQuotationTaxAmount_" + i).val();
			if (baseAmount == null || taxAmt == null || taxAmt == undefined
					|| taxAmt == '' || baseAmount == undefined || baseAmount == '') {
				var flag = 1;
			} else {
	
				caltaxonBaseAmt = parseFloat(baseAmount) * parseFloat(taxAmt) / 100;
				var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
				sum = parseFloat(sum) + parseFloat(finalcaltaxanmount);
			}
		}

	}
	// $("#taxVatId").val(sum.toFixed(2));
	$("#taxIgstId").val(sum.toFixed(2));
	// $("#textVat").val(sum.toFixed(2));

	var totalgrossAmt = $("#grossAmountId").val();
	$("#grossNetAmountId").val(
			(parseFloat(sum) + parseFloat(totalgrossAmt)).toFixed(2));

}
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to row amount new calculate
 * @param id
 * @param rowCount
 * @returns {Boolean}
 */
function rowAmtCalNEW(id, rowCount) {

	var taxAmt = $("#txtPurchaseQuotationTaxAmount_" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#txtPurchaseQuotationRowAmount' + rowCount).val('');
	}
	var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
	if (baseAmt == " " || baseAmt == null) {
		$("#txtPurchaseQuotationRowAmount" + rowCount).val(' ');
		return false;
	}

	else {

		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
		var taxAmt = $("#txtPurchaseQuotationTaxAmount_" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$('#txtPurchaseOrderTaxAmtinRs' + rowCount).val(finalcaltaxanmount); // add
		// tax
		// amount
		// in
		// Rs
		// @author:paras
		// @Date:23nov
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmtcalculationgTax = finalsumofRowAmt.toFixed(2);
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(
				finalRowAmtcalculationgTax);
	}

}
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to calculate total vat amount new
 * @param id
 * @param rowCount
 */
function totalVatAmtnEW(id, rowCount) {

	var sum = 0;
	var baseAmount;
	var RowCount = $("#rowCountId").val();
	var caltaxonBaseAmt;
	// var totalRow = $("#totalRow").val();
	var totaltblsize = $("#totaltblsize").val();
	for ( var i = 1; i <= totaltblsize; i++) {
		var checkbox = $('#checkbox'+i+':checkbox:checked').length;
		if(checkbox > 0){
			baseAmount = $("#txtPurchaseQuotationBaseAmount" + i).val();
			var taxAmt = $("#txtPurchaseQuotationTaxAmount_" + i).val();
			if (baseAmount == null || taxAmt == null || taxAmt == undefined
					|| taxAmt == '' || baseAmount == undefined || baseAmount == '') {
				var flag = 1;
			} else {
	
				caltaxonBaseAmt = parseFloat(baseAmount) * parseFloat(taxAmt) / 100;
				var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
				sum = parseFloat(sum) + parseFloat(finalcaltaxanmount);
			}
		}

	}

	$("#taxVatId").val(sum.toFixed(2));
	$("#taxTotalTaxesId").val(sum.toFixed(2));
	$("#textVat").val(sum.toFixed(2));

	var totalgrossAmt = $("#grossAmountId").val();
	$("#txtNetAmt").val(
			(parseFloat(sum) + parseFloat(totalgrossAmt)).toFixed(2));

}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to calculate total amount
 * @param id
 * @param rowCount
 */
function totalAmount(id, rowCount) {
	var matches = id.match(/(\d+)/);
	if(matches[0] != rowCount){
		rowCount = matches[0];
	}
	var quantity = $('#' + id).val();

	var rate = $('#txtPurchaseQuotationUnitPrice' + rowCount).val();
	$('#txtPurchaseQuotationActualQuantity' + rowCount).val(quantity);
	$('#txtPurchaseQuotationBaseAmount' + rowCount).val(quantity * rate);

	var sum = 0;
	var totalQty;
	var RowCount = $("#RowCount").val();

	for ( var i = 1; i <= RowCount; i++) {
		totalQty = $("#txtPurchaseQuotationDocQuantity" + i).val();

		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}
	$("#totalItemQuantityId").val(sum);
	// $("#totalItemId").val(sum);
	totalGrossAmt(1, rowCount);

}
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to calculate total gross amount
 * @param id
 * @param rowCount
 */
function totalGrossAmt(id, rowCount) {
	var sum = 0;
	var baseAmount;
	var table = document.getElementById("ItemInfoTablePO");
	var rowCountNew = table.rows.length;
	for ( var i = 1; i <= rowCountNew; i++) {
		var checkbox = $('#checkbox'+i+':checkbox:checked').length;
		if(checkbox > 0){
			baseAmount = $("#txtPurchaseQuotationBaseAmount" + i).val();
			if (baseAmount == null || baseAmount == undefined || baseAmount == '') {
				var flag = 1;
			} else {
				sum = parseFloat(sum) + parseFloat(baseAmount);
			}
		}
	}
	$("#grossAmountId").val(sum.toFixed(2));
}
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to check value zero
 * @param id
 * @returns {Boolean}
 */
function checkValueZero(id) {
	if (parseInt(document.getElementById(id).value) == 0) {
		alert("Quantity should not be 0");
		document.getElementById(id).value = "";
		document.getElementById(id).focus();
		return false;
	}
}
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to check number or not
 * @param id
 * @param minLen
 * @param maxLen
 * @returns {Boolean}
 */
function toCheckNumberOrNo(id, minLen, maxLen) {
	var min = parseInt(minLen);
	var max = parseInt(maxLen);
	var name1 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
	var value1 = $('#' + id).val();
	if (min > value1.length || max < value1.length) {
		alert("Please Enter Only number!");
		$('#' + id).focus();
		return false;
	} else if (value1 != "" && !name1.test(value1)) {
		alert("Please Enter Only number!");
		$('#' + id).val('');
		$('#' + id).focus();
		return false;

	}
	return true;
}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to calculate special discount
 */
function calculateSpecialDiscount() {
	var GrossAmt = parseFloat($('#grossAmountId').val());
	var less = parseFloat($('#grossLessAmountId').val());
	var finalvatafterreduece = 0;
	var txtSplDisc = 0;
	var txtVat = 0;
	if ($('#lessSpecialDiscountId').val() == ''
			|| $('#lessSpecialDiscountId').val() == 0) {
		// alert($('#txtSplDisc').val());
		totalVatAmt(1, rowCount);
		calculateTotalTax();
		calculateTotalLess();
		calculateNetAmount();
	}

	if ($('#taxVatId').val() != '' && $('#taxVatId').val().length > 0)
		txtVat = parseFloat($('#taxVatId').val());
	if ($('#lessSpecialDiscountId').val() != ''
			&& $('#lessSpecialDiscountId').val().length > 0)
		txtSplDisc = parseFloat($('#lessSpecialDiscountId').val());

	finalvatafterreduece = parseFloat(txtVat)
			- (parseFloat(txtVat) * parseFloat(txtSplDisc) / 100);

	$('#taxVatId').val(finalvatafterreduece.toFixed(2));

	calculateTotalTax();
	calculateTotalLess();
	calculateNetAmount();
}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to calculate total tax
 */
function calculateTotalTax() {
	var taxGST = 0;
	var taxIGST = 0;
	var taxTotalTaxes = 0;
	if ($('#taxVatId').val() != '' && $('#taxVatId').val().length > 0)
		taxGST = parseFloat($('#taxVatId').val());
	if ($('#taxIgstId').val() != '' && $('#taxIgstId').val().length > 0)
		taxIGST = parseFloat($('#taxIgstId').val());
	$('#taxTotalTaxesId').val(parseFloat(taxGST) + parseFloat(taxIGST));
	taxTotalTaxes = parseFloat(taxGST) + parseFloat(taxIGST);
	$('#grossTaxesId').val((taxTotalTaxes).toFixed(2));
	$('#taxTotalTaxesId').val((taxTotalTaxes).toFixed(2));
	calculateNetAmount();
}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to calculate total less
 */
function calculateTotalLess() {
	var splDisc = 0;
	var debitAmt1 = 0;
	var cd1 = 0;
	var totalLess = 0;
	if ($('#lessSpecialDiscountId').val() != ''
			&& $('#lessSpecialDiscountId').val().length > 0)
		splDisc = parseFloat($('#lessSpecialDiscountId').val());
	if ($('#lessDebitAmountId').val() != ''
			&& $('#lessDebitAmountId').val().length > 0)
		debitAmt1 = parseFloat($('#lessDebitAmountId').val());
	if ($('#lessCDPercent2Id').val() != ''
			&& $('#lessCDPercent2Id').val().length > 0)
		cd1 = parseFloat($('#lessCDPercent2Id').val());
	totalLess = parseFloat(splDisc) + parseFloat(debitAmt1) + parseFloat(cd1);
	$('#grossLessAmountId').val(totalLess.toFixed(2));
	calculateNetAmount();
}
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to calculate net amount
 */
function calculateNetAmount() {
	var grossAmount = 0;
	var grossLessAmount = 0;
	var grossAddAmount = 0;
	var total = 0;
	if ($('#grossAmountId').val() != '' && $('#grossAmountId').val().length > 0) {
		grossAmount = parseFloat($('#grossAmountId').val());
	}
	if ($('#grossLessAmountId').val() != ''
			&& $('#grossLessAmountId').val().length > 0) {
		grossLessAmount = parseFloat($('#grossLessAmountId').val());
	}
	if ($('#grossAddAmountId').val() != ''
			&& $('#grossAddAmountId').val().length > 0) {
		grossAddAmount = parseFloat($('#grossAddAmountId').val());
	}
	var vat = 0;
	if (grossAmount > 0)
		total = (grossAmount - grossLessAmount) + grossAddAmount;
	if ($('#grossTaxesId').val() != '' && $('#grossTaxesId').val().length > 0)
		vat = parseFloat($('#grossTaxesId').val());
	$('#grossNetAmountId').val((total + vat).toFixed(2));

}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to calculate CD amount
 * @returns {Boolean}
 */
function calculateCDAmt() {
	var gross = 0;
	var cd = 0;
	var cdAmt = 0;
	if ($('#grossAmountId').val() != '' && $('#grossAmountId').val().length > 0) {
		gross = parseFloat($('#grossAmountId').val());
	}
	if ($('#lessCDPercent1Id').val() != ''
			&& $('#lessCDPercent1Id').val().length > 0) {
		cd = parseFloat($('#lessCDPercent1Id').val());
	}
	if (parseFloat(gross) > parseFloat(cd)) {
		cdAmt = parseFloat(gross) * (parseFloat(cd) / 100);
		$('#lessCDPercent2Id').val(cdAmt.toFixed(2));
		calculateTotalLess();

	} else {
		alert("CD is less then Gross Amount!");
		$('#lessCDPercent2Id').val('0');
		$('#lessCDPercent1Id').val('0');
		calculateTotalLess();
		return false;
	}

}
/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to calculate total add
 */
function calculateTotalAdd() {
	var addOctroi = 0;
	var addSurcharge = 0;
	var addCreditAmount = 0;
	var addFreight = 0;
	var totalAdd = 0;
	if ($('#addOctroiId').val() != '' && $('#addOctroiId').val().length > 0)
		addOctroi = parseFloat($('#addOctroiId').val());

	if ($('#addSurchargeId').val() != ''
			&& $('#addSurchargeId').val().length > 0)
		addSurcharge = parseFloat($('#addSurchargeId').val());

	if ($('#addCreditAmountId').val() != ''
			&& $('#addCreditAmountId').val().length > 0)
		addCreditAmount = parseFloat($('#addCreditAmountId').val());

	if ($('#addFreightId').val() != '' && $('#addFreightId').val().length > 0)
		addFreight = parseFloat($('#addFreightId').val());

	totalAdd = parseFloat(addOctroi) + parseFloat(addSurcharge)
			+ parseFloat(addCreditAmount) + parseFloat(addFreight);
	$('#grossAddAmountId').val(totalAdd.toFixed(2));
	calculateNetAmount();
}
/*******************************************************************************
 * @since 25-11-2019
 * @comment below js function is created for to edit the party contact slave
 *          details
 * @author Vishnu Thorat
 * @param id
 ******************************************************************************/
function editContactInfoPartyMasterOnPurchaseOrder(id) {
	document.getElementById("updateRecordButtonContactInfoId").style.display = "block";
	document.getElementById("addRowsButtonContactInfoId").style.display = "none";
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryPurchaseOrder/editPartyContactPOSlave",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			console.log(r.contactDob);
			$('#contactPersonPOId').val(r.contactName);
			$('#contactDesignationPOId').val(r.contactDesignation);
			$('#contactPhoneOnePOId').val(r.contactPhoneNumber1);
			$('#contactPhoneSecondPOId').val(r.contactPhoneNumber2);
			$('#contactDateofbirthPOId').val(r.contactDob);
			$('#contactMailPOId').val(r.contactEmail);
			$('#contactAddressPOId').val(r.contactAddress);
			$('#contactGenderPOId').val(r.contactGender);
			$('#partyContactSlavePOId').val(r.id);

		}
	});
}
/*******************************************************************************
 * @since 26-11-2019
 * @author Vishnu Thorat
 * @comment below js function is created for update party contact details on PO
 ******************************************************************************/
function updatePartyContactPODetails() {
	var contactPersonPO = $("#contactPersonPOId").val();
	var contactDesignationPO = $("#contactDesignationPOId").val();
	var contactPhoneOnePO = $("#contactPhoneOnePOId").val();
	var contactPhoneSecondPO = $("#contactPhoneSecondPOId").val();
	var contactGenderPO = $("#contactGenderPOId").val();
	var contactDateofbirthPO = $("#contactDateofbirthPOId").val();
	var contactMailPO = $("#contactMailPOId").val();
	var contactAddressPO = $("#contactAddressPOId").val();
	var partyContactSlavePO = $("#partyContactSlavePOId").val();
	var partyMasterId = $("#hiddenPartyMasterId").val();
	var inputs = [];

	inputs.push('contactName=' + contactPersonPO);
	inputs.push('contactDesignation=' + contactDesignationPO);
	inputs.push('contactPhoneNumber1=' + contactPhoneOnePO);
	inputs.push('contactPhoneNumber2=' + contactPhoneSecondPO);
	inputs.push('contactGender=' + contactGenderPO);
	inputs.push('contactDob=' + contactDateofbirthPO);
	inputs.push('contactEmail=' + contactMailPO);
	inputs.push('contactAddress=' + contactAddressPO);
	inputs.push('id=' + partyContactSlavePO);
	var str = inputs.join('&');
	$
			.ajax({
				async : false,
				type : "POST",
				url : "ehat/inventoryPurchaseOrder/updatePartyContactPODetails",
				data : str + "&reqType=AJAX",
				catche : false,
				success : function(data) {
					if (data == 1) {
						document.getElementById("addRowsButtonContactInfoId").style.display = "block";
						document
								.getElementById("updateRecordButtonContactInfoId").style.display = "none";
						alertify.success("Records Updated Sucessfully");

					} else {
						alertify.error("Oops Some Problem Ocured");
					}
					refreshPartyContactSlavePOData();
					getPartyMasterDetailsById(partyMasterId);
				},
				error : function() {
					alert('Network Issue..!!');
				}
			});
}
/*******************************************************************************
 * @Since 26-11-2019
 * @author Vishnu Thorat
 * @Comment created this js function to reset the party contact slave on PO
 ******************************************************************************/
function refreshPartyContactSlavePOData() {
	$("#contactPersonPOId").val("");
	$("#contactDesignationPOId").val("");
	$("#contactPhoneOnePOId").val("");
	$("#contactPhoneSecondPOId").val("");
	$("#contactGenderPOId").val("");
	$("#contactDateofbirthPOId").val("");
	$("#contactMailPOId").val("");
	$("#contactAddressPOId").val("");
	$("#partyContactSlavePOId").val(0);
	return false;
}
/*******************************************************************************
 * @since 25-11-2019
 * @comment below js function is created for to edit the party address slave
 *          details
 * @author Vishnu Thorat
 * @param id
 ******************************************************************************/
function editAddressInfoPOSlave(id) {
	document.getElementById("updateRecordButtonAddressInfoId").style.display = "block";
	document.getElementById("addRowsButtonAddressInfoId").style.display = "none";
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryPurchaseOrder/editPartyAddressPOSlave",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			$('#companyNamePOID').val(r.companyName);
			$('#areaPOID').val(r.area);
			$('#countryPOID').val(r.country);
			$('#streetPOID').val(r.street);
			$('#stateIdPO').select2('val', r.stateId);
			getAllDistrictByStateId('stateIdPO');
			$('#distictIdPO').select2('val', r.districtId);
			getAllTalukaBydDistictId('distictIdPO');
			$('#talukaIdPO').select2('val', r.talukaId);
			getAllCityByTalukaId('talukaIdPO');
			$('#cityIdPO').select2('val', r.cityId);
			getSelectedCityName();
			$('#countryIdPO').val(r.countryId);
			getSelectedCountryName();
			$('#pincodePOID').val(r.pin);
			$('#addressPOID').val(r.address);
			$('#partyAddressSlavePOId').val(r.id);

		}
	});
}
/*******************************************************************************
 * @since 26-11-2019
 * @author Vishnu Thorat
 * @comment below js function is created for update party address details on PO
 ******************************************************************************/
function updatePartyAddressPODetails() {
	var companyNamePO = $("#companyNamePOID").val();
	var areaPO = $("#areaPOID").val();

	var streetPO = $("#streetPOID").val();

	var countryId = $("#countryIdPO").val();
	var countryName = $("#hiddenCountryName").val();
	var stateId = $("#stateIdPO").val();
	var stateName = $("#hiddenStateName").val();
	var districtId = $("#distictIdPO").val();
	var districtName = $("#hiddenDistrictName").val();
	var talukaId = $("#talukaIdPO").val();
	var talukaName = $("#hiddenTalukaName").val();
	var cityId = $("#cityIdPO").val();
	var cityName = $("#hiddenCityName").val();
	var pincodePO = $("#pincodePOID").val();
	var addressPO = $("#addressPOID").val();
	var partyAddressSlavePO = $("#partyAddressSlavePOId").val();
	var partyMasterId = $("#hiddenPartyMasterId").val();
	var inputs = [];

	inputs.push('companyName=' + companyNamePO);
	inputs.push('area=' + areaPO);
	inputs.push('street=' + streetPO);
	inputs.push('pin=' + pincodePO);
	inputs.push('address=' + addressPO);
	inputs.push('id=' + partyAddressSlavePO);

	inputs.push('countryId=' + countryId);
	inputs.push('country=' + countryName);
	inputs.push('stateId=' + stateId);
	inputs.push('state=' + stateName);
	inputs.push('districtId=' + districtId);
	inputs.push('districtName=' + districtName);
	inputs.push('talukaId=' + talukaId);
	inputs.push('talukaName=' + talukaName);
	inputs.push('cityId=' + cityId);
	inputs.push('city=' + cityName);

	var str = inputs.join('&');
	$
			.ajax({
				async : false,
				type : "POST",
				url : "ehat/inventoryPurchaseOrder/updatePartyAddressPODetails",
				data : str + "&reqType=AJAX",
				catche : false,
				success : function(data) {
					if (data == 1) {
						document.getElementById("addRowsButtonAddressInfoId").style.display = "block";
						document
								.getElementById("updateRecordButtonAddressInfoId").style.display = "none";
						alertify.success("Records Updated Sucessfully");

					} else {
						alertify.error("Oops Some Problem Ocured");
					}
					$('#addressInfoFormIdPO')[0].reset();
					$('#stateIdPO').select2('val', 0);
					$('#distictIdPO').select2('val', 0);
					$('#talukaIdPO').select2('val', 0);
					$('#cityIdPO').select2('val', 0);
					// refreshPartyAddressSlavePOData();
					getPartyMasterDetailsById(partyMasterId);
				},
				error : function() {
					alert('Network Issue..!!');
				}
			});
}
/*******************************************************************************
 * @Since 26-11-2019
 * @author Vishnu Thorat
 * @Comment created this js function to edit the T&C master details
 ******************************************************************************/
function editTermAndConditionMasterDocOnPO(termconditionId) {
	document.getElementById("updateRecordButtonTCId").style.display = "block";
	document.getElementById("addRowsButtonTCId").style.display = "none";
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
		success : function(obj) {
			$("#termConditionId").val(obj.termConditionId);
			$("#termconditionIdPurchaseOrderId").val(obj.termconditionName);

		}

	});

}
/*******************************************************************************
 * @since 26-11-2019
 * @author Vishnu Thorat
 * @comment below js function is created for update T&C details on PO
 ******************************************************************************/
function updateTCPODetails() {
	var termCondition = $("#termConditionId").val();
	var termconditionIdPurchaseOrder = $("#termconditionIdPurchaseOrderId")
			.val();
	var inputs = [];

	inputs.push('termConditionId=' + termCondition);
	inputs.push('termconditionName=' + termconditionIdPurchaseOrder);

	var str = inputs.join('&');
	$
			.ajax({
				async : false,
				type : "POST",
				url : "ehat/inventoryM/saveTermAndconditionMaster",
				data : str + "&reqType=AJAX",
				catche : false,
				success : function(data) {
					if (data == 1) {
						alertify.error("Oops Some Problem Ocured");

					} else {
						document.getElementById("addRowsButtonTCId").style.display = "block";
						document.getElementById("updateRecordButtonTCId").style.display = "none";
						alertify.success("Records Updated Sucessfully");
					}
					refreshTCPOData();
					getTermAndConditionForPurchaseOrder();
				},
				error : function() {
					alert('Network Issue..!!');
				}
			});
}
/*******************************************************************************
 * @Since 26-11-2019
 * @author Vishnu Thorat
 * @Comment created this js function to reset the T&C details on PO
 ******************************************************************************/
function refreshTCPOData() {
	$("#termconditionIdPurchaseOrderId").val("");
	$("#termConditionId").val(0);
	return false;
}
/*******************************************************************************
 * @since 26-11-2019
 * @comment added this js to get all the purchase order records
 * @author Vishnu Thorat
 ******************************************************************************/

function getAllPurchaseReOrderRecordsDetails() {

	jQuery.ajax({
		async: true,
		type: "GET",
		url: "ehat/inventoryPurchaseReOrder/getAllPurchaseReOrderRecordsDetails",
		timeout: 1000 * 60 * 5,
		catche: false,
		error: function () {
			alert("error");
		},
		success: function (r) {
			setPurchaseReOrderDataToTable(r);
		}
	});
}


/*******************************************************************************
 * @since 08-11-2019
 * @comment added this js function to set the purchase orders data to dynamic
 *          table
 * @author Vishnu Thorat
 * @param r
 ******************************************************************************/
function setPurchaseReOrderDataToTable(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.purchaseReOrderDtos.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ getDateTimePurchaseReOrder(r.purchaseReOrderDtos[i].createdDateTime)
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.purchaseReOrderDtos[i].id
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.purchaseReOrderDtos[i].supplierName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#purchaseReOrderModuleModal"  onclick=editPurchaseReOrder('
				+ r.purchaseReOrderDtos[i].id
				+ ')><i class="fa fa-eye View"></i></button></td>';
				if(r.purchaseReOrderDtos[i].isPoUsed == "Y"){
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" disabled="disabled" onclick=deletePurchaseReOrder('
					+ r.purchaseReOrderDtos[i].id
					+ ')><i class="fa fa-trash-o"></i></button></td>';
				}else{
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deletePurchaseReOrder('
					+ r.purchaseReOrderDtos[i].id
					+ ')><i class="fa fa-trash-o"></i></button></td>';
				}
				htm = htm+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=printPurchaseReOrderMaster('
				+ r.purchaseReOrderDtos[i].id
				+ ')><i class="fa fa-print"></i></button></td>' +

				'</tr>';
		index++;
	}
	$("#purchaseReOrderTableBodyId").html(htm);
}

/*******************************************************************************
 * @since 08-11-2019
 * @comment below js function to edit the purchase re order data details
 * @author Vishnu Thorat
 * @param id
 ******************************************************************************/
function editPurchaseReOrder(id) {
	
	$("#reOrderedColumn").hide();
	$("#savePurchaseReOrder").hide();
	var inputs = [];
	var htm = "";
	var index = 1;
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "GET",
				url : "ehat/inventoryPurchaseReOrder/editPurchaseReOrder",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('Network Issue..!!');
				},
				success : function(r) {
					getUploadedDocuments(r.id);
					$("#purchaseOrderId").val(r.id);
					$("#orderNoId").val(r.orderNo);
					$("#supplierMobileNoId").val(r.supplierMobileNo);
					$("#referenceNoId").val(r.referenceNo);
					$("#orderDateId").val(r.orderDate);
					$("#deliveryDateId").val(r.deliveryDate);
					$("#supplierAddressId").val(r.supplierAddress);
					$("#supplierNameId").val(r.supplierName);
					setParyMasterStateToEditPurchaseReOrder(r.partyMasterDtos);
					$('#supplierStateId').select2('val', r.supplierStateId);
					$("#hiddenVenderStatePRO").val(r.supplierStateId);
					$("#totalItemQuantityId").val(r.totalItemQuantity);
					$("#totalItemDiscountId").val(r.totalItemDiscount);
					$("#orderSeriesId").val(r.orderSeries);
					$("#orderStatusId").val(r.orderStatus);
					// $("#supplierStateId").val(r.supplierState);
					$("#termconditionIdPurchaseOrderId").val(r.termsAndConditions);
					$("#lessSpecialDiscountId").val(r.lessSpecialDiscount);
					$("#lessDebitAmountId").val(r.lessDebitAmount);
					$("#lessCDPercent1Id").val(r.lessCDPercent1);
					$("#lessCDPercent2Id").val(r.lessCDPercent2);
					$("#addOctroiId").val(r.addOctroi);
					$("#addSurchargeId").val(r.addSurcharge);
					$("#addCreditAmountId").val(r.addCreditAmount);
					$("#addFreightId").val(r.addFreight);
					$("#taxVatId").val(r.taxVat);
					$("#taxLBTId").val(r.taxLBT);
					$("#taxCSTId").val(r.taxCST);
					$("#taxExVatId").val(r.taxExVat);
					$("#taxTotalTaxesId").val(r.taxTotalTaxes);
					$("#grossAmountId").val(r.grossAmount);
					$("#grossLessAmountId").val(r.grossLessAmount);
					$("#grossAddAmountId").val(r.grossAddAmount);
					$("#grossTaxesId").val(r.grossTaxes);
					$("#grossNetAmountId").val(r.grossNetAmount);
					$("#hiddenSupplierNameId").val(r.supplierName);
					$("#hiddenPartyMasterId").val(r.partyMasterDtos.id);
					$("#purchaseOrderRemarkId").val(r.purchaseOrderRemark);
					$("#taxIgstId").val(r.igstTotalValue);
					//added  by Vishnu Thorat to set the total table size of PO item slave table
					$("#totaltblsize").val(r.purchaseReOrderItemSlaveDto.length);
					for ( var i = 0; i < r.purchaseReOrderItemSlaveDto.length; i++) {
						htm = htm
								+ "<tr id='deleterow' class='newAdded'> <td> <input type='checkbox' class='chkMrnItem'  checked='checked' value="+index+" name='checkbox' id='checkbox"
								+ index
								+ "'/></td><td>"
								+ index
								+ "  <input type='hidden' id='rowcountid"
								+ index
								+ "' value ="
								+ index
								+ "> </td>"

								+ " <td style='display:none'><div><input type='hidden' value='"+ r.purchaseReOrderItemSlaveDto[i].id+"' id='itemSlaveId"+ index+ "'></div></td> "

								+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text' style='text-align:left;width:250px;' "
								+ "class='typeahead form-control input-SmallText' value='"
								+ r.purchaseReOrderItemSlaveDto[i].itemName
								+ "' id='txtPurchaseQuotationItemName_"
								+ index
								+ "' data-name='purchaseOrderModule' />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ index
								+ "' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ index
								+ "' value=''/><input type='hidden'  id='itemMasterId"
								+ index
								+ "' value='"
								+ r.purchaseReOrderItemSlaveDto[i].item_master_id
								+ "'/></div></td> "

								// added HSN ID here
								+ "<td style='display:none'><input type='text' disabled='disabled' value='"
								+ r.purchaseReOrderItemSlaveDto[i].hsnName
								+ "' class='form-control input-SmallText' id='hsnCodePurchaseOrder"
								+ index
								+ "'  style='width:90px;'></td>"

								// added HSN Name here
								+ "<td><input type='text' disabled='disabled' value='"
								+ r.purchaseReOrderItemSlaveDto[i].hsnNameValue
								+ "' class='form-control input-SmallText' id='hsnCodeNamePurchaseOrder"
								+ index
								+ "'  style='width:90px;'></td>"

								+ "<td><input type='text' class='form-control input-SmallText' value="
								+ r.purchaseReOrderItemSlaveDto[i].itemQuantity
								+ " id='txtPurchaseQuotationDocQuantity"
								+ index
								+ "' onkeyup='totalAmount(this.id,"
								+ index
								+ ")' onkeypress='return validateNumbers(event);' style='width:60px;' ><label id='txtPurchaseQuotationLastFactorUOM"
								+ rowCount
								+ "' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' value="
								+ r.purchaseReOrderItemSlaveDto[i].itemUnitPrice
								+ " id='txtPurchaseQuotationUnitPrice"
								+ index
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
								+ index
								+ "'>"
								+ r.purchaseReOrderItemSlaveDto[i].uomUnitLatestFactorName
								+ " </lable></td>" + "";
						// if itemTradeDiscount amount is '0' we disabled it
						if (r.purchaseReOrderItemSlaveDto[i].itemTradeDiscount == 0) {
							htm = htm
									+ " <td><input type='text' class='form-control input-SmallText'  value="
									+ r.purchaseReOrderItemSlaveDto[i].itemTradeDiscount
									+ " onblur='calculTradeDis(this.id,"
									+ index
									+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
									+ index
									+ "'  onkeyup='chkTradAmtorPercentage(this.id,"
									+ index
									+ ")' onkeypress='return validateNumbers(event);' ></td> ";
						}
						// else itemTradeDiscount amount is not '0' we enabled
						// it
						else {
							htm = htm
									+ " <td><input type='text' class='form-control input-SmallText' value="
									+ r.purchaseReOrderItemSlaveDto[i].itemTradeDiscount
									+ " onblur='calculTradeDis(this.id,"
									+ index
									+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
									+ index
									+ "'  onkeyup='chkTradAmtorPercentage(this.id,"
									+ index
									+ ")' onkeypress='return validateNumbers(event);' ></td> ";
						}
						// if itemTradeDiscountRupees amount is '0' we disabled
						// it
						if (r.purchaseReOrderItemSlaveDto[i].itemTradeDiscountRupees == 0) {
							htm = htm
									+ "<td><input type='text' class='form-control input-SmallText'  value="
									+ r.purchaseReOrderItemSlaveDto[i].itemTradeDiscountRupees
									+ " onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"
									+ index
									+ ")' id='txtPurchaseQuotationTrdeDiscountInRupess"
									+ index + "'  style='width:60px;' ></td>";
						}
						// else itemTradeDiscountRupees amount is not '0' we
						// enabled it
						else {
							htm = htm
									+ "<td><input type='text' class='form-control input-SmallText' value="
									+ r.purchaseReOrderItemSlaveDto[i].itemTradeDiscountRupees
									+ " onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"
									+ index
									+ ")' id='txtPurchaseQuotationTrdeDiscountInRupess"
									+ index + "'  style='width:60px;' ></td>";
						}
						htm = htm
								+ " <td><input type='text' class='form-control input-SmallText' value="
								+ r.purchaseReOrderItemSlaveDto[i].itemTradeDiscountAmount
								+ "  id='txtPurchaseQuotationTrdeDiscountAmt"
								+ index
								+ "' onkeypress='return validateNumbers(event);'   style='width:60px;'></td>"
								+ "<td><input type='text' class='form-control input-SmallText' value="
								+ r.purchaseReOrderItemSlaveDto[i].itemTradeBaseAmount
								+ "  id='txtPurchaseQuotationBaseAmount"
								+ index
								+ "' onkeypress='return validateNumbers(event);' style='width:100px;' ></td>"
								+ "<td><input type='text' class='typeahead form-control input-SmallText' value="
								+ r.purchaseReOrderItemSlaveDto[i].gst
								+ " autocomplete='off'  id='txtPurchaseQuotationTaxCodePO_"
								+ index
								+ "' onkeyup='calculateGSTWisePurchaseOrder(this.id,"
								+ id
								+ ");calculateTotalItemAmountPurchaseOrder("
								+ id
								+ ");calculateTotalItemgstAmountPurchaseOrder("
								+ id + ");autotaxCodeforItemGstPurchaseOrder("+ index + "," + index+ ",this.id);'  style='width:80px;'></td>";
						// if igst rate is '0' we disabled it
						if (r.purchaseReOrderItemSlaveDto[i].igst == 0) {
							htm = htm
									+ " <td><input type='text' class='typeahead form-control input-SmallText' disabled value='0' onkeyup='calculateIGSTWisePurchaseOrder(this.id,"
									+ id
									+ ");calculateTotalItemAmountPurchaseOrder("
									+ id
									+ ");calculateTotalItemigstAmountPurchaseOrder("
									+ id
									+ ");autotaxCodeforItemigstPurchaseOrder("+ index + "," + index + ",this.id);' value="
									+ r.purchaseReOrderItemSlaveDto[i].igst
									+ " id='txtPurchaseQuotationTaxAmount_"
									+ index
									+ "'   style='width:80px;'  autocomplete='off' ></td> ";
						}
						// else igst rate is not '0' we enabled it
						else {
							htm = htm
									+ " <td><input type='text' class='typeahead form-control input-SmallText' value='0' onkeyup='calculateIGSTWisePurchaseOrder(this.id,"
									+ id
									+ ");calculateTotalItemAmountPurchaseOrder("
									+ id
									+ ");calculateTotalItemigstAmountPurchaseOrder("
									+ id
									+ ");autotaxCodeforItemigstPurchaseOrder("+ index + "," + index + ",this.id);' value="
									+ r.purchaseReOrderItemSlaveDto[i].igst
									+ " id='txtPurchaseQuotationTaxAmount_"
									+ index
									+ "'   style='width:80px;'  autocomplete='off' ></td> ";
						}

						// below is the GST total amount
						if (r.purchaseReOrderItemSlaveDto[i].gstAmountValue == 0) {
							htm = htm
									+ "<td><input type='text' class='form-control input-SmallText' disabled value="
									+ r.purchaseReOrderItemSlaveDto[i].gstAmountValue
									+ " style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
									+ index + "'   ></td> ";
						}else{
							htm = htm
							+ "<td><input type='text' class='form-control input-SmallText' value="
							+ r.purchaseReOrderItemSlaveDto[i].gstAmountValue
							+ " style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
							+ index + "'   ></td> ";
						}
						// below is the IGST total amount
						// if igst amount is '0' we disabled it
						if (r.purchaseReOrderItemSlaveDto[i].igstAmountValue == 0) {
							htm = htm
									+ "<td><input type='text' class='form-control input-SmallText' disabled value="
									+ r.purchaseReOrderItemSlaveDto[i].igstAmountValue
									+ " style='width:100px;' id='igstAmtId"
									+ index + "'   ></td> ";
						}
						// if igst amount is not '0' then we enabled it
						else {
							htm = htm
									+ "<td><input type='text' class='form-control input-SmallText' value="
									+ r.purchaseReOrderItemSlaveDto[i].igstAmountValue
									+ " style='width:100px;' id='igstAmtId"
									+ index + "'   ></td> ";
						}
						htm = htm
								+ "<td><input type='text' class='form-control input-SmallText' value="
								+ r.purchaseReOrderItemSlaveDto[i].totalAmount
								+ " id='txtPurchaseQuotationRowAmount"
								+ index
								+ "' onkeypress='return validateNumbers(event);'  style='width:100px;'></td>"
								+ "<td><input type='text' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);' value="
								+ r.purchaseReOrderItemSlaveDto[i].itemPurchaseFactorUom1
								+ " id='txtPurchaseQuotationFactorOne"
								+ index
								+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'><lable id='uomUnitFactorOneNameId"
								+ index
								+ "'>"
								+ r.purchaseReOrderItemSlaveDto[i].uomUnitFactorOneName
								+ " </lable></td> "
								+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' value="
								+ r.purchaseReOrderItemSlaveDto[i].itemPurchaseFactorUom2
								+ " id='txtPurchaseQuotationFactorTwo"
								+ index
								+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0' ><lable id='uomUnitFactorTwoNameId"
								+ index
								+ "'>"
								+ r.purchaseReOrderItemSlaveDto[i].uomUnitFactorTwoName
								+ " </lable></td> "
								+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' value="
								+ r.purchaseReOrderItemSlaveDto[i].itemPurchaseFactorUom3
								+ " id='txtPurchaseQuotationFactorThree"
								+ index
								+ "' onkeypress='return validateNumbers(event);'value='0'><lable id='uomUnitFactorThreeNameId"
								+ index
								+ "'>"
								+ r.purchaseReOrderItemSlaveDto[i].uomUnitFactorThreeName
								+ " </lable></td> "
								+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'style='width:60px;' value="
								+ r.purchaseReOrderItemSlaveDto[i].itemPurchaseFactorUom4
								+ " id='txtPurchaseQuotationFactorFour"
								+ index
								+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'>"
								+ "<lable id='uomUnitFactorFourNameId"
								+ index
								+ "'>"
								+ r.purchaseReOrderItemSlaveDto[i].uomUnitFactorFourName
								+ " </lable></td> "
								+ " <td><input type='text' class='form-control input-SmallText' value="
								+ r.purchaseReOrderItemSlaveDto[i].itemActualQuantity
								+ " id='txtPurchaseQuotationActualQuantity"
								+ index
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
								+ "<td style='display:none'><input type='text' class='form-control input-SmallText'  value="
								+ r.purchaseReOrderItemSlaveDto[i].itemPendingQuantity
								+ "  id='txtPurchaseQuotationPendingQuantity"
								+ index
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "

								+ "<td style='display:none;' ><input type='text' class='form-control input-SmallText'  value="
								+ r.purchaseReOrderItemSlaveDto[i].hsnName
								+ "  id='hsnName"
								+ index
								+ "'' style='width:60px;'></td> "

								+ "<td style='display:none;' ><input type='text' class='form-control input-SmallText'  value="
								+ r.purchaseReOrderItemSlaveDto[i].itemAssetStatus
								+ "  id='assetItemStatusId"
								+ index
								+ "'' style='width:60px;'></td> "
								
								+ "<td style='display:none;' ><input type='text' class='form-control input-SmallText'  value="
								+ r.purchaseReOrderItemSlaveDto[i].isItemBatchWise
								+ "  id='isItemBatchWiseId"
								+ index
								+ "'' style='width:60px;'></td> "

								+ "<td style='display:none;'><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNoPO"
								+ index + "' style='width:60px;' ></td>"
								
								//added reagent type by Vishnu Thorat
								+ "<td style='display:none;' ><input type='text' class='form-control input-SmallText'  value="+ r.purchaseReOrderItemSlaveDto[i].itemReagentStatus + "  id='reagentItemStatusId" + index + "' style='width:60px;'></td> "
								
								//added by Vishnu Thorat on 12-08-2020 asset manufacture name 
								+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  value="+ r.purchaseReOrderItemSlaveDto[i].manufactureName +"   id='assetItemManufactureId"
								+ index
								+ "' class='form-control input-SmallText'> </td>"
								+
								
								//added by Vishnu Thorat on 12-08-2020 asset amc value
								"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  value="+ r.purchaseReOrderItemSlaveDto[i].amcVal +" id='assetAmcValId"
								+ index
								+ "' class='form-control input-SmallText'> </td>"
								+
								
								//added by Vishnu Thorat on 12-08-2020 asset pm value
								"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  value="+ r.purchaseReOrderItemSlaveDto[i].pmVal +" id='assetPmValId"
								+ index
								+ "' class='form-control input-SmallText'> </td>"
								+
								
								//added by Vishnu Thorat on 12-08-2020 asset amc year value
								"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  value="+ r.purchaseReOrderItemSlaveDto[i].amcYear +" id='assetAmcYearId"
								+ index
								+ "' class='form-control input-SmallText'> </td>"
								+
								
								//added by Vishnu Thorat on 12-08-2020 asset pm year value
								"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  value="+ r.purchaseReOrderItemSlaveDto[i].pmYear +" id='assetPmYearId"
								+ index
								+ "' class='form-control input-SmallText'> </td>"
								+
								
								//added by Vishnu Thorat on 12-08-2020 asset product warranty value
								"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  value="+ r.purchaseReOrderItemSlaveDto[i].productWarranty +" id='assetProductWarrantyId"
								+ index
								+ "' class='form-control input-SmallText'> </td>"+
								
								//added by Vishnu Thorat on 12-08-2020 to store product category type
								"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  value="+ r.purchaseReOrderItemSlaveDto[i].productCategory +" id='assetProductCategory"
								+ index
								+ "' class='form-control input-SmallText'> </td>"+
								
								//added by Vishnu Thorat on 12-08-2020 lab equipment item type
								"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  value="+ r.purchaseReOrderItemSlaveDto[i].itemLabEquipmentStatus +" id='labEquipmentItemStatusId"
								+ index + "' class='form-control input-SmallText'> </td>"
								+ " </tr>";
						index++;
						$("#itemInfoDetails").html(htm);
					}

					var count = 1;
					var htmContact = "";
					for ( var i = 0; i < r.partyMasterDtos.partyMasterContactInfoDto.length; i++) {
						htmContact = htmContact
								+ '<tr class="newAdded"> '
								+ ' <td class="col-md-1 center">'
								+ count
								+ '</td>'
								+ ' <td class="col-md-1 center" id="contactPersonId'
								+ count
								+ '">'
								+ r.partyMasterDtos.partyMasterContactInfoDto[i].contactName
								+ '</td>'
								+ ' <td class="col-md-1 center" id="contactDesignationId'
								+ count
								+ '">'
								+ r.partyMasterDtos.partyMasterContactInfoDto[i].contactDesignation
								+ '</td>'
								+ ' <td class="col-md-1 center" id="contatcAddressId'
								+ count
								+ '">'
								+ r.partyMasterDtos.partyMasterContactInfoDto[i].contactAddress
								+ '</td>'
								+ ' <td class="col-md-1 center" id="contactGenderId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterContactInfoDto[i].contactGender
								+ '</td>'
								+ ' <td class="col-md-1 center" id="contactDobId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterContactInfoDto[i].contactDob
								+ '</td>'
								+ ' <td class="col-md-1 center" id="contactPhoneOneId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterContactInfoDto[i].contactPhoneNumber1
								+ '</td>'
								+ ' <td class="col-md-1 center" id="contactPhoneSecondId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterContactInfoDto[i].contactPhoneNumber2
								+ '</td>'
								+ ' <td class="col-md-1 center" id="contactMailId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterContactInfoDto[i].contactEmail
								+ '</td>'
								+ ' <td class="col-md-1 center" id="contactInfoId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterContactInfoDto[i].id
								+ '</td>'
								+ ' <td class="col-md-1 center"><input type="hidden" id="editContactPartMaster'
								+ count
								+ '" value="'
								+ count
								+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editContactInfoPartyMasterOnPO('
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
								+ r.partyMasterDtos.partyMasterContactInfoDto[i].id
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteContactPartMaster'
								+ r.partyMasterDtos.partyMasterContactInfoDto[i].id
								+ '" onclick="deletePartyMasterSlaveOnPRO('
								+ r.partyMasterDtos.partyMasterContactInfoDto[i].id
								+ ',\'deleteContact\')" '
								+ '><i class="fa fa-trash-o"></i></button></td>'
								+ '</tr>';
						count++;
					}
					$("#PartyContactTableInfoList").append(htmContact);
					var count = 1;
					var htmAddress = "";
					for ( var i = 0; i < r.partyMasterDtos.partyMasterAddressInfoDto.length; i++) {
						htmAddress = htmAddress
								+ '<tr class="newAdded"> '
								+ ' <td class="col-md-1 center">'
								+ count
								+ '</td>'
								+ ' <td class="col-md-1 center" id="companyNameId'
								+ count
								+ '">'
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].companyName
								+ '</td>'
								+ ' <td class="col-md-1 center" id="companyCountryId'
								+ count
								+ '">'
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].country
								+ '</td>'
								+ ' <td class="col-md-1 center" id="companyCityId'
								+ count
								+ '">'
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].city
								+ '</td>'
								+ ' <td class="col-md-1 center" id="companyAddressId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].address
								+ '</td>'
								+ ' <td class="col-md-1 center" id="companyAddressTypeId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].addressType
								+ '</td>'
								+ ' <td class="col-md-1 center" id="companyStreetId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].street
								+ '</td>'
								+ ' <td class="col-md-1 center" id="companyAreaId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].area
								+ '</td>'
								+ ' <td class="col-md-1 center" id="companyPinId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].pin
								+ '</td>'
								+ ' <td class="col-md-1 center" id="companyStateId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].state
								+ '</td>'
								+ ' <td class="col-md-1 center" id="companyDistrictId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].districtName
								+ '</td>'
								+ ' <td class="col-md-1 center" id="companyTalukaId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].talukaName
								+ '</td>'
								+ ' <td class="col-md-1 center" id="hiddenCountryNameId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].countryId
								+ '</td>'
								+ ' <td class="col-md-1 center" id="hiddenStateNameId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].stateId
								+ '</td>'
								+ ' <td class="col-md-1 center" id="hiddenDistrictNameId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].districtId
								+ '</td>'
								+ ' <td class="col-md-1 center" id="hiddenTalukaNameId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].talukaId
								+ '</td>'
								+ ' <td class="col-md-1 center" id="hiddenCityNameId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].cityId
								+ '</td>'
								+ ' <td class="col-md-1 center" id="addressInfoId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].id
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
								+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editAddressInfoPartyMasterOnPO('
								+ count
								+ ',\'fromDB\')"><i class="fa fa-edit"></i></button></td>'
								+ ' <td class="col-md-1 center">'
								+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteAddressPartMaster'
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].id
								+ '"  onclick="deletePartyMasterSlaveOnPRO('
								+ r.partyMasterDtos.partyMasterAddressInfoDto[i].id
								+ ',\'deleteAddress\')" '
								+ '><i class="fa fa-trash-o"></i></button></td>'
								+ '</tr>';
						count++;
					}
					$("#PartyAddressTableInfoList").append(htmAddress);

					var count = 1;
					var htmterm = "";
					for ( var i = 0; i < r.partyMasterDtos.termsAndConditionInfoDto.length; i++) {
						htmterm = htmterm
								+ '<tr class="newAdded"> '
								+ ' <td class="col-md-1 center">'
								+ count
								+ '</td>'
								+ ' <td class="col-md-1 center" id="txtTermsAndConditionsTitleId'
								+ count
								+ '">'
								+ r.partyMasterDtos.termsAndConditionInfoDto[i].headingName
								+ '</td>'
								+ ' <td class="col-md-1 center" id="txtTermsAndConditionId'
								+ count
								+ '">'
								+ r.partyMasterDtos.termsAndConditionInfoDto[i].termconditionName
								+ '</td>'
								+ ' <td class="col-md-1 center" id="termsAndCondId'
								+ count
								+ '" style="display:none">'
								+ r.partyMasterDtos.termsAndConditionInfoDto[i].id
								+ '</td>'
								+ ' <td class="col-md-1 center"><input type="hidden" id="termsAndCondSlaveId'
								+ count
								+ '" value="'
								+ r.partyMasterDtos.termsAndConditionInfoDto[i].termsConditionSlaveId
								+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editTermsAndConditionInfoPartyMaster('
								+ r.partyMasterDtos.termsAndConditionInfoDto[i].termsConditionSlaveId
								+ ')"><i class="fa fa-edit"></i></button></td>'
								+ ' <td class="col-md-1 center">'
								+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deleteTermsAndCondition'
								+ count
								+ '" onclick="deletePartyMasterSlave('
								+ r.partyMasterDtos.termsAndConditionInfoDto[i].id
								+ ',\'deleteTermsAndCondition\')" '
								+ '><i class="fa fa-trash-o"></i></button></td>'
								+ '</tr>';
						count++;
					}
					$("#TermsAndConditionInfoTableList").append(htmterm);
					

				}
			});
}

/*******************************************************************************
 * @author Vishnu Thorat
 * @since 27-11-2019
 * @comment Below js code to get the purchase order item slave details w.r.t
 *          master id
 ******************************************************************************/
function showPurchaseOrderItemSlaveDetails(masterId) {
	var inputs = [];
	inputs.push('masterId=' + masterId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "ehat/inventoryPurchaseOrder/getAllPurchaseOrderItemSlaveDetails",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('Network Issue..!!');
				},
				success : function(r) {
					setPurchaseOrderItemSlaveDataToTable(r);
				}
			});
}

/**
 * 
 * @param id
 */
function editTermPurchaseQuotationMaster(id) {
	var termcondition = $("#termconditionIdPurchaseOrderId").val();
	var rows = $('#termsAndConditionTablePurchaseOrder tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var termInfoId = $("#hiddenTCId" + i).html();

		if (termcondition == "" && termInfoId == id) {
			termcondition = $("#hiddenTCName" + i).html();
		}

		else if (termInfoId == id) {

			termcondition = termcondition + "\n"
					+ $("#hiddenTCName" + i).html();
			console.log(termcondition);

		}
	}
	$("#termconditionIdPurchaseOrderId").val(termcondition);
}

/*******************************************************************************
 * @since 02-12-2019
 * @author Vishnu Thorat
 * @comment created this js function to fetch purchase order details
 * @param inputID
 * @returns {Boolean}
 ******************************************************************************/
function fetchPurchaseReOrderDetails(inputID) {
	var resultData = [];
	var findingName = $("input#" + inputID).val();
	if (findingName == "" || findingName == null || findingName == "null"
			|| findingName == undefined) {
		alertify.error("Please enter search value");
		getAllPurchaseReOrderRecordsDetails();
		$("input#" + inputID).focus();
		return false;
	}
	var inputs = [];
	inputs.push('supplierName=' + findingName);
	var str = inputs.join('&');
	var template = "";
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryPurchaseReOrder/autoFillSearchPurchaseReOrder",
		cache : false,
		success : function(r) {
			for ( var j = 0; j < r.purchaseReOrderDtos.length; j++) {

				var arrValue = r.purchaseReOrderDtos[j].id + "-"
						+ r.purchaseReOrderDtos[j].supplierName;
				var id = r.purchaseReOrderDtos[j].id;
				var supplierName = r.purchaseReOrderDtos[j].supplierName;
				resultData.push({
					ID : id,
					Name : supplierName,
				});
				template = template + '<li data-value="' + id
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}
			setTimeout(function() {
				$("div#searchPurchaseOrderDivId .typeahead").html(template);
				$("div#searchPurchaseOrderDivId .typeahead").show();
				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayPurchaseReOrderSearchResult,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}

	});
	// below function to set the search value to search text feild and calling
	// getPackingDetailsById function
	function displayPurchaseReOrderSearchResult(item) {
		var res = item.text.split('-');
		var purchaseOrderId = res[0];
		var supplierName = res[1];
		getPurchaseReOrderDetailsBySupplierName(supplierName);
		$("#" + inputID).val(supplierName);
	}
}

/*******************************************************************************
 * @author Vishnu Thorat
 * @since 02-12-2019
 * @comment below js created for to get the purchase order details by supplier
 *          name
 * @param supplier
 *            Name
 ******************************************************************************/
function getPurchaseReOrderDetailsBySupplierName(supplierName) {
	var inputs = [];
	inputs.push('supplierName=' + supplierName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/inventoryPurchaseReOrder/autoFillSearchPurchaseReOrder',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			// here we calling another function to set the data to table
			setPurchaseReOrderDataToTable(r);
		}
	});
}

/*******************************************************************************
 * @Since 13-11-2019
 * @author Vishnu Thorat
 * @Comment created this js function delete the purchase order and his slaves
 ******************************************************************************/
function deletePurchaseReOrder(id) {
	var r = confirm("Are You Sure You Want To Delete Purchase Order Details");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryPurchaseReOrder/deletePurchaseReOrder",
			data : {
				"id" : id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				//alertify.error(response);
				getAllPurchaseReOrderRecordsDetails();

			}
		});
	}
}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to close item purchase details modal
 */
function closeItemPurchaseDetailsModal() {
	$("#purchaseOrderModalId").modal("hide");
}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to print purchase order master
 * @param pQId
 */
function printPurchaseReOrderMaster(purchaseReOrderId) {
	window.open("inv_purchase_reorder_master_print.jsp?purchaseOrderId="
			+ purchaseReOrderId);
}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to show charges
 */
function showCharges() {
	$("#applyChargesOnPurchaseOrder").modal("show");
	getAllChargeMasterOnPurchaseReOrder();
}

/*******************************************************************************
 * @author :Vishnu Thorat
 * @date : 05-12-2019
 * @codeFor :getAllChargeMaster Detail
 ******************************************************************************/
function getAllChargeMasterOnPurchaseReOrder() {
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/getAllChargeMaster",
		error : function() {
			alert('error');
		},
		success : function(r) {
			// setChargeMasterDocTemp(r);
			console.log(r);
			var response = r;
			for ( var i = 0; i < response.lstchargemaster.length; i++) {
				$('#txtChargesList').append(
						'<option value="'
								+ response.lstchargemaster[i].chargeName + '">'
								+ response.lstchargemaster[i].chargeName
								+ '</option>');
			}
			;
		}
	});
}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to get exact amount on PO
 * @param id
 */
function exactAmountPO(id) {
	var txtexamunt = $("#chargeAmountId").val();
	$("#finalChargeAmountId").val(txtexamunt);

}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to get GST amount charge on PO
 * @param ID
 */
function gstAmountChargePO(ID) {
	var txtChargesAmt = $("#chargeAmountId").val();
	var txtfianlamt = 0.0;
	if (isNaN(txtChargesAmt)) {
		txtChargesAmt = 0;
	}
	var txtexGstper = $("#" + ID).val();
	if (isNaN(txtexGstper) || txtexGstper == "" || txtexGstper == null) {
		txtexGstper = 0;
	}
	var taxamt = 0;
	taxamt = parseFloat(txtChargesAmt) * parseFloat(txtexGstper) / 100;
	var txtexGstamt = taxamt;
	if (isNaN(txtexGstamt) || txtexGstamt == "") {

		txtexGstamt = 0;
	} else {
		var txtexamunt = $("#chargeAmountId").val();
		txtfianlamt = parseFloat(txtexamunt) + parseFloat(txtexGstamt);

	}
	$("#txtexGstamt").val(txtexGstamt);
	$("#finalChargeAmountId").val(txtfianlamt);

}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to add item charges name to list
 * @returns {Boolean}
 */
function addItemChargesName() {
	var txtChargesList = $("#txtChargesList option:selected").text();
	if ("-Select-" == txtChargesList || txtChargesList == 0) {
		alert("Please Select Charges");
		return false;
	}

	var txtChargesAmt = $("#finalChargeAmountId").val();
	var txtexGstper = $("#txtexGstper").val();
	var txtexGstamt = $("#txtexGstamt").val();
	var txtempAmt = $("#chargeAmountId").val();
	if (txtChargesAmt == '' || txtChargesAmt == null) {
		alert("please Select Charges Amt");
		return false;
	}

	if (txtChargesAmt == '' || txtChargesAmt == null
			|| txtChargesList == "-Select-" || txtChargesList == 0) {

		alert("Please Enter All Feilds ");
		return false;

	}
	var finalChargesNameandAMt = txtChargesList + "_" + txtChargesAmt + "_"
			+ txtempAmt + "_" + txtexGstper + "_" + txtexGstamt;

	var flag = 1;
	$('#lstBoxforCharges').find('option').each(function() {
		if ($(this).html() == finalChargesNameandAMt) {
			alert(" Charge Is Present In List");
			flag = 0;
		}
	});

	if (flag == 1) {
		var o = new Option("option text", "value");
		$(o).html(finalChargesNameandAMt);
		$(o).val(finalChargesNameandAMt);
		$("#lstBoxforCharges").append(o);
		$("#finalChargeAmountId").val("");
		$("#txtexGstper").val(0);
		$("#txtexGstamt").val(0);
		$("#chargeAmountId").val(0);
		$("#txtChargesList ").val('Select');
		$("#txtChargesList  option:selected").text("-Select-");

		$('select option').filter(
				function() {
					return !this.value || $.trim(this.value).length == 0
							|| $.trim(this.text).length == 0;
				}).remove();
	}

}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to remove item charges
 */
function removeItemCharges() {
	$('#lstBoxforCharges option:selected').remove();
}

/**
 * @author Vishnu Thorat
 * @since 27-12-2019
 * @comment created below function to apply charges item for charges
 * @returns {Boolean}
 */
function applyChargesforItem() {
	var txtPurchaseOrderTaxCode_ = "";
	// remove the wite space and empty option
	$('select option').filter(
			function() {
				return !this.value || $.trim(this.value).length == 0
						|| $.trim(this.text).length == 0;
			}).remove();
	$('#lstBoxforCharges').find('option').each(
			function() {
				txtPurchaseOrderTaxCode_ = txtPurchaseOrderTaxCode_
						+ ($(this).val() + ",");
			});
	if (txtPurchaseOrderTaxCode_ == ',' || txtPurchaseOrderTaxCode_ == ''
			|| txtPurchaseOrderTaxCode_ == null) {
		alert("Please Apply Atleast One Charge ");
		return false;
	}
	txtPurchaseOrderTaxCode_ = txtPurchaseOrderTaxCode_.substring(0,
			txtPurchaseOrderTaxCode_.length - 1);
	var Finalrateandtax = txtPurchaseOrderTaxCode_.split(",");
	$("#selboxChargeswithAmtList  option").remove();
	var sumofRate = 0;
	for ( var i = 0; i < Finalrateandtax.length; i++) {
		finalrat = Finalrateandtax[i];
		var taxRate = finalrat.split("_");
		finalRateamt = taxRate[1];
		sumofRate = parseFloat(sumofRate) + parseFloat(finalRateamt);
		var option = "";
		option = option + "<option value=" + finalrat + ">" + finalrat
				+ "</option>";
		$("#selboxChargeswithAmtList").append(option);
	}
	$("#sumofCharges").val(sumofRate.toFixed(2));
	calculateTotalTax();
	var textVat = $("#grossTaxesId").val();
	var finaltextVatValue = parseFloat(sumofRate) + parseFloat(textVat);
	$("#grossTaxesId").val(finaltextVatValue.toFixed(2));
	$('#lstBoxforCharges').html();
	$("#ApplyChargesforItem").hide('hide');
	calculateNetAmount();
}

/**
 * 
 */
function hideApplyChargespopaup() {
	$('#lstBoxforCharges').html();
	$("#ApplyChargesforItem").hide('hide');
	$("#finalChargeAmountId").val('');
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 20-12-2019
 * @codeFor : Add new row temp for Purchase Order
 ******************************************************************************/
function addNewRowInTablePurchaseOrder(tableId, callFrom) {
	var tbody = "";
	var rows = $('#' + tableId + ' tbody tr').length;
	if (callFrom == "purchaseorder") {
		tbody = getPurchaseOrderItemInfoBody(rows + 1);
	}
	$('#' + tableId).append(tbody);
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 20-12-2019
 * @codeFor : to Set Row Template To Body Of Item Info Table
 ******************************************************************************/
/*function getPurchaseOrderItemInfoBody(id) {
	// to set terms and condition master data on purchase order master
	// getTermAndConditionForPurchaseOrder();
	var tbody = "";
	tbody = tbody
			+ "<tr id='deleterow' class='newAdded'> <td> <input type='checkbox' class='chkMrnItem' name='checkbox"
			+ id
			+ "' id='checkbox"
			+ id
			+ "'/></td><td>"
			+ "  <input type='hidden' id='rowcountid"
			+ id
			+ "' value ='0'"
			+ "><span id='snum"
			+ id
			+ "'>"
			+ id
			+ "</span> </td>"
			+ " <td style='display:none'><div><input type='hidden' value='0' id='itemSlaveId"+ id +"'></div></td> "
			+ " <td><div id ='divtxtPurchaseQuotationItemName"
			+ id
			+ "'><input type='text' style='text-align:left;width:250px;' "
			+ "class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
			+ id
			+ "' onkeyup='fetchItemMasterDetails(this.id)' data-name='purchaseOrderModule' />"
			+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
			+ id
			+ "' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
			+ id
			+ "' value='0'/><input type='hidden'  id='itemMasterId"
			+ id
			+ "' value='0'/></div></td> "

			// added HSN Id here
			+ "<td style='display:none'><input type='text' disabled='disabled' class='form-control input-SmallText' id='hsnCodePurchaseOrder"
			+ id
			+ "'  style='width:90px;'></td>"

			// added HSN Name here
			+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' id='hsnCodeNamePurchaseOrder"
			+ id
			+ "'  style='width:90px;'></td>"

			+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
			+ id
			+ "' onkeyup='totalAmount(this.id,"
			+ id
			+ ")' onkeypress='return validateNumbers(event);' style='width:60px;' ><label id='txtPurchaseQuotationLastFactorUOM"
			+ id
			+ "' ></label></td> "

			+ "<td style='display:none'><input type='hidden' class='form-control input-SmallText' id='itemMasterId"
			+ id
			+ "' onkeyup='totalAmount(this.id,"
			+ id
			+ ")' style='width:60px;' ></td> "

			+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
			+ id
			+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
			+ id
			+ "'> </lable></td>"
			+ ""
			+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountPercentage"
			+ id
			+ "'  onkeyup='chkTradAmtorPercentage(this.id,"
			+ id
			+ ")'   onblur='calculTradeDis(this.id,"
			+ id
			+ ")'   onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"
			+ id
			+ ")' id='txtPurchaseQuotationTrdeDiscountInRupess"
			+ id
			+ "'  style='width:60px;' ></td>"
			+ " <td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationTrdeDiscountAmt"
			+ id
			+ "' onkeypress='return validateNumbers(event);'   style='width:60px;'></td>"
			+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
			+ id
			+ "' onkeypress='return validateNumbers(event);' style='width:100px;' ></td>"

			// GST And IGST of Purchase Order
			+ "<td><input type='text' class='typeahead form-control input-SmallText'  autocomplete='off' value='0' disabled='disabled' id='txtPurchaseQuotationTaxCodePO_"
			+ id
			+ "' onkeyup='calculateGSTWisePurchaseOrder(this.id,"
			+ id
			+ ");calculateTotalItemAmountPurchaseOrder("
			+ id
			+ ");calculateTotalItemgstAmountPurchaseOrder("
			+ id
			+ ");autotaxCodeforItemGstPurchaseOrder("+ id + "," + id + ",this.id);'  style='width:80px;'></td>"
			+ " <td><input type='text' class='typeahead form-control input-SmallText' disabled='disabled' value='0' onkeyup='calculateIGSTWisePurchaseOrder(this.id,"
			+ id
			+ ");calculateTotalItemAmountPurchaseOrder("
			+ id
			+ ");calculateTotalItemigstAmountPurchaseOrder("
			+ id
			+ ");autotaxCodeforItemigstPurchaseOrder(" + id + "," + id + ",this.id);' id='txtPurchaseQuotationTaxAmount_"
			+ id
			+ "'   style='width:80px;'  autocomplete='off' ></td> "

			// GST And IGST total Amount purchase order
			+ "<td><input type='text' class='form-control input-SmallText' disabled='disabled' style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
			+ id
			+ "'   ></td> "
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' value='0' type='text' disabled='disabled' id='igstAmtId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			// 777777777777777777777777777777777

			+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
			+ id
			+ "' onkeypress='return validateNumbers(event);'  style='width:100px;'></td>"
			+ "<td><input type='text' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactorOne"
			+ id
			+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'><label id='uomUnitFactorOneNameId"
			+ rowCount
			+ "' ></label></td> "
			+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactorTwo"
			+ id
			+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0' ><label id='uomUnitFactorTwoNameId"
			+ rowCount
			+ "' ></label></td> "
			+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactorThree"
			+ id
			+ "' onkeypress='return validateNumbers(event);'value='0'><label id='uomUnitFactorThreeNameId"
			+ rowCount
			+ "' style='width:60px;' ></label></td> "
			+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'style='width:60px;' id='txtPurchaseQuotationFactorFour"
			+ id
			+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'><label id='uomUnitFactorFourNameId"
			+ rowCount
			+ "' style='width:60px;'></label></td> "
			+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
			+ id
			+ "' onblur='pendingAmount(this.id,"
			+ id
			+ ")' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
			+ "<td style='display:none'><input type='text' class='form-control input-SmallText'    id='txtPurchaseQuotationPendingQuantity"
			+ id
			+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
			
			+ "<td style='display:none'><input type='text' class='form-control input-SmallText' id='assetItemStatusId"
			+ id
			+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
			+ "<td style='display:none'><input type='text' class='form-control input-SmallText' id='isItemBatchWiseId"
			+ id
			+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
			
			+ "<td style='display:none'><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNoPO"
			+ id + "' style='width:60px;' ></td>"+
			
			// added by Vishnu Thorat reagent item type
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='reagentItemStatusId"
			+ id + "' class='form-control input-SmallText'> </td>"
			
			//added by Vishnu Thorat on 12-08-2020 asset manufacture name 
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetItemManufactureId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+
			
			//added by Vishnu Thorat on 12-08-2020 asset amc value
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetAmcValId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+
			
			//added by Vishnu Thorat on 12-08-2020 asset pm value
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetPmValId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+
			
			//added by Vishnu Thorat on 12-08-2020 asset amc year value
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetAmcYearId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+
			
			//added by Vishnu Thorat on 12-08-2020 asset pm year value
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetPmYearId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+
			
			//added by Vishnu Thorat on 12-08-2020 asset product warranty value
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetProductWarrantyId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"+
			
			//added by Vishnu Thorat on 12-08-2020 to store product category type
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetProductCategory"
			+ id
			+ "' class='form-control input-SmallText'> </td>"+
			
			//added by Vishnu Thorat on 12-08-2020 lab equipment item type
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='labEquipmentItemStatusId"
			+ id + "' class='form-control input-SmallText'> </td>"
			
			+ " </tr>";
	$("#RowCount").val(id);
	var totaltblsize = $("#RowCount").val();
	$("#totaltblsize").val(totaltblsize);
	$("#itemInfoDetails").append(tbody);
	// $("#bankID" + id).html($("#bankID").html());
}*/

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 20-12-2019
 * @codeFor : Remove row temp for MRN
 ******************************************************************************/
function removeRowFromTablePurchaseOrder(tableId, checkboxClass) {
	var rowCount = $("#RowCount").val();
	var itemSlaveId = new Array();
	$("input[name='checkbox']:checked").each(function() {	
		
		var slaveId=$("#itemSlaveId"+$(this).val()).val();
		if(slaveId >0){
			itemSlaveId.push(slaveId);
		}
	});
	 if(itemSlaveId.length>0){
		 var inputs = [];
			inputs.push('itemSlaveId=' + itemSlaveId);
			var str = inputs.join('&');
			jQuery.ajax({
				async : false,
				type : "POST",
				url : "ehat/inventoryPurchaseOrder/deletePurchaseOrderItemInfoSlave",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(response) {
					$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
					alert(response);
					$("#grossAmountId").val(0);
					$("#grossLessAmountId").val(0);
					$("#grossAddAmountId").val(0);
					$("#grossTaxesId").val(0);
					$("#grossNetAmountId").val(0);
					$("#taxVatId").val(0);
					$("#taxIgstId").val(0);
					$("#taxTotalTaxesId").val(0);
					$("#totalGstAmt").val(0);
					$("#totaliGstAmt").val(0);
					
					
				}
			});
	 }
	else{
	$('.' + checkboxClass + ':checkbox:checked').parents("tr").remove();
	checkForPurchaseOrder(tableId);
	checkCompForPurchaseOrder(tableId);
	totalDocDiscountPO();
	totalDocQtyPO();
	totalGrossAmtPO(1, rowCount);
	totalVatAmt(1, rowCount);
	totalAmount(1, rowCount);

	var gst = $("#taxVatId").val();
	var igst = $("#taxIgstId").val();
	calculateTotalItemAmountPurchaseOrder(1);

	if (parseFloat(gst) == 0) {
	} else {
		//below function willl calculate the under tax info gst and total total after row remove
		calculateTotalItemgstAmountAfterRemoveRowPurchaseOrder(1);
	}

	if (parseFloat(igst) == 0) {
	} else {
		calculateTotalItemigstAmountAfterRemoveRowPurchaseOrder(1);
	}
	calculateTotalItemgstAmountAfterRemoveRowPurchaseOrder(1);
	 }
}
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 20-12-2019
 * @codeFor : For reorder srno after delete
 ******************************************************************************/
function checkForPurchaseOrder(tableId) {
	obj = $('#' + tableId + ' tbody tr').find('span');
	$.each(obj, function(key, value) {
		id = value.id;
		$('#' + id).html(key + 1);
	});
}

/************
* @author	: Vinod Udawant
* @date		: 18-Nov-2019
* @codeFor	: For reorder index ids of componant after delete
 ************/
function checkCompForPurchaseOrder(tableId){
	var trLength = $('#'+tableId).find("tr:first th").length;
	obj=$('#'+tableId+' tbody tr td').find('input');
	var inx = 1;
	var idIndex = 1;
	$.each( obj, function( key, value ) {		
		if(inx == (trLength+1)){
			
			inx = 1;
			idIndex++;
		}		
		id=value.id;		
		var idText = (value.id).replace(/[0-9]/g, '');
		var replaceById = idText + idIndex;
		$('#'+id).attr('id',replaceById);
		inx++;
	});
}
/**
 * 
 */
function showpartyMasterDetailsModalOnPurchaseReOrder() {
	$('#purchaseOrderContactAddressModalId').modal('show');

}

/**
 * 
 * @param response
 */
function setPartyModalAddressInfoToPurchaseReOrder(response) {
	var count = 0;
	var htm = "";

	for ( var i = 0; i < response.partyMasterAddressInfoDto.length; i++) {

		count++;
		htm = htm
				+ '<tr class="newAdded"> '
				+ ' <td class="col-md-1 center">'
				+ count
				+ '</td>'
				+ ' <td class="col-md-1 center"><input id="radioId" name="rdTreat" type="radio" value="'
				+ count + '">'

				+ '</td>'

				+ ' <td  class="hidden"><input id="countId" type="text" value='
				+ count + '>'

				+ '</td>'

				+ ' <td class="col-md-1 center" id="stateName' + count + '" >'
				+ response.partyMasterAddressInfoDto[i].state + '</td>'

				+ ' <td class="col-md-1 center" id="address' + count + '" >'
				+ response.partyMasterAddressInfoDto[i].address + '</td>'

				+ '</tr>';

	}
	$("#partyMasterAddressSlaveRecordList").html(htm);
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Dec-2019
 * @codeFor : setPartyModalContactInfoToPurcchaseQuotation
 ******************************************************************************/
function setPartyModalContactInfoToPurchaseReOrder(response) {

	var count = 0;
	var htm = "";
	for ( var i = 0; i < response.partyMasterContactInfoDto.length; i++) {

		$("#mbNo").val(
				response.partyMasterContactInfoDto[i].contactPhoneNumber1);
		count++;
		htm = htm
				+ '<tr class="newAdded"> '
				+ ' <td class="col-md-1 center">'
				+ count
				+ '</td>'
				+ ' <td class="col-md-1 center"><input id="radioId1" name="rdTreat1" type="radio" value="'
				+ count + '">'

				+ '</td>'

				+ ' <td class="col-md-1 center" id="contactPhoneOne' + count
				+ '" >'
				+ response.partyMasterContactInfoDto[i].contactPhoneNumber1
				+ '</td>' + '</tr>';
	}
	$("#partyMasterContactSlaveRecordList").html(htm);
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Dec-2019
 * @codeFor : setPartyModalInfoToTableOnPurchaseQuotation
 ******************************************************************************/
function setPartyModalInfoToTableOnPurchaseOrder() {

	$("input[name='rdTreat']:checked").each(function() {

		var inx = $(this).val();

		$("#supplierAddressId").val($("#address" + inx).html());
	});

	$("input[name='rdTreat1']:checked").each(function() {

		var inx = $(this).val();

		$("#supplierMobileNoId").val($("#contactPhoneOne" + inx).html());
	});
	closepartyMasterDetailsModalOnPurchaseOrder();
}

/**
 * 
 */
function closepartyMasterDetailsModalOnPurchaseOrder() {
	$('#purchaseOrderContactAddressModalId').modal('hide');

}
function totalDocQtyPO() {
	var sum = 0;
	var totalQty;
	var RowCount = $("#RowCount").val();

	// var totalRow = $("#totalRow").val();

	for ( var i = 1; i <= RowCount; i++) {
		totalQty = $("#txtPurchaseQuotationDocQuantity" + i).val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}

	$("#txtPurchaseQuotationDocQuantity").val(sum);
	$("#RowCount").val(RowCount);

}

function totalDocDiscountPO() {
	var sum = 0;
	var tradeAmt;
	var RowCount = $("#RowCount").val();

	for ( var i = 1; i <= RowCount; i++) {
		tradeAmt = $("#txtPurchaseQuotationTrdeDiscountAmt" + i).val();
		if (tradeAmt == null || tradeAmt == undefined || tradeAmt == '') {
			var flag = 1;
		} else {
			sum = (parseFloat(sum) + parseFloat(tradeAmt)).toFixed(2);
			;
		}

	}

	$("#totalItemDiscountId").val(sum);
	$("#RowCount").val(RowCount);

}
function totalGrossAmtPO(id, rowCount) {
	var sum = 0;
	var baseAmount;
	var RowCount = $("#RowCount").val();
	// var totalRow = $("#totalRow").val();
	var totaltblsize = $("#totaltblsize").val();

	for ( var i = 1; i <= totaltblsize; i++) {
		var checkbox = $('#checkbox'+i+':checkbox:checked').length;
		if(checkbox > 0){
			baseAmount = $("#txtPurchaseQuotationBaseAmount" + i).val();
			if (baseAmount == null || baseAmount == undefined || baseAmount == '') {
				var flag = 1;
			} else {
				sum = parseFloat(sum) + parseFloat(baseAmount);
			}
		}

	}
	// alert(sum);
	$("#grossAmountId").val(sum.toFixed(2));

}

function chKTradAmt(id, rowcount) {
	var matches = id.match(/(\d+)/);
	if(matches[0] != rowcount){
		rowcount = matches[0];
	}
	var txtPurchaseQuotationTrdeDiscountInRupess = $(
			"#txtPurchaseQuotationTrdeDiscountInRupess" + rowcount).val();

	if (txtPurchaseQuotationTrdeDiscountInRupess == ""
			|| txtPurchaseQuotationTrdeDiscountInRupess == null) {
		document.getElementById("txtPurchaseQuotationTrdeDiscountPercentage"
				+ rowcount).disabled = false;
		$("#txtPurchaseQuotationTrdeDiscountAmt" + rowcount).val(' ');
		$("#txtPurchaseQuotationBaseAmount" + rowcount).val(0);
		$("#txtPurchaseQuotationRowAmount" + rowcount).val(' ');
		$("#totalItemDiscountId").val('0');
		// return false;

	}

	if (txtPurchaseQuotationTrdeDiscountInRupess != ""
			|| txtPurchaseQuotationTrdeDiscountInRupess != null) {
		document.getElementById("txtPurchaseQuotationTrdeDiscountPercentage"
				+ rowcount).disabled = true;
		$("#txtPurchaseQuotationTrdeDiscountPercentage" + rowcount).val(0);
		var docqty = $("#txtPurchaseQuotationDocQuantity" + rowcount).val();
		var unitprise = $("#txtPurchaseQuotationUnitPrice" + rowcount).val();
		var baseAmt = docqty * unitprise;
		var FinalBaseAmt = baseAmt - txtPurchaseQuotationTrdeDiscountInRupess;

		$("#txtPurchaseQuotationTrdeDiscountAmt" + rowcount).val(
				txtPurchaseQuotationTrdeDiscountInRupess);
		$("#txtPurchaseQuotationBaseAmount" + rowcount).val(FinalBaseAmt);
		rowAmtCal(1, rowcount);
		calculTradeDisRs("txtPurchaseQuotationTrdeDiscountInRupess", rowcount);
		totalGrossAmt(1, rowcount);
		totalVatAmt(1, rowcount);

	}

}

/* calculate Total TradeDis Discount IN rupess */

function calculTradeDisRs(id, rowCount) {
	var treadeDiscountRs = $(
			"#txtPurchaseQuotationTrdeDiscountInRupess" + rowCount).val();
	var oldbaseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
	if (treadeDiscountRs) {
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val('');
		$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val('');
		var docqty = $("#txtPurchaseQuotationDocQuantity" + rowCount).val();
		var unitprise = $("#txtPurchaseQuotationUnitPrice" + rowCount).val();
		var baseAmt = parseFloat(docqty) * parseFloat(unitprise);
		var finaltotalbaseAmt = parseFloat((baseAmt))
				- parseFloat(treadeDiscountRs);
		$('#txtPurchaseQuotationTrdeDiscountAmt' + rowCount).val(
				treadeDiscountRs);
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val(
				finaltotalbaseAmt.toFixed(2));
		var RowCount = $("#RowCount").val();
		var totaltblsize = $("#totaltblsize").val();
		var FinaltradeDiscount = 0;
		for ( var i = 1; i <= totaltblsize; i++) {
			var txtPurchaseQuotationTrdeDiscountAmt = $(
					"#txtPurchaseQuotationTrdeDiscountAmt" + i).val();
			if (txtPurchaseQuotationTrdeDiscountAmt != ''
					&& txtPurchaseQuotationTrdeDiscountAmt != null
					&& txtPurchaseQuotationTrdeDiscountAmt != undefined) {
				FinaltradeDiscount = (parseFloat(FinaltradeDiscount) + parseFloat(txtPurchaseQuotationTrdeDiscountAmt))
						.toFixed(2);
			}

		}
		$("#totalItemDiscountId").val(FinaltradeDiscount);
	}

}

/*******************************************************************************
 * @author Vishnu Thorat
 * @since 23-03-2020
 * @comment created this js to get the next purchase order id
 ******************************************************************************/
function getNextIdNew() {
	var inputs = [];
	inputs.push('action=getItemMasterNextId');
	inputs.push('tableName=inv_purchase_order_new');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/inventoryItemMaster/getNextItemMasterIdNew",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#orderNoId").val(r);
		}
	});
}

/*******************************************************************************
 * @Since 23-03-2020
 * @author Vishnu Thorat
 * @Comment created this js function to get the party master details by using
 *          his name on purchase order
 ******************************************************************************/
function setAutoSupplierNameOnPurchaseOrder(inputID) {
	var categoryName = $("#" + inputID).attr('data-name');
	var resultData = [];
	var findingName = $("input#" + inputID).val();
	if (findingName == "" || findingName == null || findingName == "null"
			|| findingName == undefined) {
		alertify.error("Please enter search value");
		$("input#" + inputID).focus();
		return false;
	}
	var inputs = [];
	inputs.push('supplierName=' + findingName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/inventoryPurchaseOrder/autoFillSearchOnPartyMaster",
				cache : false,
				success : function(r) {
					if (r.partyMasterDto.length == 0) {
						alertify
								.error("You Cannot Insert Other Supplier Name...!!!");
						document.getElementById('supplierNameId').value = "";
					}
					var template = "";
					for ( var j = 0; j < r.partyMasterDto.length; j++) {
						var newId = r.partyMasterDto[j].id;
						var arrValue = r.partyMasterDto[j].id + "-"
								+ r.partyMasterDto[j].name;

						var id = r.partyMasterDto[j].id;
						var partyName = r.partyMasterDto[j].name;
						resultData.push({
							ID : id,
							Name : partyName
						});
						if (categoryName == "purchaseOrderSupplierName") {
							template = template + '<li data-value="' + id
									+ '" class=""><a href="#">' + arrValue
									+ '</a></li>';
						}

					}
					if (categoryName == "purchaseOrderSupplierName") {
						setTimeout(
								function() {
									$("div#searchSupplierNameDivId .typeahead")
											.html(template);
									$("div#searchSupplierNameDivId .typeahead")
											.show();

									$("input#" + inputID)
											.typeahead(
													{
														source : resultData,
														displayField : 'Name',
														valueField : 'ID',
														onSelect : displayPartyMasterSearchResult,
														scrollBar : true
													});
									$("input#" + inputID).data('typeahead').source = resultData;
								}, 500);
					}
				}
			});
	// below function to set the search value to search text feild and calling
	// getPackingDetailsById function
	function displayPartyMasterSearchResult(item) {
		var res = item.text.split('-');
		var partyName = res[1];
		var partyMasterId = res[0];
		$("#partyMasterId").val(partyMasterId);

		getPartyMasterDetailsById(partyMasterId);
		document.getElementById("hiddenSupplierNameId").value = partyName;

	}
}
/*******************************************************************************
 * @Since 14-11-2019
 * @author Vishnu Thorat
 * @Comment created this js function to get the party master details by using
 *          his name
 ******************************************************************************/
function getPartyMasterDetailsById(partyMasterId) {
	var inputs = [];
	inputs.push('id=' + partyMasterId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "ehat/invPartyMaster/editPartyMaster",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(response) {
					$("#supplierNameId").val(response.name);
					$("#hiddenPartyMasterId").val(response.id);
					setPartyContactInfoOnPurchaseReOrder(response);
					setPartyModalAddressInfoToPurchaseReOrder(response);
					setPartyModalContactInfoToPurchaseReOrder(response);
					showpartyMasterDetailsModalOnPurchaseReOrder();
					setParyMasterStateToPurchaseReOrder(response);
					for ( var i = 0; i < response.partyMasterAddressInfoDto.length; i++) {
						$("#grnSupplierAddress").val(
								response.partyMasterAddressInfoDto[i].address);
					}

				}
			});

}

/**
 * @since 23-03-2020
 * @author This method is craeted for to remove duplicate states after selecting
 *         party name on Purchase Order
 */
function removeDuplicateStatesPurchaseOrder() {
	var optionValues = [];
	$('#supplierStateId option').each(function() {
		if ($.inArray(this.value, optionValues) > -1) {
			$(this).remove();
		} else {
			optionValues.push(this.value);
		}
	});
}

/**
 * @authr Vishnu Thorat
 * @comment Added this js function to set party master state to purchase order
 *          module
 * @since 23-03-2020
 * @param r
 */
function setParyMasterStateToPurchaseReOrder(r) {
	var divContent = "";
	divContent = divContent
			+ "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";

	for ( var i = 0; i < r.partyMasterAddressInfoDto.length; i++) {
		divContent = divContent + "<option value='"
				+ r.partyMasterAddressInfoDto[i].stateId + "'>"
				+ r.partyMasterAddressInfoDto[i].state + "</option>";
	}
	divContent = divContent + "</select>";
	$("#supplierStateId").html(divContent);
	$("#supplierStateId").select2();

}

/**
 * @authr Vishnu Thorat
 * @comment Added this js function to get vender state on PO
 * @since 23-03-2020
 */
function getVenderStateOnPurchaseOrder() {
	var supplierState = $("#supplierStateId option:selected").val();
	var userState = $("#userState").val();
	var rows = $('#ItemInfoTablePO tbody tr.newAdded').length;
	$("#hiddenVenderStatePRO").val(supplierState);
	for ( var i = 1; i <= rows; i++) {
		if (supplierState == userState) {
			document.getElementById("txtPurchaseQuotationTaxCodePO_" + i).disabled = false;
			document.getElementById("txtPurchaseQuotationTaxAmount_" + i).disabled = true;
		} else {
			document.getElementById("txtPurchaseQuotationTaxCodePO_" + i).disabled = true;
			document.getElementById("txtPurchaseQuotationTaxAmount_" + i).disabled = false;
		}
	}
}

/**
 * @since 23-03-2020
 * @author Vishnu Thorat
 * @comment Added this function to close purchase order popup and to clear the
 *          data
 */
function closePROPopUp() {
	window.location.replace("inv_purchase_reorder_master.jsp");
	refreshPRO();

	$("#purchaseReOrderModuleModal").modal('hide');
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 23-03-2020
 * @codeFor : refreshPO
 ******************************************************************************/
function refreshPRO() {
	$("#orderNoId").val(0);
	$("#supplierMobileNoId").val("");
	$("#supplierMobileNoId").attr("placeholder", "Enter Mobile No");
	$("#referenceNoId").val("");
	$("#referenceNoId").attr("placeholder", "Enter Reference No");
	$("#supplierAddressId").val("");
	$("#supplierAddressId").attr("placeholder", "Address");
	$("#supplierNameId").val("");
	$("#supplierNameId").attr("placeholder", "Enter Supplier Name");
	$("#purchaseOrderRemarkId").val("");
	$("#lessSpecialDiscountId").val("");
	$("#lessDebitAmountId").val("");
	$("#lessCDPercent1Id").val(0);
	$("#lessCDPercent2Id").val(0);
	$("#addOctroiId").val(0);
	$("#addSurchargeId").val(0);
	$("#addCreditAmountId").val(0);
	$("#addFreightId").val(0);
	$("#taxVatId").val(0);
	$("#taxLBTId").val(0);
	$("#taxCSTId").val(0);
	$("#taxExVatId").val(0);
	$("#taxTotalTaxesId").val(0);
	$("#grossAmountId").val(0);
	$("#grossLessAmountId").val(0);
	$("#grossAddAmountId").val(0);
	$("#grossTaxesId").val(0);
	$("#grossNetAmountId").val(0);
	//$('#contactInfoDetialsForm')[0].reset();
	//$('#addressInfoFormIdPO')[0].reset();
	$("#totaltblsize").val(0);

	var tableHeaderRowCount = 1;
	var table = document.getElementById('contactInfoTablePurchaseOrder');
	var rowCount = table.rows.length;
	for ( var i = tableHeaderRowCount; i < rowCount; i++) {
		table.deleteRow(tableHeaderRowCount);
	}

	var tableHeaderRowCount1 = 1;
	var table = document.getElementById('addressInfoTablePurchaseOrder');
	var rowCount = table.rows.length;
	for ( var i = tableHeaderRowCount1; i < rowCount; i++) {
		table.deleteRow(tableHeaderRowCount1);
	}

	var tableHeaderRowCount2 = 1;
	var table = document.getElementById('ItemInfoTablePO');
	var rowCount = table.rows.length;
	for ( var i = tableHeaderRowCount2; i < rowCount; i++) {
		table.deleteRow(tableHeaderRowCount2);
	}
	// here we calling this function to generate the item info table rows after
	// closing the modal

}

function getAllItemStockBelowMinimumLevel() {
	document.getElementById("primeLoader").style.display = "block";
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryPurchaseReOrder/getAllItemStockBelowMinimunLevel",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			$("#reOrderedColumn").show();
			var htm = "";
			var index = 1;
			var supplierState = $("#supplierStateId option:selected").val();
			var userState = $("#userState").val();
			$("#totaltblsize").val(r.length);
			$("#RowCount").val(r.length);
			for ( var i = 0; i < r.length; i++) {
				var unit1 = r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice1;
				var unit2 = r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice2;
				var unit3 = r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice3;
				var unit4 = r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice4;
				if(r[i].isReordered == "Y"){
					htm = htm
					+ "<tr id='deleterow' class='newAdded'> <td> <input type='checkbox' class='chkMrnItem' disabled='disabled'   name='checkbox' id='checkbox"
					+ index
					+ "'/></td><td>"
					+ index
					+ "  <input type='hidden' id='rowcountid"
					+ index
					+ "' value ="
					+ index
					+ "> </td>"

					+ " <td style='display:none'><div><input type='hidden' value='0' disabled='disabled' id='itemSlaveId"+ index+ "'></div></td> "

					+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text'  disabled='disabled' style='text-align:left;width:250px;' "
					+ "class='typeahead form-control input-SmallText' value='"
					+ r[i].itemName
					+ "' id='txtPurchaseQuotationItemName_"
					+ index
					+ "' data-name='purchaseReOrderModule' />"
					+ "<input type='hidden' disabled='disabled' id='txtPurchaseQuotationItemNumber"
					+ index
					+ "' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
					+ index
					+ "' value=''/><input type='hidden'  id='itemMasterId"
					+ index
					+ "' value='"
					+ r[i].id
					+ "'/></div></td> "

					// added HSN ID here
					+ "<td style='display:none'><input type='text' disabled='disabled' value="
					+ r[i].hsnName
					+ " class='form-control input-SmallText' id='hsnCodePurchaseOrder"
					+ index
					+ "'  style='width:90px;'></td>"

					// added HSN Name here
					+ "<td><input type='text' disabled='disabled' value='"
					+ r[i].hsnNameValue
					+ "' class='form-control input-SmallText' id='hsnCodeNamePurchaseOrder"
					+ index
					+ "'  style='width:90px;'></td>"

					+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
					+ r[i].currentSubInventoryStock
					+ " id='txtPurchaseQuotationDocQuantity"
					+ index
					+ "' onkeyup='totalAmount(this.id,"
					+ index
					+ ");' onkeypress='return validateNumbers(event);' disabled='disabled' style='width:60px;' ><label id='txtPurchaseQuotationLastFactorUOM"
					+ rowCount
					+ "' ></label></td> ";
					
					if((r[i].itemPurchaseSlaveDto[0].purchaseFactorUom1 != 0 && r[i].itemPurchaseSlaveDto[0].purchaseFactorUom2 == 0)){
						if(parseInt(unit1) != 0 && parseInt(unit2) == 0){
							htm = htm	+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
								+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice1
								+ " id='txtPurchaseQuotationUnitPrice"
								+ index
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
								+ index
								+ "'>"
								+ r[i].itemPurchaseSlaveDto[0].uomUnitOneName
								+ " </lable></td>" + "";
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) == 0 && parseInt(unit4) == 0){
							htm = htm	+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice2
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitTwoName
							+ " </lable></td>" + "";
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) == 0){
							htm = htm	+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice3
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitThreeName
							+ " </lable></td>" + "";
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) != 0){
							
							htm = htm	+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice4
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitFourName
							+ " </lable></td>" + "";
						}else{
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' disabled='disabled' value='0' id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>NA</lable></td>" + "";	
							//alert("Please check unit price should be greater than 0 for "+r[i].itemName+" in item master");
						}
					}else if((r[i].itemPurchaseSlaveDto[0].purchaseUomFactor2 != 0 && r[i].itemPurchaseSlaveDto[0].purchaseUomFactor1 != 0 &&
							r[i].itemPurchaseSlaveDto[0].purchaseUomFactor3 == 0 &&
							r[i].itemPurchaseSlaveDto[0].purchaseUomFactor4 == 0)){
						if(parseInt(unit1) != 0 && parseInt(unit2) == 0){
							htm = htm + "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice1
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitOneName
							+ " </lable></td>" + "";
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) == 0 && parseInt(unit4) == 0){
							htm = htm + "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice2
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitTwoName
							+ " </lable></td>" + "";
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) == 0){
							htm = htm + "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice3
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitThreeName
							+ " </lable></td>" + "";
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) != 0){
							htm = htm + "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice4
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitFourName
							+ " </lable></td>" + "";
						}else{
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' disabled='disabled' value='0' id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>NA</lable></td>" + "";	
							//alert("Please check unit price should be greater than 0 for "+r[i].itemName+" in item master");
						}
					}else if((r[i].itemPurchaseSlaveDto[0].purchaseUomFactor3 != 0 && r[i].itemPurchaseSlaveDto[0].purchaseUomFactor2 != 0 &&
							r[i].itemPurchaseSlaveDto[0].purchaseUomFactor1 != 0 &&
							r[i].itemPurchaseSlaveDto[0].purchaseUomFactor4 == 0)){
						
						if(parseInt(unit1) != 0 && parseInt(unit2) == 0){
							htm = htm + "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice1
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitOneName
							+ " </lable></td>" + "";	
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) == 0 && parseInt(unit4) == 0){
							htm = htm + "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice2
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitTwoName
							+ " </lable></td>" + "";	
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) == 0){
							htm = htm + "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice3
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitThreeName
							+ " </lable></td>" + "";	
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) != 0){
							htm = htm + "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice4
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitFourName
							+ " </lable></td>" + "";	
						}else{
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' disabled='disabled' value='0' id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>NA</lable></td>" + "";	
							//alert("Please check unit price should be greater than 0 for "+r[i].itemName+" in item master");
						}
					}else if((r[i].itemPurchaseSlaveDto[0].purchaseUomFactor4 != 0 &&
							r[i].itemPurchaseSlaveDto[0].purchaseUomFactor3 != 0 &&
							r[i].itemPurchaseSlaveDto[0].purchaseUomFactor2 != 0 &&
							r[i].itemPurchaseSlaveDto[0].purchaseUomFactor1 != 0)) {
						if(parseInt(unit1) != 0 && parseInt(unit2) == 0){
							htm = htm + "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice1
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitOneName
							+ " </lable></td>" + "";	
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) == 0 && parseInt(unit4) == 0){
							htm = htm + "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice2
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitTwoName
							+ " </lable></td>" + "";	
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) == 0){
							htm = htm + "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice3
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitThreeName
							+ " </lable></td>" + "";	
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) != 0){
							htm = htm + "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice4
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitFourName
							+ " </lable></td>" + "";	
						}else{
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' disabled='disabled' value='0' id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>NA</lable></td>" + "";	
							//alert("Please check unit price should be greater than 0 for "+r[i].itemName+" in item master");
						}
					}
				htm = htm
						+ " <td><input type='text' disabled='disabled' class='form-control input-SmallText' disabled value="
						+ 0
						+ " onblur='calculTradeDis(this.id,"
						+ index
						+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
						+ index
						+ "'  onkeyup='chkTradAmtorPercentage(this.id,"
						+ index
						+ ")' onkeypress='return validateNumbers(event);' ></td> "
						+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' disabled onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"
						+ index
						+ ")' id='txtPurchaseQuotationTrdeDiscountInRupess"
						+ index + "'  style='width:60px;' ></td>"
						+ " <td><input type='text' disabled='disabled' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountAmt"
						+ index
						+ "' onkeypress='return validateNumbers(event);'   style='width:60px;'></td>"
						+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
						+ index
						+ "' onkeypress='return validateNumbers(event);' style='width:100px;' ></td>";
				
				if (supplierState == userState) {
					htm = htm	+ "<td><input type='text' disabled='disabled' class='typeahead form-control input-SmallText' value="
					+ r[i].taxRate 
					+ " autocomplete='off'  id='txtPurchaseQuotationTaxCodePO_"
					+ index
					+ "' onkeyup='calculateGSTWisePurchaseOrder(this.id,"
					+ index
					+ ");calculateTotalItemAmountPurchaseOrder("
					+ index
					+ ");calculateTotalItemgstAmountPurchaseOrder("
					+ index + ");autotaxCodeforItemGstPurchaseOrder("+ index + "," + index+ ",this.id);' rowAmtCalNEWForGstPurchaseOrder(this.id,"+ index + ");'   style='width:80px;'></td>";
					
					htm = htm
					+ " <td><input type='text' disabled='disabled' class='typeahead form-control input-SmallText' disabled value='0' onkeyup='calculateIGSTWisePurchaseOrder(this.id,"
					+ index
					+ ");calculateTotalItemAmountPurchaseOrder("
					+ index
					+ ");calculateTotalItemigstAmountPurchaseOrder("
					+ index
					+ ");autotaxCodeforItemigstPurchaseOrder("+ index + "," + index + ",this.id);' value="
					+ r[i].taxRate 
					+ " id='txtPurchaseQuotationTaxAmount_"
					+ index
					+ "'   style='width:80px;'  autocomplete='off' ></td> ";
					
				}else{
					htm = htm	+ "<td><input type='text' disabled='disabled' class='typeahead form-control input-SmallText' value='"+r[i].taxRate+"' autocomplete='off'  id='txtPurchaseQuotationTaxCodePO_"
					+ index
					+ "' onkeyup='calculateGSTWisePurchaseOrder(this.id,"
					+ index
					+ ");calculateTotalItemAmountPurchaseOrder("
					+ index
					+ ");calculateTotalItemgstAmountPurchaseOrder("
					+ index + ");autotaxCodeforItemGstPurchaseOrder("+ index + "," + index+ ",this.id);' rowAmtCalNEWForGstPurchaseOrder(this.id,"+ index + ");' style='width:80px;'></td>";
					
					htm = htm
					+ " <td><input type='text' disabled='disabled' class='typeahead form-control input-SmallText' disabled value='0' onkeyup='calculateIGSTWisePurchaseOrder(this.id,"
					+ index
					+ ");calculateTotalItemAmountPurchaseOrder("
					+ index
					+ ");calculateTotalItemigstAmountPurchaseOrder("
					+ index
					+ ");autotaxCodeforItemigstPurchaseOrder("+ index + "," + index + ",this.id);' value="
					+ r[i].taxRate 
					+ " id='txtPurchaseQuotationTaxAmount_"
					+ index
					+ "'   style='width:80px;'  autocomplete='off' ></td> ";
				}

			// below is the IGST total amount
				if (supplierState == userState) {
					htm = htm
							+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
							+ 0
							+ " style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
							+ index + "'></td> ";
				
					htm = htm
							+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' disabled value="
							+ 0
							+ " style='width:100px;' id='igstAmtId"
							+ index + "'   ></td> ";
				}else{
					
					htm = htm
					+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
					+ 0
					+ " style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
					+ index + "'></td> ";
			
					htm = htm
							+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' disabled value="
							+ 0
							+ " style='width:100px;' id='igstAmtId"
							+ index + "'   ></td> ";
				}
			htm = htm
					+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' value='0' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationRowAmount"
					+ index +"' style='width:100px;'></td>";
				
				if((r[i].itemPurchaseSlaveDto[0].purchaseFactorUom1 != "" && r[i].itemPurchaseSlaveDto[0].purchaseFactorUom1 !=null)){
					htm = htm	+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'style='width:60px;' value="
					+ r[i].itemPurchaseSlaveDto[0].purchaseFactorUom1
					+ " id='txtPurchaseQuotationFactorFour"
					+ index
					+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'>"
					+ "<lable id='uomUnitFactorFourNameId"
					+ index
					+ "'>"
					+ r[i].itemPurchaseSlaveDto[0].uomUnitOneName
					+ " </lable></td> ";
				}else{
					htm = htm	+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'style='width:60px;' value="
					+ 0
					+ " id='txtPurchaseQuotationFactorFour"
					+ index
					+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'>"
					+ "<lable id='uomUnitFactorFourNameId"
					+ index
					+ "'>"
					+ r[i].itemPurchaseSlaveDto[0].uomUnitOneName
					+ " </lable></td> ";
				}
				if((r[i].itemPurchaseSlaveDto[0].purchaseFactorUom2 != "" && r[i].itemPurchaseSlaveDto[0].purchaseFactorUom2 !=null)){
					htm = htm	+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' value="
					+ r[i].itemPurchaseSlaveDto[0].purchaseFactorUom2
					+ " id='txtPurchaseQuotationFactorThree"
					+ index
					+ "' onkeypress='return validateNumbers(event);'value='0'><lable id='uomUnitFactorThreeNameId"
					+ index
					+ "'>"
					+ r[i].itemPurchaseSlaveDto[0].uomUnitTwoName
					+ " </lable></td> ";
				}else{
					htm = htm	+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' value="
					+ 0
					+ " id='txtPurchaseQuotationFactorThree"
					+ index
					+ "' onkeypress='return validateNumbers(event);'value='0'><lable id='uomUnitFactorThreeNameId"
					+ index
					+ "'>"
					+ r[i].itemPurchaseSlaveDto[0].uomUnitTwoName
					+ " </lable></td> ";
				}
				if((r[i].itemPurchaseSlaveDto[0].purchaseFactorUom3 != "" && r[i].itemPurchaseSlaveDto[0].purchaseFactorUom3 !=null)){
					htm = htm	+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' value="
					+ r[i].itemPurchaseSlaveDto[0].purchaseFactorUom3
					+ " id='txtPurchaseQuotationFactorTwo"
					+ index
					+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0' ><lable id='uomUnitFactorTwoNameId"
					+ index
					+ "'>"
					+ r[i].itemPurchaseSlaveDto[0].uomUnitThreeName
					+ " </lable></td> ";
				}else {
					htm = htm	+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' value="
					+ 0
					+ " id='txtPurchaseQuotationFactorTwo"
					+ index
					+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0' ><lable id='uomUnitFactorTwoNameId"
					+ index
					+ "'>"
					+ r[i].itemPurchaseSlaveDto[0].uomUnitThreeName
					+ " </lable></td> ";
				}
				if((r[i].itemPurchaseSlaveDto[0].purchaseFactorUom4 != "" && r[i].itemPurchaseSlaveDto[0].purchaseFactorUom4 !=null)){
					htm = htm	+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);' value="
					+ r[i].itemPurchaseSlaveDto[0].purchaseFactorUom4
					+ " id='txtPurchaseQuotationFactorOne"
					+ index
					+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'><lable id='uomUnitFactorOneNameId"
					+ index
					+ "'>"
					+ r[i].itemPurchaseSlaveDto[0].uomUnitFourName
					+ " </lable></td> ";
				}else{
					htm = htm	+ "<td><input type='text' disabled='disabled' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);' value="
					+ 0
					+ " id='txtPurchaseQuotationFactorOne"
					+ index
					+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'><lable id='uomUnitFactorOneNameId"
					+ index
					+ "'>"
					+ r[i].itemPurchaseSlaveDto[0].uomUnitFourName
					+ " </lable></td> ";
				}
				htm = htm	+ " <td><input type='text' disabled='disabled' class='form-control input-SmallText' value="
					+ 0
					+ " id='txtPurchaseQuotationActualQuantity"
					+ index
					+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
					+ "<td style='display:none'><input type='text' disabled='disabled' class='form-control input-SmallText'  value="
					+ 0
					+ "  id='txtPurchaseQuotationPendingQuantity"
					+ index
					+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "

					+ "<td style='display:none;' ><input type='text' disabled='disabled' class='form-control input-SmallText'  value="
					+ r[i].hsnName
					+ "  id='hsnName"
					+ index
					+ "'' style='width:60px;'></td> " 
					+ " <td> <input type='checkbox' class='chkMrnItem' checked='checked' name='checkbox' id='isreordered"
					+ index
					+ "' value='"+r[i].isReordered+"' onclick='removeDisabledRow("+index+")'/></td> ";
					+ " </tr>";
				}else{
					htm = htm
					+ "<tr id='deleterow' class='newAdded'> <td> <input type='checkbox' class='chkMrnItem'   name='checkbox' id='checkbox"
					+ index
					+ "'/></td><td>"
					+ index
					+ "  <input type='hidden' id='rowcountid"
					+ index
					+ "' value ="
					+ index
					+ "> </td>"

					+ " <td style='display:none'><div><input type='hidden' value='0' id='itemSlaveId"+ index+ "'></div></td> "

					+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text' style='text-align:left;width:250px;' "
					+ "class='typeahead form-control input-SmallText' value='"
					+ r[i].itemName
					+ "' id='txtPurchaseQuotationItemName_"
					+ index
					+ "' data-name='purchaseReOrderModule' />"
					+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
					+ index
					+ "' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
					+ index
					+ "' value=''/><input type='hidden'  id='itemMasterId"
					+ index
					+ "' value='"
					+ r[i].id
					+ "'/></div></td> "

					// added HSN ID here
					+ "<td style='display:none'><input type='text' disabled='disabled' value="
					+ r[i].hsnName
					+ " class='form-control input-SmallText' id='hsnCodePurchaseOrder"
					+ index
					+ "'  style='width:90px;'></td>"

					// added HSN Name here
					+ "<td><input type='text' disabled='disabled' value='"
					+ r[i].hsnNameValue
					+ "' class='form-control input-SmallText' id='hsnCodeNamePurchaseOrder"
					+ index
					+ "'  style='width:90px;'></td>"

					+ "<td><input type='text' class='form-control input-SmallText' value="
					+ r[i].currentSubInventoryStock
					+ " id='txtPurchaseQuotationDocQuantity"
					+ index
					+ "' onkeyup='totalAmount(this.id,"
					+ index
					+ ")' onkeypress='return validateNumbers(event);' style='width:60px;' ><label id='txtPurchaseQuotationLastFactorUOM"
					+ rowCount
					+ "' ></label></td> ";
					if((r[i].itemPurchaseSlaveDto[0].purchaseFactorUom1 != 0 && r[i].itemPurchaseSlaveDto[0].purchaseFactorUom2 == 0)){
						if(parseInt(unit1) != 0 && parseInt(unit2) == 0){
							htm = htm	+ "<td><input type='text'  class='form-control input-SmallText' value="
								+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice1
								+ " id='txtPurchaseQuotationUnitPrice"
								+ index
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
								+ index
								+ "'>"
								+ r[i].itemPurchaseSlaveDto[0].uomUnitOneName
								+ " </lable></td>" + "";
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) == 0 && parseInt(unit4) == 0){
							htm = htm	+ "<td><input type='text'  class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice2
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitTwoName
							+ " </lable></td>" + "";
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) == 0){
							htm = htm	+ "<td><input type='text'  class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice3
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitThreeName
							+ " </lable></td>" + "";
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) != 0){
							
							htm = htm	+ "<td><input type='text'  class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice4
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitFourName
							+ " </lable></td>" + "";
						}else{
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' value='0' id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>NA</lable></td>" + "";	
							//alert("Please check unit price should be greater than 0 for "+r[i].itemName+" in item master");
						}
					}else if((r[i].itemPurchaseSlaveDto[0].purchaseUomFactor2 != 0 && r[i].itemPurchaseSlaveDto[0].purchaseUomFactor1 != 0 &&
							r[i].itemPurchaseSlaveDto[0].purchaseUomFactor3 == 0 &&
							r[i].itemPurchaseSlaveDto[0].purchaseUomFactor4 == 0)){
						if(parseInt(unit1) != 0 && parseInt(unit2) == 0){
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice1
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitOneName
							+ " </lable></td>" + "";
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) == 0 && parseInt(unit4) == 0){
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice2
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitTwoName
							+ " </lable></td>" + "";
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) == 0){
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice3
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitThreeName
							+ " </lable></td>" + "";
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) != 0){
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice4
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitFourName
							+ " </lable></td>" + "";
						}else{
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' value='0' id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>NA</lable></td>" + "";	
							//alert("Please check unit price should be greater than 0 for "+r[i].itemName+" in item master");
						}
					}else if((r[i].itemPurchaseSlaveDto[0].purchaseUomFactor3 != 0 && r[i].itemPurchaseSlaveDto[0].purchaseUomFactor2 != 0 &&
							r[i].itemPurchaseSlaveDto[0].purchaseUomFactor1 != 0 &&
							r[i].itemPurchaseSlaveDto[0].purchaseUomFactor4 == 0)){
						
						if(parseInt(unit1) != 0 && parseInt(unit2) == 0){
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice1
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitOneName
							+ " </lable></td>" + "";	
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) == 0 && parseInt(unit4) == 0){
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice2
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitTwoName
							+ " </lable></td>" + "";	
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) == 0){
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice3
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitThreeName
							+ " </lable></td>" + "";	
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) != 0){
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice4
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitFourName
							+ " </lable></td>" + "";	
						}else{
							
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' value='0' id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>NA</lable></td>" + "";		
							//alert("Please check unit price should be greater than 0 for "+r[i].itemName+" in item master");
						}
					}else if((r[i].itemPurchaseSlaveDto[0].purchaseUomFactor4 != 0 &&
							r[i].itemPurchaseSlaveDto[0].purchaseUomFactor3 != 0 &&
							r[i].itemPurchaseSlaveDto[0].purchaseUomFactor2 != 0 &&
							r[i].itemPurchaseSlaveDto[0].purchaseUomFactor1 != 0)) {
						if(parseInt(unit1) != 0 && parseInt(unit2) == 0){
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice1
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitOneName
							+ " </lable></td>" + "";	
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) == 0 && parseInt(unit4) == 0){
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice2
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitTwoName
							+ " </lable></td>" + "";	
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) == 0){
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice3
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitThreeName
							+ " </lable></td>" + "";	
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) != 0){
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' value="
							+ r[i].itemPurchaseSlaveDto[0].purchaseUnitPrice4
							+ " id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>"
							+ r[i].itemPurchaseSlaveDto[0].uomUnitFourName
							+ " </lable></td>" + "";	
						}else{
							htm = htm + "<td><input type='text'  class='form-control input-SmallText' value='0' id='txtPurchaseQuotationUnitPrice"
							+ index
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"
							+ index
							+ "'>NA</lable></td>" + "";	
							//alert("Please check unit price should be greater than 0 for "+r[i].itemName+" in item master");
						}
					}
				htm = htm
						+ " <td><input type='text' class='form-control input-SmallText'  value="
						+ 0
						+ " onblur='calculTradeDis(this.id,"
						+ index
						+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
						+ index
						+ "'  onkeyup='chkTradAmtorPercentage(this.id,"
						+ index
						+ ")' onkeypress='return validateNumbers(event);' ></td> ";
				htm = htm   
						+ "<td><input type='text' class='form-control input-SmallText'  onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"
						+ index
						+ ")' id='txtPurchaseQuotationTrdeDiscountInRupess"
						+ index + "'  style='width:60px;' ></td>"
				htm = htm
					+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationTrdeDiscountAmt"
					+ index
					+ "' onkeypress='return validateNumbers(event);'   style='width:60px;'></td>"
					+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
					+ index
					+ "' onkeypress='return validateNumbers(event);' style='width:100px;' ></td>";
				
				if (supplierState == userState) {
					htm = htm	+ "<td><input type='text' class='typeahead form-control input-SmallText' value="
					+ r[i].taxRate 
					+ " autocomplete='off'  id='txtPurchaseQuotationTaxCodePO_"
					+ index
					+ "' onkeyup='calculateGSTWisePurchaseOrder(this.id,"
					+ index
					+ ");calculateTotalItemAmountPurchaseOrder("
					+ index
					+ ");calculateTotalItemgstAmountPurchaseOrder("
					+ index + ");autotaxCodeforItemGstPurchaseOrder("+ index + "," + index+ ",this.id);' rowAmtCalNEWForGstPurchaseOrder(this.id,"+ index + ");'   style='width:80px;'></td>";
					
					htm = htm
					+ " <td><input type='text' class='typeahead form-control input-SmallText' disabled value='0' onkeyup='calculateIGSTWisePurchaseOrder(this.id,"
					+ index
					+ ");calculateTotalItemAmountPurchaseOrder("
					+ index
					+ ");calculateTotalItemigstAmountPurchaseOrder("
					+ index
					+ ");autotaxCodeforItemigstPurchaseOrder("+ index + "," + index + ",this.id);' value="
					+ r[i].taxRate 
					+ " id='txtPurchaseQuotationTaxAmount_"
					+ index
					+ "'   style='width:80px;'  autocomplete='off' ></td> ";
					
				}else{
					htm = htm	+ "<td><input type='text' class='typeahead form-control input-SmallText' value='"+r[i].taxRate+"' autocomplete='off'  id='txtPurchaseQuotationTaxCodePO_"
					+ index
					+ "' onkeyup='calculateGSTWisePurchaseOrder(this.id,"
					+ index
					+ ");calculateTotalItemAmountPurchaseOrder("
					+ index
					+ ");calculateTotalItemgstAmountPurchaseOrder("
					+ index + ");autotaxCodeforItemGstPurchaseOrder("+ index + "," + index+ ",this.id);' rowAmtCalNEWForGstPurchaseOrder(this.id,"+ index + ");' style='width:80px;'></td>";
					
					htm = htm
					+ " <td><input type='text' class='typeahead form-control input-SmallText' disabled value='0' onkeyup='calculateIGSTWisePurchaseOrder(this.id,"
					+ index
					+ ");calculateTotalItemAmountPurchaseOrder("
					+ index
					+ ");calculateTotalItemigstAmountPurchaseOrder("
					+ index
					+ ");autotaxCodeforItemigstPurchaseOrder("+ index + "," + index + ",this.id);' value="
					+ r[i].taxRate 
					+ " id='txtPurchaseQuotationTaxAmount_"
					+ index
					+ "'   style='width:80px;'  autocomplete='off' ></td> ";
				}

			// below is the IGST total amount
				if (supplierState == userState) {	
					htm = htm
							+ "<td><input type='text' class='form-control input-SmallText' value="
							+ 0
							+ " style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
							+ index + "'></td> ";
					htm = htm
					+ "<td><input type='text' disabled class='form-control input-SmallText' disabled value="
					+ 0
					+ " style='width:100px;' id='igstAmtId"
					+ index + "'   ></td> ";
					
				}else{
					
					htm = htm
					+ "<td><input type='text' disabled class='form-control input-SmallText' value="
					+ 0
					+ " style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
					+ index + "'></td> ";
					htm = htm
					+ "<td><input type='text' class='form-control input-SmallText' disabled value="
					+ 0
					+ " style='width:100px;' id='igstAmtId"
					+ index + "'   ></td> ";
					
				}
			
				
			htm = htm
					+ "<td><input type='text' class='form-control input-SmallText' value='0' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationRowAmount"
					+ index +"' style='width:100px;'></td>";
				
				if((r[i].itemPurchaseSlaveDto[0].purchaseFactorUom1 != "" && r[i].itemPurchaseSlaveDto[0].purchaseFactorUom1 !=null)){
					htm = htm	+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'style='width:60px;' value="
					+ r[i].itemPurchaseSlaveDto[0].purchaseFactorUom1
					+ " id='txtPurchaseQuotationFactorFour"
					+ index
					+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'>"
					+ "<lable id='uomUnitFactorFourNameId"
					+ index
					+ "'>"
					+ r[i].itemPurchaseSlaveDto[0].uomUnitOneName
					+ " </lable></td> ";
				}else{
					htm = htm	+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'style='width:60px;' value="
					+ 0
					+ " id='txtPurchaseQuotationFactorFour"
					+ index
					+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'>"
					+ "<lable id='uomUnitFactorFourNameId"
					+ index
					+ "'>"
					+ r[i].itemPurchaseSlaveDto[0].uomUnitOneName
					+ " </lable></td> ";
				}
				if((r[i].itemPurchaseSlaveDto[0].purchaseFactorUom2 != "" && r[i].itemPurchaseSlaveDto[0].purchaseFactorUom2 !=null) ){
					htm = htm	+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' value="
					+ r[i].itemPurchaseSlaveDto[0].purchaseFactorUom2
					+ " id='txtPurchaseQuotationFactorThree"
					+ index
					+ "' onkeypress='return validateNumbers(event);'value='0'><lable id='uomUnitFactorThreeNameId"
					+ index
					+ "'>"
					+ r[i].itemPurchaseSlaveDto[0].uomUnitTwoName
					+ " </lable></td> ";
				}else{
					htm = htm	+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' value="
					+ 0
					+ " id='txtPurchaseQuotationFactorThree"
					+ index
					+ "' onkeypress='return validateNumbers(event);'value='0'><lable id='uomUnitFactorThreeNameId"
					+ index
					+ "'>"
					+ r[i].itemPurchaseSlaveDto[0].uomUnitTwoName
					+ " </lable></td> ";
				}
				if((r[i].itemPurchaseSlaveDto[0].purchaseFactorUom3 != "" && r[i].itemPurchaseSlaveDto[0].purchaseFactorUom3 !=null )){
					htm = htm	+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' value="
					+ r[i].itemPurchaseSlaveDto[0].purchaseFactorUom3
					+ " id='txtPurchaseQuotationFactorTwo"
					+ index
					+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0' ><lable id='uomUnitFactorTwoNameId"
					+ index
					+ "'>"
					+ r[i].itemPurchaseSlaveDto[0].uomUnitThreeName
					+ " </lable></td> ";
				}else {
					htm = htm	+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' value="
					+ 0
					+ " id='txtPurchaseQuotationFactorTwo"
					+ index
					+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0' ><lable id='uomUnitFactorTwoNameId"
					+ index
					+ "'>"
					+ r[i].itemPurchaseSlaveDto[0].uomUnitThreeName
					+ " </lable></td> ";
				}
				if((r[i].itemPurchaseSlaveDto[0].purchaseFactorUom4 != "" && r[i].itemPurchaseSlaveDto[0].purchaseFactorUom4 !=null)){
					htm = htm	+ "<td><input type='text' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);' value="
					+ r[i].itemPurchaseSlaveDto[0].purchaseFactorUom4
					+ " id='txtPurchaseQuotationFactorOne"
					+ index
					+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'><lable id='uomUnitFactorOneNameId"
					+ index
					+ "'>"
					+ r[i].itemPurchaseSlaveDto[0].uomUnitFourName
					+ " </lable></td> ";
				}else{
					htm = htm	+ "<td><input type='text' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);' value="
					+ 0
					+ " id='txtPurchaseQuotationFactorOne"
					+ index
					+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'><lable id='uomUnitFactorOneNameId"
					+ index
					+ "'>"
					+ r[i].itemPurchaseSlaveDto[0].uomUnitFourName
					+ " </lable></td> ";
				}
				htm = htm	+ " <td><input type='text' class='form-control input-SmallText' value="
					+ 0
					+ " id='txtPurchaseQuotationActualQuantity"
					+ index
					+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
					+ "<td style='display:none'><input type='text' class='form-control input-SmallText'  value="
					+ 0
					+ "  id='txtPurchaseQuotationPendingQuantity"
					+ index
					+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
					+ "<td style='display:none;' ><input type='text' class='form-control input-SmallText'  value="
					+ r[i].hsnName
					+ "  id='hsnName"
					+ index
					+ "'' style='width:60px;'></td> "
					+ " <td> <input type='checkbox' class='chkMrnItem' name='checkbox' id='isreordered"
					+ index
					+ "' value='"+r[i].isReordered+"' onclick='removeDisabledRow("+index+")'/></td> ";
					+ " </tr>";
				}
				
				index++;
				$("#itemInfoDetails").html(htm);
			}
			document.getElementById("primeLoader").style.display = "none";
		}
	});
}

function removeDisabledRow(index){
	var rowsPurchaseReOrderItemSlave = $('#ItemInfoTablePO tbody tr.newAdded').length;
	
	for ( var i = 1; i <= rowsPurchaseReOrderItemSlave; i++) {
		if(i == index){
			 $("#itemSlaveId" + i).prop('disabled', false);
			 $("#itemMasterId" + i).prop('disabled', false);
			 $("#txtPurchaseQuotationItemName_" + i).prop('disabled', false);
			 $("#txtPurchaseQuotationDocQuantity" + i).prop('disabled', false);
			 $("#txtPurchaseQuotationUnitPrice" + i).prop('disabled', false);
			 $("#txtPurchaseQuotationTrdeDiscountPercentage" + i).prop('disabled', false);
			 $("#txtPurchaseQuotationTrdeDiscountInRupess" + i).prop('disabled', false);
			 $("#txtPurchaseQuotationTrdeDiscountAmt" + i) .prop('disabled', false);
			 $("#txtPurchaseQuotationBaseAmount" + i) .prop('disabled', false);
			 $("#txtPurchaseQuotationTaxCodePO_" + i) .prop('disabled', false);
			 $("#txtPurchaseQuotationTaxAmount_" + i) .prop('disabled', false);
			 $("#txtPurchaseOrderTaxAmtinRs" + i) .prop('disabled', false);
			 $("#igstAmtId" + i) .prop('disabled', false);
			 $("#txtPurchaseQuotationRowAmount" + i) .prop('disabled', false);
			 $("#txtPurchaseQuotationFactorOne" + i) .prop('disabled', false);
			 $("#txtPurchaseQuotationFactorTwo" + i) .prop('disabled', false);
			 $("#txtPurchaseQuotationFactorThree" + i) .prop('disabled', false);
			 $("#txtPurchaseQuotationFactorFour" + i) .prop('disabled', false);
			 $("#txtPurchaseQuotationActualQuantity" + i) .prop('disabled', false);
			 $("#txtPurchaseQuotationPendingQuantity" + i) .prop('disabled', false);
			 $("#hsnCodePurchaseOrder" + i) .prop('disabled', false);
			 $("#hsnCodeNamePurchaseOrder" + i) .prop('disabled', false);
			 $("#uomUnitLatestFactorId" + i).text();
			 $("#uomUnitFactorOneNameId" + i).text();
			 $("#uomUnitFactorTwoNameId" + i).text();
			 $("#uomUnitFactorThreeNameId" + i).text();
			 $("#uomUnitFactorFourNameId" + i).text();
			 $("#assetItemManufactureId" + i) .prop('disabled', false);
			 $("#assetAmcValId" + i) .prop('disabled', false);
			 $("#assetPmValId" + i) .prop('disabled', false);
			 $("#assetAmcYearId" + i) .prop('disabled', false);
			 $("#assetPmYearId" + i) .prop('disabled', false);
			 $("#assetProductWarrantyId" + i) .prop('disabled', false);
			 $("#assetProductCategory" + i) .prop('disabled', false);
			 $("#labEquipmentItemStatusId" + i) .prop('disabled', false);
			 $("#reagentItemStatusId" + i) .prop('disabled', false);
			 $("#assetItemStatusId" + i) .prop('disabled', false);
			 $("#isItemBatchWiseId" + i) .prop('disabled', false);
		}
	}
}


/**
 * @since 23-03-2020
 * @comment
 * @author Vishnu Thorat
 * @param id
 * @param rowCount
 * @returns {Boolean}
 */
function calculateGSTWisePurchaseOrder(id, rowCount) {
	var matches = id.match(/(\d+)/);
	if(matches[0] != rowCount){
		rowCount = matches[0];
	}
	var taxAmt = $("#txtPurchaseQuotationTaxCodePO_" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(' ');
		// $('#itemTotalAmount' + rowCount).val(' ');
		return false;
	}
	var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
	if (baseAmt == " " || baseAmt == null) {
		$("#txtPurchaseQuotationRowAmount" + rowCount).val(' ');
		// $("#itemTotalAmount").val(' ');
		return false;
	} else {
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#txtPurchaseQuotationRowAmount' + rowCount).val();
		var taxAmt = $("#txtPurchaseQuotationTaxCodePO_" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$("#txtPurchaseOrderTaxAmtinRs" + rowCount).val(finalcaltaxanmount);
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmountAddingtax = finalsumofRowAmt.toFixed(2);
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(
				finalRowAmountAddingtax);
		// $('#itemTotalAmount' + rowCount).val(finalRowAmountAddingtax);
	}

}

function editContactInfoPartyMasterOnPO(id, callFrom) {
	var rows = $('#contactInfoTablePurchaseOrder tbody tr.newAdded').length;

	for ( var i = 1; i <= rows; i++) {
		var conInfoId = $("#conInfoId" + i).text();
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

function updateContactInfoPartyMasterOnPO() {

	var rows = $('#contactInfoTablePurchaseOrder tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updateContactInfo").attr('updateContactInfoId');

		if (id == i) {
			$("#contactInfoId" + i).html($("#contactInfoId").val());
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
	document.getElementById("saveContactInfo").style.visibility = "visible";
	$('#contactFormId')[0].reset();
}

function editAddressInfoPartyMasterOnPO(id, callFrom) {
	var rows = $('#addressInfoTablePurchaseOrder tbody tr.newAdded').length;

	for ( var i = 1; i <= rows; i++) {
		var addressInfoId = $("#addressInfoId1" + i).text();
		var addInfoId = $("#addInfoId" + i).text();
		var addInfoIdAdd = $("#addressInfoId" + i).text();

		if (id == addressInfoId || id == addInfoIdAdd) {
			$("#addInfoIdNew").val($("#addressInfoId" + id).html());
			$("#companyNameFromAddress").val($("#companyNameId" + id).html());

			$("#countryFromAddress").select2('val',
					$("#hiddenCountryNameId" + id).html());

			$("#stateFromAddress").select2('val',
					$("#hiddenStateNameId" + id).html());
			getAllDistrictByStateId('stateFromAddress');

			$("#districtFromAddress").select2('val',
					$("#hiddenDistrictNameId" + id).html());
			getAllTalukaBydDistictId('districtFromAddress');
			$("#talukaFromAddress").select2('val',
					$("#hiddenTalukaNameId" + id).html());
			getAllCityByTalukaId('talukaFromAddress');
			$("#cityFromAddress").select2('val',
					$("#hiddenCityNameId" + id).html());

			$("#streetFromAddress").val($("#companyStreetId" + id).html());
			$("#pincodeFromAddress").val($("#companyPinId" + id).html());
			$("#areaFromAddress").val($("#companyAreaId" + id).html());
			$("#addressFromAddress").val($("#companyAddressId" + id).html());

			$("#hiddenCountryFromPartyMaster").val(
					$("#companyCountryId" + id).html());
			$("#hiddenStateFromPartyMaster").val(
					$("#companyStateId" + id).html());
			$("#hiddenDistrictFromPartyMaster").val(
					$("#companyDistrictId" + id).html());
			$("#hiddenTalukaFromPartyMaster").val(
					$("#companyTalukaId" + id).html());
			$("#hiddenCityFromPartyMaster")
					.val($("#companyCityId" + id).html());

			if ($("#companyAddressTypeId" + id).html() === "ShippingAddress") {
				$("#shippingAddress").val(
						$("#companyAddressTypeId" + id).html());
			} else {
				$("#billingAddress")
						.val($("#companyAddressTypeId" + id).html());
			}
			$("#updateAddressInfo").attr('updateAddressInfoId', addressInfoId);
			// $("#saveAddressInfo").hide();
			// $("#updateAddressInfo").show();
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

function updateAddressInfoPartyMasterOnPO() {
	var rows = $('#addressInfoTablePurchaseOrder tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updateAddressInfo").attr('updateAddressInfoId');
		if (i == id) {
			$("#addressInfoId" + i).html($("#addInfoIdNew").val());
			$("#companyNameId" + i).html($("#companyNameFromAddress").val());
			$("#hiddenCountryNameId" + i).html($("#countryFromAddress").val());
			$("#hiddenStateNameId" + i).html($("#stateFromAddress").val());
			$("#hiddenDistrictNameId" + i)
					.html($("#districtFromAddress").val());
			$("#hiddenTalukaNameId" + i).html($("#talukaFromAddress").val());
			$("#hiddenCityNameId" + i).html($("#cityFromAddress").val());

			$("#companyCountryId" + i).html(
					$("#hiddenCountryFromPartyMaster").val());
			$("#companyStateId" + i).html(
					$("#hiddenStateFromPartyMaster").val());
			$("#companyDistrictId" + i).html(
					$("#hiddenDistrictFromPartyMaster").val());
			$("#companyTalukaId" + i).html(
					$("#hiddenTalukaFromPartyMaster").val());
			$("#companyCityId" + i).html($("#hiddenCityFromPartyMaster").val());

			$("#companyAddressId" + i).html($("#addressFromAddress").val());
			$("#companyStreetId" + i).html($("#streetFromAddress").val());
			$("#companyPinId" + i).html($("#pincodeFromAddress").val());
			$("#companyAreaId" + i).html($("#areaFromAddress").val());

			if ($("#shippingAddress").val() === "ShippingAddress") {
				$("#companyAddressTypeId" + i)
						.html($("#shippingAddress").val());
			} else {
				$("#companyAddressTypeId" + i).html($("#billingAddress").val());
			}
			document.getElementById("saveAddressInfo").style.visibility = "visible";
			$("#saveAddressInfo").show();
			$("#updateAddressInfo").hide();
		}
	}
	resetInfoFields('addressInfo');
}

function getMasterTermsAndConditionOnPO() {
	var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/inventoryM/getAllInventoryTermAndCondition",
				error : function() {
					alert('error');
				},
				success : function(r) {
					var divContent = "";
					divContent = divContent
							+ "<select name='room Name' id='termsAndConditionsTitle' class='col-md-12'><option value='0'>---Select---</option>";

					for ( var i = 0; i < r.lsttermcondition.length; i++) {
						divContent = divContent + "<option value='"
								+ r.lsttermcondition[i].termConditionId
								+ "'  >" + r.lsttermcondition[i].headingName
								+ "</option>";
					}
					divContent = divContent + "</select>";
					$("#termsAndConditionsTitle").html(divContent);
					$("#termsAndConditionsTitle").select2();
				}
			});
}

function getTermConditionMasterOnPO(termconditionId) {
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
			$("#updateTermsAndConditionInfo").attr('updatetermsAndCondInfoId',
					r.termConditionId);
		}
	});
}

// this is for terms and Conditions info edit
function editTermsAndConditionInfoPartyMasterOnPO(id) {
	getTermConditionMaster(id);
	$("#saveTermsAndConditionInfo").hide();
	$("#updateTermsAndConditionInfo").show();
}
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 24-03-2020
 * @codeFor : calcultae total item amount with igst_gst_base amount of all item
 *          for purchase order
 ******************************************************************************/
function calculateTotalItemAmountPurchaseOrder(id) {
	var tableLengt = $('#ItemInfoTablePO tbody tr.newAdded').length;
	var totalGstAMt = 0;
	for ( var i = 1; i <= tableLengt; i++) {
		var totalAmt = $("#txtPurchaseQuotationRowAmount" + i).val();
		totalGstAMt = parseFloat(totalGstAMt) + parseFloat(totalAmt);
	}
	$("#itemTotalAmt").val(totalGstAMt);
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 24-03-2020
 * @codeFor : this function calculate total gst amount of all item after remove
 *          row on purchase order
 ******************************************************************************/
function calculateTotalItemgstAmountAfterRemoveRowPurchaseOrder(id) {
	var tableLengt = $('#ItemInfoTablePO tbody tr.newAdded').length;
	var totalGstAMt = 0;
	for ( var i = 1; i <= tableLengt; i++) {

		var itemGstAmt = $("#txtPurchaseOrderTaxAmtinRs" + i).val();

		totalGstAMt = parseFloat(totalGstAMt) + parseFloat(itemGstAmt);

	}

	$("#totalGstAmt").val(totalGstAMt);
	$("#taxVatId").val(totalGstAMt);// set total gst after remove the row it
	//set otal tax amount added by Vishnu Thorat 06-07-2020
	$("#taxTotalTaxesId").val(totalGstAMt);
	// shows total gst of present row
	document.getElementById("grossTaxesId").value = totalGstAMt;
	document.getElementById("txtTotalVat").value = totalGstAMt;
	
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 24-03-2020
 * @codeFor : this function calculate total gst amount of all item on purchase
 *          order
 ******************************************************************************/
function calculateTotalItemgstAmountPurchaseOrder(id) {
	var tableLengt = $('#ItemInfoTablePO tbody tr.newAdded').length;
	var totalGstAMt = 0;
	for ( var i = 1; i <= tableLengt; i++) {
		var itemGstAmt = $("#txtPurchaseOrderTaxAmtinRs" + i).val();
		totalGstAMt = parseFloat(totalGstAMt) + parseFloat(itemGstAmt);
	}
	$("#totalGstAmt").val(totalGstAMt);
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 24-02-2020
 * @codeFor : this function calculate total igst amount of all item on purchase
 *          order
 ******************************************************************************/
function calculateTotalItemigstAmount() {
	var tableLengt = $('#ItemInfoTablePO tbody tr.newAdded').length;
	var totalGstAMt = 0;
	for ( var i = 1; i <= tableLengt; i++) {
		var itemGstAmt = $("#igstAmtId" + i).val();
		totalGstAMt = parseFloat(totalGstAMt) + parseFloat(itemGstAmt);
	}
	$("#totaliGstAmt").val(totalGstAMt);
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 24-02-2020
 * @codeFor :autotaxCodeforItemGst added for applying total gst calculation on
 *          purchase order
 ******************************************************************************/
function autotaxCodeforItemGstPurchaseOrder(rowCount, onchange,id) {
	var matches = id.match(/(\d+)/);
	if(matches[0] != rowCount){
		rowCount = matches[0];
	}
	var gstId = $("#txtPurchaseQuotationTaxCodePO_" + rowCount).val();
	applyTaxforItemexpenseOfGstAmtPurchaseOrder(gstId, rowCount);
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 24-03-2020
 * @codeFor :applyTaxforItemexpenseOfGstAmtPurchaseOrder added for applying
 *          total gst calculation on purchase order
 ******************************************************************************/
function applyTaxforItemexpenseOfGstAmtPurchaseOrder(inputID, rowCount1) {
	var Finalrateandtax = inputID;
	var sumofRate = 0;
	sumofRate = parseFloat(sumofRate) + parseFloat(Finalrateandtax);
	var rowCount = "onchange";
	if (rowCount == "var rowCount1") {
		$("#txtPurchaseQuotationTaxCodePO_" + rowCount1).val(sumofRate);

	} else {
		$("#txtPurchaseQuotationTaxCodePO_" + rowCount1).val(sumofRate);
	}

	rowAmtCalNEWForGstPurchaseOrder(1, rowCount1);
	totalVatAmtnEWForGStPurchaseOrder(1, rowCount1);

}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 24-03-2020
 * @codeFor :rowAmtCalNEWForGst added for applying total gst calculation for
 *          purchase order
 ******************************************************************************/
function rowAmtCalNEWForGstPurchaseOrder(id, rowCount) {
	var taxAmt = $("#txtPurchaseQuotationTaxCodePO_" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#txtPurchaseQuotationRowAmount' + rowCount).val('');
	}
	var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
	if (baseAmt == " " || baseAmt == null) {
		$("#txtPurchaseQuotationRowAmount" + rowCount).val(' ');
		return false;
	} else {
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
		var taxAmt = $("#txtPurchaseQuotationTaxCodePO_" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$('#txtPurchaseOrderTaxAmtinRs' + rowCount).val(finalcaltaxanmount);
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmtcalculationgTax = finalsumofRowAmt.toFixed(2);
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(
				finalRowAmtcalculationgTax);
	}
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 24-03-2020
 * @codeFor :totalVatAmtnEWForGSt added for applying total gst calculation for
 *          purchase order
 ******************************************************************************/
function totalVatAmtnEWForGStPurchaseOrder(id, rowCount) {
	var sum = 0;
	var baseAmount;
	var totalgrossAmt;
	var RowCount = $("#RowCount").val();
	var caltaxonBaseAmt;
	// var totalRow = $("#totalRow").val();
	var totaltblsize = $("#totaltblsize").val();
	for ( var i = 1; i <= totaltblsize; i++) {
		var checkbox = $('#checkbox'+i+':checkbox:checked').length;
		if(checkbox > 0){
			baseAmount = $("#txtPurchaseQuotationBaseAmount" + i).val();
			var taxAmt = $("#txtPurchaseQuotationTaxCodePO_" + i).val();
			if (baseAmount == null || taxAmt == null || taxAmt == undefined
					|| taxAmt == '' || baseAmount == undefined || baseAmount == '') {
				var flag = 1;
			} else {
				caltaxonBaseAmt = parseFloat(baseAmount) * parseFloat(taxAmt) / 100;
				var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
				sum = parseFloat(sum) + parseFloat(finalcaltaxanmount);
				
			}
			totalgrossAmt = $("#grossAmountId").val();
		}
	}
	$("#taxVatId").val(sum.toFixed(2));
	$("#taxTotalTaxesId").val(sum.toFixed(2));
	$("#grossTaxesId").val(sum.toFixed(2));
	
	$("#grossNetAmountId").val(
			(parseFloat(sum) + parseFloat(totalgrossAmt)).toFixed(2));

}

/**
 * @since 23-03-2020
 * @comment
 * @author Vishnu Thorat
 * @param id
 * @param rowCount
 * @returns {Boolean}
 */
function calculateIGSTWisePurchaseOrder(id, rowCount) {
	var taxAmt = $("#txtPurchaseQuotationTaxAmount_" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(' ');
		return false;
	}
	var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
	if (baseAmt == " " || baseAmt == null) {
		$("#txtPurchaseQuotationRowAmount" + rowCount).val(' ');
		return false;
	} else {
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
		var taxAmt = $("#txtPurchaseQuotationTaxAmount_" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$("#igstAmtId" + rowCount).val(finalcaltaxanmount); // add tax amount in
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmountAddingtax = finalsumofRowAmt.toFixed(2);
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(
				finalRowAmountAddingtax);
	}

}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 24-03-2020
 * @codeFor : this function calculate total igst amount of all item on purchase
 *          order
 ******************************************************************************/
function calculateTotalItemigstAmountPurchaseOrder(id) {
	var tableLengt = $('#ItemInfoTablePO tbody tr.newAdded').length;
	var totalGstAMt = 0;
	for ( var i = 1; i <= tableLengt; i++) {
		var itemGstAmt = $("#igstAmtId" + i).val();
		totalGstAMt = parseFloat(totalGstAMt) + parseFloat(itemGstAmt);
	}
	$("#totaliGstAmt").val(totalGstAMt);
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 24-02-2020
 * @codeFor :autotaxCodeforItemGst added for applying total igst calculation on
 *          purchase order
 ******************************************************************************/
function autotaxCodeforItemigstPurchaseOrder(rowCount, onchange,id) {
	var matches = id.match(/(\d+)/);
	if(matches[0] != rowCount){
		rowCount = matches[0];
	}
	var gstId = $("#txtPurchaseQuotationTaxAmount_" + rowCount).val();
	applyTaxforItemexpenseOfIgstAmtPurchaseOrder(gstId, rowCount);
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 24-03-2020
 * @codeFor :applyTaxforItemexpenseOfGstAmtPurchaseOrder added for applying
 *          total igst calculation on purchase order
 ******************************************************************************/
function applyTaxforItemexpenseOfIgstAmtPurchaseOrder(inputID, rowCountNew) {
	var Finalrateandtax = inputID;
	var sumofRate = 0;
	sumofRate = parseFloat(sumofRate) + parseFloat(Finalrateandtax);
	var rowCount = "onchange";
	if (rowCount == "var rowCount1") {
		$("#txtPurchaseQuotationTaxAmount_" + rowCountNew).val(sumofRate);

	} else {
		$("#txtPurchaseQuotationTaxAmount_" + rowCountNew).val(sumofRate);
	}

	rowAmtCalNEWForIgstPurchaseOrder(1, rowCountNew);
	totalVatAmtnEWForIgstPurchaseOrder(1, rowCountNew);

}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 24-03-2020
 * @codeFor :rowAmtCalNEWForGst added for applying total gst calculation for
 *          purchase order
 ******************************************************************************/
function rowAmtCalNEWForIgstPurchaseOrder(id, rowCount) {
	var taxAmt = $("#txtPurchaseQuotationTaxAmount_" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#txtPurchaseQuotationRowAmount' + rowCount).val('');
	}
	if($("#txtPurchaseQuotationTaxAmount_" + rowCount).val() == 0 && $("#txtPurchaseQuotationTaxCodePO_" + rowCount).val() > 0){
		taxAmt = 	$("#txtPurchaseQuotationTaxCodePO_" + rowCount).val();
	}else if($("#txtPurchaseQuotationTaxAmount_" + rowCount).val() > 0 && $("#txtPurchaseQuotationTaxCodePO_" + rowCount).val() == 0){
		taxAmt = 	$("#txtPurchaseQuotationTaxAmount_" + rowCount).val();
	}
	
	var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
	if (baseAmt == " " || baseAmt == null) {
		$("#txtPurchaseQuotationRowAmount" + rowCount).val(' ');
		return false;
	} else {
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
		var userState = $('#userState').val();
		var hiddenVenderState = $('#hiddenVenderStatePO').val();
		if(userState == hiddenVenderState){
			gstTaxAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
			$('#txtPurchaseOrderTaxAmtinRs' + rowCount).val(gstTaxAmt);
			$('#igstAmtId' + rowCount).val(0);
		}else{
			iGgstTaxAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
			$('#igstAmtId' + rowCount).val(iGgstTaxAmt);
			$('#txtPurchaseOrderTaxAmtinRs' + rowCount).val(0);
		}
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		//$('#txtPurchaseOrderTaxAmtinRs' + rowCount).val(finalcaltaxanmount);
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmtcalculationgTax = finalsumofRowAmt.toFixed(2);
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(
				finalRowAmtcalculationgTax);
	}
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 24-03-2020
 * @codeFor :totalVatAmtnEWForGSt added for applying total gst calculation for
 *          purchase order
 ******************************************************************************/
function totalVatAmtnEWForIgstPurchaseOrder(id, rowCount) {
	var sum = 0;
	var baseAmount;
	var RowCount = $("#RowCount").val();
	var caltaxonBaseAmt;
	var totaltblsize = $("#totaltblsize").val();
	for ( var i = 1; i <= totaltblsize; i++) {
		var checkbox = $('#checkbox'+i+':checkbox:checked').length;
		if(checkbox > 0){
			baseAmount = $("#txtPurchaseQuotationBaseAmount" + i).val();
			var taxAmt = $("#txtPurchaseQuotationTaxAmount_" + i).val();
			if (baseAmount == null || taxAmt == null || taxAmt == undefined
					|| taxAmt == '' || baseAmount == undefined || baseAmount == '') {
				var flag = 1;
			} else {
				caltaxonBaseAmt = parseFloat(baseAmount) * parseFloat(taxAmt) / 100;
				var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
				sum = parseFloat(sum) + parseFloat(finalcaltaxanmount);
			}
		}
	}
	$("#taxIgstId").val(sum.toFixed(2));
	$("#taxTotalTaxesId").val(sum.toFixed(2));
	$("#grossTaxesId").val(sum.toFixed(2));
	var totalgrossAmt = $("#grossAmountId").val();
	$("#grossNetAmountId").val(
			(parseFloat(sum) + parseFloat(totalgrossAmt)).toFixed(2));

}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 2-03-2020
 * @codeFor : this function calculate total igst amount of all item
 ******************************************************************************/
function calculateTotalItemigstAmountAfterRemoveRowPurchaseOrder() {

	var tableLengt = $('#ItemInfoTablePO tbody tr.newAdded').length;

	var totalGstAMt = 0;
	for ( var i = 1; i <= tableLengt; i++) {
		var itemGstAmt = $("#igstAmtId" + i).val();
		totalGstAMt = parseFloat(totalGstAMt) + parseFloat(itemGstAmt);
	}
	$("#totaliGstAmt").val(totalGstAMt);
	$("#taxTotalTaxesId").val(totalGstAMt);
	$("#taxIgstId").val(totalGstAMt);// set total gst after remove the row it
	// shows total gst of present row
	$("#grossTaxesId").val(totalGstAMt);// set total tax in Total Tab in UI
}

/**
 * @authr Vishnu Thorat
 * @comment Added this js function to set party master state when we click on
 *          edit purchase order module
 * @since 15-01-2021
 * @param r
 */
function setParyMasterStateToEditPurchaseReOrder(r) {
	var divContent = "";
	divContent = divContent
			+ "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";

	for ( var i = 0; i < r.partyMasterAddressInfoDto.length; i++) {
		divContent = divContent + "<option value='"
				+ r.partyMasterAddressInfoDto[i].stateId + "'>"
				+ r.partyMasterAddressInfoDto[i].state + "</option>";
	}
	divContent = divContent + "</select>";
	$("#supplierStateId").html(divContent);
	$("#supplierStateId").select2();

}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 15-01-2021
 * @codeFor : reset total amt after selecting state
 ******************************************************************************/
function resetItemTotalAmount() {
	$("#itemTotalAmt").val(0);
	$("#grossTaxesId").val(0);
	$("#taxVatId").val(0);
	$("#taxTotalTaxesId").val(0);
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date :  15-01-2021
 * @codeFor : search getPurchaseReOrderDetailsById
 ******************************************************************************/
function getPurchaseReOrderDetailsById() {
	var id = $("#searchPurchaseOrderId").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(id)) {
		alert("Please Enter Number Only!");
		$("#searchPurchaseOrderId").focus();
		return false;
	}
	var inputs = [];
	inputs.push('id=' + id);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryPurchaseReOrder/editPurchaseReOrder",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {

			if (r.supplierName == null) {
				alert("Record Not Found");
				return false;
			} else {
				setPurchaseReOrderDataToTableById(r);
			}

		}
	});

}
/**
 * 
 * @param r
 */
function setPurchaseReOrderDataToTableById(r) {
	var htm = "";
	var index = 1;

	htm = htm
			+ '<tr> '
			+ ' <td class="col-md-1 center">'
			+ index
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+ getDateTimePurchaseReOrder(r.createdDateTime)
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+ r.id
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+ r.supplierName
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#purchaseReOrderModuleModal"  onclick=editPurchaseReOrder('
			+ r.id
			+ ')><i class="fa fa-eye View"></i></button></td>';
	
			if(r.isPoUsed == "Y"){
				htm = htm + ' <td class="col-md-1 center">'
			+ '	<button disabled="disabled" class="btn btn-xs btn-danger editBodyPartMaster" onclick=deletePurchaseReOrder('
			+ r.id
			+ ')><i class="fa fa-trash-o"></i></button></td>';
			}else{
				htm = htm + ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deletePurchaseReOrder('
				+ r.id
				+ ')><i class="fa fa-trash-o"></i></button></td>';
			}
			htm = htm + ' <td class="col-md-1 center">'
			+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=printPurchaseReOrderMaster('
			+ r.id + ')><i class="fa fa-print"></i></button></td>' +

			'</tr>';
			
	index++;

	$("#purchaseReOrderTableBodyId").html(htm);
}
/**
 * @author Vishnu Thorat
 * @since 15-01-2021
 * @comment created this method to show date and time in standard format
 * @param date
 * @returns
 */
function getDateTimePurchaseReOrder(date){
	var datee;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	var hours = formattedDate.getHours();
	var minute = formattedDate.getMinutes();
	var seconds = formattedDate.getSeconds();
	datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2) + " "+ hours + ":" +('0' + minute).slice(-2)+ ":" +('0' + seconds).slice(-2);
	return datee;
}

// this is for document upload in purchase order by Vishnu

function uploadPurchaseOrderDocuments(poMasterId) {
	var form = $("#documentForm")[0];
	if (document.getElementsByName("uploadPoDocs").length == 0 || $("#uploadPoDocument").val() == "") {
		alert("Please select file");
		return false;
	}
	var poId = 0;
	if(poMasterId  !=undefined && poMasterId !=null && poMasterId !=0 && poMasterId !='undefined'){
		poId = poMasterId;
	}else{
		poId = $("#purchaseOrderId").val();	
	}
	var poDocSlaveId = $("#poDocSlaveId").val();
	var uploadPoDocument = getFileValue('uploadPoDocument');
	var uploadPoComment = $("#uploadPoComment").val();

	var poDocumentUpload = {
			lstPurchaseReOrderDocUploadDto : []
		};
	poDocumentUpload.lstPurchaseReOrderDocUploadDto.push({
		id : poDocSlaveId,
		purchaseOrderId : parseInt(poId),
		imagePath : JSON.stringify(uploadPoDocument),
		note : uploadPoComment,
	});

	var data = new FormData(form);
	data.append("documentUpload", JSON.stringify(poDocumentUpload));
	data.append("proMasterId", poId);

	jQuery.ajax({
		async : true,
		type : "POST",
		enctype : 'multipart/form-data',
		url : "ehat/inventoryPurchaseReOrder/uploadPurchaseReOrderDocument",
		data : data,
		processData : false,
		contentType : false,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if(r == 1){
				alertify.success("Document Saved Sucessfully"); 
				getUploadedDocuments(poId);
				$('#uploadPoDocument').val("");
				$('#uploadPoComment').val("");
			}else if(r == 2){
				alertify.success("Document Updated Sucessfully"); 
				getUploadedDocuments(poId);
				$('#uploadPoDocument').val("");
				$('#uploadPoComment').val("");
			}else if(r == 0){
				alertify.error("Oops Some Problem Ocured"); 
			}
		}
	});
}
function getUploadedDocuments(poId){
	var poId = poId; // $("#grnId").val();
	var count = 0;
	var htm = "";
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {"proMasterId" : poId },
		url : "ehat/inventoryPurchaseReOrder/getUploadedDocuments",
		success : function(response) {
			if(response !=null && response !=""){
				var fileName = "";
				if(response.lstPurchaseReOrderDocUploadDto !=null){
					for ( var i = 0; i < response.lstPurchaseReOrderDocUploadDto.length; i++) {
						count++;
						fileName = response.lstPurchaseReOrderDocUploadDto[i].imagePath;
						htm = htm
						+ '<tr class="newAdded"> '
						+ ' <td class="col-md-1 center">'
						+ count
						+ '</td>'
						+ ' <td class="col-md-1 center" id="filePathDocumentUploadId' + count
						+ '" >'
						+ response.lstPurchaseReOrderDocUploadDto[i].imagePath
						+ '</td>'
						+ ' <td class="col-md-1 center" id="commentDocumentUploadId' + count
						+ '" >'
						+ response.lstPurchaseReOrderDocUploadDto[i].note
						+ '</td>'
						+ ' <td class="col-md-1 center" id="uploadedDateDocumentUploadId' + count
						+ '" >'
						+ getDateTimePurchaseReOrder(response.lstPurchaseReOrderDocUploadDto[i].createdDate)
						+ '</td>'
						//view button
						+ ' <td class="col-md-1 center"><button id="viewDocumentUploadId'+count+'" value="'+JSON.parse(response.lstPurchaseReOrderDocUploadDto[i].imagePath)+'"  type="button" onclick="viewUploadedDocument(this.value)" ><i class="fa fa-eye" title="View Document"></i></button>'
						+ '</td>'
						
						+ '</tr>';
					}
				}
				$('#uploadedDocumentProBody').html(htm);
			}
		}
			
	});
}

function viewUploadedDocument(document){
	if(document ==null || document =="" || document ==undefined){
		alert("No File To View First Upload And Save file");
	}else{
		var poId = $("#purchaseOrderId").val();
		$('#viewDocumentPro').attr("src","");
		$('#viewDocumentPro').attr("src","ehat/inventoryPurchaseReOrder/readDocuments?proMasterId="+poId+"&fileName="+document);
		$('#viewPoDocModal').modal('show');
	}

}
function getFileValue(id){
	var files = $('#'+id).prop("files");
	var document = $.map(files, function(val) {
		return val.name;
	});
	return document;
}

function getPurchaseReOrderSeries() {

	var inputs = [];
	inputs.push('isEdit=' + 'no');
	var str = inputs.join('&');
	jQuery
		.ajax({
			async: false,
			type: "GET",
			url: "ehat/invGoodReceiptNote/getGoodReceiptNoteSeries",
			data: str + "&reqType=AJAX",
			error: function () {
				alert('error');
			},
			success: function (response) {
				for (var i = 0; i < response.lstdocMasterDocNumFinancialYearDto.length; i++) {
					if (response.lstdocMasterDocNumFinancialYearDto[i].docId == 6) {
						$("#orderSeriesId").val(response.lstdocMasterDocNumFinancialYearDto[i].docSeries+""+response.lstdocMasterDocNumFinancialYearDto[i].docId+""+response.lstdocMasterDocNumFinancialYearDto[i].docNumber+""+response.lstdocMasterDocNumFinancialYearDto[i].docSuffix);
					}
				}
				
			}
		});
}
