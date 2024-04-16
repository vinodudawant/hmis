<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>

<div id="partywise_purchase" class="modal fade in"
	style="height: 500px;">
	<div class="modal-dialog">
		<form action="">
			<div class="modal-content">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-12 center">
						<div class="col-md-8-1" style="margin-top: 11px;">
							<h4>
								<i class="fa fa-calendar"></i>PartyWise Purchase Information
							</h4>
						</div>

						<div class="col-md-4-1" style="margin-top: 11px;" id='setButtons'>
							<button onclick="getPartywisePurchaseTotalReport()"
								class="btn btn-xs btn-success" type="button">Get Report</button>


							<button style="margin-top: 1px;" type="button"
								class="btn btn-xs btn-danger" onclick="hidePopUp()"
								data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
				<div class="modal-body col-md-12">
					<div class="col-md-12-1">
						<div class='col-md-4-1' style='margin-top: 0px;' id="partyData">
						</div>

						<div class='col-md-7-1' style='margin-top: 0px; margin-left: -30%;'>
							<div
								style="width: 151%; overflow-y: scroll; height: 300px; max-height: auto; margin-left: 0%;">
								<table
									class='table  table-bordered table-striped header-fixed cf'
									border=1 style="width: 100%;">
									<thead style="background-color: peachpuff;">
										<tr>
											<th class="col-md-1-1">Vendor Name</th>
											<th class="col-md-1-1">GST Number</th>
											<th class="col-md-1-1">Assesable Value</th>
											<th class="col-md-1-1">GST amt</th>
											<th class="col-md-1-1">Total amt</th>
											<th class="col-md-1-1">Credit amt</th>
											<th class="col-md-1-1">Less amt</th>
											<th class="col-md-1-1">Payable</th>
											
										</tr>
									</thead>
									<tbody id="partyWiseResult" class="success">
									</tbody>
									<tr>
									<td>Total</td>
									
									<td><span style="float: right"></span>
										</td>
										
										<td><span style="float: right"><input type="text"
												name="totalAmount" id="totalAmount" readonly
												style="float: right" placeholder="Total Amount"></span>
										</td>
										
										<td><span style="float: right"><input type="text"
												id="totalvat" readonly
												style="float: right" placeholder="Total Vat 5.00%"></span></td>
												
										<td><span style="float: right"><input type="text"
												id="totalNetamt" readonly
												style="float: right" placeholder="Total Net Amt"></span></td>	
										
										<td><span style="float: right"><input type="text"
												id="totalAdd" readonly
												style="float: right" placeholder="Total Add"></span></td>	
										
										<td><span style="float: right"><input type="text"
												id="totalLess" readonly
												style="float: right" placeholder="Total Less"></span></td>	
												
									    <td><span style="float: right"><input type="text"
												id="totalPayable" readonly
												style="float: right" placeholder="Total Payable"></span></td>		
													
										<!-- <td colspan='8'><span style="float: right"><strong>Total
													Amount</strong>&nbsp;&nbsp;&nbsp;&nbsp;<input type="text"
												name="totalAmount" id="totalAmount" readonly
												style="float: right" placeholder="Total Amount"></span></td> -->
									</tr>
								</table>
							</div>
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
	
	<div class="ajaxmodal">
			<!-- Place at bottom of page -->
		</div>
</div>

