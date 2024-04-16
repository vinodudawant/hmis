var totalRowCount = 1;
/**
*
* @Code :This method for get purchase data
* @return
**/
function fetchPurchaseData() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "../../pharmacy/purchase/getPurchaseEntry",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {

		},
		success : function(r) {
			setAllPurchaseEntryData(r);
		}
	});
	return true;

}
/**
*
* @Code :This method for set purchase data
* @return
**/
function setAllPurchaseEntryData(r)
{
	var divContent = "";
	divContent = divContent
			+ "<div style='float:right'><button onclick='setPurchaseEntryData()' class='btn btn-xs btn-info'>OK</button></div><table border=1 class='table table-striped table-bordered header-fixed cf '><thead><tr><th>Goods Receipt Note No</th><th>Entry Date</th><th>Vou No</th><th>Vendor Name</th> <th>Bill Number</th><th>Net Amount</th><th>select</th></thead></tr>";
	for ( var i = 0; i < r.length; i++) {
		divContent = divContent + "<tbody><tr><td>"+ r[i].purId +"</td><td>"
				+ getDate(r[i].purBillDate)
				+ "</td> <td>" + r[i].purDocId
				+ "</td> <td>"
				+ r[i].vendorMaster.vendorName + "</td>  <td>" + r[i].purBillNo + "</td><td>"+r[i].purNetAmt+"</td>";
				if(i==0)
				{	
					divContent=divContent+"<td><div class='radio'>	<label><input type='radio' id='purNumber"+ r[i].purId +"' checked name='purNumber' value='"+ r[i].purId +"'><span class='cr' style='background-color:orange'><i class='cr-icon fa fa-rocket'></i></span></label></div></td></tr></tbody";
				}
				else
				{
					divContent=divContent+"<td><div class='radio'>	<label><input type='radio' id='purNumber"+ r[i].purId +"' name='purNumber' value='"+ r[i].purId +"'><span class='cr' style='background-color:orange'><i class='cr-icon fa fa-rocket'></i></span></label></div></td></tr></tbody";
				}	
				

	}
	divContent = divContent + "</table>";

	$("#indentPendingData").html(divContent);
}
/**
*
* @Code :This method for set purchase data for save
* @return
**/
function setPurchaseEntryData()
{
	var poId = $("input[name='purNumber']:checked").val();
	var inputs = [];
	inputs.push('purId=' + poId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/purchase/getPurchaseEntrySlaveForDebitNoteByPurId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) 
		{
			setPurchaseEntryTableContent(r);
		}
		
	});

	return true;
}
/**
*
* @Code :This method for set saved purchase data 
* @return
**/
function setPurchaseEntryTableContent(result) {
	$("#purId").val(result.purId);
	$("#txtPartyName").val(result.vendorMaster.vendorName);
	$("#hiddenVendorId").val(result.vendorMaster.vendorId);
	$("#txtAddress").val(result.vendorAddress.vendorAddress);
	$("#txtPhone").val(result.vendorAddress.vendorMobileNumber);

	$("#hiddenVendoraddId").val(result.vendorAddress.vendorAddressId);
	
	$("#txtPurId").val(result.purId);
	
	$("#purDiv").show("show");
	
	$('#purchase_entry_data').modal('hide');
	var r = result.ltPurSlave;

	totalRowCount = result.ltPurSlave.length;

	var divContent = "";
	 var rowCount = 1;
	for ( var i = 0; i < r.length; i++) {
		divContent = divContent
				+ " <tr id='remove"
								+ (rowCount)
								+ "'><td><label  class=' input-SmallText'>"
								+ (rowCount)
								+ "</label></td>"
								
								+ "<input type='hidden' id='hiddenProductId"
								+ (rowCount)
								+ "' name='debitNoteSlaves["
								+ (rowCount - 1)
								+ "].productMaster.productId' value='"+r[i].productMaster.productId+"' /> <input "
								+"type='hidden' id='hiddenCurrentRow' value='0' />"

								+ "<input type='hidden' id='textBatchId"
								+ (rowCount)
								+ "'  name='debitNoteSlaves["
								+ (rowCount - 1)
								+ "].productMaster.batchMaster[0].batchId'  value='"+r[i].batchMaster.batchId+"' />"
								
								+ "<input type='hidden' id='textStockId"
								+ (rowCount)
								+ "' name='debitNoteSlaves["
								+ (rowCount - 1)
								+ "].productMaster.batchMaster[0].stockMaster.stockId' />"
								
								+ "<input type='hidden' id='textStockQtyInHand"
								+ (rowCount)
								+ "' name='debitNoteSlaves["
								+ (rowCount - 1)
								+ "]..productMaster.batchMaster[0].stockMaster.stockQtyInHand' />"
								
								+ "<td><input type='text' name='' id='textBarcode"
								+ (rowCount)
								+ "'  class='form-control input-SmallText' value='"+r[i].batchMaster.batchId+"' />" 
								
								+ "<td><input type='text' name='debitNoteSlaves["
								+ (rowCount - 1)
								+ "].productMaster.productName' readonly='true' autocomplete='off' id='textProductName"
								+ (rowCount)
								+ "' class='form-control input-SmallText' ' data-toggle='modal' data-target='#Product_Information' onclick='load("
								+ rowCount
								+ ")' value='"+r[i].productMaster.productName+"'/></td>"

							
								+ "<td><input type='text' name='debitNoteSlaves["
								+ (rowCount - 1)
								+ "].productMaster.productUnit' id='textUnit"
								+ (rowCount)
								+ "'  class='form-control input-SmallText' readonly='true' value='"+r[i].productMaster.productUnit+"'/>" 
								
								
								+"</td><td><input type='text' name='debitNoteSlaves["
								+ (rowCount - 1)
								+ "].productMaster.packType' id='textPack"
								+ (rowCount)
								+ "' readonly='true' class='form-control input-SmallText' value='"+r[i].productMaster.packingMaster.packType+"' /></td>" 
								
								+"<td><input name='debitNoteSlaves["
								+ (rowCount - 1)
								+ "].productMaster.compShortName' id='textComp"
								+ (rowCount)
								+ "' readonly='true' type='text' class='form-control input-SmallText' value='"+r[i].productMaster.companyMaster.compName+"'/></td>"
								
																
								+ "<td><input type='text' name='debitNoteSlaves["
								+ (rowCount - 1)
								+ "].debitNoteSlaveGST' id=textVat"
								+ (rowCount)
								+ " class='form-control input-SmallText' readonly='true'  value='"+r[i].purVat+"'/></td>"

								+ "<td><input name='debitNoteSlaves["
								+ (rowCount - 1)
								+ "].debitNoteSlaveBatchCode' id=textBatchNo"
								+ (rowCount)
								+ "  type='text' class='form-control input-SmallText'  value='"+r[i].batchMaster.batchCode+"' readonly='true'/></td>"
								
								+ "<td><input name='debitNoteSlaves["
								+ (rowCount - 1)
								+ "].debitNoteSlaveBatchExpiry' id=textExpiry"
								+ (rowCount)
								+ "  type='text' class='form-control input-SmallText' value='"+r[i].batchMaster.batchExpDate+"'  readonly='true'/></td>"
								+ "<td><input  id='textCode"
								+ (rowCount)
								+ "' type='text' class='form-control input-SmallText'  readonly='true'/></td>"
								+ "<td><input name='debitNoteSlaves["
								+ (rowCount - 1)
								+ "].debitNoteSlaveMrp' id='textMRP"
								+ (rowCount)
								+ "' type='text' class='form-control input-SmallText' value='"+r[i].purSlaveMrp+"'   readonly='true'/></td>"
								+ "<td style='display: none;'><input name='' id='textDisc"
								+ (rowCount)
								+ "' type='text' class='form-control input-SmallText' value='"+r[i].purDisc+"'  readonly='true'/></td>"

								+ "<td><input id='textDispenceQty"
								+ (rowCount)
								+ "' type='text' readonly='true'  value='"+r[i].batchMaster.stockMaster.stockQtyInHand+"' class='form-control input-SmallText' ></td>"
								
								+ "<td><input name='debitNoteSlaves["
								+ (rowCount - 1)
								+ "].debitNoteSlaveQty' autocomplete='off' id='textQty"
								+ (rowCount)
								+ "' type='text'  class='form-control input-SmallText' onblur='calculateAmount("
						        + rowCount
						        + ")'></td>"
						        
						        //Scheme
						        + "<td><input name='debitNoteSlaves["
								+ (rowCount - 1)
								+ "].debitSlaveScheme' autocomplete='off' id='textSchm"
								+ (rowCount)
								+ "' type='text'  class='form-control input-SmallText'"
						        + " ></td>"
						        
						        + "<td><input name='debitNoteSlaves["
								+ (rowCount - 1)
								+ "].debitSlaveSchemeAmt' autocomplete='off' id='textSchmAmt"
								+ (rowCount)
								+ "' type='text'  class='form-control input-SmallText' "
						        + " ></td>"
						        //End

								+ "<td><input name='debitNoteSlaves["
								+ (rowCount - 1)
								+ "].debitNoteSlaveRate' id='textPurRate"
								+ (rowCount)
								+ "' type='text'  value='"+r[i].purSlaveBillRate+"' class='form-control input-SmallText' /></td>"
								
								//purSlavePurchaseRate(with GST amount)
								
								+ "<td><input name='debitNoteSlaves["
								+ (rowCount - 1)
								+ "].debitNoteSlaveAmt' type='text' id='textAmt"
								+ (rowCount)
								+ "' class='form-control input-SmallText' value='0'  readonly='true'/></td>"
																				
								+ "<td><input type='checkbox' name='deleteGroup' value='"
								+ (rowCount) + "' id='deleteGroup" + (rowCount) + "'></td>"

								+ "<td style='display: none;'><input type='text' class='form-control input-SmallText' id='textTotalStk"
								+ (rowCount)
								+ "' readonly='true'/></td>"
								
								+ "<td style='display: none;'><input type='text' class='form-control input-SmallText' id='textShelf"
								+ (rowCount)
								+ "' readonly='true'/></td>"
								
								+ "<td style='display: none;'><input type='text' class='form-control input-SmallText' id='textClStk"
								+ (rowCount)
								+ "' readonly='true' value='"+r[i].batchMaster.stockMaster.stockQtyInHand+"'/></td>"
								
								+ "<td style='display: none;'><input type='text' class='form-control input-SmallText' id='textPurchaseSlaveId"
								+ (rowCount)
								+ "' readonly='true' name='debitNoteSlaves["
								+ (rowCount - 1)
								+ "].debitNoteSlavePurchaseId' value='"+r[i].purSlaveId+"'/></td>"
								
								+ "<td style='display: none;'><input type='text' class='form-control input-SmallText' id='textScm"
								+ (rowCount)
								+ "' readonly='true'/></td>"
								
								+ "<td style='display: none;'><input type='text' class='form-control input-SmallText' id='textRate"
								+ (rowCount)
								+ "' readonly='true' value='"+r[i].purslaverate+"' /></td>";
		rowCount ++;
		$("#RowCount").val(i + 1);
	}

	$('#DRRDiv').html(divContent);
	$("#RowCount").val(totalRowCount+1);
	getSpecialDiscData($("#txtPurId").val());
}
/**
*
* @Code :This method for get special discount 
* @return
**/
function getSpecialDiscData(value) 
{

	var inputs = [];
	inputs.push('saleId=' + value);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/common/getDiscountDetailsOfPurchase",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {

				},
				success : function(r) {
					setSpecialDiscData(r);
				}
			});
	return true;
}
/**
*
* @Code :This method for set special discount 
* @return
**/
function setSpecialDiscData(result)
{
	/*var result1=jQuery.parseJSON(result);*/
	var discDivContent="";
	var surchargeDivContent="";
	var add="";
	var netAmtDivContent="";
	var prevCreditDivContent="";
	
	    discDivContent=discDivContent+"<input type='text' readonly value="+(result.Disc)+">";
		/*surchargeDivContent=surchargeDivContent+"<input type='text' readonly value="+result.cdAmt+">";*/
		add=surchargeDivContent+"<input type='text' readonly value="+(result.add)+">";
		netAmtDivContent=netAmtDivContent+""+result.net+"";
		prevCreditDivContent=prevCreditDivContent+"<input type='button' class='btn btn-xs btn-info' value='Prev Debit Note' onclick='getPrevDebitNoteDetailsBySaleId()'>";

     $("#divSpecialDisc").show();
	
	$("#divSurcharge").show();
	$("#divNetAmt").show();
	
	$("#indentSaleSpecialDiscDiv").html(discDivContent);
	$("#divNetAmtData").html(netAmtDivContent);
	$("#prevCreditDiv").html(prevCreditDivContent);
	$("#divSurchargeData").html(add);
			
}
/**
*
* @Code :This method for get previous debit notes data ny sale id
* @return
**/
function getPrevDebitNoteDetailsBySaleId()
{
		var saleId=$("#txtPurId").val();
					
		var inputs = [];
		inputs.push('saleId=' + saleId);
			
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/debitNote/getDebitNoteDetailsBySaleId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						$("#prevDebitNotePopUp").show();
						setPrevDebitNoteData(r);
					}
				});
		return true;
}
/**
*
* @Code :This method for set previous debit notes data ny sale id
* @return
**/
function setPrevDebitNoteData(result)
{
	var r=jQuery.parseJSON(result);
	var divContent = "";
	divContent = divContent
			+ "<table border=1 class='table table-striped table-bordered header-fixed cf' style='margin-top:2%'><thead><tr><th>Debit Note Bill Id</th><th>Discount</th><th>Net Amt</th><th>Date</th><th>Surcharge</th></thead></tr>";
	
	if(r.length>0)
	{
		for ( var i = 0; i < r.length; i++) {

			divContent = divContent + "<tbody><tr><td>" + r[i].billId
					+ "</td>  <td> " + r[i].disc
					+ "</td>  <td>"
					+ r[i].netAmt + "</td> <td>" + r[i].date + "</td> <td>" + r[i].surcharge + "</td> </tr></tbody";

		}
	}
	else
	{
		divContent = divContent + "<tr><td colspan='5'><b>No Record Found </b></td></tr>";
	}	
	
	divContent = divContent + "</table>";

	$("#prevDebitNoteData").html(divContent);
	$("#prevDebitNoteType").html("<b>Goods Receipt Note No-"+$("#txtPurId").val()+"</b>");
	
}
/**
*
* @Code :This method for calculate amount
* @return
**/
function calculateAmt(value) 
{
	var qty = 0;
	var mrp = 0;
	var unit = 0;
	var mrpPerUnit = 0;
	var dispenceQty = 0;

	if ($('#textQty'+ value).val() != '' && $('#textQty'+ value).val().length > 0)
		qty = parseFloat($('#textQty'+ value).val());

	if ($('#textPurRate'+ value).val() != '' && $('#textPurRate'+ value).val().length > 0)
		mrp = parseFloat($('#textPurRate'+ value).val());

	if ($('#textUnit'+ value).val() != '' && $('#textUnit'+ value).val().length > 0)
		unit = parseFloat($('#textUnit'+ value).val());
	
	if ($('#textDispenceQty' + value).val() != ''
		&& $('#textDispenceQty' + value).val().length > 0) 
	{
	     dispenceQty = parseFloat($('#textDispenceQty' + value).val());
     }

	if ($('#hiddenProductId'+ value).val() != ''
			&& $('#hiddenProductId'+ value).val().length > 0
			&& $('#hiddenProductId'+ value).val().length != '0' && mrp != 0
			&& unit != 0) {
		
		if (dispenceQty >= qty)
			{
		mrpPerUnit = (mrp / unit);
		$('#textAmt'+ value).val((mrpPerUnit * qty).toFixed(2));
			}
		else
			{
			alert("Enter Qty less than dispence Qty");
			$("#textQty" + value).val("");
			$("#textAmt" + value).val("");
			$("#textQty" + value).focus();
			}
	}
	calculateGrossAmount();
}
/**
*
* @Code :This method for delete amount
* @return
**/
function deletePO(debitNoteId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
		reset();
		alertify.success("Record deleted Succesfully");

		var inputs = [];
		inputs.push('debitNoteId=' + debitNoteId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/debitNote/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						// location.reload(true);
						if (r == true) {
							/*
							 * $('#msgDiv') .html( "<div class='alert
							 * alert-success' >Record deleted successfully..!</div>");
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
/**
*
* @Code :This method for set vendor search
* @return
**/
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
/**
*
* @Code :This method for reset values
* @return
**/
function resetDebitNoteValues() {
	$('#debitNoteMasterForm').find('input:text').val('');
	$('#debitNoteMasterForm').find('input:hidden').val('');
	$('#txtPartyName').val('');
}
/**
*
* @Code :This method for search debit note 
* @return
**/
function searchDebitNote(id) {
	resetDebitNoteValues();
	var inputs = [];
	inputs.push('vendorId=' + id);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/debitNote/getDebitNotebyVendorId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			if (r == "") {
				alert("Record not found!");
			}
			$("#hiddenVendorId").val('');
			setTableContent(r);
		}
	});

	return true;
}
/**
*
* @Code :This method for get debit product details 
* @return
**/
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
					url : "../../pharmacy/patientSale/getProductDetails",
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
/*
 * function isNullQty() { if ($('#txtQty').val() != null && $('#txtQty').val() !=
 * "") {
 *  } else { alert("Enter Quantity"); $('#txtQty').focus(); } }
 */
/**
*
* @Code :This method for calculate popup amount 
* @return
**/
function calculatePopUpAmt() {
	var qty = 0;
	var mrp = 0;
	var unit = 0;
	var mrpPerUnit = 0;
	/* var mrp=0; */
	/*
	 * var valueOfCode = document.getElementById("txtCode"); var code=
	 * valueOfCode.options[valueOfCode.selectedIndex].value;
	 */
	if ($('#txtQty').val() != '' && $('#txtQty').val().length > 0)
		qty = parseFloat($('#txtQty').val());

	if ($('#txtPRate').val() != '' && $('#txtPRate').val().length > 0)
		mrp = parseFloat($('#txtPRate').val());

	if ($('#txtUnit').val() != '' && $('#txtUnit').val().length > 0)
		unit = parseFloat($('#txtUnit').val());

	if ($('#hiddenProductId').val() != ''
			&& $('#hiddenProductId').val().length > 0
			&& $('#hiddenProductId').val().length != '0' && mrp != 0
			&& unit != 0) {
		mrpPerUnit = (mrp / unit);
		$('#txtAmt').val((mrpPerUnit * qty).toFixed(2));
	}
	/*
	 * if ($('#txtMrp').val() != '') mrp = parseInt($('#txtMrp').val());
	 */

	calculateGrossAmount();
	/*
	 * if (code=="Expiry") $('#txtAmt').val(qty * mrp);
	 * 
	 * else $('#txtAmt').val(qty * purRate);
	 */

}
/**
*
* @Code :This method for valiadte discount
* @return
**/
function validateDis() {
	var disc = 0;

	if ($('#txtDic').val() != '' && $('#txtDic').val().length > 0
			&& $('#txtDic').val() != '0') {
		disc = parseFloat($('#txtDic').val());
	}

	if (disc > 99) {
		alert("Discount should be less than 100");
		$('#txtDic').val('');
		$('#txtDiscount2').val('');
	}
	calculateDisc2();
}

function validateDis2() {

	if ($('#txtDisc').val() != '' && $('#txtDisc').val().length > 0) {
		discount = parseFloat($('#txtDisc').val());
	}
	if (discount > 99) {
		alert("Discount should be less than 100");
		$('#txtDisc').val('');

	}
	calculateDisc();
}

function validationsOfQtyDebit() {
	var qty = parseInt($('#txtQty').val());
	var curStock = parseInt($('#txtClStk').val());

	if (qty > curStock) {
		alert("Quantity is less than current Stock");
	}
}

/*
 * function calculateAmt(rowCount) { var qty = parseInt($('#textQty' +
 * rowCount).val()); var purRate = parseInt($('#textRate' + rowCount).val());
 * $('#textAmt' + rowCount).val((qty * purRate));
 * calculateGrossAmount(rowCount); }
 */
/**
*
* @Code :This method for calculate discount
* @return
**/
function calculateDiscount() {
	var discPercent = 0;
	var Gross = 0;
	if (($('#txtDic').val()) > 0 && $('#txtDic').val().length > 0) {
		discPercent = parseFloat($('#txtDic').val());
	}

	if ($('#txtGross').val() > 0 && $('#txtGross').val().length > 0) {
		Gross = parseFloat($('#txtGross').val());
	}

	var discount = parseFloat(discPercent / 100);
	var amount = parseFloat(discount) * parseFloat(Gross);
	$('#txtDiscount2').val((amount).toFixed(2));
	
	if ($('#txtDiscount2').val() != '' && $('#txtDiscount2').val().length > 0) {
		dic = parseFloat($('#txtDiscount2').val());
		$('#txtLess').val((dic).toFixed(2));
	}

}

function calculateDisc2() 
{
	var discPercent = 0;
	var Gross = 0;
	var a = 0;
	var b = 0;
	var c = 0;
	
	/*if (($('#txtDic').val()) > 0 && $('#txtDic').val().length > 0) 
	{
		discPercent = parseFloat($('#txtDic').val());

		if ($('#txtGross').val() > 0 && $('#txtGross').val().length > 0) {
			
			Gross = parseFloat($('#txtGross').val());
			var discount = parseFloat(discPercent / 100);
			var amount = parseFloat(discount) * parseFloat(Gross);
			$('#txtDiscount2').val((amount).toFixed(2));
		}
	}*/

	if ($('#txtDiscount1').val() > 0 && $('#txtDiscount1').val().length > 0) {
		a = parseFloat($('#txtDiscount1').val());
	}

	if ($('#txtDiscount2').val() > 0 && $('#txtDiscount2').val().length > 0) {
		b = parseFloat($('#txtDiscount2').val());
	}

	c = a + b;
	$('#txtLess').val((c).toFixed(2));
	calculateNetAmount();

}
/**
*
* @Code :This method for calculate net amount
* @return
**/
function calculateNetAmount() {

	var gross = 0;
	var less = 0;
	var add = 0;
	var totalNet = 0;
	var gstamt=0;
	// net amount

	if ($('#txtGross').val() != '')
		gross = parseFloat($('#txtGross').val());

	if ($('#txtLess').val() != '')
		less = parseFloat($('#txtLess').val());

	if ($('#txtAdd').val() != '')
		add = parseFloat($('#txtAdd').val());
	
	if ($('#textgst').val() != '')
		gstamt = parseFloat($('#textgst').val());
	
	
	$('#txtNetAmt').val(((gross - less) + add +gstamt).toFixed(2));
	//$('#txtNetAmt').val(((gross - less - gstamt) + add).toFixed(2));

}
/**
*
* @Code :This method for valiadte less
* @return
**/
function validateLess() {
	var GrossAmt = parseFloat($('#txtGross').val());
	var Less = parseFloat($('#txtLess').val());

	if (Less > GrossAmt) {
		alert("Less should be less than gross amount!");
		$('#txtDiscount2').val('');
		$('#txtDiscount1').val('');
		$('#txtNetAmt').val('');
		$('#txtLess').val('');
		$('#txtSurCharge').val('');
		$('#txtAdd').val('');
		$('#txtDic').val('');
	}

}

//For calculating gross amount 
function calculateGrossAmount() {

	var total = 0;
	var totalgst=0;
	var totalDisc = 0,disc=0;
	for ( var i = 1; i < $('#RowCount').val(); i++) {
		if ($('#textAmt' + i).val() >= 0 && $('#textAmt' + i).val() != ''
				&& $('#textAmt' + i).val() != null && $('#textQty' + i).val() != ''
					&& $('#textQty' + i).val().length > 0) {
			total = ((parseFloat(total) + parseFloat($('#textAmt' + i).val()))
					.toFixed(2));

		}
		
		if ($('#textDisc' + i).val() != ''
			&& $('#textDisc' + i).val().length > 0 && $('#textQty' + i).val() != ''
				&& $('#textQty' + i).val().length > 0) {
			disc=(parseInt($('#textDisc' + i).val()) * total/100);
		totalDisc = totalDisc + disc;
		}
		
		//For GST Amount 
		if ($('#textVat' + i).val() != '' && $('#textVat' + i).val().length > 0 && $('#textQty' + i).val() != ''
			&& $('#textQty' + i).val().length > 0) {
			totalgst = (total - disc)/100* parseFloat($('#textVat' + i).val());
			
		}
	}

	$('#txtDiscount1').val(parseFloat(totalDisc).toFixed(2));
	$('#txtGross').val(parseFloat(total).toFixed(2));
	$('#textgst').val(parseFloat(totalgst).toFixed(2));
	$('#textVat').val(parseFloat(totalgst).toFixed(2));
	
	var txtTotalVat=totalgst + parseFloat( $('#txtVat1').val()) + parseFloat( $('#txtVat2').val()) ;
	$('#txtTotalVat').val(parseFloat(txtTotalVat).toFixed(2));
	//calculateDisc();
	calculateDisc2($('#RowCount').val());

	calculateNetAmount();
}
function calculateDisc() {
	var totalDisc = 0;
	for ( var j = 1; j < $("#RowCount").val(); j++) {
		if ($("#hiddenProductId" + j).val() != null
				&& $('#hiddenProductId' + j).val() != "") {
			if ($('#textDisc' + j).val() != ''
					&& $('#textDisc' + j).val().length > 0) {
				totalDisc = totalDisc + parseInt($('#textDisc' + j).val());
				var Gross = parseFloat($('#txtGross').val());
				var discount = parseFloat(totalDisc / 100);
				var amt = parseFloat(discount) * parseFloat(Gross);
				$('#txtDiscount1').val((amt).toFixed(2));
			}
		}
	}

}
/**
*
* @Code :This method for calculate total
* @return
**/
function calculateAdd() {
	var add = 0;

	if ($('#txtSurCharges').val() != '' && $('#txtSurCharges').val().length > 0)
		add = parseFloat($('#txtSurCharges').val());

	$('#txtAdd').val(add);
	calculateNetAmount();
}
/**
*
* @Code :This method for create div
* @return
**/
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
		var result = DublicateRecord(currentRow);
		if (result == 1) {
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
					+ "<td><input type='text' id='textBarcode"
					+ rowCount
					+ "' class='form-control input-SmallText' name='' onblur='fetchProductNameByBarcode(this.value,"+rowCount+")'></td>"
					+ "<td><input type='hidden' name='debitNoteSlaves["
					+ index
					+ "].productMaster.productId' id='hiddenProductId"
					+ rowCount
					+ "'>"
					+ "<input data-toggle='modal' data-target='#debit_note_pop_up' id='textProductName"
					+ rowCount
					+ "' type='text' class='form-control input-SmallText' onclick='load("
					+ rowCount
					+ ")' name='debitNoteSlaves["
					+ index
					+ "].productMaster.productName'></td>"
					/*
					 * + "<input type='hidden' name='debitNoteSlaves[" + index +
					 * "].purchaseSlave.purSlaveId' id='hiddenPurchaseSlaveId" +
					 * rowCount + "'>"
					 */

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

					+ "<td><input type='text' id='textUnit"
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
					+ "<td><input type='text' name='debitNoteSlaves["
								+ index
								+ "].debitNoteSlaveGST' id='textVat"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly></td>"
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
					+ "' class='form-control input-SmallText' name='debitNoteSlaves["
					+ index
					+ "].debitNoteSlaveBatchCode'></td>"

					+ "<td><input type='text' readonly id='textExpiry"
					+ rowCount
					+ "' class='form-control input-SmallText' name='debitNoteSlaves["
					+ index
					+ "].debitNoteSlaveBatchExpiry'></td>"

					+ "<td><input type='text'  readonly id='textCode"
					+ rowCount
					+ "' class='form-control input-SmallText'></td>"

					+ "<td><input type='text' id='textMRP"
					+ rowCount
					+ "' class='form-control  input-SmallText' readonly name='debitNoteSlaves["
					+ index
					+ "].debitNoteSlaveMrp'></td>"

					+ "<td style='display: none;'><input type='text'  id='textDisc"
					+ rowCount
					+ "' class='form-control input-SmallText'readonly ></td>"
					
					+ "<td><input type='text' id='textDispenceQty"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly ></td>"

					+ "<td><input type='text' id='textQty"
					+ rowCount
					+ "' class='form-control input-SmallText'  name='debitNoteSlaves["
					+ index
					+ "].debitNoteSlaveQty'></td>"
					
					//Scheme
					+ "<td><input type='text' id='textSchm"
					+ rowCount
					+ "' class='form-control  input-SmallText' readonly></td>"
					
					+ "<td><input type='text' id='textSchmAmt"
					+ rowCount
					+ "' class='form-control  input-SmallText' readonly></td>"
					
					//End

					+ "<td><input type='text' id='textPurRate"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly name='debitNoteSlaves["
					+ index
					+ "].debitNoteSlaveRate'></td>"

					+ "<td><input type='text' value='0' id='textAmt"
					+ rowCount
					+ "' class='form-control  input-SmallText' readonly name='debitNoteSlaves["
					+ index
					+ "].debitNoteSlaveAmt'></td>"
					+ "<td><input type='checkbox' name='deleteGroup' value='"
					+ (rowCount) + "' id='deleteGroup" + (rowCount) + "'></td>";
			+"</tr>";

			$("#RowCount").val(rowCount);
			$("#addRowCount").val(j);
			j++;

			totalRowCount++;
			$("#txtProductName" + rowCount).focus();
			fillRow(currentRowCount);
			/* calculateAmt(currentRowCount); */
		}
	} else {
		var result = DublicateRecordForEdit(currentRow);
		if (result == 1) {
			fillRow(currentRowCount);
		}

	}

}
/**
*
* @Code :This method for dublicate records
* @return
**/
function DublicateRecordForEdit(rowCount) 
{
	var productName;
	var productName1;
	var j = 1;

	var batchId;
	var batchId1;

	var count = $('#RowCount').val();
	while (j < (count)) {

		if (rowCount == j) {
			productName = $('#hiddenProductId' + j).val();
			productName1 = $('#hiddenProductId').val();

			batchId = $('#textBatchId' + j).val();
			batchId1 = $('#hiddenBatchId').val();

			if ((batchId == batchId1)) {
				return 1;
			} else {
				var popUpBatchId;
				var formBatchId;
				for ( var i = 1; i < count; i++) {
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
		} else {
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


function splitVendorContent(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#txtPartyName').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenVendorId').val(arr[1]);
			
			jQuery.ajax({
				async : true,
				type : "GET",
				data : {
					"vendorId" : arr[1]
				},
				url : "../../pharmacy/vendoraddress/getAllAddressOfVendor",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					$('#stateIds').val(r[0].stateId);
				    $("#txtAddress").val(r[0].vendorAddress);
				    $("#txtPhone").val(r[0].vendorLandline);
					$("#hiddenVendoraddId").val(arr[1]);
					/*$('#stateIds').val(r[0][13]);
				    $("#txtAddress").val(r[0][6]);
				    $("#txtPhone").val(r[0][9]);
					$("#hiddenVendoraddId").val(r[0][0]);	*/	   
				}
			});
			
			
		
		
		}

	} else {
		$('#hiddenVendorId').val(0);
	}
}
/**
*
* @Code :This method for fill row
* @return
**/
function fillRow(rCount) {
	var rowCount = parseInt(rCount);

	$('#hiddenProductId' + rowCount).val($('#hiddenProductId').val());
	$('#textProductName' + rowCount).val($('#particulars').val());
	$('#textUnit' + rowCount).val($('#txtUnit').val());
	$('#textPack' + rowCount).val($('#txtPack').val());
	$('#textComp' + rowCount).val($('#txtComp').val());
	$('#textMRP' + rowCount).val($('#txtMrp').val());
	$('#textQty' + rowCount).val($('#txtQty').val());
	
	if($('#txtScheme').val() != ''){
		$('#textSchm' + rowCount).val($('#txtScheme').val());
	}else{
		$('#textSchm' + rowCount).val(0);
	}
	
	$('#textSchmAmt' + rowCount).val($('#textSchmAmt').val());
	
	$('#textPurRate' + rowCount).val($('#txtPRate').val());
	$('#textBatchNo' + rowCount).val($('#txtBatchNo').val());
	$('#textExpiry' + rowCount).val($('#txtExpiry').val());
	$('#textVat' + rowCount).val($('#txtVat').val());
	$('#textBatchId' + rowCount).val($('#hiddenBatchId').val());
	$('#textStockId' + rowCount).val($('#hiddenStockId').val());
	$('#textStockQtyInHand' + rowCount).val($('#txtClStk').val());
	$('#textCode' + rowCount).val($('#txtCode').val());
	$('#textAmt' + rowCount).val($('#txtAmt').val());
	$('#textDisc' + rowCount).val($('#txtDisc').val());
	$('#hiddenPurchaseSlaveId' + rowCount).val($('#hiddenPurchaseId').val());

	$('#textTotalStk' + rowCount).val($('#txtTotalStk').val());
	/* $('#textShelf' + rowCount).val($('#txtShelf').val()); */
	$('#textClStk' + rowCount).val($('#txtClStk').val());
	$('#textScm' + rowCount).val($('#txtScheme').val());
	$('#textRate' + rowCount).val($('#txtRate').val());
	
	$('#textDispenceQty' + rowCount).val($('#txtClStk').val());
	/*
	 * $('#textAmount' + rowCount).val(parseFloat($('#txtPurchaseRate').val()) *
	 * parseFloat($('#txtQty').val()));
	 */
	calculateGrossAmount();
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
/**
*
* @Code :This method for set result
* @return
**/
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
				+ r[i].debitNoteId
				+ "<input type='hidden' id='podocId"
				+ r[i].debitNoteId
				+ "' value='"
				+ r[i].debitNoteId
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
				/*+ "<td class='col-md-2 center'><a id='btnPrint"
				+ r[i].debitNoteId
				+ "' class='btn btn-xs btn-success'  href='/EhatEnterprise/pharmacy/debitNote/printView?debitNoteId="
				+ r[i].debitNoteId
				+ "'> <i class='fa fa-print'></i> </a></td>"*/
				+ "<td class='col-md-2 center'><button id='btnPrint"
				+ r[i].debitNoteId
				+ "' class='btn btn-xs btn-success'  onclick='debitNotePrint("
			    + r[i].debitNoteId
			    + ")'> <i class='fa fa-print'></i> </button></td>"

				/*
				 * + "</td><td class='col-md-2 center'> <button id='btnEdit" +
				 * r[i].debitNoteId + "' class='btn btn-xs btn-success'
				 * onclick='edit(" + r[i].debitNoteId + ")' value='PRINT'> <i
				 * class='fa fa-edit'></i> </button> </td>"
				 */

				+ "<td class='col-md-1 center'> <a id='btnEdit"
				+ r[i].debitNoteId
				+ "' class='btn btn-xs btn-success' value='EDIT' data-toggle='modal' data-target='#debit_note_pop_up_list' onclick='load("
				+ r[i].debitNoteId
				+ ")'>"
				+ "<i class='fa fa-eye'></i> </a></td>"

				+ "<td class='col-md-1 center'> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deletePO("
				+ r[i].debitNoteId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divProductOrderList').html(divContent);
}
/**
*
* @Code :This method for delete row
* @return
**/
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
				var amount = parseFloat($("#textAmt" + favorite[i]).val());

				$("#hiddenProductId" + favorite[i]).val("");
				$("#remove" + favorite[i]).hide();

				$("#textAmt" + favorite[i]).val(
						parseFloat($("#textAmt" + favorite[i]).val())
								- (amount));
				$("#textAmt" + favorite[i]).val("");
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
/**
*
* @Code :This method for dublicate record
* @return
**/
function DublicateRecord(rowCount) {
	var productName;
	var productName1;
	var j = 1;

	var batchId;
	var batchId1;

	var count = $('#RowCount').val();
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
/**
*
* @Code :This method for print
* @return
**/
function debitNotePrint(debitNoteId) 
{
	  window.open("../../pharmacy/debitNote/printView?debitNoteId="+debitNoteId+"");
	
}
/**
*
* @Code :This method for fetch product name
* @return
**/
function fetchProductNameByBarcode(batchId,rowCount) 
{
	if($('#textBarcode' + rowCount).val()!='' && $('#textBarcode' + rowCount).val())
		{
		if (chkDublicateRecortForBatch(rowCount, $('#textBarcode' + rowCount).val()) == 1) 
		{
	var BatchId = batchId;
	var inputs = [];
	inputs.push('BatchId=' + BatchId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/purchase/fetchProductNameByBarcode",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(result) {
			var data = jQuery.parseJSON(result);
			setTableDataByBarcode(data.result,rowCount);
		}
	});
	return true;
		}else
		{
			$('#textProductName' + currentRow).val('');
			$('#textUnit' + currentRow).val('');
			$('#textPack' + currentRow).val('');
			$('textComp' + currentRow).val('');
			$('#textBatchNo' + currentRow).val('');
			$('#textExpiry' + currentRow).val('');
			$('#textVat' + currentRow).val('');
			$('#textMRP' + currentRow).val('');
			$('#textPurRate' + currentRow).val('');
			$('#hiddenProductId' + currentRow).val('');
			$('#textBatchId' + currentRow).val('');
			$('#textClStk' + currentRow).val('');
			$('#textTotalStk' + currentRow).val('');
			$('#textStockId' + currentRow).val('');
			$('#textStockQtyInHand' + currentRow).val('');
			$('#textRate' + currentRow).val('');
			
		}
		}
		
}
/**
*
* @Code :This method for dublicate record for batch
* @return
**/
function chkDublicateRecortForBatch(rowCount, barcode) {
	var j = 1;
	var batchId = 0;
	var batchId1 = 0;

	while (j <= (totalRowCount)) {
		if ($('#textBatchId' + j).val() != '')
			batchId = $('#textBatchId' + j).val();
		else
			batchId = 0;

		/*
		 * if($('#textBarcode' +rowCount).val()!='') batchId1 = $('#textBarcode'
		 * +rowCount).val();
		 */

		if ((batchId == barcode) && j != rowCount) {
			alert("Dublicate Record Not insert");
			return 0;

		}
		j++;
	}
	return 1;

}

/**
*
* @Code :This method for set data for barcode
* @return
**/
function setTableDataByBarcode(r,rowCount) 
{
	var currentRow = rowCount;
	if(r!="")
		{
	if($('#textBarcode'+currentRow).val()!='')
	{
		if (r[0].clearStock!=0.0)
		{
			$('#textProductName' + currentRow).val(r[0].productName);
			$('#textUnit' + currentRow).val(r[0].unit);
			$('#textPack' + currentRow).val(r[0].pack);
			$('#textComp' + currentRow).val(r[0].comp);
			$('#textBatchNo' + currentRow).val(r[0].batchCode);
			$('#textExpiry' + currentRow).val(r[0].batchExpDate);
			$('#textVat' + currentRow).val(r[0].vat);
			$('#textMRP' + currentRow).val(r[0].mrp);
			$('#textPurRate' + currentRow).val(r[0].billRate);
			$('#hiddenProductId' + currentRow).val(r[0].productId);
			$('#textBatchId' + currentRow).val(r[0].batchId);
			$('#textClStk' + currentRow).val(r[0].clearStock);
			$('#textTotalStk' + currentRow).val(r[0].clearStock);
			$('#textStockId' + currentRow).val(r[0].stockId);
			$('#textStockQtyInHand' + currentRow).val(r[0].clearStock);
			$('#textRate' + currentRow).val(r[0].rate);
			
			$('#textDispenceQty' + currentRow).val(r[0].clearStock);
			
			if ($('#textProductName' + currentRow).val() != "")
				$('#textQty' + currentRow).focus();
			else
				$('#textProductName' + (currentRow + 1)).focus();

			if ($('#hiddenProductId' + currentRow).val() != ''
					&& $('#hiddenProductId' + currentRow).val() != null)
				addNewRow('RowCount', currentRow);
		}
	 else {
		alert("Record not found");
		$('#textBarcode' + currentRow).val('');
		$('#textBarcode' + currentRow).focus();
	}
}
}else
{
	alert("Record not found");
	$('#textBarcode' + currentRow).val('');
	$('#textBarcode' + currentRow).focus();
}

}
/**
*
* @Code :This method for add New row
* @return
**/
function addNewRow(RowCount, currentRowCount) 
{
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
			x.setAttribute('style', 'margin-top:0px');
			document.getElementById("DRRDiv").appendChild(x);
			var index = parseInt(rowCount) - 1;

			document.getElementById(rowId).innerHTML = "<td><label class='input-SmallText'>"
					+ rowCount
					+ "</label></td>"
					+ "<td><input type='text' id='textBarcode"
					+ rowCount
					+ "' class='form-control input-SmallText'  name='' onblur='fetchProductNameByBarcode(this.value,"+rowCount+")'></td>"
					+ "<td><input type='hidden' name='debitNoteSlaves["
					+ index
					+ "].productMaster.productId' id='hiddenProductId"
					+ rowCount
					+ "'>"
					+ "<input data-toggle='modal' data-target='#debit_note_pop_up' id='textProductName"
					+ rowCount
					+ "' type='text' class='form-control input-SmallText' onclick='load("
					+ rowCount
					+ ")' name='debitNoteSlaves["
					+ index
					+ "].productMaster.productName'></td>"

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

					+ "<td><input type='text' id='textUnit"
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
					+ "<td><input type='text' id='textVat"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly></td>"
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
					+ "' class='form-control input-SmallText' name='debitNoteSlaves["
					+ index
					+ "].debitNoteSlaveBatchCode'></td>"

					+ "<td><input type='text' readonly id='textExpiry"
					+ rowCount
					+ "' class='form-control input-SmallText' name='debitNoteSlaves["
					+ index
					+ "].debitNoteSlaveBatchExpiry'></td>"

					+ "<td><input type='text'  readonly id='textCode"
					+ rowCount
					+ "' class='form-control input-SmallText'></td>"

					+ "<td><input type='text' id='textMRP"
					+ rowCount
					+ "' class='form-control  input-SmallText' readonly name='debitNoteSlaves["
					+ index
					+ "].debitNoteSlaveMrp'></td>"

					+ "<td style='display: none;'><input type='text'  id='textDisc"
					+ rowCount
					+ "' class='form-control input-SmallText'readonly ></td>"
					
					+ "<td><input type='text' id='textDispenceQty"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly ></td>"

					+ "<td><input type='text' id='textQty"
					+ rowCount
					+ "' class='form-control input-SmallText'  name='' onblur='calculateAmount("
					+ rowCount
					+ ")' ></td>"

					+ "<td><input type='text' id='textPurRate"
					+ rowCount
					+ "' class='form-control input-SmallText' readonly name='debitNoteSlaves["
					+ index
					+ "].debitNoteSlaveRate'></td>"

					+ "<td><input type='text' value='0' id='textAmt"
					+ rowCount
					+ "' class='form-control  input-SmallText' readonly name='debitNoteSlaves["
					+ index
					+ "].debitNoteSlaveAmt'></td>"
					+ "<td><input type='checkbox' name='deleteGroup' value='"
					+ (rowCount) + "' id='deleteGroup" + (rowCount) + "'></td>";
			+"</tr>";

			$("#RowCount").val(rowCount);
			$("#addRowCount").val(j);
			j++;

			totalRowCount++;
			$("#txtProductName" + rowCount).focus();
	}
	else {
		$('#textProductName' + currentRow).val('');
		$('#textUnit' + currentRow).val('');
		$('#textPack' + currentRow).val('');
		$('textComp' + currentRow).val('');
		$('#textBatchNo' + currentRow).val('');
		$('#textExpiry' + currentRow).val('');
		$('#textVat' + currentRow).val('');
		$('#textMRP' + currentRow).val('');
		$('#textPurRate' + currentRow).val('');
		$('#hiddenProductId' + currentRow).val('');
		$('#textBatchId' + currentRow).val('');
		$('#textClStk' + currentRow).val('');
		$('#textTotalStk' + currentRow).val('');
		$('#textStockId' + currentRow).val('');
		$('#textStockQtyInHand' + currentRow).val('');
		$('#textRate' + currentRow).val('');
		
		}

	}

/**
*
* @Code :This method for calculate amount
* @return
**/
function calculateAmount(rowCount) 
{
	var qty = 0;
	var mrp = 0;
	var unit = 0;
	var mrpPerUnit = 0;
	var dispenceQty = 0;

	if ($('#textQty'+ rowCount).val() != '' && $('#textQty'+ rowCount).val().length > 0)
		qty = parseFloat($('#textQty'+ rowCount).val());

	if ($('#textPurRate'+ rowCount).val() != '' && $('#textPurRate'+ rowCount).val().length > 0)
		mrp = parseFloat($('#textPurRate'+ rowCount).val());

	if ($('#textUnit'+ rowCount).val() != '' && $('#textUnit'+ rowCount).val().length > 0)
		unit = parseFloat($('#textUnit'+ rowCount).val());
	
	if ($('#textDispenceQty' + rowCount).val() != ''
		&& $('#textDispenceQty' + rowCount).val().length > 0) 
	{
	     dispenceQty = parseFloat($('#textDispenceQty' + rowCount).val());
     }

	if ($('#hiddenProductId'+ rowCount).val() != ''
			&& $('#hiddenProductId'+ rowCount).val().length > 0
			&& $('#hiddenProductId'+ rowCount).val().length != '0' && mrp != 0
			&& unit != 0) {
		
		
		mrpPerUnit = (mrp / unit);
		$('#textAmt'+ rowCount).val((mrpPerUnit * qty).toFixed(2));
		
	}
	calculateGrossAmount();
}
/**
*
* @Code :This method for scheme amount
* @return
**/
function validationsOfSchemeDebit() {
	var Scheme = parseInt($('#txtScheme').val());
	var curScheme = parseInt($('#txtSchemeStk').val());

	if (Scheme > curScheme) {
		alert("Scheme is less than current Scheme");
	}
}
