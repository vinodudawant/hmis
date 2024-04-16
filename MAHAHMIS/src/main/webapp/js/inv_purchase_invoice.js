/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : save purchase invoice
 ******************************************************************************/

function savePurchaseInvoice() {
	var goodsReceiptNote = null;
	var goodsReceiptNoteNumber = 0;
	var withoughtGrnPurInvId  = document.getElementById("withoughtGrnPurInvId");
	if (withoughtGrnPurInvId.checked == true) {
		goodsReceiptNote = null;
		goodsReceiptNoteNumber = 0;
	} else {
		goodsReceiptNote = $("#purchaseInvoiceGrn option:selected").text();
		goodsReceiptNoteNumber = $("#purchaseInvoiceGrn option:selected").val();
	}
	var $radios = $('input:checkbox[name=withoughtGrnPurInvId]');
	var isWithoutGrnPurInv = 'N';
	if ($radios.is(':checked') == true) {
		isWithoutGrnPurInv = "Y";
		$('#purchaseInvoiceId').hide();
		$('#checkForGRN').hide();
		$('#btnAddNew').show();
		$('#grnPartial').css('display', 'none');
		$('#purchaseOrderCheck').hide();
	}
	if ($radios.is(':checked') == false) {
		isWithoutGrnPurInv = "N";
		$('#purchaseInvoiceId').show();
		$('#checkForGRN').show();
		$('#btnAddNew').hide();
		$('#grnPartial').css('display', 'block');
		$('#purchaseOrderCheck').show();
	}

	var purInvId = $("#purInvId").val();
	var purInvDate = $("#purInvDate").val();
	var purInvSupplierName = $("#purchaseInvSupplierName").val().trim();
	var purInvPartyMasterId = $("#hiddenSupplierNameId").val();
	var purInvSupplierState = $("#purchaseInvoiceSupplierState option:selected")
			.text();
	var purInvSupplierStateId = $("#purchaseInvoiceSupplierState").val();

	var purInvSeries = $("#selectPurInvSeries option:selected").text();
	var purInvSeriesText = $("#purInvSeries").val();
	var purInvReferenceNo = $("#purInvReferenceNo").val();
	var purInvMobileNo = $("#purInvMobileNo").val();
	var purInvSupplierAddress = $("#purInvSupplierAddress").val();
	var purInvDeliveryDate = $("#purInvDeliveryDate").val();
	var purInvStatus = $("#purInvStatus option:selected").val();

	var totalItemQuantity = $("#totalItemQty").val();
	var totalItemDiscount = $("#totalItemDiscount").val();

	var lessSpecialDiscount = $("#txtSplDisc").val();
	var lessDebitAmount = $("#txtdebitAmt1").val();
	var lessCDPercent1 = $("#txtCD1").val();
	var lessCDPercent2 = $("#txtCDAmt").val();

	var addOctroi = $("#txtOctroi").val();
	var addSurcharge = $("#txtSurcharge").val();
	var addCreditAmount = $("#txtCreditAmt").val();
	var addFreight = $("#txtFreight").val();
	var taxVat = $("#txtVat").val();
	var taxLBT = $("#txtlbt").val();
	var taxCST = $("#txtcst").val();
	var taxExVat = $("#txtExVat").val();
	var taxTotalTaxes = $("#txtTotalVat").val();
	var sumofCharges = $("#sumofCharges").val();
	var rermark = $("#txtPurInvArermark").val();

	var grossAmount = $("#txtGross").val();
	var grossLessAmount = $("#txtLess").val();
	var grossAddAmount = $("#txtAdd").val();
	var grossTaxes = $("#textVat").val();
	var grossNetAmount = $("#txtNetAmt").val();

	// validation
	if (purInvSupplierName == "" || purInvSupplierName == null
			|| purInvSupplierName == undefined
			|| purInvSupplierName == "undefined") {
		alert("please enter supplier name");
		$("#purchaseInvSupplierName").focus();
		return false;
	}

	if (purInvDate == "" || purInvDate == null || purInvDate == undefined
			|| purInvDate == "undefined") {
		alert("please select purchase invoice date");
		$("#purInvDate").focus();
		return false;
	}

	if (purInvSupplierState == "" || purInvSupplierState == null
			|| purInvSupplierState == undefined
			|| purInvSupplierState == "undefined") {
		alert("please select purchase invoice supplier state");
		$("#purInvSupplierState").focus();
		return false;
	}

	if (purInvMobileNo == "" || purInvMobileNo == null
			|| purInvMobileNo == undefined || purInvMobileNo == "undefined") {
		alert("Mobile number should not be Empty!");
		$("#purInvMobileNo").focus();
		return false;
	} else if (purInvMobileNo != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(purInvMobileNo)) {
			alert("Mobile number should be of digits only!");
			$("#purInvMobileNo").focus();
			return false;
		}
	}

	if (purInvSeries == "" || purInvSeries == null || purInvSeries == undefined
			|| purInvSeries == "undefined") {
		alert("please select purchase invoice series");
		$("#purInvSeries").focus();
		return false;
	}

	if (purInvReferenceNo == "" || purInvReferenceNo == null
			|| purInvReferenceNo == undefined
			|| purInvReferenceNo == "undefined") {
		alert("please enter purchase invoice reference no");
		$("#purInvReferenceNo").focus();
		return false;
	}

	if (purInvSupplierAddress == "" || purInvSupplierAddress == null
			|| purInvSupplierAddress == undefined
			|| purInvSupplierAddress == "undefined") {
		alert("please enter purchase invoice supplier address");
		$("#purInvSupplierAddress").focus();
		return false;
	}

	if (purInvStatus == "" || purInvStatus == null || purInvStatus == undefined
			|| purInvStatus == "undefined") {
		alert("please enter purchase invoice status");
		$("#purInvStatus").focus();
		return false;
	}

	var pattern = /^([a-zA-Z]+\s?)*$/;
	if (!pattern.test(purInvSupplierName)) {
		alert("supplier name should be of alphabets only with a single space allowed..!");
		$("#purchaseInvSupplierName").focus();
		return false;
	}

	var purInvSeriesId = document.getElementById("selectPurInvSeries");
	if (purInvSeriesId.options[purInvSeriesId.selectedIndex].value == 0) {
		alert('please select purchase invoice series');
		$("#selectPurInvSeries").focus();
		return false;
	}

	var itemInfoDtoDetails = {
		lstPurchaseInvoiceItemDto : []
	};
	var purInvItemInfo = $('#purInvItemInfoTable tbody tr.newAdded').length;
	if (purInvItemInfo == "" || purInvItemInfo == null || purInvItemInfo == 0) {
		alert("Enter at least One Record In Item Info tab ");
		return false;
	}
	var rows = $('#purInvItemInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var userId = $("#userId").val();
		var unitId = $("#unitId").val();
		var itemId = $("#slaveId" + i).val();
		var mainItemId = $("#itemId" + i).val();
		var itemName = $("#itemNameId" + i).val();
		var itemQuantity = $("#itemQuantityId" + i).val();
		var unitPriceId = $("#unitPriceId" + i).val();
		var discountPerId = $("#discountPerId" + i).val();
		var discountRsId = $("#discountRsId" + i).val();
		var discountAmtId = $("#discountAmtId" + i).val();
		var baseAmountId = $("#baseAmountId" + i).val();
		var gstId = $("#gstId" + i).val();
		var taxCodeId = $("#itemTaxCodeId" + i).val();
		var hsnNameId = $("#itemHsnNameId" + i).val();
		var igstId = $("#igstId" + i).val();
		var gstAmtId = $("#gstAmtId" + i).val();
		var totalAmtId = $("#totalAmtId" + i).val();
		var factor1 = $("#factor1" + i).val();
		var factor2 = $("#factor2" + i).val();
		var factor3 = $("#factor3" + i).val();
		var factor4 = $("#factor4" + i).val();
		var itemReceivedQtyId = $("#itemReceivedQtyId" + i).val();
		var pendinQtyId = $("#pendinQtyId" + i).val();
		var batchCode = $("#batchId" + i).val();
		var batchId = $("#batchKeyId" + i).val();
		var itemExpireDateId = $("#itemExpireDateId" + i).val();
		var itemManufactureDateId = $("#itemManufactureDateId" + i).val();

		setItemInfoList(itemInfoDtoDetails, parseInt(itemId),
				parseInt(mainItemId), itemName, itemQuantity, unitPriceId,
				parseFloat(discountPerId), parseFloat(discountRsId),
				parseFloat(discountAmtId), parseFloat(baseAmountId),
				parseFloat(gstId), parseFloat(igstId), taxCodeId, hsnNameId,
				parseFloat(gstAmtId), parseFloat(totalAmtId), factor1, factor2,
				factor3, factor4, itemReceivedQtyId, pendinQtyId, batchCode,
				batchId, itemExpireDateId, itemManufactureDateId, userId,
				unitId);
	}

	var batchStockDtoDetails = {
		lstBatchStockDto : []
	};
	for ( var i = 1; i <= rows; i++) {

		var userId = $("#userId").val();
		var unitId = $("#unitId").val();
		var batchId = $("#batchKeyId" + i).val();
		var itemId = $("#itemId" + i).val();
		var itemName = $("#itemNameId" + i).val();
		var itemReceivedQtyId = $("#itemReceivedQtyId" + i).val();
		var batchCodeId = $("#batchId" + i).val();
		var itemExpireDateId = $("#itemExpireDateId" + i).val();

		setBatchItemInfoList(batchStockDtoDetails, batchId, itemName, itemId,
				itemReceivedQtyId, batchCodeId, itemExpireDateId, userId,
				unitId);
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

	// this is for contact details

	var partyMasterContactInfoDtoDetails = {
		partyMasterContactInfoDto : []
	};
	var rows = $('#ContactInfoTable tbody tr.newAdded').length;

	for ( var i = 1; i <= rows; i++) {

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

		setContactInfoList(partyMasterContactInfoDtoDetails, contactPersonId,
				contactDesignationId, contatcAddressId, contactGenderId,
				contactDobId, contactPhoneOneId, contactPhoneSecondId,
				contactMailId, contactInfoId, userId, unitId);
	}

	partyMasterContactInfoDtoDetails = JSON.stringify(partyMasterContactInfoDtoDetails);

	// this is for address details

	var partyMasterAddressInfoDtoDetails = {
		partyMasterAddressInfoDto : []
	};
	var rows = $('#AddressInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {

		var userId = $("#userId").val();
		var unitId = $("#unitId").val();
		var addressInfoId = $("#addressInfoId1" + i).html();
		var companyAddressType = $("#companyAddressTypeId" + i).html();
		var companyNameId = $("#companyNameId" + i).html();
		
		var companyCountryName = $("#companyCountryId" + i).html();
		var companyStateName = $("#companyStateId" + i).html();
		var companyDistictName = $("#companyDistrictId" + i).html();
		var companyTalukaName = $("#companyTalukaId" + i).html();
		var companyCityName = $("#companyCityId" + i).html();
		var countryId = $("#hiddenCountryNameId" + i).html();
		var stateId = $("#hiddenStateNameId" + i).html();
		var districtId = $("#hiddenDistrictNameId" + i).html();
		var talukaId = $("#hiddenTalukaNameId" + i).html();
		var cityId = $("#hiddenCityNameId" + i).html();
		var companyAddressId = $("#companyAddressId" + i).html();
		var companyStreetId = $("#companyStreetId" + i).html();
		//var companyPinId = $("#companyPicompanyDistictNamenId" + i).html();
		var companyPinId = $("#companyPinId" + i).html();//added by dayanand 26-2-2020 for saving pincode
		var companyAreaId = $("#companyAreaId" + i).html();

		setAddressInfoList(partyMasterAddressInfoDtoDetails, addressInfoId,
				companyAddressType, companyNameId, companyAddressId,
				companyStreetId, companyPinId, companyAreaId, companyCityName,
				cityId, companyTalukaName, talukaId, companyDistictName,
				districtId, companyStateName, stateId, companyCountryName,
				countryId, userId, unitId);
	}
	
	partyMasterAddressInfoDtoDetails = JSON.stringify(partyMasterAddressInfoDtoDetails);
	
	var inputs = [];
	inputs.push("id=" + encodeURIComponent(purInvId));
	inputs.push("purchaseInvoiceDate=" + encodeURIComponent(purInvDate));
	inputs.push("purInvSupplierName=" + encodeURIComponent(purInvSupplierName));
	inputs.push("partyMasterId=" + encodeURIComponent(purInvPartyMasterId));
	inputs.push("purInvSupplierState="
			+ encodeURIComponent(purInvSupplierState));
	inputs.push("purInvSupplierStateId="
			+ encodeURIComponent(purInvSupplierStateId));
	inputs.push("goodsReceiptNoteNo=" + encodeURIComponent(goodsReceiptNote));
	inputs.push("goodsReceiptNoteId="
			+ encodeURIComponent(goodsReceiptNoteNumber));
	inputs.push("purInvSeries=" + encodeURIComponent(purInvSeries));
	inputs.push("purInvSeriesVal=" + encodeURIComponent(purInvSeriesText));
	inputs.push("purInvReferenceNo=" + encodeURIComponent(purInvReferenceNo));
	inputs.push("purInvSupplierMobile=" + encodeURIComponent(purInvMobileNo));
	inputs.push("purInvSupplierAddress="
			+ encodeURIComponent(purInvSupplierAddress));
	inputs.push("purInvDeliveryDate=" + encodeURIComponent(purInvDeliveryDate));
	inputs.push("purInvStatus=" + encodeURIComponent(purInvStatus));
	inputs.push("isWithoutGrnPurInv=" + encodeURIComponent(isWithoutGrnPurInv));

	inputs.push("totalItemQuantity="
			+ encodeURIComponent(totalItemQuantity != "" ? totalItemQuantity
					: 0));
	inputs.push("totalItemDiscount="
			+ encodeURIComponent(totalItemDiscount != "" ? totalItemDiscount
					: 0));
	inputs.push("lessSpecialDiscount="
					+ encodeURIComponent(lessSpecialDiscount != "" ? lessSpecialDiscount
							: 0));
	inputs.push("lessDebitAmount="
			+ encodeURIComponent(lessDebitAmount != "" ? lessDebitAmount : 0));
	inputs.push("lessCDPercent1="
			+ encodeURIComponent(lessCDPercent1 != "" ? lessCDPercent1 : 0));
	inputs.push("lessCDPercent2="
			+ encodeURIComponent(lessCDPercent2 != "" ? lessCDPercent2 : 0));
	inputs.push("addOctroi="
			+ encodeURIComponent(addOctroi != "" ? addOctroi : 0));
	inputs.push("addSurcharge="
			+ encodeURIComponent(addSurcharge != "" ? addSurcharge : 0));
	inputs.push("addCreditAmount="
			+ encodeURIComponent(addCreditAmount != "" ? addCreditAmount : 0));
	inputs.push("addFreight="
			+ encodeURIComponent(addFreight != "" ? addFreight : 0));
	inputs.push("taxVat=" + encodeURIComponent(taxVat != "" ? taxVat : 0));
	inputs.push("taxLBT=" + encodeURIComponent(taxLBT != "" ? taxLBT : 0));
	inputs.push("taxCST=" + encodeURIComponent(taxCST != "" ? taxCST : 0));
	inputs.push("taxExVat="
					+ encodeURIComponent(taxExVat != "" ? taxExVat : 0));
	inputs.push("taxTotalTaxes="
			+ encodeURIComponent(taxTotalTaxes != "" ? taxTotalTaxes : 0));
	inputs.push("sumofCharges="
			+ encodeURIComponent(sumofCharges != "" ? sumofCharges : 0));
	inputs.push("rermark=" + encodeURIComponent(rermark != "" ? rermark : ""));
	inputs.push("grossAmount="
			+ encodeURIComponent(grossAmount != "" ? grossAmount : 0));
	inputs.push("grossLessAmount="
			+ encodeURIComponent(grossLessAmount != "" ? grossLessAmount : 0));
	inputs.push("grossAddAmount="
			+ encodeURIComponent(grossAddAmount != "" ? grossAddAmount : 0));
	inputs.push("grossTaxes="
			+ encodeURIComponent(grossTaxes != "" ? grossTaxes : 0));
	inputs.push("grossNetAmount="
			+ encodeURIComponent(grossNetAmount != "" ? grossNetAmount : 0));

	// this is for goods recceipt note item slave info
	inputs.push("purchaseInvoiceItemDtoList="
			+ encodeURIComponent(JSON.stringify(itemInfoDtoDetails)));

	// this is for batch stock info
	inputs.push("batchStockDtoList="
			+ encodeURIComponent(JSON.stringify(batchStockDtoDetails)));

	// this is for batch master info
	/*
	 * inputs.push("batchMasterDtoList=" +
	 * encodeURIComponent(JSON.stringify(batchMasterDtoDetails)));
	 */

	// this is for contact Details
	inputs.push("partyMasterContactInfoDtoList="+partyMasterContactInfoDtoDetails);

	// this is for address info Details
	inputs.push("partyMasterAddressInfoDtoList="+partyMasterAddressInfoDtoDetails);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/invPurchaseInvoice/savePurchaseInvoice",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if (r == 1) {
				alertify.success("Records Saved Sucessfully");
				$("#purInvId").val(0);
				setTimeout(function() {
			         window.location.reload();
			      }, 1000);
				
			} else if (r == 2) {
				alertify.success("Record Updated successfully..!");
				setTimeout(function() {
			         window.location.reload();
			      }, 1000);
			} else {
				alertify.error("Oops something went wrong.....!");
				setTimeout(function() {
			         window.location.reload();
			      }, 1000);
			}
			getAllPurchaseInvoice();
			window.location.replace("inv_purchase_invoice.jsp");
		}
	});

}
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : set purchase invoice item info
 ******************************************************************************/
function setItemInfoList(itemInfoDtoDetails, itemId, mainItemId, itemName,
		itemQuantity, unitPriceId, discountPerId, discountRsId, discountAmtId,
		baseAmountId, gstId, igstId, taxCodeId, hsnNameId, gstAmtId,
		totalAmtId, factor1, factor2, factor3, factor4, itemReceivedQtyId,
		pendinQtyId, batchCode, batchId, itemExpireDateId,
		itemManufactureDateId, userId, unitId) {
	itemInfoDtoDetails.lstPurchaseInvoiceItemDto
			.push({
				id : (itemId != 'undefined' && itemId != null) ? itemId : 0,
				itemId : (mainItemId != 'undefined' && mainItemId != null) ? mainItemId : 0,
				itemName : (itemName != 'undefined' && itemName != null) ? itemName	: '',
				itemQuantity : (itemQuantity != 'undefined' && itemQuantity != null) ? itemQuantity : 0,
				itemUnitPrice : (unitPriceId != 'undefined' && unitPriceId != null) ? unitPriceId : 0,
				itemDiscountPer : (discountPerId != 'undefined' && discountPerId != null) ? discountPerId : 0,
				itemDiscountRs : (discountRsId != 'undefined' && discountRsId != null) ? discountRsId : 0,
				itemDiscountAmt : (discountAmtId != 'undefined' && discountAmtId != null) ? discountAmtId : 0,
				itemBaseAmt : (baseAmountId != 'undefined' && baseAmountId != null) ? baseAmountId : 0,
				itemGst : (gstId != 'undefined' && gstId != null) ? gstId : 0,
				hsnName : (hsnNameId !='undefined' && hsnNameId !=null)? hsnNameId :0,
				taxCode : (taxCodeId !='undefined' && taxCodeId !=null)? taxCodeId:0,
				itemIgst : (igstId != 'undefined' && igstId != null) ? igstId : 0,
				itemGstAmt : (gstAmtId != 'undefined' && gstAmtId != null) ? gstAmtId : 0,
				itemTotalAmt : (totalAmtId != 'undefined' && totalAmtId != null) ? totalAmtId : 0,
				itemFactor1 : (factor1 != 'undefined' && factor1 != null) ? factor1	: 0,
				itemFactor2 : (factor2 != 'undefined' && factor2 != null) ? factor2	: 0,
				itemFactor3 : (factor3 != 'undefined' && factor3 != null) ? factor3	: 0,
				itemFactor4 : (factor4 != 'undefined' && factor4 != null) ? factor4	: 0,
				itemReceivedQty : (itemReceivedQtyId != 'undefined' && itemReceivedQtyId != null) ? itemReceivedQtyId: 0,
				itemPendingQty : (pendinQtyId != 'undefined' && pendinQtyId != null) ? pendinQtyId : 0,
				itemBatchNo : (batchCode != 'undefined' && batchCode != null) ? batchCode : 0,
				batchId : (batchId != 'undefined' && batchId != null) ? batchId : 0,				
				itemManufactureDate : (itemManufactureDateId != 'undefined' && itemManufactureDateId != null) ? itemManufactureDateId : 0,
				itemExpireDate : (itemExpireDateId != 'undefined' && itemExpireDateId != null) ? itemExpireDateId : 0,
				createdBy : (userId != 'undefined' && userId != null) ? userId : 0,
				updatedBy : (userId != 'undefined' && userId != null) ? userId: 0,
				unitId : (unitId != 'undefined' && unitId != null) ? unitId : 0,

			});
}
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : set batch stock info
 ******************************************************************************/
function setBatchItemInfoList(batchStockDtoDetails, batchId, itemName, itemId,
		itemReceivedQtyId, batchCodeId, itemExpireDateId, userId, unitId) {
	batchStockDtoDetails.lstBatchStockDto
			.push({
				id : (batchId != 'undefined' && batchId != null) ? batchId : 0,
				itemName : (itemName != 'undefined' && itemName != null) ? itemName	: '',
				stockFrom : "Purchase Invoice",
				itemMasterId : (itemId != 'undefined' && itemId != null) ? itemId : 0,
				itemQuantity : (itemReceivedQtyId != 'undefined' && itemReceivedQtyId != null) ? itemReceivedQtyId : 0,
				itemBatchCode : (batchCodeId != 'undefined' && batchCodeId != null) ? batchCodeId : '',
				itemBatchExpDate : (itemExpireDateId != 'undefined' && itemExpireDateId != null) ? itemExpireDateId	: 0,
				createdBy : (userId != 'undefined' && userId != null) ? userId : 0,
				unitId : (unitId != 'undefined' && unitId != null) ? unitId : 0,
				updatedBy : (userId != 'undefined' && userId != null) ? userId : 0,
				userId : (userId != 'undefined' && userId != null) ? userId : 0,
			});
}
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : set batch master info
 ******************************************************************************/
/*
 * function setBatchMasterInfoList(batchMasterDtoDetails, batchId, itemName,
 * itemId, itemReceivedQtyId, batchCodeId, itemExpireDateId, userId, unitId) {
 * batchMasterDtoDetails.lstBatchMasterDto.push({ id : (batchId !='undefined' &&
 * batchId!=null)? batchId:0, itemMasterId: (itemId !='undefined' && itemId
 * !=null ) ? itemId: 0, itemQuantity : (itemReceivedQtyId !='undefined' &&
 * itemReceivedQtyId !=null ) ? itemReceivedQtyId: 0, itemBatchCode :
 * (batchCodeId !='undefined' && batchCodeId !=null ) ? batchCodeId: '',
 * itemBatchExpDate : (itemExpireDateId !='undefined' && itemExpireDateId !=null ) ?
 * itemExpireDateId: 0, createdBy : (userId !='undefined' && userId !=null ) ?
 * userId: 0, updatedBy: (userId !='undefined' && userId !=null )? userId:0,
 * unitId : (unitId !='undefined' && unitId !=null ) ? unitId: 0, }); }
 */
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : set party master contact info
 ******************************************************************************/
function setContactInfoList(partyMasterContactInfoDtoDetails, contactPersonId,
		contactDesignationId, contatcAddressId, contactGenderId, contactDobId,
		contactPhoneOneId, contactPhoneSecondId, contactMailId, contactInfoId,
		userId, unitId) {
	partyMasterContactInfoDtoDetails.partyMasterContactInfoDto.push({
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
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : set party master address info
 ******************************************************************************/

function setAddressInfoList(partyMasterAddressInfoDtoDetails, addressInfoId,
		companyAddressType, companyNameId, companyAddressId, companyStreetId,
		companyPinId, companyAreaId, companyCityName, cityId,
		companyTalukaName, talukaId, companyDistictName, districtId,
		companyStateName, stateId, companyCountryName, countryId, userId,
		unitId) {

	partyMasterAddressInfoDtoDetails.partyMasterAddressInfoDto.push({
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
		districtName : companyDistictName,
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

// this is all aboout reset general info field
function resetInfoFields(tabType) {
	if (tabType === "generalInfo") {
		$('#generalFormId')[0].reset();
	} else if (tabType === "contactInfo") {
		$('#contactFormId')[0].reset();
	} else if (tabType === "addressInfo") {
		$('#addressFormId')[0].reset();
	} else if (tabType === "PURINV") {
		$('#purchaseInvoiceFormId')[0].reset();
	}
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : reset purchase invoice master model
 ******************************************************************************/
function resetAllField() {
	$('#partyMaterFormId')[0].reset();
	$('#generalFormId')[0].reset();
	$('#contactFormId')[0].reset();
	$('#addressFormId')[0].reset();
	$("#PartyGeneralTableInfoList").empty();
	$("#PartyContactTableInfoList").empty();
	$("#PartyAddressTableInfoList").empty();
};

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
			purchaseInvoiceTemplate(r, "allPurchaseInvoice");
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : set purchase invoice master table
 ******************************************************************************/

function purchaseInvoiceTemplate(response, callFrom) {
	var htm = "";
	var index = 1;

	if (callFrom === "allPurchaseInvoice") {
		for ( var i = 0; i < response.lstPurchaseInvoiceDto.length; i++) {
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.lstPurchaseInvoiceDto[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ response.lstPurchaseInvoiceDto[i].purInvSupplierName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" data-toggle="modal" data-target="#purchaseInvoiceModal" onclick=editPurchaseInvoice('
					+ response.lstPurchaseInvoiceDto[i].id
					+ ')><i class="fa fa-eye View"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-danger" data-toggle="modal" onclick=deletePurchaseInvoice('
					+ response.lstPurchaseInvoiceDto[i].id
					+ ')><i class="fa fa-trash-o"></i></button></td>'
					+ ' <td class="col-md-1 center">'
					+ '	<button class="btn btn-xs btn-success" onclick=printPurchaseInvoice('
					+ response.lstPurchaseInvoiceDto[i].id
					+ ')><i class="fa fa-print"></i></button></td>' + '</tr>';
			index++;
		}
	} else if (callFrom === "searchPurchaseInvoice") {

		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.id
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ response.purInvSupplierName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success" data-toggle="modal" data-target="#purchaseInvoiceModal" onclick=editPurchaseInvoice('
				+ response.id
				+ ')><i class="fa fa-eye View"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger" onclick=deletePurchaseInvoice('
				+ response.id
				+ ')><i class="fa fa-trash-o"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success" onclick=printPurchaseInvoice('
				+ response.id + ')><i class="fa fa-print"></i></button></td>'
				+ '</tr>';

	}
	$("#purchaseInvoiceList").html(htm);
}
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : delete purchase invoice
 ******************************************************************************/
function deletePurchaseInvoice(purchaseInvoiceId) {
	var inputs = [];
	inputs.push('id=' + purchaseInvoiceId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/invPurchaseInvoice/deletePurchaseInvoice",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			if (response == true) {
				alertify.success("Records deleted Sucessfully");
			} else if (response == false) {
				alertify.error("Network issue.....!");
			}
			getAllPurchaseInvoice();
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
				success : function(response) {
					$("#txtPurInvId").val(response.id);
					$("#purInvId").val(response.id);
					$("#purchaseInvSupplierName").val(
							response.purInvSupplierName);
					$("#hiddenSupplierNameId").val(response.partyMasterDto.id);
					$("#purInvMobileNo").val(response.purInvSupplierMobile);
					$("#purInvSeries").val(response.purInvSeriesVal);

					getPurchaseInvoiceSeries();
					$("#selectPurInvSeries option:selected").val(response.purInvSeries);
					$("#purInvDate").val(response.purchaseInvoiceDate);
					setParyMasterStateToPurchaseInvoice(response.partyMasterDto);
					$('#purchaseInvoiceSupplierState').select2('val',response.purInvSupplierStateId);
					$("#purInvReferenceNo").val(response.purInvReferenceNo);
					$("#purInvDeliveryDate").val(response.purInvDeliveryDate);
					$("#purInvSupplierAddress").val(response.purInvSupplierAddress);
					$("select#purInvStatus").val(response.purInvStatus);
					$("#totalItemQty").val(response.totalItemQuantity);
					$("#totalItemDiscount").val(response.totalItemDiscount);
					$("#txtSplDisc").val(response.lessSpecialDiscount);
					$("#txtdebitAmt1").val(response.lessDebitAmount);
					$("#txtCD1").val(response.lessCDPercent1);
					$("#txtCDAmt").val(response.lessCDPercent2);
					$("#txtOctroi").val(response.addOctroi);
					$("#txtSurcharge").val(response.addSurcharge);
					$("#txtCreditAmt").val(response.addCreditAmount);
					$("#txtFreight").val(response.addFreight);
					$("#txtVat").val(response.taxVat);
					$("#txtlbt").val(response.taxLBT);
					$("#txtcst").val(response.taxCST);
					$("#txtExVat").val(response.taxExVat);
					$("#txtTotalVat").val(response.taxTotalTaxes);
					$("#selboxChargeswithAmtList").val(response.lessDebitAmount);
					$("#sumofCharges").val(response.sumofCharges);
					$("#txtPurInvArermark").val(response.rermark);
					;
					$("#txtGross").val(response.grossAmount);
					$("#txtLess").val(response.grossLessAmount);
					$("#txtAdd").val(response.grossAddAmount);
					$("#textVat").val(response.grossTaxes);
					$("#txtNetAmt").val(response.grossNetAmount);

					if (response.isWithoutGrnPurInv == "Y") {
						$("#withoughtGrnPurInvId").prop("checked", true);
						var $radios = $('input:checkbox[name=withoughtGrnPurInvId]');
						if ($radios.is(':checked') == true) {
							$('#checkForInvoiceGRN').hide();
							$('#checkForGRN').hide();
							$('#btnAddNew').show();
							$('#purchaseInvoiceCheck').hide();
						}
						if ($radios.is(':checked') == false) {
							$('#checkForInvoiceGRN').show();
							$('#checkForGRN').show();
							$('#btnAddNew').hide();
							$('#purchaseInvoiceCheck').show();
						}
					}
					setEditPurchaseInvoiceSlaveInfo(response, "purchaseInvoice");
				}
			});
}
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : edit purchase invoice and set item info table
 ******************************************************************************/
function setEditPurchaseInvoiceSlaveInfo(response, callFrom) {
	var length = 0;
	if (callFrom === "purchaseInvoice") {

		if (response.partyMasterDto.partyMasterContactInfoDto.length != 0
				&& response.partyMasterDto.partyMasterContactInfoDto != null
				&& response.partyMasterDto.partyMasterContactInfoDto != "") {
			length = response.partyMasterDto.partyMasterContactInfoDto.length;
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
						
						
						+ ' <td class="col-md-1 center">'
						+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteContactPartMaster'
						+ response.partyMasterDto.partyMasterContactInfoDto[i].id
						+ '" onclick="deletePartyMasterSlave('
						+ response.partyMasterDto.partyMasterContactInfoDto[i].id
						+ ',\'deleteContact\')" '
						+ '><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';
			}
			$("#PartyContactTableInfoList").html(htm);
		}
		if (response.partyMasterDto.partyMasterAddressInfoDto.length != 0
				&& response.partyMasterDto.partyMasterAddressInfoDto != null
				&& response.partyMasterDto.partyMasterAddressInfoDto != "") {
			length = response.partyMasterDto.partyMasterAddressInfoDto.length;
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
						+ ' <td class="col-md-1 center" id="companyDistrictId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].districtName
						+ '</td>'
						+ ' <td class="col-md-1 center" id="companyTalukaId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].talukaName
						+ '</td>'
						+ ' <td class="col-md-1 center" id="hiddenCountryNameId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].countryId
						+ '</td>'
						+ ' <td class="col-md-1 center" id="hiddenStateNameId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].stateId
						+ '</td>'
						+ ' <td class="col-md-1 center" id="hiddenDistrictNameId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].districtId
						+ '</td>'
						+ ' <td class="col-md-1 center" id="hiddenTalukaNameId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].talukaId
						+ '</td>'
						+ ' <td class="col-md-1 center" id="hiddenCityNameId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].cityId
						+ '</td>'
						+ ' <td class="col-md-1 center" id="addressInfoId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].id
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
						+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" data-name="getTalukaOnPurInv" onclick="editAddressInfoPartyMaster('
						+ count
						+ ',\'fromDB\')"><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteAddressPartMaster'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].id
						+ '"  onclick="deletePartyMasterSlave('
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].id
						+ ',\'deleteAddress\')" '
						+ '><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';
				$("#PartyAddressTableInfoList").html(htm);
			}
		}

		if (response.lstPurchaseInvoiceItemDto.length != 0
				&& response.lstPurchaseInvoiceItemDto != null
				&& response.lstPurchaseInvoiceItemDto != "") {
			length = response.lstPurchaseInvoiceItemDto.length;
			var id = 0;
			var htm = "";
			for ( var i = 0; i < length; i++) {
				id++;

				htm = htm
						+ "<tr class='newAdded' id='multiTr"
						+ id
						+ "' style='overflow-x:auto;'>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkGrnItem' id='checkbox"
						+ id
						+ "' value='"
						+ id
						+ "'></td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><span id='snum"
						+ id
						+ "'>"
						+ id
						+ "</span><input type='hidden' id='slaveId"
						+ id
						+ "' value='"
						+ response.lstPurchaseInvoiceItemDto[i].id
						+ "'></td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' id='purchaseInvoiceItemName"
						+ id
						+ "'><input  style='width: 250px;' type='text' id='itemNameId"
						+ id
						+ "' class='form-control input-SmallText' data-name='purchaseInvoice' disabled onkeyup='fetchItemMasterDetails(this.id,"
						+ id
						+ ")' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemName
						+ "'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='itemQuantityId"
						+ id
						+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup='totalAmount(this.id,"
						+ id
						+ ")' onchange='totalAmount(this.id,"
						+ id
						+ ")' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemQuantity
						+ "'> <input type='hidden' id='txtPurchaseQuotationChangingItemQty"
						+ id
						+ "' value='0' /> <input type='hidden' id='txtlastUom"
						+ id
						+ "'value=''> <lable type='hidden' id ='lblPurchaseQuotationDocQuantity"
						+ id
						+ "'  style ='text-align:center;' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemQuantity
						+ "' >"
						+ response.lstPurchaseInvoiceItemDto[i].itemQuantity
						+ "</label> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='unitPriceId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemUnitPrice
						+ "' onkeyup='totalAmount(this.id,"
						+ id
						+ ")' onchange='totalAmount(this.id,"
						+ id
						+ ")' onkeypress='return validateNumbers(event)'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='discountPerId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemDiscountPer
						+ "' onkeypress='return validateNumbers(event);' onkeyup='chkTradAmtorPercentage(this.id,"
						+ id
						+ ")' onblur='calculTradeDis(this.id,"
						+ id
						+ ")'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='discountRsId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemDiscountRs
						+ "' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"
						+ id
						+ ")'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='discountAmtId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemDiscountAmt
						+ "'  onkeypress='return validateNumbers(event);'> </div></td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  disabled type='text' id='baseAmountId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemBaseAmt
						+ "' onkeypress='return validateNumbers(event);'> </div></td>"
						+ "<td id='documentByName'><div class='col-md-6 col-xs-12 col-sm-6 center'><input disabled style='width: 60px;' type='text' id='gstId"
						+ id
						+ "' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemGst
						+ "' onkeyup='rowAmtCal(this.id,"
						+ id
						+ ");autotaxCodeGrn(this.id,"
						+ id
						+ ")'> </td>"
						+ "<td id='documentByName' class='col-md-6 col-xs-12 col-sm-6 center'><input disabled style='width: 60px;'  type='text' id='igstId"
						+ id
						+ "' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemIgst
						+ "' onkeyup='autotaxCodeGrn(this.id,"
						+ id
						+ ")'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='gstAmtId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemGstAmt
						+ "'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled  type='text' id='totalAmtId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemTotalAmt
						+ "' onkeypress='return validateNumbers(event);'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='factor1"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemFactor1
						+ "' onkeypress='return validateNumbers(event);'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='factor2"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemFactor2
						+ "' onkeypress='return validateNumbers(event);'></td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'> <input style='width: 60px;' disabled type='text' id='factor3"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemFactor3
						+ "' onkeypress='return validateNumbers(event);'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='factor4"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemFactor4
						+ "'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='itemReceivedQtyId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemReceivedQty
						+ "'  onkeypress='return validateNumbers(event);' onkeyup='pendingAmount(this.id,"
						+ id
						+ ");'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='pendinQtyId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemPendingQty
						+ "' onkeypress='return validateNumbers(event);'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 100px;' disabled type='text' id='batchId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemBatchNo
						+ "' onkeypress='return validateNumbers(event);' onblur='checkBatchAvailability(this.value);'></td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style='width: 100px;' id='batchKeyId"
						+ id
						+ "' class='form-control input-SmallText'  value='"
						+ response.lstPurchaseInvoiceItemDto[i].batchId
						+ "'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input disabled style='width: 100px;' type='text' id='itemId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemId
						+ "'></td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;' disabled type='text' id='itemManufactureDateId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemManufactureDate
						+ "' onclick='getMfgandexpyDate(this.id,"
						+ id
						+ ");'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;' disabled type='text' id='itemExpireDateId"
						+ id + "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].itemExpireDate
						+ "' onclick='getMfgandexpyDate(this.id," + id
						+ ");'></td>" 
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' disabled type='text' id='itemHsnNameId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].hsnName
						+ "'> </td>"
						
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' disabled type='text' id='itemTaxCodeId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstPurchaseInvoiceItemDto[i].taxCode
						+ "'> </td>"
						
						+ "</tr>";
			}

			$("#itemInfoDetails").html(htm);
		}
	} else if (callFrom == 'GRN') {

		if (response.partyMasterDto.partyMasterContactInfoDto.length != 0
				&& response.partyMasterDto.partyMasterContactInfoDto != null
				&& response.partyMasterDto.partyMasterContactInfoDto != "") {
			length = response.partyMasterDto.partyMasterContactInfoDto.length;
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
						+ count
						+ '</td>'
						
						
						+ ' <td class="col-md-1 center"><input type="hidden" id="editContactPartMaster'
						+ count
						+ '" value="'
						+ count
						+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster" onclick="editContactInfoPartyMaster('
						+ response.partyMasterDto.partyMasterContactInfoDto[i].id
						+ ',\'fromDB\')"><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteContactPartMaster'
						+ response.partyMasterDto.partyMasterContactInfoDto[i].id
						+ '" onclick="deletePartyMasterSlave('
						+ response.partyMasterDto.partyMasterContactInfoDto[i].id
						+ ',\'deleteContact\')" '
						+ '><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';
			}
			$("#PartyContactTableInfoList").html(htm);
		}
		if (response.partyMasterDto.partyMasterAddressInfoDto.length != 0
				&& response.partyMasterDto.partyMasterAddressInfoDto != null
				&& response.partyMasterDto.partyMasterAddressInfoDto != "") {
			length = response.partyMasterDto.partyMasterAddressInfoDto.length;
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
						+ ' <td class="col-md-1 center" id="companyDistrictId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].districtName
						+ '</td>'
						+ ' <td class="col-md-1 center" id="companyTalukaId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].talukaName
						+ '</td>'
						+ ' <td class="col-md-1 center" id="hiddenCountryNameId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].countryId
						+ '</td>'
						+ ' <td class="col-md-1 center" id="hiddenStateNameId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].stateId
						+ '</td>'
						+ ' <td class="col-md-1 center" id="hiddenDistrictNameId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].districtId
						+ '</td>'
						+ ' <td class="col-md-1 center" id="hiddenTalukaNameId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].talukaId
						+ '</td>'
						+ ' <td class="col-md-1 center" id="hiddenCityNameId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].cityId
						+ '</td>'
						+ ' <td class="col-md-1 center" id="addressInfoId'
						+ count
						+ '" style="display:none">'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].id
						+ '</td>'
						+ ' <td class="col-md-1 center"><input type="hidden" id="editAddressPartMaster'
						+ count
						+ '" value="'
						+ count
						+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster"  data-name="getTalukaOnPurInv" onclick="editAddressInfoPartyMaster('
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].id
						+ ')"><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster" isNew="false" id ="deleteAddressPartMaster'
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].id
						+ '"  onclick="deletePartyMasterSlave('
						+ response.partyMasterDto.partyMasterAddressInfoDto[i].id
						+ ',\'deleteAddress\')" '
						+ '><i class="fa fa-trash-o"></i></button></td>'
						+ '</tr>';
				$("#PartyAddressTableInfoList").html(htm);
			}
		}

		if (response.lstGoodReceiptNoteItemDto.length != 0
				&& response.lstGoodReceiptNoteItemDto != null
				&& response.lstGoodReceiptNoteItemDto != "") {
			length = response.lstGoodReceiptNoteItemDto.length;
			
			var id = 0;
			var htm = "";
			for ( var i = 0; i < length; i++) {
				var expDate = getDate(response.lstGoodReceiptNoteItemDto[i].itemExpireDate);
				id++;
				htm = htm
						+ "<tr class='newAdded' id='multiTr"
						+ id
						+ "' style='overflow-x:auto;'>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkGrnItem' id='checkbox"
						+ id
						+ "' value='"
						+ id
						+ "'></td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><span id='snum"
						+ id
						+ "'>"
						+ id
						+ "</span><input type='hidden' id='slaveId"
						+ id
						+ "' value='"
						+ response.lstGoodReceiptNoteItemDto[i].id
						+ "'></td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' id='purchaseInvoiceItemName"
						+ id
						+ "'><input  style='width: 250px;' type='text' id='itemNameId"
						+ id
						+ "' class='form-control input-SmallText' data-name='purchaseInvoice' disabled onkeyup='fetchItemMasterDetails(this.id,"
						+ id
						+ ")' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemName
						+ "'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='itemQuantityId"
						+ id
						+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup='totalAmount(this.id,"
						+ id
						+ ")' onchange='totalAmount(this.id,"
						+ id
						+ ")' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemQuantity
						+ "'> <input type='hidden' id='txtPurchaseQuotationChangingItemQty"
						+ id
						+ "' value='0' /> <input type='hidden' id='txtlastUom"
						+ id
						+ "'value=''> <lable type='hidden' id ='lblPurchaseQuotationDocQuantity"
						+ id
						+ "'  style ='text-align:center;' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemQuantity
						+ "' >"
						+ response.lstGoodReceiptNoteItemDto[i].itemQuantity
						+ "</label> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='unitPriceId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemUnitPrice
						+ "' onkeyup='totalAmount(this.id,"
						+ id
						+ ")' onchange='totalAmount(this.id,"
						+ id
						+ ")' onkeypress='return validateNumbers(event)'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='discountPerId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemDiscountPer
						+ "' onkeypress='return validateNumbers(event);' onkeyup='chkTradAmtorPercentage(this.id,"
						+ id
						+ ")' onblur='calculTradeDis(this.id,"
						+ id
						+ ")'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='discountRsId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemDiscountRs
						+ "' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"
						+ id
						+ ")'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='discountAmtId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemDiscountAmt
						+ "'  onkeypress='return validateNumbers(event);'> </div></td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  disabled type='text' id='baseAmountId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemBaseAmt
						+ "' onkeypress='return validateNumbers(event);'> </div></td>"
						+ "<td id='documentByName'><div class='col-md-6 col-xs-12 col-sm-6 center'><input disabled style='width: 60px;' type='text' id='gstId"
						+ id
						+ "' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemGst
						+ "' onkeyup='rowAmtCal(this.id,"
						+ id
						+ ");autotaxCodeGrn(this.id,"
						+ id
						+ ")'> </td>"
						+ "<td id='documentByName' class='col-md-6 col-xs-12 col-sm-6 center'><input disabled style='width: 60px;'  type='text' id='igstId"
						+ id
						+ "' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemIgst
						+ "' onkeyup='autotaxCodeGrn(this.id,"
						+ id
						+ ")'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='gstAmtId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemGstAmt
						+ "'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled  type='text' id='totalAmtId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemTotalAmt
						+ "' onkeypress='return validateNumbers(event);'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='factor1"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemFactor1
						+ "' onkeypress='return validateNumbers(event);'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='factor2"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemFactor2
						+ "' onkeypress='return validateNumbers(event);'></td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'> <input style='width: 60px;' disabled type='text' id='factor3"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemFactor3
						+ "' onkeypress='return validateNumbers(event);'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='factor4"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemFactor4
						+ "'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='itemReceivedQtyId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemReceivedQty
						+ "'  onkeypress='return validateNumbers(event);' onkeyup='pendingAmount(this.id,"
						+ id
						+ ");'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='pendinQtyId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemPendingQty
						+ "' onkeypress='return validateNumbers(event);'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 100px;' disabled type='text' id='batchId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemBatchNo
						+ "' onkeypress='return validateNumbers(event);' onblur='checkBatchAvailability(this.value);'></td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style='width: 100px;' id='batchKeyId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].batchId
						+ "'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input disabled style='width: 100px;' type='text' id='itemId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemId
						+ "'></td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;' disabled type='text' id='itemManufactureDateId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemManufactureDate
						+ "' onclick='getMfgandexpyDate(this.id,"
						+ id
						+ ");'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;' disabled type='text' id='itemExpireDateId"
						+ id + "' class='form-control input-SmallText' value='"
						+ expDate
						+ "' onclick='getMfgandexpyDate(this.id," + id
						+ ");'></td>" 
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' disabled type='text' id='itemHsnNameId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].hsnName
						+ "'> </td>"
						
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' disabled type='text' id='itemTaxCodeId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].taxCode
						+ "'> </td>"
						+ "</tr>";
			}

			$("#itemInfoDetails").html(htm);
		}
	}
}

function printPurchaseInvoice(purInvId) {
	window.open("inv_purchase_invoice_print.jsp?purInvId=" + purInvId);
}

function getItemMasterSlavePurchaseInvoiceDetails(itemMasterId) {
	getItemMasterSlavePurchaseInvoiceById(itemMasterId);
	$('#selectPurchaseInvoiceModalId').modal('show');

}
/**
 * 
 * @param itemMasterId
 */
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : set item info in purchase invoice by item id
 ******************************************************************************/

function getItemMasterSlavePurchaseInvoiceById(itemMasterId) {
	var inputs = [];
	inputs.push('id=' + itemMasterId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : 'POST',
				data : str + "&reqType=AJAX",
				url : 'ehat/inventoryPurchaseOrder/getItemMasterSlaveDetails',
				timeout : 1000 * 60 * 5,
				catche : false,
				success : function(response) {
					length = response.itemPurchaseSlaveDto.length;
					var id = 0;
					var htm = "";
					for ( var i = 0; i < response.itemPurchaseSlaveDto.length; i++) {
						if (i == 0) {
							$("#itemMasterSlavePurchaseInvoiceList")
									.html(
											"<tr><td>"
													+ "<input type='radio' name='row' id='rowId"
													+ i
													+ "' value="
													+ i
													+ " onclick='getRadioButtonIndex(this.value)' autofocus='autofocus'></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='itemNameId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText'  id='itemId"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='itemQuantityId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='purchaseUnitPriceOneId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td style='display:none;' ><input type='text'"
													+ "class='form-control input-SmallText'  id='isItemBatchWise"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='cgstRateId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='sgstRateId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='taxNameId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='taxRateId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='purchaseUomFactorOneId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='purchaseUomFactorTwoId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='purchaseUomFactorThreeId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='purchaseUomFactorFourId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"+
													
													
													"<td style='display:none'><input type='text'" +
													"class='form-control input-SmallText'  id='uomUnitOneNameId" +
													i +
													"'" +
													"tabindex='-1' /></td>" +
													"<td style='display:none'><input type='text'" +
													"class='form-control input-SmallText'  id='uomUnitTwoNameId" +
													i +
													"'" +
													"tabindex='-1' /></td>" +
													"<td style='display:none'><input type='text'" +
													"class='form-control input-SmallText'  id='uomUnitThreeNameId" +
													i +
													"'" +
													"tabindex='-1' /></td>" +
													"<td style='display:none'><input type='text'" +
													"class='form-control input-SmallText'  id='uomUnitFourNameId" +
													i +
													"'" +
													"tabindex='-1' /></td>" +
													
													
													
													
													+ "<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='itemId"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+ "<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='hsnName"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+ "</tr>");

						} else {
							$("#itemMasterSlavePurchaseInvoiceList")
									.append(
											"<tr><td>"
													+ "<input type='radio' name='row' id='rowId"
													+ i
													+ "' value="
													+ i
													+ " onclick='getRadioButtonIndex(this.value)' autofocus='autofocus'></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='itemNameId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td style='display:none'><input type='text'"
													+ "class='form-control input-SmallText'  id='itemId"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='itemQuantityId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='purchaseUnitPriceOneId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td style='display:none;' ><input type='text'"
													+ "class='form-control input-SmallText'  id='isItemBatchWise"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='cgstRateId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='sgstRateId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='taxNameId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"
													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='taxRateId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='purchaseUomFactorOneId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='purchaseUomFactorTwoId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='purchaseUomFactorThreeId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"

													+ "<td><input type='text'"
													+ "class='form-control input-SmallText'  id='purchaseUomFactorFourId"
													+ i
													+ "'"
													+ "tabindex='-1' /></td>"+
													
													
													"<td style='display:none'><input type='text'" +
													"class='form-control input-SmallText'  id='uomUnitOneNameId" +
													i +
													"'" +
													"tabindex='-1' /></td>" +
													"<td style='display:none'><input type='text'" +
													"class='form-control input-SmallText'  id='uomUnitTwoNameId" +
													i +
													"'" +
													"tabindex='-1' /></td>" +
													"<td style='display:none'><input type='text'" +
													"class='form-control input-SmallText'  id='uomUnitThreeNameId" +
													i +
													"'" +
													"tabindex='-1' /></td>" +
													"<td style='display:none'><input type='text'" +
													"class='form-control input-SmallText'  id='uomUnitFourNameId" +
													i +
													"'" +
													"tabindex='-1' /></td>" +
													
													
													
													+ "<td style='display:none;'><input type='hidden'"
													+ "class='form-control input-SmallText'  id='hsnName"
													+ i
													+ "'"
													+ "tabindex='-1' value=''/></td>"
													+ "</tr>");

						}
						if (response.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0
								&& response.itemPurchaseSlaveDto[i].purchaseUomFactor2 == 0) {
							$("#itemQuantityId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor1);
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice1);
							$("#purchaseUomFactorOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor1);
							$("#purchaseUomFactorTwoId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor2);
							$("#purchaseUomFactorThreeId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor3);
							$("#purchaseUomFactorFourId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor4);
							$("#itemNameId" + i).val(response.itemName);
							$("#cgstRateId" + i).val(response.cgst);
							$("#sgstRateId" + i).val(response.sgst);
							$("#taxNameId" + i).val(response.taxName);
							$("#taxRateId" + i).val(response.taxRate);
							$("#isItemBatchWise" + i).val(response.batchWise);
							$("#itemId" + i).val(response.id);
							$("#hsnName" + i).val(response.hsnName);
							
							$("#uomUnitOneNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitOneName);
							$("#uomUnitTwoNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitTwoName);
							$("#uomUnitThreeNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitThreeName);
							$("#uomUnitFourNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitFourName);
						} else if (response.itemPurchaseSlaveDto[i].purchaseUomFactor2 != 0
								&& response.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0
								&& response.itemPurchaseSlaveDto[i].purchaseUomFactor3 == 0
								&& response.itemPurchaseSlaveDto[i].purchaseUomFactor4 == 0) {
							$("#itemQuantityId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor2);
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice2);
							$("#purchaseUomFactorOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor1);
							$("#purchaseUomFactorTwoId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor2);
							$("#purchaseUomFactorThreeId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor3);
							$("#purchaseUomFactorFourId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor4);
							$("#itemNameId" + i).val(response.itemName);
							$("#cgstRateId" + i).val(response.cgst);
							$("#sgstRateId" + i).val(response.sgst);
							$("#taxNameId" + i).val(response.taxName);
							$("#taxRateId" + i).val(response.taxRate);
							$("#isItemBatchWise" + i).val(response.batchWise);
							$("#itemId" + i).val(response.id);
							$("#hsnName" + i).val(response.hsnName);
							
							$("#uomUnitOneNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitOneName);
							$("#uomUnitTwoNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitTwoName);
							$("#uomUnitThreeNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitThreeName);
							$("#uomUnitFourNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitFourName);
						} else if (response.itemPurchaseSlaveDto[i].purchaseUomFactor3 != 0
								&& response.itemPurchaseSlaveDto[i].purchaseUomFactor2 != 0
								&& response.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0
								&& response.itemPurchaseSlaveDto[i].purchaseUomFactor4 == 0) {

							$("#itemQuantityId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor3);
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice3);
							$("#purchaseUomFactorOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor1);
							$("#purchaseUomFactorTwoId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor2);
							$("#purchaseUomFactorThreeId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor3);
							$("#purchaseUomFactorFourId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor4);
							$("#itemNameId" + i).val(response.itemName);
							$("#cgstRateId" + i).val(response.cgst);
							$("#sgstRateId" + i).val(response.sgst);
							$("#taxNameId" + i).val(response.taxName);
							$("#taxRateId" + i).val(response.taxRate);
							$("#isItemBatchWise" + i).val(response.batchWise);
							$("#itemId" + i).val(response.id);
							$("#hsnName" + i).val(response.hsnName);
							
							$("#uomUnitOneNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitOneName);
							$("#uomUnitTwoNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitTwoName);
							$("#uomUnitThreeNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitThreeName);
							$("#uomUnitFourNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitFourName);
						} else if (response.itemPurchaseSlaveDto[i].purchaseUomFactor4 != 0
								&& response.itemPurchaseSlaveDto[i].purchaseUomFactor3 != 0
								&& response.itemPurchaseSlaveDto[i].purchaseUomFactor2 != 0
								&& response.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0) {
							$("#itemQuantityId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor4);
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice4);
							$("#purchaseUomFactorOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor1);
							$("#purchaseUomFactorTwoId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor2);
							$("#purchaseUomFactorThreeId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor3);
							$("#purchaseUomFactorFourId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor4);
							$("#itemNameId" + i).val(response.itemName);
							$("#cgstRateId" + i).val(response.cgst);
							$("#sgstRateId" + i).val(response.sgst);
							$("#taxNameId" + i).val(response.taxName);
							$("#taxRateId" + i).val(response.taxRate);
							$("#isItemBatchWise" + i).val(response.batchWise);
							$("#itemId" + i).val(response.id);
							$("#hsnName" + i).val(response.hsnName);
							
							$("#uomUnitOneNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitOneName);
							$("#uomUnitTwoNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitTwoName);
							$("#uomUnitThreeNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitThreeName);
							$("#uomUnitFourNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitFourName);
						}
					}

				}
			});

}
function getRadioButtonIndex(index) {
	document.getElementById("hiddenRadioButtonIndex").value = index;
}

function setModalInfoToTableOnPurchaseInvoice() {
	var table = document.getElementById("purInvItemInfoTable");
	var itemSlaveRowCount = table.rows.length;
	var newItemSlaveRowCount = itemSlaveRowCount - 1;
	var totalRow = 0;
	$('#itemMasterSlavePurchaseInvoiceList input[type=radio]').each(function() {
		totalRow++;
	});
	var totalCheckboxes = $('input[name=row]:checked').val();
	setTableValuesToPurchaseInvoiceItemInfo(totalCheckboxes, totalRow,
			newItemSlaveRowCount);

}
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : set item info for table purchase invoice
 ******************************************************************************/
function setTableValuesToPurchaseInvoiceItemInfo(totalCheckboxes, totalRow,
		radioButtonIndex) {
	if (totalRow > 0) {
		if (totalCheckboxes == undefined || totalCheckboxes == "undefined") {
			alert("Please select atleast one checkbox");
			return 0;
		} else {
			
			var factor1 = $('#purchaseUomFactorOneId' + totalCheckboxes).val();
			var factor2 = $('#purchaseUomFactorTwoId' + totalCheckboxes).val();
			var factor3 = $('#purchaseUomFactorThreeId' + totalCheckboxes).val();
			var factor4 = $('#purchaseUomFactorFourId' + totalCheckboxes).val();
			var ro = $('#itemId' + totalCheckboxes).val();
			$('#itemQuantityId' + radioButtonIndex).val($('#itemQuantityId' + totalCheckboxes).val());
			$('#unitPriceId' + radioButtonIndex).val($('#purchaseUnitPriceOneId' + totalCheckboxes).val());
			$('#factor1' + radioButtonIndex).val($('#purchaseUomFactorOneId' + totalCheckboxes).val());
			$('#factor2' + radioButtonIndex).val($('#purchaseUomFactorTwoId' + totalCheckboxes).val());
			$('#factor3' + radioButtonIndex).val($('#purchaseUomFactorThreeId' + totalCheckboxes).val());
			$('#factor4' + radioButtonIndex).val($('#purchaseUomFactorFourId' + totalCheckboxes).val());
			$('#itemReceivedQtyId' + radioButtonIndex).val($('#itemQuantityId' + totalCheckboxes).val());
			$('#pendinQtyId' + radioButtonIndex).val(($('#itemQuantityId' + totalCheckboxes).val() - $('#itemReceivedQtyId' + radioButtonIndex).val()));
			$('#itemNameId' + radioButtonIndex).val($('#itemNameId' + totalCheckboxes).val());
			$('#gstId' + radioButtonIndex).val( $('#taxRateId' + totalCheckboxes).val());
			$('#itemId' + radioButtonIndex).val($('#itemId' + totalCheckboxes).val());
			$('#itemHsnNameId' + radioButtonIndex).val($('#hsnName' + totalCheckboxes).val());
			$('#itemTaxCodeId' + radioButtonIndex).val($('#taxNameId' + totalCheckboxes).val());
			$('#uomUnitFactorOneNameId' + radioButtonIndex).text($('#uomUnitOneNameId' + totalCheckboxes).val());
			$('#uomUnitFactorTwoNameId' + radioButtonIndex).text($('#uomUnitTwoNameId' + totalCheckboxes).val());
			$('#uomUnitFactorThreeNameId' + radioButtonIndex).text($('#uomUnitThreeNameId' + totalCheckboxes).val());
			$('#uomUnitFactorFourNameId' + radioButtonIndex).text($('#uomUnitFourNameId' + totalCheckboxes).val());
			
			if (factor1 != 0 && factor2 == 0) {
				$('#uomUnitLatestFactorId' + radioButtonIndex).text($('#uomUnitOneNameId' + totalCheckboxes).val());
			}
			else if (factor2 != 0 && factor1 != 0 && factor3 == 0 && factor4 == 0) {
				$('#uomUnitLatestFactorId' + radioButtonIndex).text($('#uomUnitTwoNameId' + totalCheckboxes).val());
			}
			else if (factor3 != 0 && factor2 != 0 && factor1 != 0 && factor4 == 0) {
				$('#uomUnitLatestFactorId' + radioButtonIndex).text($('#uomUnitThreeNameId' + totalCheckboxes).val());
			}
			else if (factor4 != 0 && factor3 != 0 && factor2 != 0 && factor1 != 0) {
				$('#uomUnitLatestFactorId' + radioButtonIndex).text($('#uomUnitFourNameId' + totalCheckboxes).val());
			}
			if ($('#isItemBatchWise' + totalCheckboxes).val() == "YES") {
				closeItemPurchaseDetailsModal();
				var itemId = $('#itemId' + totalCheckboxes).val();
				if (itemId != null && itemId != undefined) {
					getBatchDetails(itemId);
				}
			}
		}
	}
}


function setModalInfoToTableOnBatch() {
	var table = document.getElementById("purInvItemInfoTable");
	var itemSlaveRowCount = table.rows.length;
	var newItemSlaveRowCount = itemSlaveRowCount - 1;
	var totalRow = 0;
	$('#batchData input[type=radio]').each(function() {
		totalRow++;
	});
	var totalCheckboxes = $('input[name=row]:checked').val();
	setTableValuesToPurchaseInvoiceInfo(totalCheckboxes, totalRow,
			newItemSlaveRowCount);

}

function setTableValuesToPurchaseInvoiceInfo(totalCheckboxes, totalRow,
		radioButtonIndex) {
	if (totalRow > 0) {
		var expDate=getDate($('#itemBatchExpireDate' + totalCheckboxes).val());
		$('#itemQuantityId' + radioButtonIndex).val($('#itemQuantity' + totalCheckboxes).val());
		$('#batchId' + radioButtonIndex).val($('#itemBatchCode' + totalCheckboxes).val());
		$('#batchKeyId' + radioButtonIndex).val($('#batchIdKey' + totalCheckboxes).val());
		$('#itemExpireDateId' + radioButtonIndex).val(expDate);
		$('#itemExpireDateId' + radioButtonIndex).prop('disabled', true);
		$('#batchModel').modal('hide');
	}
}


function getBatchDetails(itemId) {
	var inputs = [];
	inputs.push('itemMasterId=' + itemId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "ehat/invPurchaseInvoice/getBatchDetails",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(response) {
					if(JSON.stringify(response.length) > 0){
						$('#batchModel').modal('show');
						length = response.length;
						for ( var i = 0; i < length; i++) {
							if (i == 0) {
								$("#batchData")
										.html(
												"<tr><td>"
														+ "<input type='radio' name='row' id='rowId"
														+ i
														+ "' value="
														+ i
														+ " onclick='getRadioButtonIndex(this.value)' autofocus='autofocus'></td>"
														+ "<td><input type='text'"
														+ "class='form-control input-SmallText'  id='itemName"
														+ i
														+ "'"
														+ "tabindex='-1' /></td>"
														+ "<td><input type='text'"
														+ "class='form-control input-SmallText'  id='itemQuantity"
														+ i
														+ "'"
														+ "tabindex='-1' /></td>"
														+ "<td><input type='text'"
														+ "class='form-control input-SmallText'  id='itemBatchCode"
														+ i
														+ "'"
														+ "tabindex='-1' /></td>"
														+ "<td><input type='text'"
														+ "class='form-control input-SmallText'  id='itemBatchExpireDate"
														+ i
														+ "'"
														+ "tabindex='-1' /></td>"	
														+ "<td style='display:none;'><input type='hidden'"
														+ "class='form-control input-SmallText'  id='batchIdKey"
														+ i
														+ "'"
														+ "tabindex='-1' value=''/></td>"
														+ "</tr>");

							} else {
								$("#batchData")
										.append(
												"<tr><td>"
												+ "<input type='radio' name='row' id='rowId"
												+ i
												+ "' value="
												+ i
												+ " onclick='getRadioButtonIndex(this.value)' autofocus='autofocus'></td>"
												+ "<td><input type='text'"
												+ "class='form-control input-SmallText'  id='itemName"
												+ i
												+ "'"
												+ "tabindex='-1' /></td>"
												+ "<td><input type='text'"
												+ "class='form-control input-SmallText'  id='itemQuantity"
												+ i
												+ "'"
												+ "tabindex='-1' /></td>"
												+ "<td><input type='text'"
												+ "class='form-control input-SmallText'  id='itemBatchCode"
												+ i
												+ "'"
												+ "tabindex='-1' /></td>"	
												+ "<td><input type='text'"
												+ "class='form-control input-SmallText'  id='itemBatchExpireDate"
												+ i
												+ "'"
												+ "tabindex='-1' /></td>"	
												+ "<td style='display:none;'><input type='hidden'"
												+ "class='form-control input-SmallText'  id='batchIdKey"
												+ i
												+ "'"
												+ "tabindex='-1' value=''/></td>"
												+ "</tr>");
							}
							var expDate=getDate(response[i].itemBatchExpDate);
							$("#itemQuantity" + i).val(response[i].itemQuantity);
							$("#itemName" + i).val(response[i].itemName);
							$("#itemBatchExpireDate" + i).val(expDate);
							$("#batchIdKey" + i).val(response[i].id);
							$("#itemBatchCode" + i).val(response[i].itemBatchCode);
						}
					}
				}
			});
}

function closeItemPurchaseDetailsModal() {
	$("#selectPurchaseInvoiceModalId").modal("hide");
}

function closeItemBatchDetailsModal() {
	$("#batchModel").modal("hide");
}

function onCloseBtnRefrshPage() {
	window.location.replace("inv_purchase_invoice.jsp");
}
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : get auto suggetion party master by name
 ******************************************************************************/
function getAutoPartyMaster(partyMasterId) {
	var resultData = [];
	var partyMasterName = $("input#" + partyMasterId).val();

	if (partyMasterName == "" || partyMasterName == null
			|| partyMasterName == "null" || partyMasterName == undefined) {

		alertify.error("Please enter search value");
		$("input#" + partyMasterId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('name=' + partyMasterName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/invPartyMaster/partyMasterAutoSuggestion",
				cache : false,
				success : function(response) {
					if(response.partyMasterDto.length == 0){
						alertify.error("You Cannot Insert Other Supplier Name...!!!");
						document.getElementById('purchaseInvSupplierName').value = "";
					}
					var template = "";
					for ( var j = 0; j < response.partyMasterDto.length; j++) {
						var arrValue = response.partyMasterDto[j].id + "-"
								+ response.partyMasterDto[j].name;
						var idValue = response.partyMasterDto[j].id;
						var partyName = response.partyMasterDto[j].name;
						resultData.push({
							ID : idValue,
							Name : partyName
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}

					setTimeout(
							function() {
								$("div#partyMasterByName .typeahead").html(
										template);
								$("div#partyMasterByName .typeahead").show();

								$("input#" + partyMasterId).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true
								});
								$("input#" + partyMasterId).data('typeahead').source = resultData;
							}, 500);
				}
			});

	function displayResult(item) {
		var res = item.text.split('-');
		var partyId = parseInt(res[0]);
		var partyName1 = res[1].trim();
		$("#hiddenSupplierNameId").val(partyId);
		getPartyMasterById(partyId);
		// $("input#" + partyMasterId).val(partyName1);
	}
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : get party master by id in purchase invoice
 ******************************************************************************/
function getPartyMasterById(partyId) {

	var inputs = [];
	inputs.push('id=' + partyId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "ehat/invPartyMaster/getPartyMasterById",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(response) {
					$("#seachPartyMaster").focus();
					$('#seachPartyMaster').val("");
					$("#purchaseInvSupplierName").val(response.name.trim());
					$("#purchaseInvoiceSupplierState").select2();
					setPartyModalAddressInfoToPurchaseInvoice(response);
					setPartyModalContactInfoToPurchaseInvoice(response);
					setParyMasterStateToPurchaseInvoice(response);
					$("#purchaseInvoiceModalId").show();
					//getAllStateMaster();
					$("#hiddenSupplierNameId").val(response.id);
//					for ( var i = 0; i < response.partyMasterAddressInfoDto.length; i++) {
//						$("#purchaseInvoiceSupplierState").select2('val',
//								response.partyMasterAddressInfoDto[i].stateId);
//					}
					setEditPartyMasterSlaveInfo(response);
				}
			});
}
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : get auto suggetion purchase invoice by name
 ******************************************************************************/
function purchaseInvoiceAutoSuggestion(id) {
	var resultData = [];
	var vendorName = $("input#" + id).val();

	if (vendorName == "" || vendorName == null || vendorName == "null"
			|| vendorName == undefined) {

		alertify.error("Please enter search value");
		$("input#" + id).focus();
		return false;
	}

	var inputs = [];
	inputs.push('purInvSupplierName=' + vendorName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/invPurchaseInvoice/purchaseInvoiceAutoSuggestion",
				cache : false,
				success : function(response) {
					var template = "";
					for ( var j = 0; j < response.lstPurchaseInvoiceDto.length; j++) {
						var arrValue = response.lstPurchaseInvoiceDto[j].id
								+ "-"
								+ response.lstPurchaseInvoiceDto[j].purInvSupplierName;
						var idValue = response.lstPurchaseInvoiceDto[j].id;
						var partyName = response.lstPurchaseInvoiceDto[j].purInvSupplierName;
						resultData.push({
							ID : idValue,
							Name : partyName
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}

					setTimeout(function() {
						$("div#purchaseInvoiceByName .typeahead")
								.html(template);
						$("div#purchaseInvoiceByName .typeahead").show();

						$("input#" + id).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("input#" + id).data('typeahead').source = resultData;
					}, 500);
				}
			});

	function displayResult(item) {
		var res = item.text.split('-');
		var purchaseInvoiceId = res[0];
		var supplierName = res[1];
		getPurchaseInvoiceById(purchaseInvoiceId);
		$("input#" + id).val(supplierName);
	}
}
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : get purchase invoice by id
 ******************************************************************************/
function getPurchaseInvoiceById(id) {
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/invPurchaseInvoice/getPurchaseInvoiceById",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response) {
			purchaseInvoiceTemplate(response, "searchPurchaseInvoice")
			$("#searchPurchaseInvoice").focus();
			$('#searchPurchaseInvoice').val("");
		}
	});
}

function addGeneralInfoRows(tabType) {

	if (tabType === "ContactInfo") {
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
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : this is all about dynamic row added in address table
 ******************************************************************************/

function addDynamicRecordsToAddressInfoTable(id) {

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

	if (companyAddress == "") {
		alert("address should not be empty..!");
		$("#addressFromAddress").focus();
		return false;

	}
	if (hiddenCityName != "") {
		var pattern = /^([a-zA-Z]+\s?)*$/;
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
			+ id
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
			+ '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster"  data-name="getTalukaOnPurInv" onclick="editAddressInfoPartyMaster('
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
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : edit contact info in party master
 ******************************************************************************/
function editContactInfoPartyMaster(id,callFrom) {

	var rows = $('#ContactInfoTable tbody tr.newAdded').length;
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
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : update contact info in party master
 ******************************************************************************/
function updateContactInfoPartyMasterPI() {
	var rows = $('#ContactInfoTable tbody tr.newAdded').length;
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
			document.getElementById("saveContactInfo").style.visibility = "visible";
			$("#saveContactInfo").show();
			$("#updateContactInfo").hide();
			$('#contactFormId')[0].reset();
		}
	}

}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : edit address info in party master
 ******************************************************************************/

function editAddressInfoPartyMaster(id,callFrom) {

	var rows = $('#AddressInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var addressInfoId = $("#addressInfoId1" + i).text();
		var addInfoId = $("#addInfoId" + i).text();
		var addInfoIdAdd = $("#addressInfoId" + i).text();
		
		
		if (id == addressInfoId || id == addInfoIdAdd) {
			$("#addressInfoId").val($("#addressInfoId" + id).html());
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
			// this is new for

			$("#hiddenCountryFromPartyMaster").val($("#companyCountryId" + id).html());
			$("#hiddenStateFromPartyMaster").val($("#companyStateId" + id).html());
			$("#hiddenDistrictFromPartyMaster").val($("#companyDistrictId" + id).html());
			$("#hiddenTalukaFromPartyMaster").val($("#companyTalukaId" + id).html());
			$("#hiddenCityFromPartyMaster").val($("#companyCityId" + id).html());

			if ($("#companyAddressTypeId" + id).html() === "ShippingAddress") {
				$("#shippingAddress").val(
						$("#companyAddressTypeId" + id).html());
			} else {
				$("#billingAddress")
						.val($("#companyAddressTypeId" + id).html());
			}
			$("#updateAddressInfo").attr('updateAddressInfoId', addressInfoId);
//			$("#saveAddressInfo").hide();
//			$("#updateAddressInfo").show();
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
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : update address info in party master
 ******************************************************************************/

function updateAddressInfoPartyMasterPI() {
	var rows = $('#AddressInfoTable tbody tr.newAdded').length;
	for ( var i = 1; i <= rows; i++) {
		var id = $("#updateAddressInfo").attr('updateAddressInfoId');
		if (i == id) {
			$("#addressInfoId" + i).html($("#addressInfoId").val());
			$("#companyNameId" + i).html($("#companyNameFromAddress").val());
			$("#hiddenCountryNameId" + i).html($("#countryFromAddress").val());
			$("#hiddenStateNameId" + i).html($("#stateFromAddress").val());
			$("#hiddenDistrictNameId" + i).html($("#districtFromAddress").val());
			
			$("#hiddenTalukaNameId" + i).html($("#talukaFromAddress").val());
			$("#hiddenCityNameId" + i).html($("#cityFromAddress").val());
			
			$("#companyCountryId" + i).html($("#hiddenCountryFromPartyMaster").val());
			$("#companyStateId" + i).html($("#hiddenStateFromPartyMaster").val());
			$("#companyDistrictId" + i).html($("#hiddenDistrictFromPartyMaster").val());
			$("#companyTalukaId" + i).html($("#hiddenTalukaFromPartyMaster").val());
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
			$("#updateAddressInfo").hide();
		}
	}
	resetGRNInfoFields('addressInfo');
}

/**
 * @since 15-02-2020
 * @comment below function is to create PI table body
 * @author Rohit Sandbhor
 * @param id
 * @returns {String}
 */
function getPurInvTableBodyString(id) {
	var tbody = "<tr class='newAdded' id='multiTr"
			+ id
			+ "'>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkGrnItem' id='checkbox"
			+ id
			+ "' value='"
			+ id
			+ "'></td>"
			+ "<td class='col-md-4 col-xs-12 col-sm-4 center'><span id='snum"
			+ id
			+ "'>"
			+ id
			+ "</span><input type='hidden' id='slaveId"
			+ id
			+ "' value='0'></td>"
			+ "<td class='col-md-8 col-xs-12 col-sm-8 center' id='purchaseInvoiceItemName"
			+ id
			+ "'><input type='text' style='width: 250px;' data-name='purchaseInvoice' id='itemNameId"
			+ id
			+ "' class='typeahead form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id,"
			+ id 
			+ ")'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width:60px;' id='itemQuantityId"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onblur='totalAmount(this.id," +
			id +")'> <input type='hidden' id='txtPurchaseQuotationChangingItemQty"
			+ id
			+ "' value='0' /> <input type='hidden' id='txtlastUom"
			+ id
			+ "'value=''> <lable type='hidden' id='lblPurchaseQuotationDocQuantity"
			+ id
			+ "'  style ='text-align:center;' value='' ></label></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width:60px;' type='text' id='unitPriceId"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event)'> <lable id='uomUnitLatestFactorId"+
			id +
			"'> </lable></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width:60px;' type='text' id='discountPerId"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' onkeyup='chkTradAmtorPercentage(this.id,"
			+ id
			+ ")' onblur='calculTradeDis(this.id,"
			+ id
			+ ")'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='discountRsId"
			+ id
			+ "' class='form-control input-SmallText'  onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"
			+ id
			+ ")'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width:60px;' type='text' id='discountAmtId"
			+ id
			+ "' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='baseAmountId"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> </td>"
	

			//gst and igst td's
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' id='documentByName"
			+ id
			+ "'><input style='width: 60px;' type='text' id='gstId"
			+ id
			+ "' class='form-control input-SmallText typeahead'  disabled='disabled' data-name='autoGRNTax' onkeyup='rowAmtCalForGst(this.id,"
			+ id
			+ ");autotaxCodeforItemGst("+id+","
			+ id
			+ ")'></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'  id='documentByName"
			+ id
			+ "'><input style='width: 60px;' type='text' disabled='disabled' id='igstId" 
			+ id
			+ "' class='form-control input-SmallText typeahead' data-name='autoGRNTax' onkeyup='rowAmtCalForIgst(this.id,"+id+");autotaxCodeGrn(this.id,"
			+ id + ")'></td>"
	 
	
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='gstAmtId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='totalAmtId"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='factor1"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> <lable id='uomUnitFactorOneNameId"+
			id +
			"'> </lable></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='factor2"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> <lable id='uomUnitFactorTwoNameId"+
			id +
			"'> </lable></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' id='factor3"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> <lable id='uomUnitFactorThreeNameId"+
			id +
			"'> </lable></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='factor4"
			+ id
			+ "' class='form-control input-SmallText'> <lable id='uomUnitFactorFourNameId"+
			id +
			"'> </lable></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 60px;' disabled='disabled' id='itemReceivedQtyId"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' onkeyup='pendingAmount(this.id,"
			+ id
			+ ");'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 60px;' disabled id='pendinQtyId"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 100px;' value='0' id='batchId"
			+ id
			+ "' class='form-control input-SmallText' onblur='checkBatchAvailability(this.value);'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style='width: 100px;' id='batchKeyId"
			+ id
			+ "' class='form-control input-SmallText' value='0'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input style='width: 100px;' type='text' id='itemId"
			+ id
			+ "' class='form-control input-SmallText' value=''></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 150px;' id='itemManufactureDateId"
			+ id
			+ "' class='form-control input-SmallText' onclick='getMfgandexpyDate(this.id,"
			+ id
			+ ");'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 150px;' value='NA' id='itemExpireDateId"
			+ id
			+ "' class='form-control input-SmallText' onclick='getMfgandexpyDate(this.id,"
			+ id + ");'> </td>" 
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style=' width: 150px;' id='itemHsnNameId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style=' width: 150px;' id='itemTaxCodeId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+ "</tr>";
	$(':input').prop('readonly', false);
	$('#txtgrnId').prop('readonly', true);
	$("#RowCount").val(id);
	var totaltblsize = $("#RowCount").val();
	$("#totaltblsize").val(totaltblsize);
	return tbody;
}




/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : this is for purchase invoice body
 ******************************************************************************/
// this is for Purchase Invoice
function getPurInvTableBodyStringOnPlusButton(id) {
	var userState = $("#userState").val();
	var venderState = $("#purchaseInvoiceSupplierState option:selected").val();
	
	var tbody = "<tr class='newAdded' id='multiTr"
			+ id
			+ "'>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkGrnItem' id='checkbox"
			+ id
			+ "' value='"
			+ id
			+ "'></td>"
			+ "<td class='col-md-4 col-xs-12 col-sm-4 center'><span id='snum"
			+ id
			+ "'>"
			+ id
			+ "</span><input type='hidden' id='slaveId"
			+ id
			+ "' value='0'></td>"
			+ "<td class='col-md-8 col-xs-12 col-sm-8 center' id='purchaseInvoiceItemName"
			+ id
			+ "'><input type='text' style='width: 250px;' data-name='purchaseInvoice' id='itemNameId"
			+ id
			+ "' class='typeahead form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id,"
			+ id 
			+ ")'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width:60px;' id='itemQuantityId"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onblur='totalAmount(this.id," +
			id +")'> <input type='hidden' id='txtPurchaseQuotationChangingItemQty"
			+ id
			+ "' value='0' /> <input type='hidden' id='txtlastUom"
			+ id
			+ "'value=''> <lable type='hidden' id='lblPurchaseQuotationDocQuantity"
			+ id
			+ "'  style ='text-align:center;' value='' ></label></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width:60px;' type='text' id='unitPriceId"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event)'><lable id='uomUnitLatestFactorId"+
			id +
			"'> </lable> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width:60px;' type='text' id='discountPerId"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' onkeyup='chkTradAmtorPercentage(this.id,"
			+ id
			+ ")' onblur='calculTradeDis(this.id,"
			+ id
			+ ")'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='discountRsId"
			+ id
			+ "' class='form-control input-SmallText'  onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"
			+ id
			+ ")'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width:60px;' type='text' id='discountAmtId"
			+ id
			+ "' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='baseAmountId"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> </td>"
	if (parseInt(userState) === parseInt(venderState)) {

		tbody = tbody
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center' id='documentByName"
				+ id
				+ "'><input style='width: 60px;' type='text' id='gstId"
				+ id
				+ "' class='form-control input-SmallText typeahead' data-name='autoGRNTax' onkeyup='rowAmtCalForGst(this.id,"
				+ id
				+ ");autotaxCodeforItemGst("+id+","
				+ id
				+ ")'></td>"
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center' disabled='disabled' id='documentByName"
				+ id
				+ "'><input style='width: 60px;' type='text' disabled='disabled' id='igstId"
				+ id
				+ "' class='form-control input-SmallText typeahead' data-name='autoGRNTax' onkeyup='rowAmtCalForIgst(this.id,"+id+");autotaxCodeGrn(this.id,"
				+ id + ")'></td>"
	} else {

		tbody = tbody
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center' id='documentByName"
				+ id
				+ "'><input style='width: 60px;' type='text' disabled='disabled' id='gstId"
				+ id
				+ "' class='form-control input-SmallText typeahead' data-name='autoGRNTax' onkeyup='rowAmtCalForGst(this.id,"
				+ id
				+ ");autotaxCodeforItemGst("+id+","
				+ id
				+ ")'></td>"
				+ "<td class='col-md-6 col-xs-12 col-sm-6 center' id='documentByName"
				+ id
				+ "'><input style='width: 60px;' type='text' id='igstId"
				+ id
				+ "' class='form-control input-SmallText typeahead' data-name='autoGRNTax' onkeyup='rowAmtCalForIgst(this.id,"+id+");autotaxCodeGrn(this.id,"
				+ id + ")'></td>"

	}
	tbody = tbody
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='gstAmtId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='totalAmtId"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='factor1"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> <lable id='uomUnitFactorOneNameId"+
			id +
			"'> </lable> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='factor2"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorTwoNameId"+
			id +
			"'> </lable> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' id='factor3"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorThreeNameId"+
			id +
			"'> </lable>  </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='factor4"
			+ id
			+ "' class='form-control input-SmallText'><lable id='uomUnitFactorFourNameId"+
			id +
			"'> </lable>  </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 60px;' disabled id='itemReceivedQtyId"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' onkeyup='pendingAmount(this.id,"
			+ id
			+ ");'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 60px;' disabled id='pendinQtyId"
			+ id
			+ "' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 100px;' value='0' id='batchId"
			+ id
			+ "' class='form-control input-SmallText' onblur='checkBatchAvailability(this.value);'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style='width: 100px;' id='batchKeyId"
			+ id
			+ "' class='form-control input-SmallText' value='0'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input style='width: 100px;' type='text' id='itemId"
			+ id
			+ "' class='form-control input-SmallText' value=''></td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 150px;' id='itemManufactureDateId"
			+ id
			+ "' class='form-control input-SmallText' onclick='getMfgandexpyDate(this.id,"
			+ id
			+ ");'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 150px;' value='NA' id='itemExpireDateId"
			+ id
			+ "' class='form-control input-SmallText' onclick='getMfgandexpyDate(this.id,"
			+ id + ");'> </td>" 
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style=' width: 150px;' id='itemHsnNameId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style=' width: 150px;' id='itemTaxCodeId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+ "</tr>";
	$(':input').prop('readonly', false);
	$('#txtgrnId').prop('readonly', true);
	$("#RowCount").val(id);
	var totaltblsize = $("#RowCount").val();
	$("#totaltblsize").val(totaltblsize);
	return tbody;
}

/*
 * function addNewRowInTable(tableId, callFrom) { var tbody = ""; var rows =
 * $('#' + tableId + ' tbody tr').length; if (callFrom == "GRN") { tbody =
 * getGrnTableBodyString(rows + 1); } else if (callFrom == "PurInv") { tbody =
 * getPurInvTableBodyString(rows + 1); } $('#' + tableId).append(tbody); }
 * 
 *//***************************************************************************
 * @author : Vinod Udawant
 * @date : 18-Nov-2019
 * @codeFor : Remove row temp for MRN
 **************************************************************************/
/*
 * function removeRowFromTable(tableId, checkboxClass) {
 * 
 * $('.' + checkboxClass + ':checkbox:checked').parents("tr").remove();
 * check(tableId); checkComp(tableId); }
 * 
 *//***************************************************************************
 * @author : Vinod Udawant
 * @date : 18-Nov-2019
 * @codeFor : For reorder srno after delete
 **************************************************************************/
/*
 * function check(tableId) { obj = $('#' + tableId + ' tbody tr').find('span');
 * $.each(obj, function(key, value) { id = value.id; $('#' + id).html(key + 1);
 * }); }
 *//***************************************************************************
 * @author : Vinod Udawant
 * @date : 18-Nov-2019
 * @codeFor : For reorder index ids of componant after delete
 **************************************************************************/
/*
 * function checkComp(tableId) {
 * 
 * var trLength = $('#' + tableId).find("tr:first th").length; obj = $('#' +
 * tableId + ' tbody tr td').find('input'); var inx = 1; var idIndex = 1;
 * $.each(obj, function(key, value) {
 * 
 * if (inx == (trLength + 1)) { inx = 1; idIndex++; } id = value.id; var idText =
 * (value.id).replace(/[0-9]/g, ''); var replaceById = idText + idIndex; $('#' +
 * id).attr('id', replaceById); inx++; }); }
 *//***************************************************************************
 * @author : Vinod Udawant
 * @date : 18-Nov-2019
 * @codeFor : Check uncheck all checkbox in table
 **************************************************************************/
/*
 * function checkUncheckAll(masterChkId, slaveChkClass) {
 * 
 * if ($("#" + masterChkId).is(":checked")) {
 * 
 * $('.' + slaveChkClass).prop("checked", true) } else {
 * 
 * $('.' + slaveChkClass).prop("checked", false) } }
 */
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Jan-2020
 * @codeFor : this is for purchase invoice without Goods Receipt Note
 ******************************************************************************/
function checkForPurchseInvoice() {
	var $radios = $('input:checkbox[name=withoughtGrnPurInvId]');
	if ($radios.is(':checked') == true) {
		$('#purchaseInvoiceId').hide();
		$('#checkForInvoiceGRN').hide();
		$('#btnAddNew').show();
		$('#grnPartial').css('display', 'none');
		$('#purchaseInvoiceCheck').hide();
	}
	if ($radios.is(':checked') == false) {
		$('#purchaseInvoiceId').show();
		$('#checkForInvoiceGRN').show();
		$('#btnAddNew').hide();
		$('#grnPartial').css('display', 'block');
		$('#purchaseInvoiceCheck').show();
	}
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Jan-2020
 * @codeFor : this is for check purchase invoice Append
 ******************************************************************************/

function checkForPurchaseInvoiceAppend() {
	var $radios = $('input:checkbox[name=appendGrnId]');
	if ($radios.is(':checked') == true) {
		$('#purchaseInvoiceGrnCheck').show();
		$('#btnAddNew').hide();
		$('#purInvGrnAppend').show();
	}
	if ($radios.is(':checked') == false) {
		$('#btnAddNew').show();
		$('#purchaseInvoiceGrnCheck').hide();
		$('#purInvGrnAppend').hide();
	}
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Jan-2020
 * @codeFor : this is for get purchase invoice series
 ******************************************************************************/

function getPurchaseInvoiceSeries() {
	var inputs = [];
	inputs.push('isEdit=' + 'no');
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "GET",
				url : "ehat/invGoodReceiptNote/getGoodReceiptNoteSeries",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(response) {
					$("#purInvDocumentList").val(JSON.stringify(response));
					var divContent = "";
					for ( var i = 0; i < response.lstdocMasterDocNumFinancialYearDto.length; i++) {
						if (response.lstdocMasterDocNumFinancialYearDto[i].docId == 5) {
							divContent = divContent
									+ "<option id='seriesId' value='"
									+ response.lstdocMasterDocNumFinancialYearDto[i].docNumberingId
									+ "'  >"
									+ response.lstdocMasterDocNumFinancialYearDto[i].docSeries
									+ "</option>";
						}
					}
					$("#selectPurInvSeries").html(divContent);
				}
			});
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Jan-2020
 * @codeFor : this is for get purchase invoice next id
 ******************************************************************************/

function getNextPurchaseInvoiceId() {
	var inputs = [];
	inputs.push('tableName=inv_purchase_invoice');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/invPurchaseInvoice/getPurchaseInvoiceSeriesNextId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$("#hiddenNextPurInvId").val(r);
			$("#txtPurInvId").val(r);
			$("#nextMasterId").val(r);
			// $("#txtPurInvDocSeriesOpnigStock").val(r);
		}
	});
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Jan-2020
 * @codeFor : this is for get purchase invoice next id
 ******************************************************************************/

function getPurchaseInvSeries(id) {

	grnDcoumentObject = $("#purInvDocumentList").val();
	var grnNextId = $('#hiddenNextPurInvId').val() == "" ? $("#txtPurInvId")
			.val() : $('#hiddenNextPurInvId').val();
	objDocument = JSON.parse(grnDcoumentObject.trim());
	for ( var i = 0; i < objDocument.lstdocMasterDocNumFinancialYearDto.length; i++) {
		if (objDocument.lstdocMasterDocNumFinancialYearDto[i].docNumberingId == id) {
			$("#purInvSeries")
					.val(
							objDocument.lstdocMasterDocNumFinancialYearDto[i].docPrefix
									+ objDocument.lstdocMasterDocNumFinancialYearDto[i].docNumber
									+ grnNextId
									+ objDocument.lstdocMasterDocNumFinancialYearDto[i].docSuffix);
		}
	}
}
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Jan-2020
 * @codeFor : this is for get Goods Receipt Note
 ******************************************************************************/
function getGoodReceiptNoteList(id) {
	getNextPurchaseInvoiceId();
	getPurchaseInvSeries(($('#seriesId').val()));
	if (id != null && id != '') {
		getGoodsReceiptNote(id);
	}
}

function totalAmount(id, rowCount) {

	var quantity = $('#' + id).val();
	var rate = $('#unitPriceId' + rowCount).val();
	$('#orderQtyId' + rowCount).val(quantity);
	$('#pendinQtyId' + rowCount).val(quantity);
	$('#baseAmountId' + rowCount).val(quantity * rate);

	var sum = 0;
	var totalQty;
	var RowCount = $("#RowCount").val();

	for ( var i = 1; i <= RowCount; i++) {
		totalQty = $("#itemQuantityId" + i).val();

		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}
	$("#totalItemQty").val(sum);
	$("#totalItemId").val(sum);
	totalGrossAmt(1, rowCount);

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
/**
 * @author Rohit Sandbhor
 * @since 15-02-2020
 * @param id
 * @param rowcount
 */
function chkTradAmtorPercentage(id, rowcount) {
	var txtPurchaseQuotationTrdeDiscountPercentage = $(
			"#discountPerId" + rowcount).val();
	var txtTredeAmt = $("#discountPerId" + rowcount).val();

	if (txtPurchaseQuotationTrdeDiscountPercentage == ''
			|| txtPurchaseQuotationTrdeDiscountPercentage == null) {
		document.getElementById("discountRsId" + rowcount).disabled = false;
		$("#discountAmtId" + rowcount).val(' ');
		$("#baseAmountId" + rowcount).val(' ');
		$("#totalAmtId" + rowcount).val(' ');
	}

	if (!txtPurchaseQuotationTrdeDiscountPercentage == ''
			|| !txtPurchaseQuotationTrdeDiscountPercentage == null) {
		document.getElementById("discountRsId" + rowcount).disabled = true;
		$("#discountRsId" + rowcount).val(0);
		calculTradeDis("discountPerId", rowcount);
	}

}
/**
 * @since 15-02-2020
 * @Author Rohit
 * @comment Calculate treade discount AMt and add new fun call as totalGrossAmt()
 * @param id
 * @param rowCount
 * @returns {Boolean}
 */

function calculTradeDis(id, rowCount) {
	var treadeDiscount = $("#discountPerId" + rowCount).val();
	var oldbaseAmt = $('#baseAmountId' + rowCount).val();

	if (treadeDiscount > 100) {
		alert("Trade Discount should not more than 100");
		$("#discountPerId" + rowCount).val('');

		$("#discountAmtId" + rowCount).val('');
		$("#baseAmountId" + rowCount).val('');
		$("#totalAmtId" + rowCount).val('');

		var docqty = $("#itemQuantityId" + rowCount).val();
		var unitprise = $("#unitPriceId" + rowCount).val();

		var baseAmt = docqty * unitprise;
		$("#baseAmountId" + rowCount).val(baseAmt.toFixed(2));

		$("#discountPerId" + rowCount).focus();

		return false;

	} else {

		if (treadeDiscount) {

			$('#baseAmountId' + rowCount).val('');
			$('#discountAmtId' + rowCount).val('');

			var docqty = $("#itemQuantityId" + rowCount).val();
			var unitprise = $("#unitPriceId" + rowCount).val();

			var baseAmt = docqty * unitprise;

			var totalAmtInpercntage = baseAmt * treadeDiscount / 100;

			$('#discountAmtId' + rowCount).val(totalAmtInpercntage);

			var finalBaseAmt = baseAmt - totalAmtInpercntage;
			$('#baseAmountId' + rowCount).val(finalBaseAmt.toFixed(2));
			var RowCount = $("#RowCount").val();
			var totaltblsize = $("#totaltblsize").val();

			var FinaltradeDiscount = 0;
			for ( var i = 1; i <= totaltblsize; i++) {

				var txtPurchaseQuotationTrdeDiscountAmt = $(
						"#discountAmtId" + i).val();

				if (txtPurchaseQuotationTrdeDiscountAmt != ''
						&& txtPurchaseQuotationTrdeDiscountAmt != null
						&& txtPurchaseQuotationTrdeDiscountAmt != undefined) {
					FinaltradeDiscount = (parseFloat(FinaltradeDiscount) + parseFloat(txtPurchaseQuotationTrdeDiscountAmt)).toFixed(2);
				}

			}

			$("#totalItemDiscount").val(FinaltradeDiscount);
			$("#txtGross").val($('#baseAmountId' + rowCount).val());

		}
	}
	rowAmtCal(1, rowCount);
	totalGrossAmt(1, rowCount);
	totalVatAmt(1, rowCount);
}


function rowAmtCalForGst(id, rowCount) {

	var taxAmt = $("#gstId" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#totalAmtId' + rowCount).val(' ');
		return false;
	}
	var baseAmt = $('#baseAmountId' + rowCount).val();
	if (baseAmt == " " || baseAmt == null) {
		$("#totalAmtId").val(' ');
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
	}

}


function rowAmtCalForIgst(id, rowCount) {

	var taxAmt = $("#igstId" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#totalAmtId' + rowCount).val(' ');
		return false;
	}
	var baseAmt = $('#baseAmountId' + rowCount).val();
	if (baseAmt == " " || baseAmt == null) {
		$("#totalAmtId").val(' ');
		return false;
	} else {
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#baseAmountId' + rowCount).val();
		var taxAmt = $("#igstId" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$("#gstAmtId" + rowCount).val(finalcaltaxanmount); // add tax amount in
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmountAddingtax = finalsumofRowAmt.toFixed(2);
		$('#totalAmtId' + rowCount).val(finalRowAmountAddingtax);
	}

}

/** *** Calculate Total Gross AMt of Base Amt****** */
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
	$("#txtGross").val(sum.toFixed(2));

}

/** *** Calculate Total Vat AMt ****** */
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
	$("#txtNetAmt").val((parseFloat(sum) + parseFloat(totalgrossAmt)).toFixed(2));

}

/* calculate Total TradeDis Discount IN rupess */

function calculTradeDisRs(id, rowCount) {

	var treadeDiscountRs = $("#discountRsId" + rowCount).val();
	var oldbaseAmt = $('#baseAmountId' + rowCount).val();

	if (treadeDiscountRs) {

		$('#baseAmountId' + rowCount).val('');
		$('#discountAmtId' + rowCount).val('');

		var docqty = $("#itemQuantityId" + rowCount).val();
		var unitprise = $("#unitPriceId" + rowCount).val();

		var baseAmt = parseFloat(docqty) * parseFloat(unitprise);

		var finaltotalbaseAmt = parseFloat((baseAmt))
				- parseFloat(treadeDiscountRs);

		$('#discountAmtId' + rowCount).val(treadeDiscountRs);

		$('#baseAmountId' + rowCount).val(finaltotalbaseAmt.toFixed(2));

		var RowCount = $("#RowCount").val();
		var totaltblsize = $("#totaltblsize").val();

		var FinaltradeDiscount = 0;
		for ( var i = 1; i <= totaltblsize; i++) {

			var txtPurchaseQuotationTrdeDiscountAmt = $("#discountAmtId" + i)
					.val();

			if (txtPurchaseQuotationTrdeDiscountAmt != ''
					&& txtPurchaseQuotationTrdeDiscountAmt != null
					&& txtPurchaseQuotationTrdeDiscountAmt != undefined) {
				FinaltradeDiscount = (parseFloat(FinaltradeDiscount) + parseFloat(txtPurchaseQuotationTrdeDiscountAmt))
						.toFixed(2);
			}

		}

		$("#totalDiscountId").val(FinaltradeDiscount);

	}

}
function chKTradAmt(id, rowcount) {
	var txtPurchaseQuotationTrdeDiscountInRupess = $("#discountRsId" + rowcount)
			.val();

	if (txtPurchaseQuotationTrdeDiscountInRupess == ""
			|| txtPurchaseQuotationTrdeDiscountInRupess == null) {
		document.getElementById("discountPerId" + rowcount).disabled = false;
		$("#discountAmtId" + rowcount).val(' ');
		$("#baseAmountId" + rowcount).val(' ');
		$("#totalAmtId" + rowcount).val(' ');
		$("#totalDiscountId").val('0');
		// return false;

	}

	if (txtPurchaseQuotationTrdeDiscountInRupess != ""
			|| txtPurchaseQuotationTrdeDiscountInRupess != null) {
		document.getElementById("discountPerId" + rowcount).disabled = true;
		$("#discountPerId" + rowcount).val(0);
		var docqty = $("#itemQuantityId" + rowcount).val();
		var unitprise = $("#unitPriceId" + rowcount).val();
		var baseAmt = docqty * unitprise;
		var FinalBaseAmt = baseAmt - txtPurchaseQuotationTrdeDiscountInRupess;

		$("#discountAmtId" + rowcount).val(
				txtPurchaseQuotationTrdeDiscountInRupess);
		$("#baseAmountId" + rowcount).val(FinalBaseAmt);
		rowAmtCal(1, rowcount);
		calculTradeDisRs("discountRsId", rowcount);
		totalGrossAmt(1, rowcount);
		totalVatAmt(1, rowcount);

	}

}

function applyTaxforItemexpense(inputID) {
	/*
	 * var Finalrateandtax = inputID;
	 * 
	 * var sumofRate = 0; for ( var i = 0; i < Finalrateandtax.length; i++) {
	 * finalrat = Finalrateandtax[i]; var taxRate = finalrat.split("_");
	 * finalRateamt = taxRate[1]; if (finalRateamt == null || finalRateamt ==
	 * undefined) { finalRateamt = taxRate[0]; } sumofRate =
	 * parseFloat(sumofRate) + parseFloat(finalRateamt); if (isNaN(sumofRate)) {
	 * sumofRate = finalRateamt; } if (isNaN(finalrat)) { finalrat ==
	 * finalRateamt; } } var rowCount = "onchange"; if (rowCount == "var
	 * rowCount1") { $("#gstId" + rowCount[1]).val(sumofRate); $("#igstId" +
	 * rowCount[1]).val(sumofRate); } else { $("#gstId" +
	 * rowCount[1]).val(sumofRate); $("#igstId" + rowCount[1]).val(sumofRate); }
	 * 
	 * rowAmtCalNEW(1, rowCount[1]); totalVatAmtnEW(1, rowCount[1]);
	 */

	var txtPurchaseOrderTaxCode_ = "";
	// remove the wite space and empty option

	txtPurchaseOrderTaxCode_ = txtPurchaseOrderTaxCode_
			+ ($("#" + inputID).val() + ",");

	if (txtPurchaseOrderTaxCode_ == "") {
		alert("please Apply atleast one tax for Item");
		return false;
	}
	txtPurchaseOrderTaxCode_ = txtPurchaseOrderTaxCode_.substring(0,
			txtPurchaseOrderTaxCode_.length - 1);
	// var rowCount = $("#hiddenCount").val();
	// var rowCount = inputID.split("_");
	var Finalrateandtax = txtPurchaseOrderTaxCode_.split(",");
	var sumofRate = 0;
	var count = 0;

	for ( var i = 0; i < Finalrateandtax.length; i++) {
		count = i;
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

		$("#gstId" + i).val(sumofRate);
		$("#igstId" + i).val(sumofRate);

	}
	// if (rowCount[0] == "gstId" + i) {
	/*
	 * $("#gstId" + rowCount[count]).val(sumofRate); $("#igstId" +
	 * rowCount[count]).val(sumofRate);
	 */

	/*
	 * } else { $("#gstId" + rowCount[1]).val(sumofRate); $("#igstId" +
	 * rowCount[1]).val(sumofRate); }
	 */
	$('#lstBoxforTax').html();
	$("#ApplyTaxforItem").hide('hide');
	rowAmtCalNEW(1, rowCount[count]);
	totalVatAmtnEW(1, rowCount[count]);

}

function rowAmtCalNEW(id, rowCount) {

	var taxAmt = $("#igstId" + rowCount).val();
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
		var taxAmt = $("#igstId" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$('#gstAmtId' + rowCount).val(finalcaltaxanmount); // add tax amount in
		// Rs @author:paras
		// @Date:23nov

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


/************
* @author	: Rohit Sandbhor
* @date		: 15-02-2020
* @codeFor	:autotaxCodeforItemGst added for applying total gst calculation
 ************/
function autotaxCodeforItemGst(rowCount, onchange) {
	var gstId = $("#gstId" + rowCount).val();
	applyTaxforItemexpenseOfGstAmt(gstId);
}

/************
* @author	: Rohit Sandbhor
* @date		: 15-02-2020
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
 * @author : Rohit Sandbhor
 * @date : 16-Jan-2020
 * @codeFor :rowAmtCalNEWForGst added for applying total gst calculation
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
	}
}
/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 16-Jan-2020
 * @codeFor :totalVatAmtnEWForGSt added for applying total gst calculation
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
	$("#txtNetAmt").val((parseFloat(sum) + parseFloat(totalgrossAmt)).toFixed(2));

}

function autotaxCodeGrn(inputID, typeauto) {
	var txtVal1 = $('#' + inputID).val().trim();
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"taxName" : txtVal1,
			"callform" : typeauto
		},
		url : "ehat/invGoodReceiptNote/inventoryTaxAutoSuggestion",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			autoCompTableinv(r, inputID);
			totalVatAmt(r, inputID);
			applyTaxforItemexpense(inputID);
		}
	});
}

function autoCompTableinv(response, id) {
	var myArray = response;// $.parseJSON(response);// parsing response in JSON
	// format
	$
			.widget(
					'custom.mcautocomplete',
					$.ui.autocomplete,
					{
						_create : function() {
							this._super();
							this.widget().menu("option", "items",
									"> :not(.ui-widget-header)");
						},
						_renderMenu : function(ul, items) {
							var self = this, thead;
							if (this.options.showHeader) {
								table = $('<div class="ui-widget-header" style="width:100%"></div>');
								$
										.each(
												this.options.columns,
												function(index, item) {
													table
															.append('<span style="padding:0 4px;float:left;width:'
																	+ item.width
																	+ ';">'
																	+ item.name
																	+ '</span>');
												});
								table
										.append('<div style="clear: both;"></div>');
								ul.append(table);
							}
							$.each(items, function(index, item) {
								self._renderItem(ul, item);
							});
						},
						_renderItem : function(ul, item) {
							var t = '', result = '';
							$
									.each(
											this.options.columns,
											function(index, column) {
												t += '<span style="padding:0 4px;float:left;width:'
														+ column.width
														+ ';">'
														+ item[column.valueField ? column.valueField
																: index]
														+ '</span>';
											});
							result = $('<li></li>')
									.data('ui-autocomplete-item', item)
									.append(
											'<a class="mcacAnchor">'
													+ t
													+ '<div style="clear: both;"></div></a>')
									.appendTo(ul);
							$(ul).css("z-index", "10000000000");
							return result;
						}
					});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
			{
				// These next two options are what this plugin adds to the
				// autocomplete widget.
				showHeader : true,
				columns : [ {
					name : 'tax_code',
					width : '110px',
					valueField : 'tax_code'
				} ],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					console.log("tk");
					console.log(ui);
					// this.value = (ui.item ? ui.item.tax_code : '');
					if (ui.item.tax_code != 'No Record') {

						$("#" + id).val((ui.item.tax_code).trim());
						applyTaxforItemexpense(id);
					}

					return false;
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					var result;
					if (!data || !data.lstinventoryTaxSetUps
							|| data.lstinventoryTaxSetUps.length === 0) {

						result = [ {
							'tax_code' : 'No Record',
						} ];
					} else {
						result = data.lstinventoryTaxSetUps;// Response List for
						// All Services
					}
					response(result);

				}
			});
}

/** ************ Total Doc Discount ********** */

function totalDocDiscountPQ() {
	var sum = 0;
	var tradeAmt;
	var RowCount = $("#RowCount").val();

	for ( var i = 1; i <= RowCount; i++) {
		tradeAmt = $("#discountAmtId" + i).val();
		if (tradeAmt == null || tradeAmt == undefined || tradeAmt == '') {
			var flag = 1;
		} else {
			sum = (parseFloat(sum) + parseFloat(tradeAmt)).toFixed(2);
			;
		}

	}

	$("#totalItemDiscount").val(sum);
	$("#RowCount").val(RowCount);

}

function totalDocQtyPQ() {
	var sum = 0;
	var totalQty;
	var RowCount = $("#RowCount").val();

	// var totalRow = $("#totalRow").val();

	for ( var i = 1; i <= RowCount; i++) {
		totalQty = $("#itemQuantityId" + i).val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}

	$("#itemQuantityId").val(sum);
	$("#RowCount").val(RowCount);

}
function applyServiceChargesItem() {
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

	var textVat = $("#textVat").val();
	var finaltextVatValue = parseFloat(sumofRate) + parseFloat(textVat);
	$("#textVat").val(finaltextVatValue.toFixed(2));

	$('#lstBoxforCharges').html();
	$("#purchaseOrderModalId").hide('hide');

	calculateNetAmount();
}
function showServiceCharges() {
	$("#purchaseOrderModalId").show('show');
	getChargesDetail();
}

function hideApplyChargespopaup() {
	$('#lstBoxforCharges').html();
	$("#purchaseOrderModalId").hide('hide');
	$("#txtChargesAmt").val('');
}

function getChargesDetail() {
	var inputs = [];
	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/inventoryM/getAllChargeMaster",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(response) {
					var divContent = "";
					divContent = divContent
							+ "<select class='col-md-12'><option value='0'>---Select---</option>";
					for ( var i = 0; i < response.lstchargemaster.length; i++) {
						divContent = divContent + "<option value='"
								+ response.lstchargemaster[i].chargeId + "'  >"
								+ response.lstchargemaster[i].chargeName
								+ "</option>";
					}
					$("#chargesList").html(divContent);

				}
			});
}

function addItemCharges() {
	var txtChargesList = $("#chargesList option:selected").text();
	if ("-Select-" == txtChargesList || txtChargesList == 0) {
		alert("Please Select Charges");
		return false;
	}

	var txtChargesAmt = $("#txtChargesAmt").val();
	var txtexGstper = $("#txtexGstper").val();
	var txtexGstamt = $("#txtexGstamt").val();

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
			+ txtexGstper + "_" + txtexGstamt;

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
		$("#txtChargesAmt").val("");
		$("#txtexGstper").val(0);
		$("#txtexGstamt").val(0);
		$("#txtempAmt").val(0);
		$("#chargesList ").val('Select');
		$("#chargesList  option:selected").text("-Select-");

		$('select option').filter(
				function() {
					return !this.value || $.trim(this.value).length == 0
							|| $.trim(this.text).length == 0;
				}).remove();
	}

}
function removeItemCharges() {
	$('#lstBoxforCharges option:selected').remove();
}
function examunt(id) {
	var txtexamunt = $("#txtempAmt").val();
	$("#txtChargesAmt").val(txtexamunt);
}
function gstamt(ID) {
	var txtChargesAmt = $("#txtempAmt").val();
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
		var txtexamunt = $("#txtempAmt").val();
		txtfianlamt = parseFloat(txtexamunt) + parseFloat(txtexGstamt);
	}
	$("#txtexGstamt").val(txtexGstamt);
	$("#txtChargesAmt").val(txtfianlamt);

}

function calculateTotalTax() {
	var txtVat = 0;
	var txtExVat = 0;
	var lbt = 0;
	var cst = 0;
	var totalTax = 0;
	var gross = 0;
	var less = 0;

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
	// resetAllValues();
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

// this is all about calculate total less amount
function calculateTotalLess() {

	var itemDisc = 0;
	var schmDisc = 0;
	var splDisc = 0;
	var debitAmt1 = 0;
	var cd1 = 0;
	var totalLess = 0;

	/*
	 * if ($('#txtItemDisc').val() != '' && $('#txtItemDisc').val().length > 0)
	 * itemDisc = parseFloat($('#txtItemDisc').val());
	 * 
	 * if ($('#txtSchmDisc').val() != '' && $('#txtSchmDisc').val().length > 0)
	 * schmDisc = parseFloat($('#txtSchmDisc').val());
	 */

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

function calculateCDAmt() {
	var gross = 0;
	var itemDis = 0;
	var cd = 0;
	var cdAmt = 0;
	var amt = 0;
	if ($('#txtGross').val() != '' && $('#txtGross').val().length > 0) {
		gross = parseFloat($('#txtGross').val());
	}

	/*
	 * if ($('#txtItemDisc').val() != '' && $('#txtItemDisc').val().length > 0) {
	 * itemDis = parseFloat($('#txtItemDisc').val()); }
	 */

	if ($('#txtCD1').val() != '' && $('#txtCD1').val().length > 0) {
		cd = parseFloat($('#txtCD1').val());
	}

	// amt=(gross-itemDis);
	if (parseFloat(gross) > parseFloat(cd)) {
		cdAmt = parseFloat(gross) * (parseFloat(cd) / 100);
		$('#txtCDAmt').val(cdAmt.toFixed(2));
		calculateTotalLess();

	} else {
		alert("CD is less then Gross Amount!");
		$('#txtCDAmt').val('0');
		$('#txtCD1').val('0');
		calculateTotalLess();
		return false;
	}
}

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

	totalAdd = parseFloat(octroi) + parseFloat(surcharge)
			+ parseFloat(creditAmt) + parseFloat(freight);

	$('#txtAdd').val(totalAdd.toFixed(2));
	calculateNetAmount();
}
function calculatSpeDisct() {
	var GrossAmt = parseFloat($('#txtGross').val());
	var less = parseFloat($('#txtLess').val());
	var finalvatafterreduece = 0;
	var txtSplDisc = 0;
	var txtVat = 0;
	if ($('#txtSplDisc').val() == '' || $('#txtSplDisc').val() == 0) {
		// alert($('#txtSplDisc').val());
		totalVatAmt(1, rowCount);
		calculateTotalTax();
		calculateTotalLess();
		calculateNetAmount();
	}

	if ($('#txtVat').val() != '' && $('#txtVat').val().length > 0)
		txtVat = parseFloat($('#txtVat').val());
	if ($('#txtSplDisc').val() != '' && $('#txtSplDisc').val().length > 0)
		txtSplDisc = parseFloat($('#txtSplDisc').val());

	finalvatafterreduece = parseFloat(txtVat)
			- (parseFloat(txtVat) * parseFloat(txtSplDisc) / 100);

	$('#txtVat').val(finalvatafterreduece.toFixed(2));

	calculateTotalTax();
	calculateTotalLess();
	calculateNetAmount();

}
//commenting this function by Rohit becoz not sure
/*function pendingAmount(id, rowCount) {

	$("#pendinQtyId" + rowCount).val(0);
	var actualquantity = $('#' + id).val();
	var quantity = $('#itemQuantityId' + rowCount).val();
	if (actualquantity == "") {
		$("#pendinQtyId" + rowCount).val('0');
		$("#lblPurchaseQuotationDocQuantity" + rowCount).text(quantity);
		$("#txtPurchaseQuotationChangingItemQty" + rowCount).val(quantity);
		totalPendingQtyGRN();
		totalAmountforParialGRN(1, rowCount);
		totalVatAmt(id, rowCount);
		rowAmtCal(id, rowCount);
		calcuatSumforTradeDisAmtforPartialGRN();
		calcuatSumforitemQTYforPartialGRN();
		totalGrossAmt(id, rowCount);
		calculateNetAmount();
		return false;
	}

	if (parseInt(actualquantity) > parseInt(quantity)) {
		alert("Please enter valid quantity");
		$('#' + id).val(quantity);
		$("#lblPurchaseQuotationDocQuantity" + rowCount).text(quantity);
		$("#txtPurchaseQuotationChangingItemQty" + rowCount).text(quantity);
		totalPendingQtyGRN();
		totalAmountforParialGRN(1, rowCount);
		totalVatAmt(id, rowCount);
		rowAmtCal(id, rowCount);
		calcuatSumforTradeDisAmtforPartialGRN();
		calcuatSumforitemQTYforPartialGRN();
		totalGrossAmt(id, rowCount);
		calculateNetAmount();
		return false;
	} else {
		var pendingQty = parseInt(quantity) - parseInt(actualquantity);
		$("#pendinQtyId" + rowCount).val(pendingQty);
		$("#lblPurchaseQuotationDocQuantity" + rowCount).text(actualquantity);
		$("#txtPurchaseQuotationChangingItemQty" + rowCount).val(actualquantity);
	}
	totalPendingQtyGRN();
	totalAmountforParialGRN(1, rowCount);
	totalVatAmt(id, rowCount);
	rowAmtCal(id, rowCount);
	calcuatSumforTradeDisAmtforPartialGRN();
	calcuatSumforitemQTYforPartialGRN();
	totalGrossAmt(id, rowCount);
	calculateNetAmount();
}*/
function calcuatSumforitemQTYforPartialGRN() {
	var totaltblsize = $("#totaltblsize").val();
	var FinaltxtItemdocQty = 0;
	var totlqtyflag = 0;
	for ( var i = 1; i <= totaltblsize; i++) {
		var txtItemdocQty = $("#lblPurchaseQuotationDocQuantity" + i).text();

		if (txtItemdocQty != '' && txtItemdocQty != null
				&& txtItemdocQty != undefined) {
			FinaltxtItemdocQty = (parseFloat(FinaltxtItemdocQty) + parseFloat(txtItemdocQty));
			totlqtyflag = 1;
		}

	}
	// this if is used for calculating total item qty when partial GRN and
	// Direct GRN @24 Oct 2016
	if (parseInt(totlqtyflag) == 0) {

	} else {
		$("#txtGRNTotalDocQty").val(FinaltxtItemdocQty);
	}

}

function calcuatSumforTradeDisAmtforPartialGRN() {
	var totaltblsize = $("#totaltblsize").val();
	var FinaltradeDiscount = 0;
	for ( var i = 1; i <= totaltblsize; i++) {

		var txtPurchaseQuotationTrdeDiscountAmt = $("#discountAmtId" + i).val();

		if (txtPurchaseQuotationTrdeDiscountAmt != ''
				&& txtPurchaseQuotationTrdeDiscountAmt != null
				&& txtPurchaseQuotationTrdeDiscountAmt != undefined) {
			FinaltradeDiscount = (parseFloat(FinaltradeDiscount) + parseFloat(txtPurchaseQuotationTrdeDiscountAmt))
					.toFixed(2);
		}

	}

	$("#totalItemDiscount").val(FinaltradeDiscount);

}

function totalPendingQtyGRN() {
	var sum = 0;
	var totalQty;
	var RowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();
	// var totalRow = $("#totalRow").val();

	for ( var i = 1; i <= totaltblsize; i++) {
		totalQty = $("#pendinQtyId" + i).val();
		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
			sum = parseInt(sum) + parseInt(totalQty);
		}

	}

	$("#totalPendingQty").val(sum);
	$("#RowCount").val(RowCount);

}

function totalAmountforParialGRN(id, rowCount) {

	var quantity = $('#lblPurchaseQuotationDocQuantity' + rowCount).text();

	var rate = $('#txtPurchaseQuotationUnitPrice' + rowCount).val();

	var txtPurchaseQuotationTrdeDiscountPercentage = $(
			"#txtPurchaseQuotationTrdeDiscountPercentage" + rowCount).val();
	var txtPurchaseQuotationTrdeDiscountInRupess = $(
			"#txtPurchaseQuotationTrdeDiscountInRupess" + rowCount).val();

	if (parseInt(txtPurchaseQuotationTrdeDiscountPercentage) == 0
			&& parseInt(txtPurchaseQuotationTrdeDiscountInRupess) == 0) {
		$("#txtPurchaseQuotationTrdeDiscountPercentage" + rowCount).val(0);
		$("#txtPurchaseQuotationTrdeDiscountInRupess" + rowCount).val(0);
		$("#txtPurchaseQuotationTrdeDiscountAmt" + rowCount).val(0);
		$('#txtPurchaseQuotationBaseAmount' + rowCount).val(
				(quantity * rate).toFixed(2));
		return false;
	}

	// calculate Discount In reupess IN Pecentage
	if (parseInt(txtPurchaseQuotationTrdeDiscountPercentage) > 0) {
		var baseAmt = quantity * rate;

		var totalAmtInpercntage = baseAmt
				* txtPurchaseQuotationTrdeDiscountPercentage / 100;

		$("#txtPurchaseQuotationTrdeDiscountAmt" + rowCount).val(
				totalAmtInpercntage.toFixed(2));

		var finalBaseAmt = baseAmt - totalAmtInpercntage;
		$("#txtPurchaseQuotationBaseAmount" + rowCount).val(
				finalBaseAmt.toFixed(2));
	}

	// calculate Discount In reupess
	if (parseInt(txtPurchaseQuotationTrdeDiscountInRupess) > 0) {
		var baseAmt = quantity * rate;

		var totalAmtInRupess = baseAmt
				- txtPurchaseQuotationTrdeDiscountInRupess;

		$("#txtPurchaseQuotationTrdeDiscountAmt" + rowCount).val(
				txtPurchaseQuotationTrdeDiscountInRupess);

		$("#txtPurchaseQuotationBaseAmount" + rowCount).val(
				totalAmtInRupess.toFixed(2));
	}

	totalGrossAmt(1, rowCount);

}

function setRoundNetAmount() {
	if ($('#txtNetAmt').val() == null && $('#txtNetAmt').val() == '') {
		alert("please Enter Net Amount");
		return false;

	} else {
		var retVal = confirm("Do you want to Round off Net Amount  ?");
		if (retVal) {
			var r = Math.round($('#txtNetAmt').val());
			$("#txtNetAmt").val(r);
		} else {
			calculateNetAmount();
		}
	}
}

function taxcalculation(id, rowCount) {
	var taxcodeandrate = $("#gstId" + rowCount).val();
	if (taxcodeandrate == "Select") {
		alert("please Select Tax");
		return false;
	}
	var taxRate = taxcodeandrate.split("_");
	var finalRate = taxRate[1];
	$("#igstId" + rowCount).val(finalRate);
	rowAmtCal(1, rowCount);
}

function getMfgandexpyDate(inputID) {
	new JsDatePick({
		useMode : 2,
		target : inputID,
		/* dateFormat:"%d-%M-%Y", */
		yearsRange : [ 1920, 2099 ],
		limitToToday : false,
		/* cellColorScheme:"beige", */
		dateFormat : "%Y-%m-%d",
		imgPath : "../img/",
		weekStartDay : 1,
	});

}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Jan-2020
 * @codeFor : this is for get Pendding Goods Receipt Note
 ******************************************************************************/

function getPendingGoodsReceiptNote() {
	var inputs = [];
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "ehat/invPurchaseInvoice/getPendingGoodsReceiptNote",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(response) {
					var divContent = "";
					divContent = divContent
							+ "<select class='col-md-12'><option value='0'>--Select Good Receipt Note--</option>";
					for ( var i = 0; i < response.lstGoodReceiptNoteDto.length; i++) {
						divContent = divContent
								+ "<option value='"
								+ response.lstGoodReceiptNoteDto[i].id
								+ "'  >"
								+ response.lstGoodReceiptNoteDto[i].grnSeriesVal
								+ "No : "
								+ response.lstGoodReceiptNoteDto[i].id
								+ "</option>";
					}
					$("#purchaseInvoiceGrn").html(divContent);
				}
			});
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Jan-2020
 * @codeFor : this is for get Goods Receipt Note by Id
 ******************************************************************************/

function getGoodsReceiptNote(goodsReceiptNoteId) {
	if (parseInt(goodsReceiptNoteId) === 0) {
		alert("Please select at least one GRN ");
		return false;
	}

	var inputs = [];
	inputs.push("id=" + goodsReceiptNoteId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/invGoodReceiptNote/editGoodReceiptNote",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(response) {
			$("#purchaseInvSupplierName").val(response.grnSupplierName);
			$("#hiddenSupplierNameId").val(response.partyMasterDto.id);
			$("#purInvMobileNo").val(response.grnSupplierMobile);

			getPurchaseInvoiceSeries();
			setParyMasterStateToPurchaseInvoice(response.partyMasterDto);
			$('#purchaseInvoiceSupplierState').select2('val',response.grnSupplierStateId);
			$("#purInvReferenceNo").val(response.grnReferenceNo);
			$("#purInvDeliveryDate").val(response.grnDeliveryDate);
			$("#purInvSupplierAddress").val(response.grnSupplierAddress);
			$("select#purInvStatus").val(response.grnStatus);

			$("#totalItemQty").val(response.totalItemQuantity);
			$("#totalItemDiscount").val(response.totalItemDiscount);
			$("#txtSplDisc").val(response.lessSpecialDiscount);
			$("#txtdebitAmt1").val(response.lessDebitAmount);
			$("#txtCD1").val(response.lessCDPercent1);
			$("#txtCDAmt").val(response.lessCDPercent2);
			$("#txtOctroi").val(response.addOctroi);
			$("#txtSurcharge").val(response.addSurcharge);
			$("#txtCreditAmt").val(response.addCreditAmount);
			$("#txtFreight").val(response.addFreight);
			$("#txtVat").val(response.taxVat);
			$("#txtlbt").val(response.taxLBT);
			$("#txtcst").val(response.taxCST);
			$("#txtExVat").val(response.taxExVat);
			$("#txtTotalVat").val(response.taxTotalTaxes);
			$("#selboxChargeswithAmtList").val(response.lessDebitAmount);
			$("#sumofCharges").val(response.sumofCharges);
			$("#txtPurInvArermark").val(response.rermark);
			;
			$("#txtGross").val(response.grossAmount);
			$("#txtLess").val(response.grossLessAmount);
			$("#txtAdd").val(response.grossAddAmount);
			$("#textVat").val(response.grossTaxes);
			$("#txtNetAmt").val(response.grossNetAmount);

		/*	if (response.isWithoutPoGrn == "Y") {
				$("#withoughtGrnPurInvId").prop("checked", true);
				var $radios = $('input:checkbox[name=withoughtGrnPurInvId]');
				if ($radios.is(':checked') == true) {
					$('#checkForInvoiceGRN').hide();
					$('#checkForGRN').hide();
					$('#btnAddNew').show();
					$('#purchaseInvoiceCheck').hide();
				}
				if ($radios.is(':checked') == false) {
					$('#checkForInvoiceGRN').show();
					$('#checkForGRN').show();
					$('#btnAddNew').hide();
					$('#purchaseInvoiceCheck').show();
				}
			}*/
			setEditPurchaseInvoiceSlaveInfo(response, "GRN");
		}
	});
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Jan-2020
 * @codeFor : this is for set party master address
 ******************************************************************************/

function setPartyModalAddressInfoToPurchaseInvoice(response) {
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
				+ ' <td class="col-md-1 center" id="statename' + count + '" >'
				+ response.partyMasterAddressInfoDto[i].state + '</td>'
				+ ' <td class="col-md-1 center" id="address' + count + '" >'
				+ response.partyMasterAddressInfoDto[i].address + '</td>'

				+ '</tr>';

	}
	$("#partyMasterAddressSlaveRecordList").html(htm);

}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Jan-2020
 * @codeFor : this is for set party master Contact
 ******************************************************************************/

function setPartyModalContactInfoToPurchaseInvoice(response) {

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
 * @date : 10-Jan-2020
 * @codeFor : this is for set party master address and Contact
 ******************************************************************************/

function setPartyModalInfoToTableOnPurchaseInvoice() {

	$("input[name='rdTreat']:checked").each(function() {

		var inx = $(this).val();

		$("#purInvSupplierAddress").val($("#address" + inx).html());
	});

	$("input[name='rdTreat1']:checked").each(function() {

		var inx = $(this).val();

		$("#purInvMobileNo").val($("#contactPhoneOne" + inx).html());
	});
	closepartyMasterDetailsModal();

}

function closepartyMasterDetailsModal() {
	$("#purchaseInvoiceModalId").hide();
}

/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Jan-2020
 * @codeFor : this is for batch is available or not
 ******************************************************************************/

function checkBatchAvailability(batchId) {

	var itemMasterId = $("#purInvItemId").val();
	if (itemMasterId != null && itemMasterId > 0) {
		itemMasterId = $("#purInvItemId").val();
	} else {
		alertify.error("Please Select Item name ");
		return 0
	}
	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			id : batchId,
			itemMasterId : itemMasterId,
		},
		url : "ehat/invGoodReceiptNote/checkBatchAvailability",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(result) {
			if (result.length == 0) {
				alertify.success("Add new batch code for this item");
				$("#txtExpiry").val('');
				$("#txtExpiry").prop("readonly", false);
				$("#hiddenBatchId").val('0');
			} else {
				alertify.error("Batch code already exit for this item");
				$("#txtExpiry").val(result[0].batchExpDate);
				$("#txtExpiry").prop("readonly", true);
			}

		}
	});
}

function setParyMasterStateToPurchaseInvoice(r){
	var divContent = "";
    divContent = divContent
            + "<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";
   
    for ( var i = 0; i < r.partyMasterAddressInfoDto.length; i++) {                            
        	divContent = divContent + "<option value='" + r.partyMasterAddressInfoDto[i].stateId + "'>"
                + r.partyMasterAddressInfoDto[i].state + "</option>";
    }
    divContent = divContent + "</select>";
    $("#purchaseInvoiceSupplierState").html(divContent);
    $("#purchaseInvoiceSupplierState").select2();
      
}

	
function getVendorState() {
	var supplierState = $("#purchaseInvoiceSupplierState option:selected").val();
	var userState = $("#userState").val();
	var rows = $('#purInvItemInfoTable tbody tr.newAdded').length;
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
	
	


/**
 * @author : Rohit Sandbhor
 * @date : 27-12-2019
 * @comment	: This function is created for to get formated date on table
 * @param date
 * @returns
 */
function getDate(date) {
	var datee;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	var hours = formattedDate.getHours();
	var minute = formattedDate.getMinutes();
	var seconds = formattedDate.getSeconds();
	datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2);
	console.log("Datee >> " + datee);
	return datee;
}

/**
 * @since 15-02-2020
 * @author This method is craeted for to remove duplicate states after selecting party name on purchase invoice
 */
function removeDuplicateStatesPurchaseInvoice(){
	var optionValues =[];
	$('#purchaseInvoiceSupplierState option').each(function(){
	   if($.inArray(this.value, optionValues) >-1){
	      $(this).remove();
	   }else{
	      optionValues.push(this.value);
	   }
	});
}

function closePopUpAndRefreshPage(){
	 window.location.reload();
}


/* calculate Total TradeDis Discount IN rupess */

function calculTradeDisRs(id, rowCount) {

	var treadeDiscountRs = $("#discountRsId" + rowCount).val();
	var oldbaseAmt = $('#baseAmountId' + rowCount).val();

	if (treadeDiscountRs) {

		$('#baseAmountId' + rowCount).val('');
		$('#discountAmtId' + rowCount).val('');

		var docqty = $("#itemQuantityId" + rowCount).val();
		var unitprise = $("#unitPriceId" + rowCount).val();

		var baseAmt = parseFloat(docqty) * parseFloat(unitprise);

		var finaltotalbaseAmt = parseFloat((baseAmt)) -
			parseFloat(treadeDiscountRs);

		$('#discountAmtId' + rowCount).val(treadeDiscountRs);

		$('#baseAmountId' + rowCount).val(finaltotalbaseAmt.toFixed(2));

		var RowCount = $("#RowCount").val();
		var totaltblsize = $("#totaltblsize").val();

		var FinaltradeDiscount = 0;
		for (var i = 1; i <= totaltblsize; i++) {

			var txtPurchaseQuotationTrdeDiscountAmt = $("#discountAmtId" + i)
				.val();

			if (txtPurchaseQuotationTrdeDiscountAmt != '' &&
				txtPurchaseQuotationTrdeDiscountAmt != null &&
				txtPurchaseQuotationTrdeDiscountAmt != undefined) {
				FinaltradeDiscount = (parseFloat(FinaltradeDiscount) + parseFloat(txtPurchaseQuotationTrdeDiscountAmt))
					.toFixed(2);
			}

		}

		$("#totalItemDiscount").val(FinaltradeDiscount);

	}

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
		$("#gstAmtId" + rowCount).val(finalcaltaxanmount); //add tax amount in Rs purchase quotation  @author:paras @Date:23nov
		
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmountAddingtax = finalsumofRowAmt.toFixed(2);
		
		$('#totalAmtId' + rowCount).val(finalRowAmountAddingtax);
	}

}

/** *** Calculate Total Gross AMt of Base Amt****** */
function totalGrossAmt(id, rowCount) {
	var sum = 0;
	var baseAmount;
	var RowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();
	for (var i = 1; i <= totaltblsize; i++) {
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

/************
* @author	: Dayanand Khandekar
* @date		: 19-Feb-2020
* @codeFor	:removeRowFromTableForInvoice
 ************/
function removeRowFromTableForInvoice(tableId,checkboxClass){
	$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
	checkForInvoice(tableId);
	checkCompForInvoice(tableId);
	var rowCount = $("#totaltblsize").val();
 	
	totalDocQtyPQ();
	totalDocDiscountPQ();
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);
	totalAmount(1,rowCount);
}

/************
* @author	: Dayanand Khandekar
* @date		: 19-Feb-2020
* @codeFor	: For reorder srno after delete
 ************/
function checkForInvoice(tableId){
	obj=$('#'+tableId+' tbody tr').find('span');
	$.each( obj, function( key, value ) {
		id=value.id;
		$('#'+id).html(key+1);
	});
}
/************
* @author	: Dayanand Khandekar
* @date		:  19-Feb-2020
* @codeFor	: For reorder index ids of componant after delete
 ************/
function checkCompForInvoice(tableId){
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
* @author	: Dayanand Khandekar
* @date		:  19-Feb-2020
* @codeFor	: Check uncheck all checkbox in table
 ************/
function checkUncheckAll(masterChkId,slaveChkClass){
	
	if($("#"+masterChkId).is(":checked")){
		
		$('.'+slaveChkClass).prop("checked",true);
	}else{
		
		$('.'+slaveChkClass).prop("checked",false);
	}
}


//this is all aboout reset general info field
function resetGRNInfoFields(tabType) {

	if (tabType === "contactInfo") {
		$('#contactFormId')[0].reset();
	} else if (tabType === "addressInfo") {
		$('#addressFormId')[0].reset();
		$("#countryFromAddress").select2("val", 0);
		$("#stateFromAddress").select2("val", 0);
		$("#districtFromAddress").select2("val", 0);
		$("#talukaFromAddress").select2("val", 0);
		$("#cityFromAddress").select2("val", 0);
	} else if (tabType === "GRN") {
		$('#financialFormId')[0].reset();
		getChallanAndPurchaseInvoiceId();
	}
}

/**
 * 
 */
function resetInfoFieldsForPurchaseInvoice(tabType) {
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
	}
}




