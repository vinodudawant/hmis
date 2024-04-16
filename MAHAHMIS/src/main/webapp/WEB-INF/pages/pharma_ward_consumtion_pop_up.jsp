<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>

<script type="text/javascript">
	function load(currentVal, id) {

		$("#particulars1").focus();
		/*  $("#particulars11").attr("readonly", false);  */
		setTimeout(function() {
			$("#particulars1").focus();
		}, 500);

		if ($('#hiddenProductId' + currentVal).val() != "") {
			editCounter(currentVal);
		}
		if ($('#hiddenProductId' + currentVal).val() == "") {
			reseltValues();
		}
		
		$('#hiddenCurrentRow').val(currentVal);

		if ($('#textNo' + currentVal).val() != "")
			$('#Counter_PopUp_Form').modal('show');
		else
			alertify.error("please fill counter number first");
	}

	function setValuesToAutocomplete(key) {
		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				$('#txtQty').focus();
				return false;
			}
		}
		var findingName = $("#particulars1").val();
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
					{	
						availableTags[i] = r[i].productName + '_'
								+ r[i].productId + '$$' + r[i].productUnit + '$$'
								+ r[i].packingMaster.packType + '$$'
								+ r[i].companyMaster.compName + "$$"
								+ r[i].shelfMaster.shelfName + "$$"
								+ r[i].companyMaster.compName + "$$"
								+ r[i].drugMaster.drugName +'$$'
								+ r[i].productShortName+'$$'
								+ r[i].productH1;
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
					$('#particulars1').typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true
					});
					$("#particulars1").data('typeahead').source = resultData;
				}, 100);
			}
		});
	}

	function loadCounterBatchPopUp(productId) {
		getProductByBatch(productId);
		$('#jqxgrid').jqxGrid('selectrow', 0);
		setTimeout(function() {
			$('#jqxgrid').jqxGrid('selectrow', 0);
		}, 500);
		
	}

	function displayResult(item) {
		var content = item.value.split("$$");
		
		$('#hiddenProductId').val(content[0]);
		$('#txtUnit').val(content[1]);
		$('#txtPack').val(content[2]);
		$('#txtComp').val(content[3]);
		$('#txtShelf').val(content[4]);
		/* $('#txtMRP').val(content[5]);
		$('#txtPurchaseRate').val(content[6]); */
		/* getLastBillNum(content[0]); */
		$('#txtCompany').val(content[5]);
		$('#txtContent').val(content[6]);
		$('#txtVat').val(content[7]);
		
		$('#hiddenProductH1').val(content[8]);
		
		if(content[8]=='1')
		{
			$("#divSchH1").html("<font color=red size=4><strong>Sch H1 Product Billing Must</strong></font>");
		}	
		else
		{	
			$("#divSchH1").html("<font><strong></strong></font>");
		}	
		
		
		loadCounterBatchPopUp(content[0]);
	}

	function setPopUpValues(number) {
		
		var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', number);
		
		$('#txtMRP').val(selectedRowData.mrp);

		/* $('#txtVat').val($('#textVat' + number).val()); */
		$('#txtPurchaseRate').val(selectedRowData.purchaseRate);
		$('#txtBatchNo').val(selectedRowData.batchCode);
		$('#txtExpiry').val(selectedRowData.batchExpDate);
		$('#txtClStk').val(selectedRowData.clearStock);
      	
		if($('#selectConsType').val()=="Individual") 
			$('#txtRate').val(selectedRowData.purchaseRate);
	    else
			$('#txtRate').val(selectedRowData.saleRate); 

		$('#hiddenBatchId').val(selectedRowData.batchId);

		$('#hiddenStockId').val(selectedRowData.stockId);

		var id=$("#jqxgrid").jqxGrid('getrows');
		var totalStock = 0;
		for ( var i = 0; i < id.length; i++) {
			totalStock = totalStock + parseInt(id[i].clearStock);
		}
		$("#txtTotalStk").val(totalStock);
		$('#txtWardQty').focus();
	}

	function editCounter(rowCount)
	{    
		$('#hiddenProductId').val($('#hiddenProductId' + rowCount).val());
		var proName = $('#textProductName' + rowCount).val();
		$('#particulars11').val(proName);
		var unit = $('#textUnit' + rowCount).val();
		$('#txtUnit').val(unit);
		var Pack = $('#textPack' + rowCount).val();
		$('#txtPack').val(Pack);
		var Comp = $('#textCom' + rowCount).val();
		$('#txtComp').val(Comp);
       
		$('#txtShelf').val($('#textShelf' + rowCount).val());
		$('#txtMRP').val($('#textMrp' + rowCount).val());
		$('#txtQty').val($('#textQty' + rowCount).val());
		$('#txtBatchNo').val($('#textBatchNo' + rowCount).val());
		$('#txtExpiry').val($('#textExp' + rowCount).val());
		$('#txtRate').val($('#textRate' + rowCount).val());
		$('#txtAmt').val($('#textAmount' + rowCount).val());
		
		$('#txtContent').val($('#textContent' + rowCount).val());
		$('#txtRatePerUnit').val($('#textRatePerUnit' + rowCount).val());
		          
		$('#hiddenBatchId').val($('#textBatchId' + rowCount).val());
		
		$('#txtClStk').val($('#textClStk' + rowCount).val());

		$('#txtTotalStk').val($('#textTotalStk' + rowCount).val());

		$('#txtPurchaseRate').val($('#textPurchaseRate' + rowCount).val());
		$('#txtVat').val($('#textNewVat' + rowCount).val());
		$('#txtCompany').val($('#textCom' + rowCount).val());
		$('#txtDis').val($('#textDis' + rowCount).val());
		$('#txtDiscAmt').val($('#textDisAmt' + rowCount).val());
		
		$('#hiddenProductH1').val($('#textProductH1' + rowCount).val());
		
		$('#txtRateForPrint').val($('#textRateForPrint' + rowCount).val());
		
		if($('#textProductH1' + rowCount).val()=='1')
		{
			$("#divSchH1").html("<font color=red size=4><strong>Sch H1 Product Billing Must</strong></font>");
		}	
		else
		{	
			$("#divSchH1").html("<font><strong></strong></font>");
		}	
	}

	function reseltValues() {
		$('#Counter_PopUp_Form').find('input:text').val('');
		$('#Counter_PopUp_Form').find('input:hidden').val('');
	}

	
	
	function myfunctionCounter() 
	{
		var ProductId = $("#hiddenProductId").val();
		var Qty = $("#txtWardQty").val();
		var Rate = $("#txtRate").val();
		var Batch = $("#txtBatchNo").val();
		var Expiry = $("#txtExpiry").val();
		
		if (ProductId == "0" || ProductId == "undefined" || ProductId == "") {
			alert("Enter Proper Product Name");
			$("#particulars11").val('');
			$("#particulars11").focus();
			$("#hiddenProductId").val("0");
			return false;
		}
		if (Qty == "0" || Qty == "undefined" || Qty == "") {
			alert("Enter Quantity");
			$("#txtWardQty").val('');
			$("#txtWardQty").focus();
			return false;
		}
		if (Rate == "0" || Rate == "undefined" || Rate == "") {
			alert("Enter Rate");
			$("#txtRate").val('');
			$("#txtRate").focus();
			return false;
		}
		if (Batch == "0" || Batch == "undefined" || Batch == "") {
			alert("Enter Batch");
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
			
		if (parseFloat($('#txtWardQty').val()) > parseFloat($('#txtClStk').val())) {
			alert("Total Qty should be not more than current Batch Stock");
			$("#txtWardQty").focus();
			return false;
		}
		else 
		{
			$("#Counter_PopUp_Form").modal('hide');
		 	if ($('#hiddenProductId').val() != "") 
		 		{
		 		createWardConsumptionDiv('consumptionRowCount',$('#hiddenCurrentRow').val());
		 		}
		}
	}
</script>

<div id="Counter_PopUp_Form" class="modal fade in">
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
								<div class="form-group" class="typeahead1">
									<label for="product">Product</label> <input type="hidden"
										id="hiddenProductId" value="0" /> 
										<input type="hidden"
										id="txtRateForPrint" />
										<input type="text" id="particulars1"
										name="txtProductName" class="form-control input-SmallText "
										placeholder="Product" tabindex="1"
										maxlength="25" autocomplete="off"
										onkeypress="return setValuesToAutocomplete(event)" required>
										
										<input type="hidden" id="hiddenProductH1"> 
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
										id="txtShelf" name="txtShelf" readonly
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
										<label for="product"> Quantity</label> <input type="text"
											id="txtWardQty" name="txtWardQty" value='0'
											class="form-control input-SmallText" placeholder="Qty"
											maxlength="25" required
											onblur="isNumber('txtQty',0,10),calculateCounterAmount('qty')" onblur='checkQtyforStock()'> 
											
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
										<input type="hidden" id="hiddenBatchId"> <label
											for="product">Batch No</label> <input type="text"
											id="txtBatchNo" name="txtBatchNo" readonly
											class="form-control input-SmallText" placeholder="Batch No"
											maxlength="25" required>
											<div class='col-md-1-1 center'
											style='margin-top: -42px; margin-left: 50px; color: red;'>
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
											id="txtExpiry" name="txtExpiry" readonly
											class="form-control input-SmallText" placeholder="Expiry"
											maxlength="25" required>
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
										<input type="text" id="txtPurchaseRate" readonly
											name="txtPurchaseRate" class="form-control input-SmallText"
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
											id="txtRate" name="txtRate" value='0'
											class="form-control input-SmallText" placeholder="Rate"
											maxlength="25" required
											onchange="isFloatingPoint('txtRate',0,10),calculateCounterAmount();">
										<div class='col-md-1-1 center'
											style='margin-top: -42px; margin-left: 26px; color: red;'>
											<b> *</b>
										</div>
									</div>
								</div>

								<div class="col-md-8-1" style="margin-top: 20px; float: right;">
									<div class="col-md-5-1" style="margin-top: 0px;">
										<b>MRP</b>
									</div>
									<div class="col-md-4-1" style="margin-top: 0px;">
										<input type="text" id="txtMRP" readonly name="txtMRP"
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
										<label for="product">Discount%</label> <input type="text"
											id="txtDis" name="txtDis" readonly="true"
											class="form-control input-SmallText" placeholder="Discount"
											maxlength="25" required onblur="calculateCounterDisc();">
									</div>
								</div>

								<div class="col-md-8-1" style="margin-top: 20px; float: right;">
									<div class="col-md-5-1" style="margin-top: -1px;">
										<b>Discount Amount</b>
									</div>
									<div class="col-md-4-1" style="margin-top: -1px;">
										<input type="text" id="txtDiscAmt" name="txtDiscAmt" readonly="true"
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
										<label for="product">Amount</label> <input type="text"
											id="txtAmt" name="txtAmt" readonly
										txtAmt	class="form-control input-SmallText" placeholder="Amt"
											maxlength="25" required>
									</div>
								</div>

								<div class="col-md-8-1" style="margin-top: 20px; float: right;">
									<div class="col-md-5-1" style="margin-top: -2px;">
										<b>    VAT%</b>
									</div>
									<div class="col-md-4-1" style="margin-top: -2px;">
										<input type="text" id="txtVat" readonly name="txtVat"
											class="form-control input-SmallText" placeholder="VAT"
											maxlength="25" required>
									</div>
									<div class="col-md-1-1 center" style="margin-top: -7px; margin-left: -166px; color: red;">
                                      <b> *</b>
                                     </div>
								</div>
							</div>
						</div>
						<div class="col-md-12-1" style="margin-top: 2px;">
							<div class="col-md-1-1" style="margin-top: 0px;"></div>
							<div class="col-md-11-1" style="margin-top: 0px;">
								<div class="col-md-3-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product">Company</label> <input type="text"
											id="txtCompany" name="txtCompany" readonly
											class="form-control input-SmallText" placeholder="Company"
											maxlength="25" required>
									</div>
								</div>

								<div class="col-md-8-1" style="margin-top: 20px; float: right;">
									<div class="col-md-5-1" style="margin-top: -7px;">
										<b>Content</b>
									</div>
									<div class="col-md-4-1" style="margin-top: -7px;">
										<input type="text" id="txtContent" name="txtContent" readonly
											class="form-control input-SmallText" placeholder="Content"
											maxlength="25" required>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-12-1" style="margin-top: -12px;">
							<!-- 	 I am a So <span id="js-rotating">Simple, Very Doge, Much
								Wow, Such Cool</span> Text Rotator -->
								
							<div class="col-md-8-1" style="margin-top: 20px;" id="divSchH1"></div>	
								
							<div class="form-group" style="float: right;">

								<label for="product"><span id="js-rotating">Rate
										Per Unit.</span></label> <input type="text" id="txtRatePerUnit"
									name="txtCompany" readonly class="form-control input-SmallText"
									placeholder="Rate Per Unit">
							</div>
						</div>
					</div>
				</div>
				<!-- /BOX-->
			</div>
			<!-- /BODYtoCreatePatientSaleBillDiv('RowCount', $('#hiddenCurrentRow').val())-->
			<div class="modal-footer">
				<div class="form-group col-md-7-1"
					style="margin-top: -21px; margin-left: 3px">
					<button type="submit" class="btn btn-primary"
						id="btnSubContractingMaterialIssueSave"
						name="btnSubContractingMaterialIssueSave"
						onclick="myfunctionCounter()">Ok</button>
					<!-- <button type="button" class="btn btn-default" data-dismiss="modal">Redo</button> -->
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
				</div>
			</div>
		</div>
	</div>
</div>

<%@ include file="pharma_counter_batch_PopUp.jsp"%>