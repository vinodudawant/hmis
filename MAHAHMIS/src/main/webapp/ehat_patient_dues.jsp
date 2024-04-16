<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>EhatEnterprise |Patient Due</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- JQUERY -->
<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
<!-- JQUERY UI-->
<script
	src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>


<link rel="stylesheet" type="text/css"
	href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />

<link rel="stylesheet" type="text/css"
	href="ehat-design/css/cloud-admin.css">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/responsive.css">

<link href="ehat-design/font-awesome/css/font-awesome.min.css"
	rel="stylesheet">

<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />

<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<!-- TYPEAHEAD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/typeahead/typeahead.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/uniform/css/uniform.default.min.css" />

<!-- DATA TABLES -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />
	<script type="text/javascript" src="js/ExtraJs/Shortcut_js/shortcut.js"></script>

<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></link>

<script src="js/ehat_patient_due.js"></script>

<script type="text/javascript">

	onload = function() {

		getPatientDuelist();

	};
</script>
</head>
<body>
	<!-- HEADER -->
	<header class="navbar clearfix" id="header">

		<%@include file="Menu_Header_Nobel.jsp"%>

	</header>
	<!--/HEADER -->

	<!-- PAGE -->
	<section id="page">
		<!-- SIDEBAR -->

		<%@include file="ehat_finance_leftmenu.jsp"%>

		<!-- /SIDEBAR -->
		<div id="main-content">

			<div class="container ">
				<div class="row">
				
			
				
					<div id="content" class="col-lg-12  panel body">
						<!-- PAGE HEADER-->
						<div class="row">
							<div class="col-sm-12">
								<div class="page-header">
									
									<ul class="breadcrumb">
										<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
										</li>
										<li>Patient Dues</li>
										<li class="li pull-right">
											<div class="col-sm-1">
												<input type="button" value="Save(Ctrl + S)"
													onclick="saveduepatient()" class="btn btn-success">
											</div>
										</li>
										
										
									</ul>

								</div>
							</div>
						</div>


<div id="canteendetails" class="col-md-12-1"
								>
						<div class="row">
						
								<div id="HSTDiv" class="panel body col-md-12 "
									style=" height: 500Px; overflow-y: scroll; overflow-x: auto; border: 1px solid #436a9d;">

									<div class="col-md-12-1">
										<input type="button" onclick="deleteRow();"
											style="margin: 7px; float: right"
											class="btn btn-xs btn-success" value="-">
									</div>
									<div class="col-md-12-1">
										<table border="1"
											class="table table-bordered table-striped table-condensed"
											id="ItemInfoTable">
											<thead>
												<tr id="h">
													<th class="col-md-1 center">Sr No</th>
													<th style="height: 21.5px;" class="col-md-2 center"><div
															class="TextFont">Name</div></th>
													<th style="height: 21.5px;" class="col-md-1 center"><div
															class="TextFont">Bill Id</div></th>

													<th style="height: 21.5px;" class=" col-md-1-1 center"><div
															class="TextFont">IPD No</div></th>

													<th style="height: 21.5px;" class=" col-md-1-1 center"><div
															class="TextFont">Amount</div></th>
													<th style="height: 21.5px;" class=" col-md-1-1 center"><div
															class="TextFont">Received Amt</div></th>
															
													<th style="height: 21.5px;" class=" col-md-1-1 center"><div
															class="TextFont">Pending</div></th>
															
													<th style="height: 21.5px;" class=" col-md-1-1 center"><div
															class="TextFont">Paid</div></th>
															
													<th style="height: 21.5px;" class=" col-md-1-1 center"><div
															class="TextFont">From</div></th>
															
													<th style="height: 21.5px;" class=" col-md-1-1 center"><div
															class="TextFont">Naration</div></th>

													<th style="height: 21.5px;" class=" col-md-1-1 center"><div
															class="TextFont">Select</div></th>
												</tr>
											</thead>
											<tbody
												style="height: 87%; overflow-y: scroll; border: 1px solid;"
												id="DRRDiv">

												<tr id="remove1">
													<td ><input type="text" maxlength="3"
														value="1" readonly="readonly"
														class="form-control input-SmallText # deleteGroup1 # textNoDelete"
														name="tableNo1" id="tableNo1" tabindex="-1">
														<input type="hidden" id="slaveId1" value="0">
														</td>

													<td><input type="text" autocomplete="off" value=""
														class="form-control input-SmallText # deleteGroup1 # textNo"
														name="patientName1" id="patientName1"
														></td>
													<td><input type="text" autocomplete="off" value="0"
														class="form-control input-SmallText typeheadCounterPo1"
														name="billId1" id="billId1"
														onkeyup="toCreateRow()"
														></td>



													<td><input type="text" value="0" autocomplete="off"
														class="form-control input-SmallText # deleteGroup1 # textNo"
														name="ipdNo1" id="ipdNo1"></td>



													<td><input type="text" value="0" autocomplete="off"
														class="form-control input-SmallText # deleteGroup1 # textNo"
														name="amount1" id="amount1" ></td><!-- onkeyup=" calculateAmt(1);" -->


													<td><input type="text" value="0" 
														class="form-control input-SmallText # deleteGroup1 # textNo amtclass"
														 name="recAmount1" id="recAmount1">

														<input type="hidden" id="serviceid1" value="0"> 
													</td>
													
													<td><input type="text" value="0" 
														class="form-control input-SmallText # deleteGroup1 # textNo amtclass"
														tabindex="-1" name="pendingAmount1" id="pendingAmount1"></td>
														
														<td><input type="text" value="0" 
														class="form-control input-SmallText # deleteGroup1 # textNo amtclass"
														 name="paidAmount1" id="paidAmount1"></td>
														 
														 <td><input type="text" value="0" 
														class="form-control input-SmallText # deleteGroup1 # textNo amtclass"
														 name="from1" id="from1"></td>
														 
														 <td><input type="text" value="0" 
														class="form-control input-SmallText # deleteGroup1 # textNo amtclass"
														 name="narration1" id="narration1"></td>

													<td><input type="checkbox" id="deleteGroups1" value="1"
														 name="deleteGroups"
														class=""></td>




												</tr>




											</tbody>
										</table>
									</div>
								</div>

								
								
								

					
						
	
						
						
						


					</div>


				</div>
			</div>
		</div></div></div>
		<div id="pleaseWait" style="text-align: center; display: none;">
			<img style="margin-top: 250px;" height="43px"
				src="images/loading_black.gif" />
			<div style="margin-top: 10px; color: white">
				<b>Please wait...</b>
			</div>
		</div>


        <input type="hidden" id="canteenIds" value="0">
		<input type="hidden" id="count" value="0">
		<input type="hidden" id="currentrowcount" value="1">

		<input type="hidden" id="rowcount" value="1">


	




		<%@include file="footer_nobel.jsp"%>
	</section>
	<!--/PAGE -->

	<!-- JAVASCRIPTS -->

	<script
		src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
	<!-- SLIMSCROLL -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript"
		src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>

	<!-- BLOCK UI -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
	<script type="text/javascript"
		src="ehat-design/js/autosize/jquery.autosize.min.js"></script>
	<script type="text/javascript"
		src="ehat-design/js/select2/select2.min.js"></script>
	<!-- TYPEHEAD -->
	<script type="text/javascript"
		src="ehat-design/js/typeahead/typeahead.min.js"></script>
	<!-- UNIFORM -->
	<script type="text/javascript"
		src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
	<!-- DATA TABLES -->
	<script type="text/javascript"
		src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript"
		src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
	<script type="text/javascript"
		src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
	<script type="text/javascript"
		src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>

	<!-- COOKIE -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>

	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>

	<script>
		jQuery(document).ready(function() {		
			App.setPage("wizards_validations");  //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});		
			
			
			
		});
	</script>
	<script type="text/javascript">
		shortcut.add("Ctrl+s", function() {

			saveduepatient();
		});
		
	</script>

</body>
</html>