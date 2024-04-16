<div id="Counter_Batch_Pop_Up" class="modal fade in" style="height:900px;overflow-y:scroll;margin-top:10%;margin-left:-800px";>
	<div class="modal-dialog" style="width:00px;">
		<form action="">
			<div class="" class="">
				
				<div class="modal-body col-md-12">

					<div class="col-md-12-1"
						style="height: 100%; width:500%; padding-left:10%;" id="jqxgrid">
						
					</div>
					<!-- /BOX-->
				</div>
				<!-- /BODY-->
				
			</div>
		</form>
	</div>
</div>
<script type="text/javascript">
	function setPopUpValues1()
	{
		/* var totalRow=0;
		$('#batchData input[type=radio]').each(function()
		{
			totalRow++;
		}); */
		
		/* var datainformations = $('#jqxgrid').jqxGrid('getdatainformation');
		var rowscounts = datainformations.rowscount;  */
		
		var getselectedrowindexes = $('#jqxgrid').jqxGrid('getselectedrowindexes');
		/* var selectedRowData = $('#jqxgrid').jqxGrid('getrowdata', getselectedrowindexes[0]); */
		
		setQtyFocus();
		setPopUpValues(getselectedrowindexes[0]);
		
		
		$('#Counter_Batch_Pop_Up').modal('hide');
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