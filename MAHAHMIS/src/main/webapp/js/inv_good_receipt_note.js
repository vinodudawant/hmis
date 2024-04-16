// this is for add dynamically row in table by Vishnu
function Replace(str) {
	var del = new RegExp('%20');
	str.match(del);
}
/*******************************************************************************
 * @author : Vishnu Thorat
 * @date : 10-Nov-2019
 * @codeFor : save Goods Receipt Note
 ******************************************************************************/
function saveGoodReceiptNote(isDraft) {
	if(isDraft == "NODRAFT"){
		if((confirm("Do you want to save grn then Ok, otherwise click on save draft?") !=true)){
			return false;
		}
	}
	var purchaseOrder = null;
	var purchaseOrderNumber = null;
	var callFrom = null;
	var withoughtPoGrnId = document.getElementById("withoughtPoGrnId");
	if (withoughtPoGrnId.checked == true) {
		purchaseOrder = 0;
		purchaseOrderNumber = 0;
	} else {
		purchaseOrder = $("#grnPurchaseOrder option:selected").text();
		callFrom = purchaseOrder.substring(0,2);
		purchaseOrderNumber = $("#grnPurchaseOrder option:selected").val();
	}
	var $radios = $('input:checkbox[name=withoughtPoGrnId]');
	var isWithoutPoGrn = 'N';
	/*if ($radios.is(':checked') == true) {
		isWithoutPoGrn = "Y";
		$('#grnPurchaseOrderId').hide();
		$('#checkForGRN').hide();
		$('#btnAddNew').show();
		$('#grnPartial').css('display', 'none');
		$('#purchaseOrderCheck').hide();
	}
	if ($radios.is(':checked') == false) {
		isWithoutPoGrn = "N";
		$('#grnPurchaseOrderId').show();
		$('#checkForGRN').show();
		$('#btnAddNew').hide();
		$('#grnPartial').css('display', 'block');
		$('#purchaseOrderCheck').show();
	}*/
	
	var grnId = $("#grnId").val();
	var grnSupplierName = $("#grnSupplierName").val();

	var grnDate = $("#grnDate").val();
	var grnSupplierState = $("#grnSupplierState option:selected").text();
	var grnSupplierStateId = $("#grnSupplierState").val();

	var grnMobileNo = $("#grnMobileNo").val();

	var grnReferenceNo = $("#grnReferenceNo").val();
	var grnSeries = $("#selectGrnDoc option:selected").text();
	var grnSeriesText = $("#grnSeries").val();
	var grnPurInvNumber = $("#grnPurInvNumber").val();
	var grnPurInvNumber1 = $("#grnPurInvNumber1").val();

	var grnDeliveryDate = $("#grnDeliveryDate").val();
	var grnSupplierAddress = $("#grnSupplierAddress").val();

	var grnStatus = $("#grnStatus option:selected").val();
	var grnDeliveryChallanNumber = $("#grnDeliveryChallanNumber").val();
	var grnDeliveryChallanNumber1 = $("#grnDeliveryChallanNumber1").val();
	var grnPartyMasterId = $("#hiddenSupplierNameId").val();
	var partyGstNo = $("#partyGstNo").val();
	partyGstNo=0;
	
	
	var itemTotalAmt = $("#itemTotalAmt").val();
	
	var totalIgstAmount = $("#totaliGstAmt").val();
	
	var totalgstAmount = $("#totalGstAmt").val();

	// validation
	if (grnSupplierName == "" || grnSupplierName == null ||
		grnSupplierName == undefined || grnSupplierName == "undefined") {
		alert("please enter supplier name");
		$("#grnSupplierName").focus();
		return false;
	}

	if (grnDate == "" || grnDate == null || grnDate == undefined ||
		grnDate == "undefined") {
		alert("please select good receipt note date");
		$("#grnDate").focus();
		return false;
	}

	if (grnSupplierState == "" || grnSupplierState == null ||
		grnSupplierState == undefined || grnSupplierState == "undefined") {
		alert("please select grn supplier state");
		$("#grnSupplierState").focus();
		return false;
	}

	if (grnMobileNo == "" || grnMobileNo == null || grnMobileNo == undefined ||
		grnMobileNo == "undefined") {
		alert("Mobile number should not be Empty!");
		$("#grnMobileNo").focus();
		return false;
	} else if (grnMobileNo != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(grnMobileNo)) {
			alert("Mobile number should be of digits only!");
			$("#grnMobileNo").focus();
			return false;
		}
	}

	if (grnSeries == "" || grnSeries == null || grnSeries == undefined ||
		grnSeries == "undefined") {
		alert("please select grn series");
		$("#grnSeries").focus();
		return false;
	}

	if (grnReferenceNo == "" || grnReferenceNo == null ||
		grnReferenceNo == undefined || grnReferenceNo == "undefined") {
		alert("please enter grn reference no");
		$("#grnReferenceNo").focus();
		return false;
	}

	if (grnSupplierAddress == "" || grnSupplierAddress == null ||
		grnSupplierAddress == undefined ||
		grnSupplierAddress == "undefined") {
		alert("please enter grn supplier address");
		$("#grnSupplierAddress").focus();
		return false;
	}

	if (grnPurInvNumber == "" || grnPurInvNumber == null ||
		grnPurInvNumber == undefined || grnPurInvNumber == "undefined") {
		alert("please enter grn purchase invoice no");
		$("#grnPurInvNumber").focus();
		return false;
	}

	if (grnDeliveryChallanNumber == "" || grnDeliveryChallanNumber == null ||
		grnDeliveryChallanNumber == undefined ||
		grnDeliveryChallanNumber == "undefined") {
		alert("please enter grn delivery challan no");
		$("#grnDeliveryChallanNumber").focus();
		return false;
	}

	var is_pending = "N";
	var totalItemQuantity = 0;
	if ($("#totalItemQty").val() != null && $("#totalItemQty").val() != "") {
		totalItemQuantity = $("#totalItemQty").val();
	}

	var totalItemDiscount = 0;
	if ($("#totalItemDiscount").val() != null && $("#totalItemDiscount").val() != "") {
		totalItemDiscount = $("#totalItemDiscount").val();
	}

	var totalPendingQty = 0;
	if ($("#totalPendingQty").val() != null && $("#totalPendingQty").val() != "") {
		totalPendingQty = $("#totalPendingQty").val();
	}

	if(totalPendingQty > 0){
		is_pending = "Y";
	}
	var lessSpecialDiscount = 0;
	if ($("#txtSplDisc").val() != null && $("#txtSplDisc").val() != "") {
		lessSpecialDiscount = $("#txtSplDisc").val();
	}
	var lessDebitAmount = 0;
	if ($("#txtdebitAmt1").val() != null && $("#txtdebitAmt1").val() != "") {
		lessDebitAmount = $("#txtdebitAmt1").val();
	}
	var lessCDPercent1 = 0;
	if ($("#txtCD1").val() != null && $("#txtCD1").val() != "") {
		lessCDPercent1 = $("#txtCD1").val();
	}
	var lessCDPercent2 = 0;
	if ($("#txtCDAmt").val() != null && $("#txtCDAmt").val() != "") {
		lessCDPercent2 = $("#txtCDAmt").val();
	}

	var addOctroi = 0;
	if ($("#txtOctroi").val() != null && $("#txtOctroi").val() != "") {
		addOctroi = $("#txtOctroi").val();
	}
	var addSurcharge = 0;
	if ($("#txtSurcharge").val() != null && $("#txtSurcharge").val() != "") {
		addSurcharge = $("#txtSurcharge").val();
	}
	var addCreditAmount = 0;
	if ($("#txtCreditAmt").val() != null && $("#txtCreditAmt").val() != "") {
		addCreditAmount = $("#txtCreditAmt").val();
	}
	var addFreight = 0;
	if ($("#txtFreight").val() != null && $("#txtFreight").val() != "") {
		addFreight = $("#txtFreight").val();
	}
	var taxVat = 0;
	if ($("#txtVat").val() != null && $("#txtVat").val() != "") {
		taxVat = $("#txtVat").val();
	}
	var taxLBT = 0;
	if ($("#txtlbt").val() != null && $("#txtlbt").val() != "") {
		taxLBT = $("#txtlbt").val();
	}
	var taxCST = 0;
	if ($("#txtcst").val() != null && $("#txtcst").val() != "") {
		taxCST = $("#txtcst").val();
	}
	var taxExVat = 0;
	if ($("#txtExVat").val() != null && $("#txtExVat").val() != "") {
		taxExVat = $("#txtExVat").val();
	}
	var taxTotalTaxes = 0;
	if ($("#txtTotalVat").val() != null && $("#txtTotalVat").val() != "") {
		taxTotalTaxes = $("#txtTotalVat").val();
	}
	var sumofCharges = 0;
	if ($("#sumofCharges").val() != null && $("#sumofCharges").val() != "") {
		sumofCharges = $("#sumofCharges").val();
	}

	var rermark = $("#txtGRNArermark").val();

	var grossAmount = 0;
	if ($("#txtGross").val() != null && $("#txtGross").val() != "") {
		grossAmount = $("#txtGross").val();
	}

	var grossLessAmount = 0;
	if ($("#txtLess").val() != null && $("#txtLess").val() != "") {
		grossLessAmount = $("#txtLess").val();
	}

	var grossAddAmount = 0;
	if ($("#txtAdd").val() != null && $("#txtAdd").val() != "") {
		grossAddAmount = $("#txtAdd").val();
	}

	var grossTaxes = 0;
	if ($("#grossTaxesId").val() != null && $("#grossTaxesId").val() != "") {
		grossTaxes = $("#grossTaxesId").val();
	}

	var grossNetAmount = 0;
	if ($("#txtNetAmt").val() != null && $("#txtNetAmt").val() != "") {
		grossNetAmount = $("#txtNetAmt").val();
	}

	var itemInfoDtoDetails = {
		lstGoodReceiptNoteItemDto: []
	};
	var grnItemInfo = $('#grnItemInfoTable tbody tr.newAdded').length;
	if (grnItemInfo == "" || grnItemInfo == null || grnItemInfo == 0) {
		alert("Enter at least One Record In Item Info tab ");
		return false;
	}
	var rows = $('#grnItemInfoTable tbody tr.newAdded').length;
	for (var i = 1; i <= rows; i++) {
		var regEx = /^\d{4}-\d{2}-\d{2}$/;
		var userId = $("#userId").val();
		var unitId = $("#unitId").val();
		var itemId = $("#slaveId" + i).val();
		var mainItemId = $("#itemId" + i).val();
		var itemName = $("#itemNameId" + i).val();
		if(itemName == '' || itemName == null || itemName == undefined){
			alert("Please Enter Item Details First..!!");
			return false;
		}
		var itemQuantity = $("#itemQuantityId" + i).val();
		if(itemQuantity == '' || itemQuantity == null || itemQuantity == undefined){
			alert("Please Enter Item Quantity..!!");
			return false;
		}
		var unitPriceId = $("#unitPriceId" + i).val();
		var discountPerId = $("#discountPerId" + i).val();
		if(discountPerId == '' || discountPerId == null || discountPerId == undefined){
			alert("Please Enter Discount In Percentage..!!");
			return false;
		}
		var discountRsId = $("#discountRsId" + i).val();
		
		if(discountRsId == '' || discountRsId == null || discountRsId == undefined){
			alert("Please Enter Discount In RS..!!");
			return false;
		}
		
		if(discountRsId == '' || discountRsId == null || discountRsId == undefined){
			discountRsId = 0;
		}
		var discountAmtId = $("#discountAmtId" + i).val();
		if(discountAmtId == '' || discountAmtId == null || discountAmtId == undefined){
			discountAmtId = 0;
		}
		var baseAmountId = $("#baseAmountId" + i).val();
		var gstId = $("#gstId" + i).val();
		var taxCodeId = $("#itemTaxCodeId" + i).val();
		var hsnNameId = $("#itemHsnNameId" + i).val();
		var hsnId = $("#itemHsnId" + i).val();
		var igstId = $("#igstId" + i).val();
		var gstAmtId = $("#gstAmtId" + i).val();
		var totalAmtId = $("#totalAmtId" + i).val();
		var factor1 = $("#factor1" + i).val();
		var factor2 = $("#factor2" + i).val();
		var factor3 = $("#factor3" + i).val();
		var factor4 = $("#factor4" + i).val();
		// this is added by Vishnu for unit factor name 
		var uomUnitLatestFactorId = $("#uomUnitLatestFactorId" + i).text();
		var uomUnitFactorOneNameId = $("#uomUnitFactorOneNameId" + i).text();
		var uomUnitFactorTwoNameId = $("#uomUnitFactorTwoNameId" + i).text();
		var uomUnitFactorThreeNameId = $("#uomUnitFactorThreeNameId" + i).text();
		var uomUnitFactorFourNameId = $("#uomUnitFactorFourNameId" + i).text();
		
		var itemExpectedQtyId = $("#itemExpectedQtyId" + i).val();
		
		var itemReceivedQtyId = $("#totalReceivedQtyId" + i).val();//
		
		var itemCurrentQtyId = $("#itemReceivedQtyId" + i).val();
		var pendinQtyId = $("#pendinQtyId" + i).val();
		var batchCode = $("#batchId" + i).val();
		var batchId = $("#batchKeyId" + i).val();
		var itemExpireDateId = $("#itemExpireDateId" + i).val();
		var itemManufactureDateId = $("#itemManufactureDateId" + i).val();
		
		 if(itemExpireDateId == "NA"){
			itemExpireDateId = null;
		 }
		 
		 if(itemManufactureDateId ==""){
			 
		 }
		 else if(!itemManufactureDateId.match(regEx) && itemManufactureDateId != "NA"){
			 alert("Please Enter Proper Manufacture Date Format..!!");
			 return false;
		 }
		var itemTotalAmount = $("#itemTotalAmount" + i).val();
		var igstAmtId = $("#igstAmtId" + i).val();
		var itemUnitName = $("#uomUnitLatestFactorId" + i).text();
		//added by rohit on 23-08-2020
		var itemAssetStatus = $("#assetItemStatusId" + i).val();
		var isItemBatchWise = $("#isItemBatchWiseId" + i).val();
		var assetAmcVal = $("#assetAmcValId" + i).val();
		if(assetAmcVal == ""){
			assetAmcVal = 0;
		}
		var assetPmVal = $("#assetPmValId" + i).val();
		if(assetPmVal == ""){
			assetPmVal = 0;
		}
		var assetAmcYear = $("#assetAmcYearId" + i).val();
		if(assetAmcYear == ""){
			assetAmcYear = null;
		}
		var assetPmYear = $("#assetPmYearId" + i).val();
		if(assetPmYear == ""){
			assetPmYear = null;
		}
		var assetProductWarranty = $("#assetProductWarrantyId" + i).val();
		if(assetProductWarranty == ""){
			assetProductWarranty = null;
		}
		var assetProductWarrantyDuration = $("#assetProductWarrantyDurationId" + i).val();
		if(assetProductWarrantyDuration == ""){
			assetProductWarrantyDuration = 0;
		}
		var assetProductCategory = $("#assetProductCategory" + i).val();
		var labEquipmentItemStatus = $("#labEquipmentItemStatusId" + i).val();
		var reagentItemStatus = $("#reagentItemStatusId" + i).val();
		var itemManufactureName = $("#assetItemManufactureId" + i).val();
		var isItemSlaveUsed = $("#isItemSlaveUsed" + i).val();
		
		setItemInfoList(itemInfoDtoDetails, parseInt(itemId), parseInt(mainItemId), itemName,
			itemQuantity, parseFloat(unitPriceId), parseFloat(discountPerId), parseFloat(discountRsId),
			parseFloat(discountAmtId), parseFloat(baseAmountId), parseFloat(gstId), parseFloat(igstId), taxCodeId, hsnNameId, hsnId, parseFloat(gstAmtId),
			parseFloat(totalAmtId), factor1, factor2, factor3, factor4, uomUnitLatestFactorId, 
			uomUnitFactorOneNameId, uomUnitFactorTwoNameId, uomUnitFactorThreeNameId, uomUnitFactorFourNameId, itemExpectedQtyId,
			itemReceivedQtyId, itemCurrentQtyId, pendinQtyId, batchCode, batchId, itemExpireDateId,
			itemManufactureDateId, userId, unitId,itemUnitName,itemTotalAmount,igstAmtId,isItemBatchWise,
			itemAssetStatus,itemManufactureName, labEquipmentItemStatus,reagentItemStatus,
			assetAmcVal,assetPmVal,assetAmcYear,assetPmYear,assetProductWarranty,assetProductWarrantyDuration,assetProductCategory,isItemSlaveUsed);
	}
	
	var itemAssetMaintenanceInfoDtoDetails = {
			lstItemAssetMaintenanceDto : []
		};
		// added by rohit
		var itemAssetMaintenanceInfoMasterDtoDetails = {
			lstItemAssetMaintenanceMasterDto : []
		};
		var maintenanceTableInfo = $('#maintenanceTableInfo tbody tr.newAdded').length;
		/*
		 * if (maintenanceTableInfo == "" || maintenanceTableInfo == null ||
		 * maintenanceTableInfo == 0) { alert("Enter at least One Record In Item
		 * Info tab "); return false; }
		 */
		var rows = $('#maintenanceTableInfo tbody tr.newAdded').length;
		for ( var i = 1; i <= rows; i++) {
			var userId = $("#userId").val();
			var unitId = $("#unitId").val();
			var assetItemSlaveId = $("#assetItemSlaveId" + i).val();
			var mainItemId = $("#itemAssetId" + i).val();
			var itemName = $("#itemNameAssetId" + i).val();
			var serialNoAssetId = $("#serialNoAssetId" + i).val();

			if (serialNoAssetId == "") {
				alert("You Should Enter Serial Number For Respective Asset & Then Save It...");
				return false;
			}

			var assetManufactureNameId = $("#assetManufactureNameId" + i).val();
			var assetPartyNameId = $("#assetPartyNameId" + i).val();
			var assetPartyMasterIdId = $("#assetPartyMasterIdId" + i).val();

			var amcVal = $("#assetAmcValAssetId" + i).val();
			if(amcVal == ""){
				amcVal = 0;
			}
			var pmVal = $("#assetPmValAssetId" + i).val();
			if(pmVal == ""){
				pmVal = 0;
			}
			var amcYear = $("#assetAmcYearAssetId" + i).val();
			if(amcYear == ""){
				amcYear = null;
			}
			var pmYear = $("#assetPmYearAssetId" + i).val();
			if(pmYear == ""){
				pmYear = null;
			}
			var productWarranty = $("#assetProductWarrantyAssetId" + i).val();
			if(productWarranty == ""){
				productWarranty = null;
			}
			var productWarrantyDuration = $("#assetProductWarrantyDurationAssetId" + i).val();
			if(productWarrantyDuration == ""){
				productWarrantyDuration = 0;
			}
			var assetUnitPrice = $("#assetUnitPriceAssetId" + i).val();
			var productCategory = $("#assetProductCategoryAssetId" + i).val();
			var labEquipmentStatus = $("#assetlabEquipmentStatusAssetId" + i).val();
			var recordType = 1;
			setItemAssetMaintenanceInfoList(itemAssetMaintenanceInfoDtoDetails,
					assetItemSlaveId, serialNoAssetId, mainItemId, itemName,
					assetManufactureNameId, assetPartyNameId, assetPartyMasterIdId,
					userId, unitId, amcVal, pmVal, amcYear, pmYear,
					productWarranty, productWarrantyDuration, assetUnitPrice,productCategory, labEquipmentStatus,
					recordType);
		}

		// added by rohit
		if (isDraft != "DRAFT") {
			var rows = $('#maintenanceTableInfo tbody tr.newAdded').length;
			for ( var i = 1; i <= rows; i++) {
				var id =  $("#assetItemSlaveId" + i).val();
				var userAssetMasterId = $("#userId").val();
				var unitAssetMasterId = $("#unitId").val();
				var mainItemAssetMasterId = $("#itemAssetId" + i).val();
				var itemNameAssetMasterId = $("#itemNameAssetId" + i).val();
				var serialNoAssetMasterId = $("#serialNoAssetId" + i).val();
				var assetManufactureNameAssetMasterId = $(
						"#assetManufactureNameId" + i).val();
				var assetPartyNameAssetMasterId = $("#assetPartyNameId" + i).val();
				var assetPartyMasterIdAssetMasterId = $("#assetPartyMasterIdId" + i)
						.val();
				var productWarranty = $("#assetProductWarrantyAssetId" + i).val();
				var productCategory = $("#assetProductCategoryAssetId" + i).val();
				var labEquipmentStatus = $("#assetlabEquipmentStatusAssetId" + i)
						.val();
				var splitValue = productWarranty.split(" ");
				var productWarrantyDuration = $("#assetProductWarrantyDurationAssetId" + i).val();
				var productWarrantyTimePeriod = $("#assetProductWarrantyAssetId" + i).val();
				var assetUnitPrice = $("#assetUnitPriceAssetId" + i).val();
				var recordType = 1;
				setItemAssetMaintenanceInfoMasterList(
						itemAssetMaintenanceInfoMasterDtoDetails, id,
						userAssetMasterId, unitAssetMasterId,
						mainItemAssetMasterId, itemNameAssetMasterId,
						serialNoAssetMasterId, serialNoAssetMasterId,
						assetManufactureNameAssetMasterId,
						assetPartyNameAssetMasterId,
						assetPartyMasterIdAssetMasterId, productWarranty,
						productWarrantyDuration, productWarrantyTimePeriod,assetUnitPrice,
						productCategory, labEquipmentStatus, recordType);
			}
		}
	
	var contactInfo = $('#ContactInfoTable tbody tr.newAdded').length;
	/*if (contactInfo == "" || contactInfo == null || contactInfo == 0) {
		alert("Enter at least One Record In Contact Info tab ");
		return false;
	}*/

	// var addressInfo = $("#PartyAddressTableInfoList").html();
	var addressInfo = $('#AddressInfoTable tbody tr.newAdded').length;
	/*if (addressInfo == "" || addressInfo == null || addressInfo == 0) {
		alert("Enter at least One Record In Address Info tab ");
		return false;
	}*/

	// this is for contact details
	var partyMasterContactInfoDtoDetails = {
		partyMasterContactInfoDto: []
	};
	var rows = $('#ContactInfoTable tbody tr.newAdded').length;

	for (var i = 1; i <= rows; i++) {

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
	
	var partyMasterAddressInfoDtoDetails = {
		partyMasterAddressInfoDto: []
	};
	var rows = $('#AddressInfoTable tbody tr.newAdded').length;
	for (var i = 1; i <= rows; i++) {

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

		setAddressInfoList(partyMasterAddressInfoDtoDetails, addressInfoId,
			companyAddressType, companyNameId, companyAddressId, companyStreetId,
			companyPinId, companyAreaId, companyCityName, cityId,
			companyTalukaName, talukaId, companyDistrictName, districtId, companyStateName, 
			stateId, companyCountryName, countryId, userId, unitId);
	}
	partyMasterAddressInfoDtoDetails = JSON.stringify(partyMasterAddressInfoDtoDetails);

	//console.log(partyMasterAddressInfoDtoDetails);
	
	//console.log(partyMasterAddressInfoDtoDetails);
	//console.log(partyMasterContactInfoDtoDetails);
	console.log(itemInfoDtoDetails);
	var inputs = [];
	inputs.push("id=" + encodeURIComponent(grnId));
	inputs.push("grnDate=" + encodeURIComponent(grnDate));
	inputs.push("grnSupplierName=" + encodeURIComponent(grnSupplierName));
	inputs.push("purchaseOrder=" + encodeURIComponent(purchaseOrder));
	inputs.push("purchaseOrderNumber=" + encodeURIComponent(purchaseOrderNumber));
	inputs.push("callFrom=" + encodeURIComponent(callFrom));
	inputs.push("partyMasterId=" + encodeURIComponent(grnPartyMasterId));
	//inputs.push("file=" + encodeURIComponent(grnDocUploadInfoDtoDetails));
	inputs.push("grnSupplierState=" + encodeURIComponent(grnSupplierState));
	inputs.push("grnSupplierStateId=" + encodeURIComponent(grnSupplierStateId));
	inputs.push("grnSupplierMobile=" + encodeURIComponent(grnMobileNo));
	inputs.push("grnSeries=" + encodeURIComponent(grnSeries));
	inputs.push("grnSeriesVal=" + encodeURIComponent(grnSeriesText));
	inputs.push("grnReferenceNo=" + encodeURIComponent(grnReferenceNo));
	inputs.push("grnPurchaseInvoiceNo=" + encodeURIComponent(grnPurInvNumber));
	inputs.push("grnPurchaseInvoiceNoOne=" + encodeURIComponent(grnPurInvNumber1));
	inputs.push("grnDeliveryDate=" + encodeURIComponent(grnDeliveryDate));
	inputs.push("grnSupplierAddress=" + encodeURIComponent(grnSupplierAddress));
	inputs.push("grnStatus=" + encodeURIComponent(grnStatus));
	inputs.push("grnDeliveryChallanNumber=" + encodeURIComponent(grnDeliveryChallanNumber));
	inputs.push("grnDeliveryChallanNumberOne=" + encodeURIComponent(grnDeliveryChallanNumber1));
	inputs.push("isWithoutPoGrn=" + encodeURIComponent(isWithoutPoGrn));
	inputs.push("totalItemQuantity=" + encodeURIComponent(totalItemQuantity));
	inputs.push("totalItemDiscount=" + encodeURIComponent(totalItemDiscount));
	inputs.push("totalItemPendingQty=" + encodeURIComponent(totalPendingQty));
	inputs.push("is_pending=" + encodeURIComponent(is_pending));
	inputs.push("lessSpecialDiscount=" + encodeURIComponent(lessSpecialDiscount));
	inputs.push("lessDebitAmount=" + encodeURIComponent(lessDebitAmount));
	inputs.push("lessCDPercent1=" + encodeURIComponent(lessCDPercent1));
	inputs.push("lessCDPercent2=" + encodeURIComponent(lessCDPercent2));
	inputs.push("addOctroi=" + encodeURIComponent(addOctroi));
	inputs.push("addSurcharge=" + encodeURIComponent(addSurcharge));
	inputs.push("addCreditAmount=" + encodeURIComponent(addCreditAmount));
	inputs.push("addFreight=" + encodeURIComponent(addFreight));
	inputs.push("taxVat=" + encodeURIComponent(taxVat));
	inputs.push("taxLBT=" + encodeURIComponent(taxLBT));
	inputs.push("taxCST=" + encodeURIComponent(taxCST));
	inputs.push("taxExVat=" + encodeURIComponent(taxExVat));
	inputs.push("taxTotalTaxes=" + encodeURIComponent(taxTotalTaxes));
	inputs.push("sumofCharges=" + encodeURIComponent(sumofCharges));
	inputs.push("rermark=" + encodeURIComponent(rermark));
	inputs.push("grossAmount=" + encodeURIComponent(grossAmount));
	inputs.push("grossLessAmount=" + encodeURIComponent(grossLessAmount));
	inputs.push("grossAddAmount=" + encodeURIComponent(grossAddAmount));
	inputs.push("grossTaxes=" + encodeURIComponent(grossTaxes));
	inputs.push("grossNetAmount=" + encodeURIComponent(grossNetAmount));
	inputs.push("partyGstNo=" + encodeURIComponent(partyGstNo));
	inputs.push("itemTotalAmt=" + encodeURIComponent(itemTotalAmt));
	inputs.push("totalIgstAmount=" + encodeURIComponent(totalIgstAmount));
	inputs.push("totalgstAmount=" + encodeURIComponent(totalgstAmount));
	
	inputs.push("isDraft=" + encodeURIComponent(isDraft));
	// inputs.push("unitId=" + unitId);

	// this is for goods recceipt note item slave info
	inputs.push("goodReceiptNoteItemDtoList=" +encodeURIComponent(JSON.stringify(itemInfoDtoDetails)));

	// this is for contact Details
	inputs.push("partyMasterContactInfoDtoList=" +encodeURIComponent(partyMasterContactInfoDtoDetails));

	// this is for address info  Details
	inputs.push("partyMasterAddressInfoDtoList=" +encodeURIComponent(partyMasterAddressInfoDtoDetails));
	
	console.log("this is for test"+partyMasterAddressInfoDtoDetails);
	// this is for item asset maintenance
	inputs.push("itemAssetMaintenanceDtoList="+ encodeURIComponent(JSON.stringify(itemAssetMaintenanceInfoDtoDetails)));

	// added by rohit
	inputs.push("itemAssetMaintenanceMasterDtoList="+ encodeURIComponent(JSON.stringify(itemAssetMaintenanceInfoMasterDtoDetails)));
	
	// this is for address info
	var str = inputs.join('&');
	jQuery.ajax({
		async: true,
		type: "POST",
		enctype: 'multipart/form-data',
		data: str + "&reqType=AJAX",
		url: "ehat/invGoodReceiptNote/saveGoodReceiptNote",
		timeout: 1000 * 60 * 5,
		catche: false,
		error: function () {
			alert("error");
		},
		success: function (r) {
			if (r[0] == 1) {
				
				if (document.getElementsByName("uploadGrnDocs").length != 0 && $("#uploadGrnDocument").val() != "") {
					uploadGoodReceiptNoteDocuments(r[1],"SAVEGRN");
				}else{
					refreshGRN();
					setTimeout(function() {
				         window.location.reload();
				      }, 1000);
					$("#grnId").val(0);
					$('#uploadGrnDocument').val("");
					$('#uploadGrnComment').val("");
				}
				alertify.success("Records Saved Sucessfully"); // alert("Record
				
				//to refresh the data
				
			} else if (r[0] == 2) {
				if (document.getElementsByName("uploadGrnDocs").length != 0 && $("#uploadGrnDocument").val() != "") {
					uploadGoodReceiptNoteDocuments(r[1],"SAVEGRN");
				}else{
					$('#uploadGrnDocument').val("");
					$('#uploadGrnComment').val("");
					refreshGRN();
					setTimeout(function() {
				         window.location.reload();
				      }, 1000);
				}
				alertify.success("Record Updated successfully..!"); // alert("Record
				//to refresh the data
				
			} else if(r[0] == 0) {
				alertify.error("Oops something went wrong.....!");
				//to refresh the data
				$('#uploadGrnDocument').val("");
				$('#uploadGrnComment').val("");
				refreshGRN();
				setTimeout(function() {
			         window.location.reload();
			      }, 1000);
			}
			// getAllPartyMaster();
			//window.location.replace("inv_good_receipt_note.jsp");
		}
	});
}

function setItemInfoList(itemInfoDtoDetails, itemId, mainItemId, itemName, itemQuantity,
	unitPriceId, discountPerId, discountRsId, discountAmtId, baseAmountId,
	gstId, igstId, taxCodeId, hsnNameId, hsnId, gstAmtId, totalAmtId, factor1, factor2, factor3, factor4, 
	uomUnitLatestFactorId, uomUnitFactorOneNameId, uomUnitFactorTwoNameId, uomUnitFactorThreeNameId, uomUnitFactorFourNameId, itemExpectedQtyId,
	 itemReceivedQtyId, itemCurrentQtyId, pendinQtyId, batchCode, batchId, itemExpireDateId,
	itemManufactureDateId, userId, unitId,itemUnitName,itemTotalAmount,igstAmtId,isItemBatchWise,
	itemAssetStatus,itemManufactureName, labEquipmentItemStatus,reagentItemStatus,
	assetAmcVal,assetPmVal,assetAmcYear,assetPmYear,assetProductWarranty,assetProductWarrantyDuration,assetProductCategory,isItemSlaveUsed) {
	itemInfoDtoDetails.lstGoodReceiptNoteItemDto.push({
		id: (itemId != 'undefined' && itemId != null) ? itemId : 0,
		itemId: (mainItemId != 'undefined' && mainItemId != null) ? mainItemId : 0,
		itemName: (itemName != 'undefined' && itemName != null) ? itemName : 0,
		itemQuantity: (itemQuantity != 'undefined' && itemQuantity != null) ? itemQuantity : 0,
		itemUnitPrice: (unitPriceId != 'undefined' && unitPriceId != null) ? unitPriceId : 0,
		itemDiscountPer: (discountPerId != 'undefined' && discountPerId != null && discountPerId !='') ? discountPerId : 0,
		itemDiscountRs: (discountRsId != 'undefined' && discountRsId != null && discountRsId !='') ? discountRsId : 0,
		itemDiscountAmt: (discountAmtId != 'undefined' && discountAmtId != null && discountAmtId !='') ? discountAmtId : 0,
		itemBaseAmt: (baseAmountId != 'undefined' && baseAmountId != null && baseAmountId !='') ? baseAmountId : 0,
		itemGst: (gstId != 'undefined' && gstId != null) ? gstId : 0,
		hsnName: (hsnId != 'undefined' && hsnId != null) ? hsnId : 0,
		hsnNameValue: (hsnNameId != 'undefined' && hsnNameId != null) ? hsnNameId : 0,
		taxCode: (taxCodeId != 'undefined' && taxCodeId != null && taxCodeId !="null") ? taxCodeId : 0,
		itemIgst: (igstId != 'undefined' && igstId != null) ? igstId : 0,
		itemGstAmt: (gstAmtId != 'undefined' && gstAmtId != null) ? gstAmtId : 0,
		itemTotalAmt: (totalAmtId != 'undefined' && totalAmtId != null) ? totalAmtId : 0,
		itemFactor1: (factor1 != 'undefined' && factor1 != null && factor1!="null") ? factor1 : 0,
		itemFactor2: (factor2 != 'undefined' && factor2 != null && factor2!="null") ? factor2 : 0,
		itemFactor3: (factor3 != 'undefined' && factor3 != null && factor3!="null") ? factor3 : 0,
		itemFactor4: (factor4 != 'undefined' && factor4 != null && factor4!="null") ? factor4 : 0,
		uomUnitLatestFactorName: uomUnitLatestFactorId , 
		uomUnitFactorOneName: uomUnitFactorOneNameId , 
		uomUnitFactorTwoName: uomUnitFactorTwoNameId , 
		uomUnitFactorThreeName: uomUnitFactorThreeNameId, 
		uomUnitFactorFourName: uomUnitFactorFourNameId ,
		itemExpectedQty: (itemExpectedQtyId != 'undefined' && itemExpectedQtyId != null) ? itemExpectedQtyId : 0,
		itemReceivedQty: (itemReceivedQtyId != 'undefined' && itemReceivedQtyId != null) ? itemReceivedQtyId : 0,
		currentItemQty:	(itemCurrentQtyId != 'undefined' && itemCurrentQtyId != null) ? itemCurrentQtyId : 0,
		itemPendingQty: (pendinQtyId != 'undefined' && pendinQtyId != null) ? pendinQtyId : 0,
		itemBatchNo: (batchCode != 'undefined' && batchCode != null) ? batchCode : 0,
		batchId: (batchId != 'undefined' && batchId != null) ? batchId : 0,		
		itemManufactureDate: (itemManufactureDateId != 'undefined' && itemManufactureDateId != null) ? itemManufactureDateId : 0,
		itemExpireDate: (itemExpireDateId != 'undefined' && itemExpireDateId != null) ? itemExpireDateId : 0,
		createdBy: (userId != 'undefined' && userId != null) ? userId : 0,
		unitId: (unitId != 'undefined' && unitId != null) ? unitId : 0,
		updatedBy: (userId != 'undefined' && userId != null) ? userId : 0,
		itemUnitName:itemUnitName,
		itemBaseIgstGstAmt:itemTotalAmount,
		igstAmount:igstAmtId,
		isItemBatchWise : (isItemBatchWise != 'undefined' && isItemBatchWise != null && isItemBatchWise !=undefined && isItemBatchWise !="null" ) ? isItemBatchWise : "NA",
		itemAssetStatus : (itemAssetStatus != 'undefined' && itemAssetStatus != null && itemAssetStatus != '' && itemAssetStatus !=undefined && itemAssetStatus !="null" ) ? itemAssetStatus : 0,
		itemManufactureName : (itemManufactureName != 'undefined' && itemManufactureName != null && itemManufactureName!=undefined && itemManufactureName !="null") ? itemManufactureName : 'NA',
		itemLabEquipmentStatus : (labEquipmentItemStatus != 'undefined' && labEquipmentItemStatus != null && labEquipmentItemStatus != '' && labEquipmentItemStatus !='null') ? labEquipmentItemStatus : 0,
		itemReagentStatus : (reagentItemStatus != 'undefined' && reagentItemStatus != null && reagentItemStatus != '' && reagentItemStatus !='null') ? reagentItemStatus : 0,
		amcVal : (assetAmcVal != 'undefined' && assetAmcVal != null && assetAmcVal !='null') ? assetAmcVal : 0,
		pmVal : (assetPmVal != 'undefined' && assetPmVal != null && assetPmVal !='null') ? assetPmVal : 0,
		amcYear : (assetAmcYear != 'undefined' && assetAmcYear != null && assetAmcYear !='null') ? assetAmcYear : 'NA',
		pmYear : (assetPmYear != 'undefined' && assetPmYear != null && assetPmYear !='null') ? assetPmYear: 'NA',
		productWarranty : (assetProductWarranty != 'undefined' && assetProductWarranty != null && assetProductWarranty !='null') ? assetProductWarranty : 'NA',
		productWarrantyDuration : (assetProductWarrantyDuration != 'undefined' && assetProductWarrantyDuration != null && assetProductWarrantyDuration !='null') ? assetProductWarrantyDuration : 0,
		productCategory : (assetProductCategory != 'undefined' && assetProductCategory != null && assetProductCategory !='null') ? assetProductCategory : 'NA',
		isItemSlaveUsed:(isItemSlaveUsed != 'undefined' && isItemSlaveUsed != null && isItemSlaveUsed !='null' && isItemSlaveUsed !="") ? isItemSlaveUsed : 'N'
	});
}

/**
 * @author rohit sandbhor
 * @since 23-08-2020
 * @param itemAssetMaintenanceInfoDtoDetails
 * @param assetItemSlaveId
 * @param serialNoAssetId
 * @param mainItemId
 * @param itemName
 * @param assetManufactureNameId
 * @param assetPartyNameId
 * @param assetPartyMasterIdId
 * @param userId
 * @param unitId
 * @param amcVal
 * @param pmVal
 * @param amcYear
 * @param pmYear
 * @param productWarranty
 * @param productCategory
 * @param labEquipmentStatus
 * @param recordType
 */
function setItemAssetMaintenanceInfoList(itemAssetMaintenanceInfoDtoDetails, assetItemSlaveId, serialNoAssetId, mainItemId, itemName, assetManufactureNameId, assetPartyNameId, assetPartyMasterIdId, userId, unitId, amcVal, pmVal, amcYear, pmYear, productWarranty,productWarrantyDuration, assetUnitPrice,productCategory, labEquipmentStatus, recordType) {
	itemAssetMaintenanceInfoDtoDetails.lstItemAssetMaintenanceDto.push({
		id: (assetItemSlaveId != 'undefined' && assetItemSlaveId != null) ? assetItemSlaveId : 0,
		serialNo: (serialNoAssetId != 'undefined' && serialNoAssetId != null) ? serialNoAssetId : 0,
		assetItemId: (mainItemId != 'undefined' && mainItemId != null) ? mainItemId : 0,
		assetItemName: (itemName != 'undefined' && itemName != null) ? itemName : null,
		manufactureName: (assetManufactureNameId != 'undefined' && assetManufactureNameId != null) ? assetManufactureNameId : null,
		partyName: (assetPartyNameId != 'undefined' && assetPartyNameId != null) ? assetPartyNameId : null,
		partyMasterId: (assetPartyMasterIdId != 'undefined' && assetPartyMasterIdId != null) ? assetPartyMasterIdId : 0,
		userId: (userId != 'undefined' && userId != null) ? userId : 0,
		unitId: (unitId != 'undefined' && unitId != null) ? unitId : 0,
		amcVal: (amcVal != 'undefined' && amcVal != null) ? amcVal : 0,
		pmVal: (pmVal != 'undefined' && pmVal != null) ? pmVal : 0,
		amcYear: (amcYear != 'undefined' && amcYear != null) ? amcYear : null,
		pmYear: (pmYear != 'undefined' && pmYear != null) ? pmYear : null,
		productWarranty: (productWarranty != 'undefined' && productWarranty != null) ? productWarranty : null,
		productWarrantyDuration: (productWarrantyDuration != 'undefined' && productWarrantyDuration != null && productWarrantyDuration !="" && productWarrantyDuration != "null") ? productWarrantyDuration : 0,
		assetUnitPrice: (assetUnitPrice != 'undefined' && assetUnitPrice != null && assetUnitPrice!="" ) ? parseInt(assetUnitPrice) : 0,
		productCategory: (productCategory != 'undefined' && productCategory != null && productCategory!="") ? productCategory : null,
		assetType: (labEquipmentStatus != 'undefined' && labEquipmentStatus != null && labEquipmentStatus !="") ? labEquipmentStatus : null,
		recordType: (recordType != 'undefined' && recordType != null) ? recordType : null
	});
}
/**
 * @author rohit
 * @since 21-07-2020
 * @comment this is for asset maintenance master
 * @param itemAssetMaintenanceInfoMasterDtoDetails
 * @param userAssetMasterId
 * @param unitAssetMasterId
 * @param mainItemAssetMasterId
 * @param itemNameAssetMasterId
 * @param serialNoAssetMasterId
 * @param serialNoAssetMasterId
 * @param assetManufactureNameAssetMasterId
 * @param assetPartyNameAssetMasterId
 * @param assetPartyMasterIdAssetMasterId
 * @param productWarranty
 * @param productWarrantyDuration
 * @param productWarrantyTimePeriod
 */
function setItemAssetMaintenanceInfoMasterList(itemAssetMaintenanceInfoMasterDtoDetails, id, userAssetMasterId, unitAssetMasterId, mainItemAssetMasterId, itemNameAssetMasterId, serialNoAssetMasterId, serialNoAssetMasterId, assetManufactureNameAssetMasterId, assetPartyNameAssetMasterId, assetPartyMasterIdAssetMasterId, productWarranty, productWarrantyDuration, productWarrantyTimePeriod,assetUnitPrice, productCategory, labEquipmentStatus, recordType) {
	itemAssetMaintenanceInfoMasterDtoDetails.lstItemAssetMaintenanceMasterDto.push({
		id: (id != 'undefined' && id != null && id != "") ? id : 0,
		serialNo: (serialNoAssetMasterId != 'undefined' && serialNoAssetMasterId != null) ? serialNoAssetMasterId : 0,
		assetItemId: (mainItemAssetMasterId != 'undefined' && mainItemAssetMasterId != null) ? mainItemAssetMasterId : 0,
		assetItemName: (itemNameAssetMasterId != 'undefined' && itemNameAssetMasterId != null) ? itemNameAssetMasterId : null,
		manufactureName: (assetManufactureNameAssetMasterId != 'undefined' && assetManufactureNameAssetMasterId != null) ? assetManufactureNameAssetMasterId : null,
		partyName: (assetPartyNameAssetMasterId != 'undefined' && assetPartyNameAssetMasterId != null) ? assetPartyNameAssetMasterId : null,
		partyMasterId: (assetPartyMasterIdAssetMasterId != 'undefined' && assetPartyMasterIdAssetMasterId != null) ? assetPartyMasterIdAssetMasterId : 0,
		productWarrantyDuration: (productWarrantyDuration != 'undefined' && productWarrantyDuration != null && productWarrantyDuration != "" && productWarrantyDuration != "null") ? productWarrantyDuration : 0,
		productWarrantyTimePeriod: (productWarrantyTimePeriod != 'undefined' && productWarrantyTimePeriod != null) ? productWarrantyTimePeriod : 0,
		assetUnitPrice: (assetUnitPrice != 'undefined' && assetUnitPrice != null && assetUnitPrice !="") ? parseInt(assetUnitPrice) : 0,
		productCategory: (productCategory != 'undefined' && productCategory != null && productCategory!="") ? productCategory : 0,
		userId: (userAssetMasterId != 'undefined' && userAssetMasterId != null && productCategory !="") ? userAssetMasterId : 0,
		unitId: (unitAssetMasterId != 'undefined' && unitAssetMasterId != null && unitAssetMasterId !="") ? unitAssetMasterId : 0,
		assetType: (labEquipmentStatus != 'undefined' && labEquipmentStatus != null && labEquipmentStatus != "") ? labEquipmentStatus : null,
		recordType: (recordType != 'undefined' && recordType != null) ? recordType : null
	});
}

function setContactInfoList(partyMasterContactInfoDtoDetails, contactPersonId,
	contactDesignationId, contatcAddressId, contactGenderId, contactDobId,
	contactPhoneOneId, contactPhoneSecondId, contactMailId, contactInfoId,
	userId, unitId) {
	partyMasterContactInfoDtoDetails.partyMasterContactInfoDto.push({
		id: contactInfoId,
		contactName: contactPersonId,
		contactDesignation: contactDesignationId,
		contactAddress: contatcAddressId,
		contactGender: contactGenderId,
		contactDob: contactDobId,
		contactPhoneNumber1: contactPhoneOneId,
		contactPhoneNumber2: contactPhoneSecondId,
		contactEmail: contactMailId,
		createdBy: userId,
		unitId: unitId,
		updatedBy: userId,
	});
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

function setUploadDocumentInfoList(grnDocUploadInfoDtoDetails, documentInfoId,
		documentNameId, documentNoteId, userId, unitId,grnId, file) {

	grnDocUploadInfoDtoDetails.lstGoodReceiptNoteDocUploadDto.push({
		/*id: documentInfoId,
		imageName: documentNameId,
		note: documentNoteId,
		createdBy: userId,
		unitId: unitId,
		updatedBy: userId,*/
		//grnId:grnId,
		file:file

	});
}


// this is all aboout reset general info field
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

function resetAllField() {
	$('#partyMaterFormId')[0].reset();
	$('#generalFormId')[0].reset();
	$('#contactFormId')[0].reset();
	$('#addressFormId')[0].reset();
	$("#PartyGeneralTableInfoList").empty();
	$("#PartyContactTableInfoList").empty();
	$("#PartyAddressTableInfoList").empty();
};

// this is get all details of Good Receipt Note details

function getAllGoodReceiptNote(call) {
	
	$('#callFrom').val(call);
	var inputs = [];
	inputs.push('call=' + call);
	var str = inputs.join('&');
	jQuery.ajax({
		async: true,
		type: "GET",
		url: "ehat/invGoodReceiptNote/getAllGoodReceiptNote",
		data : str + "&reqType=AJAX",
		timeout: 1000 * 60 * 5,
		catche: false,
		error: function () {
			alert("error");
		},
		success: function (r) {
			if(call=="DRAFT"){
				goodReceiptNoteTemplateForDraft(r,"allGoodReceiptNote", call);
			}else if(call == "PENDING"){
				goodReceiptNoteTemplate(r, "allGoodReceiptNote", call);
			}else{
				goodReceiptNoteTemplate(r, "allGoodReceiptNote","noPending");
			}
			setTimeout(function () {
				userAccess();
			}, 100);
		}
	});
}

function goodReceiptNoteTemplate(response, callFrom,call) {
	var htm = "";
	var index = 1;
	 $("#goodRecepitPrint").show();
	if (callFrom === "allGoodReceiptNote") {
		for (var i = 0; i < response.lstGoodReceiptNoteDto.length; i++) {
			htm = htm +
				'<tr> ' +
				' <td class="col-md-1 center">' +
				index +
				'</td>' +
				' <td class="col-md-1 center">' +
				response.lstGoodReceiptNoteDto[i].id +
				'</td>' +
				
				' <td class="col-md-1 center">' +
				response.lstGoodReceiptNoteDto[i].grnSupplierName +
				'</td>' +
				' <td class="col-md-1 center">' +
				getDateWithTime(response.lstGoodReceiptNoteDto[i].createdDate) +
				'</td>'; 
			if(call != "noPending"){
				 $("#goodRecepitEdit").show();
				if(response.lstGoodReceiptNoteDto[i].isPending == "Y"){
					htm = htm + ' <td class="col-md-1 center">' +
					'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=editGoodReceiptNote(' +
					response.lstGoodReceiptNoteDto[i].id +
					',\'PENDING\')><i class="fa fa fa-edit"></i></button></td>';
				}else{
					htm = htm +	' <td class="col-md-1 center">' +
					'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=editGoodReceiptNote(' +
					response.lstGoodReceiptNoteDto[i].id +
					',\'nodraft\')><i class="fa fa fa-edit"></i></button></td>' ;	
				}
			}else{
				 $("#goodRecepitEdit").hide();
			}
				if(call == "PENDING"){
					htm = htm + ' <td class="col-md-1 center">' +
					'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=viewGoodReceiptNote(' +
					response.lstGoodReceiptNoteDto[i].id +
					',\'PENDING\')><i class="fa fa-eye View"></i></button></td>';
				}else{
				htm = htm + ' <td class="col-md-1 center">' +
				'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=viewGoodReceiptNote(' +
				response.lstGoodReceiptNoteDto[i].id +
				',\'nodraft\')><i class="fa fa-eye View"></i></button></td>';
				}
				if(call != "PENDING"){
				htm = htm +	' <td class="col-md-1 center">' +
				'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=printGoodsReceiptNote(' +
				response.lstGoodReceiptNoteDto[i].id +
				',\'nodraft\')><i class="fa fa-print"></i></button></td>';
				$("#goodRecepitPrint").show();
				}else{
					$("#goodRecepitPrint").hide();
				}
				htm = htm + '</tr>';
			index++;
			
			var numberOfRows="";
			var index1=1;
			var count=response.noOfPages;
			var numberOfPages=(count/10);
			var displayPagination=numberOfPages;	
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
				displayPagination=5;
			}
			for(var j=0;j<displayPagination;j++){
				numberOfRows +="<li onclick='paginationGRNMaster("+index1+");'><a>"+index1+"</a></li>";
				index1=index1+1;
			}
			if(numberOfPages>6){
				numberOfRows +="<li class='next' onclick='nextPaginationGrnMaster("+index1+","+Math.round(numberOfPages)+");'><a class='page-link' href='#'>Next</a></li>";
			}
			$('#totalNumberOfPagesGRN').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
			$('#grnRecordPagination').html(numberOfRows);
		}
		
	} else if (callFrom === "searchGoodReceiptNote") {
		htm = htm +
			'<tr> ' +
			' <td class="col-md-1 center">' +
			index +
			'</td>' +
			' <td class="col-md-1 center">' +
			response.id +
			'</td>' +
			' <td class="col-md-1 center">' +
			response.grnSupplierName +
			'</td>' +
			
			' <td class="col-md-1 center">' +
			getDateWithTime(response.createdDate) +
			'</td>' ;
		if(call != "noPending"){
			$("#goodRecepitEdit").show();
			if(response.isPending == "Y"){
				htm = htm +	' <td class="col-md-1 center">' +
				'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=editGoodReceiptNote(' +
				response.id +
				',\'PENDING\')><i class="fa fa fa-edit"></i></button></td>';
			}else{
				htm = htm +	' <td class="col-md-1 center">' +
				'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=editGoodReceiptNote(' +
				response.id +
				',\'nodraft\')><i class="fa fa fa-edit"></i></button></td>';
			}
		}else{
			$("#goodRecepitEdit").hide();
		}
			if(call == "PENDING"){
			htm = htm + ' <td class="col-md-1 center">' +
			'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=viewGoodReceiptNote(' +
			response.id +
			',\'PENDING\')><i class="fa fa-eye View"></i></button></td>';
			}else if(call == "DRAFT"){
			htm = htm + ' <td class="col-md-1 center">' +
			'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=viewGoodReceiptNote(' +
			response.id +
			',\'DRAFT\')><i class="fa fa-eye View"></i></button></td>';
			}else{
			htm = htm + ' <td class="col-md-1 center">' +
			'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=viewGoodReceiptNote(' +
			response.id +
			',\'nodraft\')><i class="fa fa-eye View"></i></button></td>';
			}
			if(call != "PENDING"){
				htm = htm +	' <td class="col-md-1 center">' +
				'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick=printGoodsReceiptNote(' +
				response.id + ')><i class="fa fa-print"></i></button></td>';
				$("#goodRecepitPrint").show();
			}else{
				$("#goodRecepitPrint").hide();
			}
			htm = htm +	'</tr>';

	}
	$("#goodReceiptNoteList").html(htm);
}



function goodReceiptNoteTemplateForDraft(response, callFrom, call) {
	var htm = "";
	var index = 1;
	 $("#goodRecepitEdit").show();
	$("#goodRecepitPrint").hide();
			if(callFrom === "allGoodReceiptNote" ){
				for (var i = 0; i < response.lstGoodReceiptNoteDto.length; i++) {
					htm = htm +
						'<tr> ' +
						' <td class="col-md-1 center">' +
						index +
						'</td>' +
						' <td class="col-md-1 center">' +
						response.lstGoodReceiptNoteDto[i].id +
						'</td>' +
						
						' <td class="col-md-1 center">' +
						response.lstGoodReceiptNoteDto[i].grnSupplierName +
						'</td>' +
						
		
						' <td class="col-md-1 center">' +
						getDateWithTime(response.lstGoodReceiptNoteDto[i].createdDate) +
						'</td>' +
						
						' <td class="col-md-1 center">' +
						'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=editGoodReceiptNote(' +
						response.lstGoodReceiptNoteDto[i].id +
						',\'draft\')><i class="fa fa fa-edit"></i></button></td>';
						if(call == "DRAFT"){
						htm = htm +' <td class="col-md-1 center">' +
						'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=viewGoodReceiptNote(' +
						response.lstGoodReceiptNoteDto[i].id +
						',\'draft\')><i class="fa fa-eye View"></i></button></td>';
						}else if(call == "PENDING"){
						htm = htm + ' <td class="col-md-1 center">' +
						'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=viewGoodReceiptNote(' +
						response.lstGoodReceiptNoteDto[i].id +
						',\'PENDING\')><i class="fa fa-eye View"></i></button></td>';
						}else{
							htm = htm +' <td class="col-md-1 center">' +
							'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=viewGoodReceiptNote(' +
							response.lstGoodReceiptNoteDto[i].id +
							',\'nodraft\')><i class="fa fa-eye View"></i></button></td>';
						}
						
					htm = htm  + '</tr>';
					index++;
				}
			}else if (callFrom === "searchGoodReceiptNote") {
				htm = htm +
				'<tr> ' +
				' <td class="col-md-1 center">' +
				index +
				'</td>' +
				' <td class="col-md-1 center">' +
				response.id +
				'</td>' +
				
				' <td class="col-md-1 center">' +
				response.grnSupplierName +
				'</td>' +

				' <td class="col-md-1 center">' +
				getDateWithTime(response.createdDate) +
				'</td>' +
				
				' <td class="col-md-1 center">' +
				'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=editGoodReceiptNote(' +
				response.id +
				',\'draft\')><i class="fa fa fa-edit"></i></button></td>';
				if(call == "DRAFT"){
				htm = htm +' <td class="col-md-1 center">' +
				'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=viewGoodReceiptNote(' +
				response.id +
				',\'draft\')><i class="fa fa-eye View"></i></button></td>';
				}else if(call == "PENDING"){
				htm = htm + ' <td class="col-md-1 center">' +
				'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=viewGoodReceiptNote(' +
				response.id +
				',\'PENDING\')><i class="fa fa-eye View"></i></button></td>';
				}else{
					htm = htm +' <td class="col-md-1 center">' +
					'	<button class="btn btn-xs btn-success editBodyPartMaster editUserAccess" data-toggle="modal" data-target="#goodReceiptNoteModal" onclick=viewGoodReceiptNote(' +
					response.id +
					',\'nodraft\')><i class="fa fa-eye View"></i></button></td>';
				}
				
			htm = htm  + '</tr>';
		
		}
		$("#goodReceiptNoteList").html(htm);
	}

function editGoodReceiptNote(grnId,call) {
	document.getElementById("grnDocumentUploadDivId").style.display = "block";
	document.getElementById("grnCallType").value = call;
	var inputs = [];
	inputs.push('id=' + grnId);
	inputs.push('call=' + call);
	var str = inputs.join('&');
	jQuery.ajax({
		async: true,
		type: "GET",
		url: "ehat/invGoodReceiptNote/editGoodReceiptNote",
		data: str + "&reqType=AJAX",
		error: function () {
			alert('error');
		},
		success: function (response) {
			$("#txtgrnId").val(response.id);
			$("#grnId").val(response.id);
			$("#grnSupplierName").val(response.grnSupplierName);
			$("#grnMobileNo").val(response.grnSupplierMobile);
			$("#grnSeries").val(response.grnSeriesVal);
			$("#hiddenSupplierNameId").val(response.partyMasterDto.id);
			getGoodReceiptNoteSeries();
			$("#selectGrnDoc option:selected").val(response.grnSeries);
			$("#grnDate").val(response.grnDate);
			setParyMasterStateToGrn(response.partyMasterDto);
			$('#grnSupplierState').select2('val', response.grnSupplierStateId);
			$("#hiddenVenderState").val(response.grnSupplierStateId);
			$("#grnReferenceNo").val(response.grnReferenceNo);
			$("#grnPurInvNumber").val(response.grnPurchaseInvoiceNo);
			$("#grnPurInvNumber1").val(response.grnPurchaseInvoiceNoOne);
			$("#grnDeliveryDate").val(response.grnDeliveryDate);
			$("#grnSupplierAddress").val(response.grnSupplierAddress);
			$("select#grnStatus").val(response.grnStatus);
			$("#grnDeliveryChallanNumber").val(response.grnDeliveryChallanNumber);
			$("#grnDeliveryChallanNumber1").val(response.grnDeliveryChallanNumberOne);
			$("#totalItemQty").val(response.totalItemQuantity);
			$("#totalItemDiscount").val(response.totalItemDiscount);
			$("#totalPendingQty").val(response.totalItemPendingQty);
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
			$("#txtGRNArermark").val(response.rermark);;
			$("#txtGross").val(response.grossAmount);
			$("#txtLess").val(response.grossLessAmount);
			$("#txtAdd").val(response.grossAddAmount);
			$("#grossTaxesId").val(response.grossTaxes);
			$("#txtNetAmt").val(response.grossNetAmount);
			$("#itemTotalAmt").val(response.itemTotalAmt);
			$("#grnPurchaseOrder option:selected").val(response.purchaseOrderNumber);
			$("#grnPurchaseOrder option:selected").text(response.purchaseOrder);
			if (response.isWithoutPoGrn == "Y") {
				$("#withoughtPoGrnId").prop("checked", true);
				var $radios = $('input:checkbox[name=withoughtPoGrnId]');
				if ($radios.is(':checked') == true) {
					$('#grnPurchaseOrderId').hide();
					$('#checkForGRN').hide();
					$('#btnAddNew').show();
					$('#grnPartial').css('display', 'none');
					$('#purchaseOrderCheck').hide();
				}
				if ($radios.is(':checked') == false) {
					$('#grnPurchaseOrderId').show();
					$('#checkForGRN').show();
					//$('#btnAddNew').hide();
					$('#grnPartial').css('display', 'block');
					$('#purchaseOrderCheck').show();
				}
			}
			if(call=="draft"){
				$("#hideGrnAddButton").show();
				$('#saveGrn').show();
				$('#draftGrn').show();
				$('#grnMobileNo').prop('disabled', false);
				setEditGoodReceiptNoteSlaveInfo(response, "goodReceiptNote","DRAFT");
				removeDisabledAllGrnComplete();
			}else if(call == "PENDING"){
				$("#hideGrnAddButton").hide();
				$('#saveGrn').show();
				$('#draftGrn').hide();
				setEditGoodReceiptNoteSlaveInfo(response, "goodReceiptNote","PENDING");
			} else{
				$("#hideGrnAddButton").show();
				$('#saveGrn').hide();
				$('#draftGrn').hide();
				disabledAllGrnComplete();
				setEditGoodReceiptNoteSlaveInfo(response, "goodReceiptNote","NODRAFT");
			}
		}
	});
}

function viewGoodReceiptNote(grnId,call){
	var inputs = [];
	inputs.push('id=' + grnId);
	inputs.push('call=' + call);
	var str = inputs.join('&');
	jQuery.ajax({
		async: true,
		type: "GET",
		url: "ehat/invGoodReceiptNote/editGoodReceiptNote",
		data: str + "&reqType=AJAX",
		error: function () {
			alert('error');
		},
		success: function (response) {
			$("#txtgrnId").val(response.id);
			$("#grnId").val(response.id);
			$("#grnSupplierName").val(response.grnSupplierName);
			$("#grnMobileNo").val(response.grnSupplierMobile);
			$("#grnSeries").val(response.grnSeriesVal);
			$("#hiddenSupplierNameId").val(response.partyMasterDto.id);
			getGoodReceiptNoteSeries();
			$("#selectGrnDoc option:selected").val(response.grnSeries);
			$("#grnDate").val(response.grnDate);
			setParyMasterStateToGrn(response.partyMasterDto);
			$('#grnSupplierState').select2('val', response.grnSupplierStateId);
			$("#grnReferenceNo").val(response.grnReferenceNo);
			$("#grnPurInvNumber").val(response.grnPurchaseInvoiceNo);
			$("#grnPurInvNumber1").val(response.grnPurchaseInvoiceNoOne);
			$("#grnDeliveryDate").val(response.grnDeliveryDate);
			$("#grnSupplierAddress").val(response.grnSupplierAddress);
			$("select#grnStatus").val(response.grnStatus);
			$("#grnDeliveryChallanNumber").val(response.grnDeliveryChallanNumber);
			$("#grnDeliveryChallanNumber1").val(response.grnDeliveryChallanNumberOne);
			$("#totalItemQty").val(response.totalItemQuantity);
			$("#totalItemDiscount").val(response.totalItemDiscount);
			$("#totalPendingQty").val(response.totalItemPendingQty);
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
			$("#txtGRNArermark").val(response.rermark);;
			$("#txtGross").val(response.grossAmount);
			$("#txtLess").val(response.grossLessAmount);
			$("#txtAdd").val(response.grossAddAmount);
			$("#grossTaxesId").val(response.grossTaxes);
			$("#txtNetAmt").val(response.grossNetAmount);
			$("#itemTotalAmt").val(response.itemTotalAmt);
			
			if (response.isWithoutPoGrn == "Y") {
				$("#withoughtPoGrnId").prop("checked", true);
				var $radios = $('input:checkbox[name=withoughtPoGrnId]');
				if ($radios.is(':checked') == true) {
					$('#grnPurchaseOrderId').hide();
					$('#checkForGRN').hide();
					$('#btnAddNew').show();
					$('#grnPartial').css('display', 'none');
					$('#purchaseOrderCheck').hide();
				}
				if ($radios.is(':checked') == false) {
					$('#grnPurchaseOrderId').show();
					$('#checkForGRN').show();
					$('#btnAddNew').hide();
					$('#grnPartial').css('display', 'block');
					$('#purchaseOrderCheck').show();
				}
			}else{
				var option = "";
				option = option + "<option selected value=" + response.purchaseOrderNumber + ">" + response.purchaseOrder +
					"</option>";
				$("#grnPurchaseOrder").append(option);
				$("#grnPurchaseOrder").attr('disabled', true);
			}
			$('#saveGrn').hide();
			$('#draftGrn').hide();
			
			disabledAllGrnComplete();
			setViewGoodReceiptNoteSlaveInfo(response, "goodReceiptNote",call);
		}
	});
}

function disabledAllGrnComplete() {

	$('#grnDate').prop('disabled', 'disabled');
	$('#grnSupplierName').prop('disabled', 'disabled');
	$('#grnSupplierState').prop('disabled', 'disabled');
	$('#grnMobileNo').prop('disabled', 'disabled');
	$('#selectGrnDoc').prop('disabled', 'disabled');
	$('#grnSeries').prop('disabled', 'disabled');
	$('#grnReferenceNo').prop('disabled', 'disabled');
	$('#grnPurInvNumber').prop('disabled', 'disabled');
	$('#grnPurInvNumber1').prop('disabled', 'disabled');
	$('#grnDeliveryDate').prop('disabled', 'disabled');
	$('#grnSupplierAddress').prop('disabled', 'disabled');
	$('#grnStatus').prop('disabled', 'disabled');
	$('#grnDeliveryChallanNumber').prop('disabled', 'disabled');
	$('#grnDeliveryChallanNumber1').prop('disabled', 'disabled');
	$('#withoughtPoGrnId').prop('disabled', 'disabled');
	$('#totalItemQty').prop('disabled', 'disabled');
	$('#totalItemDiscount').prop('disabled', 'disabled');
	$('#totalPendingQty').prop('disabled', 'disabled');

	// this is all about disabled contact info

	$('#contactPerson').prop('disabled', 'disabled');
	$('#contactDesignation').prop('disabled', 'disabled');
	$('#contactPhoneOne').prop('disabled', 'disabled');
	$('#contactPhoneSecond').prop('disabled', 'disabled');
	$('#contactGender').prop('disabled', 'disabled');
	$('#contactDateofbirth').prop('disabled', 'disabled');
	$('#contactMail').prop('disabled', 'disabled');
	$('#contatcAddress').prop('disabled', 'disabled');

	// this is all ablout disablesd address info 
	$('#companyNameFromAddress').prop('disabled', 'disabled');
	$('#areaFromAddress').prop('disabled', 'disabled');
	$('#stateFromAddress').prop('disabled', 'disabled');
	$('#countryFromAddress').prop('disabled', 'disabled');
	$('#districtFromAddress').prop('disabled', 'disabled');
	$('#talukaFromAddress').prop('disabled', 'disabled');
	$('#cityFromAddress').prop('disabled', 'disabled');
	$('#streetFromAddress').prop('disabled', 'disabled');
	$('#pincodeFromAddress').prop('disabled', 'disabled');
	$('#addressFromAddress').prop('disabled', 'disabled');

	$('#txtSplDisc').prop('disabled', 'disabled');
	$('#txtdebitAmt1').prop('disabled', 'disabled');
	$('#txtCDAmt').prop('disabled', 'disabled');
	$('#txtCD1').prop('disabled', 'disabled');
	$('#txtOctroi').prop('disabled', 'disabled');
	$('#txtSurcharge').prop('disabled', 'disabled');
	$('#txtCreditAmt').prop('disabled', 'disabled');
	$('#txtFreight').prop('disabled', 'disabled');
	$('#txtVat').prop('disabled', 'disabled');
	$('#txtlbt').prop('disabled', 'disabled');
	$('#txtcst').prop('disabled', 'disabled');
	$('#txtExVat').prop('disabled', 'disabled');
	$('#txtTotalVat').prop('disabled', 'disabled');
	$('#selboxChargeswithAmtList').prop('disabled', 'disabled');
	$('#txtGRNArermark').prop('disabled', 'disabled');
	$('#hideGrnAddButton').hide();
	//$('#saveGrn').hide();
	//('#draftGrn').hide();
	
	// this is all about disabled upload Document
	$('#uploadGrnDocument').prop('disabled', 'disabled');
	$('#uploadGrnComment').prop('disabled', 'disabled');
	$('#grnDocumentUploadDivId').prop('disabled', 'disabled');
}

function removeDisabledAllGrnComplete() {

	$('#grnDate').removeAttr('disabled');
	$('#grnSupplierName').removeAttr('disabled');
	$('#grnSupplierState').removeAttr('disabled');
	$('#grnMobileNo').removeAttr('disabled');
	$('#selectGrnDoc').removeAttr('disabled');
	$('#grnSeries').removeAttr('disabled');
	$('#grnReferenceNo').removeAttr('disabled');
	$('#grnPurInvNumber').removeAttr('disabled');
	$('#grnPurInvNumber1').removeAttr('disabled');
	$('#grnDeliveryDate').removeAttr('disabled');
	$('#grnSupplierAddress').removeAttr('disabled');
	$('#grnStatus').removeAttr('disabled');
	$('#grnDeliveryChallanNumber').removeAttr('disabled');
	$('#grnDeliveryChallanNumber1').removeAttr('disabled');
	$('#withoughtPoGrnId').removeAttr('disabled');
	/* $('#totalItemQty').removeAttr('disabled');
	 $('#totalItemDiscount').removeAttr('disabled');
	 $('#totalPendingQty').removeAttr('disabled');*/
	$('#totalItemQty').prop('disabled', 'disabled');
	$('#totalItemDiscount').prop('disabled', 'disabled');
	$('#totalPendingQty').prop('disabled', 'disabled');
	// this is all about disabled contact info

	$('#contactPerson').removeAttr('disabled');
	$('#contactDesignation').removeAttr('disabled');
	$('#contactPhoneOne').removeAttr('disabled');
	$('#contactPhoneSecond').removeAttr('disabled');
	$('#contactGender').removeAttr('disabled');
	$('#contactDateofbirth').removeAttr('disabled');
	$('#contactMail').removeAttr('disabled');
	$('#contatcAddress').removeAttr('disabled');

	// this is all ablout disablesd address info 
	$('#companyNameFromAddress').removeAttr('disabled');
	$('#areaFromAddress').removeAttr('disabled');
	$('#stateFromAddress').removeAttr('disabled');
	$('#countryFromAddress').removeAttr('disabled');
	$('#districtFromAddress').removeAttr('disabled');
	$('#talukaFromAddress').removeAttr('disabled');
	$('#cityFromAddress').removeAttr('disabled');
	$('#streetFromAddress').removeAttr('disabled');
	$('#pincodeFromAddress').removeAttr('disabled');
	$('#addressFromAddress').removeAttr('disabled');

	$('#txtSplDisc').removeAttr('disabled');
	$('#txtdebitAmt1').removeAttr('disabled');
	$('#txtCDAmt').removeAttr('disabled');
	$('#txtCD1').removeAttr('disabled');
	$('#txtOctroi').removeAttr('disabled');
	$('#txtSurcharge').removeAttr('disabled');
	$('#txtCreditAmt').removeAttr('disabled');
	$('#txtFreight').removeAttr('disabled');
	$('#txtVat').removeAttr('disabled');
	$('#txtlbt').removeAttr('disabled');
	$('#txtcst').removeAttr('disabled');
	$('#txtExVat').removeAttr('disabled');
	$('#txtTotalVat').removeAttr('disabled');
	$('#selboxChargeswithAmtList').removeAttr('disabled');
	$('#txtGRNArermark').removeAttr('disabled');
	$('#hideGrnAddButton').show();
	$('#saveGrn').show();
	
	// this is all about remove disabled upload Document
	$('#uploadGrnDocument').removeAttr('disabled');
	$('#uploadGrnComment').removeAttr('disabled');
	$('#grnDocumentUploadDivId').removeAttr('disabled');
}

function setEditGoodReceiptNoteSlaveInfo(response, callFrom,callFrom1) {
	var length = 0;
	var userState= $("#userState").val();
	var venderState= $("#hiddenVenderState").val();
	if (callFrom === "goodReceiptNote") {

		if (response.partyMasterDto.partyMasterContactInfoDto.length != 0 &&
			response.partyMasterDto.partyMasterContactInfoDto != null &&
			response.partyMasterDto.partyMasterContactInfoDto != "") {
			length = response.partyMasterDto.partyMasterContactInfoDto.length;
			var count = 0;
			var htm = "";
			for (var i = 0; i < length; i++) {
				count++;
				htm = htm +
					'<tr class="newAdded"> ' +
					' <td class="col-md-1 center">' +
					count +
					'</td>' +
					' <td class="col-md-1 center" id="contactPersonId' +
					count +
					'">' +
					response.partyMasterDto.partyMasterContactInfoDto[i].contactName +
					'</td>' +
					' <td class="col-md-1 center" id="contactDesignationId' +
					count +
					'">' +
					response.partyMasterDto.partyMasterContactInfoDto[i].contactDesignation +
					'</td>' +
					' <td class="col-md-1 center" id="contatcAddressId' +
					count +
					'">' +
					response.partyMasterDto.partyMasterContactInfoDto[i].contactAddress +
					'</td>' +
					' <td class="col-md-1 center" id="contactGenderId' +
					count +
					'" style="display:none">' +
					response.partyMasterDto.partyMasterContactInfoDto[i].contactGender +
					'</td>' +
					' <td class="col-md-1 center" id="contactDobId' +
					count +
					'" style="display:none">' +
					response.partyMasterDto.partyMasterContactInfoDto[i].contactDob +
					'</td>' +
					' <td class="col-md-1 center" id="contactPhoneOneId' +
					count +
					'" style="display:none">' +
					response.partyMasterDto.partyMasterContactInfoDto[i].contactPhoneNumber1 +
					'</td>' +
					' <td class="col-md-1 center" id="contactPhoneSecondId' +
					count +
					'" style="display:none">' +
					response.partyMasterDto.partyMasterContactInfoDto[i].contactPhoneNumber2 +
					'</td>' +
					' <td class="col-md-1 center" id="contactMailId' +
					count +
					'" style="display:none">' +
					response.partyMasterDto.partyMasterContactInfoDto[i].contactEmail +
					'</td>' +
					' <td class="col-md-1 center" id="contactInfoId' +
					count +
					'" style="display:none">' +
					response.partyMasterDto.partyMasterContactInfoDto[i].id +
					'</td>' +
					' <td class="col-md-1 center"><input type="hidden" id="editContactPartMaster' +
					count + '" value="' + count + '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editContactInfoPartyMaster(' +
					response.partyMasterDto.partyMasterContactInfoDto[i].id +
					',\'fromDB\')"><i class="fa fa-edit"></i></button></td>' +
					' <td class="col-md-1 center">' +
					'	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="false" id ="deleteContactPartMaster' +
					response.partyMasterDto.partyMasterContactInfoDto[i].id +
					'" onclick="deletePartyMasterSlave(' +response.partyMasterDto.partyMasterContactInfoDto[i].id +',\'deleteContact\')" ' +'><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			}
			$("#PartyContactTableInfoList").html(htm);
			$("#saveContactInfo").show();
			$("#restContactInfo").show();
		}
		if (response.partyMasterDto.partyMasterAddressInfoDto.length != 0 &&
			response.partyMasterDto.partyMasterAddressInfoDto != null &&
			response.partyMasterDto.partyMasterAddressInfoDto != "") {
			length = response.partyMasterDto.partyMasterAddressInfoDto.length;
			var count = 0;
			var htm = "";
			for (var i = 0; i < length; i++) {
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
				$("#PartyAddressTableInfoList").html(htm);
			}
			$("#saveAddressInfo").show();
			$("#restAddressInfo").show();
		}

		if (response.lstGoodReceiptNoteItemDto.length != 0 &&
			response.lstGoodReceiptNoteItemDto != null &&
			response.lstGoodReceiptNoteItemDto != "") {
			length = response.lstGoodReceiptNoteItemDto.length;
			var callFromGrn = "GRN";
			var id = 0;
			var htm = "";
			var call=$("#callFrom").val();
			for (var i = 0; i < length; i++) {
				id++;
				var expDate = getDate(response.lstGoodReceiptNoteItemDto[i].itemExpireDate);
				if(expDate =="1970-01-01"){
					expDate ="NA";
				}
				if(callFrom1 == "DRAFT"){
					var callFromNew = 'ADDEXTRAROW';
					var type1 = "fromPendingGRN";
					htm = htm +
						"<tr class='newAdded' id='multiTr" +
						id +
						"' style='overflow-x:auto;'>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkGrnItem' id='checkbox" +
						id +
						"' value='" +
						id +
						"'></td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><span id='snum" +
						id +
						"'>" +
						id +
						"</span><input type='hidden' id='slaveId" +
						id +
						"' value='" + response.lstGoodReceiptNoteItemDto[i].id + "'></td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center' id='goodsReceiptNoteItemName" +
						id +
						"'><input  style='width: 250px;' type='text' id='itemNameId" +
						id +
						"' class='form-control input-SmallText' data-name='goodReceiptNote'  onkeyup=fetchItemMasterGRNDetails(this.id,"+id+",'"+callFromGrn+"') value='" +
						response.lstGoodReceiptNoteItemDto[i].itemName +
						"'> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='number' id='itemQuantityId" +
						id +
						"' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup=totalAmount(this.id," +
						id +
						",'"+callFromNew+"') onchange=totalAmount(this.id," +
						id +
						",'"+callFromNew+"') value='" +
						response.lstGoodReceiptNoteItemDto[i].itemQuantity +
						"'> <input type='hidden' id='txtPurchaseQuotationChangingItemQty" + id + "' value='0' /> <input type='hidden' id='txtlastUom" + id + "'value=''> <lable type='hidden' id ='lblPurchaseQuotationDocQuantity" + id + "'  style ='text-align:center;' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemQuantity +
						"' >" + response.lstGoodReceiptNoteItemDto[i].itemQuantity + "</label> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' id='unitPriceId" +
						id +
						"' class='form-control input-SmallText' value='" +	response.lstGoodReceiptNoteItemDto[i].itemUnitPrice +"' onkeypress='return validateNumbers(event)'><lable id='uomUnitLatestFactorId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitLatestFactorName+" </lable> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' id='discountPerId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemDiscountPer +
						"' onkeypress='return validateNumbers(event);' onkeyup='chkTradAmtorPercentage(this.id," +
						id +
						")' onblur='calculTradeDis(this.id," +
						id +
						")'> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' id='discountRsId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemDiscountRs +
						"' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id," +
						id +
						")'> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' disabled='disabled' id='discountAmtId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemDiscountAmt +
						"'  onkeypress='return validateNumbers(event);'> </div></td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'   type='text' disabled='disabled' id='baseAmountId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemBaseAmt +
						"' onkeypress='return validateNumbers(event);'> </div></td>";
					if(venderState == userState){
						htm = htm +"<td id='documentByName'><div class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 60px;' type='text' id='gstId" +
						id +
						"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemGst +
						"' onkeyup='rowAmtCalForGST(this.id," +
						id +
						");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst(this.id," +
						id +
						")'> </div></td>" +
						"<td id='documentByName'><div class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 60px;'  disabled='disabled'   type='text' id='igstId" +
						id +
						"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemIgst +
						"' onkeyup='rowAmtCalForIGST(this.id," +
						id +
						");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount("+id+");autotaxCodeforItemIGST("+id+"," +	id +
						");'> </div></td>" +
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' disabled='disabled'  id='gstAmtId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemGstAmt +
						"'> </td>" +
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' disabled='disabled'  id='igstAmtId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].igstAmount +
						"'> </td>" ;
					}else{
						htm = htm +"<td id='documentByName'><div class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 60px;' disabled='disabled'  type='text' id='gstId" +
						id +
						"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemGst +
						"' onkeyup='rowAmtCalForGST(this.id," +
						id +
						");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst(this.id," +
						id +
						")'></div> </td>" +
						"<td id='documentByName'><div class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 60px;'  type='text' id='igstId" +
						id +
						"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemIgst +
						"' onkeyup='rowAmtCalForIGST(this.id," +
						id +
						");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount("+id+");autotaxCodeforItemIGST("+id+"," +	id +
						");'> </div></td>" +
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' disabled='disabled'  id='gstAmtId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemGstAmt +
						"'> </td>" +
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' disabled='disabled'  id='igstAmtId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].igstAmount +
						"'> </td>" ;
					}
						
					htm = htm +		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' disabled='disabled'  id='totalAmtId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemTotalAmt +
						"' onkeypress='return validateNumbers(event);'> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='factor1" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemFactor1 +
						"' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorOneNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorOneName+" </lable> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 60px;'  type='text' id='factor2" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemFactor2 +
						"' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorTwoNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorTwoName+" </lable></td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'> <input  style='width: 60px;'  type='text' id='factor3" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemFactor3 +
						"' onkeypress='return validateNumbers(event);'> <lable id='uomUnitFactorThreeNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorThreeName+" </lable></td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input   style='width: 60px;'  type='text' id='factor4" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemFactor4 +
						"'> <lable id='uomUnitFactorFourNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorFourName+" </lable></td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled   type='text' id='itemExpectedQtyId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemExpectedQty +
						"'  onkeypress='return validateNumbers(event);' onkeyup='pendingAmount(this.id," +
						id +
						");'> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;display:none;'  type='hidden' id='totalReceivedQtyId" +
						id + "' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemReceivedQty +
						"'><input style='width: 60px;'  type='text' id='itemReceivedQtyId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemReceivedQty +
						"'  onkeypress='return validateNumbers(event);'  onblur=onkeyup=addRowAssetMaintenance(" + id + ");> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled  type='text' id='pendinQtyId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemPendingQty +
						"' onkeypress='return validateNumbers(event);'> </td>" ;
						if(response.lstGoodReceiptNoteItemDto[i].isItemBatchWise == "YES"){
							htm = htm	+	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 100px;'  type='text' id='batchId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemBatchNo +
							"' onblur='checkBatchAvailability(this.value,"+id+");'></td>" ;
						}else{
						htm = htm	+	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 100px;' disabled='disabled' type='text' id='batchId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemBatchNo +
							"' onblur='checkBatchAvailability(this.value,"+id+");'></td>" ;
						}
						
						htm = htm + "<td class='col-md-3 col-xs-6 col-sm-3 center'><input style='width: 100px;' type='button' id='getBatchDetailsId"+ id + "' class='btn btn-xs btn-success editUserAccess'  data-toggle='modal' data-target='#batchWiseGoodReceiptNoteModal' value='Batch Details' onclick='getGoodReceiptNoteItemBatchDetails(" + id +","+response.lstGoodReceiptNoteItemDto[i].itemId+");'> </td>";
						htm = htm	+	"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style='width: 100px;' id='batchKeyId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].batchId +
						"'> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 100px;' type='text' id='itemId" +
						id +
						"' class='form-control input-SmallText' value='" + response.lstGoodReceiptNoteItemDto[i].itemId + "'></td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;'  type='text' id='itemManufactureDateId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemManufactureDate +
						"' onclick='getMfgandexpyDate(this.id," +
						id +
						");'> </td>";
						if(response.lstGoodReceiptNoteItemDto[i].isItemBatchWise == "YES"){
						htm = htm	+	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;'  type='text' id='itemExpireDateId" +
							id + "' class='form-control input-SmallText' value='" +
							expDate +
							"' onclick='getMfgandexpyDate(this.id," + id +
							");'></td>";
						}else{
							
						htm = htm	+"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 150px;'  disabled='disabled' type='text' id='itemExpireDateId" +
						id + "' class='form-control input-SmallText' value='" +
						expDate +
						"' onclick='getMfgandexpyDate(this.id," + id +
						");'></td>";
						
						}
						
						htm = htm	+
						"<td class='col-md-6 col-xs-12 col-sm-6 center' '><input  style='width: 150px;'  type='text' id='itemTotalAmount" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemBaseIgstGstAmt +
						"'> </td>"
	
						+
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='itemHsnNameId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].hsnNameValue +
						"'> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='itemHsnId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].hsnName +
						"'> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='itemTaxCodeId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].taxCode +
						"'> </td>"+
						
						//added by rohit on 22-08-2020
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='labEquipmentItemStatusId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemLabEquipmentStatus
						+ "'> </td>"
						+
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='assetItemStatusId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemAssetStatus
						+ "'> </td>"
						+
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='isItemBatchWiseId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].isItemBatchWise
						+ "'> </td>"
						+
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='reagentItemStatusId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemReagentStatus
						+ "'> </td>"
						+
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='assetItemManufactureId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemManufactureName
						+ "'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].amcVal+"'   type='text' id='assetAmcValId"
						+ id
						+ "' class='form-control input-SmallText' value='0'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].pmVal+"' type='text' id='assetPmValId"
						+ id
						+ "' class='form-control input-SmallText' value='0'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].amcYear+"' type='text' id='assetAmcYearId"
						+ id
						+ "' class='form-control input-SmallText' value='0'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].pmYear+"' type='text' id='assetPmYearId"
						+ id
						+ "' class='form-control input-SmallText' value='0'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].productWarranty+"' type='text' id='assetProductWarrantyId"
						+ id
						+ "' class='form-control input-SmallText' value='0'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].productWarrantyDuration+"' type='text' id='assetProductWarrantyDurationId"
						+ id
						+ "' class='form-control input-SmallText' value='0'> </td>"
						+"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  value='"+response.lstGoodReceiptNoteItemDto[i].productCategory+"' id='assetProductCategory"
						+ id
						+ "' class='form-control input-SmallText'> </td>"
						+"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  value='"+response.lstGoodReceiptNoteItemDto[i].isItemSlaveUsed+"' id='isItemSlaveUsed"
						+ id
						+ "' class='form-control input-SmallText'> </td>"
						+"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='deleteSlave"
						+ id
						+ "' class='form-control input-SmallText' isNew='false' value='"+response.lstGoodReceiptNoteItemDto[i].id+"'> </td>"
					    + "<td class='col-md-3 col-xs-6 col-sm-3 center'><input  style='width: 60px;' type='button' id='addNewRowWithSameItem"
						+ id
						+ "' class='btn btn-xs btn-success editUserAccess' value='Add' onclick='addExtraRowGrnButton(" + id +
						");'> </td>";
						"</tr>";
						
					}else if (callFrom1 == "PENDING"){
						
						if(response.lstGoodReceiptNoteItemDto[i].itemPendingQty !=0){
							var type1 = "fromPendingGRN";
							htm = htm +
							"<tr class='newAdded' id='multiTr" +
							id +
							"' style='overflow-x:auto;'>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' type='checkbox' class='chkGrnItem' id='checkbox" +
							id +
							"' value='" +
							id +
							"'></td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><span id='snum" +
							id +
							"'>" +
							id +
							"</span><input type='hidden' id='slaveId" +
							id +
							"' value='" + response.lstGoodReceiptNoteItemDto[i].id + "'></td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center' id='goodsReceiptNoteItemName" +
							id +
							"'><input disabled='disabled' style='width: 250px;' type='text' id='itemNameId" +
							id +
							"' class='form-control input-SmallText' data-name='goodReceiptNote'  onkeyup=fetchItemMasterGRNDetails(this.id,"+id+",'"+callFromGrn+"') value='" +
							response.lstGoodReceiptNoteItemDto[i].itemName +
							"'> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;'  type='number' id='itemQuantityId" +
							id +
							"' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup='totalAmount(this.id," +
							id +
							")' onchange='totalAmount(this.id," +
							id +
							")' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemQuantity +
							"'> <input type='hidden' id='txtPurchaseQuotationChangingItemQty" + id + "' value='0' /> <input type='hidden' id='txtlastUom" + id + "'value=''> <lable type='hidden' id ='lblPurchaseQuotationDocQuantity" + id + "'  style ='text-align:center;' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemQuantity +
							"' >" + response.lstGoodReceiptNoteItemDto[i].itemQuantity + "</label> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' type='text' id='unitPriceId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemUnitPrice + "' onkeypress='return validateNumbers(event)'><lable id='uomUnitLatestFactorId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitLatestFactorName+" </lable> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;'  type='text' id='discountPerId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemDiscountPer +
							"' onkeypress='return validateNumbers(event);' onkeyup='chkTradAmtorPercentage(this.id," +
							id +
							")' onblur='calculTradeDis(this.id," +
							id +
							")'> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;'  type='text' id='discountRsId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemDiscountRs +
							"' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id," +
							id +
							")'> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;'  type='text' disabled='disabled' id='discountAmtId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemDiscountAmt +
							"'  onkeypress='return validateNumbers(event);'> </div></td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;'   type='text' disabled='disabled' id='baseAmountId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemBaseAmt +
							"' onkeypress='return validateNumbers(event);'> </div></td>";
						if(venderState == userState){
							htm = htm +	"<td id='documentByName'><div class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' type='text' id='gstId" +
							id +
							"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemGst +
							"' onkeyup='rowAmtCalForGST(this.id," +id +	");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst(this.id," + id +");'></div> </td>" +
							"<td id='documentByName'> <div class='col-md-6 col-xs-12 col-sm-6 center'><input  disabled='disabled' style='width: 60px;' disabled='disabled'  type='text' id='igstId" +
							id +
							"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemIgst +
							"' onkeyup='rowAmtCalForIGST(this.id," +
							id +
							");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount("+id+");autotaxCodeforItemIGST("+id+"," +id +");'></div> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;'  type='text' disabled='disabled'  id='gstAmtId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemGstAmt +
							"'> </td>" +
							
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' type='text' disabled='disabled'  id='igstAmtId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].igstAmount +
							"'> </td>" ;
						}else{
							htm = htm +	"<td id='documentByName'><div class='col-md-6 col-xs-12 col-sm-6 center'><input  disabled='disabled'  style='width: 60px;' type='text' id='gstId" +
							id +
							"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemGst +
							"' onkeyup='onkeyup='rowAmtCalForGST(this.id," +id +");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst(this.id," + id +");'></div> </td>" +
							"<td id='documentByName'> <div class='col-md-6 col-xs-12 col-sm-6 center'><input  disabled='disabled' style='width: 60px;'  type='text' id='igstId" +
							id +
							"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemIgst +
							"' onkeyup='rowAmtCalForIGST(this.id," +id + ");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount("+id+");autotaxCodeforItemIGST("+id+"," +id +");'></div> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;'  type='text' disabled='disabled'  id='gstAmtId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemGstAmt +
							"'> </td>" +
							
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' type='text' disabled='disabled'  id='igstAmtId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].igstAmount +
							"'> </td>" ;
						}
							
						htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' type='text' disabled='disabled'  id='totalAmtId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemTotalAmt +
							"' onkeypress='return validateNumbers(event);'> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' type='text' id='factor1" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemFactor1 +
							"' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorOneNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorOneName+" </lable> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  disabled='disabled' style='width: 60px;'  type='text' id='factor2" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemFactor2 +
							"' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorTwoNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorTwoName+" </lable></td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'> <input  disabled='disabled' style='width: 60px;'  type='text' id='factor3" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemFactor3 +
							"' onkeypress='return validateNumbers(event);'> <lable id='uomUnitFactorThreeNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorThreeName+" </lable></td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input   disabled='disabled' style='width: 60px;'  type='text' id='factor4" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemFactor4 +
							"'> <lable id='uomUnitFactorFourNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorFourName+" </lable></td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' disabled   type='text' id='itemExpectedQtyId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemExpectedQty +
							"'  onkeypress='return validateNumbers(event);' onkeyup='pendingAmount(this.id," +
							id +
							");'> </td>";
						if(response.lstGoodReceiptNoteItemDto[i].itemPendingQty == 0){
							htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;display:none;'  type='hidden' id='totalReceivedQtyId" +
							id + "' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemReceivedQty +
							"'><input disabled style='width: 60px;'  type='text' id='itemReceivedQtyId" +
							id +
							"' class='form-control input-SmallText' value='0'  onkeypress='return validateNumbers(event);'   onblur=pendingAmount(this.id," +id+",'"+type1+"');onkeyup=addRowAssetMaintenance(" + id + ");> </td>";
						}else{
							htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;display:none;'  type='hidden' id='totalReceivedQtyId" +
							id + "' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemReceivedQty +
							"'><input style='width: 60px;' disabled='disabled' type='text' id='itemReceivedQtyId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemReceivedQty +
							"'  onkeypress='return validateNumbers(event);'   onblur=pendingAmount(this.id," +id+",'"+type1+"');onkeyup=addRowAssetMaintenance(" + id + ");> </td>";
						}
						htm = htm +"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled='disabled' type='text' id='pendinQtyId" +
								id +
								"' class='form-control input-SmallText' value='" +
								response.lstGoodReceiptNoteItemDto[i].itemPendingQty +
								"' onkeypress='return validateNumbers(event);'> </td>";
						if(response.lstGoodReceiptNoteItemDto[i].isItemBatchWise == "YES"){
							htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 100px;' disabled='disabled' type='text' id='batchId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemBatchNo +
							"' onblur='checkBatchAvailability(this.value,"+id+");'></td>";
						}else{
							htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 100px;' disabled='disabled' type='text' id='batchId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemBatchNo +
							"' onblur='checkBatchAvailability(this.value,"+id+");'></td>";
						}
						
						htm = htm + "<td class='col-md-3 col-xs-6 col-sm-3 center'><input disabled='disabled' style='width: 100px;' type='button' id='getBatchDetailsId"+ id + "' class='btn btn-xs btn-success editUserAccess'  data-toggle='modal' data-target='#batchWiseGoodReceiptNoteModal' value='Batch Details' onclick='getGoodReceiptNoteItemBatchDetails(" + id +","+response.lstGoodReceiptNoteItemDto[i].itemId+");'> </td>";
						
						htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input disabled='disabled' type='text' style='width: 100px;' id='batchKeyId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].batchId +
							"'> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 100px;' type='text' id='itemId" +
							id +
							"' class='form-control input-SmallText' value='" + response.lstGoodReceiptNoteItemDto[i].itemId + "'></td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  disabled='disabled' style='width: 150px;'  type='text' id='itemManufactureDateId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemManufactureDate +
							"' onclick='getMfgandexpyDate(this.id," +
							id +
							");'> </td>" ;
							if(response.lstGoodReceiptNoteItemDto[i].isItemBatchWise == "YES"){
								htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;' disabled='disabled' type='text' id='itemExpireDateId" +
								id + "' class='form-control input-SmallText' value='" +
								expDate +
								"' onclick='getMfgandexpyDate(this.id," + id +
								");'></td>";
							}else{
								htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;' disabled='disabled' type='text' id='itemExpireDateId" +
								id + "' class='form-control input-SmallText' value='" +
								expDate +
								"' onclick='getMfgandexpyDate(this.id," + id +
								");'></td>";	
							}
							
							htm = htm +"<td class='col-md-6 col-xs-12 col-sm-6 center' '><input disabled='disabled' style='width: 150px;'  type='text' id='itemTotalAmount" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemBaseIgstGstAmt +
							"'> </td>"
		
							+
							"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input disabled='disabled' style='width: 150px;'  type='text' id='itemHsnNameId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].hsnNameValue +
							"'> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='itemHsnId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].hsnName +
							"'> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='itemTaxCodeId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].taxCode +
							"'> </td>"+
							
							//added by rohit on 22-08-2020
							"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='labEquipmentItemStatusId"
							+ id
							+ "' class='form-control input-SmallText' value='"
							+ response.lstGoodReceiptNoteItemDto[i].itemLabEquipmentStatus
							+ "'> </td>"
							+
							"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='assetItemStatusId"
							+ id
							+ "' class='form-control input-SmallText' value='"
							+ response.lstGoodReceiptNoteItemDto[i].itemAssetStatus
							+ "'> </td>"
							+
							"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='isItemBatchWiseId"
							+ id
							+ "' class='form-control input-SmallText' value='"
							+ response.lstGoodReceiptNoteItemDto[i].isItemBatchWise
							+ "'> </td>"
							+
							"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='reagentItemStatusId"
							+ id
							+ "' class='form-control input-SmallText' value='"
							+ response.lstGoodReceiptNoteItemDto[i].itemReagentStatus
							+ "'> </td>"
							+
							"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='assetItemManufactureId"
							+ id
							+ "' class='form-control input-SmallText' value='"
							+ response.lstGoodReceiptNoteItemDto[i].itemManufactureName
							+ "'> </td>"
							+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].amcVal+"'   type='text' id='assetAmcValId"
							+ id
							+ "' class='form-control input-SmallText' value='0'> </td>"
							+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].pmVal+"' type='text' id='assetPmValId"
							+ id
							+ "' class='form-control input-SmallText' value='0'> </td>"
							+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].amcYear+"' type='text' id='assetAmcYearId"
							+ id
							+ "' class='form-control input-SmallText' value='0'> </td>"
							+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].pmYear+"' type='text' id='assetPmYearId"
							+ id
							+ "' class='form-control input-SmallText' value='0'> </td>"
							+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].productWarranty+"' type='text' id='assetProductWarrantyId"
							+ id
							+ "' class='form-control input-SmallText' value='0'> </td>"
							+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].productWarrantyDuration+"' type='text' id='assetProductWarrantyDurationId"
							+ id
							+ "' class='form-control input-SmallText' value='0'> </td>"
							+"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  value='"+response.lstGoodReceiptNoteItemDto[i].productCategory+"' id='assetProductCategory"
							+ id
							+ "' class='form-control input-SmallText'> </td>"
							+"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  value='"+response.lstGoodReceiptNoteItemDto[i].isItemSlaveUsed+"' id='isItemSlaveUsed"
							+ id
							+ "' class='form-control input-SmallText'> </td>";
							if(response.lstGoodReceiptNoteItemDto[i].itemReceivedQty > 0){
								htm = htm	+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='deleteSlave"
								+ id + "' class='form-control input-SmallText' isNew='true' value='"+response.lstGoodReceiptNoteItemDto[i].id+"'> </td>";
							}else{
								htm = htm	+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='deleteSlave"
								+ id + "' class='form-control input-SmallText' isNew='false' value='"+response.lstGoodReceiptNoteItemDto[i].id+"'> </td>";	
							}
							//added row from purchase order to grn same item slave - by Vishnu 01-02-2021
							if(response.lstGoodReceiptNoteItemDto[i].itemPendingQty !=0){
							htm = htm + "<td class='col-md-3 col-xs-6 col-sm-3 center'><input  style='width: 60px;' type='button' id='addNewRowWithSameItem"
							+ id
							+ "' class='btn btn-xs btn-success editUserAccess' value='Add' onclick='addExtraRowGrnButton(" + id +
							");'> </td>";
							}else{
								htm = htm + "<td class='col-md-3 col-xs-6 col-sm-3 center'><input  disabled='disabled' style='width: 60px;' type='button' id='addNewRowWithSameItem"
								+ id
								+ "' class='btn btn-xs btn-success editUserAccess' value='Add' onclick='addExtraRowGrnButton(" + id +
								");'> </td>";
							}
							
							htm = htm + "</tr>";
						}else {
							//this  is for non pending qty
							
							var type1 = "fromPendingGRN";
							htm = htm +
							"<tr class='newAdded' id='multiTr" +
							id +
							"' style='overflow-x:auto;'>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkGrnItem' id='checkbox" +
							id +
							"' value='" +
							id +
							"'></td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><span id='snum" +
							id +
							"'>" +
							id +
							"</span><input type='hidden' id='slaveId" +
							id +
							"' value='" + response.lstGoodReceiptNoteItemDto[i].id + "'></td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center' id='goodsReceiptNoteItemName" +
							id +
							"'><input  style='width: 250px;' type='text' disabled='disabled' id='itemNameId" +
							id +
							"' class='form-control input-SmallText' data-name='goodReceiptNote'  onkeyup=fetchItemMasterGRNDetails(this.id,"+id+",'"+callFromGrn+"') value='" +
							response.lstGoodReceiptNoteItemDto[i].itemName +
							"'> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;'  type='number' id='itemQuantityId" +
							id +
							"' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup='totalAmount(this.id," +
							id +
							")' onchange='totalAmount(this.id," +
							id +
							")' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemQuantity +
							"'> <input type='hidden' id='txtPurchaseQuotationChangingItemQty" + id + "' value='0' /> <input type='hidden' id='txtlastUom" + id + "'value=''> <lable type='hidden' id ='lblPurchaseQuotationDocQuantity" + id + "'  style ='text-align:center;' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemQuantity +
							"' >" + response.lstGoodReceiptNoteItemDto[i].itemQuantity + "</label> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' type='text' id='unitPriceId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemUnitPrice + "' onkeypress='return validateNumbers(event)'><lable id='uomUnitLatestFactorId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitLatestFactorName+" </lable> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;'  type='text' id='discountPerId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemDiscountPer +
							"' onkeypress='return validateNumbers(event);' onkeyup='chkTradAmtorPercentage(this.id," +
							id +
							")' onblur='calculTradeDis(this.id," +
							id +
							")'> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;'  type='text' id='discountRsId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemDiscountRs +
							"' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id," +
							id +
							")'> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' disabled='disabled' id='discountAmtId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemDiscountAmt +
							"'  onkeypress='return validateNumbers(event);'> </div></td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'   type='text' disabled='disabled' id='baseAmountId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemBaseAmt +
							"' onkeypress='return validateNumbers(event);'> </div></td>";
						if(venderState == userState){
							htm = htm +	"<td id='documentByName'><div class='col-md-6 col-xs-12 col-sm-6 center'><input  disabled='disabled' style='width: 60px;' type='text' id='gstId" +
							id +
							"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemGst +
							"' onkeyup='rowAmtCalForGST(this.id," +id +	");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst(this.id," + id +");'></div> </td>" +
							"<td id='documentByName'> <div class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' disabled='disabled'  type='text' id='igstId" +
							id +
							"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemIgst +
							"' onkeyup='rowAmtCalForIGST(this.id," +
							id +
							");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount("+id+");autotaxCodeforItemIGST("+id+"," +id +");'></div> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;'  type='text' disabled='disabled'  id='gstAmtId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemGstAmt +
							"'> </td>" +
							
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' type='text' disabled='disabled'  id='igstAmtId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].igstAmount +
							"'> </td>" ;
						}else{
							htm = htm +	"<td id='documentByName'><div class='col-md-6 col-xs-12 col-sm-6 center'><input  disabled='disabled'  style='width: 60px;' type='text' id='gstId" +
							id +
							"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemGst +
							"' onkeyup='onkeyup='rowAmtCalForGST(this.id," +id +");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst(this.id," + id +");'></div> </td>" +
							"<td id='documentByName'> <div class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;'  type='text' id='igstId" +
							id +
							"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemIgst +
							"' onkeyup='rowAmtCalForIGST(this.id," +id + ");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount("+id+");autotaxCodeforItemIGST("+id+"," +id +");'></div> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;'  type='text' disabled='disabled'  id='gstAmtId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemGstAmt +
							"'> </td>" +
							
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' type='text' disabled='disabled'  id='igstAmtId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].igstAmount +
							"'> </td>" ;
						}
							
						htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' type='text' disabled='disabled'  id='totalAmtId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemTotalAmt +
							"' onkeypress='return validateNumbers(event);'> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' type='text' id='factor1" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemFactor1 +
							"' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorOneNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorOneName+" </lable> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  disabled='disabled' style='width: 60px;'  type='text' id='factor2" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemFactor2 +
							"' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorTwoNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorTwoName+" </lable></td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'> <input  disabled='disabled' style='width: 60px;'  type='text' id='factor3" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemFactor3 +
							"' onkeypress='return validateNumbers(event);'> <lable id='uomUnitFactorThreeNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorThreeName+" </lable></td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  disabled='disabled' style='width: 60px;'  type='text' id='factor4" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemFactor4 +
							"'> <lable id='uomUnitFactorFourNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorFourName+" </lable></td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled='disabled'   type='text' id='itemExpectedQtyId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemExpectedQty +
							"'  onkeypress='return validateNumbers(event);' onkeyup='pendingAmount(this.id," +
							id +
							");'> </td>";
						if(response.lstGoodReceiptNoteItemDto[i].itemPendingQty == 0){
							htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;display:none;'  type='hidden' id='totalReceivedQtyId" +
							id + "' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemReceivedQty +
							"'><input disabled='disabled' style='width: 60px;'  type='text' id='itemReceivedQtyId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemReceivedQty +
							"'  onkeypress='return validateNumbers(event);'   onblur=pendingAmount(this.id," +id+",'"+type1+"');onkeyup=addRowAssetMaintenance(" + id + ");> </td>";
						}else{
							htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;display:none;'  type='hidden' id='totalReceivedQtyId" +
							id + "' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemReceivedQty +
							"'><input style='width: 60px;' disabled='disabled' type='text' id='itemReceivedQtyId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemReceivedQty +
							"'  onkeypress='return validateNumbers(event);'   onblur=pendingAmount(this.id," +id+",'"+type1+"');onkeyup=addRowAssetMaintenance(" + id + ");> </td>";
						}
						htm = htm +"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' disabled type='text' id='pendinQtyId" +
								id +
								"' class='form-control input-SmallText' value='" +
								response.lstGoodReceiptNoteItemDto[i].itemPendingQty +
								"' onkeypress='return validateNumbers(event);'> </td>";
						if(response.lstGoodReceiptNoteItemDto[i].isItemBatchWise == "YES"){
							htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 100px;' disabled='disabled' type='text' id='batchId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemBatchNo +
							"' onblur='checkBatchAvailability(this.value,"+id+");'></td>";
						}else{
							htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 100px;' disabled='disabled' type='text' id='batchId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemBatchNo +
							"' onblur='checkBatchAvailability(this.value,"+id+");'></td>";
						}
						
						htm = htm + "<td class='col-md-3 col-xs-6 col-sm-3 center'><input  style='width: 100px;' disabled='disabled' type='button' id='getBatchDetailsId"+ id + "' class='btn btn-xs btn-success editUserAccess'  data-toggle='modal' data-target='#batchWiseGoodReceiptNoteModal' value='Batch Details' onclick='getGoodReceiptNoteItemBatchDetails(" + id +","+response.lstGoodReceiptNoteItemDto[i].itemId+");'> </td>";
						
						htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input disabled='disabled' type='text' style='width: 100px;' id='batchKeyId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].batchId +
							"'> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input disabled='disabled' style='width: 100px;' type='text' id='itemId" +
							id +
							"' class='form-control input-SmallText' value='" + response.lstGoodReceiptNoteItemDto[i].itemId + "'></td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;'  type='text' id='itemManufactureDateId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemManufactureDate +
							"' onclick='getMfgandexpyDate(this.id," +
							id +
							");'> </td>" ;
							if(response.lstGoodReceiptNoteItemDto[i].isItemBatchWise == "YES"){
								htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 150px;'  type='text' id='itemExpireDateId" +
								id + "' class='form-control input-SmallText' value='" +
								expDate +
								"' onclick='getMfgandexpyDate(this.id," + id +
								");'></td>";
							}else{
								htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 150px;' disabled='disabled' type='text' id='itemExpireDateId" +
								id + "' class='form-control input-SmallText' value='" +
								expDate +
								"' onclick='getMfgandexpyDate(this.id," + id +
								");'></td>";	
							}
							
							htm = htm +"<td class='col-md-6 col-xs-12 col-sm-6 center' '><input disabled='disabled' style='width: 150px;'  type='text' id='itemTotalAmount" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].itemBaseIgstGstAmt +
							"'> </td>"
		
							+
							"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='itemHsnNameId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].hsnNameValue +
							"'> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='itemHsnId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].hsnName +
							"'> </td>" +
							"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='itemTaxCodeId" +
							id +
							"' class='form-control input-SmallText' value='" +
							response.lstGoodReceiptNoteItemDto[i].taxCode +
							"'> </td>"+
							
							//added by rohit on 22-08-2020
							"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='labEquipmentItemStatusId"
							+ id
							+ "' class='form-control input-SmallText' value='"
							+ response.lstGoodReceiptNoteItemDto[i].itemLabEquipmentStatus
							+ "'> </td>"
							+
							"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='assetItemStatusId"
							+ id
							+ "' class='form-control input-SmallText' value='"
							+ response.lstGoodReceiptNoteItemDto[i].itemAssetStatus
							+ "'> </td>"
							+
							"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='isItemBatchWiseId"
							+ id
							+ "' class='form-control input-SmallText' value='"
							+ response.lstGoodReceiptNoteItemDto[i].isItemBatchWise
							+ "'> </td>"
							+
							"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='reagentItemStatusId"
							+ id
							+ "' class='form-control input-SmallText' value='"
							+ response.lstGoodReceiptNoteItemDto[i].itemReagentStatus
							+ "'> </td>"
							+
							"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='assetItemManufactureId"
							+ id
							+ "' class='form-control input-SmallText' value='"
							+ response.lstGoodReceiptNoteItemDto[i].itemManufactureName
							+ "'> </td>"
							+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].amcVal+"'   type='text' id='assetAmcValId"
							+ id
							+ "' class='form-control input-SmallText' value='0'> </td>"
							+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].pmVal+"' type='text' id='assetPmValId"
							+ id
							+ "' class='form-control input-SmallText' value='0'> </td>"
							+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].amcYear+"' type='text' id='assetAmcYearId"
							+ id
							+ "' class='form-control input-SmallText' value='0'> </td>"
							+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].pmYear+"' type='text' id='assetPmYearId"
							+ id
							+ "' class='form-control input-SmallText' value='0'> </td>"
							+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].productWarranty+"' type='text' id='assetProductWarrantyId"
							+ id
							+ "' class='form-control input-SmallText' value='0'> </td>"
							+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].productWarrantyDuration+"' type='text' id='assetProductWarrantyDurationId"
							+ id
							+ "' class='form-control input-SmallText' value='0'> </td>"
							+"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  value='"+response.lstGoodReceiptNoteItemDto[i].productCategory+"' id='assetProductCategory"
							+ id
							+ "' class='form-control input-SmallText'> </td>"
							+"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  value='"+response.lstGoodReceiptNoteItemDto[i].isItemSlaveUsed+"' id='isItemSlaveUsed"
							+ id
							+ "' class='form-control input-SmallText'> </td>";
							if(response.lstGoodReceiptNoteItemDto[i].itemReceivedQty > 0){
								htm = htm	+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='deleteSlave"
								+ id + "' class='form-control input-SmallText' isNew='true' value='"+response.lstGoodReceiptNoteItemDto[i].id+"'> </td>";
							}else{
								htm = htm	+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='deleteSlave"
								+ id + "' class='form-control input-SmallText' isNew='false' value='"+response.lstGoodReceiptNoteItemDto[i].id+"'> </td>";	
							}
							//added row from purchase order to grn same item slave - by Vishnu 01-02-2021
							if(response.lstGoodReceiptNoteItemDto[i].itemPendingQty !=0){
							htm = htm + "<td class='col-md-3 col-xs-6 col-sm-3 center'><input  style='width: 60px;' type='button' id='addNewRowWithSameItem"
							+ id
							+ "' class='btn btn-xs btn-success editUserAccess' value='Add' onclick='addExtraRowGrnButton(" + id +
							");'> </td>";
							}else{
								htm = htm + "<td class='col-md-3 col-xs-6 col-sm-3 center'><input  disabled='disabled' style='width: 60px;' type='button' id='addNewRowWithSameItem"
								+ id
								+ "' class='btn btn-xs btn-success editUserAccess' value='Add' onclick='addExtraRowGrnButton(" + id +
								");'> </td>";
							}
							
							htm = htm + "</tr>";
						}
						
						// this is for non pending qty and closed GRN
					}else {
						var type1 = "fromPendingGRN";
						htm = htm +
						"<tr class='newAdded' id='multiTr" +
						id +
						"' style='overflow-x:auto;'>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkGrnItem' id='checkbox" +
						id +
						"' value='" +
						id +
						"'></td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><span id='snum" +
						id +
						"'>" +
						id +
						"</span><input type='hidden' id='slaveId" +
						id +
						"' value='" + response.lstGoodReceiptNoteItemDto[i].id + "'></td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center' id='goodsReceiptNoteItemName" +
						id +
						"'><input  style='width: 250px;' type='text' id='itemNameId" +
						id +
						"' class='form-control input-SmallText' data-name='goodReceiptNote' disabled onkeyup=fetchItemMasterGRNDetails(this.id,"+id+",'"+callFromGrn+"') value='" +
						response.lstGoodReceiptNoteItemDto[i].itemName +
						"'> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='number' id='itemQuantityId" +
						id +
						"' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup='totalAmount(this.id," +
						id +
						")' onchange='totalAmount(this.id," +
						id +
						")' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemQuantity +
						"'> <input type='hidden' id='txtPurchaseQuotationChangingItemQty" + id + "' value='0' /> <input type='hidden' id='txtlastUom" + id + "'value=''> <lable type='hidden' id ='lblPurchaseQuotationDocQuantity" + id + "'  style ='text-align:center;' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemQuantity +
						"' >" + response.lstGoodReceiptNoteItemDto[i].itemQuantity + "</label> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' id='unitPriceId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemUnitPrice +"' onkeypress='return validateNumbers(event)'><lable id='uomUnitLatestFactorId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitLatestFactorName+" </lable> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='discountPerId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemDiscountPer +
						"' onkeypress='return validateNumbers(event);' onkeyup='chkTradAmtorPercentage(this.id," +
						id +
						")' onblur='calculTradeDis(this.id," +
						id +
						")'> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='discountRsId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemDiscountRs +
						"' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id," +
						id +
						")'> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' disabled='disabled' id='discountAmtId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemDiscountAmt +
						"'  onkeypress='return validateNumbers(event);'> </div></td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  disabled type='text' disabled='disabled' id='baseAmountId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemBaseAmt +
						"' onkeypress='return validateNumbers(event);'> </div></td>" ;
					if(venderState == userState){
						htm = htm +"<td id='documentByName'><div class='col-md-6 col-xs-12 col-sm-6 center'><input disabled style='width: 60px;' type='text' id='gstId" +
						id +
						"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemGst +
						"' onkeyup='onkeyup='rowAmtCalForGST(this.id," +id +");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst(this.id," + id +");'> </div></td>" +
						"<td id='documentByName'> <div class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;'  type='text' id='igstId" +
						id +
						"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemIgst +
						"' onkeyup='rowAmtCalForIGST(this.id," +
						id +
						");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount("+id+");autotaxCodeforItemIGST("+id+"," +id +");'></div> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' disabled='disabled'  id='gstAmtId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemGstAmt +
						"'> </td>" +
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' disabled='disabled'  id='igstAmtId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].igstAmount +
						"'> </td>" ;
					}else{
						htm = htm +"<td id='documentByName'><div class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' type='text' id='gstId" +
						id +
						"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemGst +
						"' onkeyup='onkeyup='onkeyup='rowAmtCalForGST(this.id," +id +");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst(this.id," + id +")'> </div></td>" +
						"<td id='documentByName'> <div class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 60px;'  type='text' id='igstId" +
						id +
						"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemIgst +
						"' onkeyup='rowAmtCalForIGST(this.id," +
						id +
						");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount("+id+");autotaxCodeforItemIGST("+id+"," +id +");'> </div></td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' disabled='disabled'  id='gstAmtId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemGstAmt +
						"'> </td>" +
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' disabled='disabled'  id='igstAmtId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].igstAmount +
						"'> </td>" ;
					}
					htm = htm +	
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled  type='text' disabled='disabled'  id='totalAmtId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemTotalAmt +
						"' onkeypress='return validateNumbers(event);'> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='factor1" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemFactor1 +
						"' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorOneNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorOneName+" </lable> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' disabled type='text' id='factor2" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemFactor2 +
						"' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorTwoNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorTwoName+" </lable></td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'> <input disabled='disabled' style='width: 60px;' disabled type='text' id='factor3" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemFactor3 +
						"' onkeypress='return validateNumbers(event);'> <lable id='uomUnitFactorThreeNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorThreeName+" </lable></td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  disabled='disabled' style='width: 60px;' disabled type='text' id='factor4" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemFactor4 +
						"'> <lable id='uomUnitFactorFourNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorFourName+" </lable></td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled='disabled'  type='text' id='itemExpectedQtyId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemExpectedQty +
						"'  onkeypress='return validateNumbers(event);' onkeyup='pendingAmount(this.id," +
						id +
						");'> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;display:none;'  type='hidden' id='totalReceivedQtyId" +
						id + "' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemReceivedQty +
						"'><input style='width: 60px;' type='text' id='itemReceivedQtyId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemReceivedQty +
						"'  onkeypress='return validateNumbers(event);'  onblur=pendingAmount(this.id," +id+",'"+type1+"');onkeyup=addRowAssetMaintenance(" + id + ");> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='pendinQtyId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemPendingQty +
						"' onkeypress='return validateNumbers(event);'> </td>" ;
					if(response.lstGoodReceiptNoteItemDto[i].isItemBatchWise == "YES"){
						htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 100px;'  type='text' id='batchId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemBatchNo +
						"' onblur='checkBatchAvailability(this.value,"+id+");'></td>" ;
					}else{
						htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 100px;' disabled='disabled' type='text' id='batchId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemBatchNo +
						"' onblur='checkBatchAvailability(this.value,"+id+");'></td>" ;
					}
					htm = htm + "<td class='col-md-3 col-xs-6 col-sm-3 center'><input disabled='disabled' style='width: 100px;' type='button' id='getBatchDetailsId"+ id + "' class='btn btn-xs btn-success editUserAccess'  data-toggle='modal' data-target='#batchWiseGoodReceiptNoteModal' value='Batch Details' onclick='getGoodReceiptNoteItemBatchDetails(" + id +","+response.lstGoodReceiptNoteItemDto[i].itemId+");'> </td>";
					htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style='width: 100px;' id='batchKeyId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].batchId +
						"'> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input disabled style='width: 100px;' type='text' id='itemId" +
						id +
						"' class='form-control input-SmallText' value='" + response.lstGoodReceiptNoteItemDto[i].itemId + "'></td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;' disabled type='text' id='itemManufactureDateId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemManufactureDate +
						"' onclick='getMfgandexpyDate(this.id," +
						id +
						");'> </td>" ;
					if(response.lstGoodReceiptNoteItemDto[i].isItemBatchWise == "YES"){
						
						htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;'  type='text' id='itemExpireDateId" +
						id + "' class='form-control input-SmallText' value='" +
						expDate +
						"' onclick='getMfgandexpyDate(this.id," + id +
						");'></td>";
					}else{
						htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;' disabled='disabled' type='text' id='itemExpireDateId" +
						id + "' class='form-control input-SmallText' value='" +
						expDate +
						"' onclick='getMfgandexpyDate(this.id," + id +
						");'></td>";
					}
						
					htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center' '><input  style='width: 150px;' disabled type='text' id='itemTotalAmount" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].itemBaseIgstGstAmt +
						"'> </td>"	+
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' disabled type='text' id='itemHsnNameId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].hsnNameValue +
						"'> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' disabled type='text' id='itemHsnId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].hsnName +
						"'> </td>" +
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' disabled type='text' id='itemTaxCodeId" +
						id +
						"' class='form-control input-SmallText' value='" +
						response.lstGoodReceiptNoteItemDto[i].taxCode +
						"'> </td>"+
						
						//added by rohit on 22-08-2020
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='labEquipmentItemStatusId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemLabEquipmentStatus
						+ "'> </td>"
						+
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='assetItemStatusId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemAssetStatus
						+ "'> </td>"
						+
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='isItemBatchWiseId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].isItemBatchWise
						+ "'> </td>"
						+
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='reagentItemStatusId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemReagentStatus
						+ "'> </td>"
						+
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='assetItemManufactureId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstGoodReceiptNoteItemDto[i].itemManufactureName
						+ "'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].amcVal+"'   type='text' id='assetAmcValId"
						+ id
						+ "' class='form-control input-SmallText' value='0'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].pmVal+"' type='text' id='assetPmValId"
						+ id
						+ "' class='form-control input-SmallText' value='0'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].amcYear+"' type='text' id='assetAmcYearId"
						+ id
						+ "' class='form-control input-SmallText' value='0'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].pmYear+"' type='text' id='assetPmYearId"
						+ id
						+ "' class='form-control input-SmallText' value='0'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].productWarranty+"' type='text' id='assetProductWarrantyId"
						+ id
						+ "' class='form-control input-SmallText' value='0'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.lstGoodReceiptNoteItemDto[i].productWarrantyDuration+"' type='text' id='assetProductWarrantyDurationId"
						+ id
						+ "' class='form-control input-SmallText' value='0'> </td>"
						+"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  value='"+response.lstGoodReceiptNoteItemDto[i].productCategory+"' id='assetProductCategory"
						+ id
						+ "' class='form-control input-SmallText'> </td>"
						+"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  value='"+response.lstGoodReceiptNoteItemDto[i].isItemSlaveUsed+"' id='isItemSlaveUsed"
						+ id
						+ "' class='form-control input-SmallText'> </td>"
						+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='deleteSlave"
						+ id + "' class='form-control input-SmallText' isNew='true'> </td>" 
						//added row from purchase order to grn same item slave - by Vishnu 01-02-2021
						+ "<td class='col-md-3 col-xs-6 col-sm-3 center'><input disabled='disabled' style='width: 60px;' type='button' id='addNewRowWithSameItem"
						+ id
						+ "' class='btn btn-xs btn-success editUserAccess' value='Add' onclick='addExtraRowGrnButton(" + id +
						");'> </td>" 
						+"</tr>";
					}
				$("#RowCount").val(id);
			}

			$("#itemInfoDetails").html(htm);
			var totaltblsize = $("#RowCount").val();
			$("#totaltblsize").val(totaltblsize);
			if(response !=null && response !=''){
				getUploadedDocuments(response.id);
			}
			
		}
		//added by rohit on 23-08-2020
		if (response.lstItemAssetMaintenanceDto.length != 0
				&& response.lstItemAssetMaintenanceDto != null
				&& response.lstItemAssetMaintenanceDto != "") {
			var id = 0;
			var htm = "";
			for ( var i = 0; i < response.lstItemAssetMaintenanceDto.length; i++) {
				id++;
				htm = htm
						+ "<tr class='newAdded' id='multiTr"
						+ id
						+ "'>"
						+ "<td class='center'>"
						+ "<input type='checkbox' class='chkBatchItem' name='row' id='assetRowId"
						+ id
						+ "' value="
						+ id
						+ " onclick='getRadioButtonIndex(this.value)' autofocus='autofocus'><span style='display:none;' id='snum"
						+ id
						+ "'>"
						+ id
						+ "</span></td>"
						+ "<td class='center' style='display:none;'><input  style='width: 100px;' type='text' id='assetItemSlaveId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].id
						+ "'></td>"
						+ "<td class='center'><input  style='width: 100px;' autocomplete='off' type='text' id='serialNoAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].serialNo
						+ "'></td>"
						+ "<td class='center'><input  style='width: 250px;' type='text' id='itemNameAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].assetItemName
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 100px;display:none' type='text' id='itemAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].assetItemId
						+ "'></td>"
						+ "<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetManufactureNameId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].manufactureName
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetPartyNameId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].partyName
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetPartyMasterIdId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].partyMasterId
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 100px;display:none' type='text' id='assetAmcValAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].amcVal
						+ "'></td>"
						+ "<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetPmValAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].pmVal
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetAmcYearAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].amcYear
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetPmYearAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].pmYear
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetProductWarrantyAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].productWarranty
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetProductWarrantyDurationAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].productWarrantyDuration
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetUnitPriceAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].assetUnitPrice
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetProductCategoryAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].productCategory
						+ "'> </td>" 
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetlabEquipmentStatusAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].assetType
						+ "'> </td>"
						+ "</tr>";
			}

			$("#maintenanceTableInfoList").html(htm);

		}
	} else if (callFrom == 'purchaseOrder') {
		
		if (response.partyMasterDtos.partyMasterContactInfoDto.length != 0 &&
			response.partyMasterDtos.partyMasterContactInfoDto != null &&
			response.partyMasterDtos.partyMasterContactInfoDto != "") {
			length = response.partyMasterDtos.partyMasterContactInfoDto.length;
			var count = 0;
			var htm = "";
			for (var i = 0; i < length; i++) {
				count++;
				htm = htm +
					'<tr class="newAdded"> ' +
					' <td class="col-md-1 center">' +
					count +
					'</td>' +
					' <td class="col-md-1 center" id="contactPersonId' +
					count +
					'">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactName +
					'</td>' +
					' <td class="col-md-1 center" id="contactDesignationId' +
					count +
					'">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactDesignation +
					'</td>' +
					' <td class="col-md-1 center" id="contatcAddressId' +
					count +
					'">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactAddress +
					'</td>' +
					' <td class="col-md-1 center" id="contactGenderId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactGender +
					'</td>' +
					' <td class="col-md-1 center" id="contactDobId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactDob +
					'</td>' +
					' <td class="col-md-1 center" id="contactPhoneOneId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactPhoneNumber1 +
					'</td>' +
					' <td class="col-md-1 center" id="contactPhoneSecondId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactPhoneNumber2 +
					'</td>' +
					' <td class="col-md-1 center" id="contactMailId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactEmail +
					'</td>' +
					' <td class="col-md-1 center" id="contactInfoId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].id +
					'</td>' +
					' <td class="col-md-1 center"><input type="hidden" id="editContactPartMaster' +
					count + '" value="' + count + '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editContactInfoPartyMaster(' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].id +
					')"><i class="fa fa-edit"></i></button></td>' +
					' <td class="col-md-1 center">' +
					'	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="false" id ="deleteContactPartMaster' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].id +
					'" onclick="deletePartyMasterSlave(' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].id +
					',\'deleteContact\')" ' +
					'><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			}
			$("#PartyContactTableInfoList").html(htm);
		}
		if (response.partyMasterDtos.partyMasterAddressInfoDto.length != 0 &&
			response.partyMasterDtos.partyMasterAddressInfoDto != null &&
			response.partyMasterDtos.partyMasterAddressInfoDto != "") {
			length = response.partyMasterDtos.partyMasterAddressInfoDto.length;
			var count = 0;
			var htm = "";
			for (var i = 0; i < length; i++) {
				count++;
				htm = htm +
					'<tr class="newAdded"> ' +
					' <td class="col-md-1 center">' +
					count +
					'</td>' +
					' <td class="col-md-1 center" id="companyNameId' +
					count +
					'">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].companyName +
					'</td>' +
					' <td class="col-md-1 center" id="companyCountryId' +
					count +
					'">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].country +
					'</td>' +
					' <td class="col-md-1 center" id="companyCityId' +
					count +
					'">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].city +
					'</td>' +
					' <td class="col-md-1 center" id="companyAddressId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].address +
					'</td>' +
					' <td class="col-md-1 center" id="companyAddressTypeId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].addressType +
					'</td>' +
					' <td class="col-md-1 center" id="companyStreetId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].street +
					'</td>' +
					' <td class="col-md-1 center" id="companyAreaId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].area +
					'</td>' +
					' <td class="col-md-1 center" id="companyPinId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].pin +
					'</td>' +
					' <td class="col-md-1 center" id="companyDistrictId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].districtName +
					'</td>' +
					' <td class="col-md-1 center" id="companyTalukaId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].talukaName +
					'</td>' +
					' <td class="col-md-1 center" id="companyStateId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].state +
					'</td>'

					+
					' <td class="col-md-1 center" id="hiddenCountryNameId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].countryId +
					'</td>' +
					' <td class="col-md-1 center" id="hiddenStateNameId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].stateId +
					'</td>' +
					' <td class="col-md-1 center" id="hiddenDistrictNameId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].districtId +
					'</td>' +
					' <td class="col-md-1 center" id="hiddenTalukaNameId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].talukaId +
					'</td>' +
					' <td class="col-md-1 center" id="hiddenCityNameId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].cityId +
					'</td>' +
					' <td class="col-md-1 center" id="addressInfoId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].id +
					'</td>' +
					' <td class="col-md-1 center" id="addressInfoId1'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'+
					' <td class="col-md-1 center"><input type="hidden" id="editAddressPartMaster' +
					count + '" value="' + count + '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editAddressInfoPartyMaster(' +
					count +
					')"><i class="fa fa-edit"></i></button></td>' +
					' <td class="col-md-1 center">' +
					'	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="false" id ="deleteAddressPartMaster' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].id +
					'"  onclick="deletePartyMasterSlave(' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].id +
					',\'deleteAddress\')" ' +
					'><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
				$("#PartyAddressTableInfoList").html(htm);
			}
		}

		if (response.purchaseOrderItemSlaveDto.length != 0 &&
			response.purchaseOrderItemSlaveDto != null &&
			response.purchaseOrderItemSlaveDto != "") {
			length = response.purchaseOrderItemSlaveDto.length;
			var type1 = "fromNewGRN";
			callFromGrn ="GRN";
			var id = 0;
			var htm = "";
			var totalPendingQty = 0 ;
			for (var i = 0; i < length; i++) {
				id++;
				totalPendingQty = parseInt(totalPendingQty) + parseInt(response.purchaseOrderItemSlaveDto[i].itemQuantity);
				var expDate = "NA";
				htm = htm +
					"<tr class='newAdded' id='multiTr" +
					id +
					"' style='overflow-x:auto;'>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkGrnItem' id='checkbox" +
					id +
					"' value='" +
					id +
					"'></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><span id='snum" +
					id +
					"'>" +
					id +
					"</span><input type='hidden' id='slaveId" +
					id +
					"' value='0'></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center' id='goodsReceiptNoteItemName" +
					id +
					"'><input  style='width: 250px;' type='text' id='itemNameId" +
					id +
					"' class='form-control input-SmallText' data-name='goodReceiptNote'  onkeyup=fetchItemMasterGRNDetails(this.id,"+id+",'"+callFromGrn+"') value='" +
					response.purchaseOrderItemSlaveDto[i].itemName +
					"'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='number' id='itemQuantityId" +
					id +
					"' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup='totalAmount(this.id," +
					id +
					")' onchange='totalAmount(this.id," +
					id +
					")' value='" +
					response.purchaseOrderItemSlaveDto[i].itemQuantity +
					"'> <input type='hidden' id='txtPurchaseQuotationChangingItemQty" + id + "' value='0' /> <input type='hidden' id='txtlastUom" + id + "' value=''> <lable type='hidden' id ='lblPurchaseQuotationDocQuantity" + id + "'  style ='text-align:center;' value='" +
					response.purchaseOrderItemSlaveDto[i].itemQuantity +
					"' >" + response.purchaseOrderItemSlaveDto[i].itemQuantity + "</label> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' id='unitPriceId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemUnitPrice +"' onkeypress='return validateNumbers(event)'><lable id='uomUnitLatestFactorId"+id+"'>"+response.purchaseOrderItemSlaveDto[i].uomUnitLatestFactorName+" </lable> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' id='discountPerId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemTradeDiscount +
					"' onkeypress='return validateNumbers(event);' onkeyup='chkTradAmtorPercentage(this.id," +
					id +
					")' onblur='calculTradeDis(this.id," +
					id +
					")'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' id='discountRsId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemTradeDiscountRupees +
					"' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id," +
					id +
					")'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' disabled='disabled' id='discountAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemTradeDiscountAmount +
					"'  onkeypress='return validateNumbers(event);'> </div></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'   type='text' disabled='disabled' id='baseAmountId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemTradeBaseAmount +
					"' onkeypress='return validateNumbers(event);'> </div></td>" ;
				if(venderState == userState){
					htm = htm +	"<td id='documentByName'><div class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 60px;' type='text' id='gstId" +
					id +
					"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
					response.purchaseOrderItemSlaveDto[i].gst +
					"' onkeyup='rowAmtCalForGST(this.id," +
					id +
					");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst("+id+"," +id +");'> </div></td>" +
					"<td id='documentByName'> <div class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 60px;'  disabled='disabled' type='text' id='igstId" +
					id +
					"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
					response.purchaseOrderItemSlaveDto[i].igst +
					"' onkeyup='rowAmtCalForIGST(this.id," +
					id +
					");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount("+id+");autotaxCodeforItemIGST("+id+"," +id +");'> </div></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' disabled='disabled'  id='gstAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].gstAmountValue +
					"'> </td>" +
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' disabled  id='igstAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].igstAmountValue +
					"'> </td>";
				}else{
					htm = htm +	"<td id='documentByName'><div class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' type='text' id='gstId" +
					id +
					"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
					response.purchaseOrderItemSlaveDto[i].gst +
					"' onkeyup='rowAmtCalForGST(this.id," +
					id +
					");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst("+id+"," +id +");'> </div> </td>" +
					"<td id='documentByName'> <div class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 60px;'   type='text' id='igstId" +
					id +
					"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
					response.purchaseOrderItemSlaveDto[i].igst +
					"' onkeyup='rowAmtCalForIGST(this.id," +
					id +
					");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount("+id+");autotaxCodeforItemIGST("+id+"," +id +");'></div> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' disabled='disabled'  id='gstAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].gstAmountValue +
					"'> </td>" +
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' disabled  id='igstAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].igstAmountValue +
					"'> </td>";
				}
					
					
				htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled  type='text' disabled='disabled'  id='totalAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].totalAmount +
					"' onkeypress='return validateNumbers(event);'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='factor1" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemPurchaseFactorUom1 +
					"' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorOneNameId"+id+"'>"+response.purchaseOrderItemSlaveDto[i].uomUnitFactorOneName+" </lable> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' disabled type='text' id='factor2" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemPurchaseFactorUom2 +
					"' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorTwoNameId"+id+"'>"+response.purchaseOrderItemSlaveDto[i].uomUnitFactorTwoName+" </lable></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'> <input disabled='disabled' style='width: 60px;' disabled type='text' id='factor3" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemPurchaseFactorUom3 +
					"' onkeypress='return validateNumbers(event);'> <lable id='uomUnitFactorThreeNameId"+id+"'>"+response.purchaseOrderItemSlaveDto[i].uomUnitFactorThreeName+" </lable></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  disabled='disabled' style='width: 60px;' disabled type='text' id='factor4" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemPurchaseFactorUom4 +
					"'> <lable id='uomUnitFactorFourNameId"+id+"'>"+response.purchaseOrderItemSlaveDto[i].uomUnitFactorFourName+" </lable></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled='disabled'  type='text' id='itemExpectedQtyId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemActualQuantity +
					"'  onkeypress='return validateNumbers(event);' onkeyup='pendingAmount(this.id," +
					id +
					");'> </td>"
					//onclick='getBatchDetails(" + response.purchaseOrderItemSlaveDto[i].item_master_id + ");'
					+
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;display:none;'  type='hidden' id='totalReceivedQtyId" +
					id + "' class='form-control input-SmallText' value='0'><input style='width: 60px;'  type='text' id='itemReceivedQtyId" +
					id +
					"' class='form-control input-SmallText' value='0'  onkeypress='return validateNumbers(event);'  onblur=onkeyup=addRowAssetMaintenance(" + id + "); > </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='pendinQtyId" +
					id +
					"' class='form-control input-SmallText' value='"+response.purchaseOrderItemSlaveDto[i].itemActualQuantity+"' onkeypress='return validateNumbers(event);'> </td>" ;
					if(response.purchaseOrderItemSlaveDto[i].isItemBatchWise ==  "YES"){
						htm = htm +"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 100px;' type='text' id='batchId" +
						id +
						"' class='form-control input-SmallText' value='" +
						0 +
						"'  onblur='checkBatchAvailability(this.value,"+id+");'></td>";
					}else{
						htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 100px;' disabled type='text' id='batchId" +
						id +
						"' class='form-control input-SmallText' value='" +
						0 +
						"'  onblur='checkBatchAvailability(this.value,"+id+");'></td>";
					}		
					htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style='width: 100px;' id='batchKeyId" +
					id +
					"' class='form-control input-SmallText' value='" +
					0 +
					"'> </td>" +
					"<td class='col-md-3 col-xs-6 col-sm-3 center'><input  style='width: 100px;' type='button' id='getBatchDetailsId"
					+ id
					+ "' class='btn btn-xs btn-success editUserAccess'  data-toggle='modal' data-target='#batchWiseGoodReceiptNoteModal' value='Batch Details' onclick='getGoodReceiptNoteItemBatchDetails(" + id +","+response.purchaseOrderItemSlaveDto[i].item_master_id+");'> </td>" +
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input disabled style='width: 100px;' type='text' id='itemId" +
					id +
					"' class='form-control input-SmallText' value='" + response.purchaseOrderItemSlaveDto[i].item_master_id + "'></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;'  type='text' id='itemManufactureDateId" +
					id +
					"' class='form-control input-SmallText' value='NA' onclick='getMfgandexpyDate(this.id," +
					id +
					");'> </td>" +
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;'  type='text' id='itemExpireDateId" +
					id + "' class='form-control input-SmallText' value='" +
					expDate +
					"' onclick='getMfgandexpyDate(this.id," + id +
					");'></td>"
					
					+
					"<td class='col-md-6 col-xs-12 col-sm-6 center' '><input  style='width: 150px;' disabled type='text' id='itemTotalAmount" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].totalAmount +
					"'> </td>"

					+
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' disabled type='text' id='itemHsnNameId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].hsnNameValue +
					"'> </td>"	+
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' disabled type='text' id='itemHsnId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].hsnName +
					"'> </td>"	+
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' disabled type='text' id='itemTaxCodeId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].taxCode +
					"'> </td>"
					
					//added by rohit on 01-09-2020
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='assetItemStatusId"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.purchaseOrderItemSlaveDto[i].itemAssetStatus+"'> </td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='isItemBatchWiseId"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.purchaseOrderItemSlaveDto[i].isItemBatchWise+"'> </td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.purchaseOrderItemSlaveDto[i].manufactureName+"' type='text' id='assetItemManufactureId"
					+ id
					+ "' class='form-control input-SmallText' value='0'> </td>"
					+

					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.purchaseOrderItemSlaveDto[i].amcVal+"' type='text' id='assetAmcValId"
					+ id
					+ "' class='form-control input-SmallText' value='0'> </td>"
					+

					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.purchaseOrderItemSlaveDto[i].pmVal+"' type='text' id='assetPmValId"
					+ id
					+ "' class='form-control input-SmallText' value='0'> </td>"
					+

					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.purchaseOrderItemSlaveDto[i].amcYear+"' type='text' id='assetAmcYearId"
					+ id
					+ "' class='form-control input-SmallText' value='0'> </td>"
					+

					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.purchaseOrderItemSlaveDto[i].pmYear+"' type='text' id='assetPmYearId"
					+ id
					+ "' class='form-control input-SmallText' value='0'> </td>"
					+

					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.purchaseOrderItemSlaveDto[i].productWarranty+"' type='text' id='assetProductWarrantyId"
					+ id
					+ "' class='form-control input-SmallText' value='0'> </td>"
					+
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.purchaseOrderItemSlaveDto[i].productWarrantyDuration+"' type='text' id='assetProductWarrantyDurationId"
					+ id
					+ "' class='form-control input-SmallText' value='0'> </td>"
					+
					
					// added by Rohit to store product category type
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' value='"+response.purchaseOrderItemSlaveDto[i].productCategory+"' id='assetProductCategory"
					+ id
					+ "' class='form-control input-SmallText'> </td>"
					+
					
					// added by rohit lab equipment item type
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' value='"+response.purchaseOrderItemSlaveDto[i].itemLabEquipmentStatus+"' id='labEquipmentItemStatusId"
					+ id + "' class='form-control input-SmallText'> </td>"
					
					//added reagent from purchase order to grn item slave - by rohit 11-08-2020
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' disabled type='text' id='reagentItemStatusId"
					+ id
					+ "' class='form-control input-SmallText' value='"
					+ response.purchaseOrderItemSlaveDto[i].itemReagentStatus
					+ "'> </td>"
					
					//added row from purchase order to grn same item slave - by Vishnu 01-02-2021
					+ "<td class='col-md-3 col-xs-6 col-sm-3 center'><input disabled='disabled' style='width: 60px;' type='button' id='addNewRowWithSameItem"
					+ id
					+ "' class='btn btn-xs btn-success editUserAccess' value='Add' onclick='addExtraRowGrnButton(" + id +
					");'> </td>"
					+"</tr>";
				$("#finalTotalPendingQtyIdIssueGrn").val(parseInt(totalPendingQty)); 
			}
			$("#totalPendingQty").val(parseInt(totalPendingQty));
			$("#RowCount").val(parseInt(id));
			$("#itemInfoDetails").html(htm);
			var totaltblsize = $("#RowCount").val();
			$("#totaltblsize").val(totaltblsize);
		}

	}else if(callFrom == 'purchaseReOrder'){

		if (response.partyMasterDtos.partyMasterContactInfoDto.length != 0 &&
			response.partyMasterDtos.partyMasterContactInfoDto != null &&
			response.partyMasterDtos.partyMasterContactInfoDto != "") {
			length = response.partyMasterDtos.partyMasterContactInfoDto.length;
			var count = 0;
			var htm = "";
			for (var i = 0; i < length; i++) {
				count++;
				htm = htm +
					'<tr class="newAdded"> ' +
					' <td class="col-md-1 center">' +
					count +
					'</td>' +
					' <td class="col-md-1 center" id="contactPersonId' +
					count +
					'">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactName +
					'</td>' +
					' <td class="col-md-1 center" id="contactDesignationId' +
					count +
					'">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactDesignation +
					'</td>' +
					' <td class="col-md-1 center" id="contatcAddressId' +
					count +
					'">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactAddress +
					'</td>' +
					' <td class="col-md-1 center" id="contactGenderId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactGender +
					'</td>' +
					' <td class="col-md-1 center" id="contactDobId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactDob +
					'</td>' +
					' <td class="col-md-1 center" id="contactPhoneOneId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactPhoneNumber1 +
					'</td>' +
					' <td class="col-md-1 center" id="contactPhoneSecondId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactPhoneNumber2 +
					'</td>' +
					' <td class="col-md-1 center" id="contactMailId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactEmail +
					'</td>' +
					' <td class="col-md-1 center" id="contactInfoId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].id +
					'</td>' +
					' <td class="col-md-1 center"><input type="hidden" id="editContactPartMaster' +
					count + '" value="' + count + '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editContactInfoPartyMaster(' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].id +
					')"><i class="fa fa-edit"></i></button></td>' +
					' <td class="col-md-1 center">' +
					'	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="false" id ="deleteContactPartMaster' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].id +
					'" onclick="deletePartyMasterSlave(' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].id +
					',\'deleteContact\')" ' +
					'><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			}
			$("#PartyContactTableInfoList").html(htm);
		}
		if (response.partyMasterDtos.partyMasterAddressInfoDto.length != 0 &&
			response.partyMasterDtos.partyMasterAddressInfoDto != null &&
			response.partyMasterDtos.partyMasterAddressInfoDto != "") {
			length = response.partyMasterDtos.partyMasterAddressInfoDto.length;
			var count = 0;
			var htm = "";
			for (var i = 0; i < length; i++) {
				count++;
				htm = htm +
					'<tr class="newAdded"> ' +
					' <td class="col-md-1 center">' +
					count +
					'</td>' +
					' <td class="col-md-1 center" id="companyNameId' +
					count +
					'">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].companyName +
					'</td>' +
					' <td class="col-md-1 center" id="companyCountryId' +
					count +
					'">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].country +
					'</td>' +
					' <td class="col-md-1 center" id="companyCityId' +
					count +
					'">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].city +
					'</td>' +
					' <td class="col-md-1 center" id="companyAddressId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].address +
					'</td>' +
					' <td class="col-md-1 center" id="companyAddressTypeId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].addressType +
					'</td>' +
					' <td class="col-md-1 center" id="companyStreetId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].street +
					'</td>' +
					' <td class="col-md-1 center" id="companyAreaId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].area +
					'</td>' +
					' <td class="col-md-1 center" id="companyPinId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].pin +
					'</td>' +
					' <td class="col-md-1 center" id="companyDistrictId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].districtName +
					'</td>' +
					' <td class="col-md-1 center" id="companyTalukaId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].talukaName +
					'</td>' +
					' <td class="col-md-1 center" id="companyStateId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].state +
					'</td>'

					+
					' <td class="col-md-1 center" id="hiddenCountryNameId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].countryId +
					'</td>' +
					' <td class="col-md-1 center" id="hiddenStateNameId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].stateId +
					'</td>' +
					' <td class="col-md-1 center" id="hiddenDistrictNameId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].districtId +
					'</td>' +
					' <td class="col-md-1 center" id="hiddenTalukaNameId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].talukaId +
					'</td>' +
					' <td class="col-md-1 center" id="hiddenCityNameId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].cityId +
					'</td>' +
					' <td class="col-md-1 center" id="addressInfoId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].id +
					'</td>' +
					' <td class="col-md-1 center" id="addressInfoId1'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'+
					' <td class="col-md-1 center"><input type="hidden" id="editAddressPartMaster' +
					count + '" value="' + count + '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editAddressInfoPartyMaster(' +
					count +
					')"><i class="fa fa-edit"></i></button></td>' +
					' <td class="col-md-1 center">' +
					'	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="false" id ="deleteAddressPartMaster' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].id +
					'"  onclick="deletePartyMasterSlave(' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].id +
					',\'deleteAddress\')" ' +
					'><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
				$("#PartyAddressTableInfoList").html(htm);
			}
		}


		if (response.purchaseReOrderItemSlaveDto.length != 0 &&
			response.purchaseReOrderItemSlaveDto != null &&
			response.purchaseReOrderItemSlaveDto != "") {
			length = response.purchaseReOrderItemSlaveDto.length;
			var totalPendingQty = 0;
			var type1 = "fromNewGRN";
			callFromGrn ="GRN";
			var id = 0;
			var htm = "";
			for (var i = 0; i < length; i++) {
				id++;
				totalPendingQty = parseInt(totalPendingQty) + parseInt(response.purchaseReOrderItemSlaveDto[i].itemQuantity);
				var expDate = "NA";
				htm = htm +
					"<tr class='newAdded' id='multiTr" +
					id +
					"' style='overflow-x:auto;'>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkGrnItem' id='checkbox" +
					id +
					"' value='" +
					id +
					"'></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><span id='snum" +
					id +
					"'>" +
					id +
					"</span><input type='hidden' id='slaveId" +
					id +
					"' value='0'></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center' id='goodsReceiptNoteItemName" +
					id +
					"'><input  style='width: 250px;' type='text' id='itemNameId" +
					id +
					"' class='form-control input-SmallText' data-name='goodReceiptNote'  onkeyup=fetchItemMasterGRNDetails(this.id,"+id+",'"+callFromGrn+"') value='" +
					response.purchaseReOrderItemSlaveDto[i].itemName +
					"'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='number' id='itemQuantityId" +
					id +
					"' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup='totalAmount(this.id," +
					id +
					")' onchange='totalAmount(this.id," +
					id +
					")' value='" +
					response.purchaseReOrderItemSlaveDto[i].itemQuantity +
					"'> <input type='hidden' id='txtPurchaseQuotationChangingItemQty" + id + "' value='0' /> <input type='hidden' id='txtlastUom" + id + "' value=''> <lable type='hidden' id ='lblPurchaseQuotationDocQuantity" + id + "'  style ='text-align:center;' value='" +
					response.purchaseReOrderItemSlaveDto[i].itemQuantity +
					"' >" + response.purchaseReOrderItemSlaveDto[i].itemQuantity + "</label> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' id='unitPriceId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].itemUnitPrice +"' onkeypress='return validateNumbers(event)'><lable id='uomUnitLatestFactorId"+id+"'>"+response.purchaseReOrderItemSlaveDto[i].uomUnitLatestFactorName+" </lable> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' id='discountPerId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].itemTradeDiscount +
					"' onkeypress='return validateNumbers(event);' onkeyup='chkTradAmtorPercentage(this.id," +
					id +
					")' onblur='calculTradeDis(this.id," +
					id +
					")'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' id='discountRsId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].itemTradeDiscountRupees +
					"' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id," +
					id +
					")'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' disabled='disabled' id='discountAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].itemTradeDiscountAmount +
					"'  onkeypress='return validateNumbers(event);'> </div></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'   type='text' disabled='disabled' id='baseAmountId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].itemTradeBaseAmount +
					"' onkeypress='return validateNumbers(event);'> </div></td>" ;
				if(venderState == userState){
					htm = htm +	"<td id='documentByName'><div class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 60px;' type='text' id='gstId" +
					id +
					"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
					response.purchaseReOrderItemSlaveDto[i].gst +
					"' onkeyup='rowAmtCalForGST(this.id," +
					id +
					");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst("+id+"," +id +");'> </div></td>" +
					"<td id='documentByName'> <div class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 60px;'  disabled='disabled' type='text' id='igstId" +
					id +
					"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
					response.purchaseReOrderItemSlaveDto[i].igst +
					"' onkeyup='rowAmtCalForIGST(this.id," +
					id +
					");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount("+id+");autotaxCodeforItemIGST("+id+"," +id +");'> </div></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' disabled='disabled'  id='gstAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].gstAmountValue +
					"'> </td>" +
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' disabled  id='igstAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].igstAmountValue +
					"'> </td>";
				}else{
					htm = htm +	"<td id='documentByName'><div class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' type='text' id='gstId" +
					id +
					"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
					response.purchaseReOrderItemSlaveDto[i].gst +
					"' onkeyup='rowAmtCalForGST(this.id," +
					id +
					");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst("+id+"," +id +");'> </div> </td>" +
					"<td id='documentByName'> <div class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 60px;'   type='text' id='igstId" +
					id +
					"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
					response.purchaseReOrderItemSlaveDto[i].igst +
					"' onkeyup='rowAmtCalForIGST(this.id," +
					id +
					");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount("+id+");autotaxCodeforItemIGST("+id+"," +id +");'></div> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' disabled='disabled'  id='gstAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].gstAmountValue +
					"'> </td>" +
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  type='text' disabled  id='igstAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].igstAmountValue +
					"'> </td>";
				}
					
					
				htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled  type='text' disabled='disabled'  id='totalAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].totalAmount +
					"' onkeypress='return validateNumbers(event);'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='factor1" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].itemPurchaseFactorUom1 +
					"' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorOneNameId"+id+"'>"+response.purchaseReOrderItemSlaveDto[i].uomUnitFactorOneName+" </lable> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' disabled type='text' id='factor2" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].itemPurchaseFactorUom2 +
					"' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorTwoNameId"+id+"'>"+response.purchaseReOrderItemSlaveDto[i].uomUnitFactorTwoName+" </lable></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'> <input disabled='disabled' style='width: 60px;' disabled type='text' id='factor3" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].itemPurchaseFactorUom3 +
					"' onkeypress='return validateNumbers(event);'> <lable id='uomUnitFactorThreeNameId"+id+"'>"+response.purchaseReOrderItemSlaveDto[i].uomUnitFactorThreeName+" </lable></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  disabled='disabled' style='width: 60px;' disabled type='text' id='factor4" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].itemPurchaseFactorUom4 +
					"'> <lable id='uomUnitFactorFourNameId"+id+"'>"+response.purchaseReOrderItemSlaveDto[i].uomUnitFactorFourName+" </lable></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled='disabled'  type='text' id='itemExpectedQtyId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].itemActualQuantity +
					"'  onkeypress='return validateNumbers(event);' onkeyup='pendingAmount(this.id," +
					id +
					");'> </td>"
					//onclick='getBatchDetails(" + response.purchaseReOrderItemSlaveDto[i].item_master_id + ");'
					+
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;display:none;'  type='hidden' id='totalReceivedQtyId" +
					id + "' class='form-control input-SmallText' value='0'><input style='width: 60px;'  type='text' id='itemReceivedQtyId" +
					id +
					"' class='form-control input-SmallText' value='0'  onkeypress='return validateNumbers(event);'  onblur=onkeyup=addRowAssetMaintenance(" + id + "); > </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='pendinQtyId" +
					id +
					"' class='form-control input-SmallText' value='"+response.purchaseReOrderItemSlaveDto[i].itemActualQuantity+"' onkeypress='return validateNumbers(event);'> </td>" ;
					if(response.purchaseReOrderItemSlaveDto[i].isItemBatchWise ==  "YES"){
						htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 100px;' type='text' id='batchId" +
						id +
						"' class='form-control input-SmallText' value='" +
						0 +
						"'  onblur='checkBatchAvailability(this.value,"+id+");'></td>" ;
					}else{
						htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 100px;' disabled type='text' id='batchId" +
						id +
						"' class='form-control input-SmallText' value='" +
						0 +
						"'  onblur='checkBatchAvailability(this.value,"+id+");'></td>";
					}
					htm = htm +	"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style='width: 100px;' id='batchKeyId" +
					id +
					"' class='form-control input-SmallText' value='" +
					0 +
					"'> </td>" +
					"<td class='col-md-3 col-xs-6 col-sm-3 center'><input  style='width: 100px;' type='button' id='getBatchDetailsId"
					+ id
					+ "' class='btn btn-xs btn-success editUserAccess'  data-toggle='modal' data-target='#batchWiseGoodReceiptNoteModal' value='Batch Details' onclick='getGoodReceiptNoteItemBatchDetails(" + id +","+response.purchaseReOrderItemSlaveDto[i].item_master_id+");'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input disabled style='width: 100px;' type='text' id='itemId" +
					id +
					"' class='form-control input-SmallText' value='" + response.purchaseReOrderItemSlaveDto[i].item_master_id + "'></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;'  type='text' id='itemManufactureDateId" +
					id +
					"' class='form-control input-SmallText' value='NA' onclick='getMfgandexpyDate(this.id," +
					id +
					");'> </td>" +
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;'  type='text' id='itemExpireDateId" +
					id + "' class='form-control input-SmallText' value='" +
					expDate +
					"' onclick='getMfgandexpyDate(this.id," + id +
					");'></td>"
					
					+
					"<td class='col-md-6 col-xs-12 col-sm-6 center' '><input  style='width: 150px;' disabled type='text' id='itemTotalAmount" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].totalAmount +
					"'> </td>"

					+
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' disabled type='text' id='itemHsnNameId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].hsnNameValue +
					"'> </td>"	+
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' disabled type='text' id='itemHsnId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].hsnName +
					"'> </td>"	+
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' disabled type='text' id='itemTaxCodeId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseReOrderItemSlaveDto[i].taxCode +
					"'> </td>"
					
					//added by rohit on 01-09-2020
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='assetItemStatusId"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.purchaseReOrderItemSlaveDto[i].itemAssetStatus+"'> </td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;'  type='text' id='isItemBatchWiseId"
					+ id
					+ "' class='form-control input-SmallText' value='"+response.purchaseReOrderItemSlaveDto[i].isItemBatchWise+"'> </td>"
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.purchaseReOrderItemSlaveDto[i].manufactureName+"' type='text' id='assetItemManufactureId"
					+ id
					+ "' class='form-control input-SmallText' value='0'> </td>"
					+

					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.purchaseReOrderItemSlaveDto[i].amcVal+"' type='text' id='assetAmcValId"
					+ id
					+ "' class='form-control input-SmallText' value='0'> </td>"
					+

					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.purchaseReOrderItemSlaveDto[i].pmVal+"' type='text' id='assetPmValId"
					+ id
					+ "' class='form-control input-SmallText' value='0'> </td>"
					+

					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.purchaseReOrderItemSlaveDto[i].amcYear+"' type='text' id='assetAmcYearId"
					+ id
					+ "' class='form-control input-SmallText' value='0'> </td>"
					+

					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.purchaseReOrderItemSlaveDto[i].pmYear+"' type='text' id='assetPmYearId"
					+ id
					+ "' class='form-control input-SmallText' value='0'> </td>"
					+

					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.purchaseReOrderItemSlaveDto[i].productWarranty+"' type='text' id='assetProductWarrantyId"
					+ id
					+ "' class='form-control input-SmallText' value='0'> </td>"
					+
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' value='"+response.purchaseReOrderItemSlaveDto[i].productWarrantyDuration+"' type='text' id='assetProductWarrantyDurationId"
					+ id
					+ "' class='form-control input-SmallText' value='0'> </td>"
					+
					
					// added by Rohit to store product category type
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' value='"+response.purchaseReOrderItemSlaveDto[i].productCategory+"' id='assetProductCategory"
					+ id
					+ "' class='form-control input-SmallText'> </td>"
					+
					
					// added by rohit lab equipment item type
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' value='"+response.purchaseReOrderItemSlaveDto[i].itemLabEquipmentStatus+"' id='labEquipmentItemStatusId"
					+ id + "' class='form-control input-SmallText'> </td>"
					
					//added reagent from purchase order to grn item slave - by rohit 11-08-2020
					+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' disabled type='text' id='reagentItemStatusId"
					+ id
					+ "' class='form-control input-SmallText' value='"
					+ response.purchaseReOrderItemSlaveDto[i].itemReagentStatus
					+ "'> </td>"
					
					//added row from purchase order to grn same item slave - by Vishnu 01-02-2021
					+ "<td class='col-md-3 col-xs-6 col-sm-3 center'><input disabled='disabled' style='width: 60px;' type='button' id='addNewRowWithSameItem"
					+ id
					+ "' class='btn btn-xs btn-success editUserAccess' value='Add' onclick='addExtraRowGrnButton(" + id +
					");'> </td>"
					+ "</tr>";
				$("#finalTotalPendingQtyIdIssueGrn").val(parseInt(totalPendingQty)); 
			}
			$("#totalPendingQty").val(parseInt(totalPendingQty)); 
			$("#RowCount").val(parseInt(id));
			$("#itemInfoDetails").html(htm);
			var totaltblsize = $("#RowCount").val();
			$("#totaltblsize").val(totaltblsize);
		}
	}
}
function setViewGoodReceiptNoteSlaveInfo(response, callFrom,call) {
	var length = 0;
	if (callFrom === "goodReceiptNote") {

		if (response.partyMasterDto.partyMasterContactInfoDto.length != 0 &&
			response.partyMasterDto.partyMasterContactInfoDto != null &&
			response.partyMasterDto.partyMasterContactInfoDto != "") {
			length = response.partyMasterDto.partyMasterContactInfoDto.length;
			var count = 0;
			var htm = "";
			for (var i = 0; i < length; i++) {
				count++;
				htm = htm +
					'<tr class="newAdded"> ' +
					' <td class="col-md-1 center">' +
					count +
					'</td>' +
					' <td class="col-md-1 center" id="contactPersonId' +
					count +
					'">' +
					response.partyMasterDto.partyMasterContactInfoDto[i].contactName +
					'</td>' +
					' <td class="col-md-1 center" id="contactDesignationId' +
					count +
					'">' +
					response.partyMasterDto.partyMasterContactInfoDto[i].contactDesignation +
					'</td>' +
					' <td class="col-md-1 center" id="contatcAddressId' +
					count +
					'">' +
					response.partyMasterDto.partyMasterContactInfoDto[i].contactAddress +
					'</td>' +
					' <td class="col-md-1 center" id="contactGenderId' +
					count +
					'" style="display:none">' +
					response.partyMasterDto.partyMasterContactInfoDto[i].contactGender +
					'</td>' +
					' <td class="col-md-1 center" id="contactDobId' +
					count +
					'" style="display:none">' +
					response.partyMasterDto.partyMasterContactInfoDto[i].contactDob +
					'</td>' +
					' <td class="col-md-1 center" id="contactPhoneOneId' +
					count +
					'" style="display:none">' +
					response.partyMasterDto.partyMasterContactInfoDto[i].contactPhoneNumber1 +
					'</td>' +
					' <td class="col-md-1 center" id="contactPhoneSecondId' +
					count +
					'" style="display:none">' +
					response.partyMasterDto.partyMasterContactInfoDto[i].contactPhoneNumber2 +
					'</td>' +
					' <td class="col-md-1 center" id="contactMailId' +
					count +
					'" style="display:none">' +
					response.partyMasterDto.partyMasterContactInfoDto[i].contactEmail +
					'</td>' +
					' <td class="col-md-1 center" id="contactInfoId' +
					count +
					'" style="display:none">' +
					response.partyMasterDto.partyMasterContactInfoDto[i].id +
					'</td>' +
					' <td class="col-md-1 center"><input type="hidden" id="editContactPartMaster' +
					count + '" value="' + count + '"><button type="button" disabled class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editContactInfoPartyMaster(' +
					response.partyMasterDto.partyMasterContactInfoDto[i].id +
					')"><i class="fa fa-edit"></i></button></td>' +
					' <td class="col-md-1 center">' +
					'	<button type="button" class="btn btn-xs btn-danger disabled editBodyPartMaster deleteUserAccess" isNew="false" id ="deleteContactPartMaster' +
					response.partyMasterDto.partyMasterContactInfoDto[i].id +
					'" onclick="deletePartyMasterSlave(' +response.partyMasterDto.partyMasterContactInfoDto[i].id +',\'deleteContact\')" ' +'><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			}
			$("#PartyContactTableInfoList").html(htm);
			$("#saveContactInfo").hide();
			$("#restContactInfo").hide();
		}
		if (response.partyMasterDto.partyMasterAddressInfoDto.length != 0 &&
			response.partyMasterDto.partyMasterAddressInfoDto != null &&
			response.partyMasterDto.partyMasterAddressInfoDto != "") {
			length = response.partyMasterDto.partyMasterAddressInfoDto.length;
			var count = 0;
			var htm = "";
			for (var i = 0; i < length; i++) {
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
					+ '</td>'+
					' <td class="col-md-1 center"><input type="hidden" id="editAddressPartMaster' +
					count + '" value="' + count + '"><button type="button" disabled class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editAddressInfoPartyMaster(' +
					count +
					',\'fromDB\')"><i class="fa fa-edit"></i></button></td>' +
					' <td class="col-md-1 center">' +
					'	<button type="button" class="btn btn-xs btn-danger disabled editBodyPartMaster deleteUserAccess" isNew="false" id ="deleteAddressPartMaster' +
					response.partyMasterDto.partyMasterAddressInfoDto[i].id +
					'"  onclick="deletePartyMasterSlave(' +
					response.partyMasterDto.partyMasterAddressInfoDto[i].id +
					',\'deleteAddress\')" ' +
					'><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
				$("#PartyAddressTableInfoList").html(htm);
				
			}
			$("#saveAddressInfo").hide();
			$("#restAddressInfo").hide();
		}

		if (response.lstGoodReceiptNoteItemDto.length != 0 &&
			response.lstGoodReceiptNoteItemDto != null &&
			response.lstGoodReceiptNoteItemDto != "") {
			length = response.lstGoodReceiptNoteItemDto.length;
			var id = 0;
			callFromGrn = "GRN"
			var type = "fromNewGRN";
			var htm = "";
			for (var i = 0; i < length; i++) {
				id++;
				var expDate = getDate(response.lstGoodReceiptNoteItemDto[i].itemExpireDate);
				if(expDate =="1970-01-01"){
					expDate ="NA";
				}
				htm = htm +
					"<tr class='newAdded' id='multiTr" +
					id +
					"' style='overflow-x:auto;'>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkGrnItem' id='checkbox" +
					id +
					"' value='" +
					id +
					"'></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><span id='snum" +
					id +
					"'>" +
					id +
					"</span><input type='hidden' id='slaveId" +
					id +
					"' value='" + response.lstGoodReceiptNoteItemDto[i].id + "'></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center' id='goodsReceiptNoteItemName" +
					id +
					"'><input  style='width: 250px;' type='text' id='itemNameId" +
					id +
					"' class='form-control input-SmallText' data-name='goodReceiptNote' disabled onkeyup=fetchItemMasterGRNDetails(this.id,"+id+",'"+callFromGrn+"') value='" +
					response.lstGoodReceiptNoteItemDto[i].itemName +
					"'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled  type='number' id='itemQuantityId" +
					id +
					"' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup='totalAmount(this.id," +
					id +
					")' onchange='totalAmount(this.id," +
					id +
					")' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemQuantity +
					"'> <input type='hidden' id='txtPurchaseQuotationChangingItemQty" + id + "' value='0' /> <input type='hidden' id='txtlastUom" + id + "'value=''> <lable type='hidden' id ='lblPurchaseQuotationDocQuantity" + id + "'  style ='text-align:center;' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemQuantity +
					"' >" + response.lstGoodReceiptNoteItemDto[i].itemQuantity + "</label> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled style='width: 60px;' type='text' id='unitPriceId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemUnitPrice +"' onkeypress='return validateNumbers(event)'><lable id='uomUnitLatestFactorId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitLatestFactorName+" </lable> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled  type='text' id='discountPerId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemDiscountPer +
					"' onkeypress='return validateNumbers(event);' onkeyup='chkTradAmtorPercentage(this.id," +
					id +
					")' onblur='calculTradeDis(this.id," +
					id +
					")'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='discountRsId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemDiscountRs +
					"' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id," +
					id +
					")'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' disabled='disabled' id='discountAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemDiscountAmt +
					"'  onkeypress='return validateNumbers(event);'> </div></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  disabled type='text' disabled='disabled' id='baseAmountId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemBaseAmt +
					"' onkeypress='return validateNumbers(event);'> </div></td>" +
					"<td id='documentByName'><div class='col-md-6 col-xs-12 col-sm-6 center'><input disabled style='width: 60px;' type='text' id='gstId" +
					id +
					"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemGst +
					"'  onkeyup='rowAmtCalForGST(this.id," +
					id +
					");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst("+id+"," +id +");'></div> </td>" +
					"<td id='documentByName'> <div class='col-md-6 col-xs-12 col-sm-6 center'><input  disabled style='width: 60px;'  type='text' id='igstId" +
					id +
					"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemIgst +
					"' onkeyup='rowAmtCalForIGST(this.id," +
					id +
					");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount("+id+");autotaxCodeforItemIGST("+id+"," +	id +
					");'> </div></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' disabled='disabled'  id='gstAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemGstAmt +
					"'> </td>" +
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' disabled='disabled'  id='igstAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].igstAmount +
					"'> </td>" +
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled  type='text' disabled='disabled'  id='totalAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemTotalAmt +
					"' onkeypress='return validateNumbers(event);'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='factor1" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemFactor1 +
					"' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorOneNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorOneName+" </lable> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 60px;' disabled type='text' id='factor2" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemFactor2 +
					"' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorTwoNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorTwoName+" </lable></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'> <input  style='width: 60px;' disabled type='text' id='factor3" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemFactor3 +
					"' onkeypress='return validateNumbers(event);'> <lable id='uomUnitFactorThreeNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorThreeName+" </lable></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input   style='width: 60px;' disabled type='text' id='factor4" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemFactor4 +
					"'> <lable id='uomUnitFactorFourNameId"+id+"'>"+response.lstGoodReceiptNoteItemDto[i].uomUnitFactorFourName+" </lable></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled   type='text' id='itemExpectedQtyId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemExpectedQty +
					"'  onkeypress='return validateNumbers(event);' onkeyup='pendingAmount(this.id," +
					id +
					");'> </td>" +
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;display:none;'  type='hidden' id='totalReceivedQtyId" +
					id + "' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemReceivedQty +
					"'><input style='width: 60px;'  disabled type='text' id='itemReceivedQtyId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemReceivedQty +
					"'  onkeypress='return validateNumbers(event);' onblur=pendingAmount(this.id," +id+",'"+type+"');onkeyup=addRowAssetMaintenance(" + id + ");'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='pendinQtyId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemPendingQty +
					"' onkeypress='return validateNumbers(event);'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 100px;' disabled type='text' id='batchId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemBatchNo +
					"' onblur='checkBatchAvailability(this.value,"+id+");'></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' disabled style='width: 100px;' id='batchKeyId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].batchId +
					"'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 100px;' type='text' id='itemId" +
					id +
					"' class='form-control input-SmallText' value='" + response.lstGoodReceiptNoteItemDto[i].itemId + "'></td>" +
					
					"<td class='col-md-3 col-xs-6 col-sm-3 center'><input  disabled style='width: 100px;' type='button' id='getBatchDetailsId"
					+ id
					+ "' class='btn btn-xs btn-success editUserAccess'  data-toggle='modal' data-target='#batchWiseGoodReceiptNoteModal' value='Batch Details' onclick='getGoodReceiptNoteItemBatchDetails(" + id +","+response.lstGoodReceiptNoteItemDto[i].itemId+");'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;' disabled type='text' id='itemManufactureDateId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemManufactureDate +
					"' onclick='getMfgandexpyDate(this.id," +
					id +
					");'> </td>" +
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;' disabled type='text' id='itemExpireDateId" +
					id + "' class='form-control input-SmallText' value='" +
					expDate +
					"' onclick='getMfgandexpyDate(this.id," + id +
					");'></td>"
					
					+
					"<td class='col-md-6 col-xs-12 col-sm-6 center' '><input  style='width: 150px;' disabled type='text' id='itemTotalAmount" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].itemBaseIgstGstAmt +
					"'> </td>"	+
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input disabled style='width: 150px;'  type='text' id='itemHsnNameId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].hsnNameValue +
					"'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input disabled style='width: 150px;'  type='text' id='itemHsnId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].hsnName +
					"'> </td>" +
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  disabled style='width: 150px;'  type='text' id='itemTaxCodeId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.lstGoodReceiptNoteItemDto[i].taxCode +
					"'> </td>" +
					 "<td class='col-md-3 col-xs-6 col-sm-3 center'><input style='width: 60px;' disabled type='button' id='addNewRowWithSameItem"
					+ id + 
					"' class='btn btn-xs btn-success editUserAccess' value='Add' onclick='addExtraRowGrnButton(" + id +
					");'> </td>" +

					+
					"</tr>";
				$("#RowCount").val(id);
			}

			$("#itemInfoDetails").html(htm);
			
			var totaltblsize = $("#RowCount").val();
			$("#totaltblsize").val(totaltblsize);
		}
		
		getUploadedDocuments(response.id);
		
		if (response.lstItemAssetMaintenanceDto.length != 0
				&& response.lstItemAssetMaintenanceDto != null
				&& response.lstItemAssetMaintenanceDto != "") {
			var id = 0;
			var htm = "";
			for ( var i = 0; i < response.lstItemAssetMaintenanceDto.length; i++) {
				id++;
				htm = htm
						+ "<tr class='newAdded' id='multiTr"
						+ id
						+ "'>"
						+ "<td class='center'>"
						+ "<input type='checkbox'  disabled='disabled' class='chkBatchItem' name='row' id='assetRowId"
						+ id
						+ "' value="
						+ id
						+ " onclick='getRadioButtonIndex(this.value)' autofocus='autofocus'><span style='display:none;' id='snum"
						+ id
						+ "'>"
						+ id
						+ "</span></td>"
						+ "<td class='center' style='display:none;'><input disabled='disabled' style='width: 100px;' type='text' id='assetItemSlaveId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].id
						+ "'></td>"
						+ "<td class='center'><input  style='width: 100px;' autocomplete='off' disabled='disabled' type='text' id='serialNoAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].serialNo
						+ "'></td>"
						+ "<td class='center'><input  style='width: 250px;'  disabled='disabled' type='text' id='itemNameAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].assetItemName
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 100px;display:none' type='text' id='itemAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].assetItemId
						+ "'></td>"
						+ "<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetManufactureNameId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].manufactureName
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetPartyNameId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].partyName
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetPartyMasterIdId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].partyMasterId
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 100px;display:none' type='text' id='assetAmcValAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].amcVal
						+ "'></td>"
						+ "<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetPmValAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].pmVal
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetAmcYearAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].amcYear
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetPmYearAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].pmYear
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetProductWarrantyAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].productWarranty
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetProductWarrantyDurationAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].productWarrantyDuration
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetUnitPriceAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].assetUnitPrice
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetProductCategoryAssetId"
						+ id
						+ "' class='form-control input-SmallText' value='"
						+ response.lstItemAssetMaintenanceDto[i].productCategory
						+ "'> </td>" + "</tr>";
				}

				$("#maintenanceTableInfoList").html(htm);

			}
		
	} else if (callFrom == 'purchaseOrder') {
		

		if (response.partyMasterDtos.partyMasterContactInfoDto.length != 0 &&
			response.partyMasterDtos.partyMasterContactInfoDto != null &&
			response.partyMasterDtos.partyMasterContactInfoDto != "") {
			length = response.partyMasterDtos.partyMasterContactInfoDto.length;
			var count = 0;
			var htm = "";
			for (var i = 0; i < length; i++) {
				count++;
				htm = htm +
					'<tr class="newAdded"> ' +
					' <td class="col-md-1 center">' +
					count +
					'</td>' +
					' <td class="col-md-1 center" id="contactPersonId' +
					count +
					'">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactName +
					'</td>' +
					' <td class="col-md-1 center" id="contactDesignationId' +
					count +
					'">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactDesignation +
					'</td>' +
					' <td class="col-md-1 center" id="contatcAddressId' +
					count +
					'">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactAddress +
					'</td>' +
					' <td class="col-md-1 center" id="contactGenderId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactGender +
					'</td>' +
					' <td class="col-md-1 center" id="contactDobId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactDob +
					'</td>' +
					' <td class="col-md-1 center" id="contactPhoneOneId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactPhoneNumber1 +
					'</td>' +
					' <td class="col-md-1 center" id="contactPhoneSecondId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactPhoneNumber2 +
					'</td>' +
					' <td class="col-md-1 center" id="contactMailId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].contactEmail +
					'</td>' +
					' <td class="col-md-1 center" id="contactInfoId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].id +
					'</td>' +
					' <td class="col-md-1 center"><input type="hidden" id="editContactPartMaster' +
					count + '" value="' + count + '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editContactInfoPartyMaster(' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].id +
					')"><i class="fa fa-edit"></i></button></td>' +
					' <td class="col-md-1 center">' +
					'	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="false" id ="deleteContactPartMaster' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].id +
					'" onclick="deletePartyMasterSlave(' +
					response.partyMasterDtos.partyMasterContactInfoDto[i].id +
					',\'deleteContact\')" ' +
					'><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
			}
			$("#PartyContactTableInfoList").html(htm);
		}
		if (response.partyMasterDtos.partyMasterAddressInfoDto.length != 0 &&
			response.partyMasterDtos.partyMasterAddressInfoDto != null &&
			response.partyMasterDtos.partyMasterAddressInfoDto != "") {
			length = response.partyMasterDtos.partyMasterAddressInfoDto.length;
			var count = 0;
			var htm = "";
			for (var i = 0; i < length; i++) {
				count++;
				htm = htm +
					'<tr class="newAdded"> ' +
					' <td class="col-md-1 center">' +
					count +
					'</td>' +
					' <td class="col-md-1 center" id="companyNameId' +
					count +
					'">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].companyName +
					'</td>' +
					' <td class="col-md-1 center" id="companyCountryId' +
					count +
					'">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].country +
					'</td>' +
					' <td class="col-md-1 center" id="companyCityId' +
					count +
					'">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].city +
					'</td>' +
					' <td class="col-md-1 center" id="companyAddressId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].address +
					'</td>' +
					' <td class="col-md-1 center" id="companyAddressTypeId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].addressType +
					'</td>' +
					' <td class="col-md-1 center" id="companyStreetId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].street +
					'</td>' +
					' <td class="col-md-1 center" id="companyAreaId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].area +
					'</td>' +
					' <td class="col-md-1 center" id="companyPinId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].pin +
					'</td>' +
					' <td class="col-md-1 center" id="companyDistrictId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].districtName +
					'</td>' +
					' <td class="col-md-1 center" id="companyTalukaId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].talukaName +
					'</td>' +
					' <td class="col-md-1 center" id="companyStateId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].state +
					'</td>'

					+
					' <td class="col-md-1 center" id="hiddenCountryNameId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].countryId +
					'</td>' +
					' <td class="col-md-1 center" id="hiddenStateNameId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].stateId +
					'</td>' +
					' <td class="col-md-1 center" id="hiddenDistrictNameId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].districtId +
					'</td>' +
					' <td class="col-md-1 center" id="hiddenTalukaNameId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].talukaId +
					'</td>' +
					' <td class="col-md-1 center" id="hiddenCityNameId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].cityId +
					'</td>' +
					' <td class="col-md-1 center" id="addressInfoId' +
					count +
					'" style="display:none">' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].id +
					'</td>' +
					' <td class="col-md-1 center" id="addressInfoId1'
					+ count
					+ '" style="display:none">'
					+ count
					+ '</td>'+
					' <td class="col-md-1 center"><input type="hidden" id="editAddressPartMaster' +
					count + '" value="' + count + '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editAddressInfoPartyMaster(' +
					count +
					')"><i class="fa fa-edit"></i></button></td>' +
					' <td class="col-md-1 center">' +
					'	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="false" id ="deleteAddressPartMaster' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].id +
					'"  onclick="deletePartyMasterSlave(' +
					response.partyMasterDtos.partyMasterAddressInfoDto[i].id +
					',\'deleteAddress\')" ' +
					'><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
				$("#PartyAddressTableInfoList").html(htm);
			}
		}


		if (response.purchaseOrderItemSlaveDto.length != 0 &&
			response.purchaseOrderItemSlaveDto != null &&
			response.purchaseOrderItemSlaveDto != "") {
			length = response.purchaseOrderItemSlaveDto.length;
			var type = "fromNewGRN";
			var callFromGrn = "GRN";
			var id = 0;
			var htm = "";
			for (var i = 0; i < length; i++) {
				id++;
				var expDate = "NA";
				htm = htm +
					"<tr class='newAdded' id='multiTr" +
					id +
					"' style='overflow-x:auto;'>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkGrnItem' id='checkbox" +
					id +
					"' value='" +
					id +
					"'></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><span id='snum" +
					id +
					"'>" +
					id +
					"</span><input type='hidden' id='slaveId" +
					id +
					"' value='" + response.purchaseOrderItemSlaveDto[i].id + "'></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center' id='goodsReceiptNoteItemName" +
					id +
					"'><input  style='width: 250px;' type='text' id='itemNameId" +
					id +
					"' class='form-control input-SmallText' data-name='goodReceiptNote' disabled onkeyup=fetchItemMasterGRNDetails(this.id,"+id+",'"+callFromGrn+"') value='" +
					response.purchaseOrderItemSlaveDto[i].itemName +
					"'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='number' id='itemQuantityId" +
					id +
					"' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup='totalAmount(this.id," +
					id +
					")' onchange='totalAmount(this.id," +
					id +
					")' value='" +
					response.purchaseOrderItemSlaveDto[i].itemQuantity +
					"'> <input type='hidden' id='txtPurchaseQuotationChangingItemQty" + id + "' value='0' /> <input type='hidden' id='txtlastUom" + id + "'value=''> <lable type='hidden' id ='lblPurchaseQuotationDocQuantity" + id + "'  style ='text-align:center;' value='" +
					response.purchaseOrderItemSlaveDto[i].itemQuantity +
					"' >" + response.purchaseOrderItemSlaveDto[i].itemQuantity + "</label> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='unitPriceId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemUnitPrice + "' onkeypress='return validateNumbers(event)'><lable id='uomUnitLatestFactorId"+id+"'>"+response.purchaseOrderItemSlaveDto[i].uomUnitLatestFactorName+" </lable> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='discountPerId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemTradeDiscount +
					"' onkeypress='return validateNumbers(event);' onkeyup='chkTradAmtorPercentage(this.id," +
					id +
					")' onblur='calculTradeDis(this.id," +
					id +
					")'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='discountRsId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemTradeDiscountRupees +
					"' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id," +
					id +
					")'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' disabled='disabled' id='discountAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemTradeDiscountAmount +
					"'  onkeypress='return validateNumbers(event);'> </div></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  disabled type='text' disabled='disabled' id='baseAmountId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemTradeBaseAmount +
					"' onkeypress='return validateNumbers(event);'> </div></td>" +
					"<td id='documentByName'><div class='col-md-6 col-xs-12 col-sm-6 center'><input disabled style='width: 60px;' type='text' id='gstId" +
					id +
					"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
					response.purchaseOrderItemSlaveDto[i].gst +
					"' onkeyup='rowAmtCalForGST(this.id," +
					id +
					");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst("+id+"," +id +");'></div> </td>" +
					"<td id='documentByName'> <div class='col-md-6 col-xs-12 col-sm-6 center'><input disabled style='width: 60px;'  type='text' id='igstId" +
					id +
					"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='" +
					response.purchaseOrderItemSlaveDto[i].igst +
					"' onkeyup='rowAmtCalForIGST(this.id," +
					id +
					");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount("+id+");autotaxCodeforItemIGST("+id+"," +id +");'></div> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' disabled='disabled'  id='gstAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].gstAmountValue +
					"'> </td>" +
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' disabled='disabled'  id='igstAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].igstAmountValue +
					"'> </td>" +
					
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled  type='text' disabled='disabled'  id='totalAmtId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].totalAmount +
					"' onkeypress='return validateNumbers(event);'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='factor1" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemPurchaseFactorUom1 +
					"' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorOneNameId"+id+"'>"+response.purchaseOrderItemSlaveDto[i].uomUnitFactorOneName+" </lable> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input disabled='disabled' style='width: 60px;' disabled type='text' id='factor2" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemPurchaseFactorUom2 +
					"' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorTwoNameId"+id+"'>"+response.purchaseOrderItemSlaveDto[i].uomUnitFactorTwoName+" </lable></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'> <input disabled='disabled' style='width: 60px;' disabled type='text' id='factor3" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemPurchaseFactorUom3 +
					"' onkeypress='return validateNumbers(event);'> <lable id='uomUnitFactorThreeNameId"+id+"'>"+response.purchaseOrderItemSlaveDto[i].uomUnitFactorThreeName+" </lable></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  disabled='disabled' style='width: 60px;' disabled type='text' id='factor4" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemPurchaseFactorUom4 +
					"'> <lable id='uomUnitFactorFourNameId"+id+"'>"+response.purchaseOrderItemSlaveDto[i].uomUnitFactorFourName+" </lable></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled='disabled'  type='text' id='itemExpectedQtyId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemActualQuantity +
					"'  onkeypress='return validateNumbers(event);' onkeyup='pendingAmount(this.id," +
					id +
					");'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;display:none;'  type='hidden' id='totalReceivedQtyId" +
					id + "' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemActualQuantity +
					"'><input style='width: 60px;'   type='text' id='itemReceivedQtyId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].itemActualQuantity +
					"'  onkeypress='return validateNumbers(event);getBatchDetails(" + response.purchaseOrderItemSlaveDto[i].item_master_id + ");' onblur=pendingAmount(this.id," +id+",'"+type+"');getBatchDetails(" + response.purchaseOrderItemSlaveDto[i].item_master_id + ");onkeyup=addRowAssetMaintenance(" + id + ");'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled type='text' id='pendinQtyId" +
					id +
					"' class='form-control input-SmallText' value='0' onkeypress='return validateNumbers(event);'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 100px;' type='text' id='batchId" +
					id +
					"' class='form-control input-SmallText' value='" +
					0 +
					"'  onblur='checkBatchAvailability(this.value,"+id+");'></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style='width: 100px;' id='batchKeyId" +
					id +
					"' class='form-control input-SmallText' value='" +
					0 +
					"'> </td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input disabled style='width: 100px;' type='text' id='itemId" +
					id +
					"' class='form-control input-SmallText' value='" + response.purchaseOrderItemSlaveDto[i].item_master_id + "'></td>" +
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;'  type='text' id='itemManufactureDateId" +
					id +
					"' class='form-control input-SmallText' value='NA' onclick='getMfgandexpyDate(this.id," +
					id +
					");'> </td>" +
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center'><input  style='width: 150px;'  type='text' id='itemExpireDateId" +
					id + "' class='form-control input-SmallText' value='" +
					expDate +
					"' onclick='getMfgandexpyDate(this.id," + id +
					");'></td>"
					
					+
					"<td class='col-md-6 col-xs-12 col-sm-6 center' '><input  style='width: 150px;' disabled type='text' id='itemTotalAmount" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].totalAmount +
					"'> </td>"	+
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' disabled type='text' id='itemHsnNameId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].hsnNameValue +
					"'> </td>" +
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' disabled type='text' id='itemHsnId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].hsnName +
					"'> </td>" +
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input  style='width: 150px;' disabled type='text' id='itemTaxCodeId" +
					id +
					"' class='form-control input-SmallText' value='" +
					response.purchaseOrderItemSlaveDto[i].taxCode +
					"'> </td>"

					+
					"</tr>";
				$("#RowCount").val(parseInt(id));
			}

			$("#itemInfoDetails").html(htm);
			var totaltblsize = $("#RowCount").val();
			$("#totaltblsize").val(totaltblsize);
		}

	}
}


function deleteItemSlaveRow(itemSlaveId){
	if(itemSlaveId !=null && itemSlaveId !="" && itemSlaveId !=undefined){
		if(confirm("Do you want to delete this row ?")){
			var inputs = [];
			inputs.push('id=' + itemSlaveId);
			var str = inputs.join('&');
			jQuery.ajax({
				async: false,
				type: "POST",
				url: "ehat/invGoodReceiptNote/deleteGoodReceiptNoteItem",
				data: str + "&reqType=AJAX",
				error: function () {
					alert('error');
				},
				success: function (response) {
					if(response == true){
						//removeRowFromTable('grnItemInfoTable','chkGrnItem');
						alertify.success("Records Deleted Sucessfully...!");
					}else{
						alertify.error("Something went wrong...!");
					}
				}
			});
		}
	}

	
}
function printGoodsReceiptNote(grnId) {
	window.open("inv_good_receipt_note_print.jsp?grnId=" + grnId);
}


function getItemMasterSlaveGRNDetails(itemMasterId) {
	getItemMasterSlaveDetailsInGRNById(itemMasterId);
}
/**
 * 
 * @param itemMasterId
 */
function getItemMasterSlaveDetailsInGRNById(itemMasterId) {
	var inputs = [];
	inputs.push('id=' + itemMasterId);
	var str = inputs.join('&');
	jQuery
		.ajax({
			async: true,
			type: 'POST',
			data: str + "&reqType=AJAX",
			url: 'ehat/inventoryPurchaseOrder/getItemMasterSlaveDetails',
			timeout: 1000 * 60 * 5,
			catche: false,
			success: function (response) {
				length = response.itemPurchaseSlaveDto.length;
				var id = 0;
				var htm = "";
				if(parseInt(length) == 0){
					alert("No Purchase Related Info Found For This Respective Item..!!");
					return false;
				}
				else{
				for (var i = 0; i < response.itemPurchaseSlaveDto.length; i++) {
					//alert("ro::"+response.itemPurchaseSlaveDto.length);
					var newItemSlaveRowCount ="0";
					newItemSlaveRowCount = $("#grnItemCurrentRowIndexId").val();
					
					if (i == 0) {
						$("#itemMasterSlaveRecordList")
							.html(
								"<tr><td>" +
								"<input type='radio' name='row' id='rowId" +
								i +
								"' value=" +
								i +
								" onclick='getRadioButtonIndex(this.value)' autofocus='autofocus'></td>" +
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='itemNamePurchaseFactId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td style='display: none;'><input type='text'" +
								"class='form-control input-SmallText'  id='itemQuantityId" +
								i +
								"'" +
								"tabindex='-1' /></td>"

								+
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='purchaseUnitPriceOneId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td style='display:none;' ><input type='text'" +
								"class='form-control input-SmallText'  id='isItemBatchWise" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='cgstRateId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='sgstRateId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='taxNameId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='taxRateId" +
								i +
								"'" +
								"tabindex='-1' /></td>"

								+
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='purchaseUomFactorOneId" +
								i +
								"'" +
								"tabindex='-1' /></td>"

								+
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='purchaseUomFactorTwoId" +
								i +
								"'" +
								"tabindex='-1' /></td>"

								+
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='purchaseUomFactorThreeId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='purchaseUomFactorFourId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								
								
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
								
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='purchaseItemId" +
								i +
								"'" +
								"tabindex='-1' value=''/></td>" +
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='hsnName" +
								i +
								"'" +
								"tabindex='-1' value=''/></td>" +
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='hsnNameNewId" +
								i +
								"'" +
								"tabindex='-1' value=''/></td>"
								//added by rohit on 22-08-2020
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
								"<td style='display:none;'><input type='hidden'"
								+ "class='form-control input-SmallText'  id='assetProductWarrantyDurationId1"
								+ i
								+ "'"
								+ "tabindex='-1' value=''/></td>"
								+
								// added by rohit to hold
								// asset product category
								"<td style='display:none;'><input type='hidden'"
								+ "class='form-control input-SmallText'  id='assetProductCategoryItemPopUpId"
								+ i
								+ "'"
								+ "tabindex='-1' value=''/></td>"
								+
								//asset item status
								"<td style='display:none;'><input type='hidden'"
								+ "class='form-control input-SmallText'  id='assetItemStatus"
								+ i
								+ "'"
								+ "tabindex='-1' value=''/><input type='hidden'"
								+ "class='form-control input-SmallText'  id='assetItemStatus2"
								+ newItemSlaveRowCount
								+ "'"
								+ "tabindex='-1' value=''/></td>"
								+
								//lab equipment status
								"<td style='display:none;'><input type='hidden'"
								+ "class='form-control input-SmallText'  id='labEquipmentItemStatus"
								+ i
								+ "'"
								+ "tabindex='-1' value=''/></td>"+
								
								//to check reagent item type
								"<td style='display:none;'><input type='hidden'"
								+ "class='form-control input-SmallText'  id='reagentItemStatus"
								+ i
								+ "'"
								+ "tabindex='-1' value=''/></td>"+
								"</tr>");

					} else {
						$("#itemMasterSlaveRecordList")
							.append(
								"<tr><td>" +
								"<input type='radio' name='row' id='rowId" +
								i +
								"' value=" +
								i +
								" onclick='getRadioButtonIndex(this.value)' autofocus='autofocus'></td>" +
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='itemNamePurchaseFactId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td style='display:none'><input type='text'" +
								"class='form-control input-SmallText'  id='purchaseItemId" +
								i +
								"'" +
								"tabindex='-1' value=''/></td>" +
								"<td style='display: none;'><input type='text'" +
								"class='form-control input-SmallText'  id='itemQuantityId" +
								i +
								"'" +
								"tabindex='-1' /></td>"

								+
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='purchaseUnitPriceOneId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td style='display:none;' ><input type='text'" +
								"class='form-control input-SmallText'  id='isItemBatchWise" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='cgstRateId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='sgstRateId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='taxNameId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='taxRateId" +
								i +
								"'" +
								"tabindex='-1' /></td>"
								+
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='purchaseUomFactorOneId" +
								i +
								"'" +
								"tabindex='-1' /></td>"

								+
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='purchaseUomFactorTwoId" +
								i +
								"'" +
								"tabindex='-1' /></td>"

								+
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='purchaseUomFactorThreeId" +
								i +
								"'" +
								"tabindex='-1' /></td>"

								+
								"<td><input type='text'" +
								"class='form-control input-SmallText'  id='purchaseUomFactorFourId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								
								
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
								
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='hsnName" +
								i +
								"'" +
								"tabindex='-1' value=''/></td>" +
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='hsnNameNewId" +
								i +
								"'" +
								"tabindex='-1' value=''/></td>"
								//added by rohit on 22-08-2020
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
								"<td style='display:none;'><input type='hidden'"
								+ "class='form-control input-SmallText'  id='assetProductWarrantyDurationId1"
								+ i
								+ "'"
								+ "tabindex='-1' value=''/></td>"
								+

								// added by rohit to hold
								// asset product category
								"<td style='display:none;'><input type='hidden'"
								+ "class='form-control input-SmallText'  id='assetProductCategoryItemPopUpId"
								+ i
								+ "'"
								+ "tabindex='-1' value=''/></td>"
								+
								//asset item status
								"<td style='display:none;'><input type='hidden'"
								+ "class='form-control input-SmallText'  id='assetItemStatus"
								+ i
								+ "'"
								+ "tabindex='-1' value=''/></td>"
								+
								//lab equipment status
								"<td style='display:none;'><input type='hidden'"
								+ "class='form-control input-SmallText'  id='labEquipmentItemStatus"
								+ i
								+ "'"
								+ "tabindex='-1' value=''/></td>"+
								
								//to check reagent item type
								"<td style='display:none;'><input type='hidden'"
								+ "class='form-control input-SmallText'  id='reagentItemStatus"
								+ i
								+ "'"
								+ "tabindex='-1' value=''/></td>"+
								"</tr>");

					}
					var unit1 = response.itemPurchaseSlaveDto[i].purchaseUnitPrice1;
					var unit2 = response.itemPurchaseSlaveDto[i].purchaseUnitPrice2;
					var unit3 = response.itemPurchaseSlaveDto[i].purchaseUnitPrice3;
					var unit4 = response.itemPurchaseSlaveDto[i].purchaseUnitPrice4;
					if (response.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0 &&
						response.itemPurchaseSlaveDto[i].purchaseUomFactor2 == 0) {
						if(unit1 != 0 && unit2 == 0){
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice1);
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) == 0 && parseInt(unit4) == 0){
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice2);
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) == 0){
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice3);
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) != 0){
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice4);
						}
						//$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice1);
						$("#purchaseUomFactorOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor1);
						$("#purchaseUomFactorTwoId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor2);
						$("#purchaseUomFactorThreeId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor3);
						$("#purchaseUomFactorFourId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor4);
						$("#itemNamePurchaseFactId" + i).val(response.itemName);
						$("#cgstRateId" + i).val(response.cgst);
						$("#sgstRateId" + i).val(response.sgst);
						$("#taxNameId" + i).val(response.taxName);
						$("#taxRateId" + i).val(response.taxRate);
						$("#isItemBatchWise" + i).val(response.batchWise);
						$("#purchaseItemId" + i).val(response.id);
						$("#hsnName" + i).val(response.hsnName);
						$("#hsnNameNewId" + i).val(response.hsnNameValue);
						
						$("#uomUnitOneNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitOneName);
						$("#uomUnitTwoNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitTwoName);
						$("#uomUnitThreeNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitThreeName);
						$("#uomUnitFourNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitFourName);
						//added by rohit  on 22-08-2020
						$("#manufactureName" + i).val(response.companyName);
						$("#assetItemStatus" + i).val(response.assetItemStatus);
						
						
						$("#labEquipmentItemStatus" + i).val(response.labEquipmentStatus);
						$("#reagentItemStatus" + i).val(response.reagentItemStatus);
						$("#assetProductCategoryItemPopUpId" + i).val(response.categoryType);
						$("#assetAmcValId1" + i).val(response.itemMaintenanceSlaveDto.amccmcFreeTextDuration);
						$("#assetPmValId1" + i).val(response.itemMaintenanceSlaveDto.preventiveMaintenanceFreeTextDuration);
						$("#assetAmcYearId1" + i).val(response.itemMaintenanceSlaveDto.amccmcDuration);
						$("#assetPmYearId1" + i).val(response.itemMaintenanceSlaveDto.preventiveMaintenanceDuration);
						$("#assetProductWarrantyId1" + i).val(response.itemMaintenanceSlaveDto.warrantyWithProduct);
						$("#assetProductWarrantyDurationId1" + i).val(response.itemMaintenanceSlaveDto.warrantyWithProductDuration);
						
						//added by vishant 
						
						$("#assetItemStatus2" + newItemSlaveRowCount).val(response.assetItemStatus);
						
						
					} else if (response.itemPurchaseSlaveDto[i].purchaseUomFactor2 != 0 &&
						response.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0 &&
						response.itemPurchaseSlaveDto[i].purchaseUomFactor3 == 0 &&
						response.itemPurchaseSlaveDto[i].purchaseUomFactor4 == 0) {
						if(unit1 != 0 && unit2 == 0){
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice1);
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) == 0 && parseInt(unit4) == 0){
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice2);
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) == 0){
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice3);
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) != 0){
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice4);
						}
						//$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice2);
						$("#purchaseUomFactorOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor1);
						$("#purchaseUomFactorTwoId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor2);
						$("#purchaseUomFactorThreeId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor3);
						$("#purchaseUomFactorFourId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor4);
						$("#itemNamePurchaseFactId" + i).val(response.itemName);
						$("#cgstRateId" + i).val(response.cgst);
						$("#sgstRateId" + i).val(response.sgst);
						$("#taxNameId" + i).val(response.taxName);
						$("#taxRateId" + i).val(response.taxRate);
						$("#isItemBatchWise" + i).val(response.batchWise);
						$("#purchaseItemId" + i).val(response.id);
						$("#hsnName" + i).val(response.hsnName);
						$("#hsnNameNewId" + i).val(response.hsnNameValue);
						
						$("#uomUnitOneNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitOneName);
						$("#uomUnitTwoNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitTwoName);
						$("#uomUnitThreeNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitThreeName);
						$("#uomUnitFourNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitFourName);
						//added by rohit  on 22-08-2020
						$("#manufactureName" + i).val(response.companyName);
						$("#assetItemStatus" + i).val(response.assetItemStatus);
						$("#labEquipmentItemStatus" + i).val(response.labEquipmentStatus);
						$("#reagentItemStatus" + i).val(response.reagentItemStatus);
						$("#assetProductCategoryItemPopUpId" + i).val(response.categoryType);
						$("#assetAmcValId1" + i).val(response.itemMaintenanceSlaveDto.amccmcFreeTextDuration);
						$("#assetPmValId1" + i).val(response.itemMaintenanceSlaveDto.preventiveMaintenanceFreeTextDuration);
						$("#assetAmcYearId1" + i).val(response.itemMaintenanceSlaveDto.amccmcDuration);
						$("#assetPmYearId1" + i).val(response.itemMaintenanceSlaveDto.preventiveMaintenanceDuration);
						$("#assetProductWarrantyId1" + i).val(response.itemMaintenanceSlaveDto.warrantyWithProduct);
						$("#assetProductWarrantyDurationId1" + i).val(response.itemMaintenanceSlaveDto.warrantyWithProductDuration);
					} else if (response.itemPurchaseSlaveDto[i].purchaseUomFactor3 != 0 &&
						response.itemPurchaseSlaveDto[i].purchaseUomFactor2 != 0 &&
						response.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0 &&
						response.itemPurchaseSlaveDto[i].purchaseUomFactor4 == 0) {
						if(unit1 != 0 && unit2 == 0){
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice1);
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) == 0 && parseInt(unit4) == 0){
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice2);
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) == 0){
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice3);
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) != 0){
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice4);
						}
						//$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice3);
						$("#purchaseUomFactorOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor1);
						$("#purchaseUomFactorTwoId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor2);
						$("#purchaseUomFactorThreeId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor3);
						$("#purchaseUomFactorFourId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor4);
						$("#itemNamePurchaseFactId" + i).val(response.itemName);
						$("#cgstRateId" + i).val(response.cgst);
						$("#sgstRateId" + i).val(response.sgst);
						$("#taxNameId" + i).val(response.taxName);
						$("#taxRateId" + i).val(response.taxRate);
						$("#isItemBatchWise" + i).val(response.batchWise);
						$("#purchaseItemId" + i).val(response.id);
						$("#hsnName" + i).val(response.hsnName);
						$("#hsnNameNewId" + i).val(response.hsnNameValue);
						
						$("#uomUnitOneNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitOneName);
						$("#uomUnitTwoNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitTwoName);
						$("#uomUnitThreeNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitThreeName);
						$("#uomUnitFourNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitFourName);
						//added by rohit  on 22-08-2020
						$("#manufactureName" + i).val(response.companyName);
						$("#assetItemStatus" + i).val(response.assetItemStatus);
						$("#labEquipmentItemStatus" + i).val(response.labEquipmentStatus);
						$("#reagentItemStatus" + i).val(response.reagentItemStatus);
						$("#assetProductCategoryItemPopUpId" + i).val(response.categoryType);
						$("#assetAmcValId1" + i).val(response.itemMaintenanceSlaveDto.amccmcFreeTextDuration);
						$("#assetPmValId1" + i).val(response.itemMaintenanceSlaveDto.preventiveMaintenanceFreeTextDuration);
						$("#assetAmcYearId1" + i).val(response.itemMaintenanceSlaveDto.amccmcDuration);
						$("#assetPmYearId1" + i).val(response.itemMaintenanceSlaveDto.preventiveMaintenanceDuration);
						$("#assetProductWarrantyId1" + i).val(response.itemMaintenanceSlaveDto.warrantyWithProduct);
						$("#assetProductWarrantyDurationId1" + i).val(response.itemMaintenanceSlaveDto.warrantyWithProductDuration);
					} else if (response.itemPurchaseSlaveDto[i].purchaseUomFactor4 != 0 &&
						response.itemPurchaseSlaveDto[i].purchaseUomFactor3 != 0 &&
						response.itemPurchaseSlaveDto[i].purchaseUomFactor2 != 0 &&
						response.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0) {
						if(unit1 != 0 && unit2 == 0){
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice1);
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) == 0 && parseInt(unit4) == 0){
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice2);
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) == 0){
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice3);
						}else if(parseInt(unit1) != 0 && parseInt(unit2) != 0 && parseInt(unit3) != 0 && parseInt(unit4) != 0){
							$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice4);
						}
						//$("#purchaseUnitPriceOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUnitPrice4);
						$("#purchaseUomFactorOneId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor1);
						$("#purchaseUomFactorTwoId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor2);
						$("#purchaseUomFactorThreeId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor3);
						$("#purchaseUomFactorFourId" + i).val(response.itemPurchaseSlaveDto[i].purchaseUomFactor4);
						$("#itemNamePurchaseFactId" + i).val(response.itemName);
						$("#cgstRateId" + i).val(response.cgst);
						$("#sgstRateId" + i).val(response.sgst);
						$("#taxNameId" + i).val(response.taxName);
						$("#taxRateId" + i).val(response.taxRate);
						$("#isItemBatchWise" + i).val(response.batchWise);
						$("#purchaseItemId" + i).val(response.id);
						$("#hsnName" + i).val(response.hsnName);
						$("#hsnNameNewId" + i).val(response.hsnNameValue);
						
						$("#uomUnitOneNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitOneName);
						$("#uomUnitTwoNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitTwoName);
						$("#uomUnitThreeNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitThreeName);
						$("#uomUnitFourNameId" + i).val(response.itemPurchaseSlaveDto[i].uomUnitFourName);
						//added by rohit  on 22-08-2020
						$("#manufactureName" + i).val(response.companyName);
						$("#assetItemStatus" + i).val(response.assetItemStatus);
						$("#labEquipmentItemStatus" + i).val(response.labEquipmentStatus);
						$("#reagentItemStatus" + i).val(response.reagentItemStatus);
						$("#assetProductCategoryItemPopUpId" + i).val(response.categoryType);
						$("#assetAmcValId1" + i).val(response.itemMaintenanceSlaveDto.amccmcFreeTextDuration);
						$("#assetPmValId1" + i).val(response.itemMaintenanceSlaveDto.preventiveMaintenanceFreeTextDuration);
						$("#assetAmcYearId1" + i).val(response.itemMaintenanceSlaveDto.amccmcDuration);
						$("#assetPmYearId1" + i).val(response.itemMaintenanceSlaveDto.preventiveMaintenanceDuration);
						$("#assetProductWarrantyId1" + i).val(response.itemMaintenanceSlaveDto.warrantyWithProduct);
						$("#assetProductWarrantyDurationId1" + i).val(response.itemMaintenanceSlaveDto.warrantyWithProductDuration);
					}
					//$("#hiddenItemIndex").val(indexId);
				}
				$('#selectPurchaseOrderModalId').modal('show');
				}
			}
		});

}

function getRadioButtonIndex(index) {
	document.getElementById("hiddenRadioButtonIndex").value = index;
}

function setModalInfoToTableOnGoodReceiptNote() {
	
	var table = document.getElementById("grnItemInfoTable");
	var itemSlaveRowCount = table.rows.length;
	//var newItemSlaveRowCount = itemSlaveRowCount - 1;
	//var newItemSlaveRowCount = $("#hiddenItemIndex").val();
	var newItemSlaveRowCount = $("#grnItemCurrentRowIndexId").val();
	var totalRow = 0;
	$('#itemMasterSlaveRecordList input[type=radio]').each(function () {
		totalRow++;
	});
	var totalCheckboxes = $('#itemMasterSlaveRecordList input[name=row]:checked').val();
	setTableValuesToGoodsReceiptItemInfo(totalCheckboxes, totalRow,
		newItemSlaveRowCount);

}

function setTableValuesToGoodsReceiptItemInfo(totalCheckboxes, totalRow,
	radioButtonIndex) {

	var userState= $("#userState").val();
	var venderState= $("#hiddenVenderState").val();
	if (totalRow > 0) {
		if (totalCheckboxes == undefined || totalCheckboxes == "undefined") {
			alert("Please select atleast one checkbox");
			return 0;
		} else {
			
			var factor1 = $('#purchaseUomFactorOneId' + totalCheckboxes).val();
			var factor2 = $('#purchaseUomFactorTwoId' + totalCheckboxes).val();
			var factor3 = $('#purchaseUomFactorThreeId' + totalCheckboxes).val();
			var factor4 = $('#purchaseUomFactorFourId' + totalCheckboxes).val();
			
			$('#itemQuantityId' + radioButtonIndex).val($('#itemQuantityId' + totalCheckboxes).val());
			$('#unitPriceId' + radioButtonIndex).val($('#purchaseUnitPriceOneId' + totalCheckboxes).val());
			$('#factor1' + radioButtonIndex).val($('#purchaseUomFactorOneId' + totalCheckboxes).val());
			$('#factor2' + radioButtonIndex).val($('#purchaseUomFactorTwoId' + totalCheckboxes).val());
			$('#factor3' + radioButtonIndex).val($('#purchaseUomFactorThreeId' + totalCheckboxes).val());
			$('#factor4' + radioButtonIndex).val($('#purchaseUomFactorFourId' + totalCheckboxes).val());
			$('#itemReceivedQtyId' + radioButtonIndex).val($('#itemQuantityId' + totalCheckboxes).val());
			$('#pendinQtyId' + radioButtonIndex).val(($('#itemQuantityId' + totalCheckboxes).val() - $('#itemReceivedQtyId' + radioButtonIndex).val()));
			$('#itemNameId' + radioButtonIndex).val($('#itemNamePurchaseFactId' + totalCheckboxes).val());
			if(userState == venderState){
				$('#gstId' + radioButtonIndex).val($('#taxRateId' + totalCheckboxes).val());
				$('#igstId' + radioButtonIndex).val(0);
			}else{
				$('#gstId' + radioButtonIndex).val(0);
				$('#igstId' + radioButtonIndex).val($('#taxRateId' + totalCheckboxes).val());
			}
			
			
			$('#itemId' + radioButtonIndex).val($('#purchaseItemId' + totalCheckboxes).val());
			$('#itemHsnId' + radioButtonIndex).val($('#hsnName' + totalCheckboxes).val());
			$('#itemHsnNameId' + radioButtonIndex).val($('#hsnNameNewId' + totalCheckboxes).val());
			$('#itemTaxCodeId' + radioButtonIndex).val($('#taxNameId' + totalCheckboxes).val());
			$('#uomUnitFactorOneNameId' + radioButtonIndex).text($('#uomUnitOneNameId' + totalCheckboxes).val());
			$('#uomUnitFactorTwoNameId' + radioButtonIndex).text($('#uomUnitTwoNameId' + totalCheckboxes).val());
			$('#uomUnitFactorThreeNameId' + radioButtonIndex).text($('#uomUnitThreeNameId' + totalCheckboxes).val());
			$('#uomUnitFactorFourNameId' + radioButtonIndex).text($('#uomUnitFourNameId' + totalCheckboxes).val());
			
			//added by rohit on 22-08-2020
			$('#isItemBatchWiseId' + radioButtonIndex).val($('#isItemBatchWise' + totalCheckboxes).val());
			$('#assetItemStatusId' + radioButtonIndex).val($('#assetItemStatus' + totalCheckboxes).val());
			$('#labEquipmentItemStatusId' + radioButtonIndex).val($('#labEquipmentItemStatus' + totalCheckboxes).val());
			$('#reagentItemStatusId' + radioButtonIndex).val($('#reagentItemStatus' + totalCheckboxes).val());
			$('#assetProductCategory' + radioButtonIndex).val($('#assetProductCategoryItemPopUpId' + totalCheckboxes).val());
			$('#assetItemManufactureId' + radioButtonIndex).val($('#manufactureName' + totalCheckboxes).val());
			$('#assetAmcValId' + radioButtonIndex).val($('#assetAmcValId1' + totalCheckboxes).val());
			$('#assetPmValId' + radioButtonIndex).val($('#assetPmValId1' + totalCheckboxes).val());
			$('#assetAmcYearId' + radioButtonIndex).val($('#assetAmcYearId1' + totalCheckboxes).val());
			$('#assetPmYearId' + radioButtonIndex).val($('#assetPmYearId1' + totalCheckboxes).val());
			$('#assetProductWarrantyId' + radioButtonIndex).val($('#assetProductWarrantyId1' + totalCheckboxes).val());
			$('#assetProductWarrantyDurationId' + radioButtonIndex).val($('#assetProductWarrantyDurationId1' + totalCheckboxes).val());
			
			//$("#assetItemStatusId2" + radioButtonIndex).val($('#assetItemStatus' + totalCheckboxes).val());
			
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
				var itemId = $('#purchaseItemId' + totalCheckboxes).val();
				$('#batchId' + radioButtonIndex).prop('disabled', false);
				$('#itemExpireDateId' + radioButtonIndex).prop('disabled', false);
				
				if (itemId != null && itemId != undefined) {
					getBatchDetails(itemId);
				}
			}else{
				$('#batchId' + radioButtonIndex).val(0).prop('disabled', true);
				$('#itemExpireDateId' + radioButtonIndex).val("NA").prop('disabled', true);
			}
			closeItemPurchaseDetailsModal();
		}
	}
}

// this is for batch code set to item table 

function setModalInfoToTableOnBatch() {
	var table = document.getElementById("grnItemInfoTable");
	var itemSlaveRowCount = table.rows.length;
	//var newItemSlaveRowCount = itemSlaveRowCount - 1;
	var newItemSlaveRowCount = $("#grnItemCurrentRowIndexId").val();
	
	var totalRow = 0;
	$('#batchData input[type=radio]').each(function () {
		totalRow++;
	});
	var totalCheckboxes = $('input[name=row]:checked').val();
	setTableValuesToGoodsReceiptNoteItemInfo(totalCheckboxes, totalRow,
		newItemSlaveRowCount);

}

function setTableValuesToGoodsReceiptNoteItemInfo(totalCheckboxes, totalRow,
	radioButtonIndex) {
	if (totalRow > 0) {
		$('#batchId' + radioButtonIndex).val($('#itemBatchCode' + totalCheckboxes).val());
		$('#batchKeyId' + radioButtonIndex).val($('#batchIdKey' + totalCheckboxes).val());
		$('#itemExpireDateId' + radioButtonIndex).val($('#itemBatchExpireDate' + totalCheckboxes).val());
		$('#batchModel').modal('hide');
	}
}

function getBatchDetails(itemId) {
	var inputs = [];
	inputs.push('itemMasterId=' + itemId);
	var str = inputs.join('&');
	jQuery
		.ajax({
			async: true,
			type: "GET",
			url: "ehat/invGoodReceiptNote/getBatchDetails",
			data: str + "&reqType=AJAX",
			error: function () {
				alert('error');
			},
			success: function (response) {
				if (JSON.stringify(response.length) > 0) {
					$('#batchModel').modal('show');
					//length = response.itemPurchaseSlaveDto.length;
					length = response.length;
					var htm = "";
					for (var i = 0; i < length; i++) {
						if (i == 0) {
							$("#batchData")
								.html(
									"<tr><td>" +
									"<input type='radio' name='row' id='rowId" +
									i +
									"' value=" +
									i +
									" onclick='getRadioButtonIndex(this.value)' autofocus='autofocus'></td>" +
									"<td><input type='text'" +
									"class='form-control input-SmallText' disabled='disabled' id='itemName" +
									i +
									"'" +
									"tabindex='-1' /></td>" +
									"<td><input type='text'" +
									"class='form-control input-SmallText' disabled='disabled' id='itemQuantity" +
									i +
									"'" +
									"tabindex='-1' /></td>" +
									"<td><input type='text'" +
									"class='form-control input-SmallText' disabled='disabled'  id='itemBatchCode" +
									i +
									"'" +
									"tabindex='-1' /></td>" +
									"<td><input type='text'" +
									"class='form-control input-SmallText' disabled='disabled' id='itemBatchExpireDate" +
									i +
									"'" +
									"tabindex='-1' /></td>" +
									"<td style='display:none;'><input type='hidden'" +
									"class='form-control input-SmallText'  id='batchIdKey" +
									i +
									"'" +
									"tabindex='-1' value=''/></td>" +
									"</tr>");

						} else {
							$("#batchData")
								.append(
									"<tr><td>" +
									"<input type='radio' name='row' id='rowId" +
									i +
									"' value=" +
									i +
									" onclick='getRadioButtonIndex(this.value)' autofocus='autofocus'></td>" +
									"<td><input type='text'" +
									"class='form-control input-SmallText' disabled='disabled' id='itemName" +
									i +
									"'" +
									"tabindex='-1' /></td>" +
									"<td><input type='text'" +
									"class='form-control input-SmallText' disabled='disabled' id='itemQuantity" +
									i +
									"'" +
									"tabindex='-1' /></td>" +
									"<td><input type='text'" +
									"class='form-control input-SmallText' disabled='disabled' id='itemBatchCode" +
									i +
									"'" +
									"tabindex='-1' /></td>" +
									"<td><input type='text'" +
									"class='form-control input-SmallText' disabled='disabled'  id='itemBatchExpireDate" +
									i +
									"'" +
									"tabindex='-1' /></td>" +
									"<td style='display:none;'><input type='hidden'" +
									"class='form-control input-SmallText'  id='batchIdKey" +
									i +
									"'" +
									"tabindex='-1' value=''/></td>" +
									"</tr>");
						}
						$("#itemQuantity" + i).val(response[i].itemQuantity);
						$("#itemName" + i).val(response[i].itemName);
						var expDate = getDate(response[i].itemBatchExpDate);
						if(expDate == "1970-01-01"){
							expDate = "NA";	
						}
						$("#itemBatchExpireDate" + i).val(expDate);
						$("#batchIdKey" + i).val(response[i].id);
						$("#itemBatchCode" + i).val(response[i].itemBatchCode);
					}
				}
			}
		});
}


function closeItemPurchaseDetailsModal(callFrom) {
	if(callFrom == "Model"){
		var rowId = $("#grnItemCurrentRowIndexId").val();	
		$('#unitPriceId' + rowId).val("");
		$('#factor1' + rowId).val(0);
		$('#factor2' + rowId).val(0);
		$('#factor3' + rowId).val(0);
		$('#factor4' + rowId).val(0);
		$('#itemNameId' + rowId).val("");
		$('#itemId' + rowId).val(0);
		$('#batchId' + rowId).val("");
		$('#batchKeyId' + rowId).val(0);
		$('#itemExpireDateId' + rowId).val("");
	}
	$("#selectPurchaseOrderModalId").modal("hide");
	
}

function closeItemBatchDetailsModal() {
	$("#batchModel").modal("hide");
}
/*
 * function deletePartyMaster(partyMasterId) { var inputs = [];
 * inputs.push('id=' + partyMasterId); var str = inputs.join('&'); jQuery.ajax({
 * async : true, type : "POST", url : "ehat/invPartyMaster/deletePartyMaster",
 * data : str + "&reqType=AJAX", error : function() { alert('error'); }, success :
 * function(response) { getAllPartyMaster(); } }); }
 */

function onCloseBtnRefrshPage() {
	window.location.replace("inv_party_master_data.jsp");
}

function getAutoPartyMaster(partyMasterId) {
	var resultData = [];
	var partyMasterName = $("input#" + partyMasterId).val();

	if (partyMasterName == "" || partyMasterName == null ||
		partyMasterName == "null" || partyMasterName == undefined) {

		alertify.error("Please enter search value");
		$("input#" + partyMasterId).focus();
		return false;
	}

	var inputs = [];
	inputs.push('name=' + partyMasterName);
	var str = inputs.join('&');
	jQuery
		.ajax({
			async: false,
			type: "POST",
			data: str + "&reqType=AJAX",
			url: "ehat/invPartyMaster/partyMasterAutoSuggestion",
			cache: false,
			success: function (response) {
				if(response.partyMasterDto.length == 0){
					alertify.error("You Cannot Insert Other Supplier Name...!!!");
					document.getElementById('grnSupplierName').value = "";
				}
				var template = "";
				for (var j = 0; j < response.partyMasterDto.length; j++) {
					var arrValue = response.partyMasterDto[j].id + "-" +
						response.partyMasterDto[j].name;
					var idValue = response.partyMasterDto[j].id;
					var partyName = response.partyMasterDto[j].name;
					resultData.push({
						ID: idValue,
						Name: partyName
					});
					template = template + '<li data-value="' + idValue +
						'" class=""><a href="#">' + arrValue +
						'</a></li>';
				}

				setTimeout(
					function () {
						$("div#partyMasterByName .typeahead").html(
							template);
						$("div#partyMasterByName .typeahead").show();

						$("input#" + partyMasterId).typeahead({
							source: resultData,
							displayField: 'Name',
							valueField: 'ID',
							onSelect: displayResult,
							scrollBar: true
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

function getPartyMasterById(partyId) {
	var inputs = [];
	inputs.push('id=' + partyId);
	var str = inputs.join('&');
	jQuery
		.ajax({
			async: true,
			type: "GET",
			url: "ehat/invPartyMaster/getPartyMasterById",
			data: str + "&reqType=AJAX",
			error: function () {
				alert('error');
			},
			success: function (response) {
				if(response !="" && response !=null){
					$("#seachPartyMaster").focus();
					$('#seachPartyMaster').val("");
					$("#grnSupplierName").val(response.name.trim());
					$("#hiddenSupplierNameId").val(response.id);
					$("#partyGstNo").val(response.partyGstNo);//added by dayanand for party gst no.
					$("#grnSupplierState").select2();
					setPartyModalAddressInfoToGRN(response);
					setPartyModalContactInfoToGRN(response);
					setParyMasterStateToGrn(response);
					$("#goodReceiptNoteModalId").show();
					for (var i = 0; i < response.partyMasterGeneralInfoDto.length; i++) {
						$("#grnMobileNo").val(
							response.partyMasterGeneralInfoDto[i].mobile);
					}
	
					for (var i = 0; i < response.partyMasterAddressInfoDto.length; i++) {
						//$('#grnSupplierState').select2('val', response.partyMasterAddressInfoDto[i].stateId);
						$("#grnSupplierAddress").val(response.partyMasterAddressInfoDto[i].address);
					}
					setEditPartyMasterSlaveInfo(response);
				}else {
					alertify.error("Record not found");
				}
			}
		});
}
/**
 * 
 * @param id
 * @returns {Boolean}
 */
function getAutoGoodReceiptNote(id) {
	var resultData = [];
	var call=$('#callFrom').val();
	var vendorName = $("input#" + id).val();

	if (vendorName == "" || vendorName == null || vendorName == "null" ||
		vendorName == undefined) {

		alertify.error("Please enter search value");
		$("input#" + id).focus();
		return false;
	}
	var inputs = [];
	inputs.push('grnSupplierName=' + vendorName);
	inputs.push('call=' + call);
	var str = inputs.join('&');
	jQuery
		.ajax({
			async: false,
			type: "POST",
			data: str + "&reqType=AJAX",
			url: "ehat/invGoodReceiptNote/goodReceiptNoteAutoSuggestion",
			cache: false,
			success: function (response) {
				var template = "";
				
				if(response.lstGoodReceiptNoteDto.length == 0){
					alertify.error("Record Not Found...!!!");
					document.getElementById('seachGoodReceiptNote').value = "";
				}
				
				for (var j = 0; j < response.lstGoodReceiptNoteDto.length; j++) {
					var arrValue = response.lstGoodReceiptNoteDto[j].id +
						"-" +
						response.lstGoodReceiptNoteDto[j].grnSupplierName;
					var idValue = response.lstGoodReceiptNoteDto[j].id;
					var partyName = response.lstGoodReceiptNoteDto[j].grnSupplierName;
					resultData.push({
						ID: idValue,
						Name: partyName
					});
					template = template + '<li data-value="' + idValue +
						'" class=""><a href="#">' + arrValue +
						'</a></li>';
					
				}

				setTimeout(function () {
					$("div#goodReceiptNoteByName .typeahead")
						.html(template);
					$("div#goodReceiptNoteByName .typeahead").show();

					$("input#" + id).typeahead({
						source: resultData,
						displayField: 'Name',
						valueField: 'ID',
						onSelect: displayResult,
						scrollBar: true
					});
					$("input#" + id).data('typeahead').source = resultData;
				}, 500);
			}
		});

	function displayResult(item) {
		var res = item.text.split('-');
		var goodReceiptNoteId = res[0];
		var supplierName = res[1];
		var searchById = $("#searchById").val();
		if(searchById == 1){
			getGoodReceiptNoteById(goodReceiptNoteId);
		}else if(searchById == 2){
			getGoodReceiptNoteByVendorName(supplierName);
		}
		$("input#" + id).val(supplierName);
	}
}

function getGoodReceiptNoteById() {
	var call=$("#callFrom").val();
	var id  = $("input#seachGoodReceiptNoteId").val();
	if(id == "" || id == null || id == undefined){
		alertify.error("Please enter grn id ...!");
		return false;
	}
	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('callFrom=' + call);
	var str = inputs.join('&');
	jQuery.ajax({
		async: true,
		type: "GET",
		url: "ehat/invGoodReceiptNote/getGoodReceiptNoteById",
		data: str + "&reqType=AJAX",
		error: function () {
			alert('error');
		},
		success: function (response) {
			// partyMasterTemplate(response, "searchPartyMaster");
			if(call=="DRAFT"){
				if(response !=""){
					goodReceiptNoteTemplateForDraft(response,"searchGoodReceiptNote",call);
				}else{
					alertify.error("Record not Found ...!");
				}
			}else if(call== "PENDING"){
				if(response !=""){
					goodReceiptNoteTemplate(response, "searchGoodReceiptNote",call);
				}else{
					alertify.error("Record not Found ...!");
				}
			}else{
				if(response !=""){
					goodReceiptNoteTemplate(response, "searchGoodReceiptNote","noPending");
				}else{
					alertify.error("Record not Found ...!");
				}
			}
			
			$("#seachGoodReceiptNote").focus();
			$('#seachGoodReceiptNote').val("");
		}
	});
}

function getGoodReceiptNoteByVendorName(vendorName) {
	var call=$("#callFrom").val();
	var inputs = [];
	inputs.push('grnSupplierName=' + vendorName);
	inputs.push('callFrom=' + call);
	var str = inputs.join('&');
	jQuery.ajax({
		async: true,
		type: "GET",
		url: "ehat/invGoodReceiptNote/getGoodReceiptNoteByVendorName",
		data: str + "&reqType=AJAX",
		error: function () {
			alert('error');
		},
		success: function (response) {
			// partyMasterTemplate(response, "searchPartyMaster");
			if(call=="DRAFT"){
				goodReceiptNoteTemplateForDraft(response,"allGoodReceiptNote",call);
			}else if(call== "PENDING"){
				goodReceiptNoteTemplate(response, "allGoodReceiptNote",call);
			}else{
				goodReceiptNoteTemplate(response, "allGoodReceiptNote","noPending");
			}
			
			$("#seachGoodReceiptNote").focus();
			$('#seachGoodReceiptNote').val("");
		}
	});
}

function callSearchBy(){
	var searchById = $("#searchById").val();
	if(searchById == 1){
		$("#searchbyIdDiv").show();
		$("#searchbyNameIdDiv").hide();
	}else if(searchById == 2){
		$("#searchbyIdDiv").hide();
		$("#searchbyNameIdDiv").show();
	}
}


function addGeneralInfoRows(tabType) {
	if (tabType === "GeneralInfo") {
		var rows = $('#GeneralInfoTable tbody tr.newAdded').length;
		addDynamicRecordsToGeneralInfoTable(rows + 1);
	} else if (tabType === "ContactInfo") {
		var rows = $('#ContactInfoTable tbody tr.newAdded').length;
		addDynamicRecordsToContactInfoTable(rows + 1);
	} else if (tabType === "AddressInfo") {
		var rows = $('#AddressInfoTable tbody tr.newAdded').length;
		addDynamicRecordsToAddressInfoTableGRN(rows + 1);
	}else if(tabType === "DocumentInfo"){
		var rows = $('#DocUploadInfoTable tbody tr.newAdded').length;
		//addDynamicRecordsToDocumentInfoTableGRN(rows + 1);
	}

}
// this is for add dynamic row in table general information by vishnu

function addDynamicRecordsToGeneralInfoTable(id) {

	var generalMobileNo = $("#generalMobileNo").val();
	var generalLandLineNo = $("#generalLandLineNo").val();
	var generalWebSite = $("#generalWebSite").val();
	var generalCompanyMail = $("#generalCompanyMail").val();
	var generalGstNO = $("#generalGstNO").val();
	var generalRating = $("#generalRating").val();
	var generalPanNo = $("#generalPanNo").val();

	if (generalMobileNo != "") {
		var pattern = /^([0-9])*$/;
		if (!pattern.test(generalMobileNo)) {
			alert("Mobile number should be of digits only!");
			$("#generalMobileNo").focus();
			return false;
		}
	}

	if (generalMobileNo == "") {
		alert("Mobile number should not be Empty!");
		$("#generalMobileNo").focus();
		return false;
	}

	var htm = "";
	htm = htm +
		'<tr class="newAdded"> ' +
		' <td class="col-md-1 center">' +
		id +
		'</td>' +
		' <td class="col-md-1 center" id="generalGstNOId' +
		id +
		'">' +
		generalGstNO +
		'</td>' +
		' <td class="col-md-1 center" id="generalMobileNoId' +
		id +
		'">' +
		generalMobileNo +
		'</td>' +
		' <td class="col-md-1 center" id="generalCompanyMailId' +
		id +
		'">' +
		generalCompanyMail +
		'</td>' +
		' <td class="col-md-1 center" id="generalLandLineNoId' +
		id +
		'" style="display:none">' +
		generalLandLineNo +
		'</td>' +
		' <td class="col-md-1 center" id="generalWebSiteId' +
		id +
		'" style="display:none">' +
		generalWebSite +
		'</td>' +
		' <td class="col-md-1 center" id="generalRatingId' +
		id +
		'" style="display:none">' +
		generalRating +
		'</td>' +
		' <td class="col-md-1 center" id="generalPanNoId' +
		id +
		'" style="display:none">' +
		generalPanNo +
		'</td>' +
		' <td class="col-md-1 center" id="generalInfoId' +
		id +
		'" style="display:none">' +
		0 +
		'</td>' +
		' <td class="col-md-1 center"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editGeneralInfoPartyMaster(' +
		id +
		',\'editGeneral\')"><i class="fa fa-edit"></i></button></td>' +
		' <td class="col-md-1 center">' +
		'	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="true" id="deleteGeneralPartMaster' +
		id + '" onclick="deletePartyMasterSlave(' + id +
		',\'deleteGeneral\')" ' +
		'><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyGeneralTableInfoList").append(htm);
	$('#generalFormId')[0].reset();
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
		id + '" value="' + id + '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editContactInfoPartyMaster(' +
		id +
		',\'fromUI\')"><i class="fa fa-edit"></i></button></td>' +
		' <td class="col-md-1 center">' +
		'	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="true" id ="deleteContactPartMaster' +
		id + '" onclick="deletePartyMasterSlave(' + id +
		',\'deleteContact\')" ' +
		'><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
	$("#PartyContactTableInfoList").append(htm);
	$('#contactFormId')[0].reset();

}

// this is all about dynamic row added in address table

function addDynamicRecordsToAddressInfoTableGRN(id) {
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
		' <td class="col-md-1 center" id="addressInfoId1'
		+ id
		+ '" style="display:none">'
		+ id
		+ '</td>'+
		
		' <td class="col-md-1 center"><input type="hidden" id="editAddressPartMaster' +
		id + '" value="' + id + '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="editAddressInfoPartyMaster(' +
		id +
		',\'fromUI\')"><i class="fa fa-edit"></i></button></td>' +
		' <td class="col-md-1 center">' +
		'	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="true" id ="deleteAddressPartMaster' +
		id + '" onclick="deletePartyMasterSlave(' + id +
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

// this is for document upload from grn 

function addDynamicRecordsToDocumentInfoTableGRN(id){
	

	 var note = $("#noteId").val();
	 var files = $('#imagesfileUploadfrom').prop("files");
	 var documentName = $.map(files, function(val) { return val.name; });
	 var form = $('#uploadFormId')[0];
	 
	 if( document.getElementById("imagesfileUploadfrom").files.length == 0 ){
		    alert("Please select file");
		    return false;
	}

	var htm = "";
	htm = htm +
		'<tr class="newAdded"> ' +
		' <td class="col-md-1 center">' +
		id +
		'</td>' +
		' <td class="col-md-1 center" id="documentNameId' +
		id +
		'">' +
		documentName +
		'</td>' +
		' <td class="col-md-1 center" id="documentNoteId' +
		id +
		'">' +
		note +
		'</td>' +
		'<td class="col-md-1 center" id="documentInfoId' +
		id +
		'" style="display:none">' +
		0 +
		'</td>'+
		' <td class="col-md-1 center"><input type="hidden" id="fileDcoument' +
		id + '" value="' + form + '"><input type="hidden" id="editDcoumentSlave' +
		id + '" value="' + id + '"><button type="button" class="btn btn-xs btn-success editBodyPartMaster editUserAccess" onclick="viewDcoumentSlave(' +
		id +
		',\'fromUI\')"><i class="fa fa-eye fa-1x"></i></button></td>' +
		' <td class="col-md-1 center">' +
		'	<button type="button" class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" isNew="true" id ="deleteDcoumentSlave' +
		id + '" onclick="deleteDcoumentSlave(' + id +
		',\'deleteDocument\')" ' +
		'><i class="fa fa-trash-o"></i></button></td></tr>';
	$("#grnDocumentUploadTableInfoList").append(htm);
	$('#uploadFormId')[0].reset();
	
}

function viewDcoumentSlave(id,test){
	
}

function deleteDcoumentSlave (id,test){
	
}

function updateContactInfoPartyMasterOnGRN() {

	var rows = $('#ContactInfoTable tbody tr.newAdded').length;
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
	resetGRNInfoFields('contactInfo');
}

function updateAddressInfoPartyMasterOnGRN() {
	var rows = $('#AddressInfoTable tbody tr.newAdded').length;
	for (var i = 1; i <= rows; i++) {
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
			$("#companyDistictId" + i).html($("#hiddenDistrictFromPartyMaster").val());
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
			$("#saveAddressInfo").show();
			$("#updateAddressInfo").hide();
		}
	}
	resetGRNInfoFields('addressInfo');
}

// this is for Good Receipt Note
function getGrnTableBodyString(id) {
	var type = "fromNewGRN";
	callFromGrn = "GRN";
	var tbody = "";
	var mainItemId = 0;
	tbody = tbody 
		+"<tr class='newAdded' id='multiTr" +
		id +
		"'>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkGrnItem' id='checkbox" +
		id +
		"' value='" +
		id +
		"'></td>" +
		"<td class='col-md-4 col-xs-12 col-sm-4 center'><span id='snum" +
		id +
		"'>" +
		id +
		"</span><input type='hidden' id='slaveId" +
		id +
		"' value='0'></td>" +
		"<td class='col-md-8 col-xs-12 col-sm-8 center' id='goodsReceiptNoteItemName" +
		id +
		"'><input type='text' style='width: 250px;' autocomplete='off' data-name='goodReceiptNote' id='itemNameId" +
		id +
		"' class='typeahead form-control input-SmallText' onkeyup=fetchItemMasterGRNDetails(this.id,"+id+",'"+callFromGrn+"')> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='number' style='width:60px;' id='itemQuantityId" +
		id +
		"' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onblur='totalAmount(this.id," +
		id +
		")'> <input type='hidden' id='txtPurchaseQuotationChangingItemQty" + id + "' value='0' /> <input type='hidden' id='txtlastUom" + id + "'value=''> <lable type='hidden' id='lblPurchaseQuotationDocQuantity" + id + "'  style ='text-align:center;' value='' ></label></td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width:60px;'  type='text' id='unitPriceId" +
		id +
		"' class='form-control input-SmallText' onkeypress='return validateNumbers(event)'> <lable id='uomUnitLatestFactorId"+
		id +
		"'> </lable></td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width:60px;' type='text' id='discountPerId" +
		id +
		"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' onkeyup='chkTradAmtorPercentage(this.id," +
		id +
		")' onblur='calculTradeDis(this.id," +
		id +
		")'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='discountRsId" +
		id +
		"' class='form-control input-SmallText'  onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id," +
		id +
		")'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width:60px;' type='text' disabled='disabled' id='discountAmtId" +
		id +
		"' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' disabled='disabled' id='baseAmountId" +
		id +
		"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> </td>"
		
		
		//enable disable GST IGST
		+
		"<td id='documentByName" +
		id +
		"'><div class='col-md-6 col-xs-12 col-sm-6 center'> <input style='width: 60px;' disabled='disabled' value='0' type='text' id='gstId" +
		id +
		"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' onkeyup='rowAmtCalForGST(this.id," +
		id +
		");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst("+id+"," +
		id +
		")'></div></td>" +
		"<td id='documentByName" +
		id +
		"'><div class='col-md-6 col-xs-12 col-sm-6 center'> <input style='width: 60px;' disabled='disabled' type='text' id='igstId" +
		id +
		"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' onkeyup='rowAmtCalForIGST(this.id,"+id+");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount();autotaxCodeforItemIGST("+id+"," +
		id +
		")' value='0'></div></td>"
		
		+
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' value='0' type='text' disabled='disabled' id='gstAmtId" +
		id +
		"' class='form-control input-SmallText'> </td>" +
		
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' value='0' type='text' disabled='disabled' id='igstAmtId" +
		id +
		"' class='form-control input-SmallText'> </td>" +
		
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' disabled='disabled' id='totalAmtId" +
		id +
		"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='factor1" +
		id +
		"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorOneNameId"+
		id +
		"'> </lable></td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='factor2" +
		id +
		"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> <lable id='uomUnitFactorTwoNameId"+
		id +
		"'> </lable></td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' id='factor3" +
		id +
		"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> <lable id='uomUnitFactorThreeNameId"+
		id +
		"'> </lable></td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='factor4" +
		id +
		"' class='form-control input-SmallText'> <lable id='uomUnitFactorFourNameId"+
		id +
		"'> </lable></td>"
		+
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 60px;' disabled id='itemExpectedQtyId" +
		id +
		"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' onkeyup='pendingAmount(this.id," +
		id +
		");'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;display:none;'  type='hidden' id='totalReceivedQtyId" +
		id + "' class='form-control input-SmallText' value='0'><input type='text' style='width: 60px;' id='itemReceivedQtyId" +
		id +
		"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' onblur=pendingAmount(this.id," +id+",'"+type+"');onkeyup=addRowAssetMaintenance(" + id + ");> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 60px;' disabled id='pendinQtyId" +
		id +
		"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 100px;' value='0' id='batchId" +
		id +
		"' class='form-control input-SmallText' onblur='checkBatchAvailability(this.value,"+id+");'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style='width: 100px;' id='batchKeyId" +
		id +
		"' class='form-control input-SmallText' value='0'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input style='width: 100px;' type='text' id='itemId" +
		id +
		"' class='form-control input-SmallText' value=''></td>" +
		
		"<td class='col-md-3 col-xs-6 col-sm-3 center'><input  style='width: 100px;' disabled='disabled' type='button' id='getBatchDetailsId"
		+ id + 
		"' class='btn btn-xs btn-success editUserAccess'  data-toggle='modal' data-target='#batchWiseGoodReceiptNoteModal' value='Batch Details' onclick='getGoodReceiptNoteItemBatchDetails(" + id +","+mainItemId+");'> </td>" +
		
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 150px;' value='NA' id='itemManufactureDateId" +
		id +
		"' class='form-control input-SmallText'  onclick='getMfgandexpyDate(this.id," +id + ");'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 150px;' value='NA' id='itemExpireDateId" +
		id +
		"' class='form-control input-SmallText' onclick='getMfgandexpyDate(this.id," +
		id + ");'> </td>" +
		
		"<td class='col-md-6 col-xs-12 col-sm-6 center' '><input type='text' style=' width: 150px;' value='0' id='itemTotalAmount" +
		id +
		"' class='form-control input-SmallText'> </td>" +
		
		
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style=' width: 150px;' id='itemHsnNameId" +
		id +
		"' class='form-control input-SmallText'> </td>" +
		
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style=' width: 150px;' id='itemHsnId" +
		id +
		"' class='form-control input-SmallText'> </td>" +
		
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style=' width: 150px;' id='itemTaxCodeId" +
		id +
		"' class='form-control input-SmallText'> </td>" 
		
		//added by rohit on 22-08-2020
		+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetItemStatusId"
		+ id
		+ "' class='form-control input-SmallText'> </td>"
		
		+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='isItemBatchWiseId"
		+ id
		+ "' class='form-control input-SmallText'> </td>"
		
		+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetItemManufactureId"
		+ id
		+ "' class='form-control input-SmallText'> </td>"
		+

		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetAmcValId"
		+ id
		+ "' class='form-control input-SmallText'> </td>"
		+

		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetPmValId"
		+ id
		+ "' class='form-control input-SmallText'> </td>"
		+

		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetAmcYearId"
		+ id
		+ "' class='form-control input-SmallText'> </td>"
		+

		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetPmYearId"
		+ id
		+ "' class='form-control input-SmallText'> </td>"
		+

		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetProductWarrantyId"
		+ id
		+ "' class='form-control input-SmallText'> </td>"
		+

		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetProductWarrantyDurationId"
		+ id
		+ "' class='form-control input-SmallText'> </td>"
		+
		// added by Rohit to store product category type
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetProductCategory"
		+ id
		+ "' class='form-control input-SmallText'> </td>"
		+

		// added by rohit lab equipment item type
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='labEquipmentItemStatusId"
		+ id + "' class='form-control input-SmallText'> </td>" +
		
		// added by rohit reagent item type
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='reagentItemStatusId"
		+ id + "' class='form-control input-SmallText'> </td>" + 
		
		//added row from purchase order to grn same item slave - by Vishnu 01-02-2021
	    "<td class='col-md-3 col-xs-6 col-sm-3 center'><input style='width: 60px;' type='button' id='addNewRowWithSameItem"
		+ id + 
		"' class='btn btn-xs btn-success editUserAccess' disabled='disabled' value='Add' onclick='addExtraRowGrnButton(" + id +
		");'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='deleteSlave"
		+ id + "' class='form-control input-SmallText' isNew='true'> </td>" +
		
		"</tr>";
	///$(':input').prop('readonly', false);
	$('#txtgrnId').prop('readonly', true);
	$("#RowCount").val(parseInt(id));
	var totaltblsize = $("#RowCount").val();
	$("#totaltblsize").val(totaltblsize);
	$("#uploadedDocumentGrnBody").val("");
	$("#maintenanceTableInfoList").val("");
	$('#uploadGrnDocument').val('');
	$('#uploadGrnComment').val('');
	return tbody;
}


function getGrnTableBodyStringOnPlusButton(id) {
	var mainTable = document.getElementById("grnItemInfoTable");
	var mainTableLength =  mainTable.rows.length;
	$('#grnItemId').val('');
	var type = "fromNewGRN";
	var mainItemId = 0;
	callFromGrn= "GRN";
	if(mainTableLength == 1){
		var supplierState = $("#grnSupplierState option:selected").val();
		var userState = $("#userState").val();
		var tbody = "";
		tbody = tbody 
			+"<tr class='newAdded' id='multiTr" +
			id +
			"'>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkGrnItem' id='checkbox" +
			id +
			"' value='" +
			id +
			"'></td>" +
			"<td class='col-md-4 col-xs-12 col-sm-4 center'><span id='snum" +
			id +
			"'>" +
			id +
			"</span><input type='hidden' id='slaveId" +
			id +
			"' value='0'></td>" +
			"<td class='col-md-8 col-xs-12 col-sm-8 center' id='goodsReceiptNoteItemName" +
			id +
			"'><input type='text' style='width: 250px;' data-name='goodReceiptNote' id='itemNameId" +
			id +
			"' class='typeahead form-control input-SmallText' onkeyup=fetchItemMasterGRNDetails(this.id,"+id+",'"+callFromGrn+"')> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='number' style='width:60px;' id='itemQuantityId" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onblur='totalAmount(this.id," +
			id +
			")'> <input type='hidden' id='txtPurchaseQuotationChangingItemQty" + id + "' value='0' /> <input type='hidden' id='txtlastUom" + id + "'value=''> <lable type='hidden' id='lblPurchaseQuotationDocQuantity" + id + "'  style ='text-align:center;' value='' ></label></td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width:60px;'  type='text' id='unitPriceId" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event)'> <lable id='uomUnitLatestFactorId"+
			id +
			"'> </lable></td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width:60px;' type='text' id='discountPerId" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' onkeyup='chkTradAmtorPercentage(this.id," +
			id +
			")' onblur='calculTradeDis(this.id," +
			id +
			")'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='discountRsId" +
			id +
			"' class='form-control input-SmallText'  onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id," +
			id +
			")'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width:60px;' type='text' id='discountAmtId" +
			id +
			"' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='baseAmountId" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> </td>"
			
			
			//enable disable GST IGST
			if(supplierState == userState){
			
			tbody = tbody  + "<td id='documentByName" +
			id +
			"'><div class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text'  value='0' id='gstId" +
			id +
			"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='0' onkeyup='rowAmtCalForGST(this.id," +
			id +
			");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst("+id+"," +
			id +
			")'></div></td>" +
			"<td id='documentByName" +
			id +
			"'><div class='col-md-6 col-xs-12 col-sm-6 center'> <input style='width: 60px;' disabled='disabled' type='text' id='igstId" +
			id +
			"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' onkeyup='rowAmtCalForIGST(this.id,"+id+");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount();autotaxCodeforItemIGST("+id+"," +
			id +
			")' value='0'></div></td>"
			}
			else{
			tbody = tbody  + "<td id='documentByName" +
			id +
			"'><div class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled='disabled' type='text' value='0' id='gstId" +
			id +
			"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' onkeyup='rowAmtCalForGST(this.id," +
			id +
			");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst("+id+"," +
			id +
			")'></div></td>" +
			"<td id='documentByName" +
			id +
			"'><div class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='igstId" +
			id +
			"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' onkeyup='rowAmtCalForIGST(this.id,"+id+");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount();autotaxCodeforItemIGST("+id+"," +
			id +
			")' value='0'></div></td>"
			}
			
			tbody = tbody + "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' disabled='disabled' value='0'  id='gstAmtId" +
			id +
			"' class='form-control input-SmallText'> </td>" +
			
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled='disabled' value='0' type='text' id='igstAmtId" +
			id +
			"' class='form-control input-SmallText'> </td>" +
			
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='totalAmtId" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='factor1" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorOneNameId"+
			id +
			"'> </lable> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='factor2" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorTwoNameId"+
			id +
			"'> </lable> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' id='factor3" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorThreeNameId"+
			id +
			"'> </lable> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='factor4" +
			id +
			"' class='form-control input-SmallText'><lable id='uomUnitFactorFourNameId"+
			id +
			"'> </lable> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 60px;' disabled id='itemExpectedQtyId" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' onkeyup='pendingAmount(this.id," +
			id +
			");'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;display:none;'  type='hidden' id='totalReceivedQtyId" +
			id + "' class='form-control input-SmallText' value='0'><input type='text' style='width: 60px;' id='itemReceivedQtyId" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' onblur=pendingAmount(this.id," +id+",'"+type+"');onkeyup=addRowAssetMaintenance(" + id + ");> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 60px;' disabled id='pendinQtyId" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 100px;' value='0' id='batchId" +
			id +
			"' class='form-control input-SmallText' onblur='checkBatchAvailability(this.value,"+id+");'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style='width: 100px;' id='batchKeyId" +
			id +
			"' class='form-control input-SmallText' value='0'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input style='width: 100px;' type='text' id='itemId" +
			id +
			"' class='form-control input-SmallText' value=''></td>" +
			"<td class='col-md-3 col-xs-6 col-sm-3 center'><input  style='width: 100px;' type='button' id='getBatchDetailsId"
			+ id
			+ "' class='btn btn-xs btn-success editUserAccess'  data-toggle='modal' data-target='#batchWiseGoodReceiptNoteModal' value='Batch Details' onclick='getGoodReceiptNoteItemBatchDetails(" + id +","+mainItemId+");'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 150px;' value='NA' id='itemManufactureDateId" +
			id +
			"' class='form-control input-SmallText' onclick='getMfgandexpyDate(this.id," +
			id +
			");'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 150px;' value='NA' id='itemExpireDateId" +
			id +
			"' class='form-control input-SmallText' onclick='getMfgandexpyDate(this.id," +
			id + ");'> </td>" +
			
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 150px;' value='0' id='itemTotalAmount" +
			id +
			"' class='form-control input-SmallText' '> </td>" +
			
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style=' width: 150px;' id='itemHsnNameId" +
			id +
			"' class='form-control input-SmallText'> </td>" +
			
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style=' width: 150px;' id='itemHsnId" +
			id +
			"' class='form-control input-SmallText'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style=' width: 150px;' id='itemTaxCodeId" +
			id +
			"' class='form-control input-SmallText'> </td>" 
			
			//added by rohit on 22-08-2020
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetItemStatusId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='isItemBatchWiseId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetItemManufactureId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+

			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetAmcValId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+

			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetPmValId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+

			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetAmcYearId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+

			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetPmYearId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+

			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetProductWarrantyId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetProductWarrantyDurationId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+
			// added by Rohit to store product category type
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetProductCategory"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+

			// added by rohit lab equipment item type
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='labEquipmentItemStatusId"
			+ id + "' class='form-control input-SmallText'> </td>" +
			
			// added by rohit reagent item type
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='reagentItemStatusId"
			+ id + "' class='form-control input-SmallText'> </td>" +
			
			//added row from purchase order to grn same item slave - by Vishnu 01-02-2021
		    "<td class='col-md-3 col-xs-6 col-sm-3 center'><input disabled='disabled' style='width: 60px;' type='button' id='addNewRowWithSameItem"
			+ id
			+ "' class='btn btn-xs btn-success editUserAccess' value='Add' onclick='addExtraRowGrnButton(" + id +
			");'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='deleteSlave"
			+ id + "' class='form-control input-SmallText' isNew='true'> </td>" +
			
			"</tr>";
		$(':input').prop('readonly', false);
		$('#txtgrnId').prop('readonly', true);
		$("#RowCount").val(parseInt(id));
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		return tbody;	
	}
	else{
		var newid = id - 1;
		var unitPrice = $("#unitPriceId"+newid).val();
		if(unitPrice == null || unitPrice == ""){
			alert("You Cannot Add Row Without Filling Previous Row Values...!!!");
			return false;
		}
		var supplierState = $("#grnSupplierState option:selected").val();
		var userState = $("#userState").val();
		var tbody = "";
		tbody = tbody 
			+"<tr class='newAdded' id='multiTr" +
			id +
			"'>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkGrnItem' id='checkbox" +
			id +
			"' value='" +
			id +
			"'></td>" +
			"<td class='col-md-4 col-xs-12 col-sm-4 center'><span id='snum" +
			id +
			"'>" +
			id +
			"</span><input type='hidden' id='slaveId" +
			id +
			"' value='0'></td>" +
			"<td class='col-md-8 col-xs-12 col-sm-8 center' id='goodsReceiptNoteItemName" +
			id +
			"'><input type='text' style='width: 250px;' data-name='goodReceiptNote' id='itemNameId" +
			id +
			"' class='typeahead form-control input-SmallText' onkeyup=fetchItemMasterGRNDetails(this.id,"+id+",'"+callFromGrn+"')> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='number' style='width:60px;' id='itemQuantityId" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onblur='totalAmount(this.id," +
			id +
			")'> <input type='hidden' id='txtPurchaseQuotationChangingItemQty" + id + "' value='0' /> <input type='hidden' id='txtlastUom" + id + "'value=''> <lable type='hidden' id='lblPurchaseQuotationDocQuantity" + id + "'  style ='text-align:center;' value='' ></label></td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width:60px;'  type='text' id='unitPriceId" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event)'> <lable id='uomUnitLatestFactorId"+
			id +
			"'> </lable></td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width:60px;' type='text' id='discountPerId" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' onkeyup='chkTradAmtorPercentage(this.id," +
			id +
			")' onblur='calculTradeDis(this.id," +
			id +
			")'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='discountRsId" +
			id +
			"' class='form-control input-SmallText'  onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id," +
			id +
			")'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width:60px;' type='text' id='discountAmtId" +
			id +
			"' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='baseAmountId" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> </td>"
			
			
			//enable disable GST IGST
			if(supplierState == userState){
			
			tbody = tbody  + "<td id='documentByName" +
			id +
			"'><div class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text'  value='0' id='gstId" +
			id +
			"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='0' onkeyup='rowAmtCalForGST(this.id," +
			id +
			");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst("+id+"," +
			id +
			")'></div></td>" +
			"<td id='documentByName" +
			id +
			"'><div class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled='disabled' type='text' id='igstId" +
			id +
			"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' onkeyup='rowAmtCalForIGST(this.id,"+id+");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount();autotaxCodeforItemIGST("+id+"," +
			id +
			")' value='0'></div></td>"
			}
			else{
			tbody = tbody  + "<td id='documentByName" +
			id +
			"'><div class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled='disabled' type='text' value='0' id='gstId" +
			id +
			"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' onkeyup='rowAmtCalForGST(this.id," +
			id +
			");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst("+id+"," +
			id +
			")'></div></td>" +
			"<td id='documentByName" +
			id +
			"'><div class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='igstId" +
			id +
			"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' onkeyup='rowAmtCalForIGST(this.id,"+id+");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount();autotaxCodeforItemIGST("+id+"," +
			id +
			")' value='0'></div></td>"
			}
			
			tbody = tbody + "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' disabled='disabled' value='0'  id='gstAmtId" +
			id +
			"' class='form-control input-SmallText'> </td>" +
			
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled='disabled' value='0' type='text' id='igstAmtId" +
			id +
			"' class='form-control input-SmallText'> </td>" +
			
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='totalAmtId" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='factor1" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorOneNameId"+
			id +
			"'> </lable> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='factor2" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorTwoNameId"+
			id +
			"'> </lable> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' id='factor3" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorThreeNameId"+
			id +
			"'> </lable> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 60px;' id='factor4" +
			id +
			"' class='form-control input-SmallText'><lable id='uomUnitFactorFourNameId"+
			id +
			"'> </lable> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 60px;' disabled id='itemExpectedQtyId" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' onkeyup='pendingAmount(this.id," +
			id +
			");'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;display:none;'  type='hidden' id='totalReceivedQtyId" +
			id + "' class='form-control input-SmallText' value='0'><input type='text' style='width: 60px;' id='itemReceivedQtyId" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' onblur=pendingAmount(this.id," +id+",'"+type+"');onkeyup=addRowAssetMaintenance(" + id + ");> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 60px;' disabled id='pendinQtyId" +
			id +
			"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 100px;' value='0' id='batchId" +
			id +
			"' class='form-control input-SmallText' onblur='checkBatchAvailability(this.value,"+id+");'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style='width: 100px;' id='batchKeyId" +
			id +
			"' class='form-control input-SmallText' value='0'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input style='width: 100px;' type='text' id='itemId" +
			id +
			"' class='form-control input-SmallText' value=''></td>" +
			"<td class='col-md-3 col-xs-6 col-sm-3 center'><input disabled='disabled' style='width: 100px;' type='button' id='getBatchDetailsId"
			+ id
			+ "' class='btn btn-xs btn-success editUserAccess'  data-toggle='modal' data-target='#batchWiseGoodReceiptNoteModal' value='Batch Details' onclick='getGoodReceiptNoteItemBatchDetails(" + id +","+mainItemId+");'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 150px;' value='NA' id='itemManufactureDateId" +
			id +
			"' class='form-control input-SmallText' onclick='getMfgandexpyDate(this.id," +
			id +
			");'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 150px;' value='NA' id='itemExpireDateId" +
			id +
			"' class='form-control input-SmallText' onclick='getMfgandexpyDate(this.id," +
			id + ");'> </td>" +
			
			"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 150px;' value='0' id='itemTotalAmount" +
			id +
			"' class='form-control input-SmallText' '> </td>" +
			
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style=' width: 150px;' id='itemHsnNameId" +
			id +
			"' class='form-control input-SmallText'> </td>" +
			
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style=' width: 150px;' id='itemHsnId" +
			id +
			"' class='form-control input-SmallText'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style=' width: 150px;' id='itemTaxCodeId" +
			id +
			"' class='form-control input-SmallText'> </td>"
			
			//added by rohit on 22-08-2020
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetItemStatusId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='isItemBatchWiseId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			
			+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetItemManufactureId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+

			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetAmcValId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+

			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetPmValId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+

			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetAmcYearId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+

			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetPmYearId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+

			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetProductWarrantyId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetProductWarrantyDurationId"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+
			
			// added by Rohit to store product category type
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetProductCategory"
			+ id
			+ "' class='form-control input-SmallText'> </td>"
			+

			// added by rohit lab equipment item type
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='labEquipmentItemStatusId"
			+ id + "' class='form-control input-SmallText'> </td>" +
			
			// added by rohit reagent item type
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='reagentItemStatusId"
			+ id + "' class='form-control input-SmallText'> </td>" +
			
			//added row from purchase order to grn same item slave - by Vishnu 01-02-2021
		    "<td class='col-md-3 col-xs-6 col-sm-3 center'><input disabled='disabled' style='width: 60px;' type='button' id='addNewRowWithSameItem"
			+ id
			+ "' class='btn btn-xs btn-success editUserAccess' value='Add' onclick='addExtraRowGrnButton(" + id +
			");'> </td>" +
			"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='deleteSlave"
			+ id + "' class='form-control input-SmallText' isNew='true'> </td>" +
			"</tr>";
		$(':input').prop('readonly', false);
		$('#txtgrnId').prop('readonly', true);
		$("#RowCount").val(parseInt(id));
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		return tbody;
	}
	
}

/*******************************************************************************
 * @author : Vishnu Thorat 
 * @date :01-Feb-2021
 * @codeFor : add row for Purchase Order and Purchase Reorder for GRN
 ******************************************************************************/

function addExtraRowGrnButton(rowNumber) {
	var divContent = "";
	var regEx = /^\d{4}-\d{2}-\d{2}$/;
	var itemId = $("#slaveId" + rowNumber).val();
	var mainItemId = $("#itemId" + rowNumber).val();
	var itemName = $("#itemNameId" + rowNumber).val();
	var itemQuantity = $("#itemQuantityId" + rowNumber).val();
	if(itemQuantity == '' || itemQuantity == null || itemQuantity == undefined){
		alert("Please Enter Item Quantity..!!");
		return false;
	}
	var unitPriceId = $("#unitPriceId" + rowNumber).val();
	var discountPerId = $("#discountPerId" + rowNumber).val();
	var discountRsId = $("#discountRsId" + rowNumber).val();
	var discountAmtId = $("#discountAmtId" + rowNumber).val();
	var baseAmountId = $("#baseAmountId" + rowNumber).val();
	var gstId = $("#gstId" + rowNumber).val();
	var taxCodeId = $("#itemTaxCodeId" + rowNumber).val();
	var hsnNameId = $("#itemHsnNameId" + rowNumber).val();
	var hsnId = $("#itemHsnId" + rowNumber).val();
	var igstId = $("#igstId" + rowNumber).val();
	var gstAmtId = $("#gstAmtId" + rowNumber).val();
	var totalAmtId = $("#totalAmtId" + rowNumber).val();
	var factor1 = $("#factor1" + rowNumber).val();
	var factor2 = $("#factor2" + rowNumber).val();
	var factor3 = $("#factor3" + rowNumber).val();
	var factor4 = $("#factor4" + rowNumber).val();
	// this is added by Vishnu for unit factor name 
	var uomUnitLatestFactorId = $("#uomUnitLatestFactorId" + rowNumber).text();
	var uomUnitFactorOneNameId = $("#uomUnitFactorOneNameId" + rowNumber).text();
	var uomUnitFactorTwoNameId = $("#uomUnitFactorTwoNameId" + rowNumber).text();
	var uomUnitFactorThreeNameId = $("#uomUnitFactorThreeNameId" + rowNumber).text();
	var uomUnitFactorFourNameId = $("#uomUnitFactorFourNameId" + rowNumber).text();
	
	var itemExpectedQtyId = $("#itemExpectedQtyId" + rowNumber).val();
	
	var itemReceivedQtyId = $("#totalReceivedQtyId" + rowNumber).val();//
	
	var itemCurrentQtyId = $("#itemReceivedQtyId" + rowNumber).val();
	var pendinQtyId = $("#pendinQtyId" + rowNumber).val();
	var batchCode = $("#batchId" + rowNumber).val();
	var batchId = $("#batchKeyId" + rowNumber).val();
	var itemExpireDateId = $("#itemExpireDateId" + rowNumber).val();
	var itemManufactureDateId = $("#itemManufactureDateId" + rowNumber).val();
	
	if(itemExpireDateId == "NA"){
		itemExpireDateId = null;
	}
	 
	var itemTotalAmount = $("#itemTotalAmount" + rowNumber).val();
	var igstAmtId = $("#igstAmtId" + rowNumber).val();
	var itemUnitName = $("#uomUnitLatestFactorId" + rowNumber).text();
	//added by rohit on 23-08-2020
	var itemAssetStatus = $("#assetItemStatusId" + rowNumber).val();
	var isItemBatchWise = $("#isItemBatchWiseId" + rowNumber).val();
	var assetAmcVal = $("#assetAmcValId" + rowNumber).val();
	if(assetAmcVal == ""){
		assetAmcVal = 0;
	}
	var assetPmVal = $("#assetPmValId" + rowNumber).val();
	if(assetPmVal == ""){
		assetPmVal = 0;
	}
	var assetAmcYear = $("#assetAmcYearId" + rowNumber).val();
	if(assetAmcYear == ""){
		assetAmcYear = null;
	}
	var assetPmYear = $("#assetPmYearId" + rowNumber).val();
	if(assetPmYear == ""){
		assetPmYear = null;
	}
	var assetProductWarranty = $("#assetProductWarrantyId" + rowNumber).val();
	if(assetProductWarranty == ""){
		assetProductWarranty = null;
	}
	var assetProductWarrantyDuration = $("#assetProductWarrantyDurationId" + rowNumber).val();
	if(assetProductWarrantyDuration == ""){
		assetProductWarrantyDuration = 0;
	}
	var assetProductCategory = $("#assetProductCategory" + rowNumber).val();
	var labEquipmentItemStatus = $("#labEquipmentItemStatusId" + rowNumber).val();
	var reagentItemStatus = $("#reagentItemStatusId" + rowNumber).val();
	var itemManufactureName = $("#assetItemManufactureId" + rowNumber).val();
	var callFrom = 'ADDEXTRAROW';
	var callFromGrn ="GRN";
	var type1 = "fromNewGRN";
	var supplierState = $("#grnSupplierState option:selected").val();
	var userState = $("#userState").val();
	var id = parseInt($('#grnItemInfoTable tbody tr.newAdded').length);
		id = (id + 1);
		var pendingQuantity = $("#pendinQtyId" + rowNumber).val();
		$("#addNewRowWithSameItem" + rowNumber).attr('disabled', true);
		if (pendingQuantity == 0) {
			alert("pending Quantity is 0");
			return false;
		}
		divContent = divContent
		+"<tr class='newAdded' id='multiTr" +
		id +
		"'>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='checkbox' class='chkGrnItem' id='checkbox" +
		id +
		"' value='" +
		id +
		"'></td>" +
		"<td class='col-md-4 col-xs-12 col-sm-4 center'><span id='snum" +
		id +
		"'>" +
		id +
		"</span><input type='hidden' id='slaveId" +
		id +
		"' value='0'></td>" +
		"<td class='col-md-8 col-xs-12 col-sm-8 center' id='goodsReceiptNoteItemName" +
		id +
		"'><input type='text' style='width: 250px;' data-name='goodReceiptNote' id='itemNameId" +
		id +
		"' class='typeahead form-control input-SmallText' value='"+itemName+"' onkeyup=fetchItemMasterGRNDetails(this.id,"+id+",'"+callFromGrn+"')> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='number' style='width:60px;' id='itemQuantityId" +
		id +
		"' class='form-control input-SmallText' value='"+itemQuantity+"' onkeypress='return validateNumbers(event)' onblur=totalAmount(this.id," +
		id +
		",'"+callFrom+"')> <input type='hidden' id='txtPurchaseQuotationChangingItemQty" + id + "' value='"+itemQuantity+"' /> <input type='hidden' id='txtlastUom" + id + "'value=''> <lable type='hidden' id='lblPurchaseQuotationDocQuantity" + id + "'  style ='text-align:center;' value="+uomUnitLatestFactorId+" ></label></td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width:60px;'  type='text' id='unitPriceId" +
		id +
		"' class='form-control input-SmallText' value='"+unitPriceId+"' onkeypress='return validateNumbers(event)'> <lable id='uomUnitLatestFactorId"+
		id +
		"'>"+itemUnitName+"</lable></td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width:60px;' type='text' id='discountPerId" +
		id +
		"' class='form-control input-SmallText' value='"+discountPerId+"' onkeypress='return validateNumbers(event);' onkeyup='chkTradAmtorPercentage(this.id," +
		id +
		")' onblur='calculTradeDis(this.id," +
		id +
		")'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='discountRsId" +
		id +
		"' class='form-control input-SmallText' value='"+discountRsId+"' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id," +
		id +
		")'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width:60px;' type='text' id='discountAmtId" +
		id +
		"' class='form-control input-SmallText' value='"+discountAmtId+"'  onkeypress='return validateNumbers(event);'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='baseAmountId" +
		id +
		"' class='form-control input-SmallText' value='"+baseAmountId+"' onkeypress='return validateNumbers(event);'> </td>"
		
		
		//enable disable GST IGST
		if(supplierState == userState){
		
		divContent = divContent  + "<td id='documentByName" +
		id +
		"'><div class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='gstId" +
		id +
		"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' value='"+gstId+"' onkeyup='rowAmtCalForGST(this.id," +
		id +
		");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst("+id+"," +
		id +
		")'></div></td>" +
		"<td id='documentByName" +
		id +
		"'><div class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;'  disabled='disabled' type='text' id='igstId" +
		id +
		"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' onkeyup='rowAmtCalForIGST(this.id,"+id+");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount();autotaxCodeforItemIGST("+id+"," +
		id +
		")' value='"+igstId+"'></div></td>"
		}
		else{
		divContent = divContent  + "<td id='documentByName" +
		id +
		"'><div class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled='disabled' type='text' value='"+gstId+"' id='gstId" +
		id +
		"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' onkeyup='rowAmtCalForGST(this.id," +
		id +
		");calculateTotalItemAmount("+id+");calculateTotalItemgstAmount("+id+");autotaxCodeforItemGst("+id+"," +
		id +
		")'></div></td>" +
		"<td id='documentByName" +
		id +
		"'><div class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' id='igstId" +
		id +
		"' class='form-control input-SmallText typeahead' data-name='autoGRNTax' onkeyup='rowAmtCalForIGST(this.id,"+id+");calculateTotalItemAmount("+id+");calculateTotalItemigstAmount();autotaxCodeforItemIGST("+id+"," +
		id +
		")' value='"+igstId+"'></div></td>"
		}
		
		divContent = divContent + "<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' type='text' disabled='disabled' value='"+gstAmtId+"'  id='gstAmtId" +
		id +
		"' class='form-control input-SmallText'> </td>" +
		
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;' disabled='disabled' value='"+igstAmtId+"' type='text' id='igstAmtId" +
		id +
		"' class='form-control input-SmallText'> </td>" +
		
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' value='"+totalAmtId+"' style=' width: 60px;' id='totalAmtId" +
		id +
		"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' value='"+factor1+"' style=' width: 60px;' id='factor1" +
		id +
		"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorOneNameId"+
		id +
		"'>"+uomUnitFactorOneNameId+"</lable> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' value='"+factor2+"' style=' width: 60px;' id='factor2" +
		id +
		"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorTwoNameId"+
		id +
		"'>"+uomUnitFactorTwoNameId+"</lable> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' value='"+factor3+"' style=' width: 60px;' id='factor3" +
		id +
		"' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'><lable id='uomUnitFactorThreeNameId"+
		id +
		"'>"+uomUnitFactorThreeNameId+"</lable> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' value='"+factor4+"' style=' width: 60px;' id='factor4" +
		id +
		"' class='form-control input-SmallText'><lable id='uomUnitFactorFourNameId"+
		id +
		"'>"+uomUnitFactorFourNameId+"</lable> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 60px;' disabled id='itemExpectedQtyId" +
		id +
		"' class='form-control input-SmallText' value='"+itemExpectedQtyId+"' onkeypress='return validateNumbers(event);' onkeyup='pendingAmount(this.id," +
		id +
		");'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input style='width: 60px;display:none;'  type='hidden' id='totalReceivedQtyId" +
		id + "' class='form-control input-SmallText' value='"+itemReceivedQtyId+"'><input type='text' style='width: 60px;' id='itemReceivedQtyId" +
		id +
		"' class='form-control input-SmallText' value='"+itemCurrentQtyId+"' onkeypress='return validateNumbers(event);' onkeyup=addRowAssetMaintenance(" + id + ");> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 60px;' disabled id='pendinQtyId" +
		id +
		"' class='form-control input-SmallText' value='"+pendinQtyId+"' onkeypress='return validateNumbers(event);'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 100px;' value='0' id='batchId" +
		id +
		"' class='form-control input-SmallText' onblur='checkBatchAvailability(this.value,"+id+");'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style='width: 100px;' id='batchKeyId" +
		id +
		"' class='form-control input-SmallText' value='0'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input style='width: 100px;' type='text' id='itemId" +
		id +
		"' class='form-control input-SmallText' value='"+mainItemId+"'></td>" +
		"<td class='col-md-3 col-xs-6 col-sm-3 center'><input  style='width: 100px;' type='button' id='getBatchDetailsId"
		+ id
		+ "' class='btn btn-xs btn-success editUserAccess'  data-toggle='modal' data-target='#batchWiseGoodReceiptNoteModal' value='Batch Details' onclick='getGoodReceiptNoteItemBatchDetails(" + id +","+mainItemId+");'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style=' width: 150px;' value='"+itemManufactureDateId+"' id='itemManufactureDateId" +
		id +
		"' class='form-control input-SmallText' onclick='getMfgandexpyDate(this.id," +
		id +
		");'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 150px;' value='NA' id='itemExpireDateId" +
		id +
		"' class='form-control input-SmallText' onclick='getMfgandexpyDate(this.id," +
		id + ");'> </td>" +
		
		"<td class='col-md-6 col-xs-12 col-sm-6 center'><input type='text' style='width: 150px;' value='"+itemTotalAmount+"' id='itemTotalAmount" +
		id +
		"' class='form-control input-SmallText'> </td>" +
		
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style=' width: 150px;' id='itemHsnNameId" +
		id +
		"' class='form-control input-SmallText' value='"+hsnNameId+"'> </td>" +
		
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style=' width: 150px;' id='itemHsnId" +
		id +
		"' class='form-control input-SmallText' value='"+hsnId+"'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' style=' width: 150px;' id='itemTaxCodeId" +
		id +
		"' class='form-control input-SmallText' value='"+taxCodeId+"'> </td>"
		
		//added by rohit on 22-08-2020
		+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetItemStatusId"
		+ id
		+ "' class='form-control input-SmallText' value='"+itemAssetStatus+"'> </td>"
		
		+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='isItemBatchWiseId"
		+ id
		+ "' class='form-control input-SmallText' value='"+isItemBatchWise+"'> </td>"
		
		+ "<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetItemManufactureId"
		+ id
		+ "' class='form-control input-SmallText'> </td>"
		+
	
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetAmcValId"
		+ id
		+ "' class='form-control input-SmallText'> </td>"
		+
	
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetPmValId"
		+ id
		+ "' class='form-control input-SmallText'> </td>"
		+
	
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetAmcYearId"
		+ id
		+ "' class='form-control input-SmallText'> </td>"
		+
	
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetPmYearId"
		+ id
		+ "' class='form-control input-SmallText'> </td>"
		+
	
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetProductWarrantyId"
		+ id
		+ "' class='form-control input-SmallText'> </td>"
		+
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetProductWarrantyDurationId"
		+ id
		+ "' class='form-control input-SmallText'> </td>"
		+
		
		// added by Rohit to store product category type
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetProductCategory"
		+ id
		+ "' class='form-control input-SmallText'> </td>"
		+
	
		// added by rohit lab equipment item type
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='labEquipmentItemStatusId"
		+ id + "' class='form-control input-SmallText'> </td>" +
		
		// added by rohit reagent item type
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='reagentItemStatusId"
		+ id + "' class='form-control input-SmallText'> </td>" +
		
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  value='N' id='isItemSlaveUsed"
		+ id + "' class='form-control input-SmallText'> </td>" +
		//added row from purchase order to grn same item slave - by Vishnu 01-02-2021
		"<td class='col-md-3 col-xs-6 col-sm-3 center'><input  style='width: 60px;' type='button' id='addNewRowWithSameItem"
		+ id
		+ "' class='btn btn-xs btn-success editUserAccess' value='Add' onclick='addExtraRowGrnButton(" + id +
		");'> </td>" +
		"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='deleteSlave"
		+ id + "' class='form-control input-SmallText' isNew='true'> </td>"
		+ "</tr>";
		
		$("#RowCount").val((parseInt(id) + 1));
		var totaltblsize = $("#RowCount").val();
		$("#totaltblsize").val(totaltblsize);
		$('#itemInfoDetails').append(divContent);
	
}


/*******************************************************************************
 * @author : Vishnu Thorat 
 * @date : 21-Dec-2019
 * @codeFor : Remove row temp for GRN
 ******************************************************************************/

function removeRowFromTable(tableId, checkboxClass) {
	var rows = $('#grnItemInfoTable tbody tr.newAdded').length;
	var status=false;
	for (var i = 1; i <= rows; i++) {
		if($('#checkbox'+i+':checkbox:checked').length > 0){
			status = true;
			if($("#slaveId" + i).val() > 0 && $("#deleteSlave"+i).attr("isnew") == "false" && $('#checkbox'+i+':checkbox:checked').length == 1){
				deleteItemSlaveRow($("#slaveId" + i).val());
				$('#checkbox'+i+':checkbox:checked').closest("tr").remove();
			}else{
				$('.' + checkboxClass + ':checkbox:checked').parents("tr").remove();
			}
			
			var assetItemStatus = $("#assetItemStatus2"+i).val();
			if(assetItemStatus=="1"){
				$("#maintenanceTableInfo tr").remove();
			}
			
		}
	}
	
	if(status == false){
		alertify.error("Please mark atleast one checkbox as checked ...!");
	}
	
	check(tableId);
	checkCompGrn(tableId);
	var rowCount = $("#totaltblsize").val();
	 	
	totalDocQtyPQ();
	totalDocDiscountPQ();
	totalGrossAmt(1,rowCount);
	totalVatAmt(1,rowCount);
	totalAmount(1,rowCount,undefined);
	
	///totalPendingQtyforPartialGRN();
	calcuatSumforitemQTYforPartialGRN();
	
	var gst=$("#txtVat").val();
	var igst=$("#txtigstVat").val();
	calculateTotalItemAmount(1);
	if(parseFloat(gst)==0){
		
	}else{
		calculateTotalItemgstAmountAfterRemoveRow(1);

	}
	
	if(parseFloat(igst)==0){
			
	}else{
		calculateTotalItemigstAmountAfterRemoveRow(1);
	
	
	}
	calculateTotalItemAmountAfterRemoveRow(1);
}


/*******************************************************************************
 * @author : Vishnu Thorat 
 * @date : 21-Dec-2019
 * @codeFor : For reorder srno after delete
 ******************************************************************************/
/*
function check(tableId) {
	obj = $('#' + tableId + ' tbody tr').find('span');
	$.each(obj, function(key, value) {
		id = value.id;
		$('#' + id).html(key + 1);
	});
}
*/
/*******************************************************************************
 * @author : Vishnu Thorat 
 * @date : 21-Dec-2019
 * @codeFor : For reorder index ids of componant after delete
 ******************************************************************************/
/*******************************************************************************
 * @author : Vishnu Thorat 
 * @date : 21-Dec-2019
 * @codeFor : Check uncheck all checkbox in table
 ******************************************************************************/

function checkForGRN() {
	var $radios = $('input:checkbox[name=withoughtPoGrnId]');
	if ($radios.is(':checked') == true) {
		$('#grnPurchaseOrderId').hide();
		$('#checkForGRN').hide();
		$('#btnAddNew').show();
		$('#grnPartial').css('display', 'none');
		$('#purchaseOrderCheck').hide();
	}
	if ($radios.is(':checked') == false) {
		$('#grnPurchaseOrderId').show();
		$('#checkForGRN').show();
		$('#btnAddNew').hide();
		$('#grnPartial').css('display', 'block');
		$('#purchaseOrderCheck').show();
	}
}

function checkForGRNAppend() {
	var $radios = $('input:checkbox[name=appendPoId]');
	if ($radios.is(':checked') == true) {
		$('#grnPurchaseOrderCheck').show();
		$('#btnAddNew').hide();
		$('#grnPurchaseOrderAppend').show();
	}
	if ($radios.is(':checked') == false) {
		$('#btnAddNew').show();
		$('#grnPurchaseOrderCheck').hide();
		$('#grnPurchaseOrderAppend').hide();
	}
}

var selInventoryDocumentTemplate = "{#foreach $T.lstdocMasterDocNumFinancialYearDto as lstDocumentNUmberDto}"
	// +"{#if $T.lstDocumentNUmberDto.docSeries == 'GRN'}"
	+
	"<option id='seriesId' value='{$T.lstDocumentNUmberDto.docNumberingId}'>{$T.lstDocumentNUmberDto.docSeries}</option>" +
	"{#/for}";

function getGoodReceiptNoteSeries() {

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
				$("#grnDocumentList").val(JSON.stringify(response));
				var divContent = "";
				for (var i = 0; i < response.lstdocMasterDocNumFinancialYearDto.length; i++) {
					if (response.lstdocMasterDocNumFinancialYearDto[i].docNumberingId == 3) {
						divContent = divContent +
							"<option id='seriesId' value='" +
							response.lstdocMasterDocNumFinancialYearDto[i].docNumberingId +
							"'  >" +
							response.lstdocMasterDocNumFinancialYearDto[i].docSeries +
							"</option>";
					}
				}
				$("#selectGrnDoc").html(divContent);
			}
		});
}

function getChallanAndPurchaseInvoiceId() {
	jQuery.ajax({
		type: "POST",
		data: {
			"grnid": "0",
		},
		url: "ehat/invGoodReceiptNote/getChallanAndPurchaseInvoiceId",
		error: function () {
			alert('error');
		},
		success: function (response) {
			var challnid = 0;
			var purinvoiceid = 0;
			if (response.length > 0) {
				if (response == "no") {
					challnid = 1;
					purinvoiceid = 1;
				} else {
					var Finalrateandtax = response.split("@");
					/*challnid = parseInt(Finalrateandtax[0]);

					purinvoiceid = parseInt(Finalrateandtax[1]);*/
					challnid = Finalrateandtax[0];
					purinvoiceid = Finalrateandtax[1];
					//purinvoiceid++;
					//challnid++;
				}
				$("#grnDeliveryChallanNumber").val(challnid);
				$("#grnDeliveryChallanNumber1").val(challnid);
				$("#grnPurInvNumber").val(purinvoiceid);
				$("#grnPurInvNumber1").val(purinvoiceid);
			}

		}

	});

}

function getNextGRNId() {
	var inputs = [];
	inputs.push('tableName=inv_good_receipt_note');
	var str = inputs.join('&');
	jQuery.ajax({
		async: true,
		type: "POST",
		data: str + "&reqType=AJAX",
		url: "ehat/invGoodReceiptNote/getGoodReceiptNoteSeriesNextId",
		timeout: 1000 * 60 * 5,
		catche: false,
		error: function () {
			alert("error");
		},
		success: function (r) {
			$("#hiddenNextGrnId").val(r);
			$("#txtgrnId").val(r);

			$("#txtGRNDocNoOpeningStock").val(r);
		}
	});
}

function getGRNSeries(id) {
	grnDcoumentObject = $("#grnDocumentList").val();
	var grnNextId = $('#hiddenNextGrnId').val() == "" ? $("#txtgrnId").val() :
		$('#hiddenNextGrnId').val();
	objDocument = JSON.parse(grnDcoumentObject.trim());
	for (var i = 0; i < objDocument.lstdocMasterDocNumFinancialYearDto.length; i++) {
		if (objDocument.lstdocMasterDocNumFinancialYearDto[i].docNumberingId == id) {
			$("#grnSeries")
				.val(
					objDocument.lstdocMasterDocNumFinancialYearDto[i].docPrefix +
					objDocument.lstdocMasterDocNumFinancialYearDto[i].docNumber +
					grnNextId +
					objDocument.lstdocMasterDocNumFinancialYearDto[i].docSuffix);
			$("#txtGRNDocSeriesOpnigStock")
				.val(
					objDocument.lstdocMasterDocNumFinancialYearDto[i].docPrefix +
					objDocument.lstdocMasterDocNumFinancialYearDto[i].docNumber +
					grnNextId +
					objDocument.lstdocMasterDocNumFinancialYearDto[i].docSuffix);

		}
	}
}

function getPurchaseOrderlist(id) {
	var  grnPurchaseOrderValue = $("#grnPurchaseOrder option:selected").text();
	var callFrom = grnPurchaseOrderValue.substring(0,2);
	// please make sure for string given in purchase order and purchase re-order series for callfrom compare
	if(callFrom == "PO"){
		getNextGRNId();
		getGRNSeries(($('#seriesId').val()));
		$('#draftGrn').hide();
		getChallanAndPurchaseInvoiceId();
		if (id != null && id != '') {
			getPurchaseOrder(id);
		}
	}else if(callFrom == "PR"){
		getNextGRNId();
		getGRNSeries(($('#seriesId').val()));
		$('#draftGrn').hide();
		getChallanAndPurchaseInvoiceId();
		if (id != null && id != '') {
			getPurchaseReOrder(id);
		}
	}
	
}

function totalAmount(id, rowCount,callFrom) {
	var quantity = $('#' + id).val();
	var rate = $('#unitPriceId' + rowCount).val();
	$('#orderQtyId' + rowCount).val(quantity);
	$('#itemReceivedQtyId' + rowCount).val(quantity);
	$('#totalReceivedQtyId' + rowCount).val(quantity);
	if(callFrom != "ADDEXTRAROW"){
		$('#itemExpectedQtyId' + rowCount).val(quantity);
	}
	$('#baseAmountId' + rowCount).val(quantity * rate);

	var sum = 0;
	var totalQty;
	var RowCount = $("#RowCount").val();
	
    
	for (var i = 1; i <= RowCount; i++) {
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



function chkTradAmtorPercentage(id, rowcount) {
	var txtPurchaseQuotationTrdeDiscountPercentage = $(
		"#discountPerId" + rowcount).val();
	var txtTredeAmt = $("#discountPerId" + rowcount).val();

	if (txtPurchaseQuotationTrdeDiscountPercentage == '' ||
		txtPurchaseQuotationTrdeDiscountPercentage == null) {
		document.getElementById("discountRsId" + rowcount).disabled = false;
		$("#discountAmtId" + rowcount).val(' ');
		$("#baseAmountId" + rowcount).val(' ');
		$("#totalAmtId" + rowcount).val(' ');
		$("#itemTotalAmount" + rowcount).val(' ');
	}

	if (!txtPurchaseQuotationTrdeDiscountPercentage == '' ||
		!txtPurchaseQuotationTrdeDiscountPercentage == null) {
		document.getElementById("discountRsId" + rowcount).disabled = true;
		$("#discountRsId" + rowcount).val(0);
		calculTradeDis("discountPerId", rowcount);
	}

}
/**
 * ******** Calculate treade discount AMt and add new fun call as
 * totalGrossAmt() ****************
 */

function calculTradeDis(id, rowCount) {
	var treadeDiscount = $("#discountPerId" + rowCount).val();

	if (treadeDiscount > 100) {
		alert("Trade Discount should not more than 100");
		$("#discountPerId" + rowCount).val('');

		$("#discountAmtId" + rowCount).val('');
		$("#baseAmountId" + rowCount).val('');
		$("#totalAmtId" + rowCount).val('');
		$("#itemTotalAmount" + rowCount).val('');

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
			for (var i = 1; i <= totaltblsize; i++) {

				var txtPurchaseQuotationTrdeDiscountAmt = $(
					"#discountAmtId" + i).val();

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
	//below line commented by Rohit
	rowAmtCal(1, rowCount);

	totalGrossAmt(1, rowCount);
	totalVatAmt(1, rowCount);
	/* rowCount(1,rowCount); */
}

function rowAmtCalForGST(id, rowCount) {
	
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
		if($("#gstId" + rowCount).val() > 0 &&  $("#igstId" + rowCount).val() == 0){
			taxAmt = $("#gstId" + rowCount).val(); // add tax amount in
		}else if($("#igstId" + rowCount).val() >0 && $("#gstId" + rowCount).val() == 0){
			taxAmt = $("#igstId" + rowCount).val(); // add tax amount in
		}
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		
		$("#gstAmtId" + rowCount).val(finalcaltaxanmount); // add tax amount in
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmountAddingtax = finalsumofRowAmt.toFixed(2);
		$('#totalAmtId' + rowCount).val(finalRowAmountAddingtax);
		$('#itemTotalAmount' + rowCount).val(finalRowAmountAddingtax);
	}

}

function rowAmtCalForIGST(id, rowCount) {
	var taxAmt = $("#igstId" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$("#igstId" + rowCount).val('');
		return false;
	}
	var baseAmt = $('#baseAmountId' + rowCount).val();
	if (baseAmt == " " || baseAmt == null) {
		$("#igstId" + rowCount).val('');
		return false;
	} else {
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#baseAmountId' + rowCount).val();
		var taxAmt = $("#igstId" + rowCount).val();
		if($("#gstId" + rowCount).val() > 0 &&  $("#igstId" + rowCount).val() == 0){
			taxAmt = $("#gstId" + rowCount).val(); // add tax amount in
		}else if($("#igstId" + rowCount).val() >0 && $("#gstId" + rowCount).val() == 0){
			taxAmt = $("#igstId" + rowCount).val(); // add tax amount in
		}
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$("#igstAmtId" + rowCount).val(finalcaltaxanmount); // add tax amount in
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmountAddingtax = finalsumofRowAmt.toFixed(2);
		$('#totalAmtId' + rowCount).val(finalRowAmountAddingtax);
		$('#itemTotalAmount' + rowCount).val(finalRowAmountAddingtax);
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

/** *** Calculate Total Vat AMt ****** */
function totalVatAmt(id, rowCount) {
	var sum = 0;
	var baseAmount;
	var RowCount = $("#RowCount").val();
	var totaltblsize = $("#totaltblsize").val();
	var caltaxonBaseAmt;
	// var totalRow = $("#totalRow").val();

	for (var i = 1; i <= totaltblsize; i++) {
		baseAmount = $("#baseAmountId" + i).val();
		var taxAmt = $("#igstId" + i).val();
		if (baseAmount == null || taxAmt == null || taxAmt == undefined ||
			taxAmt == '' || baseAmount == undefined || baseAmount == '') {
			var flag = 1;
		} else {

			if($("#igstId" + i).val() == 0 && $("#gstId" + i).val() > 0){
				taxAmt = $("#gstId" + i).val();
				caltaxonBaseAmt = parseFloat(baseAmount) * parseFloat(taxAmt) / 100;

				var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);

				sum = parseFloat(sum) + parseFloat(finalcaltaxanmount);
				$("#txtigstVat").val(0.00);
				$("#txtVat").val(sum.toFixed(2));
			}else if($("#gstId" + i).val() == 0 && $("#igstId" + i).val() > 0){
				
				taxAmt = $("#igstId" + i).val();
				caltaxonBaseAmt = parseFloat(baseAmount) * parseFloat(taxAmt) / 100;

				var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);

				sum = parseFloat(sum) + parseFloat(finalcaltaxanmount);
				$("#txtigstVat").val(sum.toFixed(2));
				$("#txtVat").val(0.00);
			}
			
		}

	}
	
	$("#txtTotalVat").val(sum.toFixed(2));
	$("#grossTaxesId").val(sum.toFixed(2));

	var totalgrossAmt = $("#txtGross").val();
	$("#txtNetAmt").val((parseFloat(sum) + parseFloat(totalgrossAmt)).toFixed(2));

}

/* calculate Total TradeDis Discount IN rupess */

function calculTradeDisRs(id, rowCount) {

	var treadeDiscountRs = $("#discountRsId" + rowCount).val();

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

function chKTradAmt(id, rowcount) {
	var txtPurchaseQuotationTrdeDiscountInRupess = $("#discountRsId" + rowcount)
		.val();

	if (txtPurchaseQuotationTrdeDiscountInRupess == "" ||
		txtPurchaseQuotationTrdeDiscountInRupess == null) {
		document.getElementById("discountPerId" + rowcount).disabled = false;
		$("#discountAmtId" + rowcount).val(' ');
		$("#baseAmountId" + rowcount).val(' ');
		$("#totalAmtId" + rowcount).val(' ');
		$("#itemTotalAmount" + rowcount).val(' ');
		$("#totalItemDiscount").val('0');
		// return false;

	}

	if (txtPurchaseQuotationTrdeDiscountInRupess != "" ||
		txtPurchaseQuotationTrdeDiscountInRupess != null) {
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


function rowAmtCalNEW(id, rowCount) {

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
	} else {

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
	for (var i = 1; i <= totaltblsize; i++) {
		baseAmount = $("#baseAmountId" + i).val();
		var taxAmt = $("#igstId" + i).val();
		if (baseAmount == null || taxAmt == null || taxAmt == undefined ||
			taxAmt == '' || baseAmount == undefined || baseAmount == '') {
			var flag = 1;
		} else {

			caltaxonBaseAmt = parseFloat(baseAmount) * parseFloat(taxAmt) / 100;

			var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);

			sum = parseFloat(sum) + parseFloat(finalcaltaxanmount);
		}

	}

	//$("#txtVat").val(sum.toFixed(2));
	$("#txtTotalVat").val(sum.toFixed(2));
	//$("#textVat").val(sum.toFixed(2));

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
	applyTaxforItemexpenseOfGstAmt(gstId,onchange);
}

/************
* @author	: Rohit Sandbhor
* @date		: 15-02-2020
* @codeFor	:autotaxCodeforItemGst added for applying total gst calculation
 ************/
function autotaxCodeforItemIGST(rowCount, onchange) {
	var igstId = $("#igstId"+rowCount).val();
	applyTaxforItemexpenseOfIgstAmt(igstId,onchange);
}

/************
* @author	: Rohit Sandbhor
* @date		: 15-02-2020
* @codeFor	:applyTaxforItemexpenseOfGstAmt added for applying total gst calculation
 ************/
function applyTaxforItemexpenseOfGstAmt(inputID,rowCountNew) {

	var sumofRate = 0;
	sumofRate = parseFloat(sumofRate) + parseFloat(inputID);

	var rowCount = "onchange";
	if (rowCount == "var rowCount1") {
		$("#gstId" + rowCountNew).val(sumofRate);
	} else {
		$("#gstId" + rowCount[1]).val(sumofRate);
	}

	rowAmtCalNEWForGst(1, rowCountNew);
	totalVatAmtnEWForGSt(1, rowCountNew);

}

/************
* @author	: Rohit Sandbhor
* @date		: 04-02-2020
* @codeFor	:applyTaxforItemexpenseOfIgstAmt added for applying total gst calculation
 ************/
function applyTaxforItemexpenseOfIgstAmt(inputID,rowCountNew) {

	var Finalrateandtax = inputID;

	var sumofRate = 0;
	sumofRate = parseFloat(sumofRate) + parseFloat(Finalrateandtax);

	var rowCount = "onchange";
	if (rowCount == "var rowCount1") {
		$("#igstId" + rowCountNew).val(sumofRate);
	} else {
		$("#igstId" + rowCountNew).val(sumofRate);
	}

	rowAmtCalNEWForIgst(1, rowCountNew);
	totalVatAmtnEWForIgst(1, rowCountNew);

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
		$("#itemTotalAmount" + rowCount).val(' ');
	}
	var baseAmt = $('#baseAmountId' + rowCount).val();
	if (baseAmt == " " || baseAmt == null) {
		$("#totalAmtId" + rowCount).val(' ');
		$("#itemTotalAmount" + rowCount).val(' ');
		return false;
	} else {
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
 * @author : Rohit Sandbhor
 * @date : 16-Jan-2020
 * @codeFor :rowAmtCalNEWForGst added for applying total gst calculation
 ******************************************************************************/
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
	$("#grossTaxesId").val(sum.toFixed(2));
	var totalgrossAmt = $("#txtGross").val();
	$("#txtNetAmt").val(
			(parseFloat(sum) + parseFloat(totalgrossAmt)).toFixed(2));

}
	
/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 04-02-2020
 * @codeFor :totalVatAmtnEWForIgst added for applying total igst calculation
 ******************************************************************************/
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
	$("#grossTaxesId").val(sum.toFixed(2));
	var totalgrossAmt = $("#txtGross").val();
	$("#txtNetAmt").val(
			(parseFloat(sum) + parseFloat(totalgrossAmt)).toFixed(2));

}	

/**
 * 
 * @param inputID
 * @param typeauto
 */
function autotaxCodeGrn(inputID, typeauto) {
	var txtVal1 = $('#' + inputID).val().trim();
	jQuery.ajax({
		async: true,
		type: "POST",
		data: {
			"taxName": txtVal1,
			"callform": typeauto
		},
		url: "ehat/invGoodReceiptNote/inventoryTaxAutoSuggestion",
		timeout: 1000 * 60 * 5,
		catche: false,
		error: function () {
			alert("error");
		},
		success: function (r) {
			totalVatAmt(r, inputID);
		}
	});
}

/** ************ Total Doc Discount ********** */

function totalDocDiscountPQ() {
	var sum = 0;
	var tradeAmt;
	var RowCount = $("#RowCount").val();

	for (var i = 1; i <= RowCount; i++) {
		tradeAmt = $("#discountAmtId" + i).val();
		if (tradeAmt == null || tradeAmt == undefined || tradeAmt == '') {
			var flag = 1;
		} else {
			sum = (parseFloat(sum) + parseFloat(tradeAmt)).toFixed(2);;
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

	for (var i = 1; i <= RowCount; i++) {
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
		function () {
			return !this.value || $.trim(this.value).length == 0 ||
				$.trim(this.text).length == 0;
		}).remove();

	$('#lstBoxforCharges').find('option').each(
		function () {
			txtPurchaseOrderTaxCode_ = txtPurchaseOrderTaxCode_ +
				($(this).val() + ",");
		});
	if (txtPurchaseOrderTaxCode_ == ',' || txtPurchaseOrderTaxCode_ == '' ||
		txtPurchaseOrderTaxCode_ == null) {
		alert("Please Apply Atleast One Charge ");
		return false;
	}
	txtPurchaseOrderTaxCode_ = txtPurchaseOrderTaxCode_.substring(0,
		txtPurchaseOrderTaxCode_.length - 1);

	var Finalrateandtax = txtPurchaseOrderTaxCode_.split(",");

	$("#selboxChargeswithAmtList  option").remove();

	var sumofRate = 0;
	for (var i = 0; i < Finalrateandtax.length; i++) {
		finalrat = Finalrateandtax[i];
		var taxRate = finalrat.split("_");
		finalRateamt = taxRate[1];

		sumofRate = parseFloat(sumofRate) + parseFloat(finalRateamt);

		var option = "";
		option = option + "<option value=" + finalrat + ">" + finalrat +
			"</option>";
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
	
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	
	jQuery
		.ajax({
			async: true,
			type: "POST",
			data : str + "&reqType=AJAX",
			url: "ehat/inventoryM/getAllChargeMaster",
			timeout: 1000 * 60 * 5,
			catche: false,
			error: function () {
				alert("error");
			},
			success: function (response) {
				var divContent = "";
				divContent = divContent +
					"<select class='col-md-12'><option value='0'>---Select---</option>";
				for (var i = 0; i < response.lstchargemaster.length; i++) {
					divContent = divContent + "<option value='" +
						response.lstchargemaster[i].chargeId + "'  >" +
						response.lstchargemaster[i].chargeName +
						"</option>";
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

	if (txtChargesAmt == '' || txtChargesAmt == null ||
		txtChargesList == "-Select-" || txtChargesList == 0) {

		alert("Please Enter All Feilds ");
		return false;

	}
	var finalChargesNameandAMt = txtChargesList + "_" + txtChargesAmt + "_" +
		txtexGstper + "_" + txtexGstamt;

	var flag = 1;
	$('#lstBoxforCharges').find('option').each(function () {
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
			function () {
				return !this.value || $.trim(this.value).length == 0 ||
					$.trim(this.text).length == 0;
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
	var taxGST = 0;
	var taxIGST = 0;
	var taxTotalTaxes = 0;
	if ($('#txtVat').val() != '' && $('#txtVat').val().length > 0)
		taxGST = parseFloat($('#txtVat').val());
	if ($('#txtigstVat').val() != '' && $('#txtigstVat').val().length > 0)
		taxIGST = parseFloat($('#txtigstVat').val());
	$('#taxTotalTaxesId').val(parseFloat(taxGST) + parseFloat(taxIGST));
	taxTotalTaxes = parseFloat(taxGST) + parseFloat(taxIGST);
	$('#grossTaxesId').val((taxTotalTaxes).toFixed(2));
	$('#taxTotalTaxesId').val((taxTotalTaxes).toFixed(2));
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
	if ($('#grossTaxesId').val() != '' && $('#grossTaxesId').val().length > 0)
		vat = parseFloat($('#grossTaxesId').val());

	$('#txtNetAmt').val((total + vat).toFixed(2));
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

	totalAdd = parseFloat(octroi) + parseFloat(surcharge) +
		parseFloat(creditAmt) + parseFloat(freight);

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

	finalvatafterreduece = parseFloat(txtVat) -
		(parseFloat(txtVat) * parseFloat(txtSplDisc) / 100);

	$('#txtVat').val(finalvatafterreduece.toFixed(2));

	calculateTotalTax();
	calculateTotalLess();
	calculateNetAmount();

}

function pendingAmount(id, rowCount,callFrom) {
	var grnCallType = $('#grnCallType').val();
	var totalReceivedQty = "";
	if(callFrom == 'fromNewGRN'){
		$("#pendinQtyId" + rowCount).val(0);
	}
	
	var actualquantity = $('#' + id).val();
//	var quantity = $('#itemQuantityId' + rowCount).val();
	// these changes made by Vishnu for pending Qty for while editing grn
	var quantity = $('#pendinQtyId' + rowCount).val();
	var expectedQty = $('#itemExpectedQtyId' + rowCount).val();
	if(parseInt(actualquantity) > parseInt(expectedQty)){
		alert("Received qty should not greater than expected qty ");
		return false;
	}
	
	if(grnCallType == "draft"){
		totalReceivedQty = $('#itemReceivedQtyId' + rowCount).val();
		//totalReceivedQty = (parseInt($('#totalReceivedQtyId' + rowCount).val()) + parseInt($('#itemReceivedQtyId' + rowCount).val()));
		$('#totalReceivedQtyId' + rowCount).val(totalReceivedQty);
		$('#itemQuantityId' + rowCount).val(totalReceivedQty);
	}
	else if(grnCallType == "PENDING"){
		
		totalReceivedQty = $('#totalReceivedQtyId' + rowCount).val();
		totalReceivedQty = parseInt(totalReceivedQty) + parseInt($('#itemReceivedQtyId' + rowCount).val());
		$('#totalReceivedQtyId' + rowCount).val(totalReceivedQty);
		$('#itemQuantityId' + rowCount).val(totalReceivedQty);
		if(totalReceivedQty > expectedQty){
			$('#itemQuantityId' + rowCount).val(parseInt(totalReceivedQty) - parseInt($('#itemReceivedQtyId' + rowCount).val()));
			$('#totalReceivedQtyId' + rowCount).val(parseInt(totalReceivedQty) - parseInt($('#itemReceivedQtyId' + rowCount).val()));
		}
	}else{
		totalReceivedQty = $('#itemReceivedQtyId' + rowCount).val();
		$('#totalReceivedQtyId' + rowCount).val(totalReceivedQty);	
		$('#itemQuantityId' + rowCount).val(totalReceivedQty);
	}
	if (actualquantity == "") {
		$("#pendinQtyId" + rowCount).val('0');
		$("#lblPurchaseQuotationDocQuantity" + rowCount).text(quantity);
		$("#txtPurchaseQuotationChangingItemQty" + rowCount).val(quantity);
		/* $('#' + id).val(quantity); */
		totalPendingQtyGRN();

		/* this used for calculation the base AMT 19sep2016 */
		totalAmountforParialGRN(1, rowCount);

		totalVatAmt(id, rowCount);
		rowAmtCal(id, rowCount);
		calcuatSumforTradeDisAmtforPartialGRN();
		calcuatSumforitemQTYforPartialGRN();

		totalGrossAmt(id, rowCount);
		calculateNetAmount();
		return false;
		// $('#' + id).val('0');
	}
	//grnCallType == "PENDING"
	if (parseInt(actualquantity) > parseInt(quantity) && callFrom == 'fromPendingGRN' && grnCallType == "PENDING" && quantity != 0) {
		alert("Please enter valid quantity");

		return false;
	} 
	else if(callFrom == 'fromNewGRN'){
		var pendingQty = parseInt(expectedQty) - parseInt(actualquantity);
		$("#pendinQtyId" + rowCount).val(pendingQty);
		
		$("#lblPurchaseQuotationDocQuantity" + rowCount).text(actualquantity);

		$("#txtPurchaseQuotationChangingItemQty" + rowCount)
			.val(actualquantity);
	}
	else if(callFrom == 'fromPendingGRN'){
		
		if(grnCallType == "draft"){
			var pendingQty = parseInt(expectedQty) - parseInt(actualquantity);
			$("#pendinQtyId" + rowCount).val(pendingQty);
			
			$("#lblPurchaseQuotationDocQuantity" + rowCount).text(actualquantity);

			$("#txtPurchaseQuotationChangingItemQty" + rowCount)
				.val(actualquantity);
		}else{
			var pendingQty = parseInt(quantity) - parseInt(actualquantity);
			$("#pendinQtyId" + rowCount).val(pendingQty);
			
			$("#lblPurchaseQuotationDocQuantity" + rowCount).text(actualquantity);

			$("#txtPurchaseQuotationChangingItemQty" + rowCount)
				.val(actualquantity);
		}
		
	}

	totalPendingQtyGRN();
	/* this used for calculation the base AMT 19sep2016 */

	totalAmountforParialGRN(1, rowCount);

	totalVatAmt(id, rowCount);
	rowAmtCal(id, rowCount);
	calcuatSumforTradeDisAmtforPartialGRN();
	calcuatSumforitemQTYforPartialGRN();

	totalGrossAmt(id, rowCount);
	calculateNetAmount();
	chkTradAmtorPercentage(id, rowCount);
}

function calcuatSumforitemQTYforPartialGRN() {
	var totaltblsize = $("#totaltblsize").val();
	var FinaltxtItemdocQty = 0;
	var totlqtyflag = 0;
	for (var i = 1; i <= totaltblsize; i++) {
		var txtItemdocQty = $("#lblPurchaseQuotationDocQuantity" + i).text();

		if (txtItemdocQty != '' && txtItemdocQty != null &&
			txtItemdocQty != undefined) {
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
	for (var i = 1; i <= totaltblsize; i++) {

		var txtPurchaseQuotationTrdeDiscountAmt = $(
			"#discountAmtId" + i).val();

		if (txtPurchaseQuotationTrdeDiscountAmt != '' &&
			txtPurchaseQuotationTrdeDiscountAmt != null &&
			txtPurchaseQuotationTrdeDiscountAmt != undefined) {
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

	for (var i = 1; i <= totaltblsize; i++) {
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

	if (parseInt(txtPurchaseQuotationTrdeDiscountPercentage) == 0 &&
		parseInt(txtPurchaseQuotationTrdeDiscountInRupess) == 0) {
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

		var totalAmtInpercntage = baseAmt *
			txtPurchaseQuotationTrdeDiscountPercentage / 100;

		$("#txtPurchaseQuotationTrdeDiscountAmt" + rowCount).val(
			totalAmtInpercntage.toFixed(2));

		var finalBaseAmt = baseAmt - totalAmtInpercntage;
		$("#txtPurchaseQuotationBaseAmount" + rowCount).val(
			finalBaseAmt.toFixed(2));
	}

	// calculate Discount In reupess
	if (parseInt(txtPurchaseQuotationTrdeDiscountInRupess) > 0) {
		var baseAmt = quantity * rate;

		var totalAmtInRupess = baseAmt -
			txtPurchaseQuotationTrdeDiscountInRupess;

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
		yearsRange : [ 1920, 2099 ],
		limitToToday : false,
		dateFormat : "%Y-%m-%d",
		imgPath : "../img/",
		weekStartDay : 1,
	});
/*	var date = new Date();
	date.setDate(date.getDate());
	$('#'+inputID).datepicker({
		autoclose : true,
		startDate: date,
		todayHighlight: true,
		format: 'yyyy-mm-dd'
	});*/

}

function getPendingPurchaseOrder() {
	var inputs = [];
	var str = inputs.join('&');
	jQuery
		.ajax({
			async: true,
			type: "GET",
			data: str + "&reqType=AJAX",
			url: "ehat/invGoodReceiptNote/getPendingPurchaseOrder",
			timeout: 1000 * 60 * 5,
			catche: false,
			error: function () {
				alert("error");
			},
			success: function (response) {
				var divContent = "";
				divContent = divContent +
					"<select class='col-md-12'><option value='0'>---Get PO---</option>";
				for (var i = 0; i < response.purchaseOrderDtos.length; i++) {
					divContent = divContent + "<option value='" +
						response.purchaseOrderDtos[i].id + "'  >" +
						"PO " + response.purchaseOrderDtos[i].orderSeries +
						"No : " + response.purchaseOrderDtos[i].id +
						"</option>";
				}
				
				var inputs1 = [];
				var str1 = inputs1.join('&');
				jQuery
					.ajax({
						async: true,
						type: "GET",
						data: str1 + "&reqType=AJAX",
						url: "ehat/invGoodReceiptNote/getPendingPurchaseReOrder",
						timeout: 1000 * 60 * 5,
						catche: false,
						error: function () {
							alert("error");
						},
						success: function (r) {
							//var divContent = "";
							/*divContent = divContent +
								"<select class='col-md-12'><option value='0'>---Get PRO---</option>";*/
							for (var i = 0; i < r.purchaseReOrderDtos.length; i++) {
								divContent = divContent + "<option value='" +
									r.purchaseReOrderDtos[i].id + "'  >" +
									"PRO " + r.purchaseReOrderDtos[i].orderSeries +
									"No : " + r.purchaseReOrderDtos[i].id +
									"</option>";
							}
							$("#grnPurchaseOrder").html(divContent);
						}
					});
				
				
			}
		});
}

/*function getPendingPurchaseReOrder() {
	var inputs = [];
	var str = inputs.join('&');
	jQuery
		.ajax({
			async: true,
			type: "GET",
			data: str + "&reqType=AJAX",
			url: "ehat/inventoryPurchaseReOrder/getAllPurchaseReOrderRecordsDetails",
			timeout: 1000 * 60 * 5,
			catche: false,
			error: function () {
				alert("error");
			},
			success: function (response) {
				var divContent = "";
				divContent = divContent +
					"<select class='col-md-12'><option value='0'>---Get PRO---</option>";
				for (var i = 0; i < response.purchaseReOrderDtos.length; i++) {
					divContent = divContent + "<option value='" +
						response.purchaseReOrderDtos[i].id + "'  >" +
						response.purchaseReOrderDtos[i].orderSeries +
						"No : " + response.purchaseReOrderDtos[i].id +
						"</option>";
				}
				$("#grnPurchaseOrder").html(divContent);
			}
		});
}*/

function getPurchaseOrder(purchaseOrderId) {
	if (parseInt(purchaseOrderId) === 0) {
		
		var rows = $('#grnItemInfoTable tbody tr.newAdded').length;
		for (var i = 1; i <= rows; i++) {
			$("#gstId"+i).val(0);
			$("#igstId"+i).val(0);
			$("#itemNameId"+i).val("");
			$("#itemQuantityId"+i).val(0);
			$("#unitPriceId"+i).val(0);
			$("#discountPerId"+i).val(0);
			$("#discountRsId"+i).val(0);
			$("#discountAmtId"+i).val(0);
			$("#baseAmountId"+i).val(0);
			$("#gstId"+i).val(0);
			$("#igstId"+i).val(0);
			$("#gstAmtId"+i).val(0);
			$("#igstAmtId"+i).val(0);
			$("#totalAmtId"+i).val(0);
			$("#lblPurchaseQuotationDocQuantity"+i).val(0);
			$("#uomUnitLatestFactorId"+i).val(0);
			$("#factor1"+i).val();
			$("#factor2"+i).val();
			$("#factor3"+i).val();
			$("#factor4"+i).val();
			$("#uomUnitFactorOneNameId"+i).val(0);
			$("#uomUnitFactorTwoNameId"+i).val(0);
			$("#uomUnitFactorThreeNameId"+i).val(0);
			$("#uomUnitFactorFourNameId"+i).val(0);
			$("#itemExpectedQtyId"+i).val(0);
			$("#itemReceivedQtyId"+i).val(0);
			$("#totalReceivedQtyId"+i).val(0);
			$("#pendinQtyId"+i).val(0);
			$("#batchId"+i).val();
			$("#itemManufactureDateId"+i).val("");
			$("#itemExpireDateId"+i).val("NA");
			$("#itemTotalAmount1"+i).val(0);
		}
		alert("Please select at least one purchase order");
		$("#hideGrnAddButton").show();
		$("#grnSupplierName").val("");
		$("#grnMobileNo").val("");
		$("#hiddenSupplierNameId").val("");
		$("#grnDate").val($("#grnDate").val());
		$('#grnSupplierState').select2('val',0);
		$("#grnReferenceNo").val("");
		$("#grnPurInvNumber").val(0);
		$("#grnDeliveryDate").val("");
		$("#grnSupplierAddress").val("");
		$("#grnStatus option:selected").val(0);
		$("#grnDeliveryChallanNumber").val(0);

		$("#totalItemQty").val(0);
		$("#totalItemDiscount").val(0);

		$("#txtSplDisc").val(0);
		$("#txtdebitAmt").val(0);
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
		$("#txtGRNArermark").val(0);
		$("#sumofCharges").val(0);

		$("#txtGross").val(0);
		$("#txtLess").val(0);
		$("#txtAdd").val(0);
		$("#grossTaxesId").val(0);
		$("#txtNetAmt").val();
		
		return false;
	}
	var inputs = [];
	inputs.push("id=" + purchaseOrderId);
	var str = inputs.join('&');
	jQuery.ajax({
		async: true,
		type: "GET",
		data: str + "&reqType=AJAX",
		url: "ehat/inventoryPurchaseOrder/editPurchaseOrder",
		timeout: 1000 * 60 * 5,
		catche: false,
		error: function () {
			alert("error");
		},
		success: function (response) {
			$("#grnSupplierName").val(response.supplierName);
			$("#grnMobileNo").val(response.supplierMobileNo);
			$("#hiddenSupplierNameId").val(response.partyMasterDtos.id);
			$("#grnDate").val($("#grnDate").val());
			//setParyMasterStateToGrn(response.partyMasterDtos);
			getVenderState()
			$('#grnSupplierState').select2('val', response.supplierStateId);
			$("#hiddenVenderState").val(response.supplierStateId);
			$("#grnReferenceNo").val(response.referenceNo);
			$("#grnPurInvNumber").val($("#grnPurInvNumber").val());
			$("#grnDeliveryDate").val(response.deliveryDate);
			$("#grnSupplierAddress").val(response.supplierAddress);
			$("#grnStatus option:selected").val($("#grnStatus option:selected").val());
			$("#grnDeliveryChallanNumber").val($("#grnDeliveryChallanNumber").val());

			$("#totalItemQty").val(response.totalItemQuantity);
			$("#totalItemDiscount").val(response.totalItemDiscount);

			$("#txtSplDisc").val(response.lessSpecialDiscount);
			$("#txtdebitAmt").val(response.lessDebitAmount);
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
			$("#txtGRNArermark").val(response.purchaseOrderRemark);
			$("#sumofCharges").val(0);

			$("#txtGross").val(response.grossAmount);
			$("#txtLess").val(response.grossLessAmount);
			$("#txtAdd").val(response.grossAddAmount);
			$("#grossTaxesId").val(response.grossTaxes);
			$("#txtNetAmt").val(response.grossNetAmount);
			$("#btnAddNew").hide();
			setEditGoodReceiptNoteSlaveInfo(response, "purchaseOrder","");


		}
	});
}

function getPurchaseReOrder(purchaseReOrderId) {
	if (parseInt(purchaseReOrderId) === 0) {
		
		var rows = $('#grnItemInfoTable tbody tr.newAdded').length;
		for (var i = 1; i <= rows; i++) {
			$("#gstId"+i).val(0);
			$("#igstId"+i).val(0);
			$("#itemNameId"+i).val("");
			$("#itemQuantityId"+i).val(0);
			$("#unitPriceId"+i).val(0);
			$("#discountPerId"+i).val(0);
			$("#discountRsId"+i).val(0);
			$("#discountAmtId"+i).val(0);
			$("#baseAmountId"+i).val(0);
			$("#gstId"+i).val(0);
			$("#igstId"+i).val(0);
			$("#gstAmtId"+i).val(0);
			$("#igstAmtId"+i).val(0);
			$("#totalAmtId"+i).val(0);
			$("#lblPurchaseQuotationDocQuantity"+i).val(0);
			$("#uomUnitLatestFactorId"+i).val(0);
			$("#factor1"+i).val();
			$("#factor2"+i).val();
			$("#factor3"+i).val();
			$("#factor4"+i).val();
			$("#uomUnitFactorOneNameId"+i).val(0);
			$("#uomUnitFactorTwoNameId"+i).val(0);
			$("#uomUnitFactorThreeNameId"+i).val(0);
			$("#uomUnitFactorFourNameId"+i).val(0);
			$("#itemExpectedQtyId"+i).val(0);
			$("#itemReceivedQtyId"+i).val(0);
			$("#totalReceivedQtyId"+i).val(0);
			$("#pendinQtyId"+i).val(0);
			$("#batchId"+i).val();
			$("#itemManufactureDateId"+i).val("");
			$("#itemExpireDateId"+i).val("NA");
			$("#itemTotalAmount1"+i).val(0);
		}
		alert("Please select at least one purchase order");
		$("#btnAddNew").show();
		$("#grnSupplierName").val("");
		$("#grnMobileNo").val("");
		$("#hiddenSupplierNameId").val("");
		$("#grnDate").val($("#grnDate").val());
		$('#grnSupplierState').select2('val',0);
		$("#grnReferenceNo").val("");
		$("#grnPurInvNumber").val(0);
		$("#grnDeliveryDate").val("");
		$("#grnSupplierAddress").val("");
		$("#grnStatus option:selected").val(0);
		$("#grnDeliveryChallanNumber").val(0);

		$("#totalItemQty").val(0);
		$("#totalItemDiscount").val(0);

		$("#txtSplDisc").val(0);
		$("#txtdebitAmt").val(0);
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
		$("#txtGRNArermark").val(0);
		$("#sumofCharges").val(0);

		$("#txtGross").val(0);
		$("#txtLess").val(0);
		$("#txtAdd").val(0);
		$("#grossTaxesId").val(0);
		$("#txtNetAmt").val();
		
		return false;
	}
	var inputs = [];
	inputs.push("id=" + purchaseReOrderId);
	var str = inputs.join('&');
	jQuery.ajax({
		async: true,
		type: "GET",
		data: str + "&reqType=AJAX",
		url: "ehat/inventoryPurchaseReOrder/editPurchaseReOrder",
		timeout: 1000 * 60 * 5,
		catche: false,
		error: function () {
			alert("error");
		},
		success: function (response) {
			$("#grnSupplierName").val(response.supplierName);
			$("#grnMobileNo").val(response.supplierMobileNo);
			$("#hiddenSupplierNameId").val(response.partyMasterDtos.id);
			$("#grnDate").val($("#grnDate").val());
			setParyMasterStateToGrn(response.partyMasterDtos);
			$('#grnSupplierState').select2('val', response.supplierStateId);
			$("#hiddenVenderState").val(response.supplierStateId);
			getVenderState()
			$("#grnReferenceNo").val(response.referenceNo);
			$("#grnPurInvNumber").val($("#grnPurInvNumber").val());
			$("#grnDeliveryDate").val(response.deliveryDate);
			$("#grnSupplierAddress").val(response.supplierAddress);
			$("#grnStatus option:selected").val($("#grnStatus option:selected").val());
			$("#grnDeliveryChallanNumber").val($("#grnDeliveryChallanNumber").val());

			$("#totalItemQty").val(response.totalItemQuantity);
			$("#totalItemDiscount").val(response.totalItemDiscount);

			$("#txtSplDisc").val(response.lessSpecialDiscount);
			$("#txtdebitAmt").val(response.lessDebitAmount);
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
			$("#txtGRNArermark").val(response.purchaseOrderRemark);
			$("#sumofCharges").val(0);

			$("#txtGross").val(response.grossAmount);
			$("#txtLess").val(response.grossLessAmount);
			$("#txtAdd").val(response.grossAddAmount);
			$("#grossTaxesId").val(response.grossTaxes);
			$("#txtNetAmt").val(response.grossNetAmount);
			$("#btnAddNew").hide();
			setEditGoodReceiptNoteSlaveInfo(response, "purchaseReOrder","");

		}
	});
}

function checkBatchAvailability(batchId,id) {

	var itemMasterId = $("#grnItemId").val();
	
	if (itemMasterId != null && itemMasterId > 0) {
		itemMasterId = $("#grnItemId").val();
	} else {
		itemMasterId = $("#itemId"+id).val();
		if(itemMasterId != null && itemMasterId > 0){
			itemMasterId = $("#itemId"+id).val();
		}else{
			alertify.error("Please Select Item name ");
			return 0;	
		}
	}
	jQuery.ajax({
		async: true,
		type: "GET",
		data: {
			id: batchId,
			itemMasterId: itemMasterId,
		},
		url: "ehat/invGoodReceiptNote/checkBatchAvailability",
		timeout: 1000 * 60 * 5,
		catche: false,
		error: function () {
			alert("error");
		},
		success: function (result) {
			if (result.length == 0) {
				alertify.success("Add new batch code for this item");
				$("#txtExpiry").val('');
				$("#txtExpiry").prop("readonly", false);
				$("#hiddenBatchId").val('0');
				$("#addNewRowWithSameItem" + id).attr('disabled', false);
				//pendingAmount("itemReceivedQtyId"+id,id,'fromNewGRN');
				var pendingQty = $("#pendinQtyId"+id).val();
				if(parseInt(pendingQty) !=0 ){
					newPendingQtyCalculation(id);
				}
			} else {
				alertify.error("Batch code already exit for this item");
				$("#txtExpiry").val(result[0].batchExpDate);
				$("#txtExpiry").prop("readonly", true);
			}

		}
	});
}

function setPartyModalAddressInfoToGRN(response) {
	var count = 0;
	var htm = "";

	for (var i = 0; i < response.partyMasterAddressInfoDto.length; i++) {

		count++;
		htm = htm +
			'<tr class="newAdded"> ' +
			' <td class="col-md-1 center">' +
			count +
			'</td>' +
			' <td class="col-md-1 center"><input id="radioId" name="rdTreat" type="radio" value="' + count + '">'
			+
			'</td>'
			+
			' <td  class="hidden"><input id="countId" type="text" value=' + count + '>'
			+
			'</td>'
			+
			' <td class="col-md-1 center" id="stateName' +
			count +
			'" >' +
			response.partyMasterAddressInfoDto[i].state +
			'</td>'
			+
			' <td class="col-md-1 center" style="word-break: break-all !important; width: 100px !important; word-wrap: break-word!important;" id="address' +
			count +
			'" >' +
			response.partyMasterAddressInfoDto[i].address +
			'</td>'


			+
			'</tr>';


	}
	$("#partyMasterAddressSlaveRecordList").html(htm);

	//showpartyMasterDetailsModal();
}

function setPartyModalContactInfoToGRN(response) {

	var count = 0;
	var htm = "";
	for (var i = 0; i < response.partyMasterContactInfoDto.length; i++) {

		$("#mbNo").val(response.partyMasterContactInfoDto[i].contactPhoneNumber1);
		count++;
		htm = htm +
			'<tr class="newAdded"> ' +
			' <td class="col-md-1 center">' +
			count +
			'</td>' +
			' <td class="col-md-1 center"><input id="radioId1" name="rdTreat1" type="radio" value="' + count + '">'

			+
			'</td>'

			+
			' <td class="col-md-1 center" id="contactPhoneOne' +
			count +
			'" >' +
			response.partyMasterContactInfoDto[i].contactPhoneNumber1 +
			'</td>' +
			'</tr>';
	}
	$("#partyMasterContactSlaveRecordList").html(htm);


}

function setPartyModalInfoToTableOnGRN() {

	$("input[name='rdTreat']:checked").each(function () {

		var inx = $(this).val();

		$("#grnSupplierAddress").val($("#address" + inx).html());
	});

	$("input[name='rdTreat1']:checked").each(function () {

		var inx = $(this).val();

		$("#grnMobileNo").val($("#contactPhoneOne" + inx).html());
	});
	closepartyMasterDetailsModal();
}

function closepartyMasterDetailsModal() {
	$("#goodReceiptNoteModalId").hide();
}

function setParyMasterStateToGrn(r) {
	var divContent = "";
	divContent = divContent +
		"<select name='room Name' class='col-md-12'><option value='0'>---Select---</option>";

	for (var i = 0; i < r.partyMasterAddressInfoDto.length; i++) {
		divContent = divContent + "<option value='" + r.partyMasterAddressInfoDto[i].stateId + "'>" +
			r.partyMasterAddressInfoDto[i].state + "</option>";
	}
	divContent = divContent + "</select>";
	$("#grnSupplierState").html(divContent);
	$("#grnSupplierState").select2();

}

function getVenderState() {
	var supplierState = $("#grnSupplierState option:selected").val();
	var userState = $("#userState").val();
	var rows = $('#grnItemInfoTable tbody tr.newAdded').length;
	$("#hiddenVenderState").val(supplierState);
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
	datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2);
	console.log("Datee >> " + datee);
	return datee;
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

/**
 * @since 12-02-2020
 * @author This method is craeted for to remove duplicate states after selecting party name on GRN
 */
function removeDuplicateStatesGRN(){
	var optionValues =[];
	$('#grnSupplierState option').each(function(){
	   if($.inArray(this.value, optionValues) >-1){
	      $(this).remove();
	   }else{
	      optionValues.push(this.value);
	   }
	});
}

/************
* @author	: Dayanand Khandekar
* @date		: 13-Jan-2020
* @codeFor	:closePurchaseQuationPopUp
 ************/
function closeGRNPopUp(){
	refreshGRN();
	$("#goodReceiptNoteModal").modal('hide');
}
function rowAmtCal(id, rowCount) {

	var taxAmt = $("#igstId" + rowCount).val();
	var gstTaxAmt = 0;
	var iGgstTaxAmt = 0;
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#totalAmtId' + rowCount).val(' ');
		$('#itemTotalAmount' + rowCount).val(' ');
		return false;
	} 
	if($("#igstId" + rowCount).val() == 0 && $("#gstId" + rowCount).val() > 0){
		taxAmt = 	$("#gstId" + rowCount).val();
	}else if($("#igstId" + rowCount).val() > 0 && $("#gstId" + rowCount).val() == 0){
		taxAmt = 	$("#igstId" + rowCount).val();
	}
	var baseAmt = $('#baseAmountId' + rowCount).val();
	if (baseAmt == " " || baseAmt == null) {
		$("#totalAmtId").val(' ');
		$("#itemTotalAmount").val(' ');
		return false;
	}
	else
	{
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#baseAmountId' + rowCount).val();
		//var taxAmt = $("#igstId" + rowCount).val();
		var userState = $('#userState').val();
		var hiddenVenderState = $('#hiddenVenderState').val();
		if(userState == hiddenVenderState){
			gstTaxAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
			$('#gstAmtId' + rowCount).val(gstTaxAmt);
		}else{
			iGgstTaxAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
			$('#igstAmtId' + rowCount).val(iGgstTaxAmt);
		}
		
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		//$("#gstAmtId" + rowCount).val(finalcaltaxanmount); //add tax amount in Rs purchase quotation  @author:paras @Date:23nov
		
		finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		var finalRowAmountAddingtax = finalsumofRowAmt.toFixed(2);
		
		$('#totalAmtId' + rowCount).val(finalRowAmountAddingtax);
		$('#itemTotalAmount' + rowCount).val(finalRowAmountAddingtax);
	}

}
/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 20-02-2020
 * @codeFor : refreshGRN
 ******************************************************************************/
function refreshGRN(){	
		 $("#grnId").val(0);
		 $("#grnMobileNo").val("");
		 $("#grnMobileNo").attr("placeholder","Enter Mobile No");
		 $("#grnReferenceNo").val("");
		 $("#grnReferenceNo").attr("placeholder","Enter Reference No");
		 $("#grnSupplierAddress").val("");
		 $("#grnSupplierAddress").attr("placeholder","Address");
		 $("#grnSupplierName").val("");
		 $("#grnSupplierName").attr("placeholder","Enter Party Name"); 
		 $("#txtGRNArermark").val("");
		 $("#totalItemQty").val("");
		 $("#totalItemDiscount").val("");
		 $("#grnSupplierState").val(0);
		 $("#hiddenSupplierNameId").val(0);
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
		 $("#grossTaxesId").val(0);
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
		var table = document.getElementById('grnItemInfoTable');
		var rowCount = table.rows.length;
		for (var i = tableHeaderRowCount2; i < rowCount; i++) {
		    table.deleteRow(tableHeaderRowCount2);
		}
		
		var tableHeaderRowCount3 = 1;
		var table = document.getElementById('uploadedDocumentTable');
		var rowCount = table.rows.length;
		for (var i = tableHeaderRowCount3; i < rowCount; i++) {
		    table.deleteRow(tableHeaderRowCount3);
		}
		//here we calling this function to generate the item info table rows after closing the modal	
		//addNewRowInTable('grnItemInfoTable','GRN');
	
}

/*******************************************************************************
 * @author : Dayanand khandekar
 * @date : 27-02-2020
 * @codeFor : calcultae total item amount with igst_gst_base amount of all item
 ******************************************************************************/
function calculateTotalItemAmount(id){
	
var tableLengt = $('#grnItemInfoTable tbody tr.newAdded').length;
	
	var totalGstAMt=0;
	for(var i=1;i<=tableLengt;i++){
		
		var totalAmt=$("#totalAmtId"+i).val();
		totalAmt = (totalAmt != '' && totalAmt !="undefined" && totalAmt !=null) ? totalAmt : 0;
		
		totalGstAMt=parseFloat(totalGstAMt)+ parseFloat(totalAmt);
		
	}
	
	$("#itemTotalAmt").val(totalGstAMt);
}

/*******************************************************************************
 * @author : Dayanand khandekar
 * @date : 27-02-2020
 * @codeFor : reset total amt after selecting state
 ******************************************************************************/
function resetItemTotalAmount(){
	$("#itemTotalAmt").val(0);
	$("#textVat").val(0);
	$("#txtVat").val(0);
	$("#txtigstVat").val(0);
	
	
}

/*******************************************************************************
 * @author : Dayanand khandekar
 * @date : 28-02-2020
 * @codeFor : this function calculate total gst amount of all item
 ******************************************************************************/
function calculateTotalItemgstAmount(id){
	var tableLengt = $('#grnItemInfoTable tbody tr.newAdded').length;
	
	var totalGstAMt=0;
	for(var i=1;i<=tableLengt;i++){
		
		var itemGstAmt=$("#gstAmtId"+i).val();
		
		totalGstAMt=parseFloat(totalGstAMt)+ parseFloat(itemGstAmt);
		
	}
	
	$("#totalGstAmt").val(totalGstAMt);
}

/*******************************************************************************
 * @author : Dayanand khandekar
 * @date : 28-02-2020
 * @codeFor : this function calculate total igst amount of all item
 ******************************************************************************/
function calculateTotalItemigstAmount(){
	
var tableLengt = $('#grnItemInfoTable tbody tr.newAdded').length;
	
	var totalGstAMt=0;
	for(var i=1;i<=tableLengt;i++){
		
		var itemGstAmt=$("#igstAmtId"+i).val();
		
		totalGstAMt=parseFloat(totalGstAMt)+ parseFloat(itemGstAmt);
		
	}
	
	$("#totaliGstAmt").val(totalGstAMt);
	
}


/*******************************************************************************
 * @author : Dayanand khandekar
 * @date : 2-03-2020
 * @codeFor : this function calculate total gst amount of all item
 ******************************************************************************/
function calculateTotalItemgstAmountAfterRemoveRow(id){
	var tableLengt = $('#grnItemInfoTable tbody tr.newAdded').length;
	
	var totalGstAMt=0;
	for(var i=1;i<=tableLengt;i++){
		
		var itemGstAmt=$("#gstAmtId"+i).val();
		itemGstAmt = (itemGstAmt != '' && itemGstAmt !="undefined" && itemGstAmt !=null) ? itemGstAmt : 0;
		
		totalGstAMt=parseFloat(totalGstAMt)+ parseFloat(itemGstAmt);
		
	}
	
	$("#totalGstAmt").val(totalGstAMt);
	//$("#txtTotalVat").val(totalGstAMt);
	$("#grossTaxesId").val(totalGstAMt);//set total gst after remove the row it shows total gst of present row
	//$("#textVat").val(totalGstAMt);//set total tax in Total Tab in UI
	document.getElementById("txtVat").value = totalGstAMt;
	document.getElementById("txtTotalVat").value = totalGstAMt;
}

/*******************************************************************************
 * @author : Dayanand khandekar
 * @date : 2-03-2020
 * @codeFor : this function calculate total igst amount of all item
 ******************************************************************************/
function calculateTotalItemigstAmountAfterRemoveRow(){
	
var tableLengt = $('#grnItemInfoTable tbody tr.newAdded').length;
	
	var totalGstAMt=0;
	for(var i=1;i<=tableLengt;i++){
		
		var itemGstAmt=$("#igstAmtId"+i).val();
		itemGstAmt = (itemGstAmt != '' && itemGstAmt !="undefined" && itemGstAmt !=null) ? itemGstAmt : 0;
		
		totalGstAMt=parseFloat(totalGstAMt)+ parseFloat(itemGstAmt);
		
	}
	
	$("#totaliGstAmt").val(totalGstAMt);
	$("#txtTotalVat").val(totalGstAMt);
	$("#txtigstVat").val(totalGstAMt);//set total gst after remove the row it shows total gst of present row
	$("#textVat").val(totalGstAMt);//set total tax in Total Tab in UI
}


/*******************************************************************************
 * @author : Dayanand khandekar
 * @date : 27-02-2020
 * @codeFor : calcultae total item amount with igst_gst_base amount of all item
 ******************************************************************************/
function calculateTotalItemAmountAfterRemoveRow(id){
	
var tableLengt = $('#grnItemInfoTable tbody tr.newAdded').length;
	
	var totalGstAMt=0;
	for(var i=1;i<=tableLengt;i++){
		
		var totalAmt=$("#totalAmtId"+i).val();
		totalAmt = (totalAmt != '' && totalAmt !="undefined" && totalAmt !=null) ? totalAmt : 0;
		
		totalGstAMt=parseFloat(totalGstAMt)+ parseFloat(totalAmt);
		
	}
	
	$("#txtNetAmt").val(totalGstAMt);
}


function uploadGoodReceiptNoteDocuments(grnMasterId,callFrom) {
	var form = $("#documentForm")[0];
	if (document.getElementsByName("uploadGrnDocs").length == 0 || $("#uploadGrnDocument").val() == "") {
		alert("Please select file");
		return false;
	}
	var grnId = 0;
	if(grnMasterId  !=undefined && grnMasterId !=null && grnMasterId !=0 && grnMasterId !='undefined'){
		grnId = grnMasterId;
	}else{
		grnId = $("#grnId").val();	
	}
	var grnDocSlaveId = $("#grnDocSlaveId").val();
	var uploadGrnDocument = getFileValue('uploadGrnDocument');
	var uploadGrnComment = $("#uploadGrnComment").val();

	var grnDocumentUpload = {
			lstGoodReceiptNoteDocUploadDto : []
		};
	grnDocumentUpload.lstGoodReceiptNoteDocUploadDto.push({
		id : grnDocSlaveId,
		grnMasterId : grnId,
		imagePath : JSON.stringify(uploadGrnDocument),
		note : uploadGrnComment,
	});

	var data = new FormData(form);
	data.append("documentUpload", JSON.stringify(grnDocumentUpload));
	data.append("grnMasterId", grnId);

	jQuery.ajax({
		async : true,
		type : "POST",
		enctype : 'multipart/form-data',
		url : "ehat/invGoodReceiptNote/uploadGoodReceiptNoteDocument",
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
				getUploadedDocuments(grnId);
				$('#uploadGrnDocument').val("");
				$('#uploadGrnComment').val("");
				if(callFrom =="SAVEGRN"){
					refreshGRN();
					setTimeout(function() {
				         window.location.reload();
				      }, 1000);
				}
				
			}else if(r == 2){
				alertify.success("Document Updated Sucessfully"); 
				getUploadedDocuments(grnId);
				$('#uploadGrnDocument').val("");
				$('#uploadGrnComment').val("");
				if(callFrom =="SAVEGRN"){
					refreshGRN();
					setTimeout(function() {
				         window.location.reload();
				      }, 1000);
				}
			}else if(r == 0){
				$('#uploadGrnDocument').val("");
				$('#uploadGrnComment').val("");
				alertify.error("Oops Some Problem Ocured"); 
			}
		}
	});
}
function getUploadedDocuments(grnId){
	var grnId = grnId; // $("#grnId").val();
	var count = 0;
	var htm = "";
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {"grnMasterId" : grnId },
		url : "ehat/invGoodReceiptNote/getUploadedDocuments",
		success : function(response) {
			if(response !=null && response !="" && response.lstGoodReceiptNoteDocUploadDto !=null){
				var fileName = "";
				//fileName.replace(/^\[(.+)\]$/,'$1')
				
				for ( var i = 0; i < response.lstGoodReceiptNoteDocUploadDto.length; i++) {
					count++;
					fileName = response.lstGoodReceiptNoteDocUploadDto[i].imagePath;
					htm = htm
					+ '<tr class="newAdded"> '
					+ ' <td class="col-md-1 center">'
					+ count
					+ '</td>'
					+ ' <td class="col-md-1 center" id="filePathDocumentUploadId' + count
					+ '" >'
					+ response.lstGoodReceiptNoteDocUploadDto[i].imagePath
					+ '</td>'
					+ ' <td class="col-md-1 center" id="commentDocumentUploadId' + count
					+ '" >'
					+ response.lstGoodReceiptNoteDocUploadDto[i].note
					+ '</td>'
					+ ' <td class="col-md-1 center" id="uploadedDateDocumentUploadId' + count
					+ '" >'
					+ getDateWithTime(response.lstGoodReceiptNoteDocUploadDto[i].createdDate)
					+ '</td>'
					//view button
					+ ' <td class="col-md-1 center"><button id="viewDocumentUploadId'+count+'" value="'+JSON.parse(response.lstGoodReceiptNoteDocUploadDto[i].imagePath)+'"  type="button" onclick="viewUploadedDocument(this.value)" ><i class="fa fa-eye" title="View Document"></i></button>'
					// delete button
					+ ' <td class="col-md-1 center"><button class="btn btn-xs btn-danger editBodyPartMaster deleteUserAccess" id="deleteDocumentUploadId'+count+'" value="'+response.lstGoodReceiptNoteDocUploadDto[i].id+'"  type="button" onclick="deleteUploadedDocument(this.value)" ><i class="fa fa-trash-o" title="Delete Document"></i></button>'
					+ '</td>'
					
					+ '</tr>';
				}
				$('#uploadedDocumentGrnBody').html(htm);
			}
		}
			
	});
}

function viewUploadedDocument(document){
	if(document ==null || document =="" || document ==undefined){
		alert("No File To View First Upload And Save file");
	}else{
		var grnId = $("#grnId").val();
		$('#viewDocumentGrn').attr("src","");
		$('#viewDocumentGrn').attr("src","ehat/invGoodReceiptNote/readDocuments?grnMasterId="+grnId+"&fileName="+document);
		$('#viewGrnDocModal').modal('show');
	}

}

//this is added by Vishnu 
function deleteUploadedDocument(id){
	var inputs = [];
	inputs.push('id='+id);
	var str = inputs.join('&');
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data 	: str + "&reqType=AJAX",
		url 	: "ehat/invGoodReceiptNote/deleteUploadedDocument",
		timeout : 1000 * 60 * 5,
		catche	: false,
		success : function(r) {
			if(r == true){
				alertify.success("Document Deleted Sucessfully");
			}else {
				alertify.error("Document Is Not Deleted ");
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
function closeGrnDocumentModalView() {
	$('#viewBatchDocModal').modal('hide');
}
/**
 * 
 * @param id1
 */
function addRowAssetMaintenance(id1) {
	var length = $("#itemReceivedQtyId" + id1).val();
	
	$("#maintenanceTableInfo tr").remove();
	
	var assetMaintenanceTableLength = $('#maintenanceTableInfo tbody tr.newAdded').length;
	var newId = assetMaintenanceTableLength + 1;
	var htm = "";
	if(assetMaintenanceTableLength == 0){
		var labEquipmentStatus = "";
		if ($("#assetItemStatusId" + id1).val() == 1
				&& $("#labEquipmentItemStatusId" + id1).val() == 1) {
			labEquipmentStatus = "LABEQUIPMENT";
		} else {
			labEquipmentStatus = "OTHER";
		}

		if ($("#assetItemStatusId" + id1).val() == 1) {
			var id = 0;
			itemName = $("#itemNameId" + id1).val();
			partyMasterId = $("#hiddenSupplierNameId").val();
			partyName = $("#grnSupplierName").val();
			itemId = $("#itemId" + id1).val();
			manufactureName = $("#assetItemManufactureId" + id1).val();

			assetAmcVal = $('#assetAmcValId' + id1).val();
			assetPmVal = $('#assetPmValId' + id1).val();
			assetAmcYear = $('#assetAmcYearId' + id1).val();
			assetPmYear = $('#assetPmYearId' + id1).val();
			assetProductWarranty = $('#assetProductWarrantyId' + id1).val();
			assetProductWarrantyDuration = $('#assetProductWarrantyDurationId' + id1).val();
			assetUnitPrice =  $('#unitPriceId' + id1).val();
			
			assetProductCategory = $('#assetProductCategory' + id1).val();
			for ( var i = 0; i < length; i++) {
				htm = htm
						+ "<tr class='newAdded' id='multiTr"
						+ id
						+ "'>"
						+ "<td class='center'>"
						+ "<input type='checkbox' class='chkBatchItem' name='row' id='assetRowId"
						+ newId
						+ "' value="
						+ newId
						+ " onclick='getRadioButtonIndex(this.value)' autofocus='autofocus'><span style='display:none;' id='snum"
						+ +newId
						+ "'>"
						+ newId
						+ "</span></td>"
						+ "<td class='center' style='display:none;'><input  style='width: 100px;' type='text' id='assetItemSlaveId"
						+ newId
						+ "' class='form-control input-SmallText' value='0'></td>"
						+ "<td class='center'><input  style='width: 100px;' autocomplete='off' type='text' id='serialNoAssetId"
						+ newId
						+ "' class='form-control input-SmallText' value=''></td>"
						+ "<td class='center'><input  style='width: 250px;' type='text' id='itemNameAssetId"
						+ newId
						+ "' class='form-control input-SmallText' value='"
						+ itemName
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 100px;display:none' type='text' id='itemAssetId"
						+ newId
						+ "' class='form-control input-SmallText' value='"
						+ itemId
						+ "'></td>"
						+ "<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetManufactureNameId"
						+ newId
						+ "' class='form-control input-SmallText' value='"
						+ manufactureName
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetPartyNameId"
						+ newId
						+ "' class='form-control input-SmallText' value='"
						+ partyName
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetPartyMasterIdId"
						+ newId
						+ "' class='form-control input-SmallText' value='"
						+ partyMasterId
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 100px;display:none' type='text' id='assetAmcValAssetId"
						+ newId
						+ "' class='form-control input-SmallText' value='"
						+ assetAmcVal
						+ "'></td>"
						+ "<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetPmValAssetId"
						+ newId
						+ "' class='form-control input-SmallText' value='"
						+ assetPmVal
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetAmcYearAssetId"
						+ newId
						+ "' class='form-control input-SmallText' value='"
						+ assetAmcYear
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetPmYearAssetId"
						+ newId
						+ "' class='form-control input-SmallText' value='"
						+ assetPmYear
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetProductWarrantyAssetId"
						+ newId
						+ "' class='form-control input-SmallText' value='"
						+ assetProductWarranty
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetProductWarrantyDurationAssetId"
						+ newId
						+ "' class='form-control input-SmallText' value='"
						+ assetProductWarrantyDuration
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetUnitPriceAssetId"
						+ newId
						+ "' class='form-control input-SmallText' value='"
						+ assetUnitPrice
						+ "'> </td>"
						
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetProductCategoryAssetId"
						+ newId
						+ "' class='form-control input-SmallText' value='"
						+ assetProductCategory
						+ "'> </td>"
						+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetlabEquipmentStatusAssetId"
						+ newId + "' class='form-control input-SmallText' value='"
						+ labEquipmentStatus + "'> </td>" + "</tr>";
				newId++;
			}
		}
	}else{
		
			var labEquipmentStatus = "";
			if ($("#assetItemStatusId" + id1).val() == 1
					&& $("#labEquipmentItemStatusId" + id1).val() == 1) {
				labEquipmentStatus = "LABEQUIPMENT";
			} else {
				labEquipmentStatus = "OTHER";
			}

				if ($("#assetItemStatusId" + id1).val() == 1) {
					if (confirm("Do you want add new row for asset maintenance!")) {
						var id = 0;
						itemName = $("#itemNameId" + id1).val();
						partyMasterId = $("#hiddenSupplierNameId").val();
						partyName = $("#grnSupplierName").val();
						itemId = $("#itemId" + id1).val();
						manufactureName = $("#assetItemManufactureId" + id1).val();
	
						assetAmcVal = $('#assetAmcValId' + id1).val();
						assetPmVal = $('#assetPmValId' + id1).val();
						assetAmcYear = $('#assetAmcYearId' + id1).val();
						assetPmYear = $('#assetPmYearId' + id1).val();
						assetProductWarranty = $('#assetProductWarrantyId' + id1).val();
						assetProductCategory = $('#assetProductCategory' + id1).val();
						assetUnitPrice =  $('#unitPriceId' + id1).val();
						for ( var i = 0; i < length; i++) {
							htm = htm
									+ "<tr class='newAdded' id='multiTr"
									+ id
									+ "'>"
									+ "<td class='center'>"
									+ "<input type='checkbox' class='chkBatchItem' name='row' id='assetRowId"
									+ newId
									+ "' value="
									+ newId
									+ " onclick='getRadioButtonIndex(this.value)' autofocus='autofocus'><span style='display:none;' id='snum"
									+ +newId
									+ "'>"
									+ newId
									+ "</span></td>"
									+ "<td class='center' style='display:none;'><input  style='width: 100px;' type='text' id='assetItemSlaveId"
									+ newId
									+ "' class='form-control input-SmallText' value='0'></td>"
									+ "<td class='center'><input  style='width: 100px;' autocomplete='off' type='text' id='serialNoAssetId"
									+ newId
									+ "' class='form-control input-SmallText' value=''></td>"
									+ "<td class='center'><input  style='width: 250px;' type='text' id='itemNameAssetId"
									+ newId
									+ "' class='form-control input-SmallText' value='"
									+ itemName
									+ "'> </td>"
									+ "<td style='display:none;'><input  style='width: 100px;display:none' type='text' id='itemAssetId"
									+ newId
									+ "' class='form-control input-SmallText' value='"
									+ itemId
									+ "'></td>"
									+ "<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetManufactureNameId"
									+ newId
									+ "' class='form-control input-SmallText' value='"
									+ manufactureName
									+ "'> </td>"
									+ "<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetPartyNameId"
									+ newId
									+ "' class='form-control input-SmallText' value='"
									+ partyName
									+ "'> </td>"
									+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetPartyMasterIdId"
									+ newId
									+ "' class='form-control input-SmallText' value='"
									+ partyMasterId
									+ "'> </td>"
									+ "<td style='display:none;'><input  style='width: 100px;display:none' type='text' id='assetAmcValAssetId"
									+ newId
									+ "' class='form-control input-SmallText' value='"
									+ assetAmcVal
									+ "'></td>"
									+ "<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetPmValAssetId"
									+ newId
									+ "' class='form-control input-SmallText' value='"
									+ assetPmVal
									+ "'> </td>"
									+ "<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetAmcYearAssetId"
									+ newId
									+ "' class='form-control input-SmallText' value='"
									+ assetAmcYear
									+ "'> </td>"
									+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetPmYearAssetId"
									+ newId
									+ "' class='form-control input-SmallText' value='"
									+ assetPmYear
									+ "'> </td>"
									+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetProductWarrantyAssetId"
									+ newId
									+ "' class='form-control input-SmallText' value='"
									+ assetProductWarranty
									+ "'> </td>"
									+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetProductWarrantyDurationAssetId"
									+ newId
									+ "' class='form-control input-SmallText' value='"
									+ assetProductWarrantyDuration
									+ "'> </td>"
									+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetUnitPriceAssetId"
									+ newId
									+ "' class='form-control input-SmallText' value='"
									+ assetUnitPrice
									+ "'> </td>"
									+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetProductCategoryAssetId"
									+ newId
									+ "' class='form-control input-SmallText' value='"
									+ assetProductCategory
									+ "'> </td>"
									+ "<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetlabEquipmentStatusAssetId"
									+ newId + "' class='form-control input-SmallText' value='"
									+ labEquipmentStatus + "'> </td>" + "</tr>";
							newId++;
						}
					}
			}
		
	}

$("#maintenanceTableInfoList").append(htm);
updatePendingQty();
}

// this is added for remove asset row by Vishnu
function removeRowFromAssetTable(tableId, checkboxClass) {
	if (confirm("Do you want remove a checked row of asset!")) {
		$('.' + checkboxClass + ':checkbox:checked').parents("tr").remove();
		check(tableId);
		checkCompGrn(tableId);
	}
}

function checkCompGrn(tableId) {
	var trLength = $('#' + tableId).find("tr:first th").length;
	obj = $('#' + tableId + ' tbody tr td').find('input');
	var inx = 1;
	var idIndex = 1;
	$.each(obj, function(key, value) {

		if (inx == (trLength + 1)) {

			inx = 1;
			idIndex++;
		}
		id = value.id;
		var idText = (value.id).replace(/[0-9]/g, '');
		var replaceById = idText + idIndex;
		$('#' + id).attr('id', replaceById);
		inx++;
	});
	
	var table = document.getElementById('grnItemInfoTable');
	var rowCount = table.rows.length;
	$("#RowCount").val(rowCount);
	$("#totaltblsize").val(rowCount);
}

function getGoodReceiptNoteItemBatchDetails(index, itemMasterId) {
	$("#issueQuantityGRN").val("");
	var pendingQuantity = $("#pendinQtyId" + index).val();
	var requestedQuantity = $("#itemQuantityId" + index).val();
	$("#pendingQuantityGRN").val(pendingQuantity);
	$("#requestedQuantityGRN").val(requestedQuantity);
	var inputs = [];
	inputs.push('itemMasterId=' + itemMasterId);
	var str = inputs.join('&');
	jQuery.ajax({
		async: true,
		type: 'POST',
		data: str + "&reqType=AJAX",
		url: 'ehat/invGoodReceiptNote/getGoodReceiptNoteItemBatchDetails',
		timeout: 1000 * 60 * 5,
		catche: false,
		success: function (r) {
			if(r.lstBatchStockDto.length == 0){
				$('#batchWiseGoodReceiptNoteModal').modal('hide');
				alert("No Stock And Batch Available For This Item..!!!");
				return false;
			}else{
				for (var i = 1; i <= r.lstBatchStockDto.length; i++) {
					if (i == 1) {
						$("#batchWiseGoodReceiptNoteTbody")
							.html(
								"<tr class='newAdded'><td>" +
								"<input type='radio' class='rohit' name='rowBatch' id='rowId" +
								i +
								"' value=" +
								i +
								"  autofocus='autofocus'></td>" +
	
	
								"<td style='display:none'><input type='text'" +
								"class='form-control input-SmallText'  value='" + index + "' readonly='true' id='indexId'" + "tabindex='-1' /></td>" +
	
	
								"<td><input type='text'" +
								"class='form-control input-SmallText' readonly='true' id='itemNameBatchId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td style='display:none'><input type='text'" +
								"class='form-control input-SmallText' readonly='true'  id='batchItemMasterId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td style='display:none'><input type='text'" +
								"class='form-control input-SmallText' readonly='true'  id='batchMasterKey" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td><input type='text'" +
								"class='form-control input-SmallText' readonly='true' id='itemBatchCodeGoodReceiptNoteId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td><input type='text'" +
								"class='form-control input-SmallText' readonly='true' id='itemExpDateGoodReceiptNoteId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td><input type='text'" +
								"class='form-control input-SmallText' readonly='true' id='mainInvStockGoodReceiptNoteId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"</tr>");
					} else {
						$("#batchWiseGoodReceiptNoteTbody")
							.append(
								"<tr class='newAdded'><td>" +
								"<input type='radio' class='rohit' name='rowBatch' id='rowId" +
								i +
								"' value=" +
								i +
								"  autofocus='autofocus'></td>" +
	
								"<td style='display:none'><input type='text'" +
								"class='form-control input-SmallText'  value='" + index + "' readonly='true' id='indexId'" + "tabindex='-1' /></td>" +
	
	
								"<td><input type='text'" +
								"class='form-control input-SmallText' readonly='true' id='itemNameBatchId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td style='display:none'><input type='text'" +
								"class='form-control input-SmallText' readonly='true'  id='batchItemMasterId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td style='display:none'><input type='text'" +
								"class='form-control input-SmallText' readonly='true'  id='batchMasterKey" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td><input type='text'" +
								"class='form-control input-SmallText' readonly='true' id='itemBatchCodeGoodReceiptNoteId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td><input type='text'" +
								"class='form-control input-SmallText' readonly='true' id='itemExpDateGoodReceiptNoteId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"<td><input type='text'" +
								"class='form-control input-SmallText' readonly='true' id='mainInvStockGoodReceiptNoteId" +
								i +
								"'" +
								"tabindex='-1' /></td>" +
								"</tr>");
	
					}
					$("#batchItemMasterId" + i).val(r.lstBatchStockDto[i - 1].itemMasterId);
					$("#batchMasterKey" + i).val(r.lstBatchStockDto[i - 1].id);
					$("#itemNameBatchId" + i).val(r.lstBatchStockDto[i - 1].itemName);
					$("#itemBatchCodeGoodReceiptNoteId" + i).val(r.lstBatchStockDto[i - 1].itemBatchCode);
					var expDateGoodsIssue = getDate(r.lstBatchStockDto[i - 1].itemBatchExpDate);
					if (expDateGoodsIssue == null || expDateGoodsIssue == '' || expDateGoodsIssue == "1970-01-01") {
						expDateGoodsIssue = "NA";
					}
					$("#itemExpDateGoodReceiptNoteId" + i).val(expDateGoodsIssue);
					$("#mainInvStockGoodReceiptNoteId" + i).val(r.lstBatchStockDto[i - 1].itemQuantity);
	
				}
			}
		}

	});
}
function closeGoodReceiptNoteBatchModal() {
	$("#batchWiseGoodReceiptNoteModal").modal("hide");
}

function setBatchInfoModalInfoToTableOnGoodReceiptNote() {
	var indexId = document.getElementById("indexId").value;
	var radioButtonIndex = $('input[name=rowBatch]:checked').val();
	if ($("#rowId"+radioButtonIndex).is(":checked")) {
		$("#addNewRowWithSameItem" + indexId).attr('disabled', false);
		var table = document.getElementById("grnItemInfoTable");
		var itemSlaveRowCount = table.rows.length-1;
		
		var table = document.getElementById("grnItemInfoTable");
		var itemSlaveRowCount = table.rows.length;
		var newItemSlaveRowCount = itemSlaveRowCount - 1;
		var totalRow = 0;
		$('#batchWiseGoodReceiptNoteTbody input[type=radio]').each(function () {
			totalRow++;
		});
		var totalCheckboxes = $('input[name=rowBatch]:checked').val();
		setBatchDataValuesToGoodReceiptNote(totalCheckboxes, totalRow,
			indexId, newItemSlaveRowCount);
		}
	else{
		alert("Select Radio Button As well..!!!");
	}

}

function setBatchDataValuesToGoodReceiptNote(totalCheckboxes, totalRow,
	indexId, itemSlaveRowCount) {
	var totalPendingQty = 0;
	var finalTotalPendingQtyIdIssueGrn = $("#finalTotalPendingQtyIdIssueGrn").val();
	var issueQuantity = $("#issueQuantityGRN").val();
	var pendingQuantity = $("#pendingQuantityGRN").val();
	var requestedQuantity = $("#requestedQuantityGRN").val();
	
	var totalGRNPendingQty = $("#totalPendingQty").val();
	if(parseInt(totalGRNPendingQty) > 0){
		$("#totalPendingQty").val((parseInt(totalGRNPendingQty) - parseInt(issueQuantity) ));
	}
	
	var itemBatchCodeArray = [];
	var i = "";
	if (issueQuantity == "" || issueQuantity == 'undefined') {
		alert("Enter Issue Quantity");
		return false;
	}
	if (parseInt(issueQuantity) > parseInt(pendingQuantity)) {
		alert("Issue Quantity Should Always Be Lesser Than Or Equal Than Pending Quantity!!!");
		return false;
	} else {
		var updatedIssueQuantity = parseInt(pendingQuantity) - parseInt(issueQuantity);
		$("#getBatchDetailsId" + indexId).attr('disabled', true);
		var rowsGenerateGRNItemSlave = $('#grnItemInfoTable tbody tr.newAdded').length;
		var modal = $('#batchWiseGoodReceiptNoteTableId tbody tr.newAdded').length;
		//remove equal to
		for (var i = 1; i <= rowsGenerateGRNItemSlave; i++) {
			for (var j = 1; j <= modal; j++) {
				if(rowsGenerateGRNItemSlave == 1){
					
				}else{
					var itemMasterIdUpdated = $('#itemId' + i).val();
					var itemId = $('#batchItemMasterId' + j).val();
					if(itemMasterIdUpdated == itemId){
						//if(indexId == i){
							$("#pendinQtyId" + i).val(updatedIssueQuantity);
							//$("#addNewRowWithSameItem" + i).attr('disabled', true);
						//}
					}
				}
			}
		}
		
	}
	if (totalRow > 0 && indexId == 1) {
		totalPendingQty = parseInt(totalPendingQty) + parseInt(issueQuantity);
		$("#pendinQtyId" + indexId).val(updatedIssueQuantity);
		$("#itemReceivedQtyId" + indexId).val(issueQuantity);
		$("#totalReceivedQtyId" + indexId).val(issueQuantity);
		$('#itemQuantityId' + indexId).val(issueQuantity); 
		$('#lblPurchaseQuotationDocQuantity' + indexId).val(issueQuantity);
		$('#lblPurchaseQuotationDocQuantity' + indexId).text(issueQuantity); 
		$('#txtPurchaseQuotationChangingItemQty' + indexId).val(issueQuantity);
		$('#currentInvStock' + indexId).val($('#mainInvStockGoodReceiptNoteId' + totalCheckboxes).val());
		$('#batchId' + indexId).val($('#itemBatchCodeGoodReceiptNoteId' + totalCheckboxes).val());
		$('#batchKeyId' + indexId).val($('#batchMasterKey' + totalCheckboxes).val());
		$('#itemId' + indexId).val($('#batchItemMasterId' + totalCheckboxes).val());
		
		$('#itemExpireDateId' + indexId).val($('#itemExpDateGoodReceiptNoteId' + totalCheckboxes).val());
		$("#totalPendingQtyIdIssueGrn").val(totalPendingQty);
		var finalPending = finalTotalPendingQtyIdIssueGrn - totalPendingQty;
		$("#finalTotalPendingQtyIdIssueGrn").val(finalPending);
		$('#batchWiseGoodReceiptNoteModal').modal('hide');
	} else {
		for (i = 1; i <= itemSlaveRowCount; i++) {
			var itemBatchCode = document.getElementById("batchId" + i).value;
			var itemBatchExp = document.getElementById("itemExpireDateId" + i).value;
			var batchAndExp = itemBatchCode.concat(itemBatchExp);
			var itemMasterId1 = document.getElementById("itemId" + i).value;
			var batchAndExpAndItemId = batchAndExp.concat(itemMasterId1);
			itemBatchCodeArray.push(batchAndExpAndItemId);
		}
		var batchCodePopUp = $('#itemBatchCodeGoodReceiptNoteId' + totalCheckboxes).val();
		var batchExpPopUp = $('#itemExpDateGoodReceiptNoteId' + totalCheckboxes).val();
		var itemMasterId = $('#batchItemMasterId' + i).val();
		var finalValue = batchCodePopUp.concat(batchExpPopUp);
		var finalValue1 = finalValue.concat(itemMasterId);
		var check = itemBatchCodeArray.includes(finalValue1);
		if (check == true) {
			//alert("This Batch Code Is Already Present..!!! Select Another Batch..");
			//return false;
		}
		//totalPendingQty += issueQuantity;
		totalPendingQty = parseInt(totalPendingQty) + parseInt(issueQuantity);
		$("#pendinQtyId" + indexId).val(updatedIssueQuantity);
		$("#itemReceivedQtyId" + indexId).val(issueQuantity);
		$("#totalReceivedQtyId" + indexId).val(issueQuantity);
		$('#itemQuantityId' + indexId).val(issueQuantity); 
		$('#currentInvStock' + indexId).val($('#mainInvStockGoodReceiptNoteId' + totalCheckboxes).val());
		$('#batchId' + indexId).val($('#itemBatchCodeGoodReceiptNoteId' + totalCheckboxes).val());
		$('#batchKeyId' + indexId).val($('#batchMasterKey' + totalCheckboxes).val());
		$('#itemExpireDateId' + indexId).val($('#itemExpDateGoodReceiptNoteId' + totalCheckboxes).val());
		$('#itemId' + indexId).val($('#batchItemMasterId' + totalCheckboxes).val());
		
		$('#lblPurchaseQuotationDocQuantity' + indexId).val(issueQuantity);
		$('#lblPurchaseQuotationDocQuantity' + indexId).text(issueQuantity); 
		$('#txtPurchaseQuotationChangingItemQty' + indexId).val(issueQuantity);
		$("#totalPendingQtyIdIssueGrn").val(totalPendingQty);
		var finalPending = finalTotalPendingQtyIdIssueGrn - totalPendingQty;
		$("#finalTotalPendingQtyIdIssueGrn").val(finalPending);
		$('#batchWiseGoodReceiptNoteModal').modal('hide');
		$("#issueQuantityGRN").val("");
		

	}
}

/*******************************************************************************
 * @since 13112019
 * @author Rohit Sandbhor
 * @comment created this js function to fetch item master details
 * @param inputID
 * @returns {Boolean}
 ******************************************************************************/
function fetchItemMasterGRNDetails(inputID,index,callFrom) {
	
	$("#grnItemCurrentRowIndexId").val(parseInt(index));
	var categoryName = $("#" + inputID).attr('data-name');
	var searchAssetOrServiceItem ="";
	if (categoryName == "goodReceiptNote") {
		var grnSupplierName = document.getElementById("grnSupplierName").value;
		var grnSupplierState = document.getElementById("grnSupplierState").value;

		if (grnSupplierName == "" || grnSupplierState == 0) {
			alert("Please Select Supplier Name & State First..!!");
			return false;
		}

	}
	var resultData = [];
	var findingName = $("input#" + inputID).val();
	if (findingName == "" || findingName == null || findingName == "null"
			|| findingName == undefined) {
		alertify.error("Please enter search value");
		$("input#" + inputID).focus();
		return false;
	}
	
	if(callFrom == "GRN"){
		
		if ($("#assetItemGrnId").is(':checked') && $("#assetItemGrnId").val() == 'Asset') {
			searchAssetOrServiceItem = 	$("#assetItemGrnId").val();
        }else if($("#serviceItemGrnId").is(':checked') && $("#serviceItemGrnId").val() == 'Service'){
        	searchAssetOrServiceItem = 	$("#serviceItemGrnId").val();
        }else{
        	searchAssetOrServiceItem = "All";
        }
	}else{
		searchAssetOrServiceItem = "All";
	}
	
	var inputs = [];
	inputs.push('itemName=' + findingName);
	inputs.push('searchAssetOrServiceItem=' + searchAssetOrServiceItem);
	var availableTags = [];
	var str = inputs.join('&');
	var template = "";
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/inventoryItemMaster/autoFillSearchItemMaster",
				cache : false,
				success : function(r) {
					if (r.lstItemMaster.length == 0) {
						alertify.error("Data Not Found...!!!");
						return false;
					}
					if (categoryName == "itemMaster") {
						for ( var j = 0; j < r.lstItemMaster.length; j++) {

							var arrValue = r.lstItemMaster[j].id + "-"
									+ r.lstItemMaster[j].itemName;
							var id = r.lstItemMaster[j].id;
							var itemName = r.lstItemMaster[j].itemName;
							resultData.push({
								ID : id,
								Name : itemName,
							});
							template = template + '<li data-value="' + id
									+ '" class=""><a href="#">' + arrValue
									+ '</a></li>';
						}
					} else if (categoryName == "goodReceiptNote") {
						template = "";
						for ( var j = 0; j < r.lstItemMaster.length; j++) {
							availableTags.push(r.lstItemMaster[j].id + "-"
									+ r.lstItemMaster[j].itemName);
						//	for ( var j = 0; j < availableTags.length; j++) {
								//var arrValue = (availableTags[j]).split("-");
								var idValue = r.lstItemMaster[j].id;

								resultData.push({
									ID : idValue,
									Name : r.lstItemMaster[j].itemName
								});
								template = template
										+ '<li id="myNewLi" data-toggle="modal" data-target="#myModal" data-value= "'
										+ r.lstItemMaster[j].id
										+ '" class=""><a href="#">'
										+ r.lstItemMaster[j].itemName + '</a></li>';
							//}
						}
					}
					
					if (categoryName == "itemMaster") {
						setTimeout(

								function() {
									// alert("itemMaster");
									$("div#searchItemMasterDivId .typeahead")
											.html(template);
									$("div#searchItemMasterDivId .typeahead")
											.show();
									$("input#" + inputID)
											.typeahead(
													{
														source : resultData,
														displayField : 'Name',
														valueField : 'ID',
														onSelect : displayItemMasterGRNSearchResult,
														scrollBar : true
													});
									$("input#" + inputID).data('typeahead').source = resultData;
								}, 500);

					}else if (categoryName == "goodReceiptNote") {
						setTimeout(
								function() {
									$("#goodsReceiptNoteItemName .typeahead")
											.html(template);
									$("#goodsReceiptNoteItemName .typeahead")
											.show();
									$("input#" + inputID)
											.typeahead(
													{
														source : resultData,
														displayField : 'Name',
														valueField : 'ID',
														onSelect : displayItemMasterGRNSearchResult,
														scrollBar : true
													});
									$("input#" + inputID).data('typeahead').source = resultData;
								}, 500);
					} 
				}

			});
	// below function to set the search value to search text feild and calling
	// getPackingDetailsById function
	function displayItemMasterGRNSearchResult(item) {
		
		var res = item.text.split('-');
		var itemMasterId = res[0];
		var itemName = res[1];
		if(itemName =="undefined" || itemName == undefined){
			itemName = item.text;
		}
		var masterId = item.value;
		var i="";
		var itemIdArray = [];
		if (categoryName == 'itemMaster') {
			getItemMasterDetailsById(itemMasterId);
		}else if (categoryName == "goodReceiptNote") {
			$("#grnItemId").val(masterId);
			getItemMasterSlaveGRNDetails(masterId);
		} else {
			getItemMasterSlaveDetailsModal(masterId);
		}
		$("#" + inputID).val(itemName);
	}
}

function newPendingQtyCalculation(id){
	var indexId = id;
	$("#issueQuantityGRN").val("");
	$("#addNewRowWithSameItem" + indexId).attr('disabled', false);
	$("#pendingQuantityGRN").val($('#pendinQtyId' + id).val());
	
	var i = 1;
	$("#batchWiseGoodReceiptNoteTbody")
		.html(
			"<tr class='newAdded'><td>" +
			"<input type='radio' class='rohit' name='rowBatch' id='rowId" +
			i +
			"' value=" +
			i +
			"  autofocus='autofocus'></td>" +

			"<td style='display:none'><input type='text'" +
			"class='form-control input-SmallText'  value='" + id + "' readonly='true' id='indexId'" + "tabindex='-1' /></td>" +

			"<td><input type='text'" +
			"class='form-control input-SmallText' readonly='true' id='itemNameBatchId" +
			i +
			"'" +
			"tabindex='-1'/></td>" +
			"<td style='display:none'><input type='text'" +
			"class='form-control input-SmallText'  readonly='true'  id='batchItemMasterId" +
			i +
			"'" +
			"tabindex='-1' /></td>" +
			"<td style='display:none'><input type='text'" +
			"class='form-control input-SmallText' readonly='true'  id='batchMasterKey" +
			i +
			"'" +
			"tabindex='-1' /></td>" +
			"<td><input type='text'" +
			"class='form-control input-SmallText'  id='itemBatchCodeGoodReceiptNoteId" +
			i +
			"'" +
			"tabindex='-1' /></td>" +
			"<td><input type='text'" +
			"class='form-control input-SmallText' onclick='getMfgandexpyDate(this.id);' id='itemExpDateGoodReceiptNoteId" +
			i +
			"'" +
			"tabindex='-1' /></td>" +
			"<td><input type='text'" +
			"class='form-control input-SmallText' readonly='true' id='mainInvStockGoodReceiptNoteId" +
			i +
			"'" +
			"tabindex='-1' /></td>" +
			"</tr>");
	
			$("#batchItemMasterId" + i).val($('#itemId' + id).val());
			$("#batchMasterKey" +i).val(0);
			$("#itemNameBatchId"+i).val($('#itemNameId' + id).val());
			$("#itemBatchCodeGoodReceiptNoteId" +i).val($('#batchId' + id).val());
			var expDateGoodsIssue = '';
			if (expDateGoodsIssue == null || expDateGoodsIssue == '' || expDateGoodsIssue == "1970-01-01") {
				expDateGoodsIssue = "NA";
			}
			$("#itemExpDateGoodReceiptNoteId" + i).val(expDateGoodsIssue);
			$("#mainInvStockGoodReceiptNoteId" + i).val(0);
			$('#batchWiseGoodReceiptNoteModal').modal('show');

}
//added by dayanand for to check totalPending Qty at the time of GRN useing PO
function updatePendingQty(id) {
	var sum = 0;
	var totalQty;
	var RowCount = $("#RowCount").val();
    
	for (var i = 1; i <= RowCount; i++) {
		totalQty = $("#itemReceivedQtyId" + i).val();

		if (totalQty == null || totalQty == undefined || totalQty == '') {
			var flag = 1;
		} else {
				sum = parseInt(sum) + parseInt(totalQty);
			
		}

	}
	
	
	var pendingQty=0;
	var totalItemQty=$("#totalItemQty").val();
	var grnPurchaseOrder = $("#grnPurchaseOrder").val();
	if(grnPurchaseOrder > 0){
		pendingQty = parseInt(totalItemQty) - parseInt(sum);
		$("#totalPendingQty").val(pendingQty);
		}
	
	

}

function showSaveDraftButton(){
	$('#saveGrn').show();
	$('#draftGrn').show();
}