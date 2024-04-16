<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>


<div id="category_pop_up" class="modal fade in" style="height: 500px;">
	<div class="modal-dialog">
		<form action="">
			<div class="modal-content">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-12 center">
						<div class="col-md-8-1" style="margin-top: 11px;">
							<h4>
								<i class="fa fa-calendar"></i>Category Wise Sales Information
							</h4>
						</div>

						<div class="col-md-4-1" style="margin-top: 11px;" id='setButtons'>
							<button onclick="getCategoryWiseSaleData()"
								class="btn btn-xs btn-success" type="button">Get Report</button>


							<button style="margin-top: 1px;" type="button"
								class="btn btn-xs btn-danger" onclick="hidePopUp()"
								data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
				<div class="modal-body col-md-12">
					<div class="col-md-12-1">
						<div class='col-md-4-1' style='margin-top: 0px;'>
							<div id='jqxWidget'>
								<div class="col-md-12-1" id='categoryData'
									style="margin-top: 2%;"></div>
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
											<div id='dropdownlist' style="background: #a4bed4"></div>
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
						</div>

						<div class='col-md-7-1' style='margin-top: 0px; margin-left: 1%;'>
							<div
								style="width: 100%; overflow-y: scroll; height: 300px; max-height: auto; margin-left: 2%;">
							<table
								class='table  table-bordered table-striped header-fixed cf'
								border=1>
								<thead style="background-color: peachpuff;">
									<tr>
										<th class="col-md-1-1">Vou No</th>
										<th class="col-md-1-1">Type</th>
										<th class="col-md-1-1">Patient Name</th>
										<th class="col-md-1-1">Product Name</th>
										<th class="col-md-1-1">Qty</th>
										<th class="col-md-1-1">Rate</th>
										<th class="col-md-1-1">Amount</th>

									</tr>
								</thead>
								<tbody id="batchWiseProductData" class="success">
								</tbody>
								<tr>
										<td colspan='8'><span style="float: right"><strong>Total
													Amount</strong>&nbsp;&nbsp;&nbsp;&nbsp;<input type="text"
												name="totalAmount" id="totalAmount" readonly
												style="float: right" placeholder="Total Amount"></span></td>
									</tr>
							</table>
							</div>
						</div>
					</div>
					<!-- /BOX-->
				</div>
				<!-- /BODY-->
				<div class="modal-footer">

					<!-- <div class="form-group col-md-7-1"
						style="margin-top: 1px; margin-left: -64px">
						<button type="button" class="btn btn-primary"
							 onclick="closePopUp()"
							>Ok</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Redo</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					</div> -->
				</div>
			</div>
		</form>
	</div>
</div>
