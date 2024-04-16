<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>
 <script type="text/javascript">
	function closePopUp() {
		$("#Indent_Sales_Data_Form").hide();
		location.reload();
	}
</script>


<div id="patient_productwise_report" class="modal fade in" style="height: 500px;">
	<div class="modal-dialog">
		<form action="">
			<div class="modal-content">
				<div class="modal-header  col-md-12">
					<div class="box-title  col-md-12 center">
						<div class="col-md-8-1" style="margin-top: 11px;">
							<h4>
								<i class="fa fa-calendar"></i>Credit Note Details
							</h4>
							
							
						</div>

					<div class="col-md-4-1" style="margin-top: 11px;" id='setButtons'>
					
							<button onclick="getPatientSaleReportVouwise()" class="btn btn-xs btn-success" type="button">Get Pdf</button>
							<button style="margin-top: 1px;" type="button"
								class="btn btn-xs btn-danger" onclick="closePopUp()" data-dismiss="modal">Close</button> 
						</div>
						
						<div class="col-md-12-1" style="margin-top:5px;">
							<div style="float:right;margin-top:10px;" class="col-md-4-1"><strong>Total Indent Credit Return Net Amount :</strong><input type="text" id="totalAmount" value="0.0" readonly></div>
						
							<div style="float:left;margin-top:10px;" class="col-md-4-1"><strong>Total Indent Credit Amount :</strong><input type="text" value="0.0" id="txtTotalCredit" readonly></div>
						
							<div style="float:left;margin-top:10px;" class="col-md-4-1"><strong>Total Indent Amount Payble :</strong><input type="text" value="0.0" id="txtTotalPayble" readonly></div>
						</div>
						
						<div class="col-md-12-1" style="margin-top:5px;">
							<div style="float:right;margin-top:10px;" class="col-md-4-1"><strong>Total Patient Credit Return Net Amount  :</strong><input type="text" id="txtPatientTotalAmount" value="0.0" readonly></div>
						
							<div style="float:left;margin-top:10px;" class="col-md-4-1"><strong>Total Patient Credit Amount :</strong><input type="text" id="txtPatientTotalCredit" value="0.0" readonly></div>
						
							<div style="float:left;margin-top:10px;" class="col-md-4-1"><strong>Total Patient Amount Payble :</strong><input type="text" id="txtPatientTotalPayble" value="0.0" readonly></div>
						</div>
						
						
						<!-- Suraj code -->
								<div class="box border green" style="margin-top: 13%">
									<div class="box-title">
										<div style="float:left"><i class="fa fa-bars"></i>Sale Type</div>
										<!-- <div class="tools">
											<a class="config" data-toggle="modal" href="#box-config">
												<i class="fa fa-cog"></i>
											</a>
											<a class="reload" href="javascript:;">
												<i class="fa fa-refresh"></i>
											</a>
											<a class="collapse" href="javascript:;">
												<i class="fa fa-chevron-up"></i>
											</a>
											<a class="remove" href="javascript:;">
												<i class="fa fa-times"></i>
											</a>
										</div> -->
									</div>
						
									<div class="box-body">
										<div class="panel-group" id="accordion">
										  <div class="panel panel-default" style="display:none">
											 <div class="panel-heading">
												<h3 class="panel-title"> <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Group Item #1 </a> </h3>
											 </div>
											 <div id="collapseOne" class="panel-collapse collapse">
												<div class="panel-body"> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </div>
											 </div>
										  </div>
										  <div class="panel panel-default">
											 <div class="panel-heading">
												<h3 class="panel-title"> <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"><b><i class="fa fa-bars"></i> Indent Sale</b> </a> </h3>
											 </div>
											 <div id="collapseTwo" class="panel-collapse collapse in">
												<div class="panel-body" id="indentSaleData"> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </div>
											 </div>
										  </div>
										  <div class="panel panel-default">
											 <div class="panel-heading">
												<h3 class="panel-title"> <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseThree"><b><i class="fa fa-bars"></i> Patient Sale</b> </a> </h3>
											 </div>
											 <div id="collapseThree" class="panel-collapse collapse">
												<div class="panel-body" id="divPatientSaleData"> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </div>
											 </div>
										  </div>
									   </div>
									</div>
									
								</div>
									
									<!-- suraj code for dropdown -->
						
						
					</div>
				</div>
				<div class="modal-body col-md-12">
					<div class="col-md-12-1">
						<div class='col-md-12-1' style='margin-top: 0px; margin-left: 1%;' id="creditNoteData">
							<!-- <table
								class='table  table-bordered table-striped header-fixed cf'
								border=1>
								<thead style="background-color: peachpuff;">
									<tr>
										<th>Date</th>
										<th>Receipt No</th>
										<th>Vou No</th>
										<th>Product Name</th>
										<th>Qty</th>
										<th>Rate</th>
										<th>Amount</th>
									</tr>
								</thead>
								<tbody id="patientSaleData" class="success">
								</tbody>
							</table> -->
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
