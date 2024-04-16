<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script type="text/javascript">
	function load(currentVal, id) {

		$("#particulars").focus();
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
		$('#mrn_issue_Form').modal('show');
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

			error : function(error) {
				alert('error' + error);
			},
			success : function(r) {
				var availableTags = [];
				var resultData = [];

				if(r.length>0)
				{	
					for ( var i = 0; i < r.length; i++) {
					availableTags[i] = r[i].productName + '_' + r[i].productId
							+ '-' + r[i].productUnit + '-'
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
					$("#particulars").data('typeahead').source = resultData;
				}, 500);
			}
		});
	}

	function loadHospitalSaleBatchPopUp(productId) {
		getProductByBatch(productId);

		$("#rowId0").focus();
		setTimeout(function() {
			$("#rowId0").focus();
		}, 500);
		$('#hospitalSaleBatchPopUp').modal('show');
	}

	function setPopUpValues(number, totalRow) {
		$('#txtMRP').val($('#textBatchMRP' + number).val());
		
		$('#txtPurchaseRate').val($('#textBatchPurchaseRate' + number).val());
		$('#txtVat').val($('#textBatchVat' + number).val());

		$('#txtBatchNo').val($('#textBatchCode' + number).val());
		$('#txtExpiry').val($('#textBatchExpiry' + number).val());
		$('#txtClStk').val($('#textBatchClearStock' + number).val());

		$('#txtRate').val($('#textBatchMRP' + number).val());

		$('#hiddenBatchId').val($('#textBatchPopUpBatchId' + number).val());
		$('#hiddenStockId').val($('#textBatchStockId' + number).val());

		var totalStock = 0;
		for ( var i = 0; i < totalRow; i++) {
			totalStock = totalStock
					+ parseInt($('#textBatchClearStock' + i).val());
		}
		$("#txtTotalStk").val(totalStock);
	}

	function displayResult(item) {
		var content = item.value.split("-");
		$('#hiddenProductId').val(content[0]);
		$('#txtUnit').val(content[1]);
		$('#txtPack').val(content[2]);
		$('#txtComp').val(content[3]);
		$('#txtShelf').val(content[4]);
		loadHospitalSaleBatchPopUp(content[0]);
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
		
		$('#hiddenBatchId').val($('#textBatchId' + rowCount).val());
				
		$('#txtQty').val(Qty);

		$('#txtScheme').val($('#textSchm' + rCount).val());

		$('#txtMRP').val($('#textMrp' + rCount).val());
		$('#txtBatchNo').val($('#textBatch' + rCount).val());
		$('#txtExpiry').val($('#textExpiry' + rCount).val());

		$('#txtRate').val($('#textRate' + rCount).val());

		$('#txtVat').val($('#textVat' + rCount).val());

		$('#txtAmount').val($('#textAmount' + rCount).val());

		$('#txtClStk').val($('#textClStk' + rowCount).val());

		$('#txtTotalStk').val($('#textTotalStk' + rowCount).val());
 
		$('#txtPurchaseRate').val($('#textPurchaseRate' + rowCount).val());
		$('#txtRatePerUnit').val($('#textRatePerUnit' + rowCount).val());

	}

	function resetValues() {
		$('#mrn_issue_Form').find('input:text').val('');
		$('#mrn_issue_Form').find('input:hidden').val('');
		
	}

	function myfunction() {
		var ProductId = $("#hiddenProductId").val();
		var Qty = $("#txtQty").val();
		var BatchCode= $("#txtBatchNo").val();
		var Expiry = $("#txtExpiry").val();
		var Rate = $("#txtRate").val();
		var issueQty=$("#txtIssueQty").val();
		
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
		
		if (issueQty == "0" || issueQty == "undefined" || issueQty == "" || issueQty==null) {
			alert("Enter Issue Quantity");
			$("#txtIssueQty").val('');
			$("#txtIssueQty").focus();
				return false;
		}
		if(parseInt(issueQty)>parseInt(Qty))
		{
			alert("Issue Quantity Should be less than Require Quantity");
			$("#txtIssueQty").val('');
			$("#txtIssueQty").focus();
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
		 if (parseFloat($('#txtIssueQty').val()) > parseFloat($('#txtClStk').val())) {
			alert("Total Issue Qty should be not more than current Batch Stock");
			$("#txtIssueQty").focus();
			return false;
		} 
		if (Rate == "0" || Rate == "undefined" || Rate == "") {
			alert("Enter Rate");
			$("#txtRate").val('');
			$("#txtRate").focus();
				return false;
		}
	       else {
					/*  $("#mrn_issue_Form").modal('hide');
					 fillRows($('#hiddenCurrentRow').val()); */
					 
	    	   $("#mrn_issue_Form").modal('hide');
			   if ($('#hiddenProductId').val() != "")
				   createMRNIssueDiv('RowCount', $('#hiddenCurrentRow').val());
			  
	}
	
		
	}
</script>


<div id="mrn_issue_Form" class="modal fade in">
	<div class="modal-dialog" style="width: 600px;">
		<form action="">
			<div class="modal-content col-md-9">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-8 center">
						<h4>
							<i class="fa fa-calendar"></i>MRN Product Information
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
											id="hiddenProductId" value='0'/> <input type="text" id="particulars"
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
											<label for="product">Require Qty</label> <input type="text"
												id="txtQty" name="txtQty"
												class="form-control input-SmallText" placeholder="Qty"
												readonly="true" maxlength="25" required onblur="isNumber('txtQty'),setFocusToRate(),calculateMRNAmount('qty'),validationsOfQty();">
												<div class='col-md-1-1 center'
											style='margin-top: -42px; margin-left: 19px; color: red;'>
											<b> *</b>
										</div>
										</div>
									</div>
									
									<div class="col-md-8-1" style="margin-top: 20px; float: right;">
										<div class="col-md-5-1" style="margin-top: 0px;">
											<b>Issue Quantity</b>
										</div>
										<div class="col-md-4-1" style="margin-top: 0px;">
											<input type="text" id="txtIssueQty"
												name="txtIssueQty" class="form-control input-SmallText"
												placeholder="Issue Qty" maxlength="25" required onblur="isNumber('txtIssueQty'),setFocusToRate(),calculateMRNAmount('qty'),validationsOfQty();">
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
												maxlength="25" onblur="isFloatingPoint('txtRate'),calculateMRNAmount('qty');" readonly="true">
												
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
												class="form-control input-SmallText" placeholder="VAT"
												maxlength="25" readonly>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-12-1" style="margin-top: 2px;">
						<!-- 	 I am a So <span id="js-rotating">Simple, Very Doge, Much
								Wow, Such Cool</span> Text Rotator -->
							<div style="float:right;" class="form-group">

								<label for="product"><span id="js-rotating" class="morphext"><span class="animated flash"></span></span></label> <input type="text" placeholder="Rate Per Unit" class="form-control input-SmallText" readonly="" name="txtRatePerUnit" id="txtRatePerUnit" style="background: yellow none repeat scroll 0% 0%;">
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
							name="btnSubContractingMaterialIssueSave" onclick="myfunction()"
							>Ok</button>
						<!-- <button type="button" class="btn btn-default" data-dismiss="modal">Redo</button> -->
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>


<%@include file="pharma_hospital_sales_batch_pop_up.jsp"%>