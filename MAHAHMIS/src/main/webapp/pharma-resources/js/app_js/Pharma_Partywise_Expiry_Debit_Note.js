var totalRowCount = 1;

function deletePO(debitNoteId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
		var inputs = [];
		inputs.push('debitNoteId=' + debitNoteId);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/partywiseExpiryDebitNote/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						location.reload(true);
						if (r == true) {
							$('#msgDiv')
									.html(
											"<div class='alert alert-success' >Record deleted successfully..!</div>");
						} else {
							$('#msgDiv')
									.html(
											"<div class='alert alter-danger'>Oops! Something went wrong..!</div>");
						}
					}
				});

		return true;
	} else {

	}

}
function splitDebitNoteVendorContent(content) {
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
function searchDebitNote(id) {
	var vendorId = parseInt(id);
	var inputs = [];
	inputs.push('vendorId=' + vendorId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "/EhatEnterprise/pharmacy/partywiseExpiryDebitNote/getDebitNotebyVendorId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			setTableContent(r);
		}
	});

	return true;
}
function getDebitProductDetail(pId) {
	alert("Id is" + pId);
	var productId = pId;
	if (productId != '') {
		var inputs = [];
		inputs.push('ProductId=' + productId);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/patientSale/getProductDetails",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						splitBatchCode(r);

					}
				});
		return true;
	}
}
function splitBatchCode(content) {
	if (content != "") {
		var arr = content.split("#");
		if (arr.length > 1) {
			$('#txtBatchNo').val(arr[0]);
			$('#txtExpiry').val(arr[1]);
			$('#txtClStk').val(arr[2]);

		}
	}
}
function  validationsOfQty()
{   	
var qty=parseInt($('#txtQty').val());
var curStock=parseInt($('#txtClStk').val()); 
   
  if(qty>curStock)
    {
    alert("Quantity is less than current Stock");	
    }
   
}
function calculateNetAmount()
{
	var gross = 0;
	
	// net amount

	if ($('#txtGross').val() != '')
		gross = parseFloat($('#txtGross').val());


	$('#txtNetAmt').val((gross));
}
function calculateGrossAmount(rowCount) {
		
	var total = 0;

	for ( var i = 1; i < totalRowCount; i++) {
		if ($('#textAmt'+i).val() != '' && $('#textAmt'+i).val().length > 0)
			{
		   total = total + parseFloat($('#textAmt' + i).val());
	    	$('#txtGross').val(total);
			 }
	}
	
	calculateNetAmount();
}
function calculatePopUpAmt() {
	var qty = 0;
	var purRate = 0;
	
	if ($('#txtQty').val() != '')
		qty = parseFloat($('#txtQty').val());

	if ($('#txtPRate').val() != '')
		purRate = parseFloat($('#txtPRate').val());
	
		$('#txtAmt').val(qty * purRate);
}
function toCreateDebitNotesDiv(RowCount, currentRowCount) {
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
				+ rowCount
				+ "</label></td>"
				+ "<td><input type='hidden' name='debitNoteSlaves["
				+ index
				+ "].productMaster.productId' id='hiddenProductId"
				+ rowCount
				+ "'>"
				+ "<input data-toggle='modal' data-target='#partywise_debit_note_pop_up' id='textProductName"
				+ rowCount
				+ "' type='text' class='form-control input-SmallText' onclick='load("
				+ rowCount
				+ ")' name='debitNoteSlaves["
				+ index
				+ "].productMaster.productName'></td>"
			    + "<input type='hidden' name='debitNoteSlaves["
				+ index
				+ "].purchaseSlave.purSlaveId' id='hiddenPurchaseSlaveId"
				+ rowCount
				+ "'>"
				
				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textTotalStk"
				+ rowCount
				+ "' readonly='true' ></td>"
				+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textShelf"
				+ rowCount
				+ "' readonly='true' ></td>"
				+ "<td style=display:none;><input type='text' class='form-control input-SmallText' id='textClStk"
				+ rowCount
				+ "' readonly='true' ></td>"
				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textScm"
				+ rowCount
				+ "' readonly='true' ></td>"
				+ "<td style=display:none;><input type='text' class='form-control input-SmallText'  id='textRate"
				+ rowCount
				+ "' readonly='true' ></td>"
												
				+"<td><input type='text' id='textUnit"
				+ rowCount
				+ "' class='form-control input-SmallText' readonly name='debitNoteSlaves["
				+ index
				+ "].productMaster.productUnit'></td>"

				+ "<td><input type='text' id='textPack"
				+ rowCount
				+ "' class='form-control input-SmallText' readonly name='debitNoteSlaves["
				+ index
				+ "].productMaster.packingMaster.packType'></td>"
             	+ "<td><input type='text' id='textComp"
				+ rowCount
				+ "' class='form-control input-SmallText' readonly name='debitNoteSlaves["
				+ index
				+ "].productMaster.companyMaster.compShortName'></td>"
				
				+ "<td style='display:none;'><input type='text' name='debitNoteSlaves["
				+ index
				+ "].productMaster.batchMaster[0].batchId' readonly id='textBatchId"
				+ rowCount
				+ "' class='form-control input-SmallText'></td>"
				+ "<td style='display:none;'><input type='text' name='debitNoteSlaves["
				+ index
				+ "].productMaster.batchMaster[0].stockMaster.stockId' id='textStockId"
				+ rowCount
				+ "' class='form-control input-SmallText'></td>"
				+ "<td style='display:none;'><input type='text' name='debitNoteSlaves["
				+ index
				+ "].productMaster.batchMaster[0].stockMaster.stockQtyInHand' id='textStockQtyInHand"
				+ rowCount
				+ "' class='form-control input-SmallText'></td>"
				+ "<td><input type='text' readonly id='textBatchNo"
				+ rowCount
				+ "' class='form-control input-SmallText'></td>"
				+ "<td><input type='text' readonly id='textExpiry"
				+ rowCount
				+ "' class='form-control input-SmallText'></td>"
				
				+ "<td><input type='text' id='textPurRate"
				+ rowCount
				+ "' class='form-control input-SmallText' readonly name='debitNoteSlaves["
				+ index
				+ "].debitNoteSlaveAmt'></td>"
				+ "<td><input type='text' id='textMRP"
				+ rowCount
				+ "' class='form-control  input-SmallText' readonly></td>"
				+ "<td><input type='text' id='textQty"
				+ rowCount
				+ "' class='form-control input-SmallText' readonly name='debitNoteSlaves["
				+ index
				+ "].debitNoteSlaveQty'></td>"
				+ "<td><input type='text' id='textAmt"
				+ rowCount
				+ "' class='form-control  input-SmallText' readonly></td></tr>";
		$("#RowCount").val(rowCount);
		$("#addRowCount").val(j);
		j++;

		totalRowCount++;
		$("#txtProductName" + rowCount).focus();
		fillRow(currentRowCount);
		
	} else {

		fillRow(currentRowCount);
		calculateGrossAmount(currentRowCount);
	}

}

function splitVendorContent(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#txtPartyName').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenVendorId').val(arr[1]);
			$('#txtAddress').val(arr[2]);
			$('#txtPhone').val(arr[3]);
		}

	} else {
		$('#hiddenId').val(0);
	}
}
function calculateDisc()
{
	
}

function fillRow(rCount) {
	var rowCount = parseInt(rCount);
	
	$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
	$('#textProductName' + rowCount).val($('#particulars').val());
	$('#textUnit' + rowCount).val($('#txtUnit').val());
	$('#textPack' + rowCount).val($('#txtPack').val());
	$('#textComp' + rowCount).val($('#txtComp').val());
	$('#textMRP' + rowCount).val($('#txtMrp').val());
	$('#textQty' + rowCount).val($('#txtQty').val());
	$('#textPurRate' + rowCount).val($('#txtPRate').val());
	$('#textBatchNo' + rowCount).val($('#txtBatchNo').val());
	$('#textExpiry' + rowCount).val($('#txtExpiry').val());
	$('#textBatchId' + rowCount).val($('#hiddenBatchId').val());
	$('#textStockId' + rowCount).val($('#hiddenStockId').val());
	$('#textStockQtyInHand' + rowCount).val($('#txtClStk').val());
	$('#textAmt' + rowCount).val($('#txtAmt').val());
	$('#hiddenPurchaseSlaveId' + rowCount).val($('#hiddenPurchaseId').val());
	
	$('#textTotalStk' + rowCount).val($('#txtTotalStk').val());
	/*$('#textShelf' + rowCount).val($('#txtShelf').val());*/
	$('#textClStk' + rowCount).val($('#txtClStk').val());
	$('#textScm' + rowCount).val($('#txtScheme').val());
	$('#textRate' + rowCount).val($('#txtRate').val());
	/*
	 * $('#textAmount' + rowCount).val(parseFloat($('#txtPurchaseRate').val()) *
	 * parseFloat($('#txtQty').val()));
	 */
	calculateGrossAmount(rowCount);
}


// get formatted date dd/mm/yyyy
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
		var debitNoteDate = getDate(r[i].debitNoteDate);
		divContent = divContent
				+ " <tr><td class='col-md-1 center'>"
				+ (i + 1)
				+ " <input type='hidden' id='debitNoteId"
				+ r[i].debitNoteId
				+ "' value='"
				+ r[i].debitNoteId
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].debitNoteDocNo
				+ "<input type='hidden' id='podocId"
				+ r[i].debitNoteId
				+ "' value='"
				+ r[i].debitNoteDocNo
				+ "'></td><td class='col-md-2 center'>"
				+ r[i].vendorMaster.vendorName
				+ "<input type='hidden' id='debitNoteVendorName"
				+ r[i].debitNoteId
				+ "' value='"
				+ r[i].vendorMaster.vendorName
				+ "'></td><td class='col-md-2 center'>"
				+ debitNoteDate
				+ "<input type='hidden' id='debitNoteDate"
				+ r[i].debitNoteId
				+ "' value='"
				+ debitNoteDate
				+ "'></td>"
				+ "<td style='display: none' id='vendorId'>"
				+ r[i].vendorMaster.vendorId
				+ "<input type='hidden' id='debitNotevendorId"
				+ +r[i].debitNoteId
				+ "'value='"
				+ r[i].vendorMaster.vendorId
				+ "'>"

				+ "</td><td class='col-md-2 center'> <button id='btnEdit"
				+ r[i].debitNoteId
				+ "' class='btn btn-xs btn-success' onclick='edit("
				+ r[i].debitNoteId
				+ ")' value='PRINT'> <i class='fa fa-edit'></i> </button> </td>"

				+ "<td class='col-md-2 center'> <a id='btnEdit"
				+ r[i].debitNoteId
				+ "' class='btn btn-xs btn-success' value='EDIT' href='/EhatEnterprise/pharmacy/po/edit-view?poId="
				+ r[i].debitNoteId
				+ "'>"
				+ "<i class='fa fa-edit'></i> </a></td>"

				+ "<td class='col-md-2 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deletePO("
				+ r[i].poId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divProductOrderList').html(divContent);
}