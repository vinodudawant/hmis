var totalRowCount = 0;
var totalRowCnt = 0;

function splitVendorContentPo(content) {
	$('#hiddenVendorId').val(0);
	if (content != "") {
		var arr = content.split("-");
		$('#txtPartyName').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenVendorId').val(arr[1]);
		}
	} else {
		$('#hiddenVendorId').val(0);
	}
}

function getNextAutoIncrement() {

	var inputs = [];

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/po/getNextAutoIncrement",
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

function saveProductWithZeroLevel() {
	var favorite = [];
	
	fetchProductDetails();
	var totalRow = totalRowCount;

	if (totalRow.length < 1) {
		alert("Enter Only Valid data");
		return false;
	}
	
	$.each($("input[name='deleteGroup']:checked"), function() {
		favorite.push($(this).val());

	});

	var txtDate = $("#txtOrdeDate").val();
	var txtVendorId = 0;
	var remark = "";
	var count = 0;
	var total = 0;
	var vatTotal = 0;
	var netTotal = 0;

	if ($('#hiddenVendorId').val() != null && $('#hiddenVendorId').val() != "")
		txtVendorId = $("#hiddenVendorId").val();

	if ($('#poRemark').val() != null && $('#poRemark').val() != "")
		remark = $("#poRemark").val();

	var docNum = $("#txtOrderNo").val();

	if ($('#txtCount').val() != null && $('#txtCount').val() != "")
		count = $("#txtCount").val();

	if ($('#txtTotal').val() != null && $('#txtTotal').val() != "")
		total = $("#txtTotal").val();

	if ($('#textVatTotal').val() != null && $('#textVatTotal').val() != "")
		vatTotal = $("#textVatTotal").val();

	if ($('#textNetTotal').val() != null && $('#textNetTotal').val() != "")
		netTotal = $("#textNetTotal").val();

	var materiallist = {
		ltPOslave : []
	};

	for ( var i = 0; i < favorite.length; i++) {
		var productId = 0;
		var mrp = 0;
		var vat = 0;
		var qty = 0;
		var purchaseRate = 0;
		var amt = 0;

		if ($('#hiddenProductId' +favorite[i]).val() != null
				&& $('#hiddenProductId' +  favorite[i]).val() != "")
			productId = $("#hiddenProductId" +  favorite[i]).val();

		if ($('#textMrp' + favorite[i]).val() != null && $('#textMrp'+favorite[i]).val() != "")
			mrp = $("#textMrp" + i).val();

		if ($('#textVatId' + favorite[i]).val() != null
				&& $('#textVatId'+favorite[i]).val() != "")
			vat = $("#textVatId"+favorite[i]).val();

		if ($('#textQty' +favorite[i]).val() != null && $('#textQty'+favorite[i]).val() != "")
			qty = $("#textQty"+favorite[i]).val();

		if ($('#textPurchaseRate'+favorite[i]).val() != null
				&& $('#textPurchaseRate' +favorite[i]).val() != "")
			purchaseRate = $("#textPurchaseRate" +favorite[i]).val();

		if ($('#textAmt'+favorite[i]).val() != null && $('#textAmt'+favorite[i]).val() != "")
			amt = $("#textAmt"+favorite[i]).val();

		if (qty == "" || qty == 0) {
			alert("Please Enter Proper Quantity");
			$("#textQty"+favorite[i]).focus();
			return false;
		}

		materiallist.ltPOslave.push({
			poSlaveQty : qty,
			poSlaveMrp : mrp,
			poSlaveRate : purchaseRate,
			poSlaveAmt : amt,
			poSlaveVat : vat,
			productMaster : {
				'productId' : productId
			}
		});

	}

	if (materiallist.ltPOslave.length < 0) {
		alert("Please Enter Valid Data");
		return false;
	}

	materiallist = JSON.stringify(materiallist);

	var inputs = [];

	// General Info
	inputs.push("ltPOslave=" + materiallist);
	inputs.push("txtVendorId=" + txtVendorId);
	inputs.push("txtDate=" + txtDate);
	inputs.push("documentNum=" + docNum);
	inputs.push("remark=" + remark);
	inputs.push("count=" + count);
	inputs.push("total=" + total);
	inputs.push("vatTotal=" + vatTotal);
	inputs.push("netTotal=" + netTotal);
	var str = inputs.join('&');
	
	if ($('#txtTotal').val() != null && $('#txtTotal').val() != ""  && $('#txtTotal').val() != 0) 
	{
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str,
				url : "../productWithZeroStk/saveProductWithZeroStock",
				catche : false,
				error : function() {
					alert("oops something went wrong related to stock please save proper data or check mrp");
				},
				success : function(r) {

					if (r[0] == 'error') {
						alert(r[1]);
					} else {
						alert("Record saved successfully..!");
						window.location.href = "view";
						window.open(
								"/EhatEnterprise/pharmacy/productWithZeroStk/printView?poId="
										+ r[0], '_blank');

					}

				}
			});
	
	}else
	{
	alert("Select product name");
	$('#textProductName1').focus();
	}

}

function fetchProductDetails() {
	var favorite = [];
	$.each($("input[name='deleteGroup']:checked"), function() {
		favorite.push($(this).val());

	});

	for ( var i = 0; i < favorite.length; i++) {
		/*
		 * var proName = $("#textProductName" + favorite[i]).val();
		 * alert(proName);
		 */
		totalRowCount++;
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
								+ "</label></td>+<td><input  id='txtProduct"
								+ rowCount
								+ "' type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'></td><td><input type='text' class='form-control input-SmallText'onblur=toCreateProductBelowMinLevel('RowCount',"
								+ rowCount + ")></td>");

		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;
		$("#txtProduct" + rowCount).focus();
	}

}


function setMilLevelTableContent(result) {
	var r = result;
	var divContent = "";

	for ( var i = 0; i < result.length; i++) {

		divContent = divContent
				+ " <tr> <td><label class='input-SmallText'>"
				+ (i + 1)
				+ "</label></td>"

				+ "<td><input type='hidden' name='ltPOslave["
				+ (i + 1)
				+ "].productMaster.productId' id='hiddenProductId"
				+ (i + 1)
				+ "' value='"
				+ r[i].productId
				+ "' /><input readonly='true' name='ltPOslave["
				+ (i + 1)
				+ "].productMaster.productName' id='textProductName"
				+ (i + 1)
				+ "' type='text' data-toggle='modal' class='form-control input-SmallText' value='"
				+ r[i].productName
				+ "' ></td>"

				+ "<td><input name='ltPOslave["
				+ (i + 1)
				+ "].productMaster.productUnit' id='textUnit"
				+ (i + 1)
				+ "' readonly='true' type='text' data-toggle='modal' class='form-control input-SmallText'  value='"
				+ r[i].unit
				+ "' ></td>"

				+ "<td><input name='ltPOslave["
				+ (i + 1)
				+ "].productMaster.packingMaster.packType' id='textPacking"
				+ (i + 1)
				+ "' type='text' data-toggle='modal' class='form-control input-SmallText' value='"
				+ r[i].packing
				+ "' readonly='true'></td>"

				+ "<td><input  name='ltPOslave["
				+ (i + 1)
				+ "].poSlaveMrp' id='textMrp"
				+ (i + 1)
				+ "' type='text' data-toggle='modal' class='form-control input-SmallText' value='"
				+ "' onblur='calculateAmount("
				+ (i + 1)
				+ ")'></td>"

				+ "<td><input name='ltPOslave["
				+ (i + 1)
				+ "].poSlaveQty' id='textQty"
				+ (i + 1)
				+ "' type='text' data-toggle='modal' class='form-control input-SmallText' value='"
				+ "' onblur='calculateAmount("
				+ (i + 1)
				+ ")'></td>"

				+ "<td><input id='textTotalStock"
				+ (i + 1)
				+ "' type='text' data-toggle='modal' class='form-control input-SmallText' value='"
				+ r[i].totalStock
				+ "' readonly='true'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' name='ltPOslave["
				+ (i + 1)
				+ "].poSlaveVat'  readonly='true' id='textVatId"
				+ (i + 1)
				+ "' value='"
				+ r[i].vat
				+ "' </td>"

				+ "<td><input  name='ltPOslave["
				+ (i + 1)
				+ "].poSlaveRate' id='textPurchaseRate"
				+ (i + 1)
				+ "' type='text' data-toggle='modal' class='form-control input-SmallText' value='"
				+ "' onblur='calculateAmount("
				+ (i + 1)
				+ ")'></td>"

				+ "<td><input name='ltPOslave["
				+ (i + 1)
				+ "].poSlaveAmt'  id='textAmt"
				+ (i + 1)
				+ "' type='text' data-toggle='modal' class='form-control input-SmallText' value='"
				+ "' ></td>"

				+ "<td><input  id='textMinLevel"
				+ (i + 1)
				+ "' type='text' data-toggle='modal' class='form-control input-SmallText' value='"
				+ r[i].minLevel
				+ "' readonly='true'></td>"

				+ "<td><input id='textMaxLevel"
				+ (i + 1)
				+ "' type='text' data-toggle='modal' class='form-control input-SmallText' value='"
				+ r[i].maxLevel + "' readonly='true'></td>"

				+ "<td><input type='checkbox' name='deleteGroup' value='"
				+ (i + 1) + "' id='deleteGroup"
				+ "'onclick='calculateTotal()'></td>" + "</tr>";
		totalRowCnt++;
	}

	divContent = divContent
			+ " <tr> <td><label class='input-SmallText'>"
			+ (i + 1)
			+ "</label></td>"

			+ "<td><input type='hidden' name='ltPOslave["
			+ (i + 1)
			+ "].productMaster.productId' id='hiddenProductId"
			+ (i + 1)
			+ "' /><input  name='ltPOslave["
			+ (i + 1)
			+ "].productMaster.productName' id='textProductName"
			+ (i + 1)
			+ "' type='text' data-toggle='modal' class='form-control input-SmallText' "
			+ " data-target='#Product_Below_min_level_Form' onclick='loadPopUp("
			+ (totalRowCnt + 1)
			+ ","
			+ 0
			+ ","
			+ 1
			+ ")'></td>"

			+ "<td><input id='textUnit"
			+ (i + 1)
			+ "' readonly='true' readonly='true' name='ltPOslave["
			+ (i + 1)
			+ "].productMaster.productUnit' type='text' data-toggle='modal' class='form-control input-SmallText' "
			+ " ></td>"

			+ "<td><input id='textPacking"
			+ (i + 1)
			+ "' type='text' readonly='true' name='ltPOslave["
			+ (i + 1)
			+ "].productMaster.packingMaster.packType' data-toggle='modal' class='form-control input-SmallText' "
			+ " readonly='true'></td>"

			+ "<td><input id='textMrp"
			+ (i + 1)
			+ "' type='text' name='ltPOslave["
			+ (i + 1)
			+ "].poSlaveMrp' data-toggle='modal' class='form-control input-SmallText' "
			+ " onblur='calculateAmount("
			+ (i + 1)
			+ ")' ></td>"

			+ "<td><input id='textQty"
			+ (i + 1)
			+ "' type='text' name='ltPOslave["
			+ (i + 1)
			+ "].poSlaveQty' data-toggle='modal' class='form-control input-SmallText' "
			+ " onblur='calculateAmount("
	        + (i + 1)
			+ ")'></td>"

			+ "<td><input id='textTotalStock"
			+ (i + 1)
			+ "' type='text'  data-toggle='modal' class='form-control input-SmallText' "
			+ " readonly='true'></td>"

			+ "<td><input type='text' class='form-control input-SmallText' name='ltPOslave["
			+ (i + 1)
			+ "].poSlaveVat' id='textVatId"
			+ (i + 1)
			+ "' readonly='true'</td>"

			+ "<td><input id='textPurchaseRate"
			+ (i + 1)
			+ "' type='text'  name='ltPOslave["
			+ (i + 1)
			+ "].poSlaveRate' data-toggle='modal' class='form-control input-SmallText' "
			+ " onblur='calculateAmount("
		    + (i + 1)
		   + ")'></td>"

			+ "<td><input id='textAmt"
			+ (i + 1)
			+ "' type='text' readonly='true' name='ltPOslave["
			+ (i + 1)
			+ "].poSlaveAmt' data-toggle='modal' class='form-control input-SmallText' "

			+ " ></td>"

			+ "<td><input id='textMinLevel"
			+ (i + 1)
			+ "' type='text'  data-toggle='modal' class='form-control input-SmallText' "
			+ " readonly='true'></td>"

			+ "<td><input id='textMaxLevel"
			+ (i + 1)
			+ "' type='text' data-toggle='modal' class='form-control input-SmallText' "
			+ " readonly='true'></td>"

			+ "<td><input type='checkbox'  name='deleteGroup' value='"
			+ (i + 1) + "' id='deleteGroup" + (i + 1)
			+ "' onclick='calculateTotal()'></td>" + "</tr>";
	totalRowCnt++;

	$("#RowCount").val((result.length)+1);
	$('#HSTDiv').html(divContent);

}

function calculateAmount(value) {
	var qty = 0;
	var rate = 0;

	if ($("#textPurchaseRate" + value).val() != ''
			&& $("#textPurchaseRate" + value).val() != 'null') {
		rate = $("#textPurchaseRate" + value).val();
	}

	if ($("#textQty" + value).val() != ''
			&& $("#textQty" + value).val() != 'null') {
		qty = $("#textQty" + value).val();
	}

	$("#textAmt" + value).val((rate * qty).toFixed(3));

	calculateTotal();
}

function calculateTotal() {

	var count = 0;
	var amt = 0;
	var amount = 0;
	var favorite = [];
	var total = 0;
	var vatamt = 0;
	var vat = 0;
	
	$.each($("input[name='deleteGroup']:checked"), function() {
		favorite.push($(this).val());
		count++ ;
	});
	
	for ( var i = 0; i < favorite.length; i++) 
	{
		
		if ($('#textAmt' + favorite[i]).val() != '' && $('#textAmt' + favorite[i]).val().length > 0)
			total = total + parseFloat($("#textAmt" + favorite[i]).val());
		
		if ($('#textAmt' + favorite[i]).val() != '' && $('#textAmt' + favorite[i]).val().length > 0)
			amt = parseFloat($('#textAmt' + favorite[i]).val());
		
		if ($('#textVatId' + favorite[i]).val() != ''
				&& $('#textVatId' + favorite[i]).val().length > 0)
			vat = parseFloat(($('#textVatId' + favorite[i]).val()) / 100);

		vatamt = vatamt + (parseFloat(vat) * parseFloat(amt));
		amount = total + vatamt;
		
		$("#txtTotal").val((total).toFixed(3));
		$("#txtCount").val(count);
		$("#textVatTotal").val((vatamt).toFixed(3));
		$("#textNetTotal").val((amount).toFixed(3));
	}
	if (favorite.length == 0) {
		$("#txtTotal").val(0);
		$("#txtCount").val(0);
		$("#textVatTotal").val(0);
		$("#textNetTotal").val(0);
	}

}

function productWithZeroLevelPrint(partywisePoId) {
	window.open("/EhatEnterprise/pharmacy/productWithZeroStk/printView?poId="
			+ partywisePoId + "");

}

function deleteProductWithZeroLevel(purchaseOrderId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	var poId = parseInt(purchaseOrderId);
	
		var inputs = [];
		inputs.push('poId=' + poId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/po/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						//getPOList();
						if (r == true) {
							/*$('#msgDiv')
									.html(
											"<div class='alert alert-success' >Record deleted successfully..!</div>");*/
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

function toCreatPurchaseOrderDiv(RowCount, currentRowCount) {

	var currentRow = currentRowCount;
	if (currentRow == undefined) {
		currentRow = 0;
	}

	var rowCount = $('#' + RowCount).val();
	if (rowCount == -1) {
		rowCount = 0;
	}
	if (rowCount == currentRow) {
		rowCount++;
		rowId = "remove" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', rowId);
		x.setAttribute('style', 'margin-top:0px');
		document.getElementById("HSTDiv").appendChild(x);
		/* var index = parseInt(rowCount) - 1; */
		document.getElementById(rowId).innerHTML = "<td><label class='input-SmallText'>"
				+ (totalRowCnt + 1)
				+ "</label></td>"

				+ "<td><input type='hidden' name='ltPOslave["
				+ (totalRowCnt + 1)
				+ "].productMaster.productId' id='hiddenProductId"
				+ (totalRowCnt + 1)
				+ "' /><input  name='ltPOslave["
				+ (totalRowCnt + 1)
				+ "].productMaster.productName' id='textProductName"
				+ (totalRowCnt + 1)
				+ "' type='text' data-toggle='modal' class='form-control input-SmallText' "
				+ " data-target='#Product_Below_min_level_Form' onclick='loadPopUp("
				+ (totalRowCnt + 1)
				+ ","
				+ 0
				+ ","
				+ 1
				+ ")'></td>"

				+ "<td><input id='textUnit"
				+ (totalRowCnt + 1)
				+ "' readonly='true' readonly='true' name='ltPOslave["
				+ (totalRowCnt + 1)
				+ "].productMaster.productUnit' type='text' data-toggle='modal' class='form-control input-SmallText' "
				+ " ></td>"

				+ "<td><input id='textPacking"
				+ (totalRowCnt + 1)
				+ "' type='text' readonly='true' name='ltPOslave["
				+ (totalRowCnt + 1)
				+ "].productMaster.packingMaster.packType' data-toggle='modal' class='form-control input-SmallText' "
				+ " readonly='true'></td>"

				+ "<td><input id='textMrp"
				+ (totalRowCnt + 1)
				+ "' type='text' name='ltPOslave["
				+ (totalRowCnt + 1)
				+ "].poSlaveMrp' data-toggle='modal' class='form-control input-SmallText' "
				+ " onblur='calculateAmount("
				+ (i + 1)
				+ ")' ></td>"

				+ "<td><input id='textQty"
				+ (totalRowCnt + 1)
				+ "' type='text'  name='ltPOslave["
				+ (totalRowCnt + 1)
				+ "].poSlaveQty' data-toggle='modal' class='form-control input-SmallText' "
				+ " onblur='calculateAmount("
				+ (i + 1)
				+ ")' ></td>"

				+ "<td><input id='textTotalStock"
				+ (totalRowCnt + 1)
				+ "' type='text'  data-toggle='modal' class='form-control input-SmallText' "
				+ " readonly='true'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' name='ltPOslave["
				+ (totalRowCnt + 1)
				+ "].poSlaveVat' id='textVatId"
				+ (totalRowCnt + 1)
				+ "' readonly='true'></td>"

				+ "<td><input id='textPurchaseRate"
				+ (totalRowCnt + 1)
				+ "' type='text'  name='ltPOslave["
				+ (totalRowCnt + 1)
				+ "].poSlaveRate' data-toggle='modal' class='form-control input-SmallText' "
				+ " onblur='calculateAmount("
				+ (i + 1)
				+ ")' ></td>"

				+ "<td><input id='textAmt"
				+ (totalRowCnt + 1)
				+ "' type='text'  name='ltPOslave["
				+ (totalRowCnt + 1)
				+ "].poSlaveAmt' data-toggle='modal' class='form-control input-SmallText' "

				+ " ></td>"

				+ "<td><input id='textMinLevel"
				+ (totalRowCnt + 1)
				+ "' type='text'  data-toggle='modal' class='form-control input-SmallText' "
				+ " readonly='true'></td>"

				+ "<td><input id='textMaxLevel"
				+ (totalRowCnt + 1)
				+ "' type='text' data-toggle='modal' class='form-control input-SmallText' "
				+ " readonly='true'></td>"

				+ "<td><input type='checkbox'  name='deleteGroup' value='"
				+ (totalRowCnt + 1)
				+ "' id='deleteGroup"
				+ (totalRowCnt + 1)
				+ "' onclick='calculateTotal()'></td></tr>";

		$("#RowCount").val(rowCount);
		$('#textProductName' + rowCount).focus();
		fillRow(totalRowCnt);

	} else {
		fillRow(totalRowCnt);
	}
}

function fillRow(rCount) {
	
	var rowCount = parseInt(rCount);
	$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
	$('#textProductName' + rowCount).val($('#particulars').val());
	$('#textUnit' + rowCount).val($('#txtUnit').val());
	$('#textPacking' + rowCount).val($('#txtPack').val());
	$('#textQty' + rowCount).val($('#txtQty').val());
	$('#textTotalStock' + rowCount).val($('#txtClStk').val());
	$('#textVatId' + rowCount).val($('#txtVat').val());
	$('#textPurchaseRate' + rowCount).val($('#txtPurRate').val());
	$('#textAmt' + rowCount).val($('#txtClStk').val());
	var purchaseRate = parseFloat($('#txtPurRate').val());
	var qty = parseInt($('#txtQty').val());
	$('#textAmt' + rowCount).val(purchaseRate * qty);
	totalRowCnt++;

}

function splitVendorProductWithZero(content) {
	
	if (content != "") {
		var arr = content.split("-");
		$('#txtPartyName1').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenVendorId1').val(arr[1]);
		}
	} else {
		$('#hiddenVendorId1').val(0);
	}
}
function searchPurchaseOrder(id) {

	var inputs = [];
	inputs.push('vendorId=' + id);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/po/getPObyVendorId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if (r =="") {
				alert("Data not found!");
				$('#txtPartyName').val('');
			}
			$("#hiddenVendorId1").val('');
			setTableContent(r);
		

		}
	});

	return true;
}

function setTableContent(result) {
	var r = result;

	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		var poDate = getDate(r[i].poDate);
		divContent = divContent
				+ " <tr><td class='col-md-1 center'>"
				+ (i + 1)
				+ " <input type='hidden' id='poId"
				+ r[i].poId
				+ "' value='"
				+ r[i].poId
				+ "'></td><td style='display: none' class='col-md-2 center'>"
				+ r[i].poId
				+ "<input type='hidden' id='poId"
				+ r[i].poId
				+ "' value='"
				+ r[i].poId
				+ "'></td><td  class='col-md-2 center'>"
				+ r[i].poDeleteFlag
				+ "<input type='hidden' id='invoiceId"
				+ r[i].poId
				+ "' value='"
				+ r[i].poDeleteFlag
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].podocId
				+ "<input type='hidden' id='podocId"
				+ r[i].poId
				+ "' value='"
				+ r[i].podocId
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].vendorMaster.vendorName
				+ "<input type='hidden' id='poVendorName"
				+ r[i].poId
				+ "' value='"
				+ r[i].vendorMaster.vendorName
				+ "'></td><td class='col-md-2 center'>"
				+ poDate
				+ "<input type='hidden' id='poDate"
				+ r[i].poId
				+ "' value='"
				+ poDate
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].poProductCount
				+ "<input type='hidden' id='ProductCount"
				+ +r[i].poId
				+ "'value='"
				+ r[i].poProductCount
				+ "'>"
				+ "</td><td class='col-md-2 center'>"
				+ r[i].poStatus
				+ "<input type='hidden' id='poStatus"
				+ +r[i].poId
				+ "'value='"
				+ r[i].poStatus
				+ "'>"
				+ "</td><td style='display: none' id='vendorId'>"
				+ r[i].vendorMaster.vendorId
				+ "<input type='hidden' id='povendorId"
				+ +r[i].poId
				+ "'value='"
				+ r[i].vendorMaster.vendorId
				+ "'>"
				+ "<td class='col-md-2 center'><a id='btnPrint"
				+ r[i].poId
				+ "' class='btn btn-xs btn-success'  onclick='purchaseOrderPrint("
			    + r[i].poId
			    + ")'> <i class='fa fa-print'></i> </a></td>"
				/*+ "</td><td class='col-md-2 center'> <button id='btnEdit"
				+ r[i].poId
				+ "' class='btn btn-xs btn-success' onclick='edit("
				+ r[i].poId
				+ ")' value='PRINT'> <i class='fa fa-edit'></i> </button> </td>"*/

				+ "<td class='col-md-2 center'> <a id='btnEdit"
				+ r[i].poId
				+ "' class='btn btn-xs btn-success'  value='EDIT' href='/EhatEnterprise/pharmacy/po/edit-view?poId="
				+ r[i].poId
				+ "'>"
				+ "<i class='fa fa-edit'></i> </a></td>"

				+ "<td class='col-md-2 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deletePO("
				+ r[i].poId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divProductOrderList').html(divContent);
}
//get formatted date dd/mm/yyyy
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

function searchPurchaseOrder(id) {
	
	var inputs = [];
	inputs.push('vendorId=' + id);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/productWithZeroStk/getPObyVendorDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if (r =="") {
				alert("Data not found!");
				$('#txtPartyName').val('');
			}
			$("#hiddenVendorId1").val('');
			setTableContent(r);
		

		}
	});

	return true;
}
//get formatted date dd/mm/yyyy
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
function setTableContent(result) {
	var r = result;

	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		var poDate = getDate(r[i].poDate);
		divContent = divContent
				+ " <tr><td class='col-md-1 center'>"
				+ (i + 1)
				+ " <input type='hidden' id='poId"
				+ r[i].poId
				+ "' value='"
				+ r[i].poId
				+ "'></td><td style='display: none' class='col-md-2 center'>"
				+ r[i].poId
				+ "<input type='hidden' id='poId"
				+ r[i].poId
				+ "' value='"
				+ r[i].poId
				+ "'></td><td  class='col-md-2 center'>"
				+ r[i].poDeleteFlag
				+ "<input type='hidden' id='invoiceId"
				+ r[i].poId
				+ "' value='"
				+ r[i].poDeleteFlag
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].podocId
				+ "<input type='hidden' id='podocId"
				+ r[i].poId
				+ "' value='"
				+ r[i].podocId
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].vendorMaster.vendorName
				+ "<input type='hidden' id='poVendorName"
				+ r[i].poId
				+ "' value='"
				+ r[i].vendorMaster.vendorName
				+ "'></td><td class='col-md-2 center'>"
				+ poDate
				+ "<input type='hidden' id='poDate"
				+ r[i].poId
				+ "' value='"
				+ poDate
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].poProductCount
				+ "<input type='hidden' id='ProductCount"
				+ +r[i].poId
				+ "'value='"
				+ r[i].poProductCount
				+ "'>"
				+ "</td><td class='col-md-2 center'>"
				+ r[i].poStatus
				+ "<input type='hidden' id='poStatus"
				+ +r[i].poId
				+ "'value='"
				+ r[i].poStatus
				+ "'>"
				+ "</td><td style='display: none' id='vendorId'>"
				+ r[i].vendorMaster.vendorId
				+ "<input type='hidden' id='povendorId"
				+ +r[i].poId
				+ "'value='"
				+ r[i].vendorMaster.vendorId
				+ "'>"
				+ "<td class='col-md-2 center'><a id='btnPrint"
				+ r[i].poId
				+ "' class='btn btn-xs btn-success'  onclick='purchaseOrderPrint("
			    + r[i].poId
			    + ")'> <i class='fa fa-print'></i> </a></td>"
				/*+ "</td><td class='col-md-2 center'> <button id='btnEdit"
				+ r[i].poId
				+ "' class='btn btn-xs btn-success' onclick='edit("
				+ r[i].poId
				+ ")' value='PRINT'> <i class='fa fa-edit'></i> </button> </td>"*/

				/*+ "<td class='col-md-2 center'> <a id='btnEdit"
				+ r[i].poId
				+ "' class='btn btn-xs btn-success' value='EDIT' href='/EhatEnterprise/pharmacy/po/edit-view?poId="
				+ r[i].poId
				+ "'>"
				+ "<i class='fa fa-edit'></i> </a></td>"*/

				+ "<td class='col-md-2 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deletePO("
				+ r[i].poId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divProductOrderList').html(divContent);
}

