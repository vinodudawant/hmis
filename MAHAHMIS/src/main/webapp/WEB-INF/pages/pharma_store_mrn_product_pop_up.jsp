<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<script type="text/javascript">
	function loadPopUp(currentVal, id) {

		$("#particulars").focus();
		setTimeout(function() {
			$("#particulars").focus();
		}, 500);

		if ($('#hiddenProductId' + currentVal).val() != "") {
			editPro(currentVal);
		}

		$('#hiddenCurrentRow').val(currentVal);

		if ($('#hiddenProductId' + currentVal).val() == "") {
			resetValues();
		}

		$('#Po_Pop_Up').modal('show');

	}

	/* function loadBatchPopUp(productId) {
		
		getProductByBatch(productId);
		$('#Batch_Pop_Up').modal('show');
	} */

	function setValuesToAutocompleteProduct(key) {
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
						alert('error');
					},
					success : function(r) {
						var availableTags = [];
						var resultData = [];

						if (r.length > 0) {
							for ( var i = 0; i < r.length; i++) {
								var total = 0;

								availableTags[i] = r[i].productName + '_'
										+ r[i].productId + '-'
										+ r[i].productUnit + '-'
										+ r[i].packingMaster.packType + '-'
										+ r[i].companyMaster.compName + '-'
										+ r[i].productLastMRP + '-'
										+ r[i].productLastPurRate + '-'
										+ r[i].shelfMaster.shelfName + '-'
										+ total;
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
						$(".typeahead").html(template);
						$(".typeahead").show();

						setTimeout(
								function() {
									$('#particulars').typeahead({
										source : resultData,
										displayField : 'Name',
										valueField : 'ID',
										onSelect : displayResult,
										scrollBar : true

									});
									$("#particulars").data('typeahead').source = resultData;

								}, 100);
					}
				});
	}

	function displayResult(item) {
		var content = item.value.split("-");
		$('#hiddenProductId').val(content[0]);
		$('#txtUnit').val(content[1]);
		$('#txtPack').val(content[3]);
		$('#txtComp').val(content[2]);
		$('#txtShelf').val(content[6]);
		getProductByBatchForMRN(content[0]);
	}

	function getProductByBatchForMRN(productId) {
		//var storeName = "store";
		var storeName = "";
		jQuery.ajax({
			async : true,
			type : "GET",
			data : {
				productId : productId,
				validStore : storeName,
			},
			url : "../../pharmacy/purchase/getBatchDetails",
			error : function(error) {
				alert('error' + error);
			},
			success : function(results) {
				var jsObj = $.parseJSON(results);
				setProductByBatchForMRN(jsObj.result);

			}
		});
	}

	function setProductByBatchForMRN(result) {
		var divContent = "";
		if (result.length > 0) {
			for ( var i = 0; i < result.length; i++) {
				divContent = divContent + "<tr><td class=center>" + (i + 1)
						+ "</td><td class=center>" + result[i].batchCode
						+ "</td><td class=center>" + result[i].batchExpDate
						+ "</td><td class=center>" + result[i].clearStock
						+ "</td></tr>";
			}
		} else {
			divContent = divContent + "<th colspan=4>No Record Found</th>";
		}
		$("#divBatchStock").html(divContent);
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
		$('#txtVat').val($('#textVat' + productId).val());
		$('#txtShelf').val($('#textShelf' + productId).val());

		/* findLastPurRate($('#hiddenProductId' + productId).val()); */
		/* calculateTotalStock($('#hiddenProductId' + productId).val());
		TotalVat(productId); */

	}

	function resetValues() {
		$('#Po_Pop_Up').find('input:text').val('');
		$('#Po_Pop_Up').find('input:hidden').val('');
	}

	function myfunctionPo() {
		var ProductId = $("#hiddenProductId").val();
		var Qty = $("#txtQty").val();
		var PurRate = $('#txtPurRate').val();

		if (ProductId == "0" || ProductId == "undefined" || ProductId == "") {
			alert("Enter Proper Product Name");
			$("#particulars").val('');
			$("#particulars").focus();
			$("#hiddenProductId").val("0");
			return false;
		} else if (Qty == "0" || Qty == "undefined" || Qty == "") {
			alert("Enter Quantity");
			$("#txtQty").focus();
			return false;
		} else if (PurRate == "0" || PurRate == "undefined" || PurRate == "") {
			alert("Enter Purchase Rate");
			$("#txtPurRate").focus();
			return false;
		} else {
			$("#Po_Pop_Up").modal('hide');
			if ($('#hiddenProductId').val() != "") {
				toCreateMrnDiv('RowCount', $('#hiddenCurrentRow').val());
			}
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
									onkeypress="return setValuesToAutocompleteProduct(event)"> <input
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
								<label for="product">Quantity</label> <input type="text"
									id="txtQty" name="txtQty" class="form-control input-SmallText"
									placeholder="Qty" onblur="isNumber('txtQty');">
								<div class='col-md-1-1 center'
									style='margin-top: -45px; margin-left: 47px; color: red;'>
									<b> *</b>
								</div>
							</div>
						</div>
					</div>

					<!-- <div class="col-md-12-1" style="margin-top: 9px;">
						<div class="col-md-3-1" style="margin-top: 9px;"></div>

						<div class="col-md-9-1" style="margin-top: 9px;">
							<div class="col-md-2-1" style="margin-top: 0px;">
								<div class="form-group">
									<label for="product">Quantity</label> <input type="text"
										id="txtQty" name="txtQty" class="form-control input-SmallText"
										placeholder="Qty" onblur="isNumber('txtQty');">
									<div class='col-md-1-1 center'
										style='margin-top: -45px; margin-left: 47px; color: red;'>
										<b> *</b>
									</div>
								</div>
							</div>
						</div>
					</div> -->


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

					<div class="box border red" id='tabs' style="margin-top:100px;">
						<div class="box-title">
							<h4>
								<i class="fa fa-columns"></i><span class="hidden-inline-mobile">
									Batch Stock</span>
							</h4>
						</div>
						<div class="box-body">
							<div class="tabbable header-tabs">
								<ul class="nav nav-tabs">

									<li class="active" id='tab3'><a data-toggle="tab"
										href="#box_tab1"><i class="fa fa-calendar-o"></i> <span
											class="hidden-inline-mobile">Current Batch Stock</span></a></li>

								</ul>
								<div class="tab-content">
									<div id="" class="tab-pane fade active in">

										<div
											style="width: 100%; overflow-y: scroll; height: 200px; margin-left: 2%;">
											<table
												class="table table-striped table-bordered header-fixed cf "
												style="width: 100%;">
												<thead class="cf" style="background: white;">
													<tr>
														<th style="height: 21.5px;" class="col-md-1 center"><div>Sr.</div></th>
														<th style="height: 21.5px;" class="col-md-2 center"><div>Batch
																Code</div></th>
														<th style="height: 21.5px;" class="col-md-2 center"><div>Batch
																Expiry</div></th>
														<th style="height: 21.5px;" class="col-md-2 center"><div>Current
																Stock</div></th>
													</tr>
												</thead>

												<tbody id="divBatchStock">
													<tr>
														<th colspan="4">No Record Found</th>
													</tr>
												</tbody>
											</table>
										</div>



									</div>
								</div>
							</div>
						</div>
					</div>


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

<%@include file="BatchPopUp.jsp"%>