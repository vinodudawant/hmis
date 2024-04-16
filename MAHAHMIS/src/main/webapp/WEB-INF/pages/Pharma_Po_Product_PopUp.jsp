<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%-- <script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script> --%>
	<%@include file="pharma_header.jsp"%>
<script type="text/javascript">
	function loadPopUp(currentVal, id) {

		$("#particulars").focus();
		setTimeout(function() {
			$("#particulars").focus();
		}, 500);

		if ($('#hiddenProductId' + currentVal).val() != "") {
			editPro(currentVal);
		}

		if ($('#hiddenProductId' + currentVal).val() == "") {
			resetValues();
		}
		$('#hiddenCurrentRow').val(currentVal);
		//$('#Po_Pop_Up').modal('show');
		//setValuesToAutocomplete('event',currentVal); 

	}

	/* function loadBatchPopUp(productId) {
		
		getProductByBatch(productId);
		$('#Batch_Pop_Up').modal('show');
	} */

	function setValuesToAutocomplete(key,currentVal) {
		
		var vendorName =$('#txtPartyName').val();
		if (vendorName == "" || vendorName == null || vendorName == undefined) {
			alert('please enter vendor name and State For GST and IGST !!');
			$('#txtPartyName').focus();
			return false;
		}
		
		$('#hiddenCurrentRow').val(currentVal);
		
		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				$('#txtQty').focus();
				return false;
			}
		}

		//var findingName = $("#particulars").val();
		var findingName = $("#textProductName"+currentVal).val();
		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');
		var total = 0;

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/product/autoSuggestionProductForPurchase",
					timeout : 1000 * 60 * 15,
					cache : false,
					error : function() {
						/* alert('error'); */
					},
					success : function(r) {
						//alert();
						var availableTags = [];
						var resultData = [];

						if (r.length > 0) {
							for ( var i = 0; i < r.length; i++) {
								var total = 0;
								/* if (r[i].stockMasters.length > 0) 
								{
									
										for ( var k = 0; k < r[i].stockMasters.length; k++) 
										{
											total = total
												+ parseInt(r[i].stockMasters[k].stockQtyInHand);

										}
								}	 */

								availableTags[i] = r[i].productName + '@'
										+ r[i].productId + '-'
										+ r[i].productUnit + '-'
										+ r[i].packingMaster.packType + '-'
										+ r[i].companyMaster.compName + '-'
										+ r[i].productLastMRP + '-'
										+ r[i].productLastPurRate + '-'
										+ r[i].shelfMaster.shelfName + '-'
										+ total + '-' + r[i].productShortName
										+ '-' + r[i].productCreatedBy + '-'
										+ r[i].hsn;
							}
						}

						var template = "";
						for ( var j = 0; j < availableTags.length; j++) {
							var arrValue = (availableTags[j]).split("@");
							var idValue = (arrValue[1]);
							resultData.push({
								ID : idValue,
								Name : arrValue[0]
							});

							template = template + '<li data-value="'
									+ (arrValue[1]) + '" class=""><a href="#">'
									+ arrValue[0] + '</a></li>';

						}
						$("#textProductName"+currentVal).html(template);
						$("#textProductName"+currentVal).show();

						setTimeout(
								function() {

									$("#textProductName"+currentVal).typeahead({
										source : resultData,
										displayField : 'Name',
										valueField : 'ID',
										onSelect : displayResult,
										scrollBar : true

									});
									$("#textProductName"+currentVal).data('typeahead').source = resultData;

								}, 100);
					}
				});
	}

	function displayResult(item) {
		var content = item.value.split('-');

		$('#hiddenProductId').val(content[0]);
		$('#txtUnit').val(content[1]);
		$('#txtPack').val(content[3]);
		$('#txtComp').val(content[2]);
		$('#txtMrp').val(0);
		$('#txtPurchaseRate').val(content[5]);
		$('#txtShelf').val(content[7]);
		$('#txtClStk').val(content[8]);
		/* $('#txtCGST').val(content[8]);
		$('#txtSGST').val(content[9]); */
		$('#txtHsn').val(content[10]);
		$('#txtAvailQty').val(content[txtClStk]);
		calculateTotalStock(content[0]);
		findLastPurRate(content[0]);
		$("#txtGST").val(+content[8] + +content[9]);
		/* loadBatchPopUp(content[0]); */
		fetchHsnandGst();
		myfunctionPo();
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
						var vendorStateId=$('#stateIds').val();
						
						for ( var i = 0; i < r.listpharmaproduct.length; i++) {
							
							if (vendorStateId == stateId) {
						    	$('#txtGST').val(r.listpharmaproduct[i].taxrate);
							}else{
								$('#txtIGST').val(r.listpharmaproduct[i].taxrate);
								$('#txtGST').val(0);
							} 
						    
							$('#txtHsn').val(r.listpharmaproduct[i].hsnno);
							
						}
					}
				});
				
			
	}
	function loadLastPurchasePopUp() {
		if ($('#hiddenProductId').val() != '') {
			getLastPurchaseForPo($('#hiddenProductId').val());
			setTimeout(function() {
				$("#lastPurchaseRowId1").focus();
			}, 900);
			$('#lastPurchasePopUp').modal('show');
		} else {
			alertify.error("Please Select The Product First");
			$("#particulars").focus();
		}
	}

	function getLastPurchaseForPo(productId) {
		jQuery.ajax({
			async : true,
			type : "GET",
			data : {
				productId : productId
			},
			url : "../../pharmacy/purchase/getLastPurchaseDetails",
			timeout : 1000 * 60 * 15,

			error : function(error) {
				alert('error' + error);
			},
			success : function(r) {
				if (r.length > 0) {
					splitLastPurchaseContentForPo(r);
				} else {
					$("#lastPurchaseData").html("No Record Found");
				}
			}
		});
	}

	function calculateTotalStock(productId1) {
		var inputs = [];
		inputs.push('productId=' + productId1);
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/product/getStockByProductId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						/* setBatchAvailibilityDetails(r); */
						var totalStock = 0;
						if (r.length > 0) {

							for ( var k = 0; k < r.length; k++) {
								totalStock = totalStock
										+ parseInt(r[k].stockQtyInHand);

							}
						}
						$('#txtClStk').val(totalStock);
					}
				});
	}

	function editPro(productId) {
		$('#hiddenProductId').val($('#hiddenProductId' + productId).val());
		var proName = $('#textProductName' + productId).val();
		$('#particulars').val(proName);
		var unit = $('#textUnit' + productId).val();
		$('#txtUnit').val(unit);
		var Pack = $('#textPack' + productId).val();
		$('#txtPack').val(Pack);
		var Comp = $('#textComp' + productId).val();
		$('#txtComp').val(Comp);
		var Qty = $('#textQty' + productId).val();
		$('#txtQty').val(Qty);
		$('#txtScheme').val($('#textScm' + productId).val());
		$('#txtPurRate').val($('#textPurRate' + productId).val());
		$('#txtClStk').val($('#textClStk' + productId).val());
		$('#txtHsn').val($('#txtHsn' + productId).val());
		$('#textVat').val($('#textVat' + productId).val());
		$('#txtGST').val($('#txtGST' + productId).val());
		$('#txtIGST').val($('#txtIgst' + productId).val());
		$('#txtCess').val($('#txtCess' + productId).val());
		$('#txtShelf').val($('#textShelf' + productId).val());

		findLastPurRate($('#hiddenProductId' + productId).val());
		calculateTotalStock($('#hiddenProductId' + productId).val());
		TotalVat(productId);

	}

	function resetValues() {
		$('#Po_Pop_Up').find('input:text').val('');
		$('#Po_Pop_Up').find('input:hidden').val('');
	}

	function myfunctionPo() {
		if($('#textVat').val()=="NaN" || $('#txtIGST').val()=="NaN" || $('#txtCess').val()=="NaN"){
			alert("Invalid Number Of GST Or IGST Or CESS");
			return;
		}
		if(($('#textVat').val()>0 && $('#txtCess').val()>0) || ($('#txtGST').val()>0 && $('#txtIGST').val()>0) || ($('#txtCess').val()>0 && $('#txtIGST').val()>0)){
			alert("Enter either GST or IGST or Cess Only");
			return;
		}
		var ProductId = $("#hiddenProductId").val();
		var Qty = $("#txtQty").val();
		var PurRate = $('#txtPurRate').val();

		if (ProductId == "0" || ProductId == "undefined" || ProductId == "") {
			alert("Enter Proper Product Name");
			$("#particulars").val('');
			$("#particulars").focus();
			$("#hiddenProductId").val("0");
			return false;
		} /* else if (Qty == "0" || Qty == "undefined" || Qty == "") {
			alert("Enter Quantity");
			$("#txtQty").focus();
			return false;
		} */ /* else if (PurRate == "0" || PurRate == "undefined" || PurRate == "") {
			alert("Enter Purchase Rate");
			$("#txtPurRate").focus();
			return false;
		} */ else {
			//$("#Po_Pop_Up").modal('hide');
			if ($('#hiddenProductId').val() != "") {
				toCreatPurchaseOrderDiv('RowCount', $('#hiddenCurrentRow')
						.val());
			}
		}

		if($('#textVat').val()==0){
			$('#textVat' + $('#hiddenCurrentRow').val()).val(0);
			$('#txtGST' + $('#hiddenCurrentRow').val()).val(0);
		}
		else{
		$('#textVat' + $('#hiddenCurrentRow').val()).val($('#textVat').val());//total gst tax @added by vaibhav
		$('#txtGST' + $('#hiddenCurrentRow').val()).val($('#txtGST').val());//total gst tax @added by vaibhav
		}

		
		if($('#txtCess').val()==0)
			$('#txtCess' + $('#hiddenCurrentRow').val()).val(0);
		else
		$('#txtCess' + $('#hiddenCurrentRow').val()).val($('#txtCess').val());
		
		if($('#txtIGST').val()==0)
			$('#txtIgst' + $('#hiddenCurrentRow').val()).val(0);
		else
		$('#textVat' + $('#hiddenCurrentRow').val()).val($('#txtIGST').val());
		
		
		$('#txtHsn' + $('#hiddenCurrentRow').val()).val($('#txtHsn').val());

		/*@auther:Vaibhav @code: function for total gst tax */
		var gstTotal = 0;
		for ( var i = 1; i <= $('#hiddenCurrentRow').val(); i++) {
			
			if($('#remove'+i).is(":visible")){
				var vatTot=0;
				vatTot=$('#textVat' + i).val();
				if(vatTot=='' || vatTot==null)
					vatTot=$('#txtGST' + i).val();
				
				gstTotal = gstTotal + ($('#textQty' + i).val()
						* $('#textPurRate' + i).val()
						* (vatTot / 100)) + ($('#textQty' + i).val()
								* $('#textPurRate' + i).val()
								* ($('#txtIgst' + i).val() / 100)) + ($('#textQty' + i).val()
										* $('#textPurRate' + i).val()
										* ($('#txtCess' + i).val() / 100));
			}
			
		}
		$('#textVatTotal').val(gstTotal.toFixed(2));

		/*@auther:Vaibhav @code: function for total Net Amt */
		var netTotal = 0;
		for ( var i = 1; i <= $('#hiddenCurrentRow').val(); i++) {
			netTotal = +netTotal + +$('#textAmount' + i).val();
		}
		$('#textNetTotal').val(netTotal);

		/*@auther:Vaibhav @code: function for total amt */
		var txtTotal = +$('#textNetTotal').val() + +$('#textVatTotal').val();
		$('#txtTotal').val(txtTotal);

	}
</script>


<script>
	
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
</script>

<div id="Po_Pop_Up" class="modal fade in">
	<div class="modal-dialog" style="width: 520px;">
		<form action="">
			<div class="modal-content" class="col-md-12">
				<div class="modal-header">
					<div class="box-title">
						<h4>
							<i class="fa fa-calendar"></i>Product Information
						</h4>
					</div>
				</div>
				<div class="modal-body">
					<div class="col-md-12-1" style="margin-top: 9px;">
						<div class="col-md-2-1" style="margin-top: 0px;">
							<div class="form-group">
								<label for="product">Product</label> <input type="hidden"
									id="hiddenProductId" value='0' /> <input type="text"
									id="particulars" name="txtProductName"
									class="form-control input-SmallText typeahead"
									placeholder="Product" tabindex="1" autofocus="autofocus"
									autocomplete="off"
									onkeypress="return setValuesToAutocomplete(event)"> <input
									type="hidden" id="O" value='0' />
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

						<div class="col-md-2-1" style="margin-top: 0px;">
							<div class="form-group">
								<label for="AvailQty">Cl .Stk</label><input type="text"
									id="txtClStk" name="txtClStk" readonly="readonly"
									class="form-control input-SmallText" placeholder="Cl .Stk"
									required>
							</div>
							<input type="hidden" id="txtMrp" name="txtMrp"
								readonly="readonly" class="form-control input-SmallText">
						</div>
					</div>

					<div class="col-md-12-1" style="margin-top: 9px;">
						<div class="col-md-3-1" style="margin-top: 9px;"></div>
						<div class="col-md-2-1" style="margin-top: 0px;">
							<div class="form-group">
								<div class='col-md-1-1 center'
									style='margin-top: 16px; margin-left: -34px;'>
									<label for="product">HSN NO</label>
								</div>
								<div class='col-md-11-1 center'
									style='margin-top: 19px; margin-left: -4px;'>
									<input type="text" id="txtHsn" name="txtHsn"
										class="form-control input-SmallText" placeholder="HSN NO"
										readonly="readonly" maxlength="25"  /><!-- onblur="saveHsn();" -->
									<div class='col-md-1-1 center'
										style='margin-top: -41px; margin-left: 78px; color: red;'>
										<b> *</b>
									</div>
								</div>

							</div>
						</div>
						<div class="col-md-9-1" style="margin-top: 9px;">





							<div class="col-md-2-1" style="margin-top: 0px;">
								<div class="form-group">
									<label for="product">Qty</label> <input type="text"
										id="txtQty" name="txtQty" class="form-control input-SmallText"
										placeholder="Qty" onblur="isNumber('txtQty');">
									<div class='col-md-1-1 center'
										style='margin-top: -45px; margin-left: 47px; color: red;'>
										<b> *</b>
									</div>
								</div>
							</div>

							<div class="col-md-2-1" style="margin-top: 0px;">
								<div class="form-group">
									<label for="product">Scheme</label><input type="text"
										id="txtScheme" class="form-control input-SmallText"
										placeholder="Scheme" maxlength="25"
										onblur="isNumber('txtScheme');">
								</div>
							</div>

							<div class="col-md-2-1" style="margin-top: 0px;">
								<div class="form-group">
									<div class='col-md-1-1 center'
										style='margin-top: 0px; margin-left: 3px;'>
										<label for="product">Purchase-Rate</label>
									</div>
									<div class='col-md-11-1 center'
										style='margin-top: 19px; margin-left: -4px;'>
										<input type="text" id="txtPurRate" name="txtPurRate"
											class="form-control input-SmallText" placeholder="Pur-Rate"
											maxlength="25" onblur="isFloatingPoint('txtPurRate');">
										<div class='col-md-1-1 center'
											style='margin-top: -41px; margin-left: 78px; color: red;'>
											<b> *</b>
										</div>
									</div>

								</div>
							</div>




							<div class="col-md-2-1" style="margin-top: 0px;">
								<div class="form-group">
									<div class='col-md-1-1 center'
										style='margin-top: 0px; margin-left: 35px;'>
										<label for="product">GST</label>
									</div>
									<div class='col-md-11-1 center'
										style='margin-top: -3px; margin-left: 29px;'>
										<input type="text" id="txtGST" name="txtGST" value="0.0"
											class="form-control input-SmallText" placeholder="GST"
											readonly="readonly" maxlength="25">

									</div>

								</div>
							</div>
							<div class="col-md-2-1" style="margin-top: 0px;">
								<div class="form-group">
									<div class='col-md-1-1 center'
										style='margin-top: 0px; margin-left: 35px;'>
										<label for="product">IGST</label>
									</div>
									<div class='col-md-11-1 center'
										style='margin-top: -3px; margin-left: 29px;'>
										<input type="text" id="txtIGST" name="txtIGST" value="0.0"
											class="form-control input-SmallText" placeholder="IGST"
											readonly="readonly" maxlength="25">

									</div>

								</div>
							</div>
							<div class="col-md-2-1" style="margin-top: 0px;">
								<div class="form-group">
									<div class='col-md-1-1 center'
										style='margin-top: 0px; margin-left: 35px;'>
										<label for="product">CESS</label>
									</div>
									<div class='col-md-11-1 center'
										style='margin-top: -3px; margin-left: 29px;'>
										<input type="text" id="txtCess" name="txtCess" value="0.0"
											class="form-control input-SmallText" placeholder="CESS">

									</div>

								</div>
							</div>
							
							
							<div class="col-md-3-1"
								style="margin-top: 0px; margin-left: 34px">
								<div class="form-group">
									<label for="product"></label>
									<button class="btn btn-xs btn-success" type="button"
										onclick="loadLastPurchasePopUp()">Last Purchase</button>
								</div>
							</div>

						</div>
					</div>


					<!-- <div class="form-group">
						<label for="product">Last Purchase From</label>
					</div> -->
					<!-- <div class="col-md-12-1"
						style="height: 100%; width: 100%; padding-left: 0px;">
						<table id="ItemInfoTable" border="1"
							class="table table-bordered table-striped table-condensed"
							style="height: 100%; width: 100%;">
							<thead>
								<tr>
									<th class='col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Party's Name</div></th>
									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Qty</div></th>

									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Schm</div></th>

									<th class='col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>MRP</div></th>

									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>T.rate</div></th>

									<th class='col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Pur.Rate</div></th>
								</tr>
							</thead>

							<tbody id=""
								style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
								<tr>
									<td><input type='text'
										class='form-control input-SmallText' id="textLastPartyName"
										tabindex="-1" /></td>
									<td><input type='text'
										class='form-control input-SmallText' id="textLastQty"
										tabindex="-1" /></td>

									<td><input type='text'
										class='form-control input-SmallText' id="textLastSchm"
										tabindex="-1" /></td>

									<td><input type='text'
										class='form-control input-SmallText' id="textLastMRP"
										tabindex="-1" /></td>

									<td><input type='text'
										class='form-control input-SmallText' id="textLastTrate"
										tabindex="-1" /></td>

									<td><input type='text'
										class='form-control input-SmallText' id="textLastPurRate"
										tabindex="-1" /></td>
								</tr>
							</tbody>
						</table>
					</div> -->


					<!-- /BOX-->
				</div>
				<!-- /BODY-->
				<div class="modal-footer">

					<div class="form-group col-md-7-1" style="margin-top: 15px;">
						<button type="button" class="btn btn-primary"
							id="btnSubContractingMaterialIssueSave"
							name="btnSubContractingMaterialIssueSave"
							onclick="myfunctionPo()">Ok</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>




<%@ include file="Pharma_last_purchase_pop_up.jsp"%>
<%@include file="BatchPopUp.jsp"%>













