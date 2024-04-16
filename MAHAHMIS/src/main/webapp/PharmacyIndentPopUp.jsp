<script type="text/javascript" src="../.././pharma-resources/js/auto/jquery.mockjax.js"></script>
<script type="text/javascript" src="../.././pharma-resources/js/app_js/Pharma_Validation.js"></script>
<script type="text/javascript" src="../.././pharma-resources/js/auto/bootstrap-typeahead.js"></script>
<script type="text/javascript">
	var requestCount = 0;
	function load(currentVal, id) {
		$("#indentProductName").focus();
		setTimeout(function() {
			$("#indentProductName").focus();
		}, 550);

		if ($('#hiddenProductId' + currentVal).val() != "") {
			editPro(currentVal);
			/* 
			$('#hiddenProductId').val(''); */
		}
		if ($('#hiddenProductId' + currentVal).val() == "") {
			
			resetValues();
		}
		$('#hiddenCurrentRow').val(currentVal);
		//$('#Pharma_Indent_PopUp_Form').modal('show');
		setCreditNoteAutocomplete('event',currentVal);
	}

	function setCreditNoteAutocomplete2(key,currentVal) {
		$('#hiddenCurrentRow').val(currentVal);
		
		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				$('#txtQty').focus();
				return false;
			}
		}

		var findingName = $("#textProductName"+currentVal).val();
		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');
		jQuery.ajax({

			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "./pharmacy/product/autoSuggestionProduct",
			timeout : 1000 * 60 * 15,

			error : function(error) {
			},
			success : function(r) {
				var availableTags = [];
				var resultData = [];

				if (r.length > 0) {
					for ( var i = 0; i < r.length; i++) {
						availableTags[i] = r[i].productName + '_'
								+ r[i].productId;
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
				$(".typehead1").html(template);
				$(".typehead1").show();

				setTimeout(function() {
					$("#textProductName"+currentVal).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true

					});
					$("#textProductName"+currentVal).data('typeahead').source = resultData;
				}, 500);
			}
		});
	}

	function displayResult(item) {
		var hiddenRowC=$('#hiddenCurrentRow').val();
		var content = item.value.split("-");
		$('#hiddenProductId').val(content[0]);
		
		var inputs = [];
		inputs.push('productID=' + content[0]);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "./pharmacy/purchase/getTotalStockDetails",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				$('#totalQty').val(r);
				$('#texttotalQty'+hiddenRowC).val(r);
			}
		});
		createRow();
	}
	
	function isNumber1(id, minLen, maxLen) {
		var min = parseInt(minLen);
		var max = parseInt(maxLen);
	   
		// alert("number field");
		var name1 = /^[0-9]+$/;
		var value1 = parseInt($('#' + id).val());
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
		var totalQty=parseInt($("#totalQty").val());
		if( totalQty < value1){
			alert("Enter Qty less than Total Qty...!");
			$('#' + id).focus();
			$('#' + id).val('');
			
			return false;
		}
		
		return true;
	}

	function setPopUpValues(number, totalRow) 
	{
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
		createRow();
	}

	function editPro(rCount) {
		var rowCount = parseInt(rCount);
		
		$('#hiddenProductId' + rowCount).val();
		$('#hiddenProductId').val($('#hiddenProductId' + rowCount).val());
		var proName = $('#textProductName' + rCount).val();
		$('#indentProductName').val(proName);
		
		
		var Qty = $('#textRequireQty' + rCount).val();
		$('#txtQty').val(Qty);
		
	}
	
	function fillRow(rCount) {
		
		var rowCount = parseInt(rCount);
		$('#hiddenProductId' + (rowCount)).val($('#hiddenProductId').val());
		$('#textProductName' + (rowCount)).val($('#indentProductName').val());
		$('#textRequireQty' + (rowCount)).val($('#txtQty').val());
	}
		
	

	function resetValues() {
		$('#Pharma_Indent_PopUp_Form').find('input:text').val('');
		$('#Pharma_Indent_PopUp_Form').find('input:hidden').val('');
		
	}

	function createRow()
	{
		var ProductId = $("#hiddenProductId").val();
		var Qty = $("#txtQty").val();
		if (ProductId == "0" || ProductId == "undefined" || ProductId == "") {
			alert("Enter Proper Product Name");
			$("#indentProductName").val('');
			$("#indentProductName").focus();
			$("#hiddenProductId").val("0");
			return false;
		}
		/* if (Qty == "0" || Qty == "undefined" || Qty == "") {
			alert("Enter Quantity");
			$("#txtQty").val('');
			$("#txtQty").focus();
				return false;
		} */
		else 
		{
			 $("#Pharma_Indent_PopUp_Form").modal('hide');
	          if ($('#hiddenProductId').val() != "")
	        	{  
	        	 	  fillRow($('#hiddenCurrentRow').val());
	        	}	   
			  
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


<div id="Pharma_Indent_PopUp_Form" class="modal fade in">
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
							<div class="col-md-15-1" style="margin-top: 9px;">
								<div class="col-md-4-1" style="margin-top: 0px;">
									<div class="form-group" id="divparticulars">
										<label for="product">Product</label> <input type="hidden"
											id="hiddenProductId" value="0" /><input type="text" id="indentProductName"
											name="indentProductName"  autofocus="autofocus"
											class="form-control input-SmallText"
											placeholder="Product" autocomplete="off" 
											onkeypress="return setCreditNoteAutocomplete(this.id)" >
									</div>
								</div>
								
								<div style="margin-top: 0px;" class="col-md-2-1">
									
										<div class="form-group">
											<label for="product">Quantity</label> <input type="text" onblur="isNumber1('txtQty',0,10);"  maxlength="25" placeholder="Qty" class="form-control input-SmallText" value="0" name="txtQty" id="txtQty">
												<div style="margin-top: -42px; margin-left: 47px; color: red;" class="col-md-1-1 center">
											<b> *</b>
										</div>
									</div>
								</div>
								
								<div style="margin-top: 0px;" class="col-md-2-1">
									
										<div class="form-group">
											<label for="product">Total Quantity</label> <input type="text" class="form-control input-SmallText" value="0" name="totalQty" id="totalQty" readonly="readonly">
										</div>
									</div>
								</div>
								
								
								<div class="col-md-4-1" style="margin-top: 4%;">
									<a onclick="showAlternateProduct()" class="btn btn-xs btn-info">Alternate Product(Alt+a)</a>
								</div>
								

							</div>
							<!-- <div class="col-md-12-1" style="margin-top: 2px;">
								<div class="col-md-1-1" style="margin-top: 0px;"></div>
								<div class="col-md-11-1" style="margin-top: 0px;">
									<div class="col-md-3-1" style="margin-top: 0px;">
										<div class="form-group">
											<label for="product">Quantity</label> <input type="text"
												id="txtQty" name="txtQty" value='0'
												class="form-control input-SmallText" placeholder="Qty" 
												maxlength="25" required onblur="isNumber('txtQty',0,10),validationsOfQty();">
												<div class='col-md-1-1 center'
											style='margin-top: -42px; margin-left: 47px; color: red;'>
											<b> *</b>
										</div>

										</div>
									</div>
									
								</div>
							</div> -->
						</div>

					</div>
					<!-- /BOX-->
				</div>
				<!-- /BODY-->
				<div class="modal-footer">
					<div class="form-group col-md-6-1"
						style="margin-top: -30px; margin-left: -64px">
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
