<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>

<div id="dailyBusinessPopUp" class="modal fade in"
	style="height: 800px;">
	<div class="modal-dialog">
		
			<div class="modal-content">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-12 center">
						<div class="col-md-8-1" style="margin-top: 11px;">
							<h4>
								<i class="fa fa-calendar"></i>Business At Glance
							</h4>
						</div>

						<div class="col-md-4-1" style="margin-top: 11px;" id='setButtons'>
							<button onclick="getDailyBusinessReport()"
								class="btn btn-xs btn-success" type="button">Get Report</button>


							<button style="margin-top: 1px;" type="button"
								class="btn btn-xs btn-danger" onclick="hidePopUp()"
								data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
				<div class="modal-body col-md-12">
					<div class="col-md-12-1">
						<!-- <div class='col-md-12-1' style='margin-top: 0px;'
							id="pendingBillData">
							<div
								style="width: 100%; overflow-y: scroll; height: 300px; max-height: auto; margin-left: 2%;"> -->
								<!-- <table
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
								</table> -->
								<div class="col-md-6-1">
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Cash Sale</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='cashSale'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Cash/Credit Sale</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='cashCreditSale'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1"style="margin-top:0px;">
											<strong>Credit Sale</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='creditSale'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Counter Sale</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='counterSale'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Total Sale</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='totalSale'> 
										</div>
									</div>
									
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Cash Discount</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='cashDiscount'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Item Discount</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='itemDiscount'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;"> 
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Total Discount</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='cashSale'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;"> 
											<strong>Credit Notes</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='creditNotee'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Debit Notes</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='debitNote'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Debit Notes(Pending)</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='cashSale'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Cash Purchase</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='cashPurchase'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Cash/Credit Purchase</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='cashCreditPurchase'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Total Purchase</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='totalPurchase'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Cash Receipts</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='cashReceipt'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Cash Paid</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='cashPaid'> 
										</div>
									</div>
								</div>
								
								<div class="col-md-6-1">
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Cheque Receipts</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='chequeReceipt'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Cheque Paid</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='chequePaid'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Post-dated cheques given</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='postDatedCheques'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Sundry Debtors</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='sundryDebtors'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Sundry Creditors</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='sundryDebtors'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Closing Stock</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='closingStock'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Expired Stock</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='expirdStock'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Pending CC Bills(All)</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='pendingCC'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Profit Amount</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='proffitAmt'> 
										</div>
									</div>
									
									<div class="col-md-12-1" style="margin-top:9px;">
										<div class="col-md-6-1" style="margin-top:0px;">
											<strong>Profit%</strong>
										</div>
										<div class="col-md-6-1" style="margin-top:0px;">
											<input type="text" id='proffit'> 
										</div>
									</div>
								</div>
							</div>
						<!-- </div>
					</div> -->
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
		
	</div>

	<div class="ajaxmodal">
		<!-- Place at bottom of page -->
	</div>
</div>