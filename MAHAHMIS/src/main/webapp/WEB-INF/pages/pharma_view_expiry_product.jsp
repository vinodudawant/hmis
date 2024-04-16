<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>


 <script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_alternate_product.js"/>"></script> 
	<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_alternate_product.js"/>"></script>
	

<script type="text/javascript">
function fetchBatchDetailsByExpiry() {
	
	var from = $("#txtDate").val();
	var to = $("#txtDate").val();
	var callform='all';
	var date1=  from.split('/');
	var date2= date1[2]+'-'+date1[1]+'-'+date1[0];
	
	//Added By TK for adding 1 month in current month 
	/* var arryDate = to.split("/");	
	var cDay =parseInt(arryDate[0]);var cMon =parseInt(arryDate[1]);var cYr =parseInt(arryDate[2]);
	var nm = cMon+1;
	var exMon =( nm<=12  ? nm: 1 );
	var exY	= (nm<=12  ?  cYr : (cYr+1));
	cDay = (cDay<=9 ? ("0"+cDay): cDay);
	exMon = (exMon<=9 ? ("0"+exMon): exMon);
	var expectedDate=cDay+"/"+exMon+"/"+exY; */
	
	
	if (from != '') {
		var inputs = [];
		inputs.push('from=' + date2);
		inputs.push('to=' + date2);
		inputs.push('callform='+callform);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/report/getNearExpiryReport",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				$("#expiryPopUp").show();
				setTableDataForExpiryDate(r);

			}
		});
		return true;
	} else {
		alertify.error('Please Fill All the Details');
	}

}

function setTableDataForExpiryDate(result) 
{
	var divContent = "";
	 divContent = divContent
		+"<div class='col-md-12-1' style='margin-top:10px;'></div>"
		+"<table border=1 id='printTable' class='table table-striped table-bordered header-fixed cf ' > <thead style='background-color: peachpuff;'><tr><th>No</th><th>Product Name</th><th>Batch Code</th><th>Batch Expiry</th></tr></thead>"
				+ "	<tbody id='patientSaleData' class='success' style='height: 05px;'> ";
	for ( var i = 0; i < result.length; i++) {
		divContent = divContent + "<tr><td>" + (i + 1) + "</td><td>"
				+ result[i].productName + "</td><td>" + result[i].batchCode
				+ "</td><td>" + result[i].batchExpiry + "</td></tr>";
	}

	$("#expiryBatchCode").html("</tbody>"+divContent);
	
}
</script>

<div id="view_expiry_popUp_form" class="modal fade in"
	style="height: 600px">
	<div class="modal-dialog" style="width: 900px">
		<div class="modal-content col-md-12">
			<div class="modal-header  col-md-12">
				<div class="box-title  col-md-8 center">
					<h4>
						<i class="fa fa-calendar"></i>Near Expiry Product
					</h4>
				</div>
			</div>
			<div class="modal-body col-md-12-1">
			
				<!-- <div class="col-md-12-1" style="margin-top: 2%;margin-left:34%">
				
					<div class="col-md-2-1">
						<input type="radio" value="Product Search" name="searchAltChk" onclick="searchByProduct()" ><b>Product Search</b>
					</div>
					
					<div class="col-md-2-1">
						<input type="radio" value="Drug Search" name="searchAltChk" onclick="searchByDrug()" checked="true"><b>Drug Search</b>
					</div>
				
				</div> -->

				<div class='col-md-12-1' style="margin-top: 2%">
				 <div class="input-group input-medium alternateProduct">
					<button id="btnExport" class="btn btn-xs btn-success" value="Excel" title="" data-placement="left" data-toggle="tooltip" data-original-title="Excel"> Export To Excel </button>	
									</div>
										<script type="text/javascript">
													$("[id$=btnExport]").click(function(e) {
													    window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$=expiryBatchCode]').html()));
													    e.preventDefault();
													});
													
													</script>
					</div> 
				<!-- 	<div class="col-md-6-1" id="altPopUpProductDiv" style="display:none">
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
					</div> -->
					
			<!-- 		<div class="col-md-6-1" id="altPopUpDrugDiv">
						
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
 -->

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
					<!-- <div class="box-body">
						<table class="table table-striped">
							<thead>
								<tr>
									<th>#</th>
									<th>Product Name</th>
									<th>Batch Code</th>
									<th>Batch Expiry</th>
								
								</tr>
							</thead>
							<tbody id='expiryBatchCode'>
                            <div id="expiryBatchCode"
														class="box border col-md-12"
														style="overflow-y: scroll;  height: 320px;">
							</tbody>
						</table>
					</div> -->
					<div id="expiryBatchCode" class="box border col-md-12">
														
														
					
				</div>
				<!-- /BOX-->
			</div>
			<!-- /BODYtoCreatePatientSaleBillDiv('RowCount', $('#hiddenCurrentRow').val())-->
			<div class="modal-footer"></div>
		</div>
	</div>
</div>
