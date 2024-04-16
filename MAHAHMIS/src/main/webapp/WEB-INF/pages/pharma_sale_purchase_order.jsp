<script
	src="<c:url value="../../pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script type="text/javascript">
	function clearData() {
		$('#sampleDiv').find('input:text').val('');
		$('#textMin').html('');
		$('#textStockQty').html('');
		$('#textVat').html('');
		$('#hiddenProductID').val(0);
		$('#hiddenVendorID').val(0);
		$('#textPhoneNo').html('');
		getNextAutoIncrement();
		$('#txtPoProductName').focus();
	}

	function setFocus(id) {
		$("#" + id).focus();
	}

	function setAutoSuggetionToVendor(key) {
		var findingName = $("#textPartyName").val();
		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');
		jQuery.ajax({
			global : false,
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/vendor/autoSuggestionVendor",
			timeout : 1000 * 60 * 15,
			cache : false,
			error : function(error) {
				/* alert('error' + error); */
			},
			success : function(r) {
				var availableTags = [];
				var resultData = [];
				for ( var i = 0; i < r.length; i++) {
					availableTags[i] = r[i].vendorName + "_" + r[i].vendorId
							+ "$$" + r[i].vendorAddress + "$$"
							+ r[i].vendorMobileNumber;

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
				$(".typeaheadPoVendor").html(template);
				$(".typeaheadPoVendor").show();

				setTimeout(function() {
					$('#textPartyName').typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayVendorDetails,
						scrollBar : true,

					});
					$("#textPartyName").data('typeahead').source = resultData;
				}, 500);
			}
		});

	}

	function displayVendorDetails(item) {
		var content1 = item.value.split("$$");
		$('#textAddress').val(content1[1]);
		$('#hiddenVendorID').val(content1[0]);
		$('#textPhoneNo').html(content1[2]);

	}

	function setValuesToAutocompleteForSale(key) {
		$("#hiddenProductID").val("0");
		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				return false;
			}
		}
		var findingName = $("#txtPoProductName").val();
		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');
		jQuery
				.ajax({
					global : false,
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
						for ( var i = 0; i < r.length; i++) {
							/* for ( var j = 0; j < r[i].taxMaster.length; j++) {
								if (r[i].taxMaster[j].taxName.toUpperCase() == taxName
										.toUpperCase()) {
									taxRate = r[i].taxMaster[j].taxRate;
								}
							}
 */
							availableTags[i] = r[i].productName + '_'
									+ r[i].productId + '$$' + r[i].productUnit
									+ '$$' + r[i].packingMaster.packType + '$$'
									+ r[i].companyMaster.compName + '$$'
									+ r[i].shelfMaster.shelfName + '$$'
									+ r[i].productShortName + '$$'
									+ r[i].productMarginRate + '$$'
									+ r[i].rateEqualsMrp + "$$"
									+ r[i].productMinLevel;

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
						$(".typeaheadPoProduct").html(template);
						$(".typeaheadPoProduct").show();

						setTimeout(
								function() {
									$('.typeaheadPoProduct').typeahead({
										source : resultData,
										displayField : 'Name',
										valueField : 'ID',
										onSelect : displayResultForProduct,
										scrollBar : true,

									});
									$(".typeaheadPoProduct").data('typeahead').source = resultData;
								}, 500);
					}
				});

	}

	function displayResultForProduct(item) {
		var content = item.value.split("$$");
		$('#hiddenProductID').val(content[0]);
		$('#textUnit').val(content[1]);
		$('#textCompany').val(content[2]);
		$('#textVat').html(content[5]);
		$('#textMin').html(content[8]);
		getTotalStock(content[0]);
	}

	function getTotalStock(id) {
		var inputs = [];
		inputs.push('productID=' + id);
		var str = inputs.join('&');
		jQuery.ajax({
			global : false,
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/purchase/getTotalStockDetails",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				$('#textStockQty').html(r);
			}
		});

		return true;
	}

	function savePurchaseOrderData() {
		if ($('#txtPoProductName').val() != null
				&& $('#txtPoProductName').val() != "") {
			if ($('#textPartyName').val() != null
					&& $('#textPartyName').val() != "") {
				if ($('#textOrderNo').val() != null
						&& $('#textOrderNo').val() != "") {
					var retVal = confirm("Do you want to Save?");
					if (retVal == true) {
						if ($('#hiddenVendorID').val() != null
								&& $('#hiddenVendorID').val() != "") {
							vendorId = $("#hiddenVendorID").val();
						} else {
							alertify.error("Enter Vendor Name");
							$('#textPartyName').focus();
							return false;
						}
						var materiallist = {
							ltPOslave : []
						};
						var productId = $("#hiddenProductID").val();
						var vat = $("#textVat").html();
						var qty = $("#textOrderNo").val();
						var docId = $("#hiddenPoType").val();

						/* if (qty == "" || qty == 0) {
							alertify.error("Please fill mandatory fields");
							$("#textOrderNo").focus();
							return false;
						} */

						materiallist.ltPOslave.push({
							poSlaveSr : 1,
							poSlaveAmt : 0,
							poSlaveRate : 0,
							poSlaveMrp : 0,
							poSlaveQty : qty,
							poSlaveVat : vat,
							productMaster : {
								'productId' : productId,
								'batchMaster' : [ {
									'batchId' : 0,
									'stockMaster' : {
										'stockId' : 1,
										'stockQtyInHand' : 1
									}
								} ]
							}
						});

						if (materiallist.ltPOslave.length < 0) {
							alert("Please Enter Valid Data");
							return false;
						}

						materiallist = JSON.stringify(materiallist);

						var inputs = [];

						inputs.push("ltPOslave=" + materiallist);
						inputs.push("vendorId=" + vendorId);
						inputs.push("poType=" + docId);

						var str = inputs.join('&');
						jQuery
								.ajax({
									async : true,
									type : "POST",
									data : str,
									/*url : "../indentSale/sampleTest",*/
									url : "../po/savePurchaseOrder",
									catche : false,
									error : function() {
										alert("oops something went wrong related to stock please save proper data or check mrp");
									},
									success : function(r) {
										alert("Record saved successfully..!");
										$('#sampleDiv').hide();
										$('#HSTDiv').show();
										$("#OldDiv").show();
										$('#sampleDiv').find('input:text').val(
												'');
										$('#textMin').html('');
										$('#textStockQty').html('');
										$('#textVat').html('');
										$('#textPhoneNo').html('');
										$('#hiddenProductID').val(0);
										$('#hiddenVendorID').val(0);
									}
								});

					}
				} else {
					alert("Enter Qty");
					$('#textOrderNo').focus();

				}

			} else {
				alert("Enter vendor name");
				$('#textPartyName').focus();
			}

		} else {
			alert("Enter product name");
			$('#txtPoProductName').focus();
		}

	}

	function getNextAutoIncrement() {

		var inputs = [];

		var str = inputs.join('&');
		jQuery.ajax({
			global : false,
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/po/getNextAutoIncrement",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				$("#txtOrderNo1").val(r);

			}
		});

		return true;
	}
	function hidePurchaseOrderPopUp() {
		$('#sampleDiv').hide();
		$('#HSTDiv').show();
		$('#OldDiv').show();
		$('#sampleDiv').find('input:text').val('');
		$('#textMin').html('');
		$('#textStockQty').html('');
		$('#textVat').html('');
		$('#textPhoneNo').html('');
		$('#hiddenProductID').val(0);
		$('#hiddenVendorID').val(0);

	}
</script>
<div class="box border" id="sampleDiv"
	style="margin-top: -59%; margin-bottom: -3px; width: 100%;">
	<div class="box-title"
		style="background-color: #a696ce; z-index: 60009 !important; padding: 7px 1px 1px;">
		<h4>
			<i class="fa fa-bitbucket"></i>Purchase Order
		</h4>
		<div class="tools">
			<a href="javascript:;" style="color: black;" class="col-md-12-1"
				onclick="hidePurchaseOrderPopUp();"> <i class="fa fa-times"></i>
			</a>
		</div>
		<div class="box-body border" id='well' style="height: 207px;">

			<div class="col-md-12-1" style="margin-top: -31px;">
				<div class="col-md-7-1" style="margin-top: 9px;">

					<div class="col-md-12-1" style="margin-top: 9px;">
						<div class="col-md-2-1" style="margin-top: 9px;">
							<b>Po No</b>
						</div>
						<div class="col-md-3-1" style="margin-top: 9px;">
							<input type="text" id="txtOrderNo1" name="txtOrderNo1" readonly
								class="form-control input-SmallText" placeholder="Po Number"
								tabindex="1">
						</div>
					</div>

					<div class="col-md-12-1" style="margin-top: 4px;">
						<div class="col-md-2-1" style="margin-top: 9px;">
							<b>Product</b>
						</div>
						<div class="col-md-3-1" style="margin-top: 9px;">
							<input type="text" id="txtPoProductName" name="txtPoProductName"
								class="form-control input-SmallText typeaheadPoProduct"
								placeholder="Product Name" onblur="setFocus('textPartyName');"
								onkeyup="return setValuesToAutocompleteForSale(event)">
							<input type="hidden" id="hiddenProductID" value="0" />
							<div class='col-md-1-1 center'
								style='margin-top: -25px; margin-left: 128px; color: red;'>
								<b> *</b>
							</div>
						</div>
					</div>
					<div class="col-md-12-1" style="margin-top: 4px;">
						<div class="col-md-2-1" style="margin-top: 9px;">
							<b>Unit</b>
						</div>
						<div class="col-md-3-1" style="margin-top: 9px;">
							<input type="text" id="textUnit" name="textUnit" readonly
								tabindex="1" class="form-control input-SmallText"
								placeholder="unit">
						</div>
					</div>
					<div class="col-md-12-1" style="margin-top: 4px;">
						<div class="col-md-2-1" style="margin-top: 9px;">
							<b>Company</b>
						</div>
						<div class="col-md-3-1" style="margin-top: 9px;">
							<input type="text" id="textCompany" name="textCompany" readonly
								tabindex="1" class="form-control input-SmallText"
								placeholder="Company">
						</div>
					</div>
					<div class="col-md-12-1" style="margin-top: 4px;">
						<div class="col-md-2-1" style="margin-top: 9px;">
							<b>Party Name</b>
						</div>
						<div class="col-md-3-1" style="margin-top: 9px; margin-left: 0%;">
							<input type="text" id="textPartyName" name="textPartyName"
								tabindex="1"
								class="form-control input-SmallText typeaheadPoVendor"
								placeholder="Party Name" onblur="setFocus('textOrderNo');"
								onkeypress="return setAutoSuggetionToVendor(event)"> <input
								type="hidden" id="hiddenVendorID" value="0" />
							<div class='col-md-1-1 center'
								style='margin-top: -25px; margin-left: 128px; color: red;'>
								<b> *</b>
							</div>

						</div>
					</div>
					<div class="col-md-12-1" style="margin-top: 4px;">
						<div class="col-md-2-1" style="margin-top: 9px;">
							<b>Address</b>
						</div>
						<div class="col-md-3-1" style="margin-top: 9px; margin-left: 0%;">
							<input type="text" id="textAddress" name="textAddress"
								tabindex="1" readonly class="form-control input-SmallText"
								placeholder="Address">
						</div>
					</div>

				</div>

				<div class="col-md-3-1" style="margin-top: 4px;">
					<div class="col-md-12-1" style="margin-top: 9px;">
						<div class="col-md-4-1" style="margin-top: 9px;">
							<b>Order Qty</b>
						</div>
						<div class="col-md-6-1" style="margin-top: 9px; margin-left: 0%;">
							<input type="text" id="textOrderNo" name="textOrderNo"
								tabindex="1" class="form-control input-SmallText"
								onblur="isNumber('textOrderNo',0,20),setFocus('saveButton');"
								placeholder="Order No">
							<div class='col-md-1-1 center'
								style='margin-top: -25px; margin-left: 111px; color: red;'>
								<b> *</b>
							</div>
						</div>
					</div>
					<div class="col-md-12-1" style="margin-top: 4px;">
						<div class="col-md-4-1" style="margin-top: 9px;">
							<b>Stock Qty</b>
						</div>
						<div class="col-md-6-1" style="margin-top: 9px;">
							<!-- <input type="text" id="textStockQty" name="textStockQty"
								tabindex="1" class="form-control input-SmallText"
								placeholder="Stock Qty"> -->
							<div id="textStockQty"></div>
						</div>
					</div>
					<div class="col-md-12-1" style="margin-top: 4px;">
						<div class="col-md-4-1" style="margin-top: 9px;">
							<b>Min Level</b>
						</div>
						<div class="col-md-6-1" style="margin-top: 9px;">
							<!-- <input type="text" id="textMin" name="textMin"
								class="form-control input-SmallText" placeholder="Min Level"> -->
							<div id="textMin"></div>
						</div>
					</div>
					<div class="col-md-12-1" style="margin-top: 4px;">
						<div class="col-md-4-1" style="margin-top: 9px;">
							<b>Vat</b>
						</div>
						<div class="col-md-6-1" style="margin-top: 9px;">
							<!-- <input type="text" id="textVat" name="textVat"
								class="form-control input-SmallText" placeholder="Vat"> -->
							<div id="textVat"></div>
						</div>
					</div>
					<div class="col-md-12-1" style="margin-top: 4px;">
						<div class="col-md-4-1" style="margin-top: 9px;">
							<b>Phone No</b>
						</div>
						<div class="col-md-6-1" style="margin-top: 9px;">
							<!-- <input type="text" id="textPhoneNo" name="textPhoneNo"
								tabindex="1" class="form-control input-SmallText"
								placeholder="Phone No"> -->
							<div id="textPhoneNo"></div>
						</div>
					</div>

				</div>
				<div class="col-md-1-1"
					style="margin-top: 187px; margin-left: -80px">
					<button class="btn btn-xs btn-danger" onclick="clearData();"
						type="button" id="clearBtn">Clear</button>
				</div>
				<div class="col-md-1-1"
					style="margin-top: 187px; margin-left: -154px">
					<button class="btn btn-xs btn-success"
						onblur="setFocus('clearBtn');" onclick="savePurchaseOrderData();"
						type="button" id="saveButton">Save</button>
				</div>
			</div>
		</div>
	</div>
</div>