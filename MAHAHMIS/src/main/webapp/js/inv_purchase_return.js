
function addGeneralInfoRows(tabType) {
	if (tabType === "termconditionInfo") {
		var rows = $('#termAndConditionInfoTable tbody tr.newAdded').length;
		addDynamicRecordsToTermAndCondition(rows + 1);
	} else if (tabType === "ContactInfo") {
		var rows = $('#ContactInfoTable tbody tr.newAdded').length;
		addDynamicRecordsToContactInfoTable(rows + 1);
	} else if (tabType === "AddressInfo") {
		var rows = $('#AddressInfoTable tbody tr.newAdded').length;
		addDynamicRecordsToAddressInfoTable(rows + 1);
	}

}


// this is for contact info add dynamic row added

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
			+ '" style="display:none" >'
			+ 0
			+ '</td>'
			+ ' <td class="col-md-1 center" id="contactInfoId1'
			+ id
			+ '" style="display:none" >'
			+ id
			+ '</td>'
			
			+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editContactPurchaseQuiotationInfoMaster('
			+ id+ ',\'fromnew\')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id="deletepurchasecontact'+id+'" onclick="deletePurchaseQuotationSlaveInfo('
			+ id + ',\'deletecontact\')"><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#purchaseQuotationContactInfo").append(htm);
	$('#contactFormId')[0].reset();
	
}

// this is all about dynamic row added in address table

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
			
			+ ' <td class="col-md-1 center" id="addressInfoId1'
			+ id
			+ '" style="display:none">'
			+ id
			+ '</td>'
			
			+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editAddressPurchaseQuotationMaster('+ id+ ',\'fromnew\')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id="deletepurchaseaddress'+id+'" onclick="deletePurchaseQuotationSlaveInfo('+ id + ',\'deleteaddress\')"><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#purchaseQuotationAddInfoList").append(htm);
	$('#addressFormId')[0].reset();
}








function addDynamicRecordsToTermAndCondition(id) {

	var termCondition = $("#termconditionId").val();
	
	if (termCondition == "") {
		alert("address should not be empty..!");
		$("#addressFromAddress").focus();
		return false;

	}
	
	
	var htm = "";
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ id
			+ '</td>'
			+ ' <td class="col-md-1 center" id="termConditionId'
			+ id
			+ '">'
			+ termCondition
			+ '</td>'
			+ ' <td class="col-md-1 center" id="termInfoId'
			+ id
			+ '" style="display:none">'
			+ 0
			+ '</td>'
			
			+ ' <td class="col-md-1 center" id="termInfoId1'
			+ id
			+ '" style="display:none">'
			+ id
			+ '</td>'
		
			+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editTermPurchaseQuotationMaster('+ id+ ',\'fromnew\')"><i class="fa fa-plus"></i></button></td>'
			/*+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id="deletepurchaseterm'+id+'" onclick="deletePurchaseQuotationSlaveInfo('+ id + ',\'deleteterm\')"><i class="fa fa-trash-o"></i></button></td>'*/ 
			+ '</tr>';
	$("#termConditionDetails").append(htm);
	$('#termConditionIdForm')[0].reset();
}


/*temporary*/

function setItemInfoList(itemInfoDtoDetails, itemInfoId,itemName, itemQuantity, unitPriceId,discountPerId, discountRsId, discountAmtId,baseAmountId,gstId,igstId,gstAmtId,totalAmtId,factor1,factor2,factor3,factor4,orderQtyId,
		pendinQtyId,batchId,userId,unitId,manufactureDate,expiryDate,itemMasterId,hsnName,itemBatchCode,itemIgstAmt,orderReceiveQty,itemUnitName,inventoryItemId){
			itemInfoDtoDetails.lstpurchasereturnitemInfoDto.push({
		itemId:itemInfoId,
		itemName : itemName,
		itemQuantity : itemQuantity,
		itemUnitPrice : unitPriceId,
		itemDiscountPer : discountPerId,
		itemDiscountRs : discountRsId,
		itemDiscountAmt : discountAmtId,
		itemBaseAmt : baseAmountId,
		itemGst : gstId,
		itemIgst : igstId,
		itemGstAmt : gstAmtId,
		itemTotalAmt : totalAmtId,
		itemFactor1 : factor1,
		itemFactor2 : factor2,
		itemFactor3 : factor3,
		itemFactor4 : factor4,
		itemOrderQty : orderQtyId,
		itemPendingQty : pendinQtyId,
		itemBatchNo : batchId,
		manufactureDate : manufactureDate,
		expiryDate : expiryDate,
		itemMasterId:itemMasterId,
		hsnName:hsnName,
		itembatchCode:itemBatchCode,
		createdBy:userId,
		unitId:unitId,
		updatedBy:userId,
		itemIGstAmt : itemIgstAmt,
		itemReceivedQty: orderReceiveQty,
		inventoryItemId:itemInfoId,
		itemUnitName:itemUnitName,
		inventoryItemId:inventoryItemId
		
	});
}
		
function setPurchaseQutationContactInfoList(partyMasterContactInfoDtoDetails, contactPersonId,contactDesignationId, contatcAddressId, contactGenderId, contactDobId,
				contactPhoneOneId, contactPhoneSecondId, contactMailId,contactInfoId,userId,unitId) {
	partyMasterContactInfoDtoDetails.partyMasterContactInfoDto.push({
				id:		contactInfoId,
				contactName : contactPersonId,
				contactDesignation : contactDesignationId,
				contactAddress : contatcAddressId,
				contactGender : contactGenderId,
				contactDob : contactDobId,
				contactPhoneNumber1 : contactPhoneOneId,
				contactPhoneNumber2 : contactPhoneSecondId,
				contactEmail : contactMailId,
				createdBy:userId,
				unitId:unitId,
				updatedBy:userId,
			});
	}


function setPurchaseQuotationAddressInfoList(parytyMasterAddressInfoDtoDetails, companyNameId,
		companyCityId, companyStreetId, companyPinId, companyAreaId,
		companyCountryId, companyStateId, companyAddressId, companyAddressType,addressInfoId,userId,unitId) {
	
	parytyMasterAddressInfoDtoDetails.partyMasterAddressInfoDto.push({
		id:addressInfoId,
		addressType : companyAddressType,
		companyName : companyNameId,
		address : companyAddressId,
		street : companyStreetId,
		area : companyAreaId,
		city : companyCityId,
		pin : companyPinId,
		state : companyStateId,
		country : companyCountryId,
		createdBy:userId,
		unitId:unitId,
		updatedBy:userId,
		
	});
}


function setPurchaseQuotationTermConditionInfoList(purchaeQuotationTermAndConditionInfoDtoDetails, termInfoId,termConditionId,userId,unitId)
 {	
	 purchaeQuotationTermAndConditionInfoDtoDetails.lstpurcaseTermConditionInfoDto.push({
		 termConditionId: termInfoId,
		 termConditionAddress : termConditionId,		
		createdBy:userId,
		unitId:unitId,
		updatedBy:userId,
		
	});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 5-Dec-2019
 * @codeFor : savePurchaseReturnMaster()
 ******************************************************************************/

function savePurchaseReturnMaster() {		
	var purchaseReturnMasterId = $("#purchaseReturnMasterId").val();
	var mobileNumber = $("#mbNo").val();
	var referenceNumber = $("#referenceNo").val();	
	var returnDate = $("#returnDate").val();
	var deleviryDate = $("#deliveryDate").val();
	var supplierAddress = $("#supplierAddress").val();
	var supplierName = $("#supplierName").val();
	var purchaseInvoiceId = $("#purchaseInvoiceId").val();
	var returnSeries = $("#returnSeriesId").val();
	var returnStatus = $("#returnStatus").val();
	
	var returnStatusName = $("#returnStatus option:selected").html().trim();
	var supplierState = $("#supplierState2").val();
	
	var purchaseReturnSeries = "GRN:" + $("#purchaseInvoiceId").val();
	
	var returnNo = $("#returnId").val();
	var outWardNo = $("#outWardNo").val();
	var partyMasterId = $("#hiddenpartyMasterId").val();
	
	
	var specialDiscount = $("#txtSplDisc").val();
	var debitAmount = $("#txtdebitAmt1").val();
	var cdPercentage = $("#txtCD1").val();
	var cdAmount = $("#txtCDAmt").val();
	var octroi = $("#txtOctroi").val();
	var surcharge = $("#txtSurcharge").val();
	var creditAmount = $("#txtCreditAmt").val();
	var freight = $("#txtFreight").val();
	var vat = $("#txtVat").val();
	var lbt = $("#txtlbt").val();
	var cst = $("#txtcst").val();
	var exVat = $("#txtExVat").val();
	var totalTax = $("#txtTotalVat").val();
	var less = $("#txtLess").val();
	var add = $("#txtAdd").val();
	
	var txtGross = $("#txtGross").val();
	var textVat = $("#textVat").val();
	var txtNetAmt = $("#txtNetAmt").val();
	var totalItem = $("#totalItemId").val();
	var totalItemDiscount = $("#totalDiscountId").val();
	
	returnId=0;
	purchaseInvoiceId=0;
	

	// validation
				if (mobileNumber != "") {
					var pattern = /^([0-9])*$/;
					if (!pattern.test(mobileNumber)) {
						alert(" Mobile Number should be of digits only!");
						$("#mobileNumber").focus();
						return false;
					}
				}
				
				if (referenceNumber != "") {
					var pattern = /^([0-9])*$/;
					if (!pattern.test(referenceNumber)) {
						alert(" Reference Number should be of digits only!");
						$("#mobileNumber").focus();
						return false;
					}
				}
				
			
				
				if(deleviryDate==""||deleviryDate==undefined||deleviryDate==null||deleviryDate=="null"){
					alert("Quotation Delivery Date Should Not Be Null!");
				}
				
				
				if(supplierAddress==""||supplierAddress==undefined||supplierAddress==null||supplierAddress=="null"){
					alert("Supplier Address Should Not Be Null!");
				}
				
				if(supplierName==""||supplierName==undefined||supplierName==null||supplierName=="null"){
					alert("Supplier Name Should Not Be Null!");
				}
				
	
	
				if (returnSeries == 0) {
					alert('please select return Series');
					$("#masterGroup").focus();
					return false;
				}
				
				if (returnStatus == 0) {
					alert('please select return Status');
					$("#masterGroup").focus();
					return false;
				}
				supplierState=1;
				if (supplierState == 0) {
					alert('please select Supplier State');
					$("#masterGroup").focus();
					return false;
				}
				
				


	


	
  //var genralInfo = $("#PartyGeneralTableInfoList").html().length;
  var   itemInfo =  $('#itemInfoTable tbody tr.newAdded').length; 
  
  if (itemInfo == "" || itemInfo == null || itemInfo == 0) { 
	  alert("Enter at least One Record In Item Info tab ");
	  return false; 
  }
  
  //var contactInfo = $("#PartyContactTableInfoList").html();
  
  var contactInfo =  $('#ContactInfoTable tbody tr.newAdded').length;
  if (contactInfo == "" || contactInfo == null || contactInfo == 0 ) { 
	  alert("Enter at least One Record In Contact Info tab "); return false; 
  }
  
  //var addressInfo = $("#PartyAddressTableInfoList").html();
  var addressInfo =  $('#ContactInfoTable tbody tr.newAdded').length;
  if (addressInfo == "" || addressInfo == null || addressInfo == 0 ) { 
	  alert("Enter at least One Record In Address Info tab "); return false; 
  }
  
  


	// this is for item info
	var itemInfoDtoDetails = {
			lstpurchasereturnitemInfoDto : []
	};
	var rows = $('#itemInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		
		var itemInfoId=0;
		var userId =$("#userId").val();
		var unitId = $("#unitId").val();
		//if(purchaseReturnMasterId!="0"){
			var itemInfoId = $("#itemInfoId" + i).val();
		//}
		var itemName = $("#itemName" + i).val();		
		var itemQuantity = $("#itemQuantity" + i).val();
		var unitPriceId = $("#unitPriceId" + i).val();
		var discountPerId = $("#discountPerId" + i).val();
		var discountRsId = $("#discountRsId" + i).val();
		var discountAmtId = $("#discountAmtId" + i).val();
		var baseAmountId = $("#baseAmountId" + i).val();
		var gstId = $("#gstId" + i).val();
		var igstId = $("#igstId" + i).val();
		var gstAmtId = $("#gstAmtId" + i).val();
		var itemIgstAmt = $("#itemIgstAmt"+i).val();
		var totalAmtId = $("#totalAmtId" + i).val();
		var factor1 = $("#oneFactor" + i).val();
		var factor2 = $("#twoFactor" + i).val();
		var factor3 = $("#threeFactor" + i).val();
		var factor4 = $("#fourFactor" + i).val();
		var orderQtyId = $("#orderQtyId" + i).val();
		var pendinQtyId = $("#pendinQtyId" + i).val();
		var batchId = $("#batchId" + i).val();
		var manufactureDate = $("#manufactureDate" + i).val();
		var expiryDate = $("#expiryDate" + i).val();
		var itemMasterId = $("#itemMasterId" + i).val();
		var hsnName = $("#hsnName" + i).val();
		var itemBatchCode = $("#batchId" + i).val();
		var orderReceiveQty = $("#orderReceiveQty"+i).val();
		
		var itemUnitName = $("#uomUnitLatestFactorId"+i).html().trim();
		
		var inventoryItemId = $("#itemMasterId"+i).val();
		
		
		
		
		
		
		setItemInfoList(itemInfoDtoDetails,parseInt(itemInfoId),
				itemName, parseFloat(itemQuantity), parseFloat(unitPriceId),
				parseFloat(discountPerId), parseFloat(discountRsId), parseFloat(discountAmtId),parseFloat(baseAmountId),parseFloat(gstId),parseFloat(igstId),parseFloat(gstAmtId)
				,parseFloat(totalAmtId),parseFloat(factor1),parseFloat(factor2),
				parseFloat(factor3),parseFloat(factor4),parseFloat(orderQtyId),
				parseFloat(pendinQtyId),parseFloat(batchId),userId,
				unitId,manufactureDate,expiryDate,itemMasterId,hsnName,itemBatchCode,parseFloat(itemIgstAmt),orderReceiveQty,itemUnitName,inventoryItemId);
	}

	itemInfoDtoDetails = JSON
			.stringify(itemInfoDtoDetails);
	

	// this is for contact details

	var partyMasterContactInfoDtoDetails = {
			partyMasterContactInfoDto : []
	};
	var rows = $('#ContactInfoTable tbody tr.newAdded').length;

	for ( var i = 1; i <= rows; i++) {
		var userId =$("#userId").val();
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
		
		setPurchaseQutationContactInfoList(partyMasterContactInfoDtoDetails, contactPersonId,
				contactDesignationId, contatcAddressId, contactGenderId,
				contactDobId, contactPhoneOneId, contactPhoneSecondId,
				contactMailId,parseInt(contactInfoId),userId,unitId);
	}

	partyMasterContactInfoDtoDetails = JSON
			.stringify(partyMasterContactInfoDtoDetails);

	// this is for address details

	var parytyMasterAddressInfoDtoDetails = {
			partyMasterAddressInfoDto : []
	};
	var rows = $('#AddressInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var userId =$("#userId").val();
		var unitId = $("#unitId").val();
		var addressInfoId = $("#addressInfoId" + i).html();
		var companyNameId = $("#companyNameId" + i).html();
		var companyCityId = $("#companyCityId" + i).html();
		var companyStreetId = $("#companyStreetId" + i).html();
		var companyPinId = $("#companyPinId" + i).html();
		var companyAreaId = $("#companyAreaId" + i).html();
		var companyCountryId = $("#companyCountryId" + i).html();
		var companyStateId = $("#companyStateId" + i).html();
		var companyAddressId = $("#companyAddressId" + i).html();
		var companyAddressType = $("#companyAddressTypeId" + i).html();
		
		var countryId = $("#hiddenCountryNameId" + i).html();
		var stateId = $("#hiddenStateNameId" + i).html();
		var districtId = $("#hiddenDistrictNameId" + i).html();
		var talukaId = $("#hiddenTalukaNameId" + i).html();
		var cityId = $("#hiddenCityNameId" + i).html();
		var companyAddressId = $("#companyAddressId" + i).html();
		var companyStreetId = $("#companyStreetId" + i).html();
		var companyPinId = $("#companyPinId" + i).html();
		var companyAreaId = $("#companyAreaId" + i).html();
		
		
		setAddressInfoList(parytyMasterAddressInfoDtoDetails, addressInfoId,
				companyAddressType, companyNameId, companyAddressId, companyStreetId,
				companyPinId, companyAreaId, companyCityId, cityId,
				companyCityId, talukaId, districtId, districtId, companyStateId, 
				stateId, companyCountryId, countryId, userId, unitId);
		
		/*setPurchaseQuotationAddressInfoList(parytyMasterAddressInfoDtoDetails, companyNameId,
				companyCityId, companyStreetId, companyPinId, companyAreaId,
				companyCountryId, companyStateId, companyAddressId,
				companyAddressType,parseInt(addressInfoId),userId,unitId);*/
	}

	parytyMasterAddressInfoDtoDetails = JSON
			.stringify(parytyMasterAddressInfoDtoDetails);
	
	
	// this is for Term And Condition  details

	var purchaeQuotationTermAndConditionInfoDtoDetails = {
			lstpurcaseTermConditionInfoDto : []
	};
	/*var rows = $('#termAndConditionInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var userId =$("#userId").val();
		var unitId = $("#unitId").val();
		var termInfoId = $("#termInfoId" + i).html();
		var termConditionId = $("#termConditionId" + i).html();	
		
		setPurchaseQuotationTermConditionInfoList(purchaeQuotationTermAndConditionInfoDtoDetails,parseInt(termInfoId),termConditionId,userId,unitId);
	}

	purchaeQuotationTermAndConditionInfoDtoDetails = JSON.stringify(purchaeQuotationTermAndConditionInfoDtoDetails);*/

	var grnID = $("#invGRNId").val();
	
	var inputs = [];
	inputs.push("purchaseReturnMasterId=" + purchaseReturnMasterId);
	inputs.push("mobileNumber=" + mobileNumber);
	inputs.push("referenceNumber=" + referenceNumber);
	inputs.push("returnDate=" + returnDate);
	inputs.push("deleviryDate=" + deleviryDate);
	inputs.push("supplierAddress=" + supplierAddress);
	inputs.push("supplierName=" + supplierName);
	inputs.push("returnSeries=" + returnSeries);
	inputs.push("returnStatus=" + returnStatus);
	inputs.push("returnStatusName=" + returnStatusName);
	inputs.push("supplierState=" + supplierState);
	inputs.push("invGRNId=" + grnID);
	
	inputs.push("returnNo=" + returnNo);
	inputs.push("outWardNo=" + outWardNo);
	inputs.push("purchaseReturnSeries=" + purchaseReturnSeries);
	
	inputs.push("purchaseInvoiceId=" + purchaseInvoiceId);
	inputs.push("partyMasterId=" + partyMasterId);	
	
	
	inputs.push("igstTotalAmount=" + textVat);	
	inputs.push("grossAmount=" + txtGross);
	inputs.push("grossTotalAmount=" + txtNetAmt);
	inputs.push("specialDiscount=" + specialDiscount);
	inputs.push("debitAmount=" + debitAmount);
	inputs.push("cdPercentage=" + cdPercentage);
	inputs.push("cdAmount=" + cdAmount);
	inputs.push("octroi=" + octroi);
	inputs.push("surcharge=" + surcharge);
	inputs.push("creditAmount=" + creditAmount);
	inputs.push("freight=" + freight);
	inputs.push("vat=" + vat);
	
	inputs.push("lbt=" + lbt);
	inputs.push("cst=" + cst);
	inputs.push("exVat=" + exVat);
	inputs.push("totalTax" + totalTax);
	inputs.push("less=" + less);
	inputs.push("addAmount=" + add);
	inputs.push("totalItem=" + totalItem);
	inputs.push("totalItemDiscount=" + totalItemDiscount);

	// this is for item info
	inputs.push("itemInfoDtoDetails="+ encodeURIComponent(itemInfoDtoDetails));
	// this is for contact Details
	inputs.push("partyMasterContactInfoDtoDetails="+ encodeURIComponent(partyMasterContactInfoDtoDetails));
	// this is for address info
	inputs.push("parytyMasterAddressInfoDtoDetails="	+ encodeURIComponent(parytyMasterAddressInfoDtoDetails));
	
	// this is for Term And Condition info
	//inputs.push("purchaeQuotationTermAndConditionInfoDtoDetails="+ encodeURIComponent(purchaeQuotationTermAndConditionInfoDtoDetails));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/purchasereturn/savePurchaseReturnMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (response == 1) {
				alert("Record saved successfully..!");
			} else if (response == 2) {
				alert("Record Updated successfully..!");
			} else {
				alert("Oops something went wrong.....");
			}
			//getAllPartyMaster();
			 $('#itemMasterModal').modal('hide');
			/*$('#itemMasterModal').hide();*/
			
			 getAllPurchaseReturnMaster();
			
		}
	});

}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : d-Dec-2019
 * @codeFor : getAllPurchaseReturnMaster()
 ******************************************************************************/
function getAllPurchaseReturnMaster(call) {
	
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	inputs.push('call=' + call);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/purchasereturn/getAllPurchaseReturnMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
			
			setPurchaseReturnMasterTemplate(r, "all");
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 5-Dec-2019
 * @codeFor : setPurchaseReturnMasterTemplate()
 ******************************************************************************/

function setPurchaseReturnMasterTemplate(response, callFrom) {	
	var htm = "";
	var index = 1;
			if (callFrom === "all") {
				for ( var i = 0; i < response.lstpurchasereturnmasterDto.length; i++) {
					
					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstpurchasereturnmasterDto[i].purchaseReturnMasterId
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstpurchasereturnmasterDto[i].supplierName
							+ '</td>'
												
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editPurchaseReturnMaster('
							+ response.lstpurchasereturnmasterDto[i].purchaseReturnMasterId
							+ ')><i class="fa fa-eye View"></i></button></td>'
							/*+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deletePurchaseQuotationMaster('
							+ response.lstpurchasereturnmasterDto[i].purchaseReturnMasterId
							+ ')><i class="fa fa-trash-o"></i></button></td>'*/
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" onclick=printPurchaseReturnMaster('
							+ response.lstpurchasereturnmasterDto[i].purchaseReturnMasterId
							+ ')><i class="fa fa-print"></i></button></td>'
							+ '</tr>';
					index++;
				}
			} else if (callFrom === "search") {				
			
				htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.purchaseReturnMasterId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.supplierName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editPurchaseReturnMaster('
				+ response.purchaseReturnMasterId
				+ ')><i class="fa fa-edit"></i></button></td>'
				/*+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deletePurchaseQuotationMaster('
				+ response.lstpurchasereturnmasterDto[i].purchaseReturnMasterId
				+ ')><i class="fa fa-trash-o"></i></button></td>'*/
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=printPurchaseReturnMaster('
				+ response.purchaseReturnMasterId
				+ ')><i class="fa fa-print"></i></button></td>'
				+ '</tr>';
		index++;
				
		
			}
	$("#purchaseReturnInfoList").html(htm);
}




//this is function for edit contact inforamation


function editContactPurchaseQuiotationInfoMaster(id,callFrom) {
	$("#callFrom").val(callFrom);
	var rows = $('#ContactInfoTable tbody tr.newAdded').length;	
	$("#contactInfoId").val(id);
	for ( var i = 1; i <= rows; i++) {
		var contactInfoId = $("#contactInfoId1" + i).html();
		
		
		if(contactInfoId == id ){
			
			$("#contactInfoId").val($("#contactInfoId" + i).html());
			$("#contactPerson").val($("#contactPersonId" + i).html());
			$("#contactDesignation").val($("#contactDesignationId" + i).html());
			$("#contatcAddress").val($("#contatcAddressId" + i).html());
			$("#contactGender").val($("#contactGenderId" + i).html());
			$("#contactDateofbirth").val($("#contactDobId" + i).html());
			$("#contactPhoneOne").val($("#contactPhoneOneId" + i).html());
			$("#contactPhoneSecond").val($("#contactPhoneSecondId" + i).html());
			$("#contactMail").val($("#contactMailId" + i).html());
			$("#saveContactInfo").hide();
			$("#updateContactInfo").show();
			var generalInfoId = $("#contactInfoId1" + id).html();
			$("#updateContactInfo").attr('myid',generalInfoId );
		}
	
	}
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 22-Nov-2019
 * @codeFor : editAddressPurchaseQuotationMaster()
 ******************************************************************************/

function editAddressPurchaseQuotationMaster(id,callFrom) {
	$("#callFrom").val(callFrom);
	var rows = $('#AddressInfoTable tbody tr.newAdded').length;	
	$("#addressInfoId").val(id);
	for ( var i = 1; i <= rows; i++) {
		var addressInfoId = $("#addressInfoId1" + i).html();
		if(addressInfoId == id ){
			$("#addressInfoId").val($("#addressInfoId" + i).html());
			$("#companyNameFromAddress").val($("#companyNameId" + i).html());
			$("#cityFromAddress").val($("#companyCityId" + i).html());
			$("#streetFromAddress").val($("#companyStreetId" + i).html());
			$("#pincodeFromAddress").val($("#companyPinId" + i).html());
			$("#areaFromAddress").val($("#companyAreaId" + i).html());
			$("#countryFromAddress").val($("#companyCountryId" + i).html());
			$("#stateFromAddress").val($("#companyStateId" + i).html());
			$("#addressFromAddress").val($("#companyAddressId" + i).html());
			if($("#companyAddressTypeId" + i).html() === "ShippingAddress"){
				$("#shippingAddress").val($("#companyAddressTypeId" + i).html());
			}else{
				$("#billingAddress").val($("#companyAddressTypeId" + i).html());
			}
			$("#saveAddressInfo").hide();
			$("#updateAddressInfo").show();
			var generalInfoId = $("#addressInfoId1" + id).html();
			$("#updateAddressInfo").attr('myid',generalInfoId );
				
		}
	}
}


/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 22-Nov-2019
 * @codeFor : editTermPurchaseQuotationMaster()
 ******************************************************************************/
function editTermPurchaseQuotationMaster(id,callFrom) {
	var termcondition=$("#termconditionId").val();
	
	$("#callFrom").val(callFrom);
	$("#termInfoId").val(id);
	var rows = $('#termAndConditionInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var termInfoId = $("#termInfoId1" + i).html();
		if(termInfoId == id ){			
			
			termcondition =termcondition+"\n"+$("#termConditionId" + i).html();
			
			
			$("#saveTermInfo").hide();
			$("#updateTermInfo").show();
			var generalInfoId = $("#termInfoId1" + id).html();
			$("#updateTermInfo").attr('myid',generalInfoId );
			
				
		}
	}
	$("#termconditionId").val(termcondition);
}

function updatePurchaseTermInfo(){
	var callFrom=$("#callFrom").val();
	if(callFrom=="fromdb"){
		var termInfoId = $("#termInfoId").val();
		var termCondition = $("#termconditionId").val();
		var userId = $("#userId").val();
		var unitId = $("#unitId").val();
		
			if (termCondition == "") {
				alert("address should not be empty..!");
				$("#addressFromAddress").focus();
				return false;
	
			}
			var inputs = [];
			inputs.push("termConditionId=" + termInfoId);
			inputs.push("termConditionAddress=" + termCondition);			
			inputs.push("updatedBy=" + userId);
			inputs.push("unitId=" + unitId);
			
			
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/purchasequotation/updatePurchaseTermInfo",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					response = r;
					if (response == 1) {
						alert("Record Updated successfully..!");
					
					} else {
						alert("Oops something went wrong.....");
					}							
					$('#termConditionIdForm')[0].reset();
					$("#saveTermInfo").show();
					$("#updateTermInfo").hide();
					getAllPQuationTermAndConditionInfo();
					
				}
			});	
		
	}else{
		var rows = $('#termAndConditionInfoTable tbody tr.newAdded').length;	
		for ( var i = 1; i <= rows; i++) {		
			var id = $("#updateTermInfo").attr('myid');		
			if(i == id ){
				$("#termInfoId" + i).html($("#termInfoId").val());
				$("#termConditionId" + i).html($("#termconditionId").val());
				
					}
				}
		
	}
	
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 22-Nov-2019
 * @codeFor : getAllPQuationTermAndConditionInfo()
 ******************************************************************************/
function getAllPQuationTermAndConditionInfo() {
	var unitId = $("#unitId").val();
	var purchaseQtMasterId = $("#purchaseQtMasterId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	inputs.push('purchaseQtMasterId=' + purchaseQtMasterId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/purchasequotation/getAllPQuationTermAndConditionInfo",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setEditPurchaseQuotationMasterTermAndConditionInfo(r);
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 22-Nov-2019
 * @codeFor : setEditPurchaseQuotationMasterTermAndConditionInfo()
 ******************************************************************************/
function setEditPurchaseQuotationMasterTermAndConditionInfo(response){
	var count = 0;
	var htm = "";
	for ( var i = 0; i < response.lstpurcaseTermConditionInfoDto.length; i++) {
		count++;
		htm = htm
				+ '<tr class="newAdded"> '
				+ ' <td class="col-md-1 center">'
				+ count
				+ '</td>'
				+ ' <td class="col-md-1 center" id="termConditionId'
				+ count
				+ '">'
				+ response.lstpurcaseTermConditionInfoDto[i].termConditionAddress
				+ '</td>'
				+ ' <td class="col-md-1 center" id="termInfoId'
				+ count
				+ '" style="display:none">'
				+ response.lstpurcaseTermConditionInfoDto[i].termConditionId
				+ '</td>'
				+ ' <td class="col-md-1 center" id="termInfoId1'
				+ count
				+ '" style="display:none">'
				+ response.lstpurcaseTermConditionInfoDto[i].termConditionId
				+ '</td>'
				
				+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editTermPurchaseQuotationMaster('+ response.lstpurcaseTermConditionInfoDto[i].termConditionId
				+ ',\'fromdb\')"><i class="fa fa-plus"></i></button></td>'
				/*+ ' <td class="col-md-1 center">'
				+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false"  id="deletepurchaseterm'+response.lstpurcaseTermConditionInfoDto[i].termConditionId+'" onclick="deletePurchaseQuotationSlaveInfo('+ response.lstpurcaseTermConditionInfoDto[i].termConditionId +',\'deleteterm\')"><i class="fa fa-trash-o"></i></button></td>"><i class="fa fa-trash-o"></i></button></td>'*/
				+ '</tr>';
		
			}
	$("#termConditionDetails").html(htm);
	
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 22-Nov-2019
 * @codeFor : deletePurchaseQuotationSlaveInfo()
 ******************************************************************************/
function deletePurchaseQuotationSlaveInfo(id,CallFrom){	
	
	//var pQId = $("#purchaseQtMasterId").val();
	var pQId = $("#hiddenpartyMasterId").val();	

	if(CallFrom === "deletecontact"){
		
		$("#purchaseQuotationContactInfo").on('click', '#deletepurchasecontact'+id+'', function () {
				var isNew = $("#deletepurchasecontact"+id).attr('isNew');
				if(isNew !=undefined && isNew !=null && isNew =="false"){
				 $(this).closest('tr').remove();
				 var inputs = [];
					inputs.push('id=' + id);
					inputs.push('pQId=' + pQId);
					inputs.push('callFrom=' + CallFrom);
					var str = inputs.join('&');
					jQuery.ajax({
						async : true,
						type : "POST",
						url : "ehat/purchasereturn/deletePurchaseReturnSlaveInfo",
						data : str + "&reqType=AJAX",
						error : function() {
							alert('error');
						},
						success : function(response) {
							alert(response);
						}
					}); 
				}else{					
					$(this).closest('tr').remove();
				}
					
		 });
	}else if(CallFrom === "deleteaddress"){
		$("#purchaseQuotationAddInfoList").on('click', '#deletepurchaseaddress'+id+'', function () {
			var isNew = $("#deletepurchaseaddress"+id).attr('isNew');
			if(isNew !=undefined && isNew !=null && isNew =="false"){
				$(this).closest('tr').remove();
				 var inputs = [];
					inputs.push('id=' + id);
					inputs.push('pQId=' + pQId);
					inputs.push('callFrom=' + CallFrom);
					var str = inputs.join('&');
					jQuery.ajax({
						async : true,
						type : "POST",
						url : "ehat/purchasereturn/deletePurchaseReturnSlaveInfo",
						data : str + "&reqType=AJAX",
						error : function() {
							alert('error');
						},
						success : function(response) {
							alert(response);
						}
					}); 
			}else{
				$(this).closest('tr').remove();
			}
		 });
	}else if(CallFrom === "deleteterm"){
		$("#termConditionDetails").on('click', '#deletepurchaseterm'+id+'', function () {
			var isNew = $("#deletepurchaseterm"+id).attr('isNew');
			if(isNew !=undefined && isNew !=null && isNew =="false"){ 
				alert("Inside delete db term");
			//$(this).closest('tr').remove();
			 var inputs = [];
				inputs.push('id=' + id);
				inputs.push('pQId=' + pQId);
				inputs.push('callFrom=' + CallFrom);
				var str = inputs.join('&');
				jQuery.ajax({
					async : true,
					type : "POST",
					url : "ehat/purchasereturn/deletePurchaseReturnSlaveInfo",
					data : str + "&reqType=AJAX",
					error : function() {
						alert('error');
					},
					success : function(response) {
						alert(response);
					}
				}); 
			}else{
				$(this).closest('tr').remove();
			}
		 });
	}
	
}
/************
* @author	: Dayanand Khandekar
* @date		: 22-Nov-2019
* @codeFor	: deletePurchaseQuotationMaster
 ************/
function deletePurchaseQuotationMaster(pQId) {
	var r = confirm("Are You Sure You Want To Delete Purchase  Master Detail");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/purchasequotation/deletePurchaseQuotationMaster",
			data : {
				"pQId" : pQId
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				//refreshrackDoc();
				getAllPurchaseQuotationMaster();
			}
		});
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 25-Nov-2019
* @codeFor	: auttosuggestion for Party Master
 ************/
function inventoryPartyMasterAutoSuggestion(inputID) {
	var resultData = [];
	var partyName = $("#" + inputID).val();

	if (partyName == "" || partyName == null || partyName == "null"	|| partyName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		
		return false;
	}

	var inputs = [];
	inputs.push('partyName=' + partyName);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/purchasequotation/inventoryPartyMasterAutoSuggestion",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.partyMasterDto.length; j++) {
				var arrValue = response.partyMasterDto[j].id +"-"+response.partyMasterDto[j].name;
				var idValue = response.partyMasterDto[j].id;				
				var partyName = response.partyMasterDto[j].name;
				resultData.push({
					ID : idValue,
					Name : partyName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#partyMasterByName .typeahead").html(template);
				$("div#partyMasterByName .typeahead").show();

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
		var partyId = res[0];		
		var partyName = res[1];		
		getPartyMasterDetailsById(partyId);
		$("input#" + inputID).val(partyName);
	}
}

function getPartyMasterDetailsById(partyMasterId) {	
	
	var inputs = [];
	inputs.push('id=' + partyMasterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/invPartyMaster/editPartyMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {			
			
			
			//$("#supplierName").val(response.name);
			//$("#supplierAddress").val(response.partyMasterContactInfoDto[0].contactAddress);
			//$("#mbNo").val(response.partyMasterContactInfoDto[0].contactPhoneNumber1);
			//$("#hiddenpartyMasterId").val(response.id);
			//alert("id..."+$("#hiddenpartyMasterId").val());
			//setEditPartyMasterSlaveInfo(response);
			setPartyMasterContactInfo(response);
			setPartyMasterAddressInfo(response);
			setPartyModalAddressInfoToPurcchaseQuotation(response);
			setPartyModalContactInfoToPurcchaseQuotation(response);
			setParyMasterStateToPurchaseReturn(response);
			//setPartyModalInfoToPurcchaseQuotation(response);
			//showpartyMasterDetailsModal();
			//getItemMasterSlaveDetailsModal(response);
			
		}
	});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 26-Nov-2019
 * @codeFor : set party master contact info to quatation master contact info()
 ******************************************************************************/
function setPartyMasterContactInfo(response){
	
	var count = 0;
	var htm = "";
	for ( var i = 0; i < response.partyMasterContactInfoDto.length; i++) {		
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
			
			+ ' <td class="col-md-1 center" id="contactInfoId1'
			+ count
			+ '" style="display:none">'
			+ response.partyMasterContactInfoDto[i].id
			+ '</td>'
			
			+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editContactPurchaseQuiotationInfoMaster('
			+ response.partyMasterContactInfoDto[i].id+',\'fromdb\')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id="deletepurchasecontact'+response.partyMasterContactInfoDto[i].id+'" onclick="deletePurchaseQuotationSlaveInfo('+ response.partyMasterContactInfoDto[i].id +',\'deletecontact\')"><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	}
	$("#purchaseQuotationContactInfo").html(htm);
	
	
}


/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 26-Nov-2019
 * @codeFor : setPartyMasterAddressInfo to Purchase Quotation()
 ******************************************************************************/
function setPartyMasterAddressInfo(response){
	var count = 0;
	var htm = "";
	for ( var i = 0; i < response.partyMasterAddressInfoDto.length; i++) {
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
				+ ' <td class="col-md-1 center" id="addressInfoId'
				+ count
				+ '" style="display:none">'
				+ response.partyMasterAddressInfoDto[i].id
				+ '</td>'
				
				+ ' <td class="col-md-1 center" id="addressInfoId1'
				+ count
				+ '" style="display:none">'
				+ response.partyMasterAddressInfoDto[i].id
				+ '</td>'
				
				+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editAddressPurchaseQuotationMaster('+ response.partyMasterAddressInfoDto[i].id+ ',\'fromdb\')"><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false"  id="deletepurchaseaddress'+response.partyMasterAddressInfoDto[i].id+'" onclick="deletePurchaseQuotationSlaveInfo('+ response.partyMasterAddressInfoDto[i].id +',\'deleteaddress\')"><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			}
			$("#purchaseQuotationAddInfoList").html(htm);
	
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 5-Dec-2019
 * @codeFor : editPurchaseReturnMaster()
 ******************************************************************************/
function editPurchaseReturnMaster(pRId){
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('pRId=' + pRId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/purchasereturn/editPurchaseReturnMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {		
			
			
			
				$("#purchaseReturnMasterId").val(r.purchaseReturnMasterId);
				$("#returnId").val(r.purchaseReturnMasterId);
				
				$("#mbNo").val(r.mobileNumber);
				$("#referenceNo").val(r.referenceNumber);	
				$("#returnDate").val(r.returnDate);
				$("#deliveryDate").val(r.deleviryDate);
				$("#supplierAddress").val(r.supplierAddress);
				$("#supplierName").val(r.supplierName);
				$("#returnSeriesId").val(r.returnSeries);
				$("#returnStatus").val(r.returnStatus);
				//$("#supplierState").val(r.supplierState);
				$("#supplierState2 option:selected").text(r.partymasterdto.partyMasterAddressInfoDto[0].state);
				$("#hiddenpartyMasterId").val(r.supplierState);
				
				//$("#returnId").val(r.returnNo);
				$("#outWardNo").val(r.outWardNo);
				
				$("#purchaseInvoiceId option:selected").text(r.purchaseReturnSeries);
//				$("#").val(r.purchaseInvoiceId);
				
				
				
				$("#hiddenpartyMasterId").val(r.partymasterdto.id);
				
				
			$("#txtSplDisc").val(r.specialDiscount);
				 $("#txtdebitAmt1").val(r.debitAmount);
				 $("#xtCD1").val(r.cdPercentage);
				 $("#txtCDAmt").val(r.cdAmount);
				 $("#txtOctroi").val(r.octroi);
				$("#txtSurcharge").val(r.surcharge);
				 $("#txtCreditAmt").val(r.creditAmount);
				 $("#txtFreight").val(r.freight);
				 $("#txtVat").val(r.vat);
				 $("#txtlbt").val(r.lbt);
				 $("#txtcst").val(r.cst);
				 $("#txtExVat").val(r.exVat);
				 $("#txtTotalVat").val(r.totalTax);
				 $("#txtLess").val(r.less);
				 $("#txtAdd").val(r.add);
				
				 $("#txtGross").val(r.grossAmount);
				 $("#textVat").val(r.igstTotalAmount);
				 $("#txtNetAmt").val(r.grossTotalAmount);
				 $("#totalItemId").val(r.totalItem);
				 $("#totalDiscountId").val(r.totalItemDiscount);
				setEditPurchaseReturnMasterSlaveInfo(r);
				
			
		}
	});
	
}
function setEditPurchaseReturnMasterSlaveInfo(response){

	var length = 0;
	if(response.lstpurchasereturnitemInfoDto.length != 0 && response.lstpurchasereturnitemInfoDto !=null && response.lstpurchasereturnitemInfoDto != ""){
		
		length = response.lstpurchasereturnitemInfoDto.length;
		var htm = "";
		var id = 0;
		for ( var i = 0; i < length; i++) {
			
			var expirydate = response.lstpurchasereturnitemInfoDto[i].expiryDate;
			var date = new Date(expirydate);
			var day = date.getDate();
			var month = date.getMonth()+1;
			if(day<10){
				day = "0"+day;
			}
			if(month<10){
				month = "0"+month;
			}
			var dateFormat = date.getFullYear() + "-" + month + "-" + day;
			
			id++;
			htm = htm
			+ "<tr class='newAdded' id='mutitr'"
			+ id
			+ "'>"
			+ "<td><input type='checkbox' class='chkMrnItem' value='"+id+"' "
			+ id
			+ " name='checkbox'  checked='checked' id="+response.lstpurchasereturnitemInfoDto[i].itemId+"></td>"
			
			+ "<td class='col-md-1 center'> <span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemInfoId"+id+"' value="+response.lstpurchasereturnitemInfoDto[i].itemId+"><input type='hidden' id='itemMasterId"+id+"' value="+response.lstpurchasereturnitemInfoDto[i].itemMasterId+"></td>"	
			
			+ "<td><input type='text' style='width: 100px;' id='itemName" 
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itemName+"'>"
			+ "</td>"
			
			+ "<td><input type='text' style='width: 80px;'   onkeypress='return validateNumbers(event)'  onkeyup='totalAmount(this.id,"+id+")' id='itemQuantity"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itemQuantity+"'><lable id='availableQty"+id+"'>Available QTY:"+response.lstpurchasereturnitemInfoDto[i].itemReceivedQty+" </lable>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' id='unitPriceId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itemUnitPrice+"'><lable id='uomUnitLatestFactorId"+id+"'>"+response.lstpurchasereturnitemInfoDto[i].itemUnitName+" </lable>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;'  onkeyup='chkTradAmtorPercentage(this.id,"+id+")' onblur='calculTradeDis(this.id,"+ id+ ")' id='discountPerId" 
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itemDiscountPer+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;'  onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+id+")' id='discountRsId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itemDiscountRs+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' id='discountAmtId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itemDiscountAmt+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' id='baseAmountId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itemBaseAmt+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' id='gstId"
			+ id
			+ "' class='form-control input-SmallText' onkeyup='rowAmtCalForGst(this.id,"+id+"),autotaxCodeforItemGst("+id+",onchange)' value='"+response.lstpurchasereturnitemInfoDto[i].itemGst+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' onkeyup='rowAmtCal(this.id,"+id+"),autotaxCodeforItem("+id+",onchange)' id='igstId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itemIgst+"'>"
			+ "</td>"
			
			+ "<td><input type='text' style='width: 80px;' id='gstAmtId"
			+ id
			+ "' class='form-control input-SmallText' onkeyup='rowAmtCalForGst(this.id,"+id+"),autotaxCodeforItemGst("+id+",onchange)' value='"+response.lstpurchasereturnitemInfoDto[i].itemGst+"' disabled='disabled'>"
			+ "</td>"
			
			+ "<td><input type='text' style='width: 80px;' id='itemIgstAmt"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itemIGstAmt+"' >"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' id='totalAmtId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itemTotalAmt+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' id='oneFactor"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itemFactor1+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' id='twoFactor"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itemFactor2+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' id='threeFactor"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itemFactor3+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' id='fourfactor"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itemFactor4+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' id='orderQtyId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itemOrderQty+"' disabled='disabled'>"
			+ "</td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'> <input type='text' style='width: 80px;' id='orderQtyId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itemReceivedQty+"' disabled='disabled'>"
			+ "</td>"
			
			+ "<td><input type='text' style='width: 80px;' id='pendinQtyId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itemPendingQty+"' disabled='disabled'>"
			+ "</td>"
			
			+ "<td><input type='text' style='width: 80px;' id='batchId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itembatchCode+"' disabled='disabled'>"
			+ "</td>"
			
			htm = htm + "<td class='col-md-3 col-xs-6 col-sm-3 center'><input style='width: 100px;' type='button' id='getBatchDetailsId"+ id + "' class='btn btn-xs btn-success editUserAccess'  data-toggle='modal' data-target='#batchWiseGoodReceiptNoteModal' value='Batch Details' onclick='getGoodReceiptNoteItemBatchDetails(" + id +","+response.lstpurchasereturnitemInfoDto[i].inventoryItemId+");' disabled='disabled'> </td>";
			htm = htm	+	"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style='width: 100px;' id='batchKeyId" +
			id +
			"' class='form-control input-SmallText' value='" +
			response.lstpurchasereturnitemInfoDto[i].itembatchCode +
			"'> </td>"
			
			+ "<td><input type='text' style='width: 80px;' disabled id='manufactureDate"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].manufactureDate+"'>"
			+ "</td>"
			
			+ "<td><input type='text' style='width: 80px;' disabled id='expiryDate" 
			+ id
			+ "' class='form-control input-SmallText' value='"+dateFormat+"'>"
			+ "</td>"
			
			htm = htm	+
			"<td class='col-md-6 col-xs-12 col-sm-6 center' '><input  style='width: 150px;'  type='text' id='itemTotalAmount" +
			id +
			"' class='form-control input-SmallText' value='" +
			response.lstpurchasereturnitemInfoDto[i].itemTotalAmt +
			"'> </td>"
			
			
			+ "<td style='display:none'> <input type='text' style='width: 80px;' id='itemMasterId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].itemMasterId+"'>"
			+ "</td>"
			
			+ "<td style='display:none'><input type='text' style='width: 80px;' id='hsnName"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchasereturnitemInfoDto[i].hsnName+"'>"
			+ "</td>"
			
			
		/*	+ "<td><input type='text' style='display:none;' id='itemInfoId"
			+ id
			+ "' class='form-control input-SmallText'  value="+response.lstpurchasereturnitemInfoDto[i].itemId+">"
			+ "</td>"*/			
			+ "</tr>";
		}
		$("#RowCount").val(id);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		$("#itemInfoDetails").html(htm);
		
		$("#itemInfoTable *").attr("disabled","disabled");
		$("#financialFormId *").attr("disabled","disabled");
		//$("#itemInfoTable").attr("disabled", "disabled");
	}
	
	if(response.partymasterdto.partyMasterContactInfoDto.length != 0 && response.partymasterdto.partyMasterContactInfoDto !=null && response.partymasterdto.partyMasterContactInfoDto != ""){
		length = response.partymasterdto.partyMasterContactInfoDto.length;
		var count = 0;
		var htm = "";
		for ( var i = 0; i < response.partymasterdto.partyMasterContactInfoDto.length; i++) {		
			count++;
		htm = htm
				+ '<tr class="newAdded"> '
				+ ' <td class="col-md-1 center">'
				+ count
				+ '</td>'
				+ ' <td class="col-md-1 center" id="contactPersonId'
				+ count
				+ '">'
				+ response.partymasterdto.partyMasterContactInfoDto[i].contactName 
				+ '</td>'
				+ ' <td class="col-md-1 center" id="contactDesignationId'
				+ count
				+ '">'
				+ response.partymasterdto.partyMasterContactInfoDto[i].contactDesignation
				+ '</td>'
				+ ' <td class="col-md-1 center" id="contatcAddressId'
				+ count
				+ '">'
				+ response.partymasterdto.partyMasterContactInfoDto[i].contactAddress
				+ '</td>'
				+ ' <td class="col-md-1 center" id="contactGenderId'
				+ count
				+ '" style="display:none">'
				+ response.partymasterdto.partyMasterContactInfoDto[i].contactGender
				+ '</td>'
				+ ' <td class="col-md-1 center" id="contactDobId'
				+ count
				+ '" style="display:none">'
				+ response.partymasterdto.partyMasterContactInfoDto[i].contactDob
				+ '</td>'
				+ ' <td class="col-md-1 center" id="contactPhoneOneId'
				+ count
				+ '" style="display:none">'
				+ response.partymasterdto.partyMasterContactInfoDto[i].contactPhoneNumber1
				+ '</td>'
				+ ' <td class="col-md-1 center" id="contactPhoneSecondId'
				+ count
				+ '" style="display:none">'
				+ response.partymasterdto.partyMasterContactInfoDto[i].contactPhoneNumber2
				+ '</td>'
				+ ' <td class="col-md-1 center" id="contactMailId'
				+ count
				+ '" style="display:none">'
				+ response.partymasterdto.partyMasterContactInfoDto[i].contactEmail
				+ '</td>'
				+ ' <td class="col-md-1 center" id="contactInfoId'
				+ count
				+ '" style="display:none">'
				+ response.partymasterdto.partyMasterContactInfoDto[i].id
				+ '</td>'
				
				+ ' <td class="col-md-1 center" id="contactInfoId1'
				+ count
				+ '" style="display:none">'
				+ response.partymasterdto.partyMasterContactInfoDto[i].id
				+ '</td>'
				
				+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editContactPurchaseQuiotationInfoMaster('
				+ response.partymasterdto.partyMasterContactInfoDto[i].id+',\'fromdb\')"><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id="deletepurchasecontact'+response.partymasterdto.partyMasterContactInfoDto[i].id+'" onclick="deletePurchaseQuotationSlaveInfo('+ response.partymasterdto.partyMasterContactInfoDto[i].id +',\'deletecontact\')"><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		$("#purchaseQuotationContactInfo").html(htm);
		}
		
	}
	if(response.partymasterdto.partyMasterAddressInfoDto.length != 0 && response.partymasterdto.partyMasterAddressInfoDto !=null && response.partymasterdto.partyMasterAddressInfoDto != ""){
		length = response.partymasterdto.partyMasterAddressInfoDto.length;
		var count = 0;
		var htm = "";
		for ( var i = 0; i < response.partymasterdto.partyMasterAddressInfoDto.length; i++) {
			count++;
			htm = htm +
				'<tr class="newAdded"> ' +
				' <td class="col-md-1 center">' +
				count +
				'</td>' +
				' <td class="col-md-1 center" id="companyNameId' +
				count +
				'">' +
				response.partymasterdto.partyMasterAddressInfoDto[i].companyName +
				'</td>' +
				' <td class="col-md-1 center" id="companyCountryId' +
				count +
				'">' +
				response.partymasterdto.partyMasterAddressInfoDto[i].country +
				'</td>' +
				' <td class="col-md-1 center" id="companyCityId' +
				count +
				'">' +
				response.partymasterdto.partyMasterAddressInfoDto[i].city +
				'</td>' +
				' <td class="col-md-1 center" id="companyAddressId' +
				count +
				'" style="display:none">' +
				response.partymasterdto.partyMasterAddressInfoDto[i].address +
				'</td>' +
				' <td class="col-md-1 center" id="companyAddressTypeId' +
				count +
				'" style="display:none">' +
				response.partymasterdto.partyMasterAddressInfoDto[i].addressType +
				'</td>' +
				' <td class="col-md-1 center" id="companyStreetId' +
				count +
				'" style="display:none">' +
				response.partymasterdto.partyMasterAddressInfoDto[i].street +
				'</td>' +
				' <td class="col-md-1 center" id="companyAreaId' +
				count +
				'" style="display:none">' +
				response.partymasterdto.partyMasterAddressInfoDto[i].area +
				'</td>' +
				' <td class="col-md-1 center" id="companyPinId' +
				count +
				'" style="display:none">' +
				response.partymasterdto.partyMasterAddressInfoDto[i].pin +
				'</td>' +
				' <td class="col-md-1 center" id="companyStateId' +
				count +
				'" style="display:none">' +
				response.partymasterdto.partyMasterAddressInfoDto[i].state +
				'</td>' +
				' <td class="col-md-1 center" id="companyDistrictId' +
				count +
				'" style="display:none">' +
				response.partymasterdto.partyMasterAddressInfoDto[i].districtName +
				'</td>' +
				' <td class="col-md-1 center" id="companyTalukaId' +
				count +
				'" style="display:none">' +
				response.partymasterdto.partyMasterAddressInfoDto[i].talukaName +
				'</td>' +
				' <td class="col-md-1 center" id="hiddenCountryNameId' +
				count +
				'" style="display:none">' +
				response.partymasterdto.partyMasterAddressInfoDto[i].countryId +
				'</td>' +
				' <td class="col-md-1 center" id="hiddenStateNameId' +
				count +
				'" style="display:none">' +
				response.partymasterdto.partyMasterAddressInfoDto[i].stateId +
				'</td>' +
				' <td class="col-md-1 center" id="hiddenDistrictNameId' +
				count +
				'" style="display:none">' +
				response.partymasterdto.partyMasterAddressInfoDto[i].districtId +
				'</td>' +
				' <td class="col-md-1 center" id="hiddenTalukaNameId' +
				count +
				'" style="display:none">' +
				response.partymasterdto.partyMasterAddressInfoDto[i].talukaId +
				'</td>' +
				' <td class="col-md-1 center" id="hiddenCityNameId' +
				count +
				'" style="display:none">' +
				response.partymasterdto.partyMasterAddressInfoDto[i].cityId +
				'</td>' +
				' <td class="col-md-1 center" id="addressInfoId' +
				count +
				'" style="display:none">' +
				response.partymasterdto.partyMasterAddressInfoDto[i].id +
				'</td>' +
				' <td class="col-md-1 center" id="addressInfoId1'
				+ count
				+ '" style="display:none">'
				+ count
				+ '</td>' +
				' <td class="col-md-1 center"><input type="hidden" id="editAddressPartMaster' +
				count + '" value="' + count + '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editAddressInfoPartyMaster(' +
				+ count +
				',\'fromDB\')"><i class="fa fa-edit"></i></button></td>' +
				' <td class="col-md-1 center">' +
				'	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="false" id ="deleteAddressPartMaster' +
				response.partymasterdto.partyMasterAddressInfoDto[i].id +
				'"  onclick="deletePartyMasterSlave(' +
				response.partymasterdto.partyMasterAddressInfoDto[i].id +
				',\'deleteAddress\')" ' +
				'><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			$("#purchaseQuotationAddInfoList").html(htm);
		}
		$("#saveAddressInfo").show();
		$("#restAddressInfo").show();
	
		/*for ( var i = 0; i < response.partymasterdto.partyMasterAddressInfoDto.length; i++) {
			count++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyNameId'
					+ count
					+ '">'
					+ response.partymasterdto.partyMasterAddressInfoDto[i].companyName
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyCountryId'
					+ count
					+ '">'
					+ response.partymasterdto.partyMasterAddressInfoDto[i].country
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyCityId'
					+ count
					+ '">'
					+ response.partymasterdto.partyMasterAddressInfoDto[i].city
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyAddressId'
					+ count
					+ '" style="display:none">'
					+ response.partymasterdto.partyMasterAddressInfoDto[i].address
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyAddressTypeId'
					+ count
					+ '" style="display:none">'
					+ response.partymasterdto.partyMasterAddressInfoDto[i].addressType
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyStreetId'
					+ count
					+ '" style="display:none">'
					+ response.partymasterdto.partyMasterAddressInfoDto[i].street
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyAreaId'
					+ count
					+ '" style="display:none">'
					+ response.partymasterdto.partyMasterAddressInfoDto[i].area
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyPinId'
					+ count
					+ '" style="display:none">'
					+ response.partymasterdto.partyMasterAddressInfoDto[i].pin
					+ '</td>'
					+ ' <td class="col-md-1 center" id="companyStateId'
					+ count
					+ '" style="display:none">'
					+ response.partymasterdto.partyMasterAddressInfoDto[i].state
					+ '</td>'
					+ ' <td class="col-md-1 center" id="addressInfoId'
					+ count
					+ '" style="display:none">'
					+ response.partymasterdto.partyMasterAddressInfoDto[i].id
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="addressInfoId1'
					+ count
					+ '" style="display:none">'
					+ response.partymasterdto.partyMasterAddressInfoDto[i].id
					+ '</td>'
					
					+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editAddressPurchaseQuotationMaster('+ response.partymasterdto.partyMasterAddressInfoDto[i].id+ ',\'fromdb\')"><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false"  id="deletepurchaseaddress'+response.partymasterdto.partyMasterAddressInfoDto[i].id+'" onclick="deletePurchaseQuotationSlaveInfo('+ response.partymasterdto.partyMasterAddressInfoDto[i].id +',\'deleteaddress\')"><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			$("#purchaseQuotationAddInfoList").html(htm);		
		}*/
				
	}
		/*if(response.lstpurcaseTermConditionInfoDto.length != 0 && response.lstpurcaseTermConditionInfoDto !=null && response.lstpurcaseTermConditionInfoDto != ""){
			length = response.lstpurcaseTermConditionInfoDto.length;
			var count = 0;
			var htm = "";
			for ( var i = 0; i < length; i++) {
				count++;
				htm = htm
						+ '<tr class="newAdded"> '
						+ ' <td class="col-md-1 center">'
						+ count
						+ '</td>'
						+ ' <td class="col-md-1 center" id="termConditionId'
						+ count
						+ '">'
						+ response.lstpurcaseTermConditionInfoDto[i].termConditionAddress
						+ '</td>'
						+ ' <td class="col-md-1 center" id="termInfoId'
						+ count
						+ '" style="display:none">'
						+ response.lstpurcaseTermConditionInfoDto[i].termConditionId
						+ '</td>'
						+ ' <td class="col-md-1 center" id="termInfoId1'
						+ count
						+ '" style="display:none">'
						+ response.lstpurcaseTermConditionInfoDto[i].termConditionId
						+ '</td>'
						
						+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editTermPurchaseQuotationMaster('+ response.lstpurcaseTermConditionInfoDto[i].termConditionId
						+ ',\'fromdb\')"><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false"  id="deletepurchaseterm'+response.lstpurcaseTermConditionInfoDto[i].termConditionId+'" onclick="deletePurchaseQuotationSlaveInfo('+ response.lstpurcaseTermConditionInfoDto[i].termConditionId +',\'deleteterm\')"><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
				$("#termConditionDetails").html(htm);
			}
		
	}
*/
	getAllInventoryTermAndCondition();
}

/************
* @author	: Dayanand Khandekar
* @date		: 27-Nov-2019
* @codeFor	:getAllInventoryTermAndCondition Detail
 ************/
function getAllInventoryTermAndCondition(){	
	
	var unitId = $('#unitId').val();
	
	var inputs = [];
	inputs.push("unitId=" + unitId);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/getAllInventoryTermAndCondition",
		error : function() {
			alert('error');
		},
		success : function(r){			
			setTermAndConditionDocTemp(r);		
		}
	});	
}

function setTermAndConditionDocTemp(response){
	
	var count = 0;
	var htm = "";
	for ( var i = 0; i <response. lsttermcondition.length; i++) {
		count++;
		htm = htm
				+ '<tr class="newAdded"> '
				+ ' <td class="col-md-1 center">'
				+ count
				+ '</td>'
				+ ' <td class="col-md-1 center" id="termConditionId'
				+ count
				+ '">'
				+ response.lsttermcondition[i].termconditionName
				+ '</td>'
				+ ' <td class="col-md-1 center" id="termInfoId'
				+ count
				+ '" style="display:none">'
				+ response.lsttermcondition[i].termConditionId
				+ '</td>'
				+ ' <td class="col-md-1 center" id="termInfoId1'
				+ count
				+ '" style="display:none">'
				+ response.lsttermcondition[i].termConditionId
				+ '</td>'
				
				+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editTermPurchaseQuotationMaster('+ response.lsttermcondition[i].termConditionId
				+ ',\'fromdb\')"><i class="fa fa-plus"></i></button></td>'
				/*+ ' <td class="col-md-1 center">'
				+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false"  id="deletepurchaseterm'+response.lsttermcondition[i].termConditionId+'" onclick="deletePurchaseQuotationSlaveInfo('+ response.lsttermcondition[i].termConditionId +',\'deleteterm\')"><i class="fa fa-trash-o"></i></button></td>'*/ 
				+ '</tr>';
		$("#termConditionDetails").html(htm);
	}

}

//this is function for update contact inforamation

/************
* @author	: Dayanand Khandekar
* @date		: 27-Nov-2019
* @codeFor	:updatePartyContactInfo Detail
 ************/
function updatePurchaseContactInfo() {
	var callFrom=$("#callFrom").val();	
	if(callFrom=="fromdb"){
					var contactInfoId=$("#contactInfoId" ).val();			
					
					var contactPerson = $("#contactPerson").val();
					var contactDesignation = $("#contactDesignation").val();
					var contatcAddress = $("#contatcAddress").val();
					var contactGender = $("#contactGender").val();
					var contactDob = $("#contactDateofbirth").val();
					var contactPhoneOne = $("#contactPhoneOne").val();
					var contactPhoneSecond = $("#contactPhoneSecond").val();
					var contactMail = $("#contactMail").val();
					var userId = $("#userId").val();
					var unitId = $("#unitId").val();					
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
					
					var inputs = [];
					inputs.push("id=" + contactInfoId);
					inputs.push("contactName=" + contactPerson);
					inputs.push("contactDesignation=" + contactDesignation);
					inputs.push("contactAddress=" + contatcAddress);
					inputs.push("contactGender=" + contactGender);
					inputs.push("contactDob=" + contactDob);
					inputs.push("contactPhoneNumber1=" + contactPhoneOne);
					inputs.push("contactPhoneNumber2=" + contactPhoneSecond);
					inputs.push("contactEmail=" + contactMail);
					inputs.push("updatedBy=" + userId);
					inputs.push("unitId=" + unitId);
					
					
					var str = inputs.join('&');
					jQuery.ajax({
						async : true,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "ehat/purchasereturn/updatePurchaseReturnContactMaster",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {
							alert("error");
						},
						success : function(r) {
							response = r;
							if (response == 1) {
								alert("Record Updated successfully..!");
							
							} else {
								alert("Oops something went wrong.....");
							}
							//getAllPartyMaster();
							$('#contactFormId')[0].reset();
							$("#saveContactInfo").show();
							$("#updateContactInfo").hide();
							getAllPReturnContactInfo();
							
						}
					});
					
					
		
	}else{
	var rows = $('#ContactInfoTable tbody tr.newAdded').length;	
	for ( var i = 1; i <= rows; i++) {		
		var id = $("#updateContactInfo").attr('myid');		
		if(i == id ){
			$("#contactInfoId" + i).html($("#contactInfoId").val());
			$("#contactPersonId" + i).html($("#contactPersonId").val());
			$("#contactDesignationId" + i).html($("#contactDesignationId").val());
			$("#contatcAddressId" + i).html($("#contatcAddressId").val());
			$("#contactGenderId" + i).html($("#contactGender").val());
			$("#contactDobId" + i).html($("#contactDateofbirth").val());
			$("#contactPhoneOneId" + i).html($("#contactPhoneOne").val());
			$("#contactPhoneSecondId" + i).html($("#contactPhoneSecond").val());
			$("#contactMailId" + i).html($("#contactMail").val());
			$("#generalMobileNoId" + i).html($("#generalMobileNo").val());
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
	}
}
/*******************************************************************************
* @author : Dayanand Khandekar
* @date : 9-Dec-2019
* @codeFor : getAllPReturnContactInfo()
******************************************************************************/
function getAllPReturnContactInfo() {
	var unitId = $("#unitId").val();
	//var purchaseQtMasterId = $("#purchaseQtMasterId").val();
	var hiddenpartyMasterId = $("#hiddenpartyMasterId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	inputs.push('purchaseQtMasterId=' + hiddenpartyMasterId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/purchasereturn/getAllPReturnContactInfo",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setEditPurchaseQuotationMasterContactInfo(r);
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}
/*******************************************************************************
* @author : Dayanand Khandekar
* @date : 19-Nov-2019
* @codeFor : setEditPurchaseQuotationMasterContactInfo()
******************************************************************************/
function setEditPurchaseQuotationMasterContactInfo(response){	
	
	var count = 0;
	var htm = "";
	for ( var i = 0; i < response.partyMasterContactInfoDto.length; i++) {		
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
			
			+ ' <td class="col-md-1 center" id="contactInfoId1'
			+ count
			+ '" style="display:none">'
			+ response.partyMasterContactInfoDto[i].id
			+ '</td>'
			
			+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editContactPurchaseQuiotationInfoMaster('
			+ response.partyMasterContactInfoDto[i].id+',\'fromdb\')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id="deletepurchasecontact'+response.partyMasterContactInfoDto[i].id+'" onclick="deletePurchaseQuotationSlaveInfo('+ response.partyMasterContactInfoDto[i].id +',\'deletecontact\')"><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	}
	$("#purchaseQuotationContactInfo").html(htm);

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 22-Nov-2019
 * @codeFor : updatePartyAddressInfo()
 ******************************************************************************/
function updatePurchaseAddressInfo(){
	var callFrom=$("#callFrom").val();	
	if(callFrom=="fromdb"){
		var addressInfoId = $("#addressInfoId").val()
		var companyName = $("#companyNameFromAddress").val();
		var companyCity = $("#cityFromAddress").val();
		var companyStreet = $("#streetFromAddress").val();
		var companyPin = $("#pincodeFromAddress").val();
		var companyArea = $("#areaFromAddress").val();
		var companyCountry = $("#countryFromAddress").val();
		var companyState = $("#stateFromAddress").val();
		var companyAddress = $("#addressFromAddress").val();
		var userId = $("#userId").val();
		var unitId = $("#unitId").val();

		if (companyName == "") {
			alert("Company Name  should not be empty..!");
			$("#companyNameFromAddress").focus();
			return false;

		}
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
		
					var inputs = [];
					inputs.push("id=" + addressInfoId);
					inputs.push("addressType=" + companyAddressType);
					inputs.push("companyName=" + companyName);
					inputs.push("address=" + companyAddress);
					inputs.push("street=" + companyStreet);
					inputs.push("area=" + companyArea);
					inputs.push("city=" + companyCity);
					inputs.push("pin=" + companyPin);
					inputs.push("state=" + companyState);
					inputs.push("country=" + companyCountry);
					inputs.push("updatedBy=" + userId);
					inputs.push("unitId=" + unitId);
					
					
					var str = inputs.join('&');
					jQuery.ajax({
						async : true,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "ehat/purchasereturn/updatePurchaseAddressInfo",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {
							alert("error");
						},
						success : function(r) {
							response = r;
							if (response == 1) {
								alert("Record Updated successfully..!");
							
							} else {
								alert("Oops something went wrong.....");
							}							
							$('#addressFormId')[0].reset();
							$("#saveAddressInfo").show();
							$("#updateAddressInfo").hide();
							
							getAllPReturnAddressInfo();
							
						}
					});		
		
	}else{
		var rows = $('#AddressInfoTable tbody tr.newAdded').length;	
		for ( var i = 1; i <= rows; i++) {		
			var id = $("#updateAddressInfo").attr('myid');		
			if(i == id ){
		$("#addressInfoId" + i).html($("#addressInfoId").val());
		$("#companyNameId" + i).html($("#companyNameFromAddress").val());
		$("#companyCityId" + i).html($("#cityFromAddress").val());
		$("#companyStreetId" + i).html($("#streetFromAddress").val());
		$("#companyPinId" + i).html($("#pincodeFromAddress").val());
		$("#companyAreaId" + i).html($("#areaFromAddress").val());
		$("#companyCountryId" + i).html($("#countryFromAddress").val());
		$("#companyStateId" + i).html($("#stateFromAddress").val());
		$("#companyAddressId" + i).html($("#addressFromAddress").val());
		
					}
			}
	
	}	
	
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 09-Dec-2019
 * @codeFor : getAllPReturnAddressInfo()
 ******************************************************************************/
function getAllPReturnAddressInfo() {
	var unitId = $("#unitId").val();
	//var purchaseQtMasterId = $("#purchaseQtMasterId").val();
	var hiddenpartyMasterId = $("#hiddenpartyMasterId").val();

	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	inputs.push('purchaseQtMasterId=' + hiddenpartyMasterId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/purchasereturn/getAllPReturnAddressInfo",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setEditPurchaseQuotationMasterAddressInfo(r);
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 22-Nov-2019
 * @codeFor : setEditPurchaseQuotationMasterAddressInfo()
 ******************************************************************************/
function setEditPurchaseQuotationMasterAddressInfo(response){
	var count = 0;
	var htm = "";
	for ( var i = 0; i < response.partyMasterAddressInfoDto.length; i++) {
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
				+ ' <td class="col-md-1 center" id="addressInfoId'
				+ count
				+ '" style="display:none">'
				+ response.partyMasterAddressInfoDto[i].id
				+ '</td>'
				
				+ ' <td class="col-md-1 center" id="addressInfoId1'
				+ count
				+ '" style="display:none">'
				+ response.partyMasterAddressInfoDto[i].id
				+ '</td>'
				
				+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editAddressPurchaseQuotationMaster('+ response.partyMasterAddressInfoDto[i].id+ ',\'fromdb\')"><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false"  id="deletepurchaseaddress'+response.partyMasterAddressInfoDto[i].id+'" onclick="deletePurchaseQuotationSlaveInfo('+ response.partyMasterAddressInfoDto[i].id +',\'deleteaddress\')"><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	}
	$("#purchaseQuotationAddInfoList").html(htm);		

}

/************
* @author	: Dayanand Khandekar
* @date		: 28-Nov-2019
* @codeFor	: auttosuggestion for getQuatationMaster
 ************/
function getQuatationMaster(inputID) {
	var resultData = [];
	var vendorName = $("#" + inputID).val();

	if (vendorName == "" || vendorName == null || vendorName == "null"	|| vendorName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		
		return false;
	}

	var inputs = [];
	inputs.push('vendorName=' + vendorName);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/purchasequotation/getQuatationMaster",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstpurchasequotationmasterDto.length; j++) {
				var arrValue = response.lstpurchasequotationmasterDto[j].purchaseQutationId +"-"+response.lstpurchasequotationmasterDto[j].supplierName;
				var idValue = response.lstpurchasequotationmasterDto[j].purchaseQutationId;				
				var supplierName = response.lstpurchasequotationmasterDto[j].supplierName;
				resultData.push({
					ID : idValue,
					Name : supplierName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#quotationMasterByName .typeahead").html(template);
				$("div#quotationMasterByName .typeahead").show();

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
		var pQId = res[0];		
		var partyName = res[1];		
		getPurchaseQuotationMasterDetailsById(pQId);
		$("input#" + inputID).val(partyName);
	}
}

/************
* @author	: Vishant Pawar
* @date		: 09-Oct-2023
* @codeFor	: search by getPurchaseReturnMaster id
 ************/
function getPurchaseQuotationMasterDetailsById(pQId){	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('pQId=' + pQId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/purchasequotation/getPurchaseQuotationMasterDetailsById",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {			
				
			//setPurchaseQuotationMasterTemplate(r,"search");
			setPurchaseReturnMasterTemplate(r,"search");
				
			
		}
	});
	
}
/************
* @author	: Dayanand Khandekar
* @date		: 28-Nov-2019
* @codeFor	: search getPUrchaseMasterById
 ************/
function getPUrchaseMasterById(){
	var seachPartyMaster=$("#seachPartyMaster").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(seachPartyMaster)) {
		alert("Please Enter Number Only!");
		$("#txttaxRate").focus();
		return false;
	}
	getPurchaseQuotationMasterDetailsById(seachPartyMaster);
	
}
function printPurchaseReturnMaster(pQId){
	
	 window.open("inv_purchase_return_master_print.jsp?pQId="+pQId);
	
}
/************
* @author	: Vinod Udawant
* @date		: 18-Nov-2019
* @codeFor	: Add new row temp for MRN
 ************/
function addNewRowInTable(tableId,callFrom){
	
	var tbody = "";
	var rows = $('#'+tableId+' tbody tr').length;
	
	if(callFrom == "MRN"){
		
		tbody = getMrnTableBodyString(rows+1);
	}
if(callFrom == "purchasereturn"){
		
		tbody = getPurchaseReturnItemInfoBody(rows+1);
	}
	
	$('#'+tableId).append(tbody);
}

/************
* @author	: Vinod Udawant
* @date		: 18-Nov-2019
* @codeFor	: Remove row temp for MRN
 ************/
function removeRowFromTable(tableId,checkboxClass){	
	var rowCount=$("#RowCount").val();
	
	
	
	$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
	check(tableId);
	checkComp(tableId);
	totalDocDiscountPQ();
	totalDocQtyPQ();
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);
	totalAmount(1,rowCount);
	
}

/************
* @author	: Vinod Udawant
* @date		: 18-Nov-2019
* @codeFor	: For reorder srno after delete
 ************/
function check(tableId){
	obj=$('#'+tableId+' tbody tr').find('span');
	$.each( obj, function( key, value ) {
		id=value.id;
		$('#'+id).html(key+1);
	});
}
/************
* @author	: Vinod Udawant
* @date		: 18-Nov-2019
* @codeFor	: For reorder index ids of componant after delete
 ************/
function checkComp(tableId){
	
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
/************
* @author	: Vinod Udawant
* @date		: 18-Nov-2019
* @codeFor	: Check uncheck all checkbox in table
 ************/
function checkUncheckAll(masterChkId,slaveChkClass){
	
	if($("#"+masterChkId).is(":checked")){
		
		$('.'+slaveChkClass).prop("checked",true)
	}else{
		
		$('.'+slaveChkClass).prop("checked",false)
	}
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 5-Dec-2019
 * @codeFor : to Set Row Template To Body Of Item Info Table
 ******************************************************************************/
function getPurchaseReturnItemInfoBody(id) {
	var tbody = "";
	tbody = tbody
			+ "<tr class='newAdded' id='mutitr'"
			+ id
			+ "'>"
			+ "<td  class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkMrnItem' id='checkbox" 
			+ id
			+ "' name='checkbox'  value='"+id+"' checked='checked'></td>"
			
			+ "<td  class='col-md-4 col-xs-12 col-sm-4 center' ><span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemInfoId"+id+"' value='0'></td>"
			
			+ "<td  class='col-md-8 col-xs-12 col-sm-8 center'><input type='text' id='itemName" 
			+ id
			+ "' class='form-control input-SmallText' style='width: 250px;' style=' width: 60px;'>"
			+ "</td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text'  onkeypress='return validateNumbers(event)' id='itemQuantity"
			+ id
			+ "' onkeyup='totalAmount(this.id,"+id+")' class='form-control input-SmallText' style=' width: 60px;'>"
			+ "</td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text'  id='unitPriceId"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;'>"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' onkeyup='chkTradAmtorPercentage(this.id,"+id+")' onblur='calculTradeDis(this.id,"+ id+ ")' id='discountPerId"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;' >"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text'  onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+id+")' id='discountRsId"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;' >"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' id='discountAmtId"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;' >"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' id='baseAmountId"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;'>"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' id='gstId" 
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;' onkeyup='rowAmtCalForGst(this.id,"+id+"),autotaxCodeforItemGst("+id+",onchange)'>"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text'  onkeyup='rowAmtCal(this.id,"+id+"),autotaxCodeforItem("+id+",onchange)' id='igstId"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;'>"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text'  id='gstAmtId"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;' >"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text'  id='totalAmtId"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;'>"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text'  id='factor1"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;'>"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text'  id='factor2"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;'>"
			+ "</td>"
			+ "<td><input type='text'  id='factor3"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;'>"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text'  id='factor4"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;'>"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style=' width: 60px;'><input type='text' id='orderQtyId"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text'  readonly='' id='pendinQtyId"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;'>"
			+ "</td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text'  id='batchId"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;'>"
			+ "</td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style=' width: 60px;'><input type='text'  id='manufactureDate"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style=' width: 60px;'><input type='text'  id='expiryDate"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;' >"
			+ "</td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style=' width: 60px;' style='display:none'><input type='text'  id='itemMasterId"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;' >"
			+ "</td>"
			
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style=' width: 60px;' style='display:none'><input type='text'  id='hsnName"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;' >"
			+ "</td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style=' width: 60px;' style='display:none'><input type='text'  id='itemBatchCode"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 60px;' >"
			+ "</td>"
			
			/*+ "<td><input type='text' style='display:none;' id='itemInfoId"
			+ id
			+ "' class='form-control input-SmallText'  value="+0+">"
			+ "</td>"*/
			
			+ "</tr>";
	$("#RowCount").val(id);
	var totaltblsize = $("#RowCount").val();
	$("#totaltblsize").val(totaltblsize);
	$("#itemInfoDetails").append(tbody);
	//$("#bankID" + id).html($("#bankID").html());
}

function totalAmount(id,rowCount){
	
	
	var quantity = $('#' + id).val();
	
	var availableQty = $('#availableQty' + rowCount).html();
	var aq = availableQty.split(":")
	availableQty = parseInt(aq[1]); 
	if(parseInt(quantity)>availableQty){
		
		alert("Item QTY Is Greater Than Available QTY");
		return 0;
	}
	
	var rate = $('#unitPriceId' + rowCount).val();
	
	$('#orderQtyId' + rowCount).val(quantity);
//	$('#pendinQtyId' + rowCount).val(quantity);
	$('#baseAmountId' + rowCount).val(quantity * rate);
	$('#itemTotalAmount' + rowCount).val(quantity * rate);
	
	
	var sum = 0;
	var totalQty;
	var RowCount = $("#RowCount").val();
	
	for ( var i = 1; i <= RowCount; i++) {
		totalQty = $("#itemQuantity" + i).val();
		
		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}
    
	$("#totalItemId").val(sum);
	totalGrossAmt(1,rowCount);
	
	
}
function totalGrossAmt(id, rowCount) {
 	var sum = 0;
	var baseAmount;
	var RowCount = $("#RowCount").val();
	// var totalRow = $("#totalRow").val();
	var totaltblsize = $("#totaltblsize").val();

	for ( var i = 1; i <= totaltblsize; i++) {
		baseAmount = $("#baseAmountId" + i).val();
		if (baseAmount == null || baseAmount == undefined || baseAmount == '') {
			var flag = 1;
		} else {
			sum = parseFloat(sum) + parseFloat(baseAmount);
		}

	}
    // alert(sum);
	$("#txtGross").val(sum.toFixed(2));

}
function chkTradAmtorPercentage(id,rowcount)
{
	var txtPurchaseQuotationTrdeDiscountPercentage = $("#discountPerId"+rowcount).val();
	var txtTredeAmt = $("#discountPerId"+rowcount).val();
	
	 if(txtPurchaseQuotationTrdeDiscountPercentage == '' || txtPurchaseQuotationTrdeDiscountPercentage == null)
		 {
		 document.getElementById("discountRsId"+rowcount).disabled = false;
		 $("#discountAmtId"+rowcount).val(' ');
		 $("#baseAmountId"+rowcount).val(0);
		 $("#totalAmtId"+rowcount).val(' ');
		 }
	
	 if(!txtPurchaseQuotationTrdeDiscountPercentage == '' || !txtPurchaseQuotationTrdeDiscountPercentage == null)
	{
		 document.getElementById("discountRsId"+rowcount).disabled = true;
		 $("#discountRsId" + rowcount).val(0);
		 calculTradeDis("discountPerId",rowcount);
	 }
	
	
}
/********** Calculate treade discount AMt  and add new fun call as totalGrossAmt() *****************/

function calculTradeDis(id, rowCount) {
	
	var treadeDiscount = $(
			"#discountPerId" + rowCount).val();
	var oldbaseAmt = $('#baseAmountId' + rowCount).val();
	
	
	if(treadeDiscount > 100 )
	{
		alert("Trade Discount should not more than 100" );
		$("#discountPerId"+ rowCount).val('');
		
		$("#discountAmtId"+rowCount).val('');
		$("#baseAmountId"+rowCount).val(0);
		$("#totalAmtId"+rowCount).val('');
		
		var docqty = $("#itemQuantity" + rowCount).val();
		var unitprise = $("#unitPriceId" + rowCount).val();
		
		var baseAmt = docqty * unitprise;
		$("#baseAmountId"+rowCount).val(baseAmt.toFixed(2));
		
		$("#discountPerId"+ rowCount).focus();
		
		
		return false;
		
	}
	else
	{

	if (treadeDiscount) {
		
		$('#baseAmountId' + rowCount).val(0);
		$('#discountAmtId' + rowCount).val('');

		var docqty = $("#itemQuantity" + rowCount).val();
		var unitprise = $("#unitPriceId" + rowCount).val();

		var baseAmt = docqty * unitprise;

		var totalAmtInpercntage = baseAmt * treadeDiscount / 100;

		$('#discountAmtId' + rowCount).val(
				totalAmtInpercntage);

		var finalBaseAmt = baseAmt - totalAmtInpercntage;
		$('#baseAmountId' + rowCount).val(finalBaseAmt.toFixed(2));
		$('#itemTotalAmount' + rowCount).val(finalBaseAmt.toFixed(2));
		
		 
		var oldTotaldiscount = $("#totalDiscountId").val();
		
		var RowCount =$("#RowCount").val();
		var totaltblsize  = $("#totaltblsize").val();
		
		var FinaltradeDiscount = 0;
		for(var i=1; i<=totaltblsize; i++)
			{
			
			var txtPurchaseQuotationTrdeDiscountAmt = $("#discountAmtId"+ i).val();
			
			if(txtPurchaseQuotationTrdeDiscountAmt != '' && txtPurchaseQuotationTrdeDiscountAmt != null &&  txtPurchaseQuotationTrdeDiscountAmt !=  undefined)
			{
				  FinaltradeDiscount = (parseFloat(FinaltradeDiscount) + parseFloat(txtPurchaseQuotationTrdeDiscountAmt)).toFixed(2);
			}
			
			}
		
		
		$("#totalDiscountId").val(FinaltradeDiscount);
		
	}
	}
	rowAmtCal(1,rowCount);
	 
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);
	/*rowCount(1,rowCount);*/
}
 
function rowAmtCal(id, rowCount) {

	var taxAmt = $("#igstId" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#totalAmtId' + rowCount).val(' ');
		return false;
	} 
	var baseAmt = $('#baseAmountId' + rowCount).val();
	if(baseAmt == " " || baseAmt == null)
	{
	$("#totalAmtId").val(' ');
	return false;
	}
	else
	{
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#baseAmountId' + rowCount).val();
		var taxAmt = $("#igstId" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$("#itemIgstAmt" + rowCount).val(finalcaltaxanmount); //add tax amount in Rs purchase quotation  @author:paras @Date:23nov
		
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmountAddingtax = finalsumofRowAmt.toFixed(2);
		
		$('#totalAmtId' + rowCount).val(finalRowAmountAddingtax);
		$('#itemTotalAmount' + rowCount).val(finalRowAmountAddingtax);
	}

}

/***** Calculate Total Gross AMt  of Base Amt*******/
function totalGrossAmt(id, rowCount) {
	 	var sum = 0;
		var baseAmount;
		var RowCount = $("#RowCount").val();
		// var totalRow = $("#totalRow").val();
		var totaltblsize = $("#totaltblsize").val();

		for ( var i = 1; i <= totaltblsize; i++) {
			baseAmount = $("#baseAmountId" + i).val();
			if (baseAmount == null || baseAmount == undefined || baseAmount == '') {
				var flag = 1;
			} else {
				sum = parseFloat(sum) + parseFloat(baseAmount);
			}

		}
	    // alert(sum);
		$("#txtGross").val(sum.toFixed(2));

	}

/***** Calculate Total Vat AMt  *******/
function totalVatAmt(id, rowCount) {
	 
	 	var sum = 0;
		var baseAmount;
		var RowCount = $("#RowCount").val();
		var totaltblsize = $("#totaltblsize").val();
		var caltaxonBaseAmt;
		// var totalRow = $("#totalRow").val();

		for ( var i = 1; i <= totaltblsize; i++) {
			baseAmount = $("#baseAmountId" + i).val();
			var taxAmt = $("#igstId" + i).val();
			if (baseAmount == null || taxAmt == null ||taxAmt == undefined || taxAmt =='' || baseAmount == undefined || baseAmount == '') {
				var flag = 1;
			} else {
				
				caltaxonBaseAmt = parseFloat(baseAmount) * parseFloat(taxAmt) / 100;
				
				var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
				
				sum = parseFloat(sum) + parseFloat(finalcaltaxanmount);
			}

		}
		
		$("#txtVat").val(sum.toFixed(2));
		$("#txtTotalVat").val(sum.toFixed(2));
		$("#textVat").val(sum.toFixed(2));
	
		var totalgrossAmt = $("#txtGross").val(); 
		$("#txtNetAmt").val((parseFloat(sum) + parseFloat(totalgrossAmt)).toFixed(2));

	}


/*calculate Total TradeDis Discount IN rupess */ 

function calculTradeDisRs(id, rowCount) {
	
	var treadeDiscountRs = $("#discountRsId" + rowCount).val();
	var oldbaseAmt = $('#baseAmountId' + rowCount).val();
	
	
	
	if (treadeDiscountRs) {
		
		$('#baseAmountId' + rowCount).val('');
		$('#discountAmtId' + rowCount).val('');

		var docqty = $("#itemQuantity" + rowCount).val();
		var unitprise = $("#unitPriceId" + rowCount).val();

		var baseAmt = parseFloat(docqty) * parseFloat(unitprise);

		var finaltotalbaseAmt = parseFloat((baseAmt)) - parseFloat(treadeDiscountRs);

		$('#discountAmtId' + rowCount).val(treadeDiscountRs);

		
		$('#baseAmountId' + rowCount).val(finaltotalbaseAmt.toFixed(2));
		
		 
		
		
		var RowCount =$("#RowCount").val();
		var totaltblsize  = $("#totaltblsize").val();
		
		var FinaltradeDiscount = 0;
		for(var i=1; i<=totaltblsize; i++)
			{
			
			var txtPurchaseQuotationTrdeDiscountAmt = $("#discountAmtId"+ i).val();
			
			if(txtPurchaseQuotationTrdeDiscountAmt != '' && txtPurchaseQuotationTrdeDiscountAmt != null &&  txtPurchaseQuotationTrdeDiscountAmt !=  undefined)
			{
				  FinaltradeDiscount = (parseFloat(FinaltradeDiscount) + parseFloat(txtPurchaseQuotationTrdeDiscountAmt)).toFixed(2);
			}
			
			}
		
		
		$("#totalDiscountId").val(FinaltradeDiscount);
		
	}

}
function chKTradAmt(id,rowcount)
{
	var txtPurchaseQuotationTrdeDiscountInRupess = $("#discountRsId"+rowcount).val();
	
	if(txtPurchaseQuotationTrdeDiscountInRupess == "" || txtPurchaseQuotationTrdeDiscountInRupess == null )
		{
		 document.getElementById("discountPerId"+rowcount).disabled = false;
		 $("#discountAmtId"+rowcount).val(' ');
		 $("#baseAmountId"+rowcount).val(0);
		 $("#totalAmtId"+rowcount).val(' ');
		 $("#totalDiscountId").val('0');
		// return false;
		
		}
	
	if(txtPurchaseQuotationTrdeDiscountInRupess !="" || txtPurchaseQuotationTrdeDiscountInRupess != null )
		{
		 document.getElementById("discountPerId"+rowcount).disabled = true;
		 $("#discountPerId" + rowcount).val(0);
		 var docqty = $("#itemQuantity" +rowcount).val();
			var unitprise = $("#unitPriceId" + rowcount).val();
			var baseAmt = docqty * unitprise;
			var FinalBaseAmt = baseAmt - txtPurchaseQuotationTrdeDiscountInRupess;
			
			$("#discountAmtId"+rowcount).val(txtPurchaseQuotationTrdeDiscountInRupess);
			$("#baseAmountId"+rowcount).val(FinalBaseAmt);
			rowAmtCal(1,rowcount);
			calculTradeDisRs("discountRsId",rowcount);
			totalGrossAmt(1,rowcount);
			totalVatAmt(1,rowcount);
		 
		}
	
}

function  applyTaxforItemexpense(inputID){
	
	//var txtPurchaseOrderTaxCode_ = "";
	// remove the wite space and empty option

		//txtPurchaseOrderTaxCode_ = txtPurchaseOrderTaxCode_ + ($("#"+inputID).val() + ",");

	/*if(txtPurchaseOrderTaxCode_== "")
	{
		alert("please Apply atleast one tax for Item");
		return false;
	}*/
	//txtPurchaseOrderTaxCode_= txtPurchaseOrderTaxCode_.substring(0, txtPurchaseOrderTaxCode_.length-1);
	
//	var rowCount = inputID.split("_");
	//var Finalrateandtax = txtPurchaseOrderTaxCode_.split(",");
var	Finalrateandtax=inputID;
	
	 var sumofRate = 0;
	 for(var i=0;i<Finalrateandtax.length;i++)
		{ 
		finalrat = Finalrateandtax[i];
		var taxRate =  finalrat.split("_");
		finalRateamt = taxRate[1];
		if(finalRateamt==null ||finalRateamt ==undefined){
			finalRateamt = taxRate[0];
		}
		sumofRate = parseFloat(sumofRate)+parseFloat(finalRateamt); 
		if(isNaN(sumofRate)){
			sumofRate = finalRateamt;
		}
		if(isNaN(finalrat)){
			finalrat== finalRateamt;
		}

		}
	 var rowCount ="onchange";
	 if(rowCount=="var rowCount1"){
		 $("#gstId"+rowCount[1]).val(sumofRate);
			$("#igstId"+rowCount[1]).val(sumofRate);
		 
	 }else{
		 $("#gstId"+rowCount[1]).val(sumofRate);
	    $("#igstId"+rowCount[1]).val(sumofRate);
	 }
	/*$("#txtPurchaseQuotationTaxCodePO_"+rowCount[1]).val(finalrat);
	$("#txtPurchaseQuotationTaxAmount_"+rowCount[1]).val(sumofRate);*/
	//$('#lstBoxforTax').html();
	//$("#ApplyTaxforItem").hide('hide');
	rowAmtCalNEW(1,rowCount[1]);
	totalVatAmtnEW(1,rowCount[1]);
	
}

function rowAmtCalNEW(id, rowCount) {

	var taxAmt = $("#igstId" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#totalAmtId' + rowCount).val('');
	}
	var baseAmt = $('#baseAmountId' + rowCount).val();
	if(baseAmt == " " || baseAmt == null)
	{
	$("#totalAmtId"+ rowCount).val(' ');
	return false;
	}
	
	else {
		
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#baseAmountId' + rowCount).val();
		var taxAmt = $("#igstId" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$('#itemIgstAmt'+ rowCount).val(finalcaltaxanmount); //add tax amount in Rs @author:paras @Date:23nov 
		 
		 finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		 var finalRowAmtcalculationgTax = finalsumofRowAmt.toFixed(2);
		$('#totalAmtId' + rowCount).val(finalRowAmtcalculationgTax);
		$('#itemTotalAmount' + rowCount).val(finalRowAmtcalculationgTax);
		
		
	}

}

function totalVatAmtnEW(id, rowCount) {
	 
 	var sum = 0;
	var baseAmount;
	var RowCount = $("#RowCount").val();
	var caltaxonBaseAmt;
	// var totalRow = $("#totalRow").val();
	var totaltblsize = $("#totaltblsize").val();
	for ( var i = 1; i <= totaltblsize; i++) {
		baseAmount = $("#baseAmountId" + i).val();
		var taxAmt = $("#igstId" + i).val();
		if (baseAmount == null || taxAmt == null ||taxAmt == undefined || taxAmt =='' || baseAmount == undefined || baseAmount == '') {
			var flag = 1;
		} else {
			
			caltaxonBaseAmt = parseFloat(baseAmount) * parseFloat(taxAmt) / 100;
			
			var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
			
			sum = parseFloat(sum) + parseFloat(finalcaltaxanmount);
		}

	}
	
	$("#txtVat").val(sum.toFixed(2));
	$("#txtTotalVat").val(sum.toFixed(2));
	$("#textVat").val(sum.toFixed(2));

	var totalgrossAmt = $("#txtGross").val(); 
	$("#txtNetAmt").val((parseFloat(sum) + parseFloat(totalgrossAmt)).toFixed(2));

}
function autotaxCodeforItem(rowCount,onchange){
	
	var igstId = $("#igstId" + rowCount).val();
	
	applyTaxforItemexpense(igstId);
}

/************** Total Doc Discount ***********/

function totalDocDiscountPQ() {
	var sum = 0;
	var tradeAmt;
	var RowCount = $("#RowCount").val();

	for ( var i = 1; i <= RowCount; i++) {
		tradeAmt = $("#discountAmtId" + i).val();
		if (tradeAmt == null || tradeAmt == undefined || tradeAmt == '') {
			var flag = 1;
		} else 
		{
			sum = (parseFloat(sum) + parseFloat(tradeAmt)).toFixed(2);;
		}

	}

	$("#totalDiscountId").val(sum);
	$("#RowCount").val(RowCount);

}

function totalDocQtyPQ() {
	var sum = 0;
	var totalQty;
	var RowCount = $("#RowCount").val();

	// var totalRow = $("#totalRow").val();

	for ( var i = 1; i <= RowCount; i++) {
		totalQty = $("#itemQuantity" + i).val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}

	$("#itemQuantity").val(sum);
	$("#RowCount").val(RowCount);

}

function isFloatingPoint(id, minLen, maxLen) {
 	var min = parseInt(minLen);
 	var max = parseInt(maxLen);
    
 	// alert("number field");
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
/*** calculatSpeDisct @author Dayanand @Date:2 Dec 2019 ***/
function calculatSpeDisct() {
	var GrossAmt = parseFloat($('#txtGross').val());
	var less = parseFloat($('#txtLess').val());
	var finalvatafterreduece = 0;
	var txtSplDisc = 0;
	var txtVat = 0;
	

	
	if ($('#txtSplDisc').val() == '' || $('#txtSplDisc').val() == 0)
	{
	totalVatAmt(1, rowCount);
	calculateTotalTax();
	calculateTotalLess();
	calculateNetAmount();
	}
	if ($('#txtVat').val() != '' && $('#txtVat').val().length > 0)
		txtVat = parseFloat($('#txtVat').val());
	if ($('#txtSplDisc').val() != '' && $('#txtSplDisc').val().length > 0)
		txtSplDisc = parseFloat($('#txtSplDisc').val());
	 
	 finalvatafterreduece =	parseFloat(txtVat) - (parseFloat(txtVat) * parseFloat(txtSplDisc)/100);
	 
	$('#txtVat').val(finalvatafterreduece.toFixed(2));
	
	calculateTotalTax();
	calculateTotalLess();
	calculateNetAmount();
	 
}

/****** onblur calculateTotalTax under the Heading of TAx info @author Dayanand @Date:2 Dec 2019********/
function calculateTotalTax() {
		var txtVat = 0;
		var txtExVat = 0;
		var lbt = 0;
		var cst = 0;
		var totalTax = 0;
	    var gross=0;
	    var less=0;	
	    
		if ($('#txtVat').val() != '' && $('#txtVat').val().length > 0)
			txtVat = parseFloat($('#txtVat').val());

		if ($('#txtlbt').val() != '' && $('#txtlbt').val().length > 0)
			lbt = parseFloat($('#txtlbt').val());

		if ($('#txtcst').val() != '' && $('#txtcst').val().length > 0)
			cst = parseFloat($('#txtcst').val());
		
		if ($('#txtExVat').val() != '' && $('#txtExVat').val().length > 0)
			txtExVat = parseFloat($('#txtExVat').val());
	
		$('#txtTotalVat').val(parseFloat(txtVat) + parseFloat(txtExVat));

		totalTax = parseFloat(txtVat) + parseFloat(txtExVat) + parseFloat(lbt)
				+ parseFloat(cst);

		$('#textVat').val((totalTax).toFixed(2));
	
		
		
		
		$('#txtTotalVat').val((totalTax).toFixed(2));
		calculateNetAmount();
	}

/**** calculateNetAmount @author Dayanand  @Date 2 Dec 2019*****/
function calculateNetAmount() {
		// net amount
		var gross = 0;
		var less = 0;
		var add = 0;
		var total = 0;

		if ($('#txtGross').val() != '' && $('#txtGross').val().length > 0) {
			gross = parseFloat($('#txtGross').val());
		}
		if ($('#txtLess').val() != '' && $('#txtLess').val().length > 0) {
			less = parseFloat($('#txtLess').val());
		}
		if ($('#txtAdd').val() != '' && $('#txtAdd').val().length > 0) {
			add = parseFloat($('#txtAdd').val());
		}

		var vat = 0;
		if (gross > 0)
			total = (gross - less) + add;
		if ($('#textVat').val() != '' && $('#textVat').val().length > 0)
			vat = parseFloat($('#textVat').val());

		$('#txtNetAmt').val((total + vat).toFixed(2));
		//resetAllValues();
	}

/***** calculateTotalLess @Author Dayanand @Date:2 Dec 2019 ****/
function calculateTotalLess() {
		var itemDisc = 0;
		var schmDisc = 0;
		var splDisc = 0;
		var debitAmt1 = 0;
		var cd1 = 0;
		var totalLess = 0;

		if ($('#txtSplDisc').val() != '' && $('#txtSplDisc').val().length > 0)
			splDisc = parseFloat($('#txtSplDisc').val());

		if ($('#txtdebitAmt1').val() != '' && $('#txtdebitAmt1').val().length > 0)
			debitAmt1 = parseFloat($('#txtdebitAmt1').val());

		if ($('#txtCDAmt').val() != '' && $('#txtCDAmt').val().length > 0)
			cd1 = parseFloat($('#txtCDAmt').val());

		totalLess = parseFloat(splDisc) + parseFloat(debitAmt1) + parseFloat(cd1);

		$('#txtLess').val(totalLess.toFixed(2));

		calculateNetAmount();
	}
/**** calculateCDAmt @Author:Dayanand  @Date:2 Dec 2019 *******/
function calculateCDAmt()
{
	var gross = 0;
	var itemDis = 0;
	var cd=0;
	var cdAmt=0;
	var amt=0;
	if ($('#txtGross').val() != '' && $('#txtGross').val().length > 0) {
		gross = parseFloat($('#txtGross').val());
	}
	
	
	if ($('#txtCD1').val() != '' && $('#txtCD1').val().length > 0) {
		cd = parseFloat($('#txtCD1').val());
	}
	
	 //amt=(gross-itemDis);
	if(parseFloat(gross)>parseFloat(cd))
		{
		cdAmt = parseFloat(gross)*(parseFloat(cd)/100);
	 	$('#txtCDAmt').val(cdAmt.toFixed(2));
	 	calculateTotalLess();
		
		}
	else
		{
		alert("CD is less then Gross Amount!");
		$('#txtCDAmt').val('0');
		$('#txtCD1').val('0');
		calculateTotalLess();
		return false;
		}
	
}

/**** calculateTotalAdd onblure under heading of Add  @Author:Dayanand  @Date:2 Dec 2019 ****/
function calculateTotalAdd() {
		

		var octroi = 0;
		var surcharge = 0;
		var creditAmt = 0;
		var freight = 0;
		var totalAdd = 0;

		if ($('#txtOctroi').val() != '' && $('#txtOctroi').val().length > 0)
			octroi = parseFloat($('#txtOctroi').val());

		if ($('#txtSurcharge').val() != '' && $('#txtSurcharge').val().length > 0)
			surcharge = parseFloat($('#txtSurcharge').val());

		if ($('#txtCreditAmt').val() != '' && $('#txtCreditAmt').val().length > 0)
			creditAmt = parseFloat($('#txtCreditAmt').val());

		if ($('#txtFreight').val() != '' && $('#txtFreight').val().length > 0)
			freight = parseFloat($('#txtFreight').val());

		totalAdd = parseFloat(octroi) + parseFloat(surcharge) + parseFloat(creditAmt) + parseFloat(freight);

		$('#txtAdd').val(totalAdd.toFixed(2));
		calculateNetAmount();
	}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 11-Dec-2019
 * @codeFor : closeItemPurchaseDetailsModal
 ******************************************************************************/
function closeItemPurchaseDetailsModal(){
	refreshPurchaseReturnMaster();
	$('#itemMasterModal').modal('hide');
	
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 11-Dec-2019
 * @codeFor : refreshPurchaseReturnMaster
 ******************************************************************************/
function refreshPurchaseReturnMaster(){	
	
	
		 $("#purchaseReturnMasterId").val(0);	
		 $("#mbNo").val("");
		 $("#mbNo").attr("placeholder","Enter Mobile No");
		 $("#referenceNo").val("");
		 $("#referenceNo").attr("placeholder","Enter Reference No");
		 $("#supplierAddress").val("");
		 $("#supplierAddress").attr("placeholder","Enter Supplier Address");
		 $("#supplierName").val("");
		 $("#supplierName").attr("placeholder","Enter Supplier Name");
		 
		 
		 $("#purchaseInvoiceId").val(0);
			 $("#returnSeries").val(0);
			 $("#returnStatus").val(0);
			$("#supplierState2").val(0);
			
			 $("#returnId").val(0);
			 $("#outWardNo").val(0);
			 $("#hiddenpartyMasterId").val(0);
			 $("#termconditionId").val(" ");
			
			 $("#txtSplDisc").val(0);
			 $("#txtdebitAmt1").val(0);
			 $("#txtCD1").val(0);
			 $("#txtCDAmt").val(0);
			$("#txtOctroi").val(0);
			 $("#txtSurcharge").val(0);
			 $("#txtCreditAmt").val(0);
			 $("#txtFreight").val(0);
			 $("#txtVat").val(0);
			 $("#txtlbt").val(0);
			 $("#txtcst").val(0);
			 $("#txtExVat").val(0);
			 $("#txtTotalVat").val(0);
			 $("#txtLess").val(0);
			 $("#txtAdd").val(0);
			
			 $("#txtGross").val(0);
			 $("#textVat").val(0);
			$("#txtNetAmt").val(0);
			
			 $("#totalItemId").val(0);
			
			 $("#totalDiscountId").val(0);
			 $('#contactFormId')[0].reset();
			 $('#addressFormId')[0].reset();
			 
			
			
			var tableHeaderRowCount = 1;
			var table = document.getElementById('ContactInfoTable');
			var rowCount = table.rows.length;
			for (var i = tableHeaderRowCount; i < rowCount; i++) {
			    table.deleteRow(tableHeaderRowCount);
			}
			
			var tableHeaderRowCount1 = 1;
			var table = document.getElementById('AddressInfoTable');
			var rowCount = table.rows.length;
			for (var i = tableHeaderRowCount1; i < rowCount; i++) {
			    table.deleteRow(tableHeaderRowCount1);
			}
			
			var tableHeaderRowCount2 = 1;
			var table = document.getElementById('itemInfoTable');
			var rowCount = table.rows.length;
			for (var i = tableHeaderRowCount2; i < rowCount; i++) {
			    table.deleteRow(tableHeaderRowCount2);
			}
			
	
	
}

/************
* @author	: Dayanand Khandekar
* @date		: 28-Nov-2019
* @codeFor	: auttosuggestion for getPurchaseReturnMaster
 ************/
function getPurchaseReturnMaster(inputID) {
	var resultData = [];
	var vendorName = $("#" + inputID).val();

	if (vendorName == "" || vendorName == null || vendorName == "null"	|| vendorName == undefined) {

		alert("Please enter search value");
		$("#" + inputID).focus();
		
		return false;
	}

	var inputs = [];
	inputs.push('vendorName=' + vendorName);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/purchasereturn/getPurchaseReturnMaster",
		cache : false,
		success : function(response) {

			var template = "";
			for ( var j = 0; j < response.lstpurchasereturnmasterDto.length; j++) {
				var arrValue = response.lstpurchasereturnmasterDto[j].purchaseReturnMasterId +"-"+response.lstpurchasereturnmasterDto[j].supplierName;
				var idValue = response.lstpurchasereturnmasterDto[j].purchaseReturnMasterId;				
				var supplierName = response.lstpurchasereturnmasterDto[j].supplierName;
				resultData.push({
					ID : idValue,
					Name : supplierName
				});
				template = template + '<li data-value="' + idValue
						+ '" class=""><a href="#">' + arrValue + '</a></li>';
			}

			setTimeout(function() {
				$("div#quotationMasterByName .typeahead").html(template);
				$("div#quotationMasterByName .typeahead").show();

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
		var pQId = res[0];		
		var partyName = res[1];		
		getPurchaseReturnMasterDetailsById(pQId);
		$("#seachPurchaseReturn").val(pQId);
		$("input#" + inputID).val(partyName);
	}
}
function getPurchaseReturnMasterDetailsById(pRId){	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('pRId=' + pRId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/purchasereturn/getPurchaseReturnMasterDetailsById",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {			
				
			//setPurchaseQuotationMasterTemplate(r,"search");
			setPurchaseReturnMasterTemplate(r,"search");
				
			
		}
	});
	
}
/************
* @author	: Dayanand Khandekar
* @date		: 28-Nov-2019
* @codeFor	: search getPUrchaseMasterById
 ************/
function getPUrchaseMasterById(){
	var seachPartyMaster=$("#seachPartyMaster").val();
	var pattern = /^[0-9]+\.?[0-9]*$/;
	if (!pattern.test(seachPartyMaster)) {
		alert("Please Enter Number Only!");
		$("#txttaxRate").focus();
		return false;
	}
	getPurchaseQuotationMasterDetailsById(seachPartyMaster);
	
}



/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 29-jan-2020
 * @codeFor : get all getAllPurchaseInvoice master 
 ******************************************************************************/

function getAllPurchaseInvoice2() {

	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/invPurchaseInvoice/getAllPurchaseInvoice",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			var divContent = "<option value='0'>select</option>";
	           
            for ( var i = 0; i < r.lstPurchaseInvoiceDto.length; i++){             
	                divContent = divContent + "<option value='" + r.lstPurchaseInvoiceDto[i].id + "'  >"
	                        + r.lstPurchaseInvoiceDto[i].id + "</option>";
            }
           
            $("#purchaseInvoiceId").html(divContent);
            $("#purchaseInvoiceId").select2();
            $("#purchaseInvoiceId").on("change", function () { 
            	//getTemplateDataById(); 
            });
		}		
	});
}

function setPartyModalAddressInfoToPurcchaseQuotation(response){
	var count = 0;
	var htm = "";
	
	for ( var i = 0; i < response.partyMasterAddressInfoDto.length; i++) {
		
		count++;
		htm = htm
				+ '<tr class="newAdded"> '
				+ ' <td class="col-md-1 center">'
				+ count
				+ '</td>'
				+ ' <td class="col-md-1 center"><input id="radioId" name="rdTreat" type="radio" value="'+count+'">'
			
				+ '</td>'
				
				+ ' <td  class="hidden"><input id="countId" type="text" value='+count+'>'
				
				+ '</td>'
				
				+ ' <td class="col-md-1 center" id="address'
				+ count
				+ '" >'
				+ response.partyMasterAddressInfoDto[i].address
				+ '</td>'			
				
		
				 + '</tr>';
		
		
	}
	$("#partyMasterAddressSlaveRecordList").html(htm);
	
	//showpartyMasterDetailsModal();
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 10-Dec-2019
 * @codeFor : setPartyModalContactInfoToPurcchaseQuotation
 ******************************************************************************/
function setPartyModalContactInfoToPurcchaseQuotation(response){
	
	var count = 0;
	var htm = "";
	for ( var i = 0; i < response.partyMasterContactInfoDto.length; i++) {
		
		$("#mbNo").val(response.partyMasterContactInfoDto[i].contactPhoneNumber1);
		count++;
	htm = htm
			+ '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ count
			+ '</td>'
			+ ' <td class="col-md-1 center"><input id="radioId1" name="rdTreat1" type="radio" value="'+count+'">'
			
			+ '</td>'
	
			+ ' <td class="col-md-1 center" id="contactPhoneOne'
			+ count
			+ '" >'
			+ response.partyMasterContactInfoDto[i].contactPhoneNumber1
			+ '</td>'
		 + '</tr>';
	}
	$("#partyMasterContactSlaveRecordList").html(htm);
	
	
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 10-Dec-2019
 * @codeFor : setPartyModalInfoToTableOnPurchaseReturn
 ******************************************************************************/
function setPartyModalInfoToTableOnPurchaseReturn(){	
	
		$("input[name='rdTreat']:checked").each(function() {		
				
				var inx = $(this).val();
				
				$("#supplierAddress").val($("#address"+inx).html());					
			});
			
		$("input[name='rdTreat1']:checked").each(function() {	
			
				var inx = $(this).val();
			
				$("#mbNo").val($("#contactPhoneOne"+inx).html());					
			});
			
}



/************
* @author	: Dayanand Khandekar
* @date		: 16-Jan-2020
* @codeFor	:setParyMasterStateToPurchaseQuotation
 ************/
function setParyMasterStateToPurchaseReturn(r){
		
		var divContent = "";
        divContent = divContent
                + "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";
       
        for ( var i = 0; i < r.partyMasterAddressInfoDto.length; i++) {                            
            	divContent = divContent + "<option value='" + r.partyMasterAddressInfoDto[i].stateId + "'>"
                    + r.partyMasterAddressInfoDto[i].state + "</option>";
        }
        divContent = divContent + "</select>";
        $("#supplierState2").html(divContent);
        $("#supplierState2").select2();
}



function showpartyMasterDetailsModal(){
	$('#purchasequotationModalId').modal('show');
	
}
function closepartyMasterDetailsModal(){
	$('#purchasequotationModalId').modal('hide');
	
}
/************
* @author	: Dayanand Khandekar
* @date		: 16-Jan-2020
* @codeFor	:rowAmtCalForGst added for applying gst charges
 ************/
function rowAmtCalForGst(id,rowCount){
	var taxAmt = $("#gstId" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#totalAmtId' + rowCount).val(' ');
		return false;
	} 
	var baseAmt = $('#baseAmountId' + rowCount).val();
	if(baseAmt == " " || baseAmt == null)
	{
	$("#totalAmtId").val(' ');
	return false;
	}
	else
	{
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#baseAmountId' + rowCount).val();
		var taxAmt = $("#gstId" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$("#gstAmtId" + rowCount).val(finalcaltaxanmount); //add tax amount in Rs purchase quotation  @author:paras @Date:23nov
		
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmountAddingtax = finalsumofRowAmt.toFixed(2);
		
		$('#totalAmtId' + rowCount).val(finalRowAmountAddingtax);
	}
}
/************
* @author	: Dayanand Khandekar
* @date		: 16-Jan-2020
* @codeFor	:autotaxCodeforItemGst added for applying total gst calculation
 ************/
function autotaxCodeforItemGst(rowCount,onchange){
	
	var gstId = $("#gstId" + rowCount).val();
	
	applyTaxforItemexpenseOfGstAmt(gstId);
}

/************
* @author	: Dayanand Khandekar
* @date		: 16-Jan-2020
* @codeFor	:applyTaxforItemexpenseOfGstAmt added for applying total gst calculation
 ************/
function applyTaxforItemexpenseOfGstAmt(inputID) {

	var Finalrateandtax = inputID;

	var sumofRate = 0;
	for ( var i = 0; i < Finalrateandtax.length; i++) {
		finalrat = Finalrateandtax[i];
		var taxRate = finalrat.split("_");
		finalRateamt = taxRate[1];
		if (finalRateamt == null || finalRateamt == undefined) {
			finalRateamt = taxRate[0];
		}
		sumofRate = parseFloat(sumofRate) + parseFloat(finalRateamt);
		if (isNaN(sumofRate)) {
			sumofRate = finalRateamt;
		}
		if (isNaN(finalrat)) {
			finalrat == finalRateamt;
		}

	}
	var rowCount = "onchange";
	if (rowCount == "var rowCount1") {
		$("#gstId" + rowCount[1]).val(sumofRate);
		$("#igstId" + rowCount[1]).val(sumofRate);

	} else {
		$("#gstId" + rowCount[1]).val(sumofRate);
		$("#igstId" + rowCount[1]).val(sumofRate);
	}

	rowAmtCalNEWForGst(1, rowCount[1]);
	totalVatAmtnEWForGSt(1, rowCount[1]);

}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 16-Jan-2020
 * @codeFor :rowAmtCalNEWForGst added for applying total gst
 *          calculation
 ******************************************************************************/

	function rowAmtCalNEWForGst(id, rowCount) {

	var taxAmt = $("#gstId" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#totalAmtId' + rowCount).val('');
	}
	var baseAmt = $('#baseAmountId' + rowCount).val();
	if (baseAmt == " " || baseAmt == null) {
		$("#totalAmtId" + rowCount).val(' ');
		return false;
	}

	else {

		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#baseAmountId' + rowCount).val();
		var taxAmt = $("#gstId" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$('#gstAmtId' + rowCount).val(finalcaltaxanmount); 

		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmtcalculationgTax = finalsumofRowAmt.toFixed(2);
		$('#totalAmtId' + rowCount).val(finalRowAmtcalculationgTax);
		$('#itemTotalAmount' + rowCount).val(finalRowAmtcalculationgTax);

	}

}
	/*******************************************************************************
	 * @author : Dayanand Khandekar
	 * @date : 16-Jan-2020
	 * @codeFor :totalVatAmtnEWForGSt added for applying total gst
	 *          calculation
	 ******************************************************************************/

	function totalVatAmtnEWForGSt(id, rowCount) {

	var sum = 0;
	var baseAmount;
	var RowCount = $("#RowCount").val();
	var caltaxonBaseAmt;
	// var totalRow = $("#totalRow").val();
	var totaltblsize = $("#totaltblsize").val();
	for ( var i = 1; i <= totaltblsize; i++) {
		baseAmount = $("#baseAmountId" + i).val();
		var taxAmt = $("#gstId" + i).val();
		if (baseAmount == null || taxAmt == null || taxAmt == undefined
				|| taxAmt == '' || baseAmount == undefined || baseAmount == '') {
			var flag = 1;
		} else {

			caltaxonBaseAmt = parseFloat(baseAmount) * parseFloat(taxAmt) / 100;

			var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);

			sum = parseFloat(sum) + parseFloat(finalcaltaxanmount);
		}

	}

	$("#txtVat").val(sum.toFixed(2));
	$("#txtTotalVat").val(sum.toFixed(2));
	$("#textVat").val(sum.toFixed(2));

	var totalgrossAmt = $("#txtGross").val();
	$("#txtNetAmt").val(
			(parseFloat(sum) + parseFloat(totalgrossAmt)).toFixed(2));

}
	
	
	
	/*******************************************************************************
	 * @author : Vishnu Thorat
	 * @date : 10-Nov-2019
	 * @codeFor : get all purchase invoice master
	 ******************************************************************************/

	function getAllPurchaseInvoice() {

		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/invPurchaseInvoice/getAllPurchaseInvoice",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				var divContent = "";
		        divContent = divContent + "<select name='State Name' class='col-md-12'><option value='0'>--Select State--</option>";
		         for ( var i = 0; i < r.lstPurchaseInvoiceDto.length; i++) {          
		        	 divContent = divContent + "<option value='" + r.lstPurchaseInvoiceDto[i].id + "'>"+ r.lstPurchaseInvoiceDto[i].id + "</option>";
		            }
		            divContent = divContent + "</select>";
	            $("#purchaseInvoiceId").html(divContent);
	            $("#purchaseInvoiceId").select2();
				setTimeout(function() {
					userAccess();
				}, 100);
			}
		});
	}
	
	/*******************************************************************************
	 * @author : Vishnu Thorat
	 * @date : 10-Nov-2019
	 * @codeFor : edit purchase invoice
	 ******************************************************************************/
	function editPurchaseInvoice(purchaseInvoiceId) {
		var inputs = [];
		inputs.push('id=' + purchaseInvoiceId);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					url : "ehat/invPurchaseInvoice/editPurchaseInvoice",
					data : str + "&reqType=AJAX",
					error : function() {
						alert('error');
					},
					success : function(r) {
						
						$("#purchaseReturnMasterId").val(0);
						$("#mbNo").val(r.purInvSupplierMobile);
						$("#referenceNo").val(r.referenceNumber);	
						$("#returnDate").val(r.returnDate);
						$("#deliveryDate").val(r.deleviryDate);
						$("#supplierAddress").val(r.purInvSupplierAddress);
						$("#supplierName").val(r.purInvSupplierName);
						$("#returnSeries").val(r.returnSeries);
						//$("#returnStatus").val(r.returnStatus);
						$("#supplierState2").val(r.supplierState);
						
						$("#returnId").val(r.returnNo);
						$("#outWardNo").val(r.outWardNo);
						$("#purchaseInvoiceId").val(r.purchaseInvoiceId);
						
						$("#hiddenpartyMasterId").val(r.partyMasterDto.id);
						getPartyMasterDetailsById(r.partyMasterDto.id);
						
					$("#txtSplDisc").val(r.lessSpecialDiscount);
						 $("#txtdebitAmt1").val(r.lessDebitAmount);
						 $("#xtCD1").val(r.lessCDPercent1);
						 $("#txtCDAmt").val(r.lessCDPercent2);
						 $("#txtOctroi").val(r.addOctroi);
						$("#txtSurcharge").val(r.addSurcharge);
						 $("#txtCreditAmt").val(r.addCreditAmount);
						 $("#txtFreight").val(r.addFreight);
						 $("#txtVat").val(r.taxVat);
						 $("#txtlbt").val(r.taxLBT);
						 $("#txtcst").val(r.taxCST);
						 $("#txtExVat").val(r.taxExVat);
						 $("#txtTotalVat").val(r.taxTotalTaxes);
						 $("#txtLess").val(r.grossLessAmount);
						 $("#txtAdd").val(r.grossAddAmount);
						
						 $("#txtGross").val(r.grossAmount);
						 $("#textVat").val(r.grossTaxes);
						 $("#txtNetAmt").val(r.grossNetAmount);
						 $("#totalItemId").val(r.totalItemQuantity);
						 $("#totalDiscountId").val(r.totalItemDiscount);
						 setEditPurchaseInvoiceMasterSlaveInfo(r);
					}
				});
	}
	
	
	function viewPurchaseInvoiceMasterDetails(){
		var purchaseInvoiceId=$("#purchaseInvoiceId").val();
		editPurchaseInvoice(purchaseInvoiceId);
		
	}
	
	
	
	function setEditPurchaseInvoiceMasterSlaveInfo(response){

		var length = 0;
		if(response.lstPurchaseInvoiceItemDto.length != 0 && response.lstPurchaseInvoiceItemDto !=null && response.lstPurchaseInvoiceItemDto != ""){
			
			length = response.lstPurchaseInvoiceItemDto.length;
			var htm = "";
			var id = 0;
			for ( var i = 0; i < length; i++) {
				id++;
				htm = htm
				+ "<tr class='newAdded' id='mutitr'"
				+ id
				+ "'>"
				+ "<td  class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkMrnItem' value='"+id+"' "
				+ id
				+ " name='checkbox'  checked='checked' id="+response.lstPurchaseInvoiceItemDto[i].itemId+"></td>"
				
				+ "<td  class='col-md-4 col-xs-12 col-sm-4 center'> <span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemInfoId"+id+"' value="+response.lstPurchaseInvoiceItemDto[i].itemId+"></td>"	
				
				+ "<td  class='col-md-8 col-xs-12 col-sm-8 center'><input type='text' style='width: 100px;' id='itemName" 
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemName+"'>"
				+ "</td>"
				
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;'   onkeypress='return validateNumbers(event)'  onkeyup='totalAmount(this.id,"+id+")' id='itemQuantity"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemQuantity+"'>"
				+ "</td>"
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'> <input type='text' style='width: 80px;' id='unitPriceId"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemUnitPrice+"'>"
				+ "</td>"
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;'  onkeyup='chkTradAmtorPercentage(this.id,"+id+")' onblur='calculTradeDis(this.id,"+ id+ ")' id='discountPerId" 
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemDiscountPer+"'>"
				+ "</td>"
				+ "<td><input type='text' style='width: 80px;'  onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+id+")' id='discountRsId"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemDiscountRs+"'>"
				+ "</td>"
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='discountAmtId"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemDiscountAmt+"'>"
				+ "</td>"
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='baseAmountId"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemBaseAmt+"'>"
				+ "</td>"
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' ' id='gstId" 
				+ id
				+ "' class='form-control input-SmallText' onkeyup='rowAmtCalForGst(this.id,"+id+"),autotaxCodeforItemGst("+id+",onchange)' value='"+response.lstPurchaseInvoiceItemDto[i].itemGst+"' disabled>"
				+ "</td>"
				+ "<td><input type='text' style='width: 80px;' onkeyup='rowAmtCal(this.id,"+id+"),autotaxCodeforItem("+id+",onchange)' id='igstId"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemIgst+"'>"
				+ "</td>"
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='gstAmtId"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemGstAmt+"' >"
				+ "</td>"
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='totalAmtId"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemTotalAmt+"'>"
				+ "</td>"
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='factor1"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemFactor1+"'>"
				+ "</td>"
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='factor2"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemFactor2+"'>"
				+ "</td>"
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='factor3"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemFactor3+"'>"
				+ "</td>"
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='factor4"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemFactor4+"'>"
				+ "</td>"
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'> <input type='text' style='width: 80px;' id='orderQtyId"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemReceivedQty+"'>"
				+ "</td>"
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='pendinQtyId"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemPendingQty+"'>"
				+ "</td>"
				
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='batchId"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemBatchNo+"'>"
				+ "</td>"
				
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='manufactureDate"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemManufactureDate+"'>"
				+ "</td>"
				
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' disabled id='expiryDate"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemExpireDate+"'>"
				+ "</td>"
				
				
				+ "<td style='display:none' class='col-md-6 col-xs-12 col-sm-6 center'> <input type='text' style='width: 80px;' id='itemMasterId"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].itemId+"'>"
				+ "</td>"
				
				+ "<td style='display:none' class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='hsnName"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstPurchaseInvoiceItemDto[i].taxCode+"'>"
				+ "</td>"
				
				
				+ "<td   style='display:none'  class='col-md-6 col-xs-12 col-sm-6 center' style=' width: 60px;' ><input type='text'  id='itemBatchCode"
				+ id
				+ "' class='form-control input-SmallText' style=' width: 60px;' value='"+response.lstPurchaseInvoiceItemDto[i].itemBatchNo+"' >"
				+ "</td>"
				
			/*	+ "<td><input type='text' style='display:none;' id='itemInfoId"
				+ id
				+ "' class='form-control input-SmallText'  value="+response.lstpurchasereturnitemInfoDto[i].itemId+">"
				+ "</td>"*/			
				+ "</tr>";
			}
			$("#RowCount").val(id);
			var totaltblsize = $("#RowCount").val();
			$("#totaltblsize").val(totaltblsize);
			$("#itemInfoDetails").html(htm);
		}
		
		if(response.partyMasterDto.partyMasterContactInfoDto.length != 0 && response.partyMasterDto.partyMasterContactInfoDto !=null && response.partyMasterDto.partyMasterContactInfoDto != ""){
			length = response.partyMasterDto.partyMasterContactInfoDto.length;
			var count = 0;
			var htm = "";
			for ( var i = 0; i < response.partyMasterDto.partyMasterContactInfoDto.length; i++) {		
				count++;
			htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactPersonId'
					+ count
					+ '">'
					+ response.partyMasterDto.partyMasterContactInfoDto[i].contactName 
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactDesignationId'
					+ count
					+ '">'
					+ response.partyMasterDto.partyMasterContactInfoDto[i].contactDesignation
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contatcAddressId'
					+ count
					+ '">'
					+ response.partyMasterDto.partyMasterContactInfoDto[i].contactAddress
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactGenderId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterDto.partyMasterContactInfoDto[i].contactGender
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactDobId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterDto.partyMasterContactInfoDto[i].contactDob
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactPhoneOneId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterDto.partyMasterContactInfoDto[i].contactPhoneNumber1
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactPhoneSecondId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterDto.partyMasterContactInfoDto[i].contactPhoneNumber2
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactMailId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterDto.partyMasterContactInfoDto[i].contactEmail
					+ '</td>'
					+ ' <td class="col-md-1 center" id="contactInfoId'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterDto.partyMasterContactInfoDto[i].id
					+ '</td>'
					
					+ ' <td class="col-md-1 center" id="contactInfoId1'
					+ count
					+ '" style="display:none">'
					+ response.partyMasterDto.partyMasterContactInfoDto[i].id
					+ '</td>'
					
					+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editContactPurchaseQuiotationInfoMaster('
					+ response.partyMasterDto.partyMasterContactInfoDto[i].id+',\'fromdb\')"><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id="deletepurchasecontact'+response.partyMasterDto.partyMasterContactInfoDto[i].id+'" onclick="deletePurchaseQuotationSlaveInfo('+ response.partyMasterDto.partyMasterContactInfoDto[i].id +',\'deletecontact\')"><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			$("#purchaseQuotationContactInfo").html(htm);
			}
			
		}
		if(response.partyMasterDto.partyMasterAddressInfoDto.length != 0 && response.partyMasterDto.partyMasterAddressInfoDto !=null && response.partyMasterDto.partyMasterAddressInfoDto != ""){
			length = response.partyMasterDto.partyMasterAddressInfoDto.length;
			var count = 0;
			var htm = "";
			for ( var i = 0; i < response.partyMasterDto.partyMasterAddressInfoDto.length; i++) {
				count++;
				htm = htm
						+ '<tr class="newAdded"> '
						+ ' <td class="col-md-1 center">'
						+ count
						+ '</td>'
						+ ' <td class="col-md-1 center" id="companyNameId'
						+ count
						+ '">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].companyName
						+ '</td>'
						+ ' <td class="col-md-1 center" id="companyCountryId'
						+ count
						+ '">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].country
						+ '</td>'
						+ ' <td class="col-md-1 center" id="companyCityId'
						+ count
						+ '">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].city
						+ '</td>'
						+ ' <td class="col-md-1 center" id="companyAddressId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].address
						+ '</td>'
						+ ' <td class="col-md-1 center" id="companyAddressTypeId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].addressType
						+ '</td>'
						+ ' <td class="col-md-1 center" id="companyStreetId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].street
						+ '</td>'
						+ ' <td class="col-md-1 center" id="companyAreaId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].area
						+ '</td>'
						+ ' <td class="col-md-1 center" id="companyPinId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].pin
						+ '</td>'
						+ ' <td class="col-md-1 center" id="companyStateId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].state
						+ '</td>'
						+ ' <td class="col-md-1 center" id="addressInfoId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].id
						+ '</td>'
						
						+ ' <td class="col-md-1 center" id="addressInfoId1'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].id
						+ '</td>'
						
						+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editAddressPurchaseQuotationMaster('+ response.partyMasterDto.partyMasterAddressInfoDto[i].id+ ',\'fromdb\')"><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false"  id="deletepurchaseaddress'+response.partyMasterDto.partyMasterAddressInfoDto[i].id+'" onclick="deletePurchaseQuotationSlaveInfo('+ response.partyMasterDto.partyMasterAddressInfoDto[i].id +',\'deleteaddress\')"><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
				$("#purchaseQuotationAddInfoList").html(htm);		
			}
					
		}
			/*if(response.lstpurcaseTermConditionInfoDto.length != 0 && response.lstpurcaseTermConditionInfoDto !=null && response.lstpurcaseTermConditionInfoDto != ""){
				length = response.lstpurcaseTermConditionInfoDto.length;
				var count = 0;
				var htm = "";
				for ( var i = 0; i < length; i++) {
					count++;
					htm = htm
							+ '<tr class="newAdded"> '
							+ ' <td class="col-md-1 center">'
							+ count
							+ '</td>'
							+ ' <td class="col-md-1 center" id="termConditionId'
							+ count
							+ '">'
							+ response.lstpurcaseTermConditionInfoDto[i].termConditionAddress
							+ '</td>'
							+ ' <td class="col-md-1 center" id="termInfoId'
							+ count
							+ '" style="display:none">'
							+ response.lstpurcaseTermConditionInfoDto[i].termConditionId
							+ '</td>'
							+ ' <td class="col-md-1 center" id="termInfoId1'
							+ count
							+ '" style="display:none">'
							+ response.lstpurcaseTermConditionInfoDto[i].termConditionId
							+ '</td>'
							
							+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editTermPurchaseQuotationMaster('+ response.lstpurcaseTermConditionInfoDto[i].termConditionId
							+ ',\'fromdb\')"><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false"  id="deletepurchaseterm'+response.lstpurcaseTermConditionInfoDto[i].termConditionId+'" onclick="deletePurchaseQuotationSlaveInfo('+ response.lstpurcaseTermConditionInfoDto[i].termConditionId +',\'deleteterm\')"><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
					$("#termConditionDetails").html(htm);
				}
			
		}
	*/
		getAllInventoryTermAndCondition();
	}
	
	function setAddressInfoList(partyMasterAddressInfoDtoDetails, addressInfoId,
			companyAddressType, companyNameId, companyAddressId, companyStreetId,
			companyPinId, companyAreaId, companyCityName, cityId,
			companyTalukaName, talukaId, companyDistrictName, districtId, companyStateName, stateId, companyCountryName, countryId, userId, unitId) {

			partyMasterAddressInfoDtoDetails.partyMasterAddressInfoDto.push({
				id: addressInfoId,
				addressType: companyAddressType,
				companyName: companyNameId,
				address: companyAddressId,
				street: companyStreetId,
				pin: companyPinId,
				area: companyAreaId,
				city: companyCityName,
				cityId: cityId,
				talukaName: companyTalukaName,
				talukaId: talukaId,
				districtName: companyDistrictName,
				districtId: districtId,
				state: companyStateName,
				stateId: stateId,
				country: companyCountryName,
				countryId: countryId,
				createdBy: userId,
				unitId: unitId,
				updatedBy: userId,

			});
		}	
	
	function setEditGoodReceiptNoteSlaveInfo2(response, callFrom,callFrom1) {
		var length = 0;
		var userState= $("#userState").val();
		var venderState= $("#hiddenVenderState").val();
		if (callFrom === "purchaseReturn") {
			


			var length = 0;
			if(response.lstGoodReceiptNoteItemDto.length != 0 && response.lstGoodReceiptNoteItemDto !=null && response.lstGoodReceiptNoteItemDto != ""){
				
				length = response.lstGoodReceiptNoteItemDto.length;
				var htm = "";
				var id = 0;
				for ( var i = 0; i < length; i++) {
					
					var expirydate = response.lstGoodReceiptNoteItemDto[i].batchMasterDto.itemBatchExpDate;
					var date = new Date(expirydate);
					var day = date.getDate();
					var month = date.getMonth()+1;
					if(day<10){
						day = "0"+day;
					}
					if(month<10){
						month = "0"+month;
					}
					var dateFormat = date.getFullYear() + "-" + month + "-" + day;
					
					id++;
					htm = htm
					+ "<tr class='newAdded' id='mutitr'"
					+ id
					+ "'>"
					+ "<td  class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkMrnItem' value='"+id+"' "
					+ id
					+ " name='checkbox'  checked='checked' id="+response.lstGoodReceiptNoteItemDto[i].itemId+"></td>"
					
					+ "<td  class='col-md-4 col-xs-12 col-sm-4 center'> <span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemInfoId"+id+"' value="+0+"><input type='hidden' id='itemMasterId"+id+"' value="+response.lstGoodReceiptNoteItemDto[i].itemId+"></td>"	
					
					+ "<td  class='col-md-8 col-xs-12 col-sm-8 center'><input type='text' style='width: 100px;' id='itemName" 
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemName+"'>"
					+ "</td>"
					
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;'   onkeypress='return validateNumbers(event)'  onkeyup='totalAmount(this.id,"+id+")' id='itemQuantity"
					+ id
				//	+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemReceivedQty+"'><lable id='availableQty"+id+"'>Available QTY:"+response.lstGoodReceiptNoteItemDto[i].itemReceivedQty+" </lable>"
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].availableQuantity+"'><lable id='availableQty"+id+"'>Available QTY:"+response.lstGoodReceiptNoteItemDto[i].availableQuantity+" </lable>"
					+ "</td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'> <input type='text' style='width: 80px;' id='unitPriceId"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemUnitPrice+"'><lable id='uomUnitLatestFactorId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitLatestFactorName+" </lable>"
					+ "</td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;'  onkeyup='chkTradAmtorPercentage(this.id,"+id+")' onblur='calculTradeDis(this.id,"+ id+ ")' id='discountPerId" 
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemDiscountPer+"'>"
					+ "</td>"
					+ "<td><input type='text' style='width: 80px;'  onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+id+")' id='discountRsId"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemDiscountRs+"'>"
					+ "</td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='discountAmtId"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemDiscountAmt+"'>"
					+ "</td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='baseAmountId"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemBaseAmt+"'>"
					+ "</td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='gstId"
					+ id
					+ "' class='form-control input-SmallText' onkeyup='rowAmtCalForGst(this.id,"+id+"),autotaxCodeforItemGst("+id+",onchange)' value='"+response.lstGoodReceiptNoteItemDto[i].itemGst+"' disabled>"
					+ "</td>"
					+ "<td><input type='text' style='width: 80px;' onkeyup='rowAmtCal(this.id,"+id+"),autotaxCodeforItem("+id+",onchange)' id='igstId"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemIgst+"'>"
					+ "</td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='gstAmtId"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemGstAmt+"' disabled='disabled'>"
					+ "</td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='itemIgstAmt"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].igstAmount+"' >"
					+ "</td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='totalAmtId"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemTotalAmt+"'>"
					+ "</td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='oneFactor"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemFactor1+"'>"
					+ "</td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='twoFactor"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemFactor2+"'>"
					+ "</td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='threeFactor"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemFactor3+"'>"
					+ "</td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='fourFactor"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemFactor4+"'>"
					+ "</td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'> <input type='text' style='width: 80px;' id='orderQtyId"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemReceivedQty+"' disabled='disabled'>"
					+ "</td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'> <input type='text' style='width: 80px;' id='orderReceiveQty"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemReceivedQty+"' disabled='disabled'>"
					+ "</td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='pendinQtyId"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemPendingQty+"' disabled='disabled'>"
					+ "</td>"
					
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='batchId"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemBatchNo+"' disabled='disabled'>"
					+ "</td>"
					
					htm = htm + "<td class='col-md-3 col-xs-6 col-sm-3 center'><input style='width: 100px;' type='button' id='getBatchDetailsId"+ id + "' class='btn btn-xs btn-success editUserAccess'  data-toggle='modal' data-target='#batchWiseGoodReceiptNoteModal' value='Batch Details' disabled onclick='getGoodReceiptNoteItemBatchDetails(" + id +","+response.lstGoodReceiptNoteItemDto[i].itemId+");'> </td>";
					htm = htm	+	"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style='width: 100px;' id='batchKeyId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itembatchNo +
					"'> </td>" 
					
					
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' disabled='disabled' id='manufactureDate"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemManufactureDate+"'>"
					+ "</td>"
					
						
					
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' disabled='disabled' id='expiryDate"
					+ id
					+ "' class='form-control input-SmallText' value='"+dateFormat+"'>"
					+ "</td>"
					
					
					htm = htm	+
					"<td class='col-md-6 col-xs-12 col-sm-6 center' '><input  style='width: 150px;'  type='text' id='itemTotalAmount" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemTotalAmt +
					"'> </td>"
					
					+ "<td style='display:none' class='col-md-6 col-xs-12 col-sm-6 center'> <input type='text' style='width: 80px;' id='itemMasterId"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].itemId+"'>"
					+ "</td>"
					
					+ "<td style='display:none' class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 80px;' id='hsnName"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.lstGoodReceiptNoteItemDto[i].taxCode+"'>"
					+ "</td>"
					
					
					+ "<td   style='display:none'  class='col-md-6 col-xs-12 col-sm-6 center' style=' width: 60px;' ><input type='text'  id='itemBatchCode"
					+ id
					+ "' class='form-control input-SmallText' style=' width: 60px;' value='"+response.lstGoodReceiptNoteItemDto[i].itemBatchNo+"' >"
					+ "</td>"
					
				/*	+ "<td><input type='text' style='display:none;' id='itemInfoId"
					+ id
					+ "' class='form-control input-SmallText'  value="+response.lstpurchasereturnitemInfoDto[i].itemId+">"
					+ "</td>"*/			
					+ "</tr>";
				}
				$("#RowCount").val(id);
				var totaltblsize = $("#RowCount").val();
				$("#totaltblsize").val(totaltblsize);
				$("#itemInfoDetails").html(htm);
			}
			
			if(response.partyMasterDto.partyMasterContactInfoDto.length != 0 && response.partyMasterDto.partyMasterContactInfoDto !=null && response.partyMasterDto.partyMasterContactInfoDto != ""){
				length = response.partyMasterDto.partyMasterContactInfoDto.length;
				var count = 0;
				var htm = "";
				for ( var i = 0; i < response.partyMasterDto.partyMasterContactInfoDto.length; i++) {		
					count++;
				htm = htm
						+ '<tr class="newAdded"> '
						+ ' <td class="col-md-1 center">'
						+ count
						+ '</td>'
						+ ' <td class="col-md-1 center" id="contactPersonId'
						+ count
						+ '">'
						+ response.partyMasterDto.partyMasterContactInfoDto[i].contactName 
						+ '</td>'
						+ ' <td class="col-md-1 center" id="contactDesignationId'
						+ count
						+ '">'
						+ response.partyMasterDto.partyMasterContactInfoDto[i].contactDesignation
						+ '</td>'
						+ ' <td class="col-md-1 center" id="contatcAddressId'
						+ count
						+ '">'
						+ response.partyMasterDto.partyMasterContactInfoDto[i].contactAddress
						+ '</td>'
						+ ' <td class="col-md-1 center" id="contactGenderId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterContactInfoDto[i].contactGender
						+ '</td>'
						+ ' <td class="col-md-1 center" id="contactDobId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterContactInfoDto[i].contactDob
						+ '</td>'
						+ ' <td class="col-md-1 center" id="contactPhoneOneId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterContactInfoDto[i].contactPhoneNumber1
						+ '</td>'
						+ ' <td class="col-md-1 center" id="contactPhoneSecondId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterContactInfoDto[i].contactPhoneNumber2
						+ '</td>'
						+ ' <td class="col-md-1 center" id="contactMailId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterContactInfoDto[i].contactEmail
						+ '</td>'
						+ ' <td class="col-md-1 center" id="contactInfoId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterContactInfoDto[i].id
						+ '</td>'
						
						+ ' <td class="col-md-1 center" id="contactInfoId1'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterContactInfoDto[i].id
						+ '</td>'
						
						+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editContactPurchaseQuiotationInfoMaster('
						+ response.partyMasterDto.partyMasterContactInfoDto[i].id+',\'fromdb\')"><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id="deletepurchasecontact'+response.partyMasterDto.partyMasterContactInfoDto[i].id+'" onclick="deletePurchaseQuotationSlaveInfo('+ response.partyMasterDto.partyMasterContactInfoDto[i].id +',\'deletecontact\')"><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
				$("#purchaseQuotationContactInfo").html(htm);
				}
				
			}
			if(response.partyMasterDto.partyMasterAddressInfoDto.length != 0 && response.partyMasterDto.partyMasterAddressInfoDto !=null && response.partyMasterDto.partyMasterAddressInfoDto != ""){
				length = response.partyMasterDto.partyMasterAddressInfoDto.length;
				var count = 0;
				var htm = "";
				for ( var i = 0; i < response.partyMasterDto.partyMasterAddressInfoDto.length; i++) {

					count++;
					htm = htm +
						'<tr class="newAdded"> ' +
						' <td class="col-md-1 center">' +
						count +
						'</td>' +
						' <td class="col-md-1 center" id="companyNameId' +
						count +
						'">' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].companyName +
						'</td>' +
						' <td class="col-md-1 center" id="companyCountryId' +
						count +
						'">' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].country +
						'</td>' +
						' <td class="col-md-1 center" id="companyCityId' +
						count +
						'">' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].city +
						'</td>' +
						' <td class="col-md-1 center" id="companyAddressId' +
						count +
						'" style="display:none">' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].address +
						'</td>' +
						' <td class="col-md-1 center" id="companyAddressTypeId' +
						count +
						'" style="display:none">' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].addressType +
						'</td>' +
						' <td class="col-md-1 center" id="companyStreetId' +
						count +
						'" style="display:none">' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].street +
						'</td>' +
						' <td class="col-md-1 center" id="companyAreaId' +
						count +
						'" style="display:none">' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].area +
						'</td>' +
						' <td class="col-md-1 center" id="companyPinId' +
						count +
						'" style="display:none">' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].pin +
						'</td>' +
						' <td class="col-md-1 center" id="companyStateId' +
						count +
						'" style="display:none">' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].state +
						'</td>' +
						' <td class="col-md-1 center" id="companyDistrictId' +
						count +
						'" style="display:none">' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].districtName +
						'</td>' +
						' <td class="col-md-1 center" id="companyTalukaId' +
						count +
						'" style="display:none">' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].talukaName +
						'</td>' +
						' <td class="col-md-1 center" id="hiddenCountryNameId' +
						count +
						'" style="display:none">' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].countryId +
						'</td>' +
						' <td class="col-md-1 center" id="hiddenStateNameId' +
						count +
						'" style="display:none">' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].stateId +
						'</td>' +
						' <td class="col-md-1 center" id="hiddenDistrictNameId' +
						count +
						'" style="display:none">' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].districtId +
						'</td>' +
						' <td class="col-md-1 center" id="hiddenTalukaNameId' +
						count +
						'" style="display:none">' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].talukaId +
						'</td>' +
						' <td class="col-md-1 center" id="hiddenCityNameId' +
						count +
						'" style="display:none">' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].cityId +
						'</td>' +
						' <td class="col-md-1 center" id="addressInfoId' +
						count +
						'" style="display:none">' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].id +
						'</td>' +
						' <td class="col-md-1 center" id="addressInfoId1'
						+ count
						+ '" style="display:none">'
						+ count
						+ '</td>' +
						' <td class="col-md-1 center"><input type="hidden" id="editAddressPartMaster' +
						count + '" value="' + count + '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editAddressInfoPartyMaster(' +
						+ count +
						',\'fromDB\')"><i class="fa fa-edit"></i></button></td>' +
						' <td class="col-md-1 center">' +
						'	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="false" id ="deleteAddressPartMaster' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].id +
						'"  onclick="deletePartyMasterSlave(' +
						response.partyMasterDto.partyMasterAddressInfoDto[i].id +
						',\'deleteAddress\')" ' +
						'><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
					$("#purchaseQuotationAddInfoList").html(htm);
				
					
					
					/*
					count++;
					htm = htm
							+ '<tr class="newAdded"> '
							+ ' <td class="col-md-1 center">'
							+ count
							+ '</td>'
							+ ' <td class="col-md-1 center" id="companyNameId'
							+ count
							+ '">'
							+ response.partyMasterDto.partyMasterAddressInfoDto[i].companyName
							+ '</td>'
							+ ' <td class="col-md-1 center" id="companyCountryId'
							+ count
							+ '">'
							+ response.partyMasterDto.partyMasterAddressInfoDto[i].country
							+ '</td>'
							+ ' <td class="col-md-1 center" id="companyCityId'
							+ count
							+ '">'
							+ response.partyMasterDto.partyMasterAddressInfoDto[i].city
							+ '</td>'
							+ ' <td class="col-md-1 center" id="companyAddressId'
							+ count
							+ '" style="display:none">'
							+ response.partyMasterDto.partyMasterAddressInfoDto[i].address
							+ '</td>'
							+ ' <td class="col-md-1 center" id="companyAddressTypeId'
							+ count
							+ '" style="display:none">'
							+ response.partyMasterDto.partyMasterAddressInfoDto[i].addressType
							+ '</td>'
							+ ' <td class="col-md-1 center" id="companyStreetId'
							+ count
							+ '" style="display:none">'
							+ response.partyMasterDto.partyMasterAddressInfoDto[i].street
							+ '</td>'
							+ ' <td class="col-md-1 center" id="companyAreaId'
							+ count
							+ '" style="display:none">'
							+ response.partyMasterDto.partyMasterAddressInfoDto[i].area
							+ '</td>'
							+ ' <td class="col-md-1 center" id="companyPinId'
							+ count
							+ '" style="display:none">'
							+ response.partyMasterDto.partyMasterAddressInfoDto[i].pin
							+ '</td>'
							+ ' <td class="col-md-1 center" id="companyStateId'
							+ count
							+ '" style="display:none">'
							+ response.partyMasterDto.partyMasterAddressInfoDto[i].state
							+ '</td>'
							+ ' <td class="col-md-1 center" id="addressInfoId'
							+ count
							+ '" style="display:none">'
							+ response.partyMasterDto.partyMasterAddressInfoDto[i].id
							
							
							'</td>' +
							'<td class="col-md-1 center" id="hiddenCountryNameId2' +
							count +
							'" style="display:none">' +
							response.partyMasterDto.partyMasterAddressInfoDto[i].countryId +
							'</td>' +
							' <td class="col-md-1 center" id="hiddenStateNameId' +
							count +
							'" style="display:none">' +
							response.partyMasterDto.partyMasterAddressInfoDto[i].stateId +
							'</td>' +
							' <td class="col-md-1 center" id="hiddenDistrictNameId' +
							count +
							'" style="display:none">' +
							response.partyMasterDto.partyMasterAddressInfoDto[i].districtId +
							'</td>' +
							' <td class="col-md-1 center" id="hiddenTalukaNameId' +
							count +
							'" style="display:none">' +
							response.partyMasterDto.partyMasterAddressInfoDto[i].talukaId +
							'</td>' +
							' <td class="col-md-1 center" id="hiddenCityNameId' +
							count +
							'" style="display:none">' +
							response.partyMasterDto.partyMasterAddressInfoDto[i].cityId +
							'</td>' +
							' <td class="col-md-1 center" id="addressInfoId' +
							count +
							'" style="display:none">' +
							response.partyMasterDto.partyMasterAddressInfoDto[i].id +
							'</td>' +
							' <td class="col-md-1 center" id="addressInfoId1'
							+ count
							+ '" style="display:none">'
							+ count
							+ '</td>' +
							' <td class="col-md-1 center"><input type="hidden" id="editAddressPartMaster' +
							count + '" value="' + count + '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editAddressInfoPartyMaster(' +
							+ count +
							',\'fromDB\')"><i class="fa fa-edit"></i></button></td>' +
							' <td class="col-md-1 center">' +
							'	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="false" id ="deleteAddressPartMaster' +
							response.partyMasterDto.partyMasterAddressInfoDto[i].id +
							'"  onclick="deletePartyMasterSlave(' +
							response.partyMasterDto.partyMasterAddressInfoDto[i].id +
							',\'deleteAddress\')" ' +
							'><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
							
							+ '</td>'
							
							+ ' <td class="col-md-1 center" id="addressInfoId1'
							+ count
							+ '" style="display:none">'
							+ response.partyMasterDto.partyMasterAddressInfoDto[i].id
							+ '</td>'
							
							+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editAddressPurchaseQuotationMaster('+ response.partyMasterDto.partyMasterAddressInfoDto[i].id+ ',\'fromdb\')"><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false"  id="deletepurchaseaddress'+response.partyMasterDto.partyMasterAddressInfoDto[i].id+'" onclick="deletePurchaseQuotationSlaveInfo('+ response.partyMasterDto.partyMasterAddressInfoDto[i].id +',\'deleteaddress\')"><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
					$("#purchaseQuotationAddInfoList").html(htm);		
				*/}
						
			}
				/*if(response.lstpurcaseTermConditionInfoDto.length != 0 && response.lstpurcaseTermConditionInfoDto !=null && response.lstpurcaseTermConditionInfoDto != ""){
					length = response.lstpurcaseTermConditionInfoDto.length;
					var count = 0;
					var htm = "";
					for ( var i = 0; i < length; i++) {
						count++;
						htm = htm
								+ '<tr class="newAdded"> '
								+ ' <td class="col-md-1 center">'
								+ count
								+ '</td>'
								+ ' <td class="col-md-1 center" id="termConditionId'
								+ count
								+ '">'
								+ response.lstpurcaseTermConditionInfoDto[i].termConditionAddress
								+ '</td>'
								+ ' <td class="col-md-1 center" id="termInfoId'
								+ count
								+ '" style="display:none">'
								+ response.lstpurcaseTermConditionInfoDto[i].termConditionId
								+ '</td>'
								+ ' <td class="col-md-1 center" id="termInfoId1'
								+ count
								+ '" style="display:none">'
								+ response.lstpurcaseTermConditionInfoDto[i].termConditionId
								+ '</td>'
								
								+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editTermPurchaseQuotationMaster('+ response.lstpurcaseTermConditionInfoDto[i].termConditionId
								+ ',\'fromdb\')"><i class="fa fa-edit"></i></button></td>'
								+ ' <td class="col-md-1 center">'
								+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false"  id="deletepurchaseterm'+response.lstpurcaseTermConditionInfoDto[i].termConditionId+'" onclick="deletePurchaseQuotationSlaveInfo('+ response.lstpurcaseTermConditionInfoDto[i].termConditionId +',\'deleteterm\')"><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
						$("#termConditionDetails").html(htm);
					}
				
			}
		*/
			getAllInventoryTermAndCondition();
		
		}
	}
	
		
	
	