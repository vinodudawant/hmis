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


<div id="schedule_sale" class="modal fade in"
	style="height: 500px; width: 100%;" tabindex="-1">
	<div class="modal-dialog" role="document" style="width: 100%">
		<div class="modal-content">

			<div class="modal-content">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-12 center">
						<div class="col-md-8-1" style="margin-top: 11px;">
							<h4>
								<i class="fa fa-calendar"></i>Schedule H1 Sale Information
							</h4>
						</div>


						<div class="col-md-3-1" style="margin-top: 11px;" id='setButtons'>
							<button onclick="getDailySaleData()"
								class="btn btn-xs btn-success" type="button">Get PDF</button>


							<button style="margin-top: 1px;" type="button"
								class="btn btn-xs btn-danger" onclick="closePopUp()"
								data-dismiss="modal">Close</button>
						</div>
						<div class="col-md-1-1" style="margin-top: 11px;">
							<button id="btnExport" class="btn btn-xs btn-success "
								value="Excel" title="" data-placement="left"
								data-toggle="tooltip" data-original-title="Excel">Export
								To Excel</button>

							<script type="text/javascript">
								$("[id$=btnExport]")
										.click(
												function(e) {
													window
															.open('data:application/vnd.ms-excel,'
																	+ encodeURIComponent($(
																			'div[id$=sheduleH1Drug]')
																			.html()));
													e.preventDefault();
												});
							</script>
						</div>

					</div>
				</div>
				<div class="modal-body col-md-12">
					<div class="col-md-12-1">
						<!-- <div class='col-md-4-1' style='margin-top: 0px;' id="partyData">
						</div> -->
						<div class='col-md-12-1' style='margin-top: 0px;'
							id="sheduleH1Drug">
							<!-- 	<strong>CounterSale</strong><input type="radio" name="saleType" value="counterSale" onclick="getCounterSaleData()" checked="checked">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
							<strong>IndentSale</strong><input type="radio" name="saleType" checked="checked"
								value="indentSale" onclick="loadPopUp()">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<!-- <strong>hospitalSale</strong><input type="radio" name="saleType" value="hospitalSale" onclick="getHospitalSaleData()">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
							<strong>patientSale</strong><input type="radio" name="saleType"
								value="patientSale" onclick="getPatientSaleData()">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							 <strong>Total Sale</strong><input type="radio" name="saleType" value="totalSale" onclick="getTotalSaleData()">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
							<!-- <div style="float:right"><strong>Total Amount is</strong><input type="text" id="totalAmount" readonly></div>
							 -->
							<br>
							<Br>
							<table
								class='table  table-bordered table-striped header-fixed cf'
								border=1>
								<thead style="background-color: peachpuff;">
									<tr>
										<th class="col-md-0.5">Sr No</th>
										<th class="col-md-0.5">Doctor Name</th>
										<th class="col-md-0.5">Doctor Reg.No</th>
										<th class="col-md-1">Doctor Address</th>
										<th class="col-md-1">Patient Name</th>
										<th class="col-md-1">Patient Address</th>
										<th class="col-md-1">Name Of Drug</th>
										<th class="col-md-0.5">Qty. Supplied</th>
										<th class="col-md-0.5">Bill No</th>
										<th class="col-md-0.5">Date</th>

									</tr>
								</thead>
								<tbody id="dailySaleData" class="success">
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