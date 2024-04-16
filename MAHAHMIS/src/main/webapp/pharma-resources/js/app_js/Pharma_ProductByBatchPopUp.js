function splitBatchContent(content) {
	setFocusBatchPopUp();

	for ( var i = 0; i < content.length; i++) {
		var arr = content[i].split("#");
		
		if (i == 0) {
			$("#batchData")
					.html(
							"<tr><td>"
									+ "<input type='radio' name='row' id='rowId"
									+ i
									+ "' value="
									+ i
									+ " checked='true' autofocus='autofocus'></td>"
									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchCode"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchExpiry"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchMRP"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchRate"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td style='display:none;'><input type='text'"
									+ "class='form-control input-SmallText'  id='textBatchVat"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									+ "<td style='display:none;'><input type='text'"
									+ "class='form-control input-SmallText'  id='textBatchIgst"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									+ "<td style='display:none;'><input type='text'"
									+ "class='form-control input-SmallText'  id='textBatchCess"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchPurRate"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td style='display:none;'><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchPopUpBatchId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td style='display:none;'><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchStockId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchClearStock"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									+ "<td style='display:none;'><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textPurchaseSlaveId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									+ "<td style='display:none;'><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textSchemeStock"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									+ "</tr>");

		} else {
			$("#batchData")
					.append(
							"<tr><td>"
									+ "<input type='radio' name='row' value="
									+ i
									+ " id='rowId"
									+ i
									+ "'></td>"
									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchCode"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchExpiry"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchMRP"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchRate"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td style='display:none;'><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchVat"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									+ "<td style='display:none;'><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchIgst"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									+ "<td style='display:none;'><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchCess"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchPurRate"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td style='display:none;'><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchPopUpBatchId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td style='display:none;'><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchStockId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"

									+ "<td><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textBatchClearStock"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									+ "<td style='display:none;'><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textPurchaseSlaveId"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									
									
								    + "<td style='display:none;'><input type='text'"
									+ "class='form-control input-SmallText' readonly='true' id='textSchemeStock"
									+ i
									+ "'"
									+ "tabindex='-1' /></td>"
									+ "</tr>");
		}
		$("#textBatchCode" + i).val(arr[0]);
		$("#textBatchExpiry" + i).val(arr[1]);
		
		
		$("#textBatchPurRate" + i).val(arr[2]);
		$("#textBatchMRP" + i).val(arr[3]);
		$("#textBatchClearStock" + i).val(arr[4]);
		$("#textBatchPopUpBatchId" + i).val(arr[5]);
		$("#textBatchStockId" + i).val(arr[6]);
		$("#textBatchRate" + i).val(arr[3]);
		$("#textBatchVat" + i).val(arr[8]);
		$("#textPurchaseSlaveId" + i).val(arr[9]);
		$("#textBatchIgst" + i).val(arr[10]);
		$("#textBatchCess" + i).val(arr[11]);
		//manisha
		$("#textSchemeStock" + i).val(arr[12]);
				
	}
}

function getProductByBatch(productId) {

	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			productId : productId
		},
		url : "../../pharmacy/product/autoSuggestionProductByBatch",
		timeout : 1000 * 60 * 15,

		error : function(error) {
			alert('error' + error);
		},
		success : function(r) {
			if (r.length > 0) {
				splitBatchContent(r);
			} else {
				$("#batchData").html("");
			}
		}
	});
}
