<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script type="text/javascript">
	function loadPopUp(currentVal,id,type) {
		/* alert("current value is"+currentVal); */
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
		
		if(type=='1')
		{
			$("#type1").val("mixType");
		}
		else
		{
			$("#type").val("");
		}	
		
		$('#hiddenCurrentRow').val(currentVal);
		$('#Partywise_Po_Pop_Up').modal('show');

	}

	/* function loadBatchPopUp(productId) {
		
		getProductByBatch(productId);
		$('#Batch_Pop_Up').modal('show');
	} */

	function setValuesToAutocomplete(key) {
		$("#hiddenProductId").val("0");
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

		jQuery.ajax({

			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/product/autoSuggestionProductForPurchase",
			timeout : 1000 * 60 * 15,

			error : function(error) {
				alert('error' + error);
			},
			success : function(r) {
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

						availableTags[i] = r[i].productName + '_'
								+ r[i].productId + '-' + r[i].productUnit + '-'
								+ r[i].packingMaster.packType + '-'
								+ r[i].companyMaster.compName + '-'
								+ r[i].productLastMRP + '-'
								+ r[i].productLastPurRate + '-'
								+ r[i].shelfMaster.shelfName+ '-'
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
					$("#particulars").data('typeahead').source = resultData;

				}, 500);
			}
		});
	}

	function displayResult(item) 
	{
		var content = item.value.split("-");
		$('#hiddenProductId').val(content[0]);
		$('#txtUnit').val(content[1]);
		$('#txtPack').val(content[2]);
		$('#txtComp').val(content[3]);
		
		
		if(content[4]=='null')
		{	
			$('#txtMrp').val(0);
		}	
		else
		{	
			$('#txtMrp').val(content[4]);
		}	
		$('#txtPurchaseRate').val(content[5]);
		$('#txtShelf').val(content[6]);
		/* $('#txtClStk').val(content[7]); */
		$('#txtAvailQty').val(content[txtClStk]);
		calculateTotalStock(content[0]);
		findLastPurRate(content[0]);
		
		/* loadBatchPopUp(content[0]); */
	}
	
	function calculateTotalStock(productId1)
	{
		var inputs = [];
		inputs.push('productId=' + productId1);
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "/EhatEnterprise/pharmacy/product/getStockByProductId",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				/* setBatchAvailibilityDetails(r); */
				var totalStock=0;
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
	
	function editPro(productId) 
	{
		$('#hiddenProductId').val($('#hiddenProductId' + productId).val());
		var proName = $('#particulars' + productId).val();
		$('#particulars').val(proName);
		var unit = $('#txtUnit' + productId).val();
		$('#txtUnit').val(unit);
		var Pack = $('#txtUnit' + productId).val();
		$('#txtPack').val(Pack);
		var Comp = $('#txtComp' + productId).val();
		$('#txtComp').val(Comp);
		var Qty = $('#txtQty' + productId).val();
		$('#txtQty').val(Qty);

		$('#txtScheme').val($('#txtScheme' + productId).val());
		$('#txtPurRate').val($('#txtPurRate' + productId).val());
         
		$('#txtMrp').val($('#txtPurRate' + productId).val());
		$('#txtClStk').val($('#textStock' + productId).val());
		
		$('#txtShelf').val($('#txtShelf' + productId).val());
		findLastPurRate($('#hiddenProductId' + productId).val());
		/* calculateTotalAmt(); */
	}

	function resetValues()
	{
		$('#Partywise_Po_Pop_Up').find('input:text').val('');
		$('#Partywise_Po_Pop_Up').find('input:hidden').val('');
	}

	function myfunction() 
	{
		var ProductId = $("#hiddenProductId").val();
		var Qty = $("#txtQty").val();
   		var PurRate=$('#txtPurRate').val();
   		  		
	if (ProductId == "0" || ProductId == "undefined" || ProductId == "") 
	{
		alert("Enter Proper Product Name");
		$("#particulars").val('');
		$("#particulars").focus();
		$("#hiddenProductId").val("0");
		return false;
	}
	else if (Qty == "0" || Qty == "undefined" || Qty == "") {
		alert("Enter Quantity");
			$("#txtQty").focus();
			return false;
	}
	else if (PurRate == "0" || PurRate == "undefined" || PurRate == "") {
		alert("Enter Purchase Rate");
		$("#txtPurRate").focus();
			return false;
	}
	else
		{
		$("#Partywise_Po_Pop_Up").modal('hide');
		calculateTotalAmt();
		if ($('#hiddenProductId').val() != "")
		{
			if($("#type1").val()=='mixType')
			{
				
				toCreatPurchaseOrderDiv1('RowCount', $('#hiddenCurrentRow').val());
			}
			else
			{	
				
				toCreatPurchaseOrderDiv('RowCount', $('#hiddenCurrentRow').val());
			}	
		}
	}
}
</script>

<div id="Partywise_Po_Pop_Up" class="modal fade in">
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
									id="hiddenProductId" value='0' /> <input type="text" id="particulars"
									name="particulars" class="form-control input-SmallText typeahead"
									placeholder="Product" tabindex="1" autofocus="autofocus"
									autocomplete="off"
									onkeypress="return setValuesToAutocomplete(event)" required>
									
									<input type="hidden" name="type1" value="" id='type1'>
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
									
									<input type="hidden"
									id="txtMrp" name="txtMrp" readonly="readonly"
									class="form-control input-SmallText">
							</div>
						</div>
					</div>

					<div class="col-md-12-1" style="margin-top: 9px;">
						<div class="col-md-3-1" style="margin-top: 9px;"></div>

						<div class="col-md-9-1" style="margin-top: 9px;">
							<div class="col-md-2-1" style="margin-top: 0px;">
								<div class="form-group">
									<label for="product">Quantity</label> <input type="text" id="txtQty"
										name="txtQty" class="form-control input-SmallText"
										placeholder="Qty"  required onblur="isFloatingPoint('txtQty');">
										<div class='col-md-1-1 center'
																style='margin-top: -45px; margin-left: 47px; color: red;'>
																<b> *</b>
															</div>
								</div>
							</div>

							<div class="col-md-2-1" style="margin-top: 0px;">
								<div class="form-group">
									<label for="product">Scheme</label><input type="text"
										id="txtScheme" name="txtScheme"
										class="form-control input-SmallText" placeholder="Scheme"
										 required onblur="isFloatingPoint('txtScheme');">
								</div>
							</div>

							<div class="col-md-2-1" style="margin-top: 0px;">
								<div class="form-group">
									<label for="product">Purchase-Rate</label> <input type="text"
										id="txtPurRate" name="txtPurRate"
										class="form-control input-SmallText" placeholder="Pur-Rate"
										 required onblur="isFloatingPoint('txtPurRate');">
										<div class='col-md-1-1 center'
																style='margin-top: -41px; margin-left: 78px; color: red;'>
																<b> *</b>
															</div>
								</div>
							</div>
						</div>
					</div>


					<div class="form-group">
						<label for="product">Last Purchase From</label>
					</div>
					<div class="col-md-12-1"
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
					</div>


					<!-- /BOX-->
				</div>
				<!-- /BODY-->
				<div class="modal-footer">

					<div class="form-group col-md-7-1" style="margin-top: 15px;">
						<button type="button" class="btn btn-primary"
							id="btnSubContractingMaterialIssueSave"
							name="btnSubContractingMaterialIssueSave" onclick="myfunction()"
							>Ok</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>


<%@include file="BatchPopUp.jsp"%>













