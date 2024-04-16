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



<div id="patient_productwise_report" class="modal fade in" style="height: 500px;">
	<div class="modal-dialog">
		<form action="">
			<div class="modal-content"  style="width: 120%;">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-12 center">
						<div class="col-md-8-1" style="margin-top: 11px;">
							<h4>
								<i class="fa fa-calendar"></i>Patient Wise Sale Report Information
							</h4>
						</div>

					   
					   <div class="col-md-4-1" style="margin-top: 11px;" id='setButtons'>
					
							<button onclick="getPatientWiseSaleReturn()" class="btn btn-xs btn-success" type="button">Get Report</button>
							<button style="margin-top: 1px;" type="button"
								class="btn btn-xs btn-danger" onclick="closePopUp()" data-dismiss="modal">Close</button> 
						</div>
						
						
						<div style="float:right"><strong>Total Amount is</strong><input type="text" id="totalAmount" readonly></div>
						
					</div>
				</div>
				
				
				
				<div class="modal-body col-md-12">
					<div class="col-md-12-1">
						<div class='col-md-12-1' style='margin-top: 0px; margin-left: 1%;'>
							<table
								class='table  table-bordered table-striped header-fixed cf'
								border=1  style="width: 200%;"  >
								<thead style="background-color: peachpuff;">
									<tr>
										<th>Sr.No</th>
										<th>PatientID</th>
									    <th>Patient Name</th>
										<th>Bill No</th>
										<th>Product Name</th>
										<th>Date</th>
										<th>Time</th>
										<th>Amount</th>
										<th>Discount Amount</th>
										<th>Received Amount</th>
										<th>Remaining Amount</th>
										<th>Remark</th>
									     <th>User</th> 
										<!-- <th>Return</th>
 -->									</tr>
								</thead>
								<tbody id="patientSaleData" class="success">
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
		</form>
	</div>
</div>
