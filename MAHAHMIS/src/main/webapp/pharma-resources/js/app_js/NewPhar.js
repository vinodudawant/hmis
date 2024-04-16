function toCreateItemDiv(RowCount, currentRowCount) {

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
		x.setAttribute('class', 'col-md-12-1');
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("HSTDiv").appendChild(x);

		$("#ItemInfoTable > tbody")
				.append(
						"<tr><td><label  class=' input-SmallText'>"
								+ (rowCount)
								+ "</label></td>+<td><input id='txtProductName"+rowCount+"' type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'onblur=toCreateItemDiv('RowCount',"
								+ rowCount + ")></td>");
		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;

		$("#txtProductName"+rowCount).focus();
	}

}
function toCreateInstitutionalSalesBE(RowCount, currentRowCount) {

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
		x.setAttribute('class', 'col-md-12-1');
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("HSTDiv").appendChild(x);

		$("#ItemInfoTable > tbody")
				.append(
						"<tr><td><label  class=' input-SmallText'>"
								+ (rowCount)
								+ "</label></td>+<td><input id='txtProductName"
								+ rowCount
								+ "'type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'onblur=toCreateInstitutionalSalesBE('RowCount',"
								+ rowCount + ")></td>");

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;

		$('#txtProductName' + rowCount).focus();
	}

}
function toCreatePartywiseExpiryDebitNote(RowCount, currentRowCount) {

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
		x.setAttribute('class', 'col-md-12-1');
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("HSTDiv").appendChild(x);

		$("#ItemInfoTable > tbody")
				.append(
						"<tr><td><label  class=' input-SmallText'>"
								+ (rowCount)
								+ "</label></td>+<td><input  id='txtProduct"+rowCount+"' type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'onblur=toCreatePartywiseExpiryDebitNote('RowCount',"
								+ rowCount + ")></td>");

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$("#txtProduct"+rowCount).focus();
	}

}

function toCreatePartywise_P_O(RowCount, currentRowCount) {

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
		x.setAttribute('class', 'col-md-12-1');
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("HSTDiv").appendChild(x);

		$("#ItemInfoTable > tbody")
				.append(
						"<tr><td><label  class=' input-SmallText'>"
								+ (rowCount)
								+ "</label></td>+<td><input type='text' id='txtProduct"+rowCount+"'  class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'onblur=toCreatePartywise_P_O('RowCount',"
								+ rowCount + ")></td>");

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$("#txtProduct"+rowCount).focus();
	}

}

function toCreateProductBelowMinLevel(RowCount, currentRowCount) {

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
		x.setAttribute('class', 'col-md-12-1');
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("HSTDiv").appendChild(x);

		$("#ItemInfoTable > tbody")
				.append(
						"<tr><td><label  class=' input-SmallText'>"
								+ (rowCount)
								+ "</label></td>+<td><input  id='txtProduct"+rowCount+"' type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'onblur=toCreateProductBelowMinLevel('RowCount',"
								+ rowCount + ")></td>");

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$("#txtProduct"+rowCount).focus();
	}

}
function toCreateStdPrescription(RowCount, currentRowCount) {

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
		x.setAttribute('class', 'col-md-12-1');
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("HSTDiv").appendChild(x);

		$("#ItemInfoTable > tbody")
				.append(
						"<tr><td><label  class=' input-SmallText'>"
								+ (rowCount)
								+ "</label></td>+<td><input id='txtProduct"+rowCount+"' type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'onblur=toCreateStdPrescription('RowCount',"
								+ rowCount + ")></td>");

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$("#txtProduct"+rowCount).focus();
	}

}
function toCreateMonthwise_Sales_Summery(RowCount, currentRowCount) {

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
		x.setAttribute('class', 'col-md-12-1');
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("HSTDiv").appendChild(x);

		$("#ItemInfoTable > tbody")
				.append(
						"<tr><td><label  class=' input-SmallText'>"
								+ (rowCount)
								+ "</label></td>+<td><input  id='txtProduct"+rowCount+"' type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'onblur=toCreateMonthwise_Sales_Summery('RowCount',"
								+ rowCount + ")></td>");

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$("#txtProduct"+rowCount).focus();
	}

}
function toCreateTransferFromGowDownToShop(RowCount, currentRowCount) {

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
		x.setAttribute('class', 'col-md-12-1');
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("HSTDiv").appendChild(x);

		$("#ItemInfoTable > tbody")
				.append(
						"<tr><td><label  class=' input-SmallText'>"
								+ (rowCount)
								+ "</label></td>+<td><input id='txtProduct"+rowCount+"' type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'onblur=toCreateTransferFromGowDownToShop('RowCount',"
								+ rowCount + ")></td>");

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$("#txtProduct"+rowCount).focus();
	}

}
