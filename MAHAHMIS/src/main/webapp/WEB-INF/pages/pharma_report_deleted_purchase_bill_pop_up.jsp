<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>

<div id="purchase_productwise_report" class="modal fade in" style="height: 500px;">
	<div class="modal-dialog">
		<form action="">
			<div class="modal-content">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-12 center">
						<div class="col-md-8-1" style="margin-top: 11px;">
							<h4>
								<i class="fa fa-calendar"></i>Deleted Purchase Bill Information
							</h4>
						</div>

						<div class="col-md-4-1" style="margin-top: 11px;" id='setButtons'>
							<button onclick="getProductWisePurchaseReport()" class="btn btn-xs btn-success" type="button">Get Report</button>
								
								
							<button style="margin-top: 1px;" type="button"
								class="btn btn-xs btn-danger" onclick="hidePopUp()" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
				<div class="modal-body col-md-12">
					<div class="col-md-12-1">
						<div class='col-md-12-1' style='margin-top: 0px; margin-left: 1%;'>
							<table
								class='table  table-bordered table-striped header-fixed cf'
								border=1>
								<thead style="background-color: peachpuff;">
									<tr>
										<th>Vou No</th>
										<th>Type</th>
										<th>Bill No</th>
										<th>Bill Date</th>
										<th>Batch No</th>
										<th>Party's Name</th>
										<th>Qty</th>
										<th>Rate</th>
										<th>Amount</th>
									</tr>
								</thead>
								<tbody id="productWisePurchaseData" class="success">
								</tbody>
								<tr><td colspan='9'><span style="float:right"><strong>Total Amount</strong>&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="totalAmount" id="totalAmount" readonly style="float:right" placeholder="Total Amount"></span></td></tr>
							</table>
						</div>
					</div>
					<!-- /BOX-->
				</div>
				<!-- /BODY-->
				<div class="modal-footer">

					<!-- <div class="form-group col-md-7-1"
						style="margin-top: 1px; margin-left: -64px">
						<button type="button" class="btn btn-primary"
							 onclick="closePopUp()"
							>Ok</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Redo</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					</div> -->
				</div>
			</div>
		</form>
	</div>
</div>
