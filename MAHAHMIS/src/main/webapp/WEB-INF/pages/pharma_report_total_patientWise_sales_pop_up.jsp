<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script type="text/javascript">
	function closePopUp() {
		$("#schedule_sale").hide();
		location.reload();
	}
</script>


<div id="partywise_purchase" class="modal fade in"
	style="height: 500px; width: 100%;" tabindex="-1">
	<div class="modal-dialog" role="document" style="width: 100%">
		<div class="modal-content">

			<div class="modal-content">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-12 center">
						<div class="col-md-8-1" style="margin-top: 0px;">
							<h4>
								<i class="fa fa-calendar"></i>Total Sales Report(Vat)
							</h4>
						</div>

						<div class="col-md-4-1" style="margin-top: 11px;">

							<div class="col-md-12-1" id='setButtons'
								style="margin-top: 11px;">
								<button onclick="getTotalSaleReport()"
									class="btn btn-xs btn-success" id='getReportBut' type="button">Get
									Report</button>


								<button style="margin-top: 1px;" type="button"
									class="btn btn-xs btn-danger" onclick="closePopUp()"
									id='getCloseBut' data-dismiss="modal">Close</button>

							</div>

							<div class="col-md-12-1" style="margin-top: 3%">
								<div class="col-md-6-1" style="margin-top: 0%">
									<strong>Total Taxable6</strong><input type="text"
										id="taxable55" readonly="">
								</div>
								<div class="col-md-6-1" style="margin-top: 0%">
										<strong>   Total Vat 6.0<span style='margin-left:1%'></span></strong>
										<input type="text" id="vat55" readonly="">
									
								</div>
							</div>

							<div style="margin-top: 1%" class="col-md-12-1">
								<div class="col-md-6-1" style="margin-top: 0%">
									<strong>Total Taxable13.5</strong><input type="text"
										id="taxable125" readonly="">
								</div>

								<div class="col-md-6-1"	style="margin-top: 0%">
									
										<strong>Total Vat 13.5</strong>
									
										<input type="text" id="vat125" readonly="">
									
								</div>

							</div>

							<div style="margin-top: 1%" class="col-md-12-1">
								<div class="col-md-6-1" style="margin-top: 0%">
									<strong>Total Taxable0</strong><input type="text" id="taxable0"
										readonly="">
								</div>
								<div class="col-md-6-1" style="margin-top: 0%">
										<strong>Total Vat <span style='margin-left:1%'>0.0</span> </strong>
										<input type="text" id="vat0" readonly="">
								</div>
							</div>

							<div class="col-md-12-1" style="margin-top: 1%">
								<div class="col-md-6-1" style="margin-top: 0%"></div>
								<div class="col-md-6-1" style="margin-top: 0%">
									<strong>Total net amt</strong><input type="text" readonly=""
										id="netAmt">
								</div>


							</div>

						</div>


					</div>
				</div>
				<div class="modal-body col-md-12">
					<div class="col-md-12-1">
						<!-- <div class='col-md-4-1' style='margin-top: 0px;' id="partyData">
						</div> -->
						<div class='col-md-12-1' style='margin-top: 0px;'>

							<table
								class='table  table-bordered table-striped header-fixed cf'
								border=1>
								<thead style="background-color: peachpuff;">
									<tr>
										<th class="col-md-1-1">Bill Id</th>
										<th class="col-md-1-1">Date</th>
										<th class="col-md-1-1">Patient Name</th>
										<th class="col-md-1-1">Net Amt</th>
										<th class="col-md-1-1">Cash Receive</th>
										<th class="col-md-1-1">Vat 6</th>
										<th class="col-md-1-1">Taxable 6</th>
										<th class="col-md-1-1">Vat 13.5</th>
										<th class="col-md-1-1">Taxable 13.5</th>
										<th class="col-md-1-1">Vat 0</th>
										<th class="col-md-1-1">Taxable 0</th>
										<th class="col-md-1-1">Pending Amt</th>
										<th class="col-md-1-1">Transation Type</th>
									</tr>
								</thead>
								<tbody id="partyWiseResult" class="success">
								</tbody>
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
		</div>
	</div>
</div>