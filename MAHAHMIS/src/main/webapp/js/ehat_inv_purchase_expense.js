/********************************************************************************
 * @author Rohit Sandbhor
 * @since 05112019
 * @comment Below js code save Purchase Expense and slaves details w.r.t purchase expense id
*******************************************************************************/
function savePurchaseExpense() {
	var expenseDate = $("#expenseDateId").val();
	var billDate = $("#billDateId").val();
	var referenceNo = $("#referenceNoId").val();
	var challanNo = $("#challanNoId").val();
	var supplierMobileNo = $("#supplierMobileNoId").val();
	var supplierAddress = $("#supplierAddressId").val();
	var supplierName = $("#hiddenSupplierNameId").val();
	var supplierState = $("#supplierStateId").val();
	var totalItemQuantity = $("#totalItemQuantityId").val();
	var totalItemDiscount = $("#totalItemDiscountId").val();
	var purchaseQuotationNumber = $("#purchaseQuotationNumberId").val();
	var partyMasterId = $("#hiddenPartyMasterId").val();
	var purchaseExpenseRemark = $("#purchaseExpenseRemarkId").val();
	//calculation values
	var lessSpecialDiscount = $("#lessSpecialDiscountId").val();
	var lessDebitAmount = $("#lessDebitAmountId").val();
	var lessCDPercent1 = $("#lessCDPercent1Id").val();
	var lessCDPercent2 = $("#lessCDPercent2Id").val();
	var addOctroi = $("#addOctroiId").val();
	var addSurcharge = $("#addSurchargeId").val();
	var addCreditAmount = $("#addCreditAmountId").val();
	var addFreight = $("#addFreightId").val();
	var taxVat = $("#taxVatId").val();
	var taxLBT = $("#taxLBTId").val();
	var taxCST = $("#taxCSTId").val();
	var taxExVat = $("#taxExVatId").val();
	var taxTotalTaxes = $("#taxTotalTaxesId").val();
	var grossAmount = $("#grossAmountId").val();
	var grossLessAmount = $("#grossLessAmountId").val();
	var grossAddAmount = $("#grossAddAmountId").val();
	var grossTaxes = $("#grossTaxesId").val();
	var grossNetAmount = $("#grossNetAmountId").val();
	var userId = $('#userId').val();
	var id = $("#purchaseExpenseId").val();
	
	var purchaseExpenseItemSlaveDetails = {
			lstPurchaseExpenseItemSlaveDto : []
		};
	var rowsPurchaseExpenseItemSlave = $('#ItemInfoTablePO tbody tr.newAdded').length;
	for ( var i = 1; i <= rowsPurchaseExpenseItemSlave; i++) {
		var itemSlaveId = $("#itemSlaveId" + i).val();
		var txtPurchaseQuotationItemName = $("#txtPurchaseQuotationItemName_" + i).val();
		var txtPurchaseQuotationDocQuantity = $("#txtPurchaseQuotationDocQuantity" + i).val();
		var txtPurchaseQuotationUnitPrice = $("#txtPurchaseQuotationUnitPrice" + i).val();
		var txtPurchaseQuotationTrdeDiscountPercentage = $("#txtPurchaseQuotationTrdeDiscountPercentage" + i).val();
		var txtPurchaseQuotationTrdeDiscountInRupess = $("#txtPurchaseQuotationTrdeDiscountInRupess" + i).val();
		var txtPurchaseQuotationTrdeDiscountAmt = $("#txtPurchaseQuotationTrdeDiscountAmt" + i).val();
		var txtPurchaseQuotationBaseAmount = $("#txtPurchaseQuotationBaseAmount" + i).val();
		var txtPurchaseQuotationTaxCodePO = $("#txtPurchaseQuotationTaxCodePO_" + i).val();
		var txtPurchaseQuotationTaxAmount = $("#txtPurchaseQuotationTaxAmount_" + i).val();
		var txtPurchaseOrderTaxAmtinRs = $("#txtPurchaseOrderTaxAmtinRs" + i).val();
		var txtPurchaseQuotationFactorOne = $("#txtPurchaseQuotationFactorOne" + i).val();
		var txtPurchaseQuotationFactorTwo = $("#txtPurchaseQuotationFactorTwo" + i).val();
		var txtPurchaseQuotationFactorThree = $("#txtPurchaseQuotationFactorThree" + i).val();
		var txtPurchaseQuotationFactorFour = $("#txtPurchaseQuotationFactorFour" + i).val();
		var txtPurchaseQuotationActualQuantity = $("#txtPurchaseQuotationActualQuantity" + i).val();
		var txtPurchaseQuotationPendingQuantity = $("#txtPurchaseQuotationPendingQuantity" + i).val();
		setPurchaseExpenseItemSlaveList(purchaseExpenseItemSlaveDetails,itemSlaveId,txtPurchaseQuotationItemName,
				txtPurchaseQuotationDocQuantity,
				txtPurchaseQuotationUnitPrice,
				txtPurchaseQuotationTrdeDiscountPercentage,
				txtPurchaseQuotationTrdeDiscountInRupess,
				txtPurchaseQuotationTrdeDiscountAmt,
				txtPurchaseQuotationBaseAmount,
				txtPurchaseQuotationTaxCodePO,
				txtPurchaseQuotationTaxAmount,
				txtPurchaseOrderTaxAmtinRs,
				txtPurchaseQuotationFactorOne,
				txtPurchaseQuotationFactorTwo,
				txtPurchaseQuotationFactorThree,
				txtPurchaseQuotationFactorFour,
				txtPurchaseQuotationActualQuantity,
				txtPurchaseQuotationPendingQuantity);
	}
	purchaseExpenseItemSlaveDetails = JSON.stringify(purchaseExpenseItemSlaveDetails);
	var inputs = [];
	// purchase order  details
	inputs.push('id=' + id);
	inputs.push('supplierMobileNo=' + supplierMobileNo);
	inputs.push('supplierAddress=' + supplierAddress);
	inputs.push('supplierName=' + supplierName);
	inputs.push('supplierState=' + supplierState);
	inputs.push('totalItemQuantity=' + totalItemQuantity);
	inputs.push('totalItemDiscount=' + totalItemDiscount);
	inputs.push('purchaseQuotationNumber=' + purchaseQuotationNumber);
	inputs.push('referenceNo=' + referenceNo);
	inputs.push('expenseDate=' + expenseDate);
	inputs.push('billDate=' + billDate);
	inputs.push('challanNo=' + challanNo);
	inputs.push('partyMasterId=' + partyMasterId);
	//calculation values
	inputs.push('lessSpecialDiscount=' + lessSpecialDiscount);
	inputs.push('lessDebitAmount=' + lessDebitAmount);
	inputs.push('lessCDPercent1=' + lessCDPercent1);
	inputs.push('lessCDPercent2=' + lessCDPercent2);
	inputs.push('addOctroi=' + addOctroi);
	inputs.push('addSurcharge=' + addSurcharge);
	inputs.push('addCreditAmount=' + addCreditAmount);
	inputs.push('addFreight=' + addFreight);
	inputs.push('taxVat=' + taxVat);
	inputs.push('taxLBT=' + taxLBT);
	inputs.push('taxCST=' + taxCST);
	inputs.push('taxExVat=' + taxExVat);
	inputs.push('taxTotalTaxes=' + taxTotalTaxes);
	inputs.push('grossAmount=' + grossAmount);
	inputs.push('grossLessAmount=' + grossLessAmount);
	inputs.push('grossAddAmount=' + grossAddAmount);
	inputs.push('grossTaxes=' + grossTaxes);
	inputs.push('grossNetAmount=' + grossNetAmount);
	inputs.push('purchaseExpenseRemark=' + purchaseExpenseRemark);
	// item slave details
	inputs.push('purchaseExpenseItemSlaveDetails=' + purchaseExpenseItemSlaveDetails);
	inputs.push('userId=' + userId);
	inputs.push('createdBy=' + userId);
	inputs.push('updatedBy=' + userId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/inventoryPurchaseExpense/savePurchaseExpenseModule",
		cache : false,
		success : function(r) {
			if (r == 1) {
				alertify.success("Records Saved Sucessfully");
				setTimeout(function() {
			         window.location.reload();
			      }, 1000);
				
			} else if (r == 2) {
				alertify.success("Records Updated Sucessfully");
				setTimeout(function() {
		         window.location.reload();
		      }, 1000);
			}  else {
				alertify.error("Oops Some Problem Ocured");
			}
			
		}
	});
	
}
/**
 * @author Rohit Sandbhor
 * @since 27-12-2019
 * @comment created this function to set list of items to purchase expanse item info slave
 * @param purchaseExpenseItemSlaveDetails
 * @param txtPurchaseQuotationItemName
 * @param txtPurchaseQuotationDocQuantity
 * @param txtPurchaseQuotationUnitPrice
 * @param txtPurchaseQuotationTrdeDiscountPercentage
 * @param txtPurchaseQuotationTrdeDiscountInRupess
 * @param txtPurchaseQuotationTrdeDiscountAmt
 * @param txtPurchaseQuotationBaseAmount
 * @param txtPurchaseQuotationTaxCodePO
 * @param txtPurchaseQuotationTaxAmount
 * @param txtPurchaseOrderTaxAmtinRs
 * @param txtPurchaseQuotationFactorOne
 * @param txtPurchaseQuotationFactorTwo
 * @param txtPurchaseQuotationFactorThree
 * @param txtPurchaseQuotationFactorFour
 * @param txtPurchaseQuotationActualQuantity
 * @param txtPurchaseQuotationPendingQuantity
 */
function setPurchaseExpenseItemSlaveList(purchaseExpenseItemSlaveDetails,itemSlaveId,txtPurchaseQuotationItemName,
		txtPurchaseQuotationDocQuantity,
		txtPurchaseQuotationUnitPrice,
		txtPurchaseQuotationTrdeDiscountPercentage,
		txtPurchaseQuotationTrdeDiscountInRupess,
		txtPurchaseQuotationTrdeDiscountAmt,
		txtPurchaseQuotationBaseAmount,
		txtPurchaseQuotationTaxCodePO,
		txtPurchaseQuotationTaxAmount,
		txtPurchaseOrderTaxAmtinRs,
		txtPurchaseQuotationFactorOne,
		txtPurchaseQuotationFactorTwo,
		txtPurchaseQuotationFactorThree,
		txtPurchaseQuotationFactorFour,
		txtPurchaseQuotationActualQuantity,
		txtPurchaseQuotationPendingQuantity) {
	
	purchaseExpenseItemSlaveDetails.lstPurchaseExpenseItemSlaveDto.push({
		id       : itemSlaveId,
		itemName : txtPurchaseQuotationItemName,
		itemQuantity : txtPurchaseQuotationDocQuantity,
		itemUnitPrice : txtPurchaseQuotationUnitPrice,
		itemTradeDiscount : txtPurchaseQuotationTrdeDiscountPercentage,
		itemTradeDiscountRupees : txtPurchaseQuotationTrdeDiscountInRupess,
		itemTradeDiscountAmount : txtPurchaseQuotationTrdeDiscountAmt,
		itemTradeBaseAmount : txtPurchaseQuotationBaseAmount,
		gst : txtPurchaseQuotationTaxCodePO,
		igst : txtPurchaseQuotationTaxAmount,
		totalAmount : txtPurchaseOrderTaxAmtinRs,
		itemPurchaseFactorUom1 : txtPurchaseQuotationFactorOne,
		itemPurchaseFactorUom2 : txtPurchaseQuotationFactorTwo,
		itemPurchaseFactorUom3 : txtPurchaseQuotationFactorThree,
		itemPurchaseFactorUom4 : txtPurchaseQuotationFactorFour,
		itemActualQuantity	   : txtPurchaseQuotationActualQuantity,
		itemPendingQuantity	   : txtPurchaseQuotationPendingQuantity
	});
}

/********************************************************************************
 * @since 11-12-2019
 * @comment added this js to get all the purchase expense records
 * @author Rohit Sandbhor
 *******************************************************************************/
function getAllPurchaseExpenseRecordsDetails() {
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryPurchaseExpense/getAllPurchaseExpenseRecordsDetails",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			setPurchaseExpenseDataToTable(r);

		}
	});
}

/********************************************************************************
 * @since 12-11-2019
 * @comment added this js function to set the purchase expense data to dynamic table
 * @author Rohit Sandbhor
 * @param r
 *******************************************************************************/
function setPurchaseExpenseDataToTable(r) {
	var htm = "";
	var index = 1;
	for ( var i = 0; i < r.purchaseExpenseDtos.length; i++) {
		htm = htm
				+ '<tr> '
				+ ' <td class="col-md-1 center">'
				+ index
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ r.purchaseExpenseDtos[i].supplierName
				+ '</td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#purchaseOrderModuleModal"  onclick=editPurchaseExpense('
				+ r.purchaseExpenseDtos[i].id
				+ ')><i class="fa fa-edit"></i></button></td>'
				+ ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-danger editBodyPartMaster" onclick=deletePurchaseExpense('
				+ r.purchaseExpenseDtos[i].id
				+ ')><i class="fa fa-trash-o"></i></button></td>' + 
			    ' <td class="col-md-1 center">'
				+ '	<button class="btn btn-xs btn-success editBodyPartMaster" data-toggle="modal" data-target="#itemMasterModal" onclick=printPurchaseExpenseMaster('
				+ r.purchaseExpenseDtos[i].id
				+ ')><i class="fa fa-print"></i></button></td>'+
				
				'</tr>';
		index++;
	}
	$("#purchaseExpenseTableBodyId").html(htm);
}

/********************************************************************************
 * @since 08-11-2019
 * @comment below js function to edit the purchase expense data details
 * @author Rohit Sandbhor
 * @param id
 *******************************************************************************/
function editPurchaseExpense(id) {
	//to set terms and condition master data on purchase order master
	getTermAndConditionForPurchaseOrder();
	var inputs = [];
	var htm = "";
	var index = 1;
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/inventoryPurchaseExpense/editPurchaseExpense",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('Network Issue..!!');
		},
		success : function(r) {
			
			$("#purchaseExpenseId").val(r.id);
			$("#challanNoId").val(r.challanNo);
			$("#supplierMobileNoId").val(r.supplierMobileNo);
			$("#referenceNoId").val(r.referenceNo);
			$("#expenseDateId").val(r.expenseDate);
			$("#billDateId").val(r.billDate);
			$("#supplierAddressId").val(r.supplierAddress);
			$("#supplierNameId").val(r.supplierName);
			$("#supplierStateId").val(r.supplierState);

			$("#lessSpecialDiscountId").val(r.lessSpecialDiscount);
			$("#lessDebitAmountId").val(r.lessDebitAmount);
			$("#lessCDPercent1Id").val(r.lessCDPercent1);
			$("#lessCDPercent2Id").val(r.lessCDPercent2);
			$("#addOctroiId").val(r.addOctroi);
			$("#addSurchargeId").val(r.addSurcharge);
			$("#addCreditAmountId").val(r.addCreditAmount);
			$("#addFreightId").val(r.addFreight);
			$("#taxVatId").val(r.taxVat);
			$("#taxLBTId").val(r.taxLBT);
			$("#taxCSTId").val(r.taxCST);
			$("#taxExVatId").val(r.taxExVat);
			$("#taxTotalTaxesId").val(r.taxTotalTaxes);
			$("#grossAmountId").val(r.grossAmount);
			$("#grossLessAmountId").val(r.grossLessAmount);
			$("#grossAddAmountId").val(r.grossAddAmount);
			$("#grossTaxesId").val(r.grossTaxes);
			$("#grossNetAmountId").val(r.grossNetAmount);
			$("#hiddenSupplierNameId").val(r.supplierName);
			$("#hiddenPartyMasterId").val(r.partyMasterId);
			$("#purchaseExpenseRemarkId").val(r.purchaseExpenseRemark);
			
			for ( var i = 0; i < r.purchaseExpenseItemSlaveDto.length; i++) {
				htm = htm
						+
						"<tr id='deleterow' class='newAdded' "
								+ index
								+ "'> <td> <input type='checkbox' checked='checked' name='checkbox"
								+ index
								+ "' id='checkbox"
								+ index
								+ "'/></td><td>"
								+ index
								+ "  <input type='hidden' id='rowcountid"
								+ index
								+ "' value ="
								+ index
								+ "> </td>"
								
								+ " <td style='display:none'><div><input type='hidden' class='typeahead form-control input-SmallText' value="+r.purchaseExpenseItemSlaveDto[i].id+"  id='itemSlaveId"
								+ rowCount
								+ "'</div></td> "
								
								
								+ " <td><div id ='divtxtPurchaseQuotationItemName'><input type='text' style='text-align:left;width:250px;' " +
										"class='typeahead form-control input-SmallText' value="+r.purchaseExpenseItemSlaveDto[i].itemName+" id='txtPurchaseQuotationItemName_"
								+ index
								+ "' onkeyup='fetchItemMasterDetails(this.id)' data-name='purchaseOrderModule' />"
								+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
								+ index
								+ "' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
								+ index
								+ "' value='0'/></div></td> "
								+ "<td><input type='text' class='form-control input-SmallText' value="+r.purchaseExpenseItemSlaveDto[i].itemQuantity+" id='txtPurchaseQuotationDocQuantity"
								+ index
								+ "' onkeyup='totalAmount(this.id,"
								+ index
								+ ")' onkeypress='return validateNumbers(event);' style='width:60px;' ><label id='txtPurchaseQuotationLastFactorUOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' value="+r.purchaseExpenseItemSlaveDto[i].itemUnitPrice+" id='txtPurchaseQuotationUnitPrice" 
								+ index
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td>"
								+ ""
								+ " <td><input type='text' class='form-control input-SmallText' value="+r.purchaseExpenseItemSlaveDto[i].itemTradeDiscount+" onblur='calculTradeDis(this.id,"
								+ index
								+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
								+ index
								+ "'  onkeyup='chkTradAmtorPercentage(this.id,"+rowCount+")' onkeypress='return validateNumbers(event);' ></td> <td>" +
								"<input type='text' class='form-control input-SmallText' value="+r.purchaseExpenseItemSlaveDto[i].itemTradeDiscountRupees+" onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+rowCount+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
								+ index
								+ "'  style='width:60px;' ></td>"
								+ " <td><input type='text' class='form-control input-SmallText' value="+r.purchaseExpenseItemSlaveDto[i].itemTradeDiscountAmount+"  id='txtPurchaseQuotationTrdeDiscountAmt"
								+ index
								+ "' onkeypress='return validateNumbers(event);'   style='width:60px;'></td>"
								+ "<td><input type='text' class='form-control input-SmallText' value="+r.purchaseExpenseItemSlaveDto[i].itemTradeBaseAmount+"  id='txtPurchaseQuotationBaseAmount"
								+ index
								+ "' onkeypress='return validateNumbers(event);' style='width:100px;' ></td>"
								 +"<td><input type='text' class='typeahead form-control input-SmallText' value="+r.purchaseExpenseItemSlaveDto[i].gst+" autocomplete='off'  id='txtPurchaseQuotationTaxCodePO_"
									+ index
									+ "' onkeypress='applyTaxforItemexpense(this.id)'  style='width:80px;'></td>"
									+ " <td><input type='text' class='typeahead form-control input-SmallText' onkeyup='rowAmtCalNEW(this.id,"
									+ index
									+ ")' onkeypress='autotaxCodeforItem(this.id,onchange)' value="+r.purchaseExpenseItemSlaveDto[i].igst+" id='txtPurchaseQuotationTaxAmount_"
									+ index
									+ "'   style='width:80px;'  autocomplete='off' ></td> "
								+ "<td><input type='text' class='form-control input-SmallText'  style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
								+ index
								+ "'   ></td> "
								+ "<td><input type='text' class='form-control input-SmallText' value="+r.purchaseExpenseItemSlaveDto[i].totalAmount+" id='txtPurchaseQuotationRowAmount"
								+ index
								+ "' onkeypress='return validateNumbers(event);'  style='width:100px;'></td>"
								+ "<td><input type='text' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);' value="+r.purchaseExpenseItemSlaveDto[i].itemPurchaseFactorUom1+" id='txtPurchaseQuotationFactorOne"
								+ index
								+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'><label id='txtPurchaseQuotationFactor1UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' value="+r.purchaseExpenseItemSlaveDto[i].itemPurchaseFactorUom2+" id='txtPurchaseQuotationFactorTwo"
								+ index
								+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0' ><label id='txtPurchaseQuotationFactor2UOM"+rowCount+"' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' value="+r.purchaseExpenseItemSlaveDto[i].itemPurchaseFactorUom3+" id='txtPurchaseQuotationFactorThree"
								+ index
								+ "' onkeypress='return validateNumbers(event);'value='0'><label id='txtPurchaseQuotationFactor3UOM"+rowCount+"' style='width:60px;' ></label></td> "
								+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'style='width:60px;' value="+r.purchaseExpenseItemSlaveDto[i].itemPurchaseFactorUom4+" id='txtPurchaseQuotationFactorFour"
								+ index
								+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'>" +
								"<label id='txtPurchaseQuotationFactor4UOM"+rowCount+"' style='width:60px;'></label></td> "
								+ " <td><input type='text' class='form-control input-SmallText' value="+r.purchaseExpenseItemSlaveDto[i].itemActualQuantity+" id='txtPurchaseQuotationActualQuantity"
								+ index
								+ "' onblur='pendingAmount(this.id,"
								+ index
								+ ")' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
								+ "<td><input type='text' class='form-control input-SmallText'  value="+r.purchaseExpenseItemSlaveDto[i].itemPendingQuantity+"  id='txtPurchaseQuotationPendingQuantity"
								+ index
								+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
								+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNoPO"
								+ index
								+ "' style='width:60px;' ></td>"
								+ " </tr>";
								index++;
								$("#itemInfoDetails").html(htm);
								}

		}
	});
}

/********************************************************************************
 * @Since 13-11-2019
 * @author Rohit Sandbhor
 * @Comment created this js function delete the purchase expense and his slaves
*******************************************************************************/
function deletePurchaseExpense(id) {
	var r = confirm("Are You Sure You Want To Delete Purchase Expense Details");
	if (r == true) {
		jQuery.ajax({
			type : "POST",
			url : "ehat/inventoryPurchaseExpense/deletePurchaseExpense",
			data : {
				"id" : id
			},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(response) {
				alertify.error(response);
				getAllPurchaseExpenseRecordsDetails();
				
			}
		});
	}
}

/**
 * 
 * @param pQId
 */
function printPurchaseExpenseMaster(purchaseExpenseId){
	 window.open("inv_purchase_expense_print.jsp?purchaseExpenseId="+purchaseExpenseId);
}

/************
 * @author : Rohit Sandbhor
 * @date : 20-12-2019
* @codeFor	: Add new row temp for Purchase Order
 ************/
function addNewRowInTablePurchaseExpense(tableId,callFrom){
	var tbody = "";
	var rows = $('#'+tableId+' tbody tr').length;
	if(callFrom == "purchaseexpense"){
		tbody = getPurchaseExpenseItemInfoBody(rows+1);
	}
	$('#'+tableId).append(tbody);
}

/*******************************************************************************
 * @author : Rohit Sandbhor
 * @date : 26-12-2019
 * @codeFor : to Set Row Template To Body Of Item Info Table
 ******************************************************************************/
function getPurchaseExpenseItemInfoBody(id) {
	var tbody = "";
	tbody = tbody
	+ "<tr id='deleterow' class='newAdded' "
							+ id
							+ "'> <td> <input type='checkbox' class='chkMrnItem' name='checkbox"
							+ id
							+ "' id='checkbox"
							+ id
							+ "'/></td><td>"
							+ "  <input type='hidden' id='rowcountid"
							+ id
							+ "' value ='0'"
							+ "><span id='snum"+id+"'>"+id+"</span> </td>"
							+ " <td style='display:none'><div><input type='hidden' class='typeahead form-control input-SmallText' value='0' id='itemSlaveId"
							+ id
							+ "'</div></td> "
							+ " <td><div id ='divtxtPurchaseQuotationItemName"+id+"'><input type='text' style='text-align:left;width:250px;' " +
									"class='typeahead form-control input-SmallText'  id='txtPurchaseQuotationItemName_"
							+ id
							+ "' onkeyup='fetchItemMasterDetails(this.id)' data-name='purchaseExpenseModule' />"
							+ "<input type='hidden'  id='txtPurchaseQuotationItemNumber"
							+ id
							+ "' /> <input type='hidden'  id='txtInvpurchaseCommonItemMasterId"
							+ id
							+ "' value='0'/></div></td> "
							+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationDocQuantity"
							+ id
							+ "' onkeyup='totalAmount(this.id,"
							+ id
							+ ")' onkeypress='return validateNumbers(event);' style='width:60px;' ><label id='txtPurchaseQuotationLastFactorUOM"+id+"' ></label></td> "
							
							+ "<td style='display:none'><input type='hidden' class='form-control input-SmallText' id='itemMasterId"
							+ id
							+ "' onkeyup='totalAmount(this.id,"
							+ id
							+ ")' style='width:60px;' ></td> "
							
							
							+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationUnitPrice"
							+ id
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td>"
							+ ""
							+ " <td><input type='text' class='form-control input-SmallText' onblur='calculTradeDis(this.id,"
							+ id
							+ ")'  id='txtPurchaseQuotationTrdeDiscountPercentage"
							+ id
							+ "'  onkeyup='chkTradAmtorPercentage(this.id,"+id+")' onkeypress='return validateNumbers(event);' ></td> <td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event)' onkeyup ='chKTradAmt(this.id,"+id+")' id='txtPurchaseQuotationTrdeDiscountInRupess"
							+ id
							+ "'  style='width:60px;' ></td>"
							+ " <td><input type='text' class='form-control input-SmallText'  id='txtPurchaseQuotationTrdeDiscountAmt"
							+ id
							+ "' onkeypress='return validateNumbers(event);'   style='width:60px;'></td>"
							+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBaseAmount"
							+ id
							+ "' onkeypress='return validateNumbers(event);' style='width:100px;' ></td>"
							 +"<td><input type='text' class='typeahead form-control input-SmallText'  autocomplete='off'  id='txtPurchaseQuotationTaxCodePO_"
								+ id
								+ "' onkeypress='applyTaxforItemexpense(this.id)'  style='width:80px;'></td>"
								+ " <td><input type='text' class='typeahead form-control input-SmallText' onkeyup='rowAmtCalNEW(this.id,"
								+ id
								+ ")' onkeypress='autotaxCodeforItem(this.id,onchange)'  id='txtPurchaseQuotationTaxAmount_"
								+ id
								+ "'   style='width:80px;'  autocomplete='off' ></td> "
							+ "<td><input type='text' class='form-control input-SmallText'  style='width:100px;' id='txtPurchaseOrderTaxAmtinRs"
							+ id
							+ "'   ></td> "
							+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationRowAmount"
							+ id
							+ "' onkeypress='return validateNumbers(event);'  style='width:100px;'></td>"
							+ "<td><input type='text' class='form-control input-SmallText'  onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactorOne"
							+ id
							+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'><label id='txtPurchaseQuotationFactor1UOM"+rowCount+"' ></label></td> "
							+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactorTwo"
							+ id
							+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0' ><label id='txtPurchaseQuotationFactor2UOM"+rowCount+"' ></label></td> "
							+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);' id='txtPurchaseQuotationFactorThree"
							+ id
							+ "' onkeypress='return validateNumbers(event);'value='0'><label id='txtPurchaseQuotationFactor3UOM"+rowCount+"' style='width:60px;' ></label></td> "
							+ "<td><input type='text' class='form-control input-SmallText' onkeypress='return validateNumbers(event);'style='width:60px;' id='txtPurchaseQuotationFactorFour"
							+ id
							+ "' onkeypress='return validateNumbers(event);' maxlength='5' style='width:60px;' value='0'><label id='txtPurchaseQuotationFactor4UOM"+rowCount+"' style='width:60px;'></label></td> "
							+ " <td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationActualQuantity"
							+ id
							+ "' onblur='pendingAmount(this.id,"
							+ id
							+ ")' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
							+ "<td><input type='text' class='form-control input-SmallText'    id='txtPurchaseQuotationPendingQuantity"
							+ id
							+ "' onkeypress='return validateNumbers(event);' style='width:60px;'></td> "
							+ "<td><input type='text' class='form-control input-SmallText' id='txtPurchaseQuotationBatchNoPO"
							+ id
							+ "' style='width:60px;' ></td>"
							+ " </tr>";
$("#RowCount").val(id);
var totaltblsize = $("#RowCount").val();
$("#totaltblsize").val(totaltblsize);
$("#itemInfoDetails").append(tbody);
//$("#bankID" + id).html($("#bankID").html());
}

/************
 * @author : Rohit Sandbhor
 * @date : 20-12-2019
 * @codeFor	: Remove row temp for MRN
 ************/
function removeRowFromTablePurchaseExpense(tableId,checkboxClass){	
	var rowCount=$("#RowCount").val();
	$('.'+checkboxClass+':checkbox:checked').parents("tr").remove();	
	check(tableId);
	checkComp(tableId);
//	totalDocDiscountPQ();
//	totalDocQtyPQ();
//	totalGrossAmt(1,rowCount);
//	totalVatAmt(1,rowCount);
}
/************
 * @author : Rohit Sandbhor
 * @date : 20-12-2019
 * @codeFor	: For reorder srno after delete
 ************/
function check(tableId){
	obj=$('#'+tableId+' tbody tr').find('span');
	$.each( obj, function( key, value ) {
		id=value.id;
		$('#'+id).html(key+1);
	});
}
/************
 * @author : Rohit Sandbhor
 * @date : 20-12-2019
* @codeFor	: For reorder index ids of componant after delete
 ************/
function checkComp(tableId){
	
	var trLength = $('#'+tableId).find("tr:first th").length;
	obj=$('#'+tableId+' tbody tr td').find('input');
	var inx = 1;
	var idIndex = 1;
	$.each( obj, function( key, value ) {		
		
		if(inx == (trLength+1)){
			
			inx = 1;
			idIndex++;
		}		
		id=value.id;		
		var idText = (value.id).replace(/[0-9]/g, '');
		var replaceById = idText + idIndex;
		$('#'+id).attr('id',replaceById);
		inx++;
	});
}