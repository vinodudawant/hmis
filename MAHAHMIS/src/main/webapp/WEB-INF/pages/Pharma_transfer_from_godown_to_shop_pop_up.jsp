
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>
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
		$('#TransferFromGodownToShop_PopUp_Form').modal('show');
	}

	function setValuesToAutocomplete(key) {

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

					if (r.length > 0)
						availableTags[i] = r[i].productName + '_'
								+ r[i].productId + '-' + r[i].productUnit + '-'
								+ r[i].packingMaster.packType + '-'
								+ r[i].companyMaster.compName + "-"
								+ r[i].shelfMaster.shelfName + "-"
								+ r[i].companyMaster.compName + "-"
								+ r[i].drugMaster.drugName;
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

				}, 500);
			}
		});
	}
	function displayResult(item) {

		var content = item.value.split("-");
		$('#hiddenProductId').val(content[0]);
		$('#txtUnit').val(content[1]);
		$('#txtPack').val(content[2]);
		$('#txtComp').val(content[3]);
		$('#txtShelf').val(content[4]);
		/* $('#txtMrp').val(content[5]);
		$('#txtPurchaseRate').val(content[6]); */
		loadTransferFromGoDownToShopBatchPopUp(content[0]);
		/* 	getProductDetail(content[0]);  */
	}

	function loadTransferFromGoDownToShopBatchPopUp(productId) {
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
		
		$('#txtClStk').val($('#textClStk' + rCount).val());

		$('#txtTotalStk').val($('#textTotalStk' + rCount).val());

		$('#txtPRate').val($('#textPurchaseRate' + rCount).val());
		
		$('#txtVat').val($('#textVat' + rCount).val());
		
		
		
	}
	
	function resetValues() {
		$('#TransferFromGodownToShop_PopUp_Form').find('input:text').val('');
		$('#TransferFromGodownToShop_PopUp_Form').find('input:hidden').val('');
		
	}

	function createRow() {
		/* if ($('#hiddenProductId').val() != "") */
			toCreateTransferFromGodownToShopDiv('RowCount', $('#hiddenCurrentRow').val());
	}
	
	
</script>


<div id="TransferFromGodownToShop_PopUp_Form" class="modal fade in">
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
											id="hiddenProductId" /><input type="text" id="particulars"
											name="txtProductName" class="form-control input-SmallText"
											placeholder="Product" tabindex="-1" autofocus="autofocus"
											maxlength="25" autocomplete="off"
											onkeyup="return setValuesToAutocomplete(this.id)" required>
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
											id="txtShelf" name="txtShelf" readonly tabindex="-1"
											class="form-control input-SmallText" placeholder="AvailQty"
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
												id="txtQty" name="txtQty" value='0'
												class="form-control input-SmallText" placeholder="Qty"
												maxlength="25" required onchange="calculateAmount();">

										</div>
									</div>
									<div class="col-md-8-1" style="margin-top: 20px; float: right;">
										<div class="col-md-5-1" style="margin-top: 0px;">
											<b>Godown Stock</b>
										</div>
										<div class="col-md-4-1" style="margin-top: 0px;">
											<input type="text" id="txtGodownStk" name="txtGodownStk"
												class="form-control input-SmallText" readonly tabindex="-1"
												placeholder="Godown Stock" maxlength="25" required>
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
												id="txtBatchNo" name="txtBatchNo" readonly tabindex="-1"
												class="form-control input-SmallText" placeholder="Batch No"
												maxlength="25" required>
										</div>
									</div>
									<div class="col-md-8-1" style="margin-top: 20px; float: right;">
										<div class="col-md-5-1" style="margin-top: 0px;">
											<b>Vat%</b>
										</div>
										<div class="col-md-4-1" style="margin-top: 0px;">
											 <input
												type="text" id="txtVat" name="txtVat" tabindex="-1"
												class="form-control input-SmallText" readonly
												placeholder="Vat" maxlength="25" required>
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
												id="txtExpiry" name="txtExpiry" readonly tabindex="-1"
												class="form-control input-SmallText" placeholder="Expiry"
												maxlength="25" required>
										</div>
									</div>

									<div class="col-md-8-1" style="margin-top: 20px; float: right;">
										<div class="col-md-5-1" style="margin-top: 0px;">
											<b>MRP</b>
										</div>
										<div class="col-md-4-1" style="margin-top: 0px;">
											<input type="text" id="txtMrp" readonly name="txtMrp" tabindex="-1"
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
											<label for="product">Pur Rate</label> <input type="text"
												id="txtPRate" name="txtPRate" value='0' tabindex="-1"
												class="form-control input-SmallText" placeholder="Pur Rate"
												maxlength="25" required readonly
												onchange="calculateAmount();">
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
												id="txtAmt" name="txtAmt" readonly tabindex="-1"
												class="form-control input-SmallText" placeholder="Amt"
												maxlength="25" required>
										</div>
									</div>
									
									</div>
								</div>
							</div>
							
						</div>

					</div>
					
				</div>
				
				<div class="modal-footer">

					<div class="form-group col-md-7-1"
						style="margin-top: -35px; margin-left: -64px">
						<button type="submit" class="btn btn-primary"
							id="btnSubContractingMaterialIssueSave"
							name="btnSubContractingMaterialIssueSave"
							onclick="createRow();"
							data-dismiss="modal">Ok</button>
						<!-- <button type="button" class="btn btn-default" data-dismiss="modal">Redo</button> -->
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					</div>
				</div>
				</form>
			</div>
		
	</div>
</div>
<%@include file="BatchPopUp.jsp"%>