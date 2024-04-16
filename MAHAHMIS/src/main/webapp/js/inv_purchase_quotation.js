
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

function setItemInfoList(itemInfoDtoDetails, itemInfoId,itemName, itemQuantity, unitPriceId,discountPerId, discountRsId, discountAmtId,baseAmountId,gstId,igstId,gstAmtId,totalAmtId,
		factor1,factor2,factor3,factor4,orderQtyId,pendinQtyId,batchId,unitName,hsnName,itemMasterId,userId,unitId,itemToatIgstAmt,itemBaseIgstGstAmt,hsnCodeNamePurchaseQuotation){
			itemInfoDtoDetails.lstpurchaseitemInfoDto.push({
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
		itemUnitId : unitName,
		hsnName : hsnName,
		itemMasterId:itemMasterId,
		createdBy:userId,
		unitId:unitId,
		updatedBy:userId,
		itemToatIgstAmt:itemToatIgstAmt,
		itemBaseIgstGstAmt:itemBaseIgstGstAmt,
		hsnNameValue : hsnCodeNamePurchaseQuotation
	});
}
		
function setPurchaseQutationContactInfoList(purchasequotationContactInfoDtoDetails, contactPersonId,contactDesignationId, contatcAddressId, contactGenderId, contactDobId,
				contactPhoneOneId, contactPhoneSecondId, contactMailId,contactInfoId,userId,unitId) {
	purchasequotationContactInfoDtoDetails.partyMasterContactInfoDto.push({
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


function setPurchaseQuotationAddressInfoList(purchaeQuotationAddressInfoDtoDetails, companyNameId,
		companyCityId, companyStreetId, companyPinId, companyAreaId,
		companyCountryId, companyStateId, companyAddressId, companyAddressType,addressInfoId,userId,unitId) {
	
	purchaeQuotationAddressInfoDtoDetails.partyMasterAddressInfoDto.push({
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
 * @date : 11-Nov-2019
 * @codeFor : savePurchaseQuotationMaster()
 ******************************************************************************/

function savePurchaseQuotationMaster() {
	var purchaseQutationId = $("#purchaseQtMasterId").val();
	var mobileNumber = $("#mbNo").val();
	var referenceNumber = $("#referenceNo").val();	
	var quotationDate = $("#quotationDate").val();
	var deleviryDate = $("#deliveryDate").val();
	var supplierAddress = $("#supplierAddress").val();
	if(supplierAddress==null||supplierAddress=="null"||supplierAddress==""||supplierAddress==0){
		alert("please insert Party Address");
		$("#supplierAddress").focus();
		return false;
	}
	if(mobileNumber==null||mobileNumber=="null"||mobileNumber==""||mobileNumber==0){
		alert("please insert Party Mobile Number");
		$("#mbNo").focus();
		return false;
	}
	
	var supplierName = $("#supplierName").val();
	var quotationSeries = $("#quotationSeries").val();
	var quotationStatus = $("#quotationStatus").val();
	var supplierState = $("#supplierState").val();
	$("#hiddensupplierstate").val(supplierState);//added by dayanand to determine to apply gst or igst
	var quotationExDate = $("#quotationExDate").val();
	var quotationNo = $("#quotationNo").val();
	var partyMasterId = $("#hiddenpartyMasterId").val();
	var termandCondition = "ttt";
	
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
	var userState = $("#userState").val();
	var partyGstNo = $("#partyGstNo").val();
	var totalGstAmt = $("#totalGstAmt").val();
	var totalIGstAmt = $("#totaliGstAmt").val();
	//added by Rohit
	var totalAmount = $("#itemTotalAmt").val();
	
	quotationNo=0;
	

	// validation
		if (mobileNumber != "") {
			var pattern = /^([0-9])*$/;
			if (!pattern.test(mobileNumber)) {
				alert(" Mobile Number should be of digits only!");
				$("#mobileNumber").focus();
				return false;
			}
		}
		
		if (referenceNumber != "" && referenceNumber !=null && referenceNumber !=undefined) {
			var pattern = /^([0-9])*$/;
			if (!pattern.test(referenceNumber)) {
				alert(" Reference Number should be of digits only!");
				$("#mobileNumber").focus();
				return false;
			}
		}
		
		
		if(quotationDate==""||quotationDate==undefined||quotationDate==null||quotationDate=="null"){
			alert("Quotation Date Should Not Be Null!");
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
		


		if (quotationSeries == 0) {
			alert('please select quotation Series');
			$("#masterGroup").focus();
			return false;
		}
		
		if (quotationStatus == 0) {
			alert('please select quotation Status');
			$("#masterGroup").focus();
			return false;
		}
		supplierState=1;
		if (supplierState == 0) {
			alert('please select Supplier State');
			$("#masterGroup").focus();
			return false;
		}
		
		if(quotationExDate==""||quotationExDate==undefined||quotationExDate==null||quotationExDate=="null"){
			alert("Quotation Expiry Date Should Not Be Null!");
		}

	
  //var genralInfo = $("#PartyGeneralTableInfoList").html().length;
  var   itemInfo =  $('#itemInfoTable tbody tr.newAdded').length; 
  
  if (itemInfo == "" || itemInfo == null || itemInfo == 0) { 
	  alert("Enter at least One Record In Item Info tab ");
	  return false; 
  }
  
  //var contactInfo = $("#PartyContactTableInfoList").html();
  
  var contactInfo =  $('#contactInfoTablePurchaseQuotation tbody tr.newAdded').length;
  if (contactInfo == "" || contactInfo == null || contactInfo == 0 ) { 
	  alert("Enter at least One Record In Contact Info tab "); return false; 
  }
  
  //var addressInfo = $("#PartyAddressTableInfoList").html();
  var addressInfo =  $('#addressInfoTablePurchaseQuotation tbody tr.newAdded').length;
  if (addressInfo == "" || addressInfo == null || addressInfo == 0 ) { 
	  alert("Enter at least One Record In Address Info tab "); return false; 
  }
  
  
var   termConditionInfo =  $('#TermsAndConditionInfoTable tbody tr.newAdded').length;
  
  if (termConditionInfo == "" || termConditionInfo == null || termConditionInfo == 0) { 
	  alert("Enter at least One Record In Term Condition Info tab ");
	  return false; 
  }

	// this is for item info
	var itemInfoDtoDetails = {
			lstpurchaseitemInfoDto : []
	};
	var rows = $('#itemInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		
		var userId =$("#userId").val();
		var unitId = $("#unitId").val();
		var itemInfoId = $("#itemInfoId" + i).val();
		
		var itemName = $("#itemName" + i).val();		
		var itemQuantity = $("#itemQuantity" + i).val();
		var unitPriceId = $("#unitPriceId" + i).val();
		var discountPerId = $("#discountPerId" + i).val();
		var discountRsId = $("#discountRsId" + i).val();
		var discountAmtId = $("#discountAmtId" + i).val();
		var baseAmountId = $("#baseAmountId" + i).val();
		var gstId = $("#gstId" + i).val();
		
		if(gstId==""||gstId=="null"||gstId==null||gstId==undefined){
			gstId=0;
		}
		var igstId = $("#igstId" + i).val();
		
		if(igstId==""||igstId=="null"||igstId==null||igstId==undefined){
			igstId=0;
		}
		
		var gstAmtId = $("#gstAmtId" + i).val();
		var totalAmtId = $("#totalAmtId" + i).val();
		var factor1 = $("#pqfactor1" + i).val();
		var factor2 = $("#pqfactor2" + i).val();
		var factor3 = $("#pqfactor3" + i).val();
		var factor4 = $("#pqfactor4" + i).val();
		var orderQtyId = $("#orderQtyId" + i).val();
		var pendinQtyId = $("#pendinQtyId" + i).val();
		var batchId = $("#batchId" + i).val();
		var unitName = $("#unitName" + i).val();
		var itemToatIgstAmt = $("#igstAmtId" + i).val();
		var itemBaseIgstGstAmt = $("#itemTotalAmount" + i).val();
		
		
		if(unitName==undefined||unitName==null||unitName=="unitName"||unitName==0){
			alert("Please Select Item Unit");
			return false;
		}
		var hsnName = $("#hsnName" + i).val();
		var hsnCodeNamePurchaseQuotation = $("#hsnCodeNamePurchaseQuotation" + i).val();
		var itemMasterId = $("#itemMasterId" + i).val();
		

		setItemInfoList(itemInfoDtoDetails,parseInt(itemInfoId),
				itemName, parseFloat(itemQuantity), parseFloat(unitPriceId),
				parseFloat(discountPerId), parseFloat(discountRsId), parseFloat(discountAmtId),parseFloat(baseAmountId),parseInt(gstId),parseFloat(igstId),parseFloat(gstAmtId),parseFloat(totalAmtId),parseFloat(factor1),parseFloat(factor2),
				parseFloat(factor3),parseFloat(factor4),parseFloat(orderQtyId),parseFloat(pendinQtyId),
				parseFloat(batchId),unitName,hsnName,itemMasterId,userId,unitId,itemToatIgstAmt,itemBaseIgstGstAmt,hsnCodeNamePurchaseQuotation);
	}

	itemInfoDtoDetails = JSON.stringify(itemInfoDtoDetails);
	

	// this is for contact details

	var purchasequotationContactInfoDtoDetails = {
			partyMasterContactInfoDto : []
	};
	var rows = $('#contactInfoTablePurchaseQuotation tbody tr.newAdded').length;
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
		setPurchaseQutationContactInfoList(purchasequotationContactInfoDtoDetails, contactPersonId,
				contactDesignationId, contatcAddressId, contactGenderId,
				contactDobId, contactPhoneOneId, contactPhoneSecondId,
				contactMailId,parseInt(contactInfoId),userId,unitId);
	}

	purchasequotationContactInfoDtoDetails = JSON
			.stringify(purchasequotationContactInfoDtoDetails);

	// this is for address details

	var purchaeQuotationAddressInfoDtoDetails = {
			partyMasterAddressInfoDto : []
	};
	var rows = $('#addressInfoTablePurchaseQuotation tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
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
		
		
		setPurchaseQuotationPartyAddressSlaveList(purchaeQuotationAddressInfoDtoDetails,addressInfoId,
				companyAddressType, companyNameId, companyAddressId, companyStreetId,
				companyPinId, companyAreaId, companyCityName, cityId,
				companyTalukaName, talukaId, companyDistrictName, districtId, companyStateName, 
				stateId, companyCountryName, countryId, userId, unitId);
	}

	purchaeQuotationAddressInfoDtoDetails = JSON
			.stringify(purchaeQuotationAddressInfoDtoDetails);
	
	
	// this is for Term And Condition  details

	var purchaeQuotationTermAndConditionInfoDtoDetails = {
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

		setTermsAndConditionInfoListForPQ(
				purchaeQuotationTermAndConditionInfoDtoDetails,
				termsAndConditionInfoId, termsAndConditionTitleId,
				termsAndConditionNameId, userId, unitId,termsAndConditionSlaveId);
	}

	purchaeQuotationTermAndConditionInfoDtoDetails = JSON.stringify(purchaeQuotationTermAndConditionInfoDtoDetails);

	
	var inputs = [];
	inputs.push("purchaseQutationId=" + purchaseQutationId);
	inputs.push("mobileNumber=" + mobileNumber);
	inputs.push("referenceNumber=" + referenceNumber);
	inputs.push("quotationDate=" + quotationDate);
	inputs.push("deleviryDate=" + deleviryDate);
	inputs.push("supplierAddress=" + supplierAddress);
	inputs.push("supplierName=" + supplierName);
	inputs.push("quotationSeries=" + quotationSeries);
	inputs.push("quotationStatus=" + quotationStatus);
	inputs.push("supplierState=" + supplierState);
	inputs.push("quotationExDate=" + quotationExDate);
	inputs.push("quotationNo=" + quotationNo);
	inputs.push("partyMasterId=" + partyMasterId);	
	inputs.push("termandCondition=" + termandCondition);
	
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
	inputs.push("totalTax=" + totalTax);
	inputs.push("less=" + less);
	inputs.push("addAmount=" + add);	
	inputs.push("totalItem=" + totalItem);	
	inputs.push("totalItemDiscount=" + totalItemDiscount);
	
	inputs.push("partyGstNo=" + partyGstNo);
	inputs.push("totalgstAmount=" + totalGstAmt);
	inputs.push("totalIgstAmount=" + totalIGstAmt);
	//added by Rohit
	inputs.push("itemTotalAmt=" + totalAmount);

	// this is for item info
	inputs.push("itemInfoDtoDetails="+ encodeURIComponent(itemInfoDtoDetails));
	// this is for contact Details
	inputs.push("purchasequotationContactInfoDtoDetails="+ encodeURIComponent(purchasequotationContactInfoDtoDetails));
	// this is for address info
	inputs.push("purchaeQuotationAddressInfoDtoDetails="	+ encodeURIComponent(purchaeQuotationAddressInfoDtoDetails));
	
	// this is for Term And Condition info
	inputs.push("purchaeQuotationTermAndConditionInfoDtoDetails="+ encodeURIComponent(purchaeQuotationTermAndConditionInfoDtoDetails));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/purchasequotation/savePurchaseQuotationMaster",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			if (r[0] == 1) {
				
				if (document.getElementsByName("uploadPqDocs").length != 0 && $("#uploadPqDocument").val() != "") {
					uploadPurchaseQuotationDocuments(r[1]);
				}
				
				alert("Record saved successfully..!");
				refreshPurchaseQuotationMaster();
				setTimeout(function() {
			         window.location.reload();
			      }, 1000);
			} else if (r[0] == 2) {
				
				if (document.getElementsByName("uploadPqDocs").length != 0 && $("#uploadPqDocument").val() != "") {
					uploadPurchaseQuotationDocuments(r[1]);
				}
				alert("Record Updated successfully..!");
				refreshPurchaseQuotationMaster();
				setTimeout(function() {
			         window.location.reload();
			      }, 1000);
			} else {
				alert("Oops something went wrong.....");
				refreshPurchaseQuotationMaster();
				setTimeout(function() {
			         window.location.reload();
			      }, 1000);
			}
			
//			getAllPurchaseQuotationMaster("all");
//			refreshPurchaseQuotationMaster();
//			 $('#itemMasterModal').modal('hide');			
			
			
			
		}
	});

}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 18-Nov-2019
 * @codeFor : getAllPurchaseQuotationMaster()
 ******************************************************************************/
function getAllPurchaseQuotationMaster(call) {
	
	
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	inputs.push('call=' + call);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/purchasequotation/getAllPurchaseQuotationMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setPurchaseQuotationMasterTemplate(r, call);
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 18-Nov-2019
 * @codeFor : setPurchaseQuotationMasterTemplate()
 ******************************************************************************/

function setPurchaseQuotationMasterTemplate(response, callFrom) {

	var htm = "";
	var index = 1;
			if (callFrom === "all") {
				for ( var i = 0; i < response.lstpurchasequotationmasterDto.length; i++) {
					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstpurchasequotationmasterDto[i].purchaseQutationId
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstpurchasequotationmasterDto[i].supplierName
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ response.lstpurchasequotationmasterDto[i].quotationExDate
							+ '</td>'					
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editPurchaseQuotationMaster('
							+ response.lstpurchasequotationmasterDto[i].purchaseQutationId
							+ ')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deletePurchaseQuotationMaster('
							+ response.lstpurchasequotationmasterDto[i].purchaseQutationId
							+ ')><i class="fa fa-trash-o"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=printPurchaseQuotationMaster('
							+ response.lstpurchasequotationmasterDto[i].purchaseQutationId
							+ ')><i class="fa fa-print"></i></button></td>';
							if(response.lstpurchasequotationmasterDto[i].isApproved == "Y"){
								htm = htm + ' <td class="col-md-1 center">'
									+ '	<input type="button" disabled="disabled" class="btn btn-xs btn-success editBodyPartMaster" value="Approved" onclick=showUsernamePasswordModel('
									+ response.lstpurchasequotationmasterDto[i].purchaseQutationId
									+ ')></td>';
							}else if(response.lstpurchasequotationmasterDto[i].isApproved == "N"){
								htm = htm + ' <td class="col-md-1 center">'
								+ '	<input type="button" class="btn btn-xs btn-warning editBodyPartMaster" value="Approve" onclick=showUsernamePasswordModel('
								+ response.lstpurchasequotationmasterDto[i].purchaseQutationId
								+ ')></td>';
							}
							htm = htm + '</tr>';
					index++;
				}
			} else if (callFrom === "search") {				
			
				htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.purchaseQutationId
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.supplierName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.quotationExDate
				+ '</td>'					
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editPurchaseQuotationMaster('
				+ response.purchaseQutationId
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deletePurchaseQuotationMaster('
				+ response.purchaseQutationId
				+ ')><i class="fa fa-trash-o"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=printPurchaseQuotationMaster('
				+ response.purchaseQutationId
				+ ')><i class="fa fa-print"></i></button></td>';
				if(response.isApproved == "Y"){
					htm = htm + ' <td class="col-md-1 center">'
				+ '	<input type="button" disabled="disabled" class="btn btn-xs btn-success editBodyPartMaster" value="Approve" onclick=showUsernamePasswordModel('
				+ response.purchaseQutationId
				+ ')></td>';
				}else if(response.isApproved == "N"){
					htm = htm + ' <td class="col-md-1 center">'
					+ '	<input type="button" class="btn btn-xs btn-warning editBodyPartMaster" value="Approve" onclick=showUsernamePasswordModel('
					+ response.purchaseQutationId
					+ ')></td>';
				}
				htm = htm  + '</tr>';
		index++;
			} else if (callFrom === "expired") {				
			
				if (response.lstpurchasequotationmasterDto !=null) {
					for ( var i = 0; i < response.lstpurchasequotationmasterDto.length; i++) {
						htm = htm
								+ '<tr> '
								+ ' <td class="col-md-1 center">'
								+ index
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ response.lstpurchasequotationmasterDto[i].purchaseQutationId
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ response.lstpurchasequotationmasterDto[i].supplierName
								+ '</td>'
								+ ' <td class="col-md-1 center">'
								+ response.lstpurchasequotationmasterDto[i].quotationExDate
								+ '</td>'					
								+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editPurchaseQuotationMaster('
								+ response.lstpurchasequotationmasterDto[i].purchaseQutationId
								+ ')><i class="fa fa-edit"></i></button></td>'
								+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deletePurchaseQuotationMaster('
								+ response.lstpurchasequotationmasterDto[i].purchaseQutationId
								+ ')><i class="fa fa-trash-o"></i></button></td>'
								+ ' <td class="col-md-1 center">'
								+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=printPurchaseQuotationMaster('
								+ response.lstpurchasequotationmasterDto[i].purchaseQutationId
								+ ')><i class="fa fa-print"></i></button></td>';
						if(response.lstpurchasequotationmasterDto[i].isApproved == "Y"){
						htm = htm + ' <td class="col-md-1 center">'
								+ '	<input type="button" disabled="disabled" class="btn btn-xs btn-success editBodyPartMaster" value="Approved" onclick=showUsernamePasswordModel('
								+ response.lstpurchasequotationmasterDto[i].purchaseQutationId
								+ ')></td>';
						}else if(response.lstpurchasequotationmasterDto[i].isApproved == "N"){
							htm = htm + ' <td class="col-md-1 center">'
							+ '	<input type="button" class="btn btn-xs btn-warning editBodyPartMaster" value="Approve" onclick=showUsernamePasswordModel('
							+ response.lstpurchasequotationmasterDto[i].purchaseQutationId
							+ ')></td>';
						}
						htm = htm + '</tr>';
						index++;
					}
				}else{
					htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.purchaseQutationId
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.supplierName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.quotationExDate
					+ '</td>'					
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=editPurchaseQuotationMaster('
					+ response.purchaseQutationId
					+ ')><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deletePurchaseQuotationMaster('
					+ response.purchaseQutationId
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=printPurchaseQuotationMaster('
					+ response.purchaseQutationId
					+ ')><i class="fa fa-print"></i></button></td>';
					if(response.isApproved == "Y"){
						htm = htm + ' <td class="col-md-1 center">'
					+ '	<input type="button" disabled="disabled" class="btn btn-xs btn-success editBodyPartMaster" value="Approve" onclick=showUsernamePasswordModel('
					+ response.purchaseQutationId
					+ ')></td>';
					}else if(response.isApproved == "N"){
						htm = htm + ' <td class="col-md-1 center">'
						+ '	<input type="button" class="btn btn-xs btn-warning editBodyPartMaster" value="Approve" onclick=showUsernamePasswordModel('
						+ response.purchaseQutationId
						+ ')></td>';
					}
					htm = htm  + '</tr>';
			index++;
				}
		index++;
				
			}
	$("#purchaseQuotationInfoList").html(htm);
}


/**
 * @since 10-01-2021
 * @comment created this js function to show user name and password modal
 * @author Vishnu Thorat
 */
function showUsernamePasswordModel(purchaseQutationId){
	$("#userNameandpasswordPopUp").modal('show');
	$("#userName").val("");
	$("#userPassword").val("");
	$("#purchaseQtMasterId").val(purchaseQutationId);
}

/**
 * @since 10-01-2021
 * @comment created this js function to check  user name and password is valid or not
 * @author Vishnu Thorat
 */
function checkUserValid(){
	var purchaseQutationId = $("#purchaseQtMasterId").val();
	var userName = $("#userName").val();
	var userPassword=$("#userPassword").val();	
	var inputs = [];
	inputs.push('userName=' + userName);
	inputs.push('userPassword=' + userPassword);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/purchasequotation/checkUserNameandPassword",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			if(r. lstpurchasequotationmasterDto[0].count > 0){
			var userId = r. lstpurchasequotationmasterDto[0].approvedById;
			approvePurchaseQuotation(userId,userName,purchaseQutationId);
			$("#userName").val(" ");
			$("#userPassword").val(" ");	
			$("#userNameandpasswordPopUp").modal('hide');
				
			}else{
				alert("User Name And Password Is Invalid.....!!!!");
				return false;
			}
			
		}
	});
}

function approvePurchaseQuotation(userId,userName,purchaseQutationId){
	
	if(purchaseQutationId > 0 && purchaseQutationId !=null && purchaseQutationId !=""){
		var isApproved = "Y"; 
		var inputs = [];
		inputs.push('approvedByName=' + userName);
		inputs.push('approvedById=' + userId);
		inputs.push('isApproved=' + isApproved);
		inputs.push('purchaseQutationId=' + purchaseQutationId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/purchasequotation/approvePurchaseQuotation",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('Network Issue..!!');
			},
			success : function(r) {
				if(r == 1){
					alert("Quotation Approved successfully...!");
					window.location.reload();
				}else{
					alert("Oops something went wrong.....");
				}
			}
		});
	}
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
						url : "ehat/purchasequotation/deletePurchaseQuotationSlaveInfo",
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
						url : "ehat/purchasequotation/deletePurchaseQuotationSlaveInfo",
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
					url : "ehat/purchasequotation/deletePurchaseQuotationSlaveInfo",
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
				getAllPurchaseQuotationMaster("all");
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

		alertify.error("Please enter search value");
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
			if(response.partyMasterDto.length == 0){
				alertify.error("You Cannot Insert Other Supplier Name...!!!");
				document.getElementById('supplierName').value = "";
			}
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
			$("#supplierName").val(response.name);
			$("#hiddenpartyMasterId").val(response.id);
			//alert("id..."+$("#hiddenpartyMasterId").val());
			//setEditPartyMasterSlaveInfo(response);
			setPartyMasterContactInfo(response);
			setPartyMasterAddressInfo(response);
		
			setPartyModalAddressInfoToPurcchaseQuotation(response);
			setPartyModalContactInfoToPurcchaseQuotation(response);
			setParyMasterStateToPurchaseQuotation(response);
			//setPartyModalInfoToPurcchaseQuotation(response);
			showpartyMasterDetailsModal();
			setPartyInfoOnPurchaseQuotaion(response);
			
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
		
		$("#mbNo").val(response.partyMasterContactInfoDto[0].contactPhoneNumber1);
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
	$("#PartyContactTableInfoList").html(htm);
	
	
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
		$("#supplierAddress").val(response.partyMasterAddressInfoDto[i].address);
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
 * @date : 27-Nov-2019
 * @codeFor : editPurchaseQuotationMaster()
 ******************************************************************************/
function editPurchaseQuotationMaster(pQId){
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('pQId=' + pQId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/purchasequotation/editPurchaseQuotationMaster",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
				getUploadedDocuments(r.purchaseQutationId);
				$("#purchaseQtMasterId").val(r.purchaseQutationId);
				$("#mbNo").val(r.mobileNumber);
				$("#referenceNo").val(r.referenceNumber);	
				$("#quotationDate").val(r.quotationDate);
				$("#deliveryDate").val(r.deleviryDate);
				$("#supplierAddress").val(r.supplierAddress);
				$("#supplierName").val(r.supplierName);
				$("#quotationSeries").val(r.quotationSeries);
				$("#quotationStatus").val(r.quotationStatus);
				//$("#supplierState").val(r.supplierState);
				$("#quotationExDate").val(r.quotationExDate);
				$("#quotationNo").val(r.purchaseQutationId);
				$("#termconditionId").val(r.termandCondition);
				$("#hiddenpartyMasterId").val(r.partymasterdto.id);
				setParyMasterStateToPurchaseQuotation(r.partymasterdto);
				$("#supplierState").select2('val',r.supplierState);
				$("#hiddensupplierstate").val(r.supplierState);
				setEditPurchaseQuotationMasterSlaveInfo(r);
				
				var   itemInfo =  $('#itemInfoTable tbody tr.newAdded').length; 
				  
				  if (itemInfo == "" || itemInfo == null || itemInfo == 0) { 
					 
					     $("#txtSplDisc").val(0);
						 $("#txtdebitAmt1").val(0);
						 $("#xtCD1").val(0);
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
					  return false; 
				  }else{
				
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
				 $("#txtAdd").val(r.addAmount);
				 //added by Rohit
				 $("#itemTotalAmt").val(r.itemTotalAmt);
				
				 $("#txtGross").val(r.grossAmount);
				 $("#textVat").val(r.igstTotalAmount);
				 $("#txtNetAmt").val(r.grossTotalAmount);
				 $("#totalItemId").val(r.totalItem);
				 $("#totalDiscountId").val(r.totalItemDiscount);
				  }
				
				
			
		}
	});
	
}
function setEditPurchaseQuotationMasterSlaveInfo(response){
	var partyState= $("#hiddensupplierstate").val();
	//partyState=0;
	var userState= $("#userState").val();
	var length = 0;
	if(response.lstpurchaseitemInfoDto.length != 0 && response.lstpurchaseitemInfoDto !=null && response.lstpurchaseitemInfoDto != ""){
		
		length = response.lstpurchaseitemInfoDto.length;
		var htm = "";
		var id = 0;
		for ( var i = 0; i < length; i++) {
			id++;
			htm = htm
			+ "<tr class='newAdded' id='mutitr'"
			+ id
			+ "'>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkMrnItem'   value='"+id+"' "
			+ id
			+ " name='patientdocid'  checked='checked' isNew='false' id="+response.lstpurchaseitemInfoDto[i].itemId+"></td>"
			
			+ "<td class='col-md-1 center'> <span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemInfoId"+id+"' value="+response.lstpurchaseitemInfoDto[i].itemId+"></td>"
			
			+ "<td><input type='text' style='width: 250px;' id='itemName" 
			+ id
			+ "' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' value='"+response.lstpurchaseitemInfoDto[i].itemName+"'>"
			+ "</td>"
			
			+ "<td><input type='text' style='width: 80px;'   onkeypress='return validateNumbers(event)'  onkeyup='totalAmount(this.id,"+id+")' id='itemQuantity"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemQuantity+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' id='unitPriceId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemUnitPrice+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;'  onkeyup='chkTradAmtorPercentage(this.id,"+id+")' onblur='calculTradeDis(this.id,"+ id+ ")' id='discountPerId" 
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemDiscountPer+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;'  onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+id+")' id='discountRsId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemDiscountRs+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' id='discountAmtId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemDiscountAmt+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' id='baseAmountId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemBaseAmt+"'>"
			+ "</td>";
			if(parseInt(partyState)==parseInt(userState)){	
			htm=htm	+ "<td><input type='text' style='width: 80px;' onkeyup='rowAmtCalForGst(this.id,"+id+"),calculateTotalItemAmount("+id+"),calculateTotalItemgstAmount("+id+"),autotaxCodeforItemGst("+id+",onchange)'   id='gstId"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemGst+"'>"
				+ "</td>"
				
	
				+ "<td><input type='text' style='width: 80px;' disabled='disabled' onkeyup='rowAmtCalForIGST(this.id,"+id+"),calculateTotalItemAmount("+id+"),calculateTotalItemigstAmount(),autotaxCodeforItemIGST("+id+",onchange)' id='igstId"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemIgst+"'>"
				+ "</td>";
		
			}else{
				
			htm=htm		+ "<td><input type='text' style='width: 80px;'   onkeyup='rowAmtCalForGst(this.id,"+id+"),calculateTotalItemAmount("+id+"),calculateTotalItemgstAmount("+id+"),autotaxCodeforItemGst("+id+",onchange)'   id='gstId"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemGst+"'>"
				+ "</td>"
				

				+ "<td><input type='text' style='width: 80px;' onkeyup='rowAmtCalForIGST(this.id,"+id+"),calculateTotalItemAmount("+id+"),calculateTotalItemigstAmount(),autotaxCodeforItemIGST("+id+",onchange)' id='igstId"
				+ id
				+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemIgst+"'>"
				+ "</td>";
			}
			
			
		htm=htm		+ "<td><input type='text' style='width: 80px;' id='gstAmtId"
			+ id
			+ "' class='form-control input-SmallText' disabled='disabled' value='"+response.lstpurchaseitemInfoDto[i].itemGstAmt+"'>"
			+ "</td>"
			
			+ "<td><input type='text' style='width: 80px;' id='igstAmtId"
			+ id
			+ "' class='form-control input-SmallText' disabled='disabled' value='"+response.lstpurchaseitemInfoDto[i].itemToatIgstAmt+"' >"
			+ "</td>"
			
			
			/*+ "<td><input type='text' style='width: 80px;' id='gstAmtId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemGstAmt+"' >"
			+ "</td>"*/
			+ "<td><input type='text' style='width: 80px;' id='totalAmtId"
			+ id
			+ "' class='form-control input-SmallText' disabled='disabled' value='"+response.lstpurchaseitemInfoDto[i].itemTotalAmt+"'>"
			+ "</td>"
			
			+ "<td><input type='text' style='width: 80px;' id='pqfactor1"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemFactor1+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' id='pqfactor2"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemFactor2+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' id='pqfactor3"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemFactor3+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' id='pqfactor4"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemFactor4+"'>"
			+ "</td>"
			+ "<td><input type='text' style='width: 80px;' id='orderQtyId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemOrderQty+"'>"
			+ "</td>"
			+ "<td style='display:none;'><input type='text' style='width: 80px;' id='pendinQtyId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemPendingQty+"'>"
			+ "</td>"
			
			+ "<td class='col-md-1 center'><select style='width:100px'  id='unitName"+id+ "' class='form-control input-SmallText''><option value='0'>---Select---</option></select></td>"
			
			//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
			+ "<td><input type='text' style='width: 80px;' id='itemTotalAmount"
			+ id
			+ "' class='form-control input-SmallText' disabled='disabled' value='"+response.lstpurchaseitemInfoDto[i].itemBaseIgstGstAmt+"'>"
			+ "</td>"
			
			
			+ "<td class='hidden'><input type='text' style='width: 80px;' id='batchId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemBatchNo+"'>"
			+ "</td>"
			
			
			+ "<td class='col-md-1 center' style='display:none'><input type='text' style='width: 80px;'   id='hsnName"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].hsnName+"'>"
			+ "</td>"
			
			+ "<td class='col-md-1 center' style='display:none'><input type='text' style='width: 80px;'   id='hsnCodeNamePurchaseQuotation"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].hsnNameValue+"'>"
			+ "</td>"
			

			+ "<td class='col-md-1 center' style='display:none'><input type='text' style='width: 80px;'   id='itemMasterId"
			+ id
			+ "' class='form-control input-SmallText' value='"+response.lstpurchaseitemInfoDto[i].itemMasterId+"'>"
			+ "</td>"
			+ "</tr>";
		}
		$("#RowCount").val(id);
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		$("#itemInfoDetails").html(htm);
		var unitId = $("#unitId").val();
		var inputs = [];
		inputs.push('unitId=' + unitId);
		var str = inputs.join('&');
		jQuery.ajax({
	        async : false,
	        type : "POST",
	        data : str + "&reqType=AJAX",
	        url : "ehat/inventoryM/getAllUnitMaster",
	        error : function() {
	            alert('error');
	        },
	        success : function(r){    
	        	
	        	var htm="<option value='0'>--Select--</option>";
			    for ( var i = 0; i < r.lstunitmaster.length; i++){    
			        htm = htm + "<option value='"+r.lstunitmaster[i].uniId+"'>"+r.lstunitmaster[i].unitName+"</option>";
			    }
			    
				for ( var i = 0; i < response.lstpurchaseitemInfoDto.length; i++) {
					
					var id = i+1;
					$("#unitName" +id).html(htm);
					//$("#unitName" +id).select2();
					//$("#unitName"+id).select2('val',response.lstpurchaseitemInfoDto[i].itemUnitId);
					$("#unitName"+id).val(response.lstpurchaseitemInfoDto[i].itemUnitId);
				}			          
	        }
	    });	
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
				
				+ ' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editContactInfoPartyMasterOnPQ('
				+ response.partymasterdto.partyMasterContactInfoDto[i].id+',\'fromDB\')"><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id="deletepurchasecontact'+response.partymasterdto.partyMasterContactInfoDto[i].id+'" onclick="deletePartyMasterSlaveOnPQ('+ response.partymasterdto.partyMasterContactInfoDto[i].id +',\'deletecontact\')"><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		$("#PartyContactTableInfoList").html(htm);
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
			count +
			'</td>' +
			
			
			' <td class="col-md-1 center" id="addressInfoId1' +
			count +
			'" style="display:none">' +
			count +
			'</td>' +
			
			' <td class="col-md-1 center" id="addInfoId' +
			count +
			'" style="display:none">' +
			count +
			'</td>' +
			
			
			
			
			' <td class="col-md-1 center"><input type="hidden" id="editAddressPartMaster' +
			count + '" value="' + count + '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editAddressInfoPartyMasterOnPQ(' +
			count +
			',\'fromDB\')"><i class="fa fa-edit"></i></button></td>' +
			' <td class="col-md-1 center">' +
			'	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteAddressPartMaster' +
			response.partymasterdto.partyMasterAddressInfoDto[i].id +
			'"  onclick="deletePartyMasterSlavePQ(' +
			response.partymasterdto.partyMasterAddressInfoDto[i].id +
			',\'deleteAddress\')" ' +
			'><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
		$("#PartyAddressTableInfoList").html(htm);
	}
		
		
				
	}
	
	
	
	
	if(response.partymasterdto.termsAndConditionInfoDto.length != 0 && response.partymasterdto.termsAndConditionInfoDto !=null && response.partymasterdto.termsAndConditionInfoDto != ""){
		length = response.partymasterdto.termsAndConditionInfoDto.length;
		var count = 0;
		var htm = "";
		
		for ( var i = 0; i < response.partymasterdto.termsAndConditionInfoDto.length; i++) {
			
			count++;
			
			htm = htm + '<tr class="newAdded"> '
			+ ' <td class="col-md-1 center">'
			+ count
			+ '</td>'
			+ ' <td class="col-md-1 center" id="txtTermsAndConditionsTitleId'
			+ count
			+ '">'
			+ response.partymasterdto.termsAndConditionInfoDto[i].headingName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="txtTermsAndConditionId'
			+ count
			+ '">'
			+ response.partymasterdto.termsAndConditionInfoDto[i].termconditionName
			+ '</td>'
			+ ' <td class="col-md-1 center" id="termsAndCondId'
			+ count
			+ '" style="display:none">'
			+ response.partymasterdto.termsAndConditionInfoDto[i].id
			+ '</td>'
			+ ' <td class="col-md-1 center"><input type="hidden" id="termsAndCondSlaveId'
			+ count
			+ '" value="'
			+ response.partymasterdto.termsAndConditionInfoDto[i].termsConditionSlaveId
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editTermsAndConditionInfoPartyMaster('
			+ response.partymasterdto.termsAndConditionInfoDto[i].id
			+ ')"><i class="fa fa-edit"></i></button></td>'
			+ ' <td class="col-md-1 center">'
			+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteTermsAndCondition'
			+ response.partymasterdto.termsAndConditionInfoDto[i].id
			+ '" onclick="deletePartyMasterSlave('
			+ response.partymasterdto.termsAndConditionInfoDto[i].id
			+ ',\'deleteTermsAndCondition\')" '
			+ '><i class="fa fa-trash-o"></i></button></td>' 
			+ '</tr>';
			
			$("#TermsAndConditionInfoTableList").html(htm);
						

				
	}
		
						
	}
	

	
	
			
}

/************
* @author	: Dayanand Khandekar
* @date		: 27-Nov-2019
* @codeFor	:getAllInventoryTermAndCondition Detail
 ************/
function getAllInventoryTermAndCondition(){	
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/inventoryM/getAllInventoryTermAndCondition",
		data : str + "&reqType=AJAX",
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
						url : "ehat/purchasequotation/updatePuContactQuotationMaster",
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
							getAllPQuationContactInfo();
							
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
* @date : 19-Nov-2019
* @codeFor : getAllPQuationContactInfo()
******************************************************************************/
function getAllPQuationContactInfo() {
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
		url : "ehat/purchasequotation/getAllPQuationContactInfo",
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
* @codeFor : getAllPQuationContactInfo()
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
						url : "ehat/purchasequotation/updatePurchaseAddressInfo",
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
							getAllPQuationAddressInfo();
							
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
 * @date : 22-Nov-2019
 * @codeFor : getAllPQuationAddressInfo()
 ******************************************************************************/
function getAllPQuationAddressInfo() {
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
		url : "ehat/purchasequotation/getAllPQuationAddressInfo",
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

		alertify.error("Please enter search value");
		$("#" + inputID).focus();
		
		return false;
	}
	var call=$("#callFromAuto").val();//added by dayanand for maintaing call
	
	var inputs = [];
	inputs.push('vendorName=' + vendorName);
	inputs.push('call=' + call);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/purchasequotation/getQuatationMaster",
		cache : false,
		success : function(response) {
			//alert("hiii");
          
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
function getPurchaseQuotationMasterDetailsById(pQId){
	var unitId = $("#unitId").val();
	var call = $("#callFromAuto").val();
	var inputs = [];
	inputs.push('pQId=' + pQId);
	inputs.push('unitId=' + unitId);
	inputs.push('call=' + call);
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
			
				if(r.supplierName==null){
					alert("Record Not Found");
					return false;
				}else{
			setPurchaseQuotationMasterTemplate(r,"search");
				}
				
			
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
function printPurchaseQuotationMaster(pQId){
	
	 window.open("inv_purchase_quotation_master_print.jsp?pQId="+pQId);
	
}
/************
* @author	: Vinod Udawant
* @date		: 18-Nov-2019
* @codeFor	: Add new row temp for MRN
 ************/
function addNewRowInTableForQuotation(tableId,callFrom){
	
	var tbody = "";
	var rows = $('#'+tableId+' tbody tr').length;
	
	if(callFrom == "MRN"){
		
		tbody = getMrnTableBodyString(rows+1);
	}
	if(callFrom == "purchasequotation"){
		
		//tbody = getPurchaseQuotationItemInfoBody(rows+1);
		tbody = getPurchaseQuotationItemInfoBodyOnPlus(rows+1);
	}
	if(callFrom == "purchasequotationOnplus"){
		
		tbody = getPurchaseQuotationItemInfoBodyOnPlus(rows+1);
	}
	
	$('#'+tableId).append(tbody);
}

/************
* @author	: Vinod Udawant
* @date		: 18-Nov-2019
* @codeFor	: Remove row temp for MRN
 ************/
function removeRowFromTableForQuotation(tableId,checkboxClass){	
	
	var rowCount=$("#RowCount").val();
	
	
	var docId = new Array();
	$("input[name='patientdocid']:checked").each(function() {	
		
		
		var slaveId=$("#itemInfoId"+$(this).val()).val();
		if(slaveId >0){
		docId.push($(this).attr('id'));
		}
	});
  
   if(docId.length>0){

	 var inputs = [];
		inputs.push('itemId=' + docId);
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/purchasequotation/deletePurchaseQuotationItemInfoSlave",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(response) {
				$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
				alert(response);
				checkForQuotation(tableId);
				checkCompForQuotation(tableId);
				totalDocDiscountPQ();
				totalDocQtyPQ();
				totalGrossAmt(1,rowCount);
				totalVatAmt(1,rowCount);
				totalAmount(1,rowCount);
				 
			}
		}); 
   } else{
	$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
	checkForQuotation(tableId);
	checkCompForQuotation(tableId);	 
	totalDocDiscountPQ();
	totalDocQtyPQ();
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);
	totalAmount(1,rowCount);
   }
  
}

/************
* @author	: Vinod Udawant
* @date		: 18-Nov-2019
* @codeFor	: For reorder srno after delete
 ************/
function checkForQuotation(tableId){
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
function checkCompForQuotation(tableId){
	var trLength = $('#'+tableId).find("tr:first th").length;
	obj=$('#'+tableId+' tbody tr td').find('input,select,radio');
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
 * @date : 8-Nov-2019
 * @codeFor : to Set Row Template To Body Of Item Info Table
 ******************************************************************************/
function getPurchaseQuotationItemInfoBody(id) {
	var partyState= $("#hiddensupplierstate").val();
	var userState= $("#userState").val();
	$("#unitName" +id).select2();
	getUOMTempForQuotation("unitName"+id);
	var tbody = "";
	tbody = tbody
			+ "<tr class='newAdded' id='mutitr'"
			+ id
			+ "'>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkMrnItem' id='checkbox" 
			+ id
			+ "' name='checkbox'  value='"+id+"'></td>"
			
			+ "<td class='col-md-4 col-xs-12 col-sm-4 center'> <span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemInfoId"+id+"' value='0'></td>"
			
			+ "<td class='col-md-8 col-xs-12 col-sm-8 center'><div id='divtxtPurchaseQuotationItemName"+id+"'><input type='text' data-name='purchasequotation'  onkeyup='fetchItemMasterDetails(this.id,"+id+")'  id='itemName" 
			+ id
			+ "' class='form-control input-Small'  style='width: 250px;'>"
			+ "</div></td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' onkeypress='return validateNumbers(event)' id='itemQuantity"
			+ id
			+ "' onkeyup='totalAmount(this.id,"+id+")' class='form-control input-SmallText' >"
			+ "</td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' id='unitPriceId"
			+ id
			+ "' class='form-control input-SmallText'>"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' onkeyup='chkTradAmtorPercentage(this.id,"+id+")' onblur='calculTradeDis(this.id,"+ id+ ")' id='discountPerId"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+id+")' id='discountRsId"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' id='discountAmtId"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style=' width: 80px;' type='text' id='baseAmountId"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>";
			if( partyState == userState ){
				tbody = tbody
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;'  onkeyup='rowAmtCalForGst(this.id,"+id+"),autotaxCodeforItemGst("+id+",onchange)' id='gstId"
				+ id
				+ "' class='form-control input-SmallText' >"
				+ "</td>";
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' disabled='disabled' onkeyup='rowAmtCalForGst(this.id,"+id+"),autotaxCodeforItemGst("+id+",onchange)' id='gstId"
				+ id
				+ "' class='form-control input-SmallText' >"
				+ "</td>";
			}else{
				tbody = tbody
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' disabled='disabled' onkeyup='rowAmtCalForGst(this.id,"+id+"),autotaxCodeforItemGst("+id+",onchange)' id='gstId"
				+ id
				+ "' class='form-control input-SmallText' >"
				+ "</td>";
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;'  onkeyup='rowAmtCalForGst(this.id,"+id+"),autotaxCodeforItemGst("+id+",onchange)' id='gstId"
				+ id
				+ "' class='form-control input-SmallText' >"
				+ "</td>";
			}
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' disabled='disabled' value='0' onkeyup='rowAmtCal(this.id,"+id+"),autotaxCodeforItem("+id+",onchange)' id='igstId"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' disabled='disabled' style=' width: 80px;' id='gstAmtId"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' disabled='disabled' style=' width: 80px;' id='igstAmtId"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' disabled='disabled' id='totalAmtId"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 80px;'>"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;'  id='pqfactor1"+ id + "' class='form-control input-SmallText'></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' id='pqfactor2"+ id + "' class='form-control input-SmallText'></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' id='pqfactor3"+ id + "' class='form-control input-SmallText'></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' id='pqfactor4"+ id + "' class='form-control input-SmallText'></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'> <input type='text' id='orderQtyId"
			+ id
			+ "' class='form-control input-SmallText' style='width: 80px;'>"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  readonly='' id='pendinQtyId"
			+ id
			+ "' class='form-control input-SmallText' style='width: 80px;' >"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><select class='form-control' style='width:100px' id='unitName"+id+"'><option value='0'>---Select---</option></select></td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'> <input disabled='disabled' type='text' id='itemTotalAmount"
			+ id
			+ "' class='form-control input-SmallText' style='width: 80px;'>"
			+ "</td>"
			
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center hidden'><input type='text'  id='batchId"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			//hsn id here
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'  style='display:none'><input type='text'  id='hsnName"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			//hsn name here
			+ "<td style='display:none'><input type='text' disabled='disabled' class='form-control input-SmallText' id='hsnCodeNamePurchaseQuotation"
			+ id
			+ "'  style='width:90px;'></td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none'><input type='text' id='itemMasterId"+id+"' class='form-control input-SmallText'> </td>"
			+ "</tr>";
	$("#RowCount").val(id);
	var totaltblsize = $("#RowCount").val();
	$("#totaltblsize").val(totaltblsize);
	$("#itemInfoDetails").append(tbody);
}

function totalAmount(id,rowCount){
	var quantity = $('#' + id).val();
	var rate = $('#unitPriceId' + rowCount).val();
	
	$('#orderQtyId' + rowCount).val(quantity);
	$('#pendinQtyId' + rowCount).val(quantity);
	$('#baseAmountId' + rowCount).val(quantity * rate);
	
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
		 $("#itemTotalAmount" + rowcount).val(' ');
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
		$("#itemTotalAmount" + rowCount).val('');
		
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
		
		 
		//var oldTotaldiscount = $("#totalDiscountId").val();
		
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
		$('#itemTotalAmount' + rowCount).val(' ');
		return false;
	} 
	var baseAmt = $('#baseAmountId' + rowCount).val();
	if(baseAmt == " " || baseAmt == null)
	{
	$("#totalAmtId").val(' ');
	$('#itemTotalAmount' + rowCount).val(' ');
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
		//$("#gstAmtId" + rowCount).val(finalcaltaxanmount); //add tax amount in Rs purchase quotation  @author:paras @Date:23nov
		
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
		
		/*$("#txtVat").val(sum.toFixed(2));
		$("#txtTotalVat").val(sum.toFixed(2));
		$("#textVat").val(sum.toFixed(2));
	
		var totalgrossAmt = $("#txtGross").val(); 
		$("#txtNetAmt").val((parseFloat(sum) + parseFloat(totalgrossAmt)).toFixed(2));*/
		
		//$("#txtVat").val(sum.toFixed(2));
		$("#txtigstVat").val(sum.toFixed(2));
		//$("#txtTotalVat").val(sum.toFixed(2));
		//$("#textVat").val(sum.toFixed(2));

		var totalgrossAmt = $("#txtGross").val();
		$("#txtNetAmt").val(
			(parseFloat(sum) + parseFloat(totalgrossAmt)).toFixed(2));

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
		$('#gstAmtId'+ rowCount).val(finalcaltaxanmount); //add tax amount in Rs @author:paras @Date:23nov 
		 
		 finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		 var finalRowAmtcalculationgTax = finalsumofRowAmt.toFixed(2);
		$('#totalAmtId' + rowCount).val(finalRowAmtcalculationgTax);
		
		
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
function openProcessdQuotation(call){
	$("#ExpiredQuotation").css("background-color", "");
	$("#processdQuotation").css("background-color", "#81A981");
	$("#ExpiredQuotation").css("color", "black");
	$("#processdQuotation").css("color", "white");
	$("#callFromAuto").val(call);
	getAllPurchaseQuotationMaster(call);
	
}
function openExpiryQuotation(call){
	$("#processdQuotation").css("background-color", "");
	$("#ExpiredQuotation").css("background-color", "#81A981");
	$("#processdQuotation").css("color", "black");
	$("#ExpiredQuotation").css("color", "red");
	$("#callFromAuto").val(call);
	getAllPurchaseQuotationMaster(call);
	
}

/**
 * 
 * @param itemMasterId
 */
function getItemMasterSlaveDetailsModal(itemMasterId)
{
	
	getItemMasterSlaveDetailsById(itemMasterId);
	$('#purchaseOrderModalId').modal('show');
	
}
/**
 * 
 * @param itemMasterId
 */
function getItemMasterSlaveDetailsById(itemMasterId){
var inputs = [];
inputs.push('id=' + itemMasterId);
var str = inputs.join('&');
jQuery.ajax({
	async : true,
	type : 'POST',
	data : str + "&reqType=AJAX",
	url : 'ehat/inventoryPurchaseOrder/getItemMasterSlaveDetails',
	timeout : 1000 * 60 * 5,
	catche : false,
	success : function(r) {
		
		for ( var i = 0; i < r.itemPurchaseSlaveDto.length; i++) {
			if(i == 0){
				$("#itemMasterSlaveRecordList")
				.html(
						"<tr><td>"
								+ "<input type='radio' name='row' id='rowId"
								+ i
								+ "' value="
								+ i
								+ " onclick='getRadioButtonIndex(this.value)' autofocus='autofocus'></td>"
								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='itemNameId"
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
								+ "class='form-control input-SmallText' readonly='true' id='purchaseTaxId"
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
								
								+ "<td class='hidden'><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseUomFactorFourId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								
								+ "<td class='hidden'><input type='hidden'"
								+ "class='form-control input-SmallText'   id='unitName1"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								//HSN id
								+ "<td class='hidden'><input type='hidden'"
								+ "class='form-control input-SmallText'  id='hsnName1"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								
								
								+ "</tr>");

	}
			
			else{
				$("#itemMasterSlaveRecordList")
				.append(
						"<tr><td>"
								+ "<input type='radio' name='row' id='rowId"
								+ i
								+ "' value="
								+ i
								+ " onclick='getRadioButtonIndex(this.value)' autofocus='autofocus'></td>"
								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='itemNameId"
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
								+ "class='form-control input-SmallText' readonly='true' id='purchaseTaxId"
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

								+ "<td class='hidden'><input type='text'"
								+ "class='form-control input-SmallText' id='purchaseUomFactorFourId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								
								+ "<td class='hidden'><input type='hidden'"
								+ "class='form-control input-SmallText'   id='unitName1"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								
								+ "<td class='hidden'><input type='hidden'"
								+ "class='form-control input-SmallText'   id='hsnName1"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								
								+ "</tr>");
				
			}
			if(r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != null && r.itemPurchaseSlaveDto[i].purchaseUomFactor2 == null){
			$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
			$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice1);
			$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
			$("#itemNameId" + i).val(r.itemName);
			$("#purchaseTaxId" + i).val(r.taxType);
			$("#unitName1" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom1);
			$("#hsnName1" + i).val(r.hsnId);
			}
			else if(r.itemPurchaseSlaveDto[i].purchaseUomFactor2 != null && r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != null && r.itemPurchaseSlaveDto[i].purchaseUomFactor3 == null && r.itemPurchaseSlaveDto[i].purchaseUomFactor4 == null){
				$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
				$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice2);
				$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
				$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
				$("#itemNameId" + i).val(r.itemName);
				$("#purchaseTaxId" + i).val(r.taxType);
				$("#unitName1" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom2);
				$("#hsnName1" + i).val(r.hsnId);
			}
			else if(r.itemPurchaseSlaveDto[i].purchaseUomFactor3 != null && r.itemPurchaseSlaveDto[i].purchaseUomFactor2 != null && r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != null && r.itemPurchaseSlaveDto[i].purchaseUomFactor4 == null){
				
				$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
				$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice3);
				$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
				$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
				$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
				$("#itemNameId" + i).val(r.itemName);
				$("#purchaseTaxId" + i).val(r.taxType);
				$("#unitName1" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom3);
				$("#hsnName1" + i).val(r.hsnId);
			}
			else if(r.itemPurchaseSlaveDto[i].purchaseUomFactor4 != null && r.itemPurchaseSlaveDto[i].purchaseUomFactor3 != null && r.itemPurchaseSlaveDto[i].purchaseUomFactor2 != null && r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != null){
				$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
				$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice4);
				$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
				$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
				$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
				$("#purchaseUomFactorFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
				$("#itemNameId" + i).val(r.itemName);
				$("#purchaseTaxId" + i).val(r.taxType);
				
				$("#unitName1" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom4);
				$("#hsnName1" + i).val(r.hsnId);
			}
			
		}
		
	}
});

}

function getRadioButtonIndex(index)
{
	document.getElementById("hiddenRadioButtonIndex").value = index;
}

function setModalInfoToTableOnPurchaseOrder()
{
	var radioButtonIndex = document.getElementById("hiddenRadioButtonIndex").value;
	
	
	var totalRow=0;
	$('#itemMasterSlaveRecordList input[type=radio]').each(function()
	{
		totalRow++;
	});
	var totalCheckboxes = $('input[name=row]:checked').length;
	
	setTableValuesToPurchaseOrderItemInfo(totalCheckboxes,totalRow,radioButtonIndex);
	
}

function setTableValuesToPurchaseOrderItemInfo(totalCheckboxes, totalRow,radioButtonIndex) {
	//var rowCount = 1;
	var test = 0;
	var isNew = 0;
	if(totalRow > 1)
	{
		var table = document.getElementById("itemInfoTable");
		var rowCountNew = table.rows.length;
		
		$("#closeonclick").hide();
		$('#iHidePurOrderBtn').css('display', 'block');
		if (test == 0 && isNew == 0) {
			if (rowCount > 0) {
				
			}
			rowCount = rowCountNew+1;
			$("#itemInfoTable > tbody")
					.append(
			 "<tr class='newAdded' id='mutitr'"
			+ rowCount
			+ "'>"
			+ "<td><input type='checkbox' class='chkMrnItem' id='checkbox" 
			+ rowCount
			+ "' name='checkbox'  value='"+rowCount+"' checked='checked' isNew='true'></td>"
			
			+ "<td class='col-md-1 center'> <span id='snum"+rowCount+"'>"+rowCount+"</span><input type='hidden' id='slaveId"+rowCount+"' value='0'></td>"
			
			+ "<td><div id='divtxtPurchaseQuotationItemName'><input type='text' data-name='purchasequotation'  onkeyup='fetchItemMasterDetails(this.id)'  id='itemName" 
			+ rowCount
			+ "' class='form-control input-Small typeahead'>"
			+ "</div></td>"
			
			+ "<td><input type='text'  onkeypress='return validateNumbers(event)' id='itemQuantity"
			+ rowCount
			+ "' onkeyup='totalAmount(this.id,"+rowCount+")' class='form-control input-SmallText' >"
			+ "</td>"
			
			+ "<td><input type='text'  id='unitPriceId"
			+ rowCount
			+ "' class='form-control input-SmallText'>"
			+ "</td>"
			+ "<td><input type='text' onkeyup='chkTradAmtorPercentage(this.id,"+rowCount+")' onblur='calculTradeDis(this.id,"+ rowCount+ ")' id='discountPerId"
			+ rowCount
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td><input type='text'  onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+rowCount+")' id='discountRsId"
			+ rowCount
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td><input type='text' id='discountAmtId"
			+ rowCount
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td><input type='text' id='baseAmountId"
			+ rowCount
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td><input type='text' id='gstId"
			+ rowCount
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td><input type='text'  onkeyup='rowAmtCal(this.id,"+rowCount+"),autotaxCodeforItem("+rowCount+",onchange)' id='igstId"
			+ rowCount
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td><input type='text'  id='gstAmtId"
			+ rowCount
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td><input type='text'  id='totalAmtId"
			+ rowCount
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td><input type='text'  id='factor1"
			+ rowCount
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td><input type='text'  id='factor2"
			+ rowCount
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td><input type='text'  id='factor3"
			+ rowCount
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td><input type='text'  id='factor4"
			+ rowCount
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td><input type='text' id='orderQtyId"
			+ rowCount
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td><input type='text'  readonly='' id='pendinQtyId"
			+ rowCount
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			
			+ "<td><input type='text'  id='batchId"
			+ rowCount
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			
			+ "<td class='hidden'><input type='hidden'   id='unitName1"
			+ rowCount
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			
			+ "<td class='hidden'><input type='hidden'    id='hsnName1"
			+ rowCount
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			
			
			+ "<td><input type='hidden'  id='itemInfoId"
			+ rowCount
			+ "' class='form-control input-SmallText'  value="+0+">"
			+ "</td>"
									+ " </tr>");

			$("#RowCount").val(rowCount);
			
		}
		for(var j = 0 ; j < totalCheckboxes ; j++)
			
		{
		    j = radioButtonIndex;
			for(var i=1; i<=totalCheckboxes; i++)
			{
				$('#itemQuantity' + i).val($('#itemQuantityId' + j).val());
				$('#unitPriceId' + i).val($('#purchaseUnitPriceOneId' + j).val());
				$('#factor1' + i).val($('#purchaseUomFactorOneId' + j).val());
				$('#factor2' + i).val($('#purchaseUomFactorTwoId' + j).val());
				$('#factor3' + i).val($('#purchaseUomFactorThreeId' + j).val());
				$('#factor4' + i).val($('#purchaseUomFactorFourId' + j).val());
				$('#orderQtyId' + i).val($('#itemQuantityId' + j).val());
				$('#pendinQtyId' + i).val($('#itemQuantityId' + j).val());
				$('#itemName' + i).val($('#itemNameId' + j).val());
				$('#gstId' + i).val($('#purchaseTaxId' + j).val());
				$('#igstId' + i).val($('#purchaseTaxId' + j).val());
				$('#unitName' + i).val($('#unitName1' + j).val());
				$('#hsnName' + i).val($('#hsnName1' + j).val());
			}
			
		}
	}
}
function closeItemPurchaseDetailsModal(){
	refreshPurchaseQuotationMaster();
	$('#itemMasterModal').modal('hide');
	
}

function showpartyMasterDetailsModal(){
	$('#purchasequotationModalId').modal('show');
	
}
function closepartyMasterDetailsModal(){
	$('#purchasequotationModalId').modal('hide');
	
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
				+ response.partyMasterAddressInfoDto[i].state
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
 * @codeFor : setPartyModalInfoToTableOnPurchaseQuotation
 ******************************************************************************/
function setPartyModalInfoToTableOnPurchaseQuotation(){	
		$("input[name='rdTreat']:checked").each(function() {		
				var inx = $(this).val();
				$("#supplierAddress").val($("#address"+inx).html());					
			});
		$("input[name='rdTreat1']:checked").each(function() {	
				var inx = $(this).val();
				$("#mbNo").val($("#contactPhoneOne"+inx).html());					
			});
		$('#purchasequotationModalId').modal('hide');
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 10-Dec-2019
 * @codeFor : refreshPurchaseQuotationMaster
 ******************************************************************************/
function refreshPurchaseQuotationMaster(){	
	
	 $("#purchaseQtMasterId").val(0);
	 $("#mbNo").val("");
	 $("#mbNo").attr("placeholder","Enter Mobile No");
	 $("#referenceNo").val("");
	 $("#referenceNo").attr("placeholder","Enter Reference No");
	 $("#supplierAddress").val("");
	 $("#supplierAddress").attr("placeholder","Enter Supplier Address");
	 $("#supplierName").val("");
	 $("#supplierName").attr("placeholder","Enter Supplier Name"); 
		
	 $("#quotationSeries").val(0);
	 $("#quotationStatus").val(0);
	 $("#supplierState").val(0);
		
	 $("#quotationNo").val(0);
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
	 $("#itemTotalAmt").val(0);
		
	 $("#totalDiscountId").val(0);
	 $('#contactFormId')[0].reset();
	 $('#addressFormId')[0].reset();
		 
		
		
	var tableHeaderRowCount = 1;
	var table = document.getElementById('contactInfoTablePurchaseQuotation');
	var rowCount = table.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
	    table.deleteRow(tableHeaderRowCount);
	}
	
	var tableHeaderRowCount1 = 1;
	var table = document.getElementById('addressInfoTablePurchaseQuotation');
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
* @author    : Dayanand Khandekar
* @date        : 13-jan-2020
* @codeFor    :getUOMTempForQuotation Detail
 ************/
function getUOMTempForQuotation(selectId){
	var unitId = $("#unitId").val();
	var inputs = [];
	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
    jQuery.ajax({
        async : true,
        type : "POST",
        url : "ehat/inventoryM/getAllUnitMaster",
        data : str + "&reqType=AJAX",
        error : function() {
            alert('error');
        },
        success : function(r){    
        	setUOMTempForQuotation(r,selectId);            
        }
    });    
}

/**
 * 
 * @param r
 * @param selectId
 */
function setUOMTempForQuotation(r,selectId){
    var htm="<option value='0'>--Select--</option>";
    for ( var i = 0; i < r.lstunitmaster.length; i++){    
        htm = htm + "<option value='"+r.lstunitmaster[i].uniId+"'>"+r.lstunitmaster[i].unitName+"</option>";
    }
    $("#"+selectId).html(htm);
    //$("#"+selectId).select2();
}

function getItemMasterSlaveDetailsModalForPurchaseQuotation(itemMasterId,id)
{
	
	getItemMasterSlaveDetailsOnOnPopupById(itemMasterId,id);
	$('#generateItemInfo').modal('show');
	
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 7-jan-2020
 * @codeFor : getItemMasterSlaveDetailsOnMRNById()
 ******************************************************************************/
function getItemMasterSlaveDetailsOnOnPopupById(itemMasterId,id) {
	var inputs = [];
	inputs.push('id=' + itemMasterId);
	//inputs.push('subInvId=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		//url : 'ehat/subInventory/getItemMasterSlaveDetailsAndCurrentSubInvStock',
		url: 'ehat/inventoryPurchaseOrder/getItemMasterSlaveDetails',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			
			for ( var i = 0; i < r.itemPurchaseSlaveDto.length; i++) {
				if(i == 0){
					
					$("#itemMasterSlaveRecordListOnMRNGenerate")
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
									+ "class='form-control input-SmallText' readonly='true' value="+itemMasterId+"  id='itemId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									//HSN Name
									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='HSNNameValueModalPQ"
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
									
									+ "<td style='display: none'><input type='hidden'"
									+ "class='form-control input-SmallText' readonly='true' id='purchaseFactorUomOneId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									+ "<td style='display: none'><input type='hidden'"
									+ "class='form-control input-SmallText' readonly='true' id='purchaseFactorUomTwoId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									+ "<td style='display: none'><input type='hidden'"
									+ "class='form-control input-SmallText' readonly='true' id='purchaseFactorUomThreeId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									+ "<td style='display: none'><input type='hidden'"
									+ "class='form-control input-SmallText' readonly='true' id='purchaseFactorUomFourId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									+ "<td style='display: none'><input type='hidden'"
									+ "class='form-control input-SmallText' readonly='true' id='currentSubInventoryStockId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									+ "<td style='display: none'><input type='hidden'"
									+ "class='form-control input-SmallText' readonly='true' id='hsnName"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									+ "</tr>");
		}
				else{
					$("#itemMasterSlaveRecordListOnMRNGenerate")
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
									+ "class='form-control input-SmallText' readonly='true' value="+itemMasterId+"  id='itemId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									//HSN Name
									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='HSNNameValueModalPQ"
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
									
									+ "<td style='display: none'><input type='hidden'"
									+ "class='form-control input-SmallText' readonly='true' id='purchaseFactorUomOneId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									+ "<td style='display: none'><input type='hidden'"
									+ "class='form-control input-SmallText' readonly='true' id='purchaseFactorUomTwoId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									+ "<td style='display: none'><input type='hidden'"
									+ "class='form-control input-SmallText' readonly='true' id='purchaseFactorUomThreeId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									+ "<td style='display: none'><input type='hidden'"
									+ "class='form-control input-SmallText' readonly='true' id='purchaseFactorUomFourId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									+ "<td style='display: none'><input type='hidden'"
									+ "class='form-control input-SmallText' readonly='true' id='currentSubInventoryStockId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									+ "<td style='display: none'><input type='hidden'"
									+ "class='form-control input-SmallText' readonly='true' id='hsnName"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									+ "</tr>");
					
				}
				if(r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor2 == 0){
				$("#currentSubInventoryStockId" + i).val(r.currentSubInventoryStock);	
				
				$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
				$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice1);
				
				$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
				$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
				$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
				$("#purchaseUomFactorFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
				
				
				$("#purchaseFactorUomOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom1);
				
				$("#itemNameId" + i).val(r.itemName);
				$("#cgstRateId" + i).val(r.cgst);
				$("#sgstRateId" + i).val(r.sgst);
				$("#taxNameId" + i).val(r.taxName);
				$("#taxRateId" + i).val(r.taxRate);
				$("#hsnName" + i).val(r.hsnName);
				$("#HSNNameValueModalPQ" + i).val(r.hsnNameValue);
				
				}
				else if(r.itemPurchaseSlaveDto[i].purchaseUomFactor2 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor3 == 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor4 == 0){
					$("#currentSubInventoryStockId" + i).val(r.currentSubInventoryStock);
					$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
					$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice2);
					
					$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
					$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
					$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
					$("#purchaseUomFactorFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
					
					$("#purchaseFactorUomOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom1);
					$("#purchaseFactorUomTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom2);
					$("#itemNameId" + i).val(r.itemName);
					$("#cgstRateId" + i).val(r.cgst);
					$("#sgstRateId" + i).val(r.sgst);
					$("#taxNameId" + i).val(r.taxName);
					$("#taxRateId" + i).val(r.taxRate);
					$("#hsnName" + i).val(r.hsnName);
					$("#HSNNameValueModalPQ" + i).val(r.hsnNameValue);
				}
				else if(r.itemPurchaseSlaveDto[i].purchaseUomFactor3 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor2 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor4 == 0){
					$("#currentSubInventoryStockId" + i).val(r.currentSubInventoryStock);
					$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
					$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice3);
					
					$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
					$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
					$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
					$("#purchaseUomFactorFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
					
					$("#purchaseFactorUomOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom1);
					$("#purchaseFactorUomTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom2);
					$("#purchaseFactorUomThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom3);
					$("#itemNameId" + i).val(r.itemName);
					$("#cgstRateId" + i).val(r.cgst);
					$("#sgstRateId" + i).val(r.sgst);
					$("#taxNameId" + i).val(r.taxName);
					$("#taxRateId" + i).val(r.taxRate);
					$("#hsnName" + i).val(r.hsnName);
					$("#HSNNameValueModalPQ" + i).val(r.hsnNameValue);
				}
				else if(r.itemPurchaseSlaveDto[i].purchaseUomFactor4 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor3 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor2 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0){
					$("#currentSubInventoryStockId" + i).val(r.currentSubInventoryStock);
					$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
					$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice4);
					$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
					$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
					$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
					$("#purchaseUomFactorFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
					
					$("#purchaseFactorUomOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom1);
					$("#purchaseFactorUomTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom2);
					$("#purchaseFactorUomThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom3);
					$("#purchaseFactorUomFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseFactorUom4);
					
					
					
					$("#itemNameId" + i).val(r.itemName);
					$("#cgstRateId" + i).val(r.cgst);
					$("#sgstRateId" + i).val(r.sgst);
					$("#taxNameId" + i).val(r.taxName);
					$("#taxRateId" + i).val(r.taxRate);
					$("#hsnName" + i).val(r.hsnName);
					$("#HSNNameValueModalPQ" + i).val(r.hsnNameValue);
				}
				
			}
			
		}
	});
}
/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 7-jan-2020
 * @codeFor : setModalInfoToPurchaseQuotationItemSalve()
 ******************************************************************************/
function setModalInfoToPurchaseQuotationItemSalve(){
	var table = document.getElementById("itemInfoTable");
	var itemSlaveRowCount = table.rows.length;
	var newItemSlaveRowCount = itemSlaveRowCount - 1;
	var totalRow=0;
	$('#itemMasterSlaveRecordListOnMRNGenerate input[type=radio]').each(function(){
		totalRow++;
	});
	var totalCheckboxes = $('input[name=row]:checked').val();
	setTableValuesToPurchaseQuotationItemSlave(totalCheckboxes,totalRow,newItemSlaveRowCount);
}

function setTableValuesToPurchaseQuotationItemSlave(totalCheckboxes, totalRow,radioButtonIndex) {
	if(totalRow >= 1){
				$('#itemMasterId' + radioButtonIndex).val($('#itemId' + totalCheckboxes).val());
				$('#itemQuantity' + radioButtonIndex).val($('#itemQuantityId' + totalCheckboxes).val());
				$('#unitPriceId' + radioButtonIndex).val($('#purchaseUnitPriceOneId' + totalCheckboxes).val());
				$('#pqfactor1' + radioButtonIndex).val($('#purchaseUomFactorOneId' + totalCheckboxes).val());
				$('#pqfactor2' + radioButtonIndex).val($('#purchaseUomFactorTwoId' + totalCheckboxes).val());
				$('#pqfactor3' + radioButtonIndex).val($('#purchaseUomFactorThreeId' + totalCheckboxes).val());
				$('#pqfactor4' + radioButtonIndex).val($('#purchaseUomFactorFourId' + totalCheckboxes).val());
				$('#orderQtyId' + radioButtonIndex).val($('#itemQuantityId' + totalCheckboxes).val());
				$('#pendinQtyId' + radioButtonIndex).val($('#itemQuantityId' + totalCheckboxes).val());
				$('#itemName' + radioButtonIndex).val($('#itemNameId' + totalCheckboxes).val());
				$('#gstId' + radioButtonIndex).val($('#taxRateId' + totalCheckboxes).val());
				//$('#igstId' + radioButtonIndex).val($('#taxRateId' + totalCheckboxes).val());
				$('#hsnName' + radioButtonIndex).val($('#hsnName' + totalCheckboxes).val());
				$('#hsnCodeNamePurchaseQuotation' + radioButtonIndex).val($('#HSNNameValueModalPQ' + totalCheckboxes).val());
				var unit1 = $('#purchaseFactorUomOneId'+totalCheckboxes).val();
				var unit2 = $('#purchaseFactorUomTwoId'+totalCheckboxes).val();
				var unit3 = $('#purchaseFactorUomThreeId'+totalCheckboxes).val();
				var unit4 = $('#purchaseFactorUomFourId'+totalCheckboxes).val();
				if(unit1 != 0 && unit2 == ""){
				$('#unitName' + radioButtonIndex).val($('#purchaseFactorUomOneId' + totalCheckboxes).val());
				}
				else if(unit2 != 0 && unit1 != 0 && unit3 == "" && unit4 == ""){
					$('#unitName' + radioButtonIndex).val($('#purchaseFactorUomTwoId' + totalCheckboxes).val());	
				}
				else if(unit3 != 0 && unit2 != 0 && unit1 != 0 && unit4 == ""){
					$('#unitName' + radioButtonIndex).val($('#purchaseFactorUomThreeId' + totalCheckboxes).val());	
				}
				else if(unit4 != 0 && unit3 != 0 && unit2 != 0 && unit1 != 0){
					$('#unitName' + radioButtonIndex).val($('#purchaseFactorUomFourId' + totalCheckboxes).val());	
				}
			}
	closeItemMasterPopUpModal();
}

function closeItemMasterPopUpModal(){
	$("#generateItemInfo").modal('hide');
}

/************
* @author	: Dayanand Khandekar
* @date		: 13-Jan-2020
* @codeFor	:getAllStateMasterForPurchaseQuotation
 ************/
function  getAllStateMasterForPurchaseQuotation(){
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
                    + "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";
           
            for ( var i = 0; i < r.stateList.length; i++) {                            
                	divContent = divContent + "<option value='" + r.stateList[i].state_id + "'>"
                        + r.stateList[i].state_name + "</option>";
            }
            divContent = divContent + "</select>";
            $("#supplierState").html(divContent);
            $("#supplierState").select2();
          
		}	
	});
}
/************
* @author	: Dayanand Khandekar
* @date		: 13-Jan-2020
* @codeFor	:closePurchaseQuationPopUp
 ************/
function closePurchaseQuationPopUp(){
	refreshPurchaseQuotationMaster();
	$("#itemMasterModal").modal('hide');
}
/************
* @author	: Dayanand Khandekar
* @date		: 16-Jan-2020
* @codeFor	:setParyMasterStateToPurchaseQuotation
 ************/
function setParyMasterStateToPurchaseQuotation(r){
		
		var divContent = "";
        divContent = divContent
                + "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";
       
        for ( var i = 0; i < r.partyMasterAddressInfoDto.length; i++) {                            
            	divContent = divContent + "<option value='" + r.partyMasterAddressInfoDto[i].stateId + "'>"
                    + r.partyMasterAddressInfoDto[i].state + "</option>";
        }
        divContent = divContent + "</select>";
        $("#supplierState").html(divContent);
        $("#supplierState").select2();
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
		$('#itemTotalAmount' + rowCount).val(' ');
		return false;
	}
	var baseAmt = $('#baseAmountId' + rowCount).val();
	if (baseAmt == " " || baseAmt == null) {
		$("#totalAmtId").val(' ');
		$("#itemTotalAmount").val(' ');
		return false;
	} else {
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#baseAmountId' + rowCount).val();
		var taxAmt = $("#gstId" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$("#gstAmtId" + rowCount).val(finalcaltaxanmount); // add tax amount in
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmountAddingtax = finalsumofRowAmt.toFixed(2);
		$('#totalAmtId' + rowCount).val(finalRowAmountAddingtax);
		$('#itemTotalAmount' + rowCount).val(finalRowAmountAddingtax);
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
			$("#itemTotalAmount" + rowCount).val(' ');
		}
		var baseAmt = $('#baseAmountId' + rowCount).val();
		
		if (baseAmt == " " || baseAmt == null) {
			$("#totalAmtId" + rowCount).val(' ');
			$("#itemTotalAmount" + rowCount).val(' ');
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
 * @author : Dayanand Khandekar
 * @date : 21-Jan-2020
 * @codeFor :getPartyState
 ******************************************************************************/

function getPartyState(){
	var supplierState = $("#supplierState option:selected").val();
	$("#hiddensupplierstate").val(supplierState);//added by dayanand to determine to apply gst or igst
	var userState = $("#userState").val();
	var rows = $('#itemInfoTable tbody tr.newAdded').length;
	for (var i = 1; i <= rows; i++) {
	if(supplierState == userState){
		document.getElementById("gstId" + i).disabled = false;
		document.getElementById("igstId" + i).disabled = true;
	}else{
		document.getElementById("gstId" + i).disabled = true;
		document.getElementById("igstId" + i).disabled = false;
	}
	}
	
}

/*******************************************************************************
 * @author : Dayanand Khandekar
 * @date : 8-Nov-2019
 * @codeFor : to Set Row Template To Body Of Item Info Table
 ******************************************************************************/
function getPurchaseQuotationItemInfoBodyOnPlus(id) {
	/*var partyState= $("#hiddensupplierstate").val();
	var userState= $("#userState").val();*/
	var supplierState = $("#supplierState option:selected").val();
	var userState = $("#userState").val();
	$("#unitName" +id).select2();
		getUOMTempForQuotation("unitName"+id);
	var tbody = "";
	tbody = tbody
			+ "<tr class='newAdded' id='mutitr'"
			+ id
			+ "'>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkMrnItem' id='checkbox" 
			+ id
			+ "' name='checkbox'  value='"+id+"'></td>"
			
			+ "<td class='col-md-4 col-xs-12 col-sm-4 center'> <span id='snum"+id+"'>"+id+"</span><input type='hidden' id='itemInfoId"+id+"' value='0'></td>"
			
			+ "<td class='col-md-8 col-xs-12 col-sm-8 center'><div id='divtxtPurchaseQuotationItemName"+id+"'><input type='text' data-name='purchasequotation'  onkeyup='fetchItemMasterDetails(this.id,"+id+")'  id='itemName" 
			+ id
			+ "' class='form-control input-Small'  style='width: 250px;'>"
			+ "</div></td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' onkeypress='return validateNumbers(event)' id='itemQuantity"
			+ id
			+ "' onkeyup='totalAmount(this.id,"+id+")' class='form-control input-SmallText' >"
			+ "</td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' id='unitPriceId"
			+ id
			+ "' class='form-control input-SmallText'>"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' onkeyup='chkTradAmtorPercentage(this.id,"+id+")' onblur='calculTradeDis(this.id,"+ id+ ")' id='discountPerId"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+id+")' id='discountRsId"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' id='discountAmtId"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style=' width: 80px;' type='text' id='baseAmountId"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			
			if(parseInt(supplierState) == parseInt(userState)){
				
		tbody = tbody	+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text'   value='0'   style=' width: 80px;'  onkeyup='rowAmtCalForGst(this.id,"+id+");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst("+id+",onchange)' id='gstId"
				+ id
				+ "' class='form-control input-SmallText' >"
				+ "</td>"
			
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' value='0' disabled='disabled' onkeyup='rowAmtCalForIGST(this.id,"+id+"),calculateTotalItemAmount("+id+"),calculateTotalItemigstAmount(),autotaxCodeforItemIGST("+id+",onchange)' id='igstId"
				+ id
				+ "' class='form-control input-SmallText' >"
				+ "</td>";
				
			}else{
				
		tbody = tbody	+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px; value='0' disabled='disabled' onkeyup='rowAmtCalForGst(this.id,"+id+"),calculateTotalItemAmount("+id+"),calculateTotalItemgstAmount("+id+"),autotaxCodeforItemGst("+id+",onchange)' id='gstId"
				+ id
				+ "' class='form-control input-SmallText' >"
				+ "</td>"
				
				
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' value='0'  onkeyup='rowAmtCalForIGST(this.id,"+id+"),calculateTotalItemAmount("+id+"),calculateTotalItemigstAmount(),autotaxCodeforItemIGST("+id+",onchange)' id='igstId"
				+ id
				+ "' class='form-control input-SmallText' >"
				+ "</td>";
			}
			
		tbody = tbody	+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' value='0' disabled='disabled' style=' width: 80px;' id='gstAmtId"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' value='0' disabled='disabled' style=' width: 80px;' id='igstAmtId"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' disabled='disabled' id='totalAmtId"
			+ id
			+ "' class='form-control input-SmallText' style=' width: 80px;'>"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;'  id='pqfactor1"+ id + "' class='form-control input-SmallText'></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' id='pqfactor2"+ id + "' class='form-control input-SmallText'></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' id='pqfactor3"+ id + "' class='form-control input-SmallText'></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 80px;' id='pqfactor4"+ id + "' class='form-control input-SmallText'></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'> <input type='text' id='orderQtyId"
			+ id
			+ "' class='form-control input-SmallText' style='width: 80px;'>"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  readonly='' id='pendinQtyId"
			+ id
			+ "' class='form-control input-SmallText' style='width: 80px;' >"
			+ "</td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><select class='form-control' style='width:100px' id='unitName"+id+"'><option value='0'>---Select---</option></select></td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'> <input type='text' disabled='disabled' id='itemTotalAmount"
			+ id
			+ "' class='form-control input-SmallText' style='width: 80px;'>"
			+ "</td>"
			
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center hidden'><input type='text'  id='batchId"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			//hsn id here
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'  style='display:none'><input type='text'  id='hsnName"
			+ id
			+ "' class='form-control input-SmallText' >"
			+ "</td>"
			//hsn name here
			+ "<td style='display:none'><input type='text' disabled='disabled' class='form-control input-SmallText' id='hsnCodeNamePurchaseQuotation"
			+ id
			+ "'  style='width:90px;'></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none'><input type='text' id='itemMasterId"+id+"' class='form-control input-SmallText'> </td>"
			+ "</tr>";
	$("#RowCount").val(id);
	var totaltblsize = $("#RowCount").val();
	$("#totaltblsize").val(totaltblsize);
	$("#itemInfoDetails").append(tbody);
}

function removeDuplicateStatesPurchaseQuotation(){
	var optionValues =[];
	$('#supplierState option').each(function(){
	   if($.inArray(this.value, optionValues) >-1){
	      $(this).remove();
	   }else{
	      optionValues.push(this.value);
	   }
	});
}



/**
 * @author Dayanand Khandekar
 * @since 27-12-2019
 * @comment created below function to add dynamic rows on purchase Quotation
 * @param tabType
 */
function addDynamicRowsOnPurchaseQuotation(tabType) {
    if (tabType === "ContactInfo") {
		var rows = $('#contactInfoTablePurchaseQuotation tbody tr.newAdded').length;
		addDynamicRecordsToContactInfoTableOnPurchaseQuotation(rows + 1);
	} else if (tabType === "AddressInfo") {
		var rows = $('#addressInfoTablePurchaseQuotation tbody tr.newAdded').length;
		addDynamicRecordsToAddressInfoTableOnPurchaseQuotation(rows + 1);
	}
	else if(tabType == "TermsAndConditionInfo")
		{
		var rows = $('#TermsAndConditionInfoTable tbody tr.newAdded').length;
		addDynamicRecordsToTermsAndConditionTableOnPurchaseQuotation(rows + 1);
		}

}

/**
 * @author Dayanand Khandekar
 * @since 13-4-2020
 * @comment created below function to add dynamic records to contact info table on purchase Quotation
 * @param id
 * @returns {Boolean}
 */
function addDynamicRecordsToContactInfoTableOnPurchaseQuotation(id) {
	
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
	htm = htm +
		'<tr class="newAdded"> ' +
		' <td class="col-md-1 center">' +
		id +
		'</td>' +
		' <td class="col-md-1 center" id="contactPersonId' +
		id +
		'">' +
		contactPerson +
		'</td>' +
		' <td class="col-md-1 center" id="contactDesignationId' +
		id +
		'">' +
		contactDesignation +
		'</td>' +
		' <td class="col-md-1 center" id="contatcAddressId' +
		id +
		'">' +
		contatcAddress +
		'</td>' +
		' <td class="col-md-1 center" id="contactGenderId' +
		id +
		'" style="display:none">' +
		contactGender +
		'</td>' +
		' <td class="col-md-1 center" id="contactDobId' +
		id +
		'" style="display:none">' +
		contactDob +
		'</td>' +
		' <td class="col-md-1 center" id="contactPhoneOneId' +
		id +
		'" style="display:none">' +
		contactPhoneOne +
		'</td>' +
		' <td class="col-md-1 center" id="contactPhoneSecondId' +
		id +
		'" style="display:none">' +
		contactPhoneSecond +
		'</td>' +
		' <td class="col-md-1 center" id="contactMailId' +
		id +
		'" style="display:none">' +
		contactMail +
		'</td>' +
		' <td class="col-md-1 center" id="contactInfoId' +
		id +
		'" style="display:none">' +
		0 +
		'</td>' +
		
		 ' <td class="col-md-1 center" id="contactInfoId'
		+ id
		+ '" style="display:none">'
		+ 0
		+ '</td>'
		+ ' <td class="col-md-1 center" id="contactInfoId1'
		+ id
		+ '" style="display:none" >'
		+ id
		+ '</td>'+
		
		
		' <td class="col-md-1 center"><input type="hidden" id="editContactPartMaster' +
		id + '" value="' + id + '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editContactInfoPartyMasterOnPQ(' +
		id +
		',\'fromUI\')"><i class="fa fa-edit"></i></button></td>' +
		' <td class="col-md-1 center">' +
		'	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deleteContactPartMaster' +
		id + '" onclick="deletePartyMasterSlaveOnPQ(' + id +
		',\'deleteContact\')" ' +
		'><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyContactTableInfoList").append(htm);
	$('#contactFormId')[0].reset();
	
}

/**
 * @author Dayanand Khandekar
 * @since 13-04-2020
 * @comment created below function to set modal info to table on purchase quotation and rest form as well this function is dynamic 
 * @param id
 * @returns {Boolean}
 */

function addDynamicRecordsToAddressInfoTableOnPurchaseQuotation(id) {

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
	htm = htm +
		'<tr class="newAdded"> ' +
		' <td class="col-md-1 center">' +
		id +
		'</td>' +
		' <td class="col-md-1 center" id="companyNameId' +
		id +
		'">' +
		companyName +
		'</td>' +
		' <td class="col-md-1 center" id="companyCountryId' +
		id +
		'">' +
		hiddenCountryName +
		'</td>' +
		' <td class="col-md-1 center" id="companyCityId' +
		id +
		'">' +
		hiddenCityName +
		'</td>' +
		' <td class="col-md-1 center" id="companyAddressId' +
		id +
		'" style="display:none">' +
		companyAddress +
		'</td>' +
		' <td class="col-md-1 center" id="companyAddressTypeId' +
		id +
		'" style="display:none">' +
		companyAddressType +
		'</td>' +
		' <td class="col-md-1 center" id="companyStreetId' +
		id +
		'" style="display:none">' +
		companyStreet +
		'</td>' +
		' <td class="col-md-1 center" id="companyAreaId' +
		id +
		'" style="display:none">' +
		companyArea +
		'</td>' +
		' <td class="col-md-1 center" id="companyPinId' +
		id +
		'" style="display:none">' +
		companyPin +
		'</td>' +
		' <td class="col-md-1 center" id="companyStateId' +
		id +
		'" style="display:none">' +
		hiddenStateName +
		'</td>' +
		' <td class="col-md-1 center" id="companyDistictId' +
		id +
		'" style="display:none">' +
		hiddenDistrictName +
		'</td>' +
		' <td class="col-md-1 center" id="companyTalukaId' +
		id +
		'" style="display:none">' +
		hiddenTalukaName +
		'</td>' +
		' <td class="col-md-1 center" id="hiddenCountryNameId' +
		id +
		'" style="display:none">' +
		companyCountry +
		'</td>' +
		' <td class="col-md-1 center" id="hiddenStateNameId' +
		id +
		'" style="display:none">' +
		companyState +
		'</td>' +
		' <td class="col-md-1 center" id="hiddenDistrictNameId' +
		id +
		'" style="display:none">' +
		companyDistict +
		'</td>' +
		' <td class="col-md-1 center" id="hiddenTalukaNameId' +
		id +
		'" style="display:none">' +
		companyTaluka +
		'</td>' +
		' <td class="col-md-1 center" id="hiddenCityNameId' +
		id +
		'" style="display:none">' +
		companyCity +
		'</td>' +
		' <td class="col-md-1 center" id="addressInfoId' +
		id +
		'" style="display:none">' +
		0 +
		'</td>' +
		
		
		' <td class="col-md-1 center" id="addressInfoId1' +
		id +
		'" style="display:none">' +
		id +
		'</td>' +
		
		' <td class="col-md-1 center" id="addInfoId' +
		id +
		'" style="display:none">' +
		id +
		'</td>' +
		
		' <td class="col-md-1 center"><input type="hidden" id="editAddressPartMaster' +
		id + '" value="' + id + '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editAddressInfoPartyMasterOnPQ(' +
		id +
		',\'fromUI\')"><i class="fa fa-edit"></i></button></td>' +
		' <td class="col-md-1 center">' +
		'	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deleteAddressPartMaster' +
		id + '" onclick="deletePartyMasterSlaveOnPQ(' + id +
		',\'deleteAddress\')" ' +
		'><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
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

/**
 * @author Dayanand Khandekar
 * @since 13-04-2020
 * @comment created below function to add dynamic records to terms and condition table on purchase purchase Quotation
 * @param id
 */
function addDynamicRecordsToTermsAndConditionTableOnPurchaseQuotation(id){
	
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
	+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editTermsAndConditionInfoPartyMasterOnPQ('
	+ termsAndConditionsTitleVal
	+ ')"><i class="fa fa-edit"></i></button></td>'
	+ ' <td class="col-md-1 center">'
	+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="true" id ="deleteTermsAndCondition'
	+ id + '" onclick="deletePartyMasterSlaveOnPQ('
	+ termsAndConditionsTitleVal + ',\'deleteTermsAndCondition\')" '
	+ '><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
$("#TermsAndConditionInfoTableList").append(htm);
$('#termsAndConditionsTitle').select2('val', 0);
$('#termsAndCondition').val("").empty();

}






function editContactInfoPartyMasterOnPQ(id, callFrom) {
	var rows = $('#contactInfoTablePurchaseQuotation tbody tr.newAdded').length;
	
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



function updateContactInfoPartyMasterOnPQ() {

	var rows = $('#contactInfoTablePurchaseQuotation tbody tr.newAdded').length;
	for (var i = 1; i <= rows; i++) {
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


function editAddressInfoPartyMasterOnPQ(id, callFrom) {
	var rows = $('#addressInfoTablePurchaseQuotation tbody tr.newAdded').length;
	
	for ( var i = 1; i <= rows; i++) {
		var addressInfoId = $("#addressInfoId1" + i).text();
		var addInfoId = $("#addInfoId" + i).text();
		var addInfoIdAdd = $("#addressInfoId" + i).text();
		
		if (id == addressInfoId || id == addInfoIdAdd) {
			$("#addInfoIdNew").val($("#addressInfoId" + id).html());
			$("#companyNameFromAddress").val($("#companyNameId" + id).html());

			
			$("#countryFromAddress").select2('val',	$("#hiddenCountryNameId" + id).html());
			
			$("#stateFromAddress").select2('val',
					$("#hiddenStateNameId" + id).html());
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

function updateAddressInfoPartyMasterOnPQ() {
	var rows = $('#addressInfoTablePurchaseQuotation tbody tr.newAdded').length;
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


function getMasterTermsAndConditionOnPQ() {
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






function getTermConditionMasterOnPQ(termconditionId) {
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

//this is for terms and Conditions info edit
function editTermsAndConditionInfoPartyMasterOnPQ(id) {
	getTermConditionMaster(id);
	$("#saveTermsAndConditionInfo").hide();
	$("#updateTermsAndConditionInfo").show();
}


//this is for terms and Conditions update
function updateTermsAndConditionPartyMasterPQ() {
	var rows = $('#TermsAndConditionInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var termsAndCondId = $("#termsAndCondSlaveId" + i).val();
		var id = $("#updateTermsAndConditionInfo").attr(
				'updatetermsAndCondInfoId');
		if (termsAndCondId == id) {
			$("#txtTermsAndConditionsTitleId" + i).html(
					$("#termsAndConditionsTitle option:selected").html());
			$("#txtTermsAndConditionId" + i)
					.html($("#termsAndCondition").val());
			$("#saveTermsAndConditionInfo").show();
			$("#updateTermsAndConditionInfo").hide();
		}
	}
	resetInfoFields('TermsAndConditionInfo');
}



/**
 * @author Rohit Sandbhor
 * @since 27-12-2019
 * @comment created below function to delete party master slave
 */
function deletePartyMasterSlaveOnPQ(id,callFrom){
	var partyMasterId = $("#partyMasterId").val();
	if(callFrom === "deleteGeneral"){
		
		$("#PartyGeneralTableInfoList").on('click', '#deleteGeneralPartMaster'+id+'', function () {
				var isNew = $("#deleteGeneralPartMaster"+id).attr('isNew');
				if(isNew !=undefined && isNew !=null && isNew =="false"){
				 $(this).closest('tr').remove();
				 var inputs = [];
					inputs.push('id=' + id);
					inputs.push('partyMasterId=' + partyMasterId);
					inputs.push('callFrom=' + callFrom);
					var str = inputs.join('&');
					jQuery.ajax({
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
				}else{
					$(this).closest('tr').remove();
				}
					
		 });
	}else if(callFrom === "deleteContact"){
		$("#PartyContactTableInfoList").on('click', '#deleteContactPartMaster'+id+'', function () {
			var isNew = $("#deleteContactPartMaster"+id).attr('isNew');
			if(isNew !=undefined && isNew !=null && isNew =="false"){
				$(this).closest('tr').remove();
				 var inputs = [];
					inputs.push('id=' + id);
					inputs.push('partyMasterId=' + partyMasterId);
					inputs.push('callFrom=' + callFrom);
					var str = inputs.join('&');
					jQuery.ajax({
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
			}else{
				$(this).closest('tr').remove();
			}
		 });
	}else if(callFrom === "deleteAddress"){
		$("#PartyAddressTableInfoList").on('click', '#deleteAddressPartMaster'+id+'', function () {
			var isNew = $("#deleteAddressPartMaster"+id).attr('isNew');
			if(isNew !=undefined && isNew !=null && isNew =="false"){ 
			$(this).closest('tr').remove();
			 var inputs = [];
				inputs.push('id=' + id);
				inputs.push('partyMasterId=' + partyMasterId);
				inputs.push('callFrom=' + callFrom);
				var str = inputs.join('&');
				jQuery.ajax({
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
			}else{
				$(this).closest('tr').remove();
			}
		 });
	}
}


function setPurchaseQuotationPartyAddressSlaveList(purchaeQuotationAddressInfoDtoDetails,addressInfoId,
		companyAddressType, companyNameId, companyAddressId, companyStreetId,
		companyPinId, companyAreaId, companyCityName, cityId,
		companyTalukaName, talukaId, companyDistrictName, districtId, companyStateName, 
		stateId, companyCountryName, countryId, userId, unitId){
	
	purchaeQuotationAddressInfoDtoDetails.partyMasterAddressInfoDto.push({
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


function setTermsAndConditionInfoListForPQ(
		purchaeQuotationTermAndConditionInfoDtoDetails, termsAndConditionInfoId,
		termsAndConditionTitleId, termsAndConditionNameId, userId, unitId,termsAndConditionSlaveId) {

	purchaeQuotationTermAndConditionInfoDtoDetails.termsAndConditionInfoDto.push({
		id : termsAndConditionInfoId,
		headingName : termsAndConditionTitleId,
		termconditionName : termsAndConditionNameId,
		createdBy : userId,
		unitId : unitId,
		updatedBy : userId,
		termsConditionSlaveId : termsAndConditionSlaveId

	});
}

/**
 * @author Rohit Sandbhor
 * @since 27-12-2019
 * @comment created below function to set modal info to set party contact info and address info on purchase order
 * @param response
 */
function setPartyInfoOnPurchaseQuotaion(response){
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
					+ '" onclick="deletePartyMasterSlaveOnPO('
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
					+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editAddressInfoPartyMasterOnPQ('
					+ count
					+ ',\'fromDB\')"><i class="fa fa-edit"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteAddressPartMaster'
					+ response.partyMasterAddressInfoDto[i].id
					+ '"  onclick="deletePartyMasterSlaveOnPQ('
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
					+ '" onclick="deletePartyMasterSlaveOnPO('
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
			
					
				var gstNo=	 response.partyMasterGeneralInfoDto[i].gstTransactionNo;
				
				if(gstNo==null||gstNo=="null"){
					$("#partGstNo").val(0);
				}else{
					$("#partGstNo").val(gstNo);
				}
					
			}
		
	}

}	


/*******************************************************************************
 * @author : Dayanand khandekar
 * @date : 27-02-2020
 * @codeFor : calcultae total item amount with igst_gst_base amount of all item
 ******************************************************************************/
function calculateTotalItemAmount(id){
	
var tableLengt = $('#itemInfoTable tbody tr.newAdded').length;
	
	var totalGstAMt=0;
	for(var i=1;i<=tableLengt;i++){
		
		var totalAmt=$("#totalAmtId"+i).val();
		
		totalGstAMt=parseFloat(totalGstAMt)+ parseFloat(totalAmt);
		
	}
	
	$("#itemTotalAmt").val(totalGstAMt);
}



/*******************************************************************************
 * @author : Dayanand khandekar
 * @date : 28-02-2020
 * @codeFor : this function calculate total igst amount of all item
 ******************************************************************************/
function calculateTotalItemigstAmount(){
	
var tableLengt = $('#itemInfoTable tbody tr.newAdded').length;
	
	var totalGstAMt=0;
	for(var i=1;i<=tableLengt;i++){
		
		var itemGstAmt=$("#igstAmtId"+i).val();
		
		totalGstAMt=parseFloat(totalGstAMt)+ parseFloat(itemGstAmt);
		
	}
	
	$("#totaliGstAmt").val(totalGstAMt);
	
}


function autotaxCodeforItemIGST(rowCount, onchange) {
	var igstId = $("#igstId" + rowCount).val();
	applyTaxforItemexpenseOfIgstAmt(igstId);
}


function applyTaxforItemexpenseOfIgstAmt(inputID) {

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

	rowAmtCalNEWForIgst(1, rowCount[1]);
	totalVatAmtnEWForIgst(1, rowCount[1]);

}

function rowAmtCalForIGST(id, rowCount) {
	var taxAmt = $("#igstId" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#totalAmtId' + rowCount).val(' ');
		$('#itemTotalAmount' + rowCount).val(' ');
		return false;
	}
	var baseAmt = $('#baseAmountId' + rowCount).val();
	if (baseAmt == " " || baseAmt == null) {
		$("#totalAmtId").val(' ');
		$("#itemTotalAmount").val(' ');
		return false;
	} else {
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#baseAmountId' + rowCount).val();
		var taxAmt = $("#igstId" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$("#igstAmtId" + rowCount).val(finalcaltaxanmount); // add tax amount in
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmountAddingtax = finalsumofRowAmt.toFixed(2);
		$('#totalAmtId' + rowCount).val(finalRowAmountAddingtax);
		$('#itemTotalAmount' + rowCount).val(finalRowAmountAddingtax);
	}

}

/*******************************************************************************
 * @author : Dayanand khandekar
 * @date : 28-02-2020
 * @codeFor : this function calculate total gst amount of all item
 ******************************************************************************/
function calculateTotalItemgstAmount(id){
	var tableLengt = $('#itemInfoTable tbody tr.newAdded').length;
	
	var totalGstAMt=0;
	for(var i=1;i<=tableLengt;i++){
		
		var itemGstAmt=$("#gstAmtId"+i).val();
		
		totalGstAMt=parseFloat(totalGstAMt)+ parseFloat(itemGstAmt);
		
	}
	
	$("#totalGstAmt").val(totalGstAMt);
}


function rowAmtCalNEWForIgst(id, rowCount) {
	var taxAmt = $("#igstId" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#totalAmtId' + rowCount).val('');
		$("#itemTotalAmount" + rowCount).val(' ');
	}
	var baseAmt = $('#baseAmountId' + rowCount).val();
	if (baseAmt == " " || baseAmt == null) {
		$("#totalAmtId" + rowCount).val(' ');
		$("#itemTotalAmount" + rowCount).val(' ');
		return false;
	}
	else {
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#baseAmountId' + rowCount).val();
		var taxAmt = $("#igstId" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$('#igstAmtId' + rowCount).val(finalcaltaxanmount); 
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmtcalculationgTax = finalsumofRowAmt.toFixed(2);
		$('#totalAmtId' + rowCount).val(finalRowAmtcalculationgTax);
		
		$('#itemTotalAmount' + rowCount).val(finalRowAmtcalculationgTax);
	}
}	

function totalVatAmtnEWForIgst(id, rowCount) {
	var sum = 0;
	var baseAmount;
	var RowCount = $("#RowCount").val();
	var caltaxonBaseAmt;
	// var totalRow = $("#totalRow").val();
	var totaltblsize = $("#totaltblsize").val();
	for ( var i = 1; i <= totaltblsize; i++) {
		baseAmount = $("#baseAmountId" + i).val();
		var taxAmt = $("#igstId" + i).val();
		if (baseAmount == null || taxAmt == null || taxAmt == undefined
				|| taxAmt == '' || baseAmount == undefined || baseAmount == '') {
			var flag = 1;
		} else {
			caltaxonBaseAmt = parseFloat(baseAmount) * parseFloat(taxAmt) / 100;
			var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
			sum = parseFloat(sum) + parseFloat(finalcaltaxanmount);
		}
	}
	$("#txtigstVat").val(sum.toFixed(2));
	$("#txtTotalVat").val(sum.toFixed(2));
	$("#textVat").val(sum.toFixed(2));
	var totalgrossAmt = $("#txtGross").val();
	$("#txtNetAmt").val(
			(parseFloat(sum) + parseFloat(totalgrossAmt)).toFixed(2));

}	

//this is for document upload in purchase order by Vishnu

function uploadPurchaseQuotationDocuments(pqMasterId) {
	var form = $("#documentForm")[0];
	if (document.getElementsByName("uploadPqDocs").length == 0 || $("#uploadPqDocument").val() == "") {
		alert("Please select file");
		return false;
	}
	var pqId = 0;
	if(pqMasterId  !=undefined && pqMasterId !=null && pqMasterId !=0 && pqMasterId !='undefined'){
		pqId = pqMasterId;
	}else{
		pqId = $("#purchaseQtMasterId").val();	
	}
	var pqDocSlaveId = $("#pqDocSlaveId").val();
	var uploadPqDocument = getFileValue('uploadPqDocument');
	var uploadPqComment = $("#uploadPqComment").val();

	var pqDocumentUpload = {
			lstPurchaseQuotationDocUploadDto : []
		};
	pqDocumentUpload.lstPurchaseQuotationDocUploadDto.push({
		id : pqDocSlaveId,
		purchaseQuotationId : parseInt(pqId),
		imagePath : JSON.stringify(uploadPqDocument),
		note : uploadPqComment,
	});

	var data = new FormData(form);
	data.append("documentUpload", JSON.stringify(pqDocumentUpload));
	data.append("pqMasterId", pqId);

	jQuery.ajax({
		async : true,
		type : "POST",
		enctype : 'multipart/form-data',
		url : "ehat/purchasequotation/uploadPurchaseQuotationDocument",
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
				getUploadedDocuments(pqId);
				$('#uploadPqDocument').val("");
				$('#uploadPqComment').val("");
			}else if(r == 2){
				alertify.success("Document Updated Sucessfully"); 
				getUploadedDocuments(pqId);
				$('#uploadPqDocument').val("");
				$('#uploadPqComment').val("");
			}else if(r == 0){
				alertify.error("Oops Some Problem Ocured"); 
			}
		}
	});
}
function getUploadedDocuments(pqId){
	var pqId = pqId; // $("#grnId").val();
	var count = 0;
	var htm = "";
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {"pqMasterId" : pqId },
		url : "ehat/purchasequotation/getUploadedDocuments",
		success : function(response) {
			if(response !=null && response !="" && response.lstPurchaseQuotationDocUploadDto !=null){
				var fileName = "";
				//fileName.replace(/^\[(.+)\]$/,'$1')
				
				for ( var i = 0; i < response.lstPurchaseQuotationDocUploadDto.length; i++) {
					count++;
					fileName = response.lstPurchaseQuotationDocUploadDto[i].imagePath;
					htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="filePathDocumentUploadId' + count
					+ '" >'
					+ response.lstPurchaseQuotationDocUploadDto[i].imagePath
					+ '</td>'
					+ ' <td class="col-md-1 center" id="commentDocumentUploadId' + count
					+ '" >'
					+ response.lstPurchaseQuotationDocUploadDto[i].note
					+ '</td>'
					+ ' <td class="col-md-1 center" id="uploadedDateDocumentUploadId' + count
					+ '" >'
					+ getDateTimePurchaseQuotation(response.lstPurchaseQuotationDocUploadDto[i].createdDate)
					+ '</td>'
					//view button
					+ ' <td class="col-md-1 center"><button id="viewDocumentUploadId'+count+'" value="'+JSON.parse(response.lstPurchaseQuotationDocUploadDto[i].imagePath)+'"  type="button" onclick="viewUploadedDocument(this.value)" ><i class="fa fa-eye" title="View Document"></i></button>'
					+ '</td>'
					
					+ '</tr>';
				}
				$('#uploadedDocumentPqBody').html(htm);
			}
		}
			
	});
}

function viewUploadedDocument(document){
	if(document ==null || document =="" || document ==undefined){
		alert("No File To View First Upload And Save file");
	}else{
		var pqId = $("#purchaseQtMasterId").val();
		$('#viewDocumentPq').attr("src","");
		$('#viewDocumentPq').attr("src","ehat/purchasequotation/readDocuments?pqMasterId="+pqId+"&fileName="+document);
		$('#viewPqDocModal').modal('show');
	}

}
function getFileValue(id){
	var files = $('#'+id).prop("files");
	var document = $.map(files, function(val) {
		return val.name;
	});
	return document;
}

function getDateTimePurchaseQuotation(date){
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

function getNextIdNew() {
	var inputs = [];
	inputs.push('action=getItemMasterNextId');
	inputs.push('tableName=inv_purchase_quotation_master');
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
			$("#quotationNo").val(r);
		}
	});
}
