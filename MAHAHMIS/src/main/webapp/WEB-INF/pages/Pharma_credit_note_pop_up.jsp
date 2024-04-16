<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script type="text/javascript">
	var requestCount = 0;
	function load(currentVal, id) {

		$("#particulars").focus();
		setTimeout(function() {
			$("#particulars").focus();
		}, 550);

		if ($('#hiddenProductId' + currentVal).val() != "") {
			editPro(currentVal);
			
		}
		if ($('#hiddenProductId' + currentVal).val() == "") {
			resetValues();
		}
		$('#hiddenCurrentRow').val(currentVal);
		$('#CreditNote_PopUp_Form').modal('show');
	}

	function setCreditNoteAutocomplete(key) {
		$("#hiddenProductId").val("0");
		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				//$('#txtQty').focus();
				return false;
			}
		}

		var findingName = $("#particulars").val();
		var billNum = $("#txtAdjustinBillNo").val();

		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');

		if (billNum != "" && billNum.length > 0) {

			jQuery
					.ajax({

						async : true,
						type : "GET",
						data : {
							letter : findingName,
							billNumber : billNum,
						},

						url : "../../pharmacy/creditNote/autoSuggestionProductByBillNum",
						timeout : 1000 * 60 * 15,
						cache : false,
						error : function() {
							/* alert('error'); */
						},
						success : function(r) {
							var availableTags1 = [];
							var resultData1 = [];

							if (r.length > 0) {
								for ( var i = 0; i < r[0].ltPatientSaleBill.length; i++) {
									availableTags1[i] = r[0].ltPatientSaleBill[i].productMaster.productName
											+ '_'
											+ r[0].ltPatientSaleBill[i].productMaster.productId
											+ '-'
											+ r[0].ltPatientSaleBill[i].productMaster.productUnit
											+ '-'
											+ r[0].ltPatientSaleBill[i].productMaster.packingMaster.packType
											+ '-'
											+ r[0].ltPatientSaleBill[i].productMaster.companyMaster.compName
											+ '-'
											+ r[0].ltPatientSaleBill[i].productMaster.shelfMaster.shelfName
											+ '-';
								}
							}

							var template1 = "";
							for ( var j = 0; j < availableTags1.length; j++) {
								var arrValue = (availableTags1[j]).split("_");
								var idValue = (arrValue[1]);
								resultData1.push({
									ID : idValue,
									Name : arrValue[0]
								});

								template1 = template1 + '<li data-value="'
										+ (arrValue[1])
										+ '" class=""><a href="#">'
										+ arrValue[0] + '</a></li>';
							}

							$(".typeahead").html(template1);
							$(".typeahead").show();

							setTimeout(
									function() {
										$('#particulars').typeahead({
											source : resultData1,
											displayField : 'Name',
											valueField : 'ID',
											onSelect : displayResult,
											scrollBar : true
										});

										$("#particulars").data('typeahead').source = resultData;
									}, 100);
						}
					});
		}

		else {

			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../../pharmacy/product/autoSuggestionProduct",
				timeout : 1000 * 60 * 15,

				error : function(error) {
					alert('error' + error);
				},
				success : function(result) {
					var availableTags = [];
					var resultData = [];

					for ( var i = 0; i < result.length; i++) {
						availableTags[i] = result[i].productName + '_'
								+ result[i].productId + '-'
								+ result[i].productUnit + '-'
								+ result[i].packingMaster.packType + '-'
								+ result[i].companyMaster.compName + '-'
								+ result[i].shelfMaster.shelfName;
					}

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});

						template = template + '<li data-value="'
								+ (arrValue[1]) + '" class=""><a href="#">'
								+ arrValue[0] + '</a></li>';
					}

					$(".typeahead").html(template);
					$(".typeahead").show();

					setTimeout(function() {
						$('#particulars').typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
					}, 100);
				}
			});
		}

	}

	function displayResult(item) {

		var content = item.value.split("-");

		$('#hiddenProductId').val(content[0]);
		$('#txtUnit').val(content[1]);
		$('#txtPack').val(content[2]);
		$('#txtComp').val(content[3]);
		$('#txtShelf').val(content[4]);

		if(($("#pharmaFetchStockOptionForCreditNote").val())!="FIFOExpiry")
			loadCreditNoteBatchPopUp(content[0]);
	else
		getBatchDetailsByFIFOForCreditNote(content[0]);
	}

	function getBatchDetailsByFIFOForCreditNote(productId) {
		var storeName="store";
		jQuery.ajax({
			async : true,
			type : "GET",
			data : {
				productId : productId,
				validStore:storeName,
			},
			url : "../../pharmacy/purchase/getBatchDetailsInFIFO",

			error : function(error) {
			},
			success : function(result) {       
				var jsObj =$.parseJSON(result);
				    $("#txtMRP").val(jsObj.result[0].mrp);
					$("#txtPurchaseRate").val(jsObj.result[0].purchaseRate);
					$("#txtVat").val(jsObj.result[0].vat);
					$("#txtBatchNo").val(jsObj.result[0].batchCode);
					$("#txtExpiry").val(jsObj.result[0].batchExpDate);
					$("#txtClStk").val(jsObj.result[0].clearStock);
					$("#txtRate").val(jsObj.result[0].saleRate);
					$("#hiddenBatchId").val(jsObj.result[0].batchId);
					$("#hiddenStockId").val(jsObj.result[0].stockId);
					$("#txtTotalStk").val(jsObj.result[0].clearStock);
					calculateCounterAmount();
			}
		});
	}
	
	function loadCreditNoteBatchPopUp(productId) {
		getProductByBatch(productId);
		$("#rowId0").focus();
		setTimeout(function() {
			$("#rowId0").focus();
		}, 500);
		$('#Batch_Pop_Up').modal('show');
		$("#txtQty").focus();
	}
	
	

	function setPopUpValues(number, totalRow) {
		$('#txtMrp').val($('#textBatchMRP' + number).val());
		$('#txtPRate').val($('#textBatchPurRate' + number).val());
		$('#txtBatchNo').val($('#textBatchCode' + number).val());
		$('#txtExpiry').val($('#textBatchExpiry' + number).val());
		$('#txtClStk').val($('#textBatchClearStock' + number).val());
		$("#txtVat").val($('#textBatchVat' + number).val());
		$("#txtRate").val($('#textBatchRate' + number).val());

		$('#hiddenBatchId').val($('#textBatchPopUpBatchId' + number).val());
		$('#hiddenStockId').val($('#textBatchStockId' + number).val());
		$("#hiddenPurchaseId").val($('#textPurchaseSlaveId' + number).val());
		var totalStock = 0;
		for ( var i = 0; i < totalRow; i++) {
			totalStock = totalStock
					+ parseInt($('#textBatchClearStock' + i).val());
		}
		$("#txtTotalStk").val(totalStock);
	}

	function editPro(rCount) {
		var rowCount = parseInt(rCount);

		$('#hiddenProductId' + rowCount).val();
		$('#hiddenProductId').val($('#hiddenProductId' + rowCount).val());
		var proName = $('#textProductName' + rCount).val();
		$('#particulars').val(proName);
		var unit = $('#textUnit' + rCount).val();
		$('#txtUnit').val(unit);
		var Pack = $('#textPack' + rCount).val();
		$('#txtPack').val(Pack);
		var Qty = $('#txtQty' + rCount).val();
		$('#txtComp').val(Qty);
		var Qty = $('#txtQty' + rCount).val();
		$('#txtQty').val(Qty);
		$('#txtScheme').val($('#textSchm' + rCount).val());
		$('#txtRate').val($('#txtRate' + rCount).val());
		$('#txtMrp').val($('#txtMRP' + rCount).val());
		$('#txtBatchNo').val($('#txtBatchNo' + rCount).val());
		$('#txtExpiry').val($('#txtExpiry' + rCount).val());
		$('#txtAmt').val($('#txtAmt' + rCount).val());
		
		$('#hiddenBatchId').val($('#textBatchId' + rCount).val());

		$('#txtClStk').val($('#textClStk' + rCount).val());

		$('#txtTotalStk').val($('#textTotalStk' + rCount).val());

		$('#txtPRate').val($('#textPurchaseRate' + rCount).val());

		$('#txtVat').val($('#textVat' + rCount).val());
		
		$('#txtDis').val($('#textCreditDisc' + rCount).val());
		
		$('#txtDiscAmt').val($('#txtDisAmt' + rCount).val());

		$('#txtRatePerUnit').val($('#textRatePerUnit' + rCount).val()); 
		
		if ($('#txtCode' + rCount).val() == 'Stock') {
			$("#txtCode option[value='Stock']").attr({
				"selected" : "selected"
			});
		} else {
			$("#txtCode option[value='Non Salable']").attr({
				"selected" : "selected"
			});
		}
	}

	function resetValues() {
		$('#CreditNote_PopUp_Form').find('input:text').val('');
		$('#CreditNote_PopUp_Form').find('input:hidden').val('');
		$("#txtCode option[value='Stock']").attr({
			"selected" : "selected"
		});
	}

	function createRow() {
		var ProductId = $("#hiddenProductId").val();
		var Qty = $("#txtQty").val();
		var BatchCode = $("#txtBatchNo").val();
		var Expiry = $("#txtExpiry").val();

		if (ProductId == "0" || ProductId == "undefined" || ProductId == "") {
			alert("Enter Proper Product Name");
			$("#particulars").val('');
			$("#particulars").focus();
			$("#hiddenProductId").val("0");
			return false;
		}
		if (Qty == "0" || Qty == "undefined" || Qty == "") {
			alert("Enter Quantity");
			$("#txtQty").val('');
			$("#txtQty").focus();
			return false;
		}
		if (BatchCode == "0" || BatchCode == "undefined" || BatchCode == "") {
			alert("Enter Batch Code");
			$("#txtBatchNo").val('');
			$("#txtBatchNo").focus();
			return false;
		}
		if (Expiry == "0" || Expiry == "undefined" || Expiry == "") {
			alert("Enter Expiry Date");
			$("#txtExpiry").val('');
			$("#txtExpiry").focus();
			return false;
		} else {
			$("#CreditNote_PopUp_Form").modal('hide');
			if ($('#hiddenProductId').val() != "")
				toCreateCreditNotesDiv('RowCount', $('#hiddenCurrentRow').val());

		}
	}
	/* function validateProduct() {
	

	 if ($('#hiddenProductId').val() != null && $('#hiddenProductId').val() != "")
	 {
	
	 }
	 else
	 {
	 alert("Enter Product from Product List");
	 }
	
	 } */
</script>


<div id="CreditNote_PopUp_Form" class="modal fade in">
	<div class="modal-dialog" style="width: 600px;">
		<form action="">
			<div class="modal-content col-md-9">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-8 center">
						<h4>
							<i class="fa fa-calendar"></i>Product Information
						</h4>
					</div>
				</div>
				<div class="modal-body col-md-12-1">
					<div class="col-md-12-1">

						<div class="col-md-12-1" style="margin-top: 9px;">
							<div class="col-md-12-1" style="margin-top: 9px;">
								<div class="col-md-4-1" style="margin-top: 0px;">
									<div class="form-group" id="divparticulars">
										<label for="product">Product</label> <input type="hidden"
											id="hiddenProductId" value="0" /><input type="text"
											id="particulars" name="txtProductName" autofocus="autofocus"
											class="form-control input-SmallText typeahead"
											placeholder="Product" autocomplete="off"
											onkeypress="return setCreditNoteAutocomplete(this.id)">
									</div>
								</div>
								<div class="col-md-2-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="Unit">Unit</label> <input type="text" id="txtUnit"
											name="txtUnit" readonly="readonly"
											class="form-control input-SmallText" placeholder="Unit"
											required>
									</div>
								</div>
								<div class="col-md-2-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="Pack">Pack</label> <input type="text" id="txtPack"
											name="txtPack" readonly="readonly"
											class="form-control input-SmallText" placeholder="Pack"
											required>
									</div>
								</div>
								<div class="col-md-2-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="Comp">Comp</label><input type="text" id="txtComp"
											name="txtComp" readonly="readonly"
											class="form-control input-SmallText" placeholder="Comp"
											required>
									</div>
								</div>
								<div class="col-md-2-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="AvailQty">Shelf</label><input type="text"
											id="txtShelf" name="txtShelf" readonly
											class="form-control input-SmallText" placeholder="Shelf"
											required>
									</div>
								</div>

							</div>
							<div class="col-md-12-1" style="margin-top: 2px;">
								<div class="col-md-1-1" style="margin-top: 0px;"></div>
								<div class="col-md-11-1" style="margin-top: 0px;">
									<div class="col-md-3-1" style="margin-top: 0px;">
										<div class="form-group">
											<label for="product">Quantity</label> <input type="text"
												id="txtQty" name="txtQty" value='0'
												class="form-control input-SmallText" placeholder="Qty"
												required onblur="isNumber('txtQty',0,10),calculateAmount();">
											<div class='col-md-1-1 center'
												style='margin-top: -42px; margin-left: 47px; color: red;'>
												<b> *</b>
											</div>

										</div>
									</div>
									<div class="col-md-8-1" style="margin-top: 20px; float: right;">
										<div class="col-md-5-1" style="margin-top: 0px;">
											<b>Current Batch Stock</b>
										</div>
										<div class="col-md-4-1" style="margin-top: 0px;">
											<input type="text" id="txtClStk" name="txtClStk"
												class="form-control input-SmallText" readonly
												placeholder="Current Batch Stck" required>
										</div>

									</div>
								</div>
							</div>

							<div class="col-md-12-1" style="margin-top: 2px;">
								<div class="col-md-1-1" style="margin-top: 0px;"></div>
								<div class="col-md-11-1" style="margin-top: 0px;">
									<div class="col-md-3-1" style="margin-top: 0px;">
										<div class="form-group">
											<label for="product">Batch No</label> <input type="hidden"
												id="hiddenBatchId"> <input type="hidden"
												id="hiddenPurchaseId"> <input type="text"
												id="txtBatchNo" name="txtBatchNo" readonly
												class="form-control input-SmallText" placeholder="Batch No"
												required>
											<div class='col-md-1-1 center'
												style='margin-top: -42px; margin-left: 47px; color: red;'>
												<b> *</b>
											</div>
										</div>
									</div>
									<div class="col-md-8-1" style="margin-top: 20px; float: right;">
										<div class="col-md-5-1" style="margin-top: 0px;">
											<b>Total Stock</b>
										</div>
										<div class="col-md-4-1" style="margin-top: 0px;">
											<input type="hidden" id="hiddenStockId"> <input
												type="text" id="txtTotalStk" name="txtTotalStk"
												class="form-control input-SmallText" readonly
												placeholder="Total Stock" required>
										</div>
									</div>
								</div>
							</div>

							<div class="col-md-12-1" style="margin-top: 2px;">
								<div class="col-md-1-1" style="margin-top: 0px;"></div>
								<div class="col-md-11-1" style="margin-top: 0px;">
									<div class="col-md-3-1" style="margin-top: 0px;">
										<div class="form-group">
											<label for="product">Expiry</label> <input type="text"
												id="txtExpiry" name="txtExpiry" readonly
												class="form-control input-SmallText" placeholder="Expiry"
												required>
											<div class='col-md-1-1 center'
												style='margin-top: -42px; margin-left: 35px; color: red;'>
												<b> *</b>
											</div>
										</div>
									</div>

									<div class="col-md-8-1" style="margin-top: 20px; float: right;">
										<div class="col-md-5-1" style="margin-top: 0px;">
											<b>Pur Rate</b>
										</div>
										<div class="col-md-4-1" style="margin-top: 0px;">
											<input type="text" id="txtPRate" readonly name="txtPRate"
												class="form-control input-SmallText" placeholder="Pur Rate"
												required>
										</div>

									</div>
								</div>
							</div>

							<div class="col-md-12-1" style="margin-top: 2px;">
								<div class="col-md-1-1" style="margin-top: 0px;"></div>
								<div class="col-md-11-1" style="margin-top: 0px;">
									<div class="col-md-3-1" style="margin-top: 0px;">
										<div class="form-group">
											<label for="product">Rate</label> <input type="text"
												id="txtRate" name="txtRate" value='0'
												class="form-control input-SmallText" placeholder="Rate"
												required readonly onchange="calculateAmount();">
										</div>
									</div>
									<div class="col-md-8-1" style="margin-top: 20px; float: right;">
										<div class="col-md-5-1" style="margin-top: 0px;">
											<b>MRP</b>
										</div>
										<div class="col-md-4-1" style="margin-top: 0px;">
											<input type="text" id="txtMrp" readonly name="txtMrp"
												class="form-control input-SmallText" placeholder="MRP"
												required>
										</div>
									</div>
								</div>
							</div>
                             <div class="col-md-12-1" style="margin-top: 2px;">
							<div class="col-md-1-1" style="margin-top: 0px;"></div>
							<div class="col-md-11-1" style="margin-top: 0px;">
								<div class="col-md-3-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product">Discount%</label> <input type="text"
											id="txtDis" name="txtDis" 
											class="form-control input-SmallText" placeholder="Discount"
											maxlength="25" required onblur="calculateDisc();">
									</div>
								</div>

								<div class="col-md-8-1" style="margin-top: 20px; float: right;">
									<div class="col-md-5-1" style="margin-top: -1px;">
										<b>Discount Amount</b>
									</div>
									<div class="col-md-4-1" style="margin-top: -1px;">
										<input type="text" id="txtDiscAmt" name="txtDiscAmt" 
											class="form-control input-SmallText" placeholder="Discount Amount"
											maxlength="25" required onblur="calculateDisc();">
									</div>
								</div>
							</div>
						</div> 
							<div class="col-md-12-1" style="margin-top: 2px;">
								<div class="col-md-1-1" style="margin-top: 0px;"></div>
								<div class="col-md-11-1" style="margin-top: 0px;">
									<div class="col-md-3-1" style="margin-top: 0px;">
										<div class="form-group">
											<label for="product">Amt</label> <input type="text"
												id="txtAmt" name="txtAmt" readonly
												class="form-control input-SmallText" placeholder="Amt"
												required>
										</div>
									</div>

									<div class="col-md-8-1" style="margin-top: 20px; float: right;">
										<div class="col-md-5-1" style="margin-top: 0px;">
											<b>VAT%</b>
										</div>
										<div class="col-md-4-1" style="margin-top: 0px;">
											<input type="text" id="txtVat" readonly name="txtVat"
												class="form-control input-SmallText" placeholder="VAT"
												required>
										</div>
									</div>
								</div>
							</div>

							<div class="col-md-12-1" style="margin-top: 2px;">
								<div class="col-md-1-1" style="margin-top: 0px;"></div>
								<div class="col-md-11-1" style="margin-top: 0px;">
									<div class="col-md-3-1" style="margin-top: 0px;">
										<div class="form-group">
											<label for="product">Code</label> <select name="Day"
												id="txtCode" name="txtCode">
												<option value="Stock">Stock</option>
												<!-- <option value="Non Salable">Non Salable</option> -->
											</select>
										</div>
									</div>

									<div style="float: right;" class="form-group">

										<label for="product"><span id="js-rotating"
											class="morphext"><span class="animated flash">Rate
													Per Unit</span></span></label> <input type="text" placeholder="Rate Per Unit"
											class="form-control input-SmallText" readonly=""
											name="txtCompany" id="txtRatePerUnit"
											style="background: yellow none repeat scroll 0% 0%;">
									</div>
								</div>
							</div>
						</div>

					</div>
					<!-- /BOX-->
				</div>
				<!-- /BODY-->
				<div class="modal-footer">
					<div class="form-group col-md-7-1"
						style="margin-top: 1px; margin-left: -64px">
						<button type="button" class="btn btn-primary"
							id="btnSubContractingMaterialIssueSave"
							name="btnSubContractingMaterialIssueSave" onclick="createRow();">Ok</button>
						<!-- <button type="button" class="btn btn-default" data-dismiss="modal">Redo</button> -->
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
<%@include file="BatchPopUp.jsp"%>