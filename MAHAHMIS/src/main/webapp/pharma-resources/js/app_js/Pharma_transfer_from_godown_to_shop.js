function toCreateTransferFromGodownToShopDiv(RowCount, currentRowCount) {

	var currentRow = currentRowCount;

	if (currentRow == undefined) {
		currentRow = 0;
	}

	var j = 1;

	var rowCount = $('#' + RowCount).val();
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
		/* x.setAttribute('class', 'col-md-12-1'); */
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("DRRDiv").appendChild(x);
		var index = parseInt(rowCount) - 1;

		document.getElementById(rowId).innerHTML = "<td><label class='input-SmallText'>"
				+ (rowCount)
				+ "</label></td>"
				
				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textClStk"
				+ rowCount
				+ "' readonly='true' ></td>"

				+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
				+ rowCount
				+ "' readonly='true' ></td>"
				
				+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textVat"
				+ rowCount
				+ "' readonly='true' ></td>"

				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPurchaseRate"
				+ rowCount
				+ "' readonly='true' ></td>"
				+ "<td><input type='hidden' "
				+ "id='hiddenProductId"
				+ rowCount
				+ "'>"

				+ "<input type='hidden' "
					
				+ " id='hiddenPurchaseSlaveId"
				+ rowCount
				+ "'>"
					

				+ "<input data-toggle='modal' data-target='#TransferFromGodownToShop_PopUp_Form' id='textProductName"
				+ rowCount
				+ "' type='text' class='form-control input-SmallText' onclick='load("
				+ rowCount
				+ ")'"
				+ "></td>"
				+ "<td><input type='text'  id='textUnit"
				+ rowCount
				+ "' class='form-control input-SmallText'  "
				+ " readonly='true'></td>"

				+ "<td><input type='text' id='textPack"
				+ rowCount
				+ "' class='form-control input-SmallText'  "
				+ " readonly='true'></td>"
				+ "<td><input type='text' id='txtQty"
				+ rowCount
				+ "' class='form-control input-SmallText'"
				+ " readonly='true'></td>"
				+ "<td><input type='text' id='txtBatchNo"
				+ rowCount
				+ "' class='form-control input-SmallText' readonly='true'></td>"

				+ "<td style='display:none;'><input type='text' "
				
				+ " readonly id='textBatchId"
				+ rowCount
				+ "' class='form-control input-SmallText' readonly='true'></td>"
		
				+ "<td><input type='text' id='txtExpiry"
				+ rowCount
				+ "' class='form-control input-SmallText' readonly='true'></td>"
				
				+ "<td><input type='text' id='txtMRP"
				+ rowCount
				+ "' class='form-control input-SmallText' readonly='true'></td>"
			
				+ "<td><input type='text' id='txtRate"
				+ rowCount
				+ "' class='form-control  input-SmallText' readonly='true'></td>"
								
				+ "<td><input type='text' value='0' "
				+ " id='txtAmt"
				+ rowCount
				+ "' class='form-control input-SmallText' readonly='true'></td></tr>";
		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;

		$("#txtProductName" + rowCount).focus();
		fillRow(currentRowCount);

	} else {

		fillRow(currentRowCount);

	}

}
function calculateAmount() {
	// net amount
	var rate=0;
	var qty=0;
	
	if($('#txtPRate').val()!='' && $('#txtPRate').val().length>0)
	rate = parseFloat($('#txtPRate').val());
	
	if($('#txtQty').val()!='' && $('#txtQty').val().length>0)
	qty = parseFloat($('#txtQty').val());
	
	$('#txtAmt').val(rate * qty);
	
}
function fillRow(rCount) {
	var rowCount = parseInt(rCount);

	$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
	$('#textProductName' + rowCount).val($('#particulars').val());
	$('#textUnit' + rowCount).val($('#txtUnit').val());
	$('#textPack' + rowCount).val($('#txtPack').val());
	$('#txtQty' + rowCount).val($('#txtQty').val());
	$('#txtBatchNo' + rowCount).val($('#txtBatchNo').val());
	$('#txtExpiry' + rowCount).val($('#txtExpiry').val());
	$('#txtMRP' + rowCount).val($('#txtMrp').val());
	$('#txtRate' + rowCount).val($('#txtPRate').val());
	$('#txtAmt' + rowCount).val($('#txtAmt').val());
	$('#textBatchId' + rowCount).val($('#hiddenBatchId').val());
	$('#textStockId' + rowCount).val($('#hiddenStockId').val());
	$('#textStockQtyInHand' + rowCount).val($('#txtClStk').val());
	$('#hiddenPurchaseSlaveId' + rowCount).val($('#hiddenPurchaseId').val());
	/*
	$('#textClStk' + rowCount).val($('#txtClStk').val());

	$('#textTotalStk' + rowCount).val($('#txtTotalStk').val());

	$('#textPurchaseRate' + rowCount).val($('#txtPRate').val());*/
	
	$('#textVat' + rowCount).val($('#txtVat').val());
	
	
}