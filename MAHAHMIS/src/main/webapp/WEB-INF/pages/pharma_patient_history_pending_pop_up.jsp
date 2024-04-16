<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>
<script type="text/javascript">
	function hidePopUp()
	{
		$('#patient_history_pending_data').hide();
	}
</script>


<div id="patient_history_pending_data" class="modal fade in"
	style="height: 500px;">
		<div class="modal-dialog" style="margin-top: 45px;">
											<div class="modal-content" class="col-md-12"
												style="height: 300px;">
												<div class="modal-header" style="padding-bottom: 0px;">
													<div class="box-title" style="margin-bottom: -1px;">
														<h4>
															<i class="fa fa-calendar"></i>Refund
														</h4>
														<div class="form-group col-md-2-1"
															style="float: right; margin-top: -27px;">
															<button type="submit" class="btn  btn-xs btn-primary"
																>Save</button>
															<button class="btn btn-xs btn-danger" type="button"
																data-dismiss="modal" onclick="hidePopUp();" >
																<i class="fa fa-arrows" ></i> Close
															</button>
														<input type="hidden"  id="treatmentID" value="0" /> 
														
																
														</div>
													</div>
												</div>
												 <div class="modal-body">
													<div class="form-group col-md-12-1" style="margin: 0px;">
													
														<div class="form-group Remove-Padding col-sm-3-1"
															style="margin: 0px;">
															<div class="divide-10"></div>
															<label class="TextFont">Amount Receive</label> <input type="text"
																id="AmountReceipt" name="AmountReceipt"
																placeholder="Amount Receive"
																class="form-control input-SmallText" />
														</div>

														<div class="form-group Remove-Padding col-sm-2-1"
															style="margin: 0px;">
															<div class="divide-10"></div>
															<label class="TextFont">Discount</label> <input type="text"
																	id="Discount" name="Discount"
																placeholder="Discount"
																class="form-control input-SmallText" 
																 />
														</div>

														<div class="form-group Remove-Padding col-sm-2-1"
															style="margin: 0px;">
															<div class="divide-10"></div>
															<label class="TextFont">
                                                                             Narration</label> <input
																type="text" id="Narration" name="Narration"
																placeholder="Narration"
																class="form-control input-SmallText" />
														</div>
																											
													</div>
												</div> 
											</div>
										</div>
</div>
