<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="../.././pharma-resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>

<script type="text/javascript">
	function load(currentVal) {
		resetDebitPopUpValues();
		var result=getDebitNoteData(currentVal);
		$('#debit_note_pop_up_list').modal('show');
	}
	
	function getDate(milliseconds) {
		var d = new Date(milliseconds);
		var dd = d.getDate();
		var mm = d.getMonth() + 1; // January is 0!

		var yyyy = d.getFullYear();
		if (dd < 10) {
			dd = '0' + dd
		}
		if (mm < 10) {
			mm = '0' + mm
		}

		return dd + '/' + mm + '/' + yyyy;
	}
	
	function getDebitNoteData(id) {
		var debitNoteId = parseInt(id);
		var inputs = [];
		inputs.push('debitNoteId=' + debitNoteId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/debitNote/getDebitNotebyDebitId",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				editPro(r);
			}
		});

		return true;
	}
	
	function resetDebitPopUpValues() 
	{
		$('#result').empty();
		$('#vendor').empty();
		$('#docNo').empty();
		$('#debitNoteDate').empty();
		$('#narration').empty();
		$('#netAmt').empty();
		$('#grossAmt').empty();
	}
	
	function editPro(rCount) {
		
		/* $('#particulars').val(rCount.debitNoteSlaves[0].productMaster.productName); */
		var count=rCount.debitNoteSlaves.length;
		for(var i=0;i<count;i++)
		{
			$("#result").append("<tr><td>"+rCount.debitNoteSlaves[i].productMaster.productName+"</td>"+"<td>"+rCount.debitNoteSlaves[i].debitNoteSlaveQty+"</td>"+"<td>"+rCount.debitNoteSlaves[i].debitSlaveScheme+"</td>"+"<td>"+rCount.debitNoteSlaves[i].debitNoteSlaveAmt+"</td></tr>");
		}
		$("#vendor").append(rCount.vendorMaster.vendorName);	
		$("#docNo").append(rCount.debitNoteDocNo);
		$("#debitNoteDate").append(getDate(rCount.debitNotEnteredBy));
		
		$("#narration").append(rCount.debitNoteNarration);
		
		$("#grossAmt").append(rCount.debitNoteGrossAmt);
		$("#netAmt").append(rCount.debitNoteNetAmt);
	}
	
</script>

<div id="debit_note_pop_up_list" class="modal fade in">
	<div class="modal-dialog" style="width: 600px;">
		<form action="">
			<div class="modal-content col-md-9">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-8 center">
						<h4>
							<i class="fa fa-calendar"></i>Debit Note Information
						</h4>
					</div>
				</div>
				<div class="modal-body col-md-12-1">
					<div class="col-md-12-1">
							<div class="col-md-12-1" style="margin-top: 9px;">
								<div class="col-md-12-1" style="margin-top: 9px;">
									<div class="col-md-4-1" style="margin-top: 0px;">
										<div class="form-group">
											<label for="product">Vendor Name</label> 
											<div id="vendor"> </div>
											
										</div>
									</div>
								</div>
							
								<div class="col-md-12-1" style="margin-top: 9px;">
									<div class="col-md-12-1" style="margin-top: 0px;">
										<div class="form-group">
											<label for="product">Products</label> 
											<table border="1">
											<tr>
												<th>Product Name</th>
												<th>Qty</th>
												<th>Scheme</th>
												<th>Amt</th>
											</tr>
											<tbody id="result"></tbody>
											</table>
										</div>
									</div>
								</div>
								<div class="col-md-12-1" style="margin-top: 2px;">
									
									<div class="col-md-11-1" style="margin-top: 0px;">
										<div class="col-md-3-1" style="margin-top: 0px;">
											<div class="form-group" >
												<label for="product">Vou No</label> 
												
												<div id="docNo"></div>
											</div>
										</div>
										<div class="col-md-7-1"
											style="margin-top: 0px; float: right;">
											<div class="form-group">
												<label for="product">Debit Note Date</label>
												<div id="debitNoteDate"></div> 
											</div>
										</div>
									</div>
								</div>

								<div class="col-md-12-1" style="margin-top: 2px;">
									<div class="col-md-11-1" style="margin-top: 0px;">
										<div class="col-md-3-1" style="margin-top: 0px;">
											<div class="form-group" >
												<label for="product">Narration</label>
												<div id="narration"></div> 
											</div>
										</div>
										<div class="col-md-7-1"
											style="margin-top: 0px; float: right;">
											<div class="form-group" >
												<label for="product">Gross Amt</label>
												<div id="grossAmt"></div> 
											</div>
										</div>
									</div>
								</div>
								
								<div class="col-md-12-1" style="margin-top: 2px;">
									<div class="col-md-11-1" style="margin-top: 0px;">
										<div class="col-md-3-1" style="margin-top: 0px;">
											<div class="form-group" >
												<label for="product">Net Amt</label>
												<div id="netAmt"></div> 
											</div>
										</div>
										
									</div>
								</div>
							</div>
					</div>
					<!-- /BOX-->
				</div>
				<!-- /BODY-->
				<div class="modal-footer">

					<div class="form-group col-md-7-1"
						style="margin-top: 1px; margin-left: -64px">
						<button type="submit" class="btn btn-primary"
							id="btnSubContractingMaterialIssueSave"
							name="btnSubContractingMaterialIssueSave" onclick="myfunction()"
							data-dismiss="modal">Ok</button>
						<!-- <button type="button" class="btn btn-default" data-dismiss="modal">Redo</button> -->
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>