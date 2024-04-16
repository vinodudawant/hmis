<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>

<div id="purchaseDaywise" class="modal fade in" style="height: 500px;">
	<div class="modal-dialog">
		<form action="">
			<div class="modal-content">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-12 center">
						<div class="col-md-8-1" style="margin-top: 11px;">
							<h4>
								<i class="fa fa-calendar"></i>DayWise Purchase Information
							</h4>
						</div>

						<div class="col-md-4-1" style="margin-top: 11px;" id='setButtons'>
							<button onclick="getNewProductWisePurchaseReport()"
								class="btn btn-xs btn-success" type="button">Get Report</button>


							<button style="margin-top: 1px;" type="button"
								class="btn btn-xs btn-danger" onclick="hidePopUp()"
								data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
				<div class="modal-body col-md-12">
					<span style="float: right"><strong>Total Amount</strong>&nbsp;&nbsp;&nbsp;&nbsp;<input
						type="text" name="totalAmount" id="totalAmount" readonly
						style="float: right" placeholder="Total Amount"></span>
					<!-- <div class="col-md-12-1" id='daywisePurchase' style="margin-top:2%;">
						
					</div> -->
					<div id='jqxWidget'>
						<div class="col-md-12-1" id='daywisePurchase' style="margin-top:2%;"></div>
						<div id="jqxwindow">
							<div>Find Record</div>
							<div style="overflow: hidden;">
								<div>Find what:</div>
								<div style='margin-top: 5px;'>
									<input id='inputField' type="text" class="jqx-input"
										style="width: 200px; height: 23px;" />
								</div>
								<div style="margin-top: 7px; clear: both;">Look in:</div>
								<div style='margin-top: 5px;'>
									<div id='dropdownlist' style="background:#a4bed4"></div>
								</div>
								<div>
									<input type="button"
										style='margin-top: 15px; margin-left: 50px; float: left;'
										value="Find" id="findButton" /> <input type="button"
										style='margin-left: 5px; margin-top: 15px; float: left;'
										value="Clear" id="clearButton" />
								</div>
							</div>
						</div>
					</div>
					<!-- /BOX-->
				</div>
				<!-- /BODY-->
				<div class="modal-footer">

				</div>
			</div>
		</form>
	</div>
</div>