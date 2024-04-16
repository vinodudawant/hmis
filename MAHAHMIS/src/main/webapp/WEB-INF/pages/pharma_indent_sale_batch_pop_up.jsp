<div id="hospitalSaleBatchPopUp" class="modal fade in">
	<div class="modal-dialog" style="width: ;">
		<form action="">
			<div class="modal-content center" class="col-md-12">
				<div class="modal-header">
					<div class="box-title">
						<h4>
							<i class="fa fa-calendar"></i>BatchWise Product Information
						</h4>
					</div>
				</div>
				<div class="modal-body">
					<div class="col-md-12-1" style="margin-top: 9px;">
						<div class="col-md-2-1" style="margin-top: 0px;"></div>
					</div>

					<div class="col-md-12-1"
						style="height: 100%; width: 100%; padding-left: 0px;">
						<table id="ItemInfoTable" border="1"
							class="table table-bordered table-striped table-condensed"
							style="height: 100%; width: 100%;">
							<thead>
								<tr>
									<th class='col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Select Product</div></th>
									<th class='col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Batch Number</div></th>
									<th class=' col-md-2-1 center' style='height: 21.5px;'><div
											class='TextFont'>Expiry</div></th>
											
									<!-- <th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Net Rate</div></th>
 -->
									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>MRP</div></th>

									<!-- <th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Sale Rate</div></th>
									
									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Bill Rate</div></th>	 -->
									
									
									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Rate</div></th>
											
									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Stock</div></th>			

									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Last Purchase From</div></th>

									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Last bill number</div></th>
											
									<th class=' col-md-1-1 center' style='height: 21.5px;'><div
											class='TextFont'>Last Pur date</div></th>		

									
								</tr>
							</thead>

							<tbody id="batchData"
								style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
							</tbody>
						</table>
					</div>
					<!-- /BOX-->
				</div>
				<!-- /BODY-->
				<div class="modal-footer">
					<div class="form-group col-md-7-1" style="margin-top: 15px;">
						<button type="submit" class="btn btn-primary"
							id="btnSubContractingMaterialIssueSave"
							name="btnSubContractingMaterialIssueSave" onclick="setPopUpValues1()"
							data-dismiss="modal">Ok</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
<script type="text/javascript">
	function setPopUpValues1()
	{
		
		var totalRow=0;
		$('#batchData input[type=radio]').each(function()
		{
			totalRow++;
		});
		setQtyFocus();
		setPopUpValues($("input[name=row]:checked").val(),totalRow);
	}
	
	function setQtyFocus()
	{
		setTimeout(function() {
			$("#txtQty").focus();
		}, 500);
	}
	
	function setFocusBatchPopUp()
	{
		$("#rowId0").focus();
	}
	
</script>