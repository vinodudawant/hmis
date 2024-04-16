<div id="purchasePendingBillPopUp" class="modal fade in"
	style="height: 560px;">
	<div class="modal-dialog" style="width: 70%">
		<form action="">
			<div class="modal-content" class="col-md-12">
				<div class="modal-header">
					<div class="box-title">
						<h4 id="popUpHeading">
							<i class="fa fa-calendar"></i>Patient Credit Bill
						</h4>
					</div>
				</div>
				<div class="modal-body">
					<div class="col-md-12-1" style="margin-top: 9px;">
						<div class="col-md-2-1" style="margin-top: 0px;"></div>
					</div>

					<div class="col-md-12-1"
						style="height: 100%; width: 100%; padding-left: 0px;">
						<!-- <table id="ItemInfoTable" border="1"
							class="table table-bordered table-striped table-condensed"
							style="height: 100%; width: 100%;">
							<thead>
								<tr>
									<th class='col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>select Product</div></th>
									<th class='col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Bill.No.</div></th>

									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Bill.Date.</div></th>

									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Vou No</div></th>

									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Vou Date</div></th>

									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Type</div></th>

									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Net Amount</div></th>

									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Amount Bal.</div></th>

									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Pending Days.</div></th>
								</tr>
							</thead>

							<tbody id="pendingBillsData"
								style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
							</tbody>
						</table> -->

						<div id='jqxWidget'>
							<div id="jqxgrid"></div>
						</div>
						
						 <div style='margin-top: 20px;'>
            <div style='float: left;'>
                <input type="button" value="Export to Excel" id='excelExport' />
                <br /><br />
                
            </div>
            <div style='margin-left: 10px; float: left;'>
                <input type="button" value="Export to CSV" id='csvExport' />
                <br /><br />
                
            </div>
            
            <div style='margin-left: 10px; float: left;'>
                <input type="button" value="Export to PDF" id='pdfExport' />
            </div>
        </div>
					</div>
					<!-- /BOX-->
				</div>
				<!-- /BODY-->
				<div class="modal-footer">
					<div class="form-group col-md-7-1" style="margin-top: 15px;">
						<button type="button" class="btn btn-primary" id="" name=""
							onclick="setFocusBillNo()" data-dismiss="modal">Ok</button>
						<!-- <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button> -->
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
<script type="text/javascript">
	function setFocusBillNo() {
		
		$("#purchasePendingBillPopUp").hide();
		
	/* 	setTimeout(function() {
			$("#txtNaration").focus();
		}, 1000); */
	}
</script>