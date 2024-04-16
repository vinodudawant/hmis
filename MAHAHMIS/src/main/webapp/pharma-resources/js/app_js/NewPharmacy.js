function changeCounterColor(number1, number2) {
	if (number1 == '1') {
		if ($("#textNo1").val() == '1') {
			$("#textNo1").css('background', 'lightgreen');
			$("#textProductName1").css('background', 'lightgreen');
			$("#textUnit1").css('background', 'lightgreen');
			$("#textPack1").css('background', 'lightgreen');
			$("#textCom1").css('background', 'lightgreen');
			$("#textBatchNo1").css('background', 'lightgreen');
			$("#textExp1").css('background', 'lightgreen');
			$("#textMrp1").css('background', 'lightgreen');
			$("#textRate1").css('background', 'lightgreen');
			$("#textShelf1").css('background', 'lightgreen');
			$("#textQty1").css('background', 'lightgreen');
			$("#textAmount1").css('background', 'lightgreen');
			$("#newDiv").css('background', 'lightgreen');
		} else if ($("#textNo1").val() == '2') {
			$("#textNo1").css('background', 'yellow');
			$("#textProductName1").css('background', 'yellow');
			$("#textUnit1").css('background', 'yellow');
			$("#textPack1").css('background', 'yellow');
			$("#textCom1").css('background', 'yellow');
			$("#textBatchNo1").css('background', 'yellow');
			$("#textExp1").css('background', 'yellow');
			$("#textMrp1").css('background', 'yellow');
			$("#textRate1").css('background', 'yellow');
			$("#textShelf1").css('background', 'yellow');
			$("#textQty1").css('background', 'yellow');
			$("#textAmount1").css('background', 'yellow');
			$("#newDiv").css('background', 'yellow');
		} else if ($("#textNo1").val() == '3') {
			$("#textNo1").css('background', 'pink');
			$("#textProductName1").css('background', 'pink');
			$("#textUnit1").css('background', 'pink');
			$("#textPack1").css('background', 'pink');
			$("#textCom1").css('background', 'pink');
			$("#textBatchNo1").css('background', 'pink');
			$("#textExp1").css('background', 'pink');
			$("#textMrp1").css('background', 'pink');
			$("#textRate1").css('background', 'pink');
			$("#textShelf1").css('background', 'pink');
			$("#textQty1").css('background', 'pink');
			$("#textAmount1").css('background', 'pink');
			$("#newDiv").css('background', 'pink');
		} else if ($("#textNo1").val() == '4') {
			$("#textNo1").css('background', 'darkgray');
			$("#textProductName1").css('background', 'darkgray');
			$("#textUnit1").css('background', 'darkgray');
			$("#textPack1").css('background', 'darkgray');
			$("#textCom1").css('background', 'darkgray');
			$("#textBatchNo1").css('background', 'darkgray');
			$("#textExp1").css('background', 'darkgray');
			$("#textMrp1").css('background', 'darkgray');
			$("#textRate1").css('background', 'darkgray');
			$("#textShelf1").css('background', 'darkgray');
			$("#textQty1").css('background', 'darkgray');
			$("#textAmount1").css('background', 'darkgray');
			$("#newDiv").css('background', 'darkgray');
		} else if ($("#textNo1").val() == '5') {
			$("#textNo1").css('background', 'lightblue');
			$("#textProductName1").css('background', 'lightblue');
			$("#textUnit1").css('background', 'lightblue');
			$("#textPack1").css('background', 'lightblue');
			$("#textCom1").css('background', 'lightblue');
			$("#textBatchNo1").css('background', 'lightblue');
			$("#textExp1").css('background', 'lightblue');
			$("#textMrp1").css('background', 'lightblue');
			$("#textRate1").css('background', 'lightblue');
			$("#textShelf1").css('background', 'lightblue');
			$("#textQty1").css('background', 'lightblue');
			$("#textAmount1").css('background', 'lightblue');
			$("#newDiv").css('background', 'lightblue');
		} else
		$("#textNo1").css('background', 'white');
		/*$("#textProductName1").css('background', 'white');
		$("#textUnit1").css('background', 'white');
		$("#textPack1").css('background', 'white');
		$("#textCom1").css('background', 'white');
		$("#textBatchNo1").css('background', 'white');
		$("#textExp1").css('background', 'white');
		$("#textMrp1").css('background', 'white');
		$("#textRate1").css('background', 'white');
		$("#textShelf1").css('background', 'white');
		$("#textQty1").css('background', 'white');
		$("#textAmount1").css('background', 'white');
	*/} else {
		if ($("#textNo" + number2).val() == '1') {
			$("#textNo" + number2).css('background', 'lightgreen');
			$("#textProductName"+ number2).css('background', 'lightgreen');
			$("#textUnit"+ number2).css('background', 'lightgreen');
			$("#textPack"+ number2).css('background', 'lightgreen');
			$("#textCom"+ number2).css('background', 'lightgreen');
			$("#textBatchNo"+ number2).css('background', 'lightgreen');
			$("#textExp"+ number2).css('background', 'lightgreen');
			$("#textMrp"+ number2).css('background', 'lightgreen');
			$("#textRate"+ number2).css('background', 'lightgreen');
			$("#textShelf"+ number2).css('background', 'lightgreen');
			$("#textQty"+ number2).css('background', 'lightgreen');
			$("#textAmount"+ number2).css('background', 'lightgreen');
			$("#newDiv").css('background', 'lightgreen');
		} else if ($("#textNo" + number2).val() == '2') {
			$("#textNo" + number2).css('background', 'yellow');
			$("#textProductName"+ number2).css('background', 'yellow');
			$("#textUnit"+ number2).css('background', 'yellow');
			$("#textPack"+ number2).css('background', 'yellow');
			$("#textCom"+ number2).css('background', 'yellow');
			$("#textBatchNo"+ number2).css('background', 'yellow');
			$("#textExp"+ number2).css('background', 'yellow');
			$("#textMrp"+ number2).css('background', 'yellow');
			$("#textRate"+ number2).css('background', 'yellow');
			$("#textShelf"+ number2).css('background', 'yellow');
			$("#textQty"+ number2).css('background', 'yellow');
			$("#textAmount"+ number2).css('background', 'yellow');
			$("#newDiv").css('background', 'yellow');
		} else if ($("#textNo" + number2).val() == '3') {
			$("#textNo" + number2).css('background', 'pink');
			$("#textProductName"+ number2).css('background', 'pink');
			$("#textUnit"+ number2).css('background', 'pink');
			$("#textPack"+ number2).css('background', 'pink');
			$("#textCom"+ number2).css('background', 'pink');
			$("#textBatchNo"+ number2).css('background', 'pink');
			$("#textExp"+ number2).css('background', 'pink');
			$("#textMrp"+ number2).css('background', 'pink');
			$("#textRate"+ number2).css('background', 'pink');
			$("#textShelf"+ number2).css('background', 'pink');
			$("#textQty"+ number2).css('background', 'pink');
			$("#textAmount"+ number2).css('background', 'pink');
			$("#newDiv").css('background', 'pink');
		} else if ($("#textNo" + number2).val() == '4') {
			$("#textNo" + number2).css('background', 'darkgray');
			$("#textProductName" + number2).css('background', 'darkgray');
			$("#textUnit" + number2).css('background', 'darkgray');
			$("#textPack" + number2).css('background', 'darkgray');
			$("#textCom" + number2).css('background', 'darkgray');
			$("#textBatchNo" + number2).css('background', 'darkgray');
			$("#textExp" + number2).css('background', 'darkgray');
			$("#textMrp" + number2).css('background', 'darkgray');
			$("#textRate" + number2).css('background', 'darkgray');
			$("#textShelf" + number2).css('background', 'darkgray');
			$("#textQty" + number2).css('background', 'darkgray');
			$("#textAmount" + number2).css('background', 'darkgray');
			$("#newDiv").css('background', 'darkgray');
		} else if ($("#textNo" + number2).val() == '5') {
			$("#textNo" + number2).css('background', 'lightblue');
		$("#textProductName"+ number2).css('background', 'lightblue');
			$("#textUnit"+ number2).css('background', 'lightblue');
			$("#textPack"+ number2).css('background', 'lightblue');
			$("#textCom"+ number2).css('background', 'lightblue');
			$("#textBatchNo"+ number2).css('background', 'lightblue');
			$("#textExp"+ number2).css('background', 'lightblue');
			$("#textMrp"+ number2).css('background', 'lightblue');
			$("#textRate"+ number2).css('background', 'lightblue');
			$("#textShelf"+ number2).css('background', 'lightblue');
			$("#textQty"+ number2).css('background', 'lightblue');
			$("#textAmount"+ number2).css('background', 'lightblue');
			$("#newDiv").css('background', 'lightblue');
		} else
			$("#textNo" + number2).css('background', 'white');
		/*$("#textProductName"+ number2).css('background', 'white');
		$("#textUnit"+ number2).css('background', 'white');
		$("#textPack"+ number2).css('background', 'white');
		$("#textCom"+ number2).css('background', 'white');
		$("#textBatchNo"+ number2).css('background', 'white');
		$("#textExp"+ number2).css('background', 'white');
		$("#textMrp"+ number2).css('background', 'white');
		$("#textRate"+ number2).css('background', 'white');
		$("#textShelf"+ number2).css('background', 'white');
		$("#textQty"+ number2).css('background', 'white');
		$("#textAmount"+ number2).css('background', 'white');*/
	}

}

function toCreateItemDiv(RowCount, currentRowCount) {

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
				+ "<td><input type='text'class='form-control input-SmallText' id='textProductName"
				+ rowCount
				+ "' name='textProductName' maxlength='150'></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textComp"
				+ rowCount
				+ "' name='textComp' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textUnit"
				+ rowCount
				+ "' name='textUnit' maxlength='6' onkeypress='return validateNumbers(event)'></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textPack"
				+ rowCount
				+ "' name='textPack' maxlength='6' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textQty"
				+ rowCount
				+ "' name='textQty' maxlength='6' onkeypress='return validateNumbers(event)' onblur=toCreateItemDiv('RowCount',"
				+ rowCount + ")></td>";

		/*
		 * + "<td style='height: 21.5px; width:93px;'><input type='checkbox'
		 * style='margin-top: 12px;' name='chk" + rowCount + "' id='chk" +
		 * rowCount + "' /></td>"
		 */
		/*
		 * + "<td style='height: 21.5px; width:2px; display: none'><input
		 * type='hidden' class='form-control input-SmallText' style='margin-top:
		 * 8px;' id='id" + rowCount + "'></td>" + "<td style='height: 21.5px; width:2px; display: none'><input
		 * type='hidden' class='form-control input-SmallText' style='margin-top:
		 * 8px;' id='hid" + rowCount + "'></td>";
		 */

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
	}

}

function toCreateItemDiv1(RowCount, currentRowCount) {
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

				+ "<td><input type='text' class='form-control input-SmallText' id='mq"
				+ rowCount
				+ "' name='textQty' maxlength='6' onkeypress='return validateNumbers(event)' onblur=toCreateItemDiv1('RowCount',"
				+ rowCount + ")></td>";

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
	}

}

function toCreatPurchaseOrderDiv(RowCount, currentRowCount) {

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
				+ "<td><input type='text'class='form-control input-SmallText' id='textProductName"
				+ rowCount
				+ "' name='textProductName' maxlength='150'></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textUnit"
				+ rowCount
				+ "' name='textUnit' maxlength='6' onkeypress='return validateNumbers(event)'></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textPack"
				+ rowCount
				+ "' name='textPack' maxlength='6' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textComp"
				+ rowCount
				+ "' name='textComp' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textMRP"
				+ rowCount
				+ "' name='textMRP' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textQty"
				+ rowCount
				+ "' name='textQty' maxlength='6' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textScm"
				+ rowCount
				+ "' name='textScm' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textPurRate"
				+ rowCount
				+ "' name='textPurRate' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textAmount"
				+ rowCount
				+ "' name='textAmount' maxlength='8' onkeypress='return validateNumbers(event)' onblur=toCreatPurchaseOrderDiv('RowCount',"
				+ rowCount + ")></td>";

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
	}

}



function toCreateCounterDiv(RowCount, currentRowCount) {

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

		document.getElementById(rowId).innerHTML = "<td><input type='text'class='form-control input-SmallText' id='textNo"
				+ rowCount
				+ "' name='textNo' onkeyup='changeCounterColor("
				+ rowCount
				+ ","
				+ rowCount
				+ ")' maxlength='150'></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textProductName"
				+ rowCount
				+ "' name='textProductName' maxlength='150'></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textUnit"
				+ rowCount
				+ "' name='textUnit' maxlength='6' onkeypress='return validateNumbers(event)'></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textPack"
				+ rowCount
				+ "' name='textPack' maxlength='6' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textCom"
				+ rowCount
				+ "' name='textCom' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textBatchNo"
				+ rowCount
				+ "' name='textBatchNo' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textExp"
				+ rowCount
				+ "' name='textExp' maxlength='6' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textMrp"
				+ rowCount
				+ "' name='textMrp' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textRate"
				+ rowCount
				+ "' name='textRate' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textShelf"
				+ rowCount
				+ "' name='textShelf' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textQty"
				+ rowCount
				+ "' name='textQty' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textAmount"
				+ rowCount
				+ "' name='textAmount' maxlength='8' onblur=toCreateCounterDiv('RowCount',"
				+ rowCount + ")></td>";
		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
	}

}

function toCreatePurchaseDiv(RowCount, currentRowCount) {
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

				+ "<td><input type='text'class='form-control input-SmallText' id='textProduct"
				+ rowCount
				+ "' name='textProductName' maxlength='150'></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textUnit"
				+ rowCount
				+ "' name='textUnit' maxlength='6' onkeypress='return validateNumbers(event)'></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textPack"
				+ rowCount
				+ "' name='textPack' maxlength='6' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textCom"
				+ rowCount
				+ "' name='textCom' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textQty"
				+ rowCount
				+ "' name='textQty' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textSchm"
				+ rowCount
				+ "' name='textSchm' maxlength='6' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textBatch"
				+ rowCount
				+ "' name='textBatch' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textExpiry"
				+ rowCount
				+ "' name='textExpiry' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textDisc"
				+ rowCount
				+ "' name='textDisc' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textVat"
				+ rowCount
				+ "' name='textVat' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textPrft"
				+ rowCount
				+ "' name='textPrft' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textMrp"
				+ rowCount
				+ "' name='textMrp' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textRate"
				+ rowCount
				+ "' name='textRate' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textPurRate"
				+ rowCount
				+ "' name='textPurRate' maxlength='8' ></td>"

				+ "<td><input type='text'class='form-control input-SmallText' id='textAmount"
				+ rowCount
				+ "' name='textAmount' maxlength='8' onblur=toCreatePurchaseDiv('RowCount',"
				+ rowCount + ")></td>";
		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
	}

}

