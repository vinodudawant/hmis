<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>

<div id="vatVouWisePurchase" class="modal fade in"
	style="height: 500px;">
	<div class="modal-dialog">
		<form action="">
			<div class="modal-content">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-12 center">
						<div class="col-md-8-1" style="margin-top: 11px;">
							<h4>
								<i class="fa fa-calendar"></i>VouWise GST Purchase
							</h4>
						</div>

						<div class="col-md-4-1" style="margin-top: 11px;" id='setButtons'>
							<button onclick="getVouWiseVatPurchaseReport()"
								class="btn btn-xs btn-success" type="button">Get Report</button>
  <button id="btnExport" class="btn btn-xs btn-success" value="Excel"  title="" data-placement="left" data-toggle="tooltip" data-original-title="Excel">
															<!-- <i class="fa fa-file"></i> --> Export To Excel
													</button>
													<!-- following code for Excel sheet -->
													<script type="text/javascript">
													$("[id$=btnExport]").click(function(e) {
													    window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$=gstvochwise]').html()));
													    e.preventDefault();
													});
													
													</script>

							<button style="margin-top: 1px;" type="button"
								class="btn btn-xs btn-danger" onclick="hidePopUp()"
								data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
				<div class="modal-body col-md-12">
					<div id="gstvochwise"
						style="width: 100%; overflow-y: scroll; height: 300px; max-height: auto; margin-left: 2%;">
						<table class='table  table-bordered table-striped header-fixed cf'
							border=1 style="width: 100%;">
							<thead style="background-color: peachpuff;">
								<tr>
									<th class="col-md-1-1">Vou No.</th>
									<th class="col-md-1-1">NetAmount</th>
									<th class="col-md-1-1">CGST</th>
									<th class="col-md-1-1">SGST</th>
									<th class="col-md-1-1">IGST</th>
									<th class="col-md-1-1">CESS</th>
								</tr>
							</thead>
							<tbody id="vatVouWiseWisePurchaseResult" class="success">
							</tbody>
								<tr>
									<td>Total</td>
									<td id="totalAmount"><span style="float: right"><input
											type="text" name="totalAmount" readonly style="float: right"></span></td>
									<td id="vat5"><span style="float: right"><input
											type="text" readonly style="float: right"></span></td>
									<td id="amt5"><span style="float: right"><input
											type="text" readonly style="float: right"></span></td>
									<td id="vat12"><span style="float: right"><input
											type="text" readonly style="float: right"></span></td>
									<td id="amt12"><span style="float: right"><input
											type="text" readonly style="float: right"></span></td>

								</tr>
						</table>

					</div>
				</div>
				<!-- /BODY-->
				<div class="modal-footer"></div>
			</div>
		</form>
	</div>
</div>