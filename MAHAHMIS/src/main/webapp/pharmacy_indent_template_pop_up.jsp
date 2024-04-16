<script type="text/javascript"
	src="../.././pharma-resources/js/auto/jquery.mockjax.js"></script>
<script type="text/javascript"
	src="../.././pharma-resources/js/app_js/Pharma_Validation.js"></script>
<script type="text/javascript"
	src="../.././pharma-resources/js/auto/bootstrap-typeahead.js"></script>
<script type="text/javascript">
	var requestCount = 0;
	function loadIndentTemplate(currentVal, id) {

		$("#indentTemplateProductName").focus();
		setTimeout(function() {
			$("#indentTemplateProductName").focus();
		}, 550);

		if ($('#txtIndentTemplateProductId' + currentVal).val() != "") {
			editIndentTemplate(currentVal);

			$('#hiddenIndentTemplateProductId').val('');
		}
		if ($('#txtIndentTemplateProductId' + currentVal).val() == "") {
			resetIndentTemplateValues();
		}
		$('#hiddenCurrentRow').val(currentVal);
		$('#indent_template_pop_up').modal('show');
	}

	function fetchProductDetails(key) {
		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				$('#txtIndentTemplateQty').focus();
				return false;
			}
		}

		var findingName = $("#indentTemplateProductName").val();
		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');
		var total = 0;

		jQuery
				.ajax({

					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "./pharmacy/product/autoSuggestionProduct",
					timeout : 1000 * 60 * 15,

					error : function(error) {
						/* 	alert('error' + error); */
					},
					success : function(r) {
						var availableTags = [];
						var resultData = [];

						if (r.length > 0) {
							for ( var i = 0; i < r.length; i++) {
								var total = 0;
								if (r[i].stockMasters.length > 0) {

									for ( var k = 0; k < r[i].stockMasters.length; k++) {
										total = total
												+ parseInt(r[i].stockMasters[k].stockQtyInHand);

									}
								}

								availableTags[i] = r[i].productName + '_'
								+ r[i].productId + '-' + r[i].productUnit + '-'
								+ r[i].packingMaster.packType + '-'
								+ r[i].companyMaster.compName + '-'
								+ r[i].shelfMaster.shelfName+ '-'
								+ r[i].drugMaster.drugName;
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
						$(".typehead1").html(template);
						$(".typehead1").show();

						setTimeout(
								function() {
									$('#indentTemplateProductName').typeahead({
										source : resultData,
										displayField : 'Name',
										valueField : 'ID',
										onSelect : displayIndentTemplateResult,
										scrollBar : true

									});
									$("#indentTemplateProductName").data('typeahead').source = resultData;
								}, 500);
					}
				});
	}

	function displayIndentTemplateResult(item) {
		var content = item.value.split("-");
		$('#hiddenIndentTemplateProductId').val(content[0]);
		$('#txtUnit').val(content[1]);
		$('#txtPack').val(content[2]);
		$('#txtComp').val(content[3]);
		$('#txtShelf').val(content[4]);
		$('#txtDrug').val(content[5]);
	}

	function isNumber(id, minLen, maxLen) {
		var min = parseInt(minLen);
		var max = parseInt(maxLen);

		// alert("number field");
		var name1 = /^[0-9]+$/;
		var value1 = $('#' + id).val();
		if (min > value1.length || max < value1.length) {
			alert("Please Enter Only number!");
			$('#' + id).focus();
			return false;
		} else if (value1 != "" && !name1.test(value1)) {
			alert("Please Enter Only number!");
			$('#' + id).focus();
			$('#' + id).val('');

			return false;

		}
		return true;
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

	function editIndentTemplate(rCount) {
		var rowCount = parseInt(rCount);

		$('#hiddenProductId' + rowCount).val();
		$('#hiddenProductId').val($('#txtIndentTemplateProductId' + rowCount).val());
		var proName = $('#txtIndentTemplateProductName' + rCount).val();
		$('#indentTemplateProductName').val(proName);

		var Qty = $('#txtIndentTemplateRequireQty' + rCount).val();
		$('#txtIndentTemplateQty').val(Qty);

	}

	function fillIndentTemplateRow(rCount) {

		var rowCount = parseInt(rCount);
		$('#txtIndentTemplateProductId' + (rowCount)).val($('#hiddenIndentTemplateProductId').val());
		$('#txtIndentTemplateProductName' + (rowCount)).val($('#indentTemplateProductName').val());
		$('#txtIndentTemplateRequireQty' + (rowCount)).val($('#txtIndentTemplateQty').val());
	}

	function resetIndentTemplateValues() {
		$('#indent_template_pop_up').find('input:text').val('');
		$('#indent_template_pop_up').find('input:hidden').val('');

	}

	function createIndentTemplateRow() {
		var ProductId = $("#hiddenIndentTemplateProductId").val();
		var Qty = $("#txtIndentTemplateQty").val();
		if (ProductId == "0" || ProductId == "undefined" || ProductId == "") {
			alert("Enter Proper Product Name");
			$("#indentTemplateProductName").val('');
			$("#indentTemplateProductName").focus();
			$("#hiddenIndentTemplateProductId").val("0");
			return false;
		}
		if (Qty == "0" || Qty == "undefined" || Qty == "") {
			alert("Enter Quantity");
			$("#txtIndentTemplateQty").val('');
			$("#txtIndentTemplateQty").focus();
			return false;
		} else {
			$("#indent_template_pop_up").modal('hide');
			if ($('#hiddenIndentTemplateProductId').val() != "") {
				fillIndentTemplateRow($('#hiddenCurrentRow').val());
			}

		}
	}
	
</script>


<div id="indent_template_pop_up" class="modal fade in">
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
											id="hiddenIndentTemplateProductId" value="0" /><input type="text"
											id="indentTemplateProductName" name="indentTemplateProductName"
											autofocus="autofocus" class="form-control input-SmallText"
											placeholder="Product" autocomplete="off"
											onkeypress="return fetchProductDetails(this.id)">
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
											id="txtShelf" name="txtShelf" readonly="readonly"
											class="form-control input-SmallText" placeholder="Shelf"
											required>
									</div>
								</div>
								
								<div class="col-md-4-1" style="margin-top: 0px;">
									<div class="form-group">
										<label>Drug</label><input type="text"
											id="txtDrug" name="txtDrug" readonly="readonly"
											class="form-control input-SmallText" placeholder="Drug"
											required>
									</div>
								</div>

								<div style="margin-top: 0px;" class="col-md-2-1">

									<div class="form-group">
										<label for="product">Quantity</label> <input type="text"
											onblur="isNumber('txtIndentTemplateQty',0,10);" maxlength="25"
											placeholder="Qty" class="form-control input-SmallText"
											value="0" name="txtIndentTemplateQty" id="txtIndentTemplateQty">
										<div style="margin-top: -42px; margin-left: 47px; color: red;"
											class="col-md-1-1 center">
											<b> *</b>
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
							name="btnSubContractingMaterialIssueSave" onclick="createIndentTemplateRow();">Ok</button>
						<!-- <button type="button" class="btn btn-default" data-dismiss="modal">Redo</button> -->
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
