<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
 <scripts
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script> 
	<%-- <%@include file="pharma_header.jsp"%> --%>
<script type="text/javascript">
	function load(currentVal, id) 
	{
		var vendorName =$('#searchBox').val();
		if (vendorName == "" || vendorName == null || vendorName == undefined) {
			alert('please enter vendor name and State For GST and IGST !!');
			$('#searchBox').focus();
			return false;
		}
		$("#particulars").focus();
		setTimeout(function() {
			$("#particulars").focus();
		}, 600);

		$('#hiddenCurrentRow').val(currentVal);
		if ($('#hiddenProductId' + currentVal).val() != "") {
			editPro(currentVal);
			calculateProffit();
		}
		if ($('#hiddenProductId' + currentVal).val() == "") {
			resetValues();
			
		}
		
		//$('#Sales_Quotation_Form').modal('show');
		//setValuesToAutocomplete('event');
	}
	
	//Added By Bilal 
	function setValuesToAutocomplete(key,trcount) {
		
		var vendorName =$('#searchBox').val();
		if (vendorName == "" || vendorName == null || vendorName == undefined) {
			alert('please enter vendor name and State For GST and IGST !!');
			$('#searchBox').focus();
			return false;
		}
		
		$("#trcount").val(trcount);
		var rowCount =$('#RowCount').val();
		$('#hiddenCurrentRow').val(rowCount);
		/* if ($('#hiddenProductId' + rowCount).val() != "") {
			
			editPro(trcount);
			
		} */
		if ($('#hiddenProductId' + trcount).val() == "") {
			
			resetHidden();
			
		}
		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				$('#txtQty').focus();
				return false;
			}
		}
		var isVMI=$('#isVMI').val();
		var findingName = $("#textProductName" + trcount).val();
		var inputs = [];
		inputs.push('letter=' + findingName);
		inputs.push('vmi=' + isVMI);
		var str = inputs.join('&');


		            jQuery.ajax({
			        async : true,
			        type : "GET",
			        data : str + "&reqType=AJAX",
					url : "../../pharmacy/product/autoSuggestionProductForPurchase",
					timeout : 1000 * 60 * 15,
					cache : false,
					error : function(error) {
						/* alert('error' + error); */
					},
					success : function(r) {
						var availableTags = [];
						var resultData = [];
						var taxName = 'vat';
						var taxRate = 0;
						for ( var i = 0; i < r.length; i++) {
							var total = 0;
							/* if (r[i].stockMasters.length > 0) {

								for ( var k = 0; k < r[i].stockMasters.length; k++) {
									total = total
											+ parseInt(r[i].stockMasters[k].stockQtyInHand);

								}
							} */
				/* 	for ( var j = 0; j < r[i].taxMaster.length; j++) {
								if (r[i].taxMaster[j].taxName.toUpperCase() == taxName
										.toUpperCase()) {
									taxRate = r[i].taxMaster[j].taxRate;
								}
							}  */
							//below function is for getting total stock
							/* availableTags[i] = r[i].productName + '_'
									+ r[i].productId + '-' + r[i].productUnit
									+ '-' + r[i].packingMaster.packType + '-'
									+ r[i].companyMaster.compName + '-' + total
									+ '-' + taxRate; */

							availableTags[i] = r[i].productName + '_'
									+ r[i].productId + '$$' + r[i].productUnit
									+ '$$' + r[i].packingMaster.packType + '$$'
									+ r[i].companyMaster.compName + '$$'
									+ r[i].shelfMaster.shelfName + '$$'
									+ r[i].productShortName + '$$' 
									+ r[i].productMarginRate+'$$'
									+r[i].rateEqualsMrp
									+'$$'
									+r[i].hsn
									+'$$'
									+r[i].igst
									+'$$'
									+r[i].cess
									;

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
						$("#textProductName"+rowCount).html(template);
						$("#textProductName"+rowCount).show();

						setTimeout(function() {
							$('#textProductName' + trcount).typeahead({
								source : resultData,
								displayField : 'Name',
								valueField : 'ID',
								onSelect : displayResult,
								scrollBar : true,
								

							});
							
							$("#textProductName" + trcount).data('typeahead').source = resultData;
						}, 100);
					}
				});
	}

	function shelfAutoSuggestion(key) {

		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				$('#txtQty').focus();
				return false;
			}
		}

		var findingName = $("#txtShelfNo").val();
		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/shelf/autoSuggestionShelfNames",
			timeout : 1000 * 60 * 15,

			error : function(error) {
				/* alert('error' + error); */
			},
			success : function(r) {
				var availableTags = [];
				var resultData = [];

				for ( var i = 0; i < r.length; i++) {

					availableTags[i] = r[i].shelfName + '_' + r[i].shelfId;

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
				$("#txtShelfNo").html(template1);
				$("#txtShelfNo").show();

				setTimeout(function() {
					$('#txtShelfNo').typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayShelfResult,
						scrollBar : true

					});

				}, 500);
			}
		});
	}

	function loadBatchPopUp(productId) {
		getPurchaseByBatch(productId);
		$("#rowId0").focus();
		setTimeout(function() {
			$("#rowId0").focus();
		}, 700);
		$('#Purchse_Batch_Pop_Up').modal('show');
	}

	function loadLastPurchasePopUp() {
		
		if ($('#hiddenProductId').val() != '') {
			getLastPurchase($('#hiddenProductId').val());
			setTimeout(function() {
				$("#lastPurchaseRowId1").focus();
			}, 900);
			$('#lastPurchasePopUp').modal('show');
		} else {
			alertify.error("Please Select The Product First");
			$("#particulars").focus();
		}
	}

	function setPopUpValues(number, totalRow) {
	
		if (totalRow > 0) {
			
			$('#txtRate').val($('#textBatchMRP' + number).val());
			$('#txtMrp').val($('#textBatchMRP' + number).val());
			$('#txtPRate').val($('#textNetRate' + number).val());
			$('#txtBatchNo').val($('#textBatchCode' + number).val());
			$('#txtExpiry').val($('#textBatchExpiry' + number).val());
			$('#txtVat').val($('#textVat' + number).val()); 
			$('#txtClStk').val($('#textBatchClearStock' + number).val());
			$('#txtBillRate').val($('#textBillRate' + number).val());
			$('#hiddenBatchId').val($('#textBatchPopUpBatchId' + number).val());
			$('#hiddenStockId').val($('#textBatchStockId' + number).val());
			
			//now
			/* setRateValue();
			calculateProffit();
			calculateVatAmount() ;   
			calculatePurchaseRate();  
			calculateDiscount();
			calculatePopUpTotalAmount(); */
			//now
			fetchHsnandGst();			
			calculateVatAmount();	
			myfunctionPurchase();
		}else{
			fetchHsnandGst();
			calculateVatAmount();	
			myfunctionPurchase();
		}
		
	}
	/*****
	*@author   :BILAL
	*@Date     :12-12-2017
	*@Code     :For Gst and HSN
	*****/
	function fetchHsnandGst(){
	
			    var productId = $('#hiddenProductId').val();
			
				var inputs = [];
				inputs.push('productId=' + productId);

				var str = inputs.join('&');

				jQuery.ajax({
					async : false,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/product/fetchHsnandGst",
					timeout : 2000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						//hospital state Id
						var stateId=r.stateId;
						if (stateId == 0 || stateId == null || stateId == undefined) {
							stateId = 1;
						}
						var vendorStateId=parseInt($('#stateIds').val());
						var listpharmaproduct=r.listpharmaproduct;
						
						if(listpharmaproduct!=null)
						for ( var i = 0; i < r.listpharmaproduct.length; i++) {
							    if (vendorStateId == stateId) {
							    	
							    	$('#txtVat').val(r.listpharmaproduct[i].taxrate);
								}else{
									$('#txtIgst').val(r.listpharmaproduct[i].taxrate);
									$('#txtVat').val(0);
								} 
							    //$('#txtVat').val(r.listpharmaproduct[i].taxrate);
								$('#txtHsn').val(r.listpharmaproduct[i].hsnno);
						}
						
					}
				});
				
			
	}
	
	function displayResult(item) {
		
		var content = item.value.split("$$");
		$('#hiddenProductId').val(content[0]);
		$('#txtUnit').val(content[1]);
		$('#txtComp').val(content[2]);
		$('#txtPack').val(content[3]);
		$('#txtAvailQty').val(content[4]);
		$('#txtVat').val(content[5]);
		$('#hiddenRate').val(content[6]);
		$('#hiddenRateEqualsMrp').val(content[7]);
		$('#txtHsn').val(content[8]);
		$('#txtIgst').val(content[9]);
		$('#txtCess').val(content[10]);
		fetchHsnandGst();
		//calculateVatAmount();
		getLastVendorName(content[0]);
		loadBatchPopUp(content[0]);
		
		/* calculateTotalStock(content[0]); */
	}

	/* function calculateTotalStock(productId1)
	{
		var inputs = [];
		var productId=productId1;
		inputs.push('productId=' + productId);
		jQuery.ajax({
			async : true,
			type : "GET",
			data : {
				number : number
			},
			url : "/EhatEnterprise/pharmacy/product/getStockByProductId",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				setBatchAvailibilityDetails(r); 
				var totalStock=0;
				if (r[i].length > 0) {

					for ( var k = 0; k < r[i].length; k++) {
						totalStock = totalStock
								+ parseInt(r[i].stockQtyInHand);

					}
				}
			}
		});
	} */
	
	
	function displayShelfResult(item) {
		var content = item.value.split("-");
		$('#txtShelfNo').val(content[0]);
	}

	function editPro(rCount) {
		
		//var rowCount = parseInt(rCount);
		//var productId=$('#hiddenProductId'+ rowCount).val();
		var billRate=0;
		$('#hiddenProductId').val($('#hiddenProductId' + rCount).val());
		var proName = $('#textProductName' + rCount).val();
		$('#particulars').val(proName);
		var unit = $('#textUnit' + rCount).val();
		$('#txtUnit').val(unit);
		var Pack = $('#textPack' + rCount).val();
		$('#txtPack').val(Pack);
		var Comp = $('#textCom' + rCount).val();
		$('#txtComp').val(Comp);

		var qty = $('#textQty' + rCount).val();
		$('#txtQty').val(qty);
		$('#txtScheme').val($('#textSchm' + rCount).val());
		$('#txtRate').val($('#textRate' + rCount).val());
		$('#txtMrp').val($('#textMrp' + rCount).val());
		$('#txtBatchNo').val($('#textBatch' + rCount).val());
		$('#txtExpiry').val($('#textExpiry' + rCount).val());
		$('#txtDisc').val($('#textDisc' + rCount).val());
		 $('#txtVat').val($('#textNewVat' + rCount).val()); 
		 
		 $('#txtIgst').val($('#textIgst' + rCount).val()); 
		 $('#txtCess').val($('#textCess' + rCount).val()); 
		 $('#txtHsn').val($('#textHsn' + rCount).val()); 
		 
		$('#txtPRate').val($('#textPurchaseRate' + rCount).val());
		$('#txtBillRate').val($('#billRate' + rCount).val());
		$('#txtDiscAmt').val($('#textDiscAmt' + rCount).val());
		$('#txtVatAmt').val($('#textVatAmt' + rCount).val());
		
		var vat = parseFloat($('#textNewVat' + rCount).val());
	
		if($('#txtBillRate').val()!='' && $('#txtBillRate').val().length > 0)
		    billRate = parseFloat($('#txtBillRate').val());
			
	/* 	if(($('#txtVat').val() != '') && ($('#txtVat').val().length >0))
				$('#txtVatAmt').val(((vat / 100) * (billRate)).toFixed(2)); */
		
		/* calculateDiscount(); */
		$('#txtAmount').val($('#textAmount' + rCount).val());
		getLastVendorName($('#hiddenProductId').val());
	
		/* getLastVendorName($('#hiddenProductId'+ rCount).val());   */
	}

	function resetValues() {
		$('#Sales_Quotation_Form').find('input:text').val('');
		$('#Sales_Quotation_Form').find('input:hidden').val('');
		$('#profitDiv').html(0);
	}
	/*   $('#Sales_Quotation_Form').removeClass('fade'); 
	   $('#Sales_Quotation_Form').model('hide'); */
	function myfunctionPurchase()
	   {
		  
		
		   var ProductId = $("#hiddenProductId").val();
	   		var Qty = $("#txtQty").val();
	   		var BatchNum=$('#txtBatchNo').val();
	   		var Expiry=$('#txtExpiry').val();
	   		var BillRate=$('#txtBillRate').val();
	   		var mrp=$('#txtMrp').val();
	   		var hsn=$('#txtHsn').val();
	   		
		if (ProductId == "0" || ProductId == "undefined" || ProductId == "") {
			alert("Enter Proper Product Name");
			$("#particulars").val('');
			$("#particulars").focus();
			$("#hiddenProductId").val("0");
			return false;
		}
		/* else if (Qty == "0" || Qty == "undefined" || Qty == "") {
			alert("Enter Quantity");
				$("#txtQty").focus();
				return false;
		} */
		/* else if (BatchNum == "0" || BatchNum == "undefined" || BatchNum == "") {
			alert("Enter Batch Number");
			$("#txtBatchNo").focus();
				return false;
		}
		else if (Expiry == "0" || Expiry == "undefined" || Expiry == "") {
			alert("Enter Expiry Date");
			$("#txtExpiry").focus();
				return false;
		}
		else if (mrp == "0" || mrp == "undefined" || mrp == "") {
			alert("Enter Mrp");
			$("#txtMrp").focus();
				return false;
		}
		if (BillRate == "0" || BillRate == "undefined" || BillRate == "") {
			alert("Enter Bill Rate");
			$("#txtBillRate").focus();
				return false;
		} */
	
		else {
			 //$("#Sales_Quotation_Form").modal('hide');
				if ($('#hiddenProductId').val() != "")
					{
			             toCreatePurchaseDiv('RowCount', $('#hiddenCurrentRow').val());
					}

	}
}	
	   
	   function chkDiscount()
	   {
		   var Disc=parseFloat($('#txtDisc').val());
			if(Disc>=100)
			{ 
			alert("Discount should be less than 100");
			$('#txtDisc').val('');
			$('#txtDiscAmt').val('');
			$('#txtPRate').val('');
			$('#txtVatAmt').val('');
			$('#txtRate').val('');
			calculatePurchaseRate();
			calculateVatAmount();
			/* calculateRateForFirstPurchase(); */
			
			}
	   }
	   
	  
	   function saveHsn() {

			var txtHsn = $('#txtHsn').val();
			var productId = $("#hiddenProductId").val();

			if (txtHsn != "" && txtHsn != null) {
				if (productId != "" && productId != null) {
					var inputs = [];
					inputs.push('txtHsn=' + txtHsn);
					inputs.push('productId=' + productId);
					var str = inputs.join('&');

					jQuery.ajax({
						async : true,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "../../pharmacy/product/updateProductHSN",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {
							//alert("error");
						},
						success : function() {
							alert("HSN Updated...!");
						}
					});
				} else {
					jQuery.ajax({
						async : true,
						type : "POST",
						//data : str + "&reqType=AJAX",
						url : "../../pharmacy/product/saveHSN/" + txtHsn,
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {
							//alert("error");
						},
						success : function() {
							alert("HSN Save...!");
						}
					});
				}
			}
			
			else{
				alert("Enter HSN No.");
			}
		}
	   
	
	   
	function isExpiryDateGRN(id) {

		var name1 = /^(0[1-9]|1[0-2])\/\d{2}$/;
		var value1 = $('#textExpiry' + id).val();
		var insertedDate = value1.split("/");
		var today = new Date();
		var currentMonth = (today.getMonth() + 1);
		var currentY = today.getFullYear();
		var currentYear = currentY.toString().substring(2);

		if (value1 != "" && !name1.test(value1)) {
			alert("Please Enter in 'MM/YY' format!!");
			$('#textExpiry' + id).focus();
			$('#textExpiry' + id).val('');
			return false;
		} else if (insertedDate[1] < currentYear) {
			alert("Expiry date can not be less than today!!!");
			$('#textExpiry' + id).val('');
			$('#textExpiry' + id).focus();
			return false;
		} else if (insertedDate[1] <= currentYear) {
			if (insertedDate[0] < currentMonth) {
				alert("Expiry date can not be less than today!!!");
				$('#textExpiry' + id).focus();
				$('#textExpiry' + id).val('');
				return false;
			}

		}

		return true;
	}
	
	function resetHidden(){
		var trcount=$("#trcount").val();
		$('#billRate'+trcount).val(0);
		
		$('#txtExpiry').val(0);
		$('#hiddenRateEqualsMrp').val(0);
		$('#txtUnit').val(0);
		$('#txtPack').val(0);
		$('#txtComp').val(0);
		$('#txtMrp').val(0);
		$('#txtRate').val(0);
		$('#txtAvailQty').val(0);
		$('#txtQty').val(1);
		$('#txtScheme').val(0);
		$('#hiddenBatchId').val(0);
		$('#txtBatchNo').val(0);
		
		
		$('#txtPRate').val(0);
		$('#txtDisc').val(0);
		$('#txtDiscAmt').val(0);
		$('#txtHsn').val(0);
		$('#txtVat').val(0);
		$('#txtIgst').val(0);

		$('#txtCess').val(0);
		$('#txtVatAmt').val(0);
		$('#txtLastPurchaseRate').val(0);
		$('#txtLastVendorName').val(0);
		$('#txtSubContractingMaterialIssueRemark').val(0);
		$('#txtSubContractingMaterialIssueRemark').val(0);

	
		$('#profitDiv').html(0);
		$('#shelfDiv').val(0);
		$('#txtShelfNo').val(0);
		$('#txtAmount').val(0);

	}
</script>


<!-- <div id="Sales_Quotation_Form" class="modal fade in">
	<div class="modal-dialog" style="width: 600px;">

		<div class="modal-content col-md-9">
			<div class="modal-header  col-md-12">
				<div class="box-title  col-md-8 center">
					<h4>
						<i class="fa fa-calendar"></i>Product Information1
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
										id="hiddenProductId"  value="0"/> <input type="hidden" id="hiddenRate" />
										<input type="hidden" id="hiddenRateEqualsMrp" />
									<input type="text" id="particulars" name="txtProductName"
										class="form-control input-SmallText typeahead" placeholder="Product"
										tabindex="1" autofocus="autofocus" 
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
										id="txtAvailQty" name="txtAvailQty" readonly="readonly"
										value="0" class="form-control input-SmallText"
										placeholder="Shelf"  required>
								</div>
							</div>
						</div>

						<div class="col-md-12-1" style="margin-top: 2px;">
							<div class="col-md-1-1" style="margin-top: 0px;"></div>

							<div class="col-md-11-1" style="margin-top: 0px;">
								<div class="col-md-3-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product">Qty</label> <input type="text"
											id="txtQty" name="txtQty" value="1"
											class="form-control input-SmallText" placeholder="Qty"
											 required
											onblur="isNumber('txtQty'),calculatePopUpTotalAmount();">
										<div class='col-md-1-1 center'
											style='margin-top: -35px; margin-left: 21px; color: red;'>
											<b> *</b>
										</div>
									</div>
								</div>

								<div class="col-md-3-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product">Scheme</label><input type="text"
											id="txtScheme" name="txtScheme" value="0"
											class="form-control input-SmallText" placeholder="Scheme"
											 required >
									</div>
								</div>

								<div class="col-md-3-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product">Batch No</label> <input type="hidden"
											id="hiddenBatchId"><input type="text" id="txtBatchNo"
											name="txtBatchNo" class="form-control input-SmallText"
											placeholder="Batch No"  required
											onblur="checkBatchAvailability(this.value);">
										<div class='col-md-1-1 center'
											style='margin-top: -35px; margin-left: 50px; color: red;'>
											<b> *</b>
										</div>
									</div>
								</div>

								<div class="col-md-3-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product">Expiry</label><input type="text"
											type="tel" id="txtExpiry" name="txtExpiry"
											class="form-control input-SmallText" placeholder="Expiry "
											 required
											onblur="isExpiryDate('txtExpiry');">
										<div class='col-md-1-1 center'
											style='margin-top: -35px; margin-left: 35px; color: red;'>
											<b> *</b>
										</div>
										<div class='col-md-3-1' style='margin-top:0px; margin-left:2px; color: red;'>
																	<b>(mm/yy)</b>
																</div>
									</div>
								</div>

								<div class="col-md-3-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product"></label>
										<button class="btn btn-xs btn-success"
											onclick="loadLastPurchasePopUp()">Last Purchase</button>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-12-1" style="margin-top: 2px;">
							<div class="col-md-1-1" style="margin-top: 0px;"></div>
							<div class="col-md-11-1" style="margin-top: 0px;">
								<div class="col-md-4-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product">Purchase Rate</label> <input type="text"
											id="txtPRate" name="txtPRate"
											class="form-control input-SmallText"
											placeholder="Purchase Rate"  readonly required>
									</div>
								</div>

								<div class="col-md-3-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product">Bill Rate</label><input type="text"
											id="txtBillRate" name="txtBillRate"
											class="form-control input-SmallText" placeholder="Bill Rate"
											 required
											onblur="isFloatingPoint('txtBillRate'),calculatePopUpTotalAmount(),calculateDiscount();">
										<div class='col-md-1-1 center'
											style='margin-top: -35px; margin-left: 46px; color: red;'>
											<b> *</b>
										</div>
									</div>
								</div>

								<div class="col-md-4-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product">Scheme Amt</label><input type="text"
											id="txtScheme" name="txtScheme"
											class="form-control input-SmallText" placeholder="Scheme Amt"
											 required onblur="isFloatingPoint('txtScheme');">
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
											class="form-control input-SmallText" placeholder="Discount"
											 required onchange="chkDiscount();"
											onblur="isFloatingPoint('txtDisc'),calculateDiscount();">
									</div>
								</div>

								<div class="col-md-3-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product">Disc Amt</label><input type="text"
											id="txtDiscAmt" name="txtDiscAmt" 
											class="form-control input-SmallText" placeholder="Disc Amt"
											 required onblur="calculatePurchaseRate(),calculateVatAmount();">
									</div>
								</div>
								
								<div class="col-md-3-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product">HSN No</label><input type="text"
											id="txtHsn" name="txtHsn"
											class="form-control input-SmallText" placeholder="HSN" readonly="readonly"
											 >  onblur="saveHsn()" 
									</div>
								</div>

								<div class="col-md-3-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product">GST %</label><input type="text"
											id="txtVat" name="txtVat"
											class="form-control input-SmallText" placeholder="Vat%" readonly="readonly"
											 required 
											onblur="isFloatingPoint('txtVat'),calculateVatAmount();">
									</div>
								</div>
								
								<div class="col-md-3-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product">IGST %</label><input type="text"
											id="txtIgst" name="txtIgst"
											class="form-control input-SmallText" placeholder="Vat%" readonly="readonly"
											 required 
											onblur="isFloatingPoint('txtIgst'),calculateVatAmount();">
									</div>
								</div>
								
								<div class="col-md-3-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product">CESS %</label><input type="text"
											id="txtCess" name="txtCess"
											class="form-control input-SmallText" placeholder="Vat%"
											 required 
											onblur="isFloatingPoint('txtCess'),calculateVatAmount();">
									</div>
								</div>

								<div class="col-md-3-1" style="margin-top: 0px;">
									<div class="form-group">
										<label for="product">GST Amt</label><input type="text"
											id="txtVatAmt" name="txtVatAmt"
											class="form-control input-SmallText" placeholder="Vat Amt"
											 required onblur="calculatePurchaseRate();">
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-12-1" style="margin-top: 9px;">
							<div class="col-md-4-1" style="margin-top: 9px;"></div>
						</div>

						<div class="panel-body col-md-12-1"
							style="height: 100%; width: 100%; margin-top: -6px; padding-left: 20px; border: 1px solid #b8b8b8;">
							<div class="col-md-12-1" style="margin-top: 9px;">
								<div class="col-md-2-1" style="margin-top: 9px;">
									<div class="col-md-4-1" style="margin-top: 20px;">
										<b>Lowest</b>
									</div>

								</div>
								<div class="col-md-4-1" style="margin-top: 9px;">
									<div class="col-md-10-1" style="margin-top: 0px;">
										<label for="exampleInputEmail1" class="TextFont"><b>Purchase
												Rate</b> </label> <input type="text"
											class="form-control input-SmallText"
											name="txtLastPurchaseRate" id="txtLastPurchaseRate"
											placeholder="Purchase Rate" readonly
											style="background-color: yellow; float: right;" />
									</div>

								</div>

								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-10-1" style="margin-top: 0px;">
										<label for="exampleInputEmail1" class="TextFont"><b>
												MRP</b> </label> <input type="text" class="form-control input-SmallText"
											name="txtLastMrp" id="txtLastMrp" placeholder="MRP" readonly
											style="background-color: yellow; float: right;" />
									</div>
								</div>

								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-12-1" style="margin-top: 0px;">
										<label for="exampleInputEmail1" class="TextFont"><b>
												Party's Name</b> </label> <input type="text"
											class="form-control input-SmallText" name="txtLastVendorName"
											id="txtLastVendorName" placeholder="Party's Name" readonly
											style="background-color: yellow; float: right;" />
									</div>
								</div>
							</div>

							<div class="col-md-12-1" style="margin-top: 9px;">
								<div class="col-md-2-1" style="margin-top: 9px;">
									<div class="col-md-4-1" style="margin-top: 0px;">
										<b>Scheme</b>
									</div>

								</div>
								<div class="col-md-4-1" style="margin-top: 9px;">
									<div class="col-md-10-1" style="margin-top: 0px;">
										<input type="text" class="form-control input-SmallText"
											style="float: right;"
											name="txtSubContractingMaterialIssueRemark"
											id="txtSubContractingMaterialIssueRemark"
											placeholder="Purchase Rate" readonly
											onblur="isFloatingPoint('txtSubContractingMaterialIssueRemark');" />
									</div>
								</div>

								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-10-1" style="margin-top: 0px;">
										<input type="text" class="form-control input-SmallText"
											style="float: right;"
											name="txtSubContractingMaterialIssueRemark"
											id="txtSubContractingMaterialIssueRemark" readonly
											placeholder="Remark" onblur="isFloatingPoint('txtSubContractingMaterialIssueRemark');"/>
									</div>
								</div>

								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-12-1" style="margin-top: 0px;">
										<input type="text" class="form-control input-SmallText"
											style="float: right;"
											name="txtSubContractingMaterialIssueRemark"
											id="txtSubContractingMaterialIssueRemark" readonly
											placeholder="Remark" onblur="isFloatingPoint('txtSubContractingMaterialIssueRemark');"/>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-12-1" style="margin-top: 9px; margin-left: 6%;">
							<div class="col-md-3-1" style="margin-top: 0px;">
								<div class="form-group">
									<label for="product">MRP</label> <input type="text" id="txtMrp"
										name="txtMrp" class="form-control input-SmallText"
										placeholder="Mrp"  required 
										onblur="isFloatingPoint('txtMrp'),setRateValue(),calculateProffit();">
								</div>
							</div>

							<div class="col-md-3-1" style="margin-top: 0px;">
								<div class="form-group">
									<label for="product">Rate</label><input type="text"
										id="txtRate" name="txtRate"
										class="form-control input-SmallText col-md-12-8"
										placeholder="rate"  required readonly>
									<div class="col-md-8-1" style="margin-top: 9px;">
										<b>Profit%
											<div id="profitDiv">10.0</div>
										</b>
									</div>
								</div>
							</div>

							<div class="col-md-3-1" style="margin-top: 0px;">
								<div class="form-group" id="shelfDiv">
									<label for="product">Shelf No</label><input type="text"
										id="txtShelfNo" name="txtShelfNo"
										class="typeahead form-control input-SmallText"
										placeholder="Shelf No"  required
										autocomplete="off"
										onkeypress="return shelfAutoSuggestion(event)">
								</div>
							</div>

							<div class="col-md-3-1" style="margin-top: 0px;">
								<div class="form-group">
									<label for="product">Amount</label><input type="text"
										id="txtAmount" name="txtAmount"
										class="form-control input-SmallText" placeholder="Amount"
										 required readonly>
								</div>
							</div>
						</div>
					</div>
				</div>
				/BOX
			</div>
			/BODY
			<div class="modal-footer">
				<div class="form-group col-md-7-1"
					style="margin-top: 1px; margin-left: 3px">
					<button type="button" class="btn btn-primary"
						id="btnSubContractingMaterialIssueSave"
						name="btnSubContractingMaterialIssueSave" 
						onclick="myfunctionPurchase();">Ok</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Redo</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
				</div>
			</div>
		</div>
	</div>
</div> -->


<input type="hidden" id="hiddenProductId" value="0">
<input type="hidden" id="hiddenRateEqualsMrp" value="0">
<input type="hidden" id="txtUnit" value="0">
<input type="hidden" id="txtPack" value="0">
<input type="hidden" id="txtComp" value="0">
<input type="hidden" id="txtMrp" value="0">
<input type="hidden" id="txtRate" value="0">

<input type="hidden" id="txtAvailQty" value="0">
<input type="hidden" id="txtQty" value="1">
<input type="hidden" id="txtScheme" value="0">
<input type="hidden" id="hiddenBatchId" value="0">

<input type="hidden" id="txtBatchNo" value="0">
<input type="hidden" id="txtExpiry" value="0">
<input type="hidden" id="txtPRate" value="0">
<input type="hidden" id="txtBillRate" value="0">

<input type="hidden" id="txtScheme" value="0">


<input type="hidden" id="txtDisc" value="0">
<input type="hidden" id="txtDiscAmt" value="0">
<input type="hidden" id="txtHsn" value="0">

<input type="hidden" id="txtVat" value="0">
<input type="hidden" id="txtIgst" value="0">
<input type="hidden" id="txtCess" value="0">
<input type="hidden" id="txtVatAmt" value="0">


<input type="hidden" id="txtLastPurchaseRate" value="0">
<input type="hidden" id="txtLastMrp" value="0">
<input type="hidden" id="txtLastVendorName" value="0">
<input type="hidden" id="txtSubContractingMaterialIssueRemark" value="0">

<input type="hidden" id="txtSubContractingMaterialIssueRemark" value="0">
<input type="hidden" id="txtSubContractingMaterialIssueRemark" value="0">
<input type="hidden" id="profitDiv" value="0">
<input type="hidden" id="shelfDiv" value="0">

<input type="hidden" id="txtShelfNo" value="0">
<input type="hidden" id="txtAmount" value="0">
<!-- <input type="hidden" id="particulars" value="-"> -->

<%@ include file="pharma_purchase_batch_PopUp.jsp"%>
<%@ include file="Pharma_last_purchase_pop_up.jsp"%>