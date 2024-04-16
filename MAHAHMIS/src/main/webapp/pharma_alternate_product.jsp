<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_alternate_product.js"/>"></script>


<script type="text/javascript">
	function setValuesToAutocomplete1(key) {
		var findingName = $("#alternateProductName").val();
		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/product/autoSuggestionProduct",
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
					$('#alternateProductName').typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayAlterNateSearchProduct,
						scrollBar : true
					});
					$("#alternateProductName").data('typeahead1').source = resultData;
				}, 0);
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

<div id="alternate_product_popUp_form" class="modal fade in"
	style="">
	<div class="modal-dialog" style="width: 900px">
		<div class="modal-content col-md-12">
			<div class="modal-header  col-md-12">
				<div class="box-title  col-md-8 center">
					<h4>
						<i class="fa fa-calendar"></i>Alternate Product Information
					</h4>
				</div>
			</div>
			<div class="modal-body col-md-12-1">
			
				<div class="col-md-12-1" style="margin-top: 2%;margin-left:34%">
				
					<div class="col-md-2-1">
						<input type="radio" value="Product Search" name="searchAltChk" onclick="searchByProduct()" ><b>Product Search</b>
					</div>
					
					<div class="col-md-2-1">
						<input type="radio" value="Drug Search" name="searchAltChk" onclick="searchByDrug()" checked="true"><b>Drug Search</b>
					</div>
				
				</div>

				<div class='col-md-12-1' style="margin-top: 2%">
					<!-- <div class="input-group input-medium alternateProduct">
						<input type="text" id="productName" autocomplete="off" placeholder="Search Product" class="form-control" onkeypress="return searchProductName(event)"> 
						<span class="input-group-btn">
							<button class="btn btn-success" type="submit">
								<i class="fa fa-search"></i>
							</button>
						</span>
					</div> -->

					<div class="col-md-6-1" id="altPopUpProductDiv" style="display:none">
						<div class="col-md-6-1" class="typeahead1">
							<label for="product">Product</label> <input type="hidden"
								id="hiddenAlternateProductId" value="0" /> <input type="text"
								id="alternateProductName" name="txtProductName"
								class="form-control" placeholder="Product" tabindex="1"
								maxlength="25" autocomplete="off"
								onkeypress="return setValuesToAutocomplete1(event)" required>
						</div>
						<div class="col-md-6-1" style="margin-top: 14px">
							<a class="btn btn-primary nextBtn" href="javascript:;"
								onclick="searchAlternateProduct($('#hiddenAlternateProductId').val(),$('#alternateProductName').val())">
								Search <i class="fa fa-arrow-circle-right"></i>
							</a> <span id="alternateProductCount"></span>
						</div>
					</div>
					
					<div class="col-md-6-1" id="altPopUpDrugDiv">
						
							<div class="col-md-6-1" class="typeahead11">
							<label for="product">Drug</label> <input type="hidden"
								id="hiddenAlternateDrugId" value="0" /> <input type="text"
								id="alternateDrugName" name="txtDrugName"
								class="form-control" placeholder="Product" tabindex="1"
								maxlength="25" autocomplete="off"
								onkeypress="return searchByDrugName(event)" required>
						</div>
						<div class="col-md-6-1" style="margin-top: 14px">
							<a class="btn btn-primary nextBtn" href="javascript:;"
								onclick="searchAlternateDrug($('#hiddenAlternateDrugId').val(),$('#alternateDrugName').val())">
								Search <i class="fa fa-arrow-circle-right"></i>
							</a> <span id="alternateDrugCount"></span>
						</div>
						
					</div>


				</div>

				<div class="box border primary" style='margin-top: 90px;'>
					<div class="box-title">
						<h4>
							<i class="fa fa-table"></i>Alternative <span
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
									<th>Product Name</th>
									<th>Packing</th>
									<th>Unit</th>
									<th>Company</th>
									<th>Content</th>
								</tr>
							</thead>
							<tbody id='alternateProductContent'>

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