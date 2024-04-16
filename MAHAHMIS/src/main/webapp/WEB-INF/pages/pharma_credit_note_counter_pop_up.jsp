<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/app_js/Pharma_Validation.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script type="text/javascript">
	function hidePopUp()
	{
		$('#credit_note_counter_data').hide();
	}
</script>
<!-- <script type="text/javascript">
	onload = function() {
	
		autoSuggestionForPatientNamePatientSale("txtPatientName1", "onload");
	}
</script> -->

<div id="credit_note_counter_data" class="modal fade in"
	style="height: 500px;">
	<div class="modal-dialog" style="width: 900px;">

		<div class="modal-content">
			<div class="modal-header  col-md-12">
				<div class="box-title  col-md-8 center">
					<h4>
						<i class="fa fa-calendar"></i>Counter Sale Return
					</h4>
				</div>
				<div class="col-md-4-1" style="margin-top: 0px;" id="setButtons">
					<button style="margin-top: 1px;float:right" type="button"
						class="btn btn-xs btn-danger" onclick="hidePopUp()"
						data-dismiss="modal">Close</button>
				</div>
			</div>
			<div class="modal-body col-md-12 panel panel-default">
				<div class="col-md-12-1" id="pendingData" style="margin-top: 3%;">
					<div class="col-md-2-1 " style="margin-top: -15px;">Search By:Bill ID</div>
					<div class='col-md-4-1' >
					<div class='col-md-7-1'style="margin-top: -5px;margin-top: -5px;" >
					<input type="text" id='searchBox' name='searchBox'
					placeholder="Bill Id Here"
					class="form-control input-SmallText typeahead"  
					onkeypress="return autoSuggestionForPatientNameCounterSale(event);" />
					<input type="hidden" id="hiddenCounterSaleId" />
                    <div class="col-md-2-1 " style="margin-top: -21px;margin-left:164px;">
                   	<input id='' type='button' value='Search' class='edit' onclick='displayAllCounterSaleData();' />
										
					</div>
												
					</div>
					
					<!-- <div class="col-md-2-1 " id='receiptData2' style="margin-top: -11px;"> -->
				<!-- 	<input id='' type='button' value='Search' class='edit'
					onclick='fetchPendingPatientSaleBillData();'  /> --></div>
					
					<!-- <div class="col-md-2-1 " id='receiptData' style="margin-top: -5px;">Select Receipt No	</div> -->
					
					<div class='col-md-4-1' id='receiptData4' style="margin-top: -20px;margin-left:-97px;"></div>

				</div>

				<div class="col-md-12-1 col-md-12-1 panel panel-default"
					id="pendingData" style="margin-top: 3%;">
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
				</div>

				<div class="col-md-12-1" id='counterSalePendingData'
					style="margin-top: 3%;"></div>
				<!-- /BOX-->
			</div>
			<!-- /BODY-->
			<div class="modal-footer"></div>
		</div>

	</div>
</div>
