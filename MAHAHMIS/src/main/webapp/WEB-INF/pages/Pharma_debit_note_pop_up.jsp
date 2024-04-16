<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script type="text/javascript">
	function load(currentVal, id) {

		$("#particulars").focus();
		setTimeout(function() {
			$("#particulars").focus();
		}, 550);

		if ($('#hiddenProductId' + currentVal).val() != "") {
			editProduct(currentVal);
		}
		if ($('#hiddenProductId' + currentVal).val() == "") {
			resetDebitPopUpValues();
		}
		$('#hiddenCurrentRow').val(currentVal);
		$('#debit_note_pop_up').modal('show');
	}

	function setFocusToProductName() {
		$(".txtProductName").focus();
	}

	function setFocusToQty() {
		$("#txtQty").focus();
	}

	/* function setFocusToRate() {
		 $("#txtRate").focus(); 
		$('#txtAmt').val('');
		calculatePopUpAmt(); } */

	function debitAutocomplete(key) {

		$("#hiddenProductId").val("0");

		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				//$('#txtQty').focus();
				return false;
			}
		}

		var findingName = $("#particulars").val();

		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/product/autoSuggestionProduct",
			timeout : 1000 * 60 * 15,
			cache : false,
			error : function() {
				/* alert('error'); */
			},
			success : function(r) {
				var availableTags = [];
				var resultData = [];
				for ( var i = 0; i < r.length; i++) {
					if (r.length > 0) {
						availableTags[i] = r[i].productName + '_'
								+ r[i].productId + '-' + r[i].productUnit + '-'
								+ r[i].packingMaster.packType + '-'
								+ r[i].companyMaster.compName + "-"
								+ r[i].shelfMaster.shelfName + "-";
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

					template = template + '<li data-value="' + (arrValue[1])
							+ '" class=""><a href="#">' + arrValue[0]
							+ '</a></li>';

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
					$("#particulars").data('typeahead').source = resultData;
				}, 500);
			}
		});
	}

	function loadBatchPopUp(productId) {
		getProductByBatch(productId);

		$("#rowId0").focus();
		setTimeout(function() {
			$("#rowId0").focus();
		}, 500);
		$('#Batch_Pop_Up').modal('show');
	}

	function displayResult(item) {
		var content = item.value.split("-");
		$('#hiddenProductId').val(content[0]);
		$('#txtUnit').val(content[1]);
		$('#txtPack').val(content[2]);
		$('#txtComp').val(content[3]);
		$('#txtShelf').val(content[4]);
		loadBatchPopUp(content[0]);
	}

	function setPopUpValues(number, totalRow) {

		$('#txtMrp').val($('#textBatchMRP' + number).val());
		$('#txtPRate').val($('#textBatchPurRate' + number).val());
		$('#txtRate').val($('#textBatchRate' + number).val());
		$('#txtBatchNo').val($('#textBatchCode' + number).val());
		$('#txtExpiry').val($('#textBatchExpiry' + number).val());
		$('#txtClStk').val($('#textBatchClearStock' + number).val());
		$('#hiddenBatchId').val($('#textBatchPopUpBatchId' + number).val());
		$('#hiddenStockId').val($('#textBatchStockId' + number).val());
		$("#hiddenPurchaseId").val($('#textPurchaseSlaveId' + number).val());
		$('#txtVat').val($('#textBatchVat' + number).val());
		
		$('#txtSchemeStk').val($('#textSchemeStock' + number).val());

		var totalStock = 0;
		for ( var i = 0; i < totalRow; i++) {
			totalStock = totalStock
					+ parseInt($('#textBatchClearStock' + i).val());
		}
		$("#txtTotalStk").val(totalStock);
		$('#txtAmt').val('');
		setFocusToQty();

	}

	function editProduct(rCount) {
		$('#hiddenProductId').val($('#hiddenProductId' + rCount).val());
		var proName = $('#textProductName' + rCount).val();
		$('#particulars').val(proName);
		var unit = $('#textUnit' + rCount).val();
		$('#txtUnit').val(unit);
		var Pack = $('#textPack' + rCount).val();
		$('#txtPack').val(Pack);
		var Comp = $('#textComp' + rCount).val();
		$('#txtComp').val(Comp);
		$('#txtQty').val($('#textQty' + rCount).val());
		$('#txtMrp').val($('#textMRP' + rCount).val());
		$('#txtPRate').val($('#textPurRate' + rCount).val());
		$('#txtBatchNo').val($('#textBatchNo' + rCount).val());
		$('#txtExpiry').val($('#textExpiry' + rCount).val());
		$('#txtVat').val($('#textVat' + rCount).val());
		$('#txtAmt').val($('#textAmt' + rCount).val());
		$('#txtDisc').val($('#textDisc' + rCount).val());

		/* $('#txtShelf').val($('#textShelf' + rCount).val()); */
		$('#txtClStk').val($('#textClStk' + rCount).val());
		$('#txtScheme').val($('#textScm' + rCount).val());
		$('#txtRate').val($('#textRate' + rCount).val());
		$('#txtTotalStk').val($('#textTotalStk' + rCount).val());
		$('#hiddenBatchId').val($('#textBatchId' + rCount).val());
		
		var code = $('#textCode' + rCount).val();

		if (code == 'Expiry') {
			$("#txtCode option[value='Expiry']").attr({
				"selected" : "selected"
			});
		} else if (code == 'Breakage') {
			$("#txtCode option[value='Breakage']").attr({
				"selected" : "selected"
			});
		} else if (code == 'Goods Returns') {
			$("#txtCode option[value='Goods Returns']").attr({
				"selected" : "selected"
			});
		} else {
			$("#txtCode option[value='Unknown']").attr({
				"selected" : "selected"
			});
		}
	}
	function resetDebitPopUpValues() {
		$('#debit_note_pop_up').find('input:text').val('');
		$('#debit_note_pop_up').find('input:hidden').val('');
		$("#txtCode option[value='Expiry']").attr({
			"selected" : "selected"
		});
	}
	function myfunction() {
		var ProductId = $("#hiddenProductId").val();
		var Qty = $("#txtQty").val();
		var BatchCode= $("#txtBatchNo").val();
		var Expiry = $("#txtExpiry").val();
		var Scheme = $("#txtScheme").val();
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
		/* if (Scheme == "") {
			$("#txtScheme").val('0');
		} */
		
		if (parseFloat($('#txtQty').val()) > parseFloat($('#txtClStk').val())) {
			alert("Total Qty should be not more than current Batch Stock");
			$("#txtQty").focus();
			return false;
		}
				else {

					 $("#debit_note_pop_up").modal('hide');
					if ($('#hiddenProductId').val() != "")
						toCreateDebitNotesDiv('RowCount', $('#hiddenCurrentRow').val());
				}
			
		} 
	
	/* function validateProduct() {
	 if ($('#hiddenProductId').val() != null && $('#hiddenProductId').val() != "")
	 {
	
	 }
	 else
	 {
	 alert("Enter Product from Product List");
	 $("#particulars").val('');
	 $("#particulars").focus();
	
	 }
	
	 } */
</script>

<div id="debit_note_pop_up" class="modal fade in selector">
	<div class="modal-dialog" style="width: 600px;">

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
								<div class="form-group">
									<label for="product">Product</label><input type="hidden"
										id="hiddenProductId" value="0" /> <input type="text"
										id="particulars" name="txtProductName" autofocus="autofocus"
										class="form-control input-SmallText typeahead" placeholder="Product"
									autocomplete="off"
										onkeypress="return debitAutocomplete(this.id);">
								</div>
							</div>
							<div class="col-md-2-1" style="margin-top: 0px;">
								<div class="form-group">
									<label for="Unit">Unit</label> <input type="text" id="txtUnit"
										name="txtUnit" readonly="readonly" tabindex="-1"
										class="form-control input-SmallText" placeholder="Unit"
									 required>
								</div>
							</div>
							<div class="col-md-2-1" style="margin-top: 0px;">
								<div class="form-group">
									<label for="Pack">Pack</label> <input type="text" id="txtPack"
										name="txtPack" readonly="readonly" tabindex="-1"
										class="form-control input-SmallText" placeholder="Pack"
										 required>
								</div>
							</div>
							<div class="col-md-2-1" style="margin-top: 0px;">
								<div class="form-group">
									<label for="Comp">Company</label><input type="text"
										id="txtComp" name="txtComp" readonly="readonly" tabindex="-1"
										class="form-control input-SmallText" placeholder="Comp"
										 required>
								</div>
							</div>
							<div class="col-md-2-1" style="margin-top: 0px;">
								<div class="form-group">
									<label for="AvailQty">Shelf</label><input type="text"
										id="txtShelf" name="txtShelf" readonly="readonly"
										tabindex="-1" class="form-control input-SmallText"
										placeholder="Shelf"  required>
								</div>
							</div>

						</div>
						<div class="col-md-12-1" style="margin-top: 2px;">
							<div class="col-md-1-1" style="margin-top: 0px;"></div>
							<div class="col-md-11-1" style="margin-top: 0px;">
								<div class="col-md-3-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product">Quantity</label> <input type="text"
											id="txtQty" name="txtQty" value="0"
											class="form-control input-SmallText" placeholder="Qty"
											required
											onblur="isNumber('txtQty',0,10),calculatePopUpAmt(),validationsOfQtyDebit();">
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
										<input type="hidden" id="hiddenStockId"> <input
											type="text" readonly id="txtClStk" name="txtClStk"
											class="form-control input-SmallText" tabindex="-1"
											placeholder="Current Batch Stck"  required>
									</div>
									
									<div class="col-md-4-1" style="margin-top: 0px;">
										<input type="hidden" id="hiddenSchemeStockId"> <input
											type="hidden" type="text" readonly id="txtSchemeStk" name="txtSchemeStk"
											class="form-control input-SmallText" tabindex="-1"
											placeholder="Scheme Stck"  required>
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
											id="txtDisc" name="txtDisc"
											class="form-control input-SmallText" placeholder="Disc" onchange="validateDis2();"
											 required onblur="isNumber('txtDisc'),calculatePopUpAmt();">

									</div>
								</div>
								<div class="col-md-8-1" style="margin-top: 20px; float: right;">
									<div class="col-md-5-1" style="margin-top: 0px;">
										<b>Scheme</b>
									</div>
									<div class="col-md-4-1" style="margin-top: 0px;">
										<input type="text" id="txtScheme" name="txtScheme"
											class="form-control input-SmallText" placeholder="Scheme"
											 required  onblur="isNumber('txtScheme')">
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
											id="hiddenBatchId"><input type="hidden"
											id="hiddenPurchaseId"> <input type="text"
											id="txtBatchNo" name="txtBatchNo" tabindex="-1"
											class="form-control input-SmallText" readonly
											placeholder="Batch No"  required>
											<div class='col-md-1-1 center'
											style='margin-top: -42px; margin-left: 49px; color: red;'>
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
											type="text" readonly id="txtTotalStk" name="txtTotalStk"
											class="form-control input-SmallText" tabindex="-1"
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
										<label for="product">Expiry Date</label> <input type="text"
											id="txtExpiry" name="txtExpiry" tabindex="-1"
											class="form-control input-SmallText" readonly
											placeholder="Expiry"  required>
											<div class='col-md-1-1 center'
											style='margin-top: -42px; margin-left: 61px; color: red;'>
											<b> *</b>
										</div>
									</div>
								</div>

								<div class="col-md-8-1" style="margin-top: 20px; float: right;">
									<div class="col-md-5-1" style="margin-top: 0px;">
										<b>Purchase Rate</b>
									</div>
									<div class="col-md-4-1" style="margin-top: 0px;">
										<input type="text" id="txtPRate" name="txtPRate" tabindex="-1"
											class="form-control input-SmallText" readonly
											placeholder="Pur Rate"  required>
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
											id="txtRate" name="txtrate" readonly tabindex="-1"
											class="form-control input-SmallText" placeholder="Rate"
											required onblur="calculatePopUpAmt()">
									</div>
								</div>

								<div class="col-md-8-1" style="margin-top: 20px; float: right;">
									<div class="col-md-5-1" style="margin-top: 0px;">
										<b>MRP</b>
									</div>
									<div class="col-md-4-1" style="margin-top: 0px;">
										<input type="text" id="txtMrp" name="txtMrp" readonly
											tabindex="-1" class="form-control input-SmallText"
											placeholder="MRP"  required>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-12-1" style="margin-top: 2px;">
							<div class="col-md-1-1" style="margin-top: 0px;"></div>
							<div class="col-md-11-1" style="margin-top: 0px;">
								<div class="col-md-3-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product"> Amount</label> <input type="text"
											id="txtAmt" name="txtAmt" tabindex="-1"
											class="form-control input-SmallText" readonly
											placeholder="Amt"  required>
									</div>
								</div>

								<div class="col-md-8-1" style="margin-top: 20px; float: right;">
									<div class="col-md-5-1" style="margin-top: 0px;">
										<b>VAT%</b>
									</div>
									<div class="col-md-4-1" style="margin-top: 0px;">
										<input type="text" id="txtVat" name="txtVat" readonly
											class="form-control input-SmallText" placeholder="VAT"
											tabindex="-1"  required>
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
											id="txtCode" name="txtCode" onchange="calculatePopUpAmt();">
											<option value="Expiry">Expiry</option>
											<option value="Breakage">Breakage</option>
											<option value="Goods Returns">Goods Returns</option>
											<option value="Unknown">Unknown</option>
										</select>

									</div>
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
						name="btnSubContractingMaterialIssueSave" onclick="myfunction();">Ok</button>
					<!-- <button type="button" class="btn btn-default" data-dismiss="modal">Redo</button> -->
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
				</div>
			</div>
		</div>

	</div>
</div>

<%@include file="BatchPopUp.jsp"%>

