<%-- <script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>
	
<script
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_purchase.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/app_js/pharma_opening_stock_entry.js"/>"></script> --%>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_purchase.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_opening_stock_entry.js"/>"></script>
<%@include file="pharma_header.jsp"%>
<script type="text/javascript">
	function setValuesToAutocomplete1(key) {

		if (key != null) {
			var keycode = (key.which) ? key.which : key.keyCode;
			if (keycode == 9) {
				$('#txtQty').focus();
				return false;
			}
		}

		var findingName = $("#alternateProductName").val();
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
			cache : false,
			error : function() {
				/* alert('error'); */
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
								+ r[i].productId + '$$' + r[i].productUnit + '$$'
								+ r[i].packingMaster.packType + '$$'
								+ r[i].companyMaster.compName + '$$'
								+ r[i].productLastMRP + '$$'
								+ r[i].productLastPurRate;
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
					$('#alternateProductName').typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayAlterNateSearchProduct,
						scrollBar : true

					});
					$("#alternateProductName").data('typeahead').source = resultData;

				}, 100);
			}
		});
	}
	
	
	 function searchByDrugName(key) {
		var findingName = $("#alternateDrugName").val();
		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/drug/autoSuggestionDrug",
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
						availableTags[i] = r[i].drugName + '_'
								+ r[i].drugId;
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
				$(".typeahead11").html(template);
				$(".typeahead11").show(); 

				setTimeout(function() {
					$('#alternateDrugName').typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayAlterNateSearchDrug,
						scrollBar : true
					});
					$("#alternateDrugName").data('typeahead11').source = resultData;
				}, 0);
			}
		});
	} 
	
	
	function searchByProduct()
	{
		$("#altPopUpDrugDiv").hide();
		$("#altPopUpProductDiv").show();
	}
	
	function searchByDrug()
	{
		$("#altPopUpDrugDiv").show();
		$("#altPopUpProductDiv").hide();
	} 
	
	function displayAlterNateSearchProduct(item) {
		var content = item.value.split("$$");
		
		$('#hiddenAlternateProductId').val(content[0]);
	}
	
	function displayAlterNateSearchDrug(item) {
		var content = item.value.split("$$");
		
		$('#hiddenAlternateDrugId').val(content[0]);
	}
	 
	
	
</script>

<div id="productwise_barcode_modal" class="modal fade in"
	style="">
	<div class="modal-dialog" style="width: 900px">
		<div class="modal-content col-md-12">
			<div class="modal-header  col-md-12">
				<div class="box-title  col-md-8 center">
					<h4>
						<i class="fa fa-calendar"></i>ProductWise Barcode
					</h4>
				</div>
			</div>
			<div class="modal-body col-md-12-1">
		
			<div class="col-md-12-1" style="margin-top: 2%;margin-left:0%">
			<label class="col-md-3-1">Goods Receipt Note No :</label>
			<label id="goodsReceiptNoteNo" class="col-md-3-1"></label>
			<label class="col-md-3-1">Vendor Name :</label>
			<label id="vendorName" class="col-md-3-1"></label><br>
			<label class="col-md-3-1">Bill No :</label>
			<label id="billNo" class="col-md-3-1"></label>
			<label class="col-md-3-1">Bill Date :</label>
			<label id="billDate" class="col-md-3-1"></label>
			
			</div>
				<!-- <div class="col-md-12-1" style="margin-top: 2%;margin-left:34%">
				
					<div class="col-md-2-1">
						<input type="radio" value="Product Search" name="searchAltChk" onclick="searchByProduct()" ><b>Product Search</b>
					</div>
					
					<div class="col-md-2-1">
						<input type="radio" value="Drug Search" name="searchAltChk" onclick="searchByDrug()" checked="true"><b>Drug Search</b>
					</div>
				
				</div> -->

				<div class='col-md-12-1' style="margin-top: 2%">
					<!-- <div class="input-group input-medium alternateProduct">
						<input type="text" id="productName" autocomplete="off" placeholder="Search Product" class="form-control" onkeypress="return searchProductName(event)"> 
						<span class="input-group-btn">
							<button class="btn btn-success" type="submit">
								<i class="fa fa-search"></i>
							</button>
						</span>
					</div> -->

					<div class="col-md-6-1" id="altPopUpProductDiv" >
						<div class="col-md-6-1">
							<label for="product">Product</label> <input type="hidden"
								id="hiddenAlternateProductId" value="0" />
								<input type="text" id="alternateProductName"
									name="alternateProductName" class="form-control input-SmallText typeahead"
									placeholder="Product" tabindex="1" autofocus="autofocus"
									 autocomplete="off"
									onkeypress="return setValuesToAutocomplete1(event)" >
								
						</div>
						<div class="col-md-6-1" style="margin-top: 14px">
							<a class="btn btn-primary nextBtn" href="javascript:;"
								onclick="searchProductWiseBarcode($('#hiddenAlternateProductId').val(),$('#purchaseIdHidden').val())">
								Search <i class="fa fa-arrow-circle-right"></i>
							</a> <span id="alternateProductCount"></span>
						</div>
						<input type="hidden" value="0" id="purchaseIdHidden">
					</div>
					
					<!-- <div class="col-md-6-1" id="altPopUpDrugDiv">
						
							<div class="col-md-6-1" class="typeahead11">
							<label for="product">Product</label> <input type="hidden"
								id="hiddenAlternateDrugId" value="0" /> <input type="text"
								id="alternateDrugName" name="txtDrugName"
								class="form-control" placeholder="Search Product" tabindex="1"
								maxlength="25" autocomplete="off"
								onkeypress="return searchByDrugName(event)" required>
						</div>
						<div class="col-md-6-1" style="margin-top: 14px">
							<a class="btn btn-primary nextBtn" href="javascript:;"
								onclick="searchAlternateDrug($('#hiddenAlternateDrugId').val(),$('#alternateDrugName').val())">
								Search <i class="fa fa-arrow-circle-right"></i>
							</a> <span id="alternateDrugCount"></span>
						</div>
						
					</div> -->


				</div>

				<div class="box border primary" style='margin-top: 102px;'>
					<div class="box-title">
						<h4>
							<i class="fa fa-table"></i> <span
								id='productName'></span>
						</h4>
						<div class="tools">
							<a href="#box-config" data-toggle="modal" class="config"> <i
								class="fa fa-cog"></i>
							</a> <a href="javascript:;" class="reload"> <i
								class="fa fa-refresh"></i>
							</a> <a href="javascript:;" class="collapse"> <i
								class="fa fa-chevron-up"></i>
							</a> <a href="javascript:;" class="remove"> <i
								class="fa fa-times"></i>
							</a>
						</div>
					</div>
					<div class="box-body">
						<table class="table table-striped">
							<thead>
								<tr>
									<th>#</th>
									<th>Product Id</th>
									<th>Product Name</th>
									<th>Batch Code</th>
									<th>Bill Date</th>
									<th>Quantity</th>
									<!-- <th>Batch Code</th>
									<th>Batch Expiry</th> -->
									<!-- <th>Content</th> -->
								</tr>
							</thead>
							<tbody id='productWiseBarcodeTable'>

							</tbody>
						</table>
					</div>
				</div>
				<!-- /BOX-->
			</div>
			<!-- /BODYtoCreatePatientSaleBillDiv('RowCount', $('#hiddenCurrentRow').val())-->
			<div class="modal-footer"></div>
		</div>
	</div>
</div>