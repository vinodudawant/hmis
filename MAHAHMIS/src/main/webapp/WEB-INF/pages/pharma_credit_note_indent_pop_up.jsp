<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script type="text/javascript">
	function hideCounterPopUp()
	{
		$('#credit_note_indent_data').hide();
	}
</script>


<div id="credit_note_indent_data" class="modal fade in"
	style="height: 500px;">
	<div class="modal-dialog" style="width: 900px;">

		<div class="modal-content">
			<div class="modal-header  col-md-12" style="background-color:palegoldenrod">
				<div class="box-title  col-md-8 center">
					<h4>
						<i class="fa fa-mail-reply"></i>Indent Return
					</h4>
				</div>
				<div class="col-md-4-1" style="margin-top: 0px;" id="setButtons">
					<button style="margin-top: 1px; float: right" type="button"
						class="bootbox-close-button btn-danger"
						onclick="hideCounterPopUp()" data-dismiss="modal">X</button>
				</div>
			</div>
			<div class="modal-body col-md-12 panel panel-default">
				<!-- <div class="col-md-12-1" id="pendingData" style="margin-top: 3%;">
					<div class="col-md-1-1 " style="margin-top: -5px;">Select
						Patient</div>
					<div class='col-md-4-1' id='patientData1' style=""></div>
					
					<div class="col-md-2-1 " id='receiptData1' style="margin-top: -5px;">Select Receipt No	</div>
					
					<div class='col-md-4-1' id='receiptData'></div>

				</div> -->

				<div class="col-md-12-1 panel panel-default" id="pendingData"
					style="margin-top: 0%;">
					<!-- <div class='col-md-2-1' style="margin-top: 1%;">
						<b>Pending Amount is</b><Br> <b><span id='pendingAmount'>0.0</span></b>
					</div>
					<div class='col-md-3-1' style="margin-top: 1%;">
						<b>Amount Receive</b> <span><input type='text'
							id='amountReceive' placeholder='Amount Receive'></span>
						
					</div>
					
					<div class='col-md-3-1' style="margin-top: 1%;">
						<b>Discount</b> <span><input type='text'
							id='discount' placeholder='Discount'></span>
						
					</div>
					
					<div class='col-md-3-1' style="margin-top: 1%;">
						<b>Narration</b> <span><input type='text'
							id='narration' placeholder='Narration'></span>
						
					</div>
					
					<div class='col-md-1-1' style="margin-top:3%">
					<button type="button" class="btn btn-xs btn-success"
							onclick="saveIndentPendingData()">Save</button>
						</div>	 -->
					<div class='col-md-4-1' id='patientData1' style="margin-top: 3%;margin-bottom:1%">
						<div class="col-md-4-1"><b><i class="fa fa-user"></i> Select Name:</b></div>

						<div class="col-md-8-1">
							<input name="txtPatientName1" type="text" id="txtPatientName1"
								autocomplete="off"
								class="typeahead form-control input-SmallText "
								onkeypress="autoSuggestionForPatientNameIndentSale('txtPatientName1', 'onchange');" />
							<input type="hidden" id="hiddenPatientId" />
							<input type="hidden" id="hiddenIndentSalePatientAddress" />
							<input type="hidden" id="hiddenIndentSalePatientNumber" />
							
						</div>
					</div>

					<div class='col-md-4-1' id='divPatientWiseTreatment'
						style="margin-top: 2%;margin-bottom:1%"></div>

					<div class='col-md-4-1' id='indentReceiptData'
						style="margin-top: 2%;margin-bottom:15px;"></div>


				</div>

				<div class="col-md-12-1" id='indentPendingData'
					style="margin-top: 1%;">
					 <b><h3>
							<font color='red'>Loading Data.....</font>
						</h3></b>
					</div>
				<!-- /BOX-->
			</div>
			<!-- /BODY-->
			<div class="modal-footer"></div>
		</div>

	</div>
</div>
<input type="hidden" id='hiddenTreatmentId'>