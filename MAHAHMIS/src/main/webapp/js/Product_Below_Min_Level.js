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

		
		$("#ItemInfoTable > tbody").append("<tr><td><label  class=' input-SmallText'>" 
				+(rowCount)
				+"</label></td>+<td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'onblur=toCreateItemDiv('RowCount',"
				+ rowCount
				+ ")></td>");

		

	$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
	}

}

