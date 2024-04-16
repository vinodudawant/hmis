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


<div id="patient_productwise_report" class="modal fade in"
	style="height: 500px;">
	<div class="modal-dialog" style="width: 100%">
		<form action="">
			<div class="modal-content">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-12 center">
						<div class="col-md-8-1" style="margin-top: 11px;">
							<h4>
								<i class="fa fa-calendar"></i>GST Sale Report
							</h4>
						</div>

						<div class="col-md-4-1" style="margin-top: 11px;" id='setButtons'>

							<button onclick="getExel()" class="btn btn-xs btn-success"
								type="button">Get Report</button>
								
								<button id="btnExport" class="btn btn-xs btn-success" value="Excel"  title="" data-placement="left" data-toggle="tooltip" data-original-title="Excel">
															<!-- <i class="fa fa-file"></i> --> Export To Excel
													</button>
													<!-- following code for Excel sheet -->
													<script type="text/javascript">
													$("[id$=btnExport]").click(function(e) {
													    window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$=gstSaleReport]').html()));
													    e.preventDefault();
													});
													
													</script>
													
							<button style="margin-top: 1px;" type="button"
								class="btn btn-xs btn-danger" onclick="closePopUp()"
								data-dismiss="modal">Close</button>
						</div>


						<!-- <div style="float: right; hidden: true">
							<strong>Total Amount is</strong><input type="text"
								id="totalAmount" readonly>
						</div> -->

					</div>
				</div>
				<div class="modal-body col-md-12">
					<div class="col-md-12-1">
						<strong>Patient Sale Total</strong> <input type="radio"
							onclick="loadPopUp()" value="patient" name="saleType"
							checked="checked"> <strong>CounterSale</strong> <input
							type="radio" onclick="loadPopUp()" value="counter"
							name="saleType"> <strong>IndentSale</strong> <input
							type="radio" onclick="loadPopUp()" value="indent" name="saleType">
						<strong>Total Sale</strong> <input type="radio"
							onclick="loadPopUp()" value="all" name="saleType">
						<div id="gstSaleReport" class='col-md-12-1' style='margin-top: 0px; margin-left: 1%;'
							id="exelDiv">
							<h5 style="margin-left: 320px">GST Sale Report</h5>
							<div>
								<strong style="margin-left: 290px">From Date:<span
									id="fromDate"></span> To Date:<span id="toDate"></span></strong>
							</div>
							<table
								class='table  table-bordered table-striped header-fixed cf'
								border=1>
								<thead style="background-color: peachpuff;">
									<tr>
										<th>Sr.No</th>
										<th>Patient Name</th>
										<th>Invoice Date</th>
										<th>Invoice No</th>
										<th>Product Name</th>
										<th>Qty</th>
										<!-- <th>Rate</th> -->
										<th>Net Amt</th>
										<th>HSN Code</th>
										<th>GST/IGST/CESS(%)</th>
										<th>SGST/CGST Rate(%)</th>
										<th>Taxable Amt</th>
										<th>GST Amt</th>
										<th>CGST Amt</th>
										<th>SGST Amt</th>
										<th>IGST Amt</th>
										<th>CESS Amt</th>
										<th>Payment Mode</th>
										<th>Total</th>
									</tr>
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
