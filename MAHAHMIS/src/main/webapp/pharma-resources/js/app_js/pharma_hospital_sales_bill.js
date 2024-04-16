var productsArray = [];
var showValue = 0;
var totalRowCount = 1;

function deleteHospitalSale(patientId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
		reset();
		alertify.success("Record deleted successfully");

		var inputs = [];
		inputs.push('patientId=' + patientId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/hospitalSalesBill/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {

						if (r == true) {
							/*
							 * $('#msgDiv') .html( "<div class='alert
							 * alert-success' >Record deleted successfully..!</div>");
							 * hideResultDiv(); location.reload();
							 */

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

function calculateAmount(value) {
	// net amount
	var rate = 0;
	var qty = 0;
	var unit = 0;
	var ratePerUnit = 0;
	var DiscAmt = 0;

	if ($('#txtRate').val() != '' && $('#txtRate').val().length > 0)
		rate = parseFloat($('#txtRate').val());

	if ($('#txtQty').val() != '' && $('#txtQty').val().length > 0)
		qty = parseFloat($('#txtQty').val());

	if (value == 'qty')
		$("#txtRate").focus();

	if ($('#txtUnit').val() != '' && $('#txtUnit').val().length > 0)
		unit = parseFloat($('#txtUnit').val());

	if ($('#hiddenProductId').val() != ''
			&& $('#hiddenProductId').val().length > 0)
		ratePerUnit = (rate / unit).toFixed(3);

	/*
	 * var round = Math.round(ratePerUnit);
	 * 
	 * if (round == 0) $("#txtRatePerUnit").val(1); else
	 */
	$("#txtRatePerUnit").val(ratePerUnit);

	/*$('#txtAmount').val(ratePerUnit * qty);*/
	
	
	var finalAmout = (ratePerUnit * qty).toFixed(3);
	
	if ($('#txtDis').val() != '' && $('#txtDis').val().length > 0)
	{
	  discount = parseFloat($('#txtDis').val());
	  DiscAmt=(discount/100)*finalAmout;
	}
	
	if($('#txtDiscAmt').val() != '' && $('#txtDiscAmt').val().length > 0)
	{
		  DiscAmt=parseFloat($('#txtDiscAmt').val());
	}
	
	 if(DiscAmt<finalAmout)
		   	$('#txtAmount').val((finalAmout-DiscAmt).toFixed(3));
	else
		{
		$('#txtAmount').val((ratePerUnit * qty).toFixed(3));
		}

	

}
/*
 * function calculatePopUpAmt() { var qty = 0; var purRate = 0;
 * 
 * if (parseInt($('#txtQty').val()) != '' && $('#txtQty').val().length > 0) qty =
 * parseInt($('#txtQty').val());
 * 
 * if (parseFloat($('#txtRate').val()) != '' && $('#txtRate').val().length > 0)
 * purRate = parseFloat($('#txtRate').val());
 * 
 * $('#txtAmount').val((qty * purRate)); }
 */
function setFocusToRate() {
	$("#txtRate").focus();
}
function validateSpeDisc() {
	var speDis = parseFloat($('#txtSpecialDisc').val());
	var cdAmt = parseFloat($('#txtCDAmt').val());
	if (speDis > 0) {
		if (cdAmt >= speDis) {
			alert("Special discount should be greater than CD Amount!");
			$('#txtSpecialDisc').val('');
			$('#txtLess').val('0');
			$('#txtSpecialDisc').focus();
		} else
			calculateDiscount();
	}
	validateLess();
}

function validateLess() {
	var GrossAmt = parseFloat($('#txtGrossAmt').val());
	var Less = parseFloat($('#txtLess').val());
	if (Less > 0) {
		if (Less >= GrossAmt) {
			alert("Less should be less than gross amount!");
			$('#txtSpecialDisc').focus();
			$('#txtSpecialDisc').val('');
			$('#txtCD').val('');
			$('#txtCDAmt').val('');
			$('#txtSurcharge').val('');
			$('#txtAdd').val('0');
			$('#txtLess').val('0');

		}
	}
	calculateNetAmount();
}

function CheckDis() {
	var cd = parseFloat($('#txtCD').val());
	if (cd > 99) {
		alert("CD% should be less than 100");
		$('#txtCD').val('');
		$('#txtCDAmt').val('');
	}
	calculateDiscount();

}

function searchHospitalSale(id) {
	var inputs = [];
	inputs.push('InwardNo=' + id);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "/EhatEnterprise/pharmacy/hospitalSalesBill/hospitalSalesBillDetails",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {

					if (r == "") {
						alert("Record not found!");
					}
					setTableData(r);

				}
			});

	return true;
}

function setTableData(result) {
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		divContent = divContent
				+ " <tr><td class='col-md-1 center'>"
				+ (i + 1)
				+ " <input type='hidden' id='hiddenHospitalSaleBillId"
				+ r[i].hospitalBillId
				+ "' value='"
				+ r[i].hospitalBillId
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].hospitalBillInwardNo
				+ "<input type='hidden' id='InwardNo"
				+ r[i].hospitalBillId
				+ "' value='"
				+ r[i].hospitalBillInwardNo
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].patientName
				+ "<input type='hidden' id='patientName"
				+ r[i].hospitalBillId
				+ "' value='"
				+ r[i].patientName
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].hospitalBillWard
				+ "<input type='hidden' id='PatientWard"
				+ r[i].hospitalBillId
				+ "' value='"
				+ r[i].hospitalBillWard
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].hospitalBillDocNo
				+ "<input type='hidden' id='HospitalBillNum"
				+ +r[i].hospitalBillId
				+ "'value='"
				+ r[i].hospitalBillDocNo
				+ "'>"
				+ "</td>"
				+ "<td class='col-md-2 center'><a id='btnPrint"
				+ r[i].hospitalBillId
				+ "' class='btn btn-xs btn-success'  href='/EhatEnterprise/pharmacy/hospitalSalesBill/printView?hospitalSaleId="
				+ r[i].hospitalBillId
				+ "'> <i class='fa fa-print'></i> </a></td>"

				+ "<td class='col-md-2 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick=' deleteHospitalSale("
				+ r[i].hospitalBillId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divHospitalSaleList').html(divContent);
}

function splitPatientContent(content) {

	if (content != "") {
		var arr = content.split("-");
		$('#txtPatient').val(arr[0]);

		if (arr.length > 1) {
			$('#txtPatientAddress').val(arr[1]);
			$('#hiddenPatientId').val(arr[2]);
		}

	} else {
		$('#hiddenId').val(0);
	}
}

function splitHospitalContent(content) {
	if (content != "") {
		var arr = content.split("&&");
		$('#txtInwardNo').val(arr[0]);
		if (arr.length > 1) {
			$('#txtPatient').val(arr[1]);
			$('#txtPatientAddress').val(arr[2]);
			$('#txtDoctor').val(arr[3]);
			$('#txtDoctorAddress').val(arr[4]);
			$('#txtWard').val(arr[5]);
			$('#txtMobileNumber').val(arr[8]);

			$('#hiddenPatientId').val(arr[6]);
			$('#hiddenDoctorId').val(arr[7]);

			var productsQtyArray = $("#productsQuantity").val();
			var result = productsQtyArray.split(",");
			if (result.length > 1) {
				for ( var i = 0; i < result.length; i++) {
					productsArray.push(result[i]);
				}
			} else {
				productsArray.push(productsQtyArray);
			}
			productsArray.reverse();
			searchProduct();
		}
	} else {
		$('#hiddenId').val(0);
	}
}
function splitHospitalSale(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#txtInwardNumber').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenHospitalSaleId').val(arr[1]);

		}
	} else {
		$('#hiddenHospitalSaleId').val(0);
	}
}

function searchProduct() {
	var products = $("#products").val();
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			products : products
		},
		url : "/EhatEnterprise/pharmacy/hospitalSalesBill/getProductById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(data) {
			$("#hiddenHospitalSaleId").val('');
			setTableContent(data);
		}
	});
	return true;
}

function splitBatchCode(content, number) {
	if (content != "") {
		var arr = content.split("#");
		if (arr.length > 1) {
			$('#textBatchNo' + number).val(arr[0]);
		}
	}
}
function validationsOfQty() {

	var qty = parseInt($('#txtQty').val());
	var curStock = parseInt($('#txtClStk').val());

	if (qty > curStock) {
		alert("Quantity is less than current Stock");
		$('#txtQty').val('');
	}

}

function setTableContent(result) {
	var r = result;

	totalRowCount = result.length;

	var divContent = "";
	// var rowCount = 0;
	for ( var i = 0; i < r.length; i++) {

		divContent = divContent
				+ " <tr id='remove"
				+ (i + 1)
				+ "'> <td><label class='input-SmallText'>"
				+ (i + 1)
				+ "</label></td>"

				+ "<input type='hidden' id='hiddenCurrentRow' value="
				+ (i + 1)
				+ " />"

				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textClStk"
				+ (i + 1)
				+ "' readonly='true' ></td>"

				+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
				+ (i + 1)
				+ "' readonly='true' ></td>"

				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPurchaseRate"
				+ (i + 1)
				+ "' readonly='true' ></td>"

				+ "<td style='display:none;'><input type='hidden' name='hospitalSaleBillSlaves["
				+ i
				+ "].productMaster.productId' id='hiddenProductId"
				+ (i + 1)
				+ "' value="
				+ r[i].productId
				+ ">"

				+ "<td style='display:none;'><input type='text' name='hospitalSaleBillSlaves["
				+ i
				+ "].productMaster.batchMaster[0].batchId' readonly id='textBatchId"
				+ (i + 1)
				+ "' class='form-control input-SmallText'></td>"

				+ "<td style='display:none;'><input type='text' name='hospitalSaleBillSlaves["
				+ i
				+ "].productMaster.batchMaster[0].stockMaster.stockId' id='textStockId"
				+ (i + 1)
				+ "' class='form-control input-SmallText'></td>"

				+ "<td style='display:none;'><input type='text' name='hospitalSaleBillSlaves["
				+ i
				+ "].productMaster.batchMaster[0].stockMaster.stockQtyInHand' id='textStockQtyInHand"
				+ (i + 1)
				+ "' class='form-control input-SmallText'></td>"

				+ "<td><input id='textProductName"
				+ (i + 1)
				+ "' name='hospitalSaleBillSlaves["
				+ i
				+ "].productMaster.productName"
				+ "' type='text' data-toggle='modal' data-target='#Hospital_Sales_Form' class='form-control input-SmallText' value='"
				+ r[i].productName
				+ "' onclick='load("
				+ (i + 1)
				+ ")' ></td>"

				+ "<td><input type='text' hospitalSaleBillSlaves["
				+ i
				+ "].productMaster.productUnit class='form-control input-SmallText' id='textUnit"
				+ (i + 1)
				+ "' readonly='true' value='"
				+ r[i].productUnit
				+ "' tabindex='-1'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' name='hospitalSaleBillSlaves["
				+ i
				+ "].productMaster.packingMaster.packType' id='textPack"
				+ (i + 1)
				+ "' readonly='true' value='"
				+ r[i].packingMaster.packType
				+ "' tabindex='-1'></td>"

				+ "<td><input type='text' class='form-control input-SmallText' name='hospitalSaleBillSlaves["
				+ i
				+ "].productMaster.companyMaster.compName' id='textComp"
				+ (i + 1)
				+ "' readonly='true'  value='"
				+ r[i].companyMaster.compName
				+ "' tabindex='-1'></td>"

				+ "<td><input type='text' name='hospitalSaleBillSlaves["
				+ i
				+ "].hospitalSlaveVat' id='textVat"
				+ (i + 1)
				+ "' class='form-control input-SmallText' readonly='true'></td>";

		if (r[i].batchMaster.length > 0) {

			divContent = divContent
					+ "<td><input type='text' class='form-control input-SmallText' id='textBatchNo"
					+ (i + 1) + "' name='hospitalSaleBillSlaves[" + i
					+ "].hospitalSlaveBatchCode' readonly='true'></td>";
		} else {
			divContent = divContent
					+ "<td><input type='text' readonly='true' class='form-control input-SmallText' id='textBatchNo"
					+ (i + 1) + "' name='hospitalSaleBillSlaves[" + i
					+ "].hospitalSlaveBatchCode'></td>";
		}
		if (r[i].batchMaster.length > 0) {
			divContent = divContent
					+ "<td><input type='text'  class='form-control input-SmallText' id='textExpiry"
					+ (i + 1) + "' name='hospitalSaleBillSlaves[" + i
					+ "].hospitalSlaveBatchExpiry' readonly='true'></td>";
		} else {
			divContent = divContent
					+ "<td><input type='text' readonly='true' class='form-control input-SmallText' id='textExpiry"
					+ (i + 1) + "' name='hospitalSaleBillSlaves[" + i
					+ "].hospitalSlaveBatchExpiry'></td>";
		}

		divContent = divContent

				+ "<td><input type='text' id='textShelf"
				+ (i + 1)
				+ "' class='form-control input-SmallText' value="
				+ r[i].shelfMaster.shelfName
				+ " readonly='true' ></td>"

				+ "<td><input type='text' id='textMrp"
				+ (i + 1)
				+ "' class='form-control input-SmallText'readonly='true' name='hospitalSaleBillSlaves["
				+ i
				+ "].hospitalSlaveMrp'>"
				/* +" value="+ r[i].productLastMRP+ ">" */
				+ "</td>"
				+ "<td><input type='text'  id='textDis"
				+ (i + 1)
				+ "'   class='form-control input-SmallText' readonly='true' name='hospitalSaleBillSlaves["
				+ i
				+ "].hospitalSlaveDisc'>"
				+ "</td>"
				
				+ "<td style='display:none;'><input type='text'  id='textDisAmt"
				+  (i + 1)
				+ "' class='form-control input-SmallText'></td>"
				
			/*	+ "<td><input type='text' class='form-control input-SmallText' readonly='true'></td>";*/

		if (productsArray.length > 0) {
			showValue = productsArray.pop(i);
			divContent = divContent
					+ "<td><input type='text' class='form-control input-SmallText' name='hospitalSaleBillSlaves["
					+ i + "].hospitalSlaveQty' id='textQty" + (i + 1) + "' "
					+ "value=" + showValue + " " + " readonly='true'></td>";
		} else {
			divContent = divContent
					+ "<td><input type='text' class='form-control input-SmallText' name='hospitalSaleBillSlaves["
					+ i + "].hospitalSlaveQty' id='textQty" + (i + 1) + "' "
					+ "value=" + showValue + " " + " readonly='true'></td>";
		}
		divContent = divContent
				+ "<td><input type='text' id='textLastPurRate"
				+ (i + 1)
				+ "' class='form-control input-SmallText' name='hospitalSaleBillSlaves["
				+ i + "].hospitalSlaveRate' "
				/* +"value=" + r[i].productLastPurRate+ "" */
				+ " readonly='true'></td>";
		//
		if (r[i].productLastPurRate != null) {
			// var result = (r[i].productLastPurRate * showValue);
			divContent = divContent
					+ "<td><input "
					/* +"value="+ result+ " " */
					+ "type='text' value='0' id='textAmount"
					+ (i + 1)
					+ "' name='hospitalSaleBillSlaves["
					+ i
					+ "].hospitalSlaveAmt' class='form-control input-SmallText'  tabindex='-1' readonly='true' >";
		} else {
			divContent = divContent
					+ "<td><input value='0' type='text' id='textAmount"
					+ (i + 1)
					+ "' name='hospitalSaleBillSlaves["
					+ i
					+ "].hospitalSlaveAmt' class='form-control input-SmallText'  tabindex='-1' readonly='true'>";
		}
		divContent = divContent
				+ "<td><input type='checkbox' name='deleteGroup' value='"
				+ (i + 1) + "' id='deleteGroup" + (i + 1) + "'></td>";
		divContent = divContent + "</td></tr>";
		rowCount = i;
		$("#RowCount").val(i + 1);
	}

	divContent = divContent
			+ " <tr id='remove"
			+ (totalRowCount + 1)
			+ "'>"
			+ " <td><label class='input-SmallText'>"
			+ (totalRowCount + 1)
			+ "</label></td>"

			+ "<td style='display:none;'><input type='hidden' name='hospitalSaleBillSlaves["
			+ totalRowCount
			+ "].productMaster.productId' id='hiddenProductId"
			+ (totalRowCount + 1)
			+ "'>"

			+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textClStk"
			+ (totalRowCount + 1)
			+ "' readonly='true' ></td>"

			+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
			+ (totalRowCount + 1)
			+ "' readonly='true' ></td>"

			+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPurchaseRate"
			+ (totalRowCount + 1)
			+ "' readonly='true' ></td>"

			+ "<td style='display:none;'><input type='text' name='hospitalSaleBillSlaves["
			+ totalRowCount
			+ "].productMaster.batchMaster[0].batchId' readonly id='textBatchId"
			+ (totalRowCount + 1)
			+ "' class='form-control input-SmallText'></td>"

			+ "<td style='display:none;'><input type='text' name='hospitalSaleBillSlaves["
			+ totalRowCount
			+ "].productMaster.batchMaster[0].stockMaster.stockId' id='textStockId"
			+ (totalRowCount + 1)
			+ "' class='form-control input-SmallText'></td>"

			+ "<td style='display:none;'><input type='text' name='hospitalSaleBillSlaves["
			+ totalRowCount
			+ "].productMaster.batchMaster[0].stockMaster.stockQtyInHand' id='textStockQtyInHand"
			+ (totalRowCount + 1)
			+ "' class='form-control input-SmallText'></td>"

			+ "<td><input id='textProductName"
			+ (totalRowCount + 1)
			+ "' name='hospitalSaleBillSlaves["
			+ totalRowCount
			+ "].productMaster.productName"
			+ "' type='text' data-toggle='modal' data-target='#Hospital_Sales_Form' class='form-control input-SmallText' value='"
			+ "' onclick='load("
			+ (totalRowCount + 1)
			+ ")'></td>"

			+ "<td><input type='text' hospitalSaleBillSlaves["
			+ totalRowCount
			+ "].productMaster.productUnit class='form-control input-SmallText' id='textUnit"
			+ (totalRowCount + 1)
			+ "' readonly='true' value='"
			+ "' tabindex='-1'></td>"

			+ "<td><input type='text' class='form-control input-SmallText' name='hospitalSaleBillSlaves["
			+ totalRowCount
			+ "].productMaster.packingMaster.packType' id='textPack"
			+ (totalRowCount + 1)
			+ "' readonly='true' value='"
			+ "' tabindex='-1'></td>"

			+ "<td><input type='text' class='form-control input-SmallText' name='hospitalSaleBillSlaves["
			+ totalRowCount
			+ "].productMaster.companyMaster.compName' id='textComp"
			+ (totalRowCount + 1)
			+ "' readonly='true'  value='"
			+ "' tabindex='-1'></td>"

			+ "<td><input type='text' name='hospitalSaleBillSlaves["
			+ totalRowCount
			+ "].hospitalSlaveVat' id='textVat"
			+ (totalRowCount + 1)
			+ "' class='form-control input-SmallText' readonly='true'></td>"

			+ "<td><input type='text' class='form-control input-SmallText' id='textBatchNo"
			+ (totalRowCount + 1)
			+ "'  name='hospitalSaleBillSlaves["
			+ totalRowCount
			+ "].hospitalSlaveBatchCode' readonly='true'></td>"

			+ "<td><input type='text' class='form-control input-SmallText' id='textExpiry"
			+ (totalRowCount + 1)
			+ "' name='hospitalSaleBillSlaves["
			+ totalRowCount
			+ "].hospitalSlaveBatchExpiry' readonly='true'></td>"

			+ "<td><input type='text' id='textShelf"
			+ (totalRowCount + 1)
			+ "' class='form-control input-SmallText' readonly='true'></td>"

			+ "<td><input type='text' id='textMrp"
			+ (totalRowCount + 1)
			+ "' class='form-control input-SmallText' name='hospitalSaleBillSlaves["
			+ totalRowCount
			+ "].hospitalSlaveMrp' readonly='true'></td>"

			+ "<td><input type='text'  id='textDis"
			+ (totalRowCount + 1)
			+ "' class='form-control input-SmallText' name='hospitalSaleBillSlaves["
			+ totalRowCount
			+ "].hospitalSlaveDisc' readonly='true'></td>"
			
			+ "<td style='display:none;'><input type='text'  id='textDisAmt"
			+ (totalRowCount + 1)
			+ "' class='form-control input-SmallText'></td>"

			+ "<td><input type='text' class='form-control input-SmallText' name='hospitalSaleBillSlaves["
			+ totalRowCount
			+ "].hospitalSlaveQty' id='textQty"
			+ (totalRowCount + 1)
			+ "' readonly='true'></td>"

			+ "<td><input type='text' id='textLastPurRate"
			+ (totalRowCount + 1)
			+ "' class='form-control input-SmallText' name='hospitalSaleBillSlaves["
			+ totalRowCount
			+ "].hospitalSlaveRate' readonly='true'></td>"

			+ "<td><input type='text' id='textAmount"
			+ (totalRowCount + 1)
			+ "' name='hospitalSaleBillSlaves["
			+ totalRowCount
			+ "].hospitalSlaveAmt' class='form-control input-SmallText' tabindex='-1' readonly='true'>";

	divContent = divContent
			+ "<td><input type='checkbox' name='deleteGroup' value='"
			+ (totalRowCount + 1) + "' id='deleteGroup" + (totalRowCount + 1)
			+ "'></td>";

	divContent = divContent + "</td></tr>";

	$('#HSTDiv').html(divContent);
	$("#RowCount").val(totalRowCount + 1);
}

/*
 * function calculateGrossAmount(rowCount) {
 * 
 * var total = 0; for ( var i = 0; i <= rowCount; i++) {
 * 
 * total = total + parseFloat($("#textAmount" + (i + 1)).val()); }
 * $("#txtGrossAmt").val(total); }
 */

function splitDoctorContent(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#txtDoctor').val(arr[0]);
		if (arr.length > 1) {
			$('#txtDoctorAddress').val(arr[1]);
			$('#hiddenDoctorId').val(arr[2]);

		} else {
			$('#hiddenId').val(0);
		}
	}
}

function toCreateHospitalSaleBillDiv(RowCount, currentRowCount) {

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

		var result = DublicateRecord(currentRow);
		if (result == 1) {
			totalRowCount++;
			rowCount++;

			rowId = "remove" + (rowCount);
			var x = document.createElement('tr');
			x.setAttribute('id', rowId);
			/* x.setAttribute('class', 'col-md-12-1'); */
			x.setAttribute('style', 'margin-top:0px');
			document.getElementById("HSTDiv").appendChild(x);

			var index = parseInt(rowCount) - 1;

			document.getElementById(rowId).innerHTML = "<td><label class='input-SmallText'>"
					+ (rowCount)
					+ "</label></td>"

					+ "<td style='display:none;'><input type='hidden' name='hospitalSaleBillSlaves["
					+ index
					+ "].productMaster.productId' id='hiddenProductId"
					+ rowCount
					+ "' />"
					+ "<td style='display:none;'><input type='text'  id='textDisAmt"
					+ rowCount
					+ "' class='form-control input-SmallText'></td>"
					
					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textClStk"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textTotalStk"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textPurchaseRate"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td style='display:none;'><input type='text' name='hospitalSaleBillSlaves["
					+ index
					+ "].productMaster.batchMaster[0].batchId' readonly id='textBatchId"
					+ rowCount
					+ "' class='form-control input-SmallText'></td>"

					+ "<td style='display:none;'><input type='text' name='hospitalSaleBillSlaves["
					+ index
					+ "].productMaster.batchMaster[0].stockMaster.stockId' id='textStockId"
					+ rowCount
					+ "' class='form-control input-SmallText'></td>"

					+ "<td style='display:none;'><input type='text' name='hospitalSaleBillSlaves["
					+ index
					+ "].productMaster.batchMaster[0].stockMaster.stockQtyInHand' id='textStockQtyInHand"
					+ rowCount
					+ "' class='form-control input-SmallText'></td>"

					+ "<td><input id='textProductName"
					+ rowCount
					+ "' name='hospitalSaleBillSlaves["
					+ index
					+ "].productMaster.productName"
					+ rowCount
					+ "' type='text' autocomplete='off' data-toggle='modal' data-target='#Hospital_Sales_Form' class='form-control input-SmallText' onclick='load("
					+ rowCount
					+ ")'></td>"

					+ "<td><input type='text' hospitalSaleBillSlaves["
					+ index
					+ "].productMaster.productUnit class='form-control input-SmallText' id='textUnit"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td><input type='text' class='form-control input-SmallText' name='hospitalSaleBillSlaves["
					+ index
					+ "].productMaster.packingMaster.packType' id='textPack"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td><input type='text' class='form-control input-SmallText' name='hospitalSaleBillSlaves["
					+ index
					+ "].productMa-1ster.companyMaster.compName' id='textComp"
					+ rowCount
					+ "' readonly='true' ></td>"

					+ "<td><input type='text' class='form-control input-SmallText'  name='hospitalSaleBillSlaves["
					+ index
					+ "].hospitalSlaveVat' id='textVat"
					+ rowCount
					+ "' readonly='true'></td>"

					+ "<td><input type='text' class='form-control input-SmallText' id='textBatchNo"
					+ rowCount
					+ "' readonly='true' name='hospitalSaleBillSlaves["
					+ index
					+ "].hospitalSlaveBatchCode'></td>"

					+ "<td><input type='text' class='form-control input-SmallText' id='textExpiry"
					+ rowCount
					+ "' readonly='true' name='hospitalSaleBillSlaves["
					+ index
					+ "].hospitalSlaveBatchExpiry'></td>"

					+ "<td><input type='text' class='form-control input-SmallText' id='textShelf"
					+ rowCount
					+ "' readonly='true'></td>"

					+ "<td><input type='text' class='form-control input-SmallText' id='textMrp"
					+ rowCount
					+ "' name='hospitalSaleBillSlaves["
					+ index
					+ "].hospitalSlaveMrp' readonly='true'></td>"

					+ "<td><input type='text'  id='textDis"
					+ rowCount
					+ "'   class='form-control input-SmallText'  name='hospitalSaleBillSlaves["
					+ index
					+ "].hospitalSlaveDisc' readonly='true'></td>"

					+ "<td><input type='text' class='form-control input-SmallText' name='hospitalSaleBillSlaves["
					+ index
					+ "].hospitalSlaveQty' id='textQty"
					+ rowCount
					+ "' readonly='true'></td>"

					+ "<td><input type='text' class='form-control input-SmallText' name='hospitalSaleBillSlaves["
					+ index
					+ "].hospitalSlaveRate'  id='textLastPurRate"
					+ rowCount
					+ "' readonly='true'></td>"

					+ "<td><input type='text' class='form-control input-SmallText' name='hospitalSaleBillSlaves["
					+ index
					+ "].hospitalSlaveAmt' id='textAmount"
					+ rowCount
					+ "' readonly='true' ></td>"
					+ "<td><input type='checkbox' name='deleteGroup' value='"
					+ (rowCount) + "' id='deleteGroup" + (rowCount) + "'></td>";
			+"</tr>";
			$("#RowCount").val(rowCount);
			$("#addRowCount").val(j);
			j++;
			fillRow(currentRowCount);
			$("#textProductName" + rowCount).focus(j);
			/* calculateAmt(currentRowCount); */
		}
	} else {
		var result = DublicateRecordForEdit(currentRow);
		if (result == 1) {

			fillRow(currentRowCount);
		}
		/* calculateAmt(currentRowCount); */
	}

}

function DublicateRecord(rowCount) {
	var productName;
	var productName1;
	var j = 1;

	var batchId;
	var batchId1;

	var count=$('#RowCount').val();
	while (j < (count)) {

		
		productName = $('#hiddenProductId' + j).val();
		productName1 = $('#hiddenProductId').val();

		batchId = $('#textBatchId' + j).val();
		batchId1 = $('#hiddenBatchId').val();

		if ((productName == productName1) && (batchId == batchId1)) {
			alert("Dublicate Record Not insert");
			return 0;

		}
		j++;
	}
	return 1;
}

function DublicateRecordForEdit(rowCount) {
	
	var productName;
	var productName1;
	var j = 1;

	var batchId;
	var batchId1;

	var count=$('#RowCount').val();
	while (j < (count)) {

		if(rowCount==j)
		{
			productName = $('#hiddenProductId' + j).val();
			productName1 = $('#hiddenProductId').val();

			batchId = $('#textBatchId' + j).val();
			batchId1 = $('#hiddenBatchId').val();

			if ((batchId == batchId1)) {
				return 1;
			}
			else
			{
				var popUpProductName;
				var formProductName;
				var popUpBatchId;
				var formBatchId;
				for(var i=1;i<count;i++)
				{
					formProductName = $('#hiddenProductId' + j).val();
					popUpProductName = $('#hiddenProductId').val();

					formBatchId = $('#textBatchId' + j).val();
					popUpBatchId = $('#hiddenBatchId').val();
					if ((formBatchId == popUpBatchId)) {
						alert("Dublicate Record Not insert");
						return 0;
					}
				}
			}
			j++;
		}
		else
		{
			productName = $('#hiddenProductId' + j).val();
			productName1 = $('#hiddenProductId').val();

			batchId = $('#textBatchId' + j).val();
			batchId1 = $('#hiddenBatchId').val();

			if ((productName == productName1) && (batchId == batchId1)) {
				alert("Dublicate Record Not insert");
				return 0;

			}
			j++;
		}	
		
		
	}
	return 1;
}

/*
 * function calculateAmt(rowCount) { var qty =
 * parseInt($('#textQty'+rowCount).val()); var purRate =
 * parseInt($('#textRate'+rowCount).val()); $('#txtAmt'+rowCount).val((qty *
 * purRate)); }
 */
function calculateDiscount() {
	var disc = 0;
	var cdAmt = 0;
	if (($('#txtSpecialDisc').val() != '')
			&& ($('#txtSpecialDisc').val().length > 0)) {
		disc = parseFloat($('#txtSpecialDisc').val());
	}
	if (($('#txtCDAmt').val() != '') && ($('#txtCDAmt').val().length > 0)) {
		cdAmt = parseFloat($('#txtCDAmt').val());
	}
	if (disc > cdAmt) {
		$('#txtLess').val((disc - cdAmt).toFixed(3));
	} else {
		$('#txtLess').val(0);
	}

	calculateNetAmount();
	/* calculateNetAmount(); */
}
function calculateSurchargeHos() {
	var add = 0;
	if ($('#txtSurcharge').val() != '' && $('#txtSurcharge').val().length > 0
			&& $('#txtSurcharge').val() != null) {
		add = parseFloat($('#txtSurcharge').val());
	}

	$("#txtAdd").val(add);
	calculateNetAmount();
	/* calculateNetAmount(); */
}

function calculatecdAmt() {
	var cdAmt = 0;
	var gross = 0;
	if ($('#txtCD').val() != '' && $('#txtCD').val().length > 0
			&& $('#txtCD').val() != null) {
		cdAmt = parseFloat($('#txtCD').val());
	}

	if ($('#txtGrossAmt').val() != '' && $('#txtGrossAmt').val().length > 0
			&& $('#txtGrossAmt').val() != null) {
		gross = parseFloat($('#txtGrossAmt').val());
	}
	$('#txtCDAmt').val((gross * (cdAmt / 100)).toFixed(3));
	if ($('#txtSpecialDisc').val() > 0) {
		calculateDiscount();
	}
	calculateNetAmount();
	// calculateDiscount();
	// calculateDiscount();

}
/*
 * function calculateNetAmount() { // net amount var gross = 0; var less = 0;
 * var add = 0; var total = 0; alert("Hiii"); if ($('#txtGrossAmt').val() != '') {
 * gross = parseFloat($('#txtGrossAmt').val()); } if ($('#txtLess').val() != '') {
 * less = parseFloat($('#txtLess').val()); } if ($('#txtAdd').val() != '') { add =
 * parseFloat($('#txtAdd').val()); }
 * 
 * $('#txtNetAmt').val(gross - less + add); }
 */
/*
 * function calculateGrossAmount(rowCount) {
 * 
 * var total = 0; for ( var i = 0; i < rowCount; i++) { if ($('#textAmount' + (i +
 * 1)).val() != '') { total = total + parseFloat($('#textAmount' + (i +
 * 1)).val()); }
 *  } $('#txtGrossAmt').val(total); }
 */

function calculateNetAmount() {

	var gross = 0;
	var less = 0;
	var add = 0;
	var total = 0;

	if ($('#txtGrossAmt').val() != '' && $('#txtGrossAmt').val().length > 0
			&& $('#txtGrossAmt').val() != null && $('#txtGrossAmt').val() != 0) {
		gross = parseFloat($('#txtGrossAmt').val());
	}
	if ($('#txtLess').val() != '' && $('#txtLess').val().length > 0
			&& $('#txtLess').val() != null) {
		less = parseFloat($('#txtLess').val());
	}

	if ($('#txtAdd').val() != '' && $('#txtAdd').val().length > 0
			&& $('#txtAdd').val() != null) {
		add = parseFloat($('#txtAdd').val());
	}

	$('#txtNetAmt').val(((gross - less) + add).toFixed(3));
}

function calculateGrossAmount() {

	var total = 0;
	for ( var i = 1; i < $("#RowCount").val(); i++) {
		if ($('#textAmount' + i).val() >= 0 && $('#textAmount' + i).val() != ''
				&& $('#textAmount' + i).val() != null) {
			total = ((parseFloat(total) + parseFloat($('#textAmount' + i).val()))
					.toFixed(3));
		}

	}
	$('#txtGrossAmt').val(total);
	calculatecdAmt();
	if ($('#txtGrossAmt').val() != 0) {
		validateLess();
	}
	calculateNetAmount();

}

function fillRow(rCount) {
	var rowCount = parseInt(rCount);
	$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
	$('#textProductName' + rowCount).val($('#particulars').val());
	$('#textUnit' + rowCount).val($('#txtUnit').val());
	$('#textPack' + rowCount).val($('#txtPack').val());
	$('#textComp' + rowCount).val($('#txtComp').val());
	$('#textMrp' + rowCount).val($('#txtMRP').val());
	$('#textQty' + rowCount).val($('#txtQty').val());
	$('#textLastPurRate' + rowCount).val($('#txtRate').val());
	$('#textBatchNo' + rowCount).val($('#txtBatchNo').val());
	$('#textExpiry' + rowCount).val($('#txtExpiry').val());

	$('#textBatchId' + rowCount).val($('#hiddenBatchId').val());
	$('#textStockId' + rowCount).val($('#hiddenStockId').val());
	$('#textStockQtyInHand' + rowCount).val($('#txtClStk').val());

	$('#textVat' + rowCount).val($('#txtVat').val());
	$('#textShelf' + rowCount).val($('#txtShelf').val());

	$('#textClStk' + rowCount).val($('#txtClStk').val());

	$('#textTotalStk' + rowCount).val($('#txtTotalStk').val());

	$('#textPurchaseRate' + rowCount).val($('#txtPurchaseRate').val());

	$('#textScm' + rowCount).val($('#txtScheme').val());

	$('#textRate' + rowCount).val($('#txtRate').val());

	/* $('#textAmount' + rowCount).val($('#txtAmount').val()); */

	if ($('#txtAmount').val() != '' && $('#txtAmount').val().length > 0)
		$('#textAmount' + rowCount).val($('#txtAmount').val());
	else
		$('#textAmount' + rowCount).val(0);

	$('#textDis' + rowCount).val($('#txtDis').val());
	$('#textDisAmt' + rowCount).val($('#txtDiscAmt').val());
	
	/*
	 * var a = parseFloat($('#txtRate').val()); var b =
	 * parseFloat($('#txtQty').val()); var c =
	 * parseFloat($('#txtGrossAmt').val()); $('#txtGrossAmt').val((a * b) + c);
	 */
	/* calculateGrossAmount(totalRowCount); */
	calculateGrossAmount();

}

function resetAllPopUpValues() {
	$('#Hospital_Sales_Form').find('input:text').val('');
	$('#Hospital_Sales_Form').find('input:hidden').val('');
}
function deleteRow() {
	/* var result= $("input[name='deleteGroup']:checked").val(); */

	/* $("#remove"+result).hide(); */
	var r = confirm("Are you confirm to delete selected row");
	if (r == true) {
		var favorite = [];

		$.each($("input[name='deleteGroup']:checked"), function() {
			favorite.push($(this).val());

		});

		if (favorite.length == 0) {
			alert("Please select checkbox to delete");
		}

		for ( var i = 0; i < favorite.length; i++) {

			if ($("#hiddenProductId" + favorite[i]) != null
					&& $('#hiddenProductId' + favorite[i]).val() != "") {
				$("#deleteGroup" + favorite[i]).prop("checked", false);
				var amount = parseFloat($("#textAmount" + favorite[i]).val());

				$("#hiddenProductId" + favorite[i]).val("");
				$("#remove" + favorite[i]).hide();

				$("#txtAmount" + favorite[i]).val(
						parseFloat($("#txtAmount" + favorite[i]).val())
								- (amount));
				$("#textAmount" + favorite[i]).val("");

				/*
				 * $("#txtItems" + textNo).val( parseInt($("#txtItems" +
				 * textNo).val()) - 1);
				 */

				calculateGrossAmount();
				validateLess();

			} else {
				alert("Can not delete empty row");
				$("#deleteGroup" + favorite[i]).prop("checked", false);
			}
		}
	}
}

function calculateCounterDisc() {
	// net amount
	var rate = 0;
	var qty = 0;
	var unit = 0;
	var ratePerUnit = 0;
    var discount=0;
	var DiscAmt=0;
	var finalAmout=0;
	if($('#txtDis').val() <100)
		{
	if ($('#txtRate').val() != '' && $('#txtRate').val().length > 0)
		rate = parseFloat($('#txtRate').val());

	if ($('#txtQty').val() != '' && $('#txtQty').val().length > 0)
		qty = parseFloat($('#txtQty').val());

	
	if ($('#txtUnit').val() != '' && $('#txtUnit').val().length > 0)
		unit = parseFloat($('#txtUnit').val());
	
	if ($('#txtDis').val() != '' && $('#txtDis').val().length > 0)
		discount = parseFloat($('#txtDis').val());

	if ($('#hiddenProductId').val() != ''
			&& $('#hiddenProductId').val().length > 0 && $('#hiddenProductId').val() != 0)
		{
		
		ratePerUnit = parseFloat($('#txtRatePerUnit').val());
		finalAmout = (ratePerUnit * qty).toFixed(3);
		if ($('#txtDis').val() != '' && $('#txtDis').val().length > 0)
			{			
			discount = parseFloat($('#txtDis').val());
		   DiscAmt=(discount/100)*finalAmout;
	       $('#txtDiscAmt').val((DiscAmt).toFixed(3));
			}
	
	}
	calculateAmount();
	
		}
	else
		{
		alert("Enter Discount less than 100");
		  $('#txtDis').val(0);
		  $('#txtDiscAmt').val(0);
		  calculateAmount();
		}
}
