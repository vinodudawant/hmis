var rowCount = 0;
var grossAmount = 0;
var amountRepeatFlag = 0;
var totalAmount = 0;
var totalRowCount = 1;
var counts = [];

/**
 * @Code : For Barcode
 * @return
 **/

function readBarcodeForPurchase(purId) {
	/*$("#ViewDocumemnt").html(" ");
	$('#viewDocModal').modal("show");
	$('#viewDocModal').modal();

	$('#ViewDocumemnt').attr(
			"src",
			"../../ReadPurchaseBarcodeServlet?fileName=purchase-" + purId
					+ ".pdf");*/
	
	window.open("../../pharmacy/pharmacy/readBarcodeForPurchase?masterId="+purId);

}
/**
 * @Code : delete row
 * @return
 **/
function deleteRowOnFocusData() {
	$(":focus").each(function() {
		var data = $(this).attr('class');
		var splittedData = data.split("#");
		$("#" + splittedData[1].trim()).attr("checked", true);
		deleteRow();
	});
}

/**
 * @Code : set up data row
 * @return
 **/
function setUpfocusData() {
	$(":focus").each(
			function() {
				var data = $(this).attr('class');
				var splittedData = data.split("#");
				console.log("splittedData is" + splittedData);
				var focusElement = splittedData[1].trim();
				console.log("focusElement is" + focusElement);
				var id = $("input." + focusElement).parent().parent()
						.attr("id");
				console.log("id is" + id);
				$("#DRRDiv tr").siblings("#" + id).prev().find(
						"td input.textProductName").focus();
			});
}
/**
 * @Code : set Down data row
 * @return
 **/
function setDownfocusData() {
	$(":focus").each(
			function() {
				var data = $(this).attr('class');
				var splittedData = data.split("#");
				console.log("splittedData is" + splittedData);
				var focusElement = splittedData[1].trim();
				console.log("focusElement is" + focusElement);
				var id = $("input." + focusElement).parent().parent()
						.attr("id");
				alert(id);
				console.log("id is" + id);
				$("#DRRDiv tr").siblings("#" + id).next().find(
						"td input.textProductName").focus();
			});
}

setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}
/**
 * @Code : get pending po data
 * @return
 **/
function fetchPendingPOData() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "../../pharmacy/po/getPendingPO",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			setAllPendingPOData(r);
		}
	});
	return true;

}
/**
 * @Code : set all pending po data
 * @return
 **/
function setAllPendingPOData(r) {
	var divContent = "";
	divContent = divContent
			+ "<div style='float:right'><button onclick='setPendingPOData()' class='btn btn-xs btn-info'>OK</button></div><table border=1 class='table table-striped table-bordered header-fixed cf '><thead><tr><th>PO Number</th><th>PO Received Date</th><th>Vou No</th><th>Vendor Name</th> <th>Net Amount</th><th>Product Count</th><th>Select</th></thead></tr>";
	for ( var i = 0; i < r.length; i++) {
		divContent = divContent + "<tbody><tr><td id='txtinvoice" + r[i].poId
				+ "'>" + r[i].poId + "</td><td>" + getDate(r[i].poDate)
				+ "</td> <td>" + r[i].podocId + "</td> <td>"
				+ r[i].vendor_name + "</td>  <td>"
				+ r[i].poNetTotal + "</td><td>" + r[i].poProductCount + "</td>";
		if (i == 0) {
			divContent = divContent
					+ "<td><div class='radio'>	<label><input type='radio' id='poNumber"
					+ r[i].poId
					+ "' checked name='poNumber' value='"
					+ r[i].poId
					+ "'><span class='cr' style='background-color:orange'><i class='cr-icon fa fa-rocket'></i></span></label></div></td></tr></tbody";
		} else {
			divContent = divContent
					+ "<td><div class='radio'>	<label><input type='radio' checked id='poNumber" 
					+ r[i].poId
					+ "' name='poNumber' value='"
					+ r[i].poId
					+ "'><span class='cr' style='background-color:orange'><i class='cr-icon fa fa-rocket'></i></span></label></div></td></tr></tbody";
		}

	}
	divContent = divContent + "</table>";

	$("#indentPendingData").html(divContent);
}
/**
 * @Code : get pending data with poflag
 * @return
 **/
var getPoFlag = 0;
function setPendingPOData() {
	getPoFlag = 1;
	var poId = $("input[name='poNumber']:checked").val();
	var inputs = [];
	inputs.push('poId=' + poId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/po/getPurchaseOrderByPurchaseId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			setPOPendingTableContent(r);
		}

	});

	return true;
}
/**
 * @Code : set pending data with poflag
 * @return
 **/
function setPOPendingTableContent(result) {

	$("#poId").val(result.poId);
	var invoice = $("#poId").val();

	$("#searchBox").val(result.ltPOslave[0].vendor_name);
	$("#hiddenVendorId").val(result.ltPOslave[0].vendor_id);
	$("#txtAddress").val(result.ltPOslave[0].vendor_address);
	$("#txtPhone").val(result.ltPOslave[0].vm);

	$("#hiddenVendoraddId").val(result.ltPOslave[0].vAddrId);

	$("#vendorState").append(
			'<option value="' + result.ltPOslave[0].vAddrId + '" >'
					+ result.ltPOslave[0].vendor_state + '</option> ');
	$('#stateIds').val(result.ltPOslave[0].stateId);
	var vengst = result.gstNo;
	if (vengst == null || vengst == "" || vengst == undefined) {
		vengst = "0";
	}
	$('#vengstNo').val(vengst);

	$("#txtPOId").val($("#txtinvoice" + invoice).html());
	$("#poId").val($("#txtinvoice" + invoice).html());
	/*
	 * alert($("#txtPOId").val());
	 */
	$("#poDiv").show("show");

	$('#po_pending_data').modal('hide');
	var r = result.ltPOslave;

	totalRowCount = result.ltPOslave.length;

	var divContent = "";
	var rowCount = 1;
	for ( var i = 0; i < r.length; i++) {
		divContent = divContent
				+ " <tr id='remove"
				+ (rowCount)
				+ "'><td><label  class=' input-SmallText'>"
				+ (rowCount)
				+ "</label></td>"
				+ "<input type='hidden' id='hiddenProductId"
				+ (rowCount)
				+ "' name='ltPurSlave["
				+ (rowCount - 1)
				+ "].productMaster.productId' value='"
				+ r[i].product_id
				+ "' /> <input "
				+ "type='hidden' id='hiddenCurrentRow' value='0' />"

				+ "<input type='hidden' id='textBatchId"
				+ (rowCount)
				+ "' name='ltPurSlave["
				+ (rowCount - 1)
				+ "].productMaster.batchMaster[0].batchId' />"

				+ "<td><input type='text' name='ltPurSlave["
				+ (rowCount - 1)
				+ "].productMaster.productName' autocomplete='off' id='textProductName"
				+ (rowCount)
				+ "' class='form-control input-SmallText' readonly='true' onkeypress='setValuesToAutocomplete(event,"
				+ rowCount
				+ ")' value='"
				+ r[i].product_name
				+ "'/></td>"

				+ "<td style='display:none;'><input name='textAvlQty' type='text' class='form-control input-SmallText' id='textAvlQty"
				+ rowCount
				+ "' readonly='true' tabindex='-1' /></td>"

				+ "<td><input type='text' name='ltPurSlave["
				+ (rowCount - 1)
				+ "].productMaster.productUnit' id='textUnit"
				+ (rowCount)
				+ "'  class='form-control input-SmallText' readonly='true' tabindex='-1' value='"
				+ r[i].product_uom_unit
				+ "'/>"

				+ "</td><td><input type='text' name='ltPurSlave["
				+ (rowCount - 1)
				+ "].productMaster.packType' id='textPack"
				+ (rowCount)
				+ "' readonly='true' class='form-control input-SmallText' tabindex='-1' value='"
				+ r[i].pack_type
				+ "' /></td>"

				+ "<td><input name='ltPurSlave["
				+ (rowCount - 1)
				+ "].productMaster.compShortName' id='textCom"
				+ (rowCount)
				+ "' readonly='true' type='text' class='form-control input-SmallText' tabindex='-1' value='"
				+ r[i].comp_name
				+ "'/></td>"

				+ "<td><input name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purSlaveBillRate' type='text' id='billRate"
				+ (rowCount)
				+ "' class='form-control input-SmallText' value='"
				+ r[i].poSlaveRate
				+ "' onblur='calculatePopUpTotalAmount("
				+ rowCount
				+ "),calculateDiscount("
				+ rowCount
				+ ");' /></td>"

				+ "<td><input type='text' name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purSlaveQty' id=textQty"
				+ (rowCount)
				+ " class='form-control input-SmallText'  value='"
				+ r[i].poSlaveQty
				+ "' onblur='calculatePopUpTotalAmount("
				+ rowCount
				+ "),isNumber(txtQty);'/></td>"

				+ "<td><input type='text' name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purSlaveScheme' value='"
				+ Math.round(r[i].poSlaveScheme)
				+ "' id=textSchm"
				+ (rowCount)
				+ " class='form-control input-SmallText' /></td>"

				+ "<td><input type='text' name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purSlaveSchemeAmt' value='0' id=textSchmAmt"
				+ (rowCount)
				+ " class='form-control input-SmallText' onblur='funSchemeAmt("
				+ (rowCount)
				+ ")'/></td>"

				+ "<td><input name='ltPurSlave["
				+ (rowCount - 1)
				+ "].productMaster.batchMaster[0].batchCode' id=textBatch"
				+ (rowCount)
				+ "  type='text' class='form-control input-SmallText batchclass' onblur='checkBatchAvailability(this.value);' value='' /></td>"

				+ "<td><input name='ltPurSlave["
				+ (rowCount - 1)
				+ "].productMaster.batchMaster[0].batchExpDate' id=textExpiry"
				+ (rowCount)
				+ "  type='text' class='form-control input-SmallText'  onblur='isExpiryDateGRN("
				+ rowCount
				+ ");' value=''/></td>"

				+ "<td><input name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purDisc' id='textDisc"
				+ (rowCount)
				+ "' type='text' class='form-control input-SmallText' value='0'  onblur='calculateDiscount("
				+ rowCount
				+ ");' onchange='chkDiscount();'/></td>"

				+ "<td><input name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purHsn' id='textHsn"
				+ (rowCount)
				+ "' type='text' class='form-control input-SmallText' value='"
				+ r[i].hsn
				+ "'  readonly='true' tabindex='-1'/></td>"

				+ "<td><input name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purVat' id='textNewVat"
				+ (rowCount)
				+ "' type='text' class='form-control input-SmallText' value='"
				+ r[i].poSlaveVat
				+ "'  /></td>"

				+ "<td><input name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purIgst' id='textIgst"
				+ (rowCount)
				+ "' type='text' class='form-control input-SmallText' value='"
				+ r[i].poIgst
				+ "'  /></td>"

				+ "<td style='display: none'><input name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purCess' id='textCess"
				+ (rowCount)
				+ "' type='text' class='form-control input-SmallText' value='"
				+ r[i].poCess
				+ "'  readonly='true' tabindex='-1'/></td>"

				+ "<td style='display: none'><input name='' id='textPrft"
				+ (rowCount)
				+ "' type='text' class='form-control input-SmallText' readonly='true' tabindex='-1'/></td>"

				+ "<td><input name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purSlaveMrp' id='textMrp"
				+ (rowCount)
				+ "' type='text' class='form-control input-SmallText' value='"
				+ r[i].poSlaveMrp
				+ "' onblur='setRateValue("
				+ rowCount
				+ "),calculateProffit("
				+ rowCount
				+ ");' /></td>"
				
				+ "<td style='display: none'><input name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purslaverate' id='textRate"
				+ (rowCount)
				
				+ "' type='text' class='form-control input-SmallText' value='" 
				+  r[i].poSlaveMrp
				+ "'readonly='true' tabindex='-1'/></td>"

				//+ "' type='text' class='form-control input-SmallText' readonly='true' tabindex='-1'/></td>"

				+ "<td style='display: none;'><input type='text' name='ltPurSlave["
				+ (rowCount - 1)
				+ "].purSlavePurchaseRate' class='form-control input-SmallText' id='textPurchaseRate"
				+ (rowCount)
				+ "' readonly='true'/></td>"

				+ "<td style='display: none;'><input type='text'  class='form-control input-SmallText' id='textDiscAmt"
				+ (rowCount)
				+ "' readonly='true'/></td>"

				+ "<td style='display: none;'><input type='text'  class='form-control input-SmallText' id='textVatAmt"
				+ (rowCount) + "' readonly='true'/></td>"

				/*
				 * + "<td style='display: none;'><input type='text'
				 * class='form-control input-SmallText' name='ltPurSlave[" +
				 * (rowCount - 1) + "].purchaseEntrySlaveIssueQty'
				 * id='textPurIssueQty" + (rowCount) + "' readonly='true' /></td>"
				 */

				+ "<td><input type='text' id='textAmount" + (rowCount)
				+ "' class='form-control input-SmallText'  name='ltPurSlave["
				+ (rowCount - 1) + "].purSlaveAmt' "
				+ " readonly='true' tabindex='-1'/></td>"

				+ "<td><input type='checkbox' name='deleteGroup' value='"
				+ (rowCount) + "' id='deleteGroup" + (rowCount) + "'></td>";

		rowCount++;
		$("#RowCount").val(i + 1);
	}
	$('#DRRDiv').html(divContent);
	calculatePopUpTotalAmount(rowCount-1);
}

/**
 * @Code : get next auto increment id
 * @return
 **/
function getNextAutoIncrement() {

	var inputs = [];

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/purchase/getNextAutoIncrement",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			$("#txtOrderNo1").val(r);

		}
	});

	return true;
}
/**
 * @Code : check gross amount
 * @return
 **/
function CheckGrossAmt() {
	var GrossAmt = parseFloat($('#txtGross').val());
	var cd = 0, itemDisc = 0;
	if ($('#txtCD1').val() == '' || $('#txtCD1').val() == null) {
		$('#txtCDAmt').val(0);
		$('#txtCD1').val(0);
	} else
		cd = parseFloat($('#txtCD1').val());

	if ($('#txtItemDisc').val() == '' || $('#txtItemDisc').val() == null)
		$('#txtItemDisc').val(0);
	else
		itemDisc = parseFloat($('#txtItemDisc').val());

	var totalDiscAmt = GrossAmt * (cd / 100);

	var totalDisc = totalDiscAmt + itemDisc
			+ parseFloat($('#txtSchmDisc').val())
			+ parseFloat($('#txtSplDisc').val())
			+ parseFloat($('#txtdebitAmt1').val());

	if (totalDisc > GrossAmt) {
		alert("Less Amount should be less than Gross Amount!");
	} else {
		var gstSum = 0.0;
		var igstSum = 0.0;
		var cessSum = 0.0;
		var gstTotal = 0.0;
		var rowLen = 0;

		rowLen = $("#DRRDiv tr:visible").length;

		for ( var j = 1; j <= rowLen; j++) {

			if ($("#remove" + j).is(":visible")) {

				if ($("#textProductName" + j).val() !== ""
						&& $("#textProductName" + j).val() !== null)
					if ($("#textAmount" + j).val()) {

						if (parseFloat($('#textNewVat' + j).val()) > 0)
							gstSum = gstSum
									+ (parseFloat($('#textAmount' + j).val()) - ((parseFloat($(
											'#textAmount' + j).val())
											* (parseFloat($('#txtCD1').val()) + parseFloat($(
													'#textDisc' + j).val())) / 100)))
									* (parseFloat($('#textNewVat' + j).val()) / 100);
						else if (parseFloat($('#textIgst' + j).val()) > 0)
							igstSum = igstSum
									+ (parseFloat($('#textAmount' + j).val()) - ((parseFloat($(
											'#textAmount' + j).val())
											* (parseFloat($('#txtCD1').val()) + parseFloat($(
													'#textDisc' + j).val())) / 100)))
									* (parseFloat($('#textIgst' + j).val()) / 100);
						else if (parseFloat($('#textCess' + j).val()) > 0)
							cessSum = cessSum
									+ (parseFloat($('#textAmount' + j).val()) - ((parseFloat($(
											'#textAmount' + j).val())
											* (parseFloat($('#txtCD1').val()) + parseFloat($(
													'#textDisc' + j).val())) / 100)))
									* (parseFloat($('#textCess' + j).val()) / 100);

					} else {
						$("#txtSchmDisc").val(0);
						$("#txtSplDisc").val(0);
						$("#txtdebitAmt1").val(0);
						$("#txtCD1").val(0);
						$("#txtCDAmt").val(0);
						return;
					}
			}
		}

		gstTotal = gstSum + igstSum + cessSum;

		$('#txtCDAmt').val(totalDiscAmt.toFixed(2));
		$('#txtVat5').val(gstSum.toFixed(2));
		$('#txtVat12').val(igstSum.toFixed(2));
		$('#txtlbt').val(cessSum.toFixed(2));
		$('#textVat').val(gstTotal.toFixed(2));
		$('#txtTotalVat').val(gstTotal.toFixed(2));
		$('#txtLess')
				.val((+totalDiscAmt + +$('#txtItemDisc').val()).toFixed(2));

		var netVal = GrossAmt - parseFloat($('#txtLess').val())
				+ parseFloat($('#txtAdd').val())
				+ parseFloat($('#textVat').val());
		$('#txtNetAmt').val(Math.round(netVal));
	}
}
/**
 * @Code : set rate value to row
 * @return
 **/
function setRateValue(rowCall) {
	// Added By Bilal
	if (rowCall > 0) {
		$('#textRate' + rowCall).val($('#textMrp' + rowCall).val());
		calculateGrossAmount();
		calculateVat();
		calculateTotalTax();
		calculateTotalDiscount();
		calculateTotalLess();
		CheckGrossAmt();
	}
	$('#txtRate').val($('#txtMrp').val());
}
/**
 * @Code : calculate total amount
 * @return
 **/
function calculateTotalAmount(rowNumber) {
	var qty = parseFloat($('#textQty' + rowNumber).val());
	var purRate = parseFloat($('#textRate' + rowNumber).val());
	$('#textAmount' + rowNumber).val((qty * purRate));
	calculateGrossAmount();
}
/**
 * @Code : calculate popup total amount
 * @return
 **/
function calculatePopUpTotalAmount(rowcall) {
	setNewRate(rowcall);

	var textQty = $('#textQty' + rowcall).val();
	$('#txtQty').val(textQty);
	var billRate = $('#billRate' + rowcall).val();
	$('#txtBillRate').val(billRate);

	var totalAmt = 0;
	if ($('#txtQty').val() != '' && $('#txtBillRate').val() != '')
		totalAmt = parseFloat($('#txtBillRate').val())
				* parseFloat($('#txtQty').val());
	//totalAmt = totalAmt - (totalAmt * $('#textDisc' + rowcall).val() / 100);
	$('#txtAmount').val(totalAmt.toFixed(2));

	$('#textAmount' + rowcall).val(totalAmt.toFixed(2));
	calculateVatAmount(rowcall);

	calculatGSTTotalandGross();

	calculateFun(rowcall);

}
/**
 * @Code : calculate fun
 * @return
 **/
function calculateFun(id) {
	var qty = $("#textQty" + id).val();
	var schemeAmt = $("#textSchmAmt" + id).val();
	var schemeQty = $("#textSchm" + id).val();
	var billRate = $("#billRate" + id).val();
	var gst = $("#textNewVat" + id).val();
	var disc = $("#textDisc" + id).val();

	if (schemeQty > 0) {
		billRate = billRate - (billRate * disc / 100);
		billRate = billRate + (billRate * gst / 100);
		billRate = billRate * qty;
		billRate = billRate / (+qty + +schemeQty);
		$("#textPurchaseRate" + id).val(parseFloat(billRate).toFixed(2));
	}

	if (schemeAmt > 0 && schemeAmt != null) {
		var amt = $("#textAmount" + id).val();
		var purRate = $("#textPurchaseRate" + id).val();
		amt = schemeAmt / amt;
		amt = purRate - amt;
		$("#textPurchaseRate" + id).val(parseFloat(amt).toFixed(2));
	}

	calculatGSTTotalandGross();
}
/**
 * @Code : calculate purchase rate
 * @return
 **/
function calculatePurchaseRate() {
	var rowLen = $("#DRRDiv tr:visible").length;

	for ( var rowCall = 1; rowCall <= rowLen; rowCall++) {
		if ($("#remove" + rowCall).is(":visible")) {
			if ($('#textProductName' + rowCall).val() == ''
					&& $('#textProductName' + rowCall).val() == null) {
				return;
			}
			var billRate = $("#billRate" + rowCall).val();
			var vatAmount = 0;
			var discount = 0;
			var total = 0;

			if (($('#textIgst' + rowCall).val() != '' && $(
					'#textIgst' + rowCall).val().length > 0)
					|| ($('#textNewVat' + rowCall).val() != '' && $(
							'#textNewVat' + rowCall).val().length > 0))
				vatAmount = +parseFloat($('#textNewVat' + rowCall).val())
						+ +parseFloat($('#textIgst' + rowCall).val());

			if ($('#textDisc' + rowCall).val() != ''
					&& $('#textDisc' + rowCall).val().length > 0)
				discount = parseFloat($('#textDisc' + rowCall).val());

			var qty = $("#textQty" + rowCall).val();
			var unit = $("#textUnit" + rowCall).val();
			var schemeQty = $("#textSchm" + rowCall).val();
			var amt = (billRate / unit) * schemeQty;
			billRate = ((billRate * qty) - amt) / qty;

			if (billRate >= discount) {
				total = billRate - (billRate * discount / 100);
				total = total + (total * vatAmount / 100);

				if (total != '')
					$('#textPurchaseRate' + rowCall).val(total.toFixed(2));
			}

			// calculateProffit(rowCall);
		}
	}
}
/**
 * @Code : calculate CD amount
 * @return
 **/
function calculateCDAmt() {
	var gross = 0;
	var itemDis = 0;
	var cd = 0;
	var cdAmt = 0;
	var amt = 0;
	if ($('#txtGross').val() != '' && $('#txtGross').val().length > 0) {
		gross = parseFloat($('#txtGross').val());
	}
	if ($('#txtItemDisc').val() != '' && $('#txtItemDisc').val().length > 0) {
		itemDis = parseFloat($('#txtItemDisc').val());
	}
	if ($('#txtCD1').val() != '' && $('#txtCD1').val().length > 0) {
		cd = parseFloat($('#txtCD1').val());
	}

	amt = (gross - itemDis);

	cdAmt = amt * (cd / 100);

	$('#txtCDAmt').val(cdAmt.toFixed(2));

	calculateVatDisc();
	calculateTotalLess();
}
/**
 * @Code : calculate total CD amount for view
 * @return
 **/
function calculateCDAmtForView() {
	var gross = 0;
	var itemDis = 0;
	var cd = 0;
	var cdAmt = 0;
	var amt = 0;
	if ($('#txtGross').val() != '' && $('#txtGross').val().length > 0) {
		gross = parseFloat($('#txtGross').val());
	}
	if ($('#txtItemDisc').val() != '' && $('#txtItemDisc').val().length > 0) {
		itemDis = parseFloat($('#txtItemDisc').val());
	}
	if ($('#txtCD1').val() != '' && $('#txtCD1').val().length > 0) {
		cd = parseFloat($('#txtCD1').val());
	}
	amt = (gross - itemDis);

	cdAmt = amt * (cd / 100);

	$('#txtCDAmt').val(cdAmt.toFixed(2));

	if ($("#rdoCashCredit").is(":checked")) {
		document.getElementById("demo").innerHTML = "<h5><b><font color='red'>Cash/Credit</font></b></h5>";
	} else if ($("#rdoCash").is(":checked")) {
		document.getElementById("demo").innerHTML = "<h5><b><font color='red'>Cash</font></b></h5>";
	} else if ($("#rdoCard").is(":checked")) {
		document.getElementById("demo").innerHTML = "<h5><b><font color='red'>Card</font></b></h5>";
	}

}
/**
 * @Code : calculat vat with disc
 * @return
 **/

function calculateVatDisc() {

	$('#txtVat5').val(0);
	$('#txtVat12').val(0);
	var billRate = 0;
	var disAmt = 0;
	var vat = 0;
	var vatAmt = 0;
	var qty = 0;
	var vat5 = 0;
	var vat12 = 0;
	for ( var i = 1; i < $('#RowCount').val(); i++) {
		if ($("#hiddenProductId" + i).val() != null
				&& $('#hiddenProductId' + i).val() != "") {
			if ($('#billRate' + i).val() != ''
					&& $('#billRate' + i).val().length > 0)
				billRate = parseFloat($('#billRate' + i).val());

			if ($('#textDisc' + i).val() != ''
					&& $('#textDisc' + i).val().length > 0)
				Dis = parseFloat($('#textDisc' + i).val());

			if ($('#textDiscAmt' + i).val() != ''
					&& $('#textDiscAmt' + i).val().length > 0)
				disAmt = parseFloat($('#textDiscAmt' + i).val());
			else
				disAmt = 0;

			if ($('#textQty' + i).val() != ''
					&& $('#textQty' + i).val().length > 0)
				qty = parseFloat($('#textQty' + i).val());

			if ($('#textNewVat' + i).val() != ''
					&& $('#textNewVat' + i).val().length > 0)
				vat = parseFloat($('#textNewVat' + i).val());
			vatAmt = (qty * (billRate - disAmt));

			if ($('#textNewVat' + i).val() == 6
					|| $('#textNewVat' + i).val() == 6) {
				if ($('#txtVat5').val() != '' && $('#txtVat5').val().length > 0) {
					vat5 = vat5 + (vatAmt * (vat / 100));
					$('#txtVat5').val((vat5).toFixed(2));
				} else {
					vat5 = vat5 + (vatAmt * (vat / 100));
					$('#txtVat5').val((vat5).toFixed(2));
				}
			} else {
				if ($('#txtVat12').val() != ''
						&& $('#txtVat12').val().length > 0) {
					vat12 = vat12 + (vatAmt * (vat / 100));
					$('#txtVat12').val((vat12).toFixed(2));
				} else {
					vat12 = vat12 + (vatAmt * (vat / 100));
					$('#txtVat12').val((vat12).toFixed(2));
				}
			}
		}

	}

	var cd1 = 0;
	var lbt = 0;
	var cst = 0;
	var vatDis5 = 0;
	var vatDis12 = 0;
	vat5 = vat5.toFixed(2);
	vat12 = vat12.toFixed(2);

	if ($('#txtCD1').val() != '' && $('#txtCD1').val().length > 0) {
		cd1 = parseFloat($('#txtCD1').val());
		vatDis5 = vat5 - (vat5 * (cd1 / 100));
		vatDis12 = vat12 - (vat12 * (cd1 / 100));

		if ($('#txtVat5').val() != '' && $('#txtVat5').val().length > 0)
			$('#txtVat5').val((vatDis5).toFixed(2));

		if ($('#txtVat12').val() != '' && $('#txtVat12').val().length > 0)
			$('#txtVat12').val((vatDis12).toFixed(2));
	}

	var speDis = 0;
	if ($('#txtSplDisc').val() != '' && $('#txtSplDisc').val().length > 0) {

		speDis = parseFloat($('#txtSplDisc').val());
		vat12 = parseFloat($('#txtVat12').val());
		vat5 = parseFloat($('#txtVat5').val());

		var resultVat5 = 6 * (speDis / 100);
		var minusvat5 = vat5 - resultVat5;

		var resultVat12 = 13.5 * (speDis / 100);
		var minusvat12 = vat12 - resultVat12;

		if ($('#txtVat5').val() != '' && $('#txtVat5').val().length > 0
				&& speDis <= vat5)
			$('#txtVat5').val((minusvat5).toFixed(2));

		if ($('#txtVat12').val() != '' && $('#txtVat12').val().length > 0
				&& speDis <= vat12)
			$('#txtVat12').val((minusvat12).toFixed(2));

	}

	$('#txtTotalVat').val(
			(parseFloat(vatDis5) + parseFloat(vatDis12)).toFixed(2));

	if ($('#txtlbt').val() != '' && $('#txtlbt').val().length > 0)
		lbt = parseFloat($('#txtlbt').val());

	if ($('#txtcst').val() != '' && $('#txtcst').val().length > 0)
		cst = parseFloat($('#txtcst').val());

	totalTax = parseFloat(vatDis5) + parseFloat(vatDis12) + parseFloat(lbt)
			+ parseFloat(cst);

	$('#textVat').val((totalTax).toFixed(2));
	calculateVatWithoutDisc();
	calculateTotalTax();

}
/**
 * @Code :calculat vat without disc
 * @return
 **/

function calculateVatWithoutDisc() {

	var billRate = 0;
	var disAmt = 0;
	var vat = 0;
	var vatAmt = 0;
	var qty = 0;
	var vat5 = 0;
	var vat12 = 0;
	for ( var i = 1; i < $('#RowCount').val(); i++) {
		if ($("#remove" + i).is(":visible")) {
			if ($("#hiddenProductId" + i).val() != null
					&& $('#hiddenProductId' + i).val() != "") {
				if ($('#billRate' + i).val() != ''
						&& $('#billRate' + i).val().length > 0)
					billRate = parseFloat($('#billRate' + i).val());

				if ($('#textDisc' + i).val() != ''
						&& $('#textDisc' + i).val().length > 0)
					Dis = parseFloat($('#textDisc' + i).val());

				if ($('#textDiscAmt' + i).val() != ''
						&& $('#textDiscAmt' + i).val().length > 0)
					disAmt = parseFloat($('#textDiscAmt' + i).val());
				else
					disAmt = 0;

				if ($('#textQty' + i).val() != ''
						&& $('#textQty' + i).val().length > 0)
					qty = parseFloat($('#textQty' + i).val());

				if ($('#textNewVat' + i).val() != ''
						&& $('#textNewVat' + i).val().length > 0)
					vat = parseFloat($('#textNewVat' + i).val());
				vatAmt = (qty * (billRate - disAmt));

				if ($('#textNewVat' + i).val() == 6
						|| $('#textNewVat' + i).val() == 6) {
					if ($('#txtVat5withoutDisc').val() != ''
							&& $('#txtVat5withoutDisc').val().length > 0) {
						vat5 = vat5 + (vatAmt * (vat / 100));
						$('#txtVat5withoutDisc').val((vat5).toFixed(2));
					} else {
						vat5 = vat5 + (vatAmt * (vat / 100));
						$('#txtVat5withoutDisc').val((vat5).toFixed(2));
					}
				} else {
					if ($('#txtVat12withoutDisc').val() != ''
							&& $('#txtVat12withoutDisc').val().length > 0) {
						vat12 = vat12 + (vatAmt * (vat / 100));
						$('#txtVat12withoutDisc').val((vat12).toFixed(2));
					} else {
						vat12 = vat12 + (vatAmt * (vat / 100));
						$('#txtVat12withoutDisc').val((vat12).toFixed(2));
					}
				}
			}
		}
	}

}
/**
 * @Code :calculat net amount
 * @return
 **/

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
	var tot = total + vat;
	$('#txtNetAmt').val(Math.round(tot));
	resetAllValues();
}
/**
 * @Code :calculat vat amount
 * @return
 **/

function calculateVatAmount(rowcall) {
	// Added By Bilal
	if (rowcall > 0) {
		$('#txtVat').val($('#textNewVat' + rowcall).val());
		$('#txtIgst').val($('#textIgst' + rowcall).val());
		$('#txtCess').val($('#textCess' + rowcall).val());
		$('#txtBillRate').val($('#billRate' + rowcall).val());
	}

	if (($('#txtVat').val() > 0 && $('#txtIgst').val() > 0)
			|| ($('#txtVat').val() > 0 && $('#txtCess').val() > 0)
			|| ($('#txtCess').val() > 0 && $('#txtIgst').val() > 0)) {
		alert("Enter either GST or IGST or CESS only...");
		$('#txtVat').val(0);
		$('#txtCess').val(0);
		$('#txtIgst').val(0);
		$('#txtVatAmt').val(0);
		return;
	}

	var billRate = 0;
	var discAmt = 0;
	var vat = 0;
	var amount = 0;

	if ($('#txtBillRate').val() != '' && $('#txtBillRate').val().length > 0)
		billRate = parseFloat($('#txtBillRate').val());

	if ($('#txtDiscAmt').val() != '' && $('#txtDiscAmt').val().length > 0)
		discAmt = parseFloat($('#txtDiscAmt').val());

	if ($('#txtVat').val() != '' && $('#txtVat').val() > 0)
		vat = parseFloat(parseFloat($('#txtVat').val()) / 100);

	if ($('#txtIgst').val() != '' && $('#txtIgst').val() > 0)
		vat = parseFloat(parseFloat($('#txtIgst').val()) / 100);

	if ($('#txtCess').val() != '' && $('#txtCess').val() > 0)
		vat = parseFloat(parseFloat($('#txtCess').val()) / 100);

	if (billRate >= discAmt) {
		amount = parseFloat(vat) * parseFloat(billRate - discAmt);
		$('#txtVatAmt').val(amount.toFixed(2));
	}
}
/**
 * @Code :calculat vat 
 * @return
 **/
function calculateVat() {
	$('#txtVat5').val(0);
	$('#txtVat12').val(0);
	$('#txtlbt').val(0);
	var igst = 0;
	var cess = 0;
	var disAmt = 0;
	var vat = 0.0;
	var vatAmt = 0;
	var igstAmt = 0;
	var cessAmt = 0;
	var qty = 0;
	var Dis = 0;

	for ( var i = 1; i < $('#RowCount').val(); i++) {
		if ($("#remove" + i).is(":visible")) {
			var billRate = 0;

			if ($("#hiddenProductId" + i).val() != null
					&& $('#hiddenProductId' + i).val() != "") {

				if ($('#billRate' + i).val() != ''
						&& $('#billRate' + i).val().length > 0)
					billRate = parseFloat($('#billRate' + i).val());

				if ($('#txtCD1').val() != '' && $('#txtCD1').val().length > 0)
					Dis = parseFloat($('#txtCD1').val());

				if ($('#textDiscAmt' + i).val() != ''
						&& $('#textDiscAmt' + i).val().length > 0)
					disAmt = parseFloat($('#textDiscAmt' + i).val());
				else
					disAmt = 0;

				if ($('#textQty' + i).val() != ''
						&& $('#textQty' + i).val().length > 0)
					qty = parseFloat($('#textQty' + i).val());

				if ($('#textNewVat' + i).val() != ''
						&& $('#textNewVat' + i).val() > 0) {
					vat = parseFloat($('#textNewVat' + i).val());
					vatAmt = (qty * (billRate - disAmt));
					vatAmt = vatAmt - (vatAmt * Dis * 0.01);

					$('#txtVat5').val(
							(+$('#txtVat5').val() + +vatAmt * (vat / 100))
									.toFixed(2));
				}
				if ($('#textIgst' + i).val() != ''
						&& $('#textIgst' + i).val() > 0) {
					igst = parseFloat($('#textIgst' + i).val());
					igstAmt = (qty * (billRate - disAmt));
					igstAmt = igstAmt - (igstAmt * Dis * 0.01);

					$('#txtVat12').val(
							(+$('#txtVat12').val() + +igstAmt * (igst / 100))
									.toFixed(2));
				}
				if ($('#textCess' + i).val() != ''
						&& $('#textCess' + i).val() > 0) {
					cess = parseFloat($('#textCess' + i).val());
					cessAmt = (qty * (billRate - disAmt));
					cessAmt = cessAmt - (cessAmt * Dis * 0.01);

					$('#txtlbt').val(
							(+$('#txtlbt').val() + +cessAmt * (cess / 100))
									.toFixed(2));
				}

			}
		}
	}

	calculateVatWithoutDisc();
}
/**
 * @Code :calculat profit of hospital
 * @return
 **/
function calculateProffit(rowCall) {
	if (rowCall > 0) {
		$('#txtRate').val($('#textRate' + rowCall).val());
	}
	var rate = 0;
	var purRate = 0;
	var total = 0;
	if ($('#txtRate').val() != '' && $('#txtRate').val().length > 0
			&& $('#txtRate').val() > 0)
		rate = parseFloat($('#txtRate').val());

	if ($('#txtPRate').val() != '' && $('#txtPRate').val().length > 0
			&& $('#txtPRate').val() > 0)
		purRate = parseFloat($('#txtPRate').val());

	if (rate >= purRate) {
		total = ((rate - purRate) / rate) * 100;
		$('#profitDiv').html(Math.round(total));
		$('#textPrft' + rowCall).val(Math.round(total));
	} else {
		$('#profitDiv').html(0);
		$('#textPrft' + rowCall).val(0);
	}
	// Added By Bilal
	if (rowCall > 0) {
		$('#textRate' + rowCall).val($('#textMrp' + rowCall).val());
		calculateGrossAmount();
		calculateVat();
		calculateTotalTax();
		calculateTotalDiscount();
		calculateTotalLess();
		CheckGrossAmt();
	}
}
/**
 * @Code :calculate discount
 * @return
 **/
function calculateDiscount(rowCall) {

	$('#txtBillRate').val($('#billRate' + rowCall).val());
	$('#txtDisc').val($('#textDisc' + rowCall).val());

	if (($('#txtBillRate').val()) != '' && $('#txtDisc').val() != '') {

		var billRate = parseFloat($('#txtBillRate').val());
		var discPercent = parseFloat($('#txtDisc').val());

		var disc = parseFloat(billRate / 100);
		var amount = parseFloat(disc) * parseFloat(discPercent);
		$('#txtDiscAmt').val(amount.toFixed(2));
		calculateVatAmount(rowCall);
	}

}

/**
 * @Code :calculate discount amount
 * @return
 **/
function calculateGrossAmount() {
	var total = 0;
	for ( var i = 1; i <= $('#RowCount').val(); i++) {
		if ($("#remove" + i).is(":visible"))
			if ($('#textAmount' + i).val() != ''
					&& $('#textAmount' + i).val().length > 0) {
				total = ((parseFloat(total) + parseFloat($('#textAmount' + i)
						.val())));

			}

	}

	$('#txtGross').val(total.toFixed(2));
	if ($('#txtLess').val() > 0) {
		CheckGrossAmt();
	}
	calculateNetAmount();
}
/**
 * @Code :calculat total discount amount
 * @return
 **/
function calculateTotalDiscount() {
	
	var rowCount = $('#purchaseTable tr').length;
	var total = 0;
	
	for ( var i = 1; i < rowCount; i++) {
		if ($("#remove" + i).is(":visible")) {
			
			if ($('#billRate' + i).val() != '') {

				var billRate = 0;
				if ($('#textDisc' + i).val() != ''
						&& $('#textDisc' + i).val() > 0) {

					var discPercent = 0;
					billRate = parseFloat($('#billRate' + i).val());

					// add cal on disc per
					discPercent = parseFloat($('#textDisc' + i).val());

					var disc = parseFloat(billRate / 100);
					var qty = $('#textQty' + i).val();
					total = (total + ((disc * discPercent)) * qty);
				}
			}
			$('#txtItemDisc').val(total.toFixed(2));
		}
	}

}
/**
 * @Code :calculate total less amount
 * @return
 **/
function calculateTotalLess() {

	var itemDisc = 0;
	var schmDisc = 0;
	var splDisc = 0;
	var debitAmt1 = 0;
	var cd1 = 0;
	var totalLess = 0;

	if ($('#txtItemDisc').val() != '' && $('#txtItemDisc').val().length > 0)
		itemDisc = parseFloat($('#txtItemDisc').val());

	if ($('#txtSchmDisc').val() != '' && $('#txtSchmDisc').val().length > 0)
		schmDisc = parseFloat($('#txtSchmDisc').val());

	if ($('#txtSplDisc').val() != '' && $('#txtSplDisc').val().length > 0)
		splDisc = parseFloat($('#txtSplDisc').val());

	if ($('#txtdebitAmt1').val() != '' && $('#txtdebitAmt1').val().length > 0)
		debitAmt1 = parseFloat($('#txtdebitAmt1').val());

	if ($('#txtCDAmt').val() != '' && $('#txtCDAmt').val().length > 0)
		cd1 = parseFloat($('#txtCDAmt').val());

	totalLess = parseFloat(itemDisc) + parseFloat(schmDisc)
			+ parseFloat(splDisc) + parseFloat(debitAmt1) + parseFloat(cd1);

	$('#txtLess').val(totalLess.toFixed(2));

	calculateNetAmount();
}
/**
 * @Code :calculate total added amount
 * @return
 **/
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

	$('#txtAdd').val(totalAdd);
	calculateNetAmount();
}
/**
 * @Code :calculate total tax amount
 * @return
 **/
function calculateTotalTax() {
	var vat5 = 0;
	var vat12 = 0;
	var lbt = 0;
	var cst = 0;
	var totalTax = 0;
	if ($('#txtVat5').val() != '' && $('#txtVat5').val().length > 0)
		vat5 = parseFloat($('#txtVat5').val());

	if ($('#txtVat12').val() != '' && $('#txtVat12').val().length > 0)
		vat12 = parseFloat($('#txtVat12').val());

	if ($('#txtlbt').val() != '' && $('#txtlbt').val().length > 0)
		lbt = parseFloat($('#txtlbt').val());

	if ($('#txtcst').val() != '' && $('#txtcst').val().length > 0)
		cst = parseFloat($('#txtcst').val());

	$('#txtTotalVat').val((parseFloat(vat5) + parseFloat(vat12)).toFixed(2));

	totalTax = parseFloat(vat5) + parseFloat(vat12) + parseFloat(lbt)
			+ parseFloat(cst);

	$('#textVat').val((totalTax).toFixed(2));
	$('#txtTotalVat').val((totalTax).toFixed(2));
	calculateNetAmount();
}

function splitPurchase(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenVendorId').val(arr[1]);

			jQuery
					.ajax({
						async : true,
						type : "GET",
						data : {
							"vendorId" : arr[1]
						},
						url : "../../pharmacy/vendoraddress/getAllAddressOfVendor",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {
							alert("error");
						},
						success : function(r) {

							$("#vendorState").empty();
							for ( var i = 0; i < r.length; i++) {
								$("#vendorState").append(
										'<option value="' + r[i].stateId
												+ '" >' + r[i].state
												+ '</option> ');
							}

							$('#stateIds').val(r[0].stateId);
							$("#txtAddress").val(r[0].vendorAddress);
							$("#txtPhone").val(r[0].vendorMobileNumber);
							$("#vengstNo").val(r[0].gstNo);

							$("#hiddenVendoraddId").val(
									r[0].vendorAddressId);

						}
					});

		}
	} else {
		$('#hiddenVendorId').val(0);
	}

	$('#txtBillNo').focus();
}
/*******************************************************************************
 * 
 * @Code :For Dynamically change the address
 ******************************************************************************/
function changeVendorAdd() {

	var searchBox = $('#searchBox').val();

	if (searchBox == "" || searchBox == null || searchBox == undefined) {
		return false;
	}
	var stateid = $("#vendorState").val();
	if (stateid == "" || stateid == null || stateid == undefined
			|| isNaN(stateid)) {
		stateid = 0;
	}
	if (stateid > 0) {

		jQuery.ajax({
			async : true,
			type : "GET",
			data : {
				"stateid" : stateid
			},
			url : "../../pharmacy/vendoraddress/changeVendorAdd",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {

				for ( var i = 0; i < r.lstvendadd.length; i++) {
					var mobileNo = r.lstvendadd[i].vendorMobileNumber;

					$("#hiddenVendoraddId")
							.val(r.lstvendadd[i].vendorAddressId);
					$("#txtAddress").val(r.lstvendadd[i].vendorAddress);
					if (mobileNo > 0) {
						$("#txtPhone").val(r.lstvendadd[i].vendorMobileNumber);
					} else {
						$("#txtPhone").val(r.lstvendadd[i].vendorLandline);
					}

					var vendorStateId = parseInt($('#stateIds').val());

					if (vendorStateId == r.lstvendadd[i].stateId) {
						for ( var i = 1; i < $('#RowCount').val(); i++) {
							$('#textNewVat' + i).val($('#textIgst' + i).val());
							$('#textIgst' + i).val(0);
						}
					} else {
						for ( var i = 1; i < $('#RowCount').val(); i++) {
							$('#textIgst' + i).val($('#textNewVat' + i).val());
							$('#textNewVat' + i).val(0);
						}
					}

				}

			}
		});
	}
}
/**
 * @Code :split Purchase Search
 * @return
 **/
function splitPurchaseSearch(content) {
	if (content != "") {
		var arr = content.split("-");

		$('#searchBox').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenVendorId1').val(arr[1]);
		}
	} else {
		$('#hiddenVendorId1').val(0);
	}
}
/**
 * @Code :cjeck batch availablity
 * @return
 **/
function checkBatchAvailability(number) {
	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			number : number
		},
		url : "../../pharmacy/purchase/checkBatchAvailability",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setBatchAvailibilityDetails(r);
		}
	});
}
/**
 * @Code :set batch availibilty
 * @return
 **/
function setBatchAvailibilityDetails(result) {
	if (result.length == 0) {
		alertify.success("Add New Batch");
		$("#txtExpiry").val('');
		$("#txtExpiry").prop("readonly", false);
		$("#hiddenBatchId").val('');

	} else {
		alertify.success("Batch Already Added");
		$("#txtExpiry").val(result[0].batchExpDate);
		//$("#txtExpiry").prop("readonly", true);
	}
}
/**
 * @Code :set split product content
 * @return
 **/
function splitProductContent(content, number) {

	if (content != "") {
		var arr = content.split("-");
		$('#textProductName' + number).val(arr[0]);

		if (arr.length > 1) {
			$('#hiddenProductId' + number).val(arr[1]);
			$('#textUnit' + number).val(arr[2]);
			$('#textPack' + number).val(arr[3]);
			$('#textCom' + number).val(arr[4]);
		}

	} else {
		$('#hiddenId').val(0);
	}

}
/**
 * @Code :split vendor address
 * @return
 **/
function splitVendorName(content) {
	if (content != "") {

		var arr = content.split("-");
		if (arr.length > 1) {
			if (arr[0] != '' && arr[0] > 0) {
				$('#txtLastPurchaseRate').val(arr[0]);
			}
			if (arr[1] != '' && arr[1] > 0) {
				$('#txtLastMrp').val(arr[1]);
			}

			$('#txtLastVendorName').val(arr[2]);

		}

	}
}
/**
 * @Code :search purchase id or grn id
 * @return
 **/
function searchPur(id) {
	resetAllValues();
	var inputs = [];
	inputs.push('vendorId=' + id);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/purchase/getPurchaseListbyVendorId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			if (r == "") {
				alert("Record not found!");
			}

			setTableContent(r);

		}
	});
}
/**
 * @Code :get Purchase list
 * @return
 **/
function getPurchaseList() {

	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "../../pharmacy/purchase/purchaseList",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			setTableContent(r);
		}
	});

	return true;
}
/**
 * @Code :delete GRN
 * @return
 **/
function deletePur(purId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
		reset();
		alertify.success("Record deleted successfully");

		var inputs = [];
		inputs.push('purId=' + purId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/purchase/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						if (r == true) {
						} else {
							$('#msgDiv')
									.html(
											"<div class='alert alter-danger'>Oops! Something went wrong..!</div>");
						}
						window.location.href = "view";
					}
				});

		return true;
	} else {

	}
}
/**
 * @Code :get last vendor name
 * @return
 **/
function getLastVendorName(pId) {

	var productId = pId;
	if (productId != '') {
		var inputs = [];
		inputs.push('ProductId=' + productId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/purchase/productLowestPurchaseDetail",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {

						splitVendorName(r);

					}
				});
		return true;
	}
}
/**
 * @Code :check bill number is available
 * @return
 **/
function IsAvailableBillNum(billNo) {

	if (billNo != ' ' && billNo.length > 0 && $('#hiddenVendorId').val() != ' '
			&& $('#hiddenVendorId').val().length > 0) {
		var inputs = [];
		inputs.push('BillNum=' + billNo);
		inputs.push('vendorId=' + $('#hiddenVendorId').val());

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/purchase/dublicateBillNum",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {

				if (r == true) {
					$('#check').html('');
					$('#txtBillNo').css('border-color', 'red');
					$('#check').append(
							"<i class='fa fa-times' style='color:red;' ></i>");
					$('#txtBillNo').val("");
					$("#txtBillNo").focus();
					alertify.error("Bill Number Already Exist");
				} else {
					$('#check').html('');
					$('#txtBillNo').css('border-color', '');
					$('#check').html("<i class='fa fa-check'></i>");
				}
			}

		});
	} else {
		$('#check').html('');
		$('#check').append("<i class='fa fa-times'></i>");
	}
	return true;
}
/**
 * @Code : get formatted date dd/mm/yyyy
 * @return
 **/

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
/**
 * @Code : search by purchase entry no
 * @return
 **/
function searchByPurchaseEntryNo(id) {
	var inputs = [];
	inputs.push('PurchaseEntryNo=' + id);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/purchase/searchByPurchaseEntryNo",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			if (r == "") {
				alert("Record not found!");
			}
			$("#searchBox1").val('');
			setTableContent(r);

		}
	});

	return true;
}
/**
 * @Code : set table
 * @return
 **/
function setTableContent(result) {
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		
		var BillDate= new Date(r[i].purBillDate).toLocaleDateString('en-GB');
		divContent = divContent
				+ " <tr> <td class='col-md-1 center'>"
				+ (i + 1)
				+ "<input type='hidden' id='purId"
				+ r[i].purId
				+ "' value='"
				+ r[i].purId
				+ "'></td> <td class='col-md-2 center'>"
				+ r[i].unitCount
				+ "<input type='hidden' id='purId"
				+ r[i].purId
				+ "' value='"
				+ r[i].purId
				+ "'></td> <td class='col-md-2 center'>"
				+ r[i].vendorMaster.vendorName
				+ "<input type='hidden' id='vendorName"
				+ r[i].purId
				+ "' value='"
				+ r[i].vendorMaster.vendorName
				+ "'></td> <td class='col-md-2 center'>"
				+ r[i].purBillNo
				+ "<input type='hidden' id='purBillNo"
				+ r[i].purId
				+ "' value='"
				+ r[i].purBillNo
				+ "'></td> <td class='col-md-2 center'>"
				+ r[i].purBillNo
				+ "<input type='hidden' id='purentryStatus"
				+ r[i].purId
				+ "' value='"
				+ r[i].delChalanNumber
				+ "'></td><td class='col-md-2 center'>"
				+ BillDate
				+ "<input type='hidden' id='purBillDate"
				+ r[i].purId
				+ "' value='"
				+ r[i].purBillDate
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].purNetAmt
				+ "<input type='hidden' id='purNetAmt"
				+ r[i].purId
				+ "' value='"
				+ r[i].purNetAmt
				+ "'></td>"
				+ "<td class='col-md-2 center'><a id='btnPrint"
				+ r[i].purId
				+ "' class='btn btn-xs btn-success'  onclick='purchaseEntryPrint("
				+ r[i].purId
				+ ")'> <i class='fa fa-print'></i> </a></td>"

				+ "<td class='col-md-2 center'><a id='btnBarcode"
				+ r[i].purId
				+ "' class='btn btn-xs btn-success' onclick='readBarcodeForPurchase("
				+ r[i].purId
				+ ")'><i class='fa fa-barcode'></i> </a></td>"


				/*+ "<td class='col-md-1 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deletePur("
				+ r[i].purId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> "*/
				+ "<td class='col-md-1 center'> <button id='btnPWBModal'  data-toggle='modal' data-target='#productwise_barcode_modal' class='btn btn-xs btn-success' onclick='showProductwiseBarcode(\""
				+ r[i].purId
				+ "\",\""
				+ r[i].vendorMaster.vendorName
				+ "\",\""
				+ r[i].purBillNo
				+ "\",\""
				+ r[i].purBillDate
				+ "\")' value='DELETE'> <i class='fa fa-barcode'></i> </button> </td> </tr>";
	}
	$('#divPurchaseList').html(divContent);
}
/**
 * @Code :create purchase div
 * @return
 **/
function toCreatePurchaseDiv(RowCount, currentRowCount) {
	var currentRow = currentRowCount;
	if (currentRow == undefined) {
		currentRow = 0;
	}

	var j = 1;

	rowCount = $('#RowCount').val();
	if (rowCount == undefined) {
		rowCount = 1;
	}

	if (rowCount == -1) {
		rowCount = 0;
	}
	if (rowCount == currentRow) {
		rowCount++;
		rowId = "remove" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', rowId);
		x.setAttribute('class', 'col-md-12-1');
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("HSTDiv").appendChild(x);

		$("#purchaseTable > tbody")
				.append(
						"<tr id='remove"
								+ (rowCount)
								+ "'><td><label  class=' input-SmallText'>"
								+ (rowCount)
								+ "</label></td>"
								+ "<input type='hidden' id='hiddenProductId"
								+ (rowCount)
								+ "' name='ltPurSlave["
								+ (rowCount - 1)
								+ "].productMaster.productId'/>"

								+ "<input type='hidden' id='textBatchId"
								+ (rowCount)
								+ "' name='ltPurSlave["
								+ (rowCount - 1)
								+ "].productMaster.batchMaster[0].batchId' />"

								+ "<td><input type='text' name='ltPurSlave["
								+ (rowCount - 1)
								+ "].productMaster.productName' autocomplete='off' id='textProductName"
								+ (rowCount)
								+ "' class='form-control input-SmallText # deleteGroup"
								+ rowCount
								+ " # textProductName' autocomplete='off' onkeypress='setValuesToAutocomplete(event,"
								+ rowCount
								+ ")' /></td>"

								+ "<td style='display:none;'><input name='textAvlQty' type='text' class='form-control input-SmallText' id='textAvlQty"
								+ rowCount
								+ "' readonly='true' tabindex='-1' /></td>"
								+ "<td><input type='text' name='ltPurSlave["
								+ (rowCount - 1)
								+ "].productMaster.productUnit' id='textUnit"
								+ (rowCount)
								+ "'  class='form-control input-SmallText' readonly='true' tabindex='-1'/></td><td><input type='text' name='ltPurSlave["
								+ (rowCount - 1)
								+ "].productMaster.packType' id='textPack"
								+ (rowCount)
								+ "' readonly='true' tabindex='-1' class='form-control input-SmallText' /></td><td><input name='ltPurSlave["
								+ (rowCount - 1)
								+ "].productMaster.compShortName' id='textCom"
								+ (rowCount)
								+ "' readonly='true' tabindex='-1' type='text' class='form-control input-SmallText' /></td>"

								+ "<td><input name='ltPurSlave["
								+ (rowCount - 1)
								+ "].purSlaveBillRate' type='text'  id='billRate"
								+ (rowCount)
								+ "' class='form-control input-SmallText'   onblur='calculatePopUpTotalAmount("
								+ rowCount
								+ "),calculateDiscount("
								+ rowCount
								+ ");'/></td>"

								+ "<td><input type='text' name='ltPurSlave["
								+ (rowCount - 1)
								+ "].purSlaveQty' id=textQty"
								+ (rowCount)
								+ " class='form-control input-SmallText'  onblur='calculatePopUpTotalAmount("
								+ rowCount
								+ "),isNumber(textQty"
								+ rowCount
								+ ");'/></td>"

								+ "<td><input type='text' name='ltPurSlave["
								+ (rowCount - 1)
								+ "].purSlaveScheme' id=textSchm"
								+ (rowCount)
								+ " class='form-control input-SmallText'  /></td>"
								// onblur='calSchemeAmt("+ (rowCount)+ ")'
								+ "<td><input type='text' name='ltPurSlave["
								+ (rowCount - 1)
								+ "].purSlaveSchemeAmt' id=textSchmAmt"
								+ (rowCount)
								+ " class='form-control input-SmallText' onblur='funSchemeAmt("
								+ (rowCount)
								+ ")'/></td>"

								+ "<td><input name='ltPurSlave["
								+ (rowCount - 1)
								+ "].productMaster.batchMaster[0].batchCode' id=textBatch"
								+ (rowCount)
								+ "  type='text' class='form-control input-SmallText batchclass'  onblur='checkBatchAvailability(this.value);'/></td>"

								+ "<td><input name='ltPurSlave["
								+ (rowCount - 1)
								+ "].productMaster.batchMaster[0].batchExpDate' id=textExpiry"
								+ (rowCount)
								+ "  type='text' class='form-control input-SmallText'  onblur='isExpiryDateGRN("
								+ rowCount
								+ ");'/></td>"

								+ "<td><input name='ltPurSlave["
								+ (rowCount - 1)
								+ "].purDisc' id='textDisc"
								+ (rowCount)
								+ "' type='text' class='form-control input-SmallText'  onblur='calculateDiscount("
								+ rowCount
								+ ");' onchange='chkDiscount();'/></td>"

								+ "<td><input name='ltPurSlave["
								+ (rowCount - 1)
								+ "].purHsn' id='textHsn"
								+ (rowCount)
								+ "' type='text' class='form-control input-SmallText' readonly='true' tabindex='-1' /></td>"

								+ "<td><input name='ltPurSlave["
								+ (rowCount - 1)
								+ "].purVat' id='textNewVat"
								+ (rowCount)
								+ "' type='text' class='form-control input-SmallText'  /></td>"

								+ "<td><input name='ltPurSlave["
								+ (rowCount - 1)
								+ "].purIgst' id='textIgst"
								+ (rowCount)
								+ "' type='text' class='form-control input-SmallText'  /></td>"

								+ "<td style='display: none'><input name='ltPurSlave["
								+ (rowCount - 1)
								+ "].purCess' id='textCess"
								+ (rowCount)
								+ "' type='text' class='form-control input-SmallText' /></td>"

								+ "<td style='display: none'><input name='' id='textPrft"
								+ (rowCount)
								+ "' type='text' class='form-control input-SmallText' readonly='true' tabindex='-1' /></td>"

								+ "<td><input name='ltPurSlave["
								+ (rowCount - 1)
								+ "].purSlaveMrp' id='textMrp"
								+ (rowCount)
								+ "' type='text' class='form-control input-SmallText'  onblur='setRateValue("
								+ rowCount
								+ "),calculateProffit("
								+ rowCount
								+ "),calculatePopUpTotalAmount("
								+ rowCount
								+ ");' /></td>"

								+ "<td style='display: none'><input name='ltPurSlave["
								+ (rowCount - 1)
								+ "].purslaverate' id='textRate"
								+ (rowCount)
								+ "' type='text' class='form-control input-SmallText' readonly='true' tabindex='-1' /></td>"

								+ "<td style='display: none;'><input type='text' name='ltPurSlave["
								+ (rowCount - 1)
								+ "].purSlavePurchaseRate' class='form-control input-SmallText' id='textPurchaseRate"
								+ (rowCount)
								+ "' readonly='true'/></td>"

								+ "<td style='display: none;'><input type='text'  class='form-control input-SmallText' id='textDiscAmt"
								+ (rowCount)
								+ "' readonly='true'/></td>"

								+ "<td style='display: none;'><input type='text'  class='form-control input-SmallText' id='textVatAmt"
								+ (rowCount)
								+ "' readonly='true'/></td>"

								+ "<td><input type='text' id='textAmount"
								+ (rowCount)
								+ "' class='form-control input-SmallText'  name='ltPurSlave["
								+ (rowCount - 1)
								+ "].purSlaveAmt' "
								+ " readonly='true' tabindex='-1' /></td>"
								+ "<td><input type='checkbox' name='deleteGroup' value='"
								+ (rowCount) + "' id='deleteGroup" + (rowCount)
								+ "'></td></tr>");

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		totalRowCount++;

		fillRow(currentRowCount);
	} else {
		fillRow(currentRowCount);
	}
}
/**
 * @Code : fill row
 * @return
 **/
function fillRow(rCount) {

	var rowCount = parseInt(rCount);
	if ($("input[name=row]:checked").length == 0) {
		$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
		$('#textUnit' + rowCount).val($('#txtUnit').val());
		$('#textPack' + rowCount).val($('#txtPack').val());
		$('#textCom' + rowCount).val($('#txtComp').val());
		$('#textDisc' + rowCount).val(0);
		$('#textPurRate' + rowCount).val(0);
		$('#textSchm' + rowCount).val(0);
		$('#textBatch' + rowCount).val(0);
		$('#textExpiry' + rowCount).val(0);
		$('#textMrp' + rowCount).val(0);
		$('#textPrft' + rowCount).val(0);
		$('#textBatchId' + rowCount).val(0);
		$('#textRate' + rowCount).val(0);
		$('#textDiscAmt' + rowCount).val(0);
		$('#textVatAmt' + rowCount).val(0);

		$('#textNewVat' + rowCount).val($('#txtVat').val());
		$('#textHsn' + rowCount).val($('#txtHsn').val());
		$('#textIgst' + rowCount).val($('#txtIgst').val());
		$('#textCess' + rowCount).val($('#txtCess').val());

		fetchHsnandGst();
		return;
	}

	$('#billRate' + rowCount).val($('#txtBillRate').val());
	$('#textPurchaseRate' + rowCount).val($('#txtPRate').val());
	$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
	$('#textUnit' + rowCount).val($('#txtUnit').val());
	$('#textPack' + rowCount).val($('#txtPack').val());
	$('#textCom' + rowCount).val($('#txtComp').val());
	$('#textMRP' + rowCount).val($('#txtMrp').val());
	$('#textQty' + rowCount).val($('#txtQty').val());
	$('#textPurRate' + rowCount).val($('#txtPRate').val());
	$('#textSchm' + rowCount).val($('#txtScheme').val());
	$('#textBatch' + rowCount).val($('#txtBatchNo').val());
	$('#textExpiry' + rowCount).val($('#txtExpiry').val());
	$('#textMrp' + rowCount).val($('#txtMrp').val());

	$('#textNewVat' + rowCount).val($('#txtVat').val());
	$('#textPrft' + rowCount).val($('#profitDiv').html());
	$('#textBatchId' + rowCount).val($('#hiddenBatchId').val());
	$('#textRate' + rowCount).val($('#txtRate').val());
	$('#textDiscAmt' + rowCount).val($('#txtDiscAmt').val());

	$('#textHsn' + rowCount).val($('#txtHsn').val());
	$('#textIgst' + rowCount).val($('#txtIgst').val());
	$('#textCess' + rowCount).val($('#txtCess').val());

	if ($('#txtDisc').val() != "")
		$('#textDisc' + rowCount).val($('#txtDisc').val());
	else
		$('#textDisc' + rowCount).val(0);

	$('#textVatAmt' + rowCount).val($('#txtVatAmt').val());

	if ($('#txtQty').val() != '' && $('#txtQty').val().length > 0)
		qty = parseFloat($('#txtQty').val());

	$('#textAmount' + rCount).val($('#txtAmount').val());
	$('#billRate' + rowCount).focus();
	calculateGrossAmount();
	calculateVat();
	calculateTotalTax();
	calculateTotalDiscount();
	calculateTotalLess();
	CheckGrossAmt();

}
/**
 * @Code : reset values
 * @return
 **/
function resetAllValues() {
	$('#Sales_Quotation_Form').find('input:text').val('');
}

/**
 * @Code : delete row
 * @return
 **/
function deleteRow() {
	alert("Are you confirm to delete selected row");
	var favorite = [];

	$.each($("input[name='deleteGroup']:checked"), function() {
		favorite.push($(this).val());

	});

	if (favorite.length == 0) {
		alert("Please select checkbox to delete");
	}

	for ( var i = 0; i < favorite.length; i++) {

		if ($("#hiddenProductId" + favorite[i]).val() != null
				&& $('#hiddenProductId' + favorite[i]).val() != "") {
			$("#deleteGroup" + favorite[i]).prop("checked", false);
			var amount = parseFloat($("#textAmount" + favorite[i]).val());
			var vat = parseFloat($("#textVatAmt" + favorite[i]).val());

			$("#txtItemDisc")
					.val(
							($("#txtItemDisc").val() - (($(
									"#textDisc" + favorite[i]).val() * $(
									"#textAmount" + favorite[i]).val()) / 100))
									.toFixed(2));

			$("#txtVat5")
					.val(
							$("#txtVat5").val()
									- (amount * ($("#textNewVat" + favorite[i])
											.val() / 100)));
			if ($("#txtVat5").val() < 0)
				$("#txtVat5").val(0);

			$("#txtVat12")
					.val(
							$("#txtVat12").val()
									- (amount * ($("#textIgst" + favorite[i])
											.val() / 100)));
			if ($("#txtVat12").val() < 0)
				$("#txtVat12").val(0);

			$("#txtlbt")
					.val(
							$("#txtlbt").val()
									- (amount * ($("#textCess" + favorite[i])
											.val() / 100)));
			if ($("#txtlbt").val() < 0)
				$("#txtlbt").val(0);

			var Qty = parseFloat($("#textQty" + favorite[i]).val());
			$("#txtTotalVat").val(
					($("#txtTotalVat").val() - (vat * Qty)).toFixed(2));
			$("#textVat").val($("#txtTotalVat").val());

			$("#txtLess")
					.val(
							($("#txtLess").val() - (($(
									"#textDisc" + favorite[i]).val() * $(
									"#textAmount" + favorite[i]).val()) / 100))
									.toFixed(2));

			$("#txtGross").val($("#txtGross").val() - amount);
			var tot = Math.round(parseFloat($("#txtGross").val())
					- parseFloat($("#txtLess").val())
					+ parseFloat($("#txtAdd").val())
					+ parseFloat($("#textVat").val()));

			$("#remove" + favorite[i]).hide();

			if ($("#DRRDiv tr:visible").length == 1 && getPoFlag == 0) {
				tot = 0;
				$("#txtItemDisc").val(0);
				$("#txtSchmDisc").val(0);
				$("#txtSplDisc").val(0);
				$("#txtdebitAmt1").val(0);
				$("#txtCD1").val(0);
				$("#txtCDAmt").val(0);

				$("#txtOctroi").val(0);
				$("#txtSurcharge").val(0);
				$("#txtCreditAmt").val(0);
				$("#txtFreight").val(0);

				$("#txtGross").val(0);
				$("#txtLess").val(0);
				$("#txtAdd").val(0);
				$("#textVat").val(0);

			}
			$("#txtNetAmt").val(tot);

			$("#hiddenProductId" + favorite[i]).val(null);

			CheckGrossAmt();

		} else {
			alert("Can not delete empty row");
			$("#deleteGroup" + favorite[i]).prop("checked", false);
		}
	}
}
/**
 * @Code : set round net amount
 * @return
 **/
function setRoundNetAmount() {

	if ($('#txtNetAmt').val() != null && $('#txtNetAmt').val() != '') {
		var retVal = confirm("Do you want to Round off Net Amount  ?");
		var r = Math.round($('#txtNetAmt').val());
		if ($('#txtGross').val() != '' && $('#txtGross').val().length > 0) {
			gross = parseFloat($('#txtGross').val());
		}
		if (retVal == true) {
			$('#txtNetAmt').val(r);
		}
	} else {
		calculateNetAmount();

	}
}
/**
 * @Code : purchase entry print
 * @return
 **/
function purchaseEntryPrint(purId) {
	window.open("../../pharmacy/purchase/printView?purchaseId="
			+ purId + "");
}
/**
 * @Code : show product wise barcode
 * @return
 **/
function showProductwiseBarcode(purchaseId, vendorName, billNo, billDate) {
	//var date =getDate(billDate);
	//alert(date);
	$("#purchaseIdHidden").val(purchaseId);
	$("#productwise_barcode_modal").modal("show");
	$("#goodsReceiptNoteNo").html(purchaseId);
	$("#vendorName").html(vendorName);
	$("#billNo").html(billNo);
	$("#billDate").html(billDate);

}
/**
 * @Code : serach product-wise 
 * @return
 **/
function searchProductWiseBarcode(productId, purchaseId) {

	if (productId != "" && productId != null && productId != 0
			&& purchaseId != "" && purchaseId != null && purchaseId != 0) {

		var inputs = [];
		inputs.push('productId=' + productId);
		inputs.push('purchaseId=' + purchaseId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/product/getProductWiseBarcodeByProductId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						//console.log(r);
						//var data = jQuery.parseJSON(r);
						setProductWiseBarcode(r);
					}
				});
		return true;
	} else {
		alert("No product Selected");
	}
}
/**
 * @Code : set poduct wise barcode data
 * @return
 **/
function setProductWiseBarcode(result) {
	var divContent = "";
	if (result.lstPurchaseMaster.length <= 0) {
		divContent = divContent
				+ "<tr><td colspan='6' style='color:red;'><b><center>NO RECORD FOUND</center></b></td></tr>";
	} else {
		for ( var i = 0; i < result.lstPurchaseMaster.length; i++) {
			/*var date = (result.lstPurchaseMaster[i].pur_bill_date).toLocaleDateString('en-GB');
			alert(date);*/
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); 
			var yyyy = today.getFullYear();

			today = mm + '/' + dd + '/' + yyyy;
			divContent = divContent
					+ "<tr><td>"
					+ (i + 1)
					+ "</td><td>"
					+ result.lstPurchaseMaster[i].pur_slave_product_id
					+ "</td><td>"
					+ result.lstPurchaseMaster[i].product_name
					+ "</td><td>"
					+ result.lstPurchaseMaster[i].batch_code
					+ "</td><td>"
					+ today
					+ "</td><td>"
					+ result.lstPurchaseMaster[i].pur_slave_qty
					+ "</td><td><input type='button' class='btn btn-success' onclick='readBarcode(\""
					+ result.lstPurchaseMaster[i].batch_id + "\",\""
					+ result.lstPurchaseMaster[i].pur_slave_qty + "\",\""
					+ result.lstPurchaseMaster[i].product_name + "\",\""
					+ result.lstPurchaseMaster[i].batch_code + "\")' ></td>"
					+ "<input type='hidden' id='batchId"
					+ result.lstPurchaseMaster[i].pur_slave_product_id + "' value='"
					+ result.lstPurchaseMaster[i].pur_slave_batch_id + "'></tr>";
		}
	}

	$("#productWiseBarcodeTable").html(divContent);

}
/**
 * @Code :calculate total gst and gross amount
 * @return
 **/
function calculatGSTTotalandGross() {
	calculateGrossAmount();
	calculateVat();
	calculateTotalTax();
	calculateTotalDiscount();
	calculateTotalLess();
	CheckGrossAmt();
}

function setNewRate(rowCall) {
	$('#txtBillRate').val($('#billRate' + rowCall).val());
	$('#textPurchaseRate' + rowCall).val($('#txtPRate').val());

}

/**
 * @Code : calculate scheme amount
 * @return
 **/
function calSchemeAmt(id) {
	var schemeQty = $("#textSchm" + id).val();
	if (schemeQty < 1)
		return;
	var qty = $("#textQty" + id).val();
	var unit = $("#textUnit" + id).val();
	var billRate = $("#billRate" + id).val();
	var amt = (billRate / unit) * schemeQty;
	amt = ((billRate * qty) - amt) / qty;
	$("#textSchmAmt" + id).val(parseFloat(amt).toFixed(2));
}
/**
 * @Code : calculate fun scheme amount
 * @return
 **/
function funSchemeAmt(id) {
	var schemeQty = $("#textSchm" + id).val();
	var schemeAmt = $("#textSchmAmt" + id).val();
	if (schemeQty > 0 && schemeAmt < 1 && schemeAmt == null)
		return;
	var amt = $("#textAmount" + id).val();
	var purRate = $("#textPurchaseRate" + id).val();
	amt = schemeAmt / amt;
	amt = purRate - amt;
	$("#textPurchaseRate" + id).val(parseFloat(amt).toFixed(2));
}
/**
 * @Code : calculate percentage-wise concession
 * @return
 **/
function calPerForCon() {

	var amount = parseFloat($('#txtGross').val());
	var concession = parseFloat($("#txtCDAmt").val());

	var conper = ((concession * 100) / amount);// .toFixed(2);
	$("#txtCD1").val(conper);
	CheckGrossAmt();
}
