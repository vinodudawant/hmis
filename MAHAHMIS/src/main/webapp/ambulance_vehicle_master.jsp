<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Ambulance Requisition Form</title>

<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<%@include file="inv_header.jsp"%>

<!-- TYPEHEAD -->
<script type="text/javascript"
	src="ehat-design/js/typeahead/typeahead.min.js"></script>

<!-- TYPEAHEAD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/typeahead/typeahead.css" />

<!-- CUSTOM SCRIPT -->
<script src="ehat-design/js/script.js"></script>
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

	
<script>
	jQuery(document).ready(function() {
		App.setPage("Patient_Death"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});
	});
</script>

<script type="text/javascript">
	onload = function() {
		$("#hospDetail").addClass("anchorActive");
	}
</script>
		<script>
		
		jQuery(document).ready(function() {
			getAllVehicleTypeMaster();
			//getVehicleTypeById();
		});
	</script>
<!-- JQUERY files import start -->

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

<!-- JQUERY UI-->
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


<!-- JQUERY files import END -->

<!-- include js for development -->
<script type="text/javascript" src="js/users.js"></script>

<script type="text/javascript" src="js/vehicle_master.js"></script>
<script type="text/javascript" src="js/vehicleType_master.js"></script>

<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
String todays_date = formatter.format(currentDate.getTime());
%>
</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->

			<%@include file="left_menu_ambulance.jsp"%>

			<!-- /SIDEBAR -->

			<!-- PAGE -->


			<div id="main-content">
				<!-- SAMPLE BOX CONFIGURATION MODAL FORM-->
				<div class="modal fade" id="box-config" tabindex="-1" role="dialog"
					aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal"
									aria-hidden="true">&times;</button>
								<h4 class="modal-title">Box Settings</h4>
							</div>
							<div class="modal-body">Here goes box setting content.</div>
						<!-- 	<div class="modal-footer">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Close</button>
								<button type="button" class="btn btn-primary">Save
									changes</button>
							</div> -->
						</div>
					</div>
				</div>
				<!-- /SAMPLE BOX CONFIGURATION MODAL FORM-->
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">
										<!-- STYLER -->

										<!-- /STYLER -->
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="ambulance_vehicle_master.jsp">Ambulance Vehicle</a></li>

										</ul>

										<!-- /BREADCRUMBS -->
										<div class="clearfix"></div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">										
											<!-- ============================================================================== -->
											<!-- START:Ambulance Vehicle Form -->
											<!-- ============================================================================== -->


											<!-- <div class="row"> -->

											<!-- <div class="col-md-12" id="divForEntry"> -->

											<div class="panel panel-primary">
												<div class="panel-heading">Ambulance Vehicle Form
													:</div>
												<div class="panel-body">

													<form action="#" method="POST">

														<!-- ============================ UHID Number and  Patient Name  Consultant Name====================== -->
														<div class="row" >
														<!-- 	<div class="col-md-2">
																<label> <span class="required-field">*</span>Vehicle
																	Id :
																</label>
															</div> 
															<div class="col-md-2">
																<div class="form-group">
																	<input type="hidden" name="vehicle_id" id="vehicleId"
																		placeholder="vehicle Id" class="form-control">
																</div>
															</div>  -->


															<div class="col-md-2" >
																Vehicle Name
																<label> <span class="required-field"></span>
																 </label>
															</div>
															<div class="col-md-2">
																<div class="form-group">
																	<input type="text" name="vehicle_name" id="vehicleName"
																		placeholder="Vehicle Name" class="form-control">
																</div>
															</div>
															<div class="col-md-2">
															Vehicle Number
																<label> <span class="required-field" ></span>
																</label>
															</div>
															<div class="col-md-2">
																<div class="form-group">
																	<input type="text" name="Vehicle_Number" id="vehicleNumber"
																		placeholder="Vehicle Number" class="form-control">
																</div>
															</div>
														</div>
														<div class="row">
															<div class="col-md-2" >
															Vehicle Type
															<label>
																<span class="form-control-select"></span>
															</label>
																</div>
																<div class="col-md-2">
																	<div class="form-group">												
																		<select class="form-control" id="vehicleType"
																			name="vehicle_type">												 	
																			<!-- <option value="">Cardiac Ambulance</option>
																		 	<option value="">Cardiac Ambulance1</option>
																		 	<option value="">Cardiac Ambulance2</option>
																		 	<option value="">Regular</option> -->
																		 
																		</select>
																	</div>
																</div>
																	<div class="col-md-2">
																Vehicle Status
																<label> <span class="required-field"></span>
																</label>
															</div>
															<div class="col-md-2">
																<div class="form-group" >
																	<input type="text" name="vehicle_status" id="vehicleStatus"
																		placeholder="Vehicle Status" class="form-control">
																</div>
															</div>
														<div class="function-buttons" style="float: center;">
															<div class="buttons">
																<button type="submit" class="btn btn-success"
																	onclick="saveVehicleMaster()">
																	<i class="fa fa-save"></i> Save
																</button>
																<button type="button" class="btn btn-warning"
																	onclick="clearVehicleMasterDetails()">Clear</button>
															</div>
														</div>																					
													</div>
													</form>

													<div class="clearfix"></div>
													</div>
																			
														</div>
													</div>
													
													
												</div>
							<div class="col-md-12">
							<div class="tabbable header-tabs">
								<div class="row" style="margin-top: 10px">
									<div class="col-md-12">
										<div class="col-sm-12">
											<div class="pull-right">
												<div id="datatable1_filter" class="dataTables_filter">
													<label id="searchlabel"> </label>
												</div>
											</div>
										</div>
										<div class="panel panel-primary"
											style="margin-top: 20px">
											<div class="panel-heading" id="divEhatContent">Vehicle Status</div>
											<div class="panel-body"
												style="overflow: auto; height: 300px">
											
											<table class="datatable table table-striped table-bordered">
											<thead id="">
												<tr>
													<th class="col-md-1 center" id="vehicleId">Vehicle ID</th>
													<th class="col-md-1 center" id="vehicleName">Vehicle Name</th>
													<th class="col-md-1 center" id="">Vehicle Type</th>
													<th class="col-md-1 center">Vehicle Number</th>
													<th class="col-md-1 center">Vehicle Status</th>
													<th class="col-md-1 center">Edit</th>
												</tr>
											</thead>
											<tbody id="vehicleMasterList">
											 
											</tbody>
										</table>
											</div>
										</div>
									</div>
								</div>
							</div>
								</div>
															
												</div>
											</div>
										</div>
										</div>
										</div>
										</div>

								<div class="footer-tools">
									<span class="go-top"> <i class="fa fa-chevron-up"></i>
										Top
									</span>
								</div>
							<!-- /CONTENT-->
		</section>
		<!--/PAGE -->
		<!-- JAVASCRIPTS -->
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
		<!-- Auto-Suggestion 8/1/2015-->
		<script type="text/javascript" src="auto/jquery.mockjax.js"></script>
		<script type="text/javascript" src="auto/bootstrap-typeahead.js"></script>
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
		<!-- bootstrap datepicker -->
		<script type="text/javascript"
			src="ehat-design/datepicker/bootstrap-datepicker.js"></script>
		<!-- bootstrap datepicker new added  js-->
		<script type="text/javascript"
			src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"></script>
		<script type="text/javascript"
			src="css/inventoryDatepicker/js/jsDatePick.min.1.3.js"></script>
		<!-- CUSTOM SCRIPT -->
		<script src="ehat-design/js/script.js"></script>

		<script>
			jQuery(document).ready(function() {
				App.setPage("index"); //Set current page
				App.init(); //Initialise plugins and elements

				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});

			});
		</script>

		<script type="text/javascript">
	onload = function() {
		
		getAllVehicleMaster();
	}
</script>
		<input type="hidden" id=patientId value="0">
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
		<!-- /JAVASCRIPTS -->

	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	
</body>
</html>