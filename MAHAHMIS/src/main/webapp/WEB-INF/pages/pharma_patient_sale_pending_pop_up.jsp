<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script type="text/javascript">
	
</script>


<div id="Patient_Sales_pending_data" class="modal fade in"
	style="height: 500px;">
	<div class="modal-dialog" style="width: 900px;">

		<div class="modal-content">
			<div class="modal-header  col-md-12"">
				<div class="box-title  col-md-8 center">
					<h4>
						<i class="fa fa-calendar"></i>Pending Patient Information
					</h4>
					
					
				</div>
				<div id="setButtons" style="margin-top: 0px;" class="col-md-4-1">
							<button data-dismiss="modal" onclick="hidePopUp()" class="btn btn-xs btn-danger" type="button" style="margin-top: 1px;float:right">Close</button>
						</div>
			</div>
			<div class="modal-body col-md-12 panel panel-default" >
				<div class="col-md-6" id="pendingData" style="margin: 20px 0 0">
						<div class="form-group col-md-4">
							<label><i class="fa fa-user fa-fw fa-2x"
								style="color: blue;"></i>Search By</label> <select
								name="Patient_SaleData" class="form-control input-SmallText"
								id="searchTypePatient" onchange="fetchPatientName()">
								<option value="0">--Select--</option>
								<option value="1">Patient Id</option>
								<option value="2">Patient Name</option>
								<option value="3">Invoice No</option>
							</select>
						</div>

						<div class="col-md-8 TextFont" id="divbyName"
							style="margin: 19px 0 0">
							<input name="byName" type="text" id="byName"
								class="typeahead form-control input-SmallText"
								onkeyup="autoSuggestionForPendingPatientName(this.id,event)"
								autocomplete="off" />
								<input type="hidden" id="hiddenPatientId1"  />
						<input type="hidden" id="hiddenTreatmentId1" />	
						<input type="hidden" value="0" id="invoiceSearchId" />
						<input type="hidden" value="0" id="callFrom" />		
						</div>
					</div>
					<div class="col-md-6" style="margin: 50px 0 0" 
						id="divTreatmentDetails"></div>
					
					<div class="col-md-12-1" id='patientSettalBill'
					style="margin-top: 3%;"></div>
					
								<div class='col-md-1-1' style="margin-top:3%">
					<button type="button" class="btn btn-xs btn-success"
							onclick="savePatientPendingData()" style="margin-left: 790px;">Save</button>
						</div>	
					

				<div class="col-md-12-1" id='patientPendingData'
					style="margin-top: 3%;"></div>
				<!-- /BOX-->
			</div>
			<!-- /BODY-->
			<div class="modal-footer">

			
			</div>
		</div>

	</div>
</div>

<input type="hidden" value="0" id="amtReceiveText">
