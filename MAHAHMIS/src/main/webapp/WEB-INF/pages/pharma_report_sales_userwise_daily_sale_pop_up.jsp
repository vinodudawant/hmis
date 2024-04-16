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


<div id="daily_sale" class="modal fade in" style="height: 500px;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
		
			<div class="modal-content">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-12 center">
						<div class="col-md-8-1" style="margin-top: 11px;">
							<h4>
								<i class="fa fa-user"></i>User Wise Daily Sale Information
							</h4>
							
							<p>
								<i class="fa fa-user"></i>User Name-<span id='userName' style="color:red"></span>
							</p>
						</div>

						<div class="col-md-4-1" style="margin-top: 11px;" id='setButtons'>
							<button onclick="getDailySaleData()" class="btn btn-xs btn-success" type="button">Get Report</button>
								
								
							<button style="margin-top: 1px;" type="button"
								class="btn btn-xs btn-danger" onclick="closePopUp()" data-dismiss="modal">Close</button> 
						</div>
					</div>
				</div>
				<div class="modal-body col-md-12">
					<div class="col-md-12-1">
						<!-- <div class='col-md-4-1' style='margin-top: 0px;' id="partyData">
						</div> -->
						<div class='col-md-12-1' style='margin-top: 0px; margin-left: 1%;'>
							<strong>CounterSale</strong><input type="radio" name="saleType" value="counterSale" onclick="getCounterSaleData()" checked="checked">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<strong>IndentSale</strong><input type="radio" name="saleType" value="indentSale" onclick="getIndentSaleData()">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<strong>hospitalSale</strong><input type="radio" name="saleType" value="hospitalSale" onclick="getHospitalSaleData()">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<strong>patientSale</strong><input type="radio" name="saleType" value="patientSale" onclick="getPatientSaleData()">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<strong>Total Sale</strong><input type="radio" name="saleType" value="totalSale" onclick="getTotalSaleData()">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<div style="float:right"><strong>Total Amount is</strong><input type="text" id="totalAmount" readonly></div>
							<br><Br>
							<table
								class='table  table-bordered table-striped header-fixed cf'
								border=1>
								<thead style="background-color: peachpuff;">
									<tr>
										<th>Vou No</th>
										<th>Type</th>
										<th>Patient Name</th>
										<th>Address</th>
										<th>Net Amount</th>
										
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
				</div>
			</div>
		</div>
	</div>
</div>