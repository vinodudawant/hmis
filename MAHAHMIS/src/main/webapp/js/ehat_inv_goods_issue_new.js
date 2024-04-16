/********************************************************************************
 * @author Rohit Sandbhor
 * @since 14-05-2020
 * @comment Below js code to to generated MRN details on goods issue module by checking status as in process
 *******************************************************************************/
function getGeneratedMrnData() {
	$("#totalPendingQtyIdIssueMrn").val("");
	$("#finalTotalPendingQtyIdIssueMrn").val("");
	$("#searchByStoreNameId").val("");
	jQuery.ajax({
		async: true,
		type: "GET",
		url: "ehat/inventoryGoodsIssueNew/getGeneratedMRNID",
		error: function () {
			alert('error');
		},
		success: function (r) {
			setGetMrnDataToTable(r);
		}
	});
}

/**
 * @author Rohit Sandbhor
 * @since 14-05-2020
 * @comment to set mrn data to table
 * @param r
 */
function setGetMrnDataToTable(r) {
	
	var htm = "";
	var index = 1;
	for (var i = 0; i < r.lstmrnmaster.length; i++) {
		var mrnGeneratedDate = getDateTimeGoodsIssueNew(r.lstmrnmaster[i].createdDate);
		htm = htm +
			'<tr> ' +
			' <td class="col-md-1 center"><input type="radio" name="mrnNumber" id="rowId' + index + '" value="' + r.lstmrnmaster[i].mrnId + '" autofocus="autofocus"></td>' +
			' <td class="col-md-1 center">' +
			index +
			'</td>' +
			' <td class="col-md-1 center">' +
			mrnGeneratedDate +
			'</td>' +
			' <td class="col-md-1 center">' +
			r.lstmrnmaster[i].mrnId +
			'</td>' +
			' <td class="col-md-1 center">' +
			r.lstmrnmaster[i].mrnSubinventoryName +
			'</td>'+
			' <td class="col-md-1 center"><span class="label label-warning">'+r.lstmrnmaster[i].mrnStatus+'</span></td>' 
			+'</tr>';
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
			numberOfRows +="<li onclick='paginationGoodsIssueModal("+indexNew+");'><a>"+indexNew+"</a></li>";
			indexNew=indexNew+1;
		}
		if(numberOfPages>6){
			numberOfRows +="<li class='next' onclick='nextPaginationGoodsIssueModal("+indexNew+","+Math.round(numberOfPages)+","+index+");'><a class='page-link' href='#'>Next</a></li>";
		}
		$('#totalNumberOfPagesModalGoodsIssue').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
		$('#goodsIssueMrnRecordModalPagination').html(numberOfRows);
		
	}
	$("#getMrnDataTableBodyId").html(htm);
}

/**
 * @author Rohit Sandbhor
 * @since 26-05-2020
 * @comment to get date time format on goods issue
 */
function getDateTimeGoodsIssueNew(date) {
	var datee;
	var formattedDate = new Date(date);
	var year = formattedDate.getFullYear();
	var mm = formattedDate.getMonth() + 1;
	var dd = formattedDate.getDate();
	var hours = formattedDate.getHours();
	var minute = formattedDate.getMinutes();
	var seconds = formattedDate.getSeconds();
	datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2) + " " + hours + ":" + ('0' + minute).slice(-2) + ":" + ('0' + seconds).slice(-2);
	//datee = year + "-" + ('0' + mm).slice(-2) + "-" + ('0' + dd).slice(-2);
	return datee;
}

/**
 * @author Rohit Sandbhor
 * @since 15-05-2020
 * @comment created below function to close get mrn data modal
 */
function closeGetMrnDataModal() {
	$("#getMRNData").modal("hide");
}

/**
 * @author Rohit Sandbhor
 * @since 15-05-2020 
 * @comment to get mrn details by mrn id
 * @returns {Boolean}
 */
function getMRNDetailsByMrnId() {
	var mrnId = $("input[name='mrnNumber']:checked").val();
	if (mrnId != "" && mrnId != null && mrnId != "undefined") {
		var inputs = [];
		inputs.push('mrnId=' + mrnId);
		var str = inputs.join('&');
		jQuery.ajax({
			async: true,
			type: "POST",
			data: str + "&reqType=AJAX",
			url: "ehat/inventoryGoodsIssueNew/getMRNDetailsByMrnId",
			timeout: 1000 * 60 * 5,
			catche: false,
			error: function () {
				alert("error");
			},
			success: function (r) {
				$("#generatedMRNId").val(r.mrnId);
				$("#mrnDate").val(r.mrnDate);
				$("#subInventoryNameId").val(r.mrnSubinventoryName);
				$("#subInventoryIdInsideModal").val(r.mrnSubinventoryId);
				$("#remark").val(r.mrnRemak);
				$("#mrnStatusId").val(r.mrnStatus);
				setMrnDetailsDataToTable(r);
			}

		});
	} else {
		alertify.error("please select Record");
	}
	return true;
}

/**
 * @author Rohit Sandbhor
 * @since 15-05-2020
 * @comment to set mrn details data to table
 * @param r
 */
function setMrnDetailsDataToTable(r) {
	var htm = "";
	var index = 1;
	var totalPendingQty = 0;
	for (var i = 0; i < r.lstMrniteminfo.length; i++) {
		totalPendingQty += r.lstMrniteminfo[i].pendingRequestItemQuantity;
		htm = htm +
			'<tr id="remove' + index + '" class="newAdded"> ' +
			
			' <td class="col-md-1 center"><span id="snum' + index + '">' + index + '</span></td>' +
			' <td class="col-md-1 center" style="display:none"><input type="text" id="itemSlaveId' + index + '"  class="form-control input-SmallText" value=' + r.lstMrniteminfo[i].itemInfoId + ' tabindex="-1"></td>' +
			' <td class="col-md-2 center"><input type="text" style="width:150px;" id="txtItemNameId' + index + '" readonly="true" class="form-control input-SmallText" value=\"' + r.lstMrniteminfo[i].itemName + '\" tabindex="-1"></td>' +
			' <td class="col-md-1 center"><select style="width:120px;" id="txtUom' + index + '" class="form-control input-SmallText"></select></td>'
			if(r.lstMrniteminfo[i].pendingRequestItemQuantity == 0){
				htm = htm + ' <td class="col-md-1 center"><input data-toggle="modal" value="Batch Details" data-target="#batchWiseGoodsIssueModal" disabled="true" onclick=getGoodsIssueItemBatchDetails(' + index + ',' + r.mrnId + ',' + r.lstMrniteminfo[i].itemMasterId + ') type="button" id="getBatchDetailsId' + index + '" class="btn btn-xs btn-success editUserAccess"></td>'
			}
			else if(r.lstMrniteminfo[i].pendingRequestItemQuantity != 0){
				htm = htm + ' <td class="col-md-1 center"><input data-toggle="modal" value="Batch Details" data-target="#batchWiseGoodsIssueModal" onclick=getGoodsIssueItemBatchDetails(' + index + ',' + r.mrnId + ',' + r.lstMrniteminfo[i].itemMasterId + ') type="button" id="getBatchDetailsId' + index + '" class="btn btn-xs btn-success editUserAccess"></td>'
			}
			htm = htm +' <td class="col-md-1 center" ><input type="text" id="requestedItemQuantity' + index + '" readonly="true" class="form-control input-SmallText" value=' + r.lstMrniteminfo[i].requestedItemQuantity + ' tabindex="-1"></td>' +
			' <td class="col-md-1 center" style="display:none"><input type="text" id="mrnIdGoodsIssue' + index + '"  class="form-control input-SmallText" value=' + r.mrnId + ' tabindex="-1"></td>'
			if(r.lstMrniteminfo[i].pendingRequestItemQuantity == 0 && r.lstMrniteminfo[i].requestedItemQuantity == r.lstMrniteminfo[i].itemCanceledQty){
				htm = htm + ' <td class="col-md-1 center" ><input type="text" id="issuedQuantity' + index + '" class="form-control input-SmallText" value="0" tabindex="-1" readonly></td>'
			}else if(r.lstMrniteminfo[i].pendingRequestItemQuantity == 0){
				htm = htm + ' <td class="col-md-1 center" ><input type="text" id="issuedQuantity' + index + '" class="form-control input-SmallText" value='+ r.lstMrniteminfo[i].requestedItemQuantity +' tabindex="-1" readonly></td>'
			}
			else if(r.lstMrniteminfo[i].pendingRequestItemQuantity != 0){
				htm = htm + ' <td class="col-md-1 center" ><input type="text" id="issuedQuantity' + index + '" class="form-control input-SmallText" value="" tabindex="-1" readonly></td>'
			}
			if(r.lstMrniteminfo[i].pendingRequestItemQuantity == 0 && r.lstMrniteminfo[i].requestedItemQuantity == r.lstMrniteminfo[i].itemCanceledQty){
				htm = htm + ' <td class="col-md-1 center" ><input type="text" id="canceledQuantity' + index + '" class="form-control input-SmallText" value='+r.lstMrniteminfo[i].itemCanceledQty+' tabindex="-1" readonly></td>'
			}else{
				htm = htm + ' <td class="col-md-1 center" ><input type="text" id="canceledQuantity' + index + '" class="form-control input-SmallText" value="0" tabindex="-1" readonly></td>'
			}
			htm = htm + '<td class="col-md-1 center" ><input type="text" id="pendingReqItemQuantity' + index + '" readonly="true" class="form-control input-SmallText" value=' + r.lstMrniteminfo[i].pendingRequestItemQuantity + ' tabindex="-1"></td>' +
			' <td class="col-md-1 center" style="display:none"><input type="text" id="itemMasterIdGoodsIssue' + index + '"  class="form-control input-SmallText" value=' + r.lstMrniteminfo[i].itemMasterId + ' tabindex="-1"></td>'
			if(r.lstMrniteminfo[i].pendingRequestItemQuantity == 0){
				htm = htm + ' <td class="col-md-1 center" ><input type="text" style="width:80px;" id="itemBatchCodeId' + index + '" readonly="true" class="form-control input-SmallText" value="0" tabindex="-1"></td>'
			}
			else if(r.lstMrniteminfo[i].pendingRequestItemQuantity != 0){
				htm = htm + ' <td class="col-md-1 center" ><input type="text" style="width:80px;" id="itemBatchCodeId' + index + '" readonly="true" class="form-control input-SmallText" value="0" tabindex="-1"></td>'
			}
			if(r.lstMrniteminfo[i].pendingRequestItemQuantity == 0){
				htm = htm + ' <td class="col-md-2 center" ><input type="text" style="width:80px;" id="itemBatchExpDate' + index + '" readonly="true" class="form-control input-SmallText" value="NA" tabindex="-1"></td>'
			}
			else if(r.lstMrniteminfo[i].pendingRequestItemQuantity != 0){
				htm = htm + ' <td class="col-md-2 center" ><input type="text" style="width:80px;" id="itemBatchExpDate' + index + '" readonly="true" class="form-control input-SmallText" value="" tabindex="-1"></td>'
			}
			/*if(r.lstMrniteminfo[i].pendingRequestItemQuantity == 0){
				htm = htm + ' <td class="col-md-2 center" ><input type="text" id="currentSubInvStock' + index + '" readonly="true" class="form-control input-SmallText" value="0" tabindex="-1"></td>'
			}
			else if(r.lstMrniteminfo[i].pendingRequestItemQuantity != 0){ //+ r.lstMrniteminfo[i].currentSubInventoryStock +
				htm = htm + ' <td class="col-md-2 center" ><input type="text" id="currentSubInvStock' + index + '" readonly="true" class="form-control input-SmallText" value="0" tabindex="-1"></td>'
			}*/
			if(r.lstMrniteminfo[i].pendingRequestItemQuantity == 0){
				htm = htm + ' <td class="col-md-2 center" ><input type="text" id="currentInvStock' + index + '" readonly="true" class="form-control input-SmallText" value="0" tabindex="-1"></td>'
			}
			else if(r.lstMrniteminfo[i].pendingRequestItemQuantity != 0){
				htm = htm + ' <td class="col-md-2 center" ><input type="text" id="currentInvStock' + index + '" readonly="true" class="form-control input-SmallText" value="" tabindex="-1"></td>'
			}
			htm = htm + ' <td class="col-md-3 center" ><textarea  disabled style="width: 182px; height: 46px;" id="subRemarkMrnGoodsIssue' + index + '">' + r.lstMrniteminfo[i].mrnSubRemark + '</textarea></td>' +
			' <td class="col-md-3 center" ><textarea  style="width: 182px; height: 46px;" id="subRemarkGoodsIssue' + index + '" /></td>' +
			' <td class="col-md-2 center" ><input type="button"  id="button' + index + '" value="ADD" class="btn btn-xs btn-success editUserAccess" onclick="addExtraRowGoodsIssue(' + index + ')" disabled=""></td>'
			if(r.lstMrniteminfo[i].pendingRequestItemQuantity == 0){
				htm = htm + ' <td class="col-md-1 center" ><input type="checkbox" checked class="chkGoodsIssueItem" id="deleteGroup'+index+'" value="' + index + '" name="deleteGroup"></td>'	
			}else{
				htm = htm + ' <td class="col-md-1 center" ><input type="checkbox" class="chkGoodsIssueItem" id="deleteGroup'+index+'" value="' + index + '" name="deleteGroup"></td>'
			}
			
			//added subinventory stock from mrn item slave to differentitate or choose to select all batches from batch stock or from goods issue slave with updated subinventory stock
			htm = htm + ' <td class="col-md-1 center" style="display:none"><input type="text" id="updatedByStatusMrnItemSlave' + index + '"  class="form-control input-SmallText" value=' + r.lstMrniteminfo[i].updatedBy + ' tabindex="-1"></td>'+
			' <td class="col-md-1 center" style="display: none"><input type="checkbox" checked class="checkForPartiallyReceived" id="deleteGroupPartiallyReceived'+index+'" value="' + index + '" name="deleteGroup"></td>'+
			' <td class="col-md-1 center" style="display: none"><input type="text" id="batchMasterId'+index+'"></td>'+
			'</tr>';
		index++;
		$("#finalTotalPendingQtyIdIssueMrn").val(totalPendingQty);
		$("#generateGoodsIssueTableBodyId").html(htm);
		$("#RowCount").val(index);
		$('#getMRNData').modal('hide');
		//}
		//else{}
	}
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async: false,
		type: "POST",
		data: str + "&reqType=AJAX",
		url: "ehat/inventoryM/getAllUnitMaster",
		error: function () {
			alert('error');
		},
		success: function (res) {
			var htm = "<option value='0'>--Select--</option>";
			for (var i = 0; i < res.lstunitmaster.length; i++) {
				htm = htm + "<option value='" + res.lstunitmaster[i].uniId + "'>" + res.lstunitmaster[i].unitName + "</option>";
			}
			for (var i = 1; i <= r.lstMrniteminfo.length; i++) {
				$("#txtUom" + i).html(htm);
				$("#txtUom" + i).select();
				$('#txtUom' + i).val(r.lstMrniteminfo[i - 1].itemUom);
			}
		}
	});
}

/**
 * @author Rohit Sandbhor
 * @since 15-05-2020
 * @comment to get goods issue item batch details w.r.t mrn master id and item master id
 * @param index
 * @param mrnMasterId
 * @param itemMasterId
 */
function getGoodsIssueItemBatchDetails(index, mrnMasterId, itemMasterId) {
	$("#issueQuantityGoodsIssue").val("");
	$("#canceledQuantityGoodsIssue").val("0");
	$("#canceledQuantityGoodsIssue").attr('disabled', false);
	var pendingQuantity = $("#pendingReqItemQuantity" + index).val();
	var requestedQuantity = $("#requestedItemQuantity" + index).val();
	var subInventoryId = $("#subInventoryIdInsideModal").val();
	//var currentSubInvStockFromMrnSlave = $("#currentSubInvStockFromMrnSlave" + index).val();
	$("#pendingQuantityGoodsIssue").val(pendingQuantity);
	$("#requestedQuantityGoodsIssue").val(requestedQuantity);
	var inputs = [];
	inputs.push('itemMasterId=' + itemMasterId);
	inputs.push('mrnMasterId=' + mrnMasterId);
	inputs.push('subInventoryId=' + subInventoryId);
	//inputs.push('currentSubInvStockFromMrnSlave=' + currentSubInvStockFromMrnSlave);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async: true,
		type: 'POST',
		data: str + "&reqType=AJAX",
		url: 'ehat/inventoryGoodsIssueNew/getGoodsIssueItemBatchDetails',
		timeout: 1000 * 60 * 5,
		catche: false,
		success: function (r) {
			
			if(r.lstBatchStockDto.length == 0){
				$('#batchWiseGoodsIssueModal').modal('hide');
				alert("No Stock And Batch Available For This Item..!!!");
				return false;
			}
			else{
			for (var i = 1; i <= r.lstBatchStockDto.length; i++) {
				if (i == 1) {
					$("#batchWiseGoodsIssueTbody")
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
							"class='form-control input-SmallText' readonly='true' id='itemNameId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							"<td style='display:none'><input type='text'" +
							"class='form-control input-SmallText' readonly='true' value=" + itemMasterId + "  id='itemId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							
							"<td style='display:none'><input type='text'" +
							"class='form-control input-SmallText' readonly='true'  id='batchMasterGoodsIssueId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							
							
							"<td><input type='text'" +
							"class='form-control input-SmallText' readonly='true' id='itemBatchCodeGoodsIssueId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							"<td><input type='text'" +
							"class='form-control input-SmallText' readonly='true' id='itemExpDateGoodsIssueId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							/*"<td><input type='text'" +
							"class='form-control input-SmallText' readonly='true' id='currentSubInvStockGoodsIssueId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +*/
							"<td><input type='text'" +
							"class='form-control input-SmallText' readonly='true' id='mainInvStockGoodsIssueId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							"</tr>");
				} else {
					$("#batchWiseGoodsIssueTbody")
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
							"class='form-control input-SmallText' readonly='true' id='itemNameId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							"<td style='display:none'><input type='text'" +
							"class='form-control input-SmallText' readonly='true' value=" + itemMasterId + "  id='itemId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							
							"<td style='display:none'><input type='text'" +
							"class='form-control input-SmallText' readonly='true' id='batchMasterGoodsIssueId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							
							"<td><input type='text'" +
							"class='form-control input-SmallText' readonly='true' id='itemBatchCodeGoodsIssueId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							"<td><input type='text'" +
							"class='form-control input-SmallText' readonly='true' id='itemExpDateGoodsIssueId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							/*"<td><input type='text'" +
							"class='form-control input-SmallText' readonly='true' id='currentSubInvStockGoodsIssueId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +*/
							"<td><input type='text'" +
							"class='form-control input-SmallText' readonly='true' id='mainInvStockGoodsIssueId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							"</tr>");

				}
				$("#itemId" + i).val(itemMasterId);
				$("#itemNameId" + i).val(r.lstBatchStockDto[i - 1].itemName);
				$("#itemBatchCodeGoodsIssueId" + i).val(r.lstBatchStockDto[i - 1].itemBatchCode);
				$("#batchMasterGoodsIssueId" + i).val(r.lstBatchStockDto[i - 1].batchMasterId);
				var expDateGoodsIssue = getDate(r.lstBatchStockDto[i - 1].itemBatchExpDate);
				if (expDateGoodsIssue == null || expDateGoodsIssue == '' || expDateGoodsIssue == "1970-01-01") {
					expDateGoodsIssue = "NA";
				}
				$("#itemExpDateGoodsIssueId" + i).val(expDateGoodsIssue);
				//if(currentSubInvStockFromMrnSlave > 0){
				//$("#currentSubInvStockGoodsIssueId" + i).val(r.lstBatchStockDto[i - 1].currentSubInventoryStockBatchStock);
				//}else{
				//	$("#currentSubInvStockGoodsIssueId" + i).val(r.lstBatchStockDto[i - 1].currentSubInventoryStock);	
				//}
				$("#mainInvStockGoodsIssueId" + i).val(r.lstBatchStockDto[i - 1].itemQuantity);

			}

		}
		}

	});

}

/**
 * @author Rohit Sandbhor
 * @since 15-05-2020
 * @comment to set modal info to table on goods issue
 */
function setModalInfoToTableOnGoodsIssue() {
	var indexId = document.getElementById("indexId").value;
	var radioButtonIndex = $('input[name=rowBatch]:checked').val();
	if ($("#rowId"+radioButtonIndex).is(":checked")) {
		$("#button" + indexId).attr('disabled', false);
		var table = document.getElementById("generateGoodsIssueTableBodyId");
		var itemSlaveRowCount = table.rows.length;
		var totalRow = 0;
		$('#batchWiseGoodsIssueTbody input[type=radio]').each(function () {
			totalRow++;
		});
		var totalCheckboxes = $('input[name=rowBatch]:checked').val();
		setBatchDataValuesToGoodsIssue(totalCheckboxes, totalRow,
			indexId, itemSlaveRowCount);
		}
	else{
		alert("Select Radio Button As well..!!!");
	}

}

/**
 * @author Rohit Sandbhor
 * @since 15-05-2020 
 * @comment to set batch data values to goods issue slave table
 * @param totalCheckboxes
 * @param totalRow
 * @param radioButtonIndex
 */
function setBatchDataValuesToGoodsIssue(totalCheckboxes, totalRow,
	indexId, itemSlaveRowCount) {
	var totalPendingQty = 0;
	var finalTotalPendingQtyIdIssueMrn = $("#finalTotalPendingQtyIdIssueMrn").val();
	var finalTotalCanceledQtyIdIssueMrn = $("#finalTotalCanceledQtyIdIssueMrn").val();
	var issueQuantity = $("#issueQuantityGoodsIssue").val();
	var canceledQuantity = $("#canceledQuantityGoodsIssue").val();
	var pendingQuantity = $("#pendingQuantityGoodsIssue").val();
	var requestedQuantity = $("#requestedQuantityGoodsIssue").val();
	
	if(parseInt(issueQuantity) < 0 ){
		alert("Issue Qty Should Not Be Lesser Than 0 !!");
		return false;
	}
	if(parseInt(canceledQuantity) < 0 ){
		alert("Canceled Qty Should Not Be Lesser Than 0 !!");
		return false;
	}
	var itemBatchCodeArray = [];
	var i = "";
	$("#issueQuantityGoodsIssue").attr('disabled', false);
	if (issueQuantity == "" || issueQuantity == 'undefined') {
		alert("Enter Issue Quantity");
		return false;
	}
	if((parseInt(issueQuantity) + parseInt(canceledQuantity)) > parseInt(pendingQuantity) ){
		alert("Sum of Issue Qty And Canceled Qty Should Always Be Lesser Than Or Equal Than Pending Quantity!!!");
		return false;
	}
	if (parseInt(canceledQuantity) > parseInt(pendingQuantity)) {
		alert("Canceled Quantity Should Always Be Lesser Than Or Equal Than Pending Quantity!!!");
		return false;
	} 
	if (parseInt(issueQuantity) > parseInt(pendingQuantity)) {
		alert("Issue Quantity Should Always Be Lesser Than Or Equal Than Pending Quantity!!!");
		return false;
	} else {
		var updatedIssueQuantity = parseInt(pendingQuantity) - (parseInt(issueQuantity) + parseInt(canceledQuantity));
		$("#getBatchDetailsId" + indexId).attr('disabled', true);
		$("#deleteGroup" + indexId).attr('disabled', true);
		var rowsGenerateMRNItemSlave = $('#generateGoodsIssueInfoTable tbody tr.newAdded').length;
		var modal = $('#batchWiseGoodsIssueTableId tbody tr.newAdded').length;
		//remove equal to
		for (var i = 1; i <= rowsGenerateMRNItemSlave; i++) {
			for (var j = 1; j <= modal; j++) {
			if(rowsGenerateMRNItemSlave == 1){
				
			}
			else{
				var itemMasterIdUpdated = $('#itemMasterIdGoodsIssue' + i).val();
				var itemId = $('#itemId' + j).val();
				if(itemMasterIdUpdated == itemId){
				$("#pendingReqItemQuantity" + i).val(updatedIssueQuantity);
				}
			}
			}
		}
		
	}
	if (totalRow > 0 && indexId == 1) {
		totalPendingQty += (parseInt(issueQuantity) + parseInt(canceledQuantity));
		$("#pendingReqItemQuantity" + indexId).val(updatedIssueQuantity);
		$("#issuedQuantity" + indexId).val(issueQuantity);
		$('#currentInvStock' + indexId).val($('#mainInvStockGoodsIssueId' + totalCheckboxes).val());
		//$('#currentSubInvStock' + indexId).val($('#currentSubInvStockGoodsIssueId' + totalCheckboxes).val());
		$('#canceledQuantity' + indexId).val(parseInt(canceledQuantity));
		$('#itemBatchCodeId' + indexId).val($('#itemBatchCodeGoodsIssueId' + totalCheckboxes).val());
		$('#itemBatchExpDate' + indexId).val($('#itemExpDateGoodsIssueId' + totalCheckboxes).val());
		$("#totalPendingQtyIdIssueMrn").val(totalPendingQty);
		var finalPending = finalTotalPendingQtyIdIssueMrn - totalPendingQty;
		$("#finalTotalPendingQtyIdIssueMrn").val(finalPending);
		var finalCanceled = parseInt(finalTotalCanceledQtyIdIssueMrn) + parseInt(canceledQuantity);
		$("#finalTotalCanceledQtyIdIssueMrn").val(finalCanceled);
		$('#batchMasterId' + indexId).val($('#batchMasterGoodsIssueId' + totalCheckboxes).val());
		$('#batchWiseGoodsIssueModal').modal('hide');
	} else {
		for (i = 1; i <= itemSlaveRowCount; i++) {
			var itemBatchCode = document.getElementById("itemBatchCodeId" + i).value;
			var itemBatchExp = document.getElementById("itemBatchExpDate" + i).value;
			var batchAndExp = itemBatchCode.concat(itemBatchExp);
			var itemMasterId1 = document.getElementById("itemMasterIdGoodsIssue" + i).value;
			var batchAndExpAndItemId = batchAndExp.concat(itemMasterId1);
			itemBatchCodeArray.push(batchAndExpAndItemId);
		}
		var batchCodePopUp = $('#itemBatchCodeGoodsIssueId' + totalCheckboxes).val();
		var batchExpPopUp = $('#itemExpDateGoodsIssueId' + totalCheckboxes).val();
		var itemMasterId = $('#itemMasterIdGoodsIssue' + i).val();
		var finalValue = batchCodePopUp.concat(batchExpPopUp);
		var finalValue1 = finalValue.concat(itemMasterId);
		var check = itemBatchCodeArray.includes(finalValue1);
		if (check == true) {
			alert("This Batch Code Is Already Present..!!! Select Another Batch..");
			//document.getElementById("getBatchDetailsId"+indexId).disabled = false;
			return false;
		}
		totalPendingQty += (parseInt(issueQuantity) + parseInt(canceledQuantity));
		$("#pendingReqItemQuantity" + indexId).val(updatedIssueQuantity);
		$("#issuedQuantity" + indexId).val(issueQuantity);
		$('#currentInvStock' + indexId).val($('#mainInvStockGoodsIssueId' + totalCheckboxes).val());
		$('#canceledQuantity' + indexId).val(parseInt(canceledQuantity));
		$('#itemBatchCodeId' + indexId).val($('#itemBatchCodeGoodsIssueId' + totalCheckboxes).val());
		$('#itemBatchExpDate' + indexId).val($('#itemExpDateGoodsIssueId' + totalCheckboxes).val());
		$('#batchMasterId' + indexId).val($('#batchMasterGoodsIssueId' + totalCheckboxes).val());
		$("#totalPendingQtyIdIssueMrn").val(totalPendingQty);
		var finalPending = finalTotalPendingQtyIdIssueMrn - totalPendingQty;
		$("#finalTotalPendingQtyIdIssueMrn").val(finalPending);
		var finalCanceled = parseInt(finalTotalCanceledQtyIdIssueMrn) + parseInt(canceledQuantity);
		$("#finalTotalCanceledQtyIdIssueMrn").val(finalCanceled);
		$('#batchWiseGoodsIssueModal').modal('hide');
		

	}
	$('#deleteGroupPartiallyReceived'+indexId).prop('checked', false); // Unchecks it
}

/**
 * @author Vishnu Thorat
 * @since 30-07-2021
 * @comment to calculate sum issue qty and canceled qty should not greater than pending qty.
 */
function calculationCancelQty(){
	var issueQuantity = $("#issueQuantityGoodsIssue").val();
	if(parseInt(issueQuantity) < 0 ){
		alert("Issue Qty Should Not Be Lesser Than 0 !!");
		return false;
	}
	var canceledQuantity = $("#canceledQuantityGoodsIssue").val();
	if(parseInt(canceledQuantity) < 0 ){
		alert("Canceled Qty Should Not Be Lesser Than 0 !!");
		return false;
	}
	var pendingQuantity = $("#pendingQuantityGoodsIssue").val();
	if (parseInt(canceledQuantity) != "" && parseInt(canceledQuantity) == parseInt(pendingQuantity)) {
		$("#issueQuantityGoodsIssue").val(0);
		$("#issueQuantityGoodsIssue").attr('disabled', true);
	}
	if((parseInt(issueQuantity) + parseInt(canceledQuantity)) > parseInt(pendingQuantity) ){
		alert("Sum of Issue Qty And Canceled Qty Should Always Be Lesser Than Or Equal Than Pending Quantity!!!");
		return false;
	}
	if (parseInt(canceledQuantity) != "" && parseInt(canceledQuantity) < parseInt(pendingQuantity)) {
		$("#issueQuantityGoodsIssue").attr('disabled', false);
	}
}

function calculationIssueQty(){
	var issueQuantity = $("#issueQuantityGoodsIssue").val();
	if(parseInt(issueQuantity) < 0 ){
		alert("Issue Qty Should Not Be Lesser Than 0 !!");
		return false;
	}
	var canceledQuantity = $("#canceledQuantityGoodsIssue").val();
	if(parseInt(canceledQuantity) < 0 ){
		alert("Canceled Qty Should Not Be Lesser Than 0 !!");
		return false;
	}
	var pendingQuantity = $("#pendingQuantityGoodsIssue").val();
	if (parseInt(issueQuantity) != "" && parseInt(issueQuantity) == parseInt(pendingQuantity)) {
		$("#canceledQuantityGoodsIssue").val(0);
		$("#canceledQuantityGoodsIssue").attr('disabled', true);
	}
	if((parseInt(issueQuantity) + parseInt(canceledQuantity)) > parseInt(pendingQuantity) ){
		alert("Sum of Issue Qty And Canceled Qty Should Always Be Lesser Than Or Equal Than Pending Quantity!!!");
		return false;
	}
	if (parseInt(issueQuantity) != "" && parseInt(issueQuantity) < parseInt(pendingQuantity)) {
		$("#canceledQuantityGoodsIssue").attr('disabled', false);
	}
}
/**
 * @author Rohit Sandbhor
 * @since 26-05-2020
 * @comment to add extra row to goods issue slave table
 * @param rowNumber
 * @returns {Boolean}
 */
function addExtraRowGoodsIssue(rowNumber) {
	var divContent = "";
	var itemName = $("#txtItemNameId" + rowNumber).val();
	var uomUnit = $("#txtUom" + rowNumber).val();
	var itemMasterId = $("#itemMasterIdGoodsIssue" + rowNumber).val();
	var requiredQuantity = $("#requestedItemQuantity" + rowNumber).val();
	var pendingQuantity = $("#pendingReqItemQuantity" + rowNumber).val();
	var currentSubInvStock = $("#currentSubInvStock" + rowNumber).val();
	var updatedByStatusMrnItemSlave = $("#updatedByStatusMrnItemSlave" + rowNumber).val();
	var currentInvStock = $("#currentInvStock" + rowNumber).val();
	var mrnId = $("#mrnIdGoodsIssue" + rowNumber).val();
	var itemSlaveId = $("#itemSlaveId" + rowNumber).val();
	var subRemarkMrn = $("#subRemarkMrnGoodsIssue" + rowNumber).text();
	$("#button" + rowNumber).attr('disabled', true);
	if (pendingQuantity == 0) {
		alert("pending Quantity is 0");
		return false;
	}
	var updatedRowNumber = $("#RowCount").val();
	divContent = divContent +
		'<tr id="remove' + updatedRowNumber + '" class="newAdded"> ' +
		' <td class="col-md-1 center"><span id="snum' + updatedRowNumber + '">' + updatedRowNumber + '</span></td>' +
		' <td class="col-md-1 center" style="display:none"><input type="hidden" id="itemSlaveId' + updatedRowNumber + '"  class="form-control input-SmallText" value='+itemSlaveId+' tabindex="-1"></td>' +
		' <td class="col-md-2 center"><input type="text" id="txtItemNameId' + updatedRowNumber + '" readonly="true" class="form-control input-SmallText" value=\"' + itemName + '\" tabindex="-1"></td>' +
		' <td class="col-md-1 center"><select id="txtUom' + updatedRowNumber + '" class="form-control input-SmallText"></select></td>' +
		' <td class="col-md-1 center"><input data-toggle="modal" data-target="#batchWiseGoodsIssueModal" value="Batch Details" onclick=getGoodsIssueItemBatchDetails(' + updatedRowNumber + ',' + mrnId + ',' + itemMasterId + ') type="button" id="getBatchDetailsId' + updatedRowNumber + '" class="btn btn-xs btn-success editUserAccess"></td>' +
		' <td class="col-md-1 center" ><input type="text" id="requestedItemQuantity' + updatedRowNumber + '" readonly="true" class="form-control input-SmallText" value=' + requiredQuantity + ' tabindex="-1"></td>' +
		' <td class="col-md-1 center" style="display:none"><input type="text" id="mrnIdGoodsIssue' + updatedRowNumber + '"  class="form-control input-SmallText" value=' + mrnId + ' tabindex="-1"></td>' +
		' <td class="col-md-1 center" ><input type="text" id="issuedQuantity' + updatedRowNumber + '" class="form-control input-SmallText" value="" tabindex="-1" readonly></td>' +
		' <td class="col-md-1 center" ><input type="text" id="canceledQuantity' + updatedRowNumber + '" class="form-control input-SmallText" value="" tabindex="-1" readonly></td>' +
		' <td class="col-md-1 center" ><input type="text" id="pendingReqItemQuantity' + updatedRowNumber + '" readonly="true" class="form-control input-SmallText" value=' + pendingQuantity + ' tabindex="-1"></td>' +
		' <td class="col-md-1 center" style="display:none"><input type="text" id="itemMasterIdGoodsIssue' + updatedRowNumber + '"  class="form-control input-SmallText" value=' + itemMasterId + ' tabindex="-1"></td>' +
		' <td class="col-md-1 center" ><input type="text" id="itemBatchCodeId' + updatedRowNumber + '" readonly="true" class="form-control input-SmallText" value="" tabindex="-1"></td>' +
		' <td class="col-md-2 center" ><input type="text" id="itemBatchExpDate' + updatedRowNumber + '" readonly="true" class="form-control input-SmallText" value="" tabindex="-1"></td>' +
		/*' <td class="col-md-2 center" ><input type="text" id="currentSubInvStock' + updatedRowNumber + '" readonly="true" class="form-control input-SmallText" value="' + currentSubInvStock + '" tabindex="-1"></td>' +*/
		' <td class="col-md-2 center" ><input type="text" id="currentInvStock' + updatedRowNumber + '" readonly="true" class="form-control input-SmallText" value="' + currentInvStock + '" tabindex="-1"></td>' +
		' <td class="col-md-3 center" ><textarea  disabled style="width: 182px; height: 46px;" id="subRemarkMrnGoodsIssue' + updatedRowNumber + '">' + subRemarkMrn + '</textarea></td>' +
		' <td class="col-md-3 center" ><textarea  style="width: 182px; height: 46px;" id="subRemarkGoodsIssue' + updatedRowNumber + '" /></td>' +
		' <td class="col-md-2 center" ><input type="button" id="button' + updatedRowNumber + '" value="ADD" class="btn btn-xs btn-success editUserAccess" onclick="addExtraRowGoodsIssue(' + updatedRowNumber + ')" disabled=""></td>' +
		' <td class="col-md-1 center" ><input type="checkbox" class="chkGoodsIssueItem" id="deleteGroup'+updatedRowNumber+'" value="' + updatedRowNumber + '" name="deleteGroup"></td>' +
		//added subinventory stock from mrn item slave to differentitate or choose to select all batches from batch stock or from goods issue slave with updated subinventory stock
		' <td class="col-md-1 center" style="display:none"><input type="text" id="updatedByStatusMrnItemSlave' + updatedRowNumber + '"  class="form-control input-SmallText" value=' + updatedByStatusMrnItemSlave + ' tabindex="-1"></td>'+
		' <td class="col-md-1 center" style="display: none"><input type="checkbox" checked class="checkForPartiallyReceived" id="deleteGroupPartiallyReceived'+updatedRowNumber+'" value="' + updatedRowNumber + '" name="deleteGroup"></td>'+
		' <td class="col-md-1 center" style="display: none"><input type="text" id="batchMasterId'+updatedRowNumber+'"></td>'+
		'</tr>';
	$('#generateGoodsIssueTableBodyId').append(divContent);
	$("#RowCount").val((parseInt(updatedRowNumber) + 1));
	$("#button" + updatedRowNumber).attr('disabled', false);
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async: false,
		type: "POST",
		data: str + "&reqType=AJAX",
		url: "ehat/inventoryM/getAllUnitMaster",
		error: function () {
			alert('error');
		},
		success: function (res) {
			var htm = "<option value='0'>--Select--</option>";
			for (var i = 0; i < res.lstunitmaster.length; i++) {
				htm = htm + "<option value='" + res.lstunitmaster[i].uniId + "'>" + res.lstunitmaster[i].unitName + "</option>";
			}
			for (var i = 1; i <= 1; i++) {
				$("#txtUom" + updatedRowNumber).html(htm);
				$("#txtUom" + updatedRowNumber).select();
				$("#txtUom" + updatedRowNumber).val(uomUnit);
			}
		}
	});
}

/**
 * @author Rohit Sandbhor
 * @since 26-05-2020
 * @comment to close goods issue modal pop-up
 */
function onCloseGoodsIssueModal() {
	var tableHeaderRowCount = 1;
	var table = document.getElementById('generateGoodsIssueInfoTable');
	var rowCount = table.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
		table.deleteRow(tableHeaderRowCount);
	}
	$("#mrnDate").val("");
	$("#subInventoryNameId").val("");
	$("#mrnStatusId").val("OPEN");
	$("#subInventoryIdInsideModal").val(0);
	$("#totalPendingQtyIdIssueMrn").val(0);
	$("#finalTotalPendingQtyIdIssueMrn").val(0);
	$("#generatedMRNId").val(0);
	$("#goodsIssueId").val(0);
	$("#subInvId").val(0);
	$("#hiddenpartyMasterId").val(0);
	$("#RowCount").val(0);
	$("#totaltblsize").val(0);
	$('#generateGoodsIssue').modal('hide');
}

/************
 * @author : Rohit Sandbhor
 * @date : 19-05-2020
 * @codeFor	: Remove row temp for MRN
 ************/
function removeRowFromTableGoodsIssue(tableId, checkboxClass) {
	$('.' + checkboxClass + ':checkbox:checked').parents("tr").remove();
	check(tableId);
	checkCompSelect(tableId);
	checkCompSpan(tableId);
	checkComp(tableId);
	
}
/************
 * @author : Rohit Sandbhor
 * @date : 19-05-2020
 * @codeFor	: For reorder srno after delete
 ************/
function check(tableId) {
	obj = $('#' + tableId + ' tbody tr').find('span');
	$.each(obj, function (key, value) {
		id = value.id;
		$('#' + id).html(key + 1);
	});
}
/************
 * @author : Rohit Sandbhor
 * @date : 19-05-2020
 * @codeFor	: For reorder index ids of componant after delete
 ************/
function checkComp(tableId) {
	var trLength = $('#' + tableId).find("tr:first th").length;
	obj = $('#' + tableId + ' tbody tr td').find('input,span,select,textarea');
	console.log(obj);
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
	var updatedIdex = idIndex + 1;
	//var idIndexUpdated = idIndex - 1;
	var mrnId = document.getElementById("mrnIdGoodsIssue" + idIndex).value;
	var itemMasterId = document.getElementById("itemMasterIdGoodsIssue" + idIndex).value;
	document.getElementById("getBatchDetailsId" + idIndex).removeAttribute("onclick");
	document.getElementById("getBatchDetailsId" + idIndex).setAttribute('onclick', 'getGoodsIssueItemBatchDetails(' + idIndex + ',' + mrnId + ',' + itemMasterId + ')');

	var table = document.getElementById('generateGoodsIssueInfoTable');
	var rowCount = table.rows.length;
	$("#RowCount").val(rowCount);

}

/**
 * @author Rohit Sandbhor
 * @since 26-05-2020
 * @comment to reorder the index of select tag after removing the table row
 * @param tableId
 */
function checkCompSelect(tableId){
	var trLength = $('#' + tableId).find("tr:first th").length;
	obj = $('#' + tableId + ' tbody tr td').find('select');
	var inx = 1;
	var idIndex = 1;
	$.each(obj, function (key, value) {
		if (inx == idIndex) {
			console.log("mayaaaaa");
			inx = 1;
			
		}
		id = value.id;
		var idText = (value.id).replace(/[0-9]/g, '');
		var replaceById = idText + idIndex;
		$('#' + id).attr('id', replaceById);
		inx++;
		idIndex++;
	});
}

/**
 * @since 26-05-2020
 * @author Rohit Sandbhor
 * @comment to reorder index of span tag after removing the table row
 * @param tableId
 */
function checkCompSpan(tableId){
	var trLength = $('#' + tableId).find("tr:first th").length;
	obj = $('#' + tableId + ' tbody tr td').find('span');
	var inx = 1;
	var idIndex = 1;
	$.each(obj, function (key, value) {
		if (inx == idIndex) {
			console.log("mayaaaaa");
			inx = 1;
			
		}
		id = value.id;
		var idText = (value.id).replace(/[0-9]/g, '');
		var replaceById = idText + idIndex;
		$('#' + id).attr('id', replaceById);
		inx++;
		idIndex++;
	});
}


/**
 * @author Rohit Sandbhor
 * @since 15-05-2020
 * @comment created below function to close goods issue batch modal
 */
function closeGoodsIssueBatchModal() {
	$("#batchWiseGoodsIssueModal").modal("hide");
}

/**
 * @author Rohit Sandbhor
 * @since 26-05-2020
 * @comment to save goods issue master and slave
 */
function saveGoodsIssue() {
	var mrnDate = $("#mrnDate").val();
	var mrnId = $("#generatedMRNId").val();
	var subInventoryName = $("#subInventoryNameId").val();
	var subInventoryId = $("#subInventoryIdInsideModal").val();
	var remark = $("#remark").val();
	var mrnStatus = $("#mrnStatusId").val();
	var mrnStatusMaster = $("#mrnStatusId").val();
	var userId = $('#userId').val();
	var userName = $("#userNameId").val();
	var unitId = $("#unitId").val();
	var id = $("#goodsIssueId").val();
	var finalTotalPendingQtyIdIssueMrn= $("#finalTotalPendingQtyIdIssueMrn").val();
	if(finalTotalPendingQtyIdIssueMrn > 0){
		mrnStatusMaster = "PartiallyReceived";
	}else{
		mrnStatusMaster = "Dispatched";
	}
	if (mrnId == "" || mrnId == null || mrnId == undefined) {
		alert('please select atleast one issue id');
		return false;
	}

	if (subInventoryName == "" || subInventoryName == null || subInventoryName == undefined) {
		alert('please select sub inventory name');
		return false;
	}
	if (mrnDate == "" || mrnDate == null || mrnDate == undefined) {
		alert('please select mrn date');
		return false;
	}
	var goodsIssueMrnItemSlaveDetails = {
		goodsIssueMrnItemSlaveDtos: []
	};
	var rowsGenerateMRNItemSlave = $('#generateGoodsIssueInfoTable tbody tr.newAdded').length;
	if(rowsGenerateMRNItemSlave == 0){
		alert("Alteast one row should be present to save the goods issue form..!!!");
		return false;	
	}
	
	//remove equal to
	for (var i = 1; i <= rowsGenerateMRNItemSlave; i++) {
		var itemSlaveId = $("#itemSlaveId" + i).val();
		var itemMasterId = $("#itemMasterIdGoodsIssue" + i).val();
		var itemName = $("#txtItemNameId" + i).val();
		var mrnQuantity = $("#requestedItemQuantity" + i).val();
		var uomUnit = $("#txtUom" + i).val();
		var currentSubInvStock = 0;
		var currentInvStock = $("#currentInvStock" + i).val();
		var issueQuantity = $("#issuedQuantity" + i).val();
		var canceledQuantity = $("#canceledQuantity" + i).val();
		
		var pendingRequestItemQuantity = $("#pendingReqItemQuantity" + i).val();
		var updatedByStatusMrnItemSlave = $("#updatedByStatusMrnItemSlave" + i).val();
		var batchMasterId = $("#batchMasterId" + i).val();
		var mrnIdGoodsIssueSlave = mrnId;
		//added by Rohit on 10-11-2020
		//this if condition is added for to remove rows from goods issue item slave whoes pending qty is '0' while saving the goodsissue
		//to avoid the duplication records into the goods issue slave
		if(pendingRequestItemQuantity == 0 && updatedByStatusMrnItemSlave == 1){
			removeRowFromTableGoodsIssue('generateGoodsIssueInfoTable','chkGoodsIssueItem');
			saveGoodsIssue();
			return false;
		}
		var subRemarkGoodsIssue = $("#subRemarkGoodsIssue" + i).val();
		var itemBatchCode = $("#itemBatchCodeId" + i).val();
		var itemBatchExpDate = $("#itemBatchExpDate" + i).val();
		if (itemBatchExpDate == "NA") {
			itemBatchExpDate = null;
		}
		if((issueQuantity == "") && rowsGenerateMRNItemSlave == 1){
			alert("Please Enter Issue Quantity First");
			return false;
		}
		//added by Rohit on 10-11-2020
		//to delele the unwanted row from goods issue slave whose issue qty user don't want to insert of peticular item
		if($("#deleteGroupPartiallyReceived"+i).is(":checked")){
			removeRowFromTableGoodsIssue('generateGoodsIssueInfoTable','checkForPartiallyReceived');
			saveGoodsIssue();
			return false;
		}
		
		var subInventoryNameSlave = subInventoryName;
		var subInventoryIdSlave = subInventoryId;
		if (finalTotalPendingQtyIdIssueMrn > 0) {
			mrnStatus = $("#mrnStatusId").val();
		} else {
			$("#mrnStatusId").val("Dispatched");
			mrnStatus = $("#mrnStatusId").val();
		}
		var requestedItemQuantity = $("#requestedItemQuantity" + i).val();
		setGoodsIssueItemSlave(goodsIssueMrnItemSlaveDetails, itemSlaveId, itemMasterId, itemName,
			uomUnit,
			currentSubInvStock,currentInvStock,issueQuantity,canceledQuantity,pendingRequestItemQuantity,
			requestedItemQuantity,mrnQuantity,subInventoryNameSlave,subInventoryIdSlave,mrnStatus,itemBatchCode,itemBatchExpDate,subRemarkGoodsIssue,mrnIdGoodsIssueSlave,batchMasterId);
	}
	goodsIssueMrnItemSlaveDetails = JSON.stringify(goodsIssueMrnItemSlaveDetails);
	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('mrnId=' + mrnId);
	inputs.push('mrnDate=' + mrnDate);
	inputs.push('mrnSubinventoryName=' + subInventoryName);
	inputs.push('mrnSubinventoryId=' + subInventoryId);
	inputs.push('mrnRemak=' + remark);
	inputs.push('mrnStatus=' + mrnStatusMaster);
	inputs.push('goodsIssueMrnItemSlaveDetails=' + goodsIssueMrnItemSlaveDetails);

	inputs.push('userId=' + userId);
	inputs.push('userName=' + userName);
	inputs.push('createdBy=' + userId);
	inputs.push('updatedBy=' + userId);
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async: false,
		type: "POST",
		data: str + "&reqType=AJAX",
		url: "ehat/inventoryGoodsIssueNew/saveGoodsIssueMRNRequest",
		cache: false,
		success: function (r) {
			if (r == 1) {
				updateBatchStock();
				alertify.success("Goods Issue Generated Sucessfully");
				$("#hiddenIdForValidation").val('0');
				clearDataAfterGoodsIssueSave();
				setTimeout(function () {
					window.location.reload();
				}, 1000);

			} else if (r == 2) {
				updateBatchStock();
				alertify.success("Goods Issue Updated Sucessfully");
				$("#hiddenIdForValidation").val('0');
				clearDataAfterGoodsIssueSave();
				setTimeout(function () {
					window.location.reload();
				}, 1000);
			} else {
				//alertify.error("Oops Some Problem Ocured");
			}

		}
	});
}

/**
 * @author Rohit Sandbhor
 * @since 26-05-2020
 * @comment to set goods issue item slave details
 * @param generateMRNItemSlaveDetails
 * @param itemSlaveId
 * @param itemName
 * @param mrnQuantity
 * @param uomUnit
 * @param currentSubInvStock
 */
function setGoodsIssueItemSlave(goodsIssueMrnItemSlaveDetails, itemSlaveId, itemMasterId, itemName, uomUnit,
	currentSubInvStock,currentInvStock, issueQuantity,canceledQuantity, pendingRequestItemQuantity,
	requestedItemQuantity, mrnQuantity, subInventoryNameSlave, subInventoryIdSlave, mrnStatus, itemBatchCode, itemBatchExpDate, subRemarkGoodsIssue,mrnIdGoodsIssueSlave,batchMasterId) {

	goodsIssueMrnItemSlaveDetails.goodsIssueMrnItemSlaveDtos.push({
		mrnItemSlaveId: itemSlaveId,
		itemMasterId: (itemMasterId != 'undefined' && itemMasterId != null && itemMasterId != "") ? itemMasterId : 0,
		itemName: (itemName != 'undefined' && itemName != null && itemName != "") ? itemName : 'NA',
		itemUom: (uomUnit != 'undefined' && uomUnit != null && uomUnit != "") ? uomUnit : 'NA',
		itemIssueQty: (issueQuantity != 'undefined' && issueQuantity != null && issueQuantity != "") ? issueQuantity : 0,
		itemCanceledQty:(canceledQuantity != 'undefined' && canceledQuantity != null && canceledQuantity != "") ? canceledQuantity : 0,
		mrnQuantity: (mrnQuantity != 'undefined' && mrnQuantity != null && mrnQuantity != "") ? mrnQuantity : 0,
		currentSubInventoryStock: (currentSubInvStock != 'undefined' && currentSubInvStock != null && currentSubInvStock != "") ? currentSubInvStock : 0,
		currentInvStock: (currentInvStock != 'undefined' && currentInvStock != null && currentInvStock != "") ? currentInvStock : 0,
		pendingRequestItemQuantity: (pendingRequestItemQuantity != 'undefined' && pendingRequestItemQuantity != null && pendingRequestItemQuantity != "") ? pendingRequestItemQuantity : 0,
		requestedItemQuantity: (requestedItemQuantity != 'undefined' && requestedItemQuantity != null && requestedItemQuantity != "") ? requestedItemQuantity : 0,
		subinventoryName: (subInventoryNameSlave != 'undefined' && subInventoryNameSlave != null && subInventoryNameSlave != "") ? subInventoryNameSlave : 'NA',
		subInventoryId: (subInventoryIdSlave != 'undefined' && subInventoryIdSlave != null && subInventoryIdSlave != "") ? subInventoryIdSlave : 0,
		mrnStatus: (mrnStatus != 'undefined' && mrnStatus != null && mrnStatus != "") ? mrnStatus : 'NA',
		itemBatchCode: (itemBatchCode != 'undefined' && itemBatchCode != null && itemBatchCode != "") ? itemBatchCode : 'NA',
		itemBatchExpDate: (itemBatchExpDate != 'undefined' && itemBatchExpDate != null && itemBatchExpDate != "") ? itemBatchExpDate : 'NA',
		goodsIssueSubRemark: (subRemarkGoodsIssue != 'undefined' && subRemarkGoodsIssue != null && subRemarkGoodsIssue != "") ? subRemarkGoodsIssue : 'NA',
		mrnIdGoodsIssueSlave: (mrnIdGoodsIssueSlave != 'undefined' && mrnIdGoodsIssueSlave != null && mrnIdGoodsIssueSlave != "") ? mrnIdGoodsIssueSlave : 0,
		batchMasterId: (batchMasterId != 'undefined' && batchMasterId != null && batchMasterId != "") ? batchMasterId : 0
	});
}

/**
 * @author Rohit Sandbhor
 * @since 26-05-2020
 * @comment to update the batch stock details after saving goods issue leads
 */
function updateBatchStock() {
	var subInventoryId = $("#subInventoryIdInsideModal").val();
	var batchStockDetails = {
		lstBatchStockDto: []
	};
	var rowsGenerateMRNItemSlave = $('#generateGoodsIssueInfoTable tbody tr.newAdded').length;
	for (var i = 1; i <= rowsGenerateMRNItemSlave; i++) {
		var itemMasterId = $("#itemMasterIdGoodsIssue" + i).val();
		var itemName = $("#txtItemNameId" + i).val();
		var mrnQuantity = $("#pendingReqItemQuantity" + i).val();
		var issueQuantity = $("#issuedQuantity" + i).val();
		var itemBatchCode = $("#itemBatchCodeId" + i).val();
		var itemBatchExpDate = $("#itemBatchExpDate" + i).val();
		var currentSubInvStock = $("#currentSubInvStock" + i).val();
		var currentInvStock = $("#currentInvStock" + i).val();
		if(currentSubInvStock = ""){
			currentSubInvStock = 0;
		}
		if(currentInvStock = ""){
			currentInvStock = 0;
		}
		//itemBatchCode == "NA" ||
		if(itemBatchCode == ""){
			itemBatchCode = 0;
		}
		if (itemBatchExpDate == "NA" || itemBatchExpDate == "") {
			itemBatchExpDate = "1970-01-01";
		}
		var totalQuantity = mrnQuantity + issueQuantity;
		setBatchStockValues(batchStockDetails, itemMasterId, itemName,
			issueQuantity, totalQuantity, subInventoryId, itemBatchCode, itemBatchExpDate);
	}
	batchStockDetails = JSON.stringify(batchStockDetails);
	var inputs = [];
	inputs.push('batchStockDetails=' + batchStockDetails);

	var str = inputs.join('&');
	jQuery.ajax({
		async: false,
		type: "POST",
		data: str + "&reqType=AJAX",
		url: "ehat/subInventory/updateBatchStock",
		cache: false,
		success: function (r) {
			if(r == 0){
			 alertify.success("Main Inventory Stock Deducted Successfully..!!");
			}
			else{
			alertify.error("Some Technical Problem Occured..!!");	
			}

		}
	});

}

/**
 * @Author Rohit Sandbhor
 * @since 26-05-2020
 * @comment to set batch stock values
 * @param batchStockDetails
 * @param itemMasterId
 * @param itemName
 * @param issueQuantity
 * @param totalQuantity
 * @param subInventoryId
 * @param itemBatchCode
 * @param itemBatchExpDate
 */
function setBatchStockValues(batchStockDetails, itemMasterId, itemName,
	issueQuantity, totalQuantity, subInventoryId, itemBatchCode, itemBatchExpDate) {
	batchStockDetails.lstBatchStockDto.push({
		itemMasterId: itemMasterId,
		itemName: itemName,
		issueQuantity: issueQuantity,
		totalQuantity: totalQuantity,
		subInventoryId: subInventoryId,
		itemBatchCode: itemBatchCode,
		itemBatchExpDate: itemBatchExpDate
	});
}

/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 26-05-2020
 * @codeFor : to get all goods issue leads
 ******************************************************************************/
function getAllGoodIssue() {
	var unitId = $("#unitId").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryGoodsIssueNew/getAllGoodIssue",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setGoodIssueMasterTemplate(r);
			setTimeout(function() {
				userAccess();
			}, 100);
		}
	});
}
/*******************************************************************************
 * @author : Rohit Sandbhor
 * @since :  26-05-2020
 * @codeFor : to set goods issue master template
 ******************************************************************************/
function setGoodIssueMasterTemplate(response) {	
	var htm = "";
	var index = 1;			
	for ( var i = 0; i < response.lstGoodsIssueMrnMaster.length; i++) {
	var disDate=new Date(response.lstGoodsIssueMrnMaster[i].createdDate).toLocaleDateString('en-GB');
	htm = htm
			+ '<tr> '
			+ ' <td class="col-md-1 center">'
			+ index
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+ response.lstGoodsIssueMrnMaster[i].mrnId
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+ response.lstGoodsIssueMrnMaster[i].mrnDate
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+ disDate
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+ response.lstGoodsIssueMrnMaster[i].mrnSubinventoryName
			+ '</td>'
			
			+ ' <td class="col-md-1 center">'
			+ response.lstGoodsIssueMrnMaster[i].mrnStatus
			+ '</td>'							
			
			+ '</tr>';
	index++;
	var numberOfRows="";
	var indexNew=1;
	var count=response.noOfPages;
	var numberOfPages=(count/10);
	
	var displayPagination=numberOfPages;	
	if(numberOfPages > 5){
		numberOfRows +="<li class='disabled previous'><a class='page-link' href='#' tabindex='-1'>Previous</a></li>";
		displayPagination=5;
	}
	for(var j=0;j<displayPagination;j++){
		numberOfRows +="<li onclick='paginationGoodsIssueList("+indexNew+");'><a>"+indexNew+"</a></li>";
		indexNew=indexNew+1;
	}
	if(numberOfPages>6){
		numberOfRows +="<li class='next' onclick='nextPaginationGoodsIssueList("+indexNew+","+Math.round(numberOfPages)+");'><a class='page-link' href='#'>Next</a></li>";
	}
	$('#totalNumberOfPagesGoodsIssueList').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
	$('#goodsIssueListPagination').html(numberOfRows);
			
	} 
    $("#goodissueInfoList").html(htm);
}


/**
 * @author Rohit Sandbhor
 * @since 01-06-2020
 * @comment added this function to get auto suggestion on goods issue modal
 * @param inputID
 * @returns {Boolean}
 */
function getAutoSubInventoryNameOnGoodsIssueModal(inputID) {
	var resultData = [];
	var findingName = $("input#" + inputID).val();
	if(findingName == "" || findingName == null || findingName == "null" || findingName == undefined){
		alertify.error("Please enter search value");
		$("input#" + inputID).focus();
		return false;
	}
	var inputs = [];	
	inputs.push('subInventoryName=' + findingName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryM/autoFillSearchOnSubInventory",
		cache : false,		
		success : function(r) {
			if(r.lstSubInventoryMaster.length <= 0){
				alertify.error("You Cannot Gererate MRN Without Sub-Inventory Name");
				document.getElementById('generateMRNSearchId').value = "";
			}
			else{
			document.getElementById("generateMRNButtonId").style.display = "block";	
			var template = "";
			for ( var j = 0; j < r.lstSubInventoryMaster.length; j++){
				var id = r.lstSubInventoryMaster[j].id;
				var subInventoryName = r.lstSubInventoryMaster[j].subInventoryName;
				resultData.push({
					ID : id,
					Name : subInventoryName
				});
				template = template + '<li data-value="' + id
						+ '" class=""><a href="#">' + subInventoryName
						+ '</a></li>';
			}
			setTimeout(function() {
				$("div#goodIssueDiv .typeahead").html(template);
				$("div#goodIssueDiv .typeahead").show();
				
				$("input#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : getSubInventoryIdGoodsIssue,
					scrollBar : true
				});
				$("input#" + inputID).data('typeahead').source = resultData;
			}, 500);
		}
		}
	});
}

/**
 * @author Rohit Sandbhor
 * @since 01-06-2020
 * @comment
 * @param item
 */
function getSubInventoryIdGoodsIssue(item){
	document.getElementById("subInventoryId").value = item.value;
	$("#searchSubInventroyId").click();
}

/**
 * @since 13-01-2020
 * @comment created this functon to get all get generated MRN data for indent tab with current sub inv stock batch wise
 * @author Rohit Sandbhor
 * @param r 
 */
function searchAllGeneratedMRNRequestData(){
	var subInventoryId = $("#subInventoryId").val();
	var inputs = [];
	inputs.push('subInventoryId=' + subInventoryId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'POST',
		data : str + "&reqType=AJAX",
		url : 'ehat/inventoryGoodsIssueNew/searchAllGeneratedMRNRequestData',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setGeneratedMRNRequestData(r);
		}
	});
}
/**
 * @author Rohit sandbhor
 * @since 04-06-2020
 * @comment added this function to set generate mrn data to table of indent tab
 * @param r
 */
function setGeneratedMRNRequestData(r){
	var htm = "";
	var index = 1;
	for (var i = 0; i < r.lstmrnmaster.length; i++) {
		var mrnGeneratedDate = getDateTimeGoodsIssueNew(r.lstmrnmaster[i].createdDate);
		htm = htm +
			'<tr> ' +
			' <td class="col-md-1 center"><input type="radio" name="mrnNumber" id="rowId' + index + '" value="' + r.lstmrnmaster[i].mrnId + '" autofocus="autofocus"></td>' +
			' <td class="col-md-1 center">' +
			index +
			'</td>' +
			' <td class="col-md-1 center">' +
			mrnGeneratedDate +
			'</td>' +
			' <td class="col-md-1 center">' +
			r.lstmrnmaster[i].mrnId +
			'</td>' +
			' <td class="col-md-1 center">' +
			r.lstmrnmaster[i].mrnSubinventoryName +
			'</td>'+
			' <td class="col-md-1 center"><span class="label label-warning">'+r.lstmrnmaster[i].mrnStatus+'</span></td>' 
			+'</tr>';
		index++;
	}
	$("#getMrnDataTableBodyId").html(htm);
}

/**
 * @author Rohit Sandbhor
 * @since 03-06-2020
 * @comment Added this js function to get auto suggestion of sub inv name on goods issue search input field
 * @param inputID
 * @returns {Boolean}
 */
function setAutoSubInventoryNameForGoodIssue(inputID) {

	var resultData = [];
	var findingName = $("input#" + inputID).val();
	if (findingName == "" || findingName == null || findingName == "null"
			|| findingName == undefined) {
		alert("Please enter search value");
		$("input#" + inputID).focus();
		return false;
	}
	var inputs = [];
	inputs.push('subInventoryName=' + findingName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "ehat/inventoryM/autoFillSearchOnSubInventory",
				cache : false,
				success : function(r) {

					var template = "";
					for ( var j = 0; j < r.lstSubInventoryMaster.length; j++) {

						var arrValue = r.lstSubInventoryMaster[j].id + "-"
								+ r.lstSubInventoryMaster[j].subInventoryName;
						var id = r.lstSubInventoryMaster[j].id;
						var subInventoryName = r.lstSubInventoryMaster[j].subInventoryName;

						resultData.push({
							ID : id,
							Name : subInventoryName
						});
						template = template + '<li data-value="' + id
								+ '" class=""><a href="#">' + arrValue
								+ '</a></li>';
					}
					setTimeout(
							function() {
								$("div#goodIssueDiv .typeahead")
										.html(template);
								$("div#goodIssueDiv .typeahead")
										.show();

								$("input#" + inputID).typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displaySubInventorySearchResult,
									scrollBar : true
								});
								$("input#" + inputID).data('typeahead').source = resultData;
							}, 500);
				}
			});
	//below function to set the search value to search text feild and calling getPackingDetailsById function
	function displaySubInventorySearchResult(item) {
		var res = item.text.split('-');
		var subInventoryId = res[0];
		var subInventoryName = res[1];
		document.getElementById("subInvId").value = subInventoryId;
		$("#" + inputID).val(subInventoryName);
	}
}

/**
 * @since 03-06-2020
 * @comment created this function to get sub inv name wise goods issue details
 * @author Rohit Sandbhor
 * @param r 
 */
function getGoodIssueById() {
	var subInvId = $("#subInvId").val();
	if (subInvId == 0 || subInvId == "null" || subInvId == null) {
		alert("Please Select Sub Inventory Name");
		return false;
	}
	var inputs = [];
	inputs.push('subInvId=' + subInvId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : 'GET',
		data : str + "&reqType=AJAX",
		url : 'ehat/inventoryGoodsIssueNew/getGoodIssueById',
		timeout : 1000 * 60 * 5,
		catche : false,
		success : function(r) {
			setgoodIssueDataToTable(r);
		}
	});
}
/**
 * @since 03-06-2020
 * @comment to set the goods issue data to outer table
 * @author Rohit Sandbhor
 * @param r 
 */
function setgoodIssueDataToTable(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.lstGoodsIssueMrnMaster.length; i++) {
	if(r.lstGoodsIssueMrnMaster[i].mrnSubinventoryName ==null || r.lstGoodsIssueMrnMaster[i].mrnSubinventoryName =="null" || r.lstGoodsIssueMrnMaster[i].mrnSubinventoryName ==""){
		alert("Please Select SubInventory First");
		return false;
	}
	var createDate = getDate(r.lstGoodsIssueMrnMaster[i].createdDate);
	htm = htm
			+ '<tr> '
			+ ' <td class="col-md-1 center">'
			+ index
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+ r.lstGoodsIssueMrnMaster[i].mrnId
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+r.lstGoodsIssueMrnMaster[i].mrnDate
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+ createDate
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+ r.lstGoodsIssueMrnMaster[i].mrnSubinventoryName
			+ '</td>'
			+ ' <td class="col-md-1 center">'
			+ r.lstGoodsIssueMrnMaster[i].mrnStatus
			+ '</td>'
			+ '</tr>';
	index++;
	$("#goodissueInfoList").html(htm);
	}
};
/**
 * @since 03-06-2020
 * @comment added this to edit the generated MRN data for approval
 * @author Rohit Sandbhor
 * @param id
 */
function editGeneratedMRNDataForApproval(id) {
document.getElementById("plusMinusButtonDivIdIssueMrnTab").style.display = "none";
var totalIssueQty = 0;
var totalPendingQty = 0;
var inputs = [];
var htm = "";
inputs.push('id=' + id);
document.getElementById("goodsIssueMrnId").value = id;
var str = inputs.join('&');
jQuery.ajax({
	async : false,
	type : "GET",
	url : "ehat/inventoryGoodsIssueNew/editGeneratedMRNDataForAppoval",
	data : str + "&reqType=AJAX",
	error : function() {
		alert('Network Issue..!!');
	},
	success : function(r) {
		$("#mrnId").val(r.mrnId);
		$("#mrnDate").val(r.mrnDate);
		$("#subInventoryNameIdOnApproval").val(r.mrnSubinventoryName);
		$("#subInventoryIdInsideModalOnApproval").val(r.mrnSubinventoryId);
		$("#remark").val(r.mrnRemark);
		$("#mrnStatusReceivedId").val("In-Process");
		for ( var i = 1; i <= r.goodsIssueMrnItemSlaveDtos2.length; i++) {
			
			totalIssueQty += r.goodsIssueMrnItemSlaveDtos2[i-1].itemIssueQty;
			totalPendingQty += r.goodsIssueMrnItemSlaveDtos2[i-1].pendingRequestItemQuantity;
				var expDate  = r.goodsIssueMrnItemSlaveDtos[i-1].itemBatchExpDate;
				if(expDate == null || expDate =='' || expDate == "1970-01-01"){
					expDate = "NA";
				}
			htm = htm
			+
			"<tr id='multiTr"+i+"' class='newAdded'> "
					+ "<td class='col-md-1 center'><input type='checkbox' readonly class='chkMrnItem' id='checkbox"+i+"' value='"+i+"'></td>"
					+ "<td class='col-md-1 center'><span id='snum"+i+"'>"+i+"</span><input type='hidden' value="+r.goodsIssueMrnItemSlaveDtos2[i-1].itemMasterId+" id='itemMasterIdEditMrnGeneDataAppoval"+i+"'></td>"
					+ "<td class='col-md-1 center' style='display:none'><input type='hidden' value="+r.goodsIssueMrnItemSlaveDtos2[i-1].id+" id='goodsIssueSlaveId"+i+"'></td>"
					+ "<td class='col-md-1 center' style='display:none'><span id='snum"+i+"'>"+i+"</span><input type='hidden' value="+r.goodsIssueMrnItemSlaveDtos2[i-1].mrnItemSlaveId+" id='itemSlaveIdForApproval"+i+"'></td>"
					+ "<td class='col-md-6 center'><input type='text' style='width:180px;' readonly id='txtItemNameId"+i+"' class='form-control input-SmallText' onkeyup='fetchItemMasterDetails(this.id)' value='"+r.goodsIssueMrnItemSlaveDtos2[i-1].itemName+"'> </td>"
					+ "<td class='col-md-1 center'><input type='text' style='width:80px;' readonly id='itemBatchCodeId"+i+"' class='form-control input-SmallText' value=\'"+r.goodsIssueMrnItemSlaveDtos2[i-1].itemBatchCode+"\'> </td>"
					+ "<td class='col-md-2 center'><input type='text' style='width:80px;' readonly id='itemBatchExpId"+i+"' class='form-control input-SmallText' value="+expDate+"> </td>"
					+ "<td class='col-md-1 center'><input type='text' readonly id='txtMrnQtyReceived"+i+"' value="+r.goodsIssueMrnItemSlaveDtos2[i-1].requestedItemQuantity+" class='form-control input-SmallText'> </td>"
					/*+ "<td class='col-md-1 center'><select id='txtUomForApproval"+i+"' disabled class='form-control input-SmallText'></select> </td>"*/
					+ "<td class='col-md-1 center'><input type='text' style='width:80px;' readonly id='txtUomForApproval"+i+"' value="+r.goodsIssueMrnItemSlaveDtos2[i-1].uomUnitName+" class='form-control input-SmallText'> </td>"
					/*+ "<td class='col-md-1 center'><input type='text' readonly id='currentSubInvQtyId"+i+"' value="+r.goodsIssueMrnItemSlaveDtos2[i-1].currentSubInventoryStock+" class='form-control input-SmallText '> </td>"*/
					//added pending quantity for more clarification and maintain the mrn status under issued mrn tab
					+ "<td class='col-md-1 center'><input type='text' readonly id='pendingIssueQtyId"+i+"' value="+r.goodsIssueMrnItemSlaveDtos2[i-1].pendingRequestItemQuantity+" class='form-control input-SmallText '> </td>"
					+ "<td class='col-md-1 center'><input type='text' readonly id='itemIssueQtyId"+i+"' value="+r.goodsIssueMrnItemSlaveDtos2[i-1].itemIssueQty+" class='form-control input-SmallText '> </td>"
					+ "<td class='col-md-1 center'><input type='text' readonly id='txtMrnQtyReceived"+i+"' value="+r.goodsIssueMrnItemSlaveDtos2[i-1].itemCanceledQty+" class='form-control input-SmallText'> </td>"
					+ "<td class='col-md-3 center'><textarea  disabled style='width: 201px; height: 34px;' id='subRemarkFromGoodsIssue" + i + "'>"+r.goodsIssueMrnItemSlaveDtos[i-1].goodsIssueSubRemark+"</textarea></td>"
					//if(r.goodsIssueMrnItemSlaveDtos2[i-1].mrnStatus == 'In-Process' || r.goodsIssueMrnItemSlaveDtos2[i-1].mrnStatus == 'Dispatched' || r.goodsIssueMrnItemSlaveDtos2[i-1].mrnStatus == 'PartiallyReceived' || r.goodsIssueMrnItemSlaveDtos2[i-1].mrnStatus == 'PartiallyReceivedQty')
					if(r.goodsIssueMrnItemSlaveDtos2[i-1].updatedBy == 1)
					{
						htm = htm +"<td class='col-md-1 center'><input onclick='updateSubInventoryItemStockQuantity("+i+")' type='button' value='accept' id='accept"+i+"' class='btn btn-xs btn-success editUserAccess' disabled/></td>";
					}
					else{
						htm = htm +"<td class='col-md-1 center'><input onclick='updateSubInventoryItemStockQuantity("+i+")' type='button' value='accept' id='accept"+i+"' class='btn btn-xs btn-success editUserAccess'/></td>";
					}
					+ "</tr>";
		//}
	}
		$("#generateMRNRequestTableBodyIdForApproval").html(htm);
		$("#totalIssueQtyIdIssueMrn").val(totalIssueQty);
		$("#totalPendingQtyIdIssueMrn").val(totalPendingQty);
		/*var unitId = $("#unitId").val();
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
	        success : function(res){    
	        	 var htm="<option value='0'>--Select--</option>";
	        	    for ( var i = 0; i < res.lstunitmaster.length; i++){    
	        	        htm = htm + "<option value='"+res.lstunitmaster[i].uniId+"'>"+res.lstunitmaster[i].unitName+"</option>";
	        	    }
	        	    for ( var i = 1; i <= r.goodsIssueMrnItemSlaveDtos.length; i++) {
	        	    	  $("#txtUomForApproval"+i).html(htm);
	        	    	  $("#txtUomForApproval"+i).select2();
			        	  $('#txtUomForApproval' +i).select2('val',r.goodsIssueMrnItemSlaveDtos[i-1].itemUom);
	        	    }
	        	          
	        }
	    });*/
		
	}

});
};
/**
 * @author Rohit sandbhor
 * @since 04-06-2020
 * @comment added this function to get all generated mrn data to table of issue mrn tab
 */
function getAllGeneratedMRNRequestOnApprovedTab(){
var subInventoryName = $("#generateMRNSearchId").val();
var inputs = [];
inputs.push('mrnSubinventoryName=' + subInventoryName);
var str = inputs.join('&');
jQuery.ajax({
	async : true,
	type : 'POST',
	data : str + "&reqType=AJAX",
	url : 'ehat/inventoryGoodsIssueNew/getAllGoodsIssueMRNDataForAppoval',
	timeout : 1000 * 60 * 5,
	catche : false,
	success : function(r) {
		setGeneratedMRNDataToTable(r);
	}
});
}

/**
 * @author Rohit sandbhor
 * @since 04-06-2020
 * @comment added this function to set generate mrn data to table of issue mrn tab
 * @param r
 */
function setGeneratedMRNDataToTable(r) {
var htm = "";
var index = 1;
for ( var i = 0; i < r.lstGoodsIssueMrnMaster.length; i++) {
htm = htm
		+ '<tr> '
		+ ' <td class="col-md-1 center">'
		+ index
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstGoodsIssueMrnMaster[i].mrnId
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstGoodsIssueMrnMaster[i].mrnDate
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstGoodsIssueMrnMaster[i].userName
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstGoodsIssueMrnMaster[i].mrnSubinventoryName
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ r.lstGoodsIssueMrnMaster[i].mrnStatus
		+ '</td>'
		+ ' <td class="col-md-1 center">'
		+ '	<button class="btn btn-xs btn-success editUserAccess" data-toggle="modal" data-target="#generateMRNRequestModalAfterGoodsIssue"  onclick=editGeneratedMRNDataForApproval('
		+ r.lstGoodsIssueMrnMaster[i].id
		+ ')><i class="fa fa-edit"></i></button></td>'
		 + '</tr>';
index++;
	
var numberOfRows='';
var index1=1;
var count=r.noOfPages;
var numberOfPages=(count/10);
var displayPagination=numberOfPages;	
if(numberOfPages > 5){
	numberOfRows +='<li class="disabled previous"><a class="page-link" href="#" tabindex="-1">Previous</a></li>';
	displayPagination=5;
}
$("#subinvname").val(r.lstGoodsIssueMrnMaster[i].mrnSubinventoryName);
for(var j=0;j<displayPagination;j++){
	numberOfRows +='<li onclick=paginationGoodIssueMRN('+index1+');><a>'+index1+'</a></li>';
	index1=index1+1;
}
if(numberOfPages>6){
	numberOfRows +="<li class='next' onclick='nextPaginationGoodIssueMRN("+index1+","+Math.round(numberOfPages)+");'><a class='page-link' href='#'>Next</a></li>";
}
$('#totalNumberOfPagesGoodIssueMRN').html("<li><a>No. Of Pages:"+(Math.round(numberOfPages))+"</a></li>");
$('#goodIssueMRNRecordPagination').html(numberOfRows);
	
}
$("#mrnApprovedStatusDataTbodyId").html(htm);
};

function getGoodsIssueItemBatchDetailsWithoutSubinventoryId(index, mrnMasterId, itemMasterId){
	$("#issueQuantityGoodsIssue").val("");
	var pendingQuantity = $("#pendingReqItemQuantity" + index).val();
	var requestedQuantity = $("#requestedItemQuantity" + index).val();
	$("#pendingQuantityGoodsIssue").val(pendingQuantity);
	$("#requestedQuantityGoodsIssue").val(requestedQuantity);
	var inputs = [];
	inputs.push('itemMasterIdUpdated=' + itemMasterId);
	inputs.push('mrnMasterIdUpdated=' + mrnMasterId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async: true,
		type: 'POST',
		data: str + "&reqType=AJAX",
		url: 'ehat/inventoryGoodsIssueNew/getGoodsIssueItemBatchDetailsWithoutSubinventoryId',
		timeout: 1000 * 60 * 5,
		catche: false,
		success: function (r) {
			for (var i = 1; i <= r.lstBatchStockDto.length; i++) {
				if (i == 1) {
					$("#batchWiseGoodsIssueTbody")
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
							"class='form-control input-SmallText' readonly='true' id='itemNameId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							"<td style='display:none'><input type='text'" +
							"class='form-control input-SmallText' readonly='true' value=" + itemMasterId + "  id='itemId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							"<td><input type='text'" +
							"class='form-control input-SmallText' readonly='true' id='itemBatchCodeGoodsIssueId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							"<td><input type='text'" +
							"class='form-control input-SmallText' readonly='true' id='itemExpDateGoodsIssueId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							"<td><input type='text'" +
							"class='form-control input-SmallText' readonly='true' id='currentSubInvStockGoodsIssueId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							"<td><input type='text'" +
							"class='form-control input-SmallText' readonly='true' id='mainInvStockGoodsIssueId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							"</tr>");
				} else {
					$("#batchWiseGoodsIssueTbody")
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
							"class='form-control input-SmallText' readonly='true' id='itemNameId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							"<td style='display:none'><input type='text'" +
							"class='form-control input-SmallText' readonly='true' value=" + itemMasterId + "  id='itemId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							"<td><input type='text'" +
							"class='form-control input-SmallText' readonly='true' id='itemBatchCodeGoodsIssueId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							"<td><input type='text'" +
							"class='form-control input-SmallText' readonly='true' id='itemExpDateGoodsIssueId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							"<td><input type='text'" +
							"class='form-control input-SmallText' readonly='true' id='currentSubInvStockGoodsIssueId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							"<td><input type='text'" +
							"class='form-control input-SmallText' readonly='true' id='mainInvStockGoodsIssueId" +
							i +
							"'" +
							"tabindex='-1' /></td>" +
							"</tr>");

				}

				$("#itemId" + i).val(itemMasterId);
				$("#itemNameId" + i).val(r.lstBatchStockDto[i - 1].itemName);
				$("#itemBatchCodeGoodsIssueId" + i).val(r.lstBatchStockDto[i - 1].itemBatchCode);
				var expDateGoodsIssue = getDate(r.lstBatchStockDto[i - 1].itemBatchExpDate);
				if (expDateGoodsIssue == null || expDateGoodsIssue == '' || expDateGoodsIssue == "1970-01-01") {
					expDateGoodsIssue = "NA";
				}
				$("#itemExpDateGoodsIssueId" + i).val(expDateGoodsIssue);
				$("#currentSubInvStockGoodsIssueId" + i).val(r.lstBatchStockDto[i - 1].currentSubInventoryStock);
				$("#mainInvStockGoodsIssueId" + i).val(r.lstBatchStockDto[i - 1].itemQuantity);

			}

		}

	});
}


/**
 * @since 11-11-2020
 * @comment clear data and respective id's after saving the goods issue module
 * @author Rohit Sandbhor
 */
function clearDataAfterGoodsIssueSave() {
	$("#mrnStatusId").val("OPEN");
	$("#subInventoryIdInsideModal").val(0);
	$("#totalPendingQtyIdIssueMrn").val(0);
	$("#finalTotalPendingQtyIdIssueMrn").val(0);
	$("#generatedMRNId").val(0);
	$("#goodsIssueId").val(0);
	$("#subInvId").val(0);
	$("#hiddenpartyMasterId").val(0);
	$("#RowCount").val(0);
	$("#totaltblsize").val(0);
	var tableHeaderRowCount = 1;
	var table = document.getElementById('generateGoodsIssueInfoTable');
	var rowCount = table.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
	    table.deleteRow(tableHeaderRowCount);
	}
}
