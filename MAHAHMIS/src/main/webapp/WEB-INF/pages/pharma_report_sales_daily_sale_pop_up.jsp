<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script type="text/javascript">
	function closePopUp() {
		$("#Indent_Sales_Data_Form").hide();
		location.reload();
	}
</script>


<div id="daily_sale" class="modal fade in" style="height: 500px;"
	tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">

			<div class="modal-content">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-12 center">
						<div class="col-md-8-1" style="margin-top: 11px;">
							<h4>
								<i class="fa fa-calendar"></i>Daily Sale Report
							</h4>
						</div>

						<div class="col-md-4-1" style="margin-top: 11px;" id='setButtons'>
							<button onclick="getExel()" class="btn btn-xs btn-success"
								type="button">Get Report</button>


							<button style="margin-top: 1px;" type="button"
								class="btn btn-xs btn-danger" onclick="closePopUp()"
								data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
				<div class="modal-body col-md-12">
					<div class="col-md-12-1">
						<!-- <div class='col-md-4-1' style='margin-top: 0px;' id="partyData">
						</div> -->
						<div class='col-md-12-1' style='margin-top: 0px; margin-left: 1%;'>
							<strong>CounterSale</strong><input type="radio" name="saleType"
								value="counterSale" onclick="getCounterSaleData()">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<strong>IndentSale</strong><input type="radio" name="saleType"
								value="indentSale" onclick="getIndentSaleData()">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<!--<strong>hospitalSale</strong><input type="radio" name="saleType" value="hospitalSale" onclick="getHospitalSaleData()">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
							<strong>patient Sale Total</strong><input type="radio"
								name="saleType" value="patientSale" onclick="getTotalPatientSaleData()">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<strong>Total Sale</strong><input type="radio" name="saleType"
								value="totalSale" onclick="getTotalSaleData()" checked="checked">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<div style="float: right">
								<strong>Total Amount is</strong><input type="text"
									id="totalAmount" readonly>
							</div>
							<!-- <div style="margin-top:15px;margin-left:590px;"><strong>Total Receive Amount is</strong><input type="text" id="totalAmountReceive" readonly></div> -->
							<br>
							<Br>
							<div id="exelDiv">
								<table id="dailyReportTable"
									class='table  table-bordered table-striped header-fixed cf'
									border=1>
									<thead style="background-color: peachpuff;">
										<tr>
											<th>Invoice No</th>
											<th>Date</th>
											<th>Time</th>
											<th>Patient_Id</th>
											<th>Patient Name</th>
											<th>Address</th>
											<th>Pt. Cat.</th>
											<th>Credit</th>
											<th>Cash</th>
											<th>Amt Recd</th>
											<th>Curr Bal</th>
											<th>Total Bal</th>
										</tr>
									</thead>
									<tbody id="dailySaleData" class="success">
									</tbody>
									<tfoot id='tableFooter'>
									</tfoot>
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
		</div>
	</div>
</div>