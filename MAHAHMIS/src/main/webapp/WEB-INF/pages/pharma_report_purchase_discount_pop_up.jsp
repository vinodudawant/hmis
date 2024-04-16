<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>

<div id="discountPopUp" class="modal fade in"
	style="height: 500px;">
	<div class="modal-dialog">
		<form action="">
			<div class="modal-content">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-12 center">
						<div class="col-md-8-1" style="margin-top: 11px;">
							<h4>
								<i class="fa fa-calendar"></i>Purchase Discount Information
							</h4>
						</div>

						<div class="col-md-4-1" style="margin-top: 11px;" id='setButtons'>
							<button onclick="getPendingBillReport()"
								class="btn btn-xs btn-success" type="button">Get Report</button>


							<button style="margin-top: 1px;" type="button"
								class="btn btn-xs btn-danger" onclick="hidePopUp()"
								data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
				<div class="modal-body col-md-12">
					<div class="col-md-12-1">
						<div class='col-md-12-1' style='margin-top: 0px;'
							id="pendingBillData">
							<div
								style="width: 100%; overflow-y: scroll; height: 300px; max-height: auto; margin-left: 2%;">
								<table
									class='table  table-bordered table-striped header-fixed cf'
									border=1 style="width: 100%;">
									<thead style="background-color: peachpuff;">
										<tr>
											<th class="col-md-1-1">Vou Number</th>
											<th class="col-md-1-1">Type</th>
											<th class="col-md-1-1">Voucher Date</th>
											
											<th class="col-md-1-1">Bill No</th>
											<th class="col-md-1-1">Bill Date</th>
											<th class="col-md-1-1">Vendor Name</th>
											<th class="col-md-1-1">Bill Amount</th>
											<th class="col-md-1-1">Item Disc</th>
											<th class="col-md-1-1">Schm Disc</th>
											<th class="col-md-1-1">Spl Disc</th>
											<th class="col-md-1-1">CD%</th>
											<th class="col-md-1-1">Product Name</th>
										</tr>
									</thead>
									<tbody id="pendingBillResult" class="success">
									</tbody>
									<tr>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td><span style="float: right"><input type="text"
												name="totalAmount" id="totalAmount" readonly
												style="float: right" placeholder="Total Amount"></span>
										</td>
										<td><span style="float: right"><input type="text"
												id="itemDisc" readonly
												style="float: right" placeholder="Total Item Disc"></span></td>
										<td><span style="float: right"><input type="text"
												id="schmDisc" readonly
												style="float: right" placeholder="Total SChm Disc"></span></td>		
										<td><span style="float: right"><input type="text"
												id="splDisc" readonly
												style="float: right" placeholder="Total Special Disc"></span></td>		
										<td><span style="float: right"><input type="text"
												id="cd" readonly
												style="float: right" placeholder="Total cd"></span></td>		
										
									</tr>
									<tr>
										<td colspan='11'><span style="float:right"><strong>Total Disc Received</strong>&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="totalAmount" id="totalDisc" readonly style="float:right" placeholder="Total Amount"></span></td>
									</tr>
								</table>
								
							</div>
						</div>



						<!-- <div class='col-md-7-1' style='margin-top: 0px; margin-left: 1%;'>
							<div
								style="width: 100%; overflow-y: scroll; height: 300px; max-height: auto; margin-left: 2%;">
								<table
									class='table  table-bordered table-striped header-fixed cf'
									border=1 style="width: 100%;">
									<thead style="background-color: peachpuff;">
										<tr>
											<th class="col-md-1-1">Vou No</th>
											<th class="col-md-1-1">Type</th>
											<th class="col-md-1-1">Date</th>
											<th class="col-md-1-1">Party's Name</th>
											<th class="col-md-1-1">Qty</th>
											<th class="col-md-1-1">Schm</th>
											<th class="col-md-1-1">Rate</th>
											<th class="col-md-1-1">Amount</th>
										</tr>
									</thead>
									<tbody id="companyWiseResult" class="success">
									</tbody>
									<tr>
										<td colspan='8'><span style="float: right"><strong>Total
													Amount</strong>&nbsp;&nbsp;&nbsp;&nbsp;<input type="text"
												name="totalAmount" id="totalAmount" readonly
												style="float: right" placeholder="Total Amount"></span></td>
									</tr>
								</table>
							</div>
						</div> -->
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

	<div class="ajaxmodal">
		<!-- Place at bottom of page -->
	</div>
</div>