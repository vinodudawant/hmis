<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script type="text/javascript">
	function load(currentVal, id)
	{
		$('#fordoctorstationmediciencount').val(currentVal);
		
		if ($("#radioMRP").is(":checked")) 
		{
			$('#mydiv label').text('Rate Per Unit.');
			/* $('#textPerRatePerUnitFlag'+currentVal).val(0); */
		} 
		else 
		{
			$('#mydiv label').text('PurRate Per Unit.');
			/* $('#textPerRatePerUnitFlag'+currentVal).val(1); */
		}

		$("#particulars").focus();
		setTimeout(function() {
			$("#particulars").focus();
		}, 500);

		if ($('#hiddenProductId' + currentVal).val() != "") 
		{
			resetValues();
		
			if($('#textPerRatePerUnitFlag'+currentVal).val()==0)
				$('#mydiv label').text('Rate Per Unit.');
			else
				$('#mydiv label').text('PurRate Per Unit.');
			editPro(currentVal);
			
		}
		
		if ($('#hiddenProductId' + currentVal).val() == "") {
			resetValues();
		}
		$('#hiddenCurrentRow').val(currentVal);
		
		if($('#txtPatientName').val()!="")
			setValuesToAutocomplete('event');
		else
			{
			alert("select Patient Name");
			$('#txtPatientName').focus();
			}
		
	}
	
	function setValuesToAutocomplete(key) 
	{
		var rowCount = $('#RowCount').val();
		$('#hiddenCurrentRow').val(rowCount);
		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				$('#txtQty').focus();
				return false;
			}
		}
		var findingName = $("#txtProName" + rowCount).val();
		// txtProName1
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

			},
			success : function(r) {
				
				var availableTags = [];
				var resultData = [];

				for ( var i = 0; i < r.length; i++) {

					availableTags[i] = r[i].productName + '_' + r[i].productId
							+ '-' + r[i].productUnit + '-'
							+ r[i].packingMaster.packType + '-'
							+ r[i].companyMaster.compName + "-"
							+ r[i].shelfMaster.shelfName + "-"
							+ r[i].categoryMaster.catId + "-"
							+ r[i].productPrescription + "-"
							+ r[i].preparationMaster.preparationName
							
					/* 	+ r[i].productLastMRP + "-"
						+ r[i].productLastPurRate */;

				}

				var template = "";
				for ( var j = 0; j < availableTags.length; j++) {
					var arrValue = (availableTags[j]).split("_");
					var idValue = (arrValue[1]);
					resultData.push({
						ID : idValue,
						Name : arrValue[0]
					});

					template1 = template + '<li data-value="' + (arrValue[1])
							+ '" class=""><a href="#">' + arrValue[0]
							+ '</a></li>';

				}
				$(".typehead").html(template1);
				$(".typehead").show();

				setTimeout(function() {
					$('#txtProName'+ rowCount).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true
					});
					$("#txtProName"+ rowCount).data('typeahead').source = resultData;
				}, 500);
			}
		});
			
		
	}

	function loadPatientBatchPopUp(productId) 
	{	
		
		//getProductByBatch(productId);
		getProductByBatch2(productId);
		$("#rowId0").focus();
		setTimeout(function() {
			$("#rowId0").focus();
		}, 500);

	}

	function getBatchDetailsByFIFO(productId) {
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

				if (jsObj.result.length == 1) {
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
					$("#hiddenProductPrescription").val(jsObj.result[0].productPrescription);
					calculateCounterAmount();
				} else {
					$("#txtMRP").val('');
					$("#txtPurchaseRate").val('');
					$("#txtVat").val('');
					$("#txtBatchNo").val('');
					$("#txtExpiry").val('');
					$("#txtClStk").val('');
					$("#txtRate").val('');
					$("#hiddenBatchId").val('');
					$("#hiddenStockId").val('');
					$("#txtTotalStk").val('');
					$("#txtQty").val('');
				}
			}
		});
	}

	
	function displayResult(item) 
	{
		var discount=0;
		var content = item.value.split("-");
		//var alertcontent1 = item.value.split("*");
		
		$('#hiddenProductId').val(content[0]);	
		$('#txtUnit').val(content[1]);
		$('#txtPack').val(content[2]);
		$('#txtComp').val(content[3]);
		$('#txtShelf').val(content[4]);
		
		/* $('#hiddenProductId1').val(content[0]);
		$('#txtUnit1').val(content[1]);
		$('#txtPack1').val(content[2]);
		$('#txtComp1').val(content[3]);
		$('#txtShelfNo1').val(content[4]); */
		$('#hiddenProductCategoryId').val(content[5]);	
	//	$('#txtVat').val(content[6]);
		$('#hiddenProductPrescription').val(content[6]);
		$('#txtPre').val(content[7]);
    
		/* $('#txtMRP').val(content[5]);
		$('#txtPurchaseRate').val(content[6]); */

		/* loadPatientBatchPopUp(content[0]); */
		
		$('#txtDis').val(spDisc);
if($("#hiddenSponserFlag").val()=='ACTIVE')
{
	if($("#hiddenTreatmentFlag").val()=='ACTIVE')
	{
		for ( var i = 0; i < patientSaleparseData.result.length; i++) 
			{
				var catId=$('#hiddenProductCategoryId').val();
			
			if(catId==patientSaleparseData.result[i].pharma_category_id)
				{
				discount=patientSaleparseData.result[i].discount_in_percent;
				break;
				}
			}
			
			$('#txtDis').val(discount);
			
	}
			
}
		if (($("#pharmaFetchStockOptionForPatientSale").val()) != "FIFOExpiry")
			{
			loadPatientBatchPopUp(content[0]);
			}
		else
		{
			getBatchDetailsByFIFO(content[0]);

		}

	}

	function setPopUpValues(number, totalRow) {
       
		if (totalRow == '0') {

			$('#txtMRP').val("");
			$('#txtPurchaseRate').val("");
			$('#txtVat').val("");

			$('#txtBatchNo').val("");
			$('#txtExpiry').val("");
			$('#txtClStk').val("");

			$('#txtRate').val("");

			$('#hiddenBatchId').val("");
			$('#hiddenStockId').val("");
			var totalStock = 0;
			for ( var i = 0; i < totalRow; i++) {
				totalStock = totalStock
						+ parseInt($('#textBatchClearStock' + i).val());
			}
			$("#txtTotalStk").val("");
			$("#txtAmt").val("");
			$("#txtRatePerUnit").val("");

		} else {
			$('#txtMRP').val($('#textBatchMRP' + number).val());
			//$('#textRate1').val($('#textBatchMRP' + number).val());
			$('#txtPurchaseRate').val(
					$('#textBatchPurchaseRate' + number).val());
			//$('#txtVat').val($('#textBatchVat' + number).val());
			$('#txtVat').val($('#textBatchVat' + number).val());
			//$('#txtBatchNo').val($('#textBatchCode' + number).val());
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
			$("#textClStk").val($('#textBatchClearStock' + number).val());
			//$("#textClStk1").val(totalStock); 
			
			myfunctionPurchase();
			
		}

	}

	function editPro(rCount) {

		var rowCount = parseInt(rCount);
		var productId = $('#hiddenProductId' + rowCount).val();
		$('#hiddenProductId').val($('#hiddenProductId' + rowCount).val());
		var proName = $('#txtProName' + rCount).val();
		$('#particulars').val(proName);
		var unit = $('#txtUnit' + rCount).val();
		$('#txtUnit').val(unit);
		var Pack = $('#txtPack' + rCount).val();
		$('#txtPack').val(Pack);
		var Comp = $('#txtComp' + rCount).val();
		$('#txtComp').val(Comp);
		var Qty = $('#txtQty' + rCount).val();
		$('#txtQty').val(Qty);

		$('#txtScheme').val($('#textSchm' + rCount).val());
		$('#txtRate').val($('#textRate' + rCount).val());
		$('#txtMRP').val($('#txtMRP' + rCount).val());
		$('#txtBatchNo').val($('#textBatch' + rCount).val());
		$('#txtExpiry').val($('#txtExpiry' + rCount).val());
		$('#txtVat').val($('#textVat' + rCount).val());

		$('#hiddenBatchId').val($('#textBatchId' + rCount).val());

		$('#txtClStk').val($('#textClStk' + rCount).val());

		$('#txtTotalStk').val($('#textTotalStk' + rCount).val());

		$('#txtPurchaseRate').val($('#textPurchaseRate' + rCount).val());

		$('#txtAmt').val($('#txtAmt' + rCount).val());
		$('#txtRatePerUnit').val($('#textRatePerUnit' + rowCount).val());
		$('#txtDis').val($('#textDis' + rowCount).val());
		$('#txtDiscAmt').val($('#textDisAmt' + rowCount).val());

		$('#txtRateForPrint').val($('#textRateForPrint' + rowCount).val());

		$('#txtShelf').val($('#txtShelfNo' + rowCount).val());

		$('#hiddenStockId').val($('#textStockId' + rowCount).val());
		
		$('#hiddenProductPrescription').val($('#txtProductPrescription' + rowCount).val());

		/* if($('#hiddenBatchId').val()=="")
			loadPatientBatchPopUp($('#hiddenProductId').val()); */

		if (($('#hiddenBatchId').val() == "")
				&& (($("#pharmaFetchStockOptionForPatientSale").val()) != "FIFOExpiry"))
			loadPatientBatchPopUp($('#hiddenProductId').val());

		else if (($('#textBatchId' + rowCount).val() == "")) {
			getBatchDetailsByFIFO($('#hiddenProductId').val());
		}
			
			
			if ($('#textPerRatePerUnitFlag' + rowCount).val() ==0)
				$('#mydiv label').text('Rate Per Unit.');
			else
				$('#mydiv label').text('PurRate Per Unit.');
			
		$('#hiddenProductCategoryId').val($('#hiddenCategoryId'+rowCount).val());
		
		$('#txtPerRatePerUnitFlag').val($('#textPerRatePerUnitFlag' + rowCount).val());

	}

	function resetValues() {

		$('#Patient_PopUp_Form').find('input:text').val('');
		$('#Patient_PopUp_Form').find('input:hidden').val('');

	}

	function myfunctionPurchase() {
		var ProductId = $("#hiddenProductId").val();
		var Qty = 1;//$("#txtQty").val();
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
		if (Rate == "0" || Rate == "undefined" || Rate == "") {
			alert("Enter Rate");
			$("#txtRate").val('');
			$("#txtRate").focus();
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
		} else {
			
			if ($('#hiddenProductId').val() != "")
				toCreatePatientSaleBillDiv('RowCount', $('#hiddenCurrentRow')
						.val(),"insert");
		}
	}
</script>

<!-- <div class="col-md-9-1" style="margin-top: 9px;">
										<div class="col-md-1-1" style="margin-top: 0px;">
											<b>Product</b>
										</div>
										<div class="col-md-3-1"
											style="margin-top: 0px; margin-left: 24px">
											<input type="hidden" id="hiddenProductId" /> <input
												type="text" id="particulars" name="txtProductName"
												class="form-control input-SmallText col-md-7-1 margin-1"
												placeholder="Product" tabindex="1" autofocus="autofocus"
												maxlength="25" autocomplete="off"
												onkeypress="return setValuesToAutocomplete(event)" >

										</div>
										<div class="col-md-2-1"
											style="margin-top: 0px; margin-left: -27px">
											<div class="col-md-1-1" style="margin-top: -22px;">
												<b>Unit</b>
											</div>
											<input type="text" id="txtUnit" name="txtUnit"
												readonly="readonly" class="form-control input-SmallText"
												placeholder="Unit" maxlength="25" required="required">
										</div>
										<div class="col-md-2-1" style="margin-top: 0px;">
											<div class="col-md-1-1" style="margin-top: -22px;">
												<b>Pack</b>
											</div>
											<input type="text" id="txtPack" name="txtPack"
												readonly="readonly" class="form-control input-SmallText"
												placeholder="Pack" maxlength="25" required>
										</div>
										<div class="col-md-2-1" style="margin-top: 0px;">
											<div class="col-md-1-1" style="margin-top: -22px;">
												<b>Comp</b>
											</div>
											<input type="text" id="txtComp" name="txtComp"
												readonly="readonly" class="form-control input-SmallText"
												placeholder="Comp" maxlength="25" required>
										</div>
										<div class="col-md-2-1" style="margin-top: 0px;">
											<div class="col-md-1-1" style="margin-top: -22px;">
												<b>AvailQty</b>
											</div>
											<input type="text" id="txtAvailQty" name="txtAvailQty"
												readonly="readonly" value="0"
												class="form-control input-SmallText" placeholder="AvailQty"
												maxlength="25" required>
										</div>
									</div> -->
<!-- id=Patient_PopUp_Form -->
<!-- <div id="" class="modal fade in">
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
									<div class="form-group">
										<label for="product">Product</label> 
										
										<input type="hidden"
											id="hiddenProductId" value="0" /> 
											
											<input type="hidden"
											id="hiddenProductPrescription" value="0" />
											
											<input type="hidden"
											id="hiddenProductCategoryId" value="0" /> 
											
											<input type="hidden"
											id="txtPerRatePerUnitFlag" value="0" /> 
											<input
											type="hidden" id="txtRateForPrint" /> <input type="text"
											id="particulars" name="txtProductName"
											class="typehead form-control input-SmallText"
											placeholder="Product" tabindex="1" autofocus="autofocus"
											autocomplete="off"
											onkeypress="return setValuesToAutocomplete(event)" required>
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
											class="form-control input-SmallText" placeholder="AvailQty"
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
												required
												onblur="isFloatingPoint('txtQty'),calculatePatientDisc(),validationsOfQty();">
											<div class='col-md-1-1 center'
												style='margin-top: -42px; margin-left: 47px; color: red;'>
												<b> *</b>
											</div>

										</div>
									</div>
									<div class="col-md-8-1" style="margin-top: 20px; float: right;">
										<div class="col-md-5-1" style="margin-top: 0px;">
											<b>Current Batch Stck</b>
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
											<input type="hidden" id="hiddenBatchId"> <label
												for="product">Batch No</label> <input type="text"
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
												style='margin-top: -42px; margin-left: 34px; color: red;'>
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
												placeholder="Pur Rate" required>
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
												required onchange="calculatePatientDisc();">
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
												maxlength="25" required onblur="calculatePatientDisc();">
										</div>
									</div>

									<div class="col-md-8-1" style="margin-top: 20px; float: right;">
										<div class="col-md-5-1" style="margin-top: -1px;">
											<b>Discount Amount</b>
										</div>
										<div class="col-md-4-1" style="margin-top: -1px;">
											<input type="text" id="txtDiscAmt" name="txtDiscAmt"
												class="form-control input-SmallText" 
												placeholder="Discount Amount" maxlength="25" required
												onkeyup="calculatePatientDisc();">
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
											<b>GST%</b>
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
									 I am a So <span id="js-rotating">Simple, Very Doge, Much
								Wow, Such Cool</span> Text Rotator
								<div class="form-group" style="float: right;" id="mydiv">

									<label for="product"><span id="js-rotating"></span></label> <input
										type="text" id="txtRatePerUnit" name="txtCompany" readonly
										class="form-control input-SmallText"
										placeholder="Rate Per Unit">
								</div>
							</div>
						</div>
					</div>
					/BOX
				</div>
				BODYtoCreatePatientSaleBillDiv('RowCount', $('#').val())
				<div class="modal-footer">
					<div class="form-group col-md-7-1"
						style="margin-top: 1px; margin-left: 3px">
						<button type="button" class="btn btn-primary"
							id="btnSubContractingMaterialIssueSave"
							name="btnSubContractingMaterialIssueSave"
							onclick="myfunctionPurchase()">Ok</button>
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
<input type="hidden" id="txtPre" value="0">
<input type="hidden" id="txtShelf" value="0">

<input type="hidden" id="txtMRP" value="0">
<input type="hidden" id="txtQty" value="1">
<input type="hidden" id="txtRate" value="0">
<input type="hidden" id="txtAmt" value="0">

<input type="hidden" id="txtBatchNo" value="0">
<input type="hidden" id="txtExpiry" value="0">
<input type="hidden" id="txtVat" value="0.0">
<input type="hidden" id="txtVatid" value="0">

<input type="hidden" id="hiddenProductPrescription" value="0">

<input type="hidden" id="txtRatePerUnit" value="0">
<input type="hidden" id="hiddenBatchId" value="0">
<input type="hidden" id="hiddenStockId" value="0">
<input type="hidden" id="txtClStk" value="0">

<input type="hidden" id="txtTotalStk" value="0">
<input type="hidden" id="txtPurchaseRate" value="0">
<input type="hidden" id="txtDis" value="0">
<input type="hidden" id="txtDiscAmt" value="0">

<input type="hidden" id="txtPerRatePerUnitFlag" value="0">
<input type="hidden" id="txtRateForPrint" value="0">
<input type="hidden" id="textBatchId" value="0">
<input type="hidden" id="hiddenProductCategoryId" value="0">
<input type="hidden" id="fordoctorstationmediciencount" value="1">

<%@include file="pharma_patient_sales_batch_pop_up.jsp"%>