<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>

<!-- Application js -->
<script
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/app_js/pharma_indent_sale.js"/>"></script>
<script type="text/javascript">
	
</script>
<div id="Indent_Sales_pending_data" class="modal fade in"
	style="height: 500px;">
	<div class="modal-dialog" style="width: 900px;">

		<div class="modal-content">
			<div class="modal-header  col-md-12"">
				<div class="box-title  col-md-8 center">
					<h4>
						<i class="fa fa-calendar"></i>Pending Indent Information
					</h4>
				</div>
				<div id="setButtons" style="margin-top: 0px;" class="col-md-4-1">
					<button data-dismiss="modal" onclick="hidePopUp()"
						class="btn btn-xs btn-danger" type="button"
						style="margin-top: 1px; float: right">Close</button>
				</div>
			</div>
			<!-- Start Body -->
			<div class="modal-body col-md-12 panel panel-default">
				<div class="row">
					<div class="col-md-5" id="pendingData" style="margin: 20px 0 0">
						<div class="col-md-2" style="margin: 8px 0 0">
							<span><i class="fa fa-user fa-fw fa-2x" style="color: blue;"></i></span>
						</div>
						<div class="col-md-10" style="margin: 8px 0 0">
							<div id='patientData1'></div>
						</div>
					</div>

					<div class="col-md-7" style="margin: 20px 0 0">
						<div class="form-group col-md-4">
							<label style="color: blue;">Search By:</label> <select id="patSearchType"
								class="form-control input-SmallText"
								onchange="fetchIndentPatientName()">
								<option value="0">--Select--</option>
								<option value="1">Indent No</option>
								<option value="2">Patient Name</option>
							</select>
						</div>

						<div class="col-md-8 TextFont" id="divbyName"
							style="margin: 8px 0 0">
							<input name="byName" type="text" id="byName"
								class="typeahead form-control input-SmallText"
								onkeyup="setAutoPatientNameIndent(this.id,event)"
								autocomplete="off" />
						</div>
					</div>
				</div>

				<div class="col-md-12-1" id='indentSettalBill'
					style="margin-top: 3%;"></div>

				<div class="col-md-12-1" id='indentHospitalPaymentDiv'
					style="margin-top: 3%;"></div>


				<div class='col-md-1-1' style="margin-top: 3%">
					<button type="button" class="btn btn-xs btn-success"
						onclick="saveIndentPendingData()" style="margin-left: 1140%;">Save</button>
				</div>

				<div class="col-md-12-1" id='indentPendingData'
					style="margin-top: 3%;"></div>
				<!-- /BOX-->
			</div>
			<!-- /BODY-->
			<div class="modal-footer">
			</div>
		</div>

	</div>
</div>
<input type="hidden" id='hiddenTreatmentId'>