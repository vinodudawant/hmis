



function toCreateItemDiv11(RowCount, currentRowCount) {
	/* console.log("Hi"); */
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

		// alert(rowCount);

		rowCount++;
		rowId = "remove" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', rowId);
		/* x.setAttribute('class', 'col-md-12-1'); */
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("DRRDiv").appendChild(x);

		document.getElementById(rowId).innerHTML = "<td><label class='input-SmallText'>"
				+ (rowCount)
				+ "</label></td>"
				+ "<td><input type='text' class='form-control input-SmallText' id='itn"
				+ rowCount
				+ "' name='textProductName' maxlength='150'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='aq"
				+ rowCount
				+ "' name='textUnit' maxlength='6'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='mq"
				+ rowCount
				+ "' name='textPack' maxlength='6' ></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='ip"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='il"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='io"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='ih"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='is"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='is"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"
				+ "<td><input type='text' class='form-control input-SmallText' id='is"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='is"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"
				+ "<td><input type='text' class='form-control input-SmallText' id='is"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='mq"
				+ rowCount
				+ "' name='textQty' maxlength='6' onkeypress='return validateNumbers(event)' onblur=toCreateItemDiv11('RowCount',"
				+ rowCount + ")></td>";

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$('#itn' + rowCount).focus();
	}

}


function toCreateItemDiv13(RowCount, currentRowCount) {
	/* console.log("Hi"); */
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

		// alert(rowCount);

		rowCount++;
		rowId = "remove" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', rowId);
		/* x.setAttribute('class', 'col-md-12-1'); */
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("DRRDiv").appendChild(x);

		document.getElementById(rowId).innerHTML = "<td><label class='input-SmallText'>"
				+ (rowCount)
				+ "</label></td>"
				+ "<td><input type='text' class='form-control input-SmallText' id='itn"
				+ rowCount
				+ "' name='textProductName' maxlength='150'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='aq"
				+ rowCount
				+ "' name='textUnit' maxlength='6'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='mq"
				+ rowCount
				+ "' name='textPack' maxlength='6' ></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='ip"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='il"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='io"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='ih"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='is"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='is"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='is"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"
				+ "<td><input type='text' class='form-control input-SmallText' id='is"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='mq"
				+ rowCount
				+ "' name='textQty' maxlength='6' onkeypress='return validateNumbers(event)' onblur=toCreateItemDiv13('RowCount',"
				+ rowCount + ")></td>";

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$('#itn' + rowCount).focus();
	}

}

function toCreateItemDiv14(RowCount, currentRowCount) {
	/* console.log("Hi"); */

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

		// alert(rowCount);

		rowCount++;
		rowId = "remove" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', rowId);
		/* x.setAttribute('class', 'col-md-12-1'); */
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("DRRDiv").appendChild(x);

		document.getElementById(rowId).innerHTML = "<td><label class='input-SmallText'>"
				+ (rowCount)
				+ "</label></td>"
				+ "<td><input type='text' class='form-control input-SmallText' id='itn"
				+ rowCount
				+ "' name='textProductName' maxlength='150'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='aq"
				+ rowCount
				+ "' name='textUnit' maxlength='6'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='mq"
				+ rowCount
				+ "' name='textPack' maxlength='6' ></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='ip"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='il"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='io"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='ih"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='mq"
				+ rowCount
				+ "' name='textQty' maxlength='6' onkeypress='return validateNumbers(event)' onblur=toCreateItemDiv14('RowCount',"
				+ rowCount + ")></td>";

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$('#itn' + rowCount).focus();
	}

}

function toCreateItemDiv15(RowCount, currentRowCount) {
	/* console.log("Hi"); */
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

		// alert(rowCount);

		rowCount++;
		rowId = "remove" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', rowId);
		/* x.setAttribute('class', 'col-md-12-1'); */
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("DRRDiv").appendChild(x);

		document.getElementById(rowId).innerHTML = "<td><label class='input-SmallText'>"
				+ (rowCount)
				+ "</label></td>"
				+ "<td><input type='text' class='form-control input-SmallText' id='itn"
				+ rowCount
				+ "' name='textProductName' maxlength='150'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='aq"
				+ rowCount
				+ "' name='textUnit' maxlength='6'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='mq"
				+ rowCount
				+ "' name='textPack' maxlength='6' ></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='ip"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='il"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='io"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='ih"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='is"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='is"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"
				+ "<td><input type='text' class='form-control input-SmallText' id='is"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='is"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"
				+ "<td><input type='text' class='form-control input-SmallText' id='is"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='mq"
				+ rowCount
				+ "' name='textQty' maxlength='6' onkeypress='return validateNumbers(event)' onblur=toCreateItemDiv15('RowCount',"
				+ rowCount + ")></td>";

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$('#itn' + rowCount).focus();
	}

}

function toCreateChequeDiv16(RowCount, currentRowCount) {
	/* console.log("Hi"); */

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

		// alert(rowCount);

		rowCount++;
		rowId = "remove" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', rowId);
		/* x.setAttribute('class', 'col-md-12-1'); */
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("DRRDiv").appendChild(x);

		document.getElementById(rowId).innerHTML = "<td><label class='input-SmallText'>"
				+ (rowCount)
				+ "</label></td>"
				+ "<td><input type='text' class='form-control input-SmallText' id='textType0"
				+ rowCount
				+ "' name='textProductName' maxlength='150'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='aq"
				+ rowCount
				+ "' name='textUnit' maxlength='6'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='mq"
				+ rowCount
				+ "' name='textPack' maxlength='6' ></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='ip"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='il"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='io"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='ih"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='mq"
				+ rowCount
				+ "' name='textQty' maxlength='6' onkeypress='return validateNumbers(event)' onblur=toCreateChequeDiv16('RowCount',"
				+ rowCount + ")></td>";

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$('#textType0' + rowCount).focus();
	}

}

function toCreateItemDivDebtorNoteAmt(RowCount, currentRowCount) {
	/* console.log("Hi"); */

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

		// alert(rowCount);

		rowCount++;
		rowId = "remove" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', rowId);
		/* x.setAttribute('class', 'col-md-12-1'); */
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("DRRDiv").appendChild(x);

		document.getElementById(rowId).innerHTML = "<td><label class='input-SmallText'>"
				+ (rowCount)
				+ "</label></td>"
				+ "<td><input type='text' class='form-control input-SmallText' id='TxtParticular1'"
				+ rowCount
				+ "' name='TxtParticular1' maxlength='150'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='mq"
				+ rowCount
				+ "' name='textQty' maxlength='6' onkeypress='return validateNumbers(event)' onblur=toCreateItemDivDebtorNoteAmt('RowCount',"
				+ rowCount + ")></td>";

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$('#TxtParticular0' + rowCount).focus();
	}

}

function toCreateItemDivCreditNoteAmt(RowCount, currentRowCount) {
	/* console.log("Hi"); */

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

		// alert(rowCount);

		rowCount++;
		rowId = "remove" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', rowId);
		/* x.setAttribute('class', 'col-md-12-1'); */
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("DRRDiv").appendChild(x);

		document.getElementById(rowId).innerHTML = "<td><label class='input-SmallText'>"
				+ (rowCount)
				+ "</label></td>"
				+ "<td><input type='text' class='form-control input-SmallText' id='TxtParticular1'"
				+ rowCount
				+ "' name='TxtParticular1' maxlength='150'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='mq"
				+ rowCount
				+ "' name='textQty' maxlength='6' onkeypress='return validateNumbers(event)' onblur=toCreateItemDivCreditNoteAmt('RowCount',"
				+ rowCount + ")></td>";

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$('#TxtParticular0' + rowCount).focus();
	}

}

function toCreateCreditNotes(RowCount, currentRowCount) {
	/* console.log("Hi"); */

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

		// alert(rowCount);
		rowCount++;
		rowId = "remove" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', rowId);
		/* x.setAttribute('class', 'col-md-12-1'); */
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("CashpaidEntryDiv").appendChild(x);

		document.getElementById(rowId).innerHTML = "<td class='col-md-1 center' style='height: 21.5px;'><label style='margin-top: 8px; padding: 0px 4px 0px 4px;' class='TextFont'> "
				+ (rowCount)
				+ " </label></td>"
				+ "<td><input type='text' class='form-control input-SmallText' id='txtProduct"
				+ rowCount
				+ "' name='txtProduct' maxlength='150'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='txtUnit"
				+ rowCount
				+ "' name='textUnit' maxlength='6'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='txtPack"
				+ rowCount
				+ "' name='txtPack' maxlength='6' ></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='txtQty"
				+ rowCount
				+ "' name='txtQty' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='txtBatchNo"
				+ rowCount
				+ "' name='txtBatchNo' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='txtExpiry"
				+ rowCount
				+ "' name='textComp' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='txtrat"
				+ rowCount
				+ "' name='txtrat' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='txtCode"
				+ rowCount
				+ "' name='txtCode' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='txtAmt"
				+ rowCount
				+ "' name='txtAmt' maxlength='8'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='mq"
				+ rowCount
				+ "' name='textQty' maxlength='6' onkeypress='return validateNumbers(event)' onblur=toCreateCreditNotes('RowCount',"
				+ rowCount + ")></td>";

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$('#txtProduct' + rowCount).focus();
	}

}

