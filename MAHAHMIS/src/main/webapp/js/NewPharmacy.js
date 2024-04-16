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
		x.setAttribute('class', 'col-md-12-1');
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("DRRDiv").appendChild(x);

		document.getElementById(rowId).innerHTML = "<td style='height: 21.5px; width:93px;'>"
				+ "<label style='margin-top: 8px;' class='TextFont'>"
				+ (rowCount)
				+ "</label></td>"
				+ "<td style='height: 21.5px; width:383px;'><input type='text' class='form-control input-SmallText' style='margin-top: 8px;' id='itn"
				+ rowCount
				+ "' name='textfield' maxlength='150'></td>"
				+ "<td style='height: 21.5px; width:190px;'><input type='text' class='form-control input-SmallText' style='margin-top: 8px;' id='ip"
				+ rowCount
				+ "' name='textfield' maxlength='8' onkeypress='return validateNumbers(event)'></td>"
				+ "<td style='height: 21.5px; width:190px;'><input type='text' class='form-control input-SmallText' style='margin-top: 8px;' id='aq"
				+ rowCount
				+ "' name='textfield' maxlength='6' onkeypress='return validateNumbers(event)'></td>"
				+ "<td style='height: 21.5px; width:190px;'><input type='text' class='form-control input-SmallText' style='margin-top: 8px;' id='mq"
				+ rowCount
				+ "' name='textfield' maxlength='6' onkeypress='return validateNumbers(event)' onblur=toCreateItemDiv('RowCount',"
				+ rowCount
				+ ")></td>"
				+ "<td style='height: 21.5px; width:93px;'><input type='checkbox' style='margin-top: 12px;' name='chk"
				+ rowCount
				+ "' id='chk"
				+ rowCount
				+ "' /></td>"
				+ "<td style='height: 21.5px; width:2px; display: none'><input type='hidden' class='form-control input-SmallText' style='margin-top: 8px;' id='id"
				+ rowCount
				+ "'></td>"
				+ "<td style='height: 21.5px; width:2px; display: none'><input type='hidden' class='form-control input-SmallText' style='margin-top: 8px;' id='hid"
				+ rowCount + "'></td>";

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
	}

}

