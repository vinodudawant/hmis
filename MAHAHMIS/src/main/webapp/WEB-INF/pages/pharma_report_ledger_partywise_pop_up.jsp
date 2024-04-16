<%@page import="java.util.ResourceBundle"%>
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


<div id="partywise_ledger_report" class="modal fade in" style="height: 500px;">
	<div class="modal-dialog">
		<form action="">
			<div class="modal-content">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-12 center">
						<div class="col-md-8-1" style="margin-top: 11px;">
							<h4>
								<i class="fa fa-calendar"></i>Party Ledger
							</h4>
							
							<h4>
								Vendor Name:-<span id="vendorIdSpan"></span>
							</h4>
							
						</div>

					<div class="col-md-4-1" style="margin-top: 11px;" id='setButtons'>
					
							<button onclick="getPatientSaleReportVouwise()" class="btn btn-xs btn-success" type="button">Get Pdf</button>
							<button style="margin-top: 1px;" type="button"
								class="btn btn-xs btn-danger" onclick="closePopUp()" data-dismiss="modal">Close</button> 
						</div>
						<div style="float:right;margin-top:10px;"><strong>Total Purchase Amount is</strong><input type="text" id="totalAmount" readonly></div>
					</div>
				</div>
				<div class="modal-body col-md-12">
					<%
						ResourceBundle bundle1 = ResourceBundle
								.getBundle("EhatEnterpriseConfigurationFile");

						String goodsReceiptNote = bundle1.getObject(
								"pharma_purchase_entry_name").toString();
					%>
					<div class="col-md-6 panel panel-default">
						<b><center><%= goodsReceiptNote.toString()%></center></b>
						<div class='col-md-12-1' style='margin-top: 0px; margin-left: 1%;' id="creditNoteData">
							
						</div>
					</div>
					
					<div class="col-md-6 panel panel-default">
						<div class="col-md-12-1">
							<b><center>Cash Entry</center></b>
							<div class='col-md-12-1' style='margin-top: 0px; margin-left: 1%;' id="cashPaidData">
							</div>
						</div>
						
						<div class="col-md-12-1">
							<b><center>Cheque Entry</center></b>
							<div class='col-md-12-1' style='margin-top: 0px; margin-left: 1%;' id="chequePaidData">
							</div>
						</div>
						<div class="col-md-12-1">
							<b><center>Debit Note</center></b>
							<div class='col-md-12-1' style='margin-top: 0px; margin-left: 1%;' id="debitNoteData">
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
</div>