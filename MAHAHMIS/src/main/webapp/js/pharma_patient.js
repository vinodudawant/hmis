function setIndentRows() {
	var indentTemplateId = $('#selectIndentTemplate option:selected').val();
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "./pharmacy/indentTemplate/getIndentTemplateDetailsById",
				data : {
					indentTemplateId : indentTemplateId
				},
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					setIndentRowsByTemplateId(r);
				}
			});
}

function setIndentRowsByTemplateId(result) {
	var divContent = "";
	var rowCount = 1;
	for ( var i = 0; i < result[0].indentTemplateSlaves.length; i++) {
		var productId = result[0].indentTemplateSlaves[i].productMaster.productId;
		var productName = result[0].indentTemplateSlaves[i].productMaster.productName;
		var qty = result[0].indentTemplateSlaves[i].productQty;

		divContent = divContent
				+ "<tr id='remove"
				+ rowCount
				+ "'><td style='display:none;'><input type='hidden' id='hiddenProductId"
				+ rowCount
				+ "' value='"
				+ productId
				+ "' "
				+ " ><input type='hidden' value='1' id='hiddenCurrentRow'></td>"

				+ "<input id='orderCompDrugId"
				+ rowCount
				+ "' type='hidden' value='' "
				+ "/>"
				+ "</td>"

				+ "<td>"
				+ "<input type='checkbox' id='chckbox"
				+ rowCount
				+ "' name='checkbox"
				+ rowCount
				+ "'>"
				+ "</td>"

				+ "<td>"
				+ rowCount
				+ "</td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='textProductName"
				+ rowCount
				+ "' data-toggle='modal' data-target='#Pharma_Indent_PopUp_Form' onclick='load("
				+ rowCount + " )'" + " value='" + productName + "'></td>"

				+ "<td><input type='text' onblur=isNumber('textRequireQty"
				+ rowCount
				+ "') class='form-control input-SmallText'  id='textRequireQty"
				+ rowCount + "'  value='" + qty + "'></td> "
				
				/*+ "<td><input type='text' onblur=isNumber('totalQty"
						+ rowCount
						+ "') class='form-control input-SmallText'  id='totalQty"
						+ rowCount + "'  value='" + qty + "'></td> "*/

				+ "</tr>";

		rowCount++;
	}
	$("#indentRowCount").val(rowCount);
	$('#ItemInfoList').html(divContent);
}

function setIndentIPDRows() {
	var indentTemplateId = $('#selectIndentTemplate option:selected').val();
	if(indentTemplateId=='select'){
		
		$('#ItemInfoList').html("");
		return false;
	}
	
	jQuery
			.ajax({
				async : true,
				type : "GET",
				url : "./pharmacy/indentTemplate/getIndentTemplateDetailsById",
				data : {
					indentTemplateId : indentTemplateId
				},
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					setIndentIPDRowsByTemplateId(r);
				}
			});
}

function setIndentIPDRowsByTemplateId(result) {
	var divContent = "";
	var rowCount = 1;
	for ( var i = 0; i < result[0].indentTemplateSlaves.length; i++) {
		var productId = result[0].indentTemplateSlaves[i].productMaster.productId;
		var productName = result[0].indentTemplateSlaves[i].productMaster.productName;
		var qty = result[0].indentTemplateSlaves[i].productQty;
		getTotalStockWithoutExpiry2(productId,rowCount);

		divContent = divContent
				+ "<tr id='remove"
				+ rowCount
				+ "'><td style='display:none;'><input type='hidden' id='hiddenProductId"
				+ rowCount
				+ "' value='"
				+ productId
				+ "' "
				+ " ><input type='hidden' value='1' id='hiddenCurrentRow'></td>"

				+ "<input id='orderCompDrugId"
				+ rowCount
				+ "' type='hidden' value='' "
				+ "/>"
				+ "</td>"

				+ "<td>"
				+ "<input type='checkbox' id='chckbox"
				+ rowCount
				+ "' name='checkbox"
				+ rowCount
				+ "'>"
				+ "</td>"

				+ "<td>"
				+ rowCount
				+ "</td>"

				+ "<td><input type='text' class='form-control input-SmallText' id='textProductName"
				+ rowCount
				+ "' data-toggle='modal' data-target='#Pharma_Indent_PopUp_Form' onclick='load("
				+ rowCount + " )'" + " value='" + productName + "'></td>"

				+ "<td><input type='text' onblur=isNumber('textRequireQty"
				+ rowCount
				+ "') class='form-control input-SmallText'  id='textRequireQty"
				+ rowCount + "'  value='" + qty + "'></td> "
				
				+ "<td><input type='text' onblur=isNumber('totalQty"
						+ rowCount
						+ "') class='form-control input-SmallText'  id='totalQty"
						+ rowCount + "'disabled='disabled'></td> "		

				+ "</tr>";

		rowCount++;
	}
	$("#indentRowCount").val(rowCount);
	$('#ItemInfoList').html(divContent);
}

//added by vishant
function getTotalStockWithoutExpiry2(productId,rowCount) {
	
	var hiddenRowC=$('#hiddenCurrentRow').val();
//	var content = item.value.split("_");
//	var text = item.text;
//	var value = item.value;
//	var rowCount= content[1];
//	var id= content[0];
	
	$('#hiddenProductId'+rowCount).val(productId);
	
	var inputs = [];
	inputs.push('productID=' + productId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./pharmacy/purchase/getTotalStockWithoutExpiry",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			
		if(r!=""){
			$('#totalQty'+rowCount).val(r);
			$('#texttotalQty'+hiddenRowC).val(r);
			}
		else{
			
			$('#totalQty'+rowCount).val("0");
			$('#texttotalQty'+hiddenRowC).val("0");
		}
		}
	});
	//createRow();
}

