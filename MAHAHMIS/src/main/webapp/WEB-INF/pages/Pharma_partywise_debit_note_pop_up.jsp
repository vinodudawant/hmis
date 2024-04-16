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
		$('#partywise_debit_note_pop_up').modal('show');
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
		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				$('#txtQty').focus();
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
				alert('error');
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
				$(".typeahead1").html(template);
				$(".typeahead1").show();

				setTimeout(function() {
					$('#particulars').typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true

					});
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

		var totalStock = 0;
		for ( var i = 0; i < totalRow; i++) {
			totalStock = totalStock
					+ parseInt($('#textBatchClearStock' + i).val());
		}
		$("#txtTotalStk").val(totalStock);
		$('#txtAmt').val('');
		setFocusToQty();

	}

	function editProduct(rCount) 
	{  
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
		$('#txtAmt').val($('#textAmt' + rCount).val());
		
		/* $('#txtShelf').val($('#textShelf' + rCount).val()); */
		$('#txtClStk').val($('#textClStk' + rCount).val());
		$('#txtScheme').val($('#textScm' + rCount).val());
		$('#txtRate').val($('#textRate' + rCount).val());
		$('#txtTotalStk').val($('#textTotalStk' + rCount).val());
		
		
	}
	function resetDebitPopUpValues()
     {
		$('#partywise_debit_note_pop_up').find('input:text').val('');
		$('#partywise_debit_note_pop_up').find('input:hidden').val('');
	
	}
	function myfunction() {
		if ($('#hiddenProductId').val() != "")
			toCreateDebitNotesDiv('RowCount', $('#hiddenCurrentRow').val());
	}
</script>

<div id="partywise_debit_note_pop_up" class="modal fade in">
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
										id="hiddenProductId" /> <input type="text" id="particulars"
										name="txtProductName" autofocus="autofocus"
										class="form-control input-SmallText" tabindex="-1"
										placeholder="Product" maxlength="25" autocomplete="off"
										onkeypress="return debitAutocomplete(event)" required>
								</div>
							</div>
							<div class="col-md-2-1" style="margin-top: 0px;">
								<div class="form-group">
									<label for="Unit">Unit</label> <input type="text" id="txtUnit"
										name="txtUnit" readonly="readonly" tabindex="-1"
										class="form-control input-SmallText" placeholder="Unit"
										maxlength="25" required>
								</div>
							</div>
							<div class="col-md-2-1" style="margin-top: 0px;">
								<div class="form-group">
									<label for="Pack">Pack</label> <input type="text" id="txtPack"
										name="txtPack" readonly="readonly" tabindex="-1"
										class="form-control input-SmallText" placeholder="Pack"
										maxlength="25" required>
								</div>
							</div>
							<div class="col-md-2-1" style="margin-top: 0px;">
								<div class="form-group">
									<label for="Comp">Comp</label><input type="text" id="txtComp"
										name="txtComp" readonly="readonly" tabindex="-1"
										class="form-control input-SmallText" placeholder="Comp"
										maxlength="25" required>
								</div>
							</div>
							<div class="col-md-2-1" style="margin-top: 0px;">
								<div class="form-group">
									<label for="AvailQty">Shelf</label><input type="text"
										id="txtShelf" name="txtShelf" readonly="readonly" tabindex="-1"
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
											maxlength="25" required onblur="calculatePopUpAmt(),validationsOfQty();">

									</div>
								</div>
								<div class="col-md-8-1" style="margin-top: 20px; float: right;">
									<div class="col-md-5-1" style="margin-top: 0px;">
										<b>Current Batch Stck</b>
									</div>
									<div class="col-md-4-1" style="margin-top: 0px;">
										<input type="hidden" id="hiddenStockId"> <input
											type="text" readonly id="txtClStk" name="txtClStk"
											class="form-control input-SmallText" tabindex="-1"
											placeholder="Current Batch Stck" maxlength="25" required>
									</div>

								</div>
							</div>
						</div>
                        <div class="col-md-12-1" style="margin-top: 2px;">
							<div class="col-md-1-1" style="margin-top: 0px;"></div>
							<div class="col-md-11-1" style="margin-top: 0px;">
								<div class="col-md-3-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product">Disc%</label> <input type="text"
											id="txtDisc" name="txtDisc"
											class="form-control input-SmallText" placeholder="Disc"
											maxlength="25" required onblur="calculatePopUpAmt();">

									</div>
								</div>
								<div class="col-md-8-1" style="margin-top: 20px; float: right;">
									<div class="col-md-5-1" style="margin-top: 0px;">
										<b>Scheme</b>
									</div>
									<div class="col-md-4-1" style="margin-top: 0px;">
										 <input
											type="text" id="txtScheme" name="txtScheme"
											class="form-control input-SmallText"
											placeholder="Scheme" maxlength="25" required>
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
												id="hiddenPurchaseId">  <input type="text"
											id="txtBatchNo" name="txtBatchNo" tabindex="-1"
											class="form-control input-SmallText" readonly
											placeholder="Batch No" maxlength="25" required>
									</div>
								</div>
								<div class="col-md-8-1" style="margin-top:20px; float:right;">
									<div class="col-md-5-1" style="margin-top: 0px;">
										<b>Total Stock</b>
									</div>
									<div class="col-md-4-1" style="margin-top: 0px;">
										<input type="hidden" id="hiddenStockId"> <input
											type="text" readonly id="txtTotalStk" name="txtTotalStk"
											class="form-control input-SmallText" tabindex="-1"
											placeholder="Total Stock" maxlength="25" required>
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
											id="txtExpiry" name="txtExpiry" tabindex="-1"
											class="form-control input-SmallText" readonly
											placeholder="Expiry" maxlength="25" required>
									</div>
								</div>

								<div class="col-md-8-1" style="margin-top: 20px; float: right;">
									<div class="col-md-5-1" style="margin-top: 0px;">
										<b>Pur Rate</b>
									</div>
									<div class="col-md-4-1" style="margin-top: 0px;">
										<input type="text" id="txtPRate" name="txtPRate" tabindex="-1"
											class="form-control input-SmallText" readonly
											placeholder="Pur Rate" maxlength="25" required>
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
											maxlength="25" required onblur="calculatePopUpAmt()">
									</div>
								</div>

								<div class="col-md-8-1" style="margin-top: 20px; float: right;">
									<div class="col-md-5-1" style="margin-top: 0px;">
										<b>MRP</b>
									</div>
									<div class="col-md-4-1" style="margin-top: 0px;">
										<input type="text" id="txtMrp" name="txtMrp" readonly tabindex="-1"
											class="form-control input-SmallText" placeholder="MRP"
											maxlength="25" required>
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
											id="txtAmt" name="txtAmt" tabindex="-1"
											class="form-control input-SmallText" readonly
											placeholder="Amt" maxlength="25" required>
									</div>
								</div>

								<div class="col-md-8-1" style="margin-top: 20px; float: right;">
									<div class="col-md-5-1" style="margin-top: 0px;">
										<b>VAT%</b>
									</div>
									<div class="col-md-4-1" style="margin-top: 0px;">
										<input type="text" id="txtVat" name="txtVat" readonly
											class="form-control input-SmallText" placeholder="VAT" tabindex="-1"
											maxlength="25" required>
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
					<button type="submit" class="btn btn-primary"
						id="btnSubContractingMaterialIssueSave"
						name="btnSubContractingMaterialIssueSave" onclick="myfunction()"
						data-dismiss="modal">Ok</button>
					<!-- <button type="button" class="btn btn-default" data-dismiss="modal">Redo</button> -->
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
				</div>
			</div>
		</div>

	</div>
</div>

<%@include file="BatchPopUp.jsp"%>

