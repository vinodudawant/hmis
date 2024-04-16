function selectWithoutMRN() {
	if ($('#withoutMRN').is(":checked") == true) {
		alert("please select store");
		$("#mrn_issue_store_pop_up").dialog({
			title : "Store Details",
			modal : true
		});
	}
}

function display() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "../../pharmacy/mrn/view.htm",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#content").html(r);
		}
	});
}

function fetchPendingMRNData() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "../../pharmacy/mrn/getPendingMRN",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			setAllPendingMrnData(r);
		}
	});
	return true;

}

function setAllPendingMrnData(r) {
	var divContent = "";
	divContent = divContent
			+ "<div style='float:right'><button onclick='setPendingMRNData()' class='btn btn-xs btn-info'>OK</button></div><table border=1 class='table table-striped table-bordered header-fixed cf '><thead><tr><th>MRN Number</th><th>MRN Generated Date</th><th>Vou No</th><th>Received From</th><th>Product Count</th><th>select</th></thead></tr><tbody>";

	if (r.length > 0) {
		for ( var i = 0; i < r.length; i++) {

			divContent = divContent + "<tr><td>" + r[i].mrnId + "</td><td>"
					+ getDate(r[i].mrnDate) + "</td> <td>" + r[i].mrnDocId
					+ "</td> <td>" + r[i].mrnStoreName + "</td> <td>"
					+ r[i].mrnProductCount + "</td>";
			if (i == 0) {
				divContent = divContent
						+ "<td><div>	<label><input type='radio' id='mrnNumber"
						+ r[i].mrnId + "' checked name='mrnNumber' value='"
						+ r[i].mrnId + "'></div></td></tr>";
			} else {
				divContent = divContent
						+ "<td><div>	<label><input type='radio' id='mrnNumber"
						+ r[i].mrnId + "' name='mrnNumber' value='"
						+ r[i].mrnId + "'></div></td></tr>";
			}

		}
	} else {
		divContent = divContent
				+ "<tbody><tr><td colspan=6><b>No Data Found</b></td></tr>";
	}

	divContent = divContent + "</tbody></table>";

	$("#indentPendingData").html(divContent);
}

function setPendingMRNData() {
	var mrnId = $("input[name='mrnNumber']:checked").val();

	if (mrnId != "" && mrnId != null) {
		var inputs = [];
		inputs.push('mrnId=' + mrnId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/mrn/getMRNDetailsByMrnId",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				setPendingTableContent(r);
			}

		});
	} else {
		alertify.error("please select Record");
	}

	return true;
}

function setPendingTableContent(result) {
	$("#txtMrnNo").val(result.mrnId);
	$("#txtRecFrom").val(result.mrnStoreName);
	$("#hiddenStoreId").val(result.mrnStoreId);
	$("#mrnGenerateDate").val(getDate(result.mrnDate));
	$("#mainStore").val(result.mrnMainStoreId);

	$("#txtPOId").val(result.mrnId);

	$("#poDiv").show("show");

	$('#mrn_pending_data').modal('hide');
	var r = result.mrnSlaves;

	totalRowCount = result.mrnSlaves.length;
	

	var divContent = "";
	var rowCount = 1;
	for ( var i = 0; i < r.length; i++) {
		
		divContent = divContent
				+ " <input "
				+ "type='hidden' id='hiddenCurrentRow' value='0' /> <tr id='remove"
				+ (rowCount)
				+ "'><td><label  class=' input-SmallText'>"
				+ (rowCount)
				+ "</label></td>"
				+ "<input type='hidden' id='hiddenProductId"
				+ (rowCount)
				+ "' name='ltPurSlave["
				+ (rowCount - 1)
				+ "].productMaster.productId' value='"
				+ r[i].productMaster.productId
				+ "' />"

				+ "<input type='hidden' id='textBatchId"
				+ (rowCount)
				+ "' name='ltPurSlave["
				+ (rowCount - 1)
				+ "].productMaster.batchMaster[0].batchId' />"

				+ "<td><input type='text' name='ltPurSlave["
				+ (rowCount - 1)
				+ "].productMaster.productName' autocomplete='off' id='textProductName"
				+ (rowCount)
				+ "' class='form-control input-SmallText' ' data-toggle='modal' data-target='#Product_Information' onclick='load("
				+ rowCount
				+ ")' value='"
				+ r[i].productMaster.productName
				+ "'/></td>"

				+ "<td style='display:none;'><input name='textAvlQty' type='text' class='form-control input-SmallText' id='textAvlQty"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td>"

				+ "<td><input type='text' name='ltPurSlave["
				+ (rowCount - 1)
				+ "].productMaster.productUnit' id='textUnit"
				+ (rowCount)
				+ "'  class='form-control input-SmallText' readonly='true' value='"
				+ r[i].productMaster.productUnit
				+ "'/>"

				+ "</td><td><input type='text' name='ltPurSlave["
				+ (rowCount - 1)
				+ "].productMaster.packType' id='textPack"
				+ (rowCount)
				+ "' readonly='true' class='form-control input-SmallText' value='"
				+ r[i].productMaster.packingMaster.packType
				+ "' /></td>"

				+ "<td><input name='ltPurSlave["
				+ (rowCount - 1)
				+ "].productMaster.compShortName' id='textCom"
				+ (rowCount)
				+ "' readonly='true' type='text' class='form-control input-SmallText' value='"
				+ r[i].productMaster.companyMaster.compName
				+ "'/></td>"

				+ "<td><input type='text' name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purSlaveQty' id=textQty"
				+ (rowCount)
				+ " class='form-control input-SmallText' readonly='true' value='"
				+ r[i].mrnSlaveQty
				+ "'/></td>"

				+ "<td><input type='text' name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purSlaveScheme' id=textIssueQty"
				+ (rowCount)
				+ " class='form-control input-SmallText' readonly='true'/></td>"

				+ "<td><input type='text' name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purSlaveScheme' id=textPendingQty"
				+ (rowCount)
				+ " class='form-control input-SmallText' readonly='true' value='"
				+ r[i].mrnSlaveQty
				+ "'/></td>"

				+ "<td><input name='ltPurSlave["
				+ (rowCount - 1)
				+ "].productMaster.batchMaster[0].batchCode' id=textBatch"
				+ (rowCount)
				+ "  type='text' class='form-control input-SmallText' readonly='true'/></td>"
				+ "<td><input name='ltPurSlave["
				+ (rowCount - 1)
				+ "].productMaster.batchMaster[0].batchExpDate' id=textExpiry"
				+ (rowCount)
				+ "  type='text' class='form-control input-SmallText' readonly='true'/></td>"
				+ "<td><input name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purDisc' id='textDisc"
				+ (rowCount)
				+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"
				+ "<td><input name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purVat' id='textVat"
				+ (rowCount)
				+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

				+ "<td><input name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purSlaveMrp' id='textMrp"
				+ (rowCount)
				+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

				+ "<td><input name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purslaverate' id='textRate"
				+ (rowCount)
				+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

				+ "<td style='display:none;'><input type='text' readonly='true' id='textRatePerUnit"
				+ (rowCount)
				+ "' class='form-control input-SmallText'></td>"

				+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
				+ (rowCount)
				+ "' readonly='true' ></td>"

				+ "<td style=display:none;><input type='text' name='mrnIssueSlaves["
				+ (rowCount - 1)
				+ "].mrnIssueSlaveMrnSlaveId' id=txtMrnIssueMRNSlaveId"
				+ (rowCount)
				+ " class='form-control input-SmallText' readonly='true' value='"
				+ r[i].mrnSlaveId
				+ "'/></td>"

				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textClStk"
				+ (rowCount)
				+ "' readonly='true' ></td>"

				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPurchaseRate"
				+ (i + 1) + "' readonly='true' ></td>"

				+ "<td><input type='text' id='textAmount" + (rowCount)
				+ "' class='form-control input-SmallText'  name='ltPurSlave["
				+ (rowCount - 1) + "].purSlaveAmt' "
				+ " readonly='true'/></td>"

				+ "<td><button type='button' id='button" + (rowCount)
				+ "' onclick='addNewBatchRow(" + (rowCount)
				+ ")' disabled>Add</button</td>"

				+ "<td><input type='checkbox' id='deleteGroup" + (rowCount)
				+ "' value=" + (rowCount) + " name='deleteGroup'></td>";
		rowCount++;
		$("#RowCount").val(i + 1);
	}

	$('#HSTDiv').html(divContent);
	$("#RowCount").val(totalRowCount + 1);
}

// addNewBatchRow By Suraj

function addNewBatchRow(rowNumber) {
	var divContent = "";
	var hiddentProductId = $("#hiddenProductId" + rowNumber).val();
	var productName = $("#textProductName" + rowNumber).val();
	var textUnit = $("#textUnit" + rowNumber).val();
	var textPack = $("#textPack" + rowNumber).val();
	var textComp = $("#textCom" + rowNumber).val();
	var txtMRNSlaveId = $("#txtMrnIssueMRNSlaveId" + rowNumber).val();
	var txtRequireQty = $("#textPendingQty" + rowNumber).val();
	var textPendingQty = $("#textPendingQty" + rowNumber).val();

	$("#button" + rowNumber).attr('disabled', true);

	$("#deleteGroup" + rowNumber).attr("disabled", "true");

	if (textPendingQty == 0) {
		alert("pending Quantity is 0");
		return false;
	}
	/**/
	var totalRow = $("#RowCount").val();
	divContent = divContent
			+ "<tr id='remove"
			+ (totalRow)
			+ "'><td><label  class=' input-SmallText'>"
			+ (totalRow)
			+ "</label></td>"
			+ "<input type='hidden' id='hiddenProductId"
			+ (totalRow)
			+ "' name='ltPurSlave["
			+ (totalRow - 1)
			+ "].productMaster.productId' value='"
			+ hiddentProductId
			+ "' /> "

			+ "<input type='hidden' id='textBatchId"
			+ (totalRow)
			+ "' name='ltPurSlave["
			+ (totalRow - 1)
			+ "].productMaster.batchMaster[0].batchId' />"

			+ "<td><input type='text' name='ltPurSlave["
			+ (totalRow - 1)
			+ "].productMaster.productName' autocomplete='off' id='textProductName"
			+ (totalRow)
			+ "' class='form-control input-SmallText' ' data-toggle='modal' data-target='#Product_Information' onclick='load("
			+ totalRow
			+ ")' value='"
			+ productName
			+ "'/></td>"

			+ "<td><input type='text' name='ltPurSlave["
			+ (totalRow - 1)
			+ "].productMaster.productUnit' id='textUnit"
			+ (totalRow)
			+ "'  class='form-control input-SmallText' readonly='true' value='"
			+ textUnit
			+ "'/>"

			+ "</td><td><input type='text' name='ltPurSlave["
			+ (totalRow - 1)
			+ "].productMaster.packType' id='textPack"
			+ (totalRow)
			+ "' readonly='true' class='form-control input-SmallText'  value='"
			+ textPack
			+ "'/></td>"

			+ "<td><input name='ltPurSlave["
			+ (totalRow - 1)
			+ "].productMaster.compShortName' id='textCom"
			+ (totalRow)
			+ "' readonly='true' type='text' class='form-control input-SmallText' value='"
			+ textComp
			+ "'/></td>"

			+ "<td><input type='text' name='ltPurSlave["
			+ (totalRow - 1)
			+ "].purSlaveQty' id=textQty"
			+ (totalRow)
			+ " class='form-control input-SmallText' readonly='true' value='"
			+ txtRequireQty
			+ "'/></td>"

			+ "<td><input type='text' name='ltPurSlave["
			+ (totalRow - 1)
			+ "].purSlaveScheme' id=textIssueQty"
			+ (totalRow)
			+ " class='form-control input-SmallText' readonly='true'/></td>"

			+ "<td><input type='text' name='ltPurSlave["
			+ (totalRow - 1)
			+ "].purSlaveScheme' id=textPendingQty"
			+ (totalRow)
			+ " class='form-control input-SmallText' readonly='true' value='"
			+ textPendingQty
			+ "'/></td>"

			+ "<td><input name='ltPurSlave["
			+ (totalRow - 1)
			+ "].productMaster.batchMaster[0].batchCode' id=textBatch"
			+ (totalRow)
			+ "  type='text' class='form-control input-SmallText' readonly='true'/></td>"
			+ "<td><input name='ltPurSlave["
			+ (totalRow - 1)
			+ "].productMaster.batchMaster[0].batchExpDate' id=textExpiry"
			+ (totalRow)
			+ "  type='text' class='form-control input-SmallText' readonly='true'/></td>"
			+ "<td><input name='ltPurSlave["
			+ (totalRow - 1)
			+ "].purDisc' id='textDisc"
			+ (totalRow)
			+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"
			+ "<td><input name='ltPurSlave["
			+ (totalRow - 1)
			+ "].purVat' id='textVat"
			+ (totalRow)
			+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"
			/*
			 * + "<td><input name='' id='textPrft" + (totalRow) + "'
			 * type='text' class='form-control input-SmallText'
			 * readonly='true'/></td>"
			 */

			+ "<td><input name='ltPurSlave["
			+ (totalRow - 1)
			+ "].purSlaveMrp' id='textMrp"
			+ (totalRow)
			+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

			+ "<td><input name='ltPurSlave["
			+ (totalRow - 1)
			+ "].purslaverate' id='textRate"
			+ (totalRow)
			+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

			+ "<td style='display:none;'><input type='text' readonly='true' id='textRatePerUnit"
			+ (totalRow)
			+ "' class='form-control input-SmallText'></td>"

			+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
			+ (totalRow)
			+ "' readonly='true' ></td>"

			+ "<td style=display:none;><input type='text' name='mrnIssueSlaves["
			+ (totalRow - 1)
			+ "].mrnIssueSlaveMrnSlaveId' id=txtMrnIssueMRNSlaveId"
			+ (totalRow)
			+ " class='form-control input-SmallText' readonly='true' value='"
			+ txtMRNSlaveId
			+ "'/></td>"

			+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textClStk"
			+ (totalRow)
			+ "' readonly='true' ></td>"

			+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPurchaseRate"
			+ (totalRow) + "' readonly='true' ></td>"

			+ "<td><input type='text' id='textAmount" + (totalRow)
			+ "' class='form-control input-SmallText'  name='ltPurSlave["
			+ (totalRow - 1) + "].purSlaveAmt' " + " readonly='true'/></td>"

			+ "<td><button type='button' id='button" + (totalRow)
			+ "' onclick='addNewBatchRow(" + (totalRow)
			+ ")' disabled>Add</button</td>"

			+ "<td><input type='checkbox' id='deleteGroup" + (totalRow)
			+ "' value=" + (totalRow) + " name='deleteGroup'></td></tr>";

	$('#HSTDiv').append(divContent);
	$("#RowCount").val((parseInt(totalRow) + 1));
}

// get formatted date dd/mm/yyyy
function getDate(milliseconds) {
	var d = new Date(milliseconds);
	var dd = d.getDate();
	var mm = d.getMonth() + 1; // January is 0!

	var yyyy = d.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}

	return dd + '/' + mm + '/' + yyyy;
}

function setFocusToRate() {
	$("#txtRate").focus();
}

function calculateMRNAmount(value) {
	// net amount
	var rate = 0;
	var qty = 0;
	var unit = 0;
	var RatePerUnit = 0;

	if ($('#txtRate').val() != '' && $('#txtRate').val().length > 0
			&& $('#txtRate').val().length != null)
		rate = parseFloat($('#txtRate').val());

	if ($('#txtIssueQty').val() != '' && $('#txtIssueQty').val().length > 0
			&& $('#txtIssueQty').val() != null)
		qty = parseFloat($('#txtIssueQty').val());

	// code by suraj to set qty when without mrn
	if ($("#txtMrnNo").val() == 0) {
		$("#txtQty").val(qty);
	}

	if (value == 'qty')
		$("#txtRate").focus();

	if ($('#txtUnit').val() != '' && $('#txtUnit').val().length > 0)
		unit = parseFloat($('#txtUnit').val());

	if ($('#hiddenProductId').val() != ''
			&& $('#hiddenProductId').val().length > 0
			&& $('#txtUnit').val() != '' && $('#txtUnit').val().length > 0) {
		RatePerUnit = (rate / unit).toFixed(3);
	}
	$("#txtRatePerUnit").val(RatePerUnit);
	$('#txtAmount').val((RatePerUnit * qty).toFixed(3));
}

function fillRows(rCount) {
	var result = DublicateRecord(rCount);
	if (result == 1) {
		var rowCount = parseInt(rCount);
		$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
		$('#textProductName' + rowCount).val($('#particulars').val());
		$('#textUnit' + rowCount).val($('#txtUnit').val());
		$('#textPack' + rowCount).val($('#txtPack').val());
		$('#textComp' + rowCount).val($('#txtComp').val());
		$('#textMrp' + rowCount).val($('#txtMRP').val());
		$('#textQty' + rowCount).val($('#txtQty').val());
		$('#textIssueQty' + rowCount).val($('#txtIssueQty').val());

		var requireQty = $('#textQty' + rowCount).val();
		var issueQty = $('#textIssueQty' + rowCount).val();
		$('#textPendingQty' + rowCount).val(
				parseInt(requireQty) - parseInt(issueQty));

		$('#textLastPurRate' + rowCount).val($('#txtRate').val());
		$('#textBatch' + rowCount).val($('#txtBatchNo').val());
		$('#textExpiry' + rowCount).val($('#txtExpiry').val());
		$('#textBatchId' + rowCount).val($('#hiddenBatchId').val());
		$('#textStockId' + rowCount).val($('#hiddenStockId').val());
		$('#textStockQtyInHand' + rowCount).val($('#txtClStk').val());
		$('#textVat' + rowCount).val($('#txtVat').val());
		$('#textShelf' + rowCount).val($('#txtShelf').val());
		$('#textClStk' + rowCount).val($('#txtClStk').val());
		$('#textTotalStk' + rowCount).val($('#txtTotalStk').val());
		$('#textPurchaseRate' + rowCount).val($('#txtPurchaseRate').val());
		$('#textScm' + rowCount).val($('#txtScheme').val());
		$('#textRate' + rowCount).val($('#txtRate').val());
		$('#textAmount' + rowCount).val($('#txtAmount').val());
		$('#textRatePerUnit' + rowCount).val($('#txtRatePerUnit').val());
		$("#button" + rowCount).attr('disabled', false);
		$("#textProductName" + rowCount).prop('disabled', true);
		calculateGrossAmount();
	}
}

// delete Row Code

function deleteRow() {
	/* var result= $("input[name='deleteGroup']:checked").val(); */

	/* $("#remove"+result).hide(); */
	var r = confirm("Are you confirm to delete selected row");
	if (r == true) {
		var favorite = [];

		$.each($("input[name='deleteGroup']:checked"), function() {
			favorite.push($(this).val());
		});

		if (favorite.length == 0) {
			alert("Please select checkbox to delete");
		}

		for ( var i = 0; i < favorite.length; i++) {
			var textNo = $("#textNo" + favorite[i]).val();
			if ($("#hiddenProductId" + favorite[i]) != null
					&& $('#hiddenProductId' + favorite[i]).val() != "") {
				$("#deleteGroup" + favorite[i]).prop("checked", false);
				var amount = parseFloat($("#textAmount" + favorite[i]).val());
				$("#textNo" + favorite[i]).val("");
				$("#hiddenProductId" + favorite[i]).val("");
				$("#remove" + favorite[i]).hide();

				var mainAmount = parseFloat($("#txtAmount" + textNo).val());

				var finalAmount = ((mainAmount) - (amount)).toFixed(2);
				$("#txtAmount" + textNo).val(finalAmount);

				$("#textAmount" + favorite[i]).val(0);
				calculateGrossAmount();
				validateLess();
				$("#remove" + favorite[i]).remove();

			} else {
				alert("Can not delete empty row");
				$("#deleteGroup" + favorite[i]).prop("checked", false);
			}
		}
	}
}

function calculateGrossAmount() {

	var total = 0;
	for ( var i = 1; i < $("#RowCount").val(); i++) {

		if ($('#hiddenProductId' + i).val() != ''
				&& $('#hiddenProductId' + i).val() != null
				&& $('#hiddenProductId' + i).val().length > 0) {
			if ($('#textAmount' + i).val() >= 0
					&& $('#textAmount' + i).val() != null
					&& $('#textAmount' + i).val() != "") {
				total = ((parseFloat(total) + parseFloat($('#textAmount' + i)
						.val())).toFixed(3));

			}
		}

	}
	$('#txtGrossAmt').val(total);
	validateLess();
	calculateNetAmount();
	calculatecdAmt();
}

function validateLess() {
	var GrossAmt = parseFloat($('#txtGross').val());
	var Less = parseFloat($('#txtLess').val());

	if (Less >= GrossAmt) {
		alert("Less should be less than gross amount!");
		$('#txtSpecialDisc').focus();
		$('#txtSpecialDisc').val('');
		$('#txtLess').val('');
	}
	calculateNetAmount();

}

function calculateSurcharges() {
	var add = 0;
	if ($('#txtSurcharge').val() != '' && $('#txtSurcharge').val().length > 0) {
		add = parseFloat($('#txtSurcharge').val());
	}

	$("#txtAdd").val(add);
	calculateNetAmount();
	/* calculateNetAmount(); */
}

function calculateNetAmount() {
	// net amount
	var gross = 0;
	var less = 0;
	var add = 0;

	if ($('#txtGrossAmt').val() != '' && $('#txtGrossAmt').val() != null) {
		gross = parseFloat($('#txtGrossAmt').val());
	}
	if ($('#txtLess').val() != '' && $('#txtLess').val() != null) {
		less = parseFloat($('#txtLess').val());
	}
	if ($('#txtAdd').val() != '' && $('#txtAdd').val() != null) {
		add = parseFloat($('#txtAdd').val());
	}

	$('#txtNetAmt').val(((gross - less) + add).toFixed(3));
}

function saveMRN() {

	var txtGrossAmt = $("#txtGrossAmt").val();

	var txtNetAmt = 0;
	if ($("#txtNetAmt").val() != null && $("#txtNetAmt").val() != "") {
		txtNetAmt = $("#txtNetAmt").val();
		if (parseFloat(txtNetAmt) < 0) {
			alertify.error("Net Amount not in negative");
			return false;
		}
	} else {
		alertify.error("Please Enter Net Amount");
		return false;
	}

	var paymentMode = 0;
	if ($("input[name=radioCashCredit]").is(":checked")) {
		paymentMode = $("input[name=radioCashCredit]:checked").val();
	} else {
		alertify.error("Please select Type cash/credit");
		return false;
	}

	var storeId = 0;
	if ($("#hiddenStoreId").val() != null && $("#hiddenStoreId").val() != "") {
		storeId = $("#hiddenStoreId").val();
	} else {
		alertify.error("Please select Store First");
		return false;
	}

	var storeName = $("#txtRecFrom").val();

	var txtLessAmount = $("#txtLess").val();

	var txtAdd = $("#txtAdd").val();

	/* var txtSpecialDisc = $("#txtSpecialDisc").val(); */

	var txtRound = $("#txtRount").val();

	/* var txtCD = $("#txtCD").val(); */

	/* var txtCDAmt = $("#txtCDAmt").val(); */

	/* var txtCN = $("#txtCN").val(); */

	/* var txtCNAmt = $("#txtCNAmt").val(); */

	/* var txtSurcharge = $("#txtSurcharge").val(); */

	var txtDate = $("#popup_container2").val();

	/* var txtTime=$("#txtTime").val(); */

	var txtBillNo = $("#txtBillNo").val();

	var txtMrnNo = $("#txtMrnNo").val();

	var totalRow = $("#RowCount").val();

	var txtMrnId = $("#hiddenMRNIssueId").val();
	if(txtMrnId==""||txtMrnId==null||txtMrnId==undefined){
		txtMrnId=0;
	}

	var txtTime = 0;
	if ($("#txtTime").val() != null && $("#txtTime").val() != "") {
		txtTime = $("#txtTime").val();
	} else {
		alertify.error("Please Enter Time");
		$("#txtTime").focus();
		return false;
	}

	var receiveWithStore = 0;
	if ($('#withReceive').is(':checked') == true) {
		receiveWithStore = "on";
	} else {
		receiveWithStore = "off";
	}

	/* var txtNaration = $("#txtNaration").val(); */

	if (totalRow.length < 1) {
		alertify.error("Enter Only Valid data");
		return false;
	}

	var materiallist = {
		mrnIssueSlaves : []
	};

	for ( var i = 1; i < totalRow; i++) {

		if ($("#hiddenProductId" + i).val() != null
				&& $("#hiddenProductId" + i).val() != "") {
			var batchId = 0;
			var productId = 0;
			if ($("#textBatchId" + i).val() != null
					&& $("#textBatchId" + i).val() != "") {
				batchId = $("#textBatchId" + i).val();
			} else {
				alertify.error("Please select Batch");
				$("#textBatch" + i).focus();
				return false;
			}

			if ($("#hiddenProductId" + i).val() != null
					&& $("#hiddenProductId" + i).val() != "") {
				productId = $("#hiddenProductId" + i).val();
			} else {
				alertify.error("Please select Product");
				$("#hiddenProductId" + i).focus();
				return false;
			}

			/* var productId = $("#hiddenProductId" + i).val(); */

			var batchCode = $("#textBatch" + i).val();

			var batchExpiry = $("#textExpiry" + i).val();

			var mrnIssueMRNSlaveId = $("#txtMrnIssueMRNSlaveId" + i).val();

			var mrp = $("#textMrp" + i).val();

			var rate = $("#textRate" + i).val();

			var qty = $("#textQty" + i).val();
			if (qty == "" || qty == 0) {

				alert("Please Enter Proper Quantity");
				$("#textQty" + i).focus();
				return false;
			}

			var issueQty = 0;
			var pendingQty = 0;

			if ($("#textIssueQty" + i).val() != null
					&& $("#textIssueQty" + i).val() != '') {
				issueQty = $("#textIssueQty" + i).val();
			} else {
				alertify.error("Enter Issue Qty");
				$("#textIssueQty" + i).focus();
				return false;
			}

			if ($("#textPendingQty" + i).val() != null
					&& $("#textPendingQty" + i).val() != '') {
				pendingQty = $("#textPendingQty" + i).val();
			} else {
				alertify.error("Enter Pending Qty");
				$("#textPendingQty" + i).focus();
				return false;
			}

			var vat = 0.0;

			vat = $("#textVat" + i).val();

			var amt = $("#textAmount" + i).val();
			var status = 0;
			
			if ($("#textMrnSlaveId" + i).val() != null
					&& $("#textMrnSlaveId" + i).val() != "") 
			{
					status = $("#txtMrnIssueStatus" + i).val();
												
				materiallist.mrnIssueSlaves.push({
					mrnIssueSlaveId : $("#textMrnSlaveId" + i).val(),
					mrnIssueSlaveBatchCode : batchCode,
					mrnIssueSlaveBatchExpiry : batchExpiry,
					mrnIssueSlaveMrp : mrp,
					mrnIssueSlaveRate : rate,
					mrnIssueSlaveQty : qty,
					mrnIssueSlaveTotalIssueQty : issueQty,
					mrnIssueSlavePendingQty : pendingQty,
					mrnIssueSlaveAmt : amt,
					mrnIssueSlaveBatchId : batchId,
					mrnIssueSlaveMrnSlaveId : mrnIssueMRNSlaveId,
					mrnIssueSlaveVat : vat,
					storeMrnReceiveStatus : status,
					productMaster : {
						'productId' : productId,
						'batchMaster' : [ {
							'batchId' : batchId,
							'stockMaster' : {
								'stockId' : $("#textStockId" + i).val(),
								'stockQtyInHand' : $("#textStockQtyInHand" + i)
										.val()
							}
						} ]
					}
				});
			} else {

				if ($('#withReceive').is(':checked') == true) {
					status = 0;
				} else {
					status = 1;
									
					}
			
				materiallist.mrnIssueSlaves.push({
					mrnIssueSlaveBatchCode : batchCode,
					mrnIssueSlaveBatchExpiry : batchExpiry,
					mrnIssueSlaveMrp : mrp,
					mrnIssueSlaveRate : rate,
					mrnIssueSlaveQty : qty,
					mrnIssueSlaveTotalIssueQty : issueQty,
					mrnIssueSlavePendingQty : pendingQty,
					mrnIssueSlaveAmt : amt,
					mrnIssueSlaveBatchId : batchId,
					mrnIssueSlaveMrnSlaveId : mrnIssueMRNSlaveId,
					mrnIssueSlaveVat : vat,
					storeMrnReceiveStatus : status,
					productMaster : {
						'productId' : productId,
						'batchMaster' : [ {
							'batchId' : batchId,
							'stockMaster' : {
								'stockId' : $("#textStockId" + i).val(),
								'stockQtyInHand' : $("#textStockQtyInHand" + i)
										.val()
							}
						} ]
					}
				});
			}
		}
	}

	if (materiallist.mrnIssueSlaves.length < 1) {
		alertify.error("Please Enter Valid Data");
		return false;
	}

	materiallist = JSON.stringify(materiallist);

	var inputs = [];

	inputs.push("mrnIssueSlaves=" + materiallist);

	inputs.push("txtMrnId=" + txtMrnId);

	inputs.push("txtGrossAmt=" + txtGrossAmt);
	inputs.push("txtNetAmt=" + txtNetAmt);
	inputs.push("paymentMode=" + paymentMode);
	inputs.push("txtLessAmount=" + txtLessAmount);

	inputs.push("txtAdd=" + txtAdd);
	/* inputs.push("txtSpecialDisc=" + txtSpecialDisc); */
	inputs.push("txtRound=" + txtRound);
	/* inputs.push("txtCD=" + txtCD); */

	/* inputs.push("txtCDAmt=" + txtCDAmt); */
	/* inputs.push("txtCN=" + txtCN); */
	/* inputs.push("txtCNAmt=" + txtCNAmt); */
	/* inputs.push("txtSurcharge=" + txtSurcharge); */

	inputs.push("txtDate=" + txtDate);
	inputs.push("txtBillNo=" + txtBillNo);
	inputs.push("txtMrnNo=" + txtMrnNo);

	inputs.push("storeName=" + storeName);
	inputs.push("storeId=" + storeId);
	inputs.push("txtTime=" + txtTime);
	inputs.push("receiveStatus=" + receiveWithStore);
	 inputs.push("mainStoreId=" + $("#mainStore").val()); 

	/* inputs.push("txtTime=" + txtTime); */

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str,
				url : "../../pharmacy/mrn/saveMrn",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("oops something went wrong related to stock please save proper data or check mrp");
				},
				success : function(r) {
					alertify.success(r.result);
					/*
					 * displayPage(); $("#RowCount").val(1);
					 */

					location.reload(true);
				}
			});
}

function displayPage() {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "../../pharmacy/mrn/view.htm1",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("oops something went wrong");
		},
		success : function(r) {
			$('#content').html(r);
		}
	});

}

function DublicateRecord(rowCount) {
	var productName;
	var productName1;
	var j = 1;

	var batchId;
	var batchId1;

	var count = $('#RowCount').val();
	while (j < (count)) {

		productName = $('#hiddenProductId' + j).val();
		productName1 = $('#hiddenProductId').val();

		batchId = $('#textBatchId' + j).val();
		batchId1 = $('#hiddenBatchId').val();

		if ((productName == productName1) && (batchId == batchId1)) {
			alert("Dublicate Record Not insert");
			return 0;

		}
		j++;
	}
	return 1;
}

function calculatecdAmt() {
	var cdAmt = 0;
	var gross = 0;
	if ($('#txtCD').val() != '' && $('#txtCD').val().length > 0) {
		cdAmt = parseFloat($('#txtCD').val());
	}

	if ($('#txtGrossAmt').val() != '' && $('#txtGrossAmt').val().length > 0) {
		gross = parseFloat($('#txtGrossAmt').val());
	}

	if (cdAmt > 0) {
		var result = gross * (cdAmt / 100);
		$('#txtCDAmt').val(result.toFixed(3));
	} else {
		$('#txtCDAmt').val(0);
	}

	calculateNetAmount();
	calculateDiscount();

}

function calculateDiscount() {
	var disc = 0;
	var cdAmt = 0;
	if (($('#txtSpecialDisc').val() != '' && $('#txtSpecialDisc').val().length > 0)) {
		disc = parseFloat($('#txtSpecialDisc').val());
	}

	if (($('#txtCDAmt').val() != '' && $('#txtCDAmt').val().length > 0)) {
		cdAmt = parseFloat($('#txtCDAmt').val());
	}

	if (disc > cdAmt) {
		$('#txtLess').val((disc - cdAmt).toFixed(3));
	} else {
		$('#txtLess').val(0);
	}
	calculateNetAmount();
}

function setStoreWiseMrn() {

	if ($('#hiddenPendingStoreId').val() != null
			&& $('#hiddenPendingStoreId').val() != "") {
		var inputs = [];
		inputs.push('storeId=' + $('#hiddenPendingStoreId').val());

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str,
			url : "../../pharmacy/mrn/storeWisePendingMrn",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				setAllPendingMrnData(r);
			}
		});
	} else {
		alertify.error("Enter Store Name First");
	}

}

function CheckDis() {
	var cd = parseFloat($('#txtCD').val());
	if (cd > 100) {
		alert("CD% should be less than 100");
		$('#txtCD').val('');
		$('#txtCDAmt').val('');
	}
	calculateDiscount();

}

// mrn issue list functions
function splitStoreDetail(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#txtStoreName').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenStoreId').val(arr[1]);

		}
	} else {
		$('#hiddenStoreId').val(0);

	}
}

// mrn issue list functions
function splitSearchStoreDetail(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#txtStoreName').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenSearchStoreId').val(arr[1]);

		}
	} else {
		$('#hiddenSearchStoreId').val(0);

	}
}

// get Store Wise MRN List

function searchMRNIssueByStore(storeId) {

	if (storeId != null && storeId != "") {
		var inputs = [];
		inputs.push('storeId=' + $('#hiddenSearchStoreId').val());

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str,
			url : "../../pharmacy/mrn/storeWiseMrnIssue",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				setStoreWiseMRNIssue(r);
			}
		});
	} else {
		alertify.error("Enter Store Name First");
	}
}

function setStoreWiseMRNIssue(result) {
	var divContent = "";

	for ( var i = 0; i < result.length; i++) {
		divContent = divContent + " <tr><td class='col-md-1 center'>" + (i + 1)
				+ "</td>"

				+ "<td class='col-md-2 center'>" + result[i].mrnIssueId
				+ "<input type='hidden' id='HospitalBillNum"
				+ result[i].mrnIssueId + "'value='" + result[i].mrnIssueId
				+ "'>" + "</td>";

		if (result[i].mrnMaster != null) {
			divContent = divContent + "<td class='col-md-2 center'>"
					+ result[i].mrnMaster.mrnId
					+ "<input type='hidden' id='InwardNo"
					+ result[i].mrnIssueId + "' value='"
					+ result[i].mrnMaster.mrnId + "'></td>";
		} else {
			divContent = divContent
					+ "<td class='col-md-2 center'>Without MRN</td>";
		}

		if (result[i].mrnMaster != null) {
			divContent = divContent + "<td class='col-md-2 center'>"
					+ result[i].mrnMaster.mrnStatus
					+ "<input type='hidden' id='InwardNo"
					+ result[i].mrnIssueId + "' value='"
					+ result[i].mrnMaster.mrnStatus + "'></td>";
		} else {
			divContent = divContent + "<td class='col-md-2 center'></td>";
		}

		divContent = divContent
				+ "<td class='col-md-2 center'>"
				+ result[i].storeName
				+ "<input type='hidden' id='InwardNo"
				+ result[i].mrnIssueId
				+ "' value='"
				+ result[i].storeName
				+ "'></td>"

				+ "<td class='col-md-2 center'> <a id='btnPrint"
				+ "' class='btn btn-xs btn-success' "
				+ " href=../../pharmacy/mrn/mrnIssueprintView?mrnIssueId="
				+ result[i].mrnIssueId
				+ " > <i class='fa fa-print'></i> </a> </td>";

		/*
		 * + "<td class='col-md-2 center'> <button id='btnPrint" + "'
		 * class='btn btn-xs btn-success' " + " onclick='mrnIssuePrint(" +
		 * result[i].mrnIssueId + ")' > <i class='fa fa-print'></i> </button>
		 * </td>";
		 */

		if (result[i].mrnMaster.mrnStatus != "complete") 
		{
			divContent = divContent
					+ "<td class='col-md-2 center'> <a id='btnEditt"
					+ "' class='btn btn-xs btn-success' "
					+ " onclick=editMRNIssueById(" + result[i].mrnIssueId
					+ ") > <i class='fa fa-edit'></i> </a> </td>";
		} 
		else 
		{
			divContent = divContent
					+ "<td class='col-md-2 center'> <a id='btnEditt"
					+ "' class='btn btn-xs btn-success' "
					+ " onclick=editMRNIssueById(" + result[i].mrnIssueId
					+ ") disabled> <i class='fa fa-edit'></i> </a> </td>";
		}

		divContent = divContent
				+ "<td class='col-md-1 center'> <button id='btnDelete2' type='button' class='btn btn-xs btn-success'  value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}
	$('#mrnIssueList').html(divContent);
}

// search by mrn no

function splitMRNIssueData(content) {

	if (content != "") {

		$('#txtMrnIssueNo').val(content);
		$('#hiddenMRNIssueId').val(content);

	} else {
		$('#hiddenMRNIssueId').val(0);
	}
}

function searchMRNIssueByMRNId(storeId) {
	if (storeId != null && storeId != "") {
		var inputs = [];
		inputs.push('mrnIssueId=' + storeId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str,
			url : "../../pharmacy/mrn/mrnNoWiseMrnIssue",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				setStoreWiseMRNIssue(r);
			}
		});
	} else {
		alertify.error("Enter Store Name First");
	}
}

// fetch mrn issue list
function mrnIssueList(type) {

	if ($('#withoutMRNCheck').is(':checked') == true) {
		if (type == 'withouMRN') {
			jQuery.ajax({
				async : true,
				type : "POST",
				url : "../../pharmacy/mrn/mrnIssueList",
				data : {
					type : type
				},
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					setMRNIssueList(r);
				}

			});
		}
	} else {
		jQuery.ajax({
			async : true,
			type : "POST",
			url : "../../pharmacy/mrn/mrnIssueList",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				setMRNIssueList(r);
			}

		});
	}
}

function setMRNIssueList(result) {
	var divContent = "";

	if (result.length > 0) {
		for ( var i = 0; i < result.length; i++) {
			divContent = divContent + " <tr><td class='col-md-1 center'>"
					+ (i + 1) + "</td>"

					+ "<td class='col-md-2 center'>" + result[i].mrnIssueId
					+ "<input type='hidden' id='HospitalBillNum"
					+ result[i].mrnIssueId + "'value='" + result[i].mrnIssueId
					+ "'>" + "</td>";

			if (result[i].mrnMaster != null) {
				divContent = divContent + "<td class='col-md-2 center'>"
						+ result[i].mrnMaster.mrnId
						+ "<input type='hidden' id='InwardNo"
						+ result[i].mrnIssueId + "' value='"
						+ result[i].mrnMaster.mrnId + "'></td>";
			} else {
				divContent = divContent
						+ "<td class='col-md-2 center'>Without MRN</td>";
			}

			if (result[i].mrnMaster != null) {
				divContent = divContent + "<td class='col-md-2 center'>"
						+ result[i].mrnMaster.mrnStatus
						+ "<input type='hidden' id='mrnStatus"
						+ result[i].mrnIssueId + "' value='"
						+ result[i].mrnMaster.mrnStatus + "'></td>";
			} else {
				divContent = divContent + "<td class='col-md-2 center'></td>";
			}

			divContent = divContent
					+ "<td class='col-md-2 center'>"
					+ result[i].storeName
					+ "<input type='hidden' id='InwardNo"
					+ result[i].mrnIssueId
					+ "' value='"
					+ result[i].storeName
					+ "'></td>"

					+ "<td class='col-md-2 center'> <a id='btnPrint"
					+ "' class='btn btn-xs btn-success' "
					+ " href=../../pharmacy/mrn/mrnIssueprintView?mrnIssueId="
					+ result[i].mrnIssueId
					+ " > <i class='fa fa-print'></i> </a> </td>";

			/*
			 * + "<td class='col-md-2 center'> <button id='btnPrint" + "'
			 * class='btn btn-xs btn-success' " + " onclick='mrnIssuePrint(" +
			 * result[i].mrnIssueId + ")' > <i class='fa fa-print'></i>
			 * </button> </td>";
			 */

			if (result[i].mrnMaster != null
					&& result[i].mrnMaster.mrnStatus != 'complete') {
				divContent = divContent
						+ "<td class='col-md-2 center'> <a id='btnPrint"
						+ "' class='btn btn-xs btn-success' "
						+ " onclick=editMRNIssueById(" + result[i].mrnIssueId
						+ ")><i class='fa fa-edit'></i> </a> </td>";
			} else {
				divContent = divContent
						+ "<td class='col-md-2 center'> <a id='btnPrint"
						+ "' class='btn btn-xs btn-success' "
						+ " onclick=editMRNIssueById(" + result[i].mrnIssueId
						+ ") disabled><i class='fa fa-edit'></i> </a> </td>";
			}

			divContent = divContent
					+ "<td class='col-md-1 center'> <button id='btnDelete2' type='button' class='btn btn-xs btn-success' onclick=deleteMRNIssueById(" + result[i].mrnIssueId + ") value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
		}
	} else {
		divContent = divContent + "<b>Record Not found</b>";
	}

	$('#mrnIssueList').html(divContent);
}

function editMRNIssue(mrnIssueId) {

	if (mrnIssueId != "" && mrnIssueId != null) {
		var inputs = [];
		inputs.push('mrnIssueId' + mrnIssueId);

		var str = inputs.join('&');
		jQuery.ajax({
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/mrn/editMRNIssue",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				$('#box_tab1').prop("class", "tab-pane fade active in");
				$('#box_tab2').prop("class", "tab-pane fade");
				$('#box_tab3').prop("class", "tab-pane fade");

				$('#tab1').removeClass('active');
				$('#tab2').removeClass('active');
				$('#tab3').addClass('active');

				setEditMRNData(r);
			}

		});
	} else {
		alertify.error("please select Record");
	}

	return true;
}

function createMRNIssueDiv(RowCount, currentRowCount) {
	var currentRow = currentRowCount;
	if (currentRow == undefined) {
		currentRow = 0;
	}
	var j = 1;

	var rowCount = $('#' + RowCount).val();
	if (rowCount == -1) {
		rowCount = 0;
	}
	if (rowCount == currentRow) {

		var result = DublicateRecord(currentRow);
		if (result == 1) {

			rowCount++;
			rowId = "remove" + rowCount;
			var x = document.createElement('tr');
			x.setAttribute('id', rowId);
			/* x.setAttribute('class', 'col-md-12-1'); */
			x.setAttribute('style', 'margin-top:0px');
			document.getElementById("HSTDiv").appendChild(x);
			var index = parseInt(rowCount) - 1;

			document.getElementById(rowId).innerHTML = "<tr id='remove"
					+ (rowCount)
					+ "'><td><label  class=' input-SmallText'>"
					+ (rowCount)
					+ "</label></td>"
					+ "<input type='hidden' id='hiddenProductId"
					+ (rowCount)
					+ "' name='ltPurSlave["
					+ (rowCount - 1)
					+ "].productMaster.productId' />"

					+ "<input type='hidden' id='textBatchId"
					+ (rowCount)
					+ "' name='ltPurSlave["
					+ (rowCount - 1)
					+ "].productMaster.batchMaster[0].batchId' />"

					+ "<td><input type='text' name='ltPurSlave["
					+ (rowCount - 1)
					+ "].productMaster.productName' autocomplete='off' id='textProductName"
					+ (rowCount)
					+ "' class='form-control input-SmallText' ' data-toggle='modal' data-target='#Product_Information' onclick='load("
					+ rowCount
					+ ")' onkeypress='load("
					+ rowCount
					+ ")'/></td>"

					+ "<td style='display:none;'><input name='textAvlQty' type='text' class='form-control input-SmallText' id='textAvlQty"
					+ rowCount
					+ "' readonly='true' tabindex='-1' /></td>"

					+ "<td><input type='text' name='ltPurSlave["
					+ (rowCount - 1)
					+ "].productMaster.productUnit' id='textUnit"
					+ (rowCount)
					+ "'  class='form-control input-SmallText' readonly='true' />"

					+ "</td><td><input type='text' name='ltPurSlave["
					+ (rowCount - 1)
					+ "].productMaster.packType' id='textPack"
					+ (rowCount)
					+ "' readonly='true' class='form-control input-SmallText'/></td>"

					+ "<td><input name='ltPurSlave["
					+ (rowCount - 1)
					+ "].productMaster.compShortName' id='textCom"
					+ (rowCount)
					+ "' readonly='true' type='text' class='form-control input-SmallText'/></td>"

					+ "<td><input type='text' name='ltPurSlave["
					+ (rowCount - 1)
					+ "].purSlaveQty' id=textQty"
					+ (rowCount)
					+ " class='form-control input-SmallText' readonly='true' /></td>"

					+ "<td><input type='text' name='ltPurSlave["
					+ (rowCount - 1)
					+ "].purSlaveScheme' id=textIssueQty"
					+ (rowCount)
					+ " class='form-control input-SmallText' readonly='true'/></td>"

					+ "<td><input type='text' name='ltPurSlave["
					+ (rowCount - 1)
					+ "].purSlaveScheme' id=textPendingQty"
					+ (rowCount)
					+ " class='form-control input-SmallText' readonly='true' /></td>"

					+ "<td><input name='ltPurSlave["
					+ (rowCount - 1)
					+ "].productMaster.batchMaster[0].batchCode' id=textBatch"
					+ (rowCount)
					+ "  type='text' class='form-control input-SmallText' readonly='true'/></td>"
					+ "<td><input name='ltPurSlave["
					+ (rowCount - 1)
					+ "].productMaster.batchMaster[0].batchExpDate' id=textExpiry"
					+ (rowCount)
					+ "  type='text' class='form-control input-SmallText' readonly='true'/></td>"
					+ "<td><input name='ltPurSlave["
					+ (rowCount - 1)
					+ "].purDisc' id='textDisc"
					+ (rowCount)
					+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"
					+ "<td><input name='ltPurSlave["
					+ (rowCount - 1)
					+ "].purVat' id='textVat"
					+ (rowCount)
					+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

					+ "<td><input name='ltPurSlave["
					+ (rowCount - 1)
					+ "].purSlaveMrp' id='textMrp"
					+ (rowCount)
					+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

					+ "<td><input name='ltPurSlave["
					+ (rowCount - 1)
					+ "].purslaverate' id='textRate"
					+ (rowCount)
					+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

					+ "<td style='display:none;'><input type='text' readonly='true' id='textRatePerUnit"
					+ (rowCount)
					+ "' class='form-control input-SmallText'></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
					+ (rowCount)
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' name='mrnIssueSlaves["
					+ (rowCount - 1)
					+ "].mrnIssueSlaveMrnSlaveId' id=txtMrnIssueMRNSlaveId"
					+ (rowCount)
					+ " class='form-control input-SmallText' value='0' readonly='true' /></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textClStk"
					+ (rowCount)
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPurchaseRate"
					+ (rowCount)
					+ "' readonly='true' ></td>"

					+ "<td><input type='text' id='textAmount"
					+ (rowCount)
					+ "' class='form-control input-SmallText'  name='ltPurSlave["
					+ (rowCount - 1) + "].purSlaveAmt' "
					+ " readonly='true'/></td>"

					+ "<td><button type='button' id='button" + (rowCount)
					+ "' onclick='addNewBatchRow(" + (rowCount)
					+ ")' disabled>Add</button</td>"

					+ "<td><input type='checkbox' id='deleteGroup" + (rowCount)
					+ "' value=" + (rowCount)
					+ " name='deleteGroup'></td></tr>";

			$("#RowCount").val(rowCount);
			$("#addRowCount").val(j);
			j++;
			$('#textProductName' + rowCount).focus();
			fillRows(currentRowCount);
		}
	} else {

		var result = DublicateRecord(currentRow);
		if (result == 1) {
			fillRows(currentRowCount);
		}

	}
}

function addBlankRow() {
	var divContent = "";

	divContent = divContent
			+ "<input type='hidden' id='hiddenCurrentRow' value='0' /><tr id='remove1"
			+ "'><td><label  class=' input-SmallText'>"
			+ 1
			+ "</label></td>"
			+ "<input type='hidden' id='hiddenProductId"
			+ 1
			+ "' name='ltPurSlave["
			+ 0
			+ "].productMaster.productId' />"

			+ "<input type='hidden' id='textBatchId"
			+ 1
			+ "' name='ltPurSlave["
			+ 0
			+ "].productMaster.batchMaster[0].batchId' />"

			+ "<td><input type='text' name='ltPurSlave["
			+ 0
			+ "].productMaster.productName' autocomplete='off' id='textProductName"
			+ 1
			+ "' class='form-control input-SmallText' ' data-toggle='modal' data-target='#Product_Information' onclick='load("
			+ 1
			+ ")'/></td>"

			+ "<td style='display:none;'><input name='textAvlQty' type='text' class='form-control input-SmallText' id='textAvlQty"
			+ 1
			+ "' readonly='true' tabindex='-1' /></td>"

			+ "<td><input type='text' name='ltPurSlave["
			+ 0
			+ "].productMaster.productUnit' id='textUnit"
			+ 1
			+ "'  class='form-control input-SmallText' readonly='true' />"

			+ "</td><td><input type='text' name='ltPurSlave["
			+ 0
			+ "].productMaster.packType' id='textPack"
			+ 1
			+ "' readonly='true' class='form-control input-SmallText'/></td>"

			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].productMaster.compShortName' id='textCom"
			+ 1
			+ "' readonly='true' type='text' class='form-control input-SmallText'/></td>"

			+ "<td><input type='text' name='ltPurSlave["
			+ 0
			+ "].purSlaveQty' id=textQty"
			+ 1
			+ " class='form-control input-SmallText' readonly='true' /></td>"

			+ "<td><input type='text' name='ltPurSlave["
			+ 0
			+ "].purSlaveScheme' id=textIssueQty"
			+ 1
			+ " class='form-control input-SmallText' readonly='true'/></td>"

			+ "<td><input type='text' name='ltPurSlave["
			+ 0
			+ "].purSlaveScheme' id=textPendingQty"
			+ 1
			+ " class='form-control input-SmallText' readonly='true' /></td>"

			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].productMaster.batchMaster[0].batchCode' id=textBatch"
			+ 1
			+ "  type='text' class='form-control input-SmallText' readonly='true'/></td>"
			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].productMaster.batchMaster[0].batchExpDate' id=textExpiry"
			+ 1
			+ "  type='text' class='form-control input-SmallText' readonly='true'/></td>"
			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].purDisc' id='textDisc"
			+ 1
			+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"
			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].purVat' id='textVat"
			+ 1
			+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].purSlaveMrp' id='textMrp"
			+ 1
			+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].purslaverate' id='textRate"
			+ 1
			+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

			+ "<td style='display:none;'><input type='text' readonly='true' id='textRatePerUnit"
			+ 1
			+ "' class='form-control input-SmallText'></td>"

			+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
			+ 1
			+ "' readonly='true' ></td>"

			+ "<td style=display:none;><input type='text' name='mrnIssueSlaves["
			+ 0
			+ "].mrnIssueSlaveMrnSlaveId' id=txtMrnIssueMRNSlaveId"
			+ 1
			+ " value='0' class='form-control input-SmallText' readonly='true' /></td>"

			+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textClStk"
			+ 0
			+ "' readonly='true' ></td>"

			+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPurchaseRate"
			+ 1 + "' readonly='true' ></td>"

			+ "<td><input type='text' id='textAmount1"
			+ "' class='form-control input-SmallText'  name='ltPurSlave[" + 0
			+ "].purSlaveAmt' " + " readonly='true'/></td>"

			+ "<td><button type='button' id='button1"
			+ "' onclick='' disabled>Add</button</td>"

			+ "<td><input type='checkbox' id='deleteGroup1"
			+ "' value=1 name='deleteGroup'></td></tr>";

	$("#HSTDiv").html(divContent);
}

// editMRNIssue

function editMRNIssueById(mrnIssueId) {
	
	var inputs = [];
	inputs.push('mrnIssueId=' + mrnIssueId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "../../pharmacy/mrn/editMRNIssueById",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$('#box_tab1').prop("class", "tab-pane fade active in");
			$('#box_tab2').prop("class", "tab-pane fade");
			$('#box_tab3').prop("class", "tab-pane fade");

			$('#tab2').removeClass('active');
			$('#tab3').addClass('active');

			editMrnIssue(r);
		}
	});
}

function editMrnIssue(result) {
	$("#hiddenMRNIssueId").val(result.mrnIssueId);
	$("#txtMrnNo").val(result.mrnMaster.mrnId);

	$("#mrnGenerateDate").val(getDate(result.mrnMaster.mrnDate));
	$("#hiddenStoreId").val(result.storeId);
	$("#txtBillNo").val(result.mrnIssueDocNo);

	$("#txtRecFrom").val(result.storeName);
	$("#txtOrderNo").val(result.mrnDocId);
	$("#txtTime").val(result.mrnIssueReceiveTime);
	$("#popup_container2").val(getDate(result.mrnReceivedDate));
	$("#txtTime").val(result.mrnIssueReceiveTime);

	$("#txtNaration").val(result.mrnIssueNarration);
	$("#txtCN").val(result.mrnIssueCN);
	$("#txtCD").val(result.mrnIssueCD);
	$("#txtSpecialDisc").val(result.mrnIssueSpecialDisc);
	$("#txtCNAmt").val(result.mrnIssueCnAmt);
	$("#txtCDAmt").val(result.mrnIssueCdAmt);
	$("#txtSurcharge").val(result.mrnIssueSurcharges);
	$("#txtGrossAmt").val(result.mrnIssueGrossAmt);
	$("#txtLess").val(result.mrnIssueLess);
	$("#txtAdd").val(result.mrnIssueAdd);
	$("#txtRount").val(result.mrnIssueRound);
	$("#txtNetAmt").val(result.mrnIssueNetAmt);

	var divContent = "";
	var mrnSlaves = result.mrnIssueSlaves;
	var totalRowCount = 0;

	for ( var i = 0; i < mrnSlaves.length; i++) {
		divContent = divContent
				+ "<input type='hidden' id='hiddenCurrentRow' value='0' /><tr id='remove1"
				+ "' style='background-color:#FF6666'><td><label  class=' input-SmallText'>"
				+ (i + 1)
				+ "</label></td>"
				+ "<input type='hidden' id='hiddenProductId"
				+ (i + 1)
				+ "' name='ltPurSlave["
				+ 0
				+ "].productMaster.productId' value='"
				+ mrnSlaves[i].productMaster.productId
				+ "' />"

				+ "<input type='hidden' id='textBatchId"
				+ (i + 1)
				+ "' name='ltPurSlave["
				+ 0
				+ "].productMaster.batchMaster[0].batchId' value='"
				+ mrnSlaves[i].mrnIssueSlaveBatchId
				+ "' />"

				+ "<input type='hidden' id='textMrnSlaveId"
				+ (i + 1)
				+ "' value='"
				+ mrnSlaves[i].mrnIssueSlaveId
				+ "' />"

				+ "<td><input type='text' name='ltPurSlave["
				+ 0
				+ "].productMaster.productName' autocomplete='off' id='textProductName"
				+ (i + 1)
				+ "' class='form-control input-SmallText' ' data-toggle='modal' data-target='#Product_Information'"
				+ " value='"
				+ mrnSlaves[i].productMaster.productName
				+ "' readonly/></td>"

				+ "<td style='display:none;'><input name='textAvlQty' type='text' class='form-control input-SmallText' id='textAvlQty"
				+ (i + 1)
				+ "' readonly='true' tabindex='-1' /></td>"

				+ "<td><input type='text' name='ltPurSlave["
				+ 0
				+ "].productMaster.productUnit' id='textUnit"
				+ (i + 1)
				+ "'  class='form-control input-SmallText' readonly='true' "
				+ " value='"
				+ mrnSlaves[i].productMaster.productUnit
				+ "' />"

				+ "</td><td><input type='text' name='ltPurSlave["
				+ 0
				+ "].productMaster.packType' id='textPack"
				+ (i + 1)
				+ "' readonly='true' class='form-control input-SmallText' "
				+ " value='"
				+ mrnSlaves[i].productMaster.packingMaster.packType
				+ "'/></td>"

				+ "<td><input name='ltPurSlave["
				+ 0
				+ "].productMaster.compShortName' id='textCom"
				+ (i + 1)
				+ "' readonly='true' type='text' class='form-control input-SmallText' "
				+ " value='"
				+ mrnSlaves[i].productMaster.companyMaster.compName
				+ "'/></td>"

				+ "<td><input type='text' name='ltPurSlave["
				+ 0
				+ "].purSlaveQty' id=textQty"
				+ (i + 1)
				+ " class='form-control input-SmallText' readonly='true' "
				+ " value='"
				+ mrnSlaves[i].mrnIssueSlaveQty
				+ "'/></td>"

				+ "<td><input type='text' name='ltPurSlave["
				+ 0
				+ "].purSlaveScheme' id=textIssueQty"
				+ (i + 1)
				+ " class='form-control input-SmallText' readonly='true' "
				+ " value='"
				+ mrnSlaves[i].mrnIssueSlaveTotalIssueQty
				+ "'/></td>"

				+ "<td><input type='text' name='ltPurSlave["
				+ 0
				+ "].purSlaveScheme' id=textPendingQty"
				+ (i + 1)
				+ " class='form-control input-SmallText' readonly='true' "
				+ " value='"
				+ mrnSlaves[i].mrnIssueSlavePendingQty
				+ "'/></td>"

				+ "<td><input name='ltPurSlave["
				+ 0
				+ "].productMaster.batchMaster[0].batchCode' id=textBatch"
				+ (i + 1)
				+ "  type='text' class='form-control input-SmallText' readonly='true' "
				+ " value='"
				+ mrnSlaves[i].mrnIssueSlaveBatchCode
				+ "'/></td>"

				+ "<td><input name='ltPurSlave["
				+ 0
				+ "].productMaster.batchMaster[0].batchExpDate' id=textExpiry"
				+ (i + 1)
				+ "  type='text' class='form-control input-SmallText' readonly='true' "
				+ " value='"
				+ mrnSlaves[i].mrnIssueSlaveBatchExpiry
				+ "'/></td>"

				+ "<td><input name='ltPurSlave["
				+ 0
				+ "].purDisc' id='textDisc"
				+ (i + 1)
				+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

				+ "<td><input name='ltPurSlave["
				+ 0
				+ "].purVat' id='textVat"
				+ (i + 1)
				+ "' type='text' class='form-control input-SmallText' readonly='true' "
				+ " value='"
				+ mrnSlaves[i].mrnIssueSlaveVat
				+ "'/></td>"

				+ "<td><input name='ltPurSlave["
				+ 0
				+ "].purSlaveMrp' id='textMrp"
				+ (i + 1)
				+ "' type='text' class='form-control input-SmallText' readonly='true' "
				+ " value='"
				+ mrnSlaves[i].mrnIssueSlaveMrp
				+ "'/></td>"

				+ "<td><input name='ltPurSlave["
				+ 0
				+ "].purslaverate' id='textRate"
				+ (i + 1)
				+ "' type='text' class='form-control input-SmallText' readonly='true' "
				+ " value='"
				+ mrnSlaves[i].mrnIssueSlaveRate
				+ "'/></td>"

				+ "<td style='display:none;'><input type='text' readonly='true' id='textRatePerUnit"
				+ (i + 1)
				+ "' class='form-control input-SmallText'></td>"

				+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
				+ (i + 1)
				+ "' readonly='true' ></td>"

				+ "<td style=display:none;><input type='text' name='mrnIssueSlaves["
				+ 0
				+ "].mrnIssueSlaveMrnSlaveId' id=txtMrnIssueMRNSlaveId"
				+ (i + 1)
				+ " value='"
				+ mrnSlaves[i].mrnIssueSlaveMrnSlaveId
				+ "' class='form-control input-SmallText' readonly='true' /></td>"

				+ "<td style=display:none;><input type='text' name='mrnIssueSlaves["
				+ 0
				+ "].storeMrnReceiveStatus' id=txtMrnIssueStatus"
				+ (i + 1)
				+ " value='"
				+ mrnSlaves[i].storeMrnReceiveStatus
				+ "' class='form-control input-SmallText' readonly='true' /></td>"
				
				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textClStk"
				+ (i + 1)
				+ "' readonly='true' ></td>"

				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPurchaseRate"
				+ (i + 1) + "' readonly='true' ></td>"

				+ "<td><input type='text' id='textAmount" + (i + 1)
				+ "' class='form-control input-SmallText'  name='ltPurSlave["
				+ 0 + "].purSlaveAmt' " + " readonly='true' " + " value='"
				+ mrnSlaves[i].mrnIssueSlaveAmt + "'/></td>"

				+ "<td><button type='button' id='button" + (i + 1)
				+ "' onclick='addNewBatchRow(" + (i + 1)
				+ ")' disabled='true'>Add</button</td>"

				+ "<td><input type='checkbox' id='deleteGroup" + (i + 1)
				+ "' value=1 name='deleteGroup' disabled></td></tr>";
		totalRowCount++;
	}

	$('#HSTDiv').html(divContent);
	$("#RowCount").val(totalRowCount);

	setPendingMRN(result.mrnMaster.mrnId);
}

function setPendingMRN(mrnId) {
	var inputs = [];
	inputs.push('mrnId=' + mrnId);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "../../pharmacy/mrn/getPendingMRNDetailsByMrnId",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			var result = jQuery.parseJSON(r);
			setPendingMRNforedit(result);

		}
	});

}

function setPendingMRNforedit(result) {
	var divContent = "";
	var found=0;

	var rowCount = parseInt($("#RowCount").val());
	for ( var i = 0; i < result.length; i++) 
	{
		for(var j =1; j <= rowCount; j++)
		{
			if(result[i].mrnSlaveId==$("#txtMrnIssueMRNSlaveId"+j).val())
			{
				found=j;
			}	
		}
		
		if($("#txtMrnIssueStatus"+found).val()=='1')
		{
			divContent = divContent
			+ "<tr id='remove"
			+ (rowCount + 1)
			+ "'><td><label  class=' input-SmallText'>"
			+ (rowCount + 1)
			+ "</label></td>"
			+ "<input type='hidden' id='hiddenProductId"
			+ (rowCount + 1)
			+ "' name='ltPurSlave["
			+ 0
			+ "].productMaster.productId' "
			+ " value='"
			+ result[i].productId
			+ "' />"

			+ "<input type='hidden' id='textBatchId"
			+ (rowCount + 1)
			+ "' name='ltPurSlave["
			+ 0
			+ "].productMaster.batchMaster[0].batchId' />"

			+ "<td><input type='text' name='ltPurSlave["
			+ 0
			+ "].productMaster.productName' autocomplete='off' id='textProductName"
			+ (rowCount + 1)
			+ "' class='form-control input-SmallText' ' data-toggle='modal' data-target='#Product_Information' onclick='load("
			+ (rowCount + 1)
			+ ")' value='"
			+ result[i].productName
			+ "'/></td>"

			+ "<td style='display:none;'><input name='textAvlQty' type='text' class='form-control input-SmallText' id='textAvlQty"
			+ (rowCount + 1)
			+ "' readonly='true' tabindex='-1' /></td>"

			+ "<td><input type='text' name='ltPurSlave["
			+ 0
			+ "].productMaster.productUnit' id='textUnit"
			+ (rowCount + 1)
			+ "'  class='form-control input-SmallText' readonly='true' "
			+ " value='"
			+ result[i].productUnit
			+ "' />"

			+ "</td><td><input type='text' name='ltPurSlave["
			+ 0
			+ "].productMaster.packType' id='textPack"
			+ (rowCount + 1)
			+ "' readonly='true' class='form-control input-SmallText' "
			+ " value='"
			+ result[i].productPack
			+ "'/></td>"

			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].productMaster.compShortName' id='textCom"
			+ (rowCount + 1)
			+ "' readonly='true' type='text' class='form-control input-SmallText' "
			+ " value='"
			+ result[i].productCompany
			+ "'/></td>"

			+ "<td><input type='text' name='ltPurSlave["
			+ 0
			+ "].purSlaveQty' id=textQty"
			+ (rowCount + 1)
			+ " class='form-control input-SmallText' readonly='true' "
			+ " value='"
			+ result[i].productPendingQty
			+ "'/></td>"

			+ "<td><input type='text' name='ltPurSlave["
			+ 0
			+ "].purSlaveScheme' id=textIssueQty"
			+ (rowCount + 1)
			+ " class='form-control input-SmallText' readonly='true' "
			+ "/></td>"

			+ "<td><input type='text' name='ltPurSlave["
			+ 0
			+ "].purSlaveScheme' id=textPendingQty"
			+ (rowCount + 1)
			+ " class='form-control input-SmallText' readonly='true' "
			+ " value='"
			+ result[i].productPendingQty
			+ "'/></td>"

			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].productMaster.batchMaster[0].batchCode' id=textBatch"
			+ (rowCount + 1)
			+ "  type='text' class='form-control input-SmallText' readonly='true' "
			+ " /></td>"

			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].productMaster.batchMaster[0].batchExpDate' id=textExpiry"
			+ (rowCount + 1)
			+ "  type='text' class='form-control input-SmallText' readonly='true' "
			+ " /></td>"

			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].purDisc' id='textDisc"
			+ (rowCount + 1)
			+ "' type='text' class='form-control input-SmallText' readonly='true'/></td>"

			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].purVat' id='textVat"
			+ (rowCount + 1)
			+ "' type='text' class='form-control input-SmallText' readonly='true' "
			+ " /></td>"

			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].purSlaveMrp' id='textMrp"
			+ (rowCount + 1)
			+ "' type='text' class='form-control input-SmallText' readonly='true' "
			+ " /></td>"

			+ "<td><input name='ltPurSlave["
			+ 0
			+ "].purslaverate' id='textRate"
			+ (rowCount + 1)
			+ "' type='text' class='form-control input-SmallText' readonly='true' "
			+ " /></td>"

			+ "<td style='display:none;'><input type='text' readonly='true' id='textRatePerUnit"
			+ (rowCount + 1)
			+ "' class='form-control input-SmallText'></td>"

			+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
			+ (rowCount + 1)
			+ "' readonly='true' ></td>"

			+ "<td style=display:none;><input type='text' name='mrnIssueSlaves["
			+ 0
			+ "].mrnIssueSlaveMrnSlaveId' id=txtMrnIssueMRNSlaveId"
			+ (rowCount + 1)
			+ " value='"
			+ result[i].mrnSlaveId
			+ "' class='form-control input-SmallText' readonly='true' /></td>"
			
			+ "<td style=display:none;><input type='text' name='mrnIssueSlaves["
			+ 0
			+ "].storeMrnReceiveStatus' id=txtMrnIssueStatus"
			+ (rowCount + 1)
			+ " value='0' class='form-control input-SmallText' readonly='true' /></td>"
			

			+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textClStk"
			+ 0
			+ "' readonly='true' ></td>"

			+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPurchaseRate"
			+ (rowCount + 1) + "' readonly='true' ></td>"

			+ "<td><input type='text' id='textAmount" + (rowCount + 1)
			+ "' class='form-control input-SmallText'  name='ltPurSlave["
			+ 0 + "].purSlaveAmt' " + " readonly='true' " + " /></td>"

			+ "<td><button type='button' id='button" + (rowCount + 1)
			+ "' onclick='addNewBatchRow(" + (rowCount + 1)
			+ ")' disabled='true'>Add</button</td>"

			+ "<td><input type='checkbox' id='deleteGroup1"
			+ "' value=1 name='deleteGroup'></td></tr>";

			rowCount++;
		}	
		
		
	}

	$('#HSTDiv').append(divContent);
	$("#RowCount").val(rowCount + 1);
}

/******
 * @author    :BILAL
 * @DAte      :06-12-2017
 * @Code      :For Delete of MRN issue
 * ********/
function deleteMRNIssueById(mrnIssueId) {

	var r = confirm("Are You Sure You Want To Delete MRN issue ?");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "../../pharmacy/mrn/deleteMRNIssueById",
			data : {
				"mrnIssueId" : parseInt(mrnIssueId)
			},
			
			error : function() {
				alert('error');
			},
			success : function(r) {
				alert(r);
				window.location.reload(true);
			}

		});
	}
}