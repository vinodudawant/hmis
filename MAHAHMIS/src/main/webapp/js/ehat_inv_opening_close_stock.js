/**
 * 
 * @param inputID
 */
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
}

/**
 * @author : Rohit Sandbhor
 * @date : 27-12-2019
 * @comment	: This function is created for to save the opening stock module
 */
function saveOpeningStockModule() {
	var stockFrom = "OpeningStock";
	var stockSeries = $("#openingStockSeriesId").val();
	//var openingStockDate = $("#openingStockDateId").val();
	var stockNarration = $("#stockNarrationId").val();
	var totalItemQuantity = $("#totalItemQuantityId").val();
	var totalAmount = $("#totalAmountId").val();
	var id = $("#openingStockId").val();

	var userId = $('#userId').val();
	var unitId = $('#unitId').val();
	var userName = $("#userNameId").val();

	var openingStockItemSlaveDetails = {
		lstOpeningStockItemSlaveDto : []
	};

	var batchStockSlaveDetails = {
		lstBatchStockDto : []
	};
	
	//opening stock asset maintenance slave
	var itemAssetMaintenanceOpeningInfoDtoDetails = {
			lstItemAssetMaintenanceOpeningSlaveDto: []
	};
	
	//asset maintenance master dto
	var itemAssetMaintenanceInfoMasterDtoDetails = {
			lstItemAssetMaintenanceMasterDto: []
		};

	var rowsOpeningStockItemSlave = $('#ItemInfoTablePO tbody tr.newAdded').length;
	if (rowsOpeningStockItemSlave == "" || rowsOpeningStockItemSlave == null || rowsOpeningStockItemSlave == 0) {
		alert("Please Enter Atleast One Record Under Given Item Info Table..!!");
		return false;
	}
	//opening stock item slave details
	for ( var i = 1; i <= rowsOpeningStockItemSlave; i++) {
		var regEx = /^\d{4}-\d{2}-\d{2}$/;
		var itemMasterId = $("#itemMasterId" + i).val();
		var txtPurchaseQuotationItemName = $("#txtPurchaseQuotationItemName_" + i).val();
			if(itemMasterId=="" || itemMasterId==null || itemMasterId==0 ){
			alert("Please Enter Item Name In Row..."+i);
			return false;
		}
		var txtPurchaseQuotationDocQuantity = $("#txtPurchaseQuotationDocQuantity" + i).val();
		if(txtPurchaseQuotationDocQuantity == '' || txtPurchaseQuotationDocQuantity == null || txtPurchaseQuotationDocQuantity == undefined){
			alert("Please Enter Item Quantity..!!");
			return false;
		}
		var txtPurchaseQuotationUnitPrice = $("#txtPurchaseQuotationUnitPrice" + i).val();
		if(txtPurchaseQuotationUnitPrice == '' || txtPurchaseQuotationUnitPrice == null || txtPurchaseQuotationUnitPrice == undefined){
			alert("Please Select Item Details..!!");
			return false;
		}
		var txtPurchaseQuotationTrdeDiscountPercentage = $("#txtPurchaseQuotationTrdeDiscountPercentage" + i).val();
		if(txtPurchaseQuotationTrdeDiscountPercentage == '' || txtPurchaseQuotationTrdeDiscountPercentage == null || txtPurchaseQuotationTrdeDiscountPercentage == undefined){
			alert("Please Enter Discount In Percentage..!!");
			return false;
		}
		var txtPurchaseQuotationTrdeDiscountInRupess = $("#txtPurchaseQuotationTrdeDiscountInRupess" + i).val();
		if(txtPurchaseQuotationTrdeDiscountInRupess == '' || txtPurchaseQuotationTrdeDiscountInRupess == null || txtPurchaseQuotationTrdeDiscountInRupess == undefined){
			alert("Please Enter Discount In RS..!!");
			return false;
		}
		var txtPurchaseQuotationTrdeDiscountAmt = $("#txtPurchaseQuotationTrdeDiscountAmt" + i).val();
		var txtPurchaseQuotationBaseAmount = $("#txtPurchaseQuotationBaseAmount" + i).val();
		var txtPurchaseQuotationTaxCodePO = $("#txtPurchaseQuotationTaxCodePO_" + i).val();
		var txtPurchaseQuotationTaxAmount = $("#txtPurchaseQuotationTaxAmount_" + i).val();
		var txtPurchaseOrderTaxAmtinRs = $("#txtPurchaseOrderTaxAmtinRs" + i).val();
		var txtPurchaseQuotationFactorOne = $("#txtPurchaseQuotationFactorOne" + i).val();
		var txtPurchaseQuotationFactorTwo = $("#txtPurchaseQuotationFactorTwo" + i).val();
		var txtPurchaseQuotationFactorThree = $("#txtPurchaseQuotationFactorThree" + i).val();
		var txtPurchaseQuotationFactorFour = $("#txtPurchaseQuotationFactorFour" + i).val();
		var txtPurchaseQuotationActualQuantity = $("#txtPurchaseQuotationActualQuantity" + i).val();
		var txtPurchaseQuotationBatchNoPO = $("#txtPurchaseQuotationBatchNoPO" + i).val();
		var txtPurchaseQuotationBatchNoId = $("#batchKeyId" + i).val();
		var txtOpeningStockManufacDate = $("#txtOpeningStockManufacDate" + i).val();
		var txtOpeningStockExpiryDate = $("#txtOpeningStockExpiryDate" + i).val();
		var totalAmount = $("#txtPurchaseQuotationRowAmount" + i).val();
		// this is added by Vishnu for unit factor name 
		var uomUnitLatestFactorId = $("#uomUnitLatestFactorId" + i).text();
		var uomUnitFactorOneNameId = $("#uomUnitFactorOneNameId" + i).text();
		var uomUnitFactorTwoNameId = $("#uomUnitFactorTwoNameId" + i).text();
		var uomUnitFactorThreeNameId = $("#uomUnitFactorThreeNameId" + i).text();
		var uomUnitFactorFourNameId = $("#uomUnitFactorFourNameId" + i).text();
		var reagentItemStatus = $("#reagentItemStatusId" + i).val();
		
		if(txtOpeningStockExpiryDate == "NA"){
			txtOpeningStockExpiryDate = null;
		}
		
		if(txtOpeningStockManufacDate ==""){
			 
		 }
		 else if(!txtOpeningStockManufacDate.match(regEx) && txtOpeningStockManufacDate != "NA"){
			 alert("Please Enter Proper Manufacture Date Format..!!");
			 return false;
		 }
		
		setOpeningStockItemSlaveList(openingStockItemSlaveDetails,
				txtPurchaseQuotationItemName, txtPurchaseQuotationDocQuantity,
				txtPurchaseQuotationUnitPrice,
				txtPurchaseQuotationTrdeDiscountPercentage,
				txtPurchaseQuotationTrdeDiscountInRupess,
				txtPurchaseQuotationTrdeDiscountAmt,
				txtPurchaseQuotationBaseAmount, txtPurchaseQuotationTaxCodePO,
				txtPurchaseQuotationTaxAmount, txtPurchaseOrderTaxAmtinRs,
				txtPurchaseQuotationFactorOne, txtPurchaseQuotationFactorTwo,
				txtPurchaseQuotationFactorThree,
				txtPurchaseQuotationFactorFour,
				txtPurchaseQuotationActualQuantity,
				txtPurchaseQuotationBatchNoPO,txtPurchaseQuotationBatchNoId, txtOpeningStockManufacDate,
				txtOpeningStockExpiryDate,itemMasterId,totalAmount,unitId,userId,userName,uomUnitLatestFactorId,uomUnitFactorOneNameId,
				uomUnitFactorTwoNameId,uomUnitFactorThreeNameId,uomUnitFactorFourNameId,reagentItemStatus);
	}
	for ( var i = 1; i <= rowsOpeningStockItemSlave; i++) {

		var itemQuantity = $("#txtPurchaseQuotationDocQuantity" + i).val();
		var itemMasterId = $("#itemMasterId" + i).val();
		var itemName = $("#txtPurchaseQuotationItemName_" + i).val();
		var stockOutItemQuantity = 0;
		setBatchStockSlaveList(batchStockSlaveDetails,
				itemQuantity, stockFrom, itemName,
				itemMasterId,stockOutItemQuantity);
	}

	//opening stock asset maintenance slave details
	var rows = $('#maintenanceTableInfo tbody tr.newAdded').length;
	for (var i = 1; i <= rows; i++) {
		var userId = $("#userId").val();
		var unitId = $("#unitId").val();
		var mainItemId = $("#itemAssetId" + i).val();
		var itemName = $("#itemNameAssetId" + i).val();
		var serialNoAssetId = $("#serialNoAssetId" + i).val();
		
		if(serialNoAssetId == ""){
			alert("You Should Enter Serial Number For Respective Asset & Then Save It...");
			return false;
		}
		
		var assetManufactureNameId = $("#assetManufactureNameId" + i).val();
		var assetPartyNameId = $("#assetPartyNameId" + i).val(); 
		var assetPartyMasterIdId = $("#assetPartyMasterIdId" + i).val();
		
		var amcVal = $("#assetAmcValAssetId" + i).val();
		var pmVal = $("#assetPmValAssetId" + i).val();
		var amcYear = $("#assetAmcYearAssetId" + i).val();
		var pmYear = $("#assetPmYearAssetId" + i).val();
		var productWarranty = $("#assetProductWarrantyAssetId" + i).val();
		var productWarrantyDuration = $("#assetProductWarrantyDurationAssetId" + i).val();
		var assetUnitPrice = $("#assetUnitPriceAssetId" + i).val();
		var productCategory = $("#assetProductCategoryAssetId" + i).val();
		var labEquipmentStatus = $("#assetlabEquipmentStatusAssetId" + i).val();
		var recordType = 2;
		
		setItemAssetMaintenanceInfoList(itemAssetMaintenanceOpeningInfoDtoDetails, serialNoAssetId, mainItemId, 
				itemName, assetManufactureNameId, assetPartyNameId, assetPartyMasterIdId, userId, unitId, 
				amcVal, pmVal, amcYear, pmYear, productWarranty,productWarrantyDuration,assetUnitPrice,productCategory,labEquipmentStatus,recordType);
	}
	
	//added by rohit
	var rows = $('#maintenanceTableInfo tbody tr.newAdded').length;
	for (var i = 1; i <= rows; i++) {
		var userAssetMasterId = $("#userId").val();
		var unitAssetMasterId = $("#unitId").val();
		var mainItemAssetMasterId = $("#itemAssetId" + i).val();
		var itemNameAssetMasterId = $("#itemNameAssetId" + i).val();
		var serialNoAssetMasterId = $("#serialNoAssetId" + i).val();
		var assetManufactureNameAssetMasterId = $("#assetManufactureNameId" + i).val();
		var assetPartyNameAssetMasterId = $("#assetPartyNameId" + i).val(); 
		var assetPartyMasterIdAssetMasterId = $("#assetPartyMasterIdId" + i).val();
		var productWarranty = $("#assetProductWarrantyAssetId" + i).val();
		var productCategory = $("#assetProductCategoryAssetId" + i).val();
		var labEquipmentStatus = $("#assetlabEquipmentStatusAssetId" + i).val();
		var splitValue = productWarranty.split(" ");
		/*var productWarrantyDuration = splitValue[0];
		var productWarrantyTimePeriod = splitValue[1];*/
		
		var productWarrantyDuration = $("#assetProductWarrantyDurationAssetId" + i).val();
		var productWarrantyTimePeriod = $("#assetProductWarrantyAssetId" + i).val();
		var assetUnitPrice = $("#assetUnitPriceAssetId" + i).val();
		var recordType = 2;
		setItemAssetMaintenanceInfoMasterList(itemAssetMaintenanceInfoMasterDtoDetails, userAssetMasterId, unitAssetMasterId, 
				mainItemAssetMasterId, itemNameAssetMasterId, serialNoAssetMasterId, serialNoAssetMasterId, 
				assetManufactureNameAssetMasterId, assetPartyNameAssetMasterId, assetPartyMasterIdAssetMasterId,
				productWarranty,productWarrantyDuration,productWarrantyTimePeriod,assetUnitPrice,productCategory,labEquipmentStatus,recordType);
	}
	
	openingStockItemSlaveDetails = JSON.stringify(openingStockItemSlaveDetails);
	batchStockSlaveDetails = JSON.stringify(batchStockSlaveDetails);
	itemAssetMaintenanceOpeningInfoDtoDetails = JSON.stringify(itemAssetMaintenanceOpeningInfoDtoDetails);
	itemAssetMaintenanceInfoMasterDtoDetails = JSON.stringify(itemAssetMaintenanceInfoMasterDtoDetails);

	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('stockSeries=' + stockSeries);
	//inputs.push('openingStockDate=' + openingStockDate);
	inputs.push('stockNarration=' + stockNarration);
	inputs.push('totalItemQuantity=' + totalItemQuantity);
	inputs.push('totalAmount=' + totalAmount);
	inputs.push('userId=' + userId);
	inputs.push('userName=' + userName);
	inputs.push('unitId=' + unitId);
	inputs.push('createdBy=' + userId);
	// to save item slave details
	inputs.push('openingStockItemSlaveDetails=' + openingStockItemSlaveDetails);
	// to batch stock slave details
	inputs.push('batchStockSlaveDetails=' + batchStockSlaveDetails);
	//opening stock asset maintenance slave details
	inputs.push('itemAssetMaintenanceOpeningInfoDtoDetails=' + itemAssetMaintenanceOpeningInfoDtoDetails);
	//asset maintenance master details
	inputs.push('itemAssetMaintenanceInfoMasterDtoDetails=' + itemAssetMaintenanceInfoMasterDtoDetails);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryOpeningStock/saveOpeningStock",
		cache : false,
		success : function(r) {
			if (r == 1) {
				alertify.success("Records Saved Sucessfully");
				 setTimeout(function() {
			     refreshOpeningStockDetails();
				 window.location.reload();
				 }, 1000);

			} else if (r == 2) {
				alertify.success("Records Updated Sucessfully");
				 setTimeout(function() {
			     refreshOpeningStockDetails();
				 window.location.reload();
				 }, 1000);
			} else {
				alertify.error("Network Issue");
			}

		}
	});
}

/**
 * @author : Rohit Sandbhor
 * @date : 27-12-2019
 * @comment	: This function is created for to set opening stock item slave list to pojo
 * @param openingStockItemSlaveDetails
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
 * @param txtPurchaseQuotationBatchNoPO
 * @param txtOpeningStockManufacDate
 * @param txtOpeningStockExpiryDate
 */
function setOpeningStockItemSlaveList(openingStockItemSlaveDetails,
		txtPurchaseQuotationItemName, txtPurchaseQuotationDocQuantity,
		txtPurchaseQuotationUnitPrice,
		txtPurchaseQuotationTrdeDiscountPercentage,
		txtPurchaseQuotationTrdeDiscountInRupess,
		txtPurchaseQuotationTrdeDiscountAmt, txtPurchaseQuotationBaseAmount,
		txtPurchaseQuotationTaxCodePO, txtPurchaseQuotationTaxAmount,
		txtPurchaseOrderTaxAmtinRs, txtPurchaseQuotationFactorOne,
		txtPurchaseQuotationFactorTwo, txtPurchaseQuotationFactorThree,
		txtPurchaseQuotationFactorFour, txtPurchaseQuotationActualQuantity,
		txtPurchaseQuotationBatchNoPO,txtPurchaseQuotationBatchNoId, txtOpeningStockManufacDate,
		txtOpeningStockExpiryDate,itemMasterId,totalAmount,unitId,userId,userName,uomUnitLatestFactorId,uomUnitFactorOneNameId,
		uomUnitFactorTwoNameId,uomUnitFactorThreeNameId,uomUnitFactorFourNameId,reagentItemStatus) {
	
	openingStockItemSlaveDetails.lstOpeningStockItemSlaveDto.push({
		itemName : txtPurchaseQuotationItemName,
		itemQuantity : (txtPurchaseQuotationDocQuantity != 'undefined' && txtPurchaseQuotationDocQuantity != null && txtPurchaseQuotationDocQuantity !='') ? txtPurchaseQuotationDocQuantity : 0,
		itemUnitPrice : (txtPurchaseQuotationUnitPrice != 'undefined' && txtPurchaseQuotationUnitPrice != null && txtPurchaseQuotationUnitPrice !='') ? txtPurchaseQuotationUnitPrice : 0,
		itemTradeDiscount : (txtPurchaseQuotationTrdeDiscountPercentage != 'undefined' && txtPurchaseQuotationTrdeDiscountPercentage != null && txtPurchaseQuotationTrdeDiscountPercentage !='') ? txtPurchaseQuotationTrdeDiscountPercentage : 0,
		itemTradeDiscountRupees : (txtPurchaseQuotationTrdeDiscountInRupess != 'undefined' && txtPurchaseQuotationTrdeDiscountInRupess != null && txtPurchaseQuotationTrdeDiscountInRupess !='') ? txtPurchaseQuotationTrdeDiscountInRupess : 0,
		itemTradeDiscountAmount : (txtPurchaseQuotationTrdeDiscountAmt != 'undefined' && txtPurchaseQuotationTrdeDiscountAmt != null && txtPurchaseQuotationTrdeDiscountAmt !='') ? txtPurchaseQuotationTrdeDiscountAmt : 0,
		itemTradeBaseAmount : (txtPurchaseQuotationBaseAmount != 'undefined' && txtPurchaseQuotationBaseAmount != null && txtPurchaseQuotationBaseAmount !='') ? txtPurchaseQuotationBaseAmount : 0,
		gst : (txtPurchaseQuotationTaxCodePO != 'undefined' && txtPurchaseQuotationTaxCodePO != null && txtPurchaseQuotationTaxCodePO !='') ? txtPurchaseQuotationTaxCodePO : 0,
		igst : (txtPurchaseQuotationTaxAmount != 'undefined' && txtPurchaseQuotationTaxAmount != null && txtPurchaseQuotationTaxAmount !='') ? txtPurchaseQuotationTaxAmount : 0,
		totalTaxAmount : (txtPurchaseOrderTaxAmtinRs != 'undefined' && txtPurchaseOrderTaxAmtinRs != null && txtPurchaseOrderTaxAmtinRs !='') ? txtPurchaseOrderTaxAmtinRs : 0,
		itemPurchaseFactorUom1 : (txtPurchaseQuotationFactorOne != 'undefined' && txtPurchaseQuotationFactorOne != null && txtPurchaseQuotationFactorOne !='') ? txtPurchaseQuotationFactorOne : 0,
		itemPurchaseFactorUom2 : (txtPurchaseQuotationFactorTwo != 'undefined' && txtPurchaseQuotationFactorTwo != null && txtPurchaseQuotationFactorTwo !='') ? txtPurchaseQuotationFactorTwo : 0,
		itemPurchaseFactorUom3 : (txtPurchaseQuotationFactorThree != 'undefined' && txtPurchaseQuotationFactorThree != null && txtPurchaseQuotationFactorThree !='') ? txtPurchaseQuotationFactorThree : 0,
		itemPurchaseFactorUom4 : (txtPurchaseQuotationFactorFour != 'undefined' && txtPurchaseQuotationFactorFour != null && txtPurchaseQuotationFactorFour !='') ? txtPurchaseQuotationFactorFour : 0,
		itemActualQuantity : (txtPurchaseQuotationActualQuantity != 'undefined' && txtPurchaseQuotationActualQuantity != null && txtPurchaseQuotationActualQuantity !='') ? txtPurchaseQuotationActualQuantity : 0,
		uomUnitLatestFactorName : (uomUnitLatestFactorId != 'undefined' && uomUnitLatestFactorId != null && uomUnitLatestFactorId !='') ? uomUnitLatestFactorId : 0,
		uomUnitFactorOneName : (uomUnitFactorOneNameId != 'undefined' && uomUnitFactorOneNameId != null && uomUnitFactorOneNameId !='') ? uomUnitFactorOneNameId : 0,
		uomUnitFactorTwoName : (uomUnitFactorTwoNameId != 'undefined' && uomUnitFactorTwoNameId != null && uomUnitFactorTwoNameId !='') ? uomUnitFactorTwoNameId : 0,
		uomUnitFactorThreeName : (uomUnitFactorThreeNameId != 'undefined' && uomUnitFactorThreeNameId != null && uomUnitFactorThreeNameId !='') ? uomUnitFactorThreeNameId : 0,
		uomUnitFactorFourName : (uomUnitFactorFourNameId != 'undefined' && uomUnitFactorFourNameId != null && uomUnitFactorFourNameId !='') ? uomUnitFactorFourNameId : 0,
		batchNo : (txtPurchaseQuotationBatchNoPO != 'undefined' && txtPurchaseQuotationBatchNoPO != null && txtPurchaseQuotationBatchNoPO !='') ? txtPurchaseQuotationBatchNoPO : 0,
		batchId : (txtPurchaseQuotationBatchNoId != 'undefined' && txtPurchaseQuotationBatchNoId != null && txtPurchaseQuotationBatchNoId !='') ? txtPurchaseQuotationBatchNoId : 0,
		manufacDate : txtOpeningStockManufacDate,
		expiryDate : (txtOpeningStockExpiryDate != 'undefined' && txtOpeningStockExpiryDate != null) ? txtOpeningStockExpiryDate : 0,
		item_master_id : itemMasterId,
		totalAmount : totalAmount,
		unitId : unitId,
		userId : userId,
		createdBy : userId,
		userName : userName,
		itemReagentStatus : (reagentItemStatus != 'undefined' && reagentItemStatus != null && reagentItemStatus != '') ? reagentItemStatus : 0
	});
}

/**
 * @author : Rohit Sandbhor
 * @date : 27-12-2019
 * @comment	: This function is created for to set batch stock slave list to pojo
 * @param batchStockSlaveDetails
 * @param txtPurchaseQuotationDocQuantity
 * @param stockFrom
 * @param itemName
 */
function setBatchStockSlaveList(batchStockSlaveDetails,
		itemQuantity, stockFrom, itemName, itemMasterId,stockOutItemQuantity) {
	batchStockSlaveDetails.lstBatchStockDto.push({
		itemQuantity : itemQuantity,
		stockFrom : stockFrom,
		itemName : itemName,
		itemMasterId : itemMasterId,
		stockOutItemQuantity : stockOutItemQuantity
	});

}

/**
 * @author Rohit
 * @since 21-07-2020
 * @param itemAssetMaintenanceOpeningInfoDtoDetails
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
 */
function setItemAssetMaintenanceInfoList(itemAssetMaintenanceOpeningInfoDtoDetails, serialNoAssetId, mainItemId, 
		itemName, assetManufactureNameId, assetPartyNameId, assetPartyMasterIdId, userId, unitId, 
		amcVal, pmVal, amcYear, pmYear, productWarranty,productWarrantyDuration,assetUnitPrice,productCategory,labEquipmentStatus,recordType){
	itemAssetMaintenanceOpeningInfoDtoDetails.lstItemAssetMaintenanceOpeningSlaveDto.push({
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
		productWarrantyDuration: (productWarrantyDuration != 'undefined' && productWarrantyDuration != null) ? productWarrantyDuration : null,
		assetUnitPrice: (assetUnitPrice != 'undefined' && assetUnitPrice != null) ? assetUnitPrice : 0,
		productCategory: (productCategory != 'undefined' && productCategory != null) ? productCategory : null,
		assetType: (labEquipmentStatus != 'undefined' && labEquipmentStatus != null) ? labEquipmentStatus : null,
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
function setItemAssetMaintenanceInfoMasterList(itemAssetMaintenanceInfoMasterDtoDetails, userAssetMasterId, unitAssetMasterId, 
				mainItemAssetMasterId, itemNameAssetMasterId, serialNoAssetMasterId, serialNoAssetMasterId, 
				assetManufactureNameAssetMasterId, assetPartyNameAssetMasterId, assetPartyMasterIdAssetMasterId,
				productWarranty,productWarrantyDuration,productWarrantyTimePeriod,assetUnitPrice,productCategory,labEquipmentStatus,recordType){
	itemAssetMaintenanceInfoMasterDtoDetails.lstItemAssetMaintenanceMasterDto.push({
		serialNo: (serialNoAssetMasterId != 'undefined' && serialNoAssetMasterId != null) ? serialNoAssetMasterId : 0,
		assetItemId: (mainItemAssetMasterId != 'undefined' && mainItemAssetMasterId != null) ? mainItemAssetMasterId : 0,
		assetItemName: (itemNameAssetMasterId != 'undefined' && itemNameAssetMasterId != null) ? itemNameAssetMasterId : null,
		manufactureName: (assetManufactureNameAssetMasterId != 'undefined' && assetManufactureNameAssetMasterId != null) ? assetManufactureNameAssetMasterId : null,
		partyName: (assetPartyNameAssetMasterId != 'undefined' && assetPartyNameAssetMasterId != null) ? assetPartyNameAssetMasterId : null,
		partyMasterId: (assetPartyMasterIdAssetMasterId != 'undefined' && assetPartyMasterIdAssetMasterId != null) ? assetPartyMasterIdAssetMasterId : 0,
		productWarrantyDuration: (productWarrantyDuration != 'undefined' && productWarrantyDuration != null) ? productWarrantyDuration : 0,
		productWarrantyTimePeriod: (productWarrantyTimePeriod != 'undefined' && productWarrantyTimePeriod != null) ? productWarrantyTimePeriod : 0,
		assetUnitPrice: (assetUnitPrice != 'undefined' && assetUnitPrice != null) ? assetUnitPrice : 0,
		productCategory: (productCategory != 'undefined' && productCategory != null) ? productCategory : null,
		userId: (userAssetMasterId != 'undefined' && userAssetMasterId != null) ? userAssetMasterId : 0,
		unitId: (unitAssetMasterId != 'undefined' && unitAssetMasterId != null) ? unitAssetMasterId : 0,
		assetType: (labEquipmentStatus != 'undefined' && labEquipmentStatus != null) ? labEquipmentStatus : null,
		recordType: (recordType != 'undefined' && recordType != null) ? recordType : null
	});
}

/**
 * @author : Rohit Sandbhor
 * @date : 27-12-2019
 * @comment	: This function is created for to get all opening stock records details
 */
function getAllOpeningStockRecordsDetails() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryOpeningStock/getAllOpeningStockRecordsDetails",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			setOpeningStockDataToTable(r);

		}
	});
}

/*******************************************************************************
 * @since 08-11-2019
 * @comment added this js function to set the opening stock data to dynamic table
 * @author Rohit Sandbhor
 * @param r
 ******************************************************************************/
function setOpeningStockDataToTable(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.openingStockDtos.length; i++) {
		var datee = getDate(r.openingStockDtos[i].createdDateTime);
			var itemExpDate = getDateWithoutTime(r.openingStockDtos[i].batchExpDate);
			if(itemExpDate == "1970-01-01"){
				itemExpDate ="NA";	
			}
			htm = htm
					+ '<tr> '
					+ ' <td class="col-md-1 center">'
					+ index
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ datee
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.openingStockDtos[i].id
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.openingStockDtos[i].itemName
					+ '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.openingStockDtos[i].batchNumber
					+ '</td>' 
					+ ' <td class="col-md-1 center">'
					+ itemExpDate
					+ '</td>' 
					+' <td class="col-md-1 center">'
					+ r.openingStockDtos[i].itemQuantity + '</td>'
					+ ' <td class="col-md-1 center">'
					+ r.openingStockDtos[i].userName + '</td>' + '</tr>';
			index++;
			
			var numberOfRows="";
			var indexNew=1;
			var count=r.noOfPages;
			var numberOfPages=(count/10);
			var displayPagination=numberOfPages;	
			if(numberOfPages > 5){
				numberOfRows +="<li class='disabled previous'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
				displayPagination=5;
			}
			for(var j=0;j<displayPagination;j++){
				numberOfRows +="<li onclick='paginationOpeningStock("+indexNew+");'><a>"+indexNew+"</a></li>";
				indexNew=indexNew+1;
			}
			if(numberOfPages>6){
				numberOfRows +="<li class='next' onclick='nextPaginationOpeningStock("+indexNew+","+Math.round(numberOfPages)+");'><a class='page-link' href='#'>Next</a></li>";
			}
			$('#totalNumberOfPagesOpeningStock').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
			$('#openingStockRecordPagination').html(numberOfRows);
	}
	$("#openingStockTableBodyId").html(htm);
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
	datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2) + " "+ hours + ":" +('0' + minute).slice(-2)+ ":" +('0' + seconds).slice(-2);
	//datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2);
	console.log("Datee >> " + datee);
	return datee;
}

/**
 * @author : Rohit Sandbhor
 * @date : 27-12-2019
 * @comment	: This function is created for to get formated date on table
 * @param date
 * @returns
 */
function getDateWithoutTime(date) {
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


/************
 * @author : Rohit Sandbhor
 * @date : 26-12-2019
* @codeFor	: Add new row temp for Opening Stock
 ************/
function addNewRowInTableOpeningStock(tableId,callFrom){
	var tbody = "";
	var rows = $('#'+tableId+' tbody tr').length;
	if(callFrom == "openingstock"){
		tbody = getOpeningStockItemInfoBody(rows+1);
	}
	else if(callFrom == "openingstockOnPlus"){
		tbody = getOpeningStockItemInfoBodyOnPlusButton(rows+1);
	}
	$('#'+tableId).append(tbody);
}

/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 26-12-2019
 * @codeFor : to Set Row Template To Body Of Item Info Table
 ******************************************************************************/
function getOpeningStockItemInfoBody(id) {
	var tbody = "";
	var callFromOS = "OS";
	tbody = tbody
					+"<tr id='deleterow' class='newAdded' "
					+ id
					+ "'> <td> <input type='checkbox' class='chkMrnItem' name='checkbox"
					+ id
					+ "' id='checkbox"
					+ id
					+ "'/></td><td>"
					+ "  <input type='hidden' id='rowcountid"
					+ id
					+ "' value ='0'"
					+ "><span id='snum"+id+"'>"+id+"</span> </td>"
					+ " <td style='display:none'><div><input type='hidden' class='typeahead form-control input-SmallText' value='0' id='itemSlaveId"
					+ id
					+ "'</div></td> "
					+ " <td><div id ='divtxtOpeningStockItemName"+id+"'><input type='text' style='text-align:left;width:250px;' "
					+ "class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
					+ id
					+ "' onkeyup=fetchItemMasterOSDetails(this.id,"+id+",'"+callFromOS+"') data-name='openingStockModule' />"
					+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
					+ id
					+ "' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
					+ id
					+ "' value='0'/></div></td> "
					+ "<td><input type='number' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
					+ id
					+ "' onkeyup='setOrderedQuantity(this.id,"+ id + ");calculateTotalItemQty();' onkeypress='return validateNumbers(event);'  style='width:60px;' ><label id='txtPurchaseQuotationLastFactorUOM"
					+ id
					+ "' ></label></td> "
				
					+ "<td style='display:none;'><input type='hidden' class='form-control input-SmallText' id='itemMasterId"
					+ id
					+ "' onkeyup='totalAmount(this.id,"
					+ id
					+ ")' style='width:60px;' ></td> "
				
					+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
					+ id
					+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"+
					id +
					"'> </lable></td>"
					+ ""
					+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
					+ id
					+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
					+ id
					+ "'  onkeyup='chkTradAmtorPercentage(this.id,"
					+ id
					+ ")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"
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
					+ "<td><input type='text' class='typeahead form-control input-SmallText'  autocomplete='off'  id='txtPurchaseQuotationTaxCodePO_"
					+ id
					+ "' onkeypress='applyTaxforItemexpense(this.id);' onkeyup='rowAmtCalNEWForOSGST(this.id,"+id+"); calculateTotalAmount();'  style='width:80px;'></td>"
					+ " <td><input type='text' class='typeahead form-control input-SmallText' onkeyup='rowAmtCalNEWForOS(this.id,"
					+ id
					+ ");calculateTotalAmount();' onkeypress='autotaxCodeforItem(this.id,onchange)'  id='txtPurchaseQuotationTaxAmount_"
					+ id
					+ "'   style='width:80px;'  autocomplete='off' ></td> "
					+ "<td><input type='text' class='form-control input-SmallText'  style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
					+ id
					+ "'   ></td> "
					+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
					+ id
					+ "' onkeypress='return validateNumbers(event);'  style='width:100px;'></td>"
					+ "<td><input type='text' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactorOne"
					+ id
					+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'><label id='uomUnitFactorOneNameId"
					+ id
					+ "' ></label></td> "
					+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactorTwo"
					+ id
					+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0' ><label id='uomUnitFactorTwoNameId"
					+ id
					+ "' ></label></td> "
					+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactorThree"
					+ id
					+ "' onkeypress='return validateNumbers(event);'value='0'><label id='uomUnitFactorThreeNameId"
					+ id
					+ "' style='width:60px;' ></label></td> "
					+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'style='width:60px;' id='txtPurchaseQuotationFactorFour"
					+ id
					+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'><label id='uomUnitFactorFourNameId"
					+ id
					+ "' style='width:60px;'></label></td> "
					+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
					+ id
					+ "' onkeypress='return validateNumbers(event);' onkeyup='addRowAssetMaintenance("+id+");' style='width:60px;'></td> "
					
					
					+ "<td style='display:none'><input type='text' class='form-control input-SmallText' id='batchKeyId"
					+ id
					+ "' onkeypress='return validateNumbers(event);' style='width:60px;' value='0'></td> "
					
					+ "<td><input type='text' class='form-control input-SmallText' value='0' id='txtPurchaseQuotationBatchNoPO"
					+ id
					+ "' style='width:60px;'></td> "
					
					+ "<td><input type='input' class='form-control input-SmallText' onclick='getMfgandexpyDate(this.id)' id='txtOpeningStockManufacDate"
					+ id
					+ "' style='width:60px;' ></td>"
					+ "<td><input type='input' class='form-control input-SmallText' value='NA' onclick='getMfgandexpyDate(this.id)' id='txtOpeningStockExpiryDate"
					+ id + "' style='width:60px;' ></td>"+
					
					//added for item asset maintenance fields
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetItemStatusId" +
					id +
					"' class='form-control input-SmallText'> </td>"+
					
					//added for lab equipment status
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='labEquipmentItemStatusId" +
					id +
					"' class='form-control input-SmallText'> </td>"+
					
					// added by rohit reagent item type
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='reagentItemStatusId"
					+ id + "' class='form-control input-SmallText'> </td>" +
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetItemManufactureId" +
					id +
					"' class='form-control input-SmallText'> </td>"+
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetAmcValId" +
					id +
					"' class='form-control input-SmallText'> </td>"+
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetPmValId" +
					id +
					"' class='form-control input-SmallText'> </td>"+
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetAmcYearId" +
					id +
					"' class='form-control input-SmallText'> </td>"+
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetPmYearId" +
					id +
					"' class='form-control input-SmallText'> </td>"+
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetProductWarrantyId" +
					id +
					"' class='form-control input-SmallText'> </td>"+
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetProductWarrantyDurationId" +
					id +
					"' class='form-control input-SmallText'> </td>"+
					
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetUnitPriceId" +
					id +
					"' class='form-control input-SmallText'> </td>"+
					
					
					//added by Rohit to store product category type
					"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetProductCategory" +
					id +
					"' class='form-control input-SmallText'> </td>"+
					
					+ " </tr>";
					$("#RowCount").val(id);
					var totaltblsize = $("#RowCount").val();
					$("#totaltblsize").val(totaltblsize);
					$("#itemInfoDetails").append(tbody);
					$("#maintenanceTableInfoList").val("");
}

/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 16-03-2019
 * @codeFor : to Set Row Template To Body Of Item Info Table on plus button click
 ******************************************************************************/
function getOpeningStockItemInfoBodyOnPlusButton(id) {
	var mainTable = document.getElementById("ItemInfoTablePO");
	var mainTableLength =  mainTable.rows.length;
	var callFromOS = "OS";
	if(mainTableLength == 1){
		var tbody = "";
		tbody = tbody
						+"<tr id='deleterow' class='newAdded' "
						+ id
						+ "'> <td> <input type='checkbox' class='chkMrnItem' name='checkbox"
						+ id
						+ "' id='checkbox"
						+ id
						+ "'/></td><td>"
						+ "  <input type='hidden' id='rowcountid"
						+ id
						+ "' value ='0'"
						+ "><span id='snum"+id+"'>"+id+"</span> </td>"
						+ " <td style='display:none'><div><input type='hidden' class='typeahead form-control input-SmallText' value='0' id='itemSlaveId"
						+ id
						+ "'</div></td> "
						+ " <td><div id ='divtxtOpeningStockItemName"+id+"'><input type='text' style='text-align:left;width:250px;' "
						+ "class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
						+ id
						+ "' onkeyup=fetchItemMasterOSDetails(this.id,"+id+",'"+callFromOS+"') data-name='openingStockModule' />"
						+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
						+ id
						+ "' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
						+ id
						+ "' value='0'/></div></td> "
						+ "<td><input type='number' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
						+ id
						+ "' onkeyup='setOrderedQuantity(this.id,"+ id + ");calculateTotalItemQty();' onkeypress='return validateNumbers(event);'  style='width:60px;' ><label id='txtPurchaseQuotationLastFactorUOM"
						+ id
						+ "' ></label></td> "
					
						+ "<td style='display:none;'><input type='hidden' class='form-control input-SmallText' id='itemMasterId"
						+ id
						+ "' onkeyup='totalAmount(this.id,"
						+ id
						+ ")' style='width:60px;' ></td> "
					
						+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
						+ id
						+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"+
						id +
						"'> </lable></td>"
						+ ""
						+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
						+ id
						+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
						+ id
						+ "'  onkeyup='chkTradAmtorPercentage(this.id,"
						+ id
						+ ")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"
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
						+ "<td><input type='text' class='typeahead form-control input-SmallText'  autocomplete='off'  id='txtPurchaseQuotationTaxCodePO_"
						+ id
						+ "' onkeypress='applyTaxforItemexpense(this.id);' onkeyup='rowAmtCalNEWForOSGST(this.id,"+id+"); calculateTotalAmount();'  style='width:80px;'></td>"
						+ " <td><input type='text' class='typeahead form-control input-SmallText' onkeyup='rowAmtCalNEWForOS(this.id,"
						+ id
						+ ");calculateTotalAmount();' onkeypress='autotaxCodeforItem(this.id,onchange)'  id='txtPurchaseQuotationTaxAmount_"
						+ id
						+ "'   style='width:80px;'  autocomplete='off' ></td> "
						+ "<td><input type='text' class='form-control input-SmallText'  style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
						+ id
						+ "'   ></td> "
						+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
						+ id
						+ "' onkeypress='return validateNumbers(event);'  style='width:100px;'></td>"
						+ "<td><input type='text' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactorOne"
						+ id
						+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'><label id='uomUnitFactorOneNameId"
						+ id
						+ "' ></label></td> "
						+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactorTwo"
						+ id
						+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0' ><label id='uomUnitFactorTwoNameId"
						+ id
						+ "' ></label></td> "
						+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactorThree"
						+ id
						+ "' onkeypress='return validateNumbers(event);'value='0'><label id='uomUnitFactorThreeNameId"
						+ id
						+ "' style='width:60px;' ></label></td> "
						+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'style='width:60px;' id='txtPurchaseQuotationFactorFour"
						+ id
						+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'><label id='uomUnitFactorFourNameId"
						+ id
						+ "' style='width:60px;'></label></td> "
						+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
						+ id
						+ "' onkeypress='return validateNumbers(event);'  onkeyup='addRowAssetMaintenance("+id+");' style='width:60px;'></td> "
						
						
						+ "<td style='display:none'><input type='text' class='form-control input-SmallText' id='batchKeyId"
						+ id
						+ "' onkeypress='return validateNumbers(event);' style='width:60px;' value='0'></td> "
						
						+ "<td><input type='text' class='form-control input-SmallText' value='0' id='txtPurchaseQuotationBatchNoPO"
						+ id
						+ "' style='width:60px;'></td> "
						
						+ "<td><input type='input' class='form-control input-SmallText' onclick='getMfgandexpyDate(this.id)' id='txtOpeningStockManufacDate"
						+ id
						+ "' style='width:60px;' ></td>"
						+ "<td><input type='input' class='form-control input-SmallText' value='NA' onclick='getMfgandexpyDate(this.id)' id='txtOpeningStockExpiryDate"
						+ id + "' style='width:60px;' ></td>"+
						
						//added for item asset maintenance details fileds
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetItemStatusId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						//added for lab equipment status
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='labEquipmentItemStatusId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						// added by rohit reagent item type
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='reagentItemStatusId"
						+ id + "' class='form-control input-SmallText'> </td>" +
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetItemManufactureId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetAmcValId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetPmValId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetAmcYearId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetPmYearId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetProductWarrantyId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetProductWarrantyDurationId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetUnitPriceId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						//added by Rohit to store product category type
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetProductCategory" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						
						+ " </tr>";
						$("#RowCount").val(id);
						var totaltblsize = $("#RowCount").val();
						$("#totaltblsize").val(totaltblsize);
						$("#itemInfoDetails").append(tbody);
		
	}
	else{
		var newid = id - 1;
		var unitPrice = $("#txtPurchaseQuotationUnitPrice"+newid).val();
		if(unitPrice == null || unitPrice == ""){
			alert("You Cannot Add Row Without Filling Previous Row Values...!!!");
			return false;
		}
		var tbody = "";
		tbody = tbody
						+"<tr id='deleterow' class='newAdded' "
						+ id
						+ "'> <td> <input type='checkbox' class='chkMrnItem' name='checkbox"
						+ id
						+ "' id='checkbox"
						+ id
						+ "'/></td><td>"
						+ "  <input type='hidden' id='rowcountid"
						+ id
						+ "' value ='0'"
						+ "><span id='snum"+id+"'>"+id+"</span> </td>"
						+ " <td style='display:none'><div><input type='hidden' class='typeahead form-control input-SmallText' value='0' id='itemSlaveId"
						+ id
						+ "'</div></td> "
						+ " <td><div id ='divtxtOpeningStockItemName"+id+"'><input type='text' style='text-align:left;width:250px;' "
						+ "class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
						+ id
						+ "' onkeyup=fetchItemMasterOSDetails(this.id,"+id+",'"+callFromOS+"') data-name='openingStockModule' />"
						+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
						+ id
						+ "' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
						+ id
						+ "' value='0'/></div></td> "
						+ "<td><input type='number' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
						+ id
						+ "' onkeyup='setOrderedQuantity(this.id,"+ id + ");calculateTotalItemQty();' onkeypress='return validateNumbers(event);'  style='width:60px;' ><label id='txtPurchaseQuotationLastFactorUOM"
						+ id
						+ "' ></label></td> "
					
						+ "<td style='display:none;'><input type='hidden' class='form-control input-SmallText' id='itemMasterId"
						+ id
						+ "' onkeyup='totalAmount(this.id,"
						+ id
						+ ")' style='width:60px;' ></td> "
					
						+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
						+ id
						+ "' onkeypress='return validateNumbers(event);' style='width:60px;'><lable id='uomUnitLatestFactorId"+
						id +
						"'> </lable></td>"
						+ ""
						+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
						+ id
						+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
						+ id
						+ "'  onkeyup='chkTradAmtorPercentage(this.id,"
						+ id
						+ ")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"
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
						+ "<td><input type='text' class='typeahead form-control input-SmallText'  autocomplete='off'  id='txtPurchaseQuotationTaxCodePO_"
						+ id
						+ "' onkeypress='applyTaxforItemexpense(this.id);' onkeyup='rowAmtCalNEWForOSGST(this.id,"+id+"); calculateTotalAmount();'  style='width:80px;'></td>"
						+ " <td><input type='text' class='typeahead form-control input-SmallText' onkeyup='rowAmtCalNEWForOS(this.id,"
						+ id
						+ ");calculateTotalAmount();' onkeypress='autotaxCodeforItem(this.id,onchange)'  id='txtPurchaseQuotationTaxAmount_"
						+ id
						+ "'   style='width:80px;'  autocomplete='off' ></td> "
						+ "<td><input type='text' class='form-control input-SmallText'  style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
						+ id
						+ "'   ></td> "
						+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
						+ id
						+ "' onkeypress='return validateNumbers(event);'  style='width:100px;'></td>"
						+ "<td><input type='text' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactorOne"
						+ id
						+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'><label id='uomUnitFactorOneNameId"
						+ id
						+ "' ></label></td> "
						+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactorTwo"
						+ id
						+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0' ><label id='uomUnitFactorTwoNameId"
						+ id
						+ "' ></label></td> "
						+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactorThree"
						+ id
						+ "' onkeypress='return validateNumbers(event);'value='0'><label id='uomUnitFactorThreeNameId"
						+ id
						+ "' style='width:60px;' ></label></td> "
						+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'style='width:60px;' id='txtPurchaseQuotationFactorFour"
						+ id
						+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'><label id='uomUnitFactorFourNameId"
						+ id
						+ "' style='width:60px;'></label></td> "
						+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
						+ id
						+ "' onkeypress='return validateNumbers(event);' onkeyup='addRowAssetMaintenance("+id+");'  style='width:60px;'></td> "
						
						
						+ "<td style='display:none'><input type='text' class='form-control input-SmallText' id='batchKeyId"
						+ id
						+ "' onkeypress='return validateNumbers(event);' style='width:60px;' value='0'></td> "
						
						+ "<td><input type='text' class='form-control input-SmallText' value='0' id='txtPurchaseQuotationBatchNoPO"
						+ id
						+ "' style='width:60px;'></td> "
						
						+ "<td><input type='input' class='form-control input-SmallText' onclick='getMfgandexpyDate(this.id)' id='txtOpeningStockManufacDate"
						+ id
						+ "' style='width:60px;' ></td>"
						+ "<td><input type='input' class='form-control input-SmallText' value='NA' onclick='getMfgandexpyDate(this.id)' id='txtOpeningStockExpiryDate"
						+ id + "' style='width:60px;' ></td>"+
						
						//added for item asset maintenance details fileds
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetItemStatusId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						//added for lab equipment status
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='labEquipmentItemStatusId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetItemManufactureId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetAmcValId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetPmValId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetAmcYearId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetPmYearId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetProductWarrantyId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetProductWarrantyDurationId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text' id='assetUnitPriceId" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						//added by Rohit to store product category type
						"<td class='col-md-6 col-xs-12 col-sm-6 center' style='display:none;'><input type='text'  id='assetProductCategory" +
						id +
						"' class='form-control input-SmallText'> </td>"+
						
						+ " </tr>";
						$("#RowCount").val(id);
						var totaltblsize = $("#RowCount").val();
						$("#totaltblsize").val(totaltblsize);
						$("#itemInfoDetails").append(tbody);
	}
}

/************
 * @author : Rohit Sandbhor
 * @date : 20-12-2019
 * @codeFor	: Remove row temp for MRN
 ************/
function removeRowFromTableOpeningStock(tableId,checkboxClass){	
	var rowCount=$("#RowCount").val();
	$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
	check(tableId);
	checkComp(tableId);
	calculateTotalItemQty();
	calculateTotalAmount();
}
/************
 * @author : Rohit Sandbhor
 * @date : 20-12-2019
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
 * @author : Rohit Sandbhor
 * @date : 20-12-2019
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






function getItemMasterSlaveDetailsForOpeningStockById(itemMasterId){
	getItemMasterSlaveDetailsForOpeningStockOnPopUp(itemMasterId);
	$("#purchaseOrderModalId").modal('show');
}

/**
 * @author Rohit Sandbhor
 * @since 27-12-2019
 * @comment created below function to get item master slave details by using item master id and rest form as well this function is dynamic
 * @param itemMasterId
 */
function getItemMasterSlaveDetailsForOpeningStockOnPopUp(itemMasterId){
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
		console.log(r);
		for ( var i = 0; i < r.itemPurchaseSlaveDto.length; i++) {
			if(i == 0){
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
								+ "class='form-control input-SmallText' readonly='true' value="+itemMasterId+"  id='purchaseOSItemId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								+ "<td style='display:none'><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='itemQuantityId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"

								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseUnitPriceOneId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								+ "<td style='display:none;' ><input type='text'"
								+ "class='form-control input-SmallText'  id='isItemBatchWise"
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
								+ "tabindex='-1' /></td>"+
								
								//added UOM names by rohit
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
								
								//added for item asset maintenance details
								
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='manufactureNameModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>" +
								
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='assetAmcValModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>" +
								
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='assetPmValModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>" +
								
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='assetAmcYearModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>" +
								
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='assetPmYearModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>" +
								
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='assetProductWarrantyModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>" +
								
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='assetProductWarrantyDurationModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>" +
								
								//added by rohit to hold asset product category
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='assetProductCategoryModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>" +
								
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='assetItemStatusModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>"+
								
								//added by rohit for lab equipment item status
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='labEquipmentItemStatusModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>"+
								
								//to check reagent item type
								"<td style='display:none;'><input type='hidden'"
								+ "class='form-control input-SmallText'  id='reagentItemStatusModalId"
								+ i
								+ "'"
								+ "tabindex='-1' value=''/></td>"

								
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
								+ " autofocus='autofocus'></td>"
								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='itemNameId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								+ "<td style='display:none'><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' value="+itemMasterId+"  id='purchaseOSItemId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								+ "<td style='display:none'><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='itemQuantityId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"

								+ "<td><input type='text'"
								+ "class='form-control input-SmallText' readonly='true' id='purchaseUnitPriceOneId"
								+ i
								+ "'"
								+ "tabindex='-1' /></td>"
								
								+ "<td style='display:none;' ><input type='text'"
								+ "class='form-control input-SmallText'  id='isItemBatchWise"
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
								+ "tabindex='-1' /></td>"+
								
								//added UOM names by rohit
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
								
								//added for item asset maintenance details
								
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='manufactureNameModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>" +
								
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='assetAmcValModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>" +
								
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='assetPmValModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>" +
								
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='assetAmcYearModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>" +
								
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='assetPmYearModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>" +
								
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='assetProductWarrantyModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>" +
								
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='assetProductWarrantyDurationModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>" +
								
								//added by rohit to hold asset product category
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='assetProductCategoryModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>" +
								
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='assetItemStatusModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>"+
								
								//added by rohit for lab equipment item status
								"<td style='display:none;'><input type='hidden'" +
								"class='form-control input-SmallText'  id='labEquipmentItemStatusModalId" +
								i +	"'" +"tabindex='-1' value=''/></td>"+
								
								//to check reagent item type
								"<td style='display:none;'><input type='hidden'"
								+ "class='form-control input-SmallText'  id='reagentItemStatusModalId"
								+ i
								+ "'"
								+ "tabindex='-1' value=''/></td>"
								
								+ "</tr>");
				
			}
			
			if(r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor2 == 0){
			//$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
			$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice1);
			$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
			$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
			$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
			$("#purchaseUomFactorFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
			$("#itemNameId" + i).val(r.itemName);
			$("#purchaseOSItemId" + i).val(r.id);
			$("#cgstRateId" + i).val(r.cgst);
			$("#sgstRateId" + i).val(r.sgst);
			$("#taxNameId" + i).val(r.taxName);
			$("#taxRateId" + i).val(r.taxRate);
			$("#isItemBatchWise" + i).val(r.batchWise);
			
			//added UOM names by rohit
			$("#uomUnitOneNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitOneName);
			$("#uomUnitTwoNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitTwoName);
			$("#uomUnitThreeNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitThreeName);
			$("#uomUnitFourNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitFourName);
			
			//added for item asset maintenance details
			$("#manufactureNameModalId" + i).val(r.companyName);
			$("#assetItemStatusModalId" + i).val(r.assetItemStatus);
			$("#labEquipmentItemStatusModalId" + i).val(r.labEquipmentStatus);
			$("#reagentItemStatusModalId" + i).val(r.reagentItemStatus);
			$("#assetAmcValModalId" + i).val(r.itemMaintenanceSlaveDto.amccmcFreeTextDuration);
			$("#assetPmValModalId" + i).val(r.itemMaintenanceSlaveDto.preventiveMaintenanceFreeTextDuration);
			$("#assetAmcYearModalId" + i).val(r.itemMaintenanceSlaveDto.amccmcDuration);
			$("#assetPmYearModalId" + i).val(r.itemMaintenanceSlaveDto.preventiveMaintenanceDuration);
			$("#assetProductWarrantyModalId" + i).val(r.itemMaintenanceSlaveDto.warrantyWithProduct);
			$("#assetProductWarrantyDurationModalId" + i).val(r.itemMaintenanceSlaveDto.warrantyWithProductDuration);
			$("#assetProductCategoryModalId" + i).val(r.categoryType);
			}
			else if(r.itemPurchaseSlaveDto[i].purchaseUomFactor2 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor3 == 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor4 == 0){
				//$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
				$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice2);
				$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
				$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
				$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
				$("#purchaseUomFactorFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
				$("#itemNameId" + i).val(r.itemName);
				$("#purchaseOSItemId" + i).val(r.id);
				$("#cgstRateId" + i).val(r.cgst);
				$("#sgstRateId" + i).val(r.sgst);
				$("#taxNameId" + i).val(r.taxName);
				$("#taxRateId" + i).val(r.taxRate);
				$("#isItemBatchWise" + i).val(r.batchWise);
				
				//added UOM names by rohit
				$("#uomUnitOneNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitOneName);
				$("#uomUnitTwoNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitTwoName);
				$("#uomUnitThreeNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitThreeName);
				$("#uomUnitFourNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitFourName);
				
				//added for item asset maintenance details
				$("#manufactureNameModalId" + i).val(r.companyName);
				$("#assetItemStatusModalId" + i).val(r.assetItemStatus);
				$("#labEquipmentItemStatusModalId" + i).val(r.labEquipmentStatus);
				$("#reagentItemStatusModalId" + i).val(r.reagentItemStatus);
				$("#assetAmcValModalId" + i).val(r.itemMaintenanceSlaveDto.amccmcFreeTextDuration);
				$("#assetPmValModalId" + i).val(r.itemMaintenanceSlaveDto.preventiveMaintenanceFreeTextDuration);
				$("#assetAmcYearModalId" + i).val(r.itemMaintenanceSlaveDto.amccmcDuration);
				$("#assetPmYearModalId" + i).val(r.itemMaintenanceSlaveDto.preventiveMaintenanceDuration);
				$("#assetProductWarrantyModalId" + i).val(r.itemMaintenanceSlaveDto.warrantyWithProduct);
				$("#assetProductWarrantyDurationModalId" + i).val(r.itemMaintenanceSlaveDto.warrantyWithProductDuration);
				$("#assetProductCategoryModalId" + i).val(r.categoryType);
			}
			else if(r.itemPurchaseSlaveDto[i].purchaseUomFactor3 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor2 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor4 == 0){
				
				//$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
				$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice3);
				$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
				$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
				$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
				$("#purchaseUomFactorFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
				$("#itemNameId" + i).val(r.itemName);
				$("#purchaseOSItemId" + i).val(r.id);
				$("#cgstRateId" + i).val(r.cgst);
				$("#sgstRateId" + i).val(r.sgst);
				$("#taxNameId" + i).val(r.taxName);
				$("#taxRateId" + i).val(r.taxRate);
				$("#isItemBatchWise" + i).val(r.batchWise);
				
				//added UOM names by rohit
				$("#uomUnitOneNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitOneName);
				$("#uomUnitTwoNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitTwoName);
				$("#uomUnitThreeNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitThreeName);
				$("#uomUnitFourNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitFourName);
				
				//added for item asset maintenance details
				$("#manufactureNameModalId" + i).val(r.companyName);
				$("#assetItemStatusModalId" + i).val(r.assetItemStatus);
				$("#labEquipmentItemStatusModalId" + i).val(r.labEquipmentStatus);
				$("#reagentItemStatusModalId" + i).val(r.reagentItemStatus);
				$("#assetAmcValModalId" + i).val(r.itemMaintenanceSlaveDto.amccmcFreeTextDuration);
				$("#assetPmValModalId" + i).val(r.itemMaintenanceSlaveDto.preventiveMaintenanceFreeTextDuration);
				$("#assetAmcYearModalId" + i).val(r.itemMaintenanceSlaveDto.amccmcDuration);
				$("#assetPmYearModalId" + i).val(r.itemMaintenanceSlaveDto.preventiveMaintenanceDuration);
				$("#assetProductWarrantyModalId" + i).val(r.itemMaintenanceSlaveDto.warrantyWithProduct);
				$("#assetProductWarrantyDurationModalId" + i).val(r.itemMaintenanceSlaveDto.warrantyWithProductDuration);
				$("#assetProductCategoryModalId" + i).val(r.categoryType);
			}
			else if(r.itemPurchaseSlaveDto[i].purchaseUomFactor4 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor3 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor2 != 0 && r.itemPurchaseSlaveDto[i].purchaseUomFactor1 != 0){
				//$("#itemQuantityId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
				$("#purchaseUnitPriceOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUnitPrice4);
				$("#purchaseUomFactorOneId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor1);
				$("#purchaseUomFactorTwoId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor2);
				$("#purchaseUomFactorThreeId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor3);
				$("#purchaseUomFactorFourId" + i).val(r.itemPurchaseSlaveDto[i].purchaseUomFactor4);
				$("#itemNameId" + i).val(r.itemName);
				$("#purchaseOSItemId" + i).val(r.id);
				$("#cgstRateId" + i).val(r.cgst);
				$("#sgstRateId" + i).val(r.sgst);
				$("#taxNameId" + i).val(r.taxName);
				$("#taxRateId" + i).val(r.taxRate);
				$("#isItemBatchWise" + i).val(r.batchWise);
				
				//added UOM names by rohit
				$("#uomUnitOneNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitOneName);
				$("#uomUnitTwoNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitTwoName);
				$("#uomUnitThreeNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitThreeName);
				$("#uomUnitFourNameId" + i).val(r.itemPurchaseSlaveDto[i].uomUnitFourName);
				
				//added for item asset maintenance details
				$("#manufactureNameModalId" + i).val(r.companyName);
				$("#assetItemStatusModalId" + i).val(r.assetItemStatus);
				$("#labEquipmentItemStatusModalId" + i).val(r.labEquipmentStatus);
				$("#reagentItemStatusModalId" + i).val(r.reagentItemStatus);
				$("#assetAmcValModalId" + i).val(r.itemMaintenanceSlaveDto.amccmcFreeTextDuration);
				$("#assetPmValModalId" + i).val(r.itemMaintenanceSlaveDto.preventiveMaintenanceFreeTextDuration);
				$("#assetAmcYearModalId" + i).val(r.itemMaintenanceSlaveDto.amccmcDuration);
				$("#assetPmYearModalId" + i).val(r.itemMaintenanceSlaveDto.preventiveMaintenanceDuration);
				$("#assetProductWarrantyModalId" + i).val(r.itemMaintenanceSlaveDto.warrantyWithProduct);
				$("#assetProductWarrantyDurationModalId" + i).val(r.itemMaintenanceSlaveDto.warrantyWithProductDuration);
				$("#assetProductCategoryModalId" + i).val(r.categoryType);
			}
			
		}
		
	}
});

}


/**
 * @author Dayanand Khandekar
 * @since 30-1-2020
 * @comment created below function to set modal info to table on opening stock and rest form as well this function is dynamic
 */
function setModalInfoToTableOnOpeningStock()
{
	var table = document.getElementById("ItemInfoTablePO");
	var itemSlaveRowCount = table.rows.length;
	//var newItemSlaveRowCount = itemSlaveRowCount - 1;
	var newItemSlaveRowCount = $("#openingStockItemCurrentRowIndexId").val();
	
	var totalRow=0;
	$('#itemMasterSlaveRecordList input[type=radio]').each(function()
	{
		totalRow++;
	});
	var totalCheckboxes = $('input[name=row]:checked').val();
	setTableValuesToOpeningStockItemInfo(totalCheckboxes,totalRow,newItemSlaveRowCount);
	
}
/**
 * @author Dayanand Khandekar
 * @since 30-1-2020
 * @comment created below function to set modal info to table on opening stock and rest form as well this function is dynamic 
 */
function setTableValuesToOpeningStockItemInfo(totalCheckboxes, totalRow,radioButtonIndex) {
	if(totalRow > 0)
	{
		if (totalCheckboxes == undefined || totalCheckboxes == "undefined") {
			alert("Please select atleast one checkbox");
			return 0;
		}
		else{
				var factor1 = $('#purchaseUomFactorOneId' + totalCheckboxes).val();
				var factor2 = $('#purchaseUomFactorTwoId' + totalCheckboxes).val();
				var factor3 = $('#purchaseUomFactorThreeId' + totalCheckboxes).val();
				var factor4 = $('#purchaseUomFactorFourId' + totalCheckboxes).val();
			
				$('#itemMasterId' + radioButtonIndex).val($('#purchaseOSItemId' + totalCheckboxes).val());
				//$('#txtPurchaseQuotationDocQuantity' + radioButtonIndex).val($('#itemQuantityId' + totalCheckboxes).val());
				$('#txtPurchaseQuotationUnitPrice' + radioButtonIndex).val($('#purchaseUnitPriceOneId' + totalCheckboxes).val());
				$('#txtPurchaseQuotationFactorOne' + radioButtonIndex).val($('#purchaseUomFactorOneId' + totalCheckboxes).val());
				$('#txtPurchaseQuotationFactorTwo' + radioButtonIndex).val($('#purchaseUomFactorTwoId' + totalCheckboxes).val());
				$('#txtPurchaseQuotationFactorThree' + radioButtonIndex).val($('#purchaseUomFactorThreeId' + totalCheckboxes).val());
				$('#txtPurchaseQuotationFactorFour' + radioButtonIndex).val($('#purchaseUomFactorFourId' + totalCheckboxes).val());
				//$('#txtPurchaseQuotationActualQuantity' + radioButtonIndex).val($('#itemQuantityId' + totalCheckboxes).val());
				$('#txtPurchaseQuotationPendingQuantity' + radioButtonIndex).val($('#itemQuantityId' + totalCheckboxes).val());
				$('#txtPurchaseQuotationItemName_' + radioButtonIndex).val($('#itemNameId' + totalCheckboxes).val());
				$('#txtPurchaseQuotationTaxCodePO_' + radioButtonIndex).val($('#taxRateId' + totalCheckboxes).val());
				$('#txtPurchaseQuotationTaxAmount_' + radioButtonIndex).val($('#taxRateId' + totalCheckboxes).val());
				//added UOM names by rohit
				$('#uomUnitFactorOneNameId' + radioButtonIndex).text($('#uomUnitOneNameId' + totalCheckboxes).val());
				$('#uomUnitFactorTwoNameId' + radioButtonIndex).text($('#uomUnitTwoNameId' + totalCheckboxes).val());
				$('#uomUnitFactorThreeNameId' + radioButtonIndex).text($('#uomUnitThreeNameId' + totalCheckboxes).val());
				$('#uomUnitFactorFourNameId' + radioButtonIndex).text($('#uomUnitFourNameId' + totalCheckboxes).val());
				
				//added for item asset maintenance details
				$('#assetItemStatusId' + radioButtonIndex).val($('#assetItemStatusModalId' + totalCheckboxes).val());
				//added for lab equipment status
				$('#labEquipmentItemStatusId' + radioButtonIndex).val($('#labEquipmentItemStatusModalId' + totalCheckboxes).val());
				$('#reagentItemStatusId' + radioButtonIndex).val($('#reagentItemStatusModalId' + totalCheckboxes).val());
				$('#assetItemManufactureId' + radioButtonIndex).val($('#manufactureNameModalId' + totalCheckboxes).val());
				$('#assetAmcValId' + radioButtonIndex).val($('#assetAmcValModalId' + totalCheckboxes).val());
				$('#assetPmValId' + radioButtonIndex).val($('#assetPmValModalId' + totalCheckboxes).val());
				$('#assetAmcYearId' + radioButtonIndex).val($('#assetAmcYearModalId' + totalCheckboxes).val());
				$('#assetPmYearId' + radioButtonIndex).val($('#assetPmYearModalId' + totalCheckboxes).val());
				$('#assetProductWarrantyId' + radioButtonIndex).val($('#assetProductWarrantyModalId' + totalCheckboxes).val());
				$('#assetProductWarrantyDurationId' + radioButtonIndex).val($('#assetProductWarrantyDurationModalId' + totalCheckboxes).val());
				$('#assetUnitPriceId' + radioButtonIndex).val($('#purchaseUnitPriceOneId' + totalCheckboxes).val());
				$('#assetProductCategory' + radioButtonIndex).val($('#assetProductCategoryModalId' + totalCheckboxes).val());
				
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
				
				
				if($('#isItemBatchWise' + totalCheckboxes).val() == "YES"){
					closeItemPurchaseDetailsModal();
					var itemId = $('#purchaseOSItemId' + totalCheckboxes).val();
					$('#txtPurchaseQuotationBatchNoPO' + radioButtonIndex).prop('disabled', false);
					$('#txtOpeningStockExpiryDate' + radioButtonIndex).prop('disabled', false);
					if(itemId!=null && itemId !=undefined){
						getBatchDetails(itemId);
					}
				}else{
					$('#txtPurchaseQuotationBatchNoPO' + radioButtonIndex).val(0).prop('disabled', true);
					$('#txtOpeningStockExpiryDate' + radioButtonIndex).val("NA").prop('disabled', true);
				}
				closeItemPurchaseDetailsModal();
	
		}
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
				url : "ehat/invGoodReceiptNote/getBatchDetails",
				data : str + "&reqType=AJAX",
				error : function() {
					alert('error');
				},
				success : function(response) {
					if(JSON.stringify(response.length) > 0){
						$('#batchModel').modal('show');
						//length = response.itemPurchaseSlaveDto.length;
						length = response.length;
						var htm = "";
						for ( var i = 0; i < length; i++) {
							if (i == 0) {
								$("#batchData")
										.html(
												"<tr><td>"
														+ "<input type='radio' name='rowBatch' id='rowIdBatch"
														+ i
														+ "' value="
														+ i
														+ " onclick='getRadioButtonIndex(this.value)' autofocus='autofocus'></td>"
														+ "<td><input type='text'"
														+ "class='form-control input-SmallText' disabled='disabled'  id='itemName"
														+ i
														+ "'"
														+ "tabindex='-1' /></td>"
														+ "<td><input type='text'"
														+ "class='form-control input-SmallText' disabled='disabled' id='itemQuantity"
														+ i
														+ "'"
														+ "tabindex='-1' /></td>"
														+ "<td><input type='text'"
														+ "class='form-control input-SmallText' disabled='disabled'  id='itemBatchCode"
														+ i
														+ "'"
														+ "tabindex='-1' /></td>"
														+ "<td><input type='text'"
														+ "class='form-control input-SmallText' disabled='disabled'  id='itemBatchExpireDate"
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
												+ "<input type='radio' name='rowBatch' id='rowIdBatch"
												+ i
												+ "' value="
												+ i
												+ " onclick='getRadioButtonIndex(this.value)' autofocus='autofocus'></td>"
												+ "<td><input type='text'"
												+ "class='form-control input-SmallText' disabled='disabled' id='itemName"
												+ i
												+ "'"
												+ "tabindex='-1' /></td>"
												+ "<td><input type='text'"
												+ "class='form-control input-SmallText' disabled='disabled'  id='itemQuantity"
												+ i
												+ "'"
												+ "tabindex='-1' /></td>"
												+ "<td><input type='text'"
												+ "class='form-control input-SmallText' disabled='disabled' id='itemBatchCode"
												+ i
												+ "'"
												+ "tabindex='-1' /></td>"	
												+ "<td><input type='text'"
												+ "class='form-control input-SmallText' disabled='disabled' id='itemBatchExpireDate"
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
							$("#itemQuantity" + i).val(response[i].itemQuantity);
							$("#itemName" + i).val(response[i].itemName);
							var expDate = getDateOnBatchModel(response[i].itemBatchExpDate);
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
		var rowId = $("#openingStockItemCurrentRowIndexId").val();
		$('#uomUnitLatestFactorId' + rowId).text("");
		$('#uomUnitFactorOneNameId' + rowId).text("");
		$('#uomUnitFactorTwoNameId' + rowId).text("");
		$('#uomUnitFactorThreeNameId' + rowId).text("");
		$('#uomUnitFactorFourNameId' + rowId).text("");
		$('#txtPurchaseQuotationUnitPrice' + rowId).val("");
		$('#txtPurchaseQuotationFactorOne' + rowId).val(0);
		$('#txtPurchaseQuotationFactorTwo' + rowId).val(0);
		$('#txtPurchaseQuotationFactorThree' + rowId).val(0);
		$('#txtPurchaseQuotationFactorFour' + rowId).val(0);
		$('#txtPurchaseQuotationTaxCodePO_' + rowId).val(0);
		$('#txtPurchaseQuotationTaxAmount_' + rowId).val(0);
		$('#txtPurchaseQuotationItemName_' + rowId).val("");
		$('#itemMasterId' + rowId).val(0);
		$('#txtPurchaseQuotationBatchNoPO' + rowId).val("");
		$('#txtOpeningStockExpiryDate' + rowId).val("");
	}
	$("#selectPurchaseOrderModalId").modal("hide");
	$("#purchaseOrderModalId").modal("hide");
}



//this is for batch code set to item table 

function setModalInfoToTableOnOpeningStockBatchWise() {
	var table = document.getElementById("ItemInfoTablePO");
	var itemSlaveRowCount = table.rows.length;
	//var newItemSlaveRowCount = itemSlaveRowCount - 1;
	var newItemSlaveRowCount = $("#openingStockItemCurrentRowIndexId").val();
	var totalRow = 0;
	$('#batchData input[type=radio]').each(function() {
		totalRow++;
	});
	var totalCheckboxes = $('input[name=rowBatch]:checked').val();
	setTableValuesToOpeningStockItemInfoBatchWise(totalCheckboxes, totalRow,
			newItemSlaveRowCount);

}

function setTableValuesToOpeningStockItemInfoBatchWise(totalCheckboxes, totalRow,
		radioButtonIndex) {
	if (totalRow > 0) {
		$('#itemQuantityId' + radioButtonIndex).val($('#itemQuantity' + totalCheckboxes).val());
		$('#txtPurchaseQuotationBatchNoPO' + radioButtonIndex).val($('#itemBatchCode' + totalCheckboxes).val());
		$('#batchKeyId' + radioButtonIndex).val($('#batchIdKey' + totalCheckboxes).val());
		$('#txtOpeningStockExpiryDate' + radioButtonIndex).val($('#itemBatchExpireDate' + totalCheckboxes).val());
		$('#batchModel').modal('hide');
	}
}

function getRadioButtonIndex(index) {
	document.getElementById("hiddenRadioButtonIndex").value = index;
}
function closeItemBatchDetailsModal() {
	$("#batchModel").modal("hide");
}

/**
 * @author : Rohit Sandbhor
 * @date : 27-12-2019
 * @comment	: This function is created for to get formated date on table
 * @param date
 * @returns
 */
function getDateOnBatchModel(date) {
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
//************************************************************************************************************************************************
function addNewRowInTableForClosingStock(tableId, callFrom) {

	var tbody = "";
	var rows = $('#' + tableId + ' tbody tr').length;


	if (callFrom == "CLOSE") {

		tbody = generateClosingStockTableBody(rows + 1);
	}
	else if(callFrom == "closingstockOnPlus"){
		tbody = getClosingStockTableBodyOnPlusButton(rows+1);
	}

	$('#' + tableId).append(tbody);
}

/************
 * @author	: Dayanand Khandekar
 * @date		: 11-Feb-2020
 * @codeFor	: Remove row temp for Closing Stock
 ************/
function removeRowFromTableForClosingStock(tableId, checkboxClass) {

	$('.' + checkboxClass + ':checkbox:checked').parents("tr").remove();
	checkForClosingStock(tableId);
	checkCompForClosingStock(tableId);


}

/************
 * @author	: Dayanand Khandekar
 * @date		: 11-Feb-2020
 * @codeFor	: Remove row temp for Closing Stock
 ************/
function checkForClosingStock(tableId) {
	obj = $('#' + tableId + ' tbody tr').find('span');
	$.each(obj, function (key, value) {
		id = value.id;
		$('#' + id).html(key + 1);
	});
}

/************
 * @author	: Dayanand Khandekar
 * @date		: 11-Feb-2020
 * @codeFor	: Remove row temp for Closing Stock
 ************/
function checkCompForClosingStock(tableId) {

	var trLength = $('#' + tableId).find("tr:first th").length;
	obj = $('#' + tableId + ' tbody tr td').find('input,select,radio');
	var inx = 1;
	var idIndex = 1;
	$.each(obj, function (key, value) {

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
}
/************
 * @author	: Vinod Udawant
 * @date		: 18-Nov-2019
 * @codeFor	: Check uncheck all checkbox in table
 ************/
function checkUncheckAll(masterChkId, slaveChkClass) {

	if ($("#" + masterChkId).is(":checked")) {

		$('.' + slaveChkClass).prop("checked", true)
	} else {

		$('.' + slaveChkClass).prop("checked", false)
	}
}

/************
 * @author	: Dayanand Khandekar
 * @date		: 11-Fev-2020
 * @codeFor	: Add new row temp for closing stock
 ************/


function generateClosingStockTableBody(id) {

	var tbody = "<tr id='multiTr" + id + "' class='newAdded'>" +
		"<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkbox" + id + "' value='" + id + "'></td>" +
		"<td class='col-md-1 center' ><span id='snum" + id + "'>" + id + "</span><input type='hidden' id='itemSlaveId" + id + "' value='0'></td>" +
		"<td class='col-md-3 center'><input type='text' id='txtItemNameId" + id + "' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' data-name='closingStockModule'> </td>" +
		"<td class='col-md-1 center'><input type='text' id='txtBatchCode" + id + "' class='form-control input-SmallText' disabled='disabled'> </td>" +
		"<td class='col-md-1 center'><input type='text' id='txtItemExpirayDate" + id + "' class='form-control input-SmallText' disabled='disabled'> </td>" +
		"<td class='col-md-1 center'><input type='text' id='txtItemAvailableQty" + id + "' class='form-control input-SmallText' disabled='disabled'> </td>" +
		"<td class='col-md-1 center'><input type='text' id='txtItemDeductQty" + id + "' class='form-control input-SmallText'> </td>"

		+
		"<td class='col-md-4 center'><textarea  style='width:100%;' id='txtItemNaration" + id + "' /> </td>"

		+
		"<td class='col-md-1 center' style='display:none'><input type='text' readonly id='itemMasterId" + id + "' class='form-control input-SmallText '> </td>" +
		"</tr>";

	return tbody;

}


/**
 * @author : Rohit Sandbhor
 * @date : 27-12-2019
 * @comment	: This function is created for to get total item quantity from batch stock
 * @param res
 */
function getBatchDetailsForClosingStock(itemId) {
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
					$('#batchWisecloseStockModal').modal('show');
					//length = response.itemPurchaseSlaveDto.length;
					length = response.length;
					var htm = "";
					for (var i = 0; i < length; i++) {
						if (i == 0) {
							$("#batchWisecloseStockTbody")
								.html(
									"<tr><td>" +
									"<input type='radio' name='row' id='rowId" +
									i +
									"' value=" +
									i +
									" onclick='getRadioButtonIndex(this.value)' autofocus='autofocus'></td>" +
									"<td><input type='text'" +
									"class='form-control input-SmallText'  id='itemName" +
									i +
									"'" +
									"tabindex='-1' /></td>" +
									"<td><input type='text'" +
									"class='form-control input-SmallText'  id='itemQuantity" +
									i +
									"'" +
									"tabindex='-1' /></td>" +
									"<td><input type='text'" +
									"class='form-control input-SmallText'  id='itemBatchCode" +
									i +
									"'" +
									"tabindex='-1' /></td>" +
									"<td><input type='text'" +
									"class='form-control input-SmallText'  id='itemBatchExpireDate" +
									i +
									"'" +
									"tabindex='-1' /></td>" +
									"<td style='display:none;'><input type='hidden'" +
									"class='form-control input-SmallText'  id='batchIdKey" +
									i +
									"'" +
									"tabindex='-1' value=''/></td>" +

									"<td style='display:none;'><input type='hidden'" +
									"class='form-control input-SmallText'  id='itemMasterIdBatch" +
									i +
									"'" +
									"tabindex='-1' value=''/></td>" +


									"</tr>");

						} else {
							$("#batchWisecloseStockTbody")
								.append(
									"<tr><td>" +
									"<input type='radio' name='row' id='rowId" +
									i +
									"' value=" +
									i +
									" onclick='getRadioButtonIndex(this.value)' autofocus='autofocus'></td>" +
									"<td><input type='text'" +
									"class='form-control input-SmallText'  id='itemName" +
									i +
									"'" +
									"tabindex='-1' /></td>" +
									"<td><input type='text'" +
									"class='form-control input-SmallText'  id='itemQuantity" +
									i +
									"'" +
									"tabindex='-1' /></td>" +
									"<td><input type='text'" +
									"class='form-control input-SmallText'  id='itemBatchCode" +
									i +
									"'" +
									"tabindex='-1' /></td>" +
									"<td><input type='text'" +
									"class='form-control input-SmallText'  id='itemBatchExpireDate" +
									i +
									"'" +
									"tabindex='-1' /></td>" +

									"<td style='display:none;'><input type='hidden'" +
									"class='form-control input-SmallText'  id='batchIdKey" +
									i +
									"'" +
									"tabindex='-1' value=''/></td>" +

									"<td style='display:none;'><input type='hidden'" +
									"class='form-control input-SmallText'  id='itemMasterIdBatch" +
									i +
									"'" +
									"tabindex='-1' value=''/></td>" +

									"</tr>");
						}
						$("#itemQuantity" + i).val(response[i].itemQuantity);
						$("#itemName" + i).val(response[i].itemName);
						var expDate = getDateForCloseStock(response[i].itemBatchExpDate);
						$("#itemBatchExpireDate" + i).val(expDate);
						$("#batchIdKey" + i).val(response[i].id);
						$("#itemBatchCode" + i).val(response[i].itemBatchCode);
						$("#itemMasterIdBatch" + i).val(response[i].itemMasterId);
					}
				}
			}
		});
}

/************
 * @author	: Dayanand Khandekar
 * @date		: 11-Fev-2020
 * @codeFor	:setTableValuesToClosingStockItemInfo
 ************/
function getDateForCloseStock(date) {
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

//this is for batch code set to item table 
/************
 * @author	: Dayanand Khandekar
 * @date		: 11-Fev-2020
 * @codeFor	:setModalInfoToTableOnBatch
 ************/
function setModalInfoToTableOnBatch() {
	var table = document.getElementById("closingstockTable");
	var itemSlaveRowCount = table.rows.length;
	var newItemSlaveRowCount = itemSlaveRowCount - 1;
	var totalRow = 0;
	$('#batchWisecloseStockTbody input[type=radio]').each(function () {
		totalRow++;
	});
	var totalCheckboxes = $('input[name=row]:checked').val();
	setTableValuesToClosingStockItemInfo(totalCheckboxes, totalRow,
		newItemSlaveRowCount);

}

/************
 * @author	: Dayanand Khandekar
 * @date		: 11-Fev-2020
 * @codeFor	:setTableValuesToClosingStockItemInfo
 ************/

function setTableValuesToClosingStockItemInfo(totalCheckboxes, totalRow,
	radioButtonIndex) {
	if (totalRow > 0) {
		$('#txtItemAvailableQty' + radioButtonIndex).val($('#itemQuantity' + totalCheckboxes).val());
		$('#txtBatchCode' + radioButtonIndex).val($('#itemBatchCode' + totalCheckboxes).val());
		$('#itemMasterId' + radioButtonIndex).val($('#itemMasterIdBatch' + totalCheckboxes).val());
		//$('#batchKeyId' + radioButtonIndex).val($('#batchIdKey' + totalCheckboxes).val());
		$('#txtItemExpirayDate' + radioButtonIndex).val($('#itemBatchExpireDate' + totalCheckboxes).val());
		$('#txtItemExpirayDate' + radioButtonIndex).prop('disabled', true);
		$('#batchWisecloseStockModal').modal('hide');
	}
}


/************
 * @author	: Dayanand Khandekar
 * @date		: 11-Fev-2020
 * @codeFor	:setTableValuesToClosingStockItemInfo
 ************/
function closeItemPurchaseDetailsModalOnClose() {
	$('#batchWisecloseStockModal').modal('hide');

}

/************
 * @author	: Dayanand Khandekar
 * @date		: 11-Fev-2020
 * @codeFor	:saveClosingStockModule
 ************/
function saveClosingStockModule() {

	var closingStockDate = $("#closingStockDateId").val();
	var userId = $("#userId").val();
	var unitId = $("#unitId").val();

	var id = $("#stockId").val();


	//var genralInfo = $("#PartyGeneralTableInfoList").html().length;
	var itemInfo = $('#closingstockTable tbody tr.newAdded').length;

	if (itemInfo == "" || itemInfo == null || itemInfo == 0) {
		alert("Enter at least One Record In Item Info tab ");
		return false;
	}


	// this is for item info
	var itemInfoDtoDetails = {
		lstclosingstockitemslave: []
	};

	var rows = $('#closingstockTable tbody tr.newAdded').length;
	if (rows == "" || rows == null || rows == 0) {
		alert("Please Enter Atleast One Record Under Given Item Info Table..!!");
		return false;
	}
	for (var i = 1; i <= rows; i++) {
		
		var userId = $("#userId").val();
		var unitId = $("#unitId").val();
		var userName = $("#userNameId").val();
		var itemName = $("#txtItemNameId" + i).val();
		var itemSlaveId = $("#itemSlaveId" + i).val();
		var itemBatchCode = $("#txtBatchCode" + i).val();
		var itemExpiryDate = $("#txtItemExpirayDate" + i).val();
		var itemCurrentStock = $("#txtItemAvailableQty" + i).val();
		var itemdeductStock = $("#txtItemDeductQty" + i).val();
		var itemNarration = $("#txtItemNaration" + i).val();
		var itemdMasterId = $("#itemMasterId" + i).val();
		if(itemdMasterId==0||itemdMasterId==""||itemdMasterId==null){
			alert("Please Select Item Name In Row...."+i);
			return false;
		}
		
		if(itemdeductStock==""||itemdeductStock==0||itemdeductStock==null||itemdeductStock=="null"){
			alert("Deduct Qty Should Not be Blank Or Greater Than Zero In Row  ...."+i);
			return false;
		}
		
    if(Number(itemdeductStock) > Number(itemCurrentStock)){
    	alert("Stock Deduct Qty Should Not Be Greater Than Current Stock");
    	return false;
    	
    }
		
		setItemInfoList(itemInfoDtoDetails, itemSlaveId, itemName,
			itemBatchCode, itemExpiryDate, itemCurrentStock,
			itemdeductStock, itemNarration, itemdMasterId,
			userId, unitId, userName);
	}

	itemInfoDtoDetails = JSON
		.stringify(itemInfoDtoDetails);


	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('userId=' + userId);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('closingStockDate=' + closingStockDate);

	// this is for item info
	inputs.push("itemInfoDtoDetails=" + encodeURIComponent(itemInfoDtoDetails));


	var str = inputs.join('&');

	jQuery.ajax({
		async: true,
		type: "POST",
		data: str + "&reqType=AJAX",
		url: "ehat/inventoryClosingStock/saveClosingStock",
		cache: false,
		success: function (r) {
			if (r == 1) {
				alertify.success("Records Saved Sucessfully");
				setTimeout(function () {
					window.location.reload();
				}, 1000);

			} else if (r == 2) {
				alertify.success("Records Updated Sucessfully");
				setTimeout(function () {
					window.location.reload();
				}, 1000);
			} else {
				alertify.error("Network  Issue");
			}

		}
	});
}

/************
 * @author	: Dayanand Khandekar
 * @date		: 11-Fev-2020
 * @codeFor	:setItemInfoList
 ************/

function setItemInfoList(itemInfoDtoDetails, itemSlaveId, itemName,
	itemBatchCode, itemExpiryDate, itemCurrentStock,
	itemdeductStock, itemNarration, itemdMasterId,
	userId, unitId, userName) {
	itemInfoDtoDetails.lstclosingstockitemslave.push({
		itemId: itemSlaveId,
		itemName: itemName,
		itemBatchCode: itemBatchCode,
		itemExpiryDate: itemExpiryDate,
		itemCurrentStock: itemCurrentStock,
		itemdeductStock: itemdeductStock,
		itemNarration: itemNarration,
		itemdMasterId: itemdMasterId,
		unitId: unitId,
		createdBy: userId,
		userName: userName,
	});

}

/************
 * @author	: Dayanand Khandekar
 * @date		: 13-Fev-2020
 * @codeFor	:getAllClosingStockRecordsDetails
 ************/
function getAllClosingStockRecordsDetails() {
	var unitId = $("#unitId").val();
	var inputs = [];

	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async: true,
		type: "GET",
		url: "ehat/inventoryClosingStock/getAllClosingStockRecordsDetails",
		data: str + "&reqType=AJAX",
		error: function () {
			alert('Network Issue..!!');
		},
		success: function (r) {
			setClosingStockDataToTable(r);

		}
	});
}


function setClosingStockDataToTable(r) {
	var htm = "";
	var index = 1;
	for (var i = 0; i < r.lstclosingstockmaster.length; i++) {
		var datee = getDate(r.lstclosingstockmaster[i].createdDateTime);
		var batchExpDate = getDateWithoutTime(r.lstclosingstockmaster[i].batchExpDate);

		htm = htm +
			'<tr> ' +
			' <td class="col-md-1 center">' +
			index +
			'</td>'
			+
			' <td class="col-md-1 center">' +
			datee +
			'</td>'
			+
			' <td class="col-md-1 center">' +
			r.lstclosingstockmaster[i].id +
			'</td>'
			+
			' <td class="col-md-1 center">' +
			r.lstclosingstockmaster[i].itemName +
			'</td>'
			+
			' <td class="col-md-1 center">' +
			r.lstclosingstockmaster[i].batchNumber + '</td>'
			+
			' <td class="col-md-1 center">' +
			batchExpDate + '</td>'
			+
			' <td class="col-md-1 center">' +
			r.lstclosingstockmaster[i].itemDeductQuantity + '</td>'
			+
			' <td class="col-md-1 center">' +
			r.lstclosingstockmaster[i].narration + '</td>'
			+
			' <td class="col-md-1 center">' +
			r.lstclosingstockmaster[i].userName + '</td>'

			+
			'</tr>';
		index++;
		
		var numberOfRows="";
		var indexNew=1;
		var count=r.noOfPages;
		var numberOfPages=(count/10);
		var displayPagination=numberOfPages;	
		if(numberOfPages > 5){
			numberOfRows +="<li class='disabled previous'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
			displayPagination=5;
		}
		for(var j=0;j<displayPagination;j++){
			numberOfRows +="<li onclick='paginationClosingStock("+indexNew+");'><a>"+indexNew+"</a></li>";
			indexNew=indexNew+1;
		}
		if(numberOfPages>6){
			numberOfRows +="<li class='next' onclick='nextPaginationClosingStock("+indexNew+","+Math.round(numberOfPages)+");'><a class='page-link' href='#'>Next</a></li>";
		}
		$('#totalNumberOfPagesClosingStock').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
		$('#closingStockRecordPagination').html(numberOfRows);

	}
	$("#closingStockTableBody").html(htm);
}
/**
 * 
 * @param id
 * @param rowCount
 */
function setOrderedQuantity(id, rowCount){
	var itemQuantity = $('#' + id).val();
	$('#txtPurchaseQuotationActualQuantity' + rowCount).val(itemQuantity);
}


/**
 * 
 */
function refreshOpeningStockDetails(){
	$("#openingStockSeriesId").val("");
	$("#stockNarrationId").val("");
	$("#totalItemQuantityId").val("");
	$("#totalAmountId").val("");
	
	var tableHeaderRowCount = 1;
	var table = document.getElementById('ItemInfoTablePO');
	var rowCount = table.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
	    table.deleteRow(tableHeaderRowCount);
	}
	
	
	
}



/************
* @author	: Dayanand Khandekar
* @date		: 26-Feb-2020
* @codeFor	: get Document Number Master Detail For OS Series
 ************/
function getDocNumberingForOSSeries(){
	var unitId = $("#unitId").val();
	var inputs = [];	
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/inventoryM/getAllInventoryNUmberDoc",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(response){			
			var divContent = "";
			for (var i = 0; i < response.lstDocumentNumberDTO.length; i++) {
				if (response.lstDocumentNumberDTO[i].document_numbering_id == 6) {
					divContent = divContent +
						"<option id='seriesId' value='" +
						response.lstDocumentNumberDTO[i].document_numbering_id +
						"'  >" +
						response.lstDocumentNumberDTO[i].document_series +
						"</option>";
					var osId=getNextOSId();
				
					$("#openingStockSeriesId").val(response.lstDocumentNumberDTO[i].document_prefix+""+osId+""+ response.lstDocumentNumberDTO[i].document_suffix)
				}
			}
			$("#osSeriesId").html(divContent);
			
		}
	
	});
	
}
/************
* @author	: Dayanand Khandekar
* @date		: 26-Feb-2020
* @codeFor	: get Next OS ID From Table
 ************/
function getNextOSId(){
	var inputs = [];
	var result="";
	inputs.push('tableName=inv_opening_stock_new');
	var str = inputs.join('&');
	jQuery.ajax({
		async: false,
		type: "POST",
		data: str + "&reqType=AJAX",
		url: "ehat/invGoodReceiptNote/getGoodReceiptNoteSeriesNextId",
		timeout: 1000 * 60 * 5,
		catche: false,
		error: function () {
			alert("error");
		},
		
		success: function (r) {
			result=r;
		
		}
	});
	return result;
}

/************
* @author	: Dayanand Khandekar
* @date		: 2-March-2020
* @codeFor	: these function calculate all item qty
 ************/
function calculateTotalItemQty(){
var tableLengt = $('#ItemInfoTablePO tbody tr.newAdded').length;
	
	var totalItemQty=0;
	for(var i=1;i<=tableLengt;i++){
		
		var txtQty=$("#txtPurchaseQuotationDocQuantity"+i).val();
		
		txtQty = (txtQty != '' && txtQty !="undefined" && txtQty !=null) ? txtQty : 0;
		
		totalItemQty=parseFloat(totalItemQty)+ parseFloat(txtQty);
		
	}
	
	$("#totalItemQuantityId").val(totalItemQty);
}


/************
* @author	: Dayanand Khandekar
* @date		: 2-March-2020
* @codeFor	: these function calculate all igst qty
 ************/
function rowAmtCalNEWForOS(id, rowCount) {

	var taxAmt = $("#txtPurchaseQuotationTaxAmount_" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null) {
		$('#txtPurchaseQuotationRowAmount' + rowCount).val('');
	}
	
	
	if(parseFloat(taxAmt) > 0){
		document.getElementById("txtPurchaseQuotationTaxCodePO_"+rowCount).disabled = true;
		$('#txtPurchaseQuotationTaxCodePO_' + rowCount).val(0);
		
	}else{
		document.getElementById("txtPurchaseQuotationTaxCodePO_"+rowCount).disabled = false;
	}
	
	
	var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
	if(baseAmt == " " || baseAmt == null)
	{
	$("#txtPurchaseQuotationRowAmount"+ rowCount).val(' ');
	return false;
	}
	
	else {
		
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
		var taxAmt = $("#txtPurchaseQuotationTaxAmount_" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		$('#txtPurchaseOrderTaxAmtinRs'+ rowCount).val(finalcaltaxanmount); //add tax amount in Rs @author:paras @Date:23nov 
		 finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		 var finalRowAmtcalculationgTax = finalsumofRowAmt.toFixed(2);
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(finalRowAmtcalculationgTax);
	}

}



/************
* @author	: Dayanand Khandekar
* @date		: 2-March-2020
* @codeFor	: these function calculate  item gst qty
 ************/
function rowAmtCalNEWForOSGST(id, rowCount) {
	var taxAmt = $("#txtPurchaseQuotationTaxCodePO_" + rowCount).val();
	if (taxAmt == '' || taxAmt == undefined || taxAmt == null ||taxAmt==0) {
		$('#txtPurchaseQuotationRowAmount' + rowCount).val('');
	}
	if(parseFloat(taxAmt) > 0){
		document.getElementById("txtPurchaseQuotationTaxAmount_"+rowCount).disabled = true;
		$('#txtPurchaseQuotationTaxAmount_' + rowCount).val(0);
	}else{
		document.getElementById("txtPurchaseQuotationTaxAmount_"+rowCount).disabled = false;
	}
	var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
	if(baseAmt == " " || baseAmt == null)
	{
	$("#txtPurchaseQuotationRowAmount"+ rowCount).val(' ');
	return false;
	}
	else {
		var caltaxonBaseAmt = 0;
		var finalsumofRowAmt;
		var baseAmt = $('#txtPurchaseQuotationBaseAmount' + rowCount).val();
		var taxAmt = $("#txtPurchaseQuotationTaxCodePO_" + rowCount).val();
		caltaxonBaseAmt = parseFloat(baseAmt) * parseFloat(taxAmt) / 100;
		var finalcaltaxanmount = caltaxonBaseAmt.toFixed(2);
		if(finalcaltaxanmount == "NaN"){
			finalcaltaxanmount = 0;
		}
		$('#txtPurchaseOrderTaxAmtinRs'+ rowCount).val(finalcaltaxanmount); //add tax amount in Rs @author:paras @Date:23nov 
		 finalsumofRowAmt = parseFloat(baseAmt) + parseFloat(finalcaltaxanmount);
		 var finalRowAmtcalculationgTax = finalsumofRowAmt.toFixed(2);
		 if(finalRowAmtcalculationgTax == "NaN"){
			 finalRowAmtcalculationgTax = 0;
			}
		$('#txtPurchaseQuotationRowAmount' + rowCount).val(finalRowAmtcalculationgTax);
	}

}


/************
* @author	: Dayanand Khandekar
* @date		: 2-March-2020
* @codeFor	: these function calculate  total AMount
 ************/
function calculateTotalAmount(){	
var tableLengt = $('#ItemInfoTablePO tbody tr.newAdded').length;	
	var totalItemAMt=0;
	for(var i=1;i<=tableLengt;i++){
		
		var totalAmt=$("#txtPurchaseQuotationRowAmount"+i).val();
		totalAmt = (totalAmt != '' && totalAmt !="undefined" &&  totalAmt !=null) ? totalAmt : 0;
		
		totalItemAMt=parseFloat(totalItemAMt)+ parseFloat(totalAmt);
		
	}	
	$("#totalAmountId").val(totalItemAMt);
	
}

/**
 * 
 * @param id
 * @returns {String}
 */
function getClosingStockTableBodyOnPlusButton(id) {
	var mainTable = document.getElementById("closingstockTable");
	var mainTableLength =  mainTable.rows.length;
	if(mainTableLength == 1){
	var tbody = "<tr id='multiTr" + id + "' class='newAdded'>" +
		"<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkbox" + id + "' value='" + id + "'></td>" +
		"<td class='col-md-1 center' ><span id='snum" + id + "'>" + id + "</span><input type='hidden' id='itemSlaveId" + id + "' value='0'></td>" +
		"<td class='col-md-3 center'><input type='text' id='txtItemNameId" + id + "' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' data-name='closingStockModule'> </td>" +
		"<td class='col-md-2 center'><input type='text' id='txtBatchCode" + id + "' class='form-control input-SmallText' disabled='disabled'> </td>" +
		"<td class='col-md-2 center'><input type='text' id='txtItemExpirayDate" + id + "' class='form-control input-SmallText' disabled='disabled'> </td>" +
		"<td class='col-md-2 center'><input type='text' id='txtItemAvailableQty" + id + "' class='form-control input-SmallText' disabled='disabled'> </td>" +
		"<td class='col-md-2 center'><input type='text' id='txtItemDeductQty" + id + "' class='form-control input-SmallText'> </td>"
		+
		"<td class='col-md-3 center'><textarea  id='txtItemNaration" + id + "' /> </td>"
		+
		"<td class='col-md-1 center' style='display:none'><input type='text' readonly id='itemMasterId" + id + "' class='form-control input-SmallText '> </td>" +
		"</tr>";

	return tbody;
	}
	else{
		var newid = id - 1;
		var unitPrice = $("#txtBatchCode"+newid).val();
		if(unitPrice == null || unitPrice == ""){
			alert("You Cannot Add Row Without Filling Previous Row Values...!!!");
			return false;
		}
		var tbody = "<tr id='multiTr" + id + "' class='newAdded'>" +
		"<td class='col-md-1 center'><input type='checkbox' class='chkMrnItem' id='checkbox" + id + "' value='" + id + "'></td>" +
		"<td class='col-md-1 center' ><span id='snum" + id + "'>" + id + "</span><input type='hidden' id='itemSlaveId" + id + "' value='0'></td>" +
		"<td class='col-md-3 center'><input type='text' id='txtItemNameId" + id + "' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' data-name='closingStockModule'> </td>" +
		"<td class='col-md-2 center'><input type='text' id='txtBatchCode" + id + "' class='form-control input-SmallText' disabled='disabled'> </td>" +
		"<td class='col-md-2 center'><input type='text' id='txtItemExpirayDate" + id + "' class='form-control input-SmallText' disabled='disabled'> </td>" +
		"<td class='col-md-2 center'><input type='text' id='txtItemAvailableQty" + id + "' class='form-control input-SmallText' disabled='disabled'> </td>" +
		"<td class='col-md-2 center'><input type='text' id='txtItemDeductQty" + id + "' class='form-control input-SmallText'> </td>"
		+
		"<td class='col-md-3 center'><textarea  id='txtItemNaration" + id + "' /> </td>"
		+
		"<td class='col-md-1 center' style='display:none'><input type='text' readonly id='itemMasterId" + id + "' class='form-control input-SmallText '> </td>" +
		"</tr>";

	return tbody;
	}

}

/**
 * 
 * @param id1
 */
function addRowAssetMaintenance(id1){
	var length  = $("#txtPurchaseQuotationDocQuantity"+id1).val();
	var assetMaintenanceTableLength = $('#maintenanceTableInfo tbody tr.newAdded').length;
	var newId = assetMaintenanceTableLength + 1;
	var labEquipmentStatus = "";
	if($("#assetItemStatusId"+id1).val() == 1 && $("#labEquipmentItemStatusId"+id1).val() == 1){
		labEquipmentStatus = "LABEQUIPMENT";
	}
	else{
		labEquipmentStatus = "OTHER";
	}
	
	if($("#assetItemStatusId"+id1).val() == 1){
		var id = 0;
		var htm = "";
		itemName = $("#txtPurchaseQuotationItemName_"+id1).val();
		partyMasterId = 0;
		partyName = "NA";	
		itemId = $("#itemMasterId"+id1).val();
		manufactureName = $("#assetItemManufactureId"+id1).val();
		assetAmcVal = $('#assetAmcValId' + id1).val();
		assetPmVal = $('#assetPmValId' + id1).val();
		assetAmcYear = $('#assetAmcYearId' + id1).val();
		assetPmYear = $('#assetPmYearId' + id1).val();
		assetProductWarranty = $('#assetProductWarrantyId' + id1).val();
		assetProductWarrantyDuration = $('#assetProductWarrantyDurationId' + id1).val();
		assetUnitPrice = $('#assetUnitPriceId' + id1).val();
		assetProductCategory = $('#assetProductCategory' + id1).val();
		
		for (var i = 0; i < length; i++) {
			htm = htm +
				"<tr class='newAdded' id='multiTr" +newId +"'>"+
				"<td>"+newId+"</td>" +
				"<td class='center' style='display:none;'><input  style='width: 100px;' type='text' id='assetItemSlaveId" + newId +"' class='form-control input-SmallText' value='0'></td>" +
				"<td class='center'><input  style='width: 100px;' type='text' id='serialNoAssetId" + newId +"' class='form-control input-SmallText' value=''></td>" +
				"<td class='center'><input  style='width: 250px;' type='text' id='itemNameAssetId" +newId + "' class='form-control input-SmallText' value='" +itemName+"'> </td>" +
				"<td style='display:none;'><input  style='width: 100px;display:none' type='text' id='itemAssetId" + newId +"' class='form-control input-SmallText' value='" +itemId+ "'></td>" +
				"<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetManufactureNameId" +newId +"' class='form-control input-SmallText' value='" +manufactureName+"'> </td>"+
				"<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetPartyNameId" +newId +"' class='form-control input-SmallText' value='" +partyName+"'> </td>"+
				"<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetPartyMasterIdId" +newId +"' class='form-control input-SmallText' value='" +partyMasterId+"'> </td>"+
				"<td style='display:none;'><input  style='width: 100px;display:none' type='text' id='assetAmcValAssetId" + newId +"' class='form-control input-SmallText' value='" +assetAmcVal+ "'></td>" +
				"<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetPmValAssetId" +newId +"' class='form-control input-SmallText' value='" +assetPmVal+"'> </td>"+
				"<td style='display:none;'><input  style='width: 150px;display:none'  type='text' id='assetAmcYearAssetId" +newId +"' class='form-control input-SmallText' value='" +assetAmcYear+"'> </td>"+
				"<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetPmYearAssetId" +newId +"' class='form-control input-SmallText' value='" +assetPmYear+"'> </td>"+
				"<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetProductWarrantyAssetId" +newId +"' class='form-control input-SmallText' value='" +assetProductWarranty+"'> </td>"+
				"<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetProductWarrantyDurationAssetId" +newId +"' class='form-control input-SmallText' value='" +assetProductWarrantyDuration+"'> </td>"+
				"<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetUnitPriceAssetId" +newId +"' class='form-control input-SmallText' value='" +assetUnitPrice+"'> </td>"+
				"<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetProductCategoryAssetId" +newId +"' class='form-control input-SmallText' value='" +assetProductCategory+"'> </td>"+
				"<td style='display:none;'><input  style='width: 150px;'  type='text' id='assetlabEquipmentStatusAssetId" +newId +"' class='form-control input-SmallText' value='" +labEquipmentStatus+"'> </td>"+
				"</tr>";
			newId++;
		}
	}
		
	$("#maintenanceTableInfoList").append(htm);
}

function fetchItemMasterOSDetails(inputID,index,callFrom) {
	$("#openingStockItemCurrentRowIndexId").val(parseInt(index));
	var categoryName = $("#" + inputID).attr('data-name');
	var searchAssetOrServiceItem ="";
	if (categoryName == "goodReceiptNote") {
		var grnSupplierName = document.getElementById("grnSupplierName").value;
		var grnSupplierState = document.getElementById("grnSupplierState").value;

		if (grnSupplierName == "" || grnSupplierState == 0) {
			alert("Please Select Supplier Name & State First..!!");
			return false;
		}

	} else if (categoryName == "purchasequotation") {
		var grnSupplierName = document.getElementById("supplierName").value;
		var grnSupplierState = document.getElementById("supplierState").value;

		if (grnSupplierName == "" || grnSupplierState == 0) {
			alert("Please Select Supplier Name & State First..!!");
			return false;
		}
	}

	else if (categoryName == "purchaseInvoice") {
		var piSupplierName = document.getElementById("purchaseInvSupplierName").value;
		var piSupplierState = document
				.getElementById("purchaseInvoiceSupplierState").value;

		if (piSupplierName == "" || piSupplierState == 0) {
			alert("Please Select Supplier Name & State First..!!");
			return false;
		}
	}
	
	else if (categoryName == "purchaseOrderModule") {
		var poSupplierName = document.getElementById("supplierNameId").value;
		var poSupplierState = document.getElementById("supplierStateId").value;

		if (poSupplierName == "" || poSupplierState == 0) {
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
	}else if(callFrom == "PO"){
		/*if ($("#assetItemOpningId").is(':checked') && $("#assetItemOpningId").val() == 'Asset') {
			searchAssetOrServiceItem = 	$("#assetItemOpningId").val();
        }else if($("#serviceItemOpningId").is(':checked') && $("#serviceItemOpningId").val() == 'Service'){
        	searchAssetOrServiceItem = 	$("#serviceItemOpningId").val();
        }*/
	}else if(callFrom == "OS"){
		
		if ($("#assetItemOpningId").is(':checked') && $("#assetItemOpningId").val() == 'Asset') {
			searchAssetOrServiceItem = 	$("#assetItemOpningId").val();
        }else if($("#serviceItemOpningId").is(':checked') && $("#serviceItemOpningId").val() == 'Service'){
        	searchAssetOrServiceItem = 	$("#serviceItemOpningId").val();
        }else {
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
					} else if (categoryName == "openingStockModule"
							|| categoryName == "purchaseOrderModule"
							|| categoryName == "purchaseExpenseModule"
							|| categoryName == "purchasequotation"
							|| categoryName == "closingStockModule"
							|| categoryName == "goodReceiptNote"
							|| categoryName == "generateMRNRequest"
							|| categoryName == "generateMRN"
							|| categoryName == "purchaseInvoice"
							|| categoryName == "consumptionRequest"
							|| categoryName == "mrnReturnRequest") {
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
														onSelect : displayItemMasterSearchResult,
														scrollBar : true
													});
									$("input#" + inputID).data('typeahead').source = resultData;
								}, 500);

					} else if (categoryName == "purchaseOrderModule"
							|| categoryName == "purchasequotation"
							|| categoryName == "purchaseExpenseModule"
							|| categoryName == "generateMRNRequest"
							|| categoryName == "generateMRN"
							|| categoryName == "consumptionRequest"
							|| categoryName == "mrnReturnRequest") {

						setTimeout(
								function() {
									$(
											"#divtxtPurchaseQuotationItemName .typeahead")
											.html(template);
									$(
											"#divtxtPurchaseQuotationItemName .typeahead")
											.show();
									$("input#" + inputID)
											.typeahead(
													{
														source : resultData,
														displayField : 'Name',
														valueField : 'ID',
														onSelect : displayItemMasterSearchResult,
														scrollBar : true
													});
									$("input#" + inputID).data('typeahead').source = resultData;
								}, 500);

					} else if (categoryName == "openingStockModule") {
						setTimeout(
								function() {
									$("#divtxtOpeningStockItemName .typeahead")
											.html(template);
									$("#divtxtOpeningStockItemName .typeahead")
											.show();
									$("input#" + inputID)
											.typeahead(
													{
														source : resultData,
														displayField : 'Name',
														valueField : 'ID',
														onSelect : displayItemMasterSearchResult,
														scrollBar : true
													});
									$("input#" + inputID).data('typeahead').source = resultData;
								}, 500);
					} else if (categoryName == "closingStockModule") {
						setTimeout(
								function() {
									$("#divtxtClosingStockItemName .typeahead")
											.html(template);
									$("#divtxtClosingStockItemName .typeahead")
											.show();
									$("input#" + inputID)
											.typeahead(
													{
														source : resultData,
														displayField : 'Name',
														valueField : 'ID',
														onSelect : displayItemMasterSearchResult,
														scrollBar : true
													});
									$("input#" + inputID).data('typeahead').source = resultData;
								}, 500);
					} else if (categoryName == "goodReceiptNote") {
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
														onSelect : displayItemMasterSearchResult,
														scrollBar : true
													});
									$("input#" + inputID).data('typeahead').source = resultData;
								}, 500);
					} else if (categoryName == "purchaseInvoice") {
						setTimeout(
								function() {
									$("#purchaseInvoiceItemName .typeahead")
											.html(template);
									$("#purchaseInvoiceItemName .typeahead")
											.show();
									$("input#" + inputID)
											.typeahead(
													{
														source : resultData,
														displayField : 'Name',
														valueField : 'ID',
														onSelect : displayItemMasterSearchResult,
														scrollBar : true
													});
									$("input#" + inputID).data('typeahead').source = resultData;
								}, 500);
					}

				}

			});
	// below function to set the search value to search text feild and calling
	// getPackingDetailsById function
	function displayItemMasterSearchResult(item) {
		var res = item.text.split('-');
		var itemMasterId = res[0];
		var itemName = res[1];
		if(itemName =="undefined" || itemName == undefined){
			itemName = item.text;
		}
		var masterId = item.value;
		var subInvId = "";
		var subInvName = "";
		var i="";
		var itemIdArray = [];
		if (categoryName == 'itemMaster') {
			getItemMasterDetailsById(itemMasterId);
		} else if (categoryName == 'closingStockModule') {
			getBatchDetailsForClosingStock(masterId);
		} else if (categoryName == "generateMRNRequest") {
			subInvId = document.getElementById("subInventoryIdInsideModal").value;
			subInvName = document.getElementById("subInventoryNameId").value;
			if (subInvId == "" || subInvName == "") {
				alertify
						.error("Please Search By SubInventory Name First...!!!");
				return false;
			}
			
			var subInvId = document.getElementById("subInventoryId").value;
			
			var table = document.getElementById("generateMRNRequestInfoTable");
			var itemSlaveRowCount = table.rows.length;
			var newRowCount = itemSlaveRowCount - 1;
			
			if(newRowCount > 1){
				for(i = 1 ; i<= newRowCount ;i++){
					var itemId = document.getElementById("itemMasterIdGeneMrnReqTable"+i).value;
					var tableSerialNoValue = document.getElementById("snum"+i).innerText;
					document.getElementById("hiddenSerialNoId").value = tableSerialNoValue;
					itemIdArray.push(itemId);	
				}
				var check = itemIdArray.includes(masterId);
				if(check == true){
					alert("This Item Is Already Present..!!!");
					return false;
				}
				else{
					getItemMasterSlaveDetailsModalOnMRNGenerate(masterId, subInvId);
				}
			}
			else{
				var tableSerialNoValue = document.getElementById("snum1").innerText;
				document.getElementById("hiddenSerialNoId").value = tableSerialNoValue;
				getItemMasterSlaveDetailsModalOnMRNGenerate(masterId, subInvId);
			}
			
		} else if (categoryName == "consumptionRequest") {

			subInvId = document.getElementById("subInventoryIdInsideModal").value;
			subInvName = document.getElementById("subInventoryNameId").value;
			if (subInvId == "" || subInvName == "") {
				alertify
						.error("Please Search By SubInventory Name First...!!!");
				return false;
			}
			var subInvIdConsumption = document.getElementById("subInventoryId").value;
			var mainTable = document.getElementById("consumptionRequestTable");
			var mainTableLength =  mainTable.rows.length;
			var currentTableLen = mainTableLength - 1;
			getCurrentSubStockBatchWiseForConsumption(masterId,
					subInvIdConsumption,currentTableLen);
		} else if (categoryName == "generateMRN") {

			var subInvId = document.getElementById("hiddenSubInvId").value;
			getItemMasterSlaveDetailsModalForMRN(masterId, subInvId);
		} else if (categoryName == "purchasequotation") {
			getItemMasterSlaveDetailsModalForPurchaseQuotation(masterId, 0);
		} else if (categoryName == "goodReceiptNote") {
			$("#grnItemId").val(masterId);
			getItemMasterSlaveGRNDetails(masterId);
		} else if (categoryName == "purchaseInvoice") {
			$("#purInvItemId").val(masterId);
			getItemMasterSlavePurchaseInvoiceDetails(masterId);
		} else if (categoryName == "openingStockModule") {
			getItemMasterSlaveDetailsForOpeningStockById(masterId);
		} 
		else if(categoryName == "mrnReturnRequest"){
			subInvId = document.getElementById("subInventoryIdInsideModal").value;
			subInvName = document.getElementById("subInventoryNameId").value;
			if (subInvId == "" || subInvName == "") {
				alertify.error("Please Search By SubInventory Name First...!!!");
				return false;
			}
			var subInvIdMrnReturn = document.getElementById("subInventoryId").value;
			var mainTable = document.getElementById("mrnReturnRequestTable");
			var mainTableLength =  mainTable.rows.length;
			var currentTableLen = mainTableLength - 1;
			getCurrentSubStockBatchWiseForMrnReturn(masterId,subInvIdMrnReturn,currentTableLen);
		}else if (categoryName == "purchaseOrderModule") {
			//$("#grnItemId").val(masterId);
			getItemMasterSlaveDetailsOnPurchaseOrder(masterId);
		}
		else {
			getItemMasterSlaveDetailsModal(masterId);
		}
		$("#" + inputID).val(itemName);
	}
}

