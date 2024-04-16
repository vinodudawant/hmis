<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>

<div id="partywise_purchase" class="modal fade in"
	style="height: 500px;">
	<div class="modal-dialog">
		<form action="">
			<div class="modal-content">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-12 center">
						<div class="col-md-8-1" style="margin-top: 11px;">
							<h4>
								<i class="fa fa-calendar"></i>Total Sales Report(With Vat)
							</h4>
						</div>

						<div class="col-md-4-1" style="margin-top: 11px;" id='setButtons'>
							<button onclick="getTotalSaleReport()"
								class="btn btn-xs btn-success" type="button">Get Report</button>


							<button style="margin-top: 1px;" type="button"
								class="btn btn-xs btn-danger" onclick="hidePopUp()"
								data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
				<div class="modal-body col-md-12">
					<div class="col-md-12-1">
						<div class='col-md-4-1' style='margin-top: 0px;' id="partyData">
						</div>

						<div class='col-md-7-1' style='margin-top: 0px; margin-left: -30%;'>
							<div
								style="width: 151%; overflow-y: scroll; height: 217px; max-height: auto; margin-left: 0%;">
								<table
									class='table  table-bordered table-striped header-fixed cf'
									border=1 style="width: 100%;">
									<thead style="background-color: peachpuff;">
										<tr>
										    <th class="col-md-1-1">Sales</th>
										    
											<th class="col-md-1-1">Total Gross Amt</th>
											<th class="col-md-1-1">Vat Amt</th>
										<!-- 	<th class="col-md-1-1">Vat Amt 5%</th>
											<th class="col-md-1-1">Vat Amt 12%</th> -->
											<th class="col-md-1-1">Total sale amt</th>
										</tr>
									</thead>
									<tbody id="partyWiseResult" class="success">
									</tbody>
									<tr>
																
						         <td><span style="float: right"></span>
									 </td>
									 
									 <td><span style="float: right"><input type="text"
												id="totalVat0" readonly name="totalVat0"
												style="float: right" placeholder="Total Vat0"></span></td>	
												
									 	<td><span style="float: right"><input type="text"
												name="totalVat5" id="totalVat5" readonly
												style="float: right" placeholder="Total Vat5"></span>
										</td>
										
									 <td><span style="float: right"><input type="text"
												id="totalVat12" readonly name="totalVat12"
												style="float: right" placeholder="Total Vat12"></span></td>
									   
									<!--    <td><span style="float: right"><input type="text"
												id="totalNet" readonly name="totalNet"
												style="float: right" placeholder="Total Net Amount"></span></td> 					 -->					
									</tr>
								</table>
							</div>
						</div>
					</div>
					<!-- /BOX-->
				</div>
				<!-- /BODY-->
				<div class="modal-footer">
			
				</div>
			</div>
		</form>
	</div>
	
	<div class="ajaxmodal">
	</div>
</div>

