<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script type="text/javascript">
	function load(currentVal, id) {

		//$("#particulars").focus();
		
		
	    if ($("#radioMRP").is(":checked")) {
			$('#mydiv label').text('Rate Per Unit.');
		} else {
			$('#mydiv label').text('PurRate Per Unit.');
		}

		setTimeout(function() {
			$("#particulars").focus();
		}, 500);

		if ($('#hiddenProductId' + currentVal).val() != "") {
			resetValues();
			editPro(currentVal);
		}
		if ($('#hiddenProductId' + currentVal).val() == "") {
			resetValues();
		}
		$('#hiddenCurrentRow').val(currentVal);
		//$('#Indent_Sales_Form').modal('show');
		setValuesToAutocomplete('event');
	}

	function setValuesToAutocomplete(key) {
		
		//$("#hiddenProductId").val("0");
		var rowcount =$('#hiddenCurrentRow').val();
		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				$('#txtQty').focus();
				return false;
			}
		}
		//var findingName = $("#particulars").val(); 
		var findingName = $("#textProductName" + rowcount).val();
		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/product/autoSuggestionProduct",
					timeout : 1000 * 60 * 15,

					error : function(error) {
						/* alert('error' + error); */
					},
					success : function(r) {
						var availableTags = [];
						var resultData = [];

						if (r.length > 0) {
							for ( var i = 0; i < r.length; i++) {
								availableTags[i] = r[i].productName + '_'
										+ r[i].productId + '-'
										+ r[i].productUnit + '-'
										+ r[i].packingMaster.packType + '-'
										+ r[i].companyMaster.compName + "-"
										+ r[i].shelfMaster.shelfName + "-"
										+ r[i].categoryMaster.catId + "-"
										+ r[i].preparationMaster.preparationName;
							}
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
						$(".typeahead1").html(template);
						$(".typeahead1").show();

						setTimeout(
								function() {
									$('#textProductName'  + rowcount).typeahead({
										source : resultData,
										displayField : 'Name',
										valueField : 'ID',
										onSelect : displayResult,
										scrollBar : true

									});
									$("#textProductName"  + rowcount).data('typeahead').source = resultData;
								}, 500);
					}
				});
	}

	function loadHospitalSaleBatchPopUp(productId) {

		//getProductByBatch(productId);
		getProductByBatch2(productId);

		$("#rowId0").focus();
		setTimeout(function() {
			$("#rowId0").focus();
		}, 500);
		/* $('#hospitalSaleBatchPopUp').modal('show'); */
	}

	function setPopUpValues(number, totalRow) {
		$('#txtMRP').val($('#textBatchMRP' + number).val());

		$('#txtPurchaseRate').val($('#textBatchPurchaseRate' + number).val());
		$('#txtVat').val($('#textBatchVat' + number).val());

		$('#txtBatchNo').val($('#textBatchCode' + number).val());
		$('#txtExpiry').val($('#textBatchExpiry' + number).val());
		$('#txtClStk').val($('#textBatchClearStock' + number).val());

		$('#txtRate').val($('#textSaleRate' + number).val());

		$('#hiddenBatchId').val($('#textBatchPopUpBatchId' + number).val());
		$('#hiddenStockId').val($('#textBatchStockId' + number).val());

		var totalStock = 0;
		for ( var i = 0; i < totalRow; i++) {
			totalStock = totalStock
					+ parseInt($('#textBatchClearStock' + i).val());
		}
		$("#txtTotalStk").val(totalStock);
		
		myfunction();
	}


	function displayResult(item) {
		var content = item.value.split("-");
		$('#hiddenProductId').val(content[0]);
		$('#txtUnit').val(content[1]);
		$('#txtPack').val(content[2]);
		$('#txtComp').val(content[3]);
		$('#txtShelf').val(content[4]);
		$('#hiddenProductCategoryId').val(content[5]);
		$('#txtPre').val(content[6]);
		/* 	loadHospitalSaleBatchPopUp(content[0]); */

		/* if ($("#hiddenSponserFlag").val() == 'ACTIVE') {
			for ( var i = 0; i < indentSaleparseData.result.length; i++) {
				var catId = $('#hiddenProductCategoryId').val();

				if (catId == indentSaleparseData.result[i].pharma_category_id) {
					discount = indentSaleparseData.result[i].discount_in_percent;
					break;
				}
			}

			$('#txtDis').val(discount);

		} */
		
		$('#txtDis').val(spDisc);

		if (($("#pharmaFetchStockOptionForIndentSale").val()) != "FIFOExpiry") {
			loadHospitalSaleBatchPopUp(content[0]);
		} else {
			getBatchDetailsByFIFOForIndentSale(content[0]);
		}
	}

	function getBatchDetailsByFIFOForIndentSale(productId) {
		var storeName = "store";
		jQuery.ajax({
			async : true,
			type : "GET",
			data : {
				productId : productId,
				validStore : storeName,
			},
			url : "../../pharmacy/purchase/getBatchDetailsInFIFO",

			error : function(error) {
			},
			success : function(result) {
				var jsObj = $.parseJSON(result);
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

	function editPro(rCount) {

		var rowCount = parseInt(rCount);
		$('#hiddenProductId').val($('#hiddenProductId' + rowCount).val());
		var proName = $('#textProductName' + rCount).val();
		$('#particulars').val(proName);
		var unit = $('#textUnit' + rCount).val();
		$('#txtUnit').val(unit);
		var Pack = $('#textPack' + rCount).val();
		$('#txtPack').val(Pack);
		var Comp = $('#textComp' + rCount).val();
		$('#txtComp').val(Comp);

		var shelf = $('#textShelf' + rCount).val();
		$('#txtShelf').val(shelf);

		var Qty = $('#textQty' + rCount).val();
		$('#txtQty').val(Qty);

		$('#hiddenBatchId').val($('#textBatchId' + rowCount).val());

		$('#txtScheme').val($('#textSchm' + rCount).val());

		$('#txtMRP').val($('#textMrp' + rCount).val());
		$('#txtBatchNo').val($('#textBatchNo' + rCount).val());
		$('#txtExpiry').val($('#textExpiry' + rCount).val());

		$('#txtRate').val($('#textLastPurRate' + rCount).val());

		$('#txtVat').val($('#textVat' + rCount).val());

		$('#txtAmount').val($('#textAmount' + rCount).val());

		$('#txtClStk').val($('#textClStk' + rowCount).val());

		$('#txtTotalStk').val($('#textTotalStk' + rowCount).val());

		$('#txtPurchaseRate').val($('#textPurchaseRate' + rowCount).val());
		$('#txtRatePerUnit').val($('#textRatePerUnit' + rowCount).val());
		$('#hiddenBatchId').val($('#textBatchId' + rCount).val());
		$('#txtDis').val($('#textDis' + rowCount).val());
		$('#txtDiscAmt').val($('#textDisAmt' + rowCount).val());
		$('#hiddenRatePerUnit').val($('#hiddenRatePerUnit' + rowCount).val());

		$('#hiddenStockId').val($('#textStockId' + rowCount).val());

		$('#hiddenProductCategoryId').val(
				$('#hiddenCategoryId' + rowCount).val());
		

	}

	function resetValues() {
		$('#Hospital_Sales_Form').find('input:text').val('');
		$('#Hospital_Sales_Form').find('input:hidden').val('');

	}

	function myfunction() {
		var ProductId = $("#hiddenProductId").val();
		var Qty = $("#txtQty").val();
		var BatchCode = $("#txtBatchNo").val();
		var Expiry = $("#txtExpiry").val();
		var Rate = $("#txtRate").val();
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
		}
		if (parseFloat($('#txtQty').val()) > parseFloat($('#txtClStk').val())) {
			alert("Total Qty should be not more than current Batch Stock");
			$("#txtQty").focus();
			return false;
		}
		if (Rate == "0" || Rate == "undefined" || Rate == "") {
			alert("Enter Rate");
			$("#txtRate").val('');
			$("#txtRate").focus();
			return false;
		} else {
			calculateIndentAmount('qty');
			calculateCounterDisc();
			fillRows($('#hiddenCurrentRow').val());

		}

	}
</script>


<!-- <div id="Indent_Sales_Form" class="modal fade in">
	<div class="modal-dialog" style="width: 600px;">
		<form action="">
			<div class="modal-content col-md-9">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-8 center">
						<h4>
							<i class="fa fa-calendar"></i>Indent Product Information
						</h4>
					</div>
				</div>
				<div class="modal-body col-md-12-1">
					<div class="col-md-12-1">

						<div class="col-md-12-1" style="margin-top: 9px;">
							<div class="col-md-12-1" style="margin-top: 9px;">
								<div class="col-md-4-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product">Product</label> <input type="hidden"
											id="hiddenProductId" value='0'/>
											<input type="hidden"
											id="hiddenRatePerUnit" />
												<input type="hidden"
											id="hiddenProductCategoryId" value="0" /> 
											 <input type="text" id="particulars"
											name="txtProductName" class="form-control input-SmallText"
											placeholder="Product" tabindex="1" autofocus="autofocus"
											maxlength="25" autocomplete="off"
											onkeypress="return setValuesToAutocomplete(event)" required>
									</div>
								</div>
								<div class="col-md-2-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="Unit">Unit</label> <input type="text" id="txtUnit"
											name="txtUnit" readonly="readonly"
											class="form-control input-SmallText" placeholder="Unit"
											maxlength="25" required>
									</div>
								</div>
								<div class="col-md-2-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="Pack">Pack</label> <input type="text" id="txtPack"
											name="txtPack" readonly="readonly"
											class="form-control input-SmallText" placeholder="Pack"
											maxlength="25" required>
									</div>
								</div>
								<div class="col-md-2-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="Comp">Comp</label><input type="text" id="txtComp"
											name="txtComp" readonly="readonly"
											class="form-control input-SmallText" placeholder="Comp"
											maxlength="25" required>
									</div>
								</div>
								<div class="col-md-2-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="AvailQty">Shelf</label><input type="text"
											id="txtShelf" name="txtShelf" readonly="readonly"
											class="form-control input-SmallText" placeholder="Shelf"
											maxlength="25" required>
									</div>
								</div>

							</div>
							<div class="col-md-12-1" style="margin-top: 2px;">
								<div class="col-md-1-1" style="margin-top: 0px;"></div>
								<div class="col-md-11-1" style="margin-top: 0px;">
									<div class="col-md-3-1" style="margin-top: 0px;">
										<div class="form-group">
											<label for="product">Qty</label> <input type="text"
												id="txtQty" name="txtQty"
												class="form-control input-SmallText" placeholder="Qty"
												maxlength="25" required onblur="isNumber('txtQty'),setFocusToRate(),calculateIndentAmount('qty'),calculateCounterDisc(),validationsOfQty();">
												<div class='col-md-1-1 center'
											style='margin-top: -42px; margin-left: 19px; color: red;'>
											<b> *</b>
										</div>
												

										</div>
									</div>
									<div class="col-md-8-1" style="margin-top: 20px; float: right;">
										<div class="col-md-5-1" style="margin-top: 0px;">
											<b>Current Batch Stck</b>
										</div>
										<div class="col-md-4-1" style="margin-top: 0px;">
											<input type="hidden" id="hiddenStockId"> <input
												type="text" id="txtClStk" name="txtClStk"
												class="form-control input-SmallText"
												placeholder="Current Batch Stck" maxlength="25" required
												readonly>
												
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
												id="hiddenBatchId"> <input type="text"
												id="txtBatchNo" name="txtBatchNo"
												class="form-control input-SmallText" placeholder="Batch No"
												maxlength="25" required readonly>
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
											<input type="text" id="txtTotalStk" name="txtTotalStk"
												class="form-control input-SmallText"
												placeholder="Total Stock" maxlength="25" required readonly>
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
												id="txtExpiry" name="txtExpiry"
												class="form-control input-SmallText" placeholder="Expiry"
												maxlength="25" required readonly>
												<div class='col-md-1-1 center'
											style='margin-top: -42px; margin-left: 33px; color: red;'>
											<b> *</b>
										</div>
										</div>
									</div>

									<div class="col-md-8-1" style="margin-top: 20px; float: right;">
										<div class="col-md-5-1" style="margin-top: 0px;">
											<b>Pur Rate</b>
										</div>
										<div class="col-md-4-1" style="margin-top: 0px;">
											<input type="text" id="txtPurchaseRate"
												name="txtPurchaseRate" class="form-control input-SmallText"
												placeholder="Pur Rate" maxlength="25" required readonly>
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
												id="txtRate" name="txtRate"
												class="form-control input-SmallText" placeholder="Rate"
												maxlength="25" onblur="isFloatingPoint('txtRate'),calculateIndentAmount('qty');">
												
												<div class='col-md-1-1 center'
											style='margin-top: -42px; margin-left: 25px; color: red;'>
											<b> *</b>
										</div>
										</div>
									</div>

									<div class="col-md-8-1" style="margin-top: 20px; float: right;">
										<div class="col-md-5-1" style="margin-top: 0px;">
											<b>MRP</b>
										</div>
										<div class="col-md-4-1" style="margin-top: 0px;">
											<input type="text" id="txtMRP" name="txtMRP"
												class="form-control input-SmallText" placeholder="MRP"
												maxlength="25" required readonly>
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
											maxlength="25" required onblur="calculateCounterDisc();">
									</div>
								</div>

								<div class="col-md-8-1" style="margin-top: 20px; float: right;">
									<div class="col-md-5-1" style="margin-top: -1px;">
										<b>Discount Amt</b>
									</div>
									<div class="col-md-4-1" style="margin-top: -1px;">
										<input type="text" id="txtDiscAmt" name="txtDiscAmt" 
											class="form-control input-SmallText" placeholder="Discount Amount"
											maxlength="25" required onblur="calculateCounterDisc();">
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
												id="txtAmount" name="txtAmount"
												class="form-control input-SmallText" placeholder="Amt"
												maxlength="25" required readonly>
										</div>
									</div>

									<div class="col-md-8-1" style="margin-top: 20px; float: right;">
										<div class="col-md-5-1" style="margin-top: 0px;">
											<b>GST%</b>
										</div>
										<div class="col-md-4-1" style="margin-top: 0px;">
											<input type="text" id="txtVat" name="txtVat"
												class="form-control input-SmallText" placeholder="GST"
												maxlength="25" readonly>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-12-1" style="margin-top: 2px;">
							 I am a So <span id="js-rotating">Simple, Very Doge, Much
								Wow, Such Cool</span> Text Rotator
							<div class="form-group" style="float:right;"  id="mydiv">

								<label for="product" ><span id="js-rotating"></span></label> <input type="text"
									id="txtRatePerUnit" name="txtRatePerUnit" readonly
									class="form-control input-SmallText"
									placeholder="Rate Per Unit">
							</div>
						</div>
						</div>
					</div>
					/BOX
				</div>
				/BODY
				<div class="modal-footer">

					<div class="form-group col-md-7-1"
						style="margin-top: 1px; margin-left: -64px">
						<button type="button" class="btn btn-primary"
							id="btnSubContractingMaterialIssueSave"
							name="btnSubContractingMaterialIssueSave" onclick="myfunction()"
							>Ok</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Redo</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div> -->

<input type="hidden" id="hiddenProductId" value="0">
<input type="hidden" id="txtUnit" value="0">
<input type="hidden" id="txtPack" value="0">
<input type="hidden" id="txtComp" value="0">
<input type="hidden" id="txtShelf" value="0">

<input type="hidden" id="txtMRP" value="0">
<input type="hidden" id="txtQty" value="1">
<input type="hidden" id="txtRate" value="0">
<input type="hidden" id="txtAmount" value="0">

<input type="hidden" id="txtBatchNo" value="0">
<input type="hidden" id="txtExpiry" value="0">

<input type="hidden" id="hiddenBatchId" value="0">
<input type="hidden" id="hiddenStockId" value="0">


<input type="hidden" id="txtClStk" value="0">
<input type="hidden" id="txtVat" value="0">
<input type="hidden" id="txtVatid" value="0">

<input type="hidden" id="txtClStk" value="0">
<input type="hidden" id="txtTotalStk" value="0">
<input type="hidden" id="txtPurchaseRate" value="0">
<input type="hidden" id="txtScheme" value="0">

<input type="hidden" id="txtRatePerUnit" value="0">
<input type="hidden" id="txtDis" value="0">
<input type="hidden" id="txtDiscAmt" value="0">
<input type="hidden" id="hiddenRatePerUnit" value="0">

<input type="hidden" id="txtPerRatePerUnitFlag" value="0">
<input type="hidden" id="txtRateForPrint" value="0">
<input type="hidden" id="textBatchId" value="0">
<input type="hidden" id="txtPre" value="0">
<input type="hidden" id="hiddenProductCategoryId" value="0">

<%@include file="pharma_hospital_sales_batch_pop_up.jsp"%>